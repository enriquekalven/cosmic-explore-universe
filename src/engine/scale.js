/**
 * scale.js — Maps the 0‒100 "cosmic zoom" slider to camera distance and handles the
 * Explorer ↔ True-Scale blend.
 *
 * Explorer scale keeps real body sizes and real directions but compresses distances so kids can
 * see planets, probes, stars and galaxies in one continuous zoom. True scale is… true.
 */
import { AU_IN_EARTH_RADII, LY_IN_EARTH_RADII } from './astro.js';

export const STAGES = [
  { index: 0, min: 0, max: 20 },
  { index: 1, min: 20, max: 45 },
  { index: 2, min: 45, max: 68 },
  { index: 3, min: 68, max: 85 },
  { index: 4, min: 85, max: 100 }
];

const ANCHOR_Z = [0, 20, 45, 68, 85, 100];
// log10(camera distance in Earth radii) at each anchor
const ANCHOR_EXPLORER = [0.35, 2.55, 5.0, 6.9, 10.0, 15.8];
const ANCHOR_TRUE = [0.35, 2.55, 6.8, 11.3, 14.35, 20.2];

export const EXPLORER_UNITS_PER_LY = 57000;
export const EXPLORER_ORBIT_K = 1500; // 1 AU → 1500 Earth radii (true: 23 481)
export const EXPLORER_ORBIT_P = 0.65;

function piecewise(z, ys) {
  const zz = Math.max(0, Math.min(100, z));
  for (let i = 0; i < ANCHOR_Z.length - 1; i++) {
    const z0 = ANCHOR_Z[i];
    const z1 = ANCHOR_Z[i + 1];
    if (zz <= z1) {
      const t = (zz - z0) / (z1 - z0);
      return ys[i] + (ys[i + 1] - ys[i]) * t;
    }
  }
  return ys[ys.length - 1];
}

function inversePiecewise(y, ys) {
  if (y <= ys[0]) return 0;
  for (let i = 0; i < ys.length - 1; i++) {
    if (y <= ys[i + 1]) {
      const t = (y - ys[i]) / (ys[i + 1] - ys[i]);
      return ANCHOR_Z[i] + (ANCHOR_Z[i + 1] - ANCHOR_Z[i]) * t;
    }
  }
  return 100;
}

export function smoothstep(a, b, x) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** 1 inside [in1, out0], ramps 0→1 over [in0,in1] and 1→0 over [out0,out1]. */
export function bandFade(z, in0, in1, out0, out1) {
  return smoothstep(in0, in1, z) * (1 - smoothstep(out0, out1, z));
}

export class ScaleModel {
  constructor() {
    this.blend = 0; // 0 = explorer, 1 = true scale
    this.targetBlend = 0;
    this.changedThisFrame = true;
  }

  setMode(mode) {
    this.targetBlend = mode === 'true' ? 1 : 0;
  }

  get mode() {
    return this.targetBlend > 0.5 ? 'true' : 'explorer';
  }

  update(dt) {
    const prev = this.blend;
    const k = 1 - Math.exp(-dt * 2.2);
    this.blend += (this.targetBlend - this.blend) * k;
    if (Math.abs(this.targetBlend - this.blend) < 0.0005) this.blend = this.targetBlend;
    this.changedThisFrame = Math.abs(prev - this.blend) > 1e-6;
  }

  /** Blend two positive quantities in log space. */
  mixLog(explorerValue, trueValue) {
    if (this.blend <= 0) return explorerValue;
    if (this.blend >= 1) return trueValue;
    return Math.exp(Math.log(explorerValue) * (1 - this.blend) + Math.log(trueValue) * this.blend);
  }

  get unitsPerLy() {
    return this.mixLog(EXPLORER_UNITS_PER_LY, LY_IN_EARTH_RADII);
  }

  /** Display radius (Earth radii) for a heliocentric / star-centric distance given in AU. */
  orbitRadius(rAU) {
    if (rAU <= 0) return 0;
    return this.mixLog(EXPLORER_ORBIT_K * Math.pow(rAU, EXPLORER_ORBIT_P), rAU * AU_IN_EARTH_RADII);
  }

  /** Converts an AU-space vector (world axes) to display units, preserving direction. */
  orbitVector(vAU, out) {
    const r = Math.hypot(vAU[0], vAU[1], vAU[2]);
    if (r === 0) {
      out[0] = out[1] = out[2] = 0;
      return out;
    }
    const s = this.orbitRadius(r) / r;
    out[0] = vAU[0] * s;
    out[1] = vAU[1] * s;
    out[2] = vAU[2] * s;
    return out;
  }

  distanceForZoom(z) {
    const lg = piecewise(z, ANCHOR_EXPLORER) * (1 - this.blend) + piecewise(z, ANCHOR_TRUE) * this.blend;
    return Math.pow(10, lg);
  }

  zoomForDistance(d) {
    const lg = Math.log10(Math.max(1e-3, d));
    const zE = inversePiecewise(lg, ANCHOR_EXPLORER);
    const zT = inversePiecewise(lg, ANCHOR_TRUE);
    return zE * (1 - this.blend) + zT * this.blend;
  }

  stageForZoom(z) {
    for (const s of STAGES) {
      if (z >= s.min && z <= s.max) return s.index;
    }
    return z < 0 ? 0 : 4;
  }
}
