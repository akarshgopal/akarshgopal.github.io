# Port kit: the 9–14 Nov 2026 AI-series patches, for the `ai-explainer` source

The live `blog/ai/` on master has patches that the `ai-explainer` source (last known commit `c4cbf13`, used for
PR #39) does not. This file holds everything needed to port them, as readable code. It complements
`AI-SERIES-PORT.md` §12–§14.

**Until the port is done, nothing is lost.** After any rebuild, `python3 .github/scripts/ai-postbuild.py` on master
re-inserts the keyboard pointer into the built `app.js` and rewrites the cache stamps. The series guard fails a
pull request that skips this step. Applied to #39's unpatched `app.js`, the script reproduces the live file byte for
byte.

## Paste this into a session that has the `ai-explainer` source

> Port the keyboard pointer, dark mode, phone-drawer fix and cache stamps from the live AI series into this
> source, following `docs/AI-PORT-KIT.md` on the `electricity-source` branch of
> `akarshgopal/akarshgopal.github.io` (sections 1 to 4). Then rebuild. Then check that the rebuilt `app.js`
> still has `_keyboardPointer` (or `_kbdPtr`), and that `bash .github/scripts/series-guard.sh` passes on a
> master checkout with the new build copied into `blog/ai/`. Commit to `ai-explainer`, and push that repository
> to GitHub so later sessions can reach it.

## 1. Keyboard pointer (figure runtime, the class with `interact(o)`)

In the source's figure class (the one whose minified form is `x` in `app.js`, with `resize()`,
`invalidate()` and `interact()`), add one line at the end of `interact(h)`, after the `pointerleave`
listener:

```js
    if (h.keys !== false) this._keyboardPointer(h);
```

Then add this method to the class. It is the electricity series' method (`src/lib/fig.js`), plus two `this._drawn`
guards, because the AI runtime ignores the pointer until a figure's first paint:

```js
  _keyboardPointer(h) {
    const c = this.canvas;
    c.tabIndex = 0;
    c.setAttribute('role', 'application');
    c.setAttribute('aria-roledescription', 'interactive figure');
    c.setAttribute('aria-label', (c.getAttribute('aria-label') || 'Interactive figure').replace(/\.?\s*$/, '.') +
      ' Arrow keys move a pointer over the figure; Enter or Space presses or grabs; Escape lets go.');
    const mark = document.createElement('div');
    mark.className = 'kbd-ptr';
    mark.setAttribute('aria-hidden', 'true');
    this.wrap.appendChild(mark);
    const kp = { x: null, y: null, grab: null };
    const ev = () => { const r = c.getBoundingClientRect(); return { pointerType: 'keyboard', clientX: r.left + kp.x, clientY: r.top + kp.y, shiftKey: false, preventDefault() {} }; };
    const show = () => {
      if (kp.x == null) { const s = h.keyStart && h.keyStart(); [kp.x, kp.y] = s || [this.w / 2, this.h / 2]; }
      kp.x = Math.max(0, Math.min(this.w - 1, kp.x)); kp.y = Math.max(0, Math.min(this.h - 1, kp.y));
      mark.style.transform = `translate(${kp.x}px, ${kp.y}px)`;
      mark.classList.toggle('grab', !!kp.grab);
    };
    const hover = () => { if (h.hover && !kp.grab && this._drawn) { h.hover(h.hit ? h.hit(kp.x, kp.y) : null, kp.x, kp.y); } };
    const release = () => { if (kp.grab) { const g = kp.grab; kp.grab = null; h.up && h.up(g); c.classList.remove('dragging'); } };
    c.addEventListener('focus', () => {
      if (!c.matches(':focus-visible')) return; // a mouse click focuses too; only keyboard focus shows the pointer
      mark.classList.add('on'); show(); hover(); this.invalidate();
    });
    c.addEventListener('blur', () => { release(); mark.classList.remove('on', 'grab'); if (h.hover) h.hover(null, -1, -1); this.invalidate(); });
    c.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey || !this._drawn) return; // the AI runtime marks a figure drawn after its first paint
      const big = e.shiftKey ? 5 : 1, step = Math.max(3, Math.round(this.w / 60)) * big;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (d) {
        e.preventDefault(); mark.classList.add('on');
        if (kp.x == null) show();
        kp.x += d[0]; kp.y += d[1]; show();
        if (kp.grab) h.move && h.move(kp.grab, kp.x, kp.y, ev()); else hover();
        this.invalidate();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); mark.classList.add('on');
        if (kp.x == null) show();
        if (kp.grab) { release(); show(); hover(); this.invalidate(); return; }
        let obj = h.hit ? h.hit(kp.x, kp.y) : true;
        if (!obj && h.hit) { // missed: snap to the nearest thing that can be pressed, searching outwards
          const lim = Math.max(this.w, this.h) / 2;
          search: for (let r = 6; r <= lim; r += 6) for (let a = 0; a < 24; a++) {
            const x = kp.x + r * Math.cos(a * Math.PI / 12), y = kp.y + r * Math.sin(a * Math.PI / 12);
            if (x < 0 || y < 0 || x >= this.w || y >= this.h) continue;
            const o2 = h.hit(x, y);
            if (o2) { kp.x = x; kp.y = y; obj = o2; break search; }
          }
        }
        if (!obj || !h.down) return;
        h.down(obj, kp.x, kp.y, ev());
        if (h.move) { kp.grab = obj; c.classList.add('dragging'); } else if (h.up) h.up(obj);
        show(); this.invalidate();
      } else if (e.key === 'Escape' && kp.grab) {
        e.preventDefault(); release(); show(); hover(); this.invalidate();
      }
    });
  }
```

