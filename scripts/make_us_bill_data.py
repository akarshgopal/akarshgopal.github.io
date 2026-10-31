# What a US kilowatt-hour pays for, 1969 on: the investor-owned utilities' accounts, split into fuel, bought power, the
# rest of generation, wires, customer service and overheads, taxes; applied to the average residential price and put
# in 2025 dollars (CPI-U). Usage: python3 -P scripts/make_us_bill_data.py <dir with the PUDL parquet files and cpiai.csv>
# Writes src/lib/usbilldata.js.
#
# Accounts. 1994 on: every investor-owned utility's FERC Form 1 (via Catalyst Cooperative's PUDL), summed. Before that,
# the same Uniform System of Accounts as composites published by the regulator (scripts/data/): FPC/EIA, Statistics of
# Privately Owned Electric Utilities (1969-78); EIA, Financial Statistics of Selected / Major Investor-Owned Electric
# Utilities (1979-82, 1985-89, 1991-93). 1983, 1984 and 1990: EEI's Statistical Yearbook, which nets out sales between
# affiliated utilities and gives fuel but not purchased power; those years are put on EIA's basis (see from_eei).
# Capital (depreciation plus the return on capital) is split by function in proportion to each function's depreciation
# (Form 1 schedule 336). Before 1994 there is no depreciation by function, so the split uses plant in service by
# function, scaled so that in 1994 it gives the depreciation shares.
# Prices: EIA-861 via PUDL from 2001; before that EIA, Annual Energy Review 2011, Table 8.10.
import sys, csv, json, collections
import pyarrow.parquet as pq

D = sys.argv[1]
def rows(name, cols):
    return pq.read_table(f'{D}/{name}.parquet', columns=cols).to_pylist()

om = collections.defaultdict(lambda: collections.defaultdict(float))
for r in rows('core_ferc1__yearly_operating_expenses_sched320', ['report_year', 'expense_type', 'dollar_value']):
    om[r['report_year']][r['expense_type']] += r['dollar_value'] or 0
inc = collections.defaultdict(lambda: collections.defaultdict(float))
for r in rows('core_ferc1__yearly_income_statements_sched114', ['report_year', 'income_type', 'dollar_value', 'utility_type']):
    if r['utility_type'] == 'electric': inc[r['report_year']][r['income_type']] += r['dollar_value'] or 0
dep = collections.defaultdict(lambda: collections.defaultdict(float))
for r in rows('core_ferc1__yearly_depreciation_summary_sched336', ['report_year', 'plant_function', 'ferc_account_label', 'dollar_value']):
    if r['ferc_account_label'] == 'depreciation_amortization_total': dep[r['report_year']][r['plant_function']] += r['dollar_value'] or 0

# average residential price, all US utilities (revenue over MWh; delivery-only rows add revenue but not MWh twice)
res = collections.defaultdict(lambda: [0.0, 0.0])
for r in rows('core_eia861__yearly_sales', ['report_date', 'customer_class', 'service_type', 'sales_mwh', 'sales_revenue']):
    if r['customer_class'] != 'residential': continue
    y = r['report_date'].year
    res[y][0] += r['sales_revenue'] or 0
    if r['service_type'] in ('bundled', 'energy'): res[y][1] += r['sales_mwh'] or 0

# before 2001 (no EIA-861 in PUDL): EIA Annual Energy Review Table 8.10, average residential price, nominal ¢/kWh
aer = {int(r['year']): float(r['residential']) for r in csv.DictReader(l for l in open('scripts/data/eia_aer_t810_prices.csv') if not l.startswith('#'))}

cpi = collections.defaultdict(list)
for r in csv.DictReader(open(f'{D}/cpiai.csv')): cpi[int(r['Date'][:4])].append(float(r['Index']))
cpi = {y: sum(v) / len(v) for y, v in cpi.items()}
base = cpi[2025]

def wide(path, scale):
    # a scripts/data CSV with one row per item and one column per year -> {year: {item: dollars}}
    rows_ = [l.strip().split(',') for l in open(path) if not l.startswith('#')]
    out_ = collections.defaultdict(dict)
    for r in rows_[1:]:
        for y, v in zip(rows_[0][1:], r[1:]):
            if v != '': out_[int(y)][r[0]] = float(v) * scale
    return out_

# published composites, Form 1 accounts, thousand dollars: {year: (items, source)}
FS = {}
for f, src in (('fpc_privately_owned_1969_1978', 'fpc'), ('eia_finstats_1979_1982', 'eia-finstats'),
               ('eia_finstats_1985_1989', 'eia-finstats'), ('eia_finstats_iou_1991_1995', 'eia-finstats')):
    for y, d in wide(f'scripts/data/{f}.csv', 1e3).items(): FS[y] = (d, src)
