# Handover: "Why Did Electricity Stop Getting Cheaper?" (electricity series)

Last session: 21–31 October 2026. This file is the starting point for the next session.

## 1. Done 31 Oct 2026: the US price decomposition now runs 1969–2025

Essay 9 (`src/pages/futures.html`, "Where the savings went", figure `billSplit`) splits the average US household kWh
into what it pays for, **1969–2025**, in 2025 dollars (¢/kWh):

| | 1969 | 1973 | 1981 | 1983 | 1988 | 2000 | 2025 |
|---|---|---|---|---|---|---|---|
| Fuel and bought power | 4.4 | 5.4 | 10.3 | 9.3 | 6.8 | 7.1 | 4.9 |
| Running and paying for plants | 3.8 | 3.8 | 4.2 | 5.1 | 5.8 | 3.2 | 2.5 |
| Wires | 5.0 | 4.2 | 3.0 | 3.3 | 3.0 | 1.9 | 5.7 |
| Customer service, overheads | 2.2 | 1.9 | 1.8 | 2.1 | 2.3 | 1.8 | 2.6 |
| Taxes | 3.8 | 2.8 | 2.6 | 3.5 | 2.6 | 1.4 | 1.5 |
| Total | 19.3 | 18.1 | 21.9 | 23.3 | 20.4 | 15.4 | 17.2 |

Sources (all in `scripts/data/`, each with its provenance in a header comment; `src` on each row of
`src/lib/usbilldata.js` says which was used):
- 1994–2025 FERC Form 1 via PUDL (`ferc1`).
- 1969–78 FPC/EIA *Statistics of Privately Owned Electric Utilities 1978*, Tables 24/28/30 (archive.org) (`fpc`).
- 1979–82 EIA *Financial Statistics of Selected Electric Utilities 1982*, Tables 3/27/17 (OSTI 7028400);
  1985–89 the 1989 IOU edition, Tables 5/10/26 (archive.org); 1991–93 the 1995 edition (eia.gov) (`eia-finstats`).
- 1983, 1984, 1990 EEI *Statistical Yearbook* 1985 and 1990 (archive.org) (`eei`). EEI nets out sales between
  affiliates and has no purchased power: revenue scaled by EIA/EEI (1.076–1.081 in 1982, 1985, 1990, interpolated),
  bought power = production + affiliate sales − fuel − other generation O&M (interpolated from EIA years).
  Leave-one-out checks (1982, 1985) reproduce EIA's shares within 1 point.
- Capital split before 1994: plant in service by function, scaled so 1994's plant shares give 1994's depreciation
  shares. 1994–95 overlap (EIA composite vs PUDL): shares within 1 point.
- Prices: EIA-861 2001+; EIA AER Table 8.10 before (1960+ available).
Scanned tables were read from page images and every column checked against the printed totals (the script also
asserts the O&M lines add up). The script prints the checks.

Not done / possible next steps:
- **1960–68**: needs an FPC *Statistics of Privately Owned Electric Utilities* edition from 1968–72 (its ten-year
  tables would cover 1959–68). Only on HathiTrust (Cloudflare bot check blocks automated access) and Google Books,
  which has full-view volumes dated 1972 (`books.google.com/books?id=Ar6IVVeFyEYC`), 1974 (`4Rpp6hwgar8C`) and 1976
  (`ZfdFzhzMwm4C`) but answers this environment's downloads with a CAPTCHA. A person can download the PDF in a
  browser. `docs/HANDOFF-1960s.md` is a self-contained brief for a Claude conversation given the PDFs: it returns
  `scripts/data/fpc_privately_owned_1960_1968.csv`, which the script loads if present (no PDFs in git).
  **Status (31 Oct):** that extraction is done for 1951–68 (all checks residual 0; the CSV is with the owner, not
  yet in git). The script is ready for it (empty cells = 0; pre-1960 prices from Historical Statistics S 116,
  `scripts/data/hist_stats_s116_residential_price.csv`). The remaining steps, as a brief for another Claude session:
  `docs/HANDOFF-1951-integration.md`. *Historical Statistics of the
  US* (Census, ch. S 133–146) and the *Statistical Abstract* have only revenue and net income, not the split.
- Optionally show the 1960–68 total price as a line before the stack (AER prices are already in `scripts/data/`).
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
