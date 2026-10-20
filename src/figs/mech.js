// Fix 8: three mechanism figures that were described but never shown.
//  electrolyserCell — inside a water-splitting cell: drag the operating point along a polarisation curve — model
//  bladeElement     — one slice of a turbine blade: wind, blade speed, apparent wind, lift and angle of attack — model
//  lineField        — why a long AC wire has reactance: the field builds and collapses and pushes back — model
// Drag handles follow the phone rule in fig.js: touchHit is a small zone around the handle only, so swipes scroll.
import { Fig } from '../lib/fig.js';
import { C, alpha, darken, lighten } from '../lib/colors.js';
import { text, measure, line, circle, arrow, rrect, axes, pathLine, clamp, scale } from '../lib/draw.js';
import { controls, slider, segmented, readout, hint } from '../lib/ui.js';

const H2C = '#3d8fb8', O2C = '#d1495b', ELEC = '#d39a1c', HEAT = '#d94a2b';

/* ---------------- electrolyserCell ---------------- */
// Illustrative PEM-like polarisation curve: reversible 1.23 V + activation (Tafel-like) + ohmic.
export const cellV = j => 1.23 + 0.10 * Math.log10(1 + j / 0.002) + 0.2 * j;
const KWH_PER_KG_PER_V = 2 * 96485 / 2.016e-3 / 3.6e6; // 26.59 kWh/kg per volt (stack, DC)
const V_LHV = 33.33 / KWH_PER_KG_PER_V; // 1.25 V: the energy that ends up in the hydrogen (LHV)
const V_HHV = 39.41 / KWH_PER_KG_PER_V; // 1.48 V: thermoneutral
export function electrolyserCell(el) {
  el.__sim = {};
  const st = { j: 2.0 }; let geo = null; el.__sim.st = st;
  const bub = []; let acc = 0, ions = [];
  const lerpX = (a, b, u) => a + (b - a) * u;
  const fig = new Fig(el, {
    label: 'An electrolyser cell splitting water, with a polarisation curve of cell voltage against current density; drag the operating point',
    height: w => w < 600 ? 560 : 340, animated: true,
    step(dt) {
      acc += dt * st.j * 9;
      while (acc > 1) { acc -= 1; bub.push({ s: 'h', u: Math.random(), y: 1, r: 2 + Math.random() * 2.5 }); bub.push({ s: 'h', u: Math.random(), y: 1, r: 2 + Math.random() * 2.5 }); bub.push({ s: 'o', u: Math.random(), y: 1, r: 2.5 + Math.random() * 3 }); ions.push({ x: 0, y: 0.15 + Math.random() * 0.7 }); }
      for (const b of bub) b.y -= dt * (0.35 + b.r * 0.06);
      for (const p of ions) p.x += dt * 1.2;
      while (bub.length && bub[0].y < -0.05) bub.shift();
      ions = ions.filter(p => p.x < 1);
      if (bub.length > 400) bub.splice(0, bub.length - 400);
    },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const Cb = narrow ? { l: 30, r: w - 30, t: 46, b: 250 } : { l: 24, r: Math.min(330, w * 0.36), t: 56, b: h - 40 };
      const A = narrow ? { l: 52, r: w - 18, t: 310, b: h - 44 } : { l: Cb.r + 70, r: w - 24, t: 30, b: h - 44 };
      // --- the cell
      const cx0 = Cb.l + 20, cx1 = Cb.r - 20, cw = cx1 - cx0, ct = Cb.t + 18, cb = Cb.b;
      const ax = cx0 + cw * 0.18, kx = cx1 - cw * 0.18, mx = (cx0 + cx1) / 2;
      ctx.fillStyle = alpha('#9cc9e0', 0.22); rrect(ctx, cx0, ct, cw, cb - ct, 8); ctx.fill();
      ctx.strokeStyle = C.grid2; ctx.lineWidth = 1.2; rrect(ctx, cx0, ct, cw, cb - ct, 8); ctx.stroke();
      ctx.fillStyle = alpha(C.ink3, 0.35); ctx.fillRect(mx - 3, ct + 6, 6, cb - ct - 12);
      ctx.fillStyle = '#7d7a73'; ctx.fillRect(ax - 5, ct + 10, 10, cb - ct - 20); ctx.fillRect(kx - 5, ct + 10, 10, cb - ct - 20);
      // external circuit
      const yTop = Cb.t - 18;
      line(ctx, ax, ct + 10, ax, yTop, C.ink2, 1.5); line(ctx, kx, ct + 10, kx, yTop, C.ink2, 1.5); line(ctx, ax, yTop, kx, yTop, C.ink2, 1.5);
      ctx.fillStyle = C.paper; ctx.fillRect(mx - 34, yTop - 9, 68, 18); ctx.strokeStyle = C.ink2; ctx.strokeRect(mx - 34, yTop - 9, 68, 18);
      text(ctx, `${cellV(st.j).toFixed(2)} V DC`, mx, yTop + 4, { size: 10.5, weight: 700, color: C.ink, align: 'center' });
      const ph = (fig.t * st.j * 0.25) % 1;
      for (let i = 0; i < 6; i++) { const f = (i / 6 + ph) % 1, L = (yTop - ct) * 2 + (kx - ax), d = f * L; let x, y; if (d < ct + 10 - yTop) { x = ax; y = ct + 10 - d; } else if (d < ct + 10 - yTop + (kx - ax)) { x = ax + d - (ct + 10 - yTop); y = yTop; } else { x = kx; y = yTop + (d - (ct + 10 - yTop) - (kx - ax)); } circle(ctx, x, y, 2.6, C.electron); }
      text(ctx, 'anode +', ax, cb + 16, { size: 10.5, weight: 650, color: O2C, align: 'center' });
      text(ctx, 'cathode −', kx, cb + 16, { size: 10.5, weight: 650, color: H2C, align: 'center' });
      text(ctx, 'membrane', mx, cb + 16, { size: 10, color: C.ink3, align: 'center' });
      text(ctx, 'electrons', (ax + mx - 34) / 2, yTop - 5, { size: 9.5, color: C.electron, align: 'center' });
      // bubbles: oxygen rises from the anode (one per two water molecules), hydrogen from the cathode (two)
      for (const b of bub) {
        const x = b.s === 'o' ? lerpX(ax + 8, mx - 8, b.u) : lerpX(mx + 8, kx - 8, b.u), y = ct + 8 + b.y * (cb - ct - 16);
        circle(ctx, x, y, b.r, alpha(b.s === 'o' ? O2C : H2C, 0.35), alpha(b.s === 'o' ? O2C : H2C, 0.85), 1);
      }
      for (const p of ions) circle(ctx, mx - 10 + p.x * 20, ct + 10 + p.y * (cb - ct - 20), 2.2, ELEC);
      text(ctx, 'O₂', (ax + mx) / 2, ct - 4, { size: 11, weight: 700, color: O2C, align: 'center' });
      text(ctx, 'H₂', (kx + mx) / 2, ct - 4, { size: 11, weight: 700, color: H2C, align: 'center' });
      if (!narrow) text(ctx, 'H⁺ ions cross', mx, ct + 10 + 0, { size: 9.5, color: darken(ELEC, 0.3), align: 'center', halo: true }); if (0) text(ctx, '', mx, cb - 8, { size: 9.5, color: darken(ELEC, 0.3), align: 'center', halo: true });
      // --- the polarisation curve
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 3, y0: 1.0, y1: 2.4, xticks: [0, 0.5, 1, 1.5, 2, 2.5, 3], yticks: [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4], xfmt: v => v + '', yfmt: v => v.toFixed(1) + ' V', xlabel: 'current density, A/cm² (how hard the cell is driven)', ylabel: narrow ? 'cell voltage' : 'cell voltage: energy spent per electron' });
      const V = cellV(st.j), xj = sx(st.j);
      ctx.fillStyle = alpha(ELEC, 0.22); ctx.fillRect(A.l, sy(V_LHV), xj - A.l, A.b - sy(V_LHV));
      ctx.fillStyle = alpha(HEAT, 0.18); ctx.fillRect(A.l, sy(V), xj - A.l, sy(V_LHV) - sy(V));
      line(ctx, A.l, sy(1.23), A.r, sy(1.23), alpha(C.ink, 0.5), 1, [4, 3]);
      line(ctx, A.l, sy(V_HHV), A.r, sy(V_HHV), alpha(HEAT, 0.6), 1, [2, 3]);
      const pts = []; for (let j = 0.005; j <= 3; j += 0.02) pts.push([sx(j), sy(cellV(j))]);
      // threshold labels sit at the right edge unless the dashed operating-point line would cross them; then they move
      // beside it (left, then right), shortening if needed, clear of the curve and the "into the hydrogen" label
      const ihW = measure(ctx, 'into the hydrogen', 10, 650), keep = [[A.l + 2, A.b - 19, A.l + 10 + ihW, A.b - 4]];
      { const dw = measure(ctx, `${st.j.toFixed(1)} A/cm² · ${V.toFixed(2)} V`, 11, 700), fl = xj + 12 + dw > A.r; keep.push(fl ? [xj - 12 - dw, sy(V) - 23, xj - 12, sy(V) - 9] : [xj + 12, sy(V) + 9, xj + 12 + dw, sy(V) + 23]); }
      const thrLabel = (strs, b, color) => {
        let best = null;
        strs.forEach(s => { const lw = measure(ctx, s, 10); [A.r - 4 - lw, xj - 7 - lw, xj + 7].forEach(x => {
          const r = [x, b - 9, x + lw, b + 2];
          if (best || r[0] < A.l + 3 || r[2] > A.r - 2 || (xj > r[0] - 4 && xj < r[2] + 4)) return;
          if (keep.some(k => k[0] < r[2] + 3 && r[0] < k[2] + 3 && k[1] < r[3] && r[1] < k[3]) || pts.some(([px, py]) => px > r[0] - 2 && px < r[2] + 2 && py > r[1] - 2 && py < r[3] + 2)) return;
          best = [s, x, r];
        }); });
        if (!best) { const s = strs[strs.length - 1]; best = [s, A.r - 4 - measure(ctx, s, 10)]; }
        text(ctx, best[0], best[1], b, { size: 10, color, halo: true }); if (best[2]) keep.push(best[2]);
      };
      thrLabel(narrow ? ['1.23 V: the minimum', '1.23 V min'] : ['1.23 V: the least that can split water', '1.23 V: the minimum'], sy(1.23) + 13, C.ink2);
      thrLabel(narrow ? ['1.48 V: spare heat above', '1.48 V: heat'] : ['1.48 V: above this the cell gives off heat', '1.48 V: spare heat above'], sy(V_HHV) - 5, darken(HEAT, 0.1));
      pathLine(ctx, pts, C.ink, 2.2);
      text(ctx, 'into the hydrogen', A.l + 6, A.b - 8, { size: 10, weight: 650, color: darken(ELEC, 0.35), halo: true });
      // everything above 1.25 V is lost to the fuel (LHV basis); above 1.48 V the cell also gives off spare heat
      if (sy(V_LHV) - sy(V) > 14) text(ctx, 'lost', xj - 6, sy(V_LHV) - 6, { size: 10, weight: 650, color: HEAT, align: 'right', halo: true });
      line(ctx, xj, sy(V), xj, A.b, alpha(H2C, 0.6), 1, [3, 3]);
      circle(ctx, xj, sy(V), 9, alpha(H2C, 0.18)); circle(ctx, xj, sy(V), 6.5, H2C, '#fff', 2);
      // the curve rises to the right: label below-right of the dot, or above-left near the right edge, clear of the curve
      const lab = `${st.j.toFixed(1)} A/cm² · ${V.toFixed(2)} V`, lw = measure(ctx, lab, 11, 700), flip = xj + 12 + lw > A.r;
      text(ctx, lab, flip ? xj - 12 - lw : xj + 12, flip ? sy(V) - 12 : sy(V) + 20, { size: 11, weight: 700, color: darken(H2C, 0.25), halo: true });
      geo = { sx, sy, A, dot: [xj, sy(V)] };
    },
  });
  const setJ = x => { st.j = Math.round(clamp(geo.sx.inv ? geo.sx.inv(x) : (x - geo.A.l) / (geo.A.r - geo.A.l) * 3, 0.1, 3) * 20) / 20; js.set(st.j); upd(); };
  fig.interact({
    hit: (x, y) => geo && x >= geo.A.l - 6 && x <= geo.A.r + 6 && y >= geo.A.t - 10 && y <= geo.A.b + 6 ? 'j' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.dot[0], y - geo.dot[1]) < 26 ? 'j' : null,
    cursor: 'ew-resize', down: (o, x) => setJ(x), move: (o, x) => setJ(x),
  });
  const ctl = controls(el), ro = readout(el);
  const js = slider(ctl, { label: 'Current density', min: 0.1, max: 3, step: 0.05, value: st.j, color: H2C, fmt: v => `${v.toFixed(2)} A/cm²`, oninput: v => { st.j = v; upd(); }, name: 'j' });
  function upd() {
    const V = cellV(st.j), kwh = V * KWH_PER_KG_PER_V, eff = V_LHV / V, kgh = st.j * 1e4 / (2 * 96485) * 2.016e-3 * 3600;
    ro.innerHTML = `At <b>${st.j.toFixed(2)} A/cm²</b> the cell needs <b>${V.toFixed(2)} V</b>: <b>${kwh.toFixed(1)} kWh</b> of electricity per kilogram of hydrogen in the stack, of which ${Math.round(eff * 100)}% ends up in the hydrogen as usable fuel (its lower heating value) and the rest is lost. Each square metre of cell makes ${kgh.toFixed(2)} kg of hydrogen an hour. Drive it harder and the same equipment makes more hydrogen, but every kilogram takes more electricity.`;
    fig.invalidate();
  }
  upd();
  hint(el, 'drag the blue dot down to 0.5 A/cm²: each kilogram takes less electricity, but the same cell now makes a quarter as much.');
}

