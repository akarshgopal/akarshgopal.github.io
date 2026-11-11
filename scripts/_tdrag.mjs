// Touch scrub check: a sideways touch drag (CDP touch events) on panY figures must still change the readout.
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const [PAGE, ...FIGS] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
const p = await ctx.newPage(); await p.goto('file://' + resolve('dist', PAGE)); const cdp = await ctx.newCDPSession(p); const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const n of FIGS) {
  await p.evaluate(n => document.querySelector(`figure[data-fig="${n}"] canvas`).scrollIntoView({ block: 'center', behavior: 'instant' }), n); await sleep(300);
  const bb = await (await p.$(`figure[data-fig="${n}"] canvas`)).boundingBox(); const y = Math.round(bb.y + bb.height * 0.5);
  const r0 = await p.textContent(`figure[data-fig="${n}"] .readout`);
  await p.evaluate(n => { const c = document.querySelector(`figure[data-fig="${n}"] canvas`); window.__ev = { down: 0, move: 0, cancel: 0 }; if (!c.__l) { c.__l = 1; c.addEventListener('pointerdown', () => window.__ev.down++); c.addEventListener('pointermove', () => window.__ev.move++); c.addEventListener('pointercancel', () => window.__ev.cancel++); } }, n);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: Math.round(bb.x + bb.width * 0.3), y }] });
  for (let k = 1; k <= 8; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: Math.round(bb.x + bb.width * (0.3 + 0.05 * k)), y }] }); await sleep(20); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sleep(200);
  console.log('at', await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e.tagName + '.' + e.className + ' ' + (e.closest('figure')?.dataset.fig); }, [Math.round(bb.x + bb.width * 0.5), y]));
  const r1 = await p.textContent(`figure[data-fig="${n}"] .readout`);
  console.log(r0 !== r1 ? 'CHANGED' : 'SAME   ', n, JSON.stringify(await p.evaluate(() => window.__ev)), '→', r1.slice(0, 70));
}
await b.close();
