// Single-figure screenshot after it has settled: node scripts/shot1.mjs page.html fig [width] [out]
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const [page, fig, W = '1280', out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await (await b.newContext({ viewport: { width: +W, height: 900 } })).newPage();
await p.goto('file://' + resolve('dist', page)); await p.waitForTimeout(800);
const f = await p.$(`figure[data-fig="${fig}"]`); await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(1800);
await f.screenshot({ path: out || `screenshots/hidpi/${fig}-${W}.png` }); await b.close(); console.log('ok');
