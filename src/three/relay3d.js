// Soft-solid electromechanical relay: coil · armature · contact · lamp.
// Two relays; series = AND, parallel = OR. Mid-action default: A closed, B pulling.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { metalMat, plasticMat, softMat, addBevelFrame, roundedMesh, makeReveal, roundedBoxGeo, paleBoard, greyBoard } from './materials.js';

const approach = (cur, tgt, k, dt) => cur + (tgt - cur) * Math.min(1, k * dt);

export function buildRelay(root, ox, oy, oz, labelHtml) {
  const g = new THREE.Group(); g.position.set(ox, oy, oz); root.add(g);
  const mBase = greyBoard(0xcc); // W9 true light grey (warm-light compensated)
  const mCoil = metalMat(0x4a6fd4, { emissive: 0x2a4fb4, emissiveIntensity: 0.05 });
  const mWind = metalMat(0xc4a060, { shininess: 55, specular: 0x886633 });
  const mArm = metalMat(0x9aa2ac, { shininess: 60 });
  const mContact = metalMat(0xd8d0c0, { shininess: 80, specular: 0xffffff });

  // base plate
  const base = roundedMesh(1.4, 0.1, 0.9, mBase, 0.04);
  base.position.y = 0; g.add(base);
  // coil core
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.85, 20), mCoil);
  core.rotation.z = Math.PI / 2; core.position.set(0, 0.32, 0); g.add(core);
  // windings
  for (let i = 0; i < 9; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 8, 20), mWind);
    ring.rotation.y = Math.PI / 2; ring.position.set(-0.36 + i * 0.09, 0.32, 0); g.add(ring);
  }
  // yoke / frame
  const yokeL = new THREE.Mesh(roundedBoxGeo(0.08, 0.55, 0.55, 0.025), metalMat(0xa6acb4) /* QA18 T9 grey (was 0x5a6068) */);
  yokeL.position.set(-0.55, 0.35, 0); g.add(yokeL);
  const yokeR = new THREE.Mesh(roundedBoxGeo(0.08, 0.55, 0.55, 0.025), metalMat(0xa6acb4));
  yokeR.position.set(0.55, 0.35, 0); g.add(yokeR);

  // armature pivot + bar (animated)
  const armRoot = new THREE.Group();
  armRoot.position.set(0.62, 0.62, 0); g.add(armRoot);
  const arm = new THREE.Mesh(roundedBoxGeo(0.95, 0.08, 0.22, 0.025), mArm);
  arm.position.set(0.4, 0, 0); armRoot.add(arm);
  // bevel on armature
  const armLip = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.02, 0.24), metalMat(0x8a9098));
  armLip.position.set(0.4, 0.05, 0); armRoot.add(armLip);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 14), mContact);
  tip.position.set(0.88, 0, 0); armRoot.add(tip);

  // fixed contact
  const fixed = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), mContact);
  fixed.position.set(1.35, 0.48, 0); g.add(fixed);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 10), metalMat(0x8a9098));
  post.position.set(1.35, 0.28, 0); g.add(post);

  return { g, armRoot, tip, core, mCoil, label: labelHtml };
}

