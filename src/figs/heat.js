import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, approach, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout } from '../lib/ui.js';

const K = 273.15;
const tempColor = t => mix(C.cold, C.hot, clamp(t, 0, 1));

// ---------------------------------------------------------------------------
// F7: Rankine cycle + Carnot bound
// ---------------------------------------------------------------------------
export function rankine(el) {
  const st = { Th: 540, Tc: 30, s: 0, blade: 0 };
  const fig = new Fig(el, {
    label: 'A steam power-plant cycle beside a chart of maximum efficiency against steam temperature',
    height: w => w < 620 ? 640 : Math.max(330, Math.min(400, w * 0.46)),
    animated: true,
    step(dt) { st.s = (st.s + dt * 0.12) % 1; st.blade += dt * 9; },
    draw(ctx, w, h) {
      const narrow = w < 620;
      const S = narrow ? { x: 16, y: 16, w: w - 32, h: 300 } : { x: 10, y: 20, w: w * 0.44, h: h - 40 };
      const { x, y } = S; const W = S.w, H = S.h;
      // anchor points
      const boiler = { x: x + W * 0.06, y: y + H * 0.55, w: W * 0.26, h: H * 0.36 };
      const tIn = { x: x + W * 0.36, y: y + H * 0.16 }, tOut = { x: x + W * 0.66, y: y + H * 0.16 };
      const cond = { x: x + W * 0.70, y: y + H * 0.42, w: W * 0.24, h: H * 0.3 };
      const pump = { x: x + W * 0.55, y: y + H * 0.86 };
      const path = [
        [boiler.x + boiler.w * 0.5, boiler.y], [boiler.x + boiler.w * 0.5, tIn.y], [tIn.x, tIn.y],
        [tOut.x, tOut.y], [cond.x + cond.w * 0.5, tOut.y], [cond.x + cond.w * 0.5, cond.y],
        [cond.x + cond.w * 0.5, cond.y + cond.h], [cond.x + cond.w * 0.5, pump.y], [pump.x, pump.y],
        [boiler.x + boiler.w * 0.8, pump.y], [boiler.x + boiler.w * 0.8, boiler.y + boiler.h],
        [boiler.x + boiler.w * 0.5, boiler.y + boiler.h * 0.4], [boiler.x + boiler.w * 0.5, boiler.y],
      ];
      // temperature along path (0 cold .. 1 hot)
      const hotT = clamp((st.Th - 100) / 600, 0.25, 1);
      const temps = [hotT, hotT, hotT, 0.35, 0.33, 0.3, 0.05, 0.05, 0.07, 0.08, 0.1, 0.6, hotT];
      // pipes
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (let i = 0; i < path.length - 1; i++) {
        if (i === 2) continue; // turbine body drawn separately
        if (i >= 5 && i <= 5) continue;
        const g = ctx.createLinearGradient(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
        g.addColorStop(0, alpha(tempColor(temps[i]), 0.55)); g.addColorStop(1, alpha(tempColor(temps[i + 1]), 0.55));
        ctx.strokeStyle = g; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(...path[i]); ctx.lineTo(...path[i + 1]); ctx.stroke();
      }
      ctx.restore();
      // boiler
      rrect(ctx, boiler.x, boiler.y, boiler.w, boiler.h, 10); ctx.fillStyle = '#efe7da'; ctx.fill(); ctx.strokeStyle = '#d6cbb8'; ctx.stroke();
      for (let k = 0; k < 5; k++) {
        const fx = boiler.x + boiler.w * (0.15 + k * 0.17), fy = boiler.y + boiler.h - 8;
        const fh = boiler.h * (0.32 + 0.12 * Math.sin(st.blade * 0.7 + k * 1.7)) * (0.6 + hotT * 0.5);
        ctx.beginPath(); ctx.moveTo(fx - 7, fy); ctx.quadraticCurveTo(fx - 4, fy - fh * 0.6, fx, fy - fh); ctx.quadraticCurveTo(fx + 4, fy - fh * 0.6, fx + 7, fy); ctx.closePath();
        ctx.fillStyle = alpha(mix('#f2b134', '#e0503a', 0.5 + 0.5 * Math.sin(k)), 0.8); ctx.fill();
      }
      text(ctx, 'boiler', boiler.x + boiler.w / 2, boiler.y - 8, { size: 11.5, color: C.ink2, align: 'center', weight: 550 });
      // turbine (expanding)
      const th0 = 16, th1 = 46;
      ctx.beginPath(); ctx.moveTo(tIn.x, tIn.y - th0); ctx.lineTo(tOut.x, tOut.y - th1); ctx.lineTo(tOut.x, tOut.y + th1); ctx.lineTo(tIn.x, tIn.y + th0); ctx.closePath();
      const tg = ctx.createLinearGradient(tIn.x, 0, tOut.x, 0); tg.addColorStop(0, lighten(tempColor(hotT), 0.55)); tg.addColorStop(1, lighten(tempColor(0.35), 0.6));
      ctx.fillStyle = tg; ctx.fill(); ctx.strokeStyle = '#b9b0a0'; ctx.stroke();
      ctx.save(); ctx.clip();
      for (let k = 0; k < 14; k++) {
        const bx = tIn.x + ((k / 14 + st.blade * 0.02) % 1) * (tOut.x - tIn.x);
        const hh = lerp(th0, th1, (bx - tIn.x) / (tOut.x - tIn.x));
        line(ctx, bx, tIn.y - hh, bx + 6, tIn.y + hh, alpha(C.ink2, 0.35), 1.5);
      }
      ctx.restore();
      text(ctx, 'turbine', (tIn.x + tOut.x) / 2, tIn.y - th1 - 8, { size: 11.5, color: C.ink2, align: 'center', weight: 550 });
      // generator on shaft
      line(ctx, tOut.x, tOut.y, tOut.x + 10, tOut.y, C.ink3, 3);
      // condenser
      rrect(ctx, cond.x, cond.y, cond.w, cond.h, 10); ctx.fillStyle = '#e3edf3'; ctx.fill(); ctx.strokeStyle = '#c1d3de'; ctx.stroke();
      for (let k = 0; k < 4; k++) { const yy = cond.y + cond.h * (0.25 + k * 0.17); ctx.beginPath(); for (let i = 0; i <= 20; i++) { const xx = cond.x + 8 + i / 20 * (cond.w - 16); ctx.lineTo(xx, yy + Math.sin(i * 0.9 + st.blade * 0.5) * 2.5); } ctx.strokeStyle = alpha(C.cold, 0.6); ctx.lineWidth = 1.6; ctx.stroke(); }
      text(ctx, 'condenser', cond.x + cond.w / 2, cond.y + cond.h + 16, { size: 11.5, color: C.ink2, align: 'center', weight: 550 });
      text(ctx, '→ waste heat ' + Math.round(100 - eff().ca) + '%', cond.x + cond.w / 2 + 8, cond.y + cond.h + 32, { size: 10.5, color: C.cold, align: 'left', weight: 600 });
      // pump
      circle(ctx, pump.x, pump.y, 11, '#fff', C.ink3, 1.5);
      ctx.save(); ctx.translate(pump.x, pump.y); ctx.rotate(st.blade * 0.6); line(ctx, -7, 0, 7, 0, C.ink3, 2); line(ctx, 0, -7, 0, 7, C.ink3, 2); ctx.restore();
      text(ctx, 'pump', pump.x, pump.y + 26, { size: 11, color: C.ink3, align: 'center' });
      // particles along path
      const segLen = []; let total = 0;
      for (let i = 0; i < path.length - 1; i++) { const d = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]); segLen.push(d); total += d; }
      for (let k = 0; k < 34; k++) {
        let d = ((k / 34 + st.s) % 1) * total, i = 0;
        while (i < segLen.length - 1 && d > segLen[i]) { d -= segLen[i]; i++; }
        const t = segLen[i] ? d / segLen[i] : 0;
        const px = lerp(path[i][0], path[i + 1][0], t), py = lerp(path[i][1], path[i + 1][1], t);
        const tt = lerp(temps[i], temps[i + 1], t);
        const isSteam = i <= 5;
        circle(ctx, px, py, isSteam ? 3.4 : 2.6, tempColor(tt), '#fff', 1);
      }
      text(ctx, Math.round(st.Th) + ' °C steam', tIn.x - 6, tIn.y + th0 + 18, { size: 11.5, color: C.hot, weight: 600, align: 'center' });
      text(ctx, Math.round(st.Tc) + ' °C', cond.x + cond.w + 2, cond.y - 6, { size: 11.5, color: C.cold, weight: 600, align: 'right' });

      // chart
      const box = narrow ? { l: 52, r: w - 20, t: S.y + S.h + 50, b: h - 40 } : { l: x + W + 64, r: w - 18, t: 36, b: h - 44 };
      const sc = axes(ctx, { box, x0: 100, x1: 700, y0: 0, y1: 75, xticks: [100, 200, 300, 400, 500, 600, 700], yticks: [0, 25, 50, 75], xfmt: v => v + '°', yfmt: v => v + '%', ylabel: 'efficiency', xlabel: 'steam temperature, °C' });
      const { sx, sy } = sc;
      // plateau band
      ctx.fillStyle = alpha(C.coal, 0.08); ctx.fillRect(sx(538), box.t, sx(600) - sx(538), box.b - box.t);
      text(ctx, '1960s plateau', (sx(538) + sx(600)) / 2, box.b - 30, { size: 10.5, color: C.ink3, align: 'center' });
      text(ctx, '538–600 °C', (sx(538) + sx(600)) / 2, box.b - 16, { size: 10.5, color: C.ink3, align: 'center' });
      const tc = st.Tc + K;
      const carnot = [], ca = [];
      for (let T = 100; T <= 700; T += 5) { carnot.push([sx(T), sy(100 * (1 - tc / (T + K)))]); ca.push([sx(T), sy(100 * (1 - Math.sqrt(tc / (T + K))))]); }
      pathLine(ctx, carnot, C.ink2, 1.5, [5, 4]);
      pathLine(ctx, ca, C.hot, 2.2);
      text(ctx, 'Carnot limit', sx(112), sy(100 * (1 - tc / (112 + K))) - 12, { size: 11, color: C.ink2, align: 'left', halo: true });
      text(ctx, 'practical estimate', sx(400), sy(100 * (1 - Math.sqrt(tc / (400 + K)))) + 18, { size: 11, color: C.hot, align: 'left', halo: true });
      // history points
      circle(ctx, sx(315), sy(1e-9 + 100 * (1 - Math.sqrt(tc / (315 + K)))), 0, null);
      line(ctx, sx(315), box.b, sx(315), box.b - 8, C.ink3, 1.5);
      text(ctx, '1920s ≈315°', sx(315), box.b - 12, { size: 10.5, color: C.ink3, align: 'center' });
      circle(ctx, sx(540), sy(35), 4.5, C.coal, '#fff', 1.5);
      text(ctx, '1970s US subcritical ≈35%', sx(540) - 8, sy(35) + 4, { size: 10.5, color: C.coal, align: 'right', halo: true });
      circle(ctx, sx(610), sy(45), 4.5, C.coal, '#fff', 1.5);
      text(ctx, 'modern ultra-supercritical >45%', sx(610) - 8, sy(45) - 10, { size: 10.5, color: C.coal, align: 'right', halo: true });
      // marker
      const e = eff();
      line(ctx, sx(st.Th), box.t, sx(st.Th), box.b, alpha(C.hot, 0.35), 1);
      circle(ctx, sx(st.Th), sy(e.carnot), 5, '#fff', C.ink2, 2);
      circle(ctx, sx(st.Th), sy(e.ca), 6, C.hot, '#fff', 2);
    },
  });
  function eff() { const tc = st.Tc + K, th = st.Th + K; return { carnot: 100 * (1 - tc / th), ca: 100 * (1 - Math.sqrt(tc / th)) }; }
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => { const e = eff(); ro.innerHTML = `Carnot ceiling <b>${e.carnot.toFixed(0)}%</b>; a realistic plant gets closer to <b>${e.ca.toFixed(0)}%</b> — so each MWh of electricity costs about <b>${(100 / e.ca).toFixed(1)} MWh</b> of fuel heat.`; fig.invalidate(); };
  slider(ctl, { label: 'Steam temperature', min: 150, max: 700, step: 5, value: st.Th, color: C.hot, fmt: v => v + ' °C', oninput: v => { st.Th = v; upd(); }, name: 'th' });
  slider(ctl, { label: 'Cooling water', min: 5, max: 50, step: 1, value: st.Tc, color: C.cold, fmt: v => v + ' °C', oninput: v => { st.Tc = v; upd(); } });
  upd();
}

