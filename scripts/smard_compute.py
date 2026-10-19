#!/usr/bin/env python3
"""Build German capture, profile, 2025 hourly and Seville-hybrid series.

Germany: SMARD chart_data (Bundesnetzagentur, CC BY 4.0).
  251   day-ahead price, DE-AT-LU, through 2018-09-30
  4169  day-ahead price, DE-LU, from 2018-10-01
  4068  photovoltaics, MWh
  4067  wind onshore, MWh
  1225  wind offshore, MWh
  410   grid load (Netzlast), MWh
Spain prices for the Seville hybrid only: Red Eléctrica apidatos,
  peninsula spot price, hourly, 2023.
PVGIS hourly irradiance is read from the existing research file.
"""
import json, os
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

SMARD = '/workspace/research/data/global/smard'
REE = '/workspace/research/data/global/ree'
PVGIS = '/workspace/research/data/wind/pvgis_seville_track_2023.json'
BERLIN = ZoneInfo('Europe/Berlin')
# 2018-10-01 00:00 Europe/Berlin (CEST) — DE-LU bidding zone opens, DE-AT-LU closes.
CUTOFF = 1538344800000
HOUR = 3600000


def _load_series(name):
    path = os.path.join(SMARD, f'{name}.json')
    with open(path) as f:
        d = json.load(f)
    return {int(t): v for t, v in d['series']}


def load_price():
    old = _load_series('price_deatlu')
    new = _load_series('price_delu')
    price = {t: v for t, v in old.items() if t < CUTOFF}
    for t, v in new.items():
        if t >= CUTOFF:
            price[t] = v
    return price


def load_gen():
    return {
        'solar': _load_series('solar'),
        'onshore': _load_series('wind_onshore'),
        'offshore': _load_series('wind_offshore'),
        'load': _load_series('load'),
    }


def _dt(ts):
    return datetime.fromtimestamp(ts / 1000, BERLIN)


def _year_ts(series, year):
    return [t for t in series if _dt(t).year == year]


def _sum_mwh(series, year):
    total = 0.0
    n = 0
    nulls = 0
    for t, v in series.items():
        if _dt(t).year != year:
            continue
        if v is None:
            nulls += 1
            continue
        total += v
        n += 1
    return total, n, nulls


def annual(price, gen, year):
    """Unweighted mean price, negative-hour count, and generation-weighted prices."""
    phours = []
    for t, v in price.items():
        if _dt(t).year != year or v is None:
            continue
        phours.append((t, v))
    base = sum(v for _, v in phours) / len(phours) if phours else None
    neg = sum(1 for _, v in phours if v < 0)
    out = {'year': year, 'base': base, 'neg': neg, 'priceHours': len(phours)}
    load_mwh, load_n, load_null = _sum_mwh(gen['load'], year)
    out['loadMWh'] = load_mwh
    out['loadHours'] = load_n
    out['loadNulls'] = load_null
    for key in ('solar', 'onshore', 'offshore'):
        mwh, n, nulls = _sum_mwh(gen[key], year)
        num = 0.0
        den = 0.0
        paired = 0
        for t, g in gen[key].items():
            if _dt(t).year != year or g is None:
                continue
            p = price.get(t)
            if p is None:
                continue
            num += g * p
            den += g
            paired += 1
        out[key] = {
            'mwh': mwh,
            'hours': n,
            'nulls': nulls,
            'price': (num / den) if den else None,
            'paired': paired,
            'share': (mwh / load_mwh) if load_mwh else None,
        }
    return out


def profile(price, solar, year):
    """Mean Europe/Berlin clock-hour price and solar, April–September."""
    ps = [0.0] * 24
    pn = [0] * 24
    ss = [0.0] * 24
    sn = [0] * 24
    for t, p in price.items():
        dt = _dt(t)
        if dt.year != year or not (4 <= dt.month <= 9) or p is None:
            continue
        ps[dt.hour] += p
        pn[dt.hour] += 1
    for t, g in solar.items():
        dt = _dt(t)
        if dt.year != year or not (4 <= dt.month <= 9) or g is None:
            continue
        ss[dt.hour] += g
        sn[dt.hour] += 1
    return {
        'price': [round(ps[h] / pn[h], 1) if pn[h] else None for h in range(24)],
        'solar': [round(ss[h] / sn[h] / 1000, 2) if sn[h] else None for h in range(24)],
        'nPrice': pn,
        'nSolar': sn,
    }


