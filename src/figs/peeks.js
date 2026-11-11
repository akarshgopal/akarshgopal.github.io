// Figures that live inside "↓ look inside" drawers (see src/lib/peek.js). Each has exactly one control and sits one layer
// below the figure it hangs under.
import { Fig, isPlaying, onPlayChange } from '../lib/fig.js';
import { C, alpha, mix } from '../lib/colors.js';
import { text, rrect, line, circle, axes, clamp } from '../lib/draw.js';
import { controls, slider, segmented, readout, hint } from '../lib/ui.js';
import { sup } from './chips.js';

const UI3D = { C, controls, slider, readout, hint, isPlaying, onPlayChange };
const L10 = Math.log10;
const narrow = w => w < 520;

// ---------- H9 → H8. Two transistors make a gate: a CMOS inverter ----------
// Same model as the MOSFET figure above: EKV-style smooth current, 71 mV per decade below threshold, 0.7 V supply, 0.35 V threshold.
// The output voltage is solved so the n-type's current equals the p-type's (bisection); the supply current is that shared current.
export function cmosInverter(el) {
  // the lesson is ½CV² load charging; the shoot-through spike in the V/I plots is the minor term (cmos3d kept in src, unused)
  cmosInverter2d(el);
}
function cmosInverter2d(el) {
  const PHI = 0.02585, NF = 1.2, VDD = 0.7, VT = 0.35;
  // Load = wire + next gate's input, ~1 fF (order of magnitude). Each 0→1 output edge draws C·V² from the supply: half heats the p-type, half is stored
  // as ½CV² and burns in the n-type on the 1→0 edge. Short-circuit current adds typically ≲10–15% (J. M. Rabaey, Digital Integrated Circuits, 2nd ed., ch. 5;
  // H. J. M. Veendrick, IEEE JSSC 19(4), 1984).
  const CL = 1e-15;
  const g = v => Math.log1p(Math.exp((v - VT) / (2 * NF * PHI))) ** 2;           // gate drive, arbitrary units
  const cur = (vgs, vds) => g(vgs) * (1 - Math.exp(-Math.max(0, vds) / PHI));    // saturates once vds is a few kT/q
  const IREF = cur(VDD, VDD);
  const solve = vin => { let lo = 0, hi = VDD; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; (cur(vin, m) - cur(VDD - vin, VDD - m) < 0 ? (lo = m) : (hi = m)); } const vo = (lo + hi) / 2; return { vo, i: cur(vin, vo) / IREF }; };
  const rel = x => clamp(L10(Math.max(x, 1e-12)) / 6 + 1, 0, 1); // how open a switch is, on the same 6-decade scale as the MOSFET figure
  let vin = 0.0;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 480 : 372), label: 'A CMOS inverter: a p-type and an n-type transistor in series between supply and ground, with the output voltage and the current drawn from the supply as the input voltage changes',
    draw(ctx, w, h) {
      const n = narrow(w), sx0 = n ? 14 : 18, sw = n ? w - 28 : Math.min(190, w * 0.34), sh = n ? 160 : h - 30, top = 14;
      const { vo, i } = solve(vin), gp = g(VDD - vin) / g(VDD), gn = g(vin) / g(VDD);
      // schematic: supply rail, p-type pipe, output node, n-type pipe, ground rail
      const cx = sx0 + sw * (n ? 0.5 : 0.5), railW = 70;
      line(ctx, cx - railW / 2, top, cx + railW / 2, top, C.yellow, 4); text(ctx, 'supply 0.70 V', cx + railW / 2 + 8, top + 4, { size: 11, color: '#9a7210', weight: 650 });
      const yP = top + sh * 0.12, yO = top + sh * 0.5, yN = top + sh * 0.88, tH = sh * 0.26;
      const pipe = (y0, y1, open, col) => { const wd = 2 + 12 * rel(open); ctx.save(); ctx.globalAlpha = 0.25 + 0.75 * rel(open); ctx.fillStyle = col; rrect(ctx, cx - wd / 2, y0, wd, y1 - y0, 3); ctx.fill(); ctx.restore(); };
      line(ctx, cx, top, cx, yP, C.grid2, 2);
      pipe(yP, yP + tH, gp, C.blue); rrect(ctx, cx - 22, yP + tH * 0.5 - 9, 44, 18, 5); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1; ctx.stroke();
      text(ctx, 'p-type', cx + 30, yP + tH * 0.5 + 4, { size: 11.5, color: C.ink2, weight: 650 });
      line(ctx, cx, yP + tH, cx, yO - 9, C.grid2, 2);
      pipe(yO + 9, yO + 9 + tH, gn, C.blue); rrect(ctx, cx - 22, yO + 9 + tH * 0.5 - 9, 44, 18, 5); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1; ctx.stroke();
      text(ctx, 'n-type', cx + 30, yO + 9 + tH * 0.5 + 4, { size: 11.5, color: C.ink2, weight: 650 });
      line(ctx, cx, yO + 9 + tH, cx, yN + 8, C.grid2, 2); line(ctx, cx - railW / 2, yN + 8, cx + railW / 2, yN + 8, C.ink3, 4); text(ctx, 'ground', cx + railW / 2 + 8, yN + 12, { size: 11, color: C.ink3, weight: 650 });
      // load capacitor hanging off the output: a tank filled to Vout/Vdd, its plates, and its own ground
      const xc = cx + 85, tk0 = yO + 12, tkH = (yN - yO) * 0.42, pl = tk0 + tkH + 6;
      line(ctx, cx, yO, xc, yO, C.grid2, 2); line(ctx, xc, yO, xc, tk0, C.grid2, 2);
      rrect(ctx, xc - 8, tk0, 16, tkH, 3); ctx.fillStyle = alpha(C.ink3, 0.08); ctx.fill();
      const fh = tkH * vo / VDD; if (fh > 0.5) { rrect(ctx, xc - 8, tk0 + tkH - fh, 16, fh, 3); ctx.fillStyle = C.yellow; ctx.fill(); }
      rrect(ctx, xc - 8, tk0, 16, tkH, 3); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1; ctx.stroke();
      line(ctx, xc, tk0 + tkH, xc, pl, C.grid2, 2); line(ctx, xc - 12, pl, xc + 12, pl, C.ink2, 2.5); line(ctx, xc - 12, pl + 5, xc + 12, pl + 5, C.ink2, 2.5);
      line(ctx, xc, pl + 5, xc, pl + 12, C.grid2, 2); [12, 8, 4].forEach((hw, k) => line(ctx, xc - hw, pl + 12 + k * 3, xc + hw, pl + 12 + k * 3, C.ink3, 1.5));
      text(ctx, 'load', xc + 12, tk0 + 10, { size: 10.5, color: '#9a7210', weight: 650 });
      circle(ctx, cx, yO, 9, mix('#c9c9c5', C.yellow, vo / VDD), C.ink2, 1.5); text(ctx, `out ${vo.toFixed(2)} V`, cx + 14, yO - 8, { size: 11.5, color: C.ink, weight: 700 });
      // the input wire drives both gates
      const ix = sx0 + (n ? 4 : 6); line(ctx, ix, yP + tH * 0.5, cx - 22, yP + tH * 0.5, C.blue, 1.5, [3, 3]); line(ctx, ix, yO + 9 + tH * 0.5, cx - 22, yO + 9 + tH * 0.5, C.blue, 1.5, [3, 3]); line(ctx, ix, yP + tH * 0.5, ix, yO + 9 + tH * 0.5, C.blue, 1.5, [3, 3]);
      text(ctx, `in ${vin.toFixed(2)} V`, ix + 6, yO + 4, { size: 11.5, color: '#2a5fa8', weight: 700 });
      // plots: output voltage and supply current against input voltage
      const px = n ? 52 : sx0 + sw + 54, pr = w - 16, ph = n ? 108 : (h - 134) / 2;
      const y1 = n ? top + sh + 36 : 36, y2 = y1 + ph + 58;
      const a1 = axes(ctx, { box: { l: px, r: pr, t: y1, b: y1 + ph }, x0: -0.03, x1: VDD + 0.02, y0: 0, y1: VDD, xticks: [0, 0.35, 0.7], yticks: [0, 0.35, 0.7], xfmt: v => (v ? v.toFixed(2) : '0'), yfmt: v => (v ? v.toFixed(2) : '0'), ylabel: 'output voltage (V)' });
      ctx.save(); ctx.strokeStyle = C.blue; ctx.lineWidth = 2.5; ctx.beginPath(); for (let k = 0; k <= 70; k++) { const v = k / 100, s = solve(v); k ? ctx.lineTo(a1.sx(v), a1.sy(s.vo)) : ctx.moveTo(a1.sx(v), a1.sy(s.vo)); } ctx.stroke(); ctx.restore();
      circle(ctx, a1.sx(vin), a1.sy(vo), 7, '#fff', C.blue, 3);
      const a2 = axes(ctx, { box: { l: px, r: pr, t: y2, b: y2 + ph }, x0: -0.03, x1: VDD + 0.02, y0: -7, y1: 0, yticks: [-6, -4, -2, 0], xticks: [0, 0.35, 0.7], xfmt: v => (v ? v.toFixed(2) : '0'), yfmt: v => (v === 0 ? '1' : `10${sup(v)}`), ylabel: 'supply current, relative to a fully open switch', xlabel: 'input voltage (V)' });
      ctx.save(); ctx.strokeStyle = C.heat; ctx.lineWidth = 2.5; ctx.beginPath(); for (let k = 0; k <= 70; k++) { const v = k / 100, s = solve(v); const yy = a2.sy(clamp(L10(Math.max(s.i, 1e-12)), -7, 0)); k ? ctx.lineTo(a2.sx(v), yy) : ctx.moveTo(a2.sx(v), yy); } ctx.stroke(); ctx.restore();
      circle(ctx, a2.sx(vin), a2.sy(clamp(L10(Math.max(i, 1e-12)), -7, 0)), 7, '#fff', C.heat, 3);
    },
  });
  const ctl = controls(el);
  slider(ctl, { label: 'Input voltage', name: 'vin', min: 0, max: VDD, step: 0.01, value: vin, color: C.compute, fmt: v => `${v.toFixed(2)} V`, oninput: v => { vin = v; paint(); } });
  const ro = readout(el);
  const paint = () => {
    const { vo, i } = solve(vin), e = Math.floor(L10(i)), pk = solve(VDD / 2).i, rest = solve(0).i;
    const sci = i >= 0.01 ? `${Math.round(i * 100)}%` : `${(i / 10 ** e).toFixed(1)} × 10${sup(e)}`;
    ro.innerHTML = `Input <b>${vin.toFixed(2)} V</b> → output <b>${vo.toFixed(2)} V</b> (${vo > VDD / 2 ? 'high' : 'low'}). Current from supply to ground: <b>${sci}</b> of a fully open switch. ${vin > 0.1 && vin < 0.6 ? `Halfway, both are partly open: a brief burst about <b>${Math.round(pk / rest / 1000).toLocaleString('en-GB')} thousand</b> times the leak at rest, but it lasts only while the input crosses.` : `One switch is shut, so only a tiny leak flows.`} The load holds <b>${(CL * vo * 1e18).toFixed(0)} aC</b> of charge. Each rise draws C·V² ≈ <b>${(CL * VDD * VDD * 1e15).toFixed(2)} fJ</b> from the supply; half heats the p-type, and the stored ½CV² ≈ ${(CL * VDD * VDD * 5e14).toFixed(2)} fJ burns in the n-type on the fall.`;
    fig.invalidate();
  };
  hint(el, 'slide the input from one end to the other and watch the load fill or empty.');
  paint();
}

