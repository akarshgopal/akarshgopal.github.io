# Primary energy per person (US, Germany, China, India, world) and world primary energy, 1965 on, from Our World in Data's
# energy dataset (Energy Institute Statistical Review, substitution method). Writes src/lib/energydata.js for the Henry Adams
# and Kardashev figures. Usage: python3 -P scripts/make_energy_data.py <owid-energy-data.csv>
import csv, sys, json
NAMES = {'United States': 'us', 'Germany': 'de', 'China': 'cn', 'India': 'in', 'World': 'world'}
pc, world = {}, {}
for r in csv.DictReader(open(sys.argv[1])):
    k = NAMES.get(r['country'])
    if not k or not r['energy_per_capita']: continue
    y = int(r['year'])
    pc.setdefault(k, {})[y] = round(float(r['energy_per_capita']))
    if k == 'world': world[y] = round(float(r['primary_energy_consumption']))
y0 = max(min(v) for v in pc.values()); y1 = min(max(v) for v in pc.values())
out = {'years': [y0, y1], 'perCap': {k: [v[y] for y in range(y0, y1 + 1)] for k, v in pc.items()},
       'worldTWh': [world[y] for y in range(y0, y1 + 1)]}
open('src/lib/energydata.js', 'w').write(
    '// Primary energy, kWh per person per year (substitution method), and world primary energy in TWh a year.\n'
    '// Our World in Data energy dataset (Energy Institute Statistical Review). Made by scripts/make_energy_data.py.\n'
    'export const ENERGY = ' + json.dumps(out, separators=(',', ':')) + ';\n')
print(y0, y1, {k: (v[0], v[-1]) for k, v in out['perCap'].items()})
