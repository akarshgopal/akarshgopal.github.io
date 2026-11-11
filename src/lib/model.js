// The series' two models, kept apart from any drawing so they can be tested in node (scripts/modeltest.mjs).
// Everything here is a labelled ASSUMPTION or a published anchor; none of it is a forecast. See RESTRUCTURE.md §1.4–1.5, §4.

// ---------- Act 1: will AI inference become humanity's largest energy expenditure? ----------
export const M0 = 55;              // TWh AI inference @ meter, 2025. DERIVED: 0.15 × 415 × 1.5 × 0.60. 0.15 × 415 ≈ 62 TWh is SERVER-level (my reading of the IEA equipment split; the IEA text prints no '15%' sentence — checked 30 Oct 2026). ×1.5 = ×1.3 (IEA: accelerated servers "grow by 30% annually", Base Case) × ~1.15 facility overhead to reach the meter (hyperscale PUE; Google fleet 1.09); at Uptime's average PUE 1.56 it would be ≈75. The 0.60 inference share is SECONDARY (arXiv:2509.07218). If 0.40 → ≈37; if 0.80 → ≈73. Band 40–80.
export const M0_BAND = [40, 80];
export const TWH_PER_GW = 8.76;    // 8,760 h in a year: 1 GW of average draw = 8.76 TWh
export const CAP0_GW = M0 / TWH_PER_GW; // 2025 average draw of inference, about 6.3 GW
export const SHAPE_K = 2;          // demand rises fast, then saturates (assumed shape; not fitted)
export const Y0 = 2025, Y1 = 2050;

// The three rungs (bars). Numbers are cited or working bars labelled as such — never invented.
export const WORLD_ELEC_2035 = 37800; // TWh: IEA WEO 2025, CPS and STEPS ≈ same level in 2035. IEA final-consumption basis (same as 28,200 TWh in 2025 + ~1,000 TWh/yr), NOT Ember's generation-side 31,734
export const WORLD_ELEC_2050_ASSUMED = 60000; // TWh: my round assumption for % readouts only (free WEO tables lack a single published 2050 total in the prose we have)
export const RUNGS = [
  { id: 'R1', year: 2035, twh: 3800, name: 'R1 · 2035', claim: '≥ 10% of the world’s electricity', note: '10% of ≈37,800 TWh (IEA WEO 2025 CPS/STEPS), rounded to 3,800. Lift-Off puts all data centres at ~1,700 TWh in 2035.' },
  { id: 'R2', year: 2050, twh: 6000, name: 'R2 · 2050', claim: 'bigger than any other use of electricity', note: 'WORKING bar ≈ space-cooling class: 2,900 TWh in 2025 +1,600 by 2035 (IEA commentary 10 Jul 2026) → ~4,500; tracking “more than double by 2050 with no action” → ≳5,800, rounded to 6,000. Free hunt 28 Oct 2026: no WEO largest-end-use cell; Highlights XLSB needs login; FoC 2018 HTML has “more than triple” without a free absolute TWh cell (OWID’s “>6,000 TWh” paraphrase not used as primary). Motor systems ~10,400 TWh (2023, IEA-4E EMSA) span many end-uses — not R2.' },
  { id: 'R3', year: 2050, twh: 17200, name: 'R3 · 2050', claim: 'bigger than any other use of energy', note: 'Buildings space + water heating: 62 EJ in 2021 (IEA, The Future of Heat Pumps, 2022, §1.2, primary PDF) ≈ 17,200 TWh at 277.8 TWh/EJ. Using 2021 as the 2050 bar is conservative if heating final energy falls with efficiency. "Use" = the smallest big end-use candidate; road transport is larger (~28% × ~450 EJ final × ~¾ road ≈ 95 EJ ≈ 26,000 TWh; road share ~74% per Eurostat EU-2022, assumed similar worldwide).' },
];
export const TRIPWIRES = [{ year: 2030, twh: 300 }, { year: 2035, twh: 1000 }];
export const IEA_DC_2035 = [700, 1700]; // all data centres, not only inference: IEA Headwinds ~700 to Lift-Off >1,700 TWh

