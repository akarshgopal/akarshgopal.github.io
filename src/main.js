// One bundle for every page; each page only instantiates the figures it contains.
import { boot } from './lib/boot.js';
import { FIGS as essay } from './figs/essay.js';
import { FIGS as learning } from './figs/learningpage.js';
import { powerLadder, coolantFlow, heatLoop, idleCost, syncSwing, regionsTWh, mwhFlow } from './figs/factory.js';
import * as sw from './figs/switchpost.js';
import * as par from './figs/parallelpost.js';
import * as sc from './figs/scalingpost.js';
import { flywheel, dataIndustry, humanShare } from './figs/flywheel.js';
import { dataFunnel, scaleLadder, laborMap, dataFlow } from './figs/datapage.js';
import * as pk from './figs/peeks.js';
import { verdictMeter, ceilingMeter, launchCost } from './figs/verdict.js';
import { caseMap } from './lib/casemap.js';
import { radiatorT4 } from './figs/orbital.js';
import { yardstickBars, energyFlow } from './figs/yardstick.js';
import { tokensLadder } from './figs/demand.js';
boot({ verdictMeter, ceilingMeter, launchCost, caseMap, yardstickBars, energyFlow, tokensLadder, radiatorT4, cmosInverter: pk.cmosInverter, memoryLadder: pk.memoryLadder, landauerGap: pk.landauerGap, servingKV: pk.servingKV, moePeek: pk.moePeek, transformerBlock: pk.transformerBlock, powerChain: pk.powerChain, ...essay, ...learning, powerLadder, coolantFlow, heatLoop, idleCost, syncSwing, regionsTWh, mwhFlow, relayLogic: sw.relayLogic, relayCascade: sw.relayCascade, triode: sw.triode, mosfet: sw.mosfet, mosfetLog: sw.mosfetLog,joulesPerTick: sw.joulesPerTick, darkSilicon: sw.darkSilicon, litho: sw.litho, exposureField: sw.exposureField, yieldDie: sw.yieldDie, matmulGrid: par.matmulGrid, roofline: par.roofline, systolic: par.systolic, latencyHiding: par.latencyHiding, precisionBits: par.precisionBits, dataDistance: par.dataDistance, nvlinkPair: par.nvlinkPair, scaleOut: par.scaleOut, powerLaw: sc.powerLaw, threeKnobs: sc.threeKnobs, tokensPerParam: sc.tokensPerParam, frontierSlope: sc.frontierSlope, dataWall: sc.dataWall, flywheel, dataIndustry, humanShare, dataFunnel, scaleLadder, laborMap, dataFlow, trainingBill: sc.trainingBill, inferenceVsTraining: sc.inferenceVsTraining });