// ---------- H6. The memory ladder: the farther the data, the more every read costs ----------
// Horowitz (ISSCC 2014), 45 nm, 64-bit reads: 8 KB 10 pJ, 32 KB 20 pJ, 1 MB 100 pJ, DRAM 1.3–2.6 nJ. A 32-bit float multiply: 4 pJ.
// HBM3 per-bit energy: no primary JEDEC/vendor figure found; secondary sources quote a few to ~7 pJ/bit, so the flip caption says "a few pJ", softened.
// Horowitz's largest rung is 1 MB; an H100's L2 is 50 MB (H100 white paper, parallel.html note 8); the label says so rather than implying 1 MB is the top.
const LADDER = [['8 KB on-chip memory', 8, 10], ['32 KB on-chip memory', 32, 20], ['1 MB on-chip (H100 L2: 50 MB)', 1024, 100], ['off-chip DRAM', Infinity, 1300]];
const MUL = 4;
const fmtKB = kb => (kb >= 1048576 ? `${+(kb / 1048576).toPrecision(2)} GB` : kb >= 1024 ? `${+(kb / 1024).toPrecision(2)} MB` : `${+kb.toPrecision(2)} KB`);
export function memoryLadder(el) {
  let ws = 1.3; // working set, log10 of KB; 10^6 KB = 1 GB
  const lvl = () => LADDER.findIndex(l => 10 ** ws <= l[1]);
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 286 : 250), label: 'Energy of reading one 64-bit word from each level of a memory hierarchy, in picojoules on a logarithmic scale, against one multiplication',
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 14 : 176, r = w - 18, top = 28, rh = n ? 46 : 38, sx = v => l + (L10(v) - 0.3) / (L10(4000) - 0.3) * (r - l), cur = lvl();
      const bar = (i, label, v, col, on, hi) => {
        const y = top + i * rh + (n ? 14 : 0);
        text(ctx, label, n ? l : l - 10, n ? y - 2 : y + 17, { size: 11.5, align: n ? 'left' : 'right', color: on ? C.ink : C.ink2, weight: on ? 700 : 450 });
        ctx.save(); ctx.globalAlpha = on ? 1 : 0.38; rrect(ctx, l, y + 3, sx(v) - l, 19, 4); ctx.fillStyle = col; ctx.fill();
        if (hi) { line(ctx, sx(v), y + 12, sx(hi), y + 12, col, 3); line(ctx, sx(hi), y + 6, sx(hi), y + 18, col, 2); }
        ctx.restore();
        if (hi) text(ctx, `${v.toLocaleString('en-GB')}–${hi.toLocaleString('en-GB')} pJ`, sx(v) - 8, y + 17, { size: 11.5, weight: 700, color: on ? '#fff' : C.ink, align: 'right' }); // dark on the pale (inactive) bar
        else text(ctx, `${v} pJ`, sx(v) + 8, y + 17, { size: 11.5, weight: 700, color: on ? C.ink : C.ink3 });
      };
      bar(0, 'a 32-bit float multiply', MUL, C.compute, true);
      LADDER.forEach((q, i) => bar(i + 1, q[0], q[2], C.memory, i === cur, i === 3 ? 2600 : 0));
      text(ctx, 'energy per read, picojoules (log scale)', r, h - 12, { size: 11, color: C.ink3, align: 'right' });
    },
  });
  const ctl = controls(el);
  slider(ctl, { label: 'Data you need close by', name: 'ws', min: 0, max: 6.2, step: 0.02, value: ws, color: C.memory, fmt: v => fmtKB(10 ** v), oninput: v => { ws = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const i = lvl(), q = LADDER[i], rd = q[2]; ro.innerHTML = `A <b>${fmtKB(10 ** ws)}</b> working set ${i < 3 ? `fits in the <b>${q[0].replace('on-chip memory', 'level')}</b>` : '<b>does not fit on the chip</b>'}: each 64-bit read costs about <b>${rd.toLocaleString('en-GB')} pJ${i === 3 ? ' or more' : ''}</b>, ${+(rd / MUL).toPrecision(2) >= 10 ? Math.round(rd / MUL).toLocaleString('en-GB') : +(rd / MUL).toPrecision(2)} times a multiply.`; fig.invalidate(); };
  hint(el, 'grow the working set and watch which rung of the ladder it lands on.');
  paint();
}


// ---------- H9 / H7. Landauer gap: how far a real FLOP is from kT ln 2 ----------
const kTln2 = 2.87e-21; // J at 300 K
const xPow = g => { const e = Math.floor(L10(g)), m = g / 10 ** e; return m < 1.05 ? `10${sup(e)}` : `${m.toFixed(1)}×10${sup(e)}`; }; // gaps as ×10ⁿ
const FLOPS = [
  { name: 'Landauer limit (1 bit)', J: kTln2, tag: 'physics' },
  { name: 'One logic gate switch', J: 1e-15, tag: '~1 fJ' }, // order of magnitude: typical CMOS logic signal energy ≈1 fJ; IRDS-based projections bottom out ≈0.2 fJ by ~2030
  // (M. P. Frank, Sandia, Comet 2023 slides, https://www.sandia.gov/app/uploads/sites/210/2023/11/Comet23-slides_SAND.pdf)
  // and ≈0.8 fJ per logic bit at end of roadmap from IRDS 2017 More Moore (Frank, INC 2020, https://www.sandia.gov/app/uploads/sites/210/2022/06/Frank-INC20-printout-legal4.pdf)
  { name: 'H100 BF16 FLOP (chip)', J: 700 / 989e12, tag: 'derived' }, // 700 W / 989 TFLOP/s ≈ 0.71 pJ
  { name: 'DRAM 64-bit read', J: 1.3e-9, tag: 'Horowitz' },
  { name: 'Google median prompt', J: 0.24 * 3600, tag: '0.24 Wh' }, // Wh → J
];
export function landauerGap(el) {
  let which = 2;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 300 : 280),
    label: 'Energy of one useful operation against Landauer’s kT ln 2 limit, on a log scale',
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 14 : 170, r = w - 14, t = 28, b = h - 20;
      const xmin = 1e-22, xmax = 1e4;
      const xs = v => l + (L10(clamp(v, xmin, xmax)) - L10(xmin)) / (L10(xmax) - L10(xmin)) * (r - l);
      text(ctx, 'joules per operation (log)', l, 16, { size: 11, color: C.ink3, weight: 600 });
      const rh = (b - t) / FLOPS.length;
      FLOPS.forEach((f, i) => {
        const y = t + i * rh + 3, bh = rh - 6, on = i === which;
        rrect(ctx, l, y, Math.max(3, xs(f.J) - l), bh, 4);
        ctx.fillStyle = alpha(on ? C.heat : C.ink3, on ? 0.4 : 0.12); ctx.fill();
        ctx.strokeStyle = on ? C.heat : C.ink3; ctx.lineWidth = on ? 2 : 1; ctx.stroke();
        text(ctx, f.name, n ? l + 6 : l - 8, n ? y + 11 : y + bh / 2 + 4, { size: n ? 10.5 : 11.5, weight: on ? 700 : 500, color: C.ink, align: n ? 'left' : 'right' });
        const gap = f.J / kTln2;
        const lab = gap < 10 ? `${gap.toFixed(0)}×` : `${xPow(gap)}×`;
        if (!n || on) text(ctx, lab, xs(f.J) + 6, y + bh / 2 + 4, { size: 11, weight: 700, color: C.ink });
      });
    },
  });
  const ctl = controls(el);
  slider(ctl, { label: 'Compare', name: 'row', min: 0, max: FLOPS.length - 1, step: 1, value: which, color: C.heat, fmt: v => FLOPS[Math.round(v)].name.replace(/ \(.*\)/, ''), oninput: v => { which = Math.round(v); paint(); } });
  const ro = readout(el);
  const paint = () => {
    const f = FLOPS[which], gap = f.J / kTln2;
    const lab = gap < 10 ? Math.round(gap).toLocaleString('en-GB') : xPow(gap);
    ro.innerHTML = `<b>${f.name}</b> is about <b>${lab}×</b> Landauer’s kT ln 2 (2.87×10⁻²¹ J at 300 K). ${which === 0 ? 'Erasing one bit cannot cost less than this.' : which === 1 ? 'A FLOP takes hundreds of such switches, so this is the fairer like-for-like gap.' : 'The efficiency floor slider on the verdict has headroom of many orders of magnitude before physics stops it.'}`;
    fig.invalidate();
  };
  hint(el, 'slide between a bit, a gate switch, a FLOP, a memory read and a whole prompt.');
  paint();
}

