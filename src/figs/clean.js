// Section: renewables, nuclear and the learning curve.
//  learning  — real learning-curve data (OWID: IRENA / Nemet / Farmer & Lafond) + illustrative projection
//  foak      — real cost/price growth of recent nuclear projects (sources in the notes)
//  cleanGrid — illustrative synthetic-year capacity-mix toy
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, measure, rrect, line, circle, clamp, lerp, axes, pathLine, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, more } from '../lib/ui.js';
import { DATA2 } from '../lib/data2.js';

const L10 = Math.log10;
function fit(pts) { // least squares of log10(cost) on log10(capacity)
  const n = pts.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const [x, y] of pts) { const a = L10(x), b = L10(y); sx += a; sy += b; sxx += a * a; sxy += a * b; }
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx); const a = (sy - b * sx) / n;
  return { a, b, lr: 1 - Math.pow(2, b) };
}
const fmtCap = gw => gw >= 1000 ? (gw / 1000).toFixed(gw >= 10000 ? 0 : 1) + ' TW' : gw >= 1 ? gw.toFixed(gw >= 100 ? 0 : gw >= 10 ? 0 : 1) + ' GW' : (gw * 1000).toFixed(gw * 1000 >= 10 ? 0 : 1) + ' MW';

// ------------------------------------------------------------------------------------------- learning curves
const SERIES = {
  module: { name: 'Solar modules', unit: '$/W', fmt: v => v >= 10 ? '$' + v.toFixed(0) + '/W' : v >= 1 ? '$' + v.toFixed(1) + '/W' : '$' + v.toFixed(2) + '/W', pts: DATA2.pvModule.map(([y, p, c]) => [c, p, y]), col: C.solar, what: 'module price (2025 US$ per watt)', capWhat: 'cumulative solar PV installed worldwide', recent: 2010 },
  pv: { name: 'Solar electricity', unit: '$/MWh', fmt: v => '$' + v.toFixed(0) + '/MWh', pts: DATA2.pvLcoe.map(([y, p, c]) => [c, p, y]), col: darken(C.solar, 0.15), what: 'global average LCOE of new utility PV (2025 US$/MWh)', capWhat: 'cumulative solar PV installed worldwide', recent: 2016 },
  wind: { name: 'Onshore wind electricity', unit: '$/MWh', fmt: v => '$' + v.toFixed(0) + '/MWh', pts: DATA2.windLcoe.map(([y, p, c]) => [c, p, y]), col: C.wind, what: 'global average LCOE of new onshore wind (2025 US$/MWh)', capWhat: 'cumulative wind installed worldwide (on- and offshore)', recent: 2015 },
};
export function learning(el) {
  const st = { s: 'module', win: 'all', lr: null, mult: 4, hover: null };
  const cur = () => SERIES[st.s];
  const pts = () => cur().pts.filter(p => st.win === 'all' || p[2] >= cur().recent);
  let geo = null;
  const fig = new Fig(el, {
    label: 'Learning curves: the cost of solar modules, solar electricity and wind electricity against cumulative installed capacity on logarithmic axes, with a fitted learning rate and an adjustable projection',
    height: w => w < 600 ? 440 : Math.max(380, Math.min(460, w * 0.5)),
    draw(ctx, w, h) {
      const S = cur(), P = S.pts, F = fit(pts()), lr = st.lr ?? F.lr;
      const last = P[P.length - 1];
      const capMax = last[0] * Math.max(st.mult, 1) * 1.6;
      const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
      const x0 = Math.pow(10, Math.floor(L10(Math.min(...xs)))), x1 = Math.pow(10, Math.ceil(L10(capMax)));
      const projMin = last[1] * Math.pow(1 - Math.min(0.45, lr + 0.05), Math.log2(st.mult));
      const y0 = Math.pow(10, Math.floor(L10(Math.min(...ys, projMin) * 0.9))), y1 = Math.pow(10, Math.ceil(L10(Math.max(...ys) * 1.05)));
      const box = { l: 62, r: w - 18, t: 34, b: h - 44 };
      const sx = v => box.l + (L10(v) - L10(x0)) / (L10(x1) - L10(x0)) * (box.r - box.l);
      const sy = v => box.b - (L10(v) - L10(y0)) / (L10(y1) - L10(y0)) * (box.b - box.t);
      sx.inv = p => Math.pow(10, L10(x0) + (p - box.l) / (box.r - box.l) * (L10(x1) - L10(x0)));
      geo = { sx, sy, box };
      // grid (decades + 2,5 minor)
      ctx.save(); ctx.lineWidth = 1;
      for (let d = L10(y0); d <= L10(y1) + 1e-9; d++) for (const m of [1, 2, 5]) { const v = m * Math.pow(10, d); if (v > y1 * 1.0001) continue; const y = Math.round(sy(v)) + .5; ctx.strokeStyle = m === 1 ? C.grid2 : C.grid; line(ctx, box.l, y, box.r, y, m === 1 ? C.grid2 : alpha(C.grid, 0.8), 1); if (m === 1 || (L10(y1) - L10(y0) <= 2)) text(ctx, S.fmt(v).replace('/MWh', '').replace('/W', ''), box.l - 6, y + 4, { size: 11, color: C.ink3, align: 'right' }); }
      { const dpx = sx(10) - sx(1), step = Math.max(1, Math.ceil(50 / dpx)); for (let d = L10(x0); d <= L10(x1) + 1e-9; d++) { const v = Math.pow(10, d), x = Math.round(sx(v)) + .5; line(ctx, x, box.t, x, box.b, C.grid, 1); if (Math.round(d) % step === 0) text(ctx, fmtCap(v), x, box.b + 15, { size: 11, color: C.ink3, align: 'center' }); } }
      ctx.restore();
      line(ctx, box.l, box.b + .5, box.r, box.b + .5, C.grid2, 1);
      text(ctx, S.what, box.l - 4, box.t - 12, { size: 11, color: C.ink3, weight: 500 });
      text(ctx, S.capWhat + ' (log scale)', box.r, box.b + 32, { size: 11, color: C.ink3, weight: 500, align: 'right' });
      // fit window shading
      if (st.win !== 'all') { const xa = sx(P.find(p => p[2] >= S.recent)[0]); ctx.fillStyle = alpha(S.col, 0.06); ctx.fillRect(xa, box.t, sx(last[0]) - xa, box.b - box.t); }
      // fitted line over the fitted range
      const fp = pts(); const fl = c => Math.pow(10, F.a + F.b * L10(c));
      pathLine(ctx, [[sx(fp[0][0]), sy(fl(fp[0][0]))], [sx(last[0]), sy(fl(last[0]))]], alpha(C.ink, 0.55), 1.5, [5, 4]);
      // projection cone
      const lo = Math.max(0, lr - 0.05), hi = Math.min(0.6, lr + 0.05);
      const proj = (r, m) => last[1] * Math.pow(1 - r, Math.log2(m));
      if (st.mult > 1) {
        const N = 30; const top = [], bot = [], mid = [];
        for (let i = 0; i <= N; i++) { const m = Math.pow(st.mult, i / N), c = last[0] * m; top.push([sx(c), sy(proj(lo, m))]); bot.push([sx(c), sy(proj(hi, m))]); mid.push([sx(c), sy(proj(lr, m))]); }
        ctx.beginPath(); top.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath(); ctx.fillStyle = alpha(S.col, 0.14); ctx.fill();
        pathLine(ctx, mid, S.col, 2.2, [6, 4]);
        const e = mid[N]; circle(ctx, e[0], e[1], 5, '#fff', S.col, 2);
        { const pl = `${S.fmt(proj(lr, st.mult))} at ${fmtCap(last[0] * st.mult)}?`, ptw = measure(ctx, pl, 11.5, 650), fitsR = e[0] + 10 + ptw < box.r; text(ctx, pl, fitsR ? e[0] + 10 : e[0] - 8, Math.min(box.b - 6, fitsR ? e[1] + 4 : e[1] + 22), { size: 11.5, weight: 650, color: darken(S.col, 0.25), align: fitsR ? 'left' : 'right', halo: true }); }
      }
      // data points
      const yr0 = P[0][2], yr1 = last[2];
      pathLine(ctx, P.map(p => [sx(p[0]), sy(p[1])]), alpha(S.col, 0.5), 1.2);
      for (const p of P) { const t = (p[2] - yr0) / Math.max(1, yr1 - yr0); circle(ctx, sx(p[0]), sy(p[1]), p === st.hover ? 5.5 : 3.6, mix(lighten(S.col, 0.45), darken(S.col, 0.35), t), p === st.hover ? C.ink : '#fff', 1); }
      // year labels at a few points
      const want = new Set([P[0][2], last[2], ...[1980, 1990, 2000, 2010, 2015, 2020].filter(y => y > P[0][2] + 3 && y < last[2] - 2)]);
      let lastX = -1e9;
      for (const p of P) if (want.has(p[2])) { const x = sx(p[0]); if (x - lastX < 34 && p !== last) continue; lastX = x; text(ctx, String(p[2]), x + 6, sy(p[1]) - 7, { size: 10.5, color: C.ink2, weight: 600, halo: true }); }
      // fitted learning rate tag
      text(ctx, `fitted learning rate ${(F.lr * 100).toFixed(0)}% per doubling (${st.win === 'all' ? `${fp[0][2]}–${last[2]}` : `since ${S.recent}`})`, box.r - 6, box.t + 18, { size: 11, color: C.ink2, align: "right", weight: 600, halo: true });
      if (st.hover) { const p = st.hover; const s = `${p[2]}: ${S.fmt(p[1])} · ${fmtCap(p[0])} installed`; const tw = measure(ctx, s, 11.5, 600) + 16; const bx = clamp(sx(p[0]) + 10, box.l, box.r - tw), by = sy(p[1]) + 12; rrect(ctx, bx, by, tw, 22, 6); ctx.fillStyle = alpha('#fff', 0.95); ctx.fill(); ctx.strokeStyle = C.grid2; ctx.stroke(); text(ctx, s, bx + 8, by + 15, { size: 11.5, weight: 600, color: C.ink }); }
    },
  });
  fig.interact({
    hit: (x, y) => { if (!geo) return null; let best = null, bd = 18; for (const p of cur().pts) { const d = Math.hypot(geo.sx(p[0]) - x, geo.sy(p[1]) - y); if (d < bd) { bd = d; best = p; } } return best; },
    cursor: 'pointer', hover: o => { st.hover = o; },
  });
  const ctl = controls(el); const ro = readout(el);
  const upd = () => {
    const S = cur(), F = fit(pts()), lr = st.lr ?? F.lr, last = S.pts[S.pts.length - 1], first = S.pts[0];
    const proj = last[1] * Math.pow(1 - lr, Math.log2(st.mult));
    ro.innerHTML = `From ${first[2]} to ${last[2]}, ${S.name.toLowerCase()} fell from <b>${S.fmt(first[1])}</b> to <b>${S.fmt(last[1])}</b> while capacity grew ${(() => { const g = last[0] / first[0]; return g >= 1e6 ? (g / 1e6).toPrecision(2) + ' million' : g >= 1e4 ? (Math.round(g / 1000)).toLocaleString('en-US') + ',000' : Math.round(g).toLocaleString('en-US'); })()}-fold. The fitted curve says each doubling cut the cost by <b>${(F.lr * 100).toFixed(0)}%</b>. ` + (st.mult > 1 ? `<i>If</i> a ${(lr * 100).toFixed(0)}% rate held for ${Math.log2(st.mult).toFixed(0)} more doubling${st.mult > 2 ? 's' : ''} (to ${fmtCap(last[0] * st.mult)}), the cost would be about <b>${S.fmt(proj)}</b> — an extrapolation, not a forecast.` : '');
    fig.invalidate();
  };
  segmented(ctl, { options: Object.entries(SERIES).map(([k, s]) => ({ label: s.name, value: k, name: k })), value: st.s, onchange: v => { st.s = v; st.lr = null; lrs.set(Math.round(fit(pts()).lr * 100)); upd(); } });
  segmented(ctl, { label: 'Fit', options: [{ label: 'All years', value: 'all' }, { label: 'Recent', value: 'recent' }], value: st.win, onchange: v => { st.win = v; st.lr = null; lrs.set(Math.round(fit(pts()).lr * 100)); upd(); } });
  const lrs = slider(ctl, { label: 'Learning rate for the projection', min: 0, max: 40, step: 1, value: Math.round(fit(pts()).lr * 100), color: C.ink2, fmt: v => v + '% per doubling', oninput: v => { st.lr = v / 100; upd(); }, name: 'lr' });
  slider(ctl, { label: 'Future capacity', min: 0, max: 4, step: 1, value: 2, color: C.solar, fmt: v => v === 0 ? 'today' : `×${2 ** v} today`, oninput: v => { st.mult = 2 ** v; upd(); }, name: 'mult' });
  upd();
}

