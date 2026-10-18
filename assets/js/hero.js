/* akarshgopal.github.io · real-time WebGL hero.
   A blueprint-style wireframe launch vehicle with hidden-line rendering, an orbit ring, an Earth-limb
   graticule and a star field. Reacts to cursor and scroll. Lazy: three.js is fetched only after the page
   has loaded, only when WebGL is available, and rendering pauses when the hero is off-screen.
   With reduced motion it renders a single still frame. */
const stage = document.getElementById('hero-gl');
const hero = document.querySelector('.hero');
const labelsEl = document.querySelector('.hero-labels');
const reticle = document.querySelector('.reticle');
const T = (k) => document.querySelector(`[data-t="${k}"]`);
const readGl = T('gl'), readAz = T('az'), readTraj = T('traj');

function hasWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}
const saveData = navigator.connection && navigator.connection.saveData;

if (stage && hero && hasWebGL() && !saveData) {
  const go = () => import('../vendor/three.min.js').then(init).catch((e) => { if (readGl) readGl.textContent = 'FALLBACK'; console.warn('hero: 3D unavailable', e); });
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
  if (document.readyState === 'complete') idle(go, { timeout: 1500 }); else addEventListener('load', () => idle(go, { timeout: 1500 }), { once: true });
} else if (readGl) readGl.textContent = 'STATIC';

