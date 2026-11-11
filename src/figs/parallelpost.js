// Parallel: one dot product -> matrix -> roofline -> systolic -> latency hiding -> precision -> data distance -> scale-out.
import { Fig, isPlaying, onPlayChange } from '../lib/fig.js';
import { C, alpha, mix as mixc } from '../lib/colors.js';
import { text, rrect, line, circle, clamp, axes, arrow } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint } from '../lib/ui.js';
import { HW2 } from '../lib/aidata.js';
import { sig } from './chips.js';

const narrow = w => w < 560;
const UI3D = { C, controls, slider, button, readout, hint, isPlaying, onPlayChange };
const L10 = Math.log10;
const sup = n => String(n).replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).replace('-', '⁻');
const big = v => (v >= 1e12 ? `${+(v / 1e12).toPrecision(3)} trillion` : v >= 1e9 ? `${+(v / 1e9).toPrecision(3)} billion` : v >= 1e6 ? `${+(v / 1e6).toPrecision(3)} million` : Math.round(v).toLocaleString('en-GB'));
const flops = v => (v >= 1e15 ? `${+(v / 1e15).toPrecision(3)} PFLOP/s` : `${+(v / 1e12).toPrecision(3)} TFLOP/s`);
const logRail = (ctx, l, r, y, lo, hi, ticks, fmt, val, color) => { const x = v => l + (L10(v) - L10(lo)) / (L10(hi) - L10(lo)) * (r - l); line(ctx, l, y, r, y, C.grid2, 4); ticks.forEach(v => { line(ctx, x(v), y - 4, x(v), y + 4, C.ink3, 1); text(ctx, fmt(v), x(v), y + 18, { size: 10.5, align: 'center', color: C.ink3 }); }); circle(ctx, x(val), y, 11, '#fff', color, 3); return v => 10 ** (L10(lo) + (v - l) / (r - l) * (L10(hi) - L10(lo))); };

// ---------- 1. A matrix multiply: work n³, data n² ----------
// The same small numbers feed both this figure and the systolic array below, so the totals there match these outputs.
export const MA = [[1, 2, 0, 1], [0, 1, 3, 1], [2, 0, 1, 2], [1, 1, 0, 3]], MB = [[2, 0, 1, 1], [1, 3, 0, 2], [0, 1, 2, 0], [1, 0, 1, 1]];
const MC = MA.map(r => MB[0].map((_, j) => r.reduce((s, a, k) => s + a * MB[k][j], 0)));
export function matmulGrid(el) {
  const n = 4; let ci = 1, cj = 2, N = 4096, R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round((w - 60) / 3.4) + 104 : 300), label: 'Multiplying two 4 by 4 matrices of small numbers: each answer is one row of the first times one column of the second',
    draw(ctx, w, h) {
      const s = Math.min((w - 60) / 3.4, h - 110), cs = s / n, ay = 28, gx = [16, 16 + s * 1.2, 16 + s * 2.4], fs = Math.max(11, Math.min(17, cs * 0.38));
      [['inputs', 0, MA, C.memory], ['weights', 1, MB, C.cyan], ['outputs', 2, MC, C.compute]].forEach(([t, k, M, col]) => {
        text(ctx, t, gx[k] + s / 2, ay - 8, { size: 11.5, align: 'center', weight: 650, color: col });
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
          const hl = (k === 0 && i === ci) || (k === 1 && j === cj) || (k === 2 && i === ci && j === cj);
          rrect(ctx, gx[k] + j * cs + 1, ay + i * cs + 1, cs - 2, cs - 2, Math.min(4, cs / 6)); ctx.fillStyle = hl ? col : alpha(col, 0.14); ctx.fill();
          text(ctx, String(M[i][j]), gx[k] + j * cs + cs / 2, ay + i * cs + cs / 2 + fs * 0.36, { size: fs, align: 'center', weight: 700, color: hl ? '#fff' : C.ink2 });
        }
      });
      text(ctx, '×', gx[1] - s * 0.1, ay + s / 2 + 6, { size: 20, align: 'center', color: C.ink3 }); text(ctx, '=', gx[2] - s * 0.1, ay + s / 2 + 6, { size: 20, align: 'center', color: C.ink3 });
      R.c = { x: gx[2], y: ay, cs };
      const ry = h - 30; R.inv = logRail(ctx, 20, w - 20, ry, 2, 16384, [2, 16, 128, 1024, 8192], v => `${v}`, N, C.compute); R.ry = ry;
      text(ctx, 'size of a real layer’s matrix, n (drag)', 20, ry - 14, { size: 11, color: C.ink3 });
    },
  });
  fig.interact({
    hit: (x, y) => { const c = R.c; if (x > c.x && x < c.x + c.cs * n && y > c.y && y < c.y + c.cs * n) return 'cell'; if (Math.abs(y - R.ry) < 26) return 'n'; return null; },
    cursor: 'pointer',
    down(q, x, y) { this.move(q, x, y); },
    move(q, x, y) { if (q === 'cell') { const c = R.c; ci = clamp(Math.floor((y - c.y) / c.cs), 0, n - 1); cj = clamp(Math.floor((x - c.x) / c.cs), 0, n - 1); } else N = 2 ** Math.round(Math.log2(clamp(R.inv(x), 2, 16384))); paint(); },
  });
  const ro = readout(el);
  const paint = () => { const work = 2 * N ** 3, data = 3 * N * N * 2; ro.innerHTML = `${MA[ci].map((a, k) => `${a}×${MB[k][cj]}`).join(' + ')} = <b>${MC[ci][cj]}</b>. Two ${N.toLocaleString('en-GB')} × ${N.toLocaleString('en-GB')} matrices: <b>${big(work)}</b> operations on <b>${big(data)} bytes</b>, <b>${Math.round(work / data).toLocaleString('en-GB')}</b> per byte.`; fig.invalidate(); };
  hint(el, 'tap or drag across the outputs to pick one, then drag the size of the matrix.');
  paint();
}

// ---------- 2. The roofline ----------
const CHIPS = [['NVIDIA Tesla V100 SXM2', 'V100 (2017)'], ['NVIDIA A100 SXM4 80 GB', 'A100 (2020)'], ['Google TPU v4', 'TPU v4 (2021)'], ['NVIDIA H100 SXM5 80GB', 'H100 (2022)'], ['AMD Instinct MI300X', 'MI300X (2023)'], ['NVIDIA B200', 'B200 (2024)'], ['AMD Instinct MI355X', 'MI355X (2025)'], ['NVIDIA GB300 (Blackwell Ultra)', 'GB300 (2025)'], ['Google TPU v7 Ironwood', 'TPU v7 (2025)']].map(([nm, lab]) => { const h = HW2.find(x => x[1] === nm); return h && { lab, peak: h[3], bw: h[6], name: nm }; }).filter(Boolean).concat([{ lab: 'Rubin (2026)', peak: 4e15, bw: 192e11, name: 'NVIDIA VR200 (Vera Rubin)' }]);
const KERNELS = [[1 / 6, 'adding two lists'], [1, 'one token at a time'], [1365, 'big matrix multiply']];
export function roofline(el) {
  let ci = CHIPS.findIndex(c => /H100/.test(c.name)), I = 1, R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 400 : 350), label: 'A roofline chart: achievable speed against operations per byte, for real accelerators',
    draw(ctx, w, h) {
      const box = { l: 64, r: w - 16, t: 30, b: h - 56 };
      const { sx, sy } = axes(ctx, { box, x0: -1, x1: 4, y0: 11.5, y1: 15.8, xticks: [-1, 0, 1, 2, 3, 4], yticks: [12, 13, 14, 15], xfmt: v => (v < 0 ? '0.1' : `${10 ** v}`), yfmt: v => (v >= 15 ? `${10 ** (v - 15)} P` : `${10 ** (v - 12)} T`), ylabel: 'achievable FLOP/s (log)', xlabel: 'operations per byte from memory (log)', xgrid: true });
      ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip(); // V100/A100 slopes start below y0
      CHIPS.forEach((c, i) => { if (i === ci) return; const rx = L10(c.peak / c.bw); ctx.save(); ctx.globalAlpha = 0.25; line(ctx, sx(-1), sy(L10(c.bw * 0.1)), sx(rx), sy(L10(c.peak)), C.ink3, 1.5); line(ctx, sx(rx), sy(L10(c.peak)), sx(4), sy(L10(c.peak)), C.ink3, 1.5); ctx.restore(); });
      const c = CHIPS[ci], rx = L10(c.peak / c.bw);
      line(ctx, sx(-1), sy(L10(c.bw * 0.1)), sx(rx), sy(L10(c.peak)), C.memory, 3); line(ctx, sx(rx), sy(L10(c.peak)), sx(4), sy(L10(c.peak)), C.compute, 3);
      ctx.restore();
      text(ctx, `${c.lab}: ${flops(c.peak)}`, sx(4), sy(L10(c.peak)) - 8, { size: 12, align: 'right', weight: 650, color: C.compute });
      { const mx = rx - 1.6; text(ctx, `memory ${+(c.bw / 1e12).toPrecision(3)} TB/s`, sx(mx) + 10, sy(L10(c.bw * 10 ** mx)) + 18, { size: 11.5, weight: 600, color: C.memory }); }
      KERNELS.forEach(([k, s], i) => { const x = sx(L10(k)); line(ctx, x, box.b, x, box.b - 8, C.ink3, 1); text(ctx, s, x + 3, box.b - 11 - (i % 3) * 13, { size: 10, color: C.ink3 }); });
      const att = Math.min(c.peak, c.bw * I); line(ctx, sx(L10(I)), box.b, sx(L10(I)), sy(L10(att)), C.ink, 1, [3, 3]); circle(ctx, sx(L10(I)), sy(L10(att)), 10, '#fff', att < c.peak ? C.memory : C.compute, 3);
      R = { sx, box };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (x > R.box.l - 10 && y > R.box.t && y < R.box.b + 10 ? 'i' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { I = 10 ** clamp(R.sx.inv(x), -1, 4); I = +I.toPrecision(2); paint(); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Chip', value: ci, options: CHIPS.map((c, i) => ({ label: c.lab.replace(/ \(.*/, ''), value: i, name: 'rf-' + i })), onchange: v => { ci = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const c = CHIPS[ci], att = Math.min(c.peak, c.bw * I), ridge = c.peak / c.bw; ro.innerHTML = `At <b>${I.toLocaleString('en-GB')}</b> operation${I === 1 ? '' : 's'} per byte the ${c.lab.replace(/ \(.*/, '')} can reach <b>${flops(att)}</b>, ${Math.round(att / c.peak * 100) || '<1'}% of peak. ${att < c.peak ? `Memory-bound: it needs <b>${Math.round(ridge)}</b> per byte to stay busy.` : 'The arithmetic is the limit.'}`; fig.invalidate(); };
  hint(el, 'drag across the chart from “adding two lists” to “big matrix multiply”, then change the chip.');
  paint();
}

// ---------- 3. A systolic array ----------
function systolic2d(el) {
  // Output-stationary: cell (i, j) keeps C[i][j]. Input A[i][k] enters row i at tick k + i and moves one cell right per tick;
  // weight B[k][j] enters column j at tick k + j and moves one cell down per tick, so they meet in cell (i, j) at tick i + j + k.
  const n = 4, A = MA, B = MB, T = 3 * n - 2, SPEED = 1.1, Q = 1.7; // ticks per second; how many queued places show outside
  let t = 0, run = false, seen = false, R = {}, hold = 0;
  const acc = (i, j, upto) => { let s = 0; for (let k = 0; k < n; k++) if (k + i + j <= upto) s += A[i][k] * B[k][j]; return s; };
  const W = C.cyan;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round(Math.min(440, w * 1.0)) : 470), animated: true,
    label: 'A 4 by 4 systolic array: the inputs flow in from the left and the weights from the top, staggered one tick per row and column; each cell multiplies the pair that meets in it and adds the product to its total',
    step(dt) {
      if (!seen && fig.visible) { seen = true; run = true; t = 0; }
      if (!run) { if (seen) fig.opts.animated = false; return; } if (hold > 0) { hold -= dt; return; }
      t = Math.min(T + 0.999, t + dt * SPEED); if (t >= T + 0.999) { run = false; fig.opts.animated = false; } paint(); // settled: stop the loop
    },
    draw(ctx, w, h) {
      const nr = narrow(w), railH = 64, cs = Math.min(66, (w - 28) / (n + Q + 0.4), (h - railH - 36) / (n + Q + 0.4)), gw = cs * n;
      const x0 = nr ? w - 14 - gw : Math.round(w / 2 - gw / 2 + cs * Q / 2), y0 = 30 + cs * Q, ti = Math.floor(t), fr = t - ti;
      // queues: faint lanes showing where each row's inputs and each column's weights wait
      for (let i = 0; i < n; i++) { ctx.fillStyle = alpha(C.memory, 0.07); ctx.fillRect(x0 - cs * Q, y0 + i * cs + 4, cs * Q - 4, cs - 8); }
      for (let j = 0; j < n; j++) { ctx.fillStyle = alpha(W, 0.07); ctx.fillRect(x0 + j * cs + 4, y0 - cs * Q, cs - 8, cs * Q - 4); }
      text(ctx, 'inputs →', x0 - cs * Q, y0 - 8, { size: 11, color: C.memory, weight: 650 });
      text(ctx, '↓ weights', x0 + gw + 6 > w - 70 ? x0 : x0 + gw + 6, nr ? y0 - cs * Q - 10 : y0 - cs * Q + 12, { size: 11, color: W, weight: 650, align: nr ? 'left' : 'left' });
      // cells
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const k = ti - i - j, act = k >= 0 && k < n, x = x0 + j * cs, y = y0 + i * cs, sum = acc(i, j, ti), done = ti >= i + j + n - 1;
        const flash = act ? clamp(1 - (fr - 0.3) * 2.5, 0, 1) : 0;
        // colour story (T9): inputs green, weights cyan, the running sum warms yellow → orange as it fills in
        const fin = acc(i, j, 99) || 1, fill = clamp(sum / fin, 0, 1);
        rrect(ctx, x + 3, y + 3, cs - 6, cs - 6, 7); ctx.fillStyle = done ? C.heat : act ? mixc('#ffffff', C.on, 0.3 + 0.3 * flash) : mixc('#ffffff', C.on, 0.22 * fill); ctx.fill(); ctx.strokeStyle = done ? C.heat : act ? C.on : C.grid2; ctx.lineWidth = act && !done ? 2.2 : 1.3; ctx.stroke();
        text(ctx, String(sum), x + cs * 0.64, y + cs * 0.64 + 5, { size: Math.min(17, cs * 0.3), align: 'center', weight: 750, color: done ? '#fff' : sum ? C.ink : C.ink3 });
        if (act && fr < 0.6) text(ctx, `+${A[i][k] * B[k][j]}`, x + cs * 0.64, y + cs * 0.9, { size: Math.min(10, cs * 0.17), align: 'center', weight: 700, color: C.heat });
      }
      // the moving numbers: a pill at fractional position, so each one visibly slides from cell to cell
      const pill = (cx, cy, v, col, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; const r = Math.min(9.5, cs * 0.16); circle(ctx, cx, cy, r, col, '#fff', 1.5); text(ctx, String(v), cx, cy + 4, { size: Math.min(11, cs * 0.19), align: 'center', weight: 750, color: '#fff' }); ctx.restore(); };
      const fade = p => clamp((p + 2.4) / 0.5, 0, 1) * clamp((n - 0.45 - p) / 0.4, 0, 1);
      // each number rests in its cell for the first half of a tick (while the cell multiplies), then glides to the next
      // inputs glide first, weights second, so a pair never crosses paths mid-flight
      const sm = (a, b) => (fr <= a ? 0 : fr >= b ? 1 : (u => u * u * (3 - 2 * u))((fr - a) / (b - a))), ta = ti + sm(0.4, 0.7), tb = ti + sm(0.7, 1);
      for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) { const p = ta - k - i; pill(x0 + p * cs + cs * 0.62, y0 + i * cs + cs * 0.24, A[i][k], C.memory, fade(p)); }
      for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) { const p = tb - k - j; pill(x0 + j * cs + cs * 0.22, y0 + p * cs + cs * 0.62, B[k][j], W, fade(p)); }
      // time rail
      const ry = h - 26, l = 24, r = w - 24, sx = v => l + v / T * (r - l); line(ctx, l, ry, r, ry, C.grid2, 4); line(ctx, l, ry, sx(Math.min(t, T)), ry, alpha(C.time, 0.8), 4);
      for (let s = 0; s <= T; s++) line(ctx, sx(s), ry - 4, sx(s), ry + 4, C.ink3, 1);
      text(ctx, 'time, in clock ticks (drag)', l, ry - 14, { size: 11, color: C.ink3 }); text(ctx, `tick ${Math.min(ti, T)} of ${T}`, r, ry - 14, { size: 11, align: 'right', color: C.ink2, weight: 650 });
      circle(ctx, sx(Math.min(t, T)), ry, 11, '#fff', C.time, 3); R = { sx, ry, l, r };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 't' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { run = false; seen = true; t = clamp((x - R.l) / (R.r - R.l) * T, 0, T); paint(); }, up() { t = Math.round(t); paint(); } });
  const ctl = controls(el);
  button(ctl, 'Play again', () => { seen = true; t = 0; hold = 0.4; run = true; if (!isPlaying()) { t = T; run = false; } fig.opts.animated = true; fig.invalidate(); paint(); }, { kind: 'primary', name: 'sy-play' });
  const ro = readout(el);
  const paint = () => { const ti = Math.min(Math.floor(t), T); let busy = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const k = ti - i - j; if (k >= 0 && k < n) busy++; } ro.innerHTML = ti >= T ? `Done in ${T} ticks: <b>64 multiply-adds</b> from <b>32 numbers</b> read once, each used four times. The totals match the outputs above.` : `Tick ${ti}: <b>${busy}</b> of 16 cells multiplying; no cell goes back to memory.`; fig.invalidate(); };
  hint(el, 'watch the numbers march in, one tick later for each row and column, then drag the time back and forth.');
  if (!isPlaying()) { seen = true; t = T; }
  paint();
}

