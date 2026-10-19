#!/usr/bin/env python3
"""Build src/lib/worlddata.js from Ember's yearly electricity data.

Download (CC BY 4.0), saved at RAW:
  https://ember-energy.org/data/yearly-electricity-data/
  https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv

Generation is TWh. Capacity is GW. "otherFossil" is Ember's "Other fossil"
(oil and the other fossil fuels that are not coal or gas). Demand is Ember's
"Demand". Solar and wind capacity are Ember's capacity stock; solarAdd and
windAdd are the year-on-year change in that stock (net of retirements), not
gross installations. A missing fuel row is stored as 0 only when the other
sources already sum to Ember's "Total generation" within 0.05 TWh.
"""
import csv, hashlib, json, os

RAW = '/workspace/research/data/global/release_generation_yearly_global.csv'
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'lib', 'worlddata.js')

YEAR0, YEAR1 = 2000, None  # YEAR1 filled from the file
SOURCES = [
    ('coal', 'Coal', 'Coal', 'Coal'),
    ('gas', 'Gas', 'Gas', 'Gas'),
    ('otherFossil', 'Oil and other fossil', 'Oil & other fossil', 'Other fossil'),
    ('nuclear', 'Nuclear', 'Nuclear', 'Nuclear'),
    ('hydro', 'Hydro', 'Hydro', 'Hydro'),
    ('bioenergy', 'Bioenergy', 'Bioenergy', 'Bioenergy'),
    ('otherRenewables', 'Other renewables', 'Other renewables', 'Other renewables'),
    ('wind', 'Wind', 'Wind', 'Wind'),
    ('solar', 'Solar', 'Solar', 'Solar'),
]
REGIONS = [
    # id, button/chart short name, Ember Area
    ('world', 'World', 'World'),
    ('china', 'China', 'China'),
    ('us', 'United States', 'United States'),
    ('eu', 'EU', 'EU'),
    ('india', 'India', 'India'),
    ('me', 'Middle East', 'Middle East'),
    ('africa', 'Africa', 'Africa'),
    ('lac', 'Latin America', 'Latin America and Caribbean'),
    ('asean', 'ASEAN', 'ASEAN'),
    ('japan', 'Japan', 'Japan'),
    ('korea', 'South Korea', 'South Korea'),
    ('australia', 'Australia', 'Australia'),
    ('brazil', 'Brazil', 'Brazil'),
    ('germany', 'Germany', 'Germany'),
]
CAP_REGIONS = ('china', 'us', 'india', 'eu')
FUELS = [s[3] for s in SOURCES]
WANT = {ember for _, _, ember in REGIONS}

def num(s):
    if s is None or s == '':
        return None
    return float(s)

def r3(x):
    return float(f'{x:.3f}')

def r2(x):
    return float(f'{x:.2f}')

# (area, year, source) -> (generation TWh or None, capacity GW or None)
cell = {}
iso = {}
years = set()
with open(RAW, newline='', encoding='utf-8') as f:
    for row in csv.DictReader(f):
        if row['Area'] not in WANT:
            continue
        y = int(row['Year'])
        if y < YEAR0:
            continue
        src = row['Electricity source']
        if src not in FUELS and src not in ('Demand', 'Total generation'):
            continue
        years.add(y)
        cell[(row['Area'], y, src)] = (num(row['Generation (TWh)']), num(row['Capacity (GW)']))
        if row['ISO 3 code']:
            iso[row['Area']] = row['ISO 3 code']

years = list(range(min(years), max(years) + 1))
if years[0] != YEAR0 or any(y not in years for y in range(YEAR0, years[-1] + 1)):
    raise SystemExit(f'unexpected year coverage {years[0]}..{years[-1]}')

def get(area, year, src, kind):
    rec = cell.get((area, year, src))
    if rec is None:
        return None
    return rec[0] if kind == 'g' else rec[1]

regions_out = []
gen = {}
implicit_zero = []
for rid, short, ember in REGIONS:
    series = {sid: [] for sid, _, _, _ in SOURCES}
    series['demand'] = []
    series['total'] = []
    for y in years:
        total = get(ember, y, 'Total generation', 'g')
        demand = get(ember, y, 'Demand', 'g')
        if total is None or demand is None:
            raise SystemExit(f'missing total or demand for {ember} {y}')
        vals = {}
        missing = []
        for sid, _, _, esrc in SOURCES:
            v = get(ember, y, esrc, 'g')
            if v is None:
                missing.append(sid)
                v = 0.0
            vals[sid] = v
        residual = total - sum(vals.values())
        if abs(residual) > 0.05:
            raise SystemExit(f'{ember} {y}: sources sum to {sum(vals.values()):.3f}, total {total:.3f}, missing {missing}')
        if missing:
            implicit_zero.append(f'{rid}:{y}:{"+".join(missing)}')
        for sid, _, _, _ in SOURCES:
            series[sid].append(r3(vals[sid]))
        series['demand'].append(r3(demand))
        series['total'].append(r3(total))
    gen[rid] = series
    regions_out.append({
        'id': rid,
        'name': ember,
        'short': short,
        'iso': iso.get(ember, ''),
    })

