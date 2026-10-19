// High-DPI check: screenshot chosen figures at deviceScaleFactor 2 (and 1.5) from file://, and report canvases whose backing store is not scaled.
import { chromium } from 'playwright'; import { resolve } from 'node:path'; import { mkdirSync } from 'node:fs';
const [page, figs, dsf = '2'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: +dsf });
const p = await ctx.newPage(); await p.goto('file://' + resolve('dist', page)); await p.waitForTimeout(800);
mkdirSync('screenshots/hidpi', { recursive: true });
for (const n of figs.split(',')) {
  const f = await p.$(`figure[data-fig="${n}"]`); await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
  const bad = await f.evaluate((f, d) => [...f.querySelectorAll('canvas')].filter(c => c.clientWidth && Math.abs(c.width / c.clientWidth - d) > 0.05).map(c => `${c.width}/${c.clientWidth}`), +dsf);
  await f.screenshot({ path: `screenshots/hidpi/${n}@${dsf}x.png` });
  console.log(n, bad.length ? 'UNSCALED ' + bad.join(' ') : 'canvas scaled ok');
}
await b.close();
