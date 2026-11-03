# What a German household kilowatt-hour pays for, 2006 on, in 2025 euro cents: BDEW's three price components
# (scripts/data/bdew_household_components.csv) deflated with Germany's HICP (scripts/data/eurostat_hicp_de.csv).
# The one series in the project shown in euros: a long nominal-dollar series would mix in the euro's swings.
# Ends with the last year that has an annual HICP. Usage: python3 -P scripts/make_de_bill_data.py
# Writes src/lib/debilldata.js.
import csv, json

def rows(path): return list(csv.DictReader(l for l in open(path) if not l.startswith('#')))
hicp = {int(r['year']): float(r['index']) for r in rows('scripts/data/eurostat_hicp_de.csv')}
BASE = 2025
out = []
for r in rows('scripts/data/bdew_household_components.csv'):
    y = int(r['year'])
    if y not in hicp: continue
    k = hicp[BASE] / hicp[y]
    parts = {key: round(float(r[col]) * k, 2) for key, col in (('energy', 'energy'), ('wires', 'network'), ('taxes', 'taxes'))}
    out.append({'y': y, 'basis': r['basis'], 'nom': float(r['total']), 'real': round(sum(parts.values()), 2), 'parts': parts})
    print(y, r['basis'], f"{float(r['total']):5.2f} ct nominal -> {sum(parts.values()):5.2f} ct (2025 euros)", parts)

open('src/lib/debilldata.js', 'w').write(
    '// What the average German household kWh paid for, in 2025 euro cents: BDEW household price components (all tariffs\n'
    '// to 2014, new-customer tariffs from 2015), deflated with the HICP. Made by scripts/make_de_bill_data.py.\n'
    'export const DEBILL = ' + json.dumps(out, separators=(',', ':')) + ';\n')
