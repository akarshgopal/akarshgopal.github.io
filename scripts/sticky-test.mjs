import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
for (const [pg, f] of [['index.html', 'merit'], ['synthetic-fuels.html', 'lcohExplorer'], ['synthetic-fuels.html', 'cheapHours']]) {
  const p = await ctx.newPage(); await p.goto('file://' + resolve('dist/' + pg)); await p.evaluate(() => document.fonts.ready);
  // scroll so the last slider in the figure is at the bottom of the screen
  const go = () => p.evaluate(f => { const el = document.querySelector(`figure[data-fig="${f}"]`); const s = [...el.querySelectorAll('input[type=range]')].filter(i => i.checkVisibility()).pop(); const y = s.getBoundingClientRect().bottom + scrollY - innerHeight + 40; window.scrollTo({ top: y, behavior: 'instant' }); const c = el.querySelector('.canvas-wrap').getBoundingClientRect(), sr = s.getBoundingClientRect(); return { canvasTop: Math.round(c.top), canvasBottom: Math.round(c.bottom), slider: Math.round(sr.top) }; }, f);
  await go(); await new Promise(r => setTimeout(r, 900)); await go(); await new Promise(r => setTimeout(r, 400)); const r = await go();
  await p.screenshot({ path: `screenshots/fix9/m-sticky-${f}.png` });
  console.log(f, JSON.stringify(r), r.canvasTop >= -1 && r.canvasBottom <= r.slider ? 'canvas pinned above slider OK' : 'CHECK');
  await p.close();
}
await b.close();
