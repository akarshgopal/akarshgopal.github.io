// Essay §1–3: switches -> adder -> ripple adder -> Turing tape -> energy per flip.
import { Fig } from '../lib/fig.js';
import { C, alpha, lighten } from '../lib/colors.js';
import { text, rrect, line, circle, arrow, clamp, measure } from '../lib/draw.js';
import { controls, slider, segmented, button, readout, hint, more } from '../lib/ui.js';
import { isPlaying } from '../lib/fig.js';

const narrow = w => w < 560;
// A wall switch the reader taps. (x,y) = centre.
export function drawSwitch(ctx, x, y, s, on, label, o = {}) {
  ctx.save();
  rrect(ctx, x - s * 0.5, y - s * 0.75, s, s * 1.5, s * 0.16); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = C.grid2; ctx.lineWidth = 1.5; ctx.stroke();
  rrect(ctx, x - s * 0.3, y - s * 0.55, s * 0.6, s * 1.1, s * 0.1); ctx.fillStyle = on ? C.on : '#e6e6e3'; ctx.fill();
  const ly = on ? y - s * 0.27 : y + s * 0.27;
  rrect(ctx, x - s * 0.26, ly - s * 0.24, s * 0.52, s * 0.48, s * 0.08); ctx.fillStyle = on ? '#fff7df' : '#fff'; ctx.fill(); ctx.strokeStyle = on ? '#c9930d' : C.grid2; ctx.stroke();
  ctx.restore();
  if (label) text(ctx, label, x, y + s * 0.75 + 16, { size: o.size || 13, align: 'center', weight: 600, color: C.ink });
  text(ctx, on ? '1' : '0', x, y - s * 0.75 - 7, { size: o.size || 13, align: 'center', weight: 700, color: on ? '#a77908' : C.ink3 });
}
export function drawLamp(ctx, x, y, r, on, label, o = {}) {
  if (on) { const g = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 2.4); g.addColorStop(0, alpha(C.on, 0.55)); g.addColorStop(1, alpha(C.on, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.4, 0, 7); ctx.fill(); }
  circle(ctx, x, y, r, on ? '#ffd560' : '#efefec', on ? '#c9930d' : C.grid2, 1.5);
  if (label) text(ctx, label, x, y + r + 17, { size: o.size || 13, align: 'center', weight: 600, color: C.ink });
}
function wire(ctx, pts, on, t, w = 3) {
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.strokeStyle = on ? C.on : C.grid2; ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
  if (on) { ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = w * 0.45; ctx.setLineDash([3, 11]); ctx.lineDashOffset = -t * 40; ctx.stroke(); }
  ctx.restore();
}
function gateBox(ctx, x, y, bw, bh, title, sub, out) {
  rrect(ctx, x - bw / 2, y - bh / 2, bw, bh, 9); ctx.fillStyle = out ? '#fff8e4' : '#fff'; ctx.fill(); ctx.strokeStyle = out ? '#d9a521' : C.grid2; ctx.lineWidth = 1.5; ctx.stroke();
  text(ctx, title, x, y + (sub ? -1 : 4), { size: 13, align: 'center', weight: 650, color: C.ink });
  if (sub) text(ctx, sub, x, y + 15, { size: 11, align: 'center', color: C.ink3 });
}

