// World generation mix, Ember yearly electricity data (see lib/worlddata.js).
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, measure, line, clamp, scale, niceTicks, pathLine } from '../lib/draw.js';
import { controls, segmented, readout } from '../lib/ui.js';
import { WORLD } from '../lib/worlddata.js';

const COLOR = {
  coal: C.coal,
  gas: C.gas,
  otherFossil: C.oil,
  nuclear: C.nuclear,
  hydro: C.hydro,
  bioenergy: C.biomass,
  otherRenewables: C.storage,
  wind: C.wind,
  solar: C.solar,
};

const SLUG = {
  world: 'world', china: 'china', us: 'us', eu: 'eu', india: 'india',
  me: 'middleeast', africa: 'africa', lac: 'latam', asean: 'asean',
  japan: 'japan', korea: 'korea', australia: 'australia', brazil: 'brazil', germany: 'germany',
};

const Y0 = 2015;
const i2015 = WORLD.years.indexOf(Y0);
const iLast = WORLD.years.length - 1;
const LATEST = WORLD.years[iLast];
const BARS = WORLD.regions.filter(r => r.id !== 'world');

function region(id) { return WORLD.regions.find(r => r.id === id); }

// The series' four countries, for the small-multiples view.
const FOUR = ['us', 'germany', 'china', 'india'];
function fossil(g, i) { return g.coal[i] + g.gas[i] + g.otherFossil[i]; }
function fourLayout(w) { return w < 600 ? { cols: 1, rows: 4, ph: 150 } : { cols: 2, rows: 2, ph: 196 }; }

function niceCeil(v, parts = 4) {
  if (!(v > 0)) return 1;
  const step0 = v / parts;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const err = step0 / mag;
  const step = (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1) * mag;
  return Math.ceil((v - 1e-9) / step) * step;
}

function niceStep(span, parts) {
  const step0 = Math.max(span, 1) / parts;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const err = step0 / mag;
  return (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1) * mag;
}

function legendRowsFor(w) {
  if (w < 330) return 3;
  if (w < 980) return 2;
  return 1;
}

function chrome(w) {
  const leg = legendRowsFor(w);
  return { top: 26, bottom: 48 + (leg - 1) * 16 };
}

function twh(v) {
  const n = Math.round(v);
  const sign = n < 0 ? '−' : '';
  return sign + Math.abs(n).toLocaleString('en-US');
}

function twhSigned(v) {
  const n = Math.round(v);
  if (n > 0) return '+' + n.toLocaleString('en-US');
  if (n < 0) return '−' + Math.abs(n).toLocaleString('en-US');
  return '0';
}

function pct(part, whole) {
  if (!whole) return '0%';
  const x = Math.round((100 * part / whole) * 10) / 10;
  return x.toFixed(1) + '%';
}

function delta(id) {
  const g = WORLD.gen[id];
  const d = { total: g.total[iLast] - g.total[i2015] };
  for (const s of WORLD.sources) d[s.id] = g[s.id][iLast] - g[s.id][i2015];
  return d;
}

function axisName(r, w) {
  if (w >= 520) return r.short;
  if (r.id === 'us') return 'US';
  if (r.id === 'lac') return 'Lat. America';
  if (r.id === 'korea') return 'S. Korea';
  if (r.id === 'me') return 'M. East';
  return r.short;
}

function drawLegend(ctx, x, y, maxRight) {
  const size = 11;
  let cx = x, cy = y;
  for (const s of WORLD.sources) {
    const label = s.short;
    const tw = 14 + measure(ctx, label, size);
    if (cx > x && cx + tw > maxRight) { cx = x; cy += 16; }
    ctx.fillStyle = COLOR[s.id];
    ctx.fillRect(cx, cy - 5, 10, 10);
    text(ctx, label, cx + 14, cy, { size, baseline: 'middle', color: C.ink2, noclamp: true });
    cx += tw + 12;
  }
}

