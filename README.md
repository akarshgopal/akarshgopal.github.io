# akarshgopal.github.io

Personal site of Akarsh Gopal, served by GitHub Pages from `master` at <https://akarshgopal.github.io/>.

Plain HTML and CSS with no build step. Edit the `.html` files directly.

| Path | What |
| --- | --- |
| `index.html`, `projects.html`, `essays.html` (Writing), `notes.html`, `bookshelf.html` | Pages |
| `assets/styles.css` | All site styles: light and dark themes via `prefers-color-scheme`, plus a manual toggle |
| `assets/theme.js` | Theme toggle (remembers the choice in `localStorage`) |
| `assets/video/` | BlueHornet demo video and poster |
| `blog/electricity/` | *How Electricity Works*, a self-contained interactive series with its own styles and scripts. Replace it wholesale from its own build; don't edit it here |
| `bio.html`, `story.html`, `blog/index.html` | Redirects that keep old URLs working |
| `404.html`, `sitemap.xml`, `robots.txt`, favicons, `assets/og.png` | Housekeeping |

Preview locally:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
