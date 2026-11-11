// Opens every live page straight from file:// at 1280 and 390 px, scrolls through it, and fails on any console error,
// failed request or figure that did not initialise.
import { chromium } from 'playwright';
import { PAGES } from '../src/series.mjs';
import { resolve } from 'node:path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let bad = 0;
for (const pg of PAGES.filter(p => p.status === 'live')) for (const w of [1280, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  const errs = []; p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('requestfailed ' + r.url()));
  await p.goto('file://' + resolve('dist', pg.file));
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await new Promise(r => setTimeout(r, 40)); }
  const figs = await p.$$eval('figure[data-fig]', e => e.length), failed = await p.$$eval('figure.fig-error', e => e.map(x => x.dataset.fig)), canv = await p.$$eval('canvas', c => c.length);
  const ok = !errs.length && !failed.length;
  if (!ok) bad++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${pg.file} @${w}: ${figs} figures, ${canv} canvases${failed.length ? ', failed: ' + failed : ''}${errs.length ? ', errors: ' + errs.join(' | ') : ''}`);
  await p.close();
}
await b.close();
if (bad) { console.log('FILE:// TEST FAILED'); process.exit(1); } else console.log('FILE:// TEST PASSED');
