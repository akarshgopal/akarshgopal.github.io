// Transmission post, part 3: building, squeezing, trading and paying.
//  buildRate   — US miles of new 345 kV+ lines per year (ACEG/Grid Strategies from FERC) and German expansion status (BNetzA) — real
//  getsWeek    — a windy week on a line out of a wind cluster: static vs ambient-adjusted vs dynamic rating, ACSR vs advanced conductor — model
//  interconnect— Germany and a hydro neighbour over one week: what a bigger link does to prices and curtailment — model
//  bill        — what a German household pays per kWh, and how much of it is the network (BNetzA 2025) — real
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import * as D0 from '../lib/draw.js';
import { rrect, line, circle, arrow, clamp, lerp, pathLine, scale } from '../lib/draw.js';
import { curDraw, euroFigure } from '../lib/currency.js';
const { text, measure, axes } = curDraw(D0);
import { controls, slider, segmented, readout, more, hint } from '../lib/ui.js';
import { TX } from '../lib/txdata.js';
import { HOT, LINE, DC, heatLoss, condR } from './txl1.js';

/* ---------------- buildRate ---------------- */
export function buildRate(el) {
  const st = { view: 'us', hover: null };
  let geo = null;
  const DEC = ['#c9c3b6', '#b7b0a2', '#e8c46a', '#e0a03a', alpha(LINE, 0.6), LINE];
  const fig = new Fig(el, {
    label: 'Miles of new high-voltage transmission lines built in the United States each year since 2010, and the status of Germany’s planned grid expansion',
    height: w => w < 600 ? 380 : 330,
    draw(ctx, w, h) {
      const narrow = w < 600;
      if (st.view === 'us') {
        const A = { l: narrow ? 46 : 60, r: w - 16, t: 40, b: h - 34 };
        const { sx, sy } = axes(ctx, { box: A, x0: 2009.4, x1: 2024.6, y0: 0, y1: 5500, xticks: narrow ? [2010, 2014, 2018, 2022] : [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024], xfmt: String, yticks: [0, 1000, 2000, 3000, 4000, 5000], yfmt: v => v.toLocaleString('en'), ylabel: 'miles of new 345 kV+ lines per year' });
        line(ctx, A.l, sy(5000), A.r, sy(5000), HOT, 1.4, [5, 4]);
        text(ctx, narrow ? 'needed: ~5,000 miles a year (DOE, via Grid Strategies)' : 'needed: ~5,000 miles a year (DOE study, as interpreted by Grid Strategies)', A.r - 4, sy(5000) + (narrow ? 14 : -6), { size: 10, color: HOT, align: 'right', halo: true });
        const bw = (sx(1) - sx(0)) * 0.62;
        TX.miles.forEach(r => {
          const x = sx(r[0]), dim = st.hover && st.hover[0] !== r[0];
          ctx.fillStyle = alpha(LINE, dim ? 0.35 : 0.9); ctx.fillRect(x - bw / 2, sy(r[1]), bw, sy(0) - sy(r[1]));
          ctx.fillStyle = alpha(C.solar, dim ? 0.35 : 0.95); ctx.fillRect(x - bw / 2, sy(r[1] + r[2]), bw, sy(r[1]) - sy(r[1] + r[2]));
        });
        ctx.fillStyle = LINE; ctx.fillRect(A.l + 4, A.t + 2, 10, 10); text(ctx, '345 kV', A.l + 18, A.t + 11, { size: 10.5, color: C.ink2 });
        ctx.fillStyle = C.solar; ctx.fillRect(A.l + 70, A.t + 2, 10, 10); text(ctx, '500 kV and above', A.l + 84, A.t + 11, { size: 10.5, color: C.ink2 });
        geo = { A, sx };
      } else {
        const tot = TX.deplan.reduce((s, r) => s + r[1], 0), A = { l: 16, r: w - 16, t: narrow ? 96 : 120, b: narrow ? 146 : 170 };
        text(ctx, `Germany’s legislated transmission projects (BBPlG + EnLAG): ${tot.toLocaleString('en')} km`, A.l, A.t - 30, { size: 12, weight: 650, color: C.ink });
        text(ctx, 'status on 30 June 2026', A.l, A.t - 13, { size: 10.5, color: C.ink3 });
        let x = A.l; const xs = v => v / tot * (A.r - A.l);
        TX.deplan.forEach((r, i) => {
          const wd = xs(r[1]); ctx.fillStyle = DEC[i]; ctx.fillRect(x, A.t, wd - 1, A.b - A.t);
          const ly = A.b + 20 + (narrow ? i * 30 : (i % 2) * 30), lx = narrow ? A.l : x;
          if (narrow) { ctx.fillStyle = DEC[i]; ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, `${r[0]}: ${r[1].toLocaleString('en')} km`, lx + 14, ly, { size: 10.5, color: C.ink2 }); }
          else { line(ctx, x + Math.max(wd / 2, 2), A.b, x + Math.max(wd / 2, 2), ly - 12, C.grid2, 1); text(ctx, `${r[1].toLocaleString('en')} km`, x + Math.max(wd / 2, 2), ly, { size: 10.5, weight: 650, color: C.ink, align: i === 5 ? 'right' : i === 0 ? 'left' : 'center' }); text(ctx, r[0], x + Math.max(wd / 2, 2), ly + 13, { size: 9.5, color: C.ink3, align: i === 5 ? 'right' : i === 0 ? 'left' : 'center' }); }
          x += wd;
        });
        geo = null;
      }
    },
  });
  fig.interact({ hit: (x, y) => geo && x > geo.A.l && x < geo.A.r ? 'h' : null, cursor: 'crosshair', hover: (o, x) => { st.hover = o && geo ? TX.miles.find(r => r[0] === Math.round(geo.sx.inv(x))) || null : null; upd(); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'United States', value: 'us', name: 'br-us' }, { label: 'Germany', value: 'de', name: 'br-de' }], value: st.view, onchange: v => { st.view = v; st.hover = null; upd(); } });
  function upd() {
    if (st.view === 'de') { const d = TX.deplan, tot = d.reduce((s, r) => s + r[1], 0); ro.innerHTML = `Of about ${tot.toLocaleString('en')} km of lines Germany has written into law since 2009, <b>${d[5][1].toLocaleString('en')} km</b> were in operation by mid-2026 and another ${d[4][1].toLocaleString('en')} km were finished but not yet energised. ${d[3][1].toLocaleString('en')} km were approved or under construction; the rest were still being planned.`; }
    else if (st.hover) { const r = st.hover; ro.innerHTML = `<b>${r[0]}</b>: about <b>${(r[1] + r[2]).toLocaleString('en')} miles</b> of new lines at 345 kV and above${r[2] ? ` (${r[2].toLocaleString('en')} at 500 kV or more)` : ''}${r[0] >= 2023 ? ', as revised by FERC in 2025' : ''}.`; }
    else ro.innerHTML = 'The United States built an average of about 1,800 miles of new high-voltage lines a year in 2010–2014, and about 540 a year in 2020–2024.';
    fig.invalidate();
  }
  upd();
}

