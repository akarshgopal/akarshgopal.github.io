// The AI Factory: from one chip to the grid. Real inputs from src/lib/constants.js; every derived number is computed here.
import { Fig, isPlaying, onPlayChange } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, measure } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint, more } from '../lib/ui.js';
import { K } from '../lib/constants.js';
import { DC, COUNTRY_TWH } from '../lib/ieadc.js';
import { sig } from './chips.js';

const narrow = w => w < 560;
const UI3D = { C, controls, slider, button, readout, hint, isPlaying, onPlayChange };
const L10 = Math.log10;
const fmtW = kw => (kw >= 1e6 ? `${+(kw / 1e6).toPrecision(3)} GW` : kw >= 1000 ? `${+(kw / 1000).toPrecision(3)} MW` : kw >= 1 ? `${+kw.toPrecision(3)} kW` : `${Math.round(kw * 1000)} W`);
const kWperGPU = K.dgxH100.maxW / K.dgxH100.gpus / 1000; // 1.275 kW: a DGX H100 at full draw, per GPU

// ---------- 1. From one chip to a campus: one continuous zoom, everything drawn to scale (metres) ----------
// Sizes: H100 die 814 mm² (drawn square); DGX H100 482.3 × 897.1 mm (NVIDIA user guide); rack footprint 0.6 × 1.2 m and
// 1.2 m aisles (assumed, common practice); Colossus: 100,000 GPUs as 3,125 racks of four DGX-class servers (assumed packing),
// building 785,000 sq ft and site 217 acres (as reported), both drawn as rectangles because their shapes are not modelled.
const SQFT = 0.09290304, ACRE = 4046.8564;
const PLW = (() => {
  const die = Math.sqrt(K.h100DieMM2) / 1000, site = Math.sqrt(217 * ACRE), bA = 785000 * SQFT, bw = Math.sqrt(bA * 2), bh = bA / bw;
  const S = { x: 0, y: 0, w: site, h: site }, Bd = { x: (site - bw) / 2, y: site * 0.42, w: bw, h: bh };
  const rows = 25, perRow = 125, rw = 0.6, rd = 1.2, aisle = 1.2, Hl = { x: Bd.x + 40, y: Bd.y + (bh - rows * (rd + aisle)) / 2, w: perRow * rw, h: rows * (rd + aisle), rows, perRow, rw, rd, pitch: rd + aisle };
  const rr = 12, rc = 62, Rk = { x: Hl.x + rc * rw, y: Hl.y + rr * Hl.pitch + aisle / 2, w: rw, h: rd };
  const Sv = { x: Rk.x + (rw - 0.4823) / 2, y: Rk.y + (rd - 0.8971) / 2, w: 0.4823, h: 0.8971 };
  const dies = []; for (let i = 0; i < 8; i++) dies.push({ x: Sv.x + (i % 2 ? 0.30 : 0.12) * 1, y: Sv.y + 0.40 + Math.floor(i / 2) * 0.11, w: die, h: die });
  const D = dies[5];
  const N = 100000 / 32; // racks
  return { die, site: S, bld: Bd, hall: Hl, rack: Rk, srv: Sv, dies, D, racks: N,
    levels: [
      { key: 'die', name: 'one GPU die', r: D, W: K.h100.tdpW, A: K.h100DieMM2 * 1e-6, what: `an H100’s ${K.h100DieMM2} mm² of silicon at its rated 700 W` },
      { key: 'server', name: 'one server', r: Sv, W: K.dgxH100.maxW, A: 0.4823 * 0.8971, what: 'a DGX H100, 48 × 90 cm seen from above, at its 10.2 kW maximum; the eight dies are drawn to scale (packages and heat sinks are not)' },
      { key: 'rack', name: 'one rack', r: Rk, W: 4 * K.dgxH100.maxW, A: rw * rd, what: 'four DGX H100s stacked in a 60 × 120 cm cabinet (footprint assumed)' },
      { key: 'hall', name: 'the GPU hall', r: Hl, W: N * 4 * K.dgxH100.maxW, A: Hl.w * Hl.h, what: `${N.toLocaleString('en-GB')} such racks, 100,000 GPUs, in rows with 1.2 m aisles (layout assumed), counting the servers only` },
      { key: 'building', name: 'the building', r: Bd, W: K.colossus.MW * 1e6, A: bA, what: 'Colossus in Memphis: a 785,000 sq ft former factory, with the utility’s 150 MW for everything inside' },
      { key: 'site', name: 'the site', r: S, W: K.colossus.MW * 1e6, A: 217 * ACRE, what: 'the 217-acre site around it (shape not modelled), still 150 MW' },
    ] };
})();
export function powerLadder(el) { try { if (window.AIX3D && window.AIX3D.factoryZoom(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } powerLadder2d(el); }
function powerLadder2d(el) {
  const LV = PLW.levels, NL = LV.length;
  let t = 1, goal = null, R = {}, dx0 = 0;
  const flux = l => l.W / l.A; // W per m²
  const fmtF = f => (f >= 1e5 ? `${Math.round(f / 1e4) * 10} kW/m²` : f >= 1000 ? `${sig(f / 1000, 3)} kW/m²` : `${Math.round(f)} W/m²`);
  const sunX = f => (f >= 1000 ? `${sig(f / 1000, 2)} × midday sun` : `${sig(f / 1000, 2)} of midday sun`);
  // lean 2.5D helpers (isometric cue, not a 3D scene)
  const iso = (ctx, x, y, w, h, z, fill, stroke, lw = 1.2) => {
    if (w < 2 || h < 2 || z < 1) return;
    const zx = z * 0.55, zy = z * 0.38;
    // top
    ctx.beginPath();
    ctx.moveTo(x + zx, y - zy); ctx.lineTo(x + w + zx, y - zy); ctx.lineTo(x + w, y); ctx.lineTo(x, y); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    // right face
    ctx.beginPath();
    ctx.moveTo(x + w, y); ctx.lineTo(x + w + zx, y - zy); ctx.lineTo(x + w + zx, y + h - zy); ctx.lineTo(x + w, y + h); ctx.closePath();
    ctx.fillStyle = alpha(stroke || C.ink3, 0.22); ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = Math.max(0.8, lw * 0.7); ctx.stroke(); }
    // front
    ctx.fillStyle = fill; ctx.fillRect(x, y, w, h);
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.strokeRect(x, y, w, h); }
  };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 520 : 490), animated: true,
    label: 'One continuous 2.5D zoom from a single GPU die out to the whole 150 MW site, drawn to scale, with the heat per square metre at each level',
    step(dt) { if (goal != null) { const d = goal - t; if (Math.abs(d) < 0.003) { t = goal; goal = null; paint(); } else { t += d * Math.min(1, dt * 6); paint(); } } },
    draw(ctx, w, h) {
      const n = narrow(w), vy0 = 6, vh = h - 84, vw = w - 12, vx0 = 6;
      const i = Math.min(NL - 2, Math.floor(t)), u = t - i, a = LV[i].r, b = LV[i + 1].r;
      const fit = r => Math.max(r.w / vw, r.h / vh) * 1.25;
      const ma = fit(a), mb = fit(b), mpp = Math.exp(Math.log(ma) + (Math.log(mb) - Math.log(ma)) * u), lin = (mpp - ma) / (mb - ma || 1);
      const cx = a.x + a.w / 2 + (b.x + b.w / 2 - a.x - a.w / 2) * lin, cy = a.y + a.h / 2 + (b.y + b.h / 2 - a.y - a.h / 2) * lin;
      const X = x => vx0 + vw / 2 + (x - cx) / mpp, Y = y => vy0 + vh / 2 + (y - cy) / mpp, S = v => v / mpp;
      ctx.save(); rrect(ctx, vx0, vy0, vw, vh, 10); ctx.clip();
      // soft floor gradient for depth
      const g = ctx.createLinearGradient(vx0, vy0, vx0, vy0 + vh);
      g.addColorStop(0, '#f0f2ee'); g.addColorStop(1, '#e4e8e2');
      ctx.fillStyle = g; ctx.fillRect(vx0, vy0, vw, vh);

      const box = (r, fill, stroke, lw = 1) => {
        const x = X(r.x), y = Y(r.y), ww = S(r.w), hh = S(r.h);
        if (x > w || y > h || x + ww < 0 || y + hh < 0) return null;
        if (fill) { ctx.fillStyle = fill; ctx.fillRect(x, y, ww, hh); }
        if (stroke && ww > 2) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.strokeRect(x, y, ww, hh); }
        return { x, y, ww, hh };
      };
      // drop shadow helper in screen space
      const shadow = (x, y, ww, hh, blur = 10) => {
        if (ww < 4 || hh < 4) return;
        ctx.save(); ctx.fillStyle = 'rgba(40,50,40,0.14)';
        ctx.shadowColor = 'rgba(40,50,40,0.25)'; ctx.shadowBlur = blur; ctx.shadowOffsetY = 3;
        ctx.fillRect(x + 3, y + 4, ww, hh); ctx.restore();
      };

      // --- site / building / hall (plan) ---
      const onStage = (x, y) => x > vx0 && x < vx0 + vw && y > vy0 + 8 && y < vy0 + vh - 8;
      const sitePx = box(PLW.site, '#dfe6d8', alpha(C.green, 0.75), 1.6);
      // omit schematic captions when the watt/flux level label for that nest is on (same corner)
      const siteWattOn = S(PLW.site.w) >= 28;
      if (sitePx && sitePx.ww < vw * 1.5 && !siteWattOn && onStage(sitePx.x + 8, sitePx.y + 16)) text(ctx, n ? 'site' : 'site · schematic plan', sitePx.x + 8, sitePx.y + 16, { size: 11, weight: 650, color: C.ink2, halo: 3 });
      const bldPx = box(PLW.bld, '#f7f7f5', C.ink2, 1.6);
      const bldWattOn = S(PLW.bld.w) >= 28;
      if (bldPx && S(PLW.bld.w) > 40 && bldPx.ww < vw * 1.5 && !bldWattOn && onStage(bldPx.x + 8, bldPx.y + 16)) text(ctx, n ? 'building' : 'building · plan', bldPx.x + 8, bldPx.y + 16, { size: 11, weight: 650, color: C.ink2, halo: 3 });

      const H = PLW.hall;
      // aisle floor stripes for hall continuity
      const hallPx = box(H, '#ebebe8', C.ink3, 1);
      if (hallPx && S(H.rw) > 0.4) {
        ctx.save();
        for (let r = 0; r < H.rows; r++) {
          const ay = Y(H.y + r * H.pitch);
          const ah = S(H.aisle != null ? H.aisle : 1.2);
          // cold aisle band between rack rows
          ctx.fillStyle = alpha(C.cyan, 0.07);
          ctx.fillRect(X(H.x), ay, S(H.w), Math.max(1, S(0.55)));
        }
        ctx.restore();
      }

      // racks: stripes far away; individuals when readable
      const rpx = S(H.rw), rdx = S(H.rd);
      if (rpx < 1.2) {
        ctx.fillStyle = alpha(C.compute, 0.55);
        for (let r = 0; r < H.rows; r++) {
          const y = Y(H.y + r * H.pitch + 0.6), hh = Math.max(0.6, S(H.rd));
          ctx.fillRect(X(H.x), y, S(H.w), hh);
        }
      } else {
        const c0 = clamp(Math.floor((cx - vw / 2 * mpp - H.x) / H.rw) - 1, 0, H.perRow);
        const c1 = clamp(Math.ceil((cx + vw / 2 * mpp - H.x) / H.rw) + 1, 0, H.perRow);
        const r0 = clamp(Math.floor((cy - vh / 2 * mpp - H.y) / H.pitch) - 1, 0, H.rows);
        const r1 = clamp(Math.ceil((cy + vh / 2 * mpp - H.y) / H.pitch) + 1, 0, H.rows);
        for (let r = r0; r < r1; r++) for (let c = c0; c < c1; c++) {
          const x = X(H.x + c * H.rw), y = Y(H.y + r * H.pitch + 0.6);
          const isFocus = Math.abs(H.x + c * H.rw - PLW.rack.x) < 0.01 && Math.abs(H.y + r * H.pitch + 0.6 - PLW.rack.y) < 0.01;
          if (isFocus) continue; // focus rack drawn below in 2.5D
          ctx.fillStyle = alpha(C.compute, 0.5);
          ctx.fillRect(x + Math.min(1, rpx * 0.04), y, rpx - Math.min(2, rpx * 0.08), rdx);
        }
      }

      // nest outline of parent level (continuity cue)
      const nest = LV[Math.min(NL - 1, Math.max(0, Math.ceil(t)))];
      if (nest && S(nest.r.w) > 30 && S(nest.r.w) < vw * 1.4) {
        const nx = X(nest.r.x), ny = Y(nest.r.y), nw = S(nest.r.w), nh = S(nest.r.h);
        ctx.save(); ctx.setLineDash([5, 4]); ctx.strokeStyle = alpha(C.heat, 0.55); ctx.lineWidth = 1.5;
        ctx.strokeRect(nx, ny, nw, nh); ctx.restore();
      }

      // --- focus rack (2.5D when large enough) ---
      const rk = PLW.rack, rx = X(rk.x), ry = Y(rk.y), rw = S(rk.w), rh = S(rk.h);
      const rackClose = rw > 18;
      if (rackClose) {
        shadow(rx, ry, rw, rh, 14);
        // cabinet body + isometric top
        const z = Math.min(22, rw * 0.35);
        iso(ctx, rx, ry, rw, rh, z, '#6a86bc', C.ink, 1.6);
        // four server bays as stacked trays (elevation cue inside the plan footprint)
        if (rw > 28) {
          const bayH = rh / 4.6, gap = rh * 0.04;
          for (let b = 0; b < 4; b++) {
            const by = ry + gap + b * (bayH + gap);
            rrect(ctx, rx + rw * 0.08, by, rw * 0.84, bayH, 2);
            ctx.fillStyle = b === 1 ? '#c9d4e6' : alpha('#c9d4e6', 0.7); ctx.fill();
            ctx.strokeStyle = C.ink2; ctx.lineWidth = 1; ctx.stroke();
            if (!n && rw > 50 && Math.abs(t - 2) < 0.7) text(ctx, `DGX ${b + 1}`, rx + rw / 2, by + bayH / 2 + 4, { size: Math.min(12, rw * 0.12), align: 'center', weight: 650, color: C.ink2 });
          }
          if (!n && rw > 40 && Math.abs(t - 2) < 0.55) {
            const ly = Math.max(vy0 + 14, ry - z - 8);
            if (onStage(rx + rw / 2, ly)) text(ctx, 'rack · four DGX (schematic)', rx + rw / 2, ly, { size: 11, align: 'center', weight: 700, color: C.ink, halo: 3 });
          }
        }
      } else if (rw > 3) {
        box(rk, '#5f7fb8', C.ink, 1.5);
      }

      // --- focus server ---
      const sv = PLW.srv, sx0 = X(sv.x), sy0 = Y(sv.y), sw = S(sv.w), sh = S(sv.h);
      if (sw > 8) {
        shadow(sx0, sy0, sw, sh, 10);
        const z = Math.min(16, sw * 0.22);
        iso(ctx, sx0, sy0, sw, sh, z, '#d5deec', C.ink2, 1.3);
        if (!n && sw > 40 && Math.abs(t - 1) < 0.55) {
          const ly = Math.max(vy0 + 14, sy0 - z - 6);
          if (onStage(sx0 + sw / 2, ly)) text(ctx, 'DGX H100 chassis (top)', sx0 + sw / 2, ly, { size: 11, align: 'center', weight: 700, color: C.ink, halo: 3 });
        }
        // board rails
        if (sw > 30) {
          line(ctx, sx0 + sw * 0.08, sy0 + sh * 0.18, sx0 + sw * 0.92, sy0 + sh * 0.18, alpha(C.ink3, 0.5), 1);
          line(ctx, sx0 + sw * 0.08, sy0 + sh * 0.82, sx0 + sw * 0.92, sy0 + sh * 0.82, alpha(C.ink3, 0.5), 1);
        }
      }

      // --- dies (with HBM stubs when close) ---
      const diePx = S(PLW.die);
      if (diePx > 0.5) {
        PLW.dies.forEach((d, di) => {
          const dx = X(d.x), dy = Y(d.y), dw = S(d.w), dh = S(d.h);
          const focus = d === PLW.D;
          if (diePx > 8) {
            const z = Math.min(10, dw * 0.35);
            iso(ctx, dx, dy, dw, dh, z, focus ? C.heat : alpha(C.heat, 0.75), focus ? C.ink : null, focus ? 1.4 : 1);
            // HBM stubs left/right when readable
            if (diePx > 14) {
              const hbW = Math.max(2, dw * 0.22), hbH = dh * 0.85;
              rrect(ctx, dx - hbW - 2, dy + (dh - hbH) / 2, hbW, hbH, 1);
              ctx.fillStyle = alpha(C.memory, 0.75); ctx.fill();
              rrect(ctx, dx + dw + 2, dy + (dh - hbH) / 2, hbW, hbH, 1);
              ctx.fillStyle = alpha(C.memory, 0.75); ctx.fill();
              if (focus && diePx > 40) {
                const ly = Math.max(vy0 + 12, dy - 4);
                if (onStage(dx - hbW / 2 - 2, ly)) text(ctx, 'HBM', dx - hbW / 2 - 2, ly, { size: 10, align: 'center', weight: 650, color: C.memory, halo: 2 });
              }
            }
          } else {
            ctx.fillStyle = focus ? C.heat : alpha(C.heat, 0.8);
            ctx.fillRect(dx, dy, dw, dh);
          }
        });
      }
      // die close-up detail
      if (diePx > 55) {
        const d = PLW.D, dx = X(d.x), dy = Y(d.y), dw = S(d.w), dh = S(d.h);
        // SM grid schematic
        const cols = 4, rows = 5;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const gx = dx + dw * (0.12 + c * 0.2), gy = dy + dh * (0.14 + r * 0.15);
          rrect(ctx, gx, gy, dw * 0.14, dh * 0.1, 2);
          ctx.fillStyle = alpha('#fff', 0.22); ctx.fill();
        }
        text(ctx, 'H100 die', dx + dw / 2, dy + dh / 2 + 5, { size: Math.min(16, dw * 0.22), align: 'center', weight: 750, color: '#fff', halo: 3, haloColor: alpha(C.heat, 0.8) });
        {
          const ly = Math.min(vy0 + vh - 10, dy + dh + 14);
          if (onStage(dx + dw / 2, ly)) text(ctx, 'schematic · not a floorplan of SMs', dx + dw / 2, ly, { size: 10.5, align: 'center', color: C.ink2, halo: 2 });
        }
      }

      // level labels (watt + flux). Skip server/rack when the dedicated chassis caption is on (avoids overlap).
      LV.forEach((l, j) => {
        const r = l.r, ww = S(r.w);
        const fj = Math.abs(j - t) < 0.55;
        if (ww < 28 || (!fj && (ww > vw * 1.25 || Y(r.y) - 6 < vy0 + 14))) return;
        if (l.key === 'server' && !n && sw > 40 && Math.abs(t - 1) < 0.55) return;
        if (l.key === 'rack' && !n && rw > 40 && Math.abs(t - 2) < 0.55) return;
        // put watt line BELOW the nest top edge so it clears the chassis title above
        const x = clamp(X(r.x) + 4, vx0 + 4, w - 280), y = clamp(Y(r.y) + 28, vy0 + 36, vy0 + vh - 24);
        text(ctx, `${l.name} · ${fmtW(l.W / 1000)} · ${fmtF(flux(l))}`, x, y, { size: fj ? 12.5 : 11, weight: fj ? 750 : 550, color: C.ink, halo: 3 });
      });

      // breadcrumb of nest chain
      const crumb = LV.slice(0, Math.round(t) + 1).map(l => l.key).join(' → ');
      rrect(ctx, vx0 + 8, vy0 + 8, Math.min(vw - 16, measure(ctx, crumb, 11, 600) + 16), 22, 8);
      ctx.fillStyle = 'rgba(255,255,255,0.88)'; ctx.fill();
      text(ctx, crumb, vx0 + 16, vy0 + 23, { size: 11, weight: 600, color: C.ink2 });

      // scale bar
      const target = 110, raw = target * mpp, p10 = 10 ** Math.floor(Math.log10(raw)), nice = [1, 2, 5, 10].map(m => m * p10).reduce((bst, v) => (Math.abs(v - raw) < Math.abs(bst - raw) ? v : bst)), bl = S(nice);
      const lab = nice >= 1000 ? `${nice / 1000} km` : nice >= 1 ? `${nice} m` : nice >= 0.01 ? `${Math.round(nice * 100)} cm` : `${Math.round(nice * 1000)} mm`;
      const sbx = vx0 + 12, sby = vy0 + vh - 14;
      rrect(ctx, sbx - 6, sby - 22, bl + 12 + 48, 30, 6); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill();
      line(ctx, sbx, sby, sbx + bl, sby, C.ink, 2.5); line(ctx, sbx, sby - 5, sbx, sby + 3, C.ink, 1.5); line(ctx, sbx + bl, sby - 5, sbx + bl, sby + 3, C.ink, 1.5);
      text(ctx, lab, sbx, sby - 8, { size: 11, weight: 650, color: C.ink });
      ctx.restore();

      // zoom rail
      const rl = 30, rr = w - 30, ryR = h - 44, sx = v => rl + v / (NL - 1) * (rr - rl);
      line(ctx, rl, ryR, rr, ryR, C.grid2, 4); rrect(ctx, rl, ryR - 2, sx(t) - rl, 4, 2); ctx.fillStyle = C.heat; ctx.fill();
      LV.forEach((l, j) => {
        circle(ctx, sx(j), ryR, 4.5, '#fff', C.ink3, 1.5);
        text(ctx, n ? l.key : l.name.replace(/^(one|the) /, ''), sx(j), ryR + 22, { size: 11, align: 'center', color: Math.abs(j - t) < 0.5 ? C.ink : C.ink3, weight: Math.abs(j - t) < 0.5 ? 700 : 450 });
      });
      circle(ctx, sx(t), ryR, 11, '#fff', C.heat, 3);
      R = { sx, rl, rr, ry: ryR };
    },
  });
  const tAt = x => clamp((x - R.rl) / (R.rr - R.rl) * (NL - 1), 0, NL - 1);
  fig.interact({ panY: true, cursor: 'ew-resize', hit: (x, y) => (Math.abs(y - R.ry) < 30 ? 'z' : y < R.ry - 30 ? 'v' : null),
    down(key, x) { if (key === 'z') { goal = null; t = tAt(x); paint(); } else dx0 = x; },
    move(key, x) { if (key === 'z') { t = tAt(x); paint(); } else { const nt = t + (x - dx0) / 140; if (Number.isFinite(nt)) t = clamp(nt, 0, NL - 1); dx0 = x; goal = null; paint(); } },
    up(key) { if (key === 'z' || key === 'v') { const s = Math.round(t); if (Math.abs(s - t) < 0.18) goal = s; } } });
  const ro = readout(el);
  const paint = () => {
    const j = clamp(Math.round(t), 0, NL - 1), l = LV[j], f = flux(l);
    ro.innerHTML = `<b>${l.name[0].toUpperCase() + l.name.slice(1)}</b>: ${l.what}. That is <b>${fmtF(f)}</b> over its area, ${sunX(f)} (about 1 kW/m²). Zoom keeps one continuous nest — die inside server inside rack inside hall.`;
    fig.invalidate();
  };
  hint(el, 'drag along the line below, or sideways across the picture, to zoom from one chip out to the whole site.');
  paint();
}


