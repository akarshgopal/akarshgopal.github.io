# Plan: *How Machines Learned* — computers, power and data into modern AI

Status: a plan only, nothing is built. Written 19 Oct 2026 (Europe/Berlin).
Inherits from `/workspace/electricity-explainer`: the build (`build.mjs`, `series.mjs` with stubs so links into posts that aren't written yet still resolve), `style.css`, the nav, prev/next and `xref` links, `€/$` toggle, `audit.mjs --stress`, `linkcheck.mjs` and `shots-series.mjs`. The rules are the same: pnpm only, everything relative so it works from file://, and checked at 390 px.

## House rules, carried over (CIECH-REVIEW / REVIEW-3)
1. **Every figure is a mechanism.** Real-data charts go only where the reader *does* something to them (drag a budget, place a plant). Otherwise the number goes into the prose or a note. Target: ≥70% mechanism figures (last series: ~35/97 at first).
2. **Build-up chains.** One drawing grows from one figure to the next. The chains are listed per page below, and every figure names its parent.
3. **One idea, one gesture.** At most 2 controls in view, the rest under *More*. You drag the thing itself (the switch, the weight, the token, the GPU rack), not a slider under it.
4. **Intuition before jargon.** Each term is introduced only after the demo that makes it obvious. The jargon list per page is given below, in the order it should appear.
5. **One figure every 100–200 words** in the explanatory stretches. No paragraph with more than 3 numbers.
6. **Real cited data only.** Models are labelled as models in the caption, and every number has a note. Cross-page constants live in one shared module (`lib/constants.js`: GPU watts, PUE, €/$) so they can't drift apart (last time 655 vs 573 and the 0.92 vs 1.13 rate did).
7. **Phone-first.** The canvas stays on screen while you drag, labels sit on the shapes (no legends), and touch only grabs your finger when you start on a handle.
8. **Worldwide.** Every page has non-US/EU cases: UK (Colossus, Manchester), Germany (Zuse), Japan (Fugaku, Sony/Toshiba), Taiwan (TSMC), Korea (SK hynix/Samsung HBM), Netherlands (ASML), China (Sunway, Huawei Ascend, DeepSeek), India, Ireland, Malaysia, the Gulf and the Nordics.

**Colour code (series-wide):** compute/switching = blue · memory/data movement = green · energy/heat = orange→red (the same orange as "losses" in the electricity series) · time = grey · learning signal (loss/gradient) = purple. When an electricity figure is reused, it keeps its own fuel colours.
**Perspective per figure:** cross-section for devices, top-down floorplan for chips, an axonometric cutaway only for the data hall, plain 2D plots for laws. Whatever explains best wins.

---

## 1 · Series structure

| # | Page | File | One-line thesis |
|---|---|---|---|
| 0 | **Main essay: From Switch to Supercluster** | `index.html` | Modern AI arrived when three costs fell together, the cost of a switch flip, of a joule and of a stored byte, until simply scaling one learning rule on all the text in the world beat every clever design. |
| 1 | **The Switch: relays to 2 nm** | `the-switch.html` | Every computer is only switches. 80 years of progress was making each flip smaller and cheaper in energy, until around 2005 heat, not size, became the limit. |
| 2 | **Parallel: why GPUs won** | `parallel.html` | Neural networks are almost all multiply-adds. The winning hardware is the one that moves the fewest bytes per multiply: GPUs, systolic arrays and HBM. |
| 3 | **Learning from Data: perceptron to transformer** | `learning.html` | A network is a landscape you roll downhill. 60 years of ideas mattered less than having enough data and compute to roll far enough, and attention made the rolling parallel. |
| 4 | **Scaling: the bet that loss is predictable** | `scaling.html` | Loss falls along a straight line on a log-log plot of compute, so AI turned from a research problem into a capital, data and energy project, and data may run out first. |
| 5 | **The AI Factory: chips, cooling and the grid** | `ai-factory.html` | A frontier cluster is a gigawatt-class industrial load that runs flat out around the clock. The binding constraint has moved from chips to grid connections, transformers and the price of a 24/7 kWh. |

Post 5 is the bridge to the electricity series. It reuses the electricity series' own figure modules (gridDay, merit, buildPlant).

---

## 2 · Per-page outlines and figures
Format: **figure**: *what you manipulate* → *what it reveals*. ↳ shows what it builds on.

### 0 · Main essay (≈14 sections, ~9k words, ~30 figures)
1. **What is a computation?** **`abacus→switch`**: *flip three light switches by hand to add two 1-bit numbers* → arithmetic is just switches arranged so that one switch drives another. (Root of chain A.)
2. **Babbage to Turing.** **`turingTape`**: *drag the head along a tape and step a 3-rule machine* → one simple machine plus a program can imitate any other (Turing 1936). Babbage's engine shown with the same gears as the mechanical counter in fig 1.
3. **Electrons instead of gears.** **`relayTubeTransistor`**: *drag the "size" of one switch from relay → vacuum tube → transistor* → flips per second rise ~10⁶× and energy per flip falls; ENIAC's ~18k tubes and ~150 kW appear as the tube stop. ↳ fig 1.
4. **The chip.** **`waferZoom`**: *pinch or drag to zoom from a wafer down to one transistor* → the same switch, ~10¹¹ times on one chip. Leads into Post 1.
5. **Moore and Dennard.** **`dennard`** (signature): *drag the gate length down over the years* → voltage, clock and power density all scale, until voltage stops falling around 2005 and the chip glows red. That is the clock-speed wall, plotted on Rupp's real 50-year data. ↳ fig 3.
6. **Energy per operation.** **`joulesPerOp`** (signature): *pick one job (one ImageNet epoch, one chatbot answer) and drag it down the machine ladder ENIAC → Cray-1 → ASCI Red → K computer → H100* → the joules (and €) for the same work fall ~10¹⁵×. This is where joules first appear, and it links to the electricity series.
7. **Doing many things at once.** **`oneVsMany`**: *drag a slider of "cores", from 1 fast to 1,000 slow, over a fixed task mix* → why graphics and neural nets suit many slow cores (Amdahl appears as a grey serial bar that won't shrink).
8. **Learning instead of programming.** **`dragTheLine`**: *drag a line to separate red and blue dots yourself, then press "learn" and watch a perceptron do it* → a weight is a knob, and learning is turning knobs. (Root of chain C.)
9. **Rolling downhill.** **`lossValley`**: *drop a ball on a loss surface and drag the step size* → gradient descent; too big a step overshoots. It reuses the electricity essay's potential-hill drawing.
10. **Data.** **`dataNeeds`**: *drag the number of training examples for a small net classifying the reader's own drawn shapes* → it overfits with few examples and generalises with many. ImageNet's 1.2M labelled images is the stop that made 2012 possible.
11. **2012.** **`imagenetDrop`**: *drag the year* → the ILSVRC top-5 error falls from ~26% (2011) to 15.3% (AlexNet, 2 GPUs) to below the ~5% human estimate (2015). Each stop shows the compute used.
12. **Attention.** **`attendWord`**: *drag a word in a sentence and see which others it looks at* → the core of a transformer, and why it parallelises where an RNN must go word by word. Leads into Post 3.
13. **Scaling.** **`computeBudget`** (signature): *drag a FLOP budget along Epoch's real notable-models scatter (1950→2026)* → training compute grew ~4–5× a year since 2010. The readout converts it to GPU-hours, MWh and €, reusing the electricity series' €/MWh.
14. **The factory and the grid.** **`clusterToGrid`** (signature): *drag the number of GPUs from 8 → 100k → 1M* → the load grows from a household to a city to a power plant, and is dropped onto the electricity series' gridDay chart as a flat band. Futures: IEA 2030/2035 cases, with the readout labelled as scenarios.

Jargon order: bit → logic gate → transistor → clock → FLOP → parallelism → weight → loss → gradient → token → parameter → scaling law → PUE.

### 1 · The Switch (≈10 figures). Chain A: switch → gate → adder → chip
1. **`relayClick`**: *close a relay by hand, then drive a second from the first* → that is amplification and the reason any logic is possible (Shannon 1937: switching circuits = Boolean algebra).
2. **`tubeGlow`**: *heat the cathode, drag the grid voltage* → the triode works as a switch with no moving parts, but the heater burns watts even at rest (ENIAC's failure rate).
3. **`bandsToGate`**: *drag the gate voltage on a MOSFET cross-section* → a channel opens. It reuses the solar post's band drawing (`solar-pv.html#junction`), so the reader has seen it before.
4. **`cmosInverter`**: *toggle the input; a charge "bucket" fills and empties* → energy per flip ≈ ½CV², and why lowering V was the big win.
5. **`buildAdder`**: *wire NAND gates on a grid to make a full adder, then chain 8* → a counter that counts your clicks. Carry ripple delay is shown in grey time.
6. **`dennard`** (shared with the essay), in a full version: *drag the node (10 µm → 2 nm "N2")* → the end of Dennard scaling, multicore, dark silicon.
7. **`litho`**: *drag the wavelength (436 nm g-line → 193 nm → 13.5 nm EUV)* → the smallest printable line. ASML (NL), Zeiss (DE) and TSMC (TW) appear as the worldwide supply chain, said in one sentence, not a chart.
8. **`yieldDie`**: *drag die size on a wafer with random defects* → why big chips are expensive and why chiplets exist. ↳ fig 6 of the essay (wafer).
9. **`costPerTransistor`**: *drag the year* → it uses real data only where it is CC BY (see §4), otherwise prose.
Jargon: relay → triode → MOSFET → CMOS → node → EUV → yield.

### 2 · Parallel (≈9 figures). Chain B: one multiply → matrix → systolic array → GPU → HBM
1. **`dotByHand`**: *drag one row across one column; each multiply-add lights up* → a neuron is a dot product.
2. **`matmulGrid`**: *drag the matrix size* → the work grows as n³ but the data only as n². That gap is the whole game.
3. **`roofline`** (signature): *drag a kernel's arithmetic intensity (FLOP per byte)* → it hits either the memory-bandwidth slope or the compute roof. Real chips (Epoch ML-hardware data) sit as dots on the roof.
4. **`systolic`**: *step data through a 4×4 array of multipliers* → each number is reused many times without going back to memory (TPU 2015/16).
5. **`warpScheduler`**: *add threads to a GPU core and watch the latency get hidden* → why GPUs have thousands of threads, with CUDA in 2006 as a historical stop.
6. **`precisionBits`**: *drag the bit width from 32 to 16, 8 and 4* → the energy and area per multiply shrink, and the rounding error on a tiny net stays acceptable down to some point. This is where FP8 and FP4 come from.
7. **`hbmStack`**: *drag the distance data travels: on-die → HBM → DRAM → another server* → picojoules per bit rise ~100×. This is why HBM (SK hynix/Samsung, KR) sits next to the GPU and why memory is the bottleneck.
8. **`scaleOut`**: *split one model across 1, 8 and 1,000 GPUs* → communication time eats the speed-up (interconnect bandwidth). ↳ essay `oneVsMany`.
Jargon: FLOP → arithmetic intensity → bandwidth → systolic → precision → HBM → interconnect.

### 3 · Learning from Data (≈10 figures). Chain C: line → neuron → layers → convolution → attention
1. **`dragTheLine`** (from the essay), extended to **XOR** → one line can't separate it (Minsky–Papert 1969, the first AI winter).
2. **`twoLayers`**: *drag the hidden neurons' lines* → their combination bends the boundary and solves XOR.
3. **`backpropFlow`**: *nudge one weight and watch the error change flow backwards in purple* → the chain rule as a picture (Rumelhart–Hinton–Williams 1986).
4. **`lossValley`** in a full version: momentum, a learning-rate schedule and noise (SGD).
5. **`convFilter`**: *drag a 3×3 filter across a drawn digit* → edge detectors. Shared weights are why CNNs need less data (LeCun 1989).
6. **`overfit`**: *drag model size against data size* → the U-curve, with "double descent" shown honestly as a later finding.
7. **`rnnBottleneck`**: *read a sentence one word at a time through a small memory* → early words fade, and this is slow by construction.
8. **`attendWord`** (shared), in a full version: query, key and value shown as three coloured arrows → attention as a soft lookup table (Vaswani et al. 2017).
9. **`nextToken`**: *pick the next word from a tiny bigram, then a tiny transformer trained in the browser on a public-domain text* → what "predict the next token" feels like.
10. **`rlhfNudge`** (optional): *rank two answers* → the preference signal reshapes the output distribution.
Jargon: weight → loss → gradient → backprop → convolution → overfitting → token → embedding → attention.

### 4 · Scaling (≈8 figures). Chain D: one curve → three knobs → budget → frontier
1. **`powerLaw`**: *drag points of training runs on linear vs log axes* → a straight line on a log plot means "same improvement for each 10×".
2. **`threeKnobs`** (signature): *drag parameters and tokens under a fixed compute budget (C ≈ 6ND)* → the loss valley has a best ratio, and Chinchilla (2022) moved it to about 20 tokens per parameter, against Kaplan (2020).
3. **`computeBudget`** (shared), in a full version: Epoch's frontier models coloured by country/lab (US, China, UK, FR, IL, KR, JP, …), with the growth rate shown as a slope you can lay on the data yourself.
4. **`dataWall`**: *drag the year forward* → the tokens needed against the stock of public human text (Epoch's estimate, shown with its uncertainty band). Synthetic data and multimodal data are introduced as open questions, not claims.
5. **`trainingBill`**: *drag a model size* → GPU-hours, MWh, € of electricity against € of hardware. It shows that electricity is ~5–15% of the cost (to be computed from cited inputs, not asserted).
6. **`inferenceVsTraining`**: *drag users per day* → serving costs overtake training. ↳ fig 5.
7. **`algorithmicProgress`**: *toggle "2026 algorithms" on a 2014 problem* → the compute needed for a fixed result falls too (Epoch estimates).
8. **`benchClimb`**: *drag compute* → benchmark scores as S-curves (Epoch Benchmarking Hub), with saturation shown.
Jargon: power law → parameters → tokens → compute-optimal → inference → benchmark saturation.

### 5 · The AI Factory (≈10 figures). Chain E: one GPU → server → rack → hall → campus → grid
1. **`gpuWatts`**: *drag utilisation on one accelerator* → board power (H100 SXM 700 W TDP) and where it goes. It reuses `cmosInverter`, because every watt ends up as heat.
2. **`rackBuilder`**: *add servers to a rack* → 10 kW air-cooled → 40 → 130 kW liquid-cooled, and air stops working (heat flux you can see as a red shimmer).
3. **`coolingLoop`**: *drag the outside temperature (Singapore, Virginia, Dublin, Luleå, Riyadh)* → chiller energy and water use. The PUE term appears here; it reuses the electricity series' heat-pump COP figure.
4. **`gpuHoursPerMWh`** (signature): *drag PUE and server overhead* → about 1 MWh ≈ 600–800 H100-hours (the model's inputs are the NVIDIA DGX H100 10.2 kW and IEA PUEs; the exact value is to be computed, not quoted). That turns €/MWh from the electricity series into €/GPU-hour.
5. **`clusterToGrid`** (shared), in a full version: *drop a 1 GW campus into a region* → it lands on that region's `gridDay` (from the electricity series) as a flat band, and the merit order (`#fig-merit`) shows which plant runs for it and the price it adds.
6. **`connectionQueue`**: *drag "years to connect" against "years to build"* → why campuses build their own gas turbines or batteries. ↳ electricity series `#fig-queueFunnel`, `transmission.html#planning`.
7. **`transformerCount`**: *drag campus size* → how many large power transformers it needs, with lead times. ↳ `transformers.html#fig-family`.
8. **`flatVsFlexible`**: *drag the share of the load that can wait (batch inference, checkpointed training)* → the same `cheapHours` logic as electrolysers. Data centres' capex per MW is ~10–50× an electrolyser's (to be sourced), so they run 24/7, and that is why they buy firm power, not cheap hours.
9. **`loadTrip`**: *trip 1.5 GW of data-centre load at once* → the electricity series' frequency figure, run in reverse (NERC's July 2024 Virginia load-loss incident, to verify).
10. **`whereTheTWhGo`**: *drag the year to 2035 by region (US, China, EU, Japan, India, rest of world)* → IEA Base Case and sensitivity cases as bands, against each region's total demand (Ember). Ireland's data-centre share (~21–22% of metered electricity, CSO) is a stop, to verify.
Jargon: TDP → rack density → PUE → firm power → interconnection queue → behind-the-meter.

---

## 3 · History timeline spine
A thin **timeline strip** sits under the series nav on every page (it is built from `src/timeline.mjs` like `series.mjs`). The current page's span is highlighted and each tick links to the section that tells it. Worldwide stops are marked ◆. Every date gets a note with a source during the build; dates marked † are to double-check.

| Year | Event | Page |
|---|---|---|
| 1822 / 1837 | Babbage's Difference Engine; the Analytical Engine design ◆UK | 0 §2 |
| 1843 | Lovelace's notes (the first published program) ◆UK | 0 §2 |
| 1936 | Turing, *On Computable Numbers* ◆UK | 0 §2 |
| 1937 | Shannon's thesis: relay circuits = Boolean algebra | 1 |
| 1941 | Zuse Z3 ◆DE | 1 |
| 1943 | McCulloch–Pitts neuron; Colossus (1943–44) ◆UK | 3, 1 |
| 1945–46 | ENIAC (~18k tubes, ~150 kW†); von Neumann's EDVAC report | 0 §3 |
| 1947 | Point-contact transistor, Bell Labs | 1 |
| 1948 | Manchester Baby, the first stored program ◆UK; Shannon's information theory | 1 |
| 1956 / 1958 | Dartmouth workshop; Rosenblatt's perceptron | 3 |
| 1958–59 | Integrated circuit (Kilby, Noyce); MOSFET (Atalla & Kahng, 1959) | 1 |
| 1965 | Moore's paper (doubling, revised to every 2 years in 1975) | 0 §5 |
| 1969 | Minsky–Papert *Perceptrons* → first AI winter | 3 |
| 1971 | Intel 4004 (Busicom ◆JP commission) | 1 |
| 1974 | Dennard et al., MOSFET scaling rules | 0 §5, 1 |
| 1976 | Cray-1 | 0 §6 |
| 1986 | Backpropagation popularised (Rumelhart, Hinton, Williams) | 3 |
| 1987 | TSMC founded (foundry model) ◆TW | 1 |
| 1989 | LeCun's convolutional net for zip codes | 3 |
| 1993 | The first TOP500 list | 0 §6 |
| 1997 | Deep Blue; LSTM (Hochreiter & Schmidhuber ◆DE) | 3 |
| 1999 | GeForce 256 marketed as the first "GPU" | 2 |
| ~2005 | Dennard scaling ends; clocks stall at ~3–4 GHz | 0 §5, 1 |
| 2006–07 | CUDA | 2 |
| 2009 | ImageNet (CVPR 2009) | 0 §10 |
| 2011 | K computer #1 on TOP500 ◆JP | 0 §6 |
| 2012 | AlexNet: 15.3% top-5, 2 GTX 580s | 0 §11 |
| 2015–16 | Google TPU v1 in service; AlphaGo ◆UK (DeepMind) | 2, 3 |
| 2016 | Sunway TaihuLight #1 ◆CN | 0 §6 |
| 2017 | *Attention Is All You Need* | 3 |
| 2019 | EUV in volume production (ASML ◆NL, TSMC/Samsung) | 1 |
| 2020 | Kaplan scaling laws; GPT-3; A100; Fugaku #1 ◆JP | 4 |
| 2022 | Chinchilla; H100; ChatGPT (30 Nov) | 4 |
| 2024 | 100k-GPU clusters (e.g. xAI Colossus†); NERC's data-centre load-loss incident† | 5 |
| 2025 | IEA *Energy and AI*; DeepSeek-V3/R1 efficiency claims ◆CN | 4, 5 |
| 2026 | GW-scale campuses under construction (Epoch Frontier Data Centers) | 5 |

---

## 4 · Main data sources (checked 19 Oct 2026)
**Publishable (CC BY or public-domain-like):**
| Source | What | Licence (checked) |
|---|---|---|
| Epoch AI: Notable/Frontier AI Models (`epoch.ai/data/all_ai_models.csv`), ML Hardware, GPU Clusters, Frontier Data Centers, AI Chip Sales, Benchmarking Hub | training compute, params, tokens, chip FLOP/s/W, cluster power, campus MW | **CC BY** (stated on the data hub and on each dataset page; CSV reachable) |
| Karl Rupp, *Microprocessor Trend Data* (GitHub) | transistors, clock, power, cores, 1971–2021 | **CC BY 4.0** (README/LICENSE.txt) |
| Our World in Data: transistors per microprocessor (Rupp), AI compute (Epoch) | processed series | **CC BY 4.0** for OWID processing. Third-party inputs keep their own terms: the memory/storage price series (McCallum) has **no clear licence, so I'd cite points, not redistribute** |
| IEA *Energy and AI* (Apr 2025) + Energy and AI datafile (Jun 2025) | data-centre TWh by region, PUE, load factor, 2030/2035 cases, fuel mix | **CC BY 4.0** (on the report and chart pages) |
| LBNL *2024 US Data Center Energy Usage Report* (Shehabi et al., Dec 2024) | 58 TWh (2014) → 176 TWh (2023, 4.4%) → 325–580 TWh (2028) | DOE/LBNL public report, publishable with citation |
| Ember Yearly Electricity Data | each region's demand and mix for the denominators | **CC BY 4.0** (it can also replace Energy-Charts in the electricity series) |
| SMARD (BNetzA) | DE hourly prices if reused | CC BY 4.0 (already used) |
| Papers (facts + our own redraws): Turing 1936, Shannon 1937/48, Dennard 1974, Moore 1965, Rumelhart 1986, LeCun 1989, Russakovsky et al. 2015 (ILSVRC, arXiv 1409.0575), Krizhevsky 2012, Vaswani 2017 (1706.03762), Kaplan 2020 (2001.08361), Hoffmann 2022 (2203.15556), Koomey et al. 2011 | numbers and equations | facts can be cited, and figures are redrawn from the numbers (the arXiv IDs are verified) |
| Vendor datasheets (NVIDIA H100/B200/DGX, Google TPU papers, Huawei Ascend) | watts, FLOP/s, HBM | facts with citation |

**Use with care (no open licence; cite individual facts, don't redistribute a dataset):**
- **TOP500 / Green500**: "freely available", but there is **no explicit licence**. Quote individual systems (Rmax, power) with credit, or ask info@top500.org before shipping a full-list chart. Epoch's GPU-clusters dataset (CC BY) covers most of the same systems.
- **MLPerf® results**: Apache-2.0 code, but results have Terms of Use and trademark rules (® plus attribution). Only cite results where needed.
- **Common Crawl**: own Terms of Use. Cite sizes as facts only.
- **MNIST**: avoid. The reader draws their own digits/shapes, and in-browser training uses a public-domain text (e.g. Project Gutenberg) for `nextToken`.
- **Avoid entirely:** SemiAnalysis, TechInsights, Uptime Institute survey tables, IEA paid datasets, Energy-Charts.

## 5 · Cross-links to the electricity series (and back)
| From (AI series) | To (electricity series) | Why |
|---|---|---|
| 0 §6 `joulesPerOp`, 5 `gpuHoursPerMWh` | `index.html#s11` (`#fig-buildPlant`), `#s13` "A century of cheapening" | €/MWh → €/GPU-hour; two learning curves side by side |
| 0 §14 / 5 `clusterToGrid` | `index.html#fig-gridDay`, `#fig-merit` (`#s6`, `#s7`) | a flat 1 GW load dropped onto a real day and the merit order (module reuse) |
| 5 `loadTrip` | `index.html#fig-frequency` (`#s5`) | losing a load is the mirror of tripping a plant |
| 5 `coolingLoop` | `index.html#fig-heatPump` | chillers are heat pumps; waste heat reuse (Nordics) |
| 1 `bandsToGate` | `solar-pv.html#junction` | the same band diagram, now as a switch, not a cell |
| 1 `cmosInverter`, 5 `gpuWatts` | `index.html#fig-losses` (`#s4`) | every watt ends up as heat, the same as I²R in a wire |
| 5 `connectionQueue` | `utility-renewables.html#fig-queueFunnel`, `transmission.html#planning`, `#fig-buildRate` | the grid build rate is now the AI limit |
| 5 `transformerCount` | `transformers.html#fig-family`, `#shortage` | transformer lead times |
| 5 `flatVsFlexible` | `synthetic-fuels.html#cheap-demand` (`#fig-cheapHours`) | why electrolysers chase cheap hours and data centres can't |
| 5 behind-the-meter gas/nuclear/SMRs | `index.html#s12`, `utility-renewables.html#hybrid-plants` | what supplies a firm 24/7 load |
**Back-links** (this requires editing the electricity series and telling Code Monkey that `dist/` changed): `index.html#s14`/`#s15` → AI `index.html#s14`; `transformers.html#shortage` and `transmission.html#planning` → `ai-factory.html`. The two series sit side by side (`/blog/electricity/` and `/blog/ai/`), so links are `../electricity/…`. linkcheck needs a "sibling series" allowlist.

## 6 · Build order and effort (working days)
| Step | Work | Days |
|---|---|---|
| 1 | Scaffold: copy build/series/audit/linkcheck/shots; `timeline.mjs`; `constants.js`; shared drawing kit (switch, gate, chip, rack) and colour tokens; sibling-series link support | 2 |
| 2 | Data: `make_ai_data.py` (Epoch, Rupp, IEA, LBNL, Ember), notes skeleton, licence log | 2.5 |
| 3 | Main essay with all 5 chains in miniature (≈30 figures, prose) | 8 |
| 4 | Post 1 The Switch | 4 |
| 5 | Post 2 Parallel | 4 |
| 6 | Post 3 Learning (includes a tiny JS training engine with no dependencies, ≤50 KB) | 5 |
| 7 | Post 4 Scaling | 3.5 |
| 8 | Post 5 AI Factory (reuses electricity modules) + back-links | 4.5 |
| 9 | Three review passes (Ciechanowski bar, fact/math audit, phone/stress) | 4 |
| | **Total** | **≈37 days** (≈7–8 weeks) |
Each page ships with screenshots for the user before the next one starts. A cheaper cut is the main essay plus Posts 3 and 5 first (≈22 days).

## 7 · Open questions for the user
1. **Scope and title:** stop at today's frontier clusters (with IEA scenarios as the only "future"), or add a forward-looking/social post (jobs, safety, regulation)? Working title *How Machines Learned*, at `/blog/ai/`. OK?
2. **Real training in the browser:** Post 3 trains tiny nets live (a few seconds on a phone). Is that OK, or should it be pre-computed animations only (lighter, and fully deterministic)?
3. **Maths depth:** show the equations (½CV², C ≈ 6ND, the chain rule) in collapsible deep-dive boxes like the last series, or keep them out entirely?
4. **Licence-grey data:** may I quote individual TOP500/MLPerf numbers with attribution (I can also write to TOP500 for permission), or should I stick strictly to CC BY sources (Epoch covers most of it)?
