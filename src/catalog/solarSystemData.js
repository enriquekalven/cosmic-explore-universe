/**
 * solarSystemData.js — physical data for the Sun, planets, major moons, dwarf planets and probes.
 * Radii are in Earth radii; moon orbits in planet radii (true values); textures are the files in
 * assets/textures (NASA public domain, Solar System Scope CC BY 4.0) with procedural fallbacks.
 */

export const SUN = {
  id: 'sun',
  name: 'The Sun',
  radius: 109.17,
  texture: 'sun_2k.jpg',
  rotation: 'sun'
};

export const PLANETS = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 0.3829,
    texture: 'mercury_2k.jpg',
    rotation: 'mercury',
    color: '#9a9a9a',
    procedural: { kind: 'rocky', base: '#8f8a84', accent: '#5b5753', craters: 1.0 }
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 0.9499,
    texture: 'venus_atmosphere_2k.jpg',
    rotation: 'venus',
    color: '#e8c58a',
    haze: { color: '#f3d9a4', strength: 0.55 },
    atmosphere: { color: '#ffd9a0', scale: 1.06, strength: 0.9 },
    limb: 0.35,
    procedural: { kind: 'gas', base: '#e9c98f', accent: '#c9a060', bands: 3 }
  },
  {
    id: 'earth',
    name: 'Earth',
    radius: 1,
    rotation: 'earth',
    color: '#4f8df5'
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 0.5320,
    texture: 'mars_2k.jpg',
    rotation: 'mars',
    color: '#d4683f',
    haze: { color: '#f0b08a', strength: 0.18 },
    atmosphere: { color: '#f7c9a8', scale: 1.025, strength: 0.25 },
    procedural: { kind: 'rocky', base: '#c1623d', accent: '#7a3a22', craters: 0.4 }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 10.973,
    texture: 'jupiter_2k.jpg',
    rotation: 'jupiter',
    color: '#d8b48a',
    limb: 0.5,
    haze: { color: '#f5e2c8', strength: 0.12 },
    oblateness: 0.065,
    procedural: { kind: 'gas', base: '#d7b48d', accent: '#9c6b45', bands: 14 },
    moons: [
      { id: 'io', name: 'Io', radius: 0.2859, orbitPlanetRadii: 5.905, periodDays: 1.769138, color: '#e5c35a', procedural: { kind: 'rocky', base: '#e3c15b', accent: '#9b6a1c', craters: 0.2 } },
      { id: 'europa', name: 'Europa', radius: 0.2450, orbitPlanetRadii: 9.397, periodDays: 3.551181, color: '#d9d1c0', procedural: { kind: 'icy', base: '#e7e0d2', accent: '#b68a6a', craters: 0.1 } },
      { id: 'ganymede', name: 'Ganymede', radius: 0.4135, orbitPlanetRadii: 14.99, periodDays: 7.154553, color: '#a89c8c', procedural: { kind: 'rocky', base: '#a79a89', accent: '#6b6056', craters: 0.6 } },
      { id: 'callisto', name: 'Callisto', radius: 0.3783, orbitPlanetRadii: 26.37, periodDays: 16.689018, color: '#7b7066', procedural: { kind: 'rocky', base: '#7a6f64', accent: '#3e3833', craters: 1.2 } }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    radius: 9.140,
    texture: 'saturn_2k.jpg',
    rotation: 'saturn',
    color: '#e6d3a1',
    limb: 0.45,
    haze: { color: '#f8ebcf', strength: 0.1 },
    oblateness: 0.098,
    rings: { inner: 1.11, outer: 2.326, texture: 'saturn_ring_alpha_2k.png' },
    procedural: { kind: 'gas', base: '#e5d2a3', accent: '#b89c6c', bands: 10 },
    moons: [
      { id: 'titan', name: 'Titan', radius: 0.4037, orbitPlanetRadii: 20.27, periodDays: 15.945, color: '#d9a34a', haze: { color: '#f2c47a', strength: 0.5 }, atmosphere: { color: '#f3c67c', scale: 1.07, strength: 0.6 }, procedural: { kind: 'gas', base: '#d8a24c', accent: '#b67f2d', bands: 2 } },
      { id: 'enceladus', name: 'Enceladus', radius: 0.0395, orbitPlanetRadii: 3.948, periodDays: 1.370218, color: '#f4f6ff', procedural: { kind: 'icy', base: '#f6f8ff', accent: '#bcd0ea', craters: 0.15 } }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    radius: 3.981,
    texture: 'uranus_2k.jpg',
    rotation: 'uranus',
    color: '#9fdbe6',
    limb: 0.4,
    haze: { color: '#cdf3fa', strength: 0.2 },
    atmosphere: { color: '#b9eef7', scale: 1.03, strength: 0.35 },
    rings: { inner: 1.64, outer: 2.0, procedural: true, opacity: 0.35 },
    procedural: { kind: 'gas', base: '#a9dde6', accent: '#8ccbd6', bands: 2 }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    radius: 3.865,
    texture: 'neptune_2k.jpg',
    rotation: 'neptune',
    color: '#4b70dd',
    limb: 0.4,
    haze: { color: '#9fb8ff', strength: 0.22 },
    atmosphere: { color: '#86a6ff', scale: 1.03, strength: 0.4 },
    procedural: { kind: 'gas', base: '#4a6fdc', accent: '#2f4fb0', bands: 4 }
  }
];

export const DWARF_PLANETS = [
  {
    id: 'pluto',
    name: 'Pluto',
    radius: 0.1868,
    rotation: 'pluto',
    color: '#d7b89c',
    procedural: { kind: 'rocky', base: '#d9bb9d', accent: '#6e4a3a', craters: 0.3, heart: true }
  },
  {
    id: 'ceres',
    name: 'Ceres',
    radius: 0.0742,
    rotation: 'ceres',
    color: '#9b958d',
    procedural: { kind: 'rocky', base: '#8d8781', accent: '#4e4a46', craters: 1.0 }
  },
  {
    id: 'eris',
    name: 'Eris',
    radius: 0.1825,
    rotation: 'eris',
    color: '#e8e8ea',
    procedural: { kind: 'icy', base: '#eceef2', accent: '#b9bcc6', craters: 0.2 }
  }
];

export const COMETS = [
  { id: 'halley', name: "Halley's Comet", radius: 0.02, color: '#bfe9ff' }
];

/** Where the Voyagers are heading (J2000 RA/Dec) and flyby timeline for the trajectory curves. */
export const VOYAGERS = [
  {
    id: 'voyager1',
    name: 'Voyager 1',
    color: '#22d3ee',
    ra: 258.3,
    dec: 12.15,
    launch: Date.UTC(1977, 8, 5),
    flybys: [
      { body: 'jupiter', date: Date.UTC(1979, 2, 5) },
      { body: 'saturn', date: Date.UTC(1980, 10, 12) }
    ],
    heliopauseCrossing: Date.UTC(2012, 7, 25),
    heliopauseAU: 121.6
  },
  {
    id: 'voyager2',
    name: 'Voyager 2',
    color: '#c084fc',
    ra: 301.4,
    dec: -58.87,
    launch: Date.UTC(1977, 7, 20),
    flybys: [
      { body: 'jupiter', date: Date.UTC(1979, 6, 9) },
      { body: 'saturn', date: Date.UTC(1981, 7, 25) },
      { body: 'uranus', date: Date.UTC(1986, 0, 24) },
      { body: 'neptune', date: Date.UTC(1989, 7, 25) }
    ],
    heliopauseCrossing: Date.UTC(2018, 10, 5),
    heliopauseAU: 119.7
  }
];

export const ROADSTER = {
  id: 'roadster',
  name: "Starman's Tesla Roadster",
  color: '#f43f5e',
  launch: Date.UTC(2018, 1, 6, 20, 45, 0),
  semiMajorAU: 1.32491,
  eccentricity: 0.25575,
  perihelionAU: 0.98613,
  aphelionAU: 1.6637,
  periodDays: 557.03
};

export const HELIOSPHERE = {
  heliopauseNoseAU: 121,
  terminationShockAU: 90,
  noseEclLon: 255.4,
  noseEclLat: 5.1
};

export const ISS = {
  id: 'iss',
  name: 'International Space Station',
  altitudeKm: 408,
  inclinationDeg: 51.64,
  periodMinutes: 92.9,
  raanDriftDegPerDay: -5.0
};
