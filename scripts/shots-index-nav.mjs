// Series-level screenshots: main essay top + a deep-dive aside, a stub page, at 1280 and 390.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
const OUT = 'screenshots/series'; mkdirSync(OUT, { recursive: true });
const PORT = 9100 + Math.floor(Math.random() * 100);
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: 'dist', stdio: 'ignore' });
await new Promise(r => setTimeout(r, 900));
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = []; const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const [W, H, pre] of [[1280, 860, 'd'], [390, 844, 'm']]) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: W > 600 ? 1.5 : 2 });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${W}] ${m.type()}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`[${W}] pageerror: ${e.message}`));
  await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'load' }); await sleep(1500);
  await page.screenshot({ path: `${OUT}/${pre}-index-top.png` });
  const a = await page.$('#s3 ~ aside.deepdive'); if (a) { await a.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -250)); await sleep(500); await page.screenshot({ path: `${OUT}/${pre}-index-deepdive.png` }); }
  await page.goto(`http://127.0.0.1:${PORT}/solar-pv.html#notes`, { waitUntil: 'load' }); await sleep(600);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await sleep(400);
  await page.screenshot({ path: `${OUT}/${pre}-solar-pager.png` });
  await page.goto(`http://127.0.0.1:${PORT}/transformers.html`, { waitUntil: 'load' }); await sleep(400);
  await page.screenshot({ path: `${OUT}/${pre}-stub-transformers.png`, fullPage: true });
  await ctx.close();
}
writeFileSync(`${OUT}/console.txt`, errors.join('\n') || 'no console errors or warnings');
console.log(errors.length ? errors.join('\n') : 'NO CONSOLE ERRORS'); await browser.close(); server.kill();
