// Essay §7–11: drag the line -> perceptron, rolling downhill, a tiny network trained live, ImageNet, attention.
import { Fig, isPlaying, onPlayChange } from '../lib/fig.js';
import { C, alpha, lighten, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, measure, axes } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint, more } from '../lib/ui.js';
import { rng, gauss } from '../lib/rng.js';
import { MLP } from '../lib/nn.js';
import { MODELS } from '../lib/aidata.js';
import { sci, sig } from './chips.js';
import { TINYLM } from '../lib/tinylm.js';
import { INPHOTOS } from '../lib/imagenetphotos.js';

const narrow = w => w < 560;
// map data square [-1,1]^2 into a box
export function frame(w, h, pad = 14) { const cx = w / 2, cy = h / 2, ax = w / 2 - pad, ay = h / 2 - pad; return { X: x => cx + x * ax, Y: y => cy - y * ay, ix: px => (px - cx) / ax, iy: py => (cy - py) / ay }; }
export function dots(seed, n, f) { const r = rng(seed), out = []; while (out.length < n) { const x = r() * 1.9 - 0.95, y = r() * 1.9 - 0.95, c = f(x, y); if (c !== null) out.push({ x, y, c }); } return out; }

// ---------- 7. Drag the line, then let the perceptron do it ----------
export function dragLine(el) {
  const P = dots(11, 34, (x, y) => { const d = 0.9 * x - y + 0.15; return Math.abs(d) < 0.12 ? null : d > 0 ? 1 : 0; });
  let h1 = { x: -0.9, y: -0.55 }, h2 = { x: 0.9, y: -0.45 }, learning = false, upd = 0, tick = 0, flash = null, F;
  const coef = () => { const a = -(h2.y - h1.y), b = h2.x - h1.x, L = Math.hypot(a, b) || 1; return [a / L, b / L, -(a * h1.x + b * h1.y) / L]; };
  const side = (p, w = coef()) => w[0] * p.x + w[1] * p.y + w[2] > 0 ? 1 : 0;
  const wrong = () => P.filter(p => side(p) !== p.c);
  function setFrom(w) { const [a, b, c] = w, L = Math.hypot(a, b); const n = [a / L, b / L], c2 = c / L; const proj = q => { const d = n[0] * q.x + n[1] * q.y + c2; return { x: q.x - d * n[0], y: q.y - d * n[1] }; }; let p1 = proj(h1), p2 = proj(h2); if (Math.hypot(p1.x - p2.x, p1.y - p2.y) < 0.6) { const t = [-n[1], n[0]]; const m = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }; p1 = { x: m.x - t[0] * 0.6, y: m.y - t[1] * 0.6 }; p2 = { x: m.x + t[0] * 0.6, y: m.y + t[1] * 0.6 }; } h1 = clampP(p1); h2 = clampP(p2); }
  const clampP = p => ({ x: clamp(p.x, -1, 1), y: clamp(p.y, -1, 1) });
  function learnStep() { const W = wrong(); if (!W.length) { learning = false; flash = null; return; } const p = W[upd % W.length], t = p.c ? 1 : -1, w = coef(), lr = 0.35; flash = p; setFrom([w[0] + lr * t * p.x, w[1] + lr * t * p.y, w[2] + lr * t]); upd++; }
  const fig = new Fig(el, {
    height: w => narrow(w) ? Math.round(w * 0.92) : Math.round(Math.min(440, w * 0.5)), animated: true, label: 'Red and blue dots and a line you drag to separate them',
    step(dt) { if (!learning) return; tick += dt; if (tick > 0.35) { tick = 0; learnStep(); paint(); } },
    draw(ctx, w, h) {
      F = frame(w, h); const W = coef();
      // shaded half-planes
      const img = 22; for (let i = 0; i < img; i++) for (let j = 0; j < img; j++) { const x = -1 + (i + 0.5) * 2 / img, y = -1 + (j + 0.5) * 2 / img; ctx.fillStyle = alpha(side({ x, y }, W) ? C.classA : C.classB, 0.08); ctx.fillRect(F.X(x - 1 / img), F.Y(y + 1 / img), (w - 28) / img + 1, (h - 28) / img + 1); }
      // the line, extended across the box
      const dx = h2.x - h1.x, dy = h2.y - h1.y; ctx.save(); ctx.beginPath(); ctx.rect(14, 14, w - 28, h - 28); ctx.clip(); line(ctx, F.X(h1.x - dx * 3), F.Y(h1.y - dy * 3), F.X(h2.x + dx * 3), F.Y(h2.y + dy * 3), C.ink, 2.5); ctx.restore();
      for (const p of P) { const bad = side(p, W) !== p.c; circle(ctx, F.X(p.x), F.Y(p.y), 7, p.c ? C.classA : C.classB, bad ? C.ink : '#fff', bad ? 2.5 : 1.5); if (bad) { line(ctx, F.X(p.x) - 4, F.Y(p.y) - 4, F.X(p.x) + 4, F.Y(p.y) + 4, '#fff', 2); line(ctx, F.X(p.x) - 4, F.Y(p.y) + 4, F.X(p.x) + 4, F.Y(p.y) - 4, '#fff', 2); } }
      if (flash) circle(ctx, F.X(flash.x), F.Y(flash.y), 13, null, C.learn, 3);
      for (const q of [h1, h2]) circle(ctx, F.X(q.x), F.Y(q.y), 10, '#fff', C.ink, 3);
    },
  });
  fig.interact({ hit(x, y) { for (const q of [h1, h2]) if (Math.hypot(x - F.X(q.x), y - F.Y(q.y)) < 22) return q; return null; }, down() { learning = false; flash = null; }, move(q, x, y) { q.x = clamp(F.ix(x), -1, 1); q.y = clamp(F.iy(y), -1, 1); paint(); } });
  const ctl = controls(el);
  button(ctl, 'Let it learn', () => { upd = 0; if (isPlaying()) learning = true; else { for (let k = 0; k < 400 && wrong().length; k++) learnStep(); flash = null; } paint(); }, { kind: 'primary', name: 'dl-learn' });
  button(ctl, 'Scramble the line', () => { learning = false; flash = null; h1 = { x: -0.6, y: 0.8 }; h2 = { x: 0.7, y: -0.9 }; paint(); }, { name: 'dl-scramble' });
  const ro = readout(el);
  const paint = () => { const m = wrong().length; ro.innerHTML = m ? `<b>${m}</b> dot${m > 1 ? 's are' : ' is'} on the wrong side.${upd ? ` The machine has nudged the line <b>${upd}</b> times.` : ''}` : `Every dot is on the right side${upd ? `, after <b>${upd}</b> nudges, each one towards a dot it had got wrong` : ''}.`; fig.invalidate(); };
  hint(el, 'drag the two white handles until every red dot sits on the red side. Then scramble it and press “Let it learn”.');
  paint();
}

