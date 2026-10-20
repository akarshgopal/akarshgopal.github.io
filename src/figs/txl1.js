// Transmission post, part 1: line physics.
//  voltageLosses — resistive + corona losses and corridor width at 345/500/765 kV (AEP data, scaled) — real + model
//  powerAngle    — P = V1·V2·sinδ / X on a 380 kV line, phasors and the stability limit — model
//  loadability   — the St. Clair loadability curve anchored on AEP's figures — real + model
//  sagDLR        — conductor heat balance, sag and dynamic line rating — model (CIGRE/IEEE 738-style)
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import { text, measure, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, scale } from '../lib/draw.js';
import { controls, slider, segmented, readout, more } from '../lib/ui.js';

export const HOT = '#d1495b', LINE = C.network, DC = '#7a5cb0';
const MI = 1.609344;

/* ---------------- shared: loadability in SIL (St. Clair curve, anchored on AEP) ---------------- */
// 1.0 SIL at 300 miles (483 km); ~3.75 SIL at 50 miles; ~0.62 SIL at 550 miles  →  SIL(L) ≈ (483/L)^0.75, capped by the thermal limit
export const VOLTS = [
  { kv: 345, sil: 400, therm: 1500, row: 46, r1000: 41.9, cor: 0.6, name: '345 kV' },
  { kv: 500, sil: 900, therm: 2700, row: 58, r1000: 11.0, cor: 1.6, name: '500 kV' },
  { kv: 765, sil: 2300, therm: 5000, row: 61, r1000: 3.4, cor: 2.3, name: '765 kV' },
];
export const stClair = km => Math.pow(483 / Math.max(km, 1), 0.75);
export const loadMW = (v, km) => Math.min(v.therm, v.sil * stClair(km));