function init(THREE) {
  const reduced = () => (window.AG && window.AG.reduced ? window.AG.reduced() : matchMedia('(prefers-reduced-motion: reduce)').matches);
  const small = matchMedia('(max-width: 56rem)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  const CYAN = new THREE.Color(0x63e3ff), ORANGE = new THREE.Color(0xff7a3d), BG = new THREE.Color(0x06090e);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.5 : 1.75));
  renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(BG, 26, 70);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  camera.position.set(0, 0.6, 24);

  /* ---------- launch vehicle (generic two-stage, blueprint wireframe) ---------- */
  const vehicle = new THREE.Group();
  scene.add(vehicle);
  const R = 0.62;
  // [y, r] profile, bottom to top
  const profile = [[0, 0.5], [0.12, 0.47], [0.45, 0.33], [0.62, 0.3], [0.7, R], [5.2, R], [5.25, 0.58], [5.6, 0.58], [5.65, R], [8.0, R],
    [8.05, 0.66], [8.5, 0.66], [9.2, 0.56], [9.8, 0.36], [10.25, 0.14], [10.42, 0]];
  const lathePts = profile.map(([y, r]) => new THREE.Vector2(r, y));
  const body = new THREE.LatheGeometry(lathePts, 48);
  const occluder = new THREE.Mesh(body, new THREE.MeshBasicMaterial({ color: BG, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
  vehicle.add(occluder);

  const lineMat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.95 });
  const faintMat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.32 });
  const accMat = new THREE.LineBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.95 });
  const segs = [], faint = [], acc = [];
  const ring = (arr, y, r, n = 64) => { for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, b = ((i + 1) / n) * Math.PI * 2; arr.push(Math.cos(a) * r, y, Math.sin(a) * r, Math.cos(b) * r, y, Math.sin(b) * r); } };
  // structural rings at profile breaks
  profile.forEach(([y, r]) => { if (r > 0.05) ring(segs, y, r); });
  // stringers / frames on tanks (faint)
  for (let y = 1.2; y < 5.2; y += 0.55) ring(faint, y, R);
  for (let y = 6.1; y < 8.0; y += 0.55) ring(faint, y, R);
  // meridians
  const M = 16;
  for (let m = 0; m < M; m++) {
    const a = (m / M) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    for (let i = 0; i < profile.length - 1; i++) {
      const [y0, r0] = profile[i], [y1, r1] = profile[i + 1];
      (m % 4 === 0 ? segs : faint).push(c * r0, y0, s * r0, c * r1, y1, s * r1);
    }
  }
  // fins
  for (let f = 0; f < 4; f++) {
    const a = (f / 4) * Math.PI * 2 + Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
    const pts = [[R, 2.1], [1.45, 0.75], [1.45, 0.25], [R, 0.7]];
    for (let i = 0; i < pts.length; i++) { const [r0, y0] = pts[i], [r1, y1] = pts[(i + 1) % pts.length]; segs.push(c * r0, y0, s * r0, c * r1, y1, s * r1); }
  }
  // engine bell detail (accent)
  ring(acc, 0.02, 0.5); ring(acc, 0.3, 0.38);
  // interstage band accent
  ring(acc, 5.25, 0.585); ring(acc, 5.6, 0.585);
  const mk = (arr, mat) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3)); return new THREE.LineSegments(g, mat); };
  vehicle.add(mk(segs, lineMat), mk(faint, faintMat), mk(acc, accMat));
  // centre line (dashed)
  {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(0, 11.6, 0)]);
    const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color: CYAN, dashSize: 0.25, gapSize: 0.18, transparent: true, opacity: 0.35 }));
    l.computeLineDistances(); vehicle.add(l);
  }
  vehicle.position.y = -5.2;
  const spin = new THREE.Group(); // spins about the long axis
  scene.add(spin); spin.add(vehicle);

  /* ---------- exhaust plume (points) ---------- */
  const dot = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.35, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); return t; })();
  const NP = small ? 160 : 320;
  const pPos = new Float32Array(NP * 3), pVel = new Float32Array(NP * 3), pLife = new Float32Array(NP);
  const spawn = (i, t) => { const a = Math.random() * Math.PI * 2, r = Math.random() * 0.32; pPos[i * 3] = Math.cos(a) * r; pPos[i * 3 + 1] = -0.05; pPos[i * 3 + 2] = Math.sin(a) * r; pVel[i * 3] = Math.cos(a) * r * 0.9; pVel[i * 3 + 1] = -(2.6 + Math.random() * 2.2); pVel[i * 3 + 2] = Math.sin(a) * r * 0.9; pLife[i] = t; };
  for (let i = 0; i < NP; i++) { spawn(i, Math.random()); for (let k = 0; k < 3; k++) pPos[i * 3 + k] += pVel[i * 3 + k] * pLife[i] * 0.5; }
  const plumeGeo = new THREE.BufferGeometry(); plumeGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const plume = new THREE.Points(plumeGeo, new THREE.PointsMaterial({ color: ORANGE, size: small ? 0.22 : 0.26, map: dot, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  vehicle.add(plume);

  /* ---------- orbit ring with a tracked object ---------- */
  const orbit = new THREE.Group(); scene.add(orbit);
  orbit.rotation.set(1.18, 0, 0.32);
  {
    const pts = []; for (let i = 0; i <= 256; i++) { const a = (i / 256) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * 7.2, 0, Math.sin(a) * 7.2)); }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color: CYAN, dashSize: 0.18, gapSize: 0.22, transparent: true, opacity: 0.4 }));
    l.computeLineDistances(); orbit.add(l);
    const pts2 = []; for (let i = 0; i <= 256; i++) { const a = (i / 256) * Math.PI * 2; pts2.push(new THREE.Vector3(Math.cos(a) * 9.4, 0, Math.sin(a) * 9.4)); }
    orbit.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.1 })));
  }
  const sat = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3)),
    new THREE.PointsMaterial({ color: ORANGE, size: 0.6, map: dot, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  orbit.add(sat);

  /* ---------- Earth limb graticule ---------- */
  const globe = new THREE.Group(); scene.add(globe);
  {
    const RG = 34, g = [];
    for (let lat = -80; lat <= 80; lat += 10) { const p = (lat * Math.PI) / 180, r = Math.cos(p) * RG, y = Math.sin(p) * RG; for (let i = 0; i < 120; i++) { const a = (i / 120) * Math.PI * 2, b = ((i + 1) / 120) * Math.PI * 2; g.push(Math.cos(a) * r, y, Math.sin(a) * r, Math.cos(b) * r, y, Math.sin(b) * r); } }
    for (let lon = 0; lon < 360; lon += 10) { const a = (lon * Math.PI) / 180; for (let i = 0; i < 60; i++) { const p0 = -Math.PI / 2 + (i / 60) * Math.PI, p1 = -Math.PI / 2 + ((i + 1) / 60) * Math.PI; g.push(Math.cos(a) * Math.cos(p0) * RG, Math.sin(p0) * RG, Math.sin(a) * Math.cos(p0) * RG, Math.cos(a) * Math.cos(p1) * RG, Math.sin(p1) * RG, Math.sin(a) * Math.cos(p1) * RG); } }
    const occ = new THREE.Mesh(new THREE.LatheGeometry(Array.from({ length: 33 }, (_, i) => { const p = -Math.PI / 2 + (i / 32) * Math.PI; return new THREE.Vector2(Math.cos(p) * RG * 0.995, Math.sin(p) * RG * 0.995); }), 64),
      new THREE.MeshBasicMaterial({ color: BG, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
    globe.add(occ, mk(g, new THREE.LineBasicMaterial({ color: 0x2f6f9f, transparent: true, opacity: 0.55 })));
  }
  globe.position.set(0, -42.5, -12);
  globe.rotation.z = 0.12;

  /* ---------- star field ---------- */
  {
    const N = small ? 600 : 1500, a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = 45 + Math.random() * 60, s = Math.sqrt(1 - u * u); a[i * 3] = s * Math.cos(th) * r; a[i * 3 + 1] = u * r * 0.7 + 10; a[i * 3 + 2] = s * Math.sin(th) * r - 30; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3));
    var stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x9fc7ee, size: 1.4, sizeAttenuation: false, transparent: true, opacity: 0.55, depthWrite: false, fog: false }));
    scene.add(stars);
  }

  /* ---------- callout labels (HTML, projected from 3D) ---------- */
  const callouts = [['FAIRING', 9.3, 'PL'], ['STAGE 2', 6.9, 'S2'], ['INTERSTAGE', 5.42, 'IS'], ['STAGE 1', 3.2, 'S1'], ['ENGINE', 0.25, 'E1']].map(([name, y, id]) => {
    const el = document.createElement('div'); el.className = 'hl'; el.innerHTML = `<b>${id}</b>${name}`; labelsEl && labelsEl.appendChild(el);
    return { el, p: new THREE.Vector3(R + 0.05, y, 0) };
  });
  const tmp = new THREE.Vector3();

  /* ---------- sizing ---------- */
  let W = 1, H = 1;
  function resize() {
    const r = stage.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    // shift the vehicle into the right part of the frame on wide screens
    const wide = W > 900;
    camera.setViewOffset(W, H, wide ? -W * 0.2 : 0, wide ? 0 : H * 0.2, W, H);
    camera.fov = wide ? 30 : 38;
    camera.updateProjectionMatrix();
    if (!running) frame(performance.now(), true);
  }

  /* ---------- input ---------- */
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  addEventListener('pointermove', (e) => {
    tmx = (e.clientX / innerWidth) * 2 - 1; tmy = (e.clientY / innerHeight) * 2 - 1;
    if (reticle && e.pointerType === 'mouse') { const r = hero.getBoundingClientRect(); reticle.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`; }
  }, { passive: true });
  let scrollP = 0;
  const onScroll = () => { const h = hero.offsetHeight || 1; scrollP = Math.min(1, Math.max(0, scrollY / h)); if (!running) frame(performance.now(), true); };
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- loop ---------- */
  let running = false, visible = true, last = performance.now(), time = 0, raf = 0;
  function frame(now, still) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!still) time += dt;
    mx += (tmx - mx) * (still ? 1 : 0.05); my += (tmy - my) * (still ? 1 : 0.05);
    const p = scrollP, e = p * p * (3 - 2 * p);

    spin.rotation.y = time * 0.18 + e * 1.6;
    spin.rotation.z = -0.08 + mx * 0.05;
    spin.rotation.x = 0.06 + my * 0.04;
    spin.position.y = Math.sin(time * 0.8) * 0.08 + e * 7.5;
    camera.position.x = mx * 1.4;
    camera.position.y = 0.6 - my * 0.9 + e * 2.5;
    camera.position.z = 31 + e * 6 + (W < 900 ? 6 : 0);
    camera.lookAt(0, -0.6 + e * 4, 0);
    orbit.rotation.y = time * 0.05;
    sat.position.set(Math.cos(time * 0.5) * 7.2, 0, Math.sin(time * 0.5) * 7.2);
    globe.rotation.y = time * 0.01;
    if (stars) { stars.rotation.y = time * 0.004 + mx * 0.02; stars.rotation.x = my * 0.015; }

    // plume
    const thrust = 0.6 + e * 0.9;
    for (let i = 0; i < NP; i++) {
      if (!still) { pLife[i] += dt * (1.2 + thrust * 0.6); if (pLife[i] > 1) spawn(i, 0); }
      const L = pLife[i];
      pPos[i * 3] += pVel[i * 3] * dt * thrust; pPos[i * 3 + 1] += pVel[i * 3 + 1] * dt * thrust; pPos[i * 3 + 2] += pVel[i * 3 + 2] * dt * thrust;
      if (still && L === 0) pPos[i * 3 + 1] = -0.05;
    }
    plumeGeo.attributes.position.needsUpdate = true;
    plume.material.opacity = 0.55 + e * 0.4;

    renderer.render(scene, camera);

    // callouts
    if (labelsEl && W > 900) {
      for (const c of callouts) {
        // anchor on the right-hand silhouette regardless of spin
        const th = spin.rotation.y, rr = R + 0.05;
        tmp.set(rr * Math.cos(th), c.p.y, rr * Math.sin(th)); vehicle.localToWorld(tmp);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * W, y = (-tmp.y * 0.5 + 0.5) * H;
        c.el.style.transform = `translate(${x.toFixed(1)}px, ${(y - 5).toFixed(1)}px)`;
        c.el.style.opacity = y < 70 || y > H - 40 ? '0' : '1';
      }
    }
    if (readAz) readAz.textContent = (((spin.rotation.y * 180) / Math.PI) % 360).toFixed(1).padStart(5, '0') + '°';
    if (readTraj) readTraj.textContent = String(Math.round(p * 100)).padStart(3, '0') + '%';

    if (running) raf = requestAnimationFrame(frame);
  }
  function start() { if (running || reduced() || !visible || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  document.addEventListener('ag:motion', () => { if (reduced()) { stop(); frame(performance.now(), true); } else start(); });
  addEventListener('resize', resize, { passive: true });

  resize(); onScroll();
  frame(performance.now(), true);
  document.documentElement.classList.add('gl-ready');
  if (readGl) readGl.textContent = reduced() ? 'STILL · WEBGL' : 'LIVE · WEBGL';
  start();
}
