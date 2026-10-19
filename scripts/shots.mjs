import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = 'screenshots'; mkdirSync(OUT, { recursive: true });
const PORT = 8765;
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: 'dist', stdio: 'ignore' });
await new Promise(r => setTimeout(r, 800));
const URL = `http://127.0.0.1:${PORT}/index.html`;
const only = process.argv[2] || 'all';
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function open(w, h, dsf) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${w}] ${m.type()}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`[${w}] pageerror: ${e.message}`));
  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  return { ctx, page };
}
async function scrollThrough(page) {
  const H = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 500) { await page.evaluate(y => window.scrollTo(0, y), y); await sleep(90); }
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(300);
}
const fig = name => `figure[data-fig="${name}"]`;
async function shot(page, name, file, wait = 500) {
  const el = await page.$(fig(name)); if (!el) { errors.push('missing figure ' + name); return; }
  await el.scrollIntoViewIfNeeded(); await sleep(wait);
  await el.screenshot({ path: `${OUT}/${file}.png` });
}
async function setSlider(page, figName, dataName, v) {
  await page.$eval(`${fig(figName)} input[data-name="${dataName}"]`, (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v);
}
const clickText = (page, figName, t) => page.click(`${fig(figName)} button:has-text("${t}")`);

if (only === 'all' || only === 'desktop') {
  const { ctx, page } = await open(1280, 860, 2);
  await scrollThrough(page);
  const names = await page.$$eval('figure[data-fig]', els => els.map(e => e.dataset.fig));
  for (const n of names) await shot(page, n, `d-${String(names.indexOf(n) + 1).padStart(2, '0')}-${n}`, n === 'hero3d' ? 1200 : 500);
  // --- showpiece 1: frequency
  await shot(page, 'frequency', 'x-frequency-0-before');
  await page.$eval(`${fig('frequency')} button[data-name="trip3"]`, b => b.click());
  await sleep(12000);
  await shot(page, 'frequency', 'x-frequency-1-after-3GW-trip', 0);
  const sim = await page.$eval(fig('frequency'), el => { const s = el.__sim; return s ? JSON.stringify({ f: s.st?.f ?? s.f, nadir: s.st?.nadir ?? s.nadir }) : 'no __sim'; });
  writeFileSync(`${OUT}/frequency-state.txt`, sim);
  await page.click(`${fig('frequency')} button[data-name="reset"]`); await sleep(300);
  await page.$eval(`${fig('frequency')} button[data-name="trip15"]`, b => b.click()); await sleep(14000);
  await shot(page, 'frequency', 'x-frequency-2-after-15GW-loss', 0);
  // --- showpiece 2: merit order
  await shot(page, 'merit', 'x-merit-0-default');
  await page.click(`${fig('merit')} button:has-text("gas shock")`); await sleep(1200);
  await shot(page, 'merit', 'x-merit-1-gas-shock', 0);
  await page.click(`${fig('merit')} button:has-text("Sunny Sunday")`); await sleep(1200);
  await shot(page, 'merit', 'x-merit-2-sunny-sunday', 0);
  // --- showpiece 3: network
  await shot(page, 'network', 'x-network-0-default');
  await setSlider(page, 'network', 'windN', 26); await setSlider(page, 'network', 'loadS', 28); await sleep(400);
  await shot(page, 'network', 'x-network-1-nodal-congested', 300);
  await clickText(page, 'network', 'Zonal'); await sleep(400);
  await shot(page, 'network', 'x-network-2-zonal-redispatch', 300);
  // --- v2 interactives: before/after
  await shot(page, 'cleanGrid', 'x-cleanGrid-0-blend-default');
  await page.click(`${fig('cleanGrid')} button[data-name="mix-vre"]`); await sleep(1200);
  await shot(page, 'cleanGrid', 'x-cleanGrid-1-vre-no-backup', 0);
  await page.click(`${fig('cleanGrid')} button[data-name="mix-nuc"]`); await sleep(1200);
  await shot(page, 'cleanGrid', 'x-cleanGrid-2-nuclear-14000', 0);
  await setSlider(page, 'cleanGrid', 'nucCapex', 6000); await sleep(1200);
  await shot(page, 'cleanGrid', 'x-cleanGrid-3-nuclear-6000', 0);
  await shot(page, 'learning', 'x-learning-0-modules-default');
  await page.click(`${fig('learning')} button[data-name="wind"]`); await setSlider(page, 'learning', 'mult', 4); await sleep(600);
  await shot(page, 'learning', 'x-learning-1-wind-16x', 0);
  await setSlider(page, 'unlock', 'price', 30); await sleep(600);
  await shot(page, 'unlock', 'x-unlock-0-30eur', 0);
  await setSlider(page, 'unlock', 'price', 150); await sleep(600);
  await shot(page, 'unlock', 'x-unlock-1-150eur', 0);
  // --- extra interactions
  await setSlider(page, 'gridDay', 'solar', 160).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(300);
  await page.screenshot({ path: `${OUT}/d-00-top.png` });
  await ctx.close();
  // full page at dsf 1
  const fp = await open(1280, 860, 1);
  await scrollThrough(fp.page);
  await fp.page.screenshot({ path: `${OUT}/full-desktop-1280.png`, fullPage: true });
  await fp.ctx.close();
}
if (only === 'figs') {
  const list = process.argv[3].split(',');
  const w = +(process.argv[4] || 1280);
  const { ctx, page } = await open(w, 860, 2);
  await scrollThrough(page);
  for (const n of list) await shot(page, n, `t-${w}-${n}`, 700);
  await ctx.close();
}
if (only === 'all' || only === 'mobile') {
  const { ctx, page } = await open(390, 844, 2);
  await scrollThrough(page);
  for (const n of ['hero3d', 'frequency', 'merit', 'network', 'bill', 'historyChart', 'gridDay', 'learning', 'foak', 'cleanGrid', 'energyShare', 'unlock']) await shot(page, n, `m-${n}`, n === 'hero3d' ? 1200 : 500);
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(300);
  await page.screenshot({ path: `${OUT}/m-00-top.png` });
  await ctx.close();
  const fp = await open(390, 844, 1);
  await scrollThrough(fp.page);
  await fp.page.screenshot({ path: `${OUT}/full-mobile-390.png`, fullPage: true });
  await fp.ctx.close();
}
writeFileSync(`${OUT}/console.txt`, errors.join('\n') || 'no console errors or warnings');
console.log(errors.length ? errors.join('\n') : 'NO CONSOLE ERRORS');
await browser.close(); server.kill();
