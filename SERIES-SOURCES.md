# Where the two blog series come from

`blog/ai/` and `blog/electricity/` are built from sources that are not in this branch. Any agent or bot that
refreshes them must read this first. A check, `.github/workflows/series-guard.yml`, fails any pull request that would
put back an older version of either series.

## blog/electricity/: *Why Did Electricity Stop Getting Cheaper?*

- Source: the `electricity-source` branch of this repository. Build with `node build.mjs` and copy `dist/` into
  `blog/electricity/`.
- Always build from the **head** of `electricity-source`. On 26–28 Oct 2026 a refresh from an older source put
  back the old six-page "How Electricity Works" series; the guard now catches that.

## blog/ai/: *Can AI outgrow the planet's power grid?*

- Source: the `ai-explainer` repository, which is not attached to this one.
- **The built files here are ahead of that source.** Between 5 and 6 Nov 2026 these were edited directly in
  `blog/ai/`:
  - the copy-edits (PR #28);
  - the thesis rebuild (PR #29);
  - the essay as front door and Rubin (PR #30).
- **Before the next rebuild from `ai-explainer`, port every change listed below into the source, then rebuild.**
  Then check that the guard passes.
- The new figures are in `blog/ai/thesis.js`, readable and unminified, to be moved into `src/figs/`.

## Cache stamps

Pages load their local scripts and stylesheets as `name?v=<first 8 hex of the file's sha256>`. After editing any
`.js` or `.css` file in `blog/ai`, or after a rebuild that writes unstamped references, run
`python3 .github/scripts/stamp-assets.py`. The electricity build writes the same stamps itself. The series guard fails
a pull request with a stale or missing stamp.

## Updating the guard

When a series legitimately changes a page that a marker checks, update the marker in
`.github/scripts/series-guard.sh` in the same pull request, and say why.

---

# Porting the 5 Nov 2026 AI-series changes into `ai-explainer`

The `ai-explainer` source was not reachable from the session that made these changes. They were therefore made
**directly in the built files** in `blog/ai/` on a branch from `master` of `akarshgopal/akarshgopal.github.io`. A
rebuild from the source without porting them will lose them. Port this file's changes, together with the copy-edits
from PR #28 (see `docs/HANDOFF-AI-SERIES.md`, Step 0).

## 1. New file: `blog/ai/thesis.js`

This is readable, unminified ES5. It mounts figures marked `<figure data-xfig="name">`, which `app.js` ignores, and
builds the same footer (hint plus the "ⓘ data" panel) that `app.js` builds. Each figure should move to its own module in
`src/figs/` and be registered in `src/figures.js` as an ordinary `data-fig`.

| Figure | Page | What it shows |
|---|---|---|
| `demandBridge` | demand | Published tokens (Google, OpenAI API, ChatGPT, Microsoft) × 0.6 mWh, with read tokens discounted, against the top-down 55 TWh; toggle 2025 / May 2026 rate |
| `capexChain` | demand | 2026 capex → ÷ $/GW → GW → TWh; capacity path to 2035 against Act 2's 26%/yr |
| `actsBridge` | index | IEA all data centres, Act 2 capacity × load, Act 1 Low/Mid/High inference, on one log TWh axis |
| `meterSteps` | verdict | The verdict meter's model built up in three steps (demand, efficiency, cap). Uses the same equations as `qe()` in the meter |
| `usBalance` | binds | US data-centre and total demand growth against 2026's planned additions, as energy or as firm power at the peak |
| `rackLadder` | factory | H100 → DGX H100 → GB200 / GB300 / Vera Rubin NVL72; racks and GPUs per gigawatt at a chosen PUE |

All data constants are at the top of each figure, with their sources in comments. Act 1's Low, Mid and High paths in
`DATA.act1` were computed with the meter's own model (`qe()` with the `se` presets). If the presets change, recompute
them.

## 2. Patches to the minified `blog/ai/app.js`

- `t0.usdPerEur: 1.13` → `1`. Hardware costs now stay in dollars.
- In `mwhFlow` (`Un`), `idleCost` (`ea`), `trainingBill` (`Ra`) and the money formatter `po`, every `€` became `$`.
- The default electricity price in those three figures changed from 100 to 85 (EIA 2025 average US industrial price,
  8.51¢/kWh).
- Roofline chip list (`dt`): added `AMD Instinct MI355X`, `NVIDIA GB300 (Blackwell Ultra)` and
  `Google TPU v7 Ironwood`, all from Epoch's hardware data already in the bundle.

## 3. Page changes (HTML)

- **New page `binds.html`** ("What Binds, 2026–30"): added to the series menu as number 11 on every page. Orbital,
  The verdict and The short tour are renumbered to 12–14. Factory's next link and Orbital's previous link now point to
  it. Not yet on the `caseMap` diagram.
- **index**:
  - New first screen: a plain thesis with today's numbers and the near-term question.
  - `actsBridge` replaces `verdictMeter`, `ceilingMeter` and `launchCost`.
  - R1–R3 are now one paragraph that links to Verdict.
  - Notes rewritten (6).
  - The ids `#act2`, `#verdict` and `#map` are kept, because the electricity series links to the first two.
- **demand**:
  - Rewritten bottom-up: counting tokens, reading against writing, what the count misses, tokens per task (the ladder is
    kept), dollars to gigawatts, and when cheaper means more.
  - A reconciliation table, `#reconcile`.
  - 12 notes.
- **verdict**:
  - Now the single home of `verdictMeter` and `ceilingMeter`, with the full captions moved from the index.
  - The 55 TWh derivation is in `#anchor`.
  - Adds `meterSteps`.
  - `launchCost` removed (its home is Orbital).
  - Notes rewritten (7).
- **orbital**: `ceilingMeter` removed. §1 is now a short paragraph that links to Verdict.
- **essay** (the short tour):
  - `switchAdder`, `rippleAdder` and `turingTape` removed (their home is Rules).
  - §1 and §2 were rewritten so they no longer copy Rules.
  - §13 is in dollars.
  - §14's last paragraph links to What binds.
- **factory**:
  - `rackLadder` added to §1, with GB300 and Vera Rubin rack power in note 3.
  - §3 and §4 are in dollars, with AWS rental prices.
  - The break-even maths is in dollars ($753/MWh; $483–691).
- **scaling**: The bill is in dollars (about $0.96 an hour of hardware; electricity 11–15% at $85/MWh; AWS H100 about
  $6/h).
- **parallel**: the roofline caption now covers nine chips.
- **data**: an aside ties §§3–5 to the meter, and one sentence compares the human-data market to 2026 capex.
- **language**: an aside at §1 marks the convolution and overfitting sections as background.
- **Links to the meter**: on flip, model, rules, language, data and yardstick they now go to `verdict.html#act1`
  rather than the index.
- **All pages**: the colophon reads Data / Data + model / Model (it said "Real data").

## 4. Sources checked on 5 Nov 2026 (primary unless marked)

| Source | What it gave |
|---|---|
| Google I/O 2026 blog | 9.7T, 480T and 3.2Q tokens a month; 19B a minute |
| Alphabet Q3 2026 remarks | 32B a minute |
| Alphabet Q3 2026 call transcript (PDF) | capex $195–205B; 65/35 split |
| Microsoft FY27 Q1 call (Motley Fool transcript) | about $170B for calendar 2026; 75% short-lived assets |
| Amazon Q3 2026 call (Motley Fool transcript) | about $220B |
| Meta | $135–145B (secondary only) |
| Epoch AI, 1 GW cost of ownership | $38B up front; servers 60%; energy $594M a year; PUE 1.14 |
| Epoch AI, capacity | 13.50 GW and 31.24 GW |
| OpenRouter / a16z (arXiv:2601.10088) | about 6,000 prompt and 400 completion tokens per request |
| Epoch AI, "How much energy does ChatGPT use?" | 0.3 Wh; 2.5 Wh at 10k input tokens (via search excerpt) |
| EIA Today in Energy (20 Feb 2026) | 86 GW planned for 2026 and its mix; 53 GW in 2025 |
| EIA Electric Power Monthly, Tables 6.07.A and B | 2025 capacity factors |
| EIA Electric Power Monthly, Table 5.3 | 8.51¢/kWh (via search excerpt) |
| EIA STEO, Sep 2026 | 4,135 and 4,211 TWh |
| LBNL 2025 update | 649 TWh in 2030 (521–843) |
| Grid Strategies (Nov 2025) | 166 GW, of which data centres 90 GW, about 55%; forecasts overstate by about 40% |
| LBNL Queued Up 2026 | 1,312 GW of generation plus 749 GW of storage; more than 5 years; 13% built |
| Wood Mackenzie (Aug 2025) | 30% transformer deficit; 80% imported |
| GE Vernova Q3 2026 (SEC) | 116 → 122 GW; 5 GW shipped |
| AWS Capacity Blocks pricing | $5.970 an hour per H100; $14.208 per B200 |
| NVIDIA DGX GB200 user guide | about 120 kW |

Secondary or reported only:
- HPE's GB300 figures (132 kW nominal, about 155 kW peak), via a search excerpt;
- Vera Rubin rack power (190–230 kW, Kuo; Gigabyte "up to 240 kW");
- TrendForce's CoWoS capacity;
- SK hynix's "sold out";
- the xAI and Stargate on-site megawatts;
- GE Vernova's "sold out through 2030";
- Microsoft's 50T tokens a month, and OpenAI's 6B tokens a minute and 2.5B prompts a day (company statements as
  reported).

## 5. Follow-ups, 5 Nov 2026 (second PR)

- `app.js`, `caseMap` (`Vr`):
  - Added a "What binds" card to Act 2, with edges need → binds → verdict.
  - "Power needed" now links to `verdict.html#act2`.
  - The Demand card's description is updated.
- `three3d.js`: label anchors in `relay3d` (`Vd`) and `cascade3d` (`Yd`) lowered from y = 1.35 (and 1.05) to 0.85, so A, B
  and "B driven" sit just above their coils.
- **data**:
  - `laborMap` replaced by a table (`#labour`).
  - `dataFlow` and `flywheel` removed; the paragraphs around them already describe the pipeline and the loop.
  - `dataIndustry` (a real data chart) is kept.
- **factory**: `regionsTWh` is kept, because it bears on energy.
- **essay**: the opening aside, a second lede paragraph and the final words now carry the series' near-term question and
  point to Demand, What binds and the Verdict. The index stays the contents page and case map.

## 6. The essay as the front door; Rubin (6 Nov 2026, same PR)

- **essay.html** is the front door:
  - Retitled "From Switch to Supercluster: Can the Grid Keep Up?".
  - A new opening states the near-term question.
  - New sections: §15 "What AI uses, and what the money buys" (now the home of `actsBridge`), §16 "Can the grid connect
    it?", §17 "Who pays" (the AEP Ohio data-centre tariff) and §18 "The long run".
  - New final words, and notes 38–47.
- **index.html** is now the contents page (grouped `ul.contents`, styled at the end of `style.css`) plus the case map.
  It has one note. The ids `#act2`, `#verdict` and `#map` are kept.
- **Series menu**: Start Contents; 1 The essay; 2 Yardstick … 14 Verdict. The pager chain is index → essay →
  yardstick → … → verdict → index. "Short tour" is renamed "the essay" in the prose.
- **app.js, roofline (`dt`)**: added `{lab:"Rubin (2026)", peak:4e15, bw:192e11}` from Nvidia's Vera Rubin NVL72
  specifications page (dense FP16/BF16 4 PFLOPS; HBM4 19.2 TB/s per GPU), and raised the y-axis top from 15.6 to 15.8.
  Once Epoch's dataset has Rubin, replace this with its row.
- **factory**: note 3 and the `rackLadder` caption add Nvidia's "40K GPUs in 100 MW" (2.5 kW per GPU, site level).
- Script paths were removed from essay note 36, essay note 37 and Language note 17.

## 7. Primary sources and Epoch's Rubin row (7 Nov 2026)

- **app.js roofline**: the Rubin entry is now named `NVIDIA VR200 (Vera Rubin)`, Epoch's row. Epoch's dataset,
  downloaded on 7 Nov 2026, has it: released 2026-09-30, BF16 dense 4e15 FLOP/s, 19.2e12 B/s. Once the bundled
  Epoch data is refreshed, take it from `eo` like the other chips. The Parallel caption is updated to match.
- **thesis.js `RUNGS`**:
  - GB200 is 120 kW (Nvidia) only.
  - GB300 is 135 kW, up to 155 kW peak, from Lenovo's LP2357 product guide (a primary source).
- **factory**: the text, caption and note 3 match. Note 3 adds the 4 × 110 kW shelf ceiling from Nvidia's DGX Vera
  Rubin guide.
- **binds**:
  - GE Vernova's "sold out through 2030" (secondary) becomes "sold multiple slots for 2032 delivery", from its
    28 Oct 2026 call transcript (primary).
  - SK hynix's "sold out" (secondary) becomes "LTAs cover more than 50% of 2027–28 capacity", from its 3Q26 release.
  - Stargate Abilene: TCEQ operating-permit application O4721 lists 5 Titan 350 and 5 LM2500 turbines and
    62 emergency generators. The total of about 360 MW is still as reported.
- **demand note 9**: Meta's $135–145B is now quoted from its SEC exhibit 99.1 (21 Oct 2026).
- **Still secondary** (no primary source is published):
  - TSMC CoWoS capacity (TrendForce);
  - Vera Rubin rack draw (analyst estimate; Gigabyte "up to 240 kW");
  - the xAI permit figure (TechCrunch).

## 8. Social cards (7 Nov 2026)

- Every page except the three redirect stubs now has, before `</head>`:
  - a canonical link;
  - Open Graph tags: `og:title` (the page title, without the series suffix), `og:description` (the page's meta
    description), `og:url`, and `og:image` = `blog/ai/og.png`;
  - `twitter:card` = `summary_large_image`.
- `og.png` (1200 × 630) shows `actsBridge` beside the series title.
- Add the same tags to the source's page template, and copy `og.png` into its static files.

## 9. Updated dates and RSS feed (7 Nov 2026)

- Each page's byline ends "· updated <time datetime=…>…</time>". The date is the last commit to the page on
  `master`.
- The `<head>` has `<meta property="article:modified_time">` and
  `<link rel="alternate" type="application/rss+xml" href="feed.xml">`.
- `blog/ai/feed.xml` (RSS 2.0) lists the 15 pages, newest update first.
- In the source, generate these at build time from git dates, as the electricity build does (see `build.mjs` on
  `electricity-source`).

## 10. Accessibility and "In brief" (7 Nov 2026)

- **`style.css`, appended:**
  - `--ink3` changed to `#6d6d6b`.
  - `.figfoot .fig-hint` (and `.done`) set to `opacity: 1`.
  - `.pk-lv` darkened.
  - Three inline readout colours raised to 4.5:1.
  - A `.brief` style added.
- **HTML:**
  - The `<aside class="deepdive …">` boxes in essay and factory are now `<div … role="note">`.
  - The empty first `<th>` cells now read "Rank" (binds) and "Result" (verdict).
  - 13 deep dives open with `<div class="brief" role="note">` ("In brief" plus "The surprise").
- **Yardstick:** the opening and note 2 now use the published-token range (3.3–7.6 TWh, a 7–16× gap) instead of
  "ten billion prompts".
- **Result:** axe-core 4.10 reports 0 violations on all 15 pages at 1280 and 390.
