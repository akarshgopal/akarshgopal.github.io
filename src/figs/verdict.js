// The index page's three live figures: the Act 1 verdict meter, and Act 2's capacity meter and launch-cost chart.
// All numbers come from src/lib/model.js, where every default is labelled as a source, a derivation or an assumption.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line, circle, axes, clamp, tag } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint, more } from '../lib/ui.js';
import * as M from '../lib/model.js';
import { publish } from '../lib/lean.js';
import { act1FromPrefs, saveAct1, watchAct1 } from '../lib/prefs.js';

const L10 = Math.log10, narrow = w => w < 560;
const num = v => (v >= 100 ? Math.round(v).toLocaleString('en-GB') : v >= 10 ? (+v.toPrecision(2)).toLocaleString('en-GB') : (+v.toPrecision(2)).toString());
const mult = v => `× ${num(v)}`;
const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = n => String(n).replace(/-/g, '⁻').replace(/\d/g, d => SUPS[d]);
const big = v => (v >= 1e4 ? `${(v / 10 ** Math.floor(L10(v))).toFixed(1)} × 10${sup(Math.floor(L10(v)))}` : num(v));
const VCLS = { NO: 'no', YES: 'yes', UNRESOLVED: 'un' };
const lg = v => (L10(v));

function card(parent, cls = '') { const d = document.createElement('div'); d.className = 'vm-card ' + cls; d.innerHTML = '<span class="vm-r"></span><b class="vm-v"></b><span class="vm-d"></span>'; parent.appendChild(d); return d; }
function setCard(d, { r, v, label, desc }) { d.className = 'vm-card ' + VCLS[v]; d.querySelector('.vm-r').textContent = r; d.querySelector('.vm-v').textContent = label || v; d.querySelector('.vm-d').textContent = desc; }

// ---------------------------------------------------------------------------------------------------------------------------
// Act 1. Will AI inference become humanity's largest energy expenditure? A log-scale meter, three rungs, five assumptions.
// ---------------------------------------------------------------------------------------------------------------------------

/** Fill #ledger-act1 from PRESETS so the frozen Low/Mid/High table cannot drift from model.js. */
function fillAct1Ledger() {
  const table = typeof document !== 'undefined' && document.getElementById('ledger-act1');
  if (!table) return;
  const keys = ['low', 'mid', 'high'];
  const cols = keys.map(k => {
    const p = M.PRESETS[k], path = M.run(p);
    return {
      t30: M.at(path, 2030).m, t35: M.at(path, 2035).m, t50: M.at(path, 2050).m,
      v: M.RUNGS.map(rg => M.verdict(M.at(path, rg.year).m, p, M.bar(rg, p))),
    };
  });
  const fmt = v => (v >= 1000 ? `~${Math.round(v).toLocaleString('en-GB')}` : `~${Math.round(v)}`) + ' TWh';
  const body = table.tBodies[0];
  if (!body || body.rows.length < 6) return;
  const set = (ri, cells) => { [...body.rows[ri].cells].slice(1).forEach((td, i) => { td.textContent = cells[i]; }); };
  set(0, cols.map(c => fmt(c.t30)));
  set(1, cols.map(c => fmt(c.t35)));
  set(2, cols.map(c => fmt(c.t50)));
  set(3, cols.map(c => c.v[0]));
  set(4, cols.map(c => c.v[1]));
  set(5, cols.map(c => c.v[2]));
  // refresh bar labels in first column to match current RUNGS
  body.rows[3].cells[0].textContent = `R1 (${num(M.bar(M.RUNGS[0], M.PRESETS.mid))} TWh, 2035)`;
  body.rows[4].cells[0].textContent = `R2 (${num(M.bar(M.RUNGS[1], M.PRESETS.mid))} TWh, 2050)`;
  body.rows[5].cells[0].textContent = `R3 (${num(M.bar(M.RUNGS[2], M.PRESETS.mid))} TWh, 2050)`;
}