// Sliders: U = people x tasks a day (x today by 2050); T = tokens per task (x today by 2050); g0 = yearly efficiency gain now;
// h = years for that gain to halve; cap = most average power inference may draw in 2050 (GW); b = how much the bars move; u = forecast band.
export const LEVERS = {
  U: { min: 1, max: 300, log: true, label: 'People × tasks a day', unit: '×' },
  T: { min: 1, max: 10000, log: true, label: 'Tokens per task', unit: '×' },
  g0: { min: 0, max: 0.6, label: 'Efficiency gain per year', unit: '%' },
  h: { min: 3, max: 40, label: 'Years for that gain to halve', unit: 'yr' },
  cap: { min: 10, max: 5000, log: true, label: 'Power the world builds for inference', unit: 'GW' },
  b: { min: -0.3, max: 1, label: 'Other uses grow by 2050', unit: '%' },
  u: { min: 1, max: 4, label: 'Forecast band, either side', unit: '×' },
};
export const PRESETS = {
  low: { U: 10, T: 60, g0: 0.45, h: 14, cap: 150, b: 0, u: 2 },
  mid: { U: 30, T: 45, g0: 0.35, h: 12, cap: 400, b: 0, u: 2 },
  high: { U: 40, T: 45, g0: 0.30, h: 12, cap: 800, b: 0, u: 2 },
};

const sOf = y => { const t = (y - Y0) / (Y1 - Y0); return (1 - Math.exp(-SHAPE_K * t)) / (1 - Math.exp(-SHAPE_K)); };

/** One path, 2025..2050. Returns [{y, m (TWh, central), demand, eff, capTwh, capped}] */
export function run(p) {
  const out = []; let eff = 1;
  for (let y = Y0; y <= Y1; y++) {
    const s = sOf(y), demand = Math.exp(Math.log(p.U * p.T) * s);
    const capTwh = CAP0_GW * Math.pow(p.cap / CAP0_GW, s) * TWH_PER_GW;
    const free = M0 * demand / eff;
    out.push({ y, m: Math.min(free, capTwh), free, demand, eff, capTwh, capped: free > capTwh });
    eff *= 1 + p.g0 * Math.pow(2, -(y - Y0) / p.h);
  }
  return out;
}
export const at = (path, y) => path[y - Y0];
export const band = (m, p) => [m * (M0_BAND[0] / M0) / p.u, m * (M0_BAND[1] / M0) * p.u];

/** Bar for a rung under the benchmark slider b (other uses grow by b between now and 2050). */
export function bar(r, p) { const f = r.year === 2050 ? 1 + p.b : 1 + p.b * (r.year - Y0) / (Y1 - Y0); return r.twh * f; }

/** YES: central ≥ bar and the low end is within 2× of it. NO: even the high end is below the bar. Otherwise UNRESOLVED. */
export function verdict(m, p, barTwh) {
  const [lo, hi] = band(m, p);
  if (hi < barTwh) return 'NO';
  if (m >= barTwh && lo >= barTwh / 2) return 'YES';
  return 'UNRESOLVED';
}
export const needCentral = (barTwh, p) => Math.max(barTwh, barTwh * (p.u * M0 / M0_BAND[0]) / 2);

/** Smallest/largest value of one lever that makes `rung` YES with everything else held. Returns {ok, value, why}. */
export function solveLever(lever, p, rung) {
  const target = needCentral(bar(rung, p), p), L = LEVERS[lever], f = v => at(run({ ...p, [lever]: v }), rung.year).m;
  const up = lever !== 'g0' && lever !== 'h'; // more of these -> more energy; for g0 and h, less is more
  const best = up ? L.max : L.min, worst = up ? L.min : L.max;
  if (f(best) < target) return { ok: false, best: f(best), target, value: best };
  if (f(worst) >= target) return { ok: true, value: worst, target, already: true };
  let a = worst, b = best; // bisect in log space for log levers
  for (let i = 0; i < 60; i++) { const m = L.log ? Math.sqrt(a * b) : (a + b) / 2; (f(m) >= target ? (b = m) : (a = m)); }
  return { ok: true, value: b, target };
}
/** Raise the supply cap just enough, then solve tokens per task. */
export function solveJoint(p, rung) {
  const target = needCentral(bar(rung, p), p), cap = Math.min(LEVERS.cap.max, Math.max(p.cap, target * 1.1 / TWH_PER_GW));
  const q = { ...p, cap }, s = solveLever('T', q, rung);
  return s.ok ? { ok: true, cap, T: s.value } : { ok: false, cap };
}

