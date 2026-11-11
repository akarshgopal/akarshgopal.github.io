// Figure runtime: HiDPI canvas, responsive sizing, offscreen pausing, global play/pause.
const figs = [];
let playing = true;
const playListeners = new Set();
const reduceMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) playing = false;

export function isPlaying() { return playing; }
export function setPlaying(v) {
  playing = v;
  playListeners.forEach(f => f(v));
  figs.forEach(f => f._kick());
}
export function onPlayChange(f) { playListeners.add(f); }
export function allFigs() { return figs; }

const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
  for (const e of entries) {
    const f = e.target.__fig;
    if (!f) continue;
    f.visible = e.isIntersecting;
    f._kick();
  }
}, { rootMargin: '120px 0px' }) : null;

/**
 * new Fig(container, opts)
 *  opts.height(w) -> css px height, or opts.aspect (h = w*aspect)
 *  opts.draw(ctx, w, h, fig)
 *  opts.step(dt, fig)        called every animation frame (dt seconds, clamped)
 *  opts.animated             true -> runs RAF loop when visible & global play
 *  opts.label                aria-label for the canvas
 */
export class Fig {
  constructor(container, opts) {
    this.opts = opts;
    this.container = container;
    this.wrap = document.createElement('div');
    this.wrap.className = 'canvas-wrap';
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', opts.label || 'Interactive figure');
    this.wrap.appendChild(this.canvas);
    container.appendChild(this.wrap);
    this.ctx = this.canvas.getContext('2d');
    this.w = 0; this.h = 0; this.dpr = 1;
    this.visible = false;
    this.t = 0;
    this._raf = 0;
    this._dirty = true;
    this._last = 0;
    this.pointer = null;
    this.canvas.__fig = this;
    figs.push(this);
    if (io) io.observe(this.canvas); else this.visible = true;
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => this.resize()).observe(this.wrap);
    }
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  get animated() { return !!this.opts.animated && playing; }

  resize() {
    const w = Math.max(200, Math.round(this.wrap.clientWidth || 600));
    const h = Math.round(this.opts.height ? this.opts.height(w) : w * (this.opts.aspect || 0.6));
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    if (w === this.w && h === this.h && dpr === this.dpr) return;
    this.w = w; this.h = h; this.dpr = dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    if (this.opts.onResize) this.opts.onResize(w, h, this);
    if (this._drawn) { this.render(); this._dirty = false; } // resizing clears the canvas: repaint now, even if off-screen
    this.invalidate();
  }

  invalidate() {
    this._dirty = true;
    this._kick();
  }

  _kick() {
    if (this._raf) return;
    if (!this.visible) return;
    if (!this._dirty && !this.animated) return;
    this._last = performance.now();
    this._raf = requestAnimationFrame(ts => this._frame(ts));
  }

  _frame(ts) {
    this._raf = 0;
    let dt = (ts - this._last) / 1000;
    this._last = ts;
    if (!(dt > 0)) dt = 1 / 60;
    dt = Math.min(dt, 1 / 20);
    if (this.animated && this.opts.step) {
      this.t += dt;
      this.opts.step(dt, this);
    }
    this.render();
    this._dirty = false;
    // step()/draw() often call invalidate(), which may already have queued the next frame; never queue a second
    // one, or every such call doubles the number of loops running while the figure is on screen
    if (this.animated && this.visible && !this._raf) {
      this._raf = requestAnimationFrame(t2 => this._frame(t2));
    }
  }

  render() {
    const { ctx, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    this.canvas.__dpr = dpr; if (globalThis.__AUDIT) this.canvas.__texts = [];
    this.opts.draw(ctx, this.w, this.h, this);
    this._drawn = true;
  }

  /** Run step() manually (used when paused but a sim must still advance, e.g. on user action). */
  stepOnce(dt) { if (this.opts.step) { this.t += dt; this.opts.step(dt, this); } this.invalidate(); }

  /**
   * Pointer helper. handlers: { hit(x,y)->obj|null, down(obj,x,y,e), move(obj,x,y,e), up(obj), hover(obj|null,x,y) }
   */
  interact(h) {
    const c = this.canvas;
    // Phones: the page must keep scrolling. The browser may pan vertically unless a touch starts on something
    // grabbable (h.touchHit, else h.hit); only then is the gesture claimed, by cancelling that touchstart.
    c.style.touchAction = 'pan-y pinch-zoom';
    let drag = null;
    const pos = e => { const r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const tHit = h.touchHit || h.hit;
    c.addEventListener('touchstart', e => {
      // h.panY: a horizontal scrub or a tap target. Never claim the touch; touch-action pan-y lets a vertical swipe
      // scroll the page (the browser then cancels the pointer) while a sideways drag or a tap still reaches us.
      if (h.panY || !tHit || e.touches.length !== 1 || !this._drawn) return;
      const r = c.getBoundingClientRect(), t = e.touches[0];
      if (tHit(t.clientX - r.left, t.clientY - r.top)) e.preventDefault();
    }, { passive: false });
    // until the first draw, hit() has no geometry to test against (it is set in draw), so ignore the pointer
    c.addEventListener('pointerdown', e => {
      if (!this._drawn) return;
      const [x, y] = pos(e);
      const obj = e.pointerType === 'touch' && !h.panY ? (tHit ? tHit(x, y) : true) : (h.hit ? h.hit(x, y) : true);
      // a mouse press that misses every handle must still not start a text selection, whose autoscroll can fling the page
      if (!obj) { if (e.pointerType === 'mouse') e.preventDefault(); return; }
      drag = obj;
      c.setPointerCapture(e.pointerId);
      c.classList.add('dragging');
      h.down && h.down(obj, x, y, e);
      this.invalidate();
      e.preventDefault();
    });
    c.addEventListener('pointermove', e => {
      if (!this._drawn) return;
      const [x, y] = pos(e);
      if (drag) { h.move && h.move(drag, x, y, e); this.invalidate(); return; }
      const obj = h.hit ? h.hit(x, y) : null;
      c.style.cursor = obj ? (h.cursor || 'grab') : 'default';
      if (h.hover) { h.hover(obj, x, y); this.invalidate(); }
    });
    const end = () => { if (drag) { h.up && h.up(drag); drag = null; c.classList.remove('dragging'); this.invalidate(); } };
    c.addEventListener('pointerup', end);
    c.addEventListener('pointercancel', end);
    c.addEventListener('pointerleave', () => { if (!drag && h.hover) { h.hover(null, -1, -1); this.invalidate(); } });
    if (h.keys !== false) this._kbdPtr(h);
  }

  /**
   * Keyboard pointer (ported from the electricity series' src/lib/fig.js, 9 Nov 2026). The canvas takes focus; the arrow
   * keys move a visible pointer (Shift: further), Enter or Space presses or grabs, Escape lets go. Hover readouts follow
   * the pointer. If Enter lands on nothing, it snaps to the nearest thing hit() reports. h.keyStart() -> [x,y] sets where
   * the pointer first appears; h.keys === false opts a figure out.
   */
  _kbdPtr(h) {
    const c = this.canvas;
    c.tabIndex = 0;
    c.setAttribute('role', 'application');
    c.setAttribute('aria-roledescription', 'interactive figure');
    c.setAttribute('aria-label', (c.getAttribute('aria-label') || 'Interactive figure').replace(/\.?\s*$/, '.') + ' Arrow keys move a pointer over the figure; Enter or Space presses or grabs; Escape lets go.');
    const mk = document.createElement('div');
    mk.className = 'kbd-ptr';
    mk.setAttribute('aria-hidden', 'true');
    this.wrap.appendChild(mk);
    const k = { x: null, y: null, grab: null };
    // a stand-in pointer event for handlers that read clientX/Y or call preventDefault
    const ev = () => { const r = c.getBoundingClientRect(); return { pointerType: 'keyboard', clientX: r.left + k.x, clientY: r.top + k.y, shiftKey: false, preventDefault() {} }; };
    const show = () => {
      if (k.x == null) { const s = h.keyStart && h.keyStart(); [k.x, k.y] = s || [this.w / 2, this.h / 2]; }
      k.x = Math.max(0, Math.min(this.w - 1, k.x));
      k.y = Math.max(0, Math.min(this.h - 1, k.y));
      mk.style.transform = `translate(${k.x}px, ${k.y}px)`;
      mk.classList.toggle('grab', !!k.grab);
    };
    const hov = () => { if (h.hover && !k.grab && this._drawn) h.hover(h.hit ? h.hit(k.x, k.y) : null, k.x, k.y); };
    const rel = () => { if (k.grab) { const g = k.grab; k.grab = null; h.up && h.up(g); c.classList.remove('dragging'); } };
    c.addEventListener('focus', () => { if (c.matches(':focus-visible')) { mk.classList.add('on'); show(); hov(); this.invalidate(); } });
    c.addEventListener('blur', () => { rel(); mk.classList.remove('on', 'grab'); h.hover && h.hover(null, -1, -1); this.invalidate(); });
    c.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey || !this._drawn) return;
      const st = Math.max(3, Math.round(this.w / 60)) * (e.shiftKey ? 5 : 1);
      const d = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
      if (d) {
        e.preventDefault();
        mk.classList.add('on');
        if (k.x == null) show();
        k.x += d[0]; k.y += d[1];
        show();
        if (k.grab) h.move && h.move(k.grab, k.x, k.y, ev()); else hov();
        this.invalidate();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mk.classList.add('on');
        if (k.x == null) show();
        if (k.grab) { rel(); show(); hov(); this.invalidate(); return; }
        let ob = h.hit ? h.hit(k.x, k.y) : true;
        // nothing under the pointer: search outward in rings for the nearest thing that can be pressed (small handles)
        if (!ob && h.hit) {
          const lim = Math.max(this.w, this.h) / 2;
          search: for (let r = 6; r <= lim; r += 6) for (let a = 0; a < 24; a++) {
            const x = k.x + r * Math.cos(a * Math.PI / 12), y = k.y + r * Math.sin(a * Math.PI / 12);
            if (x < 0 || y < 0 || x >= this.w || y >= this.h) continue;
            const hit = h.hit(x, y);
            if (hit) { k.x = x; k.y = y; ob = hit; break search; }
          }
        }
        if (!ob || !h.down) return;
        h.down(ob, k.x, k.y, ev());
        if (h.move) { k.grab = ob; c.classList.add('dragging'); } else h.up && h.up(ob);
        show();
        this.invalidate();
      } else if (e.key === 'Escape' && k.grab) {
        e.preventDefault(); rel(); show(); hov(); this.invalidate();
      }
    });
  }
}

export function redrawAll() { figs.forEach(f => f.invalidate()); }
