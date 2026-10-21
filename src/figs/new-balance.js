// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
// ercotDay — a real day on the Texas grid: hourly generation by source against demand (US EIA Form 930 via PUDL). Data.
import { Fig } from '../lib/fig.js';
import { C, alpha, darken } from '../lib/colors.js';
import { text, measure, axes, line, circle, rrect, clamp, pathLine } from '../lib/draw.js';
import { controls, segmented, readout } from '../lib/ui.js';
import { ERCOT_DAYS } from '../lib/ercotdata.js';

// stacked cheapest-to-run first, as in the merit order; "other" (hydro, biomass, oil) is tiny and rides with imports on top
const BANDS = [
  { k: 'wind', lab: 'Wind', col: C.wind },
  { k: 'solar', lab: 'Solar', col: C.solar },
  { k: 'nuclear', lab: 'Nuclear', col: C.nuclear },
  { k: 'coal', lab: 'Coal', col: C.coal },
  { k: 'gas', lab: 'Gas', col: C.gas },
  { k: 'storage', lab: 'Batteries', col: C.storage },
  { k: 'rest', lab: 'Other', col: C.imports },
];
// the hour each day opens on: the moment the prose points at
const OPEN = { spring: 10, summer: 20, winter: 7 };
const hh = h => String(h).padStart(2, '0') + ':00';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = d => { const [y, m, dd] = d.date.split('-').map(Number); return `${d.weekday} ${dd} ${MONTHS[m - 1]} ${y}`; };

