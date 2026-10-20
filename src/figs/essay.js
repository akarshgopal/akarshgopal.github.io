// Figures written for the original main essay (everything except the three.js generator).
import { drift, potential, powerEnergy } from './physics.js';
import { faraday } from './generation.js';
import { rankine, windPower, betz, solarDay } from './heat.js';
import { losses, transformer } from './transmission.js';
import { frequency } from './frequency.js';
import { merit } from './merit.js';
import { buildPlant } from './plant.js';
import { generator } from './gen.js';
import { gridDay, capture } from './day.js';
import { network } from './network.js';
import { timeline, spot, bill, usCompare, lcoe, lazardHistory } from './money.js';
import { historyChart, offset } from './history.js';
import { heatPump, adequacy } from './futures.js';
import { learning, foak, cleanGrid } from './clean.js';
import { energyShare, unlock } from './economy.js';
import { worldMix } from './global1.js';
import { marketDesigns, retailWorld, billWorld } from './global2.js';

export const MAIN_FIGS = {
  drift, potential, powerEnergy, faraday, rankine, windPower, betz, solarDay,
  losses, transformer, frequency, merit, gridDay, capture, network, timeline, spot, bill, usCompare, lcoe, lazardHistory,
  historyChart, offset, heatPump, adequacy, learning, foak, cleanGrid, energyShare, unlock, worldMix, marketDesigns, retailWorld, billWorld,
  buildPlant,
  rotor: el => generator(el, { stage: 1 }),
  threePhase: el => generator(el, { stage: 2 }),
  meritStack: el => merit(el, { stage: 1 }),
  meritWind: el => merit(el, { stage: 2 }),
  futureDay: el => gridDay(el, { futures: true, init: { season: 'summer', weekend: true, solarCap: 150, windLevel: 12, storageGW: 20, flexGW: 10 } }),
};

