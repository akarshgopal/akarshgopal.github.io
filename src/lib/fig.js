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

    if (h.keys !== false) this._keyboardPointer(h);
  }

  /**
   * Keyboard pointer: every canvas that answers the pointer also answers the keyboard. Tab to the figure; the arrow
   * keys move a visible pointer (Shift moves it further); Enter or Space presses where it is (or, if nothing is there,
   * on the nearest thing that can be pressed): a click on things that are clicked, a grab on things that are dragged, so the arrows then drag and Enter, Space or Escape lets go.
   * Hover readouts follow the pointer as they follow the mouse. A figure with its own keys passes { keys: false }.
   */
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
    const hover = () => { if (h.hover && !kp.grab) { h.hover(h.hit ? h.hit(kp.x, kp.y) : null, kp.x, kp.y); } };
    const release = () => { if (kp.grab) { const g = kp.grab; kp.grab = null; h.up && h.up(g); c.classList.remove('dragging'); } };
    c.addEventListener('focus', () => {
      if (!c.matches(':focus-visible')) return; // a mouse click focuses too; only keyboard focus shows the pointer
      mark.classList.add('on'); show(); hover(); this.invalidate();
    });
    c.addEventListener('blur', () => { release(); mark.classList.remove('on', 'grab'); if (h.hover) h.hover(null, -1, -1); this.invalidate(); });
    c.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
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
}

export function redrawAll() { figs.forEach(f => f.invalidate()); }
