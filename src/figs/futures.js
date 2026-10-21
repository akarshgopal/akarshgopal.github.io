import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, measure, scale } from '../lib/draw.js';
import { USD_PER_EUR } from '../lib/currency.js';
import { controls, slider, segmented, button, readout } from '../lib/ui.js';
import { loadProfile, solarShape, TECHS } from '../lib/market.js';

// ---------------------------------------------------------------- heat pump (rule-of-thumb COP; household price presets, all in US cents)
const copOf = (tOut, tFlow) => { const Th = tFlow + 273.15 + 5, Tc = tOut + 273.15 - 5; return clamp(0.5 * Th / Math.max(5, Th - Tc), 1, 8); };
export function heatPump(el) {
  // Household prices per kWh in US cents. Germany: BDEW 2026 new-customer electricity (37.0 euro cents) and a 12 euro-cent gas
  // default, both at the ECB 2026 year-to-date rate. UK: Ofgem cap Oct–Dec 2025 (26.35p / 6.29p, taken as 31.0 / 7.4 euro cents
  // at ≈£0.85/€) at the ECB 2025 rate. US: EIA 2025 averages (17.3¢; gas $15.34/Mcf ≈ 5.05¢/kWh), already in dollars.
  const r2 = v => Math.round(v * 100) / 100;
  const HP = {
    de: { elec: r2(37.0 * USD_PER_EUR[2026]), gas: r2(12 * USD_PER_EUR[2026]), tOut: 2 },
    uk: { elec: r2(31.0 * USD_PER_EUR[2025]), gas: r2(7.4 * USD_PER_EUR[2025]), tOut: 5 },
    us: { elec: 17.3, gas: 5.05, tOut: 0 },
  };
  const st = { tOut: 2, tFlow: 45, ...HP.de, phase: 0 };
  const fig = new Fig(el, {
    label: 'Heat pump explorer: efficiency versus outdoor and radiator temperature, and running cost compared with a gas boiler',
    height: w => w < 600 ? 560 : 360, animated: true,
    step(dt) { st.phase += dt * copOf(st.tOut, st.tFlow) * 0.25; },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const cop = copOf(st.tOut, st.tFlow);
      // schematic: house + outdoor unit, energy arrows proportional
      const S = narrow ? { x: 16, y: 16, w: w - 32, h: 220 } : { x: 16, y: 20, w: w * 0.44, h: h - 40 };
      const hx = S.x + S.w * 0.52, hy = S.y + S.h * 0.18, hw = S.w * 0.44, hh = S.h * 0.68;
      // house
      ctx.beginPath(); ctx.moveTo(hx, hy + hh * 0.3); ctx.lineTo(hx + hw / 2, hy); ctx.lineTo(hx + hw, hy + hh * 0.3); ctx.lineTo(hx + hw, hy + hh); ctx.lineTo(hx, hy + hh); ctx.closePath();
      ctx.fillStyle = mix('#f6e3d3', '#e9c4a8', clamp((st.tFlow - 30) / 40, 0, 1)); ctx.fill(); ctx.strokeStyle = C.ink2; ctx.lineWidth = 1.5; ctx.stroke();
      text(ctx, `radiators ${st.tFlow} °C`, hx + hw / 2, hy + hh * 0.66, { size: 11, align: 'center', color: C.ink2, weight: 600 });
      // outdoor unit
      const ox = S.x + 4, oy = hy + hh * 0.48, ow = S.w * 0.3, oh = hh * 0.42;
      rrect(ctx, ox, oy, ow, oh, 6); ctx.fillStyle = '#e8eaec'; ctx.fill(); ctx.strokeStyle = C.ink3; ctx.stroke();
      const fx = ox + ow / 2, fy = oy + oh / 2, fr = Math.min(ow, oh) * 0.36;
      circle(ctx, fx, fy, fr, '#fff', C.ink3, 1);
      for (let k = 0; k < 3; k++) { const a = st.phase * 6 + k * 2.094; ctx.beginPath(); ctx.ellipse(fx + Math.cos(a) * fr * 0.45, fy + Math.sin(a) * fr * 0.45, fr * 0.5, fr * 0.18, a, 0, Math.PI * 2); ctx.fillStyle = alpha(C.ink3, 0.5); ctx.fill(); }
      text(ctx, `outside ${st.tOut} °C`, ox + ow / 2, narrow ? oy - 7 : oy + oh + 16, { size: 11, align: 'center', color: C.cold, weight: 600 });
      // energy bars: 1 unit electricity + (cop-1) ambient = cop heat
      const by = S.y + S.h - (narrow ? 2 : 6); const unit = Math.min(26, (S.w - 20) / (cop + 2));
      const bx = S.x + 4;
      ctx.fillStyle = C.electron; ctx.fillRect(bx, by - 14, unit, 12); ctx.fillStyle = alpha(C.cold, 0.35); ctx.fillRect(bx + unit, by - 14, unit * (cop - 1), 12);
      text(ctx, '1 kWh electricity', bx, by - 20, { size: 10.5, color: C.electron, weight: 600 });
      text(ctx, `+ ${(cop - 1).toFixed(1)} kWh from outside air = ${cop.toFixed(1)} kWh heat`, bx + unit + 4, by + 12, { size: 10.5, color: C.ink2 });
      // flowing dots from outside to house
      for (let k = 0; k < 10; k++) { const t = ((st.phase * 0.5 + k / 10) % 1); const x = lerp(ox + ow, hx, t), y = lerp(fy, hy + hh * 0.75, t) - Math.sin(t * Math.PI) * 12; circle(ctx, x, y, 3, mix(C.cold, C.hot, t)); }
      // chart: COP vs outdoor temp, and cost per kWh heat
      const R = narrow ? { l: 46, r: w - 16, t: 280, b: h - 34 } : { l: w * 0.52, r: w - 16, t: 30, b: h - 34 };
      const YM = 45;
      const { sx, sy } = axes(ctx, { box: R, x0: -15, x1: 15, y0: 0, y1: YM, yticks: [0, 10, 20, 30, 40], yfmt: v => String(v), xticks: [-15, -10, -5, 0, 5, 10, 15], xfmt: v => v + '°', ylabel: '¢ per kWh of heat', xlabel: 'outdoor temperature' });
      const gasCost = st.gas / 0.9;
      line(ctx, R.l, sy(gasCost), R.r, sy(gasCost), C.gas, 2.2);
      text(ctx, `gas boiler ${gasCost.toFixed(1)}¢`, R.r - 4, sy(gasCost) + (st.elec / cop > gasCost ? 15 : -6), { size: 11, align: 'right', color: darken(C.gas, 0.15), weight: 600, halo: true });
      const cy = t => sy(clamp(st.elec / copOf(t, st.tFlow), 0, YM));
      const pts = []; for (let t = -15; t <= 15; t += 0.5) pts.push([sx(t), cy(t)]);
      pathLine(ctx, pts, C.electron, 2.4);
      const hpCost = st.elec / cop;
      const dx = sx(st.tOut), dy = sy(Math.min(YM, hpCost));
      circle(ctx, dx, dy, 5.5, C.electron, '#fff', 2);
      // label beside the dot, on the side of the curve away from the gas line, clear of the curve along its whole width
      const hpLab = `heat pump ${hpCost.toFixed(1)}¢`, lw = measure(ctx, hpLab, 11);
      const lx = dx + 9 + lw <= R.r ? dx + 9 : dx - 9 - lw;
      let cMin = Infinity, cMax = -Infinity;
      for (let x = Math.min(lx, dx); x <= Math.max(lx + lw, dx); x += 2) { const y = cy(sx.inv(x)); cMin = Math.min(cMin, y); cMax = Math.max(cMax, y); }
      const below = cMax + 15, above = cMin - 7;
      const ly = hpCost > gasCost ? (above - 11 >= R.t ? above : below) : (below <= R.b - 3 ? below : above);
      text(ctx, hpLab, lx, ly, { size: 11, color: C.electron, weight: 650, halo: true });
    },
  });
  const ctl = controls(el);
  const hs = {};
  hs.tOut = slider(ctl, { label: 'Outdoor temperature', min: -15, max: 15, step: 1, value: st.tOut, color: C.cold, fmt: v => v + ' °C', oninput: v => { st.tOut = v; upd(); }, name: 'tout' });
  slider(ctl, { label: 'Radiator (flow) temperature', min: 30, max: 70, step: 1, value: st.tFlow, color: C.hot, fmt: v => v + ' °C', oninput: v => { st.tFlow = v; upd(); }, name: 'tflow' });
  segmented(ctl, { label: 'Household prices', options: [{ label: 'Germany', value: 'de', name: 'hp-de' }, { label: 'UK', value: 'uk', name: 'hp-uk' }, { label: 'US', value: 'us', name: 'hp-us' }], value: 'de', onchange: v => { Object.assign(st, HP[v]); for (const k in hs) hs[k].set(st[k]); upd(); } });
  hs.elec = slider(ctl, { label: 'Electricity price', min: 10, max: 60, step: 0.01, value: st.elec, color: C.electron, fmt: v => v.toFixed(1) + '¢/kWh', oninput: v => { st.elec = v; upd(); }, name: 'elec' });
  hs.gas = slider(ctl, { label: 'Gas price', min: 4, max: 30, step: 0.01, value: st.gas, color: C.gas, fmt: v => v.toFixed(1) + '¢/kWh', oninput: v => { st.gas = v; upd(); }, name: 'gas' });
  const ro = readout(el);
  function upd() {
    const cop = copOf(st.tOut, st.tFlow); const be = st.elec / (st.gas / 0.9);
    ro.innerHTML = `COP <b>${cop.toFixed(1)}</b>. The heat pump beats the boiler whenever its COP exceeds <b>${be.toFixed(1)}</b> — the ratio of the electricity price to the cost of heat from gas. ${be > 3.5 ? 'At these prices, that is a high bar: <i>the price ratio, not the physics, decides.</i>' : ''}`;
    fig.invalidate();
  }
  upd();
}

