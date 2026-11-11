// Learning from Data, part 1: one line (AND, OR, XOR), two lines (a hidden layer), backpropagation, better ways downhill.
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, measure } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint } from '../lib/ui.js';
import { rng, gauss } from '../lib/rng.js';
import { frame, Lf, Lg, UI3D } from './learn.js';

const narrow = w => w < 560;
const RGB = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
// four corner clusters; lab(cornerX, cornerY) -> class (1 = red)
function corners(seed, lab, per = 8) { const r = rng(seed), out = []; for (const cx of [-1, 1]) for (const cy of [-1, 1]) for (let k = 0; k < per; k++) out.push({ x: cx * 0.55 + gauss(r) * 0.13, y: cy * 0.55 + gauss(r) * 0.13, c: lab(cx > 0, cy > 0) }); return out; }
const GATES = { and: (a, b) => (a && b ? 1 : 0), or: (a, b) => (a || b ? 1 : 0), xor: (a, b) => (a !== b ? 1 : 0) };
// a line as two draggable handles; coef() gives the unit normal (a, b) and offset c, so a·x + b·y + c > 0 is the "red" side
const coefOf = (h1, h2) => { const a = -(h2.y - h1.y), b = h2.x - h1.x, L = Math.hypot(a, b) || 1; return [a / L, b / L, -(a * h1.x + b * h1.y) / L]; };
// handles for the line a·x + b·y + c = 0: the point nearest the centre, ±0.6 along it, kept inside the box
function handlesFor([a, b, c], keepDir) { const L = Math.hypot(a, b) || 1, n = [a / L, b / L], c2 = c / L, m = { x: -c2 * n[0], y: -c2 * n[1] }, t = [-n[1], n[0]]; let p1 = { x: m.x - t[0] * 0.6, y: m.y - t[1] * 0.6 }, p2 = { x: m.x + t[0] * 0.6, y: m.y + t[1] * 0.6 }; const cl = p => ({ x: clamp(p.x, -1, 1), y: clamp(p.y, -1, 1) }); return [cl(p1), cl(p2)]; }
function drawLineAcross(ctx, F, w, h, h1, h2, color, width, dash) { const dx = h2.x - h1.x, dy = h2.y - h1.y; ctx.save(); ctx.beginPath(); ctx.rect(14, 14, w - 28, h - 28); ctx.clip(); line(ctx, F.X(h1.x - dx * 4), F.Y(h1.y - dy * 4), F.X(h2.x + dx * 4), F.Y(h2.y + dy * 4), color, width, dash); ctx.restore(); }
function dot(ctx, F, p, bad) { circle(ctx, F.X(p.x), F.Y(p.y), 6.5, p.c ? C.classA : C.classB, bad ? C.ink : '#fff', bad ? 2.5 : 1.4); if (bad) { const x = F.X(p.x), y = F.Y(p.y); line(ctx, x - 3.5, y - 3.5, x + 3.5, y + 3.5, '#fff', 2); line(ctx, x - 3.5, y + 3.5, x + 3.5, y - 3.5, '#fff', 2); } }

