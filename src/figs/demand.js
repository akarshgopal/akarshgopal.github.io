// Demand: tokens-per-task ladder with cited anchors, and U×T levers that persist into the index/verdict meters.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, rrect, line } from '../lib/draw.js';
import { controls, slider, readout, hint, segmented } from '../lib/ui.js';
import { publish } from '../lib/lean.js';
import { saveAct1, loadPrefs, savePrefs } from '../lib/prefs.js';
import * as M from '../lib/model.js';

// Cited / labelled estimates. Chat tokens ≈ median short reply; Wh from Google median Gemini prompt.
// tok: 400 is MY ASSUMPTION (Google published no token count), so 0.24 Wh / 400 ≈ 2.2 J/token is implied, not measured;
// the other rungs' wh are energy multiples of chat (IEA wording), and their tok just repeats that multiple at the same J/token.
// Reasoning/agent/video multipliers follow IEA "hundreds or thousands of times" more energy per task (flagged as order-of-magnitude).
const TASKS = [
  { id: 'chat', name: 'Chat reply', tok: 400, wh: 0.24, note: '≈ Google median Gemini text prompt', tag: 'measured' },
  { id: 'reason', name: 'Reasoning pass', tok: 8000, wh: 24, note: '≈ 100× chat energy (IEA “hundreds”)', tag: 'estimate' },
  { id: 'agent', name: 'Agent episode', tok: 80000, wh: 240, note: '≈ 1,000× chat (IEA “thousands”)', tag: 'estimate' },
  { id: 'video', name: 'Short video clip', tok: 400000, wh: 2400, note: '≈ 10,000× chat · order of magnitude', tag: 'estimate' },
];

