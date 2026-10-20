// Synthetic fuels post, part 1: the conversion chain.
//  sankey           — where 100 kWh of electricity ends up along eight pathways (Agora/acatech step efficiencies) — model
//  molecules        — electricity per kWh of product for hydrogen, ammonia, methanol, e-kerosene, e-methane — real + model
//  electrolyserTypes— kWh per kg H2 for alkaline, PEM and SOEC (DOE status values, IEA averages) — real
//  carbonSources    — energy to supply a tonne of CO2: fermentation, flue gas, liquid and solid DAC (IEA, NETL, ISGS) — real
//  litreBuilder     — fix 10: the three above merged into one builder for a litre of e-kerosene (the page uses this one)
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import { text, measure, rrect, line, circle, clamp, lerp, axes, pathLine, scale } from '../lib/draw.js';
import { controls, slider, segmented, readout, more, hint } from '../lib/ui.js';
import { FUEL } from '../lib/fueldata.js';

export const ELEC = '#d39a1c', H2C = '#3d8fb8', FUELC = '#b0562f', CO2C = '#857f74', HEATC = '#d94a2b', AMB = '#5fae8a';

/* ---------------- sankey ---------------- */
// One hydrogen basis for this part and the main essay: ≈55 kWh/kg, the US DOE status value for a new commercial
// alkaline or PEM system (stack plus balance of plant), i.e. 33.33/55 ≈ 61% LHV. Other values stay available as presets.
export const H2_KWH = 55, H2_ETA = 0.61;
const PATHS = {
  bev:   { label: 'Car: battery', out: 'at the wheels', steps: [['Transmission', 0.95], ['Charging, battery', 0.90], ['Electric motor', 0.85], ['Drivetrain', 0.95]] },
  fcev:  { label: 'Car: hydrogen', out: 'at the wheels', steps: [['Transmission', 0.95], ['Electrolysis', 'E'], ['Compression, transport', 0.80], ['Fuel cell', 0.60], ['Electric motor', 0.85], ['Drivetrain', 0.95]] },
  efcar: { label: 'Car: e-fuel', out: 'at the wheels', co2: 0.265, steps: [['Transmission', 0.95], ['Electrolysis', 'E'], ['Synthesis', 0.70], ['Fuel transport', 0.95], ['Combustion engine', 0.30], ['Drivetrain', 0.95]] },
  hp:    { label: 'Heat: heat pump', out: 'as heat', steps: [['Transmission', 0.95], ['Heat pump (COP 3)', 3]] },
  emeth: { label: 'Heat: e-methane', out: 'as heat', co2: 0.198, steps: [['Transmission', 0.95], ['Electrolysis', 'E'], ['Methanation', 0.80], ['Gas grid', 0.99], ['Gas boiler', 0.95]] },
  batt:  { label: 'Storage: battery', out: 'back as electricity', steps: [['Battery round trip', 0.85]] },
  h2pow: { label: 'Storage: hydrogen', out: 'back as electricity', steps: [['Electrolysis', 'E'], ['Compression, cavern', 0.90], ['Gas turbine', 0.60]] },
  // e-kerosene synthesis at 58%, not Agora's 70%: with 61% electrolysis that gives the litre builder's 9.6 kWh from 26.9
  // (its CO₂ and upgrading electricity included), so the two figures agree
  ekero: { label: 'Aircraft: e-kerosene', out: 'as jet fuel in the tank', co2: 0.265, steps: [['Transmission', 0.95], ['Electrolysis', 'E'], ['Synthesis', 0.58], ['Fuel transport', 0.95]] },
};
const DAC_KWH_PER_KG = 1.25; // electricity-equivalent of solid-sorbent DAC with heat-pump heat, kWh per kg CO2 (model)

const afterCol = (n, P) => /Electrolysis|Compression/.test(n) ? H2C : /Synthesis|Methanation|Fuel transport|Gas grid/.test(n) ? FUELC : /Combustion|motor|Drivetrain|Fuel cell|turbine|boiler|Heat pump|round trip|Charging/.test(n) ? (P.out === 'as heat' ? HEATC : P.out.startsWith('back') ? ELEC : C.ink2) : ELEC;

export function chainResult(key, eta, air) {
  const P = PATHS[key];
  let v = 100, dac = 0;
  const steps = P.steps.map(([n, e]) => [n, e === 'E' ? eta : e]);
  if (air && P.co2) {
    // fuel-stage efficiency of the chain up to the fuel (before transport/use)
    let ef = 1; for (const [n, e] of steps) { ef *= e; if (n === 'Synthesis' || n === 'Methanation') break; }
    const k = P.co2 * DAC_KWH_PER_KG; // kWh of DAC electricity per kWh of fuel
    dac = 100 - 100 / (1 + k * ef);
    v = 100 - dac;
  }
  const flows = [];
  for (const [n, e] of steps) { const nv = v * e; flows.push({ n, e, vin: v, vout: nv }); v = nv; }
  return { P, flows, dac, out: v };
}

