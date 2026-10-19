import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport:{width:1280,height:900}}); await ctx.addInitScript(()=>{globalThis.__AUDIT=true});
const p = await ctx.newPage();
for (const [P, figs] of [['index',['powerEnergy','gridDay','heatPump','solarDay','threePhase','network']],['transformers',['coreLoss','tapChanger']],['solar-pv',['junction']],['utility-renewables',['revenueModels']]]) {
  await p.goto('file://'+resolve('dist',P+'.html')); await p.waitForTimeout(700);
  for (const n of figs) { const f = await p.$(`figure[data-fig="${n}"]`); await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
    console.log(P, n, JSON.stringify(await f.evaluate(f => { const s=[...f.querySelectorAll('.readout')].map(d=>d.textContent).join(' | ')+' ¦ '+[...f.querySelectorAll('canvas')].map(c=>(c.__texts||[]).map(t=>t.s).join('¦')).join('##'); return { minus:(s.match(/.{0,25}(?<![\w])-\d.{0,10}/g)||[]).slice(0,4), ntext:[...f.querySelectorAll('canvas')].map(c=>(c.__texts||[]).length), ranges:[...f.querySelectorAll('input[type=range]')].map(e=>[e.min,e.value,e.max]) }; }))); }
}
await b.close();
