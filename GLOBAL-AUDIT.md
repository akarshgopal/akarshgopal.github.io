# Global audit — Europe/Germany-centric content and planned replacements

Goal: the default frame is global; Germany/EU becomes one case study among China, India, US, Japan, Brazil, the Middle East, Africa, Australia and Southeast Asia. Real cited data only (Ember yearly/monthly, IEA, IRENA, EIA international, OWID, World Bank, national operators); models labelled. Existing anchor ids are kept (add, never rename). Units: default US$ with a €/$ toggle on price figures (shared `currency` helper, rates cited per year).

## Energy-Charts (licence) — must be removed before hosting
| Where | Use | Replacement |
|---|---|---|
| solar-pv `captureHistory` | DE hourly prices + solar 2015–25 | SMARD (CC BY 4.0) prices + generation; add ERCOT/CAISO/NEM capture series (EIA, AEMO-derived published figures) |
| utility-renewables `revenueModels`, `captureCompare`, `seasonMix`, `hybridPlant` (+ `make_wind_data.py`, `winddata.js`) | DE/ES hourly prices + wind/solar | SMARD for DE; ENTSO-E/OMIE-published or Ember monthly for ES; add global cases from Ember monthly |
| main essay note n3 (text mention only) | citation | Check wording; cite SMARD/FfE instead |

## Main essay (index.html)
| Figure / passage | Europe-centric issue | Planned change |
|---|---|---|
| Intro/lede, s6–s10 framing | German grid as "the" grid | Global opening: world generation mix + growth by region (new fig `worldMix`, Ember yearly) |
| `solarDay` | Berlin 52.5°N only | Location presets: Berlin, Lahore, Riyadh, Atacama, Sydney, Houston, Delhi, Nairobi |
| `gridDay` | "German-style grid" | Region presets: China/India (coal-heavy), Gulf/US (gas-heavy), Brazil/Norway (hydro), Chile/Australia/California (solar-heavy), Germany; all labelled stylised |
| `merit` | "European bidding zone" | Same region presets with regional fuel prices (IEA/EIA cited) and CO₂ price where one exists |
| `frequency` | 50 Hz only | Note 60 Hz Americas/Japan split (Japan 50/60 Hz east/west); toggle |
| `capture` | German weights | Keep model; note region presets |
| `spot` | DE-LU monthly only | New `wholesaleWorld`: annual wholesale levels across ~10 markets (ERCOT, PJM, CAISO, NEM, Japan JEPX, India IEX, Nord Pool, DE-LU, Iberia, Brazil PLD) with DE-LU monthly as a case study view |
| s8–s9 markets (energy-only/zonal) | EU zonal by default | New `marketDesigns` figure/table: vertically integrated/state (China, India DISCOMs, Gulf, most of Africa), single buyer, energy-only (ERCOT, NEM), capacity markets (PJM), nodal vs zonal; `network` keeps nodal/zonal toggle with US/Europe/Australia labels |
| `bill` (BDEW only) | Germany only | Generalise: bill stacks for Germany, US (EIA), UK (Ofgem cap), Japan, India (state tariff), South Africa, Brazil where data exists; Germany one tab |
| `usCompare` | US vs Germany | Become `retailWorld`: household + industrial retail prices across many countries (IEA/World Bank/GlobalPetrolPrices-style cited sources) with nominal $ vs PPP toggle and caveats |
| s10 subsidies/access | absent | Add energy access: ~730M without electricity (IEA SDG7 tracking), South Africa load-shedding, Pakistan rooftop boom, tariffs and subsidies |
| `historyChart`, s13 (1973 US story) | US-only arc | Add arcs: Japan postwar, Soviet GOELRO, China electrification, India rural electrification (Saubhagya), post-colonial grids (Africa) — new `electrificationWorld` (OWID/World Bank access %) |
| `energyShare` | US only | Keep + add world/China/India where cited data exists |
| `cleanGrid`, `adequacy`, `futureDay` | "German-style winter week" | Region preset (Germany winter lull vs India monsoon vs Texas summer peak), stylised |
| `unlock` | € only, BAFA/BDEW markers | $ default with € toggle; add markers: Gulf solar PPA, India, US industrial |
| `lcoe`, `lazardHistory`, `learning` | already global-ish | Add IRENA global LCOE + auction prices (Saudi, UAE, India, Chile, Brazil) |
| `foak` | Hinkley/Flamanville/Vogtle | Add Barakah (UAE), Chinese Hualong One, Akkuyu where cited |

