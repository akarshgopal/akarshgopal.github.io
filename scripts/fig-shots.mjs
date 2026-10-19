// Screenshot figures from file:// at 1280 and 390. Usage: node scripts/fig-shots.mjs outdir page.html:fig[:name[:js]] ...
// js (optional) runs in the page with `el` = the figure, before the shot (e.g. "el.__sim.st.x=0.2").
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const [out, ...specs] = process.argv.slice(2); mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' }); const errs = [];
const sl = ms => new Promise(r => setTimeout(r, ms));
for (const [w, t] of [[1280, 'd'], [390, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: w > 500 ? 1 : 2 });
  for (const s of specs) {
    const [pg, fig, name, js] = s.split('::').length > 1 ? s.split('::') : s.split(':');
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(`${pg} ${e.message}`)); p.on('console', m => { if (m.type() === 'error') errs.push(`${pg} ${m.text()}`); });
    await p.goto('file://' + resolve('dist/' + pg)); await p.evaluate(() => document.fonts.ready);
    const loc = p.locator(`figure[data-fig="${fig}"]`).first();
    if (!(await loc.count())) { errs.push(`${pg}: no ${fig}`); await p.close(); continue; }
    await p.evaluate(f => document.querySelector(`figure[data-fig="${f}"]`).scrollIntoView({ behavior: 'instant' }), fig); await sl(900);
    if (js) { await p.evaluate(([f, code]) => { const el = document.querySelector(`figure[data-fig="${f}"]`); new Function('el', code)(el); }, [fig, js]); await sl(700); }
    await loc.screenshot({ path: `${out}/${t}-${name || fig}.png` });
    await p.close();
  }
  await ctx.close();
}
console.log(errs.join('\n') || 'NO ERRORS'); await b.close();
