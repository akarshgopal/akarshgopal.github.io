// Illustrative 4-node network for the zonal vs nodal figure.
import { solveLP, ptdf } from './lp.js';

export const NODES = [
  { id: 'N', name: 'North coast', x: 0.48, y: 0.12 },
  { id: 'E', name: 'East', x: 0.80, y: 0.42 },
  { id: 'W', name: 'West', x: 0.18, y: 0.50 },
  { id: 'S', name: 'South', x: 0.55, y: 0.86 },
];
export const LINES = [
  { from: 0, to: 1, x: 1, limit: 7 },   // N-E
  { from: 0, to: 2, x: 1, limit: 7 },   // N-W
  { from: 1, to: 3, x: 1, limit: 6 },   // E-S
  { from: 2, to: 3, x: 1, limit: 6 },   // W-S
  { from: 2, to: 1, x: 1.5, limit: 5 }, // W-E
];
// generator blocks: node, tech, cap, cost
export function gens(s) {
  return [
    { node: 0, tech: 'wind', cap: s.windN, cost: 0 },
    { node: 1, tech: 'lignite', cap: 9, cost: 85 },
    { node: 2, tech: 'gas', cap: 14, cost: 100 },
    { node: 3, tech: 'gas', cap: 8, cost: 108 },
    { node: 3, tech: 'peaker', cap: 14, cost: 150 },
    ...[0, 1, 2, 3].map(n => ({ node: n, tech: 'scarcity', cap: 40, cost: 1000 })),
  ];
}
export function loads(s) { return [5, 7, 11, s.loadS]; }

export function dispatch(s, limits, withLimits, dLoad) {
  const G = gens(s); const D = loads(s).map((v, i) => v + (dLoad && dLoad[i] || 0));
  const P = ptdf(4, LINES, 3);
  const c = G.map(g => g.cost);
  const rows = [{ a: G.map(() => 1), op: '=', b: D.reduce((a, b) => a + b, 0) }];
  if (withLimits) LINES.forEach((l, li) => {
    const a = G.map(g => P[li][g.node]);
    const off = D.reduce((s, d, n) => s + P[li][n] * d, 0);
    rows.push({ a, op: '<=', b: limits[li] + off });
    rows.push({ a, op: '>=', b: -limits[li] + off });
  });
  const r = solveLP(c, rows, G.map(g => g.cap));
  if (r.status !== 'optimal') return null;
  const inj = [0, 0, 0, 0]; G.forEach((g, j) => inj[g.node] += r.x[j]);
  const net = inj.map((v, n) => v - D[n]);
  const flows = LINES.map((l, li) => net.reduce((s, v, n) => s + P[li][n] * v, 0));
  return { x: r.x, obj: r.obj, G, D, inj, flows };
}

export function solve(s, limits, mode) {
  const con = dispatch(s, limits, true);
  const unc = dispatch(s, limits, false);
  const eps = 0.01;
  const lmp = [0, 1, 2, 3].map(n => { const d = [0, 0, 0, 0]; d[n] = eps; const r = dispatch(s, limits, true, d); return r && con ? (r.obj - con.obj) / eps : NaN; });
  const dz = [0, 0, 0, 0].map(() => 0); const ru = dispatch(s, limits, false, [eps, 0, 0, 0]);
  const zonal = ru && unc ? (ru.obj - unc.obj) / eps : NaN;
  return { con, unc, lmp, zonal, redispatchCost: con && unc ? con.obj - unc.obj : NaN, mode, dz };
}