// ------------------------------------------------------------------------------------------- nuclear: estimate vs latest
const FOAK = [
  { name: 'Vogtle 3 & 4', where: 'USA · 2 × AP1000 · 2.2 GW', first: 14, latest: 35, unit: '$bn', basis: 'total project cost, nominal', status: 'online 2023–24, ~7 years late', n: 21 },
  { name: 'Flamanville 3', where: 'France · EPR · 1.6 GW', first: 3.3, latest: 13.2, unit: '€bn', basis: 'construction only; €23.7bn (2023 €) with financing', status: 'grid-connected Dec 2024, ~12 years late', n: 22 },
  { name: 'Hinkley Point C', where: 'UK · 2 × EPR · 3.3 GW', first: 18, latest: 35, unit: '£bn', basis: '2015 £, excl. interest', status: 'unit 1 now expected 2030 (was 2025)', n: 23 },
  { name: 'NuScale / UAMPS', where: 'USA · 6 × 77 MW SMR', first: 58, latest: 89, unit: '$/MWh', basis: 'target power price, after subsidies', status: 'cancelled Nov 2023 before construction', n: 24 },
  { name: 'Darlington BWRX-300', where: 'Canada · 4 × 300 MW SMR', first: 20.9, latest: null, unit: 'C$bn', basis: '4 units, 2024 C$, incl. interest & contingency', status: 'unit 1 under construction, due 2030', n: 25 },
];
export function foak(el) {
  let hover = -1;
  const fig = new Fig(el, {
    label: 'How the cost estimates of recent nuclear projects grew between first estimate and latest figure: Vogtle, Flamanville 3, Hinkley Point C, NuScale UAMPS, and the Darlington SMR budget',
    height: w => w < 600 ? 470 : 330,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = narrow ? { l: 14, r: w - 16, t: 44, b: h - 34 } : { l: 230, r: w - 150, t: 40, b: h - 34 };
      const sx = v => box.l + L10(v) / L10(6) * (box.r - box.l);
      const rowH = (box.b - box.t) / FOAK.length;
      for (const m of [1, 1.5, 2, 3, 4, 6]) { const x = Math.round(sx(m)) + .5; line(ctx, x, box.t - 6, x, box.b, m === 1 ? C.grid2 : C.grid, 1); text(ctx, `×${m}`, x, box.b + 16, { size: 11, color: C.ink3, align: 'center' }); }
      text(ctx, 'latest figure ÷ first estimate (log scale)', box.l, box.t - 22, { size: 11, color: C.ink3, weight: 500 });
      FOAK.forEach((p, i) => {
        const yc = box.t + rowH * (i + 0.5) + (narrow ? 8 : 0);
        if (i === hover) { ctx.fillStyle = alpha(C.nuclear, 0.06); ctx.fillRect(narrow ? 0 : 8, box.t + rowH * i, w - (narrow ? 0 : 16), rowH); }
        const lx = narrow ? box.l : 14, ly = narrow ? yc - 16 : yc - 3;
        text(ctx, p.name, lx, ly, { size: 12.5, weight: 650, color: C.ink });
        if (!narrow) text(ctx, p.where, lx, ly + 15, { size: 10.5, color: C.ink3 });
        if (p.latest == null) {
          circle(ctx, sx(1), yc, 6, '#fff', C.nuclear, 2);
          text(ctx, `budget C$${p.first}bn — no outturn yet`, sx(1) + 12, yc + 4, { size: 11, color: C.ink2, weight: 600 });
          return;
        }
        const r = p.latest / p.first;
        line(ctx, sx(1), yc, sx(r), yc, alpha(C.nuclear, 0.55), 5);
        circle(ctx, sx(1), yc, 5, '#fff', C.nuclear, 2); circle(ctx, sx(r), yc, 6, C.nuclear, '#fff', 2);
        const lab = `${p.unit.startsWith('$/') ? '$' + p.first + '→$' + p.latest + '/MWh' : (p.unit === '$bn' ? '$' : p.unit[0]) + p.first + 'bn → ' + (p.unit === '$bn' ? '$' : p.unit[0]) + p.latest + 'bn'}  ×${r.toFixed(1)}`;
        const fits = sx(r) + 11 + measure(ctx, lab, 11, 650) < w - 4; // else (phones) on the name line, right-aligned
        text(ctx, lab, fits ? sx(r) + 11 : w - 16, fits ? yc + 4 : ly, { size: 11, weight: 650, color: darken(C.nuclear, 0.25), align: fits ? 'left' : 'right' });
        if (!narrow) text(ctx, p.status, sx(r) + 11, yc + 18, { size: 10, color: C.ink3 });
      });
      if (hover >= 0) { const p = FOAK[hover]; const s = `${p.name}: ${p.basis}. ${p.status}.`; text(ctx, s, narrow ? box.l : 14, h - 8, { size: 10.5, color: C.ink2 }); }
    },
  });
  fig.interact({ hit: (x, y) => { const narrow = fig.w < 600; const t = narrow ? 44 : 40, b = fig.h - 34; const i = Math.floor((y - t) / ((b - t) / FOAK.length)); return i >= 0 && i < FOAK.length ? { i } : null; }, cursor: 'help', hover: o => { hover = o ? o.i : -1; } });
}

