// One palette, used everywhere on the page (figures + inline prose spans in style.css).
export const C = {
  ink: '#2b2b2a',
  ink2: '#575755',
  ink3: '#878784',
  grid: '#e4e4e1',
  grid2: '#d0d0cc',
  paper: '#f4f4f2',
  bg: '#fdfdfc',
  white: '#ffffff',

  solar: '#e3a922',
  wind: '#4f9fcb',
  hydro: '#2c6795',
  nuclear: '#8e62b5',
  lignite: '#8b6a4c',
  coal: '#55524d',
  gas: '#e0773f',
  peaker: '#c5473f',
  oil: '#a8423a',
  storage: '#2fa58a',
  biomass: '#7aa354',
  imports: '#a7a299',
  mustrun: '#9c8a73',
  demand: '#2f2d2a',
  price: '#b52f6a',

  procurement: '#e0a03a',
  network: '#6a7db0',
  taxes: '#a49d90',
  spot: '#b52f6a',

  phaseA: '#d1495b',
  phaseB: '#e8a33c',
  phaseC: '#1f8a9b',
  electron: '#3a78d4',
  field: '#d1495b',
  hot: '#d94a2b',
  cold: '#3a78d4',
  north: '#c84a4a',
  south: '#3f6fb3',
  freq: '#1f8a9b',

  // AI series visual system (CIECH-GAP change 1): one seven-colour part palette, used for figure parts, the
  // slider that moves each part, and the matching coloured term in the prose (style.css .c-red … .c-violet).
  red: '#d9483f', orange: '#dd7424', yellow: '#e3a826', green: '#3f9a44', cyan: '#1d9a92', blue: '#3478d0', violet: '#8a55c9',
  // semantic roles, each mapped onto the palette: compute/switching = blue, memory/data movement = green,
  // energy/heat = orange, learning signal (loss, gradient) = violet, "on" = yellow, time = grey, classes = red/blue.
  compute: '#3478d0',
  memory: '#3f9a44',
  heat: '#dd7424',
  learn: '#8a55c9',
  time: '#878784',
  on: '#e3a826',
  classA: '#d9483f',
  classB: '#3478d0',
  stage: '#f4f4f2',
};

export function alpha(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export function mix(hexA, hexB, t) {
  const pa = hexA.replace('#', ''), pb = hexB.replace('#', '');
  const ch = (p, i) => parseInt(p.slice(i, i + 2), 16);
  const r = Math.round(ch(pa, 0) * (1 - t) + ch(pb, 0) * t);
  const g = Math.round(ch(pa, 2) * (1 - t) + ch(pb, 2) * t);
  const b = Math.round(ch(pa, 4) * (1 - t) + ch(pb, 4) * t);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

export function lighten(hex, t) { return mix(hex, '#ffffff', t); }
export function darken(hex, t) { return mix(hex, '#000000', t); }