// ---------- S1. Serving: decode streams the weights, plus each sequence's KV cache ----------
// Bytes read from HBM per generated token = weights ÷ batch + KV(context). Every decode step reads all the weights once
// for the whole batch, but each sequence reads its own KV cache (Pope et al. 2022, arXiv:2211.05102 §2–3;
// kipp.ly, "Transformer inference arithmetic"). 70B-class shape as Llama 3 70B: 80 layers, 8 KV heads, 128-d heads, FP16.
const KV_W = 70e9 * 2;               // weight bytes: 70B params × 2 B (FP16)
const KV_TOK = 2 * 80 * 8 * 128 * 2; // K and V × layers × kv_heads × head_dim × 2 B = 327,680 B per context token
const KV_BW = 3.35e12;               // H100 SXM HBM3, 3.35 TB/s (NVIDIA H100 datasheet)
const KV_BATCH = [1, 8, 64];         // fixed batch presets, drawn as curves and listed in the readout
export function servingKV(el) {
  let ctxTok = 3.3; // log10 of context tokens, 100..1M
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 260 : 240),
    label: 'Bytes read from HBM per generated token against context length for a 70B dense model at batch 1, 8 and 64: the weights, shared across the batch, plus each sequence’s own KV cache',
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 44 : 56, r = w - 14, t = 30, b = h - 36;
      // log–log: x = log10 context tokens, y = log10 GB per token
      const a = axes(ctx, { box: { l, r, t, b }, x0: 2, x1: 6, y0: -2, y1: 3, xticks: [2, 3, 4, 5, 6], yticks: [-2, -1, 0, 1, 2, 3], xfmt: v => `10${'⁰¹²³⁴⁵⁶'[v]}`, yfmt: v => (v < 0 ? String(10 ** v) : (10 ** v).toLocaleString('en-GB')), xlabel: 'context tokens', ylabel: 'GB read from HBM per token' });
      const gb = (x, B) => (B ? KV_W / B : 0) / 1e9 + 10 ** x * KV_TOK / 1e9; // B = 0: KV alone
      const Y = (x, B) => a.sy(clamp(L10(gb(x, B)), -2, 3));
      const curve = (B, color, wd, dash) => {
        ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = wd; if (dash) ctx.setLineDash(dash); ctx.beginPath();
        for (let k = 0; k <= 80; k++) { const x = 2 + 4 * k / 80; k ? ctx.lineTo(a.sx(x), Y(x, B)) : ctx.moveTo(a.sx(x), Y(x, B)); }
        ctx.stroke(); ctx.restore();
      };
      line(ctx, a.sx(ctxTok), t, a.sx(ctxTok), b, alpha(C.ink3, 0.6), 1, [2, 3]);
      curve(0, C.memory, 1.5, [4, 4]);
      // label below-right of the rising dashed line, so it sits clear of it
      text(ctx, 'KV cache alone', a.sx(2.5) + 4, Y(2.5, 0) + 16, { size: 10.5, color: C.memory });
      const cols = [C.compute, mix(C.compute, C.memory, 0.5), C.memory];
      KV_BATCH.forEach((B, i) => {
        curve(B, cols[i], 2.5);
        text(ctx, `batch ${B}`, l + 6, Y(2, B) - 7, { size: 10.5, color: cols[i], weight: 600 });
      });
      KV_BATCH.forEach((B, i) => circle(ctx, a.sx(ctxTok), Y(ctxTok, B), 5.5, '#fff', cols[i], 2.5));
    },
  });
  const ctl = controls(el);
  slider(ctl, { label: 'Context length', name: 'ctx', min: 2, max: 6, step: 0.01, value: ctxTok, color: C.memory, fmt: v => `${Math.round(10 ** v).toLocaleString('en-GB')} tokens`, oninput: v => { ctxTok = v; paint(); } });
  const ro = readout(el);
  const fmtGB = g => (g < 1 ? `${(g * 1000).toFixed(0)} MB` : `${g < 10 ? g.toFixed(1) : Math.round(g).toLocaleString('en-GB')} GB`);
  const paint = () => {
    const seq = 10 ** ctxTok, kv = seq * KV_TOK;
    const rows = KV_BATCH.map(B => {
      const step = (KV_W + B * kv) / KV_BW; // seconds per decode step: the weights once, plus every sequence's KV
      return `batch <b>${B}</b>: ${fmtGB((KV_W / B + kv) / 1e9)} per token, ${(step * 1000).toFixed(0)} ms a step, ~${Math.round(B / step).toLocaleString('en-GB')} tokens/s`;
    });
    ro.innerHTML = `At <b>${Math.round(seq).toLocaleString('en-GB')}</b> tokens of context, each sequence’s KV cache is <b>${fmtGB(kv / 1e9)}</b> against 140 GB of weights. At 3.35 TB/s: ${rows.join('; ')}. Batching shares the weight read; it cannot share the KV.`;
    fig.invalidate();
  };
  hint(el, 'grow the context: batching shrinks the weight term but not the KV term.');
  paint();
}

