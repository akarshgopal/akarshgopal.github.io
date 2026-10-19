// Phone pass check at 390 px: per figure, canvas height vs controls height, smallest canvas label (CSS px).
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const pages = (process.argv[2] || 'index,solar-pv,utility-renewables,transformers,transmission,synthetic-fuels').split(',');
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const P of pages) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { globalThis.__AUDIT = true; });
  const page = await ctx.newPage();
  await page.goto('file://' + resolve('dist', P + '.html')); await sleep(700);
  const names = await page.$$eval('figure[data-fig]', els => els.map(e => e.dataset.fig));
  for (const n of names) {
    const el = await page.$(`figure[data-fig="${n}"]`); await el.scrollIntoViewIfNeeded(); await sleep(250);
    const r = await page.$eval(`figure[data-fig="${n}"]`, f => {
      const cv = [...f.querySelectorAll('canvas')]; const ch = cv.reduce((a, c) => a + c.getBoundingClientRect().height, 0);
      const ct = [...f.querySelectorAll(':scope > .controls')].reduce((a, c) => a + c.getBoundingClientRect().height, 0);
      const px = cv.flatMap(c => (c.__texts || []).map(t => t.px)).filter(Boolean); const small = cv.flatMap(c => (c.__texts || []).filter(t => t.px && t.px < 10.95).map(t => t.s.slice(0, 20)));
      return { ch: Math.round(ch), ct: Math.round(ct), min: px.length ? Math.min(...px).toFixed(1) : '-', small: [...new Set(small)].slice(0, 4) };
    });
    const flags = [r.ct > r.ch ? 'CONTROLS>CHART' : '', r.small.length ? 'SMALL ' + r.small.join(' | ') : ''].filter(Boolean).join('; ');
    console.log(`${P}/${n}: chart ${r.ch} ctl ${r.ct} min ${r.min}${flags ? '  ' + flags : ''}`);
  }
  await ctx.close();
}
await browser.close();