// ---------------------------------------------------------------- the dark week: adequacy on three model weeks (illustrative presets)
// Each preset is a model grid scaled so that its usual peak demand is 100 GW, so the shapes of the weeks compare, not the sizes
// of the countries. Weather, demand and outage shapes are invented to resemble the named event; none is a record of it.
const daily = (arr, d) => { const i = Math.floor(d), f = d - i; const a = arr[clamp(i, 0, 6)], b = arr[clamp(i + 1, 0, 6)]; return lerp(a, b, f * f * (3 - 2 * f)); };
const peakOf = f => { let m = 0; for (let k = 0; k < 240; k++) m = Math.max(m, f(k / 10)); return m; };
const WPK = peakOf(h => loadProfile(h, 'winter', false));
const inLoad = h => 78 + 13 * Math.exp(-(((h - 14) / 3) ** 2)) + 24 * Math.exp(-(((h - 21) / 2) ** 2)) - 8 * Math.exp(-(((h - 4.5) / 2.5) ** 2)); // midday cooling and pumping, a larger peak after sunset
const IPK = peakOf(inLoad);
const WEEKS = {
  de: {
    label: 'Germany’s Dunkelflaute', firmNote: 'gas, biomass, hydro, imports',
    wind: [0.38, 0.30, 0.09, 0.05, 0.04, 0.07, 0.33], dem: [1, 1, 1, 1, 1, 1, 1],
    load: (h, day) => loadProfile(h, 'winter', day >= 5) / WPK * 100, solar: h => solarShape(h, 'winter') * 0.45,
    ev: [52, 140], evLabel: 'dark and still for four days',
    fleets: [
      { k: 'a', label: 'Lots of wind and solar, little firm', wind: 200, solar: 300, firm: 35, sGW: 50, sGWh: 200, out: 0 },
      { k: 'b', label: '+ multi-day storage', wind: 200, solar: 300, firm: 35, sGW: 65, sGWh: 4000, out: 0 },
      { k: 'c', label: '+ firm backup', wind: 200, solar: 300, firm: 80, sGW: 50, sGWh: 200, out: 0 },
    ],
  },
  tx: {
    label: 'Texas in Winter Storm Uri', firmNote: 'gas, coal, nuclear',
    wind: [0.40, 0.22, 0.08, 0.07, 0.10, 0.25, 0.35], dem: [0.95, 1.08, 1.18, 1.15, 1.08, 0.98, 0.92],
    load: h => loadProfile(h, 'winter', false) / WPK * 100, solar: h => solarShape(h, 'winter') * 0.9,
    ev: [30, 110], evLabel: 'the freeze: heating demand up, plants down',
    fleets: [
      { k: 'a', label: 'Plants not winterised', wind: 45, solar: 20, firm: 125, sGW: 8, sGWh: 20, out: 45 },
      { k: 'b', label: 'Plants winterised', wind: 45, solar: 20, firm: 125, sGW: 8, sGWh: 20, out: 8 },
      { k: 'c', label: 'Not winterised, more batteries', wind: 45, solar: 15, firm: 125, sGW: 25, sGWh: 100, out: 45 },
    ],
  },
  in: {
    label: 'India’s evening peak', firmNote: 'coal, hydro, gas',
    wind: [0.22, 0.25, 0.20, 0.18, 0.24, 0.26, 0.22], dem: [0.96, 0.98, 1, 1, 0.99, 0.97, 0.95],
    load: h => inLoad(h) / IPK * 100, solar: h => solarShape(h, 'spring') / 0.62 * 0.8,
    ev: null, evLabel: 'after sunset',
    fleets: [
      { k: 'a', label: 'Lots of solar, few batteries', wind: 40, solar: 70, firm: 72, sGW: 4, sGWh: 10, out: 0 },
      { k: 'b', label: '+ four-hour batteries', wind: 40, solar: 70, firm: 72, sGW: 35, sGWh: 140, out: 0 },
      { k: 'c', label: '+ firm plants', wind: 40, solar: 70, firm: 95, sGW: 4, sGWh: 10, out: 0 },
    ],
  },
};
export function adequacy(el) {
  const KEYS = ['wind', 'solar', 'firm', 'out', 'sGW', 'sGWh'];
  const st = { c: 'de', f: 'a', ...WEEKS.de.fleets[0] };
  let sim = null;
  const inEvent = i => { const W = WEEKS[st.c]; return W.ev ? i >= W.ev[0] && i < W.ev[1] : true; };
  const run = () => {
    const W = WEEKS[st.c];
    const N = 168; const out = []; let soc = st.sGWh * 0.9; let uns = 0, unsH = 0, curt = 0, firmE = 0;
    for (let i = 0; i < N; i++) {
      const h = i % 24, d = i / 24, day = Math.floor(d);
      const D = W.load(h + 0.5, day) * daily(W.dem, d);
      const Wd = st.wind * daily(W.wind, d) * (1 + 0.1 * Math.sin(i * 0.37));
      const S = st.solar * W.solar(h + 0.5);
      const Fa = st.firm * (1 - (inEvent(i) ? st.out / 100 : 0)); // firm capacity actually available this hour
      let res = D - Wd - S; const r = { i, D, Fa, W: Math.min(Wd, D), S: 0, F: 0, Sd: 0, U: 0 };
      r.S = Math.max(0, Math.min(S, D - r.W));
      if (res <= 0) { const ch = Math.min(-res, st.sGW, (st.sGWh - soc) / 0.85); soc += ch * 0.85; curt += -res - ch; }
      else {
        r.F = Math.min(res, Fa); res -= r.F;
        if (res > 0) { r.Sd = Math.min(res, st.sGW, soc); soc -= r.Sd; res -= r.Sd; }
        else { const ch = Math.max(0, Math.min(Fa - r.F, st.sGW, (st.sGWh * 0.5 - soc) / 0.85)); soc += ch * 0.85; } // spare firm tops storage up to half; surplus wind and sun fill the rest
        r.U = Math.max(0, res); if (r.U > 0.01) unsH++; uns += r.U;
      }
      firmE += r.F; r.soc = soc; out.push(r);
    }
    sim = { out, uns, unsH, curt, firmE };
  };
  run();
  const fig = new Fig(el, {
    label: 'A model week of supply and demand in one of three illustrative presets: generation, storage and firm capacity against demand, and any demand left unserved',
    height: w => w < 600 ? 500 : 452,
    draw(ctx, w, h) {
      const W = WEEKS[st.c];
      // legend above the plot (wrapping on narrow screens), so its swatches never sit on same-coloured areas
      const LEG = [['firm', C.gas], ['wind', C.wind], ['solar', C.solar], ['storage', C.storage], ['unserved', C.peaker]];
      const legRows = []; { let row = [], x = 46; for (const [lab, col] of LEG) { const wd = 14 + measure(ctx, lab, 10.5) + 12; if (row.length && x + wd > w - 16) { legRows.push(row); row = []; x = 46; } row.push([lab, col, x]); x += wd; } legRows.push(row); }
      legRows.forEach((row, ri) => { const ly = 14 + ri * 17; for (const [lab, col, lx] of row) { ctx.fillStyle = col; ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, lab, lx + 14, ly, { size: 10.5, color: C.ink2 }); } });
      const box = { l: 50, r: w - 16, t: 14 + legRows.length * 17 + 22, b: h * 0.68 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 168, y0: 0, y1: 125, xticks: [0, 24, 48, 72, 96, 120, 144, 168], xfmt: v => v === 168 ? '' : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][v / 24], yticks: [0, 25, 50, 75, 100, 125], yfmt: v => v + ' GW', ylabel: 'model grid, usual peak 100 GW' });
      // the event: one window, or (India) every evening
      const bands = W.ev ? [W.ev] : [0, 1, 2, 3, 4, 5, 6].map(d => [d * 24 + 18, d * 24 + 23]);
      for (const [a, b] of bands) { ctx.fillStyle = alpha(C.ink, 0.06); ctx.fillRect(sx(a), box.t, sx(b) - sx(a), box.b - box.t); }
      const labX = W.ev ? sx(W.ev[0]) + 4 : sx(bands[0][0]) + 2;
      text(ctx, W.evLabel, labX, box.t + 12, { size: 10.5, color: C.ink3, weight: 600, halo: true });
      const O = sim.out; let base = O.map(() => 0);
      for (const [k, col] of [['F', C.gas], ['W', C.wind], ['S', C.solar], ['Sd', C.storage], ['U', C.peaker]]) { // firm at the bottom, so its top meets the capacity line
        const cur = O.map((r, i) => base[i] + r[k]);
        ctx.beginPath(); O.forEach((r, i) => { ctx.lineTo(sx(i), sy(cur[i])); ctx.lineTo(sx(i + 1), sy(cur[i])); });
        for (let i = O.length - 1; i >= 0; i--) { ctx.lineTo(sx(i + 1), sy(base[i])); ctx.lineTo(sx(i), sy(base[i])); }
        ctx.closePath(); ctx.fillStyle = k === 'U' ? C.peaker : alpha(col, 0.8); ctx.fill(); base = cur;
      }
      pathLine(ctx, O.map((r, i) => [sx(i + 0.5), sy(r.D)]), C.ink, 1.6);
      // firm capacity available: a stepped dashed line that dips while plants are out
      ctx.save(); ctx.setLineDash([5, 4]); ctx.strokeStyle = alpha(C.gas, 0.95); ctx.lineWidth = 1.2; ctx.beginPath();
      O.forEach((r, i) => { const y = sy(Math.min(125, r.Fa)); if (i) ctx.lineTo(sx(i), y); else ctx.moveTo(sx(i), y); ctx.lineTo(sx(i + 1), y); }); ctx.stroke(); ctx.restore();
      const fEnd = Math.min(125, O[O.length - 1].Fa);
      text(ctx, w < 600 ? 'firm available' : `firm capacity available (${W.firmNote})`, box.r - 4, Math.max(box.t + 26, Math.min(sy(fEnd) - 5, box.b - 26)), { size: 10.5, color: darken(C.gas, 0.2), align: 'right', halo: true });
      // state of charge
      const b2 = { l: box.l, r: box.r, t: box.b + 46, b: h - 22 }; // room for the day labels, then this panel's title
      const a2 = axes(ctx, { box: b2, x0: 0, x1: 168, y0: 0, y1: Math.max(1, st.sGWh), xticks: [], yticks: [0, Math.max(1, st.sGWh)], yfmt: v => v >= 1000 ? (v / 1000).toFixed(1) + ' TWh' : v.toFixed(0) + ' GWh', ylabel: 'storage state of charge' });
      ctx.beginPath(); O.forEach((r, i) => ctx.lineTo(a2.sx(i + 1), a2.sy(r.soc))); ctx.lineTo(a2.sx(168), a2.sy(0)); ctx.lineTo(a2.sx(0), a2.sy(0)); ctx.closePath(); ctx.fillStyle = alpha(C.storage, 0.25); ctx.fill();
      pathLine(ctx, O.map((r, i) => [a2.sx(i + 1), a2.sy(r.soc)]), C.storage, 1.8);
    },
  });
  const ctl = controls(el);
  const S = {};
  const apply = fl => { Object.assign(st, fl); st.f = fl.k; for (const k of KEYS) S[k].set(st[k]); run(); upd(); };
  segmented(ctl, { label: 'Illustrative week, shaped like', options: Object.entries(WEEKS).map(([k, W]) => ({ label: W.label, value: k, name: 'wk-' + k })), value: st.c, onchange: v => { st.c = v; buildFleet(); apply(WEEKS[v].fleets[0]); } });
  const fleetHold = document.createElement('div'); fleetHold.style.display = 'contents'; ctl.appendChild(fleetHold);
  let fleetSeg = null;
  function buildFleet() {
    fleetHold.replaceChildren();
    fleetSeg = segmented(fleetHold, { label: 'Fleet', options: WEEKS[st.c].fleets.map(f => ({ label: f.label, value: f.k, name: 'fl-' + f.k })), value: 'a', onchange: v => apply(WEEKS[st.c].fleets.find(f => f.k === v)) });
  }
  buildFleet();
  const onS = k => v => { st[k] = v; run(); upd(); };
  S.wind = slider(ctl, { label: 'Wind capacity', min: 0, max: 300, step: 5, value: st.wind, color: C.wind, fmt: v => v + ' GW', oninput: onS('wind') });
  S.solar = slider(ctl, { label: 'Solar capacity', min: 0, max: 400, step: 10, value: st.solar, color: C.solar, fmt: v => v + ' GW', oninput: onS('solar') });
  S.firm = slider(ctl, { label: 'Firm capacity', min: 0, max: 150, step: 1, value: st.firm, color: C.gas, fmt: v => v + ' GW', oninput: onS('firm'), name: 'firm' });
  S.out = slider(ctl, { label: 'Firm capacity out of action <small>(frozen, tripped, short of fuel)</small>', min: 0, max: 60, step: 1, value: st.out, color: C.peaker, fmt: v => v + '%', oninput: onS('out'), name: 'out' });
  S.sGW = slider(ctl, { label: 'Storage power', min: 0, max: 100, step: 1, value: st.sGW, color: C.storage, fmt: v => v + ' GW', oninput: onS('sGW') });
  S.sGWh = slider(ctl, { label: 'Storage energy', min: 0, max: 5000, step: 10, value: st.sGWh, color: C.storage, fmt: v => v >= 1000 ? (v / 1000).toFixed(2) + ' TWh' : v + ' GWh', oninput: onS('sGWh') });
  const ro = readout(el);
  function upd() {
    const tot = sim.out.reduce((s, r) => s + r.D, 0);
    ro.innerHTML = sim.uns > 0.5 ? `<b style="color:${C.peaker}">${sim.uns.toFixed(0)} GWh unserved</b> over ${sim.unsH} hours (${(sim.uns / tot * 100).toFixed(1)} per cent of the week’s demand). Storage holds ${(st.sGWh / Math.max(1, st.sGW)).toFixed(0)} hours at full power.`
      : `<b style="color:${C.storage}">Demand met every hour.</b> Firm plants ran for ${(sim.firmE / 1000).toFixed(1)} TWh; ${(sim.curt / 1000).toFixed(1)} TWh of wind and solar had nowhere to go.`;
    fig.invalidate();
  }
  upd();
}