// ---------- 2. Cold plate: water over the die carries the heat (CIECH #8) ----------
// Water: textbook ρ, cp. Outlet ΔT from P = ṁ·c·ΔT (MODEL). Flow rates are schematic totals for the chosen load.
const WATER = { rho: 997, cp: 4180 }; // kg/m³, J/(kg·K)
const AIR_CAP = 1.2 * 1005; // J/(m³·K) — for the volume comparison in the readout only
export function coolantFlow(el) { try { if (window.AIX3D && window.AIX3D.coldPlate3d(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } coolantFlow2d(el); }
function coolantFlow2d(el) {
  let kw = 40.8, Lpm = 50, R = {};
  const drops = [], sparks = []; // water along the channel; heat rising from the die
  const mDot = () => (Lpm / 60000) * WATER.rho; // kg/s
  const dT = () => kw * 1000 / (mDot() * WATER.cp); // °C
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 420 : 380), animated: true,
    label: 'A cold plate over a hot die: water flows through a channel, picks up heat, and leaves warmer by ΔT = P / (ṁ c), a model',
    step(dt) {
      const speed = 0.15 + Lpm * 0.004; // channel progress per second
      const spawn = (4 + Lpm * 0.35) * dt;
      for (let i = 0; i < spawn; i++) if (drops.length < 48) drops.push({ x: -0.05 - Math.random() * 0.1, y: 0.25 + Math.random() * 0.5 });
      for (const p of drops) p.x += speed * dt * (0.85 + Math.random() * 0.3);
      for (let i = drops.length - 1; i >= 0; i--) if (drops[i].x > 1.08) drops.splice(i, 1);
      // heat sparks leave the die and join the channel, then drift with the flow
      const hs = (2 + kw * 0.08) * dt;
      for (let i = 0; i < hs; i++) if (sparks.length < 60) sparks.push({ x: 0.2 + Math.random() * 0.6, y: 1, phase: 'rise', age: 0 });
      for (const s of sparks) {
        s.age += dt;
        if (s.phase === 'rise') { s.y -= (0.9 + Math.random() * 0.4) * dt; if (s.y <= 0.55) { s.phase = 'flow'; s.y = 0.3 + Math.random() * 0.4; } }
        else s.x += speed * dt * (0.9 + Math.random() * 0.25);
      }
      for (let i = sparks.length - 1; i >= 0; i--) if (sparks[i].x > 1.05 || sparks[i].age > 4) sparks.splice(i, 1);
    },
    draw(ctx, w, h) {
      const n = narrow(w), pad = n ? 12 : 20, stageT = 18, stageB = h - 78, stageH = stageB - stageT;
      const x0 = pad, x1 = w - pad, dieW = Math.min(n ? w * 0.78 : w * 0.62, 520), dieX = (w - dieW) / 2;
      // vertical layout inside the stage: plate / channel / TIM / die
      const plateY = stageT + stageH * 0.08, plateH = stageH * 0.42;
      const chY = plateY + plateH * 0.28, chH = plateH * 0.44;
      const timY = plateY + plateH + 4, timH = 10;
      const dieY = timY + timH + 2, dieH = Math.min(54, stageH * 0.22);
      // stage background
      rrect(ctx, x0, stageT, x1 - x0, stageB - stageT, 10); ctx.fillStyle = '#eceeea'; ctx.fill();
      // cold plate body
      rrect(ctx, dieX - 8, plateY, dieW + 16, plateH, 8); ctx.fillStyle = '#c5ced8'; ctx.fill(); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.2; ctx.stroke();
      text(ctx, 'cold plate', dieX + dieW / 2, plateY + 14, { size: 11, align: 'center', weight: 650, color: C.ink2 });
      // channel (cut-away)
      rrect(ctx, dieX + 10, chY, dieW - 20, chH, 6); ctx.fillStyle = alpha(C.cyan, 0.22); ctx.fill(); ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5; ctx.stroke();
      // water particles
      for (const p of drops) {
        const px = dieX + 14 + p.x * (dieW - 28), py = chY + 4 + p.y * (chH - 8);
        if (px < dieX + 12 || px > dieX + dieW - 12) continue;
        circle(ctx, px, py, 2.4, alpha(C.cyan, 0.85));
      }
      // inlet / outlet labels + temperature colour wash
      const dTv = dT(), hot = clamp(dTv / 25, 0, 1);
      const grad = ctx.createLinearGradient(dieX + 10, 0, dieX + dieW - 10, 0);
      grad.addColorStop(0, alpha(C.cyan, 0.35)); grad.addColorStop(1, alpha(C.heat, 0.15 + 0.55 * hot));
      ctx.fillStyle = grad; rrect(ctx, dieX + 10, chY, dieW - 20, chH, 6); ctx.globalAlpha = 0.55; ctx.fill(); ctx.globalAlpha = 1;
      // redraw channel outline and drops above wash
      ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5; rrect(ctx, dieX + 10, chY, dieW - 20, chH, 6); ctx.stroke();
      for (const p of drops) {
        const px = dieX + 14 + p.x * (dieW - 28), py = chY + 4 + p.y * (chH - 8);
        if (px < dieX + 12 || px > dieX + dieW - 12) continue;
        circle(ctx, px, py, 2.6, C.cyan);
      }
      arrow(ctx, dieX - 2, chY + chH / 2, dieX + 18, chY + chH / 2, C.cyan, 2, 8);
      arrow(ctx, dieX + dieW - 18, chY + chH / 2, dieX + dieW + 4, chY + chH / 2, mixHeat(dTv), 2, 8);
      text(ctx, 'in', dieX + 22, chY - 4, { size: 10.5, weight: 650, color: C.cyan });
      text(ctx, 'out', dieX + dieW - 22, chY - 4, { size: 10.5, weight: 650, color: mixHeat(dTv), align: 'right' });
      // TIM
      rrect(ctx, dieX + 4, timY, dieW - 8, timH, 2); ctx.fillStyle = alpha(C.ink3, 0.35); ctx.fill();
      text(ctx, n ? 'TIM' : 'thermal interface', dieX + dieW / 2, timY + timH - 1, { size: 10, align: 'center', color: C.ink2 });
      // die
      rrect(ctx, dieX + 20, dieY, dieW - 40, dieH, 5); ctx.fillStyle = C.heat; ctx.fill();
      text(ctx, n ? 'GPU die' : 'GPU die (schematic)', dieX + dieW / 2, dieY + dieH / 2 + 4, { size: 12.5, align: 'center', weight: 700, color: '#fff' });
      text(ctx, fmtW(kw), dieX + dieW / 2, dieY + dieH + 14, { size: 11.5, align: 'center', weight: 650, color: C.heat });
      // heat sparks
      for (const s of sparks) {
        const px = dieX + 24 + s.x * (dieW - 48);
        const py = s.phase === 'rise' ? dieY - 2 - (1 - s.y) * (dieY - chY - chH / 2) : chY + 4 + s.y * (chH - 8);
        if (px < dieX + 20 || px > dieX + dieW - 20) continue;
        circle(ctx, px, py, s.phase === 'rise' ? 2.2 : 2.8, alpha(C.heat, s.phase === 'rise' ? 0.9 : 0.55));
      }
      // outlet ΔT badge
      const badge = `outlet ΔT ${fmtDT(dTv)} · model`;
      const bx = dieX + dieW / 2;
      rrect(ctx, bx - 78, plateY + plateH - 22, 156, 20, 10); ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill();
      text(ctx, badge, bx, plateY + plateH - 8, { size: 11, align: 'center', weight: 700, color: C.ink });
      // power rail
      const l = pad + 6, r = w - pad - 6, ry = h - 36, sx = v => l + (L10(v) - L10(0.5)) / (L10(150) - L10(0.5)) * (r - l);
      line(ctx, l, ry, r, ry, C.grid2, 4); rrect(ctx, l, ry - 2, sx(kw) - l, 4, 2); ctx.fillStyle = C.heat; ctx.fill();
      [[0.7, n ? 'H100' : 'one H100'], [10.2, n ? 'DGX' : 'one DGX'], [40.8, n ? '4 DGX' : 'four DGX'], [120, n ? 'NVL72' : 'GB200 NVL72']].forEach(([v, s]) => {
        const x = sx(v); line(ctx, x, ry - 6, x, ry + 6, C.ink3, 1);
        text(ctx, s, x, ry + 20, { size: 10.5, align: v >= 100 ? 'right' : v <= 1 ? 'left' : 'center', color: C.ink3 });
      });
      circle(ctx, sx(kw), ry, 11, '#fff', C.heat, 3);
      text(ctx, 'heat load (drag)', l, ry - 14, { size: 11, color: C.ink3 });
      R = { sx, ry, l, r };
    },
  });
  const set = x => { kw = +clamp(10 ** (L10(0.5) + (x - R.l) / (R.r - R.l) * (L10(150) - L10(0.5))), 0.5, 150).toPrecision(3); paint(); };
  fig.interact({ panY: true, hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'k' : null), cursor: 'ew-resize', down(q, x) { set(x); }, move(q, x) { set(x); } });
  const ctl = controls(el);
  slider(ctl, { label: 'Water flow through the plate', name: 'flow', min: 1, max: 120, step: 1, value: Lpm, color: C.cyan, fmt: v => `${v} L/min`, oninput: v => { Lpm = v; paint(); } });
  const ro = readout(el);
  const paint = () => {
    const dtv = dT(), md = mDot(), airM3 = kw * 1000 / (AIR_CAP * Math.max(0.5, dtv));
    ro.innerHTML = `Removing <b>${fmtW(kw)}</b> at <b>${Lpm} L/min</b> of water (ṁ = ${md < 1 ? md.toFixed(2) : md.toFixed(1)} kg/s): outlet rise <b>${fmtDT(dtv)}</b> from P = ṁ·c·ΔT (<b>model</b>). The same ΔT would need about <b>${airM3.toFixed(airM3 < 1 ? 2 : 1)} m³/s of air</b> — ${Math.round(airM3 / (Lpm / 60000)).toLocaleString('en-GB')}× the water volume. Flow is a schematic total for this load (many plates at rack scale).`;
    fig.invalidate();
  };
  hint(el, 'drag the heat load, then slow the water and watch the outlet warm up.');
  paint();
}

