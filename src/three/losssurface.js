// Gradient descent on a rotatable 3D error landscape. One module, two uses:
//  mode 'single' (essay §8): one ball, a step-size slider, the steepest-way-down arrow.
//  mode 'pair' (Learning §4): plain steps against momentum, with a noise slider (small batches).
// The landscape, start point and step rules are exactly those of the 2D figures it replaces (src/lib/valley.js).
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, plasticMat, metalMat, makeReveal } from './materials.js';
import { Lf, Lg, VMIN, DOMAIN } from '../lib/valley.js';

const { X0, X1, Y0, Y1 } = DOMAIN;
const HS = 0.62; // height = HS × ln(1 + error): a log scale, so the long valley floor stays readable
const H = (x, y) => HS * Math.log(1 + Lf(x, y));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const gauss = r => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());

function landscapeTexture() {
  // banded violet ramp (darker = higher) with a thin contour line at every band edge, as in the 2D version
  const W = 900, Hh = 480, c = document.createElement('canvas'); c.width = W; c.height = Hh;
  const g = c.getContext('2d'), im = g.createImageData(W, Hh), lo = hex('#f3eefc'), hi = hex('#4f3080'), ln = hex('#3a2560');
  const band = new Int16Array(W * Hh), val = new Float32Array(W * Hh);
  for (let j = 0; j < Hh; j++) for (let i = 0; i < W; i++) { const x = X0 + (i + 0.5) / W * (X1 - X0), y = Y1 - (j + 0.5) / Hh * (Y1 - Y0), v = Math.log(1 + Lf(x, y)); val[j * W + i] = v; band[j * W + i] = Math.floor(v * 5); }
  for (let j = 0; j < Hh; j++) for (let i = 0; i < W; i++) {
    const k = j * W + i, b = band[k], t = clamp(b / 5 / 2.4, 0, 1);
    const edge = (i + 1 < W && band[k + 1] !== b) || (j + 1 < Hh && band[k + W] !== b);
    const col = lo.map((a, n) => a + (hi[n] - a) * t), f = edge ? 0.45 : 0;
    im.data.set([col[0] + (ln[0] - col[0]) * f, col[1] + (ln[1] - col[1]) * f, col[2] + (ln[2] - col[2]) * f, 255], k * 4);
  }
  g.putImageData(im, 0, 0);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4; return tex;
}

