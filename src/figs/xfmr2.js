// Transformers post, part 2: connections, voltage control, the family, the shortage, solid-state.
// percent to 2 significant figures without exponent notation (100, 45, 3.2, 0.071)
const pct2 = v => v >= 99.5 ? Math.round(v).toLocaleString('en') : +v.toPrecision(2) + '';
const sgn = v => (v > 0.05 ? '+' : v < -0.05 ? '−' : '') + Math.abs(v).toFixed(1);
//  threePhase    — vector groups (Yy0, Dyn11, Dyn5, Yd1): windings, phasors and the 30° shift — model
//  tapChanger    — a feeder with load and rooftop solar, and an on-load tap changer trying to keep everyone within ±10% — model
//  family        — from generator to socket: the chain of transformers and typical sizes — typical values + DOE/NREL ranges
//  shortage      — US transformer producer price index vs consumer prices, and lead times — real
//  sizeFrequency — why higher frequency shrinks the magnetics, and what solid-state transformers trade for it — model
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import { text, measure, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint, more } from '../lib/ui.js';
import { XF } from '../lib/xfmrdata.js';
import { COPPER, IRON, FLUX, SAT } from './xfmr1.js';
const PH = [C.phaseA, C.phaseB, C.phaseC];

/* ---------------- threePhase ---------------- */
const GROUPS = {
  Yy0: { hv: 'Y', lv: 'Y', k: 0, note: 'Star–star, no phase shift. Simple, but it gives no path for certain harmonic currents, so it usually needs an extra delta winding.' },
  Dyn11: { hv: 'D', lv: 'Y', k: 11, note: 'Delta on the high-voltage side, star with an earthed neutral on the low-voltage side: the standard European distribution transformer. The low-voltage phases lead by 30°.' },
  Dyn5: { hv: 'D', lv: 'Y', k: 5, note: 'The same windings connected the other way round: the low-voltage side now lags by 150°.' },
  Yd1: { hv: 'Y', lv: 'D', k: 1, note: 'Star on the high-voltage side, delta on the low-voltage side — common for generator step-up transformers, with the generator on the delta. The low side lags by 30°.' },
};
export function threePhase(el) {
  const st = { g: 'Dyn11' };
  const fig = new Fig(el, {
    label: 'Three-phase transformer connections: star and delta windings, the phasors of the high- and low-voltage sides, and the phase shift given by the clock number',
    height: w => w < 600 ? 560 : 400, animated: true, step() {},
    draw(ctx, w, h, f) {
      const narrow = w < 600, G = GROUPS[st.g], rot = f.t * 0.6;
      const shift = -G.k * 30 * Math.PI / 180; // LV relative to HV, CCW positive
      // winding sketches
      const sketch = (cx, cy, r, type, label) => {
        text(ctx, label, cx, cy - r - 14, { size: 11, weight: 650, color: C.ink2, align: 'center' });
        const P = [0, 1, 2].map(i => [cx + r * Math.cos(Math.PI / 2 - i * 2 * Math.PI / 3), cy - r * Math.sin(Math.PI / 2 - i * 2 * Math.PI / 3)]);
        if (type === 'Y') { P.forEach((p, i) => { line(ctx, cx, cy, p[0], p[1], PH[i], 3); circle(ctx, p[0], p[1], 4, PH[i], null); }); circle(ctx, cx, cy, 4, C.ink, null); }
        else { for (let i = 0; i < 3; i++) { const a = P[i], b = P[(i + 1) % 3]; line(ctx, a[0], a[1], b[0], b[1], PH[i], 3); circle(ctx, a[0], a[1], 4, C.ink, null); } }
        text(ctx, type === 'Y' ? 'star (Y)' : 'delta (D)', cx, cy + r + 18, { size: 10.5, color: C.ink3, align: 'center' });
      };
      const sk = narrow ? { y: 70, r: 36, x1: w * 0.28, x2: w * 0.72 } : { y: 90, r: 40, x1: 90, x2: 230 };
      sketch(sk.x1, sk.y, sk.r, G.hv, 'high-voltage side');
      sketch(sk.x2, sk.y, sk.r * 0.75, G.lv, 'low-voltage side');
      // phasor clock
      const pc = narrow ? { x: w / 2, y: 270, r: 92 } : { x: 400, y: h / 2 + 6, r: 110 };
      circle(ctx, pc.x, pc.y, pc.r, '#fff', C.grid2, 1);
      for (let k = 0; k < 12; k++) { const a = Math.PI / 2 - k * Math.PI / 6; text(ctx, String(k === 0 ? 12 : k), pc.x + (pc.r + 12) * Math.cos(a), pc.y - (pc.r + 12) * Math.sin(a) + 4, { size: 10, color: C.ink3, align: 'center' }); }
      for (let i = 0; i < 3; i++) {
        const a = Math.PI / 2 - i * 2 * Math.PI / 3 + rot;
        arrow(ctx, pc.x, pc.y, pc.x + pc.r * 0.92 * Math.cos(a), pc.y - pc.r * 0.92 * Math.sin(a), PH[i], 3, 9);
        const b = a + shift;
        arrow(ctx, pc.x, pc.y, pc.x + pc.r * 0.55 * Math.cos(b), pc.y - pc.r * 0.55 * Math.sin(b), alpha(PH[i], 0.75), 2, 7);
      }
      text(ctx, 'long: high-voltage phases · short: low-voltage phases', pc.x, pc.y + pc.r + 30, { size: 10, color: C.ink3, align: 'center' });
      // waveform A vs a
      const B = narrow ? { l: 30, r: w - 14, t: 430, b: h - 26 } : { l: 560, r: w - 14, t: 60, b: h - 50 };
      if (B.r - B.l > 80) {
        const yy = scale(-1.1, 1.1, B.b, B.t), xx = scale(0, 1, B.l, B.r);
        line(ctx, B.l, yy(0), B.r, yy(0), C.grid2, 1);
        const wave = (amp, ph, col, wd) => pathLine(ctx, Array.from({ length: 121 }, (_, k) => { const u = k / 120; return [xx(u), yy(amp * Math.sin(2 * Math.PI * u * 1.5 + rot + Math.PI / 2 + ph - Math.PI / 2))]; }), col, wd);
        wave(1, 0, C.phaseA, 2.2); wave(0.6, shift, alpha(C.phaseA, 0.7), 2, [4, 3]);
        text(ctx, 'phase A, high side (solid) and low side', B.l, B.t - 10, { size: 10.5, color: C.ink2, weight: 600 });
        text(ctx, `shift: ${G.k === 0 ? 'none' : (G.k > 6 ? 'low side leads by ' + (12 - G.k) * 30 + '°' : 'low side lags by ' + G.k * 30 + '°')}`, B.l, B.b + 18, { size: 11, weight: 650, color: C.ink });
      }
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Vector group', options: Object.keys(GROUPS).map(k => ({ label: k, value: k, name: 'vg-' + k })), value: st.g, onchange: v => { st.g = v; upd(); } });
  function upd() { const G = GROUPS[st.g], d = 2 * Math.sin(G.k * 15 * Math.PI / 180); ro.innerHTML = `<b>${st.g}</b>: ${G.note}` + (G.k ? ` Connect it in parallel with a Yy0 unit and the two secondaries would differ by <b>${Math.round(d * 100)}% of the voltage</b> — a short circuit in all but name.` : ''); fig.invalidate(); }
  upd();
}

/* ---------------- tapChanger ---------------- */
export function tapChanger(el) {
  const st = { load: 1, pv: 0, mode: 'fixed', tap: 0 };
  const STEP = 0.0125, NT = 8;
  function solve() {
    const net = st.load - st.pv; // per unit of design load, positive = consuming
    const dropEnd = 0.075 * net;   // at the feeder end, per unit voltage
    const grid = 1.0;
    let tap = st.tap;
    if (st.mode !== 'manual') {
      const target = st.mode === 'fixed' ? 1.04 : 1.0 + 0.55 * dropEnd + 0.01;
      tap = clamp(Math.round((target - grid) / STEP), -NT, NT);
    }
    const bus = grid + tap * STEP;
    const u = x => bus - dropEnd * (2 * x - x * x);
    let lo = 9, hi = 0; for (let k = 0; k <= 50; k++) { const v = u(k / 50); lo = Math.min(lo, v); hi = Math.max(hi, v); }
    return { tap, bus, u, lo, hi, net };
  }
  let S = solve();
  const fig = new Fig(el, {
    label: 'Voltage along a distribution feeder from the substation to its far end, with load and rooftop solar; an on-load tap changer at the substation tries to keep every customer within plus or minus ten per cent',
    height: w => w < 600 ? 380 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const A = { l: narrow ? 52 : 70, r: w - 16, t: 36, b: h - 52 };
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 1, y0: 0.86, y1: 1.14, xticks: [], yticks: [0.9, 0.95, 1, 1.05, 1.1], yfmt: v => Math.round((v - 1) * 100) + '%', ylabel: 'customer voltage, deviation from nominal' });
      ctx.fillStyle = alpha(SAT, 0.08); ctx.fillRect(A.l, A.t, A.r - A.l, sy(1.1) - A.t); ctx.fillRect(A.l, sy(0.9), A.r - A.l, A.b - sy(0.9));
      text(ctx, 'outside the ±10% limit', A.r - 6, A.t + 12, { size: 10, color: SAT, align: 'right' });
      pathLine(ctx, Array.from({ length: 51 }, (_, k) => [sx(k / 50), sy(clamp(S.u(k / 50), 0.86, 1.14))]), C.network, 2.6);
      for (let k = 1; k <= 12; k++) { const x = k / 12, v = S.u(x), bad = v > 1.1 || v < 0.9; const px = sx(x), py = sy(clamp(v, 0.86, 1.14)); rrect(ctx, px - 6, A.b + 6, 12, 10, 2); ctx.fillStyle = bad ? SAT : C.ink3; ctx.fill(); ctx.beginPath(); ctx.moveTo(px - 8, A.b + 7); ctx.lineTo(px, A.b); ctx.lineTo(px + 8, A.b + 7); ctx.fillStyle = bad ? SAT : C.ink3; ctx.fill(); if (st.pv > 0) { ctx.fillStyle = C.solar; ctx.fillRect(px - 5, A.b + 1.5, 10, 2.5); } circle(ctx, px, py, 3.5, bad ? SAT : C.network, '#fff', 1); }
      // substation + tap dial
      const tx = A.l - (narrow ? 28 : 40), ty = sy(clamp(S.bus, 0.86, 1.14));
      circle(ctx, A.l, ty, 7, '#fff', C.ink, 1.6); circle(ctx, A.l + 7, ty, 7, null, C.ink, 1.6);
      text(ctx, 'substation', A.l + 4, A.b + 32, { size: 10, color: C.ink3 });
      text(ctx, 'far end of the feeder', A.r, A.b + 32, { size: 10, color: C.ink3, align: 'right' });
      text(ctx, `tap ${S.tap > 0 ? '+' : ''}${S.tap}`, A.l + 18, ty - 10, { size: 10.5, weight: 700, color: C.ink, halo: true });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  const ls = slider(ctl, { label: 'Household demand', min: 0, max: 1.2, step: 0.05, value: st.load, color: C.ink, fmt: v => Math.round(v * 100) + '%', oninput: v => { st.load = v; upd(); }, name: 'load' });
  const ps = slider(ctl, { label: 'Rooftop solar output', min: 0, max: 1.6, step: 0.05, value: st.pv, color: C.solar, fmt: v => Math.round(v * 100) + '%', oninput: v => { st.pv = v; upd(); }, name: 'pv' });
  const tadv = more(ctl, 'More: tap-changer control');
  const ts = slider(tadv, { label: 'Tap position (manual)', min: -NT, max: NT, step: 1, value: 0, color: C.network, fmt: v => (v > 0 ? '+' : '') + v + ' (' + (v * 1.25).toFixed(2) + '%)', oninput: v => { st.tap = v; mode.set('manual'); st.mode = 'manual'; upd(); }, name: 'tap' });
  const mode = segmented(tadv, { label: 'Tap-changer control', options: [{ label: 'Fixed set-point', value: 'fixed', name: 'm-fixed' }, { label: 'Load-compensated', value: 'ldc', name: 'm-ldc' }, { label: 'Manual', value: 'manual', name: 'm-manual' }], value: 'fixed', onchange: v => { st.mode = v; upd(); } });
  const scen = segmented(ctl, { label: 'Scenario', options: [{ label: 'Winter evening', value: 'w', name: 'sc-winter' }, { label: 'Sunny Sunday noon', value: 's', name: 'sc-sun' }], value: 'w', onchange: v => { if (v === 'w') { st.load = 1; st.pv = 0; } else { st.load = 0.3; st.pv = 1.4; } ls.set(st.load); ps.set(st.pv); upd(); } });
  function upd() {
    S = solve(); if (st.mode !== 'manual') ts.set(S.tap);
    const bad = S.hi > 1.1 || S.lo < 0.9;
    ro.innerHTML = `Net flow ${S.net >= 0 ? 'into' : '<b>out of</b>'} the neighbourhood: ${Math.abs(Math.round(S.net * 100))}% of design load. Customer voltages range from <b>${sgn((S.lo - 1) * 100)}%</b> to <b>${sgn((S.hi - 1) * 100)}%</b>${bad ? ' — <b>some customers are outside the ±10% limit</b>.' : ', all within ±10%.'}`;
    fig.invalidate();
  }
  upd();
  hint(el, 'pick “Sunny Sunday noon”, then switch to “Load-compensated” and watch the far-end voltage.');
}

/* ---------------- family ---------------- */
const STAGES = [
  { kv: 21, name: 'Generator', sub: 'at its terminals', mva: null },
  { kv: 400, name: 'Generator step-up', sub: '21 → 400 kV', mva: 1000, pre: 'up to about ', w: '135–365 t', note: 'Generator step-up (GSU) transformers connect a large power station to the transmission grid. The biggest exceed 1,000 MVA; units of 100 MVA and more weigh about 135–365 tonnes (150–400 US short tons) and often need special rail cars and road trailers.' },
  { kv: 220, name: 'Transmission autotransformer', sub: '400 → 220 or 110 kV', mva: 500, w: '135–365 t', note: 'Large autotransformers link the voltage levels of the transmission grid. In the US, the Department of Energy estimates that 90% of all electricity passes through a large power transformer (100 MVA or more) somewhere on its way.' },
  { kv: 110, name: 'Primary substation', sub: '110 → 20 kV', mva: 40, w: 'tens of t', note: 'Primary substations feed a town or a district at medium voltage; they usually have on-load tap changers to hold the voltage steady as demand changes.' },
  { kv: 20, name: 'Distribution transformer', sub: '20 kV → 400 V', mva: 0.63, w: '1–3 t', note: 'The neighbourhood transformer — in a kiosk, on a pole or on a concrete pad. In the US alone there are an estimated 60–80 million distribution transformers, mostly 10–2,500 kVA.' },
  { kv: 0.4, name: 'Your socket', sub: '230 V phase-to-neutral', mva: null },
];
const SPECIAL = [
  { name: 'Wind and solar step-ups', note: 'Every wind turbine and solar inverter block has its own step-up transformer to the farm’s collector network (often 33 kV), and the farm has a substation transformer to the grid — so a gigawatt of renewables needs many more transformers than a gigawatt of large power stations.' },
  { name: 'Phase-shifting transformers', note: 'A phase-shifting transformer adds a controllable phase angle to the voltage of one line, pushing power onto or off it. Grid operators use them to stop loop flows overloading neighbouring networks.' },
  { name: 'HVDC converter transformers', note: 'Converter transformers feed the power electronics of HVDC links. Their windings carry DC stress and harmonic currents, which makes them among the hardest units to design and build.' },
];
export function family(el) {
  const st = { sel: 1, sp: -1 }; let geo = [];
  const fig = new Fig(el, {
    label: 'The chain of transformers from a power station generator to a household socket, with the voltage at each step and typical sizes',
    height: w => w < 600 ? 400 : 400,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const A = { l: narrow ? 50 : 64, r: w - 16, t: narrow ? 110 : 130, b: h - (narrow ? 70 : 64) };
      const sy = v => scale(Math.log10(0.2), Math.log10(800), A.b, A.t)(Math.log10(v));
      [0.4, 4, 40, 400].forEach(v => { line(ctx, A.l, sy(v), A.r, sy(v), C.grid, 1); text(ctx, v < 1 ? '400 V' : v + ' kV', A.l - 6, sy(v) + 4, { size: 10, color: C.ink3, align: 'right' }); });
      text(ctx, 'voltage (log scale)', A.l + 4, sy(0.4) - 8, { size: 10.5, color: C.ink3, weight: 500 });
      const n = STAGES.length, xs = i => A.l + (A.r - A.l) * (i + 0.5) / n;
      // staircase
      ctx.beginPath(); STAGES.forEach((s, i) => { const x0 = A.l + (A.r - A.l) * i / n, x1 = A.l + (A.r - A.l) * (i + 1) / n; i ? ctx.lineTo(x0, sy(s.kv)) : ctx.moveTo(x0, sy(s.kv)); ctx.lineTo(x1, sy(s.kv)); }); ctx.strokeStyle = C.network; ctx.lineWidth = 3; ctx.stroke();
      geo = [];
      STAGES.forEach((s, i) => {
        const x = xs(i), y = sy(s.kv);
        if (s.mva) {
          const r = (5 + 3.2 * Math.cbrt(s.mva)) * Math.min(1, (A.r - A.l) / n / 95), yb = Math.min(y, sy(STAGES[i - 1].kv));
          const sel = st.sel === i;
          rrect(ctx, x - r, yb - 2 * r - 8, 2 * r, 2 * r, 4); ctx.fillStyle = sel ? IRON : lighten(IRON, 0.35); ctx.fill(); ctx.strokeStyle = sel ? C.ink : 'transparent'; ctx.lineWidth = 1.5; ctx.stroke();
          circle(ctx, x - r * 0.35, yb - r - 8, r * 0.42, null, COPPER, 2); circle(ctx, x + r * 0.35, yb - r - 8, r * 0.42, null, COPPER, 2);
          const mvaLab = s.mva >= 1 ? (narrow && s.mva >= 1000 ? (s.mva / 1000) + 'k MVA' : s.mva.toLocaleString('en') + ' MVA') : (s.mva * 1000) + ' kVA';
          if (!narrow || st.sel === i) text(ctx, mvaLab, x, yb - 2 * r - 14, { size: narrow ? 9.5 : 10, weight: 650, color: C.ink, align: 'center', halo: true });
          geo.push({ i, x0: x - Math.max(r, 30), x1: x + Math.max(r, 30), y0: yb - 2 * r - 26, y1: A.b });
        } else circle(ctx, x, y, 5, C.network, '#fff', 1.5);
        const lab = (A.r - A.l) / n < 150 ? s.name.replace('Transmission autotransformer', 'Autotransformer').replace('Generator step-up', 'Step-up').replace('Distribution transformer', 'Distribution').replace('Primary substation', 'Substation') : s.name;
        text(ctx, lab, x, A.b + 16 + (narrow && i % 2 ? 14 : 0), { size: narrow ? 9.5 : 10.5, weight: st.sel === i ? 700 : 500, color: st.sel === i ? C.ink : C.ink2, align: 'center' });
        if (!narrow) text(ctx, s.sub, x, A.b + 31, { size: 9.5, color: C.ink3, align: 'center' });
      });
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => x > g.x0 && x < g.x1 && y > g.y0 && y < g.y1) || null, cursor: 'pointer', down: o => { st.sel = o.i; st.sp = -1; sp.set(null); upd(); }, hover: o => { if (o && o.i !== st.sel) { st.sel = o.i; st.sp = -1; sp.set(null); upd(); } } });
  const ctl = controls(el); const ro = readout(el);
  const sp = segmented(ctl, { label: 'Special-purpose transformers', options: SPECIAL.map((s, i) => ({ label: s.name, value: i, name: 'sp-' + i })), value: null, onchange: v => { st.sp = v; upd(); } });
  function upd() { const s = st.sp >= 0 ? SPECIAL[st.sp] : STAGES[st.sel]; ro.innerHTML = `<b>${s.name}</b>${s.w ? ` (${s.pre || 'typically '}${s.mva >= 1 ? s.mva.toLocaleString('en') + ' MVA' : s.mva * 1000 + ' kVA'}, ${s.w})` : ''}: ${s.note}`; fig.invalidate(); }
  upd();
}

/* ---------------- shortage ---------------- */
const LEAD = [
  { g: 'Large power transformer', pre: 12, preLab: 'under 1 year', now: 36, nowLab: '36 months commonly quoted (up to 60)', src: 'DOE 2024' },
  { g: 'Power transformer (avg, Q2 2025)', pre: null, now: 128 / 4.345, nowLab: '128 weeks', src: 'Wood Mackenzie' },
  { g: 'Generator step-up (avg, Q2 2025)', pre: null, now: 143 / 4.345, nowLab: '143 weeks', src: 'Wood Mackenzie' },
  { g: 'Distribution transformer', pre: 6, preLab: 'about 6 months (a quarter of today’s)', now: 24, nowLab: 'up to 2 years', src: 'NREL 2024' },
];
export function shortage(el) {
  const st = { view: 'price', hover: null }; let geo = null;
  const ppi = XF.ppi, cpi = XF.cpi;
  const base = arr => { const v = arr.filter(r => r[0] === 2019).map(r => r[2]); return v.reduce((a, b) => a + b, 0) / v.length; };
  const pb = base(ppi), cb = base(cpi);
  const fig = new Fig(el, {
    label: 'US producer prices for power and distribution transformers compared with consumer prices since 2006, and transformer lead times before and after the shortage',
    height: w => w < 600 ? 380 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600;
      if (st.view === 'price') {
        const A = { l: narrow ? 44 : 56, r: w - (narrow ? 16 : 150), t: 34, b: h - 40 };
        const { sx, sy } = axes(ctx, { box: A, x0: 2006, x1: 2027, y0: 60, y1: 200, yticks: [60, 100, 140, 180], xticks: narrow ? [2006, 2014, 2022] : [2006, 2010, 2014, 2018, 2022, 2026], yfmt: v => v, ylabel: 'price index, 2019 average = 100' });
        line(ctx, A.l, sy(100), A.r, sy(100), C.grid2, 1, [3, 3]);
        const P = ppi.map(r => [sx(r[0] + (r[1] - 0.5) / 12), sy(r[2] / pb * 100)]), Q = cpi.map(r => [sx(r[0] + (r[1] - 0.5) / 12), sy(r[2] / cb * 100)]);
        pathLine(ctx, Q, C.ink3, 1.8); pathLine(ctx, P, SAT, 2.4);
        const lp = ppi[ppi.length - 1], lc = cpi[cpi.length - 1];
        const lab = (pt, s, col, dy) => narrow ? text(ctx, s, pt[0] - 4, pt[1] + dy, { size: 10.5, weight: 650, color: col, align: 'right', halo: true }) : text(ctx, s, pt[0] + 6, pt[1] + 4 + dy, { size: 11, weight: 650, color: col });
        lab(P[P.length - 1], `transformers ${Math.round(lp[2] / pb * 100)}`, SAT, narrow ? -8 : 0); lab(Q[Q.length - 1], `all consumer prices ${Math.round(lc[2] / cb * 100)}`, C.ink2, narrow ? 16 : 0);
        geo = { sx, sy, A };
        if (st.hover) { const r = st.hover; const x = sx(r[0] + (r[1] - 0.5) / 12); line(ctx, x, A.t, x, A.b, C.ink, 1, [2, 2]); }
      } else {
        const A = { l: narrow ? 14 : 230, r: w - 20, t: 30, b: h - 30 };
        const xs = scale(0, 40, A.l, A.r), rowH = (A.b - A.t) / LEAD.length;
        [0, 12, 24, 36].forEach(v => { line(ctx, xs(v), A.t - 6, xs(v), A.b, C.grid, 1); text(ctx, v + ' mo', xs(v), A.b + 14, { size: 10, color: C.ink3, align: 'center' }); });
        LEAD.forEach((r, i) => {
          const y = A.t + i * rowH;
          if (narrow) text(ctx, r.g, A.l, y + 10, { size: 10.5, weight: 650, color: C.ink2 }); else text(ctx, r.g, A.l - 10, y + rowH / 2 + 4, { size: 11, weight: 650, color: C.ink2, align: 'right' });
          const by = narrow ? y + 16 : y + rowH / 2 - 12;
          if (r.pre) { ctx.fillStyle = alpha(C.ink3, 0.5); ctx.fillRect(xs(0), by, xs(r.pre) - xs(0), 10); text(ctx, 'before: ' + r.preLab, xs(r.pre) + 6, by + 9, { size: 10, color: C.ink3 }); }
          ctx.fillStyle = SAT; ctx.fillRect(xs(0), by + 13, xs(r.now) - xs(0), 11); text(ctx, r.nowLab + ' · ' + r.src, Math.min(xs(r.now) + 6, A.r - 200), by + (xs(r.now) + 206 > A.r ? 9 + 26 : 22), { size: 10, weight: 650, color: SAT, halo: true });
          if (i === 0) { ctx.fillStyle = alpha(SAT, 0.3); ctx.fillRect(xs(36), by + 13, xs(40) - xs(36), 11); }
        });
        geo = null;
      }
    },
  });
  fig.interact({ hit: (x, y) => geo && x > geo.A.l && x < geo.A.r ? 'p' : null, cursor: 'crosshair', hover: (o, x) => { if (!o || !geo) { st.hover = null; upd(); return; } const yr = geo.sx.inv(x); const y = Math.floor(yr), m = clamp(Math.floor((yr - y) * 12) + 1, 1, 12); st.hover = ppi.find(r => r[0] === y && r[1] === m) || null; upd(); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'Prices', value: 'price', name: 'sh-price' }, { label: 'Lead times', value: 'lead', name: 'sh-lead' }], value: 'price', onchange: v => { st.view = v; st.hover = null; upd(); } });
  function upd() {
    if (st.view === 'lead') ro.innerHTML = 'Before 2020 a large transformer could be ordered for delivery within a year. By 2024 three years was common, and some quotes ran to five. Distribution transformers went from months to as long as two years.';
    else if (st.hover) { const r = st.hover, c = cpi.find(q => q[0] === r[0] && q[1] === r[1]); ro.innerHTML = `<b>${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][r[1] - 1]} ${r[0]}</b>: transformer producer prices <b>${Math.round(r[2] / pb * 100)}</b>, consumer prices ${c ? Math.round(c[2] / cb * 100) : '–'} (2019 = 100).`; }
    else { const lp = ppi[ppi.length - 1]; ro.innerHTML = `From 2008 to 2020 transformer prices barely moved. Between 2020 and 2023 they rose by about two-thirds, and they have kept rising: by ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][lp[1] - 1]} ${lp[0]}, US producer prices were <b>${Math.round(lp[2] / pb * 100 - 100)}% above</b> their 2019 level, against about ${Math.round(cpi[cpi.length - 1][2] / cb * 100 - 100)}% for consumer prices in general. Hover the chart.`; }
    fig.invalidate();
  }
  upd();
}

