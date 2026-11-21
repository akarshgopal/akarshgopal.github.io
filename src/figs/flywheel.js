// Scaling §6, the data flywheel: (1) a wheel you spin, showing where each kind of data enters; (2) the human-data
// industry's reported revenue and valuations, 2019–2026, scrubbed by date. Every number in (2) is cited in scaling.html.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, line, circle, clamp, axes, arrow, approach } from '../lib/draw.js';
import { controls, segmented, readout, hint } from '../lib/ui.js';

const narrow = w => w < 560;
const L10 = Math.log10;
const RAD = Math.PI / 180;
const usd = v => (v >= 1e9 ? `$${+(v / 1e9).toPrecision(v >= 1e10 ? 3 : 2)} billion` : `$${Math.round(v / 1e6)} million`);

// ---------- 1. The flywheel ----------
// Angles in degrees, canvas convention (0 = right, increasing clockwise). Stations: model at 270 (top), users at 0,
// people at 90, training on the way back up at 180. Data rides the wheel clockwise and is absorbed at the model.
const INLETS = {
  usage: { a: 30, nm: 'prompts & ratings', sh: 'usage', col: C.compute, txt: '<b>Prompts and ratings.</b> What people type, and the thumbs up or down they give. OpenAI can train on chats in its consumer apps unless the user opts out; in 2025 Anthropic asked its consumer users to choose.' },
  sft: { a: 72, nm: 'written answers (SFT)', sh: 'answers', col: C.learn, txt: '<b>Written answers (supervised fine-tuning).</b> A person writes the reply the model should have given. Meta’s Llama 2 was tuned on 27,540 of them.' },
  rank: { a: 108, nm: 'rankings (RLHF)', sh: 'rankings', col: C.red, txt: '<b>Rankings (reinforcement learning from human feedback).</b> A person reads two replies and picks the better one. A second model learns their judgement and scores the first model’s practice answers. Llama 2 used over 1.4 million such comparisons.' },
  rl: { a: 150, nm: 'RL tasks & graders', sh: 'graders', col: C.heat, txt: '<b>Practice tasks with graders, for agents.</b> Experts build environments, such as a codebase with a bug and tests that check the fix, so an agent can try thousands of times and be scored without a person watching each attempt.' },
  robot: { a: 205, nm: 'robot & first-person video', sh: 'robots', col: C.memory, txt: '<b>Robot and first-person recordings.</b> People steer robots by remote control, or film their own hands while they cook and clean. Text cannot show a robot how to fold a towel.' },
  synth: { a: 238, nm: 'synthetic', sh: 'synthetic', col: C.ink3, inner: true, txt: '<b>Synthetic data.</b> Models write training material for models, filtered by people or programs. It is cheap, but a model trained over and over on its own output loses the rarer things it knew, so it does not replace the people.' },
  crowd: { a: 95, nm: 'crowd labels', sh: 'crowd labels', col: C.time, txt: '<b>Crowd labels.</b> Is there a dog in this photo, yes or no? Anyone online could answer, for cents a task.' },
};
const ERAS = {
  crowd: { inlets: ['crowd'], loop: false, people: 'crowd', txt: '<b>2009, ImageNet.</b> About 49,000 crowd workers in 167 countries sorted photos through Amazon Mechanical Turk. Data went one way: nobody was using the model, so nothing came back round.' },
  rlhf: { inlets: ['usage', 'sft', 'rank'], loop: true, people: 'contractors', txt: '<b>2022, the first chat models.</b> InstructGPT was tuned with about 40 contractors writing answers and ranking replies. Once a model is released, its users’ prompts and ratings come back round, and the loop closes: a year after launch ChatGPT had 100 million weekly users.' },
  agents: { inlets: ['usage', 'sft', 'rank', 'rl', 'robot', 'synth'], loop: true, people: 'experts', txt: '<b>2026, agents.</b> Paid experts write, rank and build graded practice tasks; others record robots and their own hands at work; models make synthetic data too. Each turn is a new model, and a better model draws more users: more than 1.2 billion a week for ChatGPT by October 2026.' },
};