## Post 1 — Solar PV
| `sunPath`/`yieldMap` | Europe map | Global yield presets (PVGIS covers Europe/Africa/Asia; add NREL NSRDB for Americas) |
| `costStack` | US NREL only | Add IRENA country installed costs (China, India, Germany, US, Australia, Brazil) |
| `captureHistory` | Germany, Energy-Charts | See above; add Australia NEM/California cases |
| New | global deployment by country (Ember/IRENA), Pakistan rooftop/panel-import boom, Africa off-grid solar (GOGLA/IEA), Australia rooftop + negative prices |

## Post 2 — Utility renewables
| `queueFunnel` | US only | Add global auctions/queues: India SECI, Brazil leilões, Saudi NREP, South Africa REIPPPP, China base-scale projects |
| `offshoreCfd` | UK only | Add Taiwan, China, US, Germany zero-subsidy bids |
| `revenueModels`/`captureCompare`/`seasonMix`/`curtailment` | DE/ES | Replace Energy-Charts; add Chile & China curtailment (CNE/NEA-published rates), ERCOT, California |
| `gridForming` | Europe 50 Hz | Add Australia NEM/ERCOT examples |

## Post 3 — Transformers
| `efficiency` | EU Ecodesign only | Add US DOE, China GB 20052, India BEE star tiers |
| `family` | German household chain | Presets: Germany 400 V, US 120/240 V split-phase, Japan 100 V, India 230 V |
| `shortage` | US BLS/Wood Mackenzie | Add global supply chain (China/India/Korea/Europe makers, lead times worldwide) |

## Post 4 — Transmission
| `redispatch`, `buildRate`, `bill`, `interconnect` | Germany/US | Add China UHVDC build, India green energy corridors, Brazil Belo Monte, ASEAN Power Grid, African power pools (SAPP/WAPP); Germany kept as one case |
| `hvdcProjects` | already mixed | Add Belo Monte, Raigarh–Pugalur, Changji–Guquan (exists) |

## Post 5 — Synthetic fuels
| `cheapHours` | DE-LU prices only | Add presets: NEM (South Australia), ERCOT, Chile SEN, Spain — or PPA-profile scenarios for Gulf/Chile; label clearly |
| `projects`, `mandates` | Europe-heavy | Add China electrolyser build (Kuqa, Songyuan), India National Green Hydrogen Mission/SIGHT, Australia (cancellations), Chile, Gulf (NEOM exists), US 45V |
| € units | € throughout | $ default with € toggle |

## Cross-cutting
- Shared `src/lib/currency.js` ($ default, € toggle, cited annual rates) applied to all price figures.
- Intros, nav titles and series ledes rewritten global-first; footnotes per page.
- Link check must pass after each page; audit + stress + screenshots per page.

## Status (12 Oct 2026)
Done: worldMix, marketDesigns, accessWorld, retailWorld (main); merit region presets + $/€; solarDay locations; 60 Hz note; Energy-Charts fully replaced by SMARD (DE) and REE (ES 2023 prices); solarWorld, windWorld; world voltages (P3); China UHV / India one grid / SAPP (P4); India NGHM (P5).
Closed (12 Oct, second pass): billWorld (Eurostat components, nominal/PPS); gridDay region presets; $/€ toggles on spot, bill, unlock and all € figures in posts 2 and 5; PPP view on retailWorld (World Bank WDI); IRENA solar costs (P1); global auctions (P2); cheapHours presets Spain 2023 / South Australia 2025 (P5); citations for negative-price claim and Ember-vs-SMARD scope; cross-checks for GlobalPetrolPrices and UHV count; old Energy-Charts fetchers (research/data/{solar,wind}/ec*.py) replaced by SMARD stubs, originals archived.
Still open: Spain capture rates (no open hourly generation series; noted in caption); non-European bill splits (not published on a common basis).