// ---------- 1. Two switches that add ----------
export function switchAdder(el) {
  const st = { a: false, b: false };
  let R;
  const fig = new Fig(el, {
    height: w => narrow(w) ? 330 : Math.round(w * 0.42), animated: true, label: 'Two switches wired so that two lamps show their sum in binary',
    draw(ctx, w, h, f) {
      const n = narrow(w), s = n ? 40 : 48;
      const xs = n ? 42 : w * 0.12, xg = n ? w * 0.53 : w * 0.5, xl = n ? w - 34 : w * 0.86;
      const ya = h * 0.28, yb = h * 0.66;
      const bw = n ? 112 : 150, bh = 50;
      const sum = st.a !== st.b, carry = st.a && st.b;
      // wires: each switch feeds both boxes
      const xin = xg - bw / 2, xj = n ? xs + 40 : xs + (xin - xs) * 0.45;
      wire(ctx, [[xs + s * 0.5, ya], [xj, ya], [xj, ya - 9], [xin, ya - 9]], st.a, f.t);
      wire(ctx, [[xj, ya], [xj, yb - 9], [xin, yb - 9]], st.a, f.t);
      wire(ctx, [[xs + s * 0.5, yb], [xj + 12, yb], [xj + 12, yb + 9], [xin, yb + 9]], st.b, f.t);
      wire(ctx, [[xj + 12, yb], [xj + 12, ya + 9], [xin, ya + 9]], st.b, f.t);
      wire(ctx, [[xg + bw / 2, ya], [xl - 15, ya]], sum, f.t);
      wire(ctx, [[xg + bw / 2, yb], [xl - 15, yb]], carry, f.t);
      gateBox(ctx, xg, ya, bw, bh, n ? 'Different?' : 'Exactly one on?', 'XOR', sum);
      gateBox(ctx, xg, yb, bw, bh, 'Both on?', 'AND', carry);
      drawSwitch(ctx, xs, ya, s, st.a, 'A'); drawSwitch(ctx, xs, yb, s, st.b, 'B');
      drawLamp(ctx, xl, ya, 14, sum, n ? 'ones' : '1s place'); drawLamp(ctx, xl, yb, 14, carry, n ? 'twos' : '2s place');
      R = { a: [xs, ya, s], b: [xs, yb, s] };
      const av = +st.a, bv = +st.b, tot = av + bv;
      text(ctx, `${av} + ${bv} = ${tot}`, n ? w * 0.53 : w * 0.5, h - 12, { size: 15, align: 'center', weight: 650, color: C.ink });
    },
  });
  const hit = (x, y) => { for (const k of ['a', 'b']) { const [cx, cy, s] = R[k]; if (Math.abs(x - cx) < s * 0.75 && Math.abs(y - cy) < s) return k; } return null; };
  fig.interact({ hit, cursor: 'pointer', down(k) { st[k] = !st[k]; paint(); } });
  const ro = readout(el);
  const paint = () => { const s = st.a !== st.b, c = st.a && st.b; ro.innerHTML = `Lamps read <b>${+c}${+s}</b>: ${c ? 'one two and no ones, which is <b>2</b>' : s ? 'no twos and one one, which is <b>1</b>' : '<b>0</b>'}. Every sum of two 1-bit numbers comes out right.`; fig.invalidate(); };
  hint(el, 'tap the switches A and B. Each is a 0 or a 1; the two lamps on the right spell out their sum in binary.');
  paint();
}

