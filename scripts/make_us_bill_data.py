# What a US kilowatt-hour pays for, 1991 on: every investor-owned utility's FERC Form 1 accounts (via Catalyst
# Cooperative's PUDL), summed, split into fuel, bought power, the rest of generation, wires, customer service and
# overheads, taxes; applied to the average residential price (EIA-861 via PUDL from 2001; before that EIA's Annual
# Energy Review Table 8.10, kept in scripts/data/) and put in 2025 dollars (CPI-U).
# Usage: python3 -P scripts/make_us_bill_data.py <dir with the PUDL parquet files and cpiai.csv>
# Capital costs (depreciation and the return on capital) are split by function in proportion to each function's
# depreciation, a proxy for its share of the capital base. Writes src/lib/usbilldata.js.
# 1991-93 (before FERC Form 1 is in PUDL): the same accounts as published by EIA, Financial Statistics of Major U.S.
# Investor-Owned Electric Utilities 1995 (scripts/data/eia_finstats_iou_1991_1995.csv); it has no depreciation by
# function, so those years split capital with the shares of the first PUDL year (1994).
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

# EIA Financial Statistics, 1991-1995 (thousand dollars), for the years before PUDL's FERC Form 1
fs = collections.defaultdict(dict)
_fs = [l.strip().split(',') for l in open('scripts/data/eia_finstats_iou_1991_1995.csv') if not l.startswith('#')]
for row in _fs[1:]:
    for y, v in zip(_fs[0][1:], row[1:]): fs[int(y)][row[0]] = float(v)

PROD = ('steam_production', 'nuclear_production', 'hydraulic_production_conventional', 'hydraulic_production_pumped_storage', 'other_production')
def dshares(d):
    dg = sum(d[k] for k in PROD); dw = d['transmission'] + d['distribution'] + d.get('regional_transmission_and_market_operation', 0)
    do = d['general'] + d['intangible'] + d['common_plant_electric']
    return dg, dw, do

def from_finstats(f, shares):
    # same groups as the Form 1 path below, from EIA's published composite accounts
    fuel = f['fuel_steam'] + f['fuel_nuclear'] + f['fuel_other']
    bought = f['purchased_power']
    gen_om = f['power_production_total'] - fuel - bought
    wires_om = f['transmission_total'] + f['distribution_total']
    over_om = f['customer_accounts_total'] + f['customer_service_total'] + f['sales_total'] + f['admin_general_total']
    assert abs(f['power_production_total'] + wires_om + over_om - f['om_total']) < 5
    taxes = (f['taxes_other_than_income'] + f['federal_income_taxes'] + f['other_income_taxes'] + f['deferred_income_taxes']
             - f['deferred_income_taxes_credit'] + f['investment_tax_credit_adj'])
    dt = f['depreciation'] + f['amortization']
    cap = dt + f['net_operating_income']
    sg, sw, so = shares
    return f['operating_revenues'], {'fuel': fuel, 'bought': bought, 'gen': gen_om + cap * sg, 'wires': wires_om + cap * sw,
                                     'over': over_om + cap * so, 'taxes': taxes}

out = []
first = min(om)
_dg, _dw, _do = dshares(dep[first]); _dt = _dg + _dw + _do
SH0 = (_dg / _dt, _dw / _dt, _do / _dt)
for y in sorted(set(om) | {y for y in fs if y < first}):
    if not ((y in res and res[y][1] > 0) or y in aer): continue
    if y < first:
        rev, parts = from_finstats(fs[y], SH0)
        src = 'eia-finstats'
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

# the seam: EIA's published composite (major IOUs) against PUDL's Form 1 sum (all respondents) where both exist
for y in sorted(fs):
    if y < first or y not in om: continue
    rev, p = from_finstats(fs[y], SH0); t = sum(p.values())
    row = next(r for r in out if r['y'] == y); rt = sum(row['parts'].values())
    print(f'seam {y}: EIA FinStats vs PUDL shares', {k: f"{p[k] / t:4.0%}/{row['parts'][k] / rt:4.0%}" for k in p})

open('src/lib/usbilldata.js', 'w').write(
    '// What the average US residential kWh paid for, in 2025 cents: investor-owned utilities’ FERC Form 1 accounts and\n'
    '// EIA-861 prices (both via Catalyst Cooperative PUDL); before 1994 EIA Financial Statistics of Major U.S. Investor-Owned\n'
    '// Electric Utilities; before 2001 EIA Annual Energy Review prices; CPI-U. Made by scripts/make_us_bill_data.py.\n'
    'export const USBILL = ' + json.dumps(out, separators=(',', ':')) + ';\n')
