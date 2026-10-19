// accessWorld — share of people with electricity, 1990–2024 (OWID / World Bank WDI) — real
// marketDesigns — how electricity is organised around the world (qualitative, cited) — real
import { Fig } from '../lib/fig.js';
import { C, alpha, darken, mix } from '../lib/colors.js';
import { text, measure, line, circle, axes, pathLine, rrect } from '../lib/draw.js';
import { controls, segmented, readout } from '../lib/ui.js';
import { ACCESS } from '../lib/accessdata.js';
import { USD_PER_EUR, currencyToggle } from '../lib/currency.js';
import { BILL, PPP } from '../lib/pricedata.js';

const GROUPS = {
  asia: { label: 'Asia', name: 'ac-asia', list: ['China', 'Vietnam', 'Indonesia', 'India', 'Bangladesh', 'Pakistan'] },
  africa: { label: 'Africa', name: 'ac-africa', list: ['South Africa', 'Kenya', 'Nigeria', 'Ethiopia', 'Sub-Saharan Africa (WB)', 'Democratic Republic of Congo'] },
};
const PAL = ['#c0392b', '#2e86c1', '#d68910', '#7d3c98', '#17a589', '#6e5f4f'];
const SHORT = { 'Sub-Saharan Africa (WB)': 'Sub-Saharan Africa', 'Democratic Republic of Congo': 'DR Congo' };

export function accessWorld(el) {
  const st = { g: 'asia', hover: null };
  const fig = new Fig(el, {
    label: 'Share of the population with access to electricity, 1990 to 2024, for the world and selected countries in Asia or Africa',
    height: w => w < 600 ? 360 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 40 : 56, r: w - (narrow ? 112 : 170), t: 30, b: h - 34 };
      const { sx, sy } = axes(ctx, { box: A, x0: 1990, x1: 2024, y0: 0, y1: 100, xticks: narrow ? [1990, 2005, 2020] : [1990, 1995, 2000, 2005, 2010, 2015, 2020], yticks: [0, 25, 50, 75, 100], xfmt: String, yfmt: v => v + '%', ylabel: 'share of people with electricity' });
      const names = ['World', ...GROUPS[st.g].list], labels = [];
      names.forEach((n, i) => {
        const s = ACCESS[n]; if (!s) return;
        const col = n === 'World' ? C.ink : PAL[(i - 1) % PAL.length], hl = st.hover === n;
        const wdt = n === 'World' ? 3 : hl ? 3 : 2;
        pathLine(ctx, s.map(([y, v]) => [sx(y), sy(v)]), st.hover && !hl && n !== 'World' ? alpha(col, 0.35) : col, wdt);
        const [ly, lv] = s[s.length - 1]; circle(ctx, sx(ly), sy(lv), 3, col);
        labels.push({ n, col, y: sy(lv), v: lv, x: sx(ly) });
      });
      // de-overlap end labels
      labels.sort((a, b) => a.y - b.y); const gap = 14;
      for (let i = 1; i < labels.length; i++) if (labels[i].y < labels[i - 1].y + gap) labels[i].y = labels[i - 1].y + gap;
      for (let i = labels.length - 1; i >= 0; i--) { const lim = A.b + 4 - (labels.length - 1 - i) * gap; if (labels[i].y > lim) labels[i].y = lim; if (i < labels.length - 1 && labels[i].y > labels[i + 1].y - gap) labels[i].y = labels[i + 1].y - gap; }
      labels.forEach(L => { line(ctx, L.x + 4, sy(L.v), A.r + 6, L.y - 4, alpha(L.col, 0.4), 1); text(ctx, `${SHORT[L.n] || L.n} ${Math.round(L.v)}%`, A.r + 9, L.y, { size: narrow ? 9.5 : 10.5, weight: L.n === 'World' ? 700 : 600, color: darken(L.col, 0.1) }); });
    },
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Countries', options: Object.entries(GROUPS).map(([k, g]) => ({ label: g.label, value: k, name: g.name })), value: st.g, onchange: v => { st.g = v; upd(); } });
  function upd() {
    const g = GROUPS[st.g].list, first = n => ACCESS[n][0], last = n => ACCESS[n][ACCESS[n].length - 1];
    ro.innerHTML = st.g === 'asia'
      ? `India went from <b>${first('India')[1]}%</b> of people with electricity in ${first('India')[0]} to <b>${last('India')[1]}%</b> in ${last('India')[0]}; Bangladesh from ${first('Bangladesh')[1]}% to ${last('Bangladesh')[1]}%. Most of Asia’s electrification gap has closed in one generation.`
      : `In ${last('Sub-Saharan Africa (WB)')[0]}, only <b>${last('Sub-Saharan Africa (WB)')[1]}%</b> of people in sub-Saharan Africa had electricity, and <b>${last('Democratic Republic of Congo')[1]}%</b> in the DR Congo. Kenya rose from ${first('Kenya')[1]}% in ${first('Kenya')[0]} to ${last('Kenya')[1]}%, much of it through off-grid solar and mini-grids.`;
    fig.invalidate();
  }
  upd();
}

