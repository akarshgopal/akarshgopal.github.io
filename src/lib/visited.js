// Which pages of the series this browser has opened, for tinting the case map. localStorage can throw (private mode,
// some file:// setups); then nothing is remembered and every page simply shows as unvisited.
const KEY = 'ai-series-visited';
const here = () => (location.pathname.split('/').pop() || 'index.html');
export function visited() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
export function markVisited() { try { const v = new Set(visited()); v.add(here()); localStorage.setItem(KEY, JSON.stringify([...v])); } catch { /* ignore */ } }
export function resetVisited() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }
