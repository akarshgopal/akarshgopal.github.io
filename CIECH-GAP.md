# CIECH-GAP: How Machines Learned vs. Bartosz Ciechanowski

This is an honest gap analysis and plan. Nothing has been built yet.

His figures were rendered for private comparison only and are kept in `/workspace/ciech-ref/`. They are never shipped, linked or bundled.

Written 21 Oct 2026. It covers this repo at HEAD 626113c.

## 0. Method

- **Posts studied (6).** All were downloaded from https://ciechanow.ski and parsed: HTML structure, figure containers, controls, prose and colour-coded terms.
  - **Read in depth:** Mechanical Watch, GPS, Cameras and Lenses, Airfoil. I also read their JS (`watch.js` 327 KB, `gps.js` 238 KB, `lenses.js` 291 KB, `airfoil.js` 451 KB, `base.js`).
  - **Parsed for counts only:** Bicycle and Moon.
- **His figures rendered (11).** Headless Chromium with SwiftShader WebGL, saved as `ciech-ref/<post>--<figure>.png`.
- **Our figures re-shot (55).** All from file:// at 1280 px and 390 px, saved under `screenshots/<page>/`.
- **Our pages measured.** Words, gaps between figures and controls were counted from `dist/*.html` with the same rules as his.

## 1. What makes his posts work: the traits

### Hard numbers

The first six data columns are his posts. "Ours, all 6" adds up the six pages of this series.

| | Watch | GPS | Cameras | Airfoil | Bicycle | Moon | **Ours, all 6** |
|---|---|---|---|---|---|---|---|
| Figures | 93 | 62 | 56 | 81 | 118 | 120 | **55** (6–15 per page) |
| Prose words | 8,031 | 9,471 | 6,261 | 14,461 | 15,291 | 16,267 | 16,191 |
| Words per figure | **86** | 153 | 112 | 179 | 130 | 136 | **221–400** |
| Median words between figures | **73** | 109 | 95 | 158 | 108 | 119 | **159–367** |
| Figures with 0 controls (drag or auto-play only) | 10 | 26 | 13 | 23 | 10 | 36 | about 3 |
| Figures with 1 control | 81 | 20 | 26 | 50 | 86 | 52 | about 35 |
| Figures with 2+ controls | 2 | 16 | 17 | 8 | 22 | 32 | about 17 |
| Colour-coded terms in prose | 460 | 170 | 0 | 310 | 466 | 509 | **0** |
| Text blocks under each figure | 0 | 0 | 0 | 0 | 0 | 0 | **3** (readout, "Try this", MODEL/REAL DATA note) |
| 3D (WebGL) | most | about half | about half | some (3D hero; most flow fields are 2D) | most | most | **0** |

Every one of his posts renders with one shared WebGL path plus a 2D canvas overlay. Specifically:

- **One renderer per post.** Each post has a single `GLDrawer` with `getContext('experimental-webgl')`.
- **Real geometry.** The watch loads its meshes from binary vertex and index files.
- **Off-screen pause.** An `IntersectionObserver` stops figures that are off screen.
- **Ortho camera.** Mechanisms use an orthographic camera, so gears read like technical drawings.

### Ten traits (T1–T10)

1. **T1. A concrete object first.** Every post opens with a thing you can grab in the first 60–100 words, before any thesis:
   - Watch: "You can drag the device around… use the slider to peek inside".
   - GPS: the live satellite constellation.
   - Cameras: a scene and a camera.
   - Airfoil: a yellow airfoil in flow.
   - Bicycle: a rider you steer.
   - Moon: the Moon you rotate.

   The abstraction always comes after the object.
2. **T2. Dense figures.** A figure every 70–160 words, so no screen is ever just text. The prose between figures mostly says what to look at next.
3. **T3. Each figure builds on the last.** Each figure is the previous one plus one change: the same object, the same camera, the same colours.
   - Watch: `coil_spring → torsion_spring → mainspring_s → mainspring_barrel → … → mainspring_wind2`, 12 figures on one spring.
   - GPS: `map0 → map5`, then `map_drone0/1`, then `map_sound0–7`, the same map each time with one new rule.
   - Every section ends by assembling the parts built earlier.
