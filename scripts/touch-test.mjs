// Phone touch check (390 px, real touch events via CDP): a swipe on a figure's canvas away from its handle must
// scroll the page; a drag that starts on the handle must move the handle and not scroll.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
mkdirSync('screenshots/fix4', { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
const sl = ms => new Promise(r => setTimeout(r, ms));
let fails = 0;
async function swipe(p, cdp, x, y0, y1, x1 = x) {
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: y0 }] });
  for (let i = 1; i <= 10; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + (x1 - x) * i / 10, y: y0 + (y1 - y0) * i / 10 }] }); await sl(16); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sl(400);
}
const argCases = process.argv.slice(2).map(a => a.split(':')); // page:fig:key ...
const cases = argCases.length ? argCases.map(([pg, n]) => [pg, n]) : [
  ['index.html', 'rotor', st => st.ang, g => ({ hx: g.st.geom.cx, hy: g.st.geom.cy - g.st.geom.R * 0.4, ox: 12, oy: g.st.geom.cy + g.st.geom.R + 60 })],
  ['index.html', 'merit', st => st.D, g => ({ hx: null })],
  ['index.html', 'gridDay', st => st.hour, g => ({ hx: null })],
  ['index.html', 'buildPlant', st => st.wacc, g => ({ hx: null })],
];
for (const [page, name] of cases) {
  const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
  await p.goto('file://' + resolve('dist/' + page)); await p.evaluate(() => document.fonts.ready);
  const cv = p.locator(`figure[data-fig="${name}"] canvas`).first(); await cv.scrollIntoViewIfNeeded();
  await p.evaluate(n => document.querySelector(`figure[data-fig="${n}"] canvas`).scrollIntoView({ block: 'center' }), name); await sl(600);
  const bb = await cv.boundingBox();
  // 1) vertical swipe on the canvas, away from any handle (left edge of the plot)
  const s0 = await p.evaluate(() => scrollY);
  await swipe(p, cdp, bb.x + 30, bb.y + bb.height * 0.75, bb.y + bb.height * 0.35);
  const s1 = await p.evaluate(() => scrollY);
  const scrolled = Math.abs(s1 - s0) > 40;
  // 2) drag starting on the handle
  await p.evaluate(n => document.querySelector(`figure[data-fig="${n}"] canvas`).scrollIntoView({ block: 'center' }), name); await sl(500);
  const bb2 = await cv.boundingBox();
  const h = await p.evaluate(n => { const el = document.querySelector(`figure[data-fig="${n}"]`), S = el.__sim.st;
    if (n === 'rotor') return { x: S.geom.cx + S.geom.R * 0.45, y: S.geom.cy, v: S.ang, dx: 0, dy: 60 };
    return null; }, name);
  let hx, hy, dx = 60, dy = name === 'bladeElement' ? -50 : 0, before, after, key = ({ merit: 'D', gridDay: 'hour', buildPlant: 'wacc', rotor: 'ang', ...Object.fromEntries(argCases.map(a => [a[1], a[2]])) })[name];
  before = await p.evaluate(([n, k]) => document.querySelector(`figure[data-fig="${n}"]`).__sim.st[k], [name, key]);
  if (h) { hx = h.x; hy = h.y; dx = 0; dy = 60; }
  else {
    // find the handle by probing the figure's touchHit via synthetic geometry: scan x across the canvas mid-height
    const found = await p.evaluate(n => { const c = document.querySelector(`figure[data-fig="${n}"] canvas`); return !!c; }, name); void found;
    if (name === 'merit') { // demand line at st.D: scan for it using elementFromPoint is not possible on canvas; use known layout
      const D = before; const X1 = 160; void X1; hx = null;
    }
    // generic scan: try touch drags at many x until the value changes
    for (let fx = 0.12; fx < 0.98 && hx == null; fx += 0.03) for (let fy = 0.04; fy < 0.97; fy += 0.03) {
      const x = bb2.x + bb2.width * fx, y = bb2.y + bb2.height * fy;
      const ok = await p.evaluate(([n, x, y]) => { const c = document.querySelector(`figure[data-fig="${n}"] canvas`), r = c.getBoundingClientRect(); const ev = new TouchEvent('touchstart', { cancelable: true, touches: [new Touch({ identifier: 1, target: c, clientX: x, clientY: y })] }); c.dispatchEvent(ev); return ev.defaultPrevented; }, [name, x, y]);
      if (ok) { hx = x - bb2.x; hy = y - bb2.y; break; }
    }
  }
  if (hx == null) { console.log(name, 'NO HANDLE FOUND'); fails++; await p.close(); continue; }
  const s2 = await p.evaluate(() => scrollY);
  await swipe(p, cdp, bb2.x + hx, bb2.y + hy, bb2.y + hy + dy, bb2.x + hx + dx);
  const s3 = await p.evaluate(() => scrollY);
  after = await p.evaluate(([n, k]) => document.querySelector(`figure[data-fig="${n}"]`).__sim.st[k], [name, key]);
  const moved = after !== before, still = Math.abs(s3 - s2) < 5;
  const pass = scrolled && moved && still; if (!pass) fails++;
  console.log(`${name}: swipe-away scrolled ${s1 - s0}px ${scrolled ? 'OK' : 'FAIL'}; handle drag ${before}→${after} ${moved ? 'OK' : 'FAIL'}, page moved ${s3 - s2}px ${still ? 'OK' : 'FAIL'}`);
  await p.close();
}
console.log(fails ? `TOUCH TEST: ${fails} FAIL` : 'TOUCH TEST PASSED'); await b.close();
