// Transformers post, part 1: how it works, losses, efficiency, heat.
//  coreFlux   — an animated transformer: turns ratio, load, DC bias / DC supply — model
//  coreLoss   — B–H loop and laminations: hysteresis vs eddy losses by material and thickness — model (typical parameters)
//  efficiency — losses and efficiency vs load for EU Ecodesign Tier 1/Tier 2 limits — real limits + exact formula
//  hotSpot    — a day of load and weather through the IEC 60076-7 thermal model and ageing law — model on the standard's equations
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import { text, measure, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, more } from '../lib/ui.js';
import { XF } from '../lib/xfmrdata.js';

export const COPPER = '#c27a3a', IRON = '#8a96a3', FLUX = '#6a7db0', SAT = '#d1495b';

/* ---------------- coreFlux ---------------- */
export function coreFlux(el) {
  const st = { n: 0.5, load: 0.6, bias: 0, mode: 'ac', tdc: 0 };
  const W = 2 * Math.PI * 0.5; // animation: one cycle every 2 s
  const imag = phi => { const s = Math.max(0, Math.abs(phi) - 1.05); return 0.04 * phi + Math.sign(phi) * (8 * s + 60 * s * s); };
  function stateAt(t) {
    if (st.mode === 'dc') {
      const td = Math.max(0, t - st.tdc), phi = 1.7 * (1 - Math.exp(-td / 0.8)), dphi = 1.7 / 0.8 * Math.exp(-td / 0.8);
      const v1 = 1, v2 = st.n * dphi / 1.2, i2 = st.load * v2 / Math.max(st.n, 0.05), i1 = Math.min(25, imag(phi) + td * 4) + st.n * i2 * 0;
      return { v1, v2, phi, i1: Math.min(12, i1), i2: v2 * st.load, im: Math.min(12, i1) };
    }
    const v1 = Math.sin(W * t), phi = -Math.cos(W * t) + st.bias;
    const i2 = st.load * Math.sin(W * t), im = imag(phi);
    return { v1, v2: st.n * v1, phi, i1: i2 + im, i2, im };
  }
  let geo = null;
  const fig = new Fig(el, {
    label: 'An animated transformer: alternating voltage on the primary coil drives a changing magnetic flux around the iron core, which induces a voltage in the secondary coil; change the turns ratio, the load, and add a DC bias',
    height: w => w < 600 ? 640 : 400, animated: true,
    step() {},
    draw(ctx, w, h, f) {
      const narrow = w < 600, t = f.t, s = stateAt(t);
      // ---- the machine ----
      const M = narrow ? { l: 10, r: w - 10, t: 10, b: 300 } : { l: 10, r: w * 0.52, t: 16, b: h - 16 };
      const cw = Math.min((M.r - M.l) * 0.56, 300), ch = Math.min(M.b - M.t - 40, 250), cx = (M.l + M.r) / 2, cy = (M.t + M.b) / 2 + 4;
      const th = Math.min(cw, ch) * 0.2;
      const o = { l: cx - cw / 2, r: cx + cw / 2, t: cy - ch / 2, b: cy + ch / 2 };
      const sat = Math.abs(s.phi) > 1.05;
      ctx.fillStyle = sat ? mix(IRON, SAT, clamp((Math.abs(s.phi) - 1.05) * 3, 0, 0.7)) : IRON;
      ctx.fillRect(o.l, o.t, cw, ch); ctx.fillStyle = '#fbfaf6'; ctx.fillRect(o.l + th, o.t + th, cw - 2 * th, ch - 2 * th);
      // lamination lines
      ctx.strokeStyle = alpha('#fff', 0.25); ctx.lineWidth = 1; for (let k = 1; k < 5; k++) { const d = th * k / 5; ctx.strokeRect(o.l + d, o.t + d, cw - 2 * d, ch - 2 * d); }
      // flux arrows around the mean path
      const mp = { l: o.l + th / 2, r: o.r - th / 2, t: o.t + th / 2, b: o.b - th / 2 }, P = 2 * ((mp.r - mp.l) + (mp.b - mp.t));
      const ptAt = d => { d = ((d % P) + P) % P; const a = mp.r - mp.l, b = mp.b - mp.t; if (d < a) return [mp.l + d, mp.t, 1, 0]; d -= a; if (d < b) return [mp.r, mp.t + d, 0, 1]; d -= b; if (d < a) return [mp.r - d, mp.b, -1, 0]; d -= a; return [mp.l, mp.b - d, 0, -1]; };
      const mag = clamp(Math.abs(s.phi) / 1.6, 0, 1), dir = Math.sign(s.phi) || 1, NA = 14;
      for (let k = 0; k < NA; k++) {
        const [x, y, dx, dy] = ptAt(k * P / NA + (st.mode === 'ac' ? (t * 18) % (P / NA) * 0 : 0));
        const L = 5 + 9 * mag; if (mag < 0.04) continue;
        arrow(ctx, x - dx * dir * L, y - dy * dir * L, x + dx * dir * L, y + dy * dir * L, alpha(sat ? SAT : '#fff', 0.35 + 0.65 * mag), 2, 6);
      }
      // coils
      const coil = (x, n, col, label, cur) => {
        const nn = clamp(Math.round(n), 1, 28), top = o.t + th * 1.3, bot = o.b - th * 1.3, gap = (bot - top) / nn;
        for (let k = 0; k < nn; k++) { const y = top + gap * (k + 0.5); ctx.strokeStyle = col; ctx.lineWidth = clamp(gap * 0.55, 1.5, 6); ctx.beginPath(); ctx.ellipse(x, y, th * 0.85, Math.min(gap * 0.32, 5), 0, 0, Math.PI * 2); ctx.stroke(); }
        text(ctx, label, x, o.b + 18, { size: 11, weight: 650, color: C.ink2, align: 'center' });
      };
      coil(o.l + th / 2, 10, COPPER, 'primary · 10 turns');
      coil(o.r - th / 2, 10 * st.n, darken(COPPER, 0.15), `secondary · ${Math.round(10 * st.n * 10) / 10 === Math.round(10 * st.n) ? Math.round(10 * st.n) : (10 * st.n).toFixed(1)} turns`);
      // source and load
      const sx0 = Math.max(M.l + 22, o.l - 40), lx0 = Math.min(M.r - 22, o.r + 40);
      line(ctx, sx0, o.t + th * 1.3, o.l, o.t + th * 1.3, C.ink2, 1.5); line(ctx, sx0, o.b - th * 1.3, o.l, o.b - th * 1.3, C.ink2, 1.5); line(ctx, sx0, o.t + th * 1.3, sx0, o.b - th * 1.3, C.ink2, 1.5);
      circle(ctx, sx0, cy, 14, '#fff', C.ink, 1.5);
      if (st.mode === 'ac') { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const x = sx0 - 8 + k * 0.8, y = cy - 5 * Math.sin(k / 20 * Math.PI * 2); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.stroke(); }
      else { text(ctx, '+', sx0, cy - 1, { size: 13, weight: 700, color: C.ink, align: 'center' }); text(ctx, 'DC', sx0, cy + 10, { size: 8, color: C.ink, align: 'center' }); }
      line(ctx, lx0, o.t + th * 1.3, o.r, o.t + th * 1.3, C.ink2, 1.5); line(ctx, lx0, o.b - th * 1.3, o.r, o.b - th * 1.3, C.ink2, 1.5);
      if (st.load > 0.001) { line(ctx, lx0, o.t + th * 1.3, lx0, o.b - th * 1.3, C.ink2, 1.5); const glow = clamp(Math.abs(s.v2 * s.i2) / Math.max(st.n, 0.2) * 1.2, 0, 1); circle(ctx, lx0, cy, 13, mix('#fff', '#ffd34d', glow), C.ink, 1.5); if (glow > 0.05) circle(ctx, lx0, cy, 13 + 10 * glow, alpha('#ffd34d', 0.25 * glow), null); text(ctx, 'load', lx0, cy + 30, { size: 10, color: C.ink3, align: 'center' }); }
      else { line(ctx, lx0, o.t + th * 1.3, lx0, cy - 8, C.ink2, 1.5); line(ctx, lx0, cy + 8, lx0, o.b - th * 1.3, C.ink2, 1.5); text(ctx, 'open', lx0 + 4, cy + 4, { size: 10, color: C.ink3 }); }
      text(ctx, sat ? 'core saturated' : 'magnetic flux in the iron', cx, o.t - 8, { size: 11, weight: 650, color: sat ? SAT : FLUX, align: 'center' });
      // ---- waveforms ----
      const G = narrow ? { l: 48, r: w - 12, t: 330, b: h - 16 } : { l: w * 0.56 + 40, r: w - 14, t: 18, b: h - 16 };
      const rows = [['voltage', [['primary', t2 => stateAt(t2).v1, COPPER], ['secondary', t2 => stateAt(t2).v2, darken(COPPER, 0.35)]], 2.2],
        ['flux', [['flux', t2 => stateAt(t2).phi, FLUX]], 2.2],
        ['current', [['primary', t2 => stateAt(t2).i1, COPPER], ['magnetising', t2 => stateAt(t2).im, SAT]], st.mode === 'dc' ? 13 : Math.max(1.6, 1.15 * Math.max(st.load + 0.1, Math.abs(imag(1 + st.bias)) + st.load))]];
      const rh = (G.b - G.t) / 3, span = 4;
      rows.forEach(([name, series, lim], r) => {
        const B = { l: G.l, r: G.r, t: G.t + r * rh + 14, b: G.t + (r + 1) * rh - 8 };
        const yy = scale(-lim, lim, B.b, B.t), xx = scale(t - span, t, B.l, B.r);
        line(ctx, B.l, yy(0), B.r, yy(0), C.grid2, 1);
        if (name === 'flux') { ctx.fillStyle = alpha(SAT, 0.08); ctx.fillRect(B.l, B.t, B.r - B.l, yy(1.05) - B.t); ctx.fillRect(B.l, yy(-1.05), B.r - B.l, B.b - yy(-1.05)); text(ctx, 'saturation', B.r - 4, B.t + 10, { size: 9.5, color: SAT, align: 'right' }); }
        text(ctx, name, B.l - 8, (B.t + B.b) / 2 + 4, { size: 10.5, weight: 650, color: C.ink2, align: 'right' });
        let lx = B.l;
        series.forEach(([nm, fn, col]) => {
          const pts = []; for (let k = 0; k <= 160; k++) { const tt = t - span + span * k / 160; pts.push([xx(tt), yy(clamp(fn(tt), -lim, lim))]); }
          pathLine(ctx, pts, col, 1.8);
          text(ctx, nm, lx, B.t - 3, { size: 9.5, color: col, weight: 600 }); lx += measure(ctx, nm, 9.5, 600) + 10;
        });
      });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Turns ratio (secondary ÷ primary)', min: 0.1, max: 3, step: 0.1, value: st.n, color: COPPER, fmt: v => v.toFixed(1) + '×', oninput: v => { st.n = v; upd(); }, name: 'n' });
  slider(ctl, { label: 'Load', min: 0, max: 1.2, step: 0.05, value: st.load, color: C.solar, fmt: v => v === 0 ? 'open circuit' : Math.round(v * 100) + '% of rated', oninput: v => { st.load = v; upd(); }, name: 'load' });
  const fadv = more(ctl, 'More: DC offset and DC supply');
  slider(fadv, { label: 'DC offset in the flux (as from a geomagnetic storm)', min: 0, max: 0.4, step: 0.02, value: 0, color: SAT, fmt: v => Math.round(v * 100) + '%', oninput: v => { st.bias = v; upd(); }, name: 'bias', wide: true });
  segmented(fadv, { label: 'Supply', options: [{ label: 'AC', value: 'ac', name: 'sup-ac' }, { label: 'DC', value: 'dc', name: 'sup-dc' }], value: 'ac', onchange: v => { st.mode = v; st.tdc = fig.t; if (v === 'dc') fig.stepOnce(0); upd(); } });
  function upd() {
    if (st.mode === 'dc') { ro.innerHTML = 'With a steady (DC) supply the flux builds up once and then stops changing — so <b>nothing is induced</b> in the secondary, and once the core saturates, the primary current is limited only by the resistance of the copper. A real transformer on DC overheats in seconds.'; fig.invalidate(); return; }
    const V2 = 230 * st.n, I1 = st.load * 10, I2 = st.n > 0 ? I1 / st.n : 0;
    let pk = 0; for (let k = 0; k < 200; k++) pk = Math.max(pk, Math.abs(imag(Math.cos(k / 200 * 2 * Math.PI) * -1 + st.bias)));
    ro.innerHTML = `For a 230 V primary: secondary <b>${Math.round(V2)} V</b>; at ${Math.round(st.load * 100)}% load the secondary carries <b>${I2.toFixed(1)} A</b> and the primary <b>${I1.toFixed(1)} A</b> — volts go up exactly as amps go down. ` + (st.bias > 0.04 ? `With the DC offset the core saturates every half-cycle and the magnetising current spikes to <b>${pk.toFixed(1)}×</b> the rated current.` : 'Notice that the flux is the same at every load: it is set by the supply voltage, not by the current drawn.');
    fig.invalidate();
  }
  upd();
}

/* ---------------- coreLoss ---------------- */
const MATS = {
  iron: { name: 'Plain low-carbon iron', Hc: 80, a: 160, Bs: 2.0, rho: 10e-8, dens: 7870, Bmax: 1.8, col: '#7a6f66' },
  go: { name: 'Grain-oriented silicon steel', Hc: 8, a: 12, Bs: 2.0, rho: 48e-8, dens: 7650, Bmax: 1.8, col: IRON },
  amo: { name: 'Amorphous metal', Hc: 2.5, a: 5, Bs: 1.56, rho: 130e-8, dens: 7180, Bmax: 1.45, col: '#9f8fb8' },
};
const THK = [10, 2, 0.5, 0.35, 0.27, 0.23];
export function coreLoss(el) {
  const st = { m: 'go', B: 1.7, ti: 4 }; let res = {};
  const hAt = (m, B, up) => { // inverse of B = Bs*tanh((H ∓ Hc)/a) on each branch
    const x = clamp(B / m.Bs, -0.999, 0.999); return m.a * Math.atanh(x) + (up ? m.Hc : -m.Hc);
  };
  function compute() {
    const m = MATS[st.m], B = Math.min(st.B, m.Bmax), f = 50;
    const t = st.m === 'amo' ? 0.025 : THK[st.ti] ; // mm
    const area = 4 * m.Hc * B * 1.0; // J/m3 per cycle (approx. loop area)
    const ph = area * f / m.dens; // W/kg
    let pe = Math.PI ** 2 * f * f * B * B * (t / 1000) ** 2 / (6 * m.rho * m.dens);
    return { m, B, t, ph, pe, tot: ph + pe };
  }
  const fig = new Fig(el, {
    label: 'Core losses: the B–H hysteresis loop of a core material and the eddy currents inside its laminations; change the material, the peak flux density and the lamination thickness',
    height: w => w < 600 ? 680 : 380, animated: true, step() {},
    draw(ctx, w, h, f) {
      const narrow = w < 600; res = compute(); const { m, B } = res;
      // left: B-H loop
      const L = narrow ? { l: 50, r: w - 14, t: 34, b: 280 } : { l: 56, r: w * 0.5 - 10, t: 34, b: h - 40 };
      const Hm = Math.max(hAt(m, B, true), 30) * 1.15;
      const Hlim = st.m === 'iron' ? 600 : 60;
      const { sx, sy } = axes(ctx, { box: L, x0: -Hlim, x1: Hlim, y0: -2, y1: 2, xticks: [-Hlim, 0, Hlim], yticks: [-2, -1, 0, 1, 2], xfmt: v => v + '', yfmt: v => v + ' T', ylabel: 'flux density B', xlabel: 'magnetising field H (A/m)' });
      const up = [], dn = []; for (let k = 0; k <= 80; k++) { const b = -B + 2 * B * k / 80; up.push([sx(clamp(hAt(m, b, true), -Hlim, Hlim)), sy(b)]); dn.push([sx(clamp(hAt(m, b, false), -Hlim, Hlim)), sy(b)]); }
      ctx.beginPath(); up.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); dn.slice().reverse().forEach(([x, y]) => ctx.lineTo(x, y)); ctx.closePath(); ctx.fillStyle = alpha(SAT, 0.15); ctx.fill();
      pathLine(ctx, up, m.col, 2.2); pathLine(ctx, dn, m.col, 2.2);
      const ph = f.t * Math.PI, b = B * Math.sin(ph), rising = Math.cos(ph) > 0;
      circle(ctx, sx(clamp(hAt(m, b, rising), -Hlim, Hlim)), sy(b), 5.5, C.ink, '#fff', 1.5);
      text(ctx, 'area inside the loop = heat lost each cycle', L.r - 4, L.b - 10, { size: 10.5, color: SAT, align: 'right', weight: 600, halo: true });
      // right: lamination cross-section + bars
      const R = narrow ? { l: 14, r: w - 14, t: 330, b: h - 10 } : { l: w * 0.5 + 20, r: w - 14, t: 26, b: h - 10 };
      const bw = Math.min(170, (R.r - R.l) * 0.45), bh = Math.min(150, (R.b - R.t) * 0.55), bx = R.l + 4, by = R.t + 18;
      text(ctx, `core cross-section, ${res.t >= 1 ? res.t + ' mm plates' : res.t + ' mm sheets'}`, bx, R.t + 6, { size: 10.5, weight: 650, color: C.ink2 });
      const nL = clamp(Math.round(bh / Math.max(2.4, 150 * res.t / 10)), 1, 60), lh = bh / nL;
      for (let k = 0; k < nL; k++) {
        const y = by + k * lh; ctx.fillStyle = k % 2 ? m.col : lighten(m.col, 0.12); ctx.fillRect(bx, y, bw, lh - (nL > 1 ? Math.min(0.8, lh * 0.15) : 0));
        if (lh > 5) { const amp = 0.5 + 0.5 * Math.abs(Math.cos(ph)); ctx.strokeStyle = alpha('#ffd34d', 0.9 * amp); ctx.lineWidth = Math.max(1, Math.min(3, lh / 6)); ctx.beginPath(); ctx.ellipse(bx + bw / 2, y + lh / 2, bw * 0.42, Math.max(1, lh * 0.32), 0, 0, Math.PI * 2); ctx.stroke(); }
      }
      text(ctx, (ctx.canvas.clientWidth < 600) ? 'eddy currents stay inside each sheet' : 'eddy currents circle inside each sheet; insulation between sheets stops them crossing', bx, by + bh + 16, { size: 11, color: C.ink3 });
      // loss bars (log scale)
      const X = { l: narrow ? R.l + 80 : bx + bw + 92, r: R.r - 10 };
      const lx = v => scale(Math.log10(0.01), Math.log10(1000), X.l, X.r)(Math.log10(clamp(v, 0.01, 1000)));
      const rowsB = [['hysteresis', res.ph, SAT], ['eddy currents', res.pe, '#e0a03a'], ['total', res.tot, C.ink]];
      const y0 = narrow ? by + bh + 46 : by + 10;
      text(ctx, 'loss at 50 Hz, watts per kg (log scale)', X.l, y0 - 8, { size: 10.5, weight: 650, color: C.ink2 });
      rowsB.forEach(([nm, v, col], i) => { const y = y0 + i * 30; text(ctx, nm, X.l - 6, y + 13, { size: 10.5, color: C.ink2, align: 'right' }); ctx.fillStyle = col; ctx.fillRect(X.l, y + 3, Math.max(2, lx(v) - X.l), 14); text(ctx, v >= 10 ? Math.round(v) + '' : v.toFixed(2), Math.min(lx(v) + 5, X.r - 30), y + 14, { size: 10.5, weight: 650, color: C.ink, halo: true }); });
      (X.r - X.l < 260 ? [0.01, 1, 100] : [0.01, 0.1, 1, 10, 100, 1000]).forEach(v => text(ctx, String(v), lx(v), y0 + 102, { size: 9, color: C.ink3, align: 'center' }));
    },
  });
  const ctl = controls(el); const ro = readout(el);
  let thkCtl;
  segmented(ctl, { label: 'Material', options: Object.entries(MATS).map(([k, m]) => ({ label: m.name, value: k, name: 'mat-' + k })), value: st.m, onchange: v => { st.m = v; upd(); } });
  slider(ctl, { label: 'Peak flux density', min: 0.6, max: 1.8, step: 0.05, value: st.B, color: FLUX, fmt: v => v.toFixed(2) + ' T', oninput: v => { st.B = v; upd(); }, name: 'B' });
  thkCtl = slider(more(ctl, 'More: lamination thickness'), { label: 'Lamination thickness', min: 0, max: 5, step: 1, value: st.ti, color: IRON, fmt: v => THK[v] >= 1 ? THK[v] + ' mm (solid)' : THK[v] + ' mm', oninput: v => { st.ti = v; upd(); }, name: 'thk' });
  function upd() {
    const r = compute();
    ro.innerHTML = `<b>${r.m.name}</b> at ${r.B.toFixed(2)} T${st.B > r.m.Bmax ? ` (it saturates above about ${r.m.Bmax} T)` : ''}${st.m === 'amo' ? ', in ribbons 0.025 mm thick' : ''}: about <b>${r.ph.toFixed(2)} W/kg</b> of hysteresis loss and <b>${r.pe >= 10 ? Math.round(r.pe) : r.pe.toFixed(2)} W/kg</b> of eddy-current loss. A large power transformer’s core weighs on the order of 100 tonnes, so every 0.1 W/kg is about 10 kW, around the clock, for forty years.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- efficiency ---------------- */
export function efficiency(el) {
  const EU = XF.eu; const st = { i: 10, tier: 2, k: 0.4 }; let geoE = null;
  const L = () => { const r = EU[st.i]; return { kva: r[0], pk: st.tier === 2 ? r[3] : r[1], p0: st.tier === 2 ? r[4] : r[2] }; };
  const fig = new Fig(el, {
    label: 'Losses and efficiency of a distribution transformer at the EU legal maximum loss limits, against how heavily it is loaded',
    height: w => w < 600 ? 420 : 360,
    draw(ctx, w, h) {
      const narrow = w < 600, r = L();
      const A = { l: narrow ? 50 : 60, r: w - 16, t: 34, b: narrow ? 230 : h * 0.6 }; geoE = A;
      const ymax = r.pk * 1.5 * 1.5 / 1000 * 1.05;
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 1.5, y0: 0, y1: ymax, xticks: [], yticks: [0, ymax / 2, ymax].map(v => +v.toPrecision(2)), yfmt: v => v + ' kW', ylabel: `losses of a ${r.kva.toLocaleString('en')} kVA transformer` });
      const pts = f => Array.from({ length: 76 }, (_, j) => { const k = j / 50; return [sx(k), sy(f(k) / 1000)]; });
      ctx.fillStyle = alpha(IRON, 0.35); ctx.beginPath(); pts(k => r.p0).forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.lineTo(sx(1.5), sy(0)); ctx.lineTo(sx(0), sy(0)); ctx.fill();
      ctx.fillStyle = alpha(COPPER, 0.4); ctx.beginPath(); pts(k => r.p0 + r.pk * k * k).forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); pts(k => r.p0).reverse().forEach(([x, y]) => ctx.lineTo(x, y)); ctx.fill();
      pathLine(ctx, pts(k => r.p0 + r.pk * k * k), C.ink, 1.8);
      text(ctx, 'copper (load) losses ∝ current²', sx(1.0), sy((r.p0 + r.pk * 1.0) / 1000) - 12, { size: 10.5, color: darken(COPPER, 0.3), align: 'right', weight: 600, halo: true });
      text(ctx, 'core (no-load) losses: constant', sx(1.48), sy(r.p0 / 1000) - 6, { size: 10.5, color: darken(IRON, 0.3), align: 'right', weight: 600, halo: true });
      line(ctx, sx(st.k), A.t, sx(st.k), A.b, C.ink, 1, [3, 3]);
      // efficiency panel
      const E = { l: A.l, r: A.r, t: A.b + 30, b: h - 34 };
      const e0 = 98.0;
      const { sx: ex, sy: ey } = axes(ctx, { box: E, x0: 0, x1: 1.5, y0: e0, y1: 100, xticks: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5], yticks: [98, 99, 100], xfmt: v => Math.round(v * 100) + '%', yfmt: v => v + '%', ylabel: 'efficiency', xlabel: 'load, % of rating' });
      const eff = k => k <= 0 ? 0 : 100 * k * r.kva * 1000 / (k * r.kva * 1000 + r.p0 + r.pk * k * k);
      pathLine(ctx, Array.from({ length: 150 }, (_, j) => { const k = 0.01 + j / 100; return [ex(k), ey(Math.max(e0, eff(k)))]; }), C.storage, 2.2);
      const kp = Math.sqrt(r.p0 / r.pk);
      circle(ctx, ex(kp), ey(eff(kp)), 4.5, C.storage, '#fff', 1.4);
      text(ctx, `peak ${eff(kp).toFixed(2)}% at ${Math.round(kp * 100)}% load`, ex(kp) + 8, ey(eff(kp)) + 14, { size: 10.5, weight: 650, color: darken(C.storage, 0.2), halo: true });
      line(ctx, ex(st.k), E.t, ex(st.k), E.b, C.ink, 1, [3, 3]);
    },
  });
  fig.interact({ hit: (x, y) => (geoE && x > geoE.l && x < geoE.r && y > geoE.t && y < geoE.b) ? 'k' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { const narrow = fig.w < 600, l = narrow ? 50 : 60; st.k = clamp(Math.round((x - l) / (fig.w - 16 - l) * 1.5 * 100) / 100, 0.01, 1.5); ksl.set(st.k); upd(); };
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Rating', min: 0, max: EU.length - 1, step: 1, value: st.i, color: IRON, fmt: v => EU[v][0].toLocaleString('en') + ' kVA', oninput: v => { st.i = v; upd(); }, name: 'kva' });
  const ksl = slider(ctl, { label: 'Load', min: 0.01, max: 1.5, step: 0.01, value: st.k, color: C.solar, fmt: v => Math.round(v * 100) + '%', oninput: v => { st.k = v; upd(); }, name: 'k' });
  segmented(more(ctl, 'More: older EU limit'), { label: 'EU limit', options: [{ label: 'Tier 1 (2015)', value: 1, name: 'tier1' }, { label: 'Tier 2 (2021)', value: 2, name: 'tier2' }], value: 2, onchange: v => { st.tier = v; upd(); } });
  function upd() {
    const r = L(), P = st.k * r.kva, loss = r.p0 + r.pk * st.k * st.k, e = 100 * P * 1000 / (P * 1000 + loss);
    ro.innerHTML = `${r.kva.toLocaleString('en')} kVA at ${Math.round(st.k * 100)}% load: <b>${(loss / 1000).toFixed(2)} kW</b> of losses, efficiency <b>${e.toFixed(2)}%</b>. Held at this load for a year it would turn <b>${(loss * 8760 / 1e6).toFixed(1)} MWh</b> into heat — ${Math.round(r.p0 * 8760 / 1000).toLocaleString('en')} kWh of it in the core, even if nothing were connected.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- hotSpot ---------------- */
export function hotSpot(el) {
  const st = { peak: 1.3, amb: 20, fans: false, paper: 'kraft' };
  const shape = hh => { // residential-like daily load shape, max 1 at 19:00
    const base = 0.45 + 0.15 * Math.exp(-((hh - 8) ** 2) / 6) + 0.55 * Math.exp(-((hh - 19.2) ** 2) / 7) + 0.1 * Math.exp(-((hh - 13) ** 2) / 10);
    return base;
  };
  let maxShape = 0; for (let k = 0; k < 240; k++) maxShape = Math.max(maxShape, shape(k / 10));
  let sim = null;
  function run() {
    // IEC 60076-7 exponential equations, ONAN medium/large power transformer defaults (simplified, k21 overshoot ignored)
    const R = 6, x = 0.8, y = 1.3, H = 1.3, gr = 20, dTor = 52, to = 210, tw = 10;
    const cap = st.fans ? 1.33 : 1;
    let To = 30, Th = 0; const out = [];
    for (let m = 0; m < 3 * 1440; m++) {
      const hh = (m % 1440) / 60, K = st.peak * shape(hh) / maxShape / cap, amb = st.amb + 5 * Math.sin((hh - 9) / 24 * 2 * Math.PI);
      const dTo_u = dTor * ((1 + R * K * K) / (1 + R)) ** x, dTh_u = H * gr * K ** y;
      To += (dTo_u - To) / to; Th += (dTh_u - Th) / tw;
      const th = amb + To + Th;
      const V = st.paper === 'kraft' ? 2 ** ((th - 98) / 6) : Math.exp(15000 / 383 - 15000 / (th + 273));
      if (m >= 2 * 1440) out.push({ hh, K: K * cap, amb, top: amb + To, hot: th, V });
    }
    const life = out.reduce((a, o) => a + o.V, 0) / 1440;
    return { out, life, maxHot: Math.max(...out.map(o => o.hot)) };
  }
  const fig = new Fig(el, {
    label: 'A day in the life of a transformer: load, ambient, top-oil and hot-spot temperatures, and how fast its paper insulation ages, using the IEC 60076-7 thermal model',
    height: w => w < 600 ? 460 : 380,
    draw(ctx, w, h) {
      const narrow = w < 600, s = sim;
      const A = { l: narrow ? 46 : 56, r: w - (narrow ? 40 : 56), t: 40, b: h * 0.62 };
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 24, y0: -10, y1: 160, xticks: [0, 6, 12, 18, 24], yticks: [0, 40, 80, 120, 160], xfmt: v => v + ':00', yfmt: v => v + ' °C', ylabel: 'temperatures over the day' });
      const ref = st.paper === 'kraft' ? 98 : 110;
      line(ctx, A.l, sy(ref), A.r, sy(ref), alpha(SAT, 0.6), 1, [4, 3]);
      text(ctx, `${ref} °C: paper ages at its normal rate`, A.l + 4, sy(ref) - 5, { size: 10, color: SAT, halo: true });
      ctx.fillStyle = alpha(C.solar, 0.18); ctx.beginPath(); ctx.moveTo(sx(0), A.b); s.out.forEach(o => ctx.lineTo(sx(o.hh), scale(0, 2, A.b, A.t)(o.K))); ctx.lineTo(sx(24), A.b); ctx.fill();
      const kx = scale(0, 2, A.b, A.t); for (const v of [0, 1, 2]) text(ctx, Math.round(v * 100) + '%', A.r + 6, kx(v) + 4, { size: 10, color: darken(C.solar, 0.3) });
      text(ctx, 'load', A.r + 6, kx(2) - 12, { size: 10, color: darken(C.solar, 0.3), weight: 650 });
      const lines = [['ambient', 'amb', C.cold], ['top oil', 'top', '#8b6a4c'], ['winding hot spot', 'hot', SAT]];
      lines.forEach(([nm, k, col]) => { pathLine(ctx, s.out.filter((_, i) => i % 5 === 0).map(o => [sx(o.hh), sy(o[k])]), col, 2); });
      let lx = narrow ? A.l + 4 : A.l + 190; lines.forEach(([nm, k, col]) => { ctx.fillStyle = col; ctx.fillRect(lx, A.t - 26, 10, 3); text(ctx, nm, lx + 14, A.t - 21, { size: 10.5, color: C.ink2 }); lx += measure(ctx, nm, 10.5) + 32; });
      // ageing rate panel
      const B = { l: A.l, r: A.r, t: A.b + 40, b: h - 30 };
      const vy = v => scale(-2, 3, B.b, B.t)(Math.log10(clamp(v, 0.01, 1000)));
      text(ctx, 'ageing rate (1 = normal; log scale)', B.l - 4, B.t - 10, { size: 10.5, color: C.ink3, weight: 500 });
      [0.01, 1, 100].forEach(v => { line(ctx, B.l, vy(v), B.r, vy(v), C.grid, 1); text(ctx, v === 1 ? '1×' : v + '×', B.l - 6, vy(v) + 4, { size: 10, color: C.ink3, align: 'right' }); });
      const bw = (B.r - B.l) / 96;
      for (let i = 0; i < 96; i++) { const seg = s.out.slice(i * 15, i * 15 + 15), v = seg.reduce((a, o) => a + o.V, 0) / seg.length; ctx.fillStyle = v > 1 ? SAT : alpha(C.storage, 0.8); const y1 = vy(Math.max(v, 0.01)), y0 = vy(1); ctx.fillRect(B.l + i * bw, Math.min(y0, y1), bw - 0.5, Math.abs(y1 - y0) + 0.5); }
      for (const v of [0, 6, 12, 18, 24]) text(ctx, v + ':00', B.l + (B.r - B.l) * v / 24, B.b + 14, { size: 10, color: C.ink3, align: 'center' });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Evening peak load', min: 0.5, max: 1.6, step: 0.05, value: st.peak, color: C.solar, fmt: v => Math.round(v * 100) + '% of rating', oninput: v => { st.peak = v; upd(); }, name: 'peak' });
  slider(ctl, { label: 'Average air temperature', min: -10, max: 40, step: 1, value: st.amb, color: C.cold, fmt: v => v + ' °C', oninput: v => { st.amb = v; upd(); }, name: 'amb' });
  const hadv = more(ctl, 'More: fans and paper type');
  segmented(hadv, { label: 'Cooling', options: [{ label: 'Natural (ONAN)', value: false, name: 'onan' }, { label: 'Fans on (ONAF, +33%)', value: true, name: 'onaf' }], value: false, onchange: v => { st.fans = v; upd(); } });
  segmented(hadv, { label: 'Paper', options: [{ label: 'Kraft', value: 'kraft', name: 'p-kraft' }, { label: 'Thermally upgraded', value: 'tu', name: 'p-tu' }], value: 'kraft', onchange: v => { st.paper = v; upd(); } });
  function upd() {
    sim = run();
    const d = sim.life;
    ro.innerHTML = `Hottest point in the winding: <b>${Math.round(sim.maxHot)} °C</b>. Over this day the insulation ages by <b>${d < 0.1 ? (d * 24).toFixed(1) + ' hours' : d.toFixed(d < 10 ? 2 : 0) + ' days'}</b> — ${d > 1.05 ? 'faster than normal: run like this every day and the paper wears out ' + d.toFixed(1) + '× sooner' : d < 0.95 ? 'slower than normal, banking life for hotter days' : 'about the normal rate'}.`;
    fig.invalidate();
  }
  upd();
}