export function relay3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  const stState = { a: true, b: true, arm: [0.92, 0.35], series: true }; // mid-action
  let clickFlash = [0, 0];
  let revealRef = null;

  const stage = stage3d(el, {
    ui,
    label: 'Two soft-solid relays. Each coil pulls an armature that closes a contact. Series = AND, parallel = OR.',
    height: w => (narrow(w) ? 420 : 380),
    radius: 2.75, radiusY: 1.55, yaw: -0.42, pitch: 0.36,
    target: new THREE.Vector3(0.5, 0.45, 0.15),
    fitPad: 1.24, fov: 28,
    busy: () => true,
    onShow() { revealRef?.arm(); stage && stage.invalidate(); },
    step(dt) {
      if (revealRef && !revealRef.done) { revealRef.tick(dt); sync(); return true; }
      let moving = false;
      [stState.a, stState.b].forEach((on, i) => {
        const target = on ? 1 : 0;
        const prev = stState.arm[i];
        const v = approach(prev, target, 12, dt);
        stState.arm[i] = Math.abs(v - target) < 0.002 ? target : v;
        if (Math.abs(stState.arm[i] - target) > 0.002) moving = true;
        if (prev < 0.9 && stState.arm[i] >= 0.9) clickFlash[i] = 0.45;
        if (clickFlash[i] > 0) clickFlash[i] -= dt;
      });
      sync();
      return moving || clickFlash[0] > 0 || clickFlash[1] > 0 || ui.isPlaying();
    },
  });
  if (!stage) return false;
  softLights(stage.scene, { hemi: 1.4, keyI: 1.2, fillI: 0.45, rimI: 0.32 });

  const root = new THREE.Group(); stage.scene.add(root);
  // board
  const board = roundedMesh(4.6, 0.12, 2.6, greyBoard(0xde), 0.05) /* QA18 light neutral */;
  board.position.set(0.5, -0.12, 0.05); root.add(board);
  addBevelFrame(root, 4.5, 2.5, -0.04, greyBoard(0xc4, { lift: 0.3 }), { t: 0.035, railH: 0.05, overhang: 0.03 });

  const rA = buildRelay(root, -1.3, 0, 0.2, 'A');
  const rB = buildRelay(root, 0.9, 0, 0.2, 'B');
  const relays = [rA, rB];

  // lamp
  const lampG = new THREE.Group(); lampG.position.set(2.6, 0.35, 0.2); root.add(lampG);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), softMat(0xe4e4e0, { shininess: 40 }));
  lampG.add(bulb);
  const baseL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.2, 14), metalMat(0x8a9098));
  baseL.position.y = -0.3; lampG.add(baseL);

  // wire traces (schematic ribbons on board)
  const mWireOff = metalMat(0x5a6870, { shininess: 40 });
  const mWireOn = metalMat(0xe8c84a, { emissive: 0xe8c84a, emissiveIntensity: 0.45, shininess: 50 });
  const wires = [];
  function addWire(x0, z0, x1, z1) {
    const dx = x1 - x0, dz = z1 - z0, len = Math.hypot(dx, dz);
    const w = new THREE.Mesh(new THREE.BoxGeometry(len, 0.03, 0.05), mWireOff.clone());
    w.position.set((x0 + x1) / 2, 0.02, (z0 + z1) / 2);
    w.rotation.y = -Math.atan2(dz, dx);
    root.add(w); wires.push(w); return w;
  }
  addWire(-1.3, 0.2, 0.9, 0.2);
  addWire(0.9, 0.2, 2.4, 0.2);
  addWire(-1.3, -0.5, 2.4, -0.5);

  stage.label('<span class="c-orange">A</span>', () => new THREE.Vector3(-1.3, 0.85, 0.2), '');
  stage.label('<span class="c-orange">B</span>', () => new THREE.Vector3(0.9, 0.85, 0.2), '');
  stage.label('<span class="c-yellow">lamp</span>', () => new THREE.Vector3(2.6, 0.85, 0.2), '');
  const clickLabels = [
    stage.label('<span class="c-orange">click</span>', () => new THREE.Vector3(-0.1, 0.85, 0.2), ''),
    stage.label('<span class="c-orange">click</span>', () => new THREE.Vector3(2.1, 0.85, 0.2), ''),
  ];

  // pickable keys
  const keys = [];
  [[-1.3, -1.0], [0.9, -1.0]].forEach(([x, z], i) => {
    const k = new THREE.Mesh(roundedBoxGeo(0.45, 0.18, 0.45, 0.05), plasticMat(0xd8dce6, { emissive: 0x000000, emissiveIntensity: 0 }));
    k.position.set(x, 0.05, z); k.userData.key = i; root.add(k); keys.push(k);
  });

  function sync() {
    const rest = -0.42, closed = 0.02;
    relays.forEach((r, i) => {
      const pull = stState.arm[i];
      r.armRoot.rotation.z = rest + (closed - rest) * pull;
      const on = [stState.a, stState.b][i];
      r.mCoil.emissiveIntensity = on ? 0.35 : 0.05;
      r.mCoil.color.setHex(on ? 0x6a9ae0 : 0x4a6fd4);
      keys[i].material.emissive = new THREE.Color(on ? 0x4a6fd4 : 0x000000);
      keys[i].material.emissiveIntensity = on ? 0.25 : 0;
      keys[i].position.y = on ? 0.0 : 0.05;
      clickLabels[i].el.style.opacity = clickFlash[i] > 0 ? String(Math.min(1, clickFlash[i] * 3)) : '0';
    });
    const closedA = stState.arm[0] > 0.92, closedB = stState.arm[1] > 0.92;
    const lit = stState.series ? closedA && closedB : closedA || closedB;
    bulb.material.emissive = new THREE.Color(lit ? 0xe8a020 : 0x000000);
    bulb.material.emissiveIntensity = lit ? 0.7 : 0;
    bulb.material.color.setHex(lit ? 0xf2c84f : 0xe4e4e0);
    wires.forEach((w, i) => {
      const on = lit || (i === 0 && closedA);
      w.material.color.copy(on ? mWireOn.color : mWireOff.color);
      w.material.emissive.copy(on ? mWireOn.emissive : mWireOff.emissive);
      w.material.emissiveIntensity = on ? 0.4 : 0;
    });
    paintRo();
    stage.invalidate();
  }

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paintRo() {
    const lit = stState.series
      ? stState.arm[0] > 0.92 && stState.arm[1] > 0.92
      : stState.arm[0] > 0.92 || stState.arm[1] > 0.92;
    ro.innerHTML = stState.series
      ? `Series = <b>AND</b>: both <span class="c-blue">coils</span> must pull. Lamp is <b>${lit ? 'on' : 'off'}</b>.`
      : `Parallel = <b>OR</b>: either <span class="c-blue">armature</span> closes the lamp. Lamp is <b>${lit ? 'on' : 'off'}</b>.`;
  }
  if (ui.segmented) {
    ui.segmented(ctl, {
      label: 'Contacts', value: true,
      options: [
        { label: 'series (AND)', value: true, name: 'rl3-ser' },
        { label: 'parallel (OR)', value: false, name: 'rl3-par' },
      ],
      onchange: v => { stState.series = v; sync(); stage.kick(); },
    });
  }
  ui.button(ctl, 'Toggle A', () => { stState.a = !stState.a; stage.kick(); }, { name: 'rl3-a' });
  ui.button(ctl, 'Toggle B', () => { stState.b = !stState.b; stage.kick(); }, { name: 'rl3-b' });
  ui.hint(el, 'tap keys or buttons · watch the <span class="c-blue">armature</span> click');

  // tap keys
  stage.canvas.addEventListener('pointerup', e => {
    // use stage's pick via ray — simpler: hit test keys with raycaster
  });
  // wire pickable via onTap if we set pickable — stage3d supports o.pickable + o.onTap at create time
  // re-bind: use button + also ray on canvas
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  stage.canvas.addEventListener('click', e => {
    const r = stage.canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, stage.camera);
    const hit = ray.intersectObjects(keys, true)[0];
    if (hit) {
      const i = hit.object.userData.key;
      if (i === 0) stState.a = !stState.a; else stState.b = !stState.b;
      stage.kick();
    }
  });

  revealRef = makeReveal([
    { obj: board, delay: 0.0, drop: 0.2 },
    { obj: rA.g, delay: 0.1, drop: 0.28 },
    { obj: rB.g, delay: 0.25, drop: 0.28 },
    { obj: lampG, delay: 0.4, drop: 0.22 },
  ]);
  sync();
  if (stage.view.dist < 6.0) stage.view.dist = 6.0;
  stage.ready();
  return true;
}