EEI = wide('scripts/data/eei_yearbook_1982_1990.csv', 1e6)

def lerp(y, pts):
    # linear interpolation in a {year: value} dict; the nearest end outside its range
    lo = max((k for k in pts if k <= y), default=None); hi = min((k for k in pts if k >= y), default=None)
    if lo is None or hi is None or lo == hi: return pts[hi if lo is None else lo]
    return pts[lo] + (pts[hi] - pts[lo]) * (y - lo) / (hi - lo)

def fuel_of(f): return f['fuel_steam'] + f['fuel_nuclear'] + f['fuel_other']
# other generation O&M (production expenses less fuel and bought power), in the years EIA/FPC publish it
OG = {y: d['power_production_total'] - fuel_of(d) - d['purchased_power'] for y, (d, _) in FS.items()}
def plant3(f): return (f['plant_production'], f['plant_transmission'] + f['plant_distribution'], f['plant_general'] + f['plant_intangible'])
PLANT = {y: plant3(d) for y, (d, _) in FS.items()}

PROD = ('steam_production', 'nuclear_production', 'hydraulic_production_conventional', 'hydraulic_production_pumped_storage', 'other_production')
def dshares(d):
    dg = sum(d[k] for k in PROD); dw = d['transmission'] + d['distribution'] + d.get('regional_transmission_and_market_operation', 0)
    do = d['general'] + d['intangible'] + d['common_plant_electric']
    return dg, dw, do

def split(cap, shares, gen_om, wires_om, over_om):
    sg, sw, so = shares
    return {'gen': gen_om + cap * sg, 'wires': wires_om + cap * sw, 'over': over_om + cap * so}

def from_composite(f, shares):
    # the same groups as the Form 1 path below, from a published composite (thousand-dollar accounts)
    fuel = fuel_of(f); bought = f['purchased_power']
    gen_om = f['power_production_total'] - fuel - bought
    wires_om = f['transmission_total'] + f['distribution_total']
    over_om = f['customer_accounts_total'] + f['customer_service_total'] + f['sales_total'] + f['admin_general_total']
    assert abs(f['power_production_total'] + wires_om + over_om - f['om_total']) < 5e3
    taxes = (f['taxes_other_than_income'] + f['federal_income_taxes'] + f['other_income_taxes'] + f['deferred_income_taxes']
             - f['deferred_income_taxes_credit'] + f['investment_tax_credit_adj'])
    cap = f['depreciation'] + f['amortization'] + f['net_operating_income']
    return f['operating_revenues'], {'fuel': fuel, 'bought': bought, **split(cap, shares, gen_om, wires_om, over_om), 'taxes': taxes}

def from_eei(y, e, shares, k=None, og=None):
    # EEI nets out sales between affiliated utilities, from revenue and from bought power alike: EIA's revenue is a
    # steady 7.6-8.1% higher (1982, 1985, 1990), and EEI's other lines match EIA's within 1-2%. Put the netted sales X
    # back into both (k interpolated between those years), and take bought power as production expenses less fuel
    # less the rest of generation O&M, interpolated between the neighbouring EIA/FPC years.
    if k is None: k = lerp(y, {yy: v['eia_operating_revenues'] / v['operating_revenues'] for yy, v in EEI.items() if 'eia_operating_revenues' in v})
    if og is None: og = lerp(y, OG)
    rev = e['operating_revenues'] * k; X = rev - e['operating_revenues']
    fuel = e['fuel']; bought = e['production'] + X - fuel - og
    over_om = e['customer_accounts'] + e['customer_service'] + e['sales'] + e['admin_general']
    taxes = e['taxes_other_than_income'] + e['federal_income_taxes'] + e['other_income_taxes'] + e['deferred_income_taxes'] + e['investment_tax_credit_adj']
    dt = e['depreciation'] + e['amortization']
    noi = e['operating_revenues'] - e['om_total'] - dt - taxes
    return rev, {'fuel': fuel, 'bought': bought, **split(dt + noi, shares, og, e['transmission_distribution'], over_om), 'taxes': taxes}

out = []
first = min(om)
_dg, _dw, _do = dshares(dep[first]); _dt = _dg + _dw + _do
SH0 = (_dg / _dt, _dw / _dt, _do / _dt)
# before 1994: plant in service by function, scaled so that 1994's plant shares give 1994's depreciation shares
_p = PLANT[first]; F = [SH0[i] / (_p[i] / sum(_p)) for i in range(3)]
def pshares(y):
    p = [lerp(y, {yy: v[i] for yy, v in PLANT.items()}) * F[i] for i in range(3)]
    return tuple(x / sum(p) for x in p)

