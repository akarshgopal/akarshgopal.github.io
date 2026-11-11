// Verifies every internal href (and href#anchor) in dist/*.html resolves, ids are unique,
// and no link would break when opened from the file system (absolute paths, directory links).
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
const DIST = 'dist';
// Sibling series published next to this one (/blog/ai/ and /blog/electricity/): links of the form ../electricity/… are
// checked against that series' built dist/ (file and #anchor), so they resolve once both sit side by side.
const SIBLINGS = { '../electricity/': process.env.ELECTRICITY_DIST || '/workspace/electricity-explainer/dist' };
const sibIds = {};
const sibCheck = (f, url) => { for (const [pre, dir] of Object.entries(SIBLINGS)) if (url.startsWith(pre)) { const [path, frag] = url.slice(pre.length).split('#'); const file = path || 'index.html'; const fp = join(dir, file); if (!existsSync(fp)) return `${f}: sibling link "${url}" → missing ${fp}`; if (frag) { sibIds[fp] ??= new Set([...strip(readFileSync(fp, 'utf8')).matchAll(/\sid="([^"]+)"/g)].map(m => m[1])); if (!sibIds[fp].has(frag)) return `${f}: sibling link "${url}" → no id "${frag}"`; } return 'ok'; } return null; };
let sib = 0;
const pages = readdirSync(DIST).filter(f => f.endsWith('.html'));
const ids = {}, problems = [];
const strip = s => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '');
for (const f of pages) {
  const html = strip(readFileSync(join(DIST, f), 'utf8'));
  const list = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const seen = new Set();
  for (const id of list) { if (seen.has(id)) problems.push(`${f}: duplicate id "${id}"`); seen.add(id); }
  ids[f] = seen;
}
let n = 0, ext = 0, cross = 0;
for (const f of pages) {
  const html = strip(readFileSync(join(DIST, f), 'utf8'));
  for (const m of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const [, attr, url] = m;
    if (/^(https?:|mailto:|data:|tel:)/.test(url)) { ext++; continue; }
    const sc = sibCheck(f, url); if (sc) { sib++; if (sc !== 'ok') problems.push(sc); continue; }
    n++;
    if (url === '' ) { problems.push(`${f}: empty ${attr}`); continue; }
    if (url.startsWith('/')) { problems.push(`${f}: absolute path "${url}" breaks file:// use`); continue; }
    const [path, frag] = url.split('#');
    const target = path === '' ? f : path;
    if (!existsSync(join(DIST, target)) || statSync(join(DIST, target)).isDirectory()) { problems.push(`${f}: ${attr}="${url}" → missing file ${target}`); continue; }
    if (target !== f && target.endsWith('.html')) cross++;
    if (frag !== undefined && frag !== '') {
      if (!target.endsWith('.html')) continue;
      if (!ids[target]?.has(decodeURIComponent(frag))) problems.push(`${f}: href="${url}" → no id "${frag}" in ${target}`);
    }
  }
}
console.log(`${pages.length} pages, ${n} internal links (${cross} to other pages), ${sib} links into the sibling electricity series (checked), ${ext} external links skipped`);
if (problems.length) { console.log(problems.join('\n')); console.log(`LINK CHECK FAILED: ${problems.length} problem(s)`); process.exit(1); }
console.log('LINK CHECK PASSED');
