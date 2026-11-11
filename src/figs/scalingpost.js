// Scaling: power law -> three knobs -> tokens per parameter -> frontier slope -> data wall -> training bill -> inference.
import { Fig, isPlaying, onPlayChange } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, line, circle, clamp, axes, rrect, measure } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint } from '../lib/ui.js';
import { MODELS, LANG } from '../lib/aidata.js';
import { K, gpuHoursPerMWh } from '../lib/constants.js';

const narrow = w => w < 560;
const UI3D = { C, controls, slider, button, readout, hint, isPlaying, onPlayChange };
const L10 = Math.log10;
const sup = n => String(n).replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).replace('-', '⁻');
const e10 = v => `10${sup(v)}`;
const sci = lg => { const e = Math.floor(lg + 1e-9), m = 10 ** (lg - e); return `${m.toFixed(1)} × 10${sup(e)}`; };
const big = v => (v >= 1e15 ? `${Math.round(v / 1e12).toLocaleString('en-GB')} trillion` : v >= 1e12 ? `${+(v / 1e12).toPrecision(3)} trillion` : v >= 1e9 ? `${+(v / 1e9).toPrecision(3)} billion` : v >= 1e6 ? `${+(v / 1e6).toPrecision(3)} million` : Math.round(v).toLocaleString('en-GB'));
const eur = v => (v >= 1e9 ? `$${+(v / 1e9).toPrecision(3)} billion` : v >= 1e6 ? `$${+(v / 1e6).toPrecision(3)} million` : v >= 1e3 ? `$${Math.round(v / 1e3).toLocaleString('en-GB')} thousand` : `$${Math.round(v)}`);
const fitLS = pts => { const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length, my = pts.reduce((s, p) => s + p[1], 0) / pts.length; const b = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0) / pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0); return { b, f: x => my + b * (x - mx) }; };
// Parametric loss fits L(N, D) = E + A/N^a + B/D^b
export const FITS = {
  hoffmann: { E: 1.69, A: 406.4, B: 410.7, a: 0.34, b: 0.28, name: 'Hoffmann et al. 2022' },
  besiroglu: { E: 1.8172, A: 482.01, B: 2085.43, a: 0.3478, b: 0.3658, name: 'Besiroglu et al. 2024 replication' },
};
const loss = (F, N, D) => F.E + F.A / N ** F.a + F.B / D ** F.b;
const optimum = (F, Cf) => { let best = null; for (let lg = 6; lg <= 14; lg += 0.01) { const N = 10 ** lg, D = Cf / (6 * N), Lv = loss(F, N, D); if (!best || Lv < best.L) best = { N, D, L: Lv }; } return best; };
const railLog = (ctx, l, r, y, lo, hi, val, color, ticks, fmt) => { const x = v => l + (v - lo) / (hi - lo) * (r - l); line(ctx, l, y, r, y, C.grid2, 4); ticks.forEach((v, i) => { const px = x(v); line(ctx, px, y - 4, px, y + 4, C.ink3, 1); const al = i === 0 ? 'left' : i === ticks.length - 1 ? 'right' : 'center'; text(ctx, fmt(v), px, y + 18, { size: 11.5, align: al, color: C.ink3 }); }); circle(ctx, x(val), y, 11, '#fff', color, 3); return px => lo + (px - l) / (r - l) * (hi - lo); };

