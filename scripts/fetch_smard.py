#!/usr/bin/env python3
"""Download SMARD chart_data hourly series (Bundesnetzagentur, CC BY 4.0).

Index:  https://www.smard.de/app/chart_data/<filter>/<region>/index_hour.json
Chunk:  https://www.smard.de/app/chart_data/<filter>/<region>/<filter>_<region>_hour_<timestamp>.json

Filters (verified against SMARD market_data_configuration.json, Oct 2026):
  4068  Stromerzeugung: Photovoltaik                 MWh
  4067  Stromerzeugung: Wind Onshore                MWh
  1225  Stromerzeugung: Wind Offshore               MWh
  410   Stromverbrauch: Gesamt (Netzlast)           MWh
  4169  Großhandelspreis Day-Ahead DE-LU            €/MWh   from 2018-10-01
  251   Großhandelspreis Day-Ahead DE-AT-LU         €/MWh   2015-01-05 to 2018-09-30

Raw weekly JSON is saved under /workspace/research/data/global/smard/raw/.
A lossless merge of [timestamp_ms, value] rows is written beside it.
"""
import json, os, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

OUT = '/workspace/research/data/global/smard'
RAW = os.path.join(OUT, 'raw')
BASE = 'https://www.smard.de/app/chart_data'
# Keep every week that can contain an hour in 2015–2025 (Berlin).
# Week files are ~7 days; include a margin on either side.
T_MIN = 1419807600000          # 2014-12-28 23:00 UTC (generation index start)
T_MAX = 1767225600000          # 2026-01-01 00:00 UTC; weeks starting before this cover 2025

SERIES = [
    # filter, region, tag
    (4068, 'DE', 'solar'),
    (4067, 'DE', 'wind_onshore'),
    (1225, 'DE', 'wind_offshore'),
    (410, 'DE', 'load'),
    (4169, 'DE', 'price_delu'),
    (251, 'DE', 'price_deatlu'),
]

UA = 'electricity-explainer-research/1.0 (SMARD CC-BY-4.0; contact: local research)'


def get(url, timeout=40):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def fetch_index(filt, region):
    url = f'{BASE}/{filt}/{region}/index_hour.json'
    dest = os.path.join(OUT, f'index_{filt}_{region}_hour.json')
    blob = get(url)
    os.makedirs(OUT, exist_ok=True)
    open(dest, 'wb').write(blob)
    ts = json.loads(blob)['timestamps']
    keep = [t for t in ts if T_MIN <= t <= T_MAX or (filt == 251)]
    # 251 ends in 2018; take all of it. Others: weeks that overlap 2015–2025.
    if filt != 251:
        keep = [t for t in ts if t <= T_MAX and t + 8 * 24 * 3600 * 1000 >= T_MIN]
    else:
        keep = list(ts)
    print(f'index {filt}/{region}: {len(ts)} weeks, keeping {len(keep)}', flush=True)
    return keep


def fetch_week(filt, region, ts):
    dest_dir = os.path.join(RAW, f'{filt}_{region}')
    dest = os.path.join(dest_dir, f'{ts}.json')
    if os.path.exists(dest) and os.path.getsize(dest) > 20:
        try:
            json.load(open(dest))
            return ts, 'cached'
        except Exception:
            pass
    url = f'{BASE}/{filt}/{region}/{filt}_{region}_hour_{ts}.json'
    last = None
    for attempt in range(5):
        try:
            blob = get(url)
            json.loads(blob)  # validate
            os.makedirs(dest_dir, exist_ok=True)
            open(dest, 'wb').write(blob)
            return ts, 'ok'
        except urllib.error.HTTPError as e:
            last = e
            if e.code == 404:
                return ts, '404'
            time.sleep(1.5 * (attempt + 1))
        except Exception as e:
            last = e
            time.sleep(1.5 * (attempt + 1))
    return ts, f'FAIL {last}'


def merge(filt, region, timestamps):
    rows = {}
    missing = []
    for ts in timestamps:
        path = os.path.join(RAW, f'{filt}_{region}', f'{ts}.json')
        if not os.path.exists(path):
            missing.append(ts)
            continue
        d = json.load(open(path))
        for rec in d['series']:
            t, v = rec[0], rec[1]
            # later files win on the rare overlap (SMARD weeks abut, they should not overlap)
            rows[t] = v
    ordered = [[t, rows[t]] for t in sorted(rows)]
    return ordered, missing


def main():
    os.makedirs(RAW, exist_ok=True)
    jobs = []
    indexes = {}
    for filt, region, tag in SERIES:
        ts = fetch_index(filt, region)
        indexes[(filt, region)] = ts
        for t in ts:
            jobs.append((filt, region, t))
    print(f'downloading {len(jobs)} week files', flush=True)
    fails = []
    done = 0
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(fetch_week, f, r, t): (f, r, t) for f, r, t in jobs}
        for fut in as_completed(futs):
            ts, status = fut.result()
            done += 1
            if status not in ('ok', 'cached', '404'):
                fails.append((futs[fut], status))
            if done % 200 == 0 or status not in ('ok', 'cached'):
                print(f'  {done}/{len(jobs)} last={status} fails={len(fails)}', flush=True)
    if fails:
        print('FAILURES', fails[:20], 'count', len(fails), flush=True)
        sys.exit(1)
    manifest = {
        'source': 'Bundesnetzagentur SMARD chart_data API',
        'licence': 'CC BY 4.0',
        'licence_note': 'SMARD data are published by the Bundesnetzagentur under CC BY 4.0. Cite SMARD.de / Bundesnetzagentur.',
        'url_pattern': BASE + '/<filter>/<region>/index_hour.json and /<filter>_<region>_hour_<timestamp>.json',
        'filters': {
            '4068': 'Photovoltaics, realised generation, MWh',
            '4067': 'Wind onshore, realised generation, MWh',
            '1225': 'Wind offshore, realised generation, MWh',
            '410': 'Total grid load (Netzlast), MWh',
            '4169': 'Day-ahead auction price Germany/Luxembourg, €/MWh, from 2018-10-01',
            '251': 'Day-ahead auction price Germany/Austria/Luxembourg, €/MWh, until 2018-09-30',
        },
        'series': {},
    }
    for filt, region, tag in SERIES:
        ordered, missing = merge(filt, region, indexes[(filt, region)])
        path = os.path.join(OUT, f'{tag}.json')
        json.dump({'filter': filt, 'region': region, 'tag': tag, 'n': len(ordered), 'series': ordered},
                  open(path, 'w'), separators=(',', ':'))
        nulls = sum(1 for _, v in ordered if v is None)
        print(f'merged {tag}: {len(ordered)} hours, nulls {nulls}, missing weeks {len(missing)} -> {path}', flush=True)
        manifest['series'][tag] = {'filter': filt, 'region': region, 'hours': len(ordered), 'nulls': nulls, 'file': path}
    json.dump(manifest, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=2)
    print('DONE', flush=True)


if __name__ == '__main__':
    main()
