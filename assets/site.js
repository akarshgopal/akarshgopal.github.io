// akarshgopal.github.io: theme toggle, header hairline, gentle reveals, project hover previews.
// No dependencies. Everything here is optional polish; the site works without it.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.addEventListener('DOMContentLoaded', function () {
    /* theme: follows the OS until you choose; the choice is remembered */
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var btn = document.querySelector('.theme-toggle');
    function current() { return root.dataset.theme || (mq.matches ? 'dark' : 'light'); }
    function sync() { if (!btn) return; var l = current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'; btn.setAttribute('aria-label', l); btn.title = l; }
    if (btn) {
      sync();
      btn.addEventListener('click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
        sync();
      });
      if (mq.addEventListener) mq.addEventListener('change', sync);
    }

    /* header hairline once the page scrolls */
    var header = document.querySelector('.site-header');
    function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    /* charts grow in when they come into view */
    var charts = document.querySelectorAll('.chart');
    if ('IntersectionObserver' in window && charts.length) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { threshold: 0.3 });
      charts.forEach(function (c) { io.observe(c); });
    } else charts.forEach(function (c) { c.classList.add('in'); });

    /* hover preview on project rows: fine pointers only, never on touch */
    var pv = document.querySelector('.preview');
    if (!pv || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var img = pv.querySelector('img'), block = pv.parentNode;
    block.classList.add('has-preview');
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0, active = false;
    function place() {
      x += (tx - x) * (reduced.matches ? 1 : 0.18); y += (ty - y) * (reduced.matches ? 1 : 0.18);
      pv.style.setProperty('--x', x.toFixed(1) + 'px'); pv.style.setProperty('--y', y.toFixed(1) + 'px');
      raf = (active && (Math.abs(tx - x) > .3 || Math.abs(ty - y) > .3)) ? requestAnimationFrame(place) : 0;
    }
    function target(e) {
      var w = pv.offsetWidth, h = pv.offsetHeight;
      tx = Math.min(e.clientX + 24, window.innerWidth - w - 16); ty = Math.min(Math.max(e.clientY - h / 2, 72), window.innerHeight - h - 16);
      if (!raf) raf = requestAnimationFrame(place);
    }
    block.querySelectorAll('a[data-preview]').forEach(function (a) {
      var pre = new Image(); pre.src = a.dataset.preview;
      a.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse') return;
        img.src = a.dataset.preview;
        if (!active) { target(e); x = tx; y = ty; place(); }
        active = true; pv.classList.add('on');
      });
      a.addEventListener('pointermove', target);
      a.addEventListener('pointerleave', function () { active = false; pv.classList.remove('on'); });
    });
  });
})();
