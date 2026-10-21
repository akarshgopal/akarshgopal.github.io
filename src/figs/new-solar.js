// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
//  solarFour — solar in the four countries of the series, 2010–2025: share of generation or installed capacity (Ember) — real
import { Fig } from '../lib/fig.js';
import { C, alpha, darken } from '../lib/colors.js';
import { text, line, circle, axes, pathLine } from '../lib/draw.js';
import { controls, segmented, readout } from '../lib/ui.js';
import { SOLAR4 } from '../lib/solar4data.js';

const CTRY = [['china', 'China', '#c0392b'], ['us', 'US', '#1f3a5f'], ['india', 'India', '#d68910'], ['germany', 'Germany', '#3f6f5e'], ['world', 'World', C.ink3]];

export function solarFour(el) {
  const [Y0, Y1] = SOLAR4.years, N = Y1 - Y0 + 1;
  const st = { mode: 'share', hover: null };
  const val = (r, i) => SOLAR4[r][st.mode === 'share' ? 'share' : 'gw'][i];
  const fig = new Fig(el, {
    label: `Solar in China, the US, India and Germany, ${Y0} to ${Y1}, with the world for comparison: share of each country’s electricity generation, or installed capacity in gigawatts`,
    height: w => w < 600 ? 360 : 340,
    draw(ctx, w, h) {
      const narrow = w < 600, share = st.mode === 'share';
      const A = { l: narrow ? 44 : 58, r: w - (narrow ? 92 : 128), t: 26, b: h - 34 };
      const y1 = share ? 20 : 1250;
      const { sx, sy } = axes(ctx, { box: A, x0: Y0, x1: Y1, y0: 0, y1, xticks: narrow ? [2010, 2015, 2020, 2025] : [2010, 2013, 2016, 2019, 2022, 2025], yticks: share ? [0, 5, 10, 15, 20] : [0, 250, 500, 750, 1000, 1250], xfmt: String, yfmt: v => share ? v + '%' : v.toLocaleString('en-US'), ylabel: share ? 'solar share of electricity generated' : (narrow ? 'solar installed, GW' : 'solar capacity installed, GW (world off the scale)') });
      const labels = [];
      CTRY.forEach(([r, n, col]) => {
        if (!share && r === 'world') return;
        const pts = []; for (let i = 0; i < N; i++) pts.push([sx(Y0 + i), sy(Math.min(y1, val(r, i)))]);
        const hl = st.hover === r, dim = st.hover && !hl;
        pathLine(ctx, pts, dim ? alpha(col, 0.25) : col, hl ? 3 : r === 'world' ? 1.6 : 2.2, r === 'world' ? [5, 4] : null);
        const v = val(r, N - 1); circle(ctx, sx(Y1), sy(v), 3, col);
        labels.push({ n, r, col, y: sy(v), y0: sy(v), v });
      });
      labels.sort((a, b) => a.y - b.y); const gap = 14;
      for (let i = 1; i < labels.length; i++) if (labels[i].y < labels[i - 1].y + gap) labels[i].y = labels[i - 1].y + gap;
      for (let i = labels.length - 1; i >= 0; i--) { const lim = A.b + 4 - (labels.length - 1 - i) * gap; if (labels[i].y > lim) labels[i].y = lim; if (i < labels.length - 1 && labels[i].y > labels[i + 1].y - gap) labels[i].y = labels[i + 1].y - gap; }
      labels.forEach(L => { line(ctx, A.r + 3, L.y0, A.r + 7, L.y - 4, alpha(L.col, 0.4), 1); text(ctx, `${L.n} ${share ? L.v.toFixed(0) + '%' : Math.round(L.v).toLocaleString('en-US')}`, A.r + 9, L.y, { size: narrow ? 10 : 11, weight: st.hover === L.r ? 750 : 600, color: darken(L.col, 0.1) }); });
      st.lab = labels.map(L => ({ r: L.r, x: A.r + 9, y: L.y }));
    },
  });
  fig.interact({ hit: (x, y) => (st.lab || []).find(L => x >= L.x - 4 && Math.abs(y - (L.y - 4)) < 7) || null, hover: o => { const v = o ? o.r : null; if (v !== st.hover) { st.hover = v; upd(); } }, down: o => { st.hover = o ? o.r : null; upd(); }, cursor: o => o ? 'pointer' : null });
  const ctl = controls(el), ro = readout(el);
  segmented(ctl, { label: 'Show', options: [{ label: 'Share of generation', value: 'share', name: 's4-share' }, { label: 'Installed capacity', value: 'gw', name: 's4-gw' }], value: 'share', onchange: v => { st.mode = v; if (v === 'gw' && st.hover === 'world') st.hover = null; upd(); } });
  function upd() {
    const L = N - 1, S = SOLAR4;
    if (st.hover) {
      const r = CTRY.find(x => x[0] === st.hover), d = S[r[0]];
      ro.innerHTML = `<b>${r[1]}</b>, ${Y1}: <b>${d.share[L].toFixed(1)}%</b> of its electricity from solar, ${Math.round(d.twh[L]).toLocaleString('en-US')} TWh from ${Math.round(d.gw[L]).toLocaleString('en-US')} GW of panels (${Y0}: ${d.share[0].toFixed(2)}%, ${d.gw[0]} GW).`;
    } else if (st.mode === 'share') {
      ro.innerHTML = `In ${Y1} solar made <b>${S.germany.share[L].toFixed(0)}%</b> of Germany’s electricity, <b>${S.china.share[L].toFixed(0)}%</b> of China’s, <b>${S.india.share[L].toFixed(0)}%</b> of India’s and <b>${S.us.share[L].toFixed(0)}%</b> of the United States’; in ${Y0} none of them got more than ${Math.ceil(Math.max(S.germany.share[0], S.china.share[0], S.india.share[0], S.us.share[0]))}%.`;
    } else {
      const add = S.china.gw[L] - S.china.gw[L - 1];
      ro.innerHTML = `China had <b>${Math.round(S.china.gw[L]).toLocaleString('en-US')} GW</b> of solar at the end of ${Y1}, half the world’s ${Math.round(S.world.gw[L]).toLocaleString('en-US')} GW. Its fleet grew by about <b>${Math.round(add)} GW</b> in ${Y1} alone, more than all the solar in the United States (${Math.round(S.us.gw[L])} GW).`;
    }
    fig.invalidate();
  }
  upd();
}

export const FIGS = { solarFour };
