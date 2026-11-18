// Copyright 2026 Google. This software is provided as-is, without warranty or
// representation for any use or purpose. Your use of it is subject to your
// agreement with Google.

/**
 * astro.js — Real astronomy math for Cosmic Explorer 3D.
 *
 * Conventions
 *   • World frame = J2000 ecliptic, converted to three.js axes: x → vernal equinox, y → ecliptic north, z → -(ecliptic y).
 *   • One world unit = 1 Earth radius (6,371 km) in "true scale"; see scale.js for the explorer-mode compression.
 *   • Time is passed as JS epoch milliseconds (UTC).
 */

export const DEG = Math.PI / 180;
export const J2000_JD = 2451545.0;
export const OBLIQUITY_DEG = 23.4392911;
export const AU_KM = 149597870.7;
export const EARTH_RADIUS_KM = 6371.0084;
export const LY_KM = 9.4607304725808e12;
export const AU_IN_EARTH_RADII = AU_KM / EARTH_RADIUS_KM; // ≈ 23 481
export const LY_IN_EARTH_RADII = LY_KM / EARTH_RADIUS_KM; // ≈ 1.485e9
export const LY_IN_AU = LY_KM / AU_KM; // ≈ 63 241
export const SUN_RADIUS_EARTH = 109.17;
export const LIGHT_SPEED_KM_S = 299792.458;

const cosE = Math.cos(OBLIQUITY_DEG * DEG);
const sinE = Math.sin(OBLIQUITY_DEG * DEG);

export function julianDay(dateMs) {
  return dateMs / 86400000 + 2440587.5;
}

export function daysSinceJ2000(dateMs) {
  return julianDay(dateMs) - J2000_JD;
}

export function centuriesSinceJ2000(dateMs) {
  return daysSinceJ2000(dateMs) / 36525;
}

export function raHms(h, m = 0, s = 0) {
  return (h + m / 60 + s / 3600) * 15;
}

export function decDms(d, m = 0, s = 0) {
  const sign = d < 0 || Object.is(d, -0) ? -1 : 1;
  return sign * (Math.abs(d) + m / 60 + s / 3600);
}

/** Unit vector in the J2000 equatorial frame. */
export function eqVec(raDeg, decDeg) {
  const ra = raDeg * DEG;
  const dec = decDeg * DEG;
  const c = Math.cos(dec);
  return [c * Math.cos(ra), c * Math.sin(ra), Math.sin(dec)];
}

/** Equatorial → ecliptic (rotation about x by the obliquity). */
export function eqToEcl(v) {
  const [x, y, z] = v;
  return [x, y * cosE + z * sinE, -y * sinE + z * cosE];
}

/** Ecliptic → three.js world axes (y-up). */
export function eclToWorld(v) {
  return [v[0], v[2], -v[1]];
}

export function worldFromRaDec(raDeg, decDeg) {
  return eclToWorld(eqToEcl(eqVec(raDeg, decDeg)));
}

export function worldFromEclLonLat(lonDeg, latDeg) {
  const lon = lonDeg * DEG;
  const lat = latDeg * DEG;
  const c = Math.cos(lat);
  return eclToWorld([c * Math.cos(lon), c * Math.sin(lon), Math.sin(lat)]);
}

export function normalizeDeg(a) {
  a %= 360;
  return a < 0 ? a + 360 : a;
}

/** Greenwich Mean Sidereal Time in degrees (IAU 1982 low-precision form). */
export function gmstDeg(dateMs) {
  const d = daysSinceJ2000(dateMs);
  return normalizeDeg(280.46061837 + 360.98564736629 * d);
}

