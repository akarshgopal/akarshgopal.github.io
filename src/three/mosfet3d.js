// CIECH #5: cut-open MOSFET you can orbit — planar → FinFET → GAA.
// Soft Lambert pastels, rounded fins/wires/contacts, spacer/ILD stacks. Mid-action: FinFET + channel on.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, brassMat, addBevelFrame, addBevelLip, roundedMesh, makeReveal } from './materials.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const PHI = 0.02585, NF = 1.2, S = NF * PHI * Math.LN10;
const VDD = 0.7;
const idOf = (vg, vt) => Math.log1p(Math.exp((vg - vt) / (2 * NF * PHI))) ** 2;

const COL = {
  si: 0xb0aca4, siMid: 0x9c9890, siDark: 0x807c74,
  source: 0x8ab0d8, drain: 0x6a98c8,
  oxide: 0x9aa8b0, gate: 0x6a8498, channel: 0x4ecfc8, fin: 0xc0bcb4,
  wire: 0xd4d8dc, contact: 0xd4a860, spacer: 0xd0ccc4, ild: 0xb8bcc4, cut: 0xf0a060,
};

function mat(hex, opts = {}) {
  return softMat(hex, {
    opacity: opts.opacity ?? 1, side: opts.side, emissive: opts.emissive,
    emissiveIntensity: opts.emissiveIntensity, clip: opts.clip,
    shininess: opts.shininess ?? 34, specular: opts.specular ?? 0x666666,
  });
}

/** Rounded slab: box + cylindrical edge caps (watch-edge feel). */
function roundSlab(w, h, d, material, segs = 12) {
  const g = new THREE.Group();
  const coreW = Math.max(0.01, w - h);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(coreW, h, d), material));
  const r = h / 2;
  const cL = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d, segs), material);
  cL.rotation.x = Math.PI / 2; cL.position.x = -w / 2 + r; g.add(cL);
  const cR = cL.clone(); cR.position.x = w / 2 - r; g.add(cR);
  return g;
}

/** Fin: tall bar along X with rounded top/bottom and rounded ends. */
function finBody(len, height, thick, material) {
  const g = new THREE.Group();
  const r = thick / 2;
  const coreH = Math.max(0.01, height - thick);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(len - thick, coreH, thick), material));
  // top / bottom rounds along length
  const top = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len - thick, 16), material);
  top.rotation.z = Math.PI / 2; top.position.y = coreH / 2; g.add(top);
  const bot = top.clone(); bot.position.y = -coreH / 2; g.add(bot);
  // end caps (spheres squashed)
  for (const sx of [-1, 1]) {
    const end = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), material);
    end.scale.set(1, height / thick, 1);
    end.position.set(sx * (len / 2 - r), 0, 0);
    g.add(end);
  }
  return g;
}

/** Short metal via: cylinder + fillet pad. */
function viaStack(root, x, y0, z, h, mWire, mPad) {
  const g = new THREE.Group();
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.07, h, 16), mWire);
  rod.position.y = h / 2; g.add(rod);
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.045, 18), mPad);
  pad.position.y = h + 0.02; g.add(pad);
  g.position.set(x, y0, z); root.add(g); return g;
}

