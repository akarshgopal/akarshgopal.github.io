// SHOWPIECE 2 — the merit order. Illustrative fleet (see lib/market.js); SRMC physics is standard.
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, approach, measure } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, more, hint } from '../lib/ui.js';
import { supplyBlocks, clear, TECHS, CAP_PRICE } from '../lib/market.js';

let hatch = null;
function hatchPattern(ctx) {
  if (hatch) return hatch;
  const c = document.createElement('canvas'); c.width = c.height = 8;
  const g = c.getContext('2d'); g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(-2, 10); g.lineTo(10, -2); g.stroke();
  hatch = ctx.createPattern(c, 'repeat'); return hatch;
}


// Region presets (Model). Fleets are the illustrative fleet below, rescaled by technology so the mix resembles each
// region's 2025 generation shares (Ember). Fuel prices are World Bank Pink Sheet 2025 annual averages converted to
// €/MWh of heat at the ECB 2025 rate (US$1.13/€): Henry Hub $3.53/MMBtu ≈ €10.6; TTF $11.96 ≈ €36; Japan LNG $12.04 ≈ €36;
// Australian thermal coal $108.4/t ≈ €13.7/MWh (6,000 kcal/kg). Carbon prices: EU ETS ≈ €75; none in the others.
const USD_PER_EUR_2025 = 1.13;
export const REGIONS = {
  de: { label: 'Germany', name: 'rg-de', legacy: 0.6, mustrun: 6, hydro: 3, coal: 13.7, scale: { nuclear: 0 }, set: { D: 62, wind: 18, solar: 8, gas: 36, co2: 75 } },
  coal: { label: 'Coal-heavy (India, China)', name: 'rg-coal', legacy: 0, mustrun: 4, hydro: 10, coal: 13.7, scale: { nuclear: 0.5, lignite: 0.4, coal: 3.4, gas: 0.25, peaker: 0.5 }, set: { D: 70, wind: 8, solar: 10, gas: 36, co2: 0 } },
  gas: { label: 'Gas-heavy (Texas, Gulf)', name: 'rg-gas', legacy: 0, mustrun: 2, hydro: 0, coal: 13.7, scale: { nuclear: 0.6, lignite: 0, coal: 0.6, gas: 2.4, peaker: 1.5 }, set: { D: 70, wind: 20, solar: 10, gas: 10.6, co2: 0 } },
  hydro: { label: 'Hydro-heavy (Brazil, Norway)', name: 'rg-hydro', legacy: 0, mustrun: 3, hydro: 38, coal: 13.7, scale: { nuclear: 0.25, lignite: 0, coal: 0.2, gas: 0.7, peaker: 0.6 }, set: { D: 60, wind: 10, solar: 6, gas: 36, co2: 0 } },
  solar: { label: 'Solar-heavy noon (California, Australia)', name: 'rg-solar', legacy: 0, mustrun: 3, hydro: 4, coal: 13.7, scale: { nuclear: 0, lignite: 0.6, coal: 1.4, gas: 0.8, peaker: 0.8 }, set: { D: 48, wind: 8, solar: 40, gas: 36, co2: 0 } },
};

// A fixed shuffle for the "offers as they arrive" view of stage 1.
const ARRIVAL = id => { let h = 7; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 9973; const x = Math.sin(h * 12.9898) * 43758.5453; return x - Math.floor(x); };