export function verdictMeter(el) {
  const p = act1FromPrefs(M.PRESETS.mid); let solveRung = 2, path = M.run(p);
  const cards = document.createElement('div'); cards.className = 'vm-cards'; const cs = M.RUNGS.map(() => card(cards));
  const XMIN = 30, XMAX = 40000, YMIN = 30, YMAX = 40000;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 640 : 540), label: 'A logarithmic meter of AI inference electricity in 2035 and 2050 against three bars to beat, and the yearly path from 2025 to 2050 with its uncertainty band',
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 40 : 56, r = w - 18, xs = v => l + (lg(clamp(v, XMIN, XMAX)) - lg(XMIN)) / (lg(XMAX) - lg(XMIN)) * (r - l);
      const rowH = 22, y35 = 52, y50 = 106, axY = y50 + rowH + 22;
      // ---- panel A: the meter ----
      text(ctx, 'Inference electricity, TWh a year (log scale)', l, 16, { size: 11.5, color: C.ink3, weight: 600 });
      [100, 1000, 10000].forEach(v => { line(ctx, xs(v), y35 - 12, xs(v), axY, C.grid, 1); text(ctx, v.toLocaleString('en-GB'), xs(v), axY + 14, { size: 11, align: 'center', color: C.ink3 }); });
      line(ctx, l, axY, r, axY, C.grid2, 1);
      line(ctx, xs(M.M0), y35 - 6, xs(M.M0), y50 + rowH + 6, C.ink3, 1, [3, 3]); text(ctx, `today ≈ ${M.M0}`, xs(M.M0) + 4, y35 - 14, { size: 11, color: C.ink3, weight: 600 });
      // the bars to beat
      M.RUNGS.forEach((rg, i) => {
        const x = xs(M.bar(rg, p)), y = rg.year === 2035 ? y35 : y50;
        line(ctx, x, y - 8, x, y + rowH + 8, C.ink, 2.5);
        const edge = i === 2 && x + 70 > r, ly = y - 11 - (edge ? 14 : 0), left = i === 2 ? !edge : i === 0;
        text(ctx, `${rg.id} ${num(M.bar(rg, p))}`, x + (left ? 4 : -4), ly, { size: 11.5, weight: 700, color: C.ink, align: left ? 'left' : 'right', halo: true });
      });
      [[2035, y35], [2050, y50]].forEach(([yr, y]) => {
        const row = M.at(path, yr), [lo, hi] = M.band(row.m, p);
        text(ctx, String(yr), l - 8, y + 15, { size: 12, align: 'right', weight: 700, color: C.ink });
        rrect(ctx, xs(lo), y, Math.max(3, xs(hi) - xs(lo)), rowH, 5); ctx.fillStyle = alpha(C.heat, 0.3); ctx.fill(); ctx.strokeStyle = alpha(C.heat, 0.8); ctx.lineWidth = 1; ctx.stroke();
        line(ctx, xs(row.m), y - 3, xs(row.m), y + rowH + 3, C.heat, 3);
        const lab = `≈ ${num(row.m)}${row.capped ? ' · supply-capped' : ''}`, onRight = xs(hi) + 8 + 90 < r;
        text(ctx, lab, onRight ? xs(hi) + 8 : xs(lo) - 8, y + 15, { size: 11.5, weight: 700, color: C.ink, align: onRight ? 'left' : 'right', halo: true });
      });
      if (!n) { line(ctx, xs(700), y35 + rowH + 8, xs(1700), y35 + rowH + 8, C.ink3, 4); text(ctx, 'IEA 2035: all data centres', xs(700) - 8, y35 + rowH + 12, { size: 10.5, align: 'right', color: C.ink3, halo: 4, haloColor: '#f4f4f2' }); }
      // ---- panel B: the path ----
      const pt = axY + (n ? 56 : 62), pb = h - 34, ys = v => pb - (lg(clamp(v, YMIN, YMAX)) - lg(YMIN)) / (lg(YMAX) - lg(YMIN)) * (pb - pt);
      const xy = yr => l + (yr - 2025) / 25 * (r - l);
      text(ctx, 'The path, 2025 to 2050', l, pt - 22, { size: 11.5, color: C.ink3, weight: 600 });
      [100, 1000, 10000].forEach(v => { line(ctx, l, ys(v), r, ys(v), C.grid, 1); text(ctx, v.toLocaleString('en-GB'), l - 6, ys(v) + 4, { size: 11, align: 'right', color: C.ink3 }); });
      line(ctx, l, pb, r, pb, C.grid2, 1);
      [2025, 2030, 2035, 2040, 2045, 2050].forEach(yr => text(ctx, String(yr), clamp(xy(yr), l + 12, r - 12), pb + 15, { size: 11, align: 'center', color: C.ink3 }));
      // band and central line
      ctx.save(); ctx.fillStyle = alpha(C.heat, 0.2); ctx.beginPath();
      path.forEach((d, i) => { const [lo] = M.band(d.m, p); i ? ctx.lineTo(xy(d.y), ys(lo)) : ctx.moveTo(xy(d.y), ys(lo)); });
      for (let i = path.length - 1; i >= 0; i--) { const [, hi] = M.band(path[i].m, p); ctx.lineTo(xy(path[i].y), ys(hi)); }
      ctx.closePath(); ctx.fill(); ctx.restore();
      ctx.save(); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath(); path.forEach((d, i) => (i ? ctx.lineTo(xy(d.y), ys(d.capTwh)) : ctx.moveTo(xy(d.y), ys(d.capTwh)))); ctx.stroke(); ctx.restore();
      text(ctx, 'supply cap', xy(2027.3), ys(path[2].capTwh) - 8, { size: 10.5, color: C.ink3, halo: 4, haloColor: '#f4f4f2' });
      ctx.save(); ctx.strokeStyle = C.heat; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); path.forEach((d, i) => (i ? ctx.lineTo(xy(d.y), ys(d.m)) : ctx.moveTo(xy(d.y), ys(d.m)))); ctx.stroke(); ctx.restore();
      line(ctx, xy(2035), ys(M.IEA_DC_2035[0]), xy(2035), ys(M.IEA_DC_2035[1]), alpha(C.ink3, 0.55), 7); if (!n) text(ctx, 'IEA 2035, all data centres', xy(2035) + 8, ys(1100) + 4, { size: 10.5, color: C.ink3, halo: 4, haloColor: '#f4f4f2' });
      M.RUNGS.forEach((rg, i) => { const y = ys(M.bar(rg, p)), x = xy(rg.year); line(ctx, x - (rg.year === 2035 ? 14 : 70), y, x + (rg.year === 2035 ? 14 : 0), y, C.ink, 2.5); text(ctx, `${rg.id}`, x - (rg.year === 2035 ? 18 : 74), y + 4, { size: 11.5, weight: 700, align: 'right', color: C.ink }); });
      M.TRIPWIRES.forEach(tw => { const d = M.at(path, tw.year), ok = d.m >= tw.twh, x = xy(tw.year), y = ys(tw.twh); ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillStyle = ok ? C.green : '#fff'; ctx.strokeStyle = ok ? C.green : C.red; ctx.lineWidth = 2; ctx.fillRect(-5, -5, 10, 10); ctx.strokeRect(-5, -5, 10, 10); ctx.restore(); });
      text(ctx, 'tripwires', xy(2030) + 10, ys(300) + 4, { size: 10.5, color: C.ink3, halo: 4, haloColor: '#f4f4f2' });
      circle(ctx, xy(2025), ys(M.M0), 5, C.ink, '#fff', 2);
    },
  });
  el.insertBefore(cards, fig.wrap);
  // ----- controls -----
  const ctl = controls(el), S = {};
  const seg = segmented(ctl, { label: 'Start from', value: 'mid', options: [{ label: 'Low', value: 'low' }, { label: 'Mid (IEA-like)', value: 'mid' }, { label: 'High', value: 'high' }], onchange: k => { Object.assign(p, M.PRESETS[k]); sync(); paint(); } });
  const lsl = (k, label, o = {}) => (S[k] = slider(ctl, { label, name: k, min: M.LEVERS[k].log ? L10(M.LEVERS[k].min) : M.LEVERS[k].min, max: M.LEVERS[k].log ? L10(M.LEVERS[k].max) : M.LEVERS[k].max, step: M.LEVERS[k].log ? 0.01 : o.step, value: M.LEVERS[k].log ? L10(p[k]) : p[k], color: o.color, fmt: v => o.fmt(M.LEVERS[k].log ? 10 ** v : v), oninput: v => { p[k] = M.LEVERS[k].log ? 10 ** v : v; seg.set('custom'); paint(); } }));
  lsl('U', 'People × tasks a day, by 2050', { color: C.red, fmt: mult });
  lsl('T', 'Tokens per task (reasoning, agents), by 2050', { color: C.violet, fmt: mult });
  lsl('g0', 'Efficiency gain per year, now', { color: C.green, step: 0.01, fmt: v => `${Math.round(v * 100)}%` });
  lsl('cap', 'Power built for inference, 2050', { color: C.blue, fmt: v => `${num(v)} GW` });
  lsl('b', 'Other uses grow by 2050', { color: C.yellow, step: 0.05, fmt: v => `${v >= 0 ? '+' : ''}${Math.round(v * 100)}%` });
  const mr = more(ctl, 'More assumptions');
  lsl.call(null, 'h', 'Years for the efficiency gain to halve', { color: C.green, step: 1, fmt: v => `${Math.round(v)} yr` });
  lsl('u', 'Forecast band, ÷ and × either side', { color: C.ink3, step: 0.1, fmt: v => `${v.toFixed(1)}×` });
  mr.append(S.h.el.closest('.ctl'), S.u.el.closest('.ctl'));
  const sync = () => { for (const k in S) S[k].set(M.LEVERS[k].log ? L10(p[k]) : p[k]); };
  // ----- "to make this YES, set…" -----
  const sv = document.createElement('div'); sv.className = 'vm-solve-row'; ctl.appendChild(sv);
  segmented(sv, { label: 'Test', value: 2, options: M.RUNGS.map((r, i) => ({ label: r.id, value: i })), onchange: v => { solveRung = v; if (box.dataset.open) solve(); } });
  button(sv, 'To make this YES, set…', () => solve(), { kind: 'primary', name: 'solve', color: C.ink });
  const box = document.createElement('div'); box.className = 'vm-solve'; box.setAttribute('aria-live', 'polite'); ctl.appendChild(box);
  const LV = [['U', 'People × tasks a day', mult], ['T', 'Tokens per task', mult], ['g0', 'Efficiency gain per year', v => `${(v * 100).toFixed(1)}%`], ['cap', 'Power built for inference', v => `${num(v)} GW`]];
  function solve() {
    box.dataset.open = '1'; const rg = M.RUNGS[solveRung], tgt = M.needCentral(M.bar(rg, p), p), rows = [];
    for (const [k, nm, f] of LV) {
      const s = M.solveLever(k, p, rg);
      rows.push(`<li><span><b>${nm}</b>: ${s.ok ? (s.already ? 'already enough' : `${k === 'g0' ? 'at most ' : 'at least '}<b>${f(s.value)}</b>`) : `<span class="no">cannot do it alone</span> (the most it gives is ${num(s.best)} TWh)`}</span>${s.ok && !s.already ? `<button type="button" class="vm-set" data-k="${k}" data-v="${s.value}">set</button>` : ''}</li>`);
    }
    const j = M.solveJoint(p, rg);
    box.innerHTML = `<p><b>${rg.id}</b> needs about <b>${num(tgt)} TWh</b> in ${rg.year} (the bar, and a low end within 2× of it). One lever at a time, holding the rest:</p><ul>${rows.join('')}</ul>${j.ok ? `<p>What does work: <b>both</b> power built for inference at <b>${num(j.cap)} GW</b> <i>and</i> tokens per task at <b>${mult(j.T)}</b>. <button type="button" class="vm-set" data-both="1">set both</button></p><p class="vm-who">For scale, the IEA expects all data centres at about 225 GW of capacity in 2030.</p>` : '<p>Even with ample power the demand side cannot reach it in these ranges.</p>'}`;
    box.querySelectorAll('.vm-set').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.both) { p.cap = j.cap; p.T = j.T; } else p[b.dataset.k] = +b.dataset.v;
      seg.set('custom'); sync(); paint(); solve();
    }));
  }
  const ro = readout(el);
  const paint = () => {
    path = M.run(p);
    M.RUNGS.forEach((rg, i) => {
      const row = M.at(path, rg.year), br = M.bar(rg, p), [lo, hi] = M.band(row.m, p), v = M.verdict(row.m, p, br);
      setCard(cs[i], { r: rg.name, v, desc: `${rg.claim}: ${num(br)} TWh. This path: ${num(lo)} to ${num(hi)}.` });
    });
    const a = M.at(path, 2035), z = M.at(path, 2050), r3bar = M.bar(M.RUNGS[2], p), g = (z.m / M.M0) ** (1 / 25) - 1, need = (r3bar / M.M0) ** (1 / 25) - 1;
    const t30 = M.at(path, 2030).m, t35 = a.m;
    const w35 = M.WORLD_ELEC_2035, w50 = M.WORLD_ELEC_2050_ASSUMED;
    ro.innerHTML = `This path: <b>${num(a.m)} TWh</b> in 2035 (${(a.m / w35 * 100).toFixed(1)}% of ≈${num(w35)} TWh world, IEA WEO 2025) and <b>${num(z.m)} TWh</b> in 2050 (${(z.m / w50 * 100).toFixed(1)}% of ~${num(w50)}, assumed), an average <b>${(g * 100).toFixed(1)}%</b> a year for 25 years. R3 needs ${(need * 100).toFixed(1)}% a year. Tripwires: 2030 ≥ 300 TWh is <b>${t30 >= 300 ? 'met' : 'missed'}</b> (${num(t30)}); 2035 ≥ 1,000 TWh is <b>${t35 >= 1000 ? 'met' : 'missed'}</b> (${num(t35)}).${z.capped ? ' <b>The supply cap is binding in 2050.</b>' : ''}`;
    // Live path prose on the index (replaces static Mid numbers)
    const live = document.getElementById('meter-live');
    if (live) {
      const bars = M.RUNGS.map(rg => num(M.bar(rg, p))).join(', ');
      const gw = (r3bar / M.TWH_PER_GW);
      const vs = M.RUNGS.map(rg => M.verdict(M.at(path, rg.year).m, p, M.bar(rg, p)));
      live.innerHTML = `On this path the central estimate reaches about <b>${num(a.m)} TWh</b> by 2035 and about <b>${num(z.m)} TWh</b> by 2050, against bars at <b>${bars}</b> TWh (R1, R2, R3). R3 is about <b>${num(gw)} GW</b> of continuous draw. Verdicts: R1 <b>${vs[0]}</b>, R2 <b>${vs[1]}</b>, R3 <b>${vs[2]}</b>. Press <b>To make this YES, set…</b> to see what it would take: for R3 no single slider is enough while the power-build cap binds, so several have to move together.`;
    }
    publish('act1', { U: (L10(p.U) - L10(M.LEVERS.U.min)) / (L10(M.LEVERS.U.max) - L10(M.LEVERS.U.min)), T: (L10(p.T) - L10(M.LEVERS.T.min)) / (L10(M.LEVERS.T.max) - L10(M.LEVERS.T.min)), g0: 1 - p.g0 / M.LEVERS.g0.max, cap: (L10(p.cap) - L10(M.LEVERS.cap.min)) / (L10(M.LEVERS.cap.max) - L10(M.LEVERS.cap.min)), b: 1 - (p.b - M.LEVERS.b.min) / (M.LEVERS.b.max - M.LEVERS.b.min) });
    saveAct1(p);
    fig.invalidate();
  };
  hint(el, 'press <b>To make this YES, set…</b> and see why one slider is never enough; then raise the power and the tokens together.');
  paint();
  // Live: Yardstick / Demand write act1 prefs; keep these slider widgets in sync (same tab via CustomEvent, other tabs via storage).
  let applying = false;
  watchAct1(act1 => {
    if (applying || !act1 || typeof act1 !== 'object') return;
    let changed = false;
    for (const k of ['U', 'T', 'g0', 'h', 'cap', 'b', 'u']) {
      if (typeof act1[k] === 'number' && Number.isFinite(act1[k]) && act1[k] !== p[k]) {
        p[k] = act1[k]; changed = true;
      }
    }
    if (!changed) return;
    applying = true;
    try { seg.set('custom'); sync(); paint(); } finally { applying = false; }
  });
  fillAct1Ledger();
}

