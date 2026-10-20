import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, measure, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout } from '../lib/ui.js';
import { DATA } from '../lib/data.js';
import { USD_PER_EUR, currencyToggle } from '../lib/currency.js';
const fxY = (cur, y) => cur === 'USD' ? USD_PER_EUR[Math.min(2026, Math.max(2015, Math.floor(y)))] : 1;

// ---------------------------------------------------------------- markets in time (illustrative)
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
export function timeline(el) {
  // time axis in hours relative to midnight before delivery day: -14 (10:00 D-1) .. 19.5 ; delivery hour 18:00-19:00 on D
  const T0 = -14, TD = 18, T1 = 19.6;
  const st = { now: 9, seed: 7, playing: false };
  let path = null;
  const build = () => {
    const r = rng(st.seed);
    // actual wind output for the delivery hour (GW) and a forecast that converges as information arrives
    const truth = 9 + (r() - 0.5) * 10;
    const pts = []; let err = (r() - 0.5) * 7;
    for (let t = T0; t <= TD; t += 0.25) {
      const lead = TD - t; const sd = 0.35 + 0.17 * lead;
      err = err * 0.97 + (r() - 0.5) * 0.35;
      const fc = truth + err * Math.min(1, lead / 20 + 0.08);
      pts.push({ t, fc, sd });
    }
    path = { truth, pts };
  };
  build();
  const at = t => { const p = path.pts; const i = clamp(Math.round((t - T0) / 0.25), 0, p.length - 1); return p[i]; };
  const DA = -12, IDopen = -9, IDclose = TD - 5 / 60;
  const ledger = () => {
    const daPos = at(DA).fc;
    const idPos = st.now >= IDopen ? at(Math.min(st.now, IDclose)).fc - daPos : 0;
    const delivered = st.now >= TD + 1 ? path.truth : null;
    return { daPos, idPos, delivered, imb: delivered != null ? delivered - daPos - idPos : null };
  };
  const fig = new Fig(el, {
    label: 'Timeline from day-ahead auction to delivery, showing a wind forecast narrowing and the positions traded in each market',
    height: w => w < 600 ? 470 : 400, animated: true,
    step(dt) { if (st.playing) { st.now += dt * 2.2; if (st.now > T1) { st.now = T1; st.playing = false; playBtn.textContent = 'Play'; } nowSl.set(st.now); upd(); } },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: 46, r: w - 16, t: 26, b: narrow ? h - 190 : h - 150 };
      const { sx, sy } = axes(ctx, { box, x0: T0, x1: T1, y0: 0, y1: 20, xticks: [-12, -6, 0, 6, 12, 18], xfmt: v => v < 0 ? `${String(24 + v).padStart(2, '0')}:00${narrow && v === -6 ? '' : ' D−1'}` : `${String(v).padStart(2, '0')}:00`, yfmt: v => v, ylabel: 'forecast wind output for 18:00–19:00 on day D (GW)' });
      // phases
      const band = (a, b, col, lab) => { ctx.fillStyle = alpha(col, 0.09); ctx.fillRect(sx(a), box.t, sx(b) - sx(a), box.b - box.t); text(ctx, lab, sx(a) + 4, box.b - 6, { size: 10.5, color: darken(col, 0.2), weight: 600 }); };
      band(T0, DA, C.ink3, narrow ? '' : 'bids');
      band(IDopen, IDclose, C.wind, 'intraday trading');
      band(TD, TD + 1, C.peaker, narrow ? '' : 'delivery');
      line(ctx, sx(DA), box.t, sx(DA), box.b, C.ink2, 1.5, [4, 3]);
      tag(ctx, 'Day-ahead auction 12:00', sx(DA) + 4, box.t + 10, { size: 10.5, bg: C.ink2 });
      // fan
      const vis = path.pts.filter(p => p.t <= st.now);
      if (vis.length > 1) {
        ctx.beginPath();
        vis.forEach((p, i) => { const x = sx(p.t), y = sy(p.fc + 1.64 * p.sd); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
        [...vis].reverse().forEach(p => ctx.lineTo(sx(p.t), sy(Math.max(0, p.fc - 1.64 * p.sd))));
        ctx.closePath(); ctx.fillStyle = alpha(C.wind, 0.18); ctx.fill();
        pathLine(ctx, vis.map(p => [sx(p.t), sy(p.fc)]), C.wind, 2.2);
      }
      const cur = at(Math.min(st.now, TD));
      // forward cone (what you can't know yet)
      if (st.now < TD) {
        ctx.save(); ctx.setLineDash([3, 4]); ctx.strokeStyle = alpha(C.wind, 0.6); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sx(st.now), sy(cur.fc + 1.64 * cur.sd)); ctx.lineTo(sx(TD), sy(cur.fc + 1.64 * cur.sd)); ctx.moveTo(sx(st.now), sy(Math.max(0, cur.fc - 1.64 * cur.sd))); ctx.lineTo(sx(TD), sy(Math.max(0, cur.fc - 1.64 * cur.sd))); ctx.stroke(); ctx.restore();
      }
      if (st.now >= TD + 1) { circle(ctx, sx(TD + 0.5), sy(path.truth), 6, C.ink); text(ctx, `actual ${path.truth.toFixed(1)} GW`, sx(TD + 0.5) - 10, sy(path.truth) - 10, { size: 11, align: 'right', weight: 650, halo: true }); }
      // now line
      line(ctx, sx(st.now), box.t - 6, sx(st.now), box.b, C.ink, 2);
      circle(ctx, sx(st.now), sy(cur.fc), 4.5, C.wind, '#fff', 2);
      // ledger
      const L = ledger();
      const ly = box.b + 46; const lx = narrow ? 16 : 46; const lw = w - lx - 16;
      text(ctx, 'The portfolio’s book for that hour', lx, ly - 10, { size: 12, weight: 650 });
      const gs = scale(0, 20, lx + 110, lx + lw);
      const row = (i, lab, a, b, col, note) => {
        const y = ly + 6 + i * (narrow ? 40 : 26);
        text(ctx, lab, lx, y + 13, { size: 11.5, color: C.ink2 });
        if (a == null) { text(ctx, note || '—', lx + 110, y + 13, { size: 11, color: C.ink3 }); return; }
        const x0 = gs(Math.min(a, b)), x1 = gs(Math.max(a, b));
        rrect(ctx, x0, y + 2, Math.max(2, x1 - x0), 16, 4); ctx.fillStyle = col; ctx.fill();
        if (narrow) text(ctx, note, gs(0), y + 32, { size: 11, color: C.ink2 }); // on a phone the note goes under the bar, which can run to the edge
        else text(ctx, note, x1 + 6, y + 14, { size: 11, color: C.ink2 });
      };
      row(0, 'Day-ahead sold', st.now >= DA ? 0 : null, L.daPos, C.ink2, st.now >= DA ? `${L.daPos.toFixed(1)} GW at the auction price` : 'not yet — bids due by noon');
      const idv = L.idPos;
      row(1, 'Intraday', st.now >= IDopen ? L.daPos : null, L.daPos + idv, idv >= 0 ? C.wind : C.gas, st.now >= IDopen ? `${idv >= 0 ? 'sold +' : 'bought back '}${Math.abs(idv).toFixed(1)} GW as forecasts update` : 'opens 15:00 D−1');
      row(2, 'Imbalance', L.imb != null ? L.daPos + idv : null, L.delivered, C.peaker, L.imb != null ? `${L.imb >= 0 ? '+' : '−'}${Math.abs(L.imb).toFixed(1)} GW settled at the imbalance price` : 'whatever is left after gate closure');
    },
  });
  const ctl = controls(el);
  const playBtn = button(ctl, 'Play', () => { if (st.now >= T1) st.now = T0; st.playing = !st.playing; playBtn.textContent = st.playing ? 'Pause' : 'Play'; fig.invalidate(); }, { name: 'play' });
  button(ctl, 'Different weather', () => { st.seed = (st.seed * 7 + 13) % 997; build(); upd(); }, { kind: 'ghost', name: 'reroll' });
  const nowSl = slider(ctl, { label: 'Now', min: T0, max: T1, step: 0.05, value: st.now, wide: true, color: C.ink, fmt: v => { const d = v < 0 ? 'D−1' : 'D'; const hh = ((v % 24) + 24) % 24; return `${String(Math.floor(hh)).padStart(2, '0')}:${String(Math.floor((hh % 1) * 60)).padStart(2, '0')} ${d}`; }, oninput: v => { st.now = v; st.playing = false; playBtn.textContent = 'Play'; upd(); }, name: 'now' });
  const ro = readout(el);
  function upd() {
    const lead = TD - st.now;
    ro.innerHTML = st.now < DA ? `Bids for tomorrow are due at noon. The forecast for 18:00 tomorrow is still uncertain by about <b>±${(1.64 * at(st.now).sd).toFixed(1)} GW</b>.`
      : st.now < TD ? `${lead.toFixed(1)} hours to delivery. Forecast spread: <b>±${(1.64 * at(st.now).sd).toFixed(1)} GW</b>. Every update can be traded on the intraday market.`
        : st.now < TD + 1 ? 'Delivery. Trading has closed; the grid operator’s reserves cover any remaining mismatch.'
          : 'Settlement. The portfolio pays (or is paid) the imbalance price for whatever it got wrong.';
    fig.invalidate();
  }
  upd();
}

