import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, approach } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint } from '../lib/ui.js';

// ---------------------------------------------------------------------------
// F1: drift velocity vs signal propagation
// ---------------------------------------------------------------------------
export function drift(el) {
  const n = 8.5e28, q = 1.602e-19, A = 1.5e-6;
  const st = { I: 10, closed: false, front: 0, mode: 'dc', phase: 0, lamp: 0 };
  const N = 150;
  const e = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), vx: 0, vy: 0, off: 0 }));
  const ions = [];
  for (let i = 0; i < 26; i++) for (let j = 0; j < 5; j++) ions.push([(i + (j % 2) * 0.5 + 0.25) / 26, (j + 0.5) / 5]);

  const fig = new Fig(el, {
    label: 'A close-up of electrons in a copper wire and an overview of a circuit with a switch and a lamp',
    height: w => Math.max(340, Math.min(420, w * 0.52)),
    animated: true,
    step(dt) {
      if (st.closed) st.front = Math.min(1.2, st.front + dt * 2.2); else st.front = Math.max(0, st.front - dt * 3);
      st.phase += dt * 2 * Math.PI * 0.6;
      const lit = st.closed && st.front >= 1;
      st.lamp = approach(st.lamp, lit ? 1 : 0, 10, dt);
      const vis = (st.I / 16) * 0.09; // visual drift (exaggerated)
      for (const p of e) {
        // thermal jitter
        p.vx += (Math.random() - 0.5) * 2.2 * dt * 60 * 0.004; p.vy += (Math.random() - 0.5) * 2.2 * dt * 60 * 0.004;
        p.vx *= 0.92; p.vy *= 0.92;
        let drive = 0;
        const reached = st.closed && st.front > 0.02;
        if (reached) drive = st.mode === 'dc' ? -vis : -vis * 2.2 * Math.cos(st.phase);
        p.x += p.vx + drive * dt; p.y += p.vy;
        if (p.y < 0.03) { p.y = 0.03; p.vy *= -1; } if (p.y > 0.97) { p.y = 0.97; p.vy *= -1; }
        if (p.x < 0) p.x += 1; if (p.x > 1) p.x -= 1;
      }
    },
    draw(ctx, w, h) {
      const pad = 18;
      // close-up wire
      const zx = pad, zy = 34, zw = w - 2 * pad, zh = Math.min(h * 0.46, h - 206); // leave the circuit at least 100 px
      text(ctx, 'Inside the copper (close-up, not to scale)', zx, 20, { size: 12, color: C.ink3, weight: 500 });
      ctx.save();
      rrect(ctx, zx, zy, zw, zh, 14);
      const g = ctx.createLinearGradient(0, zy, 0, zy + zh);
      g.addColorStop(0, '#f3dcc4'); g.addColorStop(0.5, '#efd2b6'); g.addColorStop(1, '#e8c6a6');
      ctx.fillStyle = g; ctx.fill();
      ctx.clip();
      for (const [x, y] of ions) circle(ctx, zx + x * zw, zy + y * zh, 3.2, alpha('#b07a4f', 0.35));
      for (const p of e) {
        circle(ctx, zx + p.x * zw, zy + p.y * zh, 3, C.electron);
      }
      // highlight one electron
      const p0 = e[0];
      circle(ctx, zx + p0.x * zw, zy + p0.y * zh, 7, null, C.ink, 1.5);
      ctx.restore();
      ctx.save(); rrect(ctx, zx, zy, zw, zh, 14); ctx.strokeStyle = alpha('#9b6b45', 0.35); ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
      if (st.closed && st.front > 0.02) {
        const dir = st.mode === 'dc' ? 1 : Math.cos(st.phase);
        const ax = zx + zw - 70, ay = zy + zh + 16;
        arrow(ctx, ax, ay, ax + 50 * dir, ay, C.field, 2);
        text(ctx, 'field', ax + 25, ay + 16, { size: 11, color: C.field, align: 'center' });
        arrow(ctx, zx + 70, ay, zx + 70 - 40 * dir * (st.I / 16 + 0.2), ay, C.electron, 2);
        text(ctx, 'electron drift', zx + 70, ay + 16, { size: 11, color: C.electron, align: 'center' });
      }

      // overview circuit
      const oy = zy + zh + 58, oh = h - oy - 14;
      const L = pad + 56, R = w - pad - 64, top = oy + 10, bot = oy + oh - 6;
      text(ctx, 'The whole circuit', zx, oy - 14, { size: 12, color: C.ink3, weight: 500 });
      ctx.save();
      ctx.lineCap = 'round';
      // wire loop
      const wireColor = '#c99060';
      ctx.strokeStyle = wireColor; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(L + 30, top); ctx.lineTo(R, top); ctx.lineTo(R, bot); ctx.lineTo(L, bot); ctx.lineTo(L, top + 18); ctx.stroke();
      // switch
      const sx = L, sy = top;
      circle(ctx, sx, sy + 18, 4, C.ink);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(sx, sy + 18);
      if (st.closed) ctx.lineTo(sx + 30, sy); else ctx.lineTo(sx + 26, sy - 16);
      ctx.stroke();
      circle(ctx, sx + 30, sy, 4, C.ink);
      // battery on left side
      const by = (top + bot) / 2;
      ctx.fillStyle = C.paper; ctx.fillRect(L - 14, by - 14, 28, 28);
      line(ctx, L - 14, by - 6, L + 14, by - 6, C.ink, 3);
      line(ctx, L - 8, by + 6, L + 8, by + 6, C.ink, 3);
      text(ctx, '+', L + 22, by - 2, { size: 13, color: C.ink2 });
      // field front glow
      if (st.front > 0) {
        const pathLen = (R - (L + 30)) + (bot - top) + (R - L);
        const d = Math.min(1, st.front) * pathLen;
        ctx.strokeStyle = alpha(C.field, 0.85); ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(L + 30, top);
        const a = R - (L + 30), b = bot - top;
        if (d <= a) ctx.lineTo(L + 30 + d, top);
        else { ctx.lineTo(R, top); if (d <= a + b) ctx.lineTo(R, top + d - a); else { ctx.lineTo(R, bot); ctx.lineTo(R - (d - a - b), bot); } }
        ctx.stroke();
        // also the return path from battery
        ctx.beginPath(); ctx.moveTo(L, by + 14); ctx.lineTo(L, bot); ctx.stroke();
      }
      // lamp
      const lx = R, ly = (top + bot) / 2;
      ctx.fillStyle = C.paper; ctx.fillRect(lx - 16, ly - 16, 32, 32);
      if (st.lamp > 0.01) {
        const rg = ctx.createRadialGradient(lx, ly, 2, lx, ly, 46);
        rg.addColorStop(0, alpha('#ffd76a', 0.9 * st.lamp)); rg.addColorStop(1, alpha('#ffd76a', 0));
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(lx, ly, 46, 0, 7); ctx.fill();
      }
      circle(ctx, lx, ly, 13, mix('#ffffff', '#ffd25a', st.lamp), C.ink, 2);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(lx - 9, ly - 9); ctx.lineTo(lx + 9, ly + 9); ctx.moveTo(lx + 9, ly - 9); ctx.lineTo(lx - 9, ly + 9); ctx.stroke();
      ctx.restore();
      text(ctx, '10 m of wire', (L + R) / 2, top - 8, { size: 11, color: C.ink3, align: 'center' });
    },
  });
  const ctl = controls(el);
  const sw = button(ctl, 'Close the switch', () => {
    st.closed = !st.closed; sw.innerHTML = st.closed ? 'Open the switch' : 'Close the switch'; upd(); fig.invalidate();
  }, { name: 'switch', kind: 'primary' });
  segmented(ctl, { options: [{ label: 'DC', value: 'dc' }, { label: 'AC 50 Hz', value: 'ac' }], value: 'dc', onchange: v => { st.mode = v; upd(); } });
  slider(ctl, { label: 'Current', min: 0.5, max: 16, step: 0.5, value: st.I, color: C.electron, fmt: v => v.toFixed(1) + ' A', oninput: v => { st.I = v; upd(); } });
  const ro = readout(el);
  function upd() {
    const v = st.I / (n * A * q); // m/s
    const tMeter = 1 / v;
    const amp = v * Math.SQRT2 / (2 * Math.PI * 50);
    const signal = 10 / (0.7 * 3e8);
    ro.innerHTML = st.mode === 'dc'
      ? `Drift speed in 1.5 mm² copper: <b>${(v * 1000).toFixed(2)}&nbsp;mm/s</b> — about <b>${(tMeter / 60).toFixed(0)}&nbsp;minutes</b> to crawl one metre. The field that pushes them reaches a lamp 10 m away in roughly <b>${(signal * 1e9).toFixed(0)}&nbsp;ns</b>.`
      : `With 50 Hz AC the electrons never get anywhere: they shuffle back and forth by about <b>${(amp * 1e6).toFixed(1)} µm</b>, a hundred times a second.`;
  }
  upd();
}

