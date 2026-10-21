// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, circle, line, axes, pathLine, measure, scale } from '../lib/draw.js';
import { controls, segmented } from '../lib/ui.js';
import { USE } from '../lib/cheaperdata.js';
import { ENERGY } from '../lib/energydata.js';

const AREAS = [
  { k: 'us', name: 'United States', short: 'US', col: '#3f6fb3' },
  { k: 'de', name: 'Germany', short: 'Germany', col: C.coal },
  { k: 'cn', name: 'China', short: 'China', col: C.peaker },
  { k: 'in', name: 'India', short: 'India', col: C.storage },
  { k: 'world', name: 'World', short: 'World', col: C.ink3, dash: [5, 4] },
];
const fmt = v => Math.round(v).toLocaleString('en-US');

// Electricity per person (or in total) in four countries and the world, 1985–2025 (OWID / Ember).
export function electricityUse(el) {
  const st = { mode: 'perCap' };
  const [Y0, Y1] = USE.years;
  const fig = new Fig(el, {
    label: 'Electricity generated per person in the United States, Germany, China, India and the world, 1985 to 2025',
    height: w => w < 600 ? 340 : 370,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const per = st.mode === 'perCap';
      const areas = per ? AREAS : AREAS.filter(a => a.k !== 'world');
      const key = per ? 'perCap' : 'gen';
      const ymax = per ? 15000 : 12000;
      const labW = narrow ? 104 : 168;
      const box = { l: narrow ? 46 : 58, r: w - labW, t: 30, b: h - 30 };
      const { sx, sy } = axes(ctx, {
        box, x0: Y0, x1: Y1, y0: 0, y1: ymax,
        yticks: per ? [0, 5000, 10000, 15000] : [0, 4000, 8000, 12000],
        yfmt: v => fmt(v), xticks: narrow ? [1985, 2005, 2025] : [1985, 1995, 2005, 2015, 2025],
        ylabel: per ? 'kWh per person per year' : 'TWh per year, whole country',
      });
      const ends = [];
      for (const a of areas) {
        const s = USE[a.k][key];
        pathLine(ctx, s.map((v, i) => [sx(Y0 + i), sy(v)]), a.col, a.k === 'world' ? 1.6 : 2.4, a.dash);
        const v1 = s[s.length - 1];
        circle(ctx, sx(Y1), sy(v1), 3.2, a.col);
        const g = v1 / s[0];
        const grow = g >= 1.95 ? '×' + (g >= 10 ? Math.round(g) : g.toFixed(1)) : (g >= 1 ? '+' : '−') + Math.round(Math.abs(g - 1) * 100) + '%';
        ends.push({ a, y: sy(v1), v1, grow });
      }
      // end labels, pushed apart so they never overlap
      ends.sort((p, q) => p.y - q.y);
      const gap = narrow ? 28 : 30;
      for (let i = 1; i < ends.length; i++) if (ends[i].y < ends[i - 1].y + gap) ends[i].y = ends[i - 1].y + gap;
      const over = ends.length ? ends[ends.length - 1].y - (box.b - 6) : 0;
      if (over > 0) ends.forEach(e => e.y -= over);
      for (let i = ends.length - 2; i >= 0; i--) if (ends[i].y > ends[i + 1].y - gap) ends[i].y = ends[i + 1].y - gap;
      const lx = box.r + 10;
      for (const e of ends) {
        text(ctx, narrow ? e.a.short : e.a.name, lx, e.y - 2, { size: 11.5, weight: 650, color: e.a.col === C.ink3 ? C.ink2 : e.a.col });
        const unit = per ? ' kWh' : ' TWh';
        text(ctx, `${fmt(e.v1)}${narrow ? '' : unit} · ${e.grow}`, lx, e.y + 12, { size: 10.5, color: C.ink3 });
      }
      text(ctx, `2025 · change since ${Y0}`, lx, box.t - 10, { size: 10.5, color: C.ink3, weight: 500 });
    },
  });
  const ctl = controls(el);
  segmented(ctl, {
    label: 'Show', value: st.mode, name: 'mode',
    options: [{ label: 'Per person', value: 'perCap', name: 'perCap' }, { label: 'Whole country', value: 'gen', name: 'gen' }],
    onchange: v => { st.mode = v; fig.invalidate(); },
  });
}