export function lossSurface(el, opt) {
  const ui = opt.ui, C = ui.C, pair = opt.mode === 'pair';
  const narrow = w => w < 560;
  // ---- simulation (identical rules to the 2D figures) ----
  // pair: "on the floor" = error below DONE for HOLD steps in a row (not the first touch, which caught the momentum ball
  // mid-swing); the count is the step it got there and stayed (Goh, Distill 2017).
  const LR2 = 0.06, BETA = 0.9, DONE = 0.01, HOLD = 10, MAXN = 500;
  const settle = s => { if (Lf(s.p.x, s.p.y) < DONE) { if (!s.hold++) s.since = s.n; } else s.hold = 0; if (s.hold >= HOLD) s.done = s.since; else if (s.n >= MAXN) s.done = -1; };
  let lr = 0.25, start = pair ? { x: -2.5, y: 1.25 } : { x: -2.4, y: 1.2 }, noise = 0, r = rng(2), tick = 0, armed = true;
  let S = []; // balls: {p, v, trail, n, done}
  const reset = () => { r = rng(2); S = (pair ? [0, 1] : [0]).map(k => ({ k, p: { ...start }, v: { x: 0, y: 0 }, trail: [{ ...start }], n: 0, done: 0, hold: 0, since: 0 })); dirtyTrail = true; };
  const grad = p => { const q = Lg(p.x, p.y); return noise ? [q[0] + noise * gauss(r) * 0.6, q[1] + noise * gauss(r) * 0.6] : q; };
  function stepAll() {
    for (const s of S) {
      if (s.done) continue;
      const g = grad(s.p);
      if (!pair) { s.p = { x: s.p.x - lr * g[0], y: s.p.y - lr * g[1] }; s.n++; if (Math.hypot(...Lg(s.p.x, s.p.y)) < 0.004 || s.n > 600 || !isFinite(s.p.x) || Math.abs(s.p.y) > 50) s.done = s.n; }
      else if (s.k === 0) { s.p = { x: s.p.x - LR2 * g[0], y: s.p.y - LR2 * g[1] }; s.n++; settle(s); }
      else { s.v = { x: BETA * s.v.x - LR2 * g[0], y: BETA * s.v.y - LR2 * g[1] }; s.p = { x: s.p.x + s.v.x, y: s.p.y + s.v.y }; s.n++; settle(s); }
      s.trail.push(s.p); if (s.trail.length > 600) s.trail.shift();
    }
    dirtyTrail = true;
  }
  const running = () => S.some(s => !s.done);
  const finish = () => { let k = 0; while (running() && k++ < 2000) stepAll(); };
  let dirtyTrail = true;
  let revealRef = null;

  const st = stage3d(el, {
    ui, label: pair ? 'Two balls rolling down the same three-dimensional error valley: plain steps and steps with momentum. Drag sideways to turn it; tap to drop the balls somewhere else.' : 'A three-dimensional error landscape for two knobs; a ball rolls downhill by gradient descent. Drag sideways to turn it; tap to drop the ball somewhere else.',
    height: w => (narrow(w) ? Math.round(Math.max(280, w * 0.78)) : Math.round(Math.min(440, w * 0.5))),
    radius: 3.6, radiusY: 2.7, yaw: -0.42, pitch: 0.8, target: new THREE.Vector3(0, 0.25, 0.1),
    busy: () => (revealRef && !revealRef.done) || (armed === false && running()),
    step(dt) {
      if (revealRef && !revealRef.done) { revealRef.tick(dt); return true; }
      if (armed || !running()) return false; tick += dt; if (tick < (pair ? 0.04 : 0.11)) return true; tick = 0; stepAll(); if (pair) stepAll(); sync(); return running();
    },
    onShow() { revealRef?.arm(); if (armed) { armed = false; if (!ui.isPlaying()) finish(); sync(); st && st.kick(); } },
    pickable: () => mesh,
    onTap(p) { start = { x: clamp(p.x, X0, X1), y: clamp(-p.z, Y0, Y1) }; reset(); armed = false; if (!ui.isPlaying()) finish(); sync(); hintDone(); },
    onKey() { reset(); armed = false; if (!ui.isPlaying()) finish(); sync(); },
    onTurn() { hintDone(); },
  });
  if (!st) return false;
  const { scene } = st;

  // ---- scene ----
  softLights(scene, { hemi: 0.85, keyI: 1.2, fillI: 0.35, rimI: 0.4, envI: 0.5, sky: 0xfff8ff, ground: 0x9a90b0 });
  const landG = new THREE.Group(); scene.add(landG);
  const NX = 150, NY = 80, geo = new THREE.PlaneGeometry(X1 - X0, Y1 - Y0, NX, NY);
  geo.rotateX(-Math.PI / 2); // plane y → −z, so landscape y runs away from the viewer
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = -pos.getZ(i); pos.setY(i, H(x, y)); }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, softMat(0xffffff, { map: landscapeTexture(), side: THREE.DoubleSide, shininess: 22, specular: 0x555577 }));
  landG.add(mesh);
  // a thin skirt down to a floor makes the block read as a solid
  const floorY = -0.05, skirtMat = plasticMat(0xd9d3e6, { side: THREE.DoubleSide });
  const edge = (pts) => { const g = new THREE.BufferGeometry(), v = []; for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]]; v.push(a.x, a.y, a.z, b.x, b.y, b.z, b.x, floorY, b.z, a.x, a.y, a.z, b.x, floorY, b.z, a.x, floorY, a.z); } g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3)); g.computeVertexNormals(); landG.add(new THREE.Mesh(g, skirtMat)); };
  const P3 = (x, y, lift = 0) => new THREE.Vector3(x, H(x, y) + lift, -y);
  for (const side of [[X0, X1, Y0, Y0], [X0, X1, Y1, Y1], [X0, X0, Y0, Y1], [X1, X1, Y0, Y1]]) { const pts = []; for (let i = 0; i <= 120; i++) { const t = i / 120; pts.push(P3(side[0] + (side[1] - side[0]) * t, side[2] + (side[3] - side[2]) * t)); } edge(pts); }

  // lowest point: a flat white ring, labelled on the object
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.022, 8, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  ring.rotation.x = -Math.PI / 2; ring.position.copy(P3(VMIN.x, VMIN.y, 0.02)); landG.add(ring);
  st.label('lowest point', () => P3(VMIN.x, VMIN.y, 0), 'l3d-ink', true);

  const COL = pair ? [0xffffff, new THREE.Color(C.on).getHex()] : [new THREE.Color(C.on).getHex()];
  const RAD = 0.12;
  const balls = COL.map(c => { const m = new THREE.Mesh(new THREE.SphereGeometry(RAD, 32, 16), metalMat(c, { emissive: c, emissiveIntensity: 0.14, roughness: 0.28, metalness: 0.55, clearcoat: 0.4, brush: false })); scene.add(m); return m; });
  const outline = COL.map(() => { const m = new THREE.Mesh(new THREE.SphereGeometry(RAD * 1.16, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(C.ink), side: THREE.BackSide })); scene.add(m); return m; });
  const trailMat = COL.map(c => new THREE.MeshBasicMaterial({ color: c }));
  const trails = COL.map(() => null);
  const inside = p => isFinite(p.x) && p.x >= X0 && p.x <= X1 && p.y >= Y0 && p.y <= Y1;
  const arrow = pair ? null : new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 0.6, 0xffffff, 0.18, 0.11);
  if (arrow) scene.add(arrow);
  revealRef = makeReveal([{ obj: landG, delay: 0.0, drop: 0.35, fromScale: 0.92 }], { dur: 0.85 });
  if (pair) { st.label('plain steps', () => (inside(S[0].p) ? P3(S[0].p.x, S[0].p.y, RAD * 5.5) : null), 'l3d-white'); st.label('with momentum', () => (inside(S[1].p) ? P3(S[1].p.x, S[1].p.y, RAD * 5.5) : null), 'l3d-yellow'); }

  function sync() {
    S.forEach((s, i) => {
      const ok = inside(s.p); balls[i].visible = outline[i].visible = ok;
      if (ok) { const q = P3(s.p.x, s.p.y, RAD * 0.9); balls[i].position.copy(q); outline[i].position.copy(q); }
      if (dirtyTrail) {
        if (trails[i]) { scene.remove(trails[i]); trails[i].geometry.dispose(); trails[i] = null; }
        const pts = s.trail.filter(inside).map(p => P3(p.x, p.y, 0.035));
        if (pts.length > 1) { const curve = new THREE.CurvePath(); for (let k = 0; k < pts.length - 1; k++) curve.add(new THREE.LineCurve3(pts[k], pts[k + 1])); trails[i] = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.min(1200, (pts.length - 1) * 2), 0.022, 5, false), trailMat[i]); scene.add(trails[i]); }
      }
    });
    dirtyTrail = false;
    if (arrow) {
      const s = S[0], g = Lg(s.p.x, s.p.y), gl = Math.hypot(...g);
      arrow.visible = inside(s.p) && isFinite(gl) && gl > 0.01;
      if (arrow.visible) { const a = P3(s.p.x, s.p.y, RAD * 0.9), d = 0.32, b = P3(clamp(s.p.x - g[0] / gl * d, X0, X1), clamp(s.p.y - g[1] / gl * d, Y0, Y1), RAD * 0.9), dir = b.sub(a).normalize(); arrow.position.copy(a.addScaledVector(dir, RAD * 1.05)); arrow.setDirection(dir); }
    }
    paint(); st.invalidate();
  }

  // ---- controls and the one-line readout ----
  const ctl = ui.controls(el);
  if (!pair) ui.slider(ctl, { label: 'Step size', name: 'lr', min: 0.02, max: 0.75, step: 0.01, value: lr, color: C.learn, fmt: v => v.toFixed(2), oninput: v => { lr = v; reset(); armed = false; if (!ui.isPlaying()) finish(); sync(); } });
  else ui.slider(ctl, { label: 'Noise in each step (smaller batches)', name: 'noise', min: 0, max: 1, step: 0.05, value: noise, color: C.learn, fmt: v => (v === 0 ? 'none' : v.toFixed(2)), oninput: v => { noise = v; reset(); armed = false; if (!ui.isPlaying()) finish(); sync(); } });
  ui.button(ctl, 'Roll again', () => { reset(); armed = false; if (!ui.isPlaying()) finish(); sync(); }, { name: pair ? 'sgd-again' : 'lv-again' });
  const ro = ui.readout(el);
  function paint() {
    if (pair) { // while the race runs, show where each ball stands, so momentum's lead is visible at any moment
      const st = s => (s.done > 0 ? `on the floor in <b>${s.done}</b> steps` : s.done < 0 ? `still not settled after ${MAXN} steps (error ${Lf(s.p.x, s.p.y).toFixed(3)})` : `error ${Lf(s.p.x, s.p.y).toFixed(2)} after ${s.n} steps`);
      ro.innerHTML = `To the floor (error below ${DONE} and staying there): <span class="c-grey">plain steps</span> ${st(S[0])}; <span class="c-yellow">with momentum</span> ${st(S[1])}.`; return; }
    const s = S[0], L = Lf(s.p.x, s.p.y), div = !isFinite(L) || L > 50 || !inside(s.p);
    ro.innerHTML = div ? `The steps are so big the ball <b>flies out of the valley</b>: each step overshoots further than the last.` : `Error <b>${L.toFixed(3)}</b> after <b>${s.n}</b> steps; the white arrow is the steepest way down.`;
  }
  const hp = ui.hint(el, pair ? 'drag sideways to turn the valley, and tap it to drop both balls somewhere else. Then add noise: each step sees only part of the data, so the slope it measures wobbles.' : 'drag sideways to turn the landscape, and tap it to drop the ball somewhere else. Then push the step size up until the ball zigzags across the valley.');
  function hintDone() { if (hp && hp.classList) hp.classList.add('done'); }
  reset(); if (!ui.isPlaying()) { armed = false; finish(); } sync();
  return true;
}