// ---------- S3. Mixture of experts: active vs total parameters ----------
// Review m9: attention, embeddings and any shared expert run for every token. Solving shared + routed·k/E = active against the
// published totals gives a shared slice of ≈3.5% for Mixtral 8x7B (46.7B total, 12.9B active, top-2 of 8; arXiv:2401.04088) and
// ≈2.5% for DeepSeek-V3 (671B total, 37B active, top-8 of 256 routed; arXiv:2412.19437). We use 3%.
const MOE_SHARED = 0.03;
const moeFrac = E => MOE_SHARED + (1 - MOE_SHARED) * 2 / E; // top-2 routing
export function moePeek(el) {
  let experts = 8; // 2..64
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 220 : 200),
    label: 'Active parameters versus total parameters in a mixture-of-experts model as the expert count changes',
    draw(ctx, w, h) {
      const n = narrow(w), total = 8e11, // 800B total like a large MoE
        activeFrac = moeFrac(experts),
        active = total * activeFrac;
      const l = 14, r = w - 14, t = 36, bh = n ? 36 : 42;
      text(ctx, 'parameters (relative)', l, 18, { size: 11, color: C.ink3, weight: 600 });
      // total bar
      rrect(ctx, l, t, r - l, bh, 5); ctx.fillStyle = alpha(C.ink3, 0.2); ctx.fill();
      text(ctx, `total ≈ ${(total / 1e9).toFixed(0)}B`, l + 8, t + bh / 2 + 4, { size: 12, weight: 650, color: C.ink });
      // active bar
      const aw = Math.max(8, (r - l) * activeFrac);
      rrect(ctx, l, t + bh + 14, aw, bh, 5); ctx.fillStyle = alpha(C.compute, 0.45); ctx.fill();
      ctx.strokeStyle = C.compute; ctx.lineWidth = 2; ctx.stroke();
      { const lab = `active (top-2 of ${experts}) ≈ ${(active / 1e9).toFixed(0)}B`, inside = lab.length * 12 * 0.56 + 16 < aw; // outside once the bar is too short
        text(ctx, lab, inside ? l + 8 : l + aw + 8, t + bh + 14 + bh / 2 + 4, { size: 12, weight: 700, color: inside ? C.ink : C.compute }); }
      text(ctx, `${Math.round(activeFrac * 100)}% of weights touch each token`, l, h - 14, { size: 11, color: C.ink2 });
    },
  });
  const ctl = controls(el);
  slider(ctl, { label: 'Expert count', name: 'E', min: 2, max: 64, step: 1, value: experts, color: C.compute, fmt: v => `${Math.round(v)} experts`, oninput: v => { experts = Math.round(v); paint(); } });
  const ro = readout(el);
  const paint = () => {
    const frac = moeFrac(experts);
    ro.innerHTML = `With <b>${experts}</b> experts and top-2 routing, each token uses about <b>${Math.round(frac * 100)}%</b> of the weights: the shared 3% (attention, embeddings) plus 2 of ${experts} experts. FLOPs per token track <i>active</i> parameters (~2 × active), but all ${(8e11 / 1e9).toFixed(0)}B must still sit in memory. Real models: Mixtral 12.9B of 46.7B (28%); DeepSeek-V3 37B of 671B (5.5%).`;
    fig.invalidate();
  };
  hint(el, 'add experts and watch the active slice shrink.');
  paint();
}

