// New and rebuilt figures for this essay (restructure, October 2026). Export them in FIGS by name.
import { Fig } from '../lib/fig.js';
import { C, alpha } from '../lib/colors.js';
import { text, circle, line, pathLine, scale } from '../lib/draw.js';
import { controls, slider, readout } from '../lib/ui.js';
import { ENERGY } from '../lib/energydata.js';

// Humanity on the Kardashev scale: world primary energy as a rate of power (OWID / Energy Institute), Sagan's continuous
// rating K = (log10 P − 6) / 10, Type I at 10^16 W, and how long a steady growth rate takes to get there.
const TYPE1 = 1e16, SUNLIGHT = 1.74e17; // W; sunlight intercepted by the Earth = 1,361 W/m² × π × (6,371 km)²
export function kardashev(el) {
  const [Y0, Y1] = ENERGY.years;
  const W = ENERGY.worldTWh.map(t => t * 1e12 / 8760); // TWh a year → average watts
  const P1 = W[W.length - 1];
  const rate = (a, b) => Math.pow(W[b - Y0] / W[a - Y0], 1 / (b - a)) - 1;
  const fast = rate(1965, 1973), slow = rate(1973, Y1);
  const st = { g: Math.round(slow * 1000) / 10 };
  const K = p => (Math.log10(p) - 6) / 10;
  const yearsTo = (p, g) => Math.log(p / P1) / Math.log(1 + g / 100);
  const fig = new Fig(el, {
    label: `World energy use as power on a logarithmic scale from 1 to 1,000 terawatts: about ${Math.round(P1 / 1e12)} TW in ${Y1}, 0.73 on the Kardashev scale; Type I is 10,000 TW and the sunlight reaching the Earth about 174,000 TW`,
    height: w => w < 600 ? 230 : 210,
    draw(ctx, w, h) {
      const narrow = w < 600;
      const box = { l: 18, r: w - 18 };
      const lg = Math.log10, sx = scale(12, 17.4, box.l, box.r);
      const y = narrow ? 112 : 104;
      // the power axis (top) and the Kardashev rating (below), one scale
      line(ctx, sx(12), y, sx(17.4), y, C.grid2, 1.5);
      for (let e = 12; e <= 17; e++) {
        line(ctx, sx(e), y - 5, sx(e), y + 5, C.ink3, 1);
        const tw = [1, 10, 100, '1,000', '10,000', '100,000'][e - 12];
        if (e !== 16 && (!narrow || e % 2 === 0)) text(ctx, `${tw} TW`, sx(e), y - 12, { size: 10.5, color: C.ink3, align: 'center' });
        text(ctx, `K ${K(10 ** e).toFixed(1)}`, sx(e), y + 19, { size: 10.5, color: C.ink3, align: 'center' });
      }
      // Type I and the sunlight that reaches the Earth
      const x1 = sx(lg(TYPE1)), xs = sx(lg(SUNLIGHT));
      line(ctx, x1, y - 34, x1, y - 6, alpha(C.price, 0.7), 1.5, [4, 3]);
      text(ctx, 'Type I', x1, y - 40, { size: 11.5, weight: 650, color: C.price, align: 'center' });
      line(ctx, xs, y - 34, xs, y - 6, alpha(C.solar, 0.9), 1.5, [4, 3]);
      text(ctx, narrow ? 'sunlight' : 'all sunlight on Earth', narrow ? xs + 4 : xs, y - 40, { size: 11, weight: 600, color: '#9a7414', align: narrow ? 'right' : 'center' });
      // humanity, 1965 → now
      pathLine(ctx, [[sx(lg(W[0])), y], [sx(lg(P1)), y]], C.ink, 4);
      for (const yr of [Y0, 1973, 2000, Y1]) { const p = W[yr - Y0]; circle(ctx, sx(lg(p)), y, yr === Y1 ? 5 : 3.5, yr === Y1 ? C.ink : '#fff', C.ink, 2); }
      text(ctx, `humanity, ${Y0}–${Y1}`, sx(lg(W[0])), y + 40, { size: 11.5, weight: 650, color: C.ink });
      // the path to Type I at the chosen growth rate
      const yrs = yearsTo(TYPE1, st.g);
      pathLine(ctx, [[sx(lg(P1)) + 7, y], [x1 - 3, y]], alpha(C.ink, 0.35), 1.5, [2, 4]);
      text(ctx, `${Math.round(yrs)} years at ${st.g.toFixed(1)}% a year`, (sx(lg(P1)) + x1) / 2, y + (narrow ? 58 : 40), { size: 11, color: C.ink2, align: 'center', weight: 600 });
    },
  });
  const ctl = controls(el);
  const ro = readout(el);
  const upd = () => {
    const yrs = yearsTo(TYPE1, st.g);
    ro.innerHTML = `Humanity used about <b>${(P1 / 1e12).toFixed(0)} TW</b> on average in ${Y1}, <b>${K(P1).toFixed(2)}</b> on the scale. At <b>${st.g.toFixed(1)}% a year</b> Type I is ${Math.round(yrs)} years away, in about ${Y1 + Math.round(yrs)}. The world grew ${(fast * 100).toFixed(1)}% a year in 1965–73 and ${(slow * 100).toFixed(1)}% a year since.`;
    fig.invalidate();
  };
  slider(ctl, { label: 'Growth in world energy use', min: 0.5, max: 7, step: 0.1, value: st.g, color: C.ink2, fmt: v => v.toFixed(1) + '% a year', oninput: v => { st.g = v; upd(); }, name: 'growth' });
  upd();
}

export const FIGS = { kardashev };
