# REVIEW-CRITICAL — Ciechanowski bar (26 Oct 2026)

Harsh pass over every live page (index, yardstick, rules, model, language, flip, parallel, scaling, data, demand, factory, orbital, verdict, essay) at 1280 and 390. Fix-as-you-go; this file is the ledger. Gate: `scripts/checkall.sh`. No Energy-Charts public data; no ciech-ref in dist; no push; electricity repo untouched.

## Severity key
- **blocker** — breaks the series promise (object-first / Final words / thesis integrity / dead structure)
- **major** — wrong, misleading, or clearly unfinished for a Bartosz-level reader
- **minor** — polish, honesty labels, deferred with reason

## Fixed this pass

| Sev | Finding | Fix |
|---|---|---|
| blocker | Index had **no Final words** | Added `#final` with tripwire close and links to essay + verdict |
| major | Index map prose still said “not all written yet”; aside mentioned dashed “planned” cards | Prose + aside updated; every card is live |
| major | Case-map footer still promised dashed “still to be written” cards | Note + file header comment updated |
| major | Index coda said star-mind “comes last” with no link | Links to `orbital.html#star` |
| major | Verdict Low/Mid/High **ledger was hand-typed** and drifted (High·R2 showed NO; model says UNRESOLVED) | `fillAct1Ledger()` fills `#ledger-act1` from `PRESETS` on load; aside corrected |
| major | Demand ladder not canvas-tappable (buttons only) | `fig.interact({ panY, hit, down })` — tap a rung sets task + T; vertical swipe still scrolls |
| major | energyFlow electricity band looked like a child of Buildings/Other | Band leaves from the **middle of final**; label “≈21% of final” |
| minor | caseMap showpiece had no figcaption | Caption added (map / pips / live cards) |
| minor | Essay Final words did not send the reader back to the thesis page | Closing link to `index.html` |
| minor | STATUS step-3 still listed polish stubs as open | Corrected historical notes |

## REVIEW-3 open items (A–G) — this pass

| # | Status | Notes |
|---|---|---|
| A Touch &lt;6/9 | **reframed, not a bug** | `_touch.mjs` counts `preventDefault` traps. 0/9 means pan-y is working (vertical swipe scrolls). Interactive scrubbers should trap only on handles; new ladder taps use `panY: true`. A dedicated “handles claim touch” pass remains optional. |
| B Demand T ≈ tokens | **kept, labelled** | Auto-set + readout already say Wh≠tokens; no better public Wh ladder yet |
| C Elec band schematic | **improved** | No longer implies a sector parent; still not a full IEA sector→elec Sankey (needs another data pass) |
| D R2 provisional | **updated** | Working cooling-class bar cited; still not a single WEO “largest end-use” cell |
| E Static ledger | **fixed** | Live from PRESETS |
| F Essay duplication | **bridged** | Short-tour aside was already clear; Final words now point at the thesis page. Full trim deferred (tour role is intentional) |
| G Landauer derived | **deferred** | Peek already flags derived H100 J/FLOP; no better primary cite without new research |

## Still open (honest)

| Sev | Item | Why deferred |
|---|---|---|
| major | R2 bar still provisional (6,000 TWh) | **Updated 26 Oct:** cooling-class working bar with IEA commentary + tracking; free WEO lacks single largest-end-use cell |
| major | Buildings-heat R3 still secondary citation | **Fixed 26 Oct:** verified against Future of Heat Pumps primary PDF |
| minor | Touch “handles claim” coverage uneven across older figs | Not a scroll-trap regression; optional dedicated pass |
| minor | Verdict path numbers on index prose (~490 / ~1,000 TWh) are Mid narrative, not live-bound to the meter | Acceptable; meter is source of truth |
| minor | Some deep pages still dense; further Ciechanowski thinning | Out of scope for one critical pass |

## Checks (`scripts/checkall.sh` — clean)
- model: ok (10⁴× / orbit only-with-orbit)
- peeks: PEEK CLEAN (10 drawers)
- audit: clean (no non-CLEAN / SMALL lines)
- adv: clean (no ISSUES)
- cpu: all pages 0.0 rAF/s top & bottom (≤64)
- touch: no ≥6/9 trap lines (0/9 = pan-y OK; see A)
- links: LINK CHECK PASSED
- file://: FILE:// TEST PASSED
- Functional spot: ledger High·R2 → UNRESOLVED; demand rung tap; index `#final` + live case-map

## Screenshots
Before: `/workspace/ciech-work/compare/crit-before-*-top-{1280,390}.png` (14 pages × 2)
After: `/workspace/ciech-work/compare/crit-after-{index,demand,verdict,yardstick,essay}-*.png`


## IEA end-use pass (follow-up)
R3 primary-PDF verified. R2 kept at 6,000 with cooling-class chain of cites (not invented). Index Mid prose live-bound via `#meter-live`. Densest pages thinned.
