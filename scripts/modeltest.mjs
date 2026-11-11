// Sanity checks for src/lib/model.js: the defaults must land where the RESTRUCTURE docs say they do.
import { run, at, PRESETS, RUNGS, verdict, bar, solveLever, solveJoint, actTwo, A2, launchOnly, band } from '../src/lib/model.js';
let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL', m); } else console.log('ok  ', m); };
for (const [n, p] of Object.entries(PRESETS)) { const r = run(p); console.log(n, [2030, 2035, 2050].map(y => Math.round(at(r, y).m)).join(' / ')); }
const mid = run(PRESETS.mid);
ok(Math.abs(at(mid, 2030).m / 210 - 1) < 0.15, 'Mid 2030 ≈ 210 TWh (IEA Base-consistent)');
ok(Math.abs(at(mid, 2035).m / 420 - 1) < 0.25, 'Mid 2035 ≈ 420 TWh');
ok(Math.abs(at(mid, 2050).m / 1000 - 1) < 0.15, 'Mid 2050 ≈ 1,000 TWh');
ok(at(run(PRESETS.high), 2035).m < 1700, 'High 2035 is below the IEA Lift-Off figure for ALL data centres (1,700)');
for (const r of RUNGS) ok(verdict(at(mid, r.year).m, PRESETS.mid, bar(r, PRESETS.mid)) === 'NO', `Mid: ${r.id} is NO`);
const r3 = RUNGS[2], s = solveLever('T', PRESETS.mid, r3); ok(!s.ok, 'R3: tokens per task alone cannot do it (the supply cap blocks it)');
const j = solveJoint(PRESETS.mid, r3); ok(j.ok, 'R3: raising the cap and tokens together can');
if (j.ok) { const q = { ...PRESETS.mid, cap: j.cap, T: j.T }; ok(verdict(at(run(q), 2050).m, q, bar(r3, q)) === 'YES', `R3 YES at cap ${Math.round(j.cap)} GW, tokens × ${Math.round(j.T)}`); }
const a = actTwo(A2); console.log('act2', JSON.stringify(a));
ok(Math.abs(a.P - 108) < 3, '100× by 2035 at 40%/yr needs ≈ 108 GW');
ok(a.kind === 'not-needed', '100× by 2035: terrestrial suffices (NO, type 1)');
ok(Math.abs(launchOnly(200, 13) - 0.0625) < 0.002, 'launch-only $/kWh at $200/kg, 13 kg/kW ≈ 0.064');
ok(Math.abs(launchOnly(3600, 40) - 3.46) < 0.02, '$3,600/kg, 40 kg/kW ≈ $3.46/kWh');
const z = actTwo({ ...A2, Mx: 1e4, year: 2050 }); console.log('1e4x 2050', JSON.stringify(z));
ok(z.kind === 'not-enough', '10⁴× by 2050 with 145 launches a year: not enough, even with orbit');
// satellites retire after `life` years (default 5), so 2050 orbit = 5 years of launches, not 21
ok(Math.abs(z.orbitGW - 145 * 5 * 150e3 / 25 / 1e6) < 1e-9, 'orbit GW in 2050 counts only the last 5 years of launches');
const z2 = actTwo({ ...A2, Mx: 1e4, year: 2050, launches: 50000, kgkw: 13 }); console.log('1e4x 2050 @50k launches, 13 kg/kW', JSON.stringify(z2));
ok(z2.kind === 'only', '10⁴× by 2050 with 50,000 launches a year at 13 kg/kW: only with orbit');
ok(actTwo({ ...A2, Mx: 1e4, year: 2050, launches: 25000 }).kind === 'not-enough', '25,000 launches a year at 25 kg/kW keeps only 750 GW flying: not enough');
process.exit(bad ? 1 : 0);
