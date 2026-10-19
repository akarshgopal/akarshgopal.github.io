// Fix-2 check: gridDay and its reuses, desktop and phone, from file://.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const OUT = 'screenshots/fix2'; mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errs = []; const sl = ms => new Promise(r => setTimeout(r, ms));
for (const [w, tag] of [[1280, 'd'], [390, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  for (const [page, figs] of [['index.html', ['gridDay', 'futureDay']], ['solar-pv.html', ['noonDay']], ['utility-renewables.html', ['seasonDay']]]) {
    const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(`[${w} ${page}] ${e.message}`)); p.on('console', m => m.type() === 'error' && errs.push(`[${w} ${page}] ${m.text()}`));
    await p.goto('file://' + resolve('dist/' + page)); await p.evaluate(() => document.fonts.ready);
    for (const n of figs) {
      const F = p.locator(`figure[data-fig="${n}"]`); await F.scrollIntoViewIfNeeded(); await sl(900);
      await F.screenshot({ path: `${OUT}/${tag}-${n}-0.png` });
      await F.locator('canvas').first().scrollIntoViewIfNeeded(); await sl(200); const c = await F.locator('canvas').first().boundingBox();
      await p.mouse.move(c.x + c.width * 0.3, c.y + c.height * 0.3); await p.mouse.down(); await p.mouse.move(c.x + c.width * 0.8, c.y + c.height * 0.3, { steps: 6 }); await p.mouse.up(); await sl(400);
      const hr = await p.evaluate(n => document.querySelector(`figure[data-fig="${n}"]`).__sim.st.hour, n);
      console.log(tag, n, 'hour after drag', hr.toFixed(2));
      await F.screenshot({ path: `${OUT}/${tag}-${n}-1-dragged.png` });
    }
    await p.close();
  }
  await ctx.close();
}
console.log(errs.length ? errs.join('\n') : 'NO ERRORS'); await b.close();