// ---------------------------------------------------------------- spot price history (real: Ember)
export function spot(el) {
  const st = { mode: 'monthly', hover: null, cur: 'USD' };
  let M, A;
  const conv = () => { M = DATA.emberMonthly.map(([ym, v]) => { const x = +ym.slice(0, 4) + (+ym.slice(5, 7) - 0.5) / 12; return [x, v * fxY(st.cur, x), ym]; }); A = DATA.emberAnnual.map(([y, v]) => [y, v * fxY(st.cur, y)]); };
  conv();
  const S$ = () => st.cur === 'USD' ? '$' : '€';
  let geo = null;
  const fig = new Fig(el, {
    label: 'German day-ahead wholesale electricity price, monthly averages 2015 to 2026 (Ember data)',
    height: w => w < 600 ? 320 : 360,
    draw(ctx, w, h) {
      const box = { l: 46, r: w - 14, t: 30, b: h - 34 };
      const { sx, sy } = axes(ctx, { box, x0: 2015, x1: 2026.75, y0: 0, y1: 520, yticks: [0, 100, 200, 300, 400, 500], xticks: [2015, 2017, 2019, 2021, 2023, 2025], ylabel: `${S$()}/MWh (day-ahead, Germany–Luxembourg${st.cur === 'USD' ? ', at each year’s ECB rate' : ''})` });
      geo = { sx, sy, box };
      // annotations
      ctx.fillStyle = alpha(C.gas, 0.09); ctx.fillRect(sx(2021.6), box.t, sx(2023.1) - sx(2021.6), box.b - box.t);
      text(ctx, 'gas crisis', sx(2021.65) + 3, box.b - 8, { size: 10.5, color: darken(C.gas, 0.2), weight: 600 });
      if (st.mode === 'monthly') {
        ctx.beginPath(); M.forEach(([x, v], i) => i ? ctx.lineTo(sx(x), sy(v)) : ctx.moveTo(sx(x), sy(v))); ctx.lineTo(sx(M.at(-1)[0]), sy(0)); ctx.lineTo(sx(M[0][0]), sy(0)); ctx.closePath(); ctx.fillStyle = alpha(C.price, 0.08); ctx.fill();
        pathLine(ctx, M.map(([x, v]) => [sx(x), sy(v)]), C.price, 2);
        const pk = M.reduce((a, b) => b[1] > a[1] ? b : a);
        circle(ctx, sx(pk[0]), sy(pk[1]), 4, C.price); text(ctx, `Aug 2022: ${S$()}${pk[1].toFixed(0)}`, sx(pk[0]) + 8, sy(pk[1]) + 4, { size: 11, weight: 650, halo: true });
      } else {
        A.forEach(([y, v]) => { const x0 = sx(y + 0.12), x1 = sx(y + 0.88); rrect(ctx, x0, sy(v), x1 - x0, sy(0) - sy(v), 3); ctx.fillStyle = y === 2026 ? alpha(C.price, 0.4) : C.price; ctx.fill(); text(ctx, v.toFixed(0), (x0 + x1) / 2, sy(v) - 5, { size: 10.5, align: 'center', color: C.ink2, weight: 600 }); });
        text(ctx, '2026: Jan–Sep only', sx(2026.5), sy(A.at(-1)[1]) - 20, { size: 10, align: 'center', color: C.ink3 });
      }
      if (st.hover) {
        const [x, v, lab] = st.hover; line(ctx, sx(x), box.t, sx(x), box.b, alpha(C.ink, 0.3), 1);
        circle(ctx, sx(x), sy(v), 4.5, '#fff', C.price, 2);
        tag(ctx, `${lab}: ${S$()}${v.toFixed(1)}/MWh`, clamp(sx(x), box.l + 70, box.r - 70), box.t + 6, { align: 'center', size: 11 });
      }
    },
  });
  fig.interact({
    hit: () => null,
    hover: (o, x) => {
      if (!geo || x < 0) { st.hover = null; return; }
      const xv = geo.sx.inv ? geo.sx.inv(x) : null; if (xv == null) return;
      if (st.mode === 'monthly') { let best = M[0]; for (const m of M) if (Math.abs(m[0] - xv) < Math.abs(best[0] - xv)) best = m; st.hover = best; }
      else { const y = Math.floor(xv); const a = A.find(r => r[0] === y); st.hover = a ? [y + 0.5, a[1], String(y)] : null; }
    },
  });
  const ctl = controls(el);
  segmented(ctl, { options: [{ label: 'Monthly', value: 'monthly' }, { label: 'Annual average', value: 'annual' }], value: st.mode, onchange: v => { st.mode = v; st.hover = null; fig.invalidate(); } });
  currencyToggle(ctl, v => { st.cur = v; conv(); st.hover = null; fig.invalidate(); }, 'sp', { caption: false, value: 'EUR' });
}

