#!/usr/bin/env python3
"""Run after any rebuild of blog/ai/ from the ai-explainer source (or after editing its .js/.css files).

1. Keyboard access: if blog/ai/app.js lacks the keyboard pointer (Fig._kbdPtr, added 9 Nov 2026 and not yet in the
   ai-explainer source), insert it: a hook at the end of the figure class's interact() and the method from
   .github/scripts/ai-kbd-method.js. The method uses only its own locals and `this`, so it survives re-minification.
2. Cache stamps: rewrite every ?v= stamp (.github/scripts/stamp-assets.py).

Usage, from the repository root: python3 .github/scripts/ai-postbuild.py
Once ai-explainer has the keyboard pointer itself (docs/AI-PORT-KIT.md on electricity-source), step 1 does nothing.
"""
import os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = 'blog/ai/app.js'
ANCHOR = re.compile(r'(\.addEventListener\("pointerleave",\(\)=>\{![A-Za-z_$][\w$]*&&([A-Za-z_$][\w$]*)\.hover&&\(\2\.hover\(null,-1,-1\),this\.invalidate\(\)\)\}\))\}(\};function [A-Za-z_$][\w$]*\(\)\{)')


def keyboard():
    s = open(APP, encoding='utf-8').read()
    if '_kbdPtr(' in s:
        print('app.js already has the keyboard pointer.')
        return 0
    hits = ANCHOR.findall(s)
    if len(hits) != 1:
        print(f'Could not find the end of interact() in {APP} ({len(hits)} matches). Port the keyboard pointer by hand: '
              'see docs/AI-PORT-KIT.md on the electricity-source branch.')
        return 1
    method = open(os.path.join(HERE, 'ai-kbd-method.js'), encoding='utf-8').read()
    param = hits[0][1]  # interact()'s handler argument; the method names its own parameter, so any name works
    s = ANCHOR.sub(lambda m: f'{m.group(1)},{param}.keys!==!1&&this._kbdPtr({param})}}{method}{m.group(3)}', s)
    open(APP, 'w', encoding='utf-8').write(s)
    print('Inserted the keyboard pointer into app.js.')
    return 0


if __name__ == '__main__':
    rc = keyboard()
    rc |= subprocess.call([sys.executable, os.path.join(HERE, 'stamp-assets.py')])
    sys.exit(rc)
