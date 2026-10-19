// The generator, built up: (1) one coil and a rotor you turn by hand; (2) three coils a third of a turn apart.
// Both use lib/machine.js, the same drawing the windings figure of Part 3 starts from.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, line, clamp, axes, pathLine, circle } from '../lib/draw.js';
import { controls, slider, segmented, readout, more, hint } from '../lib/ui.js';
import { drawStator, drawRotor, drawCoil, COPPER, PH, PH_NAME } from '../lib/machine.js';

const SLOW = 60;                                  // drawn 60× slower than real
const W0 = 3000 / 60 * 2 * Math.PI / SLOW;        // drawn angular speed of a 3,000 rpm rotor

export function generator(el, opts = {}) {
  const stage = opts.stage || 1, three = stage >= 2;
  const st = { ang: 0.4, omega: 0, spin: three, rpm: 3000, p: 1, mode: 'v', hist: [], drag: null, lastA: null };
  const N = 300;
  const emf = k => st.omega / W0 * Math.sin(st.p * st.ang - k * 2 * Math.PI / 3); // voltage of phase k (A when k = 0)
  const fig = new Fig(el, {
    label: three ? 'A generator with three coils a third of a turn apart: three voltages 120 degrees out of step, their sum, and their power'
      : 'A generator seen end-on: turn the magnet by hand inside one coil and watch the flux and the voltage it induces',
    height: w => w < 560 ? Math.round(w * 0.78 + 250) : Math.max(320, Math.min(390, w * 0.46)),
    animated: true,
    step(dt) {
      if (st.drag == null) {
        const target = st.spin ? st.rpm / 60 * 2 * Math.PI / SLOW : 0;
        st.omega += (target - st.omega) * Math.min(1, dt * (st.spin ? 3 : 1.2)); // a let-go rotor coasts to a stop
        st.ang += st.omega * dt;
      }
      const v = [0, 1, 2].map(emf);
      st.hist.push({ phi: Math.cos(st.p * st.ang), v }); if (st.hist.length > N) st.hist.shift();
    },
    draw(ctx, w, h) {
      const narrow = w < 560;
      const R = narrow ? Math.min(w * 0.3, 120) : Math.min(h * 0.38, w * 0.17);
      const cx = narrow ? w / 2 : R + 44, cy = narrow ? R + 30 : h / 2;
      const slots = [];
      const ks = three ? [0, 1, 2] : [0];
      for (let k of ks) for (let q = 0; q < 2 * st.p; q++) {
        const a = Math.PI + q * Math.PI / st.p + k * 2 * Math.PI / 3 / st.p;
        slots.push({ a, col: three ? PH[k] : COPPER, e: (q % 2 ? -1 : 1) * emf(k) });
      }
      drawStator(ctx, cx, cy, R, slots);
      drawRotor(ctx, cx, cy, R * 0.78, st.ang, st.p, !three);
      if (three && !narrow) for (const k of ks) { const a = Math.PI + k * 2 * Math.PI / 3 / st.p; text(ctx, PH_NAME[k], cx + Math.cos(a) * (R + 34), cy + Math.sin(a) * (R + 34) + 4, { size: 12, weight: 700, color: PH[k], align: 'center' }); }
      st.geom = { cx, cy, R };
      // trace
      const box = narrow ? { l: 40, r: w - 14, t: 2 * R + 92, b: h - 26 } : { l: cx + R + 80, r: w - 16, t: 34, b: h - 34 };
      const ymax = st.mode === 'p' ? 1.9 : 1.7;
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: N, y0: st.mode === 'p' ? 0 : -ymax, y1: ymax, yticks: st.mode === 'p' ? [0] : [0], xticks: [], yfmt: () => '0' });
      const H = st.hist, off = N - H.length, X = i => sx(i + off);
      if (!three) {
        pathLine(ctx, H.map((o, i) => [X(i), sy(o.phi)]), alpha(C.ink3, 0.9), 1.5, [4, 4]);
        pathLine(ctx, H.map((o, i) => [X(i), sy(clamp(o.v[0], -ymax, ymax))]), COPPER, 2.4);
        text(ctx, 'magnetic flux through the coil', box.l + 6, box.t - 6, { size: 11, color: C.ink3 });
        text(ctx, 'voltage across the coil', box.l + 6, box.t + 10, { size: 11, color: '#9a6236', weight: 600 });
      } else if (st.mode === 'v' || st.mode === 'sum') {
        for (const k of ks) pathLine(ctx, H.map((o, i) => [X(i), sy(clamp(o.v[k], -ymax, ymax))]), st.mode === 'sum' ? alpha(PH[k], 0.45) : PH[k], 2);
        if (st.mode === 'sum') pathLine(ctx, H.map((o, i) => [X(i), sy(o.v[0] + o.v[1] + o.v[2])]), C.ink, 2.6);
        text(ctx, st.mode === 'sum' ? 'A + B + C: zero at every instant' : 'voltages of coils A, B and C', box.l + 6, box.t - 6, { size: 11, color: st.mode === 'sum' ? C.ink : C.ink2, weight: 600 });
      } else {
        // power into equal resistive loads ∝ v²; the three add to a constant 1.5 (at full speed)
        let base = H.map(() => 0);
        for (const k of ks) { const cur = H.map((o, i) => base[i] + o.v[k] ** 2); ctx.beginPath(); cur.forEach((y, i) => ctx.lineTo(X(i), sy(y))); for (let i = H.length - 1; i >= 0; i--) ctx.lineTo(X(i), sy(base[i])); ctx.closePath(); ctx.fillStyle = alpha(PH[k], 0.55); ctx.fill(); base = cur; }
        pathLine(ctx, H.map((o, i) => [X(i), sy(base[i])]), C.ink, 2);
        text(ctx, 'power of A, B and C, stacked: the total is flat', box.l + 6, box.t - 6, { size: 11, color: C.ink, weight: 600 });
      }
      text(ctx, `animation slowed ${SLOW}×`, box.r, box.b + 18, { size: 11, color: C.ink3, align: 'right' });
    },
  });
  for (let i = 0; i < N; i++) fig.opts.step(1 / 60);
  // turn the rotor by hand (stage 1) — anywhere on the rotor
  fig.interact({
    hit: (x, y) => { const g = st.geom; return g && Math.hypot(x - g.cx, y - g.cy) < g.R + 10 ? 'rotor' : null; },
    cursor: 'grab',
    down: (o, x, y) => { const g = st.geom; st.drag = Math.atan2(y - g.cy, x - g.cx) - st.ang; st.t0 = performance.now(); st.spin = false; spinSeg && spinSeg.set && spinSeg.set(false); },
    move: (o, x, y) => {
      const g = st.geom, now = performance.now(), dt = Math.max(1, now - st.t0) / 1000; st.t0 = now;
      let a = Math.atan2(y - g.cy, x - g.cx) - st.drag, d = a - st.ang; d = Math.atan2(Math.sin(d), Math.cos(d));
      st.ang += d; st.omega = st.omega * 0.6 + (d / dt) * 0.4;
    },
    up: () => { st.drag = null; upd(); },
  });
  const ctl = controls(el), ro = readout(el);
  let spinSeg = null;
  const upd = () => {
    const f = st.p * st.rpm / 60;
    ro.innerHTML = !three
      ? (st.spin ? `${st.p * 2} poles at ${st.rpm} rpm → <b>${f.toFixed(1)} Hz</b>. ${Math.abs(f - 50) < 0.3 ? 'That’s Europe’s grid frequency.' : Math.abs(f - 60) < 0.3 ? 'That’s North America’s.' : ''}` : `Turn the magnet: the faster you turn it, the faster the flux through the coil changes, and the bigger the voltage. Each half-turn the flux reverses and so does the voltage.`)
      : st.mode === 'v' ? `Three coils a third of a turn apart see the same magnet a third of a turn later: three identical voltages, each <b>120°</b> behind the last.`
      : st.mode === 'sum' ? `Add the three voltages and you get <b>zero</b>, at every instant. The three wires can be each other’s return path.`
      : `Each coil’s power pulses, but the three add up to a <b>constant</b> total: a smooth, steady load on the shaft.`;
    fig.invalidate();
  };
  if (!three) {
    spinSeg = segmented(ctl, { label: 'Rotor', options: [{ label: 'Turn it by hand', value: false, name: 'g-hand' }, { label: 'Let it spin', value: true, name: 'g-spin' }], value: st.spin, onchange: v => { st.spin = v; upd(); } });
    const adv = more(ctl, 'More: speed and poles');
    slider(adv, { label: 'Rotor speed', min: 0, max: 3600, step: 50, value: st.rpm, color: C.field, fmt: v => v.toFixed(0) + ' rpm', oninput: v => { st.rpm = v; upd(); }, name: 'rpm' });
    segmented(adv, { label: 'Pole pairs', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }], value: 1, onchange: v => { st.p = v; upd(); } });
    hint(el, 'grab the magnet and turn it, slowly and then fast; then pick <b>Let it spin</b>.');
  } else {
    segmented(ctl, { options: [{ label: 'Voltages', value: 'v', name: 'g3-v' }, { label: 'Add them up', value: 'sum', name: 'g3-sum' }, { label: 'Power', value: 'p', name: 'g3-p' }], value: st.mode, onchange: v => { st.mode = v; upd(); } });
    hint(el, 'pick <b>Add them up</b>, then <b>Power</b>. You can still grab the rotor and turn it.');
  }
  upd();
  el.__sim = { st };
}

