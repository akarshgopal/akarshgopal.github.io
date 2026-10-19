// Every amount in the series is shown in US dollars. Amounts are stored in US dollars, except in models built on euro data,
// whose strings are converted for display (curStr, curDraw, euroFigure).
//
// Rates are annual averages of the ECB euro foreign exchange reference rate,
// series EXR.A.USD.EUR.SP00.A — “US dollar/Euro”, US dollars per 1 euro.
// European Central Bank Statistical Data Warehouse.
// https://data.ecb.europa.eu/data/datasets/EXR/EXR.A.USD.EUR.SP00.A
// Raw download (10 October 2026): /workspace/research/data/global/ecb_exr_usd_eur_annual.csv
// OBS_VALUE is copied below unrounded.
//
// 2026 is not in the annual series yet. USD_PER_EUR[2026] is the unweighted
// arithmetic mean of the 198 daily reference rates in EXR.D.USD.EUR.SP00.A
// from 2026-01-02 through 2026-10-09 (sum of OBS_VALUE 229.6166). Same source.
// Raw download: /workspace/research/data/global/ecb_exr_usd_eur_daily_2026.csv
// It is a year-to-date average, not a finished annual average. ratesFor(2026).partial is true.
//
// Years outside 2015–2026 use the nearest available year. eurPerUsd = 1 / usdPerEur.
// A US-dollar amount converts to euros as amount * eurPerUsd.


/** USD per 1 EUR, by calendar year. */
export const USD_PER_EUR = Object.freeze({
  2015: 1.109512890625,
  2016: 1.1069031128405,
  2017: 1.1296811764706,
  2018: 1.1809545098039,
  2019: 1.1194745098039,
  2020: 1.1421961089494,
  2021: 1.1827403100775,
  2022: 1.0530486381323,
  2023: 1.081268627451,
  2024: 1.08238046875,
  2025: 1.1299831372549,
  2026: 229.6166 / 198,
});

// The series shows every amount in US dollars. Models built on euro data convert at the ECB rate for the year (see curStr).
export const DEFAULT_CURRENCY = 'USD';

export const RATE_META = Object.freeze({
  source: 'European Central Bank',
  series: 'EXR.A.USD.EUR.SP00.A',
  title: 'US dollar/Euro ECB reference exchange rate, annual average',
  url: 'https://data.ecb.europa.eu/data/datasets/EXR/EXR.A.USD.EUR.SP00.A',
  fetched: '2026-10-10',
  ytd2026: Object.freeze({
    series: 'EXR.D.USD.EUR.SP00.A',
    from: '2026-01-02',
    to: '2026-10-09',
    n: 198,
    sumUsdPerEur: 229.6166,
  }),
});

const YEARS = Object.keys(USD_PER_EUR).map(Number).sort((a, b) => a - b);

/** Nearest year we have a rate for. */
export function rateYear(year) {
  const y = Math.round(Number(year));
  if (USD_PER_EUR[y] != null) return y;
  if (y <= YEARS[0]) return YEARS[0];
  if (y >= YEARS[YEARS.length - 1]) return YEARS[YEARS.length - 1];
  return YEARS.reduce((best, v) => (Math.abs(v - y) < Math.abs(best - y) ? v : best));
}

/** { year, usdPerEur, eurPerUsd, partial } for the rate applied to `year`. */
export function ratesFor(year) {
  const y = rateYear(year);
  const usdPerEur = USD_PER_EUR[y];
  return { year: y, usdPerEur, eurPerUsd: 1 / usdPerEur, partial: y === 2026 };
}

/**
 * Rates keyed by year: { usdPerEur, eurPerUsd }.
 * 2026 is the year-to-date daily average described above.
 */
export const RATES = Object.freeze(Object.fromEntries(YEARS.map(y => {
  const usdPerEur = USD_PER_EUR[y];
  return [y, Object.freeze({ usdPerEur, eurPerUsd: 1 / usdPerEur })];
})));

/** Convert a US-dollar amount into `currency` ('USD' or 'EUR'). */
export function convertUsd(amountUsd, currency = DEFAULT_CURRENCY, year = YEARS[YEARS.length - 1]) {
  const n = Number(amountUsd);
  if (currency === 'EUR') return n * ratesFor(year).eurPerUsd;
  return n;
}