export function sankey(el) {
  const st = { path: 'efcar', eta: H2_ETA, air: false };
  const fig = new Fig(el, {
    label: 'Energy-flow diagram: where 100 kWh of electricity goes along a chosen pathway, with the losses at each conversion step',
    height: w => w < 600 ? 520 : 330,
    draw(ctx, w, h) {
      const narrow = w < 600, R = chainResult(st.path, st.eta, st.air);
      const n = R.flows.length + (R.dac ? 1 : 0);
      const gain = R.flows.some(f => f.e > 1);
      const maxV = gain ? Math.max(...R.flows.map(f => f.vout)) : 100;
      if (!narrow) {
        const L = 40, Rr = w - 150, top = 54, Hb = (gain ? 120 : 130) * 100 / maxV;
        const k = Hb / 100, colW = (Rr - L) / Math.max(1, R.flows.length + (R.dac ? 1 : 0)), lossY = top + (gain ? maxV : 100) * k + 60;
        text(ctx, '100 kWh of electricity', L, top - 12, { size: 11.5, weight: 650, color: darken(ELEC, 0.2) });
        let x = L, v = 100, yTop = top + (gain ? (maxV - 100) * k : 0);
        const band = (x0, x1, y0, th, col, y1 = y0) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo((x0 + x1) / 2, y0, (x0 + x1) / 2, y1, x1, y1); ctx.lineTo(x1, y1 + th); ctx.bezierCurveTo((x0 + x1) / 2, y1 + th, (x0 + x1) / 2, y0 + th, x0, y0 + th); ctx.closePath(); ctx.fill(); };
        let li = 0; const stag = () => { const o = colW < 125 && li % 2 ? 30 : 0; li++; return o; };
        const lossDrop = (x0, y0, th, label, sub, col = C.grid2) => {
          // loss leaves from the bottom of the band at x0 and curves down
          const x1 = x0 + colW * 0.45;
          ctx.fillStyle = alpha(col, 0.9); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0 + colW * 0.3, y0, x1 - th / 2, y0, x1 - th / 2, lossY - 6); ctx.lineTo(x1 + th / 2, lossY - 6); ctx.bezierCurveTo(x1 + th / 2, y0 + th, x0 + colW * 0.3, y0 + th, x0, y0 + th); ctx.closePath(); ctx.fill();
          const dy = stag(); text(ctx, label, x1, lossY + 10 + dy, { size: 10.5, weight: 650, color: C.ink2, align: 'center' });
          text(ctx, sub, x1, lossY + 24 + dy, { size: 10, color: C.ink3, align: 'center' });
        };
        if (R.dac) {
          const th = R.dac * k, cont = v - R.dac;
          band(x, x + colW, yTop, cont * k, alpha(ELEC, 0.75));
          lossDrop(x, yTop + cont * k, th, 'CO₂ from air', `−${R.dac.toFixed(0)} kWh`, CO2C);
          x += colW; v = cont;
        }
        R.flows.forEach(f => {
          const after = afterCol(f.n, R.P);
          if (f.e > 1) {
            const extra = f.vout - f.vin, xa = x + colW * 0.15, wa = Math.min(extra * k, colW * 0.6);
            band(x, x + colW, yTop, f.vin * k, alpha(after, 0.75));
            ctx.fillStyle = alpha(AMB, 0.55); ctx.beginPath(); ctx.moveTo(xa, top - 4); ctx.bezierCurveTo(xa, yTop - extra * k, x + colW * 0.5, yTop - extra * k, x + colW, yTop - extra * k); ctx.lineTo(x + colW, yTop); ctx.bezierCurveTo(x + colW * 0.6, yTop, xa + wa, yTop - extra * k * 0.3, xa + wa, top - 4); ctx.closePath(); ctx.fill();
            text(ctx, `+${extra.toFixed(0)} kWh from the outside air`, xa + wa + 6, top + 6, { size: 10.5, weight: 650, color: darken(AMB, 0.3), halo: true });
            yTop -= extra * k;
            text(ctx, f.n, x + colW / 2, lossY + 10 + stag(), { size: 10.5, weight: 650, color: C.ink2, align: 'center' });
          } else {
            band(x, x + colW, yTop, f.vout * k, alpha(after, 0.75));
            lossDrop(x, yTop + f.vout * k, (f.vin - f.vout) * k, f.n, `${Math.round(f.e * 100)}%: −${(f.vin - f.vout).toFixed(f.vin - f.vout < 9.95 ? 1 : 0)} kWh`);
          }
          line(ctx, x, yTop - 2, x, yTop + f.vin * k + 2, alpha(C.ink, 0.5), 1.2);
          x += colW;
        });
        line(ctx, x, yTop - 2, x, yTop + R.out * k + 2, C.ink, 2);
        text(ctx, `${R.out.toFixed(0)} kWh`, x + 8, yTop + Math.max(R.out * k / 2, 6) + 2, { size: 15, weight: 700, color: C.ink });
        text(ctx, R.P.out, x + 8, yTop + Math.max(R.out * k / 2, 6) + 18, { size: 10.5, color: C.ink2 });
      } else {
        // vertical layout for narrow screens
        const top = 34, L = 22, k = (gain ? 80 : 100) / maxV * 1.0, Wb = 100 * k * 1.0, rowH = (h - top - 30) / Math.max(1, n), lossX = L + Wb * (gain ? maxV / 100 : 1) + 16;
        text(ctx, '100 kWh of electricity', L, top - 12, { size: 11.5, weight: 650, color: darken(ELEC, 0.2) });
        let y = top, v = 100, xL = L;
        const vb = (y0, y1, x0, th, col, x1 = x0) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0, (y0 + y1) / 2, x1, (y0 + y1) / 2, x1, y1); ctx.lineTo(x1 + th, y1); ctx.bezierCurveTo(x1 + th, (y0 + y1) / 2, x0 + th, (y0 + y1) / 2, x0 + th, y0); ctx.closePath(); ctx.fill(); };
        const loss = (y0, x0, th, label, sub, col = C.grid2) => {
          const yy = y0 + rowH * 0.5;
          ctx.fillStyle = alpha(col, 0.9); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0, yy - th / 2, x0, yy - th / 2, lossX - 4, yy - th / 2); ctx.lineTo(lossX - 4, yy + th / 2); ctx.bezierCurveTo(x0 + th, yy + th / 2, x0 + th, y0, x0 + th, y0); ctx.closePath(); ctx.fill();
          text(ctx, label, lossX, yy - 1, { size: 10.5, weight: 650, color: C.ink2 });
          text(ctx, sub, lossX, yy + 12, { size: 10, color: C.ink3 });
        };
        if (R.dac) { const cont = v - R.dac; vb(y, y + rowH, xL, cont * k, alpha(ELEC, 0.75)); loss(y, xL + cont * k, R.dac * k, 'CO₂ from air', `−${R.dac.toFixed(0)} kWh`, CO2C); y += rowH; v = cont; }
        R.flows.forEach(f => {
          const after = afterCol(f.n, R.P);
          if (f.e > 1) {
            vb(y, y + rowH, xL, f.vout * k, alpha(after, 0.75));
            ctx.fillStyle = alpha(AMB, 0.55); ctx.fillRect(xL + f.vin * k, y, (f.vout - f.vin) * k, rowH * 0.25);
            text(ctx, f.n, lossX, y + rowH * 0.5, { size: 10.5, weight: 650, color: C.ink2 });
            text(ctx, `+${(f.vout - f.vin).toFixed(0)} kWh from outside air`, lossX, y + rowH * 0.5 + 13, { size: 10, color: darken(AMB, 0.3) });
          } else {
            vb(y, y + rowH, xL, f.vout * k, alpha(after, 0.75));
            loss(y, xL + f.vout * k, (f.vin - f.vout) * k, f.n, `${Math.round(f.e * 100)}%: −${(f.vin - f.vout).toFixed(f.vin - f.vout < 9.95 ? 1 : 0)} kWh`);
          }
          y += rowH;
        });
        line(ctx, xL - 2, y, xL + R.out * k + 2, y, C.ink, 2);
        text(ctx, `${R.out.toFixed(0)} kWh ${R.P.out}`, xL, y + 18, { size: 13, weight: 700, color: C.ink });
      }
    },
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Pathway', options: Object.entries(PATHS).map(([k, p]) => ({ label: p.label, value: k, name: 'sk-' + k })), value: st.path, onchange: v => { st.path = v; upd(); } });
  slider(more(ctl, 'More: electrolyser efficiency'), { label: 'Electrolyser efficiency (LHV)', min: 0.55, max: 0.84, step: 0.01, value: st.eta, color: H2C, fmt: v => `${Math.round(v * 100)}% · ${(33.33 / v).toFixed(0)} kWh/kg`, oninput: v => { st.eta = v; upd(); }, name: 'eta' });
  segmented(ctl, { label: 'Carbon for e-fuels', options: [{ label: 'Concentrated source', value: false, name: 'co2-pt' }, { label: 'From the air', value: true, name: 'co2-air' }], value: st.air, onchange: v => { st.air = v; upd(); } });
  function upd() {
    const R = chainResult(st.path, st.eta, st.air), P = R.P;
    const ref = { 'at the wheels': chainResult('bev', st.eta, st.air).out, 'as heat': chainResult('hp', st.eta, st.air).out, 'back as electricity': chainResult('batt', st.eta, st.air).out }[P.out];
    let s = `Of 100 kWh of electricity, <b>${R.out.toFixed(0)} kWh</b> ends up ${P.out}.`;
    if (ref && Math.abs(ref - R.out) > 0.5) s += R.out < ref ? ` The direct-electric route delivers ${ref.toFixed(0)} kWh, so this one needs <b>${(ref / R.out).toFixed(1)}×</b> as much electricity for the same job.` : ` This is the most efficient route for this job.`;
    else if (ref) s += ' This is the most efficient route for this job.';
    if (st.path === 'ekero') s += ' No battery can yet carry a long-haul aircraft, so the comparison is with fossil kerosene, not with electricity.';
    if (R.dac) s += ` Capturing the carbon from the air takes ${R.dac.toFixed(0)} kWh of the 100.`;
    else if (P.co2 && !st.air) s += ` Carbon from a concentrated source (a brewery, a biogas plant) costs little energy${st.path === 'ekero' ? '' : ' and is left out here'}.`;
    ro.innerHTML = s; fig.invalidate();
  }
  upd();
}

