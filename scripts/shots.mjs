// Screenshots of every figure from file://, desktop (1280, dpr 1.5) and phone (390, dpr 2).
// node scripts/shots.mjs index.html [fig,fig]  ->  screenshots/<slug>/{d,m}-NN-<fig>.png
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const PAGE = process.argv[2] || 'index.html', SLUG = PAGE.replace('.html', ''), only = process.argv[3] ? process.argv[3].split(',') : null;
const OUT = `screenshots/${SLUG}`; mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const [W, dsf, pre] of [[1280, 1.5, 'd'], [390, 2, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 860 : 844 }, deviceScaleFactor: dsf });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + resolve('dist', PAGE)); await p.evaluate(() => document.fonts.ready);
  if (!only) await p.screenshot({ path: `${OUT}/${pre}-00-top.png` });
  const names = await p.$$eval('figure[data-fig]', e => e.map(x => x.dataset.fig));
  let i = 0;
  for (const n of names) { i++; if (only && !only.includes(n)) continue; const el = await p.$(`figure[data-fig="${n}"]`); await el.scrollIntoViewIfNeeded(); await sleep(900); await el.screenshot({ path: `${OUT}/${pre}-${String(i).padStart(2, '0')}-${n}.png` }); }
  console.log(W, names.length, 'figures', errs.length ? errs : 'no errors'); await ctx.close();
}
await b.close();
