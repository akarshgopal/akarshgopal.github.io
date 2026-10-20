// Transmission post, part 2: the meshed grid, congestion and HVDC.
//  loopFlow     — Germany-like four-zone network: north→south transfer, loop flows through neighbours, a phase shifter and an HVDC link — model
//  redispatch   — German congestion-management costs 2017–2025 (BNetzA) — real
//  breakEven    — cost of AC vs DC transmission against distance, overhead and cable — model (break-even ranges cited)
//  hvdcProjects — selected HVDC links: length, capacity, voltage, year — real
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import * as D0 from '../lib/draw.js';
import { rrect, line, circle, arrow, clamp, lerp, pathLine, scale } from '../lib/draw.js';
import { curDraw, euroFigure } from '../lib/currency.js';
const { text, measure, axes } = curDraw(D0);
import { controls, slider, segmented, readout, hint, more } from '../lib/ui.js';
import { TX } from '../lib/txdata.js';
import { HOT, LINE, DC } from './txl1.js';

/* ---------------- loopFlow ---------------- */
// Nodes: 0 North DE (wind surplus), 1 South DE (load), 2 West (NL/BE/FR), 3 East (PL/CZ). Slack = South.
const NODES = [
  { name: 'North Germany', sub: 'wind', x: 0.5, y: 0.12 },
  { name: 'South Germany', sub: 'industry, load', x: 0.5, y: 0.88 },
  { name: 'West', sub: 'NL · BE · FR', x: 0.13, y: 0.5 },
  { name: 'East', sub: 'PL · CZ', x: 0.87, y: 0.5 },
];
const LINES = [ // from, to, reactance (relative), limit GW
  { a: 0, b: 1, x: 1.0, lim: 8, name: 'internal north–south lines' },
  { a: 0, b: 2, x: 1.5, lim: 3, name: 'north → west' },
  { a: 2, b: 1, x: 1.5, lim: 3, name: 'west → south' },
  { a: 0, b: 3, x: 1.5, lim: 3, name: 'north → east' },
  { a: 3, b: 1, x: 1.5, lim: 3, name: 'east → south' },
];
function solve(inj, pst) { // DC power flow; pst = phase shift on line 3 expressed as GW-equivalent (φ/x)
  // reduced system without slack (node 1): unknown θ0, θ2, θ3
  const idx = [0, 2, 3], B = idx.map(() => idx.map(() => 0)), P = idx.map(i => inj[i]);
  LINES.forEach((l, k) => {
    const y = 1 / l.x, ia = idx.indexOf(l.a), ib = idx.indexOf(l.b);
    if (ia >= 0) B[ia][ia] += y; if (ib >= 0) B[ib][ib] += y;
    if (ia >= 0 && ib >= 0) { B[ia][ib] -= y; B[ib][ia] -= y; }
    if (k === 3) { if (ia >= 0) P[ia] += pst; if (ib >= 0) P[ib] -= pst; }
  });
  // 3x3 Gaussian elimination
  const M = B.map((r, i) => [...r, P[i]]);
  for (let i = 0; i < 3; i++) { let p = i; for (let j = i + 1; j < 3; j++) if (Math.abs(M[j][i]) > Math.abs(M[p][i])) p = j; [M[i], M[p]] = [M[p], M[i]]; for (let j = i + 1; j < 3; j++) { const f = M[j][i] / M[i][i]; for (let k = i; k < 4; k++) M[j][k] -= f * M[i][k]; } }
  const th = [0, 0, 0]; for (let i = 2; i >= 0; i--) { let s = M[i][3]; for (let k = i + 1; k < 3; k++) s -= M[i][k] * th[k]; th[i] = s / M[i][i]; }
  const theta = [th[0], 0, th[1], th[2]];
  return LINES.map((l, k) => (theta[l.a] - theta[l.b]) / l.x - (k === 3 ? pst : 0));
}
export function loopFlow(el) {
  const st = { T: 14, dc: 0, pst: 0 };
  const run = T => { const dcf = Math.min(st.dc, T); const inj = [T - dcf, -(T - dcf), 0, 0]; return { f: solve(inj, st.pst), dcf }; };
  const maxFeasible = () => { let lo = 0, hi = 40; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; const { f } = run(m); if (f.every((v, i) => Math.abs(v) <= LINES[i].lim + 1e-9)) lo = m; else hi = m; } return lo; };
  const fig = new Fig(el, {
    label: 'A four-zone network: power sent from north to south Germany spreads over every parallel path, including through neighbouring countries; a phase shifter and an HVDC link change the split',
    height: w => w < 600 ? 440 : 420, animated: true, step() {},
    draw(ctx, w, h, f) {
      const narrow = w < 600, P = { l: narrow ? 40 : 120, r: w - (narrow ? 40 : 120), t: 40, b: h - 40 };
      const pos = n => [lerp(P.l, P.r, n.x), lerp(P.t, P.b, n.y)];
      const { f: flows, dcf } = run(st.T);
      // HVDC link (drawn slightly right of the centre line)
      if (st.dc > 0) {
        const [x0, y0] = pos(NODES[0]), [x1, y1] = pos(NODES[1]), off = narrow ? 22 : 34;
        ctx.strokeStyle = DC; ctx.lineWidth = 2 + dcf * 0.9; ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(x0 + off, y0 + 18); ctx.bezierCurveTo(x0 + off * 2.2, (y0 + y1) / 2 - 40, x0 + off * 2.2, (y0 + y1) / 2 + 40, x1 + off, y1 - 18); ctx.stroke();
        text(ctx, `HVDC ${dcf.toFixed(1)} GW`, x0 + off * 2.2 + 6, (y0 + y1) / 2 + 4, { size: 10.5, weight: 650, color: DC, halo: true });
      }
      LINES.forEach((l, k) => {
        const [x0, y0] = pos(NODES[l.a]), [x1, y1] = pos(NODES[l.b]), fl = flows[k], over = Math.abs(fl) > l.lim + 1e-6;
        const col = over ? HOT : LINE, wdt = 2 + Math.abs(fl) * 0.9;
        const ox = k === 0 ? (narrow ? -14 : -20) : 0;
        ctx.strokeStyle = alpha(col, 0.85); ctx.lineWidth = wdt; ctx.beginPath(); ctx.moveTo(x0 + ox, y0 + (k === 0 ? 18 : 0)); ctx.lineTo(x1 + ox, y1 - (k === 0 ? 18 : 0)); ctx.stroke();
        // moving dots (speed ∝ flow)
        const n = Math.max(1, Math.round(Math.abs(fl) * 0.8)), dir = fl >= 0 ? 1 : -1;
        for (let j = 0; j < n; j++) { const u = ((f.t * (0.06 + 0.035 * Math.abs(fl)) * dir + j / n) % 1 + 1) % 1; const xa = x0 + ox, ya = y0 + (k === 0 ? 18 : 0), xb = x1 + ox, yb = y1 - (k === 0 ? 18 : 0); circle(ctx, lerp(xa, xb, u), lerp(ya, yb, u), 2.6, '#fff', null); }
        const mx = (x0 + x1) / 2 + ox, my = (y0 + y1) / 2;
        const lab = `${Math.abs(fl).toFixed(1)} / ${l.lim} GW`;
        const dx = k === 0 ? -8 : (l.a === 0 && l.b === 2) || (l.a === 2) ? -6 : 6, al = k === 0 || l.a === 2 || l.b === 2 ? 'right' : 'left';
        const nsN = narrow && k === 0; // on a phone the internal-line label sits level with the West node, the widest gap
        text(ctx, lab, nsN ? mx - 10 : mx + dx, my + (k === 0 ? 4 : (l.a === 0 ? -6 : 14)), { size: narrow ? 10 : 11, weight: 650, color: over ? HOT : C.ink2, align: nsN ? 'right' : al, halo: true });
        if (k === 3 && st.pst) { const px = lerp(x0, x1, 0.62), py = lerp(y0, y1, 0.62); circle(ctx, px - 5, py, 6, '#fff', darken(LINE, 0.3), 1.6); circle(ctx, px + 5, py, 6, null, darken(LINE, 0.3), 1.6); text(ctx, 'phase shifter', px + 14, py + 4, { size: 10, color: darken(LINE, 0.3), halo: true }); }
      });
      NODES.forEach((n, i) => {
        const [x, y] = pos(n), r = narrow ? 17 : 20;
        circle(ctx, x, y, r, i === 0 ? C.wind : i === 1 ? C.ink2 : C.imports, '#fff', 2);
        const below = i === 1, side = i === 2 ? -1 : i === 3 ? 1 : 0;
        const tx = side ? x + side * (r + 6) : x, ty = side ? y - 2 : below ? y + r + 15 : y - r - 18, al = side < 0 ? 'right' : side > 0 ? 'left' : 'center';
        const sxo = side && narrow ? side * 14 : 0;
        text(ctx, n.name, side ? x + sxo : tx, side ? y + r + 15 : ty, { size: 11.5, weight: 700, color: C.ink, align: 'center' });
        text(ctx, n.sub, side ? x + sxo : tx, (side ? y + r + 15 : ty) + 13, { size: 10, color: C.ink3, align: 'center' });
      });
      const [nx, ny] = pos(NODES[0]); text(ctx, `+${st.T} GW surplus`, nx + (narrow ? 24 : 28), ny + 4, { size: 10.5, weight: 650, color: darken(C.wind, 0.2) });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Wind surplus in the north', min: 0, max: 20, step: 0.5, value: st.T, color: C.wind, fmt: v => v + ' GW', oninput: v => { st.T = v; upd(); }, name: 'T' });
  const mo = more(ctl, 'More: phase shifter and HVDC');
  slider(mo, { label: 'Phase shifter on the eastern border', min: 0, max: 3, step: 0.1, value: st.pst, color: darken(LINE, 0.3), fmt: v => v ? '−' + v.toFixed(1) + ' GW' : 'off', oninput: v => { st.pst = v; upd(); }, name: 'pst' });
  segmented(mo, { label: 'North–south HVDC link', options: [{ label: 'None', value: 0, name: 'dc-0' }, { label: '2 GW', value: 2, name: 'dc-2' }, { label: '4 GW (like SuedLink)', value: 4, name: 'dc-4' }], value: 0, onchange: v => { st.dc = v; upd(); } });
  function upd() {
    const { f } = run(st.T), loop = Math.abs(f[1]) + Math.abs(f[3]), ok = maxFeasible(), over = f.some((v, i) => Math.abs(v) > LINES[i].lim + 1e-6);
    let s = `Of ${st.T} GW sent south, <b>${(st.T ? loop / Math.max(st.T, 1e-9) * 100 : 0).toFixed(0)}%</b> takes the long way round through neighbouring countries. `;
    s += over ? `Some lines are overloaded: the network can only carry <b>${ok.toFixed(1)} GW</b>, so <b>${(st.T - ok).toFixed(1)} GW</b> must be redispatched: wind turned down in the north, power stations turned up in the south. Germany paid about <b>$3.5 billion</b> for this in 2025.` : 'Every line is within its limit.';
    ro.innerHTML = s; fig.invalidate();
  }
  upd();
  hint(el, 'turn the phase shifter up and see the loop flow through the neighbours shrink.');
}

/* ---------------- redispatch ---------------- */
export function redispatch(el) {
  const st = { hover: null };
  let geo = null;
  const CATS = [['Redispatch of power plants, incl. curtailed renewables', LINE], ['Reserve power plants', C.coal], ['Countertrading across borders', C.price]];
  const fig = new Fig(el, {
    label: 'Annual cost of congestion management in Germany, 2017 to 2025, split into redispatch, reserve power plants and countertrading',
    height: w => w < 600 ? 360 : 330,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 46 : 60, r: w - 16, t: narrow ? 70 : 52, b: h - 34 };
      const { sx, sy } = axes(ctx, { box: A, x0: 2016.5, x1: 2025.5, y0: 0, y1: 4500, xticks: TX.nem.map(r => r[0]).filter((y, i) => !narrow || i % 2 === 0), xfmt: String, yticks: [0, 1000, 2000, 3000, 4000], yfmt: v => v ? '€' + v / 1000 + ' bn' : '0', ylabel: 'cost per year' });
      const bw = (sx(1) - sx(0)) * 0.62;
      TX.nem.forEach(r => {
        let y0 = 0; const x = sx(r[0]);
        [r[1], r[2], r[3]].forEach((v, k) => { ctx.fillStyle = alpha(CATS[k][1], st.hover && st.hover[0] !== r[0] ? 0.35 : 0.9); ctx.fillRect(x - bw / 2, sy(y0 + v), bw, sy(y0) - sy(y0 + v)); y0 += v; });
        const ee = TX.nemEE[r[0]]; if (ee) { ctx.strokeStyle = '#fff'; ctx.setLineDash([2, 2]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - bw / 2, sy(r[1] - ee)); ctx.lineTo(x + bw / 2, sy(r[1] - ee)); ctx.stroke(); ctx.setLineDash([]); }
        if (!narrow || st.hover?.[0] === r[0]) text(ctx, '€' + (y0 / 1000).toFixed(1), x, sy(y0) - 6, { size: 10.5, weight: 650, color: C.ink, align: 'center' });
      });
      let lx = A.l, ly = narrow ? 14 : 16;
      CATS.forEach(([s, c], k) => { const W = measure(ctx, s, 10.5) + 26; if (lx + W > w - 10) { lx = A.l; ly += 15; } ctx.fillStyle = c; ctx.fillRect(lx, ly - 8, 10, 10); text(ctx, s, lx + 14, ly + 1, { size: 10.5, color: C.ink2 }); lx += W; });
      geo = { A, sx };
    },
  });
  fig.interact({ hit: (x, y) => geo && x > geo.A.l && x < geo.A.r && y > geo.A.t - 20 && y < geo.A.b ? 'h' : null, cursor: 'crosshair', hover: (o, x) => { st.hover = o ? TX.nem.find(r => r[0] === Math.round(geo.sx.inv(x))) || null : null; upd(); } });
  const ro = readout(el);
  function upd() {
    const r = st.hover;
    if (r) { const ee = TX.nemEE[r[0]], tot = r[1] + r[2] + r[3]; ro.innerHTML = `<b>${r[0]}</b>${r[4] ? '' : ' (preliminary)'}: <b>€${(tot / 1000).toFixed(2)} bn</b> in total — redispatch €${Math.round(r[1])} m${ee ? ` (of which €${Math.round(ee)} m compensation for curtailed renewables)` : ''}, reserve plants €${Math.round(r[2])} m, countertrading €${Math.round(r[3])} m.`; }
    else { const a = TX.nem[0], b = TX.nem[TX.nem.length - 1], t = r => r[1] + r[2] + r[3]; ro.innerHTML = `Congestion management cost about <b>€${(t(a) / 1000).toFixed(1)} bn</b> in ${a[0]} and <b>€${(t(b) / 1000).toFixed(1)} bn</b> in ${b[0]}, after a peak of €${(t(TX.nem[5]) / 1000).toFixed(1)} bn in the 2022 gas crisis. The dashed line marks the part paid to curtailed wind and solar.`; }
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, controls(el), 'eu-redispatch');
}

