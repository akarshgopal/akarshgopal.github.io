# akarshgopal.github.io

Personal site of Akarsh Gopal, served by GitHub Pages from `master` at <https://akarshgopal.github.io/>.

Plain HTML, CSS and a little JavaScript with no build step. Edit the `.html` files directly.

| Path | What |
| --- | --- |
| `index.html`, `projects.html`, `essays.html` (Writing), `bookshelf.html` | Pages. `notes.html` is kept but `noindex` and out of the nav |
| `projects/*.html` | One case-study page per project (role, dates, what it is, what I did, links, media) |
| `assets/styles.css` | All styles: light and dark themes via `prefers-color-scheme` plus a manual toggle, cross-page view transitions, reduced-motion handling |
| `assets/site.js` | Theme toggle (remembered in `localStorage`), header hairline, chart reveal, hover previews on project rows (mouse only) |
| `assets/fonts/` | Self-hosted Inter (variable) and Newsreader (variable, roman and italic), Latin subsets, SIL OFL licences alongside |
| `assets/projects/` | Screenshots captured from the live apps (pdfdiff.app, treechat.cc, ultimat-sim) |
| `assets/video/` | BlueHornet demo video and poster |
| `blog/electricity/` | *How Electricity Works*, a self-contained interactive series with its own styles and scripts. Replace it wholesale from its own build; don't edit it here |
| `bio.html`, `story.html`, `blog/index.html` | Redirects that keep old URLs working |
| `404.html`, `sitemap.xml`, `robots.txt`, favicons, `assets/og.png` | Housekeeping |

Preview locally:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
