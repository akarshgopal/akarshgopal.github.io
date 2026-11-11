// 3D figure check: touch horizontal drag turns, vertical swipe scrolls, tap drops; mouse drag and arrow keys turn; no rAF off-screen.
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const [PAGE, FIG] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const hash = async c => createHash('md5').update(await c.screenshot()).digest('hex').slice(0, 8);
// phone with touch
{ const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto('file://' + resolve('dist', PAGE)); await sleep(500);
  const c = await p.$(`figure[data-fig="${FIG}"] canvas`); await c.scrollIntoViewIfNeeded(); await sleep(4000);
  const cdp = await ctx.newCDPSession(p); const bb = await c.boundingBox(); const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
  const swipe = async (dx, dy) => { await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: cx, y: cy }] }); for (let k = 1; k <= 10; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: cx + dx * k / 10, y: cy + dy * k / 10 }] }); await sleep(16); } await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sleep(400); };
  const y0 = await p.evaluate(() => scrollY); const h0 = await hash(c);
  await swipe(-140, 0); const y1 = await p.evaluate(() => scrollY); const h1 = await hash(c);
  console.log('touch horizontal: scroll moved', y1 - y0, '| canvas changed', h0 !== h1);
  await swipe(0, -160); const y2 = await p.evaluate(() => scrollY);
  console.log('touch vertical: page scrolled', y2 - y1);
  await c.scrollIntoViewIfNeeded(); await sleep(300); const bb2 = await c.boundingBox();
  const ro0 = await p.$eval(`figure[data-fig="${FIG}"] .readout`, e => e.textContent);
  await p.touchscreen.tap(bb2.x + bb2.width * 0.3, bb2.y + bb2.height * 0.35); await sleep(300);
  const ro1 = await p.$eval(`figure[data-fig="${FIG}"] .readout`, e => e.textContent);
  console.log('tap drop:', ro0, '=>', ro1);
  console.log('errors', errs);
  await ctx.close(); }
// desktop mouse
{ const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage(); await p.goto('file://' + resolve('dist', PAGE)); await sleep(500);
  const c = await p.$(`figure[data-fig="${FIG}"] canvas`); await c.scrollIntoViewIfNeeded(); await sleep(3000); const bb = await c.boundingBox(); const h0 = await hash(c);
  await p.mouse.move(bb.x + 300, bb.y + 200); await p.mouse.down(); await p.mouse.move(bb.x + 450, bb.y + 160, { steps: 8 }); await p.mouse.up(); await sleep(300);
  console.log('mouse drag: canvas changed', h0 !== await hash(c));
  await c.focus(); const h2 = await hash(c); await p.keyboard.press('ArrowLeft'); await sleep(200); console.log('keyboard arrow rotates', h2 !== await hash(c));
  // off-screen rAF count
  await p.evaluate(() => scrollTo(0, 0)); await sleep(500);
  const n = await p.evaluate(() => new Promise(r => { let n = 0; const o = requestAnimationFrame; window.requestAnimationFrame = f => { n++; return o(f); }; setTimeout(() => { window.requestAnimationFrame = o; r(n); }, 2000); }));
  console.log('rAF calls in 2 s at top of page:', n);
  await ctx.close(); }
await b.close();