// ---------- 8. Rolling downhill ----------
import { Lf, Lg } from '../lib/valley.js';
export { Lf, Lg };
// The 3D surface (dist/three3d.js) replaces this top-down view; the 2D version stays as the fallback without WebGL.
export const UI3D = { C, controls, slider, button, readout, hint, isPlaying, onPlayChange };
export function lossValley(el) {
  try { if (window.AIX3D && window.AIX3D.lossSurface(el, { mode: 'single', ui: UI3D })) return; } catch (e) { console.warn('lossValley: 3D failed, using 2D', e); }
  lossValley2d(el);
}
function lossValley2d(el) {
  const X0 = -3, X1 = 3, Y0 = -1.6, Y1 = 1.6;
  let ball = { x: -2.4, y: 1.2 }, trail = [], lr = 0.25, rolling = true, tick = 0, steps = 0, field = null, fw = 0, R = {};
  const fig = new Fig(el, {
    height: w => narrow(w) ? 320 : Math.round(Math.min(400, w * 0.45)), animated: true, label: 'A loss landscape seen from above; a ball rolls downhill by gradient descent',
    onResize() { field = null; },
    step(dt) { if (!rolling) return; tick += dt; if (tick < 0.07) return; tick = 0; const g = Lg(ball.x, ball.y); ball = { x: ball.x - lr * g[0], y: ball.y - lr * g[1] }; steps++; trail.push(ball); if (trail.length > 400) trail.shift(); if (Math.hypot(...g) < 0.004 || steps > 600 || !isFinite(ball.x) || Math.abs(ball.y) > 50) rolling = false; paint(); },
    draw(ctx, w, h) {
      const sx = x => (x - X0) / (X1 - X0) * w, sy = y => h - (y - Y0) / (Y1 - Y0) * h; R = { sx, sy, ix: px => X0 + px / w * (X1 - X0), iy: py => Y0 + (h - py) / h * (Y1 - Y0) };
      if (!field || fw !== w) { const c = document.createElement('canvas'), gw = Math.ceil(w / 4), gh = Math.ceil(h / 4); c.width = gw; c.height = gh; const g = c.getContext('2d'), im = g.createImageData(gw, gh); for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) { const x = X0 + (i + 0.5) / gw * (X1 - X0), y = Y1 - (j + 0.5) / gh * (Y1 - Y0); const v = Math.log(1 + Lf(x, y)), band = Math.floor(v * 5) / 5, t = clamp(band / 2.4, 0, 1); const col = mix('#f5f1ff', '#5b3a8c', t); const k = (j * gw + i) * 4; im.data[k] = parseInt(col.slice(1, 3), 16); im.data[k + 1] = parseInt(col.slice(3, 5), 16); im.data[k + 2] = parseInt(col.slice(5, 7), 16); im.data[k + 3] = 255; } g.putImageData(im, 0, 0); field = c; fw = w; }
      ctx.imageSmoothingEnabled = true; ctx.drawImage(field, 0, 0, w, h);
      text(ctx, 'darker = higher error', 10, 18, { size: 11.5, color: '#fff', weight: 600, halo: 3, haloColor: alpha('#3a2560', 0.6) });
      circle(ctx, sx(1.2), sy(0.35 * Math.sin(1.7 * 1.2)), 5, null, '#fff', 2); text(ctx, 'lowest point', sx(1.2), sy(0.35 * Math.sin(2.04)) + 30, { size: 11.5, align: 'center', color: C.ink, weight: 650, halo: 3 }); // below, so the resting ball never covers it
      if (trail.length > 1) { ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); trail.forEach((p, i) => { const x = sx(clamp(p.x, -9, 9)), y = sy(clamp(p.y, -9, 9)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); ctx.restore(); }
      const bx = sx(clamp(ball.x, X0, X1)), by = sy(clamp(ball.y, Y0, Y1)), g = Lg(ball.x, ball.y), gl = Math.hypot(...g) || 1;
      if (isFinite(gl) && gl > 0.01) { const kx = w / (X1 - X0), ky = h / (Y1 - Y0), ux = -g[0] * kx, uy = g[1] * ky, ul = Math.hypot(ux, uy) || 1; arrow(ctx, bx, by, bx + ux / ul * 36, by + uy / ul * 36, '#fff', 2.5, 9); }
      circle(ctx, bx, by, 10, C.on, C.ink, 2.5);
    },
  });
  fig.interact({ hit: (x, y) => 'ball', down(k, x, y) { rolling = false; ball = { x: R.ix(x), y: R.iy(y) }; trail = [ball]; steps = 0; paint(); }, move(k, x, y) { ball = { x: clamp(R.ix(x), X0, X1), y: clamp(R.iy(y), Y0, Y1) }; trail = [ball]; paint(); }, up() { steps = 0; if (isPlaying()) rolling = true; else { for (let k = 0; k < 600; k++) { const g = Lg(ball.x, ball.y); ball = { x: ball.x - lr * g[0], y: ball.y - lr * g[1] }; trail.push(ball); steps++; if (Math.hypot(...g) < 0.004 || Math.abs(ball.y) > 50) break; } } paint(); }, touchHit: (x, y) => Math.hypot(x - R.sx(ball.x), y - R.sy(ball.y)) < 30 ? 'ball' : null });
  const ctl = controls(el);
  slider(ctl, { label: 'Step size', name: 'lr', min: 0.02, max: 0.75, step: 0.01, value: lr, color: C.learn, fmt: v => v.toFixed(2), oninput: v => { lr = v; trail = [ball]; steps = 0; rolling = isPlaying(); paint(); } });
  const ro = readout(el);
  const paint = () => { const L = Lf(ball.x, ball.y); const div = !isFinite(L) || L > 50; ro.innerHTML = div ? `The steps are so big the ball <b>flies out of the valley</b>: each step overshoots further than the last.` : `Error <b>${L.toFixed(3)}</b> after <b>${steps}</b> steps. The white arrow is the steepest way down from where the ball sits.`; fig.invalidate(); };
  hint(el, 'drop the ball anywhere (tap, or drag it on a phone). Then push the step size up until the ball starts to zigzag across the valley.');
  paint();
}

