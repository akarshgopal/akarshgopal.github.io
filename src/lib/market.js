// Illustrative wholesale-market model. Physical relationships (SRMC = fuel/efficiency + CO2 × emission factor/efficiency + VOM)
// are standard; the fleet itself (unit sizes, efficiencies, fuel prices) is an ILLUSTRATIVE continental bidding zone,
// not a calibrated model of Germany.
import { C } from './colors.js';

export const TECHS = {
  legacy:  { name: 'Wind & solar on fixed tariffs', short: 'Subsidised VRE', color: C.solar },
  mustrun: { name: 'Must-run CHP / biomass', short: 'Must-run', color: C.mustrun },
  hydro:   { name: 'Hydro (run-of-river)', short: 'Hydro', color: C.hydro },
  wind:    { name: 'Wind', short: 'Wind', color: C.wind },
  solar:   { name: 'Solar', short: 'Solar', color: C.solar },
  nuclear: { name: 'Nuclear', short: 'Nuclear', color: C.nuclear },
  lignite: { name: 'Lignite', short: 'Lignite', color: C.lignite },
  coal:    { name: 'Hard coal', short: 'Hard coal', color: C.coal },
  gas:     { name: 'Gas combined-cycle', short: 'Gas CCGT', color: C.gas },
  peaker:  { name: 'Gas & oil peakers', short: 'Peakers', color: C.peaker },
  imports: { name: 'Imports', short: 'Imports', color: C.imports },
  storage: { name: 'Battery discharge', short: 'Battery', color: C.storage },
  scarcity:{ name: 'Demand response / scarcity', short: 'Scarcity', color: '#6b5f5a' },
};

// Emission factors in tCO2 per MWh of fuel heat (standard order-of-magnitude values).
const EF = { lignite: 0.40, coal: 0.34, gas: 0.20, oil: 0.27 };

// Thermal fleet: [tech, GW, efficiency, fuelKey, VOM €/MWh]
const THERMAL = [
  ['nuclear', 2, 0.33, 'uranium', 4], ['nuclear', 2, 0.33, 'uranium', 5], ['nuclear', 2, 0.33, 'uranium', 6], ['nuclear', 2, 0.33, 'uranium', 7],
  ['lignite', 2.5, 0.41, 'lignite', 4], ['lignite', 2.5, 0.39, 'lignite', 4], ['lignite', 2.5, 0.37, 'lignite', 4], ['lignite', 2.5, 0.35, 'lignite', 4], ['lignite', 2, 0.33, 'lignite', 4],
  ['coal', 2, 0.45, 'coal', 3], ['coal', 2, 0.43, 'coal', 3], ['coal', 2.5, 0.41, 'coal', 3], ['coal', 2.5, 0.39, 'coal', 3], ['coal', 2, 0.36, 'coal', 3],
  ['gas', 3, 0.60, 'gas', 2], ['gas', 3, 0.58, 'gas', 2], ['gas', 3, 0.56, 'gas', 2], ['gas', 3, 0.53, 'gas', 2], ['gas', 3, 0.50, 'gas', 2], ['gas', 3, 0.46, 'gas', 2],
  ['peaker', 2, 0.39, 'gas', 5], ['peaker', 2, 0.35, 'gas', 5], ['peaker', 2, 0.32, 'gas', 6], ['peaker', 1.5, 0.33, 'oil', 6],
];

export const DEFAULTS = { gas: 35, co2: 75, lignite: 6, coal: 12, oil: 50, uranium: 3 };

export function thermalUnits(p = {}) {
  const P = { ...DEFAULTS, ...p };
  const K = P.scale || {};
  return THERMAL.map(([tech, cap0, eff, fuel, vom], i) => {
    const cap = cap0 * (K[tech] ?? 1);
    const fuelPrice = P[fuel];
    const fuelCost = fuelPrice / eff;
    const co2Cost = (EF[fuel] || 0) * P.co2 / eff;
    return { id: tech + i, tech, cap, eff, fuel, fuelCost, co2Cost, vom, price: fuelCost + co2Cost + vom };
  });
}

/**
 * Build supply blocks for one period.
 * s: {wind, solar, legacyShare, mustrun, hydro, imports, importPrice, gas, co2, scarcity}
 */
