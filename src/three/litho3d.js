// Lithography stack: light → chrome mask → photoresist → wafer.
// Feature blur grows as half-pitch nears λ/(4·NA). Mid-action: ArF immersion @ 60 nm.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { metalMat, plasticMat, softMat, glassMat, addBevelFrame, addBevelLip, roundedMesh, makeReveal } from './materials.js';

const TOOLS = [
  { k: 'g', label: 'g-line 436 nm', lam: 436, na: 0.45, yr: '1980s' },
  { k: 'i', label: 'i-line 365 nm', lam: 365, na: 0.6, yr: '1990s' },
  { k: 'krf', label: 'KrF 248 nm', lam: 248, na: 0.8, yr: 'around 2000' },
  { k: 'arf', label: 'ArF 193 nm', lam: 193, na: 0.93, yr: '2000s' },
  { k: 'arfi', label: 'ArF immersion', lam: 193, na: 1.35, yr: 'since ~2007' },
  { k: 'euv', label: 'EUV 13.5 nm', lam: 13.5, na: 0.33, yr: 'since 2019' },
  { k: 'hna', label: 'High-NA EUV', lam: 13.5, na: 0.55, yr: '2025–26' },
];
const L10 = Math.log10;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// Same two-beam (dipole) contrast model and 40% print threshold as litho2d in src/figs/switchpost.js (see the source notes there):
// contrast holds near 0.91 until k₁ ≈ 0.28, then falls to 0 at the k₁ = 0.25 floor, so ArF immersion prints 38 nm as ASML specifies.
const PRINT = 0.4;
const twoBeam = (lam, na, hp) => {
  const d = lam / (2 * hp * na), f = clamp((2 - d) / 0.2, 0, 1), a0 = 0.5, a1 = 1 / Math.PI;
  return f ? (f * 2 * a0 * a1) / (f * (a0 * a0 + a1 * a1) + (1 - f) * a0 * a0) : 0;
};
// EUV (13.5 nm) is absorbed by glass, water and air: vacuum, a reflective multilayer mask lit at ~6°, and mirror projection optics (ASML, note n10).
const isEUV = t => t.lam < 20;