early = sorted({y for y in FS if y < first} | {y for y in EEI if y < first and y not in FS})
for y in sorted(set(om) | set(early)):
    if not ((y in res and res[y][1] > 0) or y in aer): continue
    if y < first and y in FS:
        rev, parts = from_composite(FS[y][0], pshares(y)); src = FS[y][1]
    elif y < first:
        rev, parts = from_eei(y, EEI[y], pshares(y)); src = 'eei'
    else:
        o, i, d = om[y], inc[y], dep[y]
        rev = i['operating_revenues']
        if rev <= 0: continue
        src = 'ferc1'
        fuel = o['fuel_steam_power_generation'] + o['nuclear_fuel_expense'] + o['fuel']
        bought = o['purchased_power']
        gen_om = o['power_production_expenses'] - fuel - bought
        wires_om = o['transmission_expenses'] + o['regional_market_expenses'] + o['distribution_expenses']
        over_om = o['customer_account_expenses'] + o['customer_service_and_information_expenses'] + o['sales_expenses'] + o['administrative_and_general_expenses']
        dg, dw, do = dshares(d)
        dt = dg + dw + do
        taxes = (i['taxes_other_than_income_taxes_utility_operating_income'] + i['income_taxes_operating_income'] + i['income_taxes_utility_operating_income_other']
                 + i['provisions_for_deferred_income_taxes_utility_operating_income'] - i['provision_for_deferred_income_taxes_credit_operating_income']
                 + i['investment_tax_credit_adjustments'])
        ret = rev - i['utility_operating_expenses']  # the return on capital (the reported row is empty before 2021)
        cap = dt + ret  # depreciation plus return: the cost of capital, split by function
        gen = gen_om + cap * dg / dt; wires = wires_om + cap * dw / dt; over = over_om + cap * do / dt
        parts = {'fuel': fuel, 'bought': bought, 'gen': gen, 'wires': wires, 'over': over, 'taxes': taxes}
    total = sum(parts.values())
    price = res[y][0] / res[y][1] / 10 if y in res and res[y][1] > 0 else aer[y]  # ¢/kWh nominal
    real = price * base / cpi[y]
    out.append({'y': y, 'src': src, 'nom': round(price, 2), 'real': round(real, 2), 'cover': round(total / rev, 3),
                'parts': {k: round(real * v / total, 2) for k, v in parts.items()}})
    print(y, f'{price:5.2f}¢ nominal {real:5.2f}¢ (2025$)  accounted {total / rev:5.1%}', {k: f'{v / total:4.0%}' for k, v in parts.items()})

def shares_of(parts):
    t = sum(parts.values()); return {k: v / t for k, v in parts.items()}
def show(label, a_, b_):
    print(label, {k: f"{a_[k]:4.0%}/{b_[k]:4.0%}" for k in a_})
# checks: EIA's composite against PUDL's Form 1 sum (1994-95); EEI against EIA where both exist, with k and the rest of
# generation O&M interpolated as if the year were missing (1982: from 1981 and 1985, k from 1985; 1985: from 1982
# and 1989, k from 1982 and 1990)
for y in (1994, 1995):
    row = next(r for r in out if r['y'] == y)
    show(f'check {y} EIA composite vs PUDL:', shares_of(from_composite(FS[y][0], SH0)[1]), shares_of(row['parts']))
for y, nb in ((1982, (1981, 1985)), (1985, (1982, 1989))):
    og = lerp(y, {n: OG[n] for n in nb})
    k = lerp(y, {yy: v['eia_operating_revenues'] / v['operating_revenues'] for yy, v in EEI.items() if 'eia_operating_revenues' in v and yy != y})
    show(f'check {y} EEI-based vs EIA:', shares_of(from_eei(y, EEI[y], pshares(y), k, og)[1]), shares_of(from_composite(FS[y][0], pshares(y))[1]))
print('capital split 1969, 1980, 1993 (plants, wires, overheads):', [tuple(round(x, 3) for x in pshares(y)) for y in (1969, 1980, 1993)], 'Form 1 1994:', tuple(round(x, 3) for x in SH0))

open('src/lib/usbilldata.js', 'w').write(
    '// What the average US residential kWh paid for, in 2025 cents: investor-owned utilities’ accounts (FERC Form 1 via\n'
    '// Catalyst Cooperative PUDL from 1994; FPC, EIA and EEI composites before), EIA-861 / Annual Energy Review prices,\n'
    '// CPI-U. Made by scripts/make_us_bill_data.py from the sources in scripts/data/.\n'
    'export const USBILL = ' + json.dumps(out, separators=(',', ':')) + ';\n')
