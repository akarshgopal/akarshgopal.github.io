# Review against Bartosz Ciechanowski's bar

Written 16 Oct 2026 (Europe/Berlin). I read all the prose: the main essay is about 10,400 words and the five parts 3,300–4,600 each. I looked by eye at fresh desktop (1280 px) and phone (390 px) screenshots of every figure in `screenshots/<slug>/`. The index shots were taken at 11:23; the index code has not changed since. No code was changed.

## The bar, made concrete
I read *Airfoil* and *Mechanical Watch* again to pin down what his essays actually do:
1. **He builds up from the simplest model.** Airfoil goes grass → arrows → markers → colour → pressure. The Watch goes spring → barrel → gear train → escapement → balance → the whole movement. Each demo reuses the one before it, so by the end the reader already knows every part of the final figure.
2. **One idea per demo, one control per demo.** There is a small figure every 2–4 paragraphs, and you drag the thing itself, not a slider next to it.
3. **Intuition comes before the term.** You watch a pressure gradient push a ball before the word "gradient" appears.
4. **He shows the wrong model first** (markers going through the wing), then fixes it.
5. **Motion shows the mechanism.** The animation *is* the explanation, not decoration.
6. **One visual language.** The same palette and the same objects (a gear, a particle) carry through the whole essay.
7. **Phone-first legibility.** One figure, one gesture, no legend you have to hunt for.

## Overall verdict
**This is a very good data essay with some real Ciechanowski-grade moments, but it is not yet at his level.** The gap is in structure, not polish:

- **Ratio of mechanism to data.** About 97 figures in total. I count roughly 35 as true mechanism demos (drift, faraday, rotor, junction, IV, shading, coreFlux, hotSpot, powerAngle, sagDLR, loopFlow, wakeField, gridDay, merit…). About 40 are passive charts of real data with a toggle (solarWorld, irenaCosts, windWorld, offshoreCfd, shortage, redispatch, buildRate, hvdcProjects, projects, mandates, bill, lcoe, lazardHistory…). The data is real and well sourced, but he would turn most of these into a footnote or a single number in the prose.
- **No build-up chains.** Each figure is a separate island with its own layout. The best candidates for chaining are electron → field → voltage → generator → three-phase → transformer → line. Today these are 6 different drawings, so the reader re-learns the visual vocabulary every time.
- **Too many sliders per figure.** merit has 5 sliders, 5 presets and a toggle. gridDay has 3 sliders and 2 toggles. lcohExplorer and productCost each have 3+ controls plus "More". His demos usually have one. Our figures behave like dashboards.
- **Indirect manipulation.** Nearly everything goes through a slider below the canvas. Only a few figures let you drag the object itself (the IV working point, the power-angle curve, the merit demand line).
- **Prose and figure density.** The figures come every 300–600 words, against his 100–200. Many sections (index §10–15, UR queue/auctions/contracts, transmission §8, synfuels §6–7) are 400–800 words of numbers with one passive chart.
- **Terms before intuition.** Recurring cases: LCOE, capture rate, infra-marginal rent, SIL, vector groups (Dyn11), RFNBO, CfD. Each is defined inline, but the number or term arrives before any demo that makes it feel inevitable.
- **Phone.** Mostly sound. The audits pass and nothing overflows. But several figures stack a 1,000 px tall canvas above 4–6 controls, so the figure is off-screen while you drag (merit, gridDay, lcohExplorer, cheapHours). There are also specific label and legend failures, listed below.
- **What already meets the bar:** drift (`d-02-drift`), junction (`solar-pv/d-02-junction`), ivCurve, shading, coreFlux, hotSpot, powerAngle, sagDLR, loopFlow, wakeField, and the merit/gridDay pair as ideas. The writing is clear, British, and accurate, with sources everywhere. That is better than his on citation, though he would never put 11 numbers in one paragraph.

---

## Main essay (index): 39 figures, ~10,400 words
**Strong:** hero3d, drift, potential, faraday, rotor, betz, losses, frequency, gridDay, merit, network.

