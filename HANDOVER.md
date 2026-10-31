# Handover: "Why Did Electricity Stop Getting Cheaper?" (electricity series)

Last session: 21–31 October 2026. This file is the starting point for the next session.

## 1. The next task: take the US price decomposition back to 1970

Essay 9 (`src/pages/futures.html`, section "Where the savings went", figure `billSplit`) splits the average US
household kWh into what it pays for, 2001–2025, in 2025 dollars:

| ¢/kWh, 2025 $ | 2001 | 2025 |
|---|---|---|
| Fuel and bought power | 8.2 | 4.9 |
| Running and paying for plants | 2.3 | 2.5 |
| Wires (transmission + distribution) | 2.0 | 5.7 |
| Customer service, overheads | 1.6 | 2.6 |
| Taxes | 1.4 | 1.5 |
| Total | 15.7 | 17.2 |

It starts in 2001 only because the residential price series reachable last time (EIA-861 via PUDL) starts there.
The series' question is about the break around 1970–73, so the goal is to extend the decomposition to cover it:
**1960 (or earlier) to 2025**, ideally showing the fall to 1970, the jump in fuel after 1973, the capital (nuclear,
interest rates) bulge of the late 1970s–80s, and the wires growth since.

### What is needed
1. **Average residential price, nominal, 1960–2000** (and ideally all-sector). EIA *Annual Energy Review* Table 8.10
   ("Average Retail Prices of Electricity", 1960–2011) or EIA *Monthly Energy Review* Table 9.8; the project already
   has the 1892–1970 real series and post-1973 nominal points in `src/figs/history.js` (sources in essay 1 notes).
2. **Utility cost structure before 1994** (FERC Form 1 in PUDL starts in 1994). Candidate sources, best first:
   - FPC / FERC / EIA, *Statistics of Privately Owned Electric Utilities in the United States* (annual, 1937–1980s)
     and its successor EIA *Financial Statistics of Major U.S. Investor-Owned Electric Utilities* (1980s–2003):
     operating revenue, fuel, purchased power, O&M by function, depreciation, taxes, net operating income — the same
     categories as Form 1. Often on HathiTrust / Google Books / EIA archive (`eia.gov/electricity/` and
     webharvest.gov archives of `eia.doe.gov`).
   - EEI *Statistical Yearbook of the Electric Utility Industry* (historical; harder to get).
   - Hirsh (1989) and Joskow (1974, 1985) for qualitative anchors.
   A few benchmark years (1960, 1965, 1970, 1973, 1975, 1980, 1985, 1990) are enough if annual data is not available;
   say so in the caption.
3. **CPI-U**: already used, from `https://raw.githubusercontent.com/datasets/cpi-us/main/data/cpiai.csv`.

### How the current numbers are made (keep the method consistent)
`scripts/make_us_bill_data.py <data dir>` → `src/lib/usbilldata.js`. Inputs (PUDL, public S3, reachable):
`https://s3.us-west-2.amazonaws.com/pudl.catalyst.coop/stable/<table>.parquet` for
`core_ferc1__yearly_operating_expenses_sched320`, `core_ferc1__yearly_income_statements_sched114`,
`core_ferc1__yearly_depreciation_summary_sched336`, `core_eia861__yearly_sales`, plus `cpiai.csv` above.
Method: sum all investor-owned utilities; fuel = accounts 501 + 518 + 547; bought power = 555; other generation O&M
= power production expenses − fuel − bought; wires O&M = transmission + regional market + distribution; overheads =
customer accounts + customer service + sales + A&G; taxes = taxes other than income + income taxes (current,
deferred net, ITC); return = revenue − utility operating expenses (the reported net-operating-income row is empty
before 2021); depreciation + return are split by function in proportion to depreciation by function. Shares of
revenue are applied to the EIA-861 average residential price (revenue ÷ MWh of bundled + energy-only service).
Checks: categories sum to 97–105% of revenue every year. Python needs `pyarrow` (`pip install --user pyarrow`; run
scripts with `python3 -P`).
Pre-1994 sources will have coarser categories; map them onto the same five groups and mark the seam in the figure.

### Where it shows up
Figure `billSplit` in `src/figs/new-futures.js` (US/Germany switch), prose and note in `futures.html`
(`#where-the-savings-went`). If the series reaches 1970, essay 1 (`cheaper.html`) and the landing page should point
to it, and essay 9's §1 ("four layers") can cite real shares instead of the toy alone.

## 2. Network access the task needs
The last environment blocked most hosts. Reachable: GitHub (incl. raw), PUDL S3, Ember's GCS bucket, PyPI/npm.
Blocked: eia.gov, fred.stlouisfed.org, bls.gov, gutenberg.org, smard.de, grid-india.in, iexindia.com, nea.gov.cn,
HathiTrust. **Allow at least `eia.gov` and `www.eia.gov`** (and ideally `babel.hathitrust.org`, `fred.stlouisfed.org`).
WebSearch worked (snippets only); WebFetch is bound by the same network allowlist.

## 3. Repositories and build
- **Source** (this repo): `electricity-explainer` — esbuild static site. `pnpm install`, then `node build.mjs`
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
  - Look at every changed figure in page context at 1280 and 390 px (a small Playwright script that scrolls a
    `[data-fig=name]` to the top third and screenshots the viewport).
- Notes: `python3 scripts/renumber-post.py src/pages/<file>.html` renumbers notes by first citation (check
  cross-page "essay N, note M" references by hand). `python3 scripts/redirects.py` regenerates each page's old-link
  redirect map from git history (manual aliases at the top of the script).

## 4. State of the series (merged and live on master as of PR #18; PR #20 open)
- Title "Why Did Electricity Stop Getting Cheaper?", subtitle "How electricity works, in nine essays".
  Nine essays + two deep dives (`src/series.mjs`): cheaper, kilowatt-hour, the-machine, transmission (Wires),
  balancing, solar-pv, utility-renewables (Wind), price (Costs), futures; deep dives transformers, synthetic-fuels.
- The argument, in five pieces: (1) an engine of productivity (hotter, bigger plants) made power cheaper; (2) it
  stalled around 1970 (materials ceiling well below Carnot; unit size limits; slower demand); (3) the merit order
  passed the 1970s fuel shocks straight through; (4) solar, wind and batteries restarted the engine for energy, but
  value falls as share rises; (5) the costs the engine does not touch — wires, firming, capital, taxes — now
  dominate. Essay 9's new decomposition is the quantified version of (4)+(5) for the US.
- Four countries (US, Germany, China, India) replace Germany as the default.
- **PR #20 (open)**: the "Where the savings went" section and `billSplit` figure. Merge it, or fold the 1970 extension
  into it.
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