4. **T4. Objects and mechanisms, not charts.** There are almost no data charts. Where a plot does appear (GPS signals, airfoil pressure), it sits next to the object it measures and is driven by the same control.
5. **T5. 3D wherever space matters.** You drag to orbit. The default camera is a slightly raised three-quarter view, so depth reads at once without touching anything.
6. **T6. One control, tinted to match.** 81 of the watch's 93 figures have one slider.
   - **Colour-matched controls:** the slider takes the colour of the part it moves (`slider_yellow`, `slider_crown_pull`).
   - **Direct manipulation is the default:** drag the object or orbit the camera.
   - **Buttons are rare.** Sliders are long and full width.
7. **T7. The default state shows the point.** Figures animate the moment they scroll into view, with a small pause button in the corner. The opening frame is mid-action:
   - the escape wheel is caught mid-tooth;
   - the balance is mid-swing;
   - rays are already reaching the film.
8. **T8. Labels in the prose, not in legends.** Part names in the prose are coloured to match the figure (for example "the **blue** pallet fork"), so the text is the legend.
   - The figure itself carries almost no text: no axes, no captions, no legend boxes, no readouts.
   - Numbers live in the prose, or on a tiny ruler inside the figure.
9. **T9. One visual language.**
   - **Stage:** a light-grey `#F8F8F8` panel on a white page.
   - **Seven saturated pastels used everywhere:**

     | Colour | RGB |
     |---|---|
     | red | 231,91,85 |
     | orange | 228,136,80 |
     | yellow | 233,193,79 |
     | green | 136,192,73 |
     | cyan | 90,203,193 |
     | blue | 79,162,230 |
     | violet | 212,148,224 |

   - **Neutral greys:** 240 / 200 / 177 / 130.
   - **Line weight:** one thin dark outline weight throughout.
   - **Shading:** soft, nearly flat Lambert shading with no textures; the Moon and Earth are the exceptions.
   - **Arrows:** big, soft and colour-matched to show motion and force.
   - **Type:** IBM Plex Sans 44rem body text; Inter headings.
10. **T10. Prose voice and endings.**
    - **Voice:** a first-person guide ("I'll explain…") with "we" for the building ("we can put the rest of the gear train in"). Sentences are short and concrete.
    - **Humour:** light, mostly in headings ("Do you hear me?", "Higher, Better, Faster, Stronger").
    - **Endings:** every post ends with *Further Watching and Reading*, then *Final Words*, which are reflective rather than a recap. Examples:
      - Bicycle: "Perhaps the next time you're on a bicycle…"
      - Moon: "…a fellow companion that gently affects our own existence"
      - Airfoil: "…you'll find the whole thing even more magical"

**What he does that we must not copy.** His `TouchHandler` calls `preventDefault()` on `touchstart` for every 3D figure, so a swipe that lands on a figure rotates it instead of scrolling the page. Our rule says swipes must scroll.

The electricity series already solves this in `src/figs/hero3d.js`: `touch-action: pan-y`, horizontal drag for yaw, vertical swipes left to the page. We should reuse that pattern.

