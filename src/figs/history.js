import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, measure, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout } from '../lib/ui.js';

// Anchors from the cheapness dossier (HSUS / Penn State / EIA AER 8.10 / EIA EPM 5.3)
const REAL2002 = [[1892, 515], [1970, 9.7]]; // ¢/kWh in 2002 dollars, residential
const NOMINAL = [[1902, 16.2], [1973, 2.45], [1974, 3.1], [1980, 5.4], [2016, 12.55], [2019, 13.01], [2021, 13.66], [2022, 15.04], [2023, 16.0], [2024, 16.48], [2025, 17.3]];
const LANES = [
  { id: 'physics', name: 'Physics', col: C.hot },
  { id: 'scale', name: 'Scale & demand', col: C.wind },
  { id: 'fuel', name: 'Fuel', col: C.gas },
  { id: 'inst', name: 'Institutions', col: C.nuclear },
];
const EVENTS = [
  { y: 1882, lane: 'scale', t: 'Pearl Street', d: 'Edison’s first central station in Manhattan: DC, a few hundred customers, a walkable service area.' },
  { y: 1925, lane: 'physics', t: '~315 °C steam', d: 'Typical US steam inlet temperatures in the 1920s were around 600 °F (≈315 °C). Hotter steam means a higher Carnot ceiling.' },
  { y: 1949, lane: 'scale', t: 'Demand +7¾%/yr', d: 'From 1949 to 1973 US electricity demand grew roughly 7¾% a year — doubling about every nine years — so every new plant could be bigger than the last.' },
  { y: 1962, lane: 'physics', t: '538–600 °C plateau', d: 'By the 1960s inlet temperatures reached ~1,000–1,100 °F (538–600 °C) and stalled: the steels of the day could not take more heat without creep and corrosion.' },
  { y: 1968, lane: 'scale', t: 'Units > 1,000 MW', d: 'Units pushed past ~1,000 MW ran into reliability, construction and maintenance problems; the economies of scale that had paid for decades of price cuts reversed (Hirsh’s “technological stasis”).' },
  { y: 1970, lane: 'inst', t: 'Clean Air Act', d: 'The 1970 Clean Air Act and its follow-ons required controls such as scrubbers — about 15% added to coal unit capital cost; with cooling towers about 20% (Joskow & Rose).' },
  { y: 1973, lane: 'fuel', t: 'Oil embargo', d: 'Oil was 16.9% of US generation in 1973 (314 of 1,861 TWh). Crude went from about $3 to $12 a barrel between Sept 1973 and Jan 1974, and fuel-adjustment clauses passed it straight through.' },
  { y: 1975, lane: 'inst', t: 'Nuclear schedules 7 → 12 yrs', d: 'Construction schedules for US reactors stretched from about 7 to 12 years; interest and escalation came to dominate costs. Why is contested — Cohen blames a regulatory ratchet, others legitimate safety learning; Lovering et al. show France and Korea fared better.' },
  { y: 1978, lane: 'inst', t: 'PURPA', d: 'PURPA (1978) obliged utilities to buy power from independent producers — the first crack in the vertically integrated monopoly.' },
  { y: 1978.6, lane: 'fuel', t: 'Fuel Use Act', d: 'The Powerplant and Industrial Fuel Use Act (1978) restricted new gas-fired power plants. It was repealed in 1987.' },
  { y: 1979, lane: 'inst', t: 'Three Mile Island', d: 'The 1979 accident hardened the political climate for nuclear construction.' },
  { y: 1987, lane: 'fuel', t: 'FUA repealed', d: 'Repeal of the Fuel Use Act re-opened gas for power generation; combined-cycle gas turbines arrived in the 1990s.' },
  { y: 1992, lane: 'inst', t: 'EPAct 1992', d: 'The Energy Policy Act opened wholesale competition; organised markets such as PJM grew from here.' },
  { y: 2008, lane: 'fuel', t: 'Shale gas', d: 'Shale gas pushed US gas prices down for a decade, and with them the marginal price of power.' },
  { y: 2010, lane: 'physics', t: 'Solar learning curve', d: 'Solar module and project costs fell steeply; world-average solar LCOE fell from about $408/MWh in 2010 to about $43/MWh in 2025 (IRENA via OWID).' },
  { y: 2022, lane: 'fuel', t: 'Gas crisis', d: 'Europe’s gas shock pushed German day-ahead prices to an August 2022 monthly average of €464/MWh.' },
];
export function historyChart(el) {
  const st = { year: 1973 };
  let geo = null;
  const fig = new Fig(el, {
    label: 'Electricity prices since 1890 on a log scale, with four lanes of events: physics, scale, fuel and institutions',
    height: w => w < 600 ? 570 : 540,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 40 : 56, r: w - 16, t: 28, b: narrow ? 230 : 250 };
      const sx = scale(1880, 2027, box.l, box.r);
      const ly = v => Math.log10(v); const sy = scale(ly(1), ly(800), box.b, box.t);
      // grid
      for (const v of [1, 2, 5, 10, 20, 50, 100, 200, 500]) { const y = Math.round(sy(ly(v))) + 0.5; line(ctx, box.l, y, box.r, y, v === 1 ? C.grid2 : C.grid, 1); text(ctx, v + '¢', box.l - 6, y + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      for (const yr of [1900, 1920, 1940, 1960, 1980, 2000, 2020]) text(ctx, yr, sx(yr), box.b + 15, { size: 10.5, color: C.ink3, align: 'center' });
      text(ctx, 'US residential electricity, ¢ per kWh (log scale)', box.l, box.t - 12, { size: 11, color: C.ink3, weight: 500 });
      // 1973 break
      ctx.fillStyle = alpha(C.peaker, 0.07); ctx.fillRect(sx(1970), box.t, sx(1982) - sx(1970), box.b - box.t);
      // real trend
      const [a, b] = REAL2002; pathLine(ctx, [[sx(a[0]), sy(ly(a[1]))], [sx(b[0]), sy(ly(b[1]))]], C.ink, 2.4);
      REAL2002.forEach(([y, v]) => circle(ctx, sx(y), sy(ly(v)), 4, C.ink));
      text(ctx, 'real price (2002 $), falling ~5% a year', sx(1928), sy(ly(515 / Math.pow(1.05, 36) * 1.8)), { size: 11, color: C.ink, weight: 600, halo: true });
      // the trend carried on to 1973 only: no real-price series after 1970 is in the project, so later years show nominal prices alone
      pathLine(ctx, [[sx(1970), sy(ly(9.7))], [sx(1973), sy(ly(9.7 / Math.pow(1.05, 3)))]], alpha(C.ink, 0.45), 1.5, [4, 4]);
      // nominal
      NOMINAL.forEach(([y, v], i) => { circle(ctx, sx(y), sy(ly(v)), 3.5, '#fff', C.price, 2); });
      pathLine(ctx, NOMINAL.slice(1, 4).map(([y, v]) => [sx(y), sy(ly(v))]), alpha(C.price, 0.6), 1.4, [3, 3]);
      pathLine(ctx, NOMINAL.slice(4).map(([y, v]) => [sx(y), sy(ly(v))]), alpha(C.price, 0.6), 1.4, [3, 3]);
      text(ctx, 'nominal', sx(1902) + 8, sy(ly(16.2)) - 6, { size: 11, color: C.price, weight: 600, halo: true });
      text(ctx, '1973: 2.5¢', sx(1973) - 6, sy(ly(2.45)) + 16, { size: 10.5, color: C.price, weight: 600, align: 'right', halo: true });
      text(ctx, '2025: 17.3¢', sx(2025), sy(ly(17.3)) - 9, { size: 10.5, color: C.price, weight: 600, align: 'right', halo: true });
      // lanes
      const lt = box.b + 34, lh = narrow ? 40 : 46;
      LANES.forEach((L, i) => {
        const y = lt + i * lh;
        ctx.fillStyle = alpha(L.col, 0.06); ctx.fillRect(box.l, y, box.r - box.l, lh - 6);
        text(ctx, L.name, box.l + 4, y + 12, { size: 10.5, weight: 650, color: darken(L.col, 0.2) });
      });
      const near = EVENTS.reduce((best, e) => Math.abs(e.y - st.year) < Math.abs(best.y - st.year) ? e : best);
      EVENTS.forEach(e => {
        const li = LANES.findIndex(L => L.id === e.lane); const y = lt + li * lh + (lh - 6) / 2 + 4; const x = sx(e.y);
        const on = e === near; circle(ctx, x, y, on ? 7 : 4.5, on ? LANES[li].col : '#fff', LANES[li].col, 2);
      });
      // cursor
      const cx = sx(st.year); line(ctx, cx, box.t, cx, lt + 4 * lh - 6, alpha(C.ink, 0.5), 1.5);
      tag(ctx, String(Math.round(st.year)), cx, box.t + 2, { align: 'center', size: 11 });
      // card
      const cy = lt + 4 * lh + 8; const cw = Math.min(w - 32, 640); const cxx = clamp(sx(near.y) - cw / 2, 16, w - 16 - cw);
      const words = near.d.split(' '); const lines = []; let cur = '';
      for (const wd of words) { const t = cur ? cur + ' ' + wd : wd; if (measure(ctx, t, 12) > cw - 24) { lines.push(cur); cur = wd; } else cur = t; }
      lines.push(cur);
      const chH = 30 + lines.length * 17;
      rrect(ctx, cxx, cy, cw, chH, 8); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = C.grid2; ctx.lineWidth = 1; ctx.stroke();
      const li = LANES.findIndex(L => L.id === near.lane);
      text(ctx, `${Math.floor(near.y)} · ${near.t}`, cxx + 12, cy + 19, { size: 12.5, weight: 700, color: darken(LANES[li].col, 0.25) });
      lines.forEach((s, i) => text(ctx, s, cxx + 12, cy + 38 + i * 17, { size: 12, color: C.ink2 }));
      geo = { sx, box, lt, lh };
    },
  });
  fig.interact({ hit: (x, y) => geo && x >= geo.box.l && x <= geo.box.r && y < geo.lt + 4 * geo.lh ? {} : null, cursor: 'ew-resize', down: (o, x) => setY(geo.sx.inv(x)), move: (o, x) => setY(geo.sx.inv(x)) });
  const setY = y => { st.year = clamp(y, 1880, 2026); sl.set(Math.round(st.year)); fig.invalidate(); };
  const ctl = controls(el);
  const sl = slider(ctl, { label: 'Year', min: 1880, max: 2026, step: 1, value: st.year, wide: true, color: C.ink, fmt: v => v, oninput: v => { st.year = v; fig.invalidate(); }, name: 'year' });
}

