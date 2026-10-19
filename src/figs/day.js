// A day on an illustrative Germany-like grid (synthetic load/solar/wind shapes; market model in lib/market.js).
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import * as D0 from '../lib/draw.js';
import { rrect, line, circle, arrow, clamp, lerp, pathLine, approach } from '../lib/draw.js';
import { curDraw, euroFigure } from '../lib/currency.js';
const { text, measure, axes, tag } = curDraw(D0);
import { controls, slider, segmented, button, readout, more, hint } from '../lib/ui.js';
import { simulateDay, TECHS } from '../lib/market.js';
import { REGIONS } from './merit.js';
// Day presets reuse the merit-order region fleets (stylised, scaled to Ember 2025 shares); solar/wind levels and gas/CO2 prices as in merit.js.
const DAYP = { de: { solarCap: 110, windLevel: 12 }, coal: { solarCap: 60, windLevel: 8 }, gas: { solarCap: 50, windLevel: 22 }, hydro: { solarCap: 30, windLevel: 10 }, solar: { solarCap: 80, windLevel: 8, loadScale: 0.7 } };
const eur = v => (v < -0.5 ? '−€' : '€') + Math.abs(v).toFixed(0);

const ORDER = ['mustrun', 'hydro', 'wind', 'solar', 'nuclear', 'lignite', 'coal', 'gas', 'peaker', 'storage', 'imports', 'scarcity'];
const hfmt = v => `${String(Math.floor(v)).padStart(2, '0')}:${String(Math.round((v % 1) * 60) % 60).padStart(2, '0')}`;

// One source of truth for what happens at a moment: available vs used wind/solar, curtailment, sinks.
// Rounded so the shown numbers add up: used + curtailed = available, for each of wind and solar.
function moment(p) {
  const r = v => Math.round(v || 0);
  const sa = r(p.solar), wa = r(p.wind), su = Math.min(sa, r(p.dispatch.solar)), wu = Math.min(wa, r(p.dispatch.wind));
  return { sa, wa, su, wu, sc: sa - su, wc: wa - wu, load: r(p.load), exp: r(p.exported), ch: r(p.ch), dis: r(p.dis), flex: r(Math.max(0, p.flex || 0)), price: p.price };
}

