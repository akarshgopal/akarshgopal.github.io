// Animation check: click a merit preset and capture mid-transition and settled frames.
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
await p.goto('file://' + resolve('dist/index.html')); await p.waitForTimeout(800);
const f = await p.$('figure[data-fig="' + (process.argv[2] || 'merit') + '"]'); await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
await f.evaluate(f => [...f.querySelectorAll('button')].find(x => /gas shock/.test(x.textContent)).click());
await p.waitForTimeout(180); await f.screenshot({ path: 'screenshots/hidpi/merit-anim-mid.png' });
await p.waitForTimeout(2000); await f.screenshot({ path: 'screenshots/hidpi/merit-anim-end.png' });
await b.close(); console.log('ok');
