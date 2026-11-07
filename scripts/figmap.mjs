// Prints {module: {exp, names}} for every figure module, so the build can give each page only the figures it uses.
// The figure modules are browser code; these stubs let them load in Node without drawing anything.
const g = globalThis;
g.window = g; g.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} });
g.document = { addEventListener() {}, querySelectorAll: () => [], querySelector: () => null, getElementById: () => null,
  createElement: () => ({ getContext: () => null, style: {} }), readyState: 'complete', documentElement: { style: {} } };
g.localStorage = { getItem: () => null, setItem() {} }; g.requestAnimationFrame = () => 0; g.addEventListener = () => {};
import { pathToFileURL } from 'node:url';
const [root, ...mods] = process.argv.slice(2);
const out = {};
for (const m of mods) {
  const mod = await import(pathToFileURL(`${root}/src/figs/${m}.js`).href);
  const exp = mod.FIGS ? 'FIGS' : 'MAIN_FIGS';
  out[m] = { exp, names: Object.keys(mod[exp]) };
}
process.stdout.write(JSON.stringify(out));
