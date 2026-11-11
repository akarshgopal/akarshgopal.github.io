"""Pick freely licensed photos from Wikimedia Commons for the ImageNet figure.
For each subject (chosen before any model was run), search Commons 'Quality images' for the term, keep the first file
whose licence is CC0, CC BY (any version, not BY-SA) or public domain and whose shape is not extreme, download a
320-px thumbnail, and record author, licence and source URL in research/imagenet-photos.json.
Search terms were refined (Latin names etc.) only where the first pick showed the wrong subject (a hotel for
'flamingo', a car for 'panda'); a file is never swapped because of how a model did on it.
Run: /workspace/.venv-ml/bin/python scripts/imagenet/fetch_photos.py"""
import json, re, urllib.request, urllib.parse, time, os, html
UA = {'User-Agent': 'how-machines-learned-explainer/1.0 (personal educational site; akarsh@local)'}
SUBJ = [  # (ImageNet-1k class name as in torchvision, Commons search term)
 ('zebra', 'zebra'), ('goldfish', 'goldfish'), ('king penguin', 'Aptenodytes patagonicus'), ('flamingo', 'Phoenicopterus flamingo'),
 ('giant panda', 'giant panda Ailuropoda melanoleuca zoo'), ('koala', 'koala'), ('red fox', 'red fox Vulpes vulpes'), ('monarch', 'monarch butterfly'),
 ('ladybug', 'ladybird beetle Coccinella'), ('bald eagle', 'Haliaeetus leucocephalus'), ('golden retriever', 'golden retriever dog'), ('tabby', 'tabby cat'),
 ('school bus', 'yellow school bus parked'), ('steam locomotive', 'steam locomotive'), ('acoustic guitar', 'acoustic guitar'), ('violin', 'violin instrument'),
 ('teapot', 'teapot'), ('espresso', 'espresso cup'), ('pizza', 'pizza margherita'), ('banana', 'bananas'),
 ('strawberry', 'strawberries'), ('daisy', 'Bellis perennis daisy'), ('volcano', 'stratovolcano'), ('beacon', 'lighthouse'),
]
OK = re.compile(r'^(CC0|CC BY \d(\.\d)?( [A-Za-z\-]+)?|Public domain|PD\b.*)$', re.I)
def get(url):
    for i in range(4):
        try: return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()
        except Exception as e: print('retry', e); time.sleep(3 + 5 * i)
    raise SystemExit('fetch failed ' + url)
def strip(s): return html.unescape(re.sub(r'<[^>]+>', '', s or '')).strip()
os.makedirs('research/imagenet-photos', exist_ok=True); out = []
skip = json.load(open('scripts/imagenet/skip.json')) if os.path.exists('scripts/imagenet/skip.json') else {}
def search(scope, term, cls):
    q = {'action': 'query', 'format': 'json', 'generator': 'search', 'gsrnamespace': 6, 'gsrlimit': 40,
         'gsrsearch': f'{scope}{term} filetype:bitmap', 'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata|mime', 'iiurlwidth': 320}
    d = json.loads(get('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(q)))
    for p in sorted(d.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 0)):
        ii = p['imageinfo'][0]; md = ii.get('extmetadata', {})
        lic = strip(md.get('LicenseShortName', {}).get('value'))
        if '-SA' in lic.upper() or not OK.match(lic) or p['title'] in skip.get(cls, []): continue
        if ii.get('mime') != 'image/jpeg' or not (0.55 < ii['width'] / ii['height'] < 1.9): continue
        return {'cls': cls, 'title': p['title'], 'author': strip(md.get('Artist', {}).get('value'))[:120], 'licence': lic,
                'licenceUrl': strip(md.get('LicenseUrl', {}).get('value')), 'url': ii['descriptionurl'], 'thumb': ii['thumburl'],
                'scope': scope.strip() or 'any'}
for cls, term in SUBJ:
    pick = None
    for scope in ('incategory:Quality_images ', 'incategory:Valued_images ', ''):  # Quality images first, then Valued, then any
        pick = search(scope, term, cls)
        if pick: break
    if not pick: print('NONE for', cls); continue
    fn = f'research/imagenet-photos/{len(out):02d}-{cls.replace(" ", "_")}.jpg'
    open(fn, 'wb').write(get(pick['thumb'])); pick['file'] = fn; out.append(pick)
    print(cls, '|', pick['title'], '|', pick['licence'], '|', pick['scope'], '|', pick['author'][:50]); time.sleep(1)
json.dump(out, open('research/imagenet-photos.json', 'w'), indent=1, ensure_ascii=False)