// ---------------------------------------------------------------------------
const DESIGNS = [
  { k: 'vi', n: 'Vertically integrated, state-owned', ex: 'China (State Grid, CSG, provincial dispatch), Saudi Arabia, most of Africa (Eskom, KPLC), Vietnam (EVN)', how: 'One company — usually the state — owns generation, the grid and retail. Tariffs are set by government; plants run in an order chosen by the operator or by quota, not by bids.', col: '#7d3c98' },
  { k: 'sb', n: 'Single buyer', ex: 'India (state DISCOMs buying under long-term PPAs), Indonesia (PLN), Malaysia, Gulf IPPs (UAE, Oman)', how: 'Private plants sell under long contracts to one state-owned buyer, which passes costs on through regulated tariffs. India adds exchanges (IEX) for a small share of power.', col: '#2e86c1' },
  { k: 'vir', n: 'Regulated utilities (cost of service)', ex: 'US South-east and West outside ISOs, Japan before 2016, South Korea (KEPCO)', how: 'Investor- or state-owned monopolies earn a regulated return on assets; regulators approve rates and investment.', col: '#6e5f4f' },
  { k: 'eo', n: 'Energy-only market', ex: 'Texas (ERCOT), Australia (NEM)', how: 'Generators are paid only for energy. High price caps (US$5,000/MWh in ERCOT; A$20,300/MWh in the NEM for 2025–26) must fund new capacity through rare scarcity hours.', col: '#c0392b' },
  { k: 'cm', n: 'Energy market + capacity market', ex: 'PJM and other US eastern ISOs, Great Britain, Italy, Japan (since 2020 auction)', how: 'A separate auction pays plants to be available years ahead, on top of energy revenues.', col: '#d68910' },
  { k: 'z', n: 'Zonal pricing', ex: 'EU (Germany–Luxembourg is one zone; Italy, Nordics split), Australia NEM (five regions), Japan (JEPX areas)', how: 'One price per large zone; congestion inside a zone is fixed afterwards by redispatch.', col: '#17a589' },
  { k: 'n', n: 'Nodal pricing', ex: 'ERCOT, PJM, CAISO, MISO, New Zealand, Singapore, Chile (cost-based)', how: 'Each substation has its own price, including the cost of congestion and losses.', col: '#1f618d' },
];
export function marketDesigns(el) {
  const st = { sel: 3 };
  let geo = [];
  const fig = new Fig(el, {
    label: 'Seven ways electricity systems are organised around the world, with examples; hover a row for details',
    height: w => w < 600 ? 7 * 40 + 20 : 7 * 34 + 20,
    draw(ctx, w, h) {
      const narrow = w < 600, rh = narrow ? 40 : 34; geo = [];
      DESIGNS.forEach((d, i) => {
        const y = 10 + i * rh, sel = st.sel === i;
        if (sel) { ctx.fillStyle = alpha(d.col, 0.1); rrect(ctx, 0, y, w, rh - 4, 6); ctx.fill(); }
        ctx.fillStyle = d.col; rrect(ctx, 6, y + 6, 6, rh - 16, 3); ctx.fill();
        text(ctx, d.n, 20, y + (narrow ? 15 : (rh - 4) / 2 + 4), { size: narrow ? 11 : 12, weight: sel ? 700 : 600, color: C.ink });
        let ex = d.ex; const x0 = narrow ? 20 : 300, maxW = w - x0 - 8, sz = narrow ? 9.5 : 10.5;
        while (measure(ctx, ex, sz) > maxW && ex.length > 10) ex = ex.slice(0, ex.lastIndexOf(',') > 0 ? ex.lastIndexOf(',') : ex.length - 4) + '…';
        text(ctx, ex, x0, y + (narrow ? 30 : (rh - 4) / 2 + 4), { size: sz, color: C.ink2 });
        geo.push({ i, y0: y, y1: y + rh });
      });
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => y >= g.y0 && y < g.y1), hover: o => { if (o && o.i !== st.sel) { st.sel = o.i; upd(); } }, down: o => { if (o) { st.sel = o.i; upd(); } }, cursor: o => o ? 'pointer' : null });
  const ro = readout(el);
  function upd() { const d = DESIGNS[st.sel]; ro.innerHTML = `<b>${d.n}.</b> ${d.how} <i>Examples:</i> ${d.ex}.`; fig.invalidate(); }
  upd();
}