function autoDigits(n) {
  const a = Math.abs(n);
  if (a >= 100) return 0;
  if (Number.isInteger(n) && a >= 10) return 0;
  return 2;
}

/**
 * Format a US-dollar amount in `currency` using that year's rate.
 * opts.digits forces decimal places; opts.unit is appended (for example '/MWh').
 */
export function fmtMoney(amountUsd, currency = DEFAULT_CURRENCY, year = 2025, opts = {}) {
  const n = convertUsd(amountUsd, currency, year);
  const digits = opts.digits ?? autoDigits(n);
  const body = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const sign = n < 0 ? '−' : '';
  const unit = opts.unit || '';
  return currency === 'EUR' ? `${sign}€${body}${unit}` : `${sign}$${body}${unit}`;
}

// Captions follow the toggle too: euro amounts in the figure's caption are converted at `caption` (US$ per €), or left alone if
// caption === false (figures that convert each year at its own rate, where one rate would mislead).
const capOrig = new WeakMap();
function captionCur(fig, cur, rate) {
  const cap = fig && fig.querySelector('figcaption'); if (!cap) return false;
  if (!capOrig.has(cap)) capOrig.set(cap, cap.innerHTML);
  const o = capOrig.get(cap); cap.innerHTML = cur === 'USD' ? curStr(o, 'USD', rate, false, true) : o; return true;
}
export function currencyToggle(ctl, onchange, namePrefix = 'cur', { caption = USD_PER_EUR[2025] } = {}) {
  // No visible control: every figure shows US dollars. Euro amounts left in a caption are converted once, on load.
  const fig = ctl.closest('figure');
  if (caption) { let n = 0; const tryInit = () => { if (!captionCur(fig, 'USD', caption) && n++ < 120) requestAnimationFrame(tryInit); }; requestAnimationFrame(tryInit); }
  return { get value() { return 'USD'; }, set() {} };
}

// Display conversion of already-formatted euro strings: "€1,234.5" → "$1,394.9", "€/MWh" → "$/MWh",
// "12.3 ct" → "13.9 ¢". Used by figures whose models are computed in euros (labelled as such in captions).
export function curStr(s, cur, rate = USD_PER_EUR[2025], round = false, strict = false) {
  if (cur !== 'USD' || typeof s !== 'string') return s;
  const fmt = (num) => {
    const d = (num.split('.')[1] || '').length;
    let v = parseFloat(num.replace(/,/g, '')) * rate;
    // slider outputs: keep converted values to ~3 significant figures ($2,373 → $2,370)
    if (round && d === 0 && v >= 100 && v < 1000) v = Math.round(v / 10) * 10;
    if (round && d === 0 && v >= 1000) { const p = Math.pow(10, Math.floor(Math.log10(v)) - 2); v = Math.round(v / p) * p; }
    return num.includes(',') || v >= 10000 ? v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : v.toFixed(d);
  };
  return s
    .replace(/€(\s?)([−-]?)(\d[\d,]*(?:\.\d+)?)(?:([–-])(\d[\d,]*(?:\.\d+)?))?/g, (m, sp, neg, num, dash, num2) => '$' + sp + neg + fmt(num) + (num2 ? dash + fmt(num2) : ''))
    .replace(/(\d[\d,]*(?:\.\d+)?)\s?ct\b/g, (m, num) => fmt(num) + ' ¢')
    .replace(strict ? /€(?=\/[A-Za-z])/g : /€/g, '$') // strict (captions): only "€/MWh"-style units; keep "the $/€ toggle", "US$1.13/€"
    .replace(/\bct\/kWh/g, '¢/kWh');
}

