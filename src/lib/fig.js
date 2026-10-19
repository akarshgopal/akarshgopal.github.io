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
    if (this.animated && this.visible) {
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
      if (!tHit || e.touches.length !== 1) return;
      const r = c.getBoundingClientRect(), t = e.touches[0];
      if (tHit(t.clientX - r.left, t.clientY - r.top)) e.preventDefault();
    }, { passive: false });
    c.addEventListener('pointerdown', e => {
      const [x, y] = pos(e);
      const obj = e.pointerType === 'touch' ? (tHit ? tHit(x, y) : true) : (h.hit ? h.hit(x, y) : true);
      if (!obj) return;
      drag = obj;
      c.setPointerCapture(e.pointerId);
      c.classList.add('dragging');
      h.down && h.down(obj, x, y, e);
      this.invalidate();
      e.preventDefault();
    });
    c.addEventListener('pointermove', e => {
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
  }
}

export function redrawAll() { figs.forEach(f => f.invalidate()); }
