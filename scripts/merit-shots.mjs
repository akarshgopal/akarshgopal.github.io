// Fix-1 check: the three merit-order figures, desktop and phone, from file://.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const OUT = 'screenshots/fix1'; mkdirSync(OUT, { recursive: true });
const URL = 'file://' + resolve('dist/index.html');
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errs = [];
const sl = ms => new Promise(r => setTimeout(r, ms));
for (const [w, tag, touch] of [[1280, 'd', false], [390, 'm', true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, hasTouch: touch });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(`[${w}] ${e.message}`)); p.on('console', m => m.type() === 'error' && errs.push(`[${w}] ${m.text()}`));
  await p.goto(URL); await p.evaluate(() => document.fonts.ready);
  const F = n => p.locator(`figure[data-fig="${n}"]`);
  for (const n of ['meritStack', 'meritWind', 'merit']) { await F(n).scrollIntoViewIfNeeded(); await sl(900); await F(n).screenshot({ path: `${OUT}/${tag}-${n}-0.png` }); }
  // stage 1: sort, then drag demand on canvas
  await F('meritStack').locator('button:has-text("Cheapest first")').click(); await sl(1200);
  let c = await F('meritStack').locator('canvas').first().boundingBox();
  await p.mouse.move(c.x + c.width * 0.3, c.y + c.height * 0.5); await p.mouse.down(); await p.mouse.move(c.x + c.width * 0.62, c.y + c.height * 0.5, { steps: 8 }); await p.mouse.up(); await sl(900);
  await F('meritStack').screenshot({ path: `${OUT}/${tag}-meritStack-1-sorted-dragged.png` });
  // stage 2: drag wind handle right
  await F('meritWind').scrollIntoViewIfNeeded(); await sl(400);
  const h = await p.evaluate(() => { const el = document.querySelector('figure[data-fig="meritWind"]'); return el.__sim.st.wind; });
  c = await F('meritWind').locator('canvas').first().boundingBox();
  const g = await p.evaluate(() => null);
  // find handle by scanning: use __sim compute to get windEnd; map via known box (l=58, r=w-16)
  const info = await p.evaluate(() => { const el = document.querySelector('figure[data-fig="meritWind"]'); const { windEnd, total } = el.__sim.compute(); return { windEnd, total, D: el.__sim.st.D }; });
  const X1 = Math.max(Math.ceil((info.D + 8) / 20) * 20, Math.ceil(info.total * 1.04 / 20) * 20);
  const sx = v => c.x + 58 + (c.width - 16 - 58) * v / X1;
  const yb = c.y + c.height - 44; // box.b
  const hx = sx(info.windEnd);
  // handle sits 46px above the zero line; zero line y unknown -> probe by trying a band of y
  let ok = false;
  for (let y = yb - 20; y > c.y + 40 && !ok; y -= 6) {
    await p.mouse.move(hx, y); await p.mouse.down(); await p.mouse.move(hx + 60, y, { steps: 6 }); await p.mouse.up(); await sl(200);
    const wnd = await p.evaluate(() => document.querySelector('figure[data-fig="meritWind"]').__sim.st.wind);
    if (wnd !== h) ok = wnd;
  }
  console.log(tag, 'wind drag', h, '->', ok); await sl(900);
  await F('meritWind').screenshot({ path: `${OUT}/${tag}-meritWind-1-dragged.png` });
  await ctx.close();
}
console.log(errs.length ? errs.join('\n') : 'NO ERRORS'); await b.close();