// ---------- 9. A tiny network, trained live ----------
export function tinyNet(el, o = {}) {
  const base = () => dots(o.seed || 5, o.n || 70, (x, y) => { const r = Math.hypot(x, y); return r < 0.42 ? 0 : r > 0.62 && r < 0.95 ? 1 : null; });
  let P = base(), H = o.H || 4, net = new MLP(H, 7), loss = 1, steps = 0, add = 1, F, field = null, fieldAt = -1;
  const G = 40, RGB = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const makeField = () => { // the network's opinion on a 40×40 grid, drawn as one small image instead of 1,600 rectangles
    field ??= Object.assign(document.createElement('canvas'), { width: G, height: G }); const g = field.getContext('2d'), im = g.createImageData(G, G), A = RGB(C.classA), B = RGB(C.classB);
    for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) { const p = net.predict(-1 + (i + 0.5) * 2 / G, 1 - (j + 0.5) * 2 / G), c = p > 0.5 ? A : B, a = 0.05 + 0.32 * Math.abs(p - 0.5) * 2, k = (j * G + i) * 4; im.data[k] = c[0]; im.data[k + 1] = c[1]; im.data[k + 2] = c[2]; im.data[k + 3] = Math.round(a * 255); }
    g.putImageData(im, 0, 0); fieldAt = steps; };
  const wake = () => { fig.opts.animated = true; fig.invalidate(); };
  const acc = () => P.filter(p => (net.predict(p.x, p.y) > 0.5 ? 1 : 0) === p.c).length / P.length;
  const fig = new Fig(el, {
    height: w => narrow(w) ? Math.round(w * 0.95) : Math.round(Math.min(440, w * 0.5)), animated: true, label: 'A small neural network learning to separate an inner ring of blue dots from an outer ring of red dots',
    step() { for (let k = 0; k < 4; k++) { loss = net.train(P, 0.6); steps++; } if (steps % 8 === 0) paint(); if (steps >= 6000 || (loss < 0.02 && acc() === 1)) { fig.opts.animated = false; paint(); } }, // settled: stop the loop, save the phone's battery
    draw(ctx, w, h) {
      F = frame(w, h);
      if (fieldAt !== steps || !field) makeField();
      ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(field, 14, 14, w - 28, h - 28); ctx.restore();
      // each hidden neuron is a line, like the one you dragged
      ctx.save(); ctx.beginPath(); ctx.rect(14, 14, w - 28, h - 28); ctx.clip();
      net.W1.forEach((wv, j) => { const [a, b] = wv, c = net.b1[j]; let pts; if (Math.abs(b) > Math.abs(a)) pts = [[-1.2, -(a * -1.2 + c) / b], [1.2, -(a * 1.2 + c) / b]]; else pts = [[-(b * -1.2 + c) / a, -1.2], [-(b * 1.2 + c) / a, 1.2]]; line(ctx, F.X(pts[0][0]), F.Y(pts[0][1]), F.X(pts[1][0]), F.Y(pts[1][1]), alpha(C.learn, 0.65), 1.5, [6, 5]); });
      ctx.restore();
      for (const p of P) circle(ctx, F.X(p.x), F.Y(p.y), 5.5, p.c ? C.classA : C.classB, '#fff', 1.4);
      text(ctx, `${H} hidden neuron${H > 1 ? 's' : ''} = ${H} dashed line${H > 1 ? 's' : ''}`, 20, h - 22, { size: 12, color: C.learn, weight: 650, halo: 3 });
    },
  });
  fig.interact({ cursor: 'crosshair', hit: () => 'add', touchHit: () => null, down(k, x, y) { const px = F.ix(x), py = F.iy(y); if (Math.abs(px) <= 1 && Math.abs(py) <= 1) { P.push({ x: px, y: py, c: add }); wake(); paint(); } } });
  el.querySelector('canvas').addEventListener('click', e => { if (e.pointerType === 'touch' || (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents)) { const r = e.target.getBoundingClientRect(); const px = F.ix(e.clientX - r.left), py = F.iy(e.clientY - r.top); if (Math.abs(px) <= 1 && Math.abs(py) <= 1) { P.push({ x: px, y: py, c: add }); wake(); paint(); } } });
  const ctl = controls(el);
  slider(ctl, { label: 'Hidden neurons', name: 'H', min: 1, max: 8, step: 1, value: H, color: C.learn, fmt: v => String(v), oninput: v => { H = v; net = new MLP(H, 7); steps = 0; wake(); if (!isPlaying()) for (let k = 0; k < 800; k++) loss = net.train(P, 0.6); paint(); } });
  segmented(ctl, { label: 'A tap adds', value: add, options: [{ label: 'red', value: 1, name: 'tn-red' }, { label: 'blue', value: 0, name: 'tn-blue' }], onchange: v => { add = v; } });
  button(ctl, 'Start over', () => { P = base(); net = new MLP(H, 7); steps = 0; wake(); if (!isPlaying()) for (let k = 0; k < 800; k++) loss = net.train(P, 0.6); paint(); }, { name: 'tn-reset' });
  const ro = readout(el);
  const paint = () => { ro.innerHTML = `After <b>${steps.toLocaleString('en-GB')}</b> nudges the network classifies <b>${Math.round(acc() * 100)}%</b> of the dots correctly (error ${loss.toFixed(3)}).${H < 3 ? ' With fewer than three lines it cannot fence in the inner ring.' : ''}`; fig.invalidate(); };
  if (!isPlaying()) for (let k = 0; k < 800; k++) loss = net.train(P, 0.6);
  hint(el, 'watch it learn, then tap to add dots and drag “hidden neurons” down to 2 and back up to 4.');
  paint();
}

