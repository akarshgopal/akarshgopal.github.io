// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
//  seasonsFour — monthly wind and solar against demand in the US, Germany, China and India, 2019–2025 (Ember) — real
import { Fig } from '../lib/fig.js';
import { C, alpha, darken } from '../lib/colors.js';
import { text, measure, line, axes, pathLine } from '../lib/draw.js';
import { controls, segmented, slider, readout } from '../lib/ui.js';
import { SEASONS } from '../lib/seasonsdata.js';

/* ---------------- seasonsFour ---------------- */
// Share view: each month's wind and solar generation as a share of that month's demand, stacked.
// Shape view: wind, solar and demand each month divided by that year's average month (1 = an average month).
const MON = 'JFMAMJJASOND';
const WIND = '#4f9bd1', SOLAR = '#e3a922';
const yearRows = (c, yi) => {
  const s = yi * 12, sl = a => a.slice(s, s + 12);
  return { wind: sl(c.wind), solar: sl(c.solar), demand: sl(c.demand) };
};
const sum = a => a.reduce((x, y) => x + y, 0);
export function seasonsFour(el) {
  const Y = SEASONS.years, st = { view: 'share', yi: Y.length - 1 };
  const fig = new Fig(el, {
    label: 'Monthly wind and solar generation against demand in the United States, Germany, China and India, from Ember monthly data, 2019 to 2025',
    height: w => w < 600 ? 540 : 470,
    draw(ctx, w, h) {
      const narrow = w < 600, gx = narrow ? 10 : 28, top = narrow ? 50 : 30, gy = narrow ? 44 : 48;
      const pw = (w - gx) / 2, ph = (h - top - gy - 22) / 2;
      // legend
      const leg = st.view === 'share' ? [['wind', WIND], ['solar', SOLAR]] : [['wind', WIND], ['solar', SOLAR], ['demand', C.ink]];
      let lx = narrow ? 4 : 50;
      leg.forEach(([s, c]) => { ctx.fillStyle = c; ctx.fillRect(lx, 8, 10, 10); text(ctx, s, lx + 14, 17, { size: 11, color: C.ink2 }); lx += 26 + measure(ctx, s, 11); });
      text(ctx, st.view === 'share' ? `${Y[st.yi]}, share of each month’s demand` : `${Y[st.yi]}, each month ÷ the year’s average month`, narrow ? 4 : w - 4, narrow ? 38 : 17, { size: 11, color: C.ink3, align: narrow ? 'left' : 'right', weight: 500 });
      SEASONS.countries.forEach((c, i) => {
        const col = i % 2, row = Math.floor(i / 2), r = yearRows(c, st.yi);
        const x0 = col * (pw + gx), y0 = top + row * (ph + gy);
        const showY = !narrow || col === 0;
        const box = { l: x0 + (showY ? (narrow ? 34 : 40) : 4), r: x0 + pw - 4, t: y0 + 40, b: y0 + ph };
        const ws = sum(r.wind) / sum(r.demand), ss = sum(r.solar) / sum(r.demand);
        text(ctx, c.name, box.l, y0 + 12, { size: 12.5, weight: 700, color: C.ink });
        text(ctx, `year: wind ${Math.round(ws * 100)}%, solar ${Math.round(ss * 100)}%`, box.l, y0 + 27, { size: 11, color: C.ink3 });
        if (st.view === 'share') {
          const { sx, sy } = axes(ctx, { box, x0: 0, x1: 12, y0: 0, y1: 0.6, xticks: [], yticks: [0, 0.2, 0.4, 0.6], yfmt: v => showY ? Math.round(v * 100) + '%' : '' });
          const bw = (box.r - box.l) / 12 * 0.72;
          for (let m = 0; m < 12; m++) {
            const wv = r.wind[m] / r.demand[m], sv = r.solar[m] / r.demand[m], x = sx(m + 0.5) - bw / 2;
            ctx.fillStyle = WIND; ctx.fillRect(x, sy(wv), bw, sy(0) - sy(wv));
            ctx.fillStyle = SOLAR; ctx.fillRect(x, sy(wv + sv), bw, sy(wv) - sy(wv + sv) - 0.5);
          }
        } else {
          const { sx, sy } = axes(ctx, { box, x0: 0, x1: 12, y0: 0, y1: 2.2, xticks: [], yticks: [0, 1, 2], yfmt: v => showY ? (v === 1 ? 'avg' : v ? '×' + v : '0') : '' });
          line(ctx, box.l, sy(1), box.r, sy(1), alpha(C.ink3, 0.5), 1, [3, 3]);
          [['wind', WIND, 2.2], ['solar', SOLAR, 2.2], ['demand', C.ink, 1.8]].forEach(([k, colr, lw]) => {
            const a = r[k], avg = sum(a) / 12;
            pathLine(ctx, a.map((v, m) => [sx(m + 0.5), sy(Math.min(2.2, v / avg))]), colr, lw);
          });
        }
        for (let m = 0; m < 12; m++) if (!narrow || m % 2 === 0) text(ctx, MON[m], box.l + (box.r - box.l) * (m + 0.5) / 12, box.b + 14, { size: 10.5, color: C.ink3, align: 'center' });
      });
    },
  });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'Share of demand', value: 'share', name: 'sf-share' }, { label: 'Seasonal shape', value: 'shape', name: 'sf-shape' }], value: 'share', onchange: v => { st.view = v; upd(); } });
  slider(ctl, { label: 'Year', min: 0, max: Y.length - 1, step: 1, value: st.yi, color: C.ink, fmt: v => String(Y[v]), oninput: v => { st.yi = v; upd(); }, name: 'sf-year' });
  function upd() {
    const parts = SEASONS.countries.map(c => {
      const r = yearRows(c, st.yi), ws = r.wind.map((v, m) => v / r.demand[m]);
      const hi = ws.indexOf(Math.max(...ws)), lo = ws.indexOf(Math.min(...ws));
      const nm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `<b>${c.name}</b>: wind ${Math.round(ws[hi] * 100)}% of demand in ${nm[hi]}, ${Math.round(ws[lo] * 100)}% in ${nm[lo]}`;
    });
    ro.innerHTML = `In ${Y[st.yi]}: ` + parts.join('; ') + '.';
    fig.invalidate();
  }
  upd();
}

export const FIGS = { seasonsFour };
