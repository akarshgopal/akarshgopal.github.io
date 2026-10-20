import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, lerp, axes, pathLine, tag, approach } from '../lib/draw.js';
import { controls, slider, segmented, button, readout } from '../lib/ui.js';
import { drawStator, drawRotor, drawWinding, COPPER } from '../lib/machine.js';

const VOLTS = [0.4, 10, 20, 110, 220, 380, 765];

function city(ctx, x, y, w, lit) {
  const b = [[0, 46, 18], [20, 70, 22], [46, 38, 16], [66, 58, 20], [90, 30, 14]];
  for (const [dx, hh, ww] of b) {
    const bx = x + dx * w / 104, bw = ww * w / 104;
    ctx.fillStyle = '#d8d1c3'; ctx.fillRect(bx, y - hh, bw, hh);
    for (let r = 0; r < Math.floor(hh / 10); r++) for (let c = 0; c < Math.floor(bw / 7); c++) {
      const on = ((r * 7 + c * 13 + dx) % 10) / 10 < lit;
      ctx.fillStyle = on ? '#f4c84f' : '#bfb7a8';
      ctx.fillRect(bx + 2 + c * 7, y - hh + 4 + r * 10, 3.5, 5);
    }
  }
}

function plant(ctx, x, y) {
  ctx.fillStyle = '#d8d1c3'; ctx.fillRect(x, y - 40, 50, 40);
  ctx.beginPath(); ctx.moveTo(x + 56, y); ctx.quadraticCurveTo(x + 62, y - 30, x + 58, y - 62); ctx.lineTo(x + 84, y - 62); ctx.quadraticCurveTo(x + 80, y - 30, x + 86, y); ctx.closePath();
  ctx.fillStyle = '#e4ded2'; ctx.fill(); ctx.strokeStyle = '#cbc3b4'; ctx.stroke();
}