/* ---------------- molecules ---------------- */
// per tonne of product: t H2, t CO2, process MWh, LHV MWh/t, source of each
export const PRODUCTS = [
  { k: 'h2', name: 'Hydrogen', h2: 1, co2: 0, proc: 0, lhv: 33.33 },
  { k: 'nh3', name: 'Ammonia', h2: 0.18, co2: 0, proc: 0.6, lhv: 5.17 },
  { k: 'meoh', name: 'Methanol', h2: 0.2, co2: 1.375, proc: 1.1, lhv: 5.53 },
  { k: 'ch4', name: 'e-Methane', h2: 0.5, co2: 2.75, proc: 0.2, lhv: 13.9 },
  { k: 'ker', name: 'e-Kerosene', h2: 0.55, co2: 3.2, proc: 3.0, lhv: 12.0 },
];
export const CO2SRC = { bio: { n: 'fermentation or biogas', mwh: 0.15 }, flue: { n: 'flue gas (cement, power)', mwh: 0.6 }, air: { n: 'the air', mwh: DAC_KWH_PER_KG } };
export function productMWh(p, kwhkg, src) {
  const el = p.h2 * kwhkg, cc = p.co2 * CO2SRC[src].mwh, pr = p.proc;
  return { el, cc, pr, tot: el + cc + pr };
}
export function molecules(el) {
  const st = { kwh: H2_KWH, src: 'bio', hover: 4 };
  let geo = [];
  const fig = new Fig(el, {
    label: 'Electricity needed per unit of energy in five electricity-based products, split into electrolysis, carbon capture and synthesis',
    height: w => w < 600 ? 330 : 290,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 84 : 110, r: w - (narrow ? 20 : 150), t: narrow ? 54 : 40, b: h - 44 };
      const xs = scale(0, 4, A.l, A.r);
      axes(ctx, { box: { l: A.l, r: A.r, t: A.t, b: A.b }, x0: 0, x1: 4, y0: 0, y1: 1, xticks: [0, 1, 2, 3, 4], yticks: [], xfmt: v => v + ' kWh', xlabel: 'electricity per kWh of product (LHV)', grid: false });
      for (const v of [1, 2, 3, 4]) line(ctx, xs(v), A.t, xs(v), A.b, v === 1 ? alpha(C.ink, 0.45) : C.grid, 1, v === 1 ? [4, 3] : null);
      text(ctx, 'no losses', xs(1) + 4, A.t - 4, { size: 10, color: C.ink3 });
      const rowH = (A.b - A.t) / PRODUCTS.length; geo = [];
      PRODUCTS.forEach((p, i) => {
        const r = productMWh(p, st.kwh, st.src), y = A.t + i * rowH + rowH * 0.2, bh = rowH * 0.6, sel = st.hover === i;
        text(ctx, p.name, A.l - 8, y + bh / 2 + 4, { size: 11.5, weight: sel ? 700 : 600, color: C.ink, align: 'right' });
        let x = A.l;
        [[r.el, H2C], [r.cc, CO2C], [r.pr, FUELC]].forEach(([v, col]) => { const wd = xs(v / p.lhv) - xs(0); ctx.fillStyle = alpha(col, sel ? 0.95 : 0.7); ctx.fillRect(x, y, wd, bh); x += wd; });
        text(ctx, `${(r.tot / p.lhv).toFixed(2)}`, x + 6, y + bh / 2 + 4, { size: 11, weight: 650, color: C.ink, halo: true });
        if (!narrow) text(ctx, `${Math.round(p.lhv / r.tot * 100)}% efficient`, A.r + 20, y + bh / 2 + 4, { size: 10.5, color: C.ink3 });
        geo.push({ i, y0: y - 4, y1: y + bh + 4 });
      });
      let lx = A.l, ly = 16;
      [['electrolysis', H2C], ['carbon capture', CO2C], ['synthesis, compression', FUELC]].forEach(([s, c]) => { const W = measure(ctx, s, 10.5) + 30; if (lx > A.l && lx + W - 16 > w - 8) { lx = A.l; ly += 15; } ctx.fillStyle = alpha(c, 0.8); ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, s, lx + 14, ly, { size: 10.5, color: C.ink2 }); lx += W; });
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => y >= g.y0 && y <= g.y1) || null, cursor: 'pointer', hover: o => { if (o && o.i !== st.hover) { st.hover = o.i; upd(); } }, down: o => { st.hover = o.i; upd(); } });
  const ctl = controls(el), ro = readout(el);
  slider(ctl, { label: 'Electrolyser electricity', min: 40, max: 60, step: 0.1, value: st.kwh, color: H2C, fmt: v => v.toFixed(1) + ' kWh/kg H₂', oninput: v => { st.kwh = v; upd(); }, name: 'kwh' });
  segmented(ctl, { label: 'CO₂ from', options: [{ label: 'Fermentation', value: 'bio', name: 'src-bio' }, { label: 'Flue gas', value: 'flue', name: 'src-flue' }, { label: 'Air', value: 'air', name: 'src-air' }], value: st.src, onchange: v => { st.src = v; upd(); } });
  function upd() {
    const p = PRODUCTS[st.hover], r = productMWh(p, st.kwh, st.src);
    let s = `One tonne of <b>${p.name.toLowerCase()}</b> holds ${p.lhv.toFixed(1)} MWh of chemical energy and takes <b>${r.tot.toFixed(1)} MWh</b> of electricity: ${p.h2} t of hydrogen (${r.el.toFixed(1)} MWh)`;
    if (p.co2) s += `, ${p.co2} t of CO₂ from ${CO2SRC[st.src].n} (${r.cc.toFixed(1)} MWh)`;
    if (p.proc) s += ` and ${p.proc} MWh for ${p.k === 'nh3' ? 'air separation and the Haber–Bosch loop' : 'synthesis, compression and upgrading'}`;
    s += `. Hover a bar to switch products.`;
    ro.innerHTML = s; fig.invalidate();
  }
  upd();
}