/* ---------------- voltageLosses ---------------- */
export function voltageLosses(el) {
  const st = { P: 2000, km: 400 };
  const calc = v => {
    const n = Math.max(1, Math.ceil(st.P / loadMW(v, st.km) - 1e-9));
    const per100 = 1 / (100 * MI); // AEP figures are MW per 100 miles
    const res = v.r1000 * Math.pow(st.P / 1000, 2) / n * st.km * per100;
    const cor = v.cor * n * st.km * per100;
    return { n, res, cor, pct: (res + cor) / st.P * 100, width: n * v.row };
  };
  const fig = new Fig(el, {
    label: 'Losses and corridor width needed to carry a chosen amount of power over a chosen distance at 345, 500 and 765 kV',
    height: w => w < 600 ? 520 : 330,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const L = narrow ? { l: 64, r: w - 20, t: 34, b: 200 } : { l: 70, r: w * 0.5 - 20, t: 34, b: h - 40 };
      const rs = VOLTS.map(calc), maxPct = Math.max(4, ...rs.map(r => r.pct)) * 1.15;
      const xs = scale(0, maxPct, L.l, L.r), rowH = (L.b - L.t) / 3;
      text(ctx, 'losses, % of the power sent', L.l - 4, L.t - 14, { size: 11, weight: 500, color: C.ink3 });
      VOLTS.forEach((v, i) => {
        const r = rs[i], y = L.t + i * rowH + rowH * 0.25, bh = Math.min(26, rowH * 0.45);
        text(ctx, v.name, L.l - 8, y + bh / 2 + 4, { size: 11.5, weight: 650, color: C.ink, align: 'right' });
        const x1 = xs(r.res / st.P * 100), x2 = xs(r.pct);
        ctx.fillStyle = HOT; ctx.fillRect(L.l, y, x1 - L.l, bh);
        ctx.fillStyle = alpha(DC, 0.55); ctx.fillRect(x1, y, Math.max(1, x2 - x1), bh);
        text(ctx, r.pct.toFixed(1) + '%', Math.min(x2 + 6, L.r - 30), y + bh / 2 + 4, { size: 11, weight: 650, color: C.ink, halo: true });
        text(ctx, `${r.n} circuit${r.n > 1 ? 's' : ''}`, L.l + 2, y + bh + 13, { size: 10, color: C.ink3 });
      });
      line(ctx, L.l, L.t - 4, L.l, L.b, C.grid2, 1);
      // legend
      const ly = L.b + 18; ctx.fillStyle = HOT; ctx.fillRect(L.l, ly - 8, 10, 10); text(ctx, 'resistive heating', L.l + 14, ly, { size: 10.5, color: C.ink2 });
      ctx.fillStyle = alpha(DC, 0.55); ctx.fillRect(L.l + 120, ly - 8, 10, 10); text(ctx, 'corona (yearly average)', L.l + 134, ly, { size: 10.5, color: C.ink2 });
      // corridor panel
      const R = narrow ? { l: 16, r: w - 16, t: 270, b: h - 40 } : { l: w * 0.5 + 20, r: w - 16, t: 34, b: h - 40 };
      text(ctx, 'land needed: right-of-way width', R.l, R.t - 14, { size: 11, weight: 500, color: C.ink3 });
      const maxW = Math.max(150, ...rs.map(r => r.width)), ws = scale(0, maxW, 0, R.r - R.l - 70), rH = (R.b - R.t) / 3;
      VOLTS.forEach((v, i) => {
        const r = rs[i], y = R.t + i * rH + 6, gw = ws(r.width);
        ctx.fillStyle = alpha(C.biomass, 0.18); ctx.fillRect(R.l, y + rH * 0.55, gw, 6);
        const n = r.n, cw = gw / n;
        for (let k = 0; k < n; k++) {
          const cx = R.l + cw * (k + 0.5), th = Math.min(rH * 0.55, 46), base = y + rH * 0.55;
          const s = Math.min(1, cw / 26);
          ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(cx - 6 * s, base); ctx.lineTo(cx, base - th); ctx.lineTo(cx + 6 * s, base); ctx.stroke();
          line(ctx, cx - 11 * s, base - th * 0.72, cx + 11 * s, base - th * 0.72, C.ink2, 1.2);
        }
        text(ctx, `${v.name}: ${Math.round(r.width)} m`, R.l + gw + 8, y + rH * 0.55 + 6, { size: 10.5, weight: 650, color: C.ink2 });
      });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Power to move', min: 250, max: 6000, step: 50, value: st.P, color: LINE, fmt: v => v.toLocaleString('en') + ' MW', oninput: v => { st.P = v; upd(); }, name: 'P' });
  slider(ctl, { label: 'Distance', min: 50, max: 1000, step: 10, value: st.km, color: C.ink2, fmt: v => v + ' km', oninput: v => { st.km = v; upd(); }, name: 'km' });
  function upd() {
    const [a, , c] = VOLTS.map(calc);
    ro.innerHTML = `Moving ${st.P.toLocaleString('en')} MW over ${st.km} km takes <b>${a.n}</b> single 345 kV circuit${a.n > 1 ? 's' : ''} losing <b>${a.pct.toFixed(1)}%</b>, or <b>${c.n}</b> 765 kV circuit${c.n > 1 ? 's' : ''} losing <b>${c.pct.toFixed(1)}%</b> on a corridor ${Math.round(a.width / c.width * 10) / 10}× narrower.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- powerAngle ---------------- */
export function powerAngle(el) {
  const V = 380, XKM = 0.26, THERM = 1790;
  const st = { km: 300, d: 30 };
  let geo = null;
  const pmax = () => V * V / (XKM * st.km);
  const fig = new Fig(el, {
    label: 'Power transferred over a 380 kV line against the angle between the voltages at its two ends, with a phasor diagram',
    height: w => w < 600 ? 500 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, Pm = pmax(), ymax = Math.max(2500, Math.min(12000, Pm * 1.1));
      const A = narrow ? { l: 58, r: w - 16, t: 34, b: 250 } : { l: 64, r: w * 0.58, t: 34, b: h - 40 };
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 180, y0: 0, y1: ymax, xticks: [0, 30, 60, 90, 120, 150, 180], xfmt: v => v + '°', yfmt: v => v >= 1000 ? (v / 1000) + ' GW' : v + '', ylabel: 'power transferred', xlabel: 'angle δ between the two ends' });
      // regions
      ctx.fillStyle = alpha(HOT, 0.06); ctx.fillRect(sx(90), A.t, sx(180) - sx(90), A.b - A.t);
      text(ctx, 'unstable', sx(135), A.t + 14, { size: 10.5, color: HOT, align: 'center', weight: 600 });
      if (THERM < ymax) { line(ctx, A.l, sy(THERM), A.r, sy(THERM), C.hot, 1.2, [5, 4]); text(ctx, narrow ? 'thermal limit' : 'thermal limit of one circuit', A.r - 4, sy(THERM) - 6, { size: 10, color: C.hot, align: 'right', halo: true }); }
      const pts = []; for (let k = 0; k <= 180; k += 2) pts.push([sx(k), sy(Math.min(ymax, Pm * Math.sin(k * Math.PI / 180)))]);
      pathLine(ctx, pts, LINE, 2.4);
      const P = Pm * Math.sin(st.d * Math.PI / 180);
      line(ctx, sx(st.d), sy(0), sx(st.d), sy(Math.min(P, ymax)), C.ink, 1, [3, 3]);
      circle(ctx, sx(st.d), sy(Math.min(P, ymax)), 6, st.d > 90 ? HOT : LINE, '#fff', 2);
      if (Pm < ymax) text(ctx, `maximum ${Math.round(Pm).toLocaleString('en')} MW at 90°`, sx(90), sy(Pm) - 10, { size: 10.5, weight: 650, color: LINE, align: 'center', halo: true });
      geo = { A, sx };
      // phasors
      const R = narrow ? { l: 20, r: w - 20, t: 296, b: h - 10 } : { l: w * 0.62 + 10, r: w - 16, t: 30, b: h - 30 };
      const r = Math.min((R.r - R.l) * 0.42, (R.b - R.t) * 0.42), ox = narrow ? (R.l + R.r) / 2 - r * 0.3 : R.l + (R.r - R.l) * 0.3, oy = (R.t + R.b) / 2 + r * 0.35;
      text(ctx, 'phasors at the two ends', R.l, R.t + 4, { size: 11, weight: 500, color: C.ink3 });
      const d = st.d * Math.PI / 180;
      const p1 = [ox + r * Math.cos(d), oy - r * Math.sin(d)], p2 = [ox + r, oy];
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ox, oy, r, -Math.PI, 0); ctx.stroke();
      arrow(ctx, ox, oy, p2[0], p2[1], C.ink2, 2.2, 9); arrow(ctx, ox, oy, p1[0], p1[1], LINE, 2.4, 9);
      arrow(ctx, p2[0], p2[1], p1[0], p1[1], HOT, 1.8, 8);
      text(ctx, 'V₂ receiving end', p2[0] + 2, p2[1] + 16, { size: 10.5, weight: 650, color: C.ink2, align: 'center' });
      text(ctx, 'V₁ sending end', p1[0] + (st.d > 100 ? -6 : 6), p1[1] - 6, { size: 10.5, weight: 650, color: LINE, align: st.d > 100 ? 'right' : 'left', halo: true });
      if (st.d >= 12) { // on a phone the label would run off the right edge: put it on the other side of the arrow
        const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2 + 2, lab = 'voltage across the line = X·I';
        const fits = mx + 8 + measure(ctx, lab, 10) < w - 4, fits2 = mx + 8 + measure(ctx, 'voltage across', 10) < w - 4;
        if (fits) text(ctx, lab, mx + 8, my, { size: 10, color: HOT, halo: true });
        else if (fits2) { text(ctx, 'voltage across', mx + 8, my - 6, { size: 10, color: HOT, halo: true }); text(ctx, 'the line = X·I', mx + 8, my + 7, { size: 10, color: HOT, halo: true }); }
        else text(ctx, lab, mx - 8, my, { size: 10, color: HOT, halo: true, align: 'right' });
      }
      ctx.strokeStyle = C.ink3; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ox, oy, r * 0.28, -d, 0); ctx.stroke();
      text(ctx, 'δ', ox + r * 0.34 * Math.cos(d / 2), oy - r * 0.34 * Math.sin(d / 2) + 4, { size: 12, weight: 650, color: C.ink });
    },
  });
  fig.interact({ hit: (x, y) => geo && x >= geo.A.l && x <= geo.A.r && y >= geo.A.t && y <= geo.A.b ? 'd' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { st.d = clamp(Math.round(geo.sx.inv(x)), 0, 180); dsl.set(st.d); upd(); };
  const ctl = controls(el); const ro = readout(el);
  const dsl = slider(ctl, { label: 'Angle δ', min: 0, max: 180, step: 1, value: st.d, color: LINE, fmt: v => v + '°', oninput: v => { st.d = v; upd(); }, name: 'delta' });
  slider(ctl, { label: 'Line length', min: 25, max: 1200, step: 25, value: st.km, color: C.ink2, fmt: v => v + ' km', oninput: v => { st.km = v; upd(); }, name: 'len' });
  function upd() {
    const Pm = pmax(), P = Pm * Math.sin(st.d * Math.PI / 180), X = XKM * st.km;
    let s = `Reactance ${Math.round(X)} Ω. At δ = ${st.d}° the line carries <b>${Math.round(P).toLocaleString('en')} MW</b>; no angle can push more than <b>${Math.round(Pm).toLocaleString('en')} MW</b> through it. `;
    if (st.d > 90) s += 'Past 90°, more angle means <i>less</i> power: the two ends can no longer hold each other in step.';
    else if (Pm > THERM * 1.5) s += 'On a line this short the conductor overheats long before the angle becomes a problem.';
    else s += 'Operators keep a wide margin below 90°, so on a line this long the angle, not the conductor’s temperature, sets the limit.';
    ro.innerHTML = s; fig.invalidate();
  }
  upd();
}

/* ---------------- loadability ---------------- */
export function loadability(el) {
  const st = { km: 480 };
  let geo = null;
  const fig = new Fig(el, {
    label: 'How much power an AC line can carry against its length, for 345, 500 and 765 kV lines, with the thermal, voltage-drop and stability regions',
    height: w => w < 600 ? 380 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const A = { l: narrow ? 52 : 64, r: w - (narrow ? 16 : 120), t: 40, b: h - 44 };
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 1000, y0: 0, y1: 5500, xticks: [0, 200, 400, 600, 800, 1000], yticks: [0, 1000, 2000, 3000, 4000, 5000], xfmt: v => v + ' km', yfmt: v => v ? (v / 1000) + ' GW' : '0', ylabel: 'power one circuit can carry', xlabel: 'line length' });
      [[0, 80, 'thermal'], [80, 320, 'voltage drop'], [320, 1000, 'stability']].forEach(([a, b, s], i) => {
        ctx.fillStyle = alpha([HOT, C.solar, LINE][i], 0.06); ctx.fillRect(sx(a), A.t, sx(b) - sx(a), A.b - A.t);
        const lab = narrow ? ['therm.', 'V drop', 'stability'][i] : s;
        // On phone put the region labels just inside the top, clear of the y-axis title and of the low 345 kV curve.
        const labY = narrow ? A.t + 13 : (i === 2 ? A.t - 6 : A.b - 8);
        text(ctx, lab, (sx(a) + sx(b)) / 2, labY, { size: narrow ? 9.5 : 10, color: [HOT, darken(C.solar, 0.25), LINE][i], align: 'center', weight: 600, halo: true });
      });
      const cols = [lighten(LINE, 0.35), LINE, darken(LINE, 0.35)];
      VOLTS.forEach((v, i) => {
        const pts = []; for (let k = 10; k <= 1000; k += 10) pts.push([sx(k), sy(loadMW(v, k))]);
        pathLine(ctx, pts, cols[i], 2.4);
        const yEnd = sy(loadMW(v, 1000));
        if (!narrow) text(ctx, v.name, A.r + 6, yEnd + 4, { size: 11, weight: 650, color: cols[i] });
        else text(ctx, v.name, sx(1000) - 4, v.kv === 765 ? yEnd + 15 : yEnd - 6, { size: 10.5, weight: 650, color: cols[i], align: 'right', halo: true }); // 765 kV below its curve, clear of AEP's circle
      });
      // AEP anchors (miles → km)
      [[765, 550 * MI, 1500], [500, 140 * MI, 1500], [345, 50 * MI, 1500]].forEach(([kv, km, mw]) => circle(ctx, sx(km), sy(mw), 4, '#fff', C.ink, 1.5));
      if (!narrow) text(ctx, '○ AEP: reach of 1,500 MW', sx(1000), sy(1500) + 18, { size: 10, color: C.ink3, align: 'right' });
      else text(ctx, '○ AEP: reach of 1,500 MW', A.r - 2, A.t + 52, { size: 10, color: C.ink3, align: 'right', halo: true });
      line(ctx, sx(st.km), A.t, sx(st.km), A.b, C.ink, 1, [3, 3]);
      VOLTS.forEach((v, i) => circle(ctx, sx(st.km), sy(loadMW(v, st.km)), 4.5, cols[i], '#fff', 1.5));
      geo = { A, sx };
    },
  });
  fig.interact({ hit: (x, y) => geo && x >= geo.A.l && x <= geo.A.r && y >= geo.A.t && y <= geo.A.b ? 'k' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { st.km = clamp(Math.round(geo.sx.inv(x) / 10) * 10, 20, 1000); ksl.set(st.km); upd(); };
  const ctl = controls(el); const ro = readout(el);
  const ksl = slider(ctl, { label: 'Line length', min: 20, max: 1000, step: 10, value: st.km, color: C.ink2, fmt: v => v + ' km', oninput: v => { st.km = v; upd(); }, name: 'len' });
  function upd() {
    const ls = VOLTS.map(v => loadMW(v, st.km)), lim = st.km < 80 ? 'heat in the conductor' : st.km < 320 ? 'the voltage sagging along the line' : 'keeping the two ends in step';
    ro.innerHTML = `At ${st.km} km one circuit can carry about <b>${Math.round(ls[0] / 50) * 50} MW</b> at 345 kV, <b>${Math.round(ls[1] / 50) * 50} MW</b> at 500 kV and <b>${(Math.round(ls[2] / 100) / 10).toLocaleString('en')} GW</b> at 765 kV. The binding limit here is ${lim}.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- sagDLR ---------------- */
// ACSR 265/35 (264-AL1/34-ST1A): D = 22.4 mm, R20 = 0.1095 Ω/km DC (+2% for AC), α = 0.00403/K, max 80 °C.
// Conductor data and the 680 A table rating (35 °C air, 0.6 m/s wind, sun, 80 °C): EN 50182 conductor tables, e.g.
// Lumpi-Berndorf, https://www.lumpi-berndorf.at/fileadmin/downloads/Overhead_line_conductors_EN50182.pdf
// Rating conditions and coefficients: VDE FNN, Hinweise zur Umsetzung des witterungsabhängigen Freileitungsbetriebs
// (§4.1.6, 4.2.1–4.2.4): 35 °C, 0.6 m/s perpendicular, 900 W/m², emissivity = absorptivity = 0.84545.
// Check against VDE FNN Table 1 (243-AL1/39-ST1A, CIGRE TB 601: 634/749/968/930 A): this model gives 640/755/976/936 A.
// For 265/35 at the summer conditions it gives ≈671 A, 1.3% under the 680 A table value.
const COND = {
  acsr: { name: 'ACSR 265/35', D: 0.0224, R20: 0.1095e-3 * 1.02, a: 0.00403, Tmax: 80, exp: 18.9e-6 },
  accc: { name: 'ACCC (carbon-core) of the same diameter', D: 0.0224, R20: 0.083e-3 * 1.02, a: 0.00403, Tmax: 180, exp: 1.6e-6, knee: 70, exp2: 18.9e-6 },
};
const SIG = 5.67e-8, EPS = 0.84545; // emissivity = absorptivity (VDE FNN §4.2.4, ten-year-old conductor)
export function heatLoss(T, Ta, v, S, D) {
  const dT = T - Ta, Tf = (T + Ta) / 2, rho = 1.293 / (1 + 0.00367 * Tf), mu = 1.458e-6 * (Tf + 273) ** 1.5 / (Tf + 383.4), kf = 2.424e-2 + 7.477e-5 * Tf;
  const Re = rho * Math.max(v, 0) * D / mu, Nu = Re < 2650 ? 0.641 * Re ** 0.471 : 0.048 * Re ** 0.8;
  const qf = Math.PI * kf * dT * Nu, qn = 3.645 * Math.sqrt(rho) * D ** 0.75 * Math.max(dT, 0) ** 1.25;
  return Math.max(qf, qn) + Math.PI * D * EPS * SIG * ((T + 273) ** 4 - (Ta + 273) ** 4) - EPS * S * D;
}
export const condR = (c, T) => c.R20 * (1 + c.a * (T - 20));
export const rating = (c, Ta, v, S) => Math.sqrt(Math.max(0, heatLoss(c.Tmax, Ta, v, S, c.D)) / condR(c, c.Tmax));
export function condTemp(c, I, Ta, v, S) {
  let lo = Ta - 20, hi = 400;
  for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2; if (heatLoss(m, Ta, v, S, c.D) > I * I * condR(c, m)) hi = m; else lo = m; }
  return (lo + hi) / 2;
}
export function sagAt(c, T) { // parabolic sag of a 400 m span, 9.0 m at 10 °C; thermal expansion only
  const L = 400, s0 = 9.0, slack0 = 8 * s0 * s0 / (3 * L);
  let dl;
  if (c.knee && T > c.knee) dl = c.exp2 * (c.knee - 10) * L + c.exp * (T - c.knee) * L; else dl = (c.exp2 || c.exp) * (T - 10) * L;
  return Math.sqrt(Math.max(0.5, 3 * L * Math.max(slack0 + dl, 0.01) / 8));
}
export function sagDLR(el) {
  const st = { Ta: 15, v: 1.5, S: 600, I: 900, c: 'acsr' };
  const STATIC = rating(COND.acsr, 35, 0.6, 900);
  const fig = new Fig(el, {
    label: 'A span of overhead conductor between two towers: its temperature and sag for the chosen current and weather, and the rating the weather allows',
    height: w => w < 600 ? 420 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, c = COND[st.c], T = condTemp(c, st.I, st.Ta, st.v, st.S), sag = sagAt(c, T), sagMax = sagAt(c, c.Tmax);
      const P = { l: 30, r: narrow ? w - 30 : w * 0.66, t: 40, b: narrow ? 250 : h - 30 };
      const towerH = 40, attach = P.t + 14, ground = P.b - 6, mPerPx = 30 / (ground - attach);
      ctx.fillStyle = alpha(C.biomass, 0.18); ctx.fillRect(P.l - 10, ground, P.r - P.l + 20, 6);
      // clearance line: 8 m above ground
      const clr = ground - 8 / mPerPx;
      line(ctx, P.l, clr, P.r, clr, HOT, 1, [4, 4]); text(ctx, 'minimum clearance', P.r - 16, clr - 5, { size: 10, color: HOT, align: 'right', halo: true });
      [P.l, P.r].forEach(x => { ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 9, ground); ctx.lineTo(x, attach - 6); ctx.lineTo(x + 9, ground); ctx.stroke(); line(ctx, x - 16, attach, x + 16, attach, C.ink2, 2); });
      const curve = s => { const pts = []; for (let k = 0; k <= 60; k++) { const u = k / 60, x = lerp(P.l, P.r, u); pts.push([x, attach + 4 * s * u * (1 - u) / mPerPx]); } return pts; };
      pathLine(ctx, curve(sagMax), alpha(HOT, 0.5), 1.2, [3, 3]);
      const col = mix(LINE, HOT, clamp((T - 20) / Math.max(1, c.Tmax - 20), 0, 1));
      pathLine(ctx, curve(sag), col, 3);
      text(ctx, `sag ${sag.toFixed(1)} m at ${Math.round(T)} °C`, (P.l + P.r) / 2, attach + sag / mPerPx + 18, { size: 11, weight: 650, color: col, align: 'center', halo: true });
      if (narrow) text(ctx, `dashed: sag at the ${c.Tmax} °C limit`, (P.l + P.r) / 2, attach + Math.max(sag, sagMax) / mPerPx + 33, { size: 9.5, color: alpha(HOT, 0.9), align: 'center', halo: true });
      else text(ctx, `sag at the ${c.Tmax} °C limit`, (P.l + P.r) / 2 + 80, attach + sagMax / mPerPx + 16, { size: 9.5, color: alpha(HOT, 0.9), align: 'left', halo: true });
      text(ctx, '400 m span', (P.l + P.r) / 2, P.t - 12, { size: 10.5, color: C.ink3, align: 'center' });
      // weather arrows
      for (let k = 0; k < Math.round(st.v); k++) arrow(ctx, P.l + 30 + k * 16, P.t - 22 + (k % 2) * 5, P.l + 42 + k * 16, P.t - 22 + (k % 2) * 5, alpha(C.wind, 0.8), 1.4, 5);
      // rating bars
      const R = narrow ? { l: 30, r: w - 20, t: 290, b: h - 16 } : { l: w * 0.7, r: w - 20, t: 40, b: h - 30 };
      const dyn = rating(c, st.Ta, st.v, st.S), mx = 2600;
      const rows = [['static rating (hot, still, sunny day)', STATIC, C.ink3], ['what this weather allows', dyn, LINE], ['current now', st.I, T > c.Tmax ? HOT : C.ink]];
      const bw = R.r - R.l, rh = (R.b - R.t) / 3;
      rows.forEach(([s, v, cc], i) => {
        const y = R.t + i * rh;
        text(ctx, s, R.l, y + 10, { size: 10.5, color: C.ink2, weight: 600 });
        ctx.fillStyle = alpha(cc, i === 2 ? 0.9 : 0.75); ctx.fillRect(R.l, y + 16, bw * Math.min(1, v / mx), 12);
        text(ctx, Math.round(v).toLocaleString('en') + ' A', Math.min(R.l + bw * Math.min(1, v / mx) + 5, R.r - 44), y + 26, { size: 10.5, weight: 650, color: C.ink, halo: true });
      });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Current', min: 100, max: 2400, step: 10, value: st.I, color: HOT, fmt: v => v.toLocaleString('en') + ' A', oninput: v => { st.I = v; upd(); }, name: 'I' });
  slider(ctl, { label: 'Wind across the line', min: 0, max: 10, step: 0.1, value: st.v, color: C.wind, fmt: v => v.toFixed(1) + ' m/s', oninput: v => { st.v = v; upd(); }, name: 'wind' });
  const mo = more(ctl, 'More: weather and conductor');
  slider(mo, { label: 'Air temperature', min: -10, max: 40, step: 1, value: st.Ta, color: C.cold, fmt: v => v + ' °C', oninput: v => { st.Ta = v; upd(); }, name: 'Ta' });
  slider(mo, { label: 'Sunshine', min: 0, max: 1000, step: 10, value: st.S, color: C.solar, fmt: v => v + ' W/m²', oninput: v => { st.S = v; upd(); }, name: 'sun' });
  segmented(mo, { label: 'Conductor', options: [{ label: 'Steel-reinforced aluminium (ACSR)', value: 'acsr', name: 'c-acsr' }, { label: 'Advanced (carbon-core)', value: 'accc', name: 'c-accc' }], value: st.c, onchange: v => { st.c = v; upd(); } });
  function upd() {
    const c = COND[st.c], T = condTemp(c, st.I, st.Ta, st.v, st.S), dyn = rating(c, st.Ta, st.v, st.S);
    let s = `The conductor runs at <b>${Math.round(T)} °C</b> (limit ${c.Tmax} °C). In this weather it could carry <b>${Math.round(dyn).toLocaleString('en')} A</b>, ${dyn >= STATIC ? '<b>' + Math.round((dyn / STATIC - 1) * 100) + '% more</b>' : '<b>' + Math.round((1 - dyn / STATIC) * 100) + '% less</b>'} than the static rating of ${Math.round(STATIC)} A that assumes a hot, still, sunny day.`;
    if (T > c.Tmax) s += ' <b>Too hot:</b> the line sags below its safe clearance and the aluminium starts to lose strength.';
    ro.innerHTML = s; fig.invalidate();
  }
  upd();
}