/* ---------------- shared synthetic week ---------------- */
const hash = k => { const s = Math.sin(k * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const smoothNoise = t => { const i = Math.floor(t), f = t - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u); };
export const WEEK = Array.from({ length: 168 }, (_, t) => {
  const wind = clamp(6.5 + 4.2 * Math.sin(2 * Math.PI * (t - 10) / 70) + 2.2 * Math.sin(2 * Math.PI * t / 19 + 1) + 3 * (smoothNoise(t / 6) - 0.5), 0.3, 22);
  const hod = t % 24, sun = Math.max(0, Math.sin(Math.PI * (hod - 6) / 13)) * (0.55 + 0.45 * smoothNoise(t / 9 + 40));
  const temp = 14 + 6 * Math.sin(2 * Math.PI * (hod - 9) / 24) + 3 * (smoothNoise(t / 30 + 7) - 0.5);
  return { wind, sun: sun * 850, temp, hod };
});
const farm = v => v < 3 ? 0 : v < 12 ? Math.pow((v - 3) / 9, 2.2) : v < 25 ? 1 : 0;

/* ---------------- getsWeek ---------------- */
const CONDS = { acsr: { R20: 0.1095e-3 * 1.02, a: 0.00403, Tmax: 80, D: 0.0224 }, accc: { R20: 0.083e-3 * 1.02, a: 0.00403, Tmax: 180, D: 0.0224 } }; // same basis as sagDLR (txl1.js)
const ratingMW = (c, Ta, v, S) => { const I = Math.sqrt(Math.max(0, heatLoss(c.Tmax, Ta, v, S, c.D)) / condR(c, c.Tmax)); return Math.sqrt(3) * 380 * I * 4 / 1000; };
export function getsWeek(el) {
  const st = { mode: 'static', c: 'acsr', cap: 3.0 };
  const series = () => {
    const c = CONDS[st.c], stat = ratingMW(c, 35, 0.6, 900);
    return WEEK.map(d => {
      const flow = st.cap * 1000 * farm(d.wind);
      const r = st.mode === 'static' ? stat : st.mode === 'aar' ? ratingMW(c, d.temp, 0.6, d.sun > 1 ? 900 : 0) : Math.min(1.5 * stat, ratingMW(c, d.temp, Math.max(0.3, d.wind * 0.2), d.sun));
      return { flow, r, cut: Math.max(0, flow - r) };
    });
  };
  const fig = new Fig(el, {
    label: 'One windy week on a line carrying the output of a wind cluster: the line’s rating under different rating methods and conductors, and the wind energy curtailed',
    height: w => w < 600 ? 360 : 320,
    draw(ctx, w, h) {
      const narrow = w < 600, S = series();
      const A = { l: narrow ? 46 : 60, r: w - 16, t: narrow ? 54 : 40, b: h - 36 };
      const ymax = Math.max(3500, ...S.map(s => s.r)) * 1.05;
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 168, y0: 0, y1: ymax, xticks: [0, 24, 48, 72, 96, 120, 144, 168], xfmt: v => v === 168 ? '' : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][v / 24], yfmt: v => v ? (v / 1000).toFixed(1) + ' GW' : '0', ylabel: 'power on the line' });
      // flow area
      ctx.beginPath(); ctx.moveTo(sx(0), sy(0)); S.forEach((s, t) => ctx.lineTo(sx(t), sy(Math.min(s.flow, s.r)))); ctx.lineTo(sx(167), sy(0)); ctx.closePath(); ctx.fillStyle = alpha(C.wind, 0.45); ctx.fill();
      // curtailed
      S.forEach((s, t) => { if (s.cut > 0) { ctx.fillStyle = alpha(HOT, 0.55); ctx.fillRect(sx(t), sy(s.flow), sx(t + 1) - sx(t) + 0.5, sy(s.r) - sy(s.flow)); } });
      pathLine(ctx, S.map((s, t) => [sx(t), sy(s.r)]), C.ink, 2);
      const lt = narrow ? 50 : 2; // on a phone the label would cross Tuesday's peak: put it over the calm midweek
      text(ctx, st.mode === 'static' ? 'static rating' : st.mode === 'aar' ? 'ambient-adjusted rating' : 'dynamic rating', sx(lt), sy(S[lt].r) - 7, { size: 10.5, weight: 650, color: C.ink, halo: true });
      let lx = narrow ? A.l : A.l + 200, ly = narrow ? 14 : A.t - 22;
      ctx.fillStyle = alpha(C.wind, 0.6); ctx.fillRect(lx, ly - 8, 10, 10); text(ctx, 'wind power delivered', lx + 14, ly + 1, { size: 10.5, color: C.ink2 });
      ctx.fillStyle = alpha(HOT, 0.6); ctx.fillRect(lx + 140, ly - 8, 10, 10); text(ctx, 'curtailed: the line is full', lx + 154, ly + 1, { size: 10.5, color: C.ink2 });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Line rating', options: [{ label: 'Static', value: 'static', name: 'r-static' }, { label: 'Ambient-adjusted', value: 'aar', name: 'r-aar' }, { label: 'Dynamic', value: 'dlr', name: 'r-dlr' }], value: st.mode, onchange: v => { st.mode = v; upd(); } });
  segmented(ctl, { label: 'Conductor', options: [{ label: 'Existing (ACSR)', value: 'acsr', name: 'g-acsr' }, { label: 'Reconductored (carbon-core)', value: 'accc', name: 'g-accc' }], value: st.c, onchange: v => { st.c = v; upd(); } });
  function upd() {
    const S = series(), tot = S.reduce((s, x) => s + x.flow, 0), cut = S.reduce((s, x) => s + x.cut, 0);
    const base = (() => { const k = st.mode, c = st.c; st.mode = 'static'; st.c = 'acsr'; const b = series().reduce((s, x) => s + x.cut, 0); st.mode = k; st.c = c; return b; })();
    ro.innerHTML = `Over the week the wind cluster could deliver ${(tot / 1000).toFixed(0)} GWh; <b>${(cut / 1000).toFixed(1)} GWh</b> (${(cut / tot * 100).toFixed(0)}%) is curtailed because the line is full` + (st.mode !== 'static' || st.c !== 'acsr' ? `, against ${(base / 1000).toFixed(1)} GWh with a static rating on the existing conductor.` : '. Windy hours are exactly when the wind farms produce most — and when the wind cools the line.');
    fig.invalidate();
  }
  upd();
}

/* ---------------- interconnect ---------------- */
export function interconnect(el) {
  const st = { link: 1.4 };
  const sim = () => WEEK.map((d, t) => {
    const demand = 58 + 10 * Math.sin(2 * Math.PI * (d.hod - 7) / 24) * (d.hod > 5 && d.hod < 23 ? 1 : 0.4);
    const wind = 55 * farm(d.wind * 1.05) * 0.85, solar = 85 * d.sun / 850 * 0.55;
    const res = demand - wind - solar, target = (45 - 20) / 2.2;
    const imp = clamp(res - target, -st.link, st.link); // + import from hydro neighbour, − export
    const r2 = res - imp;
    const price = r2 < 0 ? -5 : Math.min(250, 20 + 2.2 * r2);
    return { res, imp, price, curt: Math.max(0, -r2) };
  });
  const fig = new Fig(el, {
    label: 'One week of German wholesale prices with a link of chosen size to a hydropower neighbour whose price stays at about $51 per megawatt-hour',
    height: w => w < 600 ? 360 : 320,
    draw(ctx, w, h) {
      const narrow = w < 600, S = sim(), base = (() => { const k = st.link; st.link = 0; const b = sim(); st.link = k; return b; })();
      const A = { l: narrow ? 46 : 60, r: w - 16, t: narrow ? 54 : 40, b: h - 36 };
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 168, y0: -20, y1: 140, xticks: [0, 24, 48, 72, 96, 120, 144, 168], xfmt: v => v === 168 ? '' : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][v / 24], yticks: [0, 40, 80, 120], yfmt: v => '€' + v, ylabel: 'German wholesale price, €/MWh' });
      line(ctx, A.l, sy(45), A.r, sy(45), C.hydro, 1.2, [5, 4]); text(ctx, narrow ? 'hydro: €45' : 'neighbour’s hydro: €45', sx(50), sy(45) + 14, { size: 10, color: C.hydro, halo: true }); // under the line from Wednesday to Thursday, where prices stay high
      pathLine(ctx, base.map((s, t) => [sx(t + 0.5), sy(clamp(s.price, -20, 140))]), alpha(C.ink3, 0.8), 1.4, [3, 2]);
      pathLine(ctx, S.map((s, t) => [sx(t + 0.5), sy(clamp(s.price, -20, 140))]), C.price, 2.2);
      const lx = narrow ? A.l : A.l + 220, ly = narrow ? 14 : A.t - 22;
      line(ctx, lx, ly - 3, lx + 16, ly - 3, C.ink3, 1.4, [3, 2]); text(ctx, 'no link', lx + 20, ly + 1, { size: 10.5, color: C.ink2 });
      line(ctx, lx + 80, ly - 3, lx + 96, ly - 3, C.price, 2.2); text(ctx, `with a ${st.link} GW link`, lx + 100, ly + 1, { size: 10.5, color: C.ink2 });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Interconnector capacity', min: 0, max: 12, step: 0.2, value: st.link, color: C.hydro, fmt: v => v.toFixed(1) + ' GW', oninput: v => { st.link = v; upd(); }, name: 'link' });
  function upd() {
    const S = sim(), k = st.link; st.link = 0; const B = sim(); st.link = k;
    const avg = a => a.reduce((s, x) => s + x.price, 0) / a.length, sd = a => { const m = avg(a); return Math.sqrt(a.reduce((s, x) => s + (x.price - m) ** 2, 0) / a.length); };
    const curt = a => a.reduce((s, x) => s + x.curt, 0);
    ro.innerHTML = `With a ${st.link.toFixed(1)} GW link, German prices swing with a standard deviation of <b>€${sd(S).toFixed(0)}</b> (no link: €${sd(B).toFixed(0)}), and <b>${curt(S).toFixed(0)} GWh</b> of wind and solar is wasted (no link: ${curt(B).toFixed(0)} GWh). The neighbour stores the surplus as water behind its dams and sends it back when the wind drops.`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, typeof ctl !== 'undefined' ? ctl : controls(el), 'eu-interconnect');
}

/* ---------------- bill ---------------- */
export function bill(el) {
  const st = { hover: null, grp: 'parts' };
  let geo = [];
  const GC = { energy: C.procurement, network: LINE, levy: C.taxes, tax: lighten(C.taxes, 0.3) };
  const GN = { energy: 'energy and supplier', network: 'network-related', levy: 'concession fees and levies', tax: 'taxes' };
  const fig = new Fig(el, {
    label: 'What a German household paid per kilowatt-hour on 1 April 2025, by component, with the network-related parts highlighted',
    height: w => w < 600 ? 210 : 220,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: 16, r: w - 16, t: 50, b: narrow ? 100 : 130 }, tot = TX.bill.reduce((s, r) => s + r[1], 0);
      const xs = v => v / tot * (A.r - A.l);
      text(ctx, `${tot.toFixed(2)} ct per kWh`, A.l, A.t - 14, { size: 12, weight: 650, color: C.ink });
      let x = A.l; geo = [];
      const rows = st.grp === 'parts' ? TX.bill.map(r => [r[0], r[1], r[2]]) : Object.keys(GN).map(g => [GN[g], TX.bill.filter(r => r[2] === g).reduce((s, r) => s + r[1], 0), g]);
      rows.forEach((r, i) => {
        const wd = xs(r[1]), sel = st.hover === i;
        ctx.fillStyle = alpha(GC[r[2]], st.hover == null || sel ? (i % 2 && st.grp === 'parts' ? 0.75 : 0.95) : 0.35); ctx.fillRect(x, A.t, wd - 1, A.b - A.t);
        if (wd > 34) text(ctx, r[1].toFixed(r[1] < 1 ? 2 : 1), x + wd / 2, A.t + (A.b - A.t) / 2 + 4, { size: 10.5, weight: 650, color: '#fff', align: 'center' });
        geo.push({ i, x0: x, x1: x + wd, r });
        x += wd;
      });
      // group legend
      let lx = A.l, ly = A.b + 26;
      Object.keys(GN).forEach(g => { const s = GN[g] + ' ' + (TX.bill.filter(r => r[2] === g).reduce((s2, r) => s2 + r[1], 0) / tot * 100).toFixed(0) + '%', W = measure(ctx, s, 10.5) + 28; if (lx + W > w - 10) { lx = A.l; ly += 17; } ctx.fillStyle = GC[g]; ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, s, lx + 14, ly, { size: 10.5, color: C.ink2, weight: g === 'network' ? 700 : 450 }); lx += W; });
      if (st.hover != null && geo[st.hover]) { const g = geo[st.hover]; text(ctx, `${g.r[0]}: ${g.r[1].toFixed(2)} ct`, clamp((g.x0 + g.x1) / 2, A.l + 60, A.r - 60), A.t - 14 + (narrow ? 0 : 0), { size: 11, weight: 650, color: darken(GC[g.r[2]], 0.25), align: narrow ? 'center' : 'center', halo: true }); }
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => x >= g.x0 && x < g.x1 && y > 40 && y < 140) || null, cursor: 'pointer', hover: o => { st.hover = o ? o.i : null; fig.invalidate(); }, down: o => { st.hover = o.i; fig.invalidate(); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'Every component', value: 'parts', name: 'b-parts' }, { label: 'Grouped', value: 'grp', name: 'b-grp' }], value: st.grp, onchange: v => { st.grp = v; st.hover = null; fig.invalidate(); } });
  const net = TX.bill.filter(r => r[2] === 'network').reduce((s, r) => s + r[1], 0), tot = TX.bill.reduce((s, r) => s + r[1], 0);
  ro.innerHTML = `The network tariff alone was <b>11.02 ct</b> of ${tot.toFixed(2)} ct (${(11.02 / tot * 100).toFixed(1)}%). Add metering and the two surcharges that pay for offshore grid connections and spread network costs between regions, and the network accounts for <b>${net.toFixed(2)} ct</b>, about <b>${(net / tot * 100).toFixed(0)}%</b> — some <b>€${Math.round(net * 35)}</b> a year for a household using 3,500 kWh, before VAT.`;
  euroFigure(el, fig, typeof ctl !== 'undefined' ? ctl : controls(el), 'eu-bill');
}

