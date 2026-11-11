# RESTRUCTURE — a thesis-led series: "Will AI inference become humanity's largest energy expenditure component?"

Proposal only; no page changed. Revised 23 Oct 2026 (v2; v1 was commit 9630682, question-led around "Wh per answer"). Written against HEAD 26cd6d3. Effort is in focused days, on the scale of CIECH-GAP.md.

Feedback so far: (1) the main essay is a condensed copy of the series; (2) depth is uneven; (3, new) the central question should be a falsifiable thesis: **"Will AI inference become humanity's largest energy expenditure component?"**

What this changes: the series stops *explaining* AI and starts *trying a case*. Every page opens with a sub-question, ends by moving one assumption slider, and the last page is a verdict that can be wrong. The v1 depth device (stack ruler + peek drawers) stays, re-prioritised by what the verdict needs. The v1 "0.24 Wh per answer" number is no longer the destination; it becomes the calibration anchor for the ledger.

---

## 1. The thesis, operationalised

### 1.1 What "largest energy expenditure component" can mean

The phrase hides three choices. Each was checked against numbers (section 1.4).

| Choice | Options | Consequence |
|---|---|---|
| **A. Energy of what?** | (a) electricity only; (b) final energy (what end-users consume, ~450 EJ); (c) primary energy (what is extracted, ~600 EJ) | On (c) a TWh of fossil-generated electricity costs ~2–2.5 TWh of primary, so (c) flatters or punishes AI depending on the grid. (b) is the cleanest apples-to-apples. |
| **B. Largest what?** | (i) share of an aggregate (e.g. ≥10% of global electricity); (ii) largest *sector* (industry 38%, transport 28%, buildings 28% of final energy); (iii) largest *single end-use* (e.g. buildings heating, road transport, industrial heat, space cooling) | (ii) is a category error: AI is one use, industry is a sector. (iii) is the honest reading of "component". |
| **C. Whose meter?** | at the data-centre meter (incl. cooling and power conversion), versus chip-only, versus lifecycle (chips' embodied energy), versus on-device (phones) | Needs a boundary; otherwise the thesis can be argued either way. |

"Expenditure" is read as energy, not money. (Money is a sensitivity on the Demand page, not the yardstick.)

### 1.2 Recommended operationalisation

**Metric M.** Annual electricity used by AI *inference*: serving trained models to users and agents. It is measured at the data-centre meter, so it includes host CPUs and memory, idle reserved capacity, networking, cooling and power conversion (Google's "comprehensive" boundary, the one that gave 0.24 Wh). It excludes training, fine-tuning and data preparation, and on-device inference. Embodied energy of chips is a labelled sensitivity.

**Thesis T\*** (the literal question, made falsifiable):

> **By 2050, M exceeds every other single end-use of final energy.**
> Bar today: at least **62 EJ ≈ 17,200 TWh per year** (space and water heating in buildings, 2021, IEA). The real bar is whichever end-use is largest in 2050; step 0 pins it from the IEA end-use data.

Because a 2050 verdict cannot be checked for 24 years, T\* is paired with two rungs the series can check against data much sooner. All three share one metric and one boundary:

| Rung | Claim | Horizon | Bar | Reading |
|---|---|---|---|---|
| **R1: milestone** | M ≥ 10% of global electricity | 2035 | ≈ 3,800 TWh (10% of ~38,000; the IEA's Lift-Off case puts *all* data centres at 1,700 TWh = 4.4%, so this implies a ~2.2× larger figure than that case, for inference alone) | The earliest checkable signal, and the first thing the IEA's annual update will confirm or kill. |
| **R2: largest electricity end-use** | M exceeds the largest other single electricity end-use | 2050 | Space cooling ≈2,900 TWh (2025) +1,600 by 2035 (IEA commentary 10 Jul 2026); tracking: more than double by 2050 with no action → ≳5,800. **Working bar 6,000 TWh** (cooling-class). Free WEO tables lack one “largest end-use” cell; industrial motor systems ≈10,400 TWh (2023, IEA-4E) span many end-uses and are not the bar. | The version most people mean. Working bar labelled; not a single WEO cell. |
| **R3 = T\*: largest end-use of all final energy** | M > any other end-use, fuels included | 2050 | ≥ 17,200 TWh (≈ 14% of today's 450 EJ final energy) | The literal reading. |

**Verdict states.** YES = the rung's bar is met or exceeded in the central estimate *and* the lower bound of the stated range is within 2× of the bar. NO = the upper bound of the range is below the bar. Otherwise **UNRESOLVED**, and the ledger says which assumption would resolve it. There is no "it depends".

**Tripwires** (observable earlier, to be written into the final page so the thesis can be marked later):
- 2030: M ≥ 300 TWh and still growing > 25%/yr. Below 200 TWh by 2030 → R2 and R3 are effectively dead.
- 2035: M ≥ 1,000 TWh *and* growth still > 20%/yr. If 2035 growth has decayed below ~10%/yr, R3 cannot be recovered: from 2035 the catch-up growth needed is 21–28%/yr (see 1.5).
- Any year: if a year's IEA data-centre growth drops below 8%/yr, saturation has started.

### 1.3 The honest verdict

**NO on R3 and on R1; R2 unlikely but not absurd.** These are my judgement, not forecasts, and they are labelled as such in the series:

- **R1 (≥10% of global electricity by 2035): very unlikely (≲ 3%).** It needs inference alone at ~2.2× the IEA's whole-data-centre Lift-Off figure, and ~3× its Base Case total (1,200 TWh).
- **R2 (largest electricity end-use by 2050): unlikely (≈ 5–10%).** It needs ~6,000 TWh: ~110× today's inference, a 20.6% yearly compound growth sustained 25 years. It is not physically excluded.
- **R3 (largest end-use of all final energy by 2050): very unlikely (≲ 1%).** It needs 17,200 TWh: ~310× today, a 25.8%/yr compound for 25 years, equal to ~60% of *all* electricity generated today and ~1,770 kWh per person per year (2050 population ~9.7 bn) on inference alone. That is about half of today's global per-person electricity use (28,200 TWh / ~8.2 bn ≈ 3,440 kWh), spent only on inference.

Why the near-term data cannot decide it: a constant 25.8%/yr path puts M at ~560 TWh in 2035. That is *below* the IEA's Lift-Off case. So 2025–2035 data can say that the path is on track or not, not that T\* is true. The thesis lives or dies on whether growth decays after 2035. That is where the economics and the "other sinks" matter most, and the series should say so.

### 1.4 The numbers behind this (verified 23 Oct 2026)

| Quantity | Value | Source |
|---|---|---|
| Data-centre electricity 2025 | **485 TWh**, +17% on 2024; AI-focused data centres +50% in 2025 | IEA, *Key Questions on Energy and AI* (2026): iea.org/reports/key-questions-on-energy-and-ai/executive-summary |
| Data-centre electricity 2024 | 415 TWh = 1.5% of global electricity | IEA, *Energy and AI* (Apr 2025), iea.org/reports/energy-and-ai/energy-demand-from-ai |
| Data-centre outlook | 950 TWh in 2030 (~3% of electricity; AI-focused data centres triple). 2035: Base ~1,200; **Lift-Off >1,700 (4.4%)**; High-Efficiency ~970 (2.6%); Headwinds ~700 (<2%) | same two IEA sources |
| Share that is "AI" | Accelerated servers: 15% of data-centre electricity, 24% of server electricity, 2024. IEA says the AI share is uncertain and uses accelerated servers as a proxy | IEA, *Energy and AI*, ch. 2 (PDF) |
| Share that is inference | ~60% of AI energy at Google (rest training, fine-tuning); a common planning figure | arXiv 2509.07218 (a review citing Google's reported split). **Secondary source; flagged.** |
| **Inference today (derived)** | 0.15 × 415 TWh × 1.5 (AI-data-centre growth in 2025) × 0.60 ≈ **~55 TWh**, i.e. ~0.2% of global electricity and ~0.03% of primary energy. A wide uncertainty band (about 40–80 TWh) | my arithmetic from the rows above; **an estimate, labelled** |
| Global electricity demand | **28,200 TWh** (2025, IEA, +3%); 33,600 TWh forecast for 2030. Ember reports 31,779 TWh for 2025 because it counts gross generation including grid losses | IEA *Electricity 2026*, iea.org/reports/electricity-2026/demand; Ember *Global Electricity Review 2026* |
| Electricity as share of final energy | 21% in 2025, 24% in 2030; ~25% by 2035 (STEPS) | IEA *Electricity 2026*; *WEO 2025* |
| Global primary energy | **600.3 EJ** in 2025 (≈ 166,800 TWh), +1.7% | Energy Institute *Statistical Review of World Energy 2026* (now labelled "Total Energy Supply") |
| Global final energy | **~450 EJ** in 2024 (≈ 125,000 TWh): industry 38%, transport 28%, buildings 28% | IEA *WEO 2025*, ch. 4.3 (PDF) |
| Space cooling | **~2,900 TWh** in 2025 (~10% of electricity, ~30% of peak demand), +50% since 2015; +1,600 TWh by 2035 under current policies. Data-centre cooling (80 TWh) is separate | IEA commentary, 10 Jul 2026, iea.org/commentaries/cooling-a-hotter-world-el-nino-meets-strong-growth-in-global-electricity-demand |
| Space + water heating in buildings | **62 EJ** in 2021 (about half of buildings energy), ≈ 17,200 TWh | IEA, *The Future of Heat Pumps* (2022), §1.2 — **verified against primary PDF (26 Oct 2026).** |
| Energy per prompt | Median Gemini Apps text prompt **0.24 Wh** (May 2025): 0.14 accelerator, 0.06 host CPU and DRAM, 0.02 idle, 0.02 overhead. The narrow, accelerator-only method gives 0.10 Wh. 33× lower than a year earlier. "Not independently verified." | Google, arXiv 2508.15734 and the Google Cloud blog, 21 Aug 2025 |
| Efficiency trend | Energy per AI task "dropping by at least an order of magnitude annually", but reasoning, agents and video use "hundreds or thousands of times" more per task. B200 is 60% more FLOP/W than H100, which is 80% more than A100 | IEA *Key Questions on Energy and AI*; IEA *Energy and AI* (citing Epoch AI) |
| Share of growth | Data centres: <10% of global electricity-demand growth 2024–30 (Base); ~50% of US growth; 6–10% in China and the EU. Over 85% of new capacity in the US, China and the EU | IEA *Energy and AI*; *WEO 2025* |
| US cross-check | 176 TWh in 2023; 325–580 TWh by 2028 (6.7–12% of US electricity) | LBNL (Dec 2024), eta-publications.lbl.gov |

**What could not be verified this turn:** the IEA electricity split by sector (so I use only cooling and the totals); the 2050 global-electricity figure (my working assumption is ~60,000 TWh, ~2× today, labelled as assumption; step 0 reads it from the WEO 2025 free dataset); the Google 60/40 split except through the review above. Energy-Charts data is not used (private-use only).

### 1.5 What would have to be true for YES (the "what must be true" panel)

Numbers are the metric M on the Section 1.2 boundary.

| Rung | Needs by year | Multiple of today | Constant net growth needed | In prompts |
|---|---|---|---|---|
| R1 | 3,800 TWh, 2035 | ~69× | 52%/yr for 10 yr | n/a |
| R2 (provisional bar) | ≳ 6,000 TWh, 2050 | ~107× | 20.6%/yr for 25 yr | ~11,000 median prompts per person per day *at today's 0.24 Wh*; ~110,000 if energy per prompt falls 10× |
| R3 | 17,200 TWh, 2050 | ~310× | 25.8%/yr for 25 yr | ~20,000 median prompts per person per day at 0.24 Wh (7 × 10^16 a year); ~200,000 with 10× efficiency |

Continuous power: R3 is ~1,960 GW of average draw (the IEA expects all data centres at ~225 GW of capacity in 2030). If hardware efficiency keeps improving 40%/yr (its recent pace), *useful work* has to grow ~76%/yr, about 10^6× over 25 years, just to leave energy growing 26%/yr. Only agents (machines asking machines) can supply that demand; humans cannot. So the thesis reduces to one question: **does demand for machine-generated tokens keep outrunning efficiency, and can power, chips and cooling be built in time?** Everything below is built around that.

Scenario shape used for the first ledger draft (growth paths calibrated to ~56 TWh in 2025; *illustrative, not forecasts*):

| Path | Net growth to 2030 / 2035 / 2050 | M, 2035 | M, 2050 | M as % of bar |
|---|---|---|---|---|
| Low (efficiency + saturation) | 12% / 4% / 1% | ~120 TWh | ~140 TWh | R3: 1% |
| Mid (IEA Base-consistent) | 30% / 15% / 6% | ~420 TWh | ~1,000 TWh | R3: 6% |
| High (Lift-Off-consistent) | 42% / 15% / 10% | ~650 TWh | ~2,700 TWh | R3: 16% |
| What-must-be-true (R3) | 26% flat | ~560 TWh | 17,200 TWh | 100% |

The Mid 2030 value (~210 TWh) is built to match the IEA Base Case, where accelerated servers grow ~30%/yr.

---

## 2. The case: necessary conditions for YES, forces for NO

The dependency map becomes a **case map**: a node is a condition or a force, and an edge says "this must hold for YES". Each node has a page that explains it, a slider on the ledger that quantifies it, and a state that colours it (holds / contested / fails) as the reader visits.

| # | Condition for YES (all needed) | Evidence the series presents | Page | Slider |
|---|---|---|---|---|
| Y1 | **Demand grows** by orders of magnitude: more users, more prompts per user, then agents asking agents, and more tokens per task (reasoning, long context, video) | 1.2 bn weekly OpenAI users; IEA: agentic tasks use "hundreds or thousands" of times more per task; tokens per task as a ladder | **Demand** (new) | users, tasks/day, tokens-per-task multiplier |
| Y2 | **Efficiency is outrun** (Jevons): per-token savings are spent on more tokens | Google 33× in a year vs total data-centre growth +17%; IEA order of magnitude per task per year; the series' own tokensPerParam and sgdValley data | Demand, Parallel, Scaling | efficiency %/yr and its decay |
| Y3 | **Supply is built**: power (GW), chips (packaging, HBM), grid connection, cooling and water | IEA: ~225 GW data-centre capacity in 2030; queues, transformers (electricity series); 55% of the data-centre pipeline is larger than 200 MW each (IEA WEO 2025); five hyperscalers' capex >$400 bn in 2025 | **Factory**; Parallel (chips) | supply cap in GW, overhead (PUE) |
| Y4 | **Economics** hold: willingness to pay at least covers the cost of the tokens, and electricity stays cheap enough | Revenue per token vs cost per token; electricity is a small share of cost per token today, which is why it is not the binding constraint yet; $/kWh from the electricity series | Demand; Factory | $/token, $/MWh |

| # | Force for NO (any one is enough) | Evidence | Page | Slider |
|---|---|---|---|---|
| N1 | **Efficiency wins**: MoE, quantisation, distillation, caching, better chips each generation | B200 +60% FLOP/W over H100 (+80% over A100); IEA High-Efficiency case −15%+; MoE activates a fraction of weights | Parallel; Scaling | efficiency %/yr |
| N2 | **Saturation**: human attention caps prompts per day; growth must then come from agents, which need a use that pays | humanShare (1 comparison in ~1,800 tokens), dataWall; demand ceiling per person | Demand; Data | prompts/day cap |
| N3 | **Other sinks grow too**: cooling +1,600 TWh by 2035, EVs, heat pumps, industry. The bar moves | IEA: data centres <10% of 2024–30 demand growth; electricity 21%→~25% of final energy | **Yardstick** (new) | benchmark growth |
| N4 | **Physical limits**: Landauer (kT ln 2 ≈ 2.9 × 10⁻²¹ J at 300 K), the end of Dennard scaling, the memory wall; energy per useful op stops falling | joulesPerOp; flipEnergy; dennard; the HBM ladder | **Price of a flip**; Parallel | efficiency floor |
| N5 | **The grid**: interconnection queues, transformers, transmission take years; load concentrated in a few clusters | IEA WEO 2025: ~20% of projected data-centre additions by 2030 could be at risk of delay (grid, transformers, cables, turbines); US data centres ≈ half of US growth to 2030 | Factory; electricity series | supply cap in GW |
| N6 | **Wildcards that cut both ways** (shown, not slidered): on-device inference moves load off the meter; AI-for-efficiency saves energy elsewhere; a demand shock (AI winter) | Headwinds case (~700 TWh) | Verdict | scenario switch |

**The honest reading of the map.** N3 and N4 do the heaviest work against the thesis: the bar is 17,200 TWh, an end-use ~60% the size of the world's whole electricity supply today. Y1 and Y2 are the strongest legs for YES: the cost of a unit of "intelligence" is falling by about 10× a year, and demand elasticity is the whole question. Y3 and Y4 decide *when*, more than *whether*.

Case map (arrow = "feeds this verdict"):

```
 Yardstick ── the bar (N3) ─────────────────────────────────────────────────────┐
 Rules ► Price of a flip ── physical floor (N4) ──► Parallel ── efficiency (N1) ─┤
 Model ► Language ── what one token costs (unit of the ledger) ──► Scaling ──────┤──► VERDICT
                         Data ── saturation vs synthetic data (N2) ─────────────┤   (ledger:
                         Demand ── users, agents, Jevons, willingness to pay ───┤    low / mid / high)
                         (Y1, Y2, Y4, N2) ──► Factory ── power, chips, grid, ───┘
                                               cooling (Y3, N5, Y4 electricity price)
```

---

## 3. Page list and order (v1 list reused; changes flagged)

Each page opens with a sub-question and closes by setting one slider on the index ledger (the reader sees it move).

| # | Page | Opens with the sub-question | Feeds verdict | v1 → v2 |
|---|---|---|---|---|
| 0 | **The thesis** (index) | "Will AI inference become humanity's largest energy expenditure component?" Verdict meter, sliders, case map | whole case | **Changed**: question and meter replaced, summary removed |
| 1 | **The yardstick** | "How big is the bar, and how fast is it moving?" A Sankey of 600 EJ primary → 450 EJ final → sectors → electricity → data centres, with cooling, heating, transport and industry as bars to beat; the three rungs | N3; sets the bar | **New** (short page). Reuses mwhFlow and regionsTWh. Links to the electricity series. |
| 2 | **Rules**: switch, gate, adder, program | "What is a computation, physically?" | N4 base | v1 #1, unchanged |
| 3 | **A model is a function you can tune** | "What are we paying to compute: what is a model?" | unit of work | v1 #2 |
| 4 | **Language**: tokens to next word | "What does one answer cost, in operations?" (FLOPs per token ≈ 2 × active parameters) | Y1/Y2 unit | v1 #3 |
| 5 | **The price of a flip** | "How cheaply could an operation ever be done?" Landauer gap, Dennard, joules per op | N4, N1 | v1 #4, **moved after Language in v1; stays here** |
| 6 | **Parallel** | "Why did efficiency keep improving 1.4–1.6× a generation, and when does it stop?" | N1, N4, Y3 chips | v1 #5 |
| 7 | **Scaling** | "What do bigger models and reasoning do to the cost of an answer?" Includes serving (KV cache, memory-bound decode), MoE | Y2, N1 | v1 #6 |
| 8 | **The data** | "Does the supply of human examples cap demand, or can machines make their own?" | N2 | v1 #7, **demoted to an optional branch**: the map greys it; the verdict does not depend on it. Candidate to fold into Scaling at 1,000 words. |
| 9 | **The demand** | "Who is asking, how often, and does cheaper mean more?" Tokens per task ladder (chat → reasoning → agent → video), Jevons figure, price per token vs willingness to pay | Y1, Y2, Y4, N2 | **New** (the big gap in v1: the series explained *supply* of compute and not *demand*) |
| 10 | **The factory** | "Can the world build the power, chips and cooling for the demand?" Power chain, grid, cooling, electricity price. Links the electricity series (transformers, transmission, cheap kWh) | Y3, N5, Y4 | v1 #8, unchanged plus the supply cap slider |
| 11 | **The verdict** | "What does the ledger say, and what would change it?" Scenario ledger (below) | resolves all | v1 #9 "The answer" → **Changed** from a Wh-per-answer ledger to a scenario ledger |

Total 12 pages (v1: 10). History thread and bridges stay as in v1. The **Demand** and **Yardstick** pages are the only genuinely new reading; everything else is existing content moved, split or re-aimed. Splits (Learning → Model + Language; Scaling → Scaling + Data) and anchors are as in v1: step 2 includes a full linkcheck.

### The electricity series: where it links in
Back-links in this order, all **pending your OK** and a notice to Code Monkey, as before. Yardstick → solar, utility renewables, the "Why is electricity cost what it is?" main essay (for the end-use bar and what a TWh costs). Factory → transformers, transmission. Demand and Verdict → the cheap-$/kWh synfuels post (Y4). The AI series would only link *out*; nothing in the electricity repo is touched without the approval.

---

## 4. The index: a live verdict, not a prompt

**First screen.** A single large meter: *"Inference energy in 2035 / 2050 vs the bar"*, as a log-scale bar chart that spans 50 TWh to 20,000 TWh. It shows M (a band, not a line), the three rung bars (3,800; ≈6,000; 17,200) and today's 56 TWh. A verdict chip reads **NO / UNRESOLVED / YES** per rung. A one-line "to make this YES, set…" button solves for the missing assumption (for example: "efficiency gain must fall below 4%/yr" or "agents must make 400 tasks a day per person").

**Sliders** (five, one per section of the case; ranges and defaults carry a source tag; tap the chip to see why):
1. users and tasks per day (Y1; today's 1.2 bn weekly OpenAI users);
2. tokens per task, the agent and reasoning multiplier (Y1/Y2; IEA "hundreds to thousands");
3. efficiency gain per year, with a decay half-life (N1/N4; hardware 1.4–1.6× a generation, software up to 10× a year on a fixed task, but falling);
4. supply cap in GW (Y3/N5; ~225 GW data centres in 2030, Base Case);
5. benchmark: the bar and its growth (N3).

The slider model is simple on purpose: E(year) = users × tasks × tokens-per-task × Wh-per-token(year) × overhead, calibrated to the 2025 anchors (56 TWh derived; 0.24 Wh per median prompt) and showing its residual against IEA's Base Case, so a reader sees the model agree with the IEA at the defaults. **Each page unlocks and informs its slider**: before a page is read its slider sits at a labelled default; after it, the slider shows the range the page argued.

**Case map** below the meter: the section 2 graph as a canvas; nodes tint (holds / contested / fails) from the slider settings, and visited pages are marked. A tap shows a one-line "this matters because…". It is a figure, so it follows the series' touch and file:// rules.

**No summary.** Three short paragraphs on why this is a thesis, how to read it, and a "start with the yardstick" path.

### Resolving on the last page: the scenario ledger
Page 11 is a table-and-figure, not an essay:
- **Low / Mid / High** columns for 2035 and 2050, each showing M (TWh), M as a share of electricity, final energy and primary energy, and the verdict per rung.
- **Assumptions labelled** per column (users, tasks, tokens, efficiency, supply cap, bar), each tagged *measured*, *IEA scenario*, *derived* or *my assumption*.
- **Sources cited** inline, as in section 1.4, with the "not verified" ones flagged.
- **Honest uncertainty**: ranges, not points; a plain statement of what the model leaves out (on-device inference, embodied energy, AI that saves energy elsewhere) and of what would change the verdict. The "what would flip it" is the tripwire list.
- A closing "mark this later" box: the 2030 and 2035 tripwires from section 1.2, with the sources to check them against (IEA annual update, Ember, Energy Institute).

---

## 5. Depth: stack ruler and peek drawers (kept from v1)

The audit and the device are unchanged: ruler H0 (grid) … H10 (silicon) and S0 (answer) … S7 (training loop); "↓ look inside" drawers closed by default, one control, ≤120 words, a shared `peek()` helper; the 3D zoom (die → hall) is the ruler's own figure; the cut-open transistor is the H9 peek. What changes is *priority*, based on which peeks move a number in the ledger.

**Peeks that matter most for the thesis (build first):**

| Peek | Level | Why it moves the verdict | Effort |
|---|---|---|---|
| **Landauer gap**: how far a real FLOP is from kT ln 2 (extends joulesPerOp) | H9 / H7 | N4: sets the efficiency floor slider | 1 |
| **Memory ladder** registers → SRAM → HBM (pJ per byte, bytes per second) | H5–H6 | N1/N4: decode is memory-bound; why energy per token does not fall with FLOP/W | 1 |
| **Serving**: KV cache, batching, memory-bound decode | S1 | Y2: the unit of the ledger (Wh per token) and why utilisation matters | 1.5 |
| **Mixture of experts** | S3 | N1: active parameters vs total | 1 |
| **Transformer block** assembled (embed → attention → MLP → unembed) | S3 | the "2 × active parameters FLOPs per token" rule | 1.5 |
| **Power chain** grid → transformer → UPS → PSU → VRM → die | H0–H3 | Y3: overhead (PUE) and the supply cap | 1 |
| CMOS NAND from transistors (C·V² per flip) | H8–H9 | N4: ties the price of a flip to voltage | 0.75 |
| MFU and parallelism strategies | S4–S5 | idle capacity (Google: 10% of the 0.24 Wh) | 2 |

**Peeks that matter less for this thesis (defer):** autograd (training, not inference), ALU, fetch–decode–execute, memory cell, tokenizer, sampling, kernel tiling, SM and warp, NVLink vs fat-tree, rack optics. They remain good depth; they just do not move a ledger number. The cut-open transistor (3.5 d) is valuable for the story of the end of Dennard scaling (N4); keep it, but after the thesis-critical set.

---

## 6. Revised build order and effort

| Step | Work | Days |
|---|---|---|
| 0 | **Number pass**: pin the 2050 bar (largest end-use) from the IEA end-use database and WEO-2025 dataset; re-check the 62 EJ heating figure; fix the global-electricity 2035/2050 path; settle the inference share and the 2025 anchor; write the sources table into the repo | 1.5 |
| 1 | **Depth infrastructure**: `peek()` helper, stack ruler, `data-level` tags (as v1) | 3 |
| 2 | **Reshape**: split Learning and Scaling, create Rules, add shells for Yardstick and Demand, reorder series.mjs, write each page's sub-question opening and slider hand-off, linkcheck | 6 |
| 3 | **Index + model**: the scenario model, verdict meter, five sliders, "to make this YES, set…" solver, case map | 5 |
| 4 | **Yardstick page**: the Sankey 600 EJ → data centres, bars to beat (cooling, heating, transport, industry), the three-rung ladder | 3 |
| 5 | **Demand page**: the tokens-per-task ladder, the Jevons figure (price falls, quantity rises), willingness to pay vs cost per token, agent multiplier | 5 |
| 6 | **Thesis-critical peeks** (the first six rows in section 5: ~7 days; all eight: ~9.75) | 7–10 |
| 7 | **The verdict page**: scenario ledger, labelled assumptions and sources, tripwires | 3 |
| 8 | REVIEW-3, screenshots and phone touch re-check, honesty review of every number against the sources | 2 |
| 9 | **Remaining peeks** (the deferred set plus the 3D zoom and cut-open transistor), in dependency order | ~17 |

**Minimum version that answers the thesis honestly: steps 0–8 with the top six peeks ≈ 35 days.** It delivers the new structure, the verdict with a defensible ledger, and the layers the verdict depends on. **Everything ≈ 55 days** (v1 was 43 days, 24 for the minimum; the extra ~11 days at the minimum is the Yardstick, the Demand page, the number pass and a bigger index model).

Cuts if you want it shorter, with what they cost:
- Fold the Data page into Scaling (saves ~1 day, loses the flywheel's own page).
- Skip the "to make this YES, set…" solver (saves ~1 day; the sliders still work).
- Do the Demand page as a section of Scaling (saves ~2 days; Y1/Y2 lose their own page, which is the weakest place to cut).

### Risks
- **The ledger is built on assumptions** (users, tasks, tokens, efficiency decay, supply cap). It is a tool for seeing what must be true, not a forecast; the page says so, and defaults are tied to cited IEA cases.
- **The inference share is derived** (accelerated servers × growth × a 60% split from a secondary source). If it is off by 2× the verdict does not move, because the bars are 70–300× away; the page shows that explicitly.
- **The literal thesis is an easy NO.** The series should not strawman it: R1 and R2 are the fair tests, and the tripwires keep it falsifiable in either direction.
- **Splitting pages breaks internal anchors and the ../electricity links.** Step 2 includes a full linkcheck.
- **Dated numbers**: the IEA updates every year; the ledger date-stamps every figure and cites the report edition.

### Decisions I need from you
1. Approve the three rungs and the T\* wording (or pick one rung as the headline).
2. Approve the verdict tone: a flat NO on R3 and R1, "unlikely" on R2, with the tripwires.
3. Keep Data as an optional branch, or fold it into Scaling?
4. OK to add the Yardstick and Demand pages?
5. Electricity back-links: pending your OK, as before.
