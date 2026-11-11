# REVIEW-BARTOSZ-WAVE — fidelity gaps after CIECH #1–10 partials

Written this wave (29 Oct 2026), against local HEAD after left-rail + data rewrite. Private Bartosz refs in `/workspace/ciech-ref/` (never ship). Public posts re-checked: Mechanical Watch, GPS, Cameras, Airfoil.

## What still hurts most (ranked by reader impact)

1. **No true cut-open 3D transistor (CIECH #5).** MOSFET is still a flat cross-section + log I–V chart. Watch/GPS open with a thing you orbit; ours still asks the reader to decode a schematic. **Highest impact on The Switch.**

2. **Factory ladder is 2.5D plan, not a continuous 3D object (CIECH #6).** powerLadder zooms well in metres, but it reads as an aerial map with isometric cues — not a die you can turn that becomes a rack, then a hall. Compare Watch’s continuous assembly. **Highest impact on AI Factory + Essay reprise.**

3. **Figure density still ~200–400 words/figure on several pages.** Watch ≈86, GPS ≈153. Learning/Scaling/Essay still leave long prose walls between objects. Need bridging figures that reuse the previous object (CIECH #9 unfinished).

4. **Chart walls remain on Scaling, Parallel scaleOut, Essay clusterGrid/computeTrend.** Bartosz almost never charts without the measured object beside it. Training/inference and scale-out should be piles, racks, or token blocks — not crossing lines alone.

5. **Defaults not mid-action everywhere.** Newer pages (data, verdict, demand, orbital, yardstick, rules, flip remnants) often open at rest or at slider zero. Watch opens mid-tick; our cold-plate and systolic are better; MOSFET/Factory should open with channel open / mid-zoom.

6. **Colour-coded prose incomplete on newer pages.** `.c-red`…`.c-violet` exist, but data/verdict/demand/orbital/yardstick still under-use them; figures carry legends the prose should own (T8).

7. **Chrome / readout bulk.** Some figures still stack long MODEL notes + try-this + multi-sentence readouts. His figures carry almost no chrome; numbers live in prose or a tiny ruler.

8. **Shared 3D stage under-used.** Only lossValley/sgdValley load `three3d.js`. Stage already has pan-y, off-screen pause, DPR cap — MOSFET + Factory zoom should prove it at object density, not just a landscape.

9. **Build-up chains still break.** Essay hub jumps topics; Scaling has no recurring physical anchor (token pile → model block); Parallel’s matmul matrices are not the same object as systolic cells.

10. **Phone / touch polish uneven on complex figures.** Wide breakouts fixed recently, but 3D heroes must keep `touch-action: pan-y` and one primary control (T6) — no second competing scrub that fights scroll.

11. **Soft Lambert pastels vs chart ink.** Loss surface looks closest to his shading; 2D charts still dominate visual weight on Factory/Scaling, so the page doesn’t *feel* like one visual language (T9).

12. **Final-words / openings uneven across newer pages.** Object-first openings landed on several; data/verdict/demand still lean thesis-first.

## This wave’s target

Ship **#5 MOSFET cut-open 3D** and **#6 die→board→rack→hall 3D zoom**, plus at least two more mechanism-leaning upgrades (Factory/Switch readouts absorbing chart chrome; Essay clusterGrid → same zoom where feasible). Keep 2D fallbacks when WebGL fails. Local preview only.


## Wave status (implementation)

Grounding: local `/workspace/ciech-ref/` hero PNGs + Watch/GPS/Airfoil/Lenses HTML+JS (soft Lambert pastels, mid-action defaults, almost no figure chrome, object-first). Live compare folder `bartosz-vs-ours-20261029/` was empty at wave start (computerUse still shooting); re-check before seal.

Shipped this wave:
- **#5** `src/three/mosfet3d.js` — cut-open planar→FinFET→GAA, channel carriers, two controls (Peek + Gate). 2D cross-section fallback.
- **#6** `src/three/factoryzoom.js` — continuous 3D zoom die→board→rack→hall→building with HBM stacks and cited watts. 2D metre-scale plan fallback.
- `stage3d.js` — clipping + `setFocus` / `autoFit` for zoom heroes.
- Captions on flip.html / factory.html updated; `three3d.js` loaded on those pages.

Still lags Bartosz after this wave: Scaling chart wall; Learning density; colour-coded prose on data/verdict/demand; Factory zoom is nested LOD schematic (not literal metres — tradeoff for readability); MOSFET has two sliders not one; Essay clusterGrid still a log ladder (three3d already on page via lossValley).


## Shot-grounded (bartosz-vs-ours-20261029, 29 Oct)

ComputerUse landed 16 Bartosz + 15 ours-live webps. Live /blog/ai/ still has **no 3D** (this wave is local only).

His heroes (watch/gps/airfoil/cameras): real meshes, soft Lambert, object fills the figure, almost no chrome, dense motion texture.
Ours live worst 5: (1) parallel package-map rectangles (2) factory cooling boxes+arrows (3) triode blue-dot rectangle (4) MOSFET flat + log chart (5) scaling tokens scatter.
Closer: language convolution, parallel roofline.

Local preview after this wave kills (4) and factory-hero flatness via mosfet3d + factoryZoom; cooling/triode next.


## Status 29 Oct ~00:30 Europe/Berlin (local preview only)

| # | Figure | State on :8766 |
|---|------|------------------|
| 5 | mosfet3d cut-open planar→FinFET→GAA | **previewable** WebGL |
| 6 | factoryZoom die→board→rack→hall | **previewable** WebGL |
| 3 | coldPlate3d pipes over die | **previewable** WebGL (replaces boxy coolantFlow when GL works) |
| 4 | triode3d glass tube | **previewable** WebGL |

URLs:
- http://127.0.0.1:8766/ai/flip.html#mosfet
- http://127.0.0.1:8766/ai/flip.html (triode above mosfet)
- http://127.0.0.1:8766/ai/factory.html#chip (powerLadder / zoom)
- http://127.0.0.1:8766/ai/factory.html (coolantFlow cold plate)

Still short of bartosz-watch/gps/airfoil heroes: LOD schematic meshes, soft Lambert only (no textures), density/chrome on untouched pages (scaling scatter, parallel package map). No portfolio push.


## Framing hotfix (wave-3d-qa-20261029)

Browser QA fails fixed:
1. factoryZoom die stop — camera now frames dieGroup (look-at tracks die; board faintly under package; dist 2.6)
2. factoryZoom building — cutaway walls + roof chillers + transformers + window strips (not a solid beige slab)
3. coldPlate3d — pipes low/sideways; camera pulled back (radius 4, pitch 0.62); labels mid-height in frame

Also: softLights on mosfet/triode/factory/coldplate; quieter hints (no bold Try this); transparent three-wrap.


## Object wave (post-framing)

- package3d on parallel `dataDistance` — orbitable GPU package (die + HBM + NVLink pulse)
- tokenBalance3d on scaling `tokensPerParam` — physical param/token piles, Chinchilla 20:1 default (scatter is 2D fallback)