// ---------------------------------------------------------------------------
// Keplerian elements for the major planets (JPL "Approximate Positions of the
// Planets", Table 1, valid 1800–2050). Units: AU, degrees; rates per century.
// [value at J2000, rate]
// ---------------------------------------------------------------------------
export const PLANET_ELEMENTS = {
  mercury: {
    a: [0.38709927, 0.00000037],
    e: [0.20563593, 0.00001906],
    I: [7.00497902, -0.00594749],
    L: [252.2503235, 149472.67411175],
    wBar: [77.45779628, 0.16047689],
    O: [48.33076593, -0.12534081]
  },
  venus: {
    a: [0.72333566, 0.0000039],
    e: [0.00677672, -0.00004107],
    I: [3.39467605, -0.0007889],
    L: [181.9790995, 58517.81538729],
    wBar: [131.60246718, 0.00268329],
    O: [76.67984255, -0.27769418]
  },
  earth: {
    a: [1.00000261, 0.00000562],
    e: [0.01671123, -0.00004392],
    I: [-0.00001531, -0.01294668],
    L: [100.46457166, 35999.37244981],
    wBar: [102.93768193, 0.32327364],
    O: [0.0, 0.0]
  },
  mars: {
    a: [1.52371034, 0.00001847],
    e: [0.0933941, 0.00007882],
    I: [1.84969142, -0.00813131],
    L: [-4.55343205, 19140.30268499],
    wBar: [-23.94362959, 0.44441088],
    O: [49.55953891, -0.29257343]
  },
  jupiter: {
    a: [5.202887, -0.00011607],
    e: [0.04838624, -0.00013253],
    I: [1.30439695, -0.00183714],
    L: [34.39644051, 3034.74612775],
    wBar: [14.72847983, 0.21252668],
    O: [100.47390909, 0.20469106]
  },
  saturn: {
    a: [9.53667594, -0.0012506],
    e: [0.05386179, -0.00050991],
    I: [2.48599187, 0.00193609],
    L: [49.95424423, 1222.49362201],
    wBar: [92.59887831, -0.41897216],
    O: [113.66242448, -0.28867794]
  },
  uranus: {
    a: [19.18916464, -0.00196176],
    e: [0.04725744, -0.00004397],
    I: [0.77263783, -0.00242939],
    L: [313.23810451, 428.48202785],
    wBar: [170.9542763, 0.40805281],
    O: [74.01692503, 0.04240589]
  },
  neptune: {
    a: [30.06992276, 0.00026291],
    e: [0.00859048, 0.00005105],
    I: [1.77004347, 0.00035372],
    L: [-55.12002969, 218.45945325],
    wBar: [44.96476227, -0.32241464],
    O: [131.78422574, -0.00508664]
  },
  pluto: {
    a: [39.48211675, -0.00031596],
    e: [0.2488273, 0.0000517],
    I: [17.14001206, 0.00004818],
    L: [238.92903833, 145.20780515],
    wBar: [224.06891629, -0.04062942],
    O: [110.30393684, -0.01183482]
  }
};

/**
 * Generic osculating elements for small bodies: a (AU), e, i, O (node), w (arg. of perihelion),
 * M0 (mean anomaly at J2000, deg), n (deg/day).
 */
export const SMALL_BODY_ELEMENTS = {
  ceres: { a: 2.7675, e: 0.0758, i: 10.594, O: 80.305, w: 73.597, M0: 7.4, n: 0.21408 },
  eris: { a: 67.864, e: 0.4361, i: 44.04, O: 35.95, w: 151.64, M0: 205.99, n: 0.001763 },
  // JPL SBDB (epoch JD 2461200.5), mean anomaly propagated back to J2000.
  haumea: { a: 43.0603, e: 0.19444, i: 28.2085, O: 121.786, w: 240.691, M0: 189.531, n: 0.0034881 },
  makemake: { a: 45.5709, e: 0.15889, i: 29.0279, O: 79.2948, w: 297.092, M0: 139.003, n: 0.0032039 },
  halley: { a: 17.834, e: 0.96714, i: 162.26, O: 58.42, w: 111.33, M0: 66.44, n: 0.0130956 },
  roadster: { a: 1.32491, e: 0.25575, i: 1.0775, O: 317.09, w: 177.49, M0: 84.3, n: 0.64628 }
};

function solveKepler(Mdeg, e) {
  const M = Mdeg * DEG;
  let E = e < 0.8 ? M : Math.PI;
  for (let k = 0; k < 30; k++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-10) break;
  }
  return E;
}

