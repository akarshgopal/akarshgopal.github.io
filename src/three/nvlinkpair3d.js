// Two GPU packages linked by NVLink — soft solids, pulse mid-crossing by default.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, glassMat, plasticMat, addBevelFrame, roundedMesh, makeReveal, roundedBoxGeo, inkEdges, paleBoard } from './materials.js';

function mat(hex, opts = {}) {
  return softMat(hex, {
    opacity: opts.opacity ?? 1, emissive: opts.emissive, emissiveIntensity: opts.emissiveIntensity,
    shininess: opts.shininess ?? 36, specular: opts.specular ?? 0x555555, side: opts.side,
  });
}

function packageMesh(root, ox) {
  const g = new THREE.Group(); g.position.x = ox; root.add(g);
  g.add(roundedMesh(2.2, 0.18, 1.6, metalMat(0xd8d8d6, { roughness: 0.45, metalness: 0.4 }), 0.05));
  addBevelFrame(g, 2.15, 1.55, 0.1, metalMat(0xc0c0be), { t: 0.03, railH: 0.05, overhang: 0.025 });
  const sub = roundedMesh(2.0, 0.12, 1.4, metalMat(0xc0c0be, { roughness: 0.4 }), 0.04);
  sub.position.set(0, 0.14, 0); g.add(sub);
  const die = roundedMesh(0.95, 0.14, 0.85, metalMat(0x4fa2e6, { emissive: 0x2a6fb0, emissiveIntensity: 0.12, roughness: 0.45, metalness: 0.3 }) /* QA18 T9 blue die (was dark slate) */, 0.035);
  die.position.set(0, 0.28, 0); g.add(die);
  addBevelFrame(g, 0.95, 0.85, 0.36, metalMat(0x3f86c8), { t: 0.025, railH: 0.04, overhang: 0.02 });
  // die pads
  for (let ix = -2; ix <= 2; ix++) for (let iz = -1; iz <= 1; iz++) {
    if (Math.abs(ix) + Math.abs(iz) < 1) continue;
    const pd = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 8), metalMat(0xd8c070));
    pd.position.set(ix * 0.14, 0.37, iz * 0.16); g.add(pd);
  }
  const mH = mat(0x3f9a44, { emissive: 0x2a7a34, emissiveIntensity: 0.15 });
  for (const sx of [-0.85, 0.85]) {
    for (let i = 0; i < 8; i++) {
      const tint = i % 2 ? 0x2f8a52 : 0x3f9a44;
      const h = new THREE.Mesh(roundedBoxGeo(0.28, 0.048, 0.55, 0.012), mat(tint, { emissive: 0x2a7a34, emissiveIntensity: 0.12 }));
      h.position.set(sx, 0.2 + i * 0.055, 0); g.add(h);
      if (i < 7) {
        const sp = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.01, 0.5), mat(0xc8d0c8));
        sp.position.set(sx, 0.228 + i * 0.055, 0); g.add(sp);
      }
    }
  }
  const pad = new THREE.Mesh(roundedBoxGeo(1.4, 0.06, 0.28, 0.02), mat(0x8a6ab8, { emissive: 0x6a4a98, emissiveIntensity: 0.2 }));
  pad.position.set(0, 0.12, 0.75); g.add(pad);
  // C4 hint
  const mB = mat(0xc4a060);
  for (let ix = -3; ix <= 3; ix++) for (let iz = -2; iz <= 2; iz++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), mB);
    b.position.set(ix * 0.22, -0.12, iz * 0.2); g.add(b);
  }
  return g;
}

