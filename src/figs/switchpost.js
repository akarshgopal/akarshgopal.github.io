// The Switch: relays -> tubes -> MOSFET -> energy per tick -> dark silicon -> lithography -> yield.
import { Fig, isPlaying, onPlayChange } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line, circle, clamp, axes, approach, arrow } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint } from '../lib/ui.js';
import { RUPP } from '../lib/aidata.js';
import { rng } from '../lib/rng.js';
import { drawSwitch, drawLamp } from './switches.js';

const narrow = w => w < 560;
const UI3D = { C, controls, slider, segmented, button, readout, hint, isPlaying, onPlayChange };
const L10 = Math.log10;
const sup = n => String(n).replace(/-/g, '−').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).replace('−', '⁻');
const fit = pts => { const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length, my = pts.reduce((s, p) => s + p[1], 0) / pts.length; const b = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0) / pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0); return x => my + b * (x - mx); };
const wireP = (ctx, pts, on, w) => { ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = on ? C.on : C.grid2; ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); };

// ---------- 1. Relays: coil pulls armature, contact closes, lamp lights (CIECH #10) ----------
function relayLogic2d(el) {
  const st = { a: false, b: false, arm: [0, 0], series: true }; let R = {}, tGlow = 0;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 400 : 340), animated: true,
    label: 'Two electromechanical relays: each coil pulls an armature that closes a contact; wired in series they make AND, side by side OR',
    step(dt) {
      let moving = false;
      [st.a, st.b].forEach((on, i) => {
        const target = on ? 1 : 0, v = approach(st.arm[i], target, 14, dt);
        if (Math.abs(v - target) > 0.002) moving = true;
        st.arm[i] = Math.abs(v - target) < 0.002 ? target : v;
      });
      tGlow += dt;
      if (!moving && !isPlaying()) fig.opts.animated = false;
      else fig.opts.animated = true;
    },
    draw(ctx, w, h) {
      const n = narrow(w), kx = n ? 32 : 52, ys = [h * 0.28, h * 0.68], lx = w - (n ? 44 : 72);
      const closed = st.arm.map(v => v > 0.92), lit = st.series ? closed[0] && closed[1] : closed[0] || closed[1];
      R.keys = ys.map(y => [kx, y]);
      // draw each relay as a small mechanism: coil + armature + contact
      const relays = [];
      ['A', 'B'].forEach((nm, i) => {
        const y = ys[i], on = [st.a, st.b][i], pull = st.arm[i];
        drawSwitch(ctx, kx, y, n ? 24 : 28, on, `key ${nm}`, { size: 11.5 });
        // coil body (cylinder seen from the side)
        const cx = n ? w * 0.34 : w * 0.32, cy = y;
        const cw = n ? 46 : 56, ch = 36;
        // core
        rrect(ctx, cx - cw / 2, cy - 7, cw, 14, 3); ctx.fillStyle = on ? alpha(C.compute, 0.55) : '#9aa3ad'; ctx.fill();
        // windings
        for (let k = 0; k < 7; k++) {
          const x = cx - cw / 2 + 6 + k * ((cw - 12) / 6);
          ctx.beginPath(); ctx.ellipse(x, cy, 4, ch / 2 - 2, 0, 0, Math.PI * 2);
          ctx.strokeStyle = on ? C.compute : alpha(C.compute, 0.55); ctx.lineWidth = 1.6; ctx.stroke();
        }
        text(ctx, 'coil', cx, cy + ch / 2 + 12, { size: 10.5, align: 'center', color: C.compute, weight: 600 });
        // control wire from key to coil
        wireP(ctx, [[kx + 14, y], [cx - cw / 2 - 2, y]], on, 2);
        // armature: hinged bar above the coil, pulled down when energised
        const pivotX = cx + cw / 2 + 8, pivotY = cy - ch / 2 - 4;
        const restAng = -0.38, closedAng = 0.02;
        const ang = restAng + (closedAng - restAng) * pull;
        const armLen = n ? 58 : 70;
        // magnetic pull arrow when moving/on
        if (on) arrow(ctx, cx, cy - 16, cx, pivotY + 6 + pull * 8, alpha(C.compute, 0.7), 1.5, 6);
        circle(ctx, pivotX, pivotY, 4, C.ink2);
        ctx.save(); ctx.translate(pivotX, pivotY); ctx.rotate(ang);
        // armature bar
        rrect(ctx, -4, -5, armLen, 10, 3); ctx.fillStyle = '#6b727a'; ctx.fill();
        // movable contact at tip
        circle(ctx, armLen - 2, 0, 5, closed[i] ? C.on : '#fff', C.ink, 1.5);
        ctx.restore();
        // fixed contact (where tip lands when closed)
        const tipX = pivotX + (armLen - 2) * Math.cos(closedAng);
        const tipY = pivotY + (armLen - 2) * Math.sin(closedAng);
        circle(ctx, tipX, tipY + 1, 4.5, closed[i] ? C.on : '#fff', C.ink2, 1.5);
        if (i === 0) text(ctx, 'armature', pivotX + armLen * 0.55, pivotY - 22, { size: 10.5, color: C.ink3, halo: 3 });
        relays.push({ pivotX, pivotY, tipX, tipY, ang, armLen, closed: closed[i], on, cx, cy, cw });
        R['c' + i] = [tipX - 18, tipY, tipX, tipY];
      });
      // load circuit: battery → contacts → lamp
      const top = 22, bot = h - 22, mid = h / 2;
      const a = relays[0], b = relays[1];
      // battery
      const batX = n ? w * 0.55 : w * 0.58;
      rrect(ctx, batX - 14, top - 4, 28, 12, 2); ctx.fillStyle = C.ink2; ctx.fill();
      text(ctx, 'battery', batX, top - 10, { size: 10.5, align: 'center', color: C.ink3 });
      if (st.series) {
        wireP(ctx, [[a.tipX - 18, a.tipY], [a.tipX - 18, top + 8], [batX, top + 8]], lit, 3.5);
        wireP(ctx, [[batX, top + 8], [lx, top + 8], [lx, mid - 20]], lit, 3.5);
        wireP(ctx, [[a.tipX, a.tipY], [a.tipX + 14, a.tipY], [a.tipX + 14, (a.tipY + b.tipY) / 2], [b.tipX - 18, (a.tipY + b.tipY) / 2], [b.tipX - 18, b.tipY], [b.tipX, b.tipY]], a.closed, 3.5);
        wireP(ctx, [[b.tipX, b.tipY], [b.tipX + 16, b.tipY], [b.tipX + 16, bot], [lx, bot], [lx, mid + 20]], lit, 3.5);
      } else {
        wireP(ctx, [[a.tipX - 18, a.tipY], [a.tipX - 18, top + 8], [batX, top + 8]], lit, 3.5);
        wireP(ctx, [[batX, top + 8], [lx, top + 8], [lx, mid - 20]], lit, 3.5);
        wireP(ctx, [[a.tipX - 18, top + 8], [b.tipX - 18, top + 8], [b.tipX - 18, b.tipY]], lit, 3.5);
        wireP(ctx, [[a.tipX, a.tipY], [a.tipX + 20, a.tipY], [a.tipX + 20, bot]], a.closed, 3.5);
        wireP(ctx, [[b.tipX, b.tipY], [b.tipX + 20, b.tipY], [b.tipX + 20, bot]], b.closed, 3.5);
        wireP(ctx, [[Math.min(a.tipX, b.tipX) + 20, bot], [lx, bot], [lx, mid + 20]], lit, 3.5);
      }
      drawLamp(ctx, lx, mid, n ? 15 : 19, lit, st.series ? 'A AND B' : 'A OR B', { size: 11.5 });
      // small "click" tick when nearly closed
      relays.forEach((r, i) => {
        if (st.arm[i] > 0.85 && st.arm[i] < 0.98) {
          text(ctx, 'click', r.tipX + 10, r.tipY - 10, { size: 10, weight: 700, color: C.ink3 });
        }
      });
      void tGlow;
    },
  });
  fig.interact({
    hit: (x, y) => { if (!R.keys) return null; const i = R.keys.findIndex(([kx, ky]) => Math.abs(x - kx) < 30 && Math.abs(y - ky) < 34); return i < 0 ? null : 'ab'[i]; },
    cursor: 'pointer',
    down(k) { if (k === 'a') st.a = !st.a; else st.b = !st.b; fig.opts.animated = true; fig.invalidate(); paint(); },
  });
  const ctl = controls(el);
  segmented(ctl, { label: 'Contacts wired', value: true, options: [{ label: 'one after the other', value: true, name: 'rl-series' }, { label: 'side by side', value: false, name: 'rl-par' }], onchange: v => { st.series = v; fig.opts.animated = true; fig.invalidate(); paint(); } });
  const ro = readout(el);
  const paint = () => {
    const lit = st.series ? st.a && st.b : st.a || st.b;
    ro.innerHTML = `${st.series ? 'In series the lamp needs <b>A and B</b> both pressed — each coil pulls its armature, and both contacts must close.' : 'Side by side, <b>A or B</b> will do — either armature closing completes the lamp circuit.'} The lamp is <b>${lit ? 'on' : 'off'}</b>.`;
  };
  hint(el, 'tap the two keys and watch each coil pull its armature; then rewire the contacts.');
  paint();
}