// ---------------------------------------------------------------- bill cascade (real: BDEW + Ember)
const TAX2026 = [['VAT (19%)', 5.91], ['Electricity tax', 2.05], ['Concession fee', 1.666], ['§19 grid surcharge', 1.559], ['Offshore grid levy', 0.941], ['CHP levy', 0.446]];
export function bill(el) {
  const st = { year: 2026, hover: -1, cur: 'USD' };
  let B; const conv = () => { B = DATA.bdew.map(([y, ...v]) => [y, ...v.map(x => x * fxY(st.cur, y))]); }; conv();
  const spotOf = y => (DATA.emberAnnual.find(r => r[0] === y) || [0, NaN])[1] / 10 * fxY(st.cur, y);
  const U = () => st.cur === 'USD' ? '¢/kWh' : 'ct/kWh';
  let geo = null;
  const fig = new Fig(el, {
    label: 'German household electricity price components 2015 to 2026 (BDEW), with the year-average wholesale price marked; a waterfall decomposes the selected year',
    height: w => w < 600 ? 660 : 420,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const left = narrow ? { l: 40, r: w - 12, t: 64, b: 300 } : { l: 44, r: w * 0.56, t: w < 900 ? 62 : 46, b: h - 34 };
      const { sx, sy } = axes(ctx, { box: left, x0: 2014.5, x1: 2026.5, y0: 0, y1: 55, yticks: [0, 10, 20, 30, 40, 50], xticks: narrow ? [2015, 2018, 2021, 2024, 2026] : [2015, 2017, 2019, 2021, 2023, 2025], ylabel: `${U()}, household (BDEW${st.cur === 'USD' ? ', at each year’s ECB rate' : ''})` });
      geo = { sx, left };
      B.forEach(([y, p, n, t, tot]) => {
        const bw = (sx(1) - sx(0)) * 0.7; const x = sx(y) - bw / 2; const sel = y === st.year; const a = sel ? 1 : 0.55;
        let base = 0;
        for (const [v, col] of [[p, C.procurement], [n, C.network], [t, C.taxes]]) { ctx.fillStyle = alpha(col, a); ctx.fillRect(x, sy(base + v), bw, sy(base) - sy(base + v) - 1); base += v; }
        if (sel) { ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.strokeRect(x - 1.5, sy(tot) - 1.5, bw + 3, sy(0) - sy(tot) + 3); }
        text(ctx, tot.toFixed(1), sx(y), sy(tot) - 5, { size: narrow ? 9 : 10.5, align: 'center', color: sel ? C.ink : C.ink3, weight: 600 });
        const s = spotOf(y); if (isFinite(s)) { line(ctx, x - 2, sy(s), x + bw + 2, sy(s), C.spot, 2.5); }
      });
      // legend
      let lx = left.l - 30, ly = 10;
      const LEG = [['Procurement & sales', C.procurement], ['Network', C.network], ['Taxes & levies', C.taxes], ['Wholesale year-avg', C.spot]];
      const legWrap = narrow || LEG.reduce((a, [lab]) => a + 32 + measure(ctx, lab, 10.5), lx) > left.r + 20;
      for (const [lab, col] of LEG) {
        if (lab.startsWith('Wholesale')) line(ctx, lx, ly, lx + 12, ly, col, 2.5); else { ctx.fillStyle = col; ctx.fillRect(lx, ly - 5, 12, 10); }
        lx += 18; text(ctx, lab, lx, ly + 4, { size: 10.5, color: C.ink2 }); lx += measure(ctx, lab, 10.5) + 14;
        if (legWrap && lab === 'Network') { lx = left.l - 30; ly += 16; }
      }
      // waterfall
      const row = B.find(r => r[0] === st.year); const [y, p, n, t, tot] = row; const s = spotOf(y);
      const R = narrow ? { l: 20, r: w - 16, t: 360, b: h - 40 } : { l: w * 0.62, r: w - 16, t: 40, b: h - 50 };
      const ttl = `${y}: from wholesale to meter${y === 2026 ? ' (spot Jan–Sep)' : ''}`;
      text(ctx, measure(ctx, ttl, 12.5, 650) > w - R.l - 8 ? `${y}: wholesale to meter${y === 2026 ? ' (Jan–Sep)' : ''}` : ttl, R.l, R.t - 16, { size: 12.5, weight: 650 });
      const steps = [['Wholesale', s, C.spot], ['Hedging, shape, sales, margin', p - s, lighten(C.procurement, 0.1)], ['Network', n, C.network], ['Taxes & levies', t, C.taxes]];
      const vmax = 55; const ys = scale(0, vmax, R.l + 4, R.r - 46);
      let acc = 0; const rh = Math.min(34, (R.b - R.t) / 6);
      steps.forEach(([lab, v, col], i) => {
        const yy = R.t + 6 + i * (rh + 14);
        const a0 = acc, a1 = acc + v; acc = a1;
        const x0 = ys(Math.min(a0, a1)), x1 = ys(Math.max(a0, a1));
        rrect(ctx, x0, yy + 12, Math.max(2, x1 - x0), rh - 12, 3); ctx.fillStyle = v < 0 ? alpha(col, 0.35) : col; ctx.fill();
        if (v < 0) { ctx.strokeStyle = col; ctx.setLineDash([3, 2]); ctx.stroke(); ctx.setLineDash([]); }
        text(ctx, lab, R.l, yy + 7, { size: 11, color: C.ink2 });
        text(ctx, `${v >= 0 ? (i ? '+' : '') : '−'}${Math.abs(v).toFixed(1)}`, x1 + 5, yy + 12 + (rh - 12) / 2 + 4, { size: 11, weight: 650 });
        if (i < steps.length - 1) line(ctx, ys(a1), yy + rh, ys(a1), yy + rh + 26, C.grid2, 1, [2, 2]);
      });
      const yy = R.t + 6 + 4 * (rh + 14);
      rrect(ctx, ys(0), yy + 12, ys(tot) - ys(0), rh - 12, 3); ctx.fillStyle = C.ink; ctx.fill();
      text(ctx, 'What a new household contract costs', R.l, yy + 7, { size: 11, color: C.ink, weight: 600 });
      text(ctx, `${tot.toFixed(1)} ${U()}`, ys(tot) + 5, yy + 12 + (rh - 12) / 2 + 4, { size: 11.5, weight: 700 });
      if (y === 2026) {
        let ty = yy + rh + 22; text(ctx, 'Taxes & levies, 2026:', R.l, ty, { size: 10.5, color: C.ink3, weight: 600 }); ty += 14;
        const tl = TAX2026.map(([lab, v]) => `${lab} ${(v * fxY(st.cur, 2026)).toFixed(2)}`);
        const c1 = Math.max(...tl.filter((_, i) => !(i % 2)).map(s => measure(ctx, s, 10.5))) + 14, c2 = Math.max(...tl.filter((_, i) => i % 2).map(s => measure(ctx, s, 10.5)));
        const fs = R.l + c1 + c2 > w - 4 ? 10.5 * (w - 4 - R.l) / (c1 + c2) : 10.5, cx2 = Math.max((R.r - R.l) / 2, c1) * fs / 10.5;
        tl.forEach((s, i) => text(ctx, s, R.l + (i % 2) * cx2, ty + Math.floor(i / 2) * 14, { size: fs, color: C.ink3 }));
      }
    },
  });
  fig.interact({ hit: (x, y) => { if (!geo || y > geo.left.b || x < geo.left.l || x > geo.left.r) return null; return { x }; }, cursor: 'pointer', down: o => pick(o.x), move: (o, x) => pick(x) });
  const pick = x => { const yr = clamp(Math.round(geo.sx.inv(x)), 2015, 2026); if (yr !== st.year) { st.year = yr; sl.set(yr); fig.invalidate(); } };
  const ctl = controls(el);
  const sl = slider(ctl, { label: 'Year', min: 2015, max: 2026, step: 1, value: st.year, color: C.procurement, fmt: v => v, oninput: v => { st.year = v; fig.invalidate(); }, name: 'year', wide: true });
  currencyToggle(ctl, v => { st.cur = v; conv(); fig.invalidate(); }, 'bl', { caption: false, value: 'EUR' });
}

