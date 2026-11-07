# Figure audit: fewer, stronger figures (proposal, 7 Nov 2026)

The quality plan, item (c), asks for about 40 figures instead of about 90, in one strict visual language. Today the
electricity series has **88 figures**: 1 on the landing page, 71 in the nine essays and 16 in the two deep dives.

This audit proposes **44 figures in the essays and 10 in the deep dives**. **Nothing has been changed yet.** Each
line is a proposal for the author to accept or reject.

**Verdicts**

| Verdict | Meaning |
|---|---|
| **Keep** | Carries the thesis, or is the one clear picture of a mechanism. |
| **Merge** | Becomes a step, tab or preset of another figure. Its content survives, but not its separate frame. |
| **Text** | Its point fits in a sentence or a small table. |
| **Cut** | Decorative, duplicated elsewhere, or off-thesis. |

**Criteria, in order**

1. Does the figure show something the essay's argument needs?
2. Is it the only figure that shows it?
3. Does interacting with it teach something that a sentence can't?

| Page | Today | Proposed |
|---|---|---|
| Landing | 1 | 0 |
| 1 Cheaper, then not | 3 | 3 |
| 2 A kilowatt-hour | 4 | 2 |
| 3 The machine | 6 | 4 |
| 4 Wires | 10 | 7 |
| 5 Balance | 10 | 5 |
| 6 Solar | 8 | 5 |
| 7 Wind | 12 | 6 |
| 8 Costs | 9 | 6 |
| 9 Cheaper again? | 9 | 6 |
| **Landing and essays** | **72** | **44** |
| Deep dive: transformers | 9 | 6 |
| Deep dive: fuels | 7 | 4 |
| **All** | **88** | **54** |

## Landing
- `centuryTeaser`: **Cut.** It is the same chart as `historyChart` in essay 1. Use a static thumbnail that links
  to it.

## 1 Cheaper, then not
- `historyChart`: **Keep.** The curve the whole series explains.
- `electricityUse`: **Keep.** Sets up the four countries.
- `henryAdams`: **Keep.** It also replaces `kardashev` (essay 9).

## 2 A kilowatt-hour
- `resistance`: **Keep.** I²R heat is the root of high-voltage transmission.
- `powerEnergy`: **Keep.** It defines the unit the series is about.
- `drift`: **Merge into `resistance`** as its first step (electrons drift slowly; the signal does not).
- `emfHill`: **Text.** The voltage-as-height idea already carries in the prose.

## 3 The machine
- `rotor`: **Keep**, with `faraday` merged in as its first step (a moving magnet, then a spinning one).
- `rankine`: **Keep.** The Carnot ceiling against the practical limit.
- `effCentury`: **Keep.** The first engine and its plateau, central to the thesis.
- `worldMix`: **Keep.** It shows how much of today's electricity is still "a magnet in a coil".
- `faraday`: merged, as above.
- `threePhase`: **Move to the transformers deep dive**, beside `windings` and `vectorGroups`.

## 4 Wires
- `losses`: **Keep**, with `transformer` merged in. A step-up switch on the same line shows why voltage cuts losses.
- `powerAngle`: **Keep**, with `sagDLR` merged in as a tab. Together they are "what limits a line": heat, then
  angle.
- `loopFlow`: **Keep.** Physics decides the path.
- `redispatch`: **Keep**, with essay 7's `curtailment` merged in. Both show the cost of congestion in Germany.
- `buildGrid`: **Keep.** How fast lines get built.
- `shortage`: **Keep.** Transformer prices and lead times.
- `breakEven` and `hvdcProjects`: **Merge into one HVDC figure.** The cost against distance, with the real
  projects as dots.

## 5 Balance
- `frequency`: **Keep**, with `gridForming` merged in as a slider for the inverter share.
- One merit-order figure, in three steps: offers, then wind, then fuel and carbon. `merit` is **Keep**;
  `meritStack` and `meritWind` are **Merge**.
- `gridDay`: **Keep.** The model day used again in essays 8 and 9.
- `ercotDay`: **Keep.** A real day against the model.
- `network`: **Keep.** Prices that differ by place.
- `timeline`: **Text.** Intraday trading fits in two sentences.
- `marketDesigns`: **Text.** It is a classification, so it works better as a small table.