// ---------- 2b. Bridge: same cold plate into the facility loop (CIECH #9) ----------
function heatLoop2d(el) {
  let t = 0.55, goal = null, R = {}, pulse = 0;
  const STAGES = [
    { name: 'die', short: 'die' },
    { name: 'cold plate', short: 'plate' },
    { name: 'CDU / exchanger', short: 'CDU' },
    { name: 'outdoor reject', short: 'out' },
  ];
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 300 : 260), animated: true,
    label: 'Heat path from the die through the cold plate to the facility loop and outdoor reject — schematic',
    step(dt) {
      pulse += dt;
      if (goal != null) {
        const d = goal - t;
        if (Math.abs(d) < 0.004) { t = goal; goal = null; }
        else t += d * Math.min(1, dt * 5);
      } else {
        t = (t + dt * 0.12) % 1; // mid-action default: keep circulating
      }
      paint();
    },
    draw(ctx, w, h) {
      const n = narrow(w), pad = n ? 12 : 18, top = 36, bot = h - 52;
      const xs = STAGES.map((_, i) => pad + 30 + i * ((w - pad * 2 - 60) / (STAGES.length - 1)));
      const y = (top + bot) / 2;
      // facility loop band
      rrect(ctx, pad, top, w - pad * 2, bot - top, 10); ctx.fillStyle = '#eceeea'; ctx.fill();
      // die → plate is conduction through metal, not a pipe
      arrow(ctx, xs[0] + 30, y, xs[1] - 30, y, C.heat, 4, 9);
      text(ctx, n ? 'conducts' : 'conduction', (xs[0] + xs[1]) / 2, y + 48, { size: 10, align: 'center', color: C.heat });
      // two loops share the CDU: TCS (plate ↔ CDU) and FWS (CDU ↔ outdoor); warm leg out on top, cooled leg back below
      [[1, 2, 'TCS loop'], [2, 3, 'FWS loop']].forEach(([a, b, name]) => {
        line(ctx, xs[a] + 34, y - 12, xs[b] - 34, y - 12, alpha(C.heat, 0.5), 6);
        arrow(ctx, xs[a] + 26, y - 12, xs[b] - 26, y - 12, C.heat, 2, 7);
        line(ctx, xs[b] - 34, y + 12, xs[a] + 34, y + 12, alpha(C.cyan, 0.5), 6);
        arrow(ctx, xs[b] - 26, y + 12, xs[a] + 26, y + 12, C.cyan, 2, 7);
        text(ctx, name, (xs[a] + xs[b]) / 2, y + 48, { size: 10, align: 'center', weight: 700, color: C.ink2 });
      });
      STAGES.forEach((s, i) => {
        const on = Math.abs(i - t * (STAGES.length - 1)) < 0.55;
        const col = i === 0 ? C.heat : i === 1 ? C.cyan : i === 2 ? C.blue : C.green;
        rrect(ctx, xs[i] - 34, y - 28, 68, 56, 8);
        ctx.fillStyle = on ? alpha(col, 0.35) : alpha(col, 0.14); ctx.fill();
        ctx.strokeStyle = on ? col : C.ink3; ctx.lineWidth = on ? 2 : 1; ctx.stroke();
        // name sits ABOVE the box so the pipe through the box centre cannot strike it
        text(ctx, n ? s.short : s.name, xs[i], y - 36, { size: n ? 11 : 12, align: 'center', weight: 700, color: C.ink, halo: 3 });
      });
      // circulating heat particle on forward path
      const u = (pulse * 0.25) % 1;
      const seg = Math.min(STAGES.length - 2, Math.floor(u * (STAGES.length - 1)));
      const f = u * (STAGES.length - 1) - seg;
      const px = xs[seg] + (xs[seg + 1] - xs[seg]) * f;
      circle(ctx, px, seg ? y - 12 : y, 6, C.heat, '#fff', 1.5); // heat rides the warm legs
      // scrub rail
      const rl = pad + 20, rr = w - pad - 20, ry = h - 26;
      line(ctx, rl, ry, rr, ry, C.grid2, 4);
      STAGES.forEach((s, i) => {
        const x = rl + i / (STAGES.length - 1) * (rr - rl);
        circle(ctx, x, ry, 4, '#fff', C.ink3, 1.2);
        if (!n) text(ctx, s.short, x, ry + 16, { size: 10, align: 'center', color: C.ink3 });
      });
      circle(ctx, rl + t * (rr - rl), ry, 10, '#fff', C.heat, 3);
      R = { rl, rr, ry };
    },
  });
  fig.interact({
    panY: true, cursor: 'ew-resize',
    hit: (x, y) => (Math.abs(y - R.ry) < 26 ? 't' : null),
    down(k, x) { goal = null; t = clamp((x - R.rl) / (R.rr - R.rl), 0, 1); paint(); },
    move(k, x) { t = clamp((x - R.rl) / (R.rr - R.rl), 0, 1); paint(); },
    up() { goal = Math.round(t * (STAGES.length - 1)) / (STAGES.length - 1); },
  });
  const ro = readout(el);
  const paint = () => {
    const i = Math.round(t * (STAGES.length - 1));
    const names = ['the die (same object as above), conducting into the plate', 'the cold plate, in warm coolant of the TCS loop', 'a CDU / heat exchanger (schematic), passing it to the facility water (FWS) loop', 'outdoor towers or dry coolers; the cooled water returns'];
    ro.innerHTML = `Heat leaves <b>${names[i]}</b>. <span class="c-orange">Warm</span> legs carry it out, <span class="c-cyan">cooled</span> legs return. Geometry is schematic — not a site layout.`;
    fig.invalidate();
  };
  hint(el, 'drag along the loop; the particle keeps circulating when you let go.');
  paint();
}