/* ---------------- bladeElement ---------------- */
// A 137 m rotor (the average new US turbine in 2024) at its design tip-speed ratio of 8 in a 10 m/s wind,
// with the Betz slowdown a = 1/3 at the rotor. Lift slope 2π per radian up to a 12° stall; design angle of attack 6°.
const R_ROT = 68.5, TSR = 8, A_IND = 1 / 3, ALPHA_D = 6, STALL = 12;
const phiAt = (x, v, om) => Math.atan2(v * (1 - A_IND), om * x * R_ROT) * 180 / Math.PI;
export function bladeElement(el) {
  el.__sim = {};
  const st = { x: 0.5, v: 10, twist: true }; let geo = null; el.__sim.st = st;
  const OM = TSR * 10 / R_ROT; // rad/s, fixed rotor speed (about 11 rpm)
  const theta = x => st.twist ? phiAt(x, 10, OM) - ALPHA_D : phiAt(1, 10, OM) - ALPHA_D; // blade pitch+twist, from the rotor plane
  const CL = a => a <= STALL ? 2 * Math.PI * a * Math.PI / 180 : Math.max(0.5, 2 * Math.PI * STALL * Math.PI / 180 - 0.06 * (a - STALL));
  const CD = a => a <= STALL ? 0.01 + 0.0006 * a * a : 0.1 + 0.03 * (a - STALL);
  const fig = new Fig(el, {
    label: 'One slice of a wind turbine blade: wind, blade speed, the apparent wind the blade feels, and the lift and angle of attack that result; drag along the blade',
    height: w => w < 600 ? 640 : 400, animated: true,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const Rb = narrow ? { cx: w / 2, cy: 150, R: 120 } : { cx: 150, cy: h / 2 + 6, R: 140 };
      // rotor seen from upwind: blades turn slowly; the handle rides on the upright blade
      const rot = fig.t * 0.25;
      circle(ctx, Rb.cx, Rb.cy, Rb.R, alpha(C.wind, 0.05), alpha(C.wind, 0.25), 1);
      for (let k = 0; k < 3; k++) {
        const a = -Math.PI / 2 + k * 2 * Math.PI / 3 + (k ? rot : 0);
        ctx.save(); ctx.translate(Rb.cx, Rb.cy); ctx.rotate(a);
        ctx.fillStyle = k ? alpha(C.ink3, 0.35) : alpha(C.ink2, 0.75);
        ctx.beginPath(); ctx.moveTo(8, -7); ctx.quadraticCurveTo(Rb.R * 0.25, -13, Rb.R, -2.5); ctx.lineTo(Rb.R, 2.5); ctx.quadraticCurveTo(Rb.R * 0.25, 9, 8, 7); ctx.closePath(); ctx.fill(); ctx.restore();
      }
      circle(ctx, Rb.cx, Rb.cy, 9, C.ink2);
      const hy = Rb.cy - st.x * Rb.R;
      line(ctx, Rb.cx - 22, hy, Rb.cx + 22, hy, C.wind, 2);
      circle(ctx, Rb.cx, hy, 10, alpha(C.wind, 0.2)); circle(ctx, Rb.cx, hy, 7, C.wind, '#fff', 2);
      text(ctx, `slice at ${Math.round(st.x * 100)}% of the blade (${Math.round(st.x * R_ROT)} m out)`, Rb.cx + 16, hy - 12, { size: 10.5, weight: 650, color: darken(C.wind, 0.3), halo: true });
      arrow(ctx, Rb.cx - Rb.R * 0.86, Rb.cy - Rb.R * 0.5, Rb.cx - Rb.R * 0.72, Rb.cy - Rb.R * 0.72, C.ink3, 1.4);
      text(ctx, 'rotation', Rb.cx - Rb.R * 0.86, Rb.cy - Rb.R * 0.5 + 14, { size: 10, color: C.ink3, align: 'center' });
      text(ctx, 'wind blows into the page', Rb.cx, Rb.cy + Rb.R + 18, { size: 10, color: C.ink3, align: 'center' });
      // the section, seen from the blade tip: wind left→right, blade moving down the screen
      const S = narrow ? { l: 12, r: w - 12, t: 300, b: h - 40 } : { l: 330, r: w - 16, t: 24, b: h - 44 };
      const ub = OM * st.x * R_ROT, va = st.v * (1 - A_IND), phi = Math.atan2(va, ub), phiD = phi * 180 / Math.PI;
      const th = theta(st.x), aoa = phiD - th, cl = CL(aoa), cd = CD(aoa), W = Math.hypot(ub, va);
      // left: velocity triangle, to scale
      const T = { l: S.l + 8, r: S.l + (S.r - S.l) * 0.36, t: S.t + 18, b: S.b - 8 };
      const k = (T.b - T.t - 30) / (OM * R_ROT);
      const tx = T.l + 30, ty = T.b - 10; // tail: the air arrives from the lower left
      text(ctx, 'velocities, to scale', T.l, S.t + 8, { size: 10.5, weight: 650, color: C.ink2 });
      arrow(ctx, tx, ty, tx + va * k, ty, C.wind, 2.4, 8);
      arrow(ctx, tx + va * k, ty, tx + va * k, ty - ub * k, C.ink3, 2.2, 8);
      arrow(ctx, tx, ty, tx + va * k, ty - ub * k, C.ink, 2.6, 9);
      text(ctx, `wind ${va.toFixed(1)} m/s`, tx, ty + 15, { size: 10, weight: 650, color: darken(C.wind, 0.25) });
      { const bx = tx + va * k + 7, by = Math.max(ty - ub * k * 0.3, ty - ub * k + 32); // phones: two lines, clear of the airflow arrows
        if (narrow) { text(ctx, 'blade speed', bx, by - 6, { size: 10, weight: 650, color: C.ink2, halo: true }); text(ctx, `${ub.toFixed(0)} m/s`, bx, by + 7, { size: 10, weight: 650, color: C.ink2, halo: true }); }
        else text(ctx, `blade speed ${ub.toFixed(0)} m/s`, bx, by, { size: 10, weight: 650, color: C.ink2, halo: true }); }
      text(ctx, `apparent wind`, tx + va * k + 7, ty - ub * k + 4, { size: 10.5, weight: 700, color: C.ink, halo: true });
      text(ctx, `${W.toFixed(0)} m/s, ${phiD.toFixed(0)}° off the plane`, tx + va * k + 7, ty - ub * k + 18, { size: 10, color: C.ink2, halo: true });
      // right: the airfoil in the apparent wind
      const ox = S.l + (S.r - S.l) * 0.68, oy = (S.t + S.b) / 2;
      line(ctx, ox, S.t + 6, ox, S.b, alpha(C.ink, 0.18), 1, [4, 4]);
      text(ctx, 'rotor plane', ox + 4, S.t + 14, { size: 9.5, color: C.ink3 });
      const ex = Math.sin(phi), ey = -Math.cos(phi); // unit along the apparent wind, on screen
      for (const o of [-46, -14, 18]) { const px = ox - ex * 80 - ey * o, py = oy - ey * 80 + ex * o; arrow(ctx, px - ex * 45, py - ey * 45, px + ex * 20, py + ey * 20, alpha(C.ink, 0.35), 1.4, 6); }
      const chord = Math.min(150, (S.b - S.t) * 0.55), thR = th * Math.PI / 180;
      ctx.save(); ctx.translate(ox, oy); ctx.rotate(thR - Math.PI / 2); ctx.translate(-chord * 0.3, 0);
      ctx.fillStyle = aoa > STALL ? alpha(HEAT, 0.6) : alpha(C.ink2, 0.85);
      const yt = u => 0.12 * chord * 5 * (0.2969 * Math.sqrt(u) - 0.126 * u - 0.3516 * u * u + 0.2843 * u ** 3 - 0.1015 * u ** 4);
      ctx.beginPath(); ctx.moveTo(0, 0);
      for (let i = 0; i <= 24; i++) { const u = i / 24; ctx.lineTo(u * chord, -yt(u) + 0.04 * chord * Math.sin(Math.PI * u)); }
      for (let i = 24; i >= 0; i--) { const u = i / 24; ctx.lineTo(u * chord, yt(u) + 0.04 * chord * Math.sin(Math.PI * u)); }
      ctx.closePath(); ctx.fill();
      line(ctx, -chord * 0.25, 0, chord * 1.25, 0, alpha(C.ink, 0.35), 1, [3, 3]);
      ctx.restore();
      const fs = 95 * clamp(W / 45, 0.6, 1.5);
      const Lx = -ey * cl * fs, Ly = ex * cl * fs, Dx = ex * cd * fs * 4, Dy = ey * cd * fs * 4;
      const drive = (cl * Math.sin(phi) - cd * Math.cos(phi)) * fs;
      arrow(ctx, ox, oy, ox + Lx, oy + Ly, C.storage, 3, 10);
      text(ctx, 'lift', ox + Lx + 6, oy + Ly - (drive > 3 ? 8 : -4), { size: 11, weight: 700, color: darken(C.storage, 0.2), halo: true });
      if (Math.hypot(Dx, Dy) > 8) { arrow(ctx, ox, oy, ox + Dx, oy + Dy, HEAT, 2.2, 8); text(ctx, 'drag', ox + Dx + 5, oy + Dy - 3, { size: 10.5, weight: 650, color: HEAT, halo: true }); }
      // the part of the lift along the blade's motion (down the screen) is what turns the rotor
      if (drive > 3) { arrow(ctx, ox + 28, oy, ox + 28, oy + drive, darken(C.storage, 0.35), 2, 7); text(ctx, 'turns the rotor', ox + 34, oy + drive + 13, { size: 10, weight: 650, color: darken(C.storage, 0.35), halo: true }); }
      const by = S.b + 18;
      text(ctx, `angle of attack ${aoa.toFixed(1)}°${aoa > STALL ? ' · STALLED' : aoa < 0 ? ' · pushing backwards' : ''}`, S.l + 8, by, { size: 11.5, weight: 700, color: aoa > STALL || aoa < 0 ? HEAT : C.ink });
      if (!narrow) text(ctx, `blade set ${th.toFixed(1)}° from the rotor plane`, S.l + 8 + 230, by, { size: 10, color: C.ink2 });
      geo = { Rb, hy, drive };
    },
  });
  const setX = y => { const g = geo.Rb; st.x = Math.round(clamp((g.cy - y) / g.R, 0.15, 1) * 100) / 100; xs.set(st.x); upd(); };
  fig.interact({
    hit: (x, y) => geo && Math.abs(x - geo.Rb.cx) < 30 && y < geo.Rb.cy + 6 && y > geo.Rb.cy - geo.Rb.R - 10 ? 'x' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.Rb.cx, y - geo.hy) < 26 ? 'x' : null,
    cursor: 'ns-resize', down: (o, x, y) => setX(y), move: (o, x, y) => setX(y),
  });
  const ctl = controls(el), ro = readout(el);
  const xs = slider(ctl, { label: 'Slice position along the blade', min: 0.15, max: 1, step: 0.01, value: st.x, color: C.wind, fmt: v => `${Math.round(v * 100)}%`, oninput: v => { st.x = v; upd(); }, name: 'x' });
  slider(ctl, { label: 'Wind speed (rotor speed fixed)', min: 4, max: 16, step: 0.5, value: st.v, color: C.wind, fmt: v => `${v} m/s`, oninput: v => { st.v = v; upd(); }, name: 'v' });
  segmented(ctl, { label: 'Blade', options: [{ label: 'Twisted', value: true, name: 'tw-on' }, { label: 'Flat, no twist', value: false, name: 'tw-off' }], value: st.twist, onchange: v => { st.twist = v; upd(); } });
  function upd() {
    const ub = OM * st.x * R_ROT, va = st.v * (1 - A_IND), phiD = Math.atan2(va, ub) * 180 / Math.PI, aoa = phiD - theta(st.x);
    const where = st.x > 0.85 ? 'Near the tip' : st.x < 0.35 ? 'Near the root' : 'Here';
    let s = `${where} the blade moves at <b>${ub.toFixed(0)} m/s</b>, ${(ub / va).toFixed(1)} times the wind reaching it, so it feels an apparent wind from <b>${phiD.toFixed(0)}°</b> off the rotor plane. `;
    s += aoa > STALL ? `At <b>${aoa.toFixed(0)}°</b> angle of attack the air can no longer follow the upper surface: the slice has <b>stalled</b>, lift collapses and drag soars.` : aoa < 0 ? `The angle of attack is negative: this slice pushes the wrong way.` : `At <b>${aoa.toFixed(1)}°</b> angle of attack the slice makes strong lift for little drag, and the lift leans into the direction of rotation: that lean is the torque.`;
    if (st.twist) s += ' The blade is twisted so every slice meets the air at about 6°.';
    ro.innerHTML = s; fig.invalidate();
  }
  upd();
  hint(el, 'pick <b>Flat, no twist</b> and drag the slice towards the hub: the angle of attack climbs until the root stalls.');
}

