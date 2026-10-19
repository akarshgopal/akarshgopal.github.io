#!/usr/bin/env python3
"""ONE-OFF, already applied (19 Oct 2026). Kept as a record of how the main essay and five posts were re-cut into nine essays;
its inputs (src/index.part*.html, src/posts/) no longer exist. See CHANGES-2026-10-19.md.

Reads  src/index.part{1,2,3}.html and src/posts/*.html
Writes src/pages/<file>.html, and prints a report (provenance of every moved id, section renumbering,
unresolved links, 'section N' references that now point at another essay).
"""
import json, re, sys, os
from collections import OrderedDict

ROOT = sys.argv[1]
SRC = os.path.join(ROOT, 'src')
OUT = os.path.join(SRC, 'pages')
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- sources
def read(p): return open(os.path.join(SRC, p)).read()
SOURCES = {
    'index': ''.join(read(f'index.part{k}.html') for k in (1, 2, 3)),
    'solar-pv': read('posts/solar-pv.html'),
    'utility-renewables': read('posts/utility-renewables.html'),
    'transformers': read('posts/transformers.html'),
    'transmission': read('posts/transmission.html'),
    'synthetic-fuels': read('posts/synthetic-fuels.html'),
}
OFFSET = {'index': 1000, 'solar-pv': 2000, 'utility-renewables': 3000, 'transformers': 4000, 'transmission': 5000, 'synthetic-fuels': 6000}

# notes: {src: {num: li_html}}
NOTES = {}
for s, t in SOURCES.items():
    NOTES[s] = {}
    for m in re.finditer(r'^<li id="n(\d+)">.*$', t, re.M):
        NOTES[s][int(m.group(1))] = m.group(0)

# section numbers per source: {src: {num: id}}, from <h2 id=X><span class="num">N</span>
SECNUM = {}
for s, t in SOURCES.items():
    SECNUM[s] = {}
    for m in re.finditer(r'<h2 id="([^"]+)"><span class="num">(\d+)</span>', t):
        SECNUM[s][int(m.group(2))] = m.group(1)

def locate(src, key):
    """Start offset of the line holding the element with id=key / data-fig=key, or of the text key."""
    t = SOURCES[src]
    m = re.search(r'^[^\n]*?<[a-z0-9]+[^>]*\b(?:id|data-fig)="' + re.escape(key) + r'"', t, re.M)
    if not m:
        i = t.find(key)
        if i < 0: raise SystemExit(f'marker not found: {src} {key!r}')
        return t.rfind('\n', 0, i) + 1
    return m.start()

def cut(src, start, end=None):
    """HTML from the line of `start` up to (not including) the line of `end` (or the notes heading)."""
    t = SOURCES[src]
    a = locate(src, start)
    b = locate(src, end) if end else locate(src, 'notes')
    assert b > a, (src, start, end)
    return Chunk(src, t[a:b])

def para(src, startswith):
    """One <p> (or other single-line block) starting with the given text."""
    t = SOURCES[src]
    i = t.find('\n' + startswith)
    if i < 0: raise SystemExit(f'para not found: {src} {startswith!r}')
    j = t.find('\n', i + 1)
    return Chunk(src, t[i + 1:j + 1])

class Chunk:
    def __init__(self, src, html): self.src, self.html = src, html
    def drop(self, *keys):
        """Remove a whole element (figure/aside/p) located by data-fig, id or a text prefix."""
        for k in keys:
            h = self.html
            m = re.search(r'<figure[^>]*data-fig="' + re.escape(k) + r'"[^>]*>.*?</figure>\n?', h, re.S)
            if m: self.html = h[:m.start()] + h[m.end():]; continue
            i = h.find(k)
            if i < 0: raise SystemExit(f'drop: not found {self.src} {k!r}')
            a = h.rfind('\n', 0, i) + 1
            tag = re.match(r'<([a-z0-9]+)', h[a:]).group(1)
            e = h.find(f'</{tag}>', i) + len(f'</{tag}>')
            if h[e:e + 1] == '\n': e += 1
            self.html = h[:a] + h[e:]
        return self
    def sub(self, a, b, count=1):
        assert a in self.html, (self.src, a[:80]); self.html = self.html.replace(a, b, count); return self

def H(html, src='new'):
    return Chunk(src, html)

# ---------------------------------------------------------------- the new pages
PAGES = OrderedDict()   # file -> dict(title, short, description, kicker, lede+intro html, chunks, hero)

