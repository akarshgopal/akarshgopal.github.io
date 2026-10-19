#!/bin/bash
# Ship: copy dist to the preview server root and rebuild the zip (dist/ + top-level .md files only).
cd "$(dirname "$0")/.."
cp -r dist/* /tmp/site/
python3 - <<'PY'
import os, zipfile, glob
out = '/workspace/electricity-explainer.zip'
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk('dist'):
        for f in files: p = os.path.join(root, f); z.write(p, os.path.join('electricity-explainer', p))
    for md in sorted(glob.glob('*.md')): z.write(md, os.path.join('electricity-explainer', md))
print(out, round(os.path.getsize(out) / 1e6, 2), 'MB')
PY
cmp -s dist/index.html /tmp/site/index.html && echo "preview synced"
