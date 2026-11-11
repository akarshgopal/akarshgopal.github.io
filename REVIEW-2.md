# REVIEW-2 — second independent pass over *How Machines Learned* (6 pages)

Reviewed 21 October 2026 (Europe/Berlin) against commit `acf1bf7` (after the five redesigns and the new Scaling §6,
“The data flywheel”). Every page's prose was read in full, every figure was screenshotted from file:// at 1280 and
390 px and looked at, derived numbers in the new material were recomputed, and the newest claims were checked for
staleness against what has been published up to October 2026.

Tags: **[wrong]** · **[stale]** (true when written, out of date by Oct 2026) · **[overstated]** · **[inconsistent]** ·
**[teaching]** (figure or story does not teach what it should) · **[bug]** · **[prose]**.
Status: ✅ fixed in this pass · ⏳ open (proposal or judgement call, not built).

## Counts

| kind | found | fixed | open |
|---|---|---|---|
| wrong / overstated | 4 | 4 | 0 |
| stale | 4 | 4 | 0 |
| inconsistent | 2 | 1 | 1 |
| teaching | 9 | 4 | 5 |
| bug | 4 | 4 | 0 |
| prose | 3 | 2 | 1 |
| **total** | **26** | **19** | **7** |

## Ranked by impact (highest first)

1. ✅ **[teaching] The data-flywheel section never showed how small the human part is.** The text says labs pay
   people to write, rank and grade, but nothing let the reader *see* why that data is worth billions when the web is
   free. **New figure `humanShare`** (Scaling §6, after the first paragraph): Llama 2’s 2.0 trillion pretraining
   tokens (paper table 1) against Meta’s 1,418,091 preference comparisons × 798.5 tokens per example (table 6) ≈ 1.13
   billion tokens, drawn to scale by area, with a log zoom rail (and sideways drag on the picture) from ×1 to ×42,
   where the human square fills the frame. 0.057 %, one token in about 1,800. New paragraph ties it to the
   economics: the bulk is free, the part that decides behaviour is made to order. Note 10 extended (tables 1 and 6,
   §3.2.2 “not yet plateaued”). Assumption labelled: one response per comparison (both would add ~29 %).
2. ✅ **[overstated] Manhattan comparison concluded “In money adjusted for prices … it is Manhattan-scale”** while
   the paragraph’s own sum ($6.6 B/yr) is below the project’s average year ($33.8 B ÷ 4 ≈ $8.5 B). Rewritten to give
   both numbers and say plainly: same range year for year in real dollars, a fortieth as a share of GDP.
3. ✅ **[stale/unflagged] The $6.6 B sum mixes figures of very different ages** without saying so: Surge’s latest is
   2024 revenue, Turing’s a January 2025 run-rate. Searched for newer figures (Reuters, Forbes, TechCrunch, company
   releases): none published, only database estimates. The text now names the ages.
4. ✅ **[teaching] tokensPerParam was a shapeless cloud**, so the claim it supports (“since Chinchilla most open
   models have gone that way”) was invisible, and “open” is not a field in the data. Added the **median of each
   calendar year** (≥5 models) as black steps; readout gives the selected year’s median and the share above 20.
   Prose now quotes the data: median ≈3 tokens/parameter in 2021, 20 in 2023, 47 in 2025.
5. ✅ **[stale] Scaling §8: “the largest services report users in the hundreds of millions.”** OpenAI said on
   7 Oct 2026 that more than 1.2 billion people use ChatGPT each week. Updated, with the caveat that weekly ≠ daily
   and not all on the largest model; new note 32 (TechCrunch 6 Nov 2023 100 M; TechCrunch 27 Feb 2026 900 M;
   OpenAI 7 Oct 2026 1.2 B).
6. ✅ **[teaching] The flywheel’s “a better model draws more users” arm had no number.** Same source: 100 M weekly
   users a year after launch → 1.2 B by Oct 2026, in §6 prose and in the 2022 / 2026 era texts of the wheel.
7. ✅ **[teaching] The essay’s organising thread — the switch, the joule and *the example* had to get cheap —
   was never closed for the example.** The last paragraph now says it has turned: web text was the free example
   and is nearly used up; the examples that shape a model are now paid for (link to the flywheel).
8. ✅ **[wrong] Learning footer: “Every network on this page is computed live in your browser.”** The tiny
   transformer in tinyVsNgram is trained offline; only its answers ship. Footer corrected.
9. ✅ **[stale] IEA 2025 estimate missing from the text.** The regions figure already plots the IEA’s 2026 estimate
   of ≈485 TWh for 2025, but the essay and the AI Factory only quoted 415 TWh for 2024. Both now add it (+17 % in a
   year); essay note 33 cites the 2026 chart.
10. ✅ **[bug] regionsTWh on phones: the four scenario lines had no names** (the desktop labels sit in a right
    margin that phones do not have). Short labels (Lift-Off, Base, High Eff., Headwinds) now sit inside the plot at
    2035, de-collided.
11. ✅ **[bug] Box reset broke the toolchain**: corepack’s pnpm shim pointed at a deleted cache, node_modules and the
    Playwright browser were gone, dist/ was deleted from the working tree. Reinstalled (pnpm 11.24.0), rebuilt.
12. ✅ **[bug] Link check and preview depended on `/workspace/electricity-explainer/dist`, which is also deleted
    in that working tree** (git shows the files as deleted; the committed copy is intact). Not touched.
    `scripts/preview.sh` and `scripts/checkall.sh` now fall back to a read-only `git archive HEAD dist` export into
    /tmp/elec-dist. **Note for whoever publishes: Code Monkey pulls from that dist path, which is currently empty.**
