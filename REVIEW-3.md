# Review 3: adversarial pass (2026-10-18)

Scope: everything changed since commit 5dc3731. That covers merit build-up, gridDay, buildPlant, the generator chain, bladeElement, lineField, electrolyserCell, the litre builder, euro defaults, efficiency rebasing and the conductor rating, plus cross-page consistency.
I did not rely on CIECH-REVIEW.md or FACT-AUDIT.md. I recomputed every derived number below from the code or the cited source.

Severity tags: **wrong** · **inconsistent** · **broken** · **unsourced** · **prose** · **nitpick**

## Totals

| severity | found | fixed | open |
|---|---|---|---|
| wrong | 7 | 7 | 0 |
| inconsistent | 8 | 8 | 0 |
| broken | 9 | 8 | 1 |
| unsourced | 0 | 0 | 0 |
| prose | 9 | 9 | 0 |
| nitpick | 5 | 4 | 1 |
| **total** | **38** | **36** | **2** |

## Findings

### wrong
1. **Part 5 §8** said hydrogen storage returns "about 38%" of the electricity. The section 1 sankey, at 55 kWh/kg, gives 33%; the 38% was left over from Agora's older 70% electrolysis. → "about a third (section 1)". FIXED
2. **Part 4 n10** said the direct line has "two-thirds the reactance" of each neighbour path. The code (txl2.js) uses x = 1.0 against 1.5 + 1.5, which is a third, and that is where the 40% loop share comes from. → reworded, with the 40% stated. FIXED
3. **Main essay §11, PJM**: the wholesale price in 2024 "was barely above 2019's". The IMM's load-weighted LMP went from $27.32 to $33.74, which is +23%. → "about a quarter above 2019's 2.7 ¢". FIXED
4. **Solar §1 SQ readout**: "(at 0.88 V and 43.8 mA/cm²)" reads as the operating point, but those columns are Voc and Jsc (make_solar_data.py). Their product implies 38.5%, not 33.4%. → now labelled open-circuit voltage and short-circuit current. FIXED
5. **Main essay, US energy share**: "In the 1970s that share climbed to 13.3%". The peak was 1981 (13.3%; 1980 was 13.1%). → "By 1981…". FIXED
6. **Part 5 litre-builder caption**: "US DOE 2024 status values". The values are 2022 status from DOE's December 2024 assessment. → "status values from the US DOE's 2024 assessment". The same fix went into n12. FIXED
7. **Part 3 transformer core**: "close to where the iron saturates, about 1.7 T". GOES saturates near 2.0 T; designs run at 1.6–1.7 T. → "1.6–1.7 teslas… not far below where it saturates at about 2", which also matches the 1.6 T in the SST note. FIXED

### inconsistent
1. **Part 5 §5**: "a third to a fifth of the electricity". The figure's ratios are 3.1×, 6.3× and 6.5×. → "between a third and a sixth". FIXED
2. **Part 5 futures** silently uses air-captured CO₂ at €250/t (`src:'dacf'`), while section 4 defaults to fermentation CO₂. → disclosed in both the readout and n31, with the reason (fossil CO₂ phased out by 2041). FIXED
3. **lcohExplorer kerosene readout** in USD: "Each $11/MWh off … about 27 cents". The euro count was printed as bare "cents", and curStr only converted the €10. → now "€0.24 off a litre", which converts cleanly. FIXED
4. **Main essay heat-pump caption** said "all in euro cents", but the figure opens in US¢. → "converted at ECB 2025 rates". FIXED
5. **Part 3 GSU readout** said "typically 1,000 MVA" while its own note says "the biggest exceed 1,000 MVA". → "up to about 1,000 MVA". FIXED
6. **Part 5 n6** said "The default 52.9 kWh/kg is the IEA's 63% average", but the default is now 55 kWh/kg system. → rewritten. FIXED
7. **Part 2** links to `index.html#fig-futureDay`, labelled "future grid", for a clean-grid builder claim. → `#build-a-clean-grid`, "clean-grid builder". FIXED
8. **Part 2** link text "Part 5: what a megawatt-hour does" didn't match the target heading. → "what €/MWh does to each product". FIXED