function fmtDT(v) { return (v >= 100 ? Math.round(v) : v >= 10 ? v.toFixed(1) : v.toFixed(2)) + ' °C'; }
function mixHeat(dTv) { return dTv > 20 ? C.heat : dTv > 8 ? C.orange : C.cyan; }

// ---------- 3. Why it runs flat out: idle hardware against the price of power ----------
export function heatLoop(el) { try { if (window.AIX3D && window.AIX3D.heatLoop3d(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } heatLoop2d(el); }

export function idleCost(el) {
  let price = 85, R = {};
  const hwEurPerMWh = K.dgxH100USD / (K.dgxH100.maxW / 1000) * 1000 / (K.chipLifeYears * 8760) / K.usdPerEur; // $ per hour per MW of IT power
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 300 : 250), label: 'The cost of one hour of one megawatt of AI servers: wearing out the hardware against paying for the electricity',
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 14 : 150, r = w - 20, sx = v => l + v / 1000 * (r - l), y1 = n ? 64 : 50, y2 = n ? 134 : 110, bh = 30, ry = h - 44;
      text(ctx, 'hardware wearing out', n ? l : 10, n ? y1 - 8 : y1 + 20, { size: 12, color: C.ink2, weight: 600 });
      rrect(ctx, l, y1, sx(hwEurPerMWh) - l, bh, 5); ctx.fillStyle = C.compute; ctx.fill(); text(ctx, `$${Math.round(hwEurPerMWh)}`, sx(hwEurPerMWh) + 6, y1 + 20, { size: 12.5, weight: 700, color: C.compute });
      text(ctx, 'electricity', n ? l : 10, n ? y2 - 8 : y2 + 20, { size: 12, color: C.ink2, weight: 600 });
      const e0 = price * K.pue.best, e1 = price * K.pue.avg; rrect(ctx, l, y2, sx(e1) - l, bh, 5); ctx.fillStyle = alpha(C.heat, 0.4); ctx.fill(); rrect(ctx, l, y2, sx(e0) - l, bh, 5); ctx.fillStyle = C.heat; ctx.fill();
      text(ctx, `$${Math.round(e0).toLocaleString('en-GB')}–${Math.round(e1).toLocaleString('en-GB')}`, Math.min(sx(e1) + 6, w - 70), y2 + 20, { size: 12.5, weight: 700, color: C.heat });
      // price rail
      line(ctx, l, ry, r, ry, C.grid2, 4); [0, 250, 500, 750, 1000].forEach(v => { line(ctx, sx(v), ry - 5, sx(v), ry + 5, C.ink3, 1); text(ctx, `$${v}`, sx(v), ry + 22, { size: 10.5, align: 'center', color: C.ink3 }); });
      text(ctx, 'electricity price, $ per MWh (drag)', l, ry - 16, { size: 11, color: C.ink3, weight: 500 });
      circle(ctx, sx(price), ry, 11, '#fff', C.heat, 3); R = { sx, ry, l, r };
    },
  });
  const set = x => { price = clamp(Math.round((x - R.l) / (R.r - R.l) * 1000 / 5) * 5, 0, 1000); paint(); };
  fig.interact({ hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'p' : null), cursor: 'ew-resize', down(q, x) { set(x); }, move(q, x) { set(x); } });
  const ro = readout(el);
  const paint = () => { const be0 = hwEurPerMWh / K.pue.avg, be1 = hwEurPerMWh / K.pue.best; ro.innerHTML = `One megawatt-hour of H100 servers: <b>$${Math.round(hwEurPerMWh)}</b> of hardware wear, computing or not, and <b>$${Math.round(price * K.pue.best).toLocaleString('en-GB')}–${Math.round(price * K.pue.avg).toLocaleString('en-GB')}</b> of electricity. ${price * K.pue.best > hwEurPerMWh ? 'Pausing would save more than it wastes.' : `Pausing pays only above <b>$${Math.round(be0)}–${Math.round(be1)}/MWh</b>.`}`; fig.invalidate(); };
  hint(el, 'drag the electricity price up until pausing the servers would pay.');
  paint();
}