/* ---------------- sizeFrequency ---------------- */
export function sizeFrequency(el) {
  const st = { f: 50 }; let chart = null, fsl = null;
  const mat = f => f <= 400 ? { name: 'silicon steel', B: 1.6, col: IRON } : f <= 20000 ? { name: 'nanocrystalline alloy', B: 1.0, col: '#9f8fb8' } : { name: 'ferrite', B: 0.3, col: '#6b5b4f' };
  const vol = f => Math.pow(1 / (f * mat(f).B), 0.75); // magnetics volume ∝ (P / f·B·J)^(3/4)
  const fig = new Fig(el, {
    label: 'How the size of a transformer’s magnetic core shrinks with operating frequency, and the chain of power electronics a solid-state transformer needs to exploit it',
    height: w => w < 600 ? 610 : 500,
    draw(ctx, w, h) {
      const narrow = w < 600, ref = vol(50), v = vol(st.f), m = mat(st.f);
      const A = { l: 14, r: narrow ? w - 14 : w * 0.55, t: 30, b: narrow ? 230 : 300 };
      const S = Math.min(A.r - A.l, A.b - A.t) * 0.8, s = S * Math.cbrt(v / ref);
      const cx = (A.l + A.r) / 2, cy = (A.t + A.b) / 2 + 6;
      ctx.strokeStyle = C.ink3; ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.strokeRect(cx - S / 2, cy - S / 2, S, S); ctx.setLineDash([]);
      text(ctx, '50 Hz transformer, same power', cx, cy - S / 2 - 6, { size: 10, color: C.ink3, align: 'center' });
      const ss = Math.max(s, 3);
      ctx.fillStyle = m.col; ctx.fillRect(cx - ss / 2, cy - ss / 2, ss, ss); ctx.fillStyle = '#fbfaf6'; ctx.fillRect(cx - ss * 0.3, cy - ss * 0.3, ss * 0.6, ss * 0.6);
      ctx.fillStyle = COPPER; ctx.fillRect(cx - ss * 0.42, cy - ss * 0.25, ss * 0.12, ss * 0.5); ctx.fillRect(cx + ss * 0.3, cy - ss * 0.25, ss * 0.12, ss * 0.5);
      text(ctx, `${pct2(v / ref * 100)}% of the volume`, cx, cy + Math.max(ss / 2, 8) + 16, { size: 11.5, weight: 700, color: C.ink, align: 'center', halo: true });
      // SST chain
      const B = narrow ? { l: 14, r: w - 14, t: 292, b: 430 } : { l: w * 0.58, r: w - 14, t: 40, b: 320 };
      const blocks = st.f <= 60 ? [['50 Hz transformer', 99.3]] : [['rectifier', 99.0], ['high-frequency inverter', 99.0], [`${st.f >= 1000 ? (st.f / 1000).toPrecision(2) + ' kHz' : Math.round(st.f) + ' Hz'} transformer`, 99.6], ['rectifier', 99.0], ['inverter', 99.0]];
      text(ctx, st.f <= 60 ? 'conventional: one passive box' : 'solid-state transformer: five stages', B.l, B.t - 14, { size: 11, weight: 650, color: C.ink2 });
      const bh = Math.min(30, (B.b - B.t - 30) / blocks.length - 8);
      let eff = 1;
      blocks.forEach(([nm, e], i) => { const y = B.t + i * (bh + 8); rrect(ctx, B.l, y, B.r - B.l, bh, 5); ctx.fillStyle = nm.includes('transformer') ? lighten(m.col, 0.5) : alpha(C.electron, 0.15); ctx.fill(); text(ctx, nm, B.l + 10, y + bh / 2 + 4, { size: 11, color: C.ink }); text(ctx, e.toFixed(1) + '%', B.r - 10, y + bh / 2 + 4, { size: 11, weight: 650, color: C.ink, align: 'right' }); eff *= e / 100; });
      const yb = B.t + blocks.length * (bh + 8) + 14;
      text(ctx, `overall ≈ ${(eff * 100).toFixed(1)}% (illustrative)`, B.l, yb, { size: 12, weight: 700, color: eff < 0.97 ? SAT : C.storage });
      // trade-off chart: core volume (log) against frequency (log), coloured by core material; drag the dot to set the frequency
      const T = { l: 62, r: w - (narrow ? 16 : 150), t: narrow ? 460 : 368, b: h - 36 };
      const lx = scale(Math.log10(16.7), Math.log10(50000), T.l, T.r), ly = scale(Math.log10(0.5), Math.log10(260), T.b, T.t);
      chart = { T, lx };
      [[0.5], [1], [2], [5], [10], [20], [50], [100], [200]].forEach(([v]) => { if ([1, 10, 100].includes(v) || !narrow) { line(ctx, T.l, ly(Math.log10(v)), T.r, ly(Math.log10(v)), C.grid, 1); text(ctx, v + '%', T.l - 6, ly(Math.log10(v)) + 4, { size: 10, color: C.ink3, align: 'right' }); } });
      [[16.7, '16.7 Hz'], [50, '50'], [400, '400 Hz'], [1000, '1 kHz'], [20000, '20 kHz']].filter(([f]) => !narrow || f !== 1000).forEach(([f, lab]) => { line(ctx, lx(Math.log10(f)), T.b, lx(Math.log10(f)), T.b + 4, C.ink3, 1); text(ctx, lab, lx(Math.log10(f)), T.b + 16, { size: 10, color: C.ink3, align: 'center' }); });
      text(ctx, 'core volume, % of a 50 Hz design (log scale)', T.l, T.t - 10, { size: 10.5, color: C.ink3 });
      text(ctx, 'operating frequency (log scale)', T.r, T.b + 30, { size: 10.5, color: C.ink3, align: 'right' });
      // material bands and the curve, segment by segment
      [[16.7, 400, 'silicon steel 1.6 T'], [400, 20000, 'nanocrystalline 1.0 T'], [20000, 50000, 'ferrite 0.3 T']].forEach(([f0, f1, lab]) => {
        const c = mat(Math.sqrt(f0 * f1)).col; ctx.fillStyle = alpha(c, 0.08); ctx.fillRect(lx(Math.log10(f0)), T.t, lx(Math.log10(f1)) - lx(Math.log10(f0)), T.b - T.t);
        const pts = []; for (let k = 0; k <= 40; k++) { const f = f0 * Math.pow(f1 / f0, k / 40) * (k === 40 ? 0.9999 : 1); pts.push([lx(Math.log10(f)), ly(Math.log10(vol(f) / ref * 100))]); }
        pathLine(ctx, pts, darken(c, 0.1), 2.4);
        text(ctx, narrow ? lab.split(' ')[0].replace('nanocrystalline', 'nanocryst.') : lab, (lx(Math.log10(f0)) + lx(Math.log10(f1))) / 2, T.t + 14, { size: 10, weight: 600, color: darken(c, 0.2), align: 'center' });
      });
      // jumps at material changes: lower saturation flux means a bigger core than the trend would give
      const px = lx(Math.log10(st.f)), py = ly(Math.log10(Math.max(0.5, v / ref * 100)));
      line(ctx, px, T.t, px, T.b, alpha(C.ink, 0.25), 1, [3, 3]);
      circle(ctx, px, py, 7, m.col, '#fff', 2.5);
      if (!narrow) { text(ctx, 'drag the dot', T.r + 10, T.t + 30, { size: 10.5, weight: 600, color: C.ink2 }); text(ctx, 'steps up where the', T.r + 10, T.t + 50, { size: 10.5, color: C.ink3 }); text(ctx, 'core material must', T.r + 10, T.t + 64, { size: 10.5, color: C.ink3 }); text(ctx, 'change: lower flux,', T.r + 10, T.t + 78, { size: 10.5, color: C.ink3 }); text(ctx, 'bigger core', T.r + 10, T.t + 92, { size: 10.5, color: C.ink3 }); }
    },
  });
  fig.interact({ hit: (x, y) => chart && x > chart.T.l - 10 && x < chart.T.r + 10 && y > chart.T.t && y < chart.T.b + 10 ? 'chart' : null, cursor: 'ew-resize',
    down: (o, x) => setF(x), move: (o, x) => setF(x) });
  const setF = x => { const lg = clamp(chart.lx.inv(x), Math.log10(16.7), Math.log10(50000)); fsl.set(lg); st.f = 10 ** lg; upd(); };
  const ctl = controls(el); const ro = readout(el);
  const fs = [16.7, 50, 60, 400, 1000, 5000, 20000, 50000];
  fsl = slider(ctl, { label: 'Operating frequency', min: Math.log10(16.7), max: Math.log10(50000), step: 0.01, value: Math.log10(50), color: FLUX, fmt: v => { const f = 10 ** v; return f >= 1000 ? (f / 1000).toPrecision(2) + ' kHz' : (f < 20 ? f.toFixed(1) : Math.round(f)) + ' Hz'; }, oninput: v => { st.f = 10 ** v; upd(); }, name: 'f', wide: true });
  function upd() {
    const f = st.f, m = mat(f);
    const where = f < 20 ? 'German, Austrian, Swiss and Swedish railways run at 16.7 Hz, and their transformers are correspondingly bulky.' : f < 70 ? 'Mains frequency.' : f < 1000 ? 'Aircraft use 400 Hz precisely to save weight in their transformers and motors.' : 'Here the core must be made of ' + m.name + ', which saturates at a lower flux density than silicon steel.';
    ro.innerHTML = `At ${f >= 1000 ? (f / 1000).toPrecision(2) + ' kHz' : (f < 20 ? f.toFixed(1) : Math.round(f)) + ' Hz'} with a ${m.name} core (peak flux about ${m.B} T), the magnetics need roughly <b>${pct2(vol(f) / vol(50) * 100)}%</b> of the volume of a 50 Hz design. ${Math.abs(f - 50) < 1 ? '' : ''}${where}`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- scaleUp ---------------- */
// One transformer, dragged from 1 kVA to 1 GVA. Real data: EU Regulation 2019/1783 Tier 2 — Table I.1 maximum
// losses (≤ 3,150 kVA, peak efficiency derived) and Table I.7 minimum peak efficiency index (large power
// transformers, linear interpolation as the regulation prescribes); Siemens FITformer planning data (100–2,500 kVA,
// 20 kV, Tier 2): height and total mass; DOE 2024: 100 MVA and up weigh 135–365 t; lead times from DOE, NREL and
// Wood Mackenzie. Model: below 100 kVA the catalogue's own trend (mass ∝ rating^0.61) is extended; from 2.5 to
// 100 MVA mass is interpolated (log-log) to the bottom of DOE's range, and above 100 MVA spread across it; height ∝ mass^⅓.
const SIE = [[100, 1.4, 850], [160, 1.5, 1200], [250, 1.6, 1500], [400, 1.6, 1900], [630, 1.8, 2600], [800, 1.9, 3400], [1000, 1.95, 3800], [1250, 2.0, 4000], [1600, 2.1, 4800], [2000, 2.1, 5000], [2500, 2.2, 6000]];
const PEI7 = [[3150, 99.518], [4000, 99.532], [5000, 99.548], [6300, 99.571], [8000, 99.593], [10000, 99.615], [12500, 99.640], [16000, 99.663], [20000, 99.684], [25000, 99.700], [31500, 99.712], [40000, 99.724], [50000, 99.734], [63000, 99.745], [80000, 99.758], [100000, 99.770], [125000, 99.780], [160000, 99.790], [200000, 99.797]];
const PEI1 = XF.eu.map(r => { const [s, , , pk, p0] = r, k = Math.sqrt(p0 / pk); return [s, 100 * (1 - 2 * p0 / (k * s * 1000)), p0, pk]; }); // Tier 2, peak at load k where Pk·k² = P0
const lerpTab = (tab, x, logx) => { if (x <= tab[0][0]) return tab[0]; if (x >= tab[tab.length - 1][0]) return tab[tab.length - 1]; let i = 1; while (tab[i][0] < x) i++; const a = tab[i - 1], b = tab[i], f = logx ? Math.log(x / a[0]) / Math.log(b[0] / a[0]) : (x - a[0]) / (b[0] - a[0]); return a.map((v, j) => j === 0 ? x : v + (b[j] - v) * f); };
const peiAt = s => s < 25 ? null : s <= 3150 ? lerpTab(PEI1, s, true)[1] : lerpTab(PEI7, s, false)[1];
const lgi = (x, x0, y0, x1, y1) => y0 * (y1 / y0) ** (Math.log(x / x0) / Math.log(x1 / x0));
const massAt = s => s < 100 ? { kg: 850 * (s / 100) ** 0.61, real: false } : s <= 2500 ? { kg: Math.exp(lerpTab(SIE.map(r => [r[0], Math.log(r[2])]), s, true)[1]), real: true } : s <= 100000 ? { kg: lgi(s, 2500, 6000, 100000, 135000), real: false } : { kg: lgi(Math.min(s, 1e6), 100000, 135000, 1e6, 365000), real: false };
const heightAt = s => s < 100 ? 1.4 * (massAt(s).kg / 850) ** (1 / 3) : s <= 2500 ? lerpTab(SIE, s, true)[1] : 2.2 * (massAt(s).kg / 6000) ** (1 / 3);
const STOPS = [[1, 'a small control transformer, like the one in a machine’s control cabinet'], [25, 'a US pole-mounted can serving a handful of houses'], [630, 'a European neighbourhood transformer in its kiosk'], [40000, 'a primary substation transformer, 110 → 20 kV'], [500000, 'a transmission autotransformer, 400 → 220 kV'], [1000000, 'a generator step-up for a large power station, 21 → 400 kV']];
const fmtS = s => s >= 1000000 ? (s / 1e6).toFixed(s >= 1e6 && s % 1e6 ? 1 : 0) + ' GVA' : s >= 1000 ? (s >= 10000 ? Math.round(s / 1000) : +(s / 1000).toPrecision(3)).toLocaleString('en') + ' MVA' : Math.round(s).toLocaleString('en') + ' kVA';
const fmtKg = kg => kg >= 1000 ? (kg >= 10000 ? Math.round(kg / 1000) : +(kg / 1000).toPrecision(2)).toLocaleString('en') + ' t' : Math.round(kg) + ' kg';
const leadAt = s => s >= 1000000 ? 'about 143 weeks on average for generator step-ups (Wood Mackenzie, Q2 2025)' : s >= 100000 ? '36 months commonly quoted, up to 60 (DOE)' : s > 2500 ? 'about 128 weeks on average for power transformers (Wood Mackenzie, Q2 2025)' : 'up to two years for distribution transformers (NREL)';
export function scaleUp(el) {
  const st = { lg: Math.log10(630) }; let geo = null;
  const fig = new Fig(el, {
    label: 'One transformer scaled from 1 kilovolt-ampere to 1 gigavolt-ampere next to a person for scale, with the minimum efficiency EU rules require and its weight at each size; drag along the rating axis',
    height: w => w < 600 ? 640 : 420,
    draw(ctx, w, h) {
      const narrow = w < 600, s = 10 ** st.lg, H = heightAt(s), M = massAt(s), pei = peiAt(s);
      // ---- the scene: a person (1.75 m) and the transformer, zoomed so both fit
      const Sc = narrow ? { l: 16, r: w - 16, t: 34, b: 250 } : { l: 16, r: w * 0.46, t: 40, b: h - 40 };
      const z = (Sc.b - Sc.t - 20) / Math.max(H * 1.08, 1.95), gy = Sc.b;
      line(ctx, Sc.l, gy, Sc.r, gy, C.grid2, 1.5);
      text(ctx, fmtS(s), Sc.l, Sc.t - 14, { size: 18, weight: 750, color: C.ink });
      // person
      const px = Sc.l + 26, ph = 1.75 * z; ctx.fillStyle = alpha(C.ink2, 0.75);
      circle(ctx, px, gy - ph + ph * 0.07, ph * 0.07, alpha(C.ink2, 0.75)); rrect(ctx, px - ph * 0.09, gy - ph * 0.86, ph * 0.18, ph * 0.46, ph * 0.05); ctx.fill(); ctx.fillRect(px - ph * 0.07, gy - ph * 0.42, ph * 0.055, ph * 0.42); ctx.fillRect(px + ph * 0.015, gy - ph * 0.42, ph * 0.055, ph * 0.42);
      if (ph > 26) text(ctx, '1.75 m', px, gy - ph - 6, { size: 9.5, color: C.ink3, align: 'center' });
      // transformer: tank, core-and-coil glimpse, bushings, radiators and conservator when large
      const th = H * z, tw = th * (s >= 10000 ? 1.15 : 0.78), tankH = th * 0.66, tx = Math.min(Sc.r - tw / 2 - 6, px + Math.max(40, ph * 0.3) + tw / 2 + 16);
      const big = s >= 10000;
      if (big) for (const side of [-1, 1]) for (let k = 0; k < 5; k++) { const rx = tx + side * (tw / 2 + 2 + k * tw * 0.035); ctx.fillStyle = alpha(IRON, 0.55); ctx.fillRect(rx - tw * 0.012, gy - tankH * 0.92, tw * 0.024, tankH * 0.78); }
      rrect(ctx, tx - tw / 2, gy - tankH, tw, tankH, Math.min(8, tw * 0.04)); ctx.fillStyle = lighten(IRON, 0.15); ctx.fill(); ctx.strokeStyle = darken(IRON, 0.25); ctx.lineWidth = 1.2; ctx.stroke();
      // a window showing the three coils on the core
      const wx = tx - tw * 0.36, ww = tw * 0.72, wy = gy - tankH * 0.86, wh = tankH * 0.62;
      ctx.fillStyle = alpha('#fff', 0.55); ctx.fillRect(wx, wy, ww, wh);
      for (let k = 0; k < 3; k++) { const cx = wx + ww * (k + 0.5) / 3; ctx.fillStyle = IRON; ctx.fillRect(cx - ww * 0.03, wy + wh * 0.06, ww * 0.06, wh * 0.88); ctx.fillStyle = COPPER; rrect(ctx, cx - ww * 0.12, wy + wh * 0.16, ww * 0.24, wh * 0.68, 3); ctx.fill(); }
      ctx.fillStyle = IRON; ctx.fillRect(wx + ww * 0.08, wy + wh * 0.04, ww * 0.84, wh * 0.06); ctx.fillRect(wx + ww * 0.08, wy + wh * 0.9, ww * 0.84, wh * 0.06);
      // bushings: taller for higher voltage
      const kv = s >= 100000 ? 400 : s >= 10000 ? 110 : s >= 50 ? 20 : 1, bh = th - tankH, nb = 3;
      for (let k = 0; k < nb; k++) { const bx = tx - tw * 0.3 + k * tw * 0.3; ctx.fillStyle = '#b9b3a6'; rrect(ctx, bx - tw * 0.025, gy - tankH - bh * 0.92, tw * 0.05, bh * 0.92, 2); ctx.fill(); for (let r = 1; r < 6; r++) { const yy = gy - tankH - bh * 0.92 * r / 6; line(ctx, bx - tw * 0.04, yy, bx + tw * 0.04, yy, '#a39d8f', 1); } }
      if (big) { rrect(ctx, tx + tw * 0.1, gy - tankH - bh * 0.35, tw * 0.38, bh * 0.22, bh * 0.1); ctx.fillStyle = lighten(IRON, 0.25); ctx.fill(); }
      text(ctx, s < 25 ? 'no data: drawn by extending the trend' : `${fmtKg(M.kg)}${M.real ? '' : ' (model)'} · ${H < 10 ? H.toFixed(1) : Math.round(H)} m tall`, Sc.r - 4, Sc.t - 14, { size: 11, color: C.ink2, align: 'right', weight: 600 });
      // ---- charts on a shared log rating axis
      const X0 = 0, X1 = 6, C1 = narrow ? { l: 54, r: w - 16, t: 300, b: 430 } : { l: w * 0.5 + 44, r: w - 16, t: 40, b: h * 0.5 - 14 }, C2 = narrow ? { l: 54, r: w - 16, t: 470, b: h - 40 } : { l: w * 0.5 + 44, r: w - 16, t: h * 0.5 + 22, b: h - 40 };
      const xt = [0, 1, 2, 3, 4, 5, 6], xf = v => ['1 kVA', '10 kVA', '100 kVA', '1 MVA', '10 MVA', '100 MVA', '1 GVA'][v];
      const a1 = axes(ctx, { box: C1, x0: X0, x1: X1, y0: 98, y1: 100, xticks: xt, xfmt: () => '', yticks: [98, 98.5, 99, 99.5, 100], yfmt: v => v.toFixed(1) + '%', ylabel: 'least peak efficiency EU rules allow' });
      ctx.fillStyle = alpha(C.ink3, 0.12); ctx.fillRect(a1.sx(0), C1.t, a1.sx(Math.log10(25)) - a1.sx(0), C1.b - C1.t);
      text(ctx, 'not covered', a1.sx(0.7), C1.b - 8, { size: 9.5, color: C.ink3, align: 'center' });
      const L3 = Math.log10(3150), seg = (l0, l1, d) => { const p = []; for (let l = l0; l <= l1 + 1e-9; l += (l1 - l0) / 80) p.push([a1.sx(l), a1.sy(peiAt(10 ** l + d))]); pathLine(ctx, p, C.storage, 2.4); };
      seg(Math.log10(25), L3, 0); seg(L3, 6, 1);
      text(ctx, 'loss caps → efficiency floor', a1.sx(L3) + 4, a1.sy(99.0), { size: 9.5, color: C.ink3, halo: true });
      line(ctx, a1.sx(L3), a1.sy(99.2), a1.sx(L3), a1.sy(99.45), C.ink3, 1, [2, 2]);
      const a2 = axes(ctx, { box: C2, x0: X0, x1: X1, y0: 1, y1: 6, xticks: xt, xfmt: xf, yticks: [1, 2, 3, 4, 5, 6], yfmt: v => ['10 kg', '100 kg', '1 t', '10 t', '100 t', '1,000 t'][v - 1], ylabel: 'total mass (log scale)' });
      const lw = l => Math.log10(massAt(10 ** l).kg);
      const lp = []; for (let l = Math.log10(25); l <= 6.0001; l += 0.05) lp.push([a2.sx(l), a2.sy(lw(l))]);
      pathLine(ctx, lp, alpha(IRON, 0.9), 1.4, [5, 4]);
      ctx.fillStyle = alpha(COPPER, 0.25); ctx.fillRect(a2.sx(5), a2.sy(Math.log10(365000)), a2.sx(6) - a2.sx(5), a2.sy(Math.log10(135000)) - a2.sy(Math.log10(365000)));
      text(ctx, 'DOE: 135–365 t', a2.sx(5) + 4, a2.sy(Math.log10(365000)) - 5, { size: 9.5, color: darken(COPPER, 0.3), halo: true });
      SIE.forEach(r => circle(ctx, a2.sx(Math.log10(r[0])), a2.sy(Math.log10(r[2])), 3, darken(IRON, 0.2), '#fff', 1));
      if (!narrow) text(ctx, 'dots: catalogue units · dashed: model between them', C2.l + 4, C2.t + 10, { size: 9.5, color: C.ink3 });
      // stops and the cursor
      STOPS.forEach(([v]) => { const x = a2.sx(Math.log10(v)); line(ctx, x, C2.b, x, C2.b + 4, C.ink3, 1); });
      const cx = a1.sx(st.lg);
      line(ctx, cx, C1.t, cx, C2.b, alpha(C.ink, 0.5), 1, [3, 3]);
      if (pei != null) { circle(ctx, cx, a1.sy(pei), 4.5, C.storage, '#fff', 1.5); text(ctx, pei.toFixed(2) + '%', clamp(cx + 8, C1.l, C1.r - 50), a1.sy(pei) + 14, { size: 10.5, weight: 700, color: darken(C.storage, 0.25), halo: true }); }
      if (s >= 25) circle(ctx, cx, a2.sy(Math.log10(M.kg)), 4.5, IRON, '#fff', 1.5);
      const ky = C2.b + (narrow ? 26 : 24);
      circle(ctx, cx, ky, 10, C.ink, '#fff', 2); text(ctx, '↔', cx, ky + 4, { size: 11, color: '#fff', align: 'center', weight: 700 });
      geo = { sx: a1.sx, C1, C2, cx, ky };
    },
  });
  const setL = x => { let l = clamp(geo.sx.inv(x), 0, 6); for (const [v] of STOPS) if (Math.abs(Math.log10(v) - l) < 0.08) l = Math.log10(v); st.lg = l; upd(); };
  fig.interact({
    hit: (x, y) => geo && x > geo.C1.l - 10 && x < geo.C1.r + 10 && y > geo.C1.t && y < geo.ky + 14 ? 'l' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.cx, y - geo.ky) < 26 ? 'l' : null,
    cursor: 'ew-resize', down: (o, x) => setL(x), move: (o, x) => setL(x),
  });
  const ctl = controls(el), ro = readout(el);
  const mo = more(ctl, 'More: jump to a real type');
  const stp = segmented(mo, { label: 'Real types', options: STOPS.map(([v], i) => ({ label: fmtS(v), value: i, name: 'su-' + i })), value: 2, onchange: i => { st.lg = Math.log10(STOPS[i][0]); upd(); } });
  function upd() {
    const s = 10 ** st.lg, stop = STOPS.find(([v]) => Math.abs(Math.log10(v) - st.lg) < 1e-6), pei = peiAt(s), M = massAt(s);
    let r = `<b>${fmtS(s)}</b>${stop ? `: ${stop[1]}` : ''}. `;
    if (pei == null) r += 'EU efficiency rules do not cover transformers this small. ';
    else if (s <= 3150) { const t = lerpTab(PEI1, s, true); r += `EU rules cap its losses at about <b>${Math.round(t[2]).toLocaleString('en')} W</b> in the core, all the time, and ${Math.round(t[3]).toLocaleString('en')} W in the windings at full load; at its best load it must pass at least <b>${pei.toFixed(2)}%</b> of the power through. `; }
    else r += `At its best load it must pass at least <b>${pei.toFixed(2)}%</b> of the power through, losing at most ${(100 - pei).toFixed(2)}%. `;
    r += M.real ? `A catalogue unit this size weighs <b>${fmtKg(M.kg)}</b>. ` : s >= 100000 ? `Units of 100 MVA and up typically weigh <b>135–365 t</b> (DOE). ` : s < 25 ? 'Below 25 kVA we do not estimate the weight; the drawing just continues the trend. ' : `Our model puts it near <b>${fmtKg(M.kg)}</b>. `;
    if (s >= 10) r += `Lead time: ${leadAt(s)}.`;
    ro.innerHTML = r; if (stop) stp.set(STOPS.indexOf(stop)); else stp.set(null);
    fig.invalidate();
  }
  upd();
  hint(el, 'drag the rating from 630 kVA up to 1 GVA: the person shrinks, the efficiency climbs, and the weight grows far more slowly than the rating.');
}
