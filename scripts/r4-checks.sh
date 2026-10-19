#!/bin/bash
# Full gate: stress audit at 1280+390 on every page, link check, file:// check. Summary at the end.
cd "$(dirname "$0")/.."
for p in index solar-pv utility-renewables transformers transmission synthetic-fuels; do
  echo "== $p"; node scripts/audit.mjs 1280,390 --stress --page=$p.html 2>&1 | grep -v '^\s*$' | tail -12
done
echo "== links"; pnpm -s links 2>&1 | tail -2
echo "== fa"; node scripts/fa-fileall.mjs 2>&1 | grep -E "errors|Error" 
echo "== END"
