// Synthetic fuels post, part 2: the economics.
//  lcoh        — levelised cost of hydrogen from power price, full-load hours, capex and efficiency — model (IEA/DOE inputs)
//  cheapHours  — running only the cheapest hours of 2025 (SMARD day-ahead prices): capital vs electricity — real + model
//  productCost — e-hydrogen, e-ammonia and e-kerosene against their fossil equivalents — model (IEA/IATA inputs)
//  futures     — LCOH map over power price and full-load hours, with $10/$20/$40 scenarios — model
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import * as D0 from '../lib/draw.js';
import { rrect, line, circle, clamp, lerp, pathLine, scale } from '../lib/draw.js';
import { curDraw, euroFigure, eur } from '../lib/currency.js';
const { text, measure, axes } = curDraw(D0);
import { controls, slider, segmented, readout, hint, more } from '../lib/ui.js';
import { FUEL } from '../lib/fueldata.js';
import { ELEC, H2C, FUELC, CO2C, HEATC, H2_KWH } from './sf1.js';

export const EUR = 1 / 1.13; // € per US$ at the ECB 2025 average (US$1.13/€), as everywhere else in the series
const CAPC = '#6a7db0', OPXC = '#a49d90', GREY = '#8d897f', FOSS = '#55524d';
export const crf = (r, n) => r / (1 - Math.pow(1 + r, -n));
// IEA GHR 2025 annex: installed capex USD 2,000–2,600/kW (outside China), 3% opex, stack life 50,000 h; DOE: ~55 kWh/kg system
export function lcoh(o) {
  const { price, hours, capex, kwh, wacc = 0.08, life = 20, opex = 0.03, stackShare = 0.15, stackLife = 50000 } = o;
  const cap = capex * crf(wacc, life) * kwh / hours, om = capex * opex * kwh / hours, stack = capex * stackShare * kwh / stackLife, power = price * kwh / 1000;
  return { cap, om, stack, power, tot: cap + om + stack + power };
}
// grey hydrogen: IEA SMR 76% LHV, USD 720/kW_H2, 4.7% opex, 95% availability, 25 years; 0.202 t CO2/MWh gas
export function greyH2(gas, co2) {
  const g = 33.33 / 0.76, capex = 720 * EUR, ann = capex * (crf(0.08, 25) + 0.047) / (8760 * 0.95) * 33.33;
  return { fuel: gas * g / 1000, cap: ann, carbon: co2 * 0.202 * g / 1000, tot: gas * g / 1000 + ann + co2 * 0.202 * g / 1000 };
}

