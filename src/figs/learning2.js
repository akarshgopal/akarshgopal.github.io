// Learning from Data, part 2: convolution, overfitting, memory that fades, attention as a lookup, next-word prediction.
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, measure, axes } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint } from '../lib/ui.js';
import { rng, gauss } from '../lib/rng.js';
import { ALICE } from '../lib/alice.js';
import { TINYLM } from '../lib/tinylm.js';

const narrow = w => w < 560;

// ---------- 5. A 3×3 filter slid across a picture ----------
const SEVEN = ['..............', '..............', '..##########..', '..##########..', '..........##..', '.........##...', '........##....', '.......##.....', '......##......', '.....##.......', '.....##.......', '....##........', '....##........', '..............'];
const FILTERS = { vert: { name: 'vertical edges', k: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]] }, horz: { name: 'horizontal edges', k: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]] }, blur: { name: 'blur', k: [[1, 1, 1], [1, 1, 1], [1, 1, 1]].map(r => r.map(v => v / 9)) } };
export function convFilter(el) {
  const N = 14, M = N - 2;
  let img = SEVEN.map(r => [...r].map(c => (c === '#' ? 1 : 0))), fk = 'horz', pos = { i: 4, j: 1 }, R = {}, paintVal = null;
  const conv = (i, j) => { const k = FILTERS[fk].k; let s = 0; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) s += k[a][b] * img[j + a][i + b]; return s; };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round((w - 36) / 2 + 66) : 300), label: 'A small picture of a seven, a 3 by 3 filter you slide across it, and the filtered picture',
    draw(ctx, w, h) {
      const n = narrow(w), S = n ? (w - 36) / 2 : Math.min(h - 64, (w - 140) / 2), cs = S / N, ix = 12, iy = 30, ox = n ? ix + S + 12 : ix + S + 90 + cs, oy = iy + cs;
      R = { cs, ix, iy, ox, oy };
      text(ctx, n ? 'tap to draw' : 'the picture (tap squares to draw)', ix, 18, { size: 11.5, color: C.ink3, weight: 500 });
      text(ctx, n ? 'filtered' : `filtered: ${FILTERS[fk].name}`, ox, 18, { size: 11.5, color: C.ink3, weight: 500 });
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { ctx.fillStyle = img[j][i] ? C.ink : '#fff'; ctx.fillRect(ix + i * cs, iy + j * cs, cs - 0.8, cs - 0.8); }
      ctx.strokeStyle = C.grid2; ctx.lineWidth = 1; ctx.strokeRect(ix - 0.5, iy - 0.5, S + 0.5, S + 0.5);
      let mx = 0; for (let j = 0; j < M; j++) for (let i = 0; i < M; i++) mx = Math.max(mx, Math.abs(conv(i, j)));
      for (let j = 0; j < M; j++) for (let i = 0; i < M; i++) { const v = conv(i, j) / (mx || 1); ctx.fillStyle = v >= 0 ? alpha(C.compute, 0.06 + 0.9 * v) : alpha(C.heat, 0.06 + 0.9 * -v); ctx.fillRect(ox + i * cs, oy + j * cs, cs - 0.8, cs - 0.8); }
      // the window, its weights, and where its answer goes
      const wx = ix + pos.i * cs, wy = iy + pos.j * cs, tx = ox + pos.i * cs, ty = oy + pos.j * cs;
      ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = alpha(C.learn, 0.7); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(wx + 3 * cs, wy); ctx.lineTo(tx, ty); ctx.moveTo(wx + 3 * cs, wy + 3 * cs); ctx.lineTo(tx, ty + cs); ctx.stroke(); ctx.restore();
      rrect(ctx, wx - 1.5, wy - 1.5, 3 * cs + 3, 3 * cs + 3, 4); ctx.strokeStyle = C.learn; ctx.lineWidth = 3.5; ctx.stroke();
      const k = FILTERS[fk].k; if (cs >= 12 && fk !== 'blur') for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) text(ctx, cs >= 22 ? (k[a][b] > 0 ? '+1' : k[a][b] < 0 ? '−1' : '0') : (k[a][b] > 0 ? '+' : k[a][b] < 0 ? '−' : '0'), wx + (b + 0.5) * cs, wy + (a + 0.5) * cs + Math.min(5, cs * 0.3), { size: Math.max(12, Math.min(15, cs * 0.75)), align: 'center', weight: 800, color: C.learn, halo: 3 }); // small cells: sign only, so the nine glyphs do not run together
      ctx.strokeStyle = C.learn; ctx.lineWidth = 3; ctx.strokeRect(tx - 1, ty - 1, cs + 1.2, cs + 1.2);
    },
  });
  const cell = (x, y) => { const i = Math.floor((x - R.ix) / R.cs), j = Math.floor((y - R.iy) / R.cs); return i >= 0 && j >= 0 && i < N && j < N ? { i, j } : null; };
  const inWin = (x, y) => x > R.ix + (pos.i - 0.5) * R.cs && x < R.ix + (pos.i + 3.5) * R.cs && y > R.iy + (pos.j - 0.5) * R.cs && y < R.iy + (pos.j + 3.5) * R.cs;
  const moveWin = (x, y) => { pos = { i: clamp(Math.round((x - R.ix) / R.cs - 1.5), 0, M - 1), j: clamp(Math.round((y - R.iy) / R.cs - 1.5), 0, M - 1) }; paint(); };
  const toggle = c => { img[c.j][c.i] = paintVal ?? (img[c.j][c.i] ? 0 : 1); paint(); };
  fig.interact({ hit: (x, y) => (inWin(x, y) ? 'win' : cell(x, y) ? 'px' : null), touchHit: (x, y) => (inWin(x, y) ? 'win' : null), cursor: 'grab',
    down(k, x, y) { if (k === 'win') { if (y !== undefined) moveWin(x, y); return; } const c = cell(x, y); if (c) { paintVal = img[c.j][c.i] ? 0 : 1; toggle(c); } },
    move(k, x, y) { if (k === 'win') moveWin(x, y); else { const c = cell(x, y); if (c) toggle(c); } }, up() { paintVal = null; } });
  el.querySelector('canvas').addEventListener('click', e => { if (!(e.pointerType === 'touch' || (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents))) return; const r = e.target.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; if (inWin(x, y)) return; const c = cell(x, y); if (c) { paintVal = null; toggle(c); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Filter', value: fk, options: [{ label: 'horizontal edges', value: 'horz', name: 'cf-h' }, { label: 'vertical edges', value: 'vert', name: 'cf-v' }, { label: 'blur', value: 'blur', name: 'cf-b' }], onchange: v => { fk = v; paint(); } });
  button(ctl, 'Clear the picture', () => { img = img.map(r => r.map(() => 0)); paint(); }, { name: 'cf-clear' });
  const ro = readout(el);
  const paint = () => { const v = conv(pos.i, pos.j); ro.innerHTML = `The nine products under the window add up to <b>${Number(v.toFixed(2)).toLocaleString('en-GB')}</b>. Nine weights, reused at all ${M * M} positions, instead of <b>${(N * N * M * M).toLocaleString('en-GB')}</b>.`; fig.invalidate(); };
  hint(el, 'drag the purple window over the top bar of the seven, then over its slanted stroke. Switch filters, or draw your own shape.');
  paint();
}

// ---------- 6. Overfitting: a curve through too few points ----------
const truth = x => 0.8 * Math.sin(2.5 * x);
function legendre(x, d) { const P = [1, x]; for (let k = 2; k <= d; k++) P.push(((2 * k - 1) * x * P[k - 1] - (k - 1) * P[k - 2]) / k); return P.slice(0, d + 1); }
function polyFit(pts, d, lam = 1e-6) { const m = d + 1, A = Array.from({ length: m }, () => new Array(m + 1).fill(0)); for (const p of pts) { const b = legendre(p.x, d); for (let i = 0; i < m; i++) { for (let j = 0; j < m; j++) A[i][j] += b[i] * b[j]; A[i][m] += b[i] * p.y; } } for (let i = 0; i < m; i++) A[i][i] += lam; for (let c = 0; c < m; c++) { let piv = c; for (let r = c + 1; r < m; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r; [A[c], A[piv]] = [A[piv], A[c]]; for (let r = 0; r < m; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k <= m; k++) A[r][k] -= f * A[c][k]; } } const co = A.map((r, i) => r[m] / r[i]); return x => legendre(x, d).reduce((s, b, i) => s + b * co[i], 0); }
export function overfit(el) {
  const DMAX = 14, test = (() => { const r = rng(99); return Array.from({ length: 300 }, () => { const x = r() * 2 - 1; return { x, y: truth(x) + 0.25 * gauss(r) }; }); })();
  let n = 12, d = 3, pts, curves, errs, R = {};
  const rmse = (f, P) => Math.sqrt(P.reduce((s, p) => s + (f(p.x) - p.y) ** 2, 0) / P.length);
  const make = () => { const r = rng(7); pts = Array.from({ length: n }, (_, i) => { const x = -0.97 + 1.94 * (i + r()) / n; return { x, y: truth(x) + 0.25 * gauss(r) }; }); curves = []; errs = []; for (let k = 0; k <= Math.min(DMAX, n - 1); k++) { const f = polyFit(pts, k); curves.push(f); errs.push([rmse(f, pts), rmse(f, test)]); } d = Math.min(d, n - 1); }; // a degree-(n−1) curve already passes through all n points; beyond that the fit is not unique
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 470 : 320), label: 'Noisy training points with a fitted curve, and the training and test error for every curve complexity',
    draw(ctx, w, h) {
      const nr = narrow(w), A = nr ? { l: 34, t: 22, r: w - 10, b: 230 } : { l: 34, t: 22, r: w * 0.52, b: h - 34 }, B = nr ? { l: 40, t: 290, r: w - 14, b: h - 40 } : { l: w * 0.6 + 6, t: 22, r: w - 14, b: h - 40 };
      const a = axes(ctx, { x0: -1, x1: 1, y0: -1.8, y1: 1.8, box: A, xticks: [-1, 0, 1], yticks: [-1, 0, 1], ylabel: 'training points and the fitted curve' });
      ctx.save(); ctx.beginPath(); ctx.rect(A.l, A.t, A.r - A.l, A.b - A.t); ctx.clip();
      ctx.setLineDash([4, 4]); ctx.strokeStyle = alpha(C.ink3, 0.8); ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const x = -1 + i / 60; i ? ctx.lineTo(a.sx(x), a.sy(truth(x))) : ctx.moveTo(a.sx(x), a.sy(truth(x))); } ctx.stroke(); ctx.setLineDash([]);
      const f = curves[d]; ctx.strokeStyle = C.learn; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const x = -1 + i / 150, y = clamp(f(x), -9, 9); i ? ctx.lineTo(a.sx(x), a.sy(y)) : ctx.moveTo(a.sx(x), a.sy(y)); } ctx.stroke(); ctx.restore();
      for (const p of pts) circle(ctx, a.sx(p.x), a.sy(p.y), 4.5, C.ink, '#fff', 1.4);
      const E1 = 0.8, b = axes(ctx, { x0: 0, x1: DMAX, y0: 0, y1: E1, box: B, xticks: [0, 2, 4, 6, 8, 10, 12, 14], yticks: [0, 0.4, 0.8], yfmt: v => v.toFixed(1), ylabel: 'average error', xlabel: 'wiggliness (polynomial degree)' });
      const pl = (k, col, dash) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; if (dash) ctx.setLineDash(dash); ctx.beginPath(); errs.forEach((e, i) => { const y = b.sy(Math.min(e[k], E1)); i ? ctx.lineTo(b.sx(i), y) : ctx.moveTo(b.sx(i), y); }); ctx.stroke(); ctx.restore(); };
      pl(0, C.ink2, [5, 4]); pl(1, C.heat);
      const best = errs.reduce((m, e, i) => (e[1] < errs[m][1] ? i : m), 0);
      line(ctx, b.sx(d), B.t, b.sx(d), B.b, C.ink, 1.5); circle(ctx, b.sx(d), b.sy(Math.min(errs[d][1], E1)), 6, '#fff', C.heat, 2.5); circle(ctx, b.sx(d), b.sy(Math.min(errs[d][0], E1)), 5, '#fff', C.ink2, 2);
      circle(ctx, b.sx(d), B.b + (nr ? 0 : 0), 10, C.ink, '#fff', 2);
      const last = errs.length - 1; if (last < DMAX) { ctx.fillStyle = alpha(C.ink3, 0.08); ctx.fillRect(b.sx(last + 0.5), B.t, B.r - b.sx(last + 0.5), B.b - B.t); if (B.r - b.sx(last + 0.5) > 130) text(ctx, 'more wiggle than points', (b.sx(last + 0.5) + B.r) / 2, B.b - 8, { size: 10.5, align: 'center', color: C.ink3 }); }
      {
        let yNew = b.sy(Math.min(errs[last][1], E1)) - 8, yTr = b.sy(Math.min(errs[last][0], E1)) - 8;
        if (Math.abs(yNew - yTr) < 14) { if (yNew <= yTr) { yNew -= 8; yTr += 8; } else { yTr -= 8; yNew += 8; } }
        text(ctx, 'new data', b.sx(last) - 2, yNew, { size: 11.5, align: 'right', color: C.heat, weight: 650, halo: 3 });
        text(ctx, 'training points', b.sx(last) - 2, yTr, { size: 11.5, align: 'right', color: C.ink2, weight: 650, halo: 3 });
      }
      R = { b, B, best };
    },
  });
  const setD = x => { d = clamp(Math.round(R.b.sx.inv(x)), 0, errs.length - 1); paint(); };
  fig.interact({ hit: (x, y) => (y > R.B.t - 6 && y < R.B.b + 20 && x > R.B.l - 10 ? 'd' : null), cursor: 'ew-resize', down(k, x) { setD(x); }, move(k, x) { setD(x); } });
  const ctl = controls(el);
  slider(ctl, { label: 'Training points', name: 'n', min: 5, max: 40, step: 1, value: n, color: C.ink2, fmt: v => String(v), oninput: v => { n = v; make(); paint(); } });
  const ro = readout(el);
  const paint = () => { const [tr, te] = errs[d]; const best = errs.reduce((m, e, i) => (e[1] < errs[m][1] ? i : m), 0); ro.innerHTML = `Degree <b>${d}</b>: error <b>${tr.toFixed(2)}</b> on the ${n} training points, <b style="color:${C.heat}">${te >= 10 ? '>10' : te.toFixed(2)}</b> on 300 new ones (noise alone: 0.25). Best degree: <b>${best}</b>.${d > best + 2 ? ' It is memorising the noise.' : d < best - 1 ? ' Too stiff.' : ''}`; fig.invalidate(); };
  hint(el, 'drag along the error chart to make the curve wigglier. Then add training points and drag again.');
  make(); paint();
}