export function relayLogic(el) { try { if (window.AIX3D && window.AIX3D.relay3d(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } relayLogic2d(el); }

// ---------- 1b. Bridge: one relay drives the next (CIECH #9) ----------
function relayCascade2d(el) {
  const st = { a: true, arm: [0.92, 0.55] }; // mid-action default: A closed, B pulling
  let R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 320 : 280), animated: true,
    label: 'Relay cascade: the first contact energises the second coil — logic stacked without a hand on the second key',
    step(dt) {
      // A follows the key; B follows whether A\'s contact is closed (cascade)
      const aOn = st.a, bOn = st.arm[0] > 0.9;
      [[aOn, 0], [bOn, 1]].forEach(([on, i]) => {
        const target = on ? 1 : 0;
        const v = approach(st.arm[i], target, 10, dt);
        st.arm[i] = Math.abs(v - target) < 0.002 ? target : v;
      });
      fig.opts.animated = true;
    },
    draw(ctx, w, h) {
      const n = narrow(w), kx = n ? 36 : 52, yA = h * 0.32, yB = h * 0.68, lx = w - (n ? 44 : 70);
      drawSwitch(ctx, kx, yA, n ? 22 : 26, st.a, 'key A', { size: 11 });
      // relay A
      const drawRel = (y, pull, label, driven) => {
        const cx = n ? w * 0.36 : w * 0.34, cw = n ? 44 : 52, ch = 32;
        rrect(ctx, cx - cw / 2, y - 6, cw, 12, 3); ctx.fillStyle = pull > 0.5 ? alpha(C.compute, 0.55) : '#9aa3ad'; ctx.fill();
        for (let k = 0; k < 6; k++) {
          const x = cx - cw / 2 + 5 + k * ((cw - 10) / 5);
          ctx.beginPath(); ctx.ellipse(x, y, 3.5, ch / 2 - 2, 0, 0, Math.PI * 2);
          ctx.strokeStyle = pull > 0.3 ? C.compute : alpha(C.compute, 0.5); ctx.lineWidth = 1.4; ctx.stroke();
        }
        text(ctx, label, cx, y + ch / 2 + 10, { size: 10.5, align: 'center', color: C.compute, weight: 600 });
        const pivotX = cx + cw / 2 + 6, pivotY = y - ch / 2 - 2;
        const ang = -0.38 + 0.4 * pull;
        const armLen = n ? 52 : 64;
        circle(ctx, pivotX, pivotY, 3.5, C.ink2);
        ctx.save(); ctx.translate(pivotX, pivotY); ctx.rotate(ang);
        rrect(ctx, -3, -4, armLen, 8, 2); ctx.fillStyle = '#6b727a'; ctx.fill();
        circle(ctx, armLen - 2, 0, 4.5, pull > 0.9 ? C.on : '#fff', C.ink, 1.4);
        ctx.restore();
        const tipX = pivotX + (armLen - 2) * Math.cos(0.02);
        const tipY = pivotY + (armLen - 2) * Math.sin(0.02);
        circle(ctx, tipX, tipY + 1, 4, pull > 0.9 ? C.on : '#fff', C.ink2, 1.4);
        if (driven) text(ctx, 'driven by A', cx, y - ch / 2 - 10, { size: 10, align: 'center', color: C.ink3 });
        return { cx, tipX, tipY, pull, cw };
      };
      wireP(ctx, [[kx + 12, yA], [n ? w * 0.36 : w * 0.34 - 26, yA]], st.a, 2);
      const A = drawRel(yA, st.arm[0], 'coil A', false);
      const B = drawRel(yB, st.arm[1], 'coil B', true);
      // cascade wire: A tip → B coil
      const cascadeOn = st.arm[0] > 0.9;
      wireP(ctx, [[A.tipX, A.tipY], [A.tipX + 18, A.tipY], [A.tipX + 18, yB], [B.cx - B.cw / 2 - 2, yB]], cascadeOn, 3);
      // lamp from B contact
      const lit = st.arm[1] > 0.9;
      wireP(ctx, [[B.tipX, B.tipY], [B.tipX + 16, B.tipY], [B.tipX + 16, h / 2], [lx, h / 2]], lit, 3);
      drawLamp(ctx, lx, h / 2, n ? 14 : 18, lit, 'B lights', { size: 11 });
      R.keys = [[kx, yA]];
      text(ctx, n ? 'A → B' : 'A’s contact feeds B’s coil', w / 2, 16, { size: 11.5, align: 'center', weight: 650, color: C.ink2 });
    },
  });
  fig.interact({
    hit: (x, y) => { if (!R.keys) return null; const [kx, ky] = R.keys[0]; return (Math.abs(x - kx) < 30 && Math.abs(y - ky) < 34) ? 'a' : null; },
    cursor: 'pointer',
    down(k) { if (k === 'a') { st.a = !st.a; fig.invalidate(); paint(); } },
  });
  const ro = readout(el);
  const paint = () => {
    ro.innerHTML = st.a
      ? `Key A is down: coil A pulls, its contact closes, and that current pulls <b>coil B</b> — no hand on a second key. The lamp is <b>${st.arm[1] > 0.9 ? 'on' : 'catching up'}</b>.`
      : `Release A and both armatures fall back. Stacking contacts this way is how Shannon’s relays build deep logic — and why the lever’s mass still hurts.`;
    fig.invalidate();
  };
  hint(el, 'tap key A; watch the first contact throw the second coil.');
  paint();
}

