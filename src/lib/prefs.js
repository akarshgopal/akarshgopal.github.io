// Persist Act 1 / Act 2 lever values across pages so Demand / Yardstick / Factory
// controls can feed the index and verdict meters. localStorage can throw; fail soft.
// Same-tab listeners get a CustomEvent; other tabs get the storage event.
const KEY = 'ai-explainer-prefs-v1';
const EVT = 'ai-prefs';

export function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
}
export function savePrefs(patch) {
  try {
    const cur = loadPrefs();
    localStorage.setItem(KEY, JSON.stringify({ ...cur, ...patch, _t: Date.now() }));
    try { window.dispatchEvent(new CustomEvent(EVT)); } catch { /* non-browser */ }
  } catch { /* ignore */ }
}
export function act1FromPrefs(fallback) {
  const p = loadPrefs().act1;
  if (!p || typeof p !== 'object') return { ...fallback };
  const out = { ...fallback };
  for (const k of ['U', 'T', 'g0', 'h', 'cap', 'b', 'u']) {
    if (typeof p[k] === 'number' && Number.isFinite(p[k])) out[k] = p[k];
  }
  return out;
}
export function saveAct1(p) {
  savePrefs({ act1: { U: p.U, T: p.T, g0: p.g0, h: p.h, cap: p.cap, b: p.b, u: p.u } });
}
/** Merge a partial Act 1 patch into saved prefs (e.g. yardstick only touches b). */
export function patchAct1(partial) {
  const base = act1FromPrefs({ U: 30, T: 45, g0: 0.35, h: 12, cap: 400, b: 0, u: 2 });
  saveAct1({ ...base, ...partial });
}
/** Call fn whenever act1 prefs change (other tabs via storage; this tab via CustomEvent). */
export function watchAct1(fn) {
  if (typeof window === 'undefined') return () => {};
  const run = () => { try { fn(loadPrefs().act1 || {}); } catch { /* ignore */ } };
  const onStorage = e => { if (e.key === KEY || e.key === null) run(); };
  window.addEventListener('storage', onStorage);
  window.addEventListener(EVT, run);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(EVT, run);
  };
}