// ---------- Act 2: is orbital compute the only answer to 100× AI compute? ----------
export const B0_GW = 31.24;     // end-2025 AI data-centre facility power, Epoch AI (13.5 GW end-2024 -> ~31 GW end-2025)
export const HORIZONS = { 2035: { years: 10, terr: 316 }, 2040: { years: 15, terr: 600 }, 2050: { years: 25, terr: 1500 } };
// 316 GW = 31.24 × 1.26^10: a 26%/yr slowdown ASSUMPTION (capacity grew ~2.3× in 2025), not Epoch's trend
export const TREND_X = 3.3;     // "today's trend" preset: global AI computing capacity ~3.3×/yr since 2022 (90% CI 2.7–4.1), Epoch AI https://epoch.ai/data-insights/ai-chip-production
export const FIRST_BULK_LAUNCH = 2029; // my assumption: the first Starcloud-3-class deployments around 2028-29
export const LAUNCH_T = 150;    // tonnes to orbit per launch (Starship-class payload used in the series' sources)
export const REF_GW = [
  { gw: 31.24, name: 'AI data centres today' },
  { gw: 100, name: 'Epoch: AI by 2030' },
  // the need, ceiling and orbit bars are rated capacity; these two are average draw (a year's energy ÷ 8,760 h), so marked "avg"
  { gw: 3219, name: 'all electricity (avg)' },
  { gw: 19000, name: 'all human energy (avg)' },
  { gw: 1.735e8, name: 'sunlight on Earth' },
];
// life: satellite service life in years (my assumption, the same 5 years the launch-cost floor amortises over); older satellites retire
export const A2 = { Mx: 100, g: 0.4, Emax: 100, year: 2035, terr: 316, launches: 145, kgkw: 25, usdkg: 1500, life: 5 };
export const TERR_BAND = [0.065, 0.34]; // $ per kWh of data-centre power, Suncatcher paper (derived from $570-3,000 per kW-year)

export function actTwo(p) {
  const H = HORIZONS[p.year], E = Math.min(p.Emax, Math.pow(1 + p.g, H.years)), P = B0_GW * p.Mx / E;
  // only the last `life` years of launches are still flying
  const yrs = Math.max(0, p.year - FIRST_BULK_LAUNCH), orbitGW = p.launches * Math.min(yrs, p.life ?? 5) * LAUNCH_T * 1000 / p.kgkw / 1e6;
  const reach = p.terr + orbitGW;
  let v, why;
  if (P <= p.terr) { v = 'NO'; why = 'Not needed: the grid alone can supply it.'; }
  else if (P <= reach) { v = 'YES'; why = 'Only with orbit: the grid falls short and orbit closes the gap.'; }
  else { v = 'NO'; why = 'Not enough: even grid plus orbit cannot supply it.'; }
  const kind = P <= p.terr ? 'not-needed' : P <= reach ? 'only' : 'not-enough';
  // "unresolved" if the grid ceiling or the orbit reach is within 2x of the need
  const near = kind === 'not-needed' ? P > p.terr / 2 : kind === 'only' ? false : P < reach * 2;
  return { E, P, orbitGW, reach, v: near && kind !== 'only' ? 'UNRESOLVED' : v, kind, why, yrs };
}
/** Launch-only cost of delivered power, $/kWh (a lower bound: no satellite build, ops, or lost chips). */
export const launchOnly = (usdkg, kgkw) => usdkg * kgkw / (5 * 8760 * 0.95);
