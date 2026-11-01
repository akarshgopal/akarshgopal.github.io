# Handover: "Why Did Electricity Stop Getting Cheaper?" (electricity series)

Last session: 21–31 October 2026. This file is the starting point for the next session.

## 0. Done 31 Oct 2026 (later): growth as the second engine, and the "Sales against price" figure

**Thesis reframe.** Prices fell for eighty years because the business grew into its costs: better machines cut the
cost of making power, and sales that doubled about every eight to ten years let everything else grow more slowly than
the power sold. 1951–69 (investor-owned utilities): sales ×4.4 (+8.6%/yr), real wires spend ×2.5, so wires, overheads
and taxes per kWh fell about as fast as fuel and plants. The real price stopped falling in **1970**, while sales still
grew 6.6%/yr to 1973 (machines and fuel, not demand); after 1973 slower growth still carried wires per kWh down to
**~2000** (1.9¢) because wires spend stood still; since 2007 sales are flat and real wires spend rose ×1.85, so the
wires part went 2.9 → 5.7¢. Wires spending was never "fixed"; it grew at ~0.6 of the pace of sales. The return on
plant rose slightly (5.1% → 5.45%), so "profit rates came down" was wrong; taxes fell through income tax.
Verification and the passage list: `fpc-extract/thesis/DRAFT.md`, applied as in `fpc-extract/thesis/APPLY.md`
(outside the repo). Text changed: cheaper.html §4 intro list and §5 ¶1, ¶2, ¶4; futures.html §1 "Scale" and the
lesson, "Where the savings went" (two sentences), the network bullet, the conclusion, the toy-model caption;
the-machine.html §3 ¶3–4 and §4 close; transmission.html opening and close; history.js 1949 and 1968 cards and the toy
button ("Machines & growth: gains continue after 1970"; `STOP = 1970` unchanged).

