// QA17 — one visual language (CIECH-GAP T9): thin crisp dark outlines on every silhouette
// (screen-space inverted hull, constant pixel width) + a soft contact shadow under the assembly.
// Applied once per stage from stage3d.ready(); figs can opt out per mesh with userData.noInk.
import * as THREE from 'three';

const POS_DIR = new Set(['BoxGeometry', 'RoundedBoxGeometry', 'CylinderGeometry', 'ConeGeometry', 'SphereGeometry', 'IcosahedronGeometry', 'OctahedronGeometry', 'DodecahedronGeometry', 'CapsuleGeometry']);
const SKIP = new Set(['PlaneGeometry', 'CircleGeometry', 'RingGeometry', 'ShapeGeometry']);

const VS = /* glsl */`
uniform vec2 uRes; uniform float uPx; uniform float uUsePos; uniform float uR;
#include <clipping_planes_pars_vertex>
void main() {
  vec3 d = uUsePos > 0.5 ? normalize(position + vec3(1e-5)) : normal;
  mat4 mm = modelMatrix;
  #ifdef USE_INSTANCING
    mm = modelMatrix * instanceMatrix;
  #endif
  vec4 mvPosition = viewMatrix * mm * vec4(position, 1.0);
  vec4 clip = projectionMatrix * mvPosition;
  vec3 dv = mat3(viewMatrix * mm) * d;
  vec2 dir = dv.xy; float L = length(dir);
  dir = L > 1e-5 ? dir / L : vec2(0.0);
  // LOD: parts smaller than ~18px on screen get a thinner (then no) outline, so far racks never go to black mush
  float rW = uR * length(mm[0].xyz);
  float rPx = rW * projectionMatrix[1][1] / max(clip.w, 1e-4) * uRes.y * 0.5;
  float k = clamp((rPx - 4.0) / 14.0, 0.0, 1.0);
  clip.xy += dir * uPx * k * 2.0 / uRes * clip.w;
  gl_Position = clip;
  #include <clipping_planes_vertex>
}`;
const FS = /* glsl */`
uniform vec3 uCol; uniform float uOp;
#include <clipping_planes_pars_fragment>
void main() {
  #include <clipping_planes_fragment>
  gl_FragColor = vec4(uCol, uOp);
}`;

export function inkUniforms() {
  return { uRes: { value: new THREE.Vector2(1000, 600) }, uPx: { value: 1.25 } };
}

function hullMat(shared, usePos, color, op, clip, r) {
  return new THREE.ShaderMaterial({
    uniforms: { uRes: shared.uRes, uPx: shared.uPx, uUsePos: { value: usePos ? 1 : 0 }, uR: { value: r }, uCol: { value: new THREE.Color(color) }, uOp: { value: op } },
    vertexShader: VS, fragmentShader: FS, side: THREE.BackSide,
    transparent: op < 1, depthWrite: true,
    clipping: !!(clip && clip.length), clippingPlanes: clip && clip.length ? clip : null,
  });
}

