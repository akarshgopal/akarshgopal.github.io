// Layout audit: canvas text collisions / clipping (via draw.text hook), DOM overflow, fixed-button overlap.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const PAGE = (process.argv.find(a => a.startsWith('--page=')) || '--page=index.html').slice(7);
const PORT = 8766 + Math.floor(Math.random() * 200);
const TAG = PAGE === 'index.html' ? '' : '-' + PAGE.replace('.html', '');
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: 'dist', stdio: 'ignore' });
await new Promise(r => setTimeout(r, 700));
const widths = ((process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '') || '1280,1024,768,390').split(',').map(Number);
const only = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3].split(',') : null;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const STRESS = process.argv.includes('--stress');
const CHECK = (n) => {
      const fig = document.querySelector(`figure[data-fig="${n}"]`); const out = [];
      for (const c of fig.querySelectorAll('canvas')) {
        const T = (c.__texts || []).filter(t => t.s.trim()); const w = c.clientWidth, h = c.clientHeight;
        if (h / w > 2.4) out.push(`tall canvas ${w}x${h}`);
        if (w > 500 && h / w < 0.22) out.push(`squashed canvas ${w}x${h}`);
        for (const t of T) if (t.x0 < -1 || t.x1 > w + 1 || t.y0 < -1 || t.y1 > h + 1) out.push(`CLIP "${t.s}" [${t.x0|0},${t.y0|0},${t.x1|0},${t.y1|0}] in ${w}x${h}`);
        for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) {
          const a = T[i], b = T[j];
          const ix = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0), iy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
          if (ix > 1.5 && iy > 1.5) out.push(`OVERLAP "${a.s}" × "${b.s}" (${ix|0}x${iy|0})`);
        }
      }
      // content: bad numbers in canvas text and DOM readouts/outputs
      const bad = /NaN|Infinity|undefined|null|\[object|−0(?![.,\d])|\$−?\$|€\$|\$€/;
      for (const c of fig.querySelectorAll('canvas')) for (const t of (c.__texts || [])) if (bad.test(t.s)) out.push(`BADTEXT canvas "${t.s}"`);
      for (const d of fig.querySelectorAll('.readout, output, .ctl .name')) { const tx = d.textContent; if (bad.test(tx)) out.push(`BADTEXT dom "${tx.slice(0, 90)}"`); }
      // touch targets
      if (document.documentElement.clientWidth < 500) for (const b of fig.querySelectorAll('button, input[type=range]')) { const r = b.getBoundingClientRect(); if (r.width && (r.height < 32 || r.width < 32)) out.push(`SMALL target ${b.tagName.toLowerCase()} "${(b.textContent || b.dataset.name || '').trim().slice(0, 20)}" ${r.width | 0}x${r.height | 0}`); }
      // DOM: anything wider than the figure
      const fr = fig.getBoundingClientRect();
      for (const d of fig.querySelectorAll('.controls, .readout, figcaption, .ctl')) { const r = d.getBoundingClientRect(); if (r.width && (r.right > fr.right + 1 || r.left < fr.left - 1)) out.push(`DOM overflow ${d.className}`); }
      if (fr.right > document.documentElement.clientWidth + 1) out.push('figure wider than viewport');
      // fixed toggle covering figure content
      const pt = document.getElementById('play-toggle');
      if (pt && getComputedStyle(pt).display !== 'none' && getComputedStyle(pt).position === 'fixed' && +getComputedStyle(pt).opacity > 0.1) {
        const p = pt.getBoundingClientRect();
        if (p.left < fr.right && p.right > fr.left && p.top < fr.bottom && p.bottom > fr.top) out.push('fixed play button overlaps figure');
      }
      return out;
    };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const report = []; const errors = [];
for (const W of widths) {
  const ctx = await browser.newContext({ viewport: { width: W, height: 900 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { globalThis.__AUDIT = true; });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push(`[${W}] ${m.text()}`); });
  page.on('pageerror', e => errors.push(`[${W}] ${e.message}`));
  await page.goto(`http://127.0.0.1:${PORT}/${PAGE}`); await page.evaluate(() => document.fonts.ready);
  const names = await page.$$eval('figure[data-fig]', els => els.map(e => e.dataset.fig));
  for (const n of names) {
    if (only && !only.includes(n)) continue;
    const el = await page.$(`figure[data-fig="${n}"]`); await el.scrollIntoViewIfNeeded(); await sleep(450);
    const res = await page.evaluate(CHECK, n);
    for (const r of [...new Set(res)]) report.push(`[${W}] ${n}: ${r}`);
    if (STRESS) {
      const nIn = await page.$$eval(`figure[data-fig="${n}"] input[type=range]`, e => e.length);
      for (let k = 0; k < nIn; k++) for (const end of ['min', 'max']) {
        const lab = await page.$$eval(`figure[data-fig="${n}"] input[type=range]`, (els, [k, end]) => { const e = els[k]; e.__orig ??= e.value; e.value = e[end]; e.dispatchEvent(new Event('input', { bubbles: true })); return (e.dataset.name || k) + '=' + end; }, [k, end]);
        await sleep(250); for (const r of await page.evaluate(CHECK, n)) report.push(`[${W}] ${n} {${lab}}: ${r}`);
        await page.$$eval(`figure[data-fig="${n}"] input[type=range]`, (els, k) => { const e = els[k]; e.value = e.__orig; e.dispatchEvent(new Event('input', { bubbles: true })); }, k);
      }
      const nB = await page.$$eval(`figure[data-fig="${n}"] button`, e => e.length);
      for (let k = 0; k < nB; k++) {
        const lab = await page.$$eval(`figure[data-fig="${n}"] button`, (els, k) => { els[k].click(); return els[k].textContent.trim().slice(0, 24); }, k);
        await sleep(n === 'frequency' ? 2500 : 300); for (const r of await page.evaluate(CHECK, n)) report.push(`[${W}] ${n} {${lab}}: ${r}`);
      }
    }
  }
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) report.push(`[${W}] page has horizontal scroll`);
  await ctx.close();
}
report.splice(0, report.length, ...new Set(report)); writeFileSync(`screenshots/audit${TAG}${STRESS ? '-stress' : ''}.txt`, report.join('\n') || 'clean');
console.log(report.join('\n') || 'AUDIT CLEAN'); console.log('console errors:', errors.length ? errors : 'none');
await browser.close(); server.kill();