// ---------- 1. One line: AND, OR … and XOR ----------
export function xorLine(el) {
  let gate = 'and', P = corners(3, GATES.and), h1 = { x: -0.95, y: 0.2 }, h2 = { x: 0.6, y: -0.95 }, learning = false, upd = 0, tick = 0, flash = null, best = null, F;
  const coef = () => coefOf(h1, h2), side = (p, w = coef()) => (w[0] * p.x + w[1] * p.y + w[2] > 0 ? 1 : 0), wrong = () => P.filter(p => side(p) !== p.c);
  const MAXUPD = 80;
  function learnStep() { const W = wrong(); if (!W.length || upd >= MAXUPD) { learning = false; flash = null; return; } const p = W[Math.floor(rng(upd + 7)() * W.length)], t = p.c ? 1 : -1, w = coef(), lr = 0.3; flash = p; const nw = [w[0] + lr * t * p.x, w[1] + lr * t * p.y, w[2] + lr * t]; [h1, h2] = handlesFor(nw); if (coefOf(h1, h2)[0] * nw[0] + coefOf(h1, h2)[1] * nw[1] < 0) [h1, h2] = [h2, h1]; upd++; best = Math.min(best ?? 99, wrong().length); }
  const fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round(w * 0.92) : Math.round(Math.min(420, w * 0.48))), animated: true, label: 'Dots in four corner groups and a line you drag to separate red from blue',
    step(dt) { if (!learning) return; tick += dt; if (tick > 0.12) { tick = 0; learnStep(); paint(); } if (!learning) fig.opts.animated = false; },
    draw(ctx, w, h) {
      F = frame(w, h); const W = coef();
      const g = 24; for (let i = 0; i < g; i++) for (let j = 0; j < g; j++) { const x = -1 + (i + 0.5) * 2 / g, y = -1 + (j + 0.5) * 2 / g; ctx.fillStyle = alpha(side({ x, y }, W) ? C.classA : C.classB, 0.08); ctx.fillRect(F.X(x - 1 / g), F.Y(y + 1 / g), (w - 28) / g + 1, (h - 28) / g + 1); }
      drawLineAcross(ctx, F, w, h, h1, h2, C.ink, 2.5);
      for (const p of P) dot(ctx, F, p, side(p, W) !== p.c);
      if (flash) circle(ctx, F.X(flash.x), F.Y(flash.y), 12, null, C.learn, 3);
      for (const q of [h1, h2]) circle(ctx, F.X(q.x), F.Y(q.y), 10, '#fff', C.ink, 3);
      const n = narrow(w), lab = { and: 'red = both inputs on (AND)', or: 'red = either input on (OR)', xor: 'red = exactly one input on (XOR)' }[gate];
      text(ctx, lab, 22, 32, { size: n ? 12 : 13, weight: 650, color: C.ink, halo: 3 });
    },
  });
  const wake = () => { fig.opts.animated = true; fig.invalidate(); };
  fig.interact({ hit(x, y) { for (const q of [h1, h2]) if (Math.hypot(x - F.X(q.x), y - F.Y(q.y)) < 24) return q; return null; }, down() { learning = false; flash = null; }, move(q, x, y) { q.x = clamp(F.ix(x), -1, 1); q.y = clamp(F.iy(y), -1, 1); paint(); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Which dots are red', value: gate, options: [{ label: 'AND', value: 'and', name: 'xl-and' }, { label: 'OR', value: 'or', name: 'xl-or' }, { label: 'XOR', value: 'xor', name: 'xl-xor' }], onchange: v => { gate = v; P = corners(3, GATES[v]); learning = false; flash = null; upd = 0; best = null; paint(); } });
  button(ctl, 'Let it learn', () => { upd = 0; best = wrong().length; if (isPlaying()) { learning = true; wake(); } else { while (learning !== null && upd < MAXUPD && wrong().length) learnStep(); flash = null; } paint(); }, { kind: 'primary', name: 'xl-learn' });
  const ro = readout(el);
  const paint = () => { const m = wrong().length; let s = m ? `<b>${m}</b> of ${P.length} dots on the wrong side.` : `Every dot is on the right side.`; if (upd) s += ` The perceptron has nudged the line <b>${upd}</b> time${upd > 1 ? 's' : ''}.`; if (gate === 'xor' && upd >= MAXUPD) s += ` It gives up: no straight line separates the red corners from the blue.`; ro.innerHTML = s; fig.invalidate(); };
  hint(el, 'drag the white handles to separate the colours for AND, then OR, then XOR. Press “Let it learn” on each.');
  paint();
}

// ---------- 2. Two lines and a neuron that combines them (a hidden layer) ----------
// The model is a real 2–2–1 network: hidden neuron j = tanh(K·(aⱼx + bⱼy + cⱼ)) for the line you drag; the output neuron
// σ(v₁h₁ + v₂h₂ + v₀) re-learns its three weights whenever you move a line (logistic regression on the two hidden outputs).
export function twoLayers(el) {
  const P = corners(5, GATES.xor, 7), K = 4;
  let L = [[{ x: -0.9, y: -0.15 }, { x: 0.9, y: -0.35 }], [{ x: -0.9, y: 0.25 }, { x: 0.9, y: 0.05 }]], V = [0, 0, 0], F, field = null, dirty = true, training = 0, tick = 0;
  const lineW = () => L.map(([a, b]) => coefOf(a, b).map(v => v * K));
  const hid = (x, y, W = lineW()) => W.map(([a, b, c]) => Math.tanh(a * x + b * y + c));
  const out = (x, y, W) => { const hh = hid(x, y, W); return 1 / (1 + Math.exp(-(V[0] + V[1] * hh[0] + V[2] * hh[1]))); };
  function fitOutput(iter = 400) { const W = lineW(), H = P.map(p => hid(p.x, p.y, W)); for (let k = 0; k < iter; k++) { const g = [0, 0, 0]; P.forEach((p, i) => { const o = 1 / (1 + Math.exp(-(V[0] + V[1] * H[i][0] + V[2] * H[i][1]))), d = o - p.c; g[0] += d; g[1] += d * H[i][0]; g[2] += d * H[i][1]; }); for (let j = 0; j < 3; j++) V[j] -= 1.5 * g[j] / P.length; } }
  // full backprop step on all nine weights; the lines are then redrawn from the hidden weights
  function trainAll(lr = 0.5) { const W = lineW(), gW = W.map(() => [0, 0, 0]), gV = [0, 0, 0]; for (const p of P) { const hh = hid(p.x, p.y, W), o = 1 / (1 + Math.exp(-(V[0] + V[1] * hh[0] + V[2] * hh[1]))), d = o - p.c; gV[0] += d; gV[1] += d * hh[0]; gV[2] += d * hh[1]; for (let j = 0; j < 2; j++) { const dh = d * V[j + 1] * (1 - hh[j] * hh[j]); gW[j][0] += dh * p.x; gW[j][1] += dh * p.y; gW[j][2] += dh; } } const n = P.length; for (let j = 0; j < 3; j++) V[j] -= lr * gV[j] / n; W.forEach((wj, j) => { const nw = wj.map((v, k) => v - lr * gW[j][k] / n); const len = Math.hypot(nw[0], nw[1]) || 1; const hs = handlesFor(nw.map(v => v / len)); const c2 = coefOf(hs[0], hs[1]); L[j] = c2[0] * nw[0] + c2[1] * nw[1] < 0 ? [hs[1], hs[0]] : hs; }); }
  const acc = () => { const W = lineW(); return P.filter(p => (out(p.x, p.y, W) > 0.5 ? 1 : 0) === p.c).length; };
  const COL = [C.learn, C.memory];
  const fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round(w * 0.92) : Math.round(Math.min(420, w * 0.48))), animated: true, label: 'XOR dots, two lines you drag, and the network’s combined answer as background colour',
    step(dt) { if (!training) return; tick += dt; if (tick < 0.03) return; tick = 0; for (let k = 0; k < 6; k++) trainAll(); training -= 6; dirty = true; if (training <= 0) { training = 0; fig.opts.animated = false; } paint(); },
    draw(ctx, w, h) {
      F = frame(w, h); const G = 40, W = lineW();
      if (dirty || !field) { field ??= Object.assign(document.createElement('canvas'), { width: G, height: G }); const g = field.getContext('2d'), im = g.createImageData(G, G), A = RGB(C.classA), B = RGB(C.classB); for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) { const p = out(-1 + (i + 0.5) * 2 / G, 1 - (j + 0.5) * 2 / G, W), c = p > 0.5 ? A : B, k = (j * G + i) * 4; im.data.set([c[0], c[1], c[2], Math.round((0.06 + 0.3 * Math.abs(p - 0.5) * 2) * 255)], k); } g.putImageData(im, 0, 0); dirty = false; }
      ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(field, 14, 14, w - 28, h - 28); ctx.restore();
      L.forEach(([a, b], j) => { drawLineAcross(ctx, F, w, h, a, b, COL[j], 2.5, [7, 5]); const cf = coefOf(a, b), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; arrow(ctx, F.X(mx), F.Y(my), F.X(mx + cf[0] * 0.2), F.Y(my + cf[1] * 0.2), COL[j], 2, 8); });
      for (const p of P) dot(ctx, F, p, (out(p.x, p.y, W) > 0.5 ? 1 : 0) !== p.c);
      L.forEach((pair, j) => pair.forEach(q => circle(ctx, F.X(q.x), F.Y(q.y), 10, '#fff', COL[j], 3)));
      // each line is labelled on itself, beside its arrow, instead of in a key
      L.forEach(([a, b], j) => { const cf = coefOf(a, b), mx = a.x + (b.x - a.x) * 0.3 + cf[0] * 0.07, my = a.y + (b.y - a.y) * 0.3 + cf[1] * 0.07; text(ctx, `neuron ${j + 1}`, F.X(mx), F.Y(my) + 4, { size: 12, weight: 650, color: COL[j], halo: 3, align: 'center' }); });
    },
  });
  fig.interact({ hit(x, y) { for (const pr of L) for (const q of pr) if (Math.hypot(x - F.X(q.x), y - F.Y(q.y)) < 24) return q; return null; }, down() { training = 0; }, move(q, x, y) { q.x = clamp(F.ix(x), -1, 1); q.y = clamp(F.iy(y), -1, 1); fitOutput(120); dirty = true; paint(); }, up() { fitOutput(); dirty = true; paint(); } });
  const ctl = controls(el);
  button(ctl, 'Let it learn', () => { if (isPlaying()) { training = 900; fig.opts.animated = true; fig.invalidate(); } else { for (let k = 0; k < 900; k++) trainAll(); dirty = true; paint(); } }, { kind: 'primary', name: 'tl-learn' });
  button(ctl, 'Start over', () => { training = 0; L = [[{ x: -0.9, y: -0.15 }, { x: 0.9, y: -0.35 }], [{ x: -0.9, y: 0.25 }, { x: 0.9, y: 0.05 }]]; V = [0, 0, 0]; fitOutput(); dirty = true; paint(); }, { name: 'tl-reset' });
  const ro = readout(el);
  const paint = () => { const a = acc(); const f1 = v => v.toFixed(1).replace('-', '−'); ro.innerHTML = `${a === P.length ? '<b>Solved:</b> every dot is' : `<b>${a}</b> of ${P.length} dots are`} right. The output weighs the hidden neurons <b style="color:${C.learn}">${f1(V[1])}</b> and <b style="color:${C.memory}">${f1(V[2])}</b>.${a < P.length ? ' Put the red corners in the strip between the lines.' : ''}`; fig.invalidate(); };
  hint(el, 'drag the four handles so the two dashed lines fence the red corners into a strip. The output neuron re-learns how to combine them as you drag.');
  fitOutput(); paint();
}