function orbitalToEcliptic(a, e, Ideg, Odeg, wdeg, E) {
  const xP = a * (Math.cos(E) - e);
  const yP = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const I = Ideg * DEG;
  const O = Odeg * DEG;
  const w = wdeg * DEG;
  const cw = Math.cos(w);
  const sw = Math.sin(w);
  const cO = Math.cos(O);
  const sO = Math.sin(O);
  const cI = Math.cos(I);
  const sI = Math.sin(I);
  return [
    (cw * cO - sw * sO * cI) * xP + (-sw * cO - cw * sO * cI) * yP,
    (cw * sO + sw * cO * cI) * xP + (-sw * sO + cw * cO * cI) * yP,
    sw * sI * xP + cw * sI * yP
  ];
}

function planetElementsAt(id, T) {
  const el = PLANET_ELEMENTS[id];
  const a = el.a[0] + el.a[1] * T;
  const e = el.e[0] + el.e[1] * T;
  const I = el.I[0] + el.I[1] * T;
  const L = el.L[0] + el.L[1] * T;
  const wBar = el.wBar[0] + el.wBar[1] * T;
  const O = el.O[0] + el.O[1] * T;
  return { a, e, I, O, w: wBar - O, M: L - wBar };
}

/** Heliocentric position of a major planet in world axes, in AU. */
export function planetPositionAU(id, dateMs) {
  const T = centuriesSinceJ2000(dateMs);
  const { a, e, I, O, w, M } = planetElementsAt(id, T);
  const E = solveKepler(normalizeDeg(M), e);
  return eclToWorld(orbitalToEcliptic(a, e, I, O, w, E));
}

/** Heliocentric position of a small body (asteroid / dwarf planet / comet) in world axes, in AU. */
export function smallBodyPositionAU(id, dateMs) {
  const el = SMALL_BODY_ELEMENTS[id];
  const d = daysSinceJ2000(dateMs);
  const M = normalizeDeg(el.M0 + el.n * d);
  const E = solveKepler(M, el.e);
  return eclToWorld(orbitalToEcliptic(el.a, el.e, el.i, el.O, el.w, E));
}

export function bodyPositionAU(id, dateMs) {
  return PLANET_ELEMENTS[id] ? planetPositionAU(id, dateMs) : smallBodyPositionAU(id, dateMs);
}

/** Full orbit path (array of [x,y,z] in AU, world axes) using the elements at the given date. */
export function orbitPathAU(id, dateMs, segments = 256) {
  let a, e, I, O, w;
  if (PLANET_ELEMENTS[id]) {
    ({ a, e, I, O, w } = planetElementsAt(id, centuriesSinceJ2000(dateMs)));
  } else {
    const el = SMALL_BODY_ELEMENTS[id];
    a = el.a;
    e = el.e;
    I = el.i;
    O = el.O;
    w = el.w;
  }
  const pts = [];
  for (let k = 0; k <= segments; k++) {
    const E = (k / segments) * Math.PI * 2;
    pts.push(eclToWorld(orbitalToEcliptic(a, e, I, O, w, E)));
  }
  return pts;
}

export function orbitalPeriodDays(id) {
  if (PLANET_ELEMENTS[id]) {
    const a = PLANET_ELEMENTS[id].a[0];
    return 365.256363 * Math.pow(a, 1.5);
  }
  return 360 / SMALL_BODY_ELEMENTS[id].n;
}

// ---------------------------------------------------------------------------
// Moon: truncated Meeus series (accuracy ≈ 0.3°, 1% in distance) — plenty for visuals,
// and it gives the correct phase, libration-free orientation and orbit shape.
// ---------------------------------------------------------------------------
export function moonGeocentricKm(dateMs) {
  const d = daysSinceJ2000(dateMs);
  const Lp = (218.3164477 + 13.17639648 * d) * DEG;
  const D = (297.8501921 + 12.19074912 * d) * DEG;
  const M = (357.5291092 + 0.98560028 * d) * DEG;
  const Mp = (134.9633964 + 13.06499295 * d) * DEG;
  const F = (93.272095 + 13.22935024 * d) * DEG;

  const lon =
    Lp +
    DEG *
      (6.288774 * Math.sin(Mp) +
        1.274027 * Math.sin(2 * D - Mp) +
        0.658314 * Math.sin(2 * D) +
        0.213618 * Math.sin(2 * Mp) -
        0.185116 * Math.sin(M) -
        0.114332 * Math.sin(2 * F) +
        0.058793 * Math.sin(2 * D - 2 * Mp) +
        0.057066 * Math.sin(2 * D - M - Mp) +
        0.053322 * Math.sin(2 * D + Mp) +
        0.045758 * Math.sin(2 * D - M));
  const lat =
    DEG *
    (5.128122 * Math.sin(F) +
      0.280602 * Math.sin(Mp + F) +
      0.277693 * Math.sin(Mp - F) +
      0.173237 * Math.sin(2 * D - F) +
      0.055413 * Math.sin(2 * D - Mp + F) +
      0.046271 * Math.sin(2 * D - Mp - F));
  const dist =
    385000.56 -
    20905.355 * Math.cos(Mp) -
    3699.111 * Math.cos(2 * D - Mp) -
    2955.968 * Math.cos(2 * D) -
    569.925 * Math.cos(2 * Mp);

  const c = Math.cos(lat);
  return eclToWorld([dist * c * Math.cos(lon), dist * c * Math.sin(lon), dist * Math.sin(lat)]);
}