// Wave 8 understanding audit: a grid in time reads best flat — 2D with legible per-cell running sums (systolic3d kept in src, unused)
export function systolic(el) { systolic2d(el); }

// ---------- 4. Hiding the wait ----------
export function latencyHiding(el) {
  const CMP = 20, LAT = 400; let W = 4, R = {};
  const util = () => Math.min(1, W * CMP / (CMP + LAT));
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 330 : 290), label: 'Groups of threads on one GPU core: while one waits for memory, another computes',
    draw(ctx, w, h) {
      const l = narrow(w) ? 64 : 120, r = w - 14, top = 26, rows = Math.min(W, 12), rh = Math.min(16, (h - 130) / rows), span = 1200, sx = c => l + c / span * (r - l);
      text(ctx, 'cycles →', r, top - 8, { size: 11, align: 'right', color: C.ink3 });
      // schedule: one issue slot; warps queue round-robin
      const ready = Array(W).fill(0), busyMap = []; let c = 0;
      while (c < span) { let k = -1, best = Infinity; for (let i = 0; i < W; i++) if (ready[i] < best) { best = ready[i]; k = i; } c = Math.max(c, best); if (c >= span) break; busyMap.push([k, c]); ready[k] = c + CMP + LAT; c += CMP; }
      for (let i = 0; i < rows; i++) { const y = top + i * rh; text(ctx, `group ${i + 1}`, l - 8, y + rh * 0.75, { size: 10.5, align: 'right', color: C.ink3, small: true }); ctx.fillStyle = alpha(C.time, 0.15); ctx.fillRect(l, y + 1, r - l, rh - 2); }
      busyMap.forEach(([k, c0]) => { if (k < rows) { ctx.fillStyle = C.compute; ctx.fillRect(sx(c0), top + k * rh + 1, Math.max(1, sx(c0 + CMP) - sx(c0)), rh - 2); } });
      if (W > rows) text(ctx, `… and ${W - rows} more groups`, l, top + rows * rh + 14, { size: 11, color: C.ink3 });
      const by = top + rows * rh + 26; text(ctx, narrow(w) ? 'arithmetic' : 'arithmetic units', l - 8, by + 12, { size: 10.5, align: 'right', color: C.ink2, weight: 600, small: true });
      ctx.fillStyle = alpha(C.time, 0.15); ctx.fillRect(l, by, r - l, 16); busyMap.forEach(([, c0]) => { ctx.fillStyle = C.compute; ctx.fillRect(sx(c0), by, Math.max(1, sx(c0 + CMP) - sx(c0)), 16); });
      const ry = h - 30; R.inv = logRail(ctx, 24, w - 24, ry, 1, 64, [1, 2, 4, 8, 16, 32, 64], v => `${v}`, W, C.compute); R.ry = ry;
      text(ctx, 'groups of threads on the core (drag)', 24, ry - 14, { size: 11, color: C.ink3 });
    },
  });
  fig.interact({ hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'w' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { W = clamp(Math.round(R.inv(x)), 1, 64); paint(); } });
  const ro = readout(el);
  const paint = () => { ro.innerHTML = `<b>${W}</b> group${W > 1 ? 's' : ''} of threads keep the arithmetic busy <b>${Math.round(util() * 100)}%</b> of the time; ${Math.ceil((CMP + LAT) / CMP)} cover the ${LAT}-cycle wait completely.`; fig.invalidate(); };
  hint(el, 'drag the number of thread groups up until the arithmetic row is solid blue.');
  paint();
}