// ---------------------------------------------------------------------------
// retailWorld — household and business electricity prices, Q3 2026 (GlobalPetrolPrices, US$/kWh incl. taxes) — real
// Raw: /workspace/research/data/global/prices/gpp_q3_2026.json (from globalpetrolprices.com/electricity_prices, fetched 12 Oct 2026)
const RETAIL = [
  ['Italy', 0.415, 0.408], ['Germany', 0.409, 0.284], ['Denmark', 0.352, 0.228], ['France', 0.276, 0.186], ['Spain', 0.259, 0.134], ['Australia', 0.259, 0.244],
  ['Chile', 0.231, 0.172], ['Japan', 0.227, 0.2], ['Kenya', 0.218, 0.175], ['South Africa', 0.215, 0.108], ['Philippines', 0.211, 0.158], ['US', 0.19, 0.15],
  ['Norway', 0.169, 0.117], ['Brazil', 0.166, 0.134], ['South Korea', 0.126, 0.119], ['Canada', 0.123, 0.11], ['Mexico', 0.11, 0.212], ['Indonesia', 0.09, 0.069],
  ['Vietnam', 0.078, 0.078], ['China', 0.076, 0.109], ['India', 0.076, 0.122], ['Türkiye', 0.067, 0.135], ['Pakistan', 0.063, 0.152], ['Bangladesh', 0.063, 0.102],
  ['Saudi Arabia', 0.052, 0.07], ['Nigeria', 0.036, 0.05], ['Egypt', 0.023, 0.039], ['Ethiopia', 0.006, 0.019],
];
export function retailWorld(el) {
  const st = { cur: 'USD', hover: null, ppp: false };
  const f = n => st.ppp ? (PPP[n] || 1) : 1;
  const rows = () => RETAIL.map(([n, a, b]) => [n, a * f(n), b * f(n)]).sort((x, y) => y[1] - x[1]);
  const k = () => !st.ppp && st.cur === 'EUR' ? 1 / USD_PER_EUR[2026] : 1, sym = () => !st.ppp && st.cur === 'EUR' ? '€' : '$';
  const fig = new Fig(el, {
    label: 'Household and business electricity prices in 28 countries, third quarter of 2026, including taxes',
    height: w => (w < 600 ? 15 : 16) * RETAIL.length + 82,
    draw(ctx, w, h) {
      const narrow = w < 600, rh = narrow ? 15 : 16; st.rh = rh; const L = narrow ? 84 : 110, R = w - (narrow ? 40 : 60), T = 34, max = st.ppp ? 0.72 : 0.45;
      const sx = v => L + v / max * (R - L);
      text(ctx, st.ppp ? 'international dollars (PPP) per kWh' : (sym() === '€' ? 'euros per kWh' : 'US dollars per kWh'), R, T + rh * RETAIL.length + 30, { size: 9.5, color: C.ink3, align: 'right' });
      text(ctx, 'households', L, 14, { size: 10.5, weight: 700, color: C.solar });
      text(ctx, '◆ businesses', L + 76, 14, { size: 10.5, weight: 700, color: C.ink2 });
      (st.ppp ? [0, 0.2, 0.4, 0.6] : [0, 0.1, 0.2, 0.3, 0.4]).forEach(v => { line(ctx, sx(v), T - 6, sx(v), T + rh * RETAIL.length, alpha(C.ink, 0.08), 1); text(ctx, sym() + (v * k()).toFixed(2), sx(v), T + rh * RETAIL.length + 14, { size: 9.5, color: C.ink3, align: 'center' }); });
      rows().forEach(([n, hh, bz], i) => {
        const y = T + i * rh, hl = st.hover === i || n === 'Germany' || n === 'US' || n === 'China' || n === 'India';
        text(ctx, n, L - 6, y + rh * 0.7, { size: narrow ? 9.5 : 10.5, align: 'right', weight: hl ? 700 : 450, color: hl ? C.ink : C.ink2 });
        ctx.fillStyle = st.hover === i ? C.solar : alpha(C.solar, hl ? 0.85 : 0.6); rrect(ctx, L, y + 2, sx(hh) - L, rh - 5, 2); ctx.fill();
        const bx = sx(bz), by = y + rh / 2; ctx.fillStyle = C.ink2; ctx.beginPath(); ctx.moveTo(bx, by - 4); ctx.lineTo(bx + 4, by); ctx.lineTo(bx, by + 4); ctx.lineTo(bx - 4, by); ctx.fill();
        if (st.hover === i || !narrow) text(ctx, (hh * k() * 100).toFixed(1), Math.max(sx(hh), bx) + 7, y + rh * 0.7, { size: 9, color: C.ink3 });
      });
    },
  });
  const ctl = controls(el), ro = readout(el);
  fig.interact({ hit: (x, y) => { const i = Math.floor((y - 34) / (st.rh || 16)); return i >= 0 && i < RETAIL.length ? { i } : null; }, hover: o => { const v = o ? o.i : null; if (v !== st.hover) { st.hover = v; upd(); } }, down: o => { if (o) { st.hover = o.i; upd(); } }, cursor: o => o ? 'pointer' : null });
  segmented(ctl, { label: 'Exchange rate', options: [{ label: 'Market', value: false, name: 'rw-fx' }, { label: 'Purchasing power', value: true, name: 'rw-ppp' }], value: false, onchange: v => { st.ppp = v; st.hover = null; upd(); } });
  currencyToggle(ctl, v => { st.cur = v; upd(); }, 'rw');
  function upd() {
    const c = v => (v * k() * 100).toFixed(1) + (st.ppp ? ' PPP ¢' : st.cur === 'EUR' ? ' euro cents' : '¢');
    if (st.hover != null) { const [n, hh, bz] = rows()[st.hover]; ro.innerHTML = `<b>${n}</b>: households pay <b>${c(hh)}</b> per kWh, businesses <b>${c(bz)}</b>.`; }
    else if (st.ppp) { const g = n => rows().find(r => r[0] === n)[1]; ro.innerHTML = `Measured by what money buys locally, an Indian household pays <b>${c(g('India'))}</b> per kWh, a Nigerian one <b>${c(g('Nigeria'))}</b> and a Kenyan one <b>${c(g('Kenya'))}</b> — against <b>${c(g('US'))}</b> in the US. Electricity is cheap in poor countries only at market exchange rates.`; }
    else ro.innerHTML = `A German household pays <b>${c(0.409)}</b> per kWh, an American one <b>${c(0.19)}</b>, a Chinese or Indian one about <b>${c(0.076)}</b>. Where households pay less than businesses (China, India, Pakistan, Mexico), tariffs are being used as social policy.`;
    fig.invalidate();
  }
  upd();
}

