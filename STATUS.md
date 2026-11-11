# STATUS — How Machines Learned (/blog/ai/)

Resume notes for whoever picks this up. Plan: PLAN.md. First cut approved: main essay, Learning from Data, The AI Factory.

## Done
- Scaffold (build.mjs, esbuild, pnpm), copied fig/ui/draw/colors/boot helpers from the electricity series (copied, that repo untouched).
- Data: scripts/make_ai_data.py → src/lib/aidata.js (Epoch AI notable models + ML hardware, CC BY 4.0; Karl Rupp microprocessor trend data, CC BY 4.0).
- Shared constants with sources: src/lib/constants.js (gpuHoursPerMWh computed from DGX H100 10.2 kW, PUE 1.09 Google 2024 / 1.56 Uptime 2024 → ~503–720 GPU-h/MWh).
- Main essay src/pages/index.html: 14 sections, 15 figures, 7 math boxes, notes n1–n34. linkcheck + file:// test pass.

## In progress / next
1. ~~Essay checks~~ done (audit clean, linkcheck, file:// test, screenshots checked) — commit 1ae9f37.
2. ~~learning.html~~ done — 9 figures (src/figs/learning1.js, learning2.js; corpus src/lib/alice.js via scripts/make_alice.py), audit/linkcheck/file:// clean, screenshots checked (commit bb62e65).
3. ~~ai-factory.html~~ done — 8 sections, 6 figures (src/figs/factory.js: powerLadder, coolantFlow, idleCost, syncSwing, regionsTWh + reused gpuMWh), 4 math boxes, notes n1–n13; audit/linkcheck/file:// clean, functional drag test, screenshots checked.
4. First cut complete. Not published.
5. ~~the-switch.html~~ done — 8 sections, 7 figures (src/figs/switchpost.js: relayLogic, triode, mosfet, joulesPerTick, darkSilicon, litho, yieldDie), 5 math boxes, notes n1–n14 (commits 17f7020, 51d78c8).
6. ~~parallel.html~~ done — 8 sections, 7 figures (src/figs/parallelpost.js: matmulGrid, roofline, systolic, latencyHiding, precisionBits, dataDistance, scaleOut), 2 math boxes, notes n1–n7 (69942c7, 906b3f9).
7. ~~scaling.html~~ done — 8 sections, 7 figures (src/figs/scalingpost.js: powerLaw, threeKnobs, tokensPerParam, frontierSlope, dataWall, trainingBill, inferenceVsTraining), 2 math boxes, notes n1–n8.
8. All six pages 'live' in series.mjs; section-level cross-link asides (.deepdive.d-switch/-parallel/-scaling) from index, learning, ai-factory into the three new posts, and from the new posts back. All checks clean. Not published.

## Checks per page
node build.mjs && node scripts/audit.mjs 1280,390 --page=X --stress && node scripts/linkcheck.mjs && node scripts/filetest.mjs && node scripts/shots.mjs X

## Preview / zip
- Preview: /tmp/ai-site/{ai,electricity}/ served on http://127.0.0.1:8766/ai/ (python3 -m http.server 8766 --bind 127.0.0.1 -d /tmp/ai-site). :8765 is the electricity server — leave alone.
- Zip: /workspace/ai-explainer.zip = dist/ + *.md only.

## Judgement calls (to report)
- Essay has 15 figures not ~30; ImageNet tiles are placeholders; joulesPerOp mixes systems (FP64) and chips (BF16), captioned; GPU-hour range excludes networking/storage; 4-year chip life assumed for €/h.
- Learning: nextWord is a counted n-gram model, not a transformer (labelled); overfit stops at degree n−1 (no double descent shown, Belkin cited); RLHF figure skipped (9 figures).
- AI Factory: coolantFlow duct/pipe speeds (3 / 2 m/s) assumed; idleCost uses analyst DGX price + assumed 4-year life; syncSwing rhythm and waiting power are illustrative (only Meta’s ‘tens of MW’ is sourced); regions 2030 shares divide by 2024 Ember demand; Japan 2024 derived from IEA +15 TWh/+80%; no connection-queue or transformer figures (linked to electricity series instead); no Energy-Charts data.
- Essay world electricity now Ember 31,734 TWh (2025), n35.
- Switch: 7 figures not 8–10 (no costPerTransistor: no CC BY data; no adder: essay has rippleAdder). joulesPerTick = geometric means of Rupp W/(transistors·f) per 3-year bin (not chip-matched; power per transistor per tick, not energy per flip); fits ÷1.49/yr pre-2005, ÷1.32/yr after. Old litho NAs (g 0.45, i 0.6, KrF 0.8, ArF 0.93) approximate; ASML for 1.35/0.33/0.55. darkSilicon model harsher than Esmaeilzadeh; prose quotes theirs. Triode heater bar illustrative.
- Parallel: hbmStack folded into dataDistance; no warp timeline. Horowitz 45 nm energies via Han et al. 2015. Latency cycles 20/400 illustrative. scaleOut: data-parallel only, no overlap, 7B model, 4M-token batch, 40% MFU, NVLink 900 GB/s ≤8 GPUs, 400 Gb/s beyond.
- Scaling: no benchClimb (Epoch Benchmarking Hub licence unchecked); algorithmic progress is a toggle in frontierSlope (Ho et al. 8-month halving). threeKnobs shows both Hoffmann (≈92 tok/param at Chinchilla budget) and Besiroglu replication (≈18). tokensPerParam drops ratios <0.1 (dataset counted in documents/examples). dataWall: our least-squares fit to Epoch-flagged frontier LMs 2018+ (×2.7/yr, crosses 4e14 ≈2029; Epoch says median 2028); some sizes count words; band = raw indexed-web 95% interval. trainingBill electricity ≈14–19% at €100/MWh; staff, failed runs excluded. inferenceVsTraining 2N FLOP/token, dense 405B.
- Cross-series links ../electricity/… assume /blog/ai/ sits beside /blog/electricity/.

## Review 1 (19 Oct 2026)
- REVIEW-1.md: 37 findings, 32 fixed, 5 open + 5 redesigns + stand-in plan. Fig fixes: no double rAF per frame (fig.js), panY touch mode for scrub/tap figures, pointer ignored before first draw, sig() for readouts.

## Scripts
- scripts/_adv.mjs page W [shotdir] — adversarial figure driver (all sliders min/max, out-of-bounds drags, buttons).
- scripts/_cpu.mjs page — rAF/s and CPU in view vs scrolled away. scripts/_touch.mjs / _tdrag.mjs — phone touch claims / touch scrubs. scripts/_shotstate.mjs — screenshot a figure in a given state.
- scripts/preview.sh — refresh /tmp/ai-site and start :8766 if not running.
- scripts/zip.sh — /workspace/ai-explainer.zip (dist + *.md).
- scripts/_ft.mjs — functional test: node scripts/_ft.mjs page.html 390 '[[fig,"drag"|"vdrag"|"tap"|"btn",a,b,c],…]' prints readouts after each step.

## Notes
- The Read tool caches images by path: copy re-shot screenshots to a new name (e.g. /tmp/v2/) before looking again.
- Dennard fix (a71dad1): line, marker and readout all use trend(); fit is log10(MHz) over all chips 1985–2004, ×1.33/yr → 248 GHz in 2021.
- Fig hit() must return a truthy key (index 0 fails). Readouts must avoid e-notation (audit BADTEXT).
- Electricity back-links wanted (not made): index #s14/#s15/#fig-gridDay → ../ai/index.html#s14, ../ai/ai-factory.html; transformers.html#shortage, transmission.html#planning, synthetic-fuels.html#fig-cheapHours → ../ai/ai-factory.html; solar-pv.html#junction → ../ai/the-switch.html#mosfet.
- Review 2 redesign 1 (real attention): scripts/tinylm/train.py → src/lib/tinylm.js; essay §11 attention figure shows real heads (causal); Learning §9 tinyVsNgram compares with Witten–Bell trigram. See scripts/tinylm/README.md for size, data, loss and caveats.
- _adv.mjs scrolls the canvas (not the figure) into view, since tall phone figures put the canvas top off-screen; Fig pointerdown on a miss now preventDefaults for mouse (no selection autoscroll).
- Review 2 redesign 2 (ImageNet): 24 Commons photos (CC0/CC BY/PD; scripts/imagenet/fetch_photos.py, credits in research/imagenet-photos.json and index note 37), real top-5 from torchvision AlexNet/GoogLeNet/ResNet-152 IMAGENET1K_V1 (scripts/imagenet/classify.py → src/lib/imagenetphotos.js, ~200 KB, 160 px centre crops). Other years: contest error only. New imagenetCompute figure (contest vs single-model error against Epoch compute).
- Redesign 3 (regionsTWh): 2015–2035 area chart from IEA chart CSVs (research/raw/iea-dc-series.csv → src/lib/ieadc.js), case band, compare UK/France/Japan (Ember 2024 demand).
- Redesign 4 (powerLadder): one continuous to-scale zoom die → server → rack → hall → building → site, kW/m² at each level; layout assumptions in caption; Colossus building/site areas in ai-factory note 14.
- Redesign 5: ai-factory gpuMWh replaced by mwhFlow (Sankey of 1 MWh, PUE rail). gpuMWh in scale.js is now unused (still imported by essay.js).
- ship.sh now runs the build before committing.
- Data flywheel (Oct 2026): new Scaling §6 #flywheel after #datawall (bill/inference/recap renumbered 7–9, notes n9–n31). Figures in src/figs/flywheel.js: flywheel (spin-the-wheel illustration, era toggle 2009/2022/2026, tap inlets) and dataIndustry (reported revenue/run-rate and valuation points, scrubbable, Manhattan $34B 2025-dollar line). Every point's source in the REV/VAL arrays and notes 15–17, 24–29; Manhattan = Brookings/Hewlett & Anderson $1.8896B × CPI-U 321.943/18.0. Cross-link asides: essay §12 (extended existing d-scaling aside) and Learning §9 after tinyVsNgram (Learning has no RLHF text). Handshake 2026 figures are a secondary Dealroom report; micro1 Oct 2026 run-rate is a company claim.

## Review 2 (21 Oct 2026) — done (REVIEW-2.md: 26 found, 19 fixed, 7 open incl. 5 proposals)
- Box was reset: pnpm (corepack prepare pnpm@11.24.0), node_modules, playwright chromium reinstalled; dist rebuilt. /workspace/electricity-explainer/dist is missing from that working tree (not touched); preview.sh and checkall.sh fall back to `git archive HEAD dist` of that repo into /tmp/elec-dist (read-only).
- Batch 1 done: prose/correctness fixes (Learning footer 'every network live', per word→per token, Manhattan wording + figure ages, AI Factory lede/H100/NVL72, IEA 2025 = 485 TWh), regionsTWh phone case labels + 'Asia excluding China', tokensPerParam yearly median steps (2021 2.7 → 2023 20 → 2025 47).
- Next: humanShare figure (Llama 2 human comparisons vs pretraining tokens, to scale), REVIEW-2.md, checks.
- humanShare figure (Scaling §6, after the first paragraph): Llama 2 2.0T pretraining tokens vs 1,418,091 comparisons × 798.5 tokens ≈ 1.13B (0.057%, 1 in ~1,800, side ×42), log zoom rail, panY. Note 10 extended (tables 1, 6, §3.2.2).
- Batch 3: essay §14 closing ties the 'example' thread to the flywheel; IEA 2025 estimate (485 TWh) in essay + AI Factory; ChatGPT weekly users (100M Nov 2023 → 1.2B Oct 2026, new Scaling note 32) in §6 prose, flywheel era texts and §8 (replacing 'hundreds of millions').
- Final: checkall clean on all six pages (audit, _adv, CPU, touch, links, file://). Screenshots of the main changes in /workspace/ai-review2-shots/.

## Ciechanowski gap analysis (21 Oct 2026)
CIECH-GAP.md written (traits, scorecards, top-10 plan, ordering). Nothing built. Private reference renders in /workspace/ciech-ref (never shipped).

## CIECH changes 1–4 (approved 21 Oct 2026)
- Change 1 (visual system), WIP commit: neutral grey stage (#f4f4f2) on a near-white page, seven-colour palette in colors.js/style.css (.c-red … .c-violet, darker text tones for AA), captions folded into an "ⓘ data" <details> toggle in a one-line footer with the how-to hint, readouts trimmed toward one line, legends → on-object labels (imagenetCompute, computeTrend, twoLayers, backpropFlow, convFilter), coloured prose terms on index/the-switch/parallel/learning.
- Facts dropped from readouts are tracked in /workspace/ciech-work/moved.txt and must land in prose in change 2.
- Change 1 done: regionsTWh regions labelled inside their bands, scaling/factory prose colours, play toggle hides instantly (fixed an _adv overlap), checkall clean. Before-shots of HEAD 2d34098 in /workspace/ciech-work/before-shots.
- Change 2 done (commits 8e1dca4, 0ffabcd, 15fe925, 4d48477, 7ad24fc): every page opens on a concrete object (relay; H100 die; dots and a line; two switches and two lamps; Llama 3.1's 405 billion numbers; the 700 W chip) and ends with a "Final words" h2 (#final, in each TOC). Facts from readouts landed in prose (moved.txt). checkall clean.
- Change 3 (3D loss surface): src/three/stage3d.js (shared stage: pan-y, sideways drag turns, mouse tilts, tap picks, arrow keys, renders only in view, DPR ≤ 2, low-power, returns null without WebGL) + src/three/losssurface.js (modes single/pair), bundled separately to dist/three3d.js, injected by build.mjs only on pages with lossValley/sgdValley. The 2D figures remain as the no-WebGL fallback. scripts/_3d.mjs checks touch/mouse/keys/off-screen. checkall clean.
- Change 4 (systolic): matmulGrid now a 4×4 of real small numbers (MA, MB exported); the systolic array multiplies the same matrices, numbers visibly slide cell to cell (rest half a tick in the meeting cell, then glide), staggered queues, plays once on scroll then stops its loop, time rail + Play again + Next tick. Totals match matmulGrid's outputs. Weights now cyan (prose too).

## Series restructure, step 1 (23 Oct 2026) — done; page splits NOT started
Decisions (Akarsh): title "Can AI outgrow the planet's power grid?"; Act 1 = thesis with rungs R1/R2/R3 (RESTRUCTURE.md), Act 2 = orbital 100× (RESTRUCTURE-ORBITAL.md); star-mind is a coda; headline target 100× by 2035, 1,000× by 2040 as a slider; electricity back-links approved but see BACKLINKS.md (electricity repo untouched).
- a0e4cbd: short tour moved to essay.html; series title is the question. 1101bec: stack ruler + peek drawers. da2ed91 + later: new index.
- Peek drawers: `src/lib/peek.js` (`<details class="peek" data-level>`; built lazily on first open; level chip "parent → own"). Rules: ≤120 words, ≤1 control (scripts/peekcheck.mjs, in checkall). Demos: the-switch #peek-inverter (CMOS inverter, EKV model, 0.7 V/0.35 V), parallel #peek-ladder (Horowitz ISSCC 2014 energies, 45 nm).
- Stack ruler (`src/stack.mjs`, `src/lib/stack.js`, build.mjs STACK collector): H0–H10 and S0–S7; wide ruler ≥1260×560 px (104 px wide, showpieces shrink to leave room), pill + sheet below that. Tag an h2 or drawer with `data-level="H6 H5"`.
- New index: `src/pages/index.html`; figures in `src/figs/verdict.js` (verdictMeter, ceilingMeter, launchCost) and `src/lib/casemap.js` (caseMap, DOM + SVG arrows; visited tint from `src/lib/visited.js`; lean pips from `src/lib/lean.js`). Model in `src/lib/model.js` (all constants and their sources are commented there), tests in `scripts/modeltest.mjs` (also in checkall).
- Model defaults (Mid) are MY CALIBRATION to the IEA Base path (about 220 TWh inference in 2030, 486 in 2035, 999 in 2050); not forecasts. R2 bar (6,000 TWh) is a cooling-class working bar (IEA commentary 10 Jul 2026 + tracking double-by-2050); 62 EJ heating verified against IEA Future of Heat Pumps PDF; 60% inference share still secondary; world electricity 2035 ≈37,800 TWh (IEA WEO 2025 CPS/STEPS), 2050 ~60,000 TWh still my assumption; Epoch-to-2035 extrapolation (316 GW) and 600/1,500 GW for 2040/2050 are mine; first bulk launch 2029 and Emax 100× are my assumptions.
- Not yet written (cards on the case map are dashed): Yardstick, Demand, Data, Orbital, Star-mind. The Factory, Parallel, Scaling page splits are still to do.
- /workspace/electricity-explainer/dist is missing in that working tree (not touched). checkall uses `git archive HEAD dist` into /tmp/elec-dist.

## Series restructure, step 2 (25 Oct 2026) — done (scaffolding; peeks/polish remain)
Full two-act page list is live. Commits: 3059755 (splits), 4225a62 (yard/demand/verdict), 3f611cf (orbital), e986302 (data).
- **Live pages:** index, yardstick, rules, model, language, flip, parallel, scaling, data, demand, factory, orbital, verdict, essay (short tour at end of nav).
- **Redirects:** the-switch→flip, learning→model, ai-factory→factory (hash preserved).
- **New figures:** yardstickBars, tokensLadder; verdict/orbital reuse verdictMeter, ceilingMeter, launchCost.
- **Data:** Scaling §6 flywheel moved to data.html (optional branch); scaling renumbered.
- **Factory:** renamed from ai-factory; electricity cross-links already present (transformers#shortage, transmission#planning, synthetic-fuels, utility-renewables, index#fig-frequency). Full merge of essay §13–14 prose still light (aside + existing deepdives).
- **Gaps / scaffolding honesty:** Yardstick has no Sankey yet (log bars only). Demand token ladder uses round-number placeholders. Verdict ledger table is static Mid numbers plus live meters. Orbital has no dedicated heat/T⁴ interactive yet (prose + reused meters). Star-mind is a coda section, not its own page. Essay still duplicates some Rules/Flip/Model material as the short tour.
- Electricity repo still untouched; BACKLINKS.md is the proposal for Code Monkey.

## Series restructure, step 3 deepen (25 Oct 2026) — done
Commit f3c1728. Deepen, not more scaffolding.
- **Yardstick:** `energyFlow` Sankey (primary → final → sectors → electricity / DC / AI) plus existing log bars; “other uses grow” slider shared with Act 1 via prefs; secondary sources flagged.
- **Demand:** tokensLadder rungs cited (Google 0.24 Wh chat; IEA hundreds/thousands for reasoning/agent/video, labelled estimates); U and T sliders persist via `src/lib/prefs.js` into index/verdict meters.
- **Orbital:** `radiatorT4` Stefan–Boltzmann m²/MW vs T; ceiling + launch meters kept; star-mind coda unchanged.
- **Factory:** essay §13–14 prose deep-merged into #pue and #grid; `#fig-gridDay` cross-link; power-chain peek; electricity links already present.
- **Thesis peeks (10 drawers):** Landauer gap (flip), memory ladder (parallel, pre-existing), serving/KV (scaling), MoE (scaling), transformer block (language), power chain (factory); plus CMOS inverter. peekcheck CLEAN.
- **Wiring:** prefs persist Act 1 levers; yardstick b and demand U/T publish leans (live push landed in polish 85834d0).
- Gaps then: energyFlow was schematic √ (area-proportional in polish); MoE/transformer/serving peeks are models; H100 Landauer FLOP is derived 700 W / 989 TFLOP/s.
- **Checks (25 Oct 2026):** `scripts/checkall.sh` → model ok, PEEK CLEAN (10 drawers), audit/adv empty, CPU quiet, LINK CHECK PASSED, FILE:// TEST PASSED, FIN. Touch: no page hit ≥6/9 this run (new figs 0/9 trapped; pre-existing also low) — document, not a gate fail. Screenshots: `/workspace/ciech-work/compare/s3-*.png` (32). Zip refreshed; preview http://127.0.0.1:8766/ai/.

## Polish pass (26 Oct 2026) — done
Commits 85834d0 → fd07f51 (+ checkall STATUS). See REVIEW-3.md.
- **Live wiring:** Yardstick `b` → `patchAct1` + `watchAct1` syncs index/verdict slider widgets (not only restore-on-load). Demand rung selection auto-sets `T` from token multiple vs chat (labelled approximate; Wh≠tokens for video/tools).
- **energyFlow:** area-proportional column heights; DC/AI in ×40 inset labelled not-to-scale; phone inset band reserved above the log rail.
- **BACKLINKS.md:** `factory.html` / `flip.html` targets; yardstick **live**. Electricity repo untouched.
- **REVIEW-3:** stress audit CLEAN; peek CLEAN; linkcheck PASSED; pageerror crawl 0; open items A–G in REVIEW-3.md (touch &lt;6/9, R2 provisional, schematic elec band, etc.).
- Screenshots: `/workspace/ciech-work/compare/p4*.png`.
- **Checks:** model ok · PEEK CLEAN · audit/adv empty · CPU quiet · LINK CHECK PASSED · FILE:// TEST PASSED. Touch still no ≥6/9 (open A in REVIEW-3). Zip + preview refreshed.

## Critical review (26 Oct 2026) — done
Commits 1e5e0d2 → acc7dd4 (+ checkall/dist). See REVIEW-CRITICAL.md.
- **Blocker fixed:** index `#final` Final words.
- **Major fixed:** stale “not written yet” / dashed-card copy; case-map note; coda → `orbital.html#star`; verdict ledger live from PRESETS (High·R2 was wrong: now UNRESOLVED); demand rung tap (pan-y); energyFlow electricity as cut of final; caseMap figcaption; essay Final words → thesis page.
- **REVIEW-3 A–G:** A reframed (0/9 trap = pan-y OK); B labelled; C improved; D deferred; E fixed; F bridged; G deferred.
- **Still open:** R2 provisional; R3 secondary citation; optional touch-handles pass; Mid prose on index not live-bound.
- Screenshots: `/workspace/ciech-work/compare/crit-before-*.png`, `crit-after-*.png`, `crit-after2-*.png`.
- **checkall:** CLEAN (model/peek/audit/adv/cpu/links/file://; touch 0/9 traps = pan-y).

## IEA end-use pass (26 Oct 2026)
- **R3:** 62 EJ (2021) confirmed in IEA *The Future of Heat Pumps* (2022) §1.2 primary PDF → 17,200 TWh. Secondary flag removed.
- **R2:** Kept 6,000 TWh as cooling-class working bar: 2,900 (2025) +1,600 by 2035 (IEA commentary 10 Jul 2026) → ~4,500; tracking “more than double by 2050 with no action” → ≳5,800. Free WEO tables lack a single largest-end-use cell; industrial motor systems (~10,400 TWh, 2023, IEA-4E EMSA) span many end-uses — not used as R2.
- **R1:** 10% of ≈37,800 TWh (WEO 2025 CPS/STEPS) → 3,800.
- **Index:** `#meter-live` updates with the verdict meter (path TWh, bars, YES/NO/UNRESOLVED).
- **Thinning:** index, yardstick, demand, orbital, factory (grid/regions/final), essay (s14/final).
- Screenshots: `/workspace/ciech-work/compare/iea-*.png`.
- **checkall clean** (IEA pass); zip refreshed; preview http://127.0.0.1:8766/ai/. HEAD after pass: see `git log -1`.

## Deep Ciechanowski pass (28 Oct 2026)
See REVIEW-DEEP.md. HEAD after pass: see `git log -1`.
- **Structure:** nav order = dependency DAG (yardstick → rules → flip → parallel → model → language → scaling → data → demand → factory → orbital → verdict → essay). Case map: Rules added; Data “examples” not optional; Act2 need → orbital#need; grid → factory#grid.
- **Honesty:** soft “about/roughly” → ranges on index/yardstick/verdict/demand/orbital; 60% inference share SECONDARY + sensitivity; WORLD_ELEC_2050_ASSUMED labelled; Wh≠tokens peek; Landauer H100 DERIVED; R3 primary-PDF (stale Sankey “secondary” fixed).
- **Visuals:** tokensLadder measured vs estimate; radiatorT4 formula on canvas; yardstickBars M0 40–80 whiskers; caseMap DAG.
- **Essay:** deep pointers per section; s3/s14 trimmed.
- Screenshots: `/workspace/ciech-work/compare/deep-before-*.png`, `deep-*.png`.
- **checkall CLEAN**; zip + preview refreshed.

## Improve pass — CIECH #8/#10/#7 lean (28 Oct 2026)
See REVIEW-IMPROVE.md. HEAD after pass: see `git log -1`.
- **coolantFlow:** cold-plate mechanism (die/TIM/channel, flow slider, ΔT = P/(ṁ c) model); air comparison in readout.
- **relayLogic** (rules): coil → armature → contact → lamp; series AND / side-by-side OR.
- **litho** (flip): mask → light → resist → wafer; blur with half-pitch / tool.
- **dataDistance** (parallel): package die map; Horowitz energies; HBM=DRAM-class; NVLink bandwidth only.
- **Essay:** light trim of Rules/Flip duplication (~7.2k words).
- Skipped: #5/#6 3D, full Sankey, WEO R2 cell.
- Screenshots: `/workspace/ciech-work/compare/imp-before-*.png`, `imp-after-*.png`.
- **checkall CLEAN**; zip + preview refreshed. No portfolio push; electricity untouched; no Code Monkey ping.

## Improve pass 2 — R2 hunt + Sankey + CIECH #9 bridges (28 Oct 2026)
See REVIEW-IMPROVE-2.md. HEAD after pass: see `git log -1`.
- **R2:** free IEA/WEO/Highlights/FoC hunt documented — **no clean largest-end-use cell**; 6,000 stays WORKING (yardstick n6 + model.js note).
- **energyFlow:** Industry 42% / Residential 27% / other 31% residual of electricity (IEA World 2024); still not a free sector→elec fuel Sankey (n9).
- **Bridges:** heatLoop (factory), exposureField (flip), nvlinkPair (parallel), relayCascade (rules); pan-y; mid-action defaults.
- Skipped: #5/#6 3D; powerLadder canvas upgrade.
- Screenshots: `/workspace/ciech-work/compare/imp2-*.png`.
- **checkall:** see REVIEW-IMPROVE-2; zip + preview refreshed. No portfolio push; electricity untouched; no Code Monkey ping.

## Improve-3 (28 Oct 2026) — powerLadder 2.5D + essay trim → seal for portfolio merge
- REVIEW-IMPROVE-3.md. HEAD before: 69a1131.
- powerLadder: CIECH #6 lean 2.5D (iso die/server/rack, HBM stubs, nest breadcrumb, aisle wash); cited watts kept; pan-y kept.
- Essay short-tour: ~5547 → ~5185 words before notes (~346 words/fig).
- R2 still WORKING 6000; no Energy-Charts; electricity untouched.
- Dist + zip refreshed for Code Monkey to update PR #10 and merge to main (user t71u authorized live review).
