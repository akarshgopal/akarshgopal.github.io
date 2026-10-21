// Bundle for every page: all 2D figures. The three.js generator is in hero.js.
import { boot } from './lib/boot.js';
import { MAIN_FIGS } from './figs/essay.js';
import * as solar from './figs/solar.js';
import * as wind from './figs/wind.js';
import * as xfmr from './figs/xfmr.js';
import * as txl from './figs/txl.js';
import * as sf from './figs/sf.js';
import * as g3 from './figs/global3.js';
import * as n_cheaper from './figs/new-cheaper.js';
import * as n_kwh from './figs/new-kwh.js';
import * as n_machine from './figs/new-machine.js';
import * as n_wires from './figs/new-wires.js';
import * as n_balance from './figs/new-balance.js';
import * as n_solar from './figs/new-solar.js';
import * as n_wind from './figs/new-wind.js';
import * as n_costs from './figs/new-costs.js';
import * as n_futures from './figs/new-futures.js';
import * as n_deep from './figs/new-deep.js';
const { threePhase: vectorGroups, ...xfmrRest } = xfmr.FIGS; // "threePhase" is the generator's figure
const { bill: _unused, ...txlRest } = txl.FIGS; // "bill" is the household-bill figure
boot({ ...solar.FIGS, ...wind.FIGS, ...xfmrRest, vectorGroups, ...txlRest, ...sf.FIGS, ...g3.FIGS, ...MAIN_FIGS, ...n_cheaper.FIGS, ...n_kwh.FIGS, ...n_machine.FIGS, ...n_wires.FIGS, ...n_balance.FIGS, ...n_solar.FIGS, ...n_wind.FIGS, ...n_costs.FIGS, ...n_futures.FIGS, ...n_deep.FIGS });
