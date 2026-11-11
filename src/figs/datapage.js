// Data page: true scale of collection — funnel (web→tokens), scale ladder, labor map.
// Every number is cited in data.html notes. Do not invent precision.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, line, circle, clamp, rrect } from '../lib/draw.js';
import { readout, hint } from '../lib/ui.js';

const narrow = w => w < 560;
const L10 = Math.log10;

const rr = (ctx, x, y, w, h, r, fill, stroke, sw = 1.2) => {
  rrect(ctx, x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = sw; ctx.stroke(); }
};

// ---------- 1. Funnel: Common Crawl archive → useful training tokens ----------
// Review P3-M7: one unit (tokens, GPT-2 tokenizer) and one monotone chain, all from the FineWeb paper (Penedo et al. 2024,
// arXiv:2406.17557, §3): 96 Common Crawl snapshots → URL, English and quality filters ≈ 36T tokens → MinHash dedup within each
// snapshot 20T → C4 and custom filters 15T (FineWeb) → educational classifier 1.3T (FineWeb-Edu). The raw crawl (petabytes of
// HTML) has no published token count, so it is drawn unsized. Llama 3.1's 15.6T is Meta's own mix, not derived from FineWeb:
// drawn apart, on the same linear scale.
const FUNNEL = [
  { id: 'raw', nm: 'Common Crawl, 96 monthly snapshots', sub: 'petabytes of HTML; no token count published', nmS: 'Common Crawl, 96 snapshots', subS: 'HTML, not counted', v: 0, col: C.ink3, note: 'Billions of pages per snapshot, stored as raw HTML. Text is extracted from it in the next step, so it has no size in tokens.' },
  { id: 'base', nm: 'Extracted, English, quality-filtered', sub: '≈36 trillion tokens', v: 36e12, col: C.compute, note: 'Text pulled out of the HTML, adult URLs blocked, English kept, and repetitive or low-quality pages dropped (Gopher rules).' },
  { id: 'dedup', nm: 'Near-duplicates removed', sub: '20 trillion tokens · 56% kept', v: 20e12, col: C.compute, note: 'MinHash finds pages that are near-copies of each other within each snapshot. Deduplicating across all 96 at once left only 4T, and models trained on it were no better.' },
  { id: 'fineweb', nm: 'FineWeb', sub: '15 trillion tokens · 75% kept', v: 15e12, col: C.learn, note: 'Rules borrowed from C4 plus three of the authors’ own filters (short lines, repeated lines, punctuation) remove another quarter.' },
  { id: 'edu', nm: 'FineWeb-Edu', sub: '1.3 trillion tokens · 9% kept', v: 1.3e12, col: C.memory, note: 'A classifier, trained on a language model’s ratings of “educational value”, keeps fewer than one token in ten.' },
];
const LLAMA = { id: 'train', nm: 'Llama 3.1 training set (separate)', sub: '15.6 trillion tokens · Meta’s own mix', nmS: 'Llama 3.1 (separate)', subS: '15.6T · Meta’s own mix', v: 15.6e12, col: C.red, note: 'What Meta reported for Llama 3.1 405B. Not built from FineWeb and counted with a different tokenizer; it is here only for size.' };

