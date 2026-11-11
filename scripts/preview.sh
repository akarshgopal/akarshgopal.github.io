#!/bin/sh
# Refresh the local preview: /tmp/ai-site/ai = this dist, /tmp/ai-site/electricity = a read-only copy of the sibling series,
# so ../electricity/ links work. Serves on 127.0.0.1:8766 (the electricity server on :8765 is left alone).
set -e
cd "$(dirname "$0")/.."
mkdir -p /tmp/ai-site
rm -rf /tmp/ai-site/ai /tmp/ai-site/electricity
cp -r dist /tmp/ai-site/ai
E=/workspace/electricity-explainer/dist
# if the sibling working tree has no dist (box reset), use a read-only export of its committed dist
if [ ! -f "$E/index.html" ]; then mkdir -p /tmp/elec-dist && git -C /workspace/electricity-explainer archive HEAD dist | tar -x -C /tmp/elec-dist; E=/tmp/elec-dist/dist; fi
cp -r "$E" /tmp/ai-site/electricity
printf '<!doctype html><meta http-equiv="refresh" content="0;url=ai/index.html"><a href="ai/index.html">Can AI outgrow the planet’s power grid?</a>\n' > /tmp/ai-site/index.html
if ! (ss -ltn 2>/dev/null | grep -q '127.0.0.1:8766'); then nohup python3 -m http.server 8766 --bind 127.0.0.1 -d /tmp/ai-site >/tmp/ai-site.log 2>&1 & fi