**Weakest figures (ranked):**
1. **lcoe / lazardHistory / learning / foak / usCompare** (§10–12): five charts in a row, all passive or nearly so. *Redesign:* merge them into one "build a power plant" demo. You drag capex, fuel, capacity factor and the discount rate onto a stacked cost bar that you can watch shrink or grow, then drop the plant into the merit order from §7 to see what it earns. That one figure replaces three charts and links cost to price, which is the essay's central claim.
2. **merit:** a great idea, but on a phone it is a dashboard (`screenshots/m-merit.png`: 5 sliders, 5 presets, a toggle and a 290 px chart). *Redesign:* build it up over three small figures. (a) Stack the plants by dragging demand only. (b) Add wind and solar and watch the stack slide right. (c) Then fuel and carbon. Let the user drag the demand line on the chart itself and drop the sliders.
3. **gridDay:** on a phone there is **no legend for the stacked colours** (`m-gridDay.png`: orange, grey and blue unlabeled). There are also 3 sliders and 2 toggles. *Fix:* label the areas directly, keep only time-of-day and solar, and move season and wind into a second figure.
4. **historyChart / energyShare / cleanGrid / timeline:** these are context charts. Cut 2 of the 4, or merge them into one chart with a toggle.
5. **transformer (index):** the coil voltage looks flat at 21 kV because both voltage traces share one scale (`d-13-transformer.png`). Per-trace scaling or a log readout would show the trade-off. Better still: reuse coreFlux's drawing so that Part 3 extends this figure instead of replacing it.
6. **rankine / solarDay / windPower:** fine, but each uses its own visual language. They want a shared "generator" object that each source turns.

**Prose:**
- §2–4 go from drift to voltage to power to Faraday to three-phase too fast. Two intuition steps are missing:
  - *why a field, not the electrons, carries the energy* (a short "push the tube of marbles" analogy before the 48 ns number)
  - *why spinning a magnet gives a sine* (rotor shows it, but the prose says "sine" first)
- §10–15 (bills, LCOE, nuclear, SMRs, the 1970s) read as a policy report. Cut about 30%, move the numeric detail into notes, and keep one claim per paragraph.
- "Capture rate" and "infra-marginal rent" appear in readouts before the prose explains them. Swap the order.

**Missing figures:**
- A **field-in-a-wire build-up**: the battery's push is shown as arrows along the wire, and closing the switch sends the field at light speed while electrons barely move. It would be drift's predecessor.
- A **generator assembled step by step** (magnet → coil → rotate → three coils → three-phase), à la Mechanical Watch.

## Part 1: Solar PV (14 figures)
**Strong:** spectrum → junction → ivCurve → sqLimit → shading is the best physics arc in the series and the closest to his bar (`solar-pv/d-02-junction.png`: bands, carriers, lamp and live IV curve all in one).

**Weakest (ranked):**
1. **costStack (phone):** the x labels "Commercial rooftop" and "Residential rooftop" run into each other, and the "$x without battery" labels sit on top of bar segments (`solar-pv/m-12-costStack.png`). *Fix:* use two-line labels and place the dashed labels outside the bars. Better: make it a "build a home system" demo where you add the module, then the inverter, then the labour… and watch $0.32 become $4.59.
2. **solarWorld, irenaCosts, captureHistory:** passive charts. Merge irenaCosts with costStack. captureHistory should *reuse gridDay* from the main essay (same colours, same day), so that "capture price falls" is something you can see happening, not just a line.
3. **supplyChain:** four red bars, read in a second. Make it one sentence plus a map, or cut it.
4. **cellTech:** the cross-sections are good. Light should be animated going *into* the stack, showing where each layer saves a loss, which would tie it back to sqLimit's loss bands.
5. **sunPath → yieldMap → clipping:** a good chain, but each one restarts the layout. Keep the same panel geometry so it reads as one figure growing.

**Prose:** the physics sections are excellent. The bandgap appears before the reader knows what a band is, so one sentence with a staircase analogy is needed first. The supply-chain and cost sections are number-dense (§7–9).

**Missing:** a **"photon knocks an electron loose" atom-scale demo** before junction (the step from spectrum to bands is the biggest leap in the part).

## Part 2: Utility renewables (12 figures)
**Strong:** turbineScale, wakeField (after the fix: row 59%, all directions ~88%), specificPower, gridForming.