// ---------- 7. Reading one word at a time ----------
const SENT = 'The keys that the man who lives next door left on the bus were found'.split(' ');
export function rnnMemory(el) {
  let p = 12, keep = 0.8, mode = 'plain', R = [], auto = true, t = 0;
  const WERE = 13; // “were” is word 14, twelve steps after “keys”
  const mem = (i, at = p) => (i > at ? 0 : mode === 'gate' && i === 1 ? 0.97 ** (at - i) : keep ** (at - i));
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 300 : 230), animated: true, label: 'A sentence read one word at a time; the bars show how much of each word is still in the memory',
    step(dt) { if (!auto) return; t += dt; if (t > 0.55) { t = 0; p = p >= SENT.length + 2 ? 0 : p + 1; paint(); } },
    draw(ctx, w, h) {
      const n = narrow(w), fs = n ? 13.5 : 15, rows = n ? [[0, 5], [5, 10], [10, 15]] : [[0, 15]]; R = [];
      const at = Math.min(p, SENT.length - 1);
      rows.forEach(([a, b], ri) => { const ws = SENT.slice(a, b).map(s => measure(ctx, s, fs, 600) + 14), tot = ws.reduce((s, v) => s + v, 0) + 6 * (ws.length - 1); let x = (w - tot) / 2; const y = n ? 92 + ri * 86 : 160; ws.forEach((ww, i) => { R.push({ i: a + i, x, y, w: ww }); x += ww + 6; }); });
      for (const r of R) {
        const m = p < SENT.length || r.i <= at ? mem(r.i, at) : 0, cur = r.i === at && p < SENT.length, bh = 52 * m;
        rrect(ctx, r.x + 3, r.y - 22 - bh, r.w - 6, Math.max(bh, 1), 3); ctx.fillStyle = r.i === 1 ? C.compute : alpha(C.compute, 0.45); ctx.fill();
        if (r.i === 1 && r.i <= at) text(ctx, `${(m * 100).toFixed(m < 0.1 ? 1 : 0)}%`, r.x + r.w / 2, r.y - 28 - bh, { size: 11, align: 'center', weight: 700, color: C.compute, halo: 3 });
        rrect(ctx, r.x, r.y - 15, r.w, 28, 7); ctx.fillStyle = cur ? C.ink : '#fff'; ctx.fill(); ctx.strokeStyle = r.i === 1 || r.i === WERE ? C.compute : C.grid2; ctx.lineWidth = r.i === 1 || r.i === WERE ? 2.2 : 1.3; ctx.stroke();
        text(ctx, SENT[r.i], r.x + r.w / 2, r.y + 4, { size: fs, align: 'center', weight: 600, color: cur ? '#fff' : r.i <= at ? C.ink : C.ink3 });
      }
      text(ctx, 'bar = how much of that word is still in the memory', 12, h - 12, { size: 11, color: C.ink3 });
    },
  });
  const pick = (x, y) => R.find(r => x > r.x - 3 && x < r.x + r.w + 3 && Math.abs(y - r.y) < 30) || null;
  fig.interact({ hit: pick, cursor: 'ew-resize', down(r) { auto = false; p = r.i; paint(); }, move(r, x, y) { const r2 = pick(x, y); if (r2) { p = r2.i; paint(); } } });
  const ctl = controls(el);
  slider(ctl, { label: 'Memory kept from one word to the next', name: 'keep', min: 0.5, max: 0.95, step: 0.01, value: keep, color: C.compute, fmt: v => `${Math.round(v * 100)}%`, oninput: v => { keep = v; paint(); } });
  segmented(ctl, { label: 'Memory', value: mode, options: [{ label: 'plain', value: 'plain', name: 'rm-plain' }, { label: 'with a gate (LSTM)', value: 'gate', name: 'rm-gate' }], onchange: v => { mode = v; paint(); } });
  const ro = readout(el);
  const pc = v => `${(v * 100).toFixed(v < 0.1 ? 1 : 0)}%`;
  const paint = () => { const at = Math.min(p, SENT.length - 1), m = mem(1, WERE); ro.innerHTML = at >= WERE ? `By “<b>were</b>”, twelve steps on, <b>${pc(m)}</b> of “keys” is left${at > WERE ? ` (${pc(mem(1, at))} by “${SENT[at]}”)` : ''}: all it has to choose “were” over “was”.${mode === 'gate' ? ' The gate holds on to the subject.' : ''}` : `Reading word ${at + 1} of ${SENT.length}, “<b>${SENT[at]}</b>”. Each word must wait for the one before it.`; fig.invalidate(); };
  hint(el, 'drag along the sentence to move the reader. Lower the memory slider, then switch on the gate.');
  paint();
}

