# Handoff: extract 1960–68 US utility accounts from the FPC volumes

**Status (31 Oct 2026): done.** The 1951–68 data are in `scripts/data/fpc_privately_owned_1960_1968.csv` and in essay 9 (see `HANDOVER.md` §1).

Paste everything below the line into a Claude conversation (API or claude.ai) **together with the PDF(s)**. The answer
is a single CSV of a few KB. Save it as `scripts/data/fpc_privately_owned_1960_1968.csv` on the `electricity-source`
branch. `scripts/make_us_bill_data.py` picks it up automatically if it exists. Do not commit the PDFs.

Where the PDFs are (download them in a browser; automated download is blocked by CAPTCHA / Cloudflare):
- Google Books, full view: <https://books.google.com/books?id=Ar6IVVeFyEYC> (dated 1972),
  <https://books.google.com/books?id=4Rpp6hwgar8C> (1974), <https://books.google.com/books?id=ZfdFzhzMwm4C> (1976).
  Check which data year each volume covers (the publication date is usually a year or two after the data year).
- HathiTrust: <https://catalog.hathitrust.org/Search/Home?lookfor=%22statistics%20of%20privately%20owned%20electric%20utilities%22&type=title>
  ("Download → Whole volume PDF"). Before 1966 the series title was *Statistics of Electric Utilities in the United
  States … Classes A and B Privately Owned Companies*.
- Best case: one edition for data year 1968, 1969 or 1970, whose ten-year tables cover 1959/60/61 onward, plus
  ideally one for 1964–66 to reach 1960. One edition with a 1963–72 table still helps (1963–68).

After the CSV is in place: run `python3 -P scripts/make_us_bill_data.py <PUDL data dir>` (see `HANDOVER.md` §1 for
the inputs), check the printed seam lines, then update the prose in `src/pages/futures.html`
(`#where-the-savings-went`: it currently starts "In 1969, in today's money, it cost 19.3 cents"), the caption and
note 4 (add the new source), and `HANDOVER.md`. Build, audit, deploy as in `HANDOVER.md` §3.

---

You are extracting historical accounting data from scanned US government reports (attached PDFs): the Federal Power
Commission's annual *Statistics of Privately Owned Electric Utilities in the United States, Classes A and B
Companies* (earlier title: *Statistics of Electric Utilities in the United States, Classes A and B Privately Owned
Companies*). Each edition has ten-year summary tables near the front, after the text: an income account
("Income and Retained Earnings" / "Income Account"), "Electric Operation and Maintenance Expenses", and "Electric
Utility Plant". Use the **electric department** figures only (not gas, not "all utility").

**Goal:** a CSV of the items below for every year from **1960 to 1968** that the attached volumes cover (fewer years
is fine; say which are missing). Thousand nominal dollars, as printed. Never estimate, interpolate or fill a value
from memory: if a number is illegible or not in the tables, leave the cell empty and say so.

**Output format** (exactly this shape; header comments first; years as columns, newest first):

```
# FPC, Statistics of Privately Owned Electric Utilities in the United States, <edition year(s)>: Classes A and B
# Companies, Table <n> (income, electric), Table <n> (electric O&M expenses), Table <n> (electric utility plant in
# service); <first>-<last> data years, thousand nominal dollars. Source: <Google Books / HathiTrust URL of each volume>
# <one line per caveat: illegible cells, definitional changes, which edition each year came from, revisions>
item,1968,1967,...,1960
operating_revenues,...
...
```

**Items** (the names must match; these are the FPC's own Uniform System of Accounts lines):

| item | what it is in the tables |
|---|---|
| operating_revenues | Electric operating revenues |
| depreciation | Depreciation expense (electric) |
| amortization | Amortization (all electric amortization lines, summed; 0 if none) |
| taxes_other_than_income | Taxes other than income taxes |
| federal_income_taxes | Income taxes – Federal |
| other_income_taxes | Income taxes – other (state etc.) |
| deferred_income_taxes | Provision for deferred income taxes |
| deferred_income_taxes_credit | Provision for deferred income taxes – credit (a positive number that is subtracted) |
| investment_tax_credit_adj | Investment tax credit adjustments – net (0 before they existed) |
| net_operating_income | Net electric operating income |
| fuel_steam | Fuel, steam power generation |
| fuel_nuclear | Fuel, nuclear power generation (0 if none) |
| fuel_other | Fuel, other power generation (internal combustion etc.) |
| purchased_power | Purchased power |
| power_production_total | Total power production expenses |
| transmission_total | Total transmission expenses |
| distribution_total | Total distribution expenses |
| customer_accounts_total | Total customer accounts expenses |
| customer_service_total | Total customer service and informational expenses (did not exist before 1976: use 0) |
| sales_total | Total sales expenses |
| admin_general_total | Total administrative and general expenses |
| om_total | Total electric operation and maintenance expenses |
| plant_intangible | Total intangible plant (in service, Dec 31) |
| plant_production | Total production plant |
| plant_transmission | Total transmission plant |
| plant_distribution | Total distribution plant |
| plant_general | Total general plant |

If a table groups lines differently (e.g. "taxes" in one line, or customer accounts and sales combined), give what
is printed, put the combined value under the closest item, set the others to empty, and explain in a comment line.

**Method.** Read the numbers from the page images, not from any OCR text layer (OCR in these scans misreads digits:
8/6/3, 1/7, dropped digits). For every year, check before you answer, and report the residual of each check:
1. `power_production_total + transmission_total + distribution_total + customer_accounts_total +
   customer_service_total + sales_total + admin_general_total = om_total`
2. Within power production: the steam, nuclear, hydraulic, other-production and other-power-supply subtotals sum to
   `power_production_total` (subtotals are not in the output, but use them to catch misreads).
3. Income: `operating_revenues − total electric operating expenses = net_operating_income`, and the expense lines
   (operation, maintenance, depreciation, amortization, the tax lines with the credit subtracted, ITC, gains/losses
   on disposition) sum to the printed total electric operating expenses.
4. Plant: the five plant items (plus any small "purchased and sold"/"experimental" lines) sum to total electric plant
   in service.
Residuals within ±2 (rounding) are fine; anything larger means a misread: re-read that cell at higher zoom and fix it.
If two editions give different values for the same year (revisions), use the later edition and note it.

**Overlap check against data already in hand.** If a volume's table includes any of 1969–72, compare those columns
with these values from the 1978 edition (thousand dollars) and report the differences:

```
item,1972,1971,1970,1969
operating_revenues,25354868,22321874,19791066,18026095
net_operating_income,5639666,4968987,4481292,4126723
fuel_steam,5074948,4366274,3566737,2908977
purchased_power,1603697,1426106,1234409,1128338
power_production_total,8738207,7464560,6144442,5113855
transmission_total,370135,322702,291043,263143
distribution_total,1431608,1319144,1253156,1139013
admin_general_total,1490514,1304598,1163021,1034299
om_total,12909039,11257876,9659617,8304357
plant_production,40659966,36084426,33034987,30317408
plant_transmission,18802059,17225743,15444355,13937380
plant_distribution,38243823,33649884,31329117,29154921
```

**Answer with:** (1) the CSV in one code block, (2) a short table of the check residuals per year, (3) the overlap
differences, (4) a list of anything uncertain, with page numbers.
