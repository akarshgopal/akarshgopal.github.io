// A tiny publish/subscribe so the case map can show where the reader has set each lever, without importing the figures.
const state = {}, subs = new Set();
export function publish(k, v) { state[k] = v; subs.forEach(f => f(state)); }
export function subscribe(f) { subs.add(f); f(state); return () => subs.delete(f); }