def page(file, short, title, description, intro, chunks, hero=False, notes=True):
    PAGES[file] = dict(short=short, title=title, description=description, intro=intro, chunks=chunks, hero=hero, notes=notes)

S = SOURCES

def intro_of(src):
    """Header lede + intro paragraphs of a post (between </header> and the toc)."""
    t = S[src]
    a = t.index('</header>') + len('</header>')
    b = t.index('<ol class="toc">')
    return Chunk(src, t[a:b].strip() + '\n')

# 1 The machine
page('the-machine.html', 'The machine', 'The Machine: Electrons, Magnets and Steam',
     'How a current flows, how a spinning magnet makes one, three-phase power, and why most electricity still comes from boiling water.',
     H('''<p class="lede">Flip a switch and a lamp lights instantly. Somewhere, hundreds of kilometres away, a machine the size of a house turns very slightly harder. This essay is about that machine: what a current is, how a spinning magnet makes one, and where the spinning comes from.</p>
'''),
     [cut('index', 's1', 's3'),
      cut('index', 's3', 'wind').sub('<span class="num">3</span>Heat, wind and light', '<span class="num">3</span>Where the rotation comes from'),
      H('<!-- TODO-PROSE: closing hand-off to essay 2 (transformers) -->\n')],
     hero=True)

# 2 Transformers
page('transformers.html', 'Transformers', 'Transformers: The Quiet Bottleneck', None, intro_of('transformers'),
     [cut('index', 's4', 'Part 3</a> opens the box').sub('<span class="num">4</span>Moving it', '<span class="num">1</span>Why change the voltage'),
      cut('transformers', 'how-it-works')])

# 3 Transmission
page('transmission.html', 'Transmission', 'Transmission: The Network That Decides What Gets Built', None, intro_of('transmission'),
     [cut('transmission', 'why-high-voltage', 'network-costs')])

# 4 Balancing the grid
page('balancing.html', 'Balancing', 'Balancing the Grid: Fifty Hertz and the Markets That Keep It',
     'How a continent-sized grid stays at fifty hertz second by second, and how markets decide which plants run each hour, each day and in each place.',
     H('''<p class="lede">The grid stores almost no energy. Every second, the power going in must match the power coming out, across a whole continent. This essay follows how that balance is kept: by physics in the first seconds, by reserves over minutes, and by markets over hours, days and distances.</p>
'''),
     [cut('index', 's5', 'shows how inverter-based plants can hold the frequency too').sub('<p>Continental Europe, from Portugal to Turkey,', '<p>Continental Europe, from Portugal to Turkey,'),
      cut('utility-renewables', 'grid-forming', 'system-integration'),
      cut('index', 's7', 's6'),
      cut('index', 's6', 's8').drop('capture').sub('is its <b>capture rate</b>:</p>', 'is its <b>capture rate</b>.</p>'),
      cut('index', 's8', 's10')])

# 5 Solar PV
page('solar-pv.html', 'Solar', 'Solar PV: From Photon to Grid', None, intro_of('solar-pv'),
     [cut('solar-pv', 'photons').drop('noonDay')])

# 6 Wind and the fleet
wind_body = cut('utility-renewables', 'wind-physics', 'grid-forming').html
wind_head_end = wind_body.index('\n', wind_body.index('<h2 id="wind-physics">')) + 1
main_wind = cut('index', 'wind', 'follows these limits into real turbines').html.replace('<h3 id="wind">Wind</h3>\n', '')
page('utility-renewables.html', 'Wind and the fleet', 'Utility-Scale Renewables: Building and Running the Fleet', None, intro_of('utility-renewables'),
     [Chunk('utility-renewables', wind_body[:wind_head_end]),
      Chunk('index', main_wind),
      Chunk('utility-renewables', wind_body[wind_head_end:]),
      cut('utility-renewables', 'system-integration').drop('seasonDay')])

# 7 The price of electricity
s10 = cut('index', 's10', 's11')
s10_before, s10_after = s10.html.split('<p id="bill-world"', 1)
netcost = cut('transmission', 'network-costs').html
netcost = re.sub(r'<h2 id="network-costs"><span class="num">\d+</span>([^<]*)</h2>', r'<h3 id="network-costs">\1</h3>', netcost)
page('price.html', 'Prices', 'The Price of Electricity: Bills, Plants and Learning Curves',
     'From the exchange to the meter, what a power plant costs to build, why solar got five hundred times cheaper while nuclear got dearer, and what a clean grid costs.',
     H('''<p class="lede">In 2025 a megawatt-hour cost about $100 on Germany’s power exchange. Delivered to a household, the same megawatt-hour cost more than four times as much. This essay follows the money: the layers of a bill, what it costs to build the plants, and why some technologies get cheaper with every one built while others get dearer.</p>
'''),
     [Chunk('index', s10_before), Chunk('transmission', netcost), Chunk('index', '<p id="bill-world"' + s10_after),
      cut('index', 's11', 's13')])

