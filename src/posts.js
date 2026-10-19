// Bundle for the deep-dive posts (no three.js).
import { boot } from './lib/boot.js';
import * as solar from './figs/solar.js';
import * as wind from './figs/wind.js';
import * as xfmr from './figs/xfmr.js';
import * as txl from './figs/txl.js';
import * as sf from './figs/sf.js';
import * as g3 from './figs/global3.js';
boot({ ...solar.FIGS, ...wind.FIGS, ...xfmr.FIGS, ...txl.FIGS, ...sf.FIGS, ...g3.FIGS });
