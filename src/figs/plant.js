// Build a power plant: its full cost per MWh (LCOE) against what essay 5's model market would pay it.
// Cost side: the LCOE calculator's illustrative inputs (Lazard v19 ranges). Market side: the illustrative
// day model (lib/market.js) run over weighted representative days, as in the capture-rate figure.
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken } from '../lib/colors.js';
import { text, rrect, line, circle, clamp, axes, pathLine, tag, measure } from '../lib/draw.js';
import { controls, slider, segmented, readout, more, hint } from '../lib/ui.js';
import { simulateDay } from '../lib/market.js';
import { PRESETS, crf } from './money.js';

const USD = 1.13; // US$ per € (ECB 2025), as elsewhere in the essay
const MMBTU_PER_MWH = 3.412;
const MARKETS = {
  today: { label: 'Essay 5’s market', gas: 35, co2: 75 },
  shock: { label: '2022-style gas shock', gas: 150, co2: 85, imports: 0.001 },
};
const DAYS = [['winter', false, 0.25], ['winter', true, 0.08], ['spring', false, 0.36], ['spring', true, 0.14], ['summer', false, 0.12], ['summer', true, 0.05]];
const WINDS = [8, 14, 22], SKIES = [[1, 0.35], [0.6, 0.4], [0.25, 0.25]];
const cache = {};
// a year of hours: [{ w (hours), price ($/MWh), solar (0..1 of capacity), wind (0..1) }]
function year(mk) {
  if (cache[mk]) return cache[mk];
  const M = MARKETS[mk], hrs = []; let tw = 0;
  for (const [season, weekend, wg] of DAYS) for (const wl of WINDS) for (const [sky, sw] of SKIES) {
    const r = simulateDay({ season, weekend, solarCap: 110 * sky, windLevel: wl, steps: 24, noNuclear: true, gas: M.gas, co2: M.co2, ...(M.imports != null ? { imports: M.imports } : {}) });
    const ww = wg / WINDS.length * sw;
    for (const p of r.periods) { hrs.push({ w: ww, price: Math.min(p.price, 500) * USD, solar: p.solar / 110, wind: p.wind / 45 }); tw += ww; }
  }
  for (const h of hrs) h.w *= 8760 / tw;
  return (cache[mk] = hrs);
}

