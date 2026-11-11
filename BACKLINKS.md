# Electricity ↔ AI back-links (proposal only)

Approved by Akarsh. **Not applied**: /workspace/electricity-explainer is untouched. Code Monkey applies these; the anchors on the electricity side were checked against the committed dist (`git archive HEAD dist`) on 23 Oct 2026. The AI-side targets are on this repo's live pages. Relative paths assume /blog/ai/ beside /blog/electricity/.

Note the move: the old AI index (the short tour) is now **essay.html**, so every earlier plan that pointed to `../ai/index.html#sNN` must point to `../ai/essay.html#sNN`. `index.html` is now the verdict page. Renames: `ai-factory.html` → **factory.html** (redirect keeps the old URL), `the-switch.html` → **flip.html**.

## A. From the electricity series to the AI series

| # | Electricity page and anchor (verified) | Link text / idea | Target (AI series) | Status |
|---|---|---|---|---|
| 1 | index.html `#s14` "Why the price of electricity moves everything else" | "Who will be buying the next hundred gigawatts? The AI series tests whether it can outgrow the grid." | `../ai/index.html#verdict` | new |
| 2 | index.html `#s15` "Futures" | Same sentence, or point to Act 2 | `../ai/index.html#act2` | new (was `../ai/index.html#s14`) |
| 3 | index.html `#fig-gridDay` (the model day) | "What a flat 24-hour load, like a training cluster, does to this day" | `../ai/factory.html#flat` | was `../ai/ai-factory.html` |
| 4 | transformers.html `#shortage` | "Data-centre campuses queue for the same transformers" | `../ai/factory.html#grid` | was `../ai/ai-factory.html` |
| 5 | transmission.html `#planning` | "Where the AI load wants to go, and the interconnection queue it joins" | `../ai/factory.html#grid` | was `../ai/ai-factory.html` |
| 6 | synthetic-fuels.html `#fig-cheapHours` and `#cheap-demand` | "Cheap hours are also what a data centre wants to buy. How much could AI take?" | `../ai/index.html#verdict` (Act 1) and `../ai/factory.html#swing` | new |
| 7 | solar-pv.html `#junction` | "The same p–n junction, run backwards, is a transistor" | `../ai/flip.html#mosfet` | was `../ai/the-switch.html#mosfet` |
| 8 | solar-pv.html `#costs` and utility-renewables.html `#revenue-models` | Yardstick: the cost of an additional gigawatt, in sun and wind | `../ai/yardstick.html` | **live** |

## B. From the AI series to the electricity series (these are in this repo; listed so both sides stay in step)

| AI page and anchor | Electricity target | Status |
|---|---|---|
| factory.html (several places; `ai-factory.html` redirects here) | `../electricity/transformers.html#shortage`, `../electricity/transmission.html#planning`, `../electricity/synthetic-fuels.html#fig-cheapHours`, `../electricity/utility-renewables.html#fig-queueFunnel`, `../electricity/index.html#fig-frequency` | **present** |
| essay.html | `../electricity/index.html#s7`, `#s11`, `#fig-frequency`, `../electricity/transformers.html#shortage`, `../electricity/transmission.html#planning` | present |
| index.html | `../electricity/synthetic-fuels.html#cheap-demand` | **present** |
| yardstick.html | `../electricity/solar-pv.html#costs`, `../electricity/utility-renewables.html#revenue-models`, `../electricity/index.html#s14` | **present** · page live |
| flip.html (`the-switch.html` redirects here) | (inbound from electricity `#junction` → `#mosfet`) | redirect live |

Run `ELECTRICITY_DIST=<path to the electricity dist> node scripts/linkcheck.mjs` after any of these change.