// ---------- 8. Attention as a soft lookup: query, keys, weights ----------
// The sentence stops at "it", where a language model must guess the next word; its antecedents come before it.
const QW = ['the', 'tired', 'cat', 'sat', 'on', 'the', 'mat', 'because', 'it'];
const KEY = [[-0.62, 0.32], [0.72, -0.48], [1, 0.08], [0.28, -0.78], [-0.25, 0.72], [-0.62, 0.32], [0.12, 1], [-0.78, -0.3], [-0.42, -0.62]];
const Q0 = { 8: [2.4, -0.2], 3: [1.6, 0.9], 4: [0.1, 2.2], 6: [-0.3, 1.6], 2: [1.8, 0] };
export function qkv(el) {
  let qi = 8, q = [...Q0[8]], R = {}, P = [];
  // causal mask (Vaswani et al. 2017, §3.2.3): keys after the query get −∞ before the softmax, so weight 0
  const weights = () => { const s = KEY.map((k, i) => (i > qi ? -Infinity : (k[0] * q[0] + k[1] * q[1]) * 1.6)), m = Math.max(...s), e = s.map(v => Math.exp(v - m)), z = e.reduce((a, b) => a + b, 0); return e.map(v => v / z); };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 546 : 300), label: 'A sentence with attention bars above each word, and a compass where you drag the query arrow against the words’ key arrows',
    draw(ctx, w, h) {
      const n = narrow(w), fs = n ? 13.5 : 15, W = weights();
      // sentence with bars
      const rows = n ? [[0, 5], [5, 10]] : [[0, 10]], area = n ? w : w * 0.58; P = [];
      rows.forEach(([a, b], ri) => { const ws = QW.slice(a, b).map(s => measure(ctx, s, fs, 600) + 14), tot = ws.reduce((s, v) => s + v, 0) + 6 * (ws.length - 1); let x = (area - tot) / 2; const y = n ? 124 + ri * 96 : 170; ws.forEach((ww, i) => { P.push({ i: a + i, x, y, w: ww }); x += ww + 6; }); });
      for (const r of P) { const v = W[r.i], bh = 64 * v; rrect(ctx, r.x + 3, r.y - 22 - bh, r.w - 6, Math.max(1, bh), 3); ctx.fillStyle = alpha(C.learn, 0.35 + 0.65 * v); ctx.fill(); if (v >= 0.06) text(ctx, `${Math.round(v * 100)}%`, r.x + r.w / 2, r.y - 28 - bh, { size: 11, align: 'center', color: C.learn, weight: 650, halo: 3 });
        const sel = r.i === qi, masked = r.i > qi; rrect(ctx, r.x, r.y - 15, r.w, 28, 7); ctx.fillStyle = sel ? C.on : masked ? C.paper : '#fff'; ctx.fill(); ctx.strokeStyle = sel ? C.ink : C.grid2; ctx.lineWidth = sel ? 2 : 1.3; if (masked) ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]); text(ctx, QW[r.i], r.x + r.w / 2, r.y + 4, { size: fs, align: 'center', weight: 600, color: masked ? C.ink3 : C.ink }); }
      text(ctx, `bars: how much “${QW[qi]}” draws from itself and earlier words`, n ? 12 : 16, n ? 24 : 34, { size: 11.5, color: C.ink3 });
      // compass
      const cx = n ? w / 2 : w * 0.8, cy = n ? 410 : h / 2 + 6, rad = n ? 104 : Math.min(118, h / 2 - 30); R = { cx, cy, rad };
      circle(ctx, cx, cy, rad, '#fff', C.grid2, 1.2); line(ctx, cx - rad, cy, cx + rad, cy, C.grid, 1); line(ctx, cx, cy - rad, cx, cy + rad, C.grid, 1);
      text(ctx, 'creature →', cx + rad + 6, cy + 4, { size: 10.5, color: C.ink3 }); text(ctx, '↑ place', cx, cy - rad - 8, { size: 10.5, align: 'center', color: C.ink3 });
      const seen = new Set(); KEY.forEach((k, i) => { if (seen.has(QW[i])) return; seen.add(QW[i]); const x = cx + k[0] * rad * 0.62, y = cy - k[1] * rad * 0.62; arrow(ctx, cx, cy, x, y, alpha(C.ink2, 0.35 + 0.65 * Math.min(1, W[i] * 3)), 1.6, 7); const ang = Math.atan2(-k[1], k[0]); text(ctx, QW[i], x + Math.cos(ang) * 8, y + Math.sin(ang) * 10 + 4, { size: 11, align: Math.cos(ang) > 0.3 ? 'left' : Math.cos(ang) < -0.3 ? 'right' : 'center', color: C.ink2, weight: 550, halo: 3 }); });
      const qx = cx + clamp(q[0] / 2.6, -1, 1) * rad, qy = cy - clamp(q[1] / 2.6, -1, 1) * rad; arrow(ctx, cx, cy, qx, qy, C.on, 3.5, 11); circle(ctx, qx, qy, 10, C.on, C.ink, 2.5);
      text(ctx, `query of “${QW[qi]}”`, cx, cy + rad + 20, { size: 11.5, align: 'center', weight: 650, color: C.ink });
    },
  });
  const pick = (x, y) => P.find(r => x > r.x - 3 && x < r.x + r.w + 3 && Math.abs(y - r.y) < 22) || null;
  const setQ = (x, y) => { let dx = (x - R.cx) / R.rad, dy = -(y - R.cy) / R.rad; const L = Math.hypot(dx, dy); if (L > 1) { dx /= L; dy /= L; } q = [dx * 2.6, dy * 2.6]; paint(); };
  fig.interact({ hit: (x, y) => (Math.hypot(x - R.cx, y - R.cy) < R.rad + 14 ? 'q' : pick(x, y) ? 'w' : null), cursor: 'grab', down(k, x, y) { if (k === 'q') setQ(x, y); else { const r = pick(x, y); qi = r.i; q = [...(Q0[qi] || KEY[qi].map(v => v * 1.6))]; paint(); } }, move(k, x, y) { if (k === 'q') setQ(x, y); } });
  const ro = readout(el);
  const paint = () => { const W = weights(); const top = W.map((v, i) => [v, i]).filter(([, i]) => i < qi).sort((a, b) => b[0] - a[0]); const L = Math.hypot(...q);
    const later = qi < QW.length - 1 ? ' Later words are masked: it cannot look ahead.' : '';
    ro.innerHTML = (!top.length ? `“<b>${QW[qi]}</b>” is the first word, so it can only attend to itself.` : `“<b>${QW[qi]}</b>” takes <b>${Math.round(top[0][0] * 100)}%</b> of its new meaning from “${QW[top[0][1]]}”${top[1] ? ` and ${Math.round(top[1][0] * 100)}% from “${QW[top[1][1]]}”` : ''}.${later} ${L < 0.8 ? 'A short query spreads its attention.' : L > 2.2 ? 'A long query picks sharply.' : ''}`); fig.invalidate(); };
  hint(el, 'drag the yellow query arrow round the compass and watch the bars. Tap another word to give it the query: it sees only itself and the words before it.');
  paint();
}