export function nvlinkPair3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  let u = 0.45, run = true, revealRef = null;
  const path = { a: new THREE.Vector3(-2.2, 0.22, 0.75), b: new THREE.Vector3(2.2, 0.22, 0.75), pulse: null };

  const st = stage3d(el, {
    ui,
    label: 'Two GPU packages on one board, joined by NVLink. A pulse crosses the link at Epoch’s 900 GB/s bandwidth.',
    height: w => (narrow(w) ? 300 : 280),
    radius: 2.38, radiusY: 1.52, yaw: -0.58, pitch: 0.32, // QA18 fill (was 3.05/1.95)
    target: new THREE.Vector3(0, 0.1, 0.1),
    fitPad: 1.18, fov: 28,
    busy: () => run || (revealRef && !revealRef.done),
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef) revealRef.tick(dt);
      if (!path.pulse) return !!(revealRef && !revealRef.done);
      u = (u + dt * 0.35) % 1;
      path.pulse.position.lerpVectors(path.a, path.b, u);
      st.invalidate();
      return true;
    },
  });
  if (!st) return false;
  softLights(st.scene, { hemi: 0.95, keyI: 1.25, fillI: 0.36, rimI: 0.45, envI: 1.0 });
  const root = new THREE.Group(); st.scene.add(root);

  // board
  const board = roundedMesh(6.8, 0.12, 2.8, paleBoard(0xdcdcd8), 0.04) /* QA18 light neutral */;
  board.position.y = -0.28; root.add(board);
  addBevelFrame(root, 6.7, 2.7, -0.2, metalMat(0xb4b4b0), { t: 0.035, railH: 0.05, overhang: 0.03 });
  // traces
  const mTr = mat(0x4a7a58, { opacity: 0.7 });
  for (let i = -2; i <= 2; i++) {
    const tr = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.02, 0.04), mTr);
    tr.position.set(0, -0.2, i * 0.35); root.add(tr);
  }

  const pkgA = packageMesh(root, -2.2);
  const pkgB = packageMesh(root, 2.2);

  // NVLink bridge — Standard metal ribbons + gold collars
  const linkG = new THREE.Group(); root.add(linkG);
  const mLink = metalMat(0x8a6ab8, { emissive: 0x6a4a98, emissiveIntensity: 0.42, roughness: 0.28, metalness: 0.82, brushStrength: 1.25 });
  // denser metal ribbons + under-plate for Watch continuity at mid-range
  const under = roundedMesh(2.7, 0.03, 0.55, metalMat(0x6a4a98, { roughness: 0.35, metalness: 0.7, emissive: 0x4a2a78, emissiveIntensity: 0.18 }), 0.02);
  under.position.set(0, 0.14, 0.5); linkG.add(under);
  for (let i = -3; i <= 3; i++) {
    const rib = roundedMesh(2.65, 0.07, 0.075, mLink, 0.022);
    rib.position.set(0, 0.2, 0.5 + i * 0.085); linkG.add(rib);
  }
  for (const sx of [-1.25, 1.25]) {
    for (let i = -3; i <= 3; i++) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.09, 12), metalMat(0xd8c070, { roughness: 0.32, metalness: 0.85 }));
      col.rotation.z = Math.PI / 2;
      col.position.set(sx, 0.2, 0.5 + i * 0.085); linkG.add(col);
    }
  }

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 14, 14),
    mat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.55 })
  );
  pulse.position.lerpVectors(path.a, path.b, u); root.add(pulse);
  path.pulse = pulse;

  const edgeInk = new THREE.LineBasicMaterial({ color: 0x2b2b2a, transparent: true, opacity: 0.22 });
  root.traverse(ch => {
    if (!ch.isMesh || !ch.geometry) return;
    const t = ch.geometry.type;
    if (t === 'SphereGeometry') return;
    try { ch.add(new THREE.LineSegments(inkEdges(ch.geometry, 28), edgeInk.clone())); } catch (_) {}
  });

  // A/B live in prose; NVLink caption pulled off the bridge
  st.label('<span class="c-violet">NVLink</span>', () => new THREE.Vector3(0, 0.55, 1.15), '');

  const ro = ui.readout(el);
  ro.innerHTML = `Pulse on <b class="c-violet">NVLink</b> · Epoch <b>900 GB/s</b> (bandwidth only). Leaving package A is the off-die hop.`;
  ui.hint(el, 'packages <span class="c-blue">A</span>/<span class="c-blue">B</span> · <span class="c-violet">NVLink</span> 900 GB/s · mid-crossing');
  const reveal = makeReveal([
    { obj: pkgA, delay: 0.0, drop: 0.35 },
    { obj: pkgB, delay: 0.15, drop: 0.35 },
    { obj: linkG, delay: 0.35, drop: 0.2, fromScale: 0.5 },
  ], { dur: 0.9 });
  revealRef = reveal; reveal.arm();
  if (st.view.dist < 5.9) st.view.dist = 5.9; // QA18 (was 7.6)
  st.ready();
  return true;
}