// ---------- 1. A straight line on a log plot ----------
export function powerLaw(el) {
  const F = FITS.hoffmann; let logC = 23, logAx = true, R = {};
  const pts = []; for (let lc = 18; lc <= 26.01; lc += 0.25) pts.push([lc, optimum(F, 10 ** lc).L]);
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 320 : 290), label: 'Predicted loss of compute-optimal language models against training compute, on linear or logarithmic axes',
    draw(ctx, w, h) {
      const box = { l: 58, r: w - 16, t: 30, b: h - 40 };
      if (logAx) {
        const { sx, sy } = axes(ctx, { box, x0: 18, x1: 26, y0: L10(0.08), y1: L10(4), xticks: [18, 20, 22, 24, 26], yticks: [L10(0.1), L10(0.3), L10(1), L10(3)], xfmt: e10, yfmt: v => `${+(10 ** v).toPrecision(1)}`, ylabel: 'loss above floor E (log)', xlabel: 'training compute, FLOP (log)' });
        ctx.save(); ctx.strokeStyle = C.learn; ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(sx(x), sy(L10(y - F.E))) : ctx.moveTo(sx(x), sy(L10(y - F.E))))); ctx.stroke(); ctx.restore();
        const o = optimum(F, 10 ** logC); circle(ctx, sx(logC), sy(L10(o.L - F.E)), 9, '#fff', C.learn, 3); R = { inv: sx.inv, box };
      } else {
        const { sx, sy } = axes(ctx, { box, x0: 0, x1: 1e26, y0: 1.6, y1: 4.2, xticks: [0, 5e25, 1e26], yticks: [2, 3, 4], xfmt: v => (v ? sci(L10(v)) : '0'), yfmt: v => `${v}`, ylabel: 'loss', xlabel: 'training compute, FLOP (linear)' });
        line(ctx, box.l, sy(F.E), box.r, sy(F.E), C.ink3, 1, [4, 4]); text(ctx, `floor E = ${F.E} nats/token`, box.r, sy(F.E) - 6, { size: 11, align: 'right', color: C.ink3 });
        ctx.save(); ctx.strokeStyle = C.learn; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const c = 1e18 + i / 200 * 1e26, o = optimum(F, c); i ? ctx.lineTo(sx(c), sy(o.L)) : ctx.moveTo(sx(c), sy(o.L)); } ctx.stroke(); ctx.restore();
        const o = optimum(F, 10 ** logC); circle(ctx, sx(10 ** logC), sy(o.L), 9, '#fff', C.learn, 3); R = { inv: x => L10(Math.max(1e18, sx.inv(x))), box };
      }
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (x > R.box.l - 10 && y > R.box.t - 10 && y < R.box.b + 10 ? 'c' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { logC = clamp(R.inv(x), 18, 26); paint(); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Axes', value: true, options: [{ label: 'logarithmic', value: true, name: 'pl-log' }, { label: 'linear', value: false, name: 'pl-lin' }], onchange: v => { logAx = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const o = optimum(F, 10 ** logC), o10 = optimum(F, 10 ** (logC + 1)); ro.innerHTML = `<b>${sci(logC)}</b> FLOP, best spent: loss <b>${o.L.toFixed(3)}</b>. Ten times more removes <b>${Math.round((1 - (o10.L - F.E) / (o.L - F.E)) * 100)}%</b> of what is left above the ${F.E} floor${logAx ? ', at every scale' : ''}.`; fig.invalidate(); };
  hint(el, 'drag along the curve, then switch the axes to linear.');
  paint();
}

// ---------- 2. Three knobs: parameters against tokens at fixed compute ----------
export function threeKnobs(el) {
  let fk = 'hoffmann', logC = Math.log10(5.76e23), logN = Math.log10(70e9), R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 380 : 340), label: 'For a fixed compute budget, predicted loss against model size: too small and too large are both worse',
    draw(ctx, w, h) {
      const F = FITS[fk], Cf = 10 ** logC, box = { l: 52, r: w - 16, t: 30, b: h - 100 };
      const curve = []; for (let lg = 8; lg <= 13.01; lg += 0.02) curve.push([lg, loss(F, 10 ** lg, Cf / (6 * 10 ** lg))]);
      const ys = curve.map(p => p[1]), lo = Math.min(...ys), hi = Math.min(lo + 1.2, Math.max(...ys));
      const { sx, sy } = axes(ctx, { box, x0: 8, x1: 13, y0: lo - 0.05, y1: hi, xticks: [8, 9, 10, 11, 12, 13], xfmt: v => (v >= 12 ? `${10 ** (v - 12)}T` : v >= 9 ? `${10 ** (v - 9)}B` : `${10 ** (v - 6)}M`), yfmt: v => v.toFixed(1), ny: 4, ylabel: 'predicted loss', xlabel: 'parameters (log); tokens = budget ÷ (6 × parameters)' });
      ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 4, box.r - box.l, box.b - box.t + 4); ctx.clip(); ctx.strokeStyle = C.learn; ctx.lineWidth = 2.5; ctx.beginPath(); curve.forEach(([x, y], i) => (i ? ctx.lineTo(sx(x), sy(y)) : ctx.moveTo(sx(x), sy(y)))); ctx.stroke(); ctx.restore();
      const o = optimum(F, Cf); circle(ctx, sx(L10(o.N)), sy(o.L), 6, C.learn); text(ctx, 'best', sx(L10(o.N)), sy(o.L) + 18, { size: 11, align: 'center', color: C.learn, weight: 650 });
      const N = 10 ** logN, Lv = loss(F, N, Cf / (6 * N)); circle(ctx, sx(logN), sy(Math.min(Lv, hi)), 10, '#fff', C.learn, 3);
      const ry = h - 30; R.cinv = railLog(ctx, 20, w - 20, ry, 20, 26, logC, C.compute, [20, 22, 24, 26], v => `${e10(v)} FLOP`); R.ry = ry;
      text(ctx, 'compute budget (drag)', 20, ry - 14, { size: 11, color: C.ink3 });
      R.sx = sx; R.box = box;
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (Math.abs(y - R.ry) < 26 ? 'c' : y > R.box.t - 10 && y < R.box.b + 10 ? 'n' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { if (q === 'c') logC = clamp(R.cinv(x), 20, 26); else logN = clamp(R.sx.inv(x), 8, 13); paint(); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Fit', value: fk, options: [{ label: 'Hoffmann 2022', value: 'hoffmann', name: 'tk-h' }, { label: 'replication 2024', value: 'besiroglu', name: 'tk-b' }], onchange: v => { fk = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const F = FITS[fk], Cf = 10 ** logC, o = optimum(F, Cf), N = 10 ** logN, D = Cf / (6 * N); ro.innerHTML = `Yours: <b>${big(N)}</b> parameters on <b>${big(D)}</b> tokens (${D / N >= 100 ? Math.round(D / N).toLocaleString('en-GB') : D / N >= 0.001 ? (D / N).toLocaleString('en-GB', { maximumSignificantDigits: 2 }) : 'under 0.001'} each), loss ${loss(F, N, D).toFixed(3)}. Best: <b>${big(o.N)}</b> on ${big(o.D)}, <b>${Math.round(o.D / o.N)} per parameter</b>, loss ${o.L.toFixed(3)}.`; fig.invalidate(); };
  hint(el, 'drag your model along the valley, then change the budget.');
  paint();
}

// ---------- 3. Tokens per parameter in real models ----------
// Wave 8 understanding audit: the ratio is a number on an axis; real models vs the 20:1 line teaches more than cube piles
export function tokensPerParam(el) { tokensPerParam2d(el); }
function tokensPerParam2d(el) {
  const pts = LANG.filter(m => m[4] && m[5] && m[0] >= 2017 && m[5] / m[4] >= 0.1).map(m => ({ y: m[0], r: m[5] / m[4], nm: m[1], ctry: m[3] }));
  let sel = pts.findIndex(p => /Chinchilla/.test(p.nm)), R = {};
  // median of each calendar year with at least five models (geometric mean of the middle two when the count is even)
  const MED = {};
  for (let y = 2017; y <= 2026; y++) { const a = pts.filter(p => Math.floor(p.y) === y).map(p => p.r).sort((u, v) => u - v), k = a.length; if (k >= 5) MED[y] = { m: k % 2 ? a[(k - 1) / 2] : Math.sqrt(a[k / 2 - 1] * a[k / 2]), n: k, over: a.filter(r => r > 20).length / k }; }
  const fmtR = r => (r >= 10 ? String(Math.round(r)) : r.toPrecision(2));
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 330 : 300), label: 'Training tokens per parameter of notable language models, 2017 to 2026, on a log scale',
    draw(ctx, w, h) {
      const box = { l: 48, r: w - 16, t: 30, b: h - 36 };
      const { sx, sy } = axes(ctx, { box, x0: 2017, x1: 2026.5, y0: -1, y1: 4, yticks: [-1, 0, 1, 2, 3, 4], yfmt: v => `${+(10 ** v).toPrecision(1)}`, ylabel: 'training tokens per parameter (log)' });
      line(ctx, box.l, sy(L10(20)), box.r, sy(L10(20)), C.learn, 1.5, [5, 4]); { // the label sits above the line unless the selected model's label would land on it
        const ol = narrow(w) ? '20: optimal' : 'about 20: compute-optimal', p0 = pts[sel], sl = `${p0.nm}: ${p0.r >= 10 ? Math.round(p0.r) : p0.r.toPrecision(2)}`;
        const slw = measure(ctx, sl, 12, 700), slx = clamp(sx(p0.y), 80, w - 80), sly = sy(clamp(L10(p0.r), -1, 4)) - 12, olw = measure(ctx, ol, 11, 600), oy = sy(L10(20)) - 6;
        const hitsSel = slx - slw / 2 < box.l + 6 + olw + 4 && slx + slw / 2 > box.l + 2 && Math.abs(sly - oy) < 16;
        text(ctx, ol, box.l + 6, hitsSel ? sy(L10(20)) + 15 : oy, { size: 11, color: C.learn, weight: 600, halo: true }); }
      pts.forEach((p, i) => circle(ctx, sx(p.y), sy(clamp(L10(p.r), -1, 4)), i === sel ? 7 : 3.5, i === sel ? C.learn : alpha(C.compute, 0.55), i === sel ? '#fff' : null, 2));
      // the median of each year, as a step: the trend the cloud hides
      const ys = Object.keys(MED).map(Number), selY = Math.floor(pts[sel].y);
      ctx.save(); ctx.lineCap = 'round';
      ys.forEach((y, k) => { const yy = sy(L10(MED[y].m)), x0 = sx(y), x1 = sx(Math.min(y + 1, 2026.5)); line(ctx, x0, yy, x1, yy, '#fff', 6); line(ctx, x0, yy, x1, yy, C.ink, y === selY ? 3.5 : 2.5); if (k + 1 < ys.length && ys[k + 1] === y + 1) line(ctx, x1, yy, x1, sy(L10(MED[y + 1].m)), C.ink, 1.5); });
      ctx.restore();
      text(ctx, 'median of each year', sx(ys[0]) + 2, sy(L10(MED[ys[0]].m)) + 16, { size: 11, weight: 650, color: C.ink, halo: 3 });
      const p = pts[sel]; text(ctx, `${p.nm}: ${p.r >= 10 ? Math.round(p.r) : p.r.toPrecision(2)}`, clamp(sx(p.y), 80, w - 80), sy(clamp(L10(p.r), -1, 4)) - 12, { size: 12, align: 'center', weight: 700, color: C.ink, halo: 3 });
      R = { sx, sy, box };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (x > R.box.l && y > R.box.t - 10 && y < R.box.b + 10 ? 'p' : null), cursor: 'pointer', down(q, x, y) { this.move(q, x, y); }, move(q, x, y) { let b = 0, bd = Infinity; pts.forEach((p, i) => { const d = (R.sx(p.y) - x) ** 2 + (R.sy(clamp(L10(p.r), -1, 4)) - y) ** 2; if (d < bd) { bd = d; b = i; } }); if (b !== sel) { sel = b; paint(); } } });
  const ro = readout(el);
  const paint = () => { const p = pts[sel], Y = Math.floor(p.y), M = MED[Y]; ro.innerHTML = `<b>${p.nm}</b> (${Y}) saw about <b>${fmtR(p.r)} tokens per parameter</b>. ${M ? `${Y} median of ${M.n} models: <b>${fmtR(M.m)}</b>; ${Math.round(M.over * 100)}% went past 20.` : ''}`; fig.invalidate(); };
  hint(el, 'touch or hover over the dots to read each model.');
  paint();
}