/* ---------------- lineField ---------------- */
// 380 kV single circuit: L ≈ 0.83 mH/km (X = 0.26 Ω/km at 50 Hz), R ≈ 0.026 Ω/km (as the powerAngle figure).
const L_KM = 0.26 / (2 * Math.PI * 50), R_KM = 0.026, I_PK = 1000;
export function lineField(el) {
  el.__sim = {};
  const st = { f: 50, km: 200 }; let geo = null; const hist = []; el.__sim.st = st;
  const fig = new Fig(el, {
    label: 'A long transmission line carrying alternating current: magnetic field rings grow and collapse around it and induce a voltage that opposes the change; drag the far end to change the length',
    height: w => w < 600 ? 420 : 380, animated: true,
    step(dt) { hist.push(fig.t); while (hist.length && fig.t - hist[0] > 4) hist.shift(); },
    draw(ctx, w, h) {
      const narrow = w < 600, ph = 2 * Math.PI * fig.t * 0.5; // displayed slowed to one cycle every two seconds
      const ac = st.f > 0, i = ac ? Math.sin(ph) : 0.8, didt = ac ? Math.cos(ph) : 0;
      const W = { l: narrow ? 26 : 70, r: w - (narrow ? 26 : 70), y: narrow ? 92 : 110 };
      const xEnd = W.l + (W.r - W.l) * (st.km / 600);
      // field rings around the wire, drawn as ellipses (the wire is seen from the side)
      const n = Math.max(2, Math.round((xEnd - W.l) / 46));
      for (let q = 0; q < n; q++) {
        const x = W.l + (q + 0.5) * (xEnd - W.l) / n;
        for (let r = 1; r <= 3; r++) {
          const rad = r * 14 * Math.abs(i) ** 0.6; if (rad < 2) continue;
          ctx.strokeStyle = alpha(C.field, (0.35 + 0.6 * Math.abs(i)) / Math.sqrt(r)); ctx.lineWidth = 1.8;
          ctx.beginPath(); ctx.ellipse(x, W.y, rad * 0.32, rad, 0, 0, Math.PI * 2); ctx.stroke();
        }
        // induced voltage arrow along the wire: proportional to −dI/dt (and to f)
        const e = -didt * Math.min(1, st.f / 60);
        if (Math.abs(e) > 0.06) arrow(ctx, x - e * 14, W.y + 52, x + e * 14, W.y + 52, C.phaseB, 2, 6);
      }
      line(ctx, W.l, W.y, xEnd, W.y, '#8a6a3a', 5);
      // charge dots drifting with the current
      for (let q = 0; q < 24; q++) { const u = ((q / 24) + (ac ? 0.04 * Math.sin(ph) : (fig.t * 0.05) % 1)) % 1; circle(ctx, W.l + u * (xEnd - W.l), W.y, 1.8, C.electron); }
      // ends: generator and load
      circle(ctx, W.l - 12, W.y, 11, C.paper, C.ink2, 1.5); text(ctx, ac ? '~' : '=', W.l - 12, W.y + 5, { size: 14, weight: 700, color: C.ink, align: 'center' });
      rrect(ctx, xEnd + 2, W.y - 12, 18, 24, 3); ctx.fillStyle = C.paper; ctx.fill(); ctx.strokeStyle = C.ink2; ctx.stroke();
      circle(ctx, xEnd + 11, W.y, 13, alpha(C.price, 0.12)); circle(ctx, xEnd + 11, W.y - 22, 7, C.price, '#fff', 2);
      text(ctx, `${st.km} km`, xEnd + 11, W.y - 34, { size: 11, weight: 700, color: C.price, align: 'center', halo: true });
      text(ctx, 'magnetic field', W.l + 8, W.y - 46, { size: 10.5, weight: 650, color: C.field });
      text(ctx, ac ? 'induced voltage, opposing the change' : 'steady current: the field is constant and induces nothing', W.l + 8, W.y + 76, { size: 10.5, weight: 650, color: ac ? darken(C.phaseB, 0.2) : C.ink3 });
      // traces
      const A = narrow ? { l: 30, r: w - 16, t: W.y + 128, b: h - 30 } : { l: 70, r: w - 24, t: W.y + 120, b: h - 30 };
      axes(ctx, { box: A, x0: 0, x1: 4, y0: -1.15, y1: 1.15, xticks: [], yticks: [0], yfmt: () => '0', grid: false });
      const pc = [], pe = [];
      for (let s = 0; s <= 200; s++) { const tt = fig.t - 4 + s / 50, p2 = 2 * Math.PI * tt * 0.5; pc.push([A.l + (A.r - A.l) * s / 200, (A.t + A.b) / 2 - (ac ? Math.sin(p2) : 0.8) * (A.b - A.t) / 2.7]); pe.push([A.l + (A.r - A.l) * s / 200, (A.t + A.b) / 2 + (ac ? Math.cos(p2) * Math.min(1, st.f / 60) : 0) * (A.b - A.t) / 2.7]); }
      pathLine(ctx, pc, C.electron, 2.2); pathLine(ctx, pe, C.phaseB, 2.2);
      // on a phone both labels sit above the traces, whose peaks reach almost to the top of the box
      text(ctx, 'current', A.l + 6, narrow ? A.t - 18 : A.t + 10, { size: 10.5, weight: 650, color: C.electron });
      text(ctx, narrow ? 'induced voltage: peaks a quarter-cycle off' : 'induced voltage: largest when the current changes fastest, a quarter-cycle off', narrow ? A.l + 6 : A.l + 70, narrow ? A.t - 4 : A.t + 10, { size: 10.5, weight: 650, color: darken(C.phaseB, 0.2) });
      text(ctx, 'time (slowed: one cycle every two seconds)', A.r, A.b + 16, { size: 10, color: C.ink3, align: 'right' });
      geo = { W, xEnd };
    },
  });
  const setKm = x => { const g = geo.W; st.km = Math.round(clamp((x - 11 - g.l) / (g.r - g.l) * 600, 10, 600) / 10) * 10; ks.set(st.km); upd(); };
  fig.interact({
    hit: (x, y) => geo && Math.abs(y - geo.W.y + 10) < 34 && x > geo.W.l + 20 ? 'km' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.xEnd - 11, y - geo.W.y + 22) < 26 ? 'km' : null,
    cursor: 'ew-resize', down: (o, x) => setKm(x), move: (o, x) => setKm(x),
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Supply', options: [{ label: 'DC', value: 0, name: 'f-dc' }, { label: '50 Hz', value: 50, name: 'f-50' }, { label: '60 Hz', value: 60, name: 'f-60' }], value: st.f, onchange: v => { st.f = v; upd(); } });
  const ks = slider(ctl, { label: 'Line length', min: 10, max: 600, step: 10, value: st.km, color: C.price, fmt: v => `${v} km`, oninput: v => { st.km = v; upd(); }, name: 'km' });
  function upd() {
    const X = 2 * Math.PI * st.f * L_KM * st.km, R = R_KM * st.km;
    ro.innerHTML = st.f ? `Over <b>${st.km} km</b> at ${st.f} Hz the line’s reactance is <b>${X.toFixed(0)} Ω</b>, against ${R.toFixed(1)} Ω of resistance. Carrying 1,000 A it pushes back with about <b>${(X * I_PK / 1000).toFixed(0)} kV</b>: no energy is lost, but the far end’s voltage slips behind the near end’s. Double the length, double the reactance.`
      : `With <b>direct current</b> the field is steady, nothing is induced and reactance is zero: only the ${R.toFixed(1)} Ω of resistance remains over ${st.km} km. That is the core of the case for <a class="xref" href="#hvdc">HVDC</a> over long distances.`;
    fig.invalidate();
  }
  upd();
  hint(el, 'switch to <b>DC</b>: the rings stop pulsing and the opposing voltage vanishes. Then drag the red end of the line out to 600 km on 50 Hz.');
}
