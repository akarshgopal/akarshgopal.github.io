# Handover: "Why Did Electricity Stop Getting Cheaper?" (electricity series)

Last session: 21–31 October 2026. This file is the starting point for the next session.

## 1. The next task: take the US price decomposition back to 1960

Essay 9 (`src/pages/futures.html`, section "Where the savings went", figure `billSplit`) splits the average US
household kWh into what it pays for, **1991–2025** (extended from 2001 on 31 Oct 2026), in 2025 dollars:

| ¢/kWh, 2025 $ | 1991 | 2001 | 2025 |
|---|---|---|---|
| Fuel and bought power | 6.3 | 8.2 | 4.9 |
| Running and paying for plants | 5.1 | 2.3 | 2.5 |
| Wires (transmission + distribution) | 2.8 | 2.0 | 5.7 |
| Customer service, overheads | 2.3 | 1.6 | 2.6 |
| Taxes | 2.5 | 1.4 | 1.5 |
| Total | 19.0 | 15.6 | 17.2 |

Sources now: 1994–2025 FERC Form 1 via PUDL; 1991–93 EIA *Financial Statistics of Major U.S. IOUs 1995*
(`scripts/data/eia_finstats_iou_1991_1995.csv`, capital split with 1994's depreciation shares; 1994–95 overlap agrees
within 1 point); residential prices 2001+ EIA-861 via PUDL, 1960–2000 EIA AER Table 8.10
(`scripts/data/eia_aer_t810_prices.csv`, already covers 1960). Coverage 94.5–105% of revenue (1997 is the low year).
Each row carries `src` (`ferc1` / `eia-finstats`) for a seam marker once coarser sources are added.

Still missing: **utility cost structure 1960–1990.** EIA's own archive of the *Financial Statistics* series starts with
the 1995 edition (`eia.gov/electricity/archive/0437951.pdf`; 1996, 1998, 1999 also there). Older editions and the
predecessor FPC/EIA *Statistics of Privately Owned Electric Utilities in the United States* exist at:
archive.org (e.g. `archive.org/details/statisticsofpriv1978unse`), OSTI (`osti.gov/biblio/5764721` 1978,
`osti.gov/biblio/6121153` 1981, `osti.gov/biblio/10114582` 1990), HathiTrust (`catalog.hathitrust.org/Record/009048732`),
and Census *Historical Statistics of the US*, ch. S (income account of privately owned utilities to 1970). On 31 Oct
these hosts were all blocked (archive.org, www.osti.gov, www2.census.gov, babel.hathitrust.org). EIA's *Changing
Structure of the Electric Power Industry 1970–1991* (`eia.gov/electricity/archive/0562.pdf`) has only anchors: fuel was
77, 84 and 67% of power production expenses for major IOUs in 1970, 1980 and 1990 (footnote 63), and Table C6 gives
utility generation by fuel and fossil fuel prices 1970–91.

### What is needed
1. ~~Average residential price, nominal, 1960–2000~~ — done (AER Table 8.10, in `scripts/data/`).
2. **Utility cost structure before 1991** (1991–93 now from the 1995 *Financial Statistics*). Candidate sources, best first:
   - FPC / FERC / EIA, *Statistics of Privately Owned Electric Utilities in the United States* (annual, 1937–1980s)
     and its successor EIA *Financial Statistics of Major U.S. Investor-Owned Electric Utilities* (1980s–2003):
     operating revenue, fuel, purchased power, O&M by function, depreciation, taxes, net operating income — the same
     categories as Form 1. Often on HathiTrust / Google Books / EIA archive (`eia.gov/electricity/` and
     webharvest.gov archives of `eia.doe.gov`).
   - EEI *Statistical Yearbook of the Electric Utility Industry* (historical; harder to get).
   - Hirsh (1989) and Joskow (1974, 1985) for qualitative anchors.
   A few benchmark years (1960, 1965, 1970, 1973, 1975, 1980, 1985, 1990) are enough if annual data is not available;
   say so in the caption.
3. **CPI-U** (1960+ fine): already used, from `https://raw.githubusercontent.com/datasets/cpi-us/main/data/cpiai.csv`.

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
eia.gov and www.eia.gov were allowed on 31 Oct. Still needed for 1960–90: **archive.org, www.osti.gov,
www2.census.gov, babel.hathitrust.org**. Earlier list — reachable: GitHub (incl. raw), PUDL S3, Ember's GCS bucket,
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
- PR #20 (the "Where the savings went" section, 2001–2025) merged 31 Oct. The 1991 extension is in this source but
  not yet deployed to the site.
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
