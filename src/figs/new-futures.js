// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, circle, line, pathLine, scale } from '../lib/draw.js';
import { controls, slider, readout, segmented } from '../lib/ui.js';
import { ENERGY } from '../lib/energydata.js';
import { USBILL } from '../lib/usbilldata.js';
import { DATA } from '../lib/data.js';
import { USD_PER_EUR } from '../lib/currency.js';

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

// What a household kilowatt-hour pays for, over time: the US from utilities' FERC Form 1 accounts, 1991 on (2025 dollars),
// Germany from BDEW's price components (each year's euro cents at that year's ECB rate).
const SPLIT = {
  us: {
    name: 'United States', years: USBILL.map(r => r.y), unit: '¢ per kWh, 2025 dollars',
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
    name: 'Germany', years: DATA.bdew.map(r => r[0]), unit: '¢ per kWh at each year’s exchange rate',
    layers: [
      { k: 'energy', lab: 'energy and sales', col: C.procurement, v: r => r[1] * USD_PER_EUR[r[0]] },
      { k: 'wires', lab: 'network', col: C.network, v: r => r[2] * USD_PER_EUR[r[0]] },
      { k: 'taxes', lab: 'taxes and levies', col: C.taxes, v: r => r[3] * USD_PER_EUR[r[0]] },
    ],
    rows: DATA.bdew,
  },
};
export function billSplit(el) {
  const st = { c: 'us' };
  const fig = new Fig(el, {
    label: 'What a household kilowatt-hour pays for, by year: in the United States 1991 to 2025 fuel, bought power and plants together fell while wires doubled; in Germany 2015 to 2026 energy, network and taxes and levies',
    height: w => w < 600 ? 470 : 380,
    draw(ctx, w, h) {
      const S = SPLIT[st.c], narrow = w < 600;
      const ys = S.years, y0 = ys[0], y1 = ys[ys.length - 1];
      const labW = narrow ? 12 : 196;
      const box = { l: narrow ? 34 : 44, r: w - labW, t: 30, b: narrow ? h - 30 - 18 * S.layers.length - 14 : h - 30 };
      const tops = S.rows.map(r => S.layers.reduce((s, L) => s + L.v(r), 0));
      const ymax = Math.ceil(Math.max(...tops) / 10) * 10;
      const sx = scale(y0, y1, box.l, box.r), sy = scale(0, ymax, box.b, box.t);
      for (let v = 0; v <= ymax; v += 10) { const y = Math.round(sy(v)) + 0.5; line(ctx, box.l, y, box.r, y, v ? C.grid : C.grid2, 1); text(ctx, v + '¢', box.l - 6, y + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      const step = y1 - y0 > 15 ? (narrow ? 10 : 5) : (narrow ? 4 : 2);
      const t0 = y1 - y0 > 15 ? Math.ceil(y0 / step) * step : y0;
      if (t0 - y0 >= 3) text(ctx, y0, sx(y0), box.b + 15, { size: 10.5, color: C.ink3, align: 'center' });
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
      const chg = e => { const ch = e.b / e.a - 1; return Math.abs(ch) < 0.05 ? 'about the same' : (ch > 0 ? '+' : '−') + Math.round(Math.abs(ch) * 100) + '%'; };
      if (narrow) { // legend under the chart, top layer first
        ends.slice().reverse().forEach((e, i) => { const y = box.b + 34 + i * 18;
          ctx.fillStyle = alpha(e.L.col, 0.85); ctx.fillRect(box.l, y - 9, 10, 10);
          text(ctx, e.L.lab, box.l + 16, y, { size: 10.5, weight: 650, color: C.ink2 });
          text(ctx, `${e.a.toFixed(1)} → ${e.b.toFixed(1)}¢ · ${chg(e)}`, w - 10, y, { size: 10.5, color: C.ink3, align: 'right' }); });
        return;
      }
      // end labels, pushed apart
      ends.sort((p, q) => p.y - q.y);
      const gap = narrow ? 24 : 26;
      for (let i = 1; i < ends.length; i++) if (ends[i].y < ends[i - 1].y + gap) ends[i].y = ends[i - 1].y + gap;
      const over = ends[ends.length - 1].y - (box.b - 4); if (over > 0) ends.forEach(e => e.y -= over);
      const lx = box.r + 10;
      for (const e of ends) {
        const chs = chg(e);
        text(ctx, e.L.lab, lx, e.y - 2, { size: narrow ? 10.5 : 11.5, weight: 650, color: e.L.col === C.taxes || e.L.col === '#bdb7aa' ? C.ink2 : e.L.col });
        text(ctx, `${e.a.toFixed(1)} → ${e.b.toFixed(1)}¢ · ${chs}`, lx, e.y + 12, { size: 10.5, color: C.ink3 });
      }
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => {
    const S = SPLIT[st.c], r0 = S.rows[0], r1 = S.rows[S.rows.length - 1], y0 = S.years[0], y1 = S.years[S.years.length - 1];
    const tot = r => S.layers.reduce((s, L) => s + L.v(r), 0);
    const L = k => S.layers.find(l => l.k === k);
    ro.innerHTML = st.c === 'us'
      ? `From ${y0} to ${y1} the average American household paid <b>${tot(r0).toFixed(1)}¢</b>, then <b>${tot(r1).toFixed(1)}¢</b> a kWh in 2025 dollars. Making the power (fuel, bought power and plants) fell from ${(L('energy').v(r0) + L('gen').v(r0)).toFixed(1)}¢ to ${(L('energy').v(r1) + L('gen').v(r1)).toFixed(1)}¢; wires rose from ${L('wires').v(r0).toFixed(1)}¢ to <b>${L('wires').v(r1).toFixed(1)}¢</b>.`
      : `In ${y1} a German household paid <b>${tot(r1).toFixed(1)}¢</b> a kWh: ${L('energy').v(r1).toFixed(1)}¢ for energy and sales, ${L('wires').v(r1).toFixed(1)}¢ for the network and <b>${L('taxes').v(r1).toFixed(1)}¢</b> in taxes and levies.`;
    fig.invalidate();
  };
  segmented(ctl, { label: 'Country', value: st.c, name: 'country', options: [{ label: 'United States', value: 'us', name: 'us' }, { label: 'Germany', value: 'de', name: 'de' }], onchange: v => { st.c = v; upd(); } });
  upd();
}

export const FIGS = { kardashev, billSplit };