export function flywheel(el) {
  let era = 'agents', sel = null, th = 0, om = 30, rot = 0, absorbed = 0, pulse = 0, acc = {}, parts = [], R = {}, drag = null;
  const BASE = 30; // degrees per second when nobody is touching it
  const reset = () => { parts = []; acc = {}; rot = 0; for (let i = 0; i < 60; i++) advance(5); rot = 0; th = 0; absorbed = 0; }; // pre-run so the wheel is never empty
  // Everything moves with the wheel: an inlet's dots creep in, and dots on the rim ride round, only when it turns.
  const advance = dA => {
    if (!dA) return;
    th += dA; rot += dA;
    const E = ERAS[era], gen = Math.floor(Math.max(0, rot) / 360);
    if (dA > 0) E.inlets.forEach(k => { const rate = k === 'usage' ? 0.03 * (1 + 0.25 * Math.min(gen, 8)) : 0.026; acc[k] = (acc[k] || 0) + dA * rate; while (acc[k] >= 1 && parts.length < 220) { acc[k] -= 1; parts.push({ k, ph: 'in', d: 0, a: INLETS[k].a + (Math.random() - 0.5) * 6 }); } });
    for (const p of parts) {
      if (p.ph === 'in') { p.d += Math.abs(dA) * 0.018; if (p.d >= 1) { p.ph = 'ring'; p.d = 1; } }
      else p.a += dA;
    }
    const keep = [];
    for (const p of parts) { if (p.ph === 'ring' && p.a >= 270) { absorbed++; pulse = 1; } else if (!(p.ph === 'ring' && p.a < (ERAS[era].loop ? -90 : 0))) keep.push(p); }
    parts = keep;
  };
  const fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round(w * 0.5 + 150) : 440), animated: true,
    label: 'The data flywheel: a deployed model brings users, their usage and paid experts produce training data, and that trains a better model. Drag to spin it.',
    step(dt) { if (!drag) { om = approach(om, BASE, 0.7, dt); advance(om * dt); } pulse = Math.max(0, pulse - dt * 2.5); },
    draw(ctx, w, h) {
      const n = narrow(w), E = ERAS[era], cx = w / 2, cy = n ? h / 2 + 2 : h / 2 + 4, Rr = n ? Math.round(w * 0.25) : 140, L = n ? 30 : 40;
      const P = (a, r) => [cx + r * Math.cos(a * RAD), cy + r * Math.sin(a * RAD)];
      // rim: the arc users → people → model is faded before there was a loop
      ctx.save(); ctx.lineCap = 'round';
      ctx.strokeStyle = alpha(C.ink3, 0.35); ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(cx, cy, Rr, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = C.grid; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(cx, cy, Rr, 0, Math.PI * 2); ctx.stroke();
      if (!E.loop) { ctx.setLineDash([4, 6]); ctx.strokeStyle = alpha(C.ink3, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, Rr, -90 * RAD, 90 * RAD); ctx.stroke(); }
      ctx.restore();
      // spokes turn with the wheel so the reader can see how fast it goes
      for (let i = 0; i < 6; i++) { const a = th + i * 60; const [x0, y0] = P(a, Rr * 0.3), [x1, y1] = P(a, Rr - 9); line(ctx, x0, y0, x1, y1, alpha(C.ink3, 0.28), 2); }
      for (let i = 0; i < 24; i++) { const a = th + i * 15, [x, y] = P(a, Rr); circle(ctx, x, y, 1.6, alpha(C.ink3, 0.5)); }
      // direction chevrons on the rim
      [315, 45, 135, 225].forEach(a => { if (!E.loop && (a === 315 || a === 45)) return; const [x0, y0] = P(a - 4, Rr), [x1, y1] = P(a + 4, Rr); arrow(ctx, x0, y0, x1, y1, C.ink3, 1.5, 6); });
      // hub: which model generation we are on
      const gen = Math.floor(Math.max(0, rot) / 360) + 1;
      circle(ctx, cx, cy, Rr * 0.3, C.paper, alpha(C.ink3, 0.4), 1.5);
      text(ctx, 'model', cx, cy - (n ? 4 : 6), { size: n ? 11 : 12, align: 'center', color: C.ink3 });
      text(ctx, `v${gen}`, cx, cy + (n ? 13 : 16), { size: n ? 17 : 21, align: 'center', weight: 700, color: C.learn });
      // stations
      const ST = [[270, E.loop ? 'deployed model' : 'model'], [0, 'users'], [90, E.people], [180, 'training']];
      ST.forEach(([a, nm]) => {
        const faded = !E.loop && a === 0, [x, y] = P(a, Rr), top = a === 270;
        circle(ctx, x, y, top ? 9 + pulse * 5 : 6, faded ? C.paper : top ? C.learn : C.ink2, faded ? alpha(C.ink3, 0.6) : '#fff', 2);
        const [lx, ly] = top ? [x, y - 18] : P(a, Rr - (a === 0 || a === 180 ? (n ? 16 : 18) : (n ? 20 : 22)));
        text(ctx, nm, lx, ly + 4, { size: n ? 11 : 12, align: a === 0 ? 'right' : a === 180 ? 'left' : 'center', weight: 650, color: faded ? C.ink3 : top ? C.learn : C.ink, halo: 3 });
      });
      // inlets
      R.inl = [];
      E.inlets.forEach(k => {
        const I = INLETS[k], on = sel === k, c = Math.cos(I.a * RAD);
        if (I.inner) {
          const [x0, y0] = P(I.a, Rr * 0.34), [x1, y1] = P(I.a, Rr - 11);
          line(ctx, x0, y0, x1, y1, alpha(I.col, on ? 1 : 0.6), on ? 2.5 : 1.5, [3, 3]);
          const [lx, ly] = P(I.a + (n ? 8 : 6), Rr * 0.62);
          text(ctx, n ? I.sh : I.nm, lx + 2, ly, { size: n ? 11 : 12, align: 'left', weight: on ? 700 : 600, color: on ? C.ink : C.ink2, halo: 3 });
          R.inl.push([k, lx + 20, ly - 4]);
          return;
        }
        const [x0, y0] = P(I.a, Rr + L - 4), [x1, y1] = P(I.a, Rr + 12);
        arrow(ctx, x0, y0, x1, y1, alpha(I.col, on ? 1 : 0.75), on ? 2.5 : 1.8, 7);
        const [lx, ly] = P(I.a, Rr + L + 4), al = c > 0.12 ? 'left' : c < -0.12 ? 'right' : 'center', s = Math.sin(I.a * RAD);
        const ty = ly + (s > 0.5 ? 10 : s < -0.5 ? -2 : 4);
        text(ctx, n ? I.sh : I.nm, lx, ty, { size: n ? 11.5 : 12.5, align: al, weight: on ? 750 : 600, color: on ? I.col : C.ink2, halo: 3 });
        if (on) line(ctx, al === 'right' ? lx - (n ? 50 : 110) : al === 'center' ? lx - 30 : lx, ty + 4, al === 'right' ? lx : al === 'center' ? lx + 30 : lx + (n ? 50 : 110), ty + 4, I.col, 2);
        R.inl.push([k, lx + (al === 'left' ? 34 : al === 'right' ? -34 : 0), ty - 4]);
      });
      // dots: creeping in from outside (or from the hub, for synthetic), then riding the rim
      for (const p of parts) {
        const I = INLETS[p.k];
        let x, y;
        if (p.ph === 'in') { const r = I.inner ? Rr * 0.34 + p.d * (Rr * 0.66) : Rr + L - 4 - p.d * (L - 4); [x, y] = P(I.a, r); }
        else [x, y] = P(p.a, Rr);
        circle(ctx, x, y, sel === p.k ? 4.2 : 3.2, I.col);
      }
      R.cx = cx; R.cy = cy; R.r = Rr;
    },
  });
  const ang = (x, y) => Math.atan2(y - R.cy, x - R.cx) / RAD;
  const hitF = (x, y) => {
    if (R.inl) for (const [k, ix, iy] of R.inl) if ((ix - x) ** 2 + (iy - y) ** 2 < 32 * 32) return 'i:' + k;
    const d = Math.hypot(x - R.cx, y - R.cy);
    return d > R.r * 0.3 && d < R.r + 26 ? 'w' : null;
  };
  fig.interact({
    hit: hitF, cursor: 'grab',
    down(q, x, y) { if (q.startsWith('i:')) { const k = q.slice(2); sel = sel === k ? null : k; paint(); return; } drag = { a: ang(x, y), t: performance.now(), v: 0 }; },
    move(q, x, y) {
      if (!drag) return;
      const a = ang(x, y), now = performance.now(); let d = a - drag.a; if (d > 180) d -= 360; if (d < -180) d += 360;
      const dt = Math.max(1, now - drag.t) / 1000; drag.v = 0.6 * drag.v + 0.4 * clamp(d / dt, -900, 1500);
      drag.a = a; drag.t = now; advance(d); om = drag.v; fig.invalidate();
    },
    up() { if (drag) { om = clamp(drag.v, -300, 1200); drag = null; } },
  });
  const ctl = controls(el);
  segmented(ctl, { label: 'When', value: era, options: [{ label: '2009', value: 'crowd', name: 'fw-2009' }, { label: '2022', value: 'rlhf', name: 'fw-2022' }, { label: '2026', value: 'agents', name: 'fw-2026' }], onchange: v => { era = v; if (sel && !ERAS[era].inlets.includes(sel)) sel = null; reset(); paint(); } });
  const ro = readout(el);
  const paint = () => { ro.innerHTML = `${ERAS[era].txt}${sel ? `<br>${INLETS[sel].txt}` : ''}`; fig.invalidate(); };
  hint(el, 'spin the wheel with your finger or mouse, tap the labels, then go back to 2009.');
  reset(); paint();
}

