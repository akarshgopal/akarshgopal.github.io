/* Thesis figures for "Can AI outgrow the planet's power grid?"
 *
 * Written by hand, unminified, so it can be read and later moved into the
 * ai-explainer source (src/figs/). Loaded after app.js on the pages that use it.
 * Figures are <figure class="fig" data-xfig="name">; app.js ignores them.
 *
 * Every number in DATA has a source in the page's notes; the series' own
 * arithmetic is done below in plain code, and assumptions are labelled in
 * the captions in words.
 */
(function () {
  'use strict';

  // ---------- data (sources in the page notes) ----------
  var DATA = {
    // Google, I/O keynote 19 May 2026: tokens a month across Google's surfaces
    googleTokensMonth: { may2024: 9.7e12, may2025: 480e12, may2026: 3.2e15 },
    // the series' chat rung: 0.24 Wh (Google median Gemini text prompt) ≈ 400 tokens
    whPerPrompt: 0.24, tokensPerPrompt: 400,
    // OpenAI: API tokens a minute (DevDay, 6 Oct 2025)
    openaiApiTokensMin: 6e9,
    // OpenAI: ChatGPT prompts a day (July 2025) and Wh per average query (Altman, June 2025)
    chatgptPromptsDay: 2.5e9, chatgptWhPerQuery: 0.34,
    // Microsoft: 50 trillion tokens in March 2025 (FY25 Q3 call)
    msftTokensMonth: 50e12,
    // OpenRouter, State of AI (Dec 2025): ~6,000 prompt and ~400 completion tokens per request
    readShare: 6000 / 6400,
    // Epoch AI (Feb 2025): ~0.3 Wh for 500 written tokens; ~2.5 Wh with 10k tokens read
    readCostFraction: ((2.5 - 0.3) / 10000) / (0.3 / 500),
    // top-down: the series' 2025 inference estimate and band
    inference2025: 55, inferenceBand: [40, 80],
    // IEA: all data centres, TWh
    ieaDC: { 2024: 415, 2025: 485, 2030: 950, 2035: 1200 },
    ieaDC2035range: [700, 1700],
    // Epoch AI: AI data-centre capacity, GW (end of year)
    epochGW: { 2024: 13.5, 2025: 31.24 },
    act2Growth: 0.26, act2Ceiling2035: 316,
    // Act 1 meter, Low / Mid / High presets, inference TWh 2025–2035 (computed from the meter's own model)
    act1: {
      low: [55, 67, 79, 91, 103, 114, 123, 131, 138, 143, 146],
      mid: [55, 77, 105, 138, 177, 220, 268, 320, 374, 429, 486],
      high: [55, 82, 119, 165, 223, 292, 373, 465, 567, 678, 796]
    },
    // capex: 2026 guidance, US$ billions (latest company guidance)
    // (midpoints: Alphabet 195–205, Meta 135–145; Amazon ~220; Microsoft ~170 for calendar 2026)
    capex2026: { Microsoft: 170, Alphabet: 200, Amazon: 220, Meta: 140 },
    // Epoch AI: all-in up-front cost of 1 GW of AI data centre, US$ billions
    usdPerGW: 38
  };

  // ---------- small helpers ----------
  var DPR = function () { return Math.min(window.devicePixelRatio || 1, 2); };
  var C = {
    ink: '#2b2b2a', ink2: '#575755', ink3: '#878784', grid: '#e4e4e1', grid2: '#cfcfcb',
    stage: '#f4f4f2', red: '#d9483f', green: '#3f9a44', blue: '#3478d0', violet: '#8a55c9',
    orange: '#dd7424', yellow: '#d9a521', teal: '#1f8a9b', heat: '#d9483f'
  };
  var FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif";
  var fmt = function (x, sig) {
    if (!isFinite(x)) return '–';
    if (Math.abs(x) >= 100) return Math.round(x).toLocaleString('en-GB');
    return (+x.toPrecision(sig || 2)).toLocaleString('en-GB');
  };
  var pct = function (x) { return Math.round(x * 100) + '%'; };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  var log10 = Math.log10;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function text(ctx, s, x, y, o) {
    o = o || {};
    ctx.font = (o.weight || 450) + ' ' + (o.size || 12) + 'px ' + FONT;
    ctx.textAlign = o.align || 'left';
    ctx.textBaseline = o.base || 'alphabetic';
    if (o.halo) {
      ctx.lineWidth = 4; ctx.strokeStyle = o.haloColor || C.stage; ctx.lineJoin = 'round';
      ctx.strokeText(s, x, y);
    }
    ctx.fillStyle = o.color || C.ink;
    ctx.fillText(s, x, y);
    return ctx.measureText(s).width;
  }
  function line(ctx, x1, y1, x2, y2, col, w, dash) {
    ctx.save(); ctx.beginPath(); ctx.strokeStyle = col; ctx.lineWidth = w || 1;
    if (dash) ctx.setLineDash(dash);
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
  }
  function rrect(ctx, x, y, w, h, r) {
    r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function alpha(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  // A canvas that redraws on resize, sized in CSS pixels.
  function stage(fig, opts) {
    var wrap = el('div', 'canvas-wrap');
    var cv = el('canvas');
    cv.setAttribute('role', 'img');
    cv.setAttribute('aria-label', opts.label);
    wrap.appendChild(cv);
    fig.insertBefore(wrap, fig.querySelector('figcaption'));
    var api = { cv: cv, w: 0, h: 0 };
    api.draw = function () {
      var w = Math.round(wrap.clientWidth);
      if (!w) return;
      var h = typeof opts.height === 'function' ? opts.height(w) : opts.height;
      var d = DPR();
      if (cv.width !== w * d || cv.height !== h * d) {
        cv.width = w * d; cv.height = h * d; cv.style.width = w + 'px'; cv.style.height = h + 'px';
      }
      var ctx = cv.getContext('2d');
      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.clearRect(0, 0, w, h);
      api.w = w; api.h = h;
      opts.draw(ctx, w, h);
    };
    if (window.ResizeObserver) new ResizeObserver(function () { api.draw(); }).observe(wrap);
    else window.addEventListener('resize', api.draw);
    return api;
  }

  var sliderN = 0;
  function controls(fig) {
    var c = el('div', 'controls');
    fig.insertBefore(c, fig.querySelector('figcaption'));
    return c;
  }
  // slider: value space is [min,max] (or log10 space if o.log)
  function slider(parent, o) {
    var id = 'xsl' + (++sliderN);
    var d = el('div', 'ctl slider');
    d.style.setProperty('--c', o.color || C.ink2);
    d.innerHTML = '<label for="' + id + '"><span class="name"></span><output for="' + id + '"></output></label>' +
      '<input type="range" id="' + id + '">';
    d.querySelector('.name').innerHTML = o.label;
    var inp = d.querySelector('input'), out = d.querySelector('output');
    var toR = function (v) { return o.log ? log10(v) : v; };
    var fromR = function (r) { return o.log ? Math.pow(10, r) : r; };
    inp.min = toR(o.min); inp.max = toR(o.max); inp.step = o.log ? 0.01 : (o.step || 0.01);
    inp.value = toR(o.value);
    var set = function () {
      var v = fromR(+inp.value);
      if (o.snap) v = o.snap(v);
      out.textContent = o.fmt(v);
      inp.setAttribute('aria-valuetext', o.fmt(v));
      inp.style.setProperty('--p', ((+inp.value - inp.min) / (inp.max - inp.min) * 100) + '%');
      return v;
    };
    set();
    inp.addEventListener('input', function () { o.oninput(set()); });
    parent.appendChild(d);
    return { set: function (v) { inp.value = toR(v); set(); } };
  }
  function segmented(parent, o) {
    var d = el('div', 'ctl segmented');
    d.innerHTML = '<span class="seg-label"></span><div class="seg-group" role="group"></div>';
    d.querySelector('.seg-label').textContent = o.label;
    var g = d.querySelector('.seg-group');
    g.setAttribute('aria-label', o.label);
    o.options.forEach(function (opt) {
      var b = el('button');
      b.type = 'button'; b.textContent = opt[1];
      b.setAttribute('aria-pressed', String(opt[0] === o.value));
      b.addEventListener('click', function () {
        [].forEach.call(g.children, function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        o.oninput(opt[0]);
      });
      g.appendChild(b);
    });
    parent.appendChild(d);
  }
  function readout(fig) {
    var r = el('div', 'readout');
    r.setAttribute('aria-live', 'polite');
    fig.insertBefore(r, fig.querySelector('figcaption'));
    return r;
  }
  function hint(fig, html) {
    var p = el('p', 'fig-hint', html);
    fig.appendChild(p);
  }

  // The same figure footer app.js builds: the hint plus a collapsed "ⓘ data" panel.
  function footer(t) {
    var o = t.querySelector(':scope > figcaption'), g = t.querySelector('.fig-hint');
    if (!o && !g) return;
    var m = el('figcaption', 'figfoot');
    if (g) m.appendChild(g);
    if (o) {
      var tag = o.querySelector('.tagline');
      var E = el('details', 'figdata');
      var S = el('summary');
      var tt = tag ? tag.textContent.trim() : '';
      S.innerHTML = '<span class="i" aria-hidden="true">ⓘ</span> data' + (tag ? '<span class="t"> · ' + tt + '</span>' : '');
      S.setAttribute('aria-label', 'Data, sources and assumptions' + (tag ? ' (' + tt + ')' : ''));
      var f = el('div', 'figcap');
      while (o.firstChild) f.appendChild(o.firstChild);
      E.appendChild(S); E.appendChild(f); m.appendChild(E); o.remove();
      var openIfHash = function () {
        var i = decodeURIComponent(location.hash.slice(1));
        if (i && f.querySelector('#' + CSS.escape(i))) E.open = true;
      };
      window.addEventListener('hashchange', openIfHash); openIfHash();
    }
    t.appendChild(m);
  }

  // ---------- derived numbers (the series' arithmetic) ----------
  var WH_PER_TOKEN = DATA.whPerPrompt / DATA.tokensPerPrompt; // 0.0006 Wh
  var GROWTH_MONTH = Math.pow(DATA.googleTokensMonth.may2026 / DATA.googleTokensMonth.may2025, 1 / 12);
  // Google tokens in calendar 2025, growing smoothly through May 2025 at the year's rate
  function googleTokens2025() {
    var jan = DATA.googleTokensMonth.may2025 / Math.pow(GROWTH_MONTH, 4), s = 0;
    for (var i = 0; i < 12; i++) s += jan * Math.pow(GROWTH_MONTH, i);
    return s;
  }
  var CAPEX2026 = Object.keys(DATA.capex2026).reduce(function (a, k) { return a + DATA.capex2026[k]; }, 0);

  var FIGS = {};

  // ---------- 1. demandBridge: bottom-up tokens against the top-down estimate ----------
  FIGS.demandBridge = function (fig) {
    var st = { when: '2025', inShare: DATA.readShare, inCost: Math.pow(10, Math.round(log10(1 / DATA.readCostFraction) * 100) / 100) };
    var rows = function () {
      var blend = (1 - st.inShare) + st.inShare / st.inCost; // energy of an average token, as a share of a written token
      var gTok = st.when === '2025' ? googleTokens2025() : DATA.googleTokensMonth.may2026 * 12;
      var apiTok = DATA.openaiApiTokensMin * 60 * 24 * 365;
      var g = gTok * WH_PER_TOKEN * blend / 1e12;
      var gHi = gTok * WH_PER_TOKEN / 1e12;
      var oa = apiTok * WH_PER_TOKEN * blend / 1e12;
      var oaHi = apiTok * WH_PER_TOKEN / 1e12;
      var cg = DATA.chatgptPromptsDay * 365 * DATA.chatgptWhPerQuery / 1e12;
      var msTok = DATA.msftTokensMonth * 12;
      var ms = msTok * WH_PER_TOKEN * blend / 1e12, msHi = msTok * WH_PER_TOKEN / 1e12;
      var named = g + oa + cg + ms;
      var top = st.when === '2025' ? DATA.inference2025 : DATA.act1.mid[1];
      var topBand = st.when === '2025' ? DATA.inferenceBand : [DATA.act1.low[1] * 40 / 55, DATA.act1.high[1] * 80 / 55];
      return {
        list: [
          { name: 'Google, every surface', v: g, hi: gHi, col: C.blue, sub: fmt(gTok / 1e15, 2) + ' quadrillion tokens' },
          { name: 'OpenAI API', v: oa, hi: oaHi, col: C.teal, sub: fmt(apiTok / 1e15, 2) + ' quadrillion tokens' },
          { name: 'ChatGPT', v: cg, hi: cg, col: C.teal, sub: fmt(DATA.chatgptPromptsDay * 365 / 1e12, 2) + ' trillion prompts × 0.34 Wh' },
          { name: 'Microsoft', v: ms, hi: msHi, col: C.violet, sub: fmt(msTok / 1e15, 2) + ' quadrillion tokens' }
        ],
        named: named, namedHi: gHi + oaHi + cg + msHi, top: top, topBand: topBand, blend: blend
      };
    };
    var cv = stage(fig, {
      label: 'Bars of terawatt-hours a year: the AI inference that published token counts account for, against the series’ top-down estimate of all AI inference',
      height: function (w) { return w < 560 ? 470 : 380; },
      draw: function (ctx, w, h) {
        var R = rows(), narrow = w < 560;
        var L = narrow ? 12 : 200, Rt = w - 18, top = 40;
        var lo = 0.1, hi = 200;
        var X = function (v) { return L + (log10(clamp(v, lo, hi)) - log10(lo)) / (log10(hi) - log10(lo)) * (Rt - L); };
        text(ctx, 'TWh a year, log scale' + (st.when === '2025' ? ', 2025' : ', at the May 2026 rate'), narrow ? 12 : L, 18, { size: 11.5, weight: 600, color: C.ink3 });
        var all = R.list.concat([
          { name: 'Named chat and API, sum', v: R.named, hi: R.namedHi, col: C.ink2, sum: true },
          { name: 'All AI inference, top-down', v: R.top, band: R.topBand, col: C.red, top: true }
        ]);
        var rowH = narrow ? 58 : 46, y0 = top + 8;
        var axisY = y0 + all.length * rowH + 4;
        [0.1, 1, 10, 100].forEach(function (t) {
          line(ctx, X(t), y0 - 6, X(t), axisY, C.grid, 1);
          text(ctx, t.toLocaleString('en-GB'), X(t), axisY + 15, { size: 11, align: 'center', color: C.ink3 });
        });
        all.forEach(function (r, i) {
          var y = y0 + i * rowH + (narrow ? 18 : 0);
          var bh = 18;
          if (narrow) text(ctx, r.name, 12, y - 5, { size: 12, weight: 650 });
          else {
            text(ctx, r.name, L - 10, y + 13, { size: 12.5, weight: 650, align: 'right' });
            if (r.sub) text(ctx, r.sub, L - 10, y + 28, { size: 10.5, align: 'right', color: C.ink3 });
          }
          if (r.band) {
            rrect(ctx, X(r.band[0]), y, X(r.band[1]) - X(r.band[0]), bh, 4);
            ctx.fillStyle = alpha(r.col, 0.18); ctx.fill();
          }
          if (r.hi > r.v) {
            rrect(ctx, X(lo), y, Math.max(2, X(r.hi) - X(lo)), bh, 4);
            ctx.strokeStyle = alpha(r.col, 0.7); ctx.setLineDash([3, 3]); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
          }
          rrect(ctx, X(lo), y, Math.max(2, X(r.v) - X(lo)), bh, 4);
          ctx.fillStyle = r.top ? alpha(r.col, 0.85) : r.sum ? C.ink2 : alpha(r.col, 0.8); ctx.fill();
          var lab = '≈ ' + fmt(r.v) + (r.band ? ' (' + r.band.map(function (b) { return fmt(b); }).join('–') + ')' : '');
          var lx = Math.max(X(r.v), r.band ? X(r.band[1]) : 0, r.hi > r.v ? X(r.hi) : 0) + 6;
          var right = lx + 90 > Rt;
          text(ctx, lab, right ? X(lo) + 6 : lx, y + 13, { size: 12, weight: 700, color: right ? '#fff' : C.ink, align: 'left' });
        });
        // the gap
        var gy = y0 + 4 * rowH + (narrow ? 18 : 0) + 9 + rowH / 2;
        var gx1 = X(R.namedHi), gx2 = X(R.top);
        if (gx2 - gx1 > 24) {
          line(ctx, gx1, gy + 4, gx2, gy + 4, C.red, 1.5, [4, 3]);
          text(ctx, 'unexplained ≈ ' + fmt(R.top - R.named) + ' TWh', (gx1 + gx2) / 2, gy, { size: 11.5, weight: 700, color: C.red, align: 'center', halo: true });
        }
      }
    });
    var ctl = controls(fig);
    var r = readout(fig);
    var update = function () {
      var R = rows();
      r.innerHTML = 'Counted at the series’ rate of 0.6 mWh a token, the token counts that companies publish come to <b>' + fmt(R.namedHi) +
        ' TWh</b>' + (st.when === '2025' ? ' in 2025' : ' a year at May 2026 rates') + '. Count a token the model reads at 1/' + fmt(st.inCost) + ' the energy of one it writes, with ' + pct(st.inShare) +
        ' of tokens read, and they come to <b>' + fmt(R.named) + ' TWh</b>, against <b>' + fmt(R.top) + ' TWh</b> top-down. Published tokens explain <b>' +
        pct(R.named / R.top) + '</b> of it; the rest is recommendation and ads, images and video, providers that publish nothing, and chips held in reserve.';
      cv.draw();
    };
    segmented(ctl, { label: 'Year', value: '2025', options: [['2025', '2025'], ['2026', 'May 2026 rate']], oninput: function (v) { st.when = v; update(); } });
    slider(ctl, { label: 'Share of tokens read, not written', min: 0, max: 0.95, value: st.inShare, color: C.blue, fmt: pct, oninput: function (v) { st.inShare = v; update(); } });
    slider(ctl, { label: 'A read token costs this fraction of a written one', min: 1, max: 50, log: true, value: st.inCost, color: C.green, fmt: function (v) { return '1/' + fmt(v); }, oninput: function (v) { st.inCost = v; update(); } });
    update();
    hint(fig, 'switch to the <b>May 2026 rate</b>: Google’s token count grew sevenfold in a year. Then push the read-token share up and watch the bottom-up bars shrink.');
  };

  // ---------- 2. actsBridge: Act 1 and Act 2 on one axis ----------
  FIGS.actsBridge = function (fig) {
    var st = { lf: 0.5, path: 'mid' };
    var years = []; for (var y = 2024; y <= 2035; y++) years.push(y);
    var capGW = function (y) {
      if (y <= 2024) return DATA.epochGW[2024];
      if (y === 2025) return DATA.epochGW[2025];
      return DATA.epochGW[2025] * Math.pow(1 + DATA.act2Growth, y - 2025);
    };
    // a year's energy from end-of-year capacity: average of the year's start and end, × load × 8,760 h
    var capTWh = function (y) { return (capGW(y - 1) + capGW(y)) / 2 * st.lf * 8.76; };
    var iea = function (y) {
      var k = [2024, 2025, 2030, 2035], v = k.map(function (x) { return DATA.ieaDC[x]; });
      for (var i = 0; i < k.length - 1; i++) if (y >= k[i] && y <= k[i + 1]) {
        var t = (y - k[i]) / (k[i + 1] - k[i]);
        return Math.exp(Math.log(v[i]) * (1 - t) + Math.log(v[i + 1]) * t);
      }
    };
    var cv = stage(fig, {
      label: 'A log chart of terawatt-hours a year, 2024 to 2035: the IEA’s data-centre electricity, Act 2’s AI capacity turned into energy, and Act 1’s inference path',
      height: function (w) { return w < 560 ? 380 : 400; },
      draw: function (ctx, w, h) {
        var narrow = w < 560;
        var L = narrow ? 40 : 56, R = w - (narrow ? 14 : 150), T = 30, B = h - 34;
        var lo = 30, hi = 3000;
        var X = function (y) { return L + (y - 2024) / 11 * (R - L); };
        var Y = function (v) { return B - (log10(clamp(v, lo, hi)) - log10(lo)) / (log10(hi) - log10(lo)) * (B - T); };
        text(ctx, 'TWh a year (log scale)', L, 16, { size: 11.5, weight: 600, color: C.ink3 });
        [30, 100, 300, 1000, 3000].forEach(function (v) {
          line(ctx, L, Y(v), R, Y(v), C.grid, 1);
          text(ctx, v.toLocaleString('en-GB'), L - 6, Y(v) + 4, { size: 11, align: 'right', color: C.ink3 });
        });
        [2024, 2026, 2028, 2030, 2032, 2035].forEach(function (y) {
          if (narrow && (y === 2026 || y === 2032)) return;
          text(ctx, String(y), X(y), B + 16, { size: 11, align: 'center', color: C.ink3 });
        });
        line(ctx, L, B, R, B, C.grid2, 1);
        // IEA range in 2035
        line(ctx, X(2035), Y(DATA.ieaDC2035range[0]), X(2035), Y(DATA.ieaDC2035range[1]), alpha(C.ink3, 0.5), 6);
        var series = [
          { name: 'IEA: all data centres', col: C.ink2, f: iea, dash: [2, 3], from: 2024 },
          { name: 'Act 2: AI capacity × load', col: C.blue, f: capTWh, from: 2025 },
          { name: 'Act 1: inference, ' + st.path, col: C.red, f: function (y) { return DATA.act1[st.path][y - 2025]; }, from: 2025 }
        ];
        // Act 1 band: Low to High
        ctx.beginPath();
        for (var y = 2025; y <= 2035; y++) { var p = DATA.act1.high[y - 2025]; if (y === 2025) ctx.moveTo(X(y), Y(p)); else ctx.lineTo(X(y), Y(p)); }
        for (y = 2035; y >= 2025; y--) ctx.lineTo(X(y), Y(DATA.act1.low[y - 2025]));
        ctx.closePath(); ctx.fillStyle = alpha(C.red, 0.1); ctx.fill();
        var ends = [];
        series.forEach(function (s) {
          ctx.save(); ctx.beginPath(); ctx.strokeStyle = s.col; ctx.lineWidth = 2.5;
          if (s.dash) ctx.setLineDash(s.dash);
          for (var y = s.from; y <= 2035; y++) { if (y === s.from) ctx.moveTo(X(y), Y(s.f(y))); else ctx.lineTo(X(y), Y(s.f(y))); }
          ctx.stroke(); ctx.restore();
          ends.push({ s: s, v: s.f(2035), y: Y(s.f(2035)) });
        });
        // 2025 points
        [[DATA.ieaDC[2025], C.ink2], [capTWh(2025), C.blue], [DATA.act1.mid[0], C.red]].forEach(function (p) {
          ctx.beginPath(); ctx.arc(X(2025), Y(p[0]), 4, 0, 7); ctx.fillStyle = p[1]; ctx.fill();
        });
        // end labels, nudged apart
        ends.sort(function (a, b) { return a.y - b.y; });
        for (var i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 30) ends[i].y = ends[i - 1].y + 30;
        ends.forEach(function (e) {
          var lx = narrow ? R - 4 : R + 8, al = narrow ? 'right' : 'left';
          var ly = narrow ? e.y - 8 : e.y;
          text(ctx, fmt(e.v) + ' TWh', lx, ly + (narrow ? 0 : -2), { size: 12, weight: 700, color: e.s.col, align: al, halo: true });
          if (!narrow) text(ctx, e.s.name, lx, ly + 13, { size: 10.5, color: C.ink2, align: al });
        });
        if (narrow) {
          var ly = T + 4;
          series.forEach(function (s, k) {
            line(ctx, L + 6, ly + k * 15 - 4, L + 22, ly + k * 15 - 4, s.col, 2.5, s.dash);
            text(ctx, s.name, L + 28, ly + k * 15, { size: 10.5, color: C.ink2 });
          });
        }
      }
    });
    var ctl = controls(fig);
    var r = readout(fig);
    var update = function () {
      var a2 = capTWh(2035), a1 = DATA.act1[st.path][10];
      r.innerHTML = 'In 2025, Act 1 starts from <b>55 TWh</b> of inference; Act 2’s 31 GW of AI capacity, run at ' + pct(st.lf) + ' of its rating, is <b>' +
        fmt(capTWh(2025)) + ' TWh</b> of all AI work, training included; the IEA’s data centres used <b>485 TWh</b>. In 2035, Act 2’s grid ceiling of 316 GW is <b>' +
        fmt(a2) + ' TWh</b> at that load; Act 1’s ' + st.path + ' path reaches <b>' + fmt(a1) + ' TWh</b>, <b>' + pct(a1 / a2) + '</b> of it. ' +
        (a1 < a2 ? 'Act 1 assumes a world in which inference uses part of the power Act 2 says the grid can give AI.' : 'Act 1 now asks for more than Act 2’s grid can give.');
      cv.draw();
    };
    segmented(ctl, { label: 'Act 1 path', value: 'mid', options: [['low', 'Low'], ['mid', 'Mid'], ['high', 'High']], oninput: function (v) { st.path = v; update(); } });
    slider(ctl, { label: 'Load: average draw as a share of rated capacity', min: 0.3, max: 0.9, value: st.lf, color: C.blue, fmt: pct, oninput: function (v) { st.lf = v; update(); } });
    update();
    hint(fig, 'the two Acts measure different things: Act 1 counts inference energy, Act 2 counts capacity for all AI. Move the <b>load</b> and see how far apart they sit.');
  };

  // ---------- 3. capexChain: dollars → gigawatts → terawatt-hours ----------
  FIGS.capexChain = function (fig) {
    var st = { share: 1, perGW: DATA.usdPerGW, growth: 0, lf: 0.5 };
    var path = function () {
      var out = [], gw = DATA.epochGW[2025], capex = CAPEX2026;
      for (var y = 2026; y <= 2035; y++) {
        gw += capex * st.share / st.perGW;
        out.push({ y: y, gw: gw, capex: capex });
        capex *= 1 + st.growth;
      }
      return out;
    };
    var cv = stage(fig, {
      label: 'A chain from dollars of capital spending to gigawatts of AI data centres to terawatt-hours, and the capacity path it buys to 2035 against Act 2’s 26% a year',
      height: function (w) { return w < 560 ? 420 : 380; },
      draw: function (ctx, w, h) {
        var narrow = w < 560, P = path();
        var added = CAPEX2026 * st.share / st.perGW;
        // the chain of boxes
        var boxes = [
          ['$' + fmt(CAPEX2026) + ' bn', '2026 capex, four firms'],
          ['× ' + pct(st.share), 'buys AI data centres'],
          ['÷ $' + fmt(st.perGW) + ' bn/GW', 'all-in cost'],
          ['+' + fmt(added) + ' GW', 'in a year'],
          ['+' + fmt(added * st.lf * 8.76) + ' TWh', 'a year, at ' + pct(st.lf) + ' load']
        ];
        var bw = narrow ? (w - 24 - 8) / 2 : (w - 24 - 4 * 10) / 5, bh = 50;
        boxes.forEach(function (b, i) {
          var col = narrow ? i % 2 : i, row = narrow ? Math.floor(i / 2) : 0;
          var x = 12 + col * (bw + (narrow ? 8 : 10)), y = 10 + row * (bh + 8);
          rrect(ctx, x, y, bw, bh, 8); ctx.fillStyle = i === 4 ? alpha(C.red, 0.12) : i === 3 ? alpha(C.blue, 0.12) : '#fff'; ctx.fill();
          ctx.strokeStyle = C.grid2; ctx.lineWidth = 1; ctx.stroke();
          text(ctx, b[0], x + bw / 2, y + 22, { size: 14, weight: 700, align: 'center' });
          text(ctx, b[1], x + bw / 2, y + 39, { size: 10.5, align: 'center', color: C.ink2 });
        });
        var top = narrow ? 10 + 3 * (bh + 8) + 20 : 10 + bh + 34;
        var L = narrow ? 40 : 56, R = w - (narrow ? 14 : 120), T = top + 16, B = h - 30;
        var lo = 10, hi = 1000;
        var X = function (y) { return L + (y - 2025) / 10 * (R - L); };
        var Y = function (v) { return B - (log10(clamp(v, lo, hi)) - log10(lo)) / (log10(hi) - log10(lo)) * (B - T); };
        text(ctx, 'AI data-centre capacity, GW (log scale)', L, top, { size: 11.5, weight: 600, color: C.ink3 });
        [10, 30, 100, 300, 1000].forEach(function (v) {
          line(ctx, L, Y(v), R, Y(v), C.grid, 1);
          text(ctx, String(v), L - 6, Y(v) + 4, { size: 11, align: 'right', color: C.ink3 });
        });
        [2025, 2027, 2029, 2031, 2033, 2035].forEach(function (y) { text(ctx, String(y), X(y), B + 16, { size: 11, align: 'center', color: C.ink3 }); });
        // Act 2 path
        ctx.save(); ctx.beginPath(); ctx.strokeStyle = C.ink2; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
        for (var y = 2025; y <= 2035; y++) { var v = DATA.epochGW[2025] * Math.pow(1 + DATA.act2Growth, y - 2025); if (y === 2025) ctx.moveTo(X(y), Y(v)); else ctx.lineTo(X(y), Y(v)); }
        ctx.stroke(); ctx.restore();
        // capex path
        ctx.beginPath(); ctx.moveTo(X(2025), Y(DATA.epochGW[2025]));
        P.forEach(function (p) { ctx.lineTo(X(p.y), Y(p.gw)); });
        ctx.strokeStyle = C.blue; ctx.lineWidth = 3; ctx.stroke();
        [[2024, DATA.epochGW[2024]], [2025, DATA.epochGW[2025]]].forEach(function (p) {
          if (p[0] < 2025) return;
          ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 4, 0, 7); ctx.fillStyle = C.ink; ctx.fill();
        });
        var a2 = DATA.act2Ceiling2035, cp = P[P.length - 1].gw;
        var ya = Y(a2), yc = Y(cp);
        if (Math.abs(ya - yc) < 28) { if (ya < yc) yc = ya + 28; else ya = yc + 28; }
        var lx = narrow ? R - 2 : R + 8, al = narrow ? 'right' : 'left';
        text(ctx, fmt(a2) + ' GW', lx, ya - (narrow ? 6 : 0), { size: 12, weight: 700, color: C.ink2, align: al, halo: true });
        if (!narrow) text(ctx, 'Act 2: 26% a year', lx, ya + 13, { size: 10.5, color: C.ink2, align: al });
        text(ctx, fmt(cp) + ' GW', lx, yc - (narrow ? 6 : 0), { size: 12, weight: 700, color: C.blue, align: al, halo: true });
        if (!narrow) text(ctx, 'what the money buys', lx, yc + 13, { size: 10.5, color: C.ink2, align: al });
        text(ctx, '31 GW, end 2025 (Epoch)', X(2025) + 8, Y(DATA.epochGW[2025]) + 16, { size: 10.5, color: C.ink2, halo: true });
      }
    });
    var ctl = controls(fig);
    var r = readout(fig);
    var update = function () {
      var P = path(), first = P[0].gw / DATA.epochGW[2025] - 1, end = P[P.length - 1];
      var cagr = Math.pow(end.gw / DATA.epochGW[2025], 1 / 10) - 1;
      r.innerHTML = 'The 2026 spending adds <b>' + fmt(P[0].gw - DATA.epochGW[2025]) + ' GW</b>, <b>' + pct(first) + '</b> growth in a year against Act 2’s 26%. ' +
        (st.growth === 0 ? 'Held flat in dollars, it adds the same each year, so growth falls: ' : 'Growing ' + pct(st.growth) + ' a year, it reaches ') +
        '<b>' + fmt(end.gw) + ' GW</b> by 2035 (' + pct(cagr) + ' a year on average), ' + (end.gw >= DATA.act2Ceiling2035 ? 'past' : 'short of') + ' Act 2’s 316 GW. By 2035 the four firms would be spending <b>$' +
        fmt(end.capex / 1000, 2) + ' trillion</b> a year.';
      cv.draw();
    };
    slider(ctl, { label: 'Share of capex that buys AI data centres', min: 0.3, max: 1, value: st.share, color: C.blue, fmt: pct, oninput: function (v) { st.share = v; update(); } });
    slider(ctl, { label: 'All-in cost per gigawatt', min: 25, max: 60, step: 1, value: st.perGW, color: C.violet, fmt: function (v) { return '$' + Math.round(v) + ' bn'; }, oninput: function (v) { st.perGW = v; update(); } });
    slider(ctl, { label: 'Capex growth a year after 2026', min: 0, max: 0.4, value: st.growth, color: C.red, fmt: pct, oninput: function (v) { st.growth = v; update(); } });
    update();
    hint(fig, 'hold spending flat, then find the <b>capex growth</b> that keeps up with Act 2’s line.');
  };

  // ---------- 4. meterSteps: the verdict meter built up one lever at a time ----------
  // The same one-line model as the full meter (verdict.html), with its Mid defaults:
  // energy(t) = 55 TWh × (U × T)^s(t) ÷ eff(t), capped by power built × 8.76 TWh per GW.
  var M = { y0: 2025, y1: 2050, U: 30, T: 45, g0: 0.35, h: 12, cap: 400 };
  var sOf = function (y) { var o = (y - M.y0) / (M.y1 - M.y0); return (1 - Math.exp(-2 * o)) / (1 - Math.exp(-2)); };
  function meterPath(p, useEff, useCap) {
    var out = [], eff = 1, base = 55 / 8.76;
    for (var y = M.y0; y <= M.y1; y++) {
      var s = sOf(y), demand = Math.exp(Math.log(p.U * p.T) * s);
      var cap = base * Math.pow(p.cap / base, s) * 8.76;
      var free = 55 * demand / (useEff ? eff : 1);
      out.push({ y: y, v: useCap ? Math.min(free, cap) : free, capped: useCap && free > cap });
      eff *= 1 + p.g0 * Math.pow(2, -(y - M.y0) / p.h);
    }
    return out;
  }
  var BARS = [{ id: 'R1', y: 2035, v: 3800 }, { id: 'R2', y: 2050, v: 6000 }, { id: 'R3', y: 2050, v: 17200 }];
  FIGS.meterSteps = function (fig) {
    var st = { step: 1, T: M.T, g0: M.g0, cap: M.cap };
    var params = function () { return { U: M.U, T: st.T, g0: st.g0, h: M.h, cap: st.cap }; };
    var cv = stage(fig, {
      label: 'A log chart of AI inference electricity from 2025 to 2050, built up in three steps: demand alone, then efficiency, then the power built, against the three bars',
      height: function (w) { return w < 560 ? 360 : 380; },
      draw: function (ctx, w, h) {
        var narrow = w < 560;
        var L = narrow ? 46 : 60, R = w - (narrow ? 16 : 120), T = 30, B = h - 32;
        var lo = 10, hi = 1e6;
        var X = function (y) { return L + (y - 2025) / 25 * (R - L); };
        var Y = function (v) { return B - (log10(clamp(v, lo, hi)) - log10(lo)) / (log10(hi) - log10(lo)) * (B - T); };
        text(ctx, 'Inference electricity, TWh a year (log scale)', L, 16, { size: 11.5, weight: 600, color: C.ink3 });
        [10, 100, 1e3, 1e4, 1e5, 1e6].forEach(function (v) {
          line(ctx, L, Y(v), R, Y(v), C.grid, 1);
          text(ctx, v.toLocaleString('en-GB'), L - 6, Y(v) + 4, { size: 11, align: 'right', color: C.ink3 });
        });
        [2025, 2030, 2035, 2040, 2045, 2050].forEach(function (y) { text(ctx, String(y), X(y), B + 16, { size: 11, align: 'center', color: C.ink3 }); });
        var p = params();
        var steps = [meterPath(p, false, false), meterPath(p, true, false), meterPath(p, true, true)];
        var cols = [C.red, C.green, C.blue];
        for (var k = 0; k < st.step; k++) {
          var path = steps[k], last = k === st.step - 1;
          ctx.save(); ctx.beginPath(); ctx.strokeStyle = last ? cols[k] : alpha(cols[k], 0.35); ctx.lineWidth = last ? 3 : 2;
          if (!last) ctx.setLineDash([5, 4]);
          path.forEach(function (q, i) { if (i) ctx.lineTo(X(q.y), Y(q.v)); else ctx.moveTo(X(q.y), Y(q.v)); });
          ctx.stroke(); ctx.restore();
          var end = path[path.length - 1];
          if (last) text(ctx, fmt(end.v) + ' TWh', narrow ? R : R + 8, Y(end.v) - (narrow ? 8 : -4), { size: 12, weight: 700, color: cols[k], align: narrow ? 'right' : 'left', halo: true });
        }
        if (st.step === 3) {
          ctx.save(); ctx.beginPath(); ctx.strokeStyle = alpha(C.blue, 0.6); ctx.setLineDash([2, 3]);
          for (var y = 2025; y <= 2050; y++) { var c = 55 / 8.76 * Math.pow(st.cap / (55 / 8.76), sOf(y)) * 8.76; if (y === 2025) ctx.moveTo(X(y), Y(c)); else ctx.lineTo(X(y), Y(c)); }
          ctx.stroke(); ctx.restore();
        }
        BARS.forEach(function (b) {
          line(ctx, X(b.y) - 10, Y(b.v), X(b.y) + 4, Y(b.v), C.ink, 3);
          text(ctx, b.id + ' ' + b.v.toLocaleString('en-GB'), X(b.y) - 14, Y(b.v) + 4, { size: 11, weight: 700, align: 'right', halo: true });
        });
      }
    });
    var ctl = controls(fig);
    var r = readout(fig);
    var sT, sG, sC;
    var update = function () {
      var p = params(), path = meterPath(p, st.step >= 2, st.step >= 3);
      var v35 = path[10].v, v50 = path[25].v;
      var msg = [
        'Demand alone: with ' + M.U + '× the people and tasks and <b>' + fmt(st.T) + '×</b> the tokens per task by 2050, and every chip as efficient as today’s, inference reaches <b>' + fmt(v35) + ' TWh</b> in 2035 and <b>' + fmt(v50) + ' TWh</b> in 2050.',
        'Now let chips improve: a gain of <b>' + pct(st.g0) + '</b> a year at first, halving every 12 years. The same demand needs <b>' + fmt(v35) + ' TWh</b> in 2035 and <b>' + fmt(v50) + ' TWh</b> in 2050.',
        'Last, the cap: the world builds at most <b>' + fmt(st.cap) + ' GW</b> for inference by 2050 (dotted). The path is <b>' + fmt(v35) + ' TWh</b> in 2035 and <b>' + fmt(v50) + ' TWh</b> in 2050' + (path[25].capped ? ', held down by the cap.' : ', under the cap.')
      ][st.step - 1];
      var beat = BARS.filter(function (b) { return path[b.y - 2025].v >= b.v; }).map(function (b) { return b.id; });
      r.innerHTML = msg + ' ' + (beat.length ? 'It clears <b>' + beat.join(', ') + '</b>.' : 'It clears none of the bars.');
      [sT, sG, sC].forEach(function (s, i) { s.el.style.display = i < st.step ? '' : 'none'; });
      cv.draw();
    };
    segmented(ctl, { label: 'Step', value: 1, options: [[1, '1 · demand'], [2, '2 · efficiency'], [3, '3 · the cap']], oninput: function (v) { st.step = v; update(); } });
    var mk = function (o) { var before = ctl.children.length; var s = slider(ctl, o); s.el = ctl.children[before]; return s; };
    sT = mk({ label: 'Tokens per task by 2050, × today', min: 1, max: 3000, log: true, value: st.T, color: C.red, fmt: function (v) { return fmt(v) + '×'; }, oninput: function (v) { st.T = v; update(); } });
    sG = mk({ label: 'Chip efficiency gain, first year', min: 0, max: 0.6, value: st.g0, color: C.green, fmt: pct, oninput: function (v) { st.g0 = v; update(); } });
    sC = mk({ label: 'Power built for inference by 2050', min: 10, max: 5000, log: true, value: st.cap, color: C.blue, fmt: function (v) { return fmt(v) + ' GW'; }, oninput: function (v) { st.cap = v; update(); } });
    update();
    hint(fig, 'step 1 alone clears every bar. Add <b>step 2</b>, then <b>step 3</b>, and watch most of the climb disappear; then find the tokens per task that win it back.');
  };

  // ---------- 5. usBalance: US demand growth against new supply, in energy and in firm capacity ----------
  var US = {
    // LBNL: 176 TWh (2023); 649 TWh in 2030, bounds 521–843
    dc2023: 176, dc2030: 649, dc2030lo: 521, dc2030hi: 843,
    // EIA STEO Sep 2026: 4,135 TWh (2026), 4,211 TWh (2027)
    sales2026: 4135, sales2027: 4211,
    // EIA: planned 2026 additions, GW
    add: { solar: 43.4, batteries: 24, wind: 11.8, gas: 6.3 },
    // EIA Electric Power Monthly Table 6.07: 2025 capacity factors
    cf: { solar: 0.240, wind: 0.338, gas: 0.587 },
    // Grid Strategies (Nov 2025): five-year peak growth 166 GW, of it ~90 GW data centres
    peak5: 166, dcPeak5: 90
  };
  FIGS.usBalance = function (fig) {
    var st = { view: 'energy', built: 1 };
    var rows = function () {
      var b = st.built;
      if (st.view === 'energy') {
        var dc = (US.dc2030 - US.dc2023) / 7, dcLo = (US.dc2030lo - US.dc2023) / 7, dcHi = (US.dc2030hi - US.dc2023) / 7;
        var gen = ['solar', 'wind', 'gas'].map(function (k) { return { k: k, v: US.add[k] * US.cf[k] * 8.76 * b }; });
        return {
          unit: 'TWh a year', max: 200, ticks: [0, 50, 100, 150, 200],
          list: [
            { name: 'Data centres, a year’s growth', sub: 'LBNL, 2023 to 2030', parts: [{ v: dc, col: C.red }], band: [dcLo, dcHi] },
            { name: 'All US sales, a year’s growth', sub: 'EIA, 2026 to 2027', parts: [{ v: US.sales2027 - US.sales2026, col: C.ink2 }] },
            { name: 'New generation, one year', sub: 'EIA, planned for 2026', parts: gen.map(function (g) { return { v: g.v, col: g.k === 'solar' ? C.yellow : g.k === 'wind' ? C.teal : C.orange, label: g.k }; }) }
          ]
        };
      }
      return {
        unit: 'GW a year', max: 50, ticks: [0, 10, 20, 30, 40, 50],
        list: [
          { name: 'Data centres, peak growth', sub: 'Grid Strategies, five-year forecast ÷ 5', parts: [{ v: US.dcPeak5 / 5, col: C.red }] },
          { name: 'All US peak growth', sub: 'Grid Strategies, five-year forecast ÷ 5', parts: [{ v: US.peak5 / 5, col: C.ink2 }] },
          { name: 'Firm at the peak, one year', sub: 'EIA, planned for 2026', parts: [
            { v: US.add.gas * b, col: C.orange, label: 'gas' },
            { v: US.add.batteries * b, col: C.green, label: 'batteries, for a few hours', hatch: true }
          ] },
          { name: 'Solar and wind, nameplate', sub: 'little of it at an evening peak', parts: [
            { v: US.add.solar * b, col: C.yellow, label: 'solar', ghost: true },
            { v: US.add.wind * b, col: C.teal, label: 'wind', ghost: true }
          ] }
        ]
      };
    };
    var cv = stage(fig, {
      label: 'Bars comparing the yearly growth of US data-centre and total electricity demand with the new supply planned for 2026, in energy or in firm capacity',
      height: function (w) { return w < 560 ? 400 : 300; },
      draw: function (ctx, w, h) {
        var R = rows(), narrow = w < 560;
        var L = narrow ? 12 : 220, Rt = w - 20, y0 = 40;
        var X = function (v) { return L + clamp(v, 0, R.max) / R.max * (Rt - L); };
        text(ctx, R.unit, narrow ? 12 : L, 18, { size: 11.5, weight: 600, color: C.ink3 });
        var rowH = narrow ? 70 : 54, axisY = y0 + R.list.length * rowH;
        R.ticks.forEach(function (t) {
          line(ctx, X(t), y0 - 6, X(t), axisY, C.grid, 1);
          text(ctx, String(t), X(t), axisY + 15, { size: 11, align: 'center', color: C.ink3 });
        });
        R.list.forEach(function (r, i) {
          var y = y0 + i * rowH + (narrow ? 18 : 0), bh = 20;
          if (narrow) {
            text(ctx, r.name, 12, y - 5, { size: 12, weight: 650 });
          } else {
            text(ctx, r.name, L - 10, y + 13, { size: 12.5, weight: 650, align: 'right' });
            text(ctx, r.sub, L - 10, y + 28, { size: 10.5, align: 'right', color: C.ink3 });
          }
          if (r.band) { rrect(ctx, X(r.band[0]), y + 4, X(r.band[1]) - X(r.band[0]), bh - 8, 3); ctx.fillStyle = alpha(C.red, 0.18); ctx.fill(); }
          var x = X(0), tot = 0;
          r.parts.forEach(function (p) {
            var x2 = X(tot + p.v);
            rrect(ctx, x, y, Math.max(1, x2 - x - 1), bh, 3);
            if (p.ghost) { ctx.strokeStyle = p.col; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]); }
            else if (p.hatch) {
              ctx.fillStyle = alpha(p.col, 0.25); ctx.fill();
              ctx.save(); ctx.clip(); ctx.strokeStyle = alpha(p.col, 0.8); ctx.lineWidth = 1.5;
              for (var k = x - bh; k < x2; k += 7) { ctx.beginPath(); ctx.moveTo(k, y + bh); ctx.lineTo(k + bh, y); ctx.stroke(); }
              ctx.restore();
            } else { ctx.fillStyle = p.col; ctx.fill(); }
            if (p.label && x2 - x > 46) text(ctx, p.label, x + 5, y + 14, { size: 10.5, weight: 650, color: p.ghost || p.hatch ? C.ink : '#fff', halo: p.hatch, haloColor: '#fff' });
            x = x2; tot += p.v;
          });
          text(ctx, '≈ ' + fmt(tot) + (r.band ? ' (' + fmt(r.band[0]) + '–' + fmt(r.band[1]) + ')' : ''), Math.max(x, r.band ? X(r.band[1]) : 0) + 6, y + 14, { size: 12, weight: 700 });
        });
      }
    });
    var ctl = controls(fig);
    var r = readout(fig);
    var update = function () {
      var R = rows();
      if (st.view === 'energy') {
        var gen = R.list[2].parts.reduce(function (a, p) { return a + p.v; }, 0), dc = R.list[0].parts[0].v;
        r.innerHTML = 'In energy, one year of the new plants planned for 2026 would make about <b>' + fmt(gen) + ' TWh</b> a year, against data centres’ growth of about <b>' + fmt(dc) +
          ' TWh</b> a year and the whole country’s of <b>' + fmt(US.sales2027 - US.sales2026) + ' TWh</b>. ' + (gen > dc ? 'Kilowatt-hours are not the shortage.' : 'At this build rate even the kilowatt-hours fall short.');
      } else {
        var firm = US.add.gas * st.built, bat = US.add.batteries * st.built;
        r.innerHTML = 'At the peak it is different. Data centres’ forecast peak grows about <b>' + fmt(US.dcPeak5 / 5) + ' GW</b> a year; the plants planned for 2026 add <b>' + fmt(firm) +
          ' GW</b> of gas that can run at any hour, and <b>' + fmt(bat) + ' GW</b> of batteries that can cover a peak for a few hours. The solar and wind add energy, but little power at a winter evening peak.';
      }
      cv.draw();
    };
    segmented(ctl, { label: 'Count', value: 'energy', options: [['energy', 'Energy'], ['firm', 'Power at the peak']], oninput: function (v) { st.view = v; update(); } });
    slider(ctl, { label: 'Share of the planned plants actually built', min: 0.4, max: 1, value: 1, color: C.orange, fmt: pct, oninput: function (v) { st.built = v; update(); } });
    update();
    hint(fig, 'switch from <b>energy</b> to <b>power at the peak</b>, then lower the share of plants built.');
  };

  // ---------- 6. rackLadder: from a 700 W chip to a gigawatt, in NVL72 racks ----------
  var RUNGS = [
    { name: 'H100 chip', kw: 0.7, gpus: 1, src: 'NVIDIA rating' },
    { name: 'DGX H100 server', kw: 10.2, gpus: 8, src: 'NVIDIA maximum' },
    { name: 'GB200 NVL72 rack', kw: 120, hi: 132, gpus: 72, src: 'NVIDIA ≈120; HPE 132 nominal' },
    { name: 'GB300 NVL72 rack', kw: 132, hi: 155, gpus: 72, src: 'HPE: 132 nominal, ≈155 peak' },
    { name: 'Vera Rubin NVL72 rack', kw: 190, hi: 230, gpus: 72, src: 'reported, not confirmed', est: true }
  ];
  FIGS.rackLadder = function (fig) {
    var st = { pick: 3, pue: 1.14 };
    var cv = stage(fig, {
      label: 'A logarithmic ladder of power: one H100 chip, a DGX server and three generations of NVL72 racks, and how many racks fill a one-gigawatt site',
      height: function (w) { return w < 560 ? 380 : 300; },
      draw: function (ctx, w, h) {
        var narrow = w < 560, L = narrow ? 12 : 190, Rt = w - (narrow ? 110 : 150), y0 = 36;
        var lo = 0.3, hi = 1000;
        var X = function (v) { return L + (log10(v) - log10(lo)) / (log10(hi) - log10(lo)) * (Rt - L); };
        text(ctx, 'kilowatts, log scale', narrow ? 12 : L, 16, { size: 11.5, weight: 600, color: C.ink3 });
        var rowH = narrow ? 58 : 46, axisY = y0 + RUNGS.length * rowH;
        [1, 10, 100, 1000].forEach(function (t) {
          line(ctx, X(t), y0 - 6, X(t), axisY, C.grid, 1);
          text(ctx, t.toLocaleString('en-GB'), X(t), axisY + 15, { size: 11, align: 'center', color: C.ink3 });
        });
        RUNGS.forEach(function (r, i) {
          var y = y0 + i * rowH + (narrow ? 16 : 0), bh = 18, on = i === st.pick;
          var col = i < 2 ? C.orange : C.blue;
          if (narrow) text(ctx, r.name, 12, y - 4, { size: 12, weight: 650, color: on ? C.ink : C.ink2 });
          else {
            text(ctx, r.name, L - 10, y + 12, { size: 12.5, weight: 650, align: 'right', color: on ? C.ink : C.ink2 });
            text(ctx, r.src, L - 10, y + 27, { size: 10.5, align: 'right', color: C.ink3 });
          }
          rrect(ctx, X(lo), y, X(r.kw) - X(lo), bh, 4);
          if (r.est) { ctx.strokeStyle = col; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = alpha(col, 0.15); ctx.fill(); }
          else { ctx.fillStyle = alpha(col, on ? 0.95 : 0.6); ctx.fill(); }
          if (r.hi) { rrect(ctx, X(r.kw), y + 5, X(r.hi) - X(r.kw), bh - 10, 3); ctx.fillStyle = alpha(col, 0.3); ctx.fill(); }
          var lab = (r.kw < 1 ? '700 W' : fmt(r.kw, 3) + (r.hi ? '–' + fmt(r.hi, 3) : '') + ' kW') + (r.gpus > 1 && !narrow ? ' · ' + r.gpus + ' GPUs' : '');
          text(ctx, lab, X(r.hi || r.kw) + 6, y + 13, { size: 12, weight: 700, color: on ? C.ink : C.ink2 });
          if (on) { ctx.beginPath(); ctx.arc(X(lo) - 2, y + bh / 2, 3, 0, 7); ctx.fillStyle = C.ink; ctx.fill(); }
        });
      }
    });
    var ctl = controls(fig);
    var r = readout(fig);
    var update = function () {
      var g = RUNGS[st.pick], itKW = 1e6 / st.pue, units = itKW / g.kw;
      r.innerHTML = 'A one-gigawatt site with a PUE of ' + st.pue.toFixed(2) + ' has about ' + fmt(itKW / 1000) + ' MW for its computers: <b>' + fmt(units, 3) + '</b> ' +
        (g.gpus === 1 ? 'H100 chips on their own' : g.gpus === 8 ? 'DGX H100 servers' : g.name.replace(' rack', '') + ' racks') + (g.gpus > 1 ? ', <b>' + fmt(units * g.gpus, 3) + '</b> GPUs' : '') +
        '. Each GPU’s share of the site is <b>' + fmt(g.kw / g.gpus * st.pue, 2) + ' kW</b>' + (g.est ? ' (on a reported rack power)' : '') + '.';
      cv.draw();
    };
    segmented(ctl, { label: 'Fill a gigawatt with', value: 3, options: [[1, 'DGX H100'], [2, 'GB200'], [3, 'GB300'], [4, 'Vera Rubin']], oninput: function (v) { st.pick = v; update(); } });
    slider(ctl, { label: 'PUE of the site', min: 1.05, max: 1.6, value: st.pue, color: C.orange, fmt: function (v) { return v.toFixed(2); }, oninput: function (v) { st.pue = v; update(); } });
    update();
    hint(fig, 'step from <b>DGX H100</b> to <b>Vera Rubin</b>: a gigawatt holds about half as many GPUs, because each one draws more than twice the power.');
  };

  // ---------- boot ----------
  function boot() {
    document.querySelectorAll('[data-xfig]').forEach(function (f) {
      if (f.__made) return; f.__made = true;
      var make = FIGS[f.dataset.xfig];
      if (!make) { console.warn('unknown figure', f.dataset.xfig); return; }
      try { make(f); } catch (e) { console.error('figure failed', f.dataset.xfig, e); f.classList.add('fig-error'); }
      footer(f);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.__thesisFigs = { FIGS: FIGS, DATA: DATA };
})();