## 6 Solar
- `spectrum`: **Keep**, with `sqLimit` merged in. The band-gap slider already implies the limit curve.
- `learning`: **Keep.** The second engine.
- `supplyChain`: **Keep.** China's share and the polysilicon cycle.
- `solarFour`: **Keep.** The four countries.
- `costStack`: **Keep.** What a system costs beyond the module.
- `yieldMap`: **Cut.** Latitude against yield is a sentence.
- `captureHistory`: **Merge into `cannibal`** (essay 7), which already plots capture against share.

## 7 Wind
- `windPower`: **Keep**, with `betz` and `specificPower` merged in as steps. All three are about one turbine.
- `turbineScale`: **Keep.** It shows scale. Consider replacing Cologne Cathedral with a less Germany-centric
  landmark (VERIFY.md).
- `wakeField`: **Keep.** Farms steal each other's wind.
- `queueFunnel`: **Keep.** The US queue. The AI series' What binds page cites the same LBNL data in text.
- `cannibal`: **Keep**, with solar's `captureHistory` merged in.
- `seasonsFour`: **Keep.** Seasons in the four countries.
- `curtailment`: **Merge into essay 4's `redispatch`.**
- `offshoreCfd`: **Text.** A UK-only strike-price series; one sentence and a note.
- `revenueModels`: **Text.** A small table of the six contract types.
- `hybridPlant`: **Cut**, or move it to essay 9, where batteries and flexible demand are argued; that would make essay 9 seven figures.

## 8 Costs
- `buildPlant`: **Keep.** What a plant costs, and how capital dominates.
- `foak`: **Keep.** First-of-a-kind overruns.
- `cleanGrid`: **Keep.** The cost of a clean grid.
- `spot`: **Keep.** Germany's wholesale price through the crisis.
- `billWorld`: **Keep**, with `retailWorld` merged in as a second view.
- `usCompare`: **Keep.** US retail against wholesale.
- `bill`: **Cut.** It duplicates the German view of essay 9's `billSplit`, which now covers 2006–2026 in real euros.
- `networkEuro`: **Text.** "Network charges vary 2× across German operators" is a sentence.

## 9 Cheaper again?
- `billSplit`: **Keep.** The core result.
- `salesPrice`: **Keep.** Growth against price.
- `energyShare`: **Keep.** Why the price matters to the whole economy.
- `unlock`: **Keep.** What a megawatt-hour becomes.
- `futureDay`: **Keep.** The surplus.
- `adequacy`: **Keep.** The dark week.
- `offset`: **Cut.** An illustrative switchboard that the real `billSplit` and `salesPrice` now show with data.
- `heatPump`: **Text**, or move into `unlock` as a product.
- `kardashev`: **Cut.** The coda reads well as text; `henryAdams` carries the per-capita energy story.

## Deep dive: transformers (9 → 6)
- `coreFlux`: **Keep.**
- `coreLoss`: **Keep**, with `efficiency` merged in.
- `hotSpot`: **Keep.**
- `tapChanger`: **Keep.**
- `scaleUp`: **Keep.**
- `windings` and `vectorGroups`, plus `threePhase` from essay 3: **Merge** into one three-phase figure.
- `sizeFrequency`: **Text.**

## Deep dive: synthetic fuels (7 → 4)
- `sankey`: **Keep**, with `whereFits` merged in. They show the same efficiency chains.
- `lcohExplorer`: **Keep.**
- `cheapHours`: **Keep.**
- `plant2035`: **Keep.**
- `litreBuilder`: **Text.**
- `electrolyserCell`: **Text.**

## Before any merge
- **Links:** keep every figure's `id` working. Point a removed figure's `#fig-name` anchor at its new home, using
  each page's redirect map and `scripts/redirects.py`. The AI series links to `factory.html#grid`, `#flat` and
  `#swing`, and to electricity sections; none of those links point at the figures listed here.
- **Notes:** renumber with `scripts/renumber-post.py` after captions move.
- **Merges:** most need new figure code, such as steps or tabs inside one figure. That is the bulk of the work.
  "Cut" and "Text" are quick.
