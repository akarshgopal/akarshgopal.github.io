// Section: why the price of electricity is a lever on the whole economy.
//  energyShare — EIA MER Table 1.7, US energy expenditures as % of GDP, NBER recessions (real)
//  unlock      — €/MWh explorer: electricity cost per unit of energy-intensive goods (cited kWh-per-unit assumptions)
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, measure, rrect, line, circle, clamp, lerp, axes, pathLine, scale } from '../lib/draw.js';
import { controls, slider, segmented, readout } from '../lib/ui.js';
import { DATA2, RECESSIONS } from '../lib/data2.js';
import { DATA } from '../lib/data.js';
import { USD_PER_EUR, currencyToggle } from '../lib/currency.js';

export function energyShare(el) {
  const S = DATA2.energyShare; let hov = null, geo = null;
  const fig = new Fig(el, {
    label: 'US spending on energy as a share of GDP, 1970 to 2024, with recessions shaded',
    height: w => w < 600 ? 320 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: 44, r: w - 16, t: 34, b: h - 34 };
      const { sx, sy } = axes(ctx, { box, x0: 1969, x1: 2025, y0: 0, y1: 15, yticks: [0, 5, 10, 15], xticks: narrow ? [1970, 1990, 2010] : [1970, 1980, 1990, 2000, 2010, 2020], yfmt: v => v + '%', ylabel: 'US energy expenditure as a share of GDP' });
      geo = { sx, sy, box };
      for (const [a, b] of RECESSIONS) { ctx.fillStyle = alpha(C.ink, 0.07); ctx.fillRect(sx(a), box.t, Math.max(2, sx(b) - sx(a)), box.b - box.t); }
      const seg = []; let prev = null;
      for (const p of S) { if (prev && p[0] - prev[0] > 1) { pathLine(ctx, [[sx(prev[0]), sy(prev[1])], [sx(p[0]), sy(p[1])]], alpha(C.price, 0.5), 1.5, [3, 3]); } prev = p; }
      let run = []; prev = null;
      for (const p of S) { if (prev && p[0] - prev[0] > 1) { pathLine(ctx, run, C.price, 2.2); run = []; } run.push([sx(p[0]), sy(p[1])]); prev = p; }
      pathLine(ctx, run, C.price, 2.2);
      for (const p of S) circle(ctx, sx(p[0]), sy(p[1]), p === hov ? 5 : 2.4, C.price, p === hov ? '#fff' : null, p === hov ? 2 : 0);
      const ann = narrow ? [[1981, '1981: 13.3%', 'right']] : [[1975, '1973–74 oil embargo', 'left'], [1981, '1979 Iranian revolution → 1981: 13.3%', 'left'], [2008, '2008 oil spike', 'center'], [2022, '2022', 'center']];
      for (const [y, s, al] of ann) { const p = S.find(q => q[0] === y); if (!p) continue; text(ctx, s, sx(p[0]) + (al === 'left' ? 8 : al === 'right' ? -8 : 0), sy(p[1]) - 10, { size: 10.5, color: C.ink2, weight: 600, align: al, halo: true }); }
      text(ctx, 'grey bands: US recessions (NBER)', box.r, box.t + 2, { size: 10.5, color: C.ink3, align: 'right' });
      if (hov) { const s = `${hov[0]}: ${hov[1].toFixed(1)}% of GDP`; const tw = measure(ctx, s, 11.5, 600) + 14; const bx = clamp(sx(hov[0]) - tw / 2, box.l, box.r - tw); rrect(ctx, bx, box.b - 30, tw, 22, 6); ctx.fillStyle = alpha('#fff', 0.95); ctx.fill(); ctx.strokeStyle = C.grid2; ctx.stroke(); text(ctx, s, bx + 7, box.b - 15, { size: 11.5, weight: 600, color: C.ink }); }
    },
  });
  fig.interact({ hit: (x) => { if (!geo) return null; let b = null, bd = 1e9; for (const p of S) { const d = Math.abs(geo.sx(p[0]) - x); if (d < bd) { bd = d; b = p; } } return bd < 20 ? b : null; }, cursor: 'crosshair', hover: o => { hov = o; } });
}