// ---------- 10. ImageNet: 24 freely licensed photos, real guesses from three historic architectures ----------
// Contest numbers: winning entry's top-5 error on the ILSVRC test set (Russakovsky et al. 2015, and the 2016–17 results pages).
const ILSVRC = [[2010, 28.2, 'NEC–UIUC', null], [2011, 25.8, 'XRCE', null], [2012, 16.4, 'SuperVision (AlexNet)', 'AlexNet'], [2013, 11.7, 'Clarifai', null], [2014, 6.7, 'GoogLeNet', 'GoogLeNet / InceptionV1'], [2015, 3.57, 'ResNet (MSRA)', 'ResNet-152 (ImageNet)'], [2016, 2.99, 'Trimps-Soushen', null], [2017, 2.25, 'SENet', null]];
export function imagenet(el) {
  const PH = INPHOTOS.photos, MD = INPHOTOS.models;
  const imgs = PH.map(p => { const im = new Image(); im.onload = () => fig && fig.invalidate(); im.src = p.img; return im; });
  let k = 2, sel = 6, R = {}, fig = null;
  const mi = () => MD.findIndex(m => m.year === ILSVRC[k][0]); // which runnable model belongs to this year, or -1
  const ok = (p, m) => p.guess[m].some(g => g[0] === p.cls);
  const nice = s => s.replace(/^\w/, c => c.toUpperCase());
  fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round((w - 24) / 6 * 4) + 290 : 440), label: 'Twenty-four photos; for 2012, 2014 and 2015 each is marked by whether a real copy of that year’s winning design had the right label among its five guesses',
    draw(ctx, w, h) {
      const n = narrow(w), cols = 6, gw = n ? w - 24 : Math.min(w * 0.56, 560), cs = gw / cols, gx = 12, gy = 10, m = mi();
      R.cells = [];
      PH.forEach((p, i) => { const x = gx + (i % cols) * cs, y = gy + Math.floor(i / cols) * cs, s = cs - 4; R.cells.push([x, y, cs, i]);
        ctx.save(); rrect(ctx, x + 2, y + 2, s, s, 5); ctx.clip(); if (imgs[i].complete && imgs[i].naturalWidth) ctx.drawImage(imgs[i], x + 2, y + 2, s, s); else { ctx.fillStyle = C.grid; ctx.fill(); }
        if (m >= 0 && !ok(p, m)) { ctx.fillStyle = 'rgba(40,20,20,0.45)'; ctx.fillRect(x + 2, y + 2, s, s); }
        ctx.restore();
        if (m >= 0) { const g = ok(p, m), r = Math.max(7, s * 0.13); circle(ctx, x + s - r + 1, y + r + 3, r, g ? C.green : C.classA, '#fff', 1.5); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); const cx = x + s - r + 1, cy = y + r + 3, q = r * 0.45; if (g) { ctx.moveTo(cx - q, cy); ctx.lineTo(cx - q * 0.2, cy + q * 0.8); ctx.lineTo(cx + q, cy - q * 0.7); } else { ctx.moveTo(cx - q, cy - q); ctx.lineTo(cx + q, cy + q); ctx.moveTo(cx + q, cy - q); ctx.lineTo(cx - q, cy + q); } ctx.stroke(); }
        if (i === sel) { rrect(ctx, x + 0.5, y + 0.5, s + 3, s + 3, 6); ctx.strokeStyle = C.ink; ctx.lineWidth = 2.5; ctx.stroke(); } });
      // panel: the selected photo's five guesses from this year's model
      const px = n ? 12 : gx + gw + 28, pw = n ? w - 24 : w - px - 12, py = n ? gy + 4 * cs + 22 : 22, p = PH[sel];
      text(ctx, `True label: ${p.cls}`, px, py, { size: 13.5, weight: 700, color: C.ink });
      if (m >= 0) {
        text(ctx, `${MD[m].name}'s five guesses (a real run of torchvision's copy):`, px, py + 22, { size: 12, color: C.ink2 });
        const lx = px + Math.min(150, pw * 0.42), rx = px + pw - 46;
        p.guess[m].forEach(([lab, pr], j) => { const y = py + 36 + j * 25, hit = lab === p.cls, bw = Math.max(2, (rx - lx) * pr);
          text(ctx, lab.length > 20 ? lab.slice(0, 19) + '…' : lab, lx - 8, y + 14, { size: 12.5, align: 'right', weight: hit ? 750 : 500, color: hit ? C.green : C.ink });
          rrect(ctx, lx, y + 4, bw, 13, 3); ctx.fillStyle = hit ? C.green : alpha(C.ink3, 0.6); ctx.fill();
          text(ctx, pr >= 0.995 ? '>99%' : pr < 0.01 ? '<1%' : `${Math.round(pr * 100)}%`, lx + bw + 6, y + 15, { size: 11.5, color: C.ink2 }); });
      } else {
        text(ctx, `No runnable copy of ${ILSVRC[k][0]}’s winner exists in torchvision,`, px, py + 22, { size: 12, color: C.ink2 });
        text(ctx, 'so there are no per-photo guesses for this year.', px, py + 40, { size: 12, color: C.ink2 });
        text(ctx, 'Pick 2012, 2014 or 2015 to see real ones.', px, py + 58, { size: 12, color: C.ink2 });
      }
      // big numbers (desktop) or one line (phone)
      const tally = m >= 0 ? PH.filter(q => ok(q, m)).length : null;
      if (!n) { const ty = py + 196; text(ctx, `${ILSVRC[k][1]}%`, px, ty, { size: 38, weight: 750, color: C.classA }); text(ctx, `contest top-5 error, ${ILSVRC[k][0]} winner (${ILSVRC[k][2]})`, px, ty + 22, { size: 12, color: C.ink2 });
        if (tally != null) text(ctx, `on these 24 photos: ${tally} right, ${24 - tally} wrong`, px, ty + 42, { size: 12.5, weight: 650, color: C.ink }); }
      // year rail
      const rl = n ? 22 : px + 6, rr = w - 22, ry = h - 40, sx = i => rl + i / (ILSVRC.length - 1) * (rr - rl);
      line(ctx, rl, ry, rr, ry, C.grid2, 4);
      ILSVRC.forEach((e, i) => { const has = MD.some(q => q.year === e[0]); circle(ctx, sx(i), ry, i === k ? 11 : has ? 7 : 5, i === k ? C.ink : has ? alpha(C.green, 0.25) : '#fff', i === k ? C.ink : has ? C.green : C.ink3, 2); if (!n || i % 2 === 0 || i === k) text(ctx, String(e[0]), sx(i), ry + 26, { size: 11.5, align: 'center', color: i === k ? C.ink : C.ink3, weight: i === k ? 700 : 450 }); });
      if (n) text(ctx, `${ILSVRC[k][0]}: contest error ${ILSVRC[k][1]}%${tally != null ? ` · here ${tally}/24 right` : ''}`, w / 2, ry - 22, { size: 12.5, align: 'center', weight: 650, color: C.ink });
      R.sx = sx; R.ry = ry; R.rl = rl; R.rr = rr;
    },
  });
  const set = x => { k = clamp(Math.round((x - R.rl) / (R.rr - R.rl) * (ILSVRC.length - 1)), 0, ILSVRC.length - 1); paint(); };
  fig.interact({ panY: true, cursor: 'pointer',
    hit: (x, y) => { if (Math.abs(y - R.ry) < 28 && x > R.rl - 20 && x < R.rr + 20) return 'yr'; const c = (R.cells || []).find(([cx, cy, cs]) => x > cx && x < cx + cs && y > cy && y < cy + cs); return c ? 'p' + c[3] : null; },
    down(key, x) { if (key === 'yr') set(x); else { sel = +key.slice(1); paint(); } }, move(key, x) { if (key === 'yr') set(x); } });
  const ro = readout(el);
  // the selected photo's credit lives in the ⓘ data panel (all 24 credits are also in note 37)
  const cr = document.createElement('p'); cr.className = 'credit'; { const cap = el.querySelector('figcaption'); if (cap) cap.prepend(cr); }
  const paint = () => {
    const e = ILSVRC[k], m = mi(), md = e[3] && MODELS.find(r => r[2] === e[3]), p = PH[sel];
    const credit = `Photo: <a href="${p.url}">${p.title.replace(/\.jpg$/i, '')}</a>, ${p.author}, ${p.licence}.`;
    ro.innerHTML = `${e[0]}: the winner, ${e[2]}, missed <b>${e[1]}</b> in 100 contest photos.${md ? ` Training it took about <b>${sci(md[1])}</b> operations.` : ''}` +
      (m >= 0 ? ` Re-trained ${MD[m].name} ${ok(p, m) ? 'had' : 'missed'} “${p.cls}” in its top five${ok(p, m) && p.guess[m][0][0] !== p.cls ? ` (first guess “${p.guess[m][0][0]}”)` : ''}.` : '');
    cr.innerHTML = credit;
    fig.invalidate();
  };
  hint(el, 'drag along the years, and tap a photo to see what that year’s network guessed.');
  paint();
}