export function tokensLadder(el) {
  const prefs = loadPrefs();
  let which = prefs.demandTask || 'reason';
  let U = prefs.act1?.U ?? M.PRESETS.mid.U;
  let Tmult = prefs.act1?.T ?? M.PRESETS.mid.T;
  const ctl = controls(el);
  const rows = []; // hit targets for tap-to-select
  const fig = new Fig(el, {
    height: w => (w < 640 ? 340 : 320),
    label: 'Tokens and energy per task on a log scale, from a median chat reply to a short video, with cited and estimated rungs',
    draw(ctx, w, h) {
      const n = w < 640, l = 14, r = w - 14, top = 44, b = h - 28;
      const xmin = 100, xmax = 1e6;
      const xs = v => l + (Math.log10(Math.max(v, xmin)) - Math.log10(xmin)) / (Math.log10(xmax) - Math.log10(xmin)) * (r - l);
      if (n) {
        text(ctx, 'Tokens/task (log) · Wh*=0.24×tok-mult · dashed=estimate', l, 16, { size: 10, color: C.ink3, weight: 600 });
      } else {
        text(ctx, 'Tokens / task (log)', l, 16, { size: 11.5, color: C.ink3, weight: 600 });
        text(ctx, 'Wh column = 0.24 Wh × same multiple as tokens — measured only on chat; estimates are dashed', l + 130, 16, { size: 11, color: C.ink3 });
      }
      // legend
      if (!n) {
        rrect(ctx, r - 210, 6, 12, 12, 2); ctx.fillStyle = alpha(C.cyan, 0.45); ctx.fill(); ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5; ctx.stroke();
        text(ctx, 'measured', r - 192, 16, { size: 10.5, color: C.ink2 });
        rrect(ctx, r - 120, 6, 12, 12, 2); ctx.fillStyle = alpha(C.orange, 0.25); ctx.fill(); ctx.setLineDash([4, 3]); ctx.strokeStyle = C.orange; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
        text(ctx, 'estimate (Wh≠tok)', r - 102, 16, { size: 10.5, color: C.ink2 });
      }
      [1e3, 1e4, 1e5, 1e6].forEach(v => {
        line(ctx, xs(v), top - 4, xs(v), b, C.grid, 1);
        text(ctx, v >= 1e6 ? '1M' : `${v / 1e3}k`, xs(v), b + 14, { size: 10.5, align: 'center', color: C.ink3 });
      });
      rows.length = 0;
      const rh = (b - top) / TASKS.length;
      TASKS.forEach((tk, i) => {
        const y = top + i * rh + 3, bh = rh - 6, on = tk.id === which;
        const measured = tk.tag === 'measured';
        const col = measured ? C.cyan : C.orange;
        rows.push({ id: tk.id, x0: l, y0: y, x1: r, y1: y + bh });
        rrect(ctx, l, y, Math.max(4, xs(tk.tok) - l), bh, 5);
        ctx.fillStyle = alpha(on ? C.learn : col, on ? 0.35 : (measured ? 0.28 : 0.14)); ctx.fill();
        ctx.strokeStyle = on ? C.learn : col; ctx.lineWidth = on ? 2.5 : 1.5;
        if (!measured) ctx.setLineDash([5, 3]);
        ctx.stroke(); ctx.setLineDash([]);
        text(ctx, tk.name, l + 8, y + (n ? 12 : bh / 2 - 2), { size: n ? 11 : 12, weight: 650, color: C.ink });
        const whLab = measured ? `${tk.wh} Wh` : `~${tk.wh >= 1 ? Math.round(tk.wh) : tk.wh} Wh*`;
        const right = `${tk.tok.toLocaleString('en-GB')} tok · ${whLab} · ${tk.tag}`;
        text(ctx, n ? `${tk.tok >= 1000 ? Math.round(tk.tok / 1000) + 'k' : tk.tok} · ${tk.tag}` : right, n ? l + 8 : xs(tk.tok) + 8, n ? y + bh - 6 : y + bh / 2 + 4, { size: n ? 10 : 11, color: C.ink2 });
      });
    },
  });
  fig.interact({
    panY: true, // vertical swipe scrolls; tap still selects a rung
    hit: (x, y) => rows.find(r => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1) || null,
    down: (obj) => {
      if (!obj || obj.id === which) return;
      which = obj.id;
      const tk = TASKS.find(x => x.id === which);
      const mult = tk.tok / TASKS[0].tok;
      Tmult = Math.min(M.LEVERS.T.max, Math.max(M.LEVERS.T.min, mult));
      if (Ts) Ts.set(Math.log10(Tmult));
      // keep segmented control in sync if present
      if (seg) seg.set(which, false);
      paint();
    },
  });
  let Ts, seg;
  seg = segmented(ctl, {
    label: 'Task', value: which,
    options: TASKS.map(t => ({ label: t.name, value: t.id })),
    onchange: v => {
      which = v;
      const tk = TASKS.find(x => x.id === v);
      // Map rung → T lever via token-count multiple vs chat. Approximate: energy
      // does not scale 1:1 with tokens (video, tool use), so this is a starting point.
      const mult = tk.tok / TASKS[0].tok;
      Tmult = Math.min(M.LEVERS.T.max, Math.max(M.LEVERS.T.min, mult));
      Ts.set(Math.log10(Tmult));
      paint();
    },
  });
  const Us = slider(ctl, {
    label: 'People × tasks a day vs 2025', name: 'U', min: Math.log10(M.LEVERS.U.min), max: Math.log10(M.LEVERS.U.max),
    step: 0.01, value: Math.log10(U), color: C.red,
    fmt: v => `× ${Math.round(10 ** v).toLocaleString('en-GB')}`,
    oninput: v => { U = 10 ** v; paint(); },
  });
  Ts = slider(ctl, {
    label: 'Tokens per task vs a short chat, by 2050', name: 'T', min: Math.log10(M.LEVERS.T.min), max: Math.log10(M.LEVERS.T.max),
    step: 0.01, value: Math.log10(Tmult), color: C.violet,
    fmt: v => `× ${Math.round(10 ** v).toLocaleString('en-GB')}`,
    oninput: v => { Tmult = 10 ** v; paint(); },
  });
  const ro = readout(el);
  function paint(save = true) {
    const t = TASKS.find(x => x.id === which);
    // T is auto-set when the rung changes; the slider remains the ledger lever afterwards.
    const taskMult = t.tok / TASKS[0].tok;
    const fracU = Math.min(1, Math.max(0, (Math.log10(U) - Math.log10(M.LEVERS.U.min)) / (Math.log10(M.LEVERS.U.max) - Math.log10(M.LEVERS.U.min))));
    const fracT = Math.min(1, Math.max(0, (Math.log10(Math.max(1, Tmult)) - Math.log10(M.LEVERS.T.min)) / (Math.log10(M.LEVERS.T.max) - Math.log10(M.LEVERS.T.min))));
    publish('act1', { U: fracU, T: fracT });
    // Persist actual lever values for the index/verdict meters, only on user input (first paint must not flip them to "custom")
    if (save) {
      saveAct1({ ...(loadPrefs().act1 || M.PRESETS.mid), U, T: Tmult });
      savePrefs({ demandTask: which });
    }
    const dem = M.M0 * U * Tmult; // before efficiency; same crude product the meter uses as demand
    const path = M.run({ ...M.PRESETS.mid, U, T: Tmult });
    const m35 = path[2035 - 2025].m, m50 = path[2050 - 2025].m;
    ro.innerHTML = `Selected rung: <b>${t.name}</b> (~${t.tok.toLocaleString('en-GB')} tokens, ~${t.wh >= 1 ? Math.round(t.wh) : t.wh} Wh) — <i>${t.tag}</i>, ${t.note}. Ledger levers: people×tasks <b>×${Math.round(U).toLocaleString('en-GB')}</b>, tokens/task <b>×${Math.round(Tmult).toLocaleString('en-GB')}</b> (auto-set from this rung’s token multiple ≈×${Math.round(taskMult)} vs chat; approximate — Wh does not always track tokens 1:1). With Mid efficiency and supply, that path is about <b>${m35 >= 1000 ? (m35 / 1000).toFixed(1) + 'k' : Math.round(m35)} TWh</b> in 2035 and <b>${m50 >= 1000 ? (m50 / 1000).toFixed(1) + 'k' : Math.round(m50)} TWh</b> in 2050. Values are saved for the index and verdict meters.`;
    fig.invalidate();
  }
  hint(el, 'Tap a rung (or the buttons) — tokens/task jumps to that multiple — then open the index; U and T are waiting on the meter.');
  paint(false); fig.invalidate();
}
