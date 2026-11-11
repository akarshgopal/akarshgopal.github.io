// The two-knob error landscape shared by the essay's and Learning's gradient-descent figures (2D fallback and 3D).
export const Lf = (x, y) => 0.12 * (x - 1.2) ** 2 + 1.5 * (y - 0.35 * Math.sin(1.7 * x)) ** 2;
export const Lg = (x, y) => { const v = y - 0.35 * Math.sin(1.7 * x); return [0.24 * (x - 1.2) + 3 * v * (-0.35 * 1.7 * Math.cos(1.7 * x)), 3 * v]; };
export const VMIN = { x: 1.2, y: 0.35 * Math.sin(1.7 * 1.2) };
export const DOMAIN = { X0: -3, X1: 3, Y0: -1.6, Y1: 1.6 };
