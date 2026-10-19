// Controls: sliders, segmented buttons, buttons. All native elements -> keyboard + screen-reader friendly.
let uid = 0;

export function controls(container, cls = '') {
  const d = document.createElement('div');
  d.className = 'controls ' + cls;
  container.appendChild(d);
  return d;
}

export function slider(parent, o) {
  const id = 'sl' + (++uid);
  const wrap = document.createElement('div');
  wrap.className = 'ctl slider';
  if (o.color) wrap.style.setProperty('--c', o.color);
  if (o.wide) wrap.classList.add('wide');
  const lab = document.createElement('label');
  lab.htmlFor = id;
  const name = document.createElement('span');
  name.className = 'name';
  name.innerHTML = o.label;
  const out = document.createElement('output');
  out.htmlFor = id;
  lab.append(name, out);
  const inp = document.createElement('input');
  inp.type = 'range';
  inp.id = id;
  inp.min = o.min; inp.max = o.max; inp.step = o.step ?? 'any';
  inp.value = o.value;
  if (o.name) inp.dataset.name = o.name;
  const fmt = o.fmt || (v => String(v));
  const paint = () => {
    const v = +inp.value;
    out.innerHTML = fmt(v);
    inp.setAttribute('aria-valuetext', fmt(v));
    const p = (v - o.min) / (o.max - o.min) * 100;
    inp.style.setProperty('--p', p + '%');
  };
  inp.addEventListener('input', () => { paint(); o.oninput && o.oninput(+inp.value); });
  paint();
  wrap.append(lab, inp);
  parent.appendChild(wrap);
  return {
    el: inp,
    get value() { return +inp.value; },
    set(v, fire = false) { inp.value = v; paint(); if (fire && o.oninput) o.oninput(+inp.value); },
  };
}

export function segmented(parent, o) {
  const wrap = document.createElement('div');
  wrap.className = 'ctl segmented';
  if (o.color) wrap.style.setProperty('--c', o.color);
  if (o.label) {
    const l = document.createElement('span');
    l.className = 'seg-label';
    l.innerHTML = o.label;
    wrap.appendChild(l);
  }
  const group = document.createElement('div');
  group.className = 'seg-group';
  group.setAttribute('role', 'group');
  if (o.label) group.setAttribute('aria-label', o.label.replace(/<[^>]+>/g, ''));
  wrap.appendChild(group);
  let value = o.value;
  const btns = o.options.map(opt => {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = opt.label;
    if (opt.name) b.dataset.name = opt.name;
    b.addEventListener('click', () => { set(opt.value, true); });
    group.appendChild(b);
    return [b, opt.value];
  });
  function set(v, fire) {
    value = v;
    btns.forEach(([b, val]) => { b.setAttribute('aria-pressed', String(val === v)); });
    if (fire && o.onchange) o.onchange(v);
  }
  set(value, false);
  parent.appendChild(wrap);
  return { get value() { return value; }, set };
}

export function button(parent, label, onclick, o = {}) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'ctl btn ' + (o.kind || '');
  b.innerHTML = label;
  if (o.name) b.dataset.name = o.name;
  if (o.color) b.style.setProperty('--c', o.color);
  b.addEventListener('click', onclick);
  parent.appendChild(b);
  return b;
}

export function readout(parent, cls = '') {
  const d = document.createElement('div');
  d.className = 'readout ' + cls;
  d.setAttribute('aria-live', 'polite');
  parent.appendChild(d);
  return d;
}

// Short "try this" prompt shown above the caption; hidden after the first interaction with the figure's controls.
export function hint(el, html) {
  const p = document.createElement('p'); p.className = 'fig-hint'; p.innerHTML = '<b>Try this:</b> ' + html;
  { const ro = [...el.querySelectorAll('.readout')].pop(); if (ro) ro.after(p); else el.insertBefore(p, el.querySelector('figcaption') || null); }
  const hide = () => { p.classList.add('done'); }; // dim, never remove: the prompt stays readable
  el.addEventListener('input', hide, { once: true }); el.addEventListener('click', e => { if (e.target.closest('button')) hide(); }, { once: false });
  return p;
}

// Progressive disclosure: advanced controls live in a collapsed "More" row. Returns the inner container.
export function more(parent, label = 'More controls') {
  const d = document.createElement('details'); d.className = 'ctl more';
  const s = document.createElement('summary'); s.innerHTML = label;
  const inner = document.createElement('div'); inner.className = 'more-in';
  d.append(s, inner); parent.appendChild(d); return inner;
}