// ---------- 3. Backpropagation: blame flows backwards ----------
// One example (x₁, x₂) = (1, 0.5) with target 1; two tanh hidden neurons, one sigmoid output; error = ½(output − target)².
export function backpropFlow(el) {
  const X = [1, 0.5], T = 1;
  let w = { a11: 0.8, a12: -0.6, a21: -0.4, a22: 0.9, v1: -0.7, v2: 0.5 }, steps = 0, R = {}, flowT = 0, sel = null;
  const fwd = () => { const z1 = w.a11 * X[0] + w.a21 * X[1], z2 = w.a12 * X[0] + w.a22 * X[1], h1 = Math.tanh(z1), h2 = Math.tanh(z2), zo = w.v1 * h1 + w.v2 * h2, o = 1 / (1 + Math.exp(-zo)), E = 0.5 * (o - T) ** 2; return { h1, h2, o, E }; };
  // the backward pass, written out exactly as the chain rule says
  const grads = () => { const { h1, h2, o } = fwd(), dO = (o - T) * o * (1 - o), d1 = dO * w.v1 * (1 - h1 * h1), d2 = dO * w.v2 * (1 - h2 * h2); return { v1: dO * h1, v2: dO * h2, a11: d1 * X[0], a21: d1 * X[1], a12: d2 * X[0], a22: d2 * X[1], dO, d1, d2 }; };
  const KEYS = ['a11', 'a21', 'a12', 'a22', 'v1', 'v2'];
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 340 : 300), animated: true, label: 'A tiny network with six weights; drag a weight and watch the error, the purple bars show each weight’s share of the blame',
    step(dt) { flowT = (flowT + dt * 0.5) % 1; },
    draw(ctx, W, H) {
      const n = narrow(W), xs = [n ? 40 : W * 0.14, W * 0.47, W - (n ? 46 : W * 0.2)], ys = { x1: H * 0.22, x2: H * 0.7, h1: H * 0.22, h2: H * 0.7, o: H * 0.46 };
      const node = { x1: [xs[0], ys.x1], x2: [xs[0], ys.x2], h1: [xs[1], ys.h1], h2: [xs[1], ys.h2], o: [xs[2], ys.o] };
      const E = { a11: ['x1', 'h1'], a21: ['x2', 'h1'], a12: ['x1', 'h2'], a22: ['x2', 'h2'], v1: ['h1', 'o'], v2: ['h2', 'o'] };
      const f = fwd(), g = grads(); R.knobs = {};
      for (const k of KEYS) {
        const [p, q] = E[k], [x1, y1] = node[p], [x2, y2] = node[q], v = w[k];
        line(ctx, x1, y1, x2, y2, alpha(v >= 0 ? C.compute : C.heat, 0.75), 1 + Math.abs(v) * 3);
        // blame pulse travelling backwards (from q to p), its size ∝ |gradient|
        const gk = Math.abs(g[k]), t = flowT; if (gk > 1e-4) circle(ctx, x2 + (x1 - x2) * t, y2 + (y1 - y2) * t, 2 + Math.min(7, gk * 60), alpha(C.learn, 0.85));
        const tk = k === 'a21' || k === 'a12' ? 0.27 : 0.5, kx = x1 + (x2 - x1) * tk, ky = y1 + (y2 - y1) * tk; // the crossing edges get their knobs near the inputs, clear of the crossing
        R.knobs[k] = [kx, ky];
        // knob: weight value; purple bar: gradient (blame)
        const half = Math.min(23, gk * 200), up = g[k] > 0; // blame bar: grows right for positive, left for negative
        rrect(ctx, kx - 23, ky + 16, 46, 6, 3); ctx.fillStyle = alpha(C.learn, 0.15); ctx.fill();
        rrect(ctx, up ? kx : kx - half, ky + 16, Math.max(2, half), 6, 3); ctx.fillStyle = C.learn; ctx.fill();
        circle(ctx, kx, ky, sel === k ? 15 : 13, '#fff', v >= 0 ? C.compute : C.heat, sel === k ? 3.5 : 2.5);
        text(ctx, v.toFixed(1), kx, ky + 4, { size: 11, align: 'center', weight: 700, color: C.ink, small: true });
      }
      for (const [k, [x, y]] of Object.entries(node)) {
        const val = k === 'x1' ? X[0] : k === 'x2' ? X[1] : k === 'h1' ? f.h1 : k === 'h2' ? f.h2 : f.o;
        circle(ctx, x, y, 20, '#fff', null); circle(ctx, x, y, 20, k === 'o' ? alpha(C.on, 0.25 + 0.75 * f.o) : '#fff', C.ink, 2);
        text(ctx, val.toFixed(2), x, y + 4, { size: 11.5, align: 'center', weight: 650, color: C.ink, small: true });
        const lab = { x1: 'input 1', x2: 'input 2', h1: 'hidden 1', h2: 'hidden 2', o: 'output' }[k];
        text(ctx, lab, x, y - 28, { size: 11, align: 'center', color: C.ink3 });
      }
      const [ox, oy] = node.o; text(ctx, `target 1.00`, ox, oy + 40, { size: 11.5, align: 'center', color: C.ink2, weight: 600 }); text(ctx, `error ${f.E.toFixed(3)}`, ox, oy + 58, { size: 12.5, align: 'center', weight: 700, color: C.learn });
    },
  });
  const hitK = (x, y) => { for (const k of KEYS) { const [kx, ky] = R.knobs[k] || [-99, -99]; if (Math.hypot(x - kx, y - ky) < 24) return k; } return null; };
  let y0 = 0, v0 = 0;
  fig.interact({ hit: hitK, cursor: 'ns-resize', down(k, x, y) { sel = k; y0 = y; v0 = w[k]; paint(); }, move(k, x, y) { w[k] = clamp(Math.round((v0 - (y - y0) / 40) * 10) / 10, -3, 3); paint(); }, up() { paint(); } });
  const ctl = controls(el);
  button(ctl, 'Take one step downhill', () => { const g = grads(); for (const k of KEYS) w[k] = clamp(w[k] - 3 * g[k], -3, 3); steps++; sel = null; paint(); }, { kind: 'primary', name: 'bp-step' });
  button(ctl, 'Start over', () => { w = { a11: 0.8, a12: -0.6, a21: -0.4, a22: 0.9, v1: -0.7, v2: 0.5 }; steps = 0; sel = null; paint(); }, { name: 'bp-reset' });
  const ro = readout(el);
  const paint = () => { const f = fwd(), g = grads(); const k = sel || KEYS.reduce((a, b) => (Math.abs(g[a]) > Math.abs(g[b]) ? a : b)); const nm = { a11: 'input 1 → hidden 1', a21: 'input 2 → hidden 1', a12: 'input 1 → hidden 2', a22: 'input 2 → hidden 2', v1: 'hidden 1 → output', v2: 'hidden 2 → output' }[k]; ro.innerHTML = `Output <b>${f.o.toFixed(2)}</b> (target 1), error <b>${f.E.toFixed(3)}</b>${steps ? ` after <b>${steps}</b> step${steps > 1 ? 's' : ''}` : ''}. ${sel ? 'Held' : 'Most blamed'}: ${nm}, blame <b>${g[k] >= 0 ? '+' : '−'}${Math.abs(g[k]).toFixed(3)}</b>.`; fig.invalidate(); };
  hint(el, 'drag any weight knob up or down and watch the error. Then press “Take one step downhill” a few times: every weight moves against its blame at once.');
  paint();
}

