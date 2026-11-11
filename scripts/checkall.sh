#!/bin/bash
# Full gate: build, stress audit (1280,390), linkcheck, file:// test, adversarial extremes (_adv), CPU (_cpu), touch claims.
# Prints a summary; non-clean lines are listed. Usage: bash scripts/checkall.sh
cd "$(dirname "$0")/.." || exit 1
node build.mjs | tail -1 || exit 1
T=$(mktemp -d); P="index essay rules flip model language parallel scaling data factory yardstick demand verdict orbital"
for pg in $P; do node scripts/audit.mjs 1280,390 --page=$pg.html --stress > $T/audit-$pg.txt 2>&1 & done; wait
for pg in $P; do (node scripts/_adv.mjs $pg.html 390 > $T/adv-$pg-390.txt 2>&1; node scripts/_adv.mjs $pg.html 1280 > $T/adv-$pg-1280.txt 2>&1) & done; wait
for pg in $P; do (node scripts/_cpu.mjs $pg.html > $T/cpu-$pg.txt 2>&1; node scripts/_touch.mjs $pg.html > $T/touch-$pg.txt 2>&1) & done; wait
echo "== model"; node scripts/modeltest.mjs | tail -2
echo "== peeks"; node scripts/peekcheck.mjs | tail -5
echo "== audit"; cat $T/audit-*.txt | grep -v "AUDIT CLEAN\|console errors: none" | grep -v SMALL || true
echo "== adv"; for f in $T/adv-*.txt; do sed -n '/# ISSUES/,$p' $f | grep -v "^# ISSUES\|^none$\|^errors: none$" | sed "s|^|$(basename $f .txt): |"; done
echo "== cpu (off-screen should be ≤3 rAF/s; in view ≤64)"; cat $T/cpu-*.txt | grep -o "^[a-z-]*.html | top: [0-9.]* rAF/s [0-9.]*% cpu | bottom: [0-9.]* rAF/s [0-9.]*% cpu"; grep -ho "[A-Za-z]*: [0-9]* rAF/s" $T/cpu-*.txt | awk '{ if ($2+0 > 64) print "HOT " $0 }'
echo "== touch (≥6/9 claimed)"; cat $T/touch-*.txt | grep -E "^[6-9]/9" || true
[ -f /workspace/electricity-explainer/dist/index.html ] || { mkdir -p /tmp/elec-dist && git -C /workspace/electricity-explainer archive HEAD dist | tar -x -C /tmp/elec-dist; export ELECTRICITY_DIST=/tmp/elec-dist/dist; }
echo "== links"; node scripts/linkcheck.mjs | tail -1
echo "== file://"; node scripts/filetest.mjs | grep -v "^OK" 
rm -rf $T
