// Jensen–Katić wake model used by the wake figure (wind1.js).
// Positions in rotor diameters; dir is the meteorological direction the wind comes FROM, in degrees.
// - Thrust coefficient 0.78: IEA 15 MW thrust at 9 m/s (1.78 MN) over ½ρAv².
// - Wake expansion k = 0.04 offshore, the value used for large offshore farms (Gaumond et al. 2013, Horns Rev/Lillgrund benchmark), 0.075 onshore.
// - Each wake's deficit is weighted by the fraction of the downstream rotor's disc it covers (Katić et al. 1986),
//   and overlapping deficits combine as root-sum-of-squares.
// - Direction wander: results averaged over a normal distribution of directions, σ = 5° (method of Gaumond et al. 2014,
//   Wind Energy 17, 1169, doi:10.1002/we.1625, which showed this is what reconciles Jensen with Horns Rev data).
// Validation: Horns Rev, 7 D, 8 m/s, wind along a row: second-turbine power ≈ 0.6 of the first, deeper rows ≈ 0.55
// (Barthelmie et al. 2009). This model: 0.59, 0.56, 0.55, 0.55. Over all directions (uniform rose) the 5 × 4 array at 7 D
// loses 12%, inside the 10–20% measured for large offshore farms.
export const CT = 0.78, A0 = 1 - Math.sqrt(1 - CT);
export const SIGMA = 5;
export function layoutGrid(cols, rows, sp) { const t = []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) t.push([(c - (cols - 1) / 2) * sp, (r - (rows - 1) / 2) * sp]); return t; }
export function downwind(dir) { const th = (dir + 180) * Math.PI / 180; return [Math.sin(th), -Math.cos(th)]; }
// share of a rotor disc (radius r) at lateral offset d that lies inside a wake of radius rw
export function overlap(d, rw, r = 0.5) {
  if (d >= rw + r) return 0; if (d <= rw - r) return 1;
  const a = r * r * Math.acos((d * d + r * r - rw * rw) / (2 * d * r)) + rw * rw * Math.acos((d * d + rw * rw - r * r) / (2 * d * rw)) - 0.5 * Math.sqrt((-d + r + rw) * (d + r - rw) * (d - r + rw) * (d + r + rw));
  return a / (Math.PI * r * r);
}
// deficit at point p; with skip = i it is the disc-averaged deficit felt by turbine i
export function deficitAt(T, px, py, dir, k, skip = -1) {
  const [ux, uy] = downwind(dir);
  let s2 = 0;
  for (let i = 0; i < T.length; i++) {
    if (i === skip) continue;
    const dx = px - T[i][0], dy = py - T[i][1], x = dx * ux + dy * uy; if (x <= 0.01) continue;
    const rr = Math.abs(-dx * uy + dy * ux), rw = 0.5 + k * x;
    const f = skip >= 0 ? overlap(rr, rw) : (rr <= rw ? 1 : 0); if (!f) continue;
    const d = A0 / Math.pow(1 + 2 * k * x, 2) * f; s2 += d * d;
  }
  return Math.sqrt(s2);
}
const SPREAD = []; for (let o = -10; o <= 10; o += 1) SPREAD.push([o, Math.exp(-o * o / (2 * SIGMA * SIGMA))]);
const WS = SPREAD.reduce((a, b) => a + b[1], 0);
export function turbinePower(T, i, dir, k) { let s = 0; for (const [o, wt] of SPREAD) s += wt * Math.pow(1 - deficitAt(T, T[i][0], T[i][1], dir + o, k, i), 3); return s / WS; }
export function arrayEff(T, dir, k) { let s = 0; T.forEach((t, i) => { s += turbinePower(T, i, dir, k); }); return s / T.length; }
// all directions equally likely (uniform wind rose), 5° steps
export function roseCurve(T, k, step = 5) { const c = []; for (let d = 0; d < 360; d += step) c.push([d, arrayEff(T, d, k)]); return c; }
export const roseEff = (curve) => curve.reduce((a, b) => a + b[1], 0) / curve.length;