// ---------------------------------------------------------------------------
// F8: Wind — v³ and the power curve
// ---------------------------------------------------------------------------
export function windPower(el) {
  const rho = 1.225, D = 130, A = Math.PI * D * D / 4, RATED = 4.0, CP = 0.45;
  const P = v => (v < 3 || v > 25) ? 0 : Math.min(RATED, 0.5 * rho * A * v * v * v * CP / 1e6);
  const Pw = v => 0.5 * rho * A * v * v * v / 1e6;
  const st = { v: 9, rot: 0, streaks: Array.from({ length: 40 }, () => [Math.random(), Math.random()]) };
  const fig = new Fig(el, {
    label: 'A wind turbine beside its power curve: output rises with the cube of wind speed until it hits its rated power',
    height: w => w < 600 ? 620 : Math.max(320, Math.min(400, w * 0.46)),
    animated: true,
    step(dt) {
      const omega = st.v < 3 || st.v > 25 ? 0 : Math.min(st.v, 11) * 0.11;
      st.rot += omega * dt * 2;
      for (const s of st.streaks) { s[0] += dt * st.v * 0.035; if (s[0] > 1) { s[0] -= 1; s[1] = Math.random(); } }
    },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const S = narrow ? { x: 0, y: 0, w, h: 300 } : { x: 0, y: 0, w: w * 0.4, h };
      // streaks
      for (const [sx0, sy0] of st.streaks) {
        const xx = S.x + sx0 * S.w, yy = S.y + 20 + sy0 * (S.h - 70);
        line(ctx, xx, yy, xx + 10 + st.v * 1.6, yy, alpha(C.wind, 0.35), 1.5);
      }
      // tower
      const hx = S.x + S.w * 0.5, hy = S.y + S.h * 0.38, bl = Math.min(S.h * 0.32, S.w * 0.36);
      ctx.beginPath(); ctx.moveTo(hx - 4, hy); ctx.lineTo(hx + 4, hy); ctx.lineTo(hx + 8, S.y + S.h - 22); ctx.lineTo(hx - 8, S.y + S.h - 22); ctx.closePath();
      ctx.fillStyle = '#e8e3da'; ctx.fill(); ctx.strokeStyle = '#cfc7b8'; ctx.stroke();
      line(ctx, S.x + 10, S.y + S.h - 22, S.x + S.w - 10, S.y + S.h - 22, C.grid2, 1.5);
      for (let k = 0; k < 3; k++) {
        const a = st.rot + k * 2 * Math.PI / 3;
        ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
        ctx.beginPath(); ctx.moveTo(0, -4); ctx.quadraticCurveTo(bl * 0.25, -9, bl, -1.5); ctx.lineTo(bl, 1.5); ctx.quadraticCurveTo(bl * 0.3, 6, 0, 4); ctx.closePath();
        ctx.fillStyle = '#f7f5f0'; ctx.fill(); ctx.strokeStyle = '#bdb4a3'; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      }
      circle(ctx, hx, hy, 7, '#efebe3', '#bdb4a3', 1);
      text(ctx, '130 m rotor', hx, S.y + S.h - 6, { size: 11, color: C.ink3, align: 'center' });
      // chart
      const box = narrow ? { l: 52, r: w - 20, t: S.h + 40, b: h - 40 } : { l: S.w + 60, r: w - 20, t: 32, b: h - 42 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 28, y0: 0, y1: 10, xticks: [0, 5, 10, 15, 20, 25], yticks: [0, 2, 4, 6, 8, 10], xfmt: v => v, yfmt: v => v + ' MW', ylabel: 'power', xlabel: 'wind speed, m/s' });
      const pw = [], pb = [], pc = [];
      for (let v = 0; v <= 28; v += 0.1) { pw.push([sx(v), sy(Math.min(11, Pw(v)))]); pb.push([sx(v), sy(Math.min(11, Pw(v) * 16 / 27))]); pc.push([sx(v), sy(P(v))]); }
      ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 4, box.r - box.l, box.b - box.t + 4); ctx.clip();
      pathLine(ctx, pw, C.ink3, 1.5, [5, 4]);
      pathLine(ctx, pb, alpha(C.wind, 0.6), 1.5, [2, 3]);
      ctx.beginPath(); ctx.moveTo(sx(0), sy(0)); pc.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(sx(28), sy(0)); ctx.closePath(); ctx.fillStyle = alpha(C.wind, 0.14); ctx.fill();
      pathLine(ctx, pc, C.wind, 2.5);
      ctx.restore();
      text(ctx, 'power in the wind ∝ v³', sx(7.4), sy(9.2), { size: 11, color: C.ink3, align: 'right', halo: true });
      text(ctx, 'Betz limit (59%)', sx(9.6), sy(6.6), { size: 11, color: C.wind, align: 'left', halo: true });
      text(ctx, 'turbine output', sx(19), sy(RATED) - 8, { size: 11.5, color: C.wind, weight: 600, align: 'center' });
      text(ctx, 'cut-out', sx(25) + 6, sy(RATED * 0.25), { size: 10.5, color: C.ink3, align: 'left', halo: true });
      line(ctx, sx(st.v), box.t, sx(st.v), box.b, alpha(C.wind, 0.35), 1);
      circle(ctx, sx(st.v), sy(Math.min(10.4, Pw(st.v))), 4, '#fff', C.ink3, 1.5);
      circle(ctx, sx(st.v), sy(P(st.v)), 6, C.wind, '#fff', 2);
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => {
    const pw = Pw(st.v), p = P(st.v);
    ro.innerHTML = `The wind crossing the rotor carries <b>${pw.toFixed(1)} MW</b>; the turbine delivers <b>${p.toFixed(2)} MW</b>${st.v > 25 ? ' — it has feathered its blades to protect itself' : st.v < 3 ? ' — too little wind to bother' : p >= RATED - 1e-6 ? ' — capped at its rated power' : ''}.`;
    fig.invalidate();
  };
  slider(ctl, { label: 'Wind speed', min: 0, max: 28, step: 0.5, value: st.v, color: C.wind, fmt: v => v.toFixed(1) + ' m/s', oninput: v => { st.v = v; upd(); }, name: 'v' });
  upd();
}