/* ---------------- lcohExplorer (with productCost merged in) ---------------- */
// One explorer for hydrogen and what is made from it. Hydrogen: cost breakdown and cost against full-load hours.
// Ammonia and e-kerosene: the same electrolyser feeds the synthesis; each is set against its fossil equivalent.
const PRODS = {
  h2: { name: 'Hydrogen', unit: '€/kg', per: 'kg', dp: 2, ymax: 14, ticks: [0, 2, 4, 6, 8, 10, 12, 14], f: v => '€' + v },
  nh3: { name: 'Ammonia', unit: '€/t', per: 'tonne', dp: 0, ymax: 3500, ticks: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500], f: v => '€' + v.toLocaleString('en') },
  ker: { name: 'e-Kerosene', unit: '€/L', per: 'litre', dp: 2, ymax: 7, ticks: [0, 1, 2, 3, 4, 5, 6, 7], f: v => '€' + v },
};
export function lcohExplorer(el) {
  const st = { price: 50, hours: 4000, capex: 2100, kwh: H2_KWH, prod: 'h2', gas: 35, co2p: 75, src: 'bio' };
  el.__sim = { st };
  const parts = (q) => {
    if (st.prod === 'h2') { const r = lcoh({ ...st, hours: q }); return { segs: [['electricity', r.power, ELEC], ['electrolyser capital', r.cap, CAPC], ['fixed O&M', r.om, OPXC], ['stack replacement', r.stack, lighten(CAPC, 0.4)]], tot: r.tot }; }
    const E = eProducts({ ...st, hours: q })[st.prod];
    return { segs: [['hydrogen', E.h2, H2C], ['other electricity', E.el, ELEC], ['CO₂ supply', E.co2, CO2C], ['synthesis plant', E.cap, CAPC]].filter(x => x[1] > 1e-9), tot: sum(E) };
  };
  const fossilTot = () => sum(fossil(st)[st.prod]);
  const fossilName = () => ({ h2: 'grey hydrogen from gas', nh3: 'ammonia from gas', ker: 'fossil jet fuel' })[st.prod];
  const fig = new Fig(el, {
    label: 'Cost of electric hydrogen, ammonia or e-kerosene: a cost breakdown and the cost against full-load hours, compared with the fossil version, for the chosen power price, electrolyser cost and carbon price',
    height: w => w < 600 ? 470 : 320,
    draw(ctx, w, h) {
      const narrow = w < 600, P = PRODS[st.prod], r = parts(st.hours), g = fossilTot(), ymax = P.ymax;
      const B = narrow ? { l: 54, r: w - 16, t: 34, b: 120 } : { l: 70, r: 200, t: 40, b: h - 44 };
      const A = narrow ? { l: 46, r: w - 16, t: 190, b: h - 40 } : { l: 340, r: w - 24, t: 40, b: h - 44 };
      const ev = v => eur(v, P.dp);
      if (!narrow) {
        const { sy } = axes(ctx, { box: B, x0: 0, x1: 1, y0: 0, y1: ymax, xticks: [], yticks: P.ticks, yfmt: P.f, ylabel: `€ per ${P.per} of ${P.name.toLowerCase()}` });
        let y = 0; const bx = B.l + 20, bw = 56;
        r.segs.forEach(([s, v, c]) => { const y0 = sy(Math.min(ymax, y)), y1 = sy(Math.min(ymax, y + v)); ctx.fillStyle = alpha(c, 0.85); ctx.fillRect(bx, y1, bw, y0 - y1); if (y0 - y1 > 13) text(ctx, `${s} ${ev(v)}`, bx + bw + 8, (y0 + y1) / 2 + 4, { size: 10, color: C.ink2, halo: true }); y += v; });
        text(ctx, `dashed: ${fossilName()} ${ev(g)}`, bx - 6, B.b + 16, { size: 10, color: FOSS });
        text(ctx, `${ev(r.tot)}${P.unit.slice(1)}`, bx + bw / 2, Math.max(B.t + 16, sy(Math.min(ymax, r.tot)) - 8), { size: 12, weight: 700, color: C.ink, align: 'center', halo: true });
        line(ctx, bx - 6, sy(Math.min(ymax, g)), bx + bw + 6, sy(Math.min(ymax, g)), FOSS, 1.4, [4, 3]);
      } else {
        const xs = scale(0, ymax, B.l, B.r);
        text(ctx, `€ per ${P.per} of ${P.name.toLowerCase()}`, B.l, B.t - 14, { size: 11, weight: 500, color: C.ink3 });
        let x = 0; const by = B.t, bh = 30;
        r.segs.forEach(([s, v, c]) => { ctx.fillStyle = alpha(c, 0.85); ctx.fillRect(xs(x), by, xs(Math.min(ymax, x + v)) - xs(x), bh); x += v; });
        text(ctx, ev(r.tot), Math.min(xs(Math.min(ymax, r.tot)) + 6, B.r - 40), by + 20, { size: 12, weight: 700, color: C.ink, halo: true });
        line(ctx, xs(Math.min(ymax, g)), by - 4, xs(Math.min(ymax, g)), by + bh + 4, FOSS, 1.5, [3, 2]);
        let lx = B.l, ly = by + bh + 20;
        r.segs.forEach(([s, v, c]) => { const t = `${s} ${eur(v, P.dp ? 1 : 0)}`, W = measure(ctx, t, 10) + 24; if (lx + W > B.r) { lx = B.l; ly += 15; } ctx.fillStyle = alpha(c, 0.85); ctx.fillRect(lx, ly - 8, 9, 9); text(ctx, t, lx + 12, ly, { size: 10, color: C.ink2 }); lx += W; });
        text(ctx, `dashed: ${fossilName()} ≈ ${ev(g)}`, B.l, ly + 16, { size: 10, color: FOSS });
      }
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 8760, y0: 0, y1: ymax, xticks: narrow ? [0, 2000, 4000, 6000, 8000] : [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000], xfmt: v => v ? (v / 1000) + 'k' : '0', yticks: P.ticks, yfmt: P.f, ylabel: narrow ? `${P.unit} against full-load hours` : 'cost against the electrolyser’s full-load hours a year', xlabel: 'full-load hours' });
      const pts = [], ptsE = [];
      for (let H = 500; H <= 8760; H += 40) { const q = parts(H); if (q.tot <= ymax) pts.push([sx(H), sy(q.tot)]); ptsE.push([sx(H), sy(Math.min(ymax, q.segs[0][1] * (st.prod === 'h2' ? 1 : 1)))]); }
      if (st.prod === 'h2') { ctx.fillStyle = alpha(ELEC, 0.18); ctx.beginPath(); ctx.moveTo(sx(500), sy(0)); ptsE.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(sx(8760), sy(0)); ctx.closePath(); ctx.fill(); text(ctx, 'electricity', sx(7600), sy(r.segs[0][1] / 2) + 4, { size: 10, color: darken(ELEC, 0.3), align: 'center', halo: true }); }
      pathLine(ctx, pts, C.ink, 2.2);
      const fl = st.prod === 'h2' ? `grey hydrogen (gas €${st.gas}/MWh, CO₂ €${st.co2p}/t)` : st.prod === 'nh3' ? `ammonia from gas (gas €${st.gas}/MWh, CO₂ €${st.co2p}/t)` : `fossil jet fuel at $86/bbl, CO₂ €${st.co2p}/t`;
      line(ctx, A.l, sy(Math.min(ymax, g)), A.r, sy(Math.min(ymax, g)), FOSS, 1.2, [4, 3]); text(ctx, fl, A.r - 4, sy(Math.min(ymax, g)) - 5, { size: 10, color: FOSS, align: 'right', halo: true });
      circle(ctx, sx(st.hours), sy(Math.min(ymax, r.tot)), 6, H2C, '#fff', 2);
    },
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Product', options: Object.entries(PRODS).map(([k, p]) => ({ label: p.name, value: k, name: 'pr-' + k })), value: st.prod, onchange: v => { st.prod = v; upd(); } });
  slider(ctl, { label: 'Power price', min: 0, max: 150, step: 1, value: st.price, color: ELEC, fmt: v => `€${v}/MWh`, oninput: v => { st.price = v; upd(); }, name: 'price' });
  slider(ctl, { label: 'Full-load hours a year', min: 1000, max: 8700, step: 100, value: st.hours, color: H2C, fmt: v => `${v.toLocaleString('en')} h (${Math.round(v / 87.6)}%)`, oninput: v => { st.hours = v; upd(); }, name: 'hours' });
  slider(ctl, { label: 'Installed electrolyser cost', min: 500, max: 3000, step: 50, value: st.capex, color: CAPC, fmt: v => `€${v.toLocaleString('en')}/kW`, oninput: v => { st.capex = v; upd(); }, name: 'capex' });
  slider(ctl, { label: 'Carbon price', min: 0, max: 500, step: 5, value: st.co2p, color: HEATC, fmt: v => `€${v}/t CO₂`, oninput: v => { st.co2p = v; upd(); }, name: 'co2p' });
  const mo = more(ctl, 'More: efficiency, gas price, CO₂ source');
  slider(mo, { label: 'Electricity use', min: 45, max: 60, step: 0.5, value: st.kwh, color: H2C, fmt: v => `${v} kWh/kg`, oninput: v => { st.kwh = v; upd(); }, name: 'kwh' });
  slider(mo, { label: 'Gas price', min: 10, max: 120, step: 1, value: st.gas, color: FOSS, fmt: v => `€${v}/MWh`, oninput: v => { st.gas = v; upd(); }, name: 'gas' });
  segmented(mo, { label: 'CO₂ for kerosene from', options: [{ label: 'Biogenic, €50/t', value: 'bio', name: 'c-bio' }, { label: 'Air today, €600/t', value: 'dac', name: 'c-dac' }, { label: 'Air at scale, €250/t', value: 'dacf', name: 'c-dacf' }], value: st.src, onchange: v => { st.src = v; upd(); } });
  function upd() {
    const P = PRODS[st.prod], r = parts(st.hours), g = fossilTot(), F = fossil(st), E = eProducts(st);
    const be = k => { const f0 = sum(F[k]) - F[k].carbon, per = ({ h2: 0.202 * 33.33 / 0.76 / 1000, nh3: 1.8, ker: 2.53e-3 })[k]; return (sum(E[k]) - f0) / per; };
    const bv = be(st.prod), bes = bv <= st.co2p ? 'already pays at this carbon price' : `breaks even at a carbon price of about ${eur(bv, -1)}/t`;
    const fm = v => eur(v, P.dp);
    if (st.prod === 'h2') {
      const lh = lcoh(st), share = lh.power / lh.tot;
      ro.innerHTML = `Hydrogen costs <b>${eur(lh.tot, 2)} per kg</b>: ${Math.round(share * 100)}% electricity, ${Math.round((lh.cap + lh.stack) / lh.tot * 100)}% equipment. A power price 10% higher adds ${eur(0.1 * st.price * st.kwh / 1000, 2)}/kg; halving the hours from ${st.hours.toLocaleString('en')} adds ${eur(lcoh({ ...st, hours: st.hours / 2 }).tot - lh.tot, 2)}. Grey hydrogen from gas costs about ${eur(g, 2)}; electric hydrogen ${bes}.`;
    } else {
      ro.innerHTML = `${P.name} from this electrolyser costs <b>${fm(r.tot)} per ${P.per}</b> against ${fm(g)} for ${fossilName()}, ${(r.tot / g).toFixed(1)} times as much; it ${bes}. ${st.prod === 'ker' ? `Each $10/MWh off the power price takes about ${eur(sum(E.ker) - sum(eProducts({ ...st, price: st.price - 10 * EUR }).ker), 2)} off a litre.` : `Hydrogen is ${Math.round(E.nh3.h2 / r.tot * 100)}% of its cost.`}`;
    }
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-lcohexplorer');
}

/* ---------------- cheapHours ---------------- */
export function cheapHours(el) {
  const SYS = { de: { label: 'Germany 2025', name: 'ch-de', p: FUEL.prices, adj: 'German day-ahead prices in 2025', yr: '2025 in Germany' },
    es: { label: 'Spain 2023', name: 'ch-es', p: FUEL.presets.es.prices, adj: 'Spanish day-ahead prices in 2023', yr: '2023 in Spain' },
    sa: { label: 'South Australia 2025', name: 'ch-sa', p: FUEL.presets.sa.prices, adj: 'South Australian spot prices in 2025', yr: '2025 in South Australia' } };
  let sorted, pre, n20, zn;
  const setSys = k => { sorted = [...SYS[k].p].sort((a, b) => a - b); pre = [0]; sorted.forEach(v => pre.push(pre[pre.length - 1] + v)); n20 = sorted.filter(v => v <= 20).length; zn = sorted.filter(v => v <= 0).length;
    // the German series is stored rounded to whole euros; take the hour counts from the unrounded SMARD data
    if (k === 'de') { n20 = FUEL.le20; zn = FUEL.zeroOrNeg; } };
  const avg = n => pre[n] / n;
  const st = { hours: 3000, capex: 2100, sys: 'de' };
  setSys('de');
  const curve = () => { const out = []; for (let H = 200; H <= 8760; H += 20) { const q = lcoh({ price: avg(H), hours: H, capex: st.capex, kwh: H2_KWH }); out.push([H, q]); } return out; };
  const fig = new Fig(el, {
    label: 'Cost of hydrogen when an electrolyser runs only in the cheapest hours of a year in Germany, Spain or South Australia: capital cost falls and electricity cost rises with more hours',
    height: w => w < 600 ? 520 : 400,
    draw(ctx, w, h) {
      const narrow = w < 600, cv = curve();
      const A = { l: narrow ? 46 : 64, r: w - (narrow ? 16 : 24), t: 40, b: narrow ? 300 : 230 };
      const P = { l: A.l, r: A.r, t: A.b + 54, b: h - 34 };
      const ymax = 24; // high enough to show the cost of running only the zero-price hours
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 8760, y0: 0, y1: ymax, xticks: narrow ? [0, 2000, 4000, 6000, 8000] : [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000], xfmt: v => v ? (v / 1000) + 'k h' : '0', yticks: [0, 6, 12, 18, 24], yfmt: v => '€' + v, ylabel: '€ per kg of hydrogen, running the cheapest hours first' });
      const best = cv.reduce((a, b) => b[1].tot < a[1].tot ? b : a);
      ctx.fillStyle = alpha(ELEC, 0.2); ctx.beginPath(); ctx.moveTo(sx(200), sy(0)); cv.forEach(([H, q]) => ctx.lineTo(sx(H), sy(clamp(q.power, -2, ymax)))); ctx.lineTo(sx(8760), sy(0)); ctx.closePath(); ctx.fill();
      pathLine(ctx, cv.filter(([H, q]) => q.cap + q.om + q.stack <= ymax).map(([H, q]) => [sx(H), sy(q.cap + q.om + q.stack)]), CAPC, 1.6, [5, 3]);
      pathLine(ctx, cv.filter(([H, q]) => q.tot <= ymax).map(([H, q]) => [sx(H), sy(q.tot)]), C.ink, 2.4);
      { const e = cv.find(([H, q]) => q.cap + q.om + q.stack <= ymax * 0.6) || cv[0], ev = e[1].cap + e[1].om + e[1].stack; text(ctx, 'equipment', sx(e[0]) + 7, sy(ev) - 6, { size: 10, color: CAPC, align: 'left', halo: true }); }
      // inside the electricity band, below the dashed equipment line
      { const H = 7800, q = lcoh({ price: avg(H), hours: H, capex: st.capex, kwh: H2_KWH }), eq = q.cap + q.om + q.stack; text(ctx, 'electricity', sx(H), Math.min(sy(0) - 4, (sy(Math.min(eq, q.power)) + sy(0)) / 2 + 4), { size: 10, color: darken(ELEC, 0.3), align: 'center', halo: true }); }
      line(ctx, sx(best[0]), sy(0), sx(best[0]), sy(best[1].tot), alpha(C.ink, 0.4), 1, [3, 3]);
      text(ctx, `cheapest: ${best[0].toLocaleString('en')} h, ${eur(best[1].tot, 2)}/kg`, sx(best[0]), sy(best[1].tot) + 18, { size: 10.5, weight: 650, color: C.ink, align: 'center', halo: true });
      const q = lcoh({ price: avg(st.hours), hours: st.hours, capex: st.capex, kwh: H2_KWH });
      circle(ctx, sx(st.hours), sy(Math.min(ymax, q.tot)), 6, H2C, '#fff', 2);
      // price duration
      const pmin = st.sys === 'sa' ? -150 : -100, pmax = 250;
      const ax2 = axes(ctx, { box: P, x0: 0, x1: 8760, y0: pmin, y1: pmax, xticks: narrow ? [0, 2000, 4000, 6000, 8000] : [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000], xfmt: v => v ? (v / 1000) + 'k h' : '0', yticks: st.sys === 'sa' ? [-100, 0, 100, 200] : [-100, 0, 100, 200], yfmt: v => '€' + v, ylabel: `${SYS[st.sys].adj}, cheapest first (€/MWh)`, xlabel: 'hours of the year' });
      ctx.fillStyle = alpha(H2C, 0.12); ctx.fillRect(P.l, P.t, ax2.sx(st.hours) - P.l, P.b - P.t);
      const pp = []; for (let i = 0; i < 8760; i += 8) pp.push([ax2.sx(i), ax2.sy(clamp(sorted[i], pmin, pmax))]);
      pathLine(ctx, pp, C.price, 2);
      if (st.sys !== 'sa') line(ctx, P.l, ax2.sy(20), P.r, ax2.sy(20), HEATC, 1, [4, 3]);
      // above the dashed line at the right, where prices are well above it
      if (st.sys !== 'sa') text(ctx, narrow ? '€20/MWh: EU renewable limit' : `€20/MWh: ${n20.toLocaleString('en')} hours count as renewable under EU rules`, P.r - 4, ax2.sy(20) - 4, { size: 10, color: HEATC, align: 'right', halo: true });
      { const t = `${st.hours.toLocaleString('en')} h, average ${eur(avg(st.hours), 0)}`, left = ax2.sx(st.hours) - 6 - measure(ctx, t, 10.5, 650) < P.l + 4; text(ctx, t, ax2.sx(st.hours) + (left ? 6 : -6), P.t + 12, { size: 10.5, weight: 650, color: darken(H2C, 0.2), align: left ? 'left' : 'right', halo: true }); }
    },
  });
  fig.interact({ hit: (x, y) => y < fig.h - 10 ? {} : null, cursor: 'ew-resize', down: (o, x) => drag(x), move: (o, x) => drag(x) });
  function drag(x) { const narrow = fig.w < 600, l = narrow ? 46 : 64, r = fig.w - (narrow ? 16 : 24); const H = Math.min(8700, Math.round(clamp((x - l) / (r - l) * 8760, 200, 8760) / 100) * 100); hs.set(H); st.hours = H; upd(); }
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Prices from', options: Object.entries(SYS).map(([k, v]) => ({ label: v.label, value: k, name: v.name })), value: 'de', onchange: v => { st.sys = v; setSys(v); upd(); } });
  const hs = slider(ctl, { label: 'Run the cheapest', min: 200, max: 8700, step: 100, value: st.hours, color: H2C, fmt: v => `${v.toLocaleString('en')} hours`, oninput: v => { st.hours = v; upd(); }, name: 'hours' });
  slider(more(ctl, 'More: electrolyser cost'), { label: 'Installed electrolyser cost', min: 300, max: 3000, step: 50, value: st.capex, color: CAPC, fmt: v => `€${v.toLocaleString('en')}/kW`, oninput: v => { st.capex = v; upd(); }, name: 'capex' });
  function upd() {
    const q = lcoh({ price: avg(st.hours), hours: st.hours, capex: st.capex, kwh: H2_KWH });
    const best = curve().reduce((a, b) => b[1].tot < a[1].tot ? b : a);
    ro.innerHTML = `Running the cheapest <b>${st.hours.toLocaleString('en')}</b> hours of ${SYS[st.sys].yr}, the electricity averaged <b>${eur(avg(st.hours), 0)}/MWh</b> and hydrogen costs <b>${eur(q.tot, 2)}/kg</b>. At ${eur(st.capex, -1)}/kW the best compromise is about ${best[0].toLocaleString('en')} hours (${eur(best[1].tot, 2)}/kg). ${st.sys === 'sa' ? `${zn.toLocaleString('en')} hours had zero or negative prices — South Australia’s midday solar glut — yet an electrolyser running only then would still run less than a third of the year.` : `Only ${zn.toLocaleString('en')} hours had zero or negative prices: an electrolyser that ran only then would pay for its equipment over very few kilograms.`}`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-cheaphours');
  hint(el, 'drag the running hours down to 1,000 and see the hydrogen cost climb despite cheaper power.');
}