// ---------------------------------------------------------------- US: wholesale vs retail (real: EIA, Monitoring Analytics)
const US = { years: [2016, 2019, 2021, 2022, 2023, 2024, 2025], res: [12.55, 13.01, 13.66, 15.04, 16.00, 16.48, 17.30], com: [10.43, 10.68, 11.22, 12.41, 12.59, 12.75, 13.41], ind: [6.76, 6.81, 7.18, 8.32, 8.04, 8.13, 8.62] };
const PJM = [[2019, 27.32], [2020, 21.77], [2021, 39.78], [2022, 80.14], [2023, 31.08], [2024, 33.74]];
export function usCompare(el) {
  const fig = new Fig(el, {
    label: 'US average retail electricity prices by sector compared with the PJM real-time wholesale price',
    height: w => w < 600 ? 300 : 320,
    draw(ctx, w, h) {
      const box = { l: 40, r: w - (w < 600 ? 70 : 120), t: 28, b: h - 32 };
      const { sx, sy } = axes(ctx, { box, x0: 2016, x1: 2025, y0: 0, y1: 20, yticks: [0, 5, 10, 15, 20], xticks: [2016, 2018, 2020, 2022, 2024], ylabel: '¢/kWh (nominal)' });
      const ser = [['Residential', US.res, C.ink], ['Commercial', US.com, C.ink2], ['Industrial', US.ind, C.ink3]];
      ser.forEach(([lab, v, col]) => { const pts = US.years.map((y, i) => [sx(y), sy(v[i])]); pathLine(ctx, pts, col, 2); pts.forEach(p => circle(ctx, p[0], p[1], 2.8, col)); text(ctx, `${lab} ${v.at(-1).toFixed(1)}`, sx(2025) + 6, sy(v.at(-1)) + 4, { size: 11, color: col, weight: 600 }); });
      const pp = PJM.map(([y, v]) => [sx(y), sy(v / 10)]); pathLine(ctx, pp, C.spot, 2.2, [5, 3]); pp.forEach(p => circle(ctx, p[0], p[1], 3, C.spot));
      text(ctx, 'PJM wholesale (real-time LMP)', sx(2019), sy(2.732) + 22, { size: 11, color: C.spot, weight: 600, halo: true });
    },
  });
}

