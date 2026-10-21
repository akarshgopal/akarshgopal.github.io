# Regenerate each page's old-link redirect map (the one-line <script> after the stylesheet link).
# An id that a page used to hold (in any committed version, or in its old map) but no longer holds is sent to the page
# that holds it now. Usage: python3 scripts/redirects.py   (run after restructuring; reads git history)
import re, subprocess, glob, json, os

PAGES = 'src/pages'
ID = re.compile(r'\sid="([^"]+)"')
FIG = re.compile(r'data-fig="([A-Za-z0-9]+)"')
MAP = re.compile(r'<script>\(function\(\)\{var m=(\{.*?\});var h=location\.hash\.slice\(1\);if\(m\[h\]\)location\.replace\(m\[h\]\);\}\)\(\);</script>')

def ids_of(html):
    s = set(ID.findall(html)) | {'fig-' + f for f in FIG.findall(html)}
    return {i for i in s if not re.fullmatch(r'n\d+', i)}  # note ids are page-local; never redirect them

def git(*a):
    return subprocess.run(['git', *a], capture_output=True, text=True).stdout

# every committed version of every page, by file name
history = {}
for sha in git('log', '--format=%H', '--', PAGES, 'src/posts').split():
    for path in git('ls-tree', '--name-only', sha, PAGES + '/', 'src/posts/').split():
        if not path.endswith('.html'): continue
        html = git('show', f'{sha}:{path}')
        name = os.path.basename(path)
        h = history.setdefault(name, set())
        h |= ids_of(html)
        m = MAP.search(html)
        if m: h |= set(json.loads(m.group(1)))

# old ids that no longer exist anywhere, sent to the nearest surviving place
ALIASES = {
    'solar-pv.html': {'iv-curve': 'solar-pv.html#photons', 'modules': 'solar-pv.html#photons', 'fig-ivCurve': 'solar-pv.html#photons',
                      'fig-shading': 'solar-pv.html#photons', 'fig-junction': 'solar-pv.html#junction', 'fig-cellTech': 'solar-pv.html#cell-tech',
                      'lifetime': 'solar-pv.html#yield', 'fig-sunPath': 'solar-pv.html#sun', 'fig-clipping': 'solar-pv.html#inverters',
                      'fig-solarWorld': 'solar-pv.html#deployment', 'fig-noonDay': 'solar-pv.html#capture'},
    'utility-renewables.html': {'fig-bladeElement': 'utility-renewables.html#wind-physics', 'fig-seasonMix': 'utility-renewables.html#system-integration',
                                'fig-seasonDay': 'utility-renewables.html#system-integration', 'wind-world': 'utility-renewables.html#auctions-world'},
    'transmission.html': {'power-flow': 'transmission.html#congestion', 'interconnection': 'transmission.html#congestion', 'grids-world': 'transmission.html#hvdc',
                          'fig-getsWeek': 'transmission.html#thermal-limits', 'fig-lineField': 'transmission.html#why-high-voltage',
                          'fig-voltageLosses': 'transmission.html#why-high-voltage', 'fig-loadability': 'transmission.html#power-angle',
                          'fig-interconnect': 'futures.html#moving-the-surplus'},
    'the-machine.html': {'s1': 'kilowatt-hour.html#current', 'fig-potential': 'kilowatt-hour.html#fig-emfHill', 'fig-hero3d': 'the-machine.html#fig-threePhase', 's3': 'the-machine.html#heat'},
    'index.html': {'s1': 'kilowatt-hour.html#current', 'fig-potential': 'kilowatt-hour.html#fig-emfHill', 'fig-hero3d': 'the-machine.html#fig-threePhase',
                   's3': 'the-machine.html#heat', 'fig-capture': 'solar-pv.html#capture', 'fig-solarDay': 'solar-pv.html#yield', 'sunlight': 'solar-pv.html#photons'},
}
now = {os.path.basename(p): open(p).read() for p in glob.glob(PAGES + '/*.html')}
where = {}
for name, html in now.items():
    for i in ids_of(html):
        where.setdefault(i, name)

for name, html in now.items():
    here = ids_of(html)
    old = set(history.get(name, set()))
    m0 = MAP.search(html)
    if m0: old |= set(json.loads(m0.group(1)))
    m = {i: f'{where[i]}#{i}' for i in sorted(old - here) if i in where and where[i] != name}
    m.update({i: v for i, v in ALIASES.get(name, {}).items() if i not in here})
    script = '<script>(function(){var m=' + json.dumps(m, ensure_ascii=False, separators=(',', ':')) + ';var h=location.hash.slice(1);if(m[h])location.replace(m[h]);})();</script>'
    if m0: html = html[:m0.start()] + script + html[m0.end():]
    elif m: html = html.replace('<link rel="stylesheet" href="style.css">', '<link rel="stylesheet" href="style.css">\n' + script, 1)
    else: continue
    open(f'{PAGES}/{name}', 'w').write(html)
    lost = sorted(i for i in old - here if i not in where and i not in m and i != 'play-toggle')
    print(f'{name}: {len(m)} redirects' + (f'; {len(lost)} old ids exist nowhere now: {", ".join(lost[:12])}' if lost else ''))