// ---------- 2. The triode ----------
export function relayCascade(el) { try { if (window.AIX3D && window.AIX3D.cascade3d(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } relayCascade2d(el); }

export function triode(el) { try { if (window.AIX3D && window.AIX3D.triode3d(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } triode2d(el); }
function triode2d(el) {
  const MU = 20, VP = 250; let vg = -4, heater = true, R = {}; const r = rng(7), P = [];
  const cur = () => (heater ? Math.max(0, vg + VP / MU) ** 1.5 / (VP / MU) ** 1.5 : 0); // relative to Vg = 0
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 330 : 290), animated: true, label: 'A vacuum tube: electrons boil off a hot cathode and a voltage on the grid lets them through to the plate or turns them back',
    step(dt) { const rate = heater ? 140 : 0; for (let k = 0; k < rate * dt; k++) if (P.length < 260) P.push({ x: r(), y: 0, v: 0.6 + r() * 0.4, pass: r() < cur() / 1.6 }); for (const p of P) { p.y += p.v * dt * (p.y > 0.5 && !p.pass ? -1.2 : 1); if (p.y > 0.5 && !p.pass) p.v = Math.abs(p.v) * -1; } for (let i = P.length - 1; i >= 0; i--) if (P[i].y > 1 || P[i].y < -0.02) P.splice(i, 1); },
    draw(ctx, w, h) {
      const n = narrow(w), bw = n ? w * 0.6 : w * 0.42, x0 = n ? 20 : w * 0.08, top = 40, bot = h - 46, gy = (top + bot) / 2;
      rrect(ctx, x0 - 10, top - 26, bw + 20, bot - top + 52, 30); ctx.fillStyle = alpha(C.grid, 0.4); ctx.fill(); ctx.strokeStyle = C.grid2; ctx.lineWidth = 1.5; ctx.stroke();
      rrect(ctx, x0, top - 10, bw, 10, 2); ctx.fillStyle = C.ink2; ctx.fill(); text(ctx, 'plate (+250 V)', x0 + bw / 2, top - 14, { size: 11.5, align: 'center', color: C.ink2, weight: 600 });
      rrect(ctx, x0, bot, bw, 10, 2); ctx.fillStyle = heater ? C.heat : C.ink3; ctx.fill(); text(ctx, heater ? 'hot cathode' : 'cold cathode', x0 + bw / 2, bot + 26, { size: 11.5, align: 'center', color: heater ? C.heat : C.ink3, weight: 600 });
      for (let x = x0 + 6; x < x0 + bw; x += 14) line(ctx, x, gy, x + 7, gy, C.ink, 2);
      for (const p of P) circle(ctx, x0 + 6 + p.x * (bw - 12), bot - p.y * (bot - top), 2.2, C.blue);
      // grid handle
      const hx = x0 + bw + 26; R = { hx, gy, top, bot };
      text(ctx, `grid ${vg > 0 ? '+' : ''}${vg.toFixed(1)} V`, hx + 16, gy + 4, { size: 12.5, weight: 700, color: C.ink });
      circle(ctx, hx, gy, 10, '#fff', C.ink, 2.5); line(ctx, x0 + bw, gy, hx - 10, gy, C.ink, 1, [3, 3]);
      // current gauge
      if (!n) { const gx = w * 0.72, gw = w * 0.22; text(ctx, 'current to the plate', gx, top + 6, { size: 11.5, color: C.ink3, weight: 500 }); rrect(ctx, gx, top + 16, gw, 18, 4); ctx.fillStyle = C.grid; ctx.fill(); rrect(ctx, gx, top + 16, gw * Math.min(1, cur() / 1.6), 18, 4); ctx.fillStyle = C.blue; ctx.fill();
        text(ctx, 'heater power, always', gx, top + 70, { size: 11.5, color: C.ink3, weight: 500 }); rrect(ctx, gx, top + 80, gw, 18, 4); ctx.fillStyle = C.grid; ctx.fill(); if (heater) { rrect(ctx, gx, top + 80, gw * 0.55, 18, 4); ctx.fillStyle = C.heat; ctx.fill(); } }
    },
  });
  const setV = y => { vg = Math.round(clamp(-20 + (R.bot - y) / (R.bot - R.top) * 22, -20, 2) * 2) / 2; paint(); };
  fig.interact({ hit: (x, y) => (Math.abs(x - R.hx) < 40 && y > R.top - 10 && y < R.bot + 10 ? 'g' : null), cursor: 'ns-resize', down(q, x, y) { setV(y); }, move(q, x, y) { setV(y); } });
  const ctl = controls(el);
  button(ctl, 'Heater on / off', () => { heater = !heater; paint(); }, { name: 'tr-heat' });
  const ro = readout(el);
  const paint = () => { const c = cur(); ro.innerHTML = !heater ? 'Heater off: no electrons leave the cathode, whatever the grid says.' : c === 0 ? `At <b>${String(vg).replace('-', '−')} V</b> the grid repels every electron: the tube is <b>off</b>, though the heater still burns its watts.` : `At <b>${String(vg).replace('-', '−')} V</b> the plate current is <b>${Math.round(c * 100)}%</b> of its value at 0 V.`; fig.invalidate(); };
  hint(el, 'drag the grid voltage handle down until the electrons are turned back.');
  paint();
}

// ---------- 3. The MOSFET and its leak ----------
// The 3D figure shows the structure; the log I–V the prose relies on is its own figure (mosfetLog), so without WebGL the 3D slot is hidden
// rather than drawing the same 2D figure twice.
export function mosfet(el) { try { if (window.AIX3D && window.AIX3D.mosfet3d(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } el.hidden = true; }
export function mosfetLog(el) { mosfet2d(el); }
function mosfet2d(el) {
  const PHI = 0.02585, NF = 1.2, S = NF * PHI * Math.LN10; // 71 mV per decade
  const VDD = 0.7; // supply: a logic gate's input never goes above it
  let vg = 0.7, vt = 0.35, R = {};
  const id = v => Math.log1p(Math.exp((v - vt) / (2 * NF * PHI))) ** 2; // EKV-style, arbitrary units
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 560 : 320), label: 'A MOSFET cross-section with a draggable gate voltage, beside its current on a logarithmic scale',
    draw(ctx, w, h) {
      const n = narrow(w), cw = n ? w - 20 : w * 0.42, ch = n ? 220 : h - 40, x0 = 10, y0 = 20;
      // cross-section
      const sy = y0 + ch * 0.45, rel = clamp(L10(id(vg) / id(VDD)) / 6 + 1, 0, 1);
      rrect(ctx, x0, sy, cw, ch * 0.55, 6); ctx.fillStyle = '#e8e6e1'; ctx.fill(); text(ctx, 'silicon', x0 + 10, y0 + ch - 10, { size: 11, color: C.ink3 });
      [[x0 + cw * 0.06, 'source'], [x0 + cw * 0.7, 'drain']].forEach(([x, s]) => { rrect(ctx, x, sy, cw * 0.24, ch * 0.18, 4); ctx.fillStyle = alpha(C.blue, 0.35); ctx.fill(); text(ctx, s, x + cw * 0.12, sy + ch * 0.12, { size: 11.5, align: 'center', weight: 600, color: C.ink }); });
      rrect(ctx, x0 + cw * 0.3, sy - 8, cw * 0.4, 8, 1); ctx.fillStyle = C.grid2; ctx.fill();
      const gyT = sy - 8 - 18 - vg * 30; R.g = [x0 + cw * 0.5, gyT, sy];
      rrect(ctx, x0 + cw * 0.3, gyT, cw * 0.4, 18, 3); ctx.fillStyle = C.compute; ctx.fill(); text(ctx, `gate ${vg.toFixed(2)} V`, x0 + cw * 0.5, gyT - 8, { size: 12.5, align: 'center', weight: 700, color: C.ink });
      line(ctx, x0 + cw * 0.5, gyT + 18, x0 + cw * 0.5, sy - 8, C.compute, 1, [2, 3]);
      ctx.save(); ctx.globalAlpha = 0.15 + 0.85 * rel; rrect(ctx, x0 + cw * 0.3, sy + 1, cw * 0.4, 3 + 7 * rel, 2); ctx.fillStyle = C.blue; ctx.fill(); ctx.restore();
      text(ctx, rel > 0.75 ? 'channel open' : rel > 0.35 ? 'barely open: leaking' : 'channel closed', x0 + cw * 0.5, sy + 26 + 7 * rel, { size: 11, align: 'center', color: C.ink2, weight: 600 });
      // log I-V plot
      const box = n ? { l: 54, r: w - 16, t: ch + 64, b: h - 34 } : { l: w * 0.5 + 40, r: w - 16, t: 34, b: h - 40 };
      const { sx, sy: py } = axes(ctx, { box, x0: 0, x1: 0.8, y0: -9, y1: 0.5, yticks: [-8, -6, -4, -2, 0], xticks: [0, 0.2, 0.4, 0.6, 0.8], yfmt: v => (v === 0 ? '1' : `10${sup(v)}`), xfmt: v => `${v} V`, ylabel: 'current, relative to on at the 0.7 V supply', xlabel: 'gate voltage' });
      ctx.save(); ctx.strokeStyle = C.compute; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 100; i++) { const v = i / 100 * 0.8, y = py(clamp(L10(id(v) / id(VDD)), -9, 0.5)); i ? ctx.lineTo(sx(v), y) : ctx.moveTo(sx(v), y); } ctx.stroke(); ctx.restore();
      line(ctx, sx(VDD), box.t, sx(VDD), box.b, C.compute, 1, [2, 3]); text(ctx, 'supply', sx(VDD) + 4, box.b - 6, { size: 10.5, color: C.compute });
      line(ctx, sx(vt), box.t, sx(vt), box.b, C.ink3, 1, [4, 4]); text(ctx, `threshold ${vt.toFixed(2)} V`, sx(vt) + 4, box.t + 10, { size: 11, color: C.ink3 });
      circle(ctx, sx(0), py(clamp(L10(id(0) / id(VDD)), -9, 0.5)), 6, C.heat, '#fff', 2); text(ctx, 'off-leak', sx(0) + 10, py(clamp(L10(id(0) / id(VDD)), -9, 0.5)) + 16, { size: 11, color: C.heat, weight: 650 });
      circle(ctx, sx(vg), py(clamp(L10(id(vg) / id(VDD)), -9, 0.5)), 8, '#fff', C.compute, 3);
      R.plot = { sx, box };
    },
  });
  fig.interact({
    hit: (x, y) => { const [gx, gy] = R.g; if (Math.abs(x - gx) < 70 && Math.abs(y - gy - 9) < 34) return 'gate'; const b = R.plot.box; if (x > b.l - 10 && x < b.r + 10 && y > b.t && y < b.b + 10) return 'plot'; return null; },
    cursor: 'grab',
    down(q, x, y) { this.move(q, x, y); }, move(q, x, y) { if (q === 'gate') vg = clamp((R.g[2] - 8 - 18 - y + 9) / 30, 0, VDD); else vg = clamp(R.plot.sx.inv(x), 0, VDD); vg = Math.round(vg * 100) / 100; paint(); },
  });
  const ctl = controls(el);
  slider(ctl, { label: 'Threshold voltage', name: 'vt', min: 0.15, max: 0.5, step: 0.01, value: vt, color: C.compute, fmt: v => `${v.toFixed(2)} V`, oninput: v => { vt = v; paint(); } });
  const ro = readout(el);
  const paint = () => { const ratio = id(0.7) / id(0); const fr = id(vg) / id(VDD), e = Math.floor(L10(fr)); ro.innerHTML = `Gate at ${vg.toFixed(2)} V: <b>${fr >= 0.01 ? Math.round(fr * 100) + '%' : `${(fr / 10 ** e).toFixed(1)} × 10${sup(e)}`}</b> of full “on”. “On” passes about <b>${ratio >= 1e6 ? +(ratio / 1e6).toPrecision(2) + ' million' : ratio >= 1e4 ? Math.round(ratio / 1000).toLocaleString('en-GB') + ' thousand' : Math.round(ratio).toLocaleString('en-GB')} times</b> the “off” leak; each ${Math.round(S * 1000)} mV off the threshold leaks ten times more.`; fig.invalidate(); };
  hint(el, 'drag the blue gate up and down, then lower the threshold and watch the orange off-leak rise.');
  paint();
}

