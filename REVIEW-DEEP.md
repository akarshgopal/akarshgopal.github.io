# REVIEW-DEEP — Ciechanowski bar (28 Oct 2026)

Harsh pass after IEA cite (HEAD was `eb5ce39`). Fix-as-you-go. Gate: `scripts/checkall.sh`. No Energy-Charts; no push; electricity untouched; no Code Monkey ping.

## Severity
- **blocker** — thesis / structure / contradiction
- **major** — hand-wave, stale cite, DAG break, figure that fails to teach
- **minor** — polish

## Findings → fixes

| Sev | Finding | Fix |
|---|---|---|
| blocker | energyFlow live readout still called R3 a “secondary citation” after primary-PDF verify | Fixed readout → primary PDF |
| major | Nav order fought the dependency DAG (model/language before flip/parallel; Rules claimed “first page”) | Reordered `series.mjs`; Rules bridge rewritten |
| major | Case map: Rules missing; Data marked “optional”; Act2 “Power needed” pointed at `#act2` on index | Rules node; Data → “examples”; need → `orbital.html#need` |
| major | Soft / wishy language on murky numbers (60% share, WORLD_ELEC_2050, token≠Wh, R2 cooling-class) | Ranges + ASSUMPTION/DERIVED/WORKING labels; sensitivity shown |
| major | Essay still re-taught Rules/Flip/Factory at half depth | Trim + deep pointers |
| major | Weakest figures: energyFlow stale text; tokensLadder measured vs estimate anatomy weak; radiatorT4 formula off-canvas; caseMap DAG; ledger OK but language drift | Visual rework below |
| minor | Data page “Optional branch” confused the case | Reframed as examples-cap branch (no slider, still in DAG) |

## Priority order executed
1. Honesty/murk: index · yardstick · verdict · demand · orbital (+ model.js notes)
2. Structure bridges + essay trim + nav/DAG
3. Visual rework: energyFlow, tokensLadder, radiatorT4, caseMap, yardstickBars band
4. Stack peeks where jumps remain

## Open after this pass
| Sev | Item | Why open |
|---|---|---|
| major | R2 still a cooling-class **working** bar, not a WEO “largest end-use” cell | Free WEO tables lack the cell; chain of cites is honest |
| minor | WORLD_ELEC_2050_ASSUMED = 60,000 TWh | Still my assumption for % readouts only |
| minor | 40%/yr efficiency trend | Secondary Epoch summary; labelled |
| minor | Touch “handles claim” coverage uneven | Pre-existing; 0/9 trap = pan-y OK |
| minor | Essay still ~7k words | Short-tour role; deep pointers added; further cut optional |
| minor | energyFlow still not a full IEA sector→elec Sankey | Electricity drawn as cut of final; true Sankey needs more data |

## Checks (`scripts/checkall.sh` — CLEAN)
- model ok · PEEK CLEAN (11 drawers, +Wh≠tokens) · audit empty · adv empty · CPU quiet · links PASSED · file:// PASSED
- Touch: no ≥6/9 (pan-y OK)

## Key number changes
None invented. R1=3,800 / R2=6,000 working / R3=17,200 unchanged. M0 sensitivity (40%→37, 80%→73) made explicit. Act2 108 GW derivation written out.

## Screenshots
Before: `/workspace/ciech-work/compare/deep-before-*.png`
After: `/workspace/ciech-work/compare/deep-*.png` (non-before)