/* ---------------- networkEuro ---------------- */
// Net network charges for standard-load-profile households at low voltage, 2025, ten large German distribution
// operators: [name, short, basic charge €/year, energy charge ct/kWh]. SMARD (Bundesnetzagentur), "Netzentgelte";
// SMARD's household column is energy charge + basic charge spread over 3,500 kWh. Transmission ≈ 30% of the
// household network charge, distribution ≈ 70% (Umweltbundesamt, national average, not operator-specific).
export const DSO = [
  ['Westnetz', 'Westnetz', 80.30, 9.98], ['Netze BW', 'Netze BW', 107.96, 9.73], ['Bayernwerk Netz', 'Bayernwerk', 98.55, 7.35],
  ['Stromnetz Berlin', 'Berlin', 33.36, 9.97], ['Avacon Netz', 'Avacon', 80.52, 9.36], ['E.DIS Netz', 'E.DIS', 76.65, 8.65],
  ['Mitteldeutsche Netzgesellschaft', 'MITNETZ', 73.00, 7.52], ['EWE Netz', 'EWE', 112.21, 4.89], ['RheinNetz', 'RheinNetz', 160.00, 5.77],
  ['Hamburger Energienetze', 'Hamburg', 72.00, 12.11],
];
const TSO_SHARE = 0.3;
export const netCt = (d, kwh) => d[3] + d[2] * 100 / kwh;
export function networkEuro(el) {
  const st = { d: 0, kwh: 3500 };
  let geo = null;
  const E0 = 1000, E1 = 8000, Y1 = 25, T_COL = darken(LINE, 0.2), D_COL = lighten(LINE, 0.35);
  const fig = new Fig(el, {
    label: 'Where a German household’s network charge goes, and how the charge per kilowatt-hour changes with annual use for ten network operators; drag the house along the curve',
    height: w => w < 600 ? 480 : 430,
    draw(ctx, w, h) {
      const narrow = w < 600, d = DSO[st.d], c = netCt(d, st.kwh), L = 16, R = w - 16;
      // ---- the journey: power station → transmission → distribution → house
      const py = narrow ? 40 : 44, xT0 = L + 18, xT1 = L + (R - L) * 0.42, xH = R - 22;
      // pylon
      ctx.strokeStyle = T_COL; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(xT0 - 9, py + 14); ctx.lineTo(xT0, py - 16); ctx.lineTo(xT0 + 9, py + 14); ctx.moveTo(xT0 - 11, py - 8); ctx.lineTo(xT0 + 11, py - 8); ctx.stroke();
      line(ctx, xT0, py - 8, xT1, py - 8, T_COL, 3);
      // substation: two coupled coils
      circle(ctx, xT1 + 4, py - 8, 7, '#fff', T_COL, 2); circle(ctx, xT1 + 13, py - 8, 7, '#fff', D_COL, 2);
      line(ctx, xT1 + 20, py - 8, xH - 12, py - 8, D_COL, 3);
      // smaller transformers along distribution
      [0.4, 0.75].forEach(f => { const x = lerp(xT1 + 20, xH - 12, f); circle(ctx, x - 3, py - 8, 5, '#fff', D_COL, 1.6); circle(ctx, x + 3, py - 8, 5, '#fff', D_COL, 1.6); });
      // house
      ctx.beginPath(); ctx.moveTo(xH - 12, py - 2); ctx.lineTo(xH, py - 16); ctx.lineTo(xH + 12, py - 2); ctx.lineTo(xH + 12, py + 12); ctx.lineTo(xH - 12, py + 12); ctx.closePath(); ctx.fillStyle = alpha(C.solar, 0.25); ctx.fill(); ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.4; ctx.stroke();
      text(ctx, narrow ? 'transmission' : 'transmission: 380 and 220 kV, four operators', (xT0 + xT1) / 2 + (narrow ? 12 : 6), py + 12, { size: 10.5, color: T_COL, weight: 650, align: 'center' });
      text(ctx, narrow ? `distribution: ${d[1]}` : `distribution: 110 kV → 20 kV → 400 V, ${d[0]}`, (xT1 + xH) / 2, py + 12, { size: 10.5, color: darken(D_COL, 0.35), weight: 650, align: 'center' });
      // ---- the charge, as a bar under the journey: length is ct/kWh on a fixed scale
      const by = py + 30, bh = 22, sc = (R - L) / 22, tW = c * TSO_SHARE * sc, dW = c * (1 - TSO_SHARE) * sc;
      ctx.fillStyle = T_COL; ctx.fillRect(L, by, tW, bh); ctx.fillStyle = D_COL; ctx.fillRect(L + tW, by, dW, bh);
      const fixW = d[2] * 100 / st.kwh * sc; // the basic-charge part, hatched at the right end
      ctx.save(); ctx.beginPath(); ctx.rect(L + tW + dW - fixW, by, fixW, bh); ctx.clip(); ctx.strokeStyle = alpha('#fff', 0.7); ctx.lineWidth = 1.5; for (let x = L + tW + dW - fixW - bh; x < L + tW + dW; x += 6) { ctx.beginPath(); ctx.moveTo(x, by + bh); ctx.lineTo(x + bh, by); ctx.stroke(); } ctx.restore();
      text(ctx, `${(c * TSO_SHARE).toFixed(1)} ct`, L + tW / 2, by + 15, { size: 10.5, color: '#fff', weight: 700, align: 'center' });
      text(ctx, `${(c * (1 - TSO_SHARE)).toFixed(1)} ct`, L + tW + dW / 2, by + 15, { size: 10.5, color: darken(D_COL, 0.55), weight: 700, align: 'center' });
      const tl = `${c.toFixed(1)} ct per kWh`, right = L + tW + dW + 8 + measure(ctx, tl, 12, 700) < R;
      text(ctx, tl, right ? L + tW + dW + 8 : L + tW + dW - 4, right ? by + 16 : by + bh + 14, { size: 12, weight: 700, color: C.ink, align: right ? 'left' : 'right' });
      text(ctx, narrow ? 'hatched: the fixed basic charge' : `hatched: the fixed €${d[2].toFixed(0)}-a-year basic charge, spread over your kWh`, L, by + bh + 14, { size: 10, color: C.ink3 });
      // ---- chart: charge per kWh against annual use, one curve per operator
      const A = { l: narrow ? 40 : 54, r: R - (narrow ? 4 : 90), t: by + bh + (narrow ? 56 : 50), b: h - 32 };
      const { sx, sy } = axes(ctx, { box: A, x0: E0, x1: E1, y0: 0, y1: Y1, xticks: [1000, 2000, 3500, 5000, 8000], xfmt: v => v.toLocaleString('en'), yticks: [0, 5, 10, 15, 20, 25].map(c => c / 1.13), yfmt: v => Math.round(v * 1.13) + '¢', ylabel: 'network charge per kWh', xlabel: 'your electricity use, kWh a year' });
      line(ctx, sx(3500), A.t, sx(3500), A.b, C.grid2, 1, [3, 3]);
      text(ctx, 'typical household', sx(3500) + 4, A.t + 10, { size: 9.5, color: C.ink3 });
      const pts = d0 => { const p = []; for (let e = E0; e <= E1; e += 100) p.push([sx(e), sy(Math.min(Y1, netCt(d0, e)))]); return p; };
      DSO.forEach((d0, i) => { if (i !== st.d) pathLine(ctx, pts(d0), alpha(C.ink3, 0.45), 1.2); });
      pathLine(ctx, pts(d), LINE, 2.6);
      if (!narrow) { // name the extremes and the chosen one at the right edge
        const ends = DSO.map((d0, i) => ({ i, y: sy(netCt(d0, E1)) })).sort((a, b) => a.y - b.y);
        const show = new Set([ends[0].i, ends[ends.length - 1].i, st.d]); let lastY = -99;
        ends.filter(e => show.has(e.i)).forEach(e => { const y = Math.max(e.y + 4, lastY + 13); lastY = y; text(ctx, DSO[e.i][1], A.r + 6, y, { size: 10, color: e.i === st.d ? LINE : C.ink3, weight: e.i === st.d ? 700 : 450 }); });
      }
      const hx = sx(st.kwh), hy = sy(c);
      // the handle is the house itself
      ctx.beginPath(); ctx.moveTo(hx - 10, hy - 1); ctx.lineTo(hx, hy - 11); ctx.lineTo(hx + 10, hy - 1); ctx.lineTo(hx + 10, hy + 9); ctx.lineTo(hx - 10, hy + 9); ctx.closePath(); ctx.fillStyle = LINE; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      text(ctx, '↔', hx, hy + 7, { size: 10, color: '#fff', align: 'center', weight: 700, small: true });
      const yl = `€${Math.round(d[2] + d[3] * st.kwh / 100)} a year`;
      text(ctx, yl, clamp(hx, A.l + 40, A.r - 40), hy - 18, { size: 11, weight: 650, color: LINE, align: 'center', halo: true });
      geo = { A, sx, sy, hx, hy, pts: DSO.map(pts) };
    },
  });
  const setE = x => { st.kwh = Math.round(clamp(geo.sx.inv(x), E0, E1) / 100) * 100; upd(); };
  fig.interact({
    hit: (x, y) => geo && x > geo.A.l - 10 && x < geo.A.r + 10 && y > geo.A.t - 10 && y < geo.A.b + 6 ? 'e' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.hx, y - geo.hy) < 26 ? 'e' : null,
    cursor: 'ew-resize', down: (o, x) => setE(x), move: (o, x) => setE(x),
  });
  // a plain click (or tap, which never blocks scrolling) on another operator's curve selects it
  fig.canvas.addEventListener('click', e => {
    if (!geo) return; const r = fig.canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (Math.hypot(x - geo.hx, y - geo.hy) < 14) return;
    let best = -1, bd = 9; geo.pts.forEach((p, i) => p.forEach(q => { const dd = Math.hypot(q[0] - x, q[1] - y); if (dd < bd) { bd = dd; best = i; } }));
    if (best >= 0 && best !== st.d) { st.d = best; op.set(best); upd(); }
  });
  const ctl = controls(el), ro = readout(el);
  const mo = more(ctl, 'More: pick a network operator');
  const op = segmented(mo, { label: 'Network operator (2025)', options: DSO.map((d, i) => ({ label: d[1], value: i, name: 'dso-' + i })), value: st.d, onchange: v => { st.d = v; upd(); } });
  function upd() {
    const d = DSO[st.d], c = netCt(d, st.kwh), yr = d[2] + d[3] * st.kwh / 100, fixShare = d[2] / yr;
    const at = DSO.map(x => netCt(x, 3500)), lo = at.indexOf(Math.min(...at)), hi = at.indexOf(Math.max(...at));
    ro.innerHTML = `<b>${d[0]}</b>, ${st.kwh.toLocaleString('en')} kWh a year: <b>€${Math.round(yr)}</b> a year in network charges, <b>${c.toFixed(1)} ct per kWh</b>, of which the fixed €${d[2].toFixed(0)} basic charge is ${Math.round(fixShare * 100)}%. Roughly 30 cents of every network dollar pays for the transmission grid and 70 for the regional and local networks. At 3,500 kWh these ten operators charge from ${at[lo].toFixed(1)} ct (${DSO[lo][1]}) to ${at[hi].toFixed(1)} ct (${DSO[hi][1]}).`;
    fig.invalidate();
  }
  upd();
  hint(el, 'drag the house down to 1,500 kWh and watch the fixed charge swell the price of each kWh; then tap the top curve.');
  euroFigure(el, fig, ctl, 'eu-netEuro');
}

