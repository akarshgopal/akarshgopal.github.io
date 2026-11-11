# REVIEW-IMPROVE — CIECH visual wave (28 Oct 2026)

Pass after WIP PR #10 notice. User: “carry on improving the ai series.” Gate: `scripts/checkall.sh`. No Energy-Charts; no push; electricity untouched; no Code Monkey ping.

## Priority executed
1. **CIECH #8 — coolantFlow cold plate** (factory)
2. **CIECH #10 — relay mechanism + litho mask/wafer** (rules + flip)
3. **CIECH #7 lean — dataDistance die map** (parallel)
4. Essay short-tour trim (Rules/Flip duplication)
5. Skipped this pass: full #5 transistor 3D, #6 die→hall 3D, fuller IEA sector→elec Sankey, WEO R2 cell hunt

## Findings → fixes

| Sev | Finding | Fix |
|---|---|---|
| major | coolantFlow was two circles (air duct vs pipe) — no mechanism | Rebuilt as cold-plate cross-section: die → TIM → channel; water + heat particles; heat-load rail; flow L/min slider; outlet ΔT from P = ṁ·c·ΔT labelled **model**; air volume comparison kept in readout only |
| major | relayLogic schematic; armature motion hard to read as a relay | Coil windings + hinged armature + contact tip; series AND / parallel OR kept; pan-friendly keys |
| major | litho was abstract wave strips | Side stack: lamp → chrome mask → intensity MTF → photoresist features (blur with contrast) → wafer; same tools + half-pitch rail |
| major | dataDistance was energy bars only | Package map: reg → SRAM → HBM stacks → NVLink pads; Horowitz/Han pJ on SRAM/DRAM; HBM = DRAM-class cite (not invented); NVLink bandwidth only |
| minor | Essay still re-taught relay/tube/Dennard at half depth | Trimmed s1 Shannon, s3 history→pointers, s4 post-2005 paragraph |

## Judgement calls
- Cold-plate flow at rack scale is a **schematic total** (many plates), not a measured manifold curve — caption says so.
- HBM energy: no free cited pJ/byte found distinct from DRAM; map uses Horowitz DRAM 640 pJ and labels HBM DRAM-class.
- Relay lives on **rules.html** (post-restructure), not flip — upgraded in place.
- R2 remains 6,000 TWh cooling-class **working** bar; no free WEO “largest end-use” cell this pass.
- energyFlow Sankey left as area-true cut of final (honesty already labelled); full sector→elec split needs more free IEA tables.

## Deferred
- CIECH #5 3D transistor cut-open
- CIECH #6 continuous die→rack→hall 3D (powerLadder already 2D to-scale zoom)
- ~~CIECH #9 bridging figures page-by-page~~ → **REVIEW-IMPROVE-2** (4 bridges)
- ~~Fuller Sankey / WEO R2 cell~~ → **REVIEW-IMPROVE-2** (elec-by-sector honesty + R2 hunt miss)
- Further essay density toward Ciechanowski words/figure

## Checks
- `scripts/checkall.sh` — CLEAN (model ok, PEEK CLEAN 11, audit/adv empty, CPU quiet, LINK CHECK PASSED, FILE:// PASSED; touch no ≥6/9 = pan-y OK)
- Stress audit on factory/rules/flip/parallel/essay — CLEAN

## Screenshots
- Before: `/workspace/ciech-work/compare/imp-before-*.png`
- After: `/workspace/ciech-work/compare/imp-after-*.png`
  (coolantFlow, relayLogic, litho, dataDistance @ 1280 & 390)

## Preview
http://127.0.0.1:8766/ai/
