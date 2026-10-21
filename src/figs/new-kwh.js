// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
// emfHill: voltage as height (the battery lifts each charge; the circuit is the run back down).
// resistance: a wire, a lamp filament and a wire in series, seen as a lattice; the height lost in each part is I × R.
import { Fig } from '../lib/fig.js';
import { C, alpha, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, approach } from '../lib/draw.js';
import { controls, slider, readout } from '../lib/ui.js';

// energy colour: low = blue, high = amber (the same scale in both figures)
const HI = '#e8962c';
const ecol = z => mix(C.electron, HI, clamp(z, 0, 1));

// ---------------------------------------------------------------------------
// Voltage as height. The circuit lies on the floor; the track above it is the energy each charge carries.
// ---------------------------------------------------------------------------
export function emfHill(el) {
  const R_LAMP = 12, WF = 0.012; // lamp resistance (Ω); share of the height lost in each wire
  const st = { V: 9, s: 0, glow: 0.5 };
  const N = 46;
  // path in world units: left side (battery, rising), back (wire), right side (lamp, falling), front (wire)
  const SIDE = 0.5, LEN = 2 + 2 * SIDE;
  const at = s => {
    let u = ((s % 1) + 1) % 1 * LEN;
    if (u < SIDE) { const f = u / SIDE; return { x: 0, d: f, z: f, seg: 'bat', f }; }
    u -= SIDE;
    if (u < 1) return { x: u, d: 1, z: 1 - WF * u, seg: 'top', f: u };
    u -= 1;
    if (u < SIDE) { const f = u / SIDE; const g = clamp((f - 0.2) / 0.6, 0, 1); return { x: 1, d: 1 - f, z: lerp(1 - WF, WF, g), seg: 'lamp', f }; }
    u -= SIDE;
    return { x: 1 - u, d: 0, z: WF * (1 - u), seg: 'bot', f: u };
  };
  let G = null;
  const fig = new Fig(el, {
    label: 'A circuit drawn as a landscape: the battery lifts each charge up a hill, the charges run back down through the lamp',
    height: w => Math.max(340, Math.min(430, w * 0.5)),
    animated: true,
    step(dt) {
      st.s = (st.s + dt * 0.022 * (st.V / R_LAMP) * 2) % 1;
      st.glow = approach(st.glow, (st.V / 12) ** 2, 6, dt);
    },
    draw(ctx, w, h) {
      const narrow = w < 560;
      const pad = 16, Dx = Math.min(150, w * 0.2), left = pad + (narrow ? 46 : 70), right = w - pad - (narrow ? 70 : 110);
      const Wf = right - left - Dx, yF = h - 30, Dy = Math.min(120, h * 0.27);
      const Hz = (yF - Dy - 70) * (st.V / 12);
      const P = (x, d, z) => [left + x * Wf + d * Dx, yF - d * Dy - z * Hz];
      G = { P };
      // floor: the circuit as wired
      ctx.save();
      const c = [P(0, 0, 0), P(0, 1, 0), P(1, 1, 0), P(1, 0, 0)];
      ctx.beginPath(); c.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath();
      ctx.fillStyle = alpha(C.ink, 0.035); ctx.fill();
      ctx.strokeStyle = alpha(C.ink, 0.25); ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); ctx.stroke();
      ctx.restore();
      text(ctx, narrow ? 'the circuit, on the floor' : 'the circuit, as wired, on the floor', P(0.5, 0, 0)[0], yF + 18, { size: 11, color: C.ink3, align: 'center' });
      // stilts: height above the floor
      for (let i = 0; i < 60; i++) {
        const p = at(i / 60); if (p.z < 0.03) continue;
        const [x0, y0] = P(p.x, p.d, 0), [x1, y1] = P(p.x, p.d, p.z);
        line(ctx, x0, y0, x1, y1, alpha(C.ink, 0.1), 1);
      }
      // track, coloured by height
      ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 7;
      const M = 240;
      for (let i = 0; i < M; i++) {
        const a = at(i / M), b = at((i + 1) / M);
        const [x0, y0] = P(a.x, a.d, a.z), [x1, y1] = P(b.x, b.d, b.z);
        ctx.strokeStyle = alpha(ecol(a.z), 0.45); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      }
      ctx.restore();
      // battery: a lift, with treads moving up
      for (let k = 0; k < 7; k++) {
        const f = ((k / 7) + (st.s * LEN / SIDE) * 0.5) % 1;
        const [x, y] = P(0, f, f);
        line(ctx, x - 9, y, x + 9, y, alpha(C.ink, 0.35), 1.4);
      }
      const bm = P(0, 0.5, 0.5);
      text(ctx, 'battery', bm[0] + 14, bm[1] + 2, { size: 12, color: C.ink, weight: 600, halo: true });
      text(ctx, narrow ? 'lifts charge' : 'lifts each charge', bm[0] + 14, bm[1] + 17, { size: 11, color: C.ink3, halo: true });
      // lamp at the steep part of the right side
      const lm = at((SIDE + 1 + SIDE * 0.5) / LEN);
      const [lx0, ly0] = P(1, lm.d, lm.z);
      const lx = lx0 + 30, ly = ly0 - 8;
      if (st.glow > 0.01) {
        const rg = ctx.createRadialGradient(lx, ly, 2, lx, ly, 52);
        rg.addColorStop(0, alpha('#ffd25a', 0.85 * st.glow)); rg.addColorStop(1, alpha('#ffd25a', 0));
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(lx, ly, 52, 0, 7); ctx.fill();
      }
      circle(ctx, lx, ly, 11, mix('#ffffff', '#ffd25a', st.glow), C.ink2, 1.5);
      line(ctx, lx - 11, ly + 2, lx0 + 4, ly0, alpha(C.ink2, 0.5), 1);
      text(ctx, 'lamp', lx + 16, ly - 2, { size: 12, color: C.ink, weight: 600 });
      text(ctx, 'downhill', lx + 16, ly + 13, { size: 11, color: C.ink3 });
      // field = steepness: arrows beside the lamp's slope, pointing downhill
      {
        const a = at((SIDE + 1 + SIDE * 0.3) / LEN), b = at((SIDE + 1 + SIDE * 0.7) / LEN);
        const [ax, ay] = P(1, a.d, a.z), [bx, by] = P(1, b.d, b.z);
        const off = -22;
        arrow(ctx, ax + off, ay, bx + off, by, C.field, 2);
        text(ctx, 'field', (ax + bx) / 2 + off - 6, (ay + by) / 2 + 4, { size: 11, color: C.field, weight: 600, align: 'right', halo: true });
      }
      text(ctx, 'wire: almost flat', P(0.5, 1, 1 - WF / 2)[0], P(0.5, 1, 1)[1] - 12, { size: 11, color: C.ink3, align: 'center' });
      // height bracket
      const [hx, hy0] = P(0, 0, 0), hy1 = P(0, 0, 1)[1];
      const bxk = hx - 12;
      line(ctx, bxk, hy0, bxk, hy1, C.field, 1.2);
      line(ctx, bxk - 4, hy0, bxk + 4, hy0, C.field, 1.2); line(ctx, bxk - 4, hy1, bxk + 4, hy1, C.field, 1.2);
      text(ctx, st.V.toFixed(1) + ' V', bxk - 6, (hy0 + hy1) / 2 + 4, { size: 12.5, color: C.field, weight: 650, align: 'right' });
      // charges
      for (let i = 0; i < N; i++) {
        const p = at(i / N + st.s);
        const [x, y] = P(p.x, p.d, p.z);
        circle(ctx, x, y - 1, 4.2, ecol(p.z), '#fff', 1.2);
      }
      // legend
      const lgx = w - pad, lgy = 20;
      text(ctx, 'height = energy carried by each charge', lgx, lgy, { size: 11.5, color: C.ink2, align: 'right' });
      circle(ctx, lgx - (narrow ? 118 : 132), lgy + 16, 4, ecol(1), '#fff', 1);
      text(ctx, 'more', lgx - (narrow ? 110 : 124), lgy + 20, { size: 11, color: C.ink3 });
      circle(ctx, lgx - 52, lgy + 16, 4, ecol(0), '#fff', 1);
      text(ctx, 'less', lgx - 44, lgy + 20, { size: 11, color: C.ink3 });
    },
  });
  const ctl = controls(el);
  slider(ctl, { label: 'Battery voltage', name: 'volts', min: 1.5, max: 12, step: 0.5, value: st.V, color: C.field, fmt: v => v.toFixed(1) + ' V', oninput: v => { st.V = v; upd(); } });
  const ro = readout(el);
  function upd() {
    const I = st.V / R_LAMP, P = st.V * I;
    ro.innerHTML = `Each coulomb leaves the battery carrying <b>${st.V.toFixed(1)}&nbsp;joules</b> it did not have before. Through this lamp that makes <b>${I.toFixed(2)}&nbsp;coulombs a second</b> (${I.toFixed(2)}&nbsp;A), and the lamp receives <b>${P.toFixed(1)}&nbsp;W</b>. The wires take about ${Math.round(2 * WF * 1000) / 10}% of the height.`;
    fig.invalidate();
  }
  upd();
}

