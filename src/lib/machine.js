// Shared drawing vocabulary for the generator chain (main essay §2) and the windings figure (Part 3):
// the same rotor, stator slots, copper and phase colours everywhere, so each figure extends the last.
import { C, alpha, lighten } from './colors.js';
import { text, rrect, line, circle } from './draw.js';

export const COPPER = '#c98a55';
export const PH = [C.phaseA, C.phaseB, C.phaseC];
export const PH_NAME = ['A', 'B', 'C'];

/** Stator ring with coil slots. slots: [{ a (rad), col, e (signed voltage, -1..1) }] */
export function drawStator(ctx, cx, cy, R, slots) {
  circle(ctx, cx, cy, R + 18, '#e9e5dc', null);
  circle(ctx, cx, cy, R + 2, C.paper, null);
  ctx.save(); ctx.strokeStyle = '#cfc8ba'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R + 18, 0, 7); ctx.stroke(); ctx.restore();
  for (const s of slots) {
    const x = cx + Math.cos(s.a) * (R + 6), y = cy + Math.sin(s.a) * (R + 6);
    ctx.save(); ctx.translate(x, y); ctx.rotate(s.a);
    rrect(ctx, -8, -15, 16, 30, 5); ctx.fillStyle = s.col || COPPER; ctx.fill();
    ctx.restore();
    // current direction: dot = out of the page, cross = into it; brightness = size of the voltage
    const m = Math.abs(s.e || 0);
    if (m > 0.06) {
      circle(ctx, x, y, 6.5, '#fff');
      const c = alpha(C.ink, 0.35 + 0.65 * Math.min(1, m));
      if (s.e > 0) circle(ctx, x, y, 2.6, c);
      else { line(ctx, x - 3.5, y - 3.5, x + 3.5, y + 3.5, c, 2); line(ctx, x + 3.5, y - 3.5, x - 3.5, y + 3.5, c, 2); }
    }
  }
}

/** Rotor disc with 2p poles, N red and S blue, as in the Faraday figure's magnet. */
export function drawRotor(ctx, cx, cy, rr, ang, p = 1, grab = false) {
  for (let k = 0; k < 2 * p; k++) {
    const a0 = ang + (k - 0.5) * Math.PI / p, a1 = a0 + Math.PI / p;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, rr, a0, a1); ctx.closePath();
    const col = k % 2 === 0 ? C.north : C.south;
    const g = ctx.createRadialGradient(cx, cy, rr * 0.2, cx, cy, rr);
    g.addColorStop(0, lighten(col, 0.35)); g.addColorStop(1, col);
    ctx.fillStyle = g; ctx.fill();
    const am = (a0 + a1) / 2;
    text(ctx, k % 2 === 0 ? 'N' : 'S', cx + Math.cos(am) * rr * 0.68, cy + Math.sin(am) * rr * 0.68 + 4.5, { size: 13, color: '#fff', weight: 650, align: 'center' });
  }
  circle(ctx, cx, cy, rr * 0.16, '#ddd6c8', '#bfb6a5', 1);
  if (grab) { // a handle on the rim to grab and turn
    const hx = cx + Math.cos(ang) * rr * 0.92, hy = cy + Math.sin(ang) * rr * 0.92;
    circle(ctx, hx, hy, 9, '#fff', C.ink, 2); text(ctx, '⟳', hx, hy + 4, { size: 11, color: C.ink, align: 'center', weight: 700 });
  }
}

/** A small coil glyph (a winding) from (x0,y0) to (x1,y1), with n loops in colour col. */
export function drawCoil(ctx, x0, y0, x1, y1, col, n = 5, wdt = 9) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x0, y0);
  const lead = L * 0.14, body = L - 2 * lead;
  ctx.lineTo(x0 + ux * lead, y0 + uy * lead);
  for (let i = 0; i <= n * 16; i++) { const t = i / (n * 16), sp = lead + t * body, a = t * n * 2 * Math.PI; ctx.lineTo(x0 + ux * sp + nx * wdt * Math.sin(a), y0 + uy * sp + ny * wdt * Math.sin(a)); }
  ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore();
}

/** A transformer winding: n loops around a vertical core limb centred at x, between top and bot. */
export function drawWinding(ctx, x, top, bot, n, col, limbW) {
  for (let i = 0; i < n; i++) {
    const y = top + (bot - top) * (i + 0.5) / n;
    ctx.beginPath(); ctx.ellipse(x, y, limbW * 0.9, Math.max(1.5, (bot - top) / n * 0.32), 0, 0, Math.PI * 2);
    ctx.strokeStyle = col; ctx.lineWidth = n > 20 ? 1.4 : 2.6; ctx.stroke();
  }
}
