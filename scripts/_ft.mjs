import { chromium } from 'playwright';
const [page, W] = [process.argv[2], +(process.argv[3] || 390)];
const steps = JSON.parse(process.argv[4]);
const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: W, height: 800 }, hasTouch: true })).newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///workspace/ai-explainer/dist/' + page);
for (const [id, kind, a, bb, c] of steps) {
  const c0 = await p.$(`#fig-${id} canvas`); await c0.scrollIntoViewIfNeeded(); await p.waitForTimeout(250); const r = await c0.boundingBox();
  if (kind === 'drag') { await p.mouse.move(r.x + r.width * a, r.y + r.height * bb); await p.mouse.down(); await p.mouse.move(r.x + r.width * c, r.y + r.height * bb, { steps: 8 }); await p.mouse.up(); }
  if (kind === 'vdrag') { await p.mouse.move(r.x + r.width * a, r.y + r.height * bb); await p.mouse.down(); await p.mouse.move(r.x + r.width * a, r.y + r.height * c, { steps: 8 }); await p.mouse.up(); }
  if (kind === 'tap') { await p.mouse.click(r.x + r.width * a, r.y + r.height * bb); }
  if (kind === 'btn') { await p.click(`#fig-${id} [data-name="${a}"]`); }
  await p.waitForTimeout(400);
  console.log(id, kind, '→', (await p.textContent(`#fig-${id} .readout`)).slice(0, 170));
}
console.log('errors:', errs.length ? errs : 'none');
await b.close();
