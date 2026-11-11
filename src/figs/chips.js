// Essay §4–6: Moore and Dennard (real data), energy per operation ladder (real data), many slow hands (model).
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten } from '../lib/colors.js';
import { text, rrect, line, circle, clamp, axes, measure, tag } from '../lib/draw.js';
import { controls, slider, segmented, readout, hint, more } from '../lib/ui.js';
import { RUPP, HW, MODELS } from '../lib/aidata.js';
import { isPlaying } from '../lib/fig.js';
import { K } from '../lib/constants.js';

const narrow = w => w < 560;
const L10 = Math.log10;
export const sci = (v, d = 2) => { if (!isFinite(v)) return '–'; if (v === 0) return '0'; const e = Math.floor(L10(Math.abs(v))); if (e >= -2 && e < 4) return v.toLocaleString('en-GB', { maximumSignificantDigits: 3 }); const m = v / 10 ** e; return `${m.toFixed(d - 1)}×10${sup(e)}`; };
const SUPS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
export const sup = e => String(e).split('').map(c => SUPS[c]).join('');
// significant figures without e-notation (readouts must never show 1.5e+2)
export const sig = (v, n = 3) => (!isFinite(v) ? '–' : Math.abs(v) < 1e-6 && v !== 0 ? '<0.000001' : v.toLocaleString('en-GB', { maximumSignificantDigits: n }));
export const big = v => { const u = [[1e18, 'quintillion'], [1e15, 'quadrillion'], [1e12, 'trillion'], [1e9, 'billion'], [1e6, 'million'], [1e3, 'thousand']]; for (const [k, s] of u) if (v >= k) return `${(v / k).toLocaleString('en-GB', { maximumSignificantDigits: 3 })} ${s}`; return v.toLocaleString('en-GB', { maximumSignificantDigits: 3 }); };