// ---------------------------------------------------------------------------
// F8b: Betz streamtube
// ---------------------------------------------------------------------------
export function betz(el) {
  const st = { a: 0.2, s: 0 };
  const P = Array.from({ length: 70 }, (_, i) => ({ u: Math.random(), r: (i % 14) / 13 * 2 - 1, inside: i < 56 }));
  const fig = new Fig(el, {
    label: 'A stream tube of air slowing down and widening as it passes a turbine rotor, with the fraction of power extracted',
    height: w => w < 600 ? 560 : Math.max(260, Math.min(320, w * 0.36)),
    animated: true,
    step(dt) { for (const p of P) { p.u += dt * 0.12 * speedAt(p.u, p.inside); if (p.u > 1) { p.u -= 1; } } },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const S = narrow ? { x: 10, y: 10, w: w - 20, h: 260 } : { x: 10, y: 10, w: w * 0.62, h: h - 20 };
      const cx = S.x + S.w * 0.5, cy = S.y + S.h / 2, Rd = S.h * 0.25;
      const a = st.a;
      const ru = Rd * Math.sqrt(1 - a), rw = Rd * Math.sqrt((1 - a) / Math.max(0.02, 1 - 2 * a));
      const rad = u => Rd * Math.sqrt((1 - a) / Math.max(0.03, speedAt(u, true)));
      const X = u => S.x + u * S.w;
      // tube
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) { const u = i / 100; ctx.lineTo(X(u), cy - rad(u)); }
      for (let i = 100; i >= 0; i--) { const u = i / 100; ctx.lineTo(X(u), cy + rad(u)); }
      ctx.closePath(); ctx.fillStyle = alpha(C.wind, 0.1); ctx.fill(); ctx.strokeStyle = alpha(C.wind, 0.5); ctx.lineWidth = 1.2; ctx.stroke();
      // particles
      for (const p of P) {
        const y = p.inside ? cy + p.r * rad(p.u) * 0.92 : cy + Math.sign(p.r || 1) * (Rd * 1.6 + Math.abs(p.r) * S.h * 0.15);
        const sp = speedAt(p.u, p.inside);
        line(ctx, X(p.u) - 10 * sp, y, X(p.u), y, alpha(C.wind, p.inside ? 0.9 : 0.35), 2);
      }
      // rotor disc
      rrect(ctx, cx - 4, cy - Rd, 8, 2 * Rd, 4); ctx.fillStyle = alpha(C.ink2, 0.75); ctx.fill();
      text(ctx, 'rotor', cx, cy - Rd - 8, { size: 11.5, color: C.ink2, align: 'center', weight: 550 });
      text(ctx, 'wind in: v', S.x + 4, cy - ru - 10, { size: 11, color: C.ink3 });
      text(ctx, 'wake: ' + (1 - 2 * a).toFixed(2) + ' v', S.x + S.w - 4, Math.max(S.y + 14, cy - rw - 10), { size: 11, color: C.ink3, align: 'right', halo: true });
      // chart Cp(a)
      const box = narrow ? { l: 50, r: w - 20, t: S.h + 50, b: h - 40 } : { l: S.x + S.w + 56, r: w - 16, t: 30, b: h - 42 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 0.5, y0: 0, y1: 0.65, xticks: [0, 0.1, 0.2, 0.3, 0.4, 0.5], yticks: [0, 0.2, 0.4, 0.6], xfmt: v => Math.round(v * 100) + '%', yfmt: v => Math.round(v * 100) + '%', ylabel: 'share of wind power captured', xlabel: 'slow-down at rotor' });
      const pts = []; for (let x = 0; x <= 0.5; x += 0.005) pts.push([sx(x), sy(4 * x * (1 - x) * (1 - x))]);
      pathLine(ctx, pts, C.wind, 2.4);
      line(ctx, box.l, sy(16 / 27), box.r, sy(16 / 27), C.ink3, 1, [4, 4]);
      text(ctx, 'Betz: 16/27 ≈ 59.3%', box.r, sy(16 / 27) - 6, { size: 11, color: C.ink3, align: 'right' });
      circle(ctx, sx(a), sy(4 * a * (1 - a) * (1 - a)), 6, C.wind, '#fff', 2);
    },
  });
  function speedAt(u, inside) { if (!inside) return 1; const x = (u - 0.5) * 6; return 1 - st.a * (1 + Math.tanh(x * 0.9)); }
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => { const cp = 4 * st.a * (1 - st.a) ** 2; ro.innerHTML = `Slowing the air by ${(st.a * 100).toFixed(0)}% at the rotor captures <b>${(cp * 100).toFixed(1)}%</b> of the wind’s power. Brake it harder and air simply goes around.`; fig.invalidate(); };
  slider(ctl, { label: 'How hard the rotor brakes the air', min: 0, max: 0.48, step: 0.005, value: st.a, color: C.wind, fmt: v => (v * 100).toFixed(0) + '%', oninput: v => { st.a = v; upd(); } });
  upd();
}