// ---------- 2. The human-data industry, 2019–2026 ----------
// [company, date (decimal year), US$, what it is, who reported it]. Only reported or company-stated figures; see notes.
const CO = { Scale: C.compute, Surge: C.heat, Mercor: C.learn, micro1: C.memory, Turing: C.cyan, Invisible: C.ink3, Handshake: C.red };
const REV = [
  ['Scale', 2024.99, 870e6, 'revenue in 2024', 'Bloomberg, April 2025'],
  ['Scale', 2025.99, 0.98e9, 'revenue in 2025, “just shy of $1 billion”', 'Forbes, May 2026'],
  ['Surge', 2024.99, 1.2e9, 'revenue in 2024 (bootstrapped, no outside funding)', 'Forbes, September 2025'],
  ['Invisible', 2024.99, 134e6, 'revenue in 2024', 'company, September 2025'],
  ['Turing', 2025.07, 300e6, 'annualised revenue run-rate', 'company, January 2025'],
  ['micro1', 2025.0, 7e6, 'annualised run-rate at the start of 2025', 'TechCrunch, September 2025'],
  ['micro1', 2025.69, 50e6, 'annualised run-rate', 'TechCrunch, September 2025'],
  ['micro1', 2025.92, 100e6, 'annualised run-rate, “over $100 million”', 'TechCrunch, December 2025'],
  ['micro1', 2026.55, 500e6, 'run-rate passed “this summer”, company’s claim', 'company, October 2026'],
  ['micro1', 2026.78, 1e9, 'run-rate passed, company’s claim', 'company, October 2026'],
  ['Mercor', 2025.82, 500e6, 'annualised revenue, about', 'TechCrunch, October 2025'],
  ['Mercor', 2026.2, 1e9, 'gross run-rate, as stated by its CEO', 'Bloomberg, July 2026'],
  ['Mercor', 2026.52, 2e9, 'gross run-rate, as stated by its CEO; contractors get 60–70% of it', 'Bloomberg, July 2026'],
  ['Handshake', 2025.78, 100e6, 'run-rate of its AI-training business', 'Upstarts Media, October 2025'],
  ['Handshake', 2026.04, 550e6, 'gross run-rate of AI training, as reported', 'Dealroom, April 2026'],
  ['Handshake', 2026.29, 1e9, 'gross run-rate of AI training, “nearly”, as reported', 'Dealroom, April 2026'],
];
const VAL = [
  ['Scale', 2019.59, 1e9, 'valuation, Series C (“over $1 billion”)', 'TechCrunch, August 2019'],
  ['Scale', 2021.28, 7.3e9, 'valuation, Series E', 'Scale AI, April 2021'],
  ['Scale', 2024.39, 13.8e9, 'valuation, Series F', 'TechCrunch, May 2024'],
  ['Scale', 2025.45, 29e9, 'valuation when Meta paid $14.3 billion for 49%', 'Reuters, June 2025'],
  ['Turing', 2021.97, 1.1e9, 'valuation, Series D', 'TechCrunch, December 2021'],
  ['Turing', 2025.18, 2.2e9, 'valuation, Series E', 'TechCrunch, March 2025'],
  ['Mercor', 2024.72, 250e6, 'valuation, Series A', 'Reuters, September 2024'],
  ['Mercor', 2025.14, 2e9, 'valuation, Series B', 'TechCrunch, February 2025'],
  ['Mercor', 2025.82, 10e9, 'valuation, Series C', 'TechCrunch, October 2025'],
  ['micro1', 2025.70, 500e6, 'valuation, Series A', 'TechCrunch, September 2025'],
  ['micro1', 2026.72, 4e9, 'valuation, Series B', 'Forbes, September 2026'],
  ['Invisible', 2025.71, 2e9, 'valuation, “more than $2 billion”', 'Bloomberg, September 2025'],
];
export const MANHATTAN_2025 = 1.8896e9 * 321.943 / 18.0; // Hewlett & Anderson total through 1945 × CPI-U 2025 / 1945
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const when = t => `${MONTHS[clamp(Math.floor((t % 1) * 12 + 1e-6), 0, 11)]} ${Math.floor(t)}`;

