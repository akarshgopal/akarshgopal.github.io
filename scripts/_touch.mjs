// Touch-scroll trap check at 390: a real touchstart at 9 points on every canvas; report how many the figure claims
// (preventDefault, so the page would not scroll from there). A canvas that traps most points is a trap.
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const PAGE = process.argv[2];
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: false, deviceScaleFactor: 1 });
const p = await ctx.newPage(); await p.goto('file://' + resolve('dist', PAGE));
const cdp = await ctx.newCDPSession(p); const sleep = ms => new Promise(r => setTimeout(r, ms));
const names = await p.$$eval('figure[data-fig]', e => e.map(x => x.dataset.fig)); const out = [];
for (const n of names) {
  const c = await p.$(`figure[data-fig="${n}"] canvas`); if (!c) continue;
  let trapped = 0, tot = 0;
  for (const fy of [0.2, 0.5, 0.8]) for (const fx of [0.15, 0.5, 0.85]) {
    await p.evaluate(n => document.querySelector(`figure[data-fig="${n}"] canvas`).scrollIntoView({ block: 'center', behavior: 'instant' }), n); await sleep(150);
    const bb = await c.boundingBox(); const x = bb.x + bb.width * fx, y = bb.y + bb.height * fy;
    await p.evaluate(() => { window.__pd = null; if (!window.__l) { window.__l = 1; addEventListener('touchstart', e => { window.__pd = e.defaultPrevented; }, { passive: false }); } });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: Math.round(x), y: Math.round(y) }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sleep(30);
    tot++; if (await p.evaluate(() => window.__pd)) trapped++;
  }
  const h = (await c.boundingBox()).height;
  out.push(`${trapped}/${tot} trapped  ${n} (${h | 0}px tall)`);
}
console.log(`## ${PAGE}\n` + out.join('\n')); await b.close();
