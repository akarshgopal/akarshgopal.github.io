// Bundle for every page: all 2D figures. The three.js generator is in hero.js.
import { boot } from './lib/boot.js';
import { MAIN_FIGS } from './figs/essay.js';
import * as solar from './figs/solar.js';
import * as wind from './figs/wind.js';
import * as xfmr from './figs/xfmr.js';
import * as txl from './figs/txl.js';
import * as sf from './figs/sf.js';
import * as g3 from './figs/global3.js';
const { threePhase: vectorGroups, ...xfmrRest } = xfmr.FIGS; // "threePhase" is the generator's figure
const { bill: _unused, ...txlRest } = txl.FIGS; // "bill" is the household-bill figure
boot({ ...solar.FIGS, ...wind.FIGS, ...xfmrRest, vectorGroups, ...txlRest, ...sf.FIGS, ...g3.FIGS, ...MAIN_FIGS });
