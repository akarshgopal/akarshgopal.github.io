// Fix-3 check: buildPlant, desktop and phone, from file://; prints the numbers the prose quotes.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const OUT = 'screenshots/fix3'; mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errs = []; const sl = ms => new Promise(r => setTimeout(r, ms));
for (const [w, tag] of [[1280, 'd'], [390, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(`[${w}] ${e.message}`)); p.on('console', m => m.type() === 'error' && errs.push(`[${w}] ${m.text()}`));
  await p.goto('file://' + resolve('dist/index.html')); await p.evaluate(() => document.fonts.ready);
  const F = p.locator('figure[data-fig="buildPlant"]'); await F.scrollIntoViewIfNeeded(); await sl(900);
  await F.screenshot({ path: `${OUT}/${tag}-buildPlant-0-solar.png` });
  if (tag === 'd') {
    const nums = await p.evaluate(() => { const S = document.querySelector('figure[data-fig="buildPlant"]').__sim, o = {};
      const run = (tech, market, wacc) => { S.st.tech = tech; S.st.market = market; S.st.wacc = wacc; S.st.p = { ...S.st.p }; return S.compute(); };
      return o; });
    void nums;
  }
  // drag the wacc dot to ~10%
  const c = await F.locator('canvas').first().boundingBox();
  const bx = tag === 'd' ? [c.x + c.width * 0.56, c.x + c.width - 16] : [c.x + 46, c.x + c.width - 12];
  const by = tag === 'd' ? c.y + 150 : c.y + 360;
  await p.mouse.move(bx[0] + (bx[1] - bx[0]) * 0.5, by); await p.mouse.down(); await p.mouse.move(bx[0] + (bx[1] - bx[0]) * 0.667, by, { steps: 5 }); await p.mouse.up(); await sl(300);
  console.log(tag, 'wacc after drag', await p.evaluate(() => document.querySelector('figure[data-fig="buildPlant"]').__sim.st.wacc));
  await F.screenshot({ path: `${OUT}/${tag}-buildPlant-1-wacc10.png` });
  await F.locator('button:has-text("New nuclear")').click(); await sl(300); await F.screenshot({ path: `${OUT}/${tag}-buildPlant-2-nuclear.png` });
  await F.locator('button:has-text("Gas combined")').click(); await sl(300); await F.screenshot({ path: `${OUT}/${tag}-buildPlant-3-gas.png` });
  await F.locator('button:has-text("gas shock")').click(); await sl(300); await F.screenshot({ path: `${OUT}/${tag}-buildPlant-4-gas-shock.png` });
  console.log(tag, (await F.locator('.readout, output').first().innerText()).slice(0, 400));
  await ctx.close();
}
console.log(errs.length ? errs.join('\n') : 'NO ERRORS'); await b.close();
