# AI explainer series: synthesis review (vs the Ciechanowski bar)

- **Date:** 2026-10-30
- **HEAD:** `1092eab` (Wave 10 dist rebuild + QA21). Reviewed `src/`, not `dist/`.
- **Live site:** https://akarshgopal.github.io/blog/ai/
- **Method:** Claude Opus 5.5. Four part reviews ran in parallel (`/workspace/opus-review/part1–4.md`), each reading the page HTML and figure code and calibrating against ciechanow.ski (*Mechanical Watch*, *GPS*, *Internal Combustion Engine*). This synthesis then spot-checked every Critical claim and every Major in the top 15 against the `src/` files (Read/Grep). No new review from scratch, no web browsing. The repo was read-only apart from this file.
- **Priorities:** technical accuracy first, then edification: does the reader *build* the idea, or just get told it?

## Page status

| Page | Status | How it is reached |
|---|---|---|
| `index.html` | **Live hub** | Verdict meter, ceiling meter, launch cost, case map |
| `flip.html` | **Live** (case-map node) | "The flip · the physical floor" |
| `parallel.html` | **Live** (case-map node) | `casemap.js:12` |
| `factory.html` | **Live** (case-map node + `#grid`) | `casemap.js:14,21` |
| `scaling.html` | **Live** (case-map node, lever T) | `casemap.js:12` |
| `data.html` | **Live** (case-map node) | `casemap.js:13` |
| `language.html` | **Live** (case-map node) | `casemap.js:12` |
| `model.html` | **Live** (case-map node `learn`) | `casemap.js:11` |
| `rules.html`, `yardstick.html`, `demand.html`, `verdict.html`, `orbital.html` (+`#need`, `#star`) | **Live** (Act 1/Act 2 case-map nodes) | `casemap.js` |
| `essay.html` | **Live but orphaned**: not a case-map node | Only a prose link from `index.html:86`. Its aside's "deeper posts listed at the top" list does not exist |
| `the-switch.html` | **Redirect** → `flip.html` (noindex) | n/a |
| `ai-factory.html` | **Redirect** → `factory.html` (noindex) | n/a |
| `learning.html` | **Redirect** → `model.html` (keeps the hash, noindex) | n/a |

There are no content stubs; the only stubs are the three redirects. `flywheel.js` is not loaded by parallel or factory.

---

## Executive verdict

The series is **numerically careful, well sourced and honestly labelled**. Almost every derived number the reviewers recomputed checks out to the digit, and the DERIVED/assumption/tripwire tagging is better than most professional explainers. **It does not yet reach the Ciechanowski bar** for three reasons:

1. **Accuracy.** There are a handful of real errors, and they sit where the reader learns the mechanism, not in footnotes:
   - the Landauer gap is understated by about 250–450×;
   - the 55 TWh lede describes its own derivation backwards;
   - the KV-cache drawer names the wrong decode bottleneck;
   - the momentum simulation does the opposite of what its prose says;
   - attention looks into the future;
   - "HBM" is given 2014 off-package DRAM energy;
   - the heat-loop figure swaps the warm and cool legs;
   - PSU/VRM losses are called PUE overhead;
   - lithography sims declare ASML's shipping resolution unprintable and immerse EUV in water.
2. **Explaining by assertion.** Too many figures *display a number* instead of letting the reader *discover a relationship*. Core quantities are asserted, not built: ½CV², tokens, loss, tiling, the Vdd/Vt trade-off, the model equation behind the verdict.
3. **Uneven pages.** The Act 1/Act 2 ledger pages (yardstick, demand, verdict, orbital) read as dashboards and briefings with undefined jargon.

model.html and essay.html are the closest to the bar (B+). parallel, language and scaling are solid B-range pages with fixable errors. yardstick and demand are the weakest (D+). Fixing the top 15 items below (mostly S/M effort) would lift the series average from about C+/B− to B+.

### Grades vs the Bartosz bar

| Page | Grade | One-line reason |
|---|---|---|
| model.html | **B+** | Builds line → XOR → hidden layer → backprop one idea at a time; the momentum sim contradicts its prose; hidden space is asserted, not shown |
| essay.html | **B+** | A real progressive build from switch to grid with faithful figures; §13–14 and Final words collapse into notes; orphaned from the nav |
| parallel.html | **B−** | One clear argument with real data; wrong HBM energy, misleading GPU anatomy, backwards mixed-precision reason, 2× NVLink slip, no tiling bridge |
| language.html | **B** | Honest figures (overfit, tiny transformer vs n-gram); no causal mask, tokens never built, no context term in 2N |
| scaling.html | **B** | Careful sourcing and real Epoch data; loss never made concrete, a fit with no data, KV drawer teaches the wrong bottleneck, stock mismatch |
| rules.html | **B** | Tactile relay figures; short, duplicates itself, asserts universality instead of showing it |
| index.html | **C+** | Careful labelling, correct arithmetic; a control panel more than an explanation; circular "inferred volume" lede |
| orbital.html | **C+** | The right questions; internally inconsistent (radiator, break-even), no sink temperature, 100× framed as if on trend |
| flip.html | **C** | Right arc and correct maths boxes; Landauer prose off by ~250×; litho/triode/dark-silicon sims contradict physics or cited data; ½CV² never built |
| factory.html | **C** | Exemplary MWh/€ numeracy; heat loop and power chain teach wrong physics; the grid half is prose and links |
| data.html | **C** | Valuable numbers; tap-to-read cards with no explorable; the funnel is not a funnel; Manhattan share off ~4× |
| verdict.html | **C** | The ledger format is right; model equation and verdict rule hidden; the calibration sentence fails arithmetic |
| yardstick.html | **D+** | Acronym wall; lede misstates the 55 TWh derivation and hides a 20–60× bottom-up/top-down gap |
| demand.html | **D+** | One figure, three of its four bars estimates; Jevons "shown" with mismatched numbers; silently rewrites meter prefs |

---

## Accuracy issue counts

Duplicates across parts are merged: the orbit-retirement and capacity-vs-average bugs live in the shared `model.js` and are counted once under "shared model"; index M9 is merged into the yardstick/index lede Critical. "Unverified/possible" items are not counted.

| Page | Critical | Major | Minor |
|---|---|---|---|
| flip | 1 | 6 | 14 |
| index | 1 (shared lede with yardstick) | 0 | 3 |
| shared `model.js` (index/orbital/verdict meters) | 0 | 2 | 0 |
| parallel | 0 | 4 | 9 |
| factory | 0 | 2 | 4 |
| scaling | 0 | 2 | 4 |
| language | 0 | 2 | 5 |
| model | 0 | 1 | 1 |
| data | 0 | 2 | 4 |
| yardstick | (same Critical as index) | 3 | 3 |
| orbital | 0 | 5 | 4 |
| verdict | 0 | 1 | 1 |
| demand | 0 | 1 | 4 |
| essay | 0 | 0 | 6 |
| rules | 0 | 0 | 3 |
| **Total (unique)** | **2** | **31** | **65** |

Changes made in verification:
- Part 4's C2 (Act 2 "100× needs no orbit") is **downgraded to Major** under orbital (see "Verification notes").
- The 55 TWh lede issue appears identically on index and yardstick and is counted once.

---

## Verification notes (what was spot-checked, what changed)

**Confirmed verbatim in `src/`:**
- **Landauer prose:** "about a million times above that; a DRAM read, a billion" (`flip.html:91`). Recomputed: 7.08e-13/2.87e-21 = 2.5×10⁸; 1.3e-9/2.87e-21 = 4.5×10¹¹.
- **The 55 TWh lede, on both pages:** "Scale by/that by today's inferred volume…55 TWh/yr" (`index.html:20`, `yardstick.html:20`). `model.js:5`: `M0 = 55 // DERIVED: 0.15 × 415 × 1.5 × 0.60`. 55 TWh ÷ 0.24 Wh ≈ 6.3×10¹¹ prompts a day.
- **Lithography:** `if (m > 0.12)` (`switchpost.js:425`, `litho3d.js:136`); `const immerse = … 'arfi' || … 'hna'` (`litho3d.js:109`); the readout prints "immersion film" for High-NA (`:162`). MTF at 38 nm/NA 1.35 recomputed at ≈0.017.
- **CMOS peek:** "no current runs from supply to ground" (`flip.html:63`); the comment "the lesson is the shoot-through current spike" (`peeks.js:17`).
- **Dark silicon:** `Math.SQRT2 ** -g`, and the NODES array puts "22 nm" at g = 4 (`switchpost.js:313,316`), giving 25% lit against the cited 79%.
- **Triode 3D:** `y = 0.15 + p.t * 2.0` with a small `rad` (`triode3d.js:176-178`).
- **HBM bar and readout:** 'fetch it from off-chip DRAM / HBM' at 640 pJ, and the readout "Fetching a number from HBM costs ${DRAM/MAC}×" (`parallelpost.js:270,278`).
- **NVLink:** `NVL = H[7]` (900 GB/s bidirectional) in scaleOut vs `BW = 450` in nvlinkPair (`parallelpost.js:284,316`). The text says "about 0.03 s over NVLink" (`parallel.html:132`).
- **GPU anatomy and mixed precision:** "every TPU and GPU on it is mostly these arrays" (`parallel.html:70`). "Their weights are nudged by noisy gradients anyway…" (`parallel.html:84`), with no mention of an FP32 master copy.
- **Power chain:** "much of the PUE overhead above 1.0" (`factory.html:83`) and the readout "the rest is the PUE overhead" (`peeks.js:308`).
- **Heat loop:** the forward pipes are `alpha(C.cyan, 0.55)` and the return is labelled 'warm return' (`factory.js:436,442`).
- **KV drawer:** "re-reads the key and value vectors… Batching helps" (`scaling.html:119`). `servingKV` plots KV only, with no weights term (`peeks.js:153-186`).
- **Momentum:** `LR = 0.06, BETA = 0.9` (`learning1.js:146`, `losssurface.js:38`). Valley `1.5(y−…)²` gives ∂²L/∂y² = 3, so ηλ = 0.18 < 1 and plain steps don't oscillate across the valley. The stop rule freezes a ball at first `L < 0.01`.
- **Attention:** `weights()` takes a softmax over all 10 keys with no mask (`learning2.js:140`). The prose says "'tired' confirms it" (`language.html:97`).
- **Data stock:** `STOCK = L10(4e14), LO = L10(1.3e14), HI = L10(2.1e15)` (`scalingpost.js:154`) vs "about 300 trillion" on data.html (`data.html:53`, `datapage.js:95`).
- **Manhattan comparison:** "average yearly spend … but about a fortieth of that project as a share of the economy" (`data.html:99`).
- **Act 2 growth:** "Epoch's recent ~26%/yr capacity growth" (`orbital.html:36`), against 13.5 → 31 GW in n2.
- **Radiator:** caption "100–200 km²" (`orbital.html:47`), prose and n5 "150–250 km²" (`:50`, `:93`), readout "comparable to the PV area" (`orbital.js:75`). Recomputed 455 W/m² → 110 km².
- **Launch caption and internal doc:** "Orbit wins… only near $100–200/kg" (`orbital.html:70`); "RESTRUCTURE-ORBITAL.md" appears in a caption (`:47`).
- **Orbit lifetime:** `orbitGW = p.launches * yrs * …` with no lifetime, vs `launchOnly … (5 * 8760 * 0.95)` (`model.js:104,116`).
- **Verdict calibration:** "~220 TWh of inference in 2030, on my 60% split of the IEA's ~950 TWh all-DC figure" (`verdict.html:31`); 0.6 × 945 = 567.
- **Jevons:** the "33× drop … 17% … Jevons shape" pairing is present (`demand.html:47`).
- **Collapse mechanism:** `boot.js:38` (`if (!isClosedPeek(el)) make(el)`), `peek.js:26` (build on `toggle`), and `peekcheck.mjs:28` (`if (r.canvases && r.w.some(x => x < 40))`, which passes vacuously when there are 0 canvases).

