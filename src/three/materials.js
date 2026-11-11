// Soft metal / glass materials without photo textures.
// Phong for matte/plastic; Standard metalness path for Watch-adjacent metal response.
// RoundedBoxGeometry for true filleted edges (not just box-rail lips).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** QA17 visual language (CIECH-GAP T9): 'clean' = smooth gradient shading, saturated colour, broad soft
 *  specular, no surface textures. The QA15/16 photoreal brush maps + anisotropic streak stay behind
 *  STYLE 'photo' (window.AIX_STYLE = 'photo') or opts.brush === 'force' / opts.streak === 'force'. */
export const STYLE = (typeof window !== 'undefined' && window.AIX_STYLE) || 'clean';
const CLEAN = STYLE === 'clean';
/** Push a muddy brown/tan towards Bartosz's saturated warm brass/gold while keeping relative lightness. */
export function cleanBrass(hex) {
  const c = new THREE.Color(hex), hsl = {}; c.getHSL(hsl);
  const h = 0.105 + (hsl.h - 0.105) * 0.75; // pull hue toward ~38deg gold
  const s = Math.min(0.92, Math.max(0.74, 0.8 + 0.45 * (hsl.s - 0.4)));
  const l = Math.min(0.52, Math.max(0.28, 0.1 + 0.68 * hsl.l));
  return c.setHSL(h, s, l).getHex();
}

/** Clipped parts: back faces seen through the cut render as a flat, slightly lighter section colour,
 *  so a cutaway reads as a solid cut face (Watch / Bartosz section look) instead of a dark hollow. */
export function addSectionCap(m, hex) {
  const c = new THREE.Color(hex); const hsl = {}; c.getHSL(hsl);
  c.setHSL(hsl.h, Math.min(1, hsl.s * 0.9), Math.min(0.82, hsl.l * 1.12 + 0.06));
  m.side = THREE.DoubleSide;
  const prev = m.onBeforeCompile;
  m.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.uniforms.uSec = { value: new THREE.Vector3(c.r, c.g, c.b) };
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform vec3 uSec;')
      .replace('#include <dithering_fragment>', '#include <dithering_fragment>\n  if (!gl_FrontFacing) gl_FragColor.rgb = uSec;');
  };
  const pk = m.customProgramCacheKey?.bind(m);
  m.customProgramCacheKey = () => (pk ? pk() : '') + 'sectionCap';
  const baseClone = m.clone.bind(m);
  m.clone = () => { const k = baseClone(); return addSectionCap(k, hex); };
  return m;
}

export function softMat(hex, opts = {}) {
  const opacity = opts.opacity ?? 1;
  const m = new THREE.MeshPhongMaterial({
    color: hex,
    transparent: opacity < 1,
    opacity,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    shininess: opts.shininess ?? 28,
    specular: opts.specular ?? 0x444444,
    flatShading: false,
    side: opts.side ?? THREE.FrontSide,
    depthWrite: opacity >= 0.95,
    clippingPlanes: opts.clip || opts.clippingPlanes || [],
    clipShadows: !!(opts.clip || opts.clippingPlanes),
  });
  if (opts.map) m.map = opts.map;
  return m;
}

/** Procedural brushed-metal maps (no photo). Cached.
 *  Normal + roughness: horizontal grooves so specular reads as continuous streaks
 *  under ANGLE/SwiftShader (Watch barrel/mainspring feel), not soft matte blobs. */
