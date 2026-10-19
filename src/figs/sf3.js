// Synthetic fuels post, part 3: projects, policy and where molecules make sense.
//  projects  — IEA pipeline vs reality, and a timeline of named projects (NEOM, Haru Oni, FlagshipONE, ArcelorMittal, HyScale 100) — real
//  mandates  — ReFuelEU Aviation SAF and synthetic-fuel quotas; European Hydrogen Bank auction premiums — real
//  whereFits — electricity needed for the same service via molecules vs direct electrification (Agora/acatech) — real + model
import { Fig } from '../lib/fig.js';
import { C, alpha, mix, lighten, darken } from '../lib/colors.js';
import * as D0 from '../lib/draw.js';
import { rrect, line, circle, clamp, lerp, pathLine, scale } from '../lib/draw.js';
import { curDraw, euroFigure } from '../lib/currency.js';
const { text, measure, axes } = curDraw(D0);
import { controls, slider, segmented, readout } from '../lib/ui.js';
import { FUEL } from '../lib/fueldata.js';
import { ELEC, H2C, FUELC, CO2C, HEATC, H2_ETA, chainResult } from './sf1.js';

const OK = '#2fa58a', BAD = '#c5473f', PLAN = '#a49d90';
/* ---------------- projects ---------------- */
const PIPE = [
  ['Global hydrogen demand, 2024 (almost all from fossil fuels)', 100, C.ink3],
  ['Low-emissions production by 2030, announced projects (2024 review)', 49, PLAN],
  ['… the same, one year later (2025 review)', 37, PLAN],
  ['Operating or past final investment decision, by 2030', 4.2, H2C],
  ['Low-emissions production in 2025 (on track)', 1, OK],
];
const PROJ = [
  { n: 'NEOM Green Hydrogen (Saudi Arabia)', s: 'NEOM', size: '2.2 GW electrolysers, 4 GW wind + solar, $8.4 bn', ev: [[2023.4, 'ok', 'financial close, $8.4 bn'], [2026.6, 'ok', 'built; commissioning'], [2027.3, 'plan', 'first ammonia expected']], note: 'Up to 600 t of hydrogen a day, shipped as up to 1.2 Mt of ammonia a year to a single buyer, Air Products, under a 30-year contract. Construction was completed in mid-2026; commercial operation is planned for 2027.', fn: 'n22' },
  { n: 'HIF Haru Oni (Chile)', s: 'Haru Oni', size: '1.2 MW electrolyser, one 3.4 MW wind turbine, $78 m', ev: [[2022.95, 'ok', 'first e-gasoline'], [2025.0, 'bad', '55 million L/yr (revised plan): not built'], [2027.0, 'bad', '550 million L/yr (revised plan)']], note: 'The pilot is rated at 130,000 litres of e-gasoline a year, with CO₂ from a brewery rather than from the air. Its $78 million cost works out to about $600 per litre of annual gasoline output, although the plant also makes methanol. At the 2021 groundbreaking the partners planned 55 million litres a year by 2024 and 550 million by 2026; after opening, HIF moved the targets to 2025 and 2027. Neither has been built, and in 2025 HIF’s website pushed mass production back to 2029.', fn: 'n23' },
  { n: 'Ørsted FlagshipONE (Sweden)', s: 'FlagshipONE', size: '55,000 t/yr e-methanol', ev: [[2022.95, 'ok', 'investment decision'], [2024.6, 'bad', 'cancelled; DKK 1.5 bn write-down']], note: 'Europe’s largest e-methanol project, aimed at shipping, was stopped in August 2024 because buyers would not sign long-term contracts at the price it needed.', fn: 'n24' },
  { n: 'ArcelorMittal Bremen + Eisenhüttenstadt (Germany)', s: 'ArcelorMittal', size: 'hydrogen-ready steel, €1.3 bn of public aid', ev: [[2025.45, 'bad', '€1.3 bn aid declined']], note: 'In June 2025 the company declined €1.3 billion of German support for direct-reduction plants, citing energy costs; it said even running the plants on natural gas at first would not pay.', fn: 'n24' },
  { n: 'HyScale 100, Heide refinery (Germany)', s: 'HyScale 100', size: '500 MW electrolysers (2.1 GW planned)', ev: [[2026.6, 'bad', 'reported cancelled']], note: 'The 500 MW first phase at the Heide refinery, with a planned expansion to 2.1 GW, was reported abandoned in 2026.', fn: 'n24' },
];
export function projects(el) {
  const st = { view: 'pipe', sel: 0 };
  let geo = [];
  const fig = new Fig(el, {
    label: 'Hydrogen ambitions against reality: the announced production pipeline and its shrinkage, and a timeline of named projects that were built, delayed or cancelled',
    height: w => w < 600 ? 400 : 300,
    draw(ctx, w, h) {
      const narrow = w < 600; geo = [];
      if (st.view === 'pipe') {
        const A = { l: 16, r: w - 70, t: 26, b: h - 20 }, xs = scale(0, 100, A.l, A.r), rowH = (A.b - A.t) / PIPE.length;
        PIPE.forEach(([s, v, c], i) => {
          if (narrow) s = ['Hydrogen demand, 2024', 'Announced for 2030 (2024)', 'Same, a year later (2025)', 'Built or funded, by 2030', 'Low-emissions, 2025'][i];
          const y = A.t + i * rowH, bh = Math.min(22, rowH * 0.42);
          text(ctx, s, A.l, y + 12, { size: narrow ? 10.5 : 11.5, weight: 600, color: C.ink });
          ctx.fillStyle = alpha(c, 0.8); ctx.fillRect(A.l, y + 20, Math.max(2, xs(v) - A.l), bh);
          text(ctx, `${v} Mt`, xs(v) + 6, y + 20 + bh / 2 + 4, { size: 11.5, weight: 700, color: C.ink });
        });
      } else {
        const A = { l: narrow ? 92 : 220, r: w - (narrow ? 14 : 30), t: 34, b: h - 30 };
        const { sx } = axes(ctx, { box: A, x0: 2021, x1: 2028, y0: 0, y1: 1, xticks: narrow ? [2022, 2024, 2026, 2028] : [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028], yticks: [], xfmt: String, grid: false });
        const today = 2026 + 9 / 12 + 9 / 365; line(ctx, sx(today), A.t - 10, sx(today), A.b, alpha(C.ink, 0.5), 1, [3, 3]); text(ctx, 'today', sx(today), A.t - 14, { size: 10, color: C.ink3, align: 'center' });
        const rowH = (A.b - A.t) / PROJ.length;
        PROJ.forEach((p, i) => {
          const y = A.t + i * rowH + rowH / 2, sel = st.sel === i;
          text(ctx, narrow ? p.s : p.n, A.l - 10, y + 4, { size: narrow ? 10.5 : 11, weight: sel ? 700 : 550, color: C.ink, align: 'right' });
          const xs0 = sx(p.ev[0][0]), xs1 = sx(Math.min(2028, p.ev[p.ev.length - 1][0]));
          line(ctx, xs0, y, xs1, y, alpha(C.ink, sel ? 0.5 : 0.25), sel ? 3 : 2);
          p.ev.forEach(([t, k, s], j) => {
            const x = sx(Math.min(2028, t)), col = k === 'ok' ? OK : k === 'bad' ? BAD : PLAN;
            if (k === 'plan') circle(ctx, x, y, 6, '#fff', col, 2); else circle(ctx, x, y, 6, col, '#fff', 1.5);
            if (sel) text(ctx, narrow ? s.split(',')[0].replace(' expected', '') : s, x, y + (j % 2 ? 20 : -11), { size: 10, weight: 600, color: darken(col, 0.2), align: x > A.r - 60 ? 'right' : x < A.l + 60 ? 'left' : 'center', halo: true });
          });
          geo.push({ i, y0: y - rowH / 2, y1: y + rowH / 2 });
        });
      }
    },
  });
  fig.interact({ hit: (x, y) => st.view === 'proj' ? geo.find(g => y >= g.y0 && y <= g.y1) || null : null, cursor: 'pointer', hover: o => { if (o && o.i !== st.sel) { st.sel = o.i; upd(); } }, down: o => { st.sel = o.i; upd(); } });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'The pipeline', value: 'pipe', name: 'pj-pipe' }, { label: 'Five projects', value: 'proj', name: 'pj-proj' }], value: st.view, onchange: v => { st.view = v; upd(); } });
  function upd() {
    if (st.view === 'pipe') ro.innerHTML = `A year of delays and cancellations cut the low-emissions hydrogen that announced projects could make by 2030 from <b>49 to 37 million tonnes</b> a year. Projects that are operating or have taken an investment decision add up to <b>4.2 Mt</b> — about 4% of today’s hydrogen use.<sup class="fn"><a href="#n21">21</a></sup>`;
    else { const p = PROJ[st.sel]; ro.innerHTML = `<b>${p.n}</b> — ${p.size}. ${p.note}<sup class="fn"><a href="#${p.fn}">${p.fn.slice(1)}</a></sup> Hover or tap a row.`; }
    fig.invalidate();
  }
  upd();
}

