// CIECH #6: continuous 3D zoom die → board → rack → hall → building.
// Cited watts (H100 700 W TDP, DGX 10.2 kW, Colossus 150 MW).
// Nested LOD schematic — camera framing verified at every stop (die must fill frame; building is a cutaway hall, not a beige slab).
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, glassMat, plasticMat, addBevelFrame, roundedMesh, makeReveal, paleBoard } from './materials.js';
import { K } from '../lib/constants.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => t * t * (3 - 2 * t);

const LEVELS = [
  { key: 'die', name: 'one GPU die', W: K.h100.tdpW, note: `H100 SXM · ${K.h100.tdpW} W TDP · ${K.h100DieMM2} mm² die` },
  { key: 'board', name: 'one server', W: K.dgxH100.maxW, note: `DGX H100 · ${K.dgxH100.maxW / 1000} kW max · ${K.dgxH100.gpus} GPUs` },
  { key: 'rack', name: 'one rack', W: 4 * K.dgxH100.maxW, note: 'four DGX-class servers in one cabinet (packing assumed)' },
  { key: 'hall', name: 'the GPU hall', W: (K.colossus.gpus / 8) * K.dgxH100.maxW, note: `${K.colossus.gpus.toLocaleString('en-GB')} GPUs · servers only` },
  { key: 'building', name: 'the building', W: K.colossus.MW * 1e6, note: `Colossus · utility ${K.colossus.MW} MW for everything inside` },
];

function mat(hex, opts = {}) {
  return softMat(hex, {
    opacity: opts.opacity ?? 1, emissive: opts.emissive, emissiveIntensity: opts.emissiveIntensity,
    shininess: opts.shininess ?? 36, specular: opts.specular ?? 0x555555, side: opts.side,
  });
}

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  return m;
}
function rbox(w, h, d, material, x = 0, y = 0, z = 0, r = 0.04) {
  const m = roundedMesh(w, h, d, material, r);
  m.position.set(x, y, z);
  return m;
}

