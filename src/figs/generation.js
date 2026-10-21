import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, approach } from '../lib/draw.js';
import { controls, slider, segmented, button, readout } from '../lib/ui.js';

const COPPER = '#c98a55', COPPER_D = '#9a6236';

function drawMagnetBar(ctx, x, y, len, thick, ang = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  const g1 = ctx.createLinearGradient(0, -thick / 2, 0, thick / 2);
  g1.addColorStop(0, lighten(C.north, 0.25)); g1.addColorStop(1, darken(C.north, 0.12));
  const g2 = ctx.createLinearGradient(0, -thick / 2, 0, thick / 2);
  g2.addColorStop(0, lighten(C.south, 0.25)); g2.addColorStop(1, darken(C.south, 0.12));
  rrect(ctx, 0, -thick / 2, len / 2, thick, 4); ctx.fillStyle = g1; ctx.fill();
  rrect(ctx, -len / 2, -thick / 2, len / 2, thick, 4); ctx.fillStyle = g2; ctx.fill();
  text(ctx, 'N', len / 4, 4.5, { size: 13, color: '#fff', weight: 650, align: 'center' });
  text(ctx, 'S', -len / 4, 4.5, { size: 13, color: '#fff', weight: 650, align: 'center' });
  ctx.restore();
}

// Precompute 2D dipole field lines (two opposite poles) in magnet-local coordinates.
function dipoleLines(halfLen, count = 7) {
  const lines = [];
  const N = [halfLen * 0.8, 0], S = [-halfLen * 0.8, 0];
  for (let k = 0; k < count; k++) {
    const a0 = (k + 0.5) / count * Math.PI; // upper half; mirror for lower
    let p = [N[0] + Math.cos(a0 - Math.PI / 2 + Math.PI / 2) * 4, 0];
    p = [N[0] + 5 * Math.cos(a0 * 0.999 - 0), 5 * Math.sin(a0)];
    const pts = [p.slice()];
    for (let i = 0; i < 900; i++) {
      const dx1 = p[0] - N[0], dy1 = p[1] - N[1], r1 = dx1 * dx1 + dy1 * dy1;
      const dx2 = p[0] - S[0], dy2 = p[1] - S[1], r2 = dx2 * dx2 + dy2 * dy2;
      let fx = dx1 / r1 - dx2 / r2, fy = dy1 / r1 - dy2 / r2;
      const m = Math.hypot(fx, fy) || 1; fx /= m; fy /= m;
      p = [p[0] + fx * 2.5, p[1] + fy * 2.5];
      pts.push(p.slice());
      if (Math.hypot(p[0] - S[0], p[1] - S[1]) < 6 || Math.abs(p[0]) > 600 || Math.abs(p[1]) > 400) break;
    }
    lines.push(pts);
    lines.push(pts.map(([x, y]) => [x, -y]));
  }
  return lines;
}