// ---------------------------------------------------------------- LCOE explorer (illustrative inputs; Lazard v19 ranges real)
export const PRESETS = {
  solar: { name: 'Utility solar', capex: 1150, fom: 15, cf: 25, life: 30, fuel: 0, hr: 0, vom: 0, band: [40, 98], col: C.solar },
  wind: { name: 'Onshore wind', capex: 1500, fom: 40, cf: 38, life: 25, fuel: 0, hr: 0, vom: 0, band: [37, 99], col: C.wind },
  gas: { name: 'Gas combined cycle', capex: 1300, fom: 25, cf: 55, life: 30, fuel: 3.5, hr: 6.4, vom: 4, band: [51, 129], col: C.gas },
  nuclear: { name: 'New nuclear', capex: 14000, fom: 130, cf: 92, life: 40, fuel: 0, hr: 0, vom: 10, band: [175, 255], col: C.nuclear },
};
export const crf = (r, n) => r === 0 ? 1 / n : r * (1 + r) ** n / ((1 + r) ** n - 1);
export function lcoeParts(p, wacc) {
  const cap = p.capex * crf(wacc, p.life) / (8.76 * p.cf / 100); // $/kW-yr / (MWh per kW-yr) ; 8.76*cf% => MWh/kW
  const fom = p.fom / (8.76 * p.cf / 100);
  const fuel = p.fuel * p.hr + p.vom;
  return { cap, fom, fuel, total: cap + fom + fuel };
}
export function lcoe(el) {
  const st = { tech: 'solar', wacc: 7.5, p: { ...PRESETS.solar } };
  const fig = new Fig(el, {
    label: 'Levelised cost of electricity calculator: capital, fixed operating and fuel costs per megawatt-hour, and how the total changes with the cost of capital',
    height: w => w < 600 ? 520 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const parts = lcoeParts(st.p, st.wacc / 100);
      const P = PRESETS[st.tech];
      // left: stacked bar vs Lazard band
      const L = narrow ? { l: 46, r: w - 20, t: 30, b: 210 } : { l: 50, r: w * 0.42, t: 30, b: h - 34 };
      const ymax = Math.max(300, parts.total * 1.15);
      const { sx, sy } = axes(ctx, { box: L, x0: 0, x1: 1, y0: 0, y1: ymax, xticks: [], ylabel: '$/MWh' });
      const bx = L.l + (L.r - L.l) * 0.18, bw = (L.r - L.l) * 0.28;
      let base = 0;
      let lastLy = 1e9; const segYs = [];
      for (const [lab, v, col] of [['capital', parts.cap, P.col], ['fixed O&M', parts.fom, lighten(P.col, 0.45)], ['fuel & variable', parts.fuel, C.ink3]]) {
        if (v <= 0.01) continue;
        ctx.fillStyle = col; ctx.fillRect(bx, sy(base + v), bw, sy(base) - sy(base + v) - 1);
        const ly = Math.min(sy(base + v / 2) + 4, lastLy - 13); lastLy = ly; segYs.push(ly);
        text(ctx, `${lab} ${v.toFixed(0)}`, bx + bw + 8, ly, { size: 11, color: C.ink2 });
        base += v;
      }
      text(ctx, `$${parts.total.toFixed(0)}/MWh`, bx + bw / 2, sy(parts.total) - 8, { size: 13, weight: 700, align: 'center' });
      // lazard band
      const lx = L.l + (L.r - L.l) * 0.06;
      ctx.fillStyle = alpha(C.ink, 0.08); ctx.fillRect(lx - 7, sy(P.band[1]), 14, sy(P.band[0]) - sy(P.band[1]));
      line(ctx, lx - 7, sy(P.band[0]), lx + 7, sy(P.band[0]), C.ink2, 1.5); line(ctx, lx - 7, sy(P.band[1]), lx + 7, sy(P.band[1]), C.ink2, 1.5); line(ctx, lx, sy(P.band[0]), lx, sy(P.band[1]), C.ink2, 1.5);
      { const free = y => y < L.b - 2 && y > 12 && Math.abs(sy(parts.total) - 8 - y) > 16 && segYs.every(s => Math.abs(s - y) > 13); const ya = sy(P.band[1]) - 8, yb = sy(P.band[0]) + 16; const yl = free(ya) ? ya : free(yb) ? yb : null; if (yl !== null) text(ctx, 'Lazard 2026 (v19) range', lx - 8, yl, { size: 10, color: C.ink3, weight: 600 }); }
      // right: sensitivity to WACC
      const R = narrow ? { l: 46, r: w - 20, t: 268, b: h - 34 } : { l: w * 0.52, r: w - 20, t: 30, b: h - 34 };
      const ax = axes(ctx, { box: R, x0: 0, x1: 15, y0: 0, y1: ymax, xticks: [0, 3, 6, 9, 12, 15], xfmt: v => v + '%', ylabel: 'LCOE vs cost of capital', xlabel: 'cost of capital (WACC)' });
      const SHORT = { solar: 'Solar', wind: 'Wind', gas: 'Gas CC', nuclear: 'Nuclear' }; const ends = [];
      Object.entries(PRESETS).forEach(([k, pr]) => {
        const p = k === st.tech ? st.p : pr; const pts = [];
        for (let r = 0; r <= 15.01; r += 0.25) pts.push([ax.sx(r), ax.sy(Math.min(ymax, lcoeParts(p, r / 100).total))]);
        pathLine(ctx, pts, k === st.tech ? pr.col : alpha(pr.col, 0.3), k === st.tech ? 2.6 : 1.4);
        const end = pts.at(-1); ends.push({ s: SHORT[k], y: end[1] - 6, x: end[0] - 2, col: k === st.tech ? darken(pr.col, 0.2) : alpha(C.ink, 0.4), wgt: k === st.tech ? 650 : 450 });
      });
      ends.sort((a, b) => a.y - b.y); for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 12) ends[i].y = ends[i - 1].y + 12;
      ends.forEach(e => text(ctx, e.s, e.x, e.y, { size: 10, color: e.col, weight: e.wgt, align: 'right', halo: true }));
      circle(ctx, ax.sx(st.wacc), ax.sy(Math.min(ymax, parts.total)), 5, P.col, '#fff', 2);
    },
  });
  const ctl = controls(el);
  const sliders = {};
  segmented(ctl, { options: Object.entries(PRESETS).map(([k, p]) => ({ label: p.name, value: k })), value: st.tech, onchange: v => { st.tech = v; st.p = { ...PRESETS[v] }; for (const k in sliders) sliders[k].set(st.p[k]); fuelWrap(); upd(); }, name: 'tech' });
  sliders.capex = slider(ctl, { label: 'Build cost', min: 300, max: 16000, step: 50, value: st.p.capex, fmt: v => '$' + v.toLocaleString('en-US') + '/kW', color: C.ink2, oninput: v => { st.p.capex = v; upd(); }, name: 'capex' });
  const wsl = slider(ctl, { label: 'Cost of capital', min: 0, max: 15, step: 0.25, value: st.wacc, fmt: v => v.toFixed(2) + '%', color: C.price, oninput: v => { st.wacc = v; upd(); }, name: 'wacc' });
  sliders.cf = slider(ctl, { label: 'Capacity factor', min: 5, max: 95, step: 1, value: st.p.cf, fmt: v => v + '%', color: C.wind, oninput: v => { st.p.cf = v; upd(); }, name: 'cf' });
  sliders.fuel = slider(ctl, { label: 'Gas price', min: 1, max: 15, step: 0.1, value: 3.5, fmt: v => '$' + v.toFixed(1) + '/MMBtu', color: C.gas, oninput: v => { st.p.fuel = v; upd(); }, name: 'fuel' });
  const fuelWrap = () => { const w = sliders.fuel.el.closest('.ctl'), on = st.tech === 'gas'; w.style.opacity = on ? '' : 0.45; w.querySelectorAll('input').forEach(i => { i.disabled = !on; }); w.title = on ? '' : 'Only gas burns fuel: solar, wind and nuclear costs do not depend on the gas price'; let n = w.querySelector('.fuelnote'); if (!n) { n = document.createElement('small'); n.className = 'fuelnote'; n.style.cssText = 'display:block;color:#777;margin-top:2px'; w.appendChild(n); } n.textContent = on ? '' : 'Only applies to gas: the other technologies burn no fuel.'; };
  fuelWrap();
  const ro = readout(el);
  function upd() {
    const r = lcoeParts(st.p, st.wacc / 100);
    const share = r.cap / r.total;
    ro.innerHTML = `<b>$${r.total.toFixed(0)}/MWh</b>. Capital is <b>${(share * 100).toFixed(0)}%</b> of the cost — ${share > 0.6 ? 'so the interest rate matters almost as much as the hardware.' : 'so the fuel price matters more than the interest rate.'}`;
    fig.invalidate();
  }
  upd();
  el.__sim = { st, upd };
}

