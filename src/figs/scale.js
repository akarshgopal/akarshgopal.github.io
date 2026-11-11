// Essay §12–14: the compute trend (Epoch, real data), GPU-hours per MWh (computed from cited inputs), cluster to grid.
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten } from '../lib/colors.js';
import { text, rrect, line, circle, clamp, axes, measure } from '../lib/draw.js';
import { controls, slider, segmented, readout, hint, more } from '../lib/ui.js';
import { MODELS } from '../lib/aidata.js';
import { K, gpuHoursPerMWh } from '../lib/constants.js';
import { sci, sup, sig } from './chips.js';

const narrow = w => w < 560, L10 = Math.log10;
export const CTRY = { US: ['United States', C.blue], CN: ['China', C.red], UK: ['UK', C.green], other: ['elsewhere', C.orange] }; // the prose names these in the same colours, so the figure needs no key
const cgroup = c => c === 'US' || c === 'CN' || c === 'UK' ? c : 'other';
const h100hours = F => [F / (K.h100.bf16 * K.mfu.hi) / 3600, F / (K.h100.bf16 * K.mfu.lo) / 3600];
export const mwhFor = gh => [gh / gpuHoursPerMWh(K.pue.best), gh / gpuHoursPerMWh(K.pue.avg)];
const p2 = v => Number(v.toPrecision(2)).toLocaleString('en-GB'); // two significant figures, never in e-notation
const fmtE = mwh => mwh >= 1e6 ? `${p2(mwh / 1e6)} TWh` : mwh >= 1e3 ? `${p2(mwh / 1e3)} GWh` : mwh >= 1 ? `${p2(mwh)} MWh` : `${p2(mwh * 1000)} kWh`;
function fit(a) { const mx = a.reduce((s, p) => s + p[0], 0) / a.length, my = a.reduce((s, p) => s + L10(p[1]), 0) / a.length; const b = a.reduce((s, p) => s + (p[0] - mx) * (L10(p[1]) - my), 0) / a.reduce((s, p) => s + (p[0] - mx) ** 2, 0); return { b, at: y => my + b * (y - mx) }; }