export function dataIndustry(el) {
  let mode = 'rev', cur = 2026.8, R = {};
  const D = () => (mode === 'rev' ? REV : VAL);
  const first = () => Math.min(...D().map(p => p[1]));
  const latest = t => { const m = {}; D().forEach(p => { if (p[1] <= t + 1e-6 && (!m[p[0]] || p[1] >= m[p[0]][1])) m[p[0]] = p; }); return m; };
  const nearest = () => { let b = null; D().forEach(p => { if (p[1] <= cur + 1e-6 && (!b || p[1] >= b[1])) b = p; }); return b; }; // the most recent report at the cursor
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 370 : 340), label: 'Reported revenue and valuations of human-data companies, 2019 to 2026, on a logarithmic scale, against the Manhattan Project’s cost in 2025 dollars',
    draw(ctx, w, h) {
      const n = narrow(w), box = { l: n ? 46 : 54, r: w - (n ? 78 : 96), t: 30, b: h - 40 }, y0 = mode === 'rev' ? 6 : 8, y1 = 11;
      const yt = []; for (let v = y0; v <= y1; v++) yt.push(v);
      const rv = mode === 'rev', { sx, sy } = axes(ctx, { box, x0: rv ? 2024.75 : 2019.3, x1: rv ? 2026.95 : 2027, y0, y1, xticks: rv ? [2025, 2025.5, 2026, 2026.5] : [2020, 2022, 2024, 2026], yticks: yt, xfmt: v => (v % 1 ? `mid-${Math.floor(v)}` : `${v}`), xgrid: rv, yfmt: v => (v >= 9 ? `$${10 ** (v - 9)}B` : `$${10 ** (v - 6)}M`), ylabel: mode === 'rev' ? 'revenue a year, or annualised run-rate (log)' : 'valuation (log)' });
      // the Manhattan Project, whole cost, in 2025 dollars
      const ym = sy(L10(MANHATTAN_2025));
      line(ctx, box.l, ym, box.r, ym, C.ink, 1.5, [6, 4]);
      text(ctx, n ? 'Manhattan Project, all of it, 2025 $' : 'the whole Manhattan Project, in 2025 dollars: about $34 billion', box.l + 6, ym - 6, { size: 11, color: C.ink, weight: 600, halo: 3 });
      // future reports faint, past ones joined
      const byCo = {}; D().forEach(p => (byCo[p[0]] = byCo[p[0]] || []).push(p));
      Object.entries(byCo).forEach(([co, ps]) => {
        ps.sort((a, b) => a[1] - b[1]);
        const past = ps.filter(p => p[1] <= cur + 1e-6);
        ctx.save(); ctx.strokeStyle = CO[co]; ctx.lineWidth = 2; ctx.beginPath(); past.forEach((p, i) => (i ? ctx.lineTo(sx(p[1]), sy(L10(p[2]))) : ctx.moveTo(sx(p[1]), sy(L10(p[2]))))); ctx.stroke(); ctx.restore();
        ps.forEach(p => { const f = p[1] > cur + 1e-6; circle(ctx, sx(p[1]), sy(L10(p[2])), f ? 3 : 4.5, f ? alpha(CO[co], 0.22) : CO[co], f ? null : '#fff', 1.5); });
      });
      // names beside each company's latest report so far, pushed apart so they do not overlap
      const lab = Object.values(latest(cur)).map(p => ({ co: p[0], x: sx(p[1]), y0: sy(L10(p[2])), y: sy(L10(p[2])) })).sort((a, b) => a.y - b.y);
      for (let i = 1; i < lab.length; i++) if (lab[i].y - lab[i - 1].y < 16) lab[i].y = lab[i - 1].y + 16;
      for (let i = lab.length - 2; i >= 0; i--) if (lab[i].y > lab[i + 1].y - 16) lab[i].y = lab[i + 1].y - 16;
      const lx = box.r + 8;
      lab.forEach(l => { line(ctx, l.x + 5, l.y0, lx - 3, l.y, alpha(CO[l.co], 0.25), 1); text(ctx, l.co, lx, l.y + 4, { size: n ? 11 : 11.5, weight: 650, color: CO[l.co], halo: 3 }); });
      // the date cursor and the report nearest it
      const xc = sx(cur);
      line(ctx, xc, box.t, xc, box.b, alpha(C.ink, 0.6), 1.5);
      circle(ctx, xc, box.b, 8, '#fff', C.ink, 2.5);
      const p = nearest(); if (p) circle(ctx, sx(p[1]), sy(L10(p[2])), 9, null, C.ink, 2);
      R = { sx, box };
    },
  });
  fig.interact({ panY: true, hit: (x, y) => (x > R.box.l - 12 && x < R.box.r + 12 && y > R.box.t - 10 && y < R.box.b + 24 ? 'c' : null), cursor: 'ew-resize', down(q, x) { this.move(q, x); }, move(q, x) { cur = clamp(R.sx.inv(x), first(), 2026.85); paint(); } });
  const ctl = controls(el);
  segmented(ctl, { label: 'Show', value: mode, options: [{ label: 'revenue', value: 'rev', name: 'di-rev' }, { label: 'valuation', value: 'val', name: 'di-val' }], onchange: v => { mode = v; cur = Math.max(cur, first()); paint(); } });
  const ro = readout(el);
  const paint = () => {
    const p = nearest(), m = latest(cur);
    let s = p ? `<b>${p[0]}</b>, ${when(p[1])}: <b>${usd(p[2])}</b>, ${p[3]} (${p[4]}).` : '';
    if (mode === 'rev') {
      const tot = Object.values(m).reduce((a, q) => a + q[2], 0);
      s += tot > 0 ? ` All latest figures: about <b>${usd(tot)} a year</b>, ${tot >= 1e9 ? `in today’s money <b>${Math.round(tot / MANHATTAN_2025 * 100)}%</b> of the Manhattan Project’s whole cost, or <b>${Math.round(tot / (MANHATTAN_2025 / 4) * 100)}%</b> of its average year (1942–45)` : 'a rounding error next to the Manhattan Project'}.` : '';
    } else s += ' (What investors paid for a share, not money spent on data.)';
    ro.innerHTML = s; fig.invalidate();
  };
  hint(el, 'drag through time to step through the reports, then switch to valuations.');
  paint();
}

