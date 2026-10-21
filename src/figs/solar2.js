// Solar PV post, part 2: technology, industry, geometry, money.
//  cellTech      — cross-sections of PERC / TOPCon / SHJ / back-contact / tandem + efficiencies (ITRPV, records)
//  supplyChain   — China's share of each manufacturing stage 2022–24 (IEA PVPS) + polysilicon price points (Bernreuter)
//  sunPath       — clear-sky sun path and daily output by latitude, date and mounting (model)
//  yieldMap      — PVGIS specific yield of 1 kWp, fixed vs single-axis tracker, 28 places (real, modelled from satellite/reanalysis weather)
//  clipping      — PVGIS hourly output 2020 + inverter loading ratio (real weather, simple inverter model)
//  costStack     — DOE/NREL/LBNL Q1 2025 PV system cost benchmarks (real)
//  captureHistory— German solar capture price and rate 2015–2025, from SMARD hourly data (real)
import { Fig, isPlaying } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, measure, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, scale, tag } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, more } from '../lib/ui.js';
import { SOLAR } from '../lib/solardata.js';
import { currencyToggle, DEFAULT_CURRENCY, USD_PER_EUR, rateYear } from '../lib/currency.js';

const D2R = Math.PI / 180;

/* ---------------- cellTech ---------------- */
const TECH = {
  perc: { name: 'PERC', full: 'Passivated emitter and rear cell (p-type)', mod: 21.7, share: 'about 14% of production in 2025, falling fast',
    layers: [['silver fingers', '#c9ccd2', 0.05, 'front'], ['anti-reflection coating (SiNₓ)', '#3a5f9e', 0.05], ['n⁺ emitter', '#6f8fc9', 0.06], ['p-type silicon wafer', '#7a7f8c', 0.56], ['rear passivation (AlOₓ/SiNₓ), laser-opened', '#9aa7b8', 0.07], ['aluminium rear contact', '#b8bcc4', 0.12]] },
  topcon: { name: 'TOPCon', full: 'Tunnel-oxide passivated contact (n-type)', mod: 23.5, share: 'the workhorse, with about 30% of cell output in 2023 and about 70% in 2024',
    layers: [['silver fingers', '#c9ccd2', 0.05, 'front'], ['anti-reflection coating', '#3a5f9e', 0.05], ['p⁺ boron emitter', '#c98f6f', 0.06], ['n-type silicon wafer', '#6d7480', 0.52], ['tunnel oxide (~1.5 nm)', '#e5d27a', 0.03], ['n⁺ polysilicon', '#8f98c7', 0.08], ['rear coating + silver fingers (bifacial)', '#c9ccd2', 0.08, 'rear']] },
  shj: { name: 'Heterojunction', full: 'Silicon heterojunction (SHJ, n-type)', mod: 23.5, share: 'about 8% of production in 2024',
    layers: [['silver fingers', '#c9ccd2', 0.05, 'front'], ['transparent conductive oxide', '#9fc3d9', 0.05], ['doped + intrinsic amorphous Si', '#b38e5d', 0.06], ['n-type silicon wafer', '#6d7480', 0.52], ['intrinsic + doped amorphous Si', '#8f98c7', 0.06], ['transparent conductive oxide', '#9fc3d9', 0.05], ['silver fingers (bifacial)', '#c9ccd2', 0.05, 'rear']] },
  bc: { name: 'Back contact', full: 'Back-contact cells (TBC / HBC): all metal on the rear', mod: 24.1, rec: 28.29, share: 'about 6% expected in 2025; holds the silicon record',
    layers: [['anti-reflection coating, no metal on the front', '#3a5f9e', 0.06], ['front passivation', '#5d79b0', 0.04], ['n-type silicon wafer', '#6d7480', 0.6], ['interleaved p⁺ and n⁺ contacts', 'stripes', 0.1], ['rear metal fingers (both polarities)', '#c9ccd2', 0.1, 'rear']] },
  tandem: { name: 'Perovskite–silicon tandem', full: 'Perovskite top cell on a silicon bottom cell', rec: 35.5, recNote: 'announced by LONGi, 2026', share: 'pilot lines; mass production expected after 2027',
    layers: [['transparent electrode', '#9fc3d9', 0.04, 'front'], ['perovskite top cell (~1.68 eV): absorbs blue/green', '#5b3d6b', 0.12], ['recombination layer', '#e5d27a', 0.03], ['silicon bottom cell (1.12 eV): absorbs red/infrared', '#6d7480', 0.55], ['rear contact', '#b8bcc4', 0.1]] },
};
export function cellTech(el) {
  const st = { t: 'topcon' };
  const fig = new Fig(el, {
    label: 'Cross-sections of the main crystalline-silicon cell technologies and their efficiencies: mass-production modules, record cells and theoretical limits',
    height: w => w < 600 ? 650 : 380,
    draw(ctx, w, h) {
      const narrow = w < 600, T = TECH[st.t];
      // cross-section
      const sx0 = narrow ? 16 : 20, sw = narrow ? Math.min(150, w * 0.4) : 200, sy0 = 46, sh = narrow ? 250 : h - 80;
      text(ctx, T.full, sx0, 22, { size: 12.5, weight: 650, color: C.ink });
      // sunlight arrows
      for (let k = 0; k < 4; k++) arrow(ctx, sx0 + 30 + k * (sw - 60) / 3, sy0 - 14, sx0 + 30 + k * (sw - 60) / 3, sy0 + 2, C.solar, 1.6, 6);
      let y = sy0 + 6; const totalH = sh - 10;
      const labels = [];
      T.layers.forEach(([lab, col, frac, kind]) => {
        const lh = frac * totalH;
        if (col === 'stripes') { for (let k = 0; k < 8; k++) { ctx.fillStyle = k % 2 ? '#c98f6f' : '#8f98c7'; ctx.fillRect(sx0 + k * sw / 8, y, sw / 8, lh); } }
        else if (kind === 'front' && /finger/.test(lab)) { for (let k = 0; k < 5; k++) { ctx.fillStyle = col; ctx.fillRect(sx0 + 12 + k * (sw - 30) / 4, y, 6, lh); } }
        else if (kind === 'rear' && /finger/.test(lab)) { ctx.fillStyle = alpha('#9aa7b8', 0.6); ctx.fillRect(sx0, y, sw, lh * 0.4); for (let k = 0; k < 7; k++) { ctx.fillStyle = col; ctx.fillRect(sx0 + 8 + k * (sw - 22) / 6, y + lh * 0.4, 6, lh * 0.6); } }
        else { ctx.fillStyle = col; ctx.fillRect(sx0, y, sw, lh); }
        labels.push([lab, y + lh / 2]);
        y += lh;
      });
      ctx.strokeStyle = C.grid2; ctx.strokeRect(sx0 + .5, sy0 + 6.5, sw - 1, totalH);
      // layer labels with leader lines, de-collided
      const lx = sx0 + sw + 14; let last = -1e9;
      const lw = narrow ? w - lx - 6 : Math.min(240, w * 0.3);
      labels.forEach(([lab, yy]) => { let ty = Math.max(yy + 4, last + 14); last = ty; line(ctx, sx0 + sw + 2, yy, lx - 3, ty - 4, alpha(C.ink3, 0.6), 1); text(ctx, lab, lx, ty, { size: narrow ? 10 : 10.5, color: C.ink2 }); });
      // efficiency chart
      const box = narrow ? { l: 16, r: w - 16, t: sy0 + sh + 52, b: h - 66 } : { l: lx + lw + 30, r: w - 20, t: 58, b: h - 40 };
      text(ctx, 'efficiency (%)', box.l, box.t - (narrow ? 18 : 30), { size: 11, color: C.ink3, weight: 500 });
      const keys = Object.keys(TECH), rowH = (box.b - box.t) / keys.length, ex = scale(18, 45, box.l + (narrow ? 96 : 110), box.r - 6);
      for (const v of [20, 25, 30, 35, 40, 45]) { line(ctx, ex(v), box.t - 4, ex(v), box.b, C.grid, 1); text(ctx, v + '', ex(v), box.b + 14, { size: 10.5, color: C.ink3, align: 'center' }); }
      // limits
      const lim = [[29.4, 'silicon limit 29.4%'], [33.7, 'single-junction limit 33.7%'], [43, 'tandem limit ~43%']];
      lim.forEach(([v, s], i) => { line(ctx, ex(v), box.t - 4, ex(v), box.b, alpha(C.peaker, 0.55), 1.2, [3, 3]); });
      keys.forEach((k, i) => {
        const T2 = TECH[k], yy = box.t + rowH * (i + 0.5), sel = k === st.t;
        if (sel) { ctx.fillStyle = alpha(C.solar, 0.12); ctx.fillRect(box.l, yy - rowH / 2 + 2, box.r - box.l, rowH - 4); }
        text(ctx, T2.name.replace('Perovskite–silicon tandem', narrow ? 'Tandem' : 'Pero–Si tandem'), box.l + 4, yy + 4, { size: 11.5, weight: sel ? 700 : 550, color: C.ink });
        if (T2.mod) { circle(ctx, ex(T2.mod), yy, 5.5, C.ink, '#fff', 1.5); }
        if (T2.rec) { ctx.save(); ctx.translate(ex(T2.rec), yy); ctx.rotate(Math.PI / 4); ctx.fillStyle = C.solar; ctx.fillRect(-5, -5, 10, 10); ctx.restore(); }
      });
      // legend + limit labels
      const ly = box.b + 30;
      circle(ctx, box.l + 6, ly - 4, 5, C.ink, '#fff', 1.5); text(ctx, 'mass-production module, 2025', box.l + 16, ly, { size: 10.5, color: C.ink2 });
      const l2 = box.l + 16 + measure(ctx, 'mass-production module, 2025', 10.5) + 18;
      { ctx.save(); ctx.translate(l2, ly - 4); ctx.rotate(Math.PI / 4); ctx.fillStyle = C.solar; ctx.fillRect(-4.5, -4.5, 9, 9); ctx.restore(); text(ctx, 'record cell', l2 + 10, ly, { size: 10.5, color: C.ink2 }); }
      if (!narrow) lim.forEach(([v, s], i) => text(ctx, s, i === 2 ? ex(v) - 3 : ex(v) + 3, box.t - 2 - (2 - i) * 11, { size: 9.5, color: alpha(C.peaker, 0.9), align: i === 2 ? 'right' : 'left', halo: true }));
      else text(ctx, 'dashed limits: Si 29.4%, one junction 33.7%, tandem ~43%', box.l, ly + 18, { size: 10, color: alpha(C.peaker, 0.9) });
    },
  });
  // stagger limit labels: drawn above chart in two lanes on desktop
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Cell technology', options: Object.entries(TECH).map(([k, t]) => ({ label: t.name, value: k, name: 'tech-' + k })), value: st.t, onchange: v => { st.t = v; upd(); } });
  const upd = () => { const T = TECH[st.t]; ro.innerHTML = `<b>${T.name}</b>: ${T.mod ? `mass-production modules about <b>${T.mod}%</b> efficient in 2025` : 'not yet in mass production'}${T.rec ? `; record cell <b>${T.rec}%</b>${T.recNote ? ` (${T.recNote})` : ''}` : ''}. Market: ${T.share}.`; fig.invalidate(); };
  upd();
}