Behaviour:
- A canvas that answers the mouse becomes focusable (`role="application"`).
- The arrow keys move a visible pointer; Shift moves it further.
- Enter or Space clicks or grabs. If nothing is under the pointer, Enter snaps to the nearest handle.
- Escape lets go.
- A figure with its own keys passes `{ keys: false }` to `interact`.
- `keyStart()` in the handler object may give the pointer's starting point.

## 2. Stylesheet

A rebuild keeps master's `blog/ai/style.css` (PR #39 did). If the source has its own copy, apply the same changes
there. Lines with a minus sign go; lines without one are added:

```css
-    display: none; position: fixed; inset: 0; z-index: 21;
    display: none; position: fixed; inset: 0; z-index: 19; /* under nav.series (z 20), whose stacking context holds the drawer */
  body.series-open nav.series { -webkit-backdrop-filter: none; backdrop-filter: none; } /* a filter makes the nav the containing block of the fixed drawer */

/* ── Dark mode (9 Nov 2026), as in the electricity series ─────────────────────────────────────────────────
   The page goes dark; each figure stays a light plate, because the canvases draw a fixed light palette. */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --ink: #ece9e3; --ink2: #c4c1ba; --ink3: #a3a09a; --grid: #343432; --grid2: #4a4a46;
    --paper: #232322; --bg: #1a1a19; --stage: #232322;
    --t-red: #f08a80; --t-orange: #f0a066; --t-yellow: #e6be55; --t-green: #7cc883; --t-cyan: #55c4bb; --t-blue: #84aef0; --t-violet: #b796e6;
  }
  figure.fig {
    color-scheme: light;
    --ink: #2b2b2a; --ink2: #575755; --ink3: #6d6d6b; --grid: #e4e4e1; --grid2: #d0d0cc;
    --paper: #f4f4f2; --bg: #fdfdfc; --stage: #f4f4f2;
    --t-red: #bf392f; --t-orange: #b25611; --t-yellow: #8f6a0b; --t-green: #2e7a33; --t-cyan: #137a73; --t-blue: #2d69b8; --t-violet: #7a46b8;
    color: var(--ink); background: var(--bg); padding: 14px 14px 12px; border-radius: 16px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.35);
  }
  .c-time:not(figure.fig *), .c-grey:not(figure.fig *) { color: #a3a09a; }
  .c-solar:not(figure.fig *) { color: #e6b44a; } .c-wind:not(figure.fig *) { color: #74b6de; }
  .c-gas:not(figure.fig *) { color: #ee9466; } .c-coal:not(figure.fig *) { color: #b0aba1; }
  .c-procurement:not(figure.fig *) { color: #e9b55c; } .c-network:not(figure.fig *) { color: #9daede; }
  .c-taxes:not(figure.fig *) { color: #bdb6a9; } .c-hot:not(figure.fig *) { color: #f08a6e; } .c-cold:not(figure.fig *) { color: #82abf0; }
  .c-B:not(figure.fig *) { color: #e8b25e; }
  /* page elements that used fixed light colours */
  .aside { background: #262625; }
  ol.notes li:target { background: #4a3f17; }
  #play-toggle { background: rgba(35,35,34,0.92); }
  nav.series { background: rgba(26,26,25,0.94); }
  nav.series li a:hover { background: #2c2c2a; }
  nav.series li a[aria-current=page] { background: var(--ink); color: var(--bg); }
  nav.series li a[aria-current=page] .n, nav.series li a[aria-current=page] small { color: #575755; }
  .series-scrim { background: rgba(0,0,0,.55); }
  details.peek { background: var(--paper); }
  details.peek > summary::before { background: color-mix(in srgb, var(--pk) 30%, var(--paper)); color: var(--ink); }
  details.peek[open] > summary::before { color: var(--bg); background: var(--ink); }
  details.peek > summary:hover { background: #2a2a28; }
  .pk-lv { color: var(--ink) !important; background: color-mix(in srgb, var(--pk) 35%, var(--paper)) !important; }
  a { text-decoration-color: #66645e; }
  a:hover { text-decoration-color: var(--ink2); }
}
@media (prefers-color-scheme: dark) and (min-width: 960px) { nav.series { background: rgba(26,26,25,0.98); } }
@media (prefers-color-scheme: dark) and (max-width: 959px) { nav.series .series-in { background: rgba(26,26,25,0.98); } }
@media (prefers-color-scheme: dark) and (max-width: 640px) { figure.fig, figure.fig.showpiece, figure.fig.narrow { padding: 8px 6px 10px; border-radius: 10px; } }

/* keyboard pointer (app.js Fig._kbdPtr, 9 Nov 2026): shown only while a figure has keyboard focus */
.canvas-wrap canvas:focus-visible { outline: 2px solid var(--ink2); outline-offset: 2px; }
.kbd-ptr { position: absolute; left: -9px; top: -9px; width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--ink, #1a1a1a); box-shadow: 0 0 0 2px rgba(255,255,255,.9); pointer-events: none; display: none; z-index: 2; }
.kbd-ptr::after { content: ''; position: absolute; left: 50%; top: 50%; width: 4px; height: 4px; margin: -2px 0 0 -2px; border-radius: 50%; background: var(--ink, #1a1a1a); }
.kbd-ptr.grab { background: color-mix(in srgb, var(--ink, #1a1a1a) 25%, transparent); }
canvas:focus-visible ~ .kbd-ptr.on { display: block; }
```

## 3. Cache stamps

Every local script and stylesheet loads as `name?v=<first 8 hex of the file's sha256>`. Either have the source's
page template write the stamps, or run `python3 .github/scripts/stamp-assets.py` on master after copying the build
in (`ai-postbuild.py` does this too). The guard checks every stamp.

## 4. Smaller items

- **`data.html` note n3:** the Llama 3.1 link is `https://ai.meta.com/blog/meta-llama-3-1/`.
- **Tests:**
  - **Keys alone:** every pointer-interactive figure should respond to the keyboard, as the live site does. All 64
    did on 14 Nov 2026.
  - **axe-core:** 0 violations in both colour schemes, at 1280 and 390.
