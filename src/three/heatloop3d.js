// Heat path: die → (conduction) cold plate → CDU → outdoor reject, as two loops sharing the CDU:
// TCS (plate ↔ CDU) and FWS (CDU ↔ tower/dry cooler) — ASHRAE TC 9.9 liquid-cooling terms. Warm legs orange, cooled returns cyan.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, plasticMat, addBevelFrame, roundedMesh, makeReveal } from './materials.js';

export function heatLoop3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  let u = 0.4, revealRef = null;

  const st = stage3d(el, {
    ui,
    label: 'Heat leaves the die through a cold plate, a CDU, and an outdoor reject. A pulse circulates the loop.',
    height: w => (narrow(w) ? 230 : 320), // the loop is long and flat: a tall phone stage was mostly empty
    radius: 3.65, radiusY: 1.53, yaw: -0.4, pitch: 0.36, // QA18 fill (was 4.3/1.8)
    target: new THREE.Vector3(2.6, 0.4, 0.1),
    fitPad: 1.26, fov: 26,
    busy: () => true,
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef) revealRef.tick(dt);
      u = (u + dt * 0.18) % 1;
      pulse.position.lerpVectors(path[Math.floor(u * (path.length - 1))], path[Math.min(path.length - 1, Math.floor(u * (path.length - 1)) + 1)], (u * (path.length - 1)) % 1);
      stages.forEach((s, i) => {
        const d = Math.abs(i / (stages.length - 1) - u);
        s.mat.emissiveIntensity = d < 0.2 ? 0.35 : 0.06;
      });
      st.invalidate();
      return true;
    },
  });
  if (!st) return false;
  softLights(st.scene, { hemi: 1.35, keyI: 1.1, fillI: 0.4, rimI: 0.3 });
  const root = new THREE.Group(); st.scene.add(root);

  // QA18: board + frame centred under the 4 stages (frame was at x=0 and ran off-stage left)
  const BX = 2.6;
  const board = roundedMesh(6.5, 0.1, 1.9, plasticMat(0xe8eae6), 0.04);
  board.position.set(BX, -0.15, 0); root.add(board);
  { const fg = new THREE.Group(); fg.position.x = BX; root.add(fg);
    addBevelFrame(fg, 6.4, 1.8, -0.08, metalMat(0xd0d4cc), { t: 0.03, railH: 0.05, overhang: 0.025 }); }

  const stages = [];
  const stageGs = [];
  const defs = [
    { name: 'die', x: 0, col: 0xe07a3a, em: 0xe07a3a },
    { name: 'plate', x: 1.6, col: 0x4ec4c0, em: 0x2aa8a4 },
    { name: 'CDU', x: 3.4, col: 0x4a6fd4, em: 0x2a4fb4 },
    { name: 'out', x: 5.2, col: 0x3f9a44, em: 0x2a7a34 },
  ];
  defs.forEach((d, i) => {
    const g = new THREE.Group(); g.position.set(d.x, 0, 0); root.add(g); stageGs.push(g);
    const mat = metalMat(d.col, { emissive: d.em, emissiveIntensity: 0.12, roughness: 0.4, metalness: 0.6 });
    const body = roundedMesh(1.0, 0.7, 1.0, mat, 0.05);
    body.position.set(0, 0.35, 0); g.add(body);
    addBevelFrame(g, 1.0, 1.0, 0.72, metalMat(0xb0b8c0), { t: 0.04, railH: 0.06, overhang: 0.03 });
    for (const sz of [-1, 1]) {
      for (let v = 0; v < 4; v++) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.03), metalMat(0x9aa4b0));
        slot.position.set(0, 0.15 + v * 0.15, sz * 0.52); g.add(slot);
      }
    }
    // gauge / LED strip on front
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.04), softMat(d.col, { emissive: d.em, emissiveIntensity: 0.45 }));
    led.position.set(0, 0.55, 0.52); g.add(led);
    stages.push({ mat, body, g });
    if (i === 0) {
      // die → plate is conduction through a copper block, not a pipe
      const cu = roundedMesh(0.62, 0.5, 0.7, metalMat(0xc87a40, { emissive: 0xe07a3a, emissiveIntensity: 0.15, roughness: 0.35, metalness: 0.8 }), 0.03);
      cu.position.set((d.x + defs[1].x) / 2, 0.35, 0); root.add(cu);
    } else if (i < defs.length - 1) {
      // warm leg (top): plate → CDU is the TCS loop, CDU → outdoor the FWS loop
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.55, 14), metalMat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.18, roughness: 0.28, metalness: 0.6 }));
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set((d.x + defs[i + 1].x) / 2, 0.4, 0); root.add(pipe);
      for (const fx of [d.x + 0.55, defs[i + 1].x - 0.55]) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.09, 12), metalMat(0x8a9098));
        col.rotation.z = Math.PI / 2; col.position.set(fx, 0.4, 0); root.add(col);
        const clamp = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 6, 14), metalMat(0x6a7078));
        clamp.rotation.y = Math.PI / 2; clamp.position.set(fx, 0.4, 0); root.add(clamp);
      }
    }
  });
  // cooled return legs (cyan), one per loop: CDU → plate (TCS) and outdoor → CDU (FWS)
  for (const [x0, x1] of [[1.6, 3.4], [3.4, 5.2]]) {
    const ret = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0 - 0.2, 0.07, 0.07), metalMat(0x4ec4c0, { emissive: 0x2aa8a4, emissiveIntensity: 0.15, roughness: 0.35 }));
    ret.position.set((x0 + x1) / 2, 0.05, 0.7); root.add(ret);
    for (const x of [x0 + 0.1, x1 - 0.1]) {
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), metalMat(0x8a9098));
      elbow.position.set(x, 0.05, 0.7); root.add(elbow);
    }
  }

  const path = defs.map(d => new THREE.Vector3(d.x, 0.85, 0));
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), softMat(0xffcc66, { emissive: 0xffaa33, emissiveIntensity: 0.6 }));
  root.add(pulse);

  // outdoor fan shroud + blades hint
  const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.2, 16), metalMat(0x8a9098));
  fan.position.set(5.2, 0.95, 0); root.add(fan);
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.06), metalMat(0xa0a8b0));
    blade.position.set(5.2, 1.07, 0);
    blade.rotation.y = (i / 4) * Math.PI * 2;
    root.add(blade);
  }
  // die silicon top + bond pads
  const dieTop = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.7), softMat(0x5a6878));
  dieTop.position.set(0, 0.75, 0); root.add(dieTop);
  for (const [cx, cz] of [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]]) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8), metalMat(0xc4a060));
    pad.position.set(cx, 0.81, cz); root.add(pad);
  }
  // CDU face ports
  for (const z of [-0.35, 0.35]) {
    const port = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), metalMat(0x7ec8c4));
    port.rotation.x = Math.PI / 2; port.position.set(3.4, 0.55, z); root.add(port);
  }

  // every stage named in its own colour, sitting on its part (T8): the caption's four words, left to right
  st.label('<span class="c-orange">die</span>', () => new THREE.Vector3(0, 0.95, 0), '');
  st.label('<span class="c-cyan">cold plate</span>', () => new THREE.Vector3(1.6, 0.85, 0), '');
  st.label('<span class="c-blue">CDU</span>', () => new THREE.Vector3(3.4, 0.85, 0), '');
  st.label('<span class="c-green">outdoor reject</span>', () => new THREE.Vector3(5.2, 1.15, 0), '');
  st.label('TCS loop', () => (narrow(st.wrap.clientWidth) ? null : new THREE.Vector3(2.5, 0.05, 0.95)), ''); // phone: named in the caption only
  st.label('FWS loop', () => (narrow(st.wrap.clientWidth) ? null : new THREE.Vector3(4.3, 0.05, 0.95)), '');

  const ro = ui.readout(el);
  ro.innerHTML = 'Heat conducts from the <span class="c-orange">die</span> into the <span class="c-cyan">cold plate</span>; coolant carries it to the <span class="c-blue">CDU</span> (TCS loop), and facility water carries it on to the <span class="c-green">outdoor reject</span> (FWS loop). <span class="c-orange">Warm</span> legs go out on top, <span class="c-cyan">cooled</span> legs return in front.';
  ui.hint(el, 'drag to turn · warm legs orange, cooled legs cyan');
  const reveal = makeReveal(
    stageGs.map((g, i) => ({ obj: g, delay: i * 0.12, drop: 0.3, fromScale: 0.5 })),
    { dur: 0.85 }
  );
  revealRef = reveal; reveal.arm();
  if (st.view.dist < 6.8) st.view.dist = 6.8; // QA18 (was 8.0)
  st.ready();
  return true;
}
