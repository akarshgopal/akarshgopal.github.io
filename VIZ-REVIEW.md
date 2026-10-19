# Visualisation review (13 Oct 2026)

Method: `scripts/audit.mjs --stress` (every slider at min/max, every button clicked, overlap/clip/NaN/touch-size checks, 1280 + 390 px), `scripts/probe.mjs` (per-figure: does each control change anything, odd number formats, ASCII minus, file:// load, console errors; results in /tmp/probe-{1280,390}.json), and a visual pass over the screenshots in `screenshots/<page>/`.
Ratings: B = bugs, C = confusion, P = polish (1 bad – 5 good). Figures not listed: B5, no probe flags. Visual polish is only rated where I reviewed a screenshot.

## Found by automation (all pages)
| Issue | Count | Status |
|---|---|---|
| Touch targets under 32 px at 390 px (segmented buttons 27 px) | 502 | fixed: 36 px buttons and range thumbs on narrow/coarse screens |
| ASCII hyphen as minus in canvas ticks/labels ("-15°", "€-50", "-2 T") | 9 figures | fixed globally in `draw.text` (typographic −, −€50) |
| tapChanger readout "-3.7%" | 1 | fixed |
| cheapHours "equipment" label overlapping a $ tick | 1 | fixed |
| gridDay / futureDay / capture / network € only while the rest of the series defaults to $ | 4 | fixed: $/€ toggle |
| Odd $ ticks on auto-scaled axes ($56, $113, $169) | gridDay, futureDay | fixed: 1-2-5 $ steps |
| Converted slider outputs like "$2,373/kW" | euroFigure sliders | fixed: 3 significant figures |
| NaN / Infinity / undefined, console errors, file:// failures | 0 | — |

## Per-figure notes (figures reviewed visually)
| Page / figure | B | C | P | Notes |
|---|---|---|---|---|
| index/frequency | 4 | 2→4 | 4 | Default state was an empty chart with no prompt; now shows a "try this" hint. Model already responds to load and inertia. |
| index/merit | 5 | 3→4 | 4 | X axis ran to 160 GW with about 40% empty; now fits the fleet. Next: animate the clearing price when presets change. |
| index/gridDay | 3→5 | 4 | 4 | € in the hover box and odd $ ticks; both fixed. |
| index/network | 4→5 | 4 | 4 | € only; toggle added. Right-hand panel is sparse at 1280 px. |
| synthetic-fuels/cheapHours | 3→5 | 4 | 4 | Label overlap and $2,373 output fixed. |
| index/lcoe | 5 | 3 | 4 | The gas-price slider does nothing while solar is selected. Should be disabled or explained (open). |
| solar-pv/junction | 5 | 3 | 4 | The light slider barely changes the readout (open). |
| index/rotor | 4→5 | 4 | 4 | "1" button was 29 px wide; min-width added. |

Probe "nothing changed" flags were mostly clicks on the button that was already selected. Those are not bugs.

## Update, 13 Oct 02:30 (phase 2 continued)
Stress audit re-run on solar-pv, utility-renewables and transmission at 1280 and 390 px: clean, no console errors.
Every figure's desktop screenshot reviewed by eye (contact sheets of all six pages).

| Page / figure | Before → after |
|---|---|
| index/lcoe | Gas slider was hidden and did nothing for solar → shown greyed out and disabled, with "Only applies to gas" |
| solar-pv/junction | Light slider had no visible effect → the circuit line reports current ∝ light (≈40 mA/cm² at 100%) and says "dark" at 0 |
| index/network | Empty right half → line-loading bars (flow ÷ limit per line, red when full) plus a try-this hint; $/€ toggle |
| index/merit | Price jumped instantly → time-based eased clearing price, equilibrium marker, price-setter pulse; x-axis fits the fleet |
| transmission/loopFlow | Flow dots moved at a fixed speed → speed ∝ flow |
| synthetic-fuels/futures | Translucent overlapping cells showed a grid at high DPI → opaque pre-blended cells; € preset buttons follow the toggle |
| transformers/sizeFrequency | **Bug:** "1.0e+2% of the volume" → "100%", plus a try-this hint |
| transmission/redispatch | **Bug:** $ axis read "$4,000" with € bar labels → "$4 bn" axis and $ bar labels |
| transmission redispatch, breakEven, interconnect, bill; index heatPump | € only → $/€ toggle (heatPump axis converts to US ¢) |
| utility-renewables/revenueModels | "ranging from $73 to $73 (±$0)" → "the same every year — no market risk" |
| synthetic-fuels/lcohExplorer | "Every $11/MWh adds…" → "A power price 10% higher adds…" |
| powerEnergy, gridForming, loopFlow, tapChanger, cheapHours, frequency | Try-this hints (dimmed after first use) |

Shared fixes: $ axes keep the original scale and suffix (bn, m); converted slider outputs are rounded ($791 → $790, $2,373 → $2,370); the probe now also flags exponent notation; `cycle.sh` now stops on a failed build (`pipefail`).

High-DPI: `scripts/hidpi.mjs` checks backing-store scaling at 2× and 1.5× and saves screenshots in `screenshots/hidpi/`. merit, network, frequency, heatPump, futures and loopFlow were all scaled correctly. `scripts/anim-check.mjs` captures merit mid-transition and settled; the settled price matches the readout.

### Remaining
- captureHistory (solar-pv) is € only: historical years would need per-year rates.
- Static € text inside captions is not converted (by design).
- powerEnergy has no readout, so its hint sits above the chart.
- cleanGrid: gas output above demand (battery charging) is not labelled.
- interconnect: no tick above $100.
- Richer simulations still to do: a load-flow on the network where it varies through the day, and power-flow animation on gridDay.

## Phase 3 update (13 Oct)
- captureHistory in $ with per-year ECB rates; caption € amounts follow the toggle (strict mode; per-year figures opt out).
- powerEnergy readout (now / hour / year vs 3,500 kWh household); cleanGrid "charging batteries" label; interconnect $ ticks above $100.
- network: day mode with 25-step daily solve, play/scrub, node-price strip (illustrative profiles).
- gridDay/futureDay: animated power-flow strip (sources → demand/exports/batteries/flex, curtailment ghost).
- sizeFrequency: log-log core-volume vs frequency chart with material bands and draggable dot.

### Remaining issues
- Static captions on per-year figures stay in €.
- Network day-mode panel hint mentions full lines even when none are full.
- "2025" label crowding in captureHistory.
- Series screenshots can catch tall figures blank (use scripts/shot1.mjs).
- junction figure still lacks an I–V plot.

## Round of 13 Oct 2026 (02:25 request)
- captureHistory: $ by default, converted at each year's ECB rate (caption not converted).
- Figcaption € amounts follow the $/€ toggle (strict mode, 2025 ECB rate).
- powerEnergy: per-appliance stacked bands, direct labels, energy-by-appliance split bar, live readout.
- cleanGrid: "above the line: charging batteries" band.
- Interconnect axis ticks fill above $100.
- network: Time = one hour / whole day; Play the day + hour scrub; node-price strip through the day.
- gridDay/futureDay: animated power-flow strip (sources → demand/exports/batteries/flex, curtailment ghost).
- junction: live I–V curve (single-diode model, J_L = 40 mA/cm², V_oc ≈ 0.70 V) with lamp load line and open-circuit point climbing the curve.
- Figures repaint immediately after resize (fixes blank off-screen canvases).
Remaining: junction mobile caption text is small (11.5 px at 349 px wide); per-year-rate figures keep captions in source currency.

## 13 Oct 03:45 (after the interrupted run)
- Build and tree were clean at f0b57fc. Nothing was restored.
- network: the side-panel hint now checks for congestion. When no line is full it says "No line is full: one price everywhere."
- captureHistory: year labels now sit just past the end of the hour-of-day lines.

Still open:
- Per-year-rate figures keep their captions in €.
- junction: the mobile caption text is small.
- The 2025/2015 labels in captureHistory sit close to the lines.
