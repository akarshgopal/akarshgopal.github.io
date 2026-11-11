// 300 mm wafer as a soft 3D disc — raised good/bad dies, defect beads, die-size rail.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, glassMat, plasticMat, addBevelFrame, roundedMesh, makeReveal, roundedBoxGeo } from './materials.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0x100000000; };
}
function mat(hex, opts = {}) {
  return softMat(hex, {
    opacity: opts.opacity ?? 1, emissive: opts.emissive, emissiveIntensity: opts.emissiveIntensity,
    shininess: opts.shininess ?? 36, specular: opts.specular ?? 0x555555, side: opts.side,
  });
}

export function yield3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  const WR = 150; // mm
  let side = 20, d0 = 0.1, chip = false;
  let revealRef = null;

  const st = stage3d(el, {
    ui,
    label: 'A three-hundred-millimetre wafer with random defects. Drag die size; good dies stay blue.',
    height: w => (narrow(w) ? 400 : 400),
    radius: 2.45, radiusY: 1.8, yaw: -0.2, pitch: 0.44,
    target: new THREE.Vector3(0, 0.15, 0),
    fitPad: 1.1, fov: 28,
    busy: () => !!(revealRef && !revealRef.done),
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) { if (revealRef && !revealRef.done) { revealRef.tick(dt); return true; } return false; },
  });
  if (!st) return false;
  softLights(st.scene, { hemi: 0.95, keyI: 1.3, fillI: 0.38, rimI: 0.42, envI: 1.0 });
  const root = new THREE.Group(); st.scene.add(root);

  const scale = 1 / 58; // mm → scene
  const waferR = WR * scale;
  const mWafer = metalMat(0xd8dce6, { roughness: 0.28, metalness: 0.55, brush: false, emissive: 0xb0b8c8, emissiveIntensity: 0.04 });
  // chuck pedestal under wafer
  const chuck = new THREE.Mesh(new THREE.CylinderGeometry(waferR * 0.55, waferR * 0.7, 0.18, 48), metalMat(0x8a9098, { roughness: 0.4, metalness: 0.75 }));
  chuck.position.y = -0.14; root.add(chuck);
  addBevelFrame(root, waferR * 1.15, waferR * 1.15, -0.02, metalMat(0xa0a8b0), { t: 0.03, railH: 0.05, overhang: 0.02 });
  const wafer = new THREE.Mesh(new THREE.CylinderGeometry(waferR, waferR, 0.08, 64), mWafer);
  root.add(wafer);
  // bevel lip + outer polish ring
  const lip = new THREE.Mesh(new THREE.TorusGeometry(waferR - 0.02, 0.035, 8, 64), metalMat(0xc0c6d0, { roughness: 0.35, metalness: 0.7 }));
  lip.rotation.x = Math.PI / 2; lip.position.y = 0.04; root.add(lip);
  const polish = new THREE.Mesh(new THREE.TorusGeometry(waferR - 0.08, 0.018, 6, 64), metalMat(0xd8dce6, { shininess: 90 }));
  polish.rotation.x = Math.PI / 2; polish.position.y = 0.05; root.add(polish);
  // notch
  const notch = new THREE.Mesh(roundedBoxGeo(0.18, 0.1, 0.12, 0.025), mat(0xb8bec8));
  notch.position.set(0, 0.02, -waferR + 0.02); root.add(notch);
  // chuck vacuum ports
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const port = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 10), metalMat(0x5a6068));
    port.position.set(Math.cos(a) * waferR * 0.35, -0.04, Math.sin(a) * waferR * 0.35); root.add(port);
  }

  const dieGroup = new THREE.Group(); root.add(dieGroup);
  const defGroup = new THREE.Group(); root.add(defGroup);
  const mGood = mat(0x4a6fd4, { emissive: 0x2a4fb4, emissiveIntensity: 0.12 });
  const mBad = mat(0xd07050, { emissive: 0xb05030, emissiveIntensity: 0.15 });
  const mDef = mat(0x2b2b2a, { emissive: 0x111111, emissiveIntensity: 0.1 });

  function layout() {
    const r = rng(11), nd = Math.round(d0 * Math.PI * 15 ** 2), defects = [];
    while (defects.length < nd) {
      const x = (r() * 2 - 1) * WR, y = (r() * 2 - 1) * WR;
      if (x * x + y * y < WR * WR) defects.push([x, y]);
    }
    const a = chip ? side / 2 : side, dies = []; let good = 0;
    for (let y = -WR; y < WR; y += a) for (let x = -WR; x < WR; x += a) {
      if ([[x, y], [x + a, y], [x, y + a], [x + a, y + a]].some(([u, v]) => u * u + v * v > (WR - 3) ** 2)) continue;
      const bad = defects.some(([u, v]) => u >= x && u < x + a && v >= y && v < y + a);
      if (!bad) good++; dies.push([x, y, bad]);
    }
    return { dies, defects, gross: dies.length, good, a };
  }

  function rebuild() {
    while (dieGroup.children.length) dieGroup.remove(dieGroup.children[0]);
    while (defGroup.children.length) defGroup.remove(defGroup.children[0]);
    const { dies, defects, a } = layout();
    const gap = 0.015;
    const dw = Math.max(0.04, a * scale - gap), dh = 0.07;
    const mGoodM = metalMat(0x4a6fd4, { emissive: 0x2a4fb4, emissiveIntensity: 0.14, roughness: 0.45, metalness: 0.55, brush: false });
    const mBadM = metalMat(0xd07050, { emissive: 0xb05030, emissiveIntensity: 0.18, roughness: 0.45, metalness: 0.5, brush: false });
    const mLipG = metalMat(0x6a8fd4), mLipB = metalMat(0xe09070);
    for (const [x, y, bad] of dies) {
      const useRound = dw > 0.07;
      const m = useRound
        ? roundedMesh(dw, dh, dw, bad ? mBadM : mGoodM, Math.min(0.02, dw * 0.15))
        : new THREE.Mesh(new THREE.BoxGeometry(dw, dh, dw), bad ? mBad : mGood);
      m.position.set((x + a / 2) * scale, 0.08, (y + a / 2) * scale);
      dieGroup.add(m);
      if (dw > 0.1) {
        const lip = roundedMesh(dw + 0.012, 0.014, dw + 0.012, bad ? mLipB : mLipG, 0.008);
        lip.position.set((x + a / 2) * scale, 0.08 + dh / 2 + 0.005, (y + a / 2) * scale);
        dieGroup.add(lip);
      }
    }
    for (const [u, v] of defects) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), mDef);
      d.position.set(u * scale, 0.14, v * scale); defGroup.add(d);
    }
    paintRo();
    st.invalidate();
  }

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paintRo() {
    const { gross, good } = layout();
    const A = side * side / 100;
    const ya = chip ? Math.exp(-A / 4 * d0) : Math.exp(-A * d0);
    ro.innerHTML = chip
      ? `Four <span class="c-blue">chiplets</span> of ${side / 2}×${side / 2} mm: <b>${good}</b> of ${gross} good (~${Math.round(ya * 100)}%) → ${Math.floor(good / 4)} complete chips.`
      : `<b>${side}×${side} mm</b> die (${(A * 100).toFixed(0)} mm²): <b class="c-blue">${good}</b> of ${gross} good (~${Math.round(ya * 100)}% by formula).`;
  }
  ui.slider(ctl, { label: 'Die side (mm)', name: 'yd-side', min: 5, max: 30, step: 1, value: side, color: ui.C.compute, fmt: v => `${v}`, oninput: v => { side = v; rebuild(); } });
  ui.slider(ctl, { label: 'Defects / cm²', name: 'yd-d0', min: 0.02, max: 0.5, step: 0.01, value: d0, color: ui.C.heat, fmt: v => v.toFixed(2), oninput: v => { d0 = v; rebuild(); } });
  ui.button(ctl, 'Split into four chiplets', () => { chip = !chip; rebuild(); }, { name: 'yd3-chip' });
  ui.hint(el, '<span class="c-blue">good dies</span> · <span class="c-orange">defects</span> · drag size');
  rebuild();
  const reveal = makeReveal([
    { obj: chuck, delay: 0.0, drop: 0.15 },
    { obj: wafer, delay: 0.12, drop: 0.18 },
    { obj: dieGroup, delay: 0.3, drop: 0.12 },
    { obj: defGroup, delay: 0.45, drop: 0.1 },
  ], { dur: 0.9 });
  revealRef = reveal; reveal.arm();
  if (st.view.dist < 7.05) st.view.dist = 7.05;
  st.ready();
  return true;
}
