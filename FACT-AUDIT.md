# Fact audit: *How electricity works* (6 pages)

Review pass carried out 17 October 2026 (Europe/Berlin, CEST). It covered the prose, every figure readout at its defaults (dumped headlessly with `scripts/fa-readouts.mjs`, with actions run through `scripts/fa-probe.mjs`), the figure models (re-run in node) and the data files (re-derived from raw SMARD, AEMO, Ember, IRENA and Lazard data under `/workspace/research`).

Severity: **wrong** = factually or arithmetically incorrect · **inconsistent** = the same quantity stated differently somewhere else, or a figure default that doesn't produce the number the prose quotes · **unsourced** = no source, the source doesn't support the claim, or the claim is outdated · **nitpick** = cosmetic or rounding.

## Counts

| Severity | Found | Fixed | Open |
|---|---|---|---|
| wrong | 12 | 12 | 0 |
| inconsistent | 17 | 17 | 0 |
| unsourced | 8 | 8 | 0 |
| nitpick | 6 | 6 | 0 |
| **total** | **43** | **43** | **0** |

First pass (17 Oct): 40 findings, 29 fixed, 11 left open. Second pass (18 Oct): the 11 open items closed (four of them by hedging unverified wording rather than with new sources), plus 2 new wrong footnote references found and fixed (N1, N2). Third pass (18 Oct): sources found for the conductor rating and the two-circuit claim, with inputs and wording changed to match (section E); one stale note fixed (N3).

## A. Germany's negative-price hours: 573 vs 655

Recomputed from raw SMARD day-ahead prices for DE-LU (filter 4169, 8,760 hourly values for 2025):

| Year | < 0 €/MWh | = 0 | ≤ 0 |
|---|---|---|---|
| 2023 | 301 | — | — |
| 2024 | **457** | 62 | 519 |
| 2025 | **573** | 82 | **655** |

- Both numbers are correct. **573** counts strictly negative hours; **655** counts hours at zero or below, all from SMARD/BNetzA, 2025. The BNetzA/SMARD 2024 press release also gives 457.
- The index's "459 negative hours in 2024" was **wrong**. It now reads 457, and the 655 figure is labelled "(655 at zero or below)", so the two definitions are no longer mixed.

## B. Findings: fixed