function fitLabels(items, cw) {
  // Drop labels whose boxes would overlap one already kept, or leave the canvas.
  // An item with keep:true (the zero line) is always kept.
  const placed = [];
  const overlap = (a, b) => Math.abs(a.x - b.x) < (a.w + b.w) / 2 + 6;
  const zero = items.find(it => it.keep);
  if (zero) placed.push(zero);
  for (const it of items) {
    if (it.keep) continue;
    if (placed.some(p => overlap(p, it))) continue;
    if (it.x - it.w / 2 < 1 || it.x + it.w / 2 > cw - 1) continue;
    placed.push(it);
  }
  return placed;
}

export function worldMix(el) {
  const st = { view: 'mix', region: 'world', hoverYear: null, hoverId: null };
  let geo = null;

  const describe = () => {
    if (st.view === 'growth') {
      const id = st.hoverId || (st.region !== 'world' ? st.region : null);
      if (!id) {
        const d = WORLD.gen.world.total[iLast] - WORLD.gen.world.total[i2015];
        return `<b>World</b>, ${Y0} to ${LATEST}: generation <b>${twhSigned(d)} TWh</b>. The bars are regions, drawn on one scale. They overlap, so they are not slices of this total.`;
      }
      const r = region(id);
      const d = delta(id);
      const parts = WORLD.sources.filter(s => Math.abs(d[s.id]) >= 0.5).map(s => `${s.label} ${twhSigned(d[s.id])}`);
      return `<b>${r.name}</b>, ${Y0} to ${LATEST}: generation <b>${twhSigned(d.total)} TWh</b>. ${parts.join(', ')}.`;
    }
    if (st.view === 'four' && !st.hoverId) {
      return FOUR.map(id => { const g = WORLD.gen[id]; return `<b>${region(id).short}</b> ${twh(g.total[iLast])} TWh, ${pct(fossil(g, iLast), g.total[iLast])} fossil`; }).join('; ') + ` (${LATEST}).`;
    }
    const r = region(st.view === 'four' ? st.hoverId : st.region);
    const i = st.hoverYear == null ? iLast : st.hoverYear;
    const g = WORLD.gen[r.id];
    const total = g.total[i];
    const parts = WORLD.sources.filter(s => Math.abs(g[s.id][i]) >= 0.5).map(s => `${s.label} ${twh(g[s.id][i])} (${pct(g[s.id][i], total)})`);
    let html = `<b>${r.name}</b>, ${WORLD.years[i]}: <b>${twh(total)} TWh</b>. ${parts.join(', ')}.`;
    if (Math.abs(g.demand[i] - total) >= 1) html += ` Demand ${twh(g.demand[i])} TWh.`;
    return html;
  };

  const fig = new Fig(el, {
    label: 'Electricity generation by source, 2000 to 2025, for the world and for selected regions. A second view shows the change from 2015 to 2025 by region, split by source.',
    height(w) {
      const { top, bottom } = chrome(w);
      if (st.view === 'growth') return top + BARS.length * (w < 600 ? 24 : 28) + bottom + 4;
      if (st.view === 'four') return top + fourLayout(w).rows * fourLayout(w).ph + bottom - 8;
      return top + (w < 600 ? 248 : 292) + bottom + 4;
    },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const { top, bottom } = chrome(w);
      if (st.view === 'growth') drawGrowth(ctx, w, h, top, bottom, narrow);
      else if (st.view === 'four') drawFour(ctx, w, h, top, bottom, narrow);
      else drawMix(ctx, w, h, top, bottom, narrow);
    },
  });

  function drawMix(ctx, w, h, top, bottom, narrow) {
    const g = WORLD.gen[st.region];
    const yMax = niceCeil(Math.max(...g.total) * 1.04);
    const yTicks = niceTicks(0, yMax, narrow ? 3 : 4).filter(v => v >= 0 && v <= yMax + 1e-6);
    const fullLabs = yTicks.map(v => Math.round(v).toLocaleString('en-US'));
    const fullW = Math.max(0, ...fullLabs.map(s => measure(ctx, s, 11)));
    const yLabels = (narrow || fullW > 58)
      ? yTicks.map(v => (v >= 1000 ? (v / 1000) + 'k' : String(Math.round(v))))
      : fullLabs;
    const lw = Math.max(0, ...yLabels.map(s => measure(ctx, s, 11)));
    const box = { l: Math.ceil(lw) + 12, r: w - 12, t: top, b: h - bottom };
    // Inset so the first and last year labels, drawn centred on the end years, stay inside the canvas.
    const sx = scale(WORLD.years[0], LATEST, box.l + 16, box.r - 16);
    const sy = scale(0, yMax, box.b, box.t);
    yTicks.forEach((v, k) => {
      const y = Math.round(sy(v)) + 0.5;
      text(ctx, yLabels[k], box.l - 6, y + 4, { size: 11, align: 'right', color: C.ink3, noclamp: true });
    });
    const xt = narrow ? [2000, 2010, 2020] : [2000, 2005, 2010, 2015, 2020, 2025];
    const xItems = xt.map(yr => ({ s: String(yr), x: sx(yr), w: measure(ctx, String(yr), 11), keep: false }));
    for (const it of fitLabels(xItems, w)) {
      text(ctx, it.s, it.x, box.b + 15, { size: 11, align: 'center', color: C.ink3, noclamp: true });
    }
    const title = narrow ? 'TWh' : 'Generation, TWh';
    text(ctx, title, box.r, 14, { size: 11, align: 'right', color: C.ink3, weight: 500, noclamp: true });

    ctx.save();
    ctx.beginPath();
    ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t);
    ctx.clip();
    let lower = g.total.map(() => 0);
    const xs = WORLD.years.map(yr => sx(yr));
    for (const s of WORLD.sources) {
      const upper = g[s.id].map((v, i) => lower[i] + Math.max(0, v));
      ctx.beginPath();
      upper.forEach((v, i) => (i ? ctx.lineTo(xs[i], sy(v)) : ctx.moveTo(xs[i], sy(v))));
      for (let i = xs.length - 1; i >= 0; i--) ctx.lineTo(xs[i], sy(lower[i]));
      ctx.closePath();
      ctx.fillStyle = COLOR[s.id];
      ctx.fill();
      lower = upper;
    }
    for (const v of yTicks) {
      if (v === 0) continue;
      const y = Math.round(sy(v)) + 0.5;
      line(ctx, box.l, y, box.r, y, 'rgba(255,255,255,0.42)', 1);
    }
    if (st.hoverYear != null) {
      const x = sx(WORLD.years[st.hoverYear]);
      line(ctx, x, box.t, x, box.b, alpha(C.ink, 0.55), 1.25);
    }
    ctx.restore();
    line(ctx, box.l, box.b + 0.5, box.r, box.b + 0.5, C.grid2, 1);
    drawLegend(ctx, box.l, box.b + 34, box.r);
    geo = { view: 'mix', box, sx };
  }

  function drawGrowth(ctx, w, h, top, bottom, narrow) {
    let neg = 0, pos = 0;
    const deltas = BARS.map(r => {
      const d = delta(r.id);
      let n = 0, p = 0;
      for (const s of WORLD.sources) { if (d[s.id] >= 0) p += d[s.id]; else n += d[s.id]; }
      neg = Math.min(neg, n);
      pos = Math.max(pos, p);
      return d;
    });
    const step = niceStep(pos - neg, narrow ? 3 : 5);
    const x0 = Math.min(0, Math.floor((neg * 1.06) / step) * step);
    const x1 = Math.max(step, Math.ceil((pos * 1.04) / step) * step);
    const rowH = (h - top - bottom) / BARS.length;
    const nameSize = narrow ? 11 : 12;
    let nameW = 0;
    const names = BARS.map(r => {
      const s = axisName(r, w);
      nameW = Math.max(nameW, measure(ctx, s, nameSize, 650));
      return s;
    });
    const netSize = 11;
    let netW = 0;
    const nets = deltas.map(d => {
      const s = twhSigned(d.total);
      netW = Math.max(netW, measure(ctx, s, netSize, 600));
      return s;
    });
    const showNet = w > 380;
    const box = {
      l: Math.ceil(nameW) + 14,
      r: w - (showNet ? Math.ceil(netW) + 14 : 10),
      t: top,
      b: h - bottom,
    };
    const sx = scale(x0, x1, box.l, box.r);
    const ticks = [];
    for (let v = x0; v <= x1 + step * 0.01; v += step) ticks.push(Math.round(v));
    const yBase = box.b + 15;
    const items = ticks.map(v => {
      const s = (v < 0 ? '−' : '') + Math.abs(v).toLocaleString('en-US');
      return { v, s, x: sx(v), w: measure(ctx, s, 11), keep: v === 0 };
    });
    for (const it of fitLabels(items, w)) {
      text(ctx, it.s, it.x, yBase, { size: 11, align: 'center', color: C.ink3, noclamp: true });
    }
    const title = narrow ? 'Change, TWh' : `Change from ${Y0} to ${LATEST}, TWh`;
    const titleW = measure(ctx, title, 11, 500);
    if (box.r - titleW > box.l + 8) text(ctx, title, box.r, 14, { size: 11, align: 'right', color: C.ink3, weight: 500, noclamp: true });
    else text(ctx, 'TWh', box.r, 14, { size: 11, align: 'right', color: C.ink3, weight: 500, noclamp: true });

    const hitRows = [];
    BARS.forEach((r, i) => {
      const y = box.t + i * rowH;
      const mid = y + rowH / 2;
      const hot = st.hoverId === r.id || (!st.hoverId && st.region === r.id);
      if (hot) {
        ctx.fillStyle = alpha(C.ink, 0.05);
        ctx.fillRect(0, y + 1, w, rowH - 2);
      }
      text(ctx, names[i], box.l - 8, mid, { size: nameSize, align: 'right', baseline: 'middle', color: hot ? C.ink : C.ink2, weight: hot ? 650 : 450, noclamp: true });
      const d = deltas[i];
      const bh = Math.max(8, Math.min(16, rowH - 8));
      const by = mid - bh / 2;
      let p = 0, n = 0;
      for (const s of WORLD.sources) {
        const v = d[s.id];
        if (v > 0.05) {
          const xA = sx(p), xB = sx(p + v);
          ctx.fillStyle = COLOR[s.id];
          ctx.fillRect(xA, by, Math.max(0.7, xB - xA), bh);
          p += v;
        } else if (v < -0.05) {
          const xA = sx(n + v), xB = sx(n);
          ctx.fillStyle = COLOR[s.id];
          ctx.fillRect(xA, by, Math.max(0.7, xB - xA), bh);
          n += v;
        }
      }
      if (showNet) text(ctx, nets[i], box.r + 6, mid, { size: netSize, baseline: 'middle', color: C.ink2, weight: 600, noclamp: true });
      hitRows.push({ id: r.id, y0: y, y1: y + rowH });
    });
    const zx = sx(0);
    line(ctx, zx, box.t, zx, box.b, C.ink3, 1);
    drawLegend(ctx, 8, box.b + 34, w - 8);
    geo = { view: 'growth', box, rows: hitRows, sx };
  }

  // Four countries, each as shares of its own generation, so a 500 TWh grid and a 10,000 TWh grid read alike.
  function drawFour(ctx, w, h, top, bottom, narrow) {
    const L = fourLayout(w);
    const gap = narrow ? 0 : 28, colW = (w - 8 - gap * (L.cols - 1)) / L.cols;
    const panels = [];
    FOUR.forEach((id, n) => {
      const col = n % L.cols, row = Math.floor(n / L.cols);
      const x0 = 4 + col * (colW + gap), y0 = top + row * L.ph;
      const box = { l: x0 + 34, r: x0 + colW - 10, t: y0 + 22, b: y0 + L.ph - 34 };
      const g = WORLD.gen[id];
      const sx = scale(WORLD.years[0], LATEST, box.l, box.r), sy = scale(0, 100, box.b, box.t);
      const hot = st.hoverId === id;
      text(ctx, region(id).name, box.l, y0 + 12, { size: 12.5, weight: 650, color: C.ink, noclamp: true });
      text(ctx, `${twh(g.total[iLast])} TWh in ${LATEST}`, box.r, y0 + 12, { size: 11, color: C.ink3, align: 'right', noclamp: true });
      let lower = g.total.map(() => 0);
      const xs = WORLD.years.map(yr => sx(yr));
      for (const s of WORLD.sources) {
        const upper = g[s.id].map((v, i) => lower[i] + 100 * Math.max(0, v) / g.total[i]);
        ctx.beginPath();
        upper.forEach((v, i) => (i ? ctx.lineTo(xs[i], sy(Math.min(100, v))) : ctx.moveTo(xs[i], sy(Math.min(100, v)))));
        for (let i = xs.length - 1; i >= 0; i--) ctx.lineTo(xs[i], sy(Math.min(100, lower[i])));
        ctx.closePath(); ctx.fillStyle = COLOR[s.id]; ctx.fill();
        lower = upper;
      }
      // the fossil share, as a line on top of the stack
      pathLine(ctx, WORLD.years.map((yr, i) => [sx(yr), sy(100 * fossil(g, i) / g.total[i])]), '#fff', 1.6);
      for (const v of [0, 50, 100]) text(ctx, v + '%', box.l - 5, sy(v) + 4, { size: 11, align: 'right', color: C.ink3, noclamp: true });
      line(ctx, box.l, sy(50) + 0.5, box.r, sy(50) + 0.5, 'rgba(255,255,255,0.42)', 1);
      for (const yr of [WORLD.years[0], LATEST]) text(ctx, String(yr), sx(yr), box.b + 15, { size: 11, align: yr === LATEST ? 'right' : 'left', color: C.ink3, noclamp: true });
      if (hot && st.hoverYear != null) line(ctx, sx(WORLD.years[st.hoverYear]), box.t, sx(WORLD.years[st.hoverYear]), box.b, alpha(C.ink, 0.6), 1.25);
      panels.push({ id, box, sx });
    });
    drawLegend(ctx, 8, h - bottom + 34 - 18, w - 8);
    geo = { view: 'four', panels };
  }

  function pick(x, y) {
    if (!geo) return null;
    if (geo.view === 'four') {
      const p = geo.panels.find(p => x >= p.box.l && x <= p.box.r && y >= p.box.t && y <= p.box.b);
      if (!p) return null;
      const yr = clamp(Math.round(p.sx.inv(x)), WORLD.years[0], LATEST);
      return { kind: 'cell', id: p.id, i: WORLD.years.indexOf(yr) };
    }
    if (geo.view === 'mix') {
      if (x < geo.box.l || x > geo.box.r || y < geo.box.t || y > geo.box.b) return null;
      const yr = clamp(Math.round(geo.sx.inv(x)), WORLD.years[0], LATEST);
      return { kind: 'year', i: WORLD.years.indexOf(yr) };
    }
    const row = geo.rows.find(r => y >= r.y0 && y < r.y1);
    return row ? { kind: 'row', id: row.id } : null;
  }

  fig.interact({
    hit: pick,
    cursor: 'crosshair',
    hover(obj) { applyHover(obj); },
    down(_obj, x, y) { applyHover(pick(x, y)); },
    move(_obj, x, y) { applyHover(pick(x, y)); },
  });

  function applyHover(obj) {
    const year = obj && (obj.kind === 'year' || obj.kind === 'cell') ? obj.i : null;
    const id = obj && (obj.kind === 'row' || obj.kind === 'cell') ? obj.id : null;
    if (year === st.hoverYear && id === st.hoverId) return;
    st.hoverYear = year;
    st.hoverId = id;
    ro.innerHTML = describe();
  }

  const ctl = controls(el);
  const ro = readout(el);
  const sync = () => { if (regionCtl) regionCtl.style.display = st.view === 'four' ? 'none' : ''; ro.innerHTML = describe(); fig.resize(); fig.invalidate(); };
  let regionCtl = null;
  segmented(ctl, {
    label: 'Show',
    options: [
      { label: 'Mix over time', value: 'mix', name: 'wm-view-mix' },
      { label: 'Four countries', value: 'four', name: 'wm-view-four' },
      { label: 'Growth since 2015', value: 'growth', name: 'wm-view-growth' },
    ],
    value: st.view,
    onchange: v => { st.view = v; st.hoverYear = null; st.hoverId = null; sync(); },
  });
  segmented(ctl, {
    label: 'Region',
    options: WORLD.regions.map(r => ({ label: r.short, value: r.id, name: 'wm-' + SLUG[r.id] })),
    value: st.region,
    onchange: v => { st.region = v; sync(); },
  });
  regionCtl = ctl.lastElementChild;
  ro.innerHTML = describe();
}
