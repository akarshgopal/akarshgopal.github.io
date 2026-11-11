// Screenshot one figure after setting its sliders / dragging: node scripts/_shotstate.mjs page fig W out.png '[["slider",k,value]|["drag",fx0,fy,fx1]]'
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const [PAGE, FIG, W, OUT, STEPS] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await (await b.newContext({ viewport: { width: +W, height: 900 }, deviceScaleFactor: 2 })).newPage();
await p.goto('file://' + resolve('dist', PAGE)); await p.evaluate(() => document.fonts.ready);
const el = await p.$(`figure[data-fig="${FIG}"]`); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
for (const [k, a, bb, c] of JSON.parse(STEPS || '[]')) {
  if (k === 'slider') await p.$$eval(`figure[data-fig="${FIG}"] input[type=range]`, (els, [i, v]) => { els[i].value = v; els[i].dispatchEvent(new Event('input', { bubbles: true })); }, [a, bb]);
  if (k === 'btn') await p.click(`figure[data-fig="${FIG}"] [data-name="${a}"]`);
  if (k === 'drag') { const r = await (await el.$('canvas')).boundingBox(); await p.mouse.move(r.x + r.width * a, r.y + r.height * bb); await p.mouse.down(); await p.mouse.move(r.x + r.width * c, r.y + r.height * bb, { steps: 6 }); await p.mouse.up(); }
  await p.waitForTimeout(300);
}
await p.waitForTimeout(600); await el.screenshot({ path: OUT }); await b.close();