/** Moon illuminated fraction (0 = new, 1 = full) for the inspector. */
export function moonIlluminatedFraction(dateMs) {
  const d = daysSinceJ2000(dateMs);
  const D = (297.8501921 + 12.19074912 * d) * DEG;
  return (1 - Math.cos(D)) / 2;
}

// ---------------------------------------------------------------------------
// IAU rotational elements (pole RA/Dec at J2000 and prime-meridian angle W = W0 + Wd·d).
// ---------------------------------------------------------------------------
export const BODY_ROTATION = {
  sun: { ra: 286.13, dec: 63.87, W0: 84.176, Wd: 14.1844 },
  mercury: { ra: 281.0097, dec: 61.4143, W0: 329.5469, Wd: 6.1385025 },
  venus: { ra: 272.76, dec: 67.16, W0: 160.2, Wd: -1.4813688 },
  earth: { ra: 0.0, dec: 90.0, W0: 190.147, Wd: 360.9856235 },
  moon: { ra: 266.8577, dec: 65.6411, W0: 38.3213, Wd: 13.17635815 },
  mars: { ra: 317.68143, dec: 52.8865, W0: 176.63, Wd: 350.89198226 },
  jupiter: { ra: 268.056595, dec: 64.495303, W0: 284.95, Wd: 870.536 },
  saturn: { ra: 40.589, dec: 83.537, W0: 38.9, Wd: 810.7939024 },
  uranus: { ra: 257.311, dec: -15.175, W0: 203.81, Wd: -501.1600928 },
  neptune: { ra: 299.36, dec: 43.46, W0: 253.18, Wd: 536.3128492 },
  pluto: { ra: 132.993, dec: -6.163, W0: 302.695, Wd: 56.3625225 },
  ceres: { ra: 291.4, dec: 66.8, W0: 170.9, Wd: 952.1532 },
  eris: { ra: 0, dec: 90, W0: 0, Wd: 13.84 },
  haumea: { ra: 0, dec: 90, W0: 0, Wd: 2206.67 }, // 3.9154 h spin (pole not well constrained)
  makemake: { ra: 0, dec: 90, W0: 0, Wd: 378.5 }, // 22.8266 h spin
  io: { ra: 268.05, dec: 64.5, W0: 200.39, Wd: 203.4889538 },
  europa: { ra: 268.08, dec: 64.51, W0: 36.022, Wd: 101.3747235 },
  ganymede: { ra: 268.2, dec: 64.57, W0: 44.064, Wd: 50.3176081 },
  callisto: { ra: 268.72, dec: 64.83, W0: 259.51, Wd: 21.5710715 },
  titan: { ra: 39.4827, dec: 83.4279, W0: 186.5855, Wd: 22.5769768 },
  enceladus: { ra: 40.66, dec: 83.52, W0: 6.32, Wd: 262.7318996 }
};

/**
 * Returns an orthonormal basis (world axes) for a rotating body: columns are the body's local +x
 * (prime meridian direction — where equirect texture u = 0.5 lands on a three.js SphereGeometry),
 * local +y (north pole) and local +z.
 */