// stage 1: stack the offers (sort, then drag demand); stage 2: drag the wind edge; stage 3: the full market.
export function merit(el, opts = {}) {
  const stage = opts.stage || 3;
  const st = { D: 62, wind: 18, solar: 8, gas: 35, co2: 75, rent: false, hover: null, jump: null, disp: new Map(), region: 'de', cur: 'USD', unsorted: stage === 1 };
  if (stage === 2) st.wind = 24;
  if (opts.preset) Object.assign(st, opts.preset);
  let geom = null, last = null;
  const SYM = () => st.cur === 'USD' ? '$' : '€';
  const M = (v, d = 0) => { const n = st.cur === 'USD' ? v * USD_PER_EUR_2025 : v; return (n < 0 ? '−' : '') + SYM() + Math.abs(n).toFixed(d); };
  let X1 = 160; const Y0 = -80; let Y1 = 300;

  const regionArgs = () => ({ wind: st.wind, solar: st.solar, legacyShare: stage < 3 ? 0 : REGIONS[st.region].legacy, mustrun: REGIONS[st.region].mustrun, hydro: REGIONS[st.region].hydro, gas: st.gas, co2: st.co2, coal: REGIONS[st.region].coal, scale: REGIONS[st.region].scale, scarcity: 4 });
  function compute() {
    const blocks = supplyBlocks(regionArgs());
    const demand = [{ cap: st.D, price: CAP_PRICE }];
    const r = clear(blocks, demand);
    let x = 0;
    const order = st.unsorted ? blocks.filter(b => b.tech !== 'scarcity').sort((a, b) => ARRIVAL(a.id) - ARRIVAL(b.id)).concat(blocks.filter(b => b.tech === 'scarcity')) : blocks;
    for (const b of order) { b.x = x; x += b.cap; }
    const windB = blocks.find(b => b.id === 'wind');
    return { blocks, r, total: x, windEnd: windB ? windB.x + windB.cap : null };
  }

  const fig = new Fig(el, {
    label: 'The merit order: power plants stacked from cheapest to most expensive running cost, with a draggable demand line setting the market price',
    height: w => stage < 3 ? (w < 600 ? 400 : Math.max(360, Math.min(440, w * 0.48))) : (w < 600 ? 480 : Math.max(400, Math.min(470, w * 0.5))),
    animated: true,
    draw(ctx, w, h) {
      const { blocks, r, total, windEnd } = compute(); last = { blocks, r, windEnd };
      // fit the x-axis to the fleet (no empty 40 GW tail)
      X1 = Math.max(Math.ceil((st.D + 8) / 20) * 20, Math.ceil(total * 1.04 / 20) * 20);
      const box = { l: 58, r: w - 16, t: 46, b: h - 44 };
      // y-axis fits the dearest real plant (scarcity excluded), so no bar is clipped
      const pk = Math.max(150, ...blocks.filter(b => b.price < CAP_PRICE && b.tech !== 'scarcity').map(b => b.price)) * 1.12, yT = Math.ceil(pk / 50) * 50; st.yTop = st.yTop == null || !isPlaying() ? yT : lerp(st.yTop, yT, 0.12); Y1 = st.yTop;
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: X1, y0: Y0, y1: Y1, yticks: (() => { const f = st.cur === 'USD' ? USD_PER_EUR_2025 : 1, step = Y1 * f > 380 ? 100 : 50, out = []; for (let v = Math.ceil(Y0 * f / step) * step; v <= Y1 * f; v += step) out.push(v / f); return out; })(), xticks: Array.from({ length: X1 / 20 + 1 }, (_, i) => i * 20), yfmt: v => M(v, 0), xfmt: v => v, ylabel: w < 600 ? SYM() + '/MWh' : `running cost (SRMC), ${SYM()}/MWh`, xlabel: 'cumulative capacity, GW' });
      geom = { box, sx, sy };
      const snap = !isPlaying();
      ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 40, box.r - box.l, box.b - box.t + 40); ctx.clip();
      // animated clearing: the displayed price eases to the new equilibrium, and the price-setting plant pulses when it changes
      const ease = !snap && st.pd != null && st.pd < CAP_PRICE && r.price < CAP_PRICE;
      const now = performance.now(), dtE = Math.min(0.25, ((now - (st.tE || now)) / 1000)); st.tE = now; // time-based, so slow devices still settle in ~0.6 s
      st.pd = ease ? (Math.abs(st.pd - r.price) < 0.05 ? r.price : r.price + (st.pd - r.price) * Math.exp(-dtE * 9)) : r.price;
      const price = st.pd;
      if (price !== r.price || st.pulse > 0) requestAnimationFrame(() => fig.invalidate()); // keep easing until settled even if the loop idles
      const mid = r.marginal ? r.marginal.id : null;
      if (mid !== st.lastMarg) { if (st.lastMarg !== undefined && !snap) { st.pulse = 1; if (st.lastP != null && r.price < CAP_PRICE && Math.abs(r.price - st.lastP) > 3) st.jump = { from: st.lastP, to: r.price, a: 1 }; } st.lastMarg = mid; }
      st.lastP = r.price < CAP_PRICE ? r.price : null;
      // blocks
      for (const b of blocks) {
        let d = st.disp.get(b.id);
        if (!d) { d = { x: b.x, p: b.price, c: b.cap }; st.disp.set(b.id, d); }
        const k = snap ? 1 : 0.22;
        d.x = lerp(d.x, b.x, k); d.p = lerp(d.p, b.price, k); d.c = lerp(d.c, b.cap, k);
        const x0 = sx(d.x), x1 = sx(d.x + d.c), y0 = sy(0), y1 = sy(Math.min(d.p, st.unsorted ? Y1 : Y1 + 20)); // unsorted: off-scale bars stop at the axis top, clear of the title
        const accepted = (b.q || 0) / b.cap;
        const col = TECHS[b.tech].color;
        const isMarg = !st.unsorted && r.marginal && r.marginal.id === b.id; // no price-setter until the offers are sorted
        const hh = Math.max(Math.abs(d.p) < 3 ? 7 : 2, Math.abs(y1 - y0)), top = Math.abs(d.p) < 3 ? y0 - hh : Math.min(y0, y1);
        // rent
        if (st.rent && accepted > 0 && b.price < price && price < CAP_PRICE) {
          ctx.fillStyle = alpha(C.price, 0.13);
          ctx.fillRect(x0, sy(price), (x1 - x0) * accepted, sy(Math.max(b.price, Y0)) - sy(price));
        }
        ctx.fillStyle = accepted > 0 ? col : lighten(col, 0.62);
        ctx.fillRect(x0, top, x1 - x0, hh);
        if (accepted > 0 && accepted < 1) { ctx.fillStyle = alpha('#ffffff', 0.55); ctx.fillRect(x0 + (x1 - x0) * accepted, top, (x1 - x0) * (1 - accepted), hh); }
        if (b.legacy) { ctx.fillStyle = hatchPattern(ctx); ctx.fillRect(x0, top, x1 - x0, hh); }
        ctx.strokeStyle = C.paper; ctx.lineWidth = 1; ctx.strokeRect(Math.round(x0) + 0.5, top, Math.max(0, x1 - x0 - 1), hh);
        if (isMarg) { ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.strokeRect(x0, top, x1 - x0, hh); }
        if (isMarg && st.pulse > 0) { const g = (1 - st.pulse) * 14; ctx.strokeStyle = alpha(C.price, st.pulse); ctx.lineWidth = 3; ctx.strokeRect(x0 - g, top - g, x1 - x0 + 2 * g, hh + 2 * g); st.pulse = Math.max(0, st.pulse - dtE * 1.6); }
        if (st.hover === b.id) { ctx.strokeStyle = alpha(C.ink, 0.6); ctx.lineWidth = 1.5; ctx.strokeRect(x0, top, x1 - x0, hh); }
        if (b.price > Y1 && x1 - x0 > 26) text(ctx, M(b.price, 0) + ' ↑', (x0 + x1) / 2, sy(Y1) + 12, { size: 10, color: accepted > 0 ? '#fff' : C.ink, align: 'center', weight: 600 });
      }
      ctx.restore();
      if (st.unsorted) {
        const msg = w < 600 ? 'Offers in the order they arrived.' : 'Offers in the order they arrived. Which plants should run?';
        text(ctx, msg, (box.l + box.r) / 2, box.t - 18, { size: 13, weight: 650, color: C.ink, align: 'center', halo: true });
        return;
      }
      // stage 2: the draggable right edge of the wind block
      if (stage === 2) {
        const wd = st.disp.get('wind'), ex = wd ? sx(wd.x + wd.c) : sx(0), ey = sy(0);
        line(ctx, ex, ey - 46, ex, ey + 14, C.wind, 2);
        circle(ctx, ex, ey - 46, 11, C.wind, '#fff', 2);
        text(ctx, '↔', ex, ey - 42, { size: 11, color: '#fff', align: 'center', weight: 700 });
        // the label sits left of the handle, over the near-zero blocks; with little wind there is no room, so it goes under the axis
        const wl = 'wind ' + st.wind.toFixed(0) + ' GW', ww = measure(ctx, wl, 12, 650), lf = ex - 16 - ww > box.l + 4;
        const wlx = lf ? ex - 16 - ww : ex + 8, wly = lf ? ey - 42 : ey + 36;
        text(ctx, wl, wlx, wly, { size: 12, weight: 650, color: darken(C.wind, 0.15), halo: true });
        geom.windLab = { x0: wlx - 4, x1: wlx + ww + 4, y0: wly - 13, y1: wly + 4 };
        geom.windX = ex; geom.windY = ey - 46;
      }
      // demand line
      const dx = sx(st.D);
      line(ctx, dx, box.t - 26, dx, box.b, C.demand, 2);
      rrect(ctx, dx - 9, box.t - 40, 18, 18, 9); ctx.fillStyle = C.demand; ctx.fill();
      text(ctx, '↔', dx, box.t - 27, { size: 11, color: '#fff', align: 'center', weight: 700 });
      { const dl = 'demand ' + st.D.toFixed(0) + ' GW', dw = measure(ctx, dl, 12, 600), right = dx + 14 + dw < w - 4; text(ctx, dl, right ? dx + 14 : dx - 14, box.t - 27, { size: 12, color: C.ink, weight: 600, halo: true, align: right ? 'left' : 'right' }); }
      // where the "sets the price" label goes, computed first so the jump label can avoid it
      let ML = null;
      if (r.marginal && price < CAP_PRICE) {
        const m = r.marginal; const d = st.disp.get(m.id);
        const mx = sx(d.x + d.c / 2), my = sy(clamp(d.p, Y0, Y1));
        // keep the text off the demand line: left of it, else right of it, dropping the efficiency if neither side has room
        const full = 'sets the price: ' + TECHS[m.tech].short + (m.eff ? ` (${Math.round(m.eff * 100)}% efficient)` : '');
        const fits = s => { const tw = measure(ctx, s, 11.5, 600); return dx - 10 - tw >= box.l + 4 ? dx - 10 - tw : dx + 10 + tw <= box.r - 4 ? dx + 10 : null; };
        const label = fits(full) != null ? full : 'sets the price: ' + TECHS[m.tech].short;
        const tw = measure(ctx, label, 11.5, 600);
        let lx = clamp(mx - tw / 2, box.l + 4, box.r - tw - 4);
        if (lx < dx + 8 && lx + tw > dx - 8) lx = fits(label) ?? lx;
        const tagR = box.l + 6 + measure(ctx, `${M(price, 0)}/MWh`, 12, 700) + 22, hitsTag = w < 600 && lx < tagR;
        ML = { label, x0: lx, x1: lx + tw, y: my < box.t + 60 ? my + 40 : my - 34, tagBelow: hitsTag && my >= box.t + 60 };
        const WL = stage === 2 && geom.windLab; // keep clear of the wind label
        if (WL && ML.x1 > WL.x0 && ML.x0 < WL.x1 && ML.y + 4 > WL.y0 && ML.y - 12 < WL.y1) ML.y = WL.y0 - 6;
      }
      // price line
      if (price < CAP_PRICE) {
        const py = sy(clamp(price, Y0, Y1));
        line(ctx, box.l, py, dx, py, C.price, 2, [6, 4]);
        circle(ctx, dx, py, 5.5, C.price, '#fff', 2); // where supply meets demand
        const tagY = ML && ML.tagBelow ? py + 6 : py - 14;
        tag(ctx, `${M(price, 0)}/MWh`, box.l + 6, tagY, { bg: C.price });
        // the aha: when demand crosses into a dearer plant, show the jump it causes for every MWh
        if (st.jump && st.jump.a > 0) { const J = st.jump, y0 = sy(clamp(J.from, Y0, Y1)), y1 = sy(clamp(J.to, Y0, Y1)), ax = dx + 16, al = Math.min(1, J.a * 1.6);
          ctx.globalAlpha = al; line(ctx, box.l, y0, dx, y0, alpha(C.price, 0.5), 1, [2, 3]); arrow(ctx, ax, y0, ax, y1, C.price, 2);
          const d = J.to - J.from, s = (d > 0 ? '+' : '−') + M(Math.abs(d), 0).replace('−', '') + ' for every MWh', right = ax + 8 + measure(ctx, s, 12, 650) < box.r;
          const sw = measure(ctx, s, 12, 650), jx0 = right ? ax + 8 : ax - 24 - sw, jx1 = jx0 + sw, tagR = box.l + 6 + measure(ctx, `${M(price, 0)}/MWh`, 12, 700) + 22;
          const clash = y => (ML && jx1 > ML.x0 - 4 && jx0 < ML.x1 + 4 && Math.abs(y - ML.y) < 16) || (jx0 < tagR && Math.abs(y - (tagY + 4)) < 20) || (stage === 2 && geom.windX != null && Math.abs(y - (geom.windY + 4)) < 18 && jx1 > geom.windX - 140 && jx0 < geom.windX + 140) || y < box.t + 4 || y > box.b - 2;
          const mid = (y0 + y1) / 2 + 4, yl = [mid, mid - 18, mid + 18, py + 22, py - 52, py + 44, mid - 36, mid + 36].find(y => !clash(y)) ?? mid;
          text(ctx, s, right ? ax + 8 : ax - 24, yl, { size: 12, weight: 650, color: C.price, halo: true, align: right ? 'left' : 'right' }); ctx.globalAlpha = 1;
          J.a = Math.max(0, J.a - (dtE || 0.016) * 0.35); if (J.a > 0) requestAnimationFrame(() => fig.invalidate()); }
      } else {
        tag(ctx, 'supply exhausted: scarcity', box.l + 6, box.t + 4, { bg: C.peaker });
      }
      if (ML) text(ctx, ML.label, ML.x0, ML.y, { size: 11.5, color: C.ink, weight: 600, halo: true });
      // hover tooltip
      if (st.hover) {
        const b = blocks.find(b => b.id === st.hover);
        if (b) {
          const lines = [TECHS[b.tech].name + (b.legacy ? ' (fixed tariff)' : ''), `${b.cap.toFixed(1)} GW`];
          if (b.fuelCost !== undefined) lines.push(`fuel ${M(b.fuelCost, 0)} + CO₂ ${M(b.co2Cost, 0)} + O&M ${M(b.vom, 0)}`, `= ${M(b.price, 0)}/MWh`);
          else lines.push(b.price < 0 ? `bids ${M(b.price, 0)}/MWh: would rather pay than stop` : `bids ≈ ${M(b.price, 0)}/MWh`);
          const d = st.disp.get(b.id); const tx = clamp(sx(d.x + d.c / 2) + 10, box.l, box.r - 210), ty = box.t + 6;
          rrect(ctx, tx, ty, 210, 18 + lines.length * 16, 8); ctx.fillStyle = alpha('#ffffff', 0.96); ctx.fill(); ctx.strokeStyle = C.grid2; ctx.stroke();
          lines.forEach((s, i) => text(ctx, s, tx + 10, ty + 20 + i * 16, { size: 11.5, color: i ? C.ink2 : C.ink, weight: i ? 450 : 600 }));
        }
      }
    },
  });
  // Direct manipulation: grab the wind edge (stage 2), else press anywhere on the chart to put the demand line there.
  const dragWind = x => { const cur = last && last.windEnd; if (cur == null) return; st.wind = clamp(Math.round(st.wind + geom.sx.inv(x) - cur), 0, 50); sliders.wind && sliders.wind.set(st.wind); upd(); last = compute(); };
  fig.interact({
    hit: (x, y) => {
      if (!geom || st.unsorted) return null;
      if (stage === 2 && geom.windX != null && Math.hypot(x - geom.windX, y - geom.windY) < 22) return 'wind';
      if (stage === 2 && geom.windX != null && Math.abs(x - geom.windX) < 12 && y > geom.windY && y < geom.box.b + 14) return 'wind';
      if (x > geom.box.l - 6 && x < geom.box.r + 6 && y > geom.box.t - 44 && y < geom.box.b + 6) return 'demand';
      return null;
    },
    // on a touch screen only the handles grab; a swipe across the chart scrolls the page
    touchHit: (x, y) => {
      if (!geom || st.unsorted) return null;
      if (stage === 2 && geom.windX != null && (Math.hypot(x - geom.windX, y - geom.windY) < 26 || (Math.abs(x - geom.windX) < 18 && y > geom.windY && y < geom.box.b + 14))) return 'wind';
      return Math.abs(x - geom.sx(st.D)) < 22 && y > geom.box.t - 46 && y < geom.box.b + 6 ? 'demand' : null;
    },
    cursor: 'ew-resize',
    down: (o, x) => { if (o === 'demand') { st.D = clamp(Math.round(geom.sx.inv(x)), 20, 140); dSl.set(st.D); upd(); } },
    move: (o, x) => { if (o === 'wind') return dragWind(x); st.D = clamp(Math.round(geom.sx.inv(x)), 20, 140); dSl.set(st.D); upd(); },
    hover: (o, x, y) => {
      st.hover = null;
      if (!geom || !last || o === 'wind') return;
      for (const b of last.blocks) {
        const d = st.disp.get(b.id); if (!d) continue;
        const x0 = geom.sx(d.x), x1 = geom.sx(d.x + d.c), y0 = geom.sy(0), y1 = geom.sy(Math.min(d.p, Y1));
        if (x >= x0 && x <= x1 && y >= Math.min(y0, y1) - 2 && y <= Math.max(y0, y1) + 2) { st.hover = b.id; break; }
      }
    },
  });
  const ctl = controls(el);
  const P = {
    'Calm weekday': { D: 62, wind: 18, solar: 8, gas: 35, co2: 75 },
    'Sunny Sunday noon': { D: 44, wind: 14, solar: 46, gas: 35, co2: 75 },
    'Windy night': { D: 46, wind: 42, solar: 0, gas: 35, co2: 75 },
    'Dark, still evening': { D: 76, wind: 3, solar: 0, gas: 35, co2: 75 },
    '2022-style gas shock': { D: 64, wind: 12, solar: 6, gas: 150, co2: 85 },
  };
  const sliders = {};
  let dSl, updS;
  if (stage < 3) {
    if (stage === 1) segmented(ctl, { label: 'Order the offers', options: [{ label: 'As they arrived', value: true, name: 'ms-arrived' }, { label: 'Cheapest first', value: false, name: 'ms-sorted' }], value: st.unsorted, onchange: v => { st.unsorted = v; upd(); } });
    const fine = more(ctl, stage === 1 ? 'More: set demand with a slider' : 'More: sliders instead of dragging');
    dSl = slider(fine, { label: 'Demand', min: 20, max: 140, step: 1, value: st.D, color: C.demand, fmt: v => v + ' GW', oninput: v => { st.D = v; upd(); }, name: 'D', wide: true }); sliders.D = dSl;
    if (stage === 2) sliders.wind = slider(fine, { label: 'Wind output', min: 0, max: 50, step: 1, value: st.wind, color: C.wind, fmt: v => v + ' GW', oninput: v => { st.wind = v; upd(); }, name: 'wind' });
    const ro = readout(el);
    updS = () => {
      const { r } = compute();
      if (st.unsorted) ro.innerHTML = `Each block is one plant’s offer: <b>width</b> is how much it can produce, <b>height</b> is what one more MWh costs it to make. In this order the market can’t tell which plants to run. Pick <b>Cheapest first</b>.`;
      else if (r.price >= CAP_PRICE) ro.innerHTML = `Demand is beyond everything on offer: <b>scarcity</b>. Drag back to the left.`;
      else if (stage === 1) ro.innerHTML = `Demand <b>${st.D} GW</b> is met by every plant left of the line. The last one needed, <b>${TECHS[r.marginal.tech].short}</b>, sets the price: <b>${M(r.price, 0)}/MWh</b>, paid to all of them.`;
      else {
        const r0 = clear(supplyBlocks({ ...regionArgs(), wind: 0 }), [{ cap: st.D, price: CAP_PRICE }]);
        const p0 = r0.price < CAP_PRICE ? M(r0.price, 0) + '/MWh' : 'scarcity';
        ro.innerHTML = `With <b>${st.wind} GW</b> of wind the price is <b>${M(r.price, 0)}/MWh</b>, set by <b>${TECHS[r.marginal.tech].short}</b>. With no wind it would be <b>${p0}</b>${r0.marginal && r0.marginal.id !== r.marginal.id ? `, set by ${TECHS[r0.marginal.tech].short}` : ''}.`;
      }
      fig.invalidate();
    };
    upd = updS;
    hint(el, stage === 1 ? 'pick <b>Cheapest first</b>, then drag (or tap) anywhere on the chart to move the demand line.' : 'drag the <span class="c-wind">wind</span> handle to the right and watch the whole stack shift, and the price fall.');
    upd();
    el.__sim = { st, compute, set: (p) => { Object.assign(st, p); for (const k in sliders) if (k in p) sliders[k].set(st[k]); upd(); } };
    return;
  }
  sliders.gas = slider(ctl, { label: 'Gas price', min: 10, max: 200, step: 1, value: st.gas, color: C.gas, fmt: v => M(v, 0) + ' per MWh of gas', oninput: v => { st.gas = v; upd(); }, name: 'gas' });
  sliders.co2 = slider(ctl, { label: 'Carbon price', min: 0, max: 160, step: 1, value: st.co2, color: C.coal, fmt: v => M(v, 0) + '/t', oninput: v => { st.co2 = v; upd(); }, name: 'co2' });
  const adv = more(ctl, 'More: situations, regions, demand, wind and solar');
  const presets = document.createElement('div'); presets.className = 'ctl btnrow presets'; adv.appendChild(presets);
  for (const [name, p] of Object.entries(P)) button(presets, name, () => { Object.assign(st, p); for (const k in sliders) sliders[k].set(st[k]); upd(); }, { kind: 'chip', name: 'preset-' + name });
  segmented(adv, { label: 'Region (stylised fleet)', options: Object.entries(REGIONS).map(([k, R]) => ({ label: R.label, value: k, name: R.name })), value: st.region, onchange: v => { st.region = v; st.disp.clear(); Object.assign(st, REGIONS[v].set); for (const k in sliders) sliders[k].set(st[k]); upd(); } });
  sliders.wind = slider(adv, { label: 'Wind output', min: 0, max: 50, step: 1, value: st.wind, color: C.wind, fmt: v => v + ' GW', oninput: v => { st.wind = v; upd(); }, name: 'wind' });
  sliders.solar = slider(adv, { label: 'Solar output', min: 0, max: 50, step: 1, value: st.solar, color: C.solar, fmt: v => v + ' GW', oninput: v => { st.solar = v; upd(); }, name: 'solar' });
  dSl = slider(adv, { label: 'Demand', min: 20, max: 140, step: 1, value: st.D, color: C.demand, fmt: v => v + ' GW', oninput: v => { st.D = v; upd(); }, name: 'D', wide: true }); sliders.D = dSl;
  segmented(adv, { label: 'Who profits?', options: [{ label: 'Hide', value: false }, { label: 'Show infra-marginal rent', value: true }], value: st.rent, onchange: v => { st.rent = v; upd(); } });
  const ro = readout(el);
  // fix the slider fmt for HTML subscript
  function upd() {
    const { blocks, r } = compute();
    const rev = r.price < CAP_PRICE ? r.price * r.qty / 1000 : NaN; // €m per hour
    const cost = blocks.reduce((s, b) => s + (b.q || 0) * Math.max(0, b.price), 0) / 1000;
    ro.innerHTML = r.price >= CAP_PRICE
      ? `Demand exceeds everything on offer. The price jumps to the cap and the operator must cut load — this is <b>scarcity</b>.`
      : `Every MWh this hour clears at <b>${M(r.price, 0)}</b>, the running cost of the last plant needed: <b>${TECHS[r.marginal.tech].short}</b>. ` + (st.rent ? `Buyers pay about <b>${M(rev, 1)} m</b> for the hour; generators’ running costs are about ${M(Math.max(0, cost), 1)} m. The difference is the <span class="c-price">infra-marginal rent</span> that pays back power plants’ capital.` : `Every cheaper plant is paid the same price.`);
    fig.invalidate();
  }
  hint(el, 'slide <span class="c-gas">gas</span> and carbon and watch the blocks swap places; drag anywhere on the chart to move demand.');
  upd();
  el.__sim = { st, compute, set: (p) => { Object.assign(st, p); for (const k in sliders) if (k in p) sliders[k].set(st[k]); upd(); } };
}
