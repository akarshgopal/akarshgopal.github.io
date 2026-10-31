# What a US kilowatt-hour pays for, 1994 on: every investor-owned utility's FERC Form 1 accounts (via Catalyst
# Cooperative's PUDL), summed, split into fuel, bought power, the rest of generation, wires, customer service and
# overheads, taxes; applied to the average residential price (EIA-861 via PUDL) and put in 2025 dollars (CPI-U).
# Usage: python3 -P scripts/make_us_bill_data.py <dir with the PUDL parquet files and cpiai.csv>
# Capital costs (depreciation and the return on capital) are split by function in proportion to each function's
# depreciation, a proxy for its share of the capital base. Writes src/lib/usbilldata.js.
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

cpi = collections.defaultdict(list)
for r in csv.DictReader(open(f'{D}/cpiai.csv')): cpi[int(r['Date'][:4])].append(float(r['Index']))
cpi = {y: sum(v) / len(v) for y, v in cpi.items()}
base = cpi[2025]

PROD = ('steam_production', 'nuclear_production', 'hydraulic_production_conventional', 'hydraulic_production_pumped_storage', 'other_production')
out = []
for y in sorted(om):
    o, i, d = om[y], inc[y], dep[y]
    rev = i['operating_revenues']
    if rev <= 0 or y not in res or res[y][1] <= 0: continue
    fuel = o['fuel_steam_power_generation'] + o['nuclear_fuel_expense'] + o['fuel']
    bought = o['purchased_power']
    gen_om = o['power_production_expenses'] - fuel - bought
    wires_om = o['transmission_expenses'] + o['regional_market_expenses'] + o['distribution_expenses']
    over_om = o['customer_account_expenses'] + o['customer_service_and_information_expenses'] + o['sales_expenses'] + o['administrative_and_general_expenses']
    dg = sum(d[k] for k in PROD); dw = d['transmission'] + d['distribution'] + d.get('regional_transmission_and_market_operation', 0)
    do = d['general'] + d['intangible'] + d['common_plant_electric']
    dt = dg + dw + do
    taxes = (i['taxes_other_than_income_taxes_utility_operating_income'] + i['income_taxes_operating_income'] + i['income_taxes_utility_operating_income_other']
             + i['provisions_for_deferred_income_taxes_utility_operating_income'] - i['provision_for_deferred_income_taxes_credit_operating_income']
             + i['investment_tax_credit_adjustments'])
    ret = rev - i['utility_operating_expenses']  # the return on capital (the reported row is empty before 2021)
    cap = dt + ret  # depreciation plus return: the cost of capital, split by function
    gen = gen_om + cap * dg / dt; wires = wires_om + cap * dw / dt; over = over_om + cap * do / dt
    parts = {'fuel': fuel, 'bought': bought, 'gen': gen, 'wires': wires, 'over': over, 'taxes': taxes}
    total = sum(parts.values())
    price = res[y][0] / res[y][1] / 10  # ¢/kWh nominal
    real = price * base / cpi[y]
    out.append({'y': y, 'nom': round(price, 2), 'real': round(real, 2), 'cover': round(total / rev, 3),
                'parts': {k: round(real * v / total, 2) for k, v in parts.items()}})
    print(y, f'{price:5.2f}¢ nominal {real:5.2f}¢ (2025$)  accounted {total / rev:5.1%}', {k: f'{v / total:4.0%}' for k, v in parts.items()})

open('src/lib/usbilldata.js', 'w').write(
    '// What the average US residential kWh paid for, in 2025 cents: investor-owned utilities’ FERC Form 1 accounts and\n'
    '// EIA-861 prices (both via Catalyst Cooperative PUDL), CPI-U. Made by scripts/make_us_bill_data.py.\n'
    'export const USBILL = ' + json.dumps(out, separators=(',', ':')) + ';\n')
