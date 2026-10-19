# Follow-up posts — outlines

Possible deep dives that would follow on from "How the World's Electricity Works". These are outlines only, written to the same standard: real numbers where they exist, toy models labelled as toys.

## 1. Solar PV: from photon to grid
- **The photon budget.** Interactive: the solar spectrum against the silicon bandgap (1.12 eV). Light below the gap passes through; above it, the excess is lost as heat. This leads to the Shockley–Queisser limit (≈33%) and why record cells now sit around 27%.
- **Inside a cell.** Show the p–n junction, the depletion field, and the separation of electrons and holes, with a draggable I–V curve and its maximum power point. Explain why shade on one cell can drag down a whole string, and what bypass diodes do about it.
- **From PERC to TOPCon to heterojunction and tandems.** Cover each technology's efficiency, cost per watt and market share, and what perovskite–silicon tandems would change.
- **The factory learning curve.** Polysilicon, wafers, cells, modules: where the cost went, China's share of each step, and the 2023–24 price collapse to about $0.10/W.
- **Balance of system now dominates.** Break down a utility project's cost (modules, inverters, trackers, labour, interconnection, soft costs) and compare the US, Germany and India.
- **Geometry and the year.** Add tilt, trackers and latitude to the existing solar-day figure; explain capacity factors and why bifacial modules and single-axis trackers became the default.
- **Rooftop vs utility.** Compare cost per kWh and grid effects such as reverse flows, the duck curve and Germany's "Solarspitzen" rules, and explain why the same module costs about 3× more on a roof.
- **End of life.** Degradation (≈0.5%/yr), recycling, and the materials question for silver, indium and glass.

## 2. Utility-scale renewables: building and running the fleet
- **Project anatomy.** Development, permitting, interconnection queue, financing, EPC, commissioning. Typical timelines by country, and the queues themselves (the US had >2 TW waiting).
- **Wind physics at scale.** Rotor size vs rated power, specific power, wake losses in arrays (interactive wake-field toy), and the offshore vs onshore trade-offs.
- **Capacity factor is a design choice.** Show low-specific-power turbines, DC/AC overbuilding and clipping with an interactive inverter-loading-ratio slider.
- **Revenue models.** Feed-in tariffs → sliding premiums → two-sided CfDs → corporate PPAs → merchant. Who carries price, volume and shape risk, and what each costs in WACC.
- **Cannibalisation in practice.** Real capture rates for German and Spanish solar 2015–2025, negative-price hours, and curtailment and redispatch costs.
- **Hybrid plants.** Co-located batteries, shared grid connections, and when solar plus storage behaves like a peaker.
- **Grid-forming inverters.** How inverter-based resources provide inertia-like response, with links to the Iberian blackout of April 2025 and system-strength requirements.
- **Supply chains and materials.** Steel, copper, rare earths in direct-drive generators, blades, and the 2022–24 cost reversal in offshore wind (Ørsted's cancellations).

## 3. Transformers: the quiet bottleneck
- **How a transformer works.** Interactive: flux in the core, turns ratio, and magnetising current. Why it only works with AC, and why size scales with 1/frequency.
- **Losses.** Core losses (hysteresis and eddy currents, laminations, amorphous steel) vs copper losses; efficiency over 99.5% yet still TWh lost worldwide.
- **The cooling problem.** Oil, radiators, ONAN/ONAF ratings, hot-spot temperature and insulation ageing (the Arrhenius "6–8 °C halves the life" rule). Interactive: load profile → ageing.
- **The family.** Distribution pole-top units to 1,000 MVA generator step-ups, phase-shifting transformers for power-flow control, and HVDC converter transformers.
- **The shortage.** Lead times grew from about 12 months to 2–4 years for large units, with price rises; grain-oriented electrical steel supply, a handful of manufacturers, and utilities' spares strategies.
- **Failure and resilience.** Geomagnetic storms (1989 Québec), physical attacks, fire, and why one failed large unit can take months to replace.
- **Solid-state transformers.** What power electronics could replace, and why the old copper-and-iron box keeps winning on cost and robustness.

## 4. Transmission: the network that decides what gets built
- **Why high voltage.** Extend the losses figure with real conductor types (ACSR, HTLS), corona and right-of-way width per GW.
- **AC power-flow intuition.** Loop flows, phase angles and why you cannot "send" power down a chosen line, building on the four-node toy into a 30-bus explorer.
- **HVDC.** Converter stations vs line cost, the break-even distance (~600 km overhead, ~50–100 km subsea), and LCC vs VSC. Case studies: SuedLink, NordLink, China's UHVDC lines.
- **Planning and cost allocation.** Who pays and who benefits; US interregional planning (FERC Order 1920), the German Netzentwicklungsplan, and why lines take 10+ years to build.
- **Congestion economics.** Redispatch costs in Germany (€3–4bn/yr), nodal vs zonal debates (the UK REMA decision), and FTRs.
- **Getting more out of existing wires.** Dynamic line rating, reconductoring, topology optimisation and grid boosters (batteries as virtual lines).
- **Underground vs overhead.** Cost multiples, public acceptance, and the German decision to bury HVDC corridors.
- **Interconnection as a resource.** Interactive: connect two weather-uncorrelated regions and watch the firming need fall.

## 5. Synthetic fuels and what cheap $/kWh really unlocks
- **The conversion chain.** Electricity → H₂ (electrolysis, ~55 kWh/kg) → syngas/Fischer–Tropsch or methanol-to-jet → e-kerosene. Interactive Sankey with real efficiencies at each step.
- **Carbon sources.** Point-source vs biogenic vs direct air capture; DAC energy needs (~1.5–2.5 MWh/t CO₂) and why the carbon is often the expensive part.
- **Electrolysers.** Alkaline vs PEM vs solid oxide, capex trends (and their 2024–25 reversal), stack degradation, and the utilisation vs cheap-hours trade-off. Interactive: run only below €X/MWh → capacity factor → €/kg.
- **What €/MWh does to each product.** Extend the "unlock" figure into full cost stacks (capex, O&M, power, CO₂) for H₂, e-methanol, e-kerosene and ammonia, with break-even prices against fossil plus carbon price.
- **Demand that only exists at low prices.** Aluminium smelter siting history (Iceland, Norway, Gulf states), green steel in Sweden (Stegra, formerly H2 Green Steel), data-centre siting, and desalination in the Gulf.
- **Policy pull.** ReFuelEU Aviation mandates (1.2% synthetic by 2030), H2Global auctions, the US 45V credit and its hourly-matching rules.
- **The honest limits.** Round-trip losses, water, scale-up timelines, and where direct electrification beats molecules (the "hydrogen ladder").
- **Futures.** Scenarios at $10, $20 and $40/MWh firmed power: which industries relocate, and what that means for Germany vs Spain, Texas or the Middle East.
