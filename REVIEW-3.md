# REVIEW-3 — polish walk (26 Oct 2026)

Walked all live pages at 1280 and 390 after the step-3 deepen. Gate: `scripts/checkall.sh` (build, audit --stress, _adv, CPU, touch claims, peekcheck, linkcheck, file://). Ciechanowski bar; Energy-Charts never public; no push; electricity repo untouched.

## Method
- Full stress audit on every live page (1280 + 390).
- Linkcheck including sibling electricity dist (git-archive fallback).
- Peekcheck (10 drawers).
- Playwright crawl of all pages + redirects for pageerror / console error (both widths); open first peek where present.
- Functional: Demand “Agent episode” auto-sets T → ×200 and persists into index slider; Yardstick `b = +50%` patches `act1.b` and restores on index.
- Visual: energyFlow / tokensLadder / verdictMeter screenshots in `/workspace/ciech-work/compare/p4*.png`.

## Fixed this pass
| # | Finding | Fix |
|---|---|---|
| 1 | Yardstick `b` saved only as `yardstickB`, not `act1.b` — index/verdict sliders never picked it up | `patchAct1({ b })` + `watchAct1` on `verdictMeter` syncs slider widgets (same-tab CustomEvent, other-tab `storage`) |
| 2 | Demand rung change did not move the T lever | Selecting a rung sets `T` from token-count multiple vs chat (clamped to LEVERS.T); readout labels it approximate |
| 3 | energyFlow used √ heights (schematic) | Linear / area-proportional column heights; DC+AI in ×40 inset labelled “not column scale” |
| 4 | Phone energyFlow: DC/AI inset overlapped sector columns and under-column TWh labels | Reserve inset band above the log rail; in-column “167k”/“125k” on phone |
| 5 | BACKLINKS still pointed at `ai-factory.html` / `the-switch.html`; yardstick “pending” | Retargeted to `factory.html` / `flip.html`; yardstick marked **live**. Electricity repo still untouched |

## Open (not blocking)
| # | Item | Notes |
|---|---|---|
| A | Touch claims still &lt; 6/9 on most figures (new figs often 0/9) | Pre-existing after restructure; checkall does not gate on it. Track for a dedicated touch pass. |
| B | Demand T mapping is approximate | Token multiple ≠ Wh multiple (esp. video / tool use). Readout says so; no better public per-task Wh ladder yet. |
| C | energyFlow electricity band drawn from lower sectors | Schematic of “electricity is part of final”, not a true sector→elec Sankey. Honest enough; a full elec-by-sector split needs another IEA pass. |
| D | R2 bar still provisional | Same as RESTRUCTURE; waiting on 2050 end-use pass. |
| E | Verdict ledger table still static Mid numbers beside live meters | Cosmetic; meters are the source of truth. |
| F | Essay still duplicates some Rules/Flip/Model material | Short-tour role; trim later if desired. |
| G | H100 Landauer FLOP is derived (700 W / 989 TFLOP/s) | Flagged in peeks; not a new bug. |

## Checks (this pass)
- Stress audit: CLEAN on all live pages.
- Peekcheck: PEEK CLEAN (10 drawers).
- Linkcheck: PASSED (incl. electricity sibling).
- Pageerror crawl: 0 pages with errors at 1280 or 390.
- `scripts/checkall.sh`: see STATUS (run at end of polish).

## Screenshots
`/workspace/ciech-work/compare/p4*-yardstick-fig-energyFlow-{1280,390}.png`, `p4e-demand-*`, `p4e-index-*` (and earlier `p4-` / `p4b` / `p4c` / `p4d` intermediates).