// ---------- 2. Four adders in a row ----------
function fullAdder(a, b, c) { const x = a ^ b; return { s: x ^ c, c: (a & b) | (c & x), g: [x, x ^ c, a & b, c & x, (a & b) | (c & x)] }; }
function addAll(A, B) { let c = 0; const out = []; for (let i = 0; i < 4; i++) { const r = fullAdder(A[i], B[i], c); out.push(r); c = r.c; } return out; }
export function rippleAdder(el) {
  const A = [1, 1, 1, 0], B = [1, 0, 1, 0]; // bit i = 2^i ; A=7, B=5
  let res = addAll(A, B), shown = res.map(() => 1), since = 9, flips = 0, R = [];
  const val = X => X.reduce((s, v, i) => s + (v << i), 0);
  const change = (row, i) => { const old = addAll(A, B); row[i] ^= 1; res = addAll(A, B); flips = 0; old.forEach((o, k) => o.g.forEach((g, j) => { if (g !== res[k].g[j]) flips++; })); since = isPlaying() ? 0 : 9; paint(); };
  const DT = 0.45;
  const fig = new Fig(el, {
    height: w => narrow(w) ? 350 : Math.round(w * 0.4), animated: true, label: 'A four-bit adder built from four copies of the two-switch adder; the carry ripples from right to left',
    step(dt) { since += dt; },
    draw(ctx, w, h, f) {
      const n = narrow(w), m = n ? 46 : 120, colW = (w - m - 20) / 4, s = n ? 26 : 30;
      const yA = 38, yB = yA + s * 1.5 + 30, yBox = yB + s * 0.75 + 52, yS = yBox + 66;
      const xc = i => w - 20 - colW * (i + 0.5);
      text(ctx, 'A', 14, yA + 5, { size: 14, weight: 700, color: C.ink }); text(ctx, 'B', 14, yB + 5, { size: 14, weight: 700, color: C.ink });
      if (!n) { text(ctx, `= ${val(A)}`, 34, yA + 5, { size: 13, color: C.ink2 }); text(ctx, `= ${val(B)}`, 34, yB + 5, { size: 13, color: C.ink2 }); }
      R = [];
      for (let i = 0; i < 4; i++) {
        const x = xc(i), done = since >= DT * (i + 1), r = res[i];
        const cin = i === 0 ? 0 : (since >= DT * i ? res[i - 1].c : 0);
        wire(ctx, [[x - 8, yA + s * 0.75], [x - 8, yBox - 22]], A[i], f.t, 2.5);
        wire(ctx, [[x + 8, yB + s * 0.75], [x + 8, yBox - 22]], B[i], f.t, 2.5);
        drawSwitch(ctx, x - (n ? 0 : 0), yA, s, !!A[i], null, { size: 11 }); drawSwitch(ctx, x, yB, s, !!B[i], null, { size: 11 });
        R.push(['A', i, x, yA, s], ['B', i, x, yB, s]);
        const bw = Math.min(colW - 18, 96), busy = !done;
        rrect(ctx, x - bw / 2, yBox - 22, bw, 44, 8); ctx.fillStyle = busy ? alpha(C.time, 0.12) : '#fff'; ctx.fill(); ctx.strokeStyle = busy ? C.time : C.grid2; ctx.lineWidth = 1.5; ctx.stroke();
        text(ctx, n ? 'add' : 'add 3 bits', x, yBox + 5, { size: 12, align: 'center', weight: 600, color: busy ? C.ink3 : C.ink });
        // carry out to the next stage (leftwards)
        const cout = done ? r.c : 0, xn = i < 3 ? xc(i + 1) + bw / 2 : 26;
        wire(ctx, [[x - bw / 2, yBox], [xn, yBox]], !!cout, f.t, 2.5);
        if (i < 3 && !n) text(ctx, 'carry', (x - bw / 2 + xn) / 2, yBox - 6, { size: 10.5, align: 'center', color: cout ? '#a77908' : C.ink3 });
        const sv = done ? r.s : 0;
        wire(ctx, [[x, yBox + 22], [x, yS - 13]], !!sv, f.t, 2.5);
        drawLamp(ctx, x, yS, 12, !!sv, `${1 << i}s`, { size: 11.5 });
        void cin;
      }
      const allDone = since >= DT * 4, c4 = allDone ? res[3].c : 0;
      drawLamp(ctx, 26, yS, 12, !!c4, '16s', { size: 11.5 });
      wire(ctx, [[26, yBox], [26, yS - 13]], !!c4, f.t, 2.5);
      const total = val(res.map(r => r.s)) + (res[3].c << 4);
      text(ctx, allDone ? `${val(A)} + ${val(B)} = ${total}` : 'carry rippling…', w / 2, h - 10, { size: 14, align: 'center', weight: 650, color: allDone ? C.ink : C.ink3 });
    },
  });
  fig.interact({ cursor: 'pointer', hit: (x, y) => R.find(([, , cx, cy, s]) => Math.abs(x - cx) < s * 0.7 && Math.abs(y - cy) < s * 0.9) || null, down(r) { change(r[0] === 'A' ? A : B, r[1]); } });
  const ro = readout(el);
  const paint = () => { ro.innerHTML = `${val(A)} + ${val(B)}: the last change flipped <b>${flips}</b> of the 20 switches, each stage waiting for the carry from its right.`; fig.invalidate(); };
  hint(el, 'tap any switch to change A or B. Watch the carry travel right to left, one stage after another.');
  paint();
}