export function gridDay(el, opts = {}) {
  const futures = !!opts.futures;
  // Default: a spring Sunday with about the solar Germany now has installed (~110 GW), so midday prices dip below zero.
  const st = { season: 'spring', weekend: true, solarCap: 110, windLevel: 12, storageGW: 0, flexGW: 0, hour: 13, region: 'de', ...(opts.init || {}) };
  let sim = null, geom = null, flow = null, flowT = 0;
  const run = () => { const R = REGIONS[st.region], de = st.region === 'de'; sim = simulateDay({ ...(de ? {} : { legacyShare: R.legacy, mustrun: R.mustrun, hydro: R.hydro, coal: R.coal, scale: R.scale, gas: R.set.gas, co2: R.set.co2, imports: 2, exportGW: 3, loadScale: DAYP[st.region].loadScale ?? 1 }), season: st.season, solarCap: st.solarCap, windLevel: st.windLevel, weekend: st.weekend, storageGW: st.storageGW, storageH: 4, flexGW: st.flexGW, noNuclear: de, steps: 96 }); };
  run();
  const at = () => { const P = sim.periods, dt = 24 / P.length; return P[clamp(Math.floor(st.hour / dt), 0, P.length - 1)]; };
  const fig = new Fig(el, {
    label: futures ? 'A day on the grid with batteries and flexible demand absorbing the midday solar surplus' : 'A day on an illustrative grid: generation by source against demand, and the market price it produces',
    height: w => w < 600 ? 760 : Math.max(480, Math.min(560, w * 0.62)),
    draw(ctx, w, h) {
      const P = sim.periods, narrow = w < 600;
      const top = { l: narrow ? 46 : 58, r: w - 14, t: narrow ? 50 : 50, b: h * 0.6 };
      const peak = Math.max(...P.map(p => Object.values(p.dispatch).reduce((a, v) => a + Math.max(0, v || 0), 0) + (p.curtail || 0)), st.region === 'de' ? 100 : 50);
      const yMax = Math.ceil(peak * 1.05 / 25) * 25;
      const xt = narrow ? [0, 6, 12, 18, 24] : [0, 3, 6, 9, 12, 15, 18, 21, 24];
      const A = axes(ctx, { box: top, x0: 0, x1: 24, y0: 0, y1: yMax, xticks: xt, yticks: Array.from({ length: Math.floor(yMax / 25) + 1 }, (_, i) => i * 25).filter(v => yMax <= 150 || v % 50 === 0), xfmt: v => v + ':00', yfmt: v => v + (narrow ? '' : ' GW'), ylabel: narrow ? 'GW' : 'generation and demand' });
      geom = { top, A }; if (flow) flow.invalidate();
      const dt = 24 / P.length;
      let base = P.map(() => 0); const bands = [];
      for (const tech of ORDER) {
        const vals = P.map(p => p.dispatch[tech] || 0);
        if (!vals.some(v => v > 0.01)) continue;
        const cur = base.map((b, i) => b + vals[i]);
        ctx.beginPath();
        P.forEach((p, i) => { ctx.lineTo(A.sx(i * dt), A.sy(cur[i])); ctx.lineTo(A.sx((i + 1) * dt), A.sy(cur[i])); });
        for (let i = P.length - 1; i >= 0; i--) { ctx.lineTo(A.sx((i + 1) * dt), A.sy(base[i])); ctx.lineTo(A.sx(i * dt), A.sy(base[i])); }
        ctx.closePath(); ctx.fillStyle = alpha(TECHS[tech].color, tech === 'storage' ? 0.95 : 0.85); ctx.fill();
        bands.push({ tech, lo: base, hi: cur });
        base = cur;
      }
      const curt = P.map(p => p.curtail);
      if (curt.some(v => v > 0.1)) {
        ctx.beginPath();
        P.forEach((p, i) => { ctx.lineTo(A.sx(i * dt), A.sy(base[i] + curt[i])); ctx.lineTo(A.sx((i + 1) * dt), A.sy(base[i] + curt[i])); });
        for (let i = P.length - 1; i >= 0; i--) { ctx.lineTo(A.sx((i + 1) * dt), A.sy(base[i])); ctx.lineTo(A.sx(i * dt), A.sy(base[i])); }
        ctx.closePath(); ctx.fillStyle = alpha(C.solar, 0.16); ctx.fill(); ctx.strokeStyle = alpha(C.solar, 0.7); ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
      }
      pathLine(ctx, P.map((p, i) => [A.sx((i + 0.5) * dt), A.sy(p.load)]), C.demand, 2.4);
      pathLine(ctx, P.map((p, i) => [A.sx((i + 0.5) * dt), A.sy(Math.max(0, p.load - p.solar - p.wind))]), alpha(C.ink, 0.55), 1.5, [5, 4]);
      const p = at(), m = moment(p), cx = A.sx(st.hour);
      const lines = [hfmt(st.hour) + (m.price < 0 ? ' · price below zero' : ''), `demand ${m.load} GW`,
        m.sc > 0 ? `solar ${m.sa} GW: ${m.su} used, ${m.sc} curtailed` : `solar ${m.sa} GW`,
        m.wc > 0 ? `wind ${m.wa} GW: ${m.wu} used, ${m.wc} curtailed` : `wind ${m.wa} GW`, `price ${eur(p.price)}/MWh`];
      if (m.exp > 0) lines.push(`exported ${m.exp} GW`);
      if (m.ch > 0) lines.push(`batteries charging ${m.ch} GW`);
      if (m.dis > 0) lines.push(`batteries discharging ${m.dis} GW`);
      if (m.flex > 0) lines.push(`flexible demand +${m.flex} GW`);
      const bw = narrow ? 196 : 214, bx = Math.max(top.l + 4, cx + 12 + bw > top.r ? cx - 12 - bw : cx + 12), by = top.t + 4;
      const tip = { x0: bx - 2, x1: bx + bw + 2, y0: by - 2, y1: by + 16 + lines.length * 15 };
      const taken = [];
      const rectOf = (s, x, y, o) => { const wd = measure(ctx, s, o.size, o.weight || 450), l = o.align === 'right' ? x - wd : o.align === 'center' ? x - wd / 2 : x; return { x0: l - 3, x1: l + wd + 3, y0: y - o.size - 1, y1: y + 4 }; };
      const hits = (r, q) => !(r.x0 > q.x1 || r.x1 < q.x0 || r.y0 > q.y1 || r.y1 < q.y0);
      const lab = (s, x, y, o) => { const r = rectOf(s, x, y, o); if (!hits(r, tip)) { text(ctx, s, x, y, o); taken.push(r); return true; } return false; };
      const iNoon = Math.round(13 / dt);
      lab('demand', A.sx(22.6), A.sy(P[Math.round(22.6 / dt)].load) - 8, { size: 11.5, color: C.ink, weight: 600, align: 'right', halo: true });
      const rl = P.map(q => Math.max(0, q.load - q.solar - q.wind)), minI = rl.indexOf(Math.min(...rl));
      lab(narrow ? 'demand − wind & solar' : 'demand minus wind & solar', clamp(A.sx(minI * dt), top.l + 70, top.r - 70), Math.min(A.sy(rl[minI]) + 16, top.b - 8), { size: 11, color: C.ink2, align: 'center', halo: true });
      if (curt[iNoon] > 1) lab('curtailed', A.sx(13), A.sy(base[iNoon] + curt[iNoon]) - 6, { size: 11, color: '#a87b10', align: 'center', halo: true });
      const used = ORDER.filter(t => P.some(q => (q.dispatch[t] || 0) > 0.05));
      void used;
      // direct labels: each source is named inside its own band, where the band is thickest (no legend to hunt for)
      const unl = [];
      for (const bd of bands) {
        const fs = narrow ? 9.5 : 11.5, s = TECHS[bd.tech].short, tw = measure(ctx, s, fs, 650);
        const span = Math.max(2, Math.ceil((tw + 8) / (A.sx(dt) - A.sx(0)) / 2));
        const cand = [];
        for (let i = span; i < P.length - span; i++) { let th = Infinity; for (let j = i - span; j <= i + span; j++) th = Math.min(th, A.sy(bd.lo[j]) - A.sy(bd.hi[j])); if (th >= fs + 3) cand.push([th, i]); }
        cand.sort((a, b) => b[0] - a[0]);
        const o = { size: fs, weight: 650, color: darken(TECHS[bd.tech].color, 0.62), align: 'center' };
        let done = false;
        for (const [, i] of cand) {
          const x = A.sx((i + 0.5) * dt), y = (A.sy(bd.lo[i]) + A.sy(bd.hi[i])) / 2 + fs * 0.36, r = rectOf(s, x, y, o);
          if (r.x0 < top.l || r.x1 > top.r || taken.some(q => hits(r, q)) || hits(r, tip)) continue;
          // keep clear of the demand and residual lines that run through the bands
          const k0 = clamp(Math.floor(A.sx.inv(r.x0) / dt), 0, P.length - 1), k1 = clamp(Math.ceil(A.sx.inv(r.x1) / dt), 0, P.length - 1);
          let clash = false; for (let k = k0; k <= k1 && !clash; k++) { const yd = A.sy(P[k].load), yr = A.sy(rl[k]); if ((yd > r.y0 - 2 && yd < r.y1 + 2) || (yr > r.y0 - 2 && yr < r.y1 + 2)) clash = true; }
          if (clash) continue;
          text(ctx, s, x, y, o); taken.push(r); done = true; break;
        }
        if (!done) unl.push(bd.tech);
      }
      if (unl.length) { const s = 'also: ' + unl.map(t => TECHS[t].short).join(', ') + ' (see the strip below)'; text(ctx, s, top.l - (narrow ? 40 : 0), 12, { size: 10.5, color: C.ink3 }); }
      // price panel
      const bot = { l: top.l, r: top.r, t: top.b + 46, b: h - 30 };
      const pr = P.map(q => q.price);
      const pmin = Math.min(-40, ...pr) - 10, pmax = Math.max(160, ...pr.filter(v => v < 900)) + 10;
      const B = axes(ctx, { box: bot, x0: 0, x1: 24, y0: pmin, y1: pmax, xticks: xt, xfmt: v => v + ':00', yfmt: v => '€' + v, ylabel: narrow ? '€/MWh' : 'day-ahead price, €/MWh', ny: 4 });
      P.forEach((q, i) => { if (q.price < 0) { ctx.fillStyle = alpha(C.wind, 0.18); ctx.fillRect(B.sx(i * dt), bot.t, B.sx(dt) - B.sx(0) + 0.5, bot.b - bot.t); } });
      line(ctx, bot.l, B.sy(0), bot.r, B.sy(0), alpha(C.ink, 0.35), 1);
      ctx.beginPath();
      P.forEach((q, i) => { const y = B.sy(clamp(q.price, pmin, pmax)); ctx.lineTo(B.sx(i * dt), y); ctx.lineTo(B.sx((i + 1) * dt), y); });
      ctx.strokeStyle = C.price; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.stroke();
      line(ctx, bot.l, B.sy(sim.avg), bot.r, B.sy(sim.avg), alpha(C.price, 0.6), 1, [4, 4]);
      text(ctx, `average ${eur(sim.avg)}`, bot.r, B.sy(sim.avg) - 5, { size: 11, color: C.price, align: 'right', halo: true });
      if (sim.neg > 0) { const i0 = P.findIndex(q => q.price < 0); text(ctx, `${sim.neg % 1 ? sim.neg.toFixed(1) : sim.neg} h below zero`, B.sx(i0 * dt) + 5, bot.t + 13, { size: 11, color: darken(C.wind, 0.2), weight: 650, halo: true }); }
      line(ctx, cx, top.t - 4, cx, bot.b, alpha(C.ink, 0.55), 1);
      circle(ctx, cx, B.sy(clamp(p.price, pmin, pmax)), 5, C.price, '#fff', 2);
      rrect(ctx, cx - 10, top.b + 13, 20, 20, 10); ctx.fillStyle = C.ink; ctx.fill(); text(ctx, '↔', cx, top.b + 27, { size: 12, color: '#fff', align: 'center', weight: 700 });
      rrect(ctx, bx, by, bw, 14 + lines.length * 15, 8); ctx.fillStyle = alpha('#ffffff', 0.94); ctx.fill(); ctx.strokeStyle = C.grid2; ctx.stroke();
      lines.forEach((s, k) => text(ctx, s, bx + 9, by + 18 + k * 15, { size: 11, color: k ? C.ink2 : C.ink, weight: k ? 450 : 650 }));
    },
  });
  // ---- power-flow strip: non-crossing ribbons (sources and sinks share one cumulative axis), dots ∝ GW
  flow = new Fig(el, {
    label: 'Where the power comes from and where it goes at the selected time: generation by source on the left; demand, battery charging, flexible demand and exports on the right; curtailed wind and solar below',
    height: w => w < 600 ? 280 : Math.max(230, Math.ceil(w * 0.24)),
    animated: true,
    step(dt) { flowT += dt; },
    draw(ctx, w, h) {
      if (!sim) return;
      const p = at(), m = moment(p), narrow = w < 600;
      text(ctx, `At ${hfmt(st.hour)}: where the power comes from, and where it goes`, 14, 16, { size: 12.5, weight: 650, color: C.ink });
      const val = t => t === 'solar' ? m.su : t === 'wind' ? m.wu : (p.dispatch[t] || 0);
      const src = ORDER.map(t => ({ k: t, v: val(t), col: TECHS[t].color, lab: TECHS[t].short }))// every source that runs, however small, so inputs sum to demand + charging + exports
      .filter(o => o.v > 0.05);
      const sinks = [{ k: 'load', v: p.load, col: C.demand, lab: 'demand' }, { k: 'ch', v: p.ch || 0, col: C.storage, lab: narrow ? 'batteries' : 'charging batteries' }, { k: 'flex', v: Math.max(0, p.flex || 0), col: C.nuclear, lab: narrow ? 'flexible' : 'flexible demand' }, { k: 'exp', v: p.exported || 0, col: C.ink2, lab: 'exports' }].filter(o => o.v > 0.05);
      const sTot = src.reduce((a, o) => a + o.v, 0), kTot = sinks.reduce((a, o) => a + o.v, 0); if (sTot < 0.1 || kTot < 0.1) return;
      const cur = m.sc + m.wc, T = 30, Bt = h - 10, xl = narrow ? 96 : 160, xr = w - (narrow ? 108 : 200), bw = 12;
      const curH = cur > 0 ? 26 : 0, sc = (Bt - T - curH - (cur > 0 ? 12 : 0)) / sTot; // ribbons fill the top; curtailment gets its own lane
      // one cumulative axis 0..sTot on both sides => ribbons are interval overlaps and never cross
      let a = 0; for (const o of src) { o.a = a; a += o.v; }
      let b = 0; for (const o of sinks) { o.a = b; b += o.v / kTot * sTot; o.b = b; }
      const Y = u => T + u * sc;
      const ribs = [];
      for (const s of src) for (const q of sinks) { const lo = Math.max(s.a, q.a), hi = Math.min(s.a + s.v, q.b); if (hi - lo > 1e-6) ribs.push({ y0: Y(lo), y1: Y(hi), col: s.col, gw: hi - lo }); }
      const mx = (xl + bw + xr) / 2;
      for (const r of ribs) { ctx.beginPath(); ctx.moveTo(xl + bw, r.y0); ctx.lineTo(xr, r.y0); ctx.lineTo(xr, r.y1); ctx.lineTo(xl + bw, r.y1); ctx.closePath(); ctx.fillStyle = alpha(r.col, 0.3); ctx.fill(); }
      // dots: one per ~1.5 GW, same speed everywhere, so density reads as power
      ribs.forEach((r, i) => { const n = Math.round(r.gw / 1.5), rows = Math.max(1, Math.round((r.y1 - r.y0) / 7)); for (let j = 0; j < n; j++) { const hj = Math.sin((i + 1) * 91.7 + j * 12.9898) * 43758.5453, rnd = hj - Math.floor(hj), t = (flowT * 0.3 + j / n + rnd * 0.6 / n + i * 0.137) % 1, row = Math.floor(rnd * rows); circle(ctx, xl + bw + t * (xr - xl - bw), r.y0 + (row + 0.5) * (r.y1 - r.y0) / rows, 1.9, darken(r.col, 0.15), null); } });
      void mx;
      const lab = (s, x, y, o = {}) => text(ctx, s, x, y, { size: 11, color: C.ink2, ...o });
      let lastY = -99; for (const o of src) { const y0 = Y(o.a), y1 = Y(o.a + o.v); ctx.fillStyle = o.col; ctx.fillRect(xl, y0, bw, Math.max(1, y1 - y0)); const yc = Math.max((y0 + y1) / 2 + 4, lastY + 12); lab(`${o.lab} ${o.v < 0.95 ? o.v.toFixed(1) : Math.round(o.v)} GW`, xl - 6, yc, { align: 'right' }); lastY = yc; }
      lastY = -99; for (const o of sinks) { const y0 = Y(o.a), y1 = Y(o.b); ctx.fillStyle = o.col; ctx.fillRect(xr, y0, bw, Math.max(1, y1 - y0)); const yc = Math.max((y0 + y1) / 2 + 4, lastY + 12); lab(`${o.lab} ${Math.round(o.v)} GW`, xr + bw + 6, yc, { weight: o.k === 'load' ? 650 : 450 }); lastY = yc; }
      if (cur > 0) { const y0 = Bt - curH, ww = Math.min(xr - xl, cur * sc * 3); ctx.fillStyle = alpha(C.solar, 0.14); ctx.fillRect(xl, y0, bw, curH); ctx.setLineDash([3, 3]); ctx.strokeStyle = alpha(C.solar, 0.85); ctx.strokeRect(xl, y0, bw, curH); ctx.setLineDash([]); void ww;
        lab(narrow ? 'curtailed' : 'curtailed', xl - 6, y0 + curH / 2 + 4, { align: 'right', color: darken(C.solar, 0.35), weight: 600 });
        lab(narrow ? `${cur} GW switched off` : `${[m.sc ? `${m.sc} GW solar` : '', m.wc ? `${m.wc} GW wind` : ''].filter(Boolean).join(' + ')} switched off: nobody can use it`, xl + bw + 8, y0 + curH / 2 + 4, { color: darken(C.solar, 0.35) }); }
    },
  });
  fig.interact({
    hit: (x, y) => geom && x > geom.top.l && x < geom.top.r ? 'cursor' : null,
    touchHit: (x, y) => geom && Math.abs(x - geom.A.sx(st.hour)) < 22 ? 'cursor' : null,
    cursor: 'ew-resize',
    down: (o, x) => { st.hour = clamp(geom.A.sx.inv(x), 0, 23.99); hs.set(st.hour); flow.invalidate(); },
    move: (o, x) => { st.hour = clamp(geom.A.sx.inv(x), 0, 23.99); hs.set(st.hour); flow.invalidate(); },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => {
    run();
    const cap = sim.captureRate;
    ro.innerHTML = `Average price <b>${sim.avg < -0.5 ? '−' : ''}€${Math.abs(sim.avg).toFixed(0)}/MWh</b> · <b>${+sim.neg.toFixed(1)} h</b> of negative prices · ${(() => { if (!isFinite(cap)) return 'no solar output'; const cp = cap * sim.avg; if (cp < -0.5) return `solar’s output sold for <b>−€${Math.abs(cp).toFixed(0)}/MWh</b> on average: it <b>paid</b> to produce`; if (Math.abs(cp) <= 0.5) return 'solar earned <b>almost nothing</b>: its output landed in the below-zero hours'; if (sim.avg <= 1) return `solar earned <b>€${cp.toFixed(0)}/MWh</b> on average`; return cap < 0.2 ? `solar earned only <b>€${cp.toFixed(0)}/MWh</b>, ${Math.round(cap * 100)}% of that average (its <i>capture rate</i>)` : `solar earned <b>${Math.round(cap * 100)}%</b> of that average (its <i>capture rate</i>)`; })()} · <b>${sim.curtail.toFixed(0)} GWh</b> of wind and solar curtailed.`;
    fig.invalidate(); flow.invalidate();
  };
  // Two controls in view: the season and the installed solar. Time of day is dragged on the chart itself.
  segmented(ctl, { options: [{ label: 'Winter', value: 'winter' }, { label: 'Spring', value: 'spring' }, { label: 'Summer', value: 'summer' }], value: st.season, onchange: v => { st.season = v; upd(); }, name: 'season' });
  let sS = null, wS = null;
  if (!futures) sS = slider(ctl, { label: 'Installed solar', min: 0, max: 200, step: 5, value: st.solarCap, color: C.solar, fmt: v => v + ' GW', oninput: v => { st.solarCap = v; upd(); }, name: 'solar' });
  if (futures) {
    slider(ctl, { label: 'Batteries (4-hour)', min: 0, max: 40, step: 1, value: st.storageGW, color: C.storage, fmt: v => v + ' GW', oninput: v => { st.storageGW = v; upd(); }, name: 'storage' });
    slider(ctl, { label: 'Flexible demand (EVs, heat pumps, electrolysers)', min: 0, max: 30, step: 1, value: st.flexGW, color: C.nuclear, fmt: v => v + ' GW', oninput: v => { st.flexGW = v; upd(); }, name: 'flex' });
  }
  const adv = more(ctl, futures ? 'Solar, wind, day and time' : 'More: weekday, wind, other grids, time slider');
  segmented(adv, { options: [{ label: 'Weekday', value: false }, { label: 'Sunday', value: true }], value: st.weekend, onchange: v => { st.weekend = v; upd(); } });
  const hs = slider(adv, { label: 'Time of day (or drag on the chart)', min: 0, max: 23.99, step: 0.25, value: st.hour, color: C.ink, fmt: hfmt, oninput: v => { st.hour = v; fig.invalidate(); flow.invalidate(); } });
  if (!futures) segmented(adv, { label: 'Grid (stylised fleet)', options: Object.entries(REGIONS).map(([k, r]) => ({ label: r.label.replace(' noon', ''), value: k, name: 'gd-' + k })), value: st.region, onchange: v => { st.region = v; Object.assign(st, DAYP[v]); sS && sS.set(st.solarCap); wS && wS.set(st.windLevel); upd(); } });
  if (futures) sS = slider(adv, { label: 'Installed solar', min: 0, max: 200, step: 5, value: st.solarCap, color: C.solar, fmt: v => v + ' GW', oninput: v => { st.solarCap = v; upd(); }, name: 'solar' });
  wS = slider(adv, { label: 'Average wind output', min: 0, max: 45, step: 1, value: st.windLevel, color: C.wind, fmt: v => v + ' GW', oninput: v => { st.windLevel = v; upd(); }, name: 'wind' });
  if (!futures) hint(el, opts.hint || 'drag across the chart to move through the day; slide the <span class="c-solar">solar</span> and watch the noon price.');
  euroFigure(el, fig, ctl, futures ? 'eu-futureday' : opts.euName || 'eu-gridday');
  upd();
  el.__sim = { st, upd, get sim() { return sim; } };
}

// ---------------------------------------------------------------------------
// Capture rate vs installed solar (illustrative model, aggregated over representative days)
// ---------------------------------------------------------------------------
export function capture(el) {
  const st = { cap: 90, storage: 0 };
  const DAYS = [['winter', false, 0.25], ['winter', true, 0.08], ['spring', false, 0.36], ['spring', true, 0.14], ['summer', false, 0.12], ['summer', true, 0.05]];
  const winds = [8, 14, 22];
  const SKIES = [[1, 0.35], [0.6, 0.4], [0.25, 0.25]]; // clear, mixed, overcast (illustrative weights)
  const cache = new Map();
  function yearAt(cap, storage) {
    const key = cap + '|' + storage;
    if (cache.has(key)) return cache.get(key);
    let tw = 0, sum = 0, se = 0, sr = 0;
    for (const [season, weekend, wgt] of DAYS) for (const wl of winds) for (const [sky, sw] of SKIES) {
      const r = simulateDay({ season, weekend, solarCap: cap * sky, windLevel: wl, steps: 24, storageGW: storage, storageH: 4, noNuclear: true });
      const ww = wgt / winds.length * sw;
      for (const p of r.periods) { sum += p.price * ww; tw += ww; const s = p.dispatch.solar || 0; se += s * ww; sr += s * p.price * ww; }
    }
    const res = { avg: sum / tw, capture: se > 0 ? (sr / se) / (sum / tw) : NaN, solarPrice: se > 0 ? sr / se : NaN };
    cache.set(key, res); return res;
  }
  const xs = []; for (let c = 10; c <= 200; c += 10) xs.push(c);
  const fig = new Fig(el, {
    label: 'As more solar is installed, the average price solar panels earn falls relative to the average market price',
    height: w => Math.max(300, Math.min(360, w * 0.42)),
    draw(ctx, w, h) {
      const box = { l: 58, r: w - 20, t: 30, b: h - 40 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 200, y0: 0, y1: 1.1, yticks: [0, 0.25, 0.5, 0.75, 1], xticks: [0, 50, 100, 150, 200], yfmt: v => Math.round(v * 100) + '%', xfmt: v => v + ' GW', ylabel: 'solar capture rate (solar-weighted ÷ average price)', xlabel: 'installed solar' });
      for (const [stor, col, dash, lab] of [[0, C.solar, null, 'no batteries'], [30, C.storage, [6, 4], w < 560 ? 'with 30 GW batteries' : 'with 30 GW of 4-hour batteries']]) {
        const pts = xs.map(c => [sx(c), sy(clamp(yearAt(c, stor).capture, 0, 1.1))]);
        pathLine(ctx, pts, col, 2.4, dash);
        const lp = pts[stor ? 13 : 11];
        text(ctx, lab, lp[0] + (stor ? 6 : -6), lp[1] + (stor ? -12 : 20), { size: 11, color: col, weight: 600, align: stor ? 'left' : 'right', halo: true }); if (0)
        text(ctx, lab, lp[0] + 8, lp[1] - 10, { size: 11, color: col, weight: 600, align: 'right', halo: true });
      }
      const y = yearAt(st.cap, st.storage);
      line(ctx, sx(st.cap), box.t, sx(st.cap), box.b, alpha(C.ink, 0.3), 1);
      circle(ctx, sx(st.cap), sy(clamp(y.capture, 0, 1.1)), 6, st.storage ? C.storage : C.solar, '#fff', 2);
      line(ctx, box.l, sy(1), box.r, sy(1), C.grid2, 1, [2, 3]);
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => { const y = yearAt(st.cap, st.storage); ro.innerHTML = `With ${st.cap} GW of solar${st.storage ? ' and 30 GW of batteries' : ''}, the average price over the model year is <b>€${y.avg.toFixed(0)}</b>, but a MWh of solar sells for only <b>€${y.solarPrice.toFixed(0)}</b> — a capture rate of <b>${Math.round(y.capture * 100)}%</b>.`; fig.invalidate(); };
  slider(ctl, { label: 'Installed solar', min: 10, max: 200, step: 10, value: st.cap, color: C.solar, fmt: v => v + ' GW', oninput: v => { st.cap = v; upd(); } });
  segmented(ctl, { options: [{ label: 'No batteries', value: 0 }, { label: '30 GW batteries', value: 30 }], value: 0, onchange: v => { st.storage = v; upd(); } });
  euroFigure(el, fig, ctl, 'eu-capture');
  upd();
}