export function litho3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  let ti = 4, hp = 60, tRay = 0;
  let revealRef = null, wasEUV = false;

  const contrast = () => twoBeam(TOOLS[ti].lam, TOOLS[ti].na, hp);

  const st = stage3d(el, {
    ui,
    label: 'Light through a chrome mask onto photoresist on a wafer. Features blur as half-pitch nears the wavelength limit.',
    height: w => (narrow(w) ? 400 : 380),
    radius: 2.0, radiusY: 1.75, yaw: 0.36, pitch: 0.48,
    target: new THREE.Vector3(0, 0.9, 0),
    fitPad: 1.14, fov: 32,
    busy: () => true,
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef && !revealRef.done) revealRef.tick(dt);
      tRay += dt;
      // animate ray opacity pulse
      rays.forEach((r, i) => {
        r.material.opacity = (r.userData.op ?? 1) * (0.25 + 0.35 * (0.5 + 0.5 * Math.sin(tRay * 4 + i * 0.4)));
      });
      st.invalidate();
      return ui.isPlaying();
    },
  });
  if (!st) return false;
  softLights(st.scene, { hemi: 0.95, keyI: 1.25, fillI: 0.36, rimI: 0.42, envI: 1.0 });

  const root = new THREE.Group(); st.scene.add(root);
  let rays = [];
  let resistBars = [];
  let maskChrome = [];
  let immersionFilm = null;

  // wafer disc
  const wafer = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.12, 48), metalMat(0xb9c0ca, { roughness: 0.35, metalness: 0.55, brush: false }));
  wafer.position.y = 0; root.add(wafer);
  addBevelLip(root, 1.55, 0.04, 0.06, metalMat(0xa8b0b8));
  addBevelLip(root, 1.4, 0.02, 0.08, metalMat(0xc0c8d0, { shininess: 90 }));

  // resist blanket
  const resist = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.06, 40), softMat(0x6ec4a0, { opacity: 0.55, shininess: 20 }));
  resist.position.y = 0.12; root.add(resist);
  // immersion water film (ArF immersion only) — between last lens and resist
  immersionFilm = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.35, 0.05, 40),
    glassMat(0x7ec8e8, { opacity: 0.0, shininess: 95, specular: 0xffffff })
  );
  immersionFilm.position.y = 0.22; immersionFilm.visible = false; root.add(immersionFilm);

  // mask plate (glass + chrome bars) + continuous bevel frame
  const maskGlass = roundedMesh(2.6, 0.06, 1.4, glassMat(0xc8d8e8, { opacity: 0.4 }), 0.03);
  maskGlass.position.y = 1.15; root.add(maskGlass);
  // frame + EUV mask share one rig, so EUV can lift the mask high above the mirror optics
  const maskRig = new THREE.Group(); root.add(maskRig);
  const maskFrame = roundedMesh(2.7, 0.04, 1.5, metalMat(0x8a9098, { roughness: 0.3, metalness: 0.8 }), 0.025);
  maskFrame.position.y = 1.12; maskRig.add(maskFrame);
  addBevelFrame(maskRig, 2.7, 1.5, 1.16, metalMat(0x9aa0a8), { t: 0.03, railH: 0.05, overhang: 0.025 });
  // EUV: opaque multilayer mirror mask (absorber on its underside)
  const maskML = roundedMesh(2.6, 0.06, 1.4, metalMat(0x5a6c8c, { roughness: 0.2, metalness: 0.85 }), 0.03);
  maskML.position.y = 1.15; maskML.visible = false; maskRig.add(maskML);

  // EUV optical train in the x–y plane: tin-plasma source → illuminator mirror → mask (chief ray ~6° off normal at 0.33 NA)
  // → six projection mirrors M1–M6 → wafer; M6 is the large last mirror over the wafer (ZEISS, Heil et al., EUVL Symposium 2015:
  // 0.33 NA projection optics M1–M6). High-NA's last mirror is larger: a wider cone, NA 0.55 vs 0.33. Its real optics are
  // obscured (a hole in the big mirror) and anamorphic; their exact mirror count is not drawn from a primary source here.
  const V = (x, y) => new THREE.Vector3(x, y, 0);
  const MASK = { x: -1.2, y: 3.3, sx: 0.8 };
  const EA = 6 * Math.PI / 180, P0 = V(MASK.x, MASK.y - 0.07);
  const SRC = V(-2.45, 2.55), IM = V(P0.x - 1.6 * Math.sin(EA), P0.y - 1.6 * Math.cos(EA));
  const M1 = V(P0.x + 0.9 * Math.sin(EA), P0.y - 0.9 * Math.cos(EA)), M2 = V(1.3, 2.85), M3 = V(0.5, 2.4), M4 = V(1.6, 1.55), M5 = V(1.2, 0.85), M6 = V(0, 1.4), W = V(0, 0.18);
  const euvGroup = new THREE.Group(); euvGroup.visible = false; root.add(euvGroup);
  const mirMat = metalMat(0xdfe4ea, { roughness: 0.1, metalness: 0.92 }), mirBack = metalMat(0x7a8088, { roughness: 0.35, metalness: 0.8 });
  // curved mirror: dark substrate disc + bright concave face; local −y is the mirror normal, aimed at the bisector of in/out beams
  const curvedMirror = (pos, from, to, a) => {
    const g = new THREE.Group();
    const back = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.2, 40), mirBack); back.position.y = 0.27; g.add(back);
    const capG = new THREE.SphereGeometry(3, 40, 6, 0, Math.PI * 2, 0, Math.asin(1 / 3)); capG.translate(0, -3 * Math.cos(Math.asin(1 / 3)), 0);
    const cap = new THREE.Mesh(capG, mirMat); cap.material.side = THREE.DoubleSide; cap.userData.noInk = true; g.add(cap);
    const n = from.clone().sub(pos).normalize().add(to.clone().sub(pos).normalize()).normalize();
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), n);
    g.position.copy(pos); g.scale.setScalar(a); euvGroup.add(g); return g;
  };
  curvedMirror(IM, SRC, P0, 0.2); curvedMirror(M1, P0, M2, 0.2); curvedMirror(M2, M1, M3, 0.22); curvedMirror(M3, M2, M4, 0.2);
  curvedMirror(M4, M3, M5, 0.22); curvedMirror(M5, M4, M6, 0.16);
  const mir4 = curvedMirror(M6, M5, W, 0.5);
  const M4N = new THREE.Vector3(0, -1, 0).applyQuaternion(mir4.quaternion);
  // laser-produced plasma source: a CO₂ laser pulse hits a falling tin droplet; the hot tin plasma emits 13.5 nm light, which a
  // multilayer collector mirror gathers toward the illuminator (laser-produced plasma, as in the flip.html prose; ASML EUV systems, note n10)
  const lpp = new THREE.Group(); lpp.position.copy(SRC); euvGroup.add(lpp);
  const toIM = IM.clone().sub(SRC).normalize();
  const collector = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 10, 0, Math.PI * 2, 0, Math.PI * 0.42), mirMat);
  collector.material = mirMat.clone(); collector.material.side = THREE.DoubleSide;
  collector.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), toIM.clone().negate()); collector.userData.noInk = true; lpp.add(collector);
  const plasma = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), softMat(0xd9b8ff, { emissive: 0xb07cff, emissiveIntensity: 1.0 }));
  plasma.userData.noInk = true; lpp.add(plasma);
  const tinMat = metalMat(0xb8bcc4, { roughness: 0.25, metalness: 0.9 });
  for (let i = -4; i <= 4; i++) if (i) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), tinMat); d.position.set(0, 0, i * 0.14); lpp.add(d); }
  const co2 = beam(SRC.clone().addScaledVector(toIM, -0.9), SRC, 0.035, softMat(0xe0402a, { emissive: 0xd03020, emissiveIntensity: 0.6, opacity: 0.85 }));
  co2.position.z = 0; co2.position.sub(SRC); lpp.add(co2);
  // last-mirror radius whose cone onto the wafer has a mean half-angle asin(NA) in the drawing plane
  const rimFor = na => {
    const th = Math.asin(na), u = new THREE.Vector3(-M4N.y, M4N.x, 0);
    let a = 0.1;
    for (let i = 0; i < 40; i++) {
      const p = M6.clone().addScaledVector(u, a), q = M6.clone().addScaledVector(u, -a);
      const m = (Math.abs(Math.atan2(p.x - W.x, p.y - W.y)) + Math.abs(Math.atan2(q.x - W.x, q.y - W.y))) / 2;
      a *= th / m;
    }
    return a;
  };
  // vacuum chamber: faint outline around the whole EUV train (13.5 nm light is absorbed by air)
  const chamber = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(5.4, 3.85, 2.2)), new THREE.LineBasicMaterial({ color: 0x8a9098, transparent: true, opacity: 0.55 }));
  chamber.position.set(-0.5, 1.68, 0); euvGroup.add(chamber);
  // a beam as a thin box from a to b (x–y plane)
  function beam(a, b, th, mat) {
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(th, len, 0.07), mat);
    mesh.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, 0); mesh.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
    return mesh;
  }

  // projection lens element (last optic before immersion)
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.85, 0.95, 0.22, 40),
    glassMat(0xa8c8e8, { opacity: 0.38, shininess: 95 })
  );
  lens.position.y = 0.72; root.add(lens);
  const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.05, 0.08, 40), metalMat(0xa6acb4)); // QA18 light neutral
  lensBarrel.position.y = 0.58; root.add(lensBarrel);
  // immersion meniscus lip (torus on water film edge)
  const meniscus = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.025, 8, 48), glassMat(0x9ed8f0, { opacity: 0.55 }));
  meniscus.rotation.x = Math.PI / 2; meniscus.position.y = 0.24; meniscus.userData.noInk = true; root.add(meniscus);
  immersionFilm.userData.meniscus = meniscus;

  // source lamp + condenser housing (one group, so EUV can move the source below the reflective mask)
  const lampGroup = new THREE.Group(); root.add(lampGroup);
  const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.18, 24), softMat(0xe9c14f, { emissive: 0xe8a020, emissiveIntensity: 0.45, shininess: 20 }));
  lamp.position.y = 2.05; lampGroup.add(lamp);
  const lampHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.12, 24), metalMat(0x6a7078, { roughness: 0.3, metalness: 0.8 }));
  lampHousing.position.y = 2.2; lampGroup.add(lampHousing);
  const condenser = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.4, 0.14, 24), glassMat(0xc8d8e8, { opacity: 0.35 }));
  condenser.position.y = 1.85; lampGroup.add(condenser);
  addBevelFrame(lampGroup, 0.9, 0.9, 2.28, metalMat(0x7a8088), { t: 0.025, railH: 0.04, overhang: 0.02 });

  function rebuildPattern() {
    maskChrome.forEach(m => { root.remove(m); m.geometry?.dispose(); });
    resistBars.forEach(m => { root.remove(m); m.geometry?.dispose(); });
    rays.forEach(m => { root.remove(m); m.geometry?.dispose(); });
    maskChrome = []; resistBars = []; rays = [];

    const m = contrast(), euv = isEUV(TOOLS[ti]);
    const immerse = TOOLS[ti].k === 'arfi';
    // EUV: no glass anywhere — mirror mask, mirror optics, source moved below the mask
    maskGlass.visible = !euv; maskML.visible = euv; euvGroup.visible = euv;
    lens.visible = lensBarrel.visible = condenser.visible = !euv;
    lampGroup.visible = !euv; // EUV: the tin-plasma source (lpp) in euvGroup replaces the lamp
    maskRig.position.set(euv ? MASK.x : 0, euv ? MASK.y - 1.15 : 0, 0); maskRig.scale.x = euv ? MASK.sx : 1;
    if (euv) mir4.scale.setScalar(rimFor(TOOLS[ti].na));
    if (euv !== wasEUV) {
      wasEUV = euv;
      st.setFocus(euv ? { target: new THREE.Vector3(-0.5, 1.7, 0), radius: 2.95, radiusY: 2.2, yaw: 0.85, pitch: 0.3 }
        : { target: new THREE.Vector3(0, 0.9, 0), radius: 2.0, radiusY: 1.75, yaw: 0.36, pitch: 0.48 });
    }
    if (immersionFilm) {
      immersionFilm.visible = immerse;
      immersionFilm.material.opacity = immerse ? 0.42 : 0;
      immersionFilm.material.transparent = true;
      if (immersionFilm.userData.meniscus) immersionFilm.userData.meniscus.visible = immerse;
    }

    const nBars = 7;
    const total = 2.2;
    const pitch = total / nBars;
    const open = pitch * 0.45;
    const chromeW = pitch - open;
    const blur = Math.max(0, (1 - m) * open * 0.65);
    const mChrome = metalMat(0x3a3a38, { shininess: 90, specular: 0xffffff });
    const x0 = -total / 2;

    for (let k = 0; k < nBars; k++) {
      const openX = x0 + k * pitch + chromeW + open / 2;
      const chromeX = x0 + k * pitch + chromeW / 2;
      const chrome = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.02, chromeW), 0.035, 1.2), mChrome);
      if (euv) { chrome.position.set(MASK.x + chromeX * MASK.sx, MASK.y - 0.07, 0); chrome.scale.set(MASK.sx, 2.2, 1); }
      else chrome.position.set(chromeX, 1.185, 0);
      root.add(chrome); maskChrome.push(chrome);

      const mRay = softMat(0xe9b030, { opacity: 0.4, emissive: 0xe8a020, emissiveIntensity: 0.3, shininess: 5 });
      if (!euv) {
        const ray = new THREE.Mesh(new THREE.BoxGeometry(open * 0.65, 0.95, 0.07), mRay);
        ray.position.set(openX, 0.62, 0); root.add(ray); rays.push(ray);
      }

      if (m > PRINT) {
        const mFeat = softMat(0x2a8a68, { opacity: Math.min(0.95, 0.4 + m * 0.55), emissive: 0x1a6a48, emissiveIntensity: 0.12 });
        const bw = Math.max(0.035, open - 2 * blur);
        const bar = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.05, 1.05), mFeat);
        bar.position.set(openX, 0.16, 0); root.add(bar); resistBars.push(bar);
      }
    }
    // trailing chrome
    const chromeEnd = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.02, chromeW), 0.035, 1.2), mChrome);
    const endX = x0 + nBars * pitch + chromeW / 2;
    if (euv) { chromeEnd.position.set(MASK.x + endX * MASK.sx, MASK.y - 0.07, 0); chromeEnd.scale.set(MASK.sx, 2.2, 1); }
    else chromeEnd.position.set(endX, 1.185, 0);
    root.add(chromeEnd); maskChrome.push(chromeEnd);
    if (euv) {
      // folded reflective path: source → illuminator mirror → mask → M1 → M2 → M3 → last mirror
      const rayMat = () => softMat(0xe9b030, { opacity: 0.4, emissive: 0xe8a020, emissiveIntensity: 0.3, shininess: 5 });
      [[SRC, IM], [IM, P0], [P0, M1], [M1, M2], [M2, M3], [M3, M4], [M4, M5], [M5, M6]].forEach(([a, b]) => { const r = beam(a, b, 0.07, rayMat()); root.add(r); rays.push(r); });
      // converging cone from the last mirror's rim to the wafer: its half-angle is asin(NA)
      const a = mir4.scale.x, u = new THREE.Vector3(-M4N.y, M4N.x, 0), wv = new THREE.Vector3(0, 0, 1), pts = [W.x, W.y, W.z];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40 * Math.PI * 2;
        pts.push(...M6.clone().addScaledVector(u, a * Math.cos(t)).addScaledVector(wv, a * Math.sin(t)).toArray());
      }
      const idx = []; for (let i = 1; i <= 40; i++) idx.push(0, i, i + 1);
      const cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); cg.setIndex(idx); cg.computeVertexNormals();
      const cm = rayMat(); cm.side = THREE.DoubleSide; cm.depthWrite = false;
      const cone = new THREE.Mesh(cg, cm); cone.userData.op = 0.55; root.add(cone); rays.push(cone);
    }

    if (m <= PRINT) {
      const wash = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.04, 1.05), softMat(0x888888, { opacity: 0.35 }));
      wash.position.set(0, 0.16, 0); root.add(wash); resistBars.push(wash);
    }
    paintRo();
    st.invalidate();
  }

  // quiet: wafer in prose; light/mask/resist off mesh
  const maskL = st.label('<span class="c-grey">mask</span>', () => (isEUV(TOOLS[ti]) ? new THREE.Vector3(MASK.x + 1.1 * MASK.sx, MASK.y + 0.06, 0) : new THREE.Vector3(1.7, 1.35, 0)), '');
  // EUV-only labels (High-NA anamorphic 4× slit / 8× scan reduction: Heil et al., ZEISS, EUVL Symposium 2015, note n10)
  const euvOnly = p => () => (isEUV(TOOLS[ti]) ? p() : null);
  st.label('<span class="c-grey">mirrors</span>', euvOnly(() => new THREE.Vector3(M2.x + 0.1, M2.y + 0.25, 0)), '');
  st.label('<span class="c-grey">vacuum</span>', euvOnly(() => new THREE.Vector3(-2.6, 3.6, -1.1)), '');
  st.label('<span class="c-grey">wafer</span>', euvOnly(() => new THREE.Vector3(-2.1, 0.12, 0.9)), '', true);
  const naL = st.label('', euvOnly(() => new THREE.Vector3(-3.0, 0.4, 0.4)), ''); // left of the (enlarged) last mirror, clear of it
  st.label('<span class="c-grey">tin plasma,<br>hit by a CO₂ laser</span>', euvOnly(() => new THREE.Vector3(SRC.x - 0.55, SRC.y - 0.3, 0)), '', true);

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paintRo() {
    const t = TOOLS[ti], lim = t.lam / (4 * t.na), m = contrast();
    maskL.el.innerHTML = isEUV(t) ? '<span class="c-grey">reflective mask, lit at ~6°</span>' : '<span class="c-grey">mask</span>';
    naL.el.innerHTML = `<span class="c-yellow">NA ${t.na} cone</span>${t.k === 'hna' ? '<br><span class="c-grey">anamorphic 4×/8×</span>' : ''}`;
    ro.innerHTML = `${t.label} · NA ${t.na}${t.k === 'arfi' ? ' · <span class="c-cyan">immersion film</span>' : isEUV(t) ? ' · vacuum, reflective mask, mirrors' : ''}: <b>${hp} nm</b> lines (k₁ = ${(hp * t.na / t.lam).toFixed(2)}) at <b>${Math.round(m * 100)}%</b> contrast${m > PRINT ? '' : ', too little to print'}. Floor ≈ <b>${Math.round(lim * 10) / 10} nm</b>.`;
  }
  if (ui.segmented) {
    ui.segmented(ctl, {
      label: 'Source', value: ti,
      options: TOOLS.map((t, i) => ({ label: t.k === 'arfi' ? 'ArFi' : t.k === 'hna' ? 'High-NA' : t.k.toUpperCase(), value: i, name: 'li3-' + t.k })),
      onchange: v => { ti = v; rebuildPattern(); },
    });
  }
  ui.slider(ctl, {
    label: 'Half-pitch (nm)', name: 'li3-hp', min: 5, max: 500, step: 1, value: hp,
    color: ui.C.memory, fmt: v => `${v}`,
    oninput: v => { hp = v; rebuildPattern(); },
  });
  // log-ish feel: also allow quick presets via slider is linear — ok
  ui.hint(el, '<span class="c-yellow">λ</span> through mask → <span class="c-green">resist</span> on <span class="c-blue">wafer</span> · drag pitch until blur');

  rebuildPattern();
  const reveal = makeReveal([
    { obj: wafer, delay: 0.0, drop: 0.18 },
    { obj: resist, delay: 0.1, drop: 0.12 },
    { obj: lens, delay: 0.22, drop: 0.2 },
    { obj: maskGlass, delay: 0.35, drop: 0.22 },
    { obj: lampHousing, delay: 0.48, drop: 0.25 },
  ], { dur: 0.95 });
  revealRef = reveal; reveal.arm();
  if (st.view.dist < 6.7) st.view.dist = 6.7;
  st.ready();
  return true;
}
