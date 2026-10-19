# Brief for coding agents (read fully before editing)

Project: Ciechanowski-style interactive explainer series "How Electricity Works". Static site built by `node build.mjs`.
Goal of current work: make the series global (see GLOBAL-AUDIT.md). Germany/EU becomes ONE case study among China, India, US, Japan, Brazil, Middle East, Africa, Australia, Southeast Asia.

## Hard rules
- Package manager: pnpm ONLY (never npm/yarn). Build: `export COREPACK_HOME=/home/box/.cache/node/corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0; pnpm run build`. Link check: `node scripts/linkcheck.mjs` must print LINK CHECK PASSED.
- Do NOT deploy, push, publish, send messages or post anything. No network writes.
- REAL CITED DATA ONLY. Never invent numbers. Every number in a "Real data" figure must come from a source you actually downloaded or fetched (Ember, IEA, IRENA, EIA, OWID, World Bank, national operators/regulators). Save raw downloads under /workspace/research/data/global/ and generate JS data modules with a python script in scripts/ (pattern: scripts/make_*_data.py -> src/lib/*data.js). If you cannot get a number from a real source, leave it out and say so in your final message.
- NO Energy-Charts data (licence). SMARD (CC BY 4.0), ENTSO-E, Ember (CC BY 4.0), OWID (CC BY), EIA, World Bank are fine.
- Label every model: figcaption starts with `<span class="tagline tag-real">Real data</span>`, `tag-ill` (Model) or `tag-mixed` (Real + model).
- Keep ALL existing element ids/anchors (h2 ids, figure data-fig names). Add, never rename or remove.
- Money: default US$; where a figure shows prices add a €/$ toggle via src/lib/currency.js (create if absent: export rates by year with a cited source, a `fmtMoney` helper and a `currencyToggle(ctl, onchange)` segmented control). Be consistent.

## Code conventions
- Main essay source is src/index.part1.html, part2, part3 (build concatenates into src/index.html; edit the parts, not src/index.html). Posts: src/posts/<file>.html. Figures are JS modules in src/figs/*.js registered in src/posts.js (posts) or the main-essay registry (grep for an existing fig name like 'merit' to find it).
- Figure API: `new Fig(el,{label,height:w=>…,draw(ctx,w,h)})`, `fig.invalidate()`, `fig.interact({hit,hover,down,move,cursor})`; controls: `controls(el)`, `slider(ctl,{label,min,max,step,value,color,fmt,oninput,name})`, `segmented(ctl,{label,options:[{label,value,name}],value,onchange})`, `readout(el)`; draw helpers in src/lib/draw.js (`axes`, `text`, `measure`, `rrect`, `line`, `circle`, `pathLine`, `scale`, `clamp`, `lerp`), colours in src/lib/colors.js. Copy patterns from existing figures (e.g. src/figs/sf2.js, sf3.js).
- Every control option and slider needs a unique `name` (used by screenshot scripts).
- Narrow screens (<600 px) need their own layout; text labels must not overlap (the audit flags overlaps).
- HTML: `<figure class="fig" data-fig="name"><figcaption>…</figcaption></figure>`; footnotes `<sup class="fn"><a href="#nX">X</a></sup>` with matching `<li id="nX">` in the page's `<ol class="notes">`; cross-links `class="xref"`. Calm, plain prose; short sentences; British spelling.
- Checks the reviewer will run: build, link check, `node scripts/audit.mjs 1280,390 --page=X.html`. Run build + link check yourself before finishing.

## Final message
List: files changed, new figures, data sources with URLs actually downloaded, any number you could not source, anything left undone.
