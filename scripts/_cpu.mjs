// Off-screen CPU check: for every figure, scroll it into view, press any play/train button, scroll far away,
// then measure rAF callbacks/s and main-thread TaskDuration over 3 s. Expect ~0 rAF and tiny CPU when away.
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const PAGE = process.argv[2];
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.addInitScript(() => { const r = window.requestAnimationFrame.bind(window); window.__raf = 0; window.requestAnimationFrame = f => r(t => { window.__raf++; f(t); }); });
await p.goto('file://' + resolve('dist', PAGE));
const cdp = await p.context().newCDPSession(p); await cdp.send('Performance.enable');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const td = async () => (await cdp.send('Performance.getMetrics')).metrics.find(m => m.name === 'TaskDuration').value;
const measure = async () => { const r0 = await p.evaluate(() => window.__raf), t0 = await td(); await sleep(3000); return [((await p.evaluate(() => window.__raf)) - r0) / 3, ((await td()) - t0) / 3 * 100]; };
const names = await p.$$eval('figure[data-fig]', e => e.map(x => x.dataset.fig));
// press every play/train/run button on the page
for (const n of names) { const el = await p.$(`figure[data-fig="${n}"]`); await el.scrollIntoViewIfNeeded(); await sleep(150);
  await p.$$eval(`figure[data-fig="${n}"] button`, els => els.filter(e => /play|train|run|start|go|▶/i.test(e.textContent)).forEach(e => e.click())); }
await sleep(500);
await p.evaluate(() => scrollTo(0, 0)); await sleep(800); const top = await measure();
await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await sleep(800); const bot = await measure();
// in-view reference for the most expensive figure candidates
const ref = [];
for (const n of names) { const el = await p.$(`figure[data-fig="${n}"]`); await el.scrollIntoViewIfNeeded(); await sleep(300); const [raf, cpu] = await measure(); if (raf > 1 || cpu > 5) ref.push(`${n}: ${raf.toFixed(0)} rAF/s, ${cpu.toFixed(0)}% cpu`); }
console.log(`${PAGE} | top: ${top[0].toFixed(1)} rAF/s ${top[1].toFixed(1)}% cpu | bottom: ${bot[0].toFixed(1)} rAF/s ${bot[1].toFixed(1)}% cpu\n  in view: ${ref.join('; ') || 'all idle'}`);
await b.close();