# 8 Synthetic fuels, opening with what a megawatt-hour becomes
unlock = (cut('index', 'what-a-megawatt-hour-unlocks', 'So industrial power prices have become national strategy').html
          .replace('<h3 id="what-a-megawatt-hour-unlocks">What a megawatt-hour unlocks</h3>',
                   '<h2 id="what-a-megawatt-hour-unlocks"><span class="num">1</span>What a megawatt-hour becomes</h2>'))
unlock = Chunk('index', unlock).drop('Part 5</a> adds the missing input').html
page('synthetic-fuels.html', 'Fuels', 'Synthetic Fuels and the Price of a Kilowatt-Hour', None, intro_of('synthetic-fuels'),
     [Chunk('index', unlock), para('index', '<p><b>Hydrogen</b> is where the arithmetic gets hard.'),
      cut('synthetic-fuels', 'conversion-chain')])

# 9 A century, and the next twenty years
page('futures.html', 'Futures', 'Cheaper Again? A Century of Prices and the Next Twenty Years',
     'Why electricity got cheaper every year until 1973 and then stopped, why its price moves the whole economy, and what would have to be true for it to fall again.',
     H('''<p class="lede">For eighty years electricity got cheaper almost every year. Then, in the 1970s, it stopped. This last essay asks why, why the price of a kilowatt-hour reaches into everything else, and what would have to be true for it to fall again.</p>
'''),
     [cut('index', 's13', 'what-a-megawatt-hour-unlocks'),
      para('index', '<p>So industrial power prices have become national strategy.'),
      para('index', '<p><b>Computing</b> is the other extreme:'),
      para('index', '<p>Cheap electricity decides which industries are possible, and where.'),
      cut('index', 's15')])

ORDER = list(PAGES)  # reading order after the landing page

# ---------------------------------------------------------------- provenance and links
def ids_in(html):
    out = set(re.findall(r'\bid="([^"]+)"', html))
    out |= {'fig-' + f for f in re.findall(r'data-fig="([^"]+)"', html)}
    return {i for i in out if not re.fullmatch(r'n\d+', i)}

PROV = {}  # (src, id) -> file
for f, p in PAGES.items():
    for c in [p['intro']] + p['chunks']:
        for i in ids_in(c.html):
            PROV.setdefault((c.src, i), f)
# page-level fallbacks and things that were cut
HOME = {'index': 'index.html', 'solar-pv': 'solar-pv.html', 'utility-renewables': 'utility-renewables.html', 'transformers': 'transformers.html',
        'transmission': 'transmission.html', 'synthetic-fuels': 'synthetic-fuels.html'}
CUT = {('index', 'fig-solarDay'): ('solar-pv.html', 'sun'), ('index', 'sunlight'): ('solar-pv.html', 'sun'),
       ('index', 'fig-capture'): ('balancing.html', 's6'), ('solar-pv', 'fig-noonDay'): ('solar-pv.html', 'capture'),
       ('utility-renewables', 'fig-seasonDay'): ('utility-renewables.html', 'system-integration'),
       ('index', 'fig-usCompare'): ('price.html', 's10'), ('index', 'notes'): ('the-machine.html', 'notes'),
       ('index', 'heat'): ('the-machine.html', 'heat')}
# the transformers post's vector-group figure is renamed (the generator's three-phase figure keeps "threePhase")
RENAMED = {('transformers', 'fig-threePhase'): ('transformers.html', 'fig-vectorGroups')}

UNRESOLVED = []
def resolve(src, ident, here):
    if (src, ident) in RENAMED: f, ident = RENAMED[(src, ident)]
    elif (src, ident) in CUT: f, ident = CUT[(src, ident)]
    elif ident == '': f = HOME[src]
    elif (src, ident) in PROV: f = PROV[(src, ident)]
    else:
        UNRESOLVED.append((here, src, ident)); f = HOME[src]
    if f == here: return '#' + ident if ident else here
    return f + ('#' + ident if ident else '')

