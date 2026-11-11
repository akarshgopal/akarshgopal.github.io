// One transformer block as four soft-solid stage bricks + token ribbons.
// Mid-action: attention lit; beads march along ribbons.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, plasticMat, addBevelFrame, roundedMesh, makeReveal } from './materials.js';

const STAGES = [
  { name: 'embed', short: 'embed', cost: '1×', col: 0xc4a060, em: 0xa48040 },
  { name: 'attention', short: 'attn', cost: '4×', col: 0x6a9ae0, em: 0x4a7ac0 },
  { name: 'MLP', short: 'MLP', cost: '8×', col: 0x4a6fd4, em: 0x2a4fb4 },
  { name: 'unembed', short: 'out', cost: '1×', col: 0x8a6ab8, em: 0x6a4a98 },
];

export function transformer3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  let stage = 1, tPulse = 0, revealRef = null;

  const st = stage3d(el, {
    ui,
    label: 'One transformer block as four stages. Token ribbons feed embed and leave unembed; attention arcs cross the context.',
    height: w => (narrow(w) ? 320 : 300),
    radius: 3.5, radiusY: 1.48, yaw: -0.42, pitch: 0.42, // QA18 fill (was 4.4/1.85)
    target: new THREE.Vector3(1.72, 0.45, 0),
    fitPad: 1.35, fov: 28,
    busy: () => true,
    step(dt) {
      if (revealRef) revealRef.tick(dt);
      tPulse += dt;
      ribbons.forEach((r, i) => {
        const u = (tPulse * 0.35 + i * 0.17) % 1;
        r.bead.position.lerpVectors(r.a, r.b, u);
      });
      arcs.forEach((a, i) => {
        a.mat.opacity = 0.15 + 0.35 * (stage === 1 ? (0.5 + 0.5 * Math.sin(tPulse * 3 + i)) : 0.25);
      });
      st.invalidate();
      return true;
    },
    onShow() { revealRef?.arm(); st && st.invalidate(); },
  });
  if (!st) return false;
  softLights(st.scene, { hemi: 1.35, keyI: 1.15, fillI: 0.4, rimI: 0.32 });
  const root = new THREE.Group(); st.scene.add(root);

  // QA18: board + frame share one centre under the 4 bricks (frame was at x=0 and ran off-stage left)
  const BX = 1.72;
  const board = roundedMesh(4.7, 0.12, 2.0, plasticMat(0xe8eae6), 0.05);
  board.position.set(BX, -0.18, 0); root.add(board);
  const boardLip = roundedMesh(4.75, 0.04, 2.05, metalMat(0xd0d4cc, { roughness: 0.38 }), 0.03);
  boardLip.position.set(BX, -0.12, 0); root.add(boardLip);
  { const fg = new THREE.Group(); fg.position.x = BX; root.add(fg);
    addBevelFrame(fg, 4.65, 1.95, -0.1, metalMat(0xc8ccc4), { t: 0.03, railH: 0.05, overhang: 0.025 }); }

  const bricks = [];
  STAGES.forEach((s, i) => {
    const g = new THREE.Group(); g.position.set(i * 1.15, 0, 0); root.add(g);
    const mat = metalMat(s.col, { emissive: s.em, emissiveIntensity: 0.1, roughness: 0.42, metalness: 0.55, brush: true });
    const h = 0.55 + (s.cost === '8×' ? 0.45 : s.cost === '4×' ? 0.25 : 0);
    const body = roundedMesh(0.9, h, 1.0, mat, 0.05);
    body.position.y = h / 2; g.add(body);
    addBevelFrame(g, 0.9, 1.0, h + 0.02, metalMat(0xb8c0c8), { t: 0.035, railH: 0.05, overhang: 0.025 });
    // face vents both sides + front strata for Watch continuity
    for (const sx of [-1, 1]) {
      for (let v = 0; v < 3; v++) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.035, h * 0.55, 0.18), metalMat(0xa8b0b8));
        slot.position.set(sx * 0.42, h * 0.35, -0.2 + v * 0.2); g.add(slot);
      }
    }
    for (let v = 0; v < 4; v++) {
      const strata = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.03, 0.03), metalMat(0x9aa3ad));
      strata.position.set(0, 0.12 + v * (h * 0.2), 0.52); g.add(strata);
    }
    // top activity LEDs
    for (const zx of [-0.3, 0.3]) {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), softMat(s.col, { emissive: s.em, emissiveIntensity: 0.35 }));
      led.position.set(zx, h + 0.08, -0.35); g.add(led);
    }
    bricks.push({ g, body, mat, h });
    if (i < 3) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.22, 12), metalMat(0x9aa3ad, { shininess: 70 }));
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(i * 1.15 + 0.55, 0.38, 0); root.add(pipe);
      for (const fx of [i * 1.15 + 0.45, i * 1.15 + 0.65]) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 12), metalMat(0x8a9098));
        col.rotation.z = Math.PI / 2; col.position.set(fx, 0.38, 0); root.add(col);
      }
    }
  });

  // token ribbons: inbound → embed, outbound ← unembed, and stage-to-stage
  const ribbons = [];
  const mRib = softMat(0xe8c84a, { emissive: 0xe8c84a, emissiveIntensity: 0.25, opacity: 0.85, shininess: 20 });
  function addRibbon(ax, ay, az, bx, by, bz) {
    const a = new THREE.Vector3(ax, ay, az), b = new THREE.Vector3(bx, by, bz);
    const len = a.distanceTo(b);
    const rib = new THREE.Mesh(new THREE.BoxGeometry(len, 0.04, 0.1), mRib.clone());
    rib.position.copy(a).add(b).multiplyScalar(0.5);
    rib.lookAt(b); rib.rotateY(Math.PI / 2);
    // simpler orientation along X
    rib.rotation.set(0, 0, 0);
    rib.scale.set(1, 1, 1);
    const dx = bx - ax, dz = bz - az;
    rib.geometry.dispose();
    rib.geometry = new THREE.BoxGeometry(Math.hypot(dx, dz) || len, 0.035, 0.09);
    rib.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    rib.rotation.y = -Math.atan2(dz, dx);
    root.add(rib);
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), softMat(0xffcc66, { emissive: 0xffaa33, emissiveIntensity: 0.55 }));
    bead.position.copy(a); root.add(bead);
    ribbons.push({ a, b, bead, rib });
  }
  // inbound tokens (fan of parallel strands)
  addRibbon(-1.15, 0.35, -0.55, -0.35, 0.35, -0.3);
  addRibbon(-1.15, 0.28, -0.2, -0.35, 0.4, -0.05);
  addRibbon(-1.15, 0.42, 0.15, -0.35, 0.3, 0.2);
  addRibbon(-1.15, 0.32, 0.45, -0.35, 0.38, 0.4);
  addRibbon(-1.15, 0.48, 0.65, -0.35, 0.28, 0.55);
  // between stages (stacked pairs)
  addRibbon(0.45, 0.55, 0.35, 0.85, 0.65, 0.35);
  addRibbon(0.45, 0.4, -0.25, 0.85, 0.5, -0.25);
  addRibbon(1.6, 0.7, -0.35, 2.0, 0.85, -0.35);
  addRibbon(1.6, 0.55, 0.3, 2.0, 0.7, 0.3);
  addRibbon(2.75, 0.95, 0.25, 3.15, 0.55, 0.25);
  addRibbon(2.75, 0.75, -0.3, 3.15, 0.45, -0.3);
  // outbound
  addRibbon(3.85, 0.4, -0.4, 4.7, 0.35, -0.55);
  addRibbon(3.85, 0.35, -0.05, 4.7, 0.38, 0.05);
  addRibbon(3.85, 0.42, 0.3, 4.7, 0.4, 0.4);
  addRibbon(3.85, 0.3, 0.55, 4.7, 0.32, 0.6);

  // attention arcs (denser context links over attn brick)
  const arcs = [];
  for (let i = 0; i < 11; i++) {
    const mat = softMat(0x6a9ae0, { opacity: 0.28, emissive: 0x4a7ac0, emissiveIntensity: 0.22, shininess: 10 });
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.28 + i * 0.07, 0.015, 6, 28, Math.PI * 0.95), mat);
    arc.rotation.x = Math.PI / 2; arc.rotation.z = -0.55 + i * 0.12;
    arc.position.set(1.15, bricks[1].h + 0.22 + (i % 4) * 0.05, -0.15 + (i % 3) * 0.1);
    root.add(arc); arcs.push({ mesh: arc, mat });
  }

  // quiet labels — pull off mesh tops; out lives in prose only
  st.label('<span class="c-yellow">embed</span>', () => new THREE.Vector3(0, bricks[0].h + 0.55, -0.15), '');
  st.label('<span class="c-blue">attn</span>', () => new THREE.Vector3(1.15, bricks[1].h + 0.7, -0.15), '');
  st.label('<span class="c-blue">MLP</span>', () => new THREE.Vector3(2.3, bricks[2].h + 0.55, -0.15), '');

  function sync() {
    bricks.forEach((b, i) => {
      const on = i === stage;
      b.mat.emissiveIntensity = on ? 0.42 : 0.08;
      b.body.scale.setScalar(on ? 1.06 : 1);
    });
    paintRo();
    st.invalidate();
  }

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  const tips = [
    'Tokens become vectors — table lookup, small next to what follows.',
    'Every token looks at earlier ones. Cost grows with context × width.',
    'Feed-forward MLP dominates FLOPs in a dense block (~⅔ of arithmetic).',
    'Vectors → next-token logits. Softmax over the vocabulary.',
  ];
  function paintRo() {
    ro.innerHTML = `<b class="c-blue">${STAGES[stage].name}</b> (~${STAGES[stage].cost}): ${tips[stage]} Dense forward ≈ <b>2N</b> FLOPs/token.`;
  }
  ui.slider(ctl, {
    label: 'Stage', name: 'xf-stage', min: 0, max: 3, step: 1, value: stage,
    color: ui.C.learn, fmt: v => STAGES[Math.round(v)].short,
    oninput: v => { stage = Math.round(v); sync(); },
  });
  ui.hint(el, '<span class="c-yellow">token</span> ribbons · height ≈ FLOPs · mid on <span class="c-blue">attention</span> · out in prose');
  sync();
  const reveal = makeReveal(
    bricks.map((b, i) => ({ obj: b.g, delay: i * 0.1, drop: 0.35, fromScale: 0.45 })),
    { dur: 0.9 }
  );
  revealRef = reveal; reveal.arm();
  if (st.view.dist < 6.8) st.view.dist = 6.8; // QA18 (was 8.5)
  st.ready();
  return true;
}