// ---------- 4. Lay your own slope on the frontier ----------
export function frontierSlope(el) {
  const pts = MODELS.filter(m => m[0] >= 2010 && m[1] > 0).map(m => [m[0], L10(m[1]), m[6], m[2]]);
  const fr = pts.filter(p => p[2]); const ls = fitLS(fr.map(p => [p[0], p[1]]));
  const H = [[2012, ls.f(2012) - 0.6], [2024, ls.f(2024) + 0.6]]; let algo = false, R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 340 : 320), label: 'Training compute of notable AI models since 2010, with a line you can lay on the frontier yourself',
    draw(ctx, w, h) {
      const box = { l: 48, r: w - 16, t: 30, b: h - 36 };
      const { sx, sy } = axes(ctx, { box, x0: 2010, x1: 2026.5, y0: 14, y1: 28, yticks: [14, 17, 20, 23, 26], yfmt: e10, ylabel: 'training compute, FLOP (log)' });
      pts.forEach(p => circle(ctx, sx(p[0]), sy(p[1]), p[2] ? 3.5 : 2, p[2] ? alpha(C.compute, 0.85) : alpha(C.ink3, 0.35)));
      const slope = (H[1][1] - H[0][1]) / (H[1][0] - H[0][0]);
      line(ctx, sx(H[0][0]), sy(H[0][1]), sx(H[1][0]), sy(H[1][1]), C.learn, 2.5);
      if (algo) { const s2 = slope + L10(2) * 12 / 8; line(ctx, sx(H[0][0]), sy(H[0][1]), sx(H[1][0]), sy(H[0][1] + s2 * (H[1][0] - H[0][0])), C.learn, 1.5, [5, 4]); text(ctx, 'effective compute', sx(H[1][0]) - 6, sy(clamp(H[0][1] + s2 * (H[1][0] - H[0][0]), 14, 27.6)) + 14, { size: 11, align: 'right', color: C.learn, weight: 600 }); }
      H.forEach(([x, y]) => circle(ctx, sx(x), sy(y), 10, '#fff', C.learn, 3));
      R = { sx, sy, box };
    },
  });
  fig.interact({ hit: (x, y) => { let b = null, bd = 900; H.forEach(([hx, hy], i) => { const d = (R.sx(hx) - x) ** 2 + (R.sy(hy) - y) ** 2; if (d < bd) { bd = d; b = i; } }); return b === null ? null : 'h' + b; }, cursor: 'grab', down() {}, move(q, x, y) { const i = +q[1]; H[i] = [clamp(R.sx.inv(x), 2010, 2026.5), clamp(R.sy.inv(y), 14, 28)]; if (Math.abs(H[1][0] - H[0][0]) < 1) H[i][0] = H[1 - i][0] + (i ? 1 : -1); paint(); } });
  const ctl = controls(el);
  button(ctl, 'Fit it for me', () => { H[0] = [2012, ls.f(2012)]; H[1] = [2025, ls.f(2025)]; paint(); }, { name: 'fs-fit' });
  button(ctl, 'Add algorithmic progress', () => { algo = !algo; paint(); }, { name: 'fs-algo' });
  const ro = readout(el);
  const paint = () => { const s = (H[1][1] - H[0][1]) / (H[1][0] - H[0][0]), g = 10 ** s; ro.innerHTML = `Your line grows <b>×${g.toFixed(1)} a year</b>${g > 1 ? `, doubling every <b>${Math.round(12 * Math.log(2) / Math.log(g))} months</b>` : ''}. The fit to the blue frontier: ×${(10 ** ls.b).toFixed(1)}.${algo ? ` With algorithms halving the compute needed every 8 months (Ho et al.), effective ×${(g * 2 ** 1.5).toFixed(1)}.` : ''}`; fig.invalidate(); };
  hint(el, 'drag the two purple handles to lay a line along the top of the blue dots.');
  paint();
}