def monthly(gen, year):
    mon = {k: [0.0] * 12 for k in ('solar', 'onshore', 'offshore', 'load')}
    for key, series in (('solar', gen['solar']), ('onshore', gen['onshore']),
                        ('offshore', gen['offshore']), ('load', gen['load'])):
        for t, v in series.items():
            if v is None:
                continue
            dt = _dt(t)
            if dt.year == year:
                mon[key][dt.month - 1] += v / 1e6  # TWh
    return {k: [round(x, 2) for x in v] for k, v in mon.items()}


def hourly_2025(price, gen):
    """One slot per elapsed hour from the first to the last 2025 Berlin timestamp."""
    stamps = set()
    for series in (price, gen['solar'], gen['onshore'], gen['offshore'], gen['load']):
        for t in series:
            if _dt(t).year == 2025:
                stamps.add(t)
    if not stamps:
        raise SystemExit('no 2025 timestamps')
    t0 = min(stamps)
    t1 = max(stamps)
    n = (t1 - t0) // HOUR + 1
    P, wind, solar, load = [], [], [], []
    gaps = 0
    for i in range(n):
        t = t0 + i * HOUR
        if t not in stamps:
            gaps += 1
        p = price.get(t)
        s = gen['solar'].get(t)
        w = gen['onshore'].get(t)
        o = gen['offshore'].get(t)
        l = gen['load'].get(t)
        P.append(None if p is None else round(p, 2))
        if w is None and o is None:
            wind.append(None)
        else:
            wind.append(round(((w or 0) + (o or 0)) / 1000, 2))
        solar.append(None if s is None else round(s / 1000, 2))
        load.append(None if l is None else round(l / 1000, 2))
    # Stillest 168-hour block the figure can open on (weeks 0–51).
    still = 0
    still_avg = 1e18
    for w in range(52):
        i0 = w * 168
        if i0 + 168 > n:
            break
        acc = 0.0
        for k in range(168):
            acc += (wind[i0 + k] or 0) + (solar[i0 + k] or 0)
        avg = acc / 168
        if avg < still_avg:
            still_avg = avg
            still = w
    return {
        'P': P, 'wind': wind, 'solar': solar, 'load': load,
        't0': t0, 'n': n, 'gaps': gaps, 'stillWeek': still, 'stillAvg': still_avg,
        't0iso': _dt(t0).isoformat(), 't1iso': _dt(t1).isoformat(),
    }


def load_ree_spot():
    """Peninsula hourly spot price, keyed by UTC epoch ms of the period start."""
    out = {}
    updates = []
    for month in range(1, 13):
        path = os.path.join(REE, f'spot_2023_{month:02d}.json')
        with open(path) as f:
            d = json.load(f)
        updates.append(d.get('data', {}).get('attributes', {}).get('last-update'))
        spot = None
        for it in d.get('included', []):
            title = (it.get('attributes') or {}).get('title', '')
            if 'spot' in title.lower():
                spot = it['attributes']
        if spot is None:
            raise SystemExit(f'no spot series in {path}')
        for row in spot['values']:
            dt = datetime.fromisoformat(row['datetime'])
            ts = int(dt.timestamp() * 1000)
            # snap sub-second noise
            ts = round(ts / HOUR) * HOUR
            out[ts] = row['value']
    return out, updates


def hybrid_prices(spot):
    pv = json.load(open(PVGIS))
    p = pv['P']
    if len(p) != 8760:
        raise SystemExit(f'PVGIS length {len(p)}')
    t0 = int(datetime(2023, 1, 1, tzinfo=timezone.utc).timestamp() * 1000)
    prices = []
    missing = []
    for i in range(8760):
        ts = t0 + i * HOUR
        if ts not in spot:
            missing.append(ts)
            prices.append(None)
        else:
            prices.append(round(float(spot[ts]), 2))
    return {'pv': [round(x) for x in p], 'price': prices, 'missing': len(missing), 't0': t0}