// ---------- 4. Better ways downhill: momentum and noise ----------
export function sgdValley(el) { if (window.AIX3D && window.AIX3D.lossSurface(el, { mode: 'pair', ui: UI3D })) return; sgdValley2d(el); }
function sgdValley2d(el) {
  const X0 = -3, X1 = 3, Y0 = -1.6, Y1 = 1.6, LR = 0.06, BETA = 0.9;
  let start = { x: -2.5, y: 1.25 }, noise = 0, A, B, tick = 0, field = null, fw = 0, R = {}, run = true, r = rng(2);
  const reset = () => { A = { p: { ...start }, trail: [{ ...start }], n: 0, done: 0, hold: 0, since: 0 }; B = { p: { ...start }, v: { x: 0, y: 0 }, trail: [{ ...start }], n: 0, done: 0, hold: 0, since: 0 }; r = rng(2); run = true; };
  const g = p => { const q = Lg(p.x, p.y); return [q[0] + noise * gauss(r) * 0.6, q[1] + noise * gauss(r) * 0.6]; };
  // "On the floor" means the error stays below DONE for HOLD steps in a row; the count is the step it got there and stayed.
  // Stopping at the first L < DONE froze the momentum ball mid-flight, as it overshoots and swings back (Goh, Distill 2017).
  const DONE = 0.01, HOLD = 10, MAXN = 500;
  function stepBoth() { for (const s of [A, B]) { if (s.done) continue; const gg = g(s.p); if (s === A) s.p = { x: s.p.x - LR * gg[0], y: s.p.y - LR * gg[1] }; else { s.v = { x: BETA * s.v.x - LR * gg[0], y: BETA * s.v.y - LR * gg[1] }; s.p = { x: s.p.x + s.v.x, y: s.p.y + s.v.y }; } s.n++; s.trail.push(s.p); if (s.trail.length > 600) s.trail.shift(); if (Lf(s.p.x, s.p.y) < DONE) { if (!s.hold++) s.since = s.n; } else s.hold = 0; if (s.hold >= HOLD) s.done = s.since; else if (s.n >= MAXN) s.done = -1; } if (A.done && B.done) run = false; }
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 320 : Math.round(Math.min(400, w * 0.45))), animated: true, label: 'Two balls rolling down the same error valley: plain steps and steps with momentum',
    onResize() { field = null; },
    step(dt) { if (!run) return; tick += dt; if (tick < 0.04) return; tick = 0; for (let k = 0; k < 2; k++) stepBoth(); paint(); },
    draw(ctx, w, h) {
      const sx = x => (x - X0) / (X1 - X0) * w, sy = y => h - (y - Y0) / (Y1 - Y0) * h; R = { ix: px => X0 + px / w * (X1 - X0), iy: py => Y0 + (h - py) / h * (Y1 - Y0), sx, sy };
      if (!field || fw !== w) { const c = document.createElement('canvas'), gw = Math.ceil(w / 4), gh = Math.ceil(h / 4); c.width = gw; c.height = gh; const gc = c.getContext('2d'), im = gc.createImageData(gw, gh); for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) { const x = X0 + (i + 0.5) / gw * (X1 - X0), y = Y1 - (j + 0.5) / gh * (Y1 - Y0), v = Math.log(1 + Lf(x, y)), t = clamp(Math.floor(v * 5) / 5 / 2.4, 0, 1), a = RGB('#f5f1ff'), b = RGB('#5b3a8c'), k = (j * gw + i) * 4; im.data.set([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, 255], k); } gc.putImageData(im, 0, 0); field = c; fw = w; }
      ctx.imageSmoothingEnabled = true; ctx.drawImage(field, 0, 0, w, h);
      const path = (s, col) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath(); s.trail.forEach((p, i) => { const x = sx(clamp(p.x, -9, 9)), y = sy(clamp(p.y, -9, 9)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); ctx.restore(); };
      path(A, '#fff'); path(B, C.on);
      circle(ctx, sx(1.2), sy(0.35 * Math.sin(2.04)), 5, null, '#fff', 2);
      circle(ctx, sx(clamp(A.p.x, X0, X1)), sy(clamp(A.p.y, Y0, Y1)), 9, '#fff', C.ink, 2.5);
      circle(ctx, sx(clamp(B.p.x, X0, X1)), sy(clamp(B.p.y, Y0, Y1)), 9, C.on, C.ink, 2.5);
      text(ctx, 'white: plain steps', 10, 18, { size: 11.5, color: '#fff', weight: 650, halo: 3, haloColor: alpha('#3a2560', 0.7) });
      text(ctx, 'yellow: with momentum', 10, 36, { size: 11.5, color: C.on, weight: 650, halo: 3, haloColor: alpha('#3a2560', 0.7) });
    },
  });
  fig.interact({ hit: () => 'drop', touchHit: (x, y) => (Math.hypot(x - R.sx(start.x), y - R.sy(start.y)) < 34 || Math.hypot(x - R.sx(A.p.x), y - R.sy(A.p.y)) < 34 ? 'drop' : null), down(k, x, y) { start = { x: clamp(R.ix(x), X0, X1), y: clamp(R.iy(y), Y0, Y1) }; reset(); run = false; paint(); }, move(k, x, y) { start = { x: clamp(R.ix(x), X0, X1), y: clamp(R.iy(y), Y0, Y1) }; reset(); run = false; paint(); }, up() { reset(); if (!isPlaying()) { while (run) stepBoth(); } paint(); } });
  const ctl = controls(el);
  slider(ctl, { label: 'Noise in each step (smaller batches)', name: 'noise', min: 0, max: 1, step: 0.05, value: noise, color: C.learn, fmt: v => (v === 0 ? 'none' : v.toFixed(2)), oninput: v => { noise = v; reset(); if (!isPlaying()) while (run) stepBoth(); paint(); } });
  const ro = readout(el);
  const say = s => (s.done > 0 ? `<b>${s.done}</b> steps` : s.done < 0 ? `not there after ${MAXN} steps` : `${s.n} steps so far`);
  const paint = () => { const st = s => (s.done > 0 ? `on the floor in <b>${s.done}</b> steps` : s.done < 0 ? `still not settled after ${MAXN} steps (error ${Lf(s.p.x, s.p.y).toFixed(3)})` : `error ${Lf(s.p.x, s.p.y).toFixed(2)} after ${s.n} steps`); ro.innerHTML = `To the floor (error below ${DONE} and staying there): plain steps ${st(A)}; with momentum ${st(B)}.`; fig.invalidate(); };
  hint(el, 'tap or drag anywhere to drop both balls there. Then add noise: each step sees only part of the data, so the slope it measures wobbles.');
  reset(); if (!isPlaying()) while (run) stepBoth(); paint();
}
