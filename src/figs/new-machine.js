// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, line, circle, clamp, axes, pathLine } from '../lib/draw.js';
import { controls, slider, readout } from '../lib/ui.js';

// ---------------------------------------------------------------------------
// effCentury: how efficient steam plants became, against the Carnot limit for the steam they ran on.
// All values are approximate and come from published histories (see the essay's notes):
//  - US fleet: 1949 on from EIA heat rates for fossil-fuelled steam plants (Annual Energy Review, Table A6; coal
//    plants from the Electric Power Annual after 2000), as 3,412 / heat rate (higher heating value). Before 1949
//    from coal burned per kWh (Historical Statistics of the US) and Hirsh (1989); these early points are rougher.
//  - China fleet: coal burned per kWh supplied, China Electricity Council, as 122.9 gce / (g/kWh) (lower heating
//    value, which reads about two points higher than the US basis).
//  - Steam temperature of typical new large units: Yeh & Rubin (2007), Hirsh (1989).
// ---------------------------------------------------------------------------
const K = 273.15, TC = 30;                           // condenser at 30 °C throughout
const US = [[1900, 3.7], [1920, 8.7], [1925, 12.7], [1930, 16.2], [1940, 19.2], [1944, 20.2], [1949, 22.7], [1950, 24.3], [1955, 29.2], [1960, 31.7],
  [1965, 32.6], [1970, 32.5], [1975, 32.8], [1980, 32.8], [1985, 33.0], [1990, 32.8], [1995, 33.0], [2000, 33.4], [2010, 32.7], [2020, 32.6]];
const US_ROUGH = 1949;                               // points before this are from coal per kWh, not heat rates
const CN = [[2000, 31.4], [2005, 33.2], [2010, 36.9], [2015, 39.0], [2020, 40.2]];
const STEAM = [[1920, 315], [1925, 370], [1930, 425], [1940, 480], [1950, 540], [1955, 566], [1965, 566], [1970, 540], [2000, 540], [2005, 600], [2015, 620], [2025, 620]];
const BEST = [
  { y: 1960, e: 40, lab: ['Eddystone 1, 1960:', 'best US unit ≈40%'], short: ['Eddystone 1', '≈40%'] },
  { y: 2022, e: 49.4, lab: ['Pingshan II, 2022:', '49.4% (Chinese basis)'], short: ['Pingshan II', '49.4%'] },
];
const carnot = T => 100 * (1 - (TC + K) / (T + K));
const at = (arr, yr) => {
  if (yr <= arr[0][0]) return arr[0][1];
  for (let i = 1; i < arr.length; i++) if (yr <= arr[i][0]) { const [x0, y0] = arr[i - 1], [x1, y1] = arr[i]; return y0 + (y1 - y0) * (yr - x0) / (x1 - x0); }
  return arr[arr.length - 1][1];
};
const steamAt = yr => { // steps, not ramps: the temperature of the units being built that year
  let T = null; for (const [y, t] of STEAM) if (y <= yr) T = t; return T;
};

