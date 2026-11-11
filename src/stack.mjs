// The stack ruler's levels. Shared by build.mjs (which collects every data-level tag across the series) and the browser ruler.
// Hardware runs from the grid down to silicon; software from the answer down to the training loop. A section or peek drawer
// carries data-level="H8 H7": the first code is its main depth, the rest are levels it also touches.
export const HW = ['grid', 'hall', 'rack', 'server', 'interconnect', 'package + HBM', 'SM / tensor core', 'MAC / ALU', 'gate', 'transistor', 'silicon / litho'];
export const SW = ['answer', 'serving loop', 'model', 'layer / block', 'tensor op', 'kernel', 'framework + autograd', 'training loop'];
export const LEVELS = [...SW.map((n, i) => ({ code: 'S' + i, name: n, col: 'S' })), ...HW.map((n, i) => ({ code: 'H' + i, name: n, col: 'H' }))];
