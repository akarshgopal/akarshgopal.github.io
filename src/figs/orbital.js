// Act 2 orbital figures beyond the shared ceiling/launch meters: radiator area vs temperature (Stefan–Boltzmann).
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line, circle, axes, clamp } from '../lib/draw.js';
import { controls, slider, readout, hint } from '../lib/ui.js';

const SIGMA = 5.670374419e-8; // W m⁻² K⁻⁴
const EPS = 0.9, VIEW = 0.85; // Turyshev-style derates
// net flux: the radiator also absorbs Earth's infrared and albedo, lumped into an effective sink temperature Ts
// (0 K ≈ deep space; Earth's effective emission temperature is ≈255 K, so a radiator that partly sees Earth sits at ~200–250 K: an illustrative bracket, not a published value; see orbital.html n4)
let Ts = 0;
const flux = T => EPS * VIEW * SIGMA * (T ** 4 - Ts ** 4); // W/m² one-sided net
const areaPerMW = (T, sides = 2) => 1e6 / (flux(T) * sides); // m² per MW IT (all waste heat)
const PV_KM2 = 100e9 / 196 / 1e6; // PV for 100 GW at 196 W/m² (Starlink-class, Forethought) ≈ 510 km²

export function radiatorT4(el) {
  let T = 320; // K
  Ts = 0;
  const ctl = controls(el);
  const fig = new Fig(el, {
    height: w => (w < 640 ? 360 : 320),
    label: 'Radiator area needed per megawatt of IT power in vacuum, against radiator temperature, from the Stefan–Boltzmann law',
    draw(ctx, w, h) {
      const n = w < 640, l = n ? 48 : 56, r = w - 16, t = 28, b = h - 36;
      const T0 = 280, T1 = 400;
      const a = axes(ctx, {
        box: { l, r, t, b }, x0: T0, x1: T1, y0: 0, y1: 3500,
        xticks: [280, 300, 320, 350, 380, 400],
        yticks: [0, 1000, 2000, 3000],
        xfmt: v => `${v}`, yfmt: v => v >= 1000 ? `${v / 1000}k` : String(v),
        xlabel: 'radiator temperature (K)', ylabel: 'm² of radiator per MW (two-sided)',
      });
      // curve
      ctx.save(); ctx.strokeStyle = C.heat; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let k = 0; k <= 80; k++) {
        const Tk = T0 + (T1 - T0) * k / 80, A = areaPerMW(Tk, 2);
        const x = a.sx(Tk), y = a.sy(clamp(A, 0, 3500));
        k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke(); ctx.restore();
      // one-sided ghost
      ctx.save(); ctx.strokeStyle = alpha(C.ink3, 0.7); ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath();
      for (let k = 0; k <= 80; k++) {
        const Tk = T0 + (T1 - T0) * k / 80, A = areaPerMW(Tk, 1);
        const x = a.sx(Tk), y = a.sy(clamp(A, 0, 3500));
        k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke(); ctx.restore();
      { // label the ghost where it is on-chart (a warm sink pins its left end at the top, under the axis title)
        let Tl = n ? 310 : 300; while (Tl < T1 - 30 && areaPerMW(Tl, 1) > 2800) Tl += 5;
        if (areaPerMW(Tl, 1) <= 2800) text(ctx, 'one-sided', a.sx(Tl), a.sy(areaPerMW(Tl, 1)) - (n ? 2 : 8), { size: n ? 10 : 10.5, color: C.ink3 }); }
      text(ctx, 'two-sided', a.sx(360), a.sy(clamp(areaPerMW(360, 2), 0, 3500)) - 8, { size: 10.5, color: C.heat, weight: 650 });
      // Anatomy on the object (desktop). Phone: formula lives in the live readout to avoid ylabel collision.
      if (!n) {
        // top-right corner, flush under the top of the plot: the curves are lowest at high T, so this stays clear of them
        const boxX = r - 228, boxY = t - 4;
        rrect(ctx, boxX, boxY, 222, 50, 6);
        ctx.fillStyle = alpha('#ffffff', 0.92); ctx.fill(); // alpha() needs 6-digit hex
        ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.stroke();
        text(ctx, 'q = ε · F · σ · (T⁴ − Tsink⁴)', boxX + 9, boxY + 16, { size: 12, weight: 700, color: C.ink });
        text(ctx, `ε=${EPS}  F=${VIEW}  σ=5.67×10⁻⁸  Tsink=${Ts} K`, boxX + 9, boxY + 31, { size: 10, color: C.ink2 });
        text(ctx, 'A = 1 MW / (q · sides)', boxX + 9, boxY + 44, { size: 10, color: C.ink2 });
      }
      // markers at 300 / 320 / 350 K
      [[300, '27 °C'], [320, '47 °C'], [350, '77 °C']].forEach(([Tk, lab]) => {
        const A = areaPerMW(Tk, 2);
        circle(ctx, a.sx(Tk), a.sy(clamp(A, 0, 3500)), 5, '#fff', C.ink, 2);
        if (!n) text(ctx, lab, a.sx(Tk), a.sy(clamp(A, 0, 3500)) + 16, { size: 10, align: 'center', color: C.ink2 });
      });
      const A = areaPerMW(T, 2);
      circle(ctx, a.sx(T), a.sy(clamp(A, 0, 3500)), 8, '#fff', C.heat, 3);
    },
  });
  slider(ctl, {
    label: 'Radiator temperature', name: 'T', min: 280, max: 400, step: 1, value: T, color: C.heat,
    fmt: v => `${v} K (${(v - 273).toFixed(0)} °C)`,
    oninput: v => { T = v; paint(); },
  });
  slider(ctl, {
    label: 'Sink temperature (Earth’s glow)', name: 'Ts', min: 0, max: 250, step: 10, value: Ts, color: C.ink3,
    fmt: v => (v ? `${v} K` : '0 K (deep space)'),
    oninput: v => { Ts = v; paint(); },
  });
  const ro = readout(el);
  function paint() {
    const q = flux(T), A2 = areaPerMW(T, 2), A1 = areaPerMW(T, 1);
    const km2 = A2 * 1e5 / 1e6; // m² per MW × 1e5 MW (100 GW) → km²
    ro.innerHTML = `At <b>${T} K</b> (${(T - 273).toFixed(0)} °C) against a ${Ts} K sink, net flux ≈ <b>${Math.round(q)} W/m²</b> (ε=${EPS}, view=${VIEW}). Two-sided radiator: <b>${Math.round(A2).toLocaleString('en-GB')} m²/MW</b> (one-sided ${Math.round(A1).toLocaleString('en-GB')}). At 100 GW that is <b>${km2.toFixed(0)} km²</b>, against ≈${Math.round(PV_KM2)} km² of solar panel: the panels are <b>${(PV_KM2 / km2).toFixed(1)}×</b> the radiator. A ∝ 1/(T⁴ − Tsink⁴): hotter electronics shrink the radiator; a warm sink grows it.`;
    fig.invalidate();
  }
  hint(el, 'drag temperature up and watch area fall as the fourth power — the main radiator lever.');
  paint();
}