export function supplyBlocks(s) {
  const blocks = [];
  const vre = (s.wind || 0) + (s.solar || 0);
  const legacy = vre * (s.legacyShare ?? 0);
  const wFrac = vre > 0 ? (s.wind || 0) / vre : 0.5;
  if (legacy > 0) {
    blocks.push({ id: 'legacyW', tech: 'wind', cap: legacy * wFrac, price: -60, legacy: true });
    blocks.push({ id: 'legacyS', tech: 'solar', cap: legacy * (1 - wFrac), price: -60, legacy: true });
  }
  if (s.mustrun) blocks.push({ id: 'mustrun', tech: 'mustrun', cap: s.mustrun, price: s.inflexible ? -90 : -20 });
  if (s.hydro) blocks.push({ id: 'hydro', tech: 'hydro', cap: s.hydro, price: s.inflexible ? -80 : 1 });
  if (s.wind) blocks.push({ id: 'wind', tech: 'wind', cap: s.wind * (1 - (s.legacyShare ?? 0)), price: 0 });
  if (s.solar) blocks.push({ id: 'solar', tech: 'solar', cap: s.solar * (1 - (s.legacyShare ?? 0)), price: 0 });
  for (const u of thermalUnits({ gas: s.gas, co2: s.co2, ...(s.coal != null ? { coal: s.coal } : {}), ...(s.scale ? { scale: s.scale } : {}) })) {
    if (u.cap < 1e-6) continue;
    if (s.noNuclear && u.tech === 'nuclear') continue;
    blocks.push({ ...u });
  }
  if (s.storageOut) blocks.push({ id: 'storage', tech: 'storage', cap: s.storageOut, price: -1 });
  if (s.imports) blocks.push({ id: 'imports', tech: 'imports', cap: s.imports, price: s.importPrice ?? 140 });
  blocks.push({ id: 'scarcity', tech: 'scarcity', cap: s.scarcity ?? 3, price: 600 });
  return blocks.filter(b => b.cap > 1e-6).sort((a, b) => a.price - b.price || (a.id < b.id ? -1 : 1));
}

/** Uniform-price clearing of stepwise supply against stepwise demand. demand: [{cap, price}] */
export const CAP_PRICE = 1000;
export function clear(supply, demand) {
  const prices = Array.from(new Set([...supply.map(b => b.price), ...demand.map(d => d.price), CAP_PRICE])).sort((a, b) => a - b);
  const S = p => supply.reduce((s, b) => s + (b.price <= p ? b.cap : 0), 0);
  const D = p => demand.reduce((s, d) => s + (d.price >= p ? d.cap : 0), 0);
  let price = CAP_PRICE, shortfall = 0;
  for (const p of prices) {
    if (S(p) >= D(p) - 1e-9) { price = p; break; }
  }
  // If supply at p exceeds demand strictly above p, the clearing price may be set by a demand step: check.
  const below = prices.filter(p => p < price);
  const qty = Math.min(S(price), D(price));
  if (price === CAP_PRICE && S(CAP_PRICE) < D(CAP_PRICE)) shortfall = D(CAP_PRICE) - S(CAP_PRICE);
  // Dispatch supply in merit order up to qty
  let rem = qty; const dispatch = {};
  let marginal = null;
  // blocks at the same price share the remaining quantity pro rata (e.g. legacy wind and solar)
  for (let i = 0; i < supply.length;) {
    let j = i; while (j < supply.length && supply[j].price === supply[i].price) j++;
    const grp = supply.slice(i, j), cap = grp.reduce((a, g) => a + g.cap, 0), take = Math.max(0, Math.min(cap, rem));
    for (const g of grp) { const q = cap > 0 ? g.cap * take / cap : 0; g.q = q; if (q > 0) { dispatch[g.tech] = (dispatch[g.tech] || 0) + q; marginal = g; } }
    rem -= take; i = j;
  }
  // Demand served
  let remD = qty; for (const d of [...demand].sort((a, b) => b.price - a.price)) { d.q = Math.max(0, Math.min(d.cap, remD)); remD -= d.q; }
  return { price, qty, dispatch, marginal, shortfall, below };
}

// ---------- Synthetic day profiles (illustrative, Germany-like shapes) ----------
export function loadProfile(h, season = 'summer', weekend = false) {
  // h in hours [0,24). Returns GW.
  const base = season === 'winter' ? 52 : 44;
  const amp = season === 'winter' ? 17 : 15;
  const morning = Math.exp(-Math.pow((h - 9.5) / 3.2, 2));
  const evening = Math.exp(-Math.pow((h - (season === 'winter' ? 18 : 19.5)) / 2.4, 2));
  const night = Math.exp(-Math.pow((h - 3.5) / 3.0, 2));
  let L = base + amp * (0.85 * morning + 0.95 * evening) - 5 * night + (h > 11 && h < 15 ? 2 : 0) * Math.exp(-Math.pow((h - 13) / 2, 2));
  if (weekend) L *= 0.85;
  return L;
}