| # | Location | What was wrong | Evidence | Fix | Severity |
|---|---|---|---|---|---|
| 1 | index §8 (part2) | 459 negative hours in 2024; 573 vs 655 used without a definition | SMARD recount (table A) | 457; "(655 at zero or below)" | wrong |
| 2 | Part 5 figures `sf2.js` (EUR = 0.92), `sf3.js` (45V row ×0.92) | A €/$ rate of 1/0.92 = 1.087, while the rest of the series uses the ECB 2025 average of US$1.13/€ (`currency.js`) | `USD_PER_EUR[2025] = 1.12998` | Both now use 1/1.13; readouts recomputed | inconsistent |
| 3 | Part 5 `futures` readout | Fossil jet fuel hard-coded as €0.50/L | $86/bbl ÷ 159 L ÷ 1.13 = €0.48/L | Computed from the barrel price | wrong |
| 4 | Part 5 prose, electrolyser capex | €1,850–2,400/kW was converted at 0.92 | $2,000–2,600 ÷ 1.13 = €1,770–2,300 | €1,770–2,300 | inconsistent |
| 5 | Part 5 prose: fossil ammonia, fossil jet, CO₂ break-even | €660/t, €0.67/L, €560/t no longer matched the figure readouts | Readouts: €650, €0.66, €570 | Prose matches the readouts | inconsistent |
| 6 | Part 5 futures preset "DOE goal, €300/kW" and note n31 | DOE's 2031 target is **$150/kW** for the uninstalled electrolyser system, not €300/kW installed | DOE Hydrogen Program targets | Preset renamed "At scale (assumed), €300/kW"; prose and n31 now give the actual DOE target | wrong |
| 7 | Part 5 prose, futures | "€4.30" (firm supply) and Chinese range "€2.30–3.00" | Readouts at 1.13: €4.20/kg; recomputed range €2.30–2.90 | Updated | inconsistent |
| 8 | Part 5 litre caption + §1 | Said the litre total sat "near the efficient end of" aireg's 38–47 kWh/kg | The model total at defaults (point-source CO₂) is *below* 38. Only air capture (+14–25%) brings it into the range | "a little below aireg's 38–47 kWh/kg range unless the CO₂ comes from the air" | wrong |
| 9 | index §13 unlock figure + prose | Hydrogen at 57 kWh/kg ("IEA's 58% LHV"), €2.85 at €50/MWh; Part 5 uses ~55 kWh/kg | 58% in IEA GHR 2024 is *coal gasification with CCUS*; IEA's water-electrolysis value is 66% LHV. DOE status for systems is ≈55 kWh/kg | 55 kWh/kg (DOE, as Part 5); €2.75, "about three times"; readout $0.55/kg per $10 | wrong |
| 10 | index n39 | Cited the IEA GHR 2024 annex for the electrolyser value; the annex doesn't support 58% for electrolysis | `/workspace/fa/ghr24.txt` | Cites the DOE Hydrogen Shot technology assessment | unsourced |
| 11 | index Lazard firming (n23) | "$8 to $33 per MWh" | Lazard LCOE+ 2026 firming table: $8–$62 depending on ISO (`/workspace/fa/lazard26.txt`) | "$8 to $62 per MWh, depending on the grid operator" | wrong |
| 12 | index cleanGrid prose | "leave hundreds of hours unserved" and clean shares/costs that didn't match the defaults | Model at defaults: ~2,500 h short, 14% of demand; wind+solar+gas 83% clean @ $152; nuclear-heavy 98% @ $177; opening blend 90% @ $159 | Prose quotes the model | inconsistent |
| 13 | index §8 capture caption | Real-world solar capture quoted only for some years, in different wording from Part 1 | SMARD hourly: 76% (2023), 59% (2024), 52% (2025) | Three years, "computed from hourly SMARD prices in Part 1" | inconsistent |
| 14 | index merit-order prose | Gas "around $170/MWh of heat", the 2022 crisis value stated in dollars | 2022 TTF peak ≈ €150/MWh; ×1.13 = $170 | "€150 … as in 2022 ($170 at this essay's 2025 exchange rate)" | inconsistent |
| 15 | index resource adequacy + n42 | "EU approved German support for 12 GW of new gas plants in 2026", sourced to an FfE 2025 paper that predates the approval | EC press release 2 Sept 2026 (up to €35 bn capacity mechanism); Reuters 15 Jan 2026 | Reworded "up to €35 billion … some 11–12 GW of new, mostly gas-fired capacity"; n42 cites EC + Reuters | unsourced |
| 16 | index §14 queue + n43 | "2,600 GW at the end of 2023, median wait about five years" (outdated edition) | LBNL *Queued Up 2025*: 2,290 GW at end-2024 | "About 2,300 GW … end of 2024 … over four years"; n43 updated | unsourced |
| 17 | Part 2 (utility-renewables) German wind+solar | 201 TWh | Ember/SMARD 2025 sum = 207 TWh | 207 TWh | wrong |
| 18 | Part 2 South Australia negative hours | 2,641 | AEMO SA1 2025 dispatch prices: 2,620 h < 0 | 2,620 | wrong |
| 19 | Part 2 n20 + `wind2.js` CCOST 2025 = 3.071 | Disagreed with Part 4's €3.08 bn grid-congestion cost | Bundestag hib 689/2026: €1.62 bn redispatch + €1.37 bn reserve plants + €0.10 bn countertrading = €3.08 bn | CCOST = 3.078; n20 gives the components and the source | inconsistent |
| 20 | Part 2 curtailment readout | "…as almost 10 GW of new panels came online" had no source | No source found for the causal link | "…increasingly because local distribution grids are full" (BNetzA monitoring, already cited) | unsourced |
| 21 | Part 4 (transmission) voltageLosses prose | Circuit counts and losses described a different corridor size from the 2 GW default | Model at 2 GW: five 345 kV circuits ≈4.5% vs one 765 kV ≈2%, corridor almost 4× narrower | Prose matches the default | inconsistent |
| 22 | Part 1 (solar-pv) seasonal ratio | "Northern sites make five to ten times more in June than in December" | PVGIS-based monthly yields: Berlin 4.6×, London 3.4×, Hamburg 5.5×, Stockholm 11.5×, Oslo 13.6× | "roughly three to fourteen times … (Berlin about four and a half times)" | wrong |
| 23 | Part 1 learning rate | 26% (ITRPV) vs the main essay's 24% from its own fit, not reconciled | Fit to `pvModule` data 1975–2024 = 24% | Both stated and attributed | inconsistent |
| 24 | Part 1 recycling paragraph | "2,844 GW installed by 2025" vs index "1,900 GW in 2024" | 2,844 is a DC figure (IEA-PVPS); IRENA's AC figure for end-2024 is 1,867 GW (`DATA2.pvModule`) | Labelled "(DC)" | inconsistent |
| 25 | Parts 1, 2, 4: euro-native figures | Prose quotes €, but the figures opened in $ (captureHistory $101/$52 vs prose €89/€46; hybrid $82→$101 vs €73→€89; revenueModels $73 vs €65; interconnect $44/$46) | Readout dump before and after | `<html data-currency="EUR">` on these pages (as Part 5, fix 10). The $/€ toggle is unchanged. Revertible in one attribute each | inconsistent |
| 26 | Part 5 n17 | Currency note gave no rate | — | "Dollars converted at the ECB 2025 average (US$1.13/€), as elsewhere in this part." | inconsistent |
| 27 | Part 5 `lcohExplorer` | Grey-hydrogen comparator and break-even carbon price drifted when the rate changed | Readout €2.51 grey / €570/t | Prose already said "about €2.50" (kept); break-even now €570 | inconsistent |
| 28 | Part 5 futures €7 / €4.40 / €4.20 | Prose and readout rounding diverged (€4.27 → €4.30) | Readout €6.92 / €4.37 / €4.20 | Rounded consistently | nitpick |
| 29 | index §13 unlock readout "$0.57 to the kilo" | Followed from the 57 kWh/kg | 55 kWh × $10/MWh = $0.55 | Fixed with #9 | wrong |

