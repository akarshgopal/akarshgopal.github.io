// Screenshots + console check for a series post.  node scripts/shots-series.mjs solar-pv.html [figs-only:name,name] [width]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const PAGE = process.argv[2] || 'solar-pv.html', SLUG = PAGE.replace('.html', '');
const OUT = `screenshots/${SLUG}`; mkdirSync(OUT, { recursive: true });
const PORT = 8970 + Math.floor(Math.random() * 100);
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: 'dist', stdio: 'ignore' });
await new Promise(r => setTimeout(r, 800));
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = []; const sleep = ms => new Promise(r => setTimeout(r, ms));
async function open(w, h, dsf, url = `http://127.0.0.1:${PORT}/${PAGE}`) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${w}] ${m.type()}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`[${w}] pageerror: ${e.message}`));
  page.on('requestfailed', r => errors.push(`[${w}] requestfailed: ${r.url()}`));
  await page.goto(url, { waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready);
  return { ctx, page };
}
async function scrollThrough(page) { const H = await page.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 500) { await page.evaluate(y => window.scrollTo(0, y), y); await sleep(70); } await page.evaluate(() => window.scrollTo(0, 0)); await sleep(300); }
const fig = n => `figure[data-fig="${n}"]`;
async function shot(page, n, file, wait = 500) { const el = await page.$(fig(n)); if (!el) { errors.push('missing figure ' + n); return; } await el.scrollIntoViewIfNeeded(); await sleep(wait); await el.screenshot({ path: `${OUT}/${file}.png` }); }
const setSlider = (page, f, name, v) => page.$eval(`${fig(f)} input[data-name="${name}"]`, (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v);
const clickName = async (page, f, name) => { await page.$eval(`${fig(f)} button[data-name="${name}"]`, el => { const d = el.closest('details'); if (d) d.open = true; }); return page.click(`${fig(f)} button[data-name="${name}"]`); };
const onlyFigs = process.argv[3] && process.argv[3] !== 'all' ? process.argv[3].split(',') : null;

for (const [W, dsf, pre] of [[1280, 1.5, 'd'], [390, 2, 'm']]) {
  if (onlyFigs && process.argv[4] && +process.argv[4] !== W) continue;
  const { ctx, page } = await open(W, W > 600 ? 860 : 844, dsf);
  await scrollThrough(page);
  if (!onlyFigs) await page.screenshot({ path: `${OUT}/${pre}-00-top.png` });
  const names = await page.$$eval('figure[data-fig]', e => e.map(x => x.dataset.fig));
  let i = 1;
  for (const n of names) { if (onlyFigs && !onlyFigs.includes(n)) { i++; continue; } await shot(page, n, `${pre}-${String(i).padStart(2, '0')}-${n}`, 600); i++; }
  if (SLUG === 'synthetic-fuels' && onlyFigs && onlyFigs.includes('xstates')) { await clickName(page, 'cheapHours', 'ch-sa'); await shot(page, 'cheapHours', `${pre}-x-cheap-sa`, 400); }
  if (SLUG === 'index' && onlyFigs && onlyFigs.includes('xstates')) { for (const [f, nm, tag] of [['retailWorld', 'rw-ppp', 'retail-ppp'], ['billWorld', 'bw-pps', 'bill-pps'], ['gridDay', 'gd-solar', 'grid-solar'], ['gridDay', 'gd-coal', 'grid-coal'], ['solarDay', 'loc-sydney', 'solar-sydney']]) { await clickName(page, f, nm); await shot(page, f, `${pre}-x-${tag}`, 400); } }
  if (!onlyFigs && SLUG === 'solar-pv') {
    // interaction states
    await setSlider(page, 'ivCurve', 'G', 400); await setSlider(page, 'ivCurve', 'T', 65); await page.click(`${fig('ivCurve')} button:has-text("maximum power")`); await sleep(2500); await shot(page, 'ivCurve', `${pre}-x-ivCurve-hot-dim`, 200);
    await clickName(page, 'shading', 'sh-chimney').catch(() => {}); await shot(page, 'shading', `${pre}-x-shading-chimney`, 300);
    await clickName(page, 'cellTech', 'tech-tandem'); await shot(page, 'cellTech', `${pre}-x-cellTech-tandem`, 200);
    await clickName(page, 'supplyChain', 'v-price'); await shot(page, 'supplyChain', `${pre}-x-supply-price`, 200);
    await setSlider(page, 'sunPath', 'lat', 37.4); await setSlider(page, 'sunPath', 'doy', 355); await clickName(page, 'sunPath', 'm-track1'); await shot(page, 'sunPath', `${pre}-x-sunPath-seville-dec`, 300);
    await page.selectOption(`${fig('yieldMap')} select`, { label: await page.$eval(`${fig('yieldMap')} select`, s => [...s.options].find(o => o.textContent.startsWith('Cape Town')).textContent) }); await shot(page, 'yieldMap', `${pre}-x-yield-capetown`, 200);
    await setSlider(page, 'clipping', 'ilr', 1.8); await shot(page, 'clipping', `${pre}-x-clipping-1.8`, 200);
    await clickName(page, 'captureHistory', 'c-rate'); await shot(page, 'captureHistory', `${pre}-x-capture-rate`, 200);
  }
  if (!onlyFigs && SLUG === 'utility-renewables') {
    await clickName(page, 'queueFunnel', 'q-fate'); await shot(page, 'queueFunnel', `${pre}-x-queue-fate`, 300);
    await clickName(page, 'turbineScale', 'tb-v236'); await shot(page, 'turbineScale', `${pre}-x-turbine-v236`, 300);
    await clickName(page, 'wakeField', 'k-on'); await setSlider(page, 'wakeField', 'dir', 255); await shot(page, 'wakeField', `${pre}-x-wake-onshore-255`, 200);
    await setSlider(page, 'specificPower', 'D', 170); await setSlider(page, 'specificPower', 'mean', 6); await shot(page, 'specificPower', `${pre}-x-sp-170-6`, 200);
    await clickName(page, 'offshoreCfd', 'b2024'); await shot(page, 'offshoreCfd', `${pre}-x-cfd-2024`, 200);
    await clickName(page, 'revenueModels', 'ct-ppaBase'); await shot(page, 'revenueModels', `${pre}-x-rev-baseload`, 200);
    await clickName(page, 'revenueModels', 'ct-premium'); await shot(page, 'revenueModels', `${pre}-x-rev-premium`, 200);
    await clickName(page, 'captureCompare', 'cc-share'); await shot(page, 'captureCompare', `${pre}-x-capture-share`, 200);
    await clickName(page, 'curtailment', 'cu-cost'); await shot(page, 'curtailment', `${pre}-x-curt-cost`, 200);
    await setSlider(page, 'hybridPlant', 'grid', 0.5); await shot(page, 'hybridPlant', `${pre}-x-hybrid-grid05`, 300);
    await setSlider(page, 'gridForming', 'ibr', 0.8); await shot(page, 'gridForming', `${pre}-x-gfm-80`, 200);
    await setSlider(page, 'gridForming', 'gfm', 0.4); await clickName(page, 'gridForming', 'ffr-on'); await shot(page, 'gridForming', `${pre}-x-gfm-80-40-ffr`, 200);
    await clickName(page, 'seasonMix', 'sm-week'); await shot(page, 'seasonMix', `${pre}-x-season-week`, 300);
  }
  if (!onlyFigs && SLUG === 'transformers') {
    await setSlider(page, 'coreFlux', 'bias', 0.3); await shot(page, 'coreFlux', `${pre}-x-core-bias`, 1200);
    await setSlider(page, 'coreFlux', 'bias', 0); await clickName(page, 'coreFlux', 'sup-dc'); await shot(page, 'coreFlux', `${pre}-x-core-dc`, 2500);
    await clickName(page, 'coreLoss', 'mat-amo'); await shot(page, 'coreLoss', `${pre}-x-loss-amorphous`, 300);
    await clickName(page, 'coreLoss', 'mat-iron'); await setSlider(page, 'coreLoss', 'thk', 0); await shot(page, 'coreLoss', `${pre}-x-loss-solid-iron`, 300);
    await setSlider(page, 'efficiency', 'kva', 0); await clickName(page, 'efficiency', 'tier1'); await shot(page, 'efficiency', `${pre}-x-eff-25kva-t1`, 200);
    await setSlider(page, 'hotSpot', 'peak', 1.3); await setSlider(page, 'hotSpot', 'amb', 35); await shot(page, 'hotSpot', `${pre}-x-hot-130-35`, 200);
    await clickName(page, 'threePhase', 'vg-Yd1'); await shot(page, 'threePhase', `${pre}-x-vg-yd1`, 300);
    await clickName(page, 'tapChanger', 'sc-sun'); await shot(page, 'tapChanger', `${pre}-x-tap-sun`, 200);
    await clickName(page, 'tapChanger', 'm-ldc'); await shot(page, 'tapChanger', `${pre}-x-tap-sun-ldc`, 200);
    await clickName(page, 'family', 'sp-1'); await shot(page, 'family', `${pre}-x-family-pst`, 200);
    await clickName(page, 'shortage', 'sh-lead'); await shot(page, 'shortage', `${pre}-x-short-lead`, 200);
    await setSlider(page, 'sizeFrequency', 'f', 4.0); await shot(page, 'sizeFrequency', `${pre}-x-sst-10k`, 200);
  }
  if (!onlyFigs && SLUG === 'transmission') {
    await setSlider(page, 'powerAngle', 'delta', 120); await setSlider(page, 'powerAngle', 'len', 800); await shot(page, 'powerAngle', `${pre}-x-angle-120-800`, 200);
    await setSlider(page, 'voltageLosses', 'P', 4000); await shot(page, 'voltageLosses', `${pre}-x-loss-4gw`, 200);
    await setSlider(page, 'sagDLR', 'wind', 0); await setSlider(page, 'sagDLR', 'Ta', 38); await setSlider(page, 'sagDLR', 'I', 1100); await shot(page, 'sagDLR', `${pre}-x-sag-hot`, 200);
    await clickName(page, 'sagDLR', 'c-accc'); await shot(page, 'sagDLR', `${pre}-x-sag-accc`, 200);
    await setSlider(page, 'loopFlow', 'pst', 2); await clickName(page, 'loopFlow', 'dc-4'); await shot(page, 'loopFlow', `${pre}-x-loop-dc-pst`, 600);
    await clickName(page, 'breakEven', 'be-cable'); await shot(page, 'breakEven', `${pre}-x-be-cable`, 200);
    await clickName(page, 'hvdcProjects', 'pj-6'); await shot(page, 'hvdcProjects', `${pre}-x-hvdc-suedlink`, 200);
    await clickName(page, 'buildRate', 'br-de'); await shot(page, 'buildRate', `${pre}-x-build-de`, 200);
    await clickName(page, 'getsWeek', 'r-dlr'); await shot(page, 'getsWeek', `${pre}-x-gets-dlr`, 200);
    await clickName(page, 'getsWeek', 'g-accc'); await shot(page, 'getsWeek', `${pre}-x-gets-accc`, 200);
    await setSlider(page, 'interconnect', 'link', 8); await shot(page, 'interconnect', `${pre}-x-link-8`, 200);
    await clickName(page, 'bill', 'b-grp'); await shot(page, 'bill', `${pre}-x-bill-grp`, 200);
  }
  if (!onlyFigs && SLUG === 'synthetic-fuels') {
    await clickName(page, 'sankey', 'sk-hp'); await shot(page, 'sankey', `${pre}-x-sankey-hp`, 300);
    await clickName(page, 'sankey', 'sk-ekero'); await clickName(page, 'sankey', 'co2-air'); await shot(page, 'sankey', `${pre}-x-sankey-ekero-air`, 300);
    await clickName(page, 'molecules', 'src-air'); await shot(page, 'molecules', `${pre}-x-mol-air`, 200);
    await clickName(page, 'carbonSources', 'per-L'); await shot(page, 'carbonSources', `${pre}-x-carbon-perL`, 200);
    await setSlider(page, 'lcohExplorer', 'hours', 2000); await setSlider(page, 'lcohExplorer', 'price', 20); await shot(page, 'lcohExplorer', `${pre}-x-lcoh-2000h-20`, 200);
    await setSlider(page, 'cheapHours', 'hours', 700); await setSlider(page, 'cheapHours', 'capex', 800); await shot(page, 'cheapHours', `${pre}-x-cheap-700-800`, 200);
    await clickName(page, 'productCost', 'c-dac'); await setSlider(page, 'productCost', 'co2p', 300); await shot(page, 'productCost', `${pre}-x-prod-dac-300`, 200);
    await clickName(page, 'futures', 'cx-cn'); await shot(page, 'futures', `${pre}-x-futures-cn`, 200);
    await clickName(page, 'projects', 'pj-proj'); await shot(page, 'projects', `${pre}-x-projects`, 200);
    await clickName(page, 'mandates', 'm-ehb'); await shot(page, 'mandates', `${pre}-x-mandates-ehb`, 200);
  }
  await ctx.close();
  if (!onlyFigs) { const fp = await open(W, 860, 1); await scrollThrough(fp.page); await fp.page.screenshot({ path: `${OUT}/full-${W}.png`, fullPage: true }); await fp.ctx.close(); }
}
// file:// smoke test
if (!onlyFigs) { const { ctx, page } = await open(1280, 860, 1, 'file://' + resolve('dist', PAGE)); await scrollThrough(page); const n = await page.$$eval('canvas', c => c.length); if (!n) errors.push('file:// no canvases'); await ctx.close(); }
writeFileSync(`${OUT}/console.txt`, errors.join('\n') || 'no console errors or warnings');
console.log(errors.length ? errors.join('\n') : 'NO CONSOLE ERRORS'); await browser.close(); server.kill();