/* ---------------- electrolyserTypes ---------------- */
export function electrolyserTypes(el) {
  const st = { hover: null };
  let geo = [];
  const fig = new Fig(el, {
    label: 'Electricity per kilogram of hydrogen for alkaline, PEM and solid-oxide electrolysers: stack, system and lifetime average, against the thermodynamic floor',
    height: w => w < 600 ? 360 : 300,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 92 : 150, r: w - (narrow ? 16 : 40), t: 48, b: h - 70 };
      const { sx } = axes(ctx, { box: A, x0: 30, x1: 62, y0: 0, y1: 1, xticks: narrow ? [30, 40, 50, 60] : [30, 35, 40, 45, 50, 55, 60], yticks: [], xfmt: v => v + '', grid: false });
      text(ctx, narrow ? 'kWh/kg H₂' : 'kWh per kg of hydrogen', A.l, A.b + 40, { size: 10.5, color: C.ink3 });
      // floors
      [[FUEL.lhv, 'LHV 33.3'], [FUEL.hhv, 'HHV 39.4']].forEach(([v, s]) => { line(ctx, sx(v), A.t - 6, sx(v), A.b, alpha(C.ink, 0.5), 1, [3, 3]); text(ctx, s, sx(v), A.t - 10, { size: 10, color: C.ink2, align: 'center' }); });
      const rowH = (A.b - A.t) / 3; geo = [];
      FUEL.elec.forEach((e, i) => {
        const y = A.t + i * rowH + rowH * 0.5, sel = st.hover === i;
        text(ctx, narrow && e.k === 'soec' ? 'SOEC' : e.name, A.l - 10, y + 4, { size: 11.5, weight: 650, color: C.ink, align: 'right' });
        line(ctx, sx(e.stack), y, sx(e.sysAvg + e.heat), y, alpha(C.ink, 0.25), 6);
        const pts = [[e.stack, 'stack', lighten(H2C, 0.35)], [e.sysBOL, 'system, new', H2C], [e.sysAvg, 'lifetime average', darken(H2C, 0.3)]];
        pts.forEach(([v, s, c], j) => { circle(ctx, sx(v), y, sel ? 7 : 6, c, '#fff', 1.5); if (sel || !narrow) text(ctx, `${v}`, sx(v), y + (j % 2 ? 20 : -11), { size: 10, weight: 650, color: darken(c, 0.2), align: 'center' }); });
        if (e.heat) { const x0 = sx(e.sysAvg), x1 = sx(e.sysAvg + e.heat); ctx.fillStyle = alpha(HEATC, 0.5); ctx.fillRect(x0 + 6, y - 4, x1 - x0 - 6, 8); text(ctx, `+${e.heat} kWh steam heat`, x1 + 4, y + 4, { size: 10, color: HEATC, halo: true }); }
        geo.push({ i, y0: y - rowH / 2, y1: y + rowH / 2 });
      });
      // IEA averages + INL record
      const yB = A.b + 40;
      [[FUEL.ieaAvg, narrow ? 'IEA average' : 'IEA global average 2024'], [FUEL.ieaChina, 'China']].forEach(([v, s], j) => { line(ctx, sx(v), A.b, sx(v), A.b + 6, C.ink2, 1.5); if (narrow) text(ctx, `${s} ${v}`, sx(v) + 3, yB + j * 15, { size: 10, color: C.ink2, align: 'right' }); else text(ctx, `${s} ${v}`, sx(v) + (j ? 4 : -4), yB, { size: 10, color: C.ink2, align: j ? 'left' : 'right' }); });
      let lx = A.l, ly = 16;
      [['stack', lighten(H2C, 0.35)], ['system, new', H2C], ['lifetime average', darken(H2C, 0.3)]].forEach(([s, c]) => { circle(ctx, lx + 5, ly - 4, 5, c, '#fff', 1); text(ctx, s, lx + 14, ly, { size: 10.5, color: C.ink2 }); lx += measure(ctx, s, 10.5) + 30; });
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => y >= g.y0 && y <= g.y1) || null, cursor: 'pointer', hover: o => { st.hover = o ? o.i : null; upd(); }, down: o => { st.hover = o.i; upd(); } });
  const ro = readout(el);
  function upd() {
    const e = FUEL.elec[st.hover ?? 1];
    ro.innerHTML = st.hover == null
      ? `Every electrolyser sits well above the floor of 33.3 kWh per kg (the energy in the hydrogen itself). Commercial systems need about <b>55 kWh/kg</b> when new and around 57 over their life as the stacks wear; solid-oxide cells need less electricity because heat does part of the work. Hover a row.`
      : `<b>${e.name}</b>, ${e.T}: stack ${e.stack} kWh/kg, system ${e.sysBOL} when new, ${e.sysAvg} averaged over the stack’s life${e.heat ? `, plus ${e.heat} kWh/kg of heat` : ''}. ${e.capex[0].toUpperCase() + e.capex.slice(1)}.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- carbonSources ---------------- */
const CSRC = [
  { n: 'Fermentation (ethanol, biogas)', short: 'Fermentation', tot: [0.47, 0.64], hs: 0, note: 'nearly pure CO₂, so only drying and compression: 130–177 kWh of electricity per tonne' },
  { n: 'Flue gas, amine scrubbing', short: 'Flue gas', tot: [2.8, 4.1], hs: 0.9, note: 'CO₂ is 4–25% of the gas; steam at about 120 °C regenerates the solvent (2.5–3.7 GJ per tonne), plus electricity for fans, pumps and compression' },
  { n: 'Air, liquid solvent', short: 'Air, liquid', tot: [5.5, 8.8], hs: 0.9, pts: [[6.6, 'Carbon Engineering']], note: 'CO₂ is 0.04% of the air; the solvent is regenerated by calcining at up to 900 °C, today with natural gas; 80–100% of the energy is heat' },
  { n: 'Air, solid sorbent', short: 'Air, solid', tot: [7.2, 9.5], hs: 0.775, pts: [[10.6, 'Climeworks (2017)']], note: 'CO₂ is 0.04% of the air; the filters are regenerated at 80–120 °C, so heat pumps or waste heat can supply the 75–80% of the energy that is heat' },
];
export function carbonSources(el) {
  const st = { per: 't', hover: null };
  let geo = [];
  const fig = new Fig(el, {
    label: 'Energy needed to supply a tonne of CO2 from fermentation, flue gas, and the air with liquid solvents or solid sorbents, split into heat and electricity',
    height: w => w < 600 ? 360 : 280,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 92 : 210, r: w - (narrow ? 20 : 60), t: 40, b: h - 44 };
      const f = st.per === 't' ? 1 : 3.2 / 1000 * 0.8 / 3.6 * 1000; // GJ per t CO2 -> kWh per litre of e-kerosene: 3.2 t CO2/t fuel, 0.8 kg/L
      const xmax = st.per === 't' ? 12 : 12 * f;
      const { sx } = axes(ctx, { box: A, x0: 0, x1: xmax, y0: 0, y1: 1, yticks: [], xticks: st.per === 't' ? [0, 2, 4, 6, 8, 10, 12] : [0, 2, 4, 6, 8], xfmt: v => st.per === 't' ? v + ' GJ' : v + ' kWh', xlabel: st.per === 't' ? 'energy per tonne of CO₂' : 'energy per litre of e-kerosene', grid: false });
      const rowH = (A.b - A.t) / CSRC.length; geo = [];
      CSRC.forEach((s, i) => {
        const y = A.t + i * rowH + rowH * 0.22, bh = rowH * 0.5, sel = st.hover === i;
        text(ctx, narrow ? s.short : s.n, A.l - 8, y + bh / 2 + 4, { size: 11, weight: 600, color: C.ink, align: 'right' });
        // low end solid (split heat/electricity), range to the high end
        const lo = s.tot[0] * f, hi = s.tot[1] * f, x0 = A.l, xh = sx(lo * s.hs), xl = sx(lo);
        ctx.fillStyle = alpha(HEATC, sel ? 0.8 : 0.6); ctx.fillRect(x0, y, xh - x0, bh);
        ctx.fillStyle = alpha(ELEC, sel ? 0.9 : 0.7); ctx.fillRect(xh, y, xl - xh, bh);
        ctx.fillStyle = alpha(C.ink3, 0.2); ctx.fillRect(xl, y + bh * 0.2, sx(hi) - xl, bh * 0.6);
        text(ctx, `${lo.toFixed(1)}–${hi.toFixed(1)}`, sx(Math.max(hi, ...(s.pts || []).map(p => p[0] * f))) + 6, y + bh / 2 + 4, { size: 10.5, weight: 650, color: C.ink, halo: true });
        (s.pts || []).forEach(([tq, nm]) => { const xp = sx(tq * f); line(ctx, xp, y - 3, xp, y + bh + 3, C.ink, 1.5); if (!narrow || sel) text(ctx, nm, xp, y + bh + 14, { size: 9.5, color: C.ink2, align: 'center', halo: true }); });
        geo.push({ i, y0: y - 6, y1: y + bh + 10 });
      });
      let lx = A.l, ly = 16;
      [['heat', HEATC], ['electricity', ELEC], ['range', C.ink3]].forEach(([s, c]) => { ctx.fillStyle = alpha(c, 0.6); ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, s, lx + 14, ly, { size: 10.5, color: C.ink2 }); lx += measure(ctx, s, 10.5) + 30; });
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => y >= g.y0 && y <= g.y1) || null, cursor: 'pointer', hover: o => { st.hover = o ? o.i : null; upd(); }, down: o => { st.hover = o.i; upd(); } });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Show energy', options: [{ label: 'per tonne of CO₂', value: 't', name: 'per-t' }, { label: 'per litre of e-kerosene', value: 'L', name: 'per-L' }], value: st.per, onchange: v => { st.per = v; upd(); } });
  function upd() {
    const s = CSRC[st.hover ?? 3];
    ro.innerHTML = st.hover == null
      ? `Pulling CO₂ out of the air takes roughly <b>ten to twenty times</b> the energy of taking it from a fermenter. A litre of e-kerosene contains about 2.5 kg of carbon dioxide’s worth of carbon, so with air capture the carbon alone can cost ${(5.5 * 3.2 * 0.8 / 3.6).toFixed(0)}–${(10.6 * 3.2 * 0.8 / 3.6).toFixed(0)} kWh of energy per litre — on top of the hydrogen. Hover a row.`
      : `<b>${s.n}</b>: ${s.note}.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- litreBuilder (molecules + electrolyserTypes + carbonSources merged) ---------------- */
// Build one litre of e-kerosene (0.8 kg, 9.6 kWh LHV) from its inputs: 0.44 kg of hydrogen from the chosen
// electrolyser (DOE status values; IEA 2024 installed average), 2.56 kg of CO2 from the chosen source (IEA/NETL/ISGS
// energy ranges, low end drawn, heat share shown) and 2.4 kWh of synthesis, compression and upgrading.
// "All products" shows the same choices applied to hydrogen, ammonia, methanol, e-methane and e-kerosene.
const ELZ = [
  { k: 'sys', name: 'Commercial system, new', short: 'System, new', kwh: H2_KWH, heat: 0, note: 'a new alkaline or PEM system including power electronics, pumps and drying (US DOE status value), the basis used throughout this series' },
  { k: 'iea', name: 'IEA 2024 average', short: 'IEA avg', kwh: FUEL.ieaAvg, heat: 0, note: 'the installed fleet’s average in 2024 (63% efficient, LHV)' },
  ...FUEL.elec.map(e => ({ k: e.k, name: e.name, short: e.k === 'soec' ? 'SOEC' : e.name, kwh: e.sysAvg, heat: e.heat, note: `${e.T}; stack ${e.stack}, system ${e.sysBOL} when new and ${e.sysAvg} kWh/kg over its life${e.heat ? `, plus ${e.heat} kWh/kg of steam heat` : ''}; ${e.capex}` })),
];
const KER = { kg: 0.8, lhv: 9.6, h2: 0.55 * 0.8, co2: 3.2 * 0.8, syn: 3.0 * 0.8 }; // per litre
export function litreBuilder(el) {
  const st = { elz: 0, src: 0, view: 'L', hover: null };
  el.__sim = { st };
  let geo = [];
  const gj = s => CSRC[s].tot[0] / 3.6; // kWh per kg of CO2, low end
  const build = () => {
    const E = ELZ[st.elz], S = CSRC[st.src];
    const h2e = KER.h2 * E.kwh, h2h = KER.h2 * E.heat, cc = KER.co2 * gj(st.src), ccHeat = cc * S.hs, ccEl = cc - ccHeat, syn = KER.syn;
    const segs = [
      ['hydrogen: electricity', h2e, H2C], ...(h2h ? [['hydrogen: steam heat', h2h, lighten(HEATC, 0.25)]] : []),
      ['CO₂: electricity', ccEl, CO2C], ...(ccHeat > 0.01 ? [['CO₂: heat', ccHeat, HEATC]] : []),
      ['synthesis, compression', syn, FUELC],
    ];
    const tot = segs.reduce((a, s) => a + s[1], 0), hi = tot - cc + KER.co2 * S.tot[1] / 3.6;
    return { E, S, segs, tot, hi, cc };
  };
  const fig = new Fig(el, {
    label: 'Energy needed to make one litre of e-kerosene, built from electrolyser hydrogen, captured CO2 and synthesis, against the energy in the litre; or the same for five electricity-based products',
    height: w => st.view === 'L' ? (w < 600 ? 300 : 250) : (w < 600 ? 330 : 290),
    draw(ctx, w, h) {
      const narrow = w < 600; geo = [];
      if (st.view === 'L') {
        const R = build(), A = { l: narrow ? 16 : 120, r: w - (narrow ? 16 : 120), t: narrow ? 60 : 56, b: 0 }, xmax = 40;
        const xs = scale(0, xmax, A.l, A.r), bh = 46, y = A.t;
        text(ctx, 'energy to make one litre (kWh)', A.l, y - 22, { size: 11, weight: 600, color: C.ink2 });
        let x = 0;
        R.segs.forEach(([s, v, c], i) => { const x0 = xs(x), x1 = xs(x + v); ctx.fillStyle = alpha(c, st.hover === i ? 0.98 : 0.82); ctx.fillRect(x0, y, x1 - x0 - 1, bh); if (x1 - x0 > 34) text(ctx, v.toFixed(1), (x0 + x1) / 2, y + bh / 2 + 4, { size: 11, weight: 700, color: '#fff', align: 'center' }); geo.push({ i, x0, x1, y0: y, y1: y + bh }); x += v; });
        if (R.hi > R.tot + 0.05) { ctx.fillStyle = alpha(C.ink3, 0.22); ctx.fillRect(xs(R.tot), y + bh * 0.3, xs(R.hi) - xs(R.tot), bh * 0.4); }
        text(ctx, `${R.tot.toFixed(1)} kWh`, xs(Math.max(R.tot, R.hi)) + 6, y + bh / 2 + 5, { size: 13, weight: 700, color: C.ink, halo: true });
        // the litre itself
        const yl = y + bh + 34, xl = xs(KER.lhv);
        ctx.fillStyle = alpha(FUELC, 0.85); ctx.fillRect(xs(0), yl, xl - xs(0), 26);
        text(ctx, `${KER.lhv} kWh in the litre`, xl + 6, yl + 17, { size: 11.5, weight: 650, color: darken(FUELC, 0.25) });
        line(ctx, xl, y - 4, xl, yl + 30, alpha(C.ink, 0.35), 1, [3, 3]);
        for (let v = 0; v <= xmax; v += 10) { line(ctx, xs(v), yl + 34, xs(v), yl + 38, C.ink3, 1); text(ctx, v + '', xs(v), yl + 50, { size: 10, color: C.ink3, align: 'center' }); }
        text(ctx, `${Math.round(KER.lhv / R.tot * 100)}% of the energy put in ends up in the fuel`, A.l, yl + 70, { size: 11, weight: 650, color: C.ink });
        // legend
        let lx = A.l, ly = yl + 92;
        R.segs.forEach(([s, v, c]) => { const W = measure(ctx, s, 10.5) + 30; if (lx > A.l && lx + W - 16 > w - 8) { lx = A.l; ly += 15; } ctx.fillStyle = alpha(c, 0.82); ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, s, lx + 14, ly, { size: 10.5, color: C.ink2 }); lx += W; });
        if (R.hi > R.tot + 0.05) { const W = measure(ctx, 'range of estimates', 10.5) + 30; if (lx + W - 16 > w - 8) { lx = A.l; ly += 15; } ctx.fillStyle = alpha(C.ink3, 0.3); ctx.fillRect(lx, ly - 7, 10, 6); text(ctx, 'range of estimates', lx + 14, ly, { size: 10.5, color: C.ink2 }); }
      } else {
        const E = ELZ[st.elz], A = { l: narrow ? 84 : 110, r: w - (narrow ? 20 : 150), t: narrow ? 54 : 40, b: h - 44 };
        const xs = scale(0, 4, A.l, A.r);
        axes(ctx, { box: A, x0: 0, x1: 4, y0: 0, y1: 1, xticks: [0, 1, 2, 3, 4], yticks: [], xfmt: v => v + ' kWh', xlabel: 'energy per kWh of product (LHV)', grid: false });
        for (const v of [1, 2, 3, 4]) line(ctx, xs(v), A.t, xs(v), A.b, v === 1 ? alpha(C.ink, 0.45) : C.grid, 1, v === 1 ? [4, 3] : null);
        text(ctx, 'no losses', xs(1) + 4, A.t - 4, { size: 10, color: C.ink3 });
        const rowH = (A.b - A.t) / PRODUCTS.length;
        PRODUCTS.forEach((p, i) => {
          const elx = p.h2 * (E.kwh + E.heat), cc = p.co2 * gj(st.src), pr = p.proc, y = A.t + i * rowH + rowH * 0.2, bh = rowH * 0.6, sel = st.hover === i;
          text(ctx, p.name, A.l - 8, y + bh / 2 + 4, { size: 11.5, weight: sel ? 700 : 600, color: C.ink, align: 'right' });
          let x = A.l;
          [[elx, H2C], [cc, CO2C], [pr, FUELC]].forEach(([v, col]) => { const wd = xs(v / p.lhv) - xs(0); ctx.fillStyle = alpha(col, sel ? 0.95 : 0.7); ctx.fillRect(x, y, wd, bh); x += wd; });
          const tot = (elx + cc + pr) / p.lhv;
          text(ctx, tot.toFixed(2), x + 6, y + bh / 2 + 4, { size: 11, weight: 650, color: C.ink, halo: true });
          if (!narrow) text(ctx, `${Math.round(100 / tot)}% efficient`, A.r + 20, y + bh / 2 + 4, { size: 10.5, color: C.ink3 });
          geo.push({ i, x0: 0, x1: w, y0: y - 4, y1: y + bh + 4 });
        });
        let lx = A.l, ly = 16;
        [['hydrogen', H2C], ['carbon capture', CO2C], ['synthesis, compression', FUELC]].forEach(([s, c]) => { const W = measure(ctx, s, 10.5) + 30; if (lx > A.l && lx + W - 16 > w - 8) { lx = A.l; ly += 15; } ctx.fillStyle = alpha(c, 0.8); ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, s, lx + 14, ly, { size: 10.5, color: C.ink2 }); lx += W; });
      }
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => x >= g.x0 && x <= g.x1 && y >= g.y0 && y <= g.y1) || null, cursor: 'pointer', hover: o => { st.hover = o ? o.i : null; upd(); }, down: o => { st.hover = o.i; upd(); } });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'One litre of e-kerosene', value: 'L', name: 'v-l' }, { label: 'All products', value: 'P', name: 'v-p' }], value: st.view, onchange: v => { st.view = v; st.hover = null; fig.resize(); upd(); } });
  segmented(ctl, { label: 'Electrolyser', options: ELZ.map((e, i) => ({ label: e.short, value: i, name: 'elz-' + e.k })), value: st.elz, onchange: v => { st.elz = v; upd(); } });
  segmented(ctl, { label: 'CO₂ from', options: CSRC.map((s, i) => ({ label: s.short, value: i, name: 'src-' + i })), value: st.src, onchange: v => { st.src = v; upd(); } });
  function upd() {
    const R = build();
    if (st.view === 'L') {
      const seg = st.hover != null ? R.segs[st.hover] : null;
      let s = `One litre of e-kerosene holds <b>${KER.lhv} kWh</b> and takes <b>${R.tot.toFixed(1)} kWh</b> to make${R.hi > R.tot + 0.3 ? ` (up to ${R.hi.toFixed(1)} at the high end of the CO₂ estimates)` : ''}: ${KER.h2.toFixed(2)} kg of hydrogen from ${R.E.k === 'sys' ? 'a new commercial electrolyser system' : R.E.k === 'iea' ? 'an electrolyser at the IEA’s 2024 fleet average' : `a ${R.E.k === 'soec' ? 'solid-oxide' : R.E.name} electrolyser`} (${(KER.h2 * (R.E.kwh + R.E.heat)).toFixed(1)} kWh${R.E.heat ? `, ${(KER.h2 * R.E.heat).toFixed(1)} of it steam heat` : ''}), ${KER.co2.toFixed(2)} kg of CO₂ from ${R.S.n.toLowerCase()} (${R.cc.toFixed(1)} kWh), and ${KER.syn.toFixed(1)} kWh to synthesise and upgrade it.`;
      if (seg) s = `<b>${seg[0]}</b>: ${seg[1].toFixed(1)} kWh per litre, ${Math.round(seg[1] / R.tot * 100)}% of the total. ` + s;
      if (st.elz > 0) s += ` ${R.E.name}: ${R.E.note}.`;
      if (st.src >= 2) s += ` Air capture: ${R.S.note}.`;
      ro.innerHTML = s;
    } else {
      const p = PRODUCTS[st.hover ?? 4], E = ELZ[st.elz], el2 = p.h2 * (E.kwh + E.heat), cc = p.co2 * gj(st.src), tot = el2 + cc + p.proc;
      ro.innerHTML = `One tonne of <b>${p.name.toLowerCase()}</b> holds ${p.lhv.toFixed(1)} MWh and takes <b>${tot.toFixed(1)} MWh</b>: ${p.h2} t of hydrogen (${el2.toFixed(1)} MWh)${p.co2 ? `, ${p.co2} t of CO₂ from ${CSRC[st.src].short.toLowerCase()} (${cc.toFixed(1)} MWh)` : ''}${p.proc ? ` and ${p.proc} MWh for ${p.k === 'nh3' ? 'air separation and the Haber–Bosch loop' : 'synthesis, compression and upgrading'}` : ''}. Tap or click a bar to switch products.`;
    }
    fig.invalidate();
  }
  upd();
  hint(el, 'switch <b>CO₂ from</b> to <b>Air, solid</b>, then the electrolyser to <b>SOEC</b>: see which part of the litre each choice moves.');
}