cap = {}
for rid in CAP_REGIONS:
    ember = next(e for i, _, e in REGIONS if i == rid)
    solar, wind, solar_add, wind_add = [], [], [], []
    prev_s = prev_w = None
    for y in years:
        cs = get(ember, y, 'Solar', 'c')
        cw = get(ember, y, 'Wind', 'c')
        if cs is None or cw is None:
            raise SystemExit(f'missing solar/wind capacity for {ember} {y}')
        solar.append(r2(cs))
        wind.append(r2(cw))
        solar_add.append(None if prev_s is None else r2(cs - prev_s))
        wind_add.append(None if prev_w is None else r2(cw - prev_w))
        prev_s, prev_w = cs, cw
    cap[rid] = {'solar': solar, 'wind': wind, 'solarAdd': solar_add, 'windAdd': wind_add}

digest = hashlib.sha256(open(RAW, 'rb').read()).hexdigest()
world = {
    'fetched': '2026-10-10',
    'licence': 'CC BY 4.0',
    'sourceUrl': 'https://ember-energy.org/data/yearly-electricity-data/',
    'fileUrl': 'https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv',
    'sha256': digest,
    'years': years,
    'latest': years[-1],
    'sources': [{'id': i, 'label': lab, 'short': short, 'ember': ember} for i, lab, short, ember in SOURCES],
    'regions': regions_out,
    'gen': gen,
    'cap': cap,
    # Countries/regions where Ember publishes no separate row for a fuel and the
    # residual against total generation is ~0, so the series is stored as 0.
    'implicitZero': implicit_zero,
}

header = """// Generated by scripts/make_world_data.py — do not edit by hand.
// Ember Yearly Electricity Data, CC BY 4.0. Fetched 2026-10-10.
// Page: https://ember-energy.org/data/yearly-electricity-data/
// File: https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv
// sha256: %s
// Generation arrays are TWh, one value per year in `years` (2000..%d), rounded to 0.001.
// `total` is Ember's "Total generation"; `demand` is Ember's "Demand".
// `otherFossil` is Ember's "Other fossil" (oil and other non-coal, non-gas fossil fuels).
// Capacity (`cap`) is GW of installed stock for solar and wind, China / United States / India / EU.
// solarAdd and windAdd are the change in that stock from the previous year (net of retirements),
// null for 2000. They are not gross capacity additions.
// Where Ember has no row for a fuel and the other fuels already match total generation
// (residual under 0.05 TWh), that fuel is stored as 0. See `implicitZero`.
""" % (digest, years[-1])

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(header)
    f.write('export const WORLD = ')
    json.dump(world, f, separators=(',', ':'))
    f.write(';\n')

def G(rid, year, key):
    i = years.index(year)
    return gen[rid][key][i]

def show(title, rid, y0, y1):
    print(f'-- {title} {y0}->{y1}')
    keys = [s[0] for s in SOURCES] + ['total', 'demand']
    for k in keys:
        a, b = G(rid, y0, k), G(rid, y1, k)
        print(f'  {k:18} {a:12.3f} -> {b:12.3f}  d {b-a:10.3f}  rnd {round(a):8.0f} {round(b):8.0f} {round(b-a):8.0f}')

print('years', years[0], years[-1], 'regions', len(regions_out), 'implicit', len(implicit_zero))
print('file', OUT, 'bytes', os.path.getsize(OUT))
show('World', 'world', 2000, years[-1])
show('World growth', 'world', 2015, years[-1])
for rid, _, _ in REGIONS:
    if rid == 'world':
        continue
    a, b = G(rid, 2015, 'total'), G(rid, years[-1], 'total')
    print(f'{rid:12} total {round(a)} -> {round(b)} d {round(b-a)}  coal d {round(G(rid, years[-1], "coal")-G(rid, 2015, "coal"))}')

w0, w1 = G('world', 2000, 'total'), G('world', years[-1], 'total')
fossil = lambda rid, y: G(rid, y, 'coal') + G(rid, y, 'gas') + G(rid, y, 'otherFossil')
print('coal share 2000', round(100 * G('world', 2000, 'coal') / w0, 2))
print('coal share latest', round(100 * G('world', years[-1], 'coal') / w1, 2))
print('fossil share 2000', round(100 * fossil('world', 2000) / w0, 2))
print('fossil share latest', round(100 * fossil('world', years[-1]) / w1, 2))
dgen = G('world', years[-1], 'total') - G('world', 2015, 'total')
dsw = (G('world', years[-1], 'solar') + G('world', years[-1], 'wind')) - (G('world', 2015, 'solar') + G('world', 2015, 'wind'))
dchina = G('china', years[-1], 'total') - G('china', 2015, 'total')
print('world dgen', dgen, 'rounded', round(dgen))
print('solar+wind d', dsw, 'share', round(100 * dsw / dgen, 2))
print('china d', dchina, 'share of world d', round(100 * dchina / dgen, 2), 'share of gen', round(100 * G('china', years[-1], 'total') / w1, 2))
print('solar vs wind latest', G('world', years[-1], 'solar'), G('world', years[-1], 'wind'))
print('cap china solar add 2025', cap['china']['solarAdd'][-1], 'wind', cap['china']['windAdd'][-1], 'stock', cap['china']['solar'][-1], cap['china']['wind'][-1])