// ---------- S3. Transformer block: embed → attention → MLP → unembed ----------
// Wave 9 understanding audit: the lesson is the FLOP share per stage — bars on one baseline teach it (transformer3d kept in src, unused)
// Review P3-M2/m2: real per-token forward FLOPs for the Llama 3 70B shape (Llama 3 paper, arXiv:2407.21783, Table 3: 80 layers,
// d_model 8192, FFN 28,672 (SwiGLU, three matrices), 64 query / 8 KV heads of 128, vocabulary 128,256), counted as in Kaplan et al.
// 2020 Table 1 (arXiv:2001.08361): 2 FLOPs per weight touched, plus 2·n_layer·n_ctx·d_attn for the attention scores averaged over a
// context of n_ctx tokens. The embedding is a table lookup (≈0 FLOPs); the unembedding is 2·d_model·vocab.
const TB = { L: 80, d: 8192, ff: 28672, kv: 8 * 128, V: 128256 };
const TB_ATTW = 2 * TB.L * (2 * TB.d * TB.d + 2 * TB.d * TB.kv); // Q, O full width; K, V narrow (GQA): ≈ 2.4e10
const TB_MLP = 2 * TB.L * 3 * TB.d * TB.ff; // ≈ 1.13e11; TB_ATTW + TB_MLP ≈ 1.37e11 = 2N (non-embedding)
const TB_UNEMB = 2 * TB.d * TB.V; // ≈ 2.1e9
const tbCtx = n => 2 * TB.L * n * TB.d; // QKᵀ and the weighted sum of values; = 2N at n ≈ 104k, = MLP at n ≈ 68k
function transformerBlock2d(el) {
  let ctxLen = 8192; // tokens, 512..131,072 (log₂ slider)
  const STAGES = ['embed', 'attention', 'MLP', 'unembed'];
  const COLS = [C.on, mix(C.compute, '#ffffff', 0.35), C.compute, C.learn]; // same parts/colours as the 3D bricks
  const costs = () => [0, TB_ATTW + tbCtx(ctxLen), TB_MLP, TB_UNEMB];
  const YMAX = TB_ATTW + tbCtx(131072); // fixed scale, so the MLP bar stays put while attention grows
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 250 : 230),
    label: 'Per-token arithmetic of a 70-billion-parameter transformer as embed, attention, MLP and unembed bars; the attention bar grows with context length',
    draw(ctx, w, h) {
      const n = narrow(w), l = 16, r = w - 16, base = h - 34, top = 34, gap = n ? 10 : 22, bw = (r - l - gap * 3) / 4, sy = c => (base - top) * c / YMAX;
      const cs = costs(), tot = cs.reduce((a, b) => a + b, 0);
      // token ribbon through the block
      line(ctx, l - 6, base - 10, r + 6, base - 10, alpha(C.on, 0.35), 6);
      STAGES.forEach((s, i) => {
        const x = l + i * (bw + gap), bh = Math.max(4, sy(cs[i]));
        rrect(ctx, x, base - bh, bw, bh, 4); ctx.fillStyle = COLS[i]; ctx.fill();
        ctx.strokeStyle = alpha(C.ink, 0.5); ctx.lineWidth = 1; ctx.stroke();
        if (i === 1) { // the context-dependent part of attention, paler, on top of the weight part
          const ch = sy(tbCtx(ctxLen));
          if (ch > 3) { rrect(ctx, x, base - bh, bw, ch, 4); ctx.fillStyle = mix(C.compute, '#ffffff', 0.72); ctx.fill(); ctx.stroke(); }
          if (ch > 24) text(ctx, 'context', x + bw / 2, base - bh + 16, { size: 11, align: 'center', color: C.ink2 });
        }
        text(ctx, s, x + bw / 2, base + 16, { size: n ? 11 : 12.5, weight: 700, align: 'center', color: C.ink });
        const pct = cs[i] / tot * 100;
        text(ctx, i === 0 ? '≈0%' : `${pct < 2 ? pct.toFixed(1) : Math.round(pct)}%`, x + bw / 2, base - bh - 7, { size: n ? 11 : 12.5, weight: 750, align: 'center', color: C.ink });
        if (i < 3) line(ctx, x + bw + 3, base - 10, x + bw + gap - 3, base - 10, C.ink3, 1.5);
      });
      text(ctx, 'share of the arithmetic per token, 70B model', l, 14, { size: 11, color: C.ink3 });
    },
  });
  const kfmt = t => (t >= 1024 ? `${Math.round(t / 1024)}k tokens` : `${t} tokens`);
  const ctl = controls(el);
  slider(ctl, { label: 'Context length', name: 'ctx', min: 9, max: 17, step: 1, value: 13, color: C.compute, fmt: v => kfmt(2 ** v), oninput: v => { ctxLen = 2 ** Math.round(v); paint(); } });
  const ro = readout(el);
  const f = x => { const e = Math.floor(L10(x)); return `${(x / 10 ** e).toFixed(1)} × 10${sup(e)}`; };
  const paint = () => {
    const tot = costs().reduce((a, b) => a + b, 0);
    ro.innerHTML = `At <b>${kfmt(ctxLen)}</b> of context each token costs <b>${f(tot)} FLOPs</b>: ${f(TB_ATTW + TB_MLP)} for the weights (the “2N” part) plus ${f(tbCtx(ctxLen))} for attention over the context. Attention overtakes the MLP near 68k tokens; its context term overtakes 2N near 100k.`;
    fig.invalidate();
  };
  hint(el, 'stretch the context; only the attention bar grows.');
  paint();
}