// ---------- 5. Fewer bits ----------
const FMT = [
  { k: 'fp32', label: 'FP32', e: 8, m: 23, max: 3.4e38 }, { k: 'bf16', label: 'BF16', e: 8, m: 7, max: 3.39e38 }, { k: 'fp16', label: 'FP16', e: 5, m: 10, max: 65504 },
  { k: 'fp8', label: 'FP8 (E4M3)', e: 4, m: 3, max: 448 }, { k: 'fp4', label: 'FP4 (E2M1)', e: 2, m: 1, max: 6 },
];
const roundTo = (x, f) => { if (x === 0) return 0; const bias = 2 ** (f.e - 1) - 1, emin = 1 - bias, ex = Math.max(Math.floor(Math.log2(Math.abs(x))), emin), step = 2 ** (ex - f.m); return Math.sign(x) * Math.min(f.max, Math.round(Math.abs(x) / step) * step); };
export function precisionBits(el) {
  let fi = 3, x = 2.7, R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 250 : 230), label: 'A number line from 0 to 8 with a tick for every value a number format can store; drag a value and see where it rounds to',
    draw(ctx, w, h) {
      const f = FMT[fi], l = 20, r = w - 20, y = 90, sx = v => l + v / 8 * (r - l);
      line(ctx, l, y, r, y, C.ink3, 1.5);
      let cnt = 0; if (f.m < 7) { for (let e = -12; e <= 3; e++) for (let k = 0; k < 2 ** f.m; k++) { const v = (1 + k / 2 ** f.m) * 2 ** e; if (v <= 8 && v <= f.max && roundTo(v, f) === v) { line(ctx, sx(v), y - 9, sx(v), y + 9, C.compute, 1); cnt++; } } }
      else { ctx.fillStyle = alpha(C.compute, 0.6); ctx.fillRect(l, y - 9, r - l, 18); }
      [0, 1, 2, 4, 6, 8].forEach(v => text(ctx, `${v}`, sx(v), y + 28, { size: 11, align: 'center', color: C.ink3 }));
      const q = roundTo(x, f);
      circle(ctx, sx(x), y - 34, 10, '#fff', C.heat, 3); line(ctx, sx(x), y - 24, sx(q), y - 4, C.heat, 1.5);
      text(ctx, `${x.toFixed(3)} → ${+q.toPrecision(6)}`, clamp(sx(x), 70, w - 70), y - 52, { size: 12.5, align: 'center', weight: 700, color: C.ink });
      if (f.m >= 7) text(ctx, 'too many values to draw', r, y - 16, { size: 10.5, align: 'right', color: C.ink3 });
      const ey = h - 14, eh = h - y - 64, worst = 2 ** -(f.m + 1); text(ctx, `rounding error, 0 to ${sig(100 * worst, 2)}% (normal range)`, l, ey - eh - 6, { size: 10.5, color: C.ink3 });
      ctx.save(); ctx.fillStyle = alpha(C.heat, 0.35); ctx.beginPath(); ctx.moveTo(l, ey); for (let i = 1; i <= 800; i++) { const v = i / 100, e = Math.abs(roundTo(v, f) - v) / v; ctx.lineTo(sx(v), ey - Math.min(1, e / worst) * eh); } ctx.lineTo(r, ey); ctx.closePath(); ctx.fill(); ctx.restore(); line(ctx, l, ey, r, ey, C.grid2, 1);
      R = { sx, y, l, r };
    },
  });
  fig.interact({ hit: (px, py) => (py < R.y + 30 ? 'x' : null), cursor: 'ew-resize', down(q, px) { this.move(q, px); }, move(q, px) { x = clamp((px - R.l) / (R.r - R.l) * 8, 0, 8); paint(); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Number format', value: fi, options: FMT.map((f, i) => ({ label: f.label, value: i, name: 'pb-' + f.k })), onchange: v => { fi = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const f = FMT[fi], q = roundTo(x, f), err = x ? Math.abs(q - x) / x : 0, bits = 1 + f.e + f.m, mul = ((f.m + 1) / 24) ** 2; ro.innerHTML = `<b>${f.label}</b> (${bits} bits: 1 sign, ${f.e} exponent, ${f.m} digits) stores it with <b>${sig(err * 100, 2)}%</b> error (up to about ${sig(100 / 2 ** (f.m + 1), 2)}% in the normal range; the tiniest values, below it, can do worse); its multiplier is about <b>${mul >= 0.1 ? Math.round(mul * 100) : (mul * 100).toFixed(1)}%</b> of a 32-bit one.`; fig.invalidate(); };
  hint(el, 'drag the orange value along the line, then try fewer bits.');
  paint();
}

// ---------- 6. Arithmetic is cheap, fetching is not — die map (CIECH #7 lean) ----------
// Horowitz ISSCC 2014 via Han et al. 2015 (32-bit): DRAM 640 pJ, SRAM 5 pJ, float mul 3.7 / add 0.9.
// Horowitz's 640 pJ is 45 nm-era off-package DRAM, not HBM. HBM2 ≈ 3.97 pJ/bit ≈ 127 pJ per 32-bit word:
// M. O'Connor et al., "Fine-Grained DRAM", MICRO 2017, §1 ("approximately 3.97 pJ/bit"). NVLink: bandwidth only (Epoch), no invented pJ.
// Modern bridge: H100 SXM ≈ 700 W / 989 TFLOP/s BF16 (Epoch, note 2) ≈ 0.7 pJ/FLOP all-in vs 16 bits × 3.97 pJ/bit ≈ 64 pJ per HBM number.
const EN = [
  ['32-bit integer add', 0.1, 'alu'],
  ['32-bit float add', 0.9, 'alu'],
  ['32-bit float multiply', 3.7, 'alu'],
  ['32-bit on-chip SRAM read', 5, 'sram'],
  ['32-bit off-chip DRAM read', 640, 'dram'],
];
// Wave 9 understanding audit: energy-vs-distance is a plan-view map + a magnitude bar, not a 3D object (package3d kept in src, unused)
export function dataDistance(el) { dataDistance2d(el); }
// shared plan-view package map (same parts/colours as the 3D package: blue die, yellow register, green SRAM/HBM, violet NVLink pads)
function pkgMap(ctx, x, y, w, h, o = {}) {
  rrect(ctx, x, y, w, h, 9); ctx.fillStyle = '#efefed'; ctx.fill(); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.2; ctx.stroke();
  const dieW = w * 0.42, dieH = h * 0.5, dx = x + (w - dieW) / 2, dy = y + h * 0.16;
  rrect(ctx, dx, dy, dieW, dieH, 6); ctx.fillStyle = mixc('#ffffff', C.compute, 0.22); ctx.fill(); ctx.strokeStyle = C.compute; ctx.lineWidth = 1.5; ctx.stroke();
  const sr = { x: dx + 6, y: dy + dieH * 0.64, w: dieW - 12, h: dieH * 0.26 };
  rrect(ctx, sr.x, sr.y, sr.w, sr.h, 4); ctx.fillStyle = mixc('#ffffff', C.memory, 0.38); ctx.fill(); ctx.strokeStyle = C.memory; ctx.lineWidth = 1; ctx.stroke();
  const reg = { x: dx + dieW / 2, y: dy + dieH * 0.34, r: Math.max(7, Math.min(14, w * 0.035)) };
  circle(ctx, reg.x, reg.y, reg.r, C.on, C.ink2, 1.2);
  const hbW = Math.max(14, w * 0.11), hbH = dieH * 0.82, hy = dy + (dieH - hbH) / 2, gap = Math.max(6, w * 0.03);
  const hb = [dx - gap - hbW, dx + dieW + gap].map(hx => { rrect(ctx, hx, hy, hbW, hbH, 3); ctx.fillStyle = mixc('#ffffff', C.memory, 0.72); ctx.fill(); ctx.strokeStyle = C.memory; ctx.lineWidth = 1.2; ctx.stroke(); for (let k = 1; k < 4; k++) line(ctx, hx + 3, hy + k * hbH / 4, hx + hbW - 3, hy + k * hbH / 4, alpha('#ffffff', 0.7), 1); return { x: hx, y: hy, w: hbW, h: hbH }; });
  const nv = { x: x + w * 0.2, y: y + h - h * 0.16, w: w * 0.6, h: Math.max(10, h * 0.08) };
  rrect(ctx, nv.x, nv.y, nv.w, nv.h, 3); ctx.fillStyle = mixc('#ffffff', C.violet, 0.45); ctx.fill(); ctx.strokeStyle = C.violet; ctx.lineWidth = 1.1; ctx.stroke();
  if (o.labels) {
    const fs = o.fs || 11;
    text(ctx, 'reg', reg.x, reg.y + 4, { size: fs - 1.5, align: 'center', weight: 700, color: C.ink });
    text(ctx, 'SRAM', sr.x + sr.w / 2, sr.y + sr.h / 2 + 4, { size: fs - 1, align: 'center', weight: 700, color: C.memory });
    text(ctx, 'HBM', hb[1].x + hb[1].w / 2, hb[1].y - 6, { size: fs - 1, align: 'center', weight: 700, color: C.memory });
    text(ctx, 'NVLink', nv.x + nv.w / 2, nv.y + nv.h / 2 + 4, { size: fs - 1.5, align: 'center', weight: 700, color: C.violet });
    text(ctx, o.title || 'logic die', dx + dieW / 2, dy + 13, { size: fs - 1, align: 'center', weight: 700, color: C.compute });
  }
  return { reg, sr, hb, nv, die: { x: dx, y: dy, w: dieW, h: dieH } };
}
function dataDistance2d(el) {
  let reuse = 1, R = {}, tPulse = 0;
  const MAC = 4.6 /* 3.7 mul + 0.9 add */, SRAM = 5, DRAM = 640, HBM = 127 /* 3.97 pJ/bit × 32, O'Connor 2017 */;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 520 : 400), animated: true,
    label: 'A GPU package seen from above, and bars of the energy to do one multiply-add versus fetching its number from SRAM or from HBM memory',
    step(dt) { tPulse += dt; },
    draw(ctx, w, h) {
      const nr = narrow(w), pad = 14;
      // left (or top): plan-view map with a number travelling reg → SRAM → HBM
      const mw = nr ? w - 2 * pad : Math.min(300, w * 0.4), mh = nr ? 190 : h - 70, mx = pad, my = 8;
      const M = pkgMap(ctx, mx, my, mw, mh, { labels: true });
      const P = [[M.hb[1].x + M.hb[1].w / 2, M.hb[1].y + M.hb[1].h / 2], [M.sr.x + M.sr.w * 0.8, M.sr.y + M.sr.h / 2], [M.reg.x, M.reg.y]];
      for (let i = 0; i < 2; i++) line(ctx, P[i][0], P[i][1], P[i + 1][0], P[i + 1][1], alpha(C.memory, 0.6), 2, [5, 4]);
      const u = (tPulse * 0.45) % 1, sg = u < 0.5 ? 0 : 1, f = (u - sg * 0.5) * 2;
      circle(ctx, P[sg][0] + (P[sg + 1][0] - P[sg][0]) * f, P[sg][1] + (P[sg + 1][1] - P[sg][1]) * f, 5, C.heat, '#fff', 1.5);
      // right (or below): energy bars, linear in pJ, so the gap is seen not read
      const bl = nr ? pad + 6 : mx + mw + 28, br = w - pad - 6, bt = nr ? my + mh + 26 : 26, rows = 5, rh = nr ? 46 : (h - 70 - bt) / rows;
      const sx = v => bl + Math.min(1, v / DRAM) * (br - bl);
      text(ctx, 'energy, picojoules (linear)', bl, bt - 10, { size: 11, color: C.ink3 });
      const bar = (k, segs, label, val) => {
        const y = bt + k * rh + 14, bh = Math.min(16, rh * 0.36); let x = bl;
        ctx.fillStyle = alpha(C.ink3, 0.08); ctx.fillRect(bl, y, br - bl, bh);
        segs.forEach(([v, col]) => { const ww = Math.max(2, sx(v) - bl); rrect(ctx, x, y, ww, bh, 3); ctx.fillStyle = col; ctx.fill(); x += ww; });
        text(ctx, label, bl, y - 4, { size: 11.5, weight: 650, color: C.ink2 });
        // a bar that reaches the end gets its value on the label line, right-aligned, instead of printed over the bar's tip
        if (x + 60 > br) text(ctx, val, br, y - 4, { size: 11.5, weight: 750, color: C.ink, align: 'right' });
        else text(ctx, val, x + 6, y + bh - 3, { size: 11.5, weight: 750, color: C.ink, halo: 3 });
      };
      bar(0, [[MAC, C.compute]], 'one multiply-add (32-bit float)', `${MAC} pJ`);
      bar(1, [[SRAM, C.memory]], 'fetch a number from on-chip SRAM', `${SRAM} pJ`);
      bar(2, [[HBM, mixc(C.memory, '#1f4f22', 0.12)]], 'fetch it from HBM2 beside the die (O’Connor 2017)', `≈${HBM} pJ`);
      bar(3, [[DRAM, mixc(C.memory, '#1f4f22', 0.25)]], 'fetch it from off-chip DRAM, 45 nm (Horowitz)', `${DRAM} pJ`);
      bar(4, [[MAC, C.compute], [DRAM / reuse, alpha(C.memory, 0.75)]], `multiply-add, its DRAM fetch shared ${reuse}×`, `${+(MAC + DRAM / reuse).toPrecision(3)} pJ`);
      const ry = h - 26; R.inv = logRail(ctx, 24, w - 24, ry, 1, 1000, [1, 10, 100, 1000], v => `${v}×`, reuse, C.memory); R.ry = ry;
      text(ctx, 'times each fetched number is reused (drag)', 24, ry - 14, { size: 11, color: C.ink3 });
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'r' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { reuse = Math.round(clamp(R.inv(x), 1, 1000)); paint(); } });
  const ro = readout(el);
  const paint = () => { const memE = DRAM / reuse, tot = MAC + memE; ro.innerHTML = `Fetching a number from 45 nm off-chip <b class="c-green">DRAM</b> costs <b>${Math.round(DRAM / MAC)}×</b> the multiply-add it feeds; from HBM2, about <b>${Math.round(HBM / MAC)}×</b>. Arithmetic has shrunk too: an H100 spends ≈0.7 pJ per 16-bit operation against ≈60 pJ to fetch a 16-bit number from HBM, so the gap is still near 100×. Reused <b>${reuse}×</b>, the fetch is <b>${Math.round(memE / tot * 100)}%</b> of each multiply-add’s energy (Horowitz 45 nm via Han et al. 2015).`; fig.invalidate(); };
  hint(el, 'drag reuse up until the green fetch shrinks below the blue arithmetic.');
  paint();
}
// Wave 9 understanding audit: two package maps and one link — the lesson is the hop and its bandwidth, which reads flat (nvlinkpair3d kept in src, unused)
function nvlinkPair2d(el) {
  let gb = 80, R = {}, tPulse = 0; const BW = 450; // GB/s one way = half of Epoch's 900 GB/s H100 SXM5 intranode figure (both directions)
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 330 : 300), animated: true,
    label: 'Two GPU packages seen from above, joined by an NVLink: a block of data crosses from one package to the other at 450 gigabytes per second each way (900 counting both directions)',
    step(dt) { tPulse += dt; },
    draw(ctx, w, h) {
      const nr = narrow(w), pad = 14, gap = nr ? 34 : Math.max(70, w * 0.16), pw = (w - 2 * pad - gap) / 2, ph = h - 92, py = 10;
      const A = pkgMap(ctx, pad, py, pw, ph, { labels: true, title: 'GPU A', fs: nr ? 10 : 11 }), B = pkgMap(ctx, pad + pw + gap, py, pw, ph, { labels: true, title: 'GPU B', fs: nr ? 10 : 11 });
      // the link: out of A's NVLink pads, across the board, into B's
      const ax = A.nv.x + A.nv.w, ay = A.nv.y + A.nv.h / 2, bx = B.nv.x, by = B.nv.y + B.nv.h / 2, yl = py + ph + 14;
      ctx.save(); ctx.strokeStyle = C.violet; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax - 8, ay + A.nv.h / 2); ctx.lineTo(ax - 8, yl); ctx.lineTo(bx + 8, yl); ctx.lineTo(bx + 8, by + B.nv.h / 2); ctx.stroke(); ctx.restore();
      text(ctx, 'NVLink · 900 GB/s total, 450 each way', (ax + bx) / 2, yl + 16, { size: 11.5, align: 'center', weight: 700, color: C.violet });
      // packets: density ∝ how much is queued; each takes the same trip
      const n = clamp(Math.round(2 + L10(gb) * 2), 1, 12), L = (yl - ay) * 2 + (bx - ax + 16);
      for (let k = 0; k < n; k++) { let d = ((tPulse * 0.35 + k / n) % 1) * L; let px, pyy; const v1 = yl - (ay + A.nv.h / 2);
        if (d < v1) { px = ax - 8; pyy = ay + A.nv.h / 2 + d; } else if (d < v1 + (bx - ax + 16)) { px = ax - 8 + (d - v1); pyy = yl; } else { px = bx + 8; pyy = yl - (d - v1 - (bx - ax + 16)); }
        circle(ctx, px, pyy, 4.5, C.heat, '#fff', 1.3); }
      const ry = h - 22; R.inv = logRail(ctx, 24, w - 24, ry, 0.001, 1000, [0.001, 0.1, 10, 1000], v => (v < 1 ? `${v * 1000} MB` : `${v} GB`), gb, C.violet); R.ry = ry;
      text(ctx, 'data to move between the two GPUs (drag)', 24, ry - 14, { size: 11, color: C.ink3 });
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'g' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { gb = +clamp(R.inv(x), 0.001, 1000).toPrecision(2); paint(); } });
  const ro = readout(el);
  const fmtT = s => (s < 1e-3 ? `${+(s * 1e6).toPrecision(2)} µs` : s < 1 ? `${+(s * 1e3).toPrecision(2)} ms` : `${+s.toPrecision(2)} s`);
  const paint = () => { ro.innerHTML = `Moving <b>${gb < 1 ? `${+(gb * 1000).toPrecision(2)} MB` : `${gb} GB`}</b> from GPU A to GPU B over <b class="c-violet">NVLink</b> at 450 GB/s each way (half Epoch’s 900 GB/s total) takes at least <b>${fmtT(gb / BW)}</b>: every number that leaves a package pays this hop. Scale-out below counts many such hops.`; fig.invalidate(); };
  hint(el, 'drag the amount of data and watch the time to cross the link.');
  paint();
}
export function nvlinkPair(el) { nvlinkPair2d(el); }

