import { layoutGrid, deficitAt as wakeDeficit, turbinePower, arrayEff as arrayEffOf } from '../lib/wake.js';
// Utility-scale renewables post, part 1: projects, turbines, wakes, offshore prices.
//  queueFunnel  — US interconnection queues, end 2024 (LBNL Queued Up 2025) — real
//  turbineScale — average new US turbines 1998–99 vs 2024 (LBNL) and two offshore turbines, to scale — real
//  specificPower— rotor size vs generator size vs capacity factor (Weibull wind, Cp 0.45) — model
//  wakeField    — Jensen/Park wake model of a 5×4 array — model
//  offshoreCfd  — UK offshore wind CfD strike prices by allocation round — real
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, measure, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, scale } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, more } from '../lib/ui.js';

/* ---------------- queueFunnel ---------------- */
const QUEUE = [['Solar', 956, '#e3a922'], ['Storage', 890, '#8e62b5'], ['Wind', 271, '#4f9bd1'], ['Gas', 136, '#9a948a'], ['Other', 37, '#c9c3b6']];
export function queueFunnel(el) {
  const st = { view: 'queue', hover: -1 }; let geo = null;
  const fig = new Fig(el, {
    label: 'US interconnection queues at the end of 2024: 2,290 gigawatts waiting, compared with a 1,320 gigawatt installed fleet, and what happened to requests made between 2000 and 2019',
    height: w => w < 600 ? 380 : 300,
    draw(ctx, w, h) {
      const narrow = w < 600, l = 16, r = w - 16;
      if (st.view === 'queue') {
        const max = 2400, sx = v => l + v / max * (r - l);
        const y1 = narrow ? 64 : 62, bh = narrow ? 46 : 54;
        text(ctx, (ctx.canvas.clientWidth < 600) ? 'US grid queue, end 2024 (GW)' : 'Capacity waiting to connect to US transmission grids, end of 2024 (GW)', l, 24, { size: 12, weight: 650, color: C.ink });
        let x = 0; geo = [];
        QUEUE.forEach(([n, v, col], i) => {
          ctx.fillStyle = i === st.hover ? darken(col, 0.15) : col; ctx.fillRect(sx(x), y1, sx(x + v) - sx(x) - 1, bh);
          const wpx = sx(x + v) - sx(x);
          if (wpx > 60) { text(ctx, n, sx(x) + 8, y1 + 20, { size: 12, weight: 650, color: '#fff' }); text(ctx, v + ' GW', sx(x) + 8, y1 + 37, { size: 11, color: '#fff' }); }
          geo.push({ i, x0: sx(x), x1: sx(x + v), y0: y1, y1: y1 + bh }); x += v;
        });
        text(ctx, '2,290 GW waiting', sx(2290) - 2, y1 - 8, { size: 12, weight: 700, color: C.ink, align: 'right' });
        const y2 = y1 + bh + (narrow ? 60 : 56);
        ctx.fillStyle = '#5b5a57'; ctx.fillRect(sx(0), y2, sx(1320) - sx(0), bh * 0.7);
        text(ctx, 'every power plant operating in the US today: ~1,320 GW', narrow ? sx(0) : sx(1320) + 10, narrow ? y2 + bh * 0.7 + 18 : y2 + bh * 0.35 + 4, { size: 11.5, weight: 600, color: C.ink2 });
        const y3 = narrow ? y2 + bh * 0.7 + 56 : y2 + bh * 0.7 + 44;
        ctx.fillStyle = alpha('#c8473b', 0.85); ctx.fillRect(sx(0), y3, sx(408) - sx(0), bh * 0.5);
        text(ctx, '408 GW already hold a draft or signed interconnection agreement', narrow ? sx(0) : sx(408) + 10, narrow ? y3 + bh * 0.5 + 16 : y3 + bh * 0.25 + 4, { size: 11.5, color: C.ink2 });
        for (const v of [0, 500, 1000, 1500, 2000]) text(ctx, v.toLocaleString('en-US'), sx(v), h - 8, { size: 10.5, color: C.ink3, align: v === 0 ? 'left' : 'center' });
      } else {
        // waffle: 100 squares
        geo = null;
        text(ctx, 'Of all capacity that asked to connect between 2000 and 2019, by the end of 2024:', l, 24, { size: 12, weight: 650, color: C.ink });
        const cols = narrow ? 20 : 25, rows = 100 / cols, gap = 3;
        const cell = Math.min((narrow ? r - l : (r - l) * 0.62) / cols - gap, (h - 110) / rows - gap);
        const segs = [[13, C.wind, 'operating'], [77, '#c9c3b6', 'withdrawn'], [10, '#e3a922', 'still waiting']];
        let k = 0; const x0 = l, y0 = 46;
        segs.forEach(([n, col]) => { for (let j = 0; j < n; j++, k++) { const c = k % cols, rr = Math.floor(k / cols); ctx.fillStyle = col; rrect(ctx, x0 + c * (cell + gap), y0 + rr * (cell + gap), cell, cell, 2); ctx.fill(); } });
        const lx = narrow ? l : x0 + cols * (cell + gap) + 30, ly = narrow ? y0 + rows * (cell + gap) + 24 : y0 + 14;
        segs.forEach(([n, col, s], i) => {
          const yy = narrow ? ly : ly + i * 34, xx = narrow ? lx + i * ((r - l) / 3) : lx;
          ctx.fillStyle = col; ctx.fillRect(xx, yy - 11, 12, 12);
          text(ctx, n + '%', xx + 18, yy, { size: narrow ? 14 : 18, weight: 750, color: C.ink });
          text(ctx, s, xx + 18 + measure(ctx, n + '%', narrow ? 14 : 18, 750) + 6, yy, { size: 12, color: C.ink2 });
        });
        const ty = narrow ? h - 50 : y0 + rows * (cell + gap) + 40;
        text(ctx, 'Median time from request to operation, for projects that made it:', l, ty, { size: 11.5, color: C.ink2, weight: 600 });
        const tx = scale(0, 5, l, narrow ? r - 40 : (r - l) * 0.7);
        [[2, 'built 2000–07: under 2 years', C.ink3], [4, 'built 2018–24: over 4 years', '#c8473b']].forEach(([v, s, col], i) => {
          const yy = ty + 14 + i * 16; ctx.fillStyle = col; ctx.fillRect(tx(0), yy, tx(v) - tx(0), 10); text(ctx, s, tx(v) + 6, yy + 9, { size: 11, color: C.ink2 });
        });
      }
    },
  });
  fig.interact({ hit: (x, y) => geo && geo.find(g => x >= g.x0 && x <= g.x1 && y >= g.y0 && y <= g.y1) || null, cursor: 'default', hover: o => { st.hover = o ? o.i : -1; upd(); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'View', options: [{ label: 'The queue today', value: 'queue', name: 'q-queue' }, { label: 'What happens to requests', value: 'fate', name: 'q-fate' }], value: 'queue', onchange: v => { st.view = v; st.hover = -1; upd(); } });
  function upd() {
    if (st.view === 'queue') ro.innerHTML = st.hover >= 0 ? `<b>${QUEUE[st.hover][0]}</b>: ${QUEUE[st.hover][1]} GW in the queues${st.hover === 3 ? ', up 72% in a year' : st.hover === 0 ? ', down 12% in a year' : st.hover === 2 ? ', down 26% in a year' : st.hover === 1 ? ', down 13% in a year' : ''}.` : 'The queues hold almost twice the capacity of the entire US power fleet. Most of it is speculative: developers file early and for more sites than they will build, because a queue position is cheap and grid capacity is scarce.';
    else ro.innerHTML = 'Only 13% of the capacity that applied in 2000–2019 is operating. More than 700 GW of requests were withdrawn in 2024 alone, while about 500 GW of new requests arrived.';
    fig.invalidate();
  }
  upd();
}

/* ---------------- turbineScale ---------------- */
const TURBS = [
  { k: 't1999', name: 'Average new US onshore turbine, 1998–99', short: 'US onshore 1998–99', mw: 0.72, d: 48, hub: 56.5, col: '#9a948a' },
  { k: 't2024', name: 'Average new US onshore turbine, 2024', short: 'US onshore 2024', mw: 3.5, d: 137, hub: 106, col: C.wind },
  { k: 'hx', name: 'GE Haliade-X 13 MW (offshore, e.g. Dogger Bank)', short: 'Haliade-X 13 MW', mw: 13, d: 220, hub: 140, col: '#2c6795', hubIll: true },
  { k: 'v236', name: 'Vestas V236-15.0 MW (offshore)', short: 'V236 15 MW', mw: 15, d: 236, hub: 150, col: '#1d4a73', hubIll: true },
];
// px per metre that fits all four rotors side by side between the axis labels and the cathedral (phones)
const fitM = w => (w - 24 - 30 - 40 - 6 * TURBS.length) / TURBS.reduce((a, t) => a + t.d, 0);
export function turbineScale(el) {
  const st = { sel: 't2024', a: 0 };
  const fig = new Fig(el, {
    label: 'Wind turbines drawn to scale: the average new US onshore turbine in 1998–99 and in 2024, and two offshore turbines, with Cologne Cathedral for reference',
    height: w => w < 600 ? Math.round(68 + 300 * Math.min(1.1, fitM(w))) : 420, animated: true,
    step(dt) { st.a += dt * 0.9; },
    draw(ctx, w, h) {
      const narrow = w < 600, ground = h - 38, top = 30, H = 300; // metres shown
      const m = narrow ? Math.min((ground - top) / H, fitM(w)) : (ground - top) / H;
      ctx.fillStyle = '#e5e1d6'; ctx.fillRect(0, ground, w, h - ground);
      for (const v of narrow ? [100, 200] : [50, 100, 150, 200, 250]) { line(ctx, 28, ground - v * m, w - 8, ground - v * m, alpha(C.grid2, 0.8), 1); text(ctx, v + ' m', 26, ground - v * m + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      // cathedral reference
      const cx = narrow ? w - 24 : w - 50, ch = 157 * m;
      ctx.fillStyle = alpha('#8a7f70', 0.35); ctx.beginPath(); ctx.moveTo(cx - 10, ground); ctx.lineTo(cx - 10, ground - ch * 0.7); ctx.lineTo(cx - 5, ground - ch); ctx.lineTo(cx, ground - ch * 0.7); ctx.lineTo(cx + 3, ground - ch * 0.7); ctx.lineTo(cx + 8, ground - ch * 0.98); ctx.lineTo(cx + 13, ground - ch * 0.7); ctx.lineTo(cx + 13, ground); ctx.fill();
      text(ctx, narrow ? 'Cathedral' : 'Cologne Cathedral, 157 m', narrow ? Math.min(cx + 1, w - 26) : cx + 1, ground + 16, { size: 10, color: C.ink3, align: 'center' });
      const n = TURBS.length, span = (narrow ? cx - 30 : cx - 70) - 40;
      // on a phone the turbines sit side by side, rotors just clear of each other, all to one scale
      let nx = 40 + (span - TURBS.reduce((a, t) => a + t.d * m, 0)) / 2 / n;
      TURBS.forEach((t, i) => {
        let x = 40 + span * (i + 0.5) / n;
        if (narrow) { x = nx + t.d / 2 * m; nx += t.d * m + (span - TURBS.reduce((a, u) => a + u.d * m, 0)) / n; }
        const hub = ground - t.hub * m, R = t.d / 2 * m, sel = t.k === st.sel;
        const col = sel ? t.col : alpha(t.col, 0.45);
        ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, R * 0.05); ctx.beginPath(); ctx.moveTo(x - 1.5, ground); ctx.lineTo(x, hub); ctx.stroke();
        if (sel) { ctx.strokeStyle = alpha(t.col, 0.25); ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(x, hub, R, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); }
        for (let b = 0; b < 3; b++) { const a = st.a * (40 / t.d) * 3 + b * 2 * Math.PI / 3 + i; ctx.strokeStyle = col; ctx.lineWidth = Math.max(1.5, R * 0.035); ctx.beginPath(); ctx.moveTo(x, hub); ctx.lineTo(x + Math.cos(a) * R, hub + Math.sin(a) * R); ctx.stroke(); }
        circle(ctx, x, hub, Math.max(2.5, R * 0.04), col, null);
        text(ctx, narrow ? t.short.replace('US onshore ', '').replace(/ \d+ MW$/, '') : t.short, x, ground + (narrow && i % 2 ? 30 : 16), { size: narrow ? 10 : 11, weight: sel ? 700 : 500, color: sel ? C.ink : C.ink3, align: 'center' });
        if (!narrow) text(ctx, t.mw + ' MW', x, ground + 30, { size: 10.5, color: C.ink3, align: 'center' });
      });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Turbine', options: TURBS.map(t => ({ label: t.short, value: t.k, name: 'tb-' + t.k })), value: st.sel, onchange: v => { st.sel = v; upd(); } });
  function upd() {
    const t = TURBS.find(x => x.k === st.sel), A = Math.PI * (t.d / 2) ** 2;
    ro.innerHTML = `<b>${t.name}</b>: ${t.mw} MW, rotor ${t.d} m${t.hubIll ? ' (hub height varies by site; drawn at ' + t.hub + ' m)' : ', hub ' + t.hub + ' m'}. Swept area <b>${Math.round(A).toLocaleString('en-US')} m²</b>, ${(A / 7140).toFixed(1)} football pitches.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- specificPower (model) ---------------- */
const RHO = 1.225, CP = 0.45;
function weibullPdf(v, c, k = 2) { return v <= 0 ? 0 : (k / c) * Math.pow(v / c, k - 1) * Math.exp(-Math.pow(v / c, k)); }
function powerCurve(v, D, rated) { if (v < 3 || v > 25) return 0; return Math.min(rated, 0.5 * RHO * Math.PI * (D / 2) ** 2 * CP * v ** 3 / 1e6); }
export function specificPower(el) {
  const st = { D: 137, rated: 3.5, mean: 7.5 };
  let stats = {};
  const fig = new Fig(el, {
    label: 'How the size of a wind turbine rotor relative to its generator sets its capacity factor: the power curve, the distribution of wind speeds at the site, and the share of hours the turbine runs at full output',
    height: w => w < 600 ? 560 : 360,
    draw(ctx, w, h) {
      const narrow = w < 600, c = st.mean / 0.8862;
      const A = narrow ? { l: 44, r: w - 14, t: 34, b: 250 } : { l: 52, r: w * 0.55, t: 34, b: h - 42 };
      const { sx, sy } = axes(ctx, { box: A, x0: 0, x1: 26, y0: 0, y1: 1.15, yticks: [0, 0.25, 0.5, 0.75, 1], xticks: [0, 5, 10, 15, 20, 25], xfmt: v => v + ' m/s', yfmt: v => Math.round(v * 100) + '%', ylabel: 'output as share of rating, and how often each wind speed occurs' });
      // weibull shading
      const pts = [[sx(0), sy(0)]]; let pmax = 0; for (let v = 0; v <= 26; v += 0.1) pmax = Math.max(pmax, weibullPdf(v, c));
      for (let v = 0; v <= 26; v += 0.1) pts.push([sx(v), sy(weibullPdf(v, c) / pmax * 0.6)]);
      pts.push([sx(26), sy(0)]); ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.fillStyle = alpha('#9fc3d9', 0.45); ctx.fill();
      text(ctx, 'wind-speed distribution', sx(c * 1.4) + 4, sy(weibullPdf(c * 1.4, c) / pmax * 0.6) - 6, { size: 10.5, color: '#4c7fa3', halo: true }); // on the falling side, below the power curve
      // reference curve for 2024-average rotor at same generator, and current
      const ref = []; const cur = [];
      for (let v = 0; v <= 26; v += 0.05) { ref.push([sx(v), sy(powerCurve(v, 100, st.rated) / st.rated)]); cur.push([sx(v), sy(powerCurve(v, st.D, st.rated) / st.rated)]); }
      pathLine(ctx, ref, alpha(C.ink3, 0.6), 1.3, [4, 3]);
      pathLine(ctx, cur, C.wind, 2.6);
      if (!narrow) text(ctx, 'dashed: 100 m rotor', sx(25.5), sy(1.08), { size: 10.5, color: C.ink3, align: 'right' });
      // vrated marker
      const vr = Math.cbrt(st.rated * 1e6 / (0.5 * RHO * Math.PI * (st.D / 2) ** 2 * CP));
      line(ctx, sx(vr), sy(0), sx(vr), sy(1), alpha(C.wind, 0.5), 1, [2, 3]);
      text(ctx, `full output from ${vr.toFixed(1)} m/s`, sx(vr) + 5, sy(1) - 6, { size: 10.5, weight: 600, color: darken(C.wind, 0.3), halo: true });
      // stats: integrate
      let E = 0, Eref = 0, full = 0; const dur = [];
      for (let v = 0.05; v <= 30; v += 0.05) { const p = weibullPdf(v, c) * 0.05; E += p * powerCurve(v, st.D, st.rated); Eref += p * powerCurve(v, 100, st.rated); if (powerCurve(v, st.D, st.rated) >= st.rated - 1e-9) full += p; }
      stats = { cf: E / st.rated, cfRef: Eref / st.rated, full, sp: st.rated * 1e6 / (Math.PI * (st.D / 2) ** 2), vr };
      // duration curve: output sorted by hours (from distribution)
      const B = narrow ? { l: 44, r: w - 14, t: 320, b: h - 34 } : { l: w * 0.63, r: w - 16, t: 34, b: h - 42 };
      const bx = axes(ctx, { box: B, x0: 0, x1: 8760, y0: 0, y1: 1.05, yticks: [0, 0.5, 1], xticks: [0, 2190, 4380, 6570, 8760], xfmt: v => Math.round(v / 87.6) + '%', yfmt: v => Math.round(v * 100) + '%', ylabel: 'output, hours of the year sorted' });
      // build sorted curve via cumulative from high wind downwards
      const dc = []; let cum = 0; const vs = []; for (let v = 0.05; v <= 30; v += 0.05) vs.push(v);
      const pairs = vs.map(v => [powerCurve(v, st.D, st.rated) / st.rated, weibullPdf(v, c) * 0.05]).sort((a, b) => b[0] - a[0]);
      dc.push([bx.sx(0), bx.sy(pairs[0][0])]);
      for (const [p, pr] of pairs) { cum += pr * 8760; dc.push([bx.sx(Math.min(8760, cum)), bx.sy(p)]); }
      ctx.beginPath(); ctx.moveTo(bx.sx(0), bx.sy(0)); dc.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(bx.sx(8760), bx.sy(0)); ctx.closePath(); ctx.fillStyle = alpha(C.wind, 0.35); ctx.fill();
      pathLine(ctx, dc, C.wind, 2);
      line(ctx, B.l, bx.sy(stats.cf), B.r, bx.sy(stats.cf), C.ink, 1.3, [4, 3]);
      text(ctx, `average = capacity factor ${Math.round(stats.cf * 100)}%`, B.r - 4, bx.sy(stats.cf) - 6, { size: 11, weight: 650, color: C.ink, align: 'right', halo: true });
    },
  });
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Rotor diameter', min: 90, max: 180, step: 1, value: st.D, color: C.wind, fmt: v => v + ' m', oninput: v => { st.D = v; upd(); }, name: 'D' });
  slider(ctl, { label: 'Generator rating', min: 2, max: 7, step: 0.1, value: st.rated, color: C.ink, fmt: v => v.toFixed(1) + ' MW', oninput: v => { st.rated = v; upd(); }, name: 'rated' });
  slider(ctl, { label: 'Average wind speed at hub height', min: 5, max: 10, step: 0.1, value: st.mean, color: '#4c7fa3', fmt: v => v.toFixed(1) + ' m/s', oninput: v => { st.mean = v; upd(); }, name: 'mean' });
  function upd() { fig.render(); ro.innerHTML = `Specific power <b>${Math.round(stats.sp)} W/m²</b>. Capacity factor <b>${Math.round(stats.cf * 100)}%</b> (with a 100 m rotor on the same generator: ${Math.round(stats.cfRef * 100)}%); full output <b>${Math.round(stats.full * 100)}%</b> of the time; ${Math.round(stats.cf * st.rated * 8760).toLocaleString('en-US')} MWh a year.`; fig.invalidate(); }
  upd();
}

/* ---------------- wakeField (model) ---------------- */
export function wakeField(el) {
  const st = { sp: 7, dir: 270, k: 0.04, cols: 5, rows: 4 }; let stats = {};
  const layout = () => layoutGrid(st.cols, st.rows, st.sp);
  const deficitAt = (T, px, py, dir, skip = -1) => wakeDeficit(T, px, py, dir, st.k, skip);
  const tPow = (T, i, dir) => turbinePower(T, i, dir, st.k);
  const arrayEff = (dir) => arrayEffOf(layout(), dir, st.k);
  let geo = null;
  const fig = new Fig(el, {
    label: 'Wind turbine wakes in a five-by-four array: each turbine slows the wind behind it, so downstream turbines make less power; change spacing and wind direction',
    height: w => w < 600 ? 450 : 440,
    draw(ctx, w, h) {
      const T = layout(), narrow = w < 600;
      const ext = (Math.max(st.cols, st.rows) - 1) / 2 * st.sp + (narrow ? 9 : 4);
      const box = { l: 10, r: w - 10, t: 10, b: h - (narrow ? 100 : 92) };
      const s = Math.min((box.r - box.l) / (2 * ext), (box.b - box.t) / (2 * ext)), cx = (box.l + box.r) / 2, cy = (box.t + box.b) / 2;
      const X = x => cx + x * s, Y = y => cy + y * s;
      geo = { cx, cy, s };
      const step = narrow ? 4 : 4;
      for (let py = box.t; py < box.b; py += step) for (let px = box.l; px < box.r; px += step) {
        const d = deficitAt(T, (px + step / 2 - cx) / s, (py + step / 2 - cy) / s, st.dir);
        ctx.fillStyle = mix('#dfeaf2', '#2c6795', 0) ; if (d > 0.005) ctx.fillStyle = mix('#dfeaf2', '#d9573b', clamp(d / 0.5, 0, 1));
        ctx.fillRect(px, py, step, step);
      }
      T.forEach((t, i) => { const p = tPow(T, i, st.dir); const lab = Math.round(p * 100) + '', big = lab.length > 2; // "100" needs smaller type to fit its circle
        circle(ctx, X(t[0]), Y(t[1]), narrow ? 12 : 8, '#fff', C.ink, 1.4);
        text(ctx, lab, X(t[0]), Y(t[1]) + (narrow ? (big ? 3.5 : 4) : big ? 2.5 : 3.5), { size: narrow ? (big ? 9.5 : 11) : big ? 6.5 : 8.5, small: narrow && big, weight: 700, color: C.ink, align: 'center' }); });
      // wind arrow
      const th = (st.dir + 180) * Math.PI / 180, ax = Math.sin(th), ay = -Math.cos(th), L = narrow ? 24 : 34, ox = box.l + (narrow ? 32 : 50), oy = box.t + (narrow ? 30 : 44);
      circle(ctx, ox, oy, narrow ? 21 : 30, alpha('#fff', 0.7), C.grid2, 1);
      arrow(ctx, ox - ax * L / 2, oy - ay * L / 2, ox + ax * L / 2, oy + ay * L / 2, C.ink, 2.4, 9);
      text(ctx, 'wind', ox, oy + (narrow ? 34 : 46), { size: 10.5, color: C.ink2, align: 'center', halo: true });
      // efficiency vs direction mini chart
      const effs = []; for (let d = 0; d < 360; d += 5) effs.push(arrayEff(d)); const avg = effs.reduce((a, b) => a + b, 0) / effs.length;
      stats = { now: arrayEff(st.dir), avg, min: Math.min(...effs) };
      const M = { l: box.l + 10, r: box.r - 10, t: box.b + 16, b: box.b + (narrow ? 80 : 72) };
      text(ctx, 'array output vs wind direction', M.l, M.t - 3, { size: 10, color: C.ink3 });
      const mx = scale(0, 360, M.l, M.r), my = scale(0.4, 1, M.b, M.t + 6);
      pathLine(ctx, effs.map((e, i) => [mx(i * 5), my(e)]), C.wind, 1.6);
      line(ctx, mx(st.dir), M.t + 4, mx(st.dir), M.b, C.ink, 1.2);
      ['N', 'E', 'S', 'W'].forEach((c, i) => text(ctx, c, mx(i * 90), M.b + 12, { size: 9.5, color: C.ink3, align: 'center' }));
    },
  });
  fig.interact({ hit: (x, y) => geo && y < geo.cy + geo.s * 50 ? 'd' : null, cursor: 'grab', down: (o, x, y) => setDir(x, y), move: (o, x, y) => setDir(x, y) });
  function setDir(x, y) { const a = Math.atan2(x - geo.cx, -(y - geo.cy)) * 180 / Math.PI; st.dir = Math.round(((a + 180) % 360 + 360) % 360); dsl.set(st.dir); upd(); }
  const ctl = controls(el); const ro = readout(el);
  const dsl = slider(ctl, { label: 'Wind from', min: 0, max: 359, step: 1, value: st.dir, color: C.wind, fmt: v => v + '° ' + ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(v / 45) % 8], oninput: v => { st.dir = v; upd(); }, name: 'dir' });
  const wadv = more(ctl, 'More: spacing and site');
  slider(wadv, { label: 'Spacing between turbines', min: 3, max: 12, step: 0.5, value: st.sp, color: C.ink, fmt: v => v + ' rotor diameters', oninput: v => { st.sp = v; upd(); }, name: 'sp' });
  segmented(wadv, { label: 'Site', options: [{ label: 'Offshore (slow wake recovery)', value: 0.04, name: 'k-off' }, { label: 'Onshore (faster recovery)', value: 0.075, name: 'k-on' }], value: 0.04, onchange: v => { st.k = v; upd(); } });
  function upd() { fig.render(); ro.innerHTML = `Over a year, with the wind from every direction equally, the array makes <b>${Math.round(stats.avg * 100)}%</b> of what 20 lone turbines would: a wake loss of <b>${Math.round((1 - stats.avg) * 100)}%</b>. From this direction alone: ${Math.round(stats.now * 100)}%. Numbers on turbines: % of a lone turbine's power.`; fig.invalidate(); }
  upd();
}

/* ---------------- offshoreCfd ---------------- */
const CFD = [
  ['AR1', 2015.15, [119.89, 114.39], 'Feb 2015: East Anglia One and Neart na Gaoithe, the first competitive rounds'],
  ['AR2', 2017.7, [74.75, 57.5], 'Sep 2017: Hornsea 2 and Moray East at £57.50 — half of AR1'],
  ['AR3', 2019.7, [39.65, 41.611], 'Sep 2019: Dogger Bank and others below £42'],
  ['AR4', 2022.55, [37.35], 'Jul 2022: the low point, £37.35, just as inflation and interest rates surged'],
  ['AR5', 2023.7, [], 'Sep 2023: no offshore wind bids at all — the price cap of £44 was below what developers could build for'],
  ['AR6', 2024.7, [54.23, 58.87], 'Sep 2024: higher cap; contracts at £54–59'],
  ['AR7', 2026.04, [65.45, 64.23], 'Jan 2026: a record 8.4 GW at £91.20 in 2024 money (£65.45 in 2012 money)'],
];
export function offshoreCfd(el) {
  const st = { base: 2012, hover: 3 }; let geo = null;
  const fig = new Fig(el, {
    label: 'Strike prices for UK offshore wind contracts for difference by allocation round, 2015 to 2026, showing the fall to 2022 and the rise afterwards',
    height: w => w < 600 ? 380 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, f = st.base === 2012 ? 1 : 1 / 0.7177;
      const box = { l: narrow ? 46 : 56, r: w - 16, t: 34, b: h - 40 };
      const { sx, sy } = axes(ctx, { box, x0: 2014.5, x1: 2026.6, y0: 0, y1: 180, yticks: [0, 40, 80, 120, 160], xticks: narrow ? [2015, 2019, 2023] : [2015, 2017, 2019, 2021, 2023, 2025], yfmt: v => '£' + v, ylabel: `strike price, £/MWh in ${st.base} money` });
      geo = [];
      // Orsted marker
      const ox = sx(2023.83); line(ctx, ox, box.t, ox, box.b - 20, alpha('#c8473b', 0.5), 1, [3, 3]); // stop above the round labels
      text(ctx, narrow ? 'Ørsted cancels US projects' : 'Oct 2023: Ørsted cancels Ocean Wind 1 & 2 (US)', ox + (narrow ? -4 : 4), box.t + 10, { size: 10.5, color: '#c8473b', align: narrow ? 'right' : 'left', halo: true });
      const pts = [];
      CFD.forEach(([n, x, ps, s], i) => {
        if (!ps.length) { text(ctx, '×', sx(x), sy(20), { size: 18, weight: 700, color: '#c8473b', align: 'center' }); text(ctx, 'no bids', sx(x), sy(20) - 16, { size: 10, weight: 650, color: '#c8473b', align: 'center', halo: true }); geo.push({ i, x: sx(x), y: sy(20) }); }
        ps.forEach(p => { circle(ctx, sx(x), sy(p * f), i === st.hover ? 7 : 5.5, i === st.hover ? '#2c6795' : alpha('#2c6795', 0.8), '#fff', 1.5); geo.push({ i, x: sx(x), y: sy(p * f) }); });
        if (ps.length) pts.push([sx(x), sy(Math.min(...ps) * f)]);
        text(ctx, n, sx(x), box.b - 6, { size: 10.5, weight: 650, color: C.ink3, align: 'center' });
      });
      pathLine(ctx, pts, alpha('#2c6795', 0.5), 1.5);
    },
  });
  const near = (x, y) => { if (!geo) return null; let b = null, bd = 22; geo.forEach(g => { const d = Math.hypot(g.x - x, g.y - y); if (d < bd) { bd = d; b = g; } }); return b; };
  fig.interact({ hit: (x, y) => near(x, y), cursor: 'pointer', hover: o => { if (o) { st.hover = o.i; upd(); } } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Money of', options: [{ label: '2012 (as published to AR6)', value: 2012, name: 'b2012' }, { label: '2024', value: 2024, name: 'b2024' }], value: 2012, onchange: v => { st.base = v; upd(); } });
  function upd() { const c = CFD[st.hover]; ro.innerHTML = `<b>${c[0]}</b> — ${c[3]}.`; fig.invalidate(); }
  upd();
}
