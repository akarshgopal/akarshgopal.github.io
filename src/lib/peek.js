// "↓ look inside" drawers. A peek is a closed <details class="peek" id=… data-level="H8" data-title="…"> under a key figure.
// It holds at most 120 words of prose and one mini-figure with one control, one layer down. Closed it costs nothing: the
// figure inside is only built the first time the drawer opens (boot.js asks isClosedPeek / onPeekOpen).
// Markup:
//   <details class="peek" id="peek-inverter" data-level="H8" data-title="The inverter">
//     <summary>Look inside: <b>a gate is two transistors that never both conduct</b></summary>
//     <div class="peek-body"><p>…</p><figure class="fig narrow" data-fig="cmosInverter">…</figure><p class="peek-end">…and that is what … is made of.</p></div>
//   </details>
export const MAX_WORDS = 120;

export function isClosedPeek(el) { const d = el.closest('details.peek'); return d && !d.open ? d : null; }

export function initPeeks(onOpenFigs) {
  const peeks = [...document.querySelectorAll('details.peek')];
  for (const d of peeks) {
    const sum = d.querySelector(':scope > summary');
    // the level chip: where this drawer sits relative to the section it hangs under, e.g. "H9 → H8"
    let prev = d, parent = null;
    while (prev && !parent) { prev = prev.previousElementSibling; if (prev && prev.matches('h2[data-level]')) parent = prev.dataset.level.split(/\s+/)[0]; }
    const own = (d.dataset.level || '').split(/\s+/)[0];
    if (sum && !sum.querySelector('.pk-t')) { const t = document.createElement('span'); t.className = 'pk-t'; while (sum.firstChild) t.appendChild(sum.firstChild); sum.appendChild(t); }
    if (sum && own) {
      const chip = document.createElement('span'); chip.className = 'pk-lv'; chip.textContent = parent && parent !== own ? `${parent} → ${own}` : own;
      chip.setAttribute('aria-hidden', 'true'); sum.appendChild(chip);
    }
    d.addEventListener('toggle', () => { if (d.open) onOpenFigs(d); });
  }
  // a link or hash that points at a drawer, or inside one, opens it
  const open = () => {
    const id = decodeURIComponent(location.hash.slice(1)); if (!id) return;
    const t = document.getElementById(id); const d = t && (t.matches('details.peek') ? t : t.closest('details.peek'));
    if (d && !d.open) { d.open = true; setTimeout(() => t.scrollIntoView({ block: 'start' }), 50); }
  };
  addEventListener('hashchange', open); open();
  return peeks;
}