**Weakest (ranked):**
1. **queueFunnel:** a static bar with a toggle. *Redesign:* an animated funnel. You submit 100 projects and watch them drop out at each stage (study, cost allocation, permits) with the real attrition rates, while a clock runs (5 years).
2. **offshoreCfd, windWorld:** passive. Cut windWorld or fold it into solarWorld's layout. offshoreCfd should become a "the strike price vs. the cost of capital" demo: slide interest rates and watch the 2023 auction failure happen.
3. **revenueModels + captureCompare:** contract types are explained in prose, and the figure is a bar toggle. *Redesign:* one generator earning through one simulated week, with the cash-flow line shown under merchant, PPA, one-sided and two-sided CfD. Switching the contract shows who carries the risk.
4. **seasonMix:** a bar chart that needs reading. Reuse gridDay over 12 months.
5. **curtailment:** this is real data. It should link visually to transmission/redispatch, using the same colours.

**Prose:** the queue, auction and contract sections are the densest in the series. CfD and PPA are defined after they are used. The wake section is now honest (59% and ~12%).

**Missing:** **a blade-element demo** (why the blade twists, why the tip speed ratio matters). It is the airfoil link and pure Ciechanowski territory. The nacelle/drivetrain is also never shown.

## Part 3: Transformers (9 figures)
**Strong:** coreFlux (with the DC-offset "More"), coreLoss, hotSpot, tapChanger. This is the most coherent part.

**Weakest (ranked):**
1. **threePhase (vector groups):** it shows phasor clocks and a sine wave panel side by side. Readers without phasor background get nothing from it (`transformers/d-05-threePhase.png`). *Redesign:* build it up. (1) Three coils with three sines. (2) Wire them as a star and watch the neutral current cancel. (3) Rewire as a delta and see the 30° shift. Introduce Dyn11 only at the end.
2. **family:** a static infographic with hover. Make it a scroll-through of one kWh's journey, scaling each transformer drawing from the coreFlux object.
3. **shortage:** a passive PPI line. Keep it, but shrink it. A sentence plus a sparkline would do.
4. **efficiency:** fine. It should share axes with coreLoss so the "core loss = copper loss" optimum is visible as two curves crossing, which it nearly is.
5. **sizeFrequency:** good, but the core drawing is small and grey (`transformers/m-09-sizeFrequency.png`). Animate the core actually shrinking.

**Prose:** V = 4.44 f N A B arrives in paragraph 3 before any intuition about flux density. Hysteresis is explained in words, but the loop figure would be better *before* the paragraph.

**Missing:** **a laminations demo** (drag the sheet count and see the eddy loops shrink). It is partly in coreLoss's "More". Promote it.

## Part 4: Transmission (12 figures)
**Strong:** powerAngle (draggable, his style), sagDLR, loopFlow, breakEven, getsWeek.

**Weakest (ranked):**
1. **voltageLosses:** bars plus tower icons; the corridor drawing is good, but the losses are a bar. The circuit count, which is the punchline, is small text. Make the tower count the visual: corridors that fill up.
2. **loadability (St. Clair):** an engineers' chart with three coloured regions. It needs a build-up from powerAngle, adding length until the angle limit crosses the thermal limit as you drag.
3. **redispatch, buildRate, hvdcProjects, bill:** four passive charts. Cut bill (the index has one), and merge redispatch into loopFlow's "what it costs" readout. hvdcProjects is a nice reference but the labels crowd (`transmission/d-08-hvdcProjects.png`).
4. **loopFlow (phone):** the "8.4 / 8 GW" label sits on the red line (`transmission/m-05-loopFlow.png`). Otherwise it is excellent. Let the user drag the north node's surplus directly.
5. **interconnect:** a wiggly price line is hard to read. Show the two reservoirs (wind and hydro) with a pipe of adjustable width; the price is a consequence.

**Prose:** §2 introduces reactance, SIL and St. Clair in about 500 words with one demo. SIL needs its own small figure (capacitive charging vs inductive absorption, a seesaw). §8 (planning) is about 800 words with one chart: the longest uninterrupted policy stretch in the series.

**Missing:** a **"why reactance" demo**: AC current in a long wire, with field lines building and collapsing, before powerAngle.

## Part 5: Synthetic fuels (11 figures)
**Strong:** sankey, lcohExplorer, cheapHours (the best economics demo in the series: real 2025 prices and a draggable hours cursor), futures.