const _brushCache = new Map();
function brushMaps(size = 128, strength = 1) {
  const key = size + ':' + strength.toFixed(2);
  if (_brushCache.has(key)) return _brushCache.get(key);
  const cN = document.createElement('canvas'); cN.width = size; cN.height = size;
  const cR = document.createElement('canvas'); cR.width = size; cR.height = size;
  const nCtx = cN.getContext('2d');
  const rCtx = cR.getContext('2d');
  const nImg = nCtx.createImageData(size, size);
  const rImg = rCtx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    // multi-frequency horizontal brush; slight X drift so streaks aren't grid-locked
    const row = Math.sin(y * 1.15) * 0.55 + Math.sin(y * 2.7) * 0.28 + Math.sin(y * 5.1) * 0.12
      + Math.sin(y * 11.3) * 0.06;
    // High-contrast grooves: dark streaks (low roughness = shiny lines) vs matte bands
    const roughRow = 0.55 + row * 0.38 + (Math.sin(y * 0.37) * 0.1);
    for (let x = 0; x < size; x++) {
      const drift = Math.sin(x * 0.04 + y * 0.015) * 0.08;
      const n = row + drift;
      const nx = Math.max(0, Math.min(255, Math.floor(128 + n * 55 * strength)));
      // tiny Y wobble keeps clearcoat from looking plastic-flat
      const ny = Math.max(0, Math.min(255, Math.floor(128 + Math.sin(x * 0.55 + y * 0.08) * 6 * strength)));
      const i = (y * size + x) * 4;
      nImg.data[i] = nx; nImg.data[i + 1] = ny; nImg.data[i + 2] = 255; nImg.data[i + 3] = 255;
      const rv = Math.max(0, Math.min(255, Math.floor((roughRow + drift * 0.35) * 255)));
      rImg.data[i] = rv; rImg.data[i + 1] = rv; rImg.data[i + 2] = rv; rImg.data[i + 3] = 255;
    }
  }
  nCtx.putImageData(nImg, 0, 0);
  rCtx.putImageData(rImg, 0, 0);
  const normalMap = new THREE.CanvasTexture(cN);
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.colorSpace = THREE.NoColorSpace;
  normalMap.anisotropy = 4;
  const roughnessMap = new THREE.CanvasTexture(cR);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.colorSpace = THREE.NoColorSpace;
  roughnessMap.anisotropy = 4;
  const pack = { normalMap, roughnessMap };
  _brushCache.set(key, pack);
  return pack;
}
function brushNormalMap(size = 128, strength = 1) { return brushMaps(size, strength).normalMap; }

export function metalMat(hex, opts = {}) {
  // Prefer Standard metalness for specular anisotropy-ish catch under softLights
  if (opts.phong) {
    return softMat(hex, {
      shininess: opts.shininess ?? 72,
      specular: opts.specular ?? 0xaaaaaa,
      emissive: opts.emissive ?? 0x000000,
      emissiveIntensity: opts.emissiveIntensity ?? 0.04,
      opacity: opts.opacity ?? 1,
      side: opts.side,
      map: opts.map,
      clip: opts.clip,
    });
  }
  const opacity = opts.opacity ?? 1;
  if (CLEAN && opts.brush !== 'force') {
    // smooth, saturated, broad specular; no maps, no clearcoat (keeps Standard path)
    // QA18: light neutral metals read as Bartosz's flat light greys, not env-darkened taupe
    const _hsl = new THREE.Color(hex).getHSL({});
    const _neutral = !opts._fromBrass && _hsl.s < 0.16 && _hsl.l > 0.34 && opts.emissive == null;
    const m = new THREE.MeshStandardMaterial({
      color: hex,
      metalness: _neutral ? 0.12 : Math.min(opts.metalness ?? 0.82, opts._fromBrass ? 0.22 : 0.42),
      roughness: Math.max(opts.roughness ?? 0.28, 0.4),
      emissive: _neutral ? hex : (opts.emissive ?? 0x000000),
      emissiveIntensity: _neutral ? 0.16 : (opts.emissiveIntensity ?? 0.04),
      transparent: opacity < 1, opacity,
      side: opts.side ?? THREE.FrontSide,
      depthWrite: opacity >= 0.95,
      clippingPlanes: opts.clip || opts.clippingPlanes || [],
      clipShadows: !!(opts.clip || opts.clippingPlanes),
      envMapIntensity: _neutral ? 0.3 : Math.min(opts.envMapIntensity ?? 0.7, 0.5),
    });
    if (opts.map) m.map = opts.map;
    if ((opts.clip || opts.clippingPlanes) && opts.section !== false) addSectionCap(m, hex);
    if (opts.streak === 'force') addBrushStreak(m, { axis: opts.brushAxis ?? 'x', ...(opts.streakOpts || {}) });
    return m;
  }
  const useCoat = opts.clearcoat != null ? opts.clearcoat : 0;
  const Ctor = useCoat > 0 ? THREE.MeshPhysicalMaterial : THREE.MeshStandardMaterial;
  const m = new Ctor({
    color: hex,
    metalness: opts.metalness ?? 0.82,
    roughness: opts.roughness ?? 0.28,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0.04,
    transparent: opacity < 1,
    opacity,
    side: opts.side ?? THREE.FrontSide,
    depthWrite: opacity >= 0.95,
    clippingPlanes: opts.clip || opts.clippingPlanes || [],
    clipShadows: !!(opts.clip || opts.clippingPlanes),
    envMapIntensity: opts.envMapIntensity ?? 0.7,
  });
  if (useCoat > 0) {
    m.clearcoat = useCoat;
    m.clearcoatRoughness = opts.clearcoatRoughness ?? 0.2;
  }
  if (opts.map) m.map = opts.map;
  if (opts.brush !== false) {
    const bs = opts.brushStrength ?? 1.15;
    const maps = brushMaps(opts.brushSize ?? 128, bs);
    const repU = opts.brushRepeatU ?? opts.brushRepeat ?? 2.5;
    const repV = opts.brushRepeatV ?? (opts.brushRepeat != null ? opts.brushRepeat * 2.2 : 7);
    m.normalMap = maps.normalMap;
    // stronger X groove, weak Y — continuous streak under softLights key
    m.normalScale = new THREE.Vector2(opts.normalScaleX ?? 1.25, opts.normalScaleY ?? 0.22);
    m.normalMap.repeat.set(repU, repV);
    if (opts.roughnessMap !== false) {
      m.roughnessMap = maps.roughnessMap;
      m.roughnessMap.repeat.set(repU, repV);
    }
  }
  if (opts.streak && !opts._fromBrass) addBrushStreak(m, { axis: opts.brushAxis ?? 'x', ...(opts.streakOpts || {}) });
  return m;
}

