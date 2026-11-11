// Cold plate with inlet/outlet pipes over a die.
// ΔT = P/(ṁ c). Open cutaway so flow + die glow read; pipes stay in frame.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, brassMat, glassMat, plasticMat, addBevelFrame, roundedMesh, makeReveal, paleBoard } from './materials.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const WATER = { rho: 997, cp: 4180 };

function mat(hex, opts = {}) {
  return softMat(hex, {
    opacity: opts.opacity ?? 1, emissive: opts.emissive, emissiveIntensity: opts.emissiveIntensity,
    shininess: opts.shininess ?? 36, specular: opts.specular ?? 0x555555, side: opts.side,
  });
}

function addBox(root, w, h, d, material, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  root.add(m);
  return m;
}

function pipe(root, from, to, color, r = 0.13) {
  const dir = new THREE.Vector3().subVectors(to, from);
  const len = dir.length();
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(r, r, len, 16),
    metalMat(color, { roughness: 0.32, metalness: 0.65, emissive: color, emissiveIntensity: 0.18 })
  );
  m.position.copy(from).add(to).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  root.add(m);
  return m;
}

export function coldPlate3d(el, opt) {
  const ui = opt.ui, colors = ui.C;
  const narrow = w => w < 560;
  let kw = 40.8, Lpm = 50;
  const drops = [];
  const mDot = () => (Lpm / 60000) * WATER.rho;
  const dT = () => kw * 1000 / (mDot() * WATER.cp);

  let die, revealRef = null;
  let pool = [];
  const st = stage3d(el, {
    ui,
    label: 'A cold plate over a hot die with inlet and outlet pipes. Water carries the heat; outlet rise follows ΔT = P / (ṁ c). Drag sideways to turn.',
    height: w => (narrow(w) ? Math.round(Math.max(240, w * 0.64)) : Math.round(Math.min(400, w * 0.5))),
    // Frame includes side pipes — slightly wider radiusY, moderate fitPad
    radius: 3.35, radiusY: 1.95, yaw: -0.42, pitch: 0.48,
    target: new THREE.Vector3(0, 0.42, 0),
    fitPad: 1.28,
    busy: () => true,
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef) revealRef.tick(dt);
      const speed = 0.28 + Lpm * 0.007;
      // sparse spawn into 5 readable lanes (integer indices)
      const NLANES = 5;
      const spawn = (7 + Lpm * 0.18) * dt;
      for (let i = 0; i < spawn; i++) {
        if (drops.length < 60) {
          drops.push({ u: -0.04 - Math.random() * 0.06, lane: Math.floor(Math.random() * NLANES) });
        }
      }
      for (const p of drops) p.u += speed * dt * (0.92 + (p.lane % 3) * 0.04);
      for (let i = drops.length - 1; i >= 0; i--) if (drops[i].u > 1.08) drops.splice(i, 1);
      const hot = clamp(dT() / 25, 0, 1);
      const zOf = (lane) => -0.48 + lane * 0.24; // evenly spaced readable lanes
      for (let i = 0; i < pool.length; i++) {
        const m = pool[i], p = drops[i];
        if (!p) { m.visible = false; continue; }
        m.visible = true;
        m.position.set(-1.05 + p.u * 2.1, 0.56, zOf(p.lane));
        const tt = Math.max(0, (p.u - 0.4) / 0.55) * hot;
        m.material.color.setRGB(0.18 + 0.75 * tt, 0.88 - 0.45 * tt, 0.82 - 0.72 * tt);
        m.material.opacity = 1;
        const s = 0.9 + 0.18 * Math.sin(p.u * 8 + p.lane);
        m.scale.setScalar(s);
      }
      if (die) {
        die.material.emissiveIntensity = 0.45 + 0.35 * Math.min(1, kw / 100) + 0.1 * Math.sin(performance.now() / 160);
      }
      return true;
    },
  });
  if (!st) return false;
  const { scene } = st;
  softLights(scene, { hemi: 0.88, keyI: 1.4, fillI: 0.35, rimI: 0.5, envI: 0.9, glintI: 0.45 });

  const root = new THREE.Group(); scene.add(root);

  // PCB
  const pcb = roundedMesh(4.6, 0.1, 3.0, paleBoard(0xdcdcd8), 0.04) /* QA18 light neutral */;
  pcb.position.set(0, 0, 0); root.add(pcb);
  addBevelFrame(root, 4.5, 2.9, 0.07, metalMat(0xb4b4b0), { t: 0.035, railH: 0.05, overhang: 0.03 });
  for (let i = -4; i <= 4; i++) {
    const tr = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.012, 0.035), metalMat(0xc4a060, { roughness: 0.4 }));
    tr.position.set(0, 0.06, i * 0.28); root.add(tr);
  }

  // Hot die — sits under plate but PEERS out the front cutaway lip
  const dieG = new THREE.Group(); root.add(dieG);
  die = roundedMesh(1.5, 0.16, 1.5, softMat(0xe07a3a, {
    emissive: 0xff6020, emissiveIntensity: 0.7, shininess: 50,
  }), 0.045);
  die.position.set(0, 0.18, 0.25); dieG.add(die);
  addBevelFrame(dieG, 1.5, 1.5, 0.25, metalMat(0xf0a060), { t: 0.025, railH: 0.035, overhang: 0.015 });
  // heat glow halo (additive-ish soft sphere)
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 20, 16),
    softMat(0xff6020, { opacity: 0.1, emissive: 0xff4010, emissiveIntensity: 0.4, shininess: 5 })
  );
  glow.position.set(0, 0.22, 0.25); dieG.add(glow);
  for (let ix = -2; ix <= 2; ix++) for (let iz = -2; iz <= 2; iz++) {
    if (Math.abs(ix) + Math.abs(iz) < 1) continue;
    const pd = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 8), metalMat(0xd8c070));
    pd.position.set(ix * 0.22, 0.25, 0.15 + iz * 0.22); dieG.add(pd);
  }
  const tim = roundedMesh(1.55, 0.04, 1.55, softMat(0x888880), 0.02);
  tim.position.set(0, 0.28, 0.1); root.add(tim);

  // OPEN cutaway cold plate — floor + two side walls + rear + partial lid (NOT a solid slab)
  const plateG = new THREE.Group(); root.add(plateG);
  const mPlate = metalMat(0xb8c4d0, { roughness: 0.28, metalness: 0.85, brushStrength: 1.1 });
  const mFin = metalMat(0x9aabb8, { roughness: 0.35 });
  // floor
  const floor = roundedMesh(2.6, 0.1, 2.0, mPlate, 0.04); floor.position.set(0, 0.36, 0); plateG.add(floor);
  // side walls
  const wallL = roundedMesh(0.14, 0.42, 2.0, mPlate, 0.03); wallL.position.set(-1.25, 0.52, 0); plateG.add(wallL);
  const wallR = roundedMesh(0.14, 0.42, 2.0, mPlate, 0.03); wallR.position.set(1.25, 0.52, 0); plateG.add(wallR);
  // rear wall (front open so die glow + flow read)
  const wallBk = roundedMesh(2.6, 0.42, 0.14, mPlate, 0.03); wallBk.position.set(0, 0.52, -0.95); plateG.add(wallBk);
  // front lip (low) — die peeks under
  const lipF = roundedMesh(2.4, 0.08, 0.12, mPlate, 0.02); lipF.position.set(0, 0.38, 0.95); plateG.add(lipF);
  // NO full-lid bevel — that sealed the cutaway and hid flow. Side rails only.
  for (const [dx, rw, rd] of [[-1.32, 0.04, 2.05], [1.32, 0.04, 2.05]]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(rw, 0.06, rd), metalMat(0xa0b0c0));
    rail.position.set(dx, 0.74, 0); plateG.add(rail);
  }
  for (const [dz, rw, rd] of [[-1.02, 2.6, 0.04]]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(rw, 0.06, rd), metalMat(0xa0b0c0));
    rail.position.set(0, 0.74, dz); plateG.add(rail);
  }
  // 5 readable flow lanes
  const laneZs = [-0.48, -0.24, 0, 0.24, 0.48];
  for (let i = 0; i < laneZs.length - 1; i++) {
    const zMid = (laneZs[i] + laneZs[i + 1]) / 2;
    addBox(plateG, 2.15, 0.16, 0.05, brassMat(0xc87a40, { metalness: 0.6, emissiveIntensity: 0.16, brushStrength: 1.0, envMapIntensity: 0.35 }), 0, 0.5, zMid);
  }
  for (const z of laneZs) {
    addBox(plateG, 2.1, 0.035, 0.18, brassMat(0xd08a50, { metalness: 0.55, emissiveIntensity: 0.18, brushStrength: 1.2, envMapIntensity: 0.4 }), 0, 0.42, z);
  }
  // thin rear translucent strip only — front/mid channel open so particles read
  {
    const lid = roundedMesh(2.35, 0.03, 0.28, metalMat(0xb0bcc8, { roughness: 0.3, opacity: 0.35 }), 0.015);
    lid.position.set(0, 0.74, -0.7); plateG.add(lid);
  }
  // manifolds L/R
  addBox(plateG, 0.18, 0.28, 0.9, metalMat(0x8a9aa8), -1.05, 0.55, 0);
  addBox(plateG, 0.18, 0.28, 0.9, metalMat(0x8a9aa8), 1.05, 0.55, 0);
  for (const [bx, bz] of [[-1.15, -0.85], [1.15, -0.85], [-1.15, 0.85], [1.15, 0.85]]) {
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 10), metalMat(0x6a7078));
    bolt.position.set(bx, 0.78, bz); plateG.add(bolt);
  }

  // Pipes inboard (±1.95) — always opaque, clear of canvas edge
  const pipeG = new THREE.Group(); root.add(pipeG);
  // inlet (cyan) left
  pipe(pipeG, new THREE.Vector3(-1.95, 0.62, 0.3), new THREE.Vector3(-1.15, 0.62, 0.3), 0x1d9a92, 0.17);
  pipe(pipeG, new THREE.Vector3(-1.95, 0.62, 0.3), new THREE.Vector3(-1.95, 0.62, -0.85), 0x1d9a92, 0.17);
  pipe(pipeG, new THREE.Vector3(-1.95, 0.62, -0.85), new THREE.Vector3(-1.95, 0.2, -0.85), 0x1d9a92, 0.17);
  // outlet (orange) right
  pipe(pipeG, new THREE.Vector3(1.15, 0.62, 0.3), new THREE.Vector3(1.95, 0.62, 0.3), 0xdd7424, 0.17);
  pipe(pipeG, new THREE.Vector3(1.95, 0.62, 0.3), new THREE.Vector3(1.95, 0.62, -0.85), 0xdd7424, 0.17);
  pipe(pipeG, new THREE.Vector3(1.95, 0.62, -0.85), new THREE.Vector3(1.95, 0.2, -0.85), 0xdd7424, 0.17);
  // front return loop (visible across open cutaway)
  pipe(pipeG, new THREE.Vector3(-1.0, 0.34, 1.15), new THREE.Vector3(1.0, 0.34, 1.15), 0x2aa8a4, 0.1);
  pipe(pipeG, new THREE.Vector3(-1.0, 0.34, 1.15), new THREE.Vector3(-1.0, 0.34, 0.65), 0x2aa8a4, 0.1);
  pipe(pipeG, new THREE.Vector3(1.0, 0.34, 1.15), new THREE.Vector3(1.0, 0.34, 0.65), 0x2aa8a4, 0.1);
  for (const x of [-1.45, -1.75, 1.45, 1.75]) {
    const cl = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 8, 16), metalMat(0x8a9098));
    cl.rotation.y = Math.PI / 2; cl.position.set(x, 0.62, 0.3); pipeG.add(cl);
  }
  const fitIn = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), metalMat(0x1d9a92, { roughness: 0.3, metalness: 0.7, emissive: 0x1d9a92, emissiveIntensity: 0.25 }));
  fitIn.position.set(-1.15, 0.62, 0.3); pipeG.add(fitIn);
  const fitOut = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), metalMat(0xdd7424, { roughness: 0.3, metalness: 0.7, emissive: 0xdd7424, emissiveIntensity: 0.25 }));
  fitOut.position.set(1.15, 0.62, 0.3); pipeG.add(fitOut);

  const edgeInk = new THREE.LineBasicMaterial({ color: 0x2b2b2a, transparent: true, opacity: 0.2 });
  root.traverse(ch => {
    if (!ch.isMesh || !ch.geometry) return;
    const t = ch.geometry.type;
    if (t === 'SphereGeometry' || t === 'CylinderGeometry') return;
    try { ch.add(new THREE.LineSegments(new THREE.EdgesGeometry(ch.geometry, 28), edgeInk.clone())); } catch (_) {}
  });

  // particle pool — small opaque beads (discrete streams, not soft cyan fog)
  const dGeo = new THREE.SphereGeometry(0.055, 12, 12);
  pool = [];
  for (let i = 0; i < 80; i++) {
    const m = new THREE.Mesh(dGeo, new THREE.MeshBasicMaterial({
      color: 0x3ecfc4, transparent: false, opacity: 1, depthWrite: true,
    }));
    m.visible = false; root.add(m); pool.push(m);
  }
  // seed mid-flow beads across 5 clear lanes
  for (let lane = 0; lane < 5; lane++) {
    for (let k = 0; k < 4; k++) {
      drops.push({ u: (k + 0.35) / 4.5 + (lane % 2) * 0.05, lane });
    }
  }

  st.label('<span class="c-cyan">in</span>', () => new THREE.Vector3(-2.0, 1.4, 0.35), ''); // above the inlet elbow (cyan on the cyan pipe vanished)
  st.label('<span class="c-orange">out</span>', () => new THREE.Vector3(2.0, 1.4, 0.35), '');

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paint() {
    const dtv = dT();
    ro.innerHTML = `Heat load <b>${kw >= 1 ? kw.toFixed(1) + ' kW' : Math.round(kw * 1000) + ' W'}</b> · flow <b>${Lpm} L/min</b> → outlet ΔT <b>${dtv < 10 ? dtv.toFixed(1) : Math.round(dtv)} °C</b> (model P = ṁ c ΔT).`;
    st.invalidate();
  }
  ui.slider(ctl, {
    label: 'Heat load', name: 'kw', min: 0.7, max: 120, step: 0.1, value: kw, color: colors.heat,
    fmt: v => (v >= 1 ? `${+v.toPrecision(3)} kW` : `${Math.round(v * 1000)} W`),
    oninput: v => { kw = v; paint(); },
  });
  ui.slider(ctl, {
    label: 'Flow', name: 'lpm', min: 5, max: 120, step: 1, value: Lpm, color: colors.cyan,
    fmt: v => `${v} L/min`,
    oninput: v => { Lpm = v; paint(); },
  });
  ui.hint(el, 'drag to turn · <span class="c-orange">die</span> glow under open plate · raise heat or slow the flow');
  paint();
  // reveal die + plate only — pipes always solid so they never vanish mid-scroll
  const reveal = makeReveal([
    { obj: dieG, delay: 0.0, drop: 0.18 },
    { obj: plateG, delay: 0.12, drop: 0.28 },
  ], { dur: 0.85 });
  revealRef = reveal; reveal.arm();
  if (st.view.dist < 7.0) st.view.dist = 7.0;
  st.ready();
  return true;
}
