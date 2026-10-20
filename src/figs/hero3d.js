// Hero: a three-phase generator rendered with three.js (vendored via the bundle; no CDN at runtime).
import * as THREE from 'three';
import { C } from '../lib/colors.js';
import { isPlaying, onPlayChange } from '../lib/fig.js';
import { controls, slider, segmented } from '../lib/ui.js';

export function hero3d(el) {
  const wrap = document.createElement('div');
  wrap.className = 'canvas-wrap three-wrap';
  el.appendChild(wrap);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    wrap.innerHTML = '<p class="nowebgl">This 3D figure needs WebGL, which isn’t available in this browser. Everything else on the page is 2D and will work.</p>';
    return;
  }
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'A three-dimensional generator: a two-pole magnet spins inside six copper coils that glow as voltage is induced in each of three phases. Drag to rotate.');
  wrap.appendChild(canvas);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1.6, 0.1, 100);
  camera.position.set(0, 0.5, 9.2);
  camera.lookAt(0, -0.2, 0); // aim a little low so the feet clear the bottom edge

  scene.add(new THREE.HemisphereLight(0xfff8ee, 0xb8b0a2, 1.3));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(4, 6, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0xdfe8ff, 0.9); rim.position.set(-6, 2, -5); scene.add(rim);

  const root = new THREE.Group();
  scene.add(root);
  const DEPTH = 1.6;

  // Stator ring (annulus extruded)
  const ring = new THREE.Shape();
  ring.absarc(0, 0, 2.55, 0, Math.PI * 2, false);
  const hole = new THREE.Path(); hole.absarc(0, 0, 2.05, 0, Math.PI * 2, true); ring.holes.push(hole);
  const ringGeo = new THREE.ExtrudeGeometry(ring, { depth: DEPTH, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3, curveSegments: 96 });
  ringGeo.translate(0, 0, -DEPTH / 2);
  const steel = new THREE.MeshStandardMaterial({ color: 0xcfcac0, roughness: 0.48, metalness: 0.55 });
  root.add(new THREE.Mesh(ringGeo, steel));

  // Teeth + coils
  const copperBase = new THREE.Color('#c98a55');
  // coils counter-clockwise from the right, as in the 2D three-phase figure: A, B, C, A, B, C; the rotor turns clockwise,
  // so it reaches A, then C's far coil, then B — B lags A by a third of a turn
  const phaseCols = [C.phaseA, C.phaseB, C.phaseC, C.phaseA, C.phaseB, C.phaseC].map(c => new THREE.Color(c));
  const coils = [];
  for (let k = 0; k < 6; k++) {
    const a = k * Math.PI / 3;
    const g = new THREE.Group();
    g.rotation.z = a;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, DEPTH * 0.92), steel);
    tooth.position.x = 1.78; g.add(tooth);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.78, DEPTH * 0.92), steel);
    shoe.position.x = 1.47; g.add(shoe);
    const mat = new THREE.MeshStandardMaterial({ color: copperBase.clone(), roughness: 0.32, metalness: 0.75, emissive: phaseCols[k].clone(), emissiveIntensity: 0 });
    // winding: several stacked rounded loops around the tooth
    for (let j = 0; j < 4; j++) {
      const path = new THREE.CurvePath();
      const w = 0.5, d = DEPTH * 0.98, r = 0.12;
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64 * Math.PI * 2;
        const cx = Math.cos(t), cy = Math.sin(t);
        const sx = Math.sign(cx) * Math.min(1, Math.abs(cx) * 4), sy = Math.sign(cy) * Math.min(1, Math.abs(cy) * 4);
        pts.push(new THREE.Vector3(0, (w / 2) * sx * (1 - r) + cx * r * 0.0 + 0.02 * sx, (d / 2) * sy));
      }
      void path;
      const curve = new THREE.CatmullRomCurve3(pts, true);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 96, 0.055, 8, true), mat);
      tube.position.x = 1.6 + j * 0.115;
      g.add(tube);
    }
    root.add(g);
    coils.push(mat);
  }

  // Rotor: two half cylinders (N red, S blue)
  const rotor = new THREE.Group();
  const halfGeo = (start) => { const geo = new THREE.CylinderGeometry(1.32, 1.32, DEPTH * 0.98, 64, 1, false, start, Math.PI); geo.rotateX(Math.PI / 2); return geo; };
  const nMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.north), roughness: 0.42, metalness: 0.15 });
  const sMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.south), roughness: 0.42, metalness: 0.15 });
  rotor.add(new THREE.Mesh(halfGeo(0), nMat));
  rotor.add(new THREE.Mesh(halfGeo(Math.PI), sMat));
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, DEPTH * 2.6, 32), new THREE.MeshStandardMaterial({ color: 0xbdb7ab, roughness: 0.3, metalness: 0.8 }));
  shaft.rotation.x = Math.PI / 2; rotor.add(shaft);
  // little white index mark so rotation is legible
  const mark = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.02), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  mark.position.set(0.85, 0, DEPTH * 0.5); rotor.add(mark);
  root.add(rotor);

  // Feet
  const foot = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.35, DEPTH * 1.2), new THREE.MeshStandardMaterial({ color: 0xa9a294, roughness: 0.7, metalness: 0.2 }));
  foot.position.y = -2.75; root.add(foot);

  // soft contact shadow
  const sc = document.createElement('canvas'); sc.width = sc.height = 128;
  const sg = sc.getContext('2d'); const grd = sg.createRadialGradient(64, 64, 4, 64, 64, 64);
  grd.addColorStop(0, 'rgba(60,50,40,0.35)'); grd.addColorStop(1, 'rgba(60,50,40,0)'); sg.fillStyle = grd; sg.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(7, 3), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -2.93; root.add(shadow);

  let yaw = -0.55, pitch = 0.22, speed = 0.35, ang = 0, glow = true, visible = false, raf = 0, last = 0;
  root.rotation.set(pitch, yaw, 0);

  function size() {
    const w = wrap.clientWidth || 600;
    const h = Math.round(Math.max(300, Math.min(520, w * 0.62)));
    renderer.setPixelRatio(Math.min(2.5, window.devicePixelRatio || 1));
    renderer.setSize(w, h, true);
    camera.aspect = w / h;
    camera.position.z = w < 500 ? 11.5 : 11.2; // far enough back that the whole stator ring fits on a wide screen
    camera.updateProjectionMatrix();
    render();
  }
  function render() {
    rotor.rotation.z = -ang; // clockwise, like the 2D figures
    for (let k = 0; k < 6; k++) {
      const e = Math.sin(ang + k * Math.PI / 3);
      coils[k].emissiveIntensity = glow ? Math.pow(Math.abs(e), 2) * 0.9 : 0;
    }
    root.rotation.set(pitch, yaw, 0);
    renderer.render(scene, camera);
  }
  function frame(ts) {
    raf = 0;
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
    ang += speed * 2 * Math.PI * dt;
    render();
    if (visible && isPlaying()) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && visible && isPlaying()) { last = performance.now(); raf = requestAnimationFrame(frame); } else if (!isPlaying()) render(); }
  new IntersectionObserver(es => { visible = es[0].isIntersecting; kick(); }, { rootMargin: '100px' }).observe(canvas);
  onPlayChange(() => kick());
  new ResizeObserver(size).observe(wrap);

  // drag to orbit
  let drag = null;
  canvas.style.touchAction = 'pan-y';
  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY, yaw, pitch]; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('pointermove', e => {
    if (!drag) return;
    yaw = drag[2] + (e.clientX - drag[0]) * 0.008;
    pitch = Math.max(-1.1, Math.min(1.1, drag[3] + (e.clientY - drag[1]) * 0.006));
    if (!isPlaying()) render();
  });
  const end = () => { drag = null; canvas.style.cursor = 'grab'; };
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);

  const ctl = controls(el);
  slider(ctl, { label: 'Rotor speed (slowed)', min: 0, max: 1.5, step: 0.01, value: speed, color: C.north, fmt: v => v.toFixed(2) + ' rev/s', oninput: v => { speed = v; if (!isPlaying()) render(); } });
  segmented(ctl, { options: [{ label: 'Show induced voltage', value: true }, { label: 'Plain', value: false }], value: true, onchange: v => { glow = v; render(); } });
  size();
}
