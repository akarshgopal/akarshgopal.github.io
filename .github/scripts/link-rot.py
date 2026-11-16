#!/usr/bin/env python3
"""Check every external link in the two blog series and report the dead ones.

Usage: python3 .github/scripts/link-rot.py [report.md]
Dead means 404/410, or no answer at all (DNS failure, refused, timed out twice). Sites that block automated
clients (401/403/405/429/451, or a challenge page) are listed separately as "could not check", not as dead.
For each dead link the report suggests the closest archive.org snapshot, if there is one.
"""
import concurrent.futures as cf
import glob, html, json, re, socket, sys, time
import urllib.error, urllib.parse, urllib.request

ROOTS = ['blog/ai/*.html', 'blog/electricity/*.html']
UA = 'Mozilla/5.0 (compatible; akarshgopal.github.io link check; +https://akarshgopal.github.io/)'
TIMEOUT = 25
BLOCKED = {401, 403, 405, 406, 409, 418, 429, 451, 503}

def links():
    found = {}
    for pat in ROOTS:
        for f in sorted(glob.glob(pat)):
            for u in re.findall(r'href="(https?://[^"#]+)(?:#[^"]*)?"', open(f, encoding='utf-8').read()):
                u = html.unescape(u)
                found.setdefault(u, set()).add(f)
    return found

def fetch(u, method):
    req = urllib.request.Request(u, method=method, headers={'User-Agent': UA, 'Accept': '*/*'})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return r.status

def check(u):
    last = None
    for attempt, method in enumerate(['HEAD', 'GET', 'GET']):
        try:
            return u, fetch(u, method), None
        except urllib.error.HTTPError as e:
            if e.code in (404, 410) and attempt == 2:  # confirmed by a second GET; some sites flap
                return u, e.code, None
            if e.code in BLOCKED and method == 'GET':
                return u, e.code, None
            last = (e.code, None)
        except (urllib.error.URLError, socket.timeout, TimeoutError, ConnectionError, OSError) as e:
            last = (None, str(getattr(e, 'reason', e))[:80])
            time.sleep(2)
    return u, last[0], last[1]

def snapshot(u):
    try:
        q = 'https://archive.org/wayback/available?url=' + urllib.parse.quote(u, safe='')
        with urllib.request.urlopen(urllib.request.Request(q, headers={'User-Agent': UA}), timeout=TIMEOUT) as r:
            s = json.load(r).get('archived_snapshots', {}).get('closest')
            return s['url'] if s and s.get('available') else None
    except Exception:
        return None

def main():
    out = sys.argv[1] if len(sys.argv) > 1 else None
    L = links()
    with cf.ThreadPoolExecutor(12) as ex:
        res = list(ex.map(check, L))
    dead = [(u, c, e) for u, c, e in res if c in (404, 410) or (c is None)]
    blocked = [(u, c) for u, c, e in res if c is not None and c >= 400 and c not in (404, 410)]
    lines = [f'# External link check', '', f'{len(L)} external links in `blog/ai` and `blog/electricity`: '
             f'{len(dead)} dead, {len(blocked)} could not be checked (the site blocks automated clients).', '']
    if dead:
        lines += ['## Dead', '', '| Link | Result | On | Archived copy |', '|---|---|---|---|']
        for u, c, e in sorted(dead):
            snap = snapshot(u)
            pages = ', '.join(sorted(p.replace('blog/', '') for p in L[u]))
            lines.append(f'| {u} | {c or e} | {pages} | {snap or "none"} |')
        lines.append('')
    if blocked:
        lines += ['<details><summary>Could not check</summary>', '']
        lines += [f'- {u} ({c})' for u, c in sorted(blocked)]
        lines += ['', '</details>', '']
    report = '\n'.join(lines)
    if out: open(out, 'w').write(report)
    print(report)
    return 1 if dead else 0

if __name__ == '__main__':
    sys.exit(main())
