# Critique of the five deep-dive posts (read 13 Oct 2026; nothing in the posts was changed)

I read the text of all five posts, plus the desktop screenshots in screenshots/<slug>/d-*.png.

| Post | Words | Figures | Paragraphs | Paragraphs over 120 words | Em dashes in body |
|---|---|---|---|---|---|
| Solar PV | 6,475 | 14 | 48 | 8 | 47 |
| Utility renewables | 6,176 | 12 | 44 | 9 | 50 |
| Transformers | 4,947 | 9 | 41 | 7 | 35 |
| Transmission | 6,335 | 12 | 50 | 9 | 4 |
| Synthetic fuels | 5,299 | 11 | 37 | 0 | 0 |

## What works
- **Strong openings.** Each post opens on a concrete, surprising number: 706 GW of modules a year; 2,290 GW waiting in the US queue against 1,320 GW in operation; transformers taking three years to arrive; €3 bn a year spent working around lines that haven't been built; "some jobs cannot be done with a cable".
- **Honest labels.** The Real data, Model and Real + model tags are used consistently, and the sources are specific (PVGIS, ITRPV, SMARD, IRENA, LBNL, NREL).
- **Real data that keeps the mechanisms grounded.** Examples are the solar capture-rate history, the PVGIS clipping year, the Contracts for Difference (CfD) auction history and the world solar-by-region chart.
- **A clear arc.** Solar PV runs from physics to factory, then to geography, then to market. Synthetic fuels is the tightest post: short paragraphs and a clear question in each section.

## Writing problems
1. **Paragraph sprawl.** 33 paragraphs run over 140 words. The longest are solar §10 clipping (194), transmission sag/weather (183), utility hybrid plants (181), solar yield (177) and transformers hot-spot (178). Each mixes the "what to try" instructions with two or three extra facts.
2. **Em-dash habit** in Solar PV, Utility renewables and Transformers (35–50 each). Transmission and Synthetic fuels show the cleaner style the other three should match.
3. **Germany-centric framing**, which clashes with the now-worldwide main essay. Transmission mentions Germany 28 times; its §5 is "Germany's north–south problem", and its bill section uses a German household. Utility renewables mentions Germany 19 times.
4. **Stale cross-references.**
   - Solar §10 says grid-forming is "explored in Part 2". It is, but the main essay's frequency section is the better link.
   - Solar refers to "the main essay's capture-price figure" and its "dark-week section"; section names have changed since.
   - Solar says the inverter holds "frequency at 50 Hz", which reads as Europe-only.
   - All of these need checking against the new section titles.
5. **Footnotes out of reading order** in Solar PV: the first citation is note 8, and the solar-by-region paragraph has "1718" run together. The notes should be renumbered with scripts/renumber-notes.py, as in the main essay.
6. **Repeated boilerplate.** The "As in the other parts, figures marked Real data…" paragraph appears five times. A legend chip next to the first figure would do the same job.

## Figure problems (from the desktop screenshots)
1. **Captions longer than the figure's message.** Many captions are 60–100 words, sometimes followed by a long readout paragraph, so each figure ends in a grey block of text. Examples: yieldMap (97 words), costStack, the synthetic-fuels price-duration figure (146), transmission congestion costs.
2. **Too many controls before the aha.** Examples:
   - Synthetic fuels' conversion chain has 10 preset buttons plus sliders.
   - Utility renewables' CfD figure has 6 contract buttons.
   - Transmission's HVDC figure shows project buttons and cost sliders together.
   
   These need the main essay's `more()` pattern: one primary control, the rest folded away.
3. **Thin multi-panel layouts.**
   - Transformers' three-phase figure (phasor, star/delta, wave) is crowded with very small labels.
   - Solar's sun-path and clipping figures put two small charts side by side, and the right panel's labels are near the floor size.
   - Utility renewables' hybrid-plant figure stacks two dense hourly strips.
4. **Empty space.** Examples: the transformers core-saturation diagram (a large square with little in it), the solar cell-tech schematic (wide grey blocks), and the transmission line-sag drawing (mostly white).
5. **Inconsistent defaults.**
   - Some figures open on an extreme state, such as the transformers 130% evening peak case that the text describes.
   - Others open on a neutral state where nothing interesting is visible, such as the transmission power-angle figure at a low angle.
   
   Each figure should open on the moment the paragraph is talking about.
6. **Phone.** These posts were not part of the 390 px redesign pass. Several readouts are taller than their charts, and the multi-button rows wrap to 3–4 lines.

## Top fixes (priority order)
1. Split every paragraph over 140 words. Move the "try this" sentence directly above its figure and cut the side facts. Target is roughly −15% words per post.
2. Cut captions to 40 words or fewer (source plus what is drawn). Move the instructions into a one-line hint and the extra data into notes.
3. Collapse secondary controls under **More** in the six busiest figures: conversion chain, CfD, HVDC, hybrid plant, sun path, three-phase.
4. Reframe Transmission (and partly Utility renewables) globally. Put Germany's north–south problem beside China's UHV tier, Texas CREZ and Brazil's Belo Monte lines, and give the bill section a two-country comparison.
5. Renumber notes in reading order, fix the cross-references to the renamed main-essay sections, and remove the repeated "Real data/Model" boilerplate and the extra em dashes.
