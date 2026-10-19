// Review 3: drive every control of every figure to its extremes; report bad readouts, canvas text and page errors.
import { chromium } from 'playwright'; import { resolve } from 'node:path'; import fs from 'node:fs';
const pages = process.argv[2] ? process.argv[2].split(',') : ['index','solar-pv','utility-renewables','transformers','transmission','synthetic-fuels'];
const W = +(process.argv[3] || 1280);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const out = [];
for (const pg of pages) {
  const ctx = await b.newContext({ viewport: { width: W, height: 900 } });
  await ctx.addInitScript(() => { globalThis.__AUDIT = true; });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + resolve(`dist/${pg}.html`)); await p.waitForTimeout(1000);
  const figs = await p.$$eval('figure[data-fig]', fs => fs.map(f => f.dataset.fig));
  for (const fig of figs) {
    await p.evaluate(fig => { const f = document.querySelector(`figure[data-fig="${fig}"]`); f.scrollIntoView(); f.querySelectorAll('details').forEach(d => d.open = true); }, fig);
    await p.waitForTimeout(500);
    const res = await p.evaluate(async fig => {
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      const f = document.querySelector(`figure[data-fig="${fig}"]`);
      const bad = /NaN|Infinity|undefined|null|\[object|−0(?![.,\d])/;
      const ro = () => [...f.querySelectorAll('.readout')].map(x => x.innerText.replace(/\s+/g, ' ')).join(' | ');
      const cv = () => [...f.querySelectorAll('canvas')].flatMap(c => (c.__texts || []).map(t => t.s)).filter(s => bad.test(s));
      const lines = [];
      const snap = async (label) => { await sleep(120); const r = ro(); const c = cv(); if (bad.test(r) || c.length) lines.push(`BAD ${label}: ${r.slice(0,300)} ${c.slice(0,5).join(' ; ')}`); else lines.push(`ok ${label}: ${r.slice(0,260)}`); };
      for (const i of f.querySelectorAll('input[type=range]')) {
        const v0 = i.value, n = i.dataset.name || i.id;
        for (const v of [i.min, i.max]) { i.value = v; i.dispatchEvent(new Event('input', { bubbles: true })); await snap(`${n}=${v}`); }
        i.value = v0; i.dispatchEvent(new Event('input', { bubbles: true }));
      }
      for (const btn of f.querySelectorAll('button')) {
        const t = (btn.dataset.name || btn.textContent || '').trim().slice(0, 30);
        if (/Pause|Reset meter/.test(t)) continue;
        btn.click(); await snap(`click ${t}`);
      }
      return lines;
    }, fig);
    for (const l of res) out.push(`${pg} ${fig} ${l}`);
  }
  out.push(`${pg} ERRORS: ${errs.length ? errs.join(' / ') : 'none'}`);
  await ctx.close();
}
fs.writeFileSync(`/workspace/r3/extremes-${W}.txt`, out.join('\n'));
console.log(out.filter(l => / BAD |ERRORS/.test(l)).join('\n'));
await b.close();