// A still of the century of US prices for the landing page; the full figure is historyChart (essay 1).
// Same anchors as historyChart in history.js (HSUS, EIA): real ¢/kWh in 2002 dollars, then nominal ¢/kWh.
const REAL2002 = [[1892, 515], [1970, 9.7]];
const NOMINAL = [[1902, 16.2], [1973, 2.45], [1974, 3.1], [1980, 5.4], [2016, 12.55], [2019, 13.01], [2021, 13.66], [2022, 15.04], [2023, 16.0], [2024, 16.48], [2025, 17.3]];
export function centuryTeaser(el) {
  new Fig(el, {
    label: 'US residential electricity prices since 1892 on a log scale: the real price falls steadily until about 1970, and nominal prices rise after 1973',
    height: w => w < 600 ? 250 : 270,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 40 : 52, r: w - 14, t: 26, b: h - 26 };
      const sx = scale(1885, 2027, box.l, box.r);
      const ly = Math.log10; const sy = scale(ly(1), ly(800), box.b, box.t);
      for (const v of [1, 10, 100]) { const y = Math.round(sy(ly(v))) + 0.5; line(ctx, box.l, y, box.r, y, v === 1 ? C.grid2 : C.grid, 1); text(ctx, v + '¢', box.l - 6, y + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      for (const yr of narrow ? [1900, 1950, 2000] : [1900, 1925, 1950, 1975, 2000, 2025]) text(ctx, yr, sx(yr), box.b + 15, { size: 10.5, color: C.ink3, align: 'center' });
      text(ctx, 'US household electricity, ¢ per kWh (log scale)', box.l, box.t - 12, { size: 11, color: C.ink3, weight: 500 });
      const [a, b] = REAL2002;
      pathLine(ctx, [[sx(a[0]), sy(ly(a[1]))], [sx(b[0]), sy(ly(b[1]))]], C.ink, 2.4);
      pathLine(ctx, [[sx(1970), sy(ly(9.7))], [sx(1973), sy(ly(9.7 / Math.pow(1.05, 3)))]], alpha(C.ink, 0.45), 1.5, [4, 4]);
      REAL2002.forEach(([y, v]) => circle(ctx, sx(y), sy(ly(v)), 4, C.ink));
      const ty = yr => sy(ly(a[1]) + (ly(b[1]) - ly(a[1])) * (yr - a[0]) / (b[0] - a[0])); // on the real line
      const yr = narrow ? 1912 : 1922;
      text(ctx, narrow ? 'real price, −5% a year' : 'real price (2002 $), falling about 5% a year', sx(yr), ty(yr) - 12, { size: 11, color: C.ink, weight: 600, halo: true });
      pathLine(ctx, NOMINAL.slice(4).map(([y, v]) => [sx(y), sy(ly(v))]), alpha(C.price, 0.6), 1.4, [3, 3]);
      pathLine(ctx, NOMINAL.slice(1, 4).map(([y, v]) => [sx(y), sy(ly(v))]), alpha(C.price, 0.6), 1.4, [3, 3]);
      NOMINAL.forEach(([y, v]) => circle(ctx, sx(y), sy(ly(v)), 3.2, '#fff', C.price, 2));
      text(ctx, 'nominal', sx(1902) + 8, sy(ly(16.2)) - 7, { size: 11, color: C.price, weight: 600, halo: true });
      text(ctx, '1973', sx(1973) - 6, sy(ly(2.45)) + 15, { size: 10.5, color: C.price, weight: 600, align: 'right', halo: true });
      text(ctx, '2025: 17.3¢', sx(2025), sy(ly(17.3)) - 9, { size: 10.5, color: C.price, weight: 600, align: 'right', halo: true });
    },
  });
}