// ---------- 3. How big the human part is: Llama 2's data, drawn to scale by tokens ----------
// Touvron et al. 2023: pretraining 2.0 trillion tokens (table 1); Meta's own preference data 1,418,091 comparisons at
// 798.5 tokens per example on average (table 6), i.e. about 1.13 billion tokens counting one response per comparison.
const PRE = 2.0e12, CMP = 1418091, TPE = 798.5, HUM = CMP * TPE, SIDE = Math.sqrt(PRE / HUM); // ≈ 42
export function humanShare(el) {
  let z = 1, R = {};
  const ZMAX = SIDE;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? Math.round(w - 32 + 120) : 430),
    label: 'Llama 2’s training data drawn to scale by tokens: two trillion tokens of public web text against about 1.1 billion tokens of human preference comparisons. Drag sideways to zoom in on the human part.',
    draw(ctx, w, h) {
      const n = narrow(w), S = n ? w - 32 : Math.min(330, h - 100), x0 = n ? 16 : Math.round(w / 2 - S / 2 - 120), y0 = 14, yb = y0 + S;
      // viewport: the bottom-left corner of the big square stays put; the square grows by z
      ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, S, S); ctx.clip();
      const B = S * z, hs = B / SIDE; // big side, human side, in px
      ctx.fillStyle = alpha(C.compute, 0.16); ctx.fillRect(x0, yb - B, B, B);
      // grid: each cell is 1% of the pretraining text; finer 0.01% cells appear once they are big enough
      const cell = B / 10, fine = B / 100;
      if (fine > 6) for (let i = 1; i < 100; i++) { const a = alpha(C.compute, 0.18); if (x0 + i * fine < x0 + S) line(ctx, x0 + i * fine, yb, x0 + i * fine, yb - Math.min(B, S + 2), a, 0.6); if (yb - i * fine > y0) line(ctx, x0, yb - i * fine, x0 + Math.min(B, S), yb - i * fine, a, 0.6); }
      for (let i = 1; i < 10; i++) { const a = alpha(C.compute, 0.5); line(ctx, x0 + i * cell, yb, x0 + i * cell, yb - B, a, 1); line(ctx, x0, yb - i * cell, x0 + B, yb - i * cell, a, 1); }
      ctx.strokeStyle = C.compute; ctx.lineWidth = 1.5; ctx.strokeRect(x0 + 0.75, yb - B + 0.75, B - 1.5, B - 1.5);
      // the human square
      ctx.fillStyle = C.red; ctx.fillRect(x0, yb - hs, Math.max(hs, 1.5), Math.max(hs, 1.5));
      ctx.restore();
      ctx.strokeStyle = alpha(C.ink3, 0.6); ctx.lineWidth = 1; ctx.strokeRect(x0 + 0.5, y0 + 0.5, S - 1, S - 1);
      // labels: the pretraining square beside the frame (desktop) or inside it (phone); the human square next to itself
      const lx = n ? x0 + 8 : x0 + S + 18, showBig = cell < S * 0.98, showFine = fine > 6;
      if (n ? hs < S * 0.45 : hs < S * 0.97) {
        const ty = n ? y0 + 20 : y0 + 12;
        const g = showBig && showFine ? 'each big square is 1%, 20 billion tokens; each small one 0.01%' : showBig ? 'each square is 1% of it, 20 billion tokens' : 'each small square is 0.01% of it, 200 million tokens';
        text(ctx, z < 1.05 ? 'pretraining text: 2 trillion tokens' : 'pretraining text (the rest is off the frame)', lx, ty, { size: 12, weight: 700, color: C.compute, halo: n ? 3 : 0 });
        if (n) { const parts = g.split('; '); parts.forEach((t, k) => text(ctx, t, lx, ty + 16 + k * 15, { size: 11, color: C.ink2, halo: 3 })); }
        else text(ctx, g, lx, ty + 16, { size: 11, color: C.ink3 });
      }
      const inside = hs > (n ? 120 : 150);
      // keep human callout clear of the blue grid: prefer right of the red square, else inside with strong halo
      let tx = inside ? x0 + 10 : x0 + Math.max(hs, 2) + 10;
      let tyH = inside ? yb - hs + 22 : Math.min(yb - 8, Math.max(yb - Math.max(hs, 2) - 36, y0 + 72));
      if (!inside && tx + 210 > x0 + S) { tx = x0 + 8; tyH = Math.min(yb - 10, y0 + S - 36); }
      text(ctx, n || inside ? 'human comparisons: 1.1 billion tokens' : 'human preference comparisons: 1.4 million, 1.1 billion tokens', tx, tyH, { size: 12, weight: 700, color: inside ? '#fff' : C.red, halo: 3 });
      text(ctx, '0.057% of the pretraining text', tx, tyH + 15, { size: 11, color: inside ? '#fff' : C.ink2, halo: 3 });
      // zoom rail (log), drawn under the picture — keep end ticks inside the figure card
      const rx0 = n ? x0 + 8 : x0, rx1 = n ? x0 + S - 8 : Math.min(w - 16, x0 + S + 220), ry = yb + 44, zx = v => rx0 + Math.log(v) / Math.log(ZMAX) * (rx1 - rx0);
      line(ctx, rx0, ry, rx1, ry, C.grid, 4); line(ctx, rx0, ry, zx(z), ry, C.red, 4);
      [[1, '×1'], [10, '×10'], [ZMAX, n ? '×42' : '×42 fills frame']].forEach(([v, s], i) => { circle(ctx, zx(v), ry, 3, C.paper, C.ink3, 1.2); text(ctx, s, zx(v), ry + 20, { size: 11, align: i === 2 ? 'right' : i === 0 ? 'left' : 'center', color: C.ink3 }); });
      text(ctx, 'zoom (drag)', rx0 + 16, ry - 14, { size: 11, color: C.ink3 });
      circle(ctx, zx(z), ry, 10, '#fff', C.red, 3);
      R = { rx0, rx1, zx };
    },
  });
  const setX = x => { const t = clamp((x - R.rx0) / (R.rx1 - R.rx0), 0, 1), v = Math.exp(t * Math.log(ZMAX)); if (Math.abs(v - z) > 1e-6) { z = v; paint(); } };
  fig.interact({ panY: true, hit: () => 'z', cursor: 'ew-resize', down(q, x) { setX(x); }, move(q, x) { setX(x); } });
  const ro = readout(el);
  const paint = () => {
    ro.innerHTML = `Zoom <b>×${z < 10 ? z.toFixed(1) : Math.round(z)}</b>: <b>2 trillion</b> public tokens against <b>${CMP.toLocaleString('en-GB')}</b> human comparisons, about <b>${(HUM / 1e9).toFixed(1)} billion tokens</b>, one part in ${(Math.round(PRE / HUM / 100) * 100).toLocaleString('en-GB')}.`;
    fig.invalidate();
  };
  hint(el, 'drag sideways, on the picture or the rail, to zoom in on the human part.');
  paint();
}