// ---------------------------------------------------------------------------
// F2: potential as height — battery lifts, lamp lowers
// ---------------------------------------------------------------------------
export function potential(el) {
  const st = { V: 12, R: 12, s: 0 };
  const M = 46; const dots = Array.from({ length: M }, (_, i) => i / M);
  const fig = new Fig(el, {
    label: 'A circuit unrolled into a landscape: the battery lifts charges up, the lamp lets them down',
    height: w => Math.max(260, Math.min(360, w * 0.45)),
    animated: true,
    step(dt) { st.s = (st.s + dt * (st.V / st.R) * 0.12) % 1; },
    draw(ctx, w, h) {
      const l = 64, r = w - 30, base = h - 46;
      const Vmax = 24; const hScale = (h - 110) / Vmax;
      const top = base - st.V * hScale;
      // Path parameterisation along x: [0..0.2] battery ramp up, [0.2..0.55] wire (flat), [0.55..0.8] lamp slope down, [0.8..1] wire back (flat)
      const xs = t => l + t * (r - l);
      const yAt = t => t < 0.18 ? lerp(base, top, t / 0.18) : t < 0.52 ? top : t < 0.82 ? lerp(top, base, (t - 0.52) / 0.3) : base;
      // ground + fill
      ctx.save();
      ctx.beginPath(); ctx.moveTo(xs(0), base);
      for (let i = 0; i <= 200; i++) { const t = i / 200; ctx.lineTo(xs(t), yAt(t)); }
      ctx.lineTo(xs(1), base + 20); ctx.lineTo(xs(0), base + 20); ctx.closePath();
      const g = ctx.createLinearGradient(0, top, 0, base + 20);
      g.addColorStop(0, lighten(C.field, 0.75)); g.addColorStop(1, lighten(C.electron, 0.85));
      ctx.fillStyle = g; ctx.fill();
      ctx.restore();
      // surface
      const pts = []; for (let i = 0; i <= 200; i++) { const t = i / 200; pts.push([xs(t), yAt(t)]); }
      pathLine(ctx, pts, C.ink2, 2);
      // labels for segments
      text(ctx, 'battery', xs(0.09), base + 38, { size: 12, color: C.ink2, align: 'center', weight: 550 });
      text(ctx, 'wire', xs(0.35), base + 38, { size: 12, color: C.ink3, align: 'center' });
      text(ctx, 'lamp', xs(0.67), base + 38, { size: 12, color: C.ink2, align: 'center', weight: 550 });
      text(ctx, 'wire', xs(0.91), base + 38, { size: 12, color: C.ink3, align: 'center' });
      // battery as escalator: stripes
      ctx.save(); ctx.strokeStyle = alpha(C.ink, 0.25); ctx.lineWidth = 1;
      for (let k = 0; k < 8; k++) { const t = ((k / 8 + st.s * 3) % 1) * 0.18; ctx.beginPath(); ctx.moveTo(xs(t), yAt(t) + 3); ctx.lineTo(xs(t), base + 20); ctx.stroke(); }
      ctx.restore();
      // lamp glow on slope
      const P = st.V * st.V / st.R; const glow = clamp(P / 30, 0, 1);
      const lx = xs(0.67), ly = yAt(0.67) - 34;
      const rg = ctx.createRadialGradient(lx, ly, 2, lx, ly, 70);
      rg.addColorStop(0, alpha('#ffcf4d', 0.85 * glow)); rg.addColorStop(1, alpha('#ffcf4d', 0));
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(lx, ly, 70, 0, 7); ctx.fill();
      circle(ctx, lx, ly, 11, mix('#ffffff', '#ffcf4d', glow), C.ink2, 1.5);
      // height marker
      line(ctx, l - 14, base, l - 14, top, C.ink3, 1);
      line(ctx, l - 18, top, l - 10, top, C.ink3, 1); line(ctx, l - 18, base, l - 10, base, C.ink3, 1);
      text(ctx, st.V.toFixed(1) + ' V', l - 20, (top + base) / 2 + 4, { size: 12, color: C.field, weight: 600, align: 'right' });
      // charges
      for (const d of dots) {
        const t = (d + st.s) % 1;
        circle(ctx, xs(t), yAt(t) - 6, 4.2, C.electron, '#fff', 1.2);
      }
      text(ctx, 'height = energy per unit of charge (volts)', r, 22, { size: 12, color: C.ink3, align: 'right' });
      text(ctx, 'spacing & speed of dots = flow of charge (amps)', r, 40, { size: 12, color: C.ink3, align: 'right' });
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => {
    const I = st.V / st.R, P = st.V * I;
    ro.innerHTML = `I = V / R = <b>${I.toFixed(2)} A</b> &nbsp;·&nbsp; power delivered to the lamp P = V × I = <b>${P.toFixed(1)} W</b>`;
    fig.invalidate();
  };
  slider(ctl, { label: 'Voltage', min: 1, max: 24, step: 0.5, value: st.V, color: C.field, fmt: v => v.toFixed(1) + ' V', oninput: v => { st.V = v; upd(); } });
  slider(ctl, { label: 'Lamp resistance', min: 2, max: 60, step: 1, value: st.R, color: C.ink2, fmt: v => v + ' Ω', oninput: v => { st.R = v; upd(); } });
  upd();
}

// ---------------------------------------------------------------------------
// F3: power vs energy — appliances and a running meter
// ---------------------------------------------------------------------------
export function powerEnergy(el) {
  const APP = [
    { k: 'led', label: 'LED bulb', W: 10 },
    { k: 'laptop', label: 'Laptop', W: 60 },
    { k: 'fridge', label: 'Fridge', W: 100 },
    { k: 'kettle', label: 'Kettle', W: 2000 },
    { k: 'hp', label: 'Heat pump', W: 2500 },
  ];
  const on = { led: true, laptop: true, fridge: true, kettle: false, hp: false };
  const hist = [], histP = []; let kWh = 0; let acc = 0; const MINUTES = 60; let yTop = 500;
  const ACOL = { led: '#e2b33c', laptop: '#5b7fc0', fridge: '#5aa6a0', kettle: '#d8644a', hp: '#8a6bb8' };
  const kWhA = Object.fromEntries(APP.map(a => [a.k, 0]));
  const parts = () => APP.map(a => on[a.k] ? a.W : 0);
  const total = () => APP.reduce((s, a) => s + (on[a.k] ? a.W : 0), 0);
  for (let i = 0; i < MINUTES; i++) { hist.push(total()); histP.push(parts()); }
  // the hour so far includes one kettle boil, so the figure opens showing a tall, thin spike next to the low, wide baseline
  for (let i = 42; i < 45; i++) { hist[i] += 2000; histP[i] = histP[i].map((v, j) => APP[j].k === 'kettle' ? 2000 : v); }
  // the meter has been running for that hour too (one sample per minute), so meter, shares and trace agree on load
  histP.forEach(q => APP.forEach((a, j) => { kWh += q[j] / 60 / 1000; kWhA[a.k] += q[j] / 60 / 1000; }));
  const fig = new Fig(el, {
    label: 'Power drawn over the last hour, with energy accumulating as the area under the curve',
    height: w => Math.max(240, Math.min(320, w * 0.4)),
    animated: true,
    step(dt) {
      acc += dt; // 1 real second = 1 simulated minute
      kWh += total() / 1000 * (dt / 60); for (const a of APP) if (on[a.k]) kWhA[a.k] += a.W / 1000 * (dt / 60);
      while (acc >= 1) { acc -= 1; hist.push(total()); histP.push(parts()); if (hist.length > MINUTES) { hist.shift(); histP.shift(); } }
      hist[hist.length - 1] = total(); histP[histP.length - 1] = parts();
    },
    draw(ctx, w, h) {
      const box = { l: 52, r: w - 150, t: 28, b: h - 34 };
      const target = [500, 1000, 2000, 3000, 5000, 6000].find(v => v >= Math.max(...hist) * 1.15) || 6000;
      yTop = Math.abs(yTop - target) < 5 ? target : yTop + (target - yTop) * 0.12;
      const tstep = target <= 500 ? 100 : target <= 1000 ? 250 : target <= 3000 ? 500 : 1000;
      const yt = []; for (let v = 0; v <= yTop + 1; v += tstep) yt.push(v);
      const { sx, sy } = axes(ctx, { box, x0: -MINUTES, x1: 0, y0: 0, y1: yTop, yticks: yt, yfmt: v => v < 1000 ? v + ' W' : (v / 1000) + ' kW', xticks: box.r - box.l < 300 ? [-60, -30, 0] : [-60, -45, -30, -15, 0], xfmt: v => v === 0 ? 'now' : v + ' min', ylabel: 'power' });
      // area
      ctx.save();
      ctx.beginPath(); ctx.moveTo(sx(-MINUTES), sy(0));
      hist.forEach((p, i) => { const x0 = sx(-MINUTES + i - acc), x1 = sx(-MINUTES + i + 1 - acc); ctx.lineTo(Math.max(box.l, x0), sy(p)); ctx.lineTo(Math.max(box.l, x1), sy(p)); });
      ctx.lineTo(sx(0), sy(hist[hist.length - 1])); ctx.lineTo(sx(0), sy(0)); ctx.closePath();
      ctx.restore();
      // one coloured band per appliance, stacked: each band's area is that appliance's energy
      ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 2, box.r - box.l, box.b - box.t + 2); ctx.clip();
      const base = histP.map(() => 0);
      APP.forEach((a, ai) => {
        if (!histP.some(q => q[ai] > 0)) return;
        ctx.beginPath();
        const bx = i => Math.max(box.l, i === histP.length ? sx(0) : sx(-MINUTES + i - acc));
        histP.forEach((q, i) => { ctx.lineTo(bx(i), sy(base[i] + q[ai])); ctx.lineTo(bx(i + 1), sy(base[i] + q[ai])); });
        for (let i = histP.length - 1; i >= 0; i--) { ctx.lineTo(bx(i + 1), sy(base[i])); ctx.lineTo(bx(i), sy(base[i])); }
        ctx.closePath(); ctx.fillStyle = alpha(ACOL[a.k], 0.55); ctx.fill();
        histP.forEach((q, i) => { base[i] += q[ai]; });
      });
      ctx.beginPath(); ctx.moveTo(sx(-MINUTES), sy(0));
      hist.forEach((p, i) => { const x0 = sx(-MINUTES + i - acc), x1 = sx(-MINUTES + i + 1 - acc); ctx.lineTo(Math.max(box.l, x0), sy(p)); ctx.lineTo(Math.max(box.l, x1), sy(p)); });
      ctx.lineTo(sx(0), sy(hist[hist.length - 1])); ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.restore();
      // direct labels at "now" for bands tall enough to read
      { let y0 = 0; const lastP = histP[histP.length - 1]; let lastY = 1e9;
        APP.forEach((a, ai) => { const v = lastP[ai]; if (!v) return; const yc = sy(y0 + v / 2); y0 += v; if (sy(y0 - v) - sy(y0) < 11 || lastY - yc < 12) return; lastY = yc; text(ctx, a.label, sx(0) - 6, yc + 4, { size: 10.5, weight: 600, color: darken(ACOL[a.k], 0.35), align: 'right', halo: true }); }); }
      // average household line
      const avgW = 3500 / 8760 * 1000;
      line(ctx, box.l, sy(avgW), box.r, sy(avgW), C.ink3, 1, [4, 4]);
      // on a narrow chart the label goes on two short lines so it ends before the kettle spike
      const avgLab = `≈ ${Math.round(avgW / 100) * 100} W`;
      if (box.r - box.l < 330) { text(ctx, 'average household', box.l + 6, sy(avgW) - 19, { size: 11, color: C.ink3, halo: true }); text(ctx, avgLab, box.l + 6, sy(avgW) - 6, { size: 11, color: C.ink3, halo: true }); }
      else text(ctx, 'average household (3,500 kWh/yr) ' + avgLab, box.l + 6, sy(avgW) - 6, { size: 11, color: C.ink3, halo: true });
      // meter
      const mx = w - 130, my = 34;
      rrect(ctx, mx, my, 118, 92, 10); ctx.fillStyle = '#2f2d2a'; ctx.fill();
      text(ctx, 'ENERGY USED', mx + 59, my + 20, { size: 10, color: '#bdb6a8', align: 'center', weight: 600 });
      text(ctx, kWh.toFixed(3), mx + 59, my + 52, { size: 24, color: '#f3efe6', align: 'center', weight: 600 });
      text(ctx, 'kWh', mx + 59, my + 72, { size: 11, color: '#bdb6a8', align: 'center' });
      text(ctx, 'right now', mx + 59, my + 114, { size: 11, color: C.ink3, align: 'center' });
      text(ctx, (total() / 1000).toFixed(2) + ' kW', mx + 59, my + 134, { size: 18, color: C.ink, align: 'center', weight: 600 });
      // where the metered energy went: split bar by appliance
      if (kWh > 1e-6 && h > 220) { let x = mx; const by = my + 150; text(ctx, 'energy by appliance', mx, by - 4, { size: 9.5, color: C.ink3 });
        const top = APP.reduce((a, b) => kWhA[b.k] > kWhA[a.k] ? b : a);
        for (const a of APP) { const ww = 118 * kWhA[a.k] / kWh; if (ww > 0.3) { ctx.fillStyle = ACOL[a.k]; ctx.fillRect(x, by, ww, 9); x += ww; } }
        text(ctx, `${top.label}: ${Math.round(kWhA[top.k] / kWh * 100)}%`, mx, by + 22, { size: 10, color: darken(ACOL[top.k], 0.35), weight: 600 }); }
      text(ctx, '1 s here = 1 min', mx + 59, h - 12, { size: 10.5, color: C.ink3, align: 'center' });
    },
  });
  const ctl = controls(el);
  const group = document.createElement('div'); group.className = 'ctl toggles'; ctl.appendChild(group);
  for (const a of APP) {
    const b = button(group, `${a.label} <small>${a.W >= 1000 ? (a.W / 1000) + ' kW' : a.W + ' W'}</small>`, () => { on[a.k] = !on[a.k]; b.setAttribute('aria-pressed', on[a.k]); fig.invalidate(); }, { kind: 'toggle', name: a.k });
    b.setAttribute('aria-pressed', on[a.k]);
  }
  button(ctl, 'Reset meter', () => { kWh = 0; for (const k in kWhA) kWhA[k] = 0; fig.invalidate(); }, { kind: 'ghost' });
  // readout: what the current draw means over an hour and over a year
  const ro = readout(el); let lastP = -1;
  const updRo = () => { const P = total(); if (P === lastP) return; lastP = P; const yr = P * 8.76;
    ro.innerHTML = `Drawing <b>${P >= 1000 ? (P / 1000).toFixed(2) + ' kW' : P + ' W'}</b> now. Left on for an hour that is <b>${(P / 1000).toFixed(2)} kWh</b>; all year it would be <b>${Math.round(yr).toLocaleString('en')} kWh</b> — ${Math.round(yr / 3500 * 100)}% of a typical household’s 3,500 kWh.`; };
  ctl.addEventListener('click', () => setTimeout(updRo, 0)); updRo();
  hint(el, 'switch on the kettle and watch the meter speed up: the same 2 kW for an hour is 2 kWh.');
}
