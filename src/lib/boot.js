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
    onPlayChange(paint); paint();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redrawAll);
  // footnote hover previews are plain anchors; nothing else needed
}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}
