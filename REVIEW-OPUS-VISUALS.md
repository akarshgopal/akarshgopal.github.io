# Visuals review — Opus pass (2026-10-31, HEAD 7a92701 → elec-links)

Scope: every figure on the 14 live pages (index essay rules flip model language parallel scaling data factory yardstick
demand verdict orbital), drawers opened, screenshotted at 1366 and 390 (Playwright + SwiftShader; 3D re-shot after a
6 s wait so the assembly intro had finished). Bar: Ciechanowski. Understanding first, fidelity second.
This pass covers figures only; the text/accuracy items of REVIEW-OPUS55.md are not repeated.

Baseline: all pages load with **no console errors and no horizontal scroll** at 1366 or 390.

Verdicts: **OK** teaches its idea at a glance · **Minor** small polish · **Fix** reader-facing defect worth fixing now.

## Figures reviewed

| Page | Figure | Verdict | Issues seen |
|---|---|---|---|
| index/verdict | verdictMeter | Minor | "supply cap" / "tripwires" labels on the path chart sit on the dashed line and band |
| index/orbital/verdict | ceilingMeter | OK | log axis signposted; clear NO/YES card |
| index/orbital/verdict | launchCost | Minor | 40/25 kg/kW line labels crowd at top right |
| index | caseMap | OK | |
| essay/rules | switchAdder, rippleAdder, turingTape | OK | |
| essay | flipEnergy | Minor | "heat" label floats with nothing drawn under it |
| essay | dennard | OK | power/cores end labels close but legible |
| essay | joulesPerOp | Minor | energy rail tick labels staggered above/below, busy |
| essay | manyHands | Minor | dead space under the bars |
| essay | dragLine, tinyNet, attention, computeTrend | OK | |
| essay | lossValley (3D) | OK | |
| essay | imagenet | OK | |
| essay | imagenetCompute | **Fix** | "ResNeXt-101 2016" and "ResNet-152 2015" labels overprint at 1366; at 390 every label but AlexNet disappears, so the dots are anonymous |
| essay | clusterGrid | Minor | right half of the strip empty below the axis |
| rules | relayLogic, relayCascade (3D) | Minor | A / B / lamp labels float ~1 part-height above their parts, no leader |
| flip | triode (3D) | OK | after assembly; only "grid" labelled in-figure (cathode/plate are in the coloured hint) |
| flip | mosfet (3D) | Minor | "gate" label drifts far above/right of the gate at FinFET/GAA |
| flip | cmosInverter, mosfetLog, joulesPerTick, darkSilicon, yieldDie, landauerGap | OK | |
| flip | litho (3D) | OK | only "mask" labelled in DUV mode; lens/wafer named in the hint |
| flip | exposureField | **Fix** | the lesson is "an H100 die nearly fills the 26×33 mm field" but at wafer scale both rectangles are ~20 px and overprint; die label runs across the wafer edge; right 60 % of the canvas empty |
| model | xorLine, twoLayers, backpropFlow | OK | |
| model | sgdValley (3D) | OK | |
| language | convFilter | Minor | "+1 +1 +1" weight row in the window is cramped / hard to read over black cells |
| language | overfit, rnnMemory, qkv, nextWord, tinyVsNgram | OK | |
| language | transformerBlock | OK | |
| parallel | matmulGrid, roofline, systolic, precisionBits, latencyHiding, nvlinkPair, scaleOut | OK | latencyHiding has some dead space |
| parallel | dataDistance | Minor | "640 pJ"/"645 pJ" value labels drawn inside the bar end over the outline |
| parallel | memoryLadder | **Fix** | "1,300–2,600 pJ" white text on the pale-green DRAM bar: very low contrast |
| scaling | powerLaw, threeKnobs, tokensPerParam, frontierSlope, dataWall, servingKV | OK | |
| scaling | trainingBill | **Fix** | two bars with no values and no scale: the one comparison the figure exists for (hardware € vs electricity €) can only be read from the caption |
| scaling | inferenceVsTraining | Minor | y-tick labels "3.8 × 10²⁵" / "7.6 × 10²⁵" pressed against the left edge, overlapping the line start |
| scaling | moePeek | Minor | "active (top-2 of 8) ≈ 218B" overflows its box |
| data | dataFunnel, humanShare, laborMap, dataIndustry, flywheel, dataFlow | OK | dataFlow is a plain grey flowchart (low fidelity, but clear) |
| data | scaleLadder | Minor | rungs are evenly spaced while the axis says "log"; the true log positions are tiny dots |
| demand | tokensLadder | OK | dashed = estimate signposted |
| factory | powerLadder (3D zoom) | OK | |
| factory | coolantFlow (3D) | Minor | "in" label hidden behind the inlet elbow |
| factory | heatLoop (3D) | **Fix** | caption names die → cold plate → CDU → outdoor reject, but only "plate" and "CDU" are labelled, floating high above the boxes; die and outdoor reject unlabelled (T8) |
| factory | mwhFlow, idleCost, syncSwing, regionsTWh | OK | |
| factory | powerChain | Minor | stage boxes not coloured to match the bar segments (T8); legend items touch ("7%" runs into the next swatch) |
| yardstick | yardstickBars | OK | |
| yardstick | energyFlow | **Fix** (390) / Minor | at 390 node labels truncate to "Indu", "Tran", "Buil", "Othe"; the Electricity band appears to leave the Transport node |
| orbital | radiatorT4 | OK | |

## Fixed