export function glassMat(hex, opts = {}) {
  // NO transmission — SwiftShader/ANGLE paints Physical transmission as opaque cream
  // and hides brass anodes inside. Thin transparent Standard = readable glass + visible metal.
  const opacity = opts.opacity ?? 0.18;
  const m = new THREE.MeshStandardMaterial({
    color: hex,
    metalness: 0.05,
    roughness: opts.roughness ?? 0.12,
    transparent: true,
    opacity,
    side: opts.side ?? THREE.DoubleSide,
    depthWrite: false,
    envMapIntensity: opts.envMapIntensity ?? 0.35,
  });
  m.userData.isGlass = true; // QA18: ink.js gives glass a stencil-masked silhouette outline
  return m;
}

/** QA16: fake anisotropic brushed-metal streak (Kajiya-Kay along a brush tangent) + fine
 *  stripe grain, injected via onBeforeCompile. Works on ANGLE/SwiftShader where PMREM +
 *  normalMap only gives soft blobs. Streak colour is tinted by base colour so brass stays warm.
 *  axis: 'x' | 'y' | 'z' | 'circ' (rings around object Y — Watch barrel / mainspring). */
export function addBrushStreak(m, o = {}) {
  const axis = o.axis ?? 'x';
  const U = {
    uStreakI: { value: o.intensity ?? 0.42 },
    uStreakExp: { value: o.exp ?? 90 },
    uGrainF: { value: o.freq ?? 70 },
    uGrainAmt: { value: o.grain ?? 0.10 },
  };
  m.userData.streak = U;
  const tangentExpr = {
    x: 'vec3(1.0, 0.0, 0.0)', y: 'vec3(0.0, 1.0, 0.0)', z: 'vec3(0.0, 0.0, 1.0)',
    circ: 'normalize(vec3(-position.z, 0.0, position.x) + vec3(1e-5))',
  }[axis];
  const coordExpr = {
    x: '(vObjP.y * 0.8 + vObjP.z * 0.6)', y: '(vObjP.x * 0.8 + vObjP.z * 0.6)',
    z: '(vObjP.x * 0.6 + vObjP.y * 0.8)', circ: 'vObjP.y',
  }[axis];
  const prev = m.onBeforeCompile;
  m.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBrushT;\nvarying vec3 vObjP;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>\nvObjP = position;\nvBrushT = normalize(mat3(modelViewMatrix) * ${tangentExpr});`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vBrushT;
varying vec3 vObjP;
uniform float uStreakI, uStreakExp, uGrainF, uGrainAmt;
float bHash(float n) { return fract(sin(n * 12.9898) * 43758.5453); }`)
      .replace('#include <opaque_fragment>', `{
  float gc = ${coordExpr} * uGrainF;
  float grain = 0.55 * bHash(floor(gc)) + 0.3 * bHash(floor(gc * 0.31) + 17.0) + 0.15 * bHash(floor(gc * 2.3) + 5.0);
  vec3 Nn = normalize(normal);
  vec3 T = vBrushT - Nn * dot(Nn, vBrushT);
  T = length(T) > 1e-4 ? normalize(T) : vec3(1.0, 0.0, 0.0);
  vec3 Vv = normalize(vViewPosition);
  vec3 streak = vec3(0.0);
  #if NUM_DIR_LIGHTS > 0
  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
    vec3 L = directionalLights[i].direction;
    vec3 H = normalize(L + Vv);
    float th = dot(T, H);
    float s = pow(max(0.0, 1.0 - th * th), uStreakExp * 0.5);
    streak += directionalLights[i].color * s * smoothstep(0.0, 0.25, dot(Nn, L));
  }
  #endif
  vec3 warm = clamp(diffuseColor.rgb * vec3(1.25, 1.05, 0.72), 0.0, 1.0);
  outgoingLight *= (1.0 - uGrainAmt) + uGrainAmt * 2.0 * grain;
  outgoingLight += warm * streak * uStreakI * (0.45 + 0.9 * grain);
}
#include <opaque_fragment>`);
  };
  // makeReveal / per-mesh clones drop onBeforeCompile — re-inject on clone
  const baseClone = m.clone.bind(m);
  m.clone = () => addBrushStreak(baseClone(), o);
  const key = 'brushStreak:' + axis;
  const prevKey = m.customProgramCacheKey?.bind(m);
  m.customProgramCacheKey = () => (prevKey ? prevKey() : '') + key;
  return m;
}

