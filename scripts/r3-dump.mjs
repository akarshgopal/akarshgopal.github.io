import { chromium } from 'playwright'; import { resolve } from 'node:path'; import fs from 'node:fs';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
for (const pg of ['index','solar-pv','utility-renewables','transformers','transmission','synthetic-fuels']) {
  const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  const errs=[]; p.on('pageerror', e=>errs.push(e.message)); p.on('console', m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('file://' + resolve(`dist/${pg}.html`));
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 800) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40); }
  await p.waitForTimeout(800);
  const t = await p.evaluate(() => document.querySelector('main, article, body').innerText);
  fs.writeFileSync(`/workspace/r3/${pg}.txt`, t);
  const r = await p.evaluate(() => [...document.querySelectorAll('figure')].map(f => (f.dataset.fig||f.id)+' :: '+[...f.querySelectorAll('.readout, figcaption')].map(x => x.innerText.replace(/\s+/g,' ')).join(' | ')));
  fs.writeFileSync(`/workspace/r3/${pg}.figs.txt`, r.join('\n'));
  console.log(pg, 'errs', errs.length, errs.slice(0,3), 'figs', r.length);
  await p.close();
}
await b.close();
