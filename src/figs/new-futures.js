// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, circle, line, pathLine, scale } from '../lib/draw.js';
import { controls, slider, readout, segmented } from '../lib/ui.js';
import { ENERGY } from '../lib/energydata.js';
import { USBILL, USSALES } from '../lib/usbilldata.js';
import { DEBILL } from '../lib/debilldata.js';

// Humanity on the Kardashev scale: world primary energy as a rate of power (OWID / Energy Institute), Sagan's continuous
// rating K = (log10 P − 6) / 10, Type I at 10^16 W, and how long a steady growth rate takes to get there.
const TYPE1 = 1e16, SUNLIGHT = 1.74e17; // W; sunlight intercepted by the Earth = 1,361 W/m² × π × (6,371 km)²
export function kardashev(el) {
  const [Y0, Y1] = ENERGY.years;
  const W = ENERGY.worldTWh.map(t => t * 1e12 / 8760); // TWh a year → average watts
  const P1 = W[W.length - 1];
  const rate = (a, b) => Math.pow(W[b - Y0] / W[a - Y0], 1 / (b - a)) - 1;
  const fast = rate(1965, 1973), slow = rate(1973, Y1);
  const st = { g: Math.round(slow * 1000) / 10 };
  const K = p => (Math.log10(p) - 6) / 10;
  const yearsTo = (p, g) => Math.log(p / P1) / Math.log(1 + g / 100);
  const fig = new Fig(el, {
    label: `World energy use as power on a logarithmic scale from 1 to 1,000 terawatts: about ${Math.round(P1 / 1e12)} TW in ${Y1}, 0.73 on the Kardashev scale; Type I is 10,000 TW and the sunlight reaching the Earth about 174,000 TW`,
    height: w => w < 600 ? 230 : Math.max(210, Math.round(w / 3.9)),
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: 18, r: w - 18 };
      const lg = Math.log10, sx = scale(12, 17.4, box.l, box.r);
      const y = narrow ? 112 : Math.round(h / 2);
      // the power axis (top) and the Kardashev rating (below), one scale
      line(ctx, sx(12), y, sx(17.4), y, C.grid2, 1.5);
      for (let e = 12; e <= 17; e++) {
        line(ctx, sx(e), y - 5, sx(e), y + 5, C.ink3, 1);
        const tw = [1, 10, 100, '1,000', '10,000', '100,000'][e - 12];
        if (e !== 16 && (!narrow || e % 2 === 0)) text(ctx, `${tw} TW`, sx(e), y - 12, { size: 10.5, color: C.ink3, align: 'center' });
        text(ctx, `K ${K(10 ** e).toFixed(1)}`, sx(e), y + 19, { size: 10.5, color: C.ink3, align: 'center' });
      }
      // Type I and the sunlight that reaches the Earth
      const x1 = sx(lg(TYPE1)), xs = sx(lg(SUNLIGHT));
      line(ctx, x1, y - 34, x1, y - 6, alpha(C.price, 0.7), 1.5, [4, 3]);
      text(ctx, 'Type I', x1, y - 40, { size: 11.5, weight: 650, color: C.price, align: 'center' });
      line(ctx, xs, y - 34, xs, y - 6, alpha(C.solar, 0.9), 1.5, [4, 3]);
      text(ctx, narrow ? 'sunlight' : 'all sunlight on Earth', narrow ? xs + 4 : xs, y - 40, { size: 11, weight: 600, color: '#9a7414', align: narrow ? 'right' : 'center' });
      // humanity, 1965 → now
      pathLine(ctx, [[sx(lg(W[0])), y], [sx(lg(P1)), y]], C.ink, 4);
      for (const yr of [Y0, 1973, 2000, Y1]) { const p = W[yr - Y0]; circle(ctx, sx(lg(p)), y, yr === Y1 ? 5 : 3.5, yr === Y1 ? C.ink : '#fff', C.ink, 2); }
      text(ctx, `humanity, ${Y0}–${Y1}`, sx(lg(W[0])), y + 40, { size: 11.5, weight: 650, color: C.ink });
      // the path to Type I at the chosen growth rate
      const yrs = yearsTo(TYPE1, st.g);
      pathLine(ctx, [[sx(lg(P1)) + 7, y], [x1 - 3, y]], alpha(C.ink, 0.35), 1.5, [2, 4]);
      text(ctx, `${Math.round(yrs)} years at ${st.g.toFixed(1)}% a year`, (sx(lg(P1)) + x1) / 2, y + (narrow ? 58 : 40), { size: 11, color: C.ink2, align: 'center', weight: 600 });
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => {
    const yrs = yearsTo(TYPE1, st.g);
    ro.innerHTML = `Humanity used about <b>${(P1 / 1e12).toFixed(0)} TW</b> on average in ${Y1}, <b>${K(P1).toFixed(2)}</b> on the scale. At <b>${st.g.toFixed(1)}% a year</b> Type I is ${Math.round(yrs)} years away, in about ${Y1 + Math.round(yrs)}. The world grew ${(fast * 100).toFixed(1)}% a year in 1965–73 and ${(slow * 100).toFixed(1)}% a year since.`;
    fig.invalidate();
  };
  slider(ctl, { label: 'Growth in world energy use', min: 0.5, max: 7, step: 0.1, value: st.g, color: C.ink2, fmt: v => v.toFixed(1) + '% a year', oninput: v => { st.g = v; upd(); }, name: 'growth' });
  upd();
}

// What a household kilowatt-hour pays for, over time: the US from utilities' accounts, 1951 on (2025 dollars),
// Germany from BDEW's price components, 2006 on, in 2025 euro cents: the one figure in euros, because a long series at
// each year's exchange rate would mostly show the euro's swings. BDEW's basis changes in 2015 (marked).
const SPLIT = {
  us: {
    name: 'United States', years: USBILL.map(r => r.y), unit: '¢ per kWh, 2025 dollars', sfx: '¢',
    layers: [
      { k: 'energy', lab: 'fuel and bought power', col: C.procurement, v: r => r.parts.fuel + r.parts.bought },
      { k: 'gen', lab: 'running and paying for plants', col: '#c98f4a', v: r => r.parts.gen },
      { k: 'wires', lab: 'wires', col: C.network, v: r => r.parts.wires },
      { k: 'over', lab: 'customer service, overheads', col: '#bdb7aa', v: r => r.parts.over },
      { k: 'taxes', lab: 'taxes', col: C.taxes, v: r => r.parts.taxes },
    ],
    rows: USBILL,
  },
  de: {
    name: 'Germany', years: DEBILL.map(r => r.y), unit: 'euro cents (ct) per kWh, 2025 euros', sfx: ' ct',
    seam: { y: DEBILL.find(r => r.basis === 'new').y, lab: 'new contracts only →' },
    layers: [
      { k: 'energy', lab: 'energy and sales', col: C.procurement, v: r => r.parts.energy },
      { k: 'wires', lab: 'network', col: C.network, v: r => r.parts.wires },
      { k: 'taxes', lab: 'taxes and levies', col: C.taxes, v: r => r.parts.taxes },
    ],
    rows: DEBILL,
  },
};
export function billSplit(el) {
  const st = { c: 'us' };
  const fig = new Fig(el, {
    label: 'What a household kilowatt-hour pays for, by year: in the United States 1951 to 2025 every part fell until about 1970, then fuel and bought power jumped in the 1970s, plant costs rose in the 1980s, and wires have tripled since 2000; in Germany 2006 to 2025, in 2025 euros, taxes and levies rose to a peak in 2017 and fell back after the renewables levy ended, energy and sales jumped in 2022, and the network fell to 2011 and then rose',
    height: w => w < 600 ? 470 : 380,
    draw(ctx, w, h) {
      const S = SPLIT[st.c], narrow = w < 600;
      const ys = S.years, y0 = ys[0], y1 = ys[ys.length - 1];
      const labW = narrow ? 12 : 196;
      const box = { l: narrow ? 34 : 44, r: w - labW, t: 30, b: narrow ? h - 30 - 18 * S.layers.length - 14 : h - 30 };
      const tops = S.rows.map(r => S.layers.reduce((s, L) => s + L.v(r), 0));
      const ymax = Math.ceil(Math.max(...tops) / 10) * 10;
      const sx = scale(y0, y1, box.l, box.r), sy = scale(0, ymax, box.b, box.t);
      for (let v = 0; v <= ymax; v += 10) { const y = Math.round(sy(v)) + 0.5; line(ctx, box.l, y, box.r, y, v ? C.grid : C.grid2, 1); text(ctx, v + S.sfx, box.l - 6, y + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      const step = y1 - y0 > 15 ? (narrow ? 10 : 5) : (narrow ? 4 : 2);
      const t0 = y1 - y0 > 15 ? Math.ceil(y0 / step) * step : y0;
      for (let y = t0; y <= y1; y += step) text(ctx, y, sx(y), box.b + 15, { size: 10.5, color: C.ink3, align: 'center' });
      text(ctx, S.unit, box.l, box.t - 12, { size: 11, color: C.ink3, weight: 500 });
      // stacked layers
      let below = S.rows.map(() => 0);
      const ends = [];
      for (const L of S.layers) {
        const above = S.rows.map((r, i) => below[i] + L.v(r));
        ctx.beginPath();
        S.rows.forEach((r, i) => { const x = sx(ys[i]); i ? ctx.lineTo(x, sy(above[i])) : ctx.moveTo(x, sy(above[i])); });
        for (let i = S.rows.length - 1; i >= 0; i--) ctx.lineTo(sx(ys[i]), sy(below[i]));
        ctx.closePath(); ctx.fillStyle = alpha(L.col, 0.85); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
        const a = L.v(S.rows[0]), b = L.v(S.rows[S.rows.length - 1]);
        ends.push({ L, y: sy((below[below.length - 1] + above[above.length - 1]) / 2), a, b });
        below = above;
      }
      // total line
      pathLine(ctx, S.rows.map((r, i) => [sx(ys[i]), sy(tops[i])]), C.ink, 1.6);
      if (S.seam) { // where the source's basis changes
        const x = Math.round(sx(S.seam.y - 0.5)) + 0.5;
        ctx.save(); ctx.setLineDash([3, 3]); line(ctx, x, box.t, x, box.b, alpha(C.ink, 0.45), 1); ctx.restore();
        text(ctx, S.seam.lab, x + 4, box.t + 10, { size: 10.5, color: C.ink3, halo: true });
      }
      const chg = e => { const ch = e.b / e.a - 1; return Math.abs(ch) < 0.05 ? 'about the same' : (ch > 0 ? '+' : '−') + Math.round(Math.abs(ch) * 100) + '%'; };
      if (narrow) { // legend under the chart, top layer first
        ends.slice().reverse().forEach((e, i) => { const y = box.b + 34 + i * 18;
          ctx.fillStyle = alpha(e.L.col, 0.85); ctx.fillRect(box.l, y - 9, 10, 10);
          text(ctx, e.L.lab, box.l + 16, y, { size: 10.5, weight: 650, color: C.ink2 });
          text(ctx, `${e.a.toFixed(1)} → ${e.b.toFixed(1)}${S.sfx} · ${chg(e)}`, w - 10, y, { size: 10.5, color: C.ink3, align: 'right' }); });
        return;
      }
      // end labels, pushed apart
      ends.sort((p, q) => p.y - q.y);
      const gap = narrow ? 24 : 30;
      for (let i = 1; i < ends.length; i++) if (ends[i].y < ends[i - 1].y + gap) ends[i].y = ends[i - 1].y + gap;
      const over = ends[ends.length - 1].y - (box.b - 4); if (over > 0) ends.forEach(e => e.y -= over);
      const lx = box.r + 10;
      for (const e of ends) {
        const chs = chg(e);
        text(ctx, e.L.lab, lx, e.y - 2, { size: narrow ? 10.5 : 11.5, weight: 650, color: e.L.col === C.taxes || e.L.col === '#bdb7aa' ? C.ink2 : e.L.col });
        text(ctx, `${e.a.toFixed(1)} → ${e.b.toFixed(1)}${S.sfx} · ${chs}`, lx, e.y + 12, { size: 10.5, color: C.ink3 });
      }
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => {
    const S = SPLIT[st.c], r0 = S.rows[0], r1 = S.rows[S.rows.length - 1], y0 = S.years[0], y1 = S.years[S.years.length - 1];
    const tot = r => S.layers.reduce((s, L) => s + L.v(r), 0);
    const L = k => S.layers.find(l => l.k === k);
    const at = (k, pick) => S.rows.reduce((b, r) => (pick(L(k).v(r), L(k).v(b)) ? r : b));
    const fuelTop = at('energy', (a, b) => a > b), wireLow = at('wires', (a, b) => a < b);
    // the low before the fuel peak and the high after it (the first year is the overall high)
    const low = S.rows.filter(r => r.y <= fuelTop.y).reduce((b, r) => (tot(r) < tot(b) ? r : b), r0);
    const top = S.rows.filter(r => r.y > low.y).reduce((b, r) => (tot(r) > tot(b) ? r : b), r1);
    ro.innerHTML = st.c === 'us'
      ? `An average American household kWh cost <b>${tot(r0).toFixed(1)}¢</b> in ${y0}, ${tot(low).toFixed(1)}¢ in ${low.y}, ${tot(top).toFixed(1)}¢ in ${top.y} and <b>${tot(r1).toFixed(1)}¢</b> in ${y1}, in 2025 dollars. Fuel and bought power peaked at ${L('energy').v(fuelTop).toFixed(1)}¢ in ${fuelTop.y}; wires fell to ${L('wires').v(wireLow).toFixed(1)}¢ in ${wireLow.y} and are now <b>${L('wires').v(r1).toFixed(1)}¢</b>.`
      : (() => {
        const taxTop = at('taxes', (a, b) => a > b), c = v => v.toFixed(1) + ' ct';
        return `A German household kWh cost <b>${c(tot(r0))}</b> in ${y0} and <b>${c(tot(r1))}</b> in ${y1}, in 2025 euros. Taxes and levies rose from ${c(L('taxes').v(r0))} to ${c(L('taxes').v(taxTop))} in ${taxTop.y} and were <b>${c(L('taxes').v(r1))}</b> in ${y1}; energy and sales peaked at ${c(L('energy').v(fuelTop))} in ${fuelTop.y}; the network fell to ${c(L('wires').v(wireLow))} in ${wireLow.y} and was ${c(L('wires').v(r1))} in ${y1}.`;
      })();
    fig.invalidate();
  };
  segmented(ctl, { label: 'Country', value: st.c, name: 'country', options: [{ label: 'United States', value: 'us', name: 'us' }, { label: 'Germany', value: 'de', name: 'de' }], onchange: v => { st.c = v; upd(); } });
  upd();
}

// Sales against price: the same US utilities, kWh sold (1951 = 1) against the real price of a household kWh or its
// wires part, both on log scales, one dot a year. Sales before 1960 and in 1994–2001 rest on a weaker basis (lighter).
const SP = USSALES.map(s => { const r = USBILL.find(b => b.y === s.y); return { y: s.y, i: s.i, rough: !!s.rough, price: r.real, wires: r.parts.wires }; });
// After 2001 sales wobble around a flat line (10.3-11.1x) and a year-by-year path is a knot: every year keeps its dot,
// but the path joins only 2001, 2005, 2010, ..., 2025.
const SP_PATH = SP.filter(p => p.y <= 2001 || p.y % 5 === 0 || p.y === SP[SP.length - 1].y);
const SP_LAB = { // label offsets in px from the dot, by width and series: [dx, dy, align, leader]
  wide: {
    price: { 1951: [3, 17, 'left'], 1969: [-7, 14, 'right'], 1973: [0, 17, 'center'], 1983: [0, -10, 'center'], 2000: [8, 17, 'left'], 2025: [7, -9, 'left'] },
    wires: { 1951: [4, -8, 'left'], 1969: [5, -9, 'left'], 1973: [-5, 15, 'right'], 1983: [0, 19, 'center'], 2000: [7, 14, 'left'], 2025: [9, 4, 'left'] },
  },
  narrow: {
    price: { 1951: [3, 17, 'left'], 1969: [-6, 14, 'right'], 1973: [0, 17, 'center'], 1983: [0, -10, 'center'], 2000: [0, 18, 'center'], 2025: [0, -10, 'center'] },
    wires: { 1951: [4, -8, 'left'], 1969: [4, -9, 'left'], 1973: [-5, 15, 'right'], 1983: [-5, 15, 'right'], 2000: [6, 14, 'left'], 2025: [8, 4, 'left'] },
  },
};
export function salesPrice(el) {
  const st = { s: 'price', hover: null, pts: [] };
  const at = y => SP.find(p => p.y === y);
  const S = { price: { lab: 'whole price', col: C.ink }, wires: { lab: 'wires', col: C.network } };
  const fig = new Fig(el, {
    label: `Kilowatt-hours sold by US investor-owned utilities against the real price of a household kilowatt-hour, both on log scales, 1951 to 2025: from 1951 to 1969 sales rose ${at(1969).i.toFixed(1)} times while the price fell from ${at(1951).price.toFixed(0)} to ${at(1969).price.toFixed(0)} cents along a straight line; it went flat in 1970 to 1973, rose to ${at(1983).price.toFixed(0)} cents in 1983 and fell back by 2000; since 2007 sales have stood still at about ${at(2025).i.toFixed(0)} times 1951 while the wires part rose from ${at(2007).wires.toFixed(1)} to ${at(2025).wires.toFixed(1)} cents`,
    height: w => w < 600 ? 360 : 400,
    draw(ctx, w, h) {
      const narrow = w < 600, ln = Math.log;
      const box = { l: narrow ? 30 : 40, r: w - (narrow ? 12 : 24), t: 30, b: h - (narrow ? 40 : 42) };
      const sx0 = scale(ln(0.9), ln(15), box.l, box.r), sy0 = scale(ln(1.5), ln(42), box.b, box.t);
      const sx = v => sx0(ln(v)), sy = v => sy0(ln(v));
      for (const v of [2, 3, 5, 10, 20, 40]) { const y = Math.round(sy(v)) + 0.5; line(ctx, box.l, y, box.r, y, C.grid, 1); text(ctx, v + '¢', box.l - 6, y + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      for (const v of [1, 2, 3, 5, 10]) { const x = Math.round(sx(v)) + 0.5; line(ctx, x, box.t, x, box.b, C.grid, 1); text(ctx, v + '×', x, box.b + 15, { size: 10.5, color: C.ink3, align: 'center' }); }
      line(ctx, box.l, box.b + 0.5, box.r, box.b + 0.5, C.grid2, 1);
      text(ctx, narrow ? '¢ per household kWh, 2025 $, log scale' : '¢ per household kWh, 2025 dollars, log scale', box.l, box.t - 12, { size: 11, color: C.ink3, weight: 500 });
      text(ctx, narrow ? 'kWh sold, 1951 = 1, log scale' : 'kWh sold by the same utilities, 1951 = 1, log scale', box.r, box.b + 32, { size: 11, color: C.ink3, weight: 500, align: 'right' });
      // the other series, faint, for reference
      const other = st.s === 'price' ? 'wires' : 'price';
      pathLine(ctx, SP_PATH.map(p => [sx(p.i), sy(p[other])]), alpha(S[other].col, 0.16), 1.4);
      text(ctx, S[other].lab, sx(1) + 8, sy(SP[0][other]) + 4, { size: 10.5, color: alpha(S[other].col, 0.5), weight: 600, halo: true });
      // the chosen series: segments and dots, lighter where the sales estimate is rough
      const col = S[st.s].col;
      st.pts = SP.map(p => ({ p, x: sx(p.i), y: sy(p[st.s]) }));
      const path = st.pts.filter(q => SP_PATH.includes(q.p));
      for (let k = 1; k < path.length; k++) {
        const a = path[k - 1], b = path[k], rough = a.p.rough || b.p.rough;
        line(ctx, a.x, a.y, b.x, b.y, alpha(col, rough ? 0.3 : 0.75), rough ? 1.2 : 1.6);
      }
      for (const q of st.pts) {
        const off = !SP_PATH.includes(q.p); // the years between the five-year steps: smaller and lighter
        circle(ctx, q.x, q.y, (narrow ? 2.4 : 2.8) * (off ? 0.75 : 1), q.p.rough ? C.paper : alpha(col, off ? 0.45 : 1), alpha(col, q.p.rough || off ? 0.5 : 1), 1.2);
      }
      for (const [yr, [dx, dy, align, lead]] of Object.entries(SP_LAB[narrow ? 'narrow' : 'wide'][st.s])) {
        const q = st.pts.find(t => t.p.y === +yr);
        if (lead) line(ctx, q.x + Math.sign(dx) * 3, q.y + Math.sign(dy) * 2, q.x + dx - Math.sign(dx) * 2, q.y + dy - 4, alpha(col, 0.55), 1);
        text(ctx, yr, q.x + dx, q.y + dy, { size: 10.5, weight: 650, color: col, align, halo: true });
      }
      if (st.hover) {
        const q = st.pts.find(t => t.p.y === st.hover);
        circle(ctx, q.x, q.y, 6, 'rgba(0,0,0,0)', C.price, 2);
      }
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const pct = v => (v < 0 ? '−' : '+') + Math.abs(Math.round(v * 100)) + '%';
  const upd = () => {
    const a = at(1951), b = at(1969), c = at(2007), d = at(2025), p = st.hover && at(st.hover), p5 = p && at(p.y - 5);
    const g = (Math.pow(b.i / a.i, 1 / (b.y - a.y)) - 1) * 100;
    ro.innerHTML = p
      ? `<b>${p.y}</b>: sales <b>${p.i.toFixed(1)}×</b> 1951${p5 ? `, <b>${pct(p.i / p5.i - 1)}</b> on ${p5.y}` : ''}${p.rough ? ' (a rougher estimate)' : ''}. A household kWh cost <b>${p.price.toFixed(1)}¢</b> in 2025 dollars, <b>${p.wires.toFixed(1)}¢</b> of it for the wires.`
      : `From ${a.y} to ${b.y} sales grew <b>${b.i.toFixed(1)}×</b>, ${g.toFixed(1)}% a year, and ${st.s === 'price' ? 'the price' : 'the wires part'} fell from ${a[st.s].toFixed(1)}¢ to <b>${b[st.s].toFixed(1)}¢</b>. From ${c.y} to ${d.y} sales ${Math.abs(d.i / c.i - 1) < 0.03 ? `stayed at about ${d.i.toFixed(0)}×` : `went from ${c.i.toFixed(1)}× to ${d.i.toFixed(1)}×`}, while the price went from ${c.price.toFixed(1)}¢ to ${st.s === 'price' ? '<b>' : ''}${d.price.toFixed(1)}¢${st.s === 'price' ? '</b>' : ''} and the wires from ${c.wires.toFixed(1)}¢ to ${st.s === 'wires' ? '<b>' : ''}${d.wires.toFixed(1)}¢${st.s === 'wires' ? '</b>' : ''}.`;
    fig.invalidate();
  };
  const near = r => (x, y) => { let best = null, bd = r * r; for (const q of st.pts) { const dd = (q.x - x) ** 2 + (q.y - y) ** 2; if (dd < bd) { bd = dd; best = q.p.y; } } return best; };
  fig.interact({
    hit: near(16), touchHit: near(10), cursor: 'crosshair',
    hover: o => { if (o !== st.hover) { st.hover = o; upd(); } },
    down: o => { st.hover = o; upd(); },
  });
  segmented(ctl, { label: 'Show', value: st.s, name: 'show', options: [{ label: 'Whole price', value: 'price', name: 'price' }, { label: 'Wires only', value: 'wires', name: 'wires' }], onchange: v => { st.s = v; upd(); } });
  upd();
}

export const FIGS = { kardashev, billSplit, salesPrice };