def capture_rows(rows):
    """winddata.js capture rows: de only. Prices €/MWh to 2 dp, TWh to 2 dp, shares to 4 dp."""
    out = []
    for r in rows:
        def pack(tech):
            t = r[tech]
            return [
                None if t['price'] is None else round(t['price'], 2),
                None if t['share'] is None else round(t['share'], 4),
                round(t['mwh'] / 1e6, 2),
            ]
        out.append([
            'de', r['year'],
            None if r['base'] is None else round(r['base'], 2),
            r['neg'],
            *pack('solar'), *pack('onshore'), *pack('offshore'),
        ])
    return out


def solar_capture_rows(rows):
    return [[
        r['year'],
        None if r['base'] is None else round(r['base'], 2),
        None if r['solar']['price'] is None else round(r['solar']['price'], 2),
        r['neg'],
        round(r['solar']['mwh'] / 1e6, 2),
    ] for r in rows]


def build():
    price = load_price()
    gen = load_gen()
    rows = [annual(price, gen, y) for y in range(2015, 2026)]
    prof = {y: profile(price, gen['solar'], y) for y in (2015, 2025)}
    mon = monthly(gen, 2025)
    hour = hourly_2025(price, gen)
    spot, updates = load_ree_spot()
    hy = hybrid_prices(spot)
    return {
        'rows': rows,
        'capture': capture_rows(rows),
        'solarCapture': solar_capture_rows(rows),
        'profile': {str(y): {'price': prof[y]['price'], 'solar': prof[y]['solar']} for y in prof},
        'profileN': {str(y): prof[y]['nPrice'] for y in prof},
        'monthly': {
            'Solar': mon['solar'],
            'Wind onshore': mon['onshore'],
            'Wind offshore': mon['offshore'],
            'Load': mon['load'],
        },
        'de2025': hour,
        'hybrid': hy,
        'reeUpdates': updates,
        'price': price,
        'gen': gen,
    }


def _fmt(x, nd=2):
    if x is None:
        return '—'
    return f'{x:.{nd}f}'


def report(data):
    print('year base neg solar€ rate solarTWh on€ onRate onTWh off€ offRate offTWh loadTWh pH')
    for r in data['rows']:
        b = r['base']
        def rate(tech):
            p = r[tech]['price']
            return None if p is None or not b else p / b
        print(
            r['year'],
            _fmt(b), r['neg'],
            _fmt(r['solar']['price']), _fmt(rate('solar'), 3), _fmt(r['solar']['mwh'] / 1e6),
            _fmt(r['onshore']['price']), _fmt(rate('onshore'), 3), _fmt(r['onshore']['mwh'] / 1e6),
            _fmt(r['offshore']['price']), _fmt(rate('offshore'), 3), _fmt(r['offshore']['mwh'] / 1e6),
            _fmt(r['loadMWh'] / 1e6), r['priceHours'],
            'nulls', r['solar']['nulls'], r['onshore']['nulls'], r['offshore']['nulls'], r['loadNulls'],
        )
    h = data['de2025']
    print('de2025', h['n'], 'gaps', h['gaps'], h['t0iso'], '->', h['t1iso'], 'stillWeek', h['stillWeek'], 'stillAvgGW', round(h['stillAvg'], 2))
    ws = [(h['wind'][i] or 0) + (h['solar'][i] or 0) for i in range(h['n'])]
    print('wind+solar GW min', min(ws), 'max', max(ws), 'load max', max(x or 0 for x in h['load']))
    m = data['monthly']
    wj = m['Wind onshore'][0] + m['Wind offshore'][0]
    wjul = m['Wind onshore'][6] + m['Wind offshore'][6]
    print('monthly wind Jan/Jul', wj, wjul, 'solar Jan/Jul', m['Solar'][0], m['Solar'][6], 'load sum', round(sum(m['Load']), 2), 'vre sum', round(sum(m['Solar']) + sum(m['Wind onshore']) + sum(m['Wind offshore']), 2))
    print('monthly max', max(max(v) for v in m.values()))
    for y in (2015, 2025):
        pr = data['profile'][str(y)]['price']
        k = pr.index(min(pr))
        print(f'profile {y} min hour {k}:00 €{pr[k]}  n={data["profileN"][str(y)]}')
    hy = data['hybrid']
    vals = [v for v in hy['price'] if v is not None]
    print('hybrid prices', len(hy['price']), 'missing', hy['missing'], 'mean', round(sum(vals) / len(vals), 2), 'min', min(vals), 'max', max(vals))
    # daily means
    dmax = 0
    for d in range(365):
        sl = hy['price'][d * 24:(d + 1) * 24]
        sl = [v for v in sl if v is not None]
        if sl:
            dmax = max(dmax, sum(sl) / len(sl))
    print('hybrid max daily mean', round(dmax, 2))
    print('ree last-updates', data['reeUpdates'])
    # default hybrid dispatch, copied from wind2.js simulate()
    sim = simulate_hybrid(hy, 0.75, 0.4, 4)
    print('hybrid default panels €/MWh', round(sim['capPV'], 2), 'with battery', round(sim['cap'], 2),
          'rev lift %', round((sim['rev'] / sim['revPV'] - 1) * 100, 1),
          'revPV k€', round(sim['revPV'] / 1000), 'rev k€', round(sim['rev'] / 1000))
    r22 = next(r for r in data['rows'] if r['year'] == 2022)
    print('2022 gap base-onshore', round(r22['base'] - r22['onshore']['price'], 2))
    ons = [(r['year'], r['onshore']['price']) for r in data['rows']]
    print('onshore min', min(ons, key=lambda x: x[1]), 'max', max(ons, key=lambda x: x[1]))
    rates = [r['solar']['price'] / r['base'] for r in data['rows'] if r['year'] <= 2019]
    print('solar capture 2015-19', [round(x, 3) for x in rates], 'min', round(min(rates), 3), 'max', round(max(rates), 3))
    # price continuity at the zone boundary
    around = sorted(t for t in data['price'] if abs(t - CUTOFF) < 6 * HOUR)
    print('boundary hours', [(datetime.fromtimestamp(t / 1000, BERLIN).isoformat(), data['price'][t]) for t in around])


