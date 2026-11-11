// Triode as a glass vacuum tube you can orbit (kills live "blue-dot rectangle").
// Same Child–Langmuir model as the 2D figure; electrons are particles inside the envelope.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, brassMat, glassMat, addBevelLip, makeReveal, roundedBoxGeo } from './materials.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const MU = 20, VP = 250;
const R_K = 0.14, R_G = 0.5, R_P = 0.94, GRID_T = (R_G - R_K) / (R_P - R_K); // cathode, grid helix and plate liner radii

export function triode3d(el, opt) {
  const ui = opt.ui, colors = ui.C;
  const narrow = w => w < 560;
  let vg = -4, heater = true;
  let revealRef = null;
  const particles = [];
  const cur = () => (heater ? Math.max(0, vg + VP / MU) ** 1.5 / (VP / MU) ** 1.5 : 0);

  const st = stage3d(el, {
    ui,
    label: 'A vacuum triode in three dimensions: electrons leave a hot cathode; the grid voltage lets them through to the plate or turns them back. Drag sideways to turn the tube.',
    height: w => (narrow(w) ? Math.round(Math.max(300, w * 0.9)) : Math.round(Math.min(400, w * 0.5))),
    radius: 1.7, radiusY: 2.05, yaw: 0.55, pitch: 0.22,
    target: new THREE.Vector3(0, 0.95, 0),
    fitPadY: 1.32, fitPadX: 1.08, fov: 34,
    busy: () => heater || (revealRef && !revealRef.done),
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef && !revealRef.done) revealRef.tick(dt);
      const rate = heater ? 90 * dt : 0;
      for (let k = 0; k < rate; k++) if (particles.length < 140) {
        // radial flight: t = 0 at the cathode surface (r 0.14), t = 1 at the plate (r 1.0); the grid sits at t ≈ 0.4.
        // Turned-back electrons reverse short of the grid, nearer the cathode the more negative the grid.
        particles.push({ a: Math.random() * Math.PI * 2, y: 0.64 + Math.random() * 0.34, t: 0, pass: Math.random() < cur() / 1.6, v: 0.55 + Math.random() * 0.35, turn: GRID_T * Math.max(0.12, 1 + Math.min(0, vg) / 22) * (0.8 + Math.random() * 0.25), back: false });
      }
      for (const p of particles) {
        if (!p.pass && !p.back && p.t >= p.turn) p.back = true;
        p.t += p.v * dt * (p.back ? -1.15 : 1);
      }
      for (let i = particles.length - 1; i >= 0; i--) if (particles[i].t > 1.05 || particles[i].t < -0.02) particles.splice(i, 1);
      syncP();
      return heater;
    },
  });
  if (!st) return false;
  const { scene } = st;
  softLights(scene, { hemi: 0.42, keyI: 1.85, fillI: 0.22, rimI: 0.75, sky: 0xffe0c0, ground: 0x4a3828, keyPos: [4, 5, 5], fillPos: [-4, 2, -2], envI: 0.42, glintI: 0.7, glintPos: [7, 6, 2] });

  const root = new THREE.Group(); scene.add(root);

  // glass envelope
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 2.2, 48, 1, true),
    glassMat(0xb8d0e0, { opacity: 0.07 })
  );
  glass.position.y = 0.95; root.add(glass);
  const glassTop = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2),
    glassMat(0xb8d0e0, { opacity: 0.08 })
  );
  glassTop.position.y = 2.05; root.add(glassTop);
  // base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, 0.38, 40), brassMat(0x8a6840, { brushAxis: 'circ', metalness: 0.58, roughness: 0.28, brushStrength: 1.4, clearcoat: 0.35, envMapIntensity: 0.4 }));
  base.position.y = -0.25; root.add(base);
  addBevelLip(root, 1.28, 0.045, -0.05, brassMat(0xc8a060, { emissiveIntensity: 0.22, clearcoat: 0.4, envMapIntensity: 0.45 }));
  addBevelLip(root, 1.18, 0.03, 1.75, metalMat(0xc0ccd8, { roughness: 0.25, metalness: 0.7, clearcoat: 0.4, opacity: 0.75 }));
  // pins denser
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.42, 10), brassMat(0xd4a860, { emissiveIntensity: 0.28, clearcoat: 0.5, brushStrength: 1.2 }));
    pin.position.set(Math.cos(a) * 0.72, -0.58, Math.sin(a) * 0.72); root.add(pin);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), metalMat(0xe8c078, { roughness: 0.18, metalness: 0.95, clearcoat: 0.6 }));
    tip.position.set(Math.cos(a) * 0.72, -0.8, Math.sin(a) * 0.72); root.add(tip);
  }

  // cathode (heater glow)
  const cathMat = softMat(0xe07a3a, { emissive: 0xe07a3a, emissiveIntensity: 0.6 });
  const cathode = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.0, 18), cathMat);
  cathode.position.y = 0.5; root.add(cathode);

  // control grid — spiral of rings
  const gridGroup = new THREE.Group(); root.add(gridGroup);
  const gridMat = metalMat(0x5a8fd4, { roughness: 0.35, metalness: 0.7, emissive: 0x3478d0, emissiveIntensity: 0.18 });
  for (let i = 0; i < 14; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.016, 8, 40), gridMat);
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.18 + i * 0.1; gridGroup.add(ring);
  }
  for (const x of [-0.5, 0.5]) {
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.35, 8), gridMat);
    rod.position.set(x, 0.7, 0); gridGroup.add(rod);
  }

  // plate (anode) — Watch cutaway brass half-shell + dense fins (not sparse grey cage)
  const plateMat = brassMat(0xd8a050, { cleanHex: 0xd8a420 /* QA18: renders ≈ T9 yellow 233,193,79 */, brushAxis: 'circ', emissiveIntensity: 0.34, brushStrength: 2.1, clearcoat: 0.6, clearcoatRoughness: 0.12, envMapIntensity: 0.7, side: THREE.DoubleSide });
  const plateBright = brassMat(0xe8c078, { cleanHex: 0xe0b030, emissive: 0xb88830, emissiveIntensity: 0.28, clearcoat: 0.65, clearcoatRoughness: 0.1, brushStrength: 1.9, envMapIntensity: 0.72 });
  // cutaway (centred on θ = 0) turned toward the default camera (yaw 0.55) so the radial electron flight is visible
  const GAP0 = Math.PI * 0.2, GAPL = Math.PI * 1.6;
  const plateG = new THREE.Group(); plateG.rotation.y = 0.55; root.add(plateG);
  // closed half-cylinder; group rotated so brass faces camera, cutaway peeks at back
  const shell = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.05, 1.35, 48, 1, false, GAP0, GAPL),
    plateMat
  );
  shell.position.y = 1.25; plateG.add(shell);
  const liner = new THREE.Mesh(
    new THREE.CylinderGeometry(0.94, 0.94, 1.28, 40, 1, true, GAP0, GAPL),
    brassMat(0x8a6840, { metalness: 0.55, roughnessIntensity: 0.12, envMapIntensity: 0.4, brushStrength: 0.8 })
  );
  liner.position.y = 1.25; plateG.add(liner);
  for (const a of [GAP0, GAP0 + GAPL]) {
    const rim = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.32, 0.12), plateBright);
    rim.position.set(Math.sin(a) * 1.0, 1.25, Math.cos(a) * 1.0); // CylinderGeometry θ: x = r sinθ, z = r cosθ
    rim.rotation.y = a; plateG.add(rim);
  }
  for (const [y, r] of [[1.9, 1.15], [0.6, 1.12]]) {
    const fl = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.1, 40, 1, false, GAP0, GAPL), plateBright);
    fl.position.y = y; plateG.add(fl);
  }
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 1.05, 0.12, 40, 1, false, GAP0, GAPL),
    plateBright
  );
  cap.position.y = 1.95; plateG.add(cap);
  // QA17: no slats / hoops (read as a wooden barrel). Smooth shell + 3 crisp radiator fins, clearly metal.
  for (const a of [Math.PI * 0.55, Math.PI * 1.0, Math.PI * 1.45]) {
    const fin = new THREE.Mesh(roundedBoxGeo(0.05, 1.18, 0.16, 0.018), plateBright);
    fin.position.set(Math.sin(a) * 1.12, 1.25, Math.cos(a) * 1.12);
    fin.rotation.y = a; plateG.add(fin);
  }
  const plate = plateG;

  // mica spacers (top/bottom of electrode stack)
  const mica = softMat(0xe8dcc8, { transparent: true, opacity: 0.7 });
  for (const y of [0.12, 1.85]) {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.035, 28), mica);
    disc.position.y = y; root.add(disc);
  }
  // getter flash (silver mirror on upper glass)
  const getter = new THREE.Mesh(
    new THREE.SphereGeometry(0.48, 20, 14, 0, Math.PI * 1.1, 0, Math.PI * 0.55),
    metalMat(0xc8d0d8, { shininess: 95, specular: 0xffffff, opacity: 0.5 })
  );
  getter.position.set(0.4, 1.7, 0.25); root.add(getter);
  // heater filament inside cathode
  const fil = new THREE.Mesh(
    new THREE.TorusGeometry(0.06, 0.012, 6, 16),
    softMat(0xffcc66, { emissive: 0xffaa33, emissiveIntensity: 0.7 })
  );
  fil.position.y = 0.55; fil.rotation.x = Math.PI / 2; root.add(fil);
  // glass neck seam
  const seam = new THREE.Mesh(
    new THREE.TorusGeometry(0.96, 0.02, 8, 40),
    softMat(0xa8c0d0, { transparent: true, opacity: 0.35 })
  );
  seam.rotation.x = Math.PI / 2; seam.position.y = 2.0; root.add(seam);

  // Watch edge continuity — brass + base get thin warm ink (Bartosz plate language)
  const edgeInk = new THREE.LineBasicMaterial({ color: 0x5a4030, transparent: true, opacity: 0.3 });
  try { base.add(new THREE.LineSegments(new THREE.EdgesGeometry(base.geometry, 28), edgeInk.clone())); } catch (_) {}
  root.traverse(ch => {
    if (!ch.isMesh || !ch.geometry || !ch.material || ch === base) return;
    const mat = ch.material;
    if (!(mat.metalness > 0.4 && (mat.emissiveIntensity || 0) > 0.05)) return;
    try { ch.add(new THREE.LineSegments(new THREE.EdgesGeometry(ch.geometry, 28), edgeInk.clone())); } catch (_) {}
  });

  // electron pool
  const pGeo = new THREE.SphereGeometry(0.03, 6, 6);
  const pMat = softMat(0x3a78d4, { emissive: 0x3a78d4, emissiveIntensity: 0.55 });
  const pool = [];
  for (let i = 0; i < 140; i++) { const m = new THREE.Mesh(pGeo, pMat); m.visible = false; root.add(m); pool.push(m); }

  st.label('<span class="c-blue">grid</span>', () => new THREE.Vector3(0.75, 0.85, 0), '');

  function syncP() {
    cathMat.emissiveIntensity = heater ? 0.55 + 0.25 * Math.sin(performance.now() / 200) : 0.02;
    cathMat.color.setHex(heater ? 0xe07a3a : 0x6a6058);
    for (let i = 0; i < pool.length; i++) {
      const m = pool[i], p = particles[i];
      if (!p) { m.visible = false; continue; }
      m.visible = true;
      const rad = R_K + p.t * (R_P - R_K);
      m.position.set(Math.cos(p.a) * rad, p.y, Math.sin(p.a) * rad);
    }
    st.invalidate();
  }

  function paint() {
    const c = cur();
    ro.innerHTML = !heater
      ? 'Heater off: no electrons leave the <span class="c-orange">cathode</span>.'
      : c === 0
        ? `<span class="c-blue">Grid</span> <b>${String(vg).replace('-', '−')} V</b> turns every electron back — tube off.`
        : `<span class="c-blue">Grid</span> <b>${String(vg).replace('-', '−')} V</b> · plate current <b>${Math.round(c * 100)}%</b> of 0 V.`;
    syncP();
  }

  const ctl = ui.controls(el);
  ui.slider(ctl, { label: 'Grid', name: 'vg', min: -20, max: 2, step: 0.5, value: vg, color: colors.compute, fmt: v => `${v} V`, oninput: v => { vg = v; paint(); } });
  ui.button(ctl, 'Heater on / off', () => { heater = !heater; paint(); }, { name: 'tr3-heat' });
  const ro = ui.readout(el);
  ui.hint(el, 'drag to turn · <span class="c-orange">cathode</span> · <span class="c-blue">grid</span> · plate · pull Grid negative to cut');
  paint();
  const reveal = makeReveal([
    { obj: base, delay: 0.0, drop: 0.2 },
    { obj: cathode, delay: 0.12, drop: 0.25 },
    { obj: gridGroup, delay: 0.28, drop: 0.22 },
    { obj: plate, delay: 0.42, drop: 0.28 },
    { obj: glass, delay: 0.55, drop: 0.15 },
  ], { dur: 1.0 });
  revealRef = reveal; reveal.arm();
    st.ready();
  return true;
}