// kWh of electricity per unit — every number here is from a cited source (see figure caption / notes)
// No bars: each row is priced at its own scale, so a bar could only repeat the slider. The rows give the electricity cost alone.
const GOODS = [
  { k: 'alu', name: 'Primary aluminium', per: 'tonne', kwh: 14000, col: '#8a9bb0', note: '≈14 MWh per tonne at the smelter (IAI world average)', fmt: v => '€' + Math.round(v).toLocaleString('en-US') },
  { k: 'steel', name: 'Green steel (H₂ direct reduction)', per: 'tonne', kwh: 3480, col: '#6f6a64', note: '3.48 MWh per tonne of liquid steel (Vogl et al.)', fmt: v => '€' + Math.round(v).toLocaleString('en-US') },
  { k: 'h2', name: 'Green hydrogen', per: 'kg', kwh: 55, col: '#3fa1a8', note: '≈55 kWh/kg: US DOE status value for today’s electrolyser systems', noteN: '≈55 kWh/kg (US DOE); US target $1/kg all-in', fmt: v => '€' + v.toFixed(2), ref: 'US DOE “Hydrogen Shot” target: $1/kg all-in' },
  { k: 'efuel', name: 'E-kerosene (power-to-liquid)', per: 'litre', kwh: 27, col: '#b07a3a', note: '≈27 kWh per litre: the fuels deep dive’s chain, CO₂ from a concentrated source', noteN: '≈27 kWh per litre (fuels deep dive)', fmt: v => '€' + v.toFixed(2) },
  { k: 'water', name: 'Desalinated seawater', per: 'm³', kwh: 3.5, col: C.wind, note: '3–4 kWh/m³ for modern reverse osmosis', fmt: v => '€' + v.toFixed(2) },
  { k: 'gpu', name: 'One H100 GPU for an hour', per: 'GPU-hour', kwh: 10.2 / 8 * 1.3, col: '#6c5bb5', note: 'DGX H100: 10.2 kW for 8 GPUs, × PUE 1.3', fmt: v => '€' + v.toFixed(3) },
  { k: 'home', name: 'A German household’s year', per: 'year', kwh: 3500, col: C.procurement, note: '3,500 kWh — energy only, before grid fees and taxes', fmt: v => '€' + Math.round(v).toLocaleString('en-US') },
];
export function unlock(el) {
  const st = { p: 60, cur: 'USD' };
  const S = () => st.cur === 'USD' ? '$' : '€', fx = () => st.cur === 'USD' ? USD_PER_EUR[2025] : 1;
  // Business tariffs, Q3 2026, US$/MWh incl. taxes (GlobalPetrolPrices, as in the retailWorld figure), and Germany's subsidised
  // industrial floor (BAFA, €50/MWh). Marks are held in dollars and shown in euros at the 2025 rate when the toggle says so.
  const MARKS0 = [[50 * USD_PER_EUR[2025], 'German subsidised industrial floor', 'DE floor'], [109, 'China business', 'CN'], [122, 'India business', 'IN'], [150, 'US business', 'US'], [284, 'Germany business', 'DE']];
  const marks = () => MARKS0.map(([v, a, b]) => { const d = Math.round(v / USD_PER_EUR[2025] * fx()); return [d, `${a} ${S()}${d}`, `${b} ${S()}${d}`]; });
  let geo = null;
  const fig = new Fig(el, {
    label: 'What a megawatt-hour price unlocks: the electricity cost of a tonne of aluminium or green steel, a kilogram of hydrogen, a litre of e-kerosene, a cubic metre of desalinated water, an hour of a GPU and a household year, as the power price changes',
    height: w => w < 600 ? 520 : 440,
    draw(ctx, w, h) {
      const narrow = w < 600;
      // price axis with markers and draggable handle
      const A = { l: narrow ? 16 : 24, r: w - (narrow ? 16 : 24), y: narrow ? 84 : 76 };
      const sx = scale(0, 400, A.l, A.r); geo = { sx, A };
      text(ctx, `electricity price, ${S()}/MWh`, A.l, 16, { size: 11, color: C.ink3, weight: 500 });
      line(ctx, A.l, A.y, A.r, A.y, C.grid2, 6); line(ctx, A.l, A.y, sx(st.p), A.y, C.ink, 6);
      for (const v of [0, 100, 200, 300, 400]) text(ctx, S() + v, sx(v), A.y + 24, { size: 10.5, color: C.ink3, align: 'center' });
      // markers stack in up to three lanes; ticks first, then each label on a cleared box so no tick runs through a label
      const laneR = [-1e9, -1e9, -1e9], labs = [];
      marks().forEach(([v, s, ss]) => { const lab = narrow ? ss : s, x = sx(v), tw = measure(ctx, lab, 10, 550); const al = x + tw / 2 > A.r ? 'right' : x - tw / 2 < A.l ? 'left' : 'center'; const x0 = al === 'right' ? x - tw : al === 'left' ? x : x - tw / 2; let lane = laneR.findIndex(r => x0 > r + 8); if (lane < 0) lane = 2; laneR[lane] = x0 + tw; line(ctx, x, A.y - 9 - lane * 14, x, A.y - 4, C.ink3, 1); labs.push([lab, x, A.y - 12 - lane * 14, al]); });
      labs.forEach(([lab, x, y, al]) => { const tw = measure(ctx, lab, 10, 550), x0 = al === 'right' ? x - tw : al === 'left' ? x : x - tw / 2; ctx.clearRect(x0 - 3, y - 11, tw + 6, 14); text(ctx, lab, x, y, { size: 10, color: C.ink2, weight: 550, align: al }); });
      circle(ctx, sx(st.p), A.y, 10, '#fff', C.ink, 2.5);
      text(ctx, `${S()}${st.p}/MWh  =  ${(st.p / 10).toFixed(1)}${st.cur === 'USD' ? '¢' : ' ct'}/kWh`, sx(st.p), A.y + 42, { size: 13, weight: 700, color: C.ink, align: clamp(sx(st.p), A.l + 90, A.r - 90) === sx(st.p) ? 'center' : sx(st.p) < A.l + 90 ? 'left' : 'right' });
      // rows: the electricity cost of one unit of each product
      const top = A.y + 66, rowH = (h - top - 10) / GOODS.length;
      const vx = narrow ? w - 16 : Math.min(430, w * 0.45);
      GOODS.forEach((g, i) => {
        const y = top + i * rowH, cost = g.kwh * st.p / 1000;
        if (i % 2 === 0) { ctx.fillStyle = alpha(C.bg, 0.6); ctx.fillRect(0, y, w, rowH); }
        const ly = narrow ? y + rowH / 2 - 3 : y + rowH / 2 - 3;
        text(ctx, g.name, narrow ? 16 : 18, ly, { size: 12.5, weight: 650, color: C.ink });
        text(ctx, w < 900 && g.noteN ? g.noteN : g.note, narrow ? 16 : 18, ly + 14, { size: 10, color: C.ink3 });
        const vs = `${g.fmt(cost).replace('€', S())} / ${g.per}`;
        if (narrow) text(ctx, vs, vx, ly, { size: 12, weight: 700, color: darken(g.col, 0.3), align: 'right' });
        else {
          text(ctx, vs, vx, ly + 6, { size: 14, weight: 700, color: darken(g.col, 0.3) });
          if (g.ref) text(ctx, g.ref, vx + measure(ctx, vs, 14, 700) + 18, ly + 6, { size: 10.5, color: C.ink2, weight: 600 });
        }
      });
    },
  });
  const setP = v => { st.p = clamp(Math.round(v), 0, 400); upd(); };
  fig.interact({
    hit: (x, y) => geo && Math.abs(y - geo.A.y) < 24 ? 'p' : null, cursor: 'ew-resize', touchAction: 'pan-y',
    down: (o, x) => setP(geo.sx.inv(x)),
    move: (o, x) => setP(geo.sx.inv(x)),
  });
  // the price axis is the only control: keyboard users move it with the arrow keys
  const cv = fig.canvas;
  cv.tabIndex = 0; cv.setAttribute('role', 'slider'); cv.setAttribute('aria-valuemin', '0'); cv.setAttribute('aria-valuemax', '400');
  cv.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
    if (d != null) { e.preventDefault(); setP(st.p + d * (e.shiftKey ? 10 : 1)); } else if (e.key === 'Home') { e.preventDefault(); setP(0); } else if (e.key === 'End') { e.preventDefault(); setP(400); }
  });
  const ro = readout(el);
  const upd = () => {
    const h2 = 55 * st.p / 1000, alu = 14 * st.p, gpu = st.p * 1000 * 8760 / 1e6;
    cv.setAttribute('aria-valuenow', String(st.p)); cv.setAttribute('aria-valuetext', `${S()}${st.p} per megawatt-hour`);
    ro.innerHTML = (`At <b>€${st.p}/MWh</b>, electricity alone costs <b>€${alu.toLocaleString('en-US')}</b> per tonne of aluminium and <b>€${h2.toFixed(2)}</b> per kg of hydrogen; every extra €10/MWh adds €140 to the tonne and €0.55 to the kilo. A 1 GW data-centre campus running all year buys 8.76 TWh: <b>€${Math.round(gpu).toLocaleString('en-US')} million</b> a year at this price.`).replace(/€/g, S());
    fig.invalidate();
  };
  currencyToggle(el, v => { const old = fx(); st.cur = v; st.p = clamp(Math.round(st.p / old * fx()), 0, 400); upd(); }, 'ul');
  upd();
}
