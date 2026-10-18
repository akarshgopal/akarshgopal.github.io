/* akarshgopal.github.io · site chrome: HUD telemetry, reveals, flight-log progress,
   command palette (Ctrl/Cmd-K), optional interface sound. No dependencies. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function reduced() { return mqReduce.matches || doc.dataset.motion === 'reduce'; }
  window.AG = window.AG || {};
  window.AG.reduced = reduced;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  /* ---- boot sequence: dismiss on time, key, or click ---- */
  function endBoot() { if (doc.classList.contains('booting')) { doc.classList.add('boot-done'); setTimeout(function () { doc.classList.remove('booting', 'boot-done'); }, 400); } }
  if (doc.classList.contains('booting')) {
    setTimeout(endBoot, 1850);
    ['keydown', 'pointerdown', 'wheel', 'touchstart'].forEach(function (e) { window.addEventListener(e, endBoot, { once: true, passive: true }); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (isMac) $$('.mod').forEach(function (m) { m.textContent = '⌘'; });

    /* ---- HUD telemetry ---- */
    var t = {}; $$('[data-t]').forEach(function (el) { t[el.dataset.t] = el; });
    var t0 = performance.now();
    var clockFmt;
    try { clockFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short' }); } catch (e) { clockFmt = null; }
    function pad(n, w) { n = String(Math.max(0, Math.floor(n))); while (n.length < w) n = '0' + n; return n; }
    function tickClock() {
      if (t.clock && clockFmt) t.clock.textContent = clockFmt.format(new Date());
      if (t.met) { var s = (performance.now() - t0) / 1000; t.met.textContent = pad(s / 3600, 2) + ':' + pad(s / 60 % 60, 2) + ':' + pad(s % 60, 2); }
    }
    tickClock(); setInterval(tickClock, 1000);

    var scrollP = 0, heroEl = $('.hero');
    function onScroll() {
      var max = document.documentElement.scrollHeight - innerHeight;
      scrollP = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      if (t.scroll) t.scroll.textContent = pad(scrollP * 100, 3) + '%';
      if (t.rail) t.rail.style.transform = 'scaleY(' + scrollP.toFixed(4) + ')';
      if (heroEl) heroEl.style.setProperty('--hp', Math.min(1, scrollY / (heroEl.offsetHeight || 1)).toFixed(4));
      updateTimeline();
    }
    var scrollQueued = false;
    function queueScroll() { if (scrollQueued) return; scrollQueued = true; requestAnimationFrame(function () { scrollQueued = false; onScroll(); }); }
    addEventListener('scroll', queueScroll, { passive: true });
    addEventListener('resize', queueScroll, { passive: true });

    addEventListener('pointermove', function (e) {
      if (t.xy && e.pointerType === 'mouse') t.xy.textContent = 'X' + pad(e.clientX, 4) + ' Y' + pad(e.clientY, 4);
    }, { passive: true });

    // FPS: measured from real animation frames; stops when the tab is hidden.
    var frames = 0, last = performance.now();
    function fpsLoop(now) {
      frames++;
      if (now - last >= 500) { if (t.fps) t.fps.textContent = pad(frames * 1000 / (now - last), 2); frames = 0; last = now; }
      requestAnimationFrame(fpsLoop);
    }
    // Only sample when the readout is actually displayed (hidden on small screens).
    if (t.fps && t.fps.getClientRects().length) requestAnimationFrame(fpsLoop);

    /* ---- tilt cards (fine pointers only) ---- */
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      $$('.tilt').forEach(function (el) {
        el.addEventListener('pointermove', function (e) {
          if (reduced()) return;
          var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          el.classList.add('tilt-on');
          el.style.transform = 'perspective(900px) rotateX(' + ((0.5 - y) * 6).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 8).toFixed(2) + 'deg) translateY(-3px)';
          el.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
        });
        el.addEventListener('pointerleave', function () { el.classList.remove('tilt-on'); el.style.transform = ''; });
      });
    }

    /* ---- reveal on scroll ---- */
    var reveals = $$('.reveal, .schem');
    if ('IntersectionObserver' in window && !reduced()) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (el) { io.observe(el); });
    } else reveals.forEach(function (el) { el.classList.add('in'); });

    /* ---- kicker text decode ---- */
    var glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#<>-_';
    $$('[data-scramble]').forEach(function (el) {
      var target = el.textContent.trim();
      var visible = el.cloneNode(true); visible.removeAttribute('data-scramble');
      el.innerHTML = '';
      var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = target;
      var vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true'); vis.style.display = 'contents';
      vis.innerHTML = visible.innerHTML;
      el.appendChild(sr); el.appendChild(vis);
      if (reduced() || !('IntersectionObserver' in window)) return;
      var nodes = [];
      (function walk(n) { n.childNodes.forEach(function (c) { if (c.nodeType === 3 && c.textContent.trim()) nodes.push({ n: c, s: c.textContent }); else if (c.nodeType === 1) walk(c); }); })(vis);
      var o = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return; o.disconnect();
        var start = performance.now(), dur = 700;
        (function step(now) {
          var k = Math.min(1, (now - start) / dur);
          nodes.forEach(function (x) {
            var keep = Math.floor(x.s.length * k), out = x.s.slice(0, keep);
            for (var i = keep; i < x.s.length; i++) out += x.s[i] === ' ' ? ' ' : glyphs[(Math.random() * glyphs.length) | 0];
            x.n.textContent = out;
          });
          if (k < 1) requestAnimationFrame(step);
        })(start);
      });
      o.observe(el);
    });

    /* ---- flight-log progress ---- */
    var tl = $('[data-progress]'), rail = tl && $('.tl-rail', tl), items = tl ? $$('.tl-item', tl) : [];
    function updateTimeline() {
      if (!tl) return;
      var r = tl.getBoundingClientRect(), mid = innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      rail.style.setProperty('--p', p.toFixed(4));
      items.forEach(function (it) { var b = it.getBoundingClientRect(); it.classList.toggle('lit', b.top + 20 < mid); });
    }
    requestAnimationFrame(onScroll);

    /* ---- sound (off by default; tiny synthesized blips, no files) ---- */
    var soundOn = false, ctx = null;
    try { soundOn = localStorage.getItem('sound') === 'on'; } catch (e) {}
    var sBtn = $('.sound-toggle');
    function setSound(on) {
      soundOn = on; try { localStorage.setItem('sound', on ? 'on' : 'off'); } catch (e) {}
      if (sBtn) { sBtn.setAttribute('aria-pressed', String(on)); sBtn.title = 'Interface sound (' + (on ? 'on' : 'off') + ')'; }
      if (on) blip(660, 0.08);
    }
    function blip(freq, dur, vol) {
      if (!soundOn) return;
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        var o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime;
        o.type = 'sine'; o.frequency.setValueAtTime(freq, n); o.frequency.exponentialRampToValueAtTime(freq * 1.5, n + dur);
        g.gain.setValueAtTime(0.0001, n); g.gain.exponentialRampToValueAtTime(vol || 0.035, n + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, n + dur);
        o.connect(g).connect(ctx.destination); o.start(n); o.stop(n + dur + 0.02);
      } catch (e) {}
    }
    if (sBtn) { sBtn.setAttribute('aria-pressed', String(soundOn)); sBtn.title = 'Interface sound (' + (soundOn ? 'on' : 'off') + ')'; sBtn.addEventListener('click', function () { setSound(!soundOn); }); }
    var lastHover = null;
    document.addEventListener('pointerover', function (e) {
      var el = e.target.closest && e.target.closest('[data-sfx]');
      if (el && el !== lastHover && e.pointerType === 'mouse') { lastHover = el; blip(1320, 0.03, 0.015); }
      if (!el) lastHover = null;
    });
    document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-sfx]')) blip(880, 0.06); });
    window.AG.blip = blip;

    /* ---- command palette ---- */
    var dlg = $('#cmdk'), input = $('#cmdk-input'), list = $('#cmdk-list');
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var items0 = [
      ['Pages', 'Home', '/', 'mission control'], ['Pages', 'Projects', '/projects.html', 'mission files'],
      ['Pages', 'Writing', '/essays.html', 'transmissions'], ['Pages', 'Bookshelf', '/bookshelf.html', 'library'],
      ['Home', 'Briefing', '/#briefing', 'about me'], ['Home', 'Flight log', '/#flight-log', 'experience timeline'],
      ['Home', 'Comms', '/#comms', 'contact'],
      ['Projects', 'BlueHornet', '/projects.html#bluehornet', 'GPS darts · video'], ['Projects', 'PDF Diff', '/projects.html#pdfdiff', 'pdfdiff.app'],
      ['Projects', 'TreeChat', '/projects.html#treechat', 'treechat.cc'], ['Projects', 'Molecular Foundry', '/projects.html#ultimat-sim', 'ultimat-sim'],
      ['Projects', '1BRC', '/projects.html#1brc', 'C · Rust'], ['Projects', 'A3T · UAS Challenge 2020', '/projects.html#a3t', 'drone team'],
      ['Projects', 'Bachelor thesis', '/projects.html#bachelor-thesis', 'tilt-multirotor MPC'], ['Projects', 'ACKTR & PPO paper', '/projects.html#acktr-ppo', 'transfer learning'],
      ['Projects', 'Vision X', '/projects.html#project-x', 'electric motorcycle'],
      ['Writing', 'How Electricity Works', '/blog/electricity/', 'interactive series'],
      ['Links', 'GitHub', 'https://github.com/akarshgopal', 'github.com/akarshgopal'], ['Links', 'LinkedIn', 'https://www.linkedin.com/in/akarsh-gopal-b9a8b917b/', 'linkedin'],
      ['Links', 'X / Twitter', 'https://x.com/gopal_akarsh', '@gopal_akarsh'], ['Links', 'Email', 'mailto:akarsh98@gmail.com', 'akarsh98@gmail.com'],
      ['Actions', 'Toggle interface sound', 'act:sound', 'off by default'], ['Actions', 'Toggle reduced motion', 'act:motion', 'calmer, no 3D animation'],
      ['Actions', 'Copy email address', 'act:copy', 'akarsh98@gmail.com']
    ];
    var shown = [], sel = 0;
    function render() {
      var q = input.value.trim().toLowerCase();
      shown = items0.filter(function (it) { return !q || (it[1] + ' ' + it[3] + ' ' + it[0]).toLowerCase().indexOf(q) !== -1; });
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      list.innerHTML = '';
      if (!shown.length) { var li = document.createElement('li'); li.className = 'cmdk-empty'; li.setAttribute('role', 'presentation'); li.textContent = 'No signal for “' + input.value + '”'; list.appendChild(li); input.removeAttribute('aria-activedescendant'); return; }
      var group = null;
      shown.forEach(function (it, i) {
        if (it[0] !== group) { group = it[0]; var g = document.createElement('li'); g.className = 'cmdk-group'; g.setAttribute('role', 'presentation'); g.textContent = group; list.appendChild(g); }
        var o = document.createElement('li'); o.className = 'cmdk-opt'; o.id = 'cmdk-o' + i; o.setAttribute('role', 'option');
        o.setAttribute('aria-selected', String(i === sel));
        o.innerHTML = '<span class="o-t"></span><span class="o-h"></span>';
        o.firstChild.textContent = it[1]; o.lastChild.textContent = it[3];
        o.addEventListener('mousemove', function () { if (sel !== i) { sel = i; mark(); } });
        o.addEventListener('click', function () { run(it); });
        list.appendChild(o);
      });
      mark();
    }
    function mark() {
      $$('.cmdk-opt', list).forEach(function (o, i) { o.setAttribute('aria-selected', String(i === sel)); });
      var cur = $('#cmdk-o' + sel); if (cur) { input.setAttribute('aria-activedescendant', cur.id); cur.scrollIntoView({ block: 'nearest' }); }
    }
    function run(it) {
      var h = it[2];
      if (h === 'act:sound') { setSound(!soundOn); close(); return; }
      if (h === 'act:motion') {
        var on = doc.dataset.motion !== 'reduce';
        if (on) doc.dataset.motion = 'reduce'; else delete doc.dataset.motion;
        try { localStorage.setItem('motion', on ? 'reduce' : 'auto'); } catch (e) {}
        document.dispatchEvent(new CustomEvent('ag:motion')); close(); return;
      }
      if (h === 'act:copy') { if (navigator.clipboard) navigator.clipboard.writeText('akarsh98@gmail.com').catch(function () {}); close(); return; }
      close(); blip(990, 0.07);
      if (/^https?:/.test(h)) window.open(h, '_blank', 'noopener'); else location.href = h;
    }
    var opener = null;
    function open() { if (dlg.open) return; opener = document.activeElement; input.value = ''; sel = 0; render(); dlg.showModal(); input.focus(); blip(520, 0.09); }
    function close() { if (dlg.open) dlg.close(); }
    dlg.addEventListener('close', function () { if (opener && opener.focus) opener.focus(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
    input.addEventListener('input', function () { sel = 0; render(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (shown.length) { sel = (sel + 1) % shown.length; mark(); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (shown.length) { sel = (sel - 1 + shown.length) % shown.length; mark(); } }
      else if (e.key === 'Enter') { e.preventDefault(); if (shown[sel]) run(shown[sel]); }
    });
    $$('.cmdk-open').forEach(function (b) { b.addEventListener('click', open); });
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); dlg.open ? close() : open(); }
      else if (e.key === '/' && !dlg.open && !/input|textarea|select/i.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); open(); }
    });
  });
})();
