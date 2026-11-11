// 4×4 output-stationary systolic array as a soft 3D grid of PEs.
// A beads flow +X along rows; B beads flow −Z along columns; cells flash on multiply-add.
// Mid-action default: wave mid-array so several PEs are lit on first paint.
import * as THREE from 'three';
import { stage3d, softLights } from './stage3d.js';
import { softMat, metalMat, plasticMat, addBevelBox, addBevelFrame, roundedMesh, makeReveal, roundedBoxGeo, inkEdges, paleBoard } from './materials.js';

const N = 4, TMAX = 3 * N - 2, SPEED = 1.05;
const MA = [[1, 2, 0, 1], [0, 1, 1, 2], [2, 0, 1, 1], [1, 1, 0, 2]];
const MB = [[1, 0, 2, 1], [2, 1, 0, 1], [0, 2, 1, 0], [1, 1, 1, 2]];

function mat(hex, opts = {}) {
  return softMat(hex, opts);
}

export function systolic3d(el, opt) {
  const ui = opt.ui;
  const narrow = w => w < 560;
  // mid-action: wave crossing the diagonal so ~6–8 cells are busy
  let t = N + 0.55, run = true, hold = 0.4;
  let revealRef = null;

  const st = stage3d(el, {
    ui,
    label: 'A four-by-four systolic array in three dimensions. Inputs march along rows, weights down columns; each cell multiplies the pair that meet and keeps a running total.',
    height: w => (narrow(w) ? Math.round(Math.max(340, w * 0.95)) : Math.round(Math.min(460, w * 0.55))),
    radius: 3.2, radiusY: 2.4, yaw: -0.55, pitch: 0.48,
    target: new THREE.Vector3(1.35, 0.35, 1.35),
    fitPad: 1.12, fov: 30,
    busy: () => run || (revealRef && !revealRef.done),
    onShow() { revealRef?.arm(); st && st.invalidate(); },
    step(dt) {
      if (revealRef) revealRef.tick(dt);
      if (!run && !(revealRef && !revealRef.done)) return false;
      if (hold > 0) { hold -= dt; sync(); return true; }
      t = Math.min(TMAX + 0.999, t + dt * SPEED);
      if (t >= TMAX + 0.999) { run = false; t = TMAX; }
      sync();
      return run;
    },
  });
  if (!st) return false;
  softLights(st.scene, { hemi: 1.4, keyI: 1.15, fillI: 0.45, rimI: 0.35 });

  const root = new THREE.Group(); st.scene.add(root);
  const pitch = 0.95;
  const mPe = softMat(0xe2e2de, { shininess: 30, specular: 0x555555 }); // QA18: idle cell = T9 light neutral; warms as its sum accumulates
  const mLip = metalMat(0xc8c8c4, { shininess: 70 });
  const mFace = metalMat(0xb4b4b0, { shininess: 55 });
  const mPin = metalMat(0xc4a060);
  const cells = [];
  const T_YEL = new THREE.Color(0xe9c14f), T_ORG = new THREE.Color(0xe48850), warmC = new THREE.Color();
  function makeGlyph(text) {
    const c = document.createElement('canvas'); c.width = 128; c.height = 128;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 128, 128);
    ctx.font = '700 56px ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1a1a18';
    ctx.fillText(text, 64, 68);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), m);
    mesh.rotation.x = -Math.PI / 2;
    mesh.userData.canvas = c; mesh.userData.ctx = ctx; mesh.userData.tex = tex;
    return mesh;
  }
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const g = new THREE.Group();
    const body = roundedMesh(0.7, 0.28, 0.7, mPe.clone(), 0.05);
    g.add(body);
    // top bevel lip (filleted)
    const lip = roundedMesh(0.74, 0.035, 0.74, mLip, 0.02);
    lip.position.y = 0.15; g.add(lip);
    // PE face vents on all four sides (Watch-ish micro-detail)
    for (const sx of [-1, 1]) {
      for (let v = 0; v < 3; v++) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.12), mFace);
        slot.position.set(sx * 0.36, 0.02, -0.18 + v * 0.18); g.add(slot);
      }
    }
    for (const sz of [-1, 1]) {
      for (let v = 0; v < 3; v++) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.03), mFace);
        slot.position.set(-0.18 + v * 0.18, 0.02, sz * 0.36); g.add(slot);
      }
    }
    // denser bond-pad ring on PE top
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.035, 8), mPin);
      pin.position.set(Math.cos(a) * 0.28, 0.16, Math.sin(a) * 0.28); g.add(pin);
    }
    // MAC activity LED
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 10, 10),
      softMat(0x3ecfc4, { emissive: 0x1d9a92, emissiveIntensity: 0.1 })
    );
    led.position.set(0.22, 0.2, -0.22); g.add(led);
    const glyph = makeGlyph('0');
    glyph.position.y = 0.2; g.add(glyph);
    g.position.set(j * pitch, 0, i * pitch);
    root.add(g);
    cells.push({ g, body, i, j, mat: body.material, glyph, led });
  }
  // board under array + bevel frame + A/B copper traces
  const boardW = N * pitch + 0.7, boardD = N * pitch + 0.7;
  const boardG = new THREE.Group();
  boardG.position.set((N - 1) * pitch / 2, -0.2, (N - 1) * pitch / 2); root.add(boardG);
  const board = new THREE.Mesh(roundedBoxGeo(boardW, 0.1, boardD, 0.04), paleBoard(0xdcdcd8) /* QA18 light neutral */);
  boardG.add(board);
  addBevelFrame(boardG, boardW - 0.08, boardD - 0.08, 0.07, metalMat(0xb4b4b0), { t: 0.035, railH: 0.05, overhang: 0.03 });
  addBevelBox(boardG, boardW - 0.12, 0.03, boardD - 0.12, metalMat(0xc8c8c4), 0.09);
  // row (A) and column (B) traces
  for (let i = 0; i < N; i++) {
    const trA = new THREE.Mesh(new THREE.BoxGeometry(N * pitch + 0.3, 0.015, 0.05), metalMat(0x88c049, { shininess: 60 }) /* A traces = inputs green */);
    trA.position.set((N - 1) * pitch / 2, -0.13, i * pitch); root.add(trA);
    const trB = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.015, N * pitch + 0.3), metalMat(0x4ec4c0, { shininess: 60 }));
    trB.position.set(i * pitch, -0.125, (N - 1) * pitch / 2); root.add(trB);
  }

  // board settles first, then all 16 PEs cascade in (Watch-like assembly)
  const reveal = makeReveal(
    [{ obj: boardG, delay: 0.0, drop: 0.18, fromScale: 0.7 }].concat(
      cells.map((c, i) => ({ obj: c.g, delay: 0.12 + i * 0.04, drop: 0.32, fromScale: 0.35 }))
    ),
    { dur: 0.75 }
  );
  revealRef = reveal;
  reveal.arm();

  // flowing beads
  const mA = mat(0x88c049, { emissive: 0x5a9a2a, emissiveIntensity: 0.3 }); // QA18 T9 green = inputs (data)
  const mB = mat(0x5acbc1, { emissive: 0x2aa8a4, emissiveIntensity: 0.3 }); // QA18 T9 cyan = weights
  const aBeads = [], bBeads = [];
  for (let i = 0; i < N; i++) for (let k = 0; k < N; k++) {
    const a = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), mA); a.visible = false; root.add(a);
    aBeads.push({ mesh: a, i, k });
  }
  for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), mB); b.visible = false; root.add(b);
    bBeads.push({ mesh: b, j, k });
  }

  const edgeInk = new THREE.LineBasicMaterial({ color: 0x2b2b2a, transparent: true, opacity: 0.1 });
  root.traverse(ch => {
    if (!ch.isMesh || !ch.geometry || ch.geometry.type === 'SphereGeometry' || ch.geometry.type === 'CylinderGeometry') return;
    try { ch.add(new THREE.LineSegments(inkEdges(ch.geometry, 28), edgeInk.clone())); } catch (_) {}
  });

  st.label('<span class="c-green">A →</span>', () => new THREE.Vector3(-1.15, 0.55, (N - 1) * pitch / 2), '');
  st.label('<span class="c-cyan">B ↓</span>', () => new THREE.Vector3((N - 1) * pitch / 2, 0.55, -1.15), '');

  function acc(i, j, upto) {
    let s = 0;
    for (let k = 0; k < N; k++) if (k + i + j <= upto) s += MA[i][k] * MB[k][j];
    return s;
  }

  function sync() {
    const ti = Math.floor(t), fr = t - ti;
    const sm = (a, b) => (fr <= a ? 0 : fr >= b ? 1 : ((u) => u * u * (3 - 2 * u))((fr - a) / (b - a)));
    const ta = ti + sm(0.35, 0.7), tb = ti + sm(0.7, 1);

    for (const { body, i, j, glyph, led } of cells) {
      const mm = body.material; // reveal clones materials — always read the live one
      const k = ti - i - j;
      const act = k >= 0 && k < N;
      const done = ti >= i + j + N - 1;
      const sum = acc(i, j, ti);
      // QA18 colour story: idle neutral → yellow while multiplying → orange as the sum fills in (T9 warm)
      const fin = acc(i, j, 1e9) || 1, fill = Math.max(0, Math.min(1, sum / fin));
      warmC.setHex(0xe2e2de).lerp(T_YEL, Math.min(1, fill * 1.6)).lerp(T_ORG, done ? 1 : Math.max(0, fill - 0.4) / 0.6 * 0.7);
      mm.color.copy(act ? T_YEL : warmC);
      mm.emissive.copy(act ? T_YEL : warmC);
      mm.emissiveIntensity = act ? 0.28 : fill > 0 ? 0.12 : 0;
      body.scale.y = act ? 1.15 : 1;
      if (led) {
        led.material.emissiveIntensity = act ? 0.7 : done ? 0.25 : 0.08;
        led.material.color.setHex(act ? 0xe9c14f : done ? 0xe48850 : 0xc8c8c4);
      }
      if (glyph) {
        const ctx = glyph.userData.ctx, tex = glyph.userData.tex;
        ctx.clearRect(0, 0, 128, 128);
        ctx.font = '700 56px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = done ? '#ffffff' : sum ? '#2a2622' : '#9aa0a8';
        ctx.fillText(String(sum), 64, 68);
        tex.needsUpdate = true;
      }
    }
    for (const { mesh, i, k } of aBeads) {
      const p = ta - k - i;
      const on = p > -1.2 && p < N + 0.2;
      mesh.visible = on;
      if (on) mesh.position.set(p * pitch, 0.35, i * pitch);
    }
    for (const { mesh, j, k } of bBeads) {
      const p = tb - k - j;
      const on = p > -1.2 && p < N + 0.2;
      mesh.visible = on;
      if (on) mesh.position.set(j * pitch, 0.35, p * pitch);
    }
    paintRo();
    st.invalidate();
  }

  const ctl = ui.controls(el);
  const ro = ui.readout(el);
  function paintRo() {
    const ti = Math.min(Math.floor(t), TMAX);
    let busy = 0;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const k = ti - i - j; if (k >= 0 && k < N) busy++;
    }
    ro.innerHTML = ti >= TMAX
      ? `Done in <b>${TMAX}</b> ticks: <b class="c-blue">64</b> multiply-adds from <b>32</b> numbers, each reused four times.`
      : `Tick <b>${ti}</b>: <b class="c-blue">${busy}</b> of 16 cells multiplying — no cell goes back to memory.`;
  }
  ui.button(ctl, 'Play', () => { t = 0; hold = 0.25; run = true; sync(); st.kick(); }, { kind: 'primary', name: 'sy3-play' });
  ui.button(ctl, 'Next tick', () => { run = false; t = (Math.floor(t) + 1) % (TMAX + 1); sync(); }, { name: 'sy3-step' });
  ui.hint(el, 'mid-wave · <span class="c-green">inputs</span> and <span class="c-cyan">weights</span> meet; sums warm to <span class="c-orange">orange</span>');
  sync();
  if (st.view.dist < 6.2) st.view.dist = 6.2;
  st.ready();
  return true;
}