/** Watch brass that keeps warm colour under PMREM (high metalness washes to cream/grey).
 *  QA15: lower base roughness + stronger brush/roughnessMap for continuous specular streaks;
 *  warm emissive retained so SwiftShader chroma gates (dRB / warmFrac) stay green. */
export function brassMat(hex = 0xd4a860, opts = {}) {
  if (CLEAN && opts.brush !== 'force') {
    const col = opts.cleanHex ?? cleanBrass(hex); // QA18: cleanHex pins a per-part T9 target
    return metalMat(col, {
      clip: opts.clip, side: opts.side, opacity: opts.opacity, map: opts.map,
      metalness: 0.22, roughness: 0.44, envMapIntensity: 0.35,
      emissive: col, emissiveIntensity: Math.min(0.07, (opts.emissiveIntensity ?? 0.3) * 0.2),
      streak: opts.streak === 'force' ? 'force' : false, brushAxis: opts.brushAxis, streakOpts: opts.streakOpts,
      _fromBrass: true,
    });
  }
  const m = metalMat(hex, {
    metalness: opts.metalness ?? 0.58,
    roughness: opts.roughness ?? 0.20,
    emissive: opts.emissive ?? 0xa06820,
    emissiveIntensity: opts.emissiveIntensity ?? 0.30,
    envMapIntensity: opts.envMapIntensity ?? 0.55,
    clearcoat: opts.clearcoat ?? 0.32,
    clearcoatRoughness: opts.clearcoatRoughness ?? 0.28,
    brushStrength: opts.brushStrength ?? 2.0,
    brushSize: opts.brushSize ?? 128,
    normalScaleX: opts.normalScaleX ?? 1.55,
    normalScaleY: opts.normalScaleY ?? 0.18,
    ...opts,
    _fromBrass: true,
  });
  if (opts.streak !== false) addBrushStreak(m, { axis: opts.brushAxis ?? 'x', ...(opts.streakOpts || {}) });
  return m;
}

export function plasticMat(hex, opts = {}) {
  return softMat(hex, {
    shininess: opts.shininess ?? 18,
    specular: opts.specular ?? 0x333333,
    emissive: opts.emissive,
    emissiveIntensity: opts.emissiveIntensity,
    opacity: opts.opacity ?? 1,
    side: opts.side,
    map: opts.map,
  });
}

/** QA18: light-neutral board/slab (Bartosz light greys) — emissive lift keeps it pale at grazing views. */
/** W9: true light grey under the warm key/sky — base hex is pre-cooled (B +8) and lifted so it reads neutral by eye. */
export function greyBoard(l = 0xdc, opts = {}) {
  const hex = ((l - 3) << 16) | (l << 8) | Math.min(255, l + 8);
  return plasticMat(hex, { emissive: hex, emissiveIntensity: opts.lift ?? 0.42, envMapIntensity: 0.15, ...opts });
}
export function paleBoard(hex = 0xdcdcd8, opts = {}) {
  return plasticMat(hex, { emissive: hex, emissiveIntensity: opts.lift ?? 0.32, ...opts });
}

/** Filleted box — true rounded edges via RoundedBoxGeometry (Watch-adjacent joins). */
export function roundedBoxGeo(w, h, d, r = 0.04, segs = 3) {
  const rr = Math.min(r, w * 0.45, h * 0.45, d * 0.45);
  return new RoundedBoxGeometry(w, h, d, segs, rr);
}

/** Watch-style ink: a filleted box gets ONE crisp silhouette (its un-rounded box edges), not a line per fillet step. */
export function inkEdges(geom, thr = 28) {
  if (geom && geom.type === 'RoundedBoxGeometry' && geom.parameters) {
    const p = geom.parameters;
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(p.width * 0.998, p.height * 0.998, p.depth * 0.998), thr);
  }
  return new THREE.EdgesGeometry(geom, thr);
}

