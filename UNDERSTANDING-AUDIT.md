# Understanding audit — 3D figures (Wave 8, 2026-10-29)

Rule (user direction): *not everything needs to be 3D; the priority is understanding.* Keep 3D only where depth, stacking or physical assembly is the point. Otherwise use clear 2D in the same palette and ink language (Bartosz uses 2D for GPS maps and Airfoil flow fields).

| # | Fig (page) | What the reader must understand | Does 3D help? | Decision |
|---|---|---|---|---|
| 1 | triode (flip) | Hot cathode, grid and plate nested inside a vacuum envelope; the grid gates the electron flow | Yes: the nesting inside glass is spatial | **Keep 3D** |
| 2 | mosfet (flip) | Gate above a thin oxide above the channel; planar → FinFET → GAA wraps the gate around the channel | Yes: wrap-around is inherently 3D | **Keep 3D** (fill fix) |
| 3 | cmos (flip) | A pull-up and pull-down pair: one conducts, the other blocks; out follows | Partly: the stacked pair reads in 3D, but a schematic would do | Keep 3D, simplify (light base, no card) |
| 4 | litho (flip) | Light → mask → lens → resist on wafer, a vertical optical stack | Yes: the vertical stack | **Keep 3D** |
| 5 | yield (flip) | Defects are random points; bigger dies catch more of them | Weakly: it is a plan-view wafer map | Keep (already near-2D top view); candidate for 2D later |
| 6 | relay (flip) | A coil pulls an armature that closes a contact, so A AND B light the lamp | Yes: the mechanical motion | **Keep 3D** (label colour fix) |
| 7 | cascade (flip) | One relay's output drives the next relay's coil | Yes: same mechanism | **Keep 3D** |
| 8 | systolic (parallel) | Numbers march in staggered; each cell multiplies the pair that meets it and keeps a **running sum** | **No**: it is a grid in time; 3D hid the sums (glyphs never rendered) and beads overlapped cells | **Convert to 2D** (legible per-cell sums, warm sums) |
| 9 | datadist (parallel) | Energy grows with distance: register → SRAM → HBM → NVLink, laid out on a package | Somewhat: stacked HBM shows "off-die", but energy is a 1D ladder | Keep 3D for now; simplify candidate (plan-view map + ladder) |
| 10 | nvlink (parallel) | A number leaving one package crosses the board, so the distance cost goes up | Little: two boxes and a link | Simplify candidate; the existing 2D fallback is too crude to adopt yet, so **keep 3D** this wave |
| 11 | tokens (scaling) | Tokens per parameter: about 20:1 is compute-optimal; real models drifted far above it | **No**: piles of cubes show a ratio worse than an axis does; the real-model scatter teaches the trend | **Convert to 2D** (scatter of notable models + 20:1 line + yearly median) |
| 12 | transformer (model) | The FLOPs split across embed / attention / MLP; MLP dominates | Little: bar heights, but bricks read like blocks being built | Keep 3D this wave; simplify candidate (bar chart) |
| 13 | heat loop (factory) | Heat path: die → plate → CDU → outside; coolant in cold, out hot | Partly: a pipeline, readable in 2D | Keep 3D |
| 14 | cold plate (factory) | Coolant flows through fins over the die, entering cold and leaving hot | Yes: the fins sit above the die | **Keep 3D** |
| 15 | factory zoom: server / board06 (factory) | Scale: die → board → rack → hall → building | Yes: a continuous spatial zoom is the point | **Keep 3D** |
| 16 | factory zoom: rack / hall (factory) | Same zoom, mid-scale | Yes | **Keep 3D** (hall fill fix) |
| 17 | factory zoom: building (factory) | Same zoom, final stop | Yes | **Keep 3D** |
| 18 | loss surface (learning) | Gradient descent walks downhill on a surface; momentum overshoots | Yes: a surface is depth; contours alone lose the "downhill" intuition | **Keep 3D** |

**Acted on this wave:** systolic and tokens converted to 2D (clearest cases: 3D actively obscured the quantity the reader needs). nvlink, datadist and transformer are logged as simplify candidates for a later wave; they need new 2D work, not just a switch to the existing fallback.

## Wave 9 decisions (2026-10-29)

All three simplify candidates were converted. In none of them did 3D genuinely win. 3D sources stay in src/three, unused.

- **datadist → 2D.** Lesson: fetching a number from HBM costs about 139× the multiply-add it feeds, and reuse buys that back. 3D showed the parts but not the *magnitude*. The 2D view pairs a plan-view package map (same part colours: blue die, yellow register, green SRAM/HBM, violet NVLink pads) with linear-scale energy bars (4.6 / 5 / 640 pJ, Horowitz via Han), so the gap is *seen* and not just read. One control: a reuse rail (1–1000×) that shrinks the green fetch segment of the per-multiply-add bar.
- **nvlink → 2D.** Lesson: data leaving a package crosses one link of fixed bandwidth. The old 2D fallback was too crude, and 3D added nothing. The new view uses the same package map twice, with the NVLink trace routed out of the pads and packets on it. One control: data size (1 MB–1 TB). The readout gives time = size / 900 GB/s (Epoch, bandwidth only; no energy is claimed).
- **transformer → 2D.** Lesson: the FLOP share per stage, with MLP dominating. Bars on one baseline with % labels teach this directly; the 3D bricks read like blocks, not quantities. Colours match the 3D bricks. One control: a Stage selector with per-stage explanations. Weights are still schematic (1/4/8/1), as the caption says.

## Wave 10 decisions (2026-10-29)

These are the "could be simpler" rows. Each was checked against its existing 2D version, rendered with three3d.js blocked.

- **cmos → 2D.** The stated lesson (the caption's) is the shoot-through current spike while both switches are half-on. Only the 2D version's V/I plots show it, with a schematic, the output-voltage transfer curve and the log supply current. The 3D showed the stacking, which is not the lesson.
- **yield → 2D.** A wafer map is a plan view. The 2D map with live "good dies / yield %" counts teaches Y = e^−AD directly, and 3D added only a tilt.
- **heat → keep 3D.** The 2D version is a row of labelled boxes. The 3D shows the cold-plate object being reused along the loop and reads as hardware, so here 3D aids recognition. Revisit only with a proper 2D build (temperature-coloured flow), not this fallback.