/* ---------------- mandates ---------------- */
const SAF = [[2025, 2, 0], [2030, 6, 1.2], [2032, 6, 2], [2035, 20, 5], [2040, 34, 10], [2045, 42, 15], [2050, 70, 35]];
export function mandates(el) {
  const st = { view: 'saf' };
  const fig = new Fig(el, {
    label: 'EU aviation fuel mandates: the minimum share of sustainable and of synthetic aviation fuel from 2025 to 2050; and the subsidy per kilogram of hydrogen bid in the European Hydrogen Bank auctions',
    height: w => w < 600 ? 330 : 290,
    draw(ctx, w, h) {
      const narrow = w < 600;
      if (st.view === 'saf') {
        const A = { l: narrow ? 42 : 56, r: w - (narrow ? 16 : 130), t: 40, b: h - 40 };
        const { sx, sy } = axes(ctx, { box: A, x0: 2024, x1: 2051, y0: 0, y1: 75, xticks: narrow ? [2025, 2035, 2045] : [2025, 2030, 2035, 2040, 2045, 2050], yticks: [0, 20, 40, 60], yfmt: v => v + '%', xfmt: String, ylabel: 'share of jet fuel at EU airports' });
        const step = (idx, col, lab) => {
          const pts = []; SAF.forEach(([y, a, b], i) => { const v = [a, b][idx], y1 = i < SAF.length - 1 ? SAF[i + 1][0] : 2051; pts.push([sx(y), sy(v)], [sx(y1), sy(v)]); });
          ctx.fillStyle = alpha(col, 0.25); ctx.beginPath(); ctx.moveTo(pts[0][0], sy(0)); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(pts[pts.length - 1][0], sy(0)); ctx.closePath(); ctx.fill();
          pathLine(ctx, pts, col, 2.2);
          if (!narrow) text(ctx, lab, A.r + 8, sy(SAF[SAF.length - 1][idx + 1]) + 4, { size: 10.5, weight: 650, color: darken(col, 0.2) });
        };
        step(0, mix(C.biomass, FUELC, 0.3), 'all sustainable fuel'); step(1, H2C, 'synthetic (e-fuel)');
        SAF.forEach(([y, a, b]) => { if (y >= 2035 || y === 2025 || y === 2030) { text(ctx, a + '%', sx(y) + 3, sy(a) - 6, { size: 10, weight: 650, color: C.ink2, halo: true }); if (b) text(ctx, b + '%', sx(y) + 3, sy(b) - 6, { size: 10, weight: 650, color: darken(H2C, 0.2), halo: true }); } });
        circle(ctx, sx(2025), sy(0.7), 5, C.ink, '#fff', 1.5); if (narrow) { line(ctx, sx(2025), sy(0.7) - 6, sx(2025), sy(0.7) - 44, alpha(C.ink, 0.4), 1); text(ctx, 'world, 2025: 0.7%', sx(2025) + 4, sy(0.7) - 48, { size: 10, color: C.ink2, halo: true }); } else text(ctx, 'world, 2025: 0.7%', sx(2025) + 8, sy(0.7) - 26, { size: 10, color: C.ink2, halo: true });
        if (narrow) { text(ctx, 'all sustainable', A.l + 6, A.t + 4, { size: 10, weight: 650, color: darken(mix(C.biomass, FUELC, 0.3), 0.2) }); text(ctx, 'synthetic', A.l + 6, A.t + 18, { size: 10, weight: 650, color: darken(H2C, 0.2) }); }
      } else {
        const A = { l: narrow ? 16 : 230, r: w - 30, t: 40, b: h - 50 };
        const xs = scale(0, 2, A.l, A.r);
        const rows = [...FUEL.ehb.map(a => [a.n, a.lo, a.hi, `${a.projects} projects, ${a.gw} GW, €${a.eur} m`]), ['US 45V tax credit (maximum)', 3 / 1.13, 3 / 1.13, '$3/kg for 10 years; construction must start before 2028']];
        const rowH = (A.b - A.t) / rows.length;
        [0, 0.5, 1, 1.5, 2].forEach(v => { line(ctx, xs(v), A.t - 6, xs(v), A.b, C.grid, 1); text(ctx, '€' + v, xs(v), A.b + 16, { size: 11, color: C.ink3, align: 'center' }); });
        text(ctx, 'subsidy per kg of hydrogen', A.r, A.b + 34, { size: 11, weight: 500, color: C.ink3, align: 'right' });
        rows.forEach(([n, lo, hi, sub], i) => {
          const y = A.t + i * rowH + rowH * 0.5;
          if (narrow) { text(ctx, n, A.l, y - 14, { size: 10.5, weight: 650, color: C.ink }); }
          else { text(ctx, n, A.l - 10, y - 2, { size: 11, weight: 650, color: C.ink, align: 'right' }); text(ctx, sub, A.l - 10, y + 12, { size: 10, color: C.ink3, align: 'right' }); }
          const col = i < 2 ? H2C : FUELC;
          if (hi > lo) { ctx.fillStyle = alpha(col, 0.75); rrect(ctx, xs(lo), y - 8, xs(hi) - xs(lo), 16, 4); ctx.fill(); text(ctx, `€${lo.toFixed(2)}–${hi.toFixed(2)}`, xs(hi) + 6, y + 4, { size: 10.5, weight: 650, color: C.ink }); }
          else { circle(ctx, xs(lo), y, 7, col, '#fff', 1.5); text(ctx, `≈€${lo.toFixed(2)}`, xs(lo) - 10, y + 4, { size: 10.5, weight: 650, color: C.ink, align: 'right' }); }
          if (narrow) text(ctx, sub, A.l, y + 22, { size: 9.5, color: C.ink3 });
        });
      }
    },
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'EU aviation mandates', value: 'saf', name: 'm-saf' }, { label: 'Hydrogen subsidies', value: 'ehb', name: 'm-ehb' }], value: st.view, onchange: v => { st.view = v; upd(); } });
  function upd() {
    ro.innerHTML = st.view === 'saf'
      ? `From 2030, 1.2% of the jet fuel supplied at EU airports must be synthetic on average; by 2050, 35%. Sustainable fuels of all kinds made up about 0.7% of the world’s jet fuel in 2025.`
      : `Winning bids in the European Hydrogen Bank auctions asked for <b>€0.20–0.60</b> per kilogram on top of what buyers pay — far less than the cost gap in the cost explorer above, because winners sit where wind and sun are best, and most can stack national support on top.`;
    fig.invalidate();
  }
  upd();
  euroFigure(el, fig, ctl, 'eu-mandates');
}