// Part 3: the generator's three coils, taken out and wired two ways. Star: the coils share a neutral point and
// each sees the phase voltage; delta: each coil sits between two lines and sees √3 times more, 30° ahead.
export function windings(el) {
  const st = { mode: 'star', loadC: 1, t: 0, off: [0, 0, 0, 0] };
  const W = 2 * Math.PI * 0.35; // drawn speed: one cycle in ~3 s
  const fig = new Fig(el, {
    label: 'Three windings connected in star, with a neutral wire, or in delta, as a triangle; currents flow as moving dots and the traces show the voltages and the neutral current',
    height: w => w < 560 ? 580 : 380,
    animated: true,
    step(dt) {
      st.t += dt;
      const L = [1, 1, st.loadC];
      const i = [0, 1, 2].map(k => L[k] * Math.sin(W * st.t - k * 2 * Math.PI / 3));
      for (let k = 0; k < 3; k++) st.off[k] += i[k] * dt * 40;
      st.off[3] += (i[0] + i[1] + i[2]) * dt * 40;
    },
    draw(ctx, w, h) {
      const narrow = w < 560, star = st.mode === 'star';
      const cx = narrow ? w * 0.42 : w * 0.2, cy = narrow ? 130 : h * 0.4, r = narrow ? 88 : Math.min(105, h * 0.27);
      const ang = [-90, 30, 150].map(d => d * Math.PI / 180);
      const P = ang.map(a => [cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
      const outX = narrow ? w - 30 : w * 0.42;
      const L = [1, 1, st.loadC];
      const cur = [0, 1, 2].map(k => L[k] * Math.sin(W * st.t - k * 2 * Math.PI / 3)), iN = cur[0] + cur[1] + cur[2];
      // windings
      if (star) { for (let k = 0; k < 3; k++) drawCoil(ctx, cx, cy, P[k][0], P[k][1], PH[k], 5, 8); circle(ctx, cx, cy, 5, C.ink); text(ctx, 'neutral point', cx - 10, cy + 4, { size: 10.5, color: C.ink2, align: 'right', halo: true }); }
      else for (let k = 0; k < 3; k++) { const a = P[k], b = P[(k + 1) % 3]; drawCoil(ctx, a[0], a[1], b[0], b[1], PH[k], 6, 8); }
      for (let k = 0; k < 3; k++) circle(ctx, P[k][0], P[k][1], 4.5, C.ink);
      // line conductors out to the loads, with dots moving at the current
      const dots = (pts, off, col, mag) => {
        let Lt = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); Lt += d; }
        ctx.strokeStyle = alpha(col, 0.5); ctx.lineWidth = 2; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
        if (mag < 0.02 && Math.abs(off % 18) < 0) return;
        for (let s = ((off % 18) + 18) % 18; s < Lt; s += 18) { let u = s, i = 0; while (i < seg.length && u > seg[i]) { u -= seg[i]; i++; } if (i >= seg.length) break; const t = u / seg[i]; circle(ctx, pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t, 2.4, col); }
      };
      // tidy routing: A and B leave straight to the right; C drops below the windings first; N lower still
      const yC = P[2][1] + (narrow ? 26 : 30), yN = P[2][1] + (narrow ? 52 : 60);
      const route = [[P[0], [outX, P[0][1]]], [P[1], [outX, P[1][1]]], [P[2], [P[2][0], yC], [outX, yC]]];
      for (let k = 0; k < 3; k++) {
        dots(route[k], st.off[k], PH[k], Math.abs(cur[k]));
        const end = route[k][route[k].length - 1];
        text(ctx, PH_NAME[k], end[0] + 8, end[1] + 4, { size: 12, weight: 700, color: PH[k] });
      }
      if (star) {
        const pts = [[cx, cy], [cx, yN], [outX, yN]];
        dots(pts, st.off[3], C.ink, Math.abs(iN));
        text(ctx, 'N', pts[2][0] + 8, pts[2][1] + 4, { size: 12, weight: 700, color: C.ink });
      }
      // traces
      const box = narrow ? { l: 40, r: w - 14, t: 290, b: h - 26 } : { l: w * 0.52, r: w - 16, t: 34, b: h - 34 };
      const yM = 1.9, N = 220;
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: N, y0: -yM, y1: yM, yticks: [0], xticks: [], yfmt: () => '0' });
      const T = i => st.t - (N - i) / 60;
      if (star) {
        for (let k = 0; k < 3; k++) { const pts = []; for (let i = 0; i <= N; i += 2) pts.push([sx(i), sy(L[k] * Math.sin(W * T(i) - k * 2 * Math.PI / 3))]); pathLine(ctx, pts, PH[k], 1.8); }
        const pn = []; for (let i = 0; i <= N; i += 2) { let s = 0; for (let k = 0; k < 3; k++) s += L[k] * Math.sin(W * T(i) - k * 2 * Math.PI / 3); pn.push([sx(i), sy(s)]); }
        pathLine(ctx, pn, C.ink, 2.6);
        text(ctx, 'currents in A, B, C, and in the neutral (black)', box.l + 6, box.t - 6, { size: 11, color: C.ink2, weight: 600 });
      } else {
        const pa = [], pab = []; for (let i = 0; i <= N; i += 2) { const a = Math.sin(W * T(i)), b = Math.sin(W * T(i) - 2 * Math.PI / 3); pa.push([sx(i), sy(a)]); pab.push([sx(i), sy(a - b)]); }
        pathLine(ctx, pa, alpha(PH[0], 0.6), 1.6, [5, 4]); pathLine(ctx, pab, PH[0], 2.6);
        text(ctx, 'dashed: line A to neutral; solid: across winding A–B, √3 bigger, 30° ahead', box.l + 6, box.t - 6, { size: 11, color: C.ink2, weight: 600 });
      }
    },
  });
  const ctl = controls(el), ro = readout(el);
  let cS;
  const upd = () => {
    const iN = Math.sqrt((1 + 1 + st.loadC ** 2) - (1 * 1 + 1 * st.loadC + st.loadC * 1)); // rms of the sum of three 120°-spaced sines, relative
    ro.innerHTML = st.mode === 'star'
      ? `Star: each winding sees the line-to-neutral voltage, <b>230 V</b> on a 400 V network. ${Math.abs(st.loadC - 1) < 0.02 ? 'With equal loads the three currents cancel and the <b>neutral carries nothing</b>.' : `With phase C loaded at ${Math.round(st.loadC * 100)}%, the neutral carries <b>${Math.round(iN * 100)}%</b> of a phase current: the imbalance has to go somewhere.`}`
      : `Delta: each winding sits between two lines and sees the full <b>400 V</b>, √3 times the star voltage, shifted <b>30°</b>. There is no neutral point, so no neutral wire.`;
    cS && (cS.el.closest('.ctl').style.opacity = st.mode === 'star' ? '' : 0.45);
    fig.invalidate();
  };
  segmented(ctl, { label: 'Connect the three windings', options: [{ label: 'Star (Y)', value: 'star', name: 'w-star' }, { label: 'Delta (D)', value: 'delta', name: 'w-delta' }], value: st.mode, onchange: v => { st.mode = v; upd(); } });
  cS = slider(ctl, { label: 'Load on phase C', min: 0, max: 1.5, step: 0.05, value: st.loadC, color: C.phaseC, fmt: v => Math.round(v * 100) + '%', oninput: v => { st.loadC = v; upd(); }, name: 'loadC' });
  hint(el, 'turn phase C’s load down and watch current appear in the neutral; then switch to <b>Delta</b>.');
  upd();
}