### broken
1. **cheapHours drag** rounded 8,760 to **8,800 hours**, more than a year. The slider maximum was 8,760 with a step of 100, so it stopped at 8,700 while the drag could pass it. → both capped at 8,700. FIXED
2. **bladeElement (desktop)**: the "lift" and "turns the rotor" labels overlapped by about 4 px. → lift label now sits above the arrow tip and the drive label below. Re-shot and checked by eye. FIXED
3. **bladeElement (390 px)**: "blade speed 40 m/s" crosses one of the incoming-wind arrows. Readable, but untidy. OPEN (move the wind arrows right of x = 0.55w on narrow screens). At minimum slice position, "blade speed" also collided with the apparent-wind label; that is FIXED (the label now keeps a 14 px gap).
4. **merit / meritWind label collisions** found by the stress audit, at 390 px (and one at 1280 px). The animated "±$N for every MWh" jump label, the "sets the price" label, the price tag and the wind-handle label overlapped in several presets (Texas, Germany, gas/CO₂/wind/demand extremes). → the marginal label is now laid out first; on narrow screens the price tag drops onto the line when the marginal label would hit it; the jump label picks the first free slot among 8 candidates. Stress audit clean at both widths. FIXED
5. **heatPump (390 px)**: "outside 2 °C" sat on top of "1 kWh electricity" in the default state. The stress audit missed it; I caught it by eye. → on narrow screens the label moves above the outdoor unit. Also, when costs are close, the boiler and heat-pump cost labels collided (US, € and US$ presets). → the boiler label flips below its line when the heat pump is dearer. FIXED
6. **buildPlant**: the "0.0%" cost-of-capital label at its minimum overlapped the "50" y tick. → clamped clear of the axis. FIXED
7. **shading (390 px)**: the three "diode" labels overlapped by 2 px. → "idle" on narrow screens ("on" when a diode conducts). FIXED
8. **Stress audit coverage**: the earlier full-site audit only ran `--stress` on index.html, which is the script's default page. I have now run it on all 6 pages; all are clean at 1280 and 390. (Process finding, counted here.) FIXED

### unsourced
None new. Every numeric claim added since 5dc3731 has a note, and I spot-checked about 10 of them on the web:
Lazard v19 midpoints · IEA GHR 2025 49→37 Mt and 4.2 Mt · EIA 5.15% of GDP 2024 · EU 2019/1783 Table I.7 · LBNL 99% trackers · BNetzA 2024 curtailment (offshore 4,562 GWh, 3.5% total) · Hydrogen Bank IF24 €0.20–0.60 · DOE PEM 51 / 55 kWh/kg · BNEF $108/kWh · PJM IMM LMPs.

### prose (stale references to cut or renamed figures)
- Part 5 n6 "Product-energy figure", n10 "CO₂ figure", n12 "Electrolyser figure … dashed lines", n28 "Policy figure": all four figures were merged into the litre builder or cut. → renamed. FIXED (4)
- Part 4 n13 "Congestion-cost figure" and n39 "Bill figure": no such figures now. → "Congestion costs:" and "Network share of the bill:". FIXED (2)
- Part 3 n13 "the pre-2022 distribution figure": the shortage figure was cut. → "distribution-transformer lead time". FIXED
- Part 2: "solar five times as much in July" (5.6×) → "more than five times". FIXED
- Part 1 §tilt: "at roughly the latitude angle". The yield map's optimum is 40° at 52.5° N. → "a little less than the latitude angle". FIXED

### nitpick
- revenueModels showed "€-2" for a negative year. → "−€2", which still converts to "−$2". FIXED
- futures and lcoh readouts write "$56 floor" (€50 × 1.13 = 56.5). Rounding is acceptable. OPEN, no action
- Merit figure at 390 px: the "sets the price" label touched the price tag. Fixed with broken #4.
- cheapHours slider readout of 8,700 next to the axis label "8,760 h". Fixed with broken #1.
- Part 4 n39: added "and new-contract prices" to explain why BDEW's split differs. FIXED

## Verified by recomputation (no change needed)
- Faraday: 26.6 kWh per volt per kg. electrolyserCell: 1.93 V → 51.3 kWh/kg, 65% LHV, 0.75 kg m⁻² h⁻¹.
- LCOH €6.90 · grey €2.51 · break-evens 570/460/1,200 h · ammonia €1,356/t · e-kerosene €3.50/L.
- Litre builder: 24.2 + 0.3 + 2.4 = 26.9 kWh, 36%.
- Line losses · power angle · lineField (0.26 Ω/km × 200 km = 52 Ω; 52 kV at 1 kA; back-EMF lags the current by a quarter cycle) · conductor 671 A (heat-balance model) vs 680 A (table), within 2%, both stated.
- Transformer losses · ecodesign 693/7,600 W · Dyn11 52% · Betz/wind · bladeElement (TSR 8 → 40 m/s at mid-span, apparent wind 9.5°) · Carnot · heat-pump COP · BDEW layers.
- merit SRMC (gas €35 → $40, CO₂ €75 → $85, CCGT $115 at 50%) · gridDay energy balance (7 + 2 + 6 + 37 = 42 + 10 GW) · buildPlant LCOE (capital 60 + upkeep 9 at 19% CF).
- Cross-page: 55 kWh/kg everywhere · €1 = US$1.13 everywhere · 671/680 A explained.