**Where we are already stronger, and must keep it.** He rarely cites anything. Our notes give real, cited data and label every assumption. The plan keeps that, but moves it out of the way (see change #1).

## 2. Per-page scorecard (0–3 on each trait; 3 is his level)

| Page | T1 object first | T2 density | T3 build-up | T4 object, not chart | T5 3D | T6 one direct control | T7 default shows point | T8 prose labels, no chrome | T9 visual system | T10 voice and ending | **Total /30** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Essay (index) | 1 | 1 | 1 | 1.5 | 0 | 1.5 | 1.5 | 0.5 | 1 | 1.5 | **9.5** |
| The Switch | 1 | 1 | 1.5 | 2 | 0 | 2 | 1.5 | 0.5 | 1.5 | 1.5 | **12.5** |
| Parallel | 1 | 1.5 | 1.5 | 1 | 0 | 1.5 | 1 | 0.5 | 1.5 | 1.5 | **11** |
| Learning | 1.5 | 0.5 | 2 | 2 | 0 | 2.5 | 2 | 0.5 | 1.5 | 1.5 | **14** |
| Scaling | 0.5 | 1 | 1 | 0.5 | 0 | 1.5 | 1 | 0.5 | 1 | 1.5 | **8.5** |
| AI Factory | 1 | 1 | 1 | 0.5 | 0 | 1.5 | 1 | 0.5 | 1 | 1.5 | **9.5** |

### Notes for each page

- **Essay.** The opening is a sentence ("A chatbot answering a question is, underneath, a few hundred billion light switches…"), and the first figure comes after 275 words. It is a hub page: 15 figures over 14 topics, so almost nothing builds on the figure before.
  - Five of the 15 figures are charts: dennard, joulesPerOp, imagenetCompute, computeTrend, clusterGrid.
  - The ending is a stack of TWh statistics, not a final word.
- **The Switch.** It has the best raw material:
  - relay → triode → mosfet is a real lineage;
  - triode is a true simulation;
  - yieldDie is a true object.

  But relayLogic is a schematic rather than a relay, mosfet is a flat cross-section next to an I–V chart, and litho is rows of abstract wave strips. joulesPerTick is a chart.
- **Parallel.** This page should be the most mechanical, and it is the most abstract.
  - systolic is a 4×4 grid of numbers in boxes, where the data should visibly flow (see compare-1).
  - dataDistance is a bar chart where it should be a die with the distance drawn on it.
  - scaleOut is a line chart where it should be a rack.
  - latencyHiding is a Gantt chart. roofline is the one chart that earns its place.
- **Learning.** This is our closest page to his: hands-on figures, direct drag (xorLine, twoLayers, convFilter, qkv) and a reasonable chain.
  - It has the worst density: 400 words per figure, with a median gap of 367.
  - sgdValley is a top-down heatmap of what is really a 3D surface.
  - nextWord and tinyVsNgram are bar lists.
- **Scaling.** By nature this is a page about measurements. Even so, 8 of its 10 figures are charts, and flywheel is decorative.
  - The page has no object at all. It needs one recurring physical anchor: the training run as a pile of tokens going into a model of a given size. humanShare's area square is the only step in that direction.
- **AI Factory.** It is about buildings, power and water, the most physical subject in the series, and has no physical figure.
  - powerLadder is flat blue boxes (compare-3), and coolantFlow is two circles.
  - syncSwing is a square wave, idleCost is two bars, mwhFlow is a Sankey and regionsTWh is a stacked area.

## 3. Per-figure scorecard

**Kinds:**

- **Obj:** a physical object.
- **Mech:** a mechanism with moving parts.
- **Sim:** a simulation.
- **Diag:** an abstract diagram.
- **Chart:** a data plot.
- **Illus:** decorative.

**Score:** how close the figure is to his standard, 0–5.

**Verdicts:**

- **keep:** good as it is.
- **polish:** chrome, colour-coded prose and default state.
- **rebuild:** make it an object or mechanism.
- **3D:** rebuild as a 3D figure.
- **cut:** remove, or merge into another figure.

### Essay (index)

| # | Figure | Kind | Score | Gap | Verdict |
|---|---|---|---|---|---|
| 1 | switchAdder | Diag | 2 | Lamp switches wired to labelled gate boxes; the gates are flat boxes | rebuild: the same relay object as The Switch, wired |
| 2 | rippleAdder | Diag/Mech | 3 | Good chain from #1; the carry should travel visibly | polish: animate carry pulses by default |
| 3 | turingTape | Mech | 2.5 | The rule table is a text table you have to read; the head is a marker | polish: a physical head on the tape; table rows light up |
| 4 | flipEnergy | Mech | 3 | A bucket analogy for CV², the closest thing to his style | polish: soft-shade it, put labels on the object |
| 5 | dennard | Chart | 2 | A scatter with a legend, the classic "chart that should be an object" | keep as the one chart; or show a die shrinking with a heat glow |
| 6 | joulesPerOp | Chart | 2 | Bars; the point (a million-fold drop) is in the axis | rebuild: a "joule bucket" filled by N operations, reusing #4 |
| 7 | manyHands | Diag | 2 | Progress bars | rebuild: cores as hands working on one adder |
| 8 | dragLine | Sim | 3.5 | Direct drag on a real-data scatter; good | polish |
| 9 | lossValley | Sim | 3 | Top-down heatmap; the "valley" metaphor is lost in 2D | **3D** (change #3) |
| 10 | tinyNet | Sim | 3 | Fine; a slider where dragging a neuron would teach better | polish |
| 11 | imagenet | Obj | 3.5 | Real photos with guesses; good | polish: reduce readout text |
| 12 | imagenetCompute | Chart | 2 | Scatter | merge into #14, or cut |
| 13 | attention | Diag | 3 | Token chips with heat maps; the map grid needs legend-reading | polish: arcs between tokens instead of matrices |
| 14 | computeTrend | Chart | 2 | Log scatter | keep one; tie to an object (a pile of H100-hours) |
| 15 | clusterGrid | Chart | 1.5 | A log ladder of text labels | **3D**: the die → rack → hall zoom (change #6) |

### The Switch

| # | Figure | Kind | Score | Gap | Verdict |
|---|---|---|---|---|---|
| 1 | relayLogic | Diag | 2.5 | A schematic; the armature never moves | rebuild: a 2.5D relay (coil, armature, contact) that clicks, then wire two |
| 2 | triode | Sim | 3.5 | A real electron simulation; the flat box is the only gap | polish: a cylindrical tube in 3D view, same particles |
| 3 | mosfet | Diag + Chart | 2.5 | A flat cross-section next to an I–V chart you have to read (compare-2) | **3D**: a transistor you can cut open (change #5) |
| 4 | joulesPerTick | Chart | 2 | A decline chart | merge into #3 (energy per flip readout as the transistor shrinks) |
| 5 | darkSilicon | Obj | 2.5 | A grid of squares; it should look like a die and glow | polish: a die render with a heat glow, reusing #7's die |
| 6 | litho | Diag | 2 | Abstract wave strips; there is no mask, wafer or light | rebuild: light through a mask onto resist, then a feature that blurs as the wavelength grows |
| 7 | yieldDie | Obj | 3.5 | A real wafer; direct drop of defects | keep; make it the anchor for #5 |

### Parallel

| # | Figure | Kind | Score | Gap | Verdict |
|---|---|---|---|---|---|
| 1 | matmulGrid | Diag | 2.5 | Grids that light up; OK | polish: share its matrices with #3 |
| 2 | roofline | Chart | 2.5 | A canonical chart; it earns its place | keep, polish |
| 3 | systolic | Diag | 2 | Numbers in boxes; the "flow" is implied, not seen (compare-1) | **rebuild: data pulses flowing** (change #4) |
| 4 | latencyHiding | Chart | 2 | A Gantt chart | rebuild: warps as workers queuing at a memory door |
| 5 | precisionBits | Diag | 2.5 | A bit strip; OK | polish |
| 6 | dataDistance | Chart | 1.5 | Bars | rebuild: a die and HBM map with the path drawn (change #7) |
| 7 | scaleOut | Chart | 1.5 | A line chart | fold into the rack zoom (change #6) |

### Learning

| # | Figure | Kind | Score | Gap | Verdict |
|---|---|---|---|---|---|
| 1 | xorLine | Sim | 3 | Direct drag; good | polish |
| 2 | twoLayers | Sim | 3 | A good build from #1 | polish |
| 3 | backpropFlow | Diag | 3 | A node graph; the blame flow could be animated by default | polish |
| 4 | sgdValley | Sim | 3 | Top-down; a slider for step size | **3D surface** (change #3) |
| 5 | convFilter | Sim | 3.5 | Good | keep |
| 6 | overfit | Sim + Chart | 3 | OK | polish |
| 7 | rnnMemory | Diag | 2.5 | Token strip with bars | polish |
| 8 | qkv | Diag | 3 | Vector compass; good | polish |
| 9 | nextWord | Chart | 2 | A bar list | polish; merge with #10 |
| 10 | tinyVsNgram | Chart | 2.5 | Text and bars | polish |

### Scaling

| # | Figure | Kind | Score | Gap | Verdict |
|---|---|---|---|---|---|
| 1 | powerLaw | Chart | 2 | The core idea, as a chart | keep; add a physical anchor (the model as a block that grows) |
| 2 | threeKnobs | Chart | 2.5 | A U-curve | polish |
| 3 | tokensPerParam | Chart | 2 | Scatter | polish |
| 4 | frontierSlope | Chart | 2 | Scatter | merge with #3 or cut |
| 5 | dataWall | Chart | 2 | A chart | rebuild: a library of all the text, emptied as models train |
| 6 | humanShare | Diag | 2.5 | An area square; the right idea | polish |
| 7 | flywheel | **Illus** | 1 | A decorative spinning ring; it teaches nothing | **cut**, or replace with the data-driven Llama 2 rounds (REVIEW-2) |
| 8 | dataIndustry | Chart | 1.5 | Lines with a legend | polish, or cut |
| 9 | trainingBill | Chart | 1.5 | Two bars | merge into the AI Factory zoom |
| 10 | inferenceVsTraining | Chart | 1.5 | Crossing lines | polish |

### AI Factory

| # | Figure | Kind | Score | Gap | Verdict |
|---|---|---|---|---|---|
| 1 | powerLadder | Diag | 1.5 | Flat blue boxes (compare-3) | **3D zoom** (change #6) |
| 2 | coolantFlow | Diag | 1 | Two circles | rebuild: a cold plate (change #8) |
| 3 | mwhFlow | Chart | 2 | A Sankey | keep; colour-code it to the zoom |
| 4 | idleCost | Chart | 1.5 | Bars | merge into the zoom's readout |
| 5 | syncSwing | Chart | 1.5 | A square wave | rebuild: the hall with racks pulsing in step, the wave drawn underneath |
| 6 | regionsTWh | Chart | 2 | A stacked area | keep; it is the one chart this page needs |

### Totals

- **Breakdown of the 55 figures:**

  | Kind | Count |
  |---|---|
  | Charts | about 22 (40%) |
  | Abstract diagrams | about 15 |
  | Simulations | about 11 |
  | Objects | about 4 |
  | Mechanisms | about 2 |
  | Decorative | 1 |
  | 3D | 0 |

- **His posts:** almost no charts.
- **Where the chain breaks worst:**
  - Essay: by design;
  - Scaling: chart to chart, with no recurring object;
  - AI Factory: six unrelated figure types;
  - Parallel: matmulGrid's matrices are not reused in systolic.

## 4. Top 10 changes, ranked by quality gained per unit of effort

Effort is in focused agent-days. It includes the checkall pass (audit, touch, phone, file://).

1. **A consistent visual system and minimal figure chrome** (all 55 figures). **M, 2–3 days.** This is the biggest win per day.
   - **Stage and palette:** one `#F8F8F8`-style stage and one seven-colour part palette in `colors.js`.
   - **Colour-coded prose terms:** a `<b class="c-red">` style class whose colour matches the figure part and the slider tint.
   - **Labels:** on the object, never in a legend.
   - **Captions:** the three caption blocks become one short readout line.
   - **Notes:** MODEL/REAL DATA becomes a small "ⓘ data" toggle, so the cited data and assumption labels are kept but hidden by default.
   - **Motion:** autoplay on scroll-in with a pause chip.
   - **Defaults:** every figure opens mid-action.
2. **Openings rewritten to start from an object** (6 pages). **S, 1 day** for the text. The hero objects come from changes #3–#6, and until those land each page uses its best existing figure, moved to the top.
   - The Switch opens on the relay clicking.
   - Parallel opens on the systolic array running.
   - Learning opens on the ball rolling down the loss surface.
   - Scaling opens on the token pile.
   - AI Factory opens on the rack.
   - Endings get a reflective *Final Words* plus *Further Reading*.
3. **Gradient descent on a rotatable 3D loss surface** (replaces sgdValley and lossValley). **M, 2 days**, including a shared three.js stage module.
   - It reuses the existing loss function. A ball rolls along the real descent path, and the top-down heatmap becomes the floor shadow, which links it to the 2D figures.
   - Controls: one step-size slider and yaw drag; the default is mid-descent.
   - It is the cheapest 3D figure, so it proves the stage. The stage module must provide:
     - `pan-y` touch handling;
     - `IntersectionObserver` pause;
     - a WebGL fallback;
     - a soft-lit pastel material;
     - an ortho/perspective camera toggle.
4. **A systolic array with data flowing** (Parallel). **M, 1.5–2 days.**
   - Cells become 2.5D multiply-accumulate tiles, and the values travel as coloured pulses (the row operand in one colour, the column operand in another) that you can follow.
   - Use matmulGrid's matrices; one time slider; the default is mid-wave.
   - Add a bridging figure before it: "one cell", the same tile alone.
5. **A 3D transistor you can cut open** (The Switch). **L, 3–4 days.**
   - One slider drives a section plane through planar → FinFET → gate-all-around. The gate voltage fills the channel, using triode's electron particles.
   - Dimensions are labelled "schematic, not to scale", except the cited pitch numbers.
   - It absorbs joulesPerTick as a readout.
6. **GPU die → board → rack → hall, in 3D with one continuous zoom** (AI Factory and Parallel). **L, 4–5 days.**
   - It replaces powerLadder and clusterGrid, and absorbs scaleOut and idleCost.
   - Each level carries a cited watt readout: H100 700 W TDP, the NVL72 rack, the building's MW.
   - HBM stacks sit next to the die.
   - Two uses: the hero of AI Factory, and a reprise in the Essay.
7. **dataDistance as a die map** (Parallel). **S–M, 1 day** if done after #6, because it reuses the die model.
   - The path a number travels (register, SRAM, HBM, NVLink) is drawn on the chip with the cited energy per byte.
8. **coolantFlow as a cold-plate mechanism** (AI Factory). **M, 1.5–2 days.**
   - Water runs through a channel over the die; heat particles; a flow-rate slider; the outlet ΔT comes from P = ṁ·c·ΔT and is labelled as a model.
9. **Repair the build-up chains** (every page). **M, 3 days.**
   - Add 1–3 small bridging figures per page that reuse the previous figure's object; target about 150 words per figure, about 2× today's density.
   - Cut flywheel; merge imagenetCompute into computeTrend, frontierSlope into tokensPerParam, joulesPerTick into mosfet, and idleCost and trainingBill into the zoom.
   - This lowers the figure count where figures are duplicated and raises it where the chain needs steps.
10. **The relay as a real relay, and litho as light through a mask** (The Switch). **M, 2–3 days.**
    - Relay: the coil pulls the armature, the contact closes and the lamp lights. Then two relays make an AND gate, which also replaces the Essay's switchAdder gate boxes.
    - Litho: the mask and resist are on a wafer, and a feature blurs as the wavelength or feature size slider moves.

**Total:** about 21–27 agent-days.

Changes #1–#4 take about 6.5–8 days and remove the most visible gap: no 3D, legend-reading, chart walls.

## 5. Suggested ordering

1. **Week 1: the foundation.** #1 visual system and chrome, then #2 opening text. Everything after inherits these. Build per-page IIFE bundles now; see "Feasibility notes" below.
2. **Then the 3D stage, proved on the cheapest figure:** #3 loss surface. Phone, touch and file:// checks must pass before any other 3D work.
3. **#4 systolic flow.** It is 2.5D canvas work, low risk and high payoff, and it can run in parallel with #3.
4. **#6 die → rack → hall,** then #7 die map, then #8 cold plate. They share one die model, built once and used three times.
5. **#5 transistor cut-open,** then #10 relay and litho.
6. **#9 chain repair and cuts** run alongside, page by page as each new hero lands. Re-measure the words between figures each time.
7. **A final consistency pass:**
   - shared colour names in the prose;
   - sliders tinted to their part;
   - defaults mid-action;
   - a checkall pass at 1280 and 390 px.

## Feasibility notes

- **three.js.** The electricity series already bundles `three@^0.186.1` with no CDN (`src/figs/hero3d.js`). Add it to this repo with `pnpm add three`.
- **Bundle size.** Our single `app.js` is already 527 KB, and three.js adds roughly 0.5 MB minified. On file://, module chunk loading fails in Chrome, so esbuild code-splitting will not work there. Build per-page IIFE bundles instead, so only pages with 3D load three.js.
- **Touch.** Copy the electricity pattern, not his: `touch-action: pan-y`, horizontal drag for yaw, and a pitch slider or a two-finger gesture. Vertical swipes must always scroll. Add a `_touch` test for every 3D canvas.
- **Phones.** Pause off-screen renderers, cap the pixel ratio at 2, use a low-power WebGL context, and show a static PNG fallback if WebGL fails. Keep the number of live WebGL contexts per page small: one shared renderer or at most 3–4.
- **Real data.**
  - Every 3D object carries a cited number or a "schematic, not to scale" label in its ⓘ note.
  - No invented dimensions.
  - No Energy-Charts data.
- **Honest limit.** He spends months on each post, with 56–120 figures each. Matching his density on six pages would mean about 400 figures. The realistic target is about 2× our current density, every figure at his finish, and one 3D hero per page.

## Comparison images (private; not shipped)

- `ciech-ref/compare-1-mechanism-vs-systolic.png`: his escapement versus our systolic.
- `ciech-ref/compare-2-3dscene-vs-mosfet.png`: his lens_frustum versus our mosfet.
- `ciech-ref/compare-3-object-vs-powerLadder.png`: his watch hero versus our powerLadder.