// ---------- 10b. Error against training compute ----------
// [label, year, contest top-5 error % (null: not entered), torchvision single-model val top-5 error % (null: no copy), Epoch AI model name]
const ERRC = [['AlexNet', 2012, 16.4, 20.93, 'AlexNet'], ['GoogLeNet', 2014, 6.67, 10.47, 'GoogLeNet / InceptionV1'], ['VGG-16', 2014, 7.32, 9.62, 'VGG16'], ['ResNet-152', 2015, 3.57, 5.95, 'ResNet-152 (ImageNet)'], ['ResNeXt-101', 2016, 3.03, null, 'ResNeXt-101 (64×4d)']];
export function imagenetCompute(el) {
  const pts = ERRC.map(([nm, yr, ce, te, ep]) => ({ nm, yr, ce, te, f: (MODELS.find(r => r[2] === ep) || [])[1] })).filter(p => p.f);
  let sel = 0, R = [];
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 340 : 330), label: 'Top-5 error against training compute for the networks that won or came second at ImageNet, as entered in the contest and as single re-trained copies',
    draw(ctx, w, h) {
      const n = narrow(w), L = n ? 44 : 60, Rm = 18, T = 18, B = h - 46, x0 = 17, x1 = 20, xs = v => L + (Math.log10(v) - x0) / (x1 - x0) * (w - L - Rm), ys = v => T + (1 - v / 24) * (B - T);
      for (let e = x0; e <= x1; e++) { const x = xs(10 ** e); line(ctx, x, T, x, B, C.grid, 1); text(ctx, `10${'⁰¹²³⁴⁵⁶⁷⁸⁹'[Math.floor(e / 10)]}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[e % 10]}`, x, B + 18, { size: 11.5, align: 'center', color: C.ink3 }); }
      for (let v = 0; v <= 20; v += 5) { const y = ys(v); line(ctx, L, y, w - Rm, y, C.grid, 1); text(ctx, `${v}%`, L - 6, y + 4, { size: 11, align: 'right', color: C.ink3 }); }
      text(ctx, 'operations to train one network (log scale)', (L + w - Rm) / 2, h - 8, { size: 11.5, align: 'center', color: C.ink2 });
      text(ctx, 'top-5 error', L + 4, T + 4, { size: 11, color: C.ink2 });
      const hy = ys(5.1); ctx.setLineDash([4, 4]); line(ctx, L, hy, w - Rm, hy, C.ink3, 1); ctx.setLineDash([]); text(ctx, 'one trained person, 5.1%', L + 6, hy - 5, { size: 10.5, color: C.ink3 });
      R = []; const labs = [];
      pts.forEach((p, i) => { const x = xs(p.f);
        if (p.te != null) { line(ctx, x, ys(p.ce), x, ys(p.te), alpha(C.ink3, 0.5), 1.5); circle(ctx, x, ys(p.te), i === sel ? 7 : 5, '#fff', C.learn, 2); R.push([x, ys(p.te), i]); }
        circle(ctx, x, ys(p.ce), i === sel ? 8 : 6, C.learn, i === sel ? C.ink : null, 2); R.push([x, ys(p.ce), i]);
        const lab = `${p.nm} ${p.yr}`, right = x < w * 0.7;
        // keep name clear of the 5.1% human line: prefer the side of the pair farther from 5.1
        let ly;
        if (p.te != null) { const mid = (p.ce + p.te) / 2; ly = ys(Math.abs(mid - 5.1) < 1.2 ? (p.ce < 5.1 ? p.ce - 1.2 : p.te + 1.2) : mid) + 4; }
        else ly = ys(p.ce) + 4;
        labs.push({ lab: n ? p.nm : lab, x: x + (right ? 10 : -10), ly, right, i }); });
      // names: selected first, then each later one steps down until it clears those already placed (ResNet/ResNeXt sit close)
      const sz = n ? 10.5 : 11.5, placed = [];
      labs.sort((a, b) => (b.i === sel) - (a.i === sel)).forEach(o => {
        const wd = o.lab.length * sz * 0.56, bx = o.right ? o.x : o.x - wd;
        let y = o.ly; for (let k = 0; k < 6 && placed.some(q => bx < q.x1 && bx + wd > q.x0 && Math.abs(y - q.y) < sz + 2); k++) y += sz + 2;
        placed.push({ x0: bx, x1: bx + wd, y });
        text(ctx, o.lab, o.x, y, { size: sz, align: o.right ? 'left' : 'right', weight: o.i === sel ? 700 : 500, color: C.ink, halo: 3 }); });
      // labels on the selected pair of dots instead of a legend: filled = as entered, open = one re-trained copy
      { const p = pts[sel], x = xs(p.f), right = x < w * 0.7, sx = right ? -10 : 10, al = right ? 'right' : 'left';
        text(ctx, 'as entered', x + sx, ys(p.ce) + 4, { size: 10.5, align: al, color: C.learn, weight: 600, halo: 3 });
        if (p.te != null) text(ctx, 're-trained copy', x + sx, ys(p.te) + 4, { size: 10.5, align: al, color: C.learn, weight: 600, halo: 3 }); }
    },
  });
  fig.interact({ panY: true, cursor: 'pointer', hit: (x, y) => { let b = null, bd = 26; for (const [px, py, i] of R) { const d = Math.hypot(x - px, y - py); if (d < bd) { bd = d; b = 'k' + i; } } return b; }, down(key) { sel = +key.slice(1); paint(); } });
  const ro = readout(el);
  const paint = () => { const p = pts[sel]; ro.innerHTML = `<b>${p.nm}</b> (${p.yr}): about ${sci(p.f)} operations to train. Contest error <b>${p.ce}%</b>${p.te != null ? `; one re-trained copy alone, ${p.te}%` : ''}.`; fig.invalidate(); };
  hint(el, 'tap a point.');
  paint();
}

