import { gridDay } from './day.js';
import { bladeElement } from './mech.js';
import { queueFunnel, turbineScale, specificPower, wakeField, offshoreCfd } from './wind1.js';
import { revenueModels, captureCompare, cannibal, curtailment, hybridPlant, gridForming, seasonMix } from './wind2.js';
export const FIGS = { bladeElement, queueFunnel, turbineScale, specificPower, wakeField, offshoreCfd, revenueModels, captureCompare, cannibal, curtailment, hybridPlant, gridForming, seasonMix,
  seasonDay: el => gridDay(el, { euName: 'eu-seasonday', init: { season: 'winter', weekend: false, windLevel: 25, hour: 18 }, hint: 'switch <b>Winter</b> to <b>Summer</b>: the <span class="c-solar">solar</span> hump grows while the evening still leans on gas.' }) };
