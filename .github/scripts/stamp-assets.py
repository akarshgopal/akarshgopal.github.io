#!/usr/bin/env python3
"""Cache stamps for the two blog series.

Every page's local scripts and stylesheets are loaded as `name?v=<first 8 hex of the file's sha256>`. GitHub Pages lets
browsers cache files for 10 minutes; with a stamp, a page never runs a cached old script against a new deploy (in the
electricity series an old page entry would import chunk files that no longer exist).

Usage, from the repository root:
  python3 .github/scripts/stamp-assets.py           rewrite every stamp in blog/ai and blog/electricity
  python3 .github/scripts/stamp-assets.py --check   list missing or stale stamps and exit 1 if there are any

Run it after editing any .js or .css file in blog/ai (the electricity build, build.mjs on electricity-source, already
writes the same stamps). The series guard runs --check.
"""
import glob, hashlib, os, re, sys

ROOTS = ['blog/ai', 'blog/electricity']
REF = re.compile(r'''(<(?:script|link)\b[^>]*?\b(?:src|href)=")([A-Za-z0-9_./-]+\.(?:js|css))(?:\?v=([A-Za-z0-9]+))?(")''')


def digest(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:8]


def main():
    check = '--check' in sys.argv[1:]
    problems, changed = [], 0
    for root in ROOTS:
        for page in sorted(glob.glob(f'{root}/*.html')):
            html = open(page, encoding='utf-8').read()

            def fix(m):
                ref, old = m.group(2), m.group(3)
                if ref.startswith(('http', '/', '..')):
                    return m.group(0)
                target = os.path.normpath(os.path.join(os.path.dirname(page), ref))
                if not os.path.exists(target):
                    problems.append(f'{page}: {ref} does not exist')
                    return m.group(0)
                want = digest(target)
                if old != want:
                    problems.append(f'{page}: {ref} stamp {old or "missing"}, file is {want}')
                return f'{m.group(1)}{ref}?v={want}{m.group(4)}'

            new = REF.sub(fix, html)
            if new != html and not check:
                open(page, 'w', encoding='utf-8').write(new)
                changed += 1
    if check:
        if problems:
            print('\n'.join(problems))
            print(f'\n{len(problems)} stale or missing cache stamps. Run: python3 .github/scripts/stamp-assets.py')
            return 1
        print('All cache stamps match their files.')
        return 0
    missing = [p for p in problems if 'does not exist' in p]
    print('\n'.join(missing))
    print(f'Restamped {changed} pages.')
    return 1 if missing else 0


if __name__ == '__main__':
    sys.exit(main())
