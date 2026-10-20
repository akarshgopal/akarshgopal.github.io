// Utility-scale renewables post, part 2: money, curtailment, hybrids, stability, system.
//  revenueModels  — same German onshore wind farm under six contracts, 2015–2025 real capture prices — real prices + model contracts
//  captureCompare — capture rates of German solar and wind 2015–2025 (SMARD) — real
//  curtailment    — German renewable curtailment for grid congestion 2020–2025 and costs (BNetzA/SMARD) — real
//  hybridPlant    — Seville tracker PV 2023 + battery behind a shared grid connection, Spanish 2023 prices — real data + model dispatch
//  gridForming    — frequency after losing 1 GW with more inverters and grid-forming control — model
//  seasonMix      — Germany 2025: monthly wind and solar vs demand, and any week hour by hour — real
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import * as D0 from '../lib/draw.js';
import { rrect, line, circle, arrow, clamp, lerp, pathLine, scale } from '../lib/draw.js';
import { curDraw, euroFigure } from '../lib/currency.js';
const { text, measure, axes } = curDraw(D0);
import { controls, slider, segmented, button, readout, hint, more } from '../lib/ui.js';
import { WIND } from '../lib/winddata.js';

const CAP = WIND.capture.map(r => ({ c: r[0], y: r[1], base: r[2], neg: r[3], solar: r[4], solarShare: r[5], solarTWh: r[6], on: r[7], onShare: r[8], onTWh: r[9], off: r[10], offShare: r[11], offTWh: r[12] }));
const DE = CAP.filter(r => r.c === 'de');