// ------------------------------------------------------------------------------------------- build a clean grid (illustrative)
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const H = 8760;
const YEAR = (() => {
  const R = rng(20261009), gauss = () => { let u = 0, v = 0; while (!u) u = R(); v = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const dem = new Float32Array(H), sol = new Float32Array(H), win = new Float32Array(H);
  const lat = 51 * Math.PI / 180;
  // day-level cloudiness (AR) and hour-level wind weather (AR, ~2-day memory)
  let cl = 0, wx = 0; const a = Math.exp(-1 / 40);
  const clear = new Float32Array(365);
  for (let d = 0; d < 365; d++) { cl = 0.6 * cl + 0.8 * gauss(); const winter = 0.5 + 0.5 * Math.cos(2 * Math.PI * (d - 10) / 365); clear[d] = clamp(0.62 - 0.22 * winter + 0.22 * cl, 0.08, 1); }
  for (let t = 0; t < H; t++) {
    const d = Math.floor(t / 24), hr = t % 24, dow = (d + 3) % 7, wk = dow >= 5;
    const seas = Math.cos(2 * Math.PI * (d - 15) / 365);
    const daily = 0.82 + 0.14 * Math.exp(-((hr - 11) ** 2) / 18) + 0.16 * Math.exp(-((hr - 18.5) ** 2) / 6) + (hr >= 7 && hr <= 20 ? 0.08 : 0);
    dem[t] = 58 * (1 + 0.13 * seas) * daily * (wk ? 0.88 : 1);
    const decl = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (284 + d) / 365), ha = (hr + 0.5 - 12.5) * 15 * Math.PI / 180;
    const se = Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(ha);
    sol[t] = se > 0 ? Math.pow(se, 1.25) * clear[d] : 0;
    wx = a * wx + Math.sqrt(1 - a * a) * gauss();
    const u = Math.exp(0.55 * wx) * (1 + 0.28 * seas);
    win[t] = clamp(0.06 + 0.33 * (u ** 2.2) / (1 + 0.25 * u ** 2.2) * 1.2, 0, 0.95);
  }
  // a deliberate January Dunkelflaute: days 16-21, still and grey
  for (let t = 16 * 24; t < 22 * 24; t++) { win[t] *= 0.15; sol[t] *= 0.35; }
  const norm = (arr, cf) => { let s = 0; for (const v of arr) s += v; const k = cf * H / s; for (let i = 0; i < H; i++) arr[i] = Math.min(1, arr[i] * k); };
  norm(sol, 0.105); norm(win, 0.27);
  let D = 0; for (const v of dem) D += v;
  return { dem, sol, win, D };
})();
const crf = (r, n) => r * (1 + r) ** n / ((1 + r) ** n - 1);
const COST = { // illustrative inputs, as in the LCOE presets of money.js (US$, 7% WACC)
  solar: { capex: 1150, life: 30, fom: 15 }, wind: { capex: 1500, life: 25, fom: 40 },
  gas: { capex: 1300, life: 30, fom: 25, fuel: 3.5 * 6.4 + 4, co2: 0.34 },
  batt: { kw: 200, kwh: 250, life: 20 }, nuc: { life: 40, fom: 130, vom: 10, avail: 0.9 },
};
function simulate(m) {
  const { dem, sol, win, D } = YEAR; const eta = 0.85;
  const be = m.bGW * m.bH; let soc = be * 0.5;
  let curt = 0, uns = 0, unsH = 0, gasE = 0, nucE = 0, solE = 0, winE = 0, disE = 0;
  const day = new Float32Array(365 * 7); // per day: nuc, wind, solar, batt, gas, curtailed, unserved (GWh)
  const hourly = m.keepHourly ? new Float32Array(H * 8) : null;
  for (let t = 0; t < H; t++) {
    const d = dem[t], nuc = Math.min(m.nGW * COST.nuc.avail, d);
    const s = m.sGW * sol[t], wv = m.wGW * win[t];
    let net = d - nuc - s - wv, ch = 0, dis = 0, g = 0, u = 0, c = 0;
    let sUse = s, wUse = wv;
    if (net < 0) { ch = Math.min(-net, m.bGW, (be - soc) / eta); soc += ch * eta; c = -net - ch; const tot = s + wv || 1; sUse = s - c * s / tot; wUse = wv - c * wv / tot; }
    else { dis = Math.min(net, m.bGW, soc); soc -= dis; const rem = net - dis; g = Math.min(rem, m.gGW); u = rem - g; }
    // spare gas recharges batteries ahead of a lull (simple rule: if storage under 30% and gas has headroom)
    if (m.gGW > g && soc < be * 0.3 && net > 0) { const x = Math.min(m.gGW - g, m.bGW - dis, (be * 0.3 - soc) / eta); if (x > 0) { g += x; soc += x * eta; } }
    curt += c; uns += u; if (u > 0.05) unsH++; gasE += g; nucE += nuc; solE += sUse; winE += wUse; disE += dis;
    const k = Math.floor(t / 24) * 7; day[k] += nuc; day[k + 1] += wUse; day[k + 2] += sUse; day[k + 3] += dis; day[k + 4] += g; day[k + 5] += c; day[k + 6] += u;
    if (hourly) { const j = t * 8; hourly[j] = nuc; hourly[j + 1] = wUse; hourly[j + 2] = sUse; hourly[j + 3] = dis; hourly[j + 4] = g; hourly[j + 5] = c; hourly[j + 6] = d; hourly[j + 7] = be > 0 ? soc / be : 0; }
  }
  const r = m.wacc;
  const ann = { // $ per year, millions (GW × $/kW = $m)
    solar: m.sGW * (COST.solar.capex * crf(r, COST.solar.life) + COST.solar.fom),
    wind: m.wGW * (COST.wind.capex * crf(r, COST.wind.life) + COST.wind.fom),
    nuclear: m.nGW * (m.nucCapex * crf(r, COST.nuc.life) + COST.nuc.fom) + nucE * COST.nuc.vom / 1000,
    storage: (m.bGW * COST.batt.kw + be * COST.batt.kwh) * (crf(r, COST.batt.life) + 0.025),
    gasFixed: m.gGW * (COST.gas.capex * crf(r, COST.gas.life) + COST.gas.fom),
    gasFuel: gasE * ((m.gasPrice ?? 3.5) * 6.4 + 4) / 1000,
    carbon: gasE * COST.gas.co2 * m.co2 / 1000,
  };
  const served = D - uns; // GWh
  const tot = Object.values(ann).reduce((a, b) => a + b, 0);
  const perMWh = {}; for (const k in ann) perMWh[k] = ann[k] / served * 1000; // $m/GWh*1000 = $/MWh
  return { day, hourly, curt, uns, unsH, gasE, nucE, solE, winE, disE, D, served, perMWh, total: tot / served * 1000, curtPct: curt / (m.sGW * 0 + (solE + winE + curt) || 1) * 100, gasShare: gasE / served, co2: gasE * COST.gas.co2 / served * 1000 };
}
const MIXES = {
  gas: { name: 'Mostly gas', sGW: 60, wGW: 60, bGW: 0, bH: 4, nGW: 0, gGW: 90 },
  vre: { name: 'Wind + solar + batteries', sGW: 220, wGW: 160, bGW: 40, bH: 4, nGW: 0, gGW: 0 },
  vreGas: { name: '… plus gas backup', sGW: 220, wGW: 160, bGW: 40, bH: 4, nGW: 0, gGW: 75 },
  nuc: { name: 'Mostly nuclear', sGW: 30, wGW: 20, bGW: 10, bH: 4, nGW: 55, gGW: 30 },
  mix: { name: 'A blend', sGW: 130, wGW: 110, bGW: 30, bH: 6, nGW: 20, gGW: 55 },
};
const STACK = [['nuclear', C.nuclear, 'nuclear'], ['wind', C.wind, 'wind'], ['solar', C.solar, 'solar'], ['batt', C.storage, 'storage out'], ['gas', C.gas, 'gas']];
export function cleanGrid(el) {
  const st = { ...MIXES.mix, nucCapex: 14000, co2: 85, gasPrice: 3.5, wacc: 0.07, week: 16, preset: 'mix' };
  let sim = null, geo = null;
  const run = () => { sim = simulate({ ...st, keepHourly: true }); };
  run();
  const fig = new Fig(el, {
    label: 'Build a clean grid: choose solar, wind, batteries, nuclear and gas backup; see a synthetic year day by day, a zoomed week hour by hour, and the resulting system cost, curtailment and unserved hours',
    height: w => w < 640 ? 610 : Math.max(440, Math.min(480, w * 0.47)),
    draw(ctx, w, h) {
      const narrow = w < 640;
      const right = narrow ? null : { l: w - 210, r: w - 14, t: 34, b: h - 30 };
      const R = narrow ? w - 14 : right.l - 34;
      // --- year strip
      const Y = { l: 52, r: R, t: 34, b: narrow ? 160 : h * 0.34 };
      const dmax = 2.6; // TWh/day scale
      const dx = (Y.r - Y.l) / 365, sy = v => Y.b - v / 1000 / dmax * (Y.b - Y.t);
      text(ctx, 'every day of a synthetic year (TWh per day)', Y.l - 4, Y.t - 14, { size: 11, color: C.ink3, weight: 500 });
      for (const v of [0, 1, 2]) { line(ctx, Y.l, Math.round(sy(v * 1000)) + .5, Y.r, Math.round(sy(v * 1000)) + .5, v ? C.grid : C.grid2, 1); text(ctx, String(v), Y.l - 6, sy(v * 1000) + 4, { size: 11, color: C.ink3, align: 'right' }); }
      for (let d = 0; d < 365; d++) {
        const k = d * 7; let base = 0; const x = Y.l + d * dx;
        for (let j = 0; j < 5; j++) { const v = sim.day[k + j]; if (v <= 0) continue; ctx.fillStyle = alpha(STACK[j][1], 0.9); ctx.fillRect(x, sy(base + v), Math.max(1, dx + 0.3), sy(base) - sy(base + v)); base += v; }
        if (sim.day[k + 5] > 1) { ctx.fillStyle = alpha(C.solar, 0.22); ctx.fillRect(x, sy(Math.min(dmax * 1000, base + sim.day[k + 5])), Math.max(1, dx + 0.3), sy(base) - sy(Math.min(dmax * 1000, base + sim.day[k + 5]))); }
        if (sim.day[k + 6] > 0.5) { ctx.fillStyle = C.peaker; ctx.fillRect(x, Y.b + 3, Math.max(1.5, dx + 0.3), 6); }
      }
      const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
      months.forEach((m, i) => text(ctx, narrow ? m : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i], Y.l + (i + 0.5) * 30.42 * dx, Y.b + 22, { size: 10.5, color: C.ink3, align: 'center' }));
      // week window
      const wx0 = Y.l + st.week * dx, wx1 = wx0 + 7 * dx;
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.strokeRect(wx0, Y.t - 2, wx1 - wx0, Y.b - Y.t + 12);
      ctx.fillStyle = alpha(C.ink, 0.05); ctx.fillRect(wx0, Y.t - 2, wx1 - wx0, Y.b - Y.t + 12);
      // --- week zoom
      const W = { l: 52, r: R, t: Y.b + 56, b: narrow ? 400 : h - 34 };
      const h0 = st.week * 24; let peak = 0; for (let t = h0; t < h0 + 168; t++) { const j = t * 8; peak = Math.max(peak, sim.hourly[j + 6], sim.hourly[j] + sim.hourly[j + 1] + sim.hourly[j + 2] + sim.hourly[j + 3] + sim.hourly[j + 4] + sim.hourly[j + 5]); }
      const yMax = Math.max(100, Math.ceil(peak * 1.05 / 50) * 50);
      const A = axes(ctx, { box: W, x0: 0, x1: 168, y0: 0, y1: yMax, xticks: [], yticks: yMax > 300 ? [0, 100, 200, 300, 400, 500].filter(v => v <= yMax) : [0, 50, 100, 150, 200, 250, 300].filter(v => v <= yMax), yfmt: v => v + ' GW', ylabel: `the week starting ${dateOf(st.week)}, hour by hour` });
      const dt = 1;
      let base = new Float32Array(168);
      for (let j = 0; j < 6; j++) {
        const col = j < 5 ? STACK[j][1] : null; ctx.beginPath();
        for (let i = 0; i < 168; i++) { const v = sim.hourly[(h0 + i) * 8 + j]; ctx.lineTo(A.sx(i), A.sy(base[i] + v)); ctx.lineTo(A.sx(i + dt), A.sy(base[i] + v)); }
        for (let i = 167; i >= 0; i--) { ctx.lineTo(A.sx(i + dt), A.sy(base[i])); ctx.lineTo(A.sx(i), A.sy(base[i])); }
        ctx.closePath(); ctx.fillStyle = col ? alpha(col, 0.88) : alpha(C.solar, 0.18); ctx.fill();
        if (!col) { ctx.strokeStyle = alpha(C.solar, 0.6); ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]); }
        for (let i = 0; i < 168; i++) base[i] += sim.hourly[(h0 + i) * 8 + j];
      }
      pathLine(ctx, Array.from({ length: 168 }, (_, i) => [A.sx(i + 0.5), A.sy(sim.hourly[(h0 + i) * 8 + 6])]), C.demand, 2);
      // generation above the demand line is charging storage: mark it and label the largest such block directly
      { let best = -1, bx = 0;
        for (let i = 0; i < 168; i++) { const j = (h0 + i) * 8, sup = sim.hourly[j] + sim.hourly[j + 1] + sim.hourly[j + 2] + sim.hourly[j + 3] + sim.hourly[j + 4], ex = sup - sim.hourly[j + 6];
          if (ex > 0.5) { const y0 = A.sy(sup), y1 = A.sy(sim.hourly[j + 6]); ctx.fillStyle = alpha('#ffffff', 0.38); ctx.fillRect(A.sx(i), y0, A.sx(i + 1) - A.sx(i), y1 - y0); if (ex > best && i > 14 && i < 150) { best = ex; bx = i; } } }
        if (best > 2) { // keep the label inside the plot and above every hour it spans (curtailment included)
          const lab = 'above the line: charging batteries', tw = measure(ctx, lab, 10.5, 600), cx = clamp(A.sx(bx + 0.5), W.l + tw / 2 + 4, R - tw / 2);
          let ty = W.b; for (let i = 0; i < 168; i++) { if (A.sx(i + 1) < cx - tw / 2 - 2 || A.sx(i) > cx + tw / 2 + 2) continue; let s = 0; for (let k = 0; k < 6; k++) s += sim.hourly[(h0 + i) * 8 + k]; ty = Math.min(ty, A.sy(s)); }
          text(ctx, lab, cx, Math.max(W.t + 10, ty - 6), { size: 10.5, weight: 600, color: C.ink2, align: 'center', halo: true }); } }
      for (let i = 0; i < 168; i++) { const j = (h0 + i) * 8; const sup = sim.hourly[j] + sim.hourly[j + 1] + sim.hourly[j + 2] + sim.hourly[j + 3] + sim.hourly[j + 4]; if (sim.hourly[j + 6] - sup > 0.05) { ctx.fillStyle = alpha(C.peaker, 0.35); ctx.fillRect(A.sx(i), A.sy(sim.hourly[j + 6]), A.sx(1) - A.sx(0) + 0.3, A.sy(sup) - A.sy(sim.hourly[j + 6])); } }
      for (let dd = 0; dd <= 7; dd++) { const x = A.sx(dd * 24); line(ctx, x, W.b, x, W.b + 4, C.grid2, 1); if (dd < 7) text(ctx, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(st.week + dd + 3) % 7], A.sx(dd * 24 + 12), W.b + 15, { size: 10.5, color: C.ink3, align: 'center' }); }
      // legend
      const leg = [...STACK.map(s => [s[2], s[1]]), ['curtailed', alpha(C.solar, 0.3)], ['unserved', C.peaker]];
      let lx = W.l, ly = W.t - 30 + (narrow ? 0 : 0);
      if (!narrow) { lx = W.l + measure(ctx, `the week starting ${dateOf(st.week)}, hour by hour`, 11, 500) + 24; ly = W.t - 14; }
      else ly = W.b + 34;
      for (const [lab, col] of leg) { const tw = measure(ctx, lab, 10.5) + 26; if (lx + tw > R) { lx = W.l; ly += 15; } rrect(ctx, lx, ly - 8, 10, 10, 2); ctx.fillStyle = col; ctx.fill(); text(ctx, lab, lx + 14, ly + 1, { size: 10.5, color: C.ink2 }); lx += tw; }
      // --- cost panel
      const P = narrow ? { l: 16, r: w - 16, t: ly + 34, b: h - 14 } : right;
      const items = [['solar', C.solar, 'solar'], ['wind', C.wind, 'wind'], ['nuclear', C.nuclear, 'nuclear'], ['storage', C.storage, 'storage'], ['gasFixed', lighten(C.gas, 0.25), 'gas plants'], ['gasFuel', C.gas, 'gas fuel'], ['carbon', darken(C.gas, 0.3), 'CO₂ price']];
      const tot = sim.total;
      if (!narrow) {
        text(ctx, 'system cost', P.l, P.t - 14, { size: 11, color: C.ink3, weight: 500 });
        text(ctx, `$${tot.toFixed(0)}`, P.l, P.t + 22, { size: 30, weight: 700, color: C.ink });
        text(ctx, 'per MWh of demand served', P.l, P.t + 40, { size: 11, color: C.ink3 });
        const bt = P.t + 58, bb = P.t + 58 + Math.min(230, P.b - P.t - 200), vmax = Math.max(150, Math.ceil(tot / 50) * 50);
        const bs = v => (bb - bt) * v / vmax; let yb = bb;
        const lbl = [];
        for (const [k, col, lab] of items) { const v = sim.perMWh[k]; if (v < 0.5) continue; const hh = bs(v); ctx.fillStyle = col; ctx.fillRect(P.l, yb - hh, 42, hh - 1); lbl.push([lab + ' ' + v.toFixed(0), yb - hh / 2]); yb -= hh; }
        // de-collide labels
        for (let i = 0; i < lbl.length; i++) { if (i && lbl[i - 1][1] - lbl[i][1] < 13) lbl[i][1] = lbl[i - 1][1] - 13; }
        for (const [s, y] of lbl) text(ctx, s, P.l + 50, y + 4, { size: 10.5, color: C.ink2 });
        line(ctx, P.l - 4, bb + .5, P.l + 46, bb + .5, C.grid2, 1);
        let ky = bb + 26;
        for (const [k, v, col] of stats()) { text(ctx, k, P.l, ky, { size: 11, color: C.ink3 }); text(ctx, v, P.r, ky, { size: 12, weight: 650, color: col || C.ink, align: 'right' }); ky += 19; }
      } else {
        text(ctx, `system cost $${tot.toFixed(0)}/MWh`, P.l, P.t, { size: 15, weight: 700, color: C.ink });
        const bw = P.r - P.l, vmax = Math.max(150, Math.ceil(tot / 50) * 50); let xb = P.l;
        for (const [k, col] of items) { const v = sim.perMWh[k]; if (v < 0.5) continue; const ww = bw * v / vmax; ctx.fillStyle = col; ctx.fillRect(xb, P.t + 10, ww - 1, 16); xb += ww; }
        let ky = P.t + 46, kx = P.l; const s = stats();
        s.forEach(([k, v, col], i) => { const x = P.l + (i % 2) * (P.r - P.l) / 2, y = ky + Math.floor(i / 2) * 32; text(ctx, k, x, y, { size: 10.5, color: C.ink3 }); text(ctx, v, x, y + 15, { size: 12, weight: 650, color: col || C.ink }); });
      }
      geo = { Y, dx };
    },
  });
  function stats() {
    return [
      ['clean share', `${((1 - sim.gasShare) * 100).toFixed(0)}%`],
      ['CO₂ intensity', `${sim.co2.toFixed(0)} g/kWh`],
      ['wind & solar curtailed', `${(sim.curt / Math.max(1, sim.solE + sim.winE + sim.curt) * 100).toFixed(0)}%`],
      ['hours with unserved demand', `${sim.unsH}`, sim.unsH ? C.peaker : C.storage],
    ];
  }
  function dateOf(d) { const dt = new Date(Date.UTC(2027, 0, 1 + d)); return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }); }
  fig.interact({
    hit: (x, y) => geo && y > geo.Y.t - 6 && y < geo.Y.b + 30 && x > geo.Y.l && x < geo.Y.r ? 'week' : null,
    cursor: 'ew-resize',
    down: (o, x) => { st.week = clamp(Math.round((x - geo.Y.l) / geo.dx - 3.5), 0, 358); },
    move: (o, x) => { st.week = clamp(Math.round((x - geo.Y.l) / geo.dx - 3.5), 0, 358); },
  });
  const ctl = controls(el); const ro = readout(el);
  const S = {};
  const upd = () => {
    run();
    const s = sim;
    ro.innerHTML = `<b>$${s.total.toFixed(0)}/MWh</b> for the whole system, before networks. ${s.unsH ? `<b style="color:${C.peaker}">${s.unsH.toLocaleString('en-US')} hour${s.unsH === 1 ? '' : 's'}</b> in which demand could not be met (${(s.uns / s.D * 100).toFixed(s.uns / s.D < 0.01 ? 2 : 1)}% of the year’s energy)` : '<b>No</b> hours of unserved demand'}; ${((1 - s.gasShare) * 100).toFixed(0)}% of demand met without gas; ${(s.curt / Math.max(1, s.solE + s.winE + s.curt) * 100).toFixed(0)}% of wind and solar output thrown away.`;
    fig.invalidate();
  };
  const seg = segmented(ctl, { label: 'Start from', options: Object.entries(MIXES).map(([k, m]) => ({ label: m.name, value: k, name: 'mix-' + k })), value: st.preset, onchange: v => { Object.assign(st, MIXES[v]); st.preset = v; for (const k of ['sGW', 'wGW', 'bGW', 'bH', 'nGW', 'gGW']) S[k].set(st[k]); upd(); } });
  const sl = (k, label, max, step, color, fmt) => { S[k] = slider(ctl, { label, min: 0, max, step, value: st[k], color, fmt, oninput: v => { st[k] = v; seg.set(null); upd(); }, name: k }); };
  sl('sGW', 'Solar', 400, 10, C.solar, v => v + ' GW');
  sl('wGW', 'Wind', 300, 10, C.wind, v => v + ' GW');
  sl('bGW', 'Batteries', 100, 5, C.storage, v => v + ' GW');
  sl('nGW', 'Nuclear', 90, 5, C.nuclear, v => v + ' GW');
  sl('gGW', 'Gas backup', 120, 5, C.gas, v => v + ' GW');
  const adv = more(ctl, 'More: battery hours, costs and prices');
  S.bH = slider(adv, { label: 'Battery duration', min: 1, max: 12, step: 1, value: st.bH, color: C.storage, fmt: v => v + ' h', oninput: v => { st.bH = v; seg.set(null); upd(); }, name: 'bH' });
  slider(adv, { label: 'Nuclear build cost', min: 3000, max: 16000, step: 250, value: st.nucCapex, color: C.nuclear, fmt: v => '$' + v.toLocaleString('en-US') + '/kW', oninput: v => { st.nucCapex = v; upd(); }, name: 'nucCapex' });
  slider(adv, { label: 'Gas price', min: 2, max: 20, step: 0.5, value: st.gasPrice, color: C.gas, fmt: v => '$' + v.toFixed(1) + '/MMBtu', oninput: v => { st.gasPrice = v; upd(); }, name: 'gasPrice' });
  slider(adv, { label: 'CO₂ price', min: 0, max: 200, step: 5, value: st.co2, color: darken(C.gas, 0.3), fmt: v => '$' + v + '/t', oninput: v => { st.co2 = v; upd(); }, name: 'co2' });
  upd();
  el.__sim = { st, get sim() { return sim; } };
}
export { simulate, MIXES };
