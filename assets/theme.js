// Light/dark toggle. Default follows the OS (prefers-color-scheme);
// an explicit choice is remembered in localStorage.
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function current() { return root.dataset.theme || (mq.matches ? 'dark' : 'light'); }
  function sync(btn) {
    var dark = current() === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.title = btn.getAttribute('aria-label');
  }
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  sync(btn);
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync(btn);
  });
  mq.addEventListener && mq.addEventListener('change', function () { sync(btn); });
})();
