import { boot } from './lib/boot.js';
import { drift, potential, powerEnergy } from './figs/physics.js';
import { faraday } from './figs/generation.js';
import { hero3d } from './figs/hero3d.js';
import { rankine, windPower, betz, solarDay } from './figs/heat.js';
import { losses, transformer } from './figs/transmission.js';
import { frequency } from './figs/frequency.js';
import { merit } from './figs/merit.js';
import { buildPlant } from './figs/plant.js';
import { generator } from './figs/gen.js';
import { gridDay, capture } from './figs/day.js';
import { network } from './figs/network.js';
import { timeline, spot, bill, usCompare, lcoe, lazardHistory } from './figs/money.js';
import { historyChart, offset } from './figs/history.js';
import { heatPump, adequacy } from './figs/futures.js';
import { learning, foak, cleanGrid } from './figs/clean.js';
import { energyShare, unlock } from './figs/economy.js';
import { worldMix } from './figs/global1.js';
import { accessWorld, marketDesigns, retailWorld, billWorld } from './figs/global2.js';

const FIGS = {
  hero3d, drift, potential, powerEnergy, faraday, rankine, windPower, betz, solarDay,
  losses, transformer, frequency, merit, gridDay, capture, network, timeline, spot, bill, usCompare, lcoe, lazardHistory,
  historyChart, offset, heatPump, adequacy, learning, foak, cleanGrid, energyShare, unlock, worldMix, accessWorld, marketDesigns, retailWorld, billWorld,
  buildPlant,
  rotor: el => generator(el, { stage: 1 }),
  threePhase: el => generator(el, { stage: 2 }),
  meritStack: el => merit(el, { stage: 1 }),
  meritWind: el => merit(el, { stage: 2 }),
  futureDay: el => gridDay(el, { futures: true, init: { season: 'summer', weekend: true, solarCap: 150, windLevel: 12, storageGW: 20, flexGW: 10 } }),
};

boot(FIGS);