export function transformerBlock(el) { transformerBlock2d(el); }

// ---------- H0–H3. Power chain: grid → transformer → UPS → PSU → VRM → die ----------
// PUE = total facility energy / IT equipment energy; facility overhead covers UPS, switchgear, PDUs and "distribution losses
// external to the IT equipment" (The Green Grid, "PUE: A Comprehensive Examination of the Metric", WP#49, 2012, §3.1;
// https://datacenters.lbl.gov/sites/default/files/WP49-PUE%20A%20Comprehensive%20Examination%20of%20the%20Metric_v6.pdf),
// so the server PSU and VRM losses, inside the IT equipment, count as IT load; cooling is the facility's main overhead. PUE range: note 7 (1.09–1.56).
export function powerChain(el) {
  let pue = 1.56;
  const IT = 3; // first stage inside the IT boundary (Server PSU)
  const STAGES = [
    { name: 'Grid', v: '11–400 kV', loss: 0 },
    { name: 'Site transformer', v: '480 V', loss: 0.01 },
    { name: 'UPS / PDU', v: '480→208 V', loss: 0.04 },
    { name: 'Server PSU', v: '12–48 V', loss: 0.04 },
    { name: 'VRM on board', v: '~0.8 V', loss: 0.08 },
    { name: 'Die', v: 'logic', loss: 0 },
  ];
  // box tints = the bar segment each stage's loss lands in: transformer + UPS (solid heat), PSU + VRM (pale heat), die (compute)
  STAGES.forEach((s, i) => { s.fill = i === 0 ? '#ebe8e2' : i < IT ? alpha(C.heat, 0.42) : i < STAGES.length - 1 ? alpha(C.heat, 0.17) : alpha(C.compute, 0.3); });
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 260 : 206),
    label: 'Where a watt is lost on the path from the grid to the die, with the IT boundary at which PUE is measured and the cooling the facility adds',
    draw(ctx, w, h) {
      // narrow: two rows of three, facility stages above the IT boundary and IT stages below it
      const n = narrow(w), l = 12, r = w - 12, t = n ? 12 : 30, cols = n ? IT : STAGES.length, bw = (r - l - 10) / cols, bh = n ? 58 : 72, gap = 30;
      const B = split();
      STAGES.forEach((s, i) => {
        const x = l + (i % cols) * (bw + 2), y0 = t + Math.floor(i / cols) * (bh + gap);
        rrect(ctx, x, y0, bw - 2, bh, 5);
        ctx.fillStyle = s.fill; ctx.fill(); // tinted like its band in the bar below (T8)
        text(ctx, s.name, x + (bw - 2) / 2, y0 + 20, { size: 10.5, weight: 700, align: 'center', color: C.ink });
        text(ctx, s.v, x + (bw - 2) / 2, y0 + 37, { size: 10, align: 'center', color: C.ink2 });
        if (s.loss) text(ctx, `−${Math.round(s.loss * 100)}%`, x + (bw - 2) / 2, y0 + 52, { size: 10, align: 'center', color: C.heat, weight: 650 });
      });
      // the IT boundary: PUE's denominator is metered here, so PSU and VRM losses are "IT load"
      let bot;
      if (n) {
        const by = t + bh + 9;
        line(ctx, l, by, r, by, C.ink, 1.5, [4, 3]);
        text(ctx, 'IT boundary (PUE metered here) · IT load below', (l + r) / 2, by + 14, { size: 9.5, weight: 700, align: 'center', color: C.ink });
        bot = t + 2 * bh + gap;
      } else {
        const bx = l + IT * (bw + 2) - 2;
        line(ctx, bx, t - 5, bx, t + bh + 6, C.ink, 1.5, [4, 3]);
        text(ctx, 'IT boundary (PUE metered here)', bx, t - 12, { size: 10.5, weight: 700, align: 'center', color: C.ink });
        text(ctx, '← facility', bx - 6, t + bh + 18, { size: 10, align: 'right', color: C.ink3 });
        text(ctx, 'IT load →', bx + 6, t + bh + 18, { size: 10, color: C.ink3 });
        bot = t + bh + 12;
      }
      // grid power split, to scale
      const y = bot + 20, segs = [[B.die, C.compute], [B.server, alpha(C.heat, 0.35)], [B.elec, C.heat], [B.cool, C.cyan]];
      let x = l; segs.forEach(([v, col]) => { const ww = (r - l) * v; if (ww > 0.5) { ctx.fillStyle = col; ctx.fillRect(x, y, ww, 16); } x += ww; });
      const lg = [['die', C.compute, B.die], ['PSU + VRM (inside IT)', alpha(C.heat, 0.35), B.server], ['transformer + UPS', C.heat, B.elec], ['cooling and the rest', C.cyan, B.cool]];
      let fx = l; // desktop legend flows left to right with a fixed gap (equal quarters made long names run into the next swatch)
      lg.forEach(([name, col, v], i) => {
        const lx = n ? l + (i % 2) * (r - l) / 2 : fx, ly = y + 34 + (n ? Math.floor(i / 2) * 18 : 0);
        fx += 14 + `${name} 00%`.length * 10.5 * 0.53 + 18;
        ctx.fillStyle = col; ctx.fillRect(lx, ly - 9, 10, 10);
        text(ctx, `${name} ${Math.round(v * 100)}%`, lx + 14, ly, { size: n ? 9.5 : 10.5, color: C.ink2 });
      });
    },
  });
  // shares of grid power: IT input = 1/PUE; facility electrical losses fixed by the stage table; cooling etc. = the remainder
  const split = () => {
    const feed = STAGES.slice(1, IT).reduce((d, s) => d * (1 - s.loss), 1);
    const inIT = STAGES.slice(IT).reduce((d, s) => d * (1 - s.loss), 1);
    const it = 1 / pue, elec = it / feed - it, cool = Math.max(0, 1 - it - elec);
    return { it, elec, cool, die: it * inIT, server: it * (1 - inIT) };
  };
  const ctl = controls(el);
  slider(ctl, { label: 'Site PUE', name: 'pue', min: 1.09, max: 1.56, step: 0.01, value: pue, color: C.cyan, fmt: v => v.toFixed(2), oninput: v => { pue = v; paint(); } });
  const ro = readout(el);
  const paint = () => {
    const B = split();
    ro.innerHTML = `At PUE <b>${pue.toFixed(2)}</b>, transformer and UPS take <b>${Math.round(B.elec * 100)}%</b> of grid power and cooling and the rest <b>${Math.round(B.cool * 100)}%</b>: that is the overhead PUE counts. The server’s own PSU and VRM lose another <b>${Math.round(B.server * 100)}%</b>, which PUE files under IT load. About <b>${Math.round(B.die * 100)}%</b> reaches the die.`;
    fig.invalidate();
  };
  hint(el, 'slide from Google’s 1.09 to the survey average 1.56: the cyan cooling band does most of the growing.');
  paint();
}
