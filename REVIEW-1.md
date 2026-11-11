# REVIEW-1 — independent adversarial pass over *How Machines Learned* (6 pages)

Reviewed 19 October 2026 (Europe/Berlin) against commit `9c089cd`. Earlier self-checks in STATUS.md were not
trusted: every derived number below was recomputed, ~12 sources were re-read at the source, and every figure was
driven programmatically at its extremes at 390 and 1280 px.

Tags: **[wrong]** factually or arithmetically wrong · **[inconsistent]** disagrees with another page/figure ·
**[broken]** figure misbehaves · **[unsourced]** claim stronger than its source · **[prose]** · **[nitpick]**.
Status: ✅ fixed in this pass · ⏳ open (judgement call or redesign, listed, not done).

## Counts

| severity | found | fixed | open |
|---|---|---|---|
| wrong | 6 | 6 | 0 |
| inconsistent | 7 | 6 | 1 |
| broken | 6 (covering 17 figure instances) | 6 | 0 |
| unsourced / overstated | 5 | 5 | 0 |
| prose | 8 | 6 | 2 |
| nitpick | 5 | 3 | 2 |
| **total** | **37** | **32** | **5** |

Plus 5 Ciechanowski-bar redesigns and 3 stand-in recommendations (all open, by design).

## Wrong

1. ✅ **[wrong]** Essay §5: GPT-3 on ENIAC was “about **80 years** of all the electricity the world now generates”.
   3.14×10²³ FLOP × 30 J = 9.4×10²⁴ J = 2.6×10¹⁸ kWh; world generation 31,734 TWh/yr → **≈82,000 years**. The
   joulesPerOp figure already said 8.2×10⁴ years, so prose and figure disagreed by 1,000×. → “about 80,000 years”.
   (Other numbers there check: ≈2 trillion years on ENIAC; H100 ≈62 MWh and ≈10 years; energy ratio ≈4.2×10¹³.)
2. ✅ **[wrong]** Essay §13: H100 at $33,600 over four years ≈ 85 c/h “before **the rest of the server** and the
   building”. $33,600 *is* one-eighth of the $269k DGX server (ml_hardware.csv source note), so this double-counted.
   → “one H100’s share of a DGX server … before the building”. Scaling §5 and AI Factory already used it correctly.
3. ✅ **[wrong]** Essay §13 + note 13: “Epoch AI puts an H100 at about $33,600”. Epoch records an analyst figure for
   the per-GPU share of a server (and the same note gives ≈$24.4k for GPUs+baseboard alone). Note rewritten to say so.
4. ✅ **[wrong]** Essay §1: “every change flips **a dozen or more** of the little switches”. Enumerated every
   single-bit change of the 4-bit ripple adder (16×16×8 cases): mean **4.3** gate flips, max **13** of 20, ≥12 in
   only 1.6% of cases. → “two to five usually, and up to thirteen of the twenty when a carry ripples all the way”.
5. ✅ **[wrong]** AI Factory §1: an 814 mm² die is “a little larger than a **thumbnail**”, heading “on a
   **fingernail**”. 8.1 cm² ≈ a postage stamp. Both fixed (heading + TOC).
6. ✅ **[wrong]** AI Factory §4: Llama 3’s 1–2 % daily throughput rhythm came “as the outside temperature changed the
   cooling”. Meta: “higher mid-day temperatures impacting GPU dynamic voltage and frequency scaling”. Rephrased.

## Inconsistent

7. ✅ AI Factory byline “part 6” → “part 5” (series nav: Essay, 1–5).
8. ✅ Essay “Every large language model since is built on [the transformer]” vs Learning “Nearly every” → “Nearly every”.
9. ✅ Timeline ENIAC 1945 vs prose “announced 1946” → 1946.
10. ✅ gpuMWh tagged “Real data” on AI Factory, “Real data + model” on the essay → both “Real data + model” (PUE is chosen).
11. ✅ Essay intro: companion posts “will appear as they are written” — all five are live. Removed.
12. ✅ tokensPerParam readout said “as the 2020 scaling recipe advised” for 2018 models → era-aware wording.
13. ⏳ The Switch mosfet readout normalises “fully on” to a 1.0 V gate while the supply is 0.7 V (so “at 0.70 V … 16 %
    of fully on”). Not wrong, but the reader has two different “on”s. Suggest normalising to the 0.7 V supply.

