// Fix-5 check: pages where figures were cut or merged, from file://. Screenshots of the affected stretch.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const OUT = 'screenshots/fix5'; mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' }); const errs = [];
const sl = ms => new Promise(r => setTimeout(r, ms));
const spots = [['transmission.html', '#congestion', 'transmission-congestion'], ['transmission.html', 'figure[data-fig="loopFlow"]', 'loopFlow'], ['synthetic-fuels.html', '#projects', 'synfuels-projects'], ['transformers.html', '#shortage', 'transformers-shortage'], ['solar-pv.html', '#costs-world', 'solar-costs-world'], ['index.html', '#s14', 'index-s14']];
for (const [w, t] of [[1280, 'd'], [390, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 1100 : 1600 } });
  for (const [pg, sel, name] of spots) {
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(`${pg} ${e.message}`));
    await p.goto('file://' + resolve('dist/' + pg)); await p.evaluate(() => document.fonts.ready);
    if (!(await p.$(sel))) { errs.push(`${pg}: missing ${sel}`); await p.close(); continue; }
    if (sel.startsWith('figure')) {
      await p.locator(sel).scrollIntoViewIfNeeded(); await sl(800);
      // drive surplus up so the redispatch sentence appears
      await p.evaluate(s => { const i = document.querySelector(s + ' input[type=range]'); i.value = 14; i.dispatchEvent(new Event('input', { bubbles: true })); }, sel); await sl(500);
      await p.locator(sel).screenshot({ path: `${OUT}/${t}-${name}.png` });
    } else {
      await p.evaluate(s => document.querySelector(s).scrollIntoView(), sel); await sl(900);
      await p.screenshot({ path: `${OUT}/${t}-${name}.png` });
    }
    await p.close();
  }
  await ctx.close();
}
console.log(errs.join('\n') || 'NO ERRORS'); await b.close();
