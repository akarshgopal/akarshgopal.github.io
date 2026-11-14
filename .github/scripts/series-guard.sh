#!/usr/bin/env bash
# Fails if a refresh of blog/ai or blog/electricity would put back an older version of either series.
# Each check is a marker of work that exists only in the current pages. A correct rebuild from an up-to-date
# source keeps every marker; a stale one drops some. See SERIES-SOURCES.md before changing this file.
set -u
fail=0
need()   { if ! grep -q -- "$2" "$1" 2>/dev/null; then echo "::error file=$1::missing: $3"; fail=1; fi; }
forbid() { if grep -q -- "$2" "$1" 2>/dev/null; then echo "::error file=$1::found: $3"; fail=1; fi; }
exists() { if [ ! -e "$1" ]; then echo "::error::missing file $1 ($2)"; fail=1; fi; }

A=blog/ai
exists "$A/binds.html"  "the What binds page (5 Nov 2026)"
exists "$A/thesis.js"   "the thesis figures (5 Nov 2026)"
need   "$A/index.html"  'Start with <a href="essay.html">' "the index as contents page (6 Nov 2026)"
need   "$A/essay.html"  'id="s18"'            "the essay's closing act, sections 15-18 (6 Nov 2026)"
need   "$A/demand.html" 'id="reconcile"'      "the bottom-up demand reconciliation (5 Nov 2026)"
need   "$A/verdict.html" 'data-xfig="meterSteps"' "the step-by-step meter on the Verdict (5 Nov 2026)"
need   "$A/app.js"      'Rubin (2026)'        "Rubin on the roofline (6 Nov 2026)"
forbid "$A/app.js"      '\\u20AC'             "euro prices (the series is in US dollars since 5 Nov 2026)"
for f in "$A"/*.html; do forbid "$f" 'written for Akarsh Gopal' "the old byline (copy-edits of 5 Nov 2026)"; done
need   "$A/app.js"      '_kbdPtr('            "keyboard access to the figures (9 Nov 2026)"
need   "$A/style.css"   'prefers-color-scheme: dark' "dark mode (9 Nov 2026)"
need   "$A/style.css"   'body.series-open nav.series { -webkit-backdrop-filter: none' "the phone drawer fix (9 Nov 2026)"

E=blog/electricity
need   "$E/index.html"   'Why Did Electricity Stop Getting Cheaper?' "the restructured series title (31 Oct 2026)"
need   "$E/futures.html" 'data-fig="billSplit"' "the household kWh split back to 1951 (essay 9)"
need   "$E/style.css"   '.kbd-ptr'            "keyboard access to the figures (9 Nov 2026)"
need   "$E/style.css"   'prefers-color-scheme: dark' "dark mode (9 Nov 2026)"
need   "$E/style.css"   'inset: 0; z-index: 19;' "the phone drawer fix (9 Nov 2026)"
exists "$E/feed.xml"    "the RSS feed (7 Nov 2026)"
n=$(ls "$E"/*.html 2>/dev/null | wc -l)
if [ "$n" -lt 12 ]; then echo "::error::blog/electricity has $n pages; the current series has 12 or more"; fail=1; fi

# cache stamps: every local script and stylesheet is loaded as name?v=<hash of the file> (9 Nov 2026)
python3 .github/scripts/stamp-assets.py --check || fail=1

if [ "$fail" -ne 0 ]; then
  echo
  echo "This change would put back an older version of a series. Read SERIES-SOURCES.md at the root of master."
  echo "For blog/ai: port docs/AI-SERIES-PORT.md (branch electricity-source) into the ai-explainer source first."
  echo "For blog/electricity: build from the head of the electricity-source branch."
  exit 1
fi
echo "Both series pass the guard."
