"""Build src/lib/pricedata.js for the billWorld figure (essay 8): household bills split into energy, network and taxes,
and a price-level factor for converting other countries' prices.

Sources, both fetched from public APIs (no key needed):
  BILL  Eurostat nrg_pc_204_c, "Electricity prices components for household consumers - annual data",
        band KWH2500-4999 (2,500-4,999 kWh a year). Components used:
          NRG_SUP           energy and supply
          NETC              network costs
          TAX_FEE_LEV_CHRG  taxes, fees, levies and charges (all of them, VAT included, net of allowances;
                            Ireland's is negative because of its 2025 energy credits)
        in EUR and in PPS (purchasing power standard), shown as cents per kWh.
  PPP   World Bank WDI: PA.NUS.FCRF (official exchange rate, LCU per US$) divided by PA.NUS.PRVT.PP (PPP factor for
        household consumption, LCU per international $). Above 1, a dollar buys more there than in the US.

The country lists are editorial: they are the ones the figure shows. Rows without a PPS value are dropped. Rows are
sorted by total EUR bill, highest first.

Usage: python3 -P scripts/make_price_data.py [--year 2025] [--ppp-year 2024] [--cache DIR] [--check]
  --cache DIR  save the raw API responses there (and reuse them if present), for a record of what was fetched
  --check      compare with the current src/lib/pricedata.js and print differences instead of writing
"""
import argparse, json, os, sys, urllib.request

BILL_GEO = [  # Eurostat code -> name shown
    ('EU27_2020', 'EU average'), ('BE', 'Belgium'), ('BG', 'Bulgaria'), ('CZ', 'Czechia'), ('DK', 'Denmark'),
    ('DE', 'Germany'), ('IE', 'Ireland'), ('EL', 'Greece'), ('ES', 'Spain'), ('FR', 'France'), ('IT', 'Italy'),
    ('HU', 'Hungary'), ('NL', 'Netherlands'), ('AT', 'Austria'), ('PL', 'Poland'), ('PT', 'Portugal'),
    ('RO', 'Romania'), ('FI', 'Finland'), ('SE', 'Sweden'), ('NO', 'Norway'), ('TR', 'Türkiye'),
]
PPP_GEO = [  # World Bank ISO3 -> name shown
    ('ITA', 'Italy'), ('DEU', 'Germany'), ('DNK', 'Denmark'), ('FRA', 'France'), ('ESP', 'Spain'),
    ('AUS', 'Australia'), ('CHL', 'Chile'), ('JPN', 'Japan'), ('KEN', 'Kenya'), ('ZAF', 'South Africa'),
    ('PHL', 'Philippines'), ('USA', 'US'), ('NOR', 'Norway'), ('BRA', 'Brazil'), ('KOR', 'South Korea'),
    ('CAN', 'Canada'), ('MEX', 'Mexico'), ('IDN', 'Indonesia'), ('VNM', 'Vietnam'), ('CHN', 'China'),
    ('IND', 'India'), ('TUR', 'Türkiye'), ('PAK', 'Pakistan'), ('BGD', 'Bangladesh'), ('SAU', 'Saudi Arabia'),
    ('NGA', 'Nigeria'), ('EGY', 'Egypt'), ('ETH', 'Ethiopia'),
]
PARTS = ['NRG_SUP', 'NETC', 'TAX_FEE_LEV_CHRG']
UA = 'akarshgopal.github.io data build (python urllib)'
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'pricedata.js')


def get(url, cache, name):
    path = os.path.join(cache, name) if cache else None
    if path and os.path.exists(path):
        return json.load(open(path, encoding='utf-8'))
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=60) as r:
        raw = r.read().decode('utf-8')
    if path:
        os.makedirs(cache, exist_ok=True)
        open(path, 'w', encoding='utf-8').write(raw)
    return json.loads(raw)


