// fact-audit probes: set controls, print readouts. usage: node scripts/fa-probe.mjs page fig "action;action" ...
// action: click:NAME | set:NAME=VALUE | wait:MS | eval:JS
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const [page, ...cases] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + resolve(`dist/${page}.html`)); await p.waitForTimeout(1500);
for (const c of cases) {
  await p.reload(); await p.waitForTimeout(1200);
  const [fig, acts = ''] = c.split('|');
  for (const a of acts.split(';').filter(Boolean)) {
    const [k, v] = [a.slice(0, a.indexOf(':')), a.slice(a.indexOf(':') + 1)];
    if (k === 'wait') { await p.waitForTimeout(+v); continue; }
    await p.evaluate(([fig, k, v]) => {
      const f = document.querySelector(`figure[data-fig="${fig}"]`);
      if (k === 'click') f.querySelector(`[data-name="${v}"]`).click();
      if (k === 'set') { const [n, x] = v.split('='); const i = f.querySelector(`input[data-name="${n}"]`); i.value = x; i.dispatchEvent(new Event('input', { bubbles: true })); }
      if (k === 'eval') (new Function('f', v))(f);
    }, [fig, k, v]);
    await p.waitForTimeout(150);
  }
  await p.waitForTimeout(300);
  console.log(c + ' => ' + await p.evaluate(fig => [...document.querySelector(`figure[data-fig="${fig}"]`).querySelectorAll('.readout')].map(x => x.innerText.replace(/\s+/g, ' ')).join(' | '), fig));
}
console.log(errs.join('\n') || 'no page errors'); await b.close();
