import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { PAGES, SERIES_TITLE, REDIRECTS } from './src/series.mjs';
import { TIMELINE } from './src/timeline.mjs';
import { LEVELS } from './src/stack.mjs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/fonts', { recursive: true });
await build({ bundle: true, minify: true, format: 'iife', target: ['es2020'], legalComments: 'eof', entryPoints: ['src/main.js'], outfile: 'dist/app.js' });
// three.js and the 3D figures live in their own classic-script bundle, loaded before app.js only on pages that use them
// (a plain <script>, not a module, so the pages still work from file://)
const FIGS3D = ['lossValley', 'sgdValley', 'mosfet', 'cmosInverter', 'powerLadder', 'clusterGrid', 'triode', 'coolantFlow', 'dataDistance', 'tokensPerParam', 'systolic', 'nvlinkPair', 'yieldDie', 'relayLogic', 'litho', 'heatLoop', 'transformerBlock', 'relayCascade'];
await build({ bundle: true, minify: true, format: 'iife', target: ['es2020'], legalComments: 'eof', entryPoints: ['src/three/entry.js'], outfile: 'dist/three3d.js' });
cpSync('src/fonts', 'dist/fonts', { recursive: true });
cpSync('src/style.css', 'dist/style.css');
// Static files copied as they are: thesis.js (hand-written figures marked data-xfig, which app.js ignores) and og.png (the social card)
cpSync('src/static', 'dist', { recursive: true });

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const label = i => i === 0 ? 'Start' : String(i);
const live = PAGES.filter(p => p.status === 'live');
const SITE = 'https://akarshgopal.github.io/blog/ai/';
const url = p => p.file === 'index.html' ? SITE : SITE + p.file;
const attr = s => esc(s).replace(/"/g, '&quot;');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = d => { const [y, m, dd] = d.split('-').map(Number); return `${dd} ${MONTHS[m - 1]} ${y}`; };
const rfcDate = d => new Date(d + 'T12:00:00Z').toUTCString();
const metaDesc = html => (html.match(/<meta name="description" content="([^"]*)">/) || [])[1] || '';
// Feed link, modified date, canonical URL and the social card (Open Graph + Twitter), before </head>
function headTags(p, html) {
  const desc = metaDesc(html);
  return `<link rel="alternate" type="application/rss+xml" title="${SERIES_TITLE}" href="feed.xml">
<meta property="article:modified_time" content="${p.updated}">
<link rel="canonical" href="${url(p)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${SERIES_TITLE}">
<meta property="og:title" content="${attr(p.title)}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url(p)}">
<meta property="og:image" content="${SITE}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${SERIES_TITLE}: AI capacity, inference and all data centres on one axis, 2024 to 2035">
<meta name="twitter:card" content="summary_large_image">
`;
}

function nav(cur) {
  const items = PAGES.map((p, i) => p.status === 'live'
    ? `<li><a href="${p.file}"${i === cur ? ' aria-current="page"' : ''}><span class="n">${label(i)}</span>${esc(p.short)}</a></li>`
    : `<li><span class="planned" title="${esc(p.title)}: coming soon"><span class="n">${label(i)}</span>${esc(p.short)}<small>coming soon</small></span></li>`).join('');
  const here = esc(PAGES[cur].short);
  // Left rail on wide screens; sticky toggle + drawer on phone. Scrim closes the drawer.
  return `<nav class="series" aria-label="${SERIES_TITLE}: the series"><button type="button" class="series-toggle" aria-expanded="false" aria-controls="series-panel"><span class="series-toggle-icon" aria-hidden="true">☰</span><span class="series-toggle-label">Series</span><span class="series-here">${here}</span></button><div class="series-in" id="series-panel"><a class="series-title" href="index.html">${SERIES_TITLE}</a><ol>${items}</ol></div></nav><button type="button" class="series-scrim" tabindex="-1" aria-label="Close series menu"></button><script>(function(){var n=document.querySelector('nav.series'),b=n&&n.querySelector('.series-toggle'),p=n&&n.querySelector('.series-in'),s=document.querySelector('.series-scrim');if(!b||!p)return;function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));document.body.classList.toggle('series-open',o);}b.addEventListener('click',function(){set(!n.classList.contains('open'));});if(s)s.addEventListener('click',function(){set(false);});document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});var a=n.querySelector('[aria-current=page]');if(a)try{a.scrollIntoView({block:'nearest'});}catch(e){}})();</script>`;
}
// Timeline spine: a collapsible strip under the nav. Events link to their section only when that page is live.
function spine(cur) {
  const here = PAGES[cur].file;
  const li = TIMELINE.map(e => {
    const p = PAGES.find(q => q.file === e.page); const ok = p && p.status === 'live' && e.anchor;
    const href = ok ? (e.page === here ? `#${e.anchor}` : `${e.page}#${e.anchor}`) : null;
    const body = `<span class="y">${esc(e.year)}</span>${e.world ? '<span class="w" title="outside the US">◆</span>' : ''}${esc(e.text)}`;
    return `<li${e.page === here ? ' class="here"' : ''}>${href ? `<a href="${href}">${body}</a>` : body}</li>`;
  }).join('');
  return `<details class="spine"><summary>Timeline, 1822–2026</summary><ol>${li}</ol></details>`;
}
function pager(cur) {
  // The chain is contents → essay → … → verdict, and the last page leads back to the contents
  const k = live.indexOf(PAGES[cur]); const prev = live[k - 1], next = live[k + 1] || (k > 0 ? { file: live[0].file, title: 'Contents and the case map' } : null);
  const a = (p, cls, word) => p ? `<a class="${cls}" href="${p.file}"><small>${word}</small>${esc(p.title)}</a>` : '<span></span>';
  return `<nav class="pager" aria-label="Previous and next in the series">${a(prev, 'prev', '← Previous')}${a(next, 'next', 'Next →')}</nav>`;
}

// Validate data-level tags against the S/H taxonomy (peek chips still show codes; the old stack ruler is gone).
const known = new Set(LEVELS.map(l => l.code));
for (const p of live) {
  const src = readFileSync(`src/pages/${p.file}`, 'utf8');
  for (const m of src.matchAll(/<(h2|details)\b([^>]*\bdata-level="([^"]+)"[^>]*)>/g)) {
    const id = (m[2].match(/\bid="([^"]+)"/) || [])[1]; if (!id) throw new Error(`${p.file}: data-level without id: ${m[0].slice(0, 80)}`);
    const peek = m[1] === 'details'; if (peek && !/\bclass="[^"]*\bpeek\b/.test(m[2])) continue;
    const codes = m[3].trim().split(/\s+/); for (const c of codes) if (!known.has(c)) throw new Error(`${p.file}#${id}: unknown level ${c}`);
  }
}