// ---------------------------------------------------------------- the cost-offset toy (illustrative)
export function offset(el) {
  const st = { engine: false, fuel: true, infl: true, env: true };
  const Y0 = 1950, Y1 = 1990;
  const model = (o) => {
    // illustrative: real cost index = fuel part + capital part (+ retrofit)
    const out = []; let fuelPer = 0.45, capPer = 0.55; // shares in 1950
    for (let y = Y0; y <= Y1; y += 0.25) {
      const learn = y < 1965 || o.engine ? 1 : 0;
      const dt = 0.25;
      fuelPer *= Math.exp(-(learn ? 0.015 : 0.002) * dt); // efficiency gains cut fuel per kWh
      capPer *= Math.exp(-(learn ? 0.03 : -0.005) * dt);  // scale economies cut capital per kWh (or reverse)
      let fuelPrice = 1, capPrice = 1, retro = 0;
      if (o.fuel && y >= 1973.7) fuelPrice = 1 + 1.3 * Math.min(1, (y - 1973.7) / 1.5) * (y > 1982 ? Math.max(0.35, 1 - (y - 1982) * 0.12) : 1);
      if (o.infl && y >= 1969) capPrice = 1 + 0.6 * Math.min(1, (y - 1969) / 12) * (y > 1984 ? Math.max(0.5, 1 - (y - 1984) * 0.08) : 1);
      if (o.env && y >= 1971) retro = 0.08 * Math.min(1, (y - 1971) / 8);
      out.push([y, fuelPer * fuelPrice + capPer * capPrice + retro, fuelPer * fuelPrice, capPer * capPrice, retro]);
    }
    return out;
  };
  const fig = new Fig(el, {
    label: 'Illustrative toy model: an electricity cost index as engines of cheapening switch off and shocks switch on',
    height: w => w < 600 ? 300 : 320,
    draw(ctx, w, h) {
      const box = { l: 46, r: w - 16, t: 26, b: h - 32 };
      const { sx, sy } = axes(ctx, { box, x0: Y0, x1: Y1, y0: 0, y1: 1.6, yticks: [0, 0.5, 1, 1.5], yfmt: v => v.toFixed(1), xticks: [1950, 1960, 1970, 1980, 1990], ylabel: 'real cost index (1950 = 1) — illustrative' });
      const ref = model({ engine: true, fuel: false, infl: false, env: false });
      pathLine(ctx, ref.map(r => [sx(r[0]), sy(r[1])]), alpha(C.ink, 0.25), 1.6, [4, 4]);
      text(ctx, 'if nothing had changed', box.r - 2, sy(ref[ref.length - 1][1]) + 15, { size: 10.5, color: C.ink3, align: 'right', halo: true }); // below the line's low right end, so the falling dash stays clear of it
      const m = model(st);
      // stacked components
      const layers = [[2, C.gas, 'fuel'], [3, C.network, 'capital'], [4, C.nuclear, 'retrofits']];
      let base = m.map(() => 0);
      for (const [k, col] of layers) {
        const cur = m.map((r, i) => base[i] + r[k]);
        ctx.beginPath(); m.forEach((r, i) => i ? ctx.lineTo(sx(r[0]), sy(cur[i])) : ctx.moveTo(sx(r[0]), sy(cur[i])));
        for (let i = m.length - 1; i >= 0; i--) ctx.lineTo(sx(m[i][0]), sy(base[i])); ctx.closePath(); ctx.fillStyle = alpha(col, 0.22); ctx.fill();
        base = cur;
      }
      pathLine(ctx, m.map(r => [sx(r[0]), sy(r[1])]), C.ink, 2.4);
      line(ctx, sx(1965), box.t, sx(1965), box.b, alpha(C.ink, 0.3), 1, [2, 3]); text(ctx, 'stasis begins', sx(1965) + 4, box.t + 10, { size: 10.5, color: C.ink3 });
      let lx = box.l + 8; for (const [, col, lab] of layers) { ctx.fillStyle = alpha(col, 0.5); ctx.fillRect(lx, box.b - 16, 10, 10); lx += 14; text(ctx, lab, lx, box.b - 7, { size: 10.5, color: C.ink2 }); lx += measure(ctx, lab, 10.5) + 12; }
    },
  });
  const ctl = controls(el, 'chips');
  const tog = (k, lab, col) => { const b = button(ctl, lab, () => { st[k] = !st[k]; b.setAttribute('aria-pressed', st[k]); fig.invalidate(); }, { kind: 'chip', color: col, name: k }); b.setAttribute('aria-pressed', st[k]); };
  tog('engine', 'Physics & scale: gains continue after 1965', C.storage);
  tog('fuel', 'Fuel: the 1973 oil shock', C.gas);
  tog('infl', 'Institutions: interest rates & build delays', C.network);
  tog('env', 'Institutions: pollution retrofits', C.nuclear);
}