/* ---------------- productCost ---------------- */
const CO2COST = { bio: 50, dac: 600, dacf: 250 };
export function eProducts(o) {
  const h = lcoh({ price: o.price, hours: o.hours, capex: o.capex ?? 2100, kwh: o.kwh ?? 55 }), co2c = CO2COST[o.src];
  const ann = crf(0.08, 25);
  const nh3 = { h2: 0.18 * 1000 * h.tot, el: 0.6 * o.price, cap: 770 * EUR * (ann + 0.029), co2: 0 };
  const kerT = { h2: 0.55 * 1000 * h.tot, el: 3.0 * o.price, cap: 2000 * (ann + 0.04), co2: 3.2 * co2c };
  const ker = Object.fromEntries(Object.entries(kerT).map(([k, v]) => [k, v * 0.8 / 1000]));
  return { h2: { h2: h.tot, el: 0, cap: 0, co2: 0 }, nh3, ker, lcoh: h };
}
export function fossil(o) {
  const g = greyH2(o.gas, o.co2p), ann = crf(0.08, 25);
  return {
    h2: { fuel: g.fuel, cap: g.cap, carbon: g.carbon },
    nh3: { fuel: 8.89 * o.gas + 0.1 * o.price, cap: 1900 * EUR * (ann + 0.029), carbon: 1.80 * o.co2p },
    ker: { fuel: 86 * EUR / 159, cap: 0, carbon: 2.53e-3 * o.co2p },
  };
}
const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
export function productCost(el) {
  const st = { price: 50, hours: 4000, src: 'bio', gas: 35, co2p: 75 };
  const PR = [['h2', 'Hydrogen', '€/kg', 2], ['nh3', 'Ammonia', '€/t', 0], ['ker', 'Kerosene', '€/L', 2]];
  const fig = new Fig(el, {
    label: 'Cost of electricity-based hydrogen, ammonia and kerosene compared with the fossil versions, for chosen power, gas and carbon prices',
    height: w => w < 600 ? 470 : 300,
    draw(ctx, w, h) {
      const narrow = w < 600, E = eProducts(st), F = fossil(st);
      const panels = PR.map((p, i) => narrow ? { l: 92, r: w - 20, t: 30 + i * 140, b: 30 + i * 140 + 92 } : { l: 24 + i * (w - 24) / 3 + 56, r: 24 + (i + 1) * (w - 24) / 3 - 18, t: 50, b: h - 50 });
      PR.forEach(([k, name, unit, dp], i) => {
        const A = panels[i], e = E[k], f = F[k], te = sum(e), tf = sum(f), max = Math.max(te, tf) * 1.18;
        text(ctx, `${name}, ${unit}`, narrow ? 16 : A.l - 50, A.t - 16, { size: 12, weight: 650, color: C.ink });
        const bars = [['electric', [[e.h2, H2C], [e.el, ELEC], [e.co2, CO2C], [e.cap, CAPC]], te], ['fossil', [[f.fuel, FOSS], [f.cap, lighten(FOSS, 0.4)], [f.carbon, HEATC]], tf]];
        if (narrow) {
          const xs = scale(0, max, A.l, A.r), bh = 30;
          bars.forEach(([lab, segs, tot], j) => { const y = A.t + j * 44; text(ctx, lab, A.l - 8, y + bh / 2 + 4, { size: 10.5, color: C.ink2, align: 'right' }); let x = 0; segs.forEach(([v, c]) => { ctx.fillStyle = alpha(c, 0.85); ctx.fillRect(xs(x), y, xs(x + v) - xs(x), bh); x += v; }); text(ctx, tot.toFixed(dp), xs(tot) + 5, y + bh / 2 + 4, { size: 11, weight: 700, color: C.ink, halo: true }); });
        } else {
          const ys = scale(0, max, A.b, A.t), bw = Math.min(60, (A.r - A.l) * 0.32);
          line(ctx, A.l - 10, A.b + 0.5, A.r, A.b + 0.5, C.grid2, 1);
          bars.forEach(([lab, segs, tot], j) => { const x = A.l + j * (bw + 22); let y = 0; segs.forEach(([v, c]) => { ctx.fillStyle = alpha(c, 0.85); ctx.fillRect(x, ys(y + v), bw, ys(y) - ys(y + v)); y += v; }); text(ctx, tot.toFixed(dp), x + bw / 2, ys(tot) - 6, { size: 11.5, weight: 700, color: C.ink, align: 'center' }); text(ctx, lab, x + bw / 2, A.b + 15, { size: 10.5, color: C.ink2, align: 'center' }); });
          text(ctx, `${(te / tf).toFixed(1)}×`, A.l + 2 * (bw + 22) - 10, A.t + 14, { size: 12, weight: 700, color: te > tf ? HEATC : C.storage, align: 'left' });
        }
      });
      // legend
      let lx = 16, ly = narrow ? h - 22 : h - 14;
      const L = [['hydrogen', H2C], ['other electricity', ELEC], ['CO₂ supply', CO2C], ['plant', CAPC], ['fossil fuel', FOSS], ['fossil plant', lighten(FOSS, 0.4)], ['carbon price', HEATC]];
      L.forEach(([s, c]) => { const W = measure(ctx, s, 10) + 24; if (lx + W > w - 8) { lx = 16; ly += 14; } ctx.fillStyle = alpha(c, 0.85); ctx.fillRect(lx, ly - 8, 9, 9); text(ctx, s, lx + 12, ly, { size: 10, color: C.ink2 }); lx += W; });
    },
  });
  const ctl = controls(el), ro = readout(el);
  slider(ctl, { label: 'Power price', min: 0, max: 120, step: 1, value: st.price, color: ELEC, fmt: v => `€${v}/MWh`, oninput: v => { st.price = v; upd(); }, name: 'price' });
  slider(ctl, { label: 'Electrolyser full-load hours', min: 1000, max: 8700, step: 100, value: st.hours, color: H2C, fmt: v => `${v.toLocaleString('en')} h`, oninput: v => { st.hours = v; upd(); }, name: 'hours' });
  const pmo = more(ctl, 'More: gas price and CO₂ source');
  slider(pmo, { label: 'Gas price', min: 10, max: 120, step: 1, value: st.gas, color: FOSS, fmt: v => `€${v}/MWh`, oninput: v => { st.gas = v; upd(); }, name: 'gas' });
  slider(ctl, { label: 'Carbon price', min: 0, max: 500, step: 5, value: st.co2p, color: HEATC, fmt: v => `€${v}/t CO₂`, oninput: v => { st.co2p = v; upd(); }, name: 'co2p' });
  segmented(pmo, { label: 'CO₂ for kerosene from', options: [{ label: 'Biogenic, €50/t', value: 'bio', name: 'c-bio' }, { label: 'Air today, €600/t', value: 'dac', name: 'c-dac' }, { label: 'Air at scale, €250/t', value: 'dacf', name: 'c-dacf' }], value: st.src, onchange: v => { st.src = v; upd(); } });
  function upd() {
    const E = eProducts(st), F = fossil(st);
    const be = k => { const f0 = sum(F[k]) - F[k].carbon, per = F[k].carbon / Math.max(1e-9, st.co2p) || ({ h2: 0.202 * 33.33 / 0.76 / 1000, nh3: 1.8, ker: 2.53e-3 })[k]; return (sum(E[k]) - f0) / per; };
    const fmt = v => v <= 0 ? 'already cheaper' : `≈€${Math.round(v / 10) * 10}/t`;
    ro.innerHTML = `Electric hydrogen costs <b>€${sum(E.h2).toFixed(2)}/kg</b> against €${sum(F.h2).toFixed(2)} from gas; e-kerosene <b>€${sum(E.ker).toFixed(2)}/L</b> against €${sum(F.ker).toFixed(2)} for fossil jet fuel. The carbon price at which each breaks even: hydrogen ${fmt(be('h2'))}, ammonia ${fmt(be('nh3'))}, kerosene ${fmt(be('ker'))}.`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-productcost');
}

/* ---------------- futures ---------------- */
const SCEN = [
  { usd: 10, hours: 2500, n: '$10: solar only' },
  { usd: 20, hours: 5000, n: '$20: wind + solar hybrid' },
  { usd: 40, hours: 8000, n: '$40: firm supply' },
];
export function futures(el) {
  const st = { capex: 2100 };
  let img = null, imgKey = '';
  const fig = new Fig(el, {
    label: 'Map of the cost of hydrogen over power price and full-load hours, with contour lines and three scenarios at 10, 20 and 40 dollars per megawatt-hour',
    height: w => w < 600 ? 380 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 50 : 64, r: w - (narrow ? 16 : 150), t: 40, b: h - 44 };
      const pmax = 100;
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: pmax, y0: 1000, y1: 8760, xticks: [0, 20, 40, 60, 80, 100], yticks: [2000, 4000, 6000, 8000], xfmt: v => '€' + v, yfmt: v => (v / 1000) + 'k h', ylabel: 'full-load hours a year', xlabel: 'power price, €/MWh', grid: false });
      // heat map
      const nx = 60, ny = 40, cw = (A.r - A.l) / nx, ch = (A.b - A.t) / ny;
      const colAt = v => v < 2 ? mix('#2fa58a', '#9ccf8a', v / 2) : v < 4 ? mix('#9ccf8a', '#f2d16b', (v - 2) / 2) : v < 7 ? mix('#f2d16b', '#e58a4e', (v - 4) / 3) : mix('#e58a4e', '#b5434a', clamp((v - 7) / 6, 0, 1));
      for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
        const p = (i + 0.5) / nx * pmax, H = 8760 - (j + 0.5) / ny * (8760 - 1000);
        ctx.fillStyle = mix(C.paper, colAt(lcoh({ price: p, hours: H, capex: st.capex, kwh: H2_KWH }).tot), 0.75); ctx.fillRect(A.l + i * cw, A.t + j * ch, cw + 0.6, ch + 0.6);
      }
      // contours: for each level, solve hours for each price; labels avoid the scenario markers and each other
      const avoid = SCEN.map(s => { const x = sx(s.usd * EUR), y = sy(s.hours), wd = narrow ? 80 : 210; return [x - 9, y - 12, x + 12 + wd, y + 9]; });
      [2, 3, 4, 6, 8].forEach(L => {
        const pts = [];
        for (let p = 0; p <= pmax; p += 1) {
          const fixedPerH = lcoh({ price: 0, hours: 1, capex: st.capex, kwh: H2_KWH }), stack = fixedPerH.stack, perHour = fixedPerH.cap + fixedPerH.om;
          const rem = L - stack - p * 55 / 1000; if (rem <= 0) break;
          const H = perHour / rem; if (H > 8760) continue; if (H < 1000) { pts.push([sx(p), sy(1000)]); continue; }
          pts.push([sx(p), sy(H)]);
        }
        if (pts.length > 1) {
          pathLine(ctx, pts, alpha(C.ink, 0.6), 1.2);
          const hit = q => avoid.some(b => q[0] + 26 > b[0] && q[0] - 2 < b[2] && q[1] + 2 > b[1] && q[1] - 16 < b[3]) || q[0] + 30 > A.r || q[1] - 16 < A.t;
          let q = null; for (const f of [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.05]) { const c = pts[Math.min(pts.length - 1, Math.floor(pts.length * f))]; if (!hit(c)) { q = c; break; } }
          if (q) { text(ctx, `€${L}`, q[0] + 4, q[1] - 4, { size: 10.5, weight: 700, color: C.ink, halo: true }); avoid.push([q[0], q[1] - 16, q[0] + 26, q[1]]); }
        }
      });
      SCEN.forEach(s => {
        const p = s.usd * EUR, x = sx(p), y = sy(s.hours), v = lcoh({ price: p, hours: s.hours, capex: st.capex, kwh: H2_KWH }).tot;
        circle(ctx, x, y, 7, '#fff', C.ink, 2);
        text(ctx, narrow ? `$${s.usd}: €${v.toFixed(1)}` : `${s.n}: €${v.toFixed(2)}/kg`, x + 11, y + 4, { size: 10.5, weight: 650, color: C.ink, halo: true });
      });
      if (!narrow) {
        const lx = A.r + 22, ly = A.t + 10; text(ctx, '€ per kg H₂', lx, ly, { size: 10.5, weight: 650, color: C.ink2 });
        [1, 2, 3, 4, 5, 6, 8, 10, 12].forEach((v, i) => { ctx.fillStyle = alpha(colAt(v), 0.8); ctx.fillRect(lx, ly + 10 + i * 16, 18, 14); text(ctx, '€' + v, lx + 24, ly + 21 + i * 16, { size: 10, color: C.ink2 }); });
      }
    },
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Installed electrolyser cost', options: [{ label: 'Europe today, €2,100/kW', value: 2100, name: 'cx-now' }, { label: '2030 (assumed), €1,500/kW', value: 1500, name: 'cx-2030' }, { label: 'China today, €800/kW', value: 800, name: 'cx-cn' }, { label: 'At scale (assumed), €300/kW', value: 300, name: 'cx-doe' }], value: st.capex, onchange: v => { st.capex = v; upd(); } });
  function upd() {
    const r = SCEN.map(s => { const p = s.usd * EUR, e = eProducts({ price: p, hours: s.hours, capex: st.capex, src: 'dacf' }); return { s, h: e.lcoh.tot, k: sum(e.ker) }; });
    ro.innerHTML = r.map(o => `${o.s.n}: hydrogen <b>€${o.h.toFixed(2)}/kg</b>, e-kerosene €${o.k.toFixed(2)}/L`).join('; ') + ` (e-kerosene with CO₂ from air capture at €250/t). Fossil jet fuel at $86 a barrel is about €${(86 * EUR / 159).toFixed(2)}/L before carbon pricing.`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-futures');
}