(#29 is counted under "wrong" together with #9's fix; the table's wrong-count of 10 is #1, 3, 6, 8, 9, 11, 17, 18, 22, 29.)

## C. Former open items: closed in the second pass (18 October 2026)

The user chose to close all 11. Each was fixed as follows. Two new findings came up while doing it (N1, N2).

| # | Location | Issue | What was done | Severity | Status |
|---|---|---|---|---|---|
| O1 | Part 5: sankey (70%), litreBuilder (52.9 kWh/kg), whereFits (hard-coded Agora values) vs lcohExplorer (55 kWh/kg) | Three hydrogen bases on one page | One basis everywhere: `H2_KWH = 55`, `H2_ETA = 0.61` (US DOE new-system value, the same as the main essay), exported from `sf1.js` and used by sankey, litreBuilder, all cost figures and whereFits (whose values are now computed from the chain model). The IEA fleet average and DOE life-average values are still available as presets. Stack vs system is explained once in §2 (stack ≈51 kWh/kg; system ≈55 new, ≈57 over life). Prose re-quoted from the model: fuel cell 22, e-fuel car 11, "about six times", e-methane "a little under half a unit", e-kerosene 39 kWh; litre 26.9–31.7 kWh, "2.8–3.1 kWh per kWh, 34–37 MWh/t, 27–30 kWh/L"; hydrogen 1.65 kWh/kWh; air-captured CO₂ "falls in the lower half" of aireg's range; note n3 says Agora's 70% was replaced by 61% | inconsistent | closed |
| O2 | Part 5 capex €2,100/kW | $2,300 midpoint ÷ 1.13 = €2,035 | Prose rounded to match: "about €1,770–2,300 (midpoint about €2,035; the figures below round to €2,100)". Model default unchanged, so readouts don't move | nitpick | closed |
| O3 | index: wholesale-price (`spot`) and bill figures | € prose, $ default | `currencyToggle` takes a per-figure `value`; both figures open in € (Aug 2022 peak reads €464). The rest of the index stays in $ | inconsistent | closed |
| O4 | Part 4 conductor rating: sag figure 660 A vs 2,720 A / 4 = 680 A | Two ampacities for the same ACSR 265/35 | *Superseded in pass 3 (section E): the inputs below were unsourced; now VDE FNN coefficients, the model gives 671 A against the 680 A table value.* Pass 2: one value, 680 A; the heat balance used emissivity 0.6, absorptivity 0.5 and DC resistance (from memory of EN 50182). At 35 °C, 0.6 m/s and 900 W/m² it gives 681 A, matching the standard 680 A table rating. The ratings-week figure uses the same basis. Caption and n3 say "about 680 A" and "4 × 680 A = 2,720 A". Readouts now: sag default 1,020 A (+50%; the prose "half again" still holds); ratings week 23.8 GWh (16%) curtailed | nitpick | closed |
| O5 | Part 3 "150–400 tonnes" (prose + family figure) | DOE figure is in US short tons | "150–400 US short tons (about 135–365 tonnes)"; the figure tag reads 135–365 t | nitpick | closed |
| O6 | Part 2 "nearly three million homes" | 9.4 TWh ÷ 3.5 MWh = 2.7 million | "about 2.7 million homes (at 3,500 kWh a year each)" | nitpick | closed |
| O7 | index §4 losses figure (6.2% at the 1 GW, 300 km default) vs prose "a few percent" | Model and prose disagreed | Prose now quotes the model: "the figure's gigawatt crosses 300 km on one circuit losing about 6%; spread over the two circuits most such lines carry, about 3%" (P²R/V² halves with two circuits). *Pass 3: sourced and reworded (section E).* | nitpick | closed |
| O8 | Part 1 LONGi tandem 35.5% (July 2026) | Unverified | Hedged: "LONGi has announced a certified 35.5% … in 2026"; month dropped; n6 "as announced by LONGi in 2026 (the company reports ESTI certification)"; the cell-tech readout says "(announced by LONGi, 2026)" | unsourced | closed (hedged) |
| O9 | Part 4 SunZia "fully operational in June 2026"; Part 2 ENTSO-E panel "reporting in March 2026", n24 "20 March 2026" | Dates unverified | SunZia: "SunZia's developer announced in 2026 that the line had come online"; n22 date reduced to (2026). ENTSO-E: "in its final report"; the date was removed from n24 | unsourced | closed (hedged) |
| O10 | Part 5 HyScale 100 "given up in 2026" / figure "cancelled in August 2026 for lack of planning certainty"; index BNEF $108/kWh | Unverified detail | HyScale: "reported abandoned in 2026"; the figure label is "reported cancelled" and the month and reason were dropped. BNEF: "BloombergNEF's annual survey reported an average of $108/kWh per pack in 2025" | unsourced | closed (hedged) |
| O11 | index n7 | Commercial Solar Data Atlas cited for numbers computed from SMARD | n7: "computed from hourly Bundesnetzagentur / SMARD.de day-ahead prices and solar generation (DE-LU, 2023–2025), as in Part 1; they agree with the Solar Data Atlas series, used as a cross-check" | unsourced | closed |
| N1 | Part 5 projects figure footnotes | Rows pointed at n17/n18/n19 (product-cost note, SMARD, AEMO) after notes were renumbered; the intended notes are n22 (NEOM), n23 (Haru Oni), n24 (cancellations) | Fixed | wrong | closed |
| N2 | Part 5 projects summary readout ("4.2 Mt … at FID") | Cited n16 (IATA jet-fuel outlook) | Now cites n21 (IEA GHR 2025 executive summary, which states 4.2 Mt) | wrong | closed |

## E. Third pass (18 October 2026): sources for the conductor rating and the two-circuit claim

Pass 2 had set O4's heat-balance inputs (emissivity 0.6, DC resistance) from memory, and O7 relied on an unsourced generalisation. Both are now checked against documents that were fetched and read (copies in `/workspace/fa/src/`).

**Conductor rating (O4)**
- Lumpi-Berndorf, *Characteristics of conductors according to EN 50182*, issue 2 (Sept 2015), https://www.lumpi-berndorf.at/fileadmin/downloads/Overhead_line_conductors_EN50182.pdf. Its table "aluminium conductors steel reinforced used in Germany – Type AL1/ST1A" lists 264-AL1/34-ST1A (old code 265/35): 22.4 mm, 0.1095 Ω/km DC, current-carrying capacity **680 A**. NOTE 3: the guideline ratings assume "a wind velocity of 0,6 m/s, the effect of solar radiation for Germany, an initial ambient temperature of 35 °C and a conductor temperature of 80 °C". No emissivity or absorptivity is given. Orion Wire & Cable's EN 50182 datasheet (https://orionwirecable.com/wp-content/uploads/2025/05/ACSR-TDS-EN.pdf) lists the same 680 A and 0.1095 Ω/km.
- VDE FNN, *Hinweise zur Umsetzung des witterungsabhängigen Freileitungsbetriebs*, version 1.0 (Aug 2021), https://www.vde.com/resource/blob/2326494/b8df0df841617c90e10d31f83112a0ee/vde-fnn-hinweis-hinweise-zur-umsetzung-des-witterngsabhaengigen-freileitungsbetriebs-data.pdf:
  - §4.2.1–4.2.3: summer rating conditions in Germany are 35 °C, 0.6 m/s perpendicular to the conductor and 900 W/m².
  - §4.2.4: emissivity and absorptivity are often set equal; for a ten-year-old conductor, 0.84545.
  - §4.1.6, Table 1, for 243-AL1/39-ST1A at 80 °C: CIGRE TB 601 gives 634 / 749 / 968 / 930 A for 35 °C/0.6, 20 °C/0.6, 20 °C/2.0 and −10 °C/0.6 m/s. VDE FNN quotes DIN EN 50182's 640 A for this conductor (the Lumpi table lists 645 A).
- Fraunhofer IEE (2022), https://www.iee.fraunhofer.de/content/dam/iee/energiesystemtechnik/de/Dokumente/gf/enmet/2022_PB_Witterungsabh%C3%A4ngiger%20Freileitungsbetrieb_web.pdf, gives the same EN 50182 conditions (35 °C, 900 W/m², 0.6 m/s perpendicular).
- **Outcome.** Pass 2's emissivity 0.6 / absorptivity 0.5 and the DC-only resistance had no source, so they were replaced. The model now uses emissivity = absorptivity = 0.84545 (VDE FNN) and DC resistance +2% for AC (the 2% is our assumption). Checked against VDE FNN Table 1, it gives 640 / 755 / 976 / 936 A, within 1% of CIGRE TB 601. For 265/35 at the summer conditions it gives **671 A, 1.3% under the 680 A table value**. Caption, n3, n6 and n7 now say this and cite the sources. The 2,720 A circuit limit (4 × 680 A) is the tabulated value; Amprion's page confirms the four-conductor bundle at 380 kV. Readouts: sag default 1,024 A, "+53%" above static (prose "half again" still holds); ratings week 24.7 GWh (17%) curtailed. None of these numbers are quoted in prose.

**Two circuits (O7)**
- 50Hertz, *Freileitungen* (2020), https://www.50hertz.com/Portals/1/Dokumente/Medien/Projekt-%20und%20Themenpublikationen/50Hertz_Broschuere_Stromautobahnen_Freileitungen_2020_DE.pdf: "Im Höchstspannungsnetz von 50Hertz werden Freileitungen in der Regel mit jeweils zwei Stromkreisen gebaut" (in 50Hertz's extra-high-voltage grid, overhead lines are as a rule built with two circuits each).
- Amprion, "Freileitung", https://www.amprion.net/Netzausbau/Bestandteile-des-Stromnetzes/Freileitung/: "Ein Freileitungsmast trägt im Regelfall mehrere Stromkreise"; 380 kV normally uses a bundle of four conductors per phase.
- **Outcome.** The prose was narrowed to what the sources say: "spread over two circuits, as German grid operators usually build such lines, about 3%". It now has a footnote (index n3, quoting both sources and noting that the 3% assumes an even split).

| # | Location | Issue | What was done | Severity | Status |
|---|---|---|---|---|---|
| N3 | Part 4 n7 | Said "absorptivity and emissivity 0.5", while pass 2's model used emissivity 0.6 | n7 rewritten for the sourced coefficients | inconsistent | closed |

## D. Checked and correct (no change)

Ember world and regional shares (India coal 71%, Middle East gas 69%, Brazil hydro 52%; Germany ≈497 TWh, a quarter wind); world solar 2,807 TWh (8.8%), China 42%; wind 2,705 TWh, ×7.8 since 2010; German capture rates (solar 52%, onshore 87%, offshore 96% in 2025); the August 2022 €464/MWh monthly peak (Ember monthly 463.59); IRENA solar LCOE 2010 → 2024 ($408 → $43) and 1,867 GW AC; transformer PPI +88% vs CPI +31% (2008–19 +10%, 2020–23 +63%); EU Tier 2 1,000 kVA losses 693 W / 7,600 W and efficiency 99.54% @30% / 99.18% @100%; insulation ageing ×5, hot-spot 0.55 d and 3.11 d at 35 °C; AEP line losses 0.57% / 4.25% and 1,790 MVA; txdata miles and km (≈4,000 mi in 2013, 540 mi/yr 2020–24; 2,983 of 16,879 km in operation); India inter-regional 36 → 120 GW; SAPP 7.2%; DLR gains (DOE 2019); index §11 plant economics (solar $50/$84 at 4%/10%, nuclear capital $155 vs $111, gas 38%, shock 13% of hours / 53%); heat-pump COP 2.8 (DE) / 3.8 (UK); sun-path 3.35× tilted / 10× flat; tracker yield ratios; clipping 23 → 31%; Faraday 26.59 kWh/kg per volt (1.93 V → 51.3 kWh/kg); air-capture penalty 14–25%; Sankey 69/13/44/38/50; IEA GHR 2025 63% average, 58% China; Lazard v19 midpoints $69/68/90/215 and storage $210–292; LBNL 99% single-axis trackers; IEA 730 million without power (80% sub-Saharan Africa); CAISO 3.4 TWh curtailed, +29%, 93% solar; EIA energy spending 5.2% of GDP (2024); grid-frequency nadir (model 49.76 Hz vs prose 49.75); `network.js`'s `/1.08` is axis headroom, not a currency factor.