export function effCentury(el) {
  const st = { year: 1960 };
  const CN_COL = C.peaker;
  const fig = new Fig(el, {
    label: 'Efficiency of steam power plants from 1900 to 2020: the US fleet average rose from about 4 per cent to about 33 per cent by the 1960s and then stayed there, well below the Carnot limit for the steam temperatures of each era; China’s fleet rose to about 40 per cent by 2020.',
    height: w => w < 600 ? 360 : Math.max(330, Math.min(390, w * 0.38)),
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 36 : 46, r: w - (narrow ? 12 : 20), t: 26, b: h - 34 };
      const { sx, sy } = axes(ctx, { box, x0: 1900, x1: 2025, y0: 0, y1: 75, xticks: narrow ? [1900, 1950, 2000] : [1900, 1920, 1940, 1960, 1980, 2000, 2020], yticks: [0, 25, 50, 75], yfmt: v => v + '%', ylabel: 'share of fuel heat turned into electricity' });
      // Carnot limit for the steam of new units: stepped
      const cpts = [];
      for (let i = 0; i < STEAM.length; i++) {
        const [y, T] = STEAM[i], yNext = i + 1 < STEAM.length ? STEAM[i + 1][0] : 2025;
        cpts.push([sx(y), sy(carnot(T))], [sx(yNext), sy(carnot(T))]);
      }
      ctx.save(); ctx.beginPath(); cpts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
      ctx.lineTo(sx(2025), box.t); ctx.lineTo(sx(1920), box.t); ctx.closePath(); ctx.fillStyle = alpha(C.ink3, 0.08); ctx.fill(); ctx.restore();
      pathLine(ctx, cpts, C.ink2, 1.6, [5, 4]);
      text(ctx, 'ruled out by physics', sx(1921), box.t + 15, { size: 10.5, color: C.ink3, halo: true });
      text(ctx, narrow ? 'Carnot limit' : 'Carnot limit for the steam of new units', sx(1921), sy(carnot(315)) - 8, { size: 11, color: C.ink2, weight: 550, halo: true });
      text(ctx, narrow ? 'steel stops the climb' : 'steam temperature stops rising: the limit is the steel', sx(narrow ? 1966 : 1972), sy(carnot(540)) + 16, { size: 10.5, color: C.ink3, halo: true });
      // US fleet
      const rough = US.filter(([y]) => y <= US_ROUGH), firm = US.filter(([y]) => y >= US_ROUGH);
      pathLine(ctx, rough.map(([y, e]) => [sx(y), sy(e)]), C.coal, 2.2, [3, 3]);
      pathLine(ctx, firm.map(([y, e]) => [sx(y), sy(e)]), C.coal, 2.6);
      rough.forEach(([y, e]) => circle(ctx, sx(y), sy(e), 2.8, C.paper, C.coal, 1.5));
      text(ctx, narrow ? 'US fleet' : 'US fleet average', sx(1968), sy(33) + 17, { size: 11, color: C.coal, weight: 650, halo: true });
      // China fleet
      pathLine(ctx, CN.map(([y, e]) => [sx(y), sy(e)]), CN_COL, 2.6);
      text(ctx, narrow ? 'China' : 'China fleet', sx(2002), sy(31.4) + 17, { size: 11, color: CN_COL, weight: 650, halo: true });
      // best units
      for (const b of BEST) {
        const col = b.y > 2000 ? CN_COL : C.coal;
        circle(ctx, sx(b.y), sy(b.e), 4.5, col, '#fff', 1.5);
        (narrow ? b.short : b.lab).forEach((s, i) => text(ctx, s, sx(b.y) - 8, sy(b.e) - 18 + i * 12, { size: 10.5, color: col, align: 'right', halo: true }));
      }
      // the chosen year
      const x = sx(st.year);
      line(ctx, x, box.t, x, box.b, alpha(C.hot, 0.45), 1.2);
      const T = steamAt(st.year);
      if (T != null) circle(ctx, x, sy(carnot(T)), 4.5, '#fff', C.ink2, 2);
      if (st.year <= 2020) circle(ctx, x, sy(at(US, st.year)), 5, C.coal, '#fff', 1.5);
      if (st.year >= 2000 && st.year <= 2020) circle(ctx, x, sy(at(CN, st.year)), 5, CN_COL, '#fff', 1.5);
    },
  });
  const ctl = controls(el), ro = readout(el);
  const upd = () => {
    const y = st.year, T = steamAt(y), us = y <= 2020 ? at(US, y) : null, cn = y >= 2000 && y <= 2020 ? at(CN, y) : null;
    const parts = [];
    if (T != null) parts.push(`new units ran steam at about <b>${T} °C</b>, a Carnot limit of <b>${carnot(T).toFixed(0)}%</b>`);
    if (us != null) parts.push(`the average US plant turned <b>${us.toFixed(0)}%</b> of its fuel heat into electricity, burning <b>${(100 / us).toFixed(1)} kWh</b> of heat for each kWh`);
    if (cn != null) parts.push(`China’s fleet averaged <b>${cn.toFixed(0)}%</b>`);
    ro.innerHTML = `<b>${y}</b>: ${parts.join('; ')}.`;
    fig.invalidate();
  };
  slider(ctl, { label: 'Year', min: 1900, max: 2020, step: 1, value: st.year, color: C.hot, fmt: v => String(v), oninput: v => { st.year = v; upd(); }, name: 'year', wide: true });
  fig.interact({
    hit: (x, y) => (y > 20 ? 'chart' : null),
    touchHit: () => null,               // on a phone the page keeps scrolling; the slider sets the year
    cursor: 'crosshair',
    hover: (o, x) => { if (o) setFromX(x); },
    down: (o, x) => setFromX(x),
    move: (o, x) => setFromX(x),
  });
  function setFromX(x) {
    const w = fig.w, narrow = w < 600, l = narrow ? 36 : 46, r = w - (narrow ? 12 : 20);
    const y = clamp(Math.round(1900 + (x - l) / (r - l) * 125), 1900, 2020);
    if (y !== st.year) { st.year = y; ctl.querySelector('input').value = y; ctl.querySelector('input').dispatchEvent(new Event('input')); }
  }
  upd();
}

export const FIGS = { effCentury };