export function dataFunnel(el) {
  let sel = 3;
  const ALL = [...FUNNEL, LLAMA];
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 400 : 370),
    label: 'Funnel of FineWeb’s pipeline in tokens, from Common Crawl through filtering and deduplication to FineWeb and FineWeb-Edu, with Llama 3.1’s training set beside it for size. Tap a stage.',
    draw(ctx, w, h) {
      const n = narrow(w), pad = n ? 10 : 18, top = 8, gap = 6, sep = 16;
      const rowH = (h - top - 8 - gap * (ALL.length - 2) - sep) / ALL.length;
      const maxW = w - pad * 2, sx = v => Math.max(4, maxW * v / 36e12); // linear: width is tokens
      ALL.forEach((s, i) => {
        const y = top + i * (rowH + gap) + (i === ALL.length - 1 ? sep - gap : 0), on = i === sel;
        const by = y + (n ? 20 : 22), bh = rowH - (n ? 22 : 24);
        const bw = s.v ? sx(s.v) : maxW, x = pad + (maxW - bw) / 2;
        text(ctx, (n && s.nmS) || s.nm, pad, y + 13, { size: n ? 12 : 13, weight: 700, color: on ? C.ink : C.ink2 });
        text(ctx, (n && s.subS) || s.sub, w - pad, y + 13, { size: n ? 11 : 12, align: 'right', color: on ? s.col : C.ink3, weight: on ? 650 : 400 });
        if (!s.v) { ctx.save(); ctx.setLineDash([5, 4]); rr(ctx, x, by, bw, bh, 6, alpha(s.col, on ? 0.16 : 0.06), alpha(s.col, 0.7), on ? 2 : 1.2); ctx.restore(); }
        else rr(ctx, x, by, bw, bh, 6, alpha(s.col, on ? 0.45 : 0.22), s.col, on ? 2.2 : 1.2);
        s._hit = { x: pad, y, w: maxW, h: rowH };
      });
    },
  });
  fig.interact({
    panY: true,
    hit: (x, y) => { const i = ALL.findIndex(s => s._hit && x >= s._hit.x && x <= s._hit.x + s._hit.w && y >= s._hit.y && y <= s._hit.y + s._hit.h); return i >= 0 ? i : null; },
    cursor: 'pointer',
    down(i) { if (i != null) { sel = i; paint(); } },
  });
  const ro = readout(el);
  const paint = () => {
    const s = ALL[sel];
    ro.innerHTML = `<b>${s.nm}.</b> ${s.note}`;
    fig.invalidate();
  };
  hint(el, 'tap a stage of the funnel.');
  paint();
}

// ---------- 2. Scale ladder: concrete sizes from a book to the Epoch stock ----------
const LADDER = [
  { id: 'book', nm: 'One book', v: 1e5, label: '~100 thousand tokens', src: '≈70–100k tokens for a long novel' },
  { id: 'wiki', nm: 'English Wikipedia', v: 4.3e9, label: '~4 billion tokens', src: 'Dolma table: Wikipedia + Wikibooks ≈ 4.3B Llama tokens' },
  { id: 'pile', nm: 'The Pile (2020)', v: 3e11, label: '~300 billion tokens', src: 'Gao et al., The Pile; ≈300B GPT-NeoX tokens per epoch (Biderman et al. 2023, Pythia)' }, // review m12: arXiv:2304.01373
  { id: 'dolma', nm: 'Dolma corpus', v: 3e12, label: '3 trillion tokens', src: 'Soldaini et al. 2024: open multi-source mix' },
  { id: 'fineweb', nm: 'FineWeb', v: 1.5e13, label: '15 trillion tokens', src: '96 Common Crawl snapshots, filtered' },
  { id: 'llama31', nm: 'Llama 3.1 train set', v: 1.56e13, label: '15.6 trillion tokens', src: 'Meta Llama 3.1 report' },
  { id: 'stock', nm: 'Epoch “effective” public text', v: 3e14, label: '~300 trillion tokens', src: 'Villalobos et al. / Epoch AI 2024; 90% CI ~100T–1,000T' },
];