## Extremes and visual audit
- scripts/r3-extremes.mjs sets every range input to its min and max and clicks every button on all 6 pages. No NaN/undefined/Infinity in any readout, and no page errors.
- Fresh file:// screenshots of all 104 figures at 1280 and 390 px are in /workspace/r3/shots. I checked the changed figures by eye; the findings are above.

## Ciechanowski bar: the five weakest, with redesigns (judgement calls, not done)
1. **Part 4 §11 "Network costs" has no figure** since the bill figure was cut. It is the only section where the reader ends on prose. *Redesign:* a "your network euro" builder. One kWh flows from a wind farm to a socket, and each segment (transmission, distribution, redispatch, metering) is a draggable length or cost. The tariff stack fills as you drag, with DE/US presets and a "double the grid" button showing the per-kWh change.
2. **Part 2 captureCompare + seasonMix**: two static bar charts in a row. *Redesign:* one cannibalisation figure. Drag the solar share from 0 to 40% and watch the noon price trough deepen and capture value fall, with real country-years plotted as dots on the same curve. Add a storage slider that pulls the curve back up.
3. **Part 4 buildRate**: a static km-per-year bar chart. *Redesign:* "build the grid": set km per year and a start year, and a timeline shows when the 2045 need is met. Overlay planning, permitting and construction stages as stacked durations the reader can shorten.
4. **Part 3 family**: a gallery of transformer types. *Redesign:* one transformer that morphs continuously as you drag rating from 1 kVA to 1 GVA. Show core and winding scaling by the area-product law, plus cooling class, weight, losses and lead time, with the real types snapping in as labelled stops.
5. **Part 5 futures heatmap**: dense, and the reader is passive. *Redesign:* a 2D plane of power price against full-load hours where the reader drags "their 2035 plant". Fossil-parity contours for hydrogen, ammonia and kerosene are drawn directly, with policy markers (H2 Bank, RFNBO mandates) as arrows that shift the contours.

Honourable mention: **frequency** (main essay) has too many controls for its lesson. Hide inertia and droop under "More" and lead with a single "trip a 1 GW plant" button.

## Redesigns built (18 Oct 2026)

All five approved redesigns plus the honourable mention. Old anchors kept via explicit ids.

1. **Part 4 "your network euro"** (`networkEuro`, §11). Drag the house along kWh/yr; tap a curve or use More to pick one of 10 operators (SMARD 2025 tariffs). Judgement call: "double the grid" button dropped (would need invented numbers); the 30/70 transmission/distribution split (UBA) is a national average applied to every operator, said in the caption.
2. **Part 2 cannibalisation** (`cannibal`, id `fig-captureCompare`). Drag the sun along share of demand; 2025's hours re-priced on a residual-load price curve; batteries under More. Validation: re-priced 2025 gives 57% / 585 h vs real 52% / 573 h. Judgement call: `seasonMix` kept (it is about seasonal complementarity, not capture; the review mis-described it).
3. **Part 4 "build the grid"** (`buildGrid`, id `fig-buildRate`). BMWE pipeline stock and yearly approval/operation flows; drag the fixed-area block of remaining work. Judgement call: shortenable stage durations replaced by real flows; finish year is division, labelled as such.
4. **Part 3 transformer 1 kVA → 1 GVA** (`scaleUp`, id `fig-family`). EU 2019/1783 Tier 2 efficiency (Table I.1 derived ≤3.15 MVA, Table I.7 above), Siemens FITformer catalogue mass/height, DOE 135–365 t band, cited lead times. Model (labelled): log-log interpolation between catalogue and DOE, height ∝ mass^⅓; no weight estimate below 25 kVA. The visible step at 3.15 MVA is the rules switching metric, labelled on the chart.
5. **Part 5 "your 2035 plant"** (`plant2035`, id `fig-futures`). Drag a plant over power price × full-load hours; lines of fossil parity at €0/70/200/500/1,000 per t CO₂; product switch; capex and US 45V under More. Same model as sections 3–4.
6. **Frequency lead**: one "Trip a 1 GW plant" button plus Reset; bigger trips, inertia, demand, reserves and speed under More; prose updated.