// ---------------------------------------------------------------- Lazard history (real)
const LZ = [
  ['solar-pv-utility', 'Utility solar', C.solar], ['wind-onshore', 'Onshore wind', C.wind], ['gas-ccgt', 'Gas combined cycle', C.gas],
  ['coal', 'Coal', C.coal], ['nuclear', 'Nuclear', C.nuclear], ['wind-offshore', 'Offshore wind', darken(C.wind, 0.3)], ['gas-peaker', 'Gas peaker', C.peaker],
];
export function lazardHistory(el) {
  const st = { on: new Set(['solar-pv-utility', 'wind-onshore', 'gas-ccgt', 'nuclear']), irena: false, hover: null };
  const series = k => (DATA.lazard[k] || []).filter(r => r[0] !== 2022); // 2022 row duplicates the 2023 (v16) edition
  let geo = null;
  const fig = new Fig(el, {
    label: 'Lazard levelised cost ranges 2008 to 2026 for several technologies',
    height: w => w < 600 ? 360 : 400,
    draw(ctx, w, h) {
      const box = { l: 46, r: w - (w < 600 ? 16 : 130), t: 26, b: h - 34 };
      const { sx, sy } = axes(ctx, { box, x0: 2008, x1: 2026, y0: 0, y1: 450, yticks: [0, 100, 200, 300, 400], xticks: [2008, 2012, 2016, 2020, 2024], ylabel: 'US$/MWh, unsubsidised (Lazard edition year)' });
      geo = { sx, box };
      ctx.fillStyle = alpha(C.ink, 0.05); ctx.fillRect(sx(2021), box.t, sx(2026) - sx(2021), box.b - box.t);
      text(ctx, 'rates, supply chains', sx(2021) + 4, box.t + 12, { size: 10.5, color: C.ink3, weight: 600 });
      const labels = [];
      for (const [k, lab, col] of LZ) {
        if (!st.on.has(k)) continue;
        const s = series(k); if (!s.length) continue;
        ctx.beginPath(); s.forEach(([y, lo], i) => i ? ctx.lineTo(sx(y), sy(lo)) : ctx.moveTo(sx(y), sy(lo)));
        [...s].reverse().forEach(([y, lo, hi]) => ctx.lineTo(sx(y), sy(hi))); ctx.closePath(); ctx.fillStyle = alpha(col, 0.16); ctx.fill();
        pathLine(ctx, s.map(([y, lo, hi]) => [sx(y), sy((lo + hi) / 2)]), col, 2.2);
        const last = s.at(-1); labels.push({ s: `${lab} ${((last[1] + last[2]) / 2).toFixed(0)}`, y: sy((last[1] + last[2]) / 2) + 4, col });
      }
      if (w >= 600) {
        labels.sort((p, q) => p.y - q.y);
        for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i - 1].y < 14) labels[i].y = labels[i - 1].y + 14;
        labels.forEach(L => text(ctx, L.s, box.r + 6, L.y, { size: 10.5, color: darken(L.col, 0.15), weight: 600 }));
      }
      if (st.irena) {
        for (const [k, col] of [['solar', C.solar], ['onshore', C.wind]]) {
          const s = DATA.owidWorld[k].filter(r => r[0] >= 2008); pathLine(ctx, s.map(([y, v]) => [sx(y), sy(v)]), darken(col, 0.25), 1.6, [4, 3]);
        }
        text(ctx, 'dashed: IRENA global realised averages (via OWID)', box.l + 8, box.t + 28, { size: 10.5, color: C.ink2 });
      }
      if (st.hover != null) {
        const y = st.hover; line(ctx, sx(y), box.t, sx(y), box.b, alpha(C.ink, 0.3));
        const rows = LZ.filter(([k]) => st.on.has(k)).map(([k, lab]) => { const r = series(k).find(q => q[0] === y); return r ? `${lab}: ${r[1]}–${r[2]}` : null; }).filter(Boolean);
        const bx = clamp(sx(y) + 8, box.l, box.r - 170);
        rrect(ctx, bx, box.t + 34, 170, 18 + rows.length * 15, 6); ctx.fillStyle = alpha('#fff', 0.94); ctx.fill(); ctx.strokeStyle = C.grid2; ctx.stroke();
        text(ctx, String(y), bx + 8, box.t + 48, { size: 11, weight: 700 });
        rows.forEach((s, i) => text(ctx, s, bx + 8, box.t + 64 + i * 15, { size: 10.5, color: C.ink2 }));
      }
    },
  });
  fig.interact({ hit: () => null, hover: (o, x) => { if (!geo || x < 0) { st.hover = null; return; } const y = Math.round(geo.sx.inv(x)); st.hover = y >= 2008 && y <= 2026 && y !== 2022 ? y : null; } });
  const ctl = controls(el, 'chips');
  for (const [k, lab, col] of LZ) {
    const b = button(ctl, lab, () => { st.on.has(k) ? st.on.delete(k) : st.on.add(k); b.setAttribute('aria-pressed', st.on.has(k)); fig.invalidate(); }, { kind: 'chip', color: col });
    b.setAttribute('aria-pressed', st.on.has(k));
  }
  const ib = button(ctl, 'IRENA global', () => { st.irena = !st.irena; ib.setAttribute('aria-pressed', st.irena); fig.invalidate(); }, { kind: 'chip', color: C.ink2 });
  ib.setAttribute('aria-pressed', false);
}