export function scaleLadder(el) {
  let sel = 5;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 48 + LADDER.length * 44 : 40 + LADDER.length * 40),
    label: 'A ladder of training-data sizes on a log scale, from one book to Epoch AI’s estimated stock of public human text.',
    draw(ctx, w, h) {
      const n = narrow(w), pad = n ? 10 : 16;
      const railX = n ? 22 : 28, labelX = railX + 16;
      const rowH = (h - 36) / LADDER.length, top = 28;
      const lo = 4.8, hi = 15.0;
      const yLog = v => top + (L10(v) - lo) / (hi - lo) * (h - 48); // small at the top, like the rows
      // the log axis is its own labelled rail on the right; rows on the left stay evenly spaced (no label collisions).
      // Only the selected rung draws its leader across, so the true position reads without a tangle of dashes.
      const axX = w - (n ? 46 : 70), boxR = Math.min(axX - (n ? 34 : 48), labelX + 420);
      line(ctx, axX, top, axX, h - 20, C.grid2, 4);
      [[5, '100k'], [9, '1B'], [12, '1T'], [15, '1000T']].forEach(([e, lab]) => {
        const y = yLog(10 ** e);
        line(ctx, axX - 4, y, axX + 4, y, alpha(C.ink3, 0.7), 1);
        text(ctx, lab, axX + 8, y + 4, { size: 10.5, color: C.ink3 });
      });
      text(ctx, 'tokens, log', axX, top - 10, { size: 10.5, color: C.ink3, align: 'center' });
      LADDER.forEach((s, i) => {
        const y = top + (i + 0.5) * rowH, on = i === sel;
        const yL = yLog(s.v);
        if (on) { ctx.save(); ctx.strokeStyle = alpha(C.learn, 0.6); ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.moveTo(boxR, y); ctx.lineTo(axX, yL); ctx.stroke(); ctx.restore(); }
        circle(ctx, axX, yL, on ? 6 : 3.5, on ? '#fff' : C.ink3, on ? C.learn : null, on ? 2.2 : 0);
        circle(ctx, railX, y, on ? 5 : 3.5, on ? C.learn : C.ink3, null, 0);
        if (on) rr(ctx, labelX - 6, y - rowH * 0.42, boxR - labelX + 6, rowH * 0.84, 8, alpha(C.learn, 0.1), alpha(C.learn, 0.35), 1);
        text(ctx, s.nm, labelX, y - 4, { size: n ? 12.5 : 13, weight: on ? 750 : 650, color: on ? C.learn : C.ink, halo: 2 });
        text(ctx, s.label, labelX, y + 12, { size: n ? 11 : 11.5, color: C.ink2, halo: 2 });
        s._hit = { x: pad, y: y - rowH / 2, w: w - pad * 2, h: rowH };
      });
    },
  });
  fig.interact({
    panY: true,
    hit: (x, y) => { const i = LADDER.findIndex(s => s._hit && x >= s._hit.x && x <= s._hit.x + s._hit.w && y >= s._hit.y && y <= s._hit.y + s._hit.h); return i >= 0 ? i : null; },
    cursor: 'pointer',
    down(i) { if (i != null) { sel = i; paint(); } },
  });
  const fmtRatio = r => {
    if (r >= 1e9) return `${+(r / 1e9).toPrecision(2)} billion`;
    if (r >= 1e6) return `${+(r / 1e6).toPrecision(2)} million`;
    if (r >= 1e3) return `${+(r / 1e3).toPrecision(2)} thousand`;
    return Math.round(r).toLocaleString('en-GB');
  };
  const ro = readout(el);
  const paint = () => {
    const s = LADDER[sel], vs = LADDER[0];
    ro.innerHTML = `<b>${s.nm}:</b> ${s.label}. ${s.src}. About <b>${fmtRatio(s.v / vs.v)}</b> books of text.`;
    fig.invalidate();
  };
  hint(el, 'tap a rung on the ladder.');
  paint();
}

