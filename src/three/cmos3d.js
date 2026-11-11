// CIECH: CMOS inverter — Standard metal + rounded fillets + scroll reveal.
// Vin opens n / closes p. Mid-action default Vin≈0.32 so shoot-through reads.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, roundedMesh, addBevelFrame, makeReveal } from './materials.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const PHI = 0.02585, NF = 1.2, VDD = 0.7, VT = 0.35;
const gDrive = v => Math.log1p(Math.exp((v - VT) / (2 * NF * PHI))) ** 2;
const cur = (vgs, vds) => gDrive(vgs) * (1 - Math.exp(-Math.max(0, vds) / PHI));
const IREF = cur(VDD, VDD);
function solve(vin) {
  let lo = 0, hi = VDD;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    (cur(vin, m) - cur(VDD - vin, VDD - m) < 0 ? (lo = m) : (hi = m));
  }
  const vo = (lo + hi) / 2;
  return { vo, i: cur(vin, vo) / IREF, gn: gDrive(vin) / gDrive(VDD), gp: gDrive(VDD - vin) / gDrive(VDD) };
}

export function cmos3d(el, opt) {
  const ui = opt.ui, colors = ui.C;
  const narrow = w => w < 560;
  let vin = 0.32;
  let revealRef = null;
  let pBody, nBody, outNode, heat;

  const st = stage3d(el, {
    ui,
    label: 'A CMOS inverter in three dimensions: a p-type transistor above an n-type, sharing the output node. Drag to turn; Input voltage flips the output.',
    height: w => (narrow(w) ? Math.round(Math.max(300, w * 0.9)) : Math.round(Math.min(600, w * 0.8)) /* W9: taller stage for a tall stack → wider fill */),
    radius: 1.7, radiusY: 1.6, yaw: 0.78, /* W9 fill: wider 3/4 view */ pitch: 0.38,
    target: new THREE.Vector3(0, 0.95, 0),
    fitPadY: 1.08, fitPadX: 0.95, fov: 32, autoFit: true,
    busy: () => !!(revealRef && !revealRef.done),
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef && !revealRef.done) { revealRef.tick(dt); return true; }
      return false;
    },
  });
  if (!st) return false;
  const { scene } = st;
  softLights(scene, { hemi: 0.55, keyI: 1.55, fillI: 0.25, rimI: 0.6, envI: 0.6, glintI: 0.5 });

  const root = new THREE.Group(); scene.add(root);

  // substrate
  const subG = new THREE.Group(); root.add(subG);
  subG.add(roundedMesh(2.45, 0.2, 1.35, metalMat(0xc8c8c4, { roughness: 0.42, metalness: 0.4, brush: false }), 0.05));
  subG.children[0].position.set(0, -0.28, 0);
  addBevelFrame(subG, 2.4, 1.3, -0.16, metalMat(0xc8c8c4, { roughness: 0.4 }), { t: 0.03, railH: 0.05, overhang: 0.025 });

  // rails
  const railG = new THREE.Group(); root.add(railG);
  const vdd = roundedMesh(2.25, 0.14, 0.72, metalMat(0xb89040, { roughness: 0.28, metalness: 0.85, emissive: 0x886020, emissiveIntensity: 0.1, clearcoat: 0.45, clearcoatRoughness: 0.15 }), 0.045);
  vdd.position.set(0, 1.95, 0); railG.add(vdd);
  const gnd = roundedMesh(2.25, 0.14, 0.72, metalMat(0x6a7078, { roughness: 0.4, metalness: 0.7 }), 0.045);
  gnd.position.set(0, -0.05, 0); railG.add(gnd);

  // pMOS
  const pG = new THREE.Group(); root.add(pG);
  pBody = roundedMesh(1.15, 0.38, 0.95, metalMat(0x4a7acc, { roughness: 0.28, metalness: 0.78, emissive: 0x2a5aac, emissiveIntensity: 0.1, brushStrength: 1.2, clearcoat: 0.35 }), 0.06);
  pBody.position.set(0, 1.45, 0); pG.add(pBody);
  addBevelFrame(pG, 1.1, 0.9, 1.66, metalMat(0x8ab4f0, { roughness: 0.32 }), { t: 0.028, railH: 0.045, overhang: 0.018 });
  const pGate = roundedMesh(0.22, 0.58, 1.0, metalMat(0x8ab4f0, { roughness: 0.3, metalness: 0.65 }), 0.04);
  pGate.position.set(-0.72, 1.45, 0); pG.add(pGate);
  for (const zx of [-0.28, 0.28]) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.035, 12), metalMat(0xc4a060, { roughness: 0.28, metalness: 0.85 }));
    pad.position.set(0.28, 1.68, zx); pG.add(pad);
  }

  // nMOS
  const nG = new THREE.Group(); root.add(nG);
  nBody = roundedMesh(1.15, 0.38, 0.95, metalMat(0x3a78c0, { roughness: 0.28, metalness: 0.78, emissive: 0x1a58a0, emissiveIntensity: 0.1, brushStrength: 1.2, clearcoat: 0.35 }), 0.06);
  nBody.position.set(0, 0.4, 0); nG.add(nBody);
  addBevelFrame(nG, 1.1, 0.9, 0.61, metalMat(0x7aa4e0, { roughness: 0.32 }), { t: 0.028, railH: 0.045, overhang: 0.018 });
  const nGate = roundedMesh(0.22, 0.58, 1.0, metalMat(0x8ab4f0, { roughness: 0.3, metalness: 0.65 }), 0.04);
  nGate.position.set(-0.72, 0.4, 0); nG.add(nGate);
  for (const zx of [-0.28, 0.28]) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.035, 12), metalMat(0xc4a060, { roughness: 0.28, metalness: 0.85 }));
    pad.position.set(0.28, 0.63, zx); nG.add(pad);
  }

  // oxide + spacers
  const oxG = new THREE.Group(); root.add(oxG);
  const mOx = metalMat(0xd8dce4, { roughness: 0.4, metalness: 0.2, opacity: 0.55, brush: false });
  const mSp = metalMat(0xe0dcd4, { roughness: 0.5, metalness: 0.25 });
  for (const y of [1.45, 0.4]) {
    const ox = roundedMesh(0.07, 0.42, 0.88, mOx, 0.02);
    ox.position.set(-0.56, y, 0); oxG.add(ox);
    for (const sz of [-1, 1]) {
      const sp = roundedMesh(0.13, 0.4, 0.11, mSp, 0.025);
      sp.position.set(-0.5, y, sz * 0.44); oxG.add(sp);
    }
  }

  // vias + path columns + out node
  const pathG = new THREE.Group(); root.add(pathG);
  const mVia = metalMat(0xb8a878, { roughness: 0.3, metalness: 0.8, emissive: 0xa88858, emissiveIntensity: 0.08 });
  for (const [x, y, z] of [[0.55, 1.95, 0.25], [0.55, 0.92, 0.25], [0.55, -0.05, 0.25]]) {
    const v = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.22, 12), mVia);
    v.position.set(x, y, z); pathG.add(v);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.045, 12), mVia);
    pad.position.set(x, y + 0.11, z); pathG.add(pad);
  }
  outNode = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 18, 18),
    metalMat(0xe8c84a, { roughness: 0.28, metalness: 0.7, emissive: 0xe8c84a, emissiveIntensity: 0.4 })
  );
  outNode.position.set(0, 0.92, 0); pathG.add(outNode);
  const mPath = metalMat(0xb0b4bc, { roughness: 0.35, metalness: 0.75 });
  for (const [h, y] of [[0.38, 1.72], [0.52, 0.92], [0.32, 0.18]]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, h, 14), mPath);
    col.position.set(0, y, 0); pathG.add(col);
  }
  const mIn = metalMat(0x4a7fc4, { roughness: 0.32, metalness: 0.65, emissive: 0x2a5fa8, emissiveIntensity: 0.18 });
  const inBar = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.2, 12), mIn);
  inBar.position.set(-0.72, 0.92, 0); pathG.add(inBar);
  const inBall = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), mIn);
  inBall.position.set(-0.72, 0.92, 0.58); pathG.add(inBall);

  heat = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.11, 1.4, 6, 12),
    softMat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.5, opacity: 0.0 })
  );
  heat.position.set(0, 0.95, 0); root.add(heat);

  // Quiet colour-in-prose — one label only
  st.label('<span class="c-yellow">out</span>', () => new THREE.Vector3(0.5, 0.92, 0.4), '');

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paint() {
    const { vo, i, gn, gp } = solve(vin);
    if (pBody?.material) pBody.material.emissiveIntensity = 0.06 + 0.4 * gp;
    if (nBody?.material) nBody.material.emissiveIntensity = 0.06 + 0.4 * gn;
    pBody.scale.set(1, 0.88 + 0.22 * gp, 1);
    nBody.scale.set(1, 0.88 + 0.22 * gn, 1);
    outNode.material.emissiveIntensity = 0.2 + 0.55 * (vo / VDD);
    outNode.material.color.setHex(vo > VDD / 2 ? 0xe8c84a : 0x8a9098);
    const mid = clamp(1 - Math.abs(vin - VDD / 2) / (VDD / 2), 0, 1);
    const hop = 0.05 + 0.55 * mid * Math.min(1, i * 8);
    heat.visible = hop > 0.08;
    heat.material.opacity = hop;
    heat.material.emissiveIntensity = 0.2 + 0.7 * mid;
    heat.material.transparent = true;
    const e = Math.floor(Math.log10(Math.max(i, 1e-12)));
    const sci = i >= 0.01 ? `${Math.round(i * 100)}%` : `${(i / 10 ** e).toFixed(1)}×10<sup>${e}</sup>`;
    ro.innerHTML = `<span class="c-blue">in</span> <b>${vin.toFixed(2)} V</b> → <span class="c-yellow">out</span> <b>${vo.toFixed(2)} V</b> · <span class="c-blue">pMOS</span>/<span class="c-blue">nMOS</span> current <b class="c-orange">${sci}</b>${mid > 0.4 ? ' · both open' : ''}`;
    st.invalidate();
  }
  ui.slider(ctl, {
    label: 'Input', name: 'vin', min: 0, max: VDD, step: 0.01, value: vin, color: colors.compute,
    fmt: v => `${v.toFixed(2)} V`,
    oninput: v => { vin = v; paint(); },
  });
  ui.hint(el, 'drag to turn · <span class="c-blue">pMOS</span> above · <span class="c-blue">nMOS</span> below · slide Input through the middle');
  paint();

  const reveal = makeReveal([
    { obj: subG, delay: 0.0, drop: 0.2 },
    { obj: railG, delay: 0.08, drop: 0.22 },
    { obj: pG, delay: 0.18, drop: 0.28 },
    { obj: nG, delay: 0.28, drop: 0.28 },
    { obj: oxG, delay: 0.38, drop: 0.15 },
    { obj: pathG, delay: 0.48, drop: 0.2 },
  ], { dur: 0.9 });
  revealRef = reveal; reveal.arm();
  st.view.dist = Math.max(st.view.dist, 7.4);
  st.ready();
  return true;
}
