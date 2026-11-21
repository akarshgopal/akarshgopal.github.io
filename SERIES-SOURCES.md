# Where the two blog series come from

`blog/ai/` and `blog/electricity/` are built from sources that are not in this branch. Any agent or bot that
refreshes them must read this first. A check, `.github/workflows/series-guard.yml`, fails any pull request that would
put back an older version of either series.

## blog/electricity/: *Why Did Electricity Stop Getting Cheaper?*

- Source: the `electricity-source` branch of this repository. Build with `node build.mjs` and copy `dist/` into
  `blog/electricity/`.
- Always build from the **head** of `electricity-source`. On 26–28 Oct 2026 a refresh from an older source put
  back the old six-page "How Electricity Works" series; the guard now catches that.

## blog/ai/: *Can AI outgrow the planet's power grid?*

- **Source:** the `ai-source` branch of this repository: an orphan branch like `electricity-source`, holding the hand-written source formerly called `ai-explainer`. Read its `HANDOVER.md` before changing anything.
- **Deploy:** run `node build.mjs` there, copy `dist/` into `blog/ai/` (replacing what is there), and open a PR. Always build from the **head** of `ai-source`.
- **Never hand-edit `blog/ai/` on master:** the next build would overwrite it. Change the source and rebuild.
- **Per-page scripts (Nov 2026):** each page loads `js/<page>.js`, which holds only its own figures. `three3d.js` loads only on pages with 3D figures, and `thesis.js` only on the five pages that use it. All are classic scripts, so the pages also work from `file://`.
- **History:** between 5 and 14 Nov 2026 some changes were made directly in `blog/ai/` while the source was out of reach. All of them are now in `ai-source`; the record is `docs/AI-SERIES-PORT.md` on `electricity-source`.

## Cache stamps

Pages load their local scripts and stylesheets as `name?v=<first 8 hex of the file's sha256>`. Both builds write
these stamps themselves. `python3 .github/scripts/stamp-assets.py` rewrites them if ever needed. The series guard fails
a pull request with a stale or missing stamp.

## Updating the guard

When a series legitimately changes a page that a marker checks, update the marker in
`.github/scripts/series-guard.sh` in the same pull request, and say why.
