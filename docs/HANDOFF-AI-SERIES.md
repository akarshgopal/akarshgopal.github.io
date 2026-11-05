# Handoff: bring the AI series' thesis half up to the bar

Paste everything below the line into a Claude session that has the **`ai-explainer` source** (the repo that builds
`blog/ai/`; it is not in `akarshgopal/akarshgopal.github.io`), a shell, network access, and push rights to
`akarshgopal/akarshgopal.github.io` for deploying. Attach or link `AI-REVIEW.md` (on the `electricity-source` branch of
that repo) for the full review.

---

You are improving *Can AI outgrow the planet's power grid?*, an interactive essay series. Its source is the
`ai-explainer` repo, and it is deployed as static files in `blog/ai/` on the `master` branch of
`akarshgopal/akarshgopal.github.io`. A sister series, *Why Did Electricity Stop Getting Cheaper?* (`blog/electricity/`,
source on the `electricity-source` branch of that repo), covers the grid; link to it rather than re-explaining.

## Read first

- `AI-REVIEW.md` on `electricity-source`: the review this brief acts on, against three bars:
  - **Bartosz Ciechanowski**: build-up figures, one idea per figure, direct manipulation;
  - **SemiAnalysis**: current hardware, bottom-up models, supply chain, reconciled numbers, US prices;
  - **top-tier bloggers** (*Construction Physics*, Epoch's *Gradient Updates*): one sharp question in a human
    voice.
- Its verdict: the physics and ML pages (Rules, The Price of a Flip, Parallel, A Model, Language) are at the bar.
  **Keep them as they are.** The thesis pages (the index, Yardstick, Demand, Data, Verdict, Orbital) are not.

## Step 0, before anything else: port the copy-edits into the source

On 5 Nov 2026 these copy-edits were made **directly in the built files** in `blog/ai/`
([PR #28](https://github.com/akarshgopal/akarshgopal.github.io/pull/28), commit `25ef853`, HTML text only). If you
rebuild from `ai-explainer` without porting them, they are lost:

- **Bylines:** "by Akarsh Gopal", not "written for".
- **Page names:**
  - The Price of a Flip, not "the Switch post";
  - Language, not "the Learning post";
  - "page", not "post".
- **No code identifiers in the prose.** `model.js`, `M0`, `WORLD_ELEC_2050`, `Emax`, `U`/`T`, "DERIVED" in capitals,
  "Turyshev-style", `scripts/make_ai_data.py` and `research/raw/...` were rewritten in plain words or removed.
- **Figure tags:** reduced to Data / Model / Data + model, plus Diagram for the pipeline and map diagrams (`dataFlow`,
  `flywheel`, `caseMap`).
- **Notes:** renumbered in reading order on index (was 5b), demand (was 1b), language (started at 24) and yardstick.
- **Typo:** "same.The" in flip §4.

Get the exact text changes with
`git diff 47d4ad7~1 47d4ad7 -- blog/ai` in a clone of `akarshgopal/akarshgopal.github.io`. Apply the same edits in the
source, rebuild, and confirm that the rebuilt HTML matches the live pages on those lines.

## Rules

- **Never invent a number.** Every number in a figure or in the prose comes from a named source or from the series'
  own arithmetic, which must be shown or noted. Mark your own assumptions as such, in words, not code names.
- **Money in US dollars** at US market prices. Europe can be a comparison, not the default.
- **Write in plain British English**, as on the physics pages: no arrows-as-sentences, no variable names, no bullet
  fragments in the prose.
- **Keep the falsifiable framing** (tripwires, a verdict), but move the machinery to the Verdict page.
- **Each figure has one home.** These live on two or three pages today: `ceilingMeter`, `launchCost`, `verdictMeter`,
  and in the short tour `switchAdder`, `rippleAdder` and `turingTape`.

## Tasks, in order

### 1. Re-anchor demand: the biggest gap

- Rebuild **Demand** (today 863 words and one figure) bottom-up:
  - Start from published token volumes. Leads, to be verified against primary sources:
    - Google, I/O 2026: more than 3.2 quadrillion tokens a month, about 7× a year earlier
      (<https://blog.google/innovation-and-ai/sundar-pichai-io-2026/>); about 1.3 quadrillion in Oct 2025.
    - Google's model APIs: about 19 billion tokens a minute.
    - Microsoft's and OpenAI's own disclosures, if any.
  - Convert to energy with Wh per token. Treat prefill and decode separately, because input tokens are far cheaper.
    Anchor on Google's 0.24 Wh median prompt (arXiv:2508.15734) and on the series' own decode model in Scaling.
  - Add the non-chat demand: recommendation, ads and video.
  - **Reconcile** the result with the series' top-down 55 TWh for 2025 (IEA × 15% accelerated × 1.5 × 60%), and show
    the gap. At the series' own 0.24 Wh per ~400 tokens, Google's 3.2 quadrillion a month alone is about 23 TWh a year
    (rough; input tokens make it lower).
  - The index's line "even ten billion prompts a day is under 1 TWh" needs revisiting in the light of this.
- **Put Act 1 and Act 2 on one figure.**
  - Act 1 uses IEA energy (about 93 TWh for all AI in 2025).
  - Act 2 uses Epoch capacity (13.5 → 31.2 GW over 2025; about 116 TWh a year at 60% load).
  - Act 2's 2035 grid ceiling of 316 GW is about 1,380 TWh a year at 50% load; Act 1's Mid path has 486 TWh of
    inference in 2035.
  - Turn capacity into energy (GW × load factor × 8,760 h) and show which world each Act assumes.
- **Add the capex chain:** dollars → GW → TWh.
  - Lead: the four largest hyperscalers guided about $720–745 billion of 2026 capex
    (<https://www.datacentres.com/guides/hyperscaler-capex-trends>); check the company filings.
  - Find a sourced all-in $ per GW: chips, shell, power and cooling.
  - Test Act 2's assumption that capacity growth slows to 26% a year.

### 2. Update the hardware and the money

- **Use the NVL72 rack as the unit on the Factory page.** Leads, to be verified:
  - GB200 NVL72: about 120 kW;
  - GB300 NVL72: about 132–155 kW (Supermicro datasheet, via
    <https://www.wing.vc/content/how-much-does-an-nvidia-nvl72-cost>);
  - Vera Rubin NVL72: about 190–230 kW, reported, not vendor-confirmed.
  - Keep "700 W on a postage stamp" as the opening rung.
- **Extend the roofline chip list** (Parallel) past the B200 (GB300, MI355X, TPU v7, Rubin where published), using
  Epoch's hardware data.
- **Re-price in US dollars:**
  - the Scaling training bill, the Factory idle-cost figure and the short tour's §13;
  - use US wholesale or PPA prices (PJM, ERCOT; the EIA has them);
  - use cloud GPU-hour rental prices rather than a 2023 DGX list price;
  - remove the euro conversions.

### 3. Add one page: what binds, 2026–30

- Rank the constraints with evidence:
  - chips (CoWoS packaging capacity, HBM supply);
  - power (gas-turbine order backlogs, behind-the-meter generation, interconnection queues, transformers);
  - permits;
  - money.
- Link the electricity series for the grid mechanics: `transmission.html` (queues, transformers),
  `transformers.html#shortage`, `price.html`.
- This page carries Act 2 better than launch arithmetic. Keep Orbital as a deep dive, give it one sentence and one
  figure on the index, and stop repeating the 108 GW derivation on three pages.

### 4. Re-ask the question

- The index's first screen should state a plain-English thesis with today's numbers.
- R1–R3 ("largest use of energy by 2050") are answered NO by 70–300× before a reader moves a slider. Keep them on the
  Verdict page as the long-run bookend.
- Lead with a sharper near-term question that the data can actually move, for example AI's share of US electricity
  growth to 2030, or whether AI needs more new US capacity this decade than the grid can add.
- Choose one front door:
  - the short tour, rewritten as the essay;
  - the index becomes its contents page and case map;
  - the short tour stops copying the Rules page's text.

### 5. Smaller items from the review

- In the 3D relay figures (`relayLogic`, `relayCascade`) the labels A, B and "lamp" float far from their parts at
  desktop width; anchor them to the objects.
- Split `verdictMeter` into steps:
  - the one-line model with one slider (tokens per task);
  - then efficiency;
  - then the cap.
- Cards rather than mechanisms (`laborMap`, `dataFlow`, `flywheel`, `dataIndustry`, `regionsTWh`): keep only those
  that bear on energy; make the rest a sentence or a table.
- Off-thesis sections (the Data page's Manhattan Project comparison and labour market; Language's CNN and overfitting
  sections) should either tie to the meter in one sentence or move to a sidebar.

## Checks before each deploy

- Build. Then, in a browser at 1280 and 390 px, check every page:
  - no console errors or failed loads;
  - no horizontal overflow;
  - every `href="#..."` resolves;
  - every figure draws, after opening the collapsed "Look inside" panels.
- Note that three.js canvases cannot be read with `getContext('2d')`. Check them by screenshot, with Chromium
  launched with `--use-gl=swiftshader --enable-webgl --ignore-gpu-blocklist`.
- Links to the electricity series: every `../electricity/...#id` must exist in `blog/electricity/` on `master`.
- Notes are numbered in reading order on every page.

## Deploy

1. Branch from `origin/master` of `akarshgopal/akarshgopal.github.io`.
2. Copy only the built files that changed into `blog/ai/`. Keep the redirect stubs `ai-factory.html`,
   `the-switch.html` and `learning.html`.
3. Commit, open a PR describing the change and the checks, and leave it for the owner to merge unless told otherwise.

## Report back

- Step 0 confirmed (the copy-edits are present after the rebuild).
- The demand reconciliation, as a table: bottom-up against top-down, with the gap explained.
- The single Act 1 / Act 2 figure.
- What changed on each page.
- The check results, and the PR link.

If the reconciliation changes the Mid verdict, say so plainly rather than recalibrating to keep it.