FILE2SRC = {'index.html': 'index', 'solar-pv.html': 'solar-pv', 'utility-renewables.html': 'utility-renewables', 'transformers.html': 'transformers',
            'transmission.html': 'transmission', 'synthetic-fuels.html': 'synthetic-fuels'}

def relink(c, here):
    def rep(m):
        href = m.group(1)
        if re.match(r'(https?:|mailto:|data:)', href): return m.group(0)
        if href.startswith('#n') and re.fullmatch(r'#n\d+', href):
            return f'href="#n{OFFSET[c.src] + int(href[2:])}"' if c.src in OFFSET else m.group(0)
        file, _, ident = href.partition('#')
        if file == '': src = c.src
        elif file in FILE2SRC: src = FILE2SRC[file]
        else: return m.group(0)
        if src not in OFFSET: return m.group(0)
        return f'href="{resolve(src, ident, here)}"'
    return re.sub(r'href="([^"]*)"', rep, c.html)

# 'section N' references: map (src, N) -> (file, newN)
NEWNUM = {}
def renumber_sections(f, html):
    n = 0
    def rep(m):
        nonlocal n; n += 1
        return f'<h2 id="{m.group(1)}"><span class="num">{n}</span>'
    html = re.sub(r'<h2 id="(?!notes)([^"]+)">(?:<span class="num">[^<]*</span>)?', rep, html)
    for m in re.finditer(r'<h2 id="([^"]+)"><span class="num">(\d+)</span>', html):
        NEWNUM[(f, m.group(1))] = int(m.group(2))
    return html

SECTION_REFS = []

# ---------------------------------------------------------------- assemble
def toc(html):
    items = re.findall(r'<h2 id="([^"]+)"><span class="num">(\d+)</span>(.*?)</h2>', html)
    lis = ''.join(f'<li><a href="#{i}"><span class="n">{n}</span>{re.sub("<[^>]+>", "", t)}</a></li>\n' for i, n, t in items)
    return f'<ol class="toc">\n{lis}<li><a href="#notes"><span class="n">·</span>Notes and sources</a></li>\n</ol>\n'