// ---------- 4. Energy per transistor per clock tick (real data, derived) ----------
export function joulesPerTick(el) {
  const gm = a => Math.exp(a.reduce((s, v) => s + Math.log(v), 0) / a.length), pts = [];
  for (let y = 1971; y <= 2021; y += 3) { const g = k => RUPP[k].filter(p => p[0] >= y && p[0] < y + 3).map(p => p[1]); const W = g('watts'), N = g('transistors'), F = g('frequency'); if (W.length && N.length && F.length) pts.push([y + 1.5, L10(gm(W) / (gm(N) * 1e3 * gm(F) * 1e6)), W.length]); }
  const f1 = fit(pts.filter(p => p[0] < 2005).map(p => [p[0], p[1]])), f2 = fit(pts.filter(p => p[0] > 2005).map(p => [p[0], p[1]]));
  const per = f => 10 ** -(f(2001) - f(2000));
  let yr = 2004, R = {};
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 340 : 300), label: 'Average power per transistor per clock tick of microprocessors, 1971 to 2021, on a log scale',
    draw(ctx, w, h) {
      const box = { l: 52, r: w - 16, t: 30, b: h - 34 };
      const { sx, sy } = axes(ctx, { box, x0: 1970, x1: 2022, y0: -18.2, y1: -9, yticks: [-18, -16, -14, -12, -10], yfmt: v => `10${sup(v)} J`, ylabel: 'joules per transistor per clock tick (log scale)' });
      ctx.save(); ctx.fillStyle = alpha(C.heat, 0.06); ctx.fillRect(sx(2005), box.t, box.r - sx(2005), box.b - box.t); ctx.restore();
      [[f1, 1970, 2005], [f2, 2005, 2022]].forEach(([f, a, b]) => line(ctx, sx(a), sy(f(a)), sx(b), sy(f(b)), C.ink3, 1.5, [5, 4]));
      pts.forEach(p => circle(ctx, sx(p[0]), sy(p[1]), 3 + Math.sqrt(p[2]), alpha(C.heat, 0.85), '#fff', 1.5));
      const p = pts.reduce((a, b) => (Math.abs(b[0] - yr) < Math.abs(a[0] - yr) ? b : a));
      line(ctx, sx(p[0]), box.t, sx(p[0]), box.b, C.ink, 1.5); circle(ctx, sx(p[0]), sy(p[1]), 9, null, C.ink, 2.5);
      text(ctx, `÷${per(f1).toFixed(2)} a year`, sx(1985), sy(f1(1985)) - 12, { size: 12, weight: 650, color: C.ink2 });
      text(ctx, `÷${per(f2).toFixed(2)} a year`, sx(2013), sy(f2(2013)) + 22, { size: 12, weight: 650, color: C.ink2, align: 'center' });
      R = { sx, box, p };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (y > R.box.t - 10 && y < R.box.b + 20 ? 'y' : null), cursor: 'ew-resize', down(q, x) { yr = R.sx.inv(x); paint(); }, move(q, x) { yr = R.sx.inv(x); paint(); } });
  const ro = readout(el);
  const paint = () => { fig.invalidate(); { const p = pts.reduce((a, b) => (Math.abs(b[0] - yr) < Math.abs(a[0] - yr) ? b : a)), v = 10 ** p[1]; const q = x => Number(x.toPrecision(2)).toLocaleString('en-GB'), s = v >= 1e-12 ? `${q(v * 1e12)} picojoules` : v >= 1e-15 ? `${q(v * 1e15)} femtojoules` : `${q(v * 1e18)} attojoules`; ro.innerHTML = `Chips from <b>${Math.round(p[0] - 1.5)}–${Math.round(p[0] + 1.5)}</b> spent about <b>${s}</b> per transistor per tick (${p[2]} chip${p[2] > 1 ? 's' : ''}). It fell ${per(f1).toFixed(1)}-fold a year before 2005, ${per(f2).toFixed(1)}-fold since.`; } };
  hint(el, 'drag along the years to read each dot.');
  paint();
}

