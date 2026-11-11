// Cross-page constants. Every figure and readout reads these, so numbers cannot drift apart between pages.
// Sources are in the notes of the page that first uses each one.
export const K = {
  usdPerEur: 1,                 // same rate as the electricity series (ECB 2025 average, rounded)
  h100: { tdpW: 700, bf16: 989.4e12, name: 'H100 SXM' },   // Epoch ML Hardware (CC BY); NVIDIA datasheet
  dgxH100: { maxW: 10200, gpus: 8 },                       // NVIDIA DGX H100 datasheet: ~10.2 kW max, 8 GPUs
  pue: { best: 1.09, avg: 1.56 },                          // Google fleet 2024 (2025 Environmental Report); Uptime Institute 2024 survey average
  mfu: { lo: 0.38, hi: 0.43 },                             // Llama 3 405B pre-training, BF16 MFU (Dubey et al. 2024, Table 4)
  eniac: { addPerS: 5000, W: 150e3, tubes: 17468 },        // U. Michigan / US Army museum
  dcTWh2024: 415, dcTWh2030: 945,                          // IEA Energy and AI (2025), Base Case
  usDcTWh: { 2014: 58, 2018: 76, 2023: 176, lo2028: 325, hi2028: 580 }, // LBNL 2024 report
  irelandDc: { twh2024: 6.969, share2024: 0.22, share2015: 0.05 },    // CSO Ireland, 10 June 2025
  colossus: { gpus: 100000, MW: 150 },                     // xAI Colossus, online Sept 2024; 150 MW per MLGW/TVA
  // Ember, Yearly Electricity Data (CC BY 4.0), downloaded 19 Oct 2026: electricity demand, TWh
  ember: { world2025: 31734, world2024: 30913, us2024: 4405, china2024: 10070, europe2024: 5094, japan2024: 1016, ireland2024: 36.1 },
  // IEA, Energy and AI (2025), CC BY 4.0: data-centre electricity by region, TWh. 2024 shares (US 45%, China 25%, Europe 15%) and
  // 2030 Base Case increases (US +240, China +175, Europe +45, Japan +15, up 130/170/70/80%); Japan 2024 = 15 / 0.8.
  ieaRegions: { us: [0.45 * 415, 0.45 * 415 + 240], china: [0.25 * 415, 0.25 * 415 + 175], europe: [0.15 * 415, 0.15 * 415 + 45], japan: [15 / 0.8, 15 / 0.8 + 15] },
  iea2035: { base: 1200, liftOff: 1700, highEff: 970, headwinds: 700 },
  gb200RackKW: 120,                                       // NVIDIA DGX GB200 user guide: rack power approximately 120 kW
  h100DieMM2: 814,                                        // Epoch AI ML Hardware data
  dgxH100USD: 269000,                                     // analyst report via Epoch AI (May 2023); no official list price
  chipLifeYears: 4,                                       // our assumption
  llama3GPUs: 16384,                                      // Llama 3 paper: up to 16K H100s at 700 W TDP
  nerc2024MW: 1500,                                        // NERC incident review, 10 July 2024
};
// GPU-hours per MWh, computed (not quoted): a DGX H100 at its 10.2 kW maximum is 1.275 kW per GPU of IT power;
// the facility adds PUE on top. Networking switches and storage outside the server are not included.
export function gpuHoursPerMWh(pue, loadFrac = 1) { const kwPerGpu = K.dgxH100.maxW / K.dgxH100.gpus / 1000 * loadFrac * pue; return 1000 / kwPerGpu; }