/* ---------------- buildGrid ---------------- */
// Germany: BMWE, "Aktueller Stand des Netzausbaus (Übertragungsnetz)", June 2026 (BMWE controlling, Q4/2025):
// legislated EnLAG + BBPlG lines by stage, and km approved / put into operation each year (2026 = forecast).
// US: FERC via Grid Strategies (TX.miles), and the ~5,000 miles a year Grid Strategies reads from DOE's 2024 study.
const DE_STOCK = [['not yet in approval', 1043, '#c9c3b6'], ['spatial planning', 368, '#b7b0a2'], ['planning approval', 6165, '#e8c46a'], ['under construction', 6301, '#e0a03a'], ['in operation', 2904, null]];
const DE_OP = [[2021, 383], [2022, 407], [2023, 297], [2024, 405], [2025, 352], [2026, 964, true]];
const DE_APP = [[2021, 292], [2022, 509], [2023, 1047], [2024, 1799], [2025, 2208], [2026, 757, true]];
const DE_TOT = 16779, DE_LEFT = DE_TOT - 2904 - 964; // km still to put into operation after the 2026 forecast
const US_NEED = 5000, US_LEFT = US_NEED * 11; // the DOE-implied pace, kept up 2025–2035
export function buildGrid(el) {
  const st = { view: 'de', rate: { de: 964, us: 540 } };
  let geo = null;
  const fig = new Fig(el, {
    label: 'How long it takes to finish the grid: kilometres of transmission line built per year, and a block of the remaining work whose height you drag; a taller block finishes sooner',
    height: w => w < 600 ? 460 : 400,
    draw(ctx, w, h) {
      const narrow = w < 600, de = st.view === 'de', R = st.rate[st.view], left = de ? DE_LEFT : US_LEFT, unit = de ? 'km' : 'miles';
      let top = 18;
      if (de) { // the pipeline: where the 16,779 km stand
        const L = 16, Rr = w - 16, bt = 30, bh = 16; let x = L;
        text(ctx, `Germany’s ${DE_TOT.toLocaleString('en')} km of legislated lines, end of 2025`, L, bt - 8, { size: 11, weight: 650, color: C.ink });
        DE_STOCK.forEach(([n, km, col], i) => { const wd = km / DE_TOT * (Rr - L); ctx.fillStyle = col || LINE; ctx.fillRect(x, bt, wd - 1, bh); if (!narrow && wd > 60) text(ctx, `${n} ${km.toLocaleString('en')}`, x + 3, bt + bh + 12, { size: 9.5, color: C.ink2 }); x += wd; });
        if (narrow) text(ctx, 'grey: not yet approved · yellow: in approval · orange: building · blue: in operation', L, bt + bh + 12, { size: 9, color: C.ink3, small: true });
        top = bt + bh + 36;
      }
      const A = { l: narrow ? 46 : 58, r: w - 16, t: top + 14, b: h - 34 };
      const X0 = de ? 2021 : 2010, X1 = de ? 2062 : 2046, Y1 = de ? 2500 : 6000;
      const { sx, sy } = axes(ctx, { box: A, x0: X0, x1: X1, y0: 0, y1: Y1, xticks: de ? [2021, 2030, 2040, 2050, 2060] : [2010, 2020, 2030, 2040], xfmt: String, yticks: de ? [0, 500, 1000, 1500, 2000, 2500] : [0, 2000, 4000, 6000], yfmt: v => v.toLocaleString('en'), ylabel: `${unit} of new line per year` });
      // history
      const bw = Math.max(2, (sx(1) - sx(0)) * 0.8);
      if (de) {
        DE_APP.forEach(([y, v, f]) => { ctx.strokeStyle = '#e0a03a'; ctx.lineWidth = 1.3; ctx.setLineDash(f ? [3, 2] : []); ctx.strokeRect(sx(y) + 0.5, sy(v), bw - 1, sy(0) - sy(v)); ctx.setLineDash([]); });
        DE_OP.forEach(([y, v, f]) => { ctx.fillStyle = alpha(LINE, f ? 0.45 : 0.95); ctx.fillRect(sx(y) + 2, sy(v), bw - 4, sy(0) - sy(v)); });
        const lx = A.l + 8, ly = A.t + 4;
        ctx.strokeStyle = '#e0a03a'; ctx.strokeRect(lx, ly - 8, 10, 10); text(ctx, 'approved', lx + 14, ly + 1, { size: 10, color: C.ink2 });
        ctx.fillStyle = LINE; ctx.fillRect(lx + 76, ly - 8, 10, 10); text(ctx, 'put into operation (2026: forecast)', lx + 90, ly + 1, { size: 10, color: C.ink2 });
      } else {
        TX.miles.forEach(r => { ctx.fillStyle = alpha(LINE, 0.95); ctx.fillRect(sx(r[0]) + 1, sy(r[1] + r[2]), bw - 2, sy(0) - sy(r[1] + r[2])); });
        line(ctx, sx(2025), sy(US_NEED), sx(2036), sy(US_NEED), HOT, 1.4, [5, 4]);
        text(ctx, 'DOE-implied need: ~5,000 a year to 2035', sx(2025) + 4, sy(US_NEED) - 6, { size: 10, color: HOT, halo: true });
        text(ctx, 'built, 345 kV and above', A.l + 8, A.t + 5, { size: 10, color: C.ink2 });
      }
      // the block of remaining work: area is fixed, so taller means shorter
      const x0 = de ? 2027 : 2025, end = x0 + left / R, xe = Math.min(end, X1), over = end > X1;
      ctx.fillStyle = alpha(LINE, 0.22); ctx.fillRect(sx(x0), sy(R), sx(xe) - sx(x0), sy(0) - sy(R));
      ctx.strokeStyle = LINE; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sx(x0), sy(0)); ctx.lineTo(sx(x0), sy(R)); ctx.lineTo(sx(xe), sy(R)); if (!over) ctx.lineTo(sx(xe), sy(0)); ctx.stroke();
      if (over) arrow(ctx, sx(X1) - 26, sy(R) - 10, sx(X1) - 4, sy(R) - 10, LINE, 1.6, 6);
      if (de) {
        line(ctx, sx(2045), A.t + 14, sx(2045), A.b, alpha(C.ink3, 0.7), 1, [4, 3]);
        if (narrow) { text(ctx, '2045:', sx(2045) + 4, A.t + 24, { size: 10, color: C.ink3, halo: true }); text(ctx, 'climate-neutral target', sx(2045) + 4, A.t + 37, { size: 10, color: C.ink3, halo: true }); }
        else text(ctx, '2045: climate-neutral target', sx(2045) + 4, A.t + 24, { size: 10, color: C.ink3, halo: true });
      }
      const doneY = Math.floor(end), endLab = `${de ? 'all in operation' : '55,000 miles built'}: ${over ? 'after ' + X1 + ' (' + doneY + ')' : doneY}`;
      const inside = sy(0) - sy(R) > 34 && sx(xe) - sx(x0) > 150;
      text(ctx, `${left.toLocaleString('en')} ${unit} to go`, sx(x0) + 8, inside ? sy(R) + 16 : sy(R) - 22, { size: 11, weight: 650, color: darken(LINE, 0.3), halo: true });
      const goW = measure(ctx, `${left.toLocaleString('en')} ${unit} to go`, 11) + 16, exR = over ? sx(X1) - 4 : sx(xe) - 4, clash = !inside && exR - measure(ctx, endLab, 11) < sx(x0) + goW;
      text(ctx, endLab, clash ? sx(x0) + 8 : exR, inside ? sy(R) + 32 : clash ? sy(R) - 38 : sy(R) - 8, { size: 11, weight: 700, color: C.ink, align: clash ? 'left' : 'right', halo: true });
      const hx = sx(x0), hy = sy(R);
      circle(ctx, hx, hy, 11, LINE, '#fff', 2); text(ctx, '↕', hx, hy + 4, { size: 11, color: '#fff', align: 'center', weight: 700 });
      geo = { A, sx, sy, hx, hy, x0 };
    },
  });
  const setR = y => { const v = geo.sy.inv(y), lo = st.view === 'de' ? 150 : 200, hi = st.view === 'de' ? 2500 : 6000; st.rate[st.view] = Math.round(clamp(v, lo, hi) / (st.view === 'de' ? 10 : 50)) * (st.view === 'de' ? 10 : 50); upd(); };
  fig.interact({
    hit: (x, y) => geo && x > geo.sx(geo.x0) - 16 && x < geo.A.r && y > geo.A.t && y < geo.A.b + 4 ? 'r' : null,
    touchHit: (x, y) => geo && Math.hypot(x - geo.hx, y - geo.hy) < 26 ? 'r' : null,
    cursor: 'ns-resize', down: (o, x, y) => setR(y), move: (o, x, y) => setR(y),
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Country', options: [{ label: 'Germany', value: 'de', name: 'bg-de' }, { label: 'United States', value: 'us', name: 'bg-us' }], value: st.view, onchange: v => { st.view = v; upd(); } });
  function upd() {
    const R = st.rate[st.view];
    if (st.view === 'de') { const end = 2027 + DE_LEFT / R; ro.innerHTML = `At <b>${R.toLocaleString('en')} km a year</b> from 2027, the last of Germany’s legislated lines would go into operation in <b>${Math.floor(end)}</b>. 2026’s forecast is 964 km; from 2021 to 2025 Germany managed 297–407 km a year (average 369), a pace that would take until ${Math.floor(2027 + DE_LEFT / 369)}. Approvals ran far ahead, a record 2,208 km in 2025, and 6,301 km are now being built.`; }
    else { const end = 2025 + US_LEFT / R; ro.innerHTML = `At <b>${R.toLocaleString('en')} miles a year</b>, the United States would take until <b>${Math.floor(end)}</b> to build the 55,000 miles that the DOE-implied pace of about 5,000 a year would add from 2025 to 2035. It averaged about 1,800 a year in 2010–2014 and 540 in 2020–2024.`; }
    fig.invalidate();
  }
  upd();
  hint(el, 'drag the block’s corner up: a taller block is a shorter one, because the work left does not change.');
}
