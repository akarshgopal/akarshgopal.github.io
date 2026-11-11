// Relay cascade: A's contact energises B's coil — soft solids, mid-action A closed / B pulling.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { metalMat, plasticMat, softMat, addBevelFrame, roundedMesh, makeReveal, roundedBoxGeo, paleBoard, greyBoard } from './materials.js';
import { buildRelay } from './relay3d.js';

const approach = (cur, tgt, k, dt) => cur + (tgt - cur) * Math.min(1, k * dt);

export function cascade3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  const stState = { a: true, arm: [0.92, 0.55] }; // mid-action
  let revealRef = null;

  const st = stage3d(el, {
    ui,
    label: 'Relay cascade: the first contact energises the second coil. Logic stacks without a hand on the second key.',
    height: w => (narrow(w) ? 360 : 320),
    radius: 2.6, radiusY: 1.4, yaw: -0.4, pitch: 0.36,
    target: new THREE.Vector3(0.5, 0.55, 0.2),
    fitPad: 1.15, fov: 26,
    busy: () => true,
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef && !revealRef.done) { revealRef.tick(dt); sync(); return true; }
      const aOn = stState.a, bOn = stState.arm[0] > 0.9;
      [[aOn, 0], [bOn, 1]].forEach(([on, i]) => {
        const target = on ? 1 : 0;
        const v = approach(stState.arm[i], target, 10, dt);
        stState.arm[i] = Math.abs(v - target) < 0.002 ? target : v;
      });
      sync();
      return true;
    },
  });
  if (!st) return false;
  softLights(st.scene, { hemi: 1.4, keyI: 1.2, fillI: 0.45, rimI: 0.32 });
  const root = new THREE.Group(); st.scene.add(root);

  const board = roundedMesh(4.4, 0.12, 2.1, greyBoard(0xde), 0.05) /* QA18 light neutral */;
  board.position.set(0.55, -0.1, -0.05); root.add(board);
  addBevelFrame(root, 4.3, 2.0, -0.02, greyBoard(0xc4, { lift: 0.3 }), { t: 0.035, railH: 0.05, overhang: 0.03 });

  const rA = buildRelay(root, -1.2, 0, 0.55, 'A');
  const rB = buildRelay(root, 0.7, 0, -0.55, 'B');
  const relays = [rA, rB];

  // board copper traces under the cascade
  [[-1.6, 0.55], [-0.4, 0.2], [0.9, -0.35], [2.0, -0.4]].forEach(([x, z], i, arr) => {
    if (i === arr.length - 1) return;
    const [x2, z2] = arr[i + 1];
    const dx = x2 - x, dz = z2 - z, len = Math.hypot(dx, dz);
    const tr = new THREE.Mesh(new THREE.BoxGeometry(len, 0.02, 0.07), metalMat(0xc9a84c, { shininess: 55 }));
    tr.position.set((x + x2) / 2, -0.04, (z + z2) / 2);
    tr.rotation.y = -Math.atan2(dz, dx); root.add(tr);
  });

  // cascade ribbon A tip → B coil (dual strand)
  const casc = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.08), metalMat(0xe8c84a, { emissive: 0xe8c84a, emissiveIntensity: 0.2 }));
  casc.position.set(-0.15, 0.55, 0.05); casc.rotation.y = -0.55; root.add(casc);
  const casc2 = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.03, 0.05), metalMat(0xd4b04a, { emissive: 0xe8c84a, emissiveIntensity: 0.12 }));
  casc2.position.set(-0.15, 0.48, 0.12); casc2.rotation.y = -0.55; root.add(casc2);
  // glowing beads along cascade
  const cascBeads = [];
  for (let i = 0; i < 3; i++) {
    const bd = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), softMat(0xffcc66, { emissive: 0xffaa33, emissiveIntensity: 0.4 }));
    bd.position.set(-0.9 + i * 0.55, 0.58, 0.35 - i * 0.28); root.add(bd); cascBeads.push(bd);
  }

  // lamp + pedestal
  const lampG = new THREE.Group(); lampG.position.set(2.5, 0.35, -0.4); root.add(lampG);
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.12, 16), metalMat(0x8a9098));
  lampBase.position.y = -0.28; lampG.add(lampBase);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 18), softMat(0xe4e4e0, { shininess: 40 }));
  lampG.add(bulb);
  // lamp feed wire
  const feed = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.03, 0.05), metalMat(0xc9a84c));
  feed.position.set(1.85, 0.12, -0.4); root.add(feed);

  const key = new THREE.Mesh(roundedBoxGeo(0.45, 0.18, 0.45, 0.05), plasticMat(0xd8dce6, { emissive: 0x000000, emissiveIntensity: 0 }));
  key.position.set(-1.2, 0.05, 1.05); root.add(key);
  const keyStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 10), metalMat(0x9aa3ad));
  keyStem.position.set(-1.2, -0.02, 1.05); root.add(keyStem);

  st.label('<span class="c-orange">A</span>', () => new THREE.Vector3(-1.2, 0.85, 0.55), '');
  st.label('<span class="c-orange">B</span> <span class="c-grey">driven</span>', () => new THREE.Vector3(0.7, 0.85, -0.55), '');
  st.label('<span class="c-yellow">lamp</span>', () => new THREE.Vector3(2.5, 0.85, -0.4), '');
  st.label('<span class="c-orange">cascade</span>', () => new THREE.Vector3(-0.1, 0.85, 0.2), '');

  function sync() {
    const rest = -0.42, closed = 0.02;
    relays.forEach((r, i) => {
      const pull = stState.arm[i];
      r.armRoot.rotation.z = rest + (closed - rest) * pull;
      const on = i === 0 ? stState.a : stState.arm[0] > 0.9;
      r.mCoil.emissiveIntensity = on ? 0.35 : 0.05;
      r.mCoil.color.setHex(on ? 0x6a9ae0 : 0x4a6fd4);
    });
    const lit = stState.arm[1] > 0.9;
    bulb.material.emissive = new THREE.Color(lit ? 0xe8a020 : 0x000000);
    bulb.material.emissiveIntensity = lit ? 0.7 : 0;
    bulb.material.color.setHex(lit ? 0xf2c84f : 0xe4e4e0);
    casc.material.emissiveIntensity = stState.arm[0] > 0.9 ? 0.55 : 0.12;
    casc2.material.emissiveIntensity = stState.arm[0] > 0.9 ? 0.4 : 0.08;
    cascBeads.forEach((bd, i) => {
      const on = stState.arm[0] > 0.9;
      bd.material.emissiveIntensity = on ? 0.65 : 0.1;
      bd.visible = on || i === 0;
    });
    key.material.emissiveIntensity = stState.a ? 0.25 : 0;
    key.position.y = stState.a ? 0 : 0.05;
    paintRo();
    st.invalidate();
  }

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paintRo() {
    ro.innerHTML = stState.a
      ? `Key A down: coil A pulls → contact feeds <b class="c-blue">coil B</b>. Lamp <b>${stState.arm[1] > 0.9 ? 'on' : 'catching up'}</b>.`
      : `Release A and both armatures fall. Stacked contacts — Shannon depth, lever mass still hurts.`;
  }
  ui.button(ctl, 'Toggle A', () => { stState.a = !stState.a; st.kick(); }, { kind: 'primary', name: 'rc3-a' });
  ui.hint(el, 'one key · <span class="c-orange">cascade</span> throws the second coil');

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  st.canvas.addEventListener('click', e => {
    const r = st.canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, st.camera);
    if (ray.intersectObject(key, true)[0]) { stState.a = !stState.a; st.kick(); }
  });

  revealRef = makeReveal([
    { obj: board, delay: 0.0, drop: 0.2 },
    { obj: rA.g, delay: 0.12, drop: 0.28 },
    { obj: rB.g, delay: 0.28, drop: 0.28 },
    { obj: lampG, delay: 0.42, drop: 0.22 },
    { obj: key, delay: 0.5, drop: 0.15, fromScale: 0.6 },
  ]);
  sync();
  if (st.view.dist < 6.0) st.view.dist = 6.0;
  st.ready();
  return true;
}
