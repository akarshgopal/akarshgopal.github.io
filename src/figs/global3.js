// solarWorld / windWorld — solar or wind generation by region, 2010–2025 (Ember yearly electricity data) — real
import { Fig } from '../lib/fig.js';
import { C, alpha, darken } from '../lib/colors.js';
import { text, line, circle, axes, pathLine } from '../lib/draw.js';
import { controls, segmented, readout } from '../lib/ui.js';
import { WORLD } from '../lib/worlddata.js';

const REG = [['china', 'China', '#c0392b'], ['eu', 'EU', '#2e86c1'], ['us', 'US', '#1f3a5f'], ['india', 'India', '#d68910'], ['brazil', 'Brazil', '#17a589'], ['germany', 'Germany', '#7f8c8d'], ['australia', 'Australia', '#7d3c98'], ['me', 'Middle East', '#a0522d'], ['africa', 'Africa', '#6e5f4f']];
const Y0 = 2010;
function techWorld(el, tech) {
  const nm = tech === 'solar' ? 'Solar' : 'Wind', yrs = WORLD.years, i0 = yrs.indexOf(Y0), iL = yrs.indexOf(WORLD.latest);
  const val = (r, i, mode) => { const g = WORLD.gen[r]; const v = g[tech][i]; return mode === 'share' ? v / g.total[i] * 100 : v; };
  const st = { mode: 'twh', hover: null };
  const fig = new Fig(el, {
    label: `${nm} electricity generation by region, ${Y0} to ${WORLD.latest}, in terawatt-hours or as a share of each region’s generation`,
    height: w => w < 600 ? 360 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 44 : 60, r: w - (narrow ? 104 : 150), t: 26, b: h - 34 };
      const share = st.mode === 'share';
      const y1 = share ? (tech === 'solar' ? 25 : 35) : 1250;
      const { sx, sy } = axes(ctx, { box: A, x0: Y0, x1: WORLD.latest, y0: 0, y1, xticks: narrow ? [2010, 2015, 2020, 2025] : [2010, 2013, 2016, 2019, 2022, 2025], yticks: share ? (tech === 'solar' ? [0, 5, 10, 15, 20, 25] : [0, 10, 20, 30]) : [0, 250, 500, 750, 1000, 1250], xfmt: String, yfmt: v => share ? v + '%' : String(v), ylabel: share ? `${nm.toLowerCase()} share of generation` : `${nm.toLowerCase()} generation, TWh` });
      const labels = [];
      REG.forEach(([r, n, col]) => {
        const pts = []; for (let i = i0; i <= iL; i++) pts.push([sx(yrs[i]), sy(Math.min(y1, val(r, i, st.mode)))]);
        const hl = st.hover === r, dim = st.hover && !hl;
        pathLine(ctx, pts, dim ? alpha(col, 0.25) : col, hl ? 3 : 2);
        const v = val(r, iL, st.mode); circle(ctx, sx(WORLD.latest), sy(v), 3, col);
        labels.push({ n, r, col, y: sy(v), y0: sy(v), v });
      });
      labels.sort((a, b) => a.y - b.y); const gap = narrow ? 12 : 13;
      for (let i = 1; i < labels.length; i++) if (labels[i].y < labels[i - 1].y + gap) labels[i].y = labels[i - 1].y + gap;
      for (let i = labels.length - 1; i >= 0; i--) { const lim = A.b + 4 - (labels.length - 1 - i) * gap; if (labels[i].y > lim) labels[i].y = lim; if (i < labels.length - 1 && labels[i].y > labels[i + 1].y - gap) labels[i].y = labels[i + 1].y - gap; }
      labels.forEach(L => { line(ctx, A.r + 3, L.y0, A.r + 7, L.y - 4, alpha(L.col, 0.4), 1); text(ctx, `${L.n} ${share ? L.v.toFixed(0) + '%' : Math.round(L.v)}`, A.r + 9, L.y, { size: narrow ? 9.5 : 10.5, weight: st.hover === L.r ? 750 : 600, color: darken(L.col, 0.1) }); });
      st.lab = labels.map(L => ({ r: L.r, x: A.r + 9, y: L.y }));
    },
  });
  fig.interact({ hit: (x, y) => (st.lab || []).find(L => x >= L.x - 4 && Math.abs(y - (L.y - 4)) < 7) || null, hover: o => { const v = o ? o.r : null; if (v !== st.hover) { st.hover = v; upd(); } }, down: o => { st.hover = o ? o.r : null; upd(); }, cursor: o => o ? 'pointer' : null });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'TWh', value: 'twh', name: `${tech}w-twh` }, { label: 'Share of generation', value: 'share', name: `${tech}w-share` }], value: 'twh', onchange: v => { st.mode = v; upd(); } });
  function upd() {
    const w = WORLD.gen.world, wl = w[tech][iL], c = WORLD.gen.china[tech][iL];
    if (st.hover) { const r = REG.find(x => x[0] === st.hover); ro.innerHTML = `<b>${r[1]}</b>, ${WORLD.latest}: <b>${Math.round(val(r[0], iL, 'twh'))} TWh</b> of ${nm.toLowerCase()}, ${val(r[0], iL, 'share').toFixed(1)}% of its generation (${Y0}: ${Math.round(val(r[0], i0, 'twh'))} TWh).`; }
    else ro.innerHTML = `The world generated <b>${Math.round(wl).toLocaleString('en')} TWh</b> from ${nm.toLowerCase()} in ${WORLD.latest}, ${(wl / w.total[iL] * 100).toFixed(1)}% of all electricity, against ${Math.round(w[tech][i0])} TWh in ${Y0}. China alone produced <b>${Math.round(c / wl * 100)}%</b> of it.`;
    fig.invalidate();
  }
  upd();
}
export function solarWorld(el) { techWorld(el, 'solar'); }
export function windWorld(el) { techWorld(el, 'wind'); }
export const FIGS = { solarWorld, windWorld };