/* ---------------- plant2035 ---------------- */
// "Your 2035 plant": drag an electrolysis plant around power price × full-load hours. Lines show where the
// electric product matches its fossil equivalent at a given carbon price (section 3–4 model: lcoh, eProducts, fossil;
// gas €35/MWh; e-kerosene uses CO₂ from air capture at scale, €250/t). Policy: EU carbon price €75/t (as section 4),
// US 45V credit up to $3/kg; the three $10/$20/$40 futures of the main essay as reference dots.
const E200 = 200 / 1.13, E500 = 500 / 1.13, E1000 = 1000 / 1.13; // $200, $500 and $1,000 a tonne at US$1.13/€
const PARITY = [0, 75, E200, E500, E1000];
export function plant2035(el) {
  const st = { price: 20 * EUR, hours: 5000, prod: 'h2', capex: 2100, credit: false };
  let geo = null, img = null, imgKey = '';
  const PRD = { h2: ['Hydrogen', '€/kg', 2], nh3: ['Ammonia', '€/t', 0], ker: ['e-Kerosene', '€/L', 2] };
  const PER = { h2: 0.202 * 33.33 / 0.76 / 1000, nh3: 1.8, ker: 2.53e-3 };
  const eCost = (k, p, H) => sum(eProducts({ price: p, hours: H, capex: st.capex, src: 'dacf' })[k]) - (st.credit && k === 'h2' ? 3 * EUR : 0);
  const fNo = (k, p) => { const F = fossil({ gas: 35, co2p: 0, price: p })[k]; return sum(F); };
  const beAt = (k, p, H) => (eCost(k, p, H) - fNo(k, p)) / PER[k]; // carbon price for parity, €/t CO₂
  const bandCol = v => v <= 0 ? '#2fa58a' : v <= 75 ? mix('#2fa58a', '#9ccf8a', v / 75) : v <= 200 ? mix('#9ccf8a', '#f2d16b', (v - 75) / 125) : v <= 500 ? mix('#f2d16b', '#e58a4e', (v - 200) / 300) : mix('#e58a4e', '#b5434a', clamp((v - 500) / 700, 0, 1));
  const fig = new Fig(el, {
    label: 'Drag an electrolysis plant across power price and full-load hours; lines show where its hydrogen, ammonia or e-kerosene would cost the same as the fossil version at a given carbon price',
    height: w => w < 600 ? 430 : 380,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 50 : 64, r: w - (narrow ? 14 : 170), t: 30, b: h - (narrow ? 70 : 44) }, pmax = 100, k = st.prod;
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: pmax, y0: 1000, y1: 8760, xticks: [0, 20, 40, 60, 80, 100], yticks: [2000, 4000, 6000, 8000], xfmt: v => '€' + v, yfmt: v => (v / 1000) + 'k h', ylabel: 'full-load hours a year', xlabel: 'power price, €/MWh', grid: false });
      // tint by the carbon price needed for parity (cached offscreen)
      const key = [k, st.capex, st.credit, A.r - A.l, A.b - A.t].join();
      if (key !== imgKey) {
        const nx = 70, ny = 44; img = document.createElement('canvas'); img.width = nx; img.height = ny; const g = img.getContext('2d');
        for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) { const p = (i + 0.5) / nx * pmax, H = 8760 - (j + 0.5) / ny * 7760; g.fillStyle = mix(C.paper, bandCol(beAt(k, p, H)), 0.55); g.fillRect(i, j, 1, 1); }
        imgKey = key;
      }
      ctx.imageSmoothingEnabled = true; ctx.drawImage(img, A.l, A.t, A.r - A.l, A.b - A.t);
      // parity lines: for each carbon price, the hours at which e-cost = fossil cost, by bisection
      const lines = [];
      PARITY.forEach(X => {
        const pts = [];
        for (let p = 0; p <= pmax; p += 1) {
          if (beAt(k, p, 8760) > X) break;
          let lo = 1000, hi = 8760; if (beAt(k, p, lo) <= X) { pts.push([sx(p), sy(1000)]); continue; }
          for (let it = 0; it < 30; it++) { const m = (lo + hi) / 2; if (beAt(k, p, m) > X) lo = m; else hi = m; }
          pts.push([sx(p), sy(hi)]);
        }
        if (pts.length > 1) {
          pathLine(ctx, pts, alpha(C.ink, X === 0 ? 0.85 : 0.5), X === 0 ? 1.8 : 1.1, X === 75 ? [4, 3] : null);
          lines.push([X, pts]);
        }
      });
      // labels at the right-hand end of each line, kept apart: each label goes beside its own line near a preferred
      // height, inside the plot and clear of every line, the other labels and the three future dots
      const dense = []; lines.forEach(([, P]) => P.forEach((p, i) => { if (!i) return dense.push(p); const o = P[i - 1], n = Math.ceil(Math.hypot(p[0] - o[0], p[1] - o[1]) / 2); for (let t = 1; t <= n; t++) dense.push([lerp(o[0], p[0], t / n), lerp(o[1], p[1], t / n)]); }));
      const taken = SCEN.map(s => { const x = sx(s.usd * EUR), y = sy(s.hours); return [x - 5, y - 14, x + 8 + measure(ctx, '$' + s.usd, 9.5), y + 5]; });
      const clash = r => dense.some(([x, y]) => x > r[0] - 2 && x < r[2] + 2 && y > r[1] - 2 && y < r[3] + 2) || taken.some(t => t[0] < r[2] + 3 && r[0] < t[2] + 3 && t[1] < r[3] + 3 && r[1] < t[3] + 3);
      lines.forEach(([X, pts]) => {
        const ty = sy({ 0: 7300, 75: 6500, [E200]: 3800, [E500]: 3800, [E1000]: 5600 }[X]);
        const strs = X === 0 ? ['parity, no carbon price', 'parity'] : X === 75 ? ['today’s €75/t', '€75/t'] : [`${eur(X, -1)}/t`];
        const cands = [];
        strs.forEach((s, si) => { const tw = measure(ctx, s, 10, 650); pts.forEach(([qx, qy]) => [[qx + 6, qy + 4, 0], [qx - 6 - tw, qy + 4, 10], [qx - tw / 2, qy - 7, 5], [qx - tw / 2, qy + 15, 5]].forEach(([x, b, pen]) => {
          const r = [x, b - 9, x + tw, b + 2]; if (r[0] < A.l + 3 || r[2] > A.r - 3 || r[1] < A.t + 2 || r[3] > A.b - 3) return;
          cands.push({ s, x, b, r, sc: Math.abs(qy - ty) + pen + si * 80 });
        })); });
        cands.sort((a, b) => a.sc - b.sc);
        const c = cands.find(c => !clash(c.r)) || cands[0]; if (!c) return;
        taken.push(c.r); text(ctx, c.s, c.x, c.b, { size: 10, weight: 650, color: C.ink, halo: true });
      });
      // the three futures
      SCEN.forEach(s => { const x = sx(s.usd * EUR), y = sy(s.hours); circle(ctx, x, y, 3.5, alpha(C.ink2, 0.7)); if (Math.hypot(x - sx(st.price), y - sy(st.hours)) > 24) text(ctx, '$' + s.usd, x + 6, y - 4, { size: 9.5, color: C.ink2, halo: true }); });
      // the plant
      const px = sx(st.price), py = sy(st.hours);
      ctx.save(); ctx.translate(px, py);
      ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(-12, 9); ctx.lineTo(-12, -3); ctx.lineTo(-5, -8); ctx.lineTo(-5, -3); ctx.lineTo(2, -8); ctx.lineTo(2, -3); ctx.lineTo(6, -3); ctx.lineTo(6, -13); ctx.lineTo(11, -13); ctx.lineTo(11, 9); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
      // legend: colour = carbon price needed
      if (!narrow) {
        const lx = A.r + 22; let ly = A.t + 8; text(ctx, 'carbon price', lx, ly, { size: 10.5, weight: 650, color: C.ink2 }); text(ctx, 'needed for parity', lx, ly + 13, { size: 10.5, weight: 650, color: C.ink2 }); ly += 24;
        [[0, 'none'], [75, '€75/t'], [E200, `${eur(E200, -1)}/t`], [E500, `${eur(E500, -1)}/t`], [1200, 'more']].forEach(([v, s], i) => { ctx.fillStyle = mix(C.paper, bandCol(v), 0.55); ctx.fillRect(lx, ly + i * 18, 18, 15); text(ctx, s, lx + 24, ly + 11 + i * 18, { size: 10, color: C.ink2 }); });
        text(ctx, 'dots: the three futures', lx, ly + 5 * 18 + 14, { size: 10, color: C.ink3 });
        text(ctx, 'in the text', lx, ly + 5 * 18 + 27, { size: 10, color: C.ink3 });
      } else {
        let lx = A.l - 36; const ly = h - 16; text(ctx, 'carbon price for parity:', lx, ly - 16, { size: 10, color: C.ink2 });
        [[0, 'none'], [75, '€75'], [E200, eur(E200, -1)], [E500, eur(E500, -1)], [1200, 'more']].forEach(([v, s]) => { ctx.fillStyle = mix(C.paper, bandCol(v), 0.55); ctx.fillRect(lx, ly - 9, 12, 11); text(ctx, s, lx + 15, ly, { size: 10, color: C.ink2 }); lx += measure(ctx, s, 10) + 26; });
      }
      geo = { sx, sy, A, px, py };
    },
  });
  const setXY = (x, y) => { st.price = clamp(geo.sx.inv(x), 0, 100); st.hours = clamp(Math.round(geo.sy.inv(y) / 50) * 50, 1000, 8760); upd(); };
  fig.interact({
    hit: (x, y) => geo && x >= geo.A.l && x <= geo.A.r && y >= geo.A.t && y <= geo.A.b ? 'p' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.px, y - geo.py) < 26 ? 'p' : null,
    cursor: 'move', down: (o, x, y) => setXY(x, y), move: (o, x, y) => setXY(x, y),
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Make', options: [{ label: 'Hydrogen', value: 'h2', name: 'pl-h2' }, { label: 'Ammonia', value: 'nh3', name: 'pl-nh3' }, { label: 'e-Kerosene', value: 'ker', name: 'pl-ker' }], value: st.prod, onchange: v => { st.prod = v; upd(); } });
  const mo = more(ctl, 'More: equipment cost and the US credit');
  segmented(mo, { label: 'Installed electrolyser cost', options: [{ label: 'Europe today, €2,100/kW', value: 2100, name: 'pc-now' }, { label: '2030 (assumed), €1,500/kW', value: 1500, name: 'pc-2030' }, { label: 'China today, €800/kW', value: 800, name: 'pc-cn' }, { label: 'At scale (assumed), €300/kW', value: 300, name: 'pc-doe' }], value: st.capex, onchange: v => { st.capex = v; upd(); } });
  segmented(mo, { label: 'US 45V credit ($3/kg, hydrogen only)', options: [{ label: 'Off', value: false, name: 'pl-noc' }, { label: 'On', value: true, name: 'pl-45v' }], value: st.credit, onchange: v => { st.credit = v; upd(); } });
  function upd() {
    const k = st.prod, [nm, unit, dp] = PRD[k], e = eCost(k, st.price, st.hours), f75 = fNo(k, st.price) + 75 * PER[k], be = beAt(k, st.price, st.hours);
    const fmt = v => eur(v, dp) + '/' + unit.split('/')[1];
    ro.innerHTML = `Your plant buys power at <b>${eur(st.price, 0)}/MWh</b> and runs <b>${st.hours.toLocaleString('en')} hours</b> a year. ${nm}: <b>${fmt(e)}</b>${st.credit && k === 'h2' ? ' after the US credit' : ''}, against ${fmt(f75)} for the fossil version at today’s €75/t carbon price. ` + (be <= 0 ? 'It is <b>cheaper without any carbon price</b>.' : be <= 75 ? `It already wins at today’s carbon price (parity at ${eur(be, 0)}/t).` : `Parity needs a carbon price of <b>≈${eur(be, -1)}/t</b> CO₂.`);
    fig.invalidate();
  }
  upd();
  hint(el, 'drag the plant: right is dearer power, up is more hours a year. Up and to the left of each line, it beats fossil at that carbon price.');
  euroFigure(el, fig, ctl, 'eu-plant2035');
}