/* ---------------- supplyChain ---------------- */
const CHAIN = [
  { k: 'Polysilicon', out: '≈1.96 million tonnes', share: { 2022: 86, 2023: 92, 2024: 94 } },
  { k: 'Wafers', out: '804 GW', share: { 2022: 97.5, 2023: 98.1, 2024: 96.5 } },
  { k: 'Cells', out: '753 GW', share: { 2022: 84, 2023: 92, 2024: 90 } },
  { k: 'Modules', out: '726 GW', share: { 2022: 77.8, 2023: 84.6, 2024: 86 } },
];
const POLY = [[2008.2, 460, 'Mar 2008 peak'], [2012.95, 15.9, 'Dec 2012'], [2020.45, 6.75, 'Jun 2020 low'], [2022.6, 39, 'Aug 2022'], [2026.7, 5.84, 'Sep 2026']];
export function supplyChain(el) {
  const st = { year: 2024, view: 'share' };
  const fig = new Fig(el, {
    label: 'China’s share of global production at each step of the solar supply chain, 2022 to 2024, and selected polysilicon spot prices since 2008',
    height: w => w < 600 ? 400 : 330,
    draw(ctx, w, h) {
      const narrow = w < 600;
      if (st.view === 'share') {
        const n = CHAIN.length, gap = narrow ? 8 : 18, l = 14, r = w - 14, cw = (r - l - gap * (n - 1)) / n, top = 50, bot = h - 70;
        text(ctx, `Share of world production made in China, ${st.year}`, l, 22, { size: 12, weight: 650, color: C.ink });
        CHAIN.forEach((c, i) => {
          const x = l + i * (cw + gap), s = c.share[st.year] / 100, H = bot - top;
          rrect(ctx, x, top, cw, H, 8); ctx.fillStyle = '#e9e5db'; ctx.fill();
          ctx.save(); rrect(ctx, x, top, cw, H, 8); ctx.clip(); ctx.fillStyle = '#c8473b'; ctx.fillRect(x, bot - H * s, cw, H * s); ctx.restore();
          text(ctx, (c.share[st.year] % 1 ? c.share[st.year].toFixed(1) : c.share[st.year]) + '%', x + cw / 2, bot - H * s + (narrow ? 22 : 30), { size: narrow ? 15 : 22, weight: 750, color: '#fff', align: 'center' });
          text(ctx, c.k, x + cw / 2, bot + 18, { size: narrow ? 11 : 12.5, weight: 650, color: C.ink, align: 'center' });
          if (st.year === 2024) text(ctx, c.out, x + cw / 2, bot + 34, { size: narrow ? 9.5 : 10.5, color: C.ink3, align: 'center' });
          if (i < n - 1) arrow(ctx, x + cw + 2, (top + bot) / 2, x + cw + gap - 2, (top + bot) / 2, C.ink3, 1.4, 6);
        });
        if (st.year === 2024) text(ctx, narrow ? 'world output, 2024' : 'world output in 2024 under each bar', w - 14, h - 10, { size: 10.5, color: C.ink3, align: 'right' });
      } else {
        const box = { l: narrow ? 46 : 56, r: w - 18, t: 40, b: h - 40 };
        const sy = v => box.b - (Math.log10(v) - Math.log10(3)) / (Math.log10(800) - Math.log10(3)) * (box.b - box.t), sx = scale(2006, 2027, box.l, box.r);
        for (const v of [3, 10, 30, 100, 300]) { line(ctx, box.l, sy(v), box.r, sy(v), C.grid, 1); text(ctx, '$' + v, box.l - 6, sy(v) + 4, { size: 11, color: C.ink3, align: 'right' }); }
        for (const y of [2008, 2012, 2016, 2020, 2024]) text(ctx, y + '', sx(y), box.b + 16, { size: 11, color: C.ink3, align: 'center' });
        text(ctx, 'polysilicon spot price, US$ per kg (log scale) — selected points', box.l - 4, 22, { size: 11, color: C.ink3, weight: 500 });
        pathLine(ctx, POLY.map(([x, v]) => [sx(x), sy(v)]), alpha(C.ink3, 0.6), 1.2, [3, 4]);
        POLY.forEach(([x, v, s], i) => { circle(ctx, sx(x), sy(v), 5, '#c8473b', '#fff', 1.5); const lab = `${s}: $${v}`; text(ctx, lab, sx(x) + (i === POLY.length - 1 ? -8 : 8), sy(v) + (i === 1 || i === 4 ? 16 : -9), { size: 11, weight: 600, color: C.ink, align: i === POLY.length - 1 ? 'right' : 'left', halo: true }); });
      }
    },
  });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'View', options: [{ label: 'China’s share', value: 'share', name: 'v-share' }, { label: 'Polysilicon price', value: 'price', name: 'v-price' }], value: 'share', onchange: v => { st.view = v; yWrap.style.display = v === 'share' ? '' : 'none'; upd(); } });
  const yseg = segmented(more(ctl, 'More: earlier years'), { label: 'Year', options: [2022, 2023, 2024].map(y => ({ label: String(y), value: y, name: 'y' + y })), value: 2024, onchange: v => { st.year = v; upd(); } });
  const yWrap = ctl.lastElementChild;
  const upd = () => { ro.innerHTML = st.view === 'share' ? `In ${st.year}, China made <b>${CHAIN[0].share[st.year]}%</b> of the world’s polysilicon, <b>${CHAIN[1].share[st.year]}%</b> of its wafers, <b>${CHAIN[2].share[st.year]}%</b> of its cells and <b>${CHAIN[3].share[st.year]}%</b> of its modules.` : 'Polysilicon swings between shortage and glut: from $460/kg in 2008 to under $7 in 2020, back to $39 in 2022, and below $6 in 2026, when Chinese makers were cutting output to stop the slide.'; fig.invalidate(); };
  upd();
}

