# RESTRUCTURE-ORBITAL — the alternative framing: "Is orbital compute the only answer to 100× AI compute?"

Proposal only; no page changed. Written 23 Oct 2026 (Europe/Berlin) against HEAD 066c133 (the thesis-led RESTRUCTURE.md v2). Effort is in focused days, same scale as RESTRUCTURE.md. This document compares the orbital question with the thesis framing and recommends how to use both.

Feedback that led here: after v2 ("Will AI inference become humanity's largest energy expenditure component?") the alternative was proposed: **"Is orbital compute the only answer to 100× AI compute?"**, which would need an orbital-compute / star-mind page.

**Labels used throughout.** `[S#]` = a figure taken from a source in section 8. `[derived]` = my arithmetic from sourced inputs (the inputs are shown). `[judgement]` = my estimate, not a forecast and not sourced. Where two sources disagree I give both.

---

## 0. Summary (read this if nothing else)

1. **As literally worded, the question is an easy NO**, and the reason is instructive. 100× of end-2025 AI data-centre power (~31 GW → ~3.1 TW) is a frightening number only if chips stop getting more efficient. Hardware efficiency has been improving ~40%/yr `[S14]`; at that rate 100× the compute needs only **~108 GW** by 2035 `[derived]`, which is ~12 GW/yr, about one-eighth of the ~91 GW-average yearly growth in *global* electricity demand (+800 TWh in 2025, IEA `[S12]`). Epoch's own projection already has AI capacity above 100 GW by 2030 `[S11]`. So 100× by 2035 is mostly **a terrestrial, on-trend event**, not an orbital one.
2. **Orbit only becomes the interesting answer at 10³–10⁶×**, where Earth's grid (~3.2 TW average electricity, ~19 TW primary energy) or Earth's heat budget runs out. That is the real crossover question, and it is a better one: *"At what multiple of today's AI compute does orbital power become the cheapest watt, and what has to be true?"*
3. **Orbital is real but unproven on the one number that decides it.** It beats terrestrial only if launch falls to roughly **≤ $100–250/kg** *and* the full satellite stays near **≤ 20–40 kg per kW**. Today's price is ~$1,500–3,600/kg depending on source `[S3, S4]`; Starship reuse economics are targets, not results (Starship has flown 14 times; Flight 15 is planned for November `[S9]`). SpaceX's own S-1 says space data centres "may not be commercially viable" `[S8]`.
4. **Binding constraints are not physics, they are tonnage, chips and bandwidth**: 100 GW in orbit is 1.3–4 million tonnes, i.e. ~9,000–27,000 Starship-class launches `[derived]`, against an FAA cap of 145 a year (~0.5 GW/yr launched) `[S3]`. Training needs tight coupling, which optical links support only over short distances; sustained downlink is ~7–14 Gb/s per node `[S5]`.
5. **Recommendation: combine.** Thesis = Act 1 ("will demand be this large, and can the grid build it?"). Orbital = Act 2 ("what if the grid can't? how far does 'only' hold?"). Star-mind = a short far-future coda, honestly labelled as a bookend. Standalone, the orbital framing is more hand-wavy and costs more new work (~45 days minimum vs ~35 for the thesis framing); combined it is ~55 days minimum `[judgement]`.

---

## 1. Operationalising the orbital question

### 1.1 Three defects of the question as worded

| Phrase | Problem | Fix |
|---|---|---|
| "100×" | Of what? Power (GW), energy (TWh), compute (FLOP/s), or frontier-run size? Over what time? These diverge by the efficiency gain, which is the whole story. | Fix a baseline and a date; report compute multiple **M** and power multiple **P** separately; the gap is efficiency **E** (M = P × E). |
| "only answer" | A universal claim; any one working alternative falsifies it. Fine, but then it must name the alternatives and the test. | List the alternatives (1.3); define YES/NO by a capacity test and a cost test. |
| "the answer" | To what problem? If the problem is "power for AI", orbit is one of several supply routes; if it is "heat", it is another problem (space is a poor place to dump heat). | State the constraint being solved: **cheapest delivered kWh of IT power at ≥ X GW**, plus a heat statement. |

### 1.2 Defining "100×"

**Baseline B0.** End-2025 installed AI data-centre capacity: **~31 GW** facility power (Epoch AI: 13.5 GW end-2024 → ~31 GW end-2025; includes a ×2.5 overhead factor from chip TDP to facility power; rated, not average draw) `[S11]`. Cross-check: IEA says **all** data centres used **485 TWh in 2025 (≈55 GW average)** `[S12, derived]`. The two are not the same quantity (rated vs average; AI vs all) so the page should show both and say why they differ.

