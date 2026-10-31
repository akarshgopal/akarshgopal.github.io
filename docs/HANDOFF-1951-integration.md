# Handoff: put the 1951–68 accounts into the series and ship it

**Status (31 Oct 2026): done.** The 1951–68 data are in `scripts/data/fpc_privately_owned_1960_1968.csv` and in essay 9 (see `HANDOVER.md` §1); deploy to master (task 7) not yet done.

Paste everything below the line into a Claude session that has a shell, network access and push rights to
`akarshgopal/akarshgopal.github.io`. Attach or paste the 1951–68 CSV produced from `docs/HANDOFF-1960s.md`
(and, if you have it, that run's four-part write-up).

---

You are continuing work on an essay series, *Why Did Electricity Stop Getting Cheaper?*. Its source is on the
`electricity-source` branch of `akarshgopal/akarshgopal.github.io` (an unrelated history that never merges into
`master`); the live site is `blog/electricity/` on `master`. Read `HANDOVER.md` first (§1 method, §3 build and
deploy, §5 conventions) and keep its conventions: British spelling, "17.3¢" with no space, "per cent" in prose, never
an invented number.

```
git clone -b electricity-source --single-branch https://github.com/akarshgopal/akarshgopal.github.io electricity-explainer
```

## What exists

Essay 9 (`src/pages/futures.html`, section `#where-the-savings-went`, figure `billSplit` in `src/figs/new-futures.js`)
splits the average US household kWh into fuel and bought power, running and paying for plants, wires, customer
service and overheads, and taxes, in 2025 dollars. It currently runs **1969–2025**. `scripts/make_us_bill_data.py`
builds `src/lib/usbilldata.js` from FERC Form 1 (PUDL, 1994+) and from published composites of the same accounts in
`scripts/data/` before 1994. The script is already prepared for the new data:
- it loads `scripts/data/fpc_privately_owned_1960_1968.csv` if present (later files win on overlapping years);
- empty cells count as 0 (an account not reported separately, e.g. nuclear fuel inside steam fuel before 1961);
- prices before 1960 come from `scripts/data/hist_stats_s116_residential_price.csv` (Historical Statistics series
  S 116), scaled by 1.0626 to EIA's Table 8.10 over 1960–70; Table 8.10 itself covers 1960 on.

## The new data (attached)

FPC, *Statistics of Privately Owned Electric Utilities*: electric income account, O&M by function and plant by
function, **1951–68**, thousand dollars. Every year passed the four arithmetic checks with residual 0; an independent
Python re-check agreed. Notes from that extraction:
- Revenue and net operating income include income from electric plant leased to others (the 1978 edition counts
  it; the 1972 volume prints it separately), so the series matches the 1969–78 file. O&M, production plant and
  transmission plant matched the 1978 edition exactly for 1969–72.
- 1965 general plant 1,685,983 is from the 1965 volume (PDF p41); the 1972 volume misprints it as 1,635,983 (p52).
- 1958 customer accounts total 270,852 is as printed in both volumes, though its parts add to 270,652.
- The extraction flagged 1972 distribution plant in the 1969–78 file (38,243,823) against the 1972 volume's
  36,284,983. This was checked: the 1978 edition prints 38,243,823 as a *revised* figure and its lines add to it,
  so the file stays as is (comment added there). No action needed.

## Tasks

1. **Add the data.** Save the CSV as `scripts/data/fpc_privately_owned_1960_1968.csv` (keep that name even though
   it starts in 1951; the script looks for it). Keep its header comments; add one line recording the three notes
   above and the volumes/pages used. Item names must match `fpc_privately_owned_1969_1978.csv`.
2. **Rebuild the numbers.** Download the PUDL inputs listed in `HANDOVER.md` §1 into a scratch directory (never into
   the repo), `pip install --user pyarrow`, then `python3 -P scripts/make_us_bill_data.py <dir>` from the repo root.
   Check the printed lines: every year 1951–2025 present; "accounted" about 100% before 1994; the seam checks as
   before. Compare 1968 with 1969 for any implausible jump (both are FPC; the 1969 column comes from the 1978
   edition) and say what you find.
3. **Look at the result before writing.** Print the five layers in ¢/kWh (2025 dollars) for 1951, 1955, 1960, 1965,
   1969, 1973, 1981, 1983, 1988, 2000, 2025. The essay's thesis (`src/pages/cheaper.html` §5, `futures.html` §1) is
   that an engine of productivity cut costs until about 1970, then stalled while fuel, capital, wires and taxes rose
   around it. Report honestly whether the 1951–69 accounts show the engine (e.g. fuel and plant costs per kWh
   falling in real terms) and which layers moved; do not bend the prose to the thesis if the data say otherwise.
4. **Update the text** (only where the facts changed; keep the voice):
   - `src/pages/futures.html`: the paragraph in `#where-the-savings-went` that begins "The utilities’ own accounts
     show the whole arc" (currently starts in 1969 at 19.3 cents) — start it in 1951 and add one or two sentences on
     1951–69, with numbers from `usbilldata.js` only; the `billSplit` caption ("United States, 1969–2025 …" and the
     list of sources); note 4 (add the FPC volumes with their Google Books / HathiTrust links and the S 116 price
     splice, and update the coverage range if it changes).
   - `src/figs/new-futures.js`: the figure's `label` text (mentions 1969); check the readout still reads well (it
     computes the peak and minimum years itself).
   - `src/pages/cheaper.html` ("… since 1969" in the paragraph after the price curve) and `src/pages/index.html`
     (essay 9's description, "… since 1969").
   - `HANDOVER.md` §1 (table and sources) and `docs/HANDOFF-1960s.md` (mark done).
5. **Check.** `pnpm install`, `node build.mjs`; `node scripts/linkcheck.mjs` (the 10 `../ai/` failures are expected);
   `node scripts/audit-local.mjs 1440,1280,1024,390 --page=futures.html` (and cheaper.html, index.html). Take
   screenshots of `[data-fig=billSplit]` in page context at 1280 and 390 px (Playwright and Chromium are usually
   pre-installed; see HANDOVER §3) and look at them: end labels must not collide, the x axis should label round
   years, the y axis may need to reach 40¢. Check the Germany view still renders.
6. **Commit and push** to `electricity-source` (clear message; no PDFs or data dumps in git).
7. **Deploy.** Branch from `origin/master`, copy only the changed built files (`dist/futures.html`,
   `dist/cheaper.html`, `dist/index.html`, `dist/series.js`, plus `dist/style.css` if it changed — compare first;
   never `hero.js`) into `blog/electricity/`, commit, open a PR against `master` describing the change and the
   checks, and leave it for the owner to merge unless told otherwise.

## Report back

The 1951–2025 table from step 3, what the 1951–69 years show, the diff of prose changes, the check results
(linkcheck, audit, screenshots looked at), the commit hash, and the PR link. If something in the data looks wrong,
stop at step 3 and report rather than publishing.