// ---------- 9. Predict the next word (counted from Alice in Wonderland, in your browser) ----------
export function nextWord(el) {
  const T = ALICE.split(' '), one = new Map(), two = new Map();
  const add = (m, k, v) => { let s = m.get(k); if (!s) m.set(k, (s = new Map())); s.set(v, (s.get(v) || 0) + 1); };
  for (let i = 0; i + 1 < T.length; i++) { add(one, T[i], T[i + 1]); if (i + 2 < T.length) add(two, T[i] + ' ' + T[i + 1], T[i + 2]); }
  let gen = ['alice', 'was'], ctxN = 1, R = {}, r = rng(4), cand = [], used = 1, seen = 0;
  const compute = () => { const a = gen[gen.length - 1], b = gen.slice(-2).join(' '); let m = ctxN === 2 ? two.get(b) : null; used = m ? 2 : 1; if (!m) m = one.get(a) || one.get('.'); seen = [...m.values()].reduce((s, v) => s + v, 0); cand = [...m.entries()].sort((x, y) => y[1] - x[1]).map(([w, c]) => [w, c / seen]); };
  const pretty = a => a.join(' ').replace(/ ([.,!?;])/g, '$1').replace(/(^|[.!?] )([a-z])/g, (m, p, c) => p + c.toUpperCase()).replace(/\bi\b/g, 'I');
  const ROWS = 6;
  const fig = new Fig(el, {
    height: () => ROWS * 40 + 44, label: 'The most likely next words with their probabilities; tap one to add it',
    draw(ctx, w, h) {
      const n = narrow(w), lx = n ? 92 : 130, rx = w - (n ? 50 : 70), top = cand.slice(0, ROWS), full = Math.max(0.25, cand[0][1]), /* bar scale: full width = 25%, or the top word if higher */ rest = cand.slice(ROWS).reduce((s, c) => s + c[1], 0); R.rows = [];
      text(ctx, `after “${gen.slice(-used).join(' ')}”, seen ${seen} time${seen > 1 ? 's' : ''} in the book:`, 10, 18, { size: 12, color: C.ink2, weight: 600 });
      top.forEach(([wd, p], i) => { const y = 34 + i * 40; R.rows.push([y, wd]); rrect(ctx, 4, y, w - 8, 34, 8); ctx.fillStyle = i % 2 ? '#fff' : alpha(C.learn, 0.05); ctx.fill(); text(ctx, wd === '.' ? '. (full stop)' : wd === ',' ? ', (comma)' : wd, lx - 10, y + 22, { size: 14, align: 'right', weight: 650, color: C.ink }); rrect(ctx, lx, y + 9, Math.max(3, (rx - lx) * p / full), 16, 4); ctx.fillStyle = C.learn; ctx.fill(); text(ctx, `${(p * 100).toFixed(p < 0.1 ? 1 : 0)}%`, lx + Math.max(3, (rx - lx) * p / full) + 6, y + 22, { size: 12, color: C.learn, weight: 650 }); });
      if (rest > 0) text(ctx, `${cand.length - ROWS} other words share the remaining ${(rest * 100).toFixed(0)}%`, 10, h - 6, { size: 11, color: C.ink3 });
    },
  });
  const choose = wd => { gen.push(wd); if (gen.length > 60) gen = gen.slice(-60); compute(); paint(); };
  const rowAt = y => (R.rows || []).find(([ry]) => y > ry && y < ry + 34);
  fig.interact({ panY: true, hit: (x, y) => rowAt(y) || null, cursor: 'pointer', down(rw) { choose(rw[1]); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Look back', value: ctxN, options: [{ label: 'one word', value: 1, name: 'nw-1' }, { label: 'two words', value: 2, name: 'nw-2' }], onchange: v => { ctxN = v; compute(); paint(); } });
  button(ctl, 'Pick for me', () => { let u = r(), k = 0; while (k < cand.length - 1 && (u -= cand[k][1]) > 0) k++; choose(cand[k][0]); }, { kind: 'primary', name: 'nw-pick' });
  button(ctl, 'Start over', () => { gen = ['alice', 'was']; compute(); paint(); }, { name: 'nw-reset' });
  const ro = readout(el, 'gen');
  const paint = () => { ro.innerHTML = `<span class="gen-text">“${pretty(gen)} …”</span><br>${ctxN === 2 && used === 1 ? 'Those two words never appear together in the book, so it falls back to the last word alone.' : `Counted in your browser from the first three chapters (${T.length.toLocaleString('en-GB')} words and marks).`}`; fig.invalidate(); };
  hint(el, 'tap a word to add it, or press “Pick for me” a few times. Then switch to two words of look-back.');
  compute(); paint();
}

// ---------- 9b. The tiny transformer's guesses beside the word-triple counts (precomputed by scripts/tinylm/train.py) ----------
export function tinyVsNgram(el) {
  const P = TINYLM.compare, M = TINYLM.meta, NS = P.filter(c => c.seen).length;
  let k = NS, R = {};
  const show = w => (w === '.' ? '. (full stop)' : w === ',' ? ', (comma)' : w === '!' ? '! (exclamation)' : w === ';' ? '; (semicolon)' : w === '?' ? '? (question)' : w === 'i' ? 'I' : w);
  const pc = p => (p >= 0.995 ? '>99%' : p >= 0.1 ? `${Math.round(p * 100)}%` : p >= 0.001 ? `${(p * 100).toFixed(1)}%` : '<0.1%');
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 575 : 330), label: 'A passage, the next-word guesses of a word-triple counting model and of a tiny transformer, and the word the book actually uses',
    draw(ctx, w, h) {
      const n = narrow(w), c = P[k], fs = n ? 13 : 14;
      // passage selector: one dot per prompt
      const dy = 22, gap = Math.min(26, (w - 40) / (P.length + 1)), x0 = (w - gap * (P.length - 1 + 0.6)) / 2; R.dots = [];
      P.forEach((p, i) => { const x = x0 + i * gap + (p.seen ? 0 : 0.6 * gap); R.dots.push([x, dy, i]); circle(ctx, x, dy, i === k ? 7 : 5, i === k ? C.ink : p.seen ? alpha(C.ink3, 0.45) : '#fff', i === k ? null : C.ink3, 1.2); });
      text(ctx, 'from the books', x0 + (NS - 1) * gap / 2, dy + 22, { size: 10.5, align: 'center', color: C.ink3 });
      text(ctx, 'held-out pages, never seen', x0 + (NS + 0.6 + (P.length - NS - 1) / 2) * gap, dy + 22, { size: 10.5, align: 'center', color: C.ink3 });
      // the passage, wrapped; the last two words are all the counting model gets
      ctx.font = `600 ${fs}px Inter, system-ui, sans-serif`;
      const ws = [...c.prompt, '___'], sp = 5; let x = 12, y = 78; const pos = [];
      for (const wd of ws) { const ww = ctx.measureText(wd === '___' ? '?' : wd).width + (wd.length < 2 ? 16 : 12); if (x + ww > w - 12) { x = 12; y += 34; } pos.push([x, y, ww]); x += ww + sp; }
      ws.forEach((wd, i) => { const [px, py, ww] = pos[i], last2 = i >= ws.length - 3 && i < ws.length - 1;
        if (wd === '___') { text(ctx, c.seen ? '?' : '?', px + ww / 2, py + 5, { size: fs, align: 'center', weight: 700, color: C.ink3 }); return; }
        rrect(ctx, px, py - 13, ww, 26, 7); ctx.fillStyle = last2 ? alpha(C.blue, 0.16) : '#fff'; ctx.fill(); ctx.strokeStyle = last2 ? C.blue : C.grid2; ctx.lineWidth = 1; ctx.stroke();
        text(ctx, wd === 'i' ? 'I' : wd, px + ww / 2, py + 5, { size: fs, align: 'center', weight: 600, color: C.ink }); });
      const more = c.seen ? '' : ' and up to 37 words before', yb = y + 26 + (n ? 14 : 0);
      if (c.prompt.length <= 2) text(ctx, 'with only two words, both models see the same thing', 12, yb + 6, { size: 11, color: C.ink3 });
      else if (n) { text(ctx, 'the counts see only the two blue words;', 12, yb - 8, { size: 11, color: C.ink3 }); text(ctx, `the transformer sees all of these${more}`, 12, yb + 7, { size: 11, color: C.ink3 }); }
      else text(ctx, `the counts see only the two blue words; the transformer sees all of these${more}`, 12, yb + 6, { size: 11, color: C.ink3 });
      // two columns (stacked on phones) of top-5 bars
      const cols = [['Word-triple counts', c.ngram, C.blue, c.pNgram], [`Tiny transformer (${Math.round(M.params / 1000)}k weights)`, c.tiny, C.learn, c.pTiny]];
      const top0 = yb + 34, colW = n ? w - 8 : (w - 24) / 2, rowH = 27;
      cols.forEach(([name, list, col, pt], ci) => {
        const cx = n ? 4 : 4 + ci * (colW + 16), cy = n ? top0 + ci * (5 * rowH + 56) : top0, lx = cx + (n ? 112 : 128), rx = cx + colW - 52;
        text(ctx, name, cx + 6, cy, { size: 12.5, weight: 700, color: col });
        list.slice(0, 5).forEach(([wd, p], i) => { const ry = cy + 10 + i * rowH, hitT = !c.seen && wd === c.truth, bw = Math.max(3, (rx - lx) * p);
          if (hitT) { rrect(ctx, cx, ry, colW, rowH - 3, 6); ctx.fillStyle = alpha(C.green, 0.13); ctx.fill(); }
          text(ctx, show(wd), lx - 8, ry + 17, { size: 13, align: 'right', weight: 650, color: hitT ? C.green : C.ink });
          rrect(ctx, lx, ry + 6, bw, 13, 3); ctx.fillStyle = col; ctx.fill();
          text(ctx, pc(p), lx + bw + 6, ry + 17, { size: 11.5, color: col, weight: 650 }); });
        if (!c.seen) text(ctx, `gave “${show(c.truth)}”: ${pc(pt)}${list.slice(0, 5).some(([wd]) => wd === c.truth) ? '' : ' (not in its top 5)'}`, cx + 6, cy + 10 + 5 * rowH + 12, { size: 12, weight: 650, color: C.green });
      });
    },
  });
  fig.interact({ panY: true, cursor: 'pointer', hit: (x, y) => { const d = (R.dots || []).find(([dx, dy]) => Math.hypot(x - dx, y - dy) < 13); return d ? 'd' + d[2] : null; }, down(key) { k = +key.slice(1); paint(); } });
  const ctl = controls(el);
  button(ctl, 'Next passage', () => { k = (k + 1) % P.length; paint(); }, { kind: 'primary', name: 'tv-next' });
  const ro = readout(el);
  const paint = () => {
    const c = P[k];
    ro.innerHTML = c.seen
      ? `Both models saw this phrase in training, so this is partly memory.`
      : `The book says “<b>${show(c.truth)}</b>”: transformer <b>${pc(c.pTiny)}</b>, counts ${pc(c.pNgram)}. Over ${M.top1.n.toLocaleString('en-GB')} held-out words: first guess right ${Math.round(M.top1.tiny * 1000) / 10}% vs ${Math.round(M.top1.trigram * 1000) / 10}%; perplexity ${Math.round(M.valPpl)} vs ${Math.round(M.ngramValPpl.trigram)}.`;
    fig.invalidate();
  };
  hint(el, 'tap a dot to pick a passage (held-out ones are evenly spaced through the unseen pages, not hand-picked).');
  paint();
}