// ---------- 3. A Turing machine that adds one ----------
export function turingTape(el) {
  const N = 14; let tape, head, state, steps, halted, timer = 0, running = false, R = [];
  const reset = () => { tape = new Array(N).fill(null); [1, 0, 1, 1].forEach((v, i) => tape[3 + i] = v); head = 3; state = 'right'; steps = 0; halted = false; running = false; };
  reset();
  const RULES = [
    ['right', '0 or 1', 'leave it, move right', 'right'],
    ['right', 'blank', 'move left', 'add 1'],
    ['add 1', '1', 'write 0, move left', 'add 1'],
    ['add 1', '0 or blank', 'write 1', 'stop'],
  ];
  const ruleFor = () => { const v = tape[head]; if (state === 'right') return v === null ? 1 : 0; if (state === 'add 1') return v === 1 ? 2 : 3; return -1; };
  const step = () => {
    if (halted) return; const r = ruleFor();
    if (r === 0) head++; else if (r === 1) { head--; state = 'add 1'; } else if (r === 2) { tape[head] = 0; head--; } else if (r === 3) { tape[head] = 1; state = 'stop'; halted = true; running = false; }
    head = clamp(head, 0, N - 1); steps++;
  };
  // read from the first to the last written cell; a blank inside (1 _ 1) is shown, not silently closed up
  const num = () => {
    const i0 = tape.findIndex(v => v !== null), i1 = tape.length - 1 - [...tape].reverse().findIndex(v => v !== null);
    if (i0 < 0) return ['', 0];
    const s = tape.slice(i0, i1 + 1).map(v => v === null ? '_' : v).join('');
    return s.includes('_') ? [s, 'not a number (gap)'] : [s, parseInt(s, 2)];
  };
  const fig = new Fig(el, {
    height: w => narrow(w) ? 330 : 300, animated: true, label: 'A Turing machine: a head that reads and writes a tape by following four rules',
    step(dt) { if (!running) return; timer += dt; if (timer > 0.45) { timer = 0; step(); paint(); } },
    draw(ctx, w, h) {
      const n = narrow(w), cw = Math.min(42, (w - 16) / N), x0 = (w - cw * N) / 2, ty = 58;
      R = [];
      for (let i = 0; i < N; i++) {
        const x = x0 + i * cw; rrect(ctx, x + 1, ty, cw - 2, cw, 5); ctx.fillStyle = i === head ? '#fff8e4' : '#fff'; ctx.fill(); ctx.strokeStyle = i === head ? '#d9a521' : C.grid2; ctx.lineWidth = 1.2; ctx.stroke();
        if (tape[i] !== null) text(ctx, String(tape[i]), x + cw / 2, ty + cw * 0.68, { size: cw > 30 ? 18 : 15, align: 'center', weight: 650, color: C.ink });
        R.push([i, x, ty, cw]);
      }
      const hx = x0 + head * cw + cw / 2;
      ctx.beginPath(); ctx.moveTo(hx, ty - 4); ctx.lineTo(hx - 9, ty - 18); ctx.lineTo(hx + 9, ty - 18); ctx.closePath(); ctx.fillStyle = C.compute; ctx.fill();
      text(ctx, state === 'stop' ? 'stopped' : `state: ${state}`, hx, ty - 24, { size: 12.5, align: 'center', weight: 650, color: C.compute });
      // rule table
      const active = halted ? -1 : ruleFor(), y0 = ty + cw + 30, rh = n ? 44 : 30;
      text(ctx, 'The whole program', 12, y0 - 8, { size: 12, weight: 650, color: C.ink3 });
      RULES.forEach((r, k) => {
        const y = y0 + k * rh; rrect(ctx, 8, y, w - 16, rh - 4, 6); ctx.fillStyle = k === active ? alpha(C.compute, 0.1) : 'transparent'; ctx.fill();
        const col = k === active ? C.ink : C.ink2;
        if (n) { text(ctx, `In “${r[0]}”, reading ${r[1]}:`, 16, y + 16, { size: 12, color: col, weight: k === active ? 650 : 450 }); text(ctx, `${r[2]} → “${r[3]}”`, 16, y + 33, { size: 12, color: col }); }
        else text(ctx, `In state “${r[0]}”, reading ${r[1]}:  ${r[2]}, then state “${r[3]}”`, 18, y + 18, { size: 13, color: col, weight: k === active ? 650 : 450 });
      });
    },
  });
  fig.interact({ cursor: 'pointer', hit: (x, y) => R.find(([, cx, cy, cw]) => x > cx && x < cx + cw && y > cy && y < cy + cw) || null,
    down(r) { const i = r[0]; tape[i] = tape[i] === null ? 1 : tape[i] === 1 ? 0 : null; if (tape.every(v => v === null)) tape[i] = 0; const first = tape.findIndex(v => v !== null); head = first; state = 'right'; halted = false; steps = 0; running = false; paint(); } });
  const ctl = controls(el);
  button(ctl, 'Step', () => { running = false; step(); paint(); }, { name: 'tt-step' });
  button(ctl, 'Run', () => { if (halted) return; if (isPlaying()) running = true; else { while (!halted && steps < 200) step(); } paint(); }, { name: 'tt-run', kind: 'primary' });
  button(ctl, 'Reset', () => { reset(); paint(); }, { name: 'tt-reset' });
  const ro = readout(el);
  const paint = () => { const [s, v] = num(); ro.innerHTML = halted ? `The machine stopped after <b>${steps}</b> steps. The tape now reads <b>${s}</b>, which is <b>${v}</b>: it added one.` : `The tape reads <b>${s || '(blank)'}</b> = <b>${v}</b> in binary. Steps so far: <b>${steps}</b>.`; fig.invalidate(); };
  hint(el, 'press Run, or Step through it. Tap a square to write your own number (it cycles 1 → 0 → blank).');
  paint();
}