export function bodyBasis(rot, dateMs) {
  const d = daysSinceJ2000(dateMs);
  const P = worldFromRaDec(rot.ra, rot.dec);
  // Node of the body's equator on the J2000 equator: RA = ra + 90°, Dec = 0
  const Q0 = worldFromRaDec(rot.ra + 90, 0);
  // Rotate Q0 about P by W (prograde) to get the prime meridian direction
  const W = (rot.W0 + rot.Wd * d) * DEG;
  const M = rotateAboutAxis(Q0, P, W);
  const E = cross(P, M); // east direction (90° ahead in the rotation sense)
  return { x: M, y: P, z: [-E[0], -E[1], -E[2]] };
}

export function rotateAboutAxis(v, k, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const kv = cross(k, v);
  const kd = dot(k, v);
  return [
    v[0] * c + kv[0] * s + k[0] * kd * (1 - c),
    v[1] * c + kv[1] * s + k[1] * kd * (1 - c),
    v[2] * c + kv[2] * s + k[2] * kd * (1 - c)
  ];
}

export function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

export function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function normalize(v) {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

// ---------------------------------------------------------------------------
// Galactic frame (J2000): center RA 266.405°, Dec −28.936°; north pole RA 192.859°, Dec +27.128°.
// ---------------------------------------------------------------------------
export const GALACTIC_FRAME = (() => {
  let X = worldFromRaDec(266.40499, -28.93617);
  const Z = worldFromRaDec(192.85948, 27.12825);
  const Y = normalize(cross(Z, X));
  X = normalize(cross(Y, Z));
  return { X, Y, Z };
})();

export const SUN_TO_GALACTIC_CENTER_LY = 26670;

/** Direction (world axes) for galactic longitude/latitude in degrees. */
export function worldFromGalactic(lDeg, bDeg) {
  const l = lDeg * DEG;
  const b = bDeg * DEG;
  const { X, Y, Z } = GALACTIC_FRAME;
  const cb = Math.cos(b);
  const cx = cb * Math.cos(l);
  const cy = cb * Math.sin(l);
  const cz = Math.sin(b);
  return [
    X[0] * cx + Y[0] * cy + Z[0] * cz,
    X[1] * cx + Y[1] * cy + Z[1] * cz,
    X[2] * cx + Y[2] * cy + Z[2] * cz
  ];
}

export function formatDateUTC(dateMs, locale = undefined) {
  const d = new Date(dateMs);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatNumber(n, digits = 0, locale = undefined) {
  return Number(n).toLocaleString(locale, { maximumFractionDigits: digits });
}

export function formatDistanceKm(km) {
  if (km < 1e6) return `${formatNumber(km)} km`;
  if (km < AU_KM * 0.2) return `${formatNumber(km / 1e6, 2)} million km`;
  if (km < LY_KM * 0.05) return `${formatNumber(km / AU_KM, 2)} AU (${formatNumber(km / 1e9, 2)} billion km)`;
  const ly = km / LY_KM;
  if (ly < 1e4) return `${formatNumber(ly, 2)} light-years`;
  if (ly < 1e7) return `${formatNumber(ly / 1e3, 1)} thousand light-years`;
  if (ly < 1e10) return `${formatNumber(ly / 1e6, 2)} million light-years`;
  return `${formatNumber(ly / 1e9, 2)} billion light-years`;
}

export function formatLightTime(km) {
  const s = km / LIGHT_SPEED_KM_S;
  if (s < 1) return `${(s * 1000).toFixed(0)} milliseconds`;
  if (s < 90) return `${s.toFixed(1)} seconds`;
  if (s < 5400) return `${(s / 60).toFixed(1)} minutes`;
  if (s < 86400 * 2) return `${(s / 3600).toFixed(1)} hours`;
  if (s < 86400 * 365.25 * 1.5) return `${(s / 86400).toFixed(1)} days`;
  const yr = s / (86400 * 365.25);
  if (yr < 1e4) return `${formatNumber(yr, 1)} years`;
  if (yr < 1e7) return `${formatNumber(yr / 1e3, 1)} thousand years`;
  if (yr < 1e10) return `${formatNumber(yr / 1e6, 2)} million years`;
  return `${formatNumber(yr / 1e9, 2)} billion years`;
}