export function buildPlant(el) {
  const st = { tech: 'solar', wacc: 7.5, market: 'today', p: { ...PRESETS.solar } };
  let geom = null, res = null;
  const srmc = () => {
    if (st.tech !== 'gas') return st.p.vom;
    const M = MARKETS[st.market];
    return (M.gas * USD / MMBTU_PER_MWH) * st.p.hr + st.p.vom + 0.34 * M.co2 * USD; // fuel + CO₂ (0.34 t/MWh) + variable
  };
  function compute() {
    const hrs = year(st.market), m = srmc(), P = st.p;
    let out = 0, rev = 0, runH = 0;
    const prof = st.tech === 'solar' ? (h => h.solar) : st.tech === 'wind' ? (h => h.wind) : (() => 1);
    let shape = 0; for (const h of hrs) shape += prof(h) * h.w;
    // weather plants: scale the hourly shape to the chosen capacity factor; firm plants: run whenever the price covers running cost
    const k = st.tech === 'solar' || st.tech === 'wind' ? (P.cf / 100 * 8760) / shape : (st.tech === 'nuclear' ? 0.92 : 1);
    const run = [];
    for (const h of hrs) {
      const g = prof(h) * k, on = h.price >= m && g > 0; // weather plants: a relative profile, scaled to the chosen capacity factor
      if (on) { out += g * h.w; rev += g * h.w * (h.price - m); runH += h.w; }
      run.push({ ...h, g: on ? g : 0 });
    }
    const cf = out / 8760; // MWh per kW-yr / 8.76 => share
    const fixed = P.capex * crf(st.wacc / 100, P.life) + P.fom; // $ per kW-yr
    const mwhPerKw = out / 1000;            // out is full-load hours a year = MWh per MW; per kW divide by 1000
    const lc = { fuel: m };
    lc.cap = P.capex * crf(st.wacc / 100, P.life) / mwhPerKw;
    lc.fom = P.fom / mwhPerKw;
    const total = lc.cap + lc.fom + lc.fuel;
    const earn = out > 0 ? rev / out + m : 0;  // average price received, $/MWh
    const margin = out > 0 ? rev / out : 0;    // rent per MWh above running cost
    return (res = { run, cf, fixed, lc, total, earn, margin, m, out, runH, cover: fixed > 0 ? (rev / 1000) / fixed : 0 });
  }
  const fig = new Fig(el, {
    label: 'Build a power plant: its full cost per megawatt-hour against what the merit-order market pays it over a year, with a draggable cost-of-capital curve and the year’s prices sorted from highest to lowest',
    height: w => w < 600 ? 740 : 460,
    draw(ctx, w, h) {
      const narrow = w < 600, r = compute(), P = PRESETS[st.tech], col = P.col;
      // ---- panel A: cost vs earnings, $/MWh
      const A = narrow ? { l: 46, r: w - 12, t: 34, b: 250 } : { l: 52, r: w * 0.46, t: 34, b: 270 };
      const ymax = Math.max(160, Math.ceil(Math.max(r.total, r.earn, P.band[1]) * 1.15 / 50) * 50);
      const a = axes(ctx, { box: A, x0: 0, x1: 1, y0: 0, y1: ymax, xticks: [], ylabel: '$/MWh', ny: 4 });
      text(ctx, 'what it costs', A.l + (A.r - A.l) * 0.32, A.b + 16, { size: 11.5, weight: 650, align: 'center', color: C.ink2 });
      text(ctx, 'what it earns', A.l + (A.r - A.l) * 0.74, A.b + 16, { size: 11.5, weight: 650, align: 'center', color: C.ink2 });
      const bw = (A.r - A.l) * 0.26, bx = A.l + (A.r - A.l) * 0.32 - bw / 2, ex = A.l + (A.r - A.l) * 0.74 - bw / 2;
      let base = 0, lastY = 1e9;
      for (const [lab, v, c] of [['capital', r.lc.cap, col], ['upkeep', r.lc.fom, lighten(col, 0.45)], [st.tech === 'gas' ? 'fuel + CO₂' : 'running', r.lc.fuel, C.ink3]]) {
        if (v < 0.5) continue; const y0 = a.sy(Math.min(ymax, base)), y1 = a.sy(Math.min(ymax, base + v));
        ctx.fillStyle = c; ctx.fillRect(bx, y1, bw, y0 - y1 - 1);
        const ly = Math.min((y0 + y1) / 2 + 4, lastY - 12); lastY = ly;
        text(ctx, `${lab} ${v.toFixed(0)}`, bx - 6, ly, { size: 10.5, color: C.ink2, align: 'right' });
        base += v;
      }
      text(ctx, `$${r.total.toFixed(0)}`, bx + bw / 2, a.sy(Math.min(ymax, r.total)) - 7, { size: 13, weight: 700, align: 'center' });
      // Lazard bracket beside the cost bar
      const lx = bx + bw + 8; ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(lx, a.sy(P.band[0])); ctx.lineTo(lx + 5, a.sy(P.band[0])); ctx.moveTo(lx + 5, a.sy(P.band[0])); ctx.lineTo(lx + 5, a.sy(P.band[1])); ctx.lineTo(lx, a.sy(P.band[1])); ctx.stroke();
      if (!narrow) { text(ctx, 'Lazard', lx + 8, a.sy(P.band[1]) + 10, { size: 9.5, color: C.ink3 }); text(ctx, 'US range', lx + 8, a.sy(P.band[1]) + 21, { size: 9.5, color: C.ink3 }); } else text(ctx, 'Lazard', lx + 3, a.sy(P.band[1]) - 6, { size: 9.5, color: C.ink3, align: 'center', halo: true });
      // earnings bar: running cost + rent
      const ok = r.earn >= r.total - 0.5;
      ctx.fillStyle = C.ink3; ctx.fillRect(ex, a.sy(r.m), bw, a.sy(0) - a.sy(r.m) - 1);
      ctx.fillStyle = alpha(C.price, 0.75); ctx.fillRect(ex, a.sy(Math.min(ymax, r.earn)), bw, a.sy(r.m) - a.sy(Math.min(ymax, r.earn)));
      text(ctx, `$${r.earn.toFixed(0)}`, ex + bw / 2, a.sy(Math.min(ymax, r.earn)) - 7, { size: 13, weight: 700, align: 'center', color: C.price });
      line(ctx, bx, a.sy(Math.min(ymax, r.total)), ex + bw, a.sy(Math.min(ymax, r.total)), alpha(C.ink, 0.5), 1, [4, 3]);
      tag(ctx, ok ? 'pays for itself' : `short $${(r.total - r.earn).toFixed(0)}/MWh`, ex + bw / 2 - (ok ? 46 : 54), A.t - 24, { bg: ok ? darken(C.wind, 0.1) : C.price });
      // ---- panel B: cost of capital curve, draggable dot
      const B = narrow ? { l: 46, r: w - 12, t: 296, b: 430 } : { l: w * 0.56, r: w - 16, t: 34, b: 270 };
      const yB = Math.max(ymax, 100);
      const b = axes(ctx, { box: B, x0: 0, x1: 15, y0: 0, y1: yB, xticks: [0, 5, 10, 15], xfmt: v => v + '%', xlabel: 'cost of capital', ylabel: 'cost, $/MWh', ny: 4 });
      const pts = []; for (let x = 0; x <= 15.01; x += 0.25) { const c = st.p.capex * crf(x / 100, st.p.life) / (r.out / 1000) + r.lc.fom + r.lc.fuel; pts.push([b.sx(x), b.sy(Math.min(yB, c))]); }
      pathLine(ctx, pts, col, 2.4);
      line(ctx, B.l, b.sy(Math.min(yB, r.earn)), B.r, b.sy(Math.min(yB, r.earn)), alpha(C.price, 0.8), 1.5, [5, 4]);
      text(ctx, 'earns', B.r, b.sy(Math.min(yB, r.earn)) - 5, { size: 10.5, color: C.price, align: 'right', halo: true, weight: 600 });
      const dx = b.sx(st.wacc), dy = b.sy(Math.min(yB, r.total));
      circle(ctx, dx, dy, 9, col, '#fff', 2.5); text(ctx, '↔', dx, dy + 4, { size: 10, color: '#fff', align: 'center', weight: 700 });
      text(ctx, `${st.wacc.toFixed(1)}%`, Math.max(dx, B.l + 24), dy - 14, { size: 11, weight: 650, align: 'center', halo: true });
      // ---- panel C: the year's prices, sorted; the plant runs where price ≥ its running cost, and the shaded area is its rent
      const Cb = narrow ? { l: 46, r: w - 12, t: 486, b: h - 50 } : { l: 52, r: w - 16, t: 330, b: h - 30 };
      const hrs = [...r.run].sort((p, q) => q.price - p.price);
      const pmax = Math.max(250, Math.ceil(Math.max(...hrs.map(q => q.price).filter(v => v < 560)) * 1.08 / 50) * 50), pmin = -50;
      const c = axes(ctx, { box: Cb, x0: 0, x1: 8760, y0: pmin, y1: pmax, xticks: [0, 2190, 4380, 6570, 8760], xfmt: v => v === 0 ? '0 h' : (v / 1000).toFixed(1).replace('.0', '') + 'k h', yfmt: v => '$' + v, ylabel: 'the year’s prices, highest first ($/MWh)', ny: 4 });
      let x = 0; const curve = [];
      for (const q of hrs) {
        const x0 = c.sx(x), x1 = c.sx(x + q.w), py = c.sy(clamp(q.price, pmin, pmax));
        if (q.g > 0 && q.price > r.m) { ctx.fillStyle = alpha(C.price, 0.12 + 0.55 * q.g); ctx.fillRect(x0, py, x1 - x0 + 0.5, c.sy(Math.max(pmin, r.m)) - py); }
        curve.push([x0, py], [x1, py]); x += q.w;
      }
      pathLine(ctx, curve, C.ink, 1.8);
      line(ctx, Cb.l, c.sy(clamp(r.m, pmin, pmax)), Cb.r, c.sy(clamp(r.m, pmin, pmax)), darken(col, 0.2), 1.5, [5, 4]);
      text(ctx, `its running cost $${r.m.toFixed(0)}`, narrow ? Cb.l + 6 : Cb.r, c.sy(clamp(r.m, pmin, pmax)) + (narrow ? 14 : -5), { size: 10.5, color: darken(col, 0.3), align: narrow ? 'left' : 'right', halo: true, weight: 600 }); // phone: below the line, clear of the shaded bars
      text(ctx, narrow ? 'shaded: hours it runs × price above its cost' : 'shaded: the hours it runs; height above its running cost is the rent that pays back its build cost', narrow ? Cb.l : Cb.r, narrow ? Cb.b + 34 : Cb.t - 8, { size: 10.5, color: C.price, align: narrow ? 'left' : 'right', halo: true });
      geom = { b, B, dot: [dx, dy] };
    },
  });
  fig.interact({
    hit: (x, y) => geom && x > geom.B.l - 10 && x < geom.B.r + 10 && y > geom.B.t - 10 && y < geom.B.b + 10 ? 'wacc' : null,
    touchHit: (x, y) => geom && geom.dot && Math.hypot(x - geom.dot[0], y - geom.dot[1]) < 26 ? 'wacc' : null,
    cursor: 'ew-resize',
    down: (o, x) => setW(geom.b.sx.inv(x)),
    move: (o, x) => setW(geom.b.sx.inv(x)),
  });
  const setW = v => { st.wacc = Math.round(clamp(v, 0, 15) * 4) / 4; wS.set(st.wacc); upd(); };
  const ctl = controls(el);
  const sl = {};
  segmented(ctl, { options: Object.entries(PRESETS).map(([k, p]) => ({ label: p.name, value: k, name: 'bp-' + k })), value: st.tech, onchange: v => { st.tech = v; st.p = { ...PRESETS[v] }; for (const k in sl) sl[k].set(st.p[k]); cfWrap(); upd(); }, name: 'tech' });
  sl.capex = slider(ctl, { label: 'Build cost', min: 300, max: 16000, step: 50, value: st.p.capex, fmt: v => '$' + v.toLocaleString('en-US') + '/kW', color: C.ink2, oninput: v => { st.p.capex = v; upd(); }, name: 'capex' });
  segmented(ctl, { label: 'Market it sells into', options: Object.entries(MARKETS).map(([k, m]) => ({ label: m.label, value: k, name: 'bm-' + k })), value: st.market, onchange: v => { st.market = v; upd(); } });
  const adv = more(ctl, 'More: site quality and cost of capital');
  sl.cf = slider(adv, { label: 'Capacity factor (site quality; wind and solar only)', min: 5, max: 60, step: 1, value: st.p.cf, fmt: v => v + '%', color: C.wind, oninput: v => { st.p.cf = v; upd(); }, name: 'cf' });
  const wS = slider(adv, { label: 'Cost of capital (or drag the dot)', min: 0, max: 15, step: 0.25, value: st.wacc, fmt: v => v.toFixed(2) + '%', color: C.price, oninput: v => { st.wacc = v; upd(); }, name: 'wacc' });
  const cfWrap = () => { const w = sl.cf.el.closest('.ctl'), on = st.tech === 'solar' || st.tech === 'wind'; w.style.opacity = on ? '' : 0.45; w.querySelectorAll('input').forEach(i => { i.disabled = !on; }); };
  cfWrap();
  const ro = readout(el);
  function upd() {
    const r = compute(), name = PRESETS[st.tech].name.toLowerCase();
    const firm = st.tech === 'gas' || st.tech === 'nuclear';
    ro.innerHTML = `This ${name} plant costs <b>$${r.total.toFixed(0)}/MWh</b> over its life, ${Math.round(r.lc.cap / r.total * 100)}% of it capital. In the market it bids its running cost, <b>$${r.m.toFixed(0)}</b>, `
      + (firm ? `so it runs <b>${Math.round(r.runH / 87.6)}%</b> of hours` : (r.cf < st.p.cf / 100 - 0.015 ? `switches off when the price is below zero, so its ${st.p.cf}% site yields a <b>${Math.round(r.cf * 100)}%</b> capacity factor,` : `produces at a <b>${Math.round(r.cf * 100)}%</b> capacity factor`))
      + ` and is paid on average <b>$${r.earn.toFixed(0)}/MWh</b>. The rent above its running cost covers <b>${Math.round(r.cover * 100)}%</b> of what it costs to build and keep.`;
    fig.invalidate();
  }
  hint(el, 'drag the dot on the cost-of-capital curve; then try <b>New nuclear</b>, and the <b>2022-style gas shock</b>.');
  upd();
  el.__sim = { st, compute };
}
