// SHOWPIECE 3 — location: zonal pricing + redispatch vs nodal (LMP). Illustrative 4-node DC power-flow network.
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten, darken, mix } from '../lib/colors.js';
import * as D0 from '../lib/draw.js';
import { rrect, line, circle, arrow, clamp, lerp, pathLine, approach } from '../lib/draw.js';
import { curDraw, euroFigure } from '../lib/currency.js';
const { text, measure, axes, tag } = curDraw(D0);
import { controls, slider, segmented, button, readout, more, hint } from '../lib/ui.js';
import { NODES, LINES, solve } from '../lib/grid4.js';
import { TECHS } from '../lib/market.js';

const priceColor = p => {
  if (!isFinite(p)) return '#999';
  const t = clamp(p / 160, 0, 1);
  return t < 0.5 ? mix('#3f7fb8', '#e9d9b0', t * 2) : mix('#e9d9b0', '#c2413a', (t - 0.5) * 2);
};

export function network(el) {
  const st = { mode: 'nodal', windN: 12, loadS: 24, limits: LINES.map(l => l.limit), sel: 3, phase: 0, res: null, hover: -1, day: false, hour: 12, playing: false, dayRes: null };
  // Day mode (illustrative shapes): northern wind blows harder at night; southern demand has morning and evening peaks.
  // The sliders then set the day's peak wind and peak demand.
  const wprof = hh => 0.62 + 0.38 * Math.cos(2 * Math.PI * (hh - 3) / 24);
  const lprof = hh => Math.min(1, 0.68 + 0.17 * Math.exp(-(((hh - 8.5) / 2.4) ** 2)) + 0.32 * Math.exp(-(((hh - 18.5) / 2.6) ** 2)));
  const inputs = hh => st.day ? { windN: st.windN * wprof(hh), loadS: Math.max(10, st.loadS * lprof(hh)) } : { windN: st.windN, loadS: st.loadS };
  const dayRun = () => { st.dayRes = st.day ? Array.from({ length: 25 }, (_, k) => solve(inputs(k % 24), st.limits)) : null; };
  let geom = null, hourSl = null;
  const recompute = (all = true) => { st.res = solve(inputs(st.hour), st.limits); if (all) dayRun(); };
  let sw0 = null;
  const sweep = () => { const key = st.loadS + '|' + st.limits.join(','); if (sw0 && sw0.key === key) return sw0;
    const pts = []; let onset = null; for (let w = 0; w <= 30; w += 0.5) { const r = solve({ windN: w, loadS: st.loadS }, st.limits); if (!r || !r.con) continue; pts.push({ w, lmp: r.lmp });
      if (onset == null && Math.max(...r.lmp) < 999 && Math.max(...r.lmp) - Math.min(...r.lmp) > 0.5) onset = w; }
    return (sw0 = { key, pts, onset }); };
  recompute();
  const fig = new Fig(el, {
    label: 'A four-node transmission network. In nodal mode each node has its own price; in zonal mode there is one price and the operator redispatches plants to respect line limits',
    height: w => w < 600 ? 730 : Math.max(480, Math.min(560, w * 0.62)),
    animated: true,
    step(dt) {
      st.phase += dt;
      if (st.day && st.playing) { const q0 = Math.floor(st.hour * 4); st.hour = (st.hour + dt * 2) % 24; if (Math.floor(st.hour * 4) !== q0) { hourSl && hourSl.set(Math.floor(st.hour * 4) / 4); recompute(false); upd(); } }
    },
    draw(ctx, w, h) {
      const narrow = w < 600;
      const R = st.res; if (!R || !R.con) { text(ctx, 'no feasible dispatch', 20, 30); return; }
      const nodal = st.mode === 'nodal';
      const map = narrow ? { x: 20, y: 22, w: w - 40, h: h * 0.5 } : { x: 16, y: 16, w: w * 0.62, h: h - 32 };
      const P = n => [map.x + NODES[n].x * map.w, map.y + NODES[n].y * map.h];
      geom = { P, map };
      // zonal mode only: a dashed boundary around the whole map marks the single bidding zone
      const pts = NODES.map((_, n) => P(n)), cx0 = pts.reduce((s, p) => s + p[0], 0) / 4;
      if (!nodal) { ctx.save(); rrect(ctx, map.x + 2, map.y + 2, map.w - 4, map.h - 4, 18); ctx.fillStyle = alpha(priceColor(R.zonal), 0.12); ctx.fill(); ctx.setLineDash([6, 5]); ctx.strokeStyle = alpha(C.ink2, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
        text(ctx, `one bidding zone · one price: €${R.zonal.toFixed(0)}/MWh`, cx0, map.y + map.h + 2, { size: 12, color: C.ink2, align: 'center', weight: 600, halo: true }); }
      // flows to show: nodal => constrained dispatch flows. zonal => the market's (unconstrained) flows first, then the redispatched physical flows
      const flows = R.con.flows;
      const mkt = R.unc.flows;
      LINES.forEach((l, li) => {
        const [x1, y1] = P(l.from), [x2, y2] = P(l.to);
        const f = flows[li], lim = st.limits[li];
        const util = Math.abs(f) / lim;
        const over = !nodal && Math.abs(mkt[li]) > lim + 1e-6;
        const col = util > 0.999 ? C.peaker : util > 0.8 ? '#d49a2a' : '#8c9aae';
        const wdt = 3 + Math.abs(f) * 1.1;
        ctx.save(); ctx.lineCap = 'round';
        line(ctx, x1, y1, x2, y2, alpha(col, 0.25), wdt + 6);
        line(ctx, x1, y1, x2, y2, col, wdt);
        // moving dashes
        const dir = f >= 0 ? 1 : -1; const len = Math.hypot(x2 - x1, y2 - y1); const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
        const sp = Math.min(60, 8 + Math.abs(f) * 6);
        for (let d = ((st.phase * sp * dir) % 26 + 26) % 26; d < len; d += 26) {
          if (Math.abs(f) < 0.05) break;
          const ax = x1 + ux * d, ay = y1 + uy * d;
          const bx = ax + ux * 7 * dir, by = ay + uy * 7 * dir;
          line(ctx, ax, ay, bx, by, alpha('#ffffff', 0.85), Math.max(1.5, wdt * 0.45));
        }
        ctx.restore();
        // capacity pill
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const lab = `${Math.abs(f).toFixed(1)} / ${lim.toFixed(1)} GW` + (over && !narrow ? ` · wanted ${Math.abs(mkt[li]).toFixed(1)}` : '');
        const tw = measure(ctx, lab, 11, 600) + 30;
        rrect(ctx, mx - tw / 2, my - 11, tw, 22, 11);
        ctx.fillStyle = li === st.sel ? C.ink : '#fff'; ctx.fill(); ctx.strokeStyle = util > 0.999 ? C.peaker : C.grid2; ctx.lineWidth = 1.5; ctx.stroke();
        text(ctx, '‹', mx - tw / 2 + 9, my + 4, { size: 12, color: li === st.sel ? '#fff' : C.ink3, align: 'center', weight: 700 });
        text(ctx, '›', mx + tw / 2 - 9, my + 4, { size: 12, color: li === st.sel ? '#fff' : C.ink3, align: 'center', weight: 700 });
        text(ctx, lab, mx, my + 4, { size: 11, color: li === st.sel ? '#fff' : util > 0.999 ? C.peaker : C.ink2, align: 'center', weight: 600 });
        // direction arrow
        if (Math.abs(f) > 0.05) { const ax = mx + ux * dir * (tw / 2 + 14), ay = my + uy * dir * (tw / 2 + 14); arrow(ctx, ax - ux * dir * 8, ay - uy * dir * 8, ax + ux * dir * 4, ay + uy * dir * 4, col, 2, 8); }
      });
      // nodes
      NODES.forEach((nd, n) => {
        const [x, y] = P(n);
        const price = nodal ? R.lmp[n] : R.zonal;
        const rr = narrow ? 22 : Math.min(34, map.w * 0.07);
        circle(ctx, x, y, rr + 4, '#fff');
        circle(ctx, x, y, rr, priceColor(price), alpha(C.ink, 0.15), 1);
        const pl = price >= 999 ? 'short!' : '€' + Math.max(0, Math.round(price) === 0 ? 0 : Math.round(price));
        text(ctx, pl, x, y + 5, { size: narrow ? 12 : 14, color: price > 120 || price < 30 ? '#fff' : C.ink, align: 'center', weight: 700 });
        // generation mini-bars
        const G = R.con.G; const xs = R.con.x, xu = R.unc.x;
        const items = narrow ? [] : G.map((g, j) => ({ g, q: xs[j], qu: xu[j] })).filter(o => o.g.node === n && o.g.tech !== 'scarcity');
        const below = n === 2;
        const bx = below ? x - 48 : x + rr + 10, by = below ? y + rr + 22 : y - 26;
        text(ctx, nd.name, x, y - rr - 10, { size: 12, color: C.ink, align: 'center', weight: 650, halo: true });
        if (!narrow) text(ctx, `demand ${R.con.D[n].toFixed(0)} GW`, bx, by, { size: 10.5, color: C.ink3, halo: true });
        items.forEach((o, k) => {
          const yy = by + 8 + k * 16;
          const full = 60, frac = o.q / Math.max(1e-6, o.g.cap);
          rrect(ctx, bx, yy, full, 9, 3); ctx.fillStyle = lighten(TECHS[o.g.tech].color, 0.7); ctx.fill();
          rrect(ctx, bx, yy, full * clamp(frac, 0, 1), 9, 3); ctx.fillStyle = TECHS[o.g.tech].color; ctx.fill();
          const lab = `${TECHS[o.g.tech].short} ${o.q.toFixed(1)}` + (o.g.tech === 'wind' && o.q < o.g.cap - 0.05 ? ` of ${o.g.cap.toFixed(0)}` : '');
          text(ctx, lab, bx + full + 5, yy + 8.5, { size: 10.5, color: C.ink2, halo: true });
          if (!nodal) {
            const d = o.q - o.qu;
            if (Math.abs(d) > 0.05) text(ctx, (d > 0 ? '▲ +' : '▼ ') + d.toFixed(1), bx + full + 10 + measure(ctx, lab, 10.5), yy + 8.5, { size: 10.5, color: d > 0 ? C.peaker : C.hydro, weight: 700, halo: true });
          }
        });
      });
      // side panel: explanation numbers
      const sp = narrow ? { x: 16, y: map.y + map.h + 26, w: w - 32 } : { x: map.x + map.w + 48, y: 30, w: w - map.w - 80 };
      let yy = sp.y;
      const T = (s, o = {}) => { text(ctx, s, sp.x, yy, { size: 12, color: C.ink2, ...o }); yy += (o.gap || 18); };
      if (narrow) {
        NODES.forEach((nd, n) => {
          const parts = R.con.G.map((g, j) => ({ g, q: R.con.x[j], qu: R.unc.x[j] })).filter(o => o.g.node === n && o.g.tech !== 'scarcity' && (o.q > 0.05 || o.qu > 0.05))
            .map(o => `${TECHS[o.g.tech].short} ${o.q.toFixed(1)}` + (!nodal && Math.abs(o.q - o.qu) > 0.05 ? ` (${o.q > o.qu ? '+' : ''}${(o.q - o.qu).toFixed(1)})` : ''));
          rrect(ctx, sp.x, yy - 10, 10, 10, 3); ctx.fillStyle = priceColor(nodal ? R.lmp[n] : R.zonal); ctx.fill();
          text(ctx, `${nd.name} · demand ${R.con.D[n].toFixed(0)} · ${parts.join(', ') || 'no generation'}`, sp.x + 16, yy, { size: 11, color: C.ink2 }); yy += 17;
        });
        yy += 6;
      }
      if (nodal) {
        T('Nodal pricing (LMP)', { weight: 650, color: C.ink, size: 13, gap: 22 });
        NODES.forEach((nd, n) => { rrect(ctx, sp.x, yy - 10, 12, 12, 3); ctx.fillStyle = priceColor(R.lmp[n]); ctx.fill(); text(ctx, `${nd.name}: ${R.lmp[n] >= 999 ? 'shortage' : '€' + Math.max(0, Math.round(R.lmp[n])) + '/MWh'}`, sp.x + 18, yy, { size: 12, color: C.ink2 }); yy += 18; });
        yy += 8;
        const rent = LINES.reduce((s, l, li) => s + Math.abs(R.con.flows[li]) * Math.abs((R.lmp[l.to] - R.lmp[l.from])), 0);
        T(`Congestion rent: €${(rent / 1000).toFixed(2)} m per hour`, { size: 11.5 });
        T('(flow × price difference, collected', { size: 11, color: C.ink3, gap: 14 });
        T('by the grid operator)', { size: 11, color: C.ink3 });
      } else {
        T('Zonal pricing + redispatch', { weight: 650, color: C.ink, size: 13, gap: 22 });
        T(`Market price everywhere: €${R.zonal.toFixed(0)}/MWh`);
        const overl = LINES.filter((l, li) => Math.abs(R.unc.flows[li]) > st.limits[li] + 1e-6).length;
        T(overl ? `The market’s dispatch overloads ${overl} line${overl > 1 ? 's' : ''}.` : 'The market’s dispatch fits the grid.', { color: overl ? C.peaker : C.storage, weight: 600 });
        const down = R.con.x.reduce((s, q, j) => s + Math.max(0, R.unc.x[j] - q), 0);
        if (overl) {
          T(`The operator turns ${down.toFixed(1)} GW down`, { size: 11.5 });
          T(`and the same amount up elsewhere.`, { size: 11.5 });
          T(`Redispatch cost: €${(R.redispatchCost / 1000).toFixed(2)} m per hour,`, { size: 11.5, weight: 600, color: C.ink });
          T('recovered through network charges.', { size: 11.5, color: C.ink3 });
        }
      }
      // the one idea: prices are equal until the first line fills, then they split. Sweep northern wind 0–30 GW.
      if (!st.day && sp.w > 150 && h - yy > 120) {
        const sw = Math.min(narrow ? sp.w - 40 : 250, sp.w - 40), sh = narrow ? 70 : 84; yy += narrow ? 4 : 12;
        text(ctx, 'Node prices as northern wind rises', sp.x, yy, { size: 12.5, weight: 650, color: C.ink }); const top = yy + 10;
        const S = sweep(), X = v => sp.x + v / 30 * sw, Y = v => top + sh - clamp(v, 0, 170) / 170 * sh;
        ctx.fillStyle = alpha(C.ink3, 0.06); ctx.fillRect(sp.x, top, sw, sh);
        if (S.onset != null) { ctx.fillStyle = alpha(C.peaker, 0.08); ctx.fillRect(X(S.onset), top, sp.x + sw - X(S.onset), sh); line(ctx, X(S.onset), top, X(S.onset), top + sh, alpha(C.peaker, 0.7), 1, [3, 3]); }
        const NC = ['#3f7fb8', '#b9975b', '#d08a5c', '#c2413a'];
        [1, 2, 0, 3].forEach(n => pathLine(ctx, S.pts.filter(q => q.lmp[n] < 999).map(q => [X(q.w), Y(Math.max(0, q.lmp[n]))]), NC[n], n === 3 || n === 0 ? 2.2 : 1.4));
        line(ctx, X(st.windN), top - 3, X(st.windN), top + sh, C.ink, 1.5);
        const k = S.pts.reduce((b, q, i) => Math.abs(q.w - st.windN) < Math.abs(S.pts[b].w - st.windN) ? i : b, 0), ends = [0, 1, 2, 3].map(n => ({ n, y: Y(clamp(S.pts[k].lmp[n], 0, 170)) })).sort((a, b) => a.y - b.y);
        for (let i = 1; i < 4; i++) if (ends[i].y - ends[i - 1].y < 11) ends[i].y = ends[i - 1].y + 11;
        const rt = st.windN < 24; ends.forEach(e => text(ctx, NODES[e.n].id, X(st.windN) + (rt ? 5 : -5), e.y + 4, { size: 11, weight: 700, color: NC[e.n], align: rt ? 'left' : 'right', halo: true }));
        text(ctx, '0', sp.x, top + sh + 13, { size: 11, color: C.ink3 }); text(ctx, '30 GW', sp.x + sw, top + sh + 13, { size: 11, color: C.ink3, align: 'right' });
        if (S.onset != null) text(ctx, `a line fills at ${S.onset} GW`, clamp(X(S.onset), sp.x + 60, sp.x + sw - 60), top + sh + 13, { size: 11, color: C.peaker, weight: 650, align: 'center' });
        yy = top + sh + 30;
      }
      // line-loading bars: every line's flow against its limit (fills the side panel, shows where congestion is)
      if (!narrow && sp.w > 150) {
        yy += 14; T('Line loading', { weight: 650, color: C.ink, size: 13, gap: 20 });
        const bw = Math.min(170, sp.w - 70);
        LINES.forEach((l, li) => {
          const f = Math.abs(nodal ? R.con.flows[li] : R.unc.flows[li]), lim = st.limits[li], u = f / lim;
          const nm = NODES[l.from].id + '–' + NODES[l.to].id, col = u > 1.001 ? C.peaker : u > 0.98 ? darken(C.peaker, 0.1) : C.network;
          text(ctx, nm, sp.x, yy, { size: 11, color: li === st.sel ? C.ink : C.ink2, weight: li === st.sel ? 700 : 500 });
          rrect(ctx, sp.x + 34, yy - 9, bw, 10, 3); ctx.fillStyle = alpha(C.ink3, 0.15); ctx.fill();
          rrect(ctx, sp.x + 34, yy - 9, bw * Math.min(1, u), 10, 3); ctx.fillStyle = alpha(col, 0.85); ctx.fill();
          if (u > 1.001) { line(ctx, sp.x + 34 + bw, yy - 12, sp.x + 34 + bw, yy + 4, C.peaker, 2); }
          text(ctx, u > 1.001 ? `${Math.round(u * 100)}% ✕` : `${Math.round(u * 100)}%`, sp.x + 40 + bw, yy, { size: 10.5, color: u > 0.98 ? C.peaker : C.ink3, weight: u > 0.98 ? 700 : 450 });
          yy += 17;
        });
        T(nodal ? 'Full lines (100%) split the price.' : 'Market flows; over 100% must be redispatched.', { size: 11, color: C.ink3, gap: 24 });
        const anyFull = LINES.some((l, li) => Math.abs(nodal ? R.con.flows[li] : R.unc.flows[li]) >= st.limits[li] - 1e-3);
        if (anyFull) { T('Drag a full line’s label right to raise', { size: 11.5, weight: 600, color: C.ink2 }); T('its limit and the prices converge.', { size: 11.5, weight: 600, color: C.ink2 }); }
        else { T('No line is full: one price everywhere.', { size: 11.5, weight: 600, color: C.ink2 }); T('Drag a label left to tighten a line.', { size: 11.5, weight: 600, color: C.ink2 }); }
      }
      // day strip: price at each node through the day, with the current hour marked (day mode only)
      if (st.day && st.dayRes && !narrow && sp.w > 150) {
        yy += 16; const sw = Math.min(250, sp.w - 6), sh = 92, top = yy + 6;
        text(ctx, nodal ? 'Node prices through the day' : 'Market price through the day', sp.x, yy, { size: 12.5, weight: 650, color: C.ink });
        const pr = st.dayRes.map(r => r && r.con ? (nodal ? r.lmp : r.lmp.map(() => r.zonal)) : null);
        const pmax = Math.max(60, ...pr.flat().filter(v => v != null && v < 999)) * 1.08;
        const X = hh => sp.x + hh / 24 * sw, Y = v => top + sh - Math.min(v, pmax) / pmax * sh;
        ctx.fillStyle = alpha(C.ink3, 0.06); ctx.fillRect(sp.x, top, sw, sh);
        const NC = ['#3f7fb8', '#b9975b', '#d08a5c', '#c2413a']; const ends = [];
        NODES.forEach((nd, n) => { const pts = pr.map((p, k) => p ? [X(k), Y(Math.max(0, p[n]))] : null).filter(Boolean); pathLine(ctx, pts, NC[n], n === 3 || n === 0 ? 2.2 : 1.5); const hk = Math.min(23, Math.round(st.hour)); if (pr[hk]) ends.push({ n, y: Y(Math.max(0, pr[hk][n])) }); });
        // direct labels at the current hour, nudged apart
        ends.sort((a, b) => a.y - b.y); for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 11) ends[i].y = ends[i - 1].y + 11;
        ends.forEach(e => text(ctx, NODES[e.n].id, X(st.hour) + (st.hour > 18 ? -6 : 6), e.y + 4, { size: 10, weight: 700, color: NC[e.n], align: st.hour > 18 ? 'right' : 'left', halo: true }));
        [0, 6, 12, 18, 24].forEach(hh => text(ctx, hh === 24 ? '' : String(hh).padStart(2, '0') + ':00', X(hh), top + sh + 13, { size: 9.5, color: C.ink3, align: hh ? 'center' : 'left' }));
        line(ctx, X(st.hour), top - 2, X(st.hour), top + sh, C.ink, 1.5);
        text(ctx, '€' + Math.round(pmax / 1.08), sp.x + sw + 3, top + 8, { size: 9.5, color: C.ink3 }); text(ctx, '€0', sp.x + sw + 3, top + sh, { size: 9.5, color: C.ink3 });
        text(ctx, 'N, E, W, S = node; the dark line is the hour shown on the map.', sp.x, top + sh + 30, { size: 10.5, color: C.ink3 });
      }
    },
  });
  fig.interact({
    hit: (x, y) => {
      if (!geom) return null;
      for (let li = 0; li < LINES.length; li++) {
        const [x1, y1] = geom.P(LINES[li].from), [x2, y2] = geom.P(LINES[li].to);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        if (Math.abs(x - mx) < 56 && Math.abs(y - my) < 14) return { li, x0: x, l0: st.limits[li] };
      }
      return null;
    },
    cursor: 'ew-resize',
    down: (o) => { st.sel = o.li; limSl.set(st.limits[o.li]); },
    move: (o, x) => { st.limits[o.li] = clamp(Math.round((o.l0 + (x - o.x0) / 12) * 2) / 2, 0.5, 20); limSl.set(st.limits[o.li]); recompute(); upd(); },
  });
  const ctl = controls(el);
  segmented(ctl, { options: [{ label: 'Nodal (one price per node)', value: 'nodal' }, { label: 'Zonal (one price + redispatch)', value: 'zonal' }], value: st.mode, onchange: v => { st.mode = v; upd(); }, name: 'mode' });
  slider(ctl, { label: 'Wind in the north', min: 0, max: 30, step: 0.5, value: st.windN, color: C.wind, fmt: v => v + ' GW', oninput: v => { st.windN = v; recompute(); upd(); }, name: 'windN' });
  const adv = more(ctl, 'More: demand, line limits, a whole day');
  slider(adv, { label: 'Demand in the south', min: 10, max: 32, step: 0.5, value: st.loadS, color: C.demand, fmt: v => v + ' GW', oninput: v => { st.loadS = v; recompute(); upd(); }, name: 'loadS' });
  const limSl = slider(adv, { label: 'Limit of the selected line <small>(or drag a line’s label)</small>', min: 0.5, max: 20, step: 0.5, value: st.limits[st.sel], color: C.network, fmt: v => v + ' GW', oninput: v => { st.limits[st.sel] = v; recompute(); upd(); }, name: 'limit' });
  segmented(adv, { label: 'Time', options: [{ label: 'One hour', value: false, name: 'nw-hour' }, { label: 'A day', value: true, name: 'nw-day' }], value: false, onchange: v => { st.day = v; dayWrap.style.display = v ? '' : 'none'; if (!v) { st.playing = false; playB.textContent = 'Play the day'; } recompute(); upd(); } });
  const dayWrap = document.createElement('div'); dayWrap.className = 'ctl-row'; dayWrap.style.display = 'none'; adv.appendChild(dayWrap);
  const playB = button(dayWrap, 'Play the day', () => { st.playing = !st.playing; playB.textContent = st.playing ? 'Pause' : 'Play the day'; }, { name: 'nw-play' });
  hourSl = slider(dayWrap, { label: 'Hour', min: 0, max: 23.75, step: 0.25, value: st.hour, color: C.ink, fmt: v => `${String(Math.floor(v)).padStart(2, '0')}:${String(Math.round((v % 1) * 60)).padStart(2, '0')}`, oninput: v => { st.hour = v; recompute(false); upd(); }, name: 'nw-hour-sl' });
  const ro = readout(el);
  function upd() {
    const R = st.res;
    if (!R || !R.con) { ro.textContent = 'No feasible dispatch.'; fig.invalidate(); return; }
    const l = LINES[st.sel];
    const hq = Math.floor(st.hour * 4 + 1e-6) / 4;
    const dayNote = st.day ? `At ${String(Math.floor(hq)).padStart(2, '0')}:${String(Math.round((hq % 1) * 60)).padStart(2, '0')}: wind ${inputs(st.hour).windN.toFixed(1)} GW, southern demand ${inputs(st.hour).loadS.toFixed(1)} GW. ` : '';
    ro.innerHTML = dayNote + (st.mode === 'nodal'
      ? (Math.max(...R.lmp) - Math.min(...R.lmp) < 0.5 && Math.max(...R.lmp) < 999 ? `Every node pays <b>€${Math.max(0, Math.round(R.lmp[0]))}</b>: no line is holding power back, so there is one price.` : `Prices range from <b>€${Math.max(0, Math.round(Math.min(...R.lmp)))}</b> to <b>${Math.max(...R.lmp) >= 999 ? 'shortage' : '€' + Math.max(...R.lmp).toFixed(0)}</b>. Where a line is full, the price on either side splits.`)
      : `One price, <b>€${R.zonal.toFixed(0)}</b>, for everyone — and a redispatch bill of <b>€${(R.redispatchCost / 1000).toFixed(2)} m per hour</b> that lands in network tariffs.`) + ` <span style="color:#777">Selected line: ${NODES[l.from].name} – ${NODES[l.to].name}.</span>`;
    fig.invalidate();
  }
  euroFigure(el, fig, ctl, 'eu-network');
  hint(el, 'the wind is set exactly where the first line fills. Drag it down a notch and the four prices merge; push it up and they split further apart.');
  upd();
  el.__sim = { st, recompute, upd };
}
