import { C } from './colors.js';

export const FONT = '"Inter", "Helvetica Neue", Arial, sans-serif';

export function font(size, weight = 450) { return `${weight} ${size}px ${FONT}`; }

export function typo(s) { return String(s).replace(/([€$])-(?=\d)/g, '−$1').replace(/(^|[\s(\[/:=,])-(?=[\d.]|[€$]\d)/g, '$1−'); }

const PHONE_MIN = 11;
export const sizeFor = (ctx, size = 12, o = {}) => (!o.small && ctx.canvas && ctx.canvas.clientWidth && ctx.canvas.clientWidth < 600 && size < PHONE_MIN ? PHONE_MIN : size);

export function text(ctx, s, x, y, o = {}) {
  s = typo(s);
  ctx.save();
  o = { ...o, size: sizeFor(ctx, o.size || 12, o) };
  ctx.font = font(o.size, o.weight || 450);
  ctx.fillStyle = o.color || C.ink2;
  ctx.textAlign = o.align || 'left';
  ctx.textBaseline = o.baseline || 'alphabetic';
  // keep un-rotated labels inside the canvas: nudge horizontally, shrink if wider than the canvas
  if (!o.noclamp && ctx.canvas.clientWidth) {
    const t = ctx.getTransform(), d = ctx.canvas.__dpr || (ctx.canvas.width / ctx.canvas.clientWidth) || 1;
    if (t.b === 0 && t.c === 0 && t.a > 0) {
      const lo = (2 * d - t.e) / t.a, hi = ((ctx.canvas.clientWidth - 2) * d - t.e) / t.a;
      let W = ctx.measureText(s).width;
      if (W > hi - lo) { const k = (hi - lo) / W; ctx.font = font((o.size || 12) * k, o.weight || 450); W = ctx.measureText(s).width; }
      const a = ctx.textAlign, left = a === 'right' || a === 'end' ? x - W : a === 'center' ? x - W / 2 : x;
      if (left < lo) x += lo - left; else if (left + W > hi) x -= left + W - hi;
    }
  }
  if (o.halo) {
    ctx.lineWidth = o.halo === true ? 4 : o.halo;
    ctx.strokeStyle = o.haloColor || C.paper;
    ctx.lineJoin = 'round';
    ctx.strokeText(s, x, y);
  }
  ctx.fillText(s, x, y);
  if (globalThis.__AUDIT && ctx.canvas.__texts) {
    const m = ctx.measureText(s), t = ctx.getTransform(), d = ctx.canvas.__dpr || 1;
    const x0 = x - m.actualBoundingBoxLeft, x1 = x + m.actualBoundingBoxRight, y0 = y - m.actualBoundingBoxAscent, y1 = y + m.actualBoundingBoxDescent;
    const pts = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].map(([px, py]) => [(t.a * px + t.c * py + t.e) / d, (t.b * px + t.d * py + t.f) / d]);
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    ctx.canvas.__texts.push({ s: String(s), x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys), px: parseFloat(ctx.font.match(/([\d.]+)px/)[1]) * t.a / d });
  }
  ctx.restore();
}

export function measure(ctx, s, size = 12, weight = 450) {
  ctx.save(); ctx.font = font(sizeFor(ctx, size), weight); const w = ctx.measureText(s).width; ctx.restore(); return w;
}

export function rrect(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function line(ctx, x1, y1, x2, y2, color, w = 1, dash) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = w;
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

export function circle(ctx, x, y, r, fill, stroke, sw = 1) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = sw; ctx.stroke(); }
}

export function arrow(ctx, x1, y1, x2, y2, color, w = 1.5, head = 7) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * head * 0.6, y2 - Math.sin(a) * head * 0.6); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - Math.cos(a - 0.45) * head, y2 - Math.sin(a - 0.45) * head);
  ctx.lineTo(x2 - Math.cos(a + 0.45) * head, y2 - Math.sin(a + 0.45) * head);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const smooth = t => t * t * (3 - 2 * t);

/** Linear scale */
export function scale(d0, d1, r0, r1) {
  const f = v => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
  f.inv = p => d0 + (p - r0) / (r1 - r0) * (d1 - d0);
  return f;
}

export function niceTicks(min, max, n = 5) {
  const span = max - min;
  const step0 = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const err = step0 / mag;
  const step = (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1) * mag;
  const ticks = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) ticks.push(+v.toFixed(10));
  return ticks;
}

/**
 * Draws a light axis frame. Returns {sx, sy, box}.
 * o: {x0,x1,y0,y1, box:{l,t,r,b}, xticks, yticks, xfmt, yfmt, xlabel, ylabel, grid:true}
 */
export function axes(ctx, o) {
  const { l, t, r, b } = o.box;
  const sx = scale(o.x0, o.x1, l, r);
  const sy = scale(o.y0, o.y1, b, t);
  const xt = o.xticks || niceTicks(o.x0, o.x1, o.nx || 6);
  const yt = o.yticks || niceTicks(o.y0, o.y1, o.ny || 4);
  ctx.save();
  ctx.lineWidth = 1;
  for (const v of yt) {
    const y = Math.round(sy(v)) + 0.5;
    ctx.strokeStyle = v === 0 ? C.grid2 : C.grid;
    if (o.grid !== false || v === 0) { ctx.beginPath(); ctx.moveTo(l, y); ctx.lineTo(r, y); ctx.stroke(); }
    const ys = (o.yfmt || String)(v), yw = measure(ctx, ys, 11);
    text(ctx, ys, Math.max(l - 6, yw + 2), y + 4, { size: 11, align: 'right', color: C.ink3 });
  }
  for (const v of xt) {
    const x = sx(v);
    if (o.xgrid) { ctx.strokeStyle = C.grid; ctx.beginPath(); ctx.moveTo(Math.round(x) + .5, t); ctx.lineTo(Math.round(x) + .5, b); ctx.stroke(); }
    const xs = (o.xfmt || String)(v), xw = measure(ctx, xs, 11) / 2, cw = ctx.canvas.clientWidth || 1e9;
    text(ctx, xs, Math.min(Math.max(x, xw + 2), cw - xw - 2), b + 15, { size: 11, align: 'center', color: C.ink3 });
  }
  ctx.strokeStyle = C.grid2;
  ctx.beginPath(); ctx.moveTo(l, b + .5); ctx.lineTo(r, b + .5); ctx.stroke();
  if (o.ylabel) text(ctx, o.ylabel, l - 4, t - 10, { size: 11, color: C.ink3, weight: 500, align: o.ylabelAlign || 'left' });
  if (o.xlabel) text(ctx, o.xlabel, r, b + 30, { size: 11, color: C.ink3, align: 'right', weight: 500 });
  ctx.restore();
  return { sx, sy };
}

export function pathLine(ctx, pts, color, w = 2, dash) {
  if (!pts.length) return;
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath();
  pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.stroke();
  ctx.restore();
}

export function tag(ctx, s, x, y, o = {}) {
  const size = o.size || 11.5;
  const w = measure(ctx, s, size, o.weight || 550) + 12;
  const h = size + 9;
  let bx = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
  ctx.save();
  rrect(ctx, bx, y - h / 2, w, h, h / 2);
  ctx.fillStyle = o.bg || C.ink; ctx.fill();
  ctx.restore();
  text(ctx, s, bx + w / 2, y + size * 0.36, { size, weight: o.weight || 550, color: o.color || '#fff', align: 'center' });
  return w;
}

/** Ease a value toward a target, frame-rate independent. */
export function approach(cur, target, rate, dt) { return target + (cur - target) * Math.exp(-rate * dt); }