// ---------------------------------------------------------------------------------------------------------------------------
// Act 2. Is orbital compute the only answer to 100× AI compute? How much power does a multiple need, and who can supply it?
// ---------------------------------------------------------------------------------------------------------------------------
export function ceilingMeter(el) {
  const p = { ...M.A2 }; let res;
  const cards = document.createElement('div'); cards.className = 'vm-cards one'; const cd = card(cards);
  const GMIN = 10, GMAX = 1e5;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 340 : 282), label: 'A logarithmic scale of power in gigawatts: the power a multiple of today’s AI compute needs, how far the grid can supply it, and how far orbit adds',
    draw(ctx, w, h) {
      const n = narrow(w), l = 14, r = w - 14, xs = v => l + (lg(clamp(v, GMIN, GMAX)) - lg(GMIN)) / (lg(GMAX) - lg(GMIN)) * (r - l), bh = 22;
      const yN = 44, yG = 96, yO = 132, axY = h - (n ? 80 : 66);
      text(ctx, 'Rated capacity, gigawatts (log scale)', l, 16, { size: 11.5, color: C.ink3, weight: 600 });
      [10, 100, 1000, 10000, 100000].forEach(v => { line(ctx, xs(v), yN - 14, xs(v), axY, C.grid, 1); text(ctx, v.toLocaleString('en-GB'), xs(v), axY + 14, { size: 11, align: 'center', color: C.ink3 }); });
      line(ctx, l, axY, r, axY, C.grid2, 1);
      // reference marks, staggered so they never touch
      const refs = M.REF_GW.filter(q => q.gw <= GMAX);
      refs.forEach((q, i) => { const x = xs(q.gw), yy = axY + 28 + (i % 2) * 14 - (n ? 0 : 0); line(ctx, x, axY, x, axY + 3 + (i % 2) * 14 + 8, C.ink3, 1); text(ctx, q.name, clamp(x, l + 30, r - 40), yy + 14, { size: 10.5, color: C.ink3, align: 'center' }); });
      if (!n) text(ctx, `sunlight on Earth: ${big(M.REF_GW[4].gw)} GW →`, r, 16, { size: 10.5, color: C.ink3, align: 'right' });
      // the need
      const xn = xs(res.P), off = res.P > GMAX;
      ctx.save(); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(xn, yN + 6); ctx.lineTo(xn - 8, yN - 8); ctx.lineTo(xn + 8, yN - 8); ctx.closePath(); ctx.fill(); ctx.restore();
      line(ctx, xn, yN + 6, xn, yO + bh + 8, C.ink, 1.5, [4, 3]);
      text(ctx, `needs ${off ? '> ' : ''}${big(Math.min(res.P, GMAX))} GW`, xn < r - 110 ? xn + 12 : xn - 12, yN + 4, { size: 12.5, weight: 700, color: C.ink, align: xn < r - 110 ? 'left' : 'right', halo: true });
      // who can supply
      const bar = (y, a, b, col, lab) => { rrect(ctx, xs(a), y, Math.max(3, xs(b) - xs(a)), bh, 5); ctx.fillStyle = alpha(col, 0.4); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke(); text(ctx, lab, xs(b) + 8 + 130 < r ? xs(b) + 8 : xs(a) - 8, y + 15, { size: 11.5, weight: 600, color: C.ink, align: xs(b) + 8 + 130 < r ? 'left' : 'right', halo: true }); };
      bar(yG, M.B0_GW, p.terr, C.blue, `grid: up to ${num(p.terr)} GW`);
      bar(yO, p.terr, res.reach, C.red, `orbit adds ${num(res.orbitGW)} GW`);
    },
  });
  el.insertBefore(cards, fig.wrap);
  const ctl = controls(el), S = {};
  const sl = (k, label, lo, hi, o) => (S[k] = slider(ctl, { label, name: k, min: o.log ? Math.ceil(L10(lo) * 100) / 100 : lo, max: o.log ? Math.floor(L10(hi) * 100) / 100 : hi, step: o.log ? 0.01 : o.step, value: o.log ? L10(p[k]) : p[k], color: o.color, fmt: v => o.fmt(o.log ? 10 ** v : v), oninput: v => { p[k] = o.log ? 10 ** v : v; if (k === 'terr') p.terrSet = 1; paint(); } }));
  segmented(ctl, { label: 'By', value: p.year, options: [2035, 2040, 2050].map(y => ({ label: String(y), value: y })), onchange: y => { p.year = y; if (!p.terrSet) { p.terr = M.HORIZONS[y].terr; S.terr.set(L10(p.terr)); } paint(); } });
  sl('Mx', 'How many times today’s AI compute', 10, 1e6, { log: true, color: C.red, fmt: v => `${big(v)}×` });
  button(ctl, `today’s trend (${M.TREND_X}× a year)`, () => { p.Mx = Math.min(1e6, M.TREND_X ** M.HORIZONS[p.year].years); S.Mx.set(L10(p.Mx)); paint(); }, { name: 'trend', color: C.red });
  sl('g', 'Hardware efficiency gain per year', 0, 0.6, { step: 0.01, color: C.green, fmt: v => `${Math.round(v * 100)}%` });
  sl('terr', 'Power the grid can deliver to AI', 30, 1e4, { log: true, color: C.blue, fmt: v => `${num(v)} GW` });
  const mr = more(ctl, 'More assumptions');
  sl('launches', 'Launches a year (150 t each)', 10, 5e4, { log: true, color: C.red, fmt: v => num(v) });
  sl('kgkw', 'Satellite mass per kilowatt', 10, 60, { step: 1, color: C.violet, fmt: v => `${Math.round(v)} kg` });
  sl('Emax', 'Most efficiency can ever gain', 3, 1e4, { log: true, color: C.green, fmt: v => `${big(v)}×` });
  sl('life', 'Satellite life before replacement', 2, 15, { step: 1, color: C.red, fmt: v => `${Math.round(v)} years` });
  [S.launches, S.kgkw, S.life, S.Emax].forEach(s => mr.appendChild(s.el.closest('.ctl')));
  const ro = readout(el);
  const KIND = { 'not-needed': 'The grid alone is enough', only: 'Only orbit closes the gap', 'not-enough': 'Even grid plus orbit falls short' };
  const paint = () => {
    res = M.actTwo(p);
    setCard(cd, { r: `Is orbit the only answer to ${big(p.Mx)}× by ${p.year}?`, v: res.v === 'UNRESOLVED' ? 'UNRESOLVED' : res.kind === 'only' ? 'YES' : 'NO', label: res.v === 'UNRESOLVED' ? 'UNRESOLVED' : res.kind === 'only' ? 'YES' : 'NO', desc: `${KIND[res.kind]}.${res.v === 'UNRESOLVED' ? ' (Close call: within 2× of a limit.)' : ''}` });
    ro.innerHTML = `${big(p.Mx)}× the compute, with chips <b>${big(res.E)}×</b> more efficient by ${p.year}, needs <b>${big(res.P)} GW</b> (${(res.P / M.B0_GW).toFixed(res.P / M.B0_GW < 10 ? 1 : 0)}× today’s ${M.B0_GW.toFixed(0)} GW). The grid ceiling is ${num(p.terr)} GW; ${num(p.launches)} launches a year from ${M.FIRST_BULK_LAUNCH} keep ${num(res.orbitGW)} GW flying (${p.kgkw} kg per kW; satellites retire after ${Math.round(p.life)} years).`;
    publish('act2', { P: res.P });
    fig.invalidate();
    bus.dispatchEvent(new CustomEvent('kg', { detail: { kgkw: p.kgkw, from: 'ceil' } }));
  };
  bus.addEventListener('kg', e => { if (e.detail.from !== 'ceil' && Math.round(e.detail.kgkw) !== Math.round(p.kgkw)) { p.kgkw = e.detail.kgkw; S.kgkw.set(p.kgkw); paint(); } });
  hint(el, 'set the multiple to 100 and read the verdict; then drag it up to ten thousand and see where the grid, and then orbit, run out.');
  paint();
}
const bus = new EventTarget();

