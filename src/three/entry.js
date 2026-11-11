// Separate bundle (dist/three3d.js) holding three.js and the 3D figures; only pages with a 3D figure load it.
import { lossSurface } from './losssurface.js';
import { mosfet3d } from './mosfet3d.js';
import { factoryZoom } from './factoryzoom.js';
import { triode3d } from './triode3d.js';
import { coldPlate3d } from './coldplate3d.js';
import { package3d } from './package3d.js';
import { cmos3d } from './cmos3d.js';
import { systolic3d } from './systolic3d.js';
import { nvlinkPair3d } from './nvlinkpair3d.js';
import { yield3d } from './yield3d.js';
import { relay3d } from './relay3d.js';
import { litho3d } from './litho3d.js';
import { heatLoop3d } from './heatloop3d.js';
import { transformer3d } from './transformer3d.js';
import { cascade3d } from './cascade3d.js';
import { tokenBalance3d } from './tokenbalance3d.js';
window.AIX3D = { lossSurface, mosfet3d, factoryZoom, triode3d, coldPlate3d, package3d, tokenBalance3d, cmos3d, systolic3d, nvlinkPair3d, yield3d, relay3d, litho3d, heatLoop3d, transformer3d, cascade3d };