// ---------------------------------------------------------------------------
// F10: I²R losses vs voltage
// ---------------------------------------------------------------------------
export function losses(el) {
  const st = { vi: 5, km: 300, MW: 1000, flow: 0 };
  const R_KM = 0.03;
  const calc = () => {
    const V = VOLTS[st.vi] * 1e3, P = st.MW * 1e6, R = R_KM * st.km;
    const I = P / (Math.sqrt(3) * V);
    const loss = P * P * R / (V * V);
    return { V, I, loss: loss / 1e6, frac: loss / P };
  };
  const fig = new Fig(el, {
    label: 'A power station sending electricity over a long line to a city; the line heats up and wastes power at low voltage',
    height: w => Math.max(280, Math.min(340, w * 0.4)),
    animated: true,
    step(dt) { const r = calc(); st.flow += dt * clamp(Math.log10(r.I + 1) - 1.5, 0.2, 4) * 0.25; },
    draw(ctx, w, h) {
      const r = calc();
      const ground = h * 0.66;
      line(ctx, 10, ground, w - 10, ground, C.grid2, 1.5);
      plant(ctx, 18, ground);
      const lit = clamp(1 - r.frac, 0, 1);
      city(ctx, w - 128, ground, 110, lit);
      // towers
      const x0 = 120, x1 = w - 140; const nT = Math.max(3, Math.round((x1 - x0) / 120));
      const towers = []; for (let i = 0; i <= nT; i++) towers.push(x0 + (x1 - x0) * i / nT);
      const tH = 70;
      for (const tx of towers) {
        ctx.strokeStyle = '#a69e8f'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(tx - 10, ground); ctx.lineTo(tx, ground - tH); ctx.lineTo(tx + 10, ground); ctx.moveTo(tx - 16, ground - tH + 12); ctx.lineTo(tx + 16, ground - tH + 12); ctx.moveTo(tx - 7, ground - 25); ctx.lineTo(tx + 7, ground - 25); ctx.stroke();
      }
      // conductors (3 phases)
      const heat = clamp(Math.sqrt(r.frac * 2.5), 0, 1);
      const wireCol = mix('#7b7468', '#e8552c', heat);
      for (const dy of [-tH + 12, -tH + 12, -tH + 22]) {
        for (let i = 0; i < towers.length - 1; i++) {
          const a = towers[i], b = towers[i + 1], sag = 12 + heat * 10;
          const off = dy === -tH + 22 ? 0 : 0;
          ctx.beginPath(); ctx.moveTo(a + (dy === -tH + 22 ? 0 : 0), ground + dy); ctx.quadraticCurveTo((a + b) / 2, ground + dy + sag * 2, b, ground + dy);
          ctx.strokeStyle = wireCol; ctx.lineWidth = 1.6 + heat * 1.5; ctx.stroke();
          if (heat > 0.2) { ctx.strokeStyle = alpha('#ff8a4a', heat * 0.25); ctx.lineWidth = 8; ctx.stroke(); }
          void off;
        }
      }
      // current dots on main conductor
      const nd = clamp(Math.round(Math.log10(r.I) * 6), 4, 30);
      for (let k = 0; k < nd; k++) {
        const u = ((k / nd + st.flow) % 1);
        const xx = x0 + u * (x1 - x0);
        const seg = Math.min(towers.length - 2, Math.floor(u * nT)); const lu = u * nT - seg;
        const sag = 12 + heat * 10;
        const yy = ground - tH + 12 + 2 * lu * (1 - lu) * sag * 2 * 0.5 * 2;
        circle(ctx, xx, yy, 2.6, C.electron);
      }
      text(ctx, VOLTS[st.vi] + ' kV', (x0 + x1) / 2, ground - tH - 10, { size: 13, color: C.ink, weight: 650, align: 'center' });
      text(ctx, st.km + ' km', (x0 + x1) / 2, ground + 18, { size: 11, color: C.ink3, align: 'center' });
      // bar: delivered vs lost
      const bx = 40, bw = w - 80, by = h - 40, bh = 16;
      const lost = clamp(r.frac, 0, 1);
      rrect(ctx, bx, by, bw, bh, 8); ctx.fillStyle = '#ece8df'; ctx.fill();
      ctx.save(); rrect(ctx, bx, by, bw, bh, 8); ctx.clip();
      ctx.fillStyle = alpha(C.storage, 0.8); ctx.fillRect(bx, by, bw * (1 - lost), bh);
      ctx.fillStyle = alpha(C.hot, 0.85); ctx.fillRect(bx + bw * (1 - lost), by, bw * lost, bh);
      ctx.restore();
      text(ctx, r.frac >= 1 ? 'nothing arrives: all lost as heat — the line would melt long before this' : `arrives: ${((1 - lost) * 100).toFixed(1)}%`, bx, by - 6, { size: 11.5, color: r.frac >= 1 ? C.hot : C.storage, weight: 600 });
      if (r.frac < 1) text(ctx, `lost as heat: ${(lost * 100).toFixed(lost < 0.01 ? 2 : 1)}%`, bx + bw, by - 6, { size: 11.5, color: C.hot, weight: 600, align: 'right' });
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => { const r = calc(); ro.innerHTML = `Current in each wire: <b>${r.I >= 1000 ? (r.I / 1000).toFixed(1) + ' kA' : r.I.toFixed(0) + ' A'}</b>. Heat lost: <b>${r.loss >= 1e4 ? '∞' : r.loss.toFixed(r.loss < 10 ? 1 : 0)} MW</b> of the ${st.MW} MW sent. Losses fall with the <i>square</i> of voltage.`; fig.invalidate(); };
  slider(ctl, { label: 'Line voltage', min: 0, max: VOLTS.length - 1, step: 1, value: st.vi, color: C.network, fmt: v => VOLTS[v] + ' kV', oninput: v => { st.vi = v; upd(); }, name: 'kv' });
  slider(ctl, { label: 'Distance', min: 10, max: 800, step: 10, value: st.km, color: C.ink2, fmt: v => v + ' km', oninput: v => { st.km = v; upd(); } });
  slider(ctl, { label: 'Power sent', min: 50, max: 2000, step: 50, value: st.MW, color: C.storage, fmt: v => v + ' MW', oninput: v => { st.MW = v; upd(); } });
  upd();
}

// ---------------------------------------------------------------------------
// F11: transformer
// ---------------------------------------------------------------------------
export function transformer(el) {
  // The end of the generator chain: the same machine (lib/machine.js, phase A's coil in copper) feeds a coil on an iron core.
  const st = { ratio: 380 / 21, ph: 0, ang: 0 }; // 21 kV generator to the 380 kV grid
  const V1 = 21; // kV generator terminal (typical order of magnitude)
  const PMW = 500;
  const fig = new Fig(el, {
    label: 'The generator from the first essay feeds a transformer: two coils on an iron core. The ratio of turns sets how voltage and current trade off',
    height: w => w < 560 ? 560 : Math.max(320, Math.min(380, w * 0.44)),
    animated: true,
    step(dt) { st.ph += dt * 2 * Math.PI * 0.5; st.ang = st.ph; },
    draw(ctx, w, h) {
      const narrow = w < 560;
      // the generator, small, with its coil in copper as in section 2
      const gR = narrow ? 34 : 40, gx = gR + 26, gy = narrow ? 128 : h * 0.4;
      const e = Math.sin(st.ang);
      drawStator(ctx, gx, gy, gR, [{ a: Math.PI, col: COPPER, e }, { a: 0, col: COPPER, e: -e }]);
      drawRotor(ctx, gx, gy, gR * 0.78, st.ang, 1);
      // core
      const t = narrow ? 22 : 26, x0 = gx + gR + 46, cw = narrow ? w - x0 - 16 : w * 0.42 - x0 + 70, ch = narrow ? 220 : Math.min(h - 90, 230), cy = gy - ch / 2;
      rrect(ctx, x0, cy, cw, ch, 14); ctx.fillStyle = '#c9c2b4'; ctx.fill();
      rrect(ctx, x0 + t, cy + t, cw - 2 * t, ch - 2 * t, 6); ctx.fillStyle = C.paper; ctx.fill();
      // flux circulating in the core, brightness with its size
      const flux = Math.cos(st.ph), per = 2 * (cw - t) + 2 * (ch - t);
      for (let k = 0; k < 26; k++) {
        let d = (((k / 26 + Math.sin(st.ph) * 0.06) % 1) + 1) % 1 * per;
        const L1 = cw - t, L2 = ch - t; let x, y; const ox = x0 + t / 2, oy = cy + t / 2;
        if (d < L1) { x = ox + d; y = oy; } else if ((d -= L1) < L2) { x = ox + L1; y = oy + d; } else if ((d -= L2) < L1) { x = ox + L1 - d; y = oy + L2; } else { d -= L1; x = ox; y = oy + L2 - d; }
        circle(ctx, x, y, 2.2, alpha(C.nuclear, 0.25 + 0.6 * Math.abs(flux)));
      }
      // wires from the generator's coil to the primary
      const px = x0 + t / 2, sxw = x0 + cw - t / 2;
      line(ctx, gx, gy - gR - 18, gx, cy - 10, COPPER, 2); line(ctx, gx, cy - 10, px, cy - 10, COPPER, 2); line(ctx, px, cy - 10, px, cy + t + 4, COPPER, 2);
      line(ctx, gx, gy + gR + 18, gx, cy + ch + 10, COPPER, 2); line(ctx, gx, cy + ch + 10, px, cy + ch + 10, COPPER, 2); line(ctx, px, cy + ch + 10, px, cy + ch - t - 4, COPPER, 2);
      text(ctx, 'generator', gx, gy + gR + 34, { size: 11, color: C.ink3, align: 'center', halo: 8 }); // after the lead, so the lead passes behind it
      const n1 = 6, n2 = clamp(Math.round(6 * st.ratio / 6), 1, 36);
      drawWinding(ctx, px, cy + t + 4, cy + ch - t - 4, n1, COPPER, t);
      drawWinding(ctx, sxw, cy + t + 4, cy + ch - t - 4, n2, '#b4703d', t);
      line(ctx, sxw, cy + t + 4, sxw, cy - 10, '#b4703d', 2); line(ctx, sxw, cy - 10, sxw + (narrow ? 10 : 30), cy - 10, '#b4703d', 2);
      text(ctx, 'to the grid', sxw + (narrow ? 0 : 30), Math.max(12, cy - 16), { size: 11, color: C.ink3, align: 'right' });
      text(ctx, `${n1 * 10} turns`, px, cy + ch + 28, { size: 11, color: C.ink2, align: 'center' });
      text(ctx, `${Math.round(n1 * 10 * st.ratio).toLocaleString('en')} turns`, sxw, cy + ch + 28, { size: 11, color: C.ink2, align: 'center' });
      // waveforms: two panels on linear scales, in and out drawn together, so the trade is visible as it is:
      // voltage goes up by the turns ratio while current goes down by it
      const V2 = V1 * st.ratio, I1 = PMW / V1, I2 = I1 / st.ratio; // kA, single-phase as drawn: I = P / V
      const panels = [['voltage', 'kV', C.field, V1, V2], ['current', 'kA', C.electron, I1, I2]];
      const bx = narrow ? 16 : x0 + cw + 70, bw = narrow ? w - 32 : w - bx - 20;
      const top = narrow ? cy + ch + 46 : 20, ph = narrow ? (h - top - 16) / 2 : (h - 30) / 2;
      const fmtv = (v, u) => (v < 10 ? v.toFixed(2) : u === 'kA' && v < 100 ? v.toFixed(1) : v.toFixed(0));
      panels.forEach(([lab, unit, col, vin, vout], i) => {
        const y0 = top + i * ph + ph / 2 + 8, big = Math.max(vin, vout), A = ph * 0.32;
        line(ctx, bx, y0, bx + bw, y0, C.grid2, 1);
        for (const [v, c, wdt] of [[vin, alpha(col, 0.45), 2], [vout, col, 2.2]]) {
          const amp = A * v / big, pts = [];
          for (let k = 0; k <= 120; k++) pts.push([bx + k / 120 * bw, y0 - Math.sin(st.ph - k / 120 * 4 * Math.PI) * amp]);
          pathLine(ctx, pts, c, wdt);
        }
        text(ctx, lab, bx, y0 - ph / 2 + 4, { size: 11, color: C.ink3 });
        text(ctx, `in ${fmtv(vin, unit)} ${unit}`, bx + bw - 92, y0 - ph / 2 + 4, { size: 11.5, color: alpha(col, 0.75), align: 'right', weight: 600 });
        text(ctx, `out ${fmtv(vout, unit)} ${unit}`, bx + bw, y0 - ph / 2 + 4, { size: 11.5, color: col, align: 'right', weight: 700 });
      });
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => { const V2 = V1 * st.ratio, I1 = PMW / V1, I2 = I1 / st.ratio; const fI = i => i >= 1 ? i.toFixed(i < 10 ? 2 : 1) + ' kA' : Math.round(i * 1000) + ' A'; ro.innerHTML = `${PMW} MW goes in at ${V1} kV and <b>${fI(I1)}</b>; it comes out at <b>${V2.toFixed(0)} kV</b> and <b>${fI(I2)}</b>. Voltage × current is unchanged, minus a fraction of a per cent of heat in a good transformer.`; fig.invalidate(); };
  slider(ctl, { label: 'Turns ratio (grid : generator)', min: 0.2, max: 20, step: 'any', value: st.ratio, color: '#b4703d', fmt: v => v.toFixed(1) + ' : 1', oninput: v => { st.ratio = v; upd(); } });
  upd();
}