for (const [i, p] of PAGES.entries()) {
  if (p.status !== 'live') continue;
  let html = readFileSync(`src/pages/${p.file}`, 'utf8');
  html = html.replace('</head>', headTags(p, html) + '</head>');
  html = html.replace(/(<p class="byline">[^\n]*?)(<\/p>)/, `$1 · updated <time datetime="${p.updated}">${longDate(p.updated)}</time>$2`);
  html = html.replace(/<figure([^>]*?)data-fig="([A-Za-z0-9]+)"([^>]*)>/g, (m, a, name, b) => /\bid=/.test(a + b) ? m : `<figure${a}data-fig="${name}" id="fig-${name}"${b}>`);
  html = html.replace(/(<main>)/, nav(i) + '\n$1').replace(/(<header class="top">[\s\S]*?<\/header>)/, `$1\n${spine(i)}`);
  html = html.replace(/(<\/article>)/, pager(i) + '\n$1');
    if (FIGS3D.some(f => html.includes(`data-fig="${f}"`))) html = html.replace('<script src="app.js"></script>', '<script src="three3d.js?v=' + Date.now().toString(36) + '"></script>\n<script src="app.js"></script>');
  writeFileSync(`dist/${p.file}`, html);
}
// RSS 2.0 feed of the live pages, newest update first (ties keep series order)
{
  const items = live.map(p => ({ p, desc: metaDesc(readFileSync(`src/pages/${p.file}`, 'utf8')) })).sort((a, b) => b.p.updated.localeCompare(a.p.updated));
  const newest = items.length ? items[0].p.updated : '';
  const item = ({ p, desc }) => `<item><title>${esc(p.title)}</title><link>${url(p)}</link><guid isPermaLink="true">${url(p)}</guid><pubDate>${rfcDate(p.updated)}</pubDate><description>${desc}</description></item>`;
  writeFileSync('dist/feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${SERIES_TITLE}</title><link>${SITE}</link><atom:link href="${SITE}feed.xml" rel="self" type="application/rss+xml"/><description>An interactive series by Akarsh Gopal on AI and electricity: what AI uses now, what the money will build, and whether the grid can connect it.</description><language>en-gb</language><lastBuildDate>${rfcDate(newest)}</lastBuildDate>
${items.map(item).join('\n')}
</channel></rss>
`);
}
for (const r of REDIRECTS) {
  writeFileSync(`dist/${r.from}`, `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=${r.to}">
<link rel="canonical" href="${r.to}">
<title>Moved · Can AI outgrow the planet’s power grid?</title>
<meta name="robots" content="noindex">
<script>location.replace(${JSON.stringify(r.to)}+(location.hash||''));</script>
</head>
<body>
<p>This page has moved to <a href="${r.to}">${r.to}</a>.</p>
</body></html>
`);
}
console.log('built dist/: ' + live.map(p => p.file).join(', ') + '; redirects: ' + REDIRECTS.map(r => r.from).join(', '));
