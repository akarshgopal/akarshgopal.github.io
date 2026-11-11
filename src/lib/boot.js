import './fig.js';
import { setPlaying, isPlaying, onPlayChange, redrawAll } from './fig.js';
import { isClosedPeek, initPeeks } from './peek.js';
import { markVisited } from './visited.js';

// Visual system: under each figure, one slim footer line holds the how-to prompt and an "ⓘ data" toggle. The
// toggle is a native <details> that opens the former caption (sources, the Real data / Model / Illustration tag and
// every assumption), so nothing is lost, it is keyboard-reachable, and it costs one line until someone asks for it.
function footer(el) {
  const cap = el.querySelector(':scope > figcaption'), hint = el.querySelector('.fig-hint');
  if (!cap && !hint) return;
  const foot = document.createElement('figcaption'); foot.className = 'figfoot';
  if (hint) foot.appendChild(hint);
  if (cap) {
    const tag = cap.querySelector('.tagline'), d = document.createElement('details'); d.className = 'figdata';
    const sm = document.createElement('summary');
    sm.innerHTML = `<span class="i" aria-hidden="true">ⓘ</span> data${tag ? `<span class="t"> · ${tag.textContent.trim()}</span>` : ''}`;
    sm.setAttribute('aria-label', `Data, sources and assumptions${tag ? ` (${tag.textContent.trim()})` : ''}`);
    const body = document.createElement('div'); body.className = 'figcap'; while (cap.firstChild) body.appendChild(cap.firstChild); // move, so live nodes a figure put there keep working
    d.append(sm, body); foot.appendChild(d); cap.remove();
    // a footnote link or #fig anchor that points inside a closed toggle opens it
    const open = () => { const id = decodeURIComponent(location.hash.slice(1)); if (id && body.querySelector('#' + CSS.escape(id))) d.open = true; };
    addEventListener('hashchange', open); open();
  }
  el.appendChild(foot);
}

export function boot(FIGS) {
  function init() {
  const make = el => {
    if (el.__made) return; el.__made = true;
    const f = FIGS[el.dataset.fig];
    if (!f) { console.warn('unknown figure', el.dataset.fig); return; }
    try { f(el); } catch (e) { console.error('figure failed', el.dataset.fig, e); el.classList.add('fig-error'); }
    footer(el);
  };
  // figures inside a closed "look inside" drawer are only built when it first opens
  document.querySelectorAll('[data-fig]').forEach(el => { if (!isClosedPeek(el)) make(el); });
  initPeeks(d => d.querySelectorAll('[data-fig]').forEach(make));
  markVisited();
  const btn = document.getElementById('play-toggle');
  if (btn) {
    const paint = () => { btn.setAttribute('aria-pressed', isPlaying()); btn.textContent = isPlaying() ? '❚❚ Pause' : '▶ Play'; btn.title = btn.ariaLabel = isPlaying() ? 'Pause all animations' : 'Play all animations'; };
    btn.addEventListener('click', () => setPlaying(!isPlaying()));
    // never sit on top of a figure: tuck the floating button away whenever it would overlap one
    const figs = [...document.querySelectorAll('figure.fig')];
    const textish = () => [...figs, ...document.querySelectorAll('article p, article li, article h2, article h3, article .aside, article .lede, article .deepdive, nav.pager, table.ledger, details.peek, .figfoot, footer')];
    let raf = 0;
    const tuck = () => {
      raf = 0;
      const p = btn.getBoundingClientRect();
      const hit = textish().some(f => { const r = f.getBoundingClientRect(); return r.width && r.left < p.right + 14 && r.right > p.left - 14 && r.top < p.bottom + 14 && r.bottom > p.top - 14; });
      btn.classList.toggle('tucked', hit);
    };
    const q = () => { if (!raf) raf = requestAnimationFrame(tuck); };
    addEventListener('scroll', q, { passive: true }); addEventListener('resize', q); addEventListener('click', q, true); addEventListener('input', q, true); { const ro = new ResizeObserver(q); ro.observe(document.body); figs.forEach(f => ro.observe(f)); } // a figure that grows (a longer readout) re-checks at once
    setInterval(q, 400); q();
    onPlayChange(paint); paint();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redrawAll);
  // footnote hover previews are plain anchors; nothing else needed
}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}