def head(title, desc, extra=''):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · How Electricity Works</title>
<meta name="description" content="{desc}">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="style.css">
{extra}</head>
<body>
<main>
<article>
'''

def old_description(src):
    m = re.search(r'<meta name="description" content="([^"]*)"', S[src]); return m.group(1)

REPORT = []
built = {}
for k, (f, p) in enumerate(PAGES.items(), start=1):
    # relink every chunk in the context of its new page
    body = ''.join(relink(c, f) + ('' if c.html.endswith('\n') else '\n') for c in p['chunks'])
    intro = relink(p['intro'], f)
    intro = re.sub(r'<p class="kicker">.*?</p>\n', '', intro)
    body = renumber_sections(f, body)
    # notes cited on this page (transitively through "note N" inside notes)
    cited = OrderedDict()
    for m in re.finditer(r'href="#n(\d+)"', intro + body): cited.setdefault(int(m.group(1)), None)
    queue = list(cited)
    lines = {}
    while queue:
        g = queue.pop(0)
        src = next(s for s, o in OFFSET.items() if o <= g < o + 1000)
        li = NOTES[src].get(g - OFFSET[src])
        if li is None: REPORT.append(f'{f}: missing note {src} n{g - OFFSET[src]}'); continue
        li = re.sub(r'<li id="n\d+">', f'<li id="n{g}">', li, count=1)
        li = re.sub(r'href="#n(\d+)"', lambda m: f'href="#n{OFFSET[src] + int(m.group(1))}"', li)
        def noteref(m):
            nums = [OFFSET[src] + int(x) for x in re.findall(r'\d+', m.group(2))]
            for x in nums:
                if x not in cited and x not in lines: cited[x] = None; queue.append(x)
            parts = re.split(r'(\d+)', m.group(2))
            return m.group(1) + ''.join(str(OFFSET[src] + int(x)) if x.isdigit() else x for x in parts)
        li = re.sub(r'\b(notes? )(\d+(?: and \d+)?)\b', noteref, li)
        li = relink(Chunk(src, li), f)
        lines[g] = li
    notes_html = '<h2 id="notes">Notes and sources</h2>\n<ol class="notes">\n' + '\n'.join(lines[g] for g in cited if g in lines) + '\n</ol>\n'
    desc = p['description'] or old_description(FILE2SRC[f])
    hero = '<script src="hero.js"></script>\n' if p['hero'] else ''
    html = (head(p['title'], desc) +
            f'<header class="top">\n<h1>{p["title"]}</h1>\n<p class="byline">Part {k} of {len(PAGES)} · by Akarsh Gopal · October 2026</p>\n</header>\n\n' +
            intro + '\n' + toc(body) + '\n' + body + '\n' + notes_html +
            '</article>\n</main>\n<script src="series.js"></script>\n' + hero + '</body>\n</html>\n')
    built[f] = html

# 'section N' references that crossed pages: rewrite in place where the target stayed on the same page
def fix_section_refs(f, html):
    def rep(m):
        word, rest = m.group(1), m.group(2)
        return m.group(0)
    return html
for f, html in built.items():
    for m in re.finditer(r'\b(sections?)\s+(\d+(?:\s*(?:–|-|and|,)\s*\d+)*)', html):
        SECTION_REFS.append((f, re.sub(r'<[^>]+>', '', html[max(0, m.start() - 90):m.end() + 30]).replace('\n', ' ')))

# ---------------------------------------------------------------- landing page
def landing():
    essays = ''.join(
        f'<li><a href="{f}"><span class="n">{k}</span><span class="t">{p["title"]}</span><span class="d">{p["description"] or old_description(FILE2SRC[f])}</span></a></li>\n'
        for k, (f, p) in enumerate(PAGES.items(), start=1))
    redirect = {i: resolve('index', i, 'index.html') for (s, i) in list(PROV) + list(CUT) if s == 'index'}
    redirect = {k: v for k, v in redirect.items() if not v.startswith('#')}
    script = '<script>(function(){var m=' + json.dumps(redirect, separators=(",", ":"), sort_keys=True) + ';var h=location.hash.slice(1);if(m[h])location.replace(m[h]);})();</script>\n'
    footer = re.search(r'<footer>.*?</footer>', S['index'], re.S).group(0).replace('the generator at the top uses three.js', 'the 3D generator uses three.js')
    return (head('How Electricity Works', 'An interactive series in nine essays: from electrons and spinning magnets to fifty hertz, markets, bills, a century of prices and the futures of the grid.', script)
            .replace('<title>How Electricity Works · How Electricity Works</title>', '<title>How Electricity Works</title>') +
            '<header class="top">\n<h1>How Electricity Works</h1>\n<p class="byline">An interactive series in nine essays · by Akarsh Gopal · October 2026</p>\n</header>\n\n' +
            re.search(r'<p class="lede">.*?</p>\n', S['index']).group(0) +
            '<!-- TODO-PROSE: one paragraph of promise for the whole series -->\n\n' +
            '<figure class="fig showpiece" data-fig="hero3d">\n<figcaption><span class="tagline tag-ill">Model</span> A two-pole, three-phase generator, the machine behind most of the world’s electricity. Drag to look around it.</figcaption>\n</figure>\n\n' +
            '<h2 id="essays">The essays</h2>\n<ol class="essays">\n' + essays + '</ol>\n\n' + footer + '\n' +
            '</article>\n</main>\n<script src="series.js"></script>\n<script src="hero.js"></script>\n</body>\n</html>\n')
built = {'index.html': landing(), **built}

# per-page redirects for ids that left a surviving page (external links into old anchors)
for f, src in FILE2SRC.items():
    if f == 'index.html' or f not in built: continue
    moved = {i: resolve(s, i, f) for (s, i) in list(PROV) + list(CUT) + list(RENAMED) if s == src}
    moved = {k: v for k, v in moved.items() if v != '#' + k}
    if moved:
        script = '<script>(function(){var m=' + json.dumps(moved, separators=(",", ":"), sort_keys=True) + ';var h=location.hash.slice(1);if(m[h])location.replace(m[h]);})();</script>\n'
        built[f] = built[f].replace('</head>', script + '</head>', 1)

for f, html in built.items():
    html = html.replace('data-fig="threePhase"', 'data-fig="vectorGroups"') if f == 'transformers.html' else html
    open(os.path.join(OUT, f), 'w').write(html)

print(json.dumps({'pages': ['index.html'] + ORDER,
                  'nav': [(f, p['short'], p['title']) for f, p in PAGES.items()],
                  'unresolved': UNRESOLVED, 'report': REPORT,
                  'section_refs': SECTION_REFS}, indent=1, ensure_ascii=False))
