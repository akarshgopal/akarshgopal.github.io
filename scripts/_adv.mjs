// Adversarial figure driver: all sliders min/max together, crossed combos, pointer drags far outside the canvas,
// buttons followed by extremes. Reports BADTEXT/CLIP/OVERLAP plus console errors; dumps readouts at extremes.
// node scripts/_adv.mjs page.html 390|1280 [shotdir]
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { readFileSync, mkdirSync } from 'node:fs';
const PAGE = process.argv[2], W = +process.argv[3], SHOT = process.argv[4];
if (SHOT) mkdirSync(SHOT, { recursive: true });
const src = readFileSync(new URL('./audit.mjs', import.meta.url), 'utf8');
const CHECK = eval(src.slice(src.indexOf('const CHECK = ') + 14, src.indexOf('const sleep')).trim().replace(/;$/, ''));
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: W, height: 900 }, hasTouch: false });
await ctx.addInitScript(() => { globalThis.__AUDIT = true; });
const p = await ctx.newPage(); const errs = [];
let CUR = ''; p.on('pageerror', e => errs.push(CUR + ': ' + e.message + ' ' + (e.stack || '').split('\n').slice(1, 3).join(' '))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file://' + resolve('dist', PAGE)); await p.evaluate(() => document.fonts.ready);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const names = await p.$$eval('figure[data-fig]', e => e.map(x => x.dataset.fig));
const rep = []; const ro = n => p.$eval(`figure[data-fig="${n}"]`, f => [...f.querySelectorAll('.readout')].map(d => d.textContent.trim().replace(/\s+/g, ' ')).join(' | ').slice(0, 300));
const chk = async (n, tag) => { for (const r of await p.evaluate(CHECK, n)) if (!/SMALL|tall canvas|squashed/.test(r)) rep.push(`${n} {${tag}}: ${r}`); };
const setAll = (n, mode) => p.$$eval(`figure[data-fig="${n}"] input[type=range]`, (els, mode) => els.forEach((e, i) => { e.value = mode === 'min' ? e.min : mode === 'max' ? e.max : (i % 2 ? e.min : e.max); e.dispatchEvent(new Event('input', { bubbles: true })); }), mode);
for (const n of names) {
  CUR = n; const el = await p.$(`figure[data-fig="${n}"]`); await (await el.$("canvas") || el).scrollIntoViewIfNeeded(); await sleep(400);
  const nIn = await p.$$eval(`figure[data-fig="${n}"] input[type=range]`, e => e.length);
  const out = [];
  if (nIn) for (const m of ['min', 'max', 'mixA']) { await setAll(n, m); await sleep(250); await chk(n, 'all ' + m); out.push(m + ': ' + await ro(n)); if (SHOT && m !== 'mixA') await el.screenshot({ path: `${SHOT}/${n}-${m}-${W}.png` }); }
  // pointer abuse on every canvas
  for (const c of await p.$$(`figure[data-fig="${n}"] canvas`)) {
    const bb = await c.boundingBox(); if (!bb) continue;
    for (const fy of [0.15, 0.5, 0.85]) {
      const y = bb.y + bb.height * fy;
      await p.mouse.move(bb.x + bb.width * 0.5, y); await p.mouse.down();
      for (const [x2, y2] of [[bb.x - 400, y], [bb.x + bb.width + 600, y], [bb.x + bb.width / 2, bb.y - 500], [bb.x + bb.width / 2, bb.y + bb.height + 800], [bb.x + bb.width + 600, bb.y + bb.height + 800]]) { await p.mouse.move(x2, y2, { steps: 4 }); await sleep(60); await chk(n, `drag ${fy} → ${x2 | 0},${y2 | 0}`); }
      await p.mouse.up(); await sleep(80); await chk(n, `after drag ${fy}`);
    }
    // rapid clicks at corners
    for (const [fx, fy] of [[0.01, 0.01], [0.99, 0.99], [0.01, 0.99], [0.99, 0.01], [0.5, 0.5]]) { await p.mouse.click(bb.x + bb.width * fx, bb.y + bb.height * fy); await sleep(60); await chk(n, `click ${fx},${fy}`); }
  }
  out.push('afterPointer: ' + await ro(n));
  const nB = await p.$$eval(`figure[data-fig="${n}"] button`, e => e.length);
  for (let k = 0; k < nB; k++) {
    const lab = await p.$$eval(`figure[data-fig="${n}"] button`, (els, k) => { els[k].click(); return els[k].textContent.trim().slice(0, 20); }, k);
    await sleep(200); if (nIn) { await setAll(n, 'max'); await sleep(150); await chk(n, `btn ${lab} + max`); await setAll(n, 'min'); await sleep(150); }
    await chk(n, `btn ${lab} + min`);
  }
  if (SHOT) await el.screenshot({ path: `${SHOT}/${n}-final-${W}.png` });
  console.log(`## ${n}\n  ` + out.join('\n  '));
}
console.log('\n# ISSUES (' + PAGE + ' @' + W + ')\n' + ([...new Set(rep)].join('\n') || 'none'));
console.log('errors:', errs.length ? [...new Set(errs)] : 'none');
await b.close();