// QA16 — Watch-style crisp ink: one merged LineSegments of every box's bbox edges (1 draw call).
function inkOutline(group, { minDim = 0.1, color = 0x1c242e, opacity = 0.5 } = {}) {
  group.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const pts = []; const v = new THREE.Vector3(); const M = new THREE.Matrix4();
  const E = [[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];
  group.traverse(ch => {
    if (!ch.isMesh || !ch.geometry || ch.isInstancedMesh) return;
    const g = ch.geometry; if (!g.boundingBox) g.computeBoundingBox();
    const bb = g.boundingBox; const s = new THREE.Vector3(); bb.getSize(s);
    if (Math.max(s.x, s.y, s.z) < minDim) return;
    M.multiplyMatrices(inv, ch.matrixWorld);
    const c = [];
    for (let i = 0; i < 8; i++) { v.set(i & 1 ? bb.max.x : bb.min.x, i & 2 ? bb.max.y : bb.min.y, i & 4 ? bb.max.z : bb.min.z).applyMatrix4(M); c.push(v.clone()); }
    for (const [a, b] of E) pts.push(c[a].x, c[a].y, c[a].z, c[b].x, c[b].y, c[b].z);
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const ls = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  ls.userData.ink = opacity; group.add(ls); return ls;
}
// QA16 — sagging cable (catenary-ish quadratic) between two points; returns a TubeGeometry
function sagTube(a, b, sag, r = 0.04, seg = 14) {
  const mid = a.clone().add(b).multiplyScalar(0.5); mid.y -= sag;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return new THREE.TubeGeometry(curve, seg, r, 6, false);
}
// instanced boxes (per-unit detail at hall scale without 1000s of draw calls)
function instBoxes(group, list, w, h, d, material) {
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(w, h, d), material, list.length);
  const m = new THREE.Matrix4();
  list.forEach((p, i) => { m.makeTranslation(p[0], p[1], p[2]); im.setMatrixAt(i, m); });
  im.instanceMatrix.needsUpdate = true; group.add(im); return im;
}

const fmtW = w => (w >= 1e6 ? `${+(w / 1e6).toPrecision(3)} MW` : w >= 1e3 ? `${+(w / 1e3).toPrecision(3)} kW` : `${Math.round(w)} W`);

export function factoryZoom(el, opt) {
  const ui = opt.ui, colors = ui.C;
  const narrow = w => w < 560;
  let zoom = 1.0; // default mid: server
  let goal = null;
  let pulse = 0;
  let revealRef = null;

  // Camera: look-at stays near the focus object; dist/pitch chosen so each stop fills the frame.
  // Die sits at origin — CAM[0] frames the package tightly.
  const CAM = [
    { dist: 3.6, y: 0.28, pitch: 0.62, yaw: -0.55 },  // die — framed with pad
    { dist: 11.5, y: 1.05, pitch: 0.48, yaw: -0.72 },  // board — QA18 fill (was 14.5)
    // QA7: rack was clipping top+bottom at dist 20 — pull back + flatten pitch
    { dist: 30,  y: 4.4,  pitch: 0.24, yaw: -0.82 },  // rack — QA17: raised framing (was 48, too small)
    { dist: 132, y: -3,   pitch: 0.5,  yaw: -0.95 },  // hall — QA18: pulled back + steeper so no side crop / horizon arc (was 92, 0.38)
    // building: camera on the OPEN (+X,+Z) corner so cutaway shows hall racks, not the solid left wall
    { dist: 195, y: 20,   pitch: 0.26, yaw: 0.88 },
  ];

  const st = stage3d(el, {
    ui,
    label: 'A continuous three-dimensional zoom from one GPU die out through the server, rack and hall to the whole building. Drag sideways to turn; use the zoom control to pull out.',
    height: w => (narrow(w) ? Math.round(Math.max(320, w * 0.95)) : Math.round(Math.min(460, w * 0.55))),
    radius: 4, radiusY: 2.5, yaw: CAM[1].yaw, pitch: CAM[1].pitch,
    target: new THREE.Vector3(0, CAM[1].y, 0),
    autoFit: false,
    contactShadow: false,
    fov: 34,
    busy: () => goal != null || !!(revealRef && !revealRef.done),
    onShow() { revealRef?.arm(); applyCam(true); syncLod(); st && st.invalidate(); },
    step(dt) {
      pulse += dt;
      if (revealRef && !revealRef.done) { revealRef.tick(dt); return true; }
      if (goal != null) {
        const d = goal - zoom;
        if (Math.abs(d) < 0.004) { zoom = goal; goal = null; }
        else zoom += d * Math.min(1, dt * 5.5);
        applyCam(true); syncLod(); paint(false);
        return true;
      }
      if (dieHeat) {
        dieHeat.material.emissiveIntensity = 0.28 + 0.14 * Math.sin(pulse * 2.2);
        if (boardGroup.visible) {
          for (const q of pulses) { const u = (q.ph + pulse * 0.45) % 1; q.m.position.x = q.dir * (-2.75 + u * 5.5); }
          mBoardDie.emissiveIntensity = 0.16 + 0.12 * (0.5 + 0.5 * Math.sin(pulse * 2.6));
        }
        st.invalidate();
        return true;
      }
      return false;
    },
  });
  if (!st) return false;
  const { scene, view, target } = st;
  view.dist = CAM[1].dist;
  softLights(scene, { hemi: 0.95, keyI: 1.35, fillI: 0.38, rimI: 0.42, keyPos: [-5, 12, 7], fillPos: [7, 3, -5], envI: 0.8, glintI: 0.4 });

  const ground = new THREE.Mesh(new THREE.CircleGeometry(140, 64), mat(0xe4e8e0));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.04; scene.add(ground);

  const world = new THREE.Group(); scene.add(world);

  // ---- DIE at ORIGIN (camera focus for zoom≈0) ----
  const dieGroup = new THREE.Group(); world.add(dieGroup);
  const mDie = mat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.32 });
  const dieHeat = box(1.05, 0.14, 1.05, mDie, 0, 0.1, 0); dieGroup.add(dieHeat);
  // denser SM tiles
  const mTile = mat(0xf0a060, { emissive: 0xffffff, emissiveIntensity: 0.06 });
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
    dieGroup.add(box(0.15, 0.035, 0.15, mTile, -0.4 + c * 0.2, 0.19, -0.4 + r * 0.2));
  }
  // HBM stacks — 8 strata + spacer films (package-class continuity)
  const mHbm = mat(0x3f9a44, { emissive: 0x3f9a44, emissiveIntensity: 0.1 });
  const mHbmSp = mat(0xd0d8d0);
  for (const side of [-1, 1]) {
    for (let s = 0; s < 8; s++) {
      const tint = s % 2 ? 0x2f8a52 : 0x3f9a44;
      dieGroup.add(box(0.28, 0.055, 0.7, mat(tint, { emissive: 0x2a7a34, emissiveIntensity: 0.08 }), side * 0.78, 0.06 + s * 0.07, 0));
      if (s < 7) dieGroup.add(box(0.26, 0.012, 0.65, mHbmSp, side * 0.78, 0.09 + s * 0.07, 0));
    }
  }
  // package substrate + lid rim + continuous bevel
  dieGroup.add(rbox(2.0, 0.07, 1.5, metalMat(0xd0d4dc, { roughness: 0.42, metalness: 0.45 }), 0, 0.01, 0, 0.04));
  dieGroup.add(rbox(1.95, 0.03, 1.45, metalMat(0xb8bcc4, { roughness: 0.35 }), 0, 0.05, 0, 0.03));
  addBevelFrame(dieGroup, 1.95, 1.45, 0.08, metalMat(0xa8b0b8), { t: 0.025, railH: 0.04, overhang: 0.02 });
  addBevelFrame(dieGroup, 1.05, 1.05, 0.2, metalMat(0xf0a060), { t: 0.02, railH: 0.03, overhang: 0.015 });
  // denser C4 / microbumps under package
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2, r = 0.92;
    dieGroup.add(box(0.04, 0.035, 0.04, mat(0xc4a060), Math.cos(a) * r, -0.01, Math.sin(a) * r * 0.7));
  }
  for (let ix = -3; ix <= 3; ix++) for (let iz = -2; iz <= 2; iz++) {
    if (Math.abs(ix) + Math.abs(iz) < 2) continue;
    dieGroup.add(box(0.035, 0.025, 0.035, mat(0xb89050), ix * 0.18, -0.015, iz * 0.18));
  }

  // ---- BOARD (die sits on it; board centered under die) ----
  const boardGroup = new THREE.Group(); world.add(boardGroup);
  boardGroup.position.set(0, -0.08, 0);
  const mBoard = mat(0xdcdcd8);
  const board = rbox(6.4, 0.1, 3.6, paleBoard(0xdcdcd8) /* QA18 light neutral */, 0, 0, 0, 0.04); boardGroup.add(board);
  boardGroup.add(box(6.8, 0.55, 4.0, mat(0xb8c2d0), 0, -0.28, 0));
  boardGroup.add(box(6.0, 0.04, 0.1, mat(0x8a9098), 0, 0.08, 1.5));
  boardGroup.add(box(6.0, 0.04, 0.1, mat(0x8a9098), 0, 0.08, -1.5));
  addBevelFrame(boardGroup, 6.4, 3.6, 0.08, metalMat(0xb4b4b0), { t: 0.035, railH: 0.05, overhang: 0.03 });
  // copper traces on board
  for (let i = -4; i <= 4; i++) {
    boardGroup.add(box(5.8, 0.015, 0.035, mat(0x4a7a58, { opacity: 0.75 }), 0, 0.06, i * 0.32));
  }
  // QA16 mid-action: power pulses riding the traces toward the GPUs
  const mPulse = mat(0xffd36a, { emissive: 0xffb02a, emissiveIntensity: 0.95 });
  const pulses = [];
  for (let i = -4; i <= 4; i++) for (let k = 0; k < 2; k++) {
    const m = box(0.5, 0.03, 0.085, mPulse, 0, 0.118, i * 0.32); boardGroup.add(m);
    pulses.push({ m, ph: ((i + 4) * 0.37 + k * 0.5) % 1, dir: i % 2 ? 1 : -1 });
  }
  const mBoardDie = mat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.12 });
  const boardDies = [];
  for (let i = 0; i < 8; i++) {
    if (i === 2) continue; // focus die is dieGroup at origin
    const g = new THREE.Group();
    const col = i % 2, row = Math.floor(i / 2);
    const x = (col ? 1.4 : -1.4);
    const z = -1.2 + row * 0.8;
    g.position.set(x, 0.12, z);
    g.add(box(0.5, 0.1, 0.5, mBoardDie));
    addBevelFrame(g, 0.5, 0.5, 0.08, metalMat(0xf0a060), { t: 0.015, railH: 0.025, overhang: 0.01 });
    for (const sx of [-0.38, 0.38]) {
      for (let s = 0; s < 4; s++) {
        g.add(box(0.14, 0.035, 0.35, mHbm, sx, 0.02 + s * 0.04, 0));
        if (s < 3) g.add(box(0.12, 0.008, 0.32, mHbmSp, sx, 0.04 + s * 0.04, 0));
      }
    }
    boardGroup.add(g);
    boardDies.push(g);
  }

  // ---- RACK (Standard metal trays + filleted chassis) ----
  const rackGroup = new THREE.Group(); world.add(rackGroup);
  const mPost = metalMat(0x4a5f82, { roughness: 0.4, metalness: 0.7 });
  const mPanel = metalMat(0x5a7298, { roughness: 0.45, metalness: 0.55, opacity: 0.88 });
  const mShelf = metalMat(0x3d4f6e, { roughness: 0.42, metalness: 0.65 });
  const mChassis = metalMat(0xb0bcc8, { roughness: 0.35, metalness: 0.7 });
  const mPsu = metalMat(0x5a6878, { roughness: 0.4, metalness: 0.75 });
  const mPcb = paleBoard(0xd0d0cc);
  const mGpu = metalMat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.28, roughness: 0.38, metalness: 0.6 });
  for (const x of [-3.5, 3.5]) for (const z of [-2.0, 2.0]) {
    rackGroup.add(rbox(0.22, 9.0, 0.22, mPost, x, 4.3, z, 0.06));
  }
  rackGroup.add(rbox(0.12, 8.8, 4.0, mPanel, -3.55, 4.3, 0, 0.02));
  rackGroup.add(rbox(0.12, 8.8, 4.0, mPanel, 3.55, 4.3, 0, 0.02));
  rackGroup.add(rbox(7.2, 0.2, 4.2, mShelf, 0, 0.05, 0, 0.06));
  rackGroup.add(rbox(7.2, 0.2, 4.2, mShelf, 0, 8.7, 0, 0.06));
  // cross braces
  for (const yb of [3.0, 6.0]) {
    rackGroup.add(rbox(7.0, 0.1, 0.12, mPost, 0, yb, -2.0, 0.03));
    rackGroup.add(rbox(7.0, 0.1, 0.12, mPost, 0, yb, 2.0, 0.03));
  }
  for (let b = 0; b < 4; b++) {
    const y = 1.1 + b * 2.0;
    const tray = new THREE.Group(); tray.position.y = y; rackGroup.add(tray);
    tray.add(rbox(6.8, 0.16, 3.8, mShelf, 0, -0.55, 0, 0.05));
    tray.add(rbox(0.16, 1.55, 3.6, mChassis, -3.2, 0, 0, 0.04));
    tray.add(rbox(0.16, 1.55, 3.6, mChassis, 3.2, 0, 0, 0.04));
    tray.add(rbox(6.6, 1.55, 0.16, metalMat(0xa0acb8, { roughness: 0.38, metalness: 0.7 }), 0, 0, -1.85, 0.04));
    // front bezel rail + LED strip
    tray.add(rbox(6.2, 0.1, 0.1, metalMat(0x8a98a8), 0, 0.55, 1.85, 0.03));
    tray.add(rbox(6.0, 0.06, 0.06, softMat(0x4ec4c0, { emissive: 0x4ec4c0, emissiveIntensity: 0.55 }), 0, 0.55, 1.92, 0.02));
    addBevelFrame(tray, 6.6, 3.6, 0.22, metalMat(0xa8b4c0), { t: 0.03, railH: 0.04, overhang: 0.02 });
    // PSUs with face vents + fan hubs
    for (let f = -1; f <= 1; f++) {
      const psu = rbox(0.9, 0.7, 0.55, mPsu, f * 1.8, -0.1, -1.5, 0.04);
      tray.add(psu);
      for (let v = 0; v < 4; v++) {
        tray.add(rbox(0.7, 0.04, 0.03, metalMat(0x3a4048), f * 1.8, -0.3 + v * 0.14, -1.2, 0.01));
      }
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12), metalMat(0x8a9098));
      hub.rotation.x = Math.PI / 2; hub.position.set(f * 1.8, -0.1, -1.2); tray.add(hub);
    }
    // every tray gets densified metal GPU/HBM/DIMM (tray 0 also hosts boardGroup overlay)
    if (b !== 0) {
      tray.add(rbox(5.5, 0.08, 2.8, mPcb, 0, 0.05, 0, 0.04));
    }
    // oversized-at-distance GPU tiles (read at rack zoom)
    for (const gx of [-1.55, -0.52, 0.52, 1.55]) {
      tray.add(rbox(0.78, 0.09, 0.72, metalMat(0xd0d4dc, { roughness: 0.36, metalness: 0.78 }), gx, 0.14, 0.05, 0.04));
      tray.add(rbox(0.62, 0.16, 0.56, mGpu, gx, 0.28, 0.05, 0.04));
      // coldplate teal slab — oversized so lanes read at rack zoom 1.50 (QA15)
      // QA16: coldplate sits ON the GPU (physically right, and visible at rack@1.50) + inlet/outlet stubs
      tray.add(rbox(0.56, 0.07, 0.48, metalMat(0x3ecfc4, { roughness: 0.34, metalness: 0.55, emissive: 0x1d9a92, emissiveIntensity: 0.38 }), gx, 0.4, 0.05, 0.025));
      for (const sx of [-0.14, 0.14]) tray.add(rbox(0.06, 0.12, 0.06, metalMat(0x2fb8ae, { roughness: 0.3, metalness: 0.6, emissive: 0x1d9a92, emissiveIntensity: 0.3 }), gx + sx, 0.47, -0.2, 0.02));
      tray.add(rbox(0.55, 0.04, 0.08, metalMat(0xb88850, { roughness: 0.3, metalness: 0.7, emissive: 0x806020, emissiveIntensity: 0.15 }), gx, 0.15, -0.4, 0.02));
      for (const sx of [-0.28, 0.28]) {
        for (let s = 0; s < 4; s++) {
          const tint = s % 2 ? 0x2f8a52 : 0x3f9a44;
          tray.add(rbox(0.12, 0.035, 0.36, softMat(tint, { emissive: 0x2a7a34, emissiveIntensity: 0.14 }), gx + sx, 0.16 + s * 0.038, 0.05, 0.015));
        }
      }
    }
    // QA16 coldplate lanes: teal supply/return manifolds running the length of every tray
    for (const [zz, col, em] of [[-0.24, 0x3ecfc4, 0x1d9a92], [-0.36, 0x2a8ec8, 0x1a5e98]]) {
      const lane = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 4.0, 10), metalMat(col, { roughness: 0.32, metalness: 0.6, emissive: em, emissiveIntensity: 0.35, brush: false }));
      lane.rotation.z = Math.PI / 2; lane.position.set(0, 0.53, zz); tray.add(lane);
    }
    // thicker purple NVLink bridges
    for (const [xa, xb] of [[-1.55, -0.52], [0.52, 1.55]]) {
      for (let k = 0; k < 6; k++) {
        tray.add(rbox(0.95, 0.04, 0.05, metalMat(0x7a4ec8, { roughness: 0.32, metalness: 0.65, emissive: 0x5a2ea8, emissiveIntensity: 0.22 }), (xa+xb)/2, 0.22, -0.2 + k * 0.09, 0.015));
      }
    }
    // taller DIMM forest
    for (let d = -5; d <= 5; d++) {
      tray.add(rbox(0.09, 0.42, 0.72, metalMat(0x3a8a5a, { roughness: 0.4, metalness: 0.5, emissive: 0x2a6a44, emissiveIntensity: 0.06 }), d * 0.55, 0.35, 1.1, 0.025));
    }
    // front LED bar brighter
    tray.add(rbox(6.2, 0.08, 0.08, softMat(0x4ec4c0, { emissive: 0x4ec4c0, emissiveIntensity: 0.75 }), 0, 0.65, 1.95, 0.02));
  }
  // cable arms / PDUs on both sides (QA15 denser)
  for (const side of [-1, 1]) {
    for (const y of [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5]) {
      rackGroup.add(rbox(0.26, 0.26, 3.4, metalMat(0x2a3038, { roughness: 0.5 }), side * 3.72, y, 0, 0.05));
      for (let k = 0; k < 5; k++) {
        const cab = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8), metalMat(0x4a5058));
        cab.rotation.z = Math.PI / 2;
        cab.position.set(side * 3.95, y, -1.2 + k * 0.6); rackGroup.add(cab);
      }
      // brass grounding lug beads (reads at rack zoom 1.50)
      rackGroup.add(rbox(0.12, 0.12, 0.12, metalMat(0xc9a84c, { roughness: 0.3, metalness: 0.8, emissive: 0xa08030, emissiveIntensity: 0.12 }), side * 3.85, y, 1.55, 0.03));
    }
  }
  // QA16 rack crispness: sagging cable loops per arm level + per-tray drive bays/handles
  {
    const loops = [];
    for (const side of [-1, 1]) for (const y of [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5]) {
      for (const [za, zb] of [[-1.6, -0.2], [0.0, 1.4]]) loops.push(sagTube(new THREE.Vector3(side * 4.02, y, za), new THREE.Vector3(side * 4.02, y, zb), 0.32, 0.04, 14));
    }
    rackGroup.add(new THREE.Mesh(mergeGeometries(loops, false), metalMat(0x1e2228, { roughness: 0.5, metalness: 0.35, brush: false })));
    const mBay = metalMat(0x6a7888, { roughness: 0.35, metalness: 0.65, emissive: 0x1a2430, emissiveIntensity: 0.15, brush: false });
    const mHnd = metalMat(0xc9a84c, { roughness: 0.28, metalness: 0.8, emissive: 0x805a20, emissiveIntensity: 0.18, brush: false });
    for (let b = 0; b < 4; b++) {
      const y = 1.1 + b * 2.0;
      for (let k = 0; k < 10; k++) rackGroup.add(rbox(0.42, 0.32, 0.05, mBay, -2.55 + k * 0.567, y + 0.25, 1.98, 0.015));
      for (const sx of [-3.05, 3.05]) rackGroup.add(rbox(0.08, 0.9, 0.1, mHnd, sx, y, 2.0, 0.03));
      rackGroup.add(rbox(0.07, 0.07, 0.04, softMat(0x5ef08a, { emissive: 0x3ee070, emissiveIntensity: 0.9 }), 2.75, y + 0.25, 2.02, 0.01));
    }
  }
  // board sits on lowest tray
  boardGroup.position.y = 1.15;
  dieGroup.position.set(0, 1.35, 0);

  // ---- HALL: denser rack grid (Watch-readable at distance) ----
  // Coldplate teal slabs: visible on every tray at rack zoom ≥1.50 and hall far tiles at ≥2.5.
  // Floor aisle trays + CRAC + dual PDUs densified QA15 — no board@0.6 / rack@1.50 cam change.
  const hallGroup = new THREE.Group(); world.add(hallGroup);
  hallGroup.add(box(86, 0.25, 54, metalMat(0x3a4a58, { roughness: 0.55, metalness: 0.4, brush: false }), 0, -0.15, 0));
  hallGroup.add(box(78, 0.08, 5.5, metalMat(0x7ec8c4, { roughness: 0.45, metalness: 0.3, emissive: 0x3aa8a4, emissiveIntensity: 0.2, brush: false }), 0, 0.02, 0)); // cold aisle
  // hot aisle strips
  for (const z of [-18, -9, 9, 18]) {
    hallGroup.add(box(78, 0.06, 2.2, metalMat(0xc87850, { roughness: 0.5, metalness: 0.25, emissive: 0xa05030, emissiveIntensity: 0.12, brush: false }), 0, 0.02, z));
  }
  const mRackFar = metalMat(0x5a7ecc, { roughness: 0.4, metalness: 0.55, emissive: 0x3a5eac, emissiveIntensity: 0.14, brush: false });
  const mShelfFar = metalMat(0x5a6a82, { roughness: 0.42, metalness: 0.5, brush: false });
  const mCabFar = metalMat(0x7a8aa8, { roughness: 0.4, metalness: 0.55, brush: false });
  const mGpuFar = metalMat(0xe07a3a, { roughness: 0.38, metalness: 0.55, emissive: 0xe07a3a, emissiveIntensity: 0.28, brush: false });
  const mLedFar = softMat(0x4ec4c0, { emissive: 0x4ec4c0, emissiveIntensity: 0.4 });
  const ROWS = 5, COLS = 9;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r === 2 && c === 4) continue; // leave hole for hero rack
      const x = (c - (COLS - 1) / 2) * 7.4;
      const z = (r - (ROWS - 1) / 2) * 9.0;
      for (const px of [-1.25, 1.25]) for (const pz of [-0.65, 0.65]) {
        hallGroup.add(box(0.16, 7.6, 0.16, mRackFar, x + px, 3.9, z + pz));
      }
      hallGroup.add(box(2.7, 0.14, 1.5, mRackFar, x, 0.18, z));
      hallGroup.add(box(2.7, 0.14, 1.5, mRackFar, x, 7.5, z));
      for (let ty = 0; ty < 5; ty++) {
        const yy = 0.85 + ty * 1.3;
        hallGroup.add(box(2.5, 0.09, 1.4, mShelfFar, x, yy - 0.4, z));
        hallGroup.add(box(2.35, 0.85, 0.07, mCabFar, x, yy, z - 0.62));
        hallGroup.add(box(0.07, 0.85, 1.2, mCabFar, x - 1.15, yy, z));
        hallGroup.add(box(0.07, 0.85, 1.2, mCabFar, x + 1.15, yy, z));
        // GPU tiles + teal coldplate (reads at hall distance without LED noise)
        for (const gx of [-0.65, 0.65]) {
          hallGroup.add(box(0.7, 0.18, 0.55, mGpuFar, x + gx, yy - 0.22, z + 0.05));
          hallGroup.add(box(0.65, 0.05, 0.5, metalMat(0x3ecfc4, { roughness: 0.4, metalness: 0.45, emissive: 0x1d9a92, emissiveIntensity: 0.2, brush: false }), x + gx, yy - 0.34, z + 0.05));
        }
        if (ty % 2 === 0) hallGroup.add(box(2.0, 0.05, 0.05, mLedFar, x, yy + 0.32, z + 0.72));
      }
      hallGroup.add(box(2.0, 0.08, 0.07, mLedFar, x, 6.5, z + 0.78));
      // dual PDU + cable whip (QA15) — denser at hall scale
      hallGroup.add(box(0.14, 6.8, 0.14, metalMat(0x2a3038, { roughness: 0.5, brush: false }), x - 1.42, 3.6, z));
      hallGroup.add(box(0.14, 6.8, 0.14, metalMat(0x2a3038, { roughness: 0.5, brush: false }), x + 1.42, 3.6, z));
      for (let py = 0; py < 6; py++) {
        hallGroup.add(box(0.22, 0.12, 0.35, metalMat(0x4a5058, { roughness: 0.42, metalness: 0.55, brush: false }), x - 1.55, 1.0 + py * 1.05, z + 0.15));
        hallGroup.add(box(0.55, 0.05, 0.05, metalMat(0xc9a84c, { roughness: 0.32, metalness: 0.75, brush: false }), x - 1.85, 1.0 + py * 1.05, z + 0.15));
      }
      // rear cable bundle
      for (let k = 0; k < 4; k++) {
        hallGroup.add(box(0.08, 5.5, 0.08, metalMat(0x3a4858, { roughness: 0.5, brush: false }), x - 0.6 + k * 0.4, 3.2, z - 0.85));
      }
    }
  }
  // overhead bus bars + denser cable trays between rows (QA15 hall density)
  for (let i = -4; i <= 4; i++) {
    hallGroup.add(box(84, 0.28, 0.28, metalMat(0xa8b0a0, { roughness: 0.4, metalness: 0.6, brush: false }), 0, 9.6, i * 5.5));
    hallGroup.add(box(84, 0.14, 0.7, metalMat(0x6a7078, { roughness: 0.45, metalness: 0.5, brush: false }), 0, 9.15, i * 5.5 + 1.5));
    // hanging cable clusters under trays
    for (let k = -5; k <= 5; k++) {
      hallGroup.add(box(0.18, 0.55, 0.18, metalMat(0x3a4048, { roughness: 0.5, brush: false }), k * 7.2, 8.7, i * 5.5 + 1.5));
    }
  }
  // floor aisle cable trays (cold aisle center + hot aisles) — readable at hall zoom ≥2.5
  for (const z of [-18, -9, 0, 9, 18]) {
    hallGroup.add(box(76, 0.12, 0.55, metalMat(0x5a6068, { roughness: 0.48, metalness: 0.45, brush: false }), 0, 0.12, z));
    for (let k = -6; k <= 6; k++) {
      hallGroup.add(box(0.35, 0.08, 0.35, metalMat(0x2a3038, { roughness: 0.5, brush: false }), k * 5.5, 0.22, z));
    }
  }
  // CRAC / CRAH units denser along both cold ends
  for (const z of [-24, 24]) {
    for (const x of [-32, -16, 0, 16, 32]) {
      hallGroup.add(box(4.2, 3.0, 2.0, metalMat(0xb0b8c0, { roughness: 0.4, metalness: 0.55, brush: false }), x, 1.6, z));
      hallGroup.add(box(1.1, 0.7, 1.1, metalMat(0x8a9098, { roughness: 0.35, metalness: 0.7, brush: false }), x, 3.4, z));
      hallGroup.add(box(3.5, 0.14, 0.14, softMat(0x4ec4c0, { emissive: 0x4ec4c0, emissiveIntensity: 0.55 }), x, 2.6, z + (z > 0 ? -1.1 : 1.1)));
    }
  }
  // cross-aisle ladder racks / containment walls (reads hall packing)
  for (let c = 0; c < 8; c++) {
    const x = (c - 3.5) * 7.4;
    hallGroup.add(box(0.08, 7.2, 8.5, metalMat(0x7a8898, { roughness: 0.45, metalness: 0.35, opacity: 0.55, brush: false }), x + 3.5, 3.8, 0));
  }

  // ---- QA16 hall crispness: per-unit bezels / drive bays / LEDs / handles (instanced) + sagging cables ----
  {
    const bez = [], bay = [], ledG = [], ledA = [], hnd = [];
    const cables = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      if (r === 2 && c === 4) continue;
      const x = (c - (COLS - 1) / 2) * 7.4, z = (r - (ROWS - 1) / 2) * 9.0;
      for (let ty = 0; ty < 5; ty++) {
        const yy = 0.85 + ty * 1.3, zf = z + 0.69;
        bez.push([x, yy, zf]);
        for (let k = 0; k < 8; k++) bay.push([x - 0.98 + k * 0.28, yy + 0.06, zf + 0.03]);
        ledG.push([x + 1.0, yy + 0.3, zf + 0.04]);
        if ((r + c + ty) % 3 === 0) ledA.push([x + 0.86, yy + 0.3, zf + 0.04]);
        hnd.push([x - 1.08, yy, zf + 0.06]); hnd.push([x + 1.08, yy, zf + 0.06]);
      }
      // two sagging power/fibre whips from rack top up to the overhead tray
      const tz = Math.round(z / 5.5) * 5.5 + 1.5;
      for (const dx of [-0.7, 0.7]) {
        cables.push(sagTube(new THREE.Vector3(x + dx, 7.6, z - 0.3), new THREE.Vector3(x + dx * 1.6, 9.1, tz), -0.45, 0.07, 10));
      }
      // cross-aisle sagging cable between neighbour racks (reads as continuous hall wiring)
      if (c < COLS - 1 && !(r === 2 && c === 3)) {
        cables.push(sagTube(new THREE.Vector3(x + 1.3, 7.3, z - 0.5), new THREE.Vector3(x + 7.4 - 1.3, 7.3, z - 0.5), 0.9, 0.055, 12));
      }
    }
    instBoxes(hallGroup, bez, 2.3, 1.0, 0.05, metalMat(0x2a3240, { roughness: 0.45, metalness: 0.5, brush: false }));
    instBoxes(hallGroup, bay, 0.2, 0.62, 0.04, metalMat(0x8a9aae, { roughness: 0.35, metalness: 0.6, emissive: 0x2a3a4e, emissiveIntensity: 0.2, brush: false }));
    instBoxes(hallGroup, ledG, 0.09, 0.09, 0.04, softMat(0x5ef08a, { emissive: 0x3ee070, emissiveIntensity: 0.9 }));
    instBoxes(hallGroup, ledA, 0.09, 0.09, 0.04, softMat(0xffb040, { emissive: 0xff9020, emissiveIntensity: 0.9 }));
    instBoxes(hallGroup, hnd, 0.07, 0.7, 0.08, metalMat(0xc9a84c, { roughness: 0.3, metalness: 0.75, emissive: 0x806020, emissiveIntensity: 0.15, brush: false }));
    const cg = mergeGeometries(cables, false);
    hallGroup.add(new THREE.Mesh(cg, metalMat(0x22282f, { roughness: 0.55, metalness: 0.3, brush: false })));
  }
  const hallInk = inkOutline(hallGroup, { minDim: 0.3, color: 0x18202a, opacity: 0.5 });

  // ---- BUILDING: CUTAWAY (walls + roof equipment, hall visible inside) — not a solid beige slab ----
  const bldGroup = new THREE.Group(); world.add(bldGroup);
  const mWall = mat(0xe2e0da);
  const mWallDark = mat(0xc8c4bc);
  const mWallEdge = mat(0xb0aca4);
  // Cutaway house: keep back + left walls; REMOVE most of front & right so hall racks read
  bldGroup.add(box(108, 28, 1.6, mWall, 0, 14, -40)); // back
  bldGroup.add(box(1.6, 28, 82, mWall, -54, 14, 0)); // left
  // only a short right stub + short front stub (classic architectural cutaway)
  bldGroup.add(box(1.6, 28, 22, mWall, 54, 14, -30));
  bldGroup.add(box(28, 28, 1.6, mWall, -40, 14, 40));
  // cut edges (darker) so the missing walls read as intentional
  bldGroup.add(box(1.2, 28, 1.2, mWallEdge, 54, 14, -19));
  bldGroup.add(box(1.2, 28, 1.2, mWallEdge, -26, 14, 40));
  // roof: only over the closed corner — big open cutaway over the hall
  bldGroup.add(box(70, 1.0, 36, mWallDark, -18, 28.2, -22));
  bldGroup.add(box(36, 1.0, 28, mWallDark, -36, 28.2, 12));
  // roof beams spanning the open void (reads as cutaway, not missing geo)
  for (let i = 0; i < 6; i++) {
    bldGroup.add(box(0.8, 1.6, 48, mat(0x9a968e), -6 + i * 14, 28.2, 4));
  }
  // roof chillers / CRAH denser
  for (let i = 0; i < 9; i++) {
    const x = -48 + i * 12;
    bldGroup.add(box(9, 4.2, 7, metalMat(0xb0b8c0, { roughness: 0.4, metalness: 0.55, brush: false }), x, 31.2, -12));
    bldGroup.add(box(2.5, 2.6, 2.5, metalMat(0x8a9098, { roughness: 0.35, metalness: 0.7, brush: false }), x - 2.3, 34.2, -12));
    bldGroup.add(box(2.5, 2.6, 2.5, metalMat(0x8a9098, { roughness: 0.35, metalness: 0.7, brush: false }), x + 2.3, 34.2, -12));
    bldGroup.add(box(8, 0.3, 0.3, softMat(0x4ec4c0, { emissive: 0x4ec4c0, emissiveIntensity: 0.35 }), x, 33.2, -8.2));
  }
  // cooling towers row
  for (let i = 0; i < 6; i++) {
    const x = -36 + i * 14;
    bldGroup.add(box(5, 8, 5, metalMat(0x9aa3ad, { roughness: 0.42, metalness: 0.5, brush: false }), x, 32.5, 18));
    bldGroup.add(box(3.5, 1.2, 3.5, metalMat(0x7a828a, { roughness: 0.4, metalness: 0.6, brush: false }), x, 37.2, 18));
  }
  // transformers / switchyard denser
  for (let i = 0; i < 7; i++) {
    bldGroup.add(box(6, 5.5, 4.2, metalMat(0x6a7078, { roughness: 0.4, metalness: 0.6, brush: false }), -62, 2.6, -30 + i * 11));
    bldGroup.add(box(1.3, 3.2, 1.3, metalMat(0x4a5058, { roughness: 0.4, metalness: 0.65, brush: false }), -62, 7.0, -30 + i * 11));
    bldGroup.add(box(0.4, 4, 0.4, metalMat(0xc9a84c, { roughness: 0.35, metalness: 0.8, brush: false }), -58, 4, -30 + i * 11));
  }
  // generators
  for (let i = 0; i < 4; i++) {
    bldGroup.add(box(10, 4, 5, metalMat(0x5a6878, { roughness: 0.4, metalness: 0.55, brush: false }), 68, 2.2, -20 + i * 14));
    bldGroup.add(box(3, 2.5, 3, metalMat(0x3a4858, { roughness: 0.4, metalness: 0.6, brush: false }), 68, 5.5, -20 + i * 14));
  }
  // perimeter fence posts
  for (let i = 0; i < 20; i++) {
    bldGroup.add(box(0.35, 3.5, 0.35, metalMat(0x6a7068, { roughness: 0.5, brush: false }), -75 + i * 8, 1.6, 55));
  }
  // parking / yard pads
  bldGroup.add(box(160, 0.3, 120, mat(0x6a7068), 0, -0.4, 0));
  bldGroup.add(box(40, 0.2, 20, mat(0xb8c0a8), 70, -0.2, 30));
  // window strips
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 14; col++) {
      bldGroup.add(box(5.2, 2.4, 0.35, mat(0x9eb8d0, { emissive: 0x7a9ab8, emissiveIntensity: 0.1 }), -48 + col * 7.2, 4.5 + row * 4.8, -40.6));
    }
  }
  // entrance canopy (reads human scale)
  bldGroup.add(box(18, 0.5, 8, mat(0xa8b0a0), 20, 8, 44));
  bldGroup.add(box(0.6, 8, 0.6, mWallEdge, 12, 4, 44));
  bldGroup.add(box(0.6, 8, 0.6, mWallEdge, 28, 4, 44));

  revealRef = makeReveal([
    { obj: dieGroup, delay: 0.0, drop: 0.25, fromScale: 0.7 },
    { obj: boardGroup, delay: 0.2, drop: 0.2, fromScale: 0.85 },
  ], { dur: 0.9 });

    // edges on focus hardware
  const edgeInk = new THREE.LineBasicMaterial({ color: 0x1e2226, transparent: true, opacity: 0.4 });
  [dieGroup, boardGroup, rackGroup].forEach(g => g.traverse(ch => {
    if (!ch.isMesh || !ch.geometry) return;
    try { ch.add(new THREE.LineSegments(new THREE.EdgesGeometry(ch.geometry, 26), edgeInk.clone())); } catch (_) {}
  }));

  st.label('<span class="c-orange">die</span>', () => (zoom < 0.9 ? new THREE.Vector3(dieGroup.position.x, dieGroup.position.y + 0.55, dieGroup.position.z) : null), '');
  // HBM colour-in-prose — die label only at close zoom
  st.label('DGX server', () => (zoom > 0.55 && zoom < 1.42 ? new THREE.Vector3(0, boardGroup.position.y + 1.2, 0) : null), '');
  st.label('rack', () => (zoom > 1.42 && zoom < 2.45 ? new THREE.Vector3(0, 11.2, 0) : null), '');
  st.label('GPU hall', () => (zoom > 2.4 && zoom < 3.55 ? new THREE.Vector3(0, 8, 22) : null), '');
  st.label('building · 150 MW', () => (zoom > 3.4 ? new THREE.Vector3(0, 34, 0) : null), '');

  function camAt(t) {
    const i = clamp(Math.floor(t), 0, CAM.length - 2);
    const u = smooth(t - i);
    // board→rack (i===1): front-load so zoom 1.50 already near rack CAM (pads ≥50px)
    // die→board (i===0): front-load dist so mid ~0.6 never clips board bottom
    const uDist = i === 1 ? Math.pow(u, 0.22) : (i === 0 ? Math.pow(u, 0.35) : u);
    const uY = i === 1 ? Math.pow(u, 0.28) : (i === 0 ? Math.pow(u, 0.4) : u);
    let dist = Math.exp(lerp(Math.log(CAM[i].dist), Math.log(CAM[i + 1].dist), uDist));
    let y = lerp(CAM[i].y, CAM[i + 1].y, uY);
    let pitch = lerp(CAM[i].pitch, CAM[i + 1].pitch, u);
    // Hard floor die→board: keep board chassis inside frame through mid-transition
    if (i === 0 && u >= 0.25) {
      dist = Math.max(dist, lerp(CAM[i].dist, CAM[i + 1].dist, Math.max(0.55, u * 0.95)));
      y = Math.max(y, lerp(CAM[i].y, CAM[i + 1].y, 0.55));
      pitch = Math.min(pitch, lerp(CAM[i].pitch, CAM[i + 1].pitch, 0.85));
    }
    // Hard floor through rack entry window — never let mid-lerp clip the cabinet
    if (i === 1 && u >= 0.4) {
      dist = Math.max(dist, lerp(CAM[i].dist, CAM[i + 1].dist, 0.92));
      y = Math.max(y, lerp(CAM[i].y, CAM[i + 1].y, 0.7));
      pitch = Math.min(pitch, lerp(CAM[i].pitch, CAM[i + 1].pitch, 0.9));
    }
    return { dist, y, pitch, yaw: lerp(CAM[i].yaw, CAM[i + 1].yaw, u) };
  }

  let pathYaw = CAM[1].yaw;
  function applyCam(snapYaw = false) {
    const c = camAt(zoom);
    view.dist = c.dist;
    view.pitch = c.pitch;
    if (snapYaw) { pathYaw = c.yaw; view.yaw = pathYaw; }
    // look-at follows die when close
    const lookY = zoom < 0.5
      ? lerp(dieGroup.position.y + 0.15, c.y, zoom / 0.5)
      : c.y;
    target.set(0, lookY, 0);
    st.invalidate();
  }

  function syncLod() {
    const z = zoom;
    dieGroup.visible = z < 1.5;
    dieGroup.scale.setScalar(z < 1.0 ? 1 : lerp(1, 0.4, clamp((z - 1.0) / 0.45, 0, 1)));

    // Keep a faint board under the die at zoom≈0 so the package isn't floating in grey void
    boardGroup.visible = z < 2.5;
    const bOp = z < 0.35 ? lerp(0.35, 1, z / 0.35) : clamp(1 - (z - 2.0) / 0.45, 0.15, 1);
    board.material.transparent = bOp < 0.99; board.material.opacity = bOp;

    rackGroup.visible = z > 1.28 && z < 3.4;
    rackGroup.traverse(ch => {
      if (!ch.isMesh) return;
      const rOp = clamp((z - 1.28) / 0.22, 0, 1);
      ch.material.transparent = rOp < 0.99;
      ch.material.opacity = rOp;
      ch.visible = rOp > 0.02;
    });

    hallGroup.visible = z > 2.25;
    const hOp = clamp((z - 2.25) / 0.45, 0, 1);
    hallGroup.traverse(ch => { if (ch.isMesh) { ch.material.transparent = hOp < 0.99; ch.material.opacity = Math.max(0.25, hOp); } });
    hallInk.material.opacity = hallInk.userData.ink * hOp;

    bldGroup.visible = z > 3.05; // QA17: no ghost shell at hall stop
    const bdOp = clamp((z - 3.05) / 0.45, 0, 1);
    bldGroup.traverse(ch => {
      if (!ch.isMesh) return;
      ch.material.transparent = bdOp < 0.99;
      // roof slabs stay a touch translucent so the cutaway hall reads under them
      const isRoof = ch.position.y > 26;
      ch.material.opacity = Math.max(isRoof ? 0.55 : 0.85, bdOp);
    });
    // at building stop keep hall racks fully opaque so interior isn't a beige void
    if (z > 3.5) {
      hallGroup.visible = true;
      hallGroup.traverse(ch => { if (ch.isMesh) { ch.material.transparent = false; ch.material.opacity = 1; } });
    }

    ground.material.transparent = true;
    // hide ground until hall so die/board/rack mid-frames never kiss canvas edges
    // QA18: no ground disc at the hall stop (its far arc read as a horizon); only fades in for the building
    ground.visible = z > 3.2;
    ground.material.opacity = z > 3.2 ? clamp((z - 3.2) / 0.5, 0.2, 1) : 0;
  }

  function paint(updateRo = true) {
    applyCam();
    syncLod();
    if (updateRo) {
      const j = clamp(Math.round(zoom), 0, LEVELS.length - 1);
      const L = LEVELS[j];
      const next = LEVELS[Math.min(LEVELS.length - 1, j + 1)];
      ro.innerHTML = `<b>${L.name[0].toUpperCase() + L.name.slice(1)}</b>: <b>${fmtW(L.W)}</b> · ${L.note}. ${j < LEVELS.length - 1 ? `Pull out toward <span class="c-orange">${next.name}</span> (${fmtW(next.W)}).` : 'Site power is the utility figure, not a sum of dies.'}`;
    }
    st.invalidate();
  }

  const ctl = ui.controls(el);
  ui.slider(ctl, {
    label: 'Zoom', name: 'zoom', min: 0, max: LEVELS.length - 1, step: 0.01, value: zoom, color: colors.heat,
    fmt: v => LEVELS[clamp(Math.round(v), 0, LEVELS.length - 1)].key,
    oninput: v => { goal = null; zoom = v; applyCam(true); syncLod(); paint(); },
  });
  const ro = ui.readout(el);
  ui.hint(el, 'drag to turn · Zoom: die → building');
  paint();
  st.ready();
  return true;
}
