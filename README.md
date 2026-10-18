# akarshgopal.github.io

Personal site of Akarsh Gopal, served by GitHub Pages from `master` at <https://akarshgopal.github.io/>.

Plain HTML, CSS and JavaScript with no build step. Edit the `.html` files directly. Nothing is compiled at deploy time.

| Path | What |
| --- | --- |
| `index.html`, `projects.html`, `essays.html` (Writing), `bookshelf.html` | Pages. `notes.html` is kept but `noindex` and out of the nav |
| `assets/styles.css` | All site styles: dark "mission control" theme, blueprint grid, HUD, reduced-motion overrides |
| `assets/js/site.js` | HUD telemetry (local time, session clock, scroll, FPS, cursor), scroll reveals, flight-log progress, tilt cards, optional sound (off by default), the Ctrl/⌘-K command palette |
| `assets/js/hero.js` | Home page WebGL hero. Lazy-loads three.js after page load; still frame under `prefers-reduced-motion`, SVG fallback without WebGL |
| `assets/vendor/three.min.js` | A subset of three.js r186 (MIT, see `LICENSE-three.txt`) bundled as a single ES module |
| `assets/fonts/` | Self-hosted Space Grotesk and JetBrains Mono (SIL OFL, licences alongside) |
| `assets/video/` | BlueHornet demo video and poster |
| `blog/electricity/` | *How Electricity Works*, a self-contained interactive series with its own styles and scripts. Replace it wholesale from its own build; don't edit it here |
| `bio.html`, `story.html`, `blog/index.html` | Redirects that keep old URLs working |
| `404.html`, `sitemap.xml`, `robots.txt`, favicons, `assets/og.png` | Housekeeping |

Preview locally:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