// Wrap draw.js helpers so canvas strings follow ctx.__cur ('USD' converts euro strings via curStr).
export function curDraw(D, rate = USD_PER_EUR[2025]) {
  const c = (ctx, s) => curStr(s, ctx && ctx.__cur, rate);
  const wf = (ctx, f) => f && ((...a) => c(ctx, f(...a)));
  return {
    text: (ctx, s, ...a) => D.text(ctx, c(ctx, s), ...a),
    measure: (ctx, s, ...a) => D.measure(ctx, c(ctx, s), ...a),
    tag: (ctx, s, ...a) => D.tag(ctx, c(ctx, s), ...a),
    axes: (ctx, o) => {
      const q = { ...o, ylabel: c(ctx, o.ylabel), xlabel: c(ctx, o.xlabel), yfmt: wf(ctx, o.yfmt), xfmt: wf(ctx, o.xfmt) };
      if (ctx && ctx.__cur === 'USD') for (const k of ['y', 'x']) {
        const f = o[k + 'fmt'], a0 = o[k + '0'], a1 = o[k + '1'];
        let t = o[k + 'ticks'];
        if (!t && f && a0 != null && a1 != null) { const n = o['n' + k] || 5; t = Array.from({ length: n + 1 }, (_, i) => a0 + (a1 - a0) * i / n); }
        if (!t || t.length < 2 || !f || !String(f(t[1])).includes('€')) continue;
        const lo = Math.min(...t) * rate, hi = Math.max(...t) * rate, raw = (hi - lo) / (t.length - 1), p10 = Math.pow(10, Math.floor(Math.log10(raw)));
        const step = [1, 2, 5, 10].map(m => m * p10).find(m => m >= raw * 0.95);
        const lim = k === 'y' ? [o.y0, o.y1] : [o.x0, o.x1], top = lim[0] == null ? hi * 1.08 : Math.max(...lim) * rate; // fill ticks up to the axis end
        const nt = []; for (let v = Math.ceil(lo / step - 1e-9) * step; v <= top + 1e-9; v += step) nt.push(v / rate);
        q[k + 'ticks'] = nt.filter(v => lim[0] == null || (v >= Math.min(...lim) - 1e-9 && v <= Math.max(...lim) + 1e-9));
        // keep the original's display scale and suffix ("€1 bn" for 1000 → divisor 1000, suffix " bn")
        const smp = String(f(t[1])), mm = smp.match(/€\s?([\d.,]+)(.*)$/), sn = mm ? parseFloat(mm[1].replace(/,/g, '')) : NaN;
        const div = sn && isFinite(t[1] / sn) ? t[1] / sn : 1, suf = mm ? mm[2] : '';
        q[k + 'fmt'] = v => { const n = v * rate / div, sd = step / div, d = sd < 1 ? (sd < 0.1 ? 2 : 1) : 0; return Math.abs(n) < 1e-9 && /^0$/.test(String(f(0))) ? '0' : (n < 0 ? '−' : '') + '$' + Math.abs(n).toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suf; };
      }
      return D.axes(ctx, q);
    },
  };
}

// Add a $/€ toggle to a figure whose model and labels are in euros. Canvas strings are converted
// through curDraw; DOM readouts and slider outputs inside `el` are converted by observing them.
export function euroFigure(el, fig, ctl, prefix, rate = USD_PER_EUR[2025]) {
  let cur = DEFAULT_CURRENCY;
  const orig = new WeakMap();
  const apply = n => { const o = orig.get(n); if (o == null) return; n.innerHTML = cur === 'USD' ? curStr(o, 'USD', rate, n.tagName === 'OUTPUT') : o; };
  const nodes = [...el.querySelectorAll('.readout, output')];
  const obs = new MutationObserver(recs => {
    const seen = new Set(); for (const r of recs) { let n = r.target.nodeType === 1 ? r.target : r.target.parentElement; while (n && !nodes.includes(n)) n = n.parentElement; if (n) seen.add(n); }
    seen.forEach(n => { orig.set(n, n.innerHTML); apply(n); }); obs.takeRecords();
  });
  nodes.forEach(n => { orig.set(n, n.innerHTML); obs.observe(n, { childList: true, characterData: true, subtree: true }); });
  // preset buttons that name euro amounts ("Europe today, €2,100/kW") follow the toggle too; collected before the toggle exists
  const btns = [...el.querySelectorAll('button')].filter(b => b.textContent.includes('€')).map(b => [b, b.innerHTML]);
  const refresh = () => { nodes.forEach(apply); btns.forEach(([b, o]) => { b.innerHTML = cur === 'USD' ? curStr(o, 'USD', rate, true) : o; }); obs.takeRecords(); fig.ctx.__cur = cur; fig.invalidate(); };
  currencyToggle(ctl, v => { cur = v; refresh(); }, prefix);
  refresh();
}