// ---------- Moore and Dennard ----------
export function dennard(el) {
  const S = [
    { k: 'transistors', name: 'transistors (thousands)', short: 'transistors', c: C.compute, f: v => big(v * 1000) },
    { k: 'frequency', name: 'clock (MHz)', short: 'clock', c: C.ink2, f: v => v >= 1000 ? `${(v / 1000).toFixed(1)} GHz` : `${sig(v, v >= 100 ? 3 : 2)} MHz` },
    { k: 'watts', name: 'power (watts)', short: 'power', c: C.heat, f: v => `${Number(v.toPrecision(2)).toLocaleString('en-GB')} W` },
    { k: 'cores', name: 'cores', short: 'cores', c: C.memory, f: v => `${Math.round(v)}` },
  ];
  // trend: least-squares fit of log10(clock in MHz) against year, over every chip from 1985 to 2004 (Rupp's frequency series is in MHz).
  // The dashed line, the marker on it and the readout all call trend(), so they cannot disagree.
  const pts = RUPP.frequency.filter(([y]) => y >= 1985 && y <= 2004.5);
  const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length, my = pts.reduce((s, p) => s + L10(p[1]), 0) / pts.length;
  const slope = pts.reduce((s, p) => s + (p[0] - mx) * (L10(p[1]) - my), 0) / pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0);
  const trend = y => 10 ** (my + slope * (y - mx));
  let year = 2021, R = {};
  const near = (k, y) => { const a = RUPP[k].filter(p => Math.abs(p[0] - y) <= 1.5); return a.length ? Math.max(...a.map(p => p[1])) : null; };
  const fig = new Fig(el, {
    height: w => narrow(w) ? 420 : Math.round(Math.min(470, w * 0.52)), label: 'Fifty years of microprocessors: transistor count, clock speed, power and cores',
    draw(ctx, w, h) {
      const n = narrow(w), box = { l: n ? 40 : 52, t: 26, r: w - (n ? 70 : 118), b: h - 64 };
      const { sx, sy } = axes(ctx, { x0: 1970, x1: 2022, y0: -1, y1: 8, box, yticks: [0, 2, 4, 6, 8], yfmt: v => v < 3 ? String(10 ** v) : `10${sup(v)}`, xticks: n ? [1970, 1990, 2010] : [1970, 1980, 1990, 2000, 2010, 2020], ylabel: n ? 'each in its own unit (log scale)' : 'each in its own unit, log scale: transistors in thousands, clock in MHz, power in watts' });
      // post-2005 shading
      ctx.fillStyle = alpha(C.heat, 0.06); ctx.fillRect(sx(2005), box.t, box.r - sx(2005), box.b - box.t);
      text(ctx, n ? 'clocks stall' : 'after ~2005: clocks stall', sx(2005) + 6, box.t + 12, { size: 11, color: C.heat, weight: 600 });
      // trend
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = alpha(C.ink2, 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); for (let y = 1985; y <= 2022; y += 0.5) { const yy = sy(clamp(L10(trend(y)), -1, 8)); y === 1985 ? ctx.moveTo(sx(y), yy) : ctx.lineTo(sx(y), yy); } ctx.stroke(); ctx.restore();
      for (const s of S) for (const [y, v] of RUPP[s.k]) circle(ctx, sx(y), sy(clamp(L10(v), -1, 8)), n ? 2.3 : 2.8, alpha(s.c, 0.75));
      // direct labels at the right
      const ends = S.map(s => { const last = RUPP[s.k].filter(p => p[0] > 2015); const v = Math.max(...last.map(p => p[1])); return [s, sy(L10(v))]; }).sort((a, b) => a[1] - b[1]);
      // the dashed trend's label joins the right-hand labels so they push each other apart instead of colliding
      ends.push([{ short: 'clock trend', c: C.ink2, trend: 1 }, Math.max(sy(L10(trend(2021))), box.t + 8)]); ends.sort((a, b) => a[1] - b[1]);
      let prev = -99; for (const [s, y] of ends) { const yy = Math.max(y, prev + 15); prev = yy; text(ctx, s.short, box.r + 10, yy + 4, s.trend ? { size: 11, color: C.ink2 } : { size: 12, weight: 650, color: s.c }); }
      // cursor
      const cx = sx(year); line(ctx, cx, box.t, cx, box.b, C.ink, 1.5);
      for (const s of S) { const v = near(s.k, year); if (v) circle(ctx, cx, sy(L10(v)), 5.5, '#fff', s.c, 2.5); }
      if (year > 2006) { const tv = trend(year), ty2 = sy(clamp(L10(tv), -1, 8)); circle(ctx, cx, ty2, 4.5, '#fff', C.ink2, 2); text(ctx, `${Math.round(tv / 1000)} GHz`, cx - 8, ty2 + 4, { size: 11, align: 'right', color: C.ink2, weight: 650, halo: 3 }); }
      circle(ctx, cx, box.b + 26, 11, C.ink, '#fff', 2); text(ctx, String(Math.round(year)), cx, box.b + 50, { size: 12.5, align: 'center', weight: 700, color: C.ink });
      R = { sx, box };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => y > R.box.t - 10 ? 'yr' : null, move(k, x) { year = clamp(R.sx.inv(x), 1971, 2021.4); paint(); }, down(k, x) { year = clamp(R.sx.inv(x), 1971, 2021.4); paint(); }, cursor: 'ew-resize' });
  const ro = readout(el);
  const s1 = v => v >= 1000 ? `${(v / 1000).toFixed(1)} GHz` : `${Math.round(v)} MHz`;
  if (typeof window !== 'undefined') (window.__checks ??= {}).dennardTrend = { slope, perYear: 10 ** slope, mhz2021: trend(2021) };
  const paint = () => {
    const v = S.map(s => near(s.k, year)), yr = Math.round(year);
    const parts = S.map((s, i) => v[i] ? `<span style="color:${s.c};font-weight:650">${s.f(v[i])}</span> ${s.short === 'cores' && Math.round(v[i]) === 1 ? 'core' : s.short}` : null).filter(Boolean);
    const gap = v[1] && year > 2006 ? ` On their 1985–2004 trend clocks would be at <b>${Math.round(trend(year) / 1000)} GHz</b> (open dot).` : '';
    ro.innerHTML = `Around ${yr}, the biggest chips had ${parts.join(', ')}.${gap}`; fig.invalidate();
  };
  hint(el, 'drag along the chart to move through the years. Watch the blue (transistors) keep climbing after 2005 while the grey (clock) and orange (power) go flat.');
  paint();
}