## Broken (figures)

14. ✅ **rAF loop multiplication (CPU).** `Fig._frame` re-queued a frame even when `step()/draw()` had already queued
    one via `invalidate()`, so loops doubled while a figure was on screen: lossValley ran **5,540** callbacks/s,
    turingTape 486 (should be ~60). Off-screen was fine (IntersectionObserver stopped them). Fixed in `fig.js`; every
    animated figure now measures 56–63 rAF/s in view, ≤3 rAF/s and 0.1 % CPU on every page when scrolled away
    (`scripts/_cpu.mjs`, all 6 pages; tinyNet/live training included).
15. ✅ **Phone scroll trap.** Eleven horizontal-scrub or tap figures (dennard, computeTrend, joulesPerOp, joulesPerTick,
    roofline, scaleOut, powerLaw, threeKnobs, tokensPerParam, dataWall, nextWord) called `preventDefault` on
    8 of 9 touch-start points, i.e. a vertical swipe on a 330–534 px canvas did not scroll the page. New `panY`
    interaction mode: never claims the touch, `touch-action: pan-y` lets vertical swipes scroll, sideways drags and
    taps still scrub (verified with CDP touch events, `scripts/_touch.mjs`, `scripts/_tdrag.mjs`). Remaining
    claimants (≤5/9) are rails or handles.
16. ✅ **e-notation in readouts** at extremes (audit only tested one slider at a time, never pointer drags):
    dennard “5.4e+2 MHz”, scaleOut “4.2e+2 s”, threeKnobs “1.7e-7 per parameter”, joulesPerOp “3.86e+3 years”,
    clusterGrid “1.2e+2 GWh”. Added `sig()` (chips.js) and replaced every bare `toPrecision` in readouts.
17. ✅ **Pointer before first draw** threw `Cannot read properties of undefined (reading 'X')` (learning page, flaky).
    `fig.js` now ignores pointer/touch until the figure has drawn once.
18. ✅ **Label collisions** found by dragging out of bounds: systolic “inputs flow in →” over input digits (390);
    latencyHiding “arithmetic units” over rail label with ≥12 thread groups (1280); inferenceVsTraining “answering
    users” over the x ticks and struck through by its own line, “training, once” struck through when serving
    dominates. All repositioned; verified by eye (screenshots below).
19. ✅ **Readouts that say nonsense at the ends**: manyHands “caps the gain at no limit”; dennard “1 cores”;
    darkSilicon at 0 generations “each flip costs only 100 %… only 100 % can be on”; scaleOut at 1 GPU “1× faster,
    100 % of perfect, 0 s exchanging gradients over NVLink”; dennard year 2021.5 rounding to “2022” (no data).

## Unsourced / overstated

20. ✅ “chips … more efficient, a few times per generation” → “by a factor of nearly two per generation”
    (dense 16-bit ops/J, Epoch data: V100→A100 1.9×, A100→H100 1.8×, H100→B200 1.6×).
21. ✅ “a trillion multiplications and additions per joule” — H100 is 1.41×10¹² FLOP/J ≈ 0.7×10¹² multiply-adds →
    “more than a trillion operations per joule”.
22. ✅ Parallel “training them on one [GPU] would take decades” → centuries (Llama 3.1: 26 M H100-hours ≈ 3,000 years).
23. ✅ AI Factory “which is where a data centre’s water use comes from” → “much of” (power-plant water, humidification).
24. ✅ “shortfall … of **large** power transformers” — Wood Mackenzie (14 Aug 2025) says power transformers (30 %) → fixed.

## Prose

25. ✅ Essay flip energy: “each time it fills or empties, half the energy the tank gives up is lost” muddled the two
    halves → filling loses half, emptying dumps the stored half, so a full cycle costs charge × height (= CV²).
26. ✅ “roughly a hundred watts or so” → “roughly a hundred watts”.
27. ✅ Learning “Through the 1990s and 2010s” → “From the 1990s through the 2010s”.
28. ✅ Switch “falls by ten for every 60–70 mV, and no further” → “and it cannot fall faster”.
29. ✅ Switch dark silicon: “30 % less energy to flip, not 50 %” → power per transistor at the same clock vs the 50 %
    needed to keep chip power flat (matches the figure’s √2 model).
30. ✅ Learning “Rosenblatt proved it always would” → the convergence theorem, Rosenblatt and Novikoff, 1962 (note 2
    already cites Novikoff).
