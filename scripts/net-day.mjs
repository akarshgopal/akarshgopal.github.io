// Network day-mode check: switch to "A day", scrub to 03:00 and 18:30, play briefly; screenshot each state.
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage(); const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + resolve('dist/index.html')); await p.waitForTimeout(800);
const f = await p.$('figure[data-fig="network"]'); await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
await f.evaluate(f => [...f.querySelectorAll('button')].find(x => x.textContent.trim() === 'A day').click());
for (const hh of [3, 18.5]) {
  await f.evaluate((f, hh) => { const s = [...f.querySelectorAll('input[type=range]')].find(e => e.max === '23.75'); s.value = hh; s.dispatchEvent(new Event('input', { bubbles: true })); }, hh);
  await p.waitForTimeout(500); await f.screenshot({ path: `screenshots/hidpi/network-day-${hh}.png` });
  console.log(hh, await f.$eval('.readout', r => r.textContent.slice(0, 160)));
}
await f.evaluate(f => [...f.querySelectorAll('button')].find(x => /Play the day/.test(x.textContent)).click());
await p.waitForTimeout(3000); console.log('playing', await f.$eval('.readout', r => r.textContent.slice(0, 40)), errs);
await b.close();