// The Henry Adams curve: primary energy per person, 1965–2024 (OWID / Energy Institute), log scale, with the US
// 1965–73 growth rate carried forward as a dashed line.
export function henryAdams(el) {
  const [Y0, Y1] = ENERGY.years;
  const us = ENERGY.perCap.us, i73 = 1973 - Y0;
  const pace = Math.pow(us[i73] / us[0], 1 / (1973 - Y0)) - 1;
  new Fig(el, {
    label: 'Primary energy used per person in the United States, Germany, China, India and the world, 1965 to 2024, on a log scale. The US and Germany level off in the 1970s; China and India keep climbing.',
    height: w => w < 600 ? 360 : 380,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const labW = narrow ? 92 : 150;
      const box = { l: narrow ? 40 : 52, r: w - labW, t: 30, b: h - 30 };
      const sx = scale(Y0, Y1, box.l, box.r);
      const lg = Math.log10, sy = scale(lg(1), lg(200), box.b, box.t);
      const Y = v => sy(lg(v / 1000));
      for (const v of [1, 3, 10, 30, 100]) { const y = Math.round(sy(lg(v))) + 0.5; line(ctx, box.l, y, box.r, y, C.grid, 1); text(ctx, String(v), box.l - 6, y + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      for (const yr of narrow ? [1965, 1995, 2024] : [1965, 1975, 1985, 1995, 2005, 2015, 2024]) text(ctx, yr, sx(yr), box.b + 15, { size: 10.5, color: C.ink3, align: 'center' });
      text(ctx, 'MWh of primary energy per person per year (log scale)', box.l, box.t - 12, { size: 11, color: C.ink3, weight: 500 });
      // the old pace, carried on
      const ext = []; for (let y = 1973; y <= Y1; y++) ext.push([sx(y), Y(us[i73] * Math.pow(1 + pace, y - 1973))]);
      const yEnd = Y(us[i73] * Math.pow(1 + pace, Y1 - 1973));
      if (yEnd > box.t) { pathLine(ctx, ext, alpha(AREAS[0].col, 0.55), 1.5, [5, 4]); }
      else { const cut = ext.filter(p => p[1] >= box.t); pathLine(ctx, cut, alpha(AREAS[0].col, 0.55), 1.5, [5, 4]); }
      const ex = ext.find(p => p[1] < sy(lg(160))) || ext[ext.length - 1];
      text(ctx, narrow ? `1965–73 pace, ${(pace * 100).toFixed(1)}%/yr` : `US at its 1965–73 pace (${(pace * 100).toFixed(1)}% a year), carried on`, ex[0] - 6, Math.max(box.t + 12, ex[1]) , { size: 10.5, color: AREAS[0].col, align: 'right', halo: true });
      const ends = [];
      for (const a of AREAS) {
        const s = ENERGY.perCap[a.k];
        pathLine(ctx, s.map((v, i) => [sx(Y0 + i), Y(v)]), a.col, a.k === 'world' ? 1.6 : 2.4, a.dash);
        circle(ctx, sx(Y1), Y(s[s.length - 1]), 3.2, a.col);
        ends.push({ a, y: Y(s[s.length - 1]), v: s[s.length - 1] });
      }
      // the US peak
      const pk = us.indexOf(Math.max(...us)); circle(ctx, sx(Y0 + pk), Y(us[pk]), 3.5, '#fff', AREAS[0].col, 2);
      text(ctx, `peak, ${Y0 + pk}`, sx(Y0 + pk) + 6, Y(us[pk]) + 15, { size: 10.5, color: AREAS[0].col, weight: 600, halo: true });
      ends.sort((p, q) => p.y - q.y);
      const gap = narrow ? 26 : 28;
      for (let i = 1; i < ends.length; i++) if (ends[i].y < ends[i - 1].y + gap) ends[i].y = ends[i - 1].y + gap;
      const lx = box.r + 10;
      for (const e of ends) {
        text(ctx, narrow ? e.a.short : e.a.name, lx, e.y - 2, { size: 11.5, weight: 650, color: e.a.col === C.ink3 ? C.ink2 : e.a.col });
        text(ctx, `${Math.round(e.v / 1000)} MWh`, lx, e.y + 12, { size: 10.5, color: C.ink3 });
      }
    },
  });
}

export const FIGS = { electricityUse, centuryTeaser, henryAdams };