// ---------- A ladder of machines: operations per joule ----------
const MACH = [
  { n: 'ENIAC', y: 1946, ops: 5000, W: 150e3, k: 'sys', note: '10-digit additions' },
  { n: 'Cray-1', y: 1976, ops: 160e6, W: 115e3, k: 'sys', note: 'peak' },
  { n: 'K computer', y: 2011, ops: 10.51e15, W: 12.66e6, k: 'sys', world: 'JP' },
  { n: 'Fugaku', y: 2020, ops: 442.01e15, W: 29.899e6, k: 'sys', world: 'JP' },
  { n: 'Frontier', y: 2022, ops: 1.353e18, W: 24.607e6, k: 'sys' },
];
const chip = (name, label, world) => { const h = HW.find(r => r[1] === name); return { n: label, y: Math.floor(h[0]), ops: h[3] || h[4], W: h[5], k: 'chip', world, src: name }; };
export function joulesPerOp(el) {
  const p3 = v => Number(v.toPrecision(3)).toLocaleString('en-GB'); // energy in kWh → readable unit, never e-notation
  const kwh = E => E >= 1e12 ? sci(E / 1e9) + ' TWh' : E >= 1e9 ? p3(E / 1e9) + ' TWh' : E >= 1e6 ? p3(E / 1e6) + ' GWh' : E >= 1e3 ? p3(E / 1e3) + ' MWh' : p3(E) + ' kWh';
  const M = [...MACH, chip('NVIDIA GeForce GTX 580', 'GTX 580 (gaming GPU)'), chip('NVIDIA Tesla V100 SXM2', 'V100'), chip('Google TPU v4', 'TPU v4'), chip('NVIDIA A100 SXM4 80 GB', 'A100'), chip('Huawei Ascend 910C', 'Ascend 910C', 'CN'), chip('NVIDIA H100 SXM5 80GB', 'H100'), chip('NVIDIA B200', 'B200')]
    .map(m => ({ ...m, eff: m.ops / m.W })).sort((a, b) => a.eff - b.eff);
  const JOBS = { alex: ['AlexNet’s training', 'AlexNet'], gpt3: ['GPT-3’s training', 'GPT-3 175B (davinci)'], llama: ['Llama 3.1 405B’s training', 'Llama 3.1-405B'] };
  const flop = k => MODELS.find(m => m[2] === JOBS[k][1])[1];
  let sel = M.findIndex(m => m.n === 'ENIAC'), job = 'gpt3', R = {};
  const REF = [[1, '1 kWh'], [1e3, '1 MWh'], [1e6, '1 GWh'], [6.969e9, 'Irish data centres, 2024'], [K.ember.world2025 * 1e9, 'world electricity, 2025']];
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 32 : 28) * M.length + (narrow(w) ? 150 : 120), label: 'Machines from ENIAC to the B200 ranked by operations per joule',
    draw(ctx, w, h) {
      const n = narrow(w), rh = n ? 32 : 28, x0 = n ? 130 : 190, x1 = w - (n ? 16 : 150), y0 = 30;
      const sx = v => x0 + (L10(v) - -2) / (13 - -2) * (x1 - x0);
      text(ctx, 'operations per joule (log scale)', x0, 14, { size: 11, color: C.ink3, weight: 500 });
      for (let e = -2; e <= 13; e += n ? 5 : 5) { const x = sx(10 ** e); line(ctx, x, y0 - 4, x, y0 + rh * M.length, C.grid, 1); const al = e <= -2 ? 'left' : e >= 13 ? 'right' : 'center'; text(ctx, `10${sup(e)}`, x, y0 + rh * M.length + 16, { size: 12, align: al, color: C.ink3 }); }
      M.forEach((m, i) => {
        const y = y0 + i * rh, on = i === sel, col = m.k === 'sys' ? C.ink2 : C.compute;
        if (on) { rrect(ctx, 2, y, w - 4, rh - 3, 6); ctx.fillStyle = alpha(C.on, 0.18); ctx.fill(); }
        text(ctx, `${n ? m.n.replace(/ \(.*\)$/, '') : m.n}${m.world ? ' ◆' : ''}`, 8, y + rh * 0.62, { size: n ? 11.5 : 12.5, weight: on ? 700 : 500, color: C.ink });
        if (!n) text(ctx, String(m.y), x0 - 10, y + rh * 0.62, { size: 11.5, align: 'right', color: C.ink3 });
        else text(ctx, String(m.y), x0 - 6, y + rh * 0.62, { size: 10.5, align: 'right', color: C.ink3 });
        rrect(ctx, x0, y + rh * 0.25, Math.max(3, sx(m.eff) - x0), rh * 0.4, 3); ctx.fillStyle = on ? col : alpha(col, 0.45); ctx.fill();
        if (m.k === 'chip') { ctx.fillStyle = '#fff'; ctx.fillRect(sx(m.eff) - 2, y + rh * 0.25, 2, rh * 0.4); }
        if (!n) text(ctx, sci(m.eff), sx(m.eff) + 6, y + rh * 0.62, { size: 11, color: on ? C.ink : C.ink3, weight: on ? 650 : 450 });
      });
      // the draggable job token sits on the selected rung
      const ys = y0 + sel * rh + rh / 2, xs = w - (n ? 26 : 70);
      rrect(ctx, xs - (n ? 14 : 58), ys - 11, n ? 28 : 116, 22, 11); ctx.fillStyle = C.ink; ctx.fill();
      text(ctx, n ? '⇕' : `⇕ ${JOBS[job][0].split('’')[0]}`, xs, ys + 4, { size: 11.5, align: 'center', weight: 650, color: '#fff' });
      // energy gauge
      const E = flop(job) / M[sel].eff / 3.6e6, gy = y0 + rh * M.length + 44, g0 = 8, g1 = w - 8;
      const gx = v => g0 + (L10(v) - -1) / (19 - -1) * (g1 - g0);
      line(ctx, g0, gy, g1, gy, C.grid2, 6);
      rrect(ctx, g0, gy - 4, Math.max(4, gx(clamp(E, 0.1, 1e19)) - g0), 8, 4); ctx.fillStyle = C.heat; ctx.fill();
      REF.forEach(([v, s], i) => { const x = gx(v); line(ctx, x, gy - 8, x, gy + 8, C.ink3, 1); if (!n || i % 2 === 0 || i === REF.length - 1) text(ctx, s, x, gy + (i % 2 || (n && i === REF.length - 1) ? -12 : 22), { size: 10.5, align: i === REF.length - 1 ? 'right' : 'center', color: C.ink3 }); });
      text(ctx, `energy for ${JOBS[job][0]}: ${kwh(E)}`, g0, gy + (n ? 44 : 40), { size: 13, weight: 650, color: C.heat });
      R = { y0, rh, xs };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (y > R.y0 && y < R.y0 + R.rh * M.length) ? 'row' : null, cursor: 'ns-resize', down(k, x, y) { sel = clamp(Math.floor((y - R.y0) / R.rh), 0, M.length - 1); paint(); }, move(k, x, y) { sel = clamp(Math.floor((y - R.y0) / R.rh), 0, M.length - 1); paint(); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'The job', value: job, options: [{ label: 'AlexNet, 2012', value: 'alex', name: 'j-alex' }, { label: 'GPT-3, 2020', value: 'gpt3', name: 'j-gpt3' }, { label: 'Llama 3.1, 2024', value: 'llama', name: 'j-llama' }], onchange: v => { job = v; paint(); } });
  const ro = readout(el);
  const paint = () => {
    const m = M[sel], F = flop(job), E = F / m.eff / 3.6e6, t = F / m.ops / 3.156e7;
    const world = E / (K.ember.world2025 * 1e9), time = t > 1e6 ? `${sci(t)} years` : t > 1 ? `${sig(t)} years` : t * 365.25 > 1 ? `${sig(t * 365.25)} days` : `${sig(t * 8766)} hours`;
    ro.innerHTML = `${JOBS[job][0]} took about <b>${sci(F)} operations</b>. On ${m.k === 'chip' ? 'one ' : ''}<b>${m.n}</b> it would need <b>${time}</b> and ${world > 0.5 ? `<b>${sci(world)} years of all the world’s electricity</b>` : `<b>${kwh(E)}</b>`}${m.k === 'chip' ? ' (the chip alone, at its rated power)' : ''}.`;
    fig.invalidate();
  };
  hint(el, 'drag up and down the ladder to run the same job on a different machine. Grey bars are whole supercomputers; blue bars are single AI chips.');
  paint();
}

