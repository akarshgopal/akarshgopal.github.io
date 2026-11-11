// Tokens-per-parameter as physical piles (object-first). Cited Chinchilla ~20:1 as the mid-action default.
// Scatter of notable models stays in the 2D fallback / optional secondary readout.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, glassMat, plasticMat, addBevelFrame, addBevelBox, makeReveal, roundedMesh } from './materials.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function mat(hex, opts = {}) {
  return softMat(hex, {
    opacity: opts.opacity ?? 1, emissive: opts.emissive, emissiveIntensity: opts.emissiveIntensity,
    shininess: opts.shininess ?? 36, specular: opts.specular ?? 0x555555, side: opts.side,
  });
}

export function tokenBalance3d(el, opt) {
  const ui = opt.ui, colors = ui.C;
  const narrow = w => w < 560;
  // ratio tokens/param — default Chinchilla ~20
  let ratio = 20;
  let tokLabelY = 2.2;
  const OPTIMAL = 20;
  let revealRef = null;

  const st = stage3d(el, {
    ui,
    label: 'Two piles on a desk: model parameters and training tokens. The height ratio is tokens per parameter. Drag sideways to turn; the slider sets the ratio. About 20:1 is compute-optimal (Chinchilla).',
    height: w => (narrow(w) ? Math.round(Math.max(300, w * 0.9)) : Math.round(Math.min(420, w * 0.52))),
    radius: 3.8, radiusY: 2.8, yaw: -0.55, pitch: 0.48,
    target: new THREE.Vector3(0, 1.35, 0),
    fitPad: 1.25,
    fov: 36,
    busy: () => !!(revealRef && !revealRef.done) || ui.isPlaying(),
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef && !revealRef.done) { revealRef.tick(dt); return true; }
      if (!ui.isPlaying()) { drops.forEach(d => (d.m.visible = false)); return false; }
      // mid-action: training tokens keep raining onto the pile
      const top = pileTopY(curLayers);
      drops.forEach(d => {
        d.t += dt / 1.1;
        if (d.t >= 1) { d.t -= 1; d.x = (Math.random() - 0.5) * 0.7; d.z = (Math.random() - 0.5) * 0.7; }
        const e = d.t * d.t;
        d.m.visible = d.t > 0;
        d.m.position.set(1.5 + d.x, top + 1.5 - 1.38 * e, d.z);
        d.m.rotation.set(d.t * 2.1, d.t * 1.3, 0);
      });
      return true;
    },
  });
  if (!st) return false;
  const { scene } = st;
  softLights(scene, { hemi: 0.95, keyI: 1.3, fillI: 0.38, rimI: 0.45, envI: 1.0 });

  const root = new THREE.Group(); scene.add(root);
  // desk + bevel frame
  const desk = roundedMesh(5.2, 0.12, 2.9, metalMat(0xc4a87a, { roughness: 0.45, metalness: 0.35, brush: false }), 0.04);
  desk.position.y = 0; root.add(desk);
  { const lip = roundedMesh(5.35, 0.08, 3.05, metalMat(0xa88860, { roughness: 0.4, metalness: 0.4, brush: false }), 0.03); lip.position.set(0, -0.08, 0); root.add(lip); }
  addBevelFrame(root, 5.15, 2.85, 0.08, metalMat(0xb89868), { t: 0.035, railH: 0.05, overhang: 0.03 });

  // parameter block (left) — dense dark cubes = weights + gold corner pads
  const paramG = new THREE.Group(); paramG.position.set(-1.4, 0.06, 0); root.add(paramG);
  const mParam = mat(0x4a6fd4, { emissive: 0x2a4fb4, emissiveIntensity: 0.12 });
  const mPad = metalMat(0xd8c070);
  for (let y = 0; y < 4; y++) for (let x = 0; x < 3; x++) for (let z = 0; z < 3; z++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), mParam);
    b.position.set((x - 1) * 0.36, 0.2 + y * 0.36, (z - 1) * 0.36);
    paramG.add(b);
    if (y === 3) {
      const lip = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.03, 0.34), metalMat(0x6a8fd4));
      lip.position.copy(b.position); lip.position.y += 0.175; paramG.add(lip);
    }
  }
  addBevelBox(paramG, 1.15, 0.04, 1.15, metalMat(0x3a5fb4), 1.55);

  // token pile (right) — many small cubes, height scales with ratio
  const tokenG = new THREE.Group(); tokenG.position.set(1.5, 0.06, 0); root.add(tokenG);
  const mTok = mat(0x3f9a44, { emissive: 0x2a7a34, emissiveIntensity: 0.1 });
  const tokenMeshes = [];
  const MAX_LAYERS = 24;
  for (let y = 0; y < MAX_LAYERS; y++) {
    for (let x = 0; x < 4; x++) for (let z = 0; z < 4; z++) {
      // sparse on upper layers for organic pile feel
      if (y > 8 && (x + z + y) % 3 === 0) continue;
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), mTok.clone());
      b.position.set((x - 1.5) * 0.26 + (y % 2) * 0.05, 0.14 + y * 0.23, (z - 1.5) * 0.26 + (y % 2) * 0.04);
      b.visible = false;
      tokenG.add(b);
      tokenMeshes.push({ mesh: b, layer: y });
    }
  }

  // falling tokens (mid-action opener)
  let curLayers = 2;
  const drops = [0, -0.36, -0.7].map(t0 => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), mTok);
    m.visible = false; root.add(m);
    return { m, t: t0, x: (Math.random() - 0.5) * 0.7, z: (Math.random() - 0.5) * 0.7 };
  });

  // balance beam / ratio ruler between piles
  const beam = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 0.08), mat(0x6a6058));
  beam.position.set(0.05, 0.55, 1.2); root.add(beam);
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), mat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.4 }));
  marker.position.set(0.05, 0.7, 1.2); root.add(marker);

  const edgeInk = new THREE.LineBasicMaterial({ color: 0x2b2b2a, transparent: true, opacity: 0.2 });
  root.traverse(ch => {
    if (!ch.isMesh || !ch.geometry || ch.geometry.type === 'SphereGeometry') return;
    try { ch.add(new THREE.LineSegments(new THREE.EdgesGeometry(ch.geometry, 30), edgeInk.clone())); } catch (_) {}
  });

  st.label('<span class="c-blue">parameters</span>', () => new THREE.Vector3(-1.4, 1.85, 0), '');
  st.label('<span class="c-green">tokens</span>', () => new THREE.Vector3(2.8, tokLabelY, 0.25), ''); // QA17: beside pile, clear of falling drops
  st.label('~20:1 optimal', () => (Math.abs(ratio - OPTIMAL) < 3 ? new THREE.Vector3(0.05, 1.0, 1.2) : null), '');

  function pileTopY(layers) {
    return 0.14 + Math.max(0, layers - 1) * 0.23 + 0.12;
  }
  function syncPile() {
    // layers ∝ log ratio; hard-cap so top + label stay inside camera frustum
    const layers = clamp(Math.round(2 + Math.log10(Math.max(ratio, 1)) * 8.5), 2, 16);
    curLayers = layers;
    for (const { mesh, layer } of tokenMeshes) mesh.visible = layer < layers;
    const top = pileTopY(layers);
    // lift look-at with the pile so neither crown nor label clips the canvas top
    const lookY = clamp(0.85 + top * 0.35, 1.0, 2.4);
    st.setFocus({ target: new THREE.Vector3(0, lookY, 0), radius: 3.8, radiusY: Math.max(2.4, top * 0.85 + 0.6), pitch: 0.46 });
    const u = clamp(Math.log10(ratio / 2) / Math.log10(100 / 2), 0, 1);
    marker.position.x = -1.0 + u * 2.1;
    tokLabelY = Math.max(0.5, top * 0.62);
    st.invalidate();
  }

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paint() {
    const vs = ratio >= OPTIMAL
      ? (ratio > OPTIMAL * 1.5 ? 'past compute-optimal — more tokens than Chinchilla would spend on this model size' : 'near compute-optimal (Chinchilla ~20 tokens per parameter)')
      : 'under-trained vs Chinchilla — more parameters than the token budget warrants';
    ro.innerHTML = `<b>${ratio >= 10 ? Math.round(ratio) : ratio.toPrecision(2)} tokens per parameter</b> · ${vs}.`;
    syncPile();
  }
  ui.slider(ctl, {
    label: 'Tokens / param', name: 'ratio', min: 1, max: 200, step: 1, value: ratio, color: colors.learn || colors.cyan || '#3f9a44',
    fmt: v => `${v}×`,
    oninput: v => { ratio = v; paint(); },
  });
  ui.hint(el, 'raise toward 20× (Chinchilla)');
  paint();
  st.view.dist = Math.max(st.view.dist, 7.6); // QA17: was 9.5 (pile too small)
    revealRef = makeReveal([
    { obj: desk, delay: 0.0, drop: 0.15 },
    { obj: paramG, delay: 0.15, drop: 0.35 },
    { obj: tokenG, delay: 0.35, drop: 0.45 },
  ]);
  st.ready();
  return true;
}