// ---------------------------------------------------------------------------
// F9: Solar day — sun path, panel output, capacity factor (idealised clear-sky model)
// ---------------------------------------------------------------------------
let LAT = 52.5 * Math.PI / 180, TILT = 35 * Math.PI / 180, LOCNAME = 'Berlin, 52.5° N';
const LOCS = [['Berlin', 52.5], ['Delhi', 28.6], ['Lahore', 31.5], ['Riyadh', 24.7], ['Houston', 29.8], ['Nairobi', -1.3], ['Atacama', -22.5], ['Sydney', -33.9]];
function setLoc(name, lat) { LAT = lat * Math.PI / 180; const t = Math.max(5, Math.min(35, Math.abs(lat) * 0.75)); TILT = Math.sign(lat || 1) * t * Math.PI / 180; LOCNAME = `${name}, ${Math.abs(lat)}° ${lat >= 0 ? 'N' : 'S'}`; }
function sunAt(day, hour) {
  const dec = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (284 + day) / 365);
  const H = (hour - 12) * 15 * Math.PI / 180;
  const sinEl = Math.sin(LAT) * Math.sin(dec) + Math.cos(LAT) * Math.cos(dec) * Math.cos(H);
  const el = Math.asin(sinEl);
  const cosI = Math.sin(dec) * Math.sin(LAT - TILT) + Math.cos(dec) * Math.cos(LAT - TILT) * Math.cos(H);
  let out = 0;
  if (el > 0.01) {
    const am = 1 / Math.max(0.05, sinEl);
    const dni = 1353 * Math.pow(0.7, Math.pow(am, 0.678));
    const dif = 0.1 * dni;
    out = (dni * Math.max(0, cosI) + dif * (1 + Math.cos(TILT)) / 2) / 1000 * 0.85;
  }
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(LAT) - Math.tan(dec) * Math.cos(LAT));
  return { el, az, out: Math.min(1.05, out), H };
}
function dayYield(day, cloud) { let s = 0; for (let t = 0; t < 24; t += 0.25) s += sunAt(day, t).out * 0.25; return s * (1 - 0.72 * cloud); }
export function solarDay(el) {
  const st = { hour: 13, day: 172, cloud: 0.0, cfYear: 0 };
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fig = new Fig(el, {
    label: 'The sun crossing the sky over a solar panel at a chosen location, with the panel output through the day',
    height: w => w < 600 ? 600 : Math.max(330, Math.min(400, w * 0.46)),
    draw(ctx, w, h) {
      const narrow = w < 600;
      const S = narrow ? { x: 0, y: 0, w, h: 280 } : { x: 0, y: 0, w: w * 0.46, h };
      const s = sunAt(st.day, st.hour);
      const hz = S.y + S.h * 0.72;
      const elN = clamp(s.el / (Math.PI / 3), -0.3, 1);
      // sky
      const sky = ctx.createLinearGradient(0, S.y, 0, hz);
      const dayC = mix('#cfdbe6', '#a9c8e3', clamp(elN, 0, 1)), dusk = '#e9d6c6';
      sky.addColorStop(0, elN > 0 ? dayC : '#c8cbd6'); sky.addColorStop(1, elN > 0.15 ? lighten(dayC, 0.5) : dusk);
      rrect(ctx, S.x + 8, S.y + 8, S.w - 16, hz - S.y - 8, 12); ctx.fillStyle = sky; ctx.fill();
      // sun path for the day
      const cx = S.x + S.w / 2, R = Math.min(S.w * 0.42, (hz - S.y) * 0.95);
      const flip = LAT < 0 ? -1 : 1, proj = (el, az) => [cx + flip * Math.sin(az) * Math.cos(el) * R, hz - Math.sin(el) * R];
      ctx.save(); ctx.beginPath(); ctx.rect(S.x + 8, S.y + 8, S.w - 16, hz - S.y - 8); ctx.clip();
      ctx.beginPath(); let first = true;
      for (let t = 0; t <= 24; t += 0.1) { const p = sunAt(st.day, t); if (p.el < -0.05) { first = true; continue; } const [x, y] = proj(p.el, p.az); first ? ctx.moveTo(x, y) : ctx.lineTo(x, y); first = false; }
      ctx.strokeStyle = alpha('#ffffff', 0.9); ctx.setLineDash([3, 5]); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
      if (s.el > -0.05) {
        const [x, y] = proj(s.el, s.az);
        const rg = ctx.createRadialGradient(x, y, 2, x, y, 40); rg.addColorStop(0, alpha('#ffe08a', 0.9)); rg.addColorStop(1, alpha('#ffe08a', 0));
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(x, y, 40, 0, 7); ctx.fill();
        circle(ctx, x, y, 11, '#ffd34d', '#f0b429', 1.5);
      }
      // clouds
      if (st.cloud > 0.02) {
        for (let k = 0; k < Math.round(st.cloud * 7); k++) {
          const x = S.x + 30 + ((k * 97) % (S.w - 60)), y = S.y + 30 + ((k * 53) % 70);
          ctx.fillStyle = alpha('#ffffff', 0.75);
          [[0, 0, 18], [16, 4, 14], [-16, 5, 13], [6, -8, 13]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(x + dx, y + dy, r, 0, 7); ctx.fill(); });
        }
      }
      ctx.restore();
      // ground + panel
      rrect(ctx, S.x + 8, hz, S.w - 16, S.y + S.h - hz - 8, 12); ctx.fillStyle = '#e6e0d2'; ctx.fill();
      const px = cx, py = hz + 4;
      ctx.save(); ctx.translate(px, py);
      line(ctx, 0, 0, 0, -10, C.ink3, 3);
      ctx.rotate(-Math.abs(TILT) * 0.9);
      const glint = clamp(s.out * (1 - 0.72 * st.cloud), 0, 1);
      rrect(ctx, -46, -16, 92, 10, 2); ctx.fillStyle = mix('#33475e', '#7fb0d8', glint * 0.8); ctx.fill();
      for (let k = 1; k < 6; k++) line(ctx, -46 + k * 15.3, -16, -46 + k * 15.3, -6, alpha('#ffffff', 0.35), 1);
      ctx.restore();
      text(ctx, LAT < 0 ? 'N' : 'S', cx, hz + 26, { size: 10.5, color: C.ink3, align: 'center' });
      text(ctx, LAT < 0 ? 'W' : 'E', S.x + 22, hz + 26, { size: 10.5, color: C.ink3 }); text(ctx, LAT < 0 ? 'E' : 'W', S.x + S.w - 22, hz + 26, { size: 10.5, color: C.ink3, align: 'right' });
      text(ctx, `${LOCNAME} · panel facing the equator, tilted ${Math.round(Math.abs(TILT) * 180 / Math.PI)}°`, cx, S.y + S.h - 16, { size: 10.5, color: C.ink3, align: 'center' });
      // chart
      const box = narrow ? { l: 52, r: w - 20, t: S.h + 36, b: h - 40 } : { l: S.w + 56, r: w - 18, t: 32, b: h - 42 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 24, y0: 0, y1: 1, xticks: [0, 4, 8, 12, 16, 20, 24], yticks: [0, 0.25, 0.5, 0.75, 1], xfmt: v => v + ':00', yfmt: v => Math.round(v * 100) + '%', ylabel: 'output, % of rated', xlabel: 'solar time' });
      const pts = []; for (let t = 0; t <= 24; t += 0.1) pts.push([sx(t), sy(sunAt(st.day, t).out * (1 - 0.72 * st.cloud))]);
      ctx.beginPath(); ctx.moveTo(sx(0), sy(0)); pts.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(sx(24), sy(0)); ctx.closePath(); ctx.fillStyle = alpha(C.solar, 0.22); ctx.fill();
      pathLine(ctx, pts, C.solar, 2.4);
      // reference: average needed for 100% CF
      const yd = dayYield(st.day, st.cloud);
      line(ctx, box.l, sy(yd / 24), box.r, sy(yd / 24), C.ink3, 1, [4, 4]);
      text(ctx, 'same energy spread flat: ' + Math.round(yd / 24 * 100) + '%', box.r, sy(yd / 24) - 6, { size: 11, color: C.ink3, align: 'right', halo: true });
      line(ctx, sx(st.hour), box.t, sx(st.hour), box.b, alpha(C.solar, 0.5), 1);
      circle(ctx, sx(st.hour), sy(s.out * (1 - 0.72 * st.cloud)), 6, C.solar, '#fff', 2);
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const yearCF = cloud => { let s = 0; for (let d = 1; d <= 365; d += 2) s += dayYield(d, cloud); return s * 2 / (365 * 24); };
  const upd = () => {
    const yd = dayYield(st.day, st.cloud);
    ro.innerHTML = `This day: <b>${yd.toFixed(1)} kWh per kW</b> of panels, a capacity factor of <b>${(yd / 24 * 100).toFixed(0)}%</b>. Over a whole year with this sky: about <b>${(yearCF(st.cloud) * 100).toFixed(0)}%</b>.`;
    fig.invalidate();
  };
  setLoc('Berlin', 52.5);
  segmented(ctl, { label: 'Location', options: LOCS.map(([n, l]) => ({ label: n, value: n, name: 'loc-' + n.toLowerCase() })), value: 'Berlin', onchange: v => { const L = LOCS.find(x => x[0] === v); setLoc(L[0], L[1]); upd(); } });
  slider(ctl, { label: 'Time of day', min: 0, max: 24, step: 0.1, value: st.hour, color: C.solar, fmt: v => `${Math.floor(v)}:${String(Math.round((v % 1) * 60) % 60).padStart(2, '0')}`, oninput: v => { st.hour = v; upd(); } });
  slider(ctl, { label: 'Day of year', min: 1, max: 365, step: 1, value: st.day, color: C.solar, fmt: v => { const d = new Date(2026, 0, v); return d.getDate() + ' ' + MONTHS[d.getMonth()]; }, oninput: v => { st.day = v; upd(); } });
  slider(ctl, { label: 'Cloudiness', min: 0, max: 1, step: 0.01, value: st.cloud, color: C.ink3, fmt: v => v < 0.05 ? 'clear' : Math.round(v * 100) + '%', oninput: v => { st.cloud = v; upd(); } });
  upd();
}
