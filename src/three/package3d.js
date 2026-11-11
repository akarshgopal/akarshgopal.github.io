// GPU package as a real 3D object: logic die + HBM stacks + NVLink pads.
// Pulse travels register → SRAM → HBM → NVLink. Horowitz/Han energies in the readout.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, plasticMat, addBevelFrame, roundedMesh, makeReveal } from './materials.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function mat(hex, opts = {}) {
  const base = opts.metal ? metalMat(hex, opts) : softMat(hex, {
    shininess: opts.shininess ?? 36, specular: opts.specular ?? 0x555555,
    emissive: opts.emissive, emissiveIntensity: opts.emissiveIntensity, opacity: opts.opacity ?? 1,
  });
  return base;
}
function box(root, w, h, d, material, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d, 1, 1, 1), material);
  m.position.set(x, y, z); root.add(m); return m;
}

export function package3d(el, opt) {
  const ui = opt.ui, colors = ui.C;
  const narrow = w => w < 560;
  let reuse = 10, pulse = 0.42; // mid-path: bead between SRAM and HBM
  let revealRef = null;
  let bead = null;
  const hbmMats = [];
  const pathPts = [];

  const st = stage3d(el, {
    ui,
    label: 'A GPU package in three dimensions: logic die, HBM stacks beside it, NVLink pads at the edge. A pulse follows the path a number travels. Drag sideways to turn.',
    height: w => (narrow(w) ? Math.round(Math.max(300, w * 0.9)) : Math.round(Math.min(420, w * 0.52))),
    radius: 2.85, radiusY: 1.85, yaw: -0.72, pitch: 0.42,
    target: new THREE.Vector3(0, 0.35, 0),
    fitPad: 1.2,
    fov: 30,
    busy: () => true,
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      try {
        if (revealRef) revealRef.tick(dt);
        if (!bead) return true;
        const d = Number(dt) || 0.016;
        pulse = (pulse + d * 0.32) % 1;
        if (!Number.isFinite(pulse)) pulse = 0;
        const u = pulse;
        // keypoints: reg → SRAM → HBM → NVLink (predeclared pathPts below, filled after scene build)
        const pts = pathPts;
        if (!pts || pts.length < 2) return true;
        const segN = pts.length - 1;
        const tt = u * segN;
        const seg = Math.max(0, Math.min(segN - 1, Math.floor(tt)));
        const f = tt - seg;
        const p0 = pts[seg], p1 = pts[seg + 1];
        if (!p0 || !p1) return true;
        bead.position.set(
          p0.x + (p1.x - p0.x) * f,
          p0.y + (p1.y - p0.y) * f,
          p0.z + (p1.z - p0.z) * f,
        );
        bead.material.emissiveIntensity = 0.45 + 0.35 * Math.sin(pulse * Math.PI * 2);
        const onHbm = seg === 2;
        for (let i = 0; i < hbmMats.length; i++) hbmMats[i].emissiveIntensity = onHbm ? 0.22 : 0.06;
      } catch (_) { /* never let step kill the render loop */ }
      return true;
    },
  });
  if (!st) return false;
  const { scene } = st;
  softLights(scene, { hemi: 1.45, keyI: 1.25, fillI: 0.5, rimI: 0.35 });

  const root = new THREE.Group(); scene.add(root);

  // substrate — filleted plates (true rounded edges, not just rail lips)
  const sub0 = roundedMesh(4.6, 0.14, 4.0, mat(0xd8d4c8), 0.06); sub0.position.set(0, 0, 0); root.add(sub0);
  const sub1 = roundedMesh(4.4, 0.07, 3.8, metalMat(0xd0d0ce, { roughness: 0.4, metalness: 0.55 }), 0.05); sub1.position.set(0, 0.1, 0); root.add(sub1);
  const sub2 = roundedMesh(4.5, 0.04, 3.9, metalMat(0xc0c0be, { roughness: 0.35 }), 0.04); sub2.position.set(0, 0.15, 0); root.add(sub2);
  addBevelFrame(root, 4.5, 3.9, 0.17, metalMat(0xb4b4b0), { t: 0.035, railH: 0.05, overhang: 0.03 });

  // logic die — filleted
  const dieG = new THREE.Group(); root.add(dieG);
  const dieBody = roundedMesh(2.0, 0.16, 2.0, mat(0x5a8fd4, { emissive: 0x3478d0, emissiveIntensity: 0.14 }), 0.045);
  dieBody.position.set(0, 0.3, 0); dieG.add(dieBody);
  const dieTop = roundedMesh(1.92, 0.04, 1.92, mat(0x6aa0e0), 0.03); dieTop.position.set(0, 0.4, 0); dieG.add(dieTop);
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) {
    if (Math.abs(i) + Math.abs(j) > 5) continue;
    box(dieG, 0.18, 0.025, 0.18, mat(0x4a7fc4), i * 0.24, 0.43, j * 0.24);
  }
  const reg = new THREE.Mesh(new THREE.SphereGeometry(0.12, 18, 18), mat(0xe8c84a, { emissive: 0xe8c84a, emissiveIntensity: 0.55 }));
  reg.position.set(0, 0.55, 0); root.add(reg);
  const sramG = new THREE.Group(); root.add(sramG);
  box(sramG, 1.6, 0.09, 0.45, mat(0x9ccf6a, { emissive: 0x6fa83a, emissiveIntensity: 0.1 }), 0, 0.44, 0.7);
  addBevelFrame(sramG, 1.6, 0.45, 0.5, metalMat(0x78b048), { t: 0.02, railH: 0.035, overhang: 0.015 });
  for (let ix = -3; ix <= 3; ix++) {
    const bank = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.28), mat(0x2f8a62));
    bank.position.set(ix * 0.22, 0.5, 0.7); sramG.add(bank);
  }

  // logic-die bevel frame + denser surface pads
  addBevelFrame(root, 2.0, 2.0, 0.42, metalMat(0x4a7fc4), { t: 0.035, railH: 0.05, overhang: 0.025 });
  const mDiePad = mat(0xd8c070, { emissive: 0xb0a040, emissiveIntensity: 0.12, metal: true });
  for (let ix = -4; ix <= 4; ix++) for (let iz = -4; iz <= 4; iz++) {
    if (Math.abs(ix) + Math.abs(iz) < 2) continue;
    if ((Math.abs(ix) + Math.abs(iz)) % 2 === 0) continue;
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.025, 8), mDiePad);
    pad.position.set(ix * 0.18, 0.455, iz * 0.18); root.add(pad);
  }

  // HBM stacks L/R — 12 strata with alternating die / spacer / RDL tint
  function hbmStack(x) {
    const g = new THREE.Group(); g.position.set(x, 0.22, 0); root.add(g);
    const nLay = 12;
    for (let i = 0; i < nLay; i++) {
      const tint = i % 3 === 0 ? 0x88c049 : i % 3 === 1 ? 0x94c858 : 0xa2d068; // QA18 T9 green (was dark)
      const m = mat(tint, { emissive: 0x1d6a48, emissiveIntensity: 0.06 });
      hbmMats.push(m);
      const layer = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.055, 1.55), m);
      layer.position.y = i * 0.068; g.add(layer);
      if (i < nLay - 1) {
        const sp = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.012, 1.48), mat(0xd0d8d0));
        sp.position.y = i * 0.068 + 0.034; g.add(sp);
        // RDL copper stripe every other spacer
        if (i % 2 === 0) {
          const rdl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.008, 1.4), metalMat(0xc4a060));
          rdl.position.y = i * 0.068 + 0.04; g.add(rdl);
        }
      }
    }
    box(g, 0.52, 0.04, 1.45, mat(0x888880), 0, -0.06, 0);
    box(g, 0.54, 0.03, 1.48, mat(0x3aa872), 0, nLay * 0.068, 0);
    addBevelFrame(g, 0.58, 1.55, nLay * 0.068 + 0.02, metalMat(0x6fa83a), { t: 0.025, railH: 0.04, overhang: 0.02 });
    // stack sidewall bevels
    box(g, 0.02, nLay * 0.068, 1.52, mat(0x6fa83a), 0.3, nLay * 0.034, 0);
    box(g, 0.02, nLay * 0.068, 1.52, mat(0x6fa83a), -0.3, nLay * 0.034, 0);
    // face microbumps on stack top
    for (let bx = -1; bx <= 1; bx++) for (let bz = -2; bz <= 2; bz++) {
      const bump = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), metalMat(0xd8c070));
      bump.position.set(bx * 0.15, nLay * 0.068 + 0.04, bz * 0.22); g.add(bump);
    }
    return g;
  }
  const hbmL = hbmStack(-1.55); const hbmR = hbmStack(1.55);

  // NVLink pads — denser finger array + gold land grid + bevel rail (group for reveal)
  const nvlG = new THREE.Group(); root.add(nvlG);
  box(nvlG, 3.4, 0.05, 0.58, mat(0x5a4878), 0, 0.1, 1.72);
  addBevelFrame(nvlG, 3.4, 0.58, 0.14, metalMat(0x6a5890), { t: 0.03, railH: 0.045, overhang: 0.02 });
  for (let i = -7; i <= 7; i++) {
    box(nvlG, 0.16, 0.09, 0.4, mat(0x8a6ad4, { emissive: 0x6a4ab4, emissiveIntensity: 0.16 }), i * 0.22, 0.16, 1.72);
    box(nvlG, 0.13, 0.03, 0.08, mat(0xd8c070, { emissive: 0xb0a040, emissiveIntensity: 0.2 }), i * 0.22, 0.22, 1.9);
  }
  // HBM microbump / TSV columns denser
  for (const sx of [-1.55, 1.55]) {
    for (let i = 0; i < 12; i++) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.7, 8), metalMat(0xc4a060));
      col.position.set(sx + (i % 3) * 0.1 - 0.1, 0.5, -0.55 + Math.floor(i / 3) * 0.28);
      root.add(col);
    }
  }
  // C4 / BGA ball grid under package (schematic density)
  const mBall = mat(0xc4a060, { emissive: 0xa48040, emissiveIntensity: 0.08 });
  for (let ix = -9; ix <= 9; ix++) for (let iz = -7; iz <= 7; iz++) {
    if ((Math.abs(ix) + Math.abs(iz)) % 2 === 1) continue;
    if (Math.abs(ix) < 2 && Math.abs(iz) < 2) continue;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.048, 10, 10), mBall);
    ball.position.set(ix * 0.28, -0.1, iz * 0.28); root.add(ball);
  }
  // perimeter wirebond nubs
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const r = 2.2;
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.09, 8), mat(0xc4a060));
    pin.position.set(Math.cos(a) * r * 0.95, 0.05, Math.sin(a) * r * 0.85); root.add(pin);
  }
  // substrate metal traces (faint)
  for (let i = -4; i <= 4; i++) {
    box(root, 0.04, 0.02, 3.2, mat(0xa8b0c0), i * 0.45, 0.17, 0);
  }

  const edgeInk = new THREE.LineBasicMaterial({ color: 0x2b2b2a, transparent: true, opacity: 0.12 });
  root.traverse(ch => {
    if (!ch.isMesh || !ch.geometry || ch.geometry.type === 'SphereGeometry' || ch.geometry.type === 'CylinderGeometry') return;
    try { ch.add(new THREE.LineSegments(new THREE.EdgesGeometry(ch.geometry, 28), edgeInk.clone())); } catch (_) {}
  });

  bead = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), mat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.6 }));
  root.add(bead);
  pathPts.push(
    new THREE.Vector3(0, 0.55, 0),
    new THREE.Vector3(0, 0.42, 0.55),
    new THREE.Vector3(1.55, 0.55, 0),
    new THREE.Vector3(0, 0.12, 1.55),
  );

  // reg bead self-explains; HBM / NVLink sit off the mesh
    // die surface pads / TSVs hint
  const mPad = mat(0xd8c070, { emissive: 0xb0a040, emissiveIntensity: 0.15 });
  for (let ix = -3; ix <= 3; ix++) for (let iz = -2; iz <= 2; iz++) {
    if (Math.abs(ix) + Math.abs(iz) < 1) continue;
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8), mPad);
    pad.position.set(ix * 0.22, 0.72, iz * 0.22); root.add(pad);
  }

