import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
for (const pg of ['index','solar-pv','utility-renewables','transformers','transmission','synthetic-fuels']) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message));
  await p.goto(`file:///workspace/electricity-explainer/dist/${pg}.html`);
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await new Promise(r => setTimeout(r, 50)); }
  console.log(pg, 'canvases', await p.$$eval('canvas', c => c.length), 'errors', errs.length ? errs : 'none'); await p.close();
}
for (const [pg, id, w] of [['solar-pv','fig-captureHistory',390],['utility-renewables','fig-hybridPlant',1280],['synthetic-fuels','fig-futures',390]]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: w < 500 ? 2 : 1 });
  await p.goto(`file:///workspace/electricity-explainer/dist/${pg}.html`);
  const e = await p.$('#' + id); if (!e) { console.log('missing', id); continue; }
  await e.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  await e.screenshot({ path: `/workspace/fa/shots/${pg}-${w}.png` }); console.log('shot', pg, w); await p.close();
}
await b.close();
