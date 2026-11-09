// akarshgopal.github.io: theme button and margin-note highlighting. No dependencies;
// the site works without it.
(function () {
  var root = document.documentElement;
  document.addEventListener('DOMContentLoaded', function () {
    /* theme: follows the OS until you choose; the choice is remembered */
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var btn = document.querySelector('.theme');
    function current() { return root.dataset.theme || (mq.matches ? 'dark' : 'light'); }
    function label() { if (btn) btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); }
    if (btn) {
      label();
      btn.addEventListener('click', function () {
        root.dataset.theme = current() === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
        label();
      });
      if (mq.addEventListener) mq.addEventListener('change', label);
    }

    /* hovering a note number lights up its note, and the other way round */
    document.querySelectorAll('a.ref').forEach(function (r) {
      var note = document.getElementById(r.getAttribute('href').slice(1));
      if (!note) return;
      function on() { r.classList.add('lit'); note.classList.add('lit'); }
      function off() { r.classList.remove('lit'); note.classList.remove('lit'); }
      [r, note].forEach(function (el) { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off); });
    });
  });
})();