// ---------------------------------------------------------------------------
// F4: Faraday — drag a magnet through a coil
// ---------------------------------------------------------------------------
export function faraday(el) {
  const st = { x: -1.0, vx: 0, auto: true, t: 0, emf: 0, phi: 0, dragging: false, hist: new Array(360).fill(0), flow: 0 };
  const LOOPS = 7;
  const flux = x => { let s = 0; for (let i = 0; i < LOOPS; i++) { const xl = (i / (LOOPS - 1) - 0.5) * 0.38; const d = (x - xl) / 0.16; s += 1 / Math.pow(1 + d * d, 1.5); } return s / LOOPS; };
  st.x = 0; st.phi = flux(0); // the wave starts with the magnet centred in the coil
  let lines = null, lastHalf = 0;
  let geom = {};
  const DT = 1 / 60; let acc = 0, lastX = st.x;    // the trace is sampled on a fixed timestep, whatever the frame rate
  const fig = new Fig(el, {
    label: 'A bar magnet that can be dragged through a coil of wire, with a meter and a trace of the induced voltage',
    height: w => w >= 640 ? Math.max(300, Math.min(360, w * 0.34)) : 300 + Math.round(w * 0.32),
    animated: true,
    step(dt) {
      acc = Math.min(acc + dt, 0.25);
      const n = Math.floor(acc / DT + 1e-6), x0 = lastX;
      acc = Math.max(0, acc - n * DT);
      for (let s = 1; s <= n; s++) {
        st.t += DT;
        const prevPhi = st.phi;
        let x;
        if (!st.dragging && st.auto) { st.x = Math.sin(st.t * 1.4) * 1.05; x = st.x; }
        else x = x0 + (st.x - x0) * s / n; // a dragged magnet: spread this frame's move over its samples
        st.phi = flux(x);
        const emf = -(st.phi - prevPhi) / DT * 0.55;
        st.emf = approach(st.emf, clamp(emf, -1.4, 1.4), 25, DT);
        st.flow += st.emf * DT * 3;
        st.hist.push(st.emf); if (st.hist.length > 360) st.hist.shift();
      }
      if (n) lastX = st.x;
    },
    onResize(w, h) { lines = null; },
    draw(ctx, w, h) {
      // Wide: the magnet, coil and meter on the left, the trace on the right. Narrow: stacked, trace at the bottom.
      const wide = w >= 640;
      const PW = wide ? Math.round(w * 0.56) : w;                  // width of the apparatus panel
      const magLen = wide ? Math.min(170, PW * 0.27) : Math.min(150, w * 0.3), magT = wide ? 30 : 26;
      const cx = PW / 2, cy = wide ? Math.round(h * 0.3) : 78;
      const span = (PW / 2 - magLen / 2 - 10) / 1.05;               // the magnet stays inside its panel at either end of its travel
      const coilR = wide ? Math.min(54, h * 0.15) : 42;
      const gr = wide ? Math.min(40, w * 0.05) : 30;
      const gy = wide ? h - gr - 34 : cy + coilR + 34 + gr, gx = cx;
      geom = { cx, cy, span, magLen, magT };
      const mx = cx + st.x * span;
      if (!lines || lastHalf !== magLen / 2) { lines = dipoleLines(magLen / 2, 6); lastHalf = magLen / 2; }
      // field lines, faded out before the edge of their band
      const bandB = cy + coilR + 14;
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, PW, bandB); ctx.clip(); ctx.translate(mx, cy);
      { const R1 = Math.max(40, Math.min(cy - 2, bandB - cy) + 18), g = ctx.createRadialGradient(0, 0, 0, 0, 0, R1);
        g.addColorStop(0, alpha(C.ink3, 0.5)); g.addColorStop(0.7, alpha(C.ink3, 0.36)); g.addColorStop(1, alpha(C.ink3, 0));
        ctx.strokeStyle = g; }
      ctx.lineWidth = 1;
      for (const pts of lines) { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); }
      ctx.restore();
      const xs = i => cx + (i / (LOOPS - 1) - 0.5) * 0.38 * span;
      // leads from the two ends of the coil down into the meter
      const topY = gy - gr * 0.8, midY = (cy + coilR + topY) / 2;
      ctx.save(); ctx.strokeStyle = COPPER; ctx.lineWidth = 3; ctx.lineJoin = 'round';
      for (const [xe, sgn] of [[xs(0), -1], [xs(LOOPS - 1), 1]]) {
        const dx = xe - gx;
        ctx.beginPath(); ctx.moveTo(xe, cy + coilR - 2);
        if (Math.abs(dx) < gr * 0.85) ctx.lineTo(xe, gy - Math.sqrt((gr + 4) ** 2 - dx * dx) + 3); // straight down into the meter
        else { ctx.lineTo(xe, midY); ctx.lineTo(gx + sgn * gr * 0.6, midY); ctx.lineTo(gx + sgn * gr * 0.6, topY + 4); }
        ctx.stroke();
      }
      ctx.restore();
      // coil back halves, magnet, front halves
      const drawHalf = (front) => {
        for (let i = 0; i < LOOPS; i++) {
          const x = xs(i);
          ctx.beginPath(); ctx.ellipse(x, cy, coilR * 0.32, coilR, 0, front ? -Math.PI / 2 : Math.PI / 2, front ? Math.PI / 2 : Math.PI * 1.5);
          ctx.strokeStyle = front ? COPPER : COPPER_D; ctx.lineWidth = wide ? 5 : 4; ctx.lineCap = 'round'; ctx.stroke();
        }
      };
      drawHalf(false);
      drawMagnetBar(ctx, mx, cy, magLen, magT);
      drawHalf(true);
      // current dots on the front halves
      const I = st.emf;
      if (Math.abs(I) > 0.01) {
        for (let i = 0; i < LOOPS; i++) {
          const x = xs(i);
          for (let k = 0; k < 3; k++) {
            const a = -Math.PI / 2 + (((k / 3 + st.flow) % 1) + 1) % 1 * Math.PI;
            circle(ctx, x + Math.cos(a) * coilR * 0.32, cy + Math.sin(a) * coilR, 2.4, alpha(C.electron, clamp(Math.abs(I) * 1.5, 0.2, 1)));
          }
        }
      }
      // galvanometer
      circle(ctx, gx, gy, gr + 4, '#fff', C.grid2, 1.5);
      ctx.save(); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1;
      for (let k = -4; k <= 4; k++) { const a = -Math.PI / 2 + k * 0.22; ctx.beginPath(); ctx.moveTo(gx + Math.cos(a) * gr * 0.78, gy + 8 + Math.sin(a) * gr * 0.78); ctx.lineTo(gx + Math.cos(a) * gr * 0.92, gy + 8 + Math.sin(a) * gr * 0.92); ctx.stroke(); }
      ctx.restore();
      const na = -Math.PI / 2 + clamp(st.emf, -1.2, 1.2) * 0.75;
      line(ctx, gx, gy + 8, gx + Math.cos(na) * gr * 0.86, gy + 8 + Math.sin(na) * gr * 0.86, C.field, 2.5);
      circle(ctx, gx, gy + 8, 3.5, C.ink);
      text(ctx, 'meter', gx, gy + gr + 20, { size: 11, color: C.ink3, align: 'center' });
      // trace of the induced voltage
      const box = wide ? { l: PW + 34, r: w - 18, t: 34, b: h - 34 } : { l: 26, r: w - 14, t: gy + gr + 52, b: h - 26 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 360, y0: -1.4, y1: 1.4, yticks: [0], xticks: [], yfmt: () => '0' });
      text(ctx, 'induced voltage', box.l, box.t - 12, { size: 11, color: C.field, weight: 550 });
      pathLine(ctx, st.hist.map((v, i) => [sx(i + 360 - st.hist.length), sy(v)]), C.field, 2);
      text(ctx, 'time →', box.r, box.b + 16, { size: 11, color: C.ink3, align: 'right' });
      if (!st.auto && !st.dragging) text(ctx, 'drag the magnet ↔', mx, cy - magT - 14, { size: 12, color: C.ink2, align: 'center', weight: 550, halo: true });
    },
  });
  for (let i = 0; i < 360; i++) fig.opts.step(DT); // open with a full trace
  fig.interact({
    hit: (x, y) => { const g = geom; const mx = g.cx + st.x * g.span; return Math.abs(x - mx) < g.magLen / 2 + 10 && Math.abs(y - g.cy) < g.magT ? 'mag' : null; },
    down: (o, x) => { st.dragging = true; st.auto = false; autoSeg.set('drag'); st.off = x - (geom.cx + st.x * geom.span); },
    move: (o, x) => { st.x = clamp((x - st.off - geom.cx) / geom.span, -1.05, 1.05); },
    up: () => { st.dragging = false; },
  });
  const ctl = controls(el);
  const autoSeg = segmented(ctl, { options: [{ label: 'Wave it for me', value: 'auto' }, { label: 'I’ll drag it', value: 'drag' }], value: 'auto', onchange: v => { st.auto = v === 'auto'; st.t = Math.asin(clamp(st.x / 1.05, -1, 1)) / 1.4; } });
}