/* ---------------- breakEven ---------------- */
// Illustrative costs for 2 GW, € million: [terminal, per km, compensation step every N km (cost), loss cost per km, fixed loss cost]
const TECH = {
  ohl: [
    { name: 'AC overhead (380 kV)', col: LINE, term: 60, km: 1.6, step: [300, 40], lossKm: 0.54, lossFix: 0, max: 1e9 },
    { name: 'DC overhead (±525 kV)', col: DC, term: 700, km: 0.8, step: null, lossKm: 0.11, lossFix: 52, max: 1e9 },
  ],
  cable: [
    { name: 'AC cable (380 kV)', col: LINE, term: 60, km: 7.5, step: [50, 80], lossKm: 0.3, lossFix: 0, max: 150 },
    { name: 'DC cable (±525 kV)', col: DC, term: 700, km: 2.5, step: null, lossKm: 0.11, lossFix: 52, max: 1e9 },
  ],
};
const cost = (t, L, conv) => (t.term === 700 ? conv : t.term) + t.km * L + (t.step ? Math.floor(L / t.step[0]) * t.step[1] : 0) + t.lossKm * L + t.lossFix;
export function breakEven(el) {
  const st = { mode: 'ohl', conv: 700, L: 600 };
  let geo = null;
  const be = () => { const [a, d] = TECH[st.mode]; for (let L = 1; L <= 2000; L++) if (cost(d, L, st.conv) <= cost(a, L, st.conv) || L > a.max) return L; return null; };
  const fig = new Fig(el, {
    label: 'Total cost of a 2 GW link against distance for AC and DC, as overhead lines or as cables, with the break-even distance',
    height: w => w < 600 ? 360 : 330,
    draw(ctx, w, h) {
      const narrow = w < 600, xmax = st.mode === 'ohl' ? 1500 : 400;
      const A = { l: narrow ? 52 : 64, r: w - 16, t: 40, b: h - 40 };
      const ymax = st.mode === 'ohl' ? 4500 : 3500;
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: xmax, y0: 0, y1: ymax, yfmt: v => v ? '€' + (v / 1000) + ' bn' : '0', xticks: narrow ? (st.mode === 'ohl' ? [0, 500, 1000, 1500] : [0, 100, 200, 300, 400]) : undefined, xfmt: v => v + ' km', ylabel: 'lifetime cost of a 2 GW link (construction + losses)', xlabel: 'distance' });
      const [a, d] = TECH[st.mode], b = be();
      if (b && b < xmax) { ctx.fillStyle = alpha(DC, 0.06); ctx.fillRect(sx(b), A.t, A.r - sx(b), A.b - A.t); line(ctx, sx(b), A.t, sx(b), A.b, DC, 1.2, [4, 3]); text(ctx, `DC cheaper beyond ~${Math.round(b / 10) * 10} km`, sx(b) + 6, A.t + 14, { size: 10.5, weight: 650, color: DC, halo: true }); }
      [a, d].forEach(t => {
        const pts = []; for (let L = 0; L <= Math.min(xmax, t.max); L += 2) pts.push([sx(L), sy(Math.min(ymax, cost(t, L, st.conv)))]);
        pathLine(ctx, pts, t.col, 2.4);
        const Le = Math.min(xmax, t.max) * (t.max < xmax ? 1 : 0.97), yv = cost(t, Le, st.conv);
        if (t.max < xmax) { text(ctx, narrow ? '✕ charging limit' : '✕ charging current uses up the cable', sx(t.max) + 4, sy(Math.min(ymax, yv)) + (narrow ? 18 : 4), { size: 10, color: HOT, halo: true }); }
        const o = t === a ? d : a, oy = o.max < Le ? -Infinity : cost(o, Le, st.conv);
        // below its line, the label must clear the line where it is lowest: at the label's left end
        const Ll = Math.max(0, sx.inv(sx(Le) - 4 - measure(ctx, t.name, 11))), yb = Math.max(sy(Math.min(ymax, yv)) + 26, sy(Math.min(ymax, cost(t, Ll, st.conv))) + 15);
        text(ctx, t.name, sx(Le) - 4, yv >= oy ? sy(Math.min(ymax, yv)) - 12 : yb, { size: 11, weight: 650, color: t.col, align: 'right', halo: true });
      });
      geo = { A, sx };
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Route', options: [{ label: 'Overhead lines', value: 'ohl', name: 'be-ohl' }, { label: 'Underground or subsea cables', value: 'cable', name: 'be-cable' }], value: st.mode, onchange: v => { st.mode = v; upd(); } });
  slider(more(ctl, 'More: converter cost'), { label: 'Cost of the two converter stations', min: 300, max: 1200, step: 25, value: st.conv, color: DC, fmt: v => '€' + v + ' m', oninput: v => { st.conv = v; upd(); }, name: 'conv' });
  function upd() {
    const b = be();
    ro.innerHTML = st.mode === 'ohl'
      ? `With these costs DC overhead lines become cheaper beyond about <b>${Math.round(b / 10) * 10} km</b>. DC needs expensive converter stations at each end, but its line is cheaper, loses less and never needs reactive compensation along the way. Published estimates of the break-even range from about 300 to 800 km.`
      : `With cables the break-even is much shorter: about <b>${Math.round(b / 10) * 10} km</b> here. An AC cable is a long capacitor, and the current needed just to charge it on every cycle eats into its rating until, after somewhere above 100 km, nothing is left for the load. Published estimates put the break-even at about 50 to 100 km.`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, typeof ctl !== 'undefined' ? ctl : controls(el), 'eu-breakeven');
}

/* ---------------- hvdcProjects ---------------- */
const PROJ = [
  { n: 'Pacific DC Intertie', c: 'US', y: 1970, km: 1362, gw: 3.22, kv: 500, t: 'LCC', r: 'overhead', note: 'Columbia River hydropower to Los Angeles; upgraded several times since 1970', s: 'n20' },
  { n: 'Xiangjiaba–Shanghai', c: 'China', y: 2010, km: 1980, gw: 6.4, kv: 800, t: 'LCC', r: 'overhead', note: 'the first ultra-high-voltage DC link in commercial operation', s: 'n20' },
  { n: 'Changji–Guquan', c: 'China', y: 2019, km: 3293, gw: 12, kv: 1100, t: 'LCC', r: 'overhead', note: 'Xinjiang to Anhui; the first ±1,100 kV line', s: 'n20' },
  { n: 'Belo Monte–Rio', c: 'Brazil', y: 2019, km: 2518, gw: 4.0, kv: 800, t: 'LCC', r: 'overhead', note: 'Amazon hydropower to Rio de Janeiro; the second of two 4 GW Belo Monte bipoles', s: 'n24' },
  { n: 'NordLink', c: 'NO–DE', y: 2021, km: 623, gw: 1.4, kv: 525, t: 'VSC', r: 'subsea + land cable', note: 'Norwegian hydropower ↔ German wind; about $2 billion', s: 'n21' },
  { n: 'Viking Link', c: 'UK–DK', y: 2023, km: 765, gw: 1.4, kv: 525, t: 'VSC', r: 'subsea + land cable', note: 'when opened, the world’s longest land and subsea interconnector', s: 'n21' },
  { n: 'SunZia', c: 'US', y: 2026, km: 885, gw: 3.0, kv: 525, t: 'VSC', r: 'overhead', note: 'New Mexico wind to Arizona; first proposed more than 18 years before it opened', s: 'n22' },
  { n: 'SuedLink', c: 'Germany', y: 2028, km: 700, gw: 4.0, kv: 525, t: 'VSC', r: 'underground cable', note: 'two 2 GW links, under construction; about $11 billion', s: 'n19' },
];
export function hvdcProjects(el) {
  const st = { sel: 2 };
  let geo = [];
  const fig = new Fig(el, {
    label: 'Selected HVDC links plotted by length and capacity, with voltage and converter type',
    height: w => w < 600 ? 420 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 46 : 60, r: w - 20, t: 36, b: h - (narrow ? 84 : 40) };
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 3600, y0: 0, y1: 13, xticks: [0, 1000, 2000, 3000], yticks: [0, 4, 8, 12], xfmt: v => v.toLocaleString('en') + ' km', yfmt: v => v + ' GW', ylabel: 'capacity', xlabel: 'length' });
      geo = [];
      PROJ.forEach((p, i) => {
        const x = sx(p.km), y = sy(p.gw), r = narrow ? 2.5 + p.kv / 200 : 4 + p.kv / 110, sel = st.sel === i;
        circle(ctx, x, y, r, alpha(p.t === 'LCC' ? C.coal : DC, sel ? 0.9 : 0.55), sel ? C.ink : '#fff', sel ? 2 : 1.2);
        if (p.y > 2026) { ctx.setLineDash([3, 2]); circle(ctx, x, y, r + 3, null, C.ink3, 1); ctx.setLineDash([]); }
        const right = x < A.r - (narrow ? 110 : 140) && !(narrow && p.n === 'SunZia');
        const dy = p.n === 'NordLink' ? -r - 6 : p.n === 'Viking Link' ? r + 13 : p.n === 'SuedLink' ? -r - 6 : (narrow && p.n === 'Changji–Guquan') ? r + 14 : 4;
        const dx = p.n === 'NordLink' || p.n === 'Viking Link' || p.n === 'SuedLink' ? 0 : (narrow && p.n === 'Changji–Guquan') ? 0 : (right ? r + 6 : -r - 6);
        text(ctx, p.n, x + dx, y + dy, { size: narrow ? 9.5 : 10.5, weight: sel ? 700 : 550, color: C.ink, align: dx === 0 ? (p.n === 'SuedLink' ? 'left' : p.n === 'Changji–Guquan' ? 'right' : 'center') : right ? 'left' : 'right', halo: true });
        geo.push({ i, x, y, r: Math.max(r, 12) });
      });
      // legend
      const lx = A.l + 16, ly = narrow ? A.b + 40 : A.t + 4;
      circle(ctx, lx, ly, 5, alpha(C.coal, 0.7), '#fff', 1); text(ctx, 'thyristor (LCC)', lx + 9, ly + 4, { size: 10, color: C.ink2 });
      circle(ctx, lx, ly + 16, 5, alpha(DC, 0.7), '#fff', 1); text(ctx, 'transistor (VSC)', lx + 9, ly + 20, { size: 10, color: C.ink2 });
      text(ctx, 'dot size = voltage; dashed = under construction', lx - 6, ly + 36, { size: 9.5, color: C.ink3 });
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => Math.hypot(x - g.x, y - g.y) < g.r) || null, cursor: 'pointer', down: o => { st.sel = o.i; upd(); }, hover: o => { if (o && o.i !== st.sel) { st.sel = o.i; upd(); } } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Project', options: PROJ.map((p, i) => ({ label: p.n, value: i, name: 'pj-' + i })), value: st.sel, onchange: v => { st.sel = v; upd(); } });
  const seg = ctl.querySelector('.segmented');
  function upd() {
    const p = PROJ[st.sel];
    seg.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === st.sel)));
    ro.innerHTML = `<b>${p.n}</b> (${p.c}, ${p.y > 2026 ? 'due ' + p.y : p.y}): ${p.km.toLocaleString('en')} km, ${p.gw.toLocaleString('en')} GW at ±${p.kv.toLocaleString('en')} kV, ${p.t === 'LCC' ? 'thyristor (line-commutated)' : 'transistor (voltage-source)'} converters, ${p.r}. ${p.note[0].toUpperCase() + p.note.slice(1)}.<sup class="fn"><a href="#${p.s}">${p.s.slice(1)}</a></sup>`;
    fig.invalidate();
  }
  upd();
}
