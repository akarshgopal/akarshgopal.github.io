import './fig.js';
import { setPlaying, isPlaying, onPlayChange, redrawAll } from './fig.js';

export function boot(FIGS) {
  function init() {
  document.querySelectorAll('[data-fig]').forEach(el => {
    const f = FIGS[el.dataset.fig];
    if (!f) { console.warn('unknown figure', el.dataset.fig); return; }
    try { f(el); } catch (e) { console.error('figure failed', el.dataset.fig, e); el.classList.add('fig-error'); }
    const cap = el.querySelector(':scope > figcaption'); if (cap) el.appendChild(cap);
  });
  const btn = document.getElementById('play-toggle');
  if (btn) {
    const paint = () => { btn.setAttribute('aria-pressed', isPlaying()); btn.textContent = isPlaying() ? '❚❚ Pause' : '▶ Play'; btn.title = btn.ariaLabel = isPlaying() ? 'Pause all animations' : 'Play all animations'; };
    btn.addEventListener('click', () => setPlaying(!isPlaying()));
    // never sit on top of a figure: tuck the floating button away whenever it would overlap one
    const figs = [...document.querySelectorAll('figure.fig')];
    let raf = 0;
    const tuck = () => { raf = 0; const p = btn.getBoundingClientRect(); const hit = figs.some(f => { const r = f.getBoundingClientRect(); return r.left < p.right + 6 && r.right > p.left - 6 && r.top < p.bottom + 6 && r.bottom > p.top - 6; }); btn.classList.toggle('tucked', hit); };
    const q = () => { if (!raf) raf = requestAnimationFrame(tuck); };
    addEventListener('scroll', q, { passive: true }); addEventListener('resize', q); addEventListener('click', q, true); addEventListener('input', q, true); new ResizeObserver(q).observe(document.body); setInterval(q, 400); q();
    onPlayChange(paint); paint();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redrawAll);
  // footnote hover previews are plain anchors; nothing else needed
}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}