13. ✅ **[bug] tokensPerParam label collisions** (new median label vs Chinchilla label on phones; compute-optimal
    label vs the selected model when dragged to the far left, found by `_adv`). Labels placed and de-collided.
14. ✅ **[stale] AI Factory: “The newest racks are denser still: an NVL72 …”** Blackwell is no longer Nvidia’s newest
    by Oct 2026. → “Nvidia’s Blackwell racks are denser still: a GB200 NVL72 …”.
15. ✅ **[overstated] “An Nvidia H100, the chip most of today’s large models were trained on”** — unsourced and
    doubtful in 2026. → “the chip behind the training runs this series keeps returning to, Meta’s Llama 3 and xAI’s
    Colossus”.
16. ✅ **[wrong] Scaling §8: “8 × 10¹¹ operations per word”** — the count is per token. Fixed.
17. ✅ **[inconsistent] regionsTWh legend “Asia excl. China” vs readout “rest of Asia”.** Readout now matches.
18. ✅ **[prose] AI Factory lede: “a building the size of a small town’s power demand”** (a building is not the size
    of a demand). → “a building that draws as much power as a small city”.
19. ✅ **[prose] Learning recap said the same thing three times** (two paragraphs and an aside all pointing onward
    to the essay/Scaling/AI Factory). Merged into one sentence plus the aside.
20. ⏳ **[inconsistent, nitpick] regionsTWh readout says 946 TWh for 2030 (sum of the IEA chart values, 945.7) while
    the prose says “about 945” (the IEA report’s rounded figure).** Both are right; left as is.
21. ⏳ **[prose, judgement call] Scaling §6: “Wang’s parents were physicists at Los Alamos …, so the comparison is
    close to hand.”** Sourced (Forbes) but trivia; it reads as a hook more than evidence. Kept; cut it if you prefer
    the section leaner.

## Proposals left open (bigger work, not built)

22. ⏳ **[teaching] The flywheel figure itself is still an illustration.** Spinning it shows order, not size. Best
    upgrade with real data: drive the wheel from one lab’s published loop — Llama 2’s weekly batches of comparisons
    (paper table 26, batch sizes and reward-model accuracy per batch) — so each turn is a real batch and the
    reward-model accuracy climbs as the reader spins. Needs the appendix table transcribed and checked.
23. ⏳ **[teaching] Energy per answer.** The series has energy per training run and per MWh but nothing per query.
    Google published (Aug 2025) a measured median of ≈0.24 Wh per Gemini text prompt including idle capacity and
    PUE; a figure that scales that by ChatGPT-sized weekly use would join Scaling §8 to the AI Factory. Needs the
    methodology paper read and its boundary stated.
24. ⏳ **[teaching] Reasoning / test-time compute (2024–26)** gets one sentence in §8. A short section with a figure
    of accuracy against thinking tokens from a published, openly licensed source would close the biggest 2025–26
    gap in the story. Needs a licensable dataset (most are paper figures, quotable but not chartable).
25. ⏳ **[teaching] Mixture-of-experts** appears only in captions (“counted by total parameters”). A Parallel or
    Scaling figure showing active vs total parameters per token would explain why DeepSeek-V3-class models are cheap
    to serve. Data: model cards (quote, don’t chart, unless CC BY).
26. ⏳ **[teaching] A pay ladder for human-data work** ($2/h MTurk median 2018 and Kenya 2023; $20/h MicroAGI 2026;
    $85/h Mercor average 2025; ~$100/h micro1 top end; US federal minimum $7.25). The numbers are in the text and
    sourced; as a figure it would be a dot plot that adds little beyond the paragraph, so not built.

## Checked and fine (recomputed)
Manhattan: $1,889.6 M × 321.943/18.0 = $33.8 B; ÷4 ≈ $8.5 B/yr; 0.84 % of 1944 GDP ($224.4 B) → $260 B of 2025 GDP
($30,861 B), 39× the $6.6 B sum (0.98+1.2+2.0+1.0+1.0+0.3+0.13 = 6.61). Llama 2 human share 1.13 B / 2.0 T = 0.057 %,
1 in 1,766, side ratio 42.0. Tokens per parameter medians from Epoch (2021 2.7, 2022 13.6, 2023 19.9, 2024 34.0,
2025 46.6, 2026 45.1 from 6 models). IEA 2025 485.1 / 415.6 = +17 %. powerLadder 860 kW/m² (700 W / 814 mm²),
23.6 kW/m² (10.2 kW / 0.4324 m²), 2.06 kW/m² over the 785,000 sq ft building, 0.17 kW/m² over 217 acres. mwhFlow 917
kWh to servers at PUE 1.09, 504 kWh to GPUs, 719 GPU-h. inferenceVsTraining 100 M users × 2,000 tokens × 2 × 405 B
= 1.62 × 10²³ FLOP/day → 235 days. computeTrend GPT-3 2.05–2.32 × 10⁵ H100-h, 285–461 MWh. syncSwing 16,384 × 1.275
× 1.09 = 22.8 MW. Essay §13 140–200 MWh per 100k GPU-h, 14–20 c/GPU-h, €0.85/h hardware. Hoffmann approach-3 optimum
at Chinchilla budget 32 B params / 92 tok·param⁻¹ (matches the threeKnobs readout).

## How this was tested
`scripts/checkall.sh` after the fixes: stress audit at 1280 and 390 clean on all six pages; `_adv` clean after the
label fix; CPU ≤ 2.7 rAF/s off-screen on every page; touch: humanShare 0/9 trapped (panY), no figure ≥ 6/9; link
check passed (electricity links checked against the committed dist); file:// test passed. Screenshots of every
figure re-shot and looked at; changed figures checked by eye at both widths and at the ends of their controls.
