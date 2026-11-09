# akarshgopal.github.io

Personal site of Akarsh Gopal, served by GitHub Pages from `master` at <https://akarshgopal.github.io/>.

Plain HTML, CSS and a little JavaScript with no build step. Edit the `.html` files directly.

| Path | What |
| --- | --- |
| `index.html`, `projects.html`, `essays.html` (Writing), `bookshelf.html` | Pages. `notes.html` is kept but `noindex` and out of the nav |
| `projects/*.html` | One page per project: a facts block, media, and sections with key numbers and pictures in the margin |
| `assets/styles.css` | All styles. One text column with a margin for notes (`.pair` = a paragraph and its `.note`; `.row` keeps a note level with its entry). Light and dark themes via `prefers-color-scheme` plus a manual toggle. Below 62rem the notes drop in under their paragraph |
| `assets/site.js` | Theme toggle (remembered in `localStorage`) and margin-note highlighting: hovering a note number lights up its note |
| `assets/fonts/` | Self-hosted Source Serif 4 (variable, roman and italic), Latin subset, SIL OFL licence alongside |
| `assets/projects/` | Screenshots captured from the live apps (pdfdiff.app, treechat.cc, ultimat-sim) |
| `assets/video/` | BlueHornet demo video and poster |
| `blog/electricity/` | *Why Did Electricity Stop Getting Cheaper?*, a self-contained interactive series built from the `electricity-source` branch. Replace it wholesale from that branch's head; see `SERIES-SOURCES.md` |
| `blog/ai/` | *Can AI outgrow the planet's power grid?*, built from the separate `ai-explainer` source. The built files are ahead of the source: read `SERIES-SOURCES.md` before any rebuild |
| `.github/workflows/series-guard.yml` | Fails a pull request that would put back an older version of either series |
| `bio.html`, `story.html`, `blog/index.html` | Redirects that keep old URLs working |
| `404.html`, `sitemap.xml`, `robots.txt`, favicons, `assets/og.png` | Housekeeping |

Preview locally:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
