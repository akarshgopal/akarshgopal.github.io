// Fix-4 check: generator chain (index rotor, threePhase) and Part 3 windings, desktop and phone, from file://.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const OUT = 'screenshots/fix4'; mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errs = []; const sl = ms => new Promise(r => setTimeout(r, ms));
for (const [w, tag] of [[1280, 'd'], [390, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  let p = await ctx.newPage();
  p.on('pageerror', e => errs.push(`[${w}] ${e.message}`)); p.on('console', m => m.type() === 'error' && errs.push(`[${w}] ${m.text()}`));
  await p.goto('file://' + resolve('dist/index.html')); await p.evaluate(() => document.fonts.ready);
  let F = p.locator('figure[data-fig="rotor"]'); await F.locator('canvas').first().scrollIntoViewIfNeeded(); await sl(500);
  await F.screenshot({ path: `${OUT}/${tag}-rotor-0.png` });
  // turn the rotor by hand: circle around its centre
  const g = await p.evaluate(() => document.querySelector('figure[data-fig="rotor"]').__sim.st.geom);
  const c = await F.locator('canvas').first().boundingBox();
  const X = a => c.x + g.cx + Math.cos(a) * g.R * 0.5, Y = a => c.y + g.cy + Math.sin(a) * g.R * 0.5;
  await p.mouse.move(X(0), Y(0)); await p.mouse.down();
  for (let i = 1; i <= 40; i++) { await p.mouse.move(X(i * 0.16), Y(i * 0.16)); await sl(25); }
  await F.screenshot({ path: `${OUT}/${tag}-rotor-1-turning.png` }); await p.mouse.up();
  console.log(tag, 'omega after hand turn', (await p.evaluate(() => document.querySelector('figure[data-fig="rotor"]').__sim.st.omega)).toFixed(2));
  F = p.locator('figure[data-fig="threePhase"]'); await F.locator('canvas').first().scrollIntoViewIfNeeded(); await sl(1500);
  await F.screenshot({ path: `${OUT}/${tag}-threePhase-0.png` });
  await F.locator('button[data-name="g3-sum"]').click(); await sl(1500); await F.screenshot({ path: `${OUT}/${tag}-threePhase-1-sum.png` });
  await F.locator('button[data-name="g3-p"]').click(); await sl(1500); await F.screenshot({ path: `${OUT}/${tag}-threePhase-2-power.png` });
  await p.close(); p = await ctx.newPage();
  p.on('pageerror', e => errs.push(`[${w} xf] ${e.message}`)); p.on('console', m => m.type() === 'error' && errs.push(`[${w} xf] ${m.text()}`));
  await p.goto('file://' + resolve('dist/transformers.html')); await p.evaluate(() => document.fonts.ready);
  F = p.locator('figure[data-fig="windings"]'); await F.scrollIntoViewIfNeeded(); await sl(1200);
  await F.screenshot({ path: `${OUT}/${tag}-windings-0-star.png` });
  await p.evaluate(() => { const i = document.querySelector('figure[data-fig="windings"] input[type=range]'); i.value = 0.3; i.dispatchEvent(new Event('input', { bubbles: true })); }); await sl(1200);
  await F.screenshot({ path: `${OUT}/${tag}-windings-1-unbalanced.png` });
  await F.locator('button[data-name="w-delta"]').click(); await sl(1200); await F.screenshot({ path: `${OUT}/${tag}-windings-2-delta.png` });
  await ctx.close();
}
console.log(errs.length ? errs.join('\n') : 'NO ERRORS'); await b.close();