// ---------- 3. Labor map: who is counted as “people” ----------
const LABOR = [
  {
    id: 'creators', nm: 'Creators (scraped)',
    who: 'Authors, programmers, Wikipedians, forum users whose public writing was copied into WARCs.',
    n: 'Hundreds of millions of people over decades',
    pay: 'Usually unpaid for this use',
    col: C.compute,
    eg: 'Common Crawl pages; GitHub public repos; Wikipedia revisions.',
  },
  {
    id: 'crowd', nm: 'Crowd annotators',
    who: 'People hired for cents-to-dollars tasks: label an image, rate toxicity, check a caption.',
    n: 'ImageNet ≈ 49,000 workers (167 countries); MTurk median ≈ $2/h (2018 study)',
    pay: 'Low end: ≈ $2/h reported',
    col: C.time,
    eg: 'ImageNet 2007–2010; OpenAI/Sama content moderation in Kenya (TIME 2023).',
  },
  {
    id: 'experts', nm: 'Expert raters & writers',
    who: 'Doctors, lawyers, mathematicians, programmers writing demos and ranking model answers.',
    n: 'InstructGPT ≈ 40 contractors; Mercor >30,000 experts (2025 claim)',
    pay: 'Top end: ≈ $85–100/h claimed',
    col: C.red,
    eg: 'InstructGPT; Llama 2 RLHF; Scale / Surge / Mercor / micro1.',
  },
  {
    id: 'users', nm: 'Product users',
    who: 'People whose prompts and thumbs-up become training signal when the product terms allow it.',
    n: 'ChatGPT >1.2B weekly users (Oct 2026, OpenAI)',
    pay: 'Free or subscription; data is the price of the loop',
    col: C.learn,
    eg: 'Consumer chat logs (opt-out / opt-in varies by lab).',
  },
];

export function laborMap(el) {
  let sel = 0;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 400 : 340),
    label: 'Four different groups of people behind “AI training data.” They are not interchangeable.',
    draw(ctx, w, h) {
      const n = narrow(w), cols = n ? 1 : 2, rows = n ? 4 : 2;
      const pad = n ? 8 : 14, gap = 10;
      const cw = (w - pad * 2 - gap * (cols - 1)) / cols;
      const ch = (h - pad * 2 - gap * (rows - 1) - 8) / rows;
      LABOR.forEach((s, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const x = pad + c * (cw + gap), y = pad + r * (ch + gap);
        const on = i === sel;
        rr(ctx, x, y, cw, ch, 12, on ? alpha(s.col, 0.16) : C.paper, on ? s.col : C.grid2, on ? 2 : 1.2);
        text(ctx, s.nm, x + 14, y + 24, { size: n ? 13 : 14, weight: 750, color: s.col, halo: 2 });
        // wrap who
        const words = s.who.split(' '), lines = [];
        let lineS = '';
        ctx.font = '450 12px Inter, system-ui, sans-serif';
        const maxW = cw - 28;
        for (const wd of words) {
          const t = lineS ? lineS + ' ' + wd : wd;
          if (ctx.measureText(t).width > maxW && lineS) { lines.push(lineS); lineS = wd; } else lineS = t;
        }
        if (lineS) lines.push(lineS);
        lines.slice(0, n ? 4 : 3).forEach((ln, k) => text(ctx, ln, x + 14, y + 46 + k * 15, { size: 12, color: C.ink2 }));
        text(ctx, s.pay, x + 14, y + ch - 14, { size: 11.5, weight: 650, color: C.ink3 });
        s._hit = { x, y, w: cw, h: ch };
      });
    },
  });
  fig.interact({
    panY: true,
    hit: (x, y) => { const i = LABOR.findIndex(s => s._hit && x >= s._hit.x && x <= s._hit.x + s._hit.w && y >= s._hit.y && y <= s._hit.y + s._hit.h); return i >= 0 ? i : null; },
    cursor: 'pointer',
    down(i) { if (i != null) { sel = i; paint(); } },
  });
  const ro = readout(el);
  const paint = () => {
    const s = LABOR[sel];
    ro.innerHTML = `<b>${s.nm}.</b> ${s.n}. Example: ${s.eg}`;
    fig.invalidate();
  };
  hint(el, 'tap a group — creators, crowd, experts, or users.');
  paint();
}

// ---------- 4. Where it goes: simple flow ----------
const FLOW = [
  { id: 'raw', nm: 'Raw crawl / licensed', y: 0 },
  { id: 'clean', nm: 'Clean + dedupe + mix', y: 1 },
  { id: 'pre', nm: 'Pretrain checkpoint', y: 2 },
  { id: 'post', nm: 'Post-train (SFT/RLHF/RL)', y: 3 },
  { id: 'prod', nm: 'Product & agents', y: 4 },
];
const FLOW_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4],
];
const FLOW_SIDE = [
  { from: 1, nm: 'Eval sets\n(held out)', side: 'right', at: 1.5 },
  { from: 3, nm: 'Synthetic\nloop', side: 'left', at: 3.2 },
  { from: 4, nm: 'Usage →\nnext mix', side: 'right', at: 4 },
];

