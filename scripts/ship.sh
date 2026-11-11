#!/bin/bash
# commit everything with message $1, refresh the :8766 preview, rezip.
cd "$(dirname "$0")/.." && node build.mjs >/dev/null && git add -A && git -c user.name="Akarsh Gopal" -c user.email=akarsh@local commit -qm "$1" && git log --oneline -1 && bash scripts/preview.sh >/dev/null && bash scripts/zip.sh && curl -s -o /dev/null -w 'preview %{http_code}\n' http://127.0.0.1:8766/ai/index.html