export function launchCost(el) {
  const p = { usdkg: 1500, kgkw: 25 };
  const XMIN = 30, XMAX = 6000, YMIN = 0.005, YMAX = 12;
  const cardsOff = null; void cardsOff;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 360 : 330), label: 'Launch-only cost of a kilowatt-hour from orbit against launch price per kilogram, for three satellite masses, against the terrestrial cost band',
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 50 : 64, r = w - 16, t = 30, b = h - 38;
      const a = axes(ctx, { box: { l, r, t, b }, x0: lg(XMIN), x1: lg(XMAX), y0: lg(YMIN), y1: lg(YMAX), xticks: [lg(100), lg(300), lg(1000), lg(3000)], yticks: [-2, -1, 0, 1], xfmt: v => `$${Math.round(10 ** v).toLocaleString('en-GB')}`, yfmt: v => `$${10 ** v >= 1 ? 10 ** v : 10 ** v}`, ylabel: 'launch-only $ per kWh of delivered power', xlabel: 'launch price, $ per kg' });
      const X = v => a.sx(lg(v)), Y = v => a.sy(lg(clamp(v, YMIN, YMAX)));
      rrect(ctx, l, Y(M.TERR_BAND[1]), r - l, Y(M.TERR_BAND[0]) - Y(M.TERR_BAND[1]), 3); ctx.fillStyle = alpha(C.blue, 0.16); ctx.fill();
      text(ctx, `terrestrial (Suncatcher): $${M.TERR_BAND[0]}–${M.TERR_BAND[1]}/kWh`, l + 6, Y(M.TERR_BAND[0]) - 6, { size: 11, weight: 650, color: C.blue, align: 'left', halo: 4, haloColor: '#f4f4f2' });
      {
        // faint reference lines; labels as a compact legend (phone) or end-of-line (desktop)
        const refs = [13, 25, 40];
        refs.forEach(k => { ctx.save(); ctx.strokeStyle = alpha(C.ink3, 0.55); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(X(XMIN), Y(M.launchOnly(XMIN, k))); ctx.lineTo(X(XMAX), Y(M.launchOnly(XMAX, k))); ctx.stroke(); ctx.restore(); });
        if (n) {
          // phone: stacked legend inside the plot, clear of the grid band label and the live callout
          const legendX = r - 4, baseY = Math.min(b - 8, Math.max(t + 54, Y(M.TERR_BAND[1]) + 36));
          refs.forEach((k, i) => text(ctx, `${k} kg/kW`, legendX, baseY + i * 14, { size: 10.5, color: C.ink3, align: 'right', halo: 4, haloColor: '#f4f4f2' }));
        } else {
          const labs = refs.map(k => ({ k, y: Y(M.launchOnly(XMAX, k)) + (k === 13 ? 14 : -5) }));
          labs.sort((a, b) => a.y - b.y);
          for (let i = 1; i < labs.length; i++) if (labs[i].y - labs[i - 1].y < 15) labs[i].y = labs[i - 1].y + 15;
          const lf = X(p.usdkg) > r - 190;
          labs.forEach(({ k, y }) => text(ctx, `${k} kg/kW`, lf ? X(80) : X(XMAX) - 4, y, { size: 10.5, color: C.ink3, align: lf ? 'left' : 'right', halo: 4, haloColor: '#f4f4f2' }));
        }
      }
      ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(XMIN), Y(M.launchOnly(XMIN, p.kgkw))); ctx.lineTo(X(XMAX), Y(M.launchOnly(XMAX, p.kgkw))); ctx.stroke(); ctx.restore();
      [[3600, 'Falcon 9 today, $3,600 (Suncatcher paper)'], [200, '2035 learning-curve target, $200']].forEach(([v, s], i) => { line(ctx, X(v), t, X(v), b, C.ink3, 1, [3, 3]); text(ctx, i ? (n ? '2035: $200' : '2035 target $200') : (n ? 'today: $3,600' : 'today $3,600'), X(v) + (i ? 5 : -5), t + 12, { size: 10.5, color: C.ink3, align: i ? 'left' : 'right', halo: 4, haloColor: '#f4f4f2' }); });
      const cx = X(p.usdkg), cy = Y(M.launchOnly(p.usdkg, p.kgkw));
      circle(ctx, cx, cy, 8, '#fff', C.red, 3);
      {
        const lab = `$${M.launchOnly(p.usdkg, p.kgkw) >= 1 ? M.launchOnly(p.usdkg, p.kgkw).toFixed(2) : M.launchOnly(p.usdkg, p.kgkw).toFixed(3)} per kWh`;
        // phone: keep callout left of the legend; desktop: beside the cursor
        if (n) text(ctx, lab, Math.min(cx + 12, r - 72), cy < t + 50 ? cy + 22 : cy - 12, { size: 12, weight: 700, color: C.ink, align: 'left', halo: true });
        else {
          const preferRight = cx < r - 160;
          text(ctx, lab, preferRight ? cx + 12 : cx - 12, cy < t + 50 ? cy + 22 : cy - 12, { size: 12, weight: 700, color: C.ink, align: preferRight ? 'left' : 'right', halo: true });
        }
      }
    },
  });
  const ctl = controls(el); let S;
  const usd = slider(ctl, { label: 'Launch price per kilogram', name: 'usdkg', min: lg(p.usdkg) - 0.01 * Math.round((lg(p.usdkg) - lg(30)) / 0.01), max: lg(6000), step: 0.01, value: lg(p.usdkg), color: C.red, fmt: v => `$${num(10 ** v)}`, oninput: v => { p.usdkg = 10 ** v; paint(); } });
  S = slider(ctl, { label: 'Satellite mass per kilowatt', name: 'kgkw2', min: 10, max: 60, step: 1, value: p.kgkw, color: C.violet, fmt: v => `${Math.round(v)} kg`, oninput: v => { p.kgkw = v; paint(true); } });
  const ro = readout(el);
  const paint = push => {
    const c = M.launchOnly(p.usdkg, p.kgkw), k = 5 * 8760 * 0.95 / p.kgkw, hiP = M.TERR_BAND[1] * k, loP = M.TERR_BAND[0] * k;
    ro.innerHTML = `Launch alone costs <b>$${c >= 1 ? c.toFixed(2) : c.toFixed(3)} per kWh</b> (${Math.round(p.usdkg).toLocaleString('en-GB')} dollars × ${Math.round(p.kgkw)} kg ÷ five years of sunshine), which is <b>${c < M.TERR_BAND[0] ? 'below' : c <= M.TERR_BAND[1] ? 'inside' : 'above'}</b> Suncatcher’s terrestrial cost of $${M.TERR_BAND[0]} to $${M.TERR_BAND[1]} per kWh. At ${Math.round(p.kgkw)} kg per kW, orbit matches the dearest terrestrial cost at about <b>$${num(hiP)} per kg</b> and the cheapest at <b>$${num(loP)}</b>. This is a floor: it leaves out the satellite itself, running it, and the chips that die.`;
    fig.invalidate();
    if (push) bus.dispatchEvent(new CustomEvent('kg', { detail: { kgkw: p.kgkw, from: 'launch' } }));
  };
  bus.addEventListener('kg', e => { if (e.detail.from !== 'launch' && Math.round(e.detail.kgkw) !== Math.round(p.kgkw)) { p.kgkw = e.detail.kgkw; S.set(p.kgkw); paint(); } });
  hint(el, 'drag the price down towards $200 and watch the red line enter the terrestrial band; then see how much a heavier satellite costs you.');
  paint();
}