/* ---------------- sun geometry (clear-sky model) ---------------- */
function sunPos(lat, doy, hour) {
  const dec = 23.44 * Math.sin(2 * Math.PI * (284 + doy) / 365) * D2R;
  const ha = (hour - 12) * 15 * D2R, la = lat * D2R;
  const sinEl = Math.sin(la) * Math.sin(dec) + Math.cos(la) * Math.cos(dec) * Math.cos(ha);
  const el = Math.asin(clamp(sinEl, -1, 1));
  // azimuth measured from north, clockwise
  let az = Math.atan2(-Math.sin(ha) * Math.cos(dec), Math.cos(la) * Math.sin(dec) - Math.sin(la) * Math.cos(dec) * Math.cos(ha));
  if (az < 0) az += 2 * Math.PI;
  return { el, az, dec };
}
function clearSky(el, doy) {
  if (el <= 0) return { dni: 0, dhi: 0 };
  const zen = 90 - el / D2R, am = 1 / (Math.cos(zen * D2R) + 0.50572 * Math.pow(96.07995 - zen, -1.6364));
  const e0 = 1361 * (1 + 0.033 * Math.cos(2 * Math.PI * doy / 365));
  const dni = e0 * Math.pow(0.7, Math.pow(am, 0.678));
  return { dni, dhi: 0.1 * dni };
}
// plane-of-array irradiance for a mounting
function poa(mode, lat, tilt, sp, doy) {
  const { dni, dhi } = clearSky(sp.el, doy);
  if (dni <= 0) return 0;
  const sx = Math.cos(sp.el) * Math.sin(sp.az), sy = Math.cos(sp.el) * Math.cos(sp.az), sz = Math.sin(sp.el); // east, north, up
  let nx = 0, ny = 0, nz = 1, beta = 0;
  if (mode === 'fixed') { beta = tilt * D2R; const face = lat >= 0 ? -1 : 1; nx = 0; ny = face * Math.sin(beta); nz = Math.cos(beta); }
  else if (mode === 'track1') { let rot = Math.atan2(sx, sz); rot = clamp(rot, -60 * D2R, 60 * D2R); nx = Math.sin(rot); ny = 0; nz = Math.cos(rot); beta = Math.abs(rot); }
  else if (mode === 'track2') { nx = sx; ny = sy; nz = sz; beta = Math.PI / 2 - sp.el; }
  const cos = Math.max(0, nx * sx + ny * sy + nz * sz);
  return dni * cos + dhi * (1 + Math.cos(beta)) / 2;
}
const MODES = { flat: 'Flat on the ground', fixed: 'Fixed, tilted towards the equator', track1: 'Single-axis tracker', track2: 'Two-axis tracker' };
const MODECOL = { flat: '#9a948a', fixed: '#e3a922', track1: '#d9573b', track2: '#8e62b5' };
const MLAB = { flat: 'flat', fixed: 'fixed tilt', track1: 'one-axis tracker', track2: 'two-axis tracker' };
export function sunPath(el) {
  const st = { lat: 52.5, doy: 172, tilt: 40, mode: 'fixed', hour: 11, auto: true }; let geo = null;
  const fig = new Fig(el, {
    label: 'The sun’s path across the sky for a chosen latitude and date, and the resulting clear-sky output of a solar panel through the day for four ways of mounting it',
    height: w => w < 600 ? 560 : 420,
    animated: true,
    step(dt) { if (!st.auto) return; const s = sunPos(st.lat, st.doy, 0); st.hour += dt * 1.6; const day = dayRange(); if (st.hour > day[1] + 0.5 || st.hour < day[0] - 0.5) st.hour = day[0] - 0.4; },
    draw(ctx, w, h) {
      const narrow = w < 600;
      // sky chart: azimuth relative to the equator-facing direction, -150..150 deg; elevation 0..90
      const A = narrow ? { l: 34, r: w - 12, t: 30, b: 230 } : { l: 40, r: w * 0.48, t: 30, b: h - 40 };
      const eqAz = st.lat >= 0 ? 180 : 0;
      const ax = az => { let d = az / D2R - eqAz; while (d > 180) d -= 360; while (d < -180) d += 360; return A.l + (d + 150) / 300 * (A.r - A.l); };
      const ay = e => A.b - e / D2R / 90 * (A.b - A.t);
      ctx.fillStyle = alpha('#9fc3d9', 0.18); ctx.fillRect(A.l, A.t, A.r - A.l, A.b - A.t);
      for (const e of [30, 60]) { line(ctx, A.l, ay(e * D2R), A.r, ay(e * D2R), alpha('#7aa0bd', 0.35), 1); text(ctx, e + '°', A.l - 4, ay(e * D2R) + 4, { size: 10.5, color: C.ink3, align: 'right' }); }
      line(ctx, A.l, A.b, A.r, A.b, C.ink2, 1.5);
      const dirs = st.lat >= 0 ? [['E', -90], ['S', 0], ['W', 90]] : [['E', 90], ['N', 0], ['W', -90]];
      dirs.forEach(([d, a]) => text(ctx, d, A.l + (a + 150) / 300 * (A.r - A.l), A.b + 15, { size: 11, weight: 650, color: C.ink2, align: 'center' }));
      text(ctx, 'the sky, looking towards the equator', A.l, A.t - 10, { size: 11, color: C.ink3, weight: 500 });
      const arc = (doy, col, wdt, dash) => { const pts = []; for (let hh = 0; hh <= 24; hh += 0.1) { const s = sunPos(st.lat, doy, hh); if (s.el > 0) { let d = s.az / D2R - eqAz; while (d > 180) d -= 360; while (d < -180) d += 360; if (Math.abs(d) <= 150) pts.push([ax(s.az), ay(s.el)]); else if (pts.length) { pathLine(ctx, pts.splice(0), col, wdt, dash); } } } pathLine(ctx, pts, col, wdt, dash); };
      arc(172, alpha(C.ink3, 0.5), 1, [3, 3]); arc(355, alpha(C.ink3, 0.5), 1, [3, 3]); arc(80, alpha(C.ink3, 0.35), 1, [1, 3]);
      arc(st.doy, C.solar, 2.4);
      const sp = sunPos(st.lat, st.doy, st.hour);
      if (sp.el > 0) { circle(ctx, ax(sp.az), ay(sp.el), 10, alpha(C.solar, 0.3), null); circle(ctx, ax(sp.az), ay(sp.el), 6, C.solar, '#fff', 1.5); }
      text(ctx, 'June', ax(sunPos(st.lat, 172, 12).az) + 4, ay(sunPos(st.lat, 172, 12).el) - 6, { size: 10, color: C.ink3, halo: true }); text(ctx, 'December', ax(sunPos(st.lat, 355, 12).az) + 4, ay(Math.max(0.02, sunPos(st.lat, 355, 12).el)) - 6, { size: 10, color: C.ink3, halo: true });
      // power through the day
      const B = narrow ? { l: 46, r: w - 14, t: 290, b: h - 34 } : { l: w * 0.56, r: w - 16, t: 30, b: h - 40 };
      const { sx, sy } = axes(ctx, { box: B, x0: 0, x1: 24, y0: 0, y1: 1000, yticks: [0, 250, 500, 750, 1000], xticks: [0, 6, 12, 18, 24], xfmt: v => v + ':00', yfmt: v => v + ' W', ylabel: 'clear-sky output of 1 kWp (solar time)' });
      geo = { B, sx };
      const tot = {};
      for (const m of Object.keys(MODES)) {
        const pts = []; let e = 0;
        for (let hh = 0; hh <= 24; hh += 0.1) { const s = sunPos(st.lat, st.doy, hh); const p = s.el > 0 ? poa(m, st.lat, m === 'flat' ? 0 : st.tilt, s, st.doy) * 0.86 : 0; pts.push([sx(hh), sy(p)]); e += p * 0.1 / 1000; }
        tot[m] = e;
        pathLine(ctx, pts, m === st.mode ? MODECOL[m] : alpha(MODECOL[m], 0.35), m === st.mode ? 2.6 : 1.3);
      }
      // legend: name the four curves
      Object.keys(MODES).forEach((m, i) => { const yy = B.t + 11 + i * (narrow ? 13 : 15), sel = m === st.mode; line(ctx, B.l + 6, yy - 4, B.l + 20, yy - 4, sel ? MODECOL[m] : alpha(MODECOL[m], 0.6), sel ? 2.6 : 1.6); text(ctx, MLAB[m], B.l + 25, yy, { size: 10.5, color: sel ? C.ink : C.ink2, weight: sel ? 650 : 450, halo: true }); });
      line(ctx, sx(st.hour), B.t, sx(st.hour), B.b, alpha(C.ink, 0.35), 1, [2, 3]);
      const p = sp.el > 0 ? poa(st.mode, st.lat, st.mode === 'flat' ? 0 : st.tilt, sp, st.doy) * 0.86 : 0;
      circle(ctx, sx(st.hour), sy(p), 5, MODECOL[st.mode], '#fff', 1.5);
      st.tot = tot;
    },
  });
  function dayRange() { let a = 12, b = 12; for (let hh = 0; hh <= 24; hh += 0.05) { if (sunPos(st.lat, st.doy, hh).el > 0) { a = Math.min(a, hh); b = Math.max(b, hh); } } return [a, b]; }
  fig.interact({ hit: (x, y) => geo && x > geo.B.l && x < geo.B.r && y > geo.B.t && y < geo.B.b ? 't' : null, cursor: 'ew-resize', down: (o, x) => { st.auto = false; st.hour = clamp(geo.sx.inv(x), 0, 24); }, move: (o, x) => { st.hour = clamp(geo.sx.inv(x), 0, 24); }, up: () => { st.auto = true; } });
  const ctl = controls(el); const ro = readout(el);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateOf = d => { const t = new Date(Date.UTC(2025, 0, 1) + (d - 1) * 864e5); return t.getUTCDate() + ' ' + MONTHS[t.getUTCMonth()]; };
  segmented(ctl, { label: 'Mounting', options: Object.entries(MODES).map(([k, v]) => ({ label: v.replace('Fixed, tilted towards the equator', 'Fixed tilt'), value: k, name: 'm-' + k })), value: st.mode, onchange: v => { st.mode = v; upd(); } });
  slider(ctl, { label: 'Latitude', min: -60, max: 70, step: 0.5, value: st.lat, color: C.ink, fmt: v => Math.abs(v).toFixed(1) + '°' + (v >= 0 ? 'N' : 'S'), oninput: v => { st.lat = v; upd(); }, name: 'lat' });
  slider(ctl, { label: 'Date', min: 1, max: 365, step: 1, value: st.doy, color: C.solar, fmt: dateOf, oninput: v => { st.doy = v; upd(); }, name: 'doy' });
  slider(more(ctl, 'More: panel tilt'), { label: 'Tilt of the fixed panel', min: 0, max: 90, step: 1, value: st.tilt, color: MODECOL.fixed, fmt: v => v + '°', oninput: v => { st.tilt = v; upd(); }, name: 'tilt' });
  function upd() {
    fig.render();
    const t = st.tot || {}, d = dayRange();
    ro.innerHTML = `On ${dateOf(st.doy)} at ${Math.abs(st.lat).toFixed(1)}°${st.lat >= 0 ? 'N' : 'S'} the sun is up for <b>${(d[1] - d[0]).toFixed(1)} hours</b>. On a cloudless day 1 kWp would make <b>${(t[st.mode] || 0).toFixed(1)} kWh</b> ${MODES[st.mode].toLowerCase()} (flat: ${(t.flat || 0).toFixed(1)}, fixed tilt: ${(t.fixed || 0).toFixed(1)}, one-axis tracker: ${(t.track1 || 0).toFixed(1)}, two-axis: ${(t.track2 || 0).toFixed(1)}).`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- yieldMap ---------------- */
export function yieldMap(el) {
  const CITIES = (SOLAR.cities || []).map(c => ({ name: c[0], lat: c[1], lon: c[2], fixed: c[3], track: c[4], tilt: c[5], fm: c[6], tm: c[7], db: c[8] }));
  const st = { sel: CITIES.findIndex(c => c.name === 'Jodhpur'), hover: -1, show: 'both' }; let geo = null;
  const fig = new Fig(el, {
    label: 'Annual output of one kilowatt of solar panels in 28 places around the world, against latitude, for fixed panels and single-axis trackers, with the monthly pattern for a chosen place',
    height: w => w < 600 ? 620 : 420,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = narrow ? { l: 48, r: w - 44, t: 34, b: 330 } : { l: 56, r: w * 0.62, t: 34, b: h - 42 };
      const { sx, sy } = axes(ctx, { box, x0: -40, x1: 72, y0: 400, y1: 3200, yticks: [500, 1000, 1500, 2000, 2500, 3000], xticks: [-30, 0, 30, 60], xfmt: v => v === 0 ? '0°' : Math.abs(v) + '°' + (v > 0 ? 'N' : 'S'), yfmt: v => v.toLocaleString('en-US'), ylabel: 'kWh per year from 1 kWp', xlabel: narrow ? '' : 'latitude' });
      for (const v of [500, 1000, 1500, 2000, 2500, 3000]) text(ctx, (v / 8760 * 100).toFixed(0) + '%', box.r + 6, sy(v) + 4, { size: 10.5, color: C.ink3 });
      text(ctx, 'capacity factor', box.r + 2, box.t - 10, { size: 10.5, color: C.ink3, align: narrow ? 'right' : 'left' });
      geo = { sx, sy, box };
      CITIES.forEach((c, i) => {
        const x = sx(c.lat), sel = i === st.sel || i === st.hover;
        if (st.show === 'both') line(ctx, x, sy(c.fixed), x, sy(c.track), alpha(C.ink3, sel ? 0.8 : 0.35), sel ? 1.5 : 1);
        if (st.show !== 'track') circle(ctx, x, sy(c.fixed), sel ? 6 : 4.2, sel ? C.solar : alpha(C.solar, 0.85), '#fff', 1.2);
        if (st.show !== 'fixed') { ctx.save(); ctx.translate(x, sy(c.track)); ctx.rotate(Math.PI / 4); const r = sel ? 5 : 3.6; ctx.fillStyle = sel ? '#d9573b' : alpha('#d9573b', 0.8); ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.restore(); }
      });
      const c = CITIES[st.hover >= 0 ? st.hover : st.sel];
      if (c) { const y = sy(st.show === 'track' ? c.track : Math.max(c.fixed, st.show === 'fixed' ? 0 : c.track)) - 12; const x = sx(c.lat); const lw = measure(ctx, c.name, 12, 700); text(ctx, c.name, clamp(x, box.l + lw / 2, box.r - lw / 2), Math.max(box.t + 10, y), { size: 12, weight: 700, color: C.ink, align: 'center', halo: true }); }
      // legend
      const lgx = box.l + 8, lgy = box.b - 12;
      circle(ctx, lgx, lgy - 4, 4.2, C.solar, '#fff', 1.2); text(ctx, 'fixed, best tilt', lgx + 9, lgy, { size: 10.5, color: C.ink2 });
      const l2 = lgx + 9 + measure(ctx, 'fixed, best tilt', 10.5) + 16;
      ctx.save(); ctx.translate(l2, lgy - 4); ctx.rotate(Math.PI / 4); ctx.fillStyle = '#d9573b'; ctx.fillRect(-3.6, -3.6, 7.2, 7.2); ctx.restore(); text(ctx, 'single-axis tracker', l2 + 9, lgy, { size: 10.5, color: C.ink2 });
      // monthly panel
      if (!c) return;
      const M = narrow ? { l: 44, r: w - 12, t: 392, b: h - 30 } : { l: w * 0.68 + 26, r: w - 14, t: 56, b: h - 42 };
      text(ctx, `${c.name}: kWh per month`, M.l - 4, M.t - 22, { size: 12, weight: 650, color: C.ink });
      const ymax = 300;
      const mx = axes(ctx, { box: M, x0: 0, x1: 12, y0: 0, y1: ymax, yticks: [0, 100, 200, 300], xticks: [], yfmt: v => v + '' });
      const bw = (M.r - M.l) / 12;
      for (let m = 0; m < 12; m++) {
        const x = M.l + m * bw;
        if (st.show !== 'track') { ctx.fillStyle = C.solar; ctx.fillRect(x + 2, mx.sy(c.fm[m]), bw / 2 - 2, M.b - mx.sy(c.fm[m])); }
        if (st.show !== 'fixed') { ctx.fillStyle = '#d9573b'; ctx.fillRect(x + bw / 2, mx.sy(c.tm[m]), bw / 2 - 2, M.b - mx.sy(c.tm[m])); }
        text(ctx, 'JFMAMJJASOND'[m], x + bw / 2, M.b + 14, { size: 10.5, color: C.ink3, align: 'center' });
      }
    },
  });
  const nearest = (x, y) => { if (!geo) return -1; let b = -1, bd = 1e9; CITIES.forEach((c, i) => { for (const v of [c.fixed, c.track]) { const d = Math.hypot(geo.sx(c.lat) - x, geo.sy(v) - y); if (d < bd) { bd = d; b = i; } } }); return bd < 16 ? b : -1; };
  fig.interact({ hit: (x, y) => nearest(x, y) >= 0 ? 'c' : null, cursor: 'pointer', down: (o, x, y) => { st.sel = nearest(x, y); sel.el.value = st.sel; upd(); }, hover: (o, x, y) => { st.hover = nearest(x, y); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'Both', value: 'both', name: 's-both' }, { label: 'Fixed tilt', value: 'fixed', name: 's-fixed' }, { label: 'Trackers', value: 'track', name: 's-track' }], value: 'both', onchange: v => { st.show = v; upd(); } });
  const sel = { el: document.createElement('select') };
  const wrap = document.createElement('label'); wrap.className = 'ctl selectctl'; wrap.innerHTML = '<span class="seg-label">Place</span>';
  CITIES.map((c, i) => [c, i]).sort((a, b) => b[0].lat - a[0].lat).forEach(([c, i]) => { const o = document.createElement('option'); o.value = i; o.textContent = `${c.name} (${Math.abs(c.lat).toFixed(0)}°${c.lat >= 0 ? 'N' : 'S'})`; sel.el.appendChild(o); });
  sel.el.value = st.sel; sel.el.addEventListener('change', () => { st.sel = +sel.el.value; upd(); }); wrap.appendChild(sel.el); ctl.appendChild(wrap);
  function upd() {
    const c = CITIES[st.sel]; if (!c) return;
    ro.innerHTML = `<b>${c.name}</b>: a fixed kilowatt at the best tilt (${Math.abs(c.tilt)}°) makes about <b>${Math.round(c.fixed).toLocaleString('en-US')} kWh</b> a year, a capacity factor of <b>${(c.fixed / 87.6).toFixed(1)}%</b>. On a single-axis tracker: <b>${Math.round(c.track).toLocaleString('en-US')} kWh</b> (${c.track >= c.fixed ? '+' : ''}${Math.round((c.track / c.fixed - 1) * 100)}%). December gives ${Math.round(c.fm[11])} kWh and June ${Math.round(c.fm[5])}.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- clipping ---------------- */
export function clipping(el) {
  const SITES = { Seville_track: 'Seville, single-axis tracker', Seville_fixed: 'Seville, fixed tilt', Berlin_fixed: 'Berlin, fixed tilt', Berlin_track: 'Berlin, single-axis tracker' };
  const st = { site: 'Seville_track', ilr: 1.34, week: 22 }; let geo = null, stats = null;
  const series = () => SOLAR.hourly[st.site] || [];
  function compute() {
    const P = series(), cap = 1000 / st.ilr; let dc = 0, ac = 0;
    for (const p of P) { dc += p; ac += Math.min(p, cap); }
    stats = { dc: dc / 1000, ac: ac / 1000, clip: (dc - ac) / dc, cfAC: ac / 1000 / (cap / 1000) / P.length, cfDC: dc / 1000 / P.length, perKWac: ac / cap };
  }
  const fig = new Fig(el, {
    label: 'A year of hourly solar output from real weather for one kilowatt of panels, with an inverter sized smaller than the panels; drag the week to inspect and change the inverter loading ratio to see how much energy is clipped',
    height: w => w < 600 ? 470 : 420,
    draw(ctx, w, h) {
      const narrow = w < 600, P = series(), cap = 1000 / st.ilr;
      // year strip: daily energy, clipped part in red
      const Y = { l: narrow ? 40 : 52, r: w - 14, t: 30, b: narrow ? 120 : 120 };
      text(ctx, 'every day of 2020, kWh from 1 kWp of panels', Y.l - 4, Y.t - 12, { size: 11, color: C.ink3, weight: 500 });
      const days = Math.floor(P.length / 24), dw = (Y.r - Y.l) / days, ys = scale(0, 10, Y.b, Y.t);
      for (const v of [0, 5, 10]) text(ctx, v + '', Y.l - 6, ys(v) + 4, { size: 10.5, color: C.ink3, align: 'right' });
      for (let d = 0; d < days; d++) {
        let e = 0, c = 0; for (let k = 0; k < 24; k++) { const p = P[d * 24 + k]; e += Math.min(p, cap); c += Math.max(0, p - cap); }
        ctx.fillStyle = C.solar; ctx.fillRect(Y.l + d * dw, ys(e / 1000), Math.max(1, dw - 0.3), Y.b - ys(e / 1000));
        if (c > 0) { ctx.fillStyle = C.peaker; ctx.fillRect(Y.l + d * dw, ys((e + c) / 1000), Math.max(1, dw - 0.3), ys(e / 1000) - ys((e + c) / 1000)); }
      }
      const wx = Y.l + st.week * 7 * dw;
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.strokeRect(wx, Y.t - 4, 7 * dw, Y.b - Y.t + 8);
      ['Jan', 'Apr', 'Jul', 'Oct'].forEach((m, i) => text(ctx, m, Y.l + [0, 91, 182, 274][i] * dw, Y.b + 14, { size: 10.5, color: C.ink3 }));
      // week zoom
      const B = { l: narrow ? 40 : 52, r: w - 14, t: Y.b + 52, b: h - 34 };
      const { sx, sy } = axes(ctx, { box: B, x0: 0, x1: 168, y0: 0, y1: 1000, yticks: [0, 250, 500, 750, 1000], xticks: [], yfmt: v => v + ' W', ylabel: 'hour by hour, the selected week' });
      geo = { Y, dw, days };
      const pts = [], acp = [];
      for (let k = 0; k <= 167; k++) { const p = P[st.week * 168 + k] || 0; pts.push([sx(k), sy(p)]); acp.push([sx(k), sy(Math.min(p, cap))]); }
      // clipped area
      ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); for (let i = acp.length - 1; i >= 0; i--) ctx.lineTo(acp[i][0], acp[i][1]); ctx.closePath(); ctx.fillStyle = alpha(C.peaker, 0.55); ctx.fill();
      ctx.beginPath(); acp.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.lineTo(sx(167), sy(0)); ctx.lineTo(sx(0), sy(0)); ctx.closePath(); ctx.fillStyle = alpha(C.solar, 0.75); ctx.fill();
      pathLine(ctx, pts, darken(C.solar, 0.3), 1.2);
      line(ctx, B.l, sy(cap), B.r, sy(cap), C.ink, 1.5, [5, 3]);
      text(ctx, `inverter limit ${Math.round(cap)} W`, B.r - 4, sy(cap) - 6, { size: 11, weight: 650, color: C.ink, align: 'right', halo: true });
      for (let d = 0; d < 7; d++) { const t = new Date(Date.UTC(2020, 0, 1) + (st.week * 7 + d) * 864e5); text(ctx, t.getUTCDate() + '/' + (t.getUTCMonth() + 1), sx(d * 24 + 12), B.b + 15, { size: 10.5, color: C.ink3, align: 'center' }); }
      // legend
      ctx.fillStyle = alpha(C.peaker, 0.55); ctx.fillRect(B.l + 6, B.t + 4, 10, 10); text(ctx, 'clipped (lost)', B.l + 20, B.t + 13, { size: 10.5, color: C.ink2, halo: true });
    },
  });
  fig.interact({ hit: (x, y) => geo && y < geo.Y.b + 8 && y > geo.Y.t - 8 ? 'w' : null, cursor: 'ew-resize', down: (o, x) => mv(x), move: (o, x) => mv(x) });
  const mv = x => { st.week = clamp(Math.floor((x - geo.Y.l) / geo.dw / 7 - 0.5), 0, Math.floor(geo.days / 7) - 1); fig.invalidate(); };
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Site and mounting', options: Object.entries(SITES).filter(([k]) => SOLAR.hourly[k]).map(([k, v]) => ({ label: v, value: k, name: 'site-' + k })), value: st.site, onchange: v => { st.site = v; upd(); } });
  slider(ctl, { label: 'Panels per unit of inverter <small>(DC/AC ratio)</small>', min: 1, max: 2, step: 0.01, value: st.ilr, color: C.peaker, fmt: v => v.toFixed(2), oninput: v => { st.ilr = v; upd(); }, name: 'ilr', wide: true });
  function upd() {
    compute();
    ro.innerHTML = `With ${st.ilr.toFixed(2)} kW of panels per kW of inverter, <b>${(stats.clip * 100).toFixed(1)}%</b> of the panels’ energy is clipped. Each kW of inverter now delivers <b>${Math.round(stats.perKWac).toLocaleString('en-US')} kWh</b> a year — an AC capacity factor of <b>${(stats.cfAC * 100).toFixed(1)}%</b> — against ${(stats.cfDC * 100).toFixed(1)}% for the panels themselves.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- costStack ---------------- */
const CATS = [['Module', '#3b66a8'], ['Inverter', '#e0773f'], ['Battery hardware', '#a49d90'], ['Structure (SBOS)', '#2c3e70'], ['Electrical (EBOS)', '#a8423a'], ['Installation labour', '#e3a922'], ['Office work: permits, sales, design', '#6fa8dc'], ['Developer costs, overhead, profit', '#6aa84f']];
const BENCH = {
  util: { name: 'Utility-scale', sub: '100 MWdc, tracker, + 240 MWh battery', MSP: [272, 32, 397, 153, 206, 385, 70, 198], MMP: [291, 32, 437, 155, 231, 385, 70, 205], pv: { MSP: 1.07, MMP: 1.12 } },
  comm: { name: 'Commercial rooftop', sub: '250 kWdc school roof + battery', MSP: [423, 285, 706, 193, 183, 451, 168, 547], MMP: [456, 230, 697, 213, 214, 451, 168, 549], pv: { MSP: 1.95, MMP: 1.98 } },
  res: { name: 'Residential rooftop', sub: '8 kWdc + 13.5 kWh battery', MSP: [289, 303, 608, 207, 380, 349, 1347, 851], MMP: [321, 357, 689, 227, 428, 349, 1347, 875], pv: { MSP: 2.78, MMP: 2.95 } },
};
export function costStack(el) {
  const st = { basis: 'MMP', view: 'pv', hover: null }; let geo = null;
  const REST = '#b8b1a3';
  // solar only: NREL gives PV-only totals but breaks down only the PV+battery systems, so the PV-only bars split into the module (a per-watt input common to both) and everything else
  const stack = B => st.view === 'pv' ? [B[st.basis][0], Math.round(B.pv[st.basis] * 1000) - B[st.basis][0]] : B[st.basis];
  const cats = () => st.view === 'pv' ? [CATS[0], ['Everything else', REST]] : CATS;
  const fig = new Fig(el, {
    label: 'US installed cost per watt of solar systems in 2025 for utility, commercial and residential projects: solar alone, split into the module and everything else, or with batteries, broken into module, inverter, battery, structure, electrical, labour, office work and developer costs',
    height: w => w < 600 ? (st.view === 'pv' ? 470 : 500) : 400,
    draw(ctx, w, h) {
      const narrow = w < 600, CS = cats();
      const box = { l: narrow ? 46 : 56, r: narrow ? w - 14 : w * 0.66, t: 34, b: h - (narrow ? (st.view === 'pv' ? 90 : 120) : 56) };
      const { sx, sy } = axes(ctx, { box, x0: 0, x1: 3, y0: 0, y1: 5000, yticks: [0, 1000, 2000, 3000, 4000, 5000], xticks: [], yfmt: v => '$' + (v / 1000).toFixed(0) + '/W', ylabel: `installed cost per watt of panels, 2024 US$ (${st.basis === 'MMP' ? 'market price' : 'minimum sustainable price'})` });
      const keys = Object.keys(BENCH), bw = Math.min(120, (box.r - box.l) / 3 * 0.7); geo = { rects: [] };
      keys.forEach((k, i) => {
        const B = BENCH[k], x = sx(i + 0.5) - bw / 2; let base = 0;
        stack(B).forEach((v, j) => {
          const y0 = sy(base), y1 = sy(base + v);
          ctx.fillStyle = CS[j][1]; ctx.fillRect(x, y1, bw, y0 - y1 - 0.8);
          if (st.view === 'bat' && j === 2) { ctx.save(); ctx.beginPath(); ctx.rect(x, y1, bw, y0 - y1); ctx.clip(); ctx.strokeStyle = alpha('#fff', 0.5); ctx.lineWidth = 2; for (let t = -bw; t < bw + (y0 - y1); t += 7) { ctx.beginPath(); ctx.moveTo(x + t, y0); ctx.lineTo(x + t + (y0 - y1), y1); ctx.stroke(); } ctx.restore(); }
          if (st.hover && st.hover.i === i && st.hover.j === j) { ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y1 + 1, bw - 2, y0 - y1 - 2); }
          geo.rects.push({ i, j, x, y0: y1, y1: y0, w: bw, v });
          base += v;
        });
        text(ctx, '$' + (base / 1000).toFixed(2), x + bw / 2, sy(base) - 8, { size: 12.5, weight: 700, color: C.ink, align: 'center' });
        if (narrow) { const [a, b2] = B.name.split(' '); text(ctx, a, x + bw / 2, box.b + 15, { size: 10.5, weight: 650, color: C.ink, align: 'center' }); if (b2) text(ctx, b2, x + bw / 2, box.b + 28, { size: 10.5, weight: 650, color: C.ink, align: 'center' }); }
        else text(ctx, B.name, x + bw / 2, box.b + 16, { size: 12, weight: 650, color: C.ink, align: 'center' });
        if (w > 900) text(ctx, st.view === 'pv' ? B.sub.replace(/,? \+ .*| \+ battery/, '') : B.sub, x + bw / 2, box.b + 31, { size: 10, color: C.ink3, align: 'center' });
      });
      // legend
      const L = narrow ? { x: 16, y: box.b + 48, col: (w - 32) / 2 } : { x: box.r + 30, y: 60, col: w - box.r - 40 };
      if (st.view === 'pv') {
        const sub = narrow ? ['inverter, structure, wiring, labour, permits, sales, profit'] : ['inverter, structure, wiring, labour,', 'permits, sales, profit'];
        let y = L.y;
        [[1, 'Everything else'], [0, 'Module']].forEach(([j, s]) => {
          ctx.fillStyle = CS[j][1]; ctx.fillRect(L.x, y - 9, 11, 11);
          text(ctx, s, L.x + 16, y, { size: 10.5, color: C.ink2, weight: st.hover && st.hover.j === j ? 700 : 450 });
          if (j === 1) sub.forEach(l => { y += 14; text(ctx, l, L.x + 16, y, { size: 10, color: C.ink3 }); });
          y += 22;
        });
        return;
      }
      CS.slice().reverse().forEach(([lab, col], k) => {
        const j = CS.length - 1 - k;
        const x = narrow ? L.x + (k % 2) * L.col : L.x, y = narrow ? L.y + Math.floor(k / 2) * 18 : L.y + k * 22;
        ctx.fillStyle = col; ctx.fillRect(x, y - 9, 11, 11);
        const s = narrow ? lab.replace('Office work: permits, sales, design', 'Office work').replace('Developer costs, overhead, profit', 'Developer, profit').replace('Installation labour', 'Install labour') : lab;
        text(ctx, s, x + 16, y, { size: 10.5, color: C.ink2, weight: st.hover && st.hover.j === j ? 700 : 450 });
      });
    },
  });
  fig.interact({ hit: (x, y) => geo && geo.rects.find(r => x >= r.x && x <= r.x + r.w && y >= r.y0 && y <= r.y1) || null, cursor: 'default', hover: o => { st.hover = o; upd(); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'System', options: [{ label: 'Solar only', value: 'pv', name: 'cs-pv' }, { label: 'With a battery', value: 'bat', name: 'cs-bat' }], value: 'pv', onchange: v => { st.view = v; st.hover = null; fig.resize(); upd(); } });
  segmented(more(ctl, 'More: price basis'), { label: 'Price basis', options: [{ label: 'Market price (MMP)', value: 'MMP', name: 'b-mmp' }, { label: 'Minimum sustainable (MSP)', value: 'MSP', name: 'b-msp' }], value: 'MMP', onchange: v => { st.basis = v; upd(); } });
  function upd() {
    const o = st.hover, r = BENCH.res, u = BENCH.util, f = v => (v / 1000).toFixed(2);
    if (o) { const B = BENCH[Object.keys(BENCH)[o.i]], s = stack(B), tot = s.reduce((a, b) => a + b, 0); ro.innerHTML = `${B.name}${st.view === 'bat' ? ' with a battery' : ''}: <b>${cats()[o.j][0].toLowerCase()}</b> costs <b>$${f(o.v)}/W</b>, ${Math.round(o.v / tot * 100)}% of the total.`; }
    else if (st.view === 'pv') ro.innerHTML = `The module comes to <b>$${f(u[st.basis][0])}/W</b> on a utility site and <b>$${f(r[st.basis][0])}/W</b> on a house. Everything else comes to <b>$${f(stack(u)[1])}/W</b> for the utility plant and <b>$${f(stack(r)[1])}/W</b> for the home system.`;
    else ro.innerHTML = `With a battery, NREL breaks the cost down further. Office work alone (permits, sales, design, customer acquisition) is <b>$${f(r[st.basis][6])}/W</b> for a home system and $${f(u[st.basis][6])}/W for a utility plant.`;
    fig.invalidate();
  }
  upd();
}

/* ---------------- captureHistory ---------------- */
export function captureHistory(el) {
  const D = SOLAR.capture || [], PR = SOLAR.profile || {};
  const st = { view: 'price', hover: null, cur: DEFAULT_CURRENCY }; let geo = null;
  // $ view converts each year at that year's ECB average rate (2015 at 1.11, 2022 at 1.05, 2025 at 1.13 …)
  const K = y => st.cur === 'USD' ? USD_PER_EUR[rateYear(y)] : 1, S = () => st.cur === 'USD' ? '$' : '€';
  const fig = new Fig(el, {
    label: 'Germany 2015 to 2025: the average day-ahead price, the average price earned by solar, the capture rate, and hours of negative prices; and the average summer price by hour of day in 2015 and 2025',
    height: w => w < 600 ? 640 : 380,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = narrow ? { l: 46, r: w - 14, t: 34, b: 300 } : { l: 52, r: w * 0.56, t: 34, b: h - 42 };
      const sx = scale(2014.5, 2025.5, box.l, box.r);
      let sy;
      if (st.view === 'price') {
        ({ sy } = axes(ctx, { box, x0: 2014.5, x1: 2025.5, y0: 0, y1: 250, yticks: [0, 50, 100, 150, 200, 250], xticks: narrow ? [2015, 2019, 2023] : [2015, 2017, 2019, 2021, 2023, 2025], yfmt: v => S() + v, ylabel: narrow ? `DE day-ahead, ${S()}/MWh` : `German day-ahead price, ${S()}/MWh (annual averages${st.cur === 'USD' ? ', each year at its ECB rate' : ''})` }));
        const bw = (box.r - box.l) / 11 * 0.36;
        D.forEach(([y, base0, sol0]) => { const base = base0 * K(y), sol = sol0 * K(y); ctx.fillStyle = alpha(C.ink3, 0.55); ctx.fillRect(sx(y) - bw, sy(base), bw, box.b - sy(base)); ctx.fillStyle = C.solar; ctx.fillRect(sx(y), sy(sol), bw, box.b - sy(sol)); });
        ctx.fillStyle = alpha(C.ink3, 0.55); ctx.fillRect(box.l + 8, box.t + 4, 10, 10); text(ctx, 'all hours (average)', box.l + 22, box.t + 13, { size: 10.5, color: C.ink2 });
        ctx.fillStyle = C.solar; ctx.fillRect(box.l + 8, box.t + 22, 10, 10); text(ctx, 'what solar earned', box.l + 22, box.t + 31, { size: 10.5, color: C.ink2 });
      } else if (st.view === 'rate') {
        ({ sy } = axes(ctx, { box, x0: 2014.5, x1: 2025.5, y0: 0.4, y1: 1.05, yticks: [0.4, 0.6, 0.8, 1.0], xticks: narrow ? [2015, 2019, 2023] : [2015, 2017, 2019, 2021, 2023, 2025], yfmt: v => Math.round(v * 100) + '%', ylabel: 'solar capture rate: what solar earned ÷ average price' }));
        pathLine(ctx, D.map(([y, b, s]) => [sx(y), sy(s / b)]), darken(C.solar, 0.2), 2.6);
        D.forEach(([y, b, s]) => circle(ctx, sx(y), sy(s / b), 4, '#fff', darken(C.solar, 0.2), 1.8));
        const yy = sy(1); line(ctx, box.l, yy, box.r, yy, alpha(C.ink3, 0.6), 1, [3, 3]);
      } else {
        ({ sy } = axes(ctx, { box, x0: 2014.5, x1: 2025.5, y0: 0, y1: 600, yticks: [0, 200, 400, 600], xticks: narrow ? [2015, 2019, 2023] : [2015, 2017, 2019, 2021, 2023, 2025], yfmt: v => v + ' h', ylabel: 'hours with a negative day-ahead price' }));
        const bw = (box.r - box.l) / 11 * 0.55;
        D.forEach(([y, , , n]) => { ctx.fillStyle = C.hydro; ctx.fillRect(sx(y) - bw / 2, sy(n), bw, box.b - sy(n)); });
      }
      geo = { sx, box };
      if (st.hover != null) { const d = D[st.hover]; line(ctx, sx(d[0]), box.t, sx(d[0]), box.b, alpha(C.ink, 0.3), 1); }
      // hour-of-day profile
      const P = narrow ? { l: 46, r: w - 42, t: 384, b: h - 34 } : { l: w * 0.64, r: w - 44, t: 34, b: h - 42 };
      const pa = axes(ctx, { box: P, x0: 0, x1: 23, y0: -20, y1: 160, yticks: [0, 50, 100, 150], xticks: [0, 6, 12, 18], xfmt: v => v + ':00', yfmt: v => S() + v, ylabel: 'average price by hour, April–September' });
      line(ctx, P.l, pa.sy(0), P.r, pa.sy(0), C.grid2, 1);
      [[2015, alpha(C.ink3, 0.9)], [2025, C.price]].forEach(([y, col]) => { const p = PR[y]; if (!p) return; pathLine(ctx, p.price.map((v, k) => [pa.sx(k), pa.sy(v * K(y))]), col, 2.2); text(ctx, String(y), pa.sx(23) + 5, pa.sy(p.price[23] * K(y)) + 4, { size: 11, weight: 650, color: col, align: 'left' }); });
      if (PR[2025]) { const k = PR[2025].price.indexOf(Math.min(...PR[2025].price)), mv = PR[2025].price[k] * K(2025); text(ctx, `midday ${mv < 0 ? '−' : ''}${S()}${Math.abs(mv).toFixed(0)}`, pa.sx(k), pa.sy(mv) + 16, { size: 10.5, weight: 600, color: C.price, align: 'center', halo: true }); }
    },
  });
  fig.interact({ hit: (x, y) => geo && x > geo.box.l && x < geo.box.r && y > geo.box.t && y < geo.box.b ? 'y' : null, cursor: 'crosshair', hover: (o, x) => { st.hover = o ? clamp(Math.round(geo.sx.inv(x) - 2015), 0, D.length - 1) : null; upd(); } });
  const ctl = controls(el); const ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'Prices', value: 'price', name: 'c-price' }, { label: 'Capture rate', value: 'rate', name: 'c-rate' }, { label: 'Negative hours', value: 'neg', name: 'c-neg' }], value: 'price', onchange: v => { st.view = v; upd(); } });
  currencyToggle(ctl, v => { st.cur = v; upd(); }, 'eu-capturehistory', { caption: false });
  function upd() {
    const d = D[st.hover != null ? st.hover : D.length - 1]; if (!d) return;
    ro.innerHTML = `<b>${d[0]}</b>: average price <b>${S()}${(d[1] * K(d[0])).toFixed(0)}/MWh</b>; solar earned <b>${S()}${(d[2] * K(d[0])).toFixed(0)}/MWh</b>, a capture rate of <b>${Math.round(d[2] / d[1] * 100)}%</b>; <b>${d[3]}</b> hours below zero; ${d[4].toFixed(0)} TWh of solar fed into the public grid.`;
    fig.invalidate();
  }
  upd();
}