def bill(year, cache):
    d = get('https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_pc_204_c'
            f'?format=JSON&lang=en&time={year}&nrg_cons=KWH2500-4999', cache, f'eurostat_nrg_pc_204_c_{year}.json')
    ids, size = d['id'], d['size']
    cat = {k: d['dimension'][k]['category']['index'] for k in ids}

    def val(**kw):
        i = 0
        for k, s in zip(ids, size):
            i = i * s + (cat[k][kw[k]] if k in kw else 0)
        v = d['value'].get(str(i))
        return None if v is None else round(v * 100, 2)

    rows = []
    for code, name in BILL_GEO:
        if code not in cat['geo']:
            print(f'warning: {code} not in Eurostat {year}', file=sys.stderr)
            continue
        eur = [val(nrg_prc=p, currency='EUR', geo=code) for p in PARTS]
        pps = [val(nrg_prc=p, currency='PPS', geo=code) for p in PARTS]
        if None in eur or pps[0] is None:
            print(f'warning: {name} incomplete in {year}, dropped', file=sys.stderr)
            continue
        rows.append([name, eur, pps])
    rows.sort(key=lambda r: -sum(r[1]))
    return rows, d.get('updated')


def ppp(year, cache):
    codes = ';'.join(c for c, _ in PPP_GEO)
    out = {}
    series = {}
    for ind in ('PA.NUS.FCRF', 'PA.NUS.PRVT.PP'):
        d = get(f'https://api.worldbank.org/v2/country/{codes}/indicator/{ind}?format=json&date={year}&per_page=500',
                cache, f'wb_{ind}_{year}.json')
        series[ind] = {r['countryiso3code']: r['value'] for r in d[1] or []}
    for code, name in PPP_GEO:
        fx, pp = series['PA.NUS.FCRF'].get(code), series['PA.NUS.PRVT.PP'].get(code)
        if fx is None or pp is None:
            print(f'warning: {name} has no {year} exchange rate or PPP, dropped', file=sys.stderr)
            continue
        out[name] = round(fx / pp, 3)
    return out


def main():
    a = argparse.ArgumentParser()
    a.add_argument('--year', type=int, default=2025)
    a.add_argument('--ppp-year', type=int, default=2024)
    a.add_argument('--cache')
    a.add_argument('--check', action='store_true')
    o = a.parse_args()
    rows, updated = bill(o.year, o.cache)
    p = ppp(o.ppp_year, o.cache)
    js = ('// Generated by scripts/make_price_data.py — do not edit by hand.\n'
          f'// BILL: Eurostat nrg_pc_204_c, {o.year} (dataset updated {updated}), households 2,500–4,999 kWh/yr; '
          '[name, [energy&supply, network, taxes&levies] euro ¢/kWh, same in PPS ¢/kWh]\n'
          f'// PPP: World Bank WDI {o.ppp_year}, PA.NUS.FCRF / PA.NUS.PRVT.PP\n'
          'export const BILL = ' + json.dumps(rows, ensure_ascii=False) + ';\n'
          'export const PPP = ' + json.dumps(p, ensure_ascii=False) + ';\n')
    if o.check:
        cur = open(OUT, encoding='utf-8').read()
        old = {l.split(' = ')[0]: json.loads(l.split(' = ', 1)[1].rstrip(';\n')) for l in cur.splitlines() if l.startswith('export const')}
        new = {'export const BILL': rows, 'export const PPP': p}
        ob, nb = {r[0]: r for r in old['export const BILL']}, {r[0]: r for r in rows}
        diffs = [f'BILL {k}: {ob.get(k)} -> {nb.get(k)}' for k in sorted(set(ob) | set(nb)) if ob.get(k) != nb.get(k)]
        op, np_ = old['export const PPP'], p
        diffs += [f'PPP {k}: {op.get(k)} -> {np_.get(k)}' for k in sorted(set(op) | set(np_)) if op.get(k) != np_.get(k)]
        if [r[0] for r in old['export const BILL']] != [r[0] for r in rows]:
            diffs.append('BILL order differs')
        print('\n'.join(diffs) if diffs else 'identical to src/lib/pricedata.js')
        return
    open(OUT, 'w', encoding='utf-8').write(js)
    print(f'wrote {OUT}: {len(rows)} bills, {len(p)} PPP factors')


if __name__ == '__main__':
    main()
