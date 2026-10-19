# Renumber essay notes in reading order (first citation), across src/index.part{1,2,3}.html.
# Rewrites <sup class="fn"><a href="#nX">X</a>, <li id="nX">, and textual "note X"/"notes X and Y" inside the notes.
import re
fs = ['src/index.part1.html', 'src/index.part2.html', 'src/index.part3.html']
S = {f: open(f).read() for f in fs}
allt = ''.join(S.values()); ni = allt.index('id="notes"')
order = []
for c in re.findall(r'href="#n(\d+)"', allt[:ni]):
    if c not in order: order.append(c)
lis = re.findall(r'<li id="n(\d+)"', allt[ni:])
for l in lis:
    if l not in order: order.append(l)
m = {o: str(i + 1) for i, o in enumerate(order)}
f3 = S[fs[2]]; k = f3.index('id="notes"'); pre, post = f3[:k], f3[k:]
items = re.findall(r'(<li id="n(\d+)"[\s\S]*?</li>)', post)
start = post.index(items[0][0]); end = post.index(items[-1][0]) + len(items[-1][0])
byid = {i: t for t, i in items}
post = post[:start] + '\n'.join(re.sub(r'id="n\d+"', f'id="n{m[i]}"', byid[i], count=1) for i in order) + post[end:]
post = re.sub(r'\b(notes?) (\d+)(?: and (\d+))?\b', lambda x: f'{x.group(1)} {m.get(x.group(2), x.group(2))}' + (f' and {m.get(x.group(3), x.group(3))}' if x.group(3) else ''), post)
S[fs[2]] = pre + post
fn = lambda t: re.sub(r'href="#n(\d+)">(\d+)</a>', lambda x: f'href="#n{m[x.group(1)]}">{m[x.group(1)]}</a>', t)
for f in fs:
    t = S[f]
    if f == fs[2]: k = t.index('id="notes"'); t = fn(t[:k]) + t[k:]
    else: t = fn(t)
    open(f, 'w').write(t)
print('notes', len(order), 'changed', sum(1 for o in order if m[o] != o))
