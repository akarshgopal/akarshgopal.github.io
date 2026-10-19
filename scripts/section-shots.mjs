// Screenshot prose at given anchors from file://. Usage: node scripts/section-shots.mjs outdir page.html#id[:name] ...
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const [out, ...specs] = process.argv.slice(2); mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' }); const errs = [];
for (const [w, t] of [[1280, 'd'], [390, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 1000 : 1500 } });
  for (const s of specs) {
    const [loc, name] = s.split(':'); const [pg, id] = loc.split('#');
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(`${pg} ${e.message}`));
    await p.goto('file://' + resolve('dist/' + pg)); await p.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 700));
    const go = () => p.evaluate(i => { const e = document.getElementById(i); if (!e) return false; e.scrollIntoView({ behavior: 'instant' }); return true; }, id);
    let ok = await go(); await new Promise(r => setTimeout(r, 700)); ok = await go();
    if (!ok) errs.push(`${pg}: no #${id}`); else { await new Promise(r => setTimeout(r, 900)); await p.screenshot({ path: `${out}/${t}-${name || id}.png` }); }
    await p.close();
  }
  await ctx.close();
}
console.log(errs.join('\n') || 'NO ERRORS'); await b.close();