31. ⏳ Duplication across pages: the NERC Virginia 1,500 MW event is told in essay §14 and AI Factory §6; PUE is
    explained in essay §13 and AI Factory §3; gpuMWh appears on both. Suggest the essay keep one sentence + xref.
32. ⏳ powerLadder Colossus readout repeats itself (“100,000 H100s … 100,000 GPUs in all”).

## Nitpick

33. ✅ Babbage 1822: the *Astronomical Society* (Royal only from 1831).
34. ✅ de Forest “patented … in 1907” → filed 1907 (granted 1908, as note 3 says).
35. ✅ dennard caption now gives the units on the shared log axis (thousands of transistors, MHz, W, cores).
36. ⏳ Litho: 36 nm is the k₁ = 0.25 theoretical floor for ArF immersion; practical single exposure is ≈38–40 nm.
    The readout already says “in practice, factories stop a little above that”; prose could give the number.
37. ⏳ inferenceVsTraining uses a linear y axis: at a billion users the training line is flattened onto the axis.

## Verified OK (recomputed)
57.4 % US / 17.4 % CN of 540 models; compute fits ×1.50/yr pre-2010 (≈20-month doubling), ×4.29/yr since (≈7×10⁸ over
14 yr); frontier ×4.6/yr (72 models); data wall ×2.73/yr, crossing 2029 (31 models); Llama 3.1 38.5 tok/param;
GTX 580→B200 347×; 503.0 and 719.6 GPU-h/MWh; idle break-even €666 (€611/€427 grid price at PUE 1.09/1.56); coolant
3,460×; Alice 6,873 tokens, 78 % of word pairs once, 81 % of 2-word contexts single follower; Dennard/dark-silicon
math; yield; XOR proof; conv 28,224; matmul 8.8 T ops / 1.61 GB at 16k; roofline ridge 295; all-reduce 0.03/0.56 s;
Hoffmann/Besiroglu constants; 30 % per 10×; ILSVRC errors; Amdahl 19.6×; 0.8¹² decay; trainingBill 26.3 M H100-h,
36.6–52.4 GWh, €22.4 M hardware; inference 6.4 yr / 235 d / 2 d; regionsTWh 427/279/107 TWh, 78 % of growth;
clusterGrid 3 M H100 → 4.2–6 GW, 8.8–13 % of 2024 DC use; Cray-1 1,390 ops/J.

