// Figures merged by the figure audit (docs/FIGURE-AUDIT.md, Nov 2026). Each keeps the surviving figure's name, so its
// anchor (#fig-<name>) is unchanged; the merged-in figures become its steps. Registered last in src/figures.js and in
// FIG_ORDER in build.mjs, so these override the single figures of the same name.
import { steps } from '../lib/steps.js';
import { MAIN_FIGS as E } from './essay.js';
import { FIGS as K } from './new-kwh.js';
import { FIGS as T } from './txl.js';
import { FIGS as W } from './wind.js';
import { FIGS as S } from './solar.js';
import { FIGS as X } from './xfmr.js';
import { FIGS as F } from './sf.js';

export const FIGS = {
  // essay 2
  resistance: steps([['Drift', E.drift], ['Resistance', K.resistance]]),
  // essay 3
  rotor: steps([['A moving magnet', E.faraday], ['A spinning one', E.rotor]]),
  // essay 4
  losses: steps([['Losses on a line', E.losses], ['A step-up transformer', E.transformer]]),
  powerAngle: steps([['Heat and sag', T.sagDLR], ['The power angle', T.powerAngle]]),
  redispatch: steps([['Cost of congestion', T.redispatch], ['Curtailed wind and sun', W.curtailment]], 'View'),
  breakEven: steps([['Cost against distance', T.breakEven], ['The links built', T.hvdcProjects]]),
  // essay 5
  frequency: steps([['After a trip', E.frequency], ['With inverters', W.gridForming]]),
  merit: steps([['Offers', E.meritStack], ['Add wind', E.meritWind], ['Fuel and carbon', E.merit]]),
  // essay 6
  spectrum: steps([['Sunlight and the band gap', S.spectrum], ['The limit for every gap', S.sqLimit]]),
  // essay 7
  windPower: steps([['One turbine', E.windPower], ['The Betz limit', E.betz], ['Rotor against site', W.specificPower]]),
  cannibal: steps([['Capture against share', W.cannibal], ['German solar by year', S.captureHistory]], 'View'),
  // essay 8
  billWorld: steps([['What the bill pays for', E.billWorld], ['Households and business', E.retailWorld]]),
  // deep dives
  coreLoss: steps([['Core losses', X.coreLoss], ['Efficiency rules', X.efficiency]]),
  windings: steps([['Three phases', E.threePhase], ['Star and delta', X.windings], ['Vector groups', X.threePhase]]),
  sankey: steps([['Where the energy goes', F.sankey], ['Useful energy per 100 kWh', F.whereFits]]),
};
