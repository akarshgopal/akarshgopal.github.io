// Yardstick: energy sinks on a log scale, plus a Sankey of primary → final → end-uses vs the three rung bars.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line, clamp } from '../lib/draw.js';
import { controls, slider, readout, hint } from '../lib/ui.js';
import { publish } from '../lib/lean.js';
import { loadPrefs, patchAct1, savePrefs } from '../lib/prefs.js';
import * as M from '../lib/model.js';

const SINKS = [
  { name: 'AI inference today (derived)', twh: M.M0, color: C.heat, tag: 'derived' },
  { name: 'All data centres, 2025', twh: 485, color: C.orange, tag: 'IEA' },
  { name: 'Space cooling, 2025', twh: 2900, color: C.cyan, tag: 'IEA' },
  { name: 'R1 bar (10% of electricity, 2035)', twh: 3800, color: C.ink, tag: 'bar', bar: 1 },
  { name: 'R2 bar (cooling-class, 2050)', twh: 6000, color: C.ink, tag: 'bar', bar: 1 },
  { name: 'Buildings heat (space + water, 2021)', twh: 17200, color: C.violet, tag: 'real' },
  { name: 'R3 bar (= buildings heat)', twh: 17200, color: C.ink, tag: 'bar', bar: 1 },
  { name: 'World electricity, 2025', twh: 28200, color: C.blue, tag: 'IEA' },
  { name: 'World primary energy, 2025', twh: 166800, color: C.green, tag: 'EI' },
];

export function yardstickBars(el) {
  const fig = new Fig(el, {
    height: w => (w < 640 ? 420 : 380),
    label: 'Annual energy of major sinks on a log scale, against the three rung bars of the thesis',
    draw(ctx, w, h) {
      const n = w < 640, l = n ? 8 : 14, r = w - 14, t = 28, b = h - 28;
      const rows = SINKS, rh = (b - t) / rows.length;
      const x0 = n ? 150 : 280, xmin = 30, xmax = 2e5;
      const xs = v => x0 + (Math.log10(clamp(v, xmin, xmax)) - Math.log10(xmin)) / (Math.log10(xmax) - Math.log10(xmin)) * (r - x0);
      text(ctx, 'TWh a year (log)', x0, 16, { size: 11, color: C.ink3, weight: 600 });
      [100, 1000, 10000, 100000].forEach(v => {
        line(ctx, xs(v), t, xs(v), b, C.grid, 1);
        text(ctx, v >= 1000 ? `${v / 1000}k` : String(v), xs(v), b + 14, { size: 10.5, align: 'center', color: C.ink3 });
      });
      rows.forEach((s, i) => {
        const y = t + i * rh + 4, bh = rh - 8;
        text(ctx, s.name, x0 - 8, y + bh / 2 + 4, { size: n ? 10 : 11.5, align: 'right', color: s.bar ? C.ink : C.ink2, weight: s.bar ? 700 : 500 });
        const x = xs(s.twh), bw = Math.max(3, x - xs(xmin * 1.05));
        rrect(ctx, xs(xmin * 1.05), y, bw, bh, 4);
        ctx.fillStyle = s.bar ? alpha(C.ink, 0.14) : alpha(s.color, 0.35); ctx.fill();
        ctx.strokeStyle = s.bar ? C.ink : s.color; ctx.lineWidth = s.bar ? 2 : 1;
        if (s.tag === 'derived') { ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]); }
        else ctx.stroke();
        // M0 anchor band whiskers
        if (s.tag === 'derived' && M.M0_BAND) {
          const xLo = xs(M.M0_BAND[0]), xHi = xs(M.M0_BAND[1]), midY = y + bh / 2;
          line(ctx, xLo, midY, xHi, midY, C.heat, 2);
          line(ctx, xLo, midY - 5, xLo, midY + 5, C.heat, 2);
          line(ctx, xHi, midY - 5, xHi, midY + 5, C.heat, 2);
          if (!n) text(ctx, '40–80', xHi + 6, midY + 4, { size: 10, color: C.heat, weight: 650 });
        }
        const lab = s.twh >= 1000 ? `${(s.twh / 1000).toFixed(s.twh >= 10000 ? 0 : 1)}k` : String(s.twh);
        text(ctx, lab, x + 6 > r - 36 ? x - 6 : x + 6, y + bh / 2 + 4, { size: 11, weight: 700, color: C.ink, align: x + 6 > r - 36 ? 'right' : 'left', halo: true });
      });
    },
  });
  fig.invalidate();
}