export function solarShape(h, season = 'summer') {
  const rise = season === 'winter' ? 8.2 : season === 'spring' ? 6.2 : 5.0;
  const set = season === 'winter' ? 16.0 : season === 'spring' ? 18.3 : 21.2;
  if (h <= rise || h >= set) return 0;
  const x = (h - rise) / (set - rise);
  const peak = season === 'winter' ? 0.22 : season === 'spring' ? 0.62 : 0.72;
  return peak * Math.pow(Math.sin(Math.PI * x), 1.6);
}

export function windShape(h, level, seed = 0) {
  // gentle diurnal wobble around a level (GW)
  return Math.max(0, level * (1 + 0.12 * Math.sin((h + seed) / 24 * 2 * Math.PI * 1.3) + 0.06 * Math.sin((h * 2.7 + seed))));
}

/**
 * Simulate one day at hourly-ish resolution.
 * o: {season, solarCap, windLevel, gas, co2, storageGW, storageH, flexGW, legacyShare, steps, weekend}
 */
export function simulateDay(o) {
  const N = o.steps || 96;
  const out = [];
  const mk = (i, extra) => {
    const h = (i + 0.5) * 24 / N;
    const L = loadProfile(h, o.season, o.weekend) * (o.loadScale ?? 1) + (extra.load || 0);
    const solar = (o.solarCap || 0) * solarShape(h, o.season);
    const wind = windShape(h, o.windLevel || 0, o.seed || 0);
    const supply = supplyBlocks({
      wind, solar, legacyShare: o.legacyShare ?? 0.7, mustrun: o.mustrun ?? 7, hydro: o.hydro ?? 2, inflexible: true,
      imports: o.imports ?? 8, importPrice: 150, gas: o.gas ?? 35, co2: o.co2 ?? 75, storageOut: extra.dis || 0, noNuclear: o.noNuclear,
      ...(o.coal != null ? { coal: o.coal } : {}), ...(o.scale ? { scale: o.scale } : {}),
    });
    const demand = [{ cap: L, price: CAP_PRICE }, { cap: (o.exportGW ?? 10), price: 15 }];
    if (extra.ch) demand.push({ cap: extra.ch, price: 500 });
    if (o.flexGW) demand.push({ cap: o.flexGW, price: 30 });
    const r = clear(supply, demand);
    const vreAvail = wind + solar;
    const vreUsed = (r.dispatch.wind || 0) + (r.dispatch.solar || 0);
    return { h, load: L, solar, wind, price: r.price, dispatch: r.dispatch, curtail: Math.max(0, vreAvail - vreUsed), exported: demand[1].q, flex: o.flexGW ? demand[demand.length - 1].q : 0, marginal: r.marginal, shortfall: r.shortfall, ch: extra.ch || 0, dis: extra.dis || 0 };
  };
  for (let i = 0; i < N; i++) out.push(mk(i, {}));
  if (o.storageGW > 0) {
    // Greedy arbitrage: charge in cheapest periods, discharge in priciest, energy-limited.
    const E = o.storageGW * (o.storageH || 4); // GWh
    const dt = 24 / N;
    const nSlots = Math.max(1, Math.round((o.storageH || 4) / dt));
    const idx = out.map((p, i) => i);
    const cheap = [...idx].sort((a, b) => out[a].price - out[b].price).slice(0, nSlots);
    const dear = [...idx].sort((a, b) => out[b].price - out[a].price).filter(i => !cheap.includes(i)).slice(0, Math.round(nSlots * 0.88));
    const plan = idx.map(() => ({}));
    cheap.forEach(i => plan[i].ch = o.storageGW);
    dear.forEach(i => plan[i].dis = o.storageGW);
    void E;
    for (let i = 0; i < N; i++) if (plan[i].ch || plan[i].dis) out[i] = mk(i, plan[i]);
  }
  const avg = out.reduce((s, p) => s + p.price, 0) / N;
  const solarE = out.reduce((s, p) => s + (p.dispatch.solar || 0), 0);
  const solarRev = out.reduce((s, p) => s + (p.dispatch.solar || 0) * p.price, 0);
  const capture = solarE > 0 ? solarRev / solarE : NaN;
  const neg = out.filter(p => p.price < 0).length * 24 / N;
  const curtail = out.reduce((s, p) => s + p.curtail, 0) * 24 / N;
  return { periods: out, avg, capture, neg, curtail, captureRate: capture / avg };
}
