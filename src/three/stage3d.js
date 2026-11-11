// Shared small 3D stage for the series (three.js, bundled separately into dist/three3d.js so the 2D pages never load it).
// Pattern after the electricity series' hero3d: WebGL with a plain fallback, low-power context, pixel ratio capped at 2.
// Touch rules: a horizontal drag turns the scene, a vertical swipe scrolls the page (touch-action: pan-y); a tap picks.
// It renders only while on screen: no animation frame is requested while the figure is out of view, paused, or settled.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { inkUniforms, addInkHulls, contactShadow } from './ink.js';


export function stage3d(el, o) {
  const ui = o.ui;
  let renderer;
  try {
    const probe = document.createElement('canvas');
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return null;
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, stencil: true, powerPreference: 'low-power', preserveDrawingBuffer: true });
  } catch (e) { return null; } // the caller falls back to its 2D figure
  const wrap = document.createElement('div');
  wrap.className = 'canvas-wrap three-wrap';
  el.appendChild(wrap);
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', o.label);
  canvas.tabIndex = 0;
  wrap.appendChild(canvas);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = o.exposure ?? 1.05;
  renderer.setClearColor(0xf4f4f2, 0); // transparent — page paper shows through (CIECH bare stage)
  if (o.localClipping) renderer.localClippingEnabled = true;

  const scene = new THREE.Scene();
  scene.userData.renderer = renderer;
  const camera = new THREE.PerspectiveCamera(o.fov || 34, 1.6, 0.05, 500);
  const target = (o.target && o.target.clone) ? o.target.clone() : new THREE.Vector3(0, 0, 0);
  const view = { yaw: o.yaw ?? 0, pitch: o.pitch ?? 0.6, dist: 8 };
  const labels = [];
  let visible = true, raf = 0, last = 0, dirty = true, w = 0, h = 0;
  let radius = o.radius || 3, radiusY = o.radiusY || radius * 0.6;
  const autoFit = o.autoFit !== false;
  const inkU = inkUniforms();
  let inked = false, shadowState = o.contactShadow === false ? 2 : 0, shadowT = 0;
  function inkAll() { if (o.ink === false) return; addInkHulls(scene, inkU, { color: o.inkColor, opacity: o.inkOpacity, minR: o.inkMinR }); inked = true; }

  function place() {
    if (o.place) { o.place(camera, target, view); return; }
    const cp = Math.cos(view.pitch);
    camera.position.set(target.x + view.dist * Math.sin(view.yaw) * cp, target.y + view.dist * Math.sin(view.pitch), target.z + view.dist * Math.cos(view.yaw) * cp);
    camera.lookAt(target);
  }
  function fitDist() {
    if (!autoFit) return;
    const vf = camera.fov * Math.PI / 360, hf = Math.atan(Math.tan(vf) * camera.aspect);
    // Asymmetric pads: fitPadY protects vertical (dome); fitPadX packs horizontal hero fill.
    const padX = o.fitPadX ?? o.fitPad ?? 1.08;
    const padY = o.fitPadY ?? o.fitPad ?? 1.08;
    view.dist = Math.max(radius / Math.tan(hf) * padX, radiusY / Math.tan(vf) * padY);
  }
  function size() {
    w = wrap.clientWidth || 600; h = o.height(w);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(w, h, true);
    { const pr = renderer.getPixelRatio(); inkU.uRes.value.set(w * pr, h * pr); inkU.uPx.value = (o.inkPx ?? 0.85) * pr; }
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fitDist();
    if (o.onResize) o.onResize(w, h);
    invalidate();
  }
  function render() {
    place();
    renderer.render(scene, camera);
    const v = new THREE.Vector3();
    for (const L of labels) {
      const p = L.pos(); if (!p) { L.el.style.display = 'none'; continue; }
      v.copy(p).project(camera);
      const x = (v.x + 1) / 2 * w, y = (1 - v.y) / 2 * h, inside = v.z < 1 && x > 4 && x < w - 4 && y > 4 && y < h - 4;
      L.el.style.display = inside ? '' : 'none';
      L.el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px) translate(-50%, ${L.below ? '8px' : 'calc(-100% - 8px)'})`;
    }
    dirty = false;
  }
  function frame(ts) {
    raf = 0;
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
    let more = false;
    // Watch-like: keep step alive while on-screen if busy() (mid-action / reveal),
    // not only when the global play toggle is on.
    const wantStep = o.step && (ui.isPlaying() || (o.busy && o.busy()));
    if (wantStep) {
      try { more = !!o.step(dt); } catch (_) { more = false; dirty = true; }
    }
    if (shadowState === 1) { shadowT += dt; if (shadowT > 0.25 && contactShadow(scene, { opacity: o.shadowOpacity })) { shadowState = 2; dirty = true; } }
    if (dirty || more) render();
    if (!raf && visible && (more || dirty)) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && visible && (dirty || (ui.isPlaying() && o.busy && o.busy()) || (o.busy && o.busy()))) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function invalidate() { dirty = true; kick(); }
  new IntersectionObserver(es => { const was = visible; visible = es[0].isIntersecting; if (visible && !was && o.onShow) o.onShow(); kick(); }, { threshold: 0.15 }).observe(canvas);
  ui.onPlayChange(() => kick());
  new ResizeObserver(size).observe(wrap);

  // pointer: drag sideways to turn (mouse may also tilt), tap to pick
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let drag = null;
  canvas.style.touchAction = 'pan-y';
  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, yaw: view.yaw, pitch: view.pitch, moved: false, mouse: e.pointerType === 'mouse' }; try { canvas.setPointerCapture(e.pointerId); } catch (_) {} });
  canvas.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    drag.moved = true; canvas.style.cursor = 'grabbing';
    view.yaw = drag.yaw - dx * 0.008;
    if (drag.mouse) view.pitch = Math.max(0.15, Math.min(1.45, drag.pitch + dy * 0.006));
    if (o.onTurn) o.onTurn();
    invalidate();
  });
  canvas.addEventListener('pointerup', e => {
    if (drag && !drag.moved && o.onTap && o.pickable) {
      const r = canvas.getBoundingClientRect();
      ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      place(); ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObject(o.pickable(), true)[0];
      if (hit) o.onTap(hit.point, hit);
    }
    drag = null; canvas.style.cursor = 'grab';
  });
  canvas.addEventListener('pointercancel', () => { drag = null; canvas.style.cursor = 'grab'; });
  canvas.addEventListener('keydown', e => {
    const k = { ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, 0.08], ArrowDown: [0, -0.08] }[e.key];
    if (k) { view.yaw += k[0]; view.pitch = Math.max(0.15, Math.min(1.45, view.pitch + k[1])); invalidate(); e.preventDefault(); }
    else if ((e.key === 'Enter' || e.key === ' ') && o.onKey) { o.onKey(); e.preventDefault(); }
  });

  function label(html, pos, cls = '', below = false) {
    const d = document.createElement('div'); d.className = 'l3d ' + cls; d.innerHTML = html; d.setAttribute('aria-hidden', 'true');
    wrap.appendChild(d); const L = { el: d, pos, below }; labels.push(L); return L;
  }
  function setFocus(opts = {}) {
    if (opts.target) target.copy(opts.target);
    if (opts.radius != null) radius = opts.radius;
    if (opts.radiusY != null) radiusY = opts.radiusY;
    if (opts.dist != null) { view.dist = opts.dist; }
    else fitDist();
    if (opts.yaw != null) view.yaw = opts.yaw;
    if (opts.pitch != null) view.pitch = opts.pitch;
    invalidate();
  }
  size();
  return { scene, camera, renderer, wrap, canvas, view, target, invalidate, kick, label, setFocus,
    /** Force one paint even if IntersectionObserver has not yet marked the canvas visible. Call after building the scene. */
    ready() { if (!inked) inkAll(); if (shadowState === 0) shadowState = 1; dirty = true; if (!visible) { visible = true; render(); } else kick(); },
    /** Ink meshes added after ready() (dynamic geometry). */
    inkNew(obj) { if (o.ink !== false) addInkHulls(obj || scene, inkU, { color: o.inkColor, opacity: o.inkOpacity, minR: o.inkMinR }); },
    reshadow() { if (shadowState === 2 && o.contactShadow !== false) { contactShadow(scene, { opacity: o.shadowOpacity }); invalidate(); } },
    get visible() { return visible; }, get radius() { return radius; } };
}


/** Soft CIECH-ish lighting + shared RoomEnvironment so Standard metal catches specular (Watch path). */
let _envRT = null;
function ensureEnv(renderer) {
  if (_envRT) return _envRT;
  const pmrem = new THREE.PMREMGenerator(renderer);
  _envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  pmrem.dispose();
  return _envRT;
}
export function softLights(scene, opts = {}) {
  // Lower default hemi — high wash flattened Standard metals + caused near-white canvas false-CLIP
  const hemi = new THREE.HemisphereLight(opts.sky ?? 0xfff6ea, opts.ground ?? 0x8a98a8, opts.hemi ?? 0.95);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(opts.key ?? 0xfff2e0, opts.keyI ?? 1.25);
  key.position.set(opts.keyPos?.[0] ?? 3.5, opts.keyPos?.[1] ?? 6.5, opts.keyPos?.[2] ?? 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(opts.fill ?? 0xdde8ff, opts.fillI ?? 0.38);
  fill.position.set(opts.fillPos?.[0] ?? -4, opts.fillPos?.[1] ?? 2.5, opts.fillPos?.[2] ?? -2.5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(opts.rim ?? 0xe8f0ff, opts.rimI ?? 0.45);
  rim.position.set(opts.rimPos?.[0] ?? -2.5, opts.rimPos?.[1] ?? 3.5, opts.rimPos?.[2] ?? -5);
  scene.add(rim);
  // Narrow warm glint — Continuous brushed metal needs a hard specular catch under SwiftShader
  // (RoomEnvironment alone washes to soft blobs). Intensity low so brass chroma stays warm.
  let glint = null;
  if (opts.glint !== false) {
    glint = new THREE.DirectionalLight(opts.glintCol ?? 0xfff0d8, opts.glintI ?? 0.55);
    glint.position.set(opts.glintPos?.[0] ?? 6.5, opts.glintPos?.[1] ?? 8.5, opts.glintPos?.[2] ?? 1.2);
    scene.add(glint);
  }
  // Attach env map if a renderer was passed (or scene.userData.renderer)
  const renderer = opts.renderer || scene.userData.renderer;
  if (renderer && opts.envI !== 0) {
    try {
      if (!scene.environment) {
        const rt = ensureEnv(renderer);
        scene.environment = rt.texture;
      }
      scene.environmentIntensity = opts.envI ?? 0.75;
    } catch (_) { /* RoomEnvironment optional */ }
  }
  return { hemi, key, fill, rim, glint };
}