## Sources spot-checked (12) and licences
| source | claim checked | result |
|---|---|---|
| Villalobos et al., arXiv 2211.04325 | stock ≈4×10¹⁴ tokens, median 2028, 2026–2032 | ✅ |
| Wood Mackenzie press release 14 Aug 2025 | 30 % power-transformer deficit, demand +116 % since 2019 | ✅ (wording fixed) |
| NERC incident review (Virginia) | 6 faults in 82 s, ≈1,500 MW, 60.047 Hz | ✅ |
| Epoch ML hardware CSV | H100 $33,600 = DGX share; BOM ≈$24.4k | ✅ (attribution fixed) |
| Meta, *The Llama 3 Herd of Models* | 16k H100 at 700 W; “tens of megawatts”; diurnal 1–2 % via DVFS | ✅ (cause fixed) |
| IEA *Energy and AI* (10 Apr 2025) | 415 TWh, 1.5 %, US 45 %/CN 25 %/EU 15 %, ≈12 %/yr since 2017, ≈945 TWh 2030, US ≈half of growth; **CC BY 4.0** | ✅ |
| TOP500 June 2026 | Frontier 1.353 EF, 24,607 kW (now #3) | ✅ |
| Uptime 2024 survey / Google | PUE 1.56 / 1.09 | ✅ |
| Cornell Chronicle 2019 | July 1958, IBM 704, 50 trials, NYT headline | ✅ |
| TSMC 4Q25 call | N2 volume production Q4 2025 | ✅ |
| LBNL 2024 report | 58 TWh 2014 → 176 TWh 2023 (4.4 %), 325–580 TWh 2028 | ✅ |
| Epoch data pages | CC BY (models + hardware) | ✅ |
External links: 48 unique, 46 return 200; umich.edu and hpcwire.com return 403 to bots only (not dead).

## The Ciechanowski bar — weakest five figures, with concrete redesigns (open)

1. **attention (essay §9)** — one sentence, weights chosen by hand, arcs only from the selected word. It *tells* you
   attention exists rather than letting you discover what it does. **Redesign:** precompute real attention from a
   tiny transformer (2 layers × 4 heads, ~1–3 M params, trained offline on public-domain Gutenberg text incl. Alice
   — the same corpus nextWord uses), 15–20 sentences shipped as ~30 KB JSON. Reader picks sentence, layer and head;
   heads visibly specialise (previous-token head, “it→noun” head, punctuation sink). Hover any word to see its row;
   a small matrix view beside the arcs. Caption names the model and its size. Tie to learning qkv (“this is the
   softmax you built there”).
2. **imagenet (essay §8)** — a scoreboard: 100 placeholder tiles with ✕s and a year rail; the error rate is real
   but the “photos” are geometric shapes, so the reader sees nothing about *what* was hard. **Redesign:** 24 CC0 /
   public-domain photos (Wikimedia Commons, Open Images CC BY) with top-5 guesses from AlexNet-, VGG- and ResNet-class
   models precomputed offline (torchvision weights, BSD), so dragging the year flips specific photos from wrong to
   right; plus a second panel: error vs training compute on a log axis (the scaling story in miniature).
3. **regionsTWh (AI Factory §7)** — five static bars with three stops. **Redesign:** a stacked-area 2015–2035 with
   the IEA Base case and a shaded Lift-Off/Headwinds band; a “compare with” selector that lays the 2030 increment
   over countries’ whole electricity use (Japan, Germany, Ireland) and the Ireland 22 % line; hover gives TWh and
   share. Same CC BY data.
4. **powerLadder (AI Factory §1)** — counts squares; the jump from chip to campus is 5 orders of magnitude but
   reads as six similar pictures. **Redesign:** one continuous Powers-of-Ten zoom (die → board → DGX → rack →
   hall → campus) driven by the log power rail, each level drawn to scale inside the previous, with W/cm², kW per
   rack and MW per site annotated, and the heat-flux comparison (≈86 W/cm² vs a hob ≈10 W/cm², sunlight 0.1)
   shown as the zoom passes the die.
5. **gpuMWh (essay §13 and AI Factory §3)** — the same tile grid twice; the second appearance adds nothing.
   **Redesign for AI Factory:** a Sankey of one MWh from the meter: transformer and UPS losses → cooling →
   servers → GPU vs CPU/network/fans, with the PUE slider widening the overhead branches and a
   utilisation slider showing idle draw; the essay keeps the simple tiles.
   (Runner-up: inferenceVsTraining should switch to a log y or a “days to match training” rail — item 37.)

## Stand-ins — recommendation
- **Hand-set attention → replace** (highest value): real attention from a tiny model precomputed offline, as in
  redesign 1. Train on CPU in under an hour; ship weights’ attention maps only (no model in the page). Label it
  “real attention from a 2-layer, 4-head model with N parameters trained on …”.
- **ImageNet placeholder tiles → replace or relabel**: ImageNet photos themselves cannot be republished; CC0/CC BY
  photos with precomputed model guesses are licensable. If not done, retag the figure “Real data (error rates) ·
  illustrative tiles” instead of plain “Real data”.
- **n-gram nextWord → keep**, it is honest (every count is computed live from the text) and it motivates context.
  Add a toggle to compare with the same tiny transformer’s next-word probabilities (precomputed for ~200 prompts),
  so the reader sees what longer context buys on the identical corpus.

## How this was tested
- `scripts/_adv.mjs` (new): all sliders min/max/crossed together, pointer drags 400–800 px outside every canvas,
  corner clicks, every button followed by extremes; checks BADTEXT/CLIP/OVERLAP + console errors. 6 pages × 2
  widths: clean after fixes.
- `scripts/_cpu.mjs` (new): rAF callbacks/s and main-thread CPU in view and scrolled away, after pressing every
  play/train button.
- `scripts/_touch.mjs`, `scripts/_tdrag.mjs` (new): touch claim map at 390 and CDP touch scrubs.
- `scripts/_shotstate.mjs` (new): screenshot a figure in a given slider/drag state.
- `audit.mjs 1280,390 --stress` all pages: clean. `linkcheck.mjs`: passed. `filetest.mjs`: passed. `_ft.mjs`
  extreme drags: readouts sane, no errors.