export function dataFlow(el) {
  let sel = 2;
  const fig = new Fig(el, {
    height: w => (narrow(w) ? 380 : 340),
    label: 'Where collected data goes: from raw crawl through cleaning into checkpoints, products, evals and synthetic loops.',
    draw(ctx, w, h) {
      const n = narrow(w), cx = w / 2, top = 24, bot = h - 20;
      const nN = FLOW.length;
      const ys = FLOW.map((_, i) => top + (i + 0.5) * (bot - top) / nN);
      // edges
      FLOW_EDGES.forEach(([a, b]) => {
        line(ctx, cx, ys[a] + 22, cx, ys[b] - 22, C.grid2, 3);
        // arrow
        ctx.fillStyle = C.ink3;
        ctx.beginPath(); ctx.moveTo(cx - 5, ys[b] - 28); ctx.lineTo(cx + 5, ys[b] - 28); ctx.lineTo(cx, ys[b] - 18); ctx.fill();
      });
      FLOW.forEach((s, i) => {
        const on = i === sel;
        const bw = n ? Math.min(220, w - 24) : 200, bh = 40;
        const x = cx - bw / 2, y = ys[i] - bh / 2;
        rr(ctx, x, y, bw, bh, 10, on ? alpha(C.learn, 0.2) : C.paper, on ? C.learn : C.grid2, on ? 2.2 : 1.2);
        text(ctx, s.nm, cx, ys[i] + 5, { size: n ? 12.5 : 13, weight: 700, align: 'center', color: C.ink, halo: 2 });
        s._hit = { x, y, w: bw, h: bh };
      });
      // side notes
      FLOW_SIDE.forEach(s => {
        const y = top + (s.at + 0.5) * (bot - top) / nN;
        const left = s.side === 'left';
        const x0 = left ? cx - (n ? 118 : 130) : cx + (n ? 118 : 130);
        line(ctx, cx + (left ? -100 : 100), y, x0 + (left ? 8 : -8), y, alpha(C.ink3, 0.5), 1.2);
        const lines = s.nm.split('\n');
        lines.forEach((ln, k) => text(ctx, ln, x0, y + k * 14 - (lines.length - 1) * 7, { size: 11.5, align: left ? 'right' : 'left', color: C.ink2, weight: 600, halo: 3 }));
      });
    },
  });
  fig.interact({
    panY: true,
    hit: (x, y) => { const i = FLOW.findIndex(s => s._hit && x >= s._hit.x && x <= s._hit.x + s._hit.w && y >= s._hit.y && y <= s._hit.y + s._hit.h); return i >= 0 ? i : null; },
    cursor: 'pointer',
    down(i) { if (i != null) { sel = i; paint(); } },
  });
  const notes = [
    'Public WARCs, licensed books/news, code hosts, private enterprise dumps. Most frontier mixes are unpublished.',
    'Language ID, quality filters, PII scrubs, fuzzy dedupe, then a mix recipe (web / code / books / …). Most bytes die here.',
    'One (or a few) base models: next-token prediction on the mix. This is where most of the training FLOPs — and watts — are spent.',
    'Smaller, expensive human (and synthetic) data: demonstrations, preferences, graded agent tasks. Turns a predictor into a product.',
    'Serving users and agents. Their prompts and ratings can re-enter the mix. Eval sets stay held out to measure, not train.',
  ];
  const ro = readout(el);
  const paint = () => { ro.innerHTML = `<b>${FLOW[sel].nm}.</b> ${notes[sel]}`; fig.invalidate(); };
  hint(el, 'tap a stage in the pipeline.');
  paint();
}
