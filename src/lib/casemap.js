// The case map: two acts, each a small dependency graph. A node is a page that explains one condition for, or one force
// against, the thesis. All nodes are live links. Pages this browser has opened are tinted. Where a slider on the verdict
// meter belongs to a node, a five-pip gauge shows which way the reader has set it. Plain DOM + one SVG layer for the
// arrows, so it is keyboard- and screen-reader-friendly.
import { visited } from './visited.js';
import { subscribe } from './lean.js';

const ACTS = [
  { id: 'act1', title: 'Act 1', q: 'Will AI inference become humanity’s largest energy expenditure?',
    cols: [
      [['rules', 'Rules', 'the pattern', 'What a switch-pattern is, before we price a flip.', 'rules.html'], ['switch', 'The flip', 'the physical floor', 'What one flip costs, and why it stopped getting cheaper.', 'flip.html'], ['learn', 'A model', 'the unit', 'What a model is, and what an answer costs in operations.', 'model.html']],
      [['par', 'Parallel', 'efficiency', 'Why GPUs won: the chip that moves the fewest bytes per multiply does the most work per joule.', 'parallel.html', 'g0'], ['lang', 'Language', 'tokens', 'What one answer costs in operations.', 'language.html'], ['scale', 'Scaling', 'the Jevons effect', 'What bigger models and reasoning do to the cost of an answer.', 'scaling.html', 'T']],
      [['data', 'The data', 'examples', 'Does the supply of human examples cap how far demand can grow?', 'data.html'], ['dem', 'The demand', 'who asks', 'Counting tokens and dollars: what AI uses now, and what the money buys.', 'demand.html', 'U']],
      [['fac', 'The factory', 'where the power goes', 'Where a data centre’s power goes, how the heat leaves, and what it asks of the grid.', 'factory.html', 'cap'], ['yard', 'The yardstick', 'the bar moves', 'How big is the bar, and how fast do heating, cooling and industry grow?', 'yardstick.html', 'b']],
      [['v1', 'The verdict', 'the ledger', 'The scenario ledger for Act 1 and Act 2.', 'verdict.html']],
    ],
    edges: [['rules', 'switch'], ['switch', 'par'], ['learn', 'lang'], ['lang', 'scale'], ['par', 'fac'], ['scale', 'dem'], ['data', 'dem'], ['dem', 'fac'], ['fac', 'v1'], ['yard', 'v1']] },
  { id: 'act2', title: 'Act 2', q: 'Is orbital compute the only answer to 100× AI compute?',
    cols: [
      [['need', 'Power needed', 'the arithmetic', 'A compute multiple, divided by what chips gain, is gigawatts.', 'verdict.html#act2']],
      [['grid', 'The grid', 'on the ground', 'What plugging in a city-sized, swinging load asks of the grid today.', 'factory.html#grid'], ['binds', 'What binds', 'this decade', 'Firm power, connections, chips, permits or money: what limits AI’s growth to 2030.', 'binds.html'], ['orb', 'Orbital compute', 'the claim', 'Sunlight, radiators, mass per kilowatt, and launch price.', 'orbital.html']],
      [['v2', 'The verdict', 'only, or not?', 'The scenario ledger for Act 1 and Act 2.', 'verdict.html']],
      [['star', 'Star-mind', 'coda', 'The far end of the scale, where one star is the power plant.', 'orbital.html#star']],
    ],
    edges: [['need', 'grid'], ['need', 'binds'], ['need', 'orb'], ['grid', 'v2'], ['binds', 'v2'], ['orb', 'v2'], ['v2', 'star']] },
];
const PIPS = 5;

export function caseMap(el) {
  const seen = new Set(visited());
  el.classList.add('cm');
  const gauges = [];
  ACTS.forEach(act => {
    const sec = document.createElement('section'); sec.className = 'cm-act'; sec.id = 'map-' + act.id; sec.innerHTML = `<h3><span>${act.title}</span> ${act.q}</h3>`;
    const grid = document.createElement('div'); grid.className = 'cm-grid'; sec.appendChild(grid);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'cm-edges'); svg.setAttribute('aria-hidden', 'true'); grid.appendChild(svg);
    const nodes = {};
    act.cols.forEach((col, ci) => {
      const c = document.createElement('div'); c.className = 'cm-col'; grid.appendChild(c);
      col.forEach(([id, name, kind, why, href, lever]) => {
        const live = !!href, a = document.createElement(live ? 'a' : 'div'); a.className = 'cm-node' + (live ? '' : ' planned'); a.dataset.id = id;
        if (live) a.href = href;
        const vis = live && !href.startsWith('#') && seen.has(href.split('#')[0]);
        if (vis) a.classList.add('visited');
        a.innerHTML = `<span class="cm-k">${kind}</span><b>${name}</b><span class="cm-w">${why}</span>${live ? '' : '<span class="cm-s">not written yet</span>'}${vis ? '<span class="cm-s ok">you have read this</span>' : ''}${lever ? '<span class="cm-g" data-l="' + lever + '"></span>'  : ''}`;
        if (lever && !live) a.querySelector('.cm-g').dataset.dim = '1';
        c.appendChild(a); nodes[id] = a;
        const g = a.querySelector('.cm-g[data-l]'); if (g) gauges.push(g);
      });
    });
    el.appendChild(sec);
    const draw = () => {
      svg.innerHTML = '';
      const gr = grid.getBoundingClientRect();
      if (getComputedStyle(grid).flexDirection === 'column') return;
      svg.setAttribute('width', gr.width); svg.setAttribute('height', gr.height); svg.setAttribute('viewBox', `0 0 ${gr.width} ${gr.height}`);
      act.edges.forEach(([a, b]) => {
        const ra = nodes[a].getBoundingClientRect(), rb = nodes[b].getBoundingClientRect();
        const x1 = ra.right - gr.left, y1 = ra.top + ra.height / 2 - gr.top, x2 = rb.left - gr.left, y2 = rb.top + rb.height / 2 - gr.top, dx = Math.max(14, (x2 - x1) / 2);
        if (x2 <= x1) return;
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`);
        const planned = nodes[a].classList.contains('planned') || nodes[b].classList.contains('planned'); p.setAttribute('class', planned ? 'planned' : ''); svg.appendChild(p);
      });
    };
    draw(); requestAnimationFrame(draw); addEventListener('resize', draw); if (typeof ResizeObserver !== 'undefined') new ResizeObserver(draw).observe(grid); document.fonts && document.fonts.ready.then(draw);
  });
  const note = document.createElement('p'); note.className = 'cm-note'; note.innerHTML = 'Every card is a live page. A <b>green tint</b> means you have opened it in this browser. The <b>pips</b> show which way you have set that node’s slider on the meter: left leans <b>NO</b>, right leans <b>YES</b>. Short of time? <a href="essay.html">The short tour</a> walks the same ground in one sitting, outside the map.'; el.appendChild(note);
  subscribe(st => {
    const s = st.act1 || {};
    gauges.forEach(g => { const f = s[g.dataset.l]; if (f === undefined) { g.innerHTML = ''; return; } const k = Math.round(clamp(f) * (PIPS - 1)); g.innerHTML = '<i class="lo">NO</i>' + Array.from({ length: PIPS }, (_, i) => `<i class="pip${i === k ? ' on' : ''}"></i>`).join('') + '<i class="hi">YES</i>'; g.title = ['leans strongly NO', 'leans NO', 'in the middle', 'leans YES', 'leans strongly YES'][k]; g.setAttribute('aria-label', 'Your setting: ' + g.title); g.setAttribute('role', 'img'); });
  });
}
const clamp = v => Math.max(0, Math.min(1, v));
