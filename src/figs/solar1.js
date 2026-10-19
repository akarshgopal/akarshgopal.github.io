// Solar PV post, part 1: the physics.
//  spectrum  — ASTM G173 spectrum split by a chosen band gap (real spectrum, detailed-balance numbers)
//  junction  — animated band diagram of a p–n junction under light (model)
//  ivCurve   — single-diode model of a representative module, irradiance + temperature, MPP tracking (model)
//  sqLimit   — where sunlight goes for every band gap: the Shockley–Queisser limit (computed from ASTM G173)
//  shading   — 72-cell module with three bypass diodes; paint shade, watch the P–V curve (model)
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, measure, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, scale, tag } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, more } from '../lib/ui.js';
import { SOLAR } from '../lib/solardata.js';

const HEAT = '#d9573b', PASS = '#b9b3a6', USE = '#e3a922', ELEC = '#2f8f6b';
const sqAt = eg => { const t = SOLAR.sq; const i = clamp(Math.round((eg - t[0][0]) / 0.01), 0, t.length - 1); return t[i]; };
const nm2ev = nm => 1239.84 / nm;
// visible colour for a wavelength (approximate, for decoration only)
function wlColor(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else { r = 1; }
  const f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1;
  const c = v => Math.round(255 * Math.pow(clamp(v * f, 0, 1), 0.8));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}
const MATERIALS = [
  { n: 'Germanium', eg: 0.66 }, { n: 'Silicon', eg: 1.12 }, { n: 'GaAs', eg: 1.42 }, { n: 'CdTe', eg: 1.5 },
  { n: 'Perovskite (MAPbI₃)', short: 'Perovskite', eg: 1.6 }, { n: 'Wide-gap perovskite (tandem top cell)', short: 'Wide-gap perovskite', eg: 1.68 },
];

/* ---------------- spectrum ---------------- */
export function spectrum(el) {
  const st = { eg: 1.12, hover: null }; let geo = null;
  const fig = new Fig(el, {
    label: 'The solar spectrum at the Earth’s surface, split by a chosen band gap into light that passes through, energy lost as heat, and energy a cell could use',
    height: w => w < 600 ? 440 : 400,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 40 : 52, r: w - 14, t: 52, b: h - (narrow ? 132 : 112) };
      const X1 = 2500;
      const { sx, sy } = axes(ctx, { box, x0: 280, x1: X1, y0: 0, y1: 1.7, yticks: [0, 0.5, 1, 1.5], xticks: narrow ? [500, 1000, 1500, 2000] : [400, 800, 1200, 1600, 2000, 2400], xfmt: v => v + ' nm', yfmt: v => v.toFixed(1), });
      text(ctx, 'sunlight at the ground, W/m² per nm', box.l - 4, box.t - 34, { size: 11, color: C.ink3, weight: 500 });
      geo = { sx, sy, box };
      const lg = 1239.84 / st.eg;
      for (const [wl, p] of SOLAR.spec) {
        const x0 = sx(wl - 5), x1 = sx(wl + 5), y0 = sy(0);
        if (wl > lg) { ctx.fillStyle = alpha(PASS, 0.75); ctx.fillRect(x0, sy(p), x1 - x0 + 0.4, y0 - sy(p)); continue; }
        const used = st.eg / nm2ev(wl); // fraction of the photon's energy a cell at this gap can keep
        ctx.fillStyle = USE; ctx.fillRect(x0, sy(p * used), x1 - x0 + 0.4, y0 - sy(p * used));
        ctx.fillStyle = alpha(HEAT, 0.85); ctx.fillRect(x0, sy(p), x1 - x0 + 0.4, sy(p * used) - sy(p));
      }
      // visible band
      for (let wl = 380; wl < 780; wl += 4) { ctx.fillStyle = wlColor(wl); ctx.fillRect(sx(wl), box.b + 1, sx(wl + 4) - sx(wl) + 0.5, 4); }
      text(ctx, 'visible', sx(580), box.t + 12, { size: 10.5, color: C.ink3, align: 'center' });
      line(ctx, sx(380), box.t + 16, sx(380), box.b, alpha(C.ink3, 0.35), 1, [2, 3]); line(ctx, sx(780), box.t + 16, sx(780), box.b, alpha(C.ink3, 0.35), 1, [2, 3]);
      // gap handle
      const gx = sx(Math.min(lg, X1));
      line(ctx, gx, box.t - 6, gx, box.b, C.ink, 2);
      rrect(ctx, gx - 9, box.t - 22, 18, 18, 9); ctx.fillStyle = C.ink; ctx.fill();
      text(ctx, '↔', gx, box.t - 9, { size: 11, color: '#fff', align: 'center', weight: 700 });
      const gl = `band gap ${st.eg.toFixed(2)} eV  =  ${Math.round(lg)} nm`, glw = measure(ctx, gl, 12, 650);
      const right = gx + 14 + glw < w - 6;
      text(ctx, gl, right ? gx + 14 : gx - 14, box.t - 9, { size: 12, weight: 650, color: C.ink, align: right ? 'left' : 'right', halo: true });
      // budget bar
      const s = sqAt(st.eg), below = s[1], heat = s[2], eff = s[3], other = 1 - below - heat - eff;
      const by = h - (narrow ? 76 : 58), bl = box.l, br = w - 14, bw = br - bl;
      text(ctx, (ctx.canvas.clientWidth < 600) ? 'Where sunlight’s energy goes' : 'Where the energy of sunlight goes, for a single-junction cell with this band gap', bl, by - 12, { size: 11.5, weight: 600, color: C.ink2 });
      const segs = [['passes through', below, alpha(PASS, 0.9)], ['lost as heat', heat, alpha(HEAT, 0.85)], ['other unavoidable losses', other, lighten(USE, 0.45)], ['electricity (limit)', eff, ELEC]];
      let x = bl;
      segs.forEach(([lab, v, col]) => { const ww = v * bw; ctx.fillStyle = col; ctx.fillRect(x, by, ww - 1, 20); if (ww > 34) text(ctx, Math.round(v * 100) + '%', x + ww / 2, by + 14, { size: 11, weight: 650, color: col === ELEC || col === alpha(HEAT, 0.85) ? '#fff' : C.ink, align: 'center' }); x += ww; });
      // legend
      let lx = bl, ly = by + 38;
      segs.forEach(([lab, v, col]) => { const tw = measure(ctx, lab, 11) + 26; if (lx + tw > br) { lx = bl; ly += 16; } ctx.fillStyle = col; ctx.fillRect(lx, ly - 9, 10, 10); text(ctx, lab, lx + 14, ly, { size: 11, color: C.ink2 }); lx += tw; });
    },
  });
  fig.interact({
    hit: (x, y) => geo && y < geo.box.b + 6 ? 'gap' : null, cursor: 'ew-resize',
    down: (o, x) => setFromX(x), move: (o, x) => setFromX(x),
  });
  const setFromX = x => { const nm = clamp(geo.sx.inv(x), 500, 2400); st.eg = clamp(Math.round(nm2ev(nm) * 100) / 100, 0.52, 2.48); egs.set(st.eg); seg.set(null); upd(); };
  const ctl = controls(el); const ro = readout(el);
  const egs = slider(ctl, { label: 'Band gap', min: 0.52, max: 2.48, step: 0.01, value: st.eg, color: C.ink, fmt: v => v.toFixed(2) + ' eV', oninput: v => { st.eg = v; seg.set(MATERIALS.some(m => m.eg === v) ? v : null); upd(); }, name: 'eg' });
  const seg = segmented(more(ctl, 'More: pick a real material'), { label: 'Material', options: MATERIALS.filter(m => m.eg < 1.65 || true).map(m => ({ label: (m.short || m.n) + ` <small>${m.eg} eV</small>`, value: m.eg, name: 'mat-' + m.n.split(' ')[0].toLowerCase() })), value: 1.12, onchange: v => { st.eg = v; egs.set(v); upd(); } });
  const upd = () => {
    const s = sqAt(st.eg);
    ro.innerHTML = `A ${st.eg.toFixed(2)} eV gap lets <b>${Math.round(s[1] * 100)}%</b> of the sunlight’s energy pass straight through and turns another <b>${Math.round(s[2] * 100)}%</b> into heat. Even a perfect cell could deliver at most <b>${(s[3] * 100).toFixed(1)}%</b> as electricity (its open-circuit voltage would be ${s[5].toFixed(2)} V and its short-circuit current ${s[4].toFixed(1)} mA/cm²).`;
    fig.invalidate();
  };
  upd();
}

