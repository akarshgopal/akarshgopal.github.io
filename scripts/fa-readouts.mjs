import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
for (const pg of ['index','solar-pv','utility-renewables','transformers','transmission','synthetic-fuels']) {
  const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await p.goto('file://' + resolve(`dist/${pg}.html`)); await p.waitForTimeout(2500);
  const r = await p.evaluate(() => [...document.querySelectorAll('figure[data-fig]')].map(f => [f.dataset.fig, [...f.querySelectorAll('.readout')].map(x => x.innerText.replace(/\s+/g,' ')).join(' | ')]).filter(x => x[1]));
  console.log('=== ' + pg); for (const [k, v] of r) console.log(k + ': ' + v);
  await p.close();
}
await b.close();