/* ---------------- whereFits ---------------- */
// Pathway values come from the section 1 chain model at the shared electrolyser basis (H2_ETA), so the two figures agree.
const ch = k => Math.round(chainResult(k, H2_ETA, false).out);
// Fuel-cell home heating: Agora's 45 kWh at 70% electrolysis, rescaled to this part's electrolyser basis.
const FC_HEAT = Math.round(45 * H2_ETA / 0.70);
const USES = [
  { n: 'Car', opts: [['battery', ch('bev')], ['hydrogen', ch('fcev')], ['e-fuel', ch('efcar')]], note: `Batteries win: an e-fuel car needs about ${Math.round(ch('bev') / ch('efcar'))} times the electricity per kilometre.`, verdict: 'electrify' },
  { n: 'Home heating', opts: [['heat pump', ch('hp')], ['hydrogen fuel cell', FC_HEAT], ['e-methane boiler', ch('emeth')]], note: 'A heat pump delivers almost three units of heat per unit of electricity; burning e-methane delivers less than half a unit.', verdict: 'electrify' },
  { n: 'Short-haul trucks, buses, trains', opts: null, note: 'Battery trucks and overhead-wire trains are already on the road and rails; hydrogen buses and trains have mostly lost the tenders where both competed.', verdict: 'electrify' },
  { n: 'Fertiliser and chemicals', opts: null, note: 'Ammonia and methanol are the product: they need hydrogen whatever happens. Replacing the ~100 Mt of fossil hydrogen used today is the largest no-regret market.', verdict: 'molecule' },
  { n: 'Steel (direct reduction)', opts: null, note: 'Hydrogen can replace coke as the chemical that strips oxygen from iron ore; a direct-electric route (electrolysis of iron) is still at pilot scale.', verdict: 'molecule' },
  { n: 'Ocean shipping', opts: null, note: 'Batteries suit ferries and short routes; deep-sea ships need fuel for weeks: e-methanol or e-ammonia, or biofuels.', verdict: 'molecule' },
  { n: 'Long-haul aviation', opts: null, note: 'No battery comes close to the energy per kilogram of kerosene; e-kerosene and biofuels are the only drop-in options.', verdict: 'molecule' },
  { n: 'Seasonal power storage', opts: [['battery (days)', ch('batt')], ['hydrogen (weeks)', ch('h2pow')]], note: 'Batteries win for hours to days; for a windless winter fortnight, hydrogen in salt caverns may be the cheapest way to keep energy, despite losing about two-thirds of it.', verdict: 'both' },
];
export function whereFits(el) {
  const st = { sel: 6 };
  let geo = [];
  const fig = new Fig(el, {
    label: 'Where electricity-based molecules make sense and where direct electrification wins, with end-to-end efficiencies where both are possible',
    height: w => w < 600 ? 470 : 430,
    draw(ctx, w, h) {
      const narrow = w < 600, A = { l: narrow ? 16 : 230, r: w - 20, t: 34, b: h - 16 }, rowH = (A.b - A.t) / USES.length; geo = [];
      const xs = scale(0, 400, A.l, A.r);
      if (!narrow) { [0, 100, 200, 300].forEach(v => { line(ctx, xs(v), A.t - 6, xs(v), A.b, C.grid, 1); text(ctx, v + '%', xs(v), A.t - 10, { size: 10, color: C.ink3, align: 'center' }); }); text(ctx, 'useful energy per unit of electricity', A.l - 10, A.t - 10, { size: 10.5, color: C.ink3, align: 'right', weight: 500 }); }
      USES.forEach((u, i) => {
        const y = A.t + i * rowH, sel = st.sel === i, vc = u.verdict === 'electrify' ? ELEC : u.verdict === 'molecule' ? H2C : mix(ELEC, H2C, 0.5);
        if (sel) { ctx.fillStyle = alpha(vc, 0.08); ctx.fillRect(narrow ? 0 : 8, y + 2, w - (narrow ? 0 : 16), rowH - 4); }
        const ny = narrow ? y + 14 : y + rowH / 2 + 4;
        text(ctx, u.n, narrow ? A.l : A.l - 10, ny, { size: 11.5, weight: sel ? 700 : 600, color: C.ink, align: narrow ? 'left' : 'right' });
        const by = narrow ? y + 22 : y + rowH * 0.13, bh = narrow ? Math.min(12, rowH - 30) : rowH * 0.74;
        if (u.opts) {
          const xsN = narrow ? scale(0, 400, A.l + 140, A.r) : xs, n = u.opts.length, sub = bh / n;
          u.opts.forEach(([s, v], j) => { const yy = narrow ? y + 4 + j * ((rowH - 8) / n) : by + j * sub; const hh = narrow ? (rowH - 8) / n - 2 : sub - 2; ctx.fillStyle = alpha(j === 0 ? ELEC : H2C, j === 0 ? 0.8 : 0.55); ctx.fillRect(xsN(0), yy, xsN(v) - xsN(0), hh); text(ctx, `${s} ${v}%`, xsN(v) + 4, yy + hh / 2 + 4, { size: 9.5, color: C.ink2, halo: true }); });
        } else {
          const tag = u.verdict === 'electrify' ? 'electrify directly' : 'needs molecules';
          const x0 = narrow ? A.r - measure(ctx, tag, 10.5, 650) - 16 : xs(0);
          ctx.fillStyle = alpha(vc, 0.85); rrect(ctx, x0, (narrow ? y + 2 : by + bh / 2 - 10), measure(ctx, tag, 10.5, 650) + 16, 20, 10); ctx.fill();
          text(ctx, tag, x0 + 8, (narrow ? y + 16 : by + bh / 2 + 4), { size: 10.5, weight: 650, color: '#fff' });
        }
        geo.push({ i, y0: y, y1: y + rowH });
      });
    },
  });
  fig.interact({ hit: (x, y) => geo.find(g => y >= g.y0 && y <= g.y1) || null, cursor: 'pointer', hover: o => { if (o && o.i !== st.sel) { st.sel = o.i; upd(); } }, down: o => { st.sel = o.i; upd(); } });
  const ro = readout(el);
  function upd() { const u = USES[st.sel]; ro.innerHTML = `<b>${u.n}.</b> ${u.note} Hover or tap a row.`; fig.invalidate(); }
  upd();
}
