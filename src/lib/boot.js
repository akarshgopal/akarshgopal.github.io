import './fig.js';
import { setPlaying, isPlaying, onPlayChange, redrawAll } from './fig.js';

// partial: this bundle registers only some of the page's figures (another bundle has the rest).
export function boot(FIGS, { partial = false } = {}) {
  function init() {
  document.querySelectorAll('[data-fig]').forEach(el => {
    const f = FIGS[el.dataset.fig];
    if (!f) { if (!partial && el.dataset.fig !== 'hero3d') console.warn('unknown figure', el.dataset.fig); return; }
    try { f(el); } catch (e) { console.error('figure failed', el.dataset.fig, e); el.classList.add('fig-error'); }
    const cap = el.querySelector(':scope > figcaption'); if (cap) el.appendChild(cap);
  });
  const btn = document.getElementById('play-toggle');
  // a partial bundle has its own copy of the play state: follow the same button
  if (btn && partial) btn.addEventListener('click', () => setPlaying(!isPlaying()));
  if (btn && !partial) {
    const paint = () => { btn.setAttribute('aria-pressed', isPlaying()); btn.textContent = isPlaying() ? '❚❚ Pause' : '▶ Play'; btn.title = btn.ariaLabel = isPlaying() ? 'Pause all animations' : 'Play all animations'; };
    btn.addEventListener('click', () => setPlaying(!isPlaying()));
    onPlayChange(paint); paint();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redrawAll);
  // footnote hover previews are plain anchors; nothing else needed
}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}
