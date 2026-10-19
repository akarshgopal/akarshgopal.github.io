// Prose words per h2 section (p, li, blockquote/aside outside figures; footnote markers excluded). Usage: node scripts/wc.mjs [page...]
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['index','solar-pv','utility-renewables','transformers','transmission','synthetic-fuels'];
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const p = await b.newPage();
for (const pg of pages) {
  await p.goto('file://' + resolve(`dist/${pg}.html`));
  const r = await p.evaluate(() => {
    const out = {}; let cur = '(intro)';
    const walker = document.querySelectorAll('h2, p, li, aside, blockquote');
    for (const e of walker) {
      if (e.closest('figure, nav, footer, .notes, #notes, .toc, header')) continue;
      if (e.tagName === 'H2') { cur = e.id || e.textContent.slice(0, 20); out[cur] = 0; continue; }
      if (e.parentElement.closest('p, li, aside, blockquote')) continue;
      const c = e.cloneNode(true); c.querySelectorAll('sup').forEach(s => s.remove());
      out[cur] = (out[cur] || 0) + c.textContent.split(/\s+/).filter(Boolean).length;
    }
    return out;
  });
  const tot = Object.values(r).reduce((a, x) => a + x, 0);
  console.log(`${pg} TOTAL ${tot}  ` + Object.entries(r).map(([k, v]) => `${k}:${v}`).join(' '));
}
await b.close();
