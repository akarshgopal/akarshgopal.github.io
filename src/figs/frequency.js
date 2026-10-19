// SHOWPIECE 1 — grid frequency. Swing-equation model of an interconnected AC system (illustrative,
// parameters chosen to resemble Continental Europe: 50 Hz, ~3 GW frequency containment reserve fully
// deployed at ±200 mHz, load self-regulation ~1 %/Hz, under-frequency load shedding starting at 49.0 Hz).
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, measure, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, approach, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, more } from '../lib/ui.js';

const F0 = 50, L0 = 300; // GW
const UFLS = [49.0, 48.8, 48.6, 48.4, 48.2];
const COLS = { inertia: '#8d7b6a', relief: '#b9b1a3', fcr: C.freq, afrr: C.storage, shed: C.peaker };

export function frequency(el) {
  const st = {};
  const units = [
    { tech: 'nuclear', label: 'Nuclear' }, { tech: 'lignite', label: 'Lignite' }, { tech: 'coal', label: 'Hard coal' },
    { tech: 'gas', label: 'Gas' }, { tech: 'hydro', label: 'Hydro' }, { tech: 'gas', label: 'Gas' },
  ];
  function reset() {
    Object.assign(st, { df: 0, fcr: 0, afrr: 0, shed: 0, stages: 0, lost: 0, dload: 0, t: 0, acc: 0, hist: [], events: [], blackout: false, theta: units.map((_, i) => i * 0.7), tripped: units.map(() => false), needle: 0 });
  }
  reset();
  Object.assign(st, { H: 4.5, fcrOn: true, afrrOn: true, speed: 2 });
  const WINDOW = 240;

  function substep(dt) {
    if (st.blackout) return;
    const L = L0 + st.dload - st.shed;
    const relief = -L * 0.01 * st.df;            // load self-regulation (GW)
    const Pe = L - relief;
    const Pm = L0 - st.lost + st.fcr + st.afrr;
    const imb = Pm - Pe;
    const S = Math.max(50, L0 - st.lost);
    const E = st.H * S;                           // GW·s of kinetic energy
    st.df += F0 * imb / (2 * E) * dt;
    const fcrT = st.fcrOn ? clamp(-15 * st.df, -3, 3) : 0;
    st.fcr += (fcrT - st.fcr) * Math.min(1, dt / 7);
    if (st.afrrOn) {
      const B = 18;
      st.afrr = clamp(st.afrr + (-0.02 * B * st.df - 0.0 * st.afrr) * dt, -15, 15);
    } else st.afrr = approach(st.afrr, 0, 0.05, dt);
    const f = F0 + st.df;
    while (st.stages < UFLS.length && f < UFLS[st.stages]) { st.shed += 0.05 * L0; st.events.push({ t: st.t, label: `load shed ${UFLS[st.stages].toFixed(1)} Hz`, col: C.peaker }); st.stages++; }
    if (f < 47.5) { st.blackout = true; st.events.push({ t: st.t, label: 'blackout', col: C.ink }); }
    st.t += dt;
    const inertia = -imb; // power drawn from spinning mass
    st.last = { inertia, relief, fcr: st.fcr, afrr: st.afrr, shed: st.shed };
  }
  function advance(simDt) {
    const n = Math.ceil(simDt / 0.02);
    for (let i = 0; i < n; i++) {
      substep(simDt / n);
      st.acc += simDt / n;
      if (st.acc >= 0.25) { st.acc -= 0.25; st.hist.push({ t: st.t, f: F0 + st.df, ...st.last }); if (st.hist.length > WINDOW * 4 + 8) st.hist.shift(); }
    }
    for (let i = 0; i < units.length; i++) if (!st.tripped[i]) st.theta[i] += 2 * Math.PI * st.df * simDt * 3;
  }
  st.last = { inertia: 0, relief: 0, fcr: 0, afrr: 0, shed: 0 };

  const fig = new Fig(el, {
    label: 'Simulation of grid frequency: a frequency gauge, a row of synchronised generators viewed under a 50 Hz strobe, a frequency trace and a chart of which reserves cover a lost power plant',
    height: w => w < 640 ? 830 : Math.max(560, Math.min(640, w * 0.72)),
    animated: true,
    step(dt) { advance(dt * st.speed); st.needle = approach(st.needle, st.df, 12, dt); },
    draw(ctx, w, h) {
      const narrow = w < 640;
      const f = F0 + st.df;
      // ---- gauge
      const gR = narrow ? Math.min(w * 0.3, 112) : Math.min(140, w * 0.17);
      const gx = narrow ? w / 2 : gR + 40, gy = gR + 30;
      const fmin = 48.5, fmax = 51.5;
      const ang = v => Math.PI + (clamp(v, fmin, fmax) - fmin) / (fmax - fmin) * Math.PI;
      const arc = (a, b, col, wd) => { ctx.beginPath(); ctx.arc(gx, gy, gR, ang(a), ang(b)); ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.stroke(); };
      ctx.save(); ctx.lineCap = 'butt';
      arc(fmin, fmax, '#ebe7df', 16);
      arc(49.0, 49.8, alpha(C.solar, 0.55), 16); arc(50.2, 51.0, alpha(C.solar, 0.55), 16);
      arc(fmin, 49.0, alpha(C.peaker, 0.6), 16); arc(51.0, fmax, alpha(C.peaker, 0.6), 16);
      arc(49.8, 50.2, alpha(C.storage, 0.6), 16);
      ctx.restore();
      for (let v = 48.5; v <= 51.5 + 1e-9; v += 0.5) {
        const a = ang(v);
        line(ctx, gx + Math.cos(a) * (gR - 12), gy + Math.sin(a) * (gR - 12), gx + Math.cos(a) * (gR + 10), gy + Math.sin(a) * (gR + 10), C.ink3, 1);
        text(ctx, v.toFixed(1), gx + Math.cos(a) * (gR + 24), gy + Math.sin(a) * (gR + 24) + 4, { size: 10.5, color: C.ink3, align: 'center' });
      }
      const na = ang(F0 + st.needle);
      ctx.save(); ctx.lineCap = 'round';
      line(ctx, gx, gy, gx + Math.cos(na) * (gR - 6), gy + Math.sin(na) * (gR - 6), C.ink, 3);
      ctx.restore();
      circle(ctx, gx, gy, 7, C.ink);
      text(ctx, f.toFixed(3) + ' Hz', gx, gy + 34, { size: 20, color: Math.abs(st.df) > 1 ? C.peaker : Math.abs(st.df) > 0.2 ? '#b07a12' : C.ink, weight: 650, align: 'center' });
      text(ctx, st.blackout ? 'system collapsed' : Math.abs(st.df) < 0.02 ? 'balanced' : st.df < 0 ? 'demand > supply: slowing' : 'supply > demand: speeding up', gx, gy + 54, { size: 11.5, color: C.ink3, align: 'center' });

      // ---- rotors (strobe view)
      const nRot = Math.round(clamp(st.H / 6, 0, 1) * 6);
      const rx0 = narrow ? 20 : gx + gR + 60, rw = narrow ? w - 40 : w - rx0 - 16;
      const ry = narrow ? gy + 80 : 26;
      const cols = narrow ? 3 : 6, rows = narrow ? 2 : 1;
      const cellW = rw / cols, rr = Math.min(cellW * 0.32, narrow ? 27 : 34);
      text(ctx, (narrow ? 'Generators under a 50 Hz strobe' : 'Synchronised generators, seen under a strobe flashing 50 times a second'), rx0, ry + 2, { size: 11.5, color: C.ink3, weight: 500 });
      units.forEach((u, i) => {
        const cxu = rx0 + cellW * (i % cols + 0.5), cyu = ry + 26 + rr + Math.floor(i / cols) * (rr * 2 + 52);
        const isRot = i < nRot;
        const col = C[u.tech];
        if (!isRot) {
          rrect(ctx, cxu - rr, cyu - rr * 0.7, rr * 2, rr * 1.4, 8); ctx.fillStyle = st.tripped[i] ? '#e7e3db' : lighten(C.solar, 0.7); ctx.fill(); ctx.strokeStyle = alpha(C.solar, 0.8); ctx.stroke();
          ctx.beginPath(); for (let k = 0; k <= 30; k++) { const x = cxu - rr * 0.7 + k / 30 * rr * 1.4; ctx.lineTo(x, cyu - Math.sin(k / 30 * Math.PI * 2) * rr * 0.3); } ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.stroke();
          text(ctx, 'inverter', cxu, cyu + rr + 16, { size: 11, color: C.ink2, align: 'center' });
          if (measure(ctx, 'wind / solar / battery', 10) < cellW - 6) text(ctx, 'wind / solar / battery', cxu, cyu + rr + 30, { size: 10, color: C.ink3, align: 'center' });
        } else {
          const dead = st.tripped[i];
          circle(ctx, cxu, cyu, rr + 5, dead ? '#ece9e3' : lighten(col, 0.75));
          const g = ctx.createRadialGradient(cxu - rr * 0.3, cyu - rr * 0.3, 2, cxu, cyu, rr);
          g.addColorStop(0, dead ? '#ddd' : lighten(col, 0.35)); g.addColorStop(1, dead ? '#c9c5bd' : col);
          circle(ctx, cxu, cyu, rr, g);
          if (!dead) {
            const th = st.theta[i];
            for (let k = 0; k < 2; k++) { const a = th + k * Math.PI; line(ctx, cxu + Math.cos(a) * rr * 0.2, cyu + Math.sin(a) * rr * 0.2, cxu + Math.cos(a) * rr * 0.92, cyu + Math.sin(a) * rr * 0.92, '#fff', 3); }
            circle(ctx, cxu + Math.cos(th) * rr * 0.7, cyu + Math.sin(th) * rr * 0.7, 3.5, C.ink);
          } else { line(ctx, cxu - rr * 0.5, cyu - rr * 0.5, cxu + rr * 0.5, cyu + rr * 0.5, C.peaker, 3); line(ctx, cxu + rr * 0.5, cyu - rr * 0.5, cxu - rr * 0.5, cyu + rr * 0.5, C.peaker, 3); }
          circle(ctx, cxu, cyu, 4, '#efebe4', C.ink3, 1);
          text(ctx, u.label, cxu, cyu + rr + 18, { size: 11, color: dead ? C.ink3 : C.ink2, align: 'center', weight: 550 });
          if (!dead && st.fcrOn && Math.abs(st.fcr) > 0.05) {
            const up = st.fcr > 0; const ay = cyu - rr - 10;
            arrow(ctx, cxu + rr + 4, up ? ay + 12 : ay, cxu + rr + 4, up ? ay : ay + 12, alpha(C.freq, clamp(Math.abs(st.fcr) / 3, 0.25, 1)), 2, 6);
          }
        }
      });

      // ---- frequency trace
      const tNow = st.t, t0 = Math.max(0, tNow - WINDOW);
      const fb = narrow ? { l: 52, r: w - 16, t: ry + 26 + 2 * (2 * rr + 52) + 34, b: 0 } : { l: 56, r: w - 18, t: Math.max(gy + 92, ry + rr * 2 + 86), b: 0 };
      const avail = h - fb.t - 20;
      fb.b = fb.t + avail * 0.48;
      const fs = st.hist.filter(p => p.t >= t0);
      const fminV = Math.min(49.7, ...fs.map(p => p.f)) - 0.05, fmaxV = Math.max(50.3, ...fs.map(p => p.f)) + 0.05;
      const yt = [];
      const stepT = (fmaxV - fminV) > 1.2 ? 0.5 : 0.2;
      for (let v = Math.ceil(fminV / stepT) * stepT; v <= fmaxV; v += stepT) yt.push(+v.toFixed(2));
      const A = axes(ctx, { box: fb, x0: t0, x1: t0 + WINDOW, y0: fminV, y1: fmaxV, yticks: yt, xticks: [], yfmt: v => v.toFixed(1), ylabel: 'frequency, Hz' });
      for (const [v, col] of [[49.8, C.solar], [50.2, C.solar], [49.0, C.peaker]]) if (v > fminV && v < fmaxV) line(ctx, fb.l, A.sy(v), fb.r, A.sy(v), alpha(col, 0.7), 1, [3, 4]);
      if (49.8 > fminV) text(ctx, '±200 mHz: reserves fully deployed', fb.r, A.sy(49.8) + 13, { size: 10.5, color: '#a77a10', align: 'right' });
      if (49.0 > fminV) text(ctx, '49.0 Hz: automatic load shedding begins', fb.r, A.sy(49.0) + 13, { size: 10.5, color: C.peaker, align: 'right' });
      pathLine(ctx, fs.map(p => [A.sx(p.t), A.sy(p.f)]), C.freq, 2.2);
      let lastX = -1e9, lane = 0; for (const ev of st.events) if (ev.t >= t0) { const x = A.sx(ev.t); lane = x - lastX < 110 ? lane + 1 : 0; lastX = x; line(ctx, x, fb.t, x, fb.b, alpha(ev.col, 0.5), 1); text(ctx, ev.label, x + 4, fb.t + 12 + lane * 14, { size: 10.5, color: ev.col, weight: 600, halo: true }); }

      // ---- who covers the gap
      const legend = [['inertia', 'spinning mass'], ['relief', 'load self-regulation'], ['fcr', 'primary reserve (FCR)'], ['afrr', 'secondary reserve (aFRR)'], ['shed', 'load shedding']];
      const legW = legend.reduce((a, [, lab]) => a + 26 + measure(ctx, lab, 10.5) * 1.05, 0);
      const gridLeg = narrow || fb.l + 130 + legW > w - 8;
      const bb = { l: fb.l, r: fb.r, t: fb.b + (gridLeg ? 74 : 40), b: h - 30 };
      const gapMax = Math.max(3.5, ...fs.map(p => Math.abs(p.inertia) + Math.abs(p.relief) + Math.abs(p.fcr) + Math.abs(p.afrr) + p.shed)) * 1.1;
      const B = axes(ctx, { box: bb, x0: t0, x1: t0 + WINDOW, y0: -gapMax * 0.25, y1: gapMax, xticks: [], yfmt: v => v.toFixed(0) + ' GW', ylabel: 'who covers the gap', ny: 3 });
      const keys = ['inertia', 'relief', 'fcr', 'afrr', 'shed'];
      if (fs.length > 1) {
        let prev = fs.map(() => 0);
        for (const k of keys) {
          const cur = fs.map((p, i) => prev[i] + Math.max(0, p[k]));
          ctx.beginPath();
          fs.forEach((p, i) => { const x = B.sx(p.t), y = B.sy(cur[i]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
          for (let i = fs.length - 1; i >= 0; i--) ctx.lineTo(B.sx(fs[i].t), B.sy(prev[i]));
          ctx.closePath(); ctx.fillStyle = alpha(COLS[k], 0.75); ctx.fill();
          prev = cur;
        }
      }
      // time axis labels
      // tick labels stop short of the 'simulated time' note in the bottom-right corner
      const noteL = bb.r - measure(ctx, `simulated time ${fmtT(st.t)} · ${st.speed}× speed`, 10.5) - 8;
      for (let s = Math.ceil(t0 / 60) * 60; s <= t0 + WINDOW && B.sx(s) + 20 < noteL; s += 60) text(ctx, (s / 60).toFixed(0) + ' min', B.sx(s), bb.b + 16, { size: 10.5, color: C.ink3, align: 'center' });
      let lx = bb.l + 130; const ly = bb.t - 9;
      if (!gridLeg) for (const [k, lab] of legend) { rrect(ctx, lx, ly - 8, 10, 10, 2); ctx.fillStyle = COLS[k]; ctx.fill(); text(ctx, lab, lx + 14, ly + 1, { size: 10.5, color: C.ink2 }); lx += 26 + ctx.measureText(lab).width * 1.05; }
      else { const nc = narrow ? 2 : 3; legend.forEach(([k, lab], i) => { const xx = bb.l - 30 + (i % nc) * (bb.r - bb.l + 30) / nc, yy = bb.t - 54 + Math.floor(i / nc) * 13; rrect(ctx, xx, yy - 8, 9, 9, 2); ctx.fillStyle = COLS[k]; ctx.fill(); text(ctx, lab, xx + 12, yy, { size: 9.5, color: C.ink2 }); }); }
      text(ctx, `simulated time ${fmtT(st.t)} · ${st.speed}× speed`, bb.r, h - 6, { size: 10.5, color: C.ink3, align: 'right' });
    },
  });
  function fmtT(t) { const m = Math.floor(t / 60), s = Math.floor(t % 60); return `${m}:${String(s).padStart(2, '0')}`; }

  function trip(gw, label) {
    if (st.blackout) return;
    st.lost += gw;
    const idx = st.tripped.findIndex((d, i) => !d && i < Math.round(clamp(st.H / 6, 0, 1) * 6));
    if (idx >= 0) st.tripped[idx] = true;
    st.events.push({ t: st.t, label, col: C.ink });
    if (!isPlaying()) { advance(1); }
    fig.invalidate();
  }
  const ctl = controls(el);
  const row1 = document.createElement('div'); row1.className = 'ctl btnrow'; ctl.appendChild(row1);
  button(row1, 'Trip a 1 GW plant', () => trip(1, '−1 GW'), { kind: 'danger', name: 'trip1' });
  button(row1, 'Trip 3 GW <small>(design incident)</small>', () => trip(3, '−3 GW'), { kind: 'danger', name: 'trip3' });
  button(row1, 'Lose 15 GW', () => trip(15, '−15 GW'), { kind: 'danger', name: 'trip15' });
  button(row1, 'Reset', () => { reset(); dl.set(0); fig.invalidate(); }, { kind: 'ghost', name: 'reset' });
  const mo = more(ctl, 'More: inertia and reserves');
  slider(mo, { label: 'System inertia H', min: 1, max: 8, step: 0.1, value: st.H, color: C.lignite, fmt: v => v.toFixed(1) + ' s', oninput: v => { st.H = v; fig.invalidate(); }, name: 'H' });
  const dl = slider(mo, { label: 'Extra demand <small>(drag)</small>', min: -6, max: 6, step: 0.1, value: 0, color: C.demand, fmt: v => (v > 0 ? '+' : '') + v.toFixed(1) + ' GW', oninput: v => { st.dload = v; fig.invalidate(); }, name: 'demand' });
  segmented(mo, { label: 'Primary reserve', options: [{ label: 'on', value: true }, { label: 'off', value: false }], value: true, onchange: v => { st.fcrOn = v; }, color: C.freq });
  segmented(mo, { label: 'Secondary reserve', options: [{ label: 'on', value: true }, { label: 'off', value: false }], value: true, onchange: v => { st.afrrOn = v; }, color: C.storage });
  segmented(mo, { label: 'Speed', options: [{ label: '1×', value: 1 }, { label: '2×', value: 2 }, { label: '8×', value: 8 }], value: 2, onchange: v => { st.speed = v; } });
  // open on the event itself: the first time the figure is well in view (and animations are on), a 1 GW plant trips
  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      io.disconnect();
      setTimeout(() => { if (isPlaying() && !st.events.length && !st.blackout) trip(1, '−1 GW'); }, 1500);
    }, { threshold: 0.6 });
    io.observe(el);
  }
  // expose for programmatic tests
  el.__sim = { st, trip, advance, fig };
}
