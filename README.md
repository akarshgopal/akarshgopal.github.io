# ai-explainer

Source for the AI series ("How Machines Learned" / "Can AI outgrow the planet's power grid?").

**Deployment:** `pnpm build` writes `dist/`, and that built `dist/` is deployed to
[akarshgopal.github.io/blog/ai/](https://akarshgopal.github.io/blog/ai/) (site repo `akarshgopal/akarshgopal.github.io`, folder `blog/ai/`).

**Rule:** source changes land here first, then get rebuilt and copied into the site.
Never hand-patch the built files in the site repo. A rebuild from this repo overwrites them, and the fix is lost.

Source of truth: the `ai-source` branch of the site repo. Ship flow and rules: `HANDOVER.md`. Resume notes: `STATUS.md`.