// ---------- 5. The data wall ----------
export function dataWall(el) {
  const FR = new Set(MODELS.filter(m => m[6]).map(m => m[2]));
  const pts = LANG.filter(m => m[0] >= 2017 && m[5] > 1e9).map(m => [m[0], L10(m[5]), m[1]]);
  const tops = pts.filter(p => p[0] >= 2018 && FR.has(p[2]));
  const ft = fitLS(tops.map(p => [p[0], p[1]])), STOCK = L10(3e14), LO = L10(1e14), HI = L10(1e15); // Epoch (Villalobos et al. 2024): effective stock ≈ 300T tokens, 90% CI 100T–1,000T; same figure as data.html (review P3-M5)
  const cross = (STOCK - ft.f(0)) / ft.b; let yr = 2026, R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 340 : 310), label: 'Size of language-model training sets since 2017 against an estimate of the stock of public human text',
    draw(ctx, w, h) {
      const box = { l: 56, r: w - 16, t: 30, b: h - 36 };
      const { sx, sy } = axes(ctx, { box, x0: 2017, x1: 2034, y0: 9, y1: 16, yticks: [9, 11, 13, 15], yfmt: v => (v >= 12 ? `${10 ** (v - 12)}T` : `${10 ** (v - 9)}B`), ylabel: 'training tokens (log)' });
      ctx.save(); ctx.fillStyle = alpha(C.memory, 0.12); ctx.fillRect(box.l, sy(HI), box.r - box.l, sy(LO) - sy(HI)); ctx.restore();
      line(ctx, box.l, sy(STOCK), box.r, sy(STOCK), C.memory, 2); text(ctx, 'public human text, about 300 trillion tokens', box.r, sy(STOCK) - 6, { size: 11, align: 'right', weight: 650, color: C.memory });
      pts.forEach(p => circle(ctx, sx(p[0]), sy(p[1]), 2.8, alpha(C.compute, 0.55)));
      tops.forEach(p => circle(ctx, sx(p[0]), sy(p[1]), 4.5, C.compute, '#fff', 1.5));
      line(ctx, sx(2018), sy(ft.f(2018)), sx(yr), sy(Math.min(16, ft.f(yr))), C.compute, 2, [5, 4]);
      line(ctx, sx(yr), box.t, sx(yr), box.b, C.ink, 1.5); circle(ctx, sx(yr), sy(Math.min(16, ft.f(yr))), 9, '#fff', C.compute, 3);
      R = { sx, box };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (y > R.box.t - 10 && y < R.box.b + 20 && x > R.box.l ? 'y' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { yr = clamp(R.sx.inv(x), 2019, 2034); paint(); } });
  const ro = readout(el);
  const paint = () => { const d = 10 ** ft.f(yr); ro.innerHTML = `At <b>×${(10 ** ft.b).toFixed(1)} a year</b>, <b>${Math.floor(yr)}</b> means <b>${big(d)} tokens</b>, ${d >= 3e14 ? 'more than' : `${Math.round(d / 3e14 * 100)}% of`} the stock. Our line meets it in <b>${Math.round(cross)}</b>; Epoch: median 2028, very likely by 2032.`; fig.invalidate(); };
  hint(el, 'drag the year forward and watch the trend run into the green band.');
  paint();
}