/** Add an outline hull to every eligible mesh under root. */
export function addInkHulls(root, shared, o = {}) {
  const color = o.color ?? 0x2a2622, minR = o.minR ?? 0;
  const list = [];
  root.traverse(ch => {
    if (!(ch.isMesh) || ch.userData.isInk || ch.userData.noInk || ch.userData._inked) return;
    const g = ch.geometry, m = ch.material;
    if (!g || !g.attributes || !g.attributes.position || !g.attributes.normal || SKIP.has(g.type)) return;
    if (!m || Array.isArray(m) || m.isShaderMaterial || m.isPointsMaterial) return;
    const realOp = ch.userData._revOp != null ? ch.userData._revOp : (m.opacity ?? 1);
    const glass = !!(m.userData && m.userData.isGlass) || ch.userData.inkGlass === true;
    if (realOp < (glass ? 0.02 : 0.97)) return;                      // non-glass washes stay un-inked (hull would show through); glass uses stencil
    if (glass) ch.userData._inkGlass = true;
    if (m.blending === THREE.AdditiveBlending) return;
    if (!glass && m.clippingPlanes && m.clippingPlanes.length) return; // cutaways: hull interior would show through the cut
    if (minR) { if (!g.boundingSphere) g.computeBoundingSphere(); if (g.boundingSphere.radius * ch.scale.x < minR) return; }
    list.push(ch);
  });
  let sref = 0;
  for (const ch of list) {
    const isGlass = !!ch.userData._inkGlass;
    const usePos = POS_DIR.has(ch.geometry.type) || ch.userData.inkPosDir === true;
    if (!ch.geometry.boundingSphere) ch.geometry.computeBoundingSphere();
    const hm = hullMat(shared, usePos, color, 1, ch.material.clippingPlanes, ch.geometry.boundingSphere.radius);
    const hull = ch.isInstancedMesh ? new THREE.InstancedMesh(ch.geometry, hm, ch.count) : new THREE.Mesh(ch.geometry, hm);
    if (ch.isInstancedMesh) { hull.instanceMatrix = ch.instanceMatrix; hull.count = ch.count; }
    hull.userData.isInk = true; ch.userData._inked = true;
    hull.raycast = () => {};
    hull.renderOrder = ch.renderOrder;
    hull.frustumCulled = ch.frustumCulled;
    const base = o.opacity ?? 0.92;
    if (isGlass) {
      // QA18: glass silhouette — the glass writes a stencil ref, its hull draws only OUTSIDE it,
      // so the outline is crisp and the dark hull never shows through the transparent body.
      const pm = ch.material;
      if (!pm.stencilWrite) { sref = 1; pm.stencilWrite = true; pm.stencilRef = sref; /* one ref per stage: outline the glass union only */ pm.stencilFunc = THREE.AlwaysStencilFunc; pm.stencilZPass = THREE.ReplaceStencilOp; pm.needsUpdate = true; }
      hm.stencilWrite = true; hm.stencilRef = pm.stencilRef; hm.stencilFunc = THREE.NotEqualStencilFunc;
      hm.stencilZPass = THREE.KeepStencilOp; hm.stencilFail = THREE.KeepStencilOp; hm.stencilZFail = THREE.KeepStencilOp;
      hm.transparent = true; hm.depthWrite = false;
      hull.renderOrder = ch.renderOrder + 1;
      const full = ch.userData._revOp != null ? ch.userData._revOp : (pm.opacity || 1);
      hull.onBeforeRender = () => {
        const op = ch.material && ch.material.opacity != null ? ch.material.opacity : full;
        hm.uniforms.uOp.value = 0.8 * Math.min(1, op / Math.max(full, 1e-3));
        hull.visible = ch.material ? ch.material.visible !== false : true;
      };
      ch.add(hull);
      continue;
    }
    hull.onBeforeRender = () => {
      const pm = ch.material, op = (pm && pm.opacity != null ? pm.opacity : 1);
      hm.uniforms.uOp.value = base * op;
      const tr = op < 0.999 || base < 1;
      if (hm.transparent !== tr) { hm.transparent = tr; hm.needsUpdate = true; }
      hull.visible = pm ? pm.visible !== false : true;
    };
    ch.add(hull);
  }
  return list.length;
}

let _shadowTex = null;
function shadowTex() {
  if (_shadowTex) return _shadowTex;
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 4, 64, 64, 63);
  gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(0.45, 'rgba(0,0,0,0.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  _shadowTex = new THREE.CanvasTexture(c); return _shadowTex;
}
/** Soft contact shadow sized to the current world bbox of the scene's inked meshes. */
export function contactShadow(scene, o = {}) {
  const box = new THREE.Box3(), tmp = new THREE.Box3();
  let pending = false; scene.traverse(ch => { if (ch.userData._revPending) pending = true; });
  if (pending) return null;
  scene.traverse(ch => {
    if (!ch.isMesh || ch.userData.isInk || ch.userData.isShadow || ch.userData.noShadowBox) return;
    if (ch.geometry && SKIP.has(ch.geometry.type)) return;
    let v = true; for (let p = ch; p; p = p.parent) if (p.visible === false) { v = false; break; }
    if (!v) return;
    tmp.setFromObject(ch); if (!tmp.isEmpty()) box.union(tmp);
  });
  if (box.isEmpty()) return null;
  const sz = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  let sh = scene.userData._contactShadow;
  if (!sh) {
    sh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x1a1410, alphaMap: shadowTex(), transparent: true, opacity: o.opacity ?? 0.2, depthWrite: false }));
    sh.rotation.x = -Math.PI / 2; sh.userData.isShadow = true; sh.renderOrder = -1; sh.raycast = () => {};
    scene.add(sh); scene.userData._contactShadow = sh;
  }
  sh.position.set(c.x, box.min.y - 0.004 * Math.max(sz.x, sz.z), c.z);
  sh.scale.set(sz.x * 1.35, sz.z * 1.45, 1);
  return sh;
}