// ---------- 5. Dark silicon ----------
// The rail counts generations after the voltage stopped falling, not named nodes: this worst case (Vdd and clock frozen, C ÷ √2 per step)
// is harsher than real chips, which still trimmed Vdd and clocks. Esmaeilzadeh et al., ISCA 2011 (n9) project 21% dark at 22 nm and
// >50% at 8 nm, so mapping g onto node names would contradict the cited study.
const NODES = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
export function darkSilicon(el) {
  let g = 4, dennardOn = false, R = {};
  const lit = () => (dennardOn ? 1 : Math.min(1, Math.SQRT2 ** -g));
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 396 : 336), label: 'A chip at a fixed power budget: with each new node, the share of its cores that can be switched on at once',
    draw(ctx, w, h) {
      const n = narrow(w), cols = 2 ** Math.ceil((g + 2) / 2), rows = 2 ** Math.floor((g + 2) / 2), tot = cols * rows;
      const side = Math.min(h - 116, n ? w - 40 : 260), pad = 14, x0 = (n ? (w - side) / 2 : w * 0.12), y0 = 22, cs = side / cols, rs = side / rows;
      const on = Math.round(tot * lit()), r = rng(3), order = [...Array(tot).keys()].sort(() => r() - 0.5);
      const isOn = new Set(order.slice(0, on));
      // package substrate (soft die look)
      rrect(ctx, x0 - pad, y0 - pad, side + pad * 2, side + pad * 2, 10); ctx.fillStyle = '#d8d4cc'; ctx.fill();
      rrect(ctx, x0 - 4, y0 - 4, side + 8, side + 8, 6); ctx.fillStyle = '#2a2826'; ctx.fill();
      for (let i = 0; i < tot; i++) {
        const cx = x0 + (i % cols) * cs, cy = y0 + Math.floor(i / cols) * rs;
        const rad = Math.min(4, cs / 5);
        rrect(ctx, cx + 1.5, cy + 1.5, cs - 3, rs - 3, rad);
        if (isOn.has(i)) {
          const grd = ctx.createLinearGradient(cx, cy, cx + cs, cy + rs);
          grd.addColorStop(0, '#f0d060'); grd.addColorStop(1, '#e3a826');
          ctx.fillStyle = grd; ctx.fill();
          ctx.fillStyle = alpha('#fff', 0.25); rrect(ctx, cx + 2, cy + 2, cs - 4, rs * 0.35, rad); ctx.fill();
        } else {
          ctx.fillStyle = '#3b3934'; ctx.fill();
        }
      }
      // heat bloom over lit fraction
      if (on > 0) {
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const hx = x0 + side / 2, hy = y0 + side / 2;
        const g2 = ctx.createRadialGradient(hx, hy, side * 0.1, hx, hy, side * 0.65);
        g2.addColorStop(0, alpha(C.heat, 0.18 * lit())); g2.addColorStop(1, alpha(C.heat, 0));
        ctx.fillStyle = g2; ctx.fillRect(x0, y0, side, side); ctx.restore();
      }
      text(ctx, `${tot} cores · ${on} lit`, x0 + side / 2, y0 + side + pad + 16, { size: 12, align: 'center', weight: 650, color: C.ink });
      if (!n) { const bx = w * 0.6; text(ctx, 'same die area · same power', bx, 50, { size: 12, color: C.ink3 }); text(ctx, `${Math.round(lit() * 100)}% lit`, bx, 96, { size: 34, weight: 750, color: C.ink }); text(ctx, dennardOn ? 'if voltage still fell with size' : 'voltage stuck near 0.7–1 V', bx, 122, { size: 12, color: C.ink2 }); }
      const ry = h - 46, l = 24, rr = w - 24, gx = i => l + i / (NODES.length - 1) * (rr - l);
      text(ctx, 'generations after the voltage stopped falling', w / 2, ry + 37, { size: 11, align: 'center', color: C.ink3 }); line(ctx, l, ry, rr, ry, C.grid2, 4); NODES.forEach((s, i) => { line(ctx, gx(i), ry - 5, gx(i), ry + 5, C.ink3, 1); text(ctx, s, gx(i), ry + 20, { size: 10.5, align: 'center', color: C.ink3 }); });
      circle(ctx, gx(g), ry, 11, '#fff', C.compute, 3); R = { gx, ry, l, rr };
    },
  });
  const set = x => { const v = clamp(Math.round((x - R.l) / (R.rr - R.l) * (NODES.length - 1)), 0, NODES.length - 1); if (v !== g) { g = v; paint(); } };
  fig.interact({ hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'g' : null), cursor: 'ew-resize', down(q, x) { set(x); }, move(q, x) { set(x); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Voltage', value: false, options: [{ label: 'stuck (after 2005)', value: false, name: 'ds-stuck' }, { label: 'still falling (Dennard)', value: true, name: 'ds-dennard' }], onchange: v => { dennardOn = v; paint(); } });
  const ro = readout(el);
  const paint = () => { ro.innerHTML = g === 0 ? `In the last generation before the voltage stuck, every transistor can switch at full speed within the power budget.` : `<b>${g} generation${g > 1 ? 's' : ''}</b> on: ${2 ** g}× the transistors. ${dennardOn ? 'With voltage still falling, all can run at full speed.' : `Each flip costs ${Math.round(100 / Math.SQRT2 ** g)}% of what it did, so only <b>${Math.round(lit() * 100)}%</b> can be on at once.`}`; fig.invalidate(); };
  hint(el, 'drag through the generations after the voltage stuck.');
  paint();
}

// ---------- 6. Lithography: light through a mask onto resist (CIECH #10) ----------
const TOOLS = [
  { k: 'g', label: 'g-line 436 nm', lam: 436, na: 0.45, yr: '1980s' }, { k: 'i', label: 'i-line 365 nm', lam: 365, na: 0.6, yr: '1990s' },
  { k: 'krf', label: 'KrF 248 nm', lam: 248, na: 0.8, yr: 'around 2000' }, { k: 'arf', label: 'ArF 193 nm', lam: 193, na: 0.93, yr: '2000s' },
  { k: 'arfi', label: 'ArF immersion', lam: 193, na: 1.35, yr: 'since ~2007' }, { k: 'euv', label: 'EUV 13.5 nm', lam: 13.5, na: 0.33, yr: 'since 2019' }, { k: 'hna', label: 'High-NA EUV', lam: 13.5, na: 0.55, yr: '2025–26' },
];
// Two-beam image of 1:1 lines with off-axis (dipole) illumination, as production scanners use. Orders 0 and ±1 of a 1:1 grating have
// amplitudes ½ and 1/π, so two-beam contrast is 2a₀a₁/(a₀²+a₁²) ≈ 0.91, and it holds as the pitch shrinks while the first order still
// fits in the lens. The order separation in pupil units is d = λ/(p·NA) = 1/(2k₁); with poles of radius 0.1 (σ units) the share of pole
// light whose first order is caught falls (linear approx.) from 1 at d = 1.8 (k₁ ≈ 0.28) to 0 at d = 2 (k₁ = 0.25, the hard floor);
// pole light that loses its first order adds only a flat a₀² background. A schematic resist threshold of 40% contrast then prints
// ArF immersion at 38 nm but not 37 nm, matching ASML's NXT:2000i "38 nm (dipole), 40 nm (C-quad)" (note n10; C. Mack,
// Fundamental Principles of Optical Lithography, Wiley 2007, ch. 2 and 10).
const LITHO_PRINT = 0.4;
function lithoContrast(lam, na, hp) {
  const d = lam / (2 * hp * na), f = clamp((2 - d) / 0.2, 0, 1), a0 = 0.5, a1 = 1 / Math.PI;
  return f ? (f * 2 * a0 * a1) / (f * (a0 * a0 + a1 * a1) + (1 - f) * a0 * a0) : 0;
}
function litho2d(el) {
  let ti = 4, hp = 60, R = {}, tRay = 0;
  const contrast = () => { const t = TOOLS[ti]; return lithoContrast(t.lam, t.na, hp); };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 380 : 360), animated: true,
    label: 'Light through a chrome mask onto photoresist on a wafer: features blur as the half-pitch nears the wavelength limit',
    step(dt) { tRay += dt; },
    draw(ctx, w, h) {
      const n = narrow(w), l = 14, r = w - 14, top = 14;
      const m = contrast(), tool = TOOLS[ti];
      const stageB = h - 72, stageH = stageB - top;
      // layout bands: lamp → mask → gap (rays) → resist/wafer
      const lampY = top + 8, maskY = top + stageH * 0.22, resistY = top + stageH * 0.62, waferY = resistY + 28;
      const maskH = 18, waferH = Math.min(36, stageH * 0.14);
      const span = 8 * 2 * hp, nBars = 7;
      const barW = (r - l - 40) / (nBars * 2);
      const x0 = l + 20;
      // lamp / source
      rrect(ctx, w / 2 - 36, lampY, 72, 16, 8); ctx.fillStyle = alpha(C.yellow, 0.85); ctx.fill();
      text(ctx, n ? `${tool.lam} nm` : `light · ${tool.lam} nm`, w / 2, lampY + 12, { size: 11, align: 'center', weight: 700, color: C.ink });
      // rays through mask openings (animated dash)
      ctx.save(); ctx.strokeStyle = alpha(C.yellow, 0.55); ctx.lineWidth = 1.4; ctx.setLineDash([4, 6]); ctx.lineDashOffset = -tRay * 28;
      for (let k = 0; k < nBars; k++) {
        const cx = x0 + (2 * k + 1.5) * barW;
        ctx.beginPath(); ctx.moveTo(cx, lampY + 18); ctx.lineTo(cx, resistY); ctx.stroke();
      }
      ctx.restore();
      // mask plate with chrome
      rrect(ctx, l + 8, maskY, r - l - 16, maskH + 8, 4); ctx.fillStyle = '#d7dce3'; ctx.fill(); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1; ctx.stroke();
      text(ctx, 'mask', l + 14, maskY - 4, { size: 11, weight: 650, color: C.ink3 });
      for (let k = 0; k < nBars; k++) {
        // chrome blocks light; openings between
        const bx = x0 + 2 * k * barW;
        rrect(ctx, bx, maskY + 3, barW * 0.95, maskH, 1); ctx.fillStyle = C.ink; ctx.fill();
      }
      text(ctx, n ? 'chrome' : 'chrome blocks · openings pass light', w / 2, maskY + maskH + 18, { size: 10, align: 'center', color: C.ink3, halo: 3 });
      // intensity profile just above the resist (blurred image)
      const profY = resistY - 8, profH = 36;
      ctx.save(); ctx.beginPath(); ctx.moveTo(x0, profY);
      for (let i = 0; i <= 200; i++) {
        const u = i / 200, x = x0 + u * nBars * 2 * barW;
        // square-wave mask blurred by contrast m: I = 0.5 - 0.5 m cos(...)
        const I = 0.5 - 0.5 * m * Math.cos(2 * Math.PI * (u * nBars - 0.25));
        const y = profY - I * profH;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = C.compute; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      line(ctx, x0, profY - 0.5 * profH, x0 + nBars * 2 * barW, profY - 0.5 * profH, C.ink3, 1, [3, 3]);
      text(ctx, 'image on the resist', x0, profY - profH - 4, { size: 10.5, color: C.ink3 });
      // resist layer + printed features (blur grows as m falls)
      rrect(ctx, l + 8, resistY, r - l - 16, 22, 3); ctx.fillStyle = alpha(C.memory, 0.2); ctx.fill();
      text(ctx, 'photoresist', l + 14, resistY - 4, { size: 11, weight: 650, color: C.memory });
      const blur = Math.max(0, (1 - m) * barW * 0.55);
      if (m > LITHO_PRINT) {
        for (let k = 0; k < nBars; k++) {
          const bx = x0 + 2 * k * barW + blur, bw = Math.max(1, barW * 0.95 - 2 * blur);
          rrect(ctx, bx, resistY + 3, bw, 16, 2); ctx.fillStyle = alpha(C.memory, Math.min(1, 0.35 + m)); ctx.fill();
        }
      } else {
        rrect(ctx, x0, resistY + 3, nBars * 2 * barW, 16, 3); ctx.fillStyle = alpha(C.ink3, 0.25); ctx.fill();
        text(ctx, 'too blurred — nothing prints', w / 2, resistY + 15, { size: 11.5, align: 'center', weight: 650, color: C.ink2 });
      }
      // wafer
      rrect(ctx, l + 4, waferY, r - l - 8, waferH, 6); ctx.fillStyle = '#b9c0ca'; ctx.fill(); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.2; ctx.stroke();
      text(ctx, n ? 'wafer' : 'silicon wafer', w / 2, waferY + waferH / 2 + 4, { size: 12, align: 'center', weight: 700, color: C.ink });
      // half-pitch rail
      const ry = h - 30, lw = r - l, hx = v => l + (L10(v) - L10(5)) / (L10(500) - L10(5)) * lw;
      line(ctx, l, ry, r, ry, C.grid2, 4);
      [5, 10, 20, 50, 100, 200, 500].forEach(v => { line(ctx, hx(v), ry - 4, hx(v), ry + 4, C.ink3, 1); if (Math.abs(Math.log(v) - Math.log(hp)) > 0.18) text(ctx, `${v} nm`, hx(v), ry + 18, { size: 10.5, align: 'center', color: C.ink3 }); });
      text(ctx, 'half-pitch / line width (drag)', l, ry - 14, { size: 11, color: C.ink3 });
      circle(ctx, hx(hp), ry, 11, '#fff', C.memory, 3); R = { hx, ry, l, r };
      void span;
    },
  });
  const set = x => { hp = Math.round(clamp(10 ** (L10(5) + (x - R.l) / (R.r - R.l) * (L10(500) - L10(5))), 5, 500)); paint(); };
  fig.interact({ panY: true, hit: (x, y) => (Math.abs(y - R.ry) < 28 ? 'h' : null), cursor: 'ew-resize', down(q, x) { set(x); }, move(q, x) { set(x); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Light source', value: ti, options: TOOLS.map((t, i) => ({ label: t.label, value: i, name: 'li-' + t.k })), onchange: v => { ti = v; paint(); } });
  const ro = readout(el);
  const paint = () => {
    const t = TOOLS[ti], lim = t.lam / (4 * t.na), m = contrast();
    ro.innerHTML = `${t.label} (${t.yr}), NA ${t.na}: <b>${hp} nm</b> lines (k₁ = ${(hp * t.na / t.lam).toFixed(2)}) reach the resist at <b>${Math.round(m * 100)}%</b> contrast${m > LITHO_PRINT ? '' : ', too little to print'}. One-exposure floor ≈ <b>${(Math.round(lim * 10) / 10)} nm</b> (k₁ = 0.25).${t.lam < 20 ? ' EUV really uses a reflective mask and mirrors in vacuum; drawn straight through here.' : ''}`;
    fig.invalidate();
  };
  hint(el, 'drag the line width down until the resist features blur away, then switch to a shorter wavelength.');
  paint();
}


export function litho(el) { try { if (window.AIX3D && window.AIX3D.litho3d(el, { ui: UI3D })) return; } catch (e) { console.warn(e); el.querySelector(".three-wrap")?.remove(); } litho2d(el); }

// ---------- 6b. Bridge: same wafer, one exposure field (CIECH #9) ----------
// Field size ~26 × 33 mm is the largest area a scanner exposes at once (cited on the Flip page / ASML).
export function exposureField(el) {
  let fieldOn = true;
  const WR = 150; // mm
  const FW = 26, FH = 33; // mm
  let tScan = 0.35;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 600 : 320), animated: true,
    label: 'A 300 mm wafer with one scanner exposure field highlighted, and the field enlarged: an H100-class die of about 814 square millimetres fills about 95% of the 26 by 33 mm window',
    step(dt) { tScan = (tScan + dt * 0.15) % 1; },
    draw(ctx, w, h) {
      const n = narrow(w), D = n ? Math.min(250, w - 40) : Math.min(h - 70, 250), cx = n ? w / 2 : 24 + D / 2, cy = 30 + D / 2, s = D / (2 * WR);
      circle(ctx, cx, cy, D / 2, '#cfd5de', C.ink3, 1.5);
      circle(ctx, cx, cy, D / 2 - 4, '#dfe3ea', null);
      text(ctx, '300 mm wafer', cx, 16, { size: 11, align: 'center', weight: 650, color: C.ink2 });
      const a = 10;
      ctx.strokeStyle = alpha(C.ink3, 0.25); ctx.lineWidth = 0.6;
      for (let y = -WR + a; y < WR - a; y += a) for (let x = -WR + a; x < WR - a; x += a) {
        if (x * x + y * y > (WR - 8) ** 2) continue;
        ctx.strokeRect(cx + x * s, cy + y * s, a * s, a * s);
      }
      // the die is printed inside the field; its shape is schematic (area 814 mm², drawn at the field's aspect)
      const DW = Math.sqrt(814 * FW / FH), DH = 814 / DW;
      const fy = -FH / 2 + (tScan - 0.5) * 18, px = cx - FW / 2 * s, py = cy + fy * s, pw = FW * s, ph = FH * s;
      if (fieldOn) { rrect(ctx, px, py, pw, ph, 2); ctx.fillStyle = alpha(C.yellow, 0.35); ctx.fill(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 2; ctx.stroke(); }
      rrect(ctx, cx - DW / 2 * s, py + (FH - DH) / 2 * s, DW * s, DH * s, 1); ctx.fillStyle = alpha(C.compute, 0.55); ctx.fill();
      // enlarged field: right of the wafer (desktop) or below it (phone)
      const iy0 = n ? 30 + D + 46 : 40, ih = n ? h - iy0 - 120 : h - 110, iw = ih * FW / FH, ix = n ? w / 2 - iw / 2 : Math.max(24 + D + 150, (24 + D + w) / 2 - iw / 2 - 40), k = ih / FH;
      ctx.save(); ctx.setLineDash([3, 4]);
      if (n) { line(ctx, px, py + ph, ix, iy0, C.ink3, 1); line(ctx, px + pw, py + ph, ix + iw, iy0, C.ink3, 1); }
      else { line(ctx, px + pw, py, ix, iy0, C.ink3, 1); line(ctx, px + pw, py + ph, ix, iy0 + ih, C.ink3, 1); }
      ctx.restore();
      rrect(ctx, ix, iy0, iw, ih, 3); ctx.fillStyle = fieldOn ? alpha(C.yellow, 0.3) : '#eef0f2'; ctx.fill(); ctx.strokeStyle = fieldOn ? C.yellow : C.ink3; ctx.lineWidth = 2.2; ctx.stroke();
      const dx = ix + (iw - DW * k) / 2, dy = iy0 + (ih - DH * k) / 2;
      rrect(ctx, dx, dy, DW * k, DH * k, 2); ctx.fillStyle = alpha(C.compute, 0.68); ctx.fill(); ctx.strokeStyle = C.compute; ctx.lineWidth = 1.8; ctx.stroke();
      text(ctx, 'H100-class die', ix + iw / 2, iy0 + ih / 2 - 6, { size: 12.5, align: 'center', weight: 700, color: C.ink });
      text(ctx, '≈814 mm²', ix + iw / 2, iy0 + ih / 2 + 12, { size: 12, align: 'center', weight: 650, color: C.ink });
      text(ctx, '26 mm', ix + iw / 2, iy0 - 8, { size: 11, align: 'center', weight: 650, color: C.ink2 });
      text(ctx, '33 mm', ix + iw + 8, iy0 + ih / 2 + 4, { size: 11, weight: 650, color: C.ink2 });
      const tx = n ? w / 2 : ix + iw + 60, ty = n ? iy0 + ih + 26 : iy0 + 24, al = n ? 'center' : 'left';
      text(ctx, 'one exposure field: 858 mm²', tx, ty, { size: 12, align: al, weight: 700, color: C.ink });
      text(ctx, 'the die fills about 95% of it', tx, ty + 18, { size: 12, align: al, weight: 650, color: C.compute });
      if (!n) text(ctx, 'die shape schematic; area to scale', tx, ty + 36, { size: 10.5, align: al, color: C.ink3 });
      rrect(ctx, w / 2 - 70, h - 38, 140, 26, 13); ctx.fillStyle = fieldOn ? alpha(C.yellow, 0.35) : alpha(C.ink3, 0.15); ctx.fill();
      ctx.strokeStyle = fieldOn ? C.yellow : C.ink3; ctx.lineWidth = 1.5; ctx.stroke();
      text(ctx, fieldOn ? 'field on' : 'field off', w / 2, h - 20, { size: 12, align: 'center', weight: 700, color: C.ink });
    },
  });
  fig.interact({
    panY: true, cursor: 'pointer',
    hit: (x, y) => (y > fig.h - 44 ? 't' : null),
    down(k) { if (k === 't') { fieldOn = !fieldOn; paint(); } },
  });
  const ro = readout(el);
  const paint = () => {
    ro.innerHTML = fieldOn
      ? `One exposure lands in a <b>≈26 × 33 mm</b> field (ASML scanner window, cited on this page). An H100-class die (~814 mm²) nearly fills that window — which is why big chips sit at the lithography limit before yield.`
      : `With the field hidden, the wafer is just a grid of dies. Toggle the field back on to see the print window that bridges printing with light to yield.`;
    fig.invalidate();
  };
  hint(el, 'tap the field chip; the yellow window is the same mask image from the figure above, one shot at a time.');
  paint();
}

