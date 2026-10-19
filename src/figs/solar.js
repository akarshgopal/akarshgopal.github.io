import { gridDay } from './day.js';
import { spectrum, junction, ivCurve, sqLimit, shading } from './solar1.js';
import { cellTech, supplyChain, sunPath, yieldMap, clipping, costStack, captureHistory } from './solar2.js';
export const FIGS = { spectrum, junction, ivCurve, sqLimit, shading, cellTech, supplyChain, sunPath, yieldMap, clipping, costStack, captureHistory,
  noonDay: el => gridDay(el, { euName: 'eu-noonday', init: { solarCap: 40 }, hint: 'slide the installed <span class="c-solar">solar</span> from 40 GW towards today’s 110 GW and watch the noon price, and solar’s capture rate, fall.' }) };