def simulate_hybrid(H, gridMW, bpMW, durH):
    """Same daily rule as src/figs/wind2.js hybridPlant.simulate."""
    N = len(H['pv'])
    E = bpMW * durH
    eta = 0.92
    exp = [0.0] * N
    dis = [0.0] * N
    lost = [0.0] * N
    soc = 0.0
    for d in range(N // 24):
        hs = [d * 24 + k for k in range(24)]
        pv = [H['pv'][i] / 1000 for i in hs]
        price = [0.0 if H['price'][i] is None else H['price'][i] for i in hs]
        c = [0.0] * 24
        room = E - soc
        for k in range(24):
            over = max(0.0, pv[k] - gridMW)
            x = min(over, bpMW, room / eta)
            c[k] += x
            room -= x * eta
        order = sorted(range(24), key=lambda k: price[k], reverse=True)
        cheap = [k for k in range(24) if pv[k] > 0.01]
        cheap.sort(key=lambda k: price[k])
        top = price[order[0]]
        for k in cheap:
            if room <= 1e-6:
                break
            if price[k] > top * eta * eta - 2:
                break
            x = min(pv[k] - c[k], bpMW - c[k], room / eta)
            if x > 0:
                c[k] += x
                room -= x * eta
        store = E - room
        dd = [0.0] * 24
        for k in order:
            if store <= 1e-6:
                break
            head = gridMW - max(0.0, min(gridMW, pv[k] - c[k]))
            x = min(bpMW, head, store * eta)
            if x > 0 and price[k] > 0:
                dd[k] = x
                store -= x / eta
        soc = store
        for k in range(24):
            i = d * 24 + k
            direct = max(0.0, pv[k] - c[k])
            e = min(gridMW, direct)
            exp[i] = e
            lost[i] = direct - e
            dis[i] = dd[k]
    rev = mwh = revPV = mwhPV = 0.0
    for i in range(N):
        p = 0.0 if H['price'][i] is None else H['price'][i]
        out = exp[i] + dis[i]
        rev += out * p
        mwh += out
        pv_out = min(gridMW, H['pv'][i] / 1000)
        revPV += pv_out * p
        mwhPV += pv_out
    return {'rev': rev, 'mwh': mwh, 'revPV': revPV, 'mwhPV': mwhPV,
            'cap': rev / mwh, 'capPV': revPV / mwhPV}


if __name__ == '__main__':
    report(build())