// Sankey: primary → final → final-energy sectors, with electricity as an area-true cut of final,
// then a cited electricity-by-consuming-sector split (not invented end-use shares inside electricity).
// Final-energy shares: IEA WEO 2025 (~38/28/28). Electricity-by-sector: IEA World electricity page 2024
// (Industry 42%, Residential 27%; remainder labelled residual — free tables lack a commercial/transport cell here).
// The "other uses grow" slider scales the R bars the same way the Act 1 meter does.
const PRIM = 166800;   // TWh, 600.3 EJ
const FINAL = 125000;  // TWh, ~450 EJ
const SECTS = [
  { id: 'ind', name: 'Industry', share: 0.38, color: C.coal },
  { id: 'tr', name: 'Transport', share: 0.28, color: C.gas },
  { id: 'bldg', name: 'Buildings', share: 0.28, color: C.violet },
  { id: 'oth', name: 'Other final', share: 0.06, color: C.ink3 },
];
const ELEC = 28200;    // world electricity 2025, IEA
// Who consumes electricity (IEA World, 2024). Not "how much of each final-energy sector is electricity".
const ELEC_BY = [
  { name: 'Industry', share: 0.42, color: C.coal },
  { name: 'Residential', share: 0.27, color: C.violet },
  { name: 'Other elec.', share: 0.31, color: C.ink3, residual: true }, // 1 − 0.42 − 0.27
];
const DC = 485;
const AI = M.M0;