// ---------------------------------------------------------------------------
// F5: rotating magnet generator
// ---------------------------------------------------------------------------
export function rotor(el) {
  const st = { rpm: 3000, p: 1, ang: 0, hist: [], show: 'both' };
  const SLOW = 60;
  const fig = new Fig(el, {
    label: 'Cross-section of a generator: a magnet spins inside a stator coil, producing an alternating voltage',
    height: w => w < 560 ? w * 1.25 : Math.max(300, Math.min(380, w * 0.46)),
    animated: true,
    step(dt) {
      const omega = st.rpm / 60 * 2 * Math.PI / SLOW;
      st.ang += omega * dt;
      const e = (st.rpm / 3000) * Math.sin(st.p * st.ang);
      const phi = Math.cos(st.p * st.ang);
      st.hist.push([phi, e]); if (st.hist.length > 300) st.hist.shift();
    },
    draw(ctx, w, h) {
      const narrow = w < 560;
      const R = narrow ? Math.min(w * 0.32, 130) : Math.min(h * 0.4, w * 0.18);
      const cx = narrow ? w / 2 : R + 40, cy = narrow ? R + 26 : h / 2;
      // stator
      circle(ctx, cx, cy, R + 18, '#e9e5dc', null);
      circle(ctx, cx, cy, R + 2, C.paper, null);
      ctx.save(); ctx.strokeStyle = '#cfc8ba'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R + 18, 0, 7); ctx.stroke(); ctx.restore();
      // coils (for p pole pairs: 2p coil sides alternating)
      const e = st.hist.length ? st.hist[st.hist.length - 1][1] : 0;
      for (let k = 0; k < 2 * st.p; k++) {
        const a = Math.PI + k * Math.PI / st.p;
        const x = cx + Math.cos(a) * (R + 6), y = cy + Math.sin(a) * (R + 6);
        ctx.save(); ctx.translate(x, y); ctx.rotate(a);
        rrect(ctx, -8, -16, 16, 32, 5); ctx.fillStyle = COPPER; ctx.fill();
        ctx.restore();
        const sgn = (k % 2 ? -1 : 1) * Math.sign(e);
        const mag = Math.abs(e);
        if (mag > 0.05) {
          circle(ctx, x, y, 6, '#fff');
          if (sgn > 0) circle(ctx, x, y, 2.5, alpha(C.field, 0.4 + mag * 0.6));
          else { line(ctx, x - 3.5, y - 3.5, x + 3.5, y + 3.5, alpha(C.field, 0.4 + mag * 0.6), 2); line(ctx, x + 3.5, y - 3.5, x - 3.5, y + 3.5, alpha(C.field, 0.4 + mag * 0.6), 2); }
        }
      }
      // rotor: disc with 2p poles
      const rr = R * 0.78;
      for (let k = 0; k < 2 * st.p; k++) {
        const a0 = st.ang + (k - 0.5) * Math.PI / st.p, a1 = a0 + Math.PI / st.p;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, rr, a0, a1); ctx.closePath();
        const col = k % 2 === 0 ? C.north : C.south;
        const g = ctx.createRadialGradient(cx, cy, rr * 0.2, cx, cy, rr);
        g.addColorStop(0, lighten(col, 0.35)); g.addColorStop(1, col);
        ctx.fillStyle = g; ctx.fill();
        const am = (a0 + a1) / 2;
        text(ctx, k % 2 === 0 ? 'N' : 'S', cx + Math.cos(am) * rr * 0.68, cy + Math.sin(am) * rr * 0.68 + 4.5, { size: 13, color: '#fff', weight: 650, align: 'center' });
      }
      circle(ctx, cx, cy, rr * 0.16, '#ddd6c8', '#bfb6a5', 1);
      // chart
      const box = narrow ? { l: 46, r: w - 16, t: 2 * R + 90, b: h - 30 } : { l: cx + R + 80, r: w - 16, t: 30, b: h - 34 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 300, y0: -1.25, y1: 1.25, yticks: [-1, 0, 1], xticks: [], yfmt: v => v === 0 ? '0' : '' });
      if (st.show !== 'emf') pathLine(ctx, st.hist.map(([p], i) => [sx(i + 300 - st.hist.length), sy(p)]), alpha(C.ink3, 0.9), 1.5, [4, 4]);
      if (st.show !== 'flux') pathLine(ctx, st.hist.map(([, v], i) => [sx(i + 300 - st.hist.length), sy(v)]), C.field, 2.2);
      text(ctx, 'magnetic flux through the coil', box.l + 6, box.t - 4, { size: 11, color: C.ink3 });
      text(ctx, 'voltage across the coil', box.l + 6, box.t + 12, { size: 11, color: C.field, weight: 550 });
      text(ctx, `animation slowed ${SLOW}×`, box.r, box.b + 18, { size: 11, color: C.ink3, align: 'right' });
    },
  });
  for (let i = 0; i < 300; i++) fig.opts.step(1 / 60);
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => { const f = st.p * st.rpm / 60; ro.innerHTML = `${st.p * 2} poles at ${st.rpm.toFixed(0)} rpm → <b>${f.toFixed(1)} Hz</b>. ${Math.abs(f - 50) < 0.3 ? 'That’s Europe’s grid frequency.' : Math.abs(f - 60) < 0.3 ? 'That’s North America’s grid frequency.' : ''}`; };
  slider(ctl, { label: 'Rotor speed', min: 0, max: 3600, step: 50, value: st.rpm, color: C.field, fmt: v => v.toFixed(0) + ' rpm', oninput: v => { st.rpm = v; upd(); }, name: 'rpm' });
  segmented(ctl, { label: 'Pole pairs', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }], value: 1, onchange: v => { st.p = v; upd(); } });
  segmented(ctl, { options: [{ label: 'Both', value: 'both' }, { label: 'Flux', value: 'flux' }, { label: 'Voltage', value: 'emf' }], value: 'both', onchange: v => { st.show = v; fig.invalidate(); } });
  upd();
}

