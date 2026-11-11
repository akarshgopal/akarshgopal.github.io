// Peek-drawer rules: each "↓ look inside" drawer holds at most ~120 words of prose and at most one control, so it stays a glance
// and not a second page. Also checks each drawer has a data-level, opens without console errors and draws a nonblank canvas.
import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';
const pages = readdirSync('dist').filter(f => f.endsWith('.html'));
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let bad = 0, n = 0;
for (const pg of pages) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + process.cwd() + '/dist/' + pg); await p.waitForTimeout(400);
  const ids = await p.$$eval('details.peek', ds => ds.map(d => d.id || '(no id)'));
  for (const id of ids) {
    n++;
    await p.evaluate(i => { const d = document.getElementById(i); d.open = true; }, id); await p.waitForTimeout(500);
    const r = await p.evaluate(i => {
      const d = document.getElementById(i), clone = d.cloneNode(true);
      clone.querySelectorAll('summary, figure, canvas, svg, .ctl, .controls, .readout, figcaption, output').forEach(e => e.remove());
      const words = clone.textContent.trim().split(/\s+/).filter(Boolean).length;
      const ctl = d.querySelectorAll('input, select, button:not(.more-btn), [role=slider]').length;
      const cv = [...d.querySelectorAll('canvas')];
      // a drawer figure with no canvas or svg taller than 100 px has collapsed (e.g. sized while the drawer was shut)
      const figs = d.querySelectorAll('figure').length, tall = [...d.querySelectorAll('canvas, svg')].some(e => e.getBoundingClientRect().height > 100);
      return { words, ctl, level: d.dataset.level || '', canvases: cv.length, w: cv.map(c => c.clientWidth), figs, tall };
    }, id);
    const issues = [];
    if (r.words > 120) issues.push(`${r.words} words of prose (max 120)`);
    if (r.ctl > 1) issues.push(`${r.ctl} controls (max 1)`);
    if (!r.level) issues.push('no data-level');
    if (r.canvases && r.w.some(x => x < 40)) issues.push('canvas not laid out');
    if (r.figs && !r.tall) issues.push('figure collapsed');
    if (issues.length) { bad++; console.log(`${pg}#${id}: ${issues.join('; ')}`); }
  }
  if (errs.length) { bad++; console.log(`${pg}: console errors: ${errs.join(' | ').slice(0, 200)}`); }
  await p.close();
}
console.log(bad ? `PEEK ISSUES: ${bad}` : `PEEK CLEAN (${n} drawers)`);
await b.close();