// ---------- 4. The energy of one flip: a bucket filled from a tank ----------
export function flipEnergy(el) {
  const st = { V: 5, Cf: 10, phase: 0, fill: 0, heat: [] };
  let R = {};
  const fig = new Fig(el, {
    height: w => narrow(w) ? 360 : Math.round(Math.min(380, w * 0.42)), animated: true, label: 'Water analogy: each switch flip fills a small bucket from a tank and empties it to the drain',
    step(dt) {
      st.phase += dt * 0.55; const ph = st.phase % 1, target = ph < 0.5 ? 1 : 0;
      st.fill += (target - st.fill) * Math.min(1, dt * 7);
      if (Math.random() < dt * 22 * Math.abs(target - st.fill)) st.heat.push({ x: 0, y: 0, vx: (Math.random() - 0.5) * 30, vy: -20 - Math.random() * 30, life: 1, which: target });
      st.heat.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt * 1.1; }); st.heat = st.heat.filter(p => p.life > 0);
    },
    draw(ctx, w, h) {
      const n = narrow(w), base = h - 46, top = 40, Hmax = base - top - 20; // V=5 -> full height
      const tx = n ? 14 : w * 0.06, tw = n ? 70 : w * 0.16, lvl = base - Hmax * st.V / 5.5;
      // tank
      ctx.fillStyle = lighten(C.compute, 0.82); ctx.fillRect(tx, lvl, tw, base - lvl); ctx.strokeStyle = C.ink3; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx, top); ctx.lineTo(tx, base); ctx.lineTo(tx + tw, base); ctx.lineTo(tx + tw, top); ctx.stroke();
      line(ctx, tx - 4, lvl, tx + tw + 4, lvl, C.compute, 3);
      circle(ctx, tx + tw / 2, lvl, 9, '#fff', C.compute, 2.5);
      text(ctx, `${st.V.toFixed(1)} V`, tx + tw / 2, lvl - 15, { size: 13, align: 'center', weight: 700, color: C.compute });
      text(ctx, 'supply', tx + tw / 2, base + 18, { size: 12, align: 'center', color: C.ink3 });
      R.tank = [tx + tw / 2, lvl, tw, base, Hmax];
      // pipe + valve 1 (charging)
      const bx = n ? w * 0.47 : w * 0.45, bwMax = n ? w * 0.36 : w * 0.3, bw = 24 + (bwMax - 24) * Math.sqrt(st.Cf / 20), bh = Math.min(Hmax * 0.95, 150);
      const bBase = base, py = base - 10;
      const ph = st.phase % 1, charging = ph < 0.5;
      ctx.strokeStyle = C.ink3; ctx.lineWidth = 2;
      ctx.fillStyle = lighten(C.compute, 0.82); ctx.fillRect(tx + tw, py - 6, bx - bw / 2 - tx - tw, 12);
      ctx.strokeRect(tx + tw, py - 6, bx - bw / 2 - tx - tw, 12);
      const vx1 = (tx + tw + bx - bw / 2) / 2;
      rrect(ctx, vx1 - 13, py - 15, 26, 30, 5); ctx.fillStyle = charging ? C.on : '#e6e6e3'; ctx.fill(); ctx.stroke();
      text(ctx, charging ? 'on' : 'off', vx1, py - 21, { size: 11, align: 'center', color: charging ? '#a77908' : C.ink3, weight: 600 });
      // bucket: fills to the tank's level (same height = same voltage)
      const wl = bBase - Math.min(bh, (bBase - lvl)) * st.fill;
      ctx.fillStyle = lighten(C.compute, 0.7); ctx.fillRect(bx - bw / 2, wl, bw, bBase - wl);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - bw / 2, bBase - bh); ctx.lineTo(bx - bw / 2, bBase); ctx.lineTo(bx + bw / 2, bBase); ctx.lineTo(bx + bw / 2, bBase - bh); ctx.stroke();
      circle(ctx, bx + bw / 2, bBase - bh * 0.5, 9, '#fff', C.ink, 2.5);
      text(ctx, n ? 'wire + gate' : 'the wire and the next gate', bx, bBase - bh - 10, { size: 12, align: 'center', color: C.ink2 });
      text(ctx, `${st.Cf.toFixed(1)} fF`, bx, bBase + 18, { size: 12, align: 'center', weight: 650, color: C.ink });
      R.bucket = [bx + bw / 2, bBase - bh * 0.5, bx, bwMax];
      // drain valve 2
      const dx = bx + bw / 2, dEnd = w - 12, dvx = (dx + dEnd) / 2 + 6;
      ctx.strokeStyle = C.ink3; ctx.lineWidth = 2; ctx.strokeRect(dx, py - 6, dEnd - dx, 12);
      if (!charging && st.fill > 0.03) { ctx.fillStyle = lighten(C.compute, 0.7); ctx.fillRect(dx, py - 6, dEnd - dx, 12); }
      rrect(ctx, dvx - 13, py - 15, 26, 30, 5); ctx.fillStyle = !charging ? C.on : '#e6e6e3'; ctx.fill(); ctx.stroke();
      text(ctx, 'to ground', dEnd, py + 26, { size: 11, align: 'right', color: C.ink3 });
      // heat sparks at whichever valve is working
      st.heat.forEach(p => { const ox = p.which ? vx1 : dvx; circle(ctx, ox + p.x, py - 18 + p.y, 2.6, alpha(C.heat, p.life)); });
      text(ctx, 'heat', charging ? vx1 : dvx, top + 6, { size: 12, align: 'center', weight: 650, color: C.heat });
    },
  });
  fig.interact({
    hit(x, y) { const [tx, ty] = R.tank, [bx, by] = R.bucket; if (Math.hypot(x - tx, y - ty) < 26) return 'V'; if (Math.hypot(x - bx, y - by) < 26) return 'C'; return null; },
    move(k, x, y) { if (k === 'V') { const [, , , base, H] = R.tank; st.V = clamp((base - y) / H * 5.5, 0.5, 5); } else { const [, , cx, bwMax] = R.bucket; const bw = clamp((x - cx) * 2, 24, bwMax); st.Cf = clamp(20 * ((bw - 24) / (bwMax - 24)) ** 2, 0.2, 20); } paint(); },
  });
  const ro = readout(el);
  const paint = () => { const E = 0.5 * st.Cf * 1e-15 * st.V * st.V; ro.innerHTML = `Each flip moves <b>${(st.Cf * st.V).toFixed(1)} femtocoulombs</b> (C×V) and turns <b>${Number((E * 1e15).toPrecision(3)).toLocaleString('en-GB')} femtojoules</b> into heat (½CV²).`; fig.invalidate(); };
  hint(el, 'drag the round handle on the tank’s water line (the supply voltage) and the one on the bucket’s side (how much the wire holds).');
  paint();
}