// ---------- 11. Attention: real weights from a tiny transformer (scripts/tinylm/train.py) ----------
export function attention(el) {
  const S = TINYLM.sentences, M = TINYLM.meta;
  let si = 0, L = 1, Hd = 2, q = 9, mode = 'att', seqT = 0, R = [], G = [];
  const W = () => S[si].words, A = (l, h, i) => S[si].att[l][h][i].map(v => v / 255);
  const pretty = w => (w === 'i' ? 'I' : w);
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 520 : 260), animated: true, label: 'Real attention weights of a tiny transformer: the chosen word is outlined, and each earlier word is shaded by how much the chosen word draws from it. Small grids show all eight heads.',
    step(dt) { if (mode === 'seq') seqT = (seqT + dt * 1.6) % (W().length + 3); },
    draw(ctx, w, h) {
      const n = narrow(w), ws = W(), fs = n ? 13.5 : 15;
      // eight heads as small lower-triangular grids: rows = layers, columns = heads
      const gw = n ? Math.min(74, (w - 50) / 4) : 62, gx0 = n ? (w - (4 * gw + 3 * 12)) / 2 : w - (4 * gw + 3 * 10) - 12, gy0 = n ? 30 : 34, gap = n ? 12 : 10;
      G = [];
      if (mode === 'att') {
        text(ctx, 'all eight heads (tap one)', n ? w / 2 : gx0 + (4 * gw + 3 * gap) / 2, gy0 - 14, { size: 11, align: 'center', color: C.ink3 });
        for (let l = 0; l < 2; l++) for (let hh = 0; hh < 4; hh++) {
          const x = gx0 + hh * (gw + gap), y = gy0 + l * (gw + 22), c = gw / ws.length, sel = l === L && hh === Hd;
          for (let i = 0; i < ws.length; i++) { const a = A(l, hh, i); for (let j = 0; j <= i; j++) { ctx.fillStyle = alpha(C.learn, Math.min(1, a[j] * 1.4)); ctx.fillRect(x + j * c, y + i * c, c + 0.3, c + 0.3); } }
          if (sel) { ctx.fillStyle = alpha(C.ink, 0.12); ctx.fillRect(x, y + q * c, gw, c); }
          rrect(ctx, x - 2, y - 2, gw + 4, gw + 4, 4); ctx.strokeStyle = sel ? C.ink : C.grid2; ctx.lineWidth = sel ? 2 : 1; ctx.stroke();
          text(ctx, `L${l + 1}·H${hh + 1}`, x + gw / 2, y + gw + 14, { size: 10, align: 'center', color: sel ? C.ink : C.ink3, weight: sel ? 700 : 400, small: true });
          G.push({ l, h: hh, x, y, s: gw });
        }
      }
      // the sentence, wrapped into rows
      const left = 14, right = n || mode !== 'att' ? w - 14 : gx0 - 30, rowH = n ? 58 : 66;
      const top0 = mode === 'att' ? (n ? gy0 + 2 * (gw + 22) + 40 : 74) : 80;
      R = []; let row = [], rw = 0; const rows = [];
      ws.forEach((s, i) => { const bw = measure(ctx, pretty(s), fs, 600) + 14; if (row.length && rw + bw > right - left) { rows.push([row, rw - 7]); row = []; rw = 0; } row.push([i, bw]); rw += bw + 7; });
      rows.push([row, rw - 7]);
      rows.forEach(([r, tot], ri) => { let x = left + (right - left - tot) / 2; const y = top0 + ri * rowH; r.forEach(([i, bw]) => { R.push({ i, x, y, w: bw }); x += bw + 7; }); });
      const aq = mode === 'att' ? A(L, Hd, q) : null;
      for (const r of R) {
        let fill = '#fff', stroke = C.grid2, col = C.ink;
        if (mode === 'att') { // shade each earlier word by how much the chosen word draws from it
          if (r.i === q) { fill = '#fff'; stroke = C.ink; col = C.ink; } else if (r.i > q) { col = C.ink3; stroke = C.grid; } else { const v = aq[r.i]; fill = alpha(C.learn, Math.min(1, 0.05 + v * 1.8)); stroke = alpha(C.learn, 0.5); col = v > 0.3 ? '#fff' : C.ink; } }
        else { const cur = Math.floor(seqT); const mem = cur >= r.i ? Math.exp(-(Math.min(cur, ws.length - 1) - r.i) * 0.42) : 0; fill = mem ? alpha(C.compute, 0.12 + 0.6 * mem) : '#fff'; if (r.i === Math.min(cur, ws.length - 1) && cur < ws.length) stroke = C.compute; col = mem > 0.55 ? '#fff' : C.ink; }
        rrect(ctx, r.x, r.y - 15, r.w, 30, 8); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke();
        text(ctx, pretty(ws[r.i]), r.x + r.w / 2, r.y + 5, { size: fs, align: 'center', weight: 600, color: col });
        if (mode === 'att' && r.i <= q && (aq[r.i] >= 0.05 || r.i === q)) text(ctx, r.i === q ? `itself ${Math.round(aq[q] * 100)}%` : `${Math.round(aq[r.i] * 100)}%`, r.x + r.w / 2, r.y + 30, { size: 10.5, align: 'center', color: r.i === q ? C.ink2 : C.learn, weight: 650 });
      }
      if (mode === 'att') { const Q = R[q]; rrect(ctx, Q.x - 3, Q.y - 18, Q.w + 6, 36, 10); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.stroke(); }
      if (mode === 'seq') { const cur = Math.min(Math.floor(seqT), ws.length); text(ctx, cur < ws.length ? `step ${cur + 1} of ${ws.length}: reading “${ws[cur]}”` : `done after ${ws.length} steps, one after another`, w / 2, 30, { size: 13, align: 'center', weight: 650, color: C.compute }); text(ctx, 'darker = more of that word is still in the memory', w / 2, h - 16, { size: 11.5, align: 'center', color: C.ink3 }); }
      else text(ctx, 'each word looks back at itself and every earlier word, all at once', n ? w / 2 : (left + right) / 2, h - 16, { size: 11.5, align: 'center', color: C.ink3 });
    },
  });
  const pickW = (x, y) => R.find(r => x > r.x - 4 && x < r.x + r.w + 4 && Math.abs(y - r.y) < 22) || null;
  const pickG = (x, y) => G.find(g => x > g.x - 5 && x < g.x + g.s + 5 && y > g.y - 5 && y < g.y + g.s + 18) || null;
  fig.interact({
    hit: (x, y) => (mode !== 'att' ? null : pickG(x, y) || pickW(x, y)), cursor: 'pointer',
    down(o) { if (o.l !== undefined) { L = o.l; Hd = o.h; } else q = o.i; paint(); },
    move(o, x, y) { if (o.l !== undefined) { const g = pickG(x, y); if (g) { L = g.l; Hd = g.h; paint(); } } else { const r = pickW(x, y); if (r) { q = r.i; paint(); } } },
  });
  const ctl = controls(el);
  button(ctl, 'Next sentence', () => { si = (si + 1) % S.length; q = Math.min(q, W().length - 1); seqT = 0; paint(); }, { name: 'at-next' });
  segmented(ctl, { label: 'How the network reads', value: mode, options: [{ label: 'Attention: all at once', value: 'att', name: 'at-att' }, { label: 'Older: one word at a time', value: 'seq', name: 'at-seq' }], onchange: v => { mode = v; seqT = 0; paint(); } });
  const ro = readout(el);
  const pct = v => `${Math.round(v * 100)}%`;
  const paint = () => {
    const ws = W(), a = A(L, Hd, q), order = a.map((v, j) => [v, j]).filter(([, j]) => j < q).sort((x, y) => y[0] - x[0]).slice(0, 2), nx = S[si].next[q];
    const guess = nx.map(([g, p]) => `“${pretty(g)}” ${pct(p)}`).join(', '), real = ws[q + 1];
    ro.innerHTML = mode !== 'att' ? `Read one word at a time, each word waits for the last, and by “${ws[ws.length - 1]}”, “${ws[0]}” has mostly faded.`
      : `L${L + 1}·H${Hd + 1}: “<b>${pretty(ws[q])}</b>” ${q === 0 ? 'is first, so it can only look at itself' : `takes <b>${pct(order[0][0])}</b> from “<b>${pretty(ws[order[0][1]])}</b>”${order[1] && order[1][0] >= 0.05 ? `, ${pct(order[1][0])} from “${pretty(ws[order[1][1]])}”` : ''}, ${pct(a[q])} from itself`}. Next-word guesses: ${guess}${real ? ` (real: “${pretty(real)}”)` : ''}.`;
    fig.invalidate();
  };
  hint(el, 'tap or drag across the words, then tap the small grids to switch heads. Head L2·H3 most often goes back to the sentence’s main character.');
  paint();
}
