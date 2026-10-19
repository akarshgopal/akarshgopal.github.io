// The series: one main explainer plus five deep dives. Order = reading order (prev/next).
// `sections` of unpublished posts are the planned, stable anchor ids; keep them when the post is written.
export const SERIES_TITLE = 'How Electricity Works';
export const PAGES = [
  { file: 'index.html', short: 'The main essay', title: 'How the World’s Electricity Works', status: 'live' },
  { file: 'solar-pv.html', short: 'Solar PV', title: 'Solar PV: From Photon to Grid', status: 'live' },
  {
    file: 'utility-renewables.html', short: 'Utility-scale renewables', title: 'Utility-Scale Renewables: Building and Running the Fleet', status: 'live',
    lede: 'How wind and solar farms are developed, financed, connected and operated, and why the revenue model matters as much as the technology.',
    sections: [
      ['project-anatomy', 'Project anatomy: from site to commissioning, and the interconnection queue'],
      ['wind-physics', 'Wind physics at scale: rotor size, specific power and wakes'],
      ['capacity-factor-design', 'Capacity factor is a design choice: overbuilding, trackers and clipping'],
      ['revenue-models', 'Feed-in tariffs, CfDs, PPAs and merchant risk'],
      ['cannibalisation', 'Cannibalisation in practice: capture rates and curtailment'],
      ['hybrid-plants', 'Hybrid plants and co-located batteries'],
      ['grid-forming', 'Grid-forming inverters and system strength'],
      ['supply-chains', 'Supply chains, materials and the offshore-wind cost reversal'],
    ],
  },
  {
    file: 'transformers.html', short: 'Transformers', title: 'Transformers: The Quiet Bottleneck', status: 'live',
    lede: 'The copper-and-iron machines that make high-voltage AC possible, why they take years to build, and what happens when one fails.',
    sections: [
      ['how-it-works', 'How a transformer works: flux, turns ratio and why it needs AC'],
      ['losses', 'Core and copper losses'],
      ['cooling', 'Heat, insulation ageing and ratings'],
      ['family', 'The family: distribution units, step-ups, phase shifters and HVDC converter transformers'],
      ['shortage', 'The shortage: lead times, electrical steel and spares'],
      ['resilience', 'Failure and resilience: storms, attacks and replacement times'],
      ['solid-state', 'Solid-state transformers'],
    ],
  },
  {
    file: 'transmission.html', short: 'Transmission', title: 'Transmission: The Network That Decides What Gets Built', status: 'live',
    lede: 'Why high voltage, how power actually flows through a meshed network, what HVDC changes, and who pays for new lines.',
    sections: [
      ['why-high-voltage', 'Why high voltage: conductors, corona and corridors'],
      ['power-flow', 'AC power flow: loop flows and phase angles'],
      ['hvdc', 'HVDC: converters, break-even distance and case studies'],
      ['planning', 'Planning and cost allocation'],
      ['congestion', 'Congestion economics: redispatch, nodal and zonal prices'],
      ['more-from-wires', 'Getting more out of existing wires'],
      ['underground', 'Underground versus overhead'],
      ['interconnection', 'Interconnection as a resource'],
    ],
  },
  {
    file: 'synthetic-fuels.html', short: 'Synthetic fuels', title: 'Synthetic Fuels and the Price of a Kilowatt-Hour', status: 'live',
    lede: 'What it takes to turn electricity into hydrogen, methanol and jet fuel, and how completely the answer depends on the price of power.',
    sections: [
      ['conversion-chain', 'The conversion chain: electrons to molecules'],
      ['carbon-sources', 'Where the carbon comes from'],
      ['electrolysers', 'Electrolysers: capex, utilisation and cheap hours'],
      ['what-mwh-does', 'What €/MWh does to each product'],
      ['cheap-demand', 'Demand that only exists at low prices'],
      ['projects', 'Projects, delays and cancellations'],
      ['policy', 'Mandates, auctions and credits'],
      ['limits', 'The honest limits'],
      ['futures', 'Futures at $10, $20 and $40 per MWh'],
    ],
  },
];
