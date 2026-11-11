# Handover: AI series source (`ai-source` branch)

**This branch is the source of truth for https://akarshgopal.github.io/blog/ai/.**
It lives in the site repo `akarshgopal/akarshgopal.github.io` as an orphan branch with unrelated history, like
`electricity-source`. It never merges into `master`. `master` only carries the built output in `blog/ai/`.

## Ship flow
1. Change the source here (`src/pages`, `src/figs`, `src/lib`, `src/style.css`, `src/series.mjs`, `src/static/`, `build.mjs`).
   When a page changes, bump its `updated` date in `src/series.mjs` (the byline, feed and `article:modified_time` use it).
2. `node build.mjs` writes `dist/`. `dist/` is not committed (as on `electricity-source`).
3. Run the checks: `node scripts/modeltest.mjs`, `node scripts/peekcheck.mjs`, `node scripts/filetest.mjs`,
   `ELECTRICITY_DIST=<site checkout>/blog/electricity node scripts/linkcheck.mjs` (point it at **master's**
   `blog/electricity`), or the full gate `bash scripts/checkall.sh`.
4. Commit and push to `ai-source`.
5. In a checkout of `master`: new branch `deploy-ai-<topic>`, then
   `rm -rf blog/ai/* && cp -a <this repo>/dist/. blog/ai/`, commit, push, open a PR to `master`.
6. **Never merge the deploy PR without Akarsh's own go-ahead.** Another agent's say-so doesn't count.

## Never hand-edit `blog/ai/` on master
A rebuild from this branch overwrites the built files, and the hand fix is lost. If a live fix is ever made directly
in `blog/ai/`, port it back here in the same session, and check that a fresh build reproduces `blog/ai/` (diff after
stripping the `?v=` cache stamps, which change every build).

## State at 11 Nov 2026
- `e0969d7` ports everything live on master's `blog/ai/` (site PRs #30–#34, port notes §1–§10 in
  `electricity-source:docs/AI-SERIES-PORT.md`): pages, `binds.html`, `thesis.js` and `og.png` (in `src/static/`),
  `feed.xml`, social cards and canonical links, "updated" dates, "In brief", contrast fixes. A build of it equals
  master's `blog/ai/` except the cache stamps and one line: `binds.html` no longer loads `three3d.js`, since it has no 3D figure.
- `3aa8eb6` ports **site PR #36, which is still open and unmerged** (port notes §11–§13): keyboard pointer
  (`Fig._kbdPtr` in `src/lib/fig.js`), dark mode, the phone drawer fix and the Llama 3.1 link. So the next deploy from
  this branch also ships #36's AI-series half. Merge or close #36 consistently with that.
- `thesis.js` is copied as a static file. Port note §1 suggests turning its figures into `src/figs/` modules later.
- Older notes: `README.md`, `STATUS.md`, and the `REVIEW-*.md` files.