st.label('<span class="c-green">HBM</span>', () => new THREE.Vector3(1.55, 1.1, 0), '');
  st.label('<span class="c-violet">NVLink</span>', () => new THREE.Vector3(0, 0.38, 2.05), '', true);

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paint() {
    const opE = 3.7 + 0.9, memE = 640 / reuse, tot = opE + memE;
    ro.innerHTML = `Path: register → <b class="c-green">SRAM (5 pJ)</b> → <b class="c-green">HBM/DRAM (640 pJ)</b> → NVLink (900 GB/s). Horowitz 45 nm via Han et al. Reuse <b>${reuse}×</b> → ~<b>${+(opE + memE).toPrecision(3)} pJ</b> per multiply-add; <b>${Math.round(memE / tot * 100)}%</b> is moving data.`;
    st.invalidate();
  }
  ui.slider(ctl, {
    label: 'Reuse', name: 'reuse', min: 1, max: 1000, step: 1, value: reuse, color: colors.memory || colors.cyan || '#2f8a62',
    fmt: v => `${v}×`,
    oninput: v => { reuse = Math.round(v); paint(); },
  });
  ui.hint(el, 'drag to turn · raise reuse to cut memory’s share of each multiply-add');
  paint();

  // scroll-staged assembly: die → SRAM → HBM L/R → NVLink settle in
  const reveal = makeReveal([
    { obj: dieG, delay: 0.0, drop: 0.28 },
    { obj: sramG, delay: 0.12, drop: 0.22 },
    { obj: hbmL, delay: 0.22, drop: 0.42 },
    { obj: hbmR, delay: 0.32, drop: 0.42 },
    { obj: nvlG, delay: 0.48, drop: 0.3, fromScale: 0.45 },
  ], { dur: 0.95 });
  root.userData.reveal = reveal; revealRef = reveal; reveal.arm(); // arm once; re-arms on scroll via onShow

    if (st.view.dist < 6.3) st.view.dist = 6.3;
  st.ready();
  return true;
}