export function mosfet3d(el, opt) {
  const ui = opt.ui, colors = ui.C;
  const narrow = w => w < 560;
  let gen = 1.15;
  let cut = 0.25 + 0.55 * (1.15 / 2);
  let vg = 0.55, vt = 0.35;
  let particles = [];
  let revealRef = null;
  const clipPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);

  const st = stage3d(el, {
    ui,
    label: 'A MOSFET cut open in three dimensions. Drag sideways to turn it; Peek morphs planar → FinFET → GAA; Gate opens the channel.',
    height: w => (w < 560 ? 400 : 440),
    radius: 1.08, radiusY: 0.86, /* W8 fill */ yaw: 0.6, pitch: 0.26, // QA18 fill ~0.66 (was 1.85/1.4)
    target: new THREE.Vector3(0, 0.5, 0),
    localClipping: true,
    fitPadY: 1.22, fitPadX: 1.1,
    fov: 34,
    busy: () => (revealRef && !revealRef.done) || (particles.length > 0 && vg > vt * 0.6),
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      try {
        if (revealRef && !revealRef.done) { revealRef.tick(dt); }
        const on = idOf(vg, vt) / idOf(VDD, vt);
        const rate = on * 55 * dt;
        for (let k = 0; k < rate; k++) if (particles.length < 100) particles.push({ t: Math.random() * 0.12, lane: Math.random() });
        for (const p of particles) p.t += dt * (0.55 + on * 0.95);
        for (let i = particles.length - 1; i >= 0; i--) if (particles[i].t > 1) particles.splice(i, 1);
        syncParticles();
        return particles.length > 0;
      } catch (_) { return false; }
    },
  });
  if (!st) return false;
  const { scene } = st;
  softLights(scene, { hemi: 0.40, keyI: 1.55, fillI: 0.22, rimI: 0.62, sky: 0xffe0c0, ground: 0x3a3020, keyPos: [5, 6, 4], fillPos: [-4, 2, -2], envI: 0.25, glintI: 0.18, glintPos: [8, 7, 1.5] });

  const root = new THREE.Group(); scene.add(root);
  const clip = [clipPlane];

  // Warm brass-leaning metals — high metalness+PMREM washed QA12 grey; keep colour via emissive + mid metalness
  const mSi = brassMat(0xc0a070, { clip, metalness: 0.55, emissiveIntensity: 0.26, envMapIntensity: 0.28, brushStrength: 1.9, clearcoat: 0.14, clearcoatRoughness: 0.32 });
  const mSiM = brassMat(0xb08850, { clip, metalness: 0.55, emissiveIntensity: 0.24, envMapIntensity: 0.28, brushStrength: 1.6, clearcoat: 0.12, clearcoatRoughness: 0.32 });
  const mSiD = metalMat(0xc8c4bc, { clip, roughness: 0.42, metalness: 0.3, envMapIntensity: 0.35 }); // QA18 light neutral base (was dark 0x8a7050)
  // colour-coded to match the prose: source/drain blue, gate yellow, channel cyan
  const mSrc = metalMat(0x5a8fd4, { clip, roughness: 0.35, metalness: 0.4, emissive: 0x2a5fa8, emissiveIntensity: 0.3, envMapIntensity: 0.3 });
  const mDrn = metalMat(0x5a8fd4, { clip, roughness: 0.35, metalness: 0.4, emissive: 0x2a5fa8, emissiveIntensity: 0.3, envMapIntensity: 0.3 });
  const mOx = metalMat(COL.oxide, { clip, roughness: 0.42, metalness: 0.15, opacity: 0.38, brush: false, envMapIntensity: 0.18 });
  const mGate = brassMat(0xe9c14f, { clip, metalness: 0.55, emissive: 0xb08820, emissiveIntensity: 0.34, clearcoat: 0.2, clearcoatRoughness: 0.28, brushStrength: 1.6, envMapIntensity: 0.3 });
  const mChan = mat(COL.channel, { clip, emissive: COL.channel, emissiveIntensity: 0.4, opacity: 0.9 });
  const mFin = brassMat(0xc0a070, { clip, metalness: 0.52, emissiveIntensity: 0.26, brushStrength: 1.3, envMapIntensity: 0.28, clearcoat: 0.15 });
  const mWire = brassMat(0xd0b070, { clip, metalness: 0.58, emissiveIntensity: 0.28, clearcoat: 0.22, clearcoatRoughness: 0.25, brushStrength: 1.4, envMapIntensity: 0.3 });
  const mContact = brassMat(0xc89848, { clip, emissiveIntensity: 0.26, brushStrength: 1.8, clearcoat: 0.14, clearcoatRoughness: 0.3, envMapIntensity: 0.28 });
  const mSpacer = metalMat(0xb09870, { clip, roughness: 0.35, metalness: 0.5, brushStrength: 0.7, emissive: 0x504028, emissiveIntensity: 0.08, envMapIntensity: 0.3 });
  const mIld = metalMat(0x908870, { clip, roughness: 0.45, metalness: 0.25, opacity: 0.38, brush: false, envMapIntensity: 0.18 });

  // Substrate — warm brass metal + dense trench ribs (kill flat grey CAD slab)
  const substrate = roundedMesh(3.2, 0.42, 2.0, mSi, 0.07);
  substrate.position.y = -0.02; root.add(substrate);
  addBevelFrame(root, 3.15, 1.95, 0.18, brassMat(0xc8a060, { clip, emissiveIntensity: 0.3, clearcoat: 0.18, clearcoatRoughness: 0.28, envMapIntensity: 0.3 }), { t: 0.032, railH: 0.04, overhang: 0.025 });
  { const m = roundedMesh(3.15, 0.09, 1.95, mSiM, 0.04); m.position.set(0, 0.22, 0); root.add(m); }
  { const m = roundedMesh(3.22, 0.07, 2.02, mSiD, 0.035); m.position.set(0, -0.26, 0); root.add(m); }
  // dense brushed brass trench ribs across the die face
  for (let i = 0; i < 11; i++) {
    const z = -0.9 + i * 0.18;
    const rib = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.028, 0.045), mContact);
    rib.position.set(0, 0.245, z); root.add(rib);
  }
  for (let i = 0; i < 7; i++) {
    const x = -1.35 + i * 0.45;
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 1.75), brassMat(0xb88848, { clip, emissiveIntensity: 0.2, brushStrength: 1.0, envMapIntensity: 0.35 }));
    rib.position.set(x, 0.248, 0); root.add(rib);
  }
  for (const z of [-0.85, 0.85]) {
    const sti = roundedMesh(2.8, 0.06, 0.12, mSiD, 0.02);
    sti.position.set(0, 0.2, z); root.add(sti);
  }

  // Source / drain — rounded metal slabs + Watch-brass silicide + contact rails
  const sourceG = roundSlab(0.95, 0.28, 1.3, mSrc, 16);
  sourceG.position.set(-0.95, 0.3, 0); root.add(sourceG);
  const drainG = roundSlab(0.95, 0.28, 1.3, mDrn, 16);
  drainG.position.set(0.95, 0.3, 0); root.add(drainG);
  // silicide caps
  { const g = roundSlab(0.78, 0.06, 1.1, mContact, 12); g.position.set(-0.95, 0.46, 0); root.add(g); }
  { const g = roundSlab(0.78, 0.06, 1.1, mContact, 12); g.position.set(0.95, 0.46, 0); root.add(g); }
  // contact rails (dense metal bars — kill soft CAD flatness)
  for (const x of [-0.95, 0.95]) {
    for (const z of [-0.35, 0, 0.35]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.035, 0.12), mContact);
      rail.position.set(x, 0.5, z); root.add(rail);
    }
  }

  // ILD — thin quiet strip under gate
  const ild = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.04, 1.3), mIld);
  ild.position.y = 0.46; root.add(ild);

  // Planar gate stack
  const planarOx = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.045, 1.15), mOx);
  planarOx.position.set(0, 0.44, 0); root.add(planarOx);
  const planarGate = roundSlab(0.98, 0.13, 1.1, mGate, 12);
  planarGate.position.set(0, 0.54, 0); root.add(planarGate);
  // sidewall spacers (planar)
  for (const sx of [-1, 1]) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 1.05), mSpacer);
    sp.position.set(sx * 0.55, 0.52, 0); root.add(sp);
  }

  // FinFET — rounded fin + conformal oxide/gate wrap + spacers
  const finGroup = new THREE.Group(); root.add(finGroup);
  const fin = finBody(1.2, 0.55, 0.18, mFin);
  fin.position.set(0, 0.58, 0); finGroup.add(fin);
  // oxide wrap sides + top half-pipe
  const finOxL = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.48, 0.035), mOx);
  finOxL.position.set(0, 0.58, 0.12); finGroup.add(finOxL);
  const finOxR = finOxL.clone(); finOxR.position.z = -0.12; finGroup.add(finOxR);
  const finOxTop = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 1.1, 16, 1, false, 0, Math.PI));
  finOxTop.material = mOx; finOxTop.rotation.z = Math.PI / 2; finOxTop.position.set(0, 0.84, 0); finGroup.add(finOxTop);
  // gate wrap
  const finGateL = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.48, 0.08), mGate);
  finGateL.position.set(0, 0.58, 0.165); finGroup.add(finGateL);
  const finGateR = finGateL.clone(); finGateR.position.z = -0.165; finGroup.add(finGateR);
  const finGateTop = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.95, 20, 1, false, 0, Math.PI));
  finGateTop.material = mGate; finGateTop.rotation.z = Math.PI / 2; finGateTop.position.set(0, 0.9, 0); finGroup.add(finGateTop);
  // FinFET spacers at gate ends
  for (const sx of [-1, 1]) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.38), mSpacer);
    sp.position.set(sx * 0.55, 0.6, 0); finGroup.add(sp);
  }

  // GAA — three nanosheet ribbons with rounded tips + wrap sleeves
  const gaaGroup = new THREE.Group(); root.add(gaaGroup);
  for (let i = 0; i < 3; i++) {
    const y = 0.42 + i * 0.28;
    const sheet = new THREE.Group();
    sheet.add(new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.07, 0.26), mFin));
    for (const sx of [-1, 1]) {
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), mFin);
      tip.scale.set(1, 1, 1.85); tip.position.set(sx * 0.575, 0, 0); sheet.add(tip);
    }
    sheet.position.y = y; gaaGroup.add(sheet);
    // oxide then gate sleeve
    const ox = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.13, 0.34), mOx);
    ox.position.set(0, y, 0); gaaGroup.add(ox);
    const sleeve = roundSlab(0.7, 0.16, 0.4, mGate, 10);
    sleeve.position.set(0, y, 0); gaaGroup.add(sleeve);
  }
  // GAA side rails
  for (const sx of [-1, 1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.2), mFin);
    rail.position.set(sx * 0.7, 0.7, 0); gaaGroup.add(rail);
  }

  // Channel glow — capsule
  const channel = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.85, 6, 14), mChan);
  channel.rotation.z = Math.PI / 2; channel.position.set(0, 0.34, 0); root.add(channel);

  // Contacts
  const cSrc = viaStack(root, -0.95, 0.42, 0.45, 0.28, mWire, mContact);
  const cDrn = viaStack(root, 0.95, 0.42, 0.45, 0.28, mWire, mContact);
  const cGate = viaStack(root, 0, 0.55, -0.55, 0.32, mWire, mContact);

  // cut sheet removed

  // Carriers
  const pGeo = new THREE.SphereGeometry(0.028, 10, 10);
  const pMat = softMat(0x3a88e0, { emissive: 0x3a88e0, emissiveIntensity: 0.55 });
  const pPool = [];
  for (let i = 0; i < 100; i++) { const m = new THREE.Mesh(pGeo, pMat); m.visible = false; root.add(m); pPool.push(m); }

  // Quiet outlines — substrate + S/D only; MUST clip with cut plane (unclipped
  // EdgesGeometry painted cream wireframe on the peek half under SwiftShader AA).
  const edgeInk = new THREE.LineBasicMaterial({ color: 0x3a3834, transparent: true, opacity: 0.12, clippingPlanes: clip });
  for (const ch of [substrate, sourceG, drainG]) {
    if (!ch?.geometry) continue;
    try { ch.add(new THREE.LineSegments(new THREE.EdgesGeometry(ch.geometry, 24), edgeInk.clone())); } catch (_) {}
  }

  // Single floating gate label — source/drain/channel live in colour-in-prose readout
  st.label('<span class="c-yellow">gate</span>', () => new THREE.Vector3(0, gen > 1.4 ? 1.45 : (gen > 0.5 ? 1.22 : 0.85), -0.55), '');

  function syncMorph() {
    const p = clamp(1 - gen, 0, 1);
    const f = clamp(1 - Math.abs(gen - 1), 0, 1);
    const g = clamp(gen - 1, 0, 1);
    planarOx.visible = planarGate.visible = p > 0.08;
    planarOx.scale.set(1, 0.5 + 0.5 * p, 1);
    planarGate.scale.setScalar(0.7 + 0.3 * p);
    planarGate.traverse(ch => { if (ch.isMesh && ch.material && ch.material.emissiveIntensity != null) ch.material.emissiveIntensity = 0.05 + 0.14 * (vg / VDD) * p; });

    finGroup.visible = f > 0.06;
    finGroup.scale.set(1, 0.55 + 0.45 * f, 0.75 + 0.25 * f);

    gaaGroup.visible = g > 0.06;
    gaaGroup.scale.set(1, 0.6 + 0.4 * g, 1);

    const on = clamp(idOf(vg, vt) / idOf(VDD, vt), 0, 1);
    channel.position.y = 0.32 + 0.16 * f + 0.26 * g;
    channel.scale.set(1, 0.7 + 0.5 * f, 0.8 + 0.4 * f);
    channel.material.opacity = 0.12 + 0.82 * on;
    channel.material.emissiveIntensity = 0.12 + 0.75 * on;
    channel.visible = on > 0.02;

    cGate.position.y = gen > 1.3 ? 0.55 : (gen > 0.6 ? 0.45 : 0.38);
    ild.material.opacity = 0.25 + 0.35 * (1 - Math.max(f, g));
  }

  function syncCut() {
    const x = 1.5 - cut * 3.0;
    clipPlane.constant = x;
  }

  function syncParticles() {
    const on = idOf(vg, vt) / idOf(VDD, vt);
    const y0 = channel.position.y;
    const zSpread = 0.08 + 0.07 * clamp(gen, 0, 1);
    for (let i = 0; i < pPool.length; i++) {
      const m = pPool[i], p = particles[i];
      if (!p || on < 0.05) { m.visible = false; continue; }
      m.visible = true;
      m.position.set(-0.5 + p.t * 1.0, y0 + (gen > 1.2 ? ((i % 3) - 1) * 0.22 * clamp(gen - 1, 0, 1) : 0), (p.lane - 0.5) * zSpread * 2);
    }
    st.invalidate();
  }

  function paint() {
    syncMorph(); syncCut(); syncParticles();
    const on = idOf(vg, vt) / idOf(VDD, vt);
    const ratio = idOf(VDD, vt) / Math.max(1e-12, idOf(0, vt));
    const genName = gen < 0.45 ? 'planar' : gen < 1.45 ? 'FinFET' : 'GAA';
    const e = Math.floor(Math.log10(Math.max(on, 1e-12)));
    const onTxt = on >= 0.01 ? `${Math.round(on * 100)}%` : `${(on / 10 ** e).toFixed(1)}×10<sup>${e}</sup>`;
    ro.innerHTML = `<b class="c-blue">${genName}</b> · gate <b>${vg.toFixed(2)} V</b> → channel <b class="c-cyan">${onTxt}</b> · on/off ≈ <b>${ratio >= 1e6 ? (ratio / 1e6).toPrecision(2) + 'M' : Math.round(ratio).toLocaleString('en-GB')}×</b>.`;
    st.invalidate();
  }

  const ctl = ui.controls(el);
  ui.slider(ctl, { label: 'Peek', name: 'gen', min: 0, max: 2, step: 0.01, value: gen, color: colors.compute, fmt: v => (v < 0.45 ? 'planar' : v < 1.45 ? 'FinFET' : 'GAA'), oninput: v => { gen = v; cut = 0.25 + 0.55 * (v / 2); paint(); } });
  ui.slider(ctl, { label: 'Gate', name: 'vg', min: 0, max: VDD, step: 0.01, value: vg, color: colors.cyan, fmt: v => `${v.toFixed(2)} V`, oninput: v => { vg = v; paint(); } });
  const ro = ui.readout(el);
  ui.hint(el, '<span class="c-blue">gate</span> fills <span class="c-cyan">channel</span> · <span class="c-blue">source</span>← →<span class="c-blue">drain</span> · Peek: planar → FinFET → GAA');
  paint();
  const reveal = makeReveal([
    { obj: substrate, delay: 0.0, drop: 0.15 },
    { obj: sourceG, delay: 0.1, drop: 0.18 },
    { obj: drainG, delay: 0.15, drop: 0.18 },
    { obj: planarGate, delay: 0.25, drop: 0.2 },
    { obj: finGroup, delay: 0.35, drop: 0.22 },
    { obj: gaaGroup, delay: 0.45, drop: 0.22 },
  ], { dur: 0.95 });
  revealRef = reveal; reveal.arm();
  if (st.view.dist < 3.4) st.view.dist = 3.4; // QA18 (was 4.8)
  st.ready();
  return true;
}