**Weakest (ranked):**
1. **molecules, carbonSources, electrolyserTypes:** three horizontal bar charts in a row with the same look (`synthetic-fuels/m-02-molecules`, `m-03-carbonSources`, `m-04-electrolyserTypes`). Merge them into one "build a litre of e-kerosene" stacked bar: pick the CO₂ source, then the electrolyser, and watch the kWh grow.
2. **projects, mandates:** passive. Shrink both to inline numbers and a small chart.
3. **productCost:** it duplicates lcohExplorer's controls. Merge them: lcohExplorer gets a "product" toggle.
4. **whereFits:** a labelled table with bars; mostly text. Replace it with the sankey re-run per use case (it already exists): pick a job and compare the direct vs molecule flows side by side.
5. **The currency default:** figures open in US$ ($7.80/kg, $2,370/kW) while the prose quotes € (€7, €2,100). The design is intentional, but on this page it reads as a contradiction. Default this page to €, or make the prose dual.

**Prose:** clear and the most "argued" of the parts. Haber–Bosch, Fischer–Tropsch and DAC are named before they are shown. A one-line "what the machine does" picture for each would help. §6–7 are lists of numbers.

**Missing:** **an electrolyser cell animation** (water in, bubbles at the two electrodes, the current and voltage readout tying to 55 kWh/kg). It is the only core mechanism in the part that is never shown.

---

## Cut or merge (series-wide)
- **Cut** (about 10 figures): windWorld, supplyChain, transmission/bill, two of the four index history charts, mandates/projects reduced to inline numbers, shortage reduced to a sparkline.
- **Merge:**
  - lcoe + lazardHistory + learning → "build a plant"
  - irenaCosts → costStack
  - productCost → lcohExplorer
  - molecules + carbonSources + electrolyserTypes → one builder
  - redispatch → loopFlow readout
- **Re-use** instead of new drawings: gridDay for captureHistory and seasonMix; coreFlux's core for the index transformer, family and sizeFrequency.

## Top 10 fixes, prioritised
| # | Fix | Why | Effort |
|---|---|---|---|
| 1 | Split **merit** into a 3-step build-up with direct drag on the demand line; fewer sliders | It is the central economics figure and is currently a dashboard on a phone | 1.5 days |
| 2 | **gridDay**: direct labels on the areas (no phone legend today), 2 controls; reuse it for solar captureHistory and UR seasonMix | It fixes a legibility bug and creates a cross-series visual thread | 1 day |
| 3 | Index §10–12: replace 5 cost charts with one **"build a power plant"** demo that feeds the merit order | Turns the weakest stretch of the essay into mechanism | 2 days |
| 4 | **Generator build-up** chain (magnet → coil → rotor → three-phase → transformer), with shared drawings; Part 3's threePhase built the same way | His signature move; it is currently 6 unrelated drawings | 3 days |
| 5 | Cut/merge ~10 passive charts (list above) and fold their numbers into prose | Raises figure quality per screen; shortens pages | 1 day |
| 6 | Trim the number-dense prose (index §10–15, UR queue/auctions/contracts, transmission §8, synfuels §6–7) by ~25%; one claim per paragraph; move detail to notes | Pacing | 1.5 days |
| 7 | Intuition-before-term pass: LCOE, capture rate, infra-marginal rent, SIL, Dyn11, CfD, V=4.44fNAB, bandgap; reorder so a demo or analogy comes first | Jargon order | 0.5 day |
| 8 | New mechanism figures: **electrolyser cell**, **blade element**, **reactance/field in a long wire** | Fills the three biggest "never shown" gaps | 3 days (1 each) |
| 9 | Phone fixes: costStack labels, loopFlow label on line, hvdcProjects crowding, sticky canvas while dragging on tall figures (merit, lcohExplorer, cheapHours); gridDay thin-band labels on phones (e.g. a taller chart at 390 px so gas, coal and hydro get names); buildPlant: the “shaded: …” note overlapping the price curve in the gas-shock view, and the Lazard bracket without a label on phones | Phone polish | 1 day |
| 10 | Synfuels: merge the 3 bar charts into a "litre of e-kerosene" builder, merge productCost into lcohExplorer, default this page to € | Removes redundancy and the €/$ mismatch | 1 day |

Total: about 15–16 working days. Fixes 1, 2, 5, 7 and 9 together (about 4.5 days) would close most of the visible gap.

## Most telling screenshots
- `screenshots/solar-pv/d-02-junction.png`: what the bar looks like when we hit it
- `screenshots/m-merit.png`: a dashboard, not a demo
- `screenshots/m-gridDay.png`: no legend on the phone
- `screenshots/solar-pv/m-12-costStack.png`: label collisions
- `screenshots/transformers/d-05-threePhase.png`: jargon before intuition
- `screenshots/transmission/m-05-loopFlow.png`: excellent mechanism, small label bug
