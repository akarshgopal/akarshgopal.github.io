import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { PAGES, SERIES_TITLE } from './src/series.mjs';

// OUT=<dir> builds somewhere else (parallel editors each check their own build)
const OUT = process.env.OUT || 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/fonts`, { recursive: true });
const common = { bundle: true, minify: true, format: 'iife', target: ['es2020'], legalComments: 'eof' };
// series.js: every 2D figure; hero.js: the three.js generator, loaded only on the pages that show it
await build({ ...common, entryPoints: ['src/figures.js'], outfile: `${OUT}/series.js` });
await build({ ...common, entryPoints: ['src/hero.js'], outfile: `${OUT}/hero.js` });
cpSync('src/fonts', `${OUT}/fonts`, { recursive: true });
cpSync('src/style.css', `${OUT}/style.css`);

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const label = (p, i) => String(i);

function nav(cur) {
  // the landing page is the series title; the list holds the nine essays
  const items = PAGES.slice(1).map((p, k) => { const i = k + 1; return `<li><a href="${p.file}"${i === cur ? ' aria-current="page"' : ''}><span class="n">${label(p, i)}</span>${esc(p.short)}</a></li>`; }).join('');
  return `<nav class="series" aria-label="${SERIES_TITLE}: the series"><div class="series-in"><a class="series-title" href="index.html">${SERIES_TITLE}</a><ol>${items}</ol><button id="play-toggle" type="button" aria-pressed="true" title="Pause all animations">❚❚ Pause</button></div></nav><script>(function(){var a=document.querySelector('nav.series [aria-current=page]');if(a){var o=a.closest('ol');if(o.scrollWidth>o.clientWidth)o.scrollLeft=a.offsetLeft-o.offsetLeft-24;}})();</script>`;
}
function pager(cur) {
  const prev = PAGES[cur - 1], next = PAGES[cur + 1];
  const a = (p, cls, word) => p ? `<a class="${cls}" href="${p.file}"><small>${word}</small>${esc(p.title)}</a>` : '<span></span>';
  return `<nav class="pager" aria-label="Previous and next in the series">${a(prev, 'prev', '← Previous')}${a(next, 'next', 'Next →')}</nav>`;
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
  html = html.replace(/(<main>)/, nav(i) + '\n$1');
  html = html.replace(/(<\/article>)/, pager(i) + '\n$1');
  writeFileSync(`${OUT}/${p.file}`, html);
});
console.log(`built ${OUT}/: ` + PAGES.map(p => p.file).join(', '));