// ---------- Many slow hands: Amdahl ----------
export function manyHands(el) {
  let N = 8, s = 0.05, R = {}, prog = 0;
  const fig = new Fig(el, {
    height: w => narrow(w) ? 330 : 300, animated: true, label: 'A job split between one fast worker and many workers; the serial part does not shrink',
    step(dt) { prog = (prog + dt * 0.25) % 1.25; },
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 18 : 140, r = w - 22, T = r - l;
      // knob for N on a log axis 1..1024 — keep end tick labels inside the card
      const ky = 34, kx = v => l + L10(v) / L10(1024) * T;
      line(ctx, l, ky, r, ky, C.grid2, 4); rrect(ctx, l, ky - 2, kx(N) - l, 4, 2); ctx.fillStyle = C.compute; ctx.fill();
      [1, 4, 16, 64, 256, 1024].forEach((v, i, arr) => text(ctx, String(v), kx(v), ky + 22, { size: 11, align: i === 0 ? 'left' : i === arr.length - 1 ? 'right' : 'center', color: C.ink3 }));
      circle(ctx, kx(N), ky, 11, '#fff', C.compute, 3);
      text(ctx, `${N} worker${N > 1 ? 's' : ''}`, n ? l : 10, n ? 14 : ky + 5, { size: 12.5, weight: 650, color: C.compute });
      R.k = [kx, ky, l, r];
      // time bars
      const y1 = ky + 58, y2 = y1 + 74, bh = 26, one = T, par = s * T + (1 - s) * T / N;
      text(ctx, '1 worker', n ? l : 10, y1 - 8 + (n ? 0 : 22), { size: 12, color: C.ink2, weight: 600 });
      rrect(ctx, l, y1, s * T, bh, 4); ctx.fillStyle = C.time; ctx.fill();
      rrect(ctx, l + s * T, y1, (1 - s) * T, bh, 4); ctx.fillStyle = alpha(C.compute, 0.75); ctx.fill();
      text(ctx, `${N} workers`, n ? l : 10, y2 - 8 + (n ? 0 : 22), { size: 12, color: C.ink2, weight: 600 });
      rrect(ctx, l, y2, s * T, bh, 4); ctx.fillStyle = C.time; ctx.fill();
      const lanes = Math.min(N, 16), lh = bh * 1.6 / lanes;
      for (let i = 0; i < lanes; i++) { ctx.fillStyle = alpha(C.compute, 0.4 + 0.4 * (i % 2)); ctx.fillRect(l + s * T, y2 + i * lh - bh * 0.3, Math.max(1.5, (1 - s) * T / N), Math.max(0.8, lh - 0.6)); }
      if (N > 16) text(ctx, `(${N} lanes, 16 drawn)`, l + s * T + Math.max(6, (1 - s) * T / N + 6), y2 + bh * 0.6, { size: 10.5, color: C.ink3 });
      text(ctx, 'must happen in order', l + 2, y2 + bh + 30, { size: 11, color: C.time, weight: 600 });
      // finish lines and a sweeping "now"
      const t = clamp(prog, 0, 1) * one; line(ctx, l + Math.min(t, one), y1 - 6, l + Math.min(t, one), y1 + bh + 6, C.ink, 1.5);
      line(ctx, l + Math.min(t, par), y2 - bh * 0.4, l + Math.min(t, par), y2 + bh * 1.4, C.ink, 1.5);
      if (t >= par) text(ctx, 'done', Math.max(l + par + 6, n ? l + 84 : 0), y2 - 10, { size: 12, weight: 700, color: C.memory });
      text(ctx, 'time →', r, y2 + bh + 30, { size: 11, align: 'right', color: C.ink3 });
    },
  });
  fig.interact({ hit: (x, y) => Math.abs(y - R.k[1]) < 24 ? 'N' : null, cursor: 'ew-resize', down(k, x) { setN(x); }, move(k, x) { setN(x); } });
  const setN = x => { const [, , l, r] = R.k; N = Math.round(10 ** clamp((x - l) / (r - l) * L10(1024), 0, L10(1024))); prog = 0; paint(); };
  const ctl = controls(el);
  slider(ctl, { label: 'Share that must happen in order', name: 'serial', min: 0, max: 0.5, step: 0.005, value: s, color: C.time, fmt: v => `${(v * 100).toFixed(1)}%`, oninput: v => { s = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const sp = 1 / (s + (1 - s) / N); ro.innerHTML = `${N} workers finish <b>${sp.toFixed(sp < 10 ? 2 : 0)}×</b> faster than one. However many you add, the ordered part ${s > 0 ? `caps the gain at <b>${(1 / s).toFixed(0)}×</b>` : 'there is no cap: with nothing in order, every worker you add helps fully'}.`; fig.invalidate(); };
  hint(el, 'drag the blue knob to add workers, then shrink the grey share. Graphics and neural networks have almost no grey.');
  paint();
}