// ---------- 4. Thousands of GPUs breathing in step ----------
export function syncSwing(el) {
  let N = K.llama3GPUs, f = 0.3, t = 63, R = {};
  const md = (a, b) => ((a % b) + b) % b;
  const phase = s => { if (md(s, 30) > 26) return 'checkpoint'; return md(s, 10) < 8 ? 'compute' : 'talk'; };
  // No PUE here: chillers and the building do not follow sub-second steps. Only the GPUs' own 700 W (K.h100.tdpW) drops to f;
  // the rest of each server's 1.275 kW share (CPUs, NICs, fans) is held flat.
  const gpuMW = () => N * K.h100.tdpW / 1e6, fullMW = () => N * kWperGPU / 1000, lowMW = () => fullMW() - gpuMW() * (1 - f);
  const load = s => (phase(s) === 'compute' ? fullMW() : lowMW());
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 320 : 280), animated: true, label: 'The power drawn by a training cluster over a minute, swinging as all GPUs compute, then wait together',
    step(dt) { t += dt * 2; },
    draw(ctx, w, h) {
      const n = narrow(w), l = n ? 40 : 56, r = w - 16, top = 36, bot = h - 92, full = fullMW(), sy = v => bot - v / full * (bot - top) * 0.9;
      text(ctx, 'cluster power, MW', 10, 18, { size: 11, color: C.ink3, weight: 500 });
      [0, 0.5, 1].forEach(v => { const y = sy(v * full); line(ctx, l, y, r, y, C.grid, 1); text(ctx, `${+(v * full).toPrecision(2)}`, l - 6, y + 4, { size: 10.5, align: 'right', color: C.ink3 }); });
      const span = 60; ctx.save(); ctx.strokeStyle = C.heat; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 600; i++) { const s = t - span + i * span / 600, x = l + i / 600 * (r - l), y = sy(load(s)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
      const ph = phase(t); text(ctx, ph === 'compute' ? 'all GPUs computing' : ph === 'talk' ? 'all GPUs waiting for each other' : 'all GPUs waiting for a checkpoint to save', r, top - 6, { size: 12, align: 'right', weight: 650, color: ph === 'compute' ? C.heat : C.ink2 });
      text(ctx, '← the last 60 seconds', r, bot + 16, { size: 10.5, align: 'right', color: C.ink3 });
      // GPU-count rail
      const ry = h - 36, gx = v => l + (L10(v) - 3) / 2 * (r - l); line(ctx, l, ry, r, ry, C.grid2, 4); [1e3, 1e4, 1e5].forEach(v => { line(ctx, gx(v), ry - 5, gx(v), ry + 5, C.ink3, 1); text(ctx, `${(v).toLocaleString('en-GB')} GPUs`, gx(v), ry + 22, { size: 10.5, align: v === 1e5 ? 'right' : v === 1e3 ? 'left' : 'center', color: C.ink3 }); });
      circle(ctx, gx(N), ry, 11, '#fff', C.heat, 3); R = { gx, ry, l, r };
    },
  });
  const setN = x => { N = Math.round(clamp(10 ** (3 + (x - R.l) / (R.r - R.l) * 2), 1000, 1e5) / 8) * 8; paint(); };
  fig.interact({ hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'n' : null), cursor: 'ew-resize', down(q, x) { setN(x); }, move(q, x) { setN(x); } });
  const ctl = controls(el);
  slider(ctl, { label: 'GPU power while waiting, share of 700 W (illustrative)', name: 'f', min: 0.1, max: 0.9, step: 0.05, value: f, color: C.heat, fmt: v => `${Math.round(v * 100)}%`, oninput: v => { f = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const full = fullMW(), low = lowMW(); ro.innerHTML = `<b>${N.toLocaleString('en-GB')} GPUs</b> swing between about <b>${+full.toPrecision(2)} MW</b> and <b>${+low.toPrecision(2)} MW</b> within a second: a <b>${+(full - low).toPrecision(2)} MW</b> jump at every sync or checkpoint.`; fig.invalidate(); };
  hint(el, 'drag the GPU count up from Meta’s 16,384 towards 100,000.');
  paint();
}

// ---------- 5. Where the terawatt-hours go: 2015–2035 by region, the IEA's case range, and a country to compare ----------
export function regionsTWh(el) {
  const RC = [C.blue, C.red, C.cyan, C.yellow, C.ink3], G = DC.global, RG = DC.regions, CS = DC.cases;
  let yr = 2030, cmp = null, R = {};
  const tot = y => (y <= 2025 && y >= G.from ? G.v[y - G.from] : CS.v[y - CS.from][0]);
  const caseAt = (y, i) => (y < CS.from ? null : CS.v[y - CS.from][i]);
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 400 : 380), label: 'Data-centre electricity by year from 2015 to 2035: measured to 2024, then the IEA’s Base Case by region to 2030, with the range across its four cases to 2035',
    draw(ctx, w, h) {
      const n = narrow(w), L = n ? 40 : 54, Rm = n ? 14 : 118, T = 30, B = h - 34, max = 1800;
      const xs = y => L + (y - 2015) / 20 * (w - L - Rm), ys = v => B - v / max * (B - T);
      for (let v = 0; v <= max; v += 300) { line(ctx, L, ys(v), w - Rm, ys(v), C.grid, 1); text(ctx, v.toLocaleString('en-GB'), L - 6, ys(v) + 4, { size: 10.5, align: 'right', color: C.ink3 }); }
      for (let y = 2015; y <= 2035; y += 5) if (Math.abs(xs(y) - clamp(xs(yr), L + 22, w - 24)) > 40) text(ctx, String(y), xs(y), B + 18, { size: 11, align: 'center', color: C.ink3 });
      text(ctx, 'TWh a year', L, T - 14, { size: 11, color: C.ink2 });
      // projection shading after the last measured year
      ctx.fillStyle = alpha(C.ink3, 0.06); ctx.fillRect(xs(DC.lastActual), T, w - Rm - xs(DC.lastActual), B - T);
      text(ctx, 'measured', xs(DC.lastActual) - 6, T + 12, { size: 10.5, align: 'right', color: C.ink3 }); text(ctx, 'IEA cases', xs(DC.lastActual) + 6, T + 12, { size: 10.5, color: C.ink3 });
      // case range band, Headwinds to Lift-Off
      ctx.beginPath(); for (let y = 2024; y <= 2035; y++) ctx.lineTo(xs(y), ys(caseAt(y, 1))); for (let y = 2035; y >= 2024; y--) ctx.lineTo(xs(y), ys(caseAt(y, 3))); ctx.closePath(); ctx.fillStyle = alpha(C.heat, 0.14); ctx.fill();
      // 2015–2019: world total only
      ctx.beginPath(); ctx.moveTo(xs(2015), ys(0)); for (let y = 2015; y <= 2020; y++) ctx.lineTo(xs(y), ys(G.v[y - 2015])); ctx.lineTo(xs(2020), ys(0)); ctx.closePath(); ctx.fillStyle = alpha(C.ink3, 0.35); ctx.fill();
      // 2020–2030: stacked regions (Base Case after 2024)
      const ys0 = [...Array(11)].map(() => 0);
      RG.names.forEach((nm, r) => { ctx.beginPath(); for (let i = 0; i <= 10; i++) ctx.lineTo(xs(2020 + i), ys(ys0[i] + RG.v[i][r])); for (let i = 10; i >= 0; i--) ctx.lineTo(xs(2020 + i), ys(ys0[i])); ctx.closePath(); ctx.fillStyle = alpha(RC[r], 0.82); ctx.fill(); for (let i = 0; i <= 10; i++) ys0[i] += RG.v[i][r]; });
      // case lines
      const caseLine = (i, col, dash, wd) => { ctx.save(); ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.beginPath(); for (let y = 2024; y <= 2035; y++) ctx.lineTo(xs(y), ys(caseAt(y, i))); ctx.stroke(); ctx.restore(); };
      caseLine(1, C.heat, [5, 4], 1.5); caseLine(3, C.heat, [5, 4], 1.5); caseLine(2, C.ink2, [2, 3], 1.5); caseLine(0, C.ink, [], 2.2);
      ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 2.2; ctx.beginPath(); for (let y = 2015; y <= 2024; y++) ctx.lineTo(xs(y), ys(G.v[y - 2015])); ctx.stroke(); ctx.restore();
      if (!n) { const lab = [[1, 'Lift-Off', C.heat], [0, 'Base', C.ink], [2, 'High Efficiency', C.ink2], [3, 'Headwinds', C.heat]]; let lastY = -99;
        lab.forEach(([i, nm, col]) => { let y = ys(caseAt(2035, i)) + 4; if (y - lastY < 26) y = lastY + 26; lastY = y; text(ctx, nm, xs(2035) + 8, y - 6, { size: 11.5, weight: 650, color: col }); text(ctx, `${caseAt(2035, i).toLocaleString('en-GB')} TWh`, xs(2035) + 8, y + 8, { size: 10.5, color: C.ink3 }); }); }
      else { // phone: short names inside the plot, right-aligned just above each line's 2035 end
        const lab = [[1, 'Lift-Off', C.heat], [0, 'Base', C.ink], [2, 'High Eff.', C.ink2], [3, 'Headwinds', C.heat]]; let lastY = -99;
        lab.forEach(([i, nm, col]) => { let y = ys(caseAt(2035, i)) - 5; if (y - lastY < 13) y = lastY + 13; lastY = y; text(ctx, nm, xs(2035) - 3, y, { size: 10.5, weight: 650, align: 'right', color: col, halo: 3 }); }); }
      // regions labelled inside their own bands (no key); bands too thin for a label are named in the readout
      { const SH = ['US', 'China', 'Europe', n ? 'Asia' : 'Asia excl. China', 'rest']; const yi = 2028 - 2020; let acc = 0;
        RG.names.forEach((nm, r) => { const v = RG.v[yi][r], y0 = ys(acc), y1 = ys(acc + v); acc += v; if (y0 - y1 < 15) return;
          text(ctx, SH[r], xs(2028), (y0 + y1) / 2 + 4, { size: n ? 10 : 11, weight: 650, align: 'center', color: r === 3 ? C.ink : '#fff' }); }); }
      if (xs(2020) - xs(2015) > 70) text(ctx, 'world only', (xs(2015) + xs(2020)) / 2, ys(G.v[3] / 2) + 4, { size: 10.5, align: 'center', color: C.ink2 });
      // country to compare
      if (cmp) { const v = COUNTRY_TWH[cmp], y = ys(v); ctx.save(); ctx.setLineDash([6, 4]); line(ctx, L, y, w - Rm, y, C.red, 1.6); ctx.restore(); const lab = `all of ${cmp === 'United Kingdom' ? 'the UK' : cmp}’s electricity, ${Math.round(v)} TWh (2024)`; ctx.font = '650 11px Inter, system-ui, sans-serif'; const lw = ctx.measureText(lab).width; rrect(ctx, L + 4, y - 19, lw + 10, 17, 4); ctx.fillStyle = 'rgba(251,250,246,0.92)'; ctx.fill(); text(ctx, lab, L + 9, y - 6, { size: 11, weight: 650, color: C.red }); }
      // year cursor
      const cx = xs(yr); line(ctx, cx, T, cx, B, C.ink, 1.2); circle(ctx, cx, ys(tot(yr)), 5, '#fff', C.ink, 2);
      const tx = clamp(cx, L + 22, w - 24); rrect(ctx, tx - 22, B - 2, 44, 20, 6); ctx.fillStyle = C.ink; ctx.fill(); text(ctx, String(yr), tx, B + 12, { size: 11.5, align: 'center', weight: 700, color: '#fff' });
      R = { xs, L, Rm, w };
    },
  });
  const set = x => { const y = clamp(Math.round(2015 + (x - R.L) / (R.w - R.L - R.Rm) * 20), 2015, 2035); if (y !== yr) { yr = y; paint(); } };
  fig.interact({ panY: true, hit: () => 'y', cursor: 'ew-resize', down(q, x) { set(x); }, move(q, x) { set(x); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Compare with a country', value: null, options: [{ label: 'none', value: null, name: 'rg-none' }, { label: 'UK', value: 'United Kingdom', name: 'rg-uk' }, { label: 'France', value: 'France', name: 'rg-fr' }, { label: 'Japan', value: 'Japan', name: 'rg-jp' }], onchange: v => { cmp = v; paint(); } });
  const ro = readout(el);
  const paint = () => {
    const f = v => Math.round(v).toLocaleString('en-GB');
    let s;
    if (yr < 2020) s = `<b>${yr}</b>: data centres worldwide used about <b>${f(tot(yr))} TWh</b> (IEA estimate; no regional split before 2020).`;
    else if (yr <= 2030) { const r = RG.v[yr - 2020]; s = `<b>${yr}</b>${yr > DC.lastActual ? ' (IEA Base Case)' : yr === DC.lastActual ? '' : ''}: <b>${f(r.reduce((a, b) => a + b, 0))} TWh</b> in all; United States ${f(r[0])}, China ${f(r[1])}, Europe ${f(r[2])}, Asia excluding China ${f(r[3])}, rest of world ${f(r[4])}.${yr > DC.lastActual ? ` Across the IEA’s cases, ${f(caseAt(yr, 3))}–${f(caseAt(yr, 1))} TWh.` : ''}`; }
    else s = `<b>${yr}</b> (no regional split): <b>${f(caseAt(yr, 3))}</b> (Headwinds) to <b>${f(caseAt(yr, 1))} TWh</b> (Lift-Off); Base ${f(caseAt(yr, 0))}, High Efficiency ${f(caseAt(yr, 2))}. Scenarios, not forecasts.`;
    if (cmp) { const v = COUNTRY_TWH[cmp], nm = cmp === 'United Kingdom' ? 'The UK' : cmp, first = [...Array(21)].map((_, i) => 2015 + i).find(y => tot(y) >= v); s += ` ${nm} used ${f(v)} TWh of electricity in 2024 for everything${first ? `; the world’s data centres pass that in ${first <= DC.lastActual ? '' : 'the Base Case in '}${first}` : ', more than the Base Case reaches by 2035'}.`; }
    ro.innerHTML = s; fig.invalidate();
  };
  hint(el, 'drag across the chart to read any year, and pick a country to compare.');
  paint();
}

// ---------- 3. One megawatt-hour from the meter to the GPUs ----------
export function mwhFlow(el) {
  let pue = K.pue.best, R = {};
  const P0 = 1.0, P1 = 2.0, gpuShare = K.h100.tdpW * K.dgxH100.gpus / K.dgxH100.maxW; // 5.6 of 10.2 kW
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 430 : 380), label: 'One megawatt-hour from the meter: how much goes to cooling and power conversion, how much to the servers, and how much to the GPU chips themselves',
    draw(ctx, w, h) {
      const n = narrow(w), T = 34, Hh = h - 140, gap = 16, scale = Hh / 1000;
      const it = 1000 / pue, ov = 1000 - it, gpu = it * gpuShare, rest = it - gpu;
      const x0 = n ? 14 : 70, x1 = n ? w * 0.27 : w * 0.36, x2 = n ? w * 0.52 : w * 0.64, bw = 12;
      const band = (xa, ya, xb, yb, th, col) => { const m = (xa + xb) / 2; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.bezierCurveTo(m, ya, m, yb, xb, yb); ctx.lineTo(xb, yb + th); ctx.bezierCurveTo(m, yb + th, m, ya + th, xa, ya + th); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
      // column 0: the meter
      rrect(ctx, x0, T, bw, 1000 * scale, 3); ctx.fillStyle = C.ink; ctx.fill();
      text(ctx, n ? '1 MWh' : '1 MWh from', x0 + (n ? 0 : -8), T - 18, { size: 12.5, weight: 750, color: C.ink, align: n ? 'left' : 'right' });
      if (!n) text(ctx, 'the meter', x0 - 8, T - 4, { size: 12.5, weight: 750, color: C.ink, align: 'right' });
      // column 1: servers (IT) above, building overhead below
      const yIT = T, yOV = T + it * scale + gap;
      band(x0 + bw, T, x1, yIT, it * scale, alpha(C.compute, 0.28)); band(x0 + bw, T + it * scale, x1, yOV, ov * scale, alpha(C.heat, 0.35));
      rrect(ctx, x1, yIT, bw, it * scale, 3); ctx.fillStyle = C.compute; ctx.fill();
      rrect(ctx, x1, yOV, bw, Math.max(2, ov * scale), 3); ctx.fillStyle = C.heat; ctx.fill();
      const ovMid = yOV + ov * scale / 2;
      text(ctx, `${Math.round(ov)} kWh`, x1 + bw + 8, ovMid - 2, { size: 13, weight: 750, color: C.heat });
      text(ctx, n ? 'cooling, power losses, lights' : 'cooling, power conversion losses, lighting', x1 + bw + 8, ovMid + 13, { size: 11, color: C.ink2 });
      // column 2: inside the servers, the GPUs and everything else
      const yG = T, yR = T + gpu * scale + gap;
      band(x1 + bw, yIT, x2, yG, gpu * scale, alpha(C.compute, 0.42)); band(x1 + bw, yIT + gpu * scale, x2, yR, rest * scale, alpha(C.compute, 0.2));
      rrect(ctx, x2, yG, bw, gpu * scale, 3); ctx.fillStyle = C.compute; ctx.fill(); rrect(ctx, x2, yR, bw, rest * scale, 3); ctx.fillStyle = alpha(C.compute, 0.55); ctx.fill();
      text(ctx, `${Math.round(it)} kWh`, (x0 + bw + x1) / 2, yIT + it * scale / 2 - 4, { size: 13, weight: 750, color: C.compute, align: 'center' }); text(ctx, n ? 'to servers' : 'into the servers', (x0 + bw + x1) / 2, yIT + it * scale / 2 + 12, { size: 11, color: C.ink2, align: 'center' });
      const lx = x2 + bw + 8;
      text(ctx, `${Math.round(gpu)} kWh`, lx, yG + gpu * scale / 2 - 8, { size: 13, weight: 750, color: C.compute });
      text(ctx, 'in the eight GPU chips', lx, yG + gpu * scale / 2 + 7, { size: 11, color: C.ink2 });
      text(ctx, `${Math.round(rest)} kWh`, lx, yR + rest * scale / 2 - 8, { size: 13, weight: 750, color: alpha(C.compute, 0.85) });
      text(ctx, n ? 'CPUs, memory, fans…' : 'processors, memory, network, fans, PSUs', lx, yR + rest * scale / 2 + 7, { size: 11, color: C.ink2 });
      // result
      const gh = 1000 / (kWperGPU * pue);
      text(ctx, `= ${Math.round(gh)} GPU-hours`, n ? lx : lx, yG + gpu * scale / 2 + 26, { size: n ? 13 : 14, weight: 750, color: C.ink });
      text(ctx, 'every kWh ends as heat', w - 12, T - 10, { size: 10.5, align: 'right', color: C.ink3 });
      // PUE rail
      const rl = n ? 26 : 70, rr = w - 26, ry = h - 40, sx = v => rl + (v - P0) / (P1 - P0) * (rr - rl);
      line(ctx, rl, ry, rr, ry, C.grid2, 4); rrect(ctx, rl, ry - 2, sx(pue) - rl, 4, 2); ctx.fillStyle = C.heat; ctx.fill();
      [[1.0, '1.0'], [1.5, '1.5'], [2.0, '2.0']].forEach(([v, s]) => text(ctx, s, sx(v), ry + 22, { size: 10.5, align: 'center', color: C.ink3 }));
      [[K.pue.best, n ? 'Google' : 'Google 1.09'], [K.pue.avg, n ? 'Uptime avg' : 'Uptime survey 1.56']].forEach(([v, s], i) => { line(ctx, sx(v), ry - 9, sx(v), ry + 9, C.ink2, 1.5); text(ctx, s, sx(v), ry - 14 - i * 12, { size: 10.5, align: 'center', weight: 600, color: C.ink2 }); });
      text(ctx, `PUE ${pue.toFixed(2)}`, rl, ry - 30, { size: 12, weight: 700, color: C.ink });
      circle(ctx, sx(pue), ry, 11, '#fff', C.heat, 3);
      R = { rl, rr, ry };
    },
  });
  const set = x => { pue = Math.round(clamp(P0 + (x - R.rl) / (R.rr - R.rl) * (P1 - P0), 1.02, P1) * 100) / 100; paint(); };
  fig.interact({ panY: true, cursor: 'ew-resize', hit: (x, y) => (Math.abs(y - R.ry) < 30 ? 'p' : null), down(q, x) { set(x); }, move(q, x) { set(x); } });
  const ro = readout(el);
  const paint = () => { const it = 1000 / pue, gh = 1000 / (kWperGPU * pue); ro.innerHTML = `PUE <b>${pue.toFixed(2)}</b>: ${Math.round(1000 - it)} of every 1,000 kWh never reach a server; ${Math.round(gpuShare * 100)}% of the rest feeds the GPUs. That buys <b>${Math.round(gh)} GPU-hours</b>.`; fig.invalidate(); };
  hint(el, 'drag the PUE along the line, between Google’s fleet and the industry survey average.');
  paint();
}