/* ---------------- revenueModels ---------------- */
const CONTRACTS = {
  merchant: { name: 'Merchant', who: 'The owner carries everything: price level, the shape of its output (capture discount) and volume.', f: (d, k) => d.on },
  fit: { name: 'Feed-in tariff', who: 'The state (via consumers) carries price and shape risk; the owner keeps only volume risk — how windy the year is.', f: (d, k) => k },
  premium: { name: 'Sliding premium', who: 'One-sided: consumers top up to the strike when prices are low, the owner keeps the upside when they are high. Germany’s model (paid against a monthly reference value; here simplified to the annual capture price).', f: (d, k) => Math.max(k, d.on) },
  cfd: { name: 'Two-sided CfD', who: 'Two-sided: the owner receives exactly the strike; when market prices exceed it — as in 2022 — the owner pays the difference back. The UK model, and the EU’s default for new support from 2027.', f: (d, k) => k },
  ppaPap: { name: 'Pay-as-produced PPA', who: 'A company buys every MWh, whenever produced, at a fixed price: it takes price and shape risk; the owner keeps volume risk and the buyer’s credit risk.', f: (d, k) => k },
  ppaBase: { name: 'Baseload PPA', who: 'The owner promises a flat block of power at a fixed price, and must buy the shortfall at market prices when the wind is weak — so it keeps the shape risk: revenue ≈ price + (capture − baseload).', f: (d, k) => k + (d.on - d.base) },
};
export function revenueModels(el) {
  const st = { c: 'merchant', k: 65 }; let geo = null;
  const fig = new Fig(el, {
    label: 'Revenue per megawatt-hour of a German onshore wind farm in each year 2015 to 2025 under different contracts, using the real price wind earned each year',
    height: w => w < 600 ? 360 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 46 : 56, r: w - 16, t: 40, b: h - 40 };
      const { sx, sy } = axes(ctx, { box, x0: 2014.4, x1: 2025.6, y0: 0, y1: 180, yticks: [0, 50, 100, 150], xticks: narrow ? [2015, 2019, 2023] : [2015, 2017, 2019, 2021, 2023, 2025], yfmt: v => '€' + v, ylabel: 'what the wind farm receives per MWh, €' });
      const bw = (box.r - box.l) / 11 * 0.6, f = CONTRACTS[st.c].f;
      DE.forEach(d => {
        const v = f(d, st.k), x = sx(d.y) - bw / 2;
        ctx.fillStyle = C.wind; ctx.fillRect(x, sy(Math.min(180, v)), bw, box.b - sy(Math.min(180, v)));
        if (v > 180) text(ctx, '€' + Math.round(v), x + bw / 2, sy(180) + 12, { size: 10, color: '#fff', weight: 700, align: 'center' });
        if (st.c === 'cfd' && d.on > st.k) { ctx.fillStyle = alpha('#c8473b', 0.35); ctx.fillRect(x, sy(Math.min(180, d.on)), bw, sy(st.k) - sy(Math.min(180, d.on))); }
      });
      pathLine(ctx, DE.map(d => [sx(d.y), sy(Math.min(180, d.on))]), C.ink, 1.6, [4, 3]);
      DE.forEach(d => circle(ctx, sx(d.y), sy(Math.min(180, d.on)), 3, C.ink, null));
      const lg = narrow ? box.l + 4 : box.r - 300, ly = narrow ? box.t + 14 : box.t - 18;
      line(ctx, lg, ly - 4, lg + 18, ly - 4, C.ink, 1.6, [4, 3]); text(ctx, 'market price earned by German onshore wind', lg + 24, ly, { size: 10.5, color: C.ink2, halo: true });
      if (st.c === 'cfd') { ctx.fillStyle = alpha('#c8473b', 0.35); ctx.fillRect(lg + 4, ly + 8, 10, 10); text(ctx, 'paid back to consumers', lg + 24, ly + 17, { size: 10.5, color: C.ink2, halo: true }); }
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Contract', options: Object.entries(CONTRACTS).map(([k, c]) => ({ label: c.name, value: k, name: 'ct-' + k })), value: st.c, onchange: v => { st.c = v; upd(); } });
  slider(more(ctl, 'More: contract price'), { label: 'Contract price (strike, tariff or PPA)', min: 30, max: 110, step: 1, value: st.k, color: C.wind, fmt: v => '€' + v + '/MWh', oninput: v => { st.k = v; upd(); }, name: 'k', wide: true });
  function upd() {
    const vals = DE.map(d => CONTRACTS[st.c].f(d, st.k)), mean = vals.reduce((a, b) => a + b, 0) / vals.length, sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
    ro.innerHTML = `<b>${CONTRACTS[st.c].name}</b>: average <b>€${Math.round(mean)}/MWh</b> over 2015–2025, ${Math.max(...vals) - Math.min(...vals) < 0.5 ? 'the same every year: no price risk at all' : `ranging from ${(v => (v < 0 ? '−' : '') + '€' + Math.abs(v))(Math.round(Math.min(...vals)))} to ${(v => (v < 0 ? '−' : '') + '€' + Math.abs(v))(Math.round(Math.max(...vals)))} (year-to-year spread ±€${Math.round(sd)})`}. ${CONTRACTS[st.c].who}`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-revenuemodels');
}

/* ---------------- captureCompare ---------------- */
const SER = [
  { k: 'de-solar', c: 'de', f: 'solar', s: 'solarShare', name: 'Germany, solar', col: '#e3a922' },
  { k: 'de-on', c: 'de', f: 'on', s: 'onShare', name: 'Germany, onshore wind', col: '#4f9bd1' },
  { k: 'de-off', c: 'de', f: 'off', s: 'offShare', name: 'Germany, offshore wind', col: '#1d4a73' },
];
export function captureCompare(el) {
  const st = { view: 'year', on: new Set(SER.map(s => s.k)), hover: null }; let geo = null;
  const fig = new Fig(el, {
    label: 'Capture rates — the price earned by solar and wind divided by the average price — in Germany, 2015 to 2025, by year and against each technology’s share of demand',
    height: w => w < 600 ? 400 : 360,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 46 : 56, r: w - (narrow ? 16 : 190), t: 30, b: h - (narrow ? 90 : 42) };
      let sx, sy;
      if (st.view === 'year') ({ sx, sy } = axes(ctx, { box, x0: 2014.6, x1: 2025.4, y0: 0.4, y1: 1.1, yticks: [0.4, 0.6, 0.8, 1.0], xticks: narrow ? [2015, 2019, 2023] : [2015, 2017, 2019, 2021, 2023, 2025], yfmt: v => Math.round(v * 100) + '%', ylabel: 'capture rate (price earned ÷ average price)' }));
      else ({ sx, sy } = axes(ctx, { box, x0: 0, x1: 0.3, y0: 0.4, y1: 1.1, yticks: [0.4, 0.6, 0.8, 1.0], xticks: [0, 0.1, 0.2, 0.3], xfmt: v => Math.round(v * 100) + '%', yfmt: v => Math.round(v * 100) + '%', ylabel: 'capture rate', xlabel: 'share of national demand' }));
      line(ctx, box.l, sy(1), box.r, sy(1), alpha(C.ink3, 0.6), 1, [3, 3]);
      geo = [];
      SER.forEach(s => {
        if (!st.on.has(s.k)) return;
        const rows = CAP.filter(r => r.c === s.c && r[s.f] != null);
        const pts = rows.map(r => [st.view === 'year' ? sx(r.y) : sx(r[s.s]), sy(r[s.f] / r.base), r]);
        pathLine(ctx, pts.map(p => [p[0], p[1]]), alpha(s.col, st.view === 'year' ? 0.95 : 0.5), st.view === 'year' ? 2.2 : 1.2);
        pts.forEach(([x, y, r]) => { circle(ctx, x, y, st.hover && st.hover.r === r && st.hover.s === s ? 6 : 3.6, s.col, '#fff', 1.2); geo.push({ x, y, r, s }); });
        if (st.view === 'share') { const [x, y, r] = pts[pts.length - 1]; text(ctx, String(r.y), x + 6, y + 4, { size: 9.5, color: s.col, weight: 650, halo: true }); }
      });
      // legend
      SER.forEach((s, i) => {
        const x = narrow ? 16 + (i % 2) * (w - 32) / 2 : box.r + 22, y = narrow ? box.b + 40 + Math.floor(i / 2) * 17 : box.t + 14 + i * 22;
        ctx.fillStyle = st.on.has(s.k) ? s.col : alpha(s.col, 0.25); ctx.fillRect(x, y - 9, 12, 12);
        text(ctx, s.name, x + 18, y + 1, { size: 11, color: st.on.has(s.k) ? C.ink2 : C.ink3 });
      });
      if (st.view === 'year') text(ctx, '2022: gas crisis', sx(2022), sy(1.08), { size: 10, color: C.ink3, align: 'center', halo: true });
    },
  });
  const near = (x, y) => { if (!geo) return null; let b = null, bd = 14; geo.forEach(g => { const d = Math.hypot(g.x - x, g.y - y); if (d < bd) { bd = d; b = g; } }); return b; };
  fig.interact({ hit: (x, y) => near(x, y), cursor: 'pointer', hover: o => { st.hover = o; upd(); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Plot against', options: [{ label: 'Year', value: 'year', name: 'cc-year' }, { label: 'Share of demand', value: 'share', name: 'cc-share' }], value: 'year', onchange: v => { st.view = v; upd(); } });
  segmented(more(ctl, 'More: pick technologies'), { label: 'Show', options: [{ label: 'All', value: 'all', name: 'cc-all' }, { label: 'Solar only', value: 'solar', name: 'cc-solar' }, { label: 'Wind only', value: 'wind', name: 'cc-wind' }], value: 'all', onchange: v => { st.on = new Set(SER.filter(s => v === 'all' || (v === 'solar') === (s.f === 'solar')).map(s => s.k)); upd(); } });
  function upd() {
    const o = st.hover;
    ro.innerHTML = o ? `<b>${o.s.name}, ${o.r.y}</b>: earned €${o.r[o.s.f].toFixed(0)}/MWh against an average of €${o.r.base.toFixed(0)} — a capture rate of <b>${Math.round(o.r[o.s.f] / o.r.base * 100)}%</b> — while supplying ${Math.round(o.r[o.s.s] * 100)}% of demand.` : 'Solar falls fastest because every panel in a country produces at the same hours. Wind is spread over more hours and over the whole year; offshore wind, steadier still, holds above 90% in most years.';
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-capturecompare');
}

/* ---------------- curtailment ---------------- */
const CURT = [[2020, 6.146], [2021, 5.818], [2022, 8.071], [2023, 10.479], [2024, 9.389, [4.565, 3.394, 1.394]], [2025, 9.379, [3.351, 3.225, 2.704]]];
const CCOST = [[2022, 4.248], [2023, 3.335], [2024, 2.954], [2025, 3.078]];
export function curtailment(el) {
  const st = { view: 'vol' };
  const fig = new Fig(el, {
    label: 'Renewable electricity curtailed in Germany because of grid congestion, 2020 to 2025, by technology for 2024 and 2025, and the total annual cost of congestion management',
    height: w => w < 600 ? 372 : 300,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 46 : 56, r: w - (narrow ? 16 : 200), t: 34, b: h - (narrow ? 82 : 40) };
      if (st.view === 'vol') {
        const { sx, sy } = axes(ctx, { box, x0: 2019.4, x1: 2025.6, y0: 0, y1: 12, yticks: [0, 4, 8, 12], xticks: [2020, 2021, 2022, 2023, 2024, 2025], yfmt: v => v + ' TWh', ylabel: 'renewable output curtailed for grid congestion' });
        const bw = (box.r - box.l) / 6 * 0.55, cols = ['#1d4a73', '#4f9bd1', '#e3a922'];
        CURT.forEach(([y, v, split]) => {
          const x = sx(y) - bw / 2;
          if (split) { let b = 0; split.forEach((s, i) => { ctx.fillStyle = cols[i]; ctx.fillRect(x, sy(b + s), bw, sy(b) - sy(b + s) - 0.5); b += s; }); }
          else { ctx.fillStyle = '#8a9bb0'; ctx.fillRect(x, sy(v), bw, box.b - sy(v)); }
          text(ctx, v.toFixed(1), sx(y), sy(v) - 6, { size: 11, weight: 650, color: C.ink, align: 'center' });
        });
        [['offshore wind', cols[0]], ['onshore wind', cols[1]], ['solar', cols[2]], ['not split by source', '#8a9bb0']].forEach(([s, c], i) => {
          const lx = narrow ? box.l - 30 + (i % 2) * (w - box.l + 14) / 2 : box.r + 24, ly = narrow ? h - 34 + Math.floor(i / 2) * 20 : box.t + 16 + i * 22; // phones: two rows under the axis
          ctx.fillStyle = c; ctx.fillRect(lx, ly - 10, 11, 11); text(ctx, s, lx + 16, ly, { size: 11, color: C.ink2 });
        });
      } else {
        const { sx, sy } = axes(ctx, { box, x0: 2021.4, x1: 2025.6, y0: 0, y1: 5, yticks: [0, 1, 2, 3, 4, 5], xticks: [2022, 2023, 2024, 2025], yfmt: v => '€' + v + 'bn', ylabel: 'total cost of grid congestion management in Germany' });
        const bw = (box.r - box.l) / 4 * 0.5;
        CCOST.forEach(([y, v]) => { ctx.fillStyle = '#c8473b'; ctx.fillRect(sx(y) - bw / 2, sy(v), bw, box.b - sy(v)); text(ctx, '€' + v.toFixed(1) + 'bn', sx(y), sy(v) - 6, { size: 11, weight: 650, color: C.ink, align: 'center' }); });
        text(ctx, 'redispatch, reserve plants, countertrading', narrow ? box.l - 30 : box.r + 24, narrow ? h - 34 : box.t + 16, { size: 11, color: C.ink2 });
      }
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'Energy curtailed', value: 'vol', name: 'cu-vol' }, { label: 'Cost', value: 'cost', name: 'cu-cost' }], value: 'vol', onchange: v => { st.view = v; upd(); } });
  function upd() { ro.innerHTML = st.view === 'vol' ? 'About 9.4 TWh of wind and solar was curtailed in each of 2024 and 2025 — roughly 3.5% of German renewable output. The mix is shifting: solar curtailment nearly doubled in 2025, increasingly because local distribution grids are full.' : 'Congestion management — turning plants down in the north and others up in the south, holding reserve plants, and trading across borders — cost €3.08 billion in 2025, after a peak of €4.2 billion in the 2022 fuel-price crisis.'; fig.invalidate(); }
  upd();
  euroFigure(el, fig, ctl, 'eu-curtailment');
}

/* ---------------- hybridPlant ---------------- */
export function hybridPlant(el) {
  const H = WIND.hybrid, N = H.pv.length;
  const st = { grid: 0.75, bp: 0.4, dur: 4, week: 26 }; let res = null, geo = null;
  function simulate(gridMW, bpMW, durH) {
    const E = bpMW * durH, eta = 0.92; // one-way efficiency (round trip ~85%)
    const exp = new Float32Array(N), dis = new Float32Array(N), lost = new Float32Array(N), chg = new Float32Array(N);
    let soc = 0;
    for (let d = 0; d < N / 24; d++) {
      const hs = []; for (let k = 0; k < 24; k++) hs.push(d * 24 + k);
      const pv = hs.map(i => H.pv[i] / 1000); // MW per MWp
      const price = hs.map(i => H.price[i]);
      const c = new Array(24).fill(0);
      // 1. charge with energy that would be clipped
      let room = E - soc;
      for (let k = 0; k < 24; k++) { const over = Math.max(0, pv[k] - gridMW); const x = Math.min(over, bpMW, room / eta); c[k] += x; room -= x * eta; }
      // 2. plan discharge in the priciest hours of the day; charge from PV in the cheapest sunny hours if the spread pays
      const order = [...Array(24).keys()].sort((a, b) => price[b] - price[a]);
      const avail = soc + (E - soc - room); // energy that will be in store
      const cheap = [...Array(24).keys()].filter(k => pv[k] > 0.01).sort((a, b) => price[a] - price[b]);
      const topPrice = price[order[0]];
      for (const k of cheap) { if (room <= 1e-6) break; if (price[k] > topPrice * eta * eta - 2) break; const x = Math.min(pv[k] - c[k], bpMW - c[k], room / eta); if (x > 0) { c[k] += x; room -= x * eta; } }
      let store = E - room;
      const dd = new Array(24).fill(0);
      for (const k of order) { if (store <= 1e-6) break; const head = gridMW - Math.max(0, Math.min(gridMW, pv[k] - c[k])); const x = Math.min(bpMW, head, store * eta); if (x > 0 && price[k] > 0) { dd[k] = x; store -= x / eta; } }
      soc = store;
      for (let k = 0; k < 24; k++) { const i = d * 24 + k; const direct = Math.max(0, pv[k] - c[k]); const e = Math.min(gridMW, direct); exp[i] = e; lost[i] = direct - e; dis[i] = dd[k]; chg[i] = c[k]; }
    }
    let rev = 0, mwh = 0, revPV = 0, mwhPV = 0, lostT = 0;
    for (let i = 0; i < N; i++) { const out = exp[i] + dis[i]; rev += out * H.price[i]; mwh += out; lostT += lost[i]; const p = Math.min(gridMW, H.pv[i] / 1000); revPV += p * H.price[i]; mwhPV += p; }
    return { exp, dis, lost, chg, rev, mwh, revPV, mwhPV, lostT };
  }
  const fig = new Fig(el, {
    label: 'A one-megawatt solar plant with a battery behind a shared grid connection in Seville, with real 2023 sunshine and real 2023 Spanish prices: drag the week, change the connection, battery power and hours',
    height: w => w < 600 ? 514 : 414,
    draw(ctx, w, h) {
      const narrow = w < 600, r = res;
      const Y = { l: narrow ? 40 : 52, r: w - 14, t: 30, b: narrow ? 92 : 96 };
      text(ctx, 'average Spanish day-ahead price each day of 2023', Y.l - 4, Y.t - 12, { size: 11, color: C.ink3, weight: 500 });
      const days = N / 24, dw = (Y.r - Y.l) / days, py = scale(0, 160, Y.b, Y.t);
      for (let d = 0; d < days; d++) { let s = 0; for (let k = 0; k < 24; k++) s += H.price[d * 24 + k]; s /= 24; ctx.fillStyle = alpha(C.price, 0.55); ctx.fillRect(Y.l + d * dw, py(Math.max(0, s)), Math.max(1, dw - 0.3), Y.b - py(Math.max(0, s))); }
      for (const v of [0, 80, 160]) text(ctx, '€' + v, Y.l - 6, py(v) + 4, { size: 10, color: C.ink3, align: 'right' });
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.strokeRect(Y.l + st.week * 7 * dw, Y.t - 4, 7 * dw, Y.b - Y.t + 8);
      geo = { Y, dw, days };
      const B = { l: narrow ? 40 : 52, r: w - (narrow ? 40 : 52), t: Y.b + (narrow ? 90 : 60), b: h - 34 }; // room for the legend above the y-axis title
      const { sx, sy } = axes(ctx, { box: B, x0: 0, x1: 168, y0: 0, y1: 1.0, yticks: [0, 0.25, 0.5, 0.75, 1], xticks: [], yfmt: v => v.toFixed(2), ylabel: 'MW per MW of panels, hour by hour, selected week' });
      const ps = scale(-20, 200, B.b, B.t);
      for (const v of [0, 100, 200]) text(ctx, '€' + v, B.r + 6, ps(v) + 4, { size: 10, color: C.price });
      const i0 = st.week * 168;
      const area = (f0, f1, col) => { ctx.beginPath(); for (let k = 0; k < 168; k++) { const x = sx(k + 0.5); k ? ctx.lineTo(x, sy(f1(i0 + k))) : ctx.moveTo(x, sy(f1(i0 + k))); } for (let k = 167; k >= 0; k--) ctx.lineTo(sx(k + 0.5), sy(f0(i0 + k))); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
      area(i => 0, i => r.exp[i], alpha(C.solar, 0.85));
      area(i => r.exp[i], i => r.exp[i] + r.dis[i], '#8e62b5');
      area(i => r.exp[i] + r.dis[i], i => r.exp[i] + r.dis[i] + r.lost[i], alpha(C.peaker, 0.6));
      area(i => r.exp[i] + r.dis[i] + r.lost[i], i => r.exp[i] + r.dis[i] + r.lost[i] + r.chg[i], alpha('#8e62b5', 0.3));
      line(ctx, B.l, sy(st.grid), B.r, sy(st.grid), C.ink, 1.3, [5, 3]);
      text(ctx, `grid connection ${st.grid.toFixed(2)} MW`, B.l + 4, sy(st.grid) + (st.grid > 0.88 ? 14 : -5), { size: 10.5, weight: 650, color: C.ink, halo: true });
      pathLine(ctx, Array.from({ length: 168 }, (_, k) => [sx(k + 0.5), ps(H.price[i0 + k])]), C.price, 1.4);
      for (let d = 0; d < 7; d++) { const t = new Date(Date.UTC(2023, 0, 1) + (st.week * 7 + d) * 864e5); text(ctx, t.getUTCDate() + '/' + (t.getUTCMonth() + 1), sx(d * 24 + 12), B.b + 15, { size: 10.5, color: C.ink3, align: 'center' }); }
      // legend
      const L = [['solar exported', alpha(C.solar, 0.85)], ['battery discharge', '#8e62b5'], ['solar into battery', alpha('#8e62b5', 0.3)], ['lost', alpha(C.peaker, 0.6)], ['price (right)', C.price]];
      let lx = B.l; const ly = Y.b + 26;
      if (!narrow) L.forEach(([s, c]) => { ctx.fillStyle = c; ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, s, lx + 14, ly, { size: 10.5, color: C.ink2 }); lx += 14 + measure(ctx, s, 10.5) + 16; });
      else L.forEach(([s, c], i) => { const x = B.l + (i % 2) * (w - B.l - 10) / 2, y = Y.b + 26 + Math.floor(i / 2) * 16; /* two columns: three crowd at 390 px */ ctx.fillStyle = c; ctx.fillRect(x - 12, y - 9, 9, 9); text(ctx, s.replace(' (right)', ''), x, y, { size: 10, color: C.ink2 }); });
    },
  });
  fig.interact({ hit: (x, y) => geo && y < geo.Y.b + 8 && y > geo.Y.t - 8 ? 'w' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { st.week = clamp(Math.floor((x - geo.Y.l) / geo.dw / 7 - 0.5), 0, 51); fig.invalidate(); };
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Battery power', min: 0, max: 0.8, step: 0.05, value: st.bp, color: '#8e62b5', fmt: v => v.toFixed(2) + ' MW', oninput: v => { st.bp = v; upd(); }, name: 'bp' });
  const hadv = more(ctl, 'More: battery hours and grid connection');
  slider(hadv, { label: 'Battery duration', min: 1, max: 8, step: 1, value: st.dur, color: '#8e62b5', fmt: v => v + ' h', oninput: v => { st.dur = v; upd(); }, name: 'dur' });
  slider(hadv, { label: 'Grid connection', min: 0.4, max: 1, step: 0.01, value: st.grid, color: C.ink, fmt: v => v.toFixed(2) + ' MW', oninput: v => { st.grid = v; upd(); }, name: 'grid' });
  function upd() {
    res = simulate(st.grid, st.bp, st.dur);
    const cap = res.rev / res.mwh, capPV = res.revPV / res.mwhPV;
    ro.innerHTML = `Panels alone behind this connection earn <b>€${Math.round(res.revPV / 1000)}k</b> a year per MW of panels, at an average <b>€${capPV.toFixed(0)}/MWh</b>. With a ${st.bp.toFixed(2)} MW / ${(st.bp * st.dur).toFixed(1)} MWh battery: <b>€${Math.round(res.rev / 1000)}k</b> (+${Math.round((res.rev / res.revPV - 1) * 100)}%), at <b>€${cap.toFixed(0)}/MWh</b>; ${res.lostT.toFixed(0)} MWh a year still lost to the connection limit. Spanish average 2023: €87/MWh.`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-hybridplant');
}

/* ---------------- gridForming (model) ---------------- */
export function gridForming(el) {
  const st = { ibr: 0.5, gfm: 0, ffr: false }; let sim = null;
  function run() {
    const S = 30, dP = 1, f0 = 50, Hs = 5, Hg = 4; // GW system, 1 GW loss, inertia constants (s)
    const Hsys = (1 - st.ibr) * Hs + st.ibr * st.gfm * Hg;
    const pts = []; let df = 0, rocof0 = 0, nadir = 0, tN = 0;
    for (let t = 0; t <= 30; t += 0.01) {
      const prim = 1.5 * clamp(t / 20, 0, 1) * clamp(-df / 0.2, 0, 1);           // FCR: full at 200 mHz, ramping over ~20 s
      const fast = st.ffr ? 0.6 * clamp((t - 0.3) / 0.5, 0, 1) * (df < -0.05 ? 1 : 0) : 0; // fast frequency response from batteries
      const damp = 0.02 * S * (-df / f0) * 50;                                     // load relief ~2%/Hz
      const Heff = Math.max(Hsys, 0.25);
      const d = (f0 / (2 * Heff * S)) * (-dP + prim + fast + damp);
      if (t === 0) rocof0 = d;
      df += d * 0.01; if (df < nadir) { nadir = df; tN = t; }
      if (Math.round(t * 100) % 5 === 0) pts.push([t, f0 + df]);
    }
    return { pts, rocof0, nadir, tN, Hsys };
  }
  const fig = new Fig(el, {
    label: 'Grid frequency in the 30 seconds after a 1 gigawatt power plant trips in a 30 gigawatt system, with more inverter-based generation and with grid-forming inverters',
    height: w => w < 600 ? 330 : 320,
    draw(ctx, w, h) {
      const narrow = w < 600, s = sim;
      const box = { l: narrow ? 52 : 62, r: w - 16, t: 34, b: h - 40 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 30, y0: 48.6, y1: 50.1, yticks: [48.8, 49.0, 49.2, 49.4, 49.6, 49.8, 50.0], xticks: [0, 5, 10, 15, 20, 25, 30], xfmt: v => v + ' s', yfmt: v => v.toFixed(1) + ' Hz', ylabel: 'frequency after losing 1 GW in a 30 GW system' });
      ctx.fillStyle = alpha('#c8473b', 0.1); ctx.fillRect(box.l, sy(49.0), box.r - box.l, box.b - sy(49.0));
      line(ctx, box.l, sy(49.0), box.r, sy(49.0), alpha('#c8473b', 0.7), 1.2, [4, 3]);
      text(ctx, '49.0 Hz: automatic load shedding begins', box.r - 4, sy(49.0) + 14, { size: 10.5, color: '#c8473b', align: 'right', halo: true });
      pathLine(ctx, s.pts.map(([t, f]) => [sx(t), sy(Math.max(48.6, f))]), C.network || '#2c6795', 2.6);
      const ny = sy(Math.max(48.6, 50 + s.nadir));
      circle(ctx, sx(s.tN), ny, 5, '#fff', C.ink, 1.6);
      text(ctx, `lowest ${(50 + s.nadir).toFixed(2)} Hz`, sx(s.tN) + 8, ny + (ny > box.b - 24 ? -9 : 14), { size: 11, weight: 650, color: C.ink, halo: true });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Share of output from inverters (wind, solar, batteries)', min: 0, max: 0.95, step: 0.05, value: st.ibr, color: C.wind, fmt: v => Math.round(v * 100) + '%', oninput: v => { st.ibr = v; upd(); }, name: 'ibr', wide: true });
  slider(ctl, { label: 'Of which grid-forming', min: 0, max: 1, step: 0.05, value: st.gfm, color: '#8e62b5', fmt: v => Math.round(v * 100) + '%', oninput: v => { st.gfm = v; upd(); }, name: 'gfm' });
  segmented(more(ctl, 'More: fast response from batteries'), { label: 'Fast frequency response from batteries', options: [{ label: 'Off', value: false, name: 'ffr-off' }, { label: '0.6 GW', value: true, name: 'ffr-on' }], value: false, onchange: v => { st.ffr = v; upd(); } });
  function upd() { sim = run(); ro.innerHTML = `System inertia constant <b>${sim.Hsys.toFixed(1)} s</b>. Initial rate of fall <b>${Math.abs(sim.rocof0).toFixed(2)} Hz/s</b>; lowest point <b>${(50 + sim.nadir).toFixed(2)} Hz</b> after ${sim.tN.toFixed(1)} s${50 + sim.nadir < 49 ? ' — load shedding would have started' : ''}.`; fig.invalidate(); }
  upd();
  hint(el, 'raise “Of which grid-forming” to 30% and watch the lowest frequency rise.');
}

/* ---------------- seasonMix ---------------- */
export function seasonMix(el) {
  const M = WIND.monthly, D = WIND.de2025;
  const st = { view: 'month', week: 2 }; let geo = null;
  const fig = new Fig(el, {
    label: 'Germany in 2025: monthly solar, onshore and offshore wind generation against demand, and any week hour by hour with prices',
    height: w => w < 600 ? 400 : 360,
    draw(ctx, w, h) {
      const narrow = w < 600;
      if (st.view === 'month') {
        const box = { l: narrow ? 46 : 56, r: w - 16, t: 40, b: h - 40 };
        const { sx, sy } = axes(ctx, { box, x0: 0, x1: 12, y0: 0, y1: 50, yticks: [0, 10, 20, 30, 40, 50], xticks: [], yfmt: v => v + ' TWh', ylabel: w < 600 ? '' : 'Germany 2025, public generation per month' }); // on a phone the legend takes that line; ticks carry the unit
        const bw = (box.r - box.l) / 12 * 0.7, cols = [['Wind offshore', '#1d4a73'], ['Wind onshore', '#4f9bd1'], ['Solar', '#e3a922']];
        for (let m = 0; m < 12; m++) {
          let b = 0; const x = sx(m + 0.5) - bw / 2;
          cols.forEach(([k, c]) => { const v = M[k][m]; ctx.fillStyle = c; ctx.fillRect(x, sy(b + v), bw, sy(b) - sy(b + v) - 0.5); b += v; });
          text(ctx, 'JFMAMJJASOND'[m], sx(m + 0.5), box.b + 15, { size: 11, color: C.ink3, align: 'center' });
        }
        pathLine(ctx, M.Load.map((v, m) => [sx(m + 0.5), sy(v)]), C.ink, 2);
        text(ctx, 'demand', sx(0.5), sy(M.Load[0]) - 8, { size: 11, weight: 650, color: C.ink });
        let lx = narrow ? box.l : box.r - 300; cols.slice().reverse().forEach(([k, c]) => { ctx.fillStyle = c; ctx.fillRect(lx, box.t - 26, 10, 10); text(ctx, k.replace('Wind ', '') + (k === 'Solar' ? '' : ' wind'), lx + 14, box.t - 17, { size: 10.5, color: C.ink2 }); lx += 100; });
        geo = null;
      } else {
        const Y = { l: narrow ? 40 : 52, r: w - 14, t: 30, b: 80 };
        text(ctx, 'wind + solar each day of 2025, GW average — drag to pick a week', Y.l - 4, Y.t - 12, { size: 11, color: C.ink3, weight: 500 });
        const days = Math.floor(D.wind.length / 24), dw = (Y.r - Y.l) / days, yy = scale(0, 60, Y.b, Y.t);
        for (let d = 0; d < days; d++) { let wv = 0, sv = 0; for (let k = 0; k < 24; k++) { wv += D.wind[d * 24 + k]; sv += D.solar[d * 24 + k]; } wv /= 24; sv /= 24; ctx.fillStyle = '#4f9bd1'; ctx.fillRect(Y.l + d * dw, yy(wv), Math.max(1, dw - 0.3), Y.b - yy(wv)); ctx.fillStyle = '#e3a922'; ctx.fillRect(Y.l + d * dw, yy(wv + sv), Math.max(1, dw - 0.3), yy(wv) - yy(wv + sv)); }
        ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.strokeRect(Y.l + st.week * 7 * dw, Y.t - 4, 7 * dw, Y.b - Y.t + 8);
        geo = { Y, dw };
        const B = { l: narrow ? 40 : 52, r: w - (narrow ? 40 : 52), t: Y.b + 40, b: h - 34 };
        const { sx, sy } = axes(ctx, { box: B, x0: 0, x1: 168, y0: 0, y1: 80, yticks: [0, 20, 40, 60, 80], xticks: [], yfmt: v => v + ' GW', ylabel: 'hour by hour' });
        const i0 = st.week * 168; let pm = 300; for (let k = 0; k < 168; k++) pm = Math.max(pm, D.P[i0 + k] || 0); pm = Math.ceil(pm / 100) * 100;
        const ps = scale(-pm / 3, pm, B.b, B.t), pstep = pm > 400 ? 200 : 100;
        for (let v = 0; v <= pm; v += pstep) text(ctx, '€' + v, B.r + 6, ps(v) + 4, { size: 10, color: C.price });
        const area = (f0, f1, col) => { ctx.beginPath(); for (let k = 0; k < 168; k++) { const x = sx(k); k ? ctx.lineTo(x, sy(f1(i0 + k))) : ctx.moveTo(x, sy(f1(i0 + k))); } for (let k = 167; k >= 0; k--) ctx.lineTo(sx(k), sy(f0(i0 + k))); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
        area(i => 0, i => D.wind[i] || 0, '#4f9bd1'); area(i => D.wind[i] || 0, i => (D.wind[i] || 0) + (D.solar[i] || 0), '#e3a922');
        pathLine(ctx, Array.from({ length: 168 }, (_, k) => [sx(k), sy(D.load[i0 + k] || 0)]), C.ink, 1.8);
        pathLine(ctx, Array.from({ length: 168 }, (_, k) => [sx(k), ps(D.P[i0 + k] || 0)]), C.price, 1.3);
        for (let d = 0; d < 7; d++) { const t = new Date(Date.UTC(2025, 0, 1) + (st.week * 7 + d) * 864e5); text(ctx, t.getUTCDate() + '/' + (t.getUTCMonth() + 1), sx(d * 24 + 12), B.b + 15, { size: 10.5, color: C.ink3, align: 'center' }); }
        if (!narrow) { let lx = B.r - 330; [['wind', '#4f9bd1'], ['solar', '#e3a922'], ['demand', C.ink], ['price (right)', C.price]].forEach(([s, c]) => { ctx.fillStyle = c; ctx.fillRect(lx, B.t - 26, 10, 10); text(ctx, s, lx + 14, B.t - 17, { size: 10.5, color: C.ink2 }); lx += 32 + measure(ctx, s, 10.5); }); }
      }
    },
  });
  fig.interact({ hit: (x, y) => geo && y < geo.Y.b + 8 && y > geo.Y.t - 8 ? 'w' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { st.week = clamp(Math.floor((x - geo.Y.l) / geo.dw / 7 - 0.5), 0, 51); upd(); };
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'View', options: [{ label: 'Months', value: 'month', name: 'sm-month' }, { label: 'A week, hour by hour', value: 'week', name: 'sm-week' }], value: 'month', onchange: v => { st.view = v; upd(); } });
  function upd() {
    if (st.view === 'month') { const ws = M['Wind onshore'].map((v, i) => v + M['Wind offshore'][i]); ro.innerHTML = `Wind and solar fit together over the year: wind made ${ws[0].toFixed(0)} TWh in January and ${ws[6].toFixed(0)} TWh in July; solar ${M.Solar[0].toFixed(1)} TWh in January and ${M.Solar[6].toFixed(0)} TWh in July. But demand is highest in winter, and their combined output does not rise to match it.`; }
    else { const i0 = st.week * 168; let wmin = 1e9, smax = 0, pmax = -1e9, pmin = 1e9; for (let k = 0; k < 168; k++) { const v = (D.wind[i0 + k] || 0) + (D.solar[i0 + k] || 0); wmin = Math.min(wmin, v); smax = Math.max(smax, v); pmax = Math.max(pmax, D.P[i0 + k]); pmin = Math.min(pmin, D.P[i0 + k]); } ro.innerHTML = `This week wind plus solar ranged from <b>${wmin.toFixed(0)} GW</b> to <b>${smax.toFixed(0)} GW</b>, and prices from <b>€${pmin.toFixed(0)}</b> to <b>€${pmax.toFixed(0)}/MWh</b>. Drag along the year strip.`; }
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-seasonmix');
}

/* ---------------- cannibal ---------------- */
// Real + model. Germany 2025, hourly (SMARD): load, wind, solar, day-ahead price. Price model: the median 2025
// price in each 2 GW band of residual load (load − wind − solar), made non-decreasing, bands with ≥ 20 hours only;
// outside the observed range the price is held at the end bands. Scaling 2025's solar hour by hour and re-pricing
// every hour from that curve gives solar's capture rate at any share, with everything else held at 2025.
// Optional battery (assumption): 2-hour, 85% round trip, one cycle a day, charging in each day's two lowest-
// residual hours and discharging in its two highest, on days when the price spread between them is at least €5.
const CN = (() => {
  const D = WIND.de2025, N = D.P.length, BW = 2, bins = new Map();
  for (let i = 0; i < N; i++) { const b = Math.floor((D.load[i] - D.wind[i] - D.solar[i]) / BW); if (!bins.has(b)) bins.set(b, []); bins.get(b).push(D.P[i]); }
  const pts = [...bins.keys()].sort((a, b) => a - b).filter(k => bins.get(k).length >= 20).map(k => { const s = bins.get(k).sort((x, y) => x - y); return [k * BW + BW / 2, s[s.length >> 1]]; });
  for (let i = 1; i < pts.length; i++) pts[i][1] = Math.max(pts[i][1], pts[i - 1][1]);
  const f = x => { if (x <= pts[0][0]) return pts[0][1]; if (x >= pts[pts.length - 1][0]) return pts[pts.length - 1][1]; let i = 1; while (pts[i][0] < x) i++; const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0); };
  const SL = D.solar.reduce((a, b) => a + b, 0), LL = D.load.reduce((a, b) => a + b, 0);
  return { D, N, f, floor: pts[0][1], share1: SL / LL };
})();
function cannRun(k, batt) {
  const { D, N, f } = CN, r = new Float64Array(N);
  for (let i = 0; i < N; i++) r[i] = D.load[i] - D.wind[i] - k * D.solar[i];
  if (batt > 0) for (let d = 0; d + 24 <= N; d += 24) {
    const idx = Array.from({ length: 24 }, (_, j) => d + j).sort((a, b) => r[a] - r[b]);
    if (f(r[idx[22]]) - f(r[idx[1]]) < 5) continue; // nothing to gain: the battery sits idle that day
    r[idx[0]] += batt; r[idx[1]] += batt; const lowR = Math.max(r[idx[0]], r[idx[1]]);
    for (const j of [23, 22]) r[idx[j]] -= Math.min(batt * 0.85, Math.max(0, (r[idx[j]] - lowR) / 2)); // never discharge below the charging hours
  }
  let ps = 0, s = 0, pa = 0, neg = 0; const day = new Float64Array(24), dayS = new Float64Array(24); let nd = 0;
  for (let i = 0; i < N; i++) {
    const p = f(r[i]), sol = k * D.solar[i]; ps += p * sol; s += sol; pa += p; if (p < 0) neg++;
    const m = new Date(Date.UTC(2025, 0, 1) + i * 3600e3).getUTCMonth(); // index 0 is 00:00 CET on 1 January
    if (m >= 3 && m <= 8) { day[i % 24] += p; dayS[i % 24] += sol; if (i % 24 === 0) nd++; }
  }
  const avg = pa / N, sp = s > 0 ? ps / s : f(0);
  return { avg, sp, cr: sp / avg, neg, day: [...day].map(v => v / nd), dayS: [...dayS].map(v => v / nd) };
}
export function cannibal(el) {
  const st = { k: 1, batt: 0, hover: null }; let geo = null, curve = null, cur = null, base = cannRun(1, 0);
  const KMAX = 0.4 / CN.share1, SOL = '#e3a922';
  const recurve = () => { curve = []; for (let s = 0.005; s <= 0.4001; s += 0.0125) curve.push([s, cannRun(s / CN.share1, st.batt).cr]); };
  const DOTS = [['solar', 'solarShare', SOL, 'solar'], ['on', 'onShare', '#4f9bd1', 'onshore wind'], ['off', 'offShare', '#1d4a73', 'offshore wind']];
  const fig = new Fig(el, {
    label: 'Solar’s capture rate against its share of German demand: real years 2015–2025 as dots, and a curve from re-pricing 2025’s hours with more or less solar. A day panel shows the average April–September day of prices.',
    height: w => w < 600 ? 600 : 400,
    draw(ctx, w, h) {
      const narrow = w < 600, k = st.k, sh = k * CN.share1;
      const A = narrow ? { l: 46, r: w - 14, t: 30, b: 300 } : { l: w * 0.5 + 40, r: w - 16, t: 30, b: h - 40 };
      const B = narrow ? { l: 46, r: w - 14, t: 370, b: h - 34 } : { l: 52, r: w * 0.5 - 18, t: 30, b: h - 40 };
      // ---- capture rate vs share
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 0.4, y0: 0, y1: 1.2, xticks: [0, 0.1, 0.2, 0.3, 0.4], xfmt: v => Math.round(v * 100) + '%', yticks: [0, 0.25, 0.5, 0.75, 1], yfmt: v => Math.round(v * 100) + '%', ylabel: 'capture rate (price earned ÷ average price)', xlabel: 'share of German demand' });
      line(ctx, A.l, sy(1), A.r, sy(1), alpha(C.ink3, 0.6), 1, [3, 3]);
      pathLine(ctx, curve.map(([s, c]) => [sx(s), sy(clamp(c, 0, 1.2))]), alpha(SOL, 0.9), 2.4, [6, 4]);
      const pts = [];
      DOTS.forEach(([f, s, col]) => CAP.filter(r => r.c === 'de' && r[f] != null).forEach(r => { const x = sx(r[s]), y = sy(r[f] / r.base); pts.push({ x, y, r, f, s, col }); }));
      pts.forEach(p => circle(ctx, p.x, p.y, st.hover === p ? 6 : 3.6, p.col, '#fff', 1.2));
      const last = f => pts.filter(p => p.f === f).sort((a, b) => b.r.y - a.r.y)[0];
      [['solar', 'solar'], ['on', 'onshore wind'], ['off', 'offshore wind']].forEach(([f, n]) => { const p = last(f); if (!p) return;
        // phone: offshore lifts above the 100% line (clear of the solar dots), solar drops below-left of its dot (clear of the curve and the handle)
        const nx = narrow && f === 'solar' ? p.x - 14 : narrow && f === 'off' ? p.x + 10 : p.x + 7, ny = narrow && f === 'off' ? sy(1) - 8 : narrow && f === 'solar' ? p.y + 26 : p.y + (f === 'off' ? -8 : f === 'on' ? 14 : 4);
        text(ctx, `${n} ${p.r.y}`, nx, ny, { size: 10, weight: 650, color: darken(p.col, 0.15), halo: true, align: narrow && f === 'solar' ? 'right' : 'left' }); });
      { const s0 = sh > 0.24 ? 0.2 : 0.3, c0 = curve.find(c => c[0] >= s0) || curve[curve.length - 1]; text(ctx, narrow ? '2025 re-priced' : '2025’s hours, re-priced', sx(c0[0]) - 8, sy(c0[1]) + 22, { size: 10, color: darken(SOL, 0.3), align: 'right', halo: true }); } // below-left of the falling curve
      const hx = sx(sh), hy = sy(clamp(cur.cr, 0, 1.2));
      line(ctx, hx, hy + 12, hx, A.b, alpha(SOL, 0.6), 1, [2, 3]);
      for (let a = 0; a < 8; a++) { const an = a * Math.PI / 4; line(ctx, hx + Math.cos(an) * 13, hy + Math.sin(an) * 13, hx + Math.cos(an) * 17, hy + Math.sin(an) * 17, SOL, 2); }
      circle(ctx, hx, hy, 11, SOL, '#fff', 2); text(ctx, '↔', hx, hy + 4, { size: 11, color: '#fff', align: 'center', weight: 700 });
      const lab = `${Math.round(cur.cr * 100)}% at ${Math.round(sh * 100)}% of demand`;
      { const lw = measure(ctx, lab, 11, 700), right = hx + 22 + lw < A.r; // above-right of the handle, clear of the falling curve; below-left near the axis end
        text(ctx, lab, sh < 0.15 || right ? hx + 22 : hx - 22, sh < 0.15 ? hy + (narrow ? 50 : 30) : right ? hy - 10 : hy + 26, { size: 11, weight: 700, color: darken(SOL, 0.35), align: sh < 0.15 || right ? 'left' : 'right', halo: true }); }
      // ---- the average sunny-half day
      const yMax = 160, gMax = Math.max(60, ...cur.dayS) * 1.1;
      const b = axes(ctx, { box: B, x0: 0, x1: 24, y0: -40, y1: yMax, xticks: [0, 6, 12, 18, 24], xfmt: v => String(v).padStart(2, '0') + ':00', yticks: [-40, 0, 40, 80, 120, 160], yfmt: v => '€' + v, ylabel: 'average April–September day, €/MWh', xlabel: narrow ? 'time (CET)' : 'time of day (CET)' });
      const gy = v => B.b - v / gMax * (B.b - B.t);
      ctx.beginPath(); ctx.moveTo(b.sx(0), B.b); cur.dayS.forEach((v, i) => ctx.lineTo(b.sx(i + 0.5), gy(v))); ctx.lineTo(b.sx(24), B.b); ctx.closePath(); ctx.fillStyle = alpha(SOL, 0.28); ctx.fill();
      line(ctx, B.l, b.sy(0), B.r, b.sy(0), C.grid2, 1);
      pathLine(ctx, base.day.map((v, i) => [b.sx(i + 0.5), b.sy(v)]), alpha(C.ink3, 0.9), 1.4, [3, 3]);
      pathLine(ctx, cur.day.map((v, i) => [b.sx(i + 0.5), b.sy(clamp(v, -40, yMax))]), C.price, 2.4);
      const mi = cur.day.indexOf(Math.min(...cur.day));
      const ny0 = b.sy(clamp(cur.day[mi], -40, yMax)); text(ctx, `noon €${Math.round(cur.day[mi])}`, b.sx(mi + 0.5), ny0 + 16 > B.b - 22 ? ny0 - 8 : ny0 + 16, { size: 10.5, weight: 650, color: C.price, align: 'center', halo: true });
      text(ctx, 'solar output', b.sx(12.5), B.b - 8, { size: 10, color: darken(SOL, 0.3), align: 'center', halo: true });
      if (Math.abs(st.k - 1) > 0.02 || st.batt) text(ctx, 'dashed: 2025 as it was', B.l + 6, B.t + 12, { size: 10, color: C.ink3, halo: true });
      geo = { A, sx, hx, hy, pts };
    },
  });
  const setK = x => { const s = clamp(geo.sx.inv(x), 0.005, 0.4); st.k = Math.round(s / CN.share1 / 0.01) * 0.01; cur = cannRun(st.k, st.batt); upd(); };
  const near = (x, y) => { if (!geo) return null; let bb = null, bd = 12; geo.pts.forEach(p => { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; bb = p; } }); return bb; };
  fig.interact({
    hit: (x, y) => geo && x > geo.A.l - 10 && x < geo.A.r + 10 && y > geo.A.t - 20 && y < geo.A.b + 6 ? 'k' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.hx, y - geo.hy) < 26 ? 'k' : null,
    cursor: 'ew-resize', down: (o, x) => setK(x), move: (o, x) => setK(x),
    hover: (o, x, y) => { const p = near(x, y); if (p !== st.hover) { st.hover = p; upd(); } },
  });
  const ctl = controls(el), ro = readout(el);
  const mo = more(ctl, 'More: add batteries, or jump to a share');
  slider(mo, { label: 'Batteries (2-hour)', min: 0, max: 40, step: 1, value: 0, color: C.storage, fmt: v => v + ' GW', oninput: v => { st.batt = v; recurve(); cur = cannRun(st.k, st.batt); upd(); }, name: 'batt' });
  segmented(mo, { label: 'Solar share', options: [{ label: 'Germany 2019', value: 0.0839, name: 'cn-19' }, { label: '2025', value: CN.share1, name: 'cn-25' }, { label: 'Double 2025', value: CN.share1 * 2, name: 'cn-2x' }], value: CN.share1, onchange: v => { st.k = v / CN.share1; cur = cannRun(st.k, st.batt); upd(); } });
  function upd() {
    const sh = st.k * CN.share1, p = st.hover;
    if (p) ro.innerHTML = `<b>Germany ${p.r.y}, ${p.f === 'solar' ? 'solar' : p.f === 'on' ? 'onshore wind' : 'offshore wind'}</b> (real): earned €${p.r[p.f].toFixed(0)}/MWh against an average of €${p.r.base.toFixed(0)}, a capture rate of <b>${Math.round(p.r[p.f] / p.r.base * 100)}%</b>, while supplying ${Math.round(p.r[p.s] * 100)}% of demand.`;
    else ro.innerHTML = `With solar supplying <b>${Math.round(sh * 100)}%</b> of demand${st.batt ? ` and ${st.batt} GW of batteries` : ''}, it earns <b>€${Math.round(cur.sp)}/MWh</b> against an all-hours average of €${Math.round(cur.avg)}: a capture rate of <b>${Math.round(cur.cr * 100)}%</b>, with prices below zero in <b>${cur.neg.toLocaleString('en')} hours</b>. (Re-pricing 2025 as it was gives ${Math.round(base.cr * 100)}% and ${base.neg} hours; the real figures were 52% and 573.)`;
    fig.invalidate();
  }
  recurve(); cur = cannRun(st.k, st.batt); upd();
  hint(el, 'drag the sun along the dashed curve to 30% of demand and watch the noon price sink; then open <b>More</b> and add batteries.');
  euroFigure(el, fig, ctl, 'eu-cannibal');
}