export function roundedMesh(w, h, d, mat, r = 0.04, segs = 3) {
  return new THREE.Mesh(roundedBoxGeo(w, h, d, r, segs), mat);
}

/** Bevel lip: thin box edge sitting on a slab. */
export function addBevelBox(parent, w, h, d, mat, y = 0) {
  const lip = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, Math.min(0.05, h * 0.25), d + 0.04), mat);
  lip.position.y = y; parent.add(lip); return lip;
}

/** Top lip + four side rails — continuous Watch-ish edge read without CSG. */
export function addBevelFrame(parent, w, d, yTop, mat, opts = {}) {
  const t = opts.t ?? 0.045;
  const railH = opts.railH ?? 0.07;
  const overhang = opts.overhang ?? 0.03;
  const lip = new THREE.Mesh(new THREE.BoxGeometry(w + overhang * 2, t, d + overhang * 2), mat);
  lip.position.y = yTop; parent.add(lip);
  const yRail = yTop - railH / 2 + t / 2;
  for (const [dx, dz, rw, rd] of [
    [0, d / 2 + overhang / 2, w + overhang * 2, t],
    [0, -d / 2 - overhang / 2, w + overhang * 2, t],
    [w / 2 + overhang / 2, 0, t, d + overhang * 2],
    [-w / 2 - overhang / 2, 0, t, d + overhang * 2],
  ]) {
    const r = new THREE.Mesh(new THREE.BoxGeometry(rw, railH, rd), mat);
    r.position.set(dx, yRail, dz); parent.add(r);
  }
  return lip;
}

/** Circular bevel lip (wafer / tube / package rim continuity). */
export function addBevelLip(parent, radius, tube, y, mat, opts = {}) {
  const lip = new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube ?? 0.035, opts.radial ?? 8, opts.tubular ?? 48),
    mat
  );
  lip.rotation.x = Math.PI / 2;
  lip.position.y = y;
  if (opts.scaleX || opts.scaleZ) lip.scale.set(opts.scaleX ?? 1, 1, opts.scaleZ ?? 1);
  parent.add(lip);
  return lip;
}

/**
 * Scroll-staged assembly reveal — Watch-like parts settle in when the fig enters view.
 * parts: [{ obj, delay?: 0..1, fromY?: number }] — obj is Object3D
 * Returns { tick(dt), done, arm } — call arm() from onShow; tick from step.
 */
export function makeReveal(parts, opts = {}) {
  const dur = opts.dur ?? 1.15;
  const ease = t => t * t * (3 - 2 * t);
  const state = parts.map((p, i) => {
    const obj = p.obj;
    const delay = p.delay ?? (i / Math.max(1, parts.length - 1)) * 0.45;
    const baseY = obj.position.y;
    obj.userData._revPending = true;
    const fromY = p.fromY ?? baseY - (p.drop ?? 0.35);
    obj.position.y = fromY;
    obj.scale.setScalar(p.fromScale ?? 0.55);
    obj.traverse(ch => {
      if (ch.isMesh && ch.material) {
        if (!ch.userData._revMat) {
          ch.material = ch.material.clone();
          ch.userData._revMat = true;
        }
        ch.material.transparent = true;
        ch.userData._revOp = ch.material.opacity ?? 1;
        ch.material.opacity = 0;
      }
    });
    return { obj, delay, baseY, fromY, fromScale: p.fromScale ?? 0.55 };
  });
  let t = 0, armed = false, finished = false;
  return {
    get done() { return finished; },
    arm() { if (!finished) { armed = true; t = 0; } },
    tick(dt) {
      if (!armed || finished) return !finished && armed;
      t += dt;
      let all = true;
      for (const s of state) {
        const u = Math.max(0, Math.min(1, (t - s.delay) / dur));
        const e = ease(u);
        s.obj.position.y = s.fromY + (s.baseY - s.fromY) * e;
        const sc = s.fromScale + (1 - s.fromScale) * e;
        s.obj.scale.setScalar(sc);
        s.obj.traverse(ch => {
          if (ch.isMesh && ch.material && ch.userData._revOp != null) {
            ch.material.opacity = ch.userData._revOp * e;
            if (e >= 0.99 && ch.userData._revOp >= 0.95) {
              ch.material.transparent = ch.userData._revOp < 1;
              ch.material.opacity = ch.userData._revOp;
            }
          }
        });
        if (u < 1) all = false;
      }
      if (all) { finished = true; armed = false; for (const s of state) delete s.obj.userData._revPending; }
      return true;
    },
  };
}