**Follow-ups applied 1 Nov 2026** (from `docs/THESIS-DRAFT.md`): futures.html "whole arc" paragraph adds 1983–2000 as a
second fall (−2.4%/yr, two-thirds of the 1950s pace) and why wires kept falling to 2000 (the boom's network being paid
off: wires capital 3.5¢ → 1.1¢ per household kWh, real wires spend +0.6%/yr); the paragraph after `billSplit` compares
wires spending now and then (+3.8%/yr since 2000 against +5.3%/yr 1951–69, with sales flat now and +8.6%/yr then);
the network bullet moved to second in "What would have to be true", with the 1951–69 arithmetic; the conclusion adds
growth possibly restarting (fills idle hours: cheaper wires per kWh; needs new peaks: not); essay 1's short version
ends on wires as the fastest-rising part of an American bill; note 4 gives the wires-spending method and values.
`salesPrice`: after 2001 every year keeps its dot but the path joins only five-year steps (`SP_PATH`), and the 2007
label is dropped (the readout gives 2007). Provocations in `docs/THESIS-DRAFT.md` not applied (author's call).

**Figure `salesPrice`** (`src/figs/new-futures.js`, after `billSplit` in futures.html): log-log connected scatter, one
dot a year, kWh sold (1951 = 1) against the real household price or (toggle) its wires part; the other series faint
for reference; rough sales years drawn as hollow, lighter dots; hover/tap a dot for year, index, % change on five
years earlier, price and wires. Data: `USSALES` in `src/lib/usbilldata.js` (same script; `USBILL` unchanged).

**Sales index method** (`scripts/make_us_bill_data.py`, end): 1951–93 operating revenue ÷ AER Table 8.10 *total*
(all-sector) price; 1951–59 the residential price (S 116 scaled) × the 1960–62 total/residential ratio (0.692);
1994–2000 chained on US generation (`src/lib/cheaperdata.js` `USE.us.gen`, OWID — so `make_cheaper_data.py` must have
run first); 2001+ PUDL `core_eia861__yearly_sales` `sales_mwh`, `entity_type == 'Investor Owned'`, `service_type` in
(bundled, delivery), scaled at 2001 to join the chain. `rough: 1` on 1951–59 and 1994–2001. Key values: 1969 4.44,
1973 5.74, 1983 7.40, 2000 11.21, 2007 11.08, 2025 11.07.

**Caveats.** The index before 2001 is a derived proxy (revenue ÷ price; the price is on both axes, so part of any
negative slope is built in); AER prices before 1984 are printed to 0.1¢, so year-to-year changes are noisy (±3–6%) —
quote multi-year changes only. 1951–59 depends on a moving total/residential price ratio (growth may be overstated by
up to ~1 point/yr). 1985–93 implied growth (2.4%/yr) is below generation (3.2%/yr). Form 1 revenue in 1994–2001
includes wholesale trading, hence the generation bridge. FERC1 sums jump in 2000–01 and EIA-861 IOU delivered falls 6%
in 2002: avoid 2000–02 as endpoints. The price layers are residential, sales are all classes; coverage is
investor-owned utilities only (~¾ of US sales). No interest-rate series in the repo.
Possible next step: a toy model in which growth runs to 1973 and tapers (DRAFT §2.2), not built.

## 1. Done 31 Oct 2026: the US price decomposition now runs 1951–2025

Essay 9 (`src/pages/futures.html`, "Where the savings went", figure `billSplit`) splits the average US household kWh
into what it pays for, **1951–2025**, in 2025 dollars (¢/kWh):

| | 1951 | 1955 | 1960 | 1965 | 1969 | 1973 | 1981 | 1983 | 1988 | 2000 | 2025 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Fuel and bought power | 8.4 | 6.9 | 5.5 | 4.9 | 4.4 | 5.4 | 10.3 | 9.3 | 6.8 | 7.1 | 4.9 |
| Running and paying for plants | 6.7 | 6.5 | 5.6 | 4.9 | 3.8 | 3.8 | 4.2 | 5.1 | 5.8 | 3.2 | 2.5 |
| Wires | 9.1 | 8.5 | 7.2 | 6.4 | 5.0 | 4.2 | 3.0 | 3.3 | 3.0 | 1.9 | 5.7 |
| Customer service, overheads | 4.8 | 4.2 | 3.6 | 3.1 | 2.2 | 1.9 | 1.8 | 2.1 | 2.3 | 1.8 | 2.6 |
| Taxes | 8.1 | 7.6 | 6.5 | 5.2 | 3.8 | 2.8 | 2.6 | 3.5 | 2.6 | 1.4 | 1.5 |
| Total | 37.0 | 33.9 | 28.3 | 24.5 | 19.3 | 18.1 | 21.9 | 23.3 | 20.4 | 15.4 | 17.2 |

1951–69: every layer fell 43–53 per cent and kept a nearly constant share of revenue, so the accounts show the whole
business getting cheaper together, not a saving concentrated in generation (layers are shares × the residential
price, not independent unit costs). The fall did not slow before 1969. Analysis: `fpc-extract/integration/PHASE1.md`
(outside the repo).

Sources (all in `scripts/data/`, each with its provenance in a header comment; `src` on each row of
`src/lib/usbilldata.js` says which was used):
- 1994–2025 FERC Form 1 via PUDL (`ferc1`).
- 1951–68 FPC *Statistics of (Privately Owned) Electric Utilities*, Classes A and B, 1961 ed. Tables 18/20/21
  (1951–54, `books.google.com/books?id=x1_ROuyegAsC`), 1965 ed. Tables 11/17/20 (1955–61; income 1955–58,
  `tZi2hdDrkCUC`), 1972 ed. Tables 12/18/21 (1962–68; income 1959–68, `Ar6IVVeFyEYC`), in
  `scripts/data/fpc_privately_owned_1960_1968.csv` (`fpc`; name kept for the script). Revenue includes leased-plant
  income as in the 1978 ed.; USoA revised 1961 (no break at layer level). Read from page images; all checks residual 0.
- 1969–78 FPC/EIA *Statistics of Privately Owned Electric Utilities 1978*, Tables 24/28/30 (archive.org) (`fpc`).
- 1979–82 EIA *Financial Statistics of Selected Electric Utilities 1982*, Tables 3/27/17 (OSTI 7028400);
  1985–89 the 1989 IOU edition, Tables 5/10/26 (archive.org); 1991–93 the 1995 edition (eia.gov) (`eia-finstats`).
- 1983, 1984, 1990 EEI *Statistical Yearbook* 1985 and 1990 (archive.org) (`eei`). EEI nets out sales between
  affiliates and has no purchased power: revenue scaled by EIA/EEI (1.076–1.081 in 1982, 1985, 1990, interpolated),
  bought power = production + affiliate sales − fuel − other generation O&M (interpolated from EIA years).
  Leave-one-out checks (1982, 1985) reproduce EIA's shares within 1 point.
- Capital split before 1994: plant in service by function, scaled so 1994's plant shares give 1994's depreciation
  shares. 1994–95 overlap (EIA composite vs PUDL): shares within 1 point.
- Prices: EIA-861 2001+; EIA AER Table 8.10 1960–2000; before 1960 Historical Statistics S 116 × 1.0626 (Table 8.10/S 116
  over 1960–70), `scripts/data/hist_stats_s116_residential_price.csv`.
Scanned tables were read from page images and every column checked against the printed totals (the script also
asserts the O&M lines add up). The script prints the checks.

Not done / possible next steps:
- ~~**1960–68**~~ **Done 31 Oct 2026** for 1951–68 (`docs/HANDOFF-1960s.md`, `docs/HANDOFF-1951-integration.md`;
  committed on `electricity-source`, **not yet deployed to master**: task 7 of the integration brief). Earlier years
  would need FPC volumes from the 1940s; *Historical Statistics of the US* (Census, ch. S 133–146) and the
  *Statistical Abstract* have only revenue and net income, not the split.
- ~~Contradicted passages~~ **Fixed 31 Oct 2026** to follow the 1951–69 accounts (every layer fell 43–53%, the real
  price fell until about 1970): the toy `offset` model in essay 9 §1 (`src/figs/history.js`, `STOP`) now stops the
  engine in 1970, not 1965, and the text says prices with engine + shocks are "back to about their 1970 level" by
  1990 (model: 0.647 in 1970, 0.654 in 1990); essay 1 §5 now says wires, offices and taxes per kWh fell anyway while
  growth was fast and stopped when it slowed; the essay 9 conclusion credits better machines *and* a growing market.
  (Both later revised by the growth reframe, §0: wires per kWh did not stop falling until ~2000.)
- Essay 9 §1 could cite the real shares next to the toy `offset` model (the subsection right after it now does).

### How the current numbers are made (keep the method consistent)
`scripts/make_us_bill_data.py <data dir>` → `src/lib/usbilldata.js`. Inputs (PUDL, public S3, reachable):
`https://s3.us-west-2.amazonaws.com/pudl.catalyst.coop/stable/<table>.parquet` for
`core_ferc1__yearly_operating_expenses_sched320`, `core_ferc1__yearly_income_statements_sched114`,
`core_ferc1__yearly_depreciation_summary_sched336`, `core_eia861__yearly_sales`, plus `cpiai.csv`
(`https://raw.githubusercontent.com/datasets/cpi-us/main/data/cpiai.csv`); the pre-1994 inputs are in `scripts/data/`.
Method: sum all investor-owned utilities; fuel = accounts 501 + 518 + 547; bought power = 555; other generation O&M
= power production expenses − fuel − bought; wires O&M = transmission + regional market + distribution; overheads =
customer accounts + customer service + sales + A&G; taxes = taxes other than income + income taxes (current,
deferred net, ITC); return = revenue − utility operating expenses (the reported net-operating-income row is empty
before 2021); depreciation + return are split by function in proportion to depreciation by function. Shares of
revenue are applied to the EIA-861 average residential price (revenue ÷ MWh of bundled + energy-only service).
Checks: categories sum to 94.5–105% of revenue every year (1997 is the low year). Python needs `pyarrow`
(`pip install --user pyarrow`; run scripts with `python3 -P`, from the repo root). The seams are documented in the
caption and note rather than drawn in the figure, since the overlap checks agree within a point.

### Where it shows up
Figure `billSplit` in `src/figs/new-futures.js` (US/Germany switch), prose and note in `futures.html`
(`#where-the-savings-went`). Essay 1 (`cheaper.html`, after the price curve) and the landing page point to it.

## 2. Network access the task needs
eia.gov, archive.org, www.osti.gov and www2.census.gov were allowed on 31 Oct. babel.hathitrust.org answers with a
Cloudflare bot check (not a network block). Earlier list — reachable: GitHub (incl. raw), PUDL S3, Ember's GCS bucket,
PyPI/npm. Blocked then: eia.gov (now allowed), fred.stlouisfed.org, bls.gov, gutenberg.org, smard.de, grid-india.in, iexindia.com, nea.gov.cn,
HathiTrust. **Allow at least `eia.gov` and `www.eia.gov`** (and ideally `babel.hathitrust.org`, `fred.stlouisfed.org`).
WebSearch worked (snippets only); WebFetch is bound by the same network allowlist.

## 3. Repositories and build
- **Source** (this repo): `electricity-explainer`, kept on the **`electricity-source` branch of
  `akarshgopal/akarshgopal.github.io`** (an unrelated history; it never merges into `master`). Clone it with
  `git clone -b electricity-source --single-branch https://github.com/akarshgopal/akarshgopal.github.io electricity-explainer`
  and push work back to that branch. An esbuild static site. `pnpm install`, then `node build.mjs`
  (`OUT=<dir> node build.mjs` builds elsewhere). Pages `src/pages/*.html`, order and titles `src/series.mjs`,
  figures `src/figs/*.js` registered in `src/figures.js` (each essay has its own `src/figs/new-<key>.js`).
- **Site**: `akarshgopal/akarshgopal.github.io`, GitHub Pages from `master`. Deploy = copy `dist/*.html`,
  `dist/series.js`, `dist/style.css` (and `dist/fonts/` if changed) into `blog/electricity/`, commit on a branch,
  PR, merge. `hero.js` is no longer used by any page; do not ship it.
- **Checks before any deploy**:
  - `node scripts/linkcheck.mjs` (`OUT=<dir>` supported). The 10 `../ai/` links always "fail" here: they point at the
    sibling AI series on the site; check them against `blog/ai/` in the site repo instead.
  - `node scripts/audit-local.mjs 1440,1280,1024,390 --page=<file>.html` (layout audit with the pre-installed
    Chromium at `/opt/pw-browsers/chromium`; `--stress` pushes sliders to extremes).
    If that Chromium is missing, run a temporary copy with `executablePath: '/usr/bin/google-chrome'` and
    `--no-sandbox` from the repo root (it imports `playwright` from `node_modules`), then delete the copy.
  - Look at every changed figure in page context at 1280 and 390 px (a small Playwright script that scrolls a
    `[data-fig=name]` to the top third and screenshots the viewport).
- Notes: `python3 scripts/renumber-post.py src/pages/<file>.html` renumbers notes by first citation (check
  cross-page "essay N, note M" references by hand). `python3 scripts/redirects.py` regenerates each page's old-link
  redirect map from git history (manual aliases at the top of the script).

## 4. State of the series (merged and live on master as of PR #18; PR #20 open)
- Title "Why Did Electricity Stop Getting Cheaper?", subtitle "How electricity works, in nine essays".
  Nine essays + two deep dives (`src/series.mjs`): cheaper, kilowatt-hour, the-machine, transmission (Wires),
  balancing, solar-pv, utility-renewables (Wind), price (Costs), futures; deep dives transformers, synthetic-fuels.
- The argument, in five pieces: (1) two engines made power cheaper: better machines (hotter, bigger plants) and fast
  growth in use, which spread wires, offices and taxes over ever more kWh; (2) the machines stalled around 1970
  (materials ceiling well below Carnot; unit size limits) as fuel turned dearer, and growth slowed after 1973; (3) the merit order
  passed the 1970s fuel shocks straight through; (4) solar, wind and batteries restarted the engine for energy, but
  value falls as share rises; (5) the costs the engine does not touch — wires, firming, capital, taxes — now
  dominate. Essay 9's new decomposition is the quantified version of (4)+(5) for the US.
- Four countries (US, Germany, China, India) replace Germany as the default.
- PR #20 (the "Where the savings went" section, 2001–2025) merged 31 Oct; the 1969 extension was deployed after it.
- Layout: site-wide left rail on ≥960 px, drawer on phones (from master); Pause sits in the nav (master floated it
  over figures). The drawer drops `backdrop-filter` when open (otherwise the fixed panel is trapped in the bar).

## 5. Conventions
Every amount in US dollars (euro data through `src/lib/currency.js`: `eur()`, `euroFigure`, `curStr`; no new
exchange rates). British spelling. "17.3¢" (no space), "per cent" in prose, comma thousands, "$/MWh" after a number.
Figure tags: Data / Model / Data + model (`tag-real` / `tag-ill` / `tag-mixed`). Captions describe content, not UI;
no "Left/Right" (panels stack on phones); no hover hints. Never invent numbers: every figure value comes from data
in the project or a named source; anything from memory is listed in `docs/VERIFY.md`.

## 6. Open items
- `docs/VERIFY.md`: from-memory claims; the bottom "STATUS" block lists what was confirmed, corrected and still
  unverified (lower stakes: Eddystone ≈40%, US trade-policy dates, Indian solar-park details, ERCOT nodal 2010, …).
- A bot ("Grok Bot") refreshed `blog/electricity/` from an older source on 26–28 Oct and reverted the series to the
  old six-page version; whatever runs that refresh needs this source, or it will do it again.
- `blog/ai/index.html` and `blog/ai/essay.html` still call this series "How (the World's) Electricity Works"; they
  are built from the AI series' own source.
- The author's quality plan after verification and the decomposition: (a) the author's own voice and a blunt thesis
  (draft provocations for the author to accept or reject); (b) cut ~30% and add a summary plus one surprising
  claim at the top of each essay; (c) a visual design-system pass, ~40 figures instead of ~90, one strict visual
  language; (d) people and stories (Insull, Westinghouse vs Edison, Eddystone, Uri operators, a Chinese solar town);
  (e) social cards, RSS, "last updated", page weight.
- Author preference: **do not run agents in parallel** (token cost); work sequentially.

## 7. Links
- Review copy (private artifact, the author comments there): https://claude.ai/artifact/ThNf1HhHK9YyhnV7fXDsdm
- Restructure outline (private doc): https://claude.ai/artifact/CVUsQuuLYavuGUpKo33JEM
- Change logs: `CHANGES-2026-10-19.md` (earlier passes), git history of this repo (restructure onward).