/* ---------------- sqLimit ---------------- */
export function sqLimit(el) {
  const st = { eg: 1.34 }; let geo = null;
  const REC = [{ n: 'Silicon record 28.3%', eg: 1.12, e: 0.2829 }, { n: 'GaAs record 29.1%', eg: 1.42, e: 0.291 }];
  const fig = new Fig(el, {
    label: 'For every band gap from 0.4 to 3 electronvolts, how sunlight divides into light that passes through, heat, other unavoidable losses and electricity; the maximum is about 33.7 percent at 1.34 electronvolts',
    height: w => w < 600 ? 360 : 380,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 40 : 48, r: w - (narrow ? 14 : 150), t: 30, b: h - 40 };
      const { sx, sy } = axes(ctx, { box, x0: 0.4, x1: 3.0, y0: 0, y1: 1, yticks: [0, 0.25, 0.5, 0.75, 1], xticks: [0.5, 1, 1.5, 2, 2.5, 3], xfmt: v => v + ' eV', yfmt: v => Math.round(v * 100) + '%', ylabel: 'share of incoming sunlight', xlabel: narrow ? '' : 'band gap' });
      geo = { sx, sy, box };
      const T = SOLAR.sq.filter(r => r[0] <= 3.0);
      const layer = (f0, f1, col) => { ctx.beginPath(); T.forEach((r, i) => { const x = sx(r[0]), y = sy(f1(r)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); for (let i = T.length - 1; i >= 0; i--) ctx.lineTo(sx(T[i][0]), sy(f0(T[i]))); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
      layer(r => 0, r => r[3], ELEC);
      layer(r => r[3], r => 1 - r[1] - r[2], lighten(USE, 0.45));
      layer(r => 1 - r[1] - r[2], r => 1 - r[1], alpha(HEAT, 0.8));
      layer(r => 1 - r[1], r => 1, alpha(PASS, 0.85));
      // labels in the bands
      const lab = (s, eg, f, col) => text(ctx, s, sx(eg), sy(f), { size: 11.5, weight: 650, color: col, align: 'center' });
      lab('passes through', narrow ? 2.35 : 2.4, 0.86, C.ink);
      lab('lost as heat', narrow ? 0.85 : 0.8, 0.62, '#fff');
      if (!narrow) lab('other losses', 2.2, 0.2, darken(USE, 0.4));
      lab('electricity', narrow ? 1.6 : 1.55, 0.12, '#fff');
      // optimum + records
      const best = T.reduce((a, b) => b[3] > a[3] ? b : a);
      circle(ctx, sx(best[0]), sy(best[3]), 3.5, '#fff', C.ink, 1.5);
      const tx = narrow ? box.l + 6 : box.r + 10;
      if (!narrow) {
        text(ctx, `best gap ${best[0].toFixed(2)} eV`, tx, sy(best[3]) - 6, { size: 11, weight: 650, color: C.ink });
        text(ctx, `limit ${(best[3] * 100).toFixed(1)}%`, tx, sy(best[3]) + 8, { size: 11, color: C.ink2 });
        line(ctx, sx(best[0]) + 4, sy(best[3]), box.r + 6, sy(best[3]), alpha(C.ink, 0.5), 1, [2, 2]);
      }
      REC.forEach((r, i) => {
        const x = sx(r.eg), y = sy(r.e);
        line(ctx, x - 5, y, x + 5, y, C.ink, 2); line(ctx, x, y - 5, x, y + 5, C.ink, 2);
        if (!narrow) text(ctx, r.n, box.r + 10, sy(r.e) + (i ? 24 : 36), { size: 10.5, color: C.ink2 });
      });
      // handle
      const s = sqAt(st.eg), gx = sx(st.eg);
      line(ctx, gx, box.t - 4, gx, box.b, C.ink, 1.5);
      circle(ctx, gx, sy(s[3]), 5.5, '#fff', C.ink, 2);
      const lab2 = `${st.eg.toFixed(2)} eV → ${(s[3] * 100).toFixed(1)}%`, lw = measure(ctx, lab2, 12, 650), rt = gx + 10 + lw < box.r;
      text(ctx, lab2, rt ? gx + 10 : gx - 10, box.t + 8, { size: 12, weight: 650, color: C.ink, align: rt ? 'left' : 'right', halo: true });
    },
  });
  fig.interact({ hit: (x, y) => geo && x > geo.box.l - 4 && x < geo.box.r + 4 && y < geo.box.b + 4 ? 'g' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { st.eg = clamp(Math.round(geo.sx.inv(x) * 100) / 100, 0.4, 3.0); sl.set(st.eg); upd(); };
  const ctl = controls(el); const ro = readout(el);
  const sl = slider(ctl, { label: 'Band gap', min: 0.4, max: 3.0, step: 0.01, value: st.eg, color: C.ink, fmt: v => v.toFixed(2) + ' eV', oninput: v => { st.eg = v; upd(); }, name: 'eg', wide: true });
  const upd = () => { const s = sqAt(st.eg); ro.innerHTML = `At ${st.eg.toFixed(2)} eV: <b>${Math.round(s[1] * 100)}%</b> passes through, <b>${Math.round(s[2] * 100)}%</b> becomes heat, <b>${Math.round((1 - s[1] - s[2] - s[3]) * 100)}%</b> is lost to unavoidable emission and voltage losses, and at most <b>${(s[3] * 100).toFixed(1)}%</b> becomes electricity.`; fig.invalidate(); };
  upd();
}

/* ---------------- junction ---------------- */
export function junction(el) {
  const st = { light: 1, closed: true, V: 0, carriers: [], wire: [], flashes: [], acc: 0, through: 0, recomb: 0, rate: 0, rateT: 0, lamp: 0 };
  let spawnAcc = 0;
  const VBI = 1; // normalised built-in step
  const fig = new Fig(el, {
    label: 'Band diagram of a p–n junction in a solar cell: light creates electrons and holes, the junction field sweeps electrons to the n side and holes to the p side, and the external circuit carries electrons through a lamp',
    animated: true,
    height: w => w < 600 ? 600 : 560,
    step(dt) {
      const step = VBI - st.V;
      // generate pairs
      spawnAcc += dt * 9 * st.light;
      while (spawnAcc > 1) { spawnAcc--; const x = Math.random(); st.carriers.push({ t: 'e', x, age: 0, life: 2 + Math.random() * 5, born: 1 }); st.carriers.push({ t: 'h', x, age: 0, life: 2 + Math.random() * 5, born: 1 }); st.flashes.push({ x, a: 1 }); }
      const field = x => { const d = (x - 0.5) / 0.09; return Math.exp(-d * d) * 2.2 * step; };
      let accE = 0, accH = 0;
      for (const c of st.carriers) {
        c.age += dt; c.born = Math.max(0, c.born - dt * 3);
        const drift = field(c.x) * (c.t === 'e' ? 1 : -1);
        c.x += (drift * 0.35 + (Math.random() - 0.5) * 0.9) * dt;
        if (c.x < 0.005) { if (c.t === 'h' && st.closed) c.out = 'l'; c.x = 0.005; }
        if (c.x > 0.995) { if (c.t === 'e' && st.closed) c.out = 'r'; c.x = 0.995; }
        if (c.t === 'e' && c.x > 0.6) accE++;
        if (c.t === 'h' && c.x < 0.4) accH++;
        if (c.age > c.life * (1 + (st.closed ? 0 : 0))) c.dead = true;
      }
      // recombination is faster when the step is small (forward bias): open circuit fills up until losses balance generation
      const rec = 1 + 6 * Math.max(0, st.V) ** 2;
      for (const c of st.carriers) if (!c.dead && c.age * rec > c.life) { c.dead = true; st.recomb++; st.flashes.push({ x: c.x, a: 0.6, r: true }); }
      for (const c of st.carriers) if (c.out === 'r') { c.dead = true; st.wire.push({ s: 0 }); st.through++; st.rateT++; }
      for (const c of st.carriers) if (c.out === 'l') c.dead = true;
      st.carriers = st.carriers.filter(c => !c.dead);
      if (st.carriers.length > 400) st.carriers.splice(0, st.carriers.length - 400);
      // voltage: open circuit → charge piles up on each side and the step shrinks
      const target = st.closed ? 0.05 : clamp(Math.min(accE, accH) / 26, 0, 0.82) * Math.min(1, st.light * 1.2);
      st.V = approach(st.V, target, 2.2, dt);
      for (const wv of st.wire) wv.s += dt * 0.45;
      st.wire = st.wire.filter(wv => wv.s < 1);
      st.flashes.forEach(f => f.a -= dt * 2.2); st.flashes = st.flashes.filter(f => f.a > 0);
      st.rate += dt; if (st.rate > 1) { st.lamp = st.rateT; st.rateT = 0; st.rate = 0; }
    },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const L = narrow ? 30 : 70, R = w - (narrow ? 30 : 70);
      const top = narrow ? 120 : 110, bandH = narrow ? 200 : 190;
      const step = (VBI - st.V) * bandH * 0.42;
      const X = x => L + x * (R - L);
      const sstep = x => 1 / (1 + Math.exp(-(x - 0.5) / 0.035));
      const Ec = x => top + 20 + sstep(x) * step, Ev = x => Ec(x) + bandH * 0.42;
      // regions
      ctx.fillStyle = alpha(C.phaseA, 0.05); ctx.fillRect(X(0), top - 6, X(0.42) - X(0), bandH + 4);
      ctx.fillStyle = alpha(C.electron, 0.05); ctx.fillRect(X(0.58), top - 6, X(1) - X(0.58), bandH + 4);
      ctx.fillStyle = alpha(C.ink, 0.04); ctx.fillRect(X(0.42), top - 6, X(0.58) - X(0.42), bandH + 4);
      text(ctx, 'p-type silicon', X(0.2), top + bandH + 16, { size: 11.5, weight: 600, color: darken(C.phaseA, 0.1), align: 'center' });
      text(ctx, 'n-type silicon', X(0.8), top + bandH + 16, { size: 11.5, weight: 600, color: darken(C.electron, 0.1), align: 'center' });
      text(ctx, narrow ? 'junction' : 'junction (built-in field)', X(0.5), top + bandH + 16, { size: 10.5, color: C.ink3, align: 'center' });
      // bands
      const pts = f => { const a = []; for (let i = 0; i <= 120; i++) { const x = i / 120; a.push([X(x), f(x)]); } return a; };
      pathLine(ctx, pts(Ec), C.ink, 2.2); pathLine(ctx, pts(Ev), C.ink, 2.2);
      text(ctx, 'conduction band', X(0.5), Ec(0.5) - 14, { size: 10.5, color: C.ink3, align: 'center', halo: true });
      text(ctx, 'valence band', X(0.5), Ev(0.5) + 18, { size: 10.5, color: C.ink3, align: 'center', halo: true });
      // carriers
      for (const c of st.carriers) {
        const x = X(c.x), y = c.t === 'e' ? Ec(c.x) - 6 - (c.born * 18) : Ev(c.x) + 6;
        if (c.t === 'e') circle(ctx, x, y, 3.6, C.electron, null); else circle(ctx, x, y, 3.6, '#fff', C.phaseA, 1.6);
      }
      for (const f of st.flashes) { if (f.r) circle(ctx, X(f.x), (Ec(f.x) + Ev(f.x)) / 2, 6 * (1 - f.a) + 2, null, alpha(C.peaker, f.a), 1.2); else { const x = X(f.x); line(ctx, x - 6, top - 26 + 12 * (1 - f.a), x, Ec(f.x) - 10, alpha(C.solar, f.a), 2); } }
      // circuit
      const wy = narrow ? 30 : 34;
      ctx.strokeStyle = st.closed ? C.ink2 : alpha(C.ink3, 0.6); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(X(1) + 8, Ec(1)); ctx.lineTo(R + (narrow ? 18 : 40), Ec(1)); ctx.lineTo(R + (narrow ? 18 : 40), wy); ctx.lineTo(w / 2 + 40, wy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w / 2 - 40, wy); ctx.lineTo(L - (narrow ? 18 : 40), wy); ctx.lineTo(L - (narrow ? 18 : 40), Ev(0)); ctx.lineTo(X(0) - 8, Ev(0)); ctx.stroke();
      if (st.closed) line(ctx, w / 2 - 40, wy, w / 2 - 18, wy, C.ink2, 2), line(ctx, w / 2 + 18, wy, w / 2 + 40, wy, C.ink2, 2);
      else { line(ctx, w / 2 - 40, wy, w / 2 - 22, wy, C.ink3, 2); line(ctx, w / 2 - 22, wy, w / 2 - 6, wy - 12, C.ink3, 2); line(ctx, w / 2 + 18, wy, w / 2 + 40, wy, C.ink3, 2); }
      const glow = st.closed ? clamp(st.lamp / 8, 0, 1) : 0;
      if (glow > 0) circle(ctx, w / 2 + 6, wy, 22, alpha(C.solar, 0.25 * glow), null);
      circle(ctx, w / 2 + 6, wy, 11, glow > 0 ? mix('#fff7d6', C.solar, glow) : '#fff', C.ink2, 1.6);
      text(ctx, 'lamp', w / 2 + 22, wy - 6, { size: 10.5, color: C.ink3, align: 'left', halo: true });
      // wire electrons
      const path = s => { const xr = R + (narrow ? 18 : 40), xl = L - (narrow ? 18 : 40); const segs = [[X(1) + 8, Ec(1), xr, Ec(1)], [xr, Ec(1), xr, wy], [xr, wy, xl, wy], [xl, wy, xl, Ev(0)], [xl, Ev(0), X(0) - 8, Ev(0)]]; const lens = segs.map(q => Math.hypot(q[2] - q[0], q[3] - q[1])); let d = s * lens.reduce((a, b) => a + b); for (let i = 0; i < segs.length; i++) { if (d <= lens[i]) { const q = segs[i], t = d / lens[i]; return [lerp(q[0], q[2], t), lerp(q[1], q[3], t)]; } d -= lens[i]; } return [segs[4][2], segs[4][3]]; };
      for (const wv of st.wire) { const [x, y] = path(wv.s); circle(ctx, x, y, 3.2, C.electron, null); }
      // I–V panel (single-diode model, typical silicon: J_L = 40 mA/cm² × light, V_oc ≈ 0.70 V at full sun, 25 °C).
      // Open circuit: the point climbs the curve as charge piles up (voltage from the band animation above). Closed: lamp load line.
      { const Vt = 0.0257, J0 = 40 / (Math.exp(0.70 / Vt) - 1), JL = 40 * st.light, J = v => JL - J0 * (Math.exp(v / Vt) - 1);
        const I = { l: L + 44, r: narrow ? R : L + (R - L) * 0.62, t: top + bandH + 58, b: h - 66 };
        const ax = scale(0, 0.75, I.l, I.r), ay = scale(0, 44, I.b, I.t);
        line(ctx, I.l, I.b, I.r, I.b, C.ink3, 1); line(ctx, I.l, I.t, I.l, I.b, C.ink3, 1);
        [0, 0.2, 0.4, 0.6].forEach(v => text(ctx, v.toFixed(1) + ' V', ax(v), I.b + 13, { size: 9.5, color: C.ink3, align: 'center' }));
        [0, 20, 40].forEach(v => text(ctx, String(v), I.l - 5, ay(v) + 3, { size: 9.5, color: C.ink3, align: 'right' }));
        text(ctx, 'current, mA/cm²', I.l, I.t - 8, { size: 10, color: C.ink3 });
        text(ctx, 'cell voltage', I.r, I.b + 26, { size: 10, color: C.ink3, align: 'right' });
        const curve = jl => { const pts = []; for (let k = 0; k <= 60; k++) { const v = 0.75 * k / 60, jj = jl - J0 * (Math.exp(v / Vt) - 1); if (jj < 0) break; pts.push([ax(v), ay(jj)]); } return pts; };
        if (st.light < 0.999) pathLine(ctx, curve(40), alpha(C.solar, 0.35), 1.4, [4, 3]);
        pathLine(ctx, curve(JL), darken(C.solar, 0.15), 2.4);
        let vop;
        if (st.closed) { const Rl = 0.6 / J(0.6) * (st.light > 0 ? 1 : 1); let lo = 0, hi = 0.75; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (J(m) - m / Rl > 0) lo = m; else hi = m; } vop = lo;
          pathLine(ctx, [[ax(0), ay(0)], [ax(0.75), ay(Math.min(44, 0.75 / Rl))]], alpha(C.ink2, 0.5), 1, [3, 3]); text(ctx, 'lamp', ax(0.62), ay(Math.min(44, 0.62 / Rl)) - 6, { size: 9.5, color: C.ink3, align: 'right', halo: true }); }
        else vop = clamp(st.V / 0.82 * 0.7, 0, 0.75);
        const jop = Math.max(0, J(vop));
        if (st.closed && jop > 0.5) { ctx.fillStyle = alpha(C.solar, 0.16); ctx.fillRect(ax(0), ay(jop), ax(vop) - ax(0), ay(0) - ay(jop)); }
        circle(ctx, ax(vop), ay(jop), 5.5, '#fff', C.ink, 2);
        const tx = narrow ? I.l : I.r + 22, ty = narrow ? I.t - 24 : I.t + 14;
        if (!narrow) {
          text(ctx, st.closed ? 'working point (lamp)' : 'open circuit: no current', tx, ty, { size: 11.5, weight: 650, color: C.ink });
          text(ctx, `${vop.toFixed(2)} V × ${jop.toFixed(1)} mA/cm²`, tx, ty + 18, { size: 11, color: C.ink2 });
          text(ctx, `= ${(vop * jop).toFixed(1)} mW/cm² of electricity`, tx, ty + 34, { size: 11, color: C.ink2, weight: st.closed ? 650 : 450 });
          text(ctx, st.light < 0.999 ? 'dashed: full sun' : 'shaded area = power', tx, ty + 54, { size: 10, color: C.ink3 });
        }
      }
      // voltage meter
      const vtxt = st.closed ? (st.light === 0 ? (w < 600 ? 'dark: no current' : 'dark: no new electron–hole pairs, so no current and the lamp goes out') : (w < 600 ? `closed: ≈ ${(st.light * 40).toFixed(0)} mA/cm², cell near 0.6 V` : `circuit closed: current ∝ light, ≈ ${(st.light * 40).toFixed(0)} mA/cm² (typical silicon) at ${Math.round(st.light * 100)}% sun; the lamp holds the cell near 0.6 V`)) : `open circuit: voltage builds to ≈ ${(st.V / 0.82 * 0.7).toFixed(2)} V`;
      text(ctx, vtxt, w / 2, h - 12, { size: 11.5, weight: 600, color: C.ink2, align: 'center' });
      // legend
      const ly = narrow ? top - 46 : top - 40;
      circle(ctx, L + 4, ly - 4, 3.6, C.electron, null); text(ctx, 'electron', L + 12, ly, { size: 10.5, color: C.ink2 });
      circle(ctx, L + 74, ly - 4, 3.6, '#fff', C.phaseA, 1.6); text(ctx, 'hole', L + 82, ly, { size: 10.5, color: C.ink2 });
      if (!narrow) { line(ctx, L + 124, ly - 8, L + 130, ly, C.solar, 2); text(ctx, 'photon absorbed', L + 136, ly, { size: 10.5, color: C.ink2 }); circle(ctx, L + 240, ly - 4, 4, null, C.peaker, 1.2); text(ctx, 'recombination (lost)', L + 248, ly, { size: 10.5, color: C.ink2 }); }
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Circuit', options: [{ label: 'Closed (through a lamp)', value: true, name: 'closed' }, { label: 'Open', value: false, name: 'open' }], value: true, onchange: v => { st.closed = v; fig.invalidate(); if (!isPlaying()) for (let i = 0; i < 90; i++) fig.stepOnce(1 / 30); } });
  slider(ctl, { label: 'Light', min: 0, max: 1, step: 0.05, value: 1, color: C.solar, fmt: v => v === 0 ? 'dark' : Math.round(v * 100) + '%', oninput: v => { st.light = v; if (!isPlaying()) for (let i = 0; i < 60; i++) fig.stepOnce(1 / 30); }, name: 'light' });
  ro.innerHTML = 'Electrons (blue) roll <i>down</i> the slope of the conduction band towards the n side; holes (white) float <i>up</i> the valence band towards the p side. That one-way sorting is the whole trick: it turns randomly created pairs into a current. Open the circuit and the sorted charge has nowhere to go, so it piles up, flattens the slope, and recombination rises until it balances generation — that equilibrium is the open-circuit voltage.';
  for (let i = 0; i < 120; i++) fig.opts.step(1 / 30);
}
function approach(cur, target, rate, dt) { return target + (cur - target) * Math.exp(-rate * dt); }

/* ---------------- module model (shared) ---------------- */
const KQ = 8.617333e-5;
export function moduleModel(G, T) {
  // representative 2025 TOPCon module, 72 series cell-equivalents (144 half cells): datasheet-like STC values
  const Ns = 72, n = 1.15, Rs = 0.2, Rsh = 500, IscR = 14.0, VocR = 52.0, a0 = n * Ns * KQ * 298.15;
  const Isc = IscR * (1 + 0.00045 * (T - 25)), Voc = VocR * (1 + -0.0025 * (T - 25));
  const a = n * Ns * KQ * (T + 273.15);
  const I0 = (Isc - Voc / Rsh) / (Math.exp(Voc / a) - 1);
  const Iph = Isc * G / 1000;
  const I = V => { let lo = -1, hi = Iph + 1; for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2; const f = Iph - I0 * (Math.exp((V + m * Rs) / a) - 1) - (V + m * Rs) / Rsh - m; if (f > 0) lo = m; else hi = m; } return (lo + hi) / 2; };
  let vOC = 0; { let lo = 0, hi = VocR * 1.4; for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2; if (I(m) > 0) lo = m; else hi = m; } vOC = lo; }
  const pts = []; for (let k = 0; k <= 160; k++) { const V = vOC * k / 160; pts.push([V, Math.max(0, I(V))]); }
  let mp = pts[0]; for (const p of pts) if (p[0] * p[1] > mp[0] * mp[1]) mp = p;
  // refine
  let lo = Math.max(0, mp[0] - vOC / 160), hi = Math.min(vOC, mp[0] + vOC / 160);
  for (let k = 0; k < 40; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (m1 * I(m1) < m2 * I(m2)) lo = m1; else hi = m2; }
  const Vm = (lo + hi) / 2;
  return { I, pts, Voc: vOC, Isc: I(0), Vmp: Vm, Imp: I(Vm), Pmp: Vm * I(Vm) };
}
const AREA = 2.58; // m², typical 144-half-cell module (2278 × 1134 mm)

/* ---------------- ivCurve ---------------- */
export function ivCurve(el) {
  const st = { G: 1000, T: 25, V: 30, tracking: false }; let M = moduleModel(st.G, st.T), geo = null;
  const fig = new Fig(el, {
    label: 'Current–voltage and power–voltage curves of a solar module; drag the operating point, change irradiance and temperature, and find the maximum power point',
    height: w => w < 600 ? 380 : 380,
    animated: true,
    step(dt) {
      if (!st.tracking) return;
      // perturb and observe, the algorithm inside most inverters
      st.pt = (st.pt || 0) + dt; if (st.pt < 0.12) return; st.pt = 0;
      const dV = st.dir * 0.8, P0 = st.V * M.I(st.V), V1 = clamp(st.V + dV, 0, M.Voc), P1 = V1 * M.I(V1);
      if (P1 < P0) { st.dir = -st.dir; st.rev = (st.rev || 0) + 1; } else st.V = V1;
      if (st.rev > 3) st.tracking = false;
      upd(false);
    },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: narrow ? 38 : 50, r: w - (narrow ? 44 : 58), t: 34, b: h - 42 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 62, y0: 0, y1: 16, yticks: [0, 4, 8, 12, 16], xticks: [0, 10, 20, 30, 40, 50, 60], xfmt: v => v + ' V', yfmt: v => v + ' A', ylabel: 'current', xlabel: narrow ? '' : 'voltage across the module' });
      const sp = scale(0, 800, box.b, box.t);
      for (const v of [0, 200, 400, 600, 800]) text(ctx, v + ' W', box.r + 6, sp(v) + 4, { size: 11, color: alpha(C.price, 0.85) });
      text(ctx, 'power', box.r + 4, box.t - 10, { size: 11, color: alpha(C.price, 0.85), weight: 500, align: narrow ? 'right' : 'left' });
      geo = { sx, sy, box };
      // reference STC curve
      const ref = moduleModel(1000, 25);
      pathLine(ctx, ref.pts.map(([V, I]) => [sx(V), sy(I)]), alpha(C.ink3, 0.5), 1.2, [3, 3]);
      // power rectangle at operating point
      const Iop = Math.max(0, M.I(st.V)), x = sx(st.V), y = sy(Iop);
      ctx.fillStyle = alpha(C.solar, 0.2); ctx.fillRect(box.l, y, x - box.l, box.b - y);
      // curves
      pathLine(ctx, M.pts.map(([V, I]) => [sx(V), sp(V * I)]), alpha(C.price, 0.85), 2, [6, 4]);
      pathLine(ctx, M.pts.map(([V, I]) => [sx(V), sy(I)]), darken(C.solar, 0.25), 2.6);
      // MPP
      circle(ctx, sx(M.Vmp), sy(M.Imp), 4.5, '#fff', C.ink, 1.6);
      circle(ctx, sx(M.Vmp), sp(M.Pmp), 4, '#fff', C.price, 1.6);
      const ml = `maximum power ${Math.round(M.Pmp)} W`, mlw = measure(ctx, ml, 11.5, 650), mx = sx(M.Vmp);
      text(ctx, ml, mx + 8 + mlw < box.r ? mx + 8 : mx - 8, sp(M.Pmp) - 9, { size: 11.5, weight: 650, color: darken(C.price, 0.1), align: mx + 8 + mlw < box.r ? 'left' : 'right', halo: true });
      // operating point
      line(ctx, x, y, x, box.b, alpha(C.ink, 0.4), 1, [2, 3]);
      circle(ctx, x, y, 7, '#fff', C.ink, 2.4);
      if (box.b - sy(Iop) > 26) text(ctx, `${(st.V * Iop).toFixed(0)} W`, (box.l + x) / 2, box.b - 10, { size: 12, weight: 700, color: darken(C.solar, 0.45), align: 'center' });
      text(ctx, 'Isc', sx(0) + 6, sy(M.Isc) - 6, { size: 10.5, color: C.ink3 });
      text(ctx, 'Voc', sx(M.Voc), box.b - 6, { size: 10.5, color: C.ink3, align: 'center' });
      text(ctx, narrow ? 'dashed: 1000 W/m², 25 °C' : 'grey dashed: standard test conditions (1000 W/m², 25 °C)', box.r - 2, box.t + 4, { size: 10.5, color: C.ink3, align: 'right' });
    },
  });
  fig.interact({ hit: (x, y) => geo && x > geo.box.l - 8 && x < geo.box.r + 8 && y > geo.box.t - 8 && y < geo.box.b + 8 ? 'v' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { st.tracking = false; st.V = clamp(geo.sx.inv(x), 0, M.Voc); upd(); };
  const ctl = controls(el); const ro = readout(el);
  slider(ctl, { label: 'Sunlight on the module', min: 50, max: 1200, step: 10, value: 1000, color: C.solar, fmt: v => v + ' W/m²', oninput: v => { st.G = v; recompute(); }, name: 'G' });
  slider(ctl, { label: 'Cell temperature', min: -10, max: 80, step: 1, value: 25, color: C.hot, fmt: v => v + ' °C', oninput: v => { st.T = v; recompute(); }, name: 'T' });
  const btn = button(ctl, 'Find the maximum power point', () => { st.tracking = true; st.dir = st.V < M.Vmp ? 1 : -1; st.rev = 0; fig.invalidate(); if (!isPlaying()) { st.V = M.Vmp; st.tracking = false; upd(); } }, { kind: 'primary', name: 'mppt' });
  const recompute = () => { M = moduleModel(st.G, st.T); st.V = Math.min(st.V, M.Voc); upd(); };
  function upd(inv = true) {
    const I = Math.max(0, M.I(st.V)), P = st.V * I;
    ro.innerHTML = `At <b>${st.V.toFixed(1)} V</b> the module delivers <b>${I.toFixed(1)} A</b>, so <b>${P.toFixed(0)} W</b> — ${M.Pmp > 0 ? Math.round(P / M.Pmp * 100) : 0}% of what it could. The best point is ${M.Vmp.toFixed(1)} V × ${M.Imp.toFixed(1)} A = <b>${M.Pmp.toFixed(0)} W</b>, an efficiency of <b>${(M.Pmp / (st.G * AREA) * 100).toFixed(1)}%</b> on ${st.G} W/m².`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- shading ---------------- */
export function shading(el) {
  const COLS = 6, ROWS = 12, N = 72;
  const st = { shade: new Array(N).fill(0), bypass: true, paint: 1 };
  const PRESETS = {
    none: () => [],
    leaf: () => [5 * COLS + 2],
    row: () => Array.from({ length: COLS }, (_, c) => 11 * COLS + c),
    chimney: () => { const a = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) a.push(r * COLS + c); return a; },
    column: () => Array.from({ length: ROWS }, (_, r) => r * COLS + 4),
  };
  const sub = i => Math.floor((i % COLS) / 2);          // three substrings of 24 cells, each with a bypass diode
  const IscC = 14, VocC = 0.72, nVt = 1.15 * 0.025693, I0c = IscC / (Math.exp(VocC / nVt) - 1), RsC = 0.003;
  const cellV = (Iph, I) => I < Iph ? nVt * Math.log((Iph - I) / I0c + 1) - I * RsC : -Math.min(16, (I - Iph) * 4);
  function curve(shadeArr, bypass) {
    const Iph = shadeArr.map(s => IscC * (1 - 0.8 * s));
    const pts = [];
    const Is = [];
    for (let k = 0; k < 400; k++) Is.push(IscC * k / 400);
    for (let x = 2.4; x <= 12; x += 0.08) Is.push(IscC * (1 - Math.pow(10, -x)));   // dense near Isc, where V falls steeply
    Is.push(IscC); Is.sort((a, b) => a - b);
    for (const I of Is) {
      let V = 0, worst = 0;
      for (let s = 0; s < 3; s++) {
        let vs = 0, w = 0;
        for (let i = 0; i < N; i++) if (sub(i) === s) { const v = cellV(Iph[i], I); vs += v; if (v < 0) w = Math.max(w, -v * I); }
        if (bypass && vs < -0.6) { vs = -0.6; w = 0; }
        V += vs; worst = Math.max(worst, w);
      }
      if (V < 0) break;
      pts.push({ V, I, P: V * I, hot: worst });
    }
    return pts.reverse();
  }
  let cur = [], ref = curve(new Array(N).fill(0), true), geo = null, hover = -1;
  const peaks = pts => { const out = []; for (let i = 1; i < pts.length - 1; i++) if (pts[i].P >= pts[i - 1].P && pts[i].P > pts[i + 1].P && pts[i].P > 8) out.push(pts[i]); return out; };
  const fig = new Fig(el, {
    label: 'A 72-cell solar module with three bypass diodes: shade cells by clicking or dragging and watch how the power–voltage curve of the module changes',
    height: w => w < 600 ? 640 : 380,
    draw(ctx, w, h) {
      const narrow = w < 600;
      // module drawing
      const mh = narrow ? 270 : h - 60, cw = Math.min(narrow ? (w - 120) / COLS : 30, (mh - 10) / ROWS * 0.62), chh = cw / 0.62 * 0.5;
      const cellW = cw, cellH = Math.min(chh * 1.25, (mh - 10) / ROWS);
      const mw = COLS * cellW + 10, mx = narrow ? (w - mw) / 2 : 30, my = 30;
      geo = { mx, my, cellW, cellH };
      text(ctx, 'click or drag to shade cells', mx, my - 12, { size: 11, color: C.ink3 });
      rrect(ctx, mx, my, mw, ROWS * cellH + 10, 4); ctx.fillStyle = '#d8dde6'; ctx.fill();
      for (let i = 0; i < N; i++) {
        const r = Math.floor(i / COLS), c = i % COLS, x = mx + 5 + c * cellW, y = my + 5 + r * cellH;
        ctx.fillStyle = st.shade[i] ? '#2c3240' : mix('#2d4e86', '#3b66a8', (c % 2) * 0.3);
        ctx.fillRect(x + 0.8, y + 0.8, cellW - 1.6, cellH - 1.6);
        if (st.shade[i]) { ctx.fillStyle = alpha('#000', 0.25); ctx.fillRect(x + 0.8, y + 0.8, cellW - 1.6, cellH - 1.6); }
        if (i === hover) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2); }
      }
      // substring brackets and diodes
      for (let s = 0; s < 3; s++) {
        const x0 = mx + 5 + s * 2 * cellW, x1 = x0 + 2 * cellW, yb = my + ROWS * cellH + 16;
        line(ctx, x0 + 2, yb, x1 - 2, yb, C.ink3, 1);
        const sh = st.shade.some((v, i) => v && sub(i) === s);
        const on = st.bypass && sh && opBypass[s];
        text(ctx, st.bypass ? (on ? 'on' : (narrow ? 'idle' : 'diode')) : '—', (x0 + x1) / 2, yb + 13, { size: narrow ? 8.5 : 10, color: on ? C.peaker : C.ink3, align: 'center', weight: on ? 650 : 450 });
      }
      // P–V chart
      const box = narrow ? { l: 44, r: w - 14, t: my + ROWS * cellH + 70, b: h - 34 } : { l: mx + mw + 70, r: w - 18, t: 34, b: h - 40 };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 55, y0: 0, y1: 650, yticks: [0, 200, 400, 600], xticks: [0, 10, 20, 30, 40, 50], xfmt: v => v + ' V', yfmt: v => v + ' W', ylabel: 'module power vs voltage', xlabel: narrow ? '' : 'voltage' });
      pathLine(ctx, ref.map(p => [sx(p.V), sy(p.P)]), alpha(C.ink3, 0.6), 1.3, [3, 3]);
      pathLine(ctx, cur.map(p => [sx(p.V), sy(p.P)]), darken(C.solar, 0.2), 2.6);
      const pk = peaks(cur); const best = cur.reduce((a, b) => b.P > a.P ? b : a, cur[0] || { V: 0, P: 0 });
      pk.forEach(p => { if (p !== best) { circle(ctx, sx(p.V), sy(p.P), 4.5, '#fff', C.ink2, 1.5); text(ctx, 'local peak', sx(p.V), sy(p.P) - 10, { size: 10.5, color: C.ink2, align: 'center', halo: true }); } });
      if (best) { circle(ctx, sx(best.V), sy(best.P), 5.5, C.ink, '#fff', 1.5); const bl = `best ${Math.round(best.P)} W`; const bw = measure(ctx, bl, 11.5, 650); text(ctx, bl, sx(best.V) + 10 + bw < box.r ? sx(best.V) + 10 : sx(best.V) - 10, sy(best.P) - 10, { size: 11.5, weight: 650, color: C.ink, align: sx(best.V) + 10 + bw < box.r ? 'left' : 'right', halo: true }); }
      text(ctx, 'dashed: unshaded', box.r, box.t + 4, { size: 10.5, color: C.ink3, align: 'right' });
    },
  });
  let opBypass = [false, false, false];
  const cellAt = (x, y) => { if (!geo) return -1; const c = Math.floor((x - geo.mx - 5) / geo.cellW), r = Math.floor((y - geo.my - 5) / geo.cellH); return c >= 0 && c < COLS && r >= 0 && r < ROWS ? r * COLS + c : -1; };
  fig.interact({
    hit: (x, y) => cellAt(x, y) >= 0 ? 'cell' : null, cursor: 'pointer',
    down: (o, x, y) => { const i = cellAt(x, y); if (i < 0) return; st.paint = st.shade[i] ? 0 : 1; st.shade[i] = st.paint; seg.set(null); upd(); },
    move: (o, x, y) => { const i = cellAt(x, y); if (i >= 0 && st.shade[i] !== st.paint) { st.shade[i] = st.paint; upd(); } },
    hover: (o, x, y) => { hover = cellAt(x, y); },
  });
  const ctl = controls(el); const ro = readout(el);
  const seg = segmented(ctl, { label: 'Shade', options: [{ label: 'None', value: 'none', name: 'sh-none' }, { label: 'A leaf on one cell', value: 'leaf', name: 'sh-leaf' }, { label: 'Dirt on the bottom row', value: 'row', name: 'sh-row' }, { label: 'Chimney shadow', value: 'chimney', name: 'sh-chimney' }, { label: 'One column', value: 'column', name: 'sh-column' }], value: 'leaf', onchange: v => { st.shade.fill(0); PRESETS[v]().forEach(i => st.shade[i] = 1); upd(); } });
  segmented(ctl, { label: 'Bypass diodes', options: [{ label: 'Fitted (three)', value: true, name: 'bp-on' }, { label: 'Removed', value: false, name: 'bp-off' }], value: true, onchange: v => { st.bypass = v; upd(); } });
  function upd() {
    cur = curve(st.shade, st.bypass);
    const best = cur.reduce((a, b) => b.P > a.P ? b : a, cur[0] || { P: 0, I: 0, V: 0, hot: 0 });
    // which bypass diodes conduct at the best point
    opBypass = [0, 1, 2].map(s => { let vs = 0; for (let i = 0; i < N; i++) if (sub(i) === s) vs += cellV(IscC * (1 - 0.8 * st.shade[i]), best.I); return vs < -0.6; });
    const ns = st.shade.filter(Boolean).length, refP = ref.reduce((a, b) => Math.max(a, b.P), 0);
    const pk = peaks(cur).length;
    ro.innerHTML = ns === 0 ? `Unshaded, the module makes <b>${Math.round(refP)} W</b> at its best point.` :
      `${ns} of 72 cells shaded (${(ns / 72 * 100).toFixed(0)}% of the area), but the best output falls to <b>${Math.round(best.P)} W</b>: <b>${Math.round((1 - best.P / refP) * 100)}%</b> lower.` + (pk > 1 ? ` The curve now has ${pk} peaks; a naive tracker can get stuck on the wrong one.` : '') + (!st.bypass && best.hot > 5 ? ` Without bypass diodes the shaded cell is driven into reverse and dissipates about <b>${Math.round(best.hot)} W</b> as heat in a few square centimetres — a hot spot.` : '');
    fig.invalidate();
  }
  PRESETS.leaf().forEach(i => st.shade[i] = 1);
  upd();
}