// ---------- 7. Yield: why big chips are expensive ----------
function yieldDie2d(el) {
  let side = 20, d0 = 0.1, chip = false, R = {};
  const WR = 150; // wafer radius, mm
  const layout = () => {
    const r = rng(11), nd = Math.round(d0 * Math.PI * 15 ** 2), defects = []; while (defects.length < nd) { const x = (r() * 2 - 1) * WR, y = (r() * 2 - 1) * WR; if (x * x + y * y < WR * WR) defects.push([x, y]); }
    const a = chip ? side / 2 : side, dies = []; let good = 0;
    for (let y = -WR; y < WR; y += a) for (let x = -WR; x < WR; x += a) {
      if ([[x, y], [x + a, y], [x, y + a], [x + a, y + a]].some(([u, v]) => u * u + v * v > (WR - 3) ** 2)) continue;
      const bad = defects.some(([u, v]) => u >= x && u < x + a && v >= y && v < y + a); if (!bad) good++; dies.push([x, y, bad]);
    }
    return { dies, defects, gross: dies.length, good, a };
  };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 420 : 340), label: 'A 300 mm wafer with random defects; drag the die size and see how many dies come out with no defect',
    draw(ctx, w, h) {
      const n = narrow(w), D = Math.min(h - 70, n ? w - 30 : 280), cx = n ? w / 2 : 30 + D / 2, cy = 16 + D / 2, s = D / (2 * WR);
      circle(ctx, cx, cy, D / 2, '#dfe3ea', C.grid2, 1.5);
      const { dies, defects, gross, good, a } = layout();
      dies.forEach(([x, y, bad]) => { ctx.fillStyle = bad ? alpha(C.heat, 0.55) : alpha(C.compute, 0.8); ctx.fillRect(cx + x * s + 0.6, cy + y * s + 0.6, a * s - 1.2, a * s - 1.2); });
      defects.forEach(([u, v]) => circle(ctx, cx + u * s, cy + v * s, 1.8, C.ink));
      const ry = h - 30, l = n ? 20 : cx + D / 2 + 40, rr = w - 24, sx2 = v => l + (v - 5) / 25 * (rr - l); line(ctx, l, ry, rr, ry, C.grid2, 4);
      [5, 10, 15, 20, 25, 30].forEach(v => { line(ctx, sx2(v), ry - 4, sx2(v), ry + 4, C.ink3, 1); if (Math.abs(v - side) > 1.2) text(ctx, `${v} mm`, sx2(v), ry + 18, { size: 10.5, align: 'center', color: C.ink3 }); });
      text(ctx, 'side of the chip (drag)', l, ry - 14, { size: 11, color: C.ink3 });
      // a 26 × 33 mm scanner field = 858 mm², a square of side √858 ≈ 29.3 mm (ASML, note n10): larger chips cannot be printed in one exposure
      const rx = sx2(Math.sqrt(858)); line(ctx, rx, ry - 9, rx, ry + 9, C.heat, 2); text(ctx, 'field limit, 858 mm²', rx + 4, ry - 14, { size: 11, align: 'right', color: C.heat, weight: 650 });
      circle(ctx, sx2(side), ry, 11, '#fff', C.compute, 3); R.rail = { sx2, ry, l, rr };
      if (!n) { const bx = l; text(ctx, chip ? 'good chiplets' : 'good dies', bx, 50, { size: 12, color: C.ink3 }); text(ctx, `${good} of ${gross}`, bx, 88, { size: 30, weight: 750, color: C.ink }); text(ctx, `${Math.round(good / Math.max(1, gross) * 100)}% yield`, bx, 116, { size: 14, weight: 650, color: C.compute }); }
    },
  });
  const set = x => { const { sx2, l, rr } = R.rail; side = Math.round(clamp(5 + (x - l) / (rr - l) * 25, 5, 30)); paint(); };
  fig.interact({ hit: (x, y) => (Math.abs(y - R.rail.ry) < 28 && x > R.rail.l - 20 ? 's' : null), cursor: 'ew-resize', down(q, x) { set(x); }, move(q, x) { set(x); } });
  const ctl = controls(el);
  slider(ctl, { label: 'Defects per cm²', name: 'd0', min: 0.02, max: 0.5, step: 0.01, value: d0, color: C.heat, fmt: v => v.toFixed(2), oninput: v => { d0 = v; paint(); } });
  button(ctl, 'Split into four chiplets', () => { chip = !chip; paint(); }, { name: 'yd-chiplet' });
  const ro = readout(el);
  const paint = () => { fig.invalidate(); { const { gross, good } = layout(), A = side * side / 100, ya = chip ? Math.exp(-A / 4 * d0) : Math.exp(-A * d0); ro.innerHTML = `${chip ? `Four chiplets of ${(side / 2)} × ${(side / 2)} mm` : `A ${side} × ${side} mm chip`} (${(A * 100).toFixed(0)} mm²): <b>${good}</b> of ${gross} ${chip ? 'chiplets' : 'dies'} are defect-free, about <b>${Math.round(ya * 100)}%</b> by the formula.${chip ? ` That makes ${Math.floor(good / 4)} complete chips.` : ''}`; } };
  hint(el, 'drag the chip size from a phone chip to an H100-sized one, then split it into chiplets.');
  paint();
}

// Wave 10 understanding audit: a wafer map is a plan view; flat map + counts teach it directly (yield3d kept in src, unused)
export function yieldDie(el) { yieldDie2d(el); }