// ---------------------------------------------------------------------------
// F6: three-phase
// ---------------------------------------------------------------------------
export function threePhase(el) {
  const st = { ang: 0, speed: 0.5, mode: 'v', hist: [] };
  const PH = [C.phaseA, C.phaseB, C.phaseC];
  const fig = new Fig(el, {
    label: 'Three coils spaced 120 degrees apart produce three staggered sine waves that sum to zero and deliver constant power',
    height: w => w < 560 ? w * 1.3 : Math.max(300, Math.min(380, w * 0.46)),
    animated: true,
    step(dt) {
      st.ang += st.speed * 2 * Math.PI * dt;
      st.hist.push(st.ang); if (st.hist.length > 320) st.hist.shift();
    },
    draw(ctx, w, h) {
      const narrow = w < 560;
      const R = narrow ? Math.min(w * 0.32, 130) : Math.min(h * 0.4, w * 0.18);
      const cx = narrow ? w / 2 : R + 40, cy = narrow ? R + 26 : h / 2;
      circle(ctx, cx, cy, R + 18, '#e9e5dc'); circle(ctx, cx, cy, R + 2, C.paper);
      const vals = [0, 1, 2].map(k => Math.sin(st.ang - k * 2 * Math.PI / 3));
      for (let k = 0; k < 3; k++) {
        for (const side of [0, 1]) {
          const a = -Math.PI / 2 + k * 2 * Math.PI / 3 + side * Math.PI + Math.PI / 2;
          const x = cx + Math.cos(a) * (R + 6), y = cy + Math.sin(a) * (R + 6);
          ctx.save(); ctx.translate(x, y); ctx.rotate(a);
          rrect(ctx, -8, -14, 16, 28, 5);
          ctx.fillStyle = mix(lighten(PH[k], 0.55), PH[k], clamp(Math.abs(vals[k]), 0, 1)); ctx.fill();
          ctx.restore();
        }
      }
      // rotor bar
      const ra = st.ang;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ra);
      rrect(ctx, 0, -R * 0.2, R * 0.78, R * 0.4, 6); ctx.fillStyle = C.north; ctx.fill();
      rrect(ctx, -R * 0.78, -R * 0.2, R * 0.78, R * 0.4, 6); ctx.fillStyle = C.south; ctx.fill();
      ctx.restore();
      circle(ctx, cx, cy, R * 0.12, '#ddd6c8', '#bfb6a5', 1);
      // chart
      const box = narrow ? { l: 46, r: w - 16, t: 2 * R + 90, b: h - 30 } : { l: cx + R + 80, r: w - 16, t: 30, b: h - 34 };
      const isP = st.mode === 'p';
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 320, y0: isP ? 0 : -1.25, y1: isP ? 1.75 : 1.25, yticks: isP ? [0, 1.5] : [-1, 0, 1], xticks: [], yfmt: v => isP ? (v ? '1.5' : '0') : v === 0 ? '0' : '' });
      const n = st.hist.length, off = 320 - n;
      if (!isP) {
        for (let k = 0; k < 3; k++) pathLine(ctx, st.hist.map((a, i) => [sx(i + off), sy(Math.sin(a - k * 2 * Math.PI / 3))]), PH[k], 2);
        if (st.mode === 'sum') {
          pathLine(ctx, st.hist.map((a, i) => [sx(i + off), sy([0, 1, 2].reduce((s, k) => s + Math.sin(a - k * 2 * Math.PI / 3), 0))]), C.ink, 3);
          text(ctx, 'sum of all three = 0 at every instant', box.r, sy(0) - 10, { size: 12, color: C.ink, align: 'right', weight: 600, halo: true });
        }
      } else {
        // stacked instantaneous powers
        const stackAt = (a, upto) => { let s = 0; for (let k = 0; k <= upto; k++) s += Math.pow(Math.sin(a - k * 2 * Math.PI / 3), 2); return s; };
        for (let k = 2; k >= 0; k--) {
          ctx.beginPath();
          st.hist.forEach((a, i) => { const x = sx(i + off), y = sy(stackAt(a, k)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
          for (let i = n - 1; i >= 0; i--) ctx.lineTo(sx(i + off), sy(k ? stackAt(st.hist[i], k - 1) : 0));
          ctx.closePath(); ctx.fillStyle = alpha(PH[k], 0.55); ctx.fill();
        }
        text(ctx, 'total power: perfectly steady', box.r, sy(1.5) - 8, { size: 12, color: C.ink, align: 'right', weight: 600 });
      }
      // labels
      ['A', 'B', 'C'].forEach((s, k) => text(ctx, 'phase ' + s, box.l + 6 + k * 70, box.t - 6, { size: 11, color: PH[k], weight: 600 }));
    },
  });
  for (let i = 0; i < 320; i++) fig.opts.step(1 / 60);
  const ctl = controls(el);
  segmented(ctl, { options: [{ label: 'Voltages', value: 'v' }, { label: 'Add them up', value: 'sum' }, { label: 'Power', value: 'p' }], value: 'v', onchange: v => { st.mode = v; fig.invalidate(); }, name: 'mode' });
  slider(ctl, { label: 'Rotation (slowed)', min: 0.05, max: 1.2, step: 0.01, value: st.speed, color: C.phaseA, fmt: v => v.toFixed(2) + ' rev/s', oninput: v => { st.speed = v; } });
}