// ---------- 6. The training bill ----------
const RUNS = [['GPT-3 175B', 3.14e23], ['Chinchilla', 5.76e23], ['DeepSeek-V3', 3.3e24], ['Qwen2.5-72B', 7.8e24], ['Llama 3.1-405B', 3.8e25]];
export function trainingBill(el) {
  let logC = L10(3.8e25), price = 85, R = {};
  const gpuEurH = K.dgxH100USD / K.dgxH100.gpus / (K.chipLifeYears * 8760) / K.usdPerEur, mfu = (K.mfu.lo + K.mfu.hi) / 2;
  const calc = () => { const C0 = 10 ** logC, gh = C0 / (K.h100.bf16 * mfu * 3600), mwh = [gh / gpuHoursPerMWh(K.pue.best), gh / gpuHoursPerMWh(K.pue.avg)], el = mwh.map(m => m * price), hw = gh * gpuEurH; return { gh, mwh, el, hw }; };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 300 : 250), label: 'The cost of a training run: hardware hours against electricity, for a compute budget you choose',
    draw(ctx, w, h) {
      const n = narrow(w), { el: E, hw } = calc(), tot = hw + E[1], l = n ? 14 : 130, r = w - 20, bw = r - l - (n ? 96 : 130), y1 = n ? 40 : 34, y2 = n ? 104 : 84;
      text(ctx, 'hardware hours', n ? l : 10, n ? y1 - 8 : y1 + 18, { size: 12, color: C.ink2, weight: 600 });
      rrect(ctx, l, y1, bw * hw / tot, 26, 5); ctx.fillStyle = C.compute; ctx.fill();
      text(ctx, 'electricity', n ? l : 10, n ? y2 - 8 : y2 + 18, { size: 12, color: C.ink2, weight: 600 });
      rrect(ctx, l, y2, bw * E[1] / tot, 26, 5); ctx.fillStyle = alpha(C.heat, 0.4); ctx.fill(); rrect(ctx, l, y2, bw * E[0] / tot, 26, 5); ctx.fillStyle = C.heat; ctx.fill();
      // the comparison itself, on the bars (same linear $ scale for both)
      const eS = (v, u = true) => (v >= 1e9 ? `${+(v / 1e9).toPrecision(3)}${u ? ' B' : ''}` : v >= 1e6 ? `${+(v / 1e6).toPrecision(3)}${u ? ' M' : ''}` : `${Math.round(v / 1e3)}${u ? ' k' : ''}`);
      text(ctx, `$${eS(hw)}`, l + bw * hw / tot + 8, y1 + 18, { size: 13, color: C.compute, weight: 700 });
      text(ctx, `$${eS(E[0], false)}–${eS(E[1])}`, l + bw * E[1] / tot + 8, y2 + 18, { size: 13, color: C.heat, weight: 700 });
      text(ctx, 'dollars per training run, same linear scale', l, y2 + 46, { size: 11, color: C.ink3 });
      const ry = h - 30; R.inv = railLog(ctx, 20, w - 20, ry, 22, 26.5, logC, C.compute, [22, 23, 24, 25, 26], v => `${e10(v)}`, ); R.ry = ry;
      RUNS.forEach(([nm, c], i) => { const x = 20 + (L10(c) - 22) / 4.5 * (w - 40); line(ctx, x, ry - 10, x, ry - 4, C.ink3, 1); if (!n || i % 2 === 0) text(ctx, nm, x, ry - 14 - (i % 2) * 12, { size: 10, align: 'center', color: C.ink3, small: true }); });
    },
  });
  fig.interact({ hit: (x, y) => (Math.abs(y - R.ry) < 26 ? 'c' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { logC = clamp(R.inv(x), 22, 26.5); paint(); } });
  const ctl = controls(el);
  slider(ctl, { label: 'Electricity price', name: 'price', min: 20, max: 300, step: 5, value: price, color: C.heat, fmt: v => `$${v}/MWh`, oninput: v => { price = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const { gh, mwh, el: E, hw } = calc(); ro.innerHTML = `${sci(logC)} FLOP is <b>${big(gh)} H100-hours</b>, <b>${big(mwh[0])}–${big(mwh[1])} MWh</b> of electricity. Hardware wear <b>${eur(hw)}</b>; electricity <b>${eur(E[0])}–${eur(E[1]).replace('$', '')}</b>, <b>${Math.round(E[0] / (hw + E[0]) * 100)}–${Math.round(E[1] / (hw + E[1]) * 100)}%</b> of the two.`; fig.invalidate(); };
  hint(el, 'drag the compute along the line of real training runs, then change the electricity price.');
  paint();
}

// ---------- 7. Serving overtakes training ----------
export function inferenceVsTraining(el) {
  const N = 405e9, CT = 3.8e25; let logU = 8, tok = 2000, logAx = false, R = {};
  const daily = () => 10 ** logU * tok * 2 * N;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 300 : 270), label: 'Cumulative compute for answering users over a year, against the one-off compute of training the model',
    draw(ctx, w, h) {
      const box = { l: 70, r: w - 16, t: 30, b: h - 84 }, D = daily(), yMax = Math.max(CT * 2, D * 365) * 1.05;
      let sx, Y;
      if (!logAx) {
        const a = axes(ctx, { box, x0: 0, x1: 365, y0: 0, y1: yMax, xticks: [0, 90, 180, 270, 365], yticks: [0, yMax / 2.1, yMax / 1.05], xfmt: v => `day ${v}`, yfmt: v => (v ? sci(L10(v)) : '0'), ylabel: 'compute used, FLOP' });
        sx = a.sx; Y = a.sy;
      } else { // log y: both a thousand users and a billion stay readable
        const lo = Math.floor(L10(Math.min(D, CT)) - 0.3), hi = Math.ceil(L10(Math.max(CT * 2, D * 365)) + 0.2), st = Math.max(1, Math.ceil((hi - lo) / 4));
        const yt = []; for (let v = hi; v >= lo; v -= st) yt.unshift(v);
        const a = axes(ctx, { box, x0: 0, x1: 365, y0: lo, y1: hi, xticks: [0, 90, 180, 270, 365], yticks: yt, xfmt: v => `day ${v}`, yfmt: v => `10${sup(v)}`, ylabel: 'compute used, FLOP (log scale)' });
        sx = a.sx; Y = v => a.sy(L10(Math.max(v, 10 ** lo)));
      }
      line(ctx, box.l, Y(CT), box.r, Y(CT), C.learn, 2.5);
      const dX = CT / D, early = dX <= 365 && sx(dX) < box.l + 150; // serving crosses within the label: move it to the right end
      text(ctx, 'training, once', early ? box.r - 4 : box.l + 6, Y(CT) - 10, { size: 11.5, color: C.learn, weight: 650, align: early ? 'right' : 'left', halo: 4 });
      ctx.save(); ctx.strokeStyle = C.compute; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let k = 0; k <= 73; k++) { const t = Math.max(1, k * 5); k ? ctx.lineTo(sx(t), Y(D * t)) : ctx.moveTo(sx(logAx ? 1 : 0), Y(logAx ? D : 0)); }
      ctx.stroke(); ctx.restore();
      { // label sits above the rising curve, which then stays clear of it; if the end is too near the top, slide it left
        const yE = Y(D * 365), yL = box.t + 14; let lx = box.r, ly = yE - 10;
        if (yE - 22 < box.t) { let t = 365; while (t > 2 && Y(D * t) < yL + 4) t -= 1; lx = sx(t) - 6; ly = yL; }
        text(ctx, 'answering users', lx, ly, { size: 11.5, color: C.compute, weight: 650, align: 'right', halo: 3 }); }
      const d = CT / D; if (d <= 365) circle(ctx, sx(d), Y(CT), 7, C.ink, '#fff', 2);
      const ry = h - 30; R.inv = railLog(ctx, 20, w - 20, ry, 3, 9, logU, C.compute, [3, 5, 7, 9], v => `${big(10 ** v)}`); R.ry = ry;
      text(ctx, 'users a day (drag)', 20, ry - 14, { size: 11, color: C.ink3 });
    },
  });
  fig.interact({ hit: (x, y) => (Math.abs(y - R.ry) < 26 ? 'u' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { logU = clamp(R.inv(x), 3, 9); paint(); } });
  const ctl = controls(el);
  slider(ctl, { label: 'Words (tokens) per user per day', name: 'tok', min: 200, max: 20000, step: 100, value: tok, color: C.compute, fmt: v => v.toLocaleString('en-GB'), oninput: v => { tok = v; paint(); } });
  segmented(ctl, { label: 'Compute axis', value: false, options: [{ label: 'linear', value: false, name: 'ivt-lin' }, { label: 'logarithmic', value: true, name: 'ivt-log' }], onchange: v => { logAx = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const d = CT / daily(); ro.innerHTML = `<b>${big(10 ** logU)}</b> users × ${tok.toLocaleString('en-GB')} tokens = <b>${sci(L10(daily()))} FLOP a day</b> (405B model). ${d < 1 ? 'Serving passes training <b>within a day</b>.' : d <= 3650 ? `Serving passes training after <b>${d < 365 ? Math.round(d) + ' days' : (d / 365).toFixed(1) + ' years'}</b>.` : 'Serving stays below training for ten years.'}`; fig.invalidate(); };
  hint(el, 'drag the number of users up from a thousand to a billion.');
  paint();
}