**Corrected or downgraded:**
- **Part 4 C2 → Major (orbital).** The page already says "The claim bites at 10³×–10⁴×" (`orbital.html:36`), offers 1,000× as a slider (`:22`), and says that at 1,000×/10⁴× "orbit can close a gap — if launches and mass per kilowatt cooperate" (`:75`). So the page is not hiding larger multiples. The valid point is narrower: it never tells the reader that 100× by 2035 (≈1.6×/yr) is far *below* the current growth trend. The review's stronger conclusion ("on trend, not enough even with orbit") rests on secondary-sourced growth rates (3.3×/yr compute ≠ power need) and is not adopted as a finding.
- **Model M4 (momentum)** is kept as Major, marked *plausible-strong*. The constants and stop rule are confirmed, but the analysis is linearised on a curved valley, and the 212/23 step counts were not reproduced (no shell). The "momentum oscillates across the valley" half follows from β = 0.9, ηλ = 0.18 (complex roots, |z| = 0.95).
- **Index M9** is merged into the yardstick/index lede Critical. Same text, same fix.

**Dropped:** none of the checked claims failed verification outright.

---

## Top-15 prioritised fixes

| # | Page | File + quote | Problem | Concrete fix | Effort |
|---|---|---|---|---|---|
| 1 | flip | `flip.html:91` "A modern GPU FLOP sits about a million times above that; a DRAM read, a billion" | Off by ~250× and ~450×. The figure below prints "246.6M×" and contradicts the prose | "…a few hundred million times above that (≈7×10⁻¹³ J); a 64-bit DRAM read (Horowitz, 45 nm) about 5×10¹¹." Add a "one gate switch ≈0.1–1 fJ" row; fix the `toFixed(1)+'M×'` labels to ×10ⁿ (`peeks.js:134,144`) | S |
| 2 | index + yardstick | `index.html:20`, `yardstick.html:20` "Scale that by today's inferred volume and you land near 55 TWh/yr" | 55 TWh is top-down (`model.js:5`, 0.15×415×1.5×0.6). Dividing by 0.24 Wh implies ~630 B prompts/day; 10 B prompts/day is <1 TWh/yr. The 20–60× gap is hidden | State both numbers: bottom-up chat ≈1 TWh vs top-down inference ≈55 TWh. Explain the gap (recsys/ads, API/agents, image/video, idle, mean≠median). On yardstick, build it as a lamp-to-planet ladder figure | S (text) / M (figure) |
| 3 | scaling | `scaling.html:119` "a model re-reads the key and value vectors of every earlier token… Batching helps"; `peeks.js:153-186` | At ordinary context, decode is memory-bound on **weights** (≈140 GB/token for 70B FP16, ≈42 ms), not KV (0.66 GB at 2k). Batching amortises weights, not KV | Rebuild `servingKV`: bytes/token = weights ÷ batch + KV(ctx), with context and batch sliders, HBM-time and tokens/s readouts, and a real bandwidth line. Rewrite the drawer prose | M |
| 4 | model | `model.html` §4 "the ball zigzags… The zigzags cancel out"; `learning1.js:146`, `losssurface.js:38` (`LR = 0.06, BETA = 0.9`) | Plain steps don't zigzag (ηλ_y = 0.18); the momentum ball does oscillate. The stop rule freezes momentum mid-flight, so "23 steps" means the first fly-through | Either set plain η so ηλ_y > 1 (η ≈ 0.4) or rewrite the prose (momentum wins by the ≈10× effective step along the floor). Stop rule: "within the floor for k steps". Cite Goh, Distill 2017 | S–M |
| 5 | language | `language.html:97` "'it' is looking for a creature, and 'tired' confirms it"; `learning2.js:140` softmax over all keys | No causal mask, which contradicts next-token training, the essay's `attention` figure and the peek tip | Mask keys after the query in `qkv`; add one sentence on the causal mask; reorder the example ("the tired cat… because it") | S |
| 6 | parallel | `parallelpost.js:270,278` 'fetch it from off-chip DRAM / HBM' 640 pJ; "HBM costs 139×" | 640 pJ/32-bit is 45 nm off-package DRAM. HBM2 is ≈3.9 pJ/bit ≈ 125 pJ/word (O'Connor MICRO 2017) | Relabel the bar "off-chip DRAM, 45 nm (Horowitz)"; add an HBM2 bar; fix the readout; add the bridge "H100 all-in ≈0.7 pJ/FLOP vs HBM ≈64 pJ per 16-bit number → ~100× reuse ≈ the ridge" | S |
| 7 | flip | `switchpost.js:425`, `litho3d.js:136` `if (m > 0.12)`; `litho3d.js:109` `immerse = … 'hna'` | An incoherent MTF at a 12% threshold refuses k₁ < 0.32, so ASML's 38 nm at NA 1.35 "does not print". The 3D figure gives EUV a water film and a glass lens, contradicting the page's own "vacuum and mirrors" | Two-beam/off-axis image (contrast flat until k₁ = 0.25), or a lower threshold plus a caveat. Immersion only for `arfi`; mirror stack and reflective mask for EUV/High-NA. Draw the 0/±1 orders against the pupil | M |
| 8 | factory | `factory.js:436,442` cyan forward pipes, 'warm return'; `heatloop3d.js:80-83` | Warm and cool legs are reversed; TCS and FWS are merged into one loop; die → plate is drawn as a pipe | Two loops sharing the CDU (TCS, FWS), warm orange and cool cyan, die → plate as a conduction arrow. Add one knob: facility water/outdoor temperature → dry cooler vs evaporative tower | M |
| 9 | factory | `factory.html:83` "much of the PUE overhead above 1.0"; `peeks.js:308` "the rest is the PUE overhead" | PSU and VRM losses (the two biggest stages) are inside IT load and invisible to PUE; cooling, the dominant overhead, is absent. Contradicts the page's own `mwhFlow` | Draw the IT boundary between PDU and PSU; add a cooling stage; correct the prose and readout; make the slider physical (load fraction or 12 V vs 48 V) | S |
| 10 | orbital | `orbital.html:36` "Epoch's recent ~26%/yr capacity growth"; headline 100× by 2035 | 13.5 → 31 GW is +131% in a year: 26%/yr is a strong-slowdown assumption, not "Epoch's recent". 100× in 10 yr ≈1.6×/yr is far below today's trend, and the page never says so | "Epoch's capacity roughly doubled in 2025; I assume growth slows to 26%/yr." Add a "today's trend" preset and the sentence "on current growth, 2035 is 10³–10⁴×" | S |
| 11 | shared model (index/orbital/verdict) | `model.js:104` `orbitGW = p.launches * yrs * …` vs `:116` `/(5 * 8760 * 0.95)` | Satellites never retire; 2050 orbit GW is overstated up to ~4× against the 5-year life used for cost | `Math.min(yrs, life)` with a life slider (default 5) | S |
| 12 | parallel | `parallel.html:84` "Their weights are nudged by noisy gradients anyway…" | Backwards: the cited Micikevicius paper keeps FP32 master weights and FP32 accumulation because small updates round away in 16 bits | "The multiplies tolerate 16/8/4 bits; the running sums and master weights stay in 32 bits, because a tiny update to a 16-bit weight rounds to nothing" | S |
| 13 | verdict | `verdict.html:31` "~220 TWh of inference in 2030, on my 60% split of the IEA's ~950 TWh all-DC figure" | 0.6 × 945 = 567, not 220. The accelerated-server step is missing | Show the chain: IEA accelerated servers (~62 TWh, +30%/yr → ~300 TWh in 2030) × 0.6 ≈ 180–220. Also put the model equation and the YES/NO/UNRESOLVED rule in prose; fix the static High-R2 cell (m1) | S |
| 14 | orbital | `orbital.html:47` "100–200 km²", `:50`/n5 "150–250 km²", `orbital.js:75` "comparable to the PV area"; `:70` "Orbit wins… only near $100–200/kg" | Three radiator numbers; the model gives 110 km², about 1/5 of the PV area (≈510 km²). The break-even caption contradicts the readout ($108–566/kg at 25 kg/kW). No T_sink. An internal doc name leaks into the caption | One number everywhere (≈110 km² ideal, ~130–180 with sink loading); "PV ≈ 5× radiator"; `flux = εσ(T⁴ − Tsink⁴)`; caption "beat cheapest at ~$100–200/kg, dearest at ~$500–1,000/kg"; delete "RESTRUCTURE-ORBITAL.md" | S |
| 15 | flip | `flip.html:63` "no current runs from supply to ground"; `peeks.js:17` "the lesson is the shoot-through current spike" | Teaches the minor term (short-circuit, ≲10–15%) as the lesson; omits CV² load charging, which the page is named after; "no current" denies the leak the next section is about | Add a load capacitor and a time view; rewrite as "only a tiny leak flows at rest; the real cost is filling the wire and next gate with charge, ½CV² each time". Build ½CV² with C/Vdd sliders before `joulesPerTick` | M |

**Next tier** (all verified or straightforward, mostly S):
- parallel M6: NVLink `NVL = H[7]/2`, "≈0.06 s", and "each GPU has its own 400 Gb/s".
- scaling/data M5: one stock figure, 3×10¹⁴ (90% CI 10¹⁴–10¹⁵).
- data M6: Manhattan "a tenth of its yearly share".
- language M2: add the context term to the 2N FLOPs/token rule.
- flip M3: relabel dark silicon as "generations after voltage stalled".
- flip M5: radial triode electrons.
- flip M6: restore the log I–V in mosfet3d.
- parallel M2: Tensor Cores ≠ most of the die.
- demand M5: pair Google with Google.
- data M7: rebuild the funnel in one unit.
- yardstick M3/M4/M10: M0 basis, R3 definition, one electricity basis.
- shared M8: capacity vs average power on the meter axis.

---

## Cross-cutting edification themes (what separates this from Bartosz)

1. **Asserted, not built.** Bartosz derives every key quantity on screen before he uses it: the watch derives 343:1 before showing gears. Here the core quantities arrive as statements:
   - ½CV² (flip), the Vdd/Vt trade-off (flip), tiling and on-chip reuse (parallel);
   - tokens (series-wide), loss in nats (scaling), "effective stock" (data/scaling);
   - the verdict's generating equation (verdict), primary/final/electricity (yardstick).
   - **Fix:** one small single-variable explorable per core quantity, placed before the first figure that depends on it:
     - a ½CV² bucket with C and V sliders;
     - Vdd/Vt sliders reading on-current and idle watts;
     - a tile-size slider moving a dot on the roofline;
     - a BPE stepper with tokens/word and bytes/token;
     - a −log p readout on one next-token distribution, converted to perplexity;
     - an epochs/growth slider for the data wall;
     - TWh(t) = M0·(U·T)^s(t)/eff(t) written once in prose, with an s(t) plot.
2. **Figures that display rather than discover.** Several sliders change nothing physical, or give a result readable from the caption:
   - powerChain's slider only highlights;
   - nvlinkPair only computes t = d/B;
   - the Landauer "Compare" slider is categorical;
   - heatLoop has orbit only;
   - laborMap, dataFlow and scaleLadder are tap-to-read cards;
   - demand's Wh bar is the token bar × a constant.
   - **Fix rule:** every control must be a physical variable, and the readout must show a consequence the reader could not compute in their head. Candidates:
     - a load fraction on powerChain;
     - a bandwidth ladder (SRAM → HBM → NVLink → network) on nvlinkPair;
     - temperature on Landauer;
     - facility water temperature on heatLoop;
     - an elasticity slider for Jevons on demand;
     - batch × context on servingKV.
3. **3D replaced 2D and lost the lesson.** In several places the default WebGL figure drops the very thing the prose points at:
   - mosfet3d has no log I–V plot or threshold slider, although the prose says "the logarithmic plot holds the problem";
   - factoryZoom 3D has no W/m² flux, although the prose is built on 860 kW → 2 kW per m²;
   - coolantFlow 3D drops the air-volume comparison (the 3,500× punchline);
   - litho3d adds an EUV water film;
   - triode3d moves electrons along the axis.
   - **Fix:** a parity checklist per 3D figure: every number the prose cites must appear in the 3D readout, and the physics must equal the 2D model's. Where the 3D figure can't carry the lesson, default to 2D (as already done for cmos/yield in Wave 10).
4. **Escalation and motivation between sections.** Bartosz ends each section by naming what is still broken. model.html does this (one line fails XOR → two lines → how to set hidden weights → backprop). Elsewhere sections are topical blocks:
   - data lists facts;
   - scaling states results, then shows fits;
   - yardstick, verdict and demand are ledgers.
   - **Fix:** a last sentence per section of the form "this still can't explain X", plus a first sentence of the next section that answers it.
5. **Undefined jargon and leaked internal language.**
   - Terms used without definition:
     - meters and verdict: "Amdahl's grey", "U/T levers", "Mid", "band", "tripwire", "joint solver", "UNRESOLVED";
     - yardstick: R1–R3, M0, STEPS, CPS, WEO;
     - orbital: AM0, F, ε and σ;
     - factory: PUE before its definition.
   - Developer notes in reader text:
     - "Nested LOD schematic. Fallback: plan-view zoom.";
     - "Without WebGL…";
     - "RESTRUCTURE-ORBITAL.md";
     - "mid-loop · drag to turn".
   - **Fix:** a jargon sweep: define on first use or delete; grep captions for LOD/WebGL/Fallback/`.md`.
6. **Cross-page consistency.** The same quantity carries different values on different pages:
   - public-text stock 400T vs 300T;
   - NVLink 900 vs 450;
   - world electricity 31,734 vs 28,200 TWh;
   - radiator 110 vs 150–250 km²;
   - attention causal on essay but bidirectional on language.
   - Orphan notes: flip n1/n2, scaling n9–n31, essay n6/n34.
   - The case-map cards promise content that is absent: Parallel's "1.4–1.6× a generation", Factory #grid's "solar, gas and nuclear".
   - **Fix:** move shared constants into `constants.js` with one cited value each. Add a check that every `#nX` is cited. Rewrite or fulfil the three cards.
7. **Calibrate toy models to the data they sit beside.**
   - dark silicon labelled with real nodes contradicts Esmaeilzadeh;
   - the litho threshold contradicts ASML;
   - the moePeek active fraction ignores shared parameters;
   - the sync-swing multiplies an instantaneous step by PUE.
   - **Fix:** a toy is fine if labelled "illustrative generations" or if it passes one calibration point stated in the caption.

---

## Figure/simulation fidelity summary

### Why `cmosInverter`, `landauerGap`, `memoryLadder`, `powerChain`, `servingKV` and `moePeek` render collapsed

All six sit inside closed `<details class="peek">` "look inside" drawers (flip, parallel, factory, scaling). By design they are **built lazily**:
- `boot.js:38` skips any figure inside a closed peek (`if (!isClosedPeek(el)) make(el)`).
- `peek.js:26` builds it on the drawer's `toggle` event (`if (d.open) onOpenFigs(d)`).

Until then, the `<figure>` contains only its raw `<figcaption>`, and `footer()` has not converted the caption into the "ⓘ data" toggle. The measured sizes are therefore just the caption height at the 603 px peek-body width:

| Figure | Measured | Caption lines |
|---|---|---|
| memoryLadder | ~603×21 | 1 |
| servingKV, moePeek | ~603×19 | 1 |
| powerChain | ~603×38 | 2 |
| landauerGap | ~603×38 | 1.5 |
| cmosInverter | ~603×78 | 3 |

`toggle` fires **asynchronously** (a queued task) after `open` is set. So any harness, screenshot, print view or no-JS reader that opens a drawer and measures in the same task sees the unbuilt state. In a real browser, clicking builds them within a frame: cmosInverter is 372 px tall, landauerGap 240 px. The figure code itself is fine (`sup`/`sig` exist, the registrations exist).

**Real consequences:**
- the drawer jumps when the canvas appears;
- print and reader mode show bare captions;
- `scripts/peekcheck.mjs:28` (`if (r.canvases && r.w.some(x => x < 40))`) passes **vacuously** when there are 0 canvases, so a drawer whose figure never builds would not be flagged;
- if a drawer is open before `app.js` runs (unlikely), the toggle is missed and the figure never builds.

**Recommended fix (S):**
1. **Reserve space.** Add CSS `.peek-body figure.fig[data-fig]:not(.built){min-height:250px}`. Better: build peek figures eagerly and defer only drawing; `Fig` already pauses offscreen through IntersectionObserver, so this is cheap.
2. **Close the race.** In `initPeeks`, add `if (d.open) onOpenFigs(d)`, and also build synchronously on `summary` `click`.
3. **Harden QA.** In `peekcheck.mjs`, require `canvases >= 1` and `clientHeight > 100` for every drawer that contains a `[data-fig]`, and await a rAF after setting `open`.

### Per-figure fidelity (condensed; full tables in the per-page detail)

| Status | Figures |
|---|---|
| ✔ **Correct physics/maths** | triode2d (Child–Langmuir, cutoff −12.5 V); mosfet2d (EKV, 71 mV/dec); cmosInverter2d (VTC, peak/rest ≈38k); joulesPerTick; yieldDie2d (Poisson, KGD chiplets); landauerGap constants; matmulGrid; roofline model; systolic (output-stationary); latencyHiding; precisionBits (except m6); coolantFlow ΔT = P/ṁc; mwhFlow; idleCost; powerLaw/threeKnobs (Hoffmann/Besiroglu params); tokensPerParam; frontierSlope; trainingBill; inferenceVsTraining; convFilter; overfit; nextWord; tinyVsNgram; twoLayers; backpropFlow gradients; flipEnergy; turingTape incrementer; Act 1 path (Mid 2035 = 486 TWh reproduced) |
| ✖ **Wrong physics or contradicts its text** | litho2d/3d (threshold; EUV immersion and lens; undiffracted rays); triode3d (axial electrons); darkSilicon (node labels); mosfet3d (no log plot; architecture-independent physics); cmosInverter (no CV² load); dataDistance (HBM = 2014 DRAM); scaleOut (NVLink 2×); heatLoop (legs reversed, one loop); powerChain (PUE boundary, no-op slider); servingKV (no weights term); qkv (no causal mask); sgdValley 2D/3D (dynamics vs prose, stop rule); dataFunnel (not a funnel, unstated units); orbital radiatorT4 (no T_sink, "comparable to PV"); ceilingMeter (orbit never retires; capacity on an "average power" axis) |
| ⚠ **Thin, cosmetic or fragile** | nvlinkPair (t = d/B; aria-label says 900); memoryLadder (1 MB top rung vs 50 MB L2); roofline slope overruns the axes (V100/A100); factoryZoom 3D (no flux); coolantFlow 3D (no air comparison); syncSwing (×PUE on an instantaneous step); moePeek (no shared params, no cost side); transformerBlock (embed = 7% of FLOPs, should be ≈0); scaleLadder (not log-proportional, order glitch); backpropFlow bar saturates; launchCost raw float readout; Landauer "M×" labels; `lossValley` 3D call without try/catch (`learn.js:57`); demand.js/yardstick.js write Act 1 prefs on first paint; yardstick Sankey electricity band reads as double counting; exposureField die not inside the field |

---

# Full per-page detail

The detail below is taken from the four part reviews and lightly deduplicated: the repeated collapse explanations are consolidated above, and the orbit-retirement bug is listed once. Locations, quotes, corrections and sources are kept. Severity labels are the part reviewers' own (P1-C1 etc.), except where this synthesis changed them (noted).

---

## Part A: index.html, flip.html (the-switch.html = redirect)

*Calibration (Part 1):* Mechanical Watch and GPS. Each section opens with the problem the previous one left unsolved; every number is derived in front of the reader; one knob per figure, physically faithful motion.

### Page status and wiring
- `index.html`: live hub. Figures: `verdictMeter`, `ceilingMeter`, `launchCost` (`src/figs/verdict.js` + `src/lib/model.js`), `caseMap` (`src/lib/casemap.js`).
- `flip.html`: live case-map card "The flip · the physical floor" (`casemap.js:11`), also linked from index §6. Figures:
  - `triode`, `mosfet`, `litho`: 3D via `three3d.js` → `src/three/triode3d.js`, `mosfet3d.js`, `litho3d.js`, with 2D fallbacks in `src/figs/switchpost.js`;
  - `cmosInverter`, `landauerGap`: `src/figs/peeks.js`, inside closed drawers;
  - `joulesPerTick`, `darkSilicon`: 2D;
  - `exposureField`, `yieldDie`: 2D only.
- `switches.js` is only used for `drawSwitch`/`drawLamp`. `relayLogic`/`relayCascade` are not on flip, yet flip's Final words and notes n1/n2 refer to relays (m12).

### Accuracy issues

#### Critical

**P1-C1. The Landauer gap prose is off by more than two orders of magnitude** (`flip.html:91`, #peek-landauer: "A modern GPU FLOP sits about a million times above that; a DRAM read, a billion"). *Verified.*
- **H100 FLOP:** 700 W ÷ 989 TFLOP/s = 7.1×10⁻¹³ J, and ÷ 2.87×10⁻²¹ J ≈ **2.5×10⁸**. The figure (`peeks.js:112`) prints "246.6M×", contradicting the prose.
- **DRAM read:** 1.3×10⁻⁹ J (Horowitz, 64-bit) ÷ 2.87×10⁻²¹ = **4.5×10¹¹**.
- **Corrected text:** "A modern GPU FLOP sits a few hundred million times above that (≈7×10⁻¹³ J); a 64-bit DRAM read (Horowitz, 45 nm) about 5×10¹¹ times."
- **Apples to oranges:** Landauer bounds irreversible bit erasure, and a BF16 FMA is hundreds to thousands of gate transitions. Add the energy per *gate switch* (~0.1–1 fJ ≈ 10⁴–10⁵ kT ln2).
- **Sources:** https://en.wikipedia.org/wiki/Landauer%27s_principle; https://www.nvidia.com/en-us/data-center/h100/; Horowitz ISSCC 2014.

**P1-M9 → merged into the series Critical with yardstick C1** (index lede: "Scale by today's inferred volume and you get my estimate… 55 TWh/yr"; n2 "230 trillion answers is 55 TWh ÷ 0.24 Wh"). The 55 TWh is top-down (note 3), and the "volume" is derived from it. 230 T median Gemini text prompts a year ≈ 630 B/day ≈ 28,000 per person per year. **Fix:** present it as prompt-equivalents, not a count, and show the bottom-up vs top-down gap (see Part D C1).

#### Major

**P1-M1. The litho figures (2D and 3D) contradict the page's own production numbers** (`switchpost.js:373-374,425`; `litho3d.js:16,26,136`; text "in production the best immersion scanner is specified at 38–40 nm"). *Verified.*
- Both models use the incoherent MTF with `if (m > 0.12)`, which corresponds to k₁ ≈ 0.32.
- ArF immersion at 38 nm half-pitch: v = 0.94 → MTF ≈ 0.018, so the figure shows "nothing prints" at ASML's shipping resolution and refuses the k₁ ≈ 0.3 the math box says factories use.
- Real tools use partially coherent off-axis illumination, which keeps contrast high to k₁ ≈ 0.27; 0.25 is the hard floor.
- **Fix:** a two-beam (off-axis) image model, or keep the incoherent MTF with a threshold of a few percent and a caveat.
- **Sources:** ASML NXT:2000i "38 nm (dipole), 40 nm (C-quad)", https://www.asml.com/en/products/duv-lithography-systems/twinscan-nxt2000i; C. Mack, *Fundamental Principles of Optical Lithography*, ch. 2.

**P1-M2. 3D litho gives EUV an immersion film and a glass lens over a transmissive mask** (`litho3d.js:109` `const immerse = TOOLS[ti].k === 'arfi' || TOOLS[ti].k === 'hna'`; `:162` "immersion film"; `:80-85` lens drawn for every tool). *Verified.*
- High-NA EUV is not immersion: water absorbs 13.5 nm light. EUV runs in vacuum with multilayer mirrors and reflective masks, which the page's own prose says.
- **Fix:** immersion only for `arfi`; a mirror stack and reflective mask (~6° incidence) for `euv`/`hna`. High-NA reaches 0.55 via larger mirrors and an anamorphic design.
- **Source:** https://www.asml.com/en/products/euv-lithography-systems.

**P1-M3. Dark silicon is labelled with real nodes but contradicts the cited study** (`switchpost.js:313-316`; `lit = √2^-g`). *Verified.*
- At g = 4 ("22 nm") the figure shows 25% lit / 75% dark; the next paragraph quotes Esmaeilzadeh's 21% dark (79% lit) at 22 nm. At "5 nm" it shows 6% lit.
- The cause is the model's assumptions: voltage frozen from 90 nm, C ÷ √2 per node, fixed clock. In reality Vdd still drifted (≈1.2 → 0.75 V) and clocks were cut.
- **Fix:** relabel the rail "generations after voltage stopped falling (0…8)", or calibrate.
- **Sources:** https://research.cs.wisc.edu/vertical/papers/2011/isca11-darksilicon.pdf; M. B. Taylor, DAC 2012.

**P1-M4. The CMOS peek teaches the minor term as "the lesson"** (`flip.html:63`; `peeks.js:17` "the lesson is the shoot-through current spike"). *Verified.*
- Short-circuit power is ≲10–15% of dynamic power. The dominant cost is load-capacitance charging: CV² drawn per cycle, ½CV² dissipated per transition. The figure has no load capacitor and no time axis, yet §3 then asserts "½CV² per flip".
- "No current runs from supply to ground" is false: the off-leak, which the next paragraph calls the problem "that ended the free lunch", is exactly that current at rest (20–40% of power at 90–45 nm).
- **Corrected text:** "…so only a tiny leak flows at rest; the real cost of a switch is filling the wire and the next gate's input with charge, ½CV² each time."
- **Source:** Rabaey, Chandrakasan & Nikolić, *Digital Integrated Circuits*, ch. 5.

**P1-M5. Triode 3D: electrons travel along the axis, not radially** (`triode3d.js:176-178`: `const y = 0.15 + p.t * 2.0; … m.position.set(Math.cos(p.a) * rad, y, Math.sin(p.a) * rad)` with `rad` 0.08–0.28). *Verified.*
- The cathode, grid helix (r = 0.5) and plate (r = 1.05) are coaxial, but particles move vertically inside the grid cage and never reach the plate. "Passing" electrons fly into the glass dome, and "turned back" electrons reverse at y ≈ 1.05 for every Vg.
- The 2D fallback is correct.
- **Fix:** radial motion from r = 0.14 to 1.05, with the turn-back depth growing as Vg goes more negative.

**P1-M6. The prose cites a log plot most readers don't see** (§2: "The logarithmic plot holds the problem that ended the free lunch"). With WebGL, the MOSFET figure is `mosfet3d`, which has no log I–V and no threshold slider. The only other log plot is in the closed CMOS drawer, so the page's central lesson (60 mV/decade) has no visible figure for most readers.

**P1-M7 → counted under "shared model"** (same bug as P4-M6). `model.js:104` `orbitGW = p.launches * yrs * LAUNCH_T * 1000 / p.kgkw / 1e6`, `yrs = year − 2029`. Satellites never retire, while the launch-cost figure assumes a 5-year life, so 2050 orbit GW is overstated up to ~4×. **Fix:** `min(yrs, life)` with a life slider (default 5). *Verified.*

**P1-M8 (shared model). The Act 2 meter axis says average power, but the need is rated capacity** (`verdict.js:195` "Average power, gigawatts (log scale)"; `model.js:88` B0_GW = 31.24, which the caption calls "rated capacity including cooling, not average draw"). "All electricity today" (3,219 GW) is an average, and 316 GW is extrapolated capacity, so the mismatch inflates AI vs world electricity by ~1/utilisation (~1.3–2×). **Fix:** label honestly or apply a stated load factor.

#### Minor
- **m1** Triode cutoff "a few volts negative" vs the model's −12.5 V (μ = 20, Vp = 250 V). Say "about ten volts negative".
- **m2** ENIAC's 17,468 were vacuum tubes of many types, not all triodes. Say "17,468 vacuum tubes". https://www.thenmusa.org/armyinnovations/innovationeniaccomputer/
- **m3** "Nothing heats, nothing moves" is misleading on a page about heat. Say "nothing needs a heater".
- **m4** "none is wider than a few dozen atoms": the gate length is, but the footprint (~45–50 nm × 100+ nm) is hundreds of atoms. Say "whose gate is only a few dozen atoms long".
- **m5** 60 mV/decade: add "for any transistor that lifts electrons over a barrier" (TFETs and NC-FETs are research exceptions).
- **m6** The gate insulator has been hafnium-based high-k since 45 nm (2007), not just "insulating glass".
- **m7** High-NA EUV has a 26 × 16.5 mm half field, so an 814 mm² die doesn't fit one field. https://www.asml.com/en/products/euv-lithography-systems
- **m8** Horowitz DRAM numbers are 45 nm DDR3-era; HBM3 is ~3–4 pJ/bit (5–10× lower). Say so in the caption.
- **m12** Flip notes n1/n2 (Shannon, Zuse) are orphaned; Final words refer to "Shannon's relays" though no relay is on the page.
- **m13** The yield slider runs to 30 mm (900 mm²), past the 858 mm² reticle limit (`switchpost.js:541`). Mark the limit.
- **m14** Poisson yield is pessimistic for large dies (fabs use negative-binomial or Murphy). One sentence.
- **m15** Landauer labels `(gap/1e6).toFixed(1)+'M×'` (`peeks.js:134,144`) produce 18-digit strings. Use ×10ⁿ.
- **m16** 3D MOSFET materials are all brass/brown (`mosfet3d.js:111-123`) while the prose colour-codes gate yellow, S/D blue and channel cyan.
- **m17** KrF NA 0.8 "late 1990s" should be ~2000–2002.

#### Minor (index)
- **m9** "Orbit clears the band only near $100–200/kg and ≲25 kg/kW": beating $0.065/kWh needs price × mass ≲ $2,700/kW ($100×25 or $200×13). $200×25 gives $0.12/kWh.
- **m10** The launch-cost readout prints a raw float (`verdict.js:290` `${p.usdkg} dollars`). Use `num()`.
- **m11** "FAA Starship cap is 145 launches a year" looks like a sum of per-site approvals (via Forethought). Attribute it as such. *Unverified.*

### Edification gaps (flip and index)
- **E1. ½CV² is never built.** Add a gate-capacitance (fF) and Vdd figure before `joulesPerTick`: the charge bucket fills, the readout shows ½CV² in fJ, then × activity × clock × transistor count = watts.
- **E2. The Vdd/Vt trade-off, the page's thesis, has no explorable.** Add Vdd and Vt sliders with two readouts: on-current (speed) and leak × 10⁹ transistors (idle watts). The reader discovers why voltage stalled near 0.7 V.
- **E3. The MOSFET "Peek" slider changes two variables at once** (`mosfet3d.js:307`): it morphs planar → FinFET → GAA *and* moves the cut plane, and the physics is identical across generations (NF = 1.2). **Fix:** split the cut from the architecture; make n depend on architecture (illustratively ~1.4/1.1/1.05); show the log I–V.
- **E4. The triode skips thermionic emission and space charge before Child–Langmuir.** Add a plate-current vs Vg curve with a moving operating point.
- **E5. Dark silicon hides why √2.** Show three factor bars (C ÷ √2; V fixed or falling; f fixed) multiplying to power per core, against the budget.
- **E6. Litho rays are undiffracted.** Draw the 0/±1 orders at sin θ = λ/pitch and the NA pupil; isolate pitch, then λ, then NA.
- **E7. exposureField draws the H100 square *next to* the field.** Put the die inside the field, add a High-NA half-field toggle, and optionally animate scan and step.
- **E8. Landauer peek.** The categorical slider, unlabelled decades and mixed units need fixing: label the decades, add a gate-switch row, and replace the slider with temperature.
- **E9. The index is a dashboard first.** Seven sliders, presets, a solver and two panels arrive at once, explained in a caption. "Band", "tripwire", "saturating demand" and the YES rule (central ≥ bar *and* low end ≥ bar/2 ≈ central ≥ 1.4× bar at u = 2) are not built. **Fix:** a step-through mode, or 3–4 small diagrams before the meter.
- **E10. The only log-scale leak plot is in a closed drawer.** Promote it, or fix M6.

### Figure fidelity (code-level)
- `triode2d` (`switchpost.js:208`): `max(0, vg + VP/MU)^1.5 / (VP/MU)^1.5`, cutoff −12.5 V ✓.
- `triode3d`: M5.
- `mosfet2d` (`:241,244`): S = 71.4 mV/dec ✓; EKV form ✓; on/off ≈ 2.5×10⁶. DIBL missing (one sentence).
- `mosfet3d`: E3, M6, m16.
- `cmosInverter2d` (`peeks.js:22-25`): bisection solve, VTC and shoot-through ✓; peak/rest ≈ 38,000 ✓; no load C (M4).
- `joulesPerTick` (`switchpost.js:286`): W/(N·f) from geometric means of different chip subsets (disclosed). Spot checks: 4004 ≈ 6×10⁻¹⁰ J, Prescott ≈ 2×10⁻¹⁶, EPYC 2020 ≈ 2.4×10⁻¹⁸ (÷1.55/yr before 2005, ÷1.33/yr after) ✓. Caveat: part of the decline is low-activity cache transistors.
- `darkSilicon`: internally consistent, wrong labels (M3).
- `litho2d/3d`: MTF formula ✓; threshold (M1); EUV immersion (M2); no diffraction (E6).
- `exposureField`: 26×33 mm and 814 mm² ✓; layout (E7).
- `yieldDie2d` (`:525`): `d0·π·15²` ✓; Poisson ✓; edge exclusion ✓; KGD `floor(good/4)` ✓; 90/45/82% ✓.
- `landauerGap` (`peeks.js:109-115`): constants ✓; labels (m15); prose (C1).
- `verdictMeter`/`model.js`: coherent. Caption arithmetic ✓ (0.15×415×1.5×0.6 ≈ 56; 1.4¹⁰ = 28.9; 108 GW; 3,219 GW; 19 TW; 1.74×10¹⁷ W; L☉ ratio 2.2×10⁹; 8.6 s). The YES rule is stricter than the card wording.
- `ceilingMeter`: M7, M8.
- `launchCost`: `usdkg·kgkw/(5·8760·0.95)` ✓; m10.

### Grades
- **index C+:** careful sourcing and correct arithmetic, but a control panel more than an explanation; two Act 2 modelling flaws; circular lede.
- **flip C:** the right arc and correct maths boxes, but Landauer prose wrong by ~250–450×; litho sims refuse ASML resolution and immerse EUV; dark silicon contradicts its paper; triode 3D electrons go the wrong way; mosfet3d drops the log plot; CMOS peek foregrounds shoot-through; ½CV² never built. Fixing these plus a Vdd/Vt explorable gives B+/A−.

---

## Part B: parallel.html, factory.html (ai-factory.html = redirect)

*Calibration (Part 2):* GPS and Internal Combustion Engine. One idea per section, each motivated by the previous model's failure; every slider changes one physical variable; numbers derived on screen; simplifications flagged; effects added one at a time.

### Nav promise mismatch (Major, edification; not counted as accuracy)
- `casemap.js:12` sells Parallel as "Why chips kept gaining 1.4 to 1.6× a generation, and when that ends". The page never discusses this.
- `casemap.js:14` sells Factory as "Can the world build the power, chips and cooling in time?".
- `casemap.js:21` sends "The grid: What the grid, solar, gas and nuclear can add by the date" to `factory.html#grid`, which has three paragraphs (Colossus, NERC, Ireland/transformers) and no build rates.
- **Fix:** change the cards or add the sections.

(Collapse of `memoryLadder` ~603×21 and `powerChain` ~603×38: see the consolidated explanation above. Part 2's additional findings: `peekcheck.mjs:15` sets `open` and waits 500 ms but checks only canvas width; drawers are at `parallel.html:100–108` and `factory.html:80–88`.)

### Accuracy issues

#### Major

**P2-M1. HBM is given 2014 off-chip DRAM energy** (`parallelpost.js:207–215, 270, 278`; the bar 'fetch it from off-chip DRAM / HBM' at 640 pJ; the readout "Fetching a number from HBM costs ${Math.round(DRAM / MAC)}×" = 139×; prose "a number travels from HBM (still DRAM dies beside the logic die)"). *Verified.*
- Horowitz's 640 pJ/32-bit (20 pJ/bit) is conventional off-package DRAM. HBM2 is ≈3.9–4 pJ/bit ≈ 125 pJ/word, about 5× less. The 45 nm FP32 MAC (4.6 pJ) sits against an H100 all-in ≈ 0.7 pJ/BF16 FLOP.
- The qualitative lesson survives; "HBM = 139×" does not.
- **Correction:** label "off-chip DRAM, 45 nm era (Horowitz)"; add an HBM2 bar (~125 pJ, O'Connor) or drop "HBM"; note the ratio stays near 100× at modern nodes.
- **Sources:** https://research.nvidia.com/publication/2017-10_fine-grained-dram-energy-efficient-dram-extreme-bandwidth-systems (PDF https://www.cs.utexas.edu/users/skeckler/pubs/MICRO_2017_Fine_Grained_DRAM.pdf); https://arxiv.org/abs/1506.02626.

**P2-M2. "every TPU and GPU on it is mostly these arrays"** (`parallel.html:70`). *Verified.*
- The H100 die is dominated by SMs (256 KB RF and 256 KB L1/shared each, CUDA cores, LSUs, schedulers), plus 50 MB L2, HBM PHYs and NVLink/PCIe. Tensor Cores are a minority, and they are not Kung–Leiserson systolic arrays. TPUs really are mostly array plus SRAM.
- **Correction:** "Every chip on the roofline gets its peak from such matrix units. Google's are large systolic arrays; Nvidia's Tensor Cores are smaller matrix units spread across the H100's 132 SMs, surrounded by registers and caches that feed them."
- **Source:** NVIDIA H100 architecture white paper, https://resources.nvidia.com/en-us-tensor-core.

**P2-M3. The mixed-precision explanation is backwards for weights** (`parallel.html:84`: "Their weights are nudged by noisy gradients anyway, and an error of a fraction of a per cent is lost in the noise."). *Verified; the paragraph never mentions master weights.*
- Micikevicius et al. (note 5) keep an FP32 master copy because small updates round away in FP16, plus FP32 accumulation and loss scaling.
- **Correction:** "The multiplications tolerate 16, 8, even 4 bits; the running sums and the master copy of the weights stay in 32 bits, because a tiny update added to a 16-bit weight would round away to nothing."
- **Source:** https://arxiv.org/abs/1710.03740 §3.1, §3.3.

**P2-M6. NVLink bandwidth is inconsistent between adjacent figures** (`parallelpost.js:316` `NVL = H[7]` vs `:284` `BW = 450`; `parallel.html:132` "about 0.03 s over NVLink"). *Verified.*
- Ring all-reduce `B` is one-way bandwidth, so the exchange comes out 2× too fast; it should be ≈0.062 s.
- **Fix:** `NVL = H[7] / 2`, and "about 0.06 s".
- **Related minor:** "400 Gb/s… from one server to another" (l.121) is per GPU in a DGX H100 (8 × 400 Gb/s = 3.2 Tb/s per server). The model `IB = H[8]/8` is right. Say "each GPU has its own 400 Gb/s (50 GB/s) link".
- **Source:** https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html.

**P2-M4 (factory). Power-chain losses are attributed to PUE** (`factory.html:83` "Stacked, they are much of the PUE overhead above 1.0"; `peeks.js:308` "the rest is the PUE overhead this page's megawatt-hour figure sizes"). *Verified.*
- PUE = facility energy ÷ IT energy measured at the IT equipment input. Server PSU and VRM losses (4% + 8%, the two largest stages) count as IT load, so PUE doesn't see them. Cooling, which the chain omits, is the dominant overhead (Google's 1.09 → 9% total).
- The chain also contradicts `mwhFlow`, which puts PSUs inside "servers".
- **Correction:** "The transformer and UPS losses are part of the PUE overhead; the power-supply and voltage-regulator losses happen inside the server and count as IT load… Most of the PUE overhead is cooling."
- **Sources:** ISO/IEC 30134-2:2016; The Green Grid WP #49 (2012).

**P2-M5 (factory). The heat-loop figure reverses hot and cold legs and merges two loops** (`factory.js:435–442`; `heatloop3d.js:80–83`). *Verified.*
- Forward pipes die → plate → CDU → outdoor are drawn cyan (`alpha(C.cyan, 0.55)`), and the return is labelled 'warm return' in orange. In reality plates → CDU is warm and the return is cool supply.
- Die → plate is conduction through TIM, not a pipe.
- Real DLC has two loops: TCS (plates ↔ CDU) and FWS (CDU ↔ tower or dry cooler), with the CDU as the exchanger between them.
- **Correction:** two loops sharing the CDU, warm orange and cool cyan, conduction arrow.
- **Source:** ASHRAE TC 9.9, *Liquid Cooling Guidelines for Datacom Equipment Centers*, 2nd ed. (2014).

#### Minor (parallel)
- **m1** "a few hundred operations per byte" (l.54): from the page's data, V100 ≈139, A100 ≈153, TPU v4 ≈229, MI300X ≈247, B200 ≈292. Say "about 140–300, rising each generation".
- **m2** "tens of thousands of threads" (l.80): H100 is 132 × 2,048 ≈ 270,000. Say "hundreds of thousands". https://docs.nvidia.com/cuda/cuda-c-programming-guide/
- **m6** The precision figure's `if (f.m <= 7)` (`parallelpost.js:185`) draws BF16 ticks as a smear while the caption says "too many to draw". Use `f.m < 7`. The E2M1 "worst 25%" understates (0.75 is 33%; subnormals are worse).
- **m7** The roofline slope is drawn outside the axes for V100/A100 (`parallelpost.js:63,65`). Clip, or set `y0 = 10.8`.
- **m8** The systolic figure is output-stationary while TPU v1 is weight-stationary; add one sentence. https://arxiv.org/abs/1704.04760
- **m9** The memory ladder's top on-chip rung is 1 MB (`peeks.js:75`), but the H100 has 50 MB L2. Relabel.
- **m10** "thousands of operations for every byte" (l.44) needs on-chip reuse (tiling). Say "over a thousand, if the chip can keep the numbers on-chip".
- **m11a** The `nvlinkPair` aria-label says 900 GB/s while the figure uses 450.
- **NVLink-server** "400 Gb/s from one server to another" is per GPU (see M6).

#### Minor (factory)
- **m3** "about as much as a small kettle" (l.20, 38): kettles draw 1.5–3 kW. Say "a microwave oven".
- **m4** syncSwing multiplies by PUE (`factory.js:530`), but cooling and building don't follow sub-second steps. Use N × ~0.7 kW × (1 − f) (≈8 MW instead of 16 MW at 16,384 GPUs, f = 0.3).
- **m5** Break-even framing: depreciation is sunk, so pausing saves only electricity and loses the compute. Add "Pausing saves the electricity but throws away an hour of work that cost at least this much hardware to produce."
- **m11b** Developer notes leak into reader text: "Nested LOD schematic. Fallback: plan-view zoom." (l.41); "Without WebGL, the earlier 2D cutaway… is used." (l.53); 'mid-loop · drag to turn'; heatLoop 2D readout "The megawatt-hour figure next sizes the same cooling as part of PUE".

**Unverified:** u1 "about 485 TWh in 2025 (+17%)" (factory.html:136); u2 NERC details (six dips in 82 s, 60.047 Hz, ~1,500 MW).

**Checked and correct:**
- 989.4 TFLOP/s, 3.35 TB/s, ridge ≈295; n/3 and n ≈ 900.
- 1 op per 6 B; decode ≈1 op/B.
- NVLink 900 total/450 each way; FP8 = 2× BF16; B200 FP4 = 4× BF16; E4M3 max 448; E2M1 has 15 values.
- Horowitz/Han values; TPU v1 65,536 MACs; Kung–Leiserson 1978; Williams et al. 2009; AlexNet; three HBM makers.
- 860 kW/m² vs ~2.1 kW/m²; water/air ratio ≈3,450; ΔT examples.
- 503–720 GPU-h/MWh; 140–200 MWh; 14–20 c and ~85 c/h; €666/MWh; break-even €611/€427.
- Llama 3 quotes; Ireland 22%/5%; Wood Mackenzie 30%; IEA 415/945 and 700–1,700 TWh in 2035.

### Edification gaps

**parallel**
- **E1.** The roofline uses "bandwidth/HBM" before §6 explains them. Move two sentences of the HBM paragraph to §2.
- **E2. Tiling is missing** (the biggest gap). n/3 needs all three matrices on-chip (3 × 4096² × 2 B ≈ 100 MB vs ~33 MB L1/shared + 50 MB L2). Add a tile-size b slider showing HBM bytes, SRAM needed (3b² × 2 B vs 228 KB/SM) and the dot moving on the roofline.
- **E3.** Systolic: add a "16 independent multipliers vs systolic" fetch counter (128 vs 32), plus fill/drain utilisation (64 of 160 cell-ticks = 40%).
- **E4.** Latency hiding: add Little's law (3.35 TB/s × ~0.5 µs ≈ 1.7 MB in flight). Warps hide latency but can't beat bandwidth. Define "core" = SM; 64 warps per SM is the real maximum.
- **E5.** Fewer bits: a "per-block scale" toggle (MX-style) on `precisionBits`.
- **E6.** Cost of distance: the 0.7 pJ/FLOP vs ~64 pJ per 16-bit HBM number bridge → reuse ~100 ≈ ridge 295.
- **E7.** nvlinkPair → a bandwidth ladder (SRAM → HBM 3.35 TB/s → NVLink 450 GB/s → network 50 GB/s).
- **E8.** Define "Amdahl's grey" (l.80, 127, 137).
- **E9.** scaleOut: an "overlap exchange with compute" toggle (max vs sum).

**factory**
- **E10.** 3D `factoryZoom` drops W/m² (`factoryzoom.js:621`). Add flux.
- **E11.** Heat loop has no variable. Add facility water/outdoor temperature → dry cooler vs evaporative (backs the water-use sentence, l.56).
- **E12.** The powerChain slider changes nothing (`peeks.js:303`). Use load fraction or 12 V/48 V, and draw the IT boundary.
- **E13.** Cold plate: extend to T_die ≈ T_in + ΔT/2 + P·R_th, restore the air-volume comparison in 3D, and mark ~1–1.5 L/min/kW on the slider.
- **E14.** #grid/#regions are prose and links. The NERC event is a natural swing-equation explorable. The promised build rates are absent.
- **E15.** PUE is used (l.72) before it is defined (l.74). Swap the paragraphs.

### Figure fidelity

| Figure | Verdict | Notes |
|---|---|---|
| matmulGrid | ✔ | `work = 2*N**3, data = 3*N*N*2` |
| roofline | ✔ model / ✖ drawing | `att = min(peak, bw*I)`; slope overruns (m7); "0.0897 TFLOP/s" cosmetic |
| systolic | ✔ | meeting tick i+j+k, T = 3n−2; utilisation missing |
| latencyHiding | ✔ qualitative | `util = min(1, W*CMP/(CMP+LAT))` → 21 groups; no bandwidth cap |
| precisionBits | ✔ mostly | roundTo correct (E2M1 0…6); m6 |
| dataDistance | ✖ M1 | `MAC=4.6, SRAM=5, DRAM=640` labelled "off-chip DRAM / HBM" |
| memoryLadder | ✔ values / ⚠ framing | m9; collapse explained above |
| nvlinkPair | ✔, thin | 450 ✓; aria 900; E7 |
| scaleOut | ✖ M6 | `NVL = H[7]` → `/2`; T1 ≈ 424 s ✓; ring formula ✓ |
| powerLadder 2D | ✔ careful | DGX dimensions; 3,125 × 40.8 kW = 127.5 MW vs 150 MW (≈1.18, worth stating) |
| powerLadder 3D | ⚠ E10 | no flux |
| coolantFlow | ✔ physics | ΔT = P/(ṁ·cp); 3D omits the air comparison |
| heatLoop | ✖ M5 | reversed legs, one loop, no variable |
| mwhFlow | ✔ | `it = 1000/pue`; GPU-h ✓ |
| powerChain | ✖ M4 | 0.839 ✓ arithmetic; wrong PUE boundary; no-op slider |
| idleCost | ✔ | €666/MWh ✓; framing m5 |
| syncSwing | ⚠ m4 | ×PUE |
| regionsTWh | ✔ | IEA series; CSV not re-verified |

3D figures fall back to 2D when `window.AIX3D` throws or is falsy. Not verified: whether the AIX3D bundle loads before `boot()`. With reduced motion, systolic starts finished.

### Grades
- **parallel B−:** one clear argument with real data and figures that share matrices, but M1/M2/M3/M6, no tiling bridge, thin nvlinkPair and memory ladder, and the card promise unmet.
- **factory C:** exemplary numeracy and sourcing, but heat loop and power chain teach wrong physics, 3D zoom drops flux, the grid half is prose, dev notes leak, nothing builds toward "in time?".

---

## Part C: scaling.html, data.html, language.html, model.html (learning.html = redirect)

*Calibration (Part 3):* Mechanical Watch. Each mechanism is earned through a stated problem; one variable per figure; terms defined right before use. model.html follows this pattern well, language in places, scaling often states and then fits, data mostly lists.

(Collapse of `servingKV`/`moePeek` ~603×19, and of `transformerBlock` on language: see the consolidated explanation above. Part 3 also recommends `if (d.open) onOpenFigs(d)` in `initPeeks`.)

### Accuracy issues (no Criticals)

**P3-M1 (scaling). The decode/KV drawer gives the wrong reason decode is memory-bound, and gets "batching helps" backwards** (`scaling.html:119`; `peeks.js:153-186`). *Verified.*
- At batch 1, a 70B FP16 model streams ≈140 GB of weights per token. KV is 327,680 B per context token (`peeks.js:161`, correct), which equals the weights only at ~430k tokens and is 0.66 GB (≈0.5%) at 2k.
- Batching amortises weights, not KV. KV grows with batch and becomes the bottleneck at large batch × long context, which is the real sense of "long agents fight it".
- The figure omits the weights term, and its readout leaves out the dominant ≈42 ms (140 GB ÷ 3.35 TB/s).
- **Correct statement:** each token streams every weight (≈2 B/param) plus its own KV (2·layers·kv_heads·head_dim·bytes per context token); batching shares the weight read but not the KV reads.
- **Sources:** https://arxiv.org/abs/2211.05102; https://kipp.ly/transformer-inference-arithmetic/.

**P3-M2 (language, scaling). "2 × active parameters per token" has no context term** (language lede and Final words; scaling §7; `transformerBlock` readout "≈ 2N FLOPs per token").
- Kaplan Table 1: C_fwd ≈ 2N + 2·n_layer·n_ctx·d_attn. For a Llama-3-70B shape at 128k: 2·80·131,072·8192 ≈ 1.7×10¹¹ > 2N ≈ 1.4×10¹¹. GQA cuts KV memory, not the QK/AV FLOPs.
- **Correct statement:** "≈2N at short context; at context n, each token also costs ≈2·layers·n·d_model for attention, overtaking 2N near n ≈ N/(layers·d_model), about 100k tokens for 70B."
- **Source:** https://arxiv.org/abs/2001.08361 §2.1.

**P3-M3 (language). Attention attends to future words** (`language.html:97` "'it' is looking for a creature, and 'tired' confirms it"; `language.html:116` "Every word's query can be compared with every word's key"; `learning2.js:140` softmax over all 10 keys). *Verified.*
- Decoder LMs use a causal mask. The essay's `attention` (`learn.js:274`) and the peek tip (`peeks.js:255`) say "earlier", so the series contradicts itself.
- **Fix:** grey out positions after the query; add one sentence on the mask; reorder the example ("the tired cat sat on the mat because it…"), or say it is BERT-style.
- **Source:** https://arxiv.org/abs/1706.03762 §3.2.3.

**P3-M4 (model). The momentum figure contradicts its prose** (`model.html` §4 "the ball zigzags while crawling… The zigzags cancel out"; `learning1.js:146` `LR = 0.06, BETA = 0.9`; `three/losssurface.js:38` the same; `valley.js:2` `L = 0.12(x−1.2)² + 1.5(y − 0.35 sin 1.7x)²`). *Constants and stop rule verified; dynamics plausible-strong (linearised, step counts not reproduced).*
- **Plain:** ∂²L/∂y² = 3 → ηλ = 0.18 < 1, so the cross-valley offset shrinks ×0.82 per step without changing sign. No zigzag.
- **Momentum:** z² − 1.72z + 0.9 = 0 has complex roots with |z| = √0.9, so the momentum ball oscillates. Its win is the ≈10× effective step along the floor.
- **Stop rule:** `if (s.done) continue` stops at the first L < 0.01 (`learning1.js:151`; `losssurface.js:48-49`), freezing the underdamped momentum ball mid-flight. "23 steps" means the first fly-through.
- **Fix:** η ≈ 0.4 for plain (so ηλ_y > 1), or rewrite the prose; change the stop rule to k consecutive steps in the floor, or keep animating.
- **Source:** https://distill.pub/2017/momentum/.

**P3-M5 (scaling vs data). The public-text stock differs between linked pages** (`scaling.html` §5 "an 'effective' 400 trillion tokens or so", band "130 to 2,100 trillion"; `scalingpost.js:154` `STOCK = L10(4e14), LO = L10(1.3e14), HI = L10(2.1e15)` vs `data.html:53`/`datapage.js:95` "about 300 trillion (90% ~100T–1,000T)"). *Verified.*
- Epoch: effective stock ≈300T, 90% CI 100T–1,000T (https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data). The arXiv v2's raw indexed web is 510T [95%: 130T, 2,100T]; 4×10¹⁴ is a Fig. 5 crossing point (https://arxiv.org/html/2211.04325v2).
- data.html is right. Scaling's band belongs to a different quantity.
- **Fix:** 3×10¹⁴ with its 90% CI on both pages; if the raw-web band is kept, label it and draw its 510T median.

**P3-M6 (data). The Manhattan comparison mixes a flow with a total** (`data.html:99` "about $6–7 billion a year — within shouting distance of the Manhattan Project's average yearly spend in 2025 dollars (~$8.5B), but about a fortieth of that project as a share of the economy"). *Verified.*
- $1.89B total = 0.84% of 1944 GDP, and ≈$6.6B/yr = 0.021% of 2025 GDP; the ratio of ≈39 compares a multi-year total with one year. On a yearly basis, the project was ≈0.21% of GDP, i.e. **~10×**.
- **Fix:** "…about a tenth of the project's yearly share of the economy (a fortieth of its whole cost)." Label `dataIndustry`'s readout (`flywheel.js:222`) as annual vs total.

**P3-M7 (data). The data "funnel" isn't a funnel** (`datapage.js:24-30`: Common Crawl PiB → one crawl → FineWeb 15T → FineWeb-Edu 1.3T → Llama 3.1 15.6T).
- The last stage widens and is not derived from FineWeb. PiB rows use `mass = s.v * 1e15 / 4` (`datapage.js:43`), an unstated conversion that is meaningless for raw WARC.
- **Fix:** one unit with a stated rule (≈4 B/token extracted text), FineWeb's per-stage survival, and Llama 3.1 as a separate bar.
- **Source:** https://arxiv.org/abs/2406.17557.

#### Minor
- **m1 (language)** LSTM 1997 had no forget gate ("what to keep"). That came in Gers, Schmidhuber & Cummins 2000 (https://doi.org/10.1162/089976600300015015).
- **m2 (language)** `transformerBlock` `COSTS = [1, 4, 8, 1]` (`peeks.js:228`) gives the embedding 7% of FLOPs, but a lookup is ≈0, while the unembedding ≈2·d·V is real. Call it "one forward pass".
- **m3 (language)** "each followed by a small network": the MLP is ~⅔ of the layer weights. Drop "small".
- **m4 (language)** `nextWord` caption cites #n24 for Alice; it should be #n20.
- **m5 (language)** convFilter: the horizontal filter "ignores its slanted stroke", but the response is ±1 vs ±3 (about ⅓ intensity). Say "responds only weakly to".
- **m6 (scaling)** Orphan notes n9–n31; data.html notes 14–15 point to "this page's industry figure", which no longer resolves.
- **m7 (data)** Common Crawl "presentation figures cited in public talks" is untraceable. Cite https://commoncrawl.github.io/cc-crawl-statistics/ or the dated newsletter.
- **m8 (data)** "on the order of months": the Llama 3.1 405B card gives 30.84M H100-h on up to 16,384 GPUs (≈2.6 months). Cross-check with trainingBill: 3.8×10²⁵ ÷ (989.4 TF × 0.405 × 3600) = 26.3M h, within 15%. https://huggingface.co/meta-llama/Llama-3.1-405B
- **m9 (scaling)** moePeek active = total × 2/E (`peeks.js:196`) ignores shared parameters. Mixtral is 46.7B/12.9B (≈28%) (https://arxiv.org/abs/2401.04088); DeepSeek-V3 671B/37B (https://arxiv.org/abs/2412.19437). The cost side ("routing and memory traffic") is never shown.
- **m10 (scaling)** Loss floor 1.69 has no units: nats/token on MassiveText.
- **m11 (data)** "one token in 1,800" uses 798.5 tokens per comparison (`flywheel.js:232`). State it.
- **m12 (data)** scaleLadder order (Llama 3.1 before FineWeb, `datapage.js:93-94`); the Pile is ~300B, not 340B (https://arxiv.org/abs/2304.01373).
- **m13 (scaling, data)** Undefined meter jargon ("U lever", "Act 1 slider… U and T").
- **m14** Post-cutoff claims (1.2 B weekly users, 2026 run-rates, Scale 2025 revenue) are unverified. Keep them presented as reported.
- **m15 (model)** Werbos 1974 vs 1982 (Schmidhuber). Consider "proposed it for networks in 1974 and applied it in 1982". *Possible.*

### Edification gaps
1. **Tokens are never built** (the largest gap). Add a BPE stepper in language §5 with tokens/word (≈1.3), bytes/token (≈4) and a vocabulary-size slider.
2. **Loss is never tangible.** Show −log p on one distribution, averaged over a passage; perplexity e^1.69 ≈ 5.4.
3. **`powerLaw` is a fit with no data.** Plot Besiroglu-reconstructed points, reveal the fit, and add the "10× removes X%" readout to the linear view.
4. **`threeKnobs`.** Add a 20-tokens/param marker so the Hoffmann-vs-replication twist is visible.
5. **Scaling §7 drawers are thin.** The "HBM bandwidth ~3 TB/s →" label (`peeks.js:172`) points at nothing. Put the reader in the server's seat (batch and context → tokens/s per user and per GPU against the roofline).
6. **Generation is sequential.** Add prefill/decode near `qkv`/`transformerBlock`.
7. **The data page has no variable-isolating figure.** Candidates: the data wall as stock ÷ growth with an epochs slider; Muennighoff 2023 (~4 epochs ≈ fresh, https://arxiv.org/abs/2305.16264); a MinHash dedup toy.
8. **"Effective stock"** is never explained.
9. **model.html:**
   - (a) a hidden-space (h₁, h₂) inset for `twoLayers` (the most valuable missing figure);
   - (b) chain-rule factors on edge select in `backpropFlow`;
   - (c) an inline step-size slider.
10. **Keep:** language overfitting (noise floor, test set), `tinyVsNgram` (the most Bartosz-like figure), and scaling's Hoffmann-vs-replication care.

### Figure fidelity

| Figure | File | Verdict |
|---|---|---|
| powerLaw | `scalingpost.js:28` | ✔ Hoffmann eq. 10; "10× removes ≈30%" |
| threeKnobs | `:57` | ✔ Besiroglu; 5.76e23 default |
| tokensPerParam | `:86` | ✔ real Epoch rows |
| frontierSlope | `:122` | ✔ 8-month halving |
| dataWall | `:150` | M5; least-squares fit honest |
| trainingBill | `:179` | ✔ €0.849/GPU-h; 503–720 GPU-h/MWh; ≈⅙ electricity |
| inferenceVsTraining | `:205` | ✔ 64 yr / 235 days; no context term |
| servingKV | `peeks.js:153` | ✖ weights term missing (M1); decorative bandwidth label; linear GB on log x |
| moePeek | `peeks.js:189` | ⚠ m9 |
| transformerBlock | `peeks.js:225` | ⚠ embed ≈0 (m2); no context slider |
| dataFunnel | `datapage.js:32` | ✖ M7 |
| scaleLadder | `datapage.js:98` | ⚠ not log-proportional; m12 |
| laborMap, dataFlow | `datapage.js:190, 255` | static cards |
| humanShare | `flywheel.js:234` | ✔ area scaling √(PRE/HUM) ≈ 42 |
| dataIndustry | `flywheel.js:175` | ✔ $33.8B line; basis M6 |
| flywheel | `flywheel.js:31` | illustration (random jitter) |
| convFilter | `learning2.js:15` | ✔ 144 outputs, 28,224; m5 |
| overfit | `learning2.js:59` | ✔ Legendre + ridge, test set |
| rnnMemory | `learning2.js:101` | ✔ toy; 0.8¹² = 6.9% |
| qkv | `learning2.js:138` | ✖ no causal mask (M3) |
| nextWord | `learning2.js:170` | ✔; m4 |
| tinyVsNgram | `learning2.js:201` | ✔ precomputed real model |
| xorLine | `learning1.js:22` | ≈ Rosenblatt (normalised weights, clamped handles); add a code comment |
| twoLayers | `learning1.js:55` | ✔ real 2-2-1 |
| backpropFlow | `learning1.js:92` | ✔ gradients; bar saturates at \|g\| > 0.115 (`:115`) |
| sgdValley | `losssurface.js:38-49`, `learning1.js:145-177` | ✖ M4 |

### Grades
- **model B+:** builds one concept at a time with correct maths and history; held back by M4 and the unshown hidden space.
- **language B:** strong, honest figures; held back by the missing causal mask, unbuilt tokens, no context term and no sequential generation.
- **scaling B:** accurate, careful sourcing, the bill checks out; held back by intangible loss, a fit without data, thin drawers, the wrong KV bottleneck, the stock mismatch and orphan notes.
- **data C:** valuable, cited numbers, but tap-to-read cards, a misleading funnel, the Manhattan share off ~4×, and "effective stock"/"token" unexplained.

---

## Part D: essay, yardstick, verdict, demand, rules, orbital (ai-factory.html = redirect)

*Calibration (Part 4):* GPS. Start flat and add one complication per section; analogy before term; one variable per figure; escalating sequences; maths optional, after the picture. essay and rules come close in spirit; yardstick, demand and verdict are ledgers; orbital sits in between.

Nav: rules, yardstick, demand, verdict and orbital (+#need, #star) are case-map nodes. essay is reached only from `index.html:86`, and its aside's "deeper posts are listed at the top of the page" list does not exist.

### Accuracy issues

#### Critical

**P4-C1 (yardstick; same text on index). The lede claims 55 TWh comes from scaling 0.24 Wh by volume** (`yardstick.html:20` "Scale that by today's inferred volume and you land near 55 TWh/yr"; `index.html:20` the same). *Verified.*
- `M0 = 55` (`model.js:5`) is a top-down IEA split, 0.15 × 415 × 1.5 × 0.60, and does not use 0.24 Wh. 55 TWh ÷ 0.24 Wh = 2.3×10¹⁴ prompts/yr ≈ 630 B/day. OpenAI reported ~2.5 B ChatGPT prompts/day (mid-2025); even 10 B/day across all providers × 0.24 Wh × 365 ≈ 0.9 TWh/yr.
- The 1–2 order-of-magnitude bottom-up/top-down gap (recsys/ads, API/agents, image/video, idle capacity, mean ≠ median) is the most instructive fact available, and the page skips it.
- **Correction:** "Google's median text prompt is 0.24 Wh; even ten billion of them a day is under 1 TWh a year. Yet a top-down split of IEA data-centre electricity puts AI inference near 55 TWh (40–80). Most inference energy is not chatbot text prompts."
- **Sources:** arXiv:2508.15734; https://www.axios.com/2025/07/21/sam-altman-openai-trump-dc-fed.

#### Major

**P4-C2 → downgraded to Major (orbital, verdict). The 100× headline sits far below the current trend and the page never says so** (`orbital.html:22,36,75`; verdict §2 and Final words).
- 100× in 10 yr ≈ 1.58×/yr. Epoch reports AI compute at ≈3.3×/yr since 2022 and AI DC power ≈2×/yr; the essay cites 4–5×/yr for frontier training.
- *Synthesis note:* the page does present 10³–10⁴× ("The claim bites at 10³×–10⁴×"; a 1,000× slider; "orbit can close a gap" at those multiples). The defect is the missing statement that 100× is a strong-slowdown case, not that larger multiples are hidden. The reviewer's "on trend, not enough even with orbit" (≈4,300 GW at 4,000× vs 316 + ~5 GW) depends on secondary-sourced growth rates; treat it as indicative.
- **Correction:** add a "today's trend" preset and the sentence "At today's growth (~2–3×/yr) 2035 is 10³–10⁴× today."
- **Sources:** https://epoch.ai/data-insights/ai-datacenter-power, https://epoch.ai/topics/data-centers; the secondary summary https://feedbagel.com/post/global-ai-computing-capacity-is-doubling-every-7-months. Exact figures possibly revised.

**P4-M1 (orbital). "Epoch's recent ~26%/yr capacity growth" contradicts the Epoch data quoted beside it** (`orbital.html:36`, n2; `model.js:88–89`). *Verified.*
- 13.5 → 31.2 GW is +131% in a year. 31.2 × 1.26¹⁰ = 315 ✓, but 26%/yr is a slowdown assumption.
- Epoch's ~30 GW is capacity, while the meter axis says "Average power".
- **Correction:** "Epoch's AI data-centre capacity roughly doubled in 2025 (to ~30 GW). I assume growth slows to 26%/yr, which gives 316 GW in 2035." Label B0 as capacity.
- **Source:** https://epoch.ai/data-insights/ai-datacenter-power.

**P4-M2 (verdict). The Mid calibration sentence doesn't add up** (`verdict.html:31` "~220 TWh of inference in 2030, on my 60% split of the IEA's ~950 TWh all-DC figure"). *Verified.*
- 0.60 × 945 = 567. 220 works only via accelerated servers: ~62 TWh (0.15 × 415) at +30%/yr ≈ 300 TWh in 2030, × 0.6 ≈ 180.
- **Correction:** "60% of the IEA's 2030 accelerated-server electricity (roughly a third of the 945 TWh total)", with the chain shown.
- **Source:** https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai.

**P4-M3 (yardstick). M0 is called "at the meter" but omits facility overhead; ×1.5 is unexplained** (`model.js:5`).
- Servers are ~60% of DC electricity per the IEA, so an accelerated-server share is server-level. Google's 0.24 Wh includes PUE and idle. Meter-level would be ×1.2–1.4 ≈ 65–75 TWh.
- ×1.5 (2024→2025) implies accelerated servers +50%, above the IEA's ~30%/yr.
- **Correction:** state the assumption; multiply by PUE or say "server-level"; quote the IEA "15%" sentence verbatim (*unverified on the IEA page*).

**P4-M4 (yardstick). R3 ("larger than any other single use of energy") is buildings heat at 17,200 TWh, but road transport is larger** (`model.js:18`).
- Transport 28% × ~450 EJ ≈ 126 EJ; road ≈ ¾ ≈ 90–95 EJ ≈ 25,000 TWh. Industrial process heat (~85–90 EJ) also exceeds buildings' 62 EJ.
- **Correction:** define "use", or show the sensitivity (17,200 vs ~25,000 TWh). The Mid verdict survives either way.
- **Source:** https://www.iea.org/reports/renewables-2023/heat (±10%, reviewer's arithmetic).

**P4-M5 (demand). The Jevons evidence pairs unrelated numbers** (`demand.html:47` "33× drop in energy per Gemini text prompt… data-centre electricity still rose 17%. That is the Jevons shape"). *Verified.*
- 33× is Google per prompt; 17% is IEA global DC growth. Jevons needs elasticity > 1 for the same service.
- **Correction:** pair Google with Google (≈+27% DC electricity in 2024, *from memory, possible*) and say "consistent with, not proof of, rebound".
- **Source:** https://sustainability.google/reports/google-2025-environmental-report/.

**P4-M6 → counted once under "shared model"** (= P1-M7): orbit capacity accumulates forever (`model.js:104` vs `:116`). Fix: `Math.min(yrs, 5)` or model replacement launches.

**P4-M7 (orbital). Radiator numbers disagree; no environmental heat load** (caption "100–200 km²" `orbital.html:47`; prose/n5 "150–250 km²" `:50,93`; readout `orbital.js:75` 110 km² "comparable to the PV area"). *Verified.*
- q = 0.9 × 0.85 × 5.67e-8 × 320⁴ ≈ 455 W/m² → 1,099 m²/MW → 110 km² at 100 GW.
- PV at 196 W/m² is ≈510 km², so the radiator is ~⅕ of PV area, not "comparable".
- A LEO radiator absorbs Earth IR and albedo: net flux εσ(T⁴ − T_sink⁴). With T_sink 200–250 K, the area rises ~15–60%. F = 0.85 is never explained.
- **Correction:** one number everywhere (≈110 km² ideal, ~130–180 with sink), "about a fifth of the PV area", and a T_sink term.
- **Source:** https://www.nasa.gov/smallsat-institute/sst-soa/thermal-control/.

**P4-M8 (orbital, verdict). The launch-cost caption contradicts its readout** (caption "Orbit wins on launch alone only near $100–200/kg and ≲ 25 kg/kW", `orbital.html:70`; readout `verdict.js:289`). *Caption verified.*
- At 25 kg/kW, break-even is $566/kg against the dearest ($0.34/kWh) and $108/kg against the cheapest ($0.065). At 13 kg/kW the dearest is ≈$1,090/kg.
- The band is labelled "grid" (`verdict.js:252`), but $0.34/kWh must include more than electricity (*unverified what Suncatcher counts*).
- **Correction:** "To beat the cheapest terrestrial cost on launch alone: ~$100–200/kg at ≤25 kg/kW. To beat the dearest: ~$500–1,000/kg." Rename the band "terrestrial cost per kW-year (Suncatcher)".

**P4-M9 (orbital). "~0.5 GW/yr at the implied mass" silently uses the heaviest mass** (`orbital.html:63`). *Verified.*
- 145 × 150 t = 21,750 t/yr → 1.7/0.87/0.54 GW/yr at 13/25/40 kg/kW, while the slider default is 25.
- "FAA cap of 145" is (possibly) the sum of site approvals (Starbase 25, LC-39A 44, SLC-37 76). *Unverified split.*
- **Correction:** "0.5–1.7 GW/yr across 40–13 kg/kW. 145 is the sum of current site approvals."

**P4-M10 (yardstick, essay). Two world-electricity bases.** Essay/`constants.js:15` use Ember 31,734 TWh (generation side); yardstick uses IEA 28,200 TWh (final). R1's 37,800 TWh (WEO 2035) must be on the same basis, otherwise it is ~10% high. State the basis and stay consistent.

**P1-M8 (shared model): capacity vs average** on the ceiling meter axis (see Part A).

#### Minor
- **m1 (verdict)** The static table shows High R2 as "NO", but `model.verdict()` gives UNRESOLVED (2,347 × 80/55 × 2 = 6,827 ≥ 6,000). The fallback contradicts the aside.
- **m2 (orbital)** "match the table in RESTRUCTURE-ORBITAL.md" in a caption (`orbital.html:47`, *verified*). Delete it.
- **m3 (rules)** "a factor of about 10¹⁵: billions of switches" is inconsistent (the essay says "a few hundred billion").
- **m4 (rules)** The Shannon 1937/Boole 1854 paragraph is repeated in §1 and §2.
- **m5 (essay)** §3 cites n4 (Zuse Z3), which the essay never mentions; n6 and n34 are uncited.
- **m6 (essay)** §12 "same improvement each time" should be the same *fractional* cut in loss.
- **m7 (essay)** §14 "power stations in reverse" needs explaining (a 1.5 GW load loss → frequency rises to 60.047 Hz).
- **m8 (essay)** §13: show $33,600/35,040 h = $0.96 ≈ €0.85 at 1.13.
- **m9 (essay)** "close to used up": give Epoch's median ~2028 (2026–2032). https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data
- **m10 (demand)** 1.2 B weekly users is sourced only via scaling note 32. Cite the primary (*unverified*).
- **m11 (demand)** Video at 2.4 kWh/clip: cross-check against MIT TR's ~0.94 kWh (https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/).
- **m12 (orbital)** "nearly around the clock": dawn–dusk SSOs get short eclipses around the June solstice.
- **m13 (orbital)** Landauer is "the long-run limit" only for erasure; mention reversible computing in the prose.
- **m14 (yardstick)** R2 "space cooling 2,900 TWh (2025)" cites an unverified IEA commentary (older ~2,000–2,100 TWh). Excluding motors (~10,400 TWh) roughly halves R2; show the sensitivity.
- **m15 (orbital)** AM0, derates, F (Turyshev-style), ε and σ are undefined.
- **(demand)** `demand.js:13–16` `wh` = 0.24 × tok/400 repeats the token bar; `tok: 400` implies ≈2.2 J/token, uncited.
- **(demand, yardstick)** `demand.js:120–121` and `yardstick.js:221–223` write Act 1 prefs on first `paint()`, so index/verdict flip to "custom" without input. Write only on user input.
- **(yardstick)** `yardstick.js:66–67` labels primary − final (41,800 TWh) "conversion losses", which also includes non-energy use and own use. Relabel.
- **(essay)** `lossValley` calls `window.AIX3D.lossSurface` with no try/catch (`learn.js:57`).
- **(rules)** `turingTape` (`switches.js:137–143`): with a gap (1 _ 1), `num()` joins non-blank cells and misreports.

**Checked and correct:**
- ENIAC 30 J/add; GPT-3 on ENIAC ≈82,000 yr of world electricity / ≈2×10¹² yr; GPT-3 on one H100 ≈61 MWh / ~10 yr; ~4×10¹³ gap; GTX 580→B200 ≈346×.
- DGX 10.2 kW → 503–720 H100-h/MWh; 140–200 MWh per 10⁵ GPU-h; 1 M H100 = 1.39–1.99 GW; Colossus ~150 MW; Ireland 22%; NERC 1,500 MW; IEA 415/945/485.
- Chinchilla vs Gopher; AlexNet; ILSVRC; 16.4/3.57 = 4.6×; Dennard maths; Amdahl 5% → 19.6× at N = 1000; η < 2/λ; full adder = five gates.
- 0.24 Wh = 8.6 s; 62 EJ = 17,222 TWh; 600.3 EJ = 166,750 TWh; 1.4¹⁰ = 28.9 → 108 GW; 1.74×10¹⁷ W; L☉ 3.83×10²⁶ W; 10⁶ × 31 GW ≈ 18% of insolation, ~1,600× human primary.
- 1.3–4 Mt, 8,700–26,700 launches; Mid-2035 486 TWh (reproduced from `model.run`).

### Edification gaps
- **essay** (closest to the bar):
  - add a "2020s gate" preset (~0.1–1 fF, 0.7 V) to flipEnergy;
  - build threshold leakage in §4 ("~10× per ~70 mV");
  - add a precision toggle on joulesPerOp;
  - add a stacked decomposition figure for "compute ×4/yr = efficiency × chips × hours";
  - expand §14 and Final words from notes into argument;
  - tie §14 to the Act 1 bars;
  - add the essay to the case map.
- **rules:**
  - show universality by swapping turingTape's rule table ("invert every bit");
  - add a gate-delay slider (ripple vs lookahead → max clock);
  - delete the duplicate Shannon paragraph.
- **yardstick** (weakest):
  - (1) a ×10 scale-ladder figure from one prompt to primary energy, each rung a sourced multiplier, which also exposes C1;
  - (2) define primary/final/electricity with one example;
  - (3) the Sankey's electricity band reads as double counting, and "Other elec. 31%" and the ×40 inset don't teach.
- **demand:**
  - a Jevons explorable (price/token slider, elasticity slider, total energy, showing the elasticity = 1 threshold);
  - one measured anchor for agentic tokens per session;
  - an agent-calls-per-request multiplier on U.
- **verdict:**
  - write TWh(t) = M0·(U·T)^s(t)/eff(t), capped by supply, in prose;
  - plot s(t): 63% of 2050 log-growth is done by 2035;
  - define "five levers/Mid/band/UNRESOLVED/joint solver"; the rule currently lives only in `model.js:60`.
- **orbital:**
  - build the radiator (double T → 16× flux; chip junction ~350 K → radiator ~320 K; T_sink);
  - add ε and T_sink sliders;
  - most valuable missing figure: a one-satellite energy balance (sun → PV 20% → compute → radiator) with areas to scale.

### Figure fidelity
- `orbital.js:9` `const flux = T => EPS * VIEW * SIGMA * T ** 4;` has no environment term; it should be `EPS*SIGMA*(T**4 - Tsink**4)`. `orbital.js:75` says "comparable to PV".
- `model.js:104`: orbit never retires.
- `model.js:88–89`: capacity labelled "Average power" (`verdict.js:195`); 316 = a 26%/yr assumption.
- `model.js:40–53` Act 1 path ✓ (486 TWh). Caveats:
  - (a) the shared saturating `sOf` (SHAPE_K = 2) gives s(2035) = 0.64;
  - (b) the supply cap is a geometric interpolation, not a build-rate constraint;
  - (c) inference only, no training energy. The verdict should repeat this.
- `model.js:55` band ÷2.75/×2.91 at u = 2 is asymmetric and undocumented.
- `model.js:5`: M0 is server-level (M3).
- `demand.js:13–16` redundant Wh; `demand.js:120–121`/`yardstick.js:221–223` first-paint pref writes.
- `yardstick.js:145–146` electricity band reads as double counting; `:66–67` "conversion losses" label.
- `verdict.js:251–252` band labelled "grid".
- `switches.js:237` flipEnergy ✓ (½CV² per transition), but the 5 V/10 fF defaults are TTL-era.
- `switches.js:137–143` turingTape gap misreport.
- `chips.js:75` ENIAC ops = 10-digit decimal additions (labelled).
- `scale.js:117` clusterGrid drag uses fixed PUE 1.3 vs the 1.09–1.56 band (cosmetic).
- `peeks.js:161` KV 327,680 B ✓.
- `peeks.js:271–277` powerChain: unsourced losses, PUE conflation (= P2-M4).
- **Possibly empty:**
  - `lossValley` has no try/catch;
  - the verdict ledger relies on JS, and its static cells carry m1;
  - yardstickBars and tokensLadder render immediately and are fine.

### Grades
- **essay B+:** a progressive build with faithful figures and numbers correct to the digit; §13–14 are compressed, threshold leakage is unbuilt, the closing reads as notes, and the page is orphaned.
- **rules B:** clear and tactile but short; duplicates itself; asserts universality; no speed/carry explorable.
- **orbital C+:** the right questions and honest ranges; inconsistent internally (radiator, PV, break-even, 26%/yr); no T_sink; undefined jargon; leaked doc name; the 100× framing flatters the verdict.
- **verdict C:** a live ledger, but the equation and rule are hidden, the calibration fails arithmetic, and the static table contradicts the aside.
- **yardstick D+:** acronyms and numbers; the lede misstates the 55 TWh derivation and skips the 20–60× gap; R3 is contestable; the Sankey is opaque; no lamp-to-planet build.
- **demand D+:** one figure with guessed bars; mismatched Jevons pair; no mechanism explorable; silently rewrites meter prefs.

---

*End of review. Part reviews: `/workspace/opus-review/part1.md` … `part4.md`. Only this file was written. No other repo files were modified, and git was not run.*
