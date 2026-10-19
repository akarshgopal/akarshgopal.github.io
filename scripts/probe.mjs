// Interaction probe: per figure, drive every slider to min/max and click every button; record
// readout/canvas text changes, odd number formats, stale readouts and console errors. Also loads via file://.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const pages = (process.argv[2] || 'index,solar-pv,utility-renewables,transformers,transmission,synthetic-fuels').split(',');
const W = +(process.argv[3] || 1280);
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
const out = [];
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const P of pages) {
  const ctx = await browser.newContext({ viewport: { width: W, height: 900 } });
  await ctx.addInitScript(() => { globalThis.__AUDIT = true; });
  const page = await ctx.newPage(); const errs = [];
  page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto('file://' + resolve('dist', P + '.html')); await sleep(800);
  const names = await page.$$eval('figure[data-fig]', els => els.map(e => e.dataset.fig));
  for (const n of names) {
    const el = await page.$(`figure[data-fig="${n}"]`); await el.scrollIntoViewIfNeeded(); await sleep(300);
    const snap = () => page.$eval(`figure[data-fig="${n}"]`, f => ({ ro: [...f.querySelectorAll('.readout')].map(d => d.textContent).join(' | '), cv: [...f.querySelectorAll('canvas')].map(c => (c.__texts || []).map(t => t.s).join('¦')).join('##') }));
    const base = await snap(); const notes = [];
    const odd = s => { const m = []; for (const x of s.match(/[−-]?[$€]?\d[\d,]*\.\d{4,}/g) || []) m.push('long decimals ' + x); for (const x of s.match(/\$\d+(?:\.\d+)?\/MWh adds/g) || []) m.push('converted step ' + x); if (/(?<![\w])-\d/.test(s)) m.push('ASCII minus'); for (const x of s.match(/\d\.?\d*e[+-]\d+/g) || []) m.push('exponent ' + x); if (/\d{9,}/.test(s.replace(/,/g, ''))) m.push('huge number'); return m; };
    for (const x of odd(base.ro + ' ' + base.cv)) notes.push('default: ' + x);
    const nIn = await page.$$eval(`figure[data-fig="${n}"] input[type=range]`, e => e.length);
    for (let k = 0; k < nIn; k++) for (const end of ['min', 'max']) {
      const lab = await page.$$eval(`figure[data-fig="${n}"] input[type=range]`, (els, [k, end]) => { const e = els[k]; e.__o ??= e.value; e.value = e[end]; e.dispatchEvent(new Event('input', { bubbles: true })); return (e.closest('.ctl')?.querySelector('.name')?.textContent || e.dataset.name || 'slider' + k).trim().slice(0, 30); }, [k, end]);
      await sleep(120); const s = await snap();
      if (s.ro === base.ro && s.cv === base.cv) notes.push(`slider "${lab}" ${end}: nothing changed`);
      else if (s.ro && s.ro === base.ro) notes.push(`slider "${lab}" ${end}: readout unchanged`);
      for (const x of odd(s.ro + ' ' + s.cv)) notes.push(`slider "${lab}" ${end}: ${x}`);
      if (/NaN|Infinity|undefined/.test(s.ro + s.cv)) notes.push(`slider "${lab}" ${end}: NaN/undefined`);
      await page.$$eval(`figure[data-fig="${n}"] input[type=range]`, (els, k) => { const e = els[k]; e.value = e.__o; e.dispatchEvent(new Event('input', { bubbles: true })); }, k);
    }
    const nB = await page.$$eval(`figure[data-fig="${n}"] button`, e => e.length);
    let prev = await snap();
    for (let k = 0; k < nB; k++) {
      const lab = await page.$$eval(`figure[data-fig="${n}"] button`, (els, k) => { els[k].click(); return els[k].textContent.trim().slice(0, 24); }, k);
      await sleep(n === 'frequency' || n === 'hero3d' ? 1500 : 200); const s = await snap();
      if (s.ro === prev.ro && s.cv === prev.cv && !/^(US\$|Pause|Play)/.test(lab)) notes.push(`button "${lab}": nothing changed`);
      for (const x of odd(s.ro + ' ' + s.cv)) notes.push(`button "${lab}": ${x}`);
      if (/NaN|Infinity|undefined/.test(s.ro + s.cv)) notes.push(`button "${lab}": NaN/undefined`);
      prev = s;
    }
    out.push({ page: P, fig: n, sliders: nIn, buttons: nB, notes: [...new Set(notes)] });
  }
  if (errs.length) out.push({ page: P, fig: '(page)', notes: [...new Set(errs)].map(e => 'error: ' + e.slice(0, 160)) });
  await ctx.close();
}
await browser.close();
writeFileSync(`/tmp/probe-${W}.json`, JSON.stringify(out, null, 1));
for (const r of out) if (r.notes.length) console.log(`${r.page}/${r.fig}: ${r.notes.join('; ')}`);