**Target date.** Primary: **end-2035** (10 years; checkable inside this series' life). Secondary: **2050**.

**Metrics.**
- **M** = installed useful compute multiple, FLOP/s at fixed precision and utilisation, vs B0. This is the "100×".
- **P** = facility power multiple vs B0 (GW).
- **E** = hardware efficiency gain, J per FLOP, B0 → target date. **M = P × E.**
- (Algorithmic efficiency and distillation count as *demand-side* alternatives, 1.3, not as part of E.)

**What 100× needs in GW** `[derived: 31.24 GW × 100 / E, E = (1+g)^10]`:

| Hardware efficiency gain g/yr | E over 10 yr | Power for M = 100× | = ×B0 | Per year added | vs 2025 world electricity-demand growth (+800 TWh ≈ 91 GW avg `[S12]`) |
|---|---|---|---|---|---|
| 0% (stall) | 1× | **3,124 GW (3.1 TW)** | 100× | ~310 GW/yr | 3.4× *all* growth, and equal to **all** of today's average global electricity (28,200 TWh ≈ 3.2 TW) |
| 20% | 6.2× | **505 GW** | 16× | ~47 GW/yr (above 2025's +17.7 GW AI pace `[S11]`) | ~0.5× |
| 40% (recent trend `[S14]`) | 28.9× | **108 GW** | 3.5× | ~8 GW/yr | ~0.09× |

For scale, AI capacity grew **+17.7 GW in 2025** (13.5 → 31.2 GW, ×2.3) `[S11, derived]`. A pure 2.3×/yr power path is impossible beyond a few years (31 GW × 2.3⁵ ≈ 2 TW by 2030); Epoch's projection (>100 GW by 2030, a 26%/yr CAGR) is the sane terrestrial reference `[S11, derived]`.

**The finding that reshapes the question:** on trend (power 26%/yr, efficiency 40%/yr ≈ 1.77× compute per year from power × efficiency, versus today's observed ~3.2×/yr), M reaches 100× around 2030–31 and **~230× by 2035** if power keeps growing to ~250 GW `[derived]`. "100×" is not the orbital threshold. **The threshold is wherever terrestrial P × E tops out.**

**Alternative definition (kept as a toggle on the index):** 100× the compute of the largest single frontier training run. Epoch projects single runs of 4–16 GW by 2030 `[S11]`, so 100× of a ~1 GW-class run today is ~100 GW in one coherent cluster, which is a *training* constraint (tight coupling) rather than a *capacity* constraint. This is where orbital is weakest (section 2.6).

### 1.3 Defining "only answer": the alternatives that must fail

To say orbit is the *only* answer, **every** one of these (alone or mixed) must fail to deliver the needed multiple at a cost within 2× of orbital:

| # | Alternative | What it supplies | Evidence in this doc |
|---|---|---|---|
| A1 | **More terrestrial grid** (solar + storage, wind, gas) | GW at ~$/kWh | 2025: +800 GW renewables incl. >600 GW solar, +800 TWh demand growth `[S12]`; SpaceX itself says 1.7 GW of compute now, up to 10 GW on the ground in 2027 `[S9]` |
| A2 | **Nuclear** (restarts, SMRs, new build) | firm GW | 2025: 3 GW added vs 3 GW retired; 12.2 GW of construction starts `[S12]`: not a 2030s scale-up on current evidence |
| A3 | **Efficiency**: chips, algorithms, MoE, distillation, quantisation | cuts the GW needed per unit M | ~40%/yr hardware `[S14]`; headroom to Landauer ~10⁵–10⁸× (section 5) |
| A4 | **Siting**: cold or solar-rich regions, off-grid microgrids | cheaper local GW | Off-grid solar+gas microgrid modelled at ~$36.8–42.5 B per GW per 5-yr cycle vs $37.6 B grid `[S3]` |
| A5 | **Undersea** | cooling (not power) | Natick: 864 servers, 6 failures vs 8 in 135 land servers over 2 yr, then discontinued; China's Hainan subsea site at 35 m with PUE reported < 1.15 `[S16]` |
| A6 | **Lunar** | cold, regolith, no atmosphere; power and mass still needed | Lonestar's Freedom flew 8 TB of storage on Athena (2025), which tipped over but completed planned tests `[S16]`: a demo, not a supply route |
| A7 | **Demand-side**: smaller models, caching, scheduling, shifting load | cuts M needed | Series pages Scaling and Factory (idle cost, sync swing) |

### 1.4 What counts as YES and NO

Let **T(year)** = the compute multiple terrestrial routes A1–A7 can deliver at ≤ 2× the orbital cost, and **O(year)** = what orbit can add. Fix a target multiple **M\*** and date.

- **YES** (orbit is the *only* answer to M\*): T(date) < M\* ≤ T(date) + O(date). Orbit is necessary *and* sufficient.
- **NO, type 1 (not necessary)**: T(date) ≥ M\*. A terrestrial mix suffices.
- **NO, type 2 (not sufficient)**: M\* > T + O. Orbit cannot close the gap either (e.g. launch tonnage). In that case nothing is "the answer"; the target is simply unreachable by the date.
- **UNRESOLVED** if the lower bound of T + O is within 2× of M\*, with the missing assumption named.

Three headline targets: **M\* = 100× by 2035** (primary), **1,000× by 2040**, **10⁴× by 2050**. Cost test for "within 2×": delivered $/kWh of IT power, section 2.8.

### 1.5 The crossover version (recommended wording)

"Is orbital compute the only answer to 100×?" is easy to kill and tells the reader little. The same machinery supports a sharper, equally falsifiable question:

> **"At what multiple of today's AI compute does an orbital watt become cheaper than a terrestrial one, and is the world on a path to get there?"**

It forces the reader to move the real levers (launch $/kg, kg/kW, radiator temperature, grid cost, efficiency E) and gives a number instead of a yes/no. The index can also show the literal question as the verdict chip beneath it.

---

## 2. The physics and economics (web-verified, 23 Oct 2026)

All sources in section 8. Where I compute something, the formula and inputs are given.

### 2.1 Sunlight in orbit

- Solar constant **1,361 W/m²** `[S1]`. In a dawn–dusk sun-synchronous orbit satellites see near-continuous sun; Suncatcher cites up to ~8× the yield of a mid-latitude ground panel, Forethought ~3–5× a good terrestrial site `[S1, S3]` (the difference is the baseline panel and site).
- Delivered PV density: Starlink-class arrays give ~196 W/m² (50.4 kW from 257 m², i.e. 1,361 W/m² × 20% cells × 0.72 derate for temperature, pointing, and degradation oversizing) `[S3, derived]`; ideal AM0 at 20% is 272 W/m².
- **PV area per MW of IT power**: 3,700 m² (ideal) to ~5,100–8,100 m² (derated, with degradation margin and eclipse storage) `[derived]`; Turyshev (JPL) gives 5,640 m² per MW IT (the JPL-internal variant 4,400 m²) `[S5]`.
- **At scale** (`[derived]`): 100 GW needs ~370–810 km² of PV (Turyshev: 564 km²); a terrestrial solar farm for the same *average* delivered power is ~5,000–10,000 km² `[S3]`.

### 2.2 Heat: radiator-only cooling

Vacuum has no convection; all waste heat leaves by radiation. Stefan–Boltzmann, σ = 5.670×10⁻⁸ W m⁻² K⁻⁴; flux per side q = ε σ T⁴ (ε ≈ 0.9) `[derived]`.

| Radiator T | Black-body per side | With ε 0.9, view 0.85 (Turyshev's assumptions) | m² per MW, one-sided | m² per MW, two-sided |
|---|---|---|---|---|
| 300 K (27 °C) | 459 W/m² | ~351 W/m² | ~2,850 | ~1,420 |
| 320 K (47 °C) | 595 W/m² | ~455 W/m² | ~2,200 | ~1,100 |
| 350 K (77 °C) | 851 W/m² | ~651 W/m² | ~1,540 | ~770 |

Sourced values: Forethought quotes net rejection **585 W/m² at 25 °C and 830 W/m² at 45 °C** (two-sided, environment included), and a system specific power of **163–346 W/kg for a deployable radiator** vs ~13 W/kg for ISS radiators; thermal hardware is **2–5% of cost** `[S3]`. Turyshev: ~2,500 m² per MW (ideal ~1,500 m² at 350 K; JPL variant ~1,900 m²) `[S5]`. Because **A ∝ 1/T⁴**, running the electronics hotter is the main lever; chips like to be cold (leakage, reliability), so there is a real engineering trade, and this is why the index slider "radiator temperature" is meaningful.

Honest reading: **radiators are not the showstopper (2–5% of cost), but they dominate area.** At 100 GW the radiator is ~150–250 km² `[derived from S5]`, comparable to the PV area. Both are much smaller than terrestrial land.

A consistency check worth putting on the page, `[derived]`, not a finding of any source: Starcloud's white paper describes **5 GW on a 4 km × 4 km structure** `[S10]` = 312 W/m² of footprint. Turyshev's PV + radiator areas (5,640 + 2,500 m²/MW) imply ~40 km² for 5 GW, **~2.5× larger**. Either the proposal assumes better cells, higher radiator temperature or shared areas, or it is optimistic. The page can show both and let the reader slide.

### 2.3 Mass per kW: the number that decides the economics

| Source | kg per kW | What it covers |
|---|---|---|
| SpaceX FCC filing | **10** ("100 kW per tonne") | Satellite, aspirational; 1 Mt/yr → 100 GW/yr `[S6]` |
| SpaceX Starmind page | **13** (75 kW/ton; 175 kW average compute, 250 kW peak) | Satellite design claim `[S7]` |
| Starcloud-3 plan | ~15 (200 kW, ~3 t) | `[S10, derived]` |
| Suncatcher reference design | ~20 (575 kg for ~28 kW, from the 20.5 kg/kW reproduced here; the launched-power price at $200/kg reproduces as $820/kW/yr) | `[S1, derived]` |
| Turyshev/JPL bottom-up | **34–59** (~40 typical); 29.4 for PV + storage + radiator alone; JPL variant 30–50 | `[S5]` |
| Forethought via FAA cap | ~43 implied (145 launches × 150 t ≈ 0.5 GW/yr) | `[S3, derived]` |

**Range 10–59 kg/kW, a 6× spread, is the single largest uncertainty in the economics.** The optimistic end are company claims; the pessimistic end is the only independent bottom-up (one preprint). I carry 13 / 25 / 40 as the three slider presets.

### 2.4 Launch cost

- **Today**: Falcon 9 reusable ~**$3,600/kg** (TechCrunch, from the Suncatcher paper) `[S4]`; Forethought treats ~**$1,500/kg** as the present internal cost `[S3]`. These disagree (price vs cost, and payload assumptions); the page cites both. Turyshev allows $250–1,000/kg for launch plus build in his model `[S5]`.
- **Projected**: Suncatcher's learning curve reaches **$200/kg by ~2035** at ~180 Starship launches/yr; ~$60/kg at 10× reuse, ~$15/kg at 100× reuse, with a propellant floor of ~$8–13/kg `[S1]`.
- **Thresholds (Forethought)**: parity with terrestrial *solar* at ~**$250/kg**; whole-data-centre parity ~**$100/kg**; cheaper than any terrestrial source ~**$50/kg** `[S3]`.
- **Status**: Starship has flown 14 times; Flight 15 (November) is planned to attempt tower catches of both stages `[S9]`. Full reuse is unproven.

**Launch-only cost of delivered IT power** `[derived: $/kg × kg/kW ÷ (5 yr × 8,760 h × 0.95 availability)]`. This excludes the satellite build, ground segment, insurance, eclipse storage beyond what is in the kg/kW, and compute degradation, so **it is a lower bound**:

| Launch $/kg | 13 kg/kW | 25 kg/kW | 40 kg/kW | |
|---|---|---|---|---|
| 3,600 | $1.15/kWh | $2.16 | $3.46 | today (Suncatcher-paper basis) |
| 1,500 | $0.48 | $0.90 | $1.44 | today (Forethought basis) |
| 500 | $0.16 | $0.30 | $0.48 | |
| 200 | $0.064 | $0.12 | $0.19 | 2035 learning-curve target |
| 100 | $0.032 | $0.06 | $0.096 | |
| 50 | $0.016 | $0.03 | $0.048 | |

Terrestrial reference: Suncatcher quotes $570–3,000 per kW-year of data-centre power spend, i.e. **$0.065–0.34 per kWh** `[S1, derived]`. At $200/kg launch-only is $0.064–0.19/kWh: inside the terrestrial band, not below it. **Orbit wins on launch cost alone only below ~$100–200/kg and at ≲ 25 kg/kW**, and only if the build, ops and chip-loss terms (2.5, 2.7) are small, which is not yet shown.

**Whole-system comparison (Forethought, $B per GW per 5-year cycle)** `[S3]`:

| Case | $B/GW |
|---|---|
| Earth grid | 37.6 |
| Earth microgrid (conservative / bullish) | 42.5 / 36.8 |
| Orbital at $250/kg | 48.2 |
| Orbital at $100/kg | 35.0 |
| Orbital at $50/kg | 30.3 |

Note the spread: even at $50/kg orbit is only ~20% cheaper than grid, and at $250/kg it is ~28% more expensive. **The economics are close, not decisive**, and Forethought is an advocate-leaning, non-peer-reviewed report; Turyshev's model finds break-even only for particular workload classes `[S5]`.

### 2.5 Reliability, radiation and maintenance

- **Total ionising dose**: ~150 rad/yr at 550 km, ~750 rad over 5 years; Google's Trillium TPU HBM showed irregularities at ~2 krad but no hard failures to 15 krad `[S1]`. So TID is a lesser problem than feared in LEO.
- **Single-event effects / silent data corruption**: ~1 per 3 million inferences in Suncatcher's test `[S1]`: tolerable for inference with checking, a real hazard for multi-week training runs without redundancy.
- **Chip attrition (no repair)**: 9%/yr bleed, ~38% of compute lost over 5 years `[S5]`. This is the term that makes the satellite's economic life shorter than its orbital life and why "launch-only" is a lower bound.
- **Maintenance**: none in practice (robotic servicing is unproven at scale). Terrestrial operators swap boards daily.
- **Debris and regulation**: SpaceX's FCC filing (SAT-LOA-20260108-00016; FCC action DA 26-113) is for **up to 1 million satellites** `[S6]`; the FAA cap of 145 Starship launches/yr `[S3]` and orbital-congestion/Kessler questions are open; ITU/FCC licensing at that scale has no precedent. Treat as **a risk item, not a number**.

### 2.6 Communications: why training and inference differ

- **Inter-satellite**: commercial optical links 1–100 Gbps; Suncatcher targets ~10 Tbps at short range (800 Gbps demonstrated on the bench) with tight formation flying (~hundreds of metres) `[S1]`. Bandwidth falls fast with distance.
- **Ground downlink**: TBIRD demonstrated **200 Gbps peak**; sustained per-node figures are **~7–14 Gb/s** `[S5]`. Latency to LEO is a few ms.
- **Training** needs all-to-all gradient exchange at TB/s scale per node group; this must live inside a tightly-flown cluster, which limits cluster size and makes the 4–16 GW single frontier runs (2030, `[S11]`) the weakest case for orbit.
- **Inference** needs a prompt in and tokens out: kilobytes per request; downlink is not binding, latency is fine. Turyshev's workload classes: C1 (loosely coupled, e.g. batch inference) viable; C2/C3 (tightly coupled) not without architecture changes `[S5]`.

### 2.7 What actually exists (verified)

| Programme | Status as of 23 Oct 2026 | Source |
|---|---|---|
| **Google Project Suncatcher** | Research; Joule 2026 paper; prototype launch reported 1 Oct 2026 (with Planet) | `[S1, S2]` |
| **Starcloud** | Starcloud-1 (one H100) in orbit since Nov 2025; Starcloud-2 (2 × 8 kW) slipped to 2027; Starcloud-3 (200 kW) planned on Starship ~2028–29; white paper: 5 GW, 4×4 km | `[S10]` |
| **SpaceX / xAI** | FCC filing for up to 1 M satellites; "Starmind" design page; Musk: lowest-cost AI location will be space "within two years, maybe three"; S-1 caveat "may not be commercially viable"; plans up to 10 GW **on the ground** in 2027 | `[S6–S9]` |
| **Others named by Forethought** | China's 12-satellite Three-Body Computing Constellation; Nvidia space modules; Blue Origin and others | `[S3]` |
| **Lonestar** (lunar storage) | 8 TB demo on Athena (2025), partial | `[S16]` |

The orbital programmes above deliver **single-digit to low-hundreds of kW** in space. The question concerns **100,000,000 kW**.

### 2.8 Takeoff scenarios and launch tonnage

`[derived from S5/S6]`: tonnes per GW = kg/kW × 1,000. Launches per GW at 150 t each:

| kg/kW | t per GW | Launches per GW (150 t) | 100 GW in orbit |
|---|---|---|---|
| 13.3 | 13,300 | ~89 | 1.33 Mt ≈ 8,900 launches |
| 40 | 40,000 | ~267 | 4.0 Mt ≈ 26,700 launches |

Spread over five years that is ~1,800–5,300 launches per year, i.e. 5–15 a day, **before replacing a five-year fleet**. SpaceX's own filing claims "1 Mt a year → 100 GW a year" `[S6]`; compared with the 145-launch FAA cap (~0.5 GW/yr) `[S3]` that is a ~200× increase. Forethought's takeoff range is **~4 GW by 2031 (slow) to ~100 GW by 2030 (fast)** `[S3]`; I regard the fast end as the advocate's case `[judgement]`.

### 2.9 Delivered $/kWh: the index model

For the index meter, one equation each side, both with a source-tagged default and a slider:

- **Orbit**: C_orb = (L + B) × m_kW / (life × 8,760 × avail) + C_link + C_ops, where L = launch $/kg, B = build $/kg, m_kW = kg/kW, life 5 yr, avail ~0.95 × (1 − chip bleed). Break-even rule (Turyshev): **(L + B) · m_kW + C_link + C_ops ≲ C_terr** `[S5]`.
- **Earth**: C_terr = power ($0.065–0.34/kWh `[S1]` or LCOE for the chosen mix) × PUE + interconnect/queue premium + land.
- **B is unknown.** Satellite build cost per kg for mass-produced compute satellites has no independent figure; I use B = L as a labelled placeholder `[judgement]` and make it a slider.

---

## 3. The terrestrial side: honest numbers for "what can the grid add?"

| Fact | Value | Source |
|---|---|---|
| AI data-centre capacity added in 2025 | +17.7 GW (13.5 → 31.2) | `[S11, derived]` |
| Epoch projection | >100 GW by 2030; 4–16 GW single frontier runs | `[S11]` |
| IEA all data centres | 485 TWh (2025) → 950 TWh (2030) | `[S12]` |
| World electricity | ~28,200 TWh (2025) ≈ 3.2 TW average; +800 TWh (+3%) in 2025 | `[S12]` |
| Renewables added in 2025 | ~800 GW (solar >600, wind ~160, China ~500) | `[S12]` |
| Nuclear 2025 | +3 GW added, 3 GW retired, 12.2 GW construction starts | `[S12]` |
| US data-centre load ramp | 3.4–9.2 GW/yr average load | `[S13]` |
| Human primary energy | ~600 EJ/yr ≈ 19 TW | RESTRUCTURE.md v2 §1.4 |

Reading `[derived]`: 100 GW of *average* delivered power needs ~400 GW of PV nameplate at a 25% capacity factor before storage: **less than one year of 2025 global solar additions**. 505 GW (E = 6×) needs ~2 TW nameplate ≈ 3–4 years of 2025's solar pace plus storage and firming. 3.1 TW (E = 1×) is roughly all of present electricity generation, not credible by 2035 by any route including orbit.

Real terrestrial blockers are **interconnection, turbines, transformers, permitting and local opposition** (the electricity series' own subject, and the Factory page's), not total resource. xAI and SpaceX respond to those by off-grid microgrids and gas turbines on the ground (10 GW planned for 2027 `[S9]`), which is precisely evidence *against* "only".

---

## 4. Verdict (judgement; probabilities are mine, not sourced)

| Claim | Probability | Why |
|---|---|---|
| **"Only answer" for 100× by 2035** (terrestrial fails *and* orbit succeeds) | **≈ 2%** | 100× needs 108–505 GW; terrestrial on-trend delivers ≥100 GW by 2030 `[S11]`. Orbit would have to supply a double-digit share *and* hit ≤$200/kg, ≤25 kg/kW, 5–15 launches a day. |
| Terrestrial **alone** can reach 100× by 2035 (NO type 1) | **≈ 55%** | Needs E ≳ 6–29× (20–40%/yr) and ~105–500 GW; both are in line with current trends but efficiency growth could slow. |
| 100× by 2035 not reached by any route (NO type 2) | ≈ 40% | If efficiency stalls (P needed → TW) and neither grid nor launch scales. |
| ≥ **1 GW** of AI compute operating in orbit by end-2030 | ≈ 15% | Largest actual project is 200 kW planned ~2028–29 `[S10]`; 1 GW is ~90–270 launches. |
| Orbit supplies ≥ **10%** of new AI capacity in 2035 | ≈ 10% | Needs ≤$100–200/kg demonstrated by ~2030 and rapid hardware ramp; Starship reuse unproven. |
| Orbit is the cheapest *marginal* watt for AI by 2040 | ≈ 20–25% | Plausible if Starship reuse reaches $50–100/kg and satellite mass ≲ 20 kg/kW. |
| ≥ 10% of AI compute in orbit by 2050 | ≈ 30% | Mostly inference/batch; the long-run scale case. |
| "Only answer" for **≥ 10⁴×** (≥ 300 TW at today's efficiency) | **≈ 35%, conditional on E staying < 100×** | At that scale Earth's 19 TW primary supply and its heat budget are binding; orbit and beyond is the only physical route. But E ≥ 100× (3 TW) brings it back to Earth's grid. |

Why the verdict is not a flat NO: (i) **"only" is a statement about extreme scale**; at 10⁴–10⁶× Earth runs out, and (ii) orbit's strength (continuous sun, no land) is real. Why it is not a YES: the numbers for 100× do not need it. What would change it (tripwires for the page, with the source to check):

- **Observed launch price ≤ $200/kg** on a commercial manifest (SpaceX, FAA).
- **Starship**: ≥ 2 consecutive flights with both stages recovered (Flight 15, planned November).
- **Starcloud-3 or Suncatcher** (2027) delivering ≥ 100 kW with measured availability, chip attrition and SDC rate.
- **E**: hardware J/FLOP improvement falling below ~15%/yr for two generations.
- **Grid**: AI interconnect queue times > 5 years in more than half of announced sites.

---

## 5. The Star-mind coda: scale and its honest place

A bookend, not a forecast. Everything below is `[derived]` from B0 = 31.24 GW, the Sun's luminosity (~3.8×10²⁶ W: Armstrong and Sandberg `[S15]`; IAU nominal 3.828×10²⁶ W), the 1,361 W/m² solar constant, an Earth cross-section π R⊕² intercepting ~1.74×10¹⁷ W, and human primary power ~1.9×10¹³ W.

**Power at today's efficiency (E = 1)**

| Compute multiple | Power | × human primary power (19 TW) | vs sunlight hitting Earth (174 PW) | Orbital PV at ~196 W/m² | Radiators at ~700 W/m² |
|---|---|---|---|---|---|
| 1× (today) | 31 GW | 0.16% | 2×10⁻⁷ | 160 km² | 45 km² |
| **100×** | **3.1 TW** | **16%** | 2×10⁻⁵ | 15,900 km² | 4,460 km² |
| **10⁴×** | **312 TW** | **16×** | 0.18% | 1.6 million km² | 446,000 km² |
| **10⁶×** | **31,200 TW** | **1,640×** | **18%** | 1.6×10⁸ km² (31% of Earth's surface) | 4.5×10⁷ km² |

**How efficiency E moves it (power in TW)** `[derived]`:

| M \ E | 1× | 10× | 100× | 10⁴× |
|---|---|---|---|---|
| 100× | 3.1 | 0.31 | 0.031 | 0.0003 |
| 10⁴× | 312 | 31 | 3.1 | 0.031 |
| 10⁶× | 31,200 | 3,120 | 312 | 3.1 |

**Landauer.** Minimum energy to erase one bit at temperature T is k_B T ln 2 = **2.87×10⁻²¹ J at 300 K** `[S17]`. A B200 spends ~4.4×10⁻¹³ J per FLOP at peak FP16 `[S14]`: ~1.5×10⁸ × the single-bit Landauer cost, though one FLOP is many bit operations, so the real headroom is smaller; I use **10⁵–10⁸×** and flag it as `[judgement]`. So E up to ~10⁴ is physically unforbidden, which is why 10⁶× at a few TW is not excluded by thermodynamics, only by engineering and by reversible-computing hurdles. Landauer cost falls linearly with the radiator temperature, so cooler is better; but orbital radiators lose area as T⁴, the trade in 2.2.

**Dyson swarm and Matrioshka brain.** A swarm capturing even 10⁻⁹ of the Sun's output delivers 3.8×10¹⁷ W, more than 12 million times today's AI fleet. Armstrong and Sandberg's model builds a Dyson swarm from Mercury in ~31 years with a 1 km² seed, 5-year deployment cycles, ⅓ capture efficiency `[S15]`. Landauer erasures at 300 K from the Sun's full output would be ~1.3×10⁴⁷ per second `[derived]`. A Matrioshka brain's nested shells recycle waste heat, but a secondary summary notes that nesting does not substantially improve Landauer-limited computation and that reversible computing is the real escape `[S15 summary; secondary source, to be verified against the paper]`.

**Honest placement.** Kardashev-II is a **post-2100 physics bookend**, not a 2035–2050 engineering path: it adds exactly one message ("the Sun has 10¹⁵× the power Earth has; thermodynamics, not energy, is the long-run limit") and one figure (the table above as a log ladder). It should not be allowed to inflate the credibility of the near-term orbital case: the 2030s question is satellites of tens to hundreds of kW, not swarms.

---

## 6. Page map, dependencies and the index meter

### 6.1 Dependency map (case structure)

```
                       ┌── Q: what is 100×? (ruler) ──────────────┐
                       │                                          │
        P (power needed) = M ÷ E              T (terrestrial ceiling)
          ▲        ▲                              ▲       ▲
   Parallel   Price of a flip            Factory (grid,   Alternatives
 (efficiency)   (Landauer)               interconnect)  (siting, undersea,
          ▲                                           lunar, demand-side)
   Scaling (who needs compute: inference vs training; C1/C2/C3)
                       │
                       ▼
       O (orbital ceiling) = Sun × area × mass × launch × radiation × comms
          ▲        ▲        ▲          ▲           ▲          ▲
        Heat   Orbital   Launch    Reliability   Links    Regulation
                       │
                       ▼
          LEDGER:  YES / NO-1 / NO-2 / UNRESOLVED  for M* ∈ {100× 2035, 1,000× 2040, 10⁴× 2050}
                       │
                       ▼
               Coda: Star-mind (Kardashev ladder)
```

### 6.2 Page list (reuse in bold)

| # | Page | Opens with | Reuse | New? |
|---|---|---|---|---|
| 0 | **The question** (index) | "Is orbital compute the only answer to 100×?" Crossover meter | rebuilt | meter + model |
| 1 | **The ruler**: what is 100×? | "100× of what: GW, TWh or FLOP/s, and by when?" B0 = 31 GW; table 1.2; the M = P × E triangle | mwhFlow, powerLadder, regionsTWh | **New (short)** |
| 2 | **Rules** (switch) | "What is a computation, physically?" | **the-switch** | split only |
| 3 | **The price of a flip** | "How cheaply could an operation ever be done?" Landauer gap, joules per op | **the-switch** (joulesPerTick, darkSilicon) | extended with section 5 |
| 4 | **Parallel** | "Why did efficiency keep improving, and when does it stop?" (E) | **parallel** | – |
| 5 | **Scaling and demand** | "Who needs the compute: training or inference, tightly or loosely coupled?" (C1/C2/C3) | **scaling**, **learning** | small |
| 6 | **The factory** | "How much can the grid add, and what blocks it?" (T) | **ai-factory** (mwhFlow, powerLadder, coolantFlow, idleCost, syncSwing) | supply-cap slider |
| 7 | **Alternatives** | "Siting, undersea, lunar, demand-side: do any change the answer?" | partially Factory | **New** |
| 8 | **Heat** | "Where does heat go when there is no air?" Stefan–Boltzmann, area vs T⁴; radiator peek | – | **New** |
| 9 | **Orbital compute** | "What does a megawatt in orbit cost, and what must be true?" Flux, mass budget waterfall, launch curve, SEU/chip bleed, links | – | **New (the big page)** |
| 10 | **Star-mind** (coda) | "If the grid is not enough, what is?" Kardashev ladder, Landauer, Dyson swarm | – | **New** |
| 11 | **The ledger** | "What does it say, and what would change it?" | – | scenario ledger |

Page order matters: Heat comes **before** Orbital because the reader needs T⁴ to understand why mass per kW is so high. Star-mind comes **after** the ledger, because the ledger has already said "not for 100×".

### 6.3 Index meter (the concept)

**First screen.** A log-scale meter: **delivered $/kWh of IT power, orbit vs terrestrial**, with a vertical marker for "launch $/kg today" ($1,500–3,600) and a band for terrestrial ($0.065–0.34/kWh). A chip shows the crossover launch price. A second meter shows the **multiple M\*** each route can reach by the chosen year (T and O stacked), with a verdict chip per target (100× 2035; 1,000× 2040; 10⁴× 2050).

**Sliders** (each source-tagged; tap the chip to see why):
1. Launch $/kg (default 1,500; range 15–3,600, with the learning-curve preset $200 by 2035);
2. Radiator temperature (default 330 K; range 290–385 K; area scales T⁻⁴);
3. Satellite mass per kW (default 25; presets 13 / 25 / 40);
4. Terrestrial cost: grid vs off-grid microgrid; PUE; interconnect delay;
5. Hardware efficiency growth g/yr (default 25%; 0–40%) and the date.

**Case map** below the meter: the dependency graph (6.1) as a canvas; nodes tint holds/contested/fails from the slider settings.

**Final ledger.** Page 11 is a table: three target multiples × Low/Mid/High, with T, O, verdict per cell; labelled assumptions; tripwires from section 4; a "mark this later" box.

---

## 7. Side by side with the thesis framing

| Dimension | **Thesis (v2)**: "Will AI inference become humanity's largest energy expenditure component?" | **Orbital**: "Is orbital compute the only answer to 100× AI compute?" |
|---|---|---|
| **Falsifiability** | High: three rungs, explicit bars (3,800 / ≳6,000 / 17,200 TWh), data-checkable tripwires | Medium: falsifiable once M\*, date, alternatives and the 2× cost test are fixed (1.4); the "100×" is on-trend, so it resolves NO quickly. Crossover version (1.5) is more informative |
| **Narrative pull** | Moderate; a verdict about energy that most readers already half-believe | **High**: space, Sun, Dyson swarm; a surprising question, a physical argument (T⁴, tonnes per GW) |
| **Existing pages used** | 8 of 12 pages are existing content moved or re-aimed; 2 new (Yardstick, Demand) | 5–6 of 12 (Switch/Flip, Parallel, Scaling, Factory, Learning); **5 new** (Ruler, Alternatives, Heat, Orbital, Star-mind) |
| **New effort** (days) `[judgement]` | ~35 minimum / ~55 full | ~45 minimum / ~60 full (standalone) |
| **Hand-wave risk** | Low–medium: inputs are IEA/Epoch, but the 2050 horizon is long | **Medium–high**: key inputs (kg/kW, B, launch price, orbital reliability) are company claims or one preprint; a single bad assumption swings the answer 6×; Star-mind invites speculation |
| **What it teaches** | demand, energy accounting, where the grid fits | physics of power, heat and launch; why mass per kW and T⁴ matter |
| **Risk of being wrong in a way that embarrasses** | the verdict "NO" is robust, as the bars are 70–300× away | the verdict can be overtaken by news (Starship Flight 15; S-1 disclosures); needs a "date-stamped; re-check" policy |
| **Recommendation** | Keep as Act 1 | Use as Act 2, not standalone |

### 7.1 Combined structure (recommended)

- **Act 1: "How big could the bill get?"** Thesis pages as in RESTRUCTURE.md v2 (Yardstick, Rules, Model, Language, Flip, Parallel, Scaling, Demand, Factory), ending on a mid-ledger with the R1/R2/R3 verdicts.
- **Act 2: "What if the grid can't?"** Ruler (the M = P × E triangle, 100× vs terrestrial ceiling) → Alternatives → Heat → Orbital compute → ledger of M\*; the **index meter** becomes a two-tab meter (Tab A: thesis rungs; Tab B: orbit crossover).
- **Coda: Star-mind.** One page, one ladder figure, honest placement (section 5).
- Reuse: Yardstick and Ruler merge (both show "what is the bar"), Demand feeds the Scaling slice of Act 2, the Factory page serves both acts. The Yardstick Sankey (600 EJ → data centres) is the natural bridge to the "3 TW is 16% of humanity's primary power" fact.

**Effort of combined plan** `[judgement]`: thesis steps 0–8 ≈ 35 days + Alternatives 2.5 + Heat 4 + Orbital 8 + Star-mind 4 + extended model/ledger 2 + extra number pass 2 ≈ **55 days minimum**, ~70 full. Cuts: Star-mind to a section (−3), Heat folded into Orbital (−2), Alternatives folded into Factory (−2).

---

## 8. Sources (checked 23 Oct 2026 unless noted)

| Tag | Source |
|---|---|
| S1 | Google, "Towards a future space-based, highly scalable AI infrastructure system design" (Project Suncatcher), arXiv:2511.19468, https://arxiv.org/abs/2511.19468; Joule 2026 version |
| S2 | Google blog, Suncatcher prototype launch, blog.google, 1 Oct 2026 |
| S3 | Forethought, "Will we really put data centers in space?", 22 May 2026, https://forethought.org/research/will-we-really-put-data-centers-in-space (non-peer-reviewed; advocate-leaning; cites FAA cap and takeoff scenarios) |
| S4 | TechCrunch, "Why the economics of orbital AI are so brutal", 11 Feb 2026 (launch price ~$3,600/kg, from the Suncatcher paper) |
| S5 | Turyshev, JPL, arXiv:2604.27197 (https://arxiv.org/abs/2604.27197); doi 10.48577/jpl.hhddg7 (preprint; economics section partly truncated in my read; Table 10 break-even details not seen) |
| S6 | FCC DA 26-113, SAT-LOA-20260108-00016; SpaceX orbital-DC narrative, https://regmedia.co.uk/2026/02/05/spacex-orbital-dc-sat-narrative.pdf |
| S7 | SpaceX, "Starmind", https://www.spacex.com/spacexai/starmind |
| S8 | Reuters, 21 Apr 2026 (S-1 caveat that space data centres "may not be commercially viable") |
| S9 | Ars Technica, 21 Oct 2026 (SpaceX call: Starship Flight 15 in November, tower catch of both stages; 1.7 GW compute now, up to 10 GW on the ground in 2027) |
| S10 | CNBC, 10 Dec 2025 (Starcloud-1, 5 GW white paper); TechCrunch, Starcloud, 30 Mar and 21 Aug 2026 (Starcloud-2 slipped to 2027, Starcloud-3 200 kW) |
| S11 | Epoch AI data insight (16 Jan 2026) and Epoch frontier-power-demand publication (AI data-centre capacity ~31 GW end-2025, >100 GW by 2030, 4–16 GW single runs) |
| S12 | IEA Global Energy Review 2026 (solar, wind, nuclear, electricity); IEA Energy and AI (485 TWh in 2025, 950 TWh in 2030); figures as already pinned in RESTRUCTURE.md §1.4 |
| S13 | LBNL 2024 data-centre report, as cited by S5 |
| S14 | Samaritan Research, "Leading ML hardware becomes 40% more energy-efficient each year" (secondary summary of Epoch data); B200 FP16 ~2.25×10¹² FLOP/J |
| S15 | Armstrong and Sandberg, "Eternity in six hours", Acta Astronautica 2013, http://aleph.se/papers/Spamming%20the%20universe.pdf (Dyson swarm from Mercury, ~31 yr) |
| S16 | Microsoft Project Natick: https://news.microsoft.com/source/features/sustainability/project-natick-underwater-datacenter/ (discontinued: IT Pro); China Hailanci subsea site (Electronics360); Lonestar Freedom (DCD; FOX 13 Tampa Bay) |
| S17 | Landauer's principle, https://en.wikipedia.org/wiki/Landauer's_principle |

**Not independently pinned (step 0 of any build must fix these):** exact URLs for the Reuters, TechCrunch, CNBC, Ars items (outlet and date only above); the IAU nominal solar luminosity (3.828×10²⁶ W is from memory, consistent with the 3.8×10²⁶ W in S15); the Matrioshka/Landauer claim (secondary summary); whether the Suncatcher prototype launch date and partner are exactly as the blog reports; and the ~$1,500 vs ~$3,600/kg launch-price discrepancy. Starcloud's and SpaceX's mass-per-kW figures are company claims.

---

## 9. Decisions I need from you

1. Keep the literal wording, or adopt the **crossover wording** (1.5)? I recommend crossover, with the literal question as a verdict chip beneath it.
2. **Combine** (thesis Act 1 + orbital Act 2 + Star-mind coda) or pick one? I recommend combining.
3. Star-mind as a page, or as a section of the Orbital page?
4. Primary M\*: 100× by 2035, or lead with 1,000× by 2040 (where the question has bite)?
5. Approve the page changes (none made so far) and the electricity back-links as before (pending; the electricity repo is untouched).
