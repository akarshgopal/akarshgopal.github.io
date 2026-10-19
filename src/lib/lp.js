// Small dense two-phase simplex (Bland's rule). Solves: min c·x  s.t. rows, 0 <= x <= ub.
// rows: [{a:[...], op:'<='|'>='|'=', b}]
export function solveLP(c, rows, ub) {
  const n = c.length;
  const cons = rows.map(r => ({ a: r.a.slice(), op: r.op, b: r.b }));
  if (ub) ub.forEach((u, j) => { if (isFinite(u)) { const a = new Array(n).fill(0); a[j] = 1; cons.push({ a, op: '<=', b: u }); } });
  // normalise b >= 0
  for (const r of cons) if (r.b < 0) { r.a = r.a.map(v => -v); r.b = -r.b; r.op = r.op === '<=' ? '>=' : r.op === '>=' ? '<=' : '='; }
  const m = cons.length;
  let nSlack = 0, nArt = 0;
  for (const r of cons) { if (r.op !== '=') nSlack++; if (r.op !== '<=') nArt++; }
  const N = n + nSlack + nArt;
  const T = []; const basis = [];
  let si = n, ai = n + nSlack;
  const artCols = [];
  for (const r of cons) {
    const row = new Float64Array(N + 1);
    for (let j = 0; j < n; j++) row[j] = r.a[j];
    if (r.op === '<=') { row[si] = 1; basis.push(si); si++; }
    else if (r.op === '>=') { row[si] = -1; si++; row[ai] = 1; basis.push(ai); artCols.push(ai); ai++; }
    else { row[ai] = 1; basis.push(ai); artCols.push(ai); ai++; }
    row[N] = r.b; T.push(row);
  }
  const pivot = (pr, pc) => {
    const p = T[pr][pc];
    for (let j = 0; j <= N; j++) T[pr][j] /= p;
    for (let i = 0; i < m; i++) if (i !== pr) { const f = T[i][pc]; if (f !== 0) for (let j = 0; j <= N; j++) T[i][j] -= f * T[pr][j]; }
    basis[pr] = pc;
  };
  const run = (cost, allowed) => {
    for (let it = 0; it < 5000; it++) {
      // reduced costs
      let enter = -1;
      for (let j = 0; j < N; j++) {
        if (!allowed(j) || basis.includes(j)) continue;
        let rc = cost[j] || 0;
        for (let i = 0; i < m; i++) rc -= (cost[basis[i]] || 0) * T[i][j];
        if (rc < -1e-9) { enter = j; break; }
      }
      if (enter < 0) return true;
      let leave = -1, best = Infinity;
      for (let i = 0; i < m; i++) if (T[i][enter] > 1e-12) { const r = T[i][N] / T[i][enter]; if (r < best - 1e-12 || (Math.abs(r - best) < 1e-12 && basis[i] < basis[leave])) { best = r; leave = i; } }
      if (leave < 0) return false; // unbounded
      pivot(leave, enter);
    }
    return false;
  };
  if (nArt) {
    const c1 = new Array(N).fill(0); artCols.forEach(j => c1[j] = 1);
    run(c1, () => true);
    const infeas = T.reduce((s, row, i) => s + (artCols.includes(basis[i]) ? row[N] : 0), 0);
    if (infeas > 1e-6) return { status: 'infeasible' };
    // drive artificials out of basis where possible
    for (let i = 0; i < m; i++) if (artCols.includes(basis[i])) { for (let j = 0; j < n + nSlack; j++) if (Math.abs(T[i][j]) > 1e-9) { pivot(i, j); break; } }
  }
  const c2 = new Array(N).fill(0); for (let j = 0; j < n; j++) c2[j] = c[j];
  const ok = run(c2, j => !artCols.includes(j));
  if (!ok) return { status: 'unbounded' };
  const x = new Array(n).fill(0);
  for (let i = 0; i < m; i++) if (basis[i] < n) x[basis[i]] = T[i][N];
  const obj = x.reduce((s, v, j) => s + v * c[j], 0);
  return { status: 'optimal', x, obj };
}

// DC power-flow helpers
export function ptdf(nNodes, lines, slack) {
  // lines: [{from,to,x}] ; returns matrix [line][node]
  const idx = []; for (let i = 0; i < nNodes; i++) if (i !== slack) idx.push(i);
  const k = idx.length;
  const B = Array.from({ length: k }, () => new Array(k).fill(0));
  const pos = i => idx.indexOf(i);
  for (const l of lines) {
    const b = 1 / l.x; const a = pos(l.from), c = pos(l.to);
    if (a >= 0) B[a][a] += b; if (c >= 0) B[c][c] += b;
    if (a >= 0 && c >= 0) { B[a][c] -= b; B[c][a] -= b; }
  }
  const inv = invert(B);
  return lines.map(l => {
    const row = new Array(nNodes).fill(0);
    for (let n = 0; n < nNodes; n++) {
      if (n === slack) continue;
      const th = i => (i === slack ? 0 : inv[pos(i)][pos(n)]);
      row[n] = (th(l.from) - th(l.to)) / l.x;
    }
    return row;
  });
}

function invert(M) {
  const n = M.length; const A = M.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    const d = A[c][c]; for (let j = 0; j < 2 * n; j++) A[c][j] /= d;
    for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c]; for (let j = 0; j < 2 * n; j++) A[r][j] -= f * A[c][j]; }
  }
  return A.map(r => r.slice(n));
}
