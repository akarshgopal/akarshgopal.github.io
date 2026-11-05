# Review of the AI series against Ciechanowski, SemiAnalysis and top-tier bloggers

Written 5 Nov 2026. Covers *Can AI outgrow the planet's power grid?* as live on `master` (`blog/ai/`, last refreshed from
`ai-explainer`, whose source is not in this repo). I read all 14 pages, about 34,000 words. I looked at every one of the
65 desktop figure screenshots and opened every collapsed panel; I spot-checked phone views. The live pages have no
console errors, overflow or dead links (see the 4 Nov browser check). No code or text was changed.

## The three bars, made concrete

- **Bartosz Ciechanowski** (*Airfoil*, *Mechanical Watch*, *GPS*):
  - build from the simplest model;
  - one idea and one control per figure, and you drag the thing itself;
  - intuition before the term;
  - motion *is* the explanation;
  - one visual language throughout;
  - almost no numbers that a figure doesn't make inevitable.
- **SemiAnalysis** (Dylan Patel et al.):
  - current hardware, priced;
  - bottom-up models (tokens → FLOPs → GPUs → MW → $);
  - the supply chain as the binding constraint (CoWoS, HBM, power, transformers, turbines);
  - US market prices;
  - numbers reconciled across sources, and a view that could be wrong.
- **Top-tier bloggers** (Brian Potter's *Construction Physics*, Epoch's *Gradient Updates*, Gwern, Dwarkesh):
  - one sharp question answered in a human voice;
  - original analysis rather than a compilation;
  - every number earns its place;
  - the reader knows the thesis by the end of the first screen.

## Verdict

**Two series are sharing one roof.** The physics-and-ML half (Rules, The Price of a Flip, Parallel, A Model, Language)
is at or near Ciechanowski's bar and in places above it. It builds from two lamps to a transformer. You drag the gate,
the line, the query arrow, the weights. A real 252k-weight transformer is trained on *Alice* and set against n-gram
counts. These are the best pages on the site.

**The thesis half (the index, Yardstick, Demand, Data, Verdict, Orbital) does not yet meet any of the three bars:**

- **Against SemiAnalysis:** it is anchored on 2023 hardware and 2024 numbers, in late 2026, and the two Acts use
  anchors nobody has reconciled.
- **Against the bloggers:** the voice is a legal brief (R1/R2/R3, M0, tripwires, YES/NO/UNRESOLVED), and the
  question it answers is one whose answer is obvious (NO, by 70–300×).
- **Against Ciechanowski:** the meters are dashboards, with five sliders, presets and three verdict boxes.

The fix is mostly *re-asking the question* and *re-anchoring the numbers*, not more figures.

## SemiAnalysis bar: the substantive gaps

