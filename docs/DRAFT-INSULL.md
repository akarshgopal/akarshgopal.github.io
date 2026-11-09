# Draft: an Insull vignette for essay 1 (for the author to judge, 9 Nov 2026)

**Status: draft, not on any page.** Nothing here is deployed.

**Where it goes:** essay 1 (`cheaper.html`), §5 "An engine and the costs around it". It would sit right after the
paragraph ending "…they have climbed back (essay 9)", as a `<div class="deepdive" role="note">` box, like the
boxes in essays 4, 6 and 7.

**Why:** §5 says growth "spread everything else over more kilowatt-hours". That is the series' second mechanism,
and today it is stated without a face. Insull's own numbers show it at the scale of a single city block, from
someone who ran a business on it.

**Length:** about 260 words, plus two notes.

---

## Proposed text

> **How a block of flats paid for the plant.** In February 1910 Samuel Insull, who ran Chicago's Commonwealth
> Edison, showed New England utility managers one block of flats on the city's North Side. It had 193 apartments
> and 189 customers, each with ten or eleven lamps, and together they used 33,000 kilowatt-hours a year.
>
> Added up, the customers' own peaks came to 68.5 kilowatts. Plant built for that would be busy 5.5 per cent of
> the time, and at that rate, he said, "it is only a question of time when you will be in the hands of a
> receiver." But the customers did not all switch on at once. The transformers feeding the block peaked at only 20
> kilowatts, so the same kilowatt-hours kept it busy 19 per cent of the time.
>
> That ratio, the **load factor**, was Insull's business. By his reckoning a utility needed five to seven dollars of
> capital for each dollar of yearly revenue, so idle plant was the largest cost he had. He went after customers
> whose peaks came at other hours:
> - In 1909 one tramway company, Chicago Railways, took up to 15,820 kilowatts at a 42.6 per cent load factor, for an average
>   of 0.9¢ a kilowatt-hour.
> - Buildings and factories with their own generators were the other prize. In January 1912 their combined peak
>   in Chicago was almost twice his company's light-and-power load.
>
> To price all this he used the demand system of Arthur Wright of Brighton. It charged each customer's first hours
> of use at their own peak at a high rate, and everything beyond at a low one. Wright, he said, "first taught us
> how to sell electricity."
>
> Between 1896 and 1909 the company's sales grew fortyfold. Its income per kilowatt-hour fell to a quarter, and by
> 1914 it averaged about 2¢ in the money of the day. Growth did not just happen to spread the fixed costs: it was
> sold.<sup>n</sup>

## Notes to add (numbers to be set by `scripts/renumber-post.py`)

1. S. Insull, *Central-Station Electric Service: Its Commercial Development and Economic Significance as Set Forth
   in the Public Addresses (1897–1914) of Samuel Insull*, ed. W. E. Keily (Chicago: privately printed, 1915),
   [archive.org](https://archive.org/details/centralstationel00insuiala):
   - address in Boston, 25 February 1910, pp. 127–130 (the block of flats; capital turnover);
   - address at Briarcliff, N.Y., 1 September 1909, p. 81 (Chicago Railways Company);
   - report of an address of 20 October 1909, p. 99 (sales ×40, income per unit to 25 per cent);
   - editor's note, p. 31 (2.05¢ in 1914);
   - dinner of 28 September 1911, p. 217 (Wright).

   The 1912 loads are from Insull, *Transactions of the AIEE* 31 (1912), pp. 241–242, as reported in
   G. P. Watkins, *Electrical Rates* (1921), p. 169: isolated plants 194,300 kW, light-and-power stations
   100,540 kW, street railways 186,920 kW.
2. On the Wright demand system and why it spread, J. L. Neufeld, "Price Discrimination and the Adoption of the
   Electricity Demand Charge", *Journal of Economic History* 47 (1987), 693–709. Neufeld argues that the demand
   charge also let utilities undercut isolated plants for big users, while charging small users more.

## Checks done

| Claim | Source | Check |
|---|---|---|
| Load factor of 5.5 per cent | Insull | 33,000 ÷ (68.5 × 8,760) = 5.50 per cent |
| Load factor of 19 per cent | Insull | 33,000 ÷ (20 × 8,760) = 18.8 per cent; Insull rounds it to 19 |
| Five to seven dollars of capital per dollar of revenue | Insull | $50,000 of income needs $250,000 (best case) to $350,000 (average) |
| Isolated plants almost twice light-and-power | Watkins (1921), citing Insull (1912) | 194,300 ÷ 100,540 = 1.93 |
| Prices are nominal | — | The text says "in the money of the day". No conversion to today's dollars, because the series has no CPI series before 1913 |

## Not used, because I could not verify it

- The often-repeated story that Insull saw Wright's meters on a visit to Brighton in 1894. His own words only
  credit "the work which he did in Brighton".
- A "Franklin Institute 1913" figure (fuel costs down 70 per cent, load factor doubled to 29 per cent). It
  appears only in a local-history summary.

## Decisions for the author

- Keep, cut, or shorten. A shorter version could keep only the first paragraph and the last sentence.
- Box or prose. As prose it adds about 260 words to an essay you may want shorter; as a box, readers can skip
  it.
- Title. "How a block of flats paid for the plant" is a working title.
