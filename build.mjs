import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { PAGES, SERIES_TITLE } from './src/series.mjs';

// OUT=<dir> builds somewhere else (parallel editors each check their own build)
const OUT = process.env.OUT || 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/fonts`, { recursive: true });
const common = { bundle: true, minify: true, format: 'iife', target: ['es2020'], legalComments: 'eof' };
// Each page loads js/<page>.js, which imports only the figure modules that page uses; code shared between pages goes
// into chunks the browser caches once. The order and renames below follow src/figures.js (later modules win).
const FIG_ORDER = ['solar', 'wind', 'xfmr', 'txl', 'sf', 'global3', 'essay', 'new-cheaper', 'new-kwh', 'new-machine',
  'new-wires', 'new-balance', 'new-solar', 'new-wind', 'new-costs', 'new-futures', 'new-deep'];
const figmap = JSON.parse(execFileSync('node', ['scripts/figmap.mjs', resolve('.'), ...FIG_ORDER], { encoding: 'utf8' }));
const owner = {}; // figure name on the page -> [module, export, key in that module]
for (const m of FIG_ORDER) for (const k of figmap[m].names) {
  if (m === 'txl' && k === 'bill') continue;              // "bill" is the household-bill figure, not txl's
  const name = m === 'xfmr' && k === 'threePhase' ? 'vectorGroups' : k; // "threePhase" is the generator's figure
  owner[name] = [m, figmap[m].exp, k];
}
const ENTRY = '.build/entries';
rmSync('.build', { recursive: true, force: true });
mkdirSync(ENTRY, { recursive: true });
const pageEntries = PAGES.map(p => {
  const html = readFileSync(`src/pages/${p.file}`, 'utf8');
  const all = [...new Set([...html.matchAll(/data-fig="([A-Za-z0-9]+)"/g)].map(x => x[1]))];
  const orphan = all.filter(n => !owner[n] && n !== 'hero3d');
  if (orphan.length) throw new Error(`${p.file}: no module provides ${orphan.join(', ')}; add its module to FIG_ORDER`);
  const names = all.filter(n => owner[n]);
  const mods = [...new Set(names.map(n => owner[n][0]))];
  const imp = mods.map((m, i) => `import { ${figmap[m].exp} as m${i} } from ${JSON.stringify(resolve(`src/figs/${m}.js`))};`).join('\n');
  const figs = names.map(n => { const [m, , k] = owner[n]; return `${JSON.stringify(n)}: m${mods.indexOf(m)}[${JSON.stringify(k)}]`; }).join(',\n  ');
  const base = p.file.replace(/\.html$/, '');
  writeFileSync(`${ENTRY}/${base}.js`, `import { boot } from ${JSON.stringify(resolve('src/lib/boot.js'))};\n${imp}\nboot({\n  ${figs}\n});\n`);
  return `${ENTRY}/${base}.js`;
});
await build({ bundle: true, minify: true, format: 'esm', splitting: true, target: ['es2020'], legalComments: 'eof',
  entryPoints: pageEntries, outdir: `${OUT}/js`, chunkNames: 'chunks/[name]-[hash]' });
// series.js (every figure) is kept for anything that still links to it; hero.js is the three.js generator.
await build({ ...common, entryPoints: ['src/figures.js'], outfile: `${OUT}/series.js` });
await build({ ...common, entryPoints: ['src/hero.js'], outfile: `${OUT}/hero.js` });
cpSync('src/fonts', `${OUT}/fonts`, { recursive: true });
cpSync('src/style.css', `${OUT}/style.css`);
cpSync('src/og.png', `${OUT}/og.png`); // the card shown when a page is shared (1200 × 630)

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function nav(cur) {
  // left rail on wide screens, a drawer behind a "Series" button on narrower ones (the site-wide pattern)
  let deepSeen = false;
  const items = PAGES.slice(1).map((p, k) => {
    const i = k + 1, cls = p.deep ? (deepSeen ? 'deep' : (deepSeen = true, 'deep deep-first')) : '';
    return `<li${cls ? ` class="${cls}"` : ''}><a href="${p.file}"${i === cur ? ' aria-current="page"' : ''}><span class="n">${p.deep ? '+' : i}</span>${esc(p.short)}</a></li>`;
  }).join('');
  const here = cur === 0 ? 'Start' : PAGES[cur].short;
  const drawer = `<script>(function(){var n=document.querySelector('nav.series'),b=n&&n.querySelector('.series-toggle'),p=n&&n.querySelector('.series-in'),s=document.querySelector('.series-scrim');if(!b||!p)return;function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));document.body.classList.toggle('series-open',o);}b.addEventListener('click',function(){set(!n.classList.contains('open'));});if(s)s.addEventListener('click',function(){set(false);});document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});var a=n.querySelector('[aria-current=page]');if(a)try{a.scrollIntoView({block:'nearest'});}catch(e){}})();</script>`;
  return `<nav class="series" aria-label="${SERIES_TITLE}: the series"><button type="button" class="series-toggle" aria-expanded="false" aria-controls="series-panel"><span class="series-toggle-icon" aria-hidden="true">☰</span><span class="series-toggle-label">Series</span><span class="series-here">${esc(here)}</span></button>`
    + `<div class="series-in" id="series-panel"><a class="series-title" href="index.html">${SERIES_TITLE}</a><ol>${items}</ol></div><button id="play-toggle" type="button" aria-pressed="true" title="Pause all animations">❚❚ Pause</button></nav>`
    + `<button type="button" class="series-scrim" aria-label="Close the series menu" tabindex="-1"></button>\n${drawer}`;
}
function pager(cur) {
  const prev = PAGES[cur - 1], next = PAGES[cur + 1];
  const a = (p, cls, word) => p ? `<a class="${cls}" href="${p.file}"><small>${word}</small>${esc(p.title)}</a>` : '<span></span>';
  return `<nav class="pager" aria-label="Previous and next in the series">${a(prev, 'prev', '← Previous')}${a(next, 'next', 'Next →')}</nav>`;
}
// When each page's text last changed: the date of the last commit to src/pages/<file>, or today if it has
// uncommitted changes. Shown in the byline, in article:modified_time, and in feed.xml.
const git = args => { try { return execFileSync('git', args, { encoding: 'utf8' }).trim(); } catch { return ''; } };
const today = new Date().toISOString().slice(0, 10);
const updated = file => (git(['status', '--porcelain', `src/pages/${file}`]) ? today : git(['log', '-1', '--format=%cs', '--', `src/pages/${file}`])) || today;
const longDate = d => new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
// Canonical URL and the Open Graph / Twitter card for each page, from its own <title> and description.
const SITE = 'https://akarshgopal.github.io/blog/electricity/';
const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function social(p, html) {
  const title = p.title; // the series name travels as og:site_name
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  const url = SITE + (p.file === 'index.html' ? '' : p.file);
  return `<link rel="alternate" type="application/rss+xml" title="${attr(SERIES_TITLE)}" href="feed.xml">\n<meta property="article:modified_time" content="${updated(p.file)}">\n<link rel="canonical" href="${url}">\n<meta property="og:type" content="article">\n<meta property="og:site_name" content="${attr(SERIES_TITLE)}">\n`
    + `<meta property="og:title" content="${attr(title)}">\n<meta property="og:description" content="${attr(desc)}">\n<meta property="og:url" content="${url}">\n`
    + `<meta property="og:image" content="${SITE}og.png">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n`
    + `<meta property="og:image:alt" content="${attr(SERIES_TITLE)}: what an American household kilowatt-hour paid for, 1951 to 2025">\n<meta name="twitter:card" content="summary_large_image">\n`;
}
PAGES.forEach((p, i) => {
  let html = readFileSync(`src/pages/${p.file}`, 'utf8');
  // stable ids for every figure that lacks one
  html = html.replace(/<figure([^>]*?)data-fig="([A-Za-z0-9]+)"([^>]*)>/g, (m, a, name, b) => /\bid=/.test(a + b) ? m : `<figure${a}data-fig="${name}" id="fig-${name}"${b}>`);
  // the page-wide Pause button lives in the series nav, not floating over the text
  // adjacent footnote markers read as one: "²,³" rather than "²³"
  html = html.replace(/<\/a><\/sup><sup class="fn">(?=<a )/g, '</a><span class="fn-sep">,</span>');
  html = html.replace(/<\/a>,(?=<a href="#n\d+">\d+<\/a>(?:<span class="fn-sep">,<\/span>|,|<\/sup>))/g, '</a><span class="fn-sep">,</span>');
  html = html.replace(/<button id="play-toggle"[^>]*>[^<]*<\/button>\n?/, '');
  html = html.replace(/<\/head>/, social(p, html) + '</head>');
  const up = updated(p.file);
  html = html.replace(/(<p class="byline">[^<]*?)(<\/p>)/, `$1 · updated <time datetime="${up}">${longDate(up)}</time>$2`);
  html = html.replace(/(<main>)/, nav(i) + '\n$1');
  html = html.replace(/(<\/article>)/, pager(i) + '\n$1');
  html = html.replace('<script src="series.js"></script>', `<script type="module" src="js/${p.file.replace(/\.html$/, '')}.js"></script>`);
  writeFileSync(`${OUT}/${p.file}`, html);
});
// feed.xml: one item per page, dated by its last update, so feed readers see revised essays.
{
  const rfc = d => new Date(d + 'T12:00:00Z').toUTCString();
  const items = PAGES.map(p => {
    const html = readFileSync(`src/pages/${p.file}`, 'utf8');
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
    const url = SITE + (p.file === 'index.html' ? '' : p.file);
    return `<item><title>${attr(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${rfc(updated(p.file))}</pubDate><description>${desc}</description></item>`;
  }).sort((a, b) => new Date(b.match(/<pubDate>(.*?)</)[1]) - new Date(a.match(/<pubDate>(.*?)</)[1]));
  const latest = PAGES.map(p => updated(p.file)).sort().pop();
  writeFileSync(`${OUT}/feed.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>`
    + `<title>${attr(SERIES_TITLE)}</title><link>${SITE}</link><atom:link href="${SITE}feed.xml" rel="self" type="application/rss+xml"/>`
    + `<description>An interactive series by Akarsh Gopal on why electricity stopped getting cheaper, and whether it can again.</description>`
    + `<language>en-gb</language><lastBuildDate>${rfc(latest)}</lastBuildDate>\n${items.join('\n')}\n</channel></rss>\n`);
}
console.log(`built ${OUT}/: ` + PAGES.map(p => p.file).join(', '));
