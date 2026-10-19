// fact-audit screenshots via file://. usage: node scripts/fa-shots.mjs page:figId:width ...
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
for (const spec of process.argv.slice(2)) {
  const [pg, id, w] = spec.split(':');
  const p = await b.newPage({ viewport: { width: +w, height: 900 }, deviceScaleFactor: +w < 500 ? 2 : 1 });
  await p.goto(`file:///workspace/electricity-explainer/dist/${pg}.html`);
  const e = await p.$(`[data-fig="${id}"]`); if (!e) { console.log('missing', id); continue; }
  await e.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  const out = `/workspace/fa/shots/${pg}-${id}-${w}.png`; await e.screenshot({ path: out }); console.log(out); await p.close();
}
await b.close();
