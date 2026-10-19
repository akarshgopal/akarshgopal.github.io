# Renumber a post's notes in reading order (first citation). Usage: python3 scripts/renumber-post.py src/posts/X.html
# Rewrites <a href="#nX">X</a>, <li id="nX"> and "note X"/"notes X and Y" inside the notes; reorders the <li> lines.
import re, sys
f = sys.argv[1]; t = open(f).read(); ni = t.index('id="notes"')
order = []
for c in re.findall(r'href="#n(\d+)"', t[:ni]):
    if c not in order: order.append(c)
pre, post = t[:ni], t[ni:]
lines = post.split('\n'); idx = [k for k, l in enumerate(lines) if re.match(r'<li id="n\d+"', l)]
assert idx == list(range(idx[0], idx[-1] + 1)), 'note items must be consecutive single lines'
byid = {re.match(r'<li id="n(\d+)"', lines[k]).group(1): lines[k] for k in idx}
for l in byid:
    if l not in order: order.append(l)
m = {o: str(i + 1) for i, o in enumerate(order)}
new = [re.sub(r'id="n\d+"', f'id="n{m[i]}"', byid[i], count=1) for i in order]
lines[idx[0]:idx[-1] + 1] = new
post = '\n'.join(lines)
post = re.sub(r'\b(notes?) (\d+)(?: and (\d+))?\b', lambda x: f'{x.group(1)} {m.get(x.group(2), x.group(2))}' + (f' and {m.get(x.group(3), x.group(3))}' if x.group(3) else ''), post)
sub = lambda s: re.sub(r'href="#n(\d+)">(\d+)</a>', lambda x: f'href="#n{m.get(x.group(1), x.group(1))}">{m.get(x.group(1), x.group(2))}</a>', s)
pre = sub(pre); post = sub(post)
open(f, 'w').write(pre + post)
changed = {k: v for k, v in m.items() if k != v}
print(f, 'renumbered:', changed if changed else 'already in order')