export function energyFlow(el) {
  // Restore the Act 1 "other uses" lever so the rail matches the index meter.
  const saved = loadPrefs();
  let bGrow = (typeof saved.act1?.b === 'number') ? saved.act1.b
    : (typeof saved.yardstickB === 'number' ? saved.yardstickB : 0);
  bGrow = clamp(bGrow, M.LEVERS.b.min, M.LEVERS.b.max);
  const ctl = controls(el);
  const fig = new Fig(el, {
    height: w => (w < 640 ? 660 : 500),
    label: 'Area-proportional flow of world energy from primary through final end-uses, with electricity cut out to scale; data centres and AI shown in an enlarged inset',
    draw(ctx, w, h) {
      const n = w < 640, pad = n ? 10 : 18, r = w - pad, t = 30;
      const phoneInsetH = 56;
      const railReserve = n ? 118 : 78;
      const btm = h - railReserve - (n ? phoneInsetH + 12 : 0);
      const cols = n ? [pad + 8, w * 0.24, w * 0.44, w * 0.64] : [pad + 20, w * 0.22, w * 0.42, w * 0.60];
      const bw = n ? 10 : 14;
      const H = btm - t;
      // Area-proportional: column height ∝ TWh (primary = full H).
      const hOf = v => Math.max(1, (v / PRIM) * H);
      const band = (xa, ya, xb, yb, th, col) => {
        if (th < 0.5) return;
        const m = (xa + xb) / 2;
        ctx.beginPath(); ctx.moveTo(xa, ya); ctx.bezierCurveTo(m, ya, m, yb, xb, yb);
        ctx.lineTo(xb, yb + th); ctx.bezierCurveTo(m, yb + th, m, ya + th, xa, ya + th); ctx.closePath();
        ctx.fillStyle = col; ctx.fill();
      };
      // col 0: primary (full height)
      const hp = hOf(PRIM), y0 = t;
      rrect(ctx, cols[0], y0, bw, hp, 3); ctx.fillStyle = C.green; ctx.fill();
      text(ctx, n ? 'Primary' : 'Primary energy', cols[0] + bw / 2, y0 - 12, { size: 11, weight: 700, color: C.ink, align: 'center' });
      if (!n) text(ctx, '167k TWh', cols[0] + bw / 2, y0 + hp + 14, { size: 10.5, weight: 650, color: C.ink2, align: 'center' });
      else text(ctx, '167k', cols[0] + bw / 2, y0 + hp / 2 + 4, { size: 10, weight: 650, color: '#fff', align: 'center' });
      // col 1: final (proportional) + conversion losses above
      const hf = hOf(FINAL), yf = t + (H - hf); // align bottoms with primary
      const hl = hOf(PRIM - FINAL);
      band(cols[0] + bw, y0 + hl, cols[1], yf, hf, alpha(C.blue, 0.22));
      // losses band (top)
      if (hl > 2) {
        band(cols[0] + bw, y0, cols[1], t + 2, Math.min(hl, yf - t - 4), alpha(C.ink3, 0.16));
        // primary − final also holds non-energy use (feedstocks) and the energy sector's own use, not only conversion losses
        text(ctx, n ? 'not final' : 'losses, own use, feedstocks', (cols[0] + cols[1]) / 2 + bw / 2, t + Math.min(hl, 18) / 2 + 4, { size: n ? 9 : 10, color: C.ink3, align: 'center' });
      }
      rrect(ctx, cols[1], yf, bw, hf, 3); ctx.fillStyle = C.blue; ctx.fill();
      text(ctx, 'Final', cols[1] + bw / 2, yf - 12, { size: 11, weight: 700, color: C.ink, align: 'center' });
      if (!n) text(ctx, '125k TWh', cols[1] + bw / 2, yf + hf + 14, { size: 10.5, weight: 650, color: C.ink2, align: 'center' });
      else text(ctx, '125k', cols[1] + bw / 2, yf + hf / 2 + 4, { size: 10, weight: 650, color: '#fff', align: 'center' });
      // electricity is a cut across every sector, not a branch of one: no ribbon (any ribbon seemed to leave from the sector it
      // crossed); the column alone, to the same scale, in the empty space above the sector stack
      const he = hOf(ELEC), ye = t + 14;
      // col 2: sectors stacked, shares of final, bottoms aligned
      let y = yf;
      const gap = 3;
      const usable = hf - gap * (SECTS.length - 1);
      SECTS.forEach((s) => {
        const hs = Math.max(2, usable * s.share);
        band(cols[1] + bw, yf + (y - yf) * 0.4, cols[2], y, hs, alpha(s.color, 0.28));
        rrect(ctx, cols[2], y, bw, hs, 3); ctx.fillStyle = s.color; ctx.fill();
        const lab = n ? s.name.replace(' final', '') : s.name;
        text(ctx, lab, cols[2] + bw + 6, y + Math.max(10, hs / 2 + 4), { size: n ? 10 : 11.5, weight: 650, color: C.ink, halo: 3 });
        if (!n && hs > 18) text(ctx, `${Math.round(FINAL * s.share / 1000)}k`, cols[2] + bw + 6, y + hs / 2 + 16, { size: 10, color: C.ink3 });
        y += hs + gap;
      });
      // col 3: electricity to scale (≈21% of final). Drawn as a cut of final energy,
      // not as a child of one sector — band leaves from the middle of the final column.
      rrect(ctx, cols[3], ye, bw, he, 3); ctx.fillStyle = C.cyan; ctx.fill();
      // Title above the column (avoids overlap with the sector stack labels to the right)
      text(ctx, n ? 'Elec.' : 'Electricity', cols[3] + bw / 2, ye - 12, { size: 11, weight: 700, color: C.ink, align: 'center' });
      if (!n) text(ctx, '28.2k · ≈21% of final, same scale, used in every sector', cols[3] - 4, ye + he + 14, { size: 10.5, color: C.ink2 });
      else text(ctx, '28.2k', cols[3] + bw / 2, ye + he / 2 + 4, { size: 10, weight: 650, color: '#fff', align: 'center' });
      // Electricity-by-consuming-sector (IEA World 2024). Thin stack to the right — not invented sector→elec flows.
      const eSplitX = cols[3] + bw + (n ? 6 : 12);
      const eSplitW = n ? 8 : 10;
      let ey = ye;
      const eGap = 2;
      const eUsable = he - eGap * (ELEC_BY.length - 1);
      if (!n) text(ctx, 'who uses it (IEA 2024)', eSplitX + eSplitW + 6, ye - 12, { size: 10, color: C.ink3, weight: 600 });
      ELEC_BY.forEach((s) => {
        const hs = Math.max(2, eUsable * s.share);
        rrect(ctx, eSplitX, ey, eSplitW, hs, 2); ctx.fillStyle = s.color; ctx.fill();
        if (!n && hs > 16) {
          const lab = s.residual ? `${s.name} ${Math.round(s.share * 100)}% · residual` : `${s.name} ${Math.round(s.share * 100)}%`;
          text(ctx, lab, eSplitX + eSplitW + 6, ey + hs / 2 + 4, { size: 10.5, color: C.ink2, weight: s.residual ? 500 : 650 });
        } else if (n && hs > 12) {
          text(ctx, `${Math.round(s.share * 100)}%`, eSplitX + eSplitW + 3, ey + hs / 2 + 3, { size: 9, color: C.ink3 });
        }
        ey += hs + eGap;
      });
      // DC + AI are ~0.3% and ~0.03% of primary — invisible at column scale.
      // Enlarged inset (honestly labelled) compares DC vs AI only.
      const insetW = n ? w - pad * 2 - 8 : Math.min(180, r - (cols[3] + bw + 118) - 8);
      const insetX = n ? pad + 4 : Math.max(cols[3] + bw + 118, r - insetW);
      const insetH = n ? phoneInsetH : 70;
      const insetY = n ? btm + 8 : ye + he + 44; // below the electricity column, clear of its labels
      rrect(ctx, insetX, insetY, insetW, insetH, 6);
      ctx.fillStyle = alpha(C.ink, 0.04); ctx.fill();
      ctx.strokeStyle = C.grid2; ctx.lineWidth = 1; ctx.stroke();
      text(ctx, n ? 'DC & AI · ×40, not column scale' : 'Data centres & AI · enlarged ×40, not column scale', insetX + 8, insetY + 14, { size: n ? 9.5 : 10.5, weight: 650, color: C.ink3 });
      const maxDA = Math.max(DC, AI) * 40;
      const barMax = insetW - 70;
      const dcW = Math.max(4, (DC * 40 / maxDA) * barMax);
      const aiW = Math.max(3, (AI * 40 / maxDA) * barMax);
      const by = insetY + 26;
      rrect(ctx, insetX + 8, by, dcW, 12, 3); ctx.fillStyle = C.orange; ctx.fill();
      text(ctx, `DC ${DC}`, insetX + 12 + dcW, by + 10, { size: 10, color: C.ink2 });
      rrect(ctx, insetX + 8, by + 18, aiW, 12, 3); ctx.fillStyle = C.heat; ctx.fill();
      text(ctx, `AI ${AI}`, insetX + 12 + aiW, by + 28, { size: 10, weight: 650, color: C.heat });
      // Rung markers on a log rail at the bottom
      const rl = pad + 8, rr = r - 8, ry = h - (n ? 40 : 30);
      const xmin = 30, xmax = 2e5;
      const xs = v => rl + (Math.log10(clamp(v, xmin, xmax)) - Math.log10(xmin)) / (Math.log10(xmax) - Math.log10(xmin)) * (rr - rl);
      line(ctx, rl, ry, rr, ry, C.grid2, 3);
      text(ctx, n ? 'Bars (TWh, log)' : 'Bars to beat (TWh, log) · other-uses growth applied', rl, ry - 14, { size: n ? 10 : 11, color: C.ink3, weight: 600 });
      [[AI, 'today', C.heat], [DC, 'DC', C.orange], [2900, 'cool', C.cyan]].forEach(([v, s, c]) => {
        line(ctx, xs(v), ry - 6, xs(v), ry + 6, c, 2);
        if (!n) text(ctx, s, xs(v), ry + 16, { size: 9.5, align: 'center', color: c });
      });
      const rungX = M.RUNGS.map(rg => xs(M.bar(rg, { b: bGrow })));
      M.RUNGS.forEach((rg, i) => {
        const barT = M.bar(rg, { b: bGrow }), x = rungX[i];
        line(ctx, x, ry - 10, x, ry + 10, C.ink, 2.5);
        const lab = `${rg.id} ${barT >= 1000 ? Math.round(barT / 1000) + 'k' : Math.round(barT)}`;
        let lx = x;
        if (i > 0 && Math.abs(x - rungX[i - 1]) < 40) lx = x + (n ? 10 : 14);
        if (i < 2 && Math.abs(x - rungX[i + 1]) < 40) lx = x - (n ? 10 : 14);
        const ly = n ? ry + 14 + (i % 2) * 12 : ry - 14 - (i % 2) * 12;
        text(ctx, lab, lx, ly, { size: n ? 9.5 : 10.5, weight: 700, align: 'center', color: C.ink, halo: true });
      });
    },
  });
  slider(ctl, {
    label: 'Other uses grow by 2050', name: 'b', min: M.LEVERS.b.min, max: M.LEVERS.b.max, step: 0.05, value: bGrow, color: C.yellow,
    fmt: v => `${v >= 0 ? '+' : ''}${Math.round(v * 100)}%`,
    oninput: v => { bGrow = v; paint(); },
  });
  const ro = readout(el);
  function paint(save = true) {
    const r1 = M.bar(M.RUNGS[0], { b: bGrow }), r3 = M.bar(M.RUNGS[2], { b: bGrow });
    const frac = Math.min(1, Math.max(0, (bGrow - M.LEVERS.b.min) / (M.LEVERS.b.max - M.LEVERS.b.min)));
    publish('act1', { b: 1 - frac }); // lean: higher growth of other uses makes YES harder
    if (save) { // only on user input: a first paint must not flip the index/verdict meters to "custom"
      patchAct1({ b: bGrow }); // live into index/verdict slider widgets via prefs + watchAct1
      savePrefs({ yardstickB: bGrow });
    }
    ro.innerHTML = `Column heights are <b>area-proportional</b> to TWh (primary = full height). Primary <b>167,000 TWh</b> → final <b>125,000 TWh</b> (IEA / Energy Institute). Electricity <b>28,200 TWh</b> (≈21% of final) is a cut of final, not a child of one sector. Beside it: who <i>consumes</i> that electricity — Industry <b>42%</b>, Residential <b>27%</b>, other <b>31%</b> residual (IEA World, 2024). That is <b>not</b> a free sector→electricity Sankey from each final-energy share; free WEO/Highlights tables do not publish those flows here. Data centres (<b>485</b>) and AI (<b>${AI}</b>) sit in an ×40 inset. With other uses at <b>${bGrow >= 0 ? '+' : ''}${Math.round(bGrow * 100)}%</b>, R1 is <b>${Math.round(r1).toLocaleString('en-GB')}</b> TWh and R3 is <b>${Math.round(r3).toLocaleString('en-GB')}</b>. Final-energy sectors 38/28/28 (IEA); R3 = buildings heat 62 EJ; R2 remains a cooling-class <b>working</b> bar.`;
    fig.invalidate();
  }
  hint(el, 'drag “other uses grow” — the R1–R3 ticks slide, and the index meter’s matching slider picks up the value.');
  paint(false);
}
