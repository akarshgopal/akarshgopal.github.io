// A tiny multilayer perceptron (2 inputs -> H tanh units -> 1 sigmoid output), trained by plain gradient descent.
// Small enough to train live in the browser on a phone; figures only call step() while visible.
import { rng, gauss } from './rng.js';
export class MLP {
  constructor(H = 4, seed = 3) { this.H = H; const r = rng(seed); this.W1 = []; this.b1 = []; this.W2 = []; for (let j = 0; j < H; j++) { this.W1.push([gauss(r) * 1.2, gauss(r) * 1.2]); this.b1.push(gauss(r) * 0.3); this.W2.push(gauss(r) * 0.8); } this.b2 = 0; }
  hidden(x, y) { return this.W1.map((w, j) => Math.tanh(w[0] * x + w[1] * y + this.b1[j])); }
  predict(x, y) { const h = this.hidden(x, y); let z = this.b2; for (let j = 0; j < this.H; j++) z += this.W2[j] * h[j]; return 1 / (1 + Math.exp(-z)); }
  // one full-batch gradient step on cross-entropy loss; returns the loss before the step
  train(pts, lr = 0.3) {
    const H = this.H, gW1 = this.W1.map(() => [0, 0]), gb1 = new Array(H).fill(0), gW2 = new Array(H).fill(0); let gb2 = 0, L = 0;
    for (const p of pts) {
      const h = this.hidden(p.x, p.y); let z = this.b2; for (let j = 0; j < H; j++) z += this.W2[j] * h[j];
      const o = 1 / (1 + Math.exp(-z)), t = p.c; L += -(t * Math.log(o + 1e-9) + (1 - t) * Math.log(1 - o + 1e-9));
      const d = o - t; gb2 += d;
      for (let j = 0; j < H; j++) { gW2[j] += d * h[j]; const dh = d * this.W2[j] * (1 - h[j] * h[j]); gW1[j][0] += dh * p.x; gW1[j][1] += dh * p.y; gb1[j] += dh; }
    }
    const n = Math.max(1, pts.length);
    for (let j = 0; j < H; j++) { this.W2[j] -= lr * gW2[j] / n; this.W1[j][0] -= lr * gW1[j][0] / n; this.W1[j][1] -= lr * gW1[j][1] / n; this.b1[j] -= lr * gb1[j] / n; }
    this.b2 -= lr * gb2 / n; return L / n;
  }
}