1. **Demand is not modelled bottom-up, and the public token data now argues with the anchor.** Act 1 rests on 55 TWh
   of inference in 2025, derived top-down (IEA × 15% accelerated × 1.5 × a secondary 60% inference share). The index
   says ten billion prompts a day is "under 1 TWh". But Google reported processing 3.2 quadrillion tokens a month at
   I/O 2026, up about 7× in a year ([Shacknews](https://www.shacknews.com/article/149205/google-3-2-quadrillion-monthly-ai-tokens),
   [Google](https://blog.google/innovation-and-ai/sundar-pichai-io-2026/?ref=t01.li)).
   - At the series' own conversion (0.24 Wh per ~400-token prompt) that is about 23 TWh a year for Google alone, on
     my arithmetic. Input tokens are cheaper than output tokens, so the true figure is lower, but the order of
     magnitude matters.
   - It is two-fifths of the series' world anchor, from one company, growing 7× a year.
   - The Demand page, which sets the decisive sliders, is the thinnest page in the series: 863 words, one figure.
   - **Rebuild it:**
     - start from published token volumes (Google, Microsoft, OpenAI API);
     - convert them with measured or modelled Wh per token (prefill and decode separately);
     - add recommendation, ads and video;
     - reconcile the result with the IEA top-down figure. Show the gap; the gap *is* the analysis.
2. **The Acts use unreconciled anchors.**
   - Act 1 uses IEA energy: about 93 TWh for all AI in 2025, 55 TWh of it inference.
   - Act 2 uses Epoch capacity: 13.5 → 31.2 GW over 2025. At a 60% average load that is about 116 TWh a year (my
     arithmetic).
   - Act 2's default 2035 ceiling (316 GW) at a 50% load is about 1,380 TWh a year. Act 1's Mid path has 486 TWh of
     inference in 2035.
   - A reader will ask which world the series believes. One figure is needed that turns capacity into energy
     (GW × load factor × hours) and puts both Acts on it.
3. **Capex is missing.** The four largest hyperscalers guided roughly $720–745 billion of 2026 capex, mostly AI
   ([datacentres.com](https://www.datacentres.com/guides/hyperscaler-capex-trends),
   [Yahoo Finance](https://finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html)).
   Dollars → GW (all-in $/GW for chips, shell, power and cooling) → TWh is the chain SemiAnalysis readers expect. It
   tests Act 2's assumption that growth slows to 26% a year, which looks low against 2026 spending.
4. **The hardware is one generation stale.**
   - The H100 (2022) is the unit on every page.
   - Blackwell racks are mentioned once: GB200 NVL72 at about 120 kW, GB300 NVL72 at about 132–155 kW
     ([Wing](https://www.wing.vc/content/how-much-does-an-nvidia-nvl72-cost),
     [Spheron](https://www.spheron.network/blog/nvidia-mgx-1-2-explained-what-250kw-open-racks-mean-for-gb300/)).
   - Rubin racks are reported at about 190–230 kW, and the Kyber rack at about 600 kW for 2027
     ([2CRSI](https://2crsi.com/nvidia-from-blackwell-to-rubin-platforms-power-and-cooling); not vendor-confirmed).
   - The roofline's chip list ends at the B200, with no GB300, MI355X, TPU v7 or Rubin.
   - Re-anchor the Factory page on an NVL72 rack. The "700 W on a postage stamp" opening still works as the first rung.
5. **The prices are European and the market is American.**
   - The Scaling bill, the Factory idle-cost figure and the short tour price electricity at €100/MWh and convert the
     chip to euros, while the IEA puts the US at 45% of data-centre demand and the electricity series is in dollars.
   - Use US wholesale or PPA prices (PJM, ERCOT) in dollars.
   - Cloud GPU-hour rental prices are a better unit than a 2023 DGX list price.
6. **The supply chain appears only as a footnote.** CoWoS packaging, HBM allocation, gas-turbine backlogs,
   behind-the-meter generation, transformer lead times and interconnection queues all decide whether the grid "can".
   Each gets a sentence and a link to the electricity series. One page, *What actually binds in 2026–30*, ranked with
   evidence, would carry Act 2 far better than orbital launch arithmetic.
7. **Orbit gets more space than it earns.**
   - Act 2's own answer is that 100× by 2035 fits on the grid.
   - Three pages repeat the 108 GW derivation and the launch-cost floor (index, Orbital, Verdict).
   - Keep Orbital as a deep dive; on the index, one sentence and one figure are enough.

## Top-tier blogger bar: voice and structure

1. **Lead with a question worth asking.**
   - "Will inference be the largest use of energy by 2050?" is answered NO on every rung, at 70–300×, before the
     reader moves a slider.
   - The live questions are nearer and sharper:
     - Will AI need more new US capacity this decade than the grid can add?
     - What share of US electricity growth to 2030 is AI?
     - Who pays for it?
   - Keep R1–R3 as the long-run bookend on the Verdict page, not the front door.
2. **Remove the machinery from the prose.**
   - Code and spreadsheet identifiers reach the reader: `model.js`, `M0`, `WORLD_ELEC_2050`, `U`, `T`, `Emax`,
     "DERIVED" in capitals, "Turyshev-style", `scripts/make_ai_data.py`, `research/raw/notable_ai_models.csv`.
   - Note numbers read "1b" and "5b".
   - There are arrows-as-sentences ("→ need P = …") and bullet fragments on Yardstick, Orbital, Demand and Verdict.
   - The physics pages show that the same author can write plain, fluent English.
3. **Bylines and names.**
   - Every page says "written for Akarsh Gopal", which reads as commissioned or ghost-written; the electricity series
     says "by Akarsh Gopal".
   - Pages are still called by their old names: "The Switch post", "the Scaling post", "the Learning post", "The
     Parallel post", "The Price of a flip".
   - "Post", "page", "deep dive", "Act 2", "the ledger" and "examples and caps" all label the same kind of thing.
4. **Three front doors repeat each other.**
   - The index (meter + case map), the short tour (5,400 words, 15 figures) and the Verdict page each restate the
     thesis.
   - The short tour copies the Rules page's text and three of its figures.
   - Six figures appear on two or three pages: `ceilingMeter` ×3, `launchCost` ×3, `verdictMeter` ×2, and
     `switchAdder`, `rippleAdder` and `turingTape` ×2.
   - Pick one door, the short tour rewritten as the essay, and make the index its contents page.
5. **Drift from the question.** Parts of the Data page (the Manhattan Project comparison, the labour-market section)
   and the CNN and overfitting sections of Language are good writing that does not bear on energy. Either tie each to
   the meter in one sentence or move it to a sidebar.

## Ciechanowski bar: figure craft

**At the bar:**
- `switchAdder` → `rippleAdder` → `turingTape`;
- `mosfet` (3D, Peek planar → FinFET → GAA) with `mosfetLog`;
- `darkSilicon`;
- `litho` (wavelength and NA against the k₁ floor) and `yieldDie`;
- `systolic` and `latencyHiding`;
- `precisionBits`;
- `xorLine` → `twoLayers` → `backpropFlow` → `sgdValley`;
- `convFilter`, `rnnMemory`, `qkv`;
- `tinyVsNgram`, a real model and the standout of the series;
- `powerLaw` and `threeKnobs`;
- `coolantFlow` and `mwhFlow`.

**Below it:**
- **The meters.** `verdictMeter` has five sliders, three presets, three verdict cards, a log bar and a path chart.
  Ciechanowski would split it: first the one-line model with one slider (tokens per task), then efficiency, then the
  cap.
- **Cards rather than mechanisms.** `laborMap`, `dataFlow`, `flywheel` and `caseMap` are diagrams with tap-to-read
  text. `dataIndustry` is a revenue chart; `regionsTWh` is a context chart. Each could be a sentence or a table.
- **The 3D relays.** In `relayLogic` and `relayCascade` the labels A, B and "lamp" float far from the parts they name
  at desktop width. Anchor the labels to the objects.
- **Small defects:**
  - `syncSwing` has no unit on its y-axis (MW);
  - a missing space in The Price of a Flip §4 ("same.The industry's");
  - Language's first citation is note 24, so notes are not numbered in reading order.
- **Twenty different figure tags.** "Physics + DERIVED", "Real data + cited rule of thumb", "Published figures,
  derived", "Measured + estimates", and so on. The electricity series uses three: Data, Model, Data + model. Unify
  them.

## What to do, in order

1. **Re-ask the question and re-anchor demand.** This is the SemiAnalysis-grade fix and the biggest one.
   - Rebuild Demand from published token volumes.
   - Reconcile them with the IEA's top-down figure.
   - Add the capex → GW → TWh chain.
   - Make the index's first screen a plain-English thesis with today's numbers.
   - Move R1–R3 to Verdict.
2. **Update the hardware and the money.**
   - Use NVL72 racks, with Rubin as reported.
   - Extend the roofline chip list.
   - Price in US dollars at US market prices, with GPU-hour rental prices.
3. **Add a page on what binds in 2026–30**, ranked: chips (CoWoS, HBM) → power (turbines, interconnection,
   transformers) → permits → money. Link the electricity series for the grid mechanics.
4. **Copy-edit.** Fix the bylines and page names, remove code identifiers from the prose, use three figure tags,
   convert € to $, renumber the notes, and fix the typo and the `syncSwing` axis.
5. **Cut the repetition.** Give each figure one home, choose one front door, and give orbit one page.
6. **Keep the physics and ML deep dives as they are.** At most, swap the H100 for an NVL72-era example where a
   number is quoted.

These changes belong in the `ai-explainer` source, which this repo does not hold. Patching the built `blog/ai/` pages
by hand, as earlier AI fixes did, works for the copy-edits in step 4 but not for steps 1–3.
