import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
const errs = []; p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///workspace/electricity-explainer/dist/index.html');
const H = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await new Promise(r => setTimeout(r, 60)); }
const n = await p.$$eval('canvas', c => c.length);
console.log('file:// canvases', n, 'errors', errs.length ? errs : 'none', 'height', H);
await b.close();