// ---------- 7. Splitting one job over many GPUs ----------
export function scaleOut(el) {
  // ring all-reduce runs at one-way bandwidth: NVL = half Epoch's 900 GB/s (both directions together);
  // IB = each GPU's own 400 Gb/s NIC in a DGX H100 (docs.nvidia.com/dgx/dgxh100-user-guide) = 50 GB/s
  const H = HW2.find(x => /H100 SXM5/.test(x[1])), PEAK = H[3], NVL = H[7] / 2, IB = H[8] / 8; // bytes/s
  const P = 7e9, TOK = 4e6, MFU = 0.4, T1 = 6 * P * TOK / (PEAK * MFU), G = 2 * P; // one step on one GPU, s; gradient bytes
  let N = 64, R = {};
  const step = n => { const bw = n <= 8 ? NVL : IB, comm = n > 1 ? 2 * (n - 1) / n * G / bw : 0; return { comp: T1 / n, comm }; };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 330 : 290), label: 'Time for one training step split over more GPUs: computing shrinks, exchanging results does not',
    draw(ctx, w, h) {
      const box = { l: 56, r: w - 16, t: 30, b: h - 84 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 10, y0: 0, y1: 3.2, xticks: [0, 3, 6, 10], yticks: [0, 1, 2, 3], xfmt: v => `${2 ** v}`, yfmt: v => `${10 ** v}×`, ylabel: 'speed-up over one GPU (log)', xlabel: 'GPUs (log)' });
      const ys = v => sy(L10(v));
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = C.ink3; ctx.beginPath(); ctx.moveTo(sx(0), ys(1)); ctx.lineTo(sx(10), ys(1024)); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.strokeStyle = C.compute; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 100; i++) { const lg = i / 10, n = 2 ** lg, s = step(n), sp = T1 / (s.comp + s.comm); i ? ctx.lineTo(sx(lg), ys(sp)) : ctx.moveTo(sx(lg), ys(sp)); } ctx.stroke(); ctx.restore();
      text(ctx, 'perfect', sx(9.2), ys(2 ** 9.2) - 8, { size: 11, color: C.ink3, align: 'right' });
      const s = step(N), sp = T1 / (s.comp + s.comm); circle(ctx, sx(Math.log2(N)), ys(sp), 9, '#fff', C.compute, 3);
      // bar of the step
      const by = h - 46, tot = s.comp + s.comm, bw = box.r - box.l; text(ctx, 'one step:', box.l - 6, by + 13, { size: 11, align: 'right', color: C.ink3 });
      rrect(ctx, box.l, by, bw * s.comp / tot, 18, 4); ctx.fillStyle = C.compute; ctx.fill(); if (s.comm) { rrect(ctx, box.l + bw * s.comp / tot, by, bw * s.comm / tot, 18, 4); ctx.fillStyle = C.memory; ctx.fill(); }
      text(ctx, 'computing', box.l + 4, by + 32, { size: 10.5, color: C.compute, weight: 600 }); if (s.comm) text(ctx, 'exchanging', box.r, by + 32, { size: 10.5, color: C.memory, weight: 600, align: 'right' });
      R = { sx, box };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (y > R.box.t && y < R.box.b + 20 ? 'n' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { N = 2 ** clamp(Math.round(R.sx.inv(x)), 0, 10); paint(); } });
  const ro = readout(el);
  const paint = () => { const s = step(N), sp = T1 / (s.comp + s.comm); ro.innerHTML = N === 1 ? `On <b>1</b> GPU one step takes ${sig(s.comp, 2)} s, all computing: nobody to exchange gradients with.` : `<b>${N.toLocaleString('en-GB')}</b> GPUs: ${sig(s.comp, 2)} s computing + ${sig(s.comm, 2)} s swapping gradients ${N <= 8 ? 'over NVLink' : 'between servers'}, <b>${Math.round(sp)}×</b> one GPU (${Math.round(sp / N * 100)}% of perfect).`; fig.invalidate(); };
  hint(el, 'drag along the GPU count; watch the step bar turn green past eight GPUs.');
  paint();
}