export function ercotDay(el) {
  const st = { day: 0, hour: OPEN[ERCOT_DAYS[0].key] };
  let geom = null;
  const D = () => ERCOT_DAYS[st.day];
  const val = (d, k, i) => k === 'rest' ? d.other[i] + d.imports[i] : d[k][i];
  const fig = new Fig(el, {
    label: 'A real day on the Texas grid: hourly generation by source stacked against demand, with battery charging below zero',
    height: w => w < 600 ? 500 : Math.max(380, Math.min(440, w * 0.46)),
    draw(ctx, w, h) {
      const d = D(), narrow = w < 600, N = 24;
      const box = { l: narrow ? 40 : 58, r: w - 14, t: 46, b: h - (narrow ? 112 : 34) };
      const yMax = 100, yMin = -15;
      const A = axes(ctx, { box, x0: 0, x1: 24, y0: yMin, y1: yMax, xticks: narrow ? [0, 6, 12, 18, 24] : [0, 3, 6, 9, 12, 15, 18, 21, 24], yticks: [0, 25, 50, 75, 100], xfmt: v => v + ':00', yfmt: v => v + (narrow ? '' : ' GW'), ylabel: narrow ? 'GW' : 'generation and demand, GW (average over each hour)' });
      geom = { box, A };
      // stacked bands, one step per hour
      let base = Array(N).fill(0); const bands = [];
      for (const b of BANDS) {
        const v = Array.from({ length: N }, (_, i) => val(d, b.k, i)); if (!v.some(x => x > 0.05)) continue;
        const cur = base.map((x, i) => x + v[i]);
        ctx.beginPath();
        for (let i = 0; i < N; i++) { ctx.lineTo(A.sx(i), A.sy(cur[i])); ctx.lineTo(A.sx(i + 1), A.sy(cur[i])); }
        for (let i = N - 1; i >= 0; i--) { ctx.lineTo(A.sx(i + 1), A.sy(base[i])); ctx.lineTo(A.sx(i), A.sy(base[i])); }
        ctx.closePath(); ctx.fillStyle = alpha(b.col, 0.85); ctx.fill();
        bands.push({ ...b, lo: base, hi: cur }); base = cur;
      }
      // battery charging below zero
      if (d.charge.some(x => x > 0.05)) {
        ctx.beginPath();
        for (let i = 0; i < N; i++) { ctx.lineTo(A.sx(i), A.sy(-d.charge[i])); ctx.lineTo(A.sx(i + 1), A.sy(-d.charge[i])); }
        ctx.lineTo(A.sx(N), A.sy(0)); ctx.lineTo(A.sx(0), A.sy(0)); ctx.closePath();
        ctx.fillStyle = alpha(C.storage, 0.35); ctx.fill();
      }
      line(ctx, box.l, A.sy(0), box.r, A.sy(0), alpha(C.ink, 0.35), 1);
      // demand, and demand minus wind and solar (the residual load the rest must follow)
      const mid = i => A.sx(i + 0.5);
      pathLine(ctx, d.demand.map((v, i) => [mid(i), A.sy(v)]), C.demand, 2.4);
      const rl = d.demand.map((v, i) => Math.max(0, v - d.wind[i] - d.solar[i]));
      pathLine(ctx, rl.map((v, i) => [mid(i), A.sy(v)]), alpha(C.ink, 0.55), 1.5, [5, 4]);
      // tooltip for the selected hour
      const i = st.hour, cx = mid(i);
      const vre = d.wind[i] + d.solar[i];
      const bat = d.storage[i] > 0.05 ? `batteries discharging ${d.storage[i].toFixed(1)} GW` : d.charge[i] > 0.05 ? `batteries charging ${d.charge[i].toFixed(1)} GW` : null;
      const lines = narrow
        ? [`${hh(i)}–${hh(i + 1)} · demand ${d.demand[i].toFixed(1)} GW`, `wind ${d.wind[i].toFixed(1)} · solar ${d.solar[i].toFixed(1)} GW (${Math.round(vre / d.demand[i] * 100)}% of demand)`, `gas ${d.gas[i].toFixed(1)} · coal ${d.coal[i].toFixed(1)} · nuclear ${d.nuclear[i].toFixed(1)} GW`, bat].filter(Boolean)
        : [`${hh(i)}–${hh(i + 1)}`, `demand ${d.demand[i].toFixed(1)} GW`, `wind ${d.wind[i].toFixed(1)} · solar ${d.solar[i].toFixed(1)} GW`, `wind + solar: ${Math.round(vre / d.demand[i] * 100)}% of demand`, `gas ${d.gas[i].toFixed(1)} · coal ${d.coal[i].toFixed(1)} · nuclear ${d.nuclear[i].toFixed(1)} GW`, bat].filter(Boolean);
      const bw = Math.max(...lines.map((s, k) => measure(ctx, s, 11, k ? 450 : 650))) + 20, bh = 12 + lines.length * 15;
      // phones: the readout box sits under the axis, full width; wider screens: beside the cursor
      const bx = narrow ? box.l - 30 : cx + 12 + bw > box.r ? cx - 12 - bw : cx + 12, by = narrow ? box.b + 26 : box.t + 2;
      const tip = narrow ? { x0: -1, x1: -1, y0: -1, y1: -1 } : { x0: bx - 2, x1: bx + bw + 2, y0: by - 2, y1: by + bh + 2 };
      const hits = (r, q) => !(r.x0 > q.x1 || r.x1 < q.x0 || r.y0 > q.y1 || r.y1 < q.y0);
      // direct labels inside each band where it is thickest, clear of the tooltip and the two lines
      const taken = [tip], fs = narrow ? 11 : 11.5, unl = [];
      for (const b of bands) {
        if (b.k === 'rest') continue; b.done = false;
        const s = b.lab, tw = measure(ctx, s, fs, 650), span = Math.max(1, Math.ceil((tw + 6) / (A.sx(1) - A.sx(0)) / 2));
        const cand = [];
        for (let j = span; j < N - span; j++) { let th = Infinity; for (let k = j - span; k <= j + span; k++) th = Math.min(th, A.sy(b.lo[k]) - A.sy(b.hi[k])); if (th >= fs + 3) cand.push([th, j]); }
        cand.sort((a, c) => c[0] - a[0]);
        for (const [, j] of cand) {
          const x = mid(j), y = (A.sy(b.lo[j]) + A.sy(b.hi[j])) / 2 + fs * 0.36, r = { x0: x - tw / 2 - 3, x1: x + tw / 2 + 3, y0: y - fs - 1, y1: y + 3 };
          if (r.x0 < box.l || r.x1 > box.r || taken.some(q => hits(r, q))) continue;
          let clash = false;
          for (let k = clamp(Math.floor(A.sx.inv(r.x0) - 0.5), 0, N - 1); k <= clamp(Math.ceil(A.sx.inv(r.x1) - 0.5), 0, N - 1); k++) { const y1 = A.sy(d.demand[k]), y2 = A.sy(rl[k]); if ((y1 > r.y0 - 2 && y1 < r.y1 + 2) || (y2 > r.y0 - 2 && y2 < r.y1 + 2)) clash = true; }
          if (clash) continue;
          text(ctx, s, x, y, { size: fs, weight: 650, color: darken(b.col, 0.62), align: 'center' }); taken.push(r); b.done = true; break;
        }
        if (!b.done) unl.push(b);
      }
      // bands too thin to name inside: a small key, top right
      { let x = box.r; for (const b of unl.reverse()) { const tw = measure(ctx, b.lab, 11, 600); x -= tw; text(ctx, b.lab, x, 14, { size: 11, weight: 600, color: darken(b.col, 0.35) }); ctx.fillStyle = b.col; ctx.fillRect(x - 13, 5, 9, 9); x -= 24; } }
      // line labels
      const lab = (s, x, y, o) => { const tw = measure(ctx, s, o.size, o.weight || 450), l = o.align === 'right' ? x - tw : o.align === 'center' ? x - tw / 2 : x, r = { x0: l - 2, x1: l + tw + 2, y0: y - o.size, y1: y + 3 }; if (taken.some(q => hits(r, q))) return false; text(ctx, s, x, y, o); taken.push(r); return true; };
      const dI = d.demand.indexOf(Math.max(...d.demand));
      const dx = A.sx(dI < 12 ? 22.5 : 3.5), dIdx = dI < 12 ? 22 : 3;
      lab('demand', dx, A.sy(Math.max(d.demand[dIdx], base[dIdx])) - 7, { size: 11.5, weight: 650, color: C.ink, align: 'center', halo: true });
      const rmin = rl.indexOf(Math.min(...rl));
      lab(narrow ? 'demand − wind & solar' : 'demand minus wind & solar', clamp(mid(rmin), box.l + 80, box.r - 80), Math.min(A.sy(rl[rmin]) + 16, A.sy(0) - 4), { size: 11, color: C.ink2, align: 'center', halo: true });
      if (d.charge.some(x => x > 0.5)) { const c = d.charge.indexOf(Math.max(...d.charge)); lab('batteries charging', clamp(mid(c), box.l + 60, box.r - 60), A.sy(-Math.max(...d.charge)) + 13, { size: 10.5, color: darken(C.storage, 0.3), align: 'center', weight: 600 }); }
      // cursor and tooltip
      line(ctx, cx, box.t - 6, cx, box.b, alpha(C.ink, 0.55), 1);
      circle(ctx, cx, A.sy(d.demand[i]), 4.5, C.demand, '#fff', 2);
      rrect(ctx, bx, by, bw, bh, 8); ctx.fillStyle = alpha('#ffffff', 0.94); ctx.fill(); ctx.strokeStyle = C.grid2; ctx.stroke();
      lines.forEach((s, k) => text(ctx, s, bx + 9, by + 17 + k * 15, { size: 11, color: k ? C.ink2 : C.ink, weight: k ? 450 : 650 }));
      text(ctx, narrow ? `ERCOT, ${longDate(d).replace(/^\w+ /, '')}` : `ERCOT, ${longDate(d)}, Central time`, box.l - (narrow ? 34 : 0), 14, { size: 11.5, weight: 650, color: C.ink });
    },
  });
  const setHour = x => { const v = clamp(Math.floor(geom.A.sx.inv(x)), 0, 23); if (v !== st.hour) { st.hour = v; fig.invalidate(); } };
  fig.interact({
    hit: (x, y) => geom && x > geom.box.l && x < geom.box.r ? 'cursor' : null,
    touchHit: (x) => geom && Math.abs(x - geom.A.sx(st.hour + 0.5)) < 24 ? 'cursor' : null,
    cursor: 'ew-resize',
    down: (o, x) => setHour(x),
    move: (o, x) => setHour(x),
  });
  const ctl = controls(el), ro = readout(el);
  const pct = (a, b) => Math.round(a / b * 100);
  function upd() {
    const d = D(), sum = k => d[k].reduce((a, v) => a + v, 0), dem = sum('demand');
    const pk = d.demand.indexOf(Math.max(...d.demand)), vre = d.wind.map((v, i) => v + d.solar[i]), j = vre.reduce((b, v, i) => v / d.demand[i] > vre[b] / d.demand[b] ? i : b, 0);
    const bm = Math.max(...d.storage), bi = d.storage.indexOf(bm);
    if (d.key === 'spring') ro.innerHTML = `Wind and solar supplied <b>${pct(sum('wind') + sum('solar'), dem)}%</b> of the day’s demand, and <b>${pct(vre[j], d.demand[j])}%</b> at ${hh(j)}. Gas never fell below <b>${Math.min(...d.gas).toFixed(1)} GW</b>; as the sun set it more than doubled, with batteries adding up to ${bm.toFixed(1)} GW.`;
    else if (d.key === 'summer') ro.innerHTML = `Demand peaked at <b>${d.demand[pk].toFixed(1)} GW</b> at ${hh(pk)}, the highest hour from January 2024 to September 2026. Gas supplied <b>${pct(sum('gas'), dem)}%</b> of the day; after sunset, batteries charged in the morning discharged up to <b>${bm.toFixed(1)} GW</b> at ${hh(bi)}.`;
    else ro.innerHTML = `Demand peaked at <b>${d.demand[pk].toFixed(1)} GW</b> at ${hh(pk)}, before sunrise. Wind and solar supplied <b>${pct(sum('wind') + sum('solar'), dem)}%</b> of the day and gas <b>${pct(sum('gas'), dem)}%</b>: on a cold morning before sunrise, gas carries the peak.`;
    fig.invalidate();
  }
  segmented(ctl, { label: 'Day', options: ERCOT_DAYS.map((d, k) => ({ label: d.label, value: k, name: 'ercot-' + d.key })), value: st.day, onchange: v => { st.day = v; st.hour = OPEN[D().key]; upd(); } });
  upd();
  el.__sim = { st, upd };
}

export const FIGS = { ercotDay };