| Figure | What changed | Commit |
|---|---|---|
| scaling · trainingBill | € value printed on each bar ("€22.4 M", "€3.66–5.24 M") + "euros per training run, same linear scale"; bars leave room for the labels | c371af0 |
| scaling · inferenceVsTraining | left margin widened so "3.8 × 10²⁵" ticks no longer touch the line | c371af0 |
| essay · imagenetCompute | names step down until they clear each other (ResNet-152 / ResNeXt-101 no longer overprint); at 390 every network is labelled (name only) | 5d70940 |
| flip · exposureField | enlarged 26 × 33 mm field beside (desktop) / below (phone) the wafer with the die inside it: "one exposure field: 858 mm², the die fills about 95% of it" (814/858, both already cited on the page); die shape marked schematic, area to scale; die now printed inside the field on the wafer | 646dd89 |
| parallel · memoryLadder | DRAM range label dark on the pale inactive bar (was white on pale green); phone height so the axis note clears the bar | e210ae7 |
| factory · heatLoop (3D) | all four stages labelled on their parts in caption colours (die orange, cold plate cyan, CDU blue, outdoor reject green); phone stage 340→230 px so the loop fills it; loop names caption-only on phone | df7339a |
| yardstick · energyFlow | electricity no longer drawn as a ribbon that seemed to leave the Transport node: it stands to scale above the sector stack as "a cut used in every sector"; full sector names at 390; DC/AI inset moved below it | 1695350 |
| factory · powerChain | stage boxes tinted like the bar band their loss lands in (T8); legend flows instead of equal quarters (no run-in); dead space trimmed | 4d129ae |
| orbital · radiatorT4 | "one-sided" label placed where the ghost curve is on-chart; clears the pre-existing audit/adv overlap at a warm sink | 6e35c61 |
| parallel · dataDistance | full-length bars carry their pJ value on the label line instead of over the bar tip | d333d73 |
| data · scaleLadder | true log positions on their own labelled axis (100k … 1000T, small at top like the rows), one leader from the selected rung; was a tangle of dashes under a bare "log" | 5272a5f |
| language · convFilter | window weights drawn as signs (+ − 0) when cells are small | f727213 |
| scaling · moePeek | active-parameter label moves outside the bar when it does not fit | 36c68b5 |
| factory · coolantFlow (3D) | in/out labels lifted above the elbows (cyan "in" vanished on the cyan pipe); phone stage shorter so the plate fills it | fa6f517 |
| rules · relayLogic, relayCascade (3D) | A/B labels lowered onto their coils | a8b7d0b |
| dist | rebuild | a21d9ad |

No 3D/2D decision in UNDERSTANDING-AUDIT.md was changed. All 3D edits are DOM labels or the phone stage height; materials,
lights and desktop cameras are untouched, so the QA21 chroma baselines were not rebaselined.

## Deferred

| Figure | Issue | Why deferred / what it would take |
|---|---|---|
| factory · heatLoop | Still a row of coloured boxes; the hot→cold story is carried only by the caption and a travelling pulse | The audit's own condition stands: replace only with a proper 2D build (temperature-coloured flow along die → plate → CDU → outdoor, warm legs on top, cool returns), which needs a temperature model per leg. Labels now fixed |
| flip · mosfet (3D) | "gate" label anchors on the gate via, so at FinFET/GAA it sits up and to the right of the gate | Needs a per-generation anchor on the gate body (planarGate / finGateTop) and a re-check of the peek cut plane; low impact |
| index/verdict · verdictMeter | "supply cap" / "tripwires" labels sit on the dashed line, with a grey halo that does not match the orange band | Core decision figure; worth a careful pass on label placement on its own rather than a quick nudge |
| index/orbital/verdict · launchCost | 40 / 25 kg/kW line labels crowd at the top right | Minor; would need end-label de-collision like imagenetCompute |
| yardstick · energyFlow (390) | "167k" / "125k" / "28.2k" white numbers inside 10 px columns are barely legible | Move phone values beside the columns; small, not started |
| essay · flipEnergy | "heat" label floats with nothing drawn under it | Needs a heat cue (glow on the switch/wire) rather than moving text |
| essay · joulesPerOp | energy rail tick labels staggered above/below the rail | Minor clutter; needs fewer ticks or a second row |
| essay · manyHands, clusterGrid, parallel · latencyHiding, flip · cmosInverter | dead space / "output voltage (V)" axis title touching the 0.70 tick | Cosmetic |
| data · dataFlow | Plain grey box flowchart: clear but well below the visual bar of the rest | A redraw in the series' part colours; low understanding impact |
| data · flywheel (text) | Caption says "more than 1.2 billion a week for ChatGPT by October 2026"; the demand page was corrected to 900 M weekly users (OpenAI, Feb 2026) in 4b7231a | Text/accuracy, outside this figures-only pass; flagged for the text owner, not changed |

## checkall

`bash scripts/checkall.sh` run at a21d9ad:

- model: ok · peeks: PEEK CLEAN (11 drawers) · file://: PASSED · cpu: all pages ≤2.7 rAF/s off-screen · touch: nothing flagged
- audit (1280, 390, --stress, all 14 pages): no overlaps or clipping. The only lines are three "404 (File not found)" console
  resource errors, which were **also in the pre-change baseline run** (not caused by this pass).
- adv: clean. The baseline's one failure (radiatorT4 "one-sided" × axis-title overlap at a warm sink) is fixed by 6e35c61.
- links: LINK CHECK FAILED, 7 problems, all `../electricity/*.html` sibling links. This is the environment, not this pass:
  the electricity-explainer dist is not present here (the baseline run showed the same failures).

Targeted `audit.mjs 1280,390 --stress` was AUDIT CLEAN on every page touched (scaling, essay, flip, parallel, factory,
yardstick, data, language, rules); `_adv.mjs` was clean for yardstick and orbital.
