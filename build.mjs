import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { PAGES, SERIES_TITLE } from './src/series.mjs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/fonts', { recursive: true });
const common = { bundle: true, minify: true, format: 'iife', target: ['es2020'], legalComments: 'eof' };
await build({ ...common, entryPoints: ['src/main.js'], outfile: 'dist/app.js' });
await build({ ...common, entryPoints: ['src/posts.js'], outfile: 'dist/series.js' });
cpSync('src/fonts', 'dist/fonts', { recursive: true });
cpSync('src/style.css', 'dist/style.css');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const label = (p, i) => i === 0 ? 'Essay' : String(i);

function nav(cur) {
  const items = PAGES.map((p, i) => `<li><a href="${p.file}"${i === cur ? ' aria-current="page"' : ''}${p.status === 'planned' ? ' class="planned"' : ''}><span class="n">${label(p, i)}</span>${esc(p.short)}${p.status === 'planned' ? '<small>in preparation</small>' : ''}</a></li>`).join('');
  return `<nav class="series" aria-label="${SERIES_TITLE}: the series"><div class="series-in"><a class="series-title" href="index.html">${SERIES_TITLE}</a><ol>${items}</ol></div></nav><script>(function(){var a=document.querySelector('nav.series [aria-current=page]');if(a){var o=a.closest('ol');if(o.scrollWidth>o.clientWidth)o.scrollLeft=a.offsetLeft-o.offsetLeft-24;}})();</script>`;
}
function pager(cur) {
  const prev = PAGES[cur - 1], next = PAGES[cur + 1];
  const a = (p, cls, word) => p ? `<a class="${cls}" href="${p.file}"><small>${word}</small>${esc(p.title)}</a>` : '<span></span>';
  return `<nav class="pager" aria-label="Previous and next in the series">${a(prev, 'prev', '← Previous')}${a(next, 'next', 'Next →')}</nav>`;
}
function stub(p, i) {
  const secs = p.sections.map(([id, t], k) => `<h3 id="${id}"><span class="num">${k + 1}</span>${esc(t)}</h3>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} · ${SERIES_TITLE}</title>
<meta name="description" content="${esc(p.lede)}">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
<article>
<header class="top">
<h1>${esc(p.title)}</h1>
<p class="byline">Part ${i} of the series · in preparation</p>
</header>
<p class="lede">${esc(p.lede)}</p>
<p class="aside">This part of the series has not been written yet. The outline below is what it will cover, and links from the other posts already point at these planned sections. Until then, the <a href="index.html">main essay</a> covers the basics.</p>
<h2 id="plan">What this post will cover</h2>
<div class="plan">
${secs}
</div>
</article>
</main>
</body>
</html>
`;
}

PAGES.forEach((p, i) => {
  let html;
  if (p.file === 'index.html') html = ['part1', 'part2', 'part3'].map(k => readFileSync(`src/index.${k}.html`, 'utf8')).join('');
  else if (p.status === 'live') html = readFileSync(`src/posts/${p.file}`, 'utf8');
  else html = stub(p, i);
  // stable ids for every figure that lacks one
  html = html.replace(/<figure([^>]*?)data-fig="([A-Za-z0-9]+)"([^>]*)>/g, (m, a, name, b) => /\bid=/.test(a + b) ? m : `<figure${a}data-fig="${name}" id="fig-${name}"${b}>`);
  html = html.replace(/(<main>)/, nav(i) + '\n$1');
  html = html.replace(/(<\/article>)/, pager(i) + '\n$1');
  writeFileSync(`dist/${p.file}`, html);
});
writeFileSync('src/index.html', ['part1', 'part2', 'part3'].map(k => readFileSync(`src/index.${k}.html`, 'utf8')).join(''));
console.log('built dist/: ' + PAGES.map(p => p.file).join(', '));