// ---------------------------------------------------------------------------
// Resistance: copper wire | tungsten filament | copper wire, in series on a 12 V battery.
// ---------------------------------------------------------------------------
export function resistance(el) {
  const V = 12;
  const RHO_CU = 1.68e-8, RHO_W = 5.6e-8, ALPHA_W = 0.0045; // Ω·m at 20 °C; tungsten temperature coefficient per K
  const WIRE_L = 1, WIRE_A = 0.75e-6; // each lead: 1 m of 0.75 mm² copper
  const st = { L: 14, d: 0.1, T: 2400 }; // filament length (cm), diameter (mm), temperature (°C)
  const phys = () => {
    const rho = RHO_W * (1 + ALPHA_W * (st.T - 20));
    const A = Math.PI * (st.d / 1000) ** 2 / 4;
    const Rf = rho * (st.L / 100) / A, Rw = RHO_CU * WIRE_L / WIRE_A;
    const I = V / (Rf + 2 * Rw);
    return { Rf, Rw, I, Vf: I * Rf, Vw: I * Rw, Pf: I * I * Rf, Pw: I * I * Rw };
  };
  let ph = phys();
  const NP = 120;
  const parts = Array.from({ length: NP }, () => ({ u: Math.random(), lane: 0.08 + Math.random() * 0.84, jx: 0, jy: 0 }));
  const flashes = []; // {sec, i, j, t}
  const acc = [0, 0, 0];
  let geo = null, phase = 0, hot = 0, warmed = false;
  const incand = T => clamp((T - 500) / 2000, 0, 1); // 0 below a dull red, 1 at white heat
  const glowCol = g => g < 0.5 ? mix('#7a1d10', '#ff7a1f', g * 2) : mix('#ff7a1f', '#fff1c4', (g - 0.5) * 2);

  const layout = (w, h) => {
    const pad = 16, xl = pad + 34, xr = w - pad - 34;
    const W = xr - xl;
    const fw = W * lerp(0.12, 0.44, (st.L - 2) / 28);
    const ww = (W - fw) / 2;
    const sy = h * 0.5 + 8, sh = h - sy - 34; // strip band
    const cy = sy + sh / 2;
    const hw = Math.min(sh, 74), hf = lerp(5, hw * 0.55, (st.d - 0.03) / 0.17);
    const secs = [
      { x0: xl, x1: xl + ww, hh: hw, kind: 'cu' },
      { x0: xl + ww, x1: xl + ww + fw, hh: hf, kind: 'w' },
      { x0: xl + ww + fw, x1: xr, hh: hw, kind: 'cu' },
    ];
    const pt = h * 0.5 - 22, pb = 42; // profile: y from pb (12 V) to pt (0 V)
    return { xl, xr, W, secs, cy, sy, sh, pt, pb };
  };
  const secAt = (g, x) => x < g.secs[1].x0 ? 0 : x < g.secs[1].x1 ? 1 : 2;
  // energy per charge (volts) at screen x
  const vAt = (g, x) => {
    const s = g.secs;
    if (x <= s[0].x0) return V;
    if (x < s[0].x1) return V - ph.Vw * (x - s[0].x0) / (s[0].x1 - s[0].x0);
    if (x < s[1].x1) return V - ph.Vw - ph.Vf * (x - s[1].x0) / (s[1].x1 - s[1].x0);
    if (x < s[2].x1) return ph.Vw * (1 - (x - s[2].x0) / (s[2].x1 - s[2].x0));
    return 0;
  };

  const fig = new Fig(el, {
    label: 'A copper wire, a thin lamp filament and another copper wire in series, with electrons flowing through a lattice of ions, and above it the energy each charge carries',
    height: w => Math.max(350, Math.min(460, w * 0.5)),
    animated: true,
    step(dt) {
      phase += dt;
      hot = approach(hot, incand(st.T), 5, dt);
      if (!geo) return;
      const g = geo;
      // continuity: the same flow of charge through every section, so electrons speed up where the conductor is thin
      const vw = 12 + 26 * Math.log10(1 + ph.I * 3);
      for (const p of parts) {
        const x = lerp(g.xl, g.xr, p.u), s = g.secs[secAt(g, x)];
        const v = vw * g.secs[0].hh / s.hh;
        p.u += v * dt / g.W;
        if (p.u > 1) { p.u -= 1; }
        p.jx = p.jx * 0.85 + (Math.random() - 0.5) * 1.6; p.jy = p.jy * 0.85 + (Math.random() - 0.5) * 1.6;
      }
      // collisions hand energy to the lattice: flash rate follows the heat released in each section
      const P = [ph.Pw, ph.Pf, ph.Pw];
      for (let k = 0; k < 3; k++) {
        acc[k] += dt * 7 * Math.log10(1 + P[k] * 2);
        while (acc[k] >= 1) { acc[k] -= 1; flashes.push({ sec: k, a: Math.random(), b: Math.random(), t: 0 }); }
      }
      for (const f of flashes) f.t += dt;
      while (flashes.length && flashes[0].t > 0.4) flashes.shift();
      if (flashes.length > 80) flashes.splice(0, flashes.length - 80);
    },
    draw(ctx, w, h, f) {
      const g = geo = layout(w, h);
      if (!warmed) { warmed = true; for (let i = 0; i < 400; i++) f.opts.step(0.05); flashes.length = 0; }
      const narrow = w < 560;
      const yV = v => lerp(g.pt, g.pb, v / V);
      // ---- profile
      text(ctx, 'energy carried by each charge', g.xl - 30, 14, { size: 11.5, color: C.ink2, weight: 500 });
      for (const v of [0, 6, 12]) {
        line(ctx, g.xl, yV(v), g.xr, yV(v), v ? C.grid : C.grid2, 1);
        text(ctx, v + ' V', g.xl - 6, yV(v) + 4, { size: 11, color: C.ink3, align: 'right' });
      }
      ctx.save(); ctx.lineWidth = 3; ctx.lineCap = 'round';
      const M = 200;
      for (let i = 0; i < M; i++) {
        const x0 = lerp(g.xl, g.xr, i / M), x1 = lerp(g.xl, g.xr, (i + 1) / M);
        const v0 = vAt(g, x0), v1 = vAt(g, x1);
        ctx.strokeStyle = ecol(v0 / V); ctx.beginPath(); ctx.moveTo(x0, yV(v0)); ctx.lineTo(x1, yV(v1)); ctx.stroke();
      }
      ctx.restore();
      // section guides
      for (const x of [g.secs[1].x0, g.secs[1].x1]) line(ctx, x, g.pb - 6, x, g.sy - 4, alpha(C.ink, 0.12), 1, [3, 3]);
      // drop labels
      const fmtV = v => v >= 0.1 ? v.toFixed(2) + ' V' : v >= 0.001 ? (v * 1000).toFixed(v * 1000 >= 10 ? 0 : 1) + ' mV' : '<1 mV';
      const s1 = g.secs[1];
      const fx = s1.x1 + 6, fyTop = yV(V - ph.Vw), fyBot = yV(ph.Vw);
      if (fyBot - fyTop > 18) {
        line(ctx, fx, fyTop, fx, fyBot, C.field, 1.2);
        line(ctx, fx - 3, fyTop, fx + 3, fyTop, C.field, 1.2); line(ctx, fx - 3, fyBot, fx + 3, fyBot, C.field, 1.2);
      }
      text(ctx, fmtV(ph.Vf), fx + 6, (fyTop + fyBot) / 2 + 4, { size: 12, color: C.field, weight: 650 });
      const wlab = (s, v) => text(ctx, fmtV(ph.Vw), (s.x0 + s.x1) / 2, v - 8, { size: 11, color: C.ink3, align: 'center' });
      wlab(g.secs[0], Math.min(yV(V), yV(V - ph.Vw))); wlab(g.secs[2], Math.min(yV(ph.Vw), yV(0)));
      // ---- strip
      for (let k = 0; k < 3; k++) {
        const s = g.secs[k], y0 = g.cy - s.hh / 2;
        ctx.save();
        rrect(ctx, s.x0, y0, s.x1 - s.x0, s.hh, Math.min(8, s.hh / 2));
        if (s.kind === 'cu') {
          const heat = clamp(Math.log10(1 + ph.Pw) / 3, 0, 1);
          const gr = ctx.createLinearGradient(0, y0, 0, y0 + s.hh);
          gr.addColorStop(0, mix('#f3dcc4', '#ff9a5a', heat)); gr.addColorStop(1, mix('#e8c6a6', '#e2602c', heat));
          ctx.fillStyle = gr;
        } else {
          ctx.fillStyle = hot > 0.02 ? mix('#d9d6d0', glowCol(hot), Math.min(1, hot * 1.4)) : '#d9d6d0';
        }
        ctx.fill(); ctx.clip();
        // ions: amplitude of vibration rises with temperature
        const T = s.kind === 'w' ? st.T : 20;
        const amp = 0.5 + 2.6 * Math.sqrt((T + 273) / 2700);
        const sp = 12, rows = Math.max(1, Math.floor(s.hh / sp)), cols = Math.max(1, Math.floor((s.x1 - s.x0) / sp));
        const ionC = s.kind === 'w' ? (hot > 0.05 ? mix('#6b6660', glowCol(Math.min(1, hot + 0.15)), hot) : '#6b6660') : '#b07a4f';
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
          const seed = i * 7.3 + j * 3.1 + k * 11;
          const x = s.x0 + (i + 0.5 + (j % 2) * 0.25) * (s.x1 - s.x0) / cols + amp * Math.sin(phase * 23 + seed);
          const y = y0 + (j + 0.5) * s.hh / rows + amp * Math.cos(phase * 19 + seed * 1.7);
          circle(ctx, x, y, 2.6, alpha(ionC, s.kind === 'w' ? 0.75 : 0.4));
        }
        // collision flashes
        for (const f of flashes) if (f.sec === k) {
          const x = s.x0 + f.a * (s.x1 - s.x0), y = y0 + (0.15 + f.b * 0.7) * s.hh, q = f.t / 0.4;
          circle(ctx, x, y, 2 + q * 7, null, alpha('#ff8a2a', 0.8 * (1 - q)), 1.6);
        }
        ctx.restore();
      }
      // filament glow halo
      if (hot > 0.02) {
        const cx = (s1.x0 + s1.x1) / 2, rr = (s1.x1 - s1.x0) / 2 + 30;
        const rg = ctx.createRadialGradient(cx, g.cy, 2, cx, g.cy, rr);
        rg.addColorStop(0, alpha('#ffd25a', 0.5 * hot)); rg.addColorStop(1, alpha('#ffd25a', 0));
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, g.cy, rr, 0, 7); ctx.fill();
      }
      // electrons, coloured by the energy they still carry
      for (const p of parts) {
        const x = lerp(g.xl, g.xr, p.u), s = g.secs[secAt(g, x)];
        const y = g.cy + (p.lane - 0.5) * (s.hh - 4) + p.jy * Math.min(1, s.hh / 30);
        circle(ctx, x + p.jx, y, s.kind === 'w' ? 2.4 : 3, ecol(vAt(g, x) / V), '#fff', 0.8);
      }
      // ends: from and back to the battery
      arrow(ctx, g.xl - 30, g.cy, g.xl - 4, g.cy, C.ink3, 1.4);
      arrow(ctx, g.xr + 4, g.cy, g.xr + 30, g.cy, C.ink3, 1.4);
      const ly = g.cy + g.secs[0].hh / 2 + 22;
      text(ctx, narrow ? 'copper' : 'copper wire, 1 m', (g.secs[0].x0 + g.secs[0].x1) / 2, ly, { size: 11.5, color: C.ink2, align: 'center' });
      text(ctx, narrow ? 'filament' : 'tungsten filament', (s1.x0 + s1.x1) / 2, ly, { size: 11.5, color: C.ink, weight: 600, align: 'center' });
      text(ctx, narrow ? 'copper' : 'copper wire, 1 m', (g.secs[2].x0 + g.secs[2].x1) / 2, ly, { size: 11.5, color: C.ink2, align: 'center' });
      text(ctx, 'from the battery', g.xl - 30, g.sy - 2, { size: 10.5, color: C.ink3 });
      text(ctx, 'back to it', g.xr + 30, g.sy - 2, { size: 10.5, color: C.ink3, align: 'right' });
    },
  });
  const ctl = controls(el);
  const upd = () => { ph = phys(); ro.innerHTML = msg(); fig.invalidate(); };
  slider(ctl, { label: 'Filament length', name: 'length', min: 2, max: 30, step: 1, value: st.L, color: C.ink2, fmt: v => v + ' cm', oninput: v => { st.L = v; upd(); } });
  slider(ctl, { label: 'Filament thickness', name: 'thickness', min: 0.03, max: 0.2, step: 0.01, value: st.d, color: C.ink2, fmt: v => v.toFixed(2) + ' mm', oninput: v => { st.d = v; upd(); } });
  slider(ctl, { label: 'Filament temperature', name: 'temp', min: 20, max: 2500, step: 10, value: st.T, color: C.hot, fmt: v => Math.round(v).toLocaleString('en') + ' °C', oninput: v => { st.T = v; upd(); } });
  const ro = readout(el);
  const fR = r => r >= 100 ? Math.round(r).toLocaleString('en') : r >= 10 ? r.toFixed(1) : r >= 0.1 ? r.toFixed(2) : r.toFixed(3);
  const fP = p => p >= 100 ? Math.round(p).toLocaleString('en') : p >= 1 ? p.toFixed(1) : p >= 0.01 ? p.toFixed(2) : '<0.01';
  const fI = i => i >= 10 ? Math.round(i).toLocaleString('en') : i >= 0.1 ? i.toFixed(2) : i.toFixed(3);
  const msg = () => `Current <b>${fI(ph.I)}&nbsp;A</b>, the same in every part. Filament: ${fR(ph.Rf)}&nbsp;Ω, so it takes <b>${fI(ph.I)} × ${fR(ph.Rf)} = ${ph.Vf.toFixed(2)}&nbsp;V</b> of the 12 and turns <b>${fP(ph.Pf)}&nbsp;W</b> into ${st.T > 600 ? 'heat and light' : 'heat'}. Each wire: ${fR(ph.Rw)}&nbsp;Ω, ${ph.Vw < 0.01 ? (ph.Vw * 1000).toFixed(1) + '&nbsp;mV' : ph.Vw.toFixed(2) + '&nbsp;V'}, ${fP(ph.Pw)}&nbsp;W.`;
  upd();
}

export const FIGS = { emfHill, resistance };