// ---------------------------------------------------------------------------
// billWorld — household price split into energy, network and taxes, 2025, nominal or PPS (Eurostat nrg_pc_204_c) — real
export function billWorld(el) {
  const st = { view: 'nom', cur: 'USD', hover: null };
  const PARTS = [['energy & supply', C.procurement], ['network', C.network], ['taxes & levies', C.taxes]];
  const k = () => st.view === 'pps' ? 1 : st.cur === 'USD' ? USD_PER_EUR[2025] : 1;
  const unit = () => st.view === 'pps' ? ' PPS ¢' : st.cur === 'USD' ? '¢' : ' euro ¢';
  const order = () => BILL.map((r, i) => i).sort((a, b) => { const v = i => BILL[i][st.view === 'pps' ? 2 : 1].reduce((x, y) => x + y, 0); return v(b) - v(a); });
  const fig = new Fig(el, {
    label: 'Household electricity prices in 2025 in 20 European countries and the EU average, split into energy and supply, network charges, and taxes and levies, in nominal terms or at purchasing-power standards',
    height: w => (w < 600 ? 16 : 17) * BILL.length + 80,
    draw(ctx, w, h) {
      const narrow = w < 600, rh = narrow ? 16 : 17; st.rh = rh;
      const L = narrow ? 82 : 104, R = w - (narrow ? 30 : 50), T = 38, x0 = -3, x1 = 50;
      const sx = v => L + (v - x0) / (x1 - x0) * (R - L);
      let lx = L; PARTS.forEach(([n, col]) => { ctx.fillStyle = col; ctx.fillRect(lx, 8, 10, 10); text(ctx, n, lx + 14, 17, { size: 10.5, color: C.ink2 }); lx += 26 + measure(ctx, n, 10.5); });
      [0, 10, 20, 30, 40, 50].forEach(v => { line(ctx, sx(v), T - 4, sx(v), T + rh * BILL.length, alpha(C.ink, v === 0 ? 0.3 : 0.08), 1); text(ctx, String(v), sx(v), T + rh * BILL.length + 14, { size: 9.5, color: C.ink3, align: 'center' }); });
      text(ctx, st.view === 'pps' ? 'PPS cents per kWh' : (st.cur === 'USD' ? 'US cents per kWh' : 'euro cents per kWh'), R, T + rh * BILL.length + 28, { size: 9.5, color: C.ink3, align: 'right' });
      order().forEach((ri, i) => {
        const [n, nom, pps] = BILL[ri], v = (st.view === 'pps' ? pps : nom).map(x => x * k()), y = T + i * rh, hl = st.hover === i || n === 'Germany' || n === 'EU average';
        text(ctx, n, L - 6, y + rh * 0.7, { size: narrow ? 9.5 : 10.5, align: 'right', weight: hl ? 700 : 450, color: hl ? C.ink : C.ink2 });
        let pos = 0;
        v.forEach((x, j) => { const a = x >= 0 ? pos : 0, b = x >= 0 ? pos + x : x; ctx.fillStyle = st.hover != null && st.hover !== i ? alpha(PARTS[j][1], 0.45) : PARTS[j][1]; ctx.fillRect(sx(Math.min(a, b)), y + 2, Math.abs(sx(b) - sx(a)), rh - 5); if (x >= 0) pos += x; });
        const tot = v.reduce((a, b) => a + b, 0);
        if (!narrow || st.hover === i) text(ctx, tot.toFixed(1), sx(pos) + 5, y + rh * 0.7, { size: 9, color: C.ink3 });
      });
    },
  });
  fig.interact({ hit: (x, y) => { const i = Math.floor((y - 38) / (st.rh || 17)); return i >= 0 && i < BILL.length ? { i } : null; }, hover: o => { const v = o ? o.i : null; if (v !== st.hover) { st.hover = v; upd(); } }, down: o => { if (o) { st.hover = o.i; upd(); } }, cursor: o => o ? 'pointer' : null });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'View', options: [{ label: 'Nominal', value: 'nom', name: 'bw-nom' }, { label: 'Purchasing power', value: 'pps', name: 'bw-pps' }], value: 'nom', onchange: v => { st.view = v; upd(); } });
  currencyToggle(ctl, v => { st.cur = v; upd(); }, 'bw');
  function upd() {
    const f = x => (x * k()).toFixed(1) + unit();
    if (st.hover != null) { const [n, nom, pps] = BILL[order()[st.hover]], v = st.view === 'pps' ? pps : nom; ro.innerHTML = `<b>${n}</b>: energy and supply <b>${f(v[0])}</b>, network <b>${f(v[1])}</b>, taxes and levies <b>${f(v[2])}</b>; total ${f(v[0] + v[1] + v[2])} per kWh.`; }
    else ro.innerHTML = st.view === 'pps'
      ? 'Adjusted for what money buys locally, the ranking changes: Romanian, Czech and Polish households pay the most in Europe, more than German ones; Hungarian, Turkish and Norwegian households the least. Purchasing-power standards (PPS) are an artificial currency in which one PPS buys the same basket everywhere in the EU.'
      : 'In Germany, Denmark, Sweden and Poland less than 40% of the bill is energy; in Ireland, Greece and Italy most of it is. In Denmark taxes are the largest part; in Ireland and the Netherlands tax credits push the tax layer below zero. Hover a row to read it.';
    fig.invalidate();
  }
  upd();
}