// ---------- 12. Seventy years of training compute ----------
export function computeTrend(el) {
  const pre = fit(MODELS.filter(m => m[0] < 2010).map(m => [m[0], m[1]])), post = fit(MODELS.filter(m => m[0] >= 2010).map(m => [m[0], m[1]]));
  let year = 2020.4, R = {};
  const pickAt = y => { const c = MODELS.filter(m => Math.abs(m[0] - y) < 0.6); return c.length ? c.reduce((a, b) => b[1] > a[1] ? b : a) : null; };
  const fig = new Fig(el, {
    height: w => narrow(w) ? 400 : Math.round(Math.min(460, w * 0.5)), label: 'Training compute of notable AI models from 1950 to 2026, from Epoch AI',
    draw(ctx, w, h) {
      const n = narrow(w), box = { l: n ? 48 : 62, t: 30, r: w - 12, b: h - 66 };
      const { sx, sy } = axes(ctx, { x0: 1950, x1: 2027, y0: 0, y1: 28, box, yticks: [0, 7, 14, 21, 28], yfmt: v => `10${sup(v)}`, xticks: n ? [1950, 1980, 2010] : [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020], ylabel: 'operations used in training (log scale)' });
      for (const [k, [nm, col]] of Object.entries(CTRY)) void nm;
      for (const m of MODELS) circle(ctx, sx(m[0]), sy(clamp(L10(m[1]), 0, 28)), n ? 2.2 : 2.8, alpha(CTRY[cgroup(m[4])][1], 0.62));
      const dash = (f, a, b, col) => { ctx.save(); ctx.setLineDash([6, 5]); line(ctx, sx(a), sy(f.at(a)), sx(b), sy(f.at(b)), col, 2); ctx.restore(); };
      dash(pre, 1950, 2010, C.ink2); dash(post, 2010, 2026.8, C.ink);
      text(ctx, `×${(10 ** pre.b).toFixed(2)} a year`, sx(1965), sy(pre.at(1965)) - 16, { size: 12.5, color: C.ink2, weight: 650, halo: 4 });
      text(ctx, `×${(10 ** post.b).toFixed(1)} a year`, sx(2022), Math.min(box.b - 8, sy(post.at(2022)) + 26), { size: 12.5, color: C.ink, weight: 650, align: 'right', halo: 4 });
      const m = pickAt(year), cx = sx(year);
      line(ctx, cx, box.t + 18, cx, box.b, alpha(C.ink, 0.6), 1);
      if (m) { const px = sx(m[0]), py = sy(L10(m[1])); circle(ctx, px, py, 7, '#fff', C.ink, 2.5); const lab = m[2].length > 28 ? m[2].slice(0, 27) + '…' : m[2]; text(ctx, lab, px + (px > w * 0.65 ? -10 : 10), py - 10, { size: 12.5, weight: 700, color: C.ink, align: px > w * 0.65 ? 'right' : 'left', halo: 4 }); }
      circle(ctx, cx, box.b + 28, 11, C.ink, '#fff', 2); text(ctx, String(Math.floor(year)), cx, box.b + 52, { size: 12.5, align: 'center', weight: 700, color: C.ink });
      R = { sx, box };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => y > R.box.t ? 'y' : null, cursor: 'ew-resize', down(k, x) { year = clamp(R.sx.inv(x), 1950.5, 2026.7); paint(); }, move(k, x) { year = clamp(R.sx.inv(x), 1950.5, 2026.7); paint(); } });
  const ro = readout(el);
  const paint = () => {
    const m = pickAt(year); if (!m) { ro.innerHTML = 'No notable model with a compute estimate here; drag on.'; fig.invalidate(); return; }
    const [g1, g2] = h100hours(m[1]), lo = Math.min(g1, g2), hi = Math.max(g1, g2), e = [mwhFor(lo)[0], mwhFor(hi)[1]]; // fewest GPU-hours in the best building … most in the average one
    ro.innerHTML = `<b style="color:${CTRY[cgroup(m[4])][1]}">${m[2]}</b> (${m[3]}, ${Math.floor(m[0])}): about <b>${sci(m[1])}</b> operations. ${m[1] > 1e18 ? `That is <b>${sci(Math.round(g1), 2)}–${sci(Math.round(g2), 2)} H100-hours</b> at Llama 3’s 38–43% efficiency, roughly <b>${fmtE(e[0])}–${fmtE(e[1])}</b>.` : 'Too small to bother one modern chip.'}`;
    fig.invalidate();
  };
  hint(el, 'drag along the chart to pick out the biggest model of each year. Dots are coloured by where the developer is based.');
  paint();
}

// ---------- 13. What one megawatt-hour buys ----------
export function gpuMWh(el) {
  let pue = 1.3, load = 1, price = 85, R = {};
  const fig = new Fig(el, {
    height: w => narrow(w) ? 360 : 300, label: 'One megawatt-hour split into IT energy and cooling overhead, and the H100-hours it buys',
    draw(ctx, w, h) {
      const n = narrow(w), bx = 12, by = 16, bw = w - 24, bh = h - 104;
      const it = 1 / pue, gph = gpuHoursPerMWh(pue, load), cells = Math.round(gph / 10);
      rrect(ctx, bx, by, bw, bh, 10); ctx.fillStyle = alpha(C.heat, 0.16); ctx.fill();
      const iw = bw * it; rrect(ctx, bx, by, iw, bh, 10); ctx.fillStyle = alpha(C.compute, 0.1); ctx.fill();
      // GPU-hour tiles inside the IT part: each tile = 10 GPU-hours
      const cols = Math.max(1, Math.floor(Math.sqrt(cells * iw / bh))), rows = Math.ceil(cells / cols), cw = (iw - 12) / cols, ch = Math.min((bh - 12) / rows, cw * 1.4);
      for (let i = 0; i < cells; i++) { const x = bx + 6 + (i % cols) * cw, y = by + 6 + Math.floor(i / cols) * ch; rrect(ctx, x + 1, y + 1, cw - 2, ch - 2, 2.5); ctx.fillStyle = alpha(C.compute, 0.8); ctx.fill(); }
      text(ctx, n ? 'cooling and losses' : 'cooling, power conversion, lighting', bx + iw + (bw - iw) / 2, by + bh / 2, { size: 12, align: 'center', weight: 650, color: C.heat });
      text(ctx, '1 MWh', bx + bw - 8, by + 18, { size: 13, align: 'right', weight: 700, color: C.ink });
      // PUE rail
      const ry = h - 46, rl = bx + 10, rr = bx + bw - 10, sx = v => rl + (v - 1) / 1 * (rr - rl);
      line(ctx, rl, ry, rr, ry, C.grid2, 4); rrect(ctx, rl, ry - 2, sx(pue) - rl, 4, 2); ctx.fillStyle = C.heat; ctx.fill();
      [[K.pue.best, n ? 'Google 2024' : 'Google’s fleet, 2024'], [K.pue.avg, n ? 'average' : 'survey average, 2024']].forEach(([v, s]) => { line(ctx, sx(v), ry - 9, sx(v), ry + 9, C.ink3, 1.2); text(ctx, `${s} (${v})`, sx(v), ry + 26, { size: 11, align: 'center', color: C.ink3 }); });
      circle(ctx, sx(pue), ry, 11, '#fff', C.heat, 3); text(ctx, `PUE ${pue.toFixed(2)}`, sx(pue), ry - 18, { size: 12.5, align: 'center', weight: 700, color: C.heat });
      R = { sx, ry, rl, rr };
    },
  });
  fig.interact({ hit: (x, y) => Math.abs(y - R.ry) < 30 ? 'p' : null, cursor: 'ew-resize', down(k, x) { set(x); }, move(k, x) { set(x); } });
  const set = x => { pue = clamp(1 + (x - R.rl) / (R.rr - R.rl), 1.02, 2); paint(); };
  const ctl = controls(el); const mr = more(ctl, 'Server load and power price');
  slider(mr, { label: 'Server draw, share of its 10.2 kW maximum', name: 'load', min: 0.5, max: 1, step: 0.01, value: load, color: C.compute, fmt: v => `${Math.round(v * 100)}%`, oninput: v => { load = v; paint(); } });
  slider(mr, { label: 'Price of electricity', name: 'price', min: 20, max: 300, step: 5, value: price, color: C.heat, fmt: v => `$${v}/MWh`, oninput: v => { price = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const g = gpuHoursPerMWh(pue, load); ro.innerHTML = `One megawatt-hour runs an H100 for <b>${Math.round(g)} hours</b> (each blue tile is 10). At $${price}/MWh the electricity for one GPU-hour costs <b>$${(price / g).toFixed(2)}</b>. At full draw the range from the best fleet to the survey average is <b>${Math.round(gpuHoursPerMWh(K.pue.avg))}–${Math.round(gpuHoursPerMWh(K.pue.best))}</b> GPU-hours per MWh.`; fig.invalidate(); };
  hint(el, 'drag the orange knob: PUE is how much the whole building uses for every unit the computers use.');
  paint();
}

// ---------- 14. From a server to a power station ----------
export function clusterGrid(el) {
  let N = 100000, R = {};
  const kW = pue => N * K.dgxH100.maxW / K.dgxH100.gpus / 1000 * pue;
  const REFS = [
    [K.dgxH100.maxW / 1e6, 'one 8-GPU server, 10.2 kW'],
    [K.colossus.MW, 'xAI Colossus, 2024: 150 MW'],
    [K.irelandDc.twh2024 * 1e6 / 8760, 'all Irish data centres, 2024 average'],
    [K.nerc2024MW, 'data-centre load lost in Virginia, July 2024'],
    [K.dcTWh2024 * 1e6 / 8760, 'every data centre in the world, 2024 average'],
    [K.dcTWh2030 * 1e6 / 8760, 'IEA base case for 2030'],
  ].sort((a, b) => a[0] - b[0]);
  const fig = new Fig(el, {
    height: w => narrow(w) ? 380 : 320, label: 'A cluster’s power draw on a log scale from one server to all the world’s data centres',
    draw(ctx, w, h) {
      const n = narrow(w), l = 22, r = w - 22, sx = mw => l + (L10(mw) - -2) / (6 - -2) * (r - l);
      const ay = n ? 70 : 64;
      line(ctx, l, ay, r, ay, C.grid2, 2);
      const hx = sx((kW(K.pue.best) + kW(K.pue.avg)) / 2000); // tick labels under the handle step aside
      for (let e = -2; e <= 6; e++) { const x = sx(10 ** e); line(ctx, x, ay - 4, x, ay + 4, C.ink3, 1); if ((!n || e % 2 === 0) && Math.abs(x - hx) > 30) text(ctx, e < 0 ? `${10 ** (e + 3)} kW` : e < 3 ? `${10 ** e} MW` : `${10 ** (e - 3)} GW`, x, ay - 10, { size: 11, align: e <= -2 ? 'left' : e >= 6 ? 'right' : 'center', color: C.ink3 }); }
      text(ctx, 'power drawn, all day, every day (log scale)', l, 16, { size: 11, color: C.ink3, weight: 500 });
      // the cluster band (PUE best..avg)
      const a = sx(kW(K.pue.best) / 1000), b = sx(kW(K.pue.avg) / 1000);
      rrect(ctx, a - 3, ay - 12, b - a + 6, 24, 8); ctx.fillStyle = alpha(C.heat, 0.85); ctx.fill();
      circle(ctx, (a + b) / 2, ay, 12, '#fff', C.heat, 3);
      R = { sx, ay, l, r };
      REFS.forEach(([mw, s], i) => { const x = sx(mw), y = ay + 34 + i * (n ? 44 : 36); line(ctx, x, ay + 8, x, y - 12, alpha(C.ink3, 0.6), 1, [2, 3]); circle(ctx, x, y - 6, 4, C.ink2); const right = x > w * 0.6; text(ctx, n ? s.replace('data-centre load lost', 'load lost').replace(', 2024 average', ', 2024') : s, x + (right ? -8 : 8), y - 2, { size: n ? 11.5 : 12, align: right ? 'right' : 'left', color: C.ink2 }); });
    },
  });
  const setN = x => { const mw = 10 ** ((x - R.l) / (R.r - R.l) * 8 - 2); N = Math.round(clamp(mw * 1000 / (K.dgxH100.maxW / 8000 * 1.3), 8, 3e6)); if (N > 1000) N = Math.round(N / 1000) * 1000; paint(); };
  fig.interact({ hit: (x, y) => Math.abs(y - R.ay) < 28 ? 'n' : null, cursor: 'ew-resize', down(k, x) { setN(x); }, move(k, x) { setN(x); } });
  const ro = readout(el);
  const paint = () => { const lo = kW(K.pue.best) / 1000, hi = kW(K.pue.avg) / 1000, twh = [lo * 8.76 / 1000, hi * 8.76 / 1000]; const f = v => v >= 1000 ? `${sig(v / 1000, 2)} GW` : v >= 1 ? `${sig(v)} MW` : `${sig(v * 1000)} kW`; ro.innerHTML = `<b>${N.toLocaleString('en-GB')} H100s</b> in 8-GPU servers draw <b>${f(lo)}–${f(hi)}</b>: <b>${twh[0] >= 1 ? sig(twh[0], 2) + '–' + sig(twh[1], 2) + ' TWh' : sig(twh[0] * 1000, 2) + '–' + sig(twh[1] * 1000, 2) + ' GWh'}</b> a year flat out, ${sig(twh[0] / K.dcTWh2024 * 100, 2)}–${sig(twh[1] / K.dcTWh2024 * 100, 2)}% of all data centres’ 2024 use.`; fig.invalidate(); };
  hint(el, 'drag the orange marker to grow the cluster from one server to millions of GPUs.');
  paint();
}
