# The reframed thesis: review of 263e562 and what is still open

1 November 2026. Commit 263e562 ("Growth as the second engine") already reframed the series around two engines,
better machines and growing use, with a new figure (`salesPrice`) and rewritten passages in essays 1, 3, 4 and 9.
This note was drafted in parallel, checked against that commit, and cut down to what it adds. Nothing in the essays
is changed by it; each item below is for the author to accept, edit or drop.

Checked: the build, link check (only the 10 known `../ai/` links) and layout audit (futures, cheaper, the-machine,
transmission at 1280 and 390 px) are clean; `make_us_bill_data.py` reproduces `usbilldata.js` exactly; the commit's
numbers agree with an independent calculation (sales ×4.4 and real wires spending ×2.5 over 1951–69).

## The numbers by era

| Average change per year, real | 1951–69 | 1969–2000 | 2000–25 |
|---|---|---|---|
| US retail electricity sales (EIA, all utilities) | +8.1% | +3.0% | +0.7% |
| Household price per kWh | −3.6% | −0.7% | +0.4% |
| … fuel and bought power | −3.5% | +1.6% | −1.5% |
| … running and paying for plants | −3.1% | −0.6% | −0.9% |
| … wires | −3.3% | −3.1% | +4.5% |
| … customer service, overheads | −4.1% | −0.6% | +1.4% |
| … taxes | −4.0% | −3.3% | +0.4% |
| Investor-owned utilities' real spending on wires | +5.3% | +0.6% | +3.8% |

263e562 states the first and last columns well, and its timing is more careful than a simple "both engines stopped
in 1970": the price stopped falling around 1970 while sales were still growing fast; growth slowed after 1973.

## Not yet in the text (proposals)

1. **Why the wires kept getting cheaper after 1970.** Essay 1 now says the wires got cheaper per kWh "until about
   2000" but not why. The accounts say: the network built in the boom was being paid off while little new was added.
   The capital charge for wires in a household kWh fell from 3.5¢ (1969) to 1.1¢ (2000) and running costs from 1.5¢
   to 0.8¢, while real spending on wires grew only 0.6 per cent a year. Since 2000 both have risen (capital to 3.7¢,
   running costs to 1.9¢). Suggested sentence for essay 9, after "…above their 1969 level":
   > Between 1970 and 2000 the wires kept getting cheaper for a different reason: the network built in the boom was
   > being paid off, and little was added to it.
2. **Spending now versus the 1950s.** A sharper version of the commit's "real spending on the wires has nearly
   doubled": utilities are again spending on wires almost as fast as in the 1950s (3.8 per cent a year more in real
   terms since 2000, against 5.3 in 1951–69), but then sales grew 8 per cent a year and now under 1. Fits the
   paragraph after `billSplit` ("Cheaper energy was spent on the network…").
3. **1983–2000 as a second fall.** The real price fell 2.4 per cent a year, two-thirds of the 1950s pace, as fuel got
   cheaper, the 1970s plants were paid down and taxes fell: a dividend of not building rather than a new engine.
   Worth a clause in essay 9 because it complicates the title's "stopped getting cheaper": it stopped twice.
4. **The conclusion could say growth may restart.** "Back to the curve" names the new engine (solar factories) but not
   the other one. Proposed addition to its second paragraph:
   > The other engine, growth, may be restarting too: heat pumps, electric cars and data centres are adding demand for
   > the first time in a generation. If that demand fills the grid at the hours it now stands idle, it will do what
   > the 1950s did and spread the wires over more kilowatt-hours; if it needs new wires and plants for its own peaks,
   > it will not.
   The "What would have to be true" item on network costs already says this in one line; it could move up the list.
5. **A one-line thesis for the top of essay 1 and the landing page** (quality-plan item (a)):
   > Electricity got cheaper while the industry grew. When growth stopped, so did the cheapening; and the wires,
   > which only growth ever made cheap, are now the fastest-rising part of an American bill.

## Provocations (keep, soften or drop)

- **"The engine was demand."** Three-fifths of the fall in a household kWh between 1951 and 1969 (10.9¢ of 17.7¢) was
  wires, offices and taxes, which no turbine touches. *Risk:* growth also paid for the bigger units; the accounts
  show where the savings landed, not what caused them.
- **"Solar can't fix the bill. Demand can."** Making the power is about two-fifths of a 2025 household kWh (7.4¢ of
  17.2¢); wires and overheads about half (8.3¢). *Risk:* cuts against the common view that data centres raise
  everyone's bills, which the AI series takes as its premise; the text would have to say when each is true.
- **"America's problem is utilisation; Germany's is taxes."** *Risk:* the German series starts only in 2015.

## On the `salesPrice` figure

Clear up to 2000. After that the points pile into a knot at about 11× (sales flat), with the 2000, 2007 and 2025
labels on top of it and the wires line zigzagging. The knot is the message, but it reads as noise at 390 px. Options:
label only 2025 inside the knot and put 2000 and 2007 in the readout; or thin the post-2000 points to every fifth
year; or add a small inset of 2000–2025 on linear axes.

## How the numbers were made

- Per-kWh rates: compound annual change of each layer of `src/lib/usbilldata.js` between the end years.
- Sales: EIA, *Annual Energy Review 2011*, Table 8.9, total retail sales (291 TWh in 1950, 1,392 in 1970, 3,421 in
  2000; 1950–70 used for 1951–69); 2025 from EIA-861 via PUDL (bundled plus energy-only, 4,075 TWh). The figure uses
  the commit's own index for the investor-owned utilities, which agrees.
- Wires spending and its parts: investor-owned utilities' transmission and distribution O&M plus their share of
  capital (depreciation plus return, split as in `billSplit`), deflated with CPI-U: $16bn (1951), $41bn (1969),
  $50bn (2000), $126bn (2025). Before 1994 the capital split uses plant in service, so these are estimates.
