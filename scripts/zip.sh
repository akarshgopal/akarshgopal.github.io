#!/bin/sh
# dist/ plus the top-level .md files only → /workspace/ai-explainer.zip
set -e; cd "$(dirname "$0")/.."
python3 - <<'PY'
import zipfile, glob, os
out = '../ai-explainer.zip'
if os.path.exists(out): os.remove(out)
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for f in sorted(glob.glob('dist/**/*', recursive=True)) + sorted(glob.glob('*.md')):
        if os.path.isfile(f): z.write(f, 'ai-explainer/' + f)
print(out, os.path.getsize(out), 'bytes')
PY