// irenaCosts — utility-scale solar PV total installed cost by region/country, 2015 and 2024 (IRENA RPGC 2024, Table 3.1) — real
const IRC = [['India', 1548, 525, 415, 831], ['China', 1623, 591, 438, 867], ['Brazil', 2498, 724, 503, 1152], ['Europe', 1759, 779, 524, 1312], ['Oceania', 2663, 944, 598, 1385], ['Eurasia', 3438, 1030, 671, 2861], ['Other South America', 3202, 1048, 596, 1634], ['United States', 3062, 1058, 771, 2308], ['Africa', 3437, 1093, 861, 1630], ['Other Asia', 2652, 1133, 502, 2585], ['Other North America', 2642, 1206, 807, 1689], ['Central America & Caribbean', 2612, 1375, 939, 2288]];
export function irenaCosts(el) {
  const st = { hover: null };
  const fig = new Fig(el, {
    label: 'Total installed cost of utility-scale solar plants by region and in the four largest markets, 2015 and 2024, with the 5th–95th percentile range of 2024 projects',
    height: w => IRC.length * (w < 600 ? 24 : 26) + 84,
    draw(ctx, w, h) {
      const narrow = w < 600, rh = narrow ? 24 : 26, L = narrow ? 112 : 170, R = w - 16, T = 40, sx = v => L + v / 3600 * (R - L);
      st.rh = rh;
      [0, 1000, 2000, 3000].forEach(v => { line(ctx, sx(v), T - 6, sx(v), T + rh * IRC.length, alpha(C.ink, 0.08), 1); text(ctx, '$' + v.toLocaleString('en'), sx(v), T + rh * IRC.length + 14, { size: 9.5, color: C.ink3, align: 'center' }); });
      text(ctx, '2024 US$ per kW, total installed cost', R, T + rh * IRC.length + 30, { size: 9.5, color: C.ink3, align: 'right' });
      text(ctx, '○ 2015', L, 16, { size: 10.5, color: C.ink3, weight: 600 }); text(ctx, '● 2024 (bar: 5th–95th percentile)', L + 56, 16, { size: 10.5, color: C.solar, weight: 700 });
      IRC.forEach(([n, a, b, lo, hi], i) => {
        const y = T + i * rh + rh / 2, hl = st.hover === i, country = ['India', 'China', 'Brazil', 'United States'].includes(n);
        text(ctx, n, L - 8, y + 4, { size: narrow ? 9.5 : 11, align: 'right', weight: country || hl ? 700 : 450, color: hl ? C.ink : C.ink2 });
        ctx.fillStyle = alpha(C.solar, hl ? 0.4 : 0.22); ctx.fillRect(sx(lo), y - 4, sx(hi) - sx(lo), 8);
        line(ctx, sx(b), y, sx(a), y, alpha(C.ink3, 0.6), 1.2, [3, 3]);
        circle(ctx, sx(a), y, 4, '#fff', C.ink3, 1.5); circle(ctx, sx(b), y, 5, C.solar, '#fff', 1.5);
      });
    },
  });
  fig.interact({ hit: (x, y) => { const i = Math.floor((y - 40) / (st.rh || 26)); return i >= 0 && i < IRC.length ? { i } : null; }, hover: o => { const v = o ? o.i : null; if (v !== st.hover) { st.hover = v; upd(); } }, down: o => { if (o) { st.hover = o.i; upd(); } }, cursor: o => o ? 'pointer' : null });
  const ro = readout(el);
  function upd() {
    if (st.hover != null) { const [n, a, b, lo, hi] = IRC[st.hover]; ro.innerHTML = `<b>${n}</b>: $${a.toLocaleString('en')}/kW in 2015, <b>$${b.toLocaleString('en')}/kW</b> in 2024 (${Math.round((1 - b / a) * 100)}% lower); most 2024 projects between $${lo.toLocaleString('en')} and $${hi.toLocaleString('en')}.`; }
    else ro.innerHTML = 'An Indian solar farm completed in 2024 cost about <b>$525 per kilowatt</b>, a Chinese one $591, an American one <b>$1,058</b> — twice as much for the same panels, which IRENA attributes to differences in local supply chains, permitting and labour costs.';
    fig.invalidate();
  }
  upd();
}
FIGS.irenaCosts = irenaCosts;
