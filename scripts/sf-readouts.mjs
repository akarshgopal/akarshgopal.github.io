// Print synthetic-fuels figure readouts at their defaults (to check the prose numbers against the figures).
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + resolve('dist/synthetic-fuels.html')); await p.evaluate(() => document.fonts.ready);
const ro = f => p.evaluate(f => document.querySelector(`figure[data-fig="${f}"] .readout`).innerText, f);
const click = (f, n) => p.evaluate(([f, n]) => document.querySelector(`figure[data-fig="${f}"] [data-name="${n}"]`).click(), [f, n]);
for (const f of ['litreBuilder', 'lcohExplorer']) console.log(f + ':', await ro(f));
for (const n of ['pr-nh3', 'pr-ker']) { await click('lcohExplorer', n); console.log(n + ':', await ro('lcohExplorer')); }
await click('lcohExplorer', 'pr-h2');
for (const n of ['src-2', 'src-3']) { await click('litreBuilder', n); console.log(n + ':', await ro('litreBuilder')); }
for (const f of ['cheapHours', 'futures']) console.log(f + ':', await ro(f));
for (const cx of [800, 300]) { await p.evaluate(cx => { const i = document.querySelector('figure[data-fig="cheapHours"] input[data-name="capex"]'); i.value = cx; i.dispatchEvent(new Event('input', { bubbles: true })); }, cx); console.log('cheapHours capex ' + cx + ':', await ro('cheapHours')); }
console.log('currency buttons pressed:', await p.evaluate(() => [...document.querySelectorAll('[data-name$="-eur"]')].map(b => b.getAttribute('aria-pressed')).join(',')));
console.log(errs.join('\n') || 'NO PAGE ERRORS'); await b.close();
