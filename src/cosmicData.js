/**
 * Cosmic Explorer 3D — Scientific & Kid-Friendly Dataset
 * Covers 5 Cosmic Scales:
 *   0: Earth & Moon System
 *   1: Solar System & Voyager 1/2 Probes
 *   2: Nearby Stars & Exoplanet Systems (Alpha Centauri, TRAPPIST-1, etc.)
 *   3: The Milky Way Galaxy
 *   4: Local Group & Observable Universe
 */

import { bodyPositionAU, planetPositionAU, AU_KM } from './engine/astro.js';

export const COSMIC_SCALES = [
  {
    id: 'earth-moon',
    index: 0,
    name: 'Earth & Moon',
    subtitle: 'Our Home & Planetary Backyard',
    rangeLabel: '10,000 km – 1 Million km',
    zoomMin: 0,
    zoomMax: 20,
    defaultZoom: 8,
    description:
      'Welcome home! Earth is a rocky ocean world protected by a thin blue atmosphere, orbited by our faithful companion, the Moon—plus the International Space Station zooming overhead!',
    funPrompt: 'Try clicking on Earth, the Moon, or the International Space Station!'
  },
  {
    id: 'solar-system',
    index: 1,
    name: 'Solar System & Probes',
    subtitle: '8 Planets, Tesla Roadster & Voyager 1/2',
    rangeLabel: '1 AU – 200 AU (30 Billion km)',
    zoomMin: 20,
    zoomMax: 45,
    defaultZoom: 33,
    description:
      'Zoom out millions of kilometers! Here our Sun anchors 8 diverse planets, Starman’s Tesla Roadster on its Mars-crossing orbit, and humanity’s farthest robotic explorers: Voyager 1 and Voyager 2 racing into interstellar space.',
    funPrompt: 'Click "🚗 Tesla Roadster", "📡 Voyager 1", or "🛸 Voyager 2" to track them live!'
  },
  {
    id: 'nearby-stars',
    index: 2,
    name: 'Nearby Stars & 6,451 Exoplanets',
    subtitle: 'All Confirmed Alien Worlds & Stellar Neighbors',
    rangeLabel: '4 Light-Years – 5,000+ Light-Years',
    zoomMin: 45,
    zoomMax: 68,
    defaultZoom: 56,
    description:
      'Explore all 6,451 confirmed exoplanets across 4,847 star systems from the NASA Exoplanet Archive! Visit Proxima Centauri b (4.24 ly), TRAPPIST-1’s 7 Earth-sized worlds, or search any exoplanet system!',
    funPrompt: 'Use the Exoplanet Archive Explorer or click any star to inspect its alien worlds!'
  },
  {
    id: 'milky-way',
    index: 3,
    name: 'Milky Way Galaxy',
    subtitle: 'Our Island of 200+ Billion Stars',
    rangeLabel: '100,000 Light-Years Across',
    zoomMin: 68,
    zoomMax: 85,
    defaultZoom: 76,
    description:
      'Behold our Milky Way! A giant barred spiral galaxy with 200 to 400 billion stars. Our entire Solar System sits quietly in the Orion Spur, about 26,000 light-years from the supermassive black hole Sagittarius A*.',
    funPrompt: 'Look for the "You Are Here (Orion Arm)" beacon to see where our Sun lives!'
  },
  {
    id: 'universe',
    index: 4,
    name: 'The Universe',
    subtitle: 'Local Group, Cosmic Web & Deep Space',
    rangeLabel: '2.5 Million – 93 Billion Light-Years',
    zoomMin: 85,
    zoomMax: 100,
    defaultZoom: 94,
    description:
      'At the grandest scale, whole galaxies like our Milky Way and Andromeda are just glowing points woven into the Cosmic Web—billions of galaxies stretching across 93 billion light-years!',
    funPrompt: 'Explore Andromeda (our neighboring giant galaxy) and the glowing Cosmic Web filaments!'
  }
];

/**
 * Live telemetry helper for Voyager 1, Voyager 2 & Starman's Tesla Roadster
 * Computes live distance based on epoch reference + heliocentric Keplerian elements.
 */
export function getVoyagerLiveTelemetry(simDateMs) {
  // Reference epoch: Jan 1, 2026 00:00:00 UTC
  const epochMs = Date.UTC(2026, 0, 1, 0, 0, 0);
  const nowMs = simDateMs !== undefined ? simDateMs : Date.now();
  const elapsedSeconds = (nowMs - epochMs) / 1000;

  // Voyager 1: ~166.4 AU on Jan 1, 2026, speed 16.999 km/s
  const v1BaseKm = 24893000000;
  const v1SpeedKmS = 16.999;
  const v1DistKm = Math.max(1e8, v1BaseKm + elapsedSeconds * v1SpeedKmS);
  const v1AU = v1DistKm / 149597870.7;
  const v1LightHours = v1DistKm / 299792.458 / 3600;

  // Voyager 2: ~139.1 AU on Jan 1, 2026, speed 15.374 km/s
  const v2BaseKm = 20810000000;
  const v2SpeedKmS = 15.374;
  const v2DistKm = Math.max(1e8, v2BaseKm + elapsedSeconds * v2SpeedKmS);
  const v2AU = v2DistKm / 149597870.7;
  const v2LightHours = v2DistKm / 299792.458 / 3600;

  // Starman's Tesla Roadster (JPL Horizons ID -143205, launched Feb 6, 2018)
  const rPos = bodyPositionAU('roadster', nowMs);
  const ePos = planetPositionAU('earth', nowMs);
  const mPos = planetPositionAU('mars', nowMs);
  const rSunAU = Math.hypot(rPos[0], rPos[1], rPos[2]);
  const rEarthAU = Math.hypot(rPos[0] - ePos[0], rPos[1] - ePos[1], rPos[2] - ePos[2]);
  const rMarsAU = Math.hypot(rPos[0] - mPos[0], rPos[1] - mPos[1], rPos[2] - mPos[2]);
  const rSunKm = rSunAU * AU_KM;
  const rEarthKm = rEarthAU * AU_KM;
  const rMarsKm = rMarsAU * AU_KM;
  // Vis-viva equation: v = 29.7847 * sqrt(2/r - 1/a) km/s (a = 1.32491 AU)
  const rSpeedKmS = 29.7847 * Math.sqrt(Math.max(0.05, 2 / rSunAU - 1 / 1.32491));
  const rSpeedKmh = rSpeedKmS * 3600;
  const rSpeedMph = rSpeedKmh * 0.621371;
  const rLightMinutes = rEarthKm / 299792.458 / 60;
  const launchMs = Date.UTC(2018, 1, 6, 20, 45, 0);
  const orbitsCompleted = Math.max(0, (nowMs - launchMs) / (557.03 * 86400000));

  return {
    voyager1: {
      distanceKm: v1DistKm,
      distanceBillionKm: (v1DistKm / 1e9).toFixed(3),
      distanceAU: v1AU.toFixed(2),
      speedKmS: v1SpeedKmS.toFixed(2),
      speedMph: '38,026 mph',
      oneWayLightTimeHours: v1LightHours.toFixed(2),
      launchDate: 'September 5, 1977',
      status: 'Operating in Interstellar Space (crossed Heliopause Aug 2012)'
    },
    voyager2: {
      distanceKm: v2DistKm,
      distanceBillionKm: (v2DistKm / 1e9).toFixed(3),
      distanceAU: v2AU.toFixed(2),
      speedKmS: v2SpeedKmS.toFixed(2),
      speedMph: '34,391 mph',
      oneWayLightTimeHours: v2LightHours.toFixed(2),
      launchDate: 'August 20, 1977',
      status: 'Operating in Interstellar Space (crossed Heliopause Nov 2018)'
    },
    roadster: {
      distanceKm: rSunKm,
      distanceMillionKm: (rSunKm / 1e6).toFixed(2),
      distanceAU: rSunAU.toFixed(3),
      earthDistanceKm: rEarthKm,
      earthDistanceMillionKm: (rEarthKm / 1e6).toFixed(2),
      earthDistanceAU: rEarthAU.toFixed(3),
      marsDistanceMillionKm: (rMarsKm / 1e6).toFixed(2),
      speedKmS: rSpeedKmS.toFixed(2),
      speedKmh: Math.round(rSpeedKmh).toLocaleString(),
      speedMph: `${Math.round(rSpeedMph).toLocaleString()} mph`,
      oneWayLightTimeMinutes: rLightMinutes.toFixed(2),
      orbitsCompleted: orbitsCompleted.toFixed(2),
      launchDate: 'February 6, 2018 (Falcon Heavy Demo)',
      status: 'Heliocentric Mars-Crossing Orbit ("Don’t Panic!" on dashboard)'
    }
  };
}

export const COSMIC_OBJECTS = {
  // =========================================================================
  // SCALE 0: EARTH & MOON SYSTEM
  // =========================================================================
  earth: {
    id: 'earth',
    name: 'Planet Earth',
    pronunciation: 'ERTH',
    category: 'Home Planet',
    scaleIndex: 0,
    badge: '🌍 Where We Live!',
    color: '#3b82f6',
    quickStats: [
      { label: 'Diameter', value: '12,742 km (7,918 miles)' },
      { label: 'Distance from Sun', value: '149.6 Million km (1 AU)' },
      { label: 'Length of Year', value: '365.25 Days' },
      { label: 'Surface Water', value: '71% Oceans' }
    ],
    kidSummary:
      'Earth is the third planet from the Sun and the only place in the universe known to harbor life! Its liquid oceans, protective magnetic shield, and oxygen-rich atmosphere keep us safe and warm.',
    funFacts: [
      'Earth is not a perfect sphere—spinning makes it bulge slightly at the equator like a squished basketball!',
      'You are currently riding Spaceship Earth around the Sun at 107,000 km/h (67,000 mph)!',
      'Earth’s glowing auroras (Northern & Southern Lights) happen when our magnetic shield blocks solar wind.'
    ],
    travelTimes: {
      light: '0 seconds (You are here!)',
      voyager1: 'Launched from Cape Canaveral in 1977!',
      jetPlane: '42 hours to fly all the way around the equator'
    }
  },

  moon: {
    id: 'moon',
    name: 'The Moon (Luna)',
    pronunciation: 'LOO-nuh',
    category: 'Natural Satellite',
    scaleIndex: 0,
    badge: '🌕 12 Humans Walked Here',
    color: '#cbd5e1',
    quickStats: [
      { label: 'Distance from Earth', value: '384,400 km (238,855 miles)' },
      { label: 'Diameter', value: '3,475 km (about 1/4 of Earth)' },
      { label: 'Orbit Period', value: '27.3 Days' },
      { label: 'Surface Gravity', value: '1/6th of Earth (Jump 6x higher!)' }
    ],
    kidSummary:
      'The Moon is Earth’s constant rocky partner! You could fit all 7 other planets of the Solar System edge-to-edge in the space between Earth and the Moon on its farthest orbit!',
    funFacts: [
      'Because there is no wind or rain on the Moon, the footprints left by Apollo astronauts in 1969 will stay there for millions of years!',
      'The Moon pulls on Earth’s oceans with gravity, creating high and low tides at the beach.',
      'We always see the same side of the Moon from Earth because it spins once every time it orbits us!'
    ],
    travelTimes: {
      light: '1.28 seconds',
      voyager1: '6.3 hours at top speed',
      apolloRocket: '3 days (Apollo 11 in 1969)'
    }
  },

  iss: {
    id: 'iss',
    name: 'International Space Station (ISS)',
    pronunciation: 'I-S-S',
    category: 'Human Space Laboratory',
    scaleIndex: 0,
    badge: '🛰️ 16 Sunrises Every Day',
    color: '#fde047',
    quickStats: [
      { label: 'Altitude', value: '408 km (254 miles) above Earth' },
      { label: 'Orbital Speed', value: '27,600 km/h (17,150 mph)' },
      { label: 'Size', value: '109 meters (Size of a football field)' },
      { label: 'Orbit Time', value: '90 Minutes per lap' }
    ],
    kidSummary:
      'The International Space Station is a giant science lab floating in low Earth orbit where astronauts live, grow space lettuce, and do zero-gravity experiments!',
    funFacts: [
      'Astronauts on the ISS orbit Earth 16 times every single day—seeing a sunrise or sunset every 45 minutes!',
      'In microgravity, astronauts sleep zipped inside floating sleeping bags strapped to the wall so they don’t drift around.',
      'You can spot the ISS from your backyard at night—it looks like a bright, fast-moving star that never twinkles!'
    ],
    travelTimes: {
      light: '0.0014 seconds',
      spacecraft: '4 to 8 hours after rocket launch'
    }
  },

  // =========================================================================
  // SCALE 1: SOLAR SYSTEM & VOYAGER 1 / 2
  // =========================================================================
  sun: {
    id: 'sun',
    name: 'The Sun (Sol)',
    pronunciation: 'SUN',
    category: 'Yellow Dwarf Star (G2V)',
    scaleIndex: 1,
    badge: '☀️ 99.86% of Solar System Mass',
    color: '#fbbf24',
    quickStats: [
      { label: 'Diameter', value: '1.39 Million km (109x Earth)' },
      { label: 'Core Temperature', value: '15 Million °C (27 Million °F)' },
      { label: 'Age', value: '4.6 Billion Years' },
      { label: 'Light Travel to Earth', value: '8 Minutes 20 Seconds' }
    ],
    kidSummary:
      'The Sun is a gigantic glowing ball of hydrogen and helium plasma at the center of our Solar System. Without its warmth and light, Earth would be a frozen iceball!',
    funFacts: [
      'Over 1.3 million Earths could fit inside the Sun!',
      'Every second, the Sun fuses 600 million tons of hydrogen into helium, creating the sunlight you feel outside.',
      'The Sun blows a bubble of solar wind around all the planets called the Heliosphere—which only Voyager 1 and 2 have ever exited!'
    ],
    travelTimes: {
      light: '8 minutes 20 seconds',
      voyager1: '102 days at 17 km/s',
      jetPlane: '19 years non-stop'
    }
  },

  mercury: {
    id: 'mercury',
    name: 'Mercury',
    pronunciation: 'MER-kyuh-ree',
    category: 'Terrestrial Planet',
    scaleIndex: 1,
    badge: '☄️ Fastest Planet',
    color: '#94a3b8',
    quickStats: [
      { label: 'Distance from Sun', value: '0.39 AU (58 Million km)' },
      { label: 'Year Length', value: '88 Earth Days' },
      { label: 'Moons', value: '0 Moons' },
      { label: 'Temperature Swing', value: '-180°C to +430°C' }
    ],
    kidSummary:
      'Mercury is the smallest planet in our Solar System and closest to the Sun. It zooms around the Sun faster than any other planet!',
    funFacts: [
      'Even though Mercury is closest to the Sun, Venus is actually hotter because Mercury has almost no atmosphere to trap heat!',
      'One solar day on Mercury (sunrise to sunrise) lasts 176 Earth days—twice as long as its 88-day year!'
    ],
    travelTimes: {
      light: '5 minutes from Earth (average)',
      voyager1: '62 days'
    }
  },

  venus: {
    id: 'venus',
    name: 'Venus',
    pronunciation: 'VEE-nus',
    category: 'Terrestrial Planet',
    scaleIndex: 1,
    badge: '🌋 Hottest Planet & Spins Backwards',
    color: '#fb923c',
    quickStats: [
      { label: 'Distance from Sun', value: '0.72 AU (108 Million km)' },
      { label: 'Surface Temp', value: '465°C (869°F) — Melts lead!' },
      { label: 'Year Length', value: '225 Earth Days' },
      { label: 'Moons', value: '0 Moons' }
    ],
    kidSummary:
      'Venus is almost the exact same size as Earth, wrapped in thick golden clouds that trap heat like a super-greenhouse!',
    funFacts: [
      'Venus spins backwards compared to Earth—on Venus, the Sun rises in the west and sets in the east!',
      'Venus spins so slowly that a single day on Venus takes longer than its entire year!'
    ],
    travelTimes: {
      light: '2.3 minutes at closest approach',
      voyager1: '28 days at closest approach'
    }
  },

  mars: {
    id: 'mars',
    name: 'Mars',
    pronunciation: 'MARZ',
    category: 'The Red Planet',
    scaleIndex: 1,
    badge: '🤖 Home of Robot Rovers',
    color: '#ef4444',
    quickStats: [
      { label: 'Distance from Sun', value: '1.52 AU (228 Million km)' },
      { label: 'Year Length', value: '687 Earth Days' },
      { label: 'Moons', value: '2 (Phobos & Deimos)' },
      { label: 'Tallest Volcano', value: 'Olympus Mons (3x Mt. Everest!)' }
    ],
    kidSummary:
      'Mars is a cold, rusty desert planet where NASA rovers like Curiosity and Perseverance drive around looking for signs of ancient water and microbial life!',
    funFacts: [
      'Mars looks red because its soil is covered in iron oxide—the exact same thing as rust on an old bicycle!',
      'Olympus Mons on Mars is a volcano so gigantic that its base would cover the entire state of Arizona.',
      'Sunsets on Mars actually glow blue instead of orange because of fine dust in the Martian sky!'
    ],
    travelTimes: {
      light: '3 to 22 minutes from Earth',
      spacecraft: '7 months by NASA rocket'
    }
  },

  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    pronunciation: 'JOO-pih-ter',
    category: 'Gas Giant King',
    scaleIndex: 1,
    badge: '🌪️ Great Red Spot & 95 Moons',
    color: '#f59e0b',
    quickStats: [
      { label: 'Distance from Sun', value: '5.2 AU (778 Million km)' },
      { label: 'Diameter', value: '139,820 km (11x wider than Earth)' },
      { label: 'Day Length', value: '9 Hours 55 Minutes (Fastest spin!)' },
      { label: 'Known Moons', value: '95 Moons (including Europa & Io)' }
    ],
    kidSummary:
      'Jupiter is the biggest planet in our Solar System! Both Voyager 1 and Voyager 2 flew past Jupiter in 1979, using its giant gravity like a slingshot to boost their speed toward the outer planets.',
    funFacts: [
      'Jupiter’s Great Red Spot is a raging storm bigger than the entire planet Earth that has been swirling for over 300 years!',
      'Jupiter’s icy moon Europa hides a liquid saltwater ocean beneath its crust with twice as much water as all of Earth’s oceans combined.',
      'Voyager 1 discovered that Jupiter actually has faint rings and active volcanoes on its moon Io!'
    ],
    travelTimes: {
      light: '35 to 52 minutes from Earth',
      voyager1: '1.5 years (arrived March 1979)'
    }
  },

  saturn: {
    id: 'saturn',
    name: 'Saturn',
    pronunciation: 'SAT-urn',
    category: 'Ringed Gas Giant',
    scaleIndex: 1,
    badge: '🪐 Jewel of the Solar System',
    color: '#fde68a',
    quickStats: [
      { label: 'Distance from Sun', value: '9.5 AU (1.4 Billion km)' },
      { label: 'Ring Width', value: '282,000 km across (only ~10m thick!)' },
      { label: 'Known Moons', value: '146 Moons (Titan & Enceladus)' },
      { label: 'Density', value: 'Less than water—it could float!' }
    ],
    kidSummary:
      'Saturn is famous for its breathtaking rings made of billions of chunks of sparkling water ice and rock, ranging in size from tiny dust grains to house-sized icebergs!',
    funFacts: [
      'When Voyager 1 flew past Saturn in November 1980, it inspected its giant moon Titan and then bent its path upward out of the planetary plane!',
      'Saturn’s moon Enceladus shoots giant geysers of water ice into space from an underground ocean.',
      'Saturn is so light and fluffy that if you had a bathtub big enough, the whole planet would float in water!'
    ],
    travelTimes: {
      light: '1 hour 20 minutes from Earth',
      voyager1: '3 years 2 months (arrived Nov 1980)'
    }
  },

  uranus: {
    id: 'uranus',
    name: 'Uranus',
    pronunciation: 'YOOR-uh-nus',
    category: 'Ice Giant',
    scaleIndex: 1,
    badge: '🧊 Rolls on Its Side (98° Tilt)',
    color: '#38bdf8',
    quickStats: [
      { label: 'Distance from Sun', value: '19.2 AU (2.9 Billion km)' },
      { label: 'Year Length', value: '84 Earth Years' },
      { label: 'Known Moons', value: '28 Moons (named after Shakespeare!)' },
      { label: 'Voyager 2 Flyby', value: 'January 24, 1986' }
    ],
    kidSummary:
      'Uranus is an icy blue-green giant tilted completely on its side, rolling around the Sun like a bowling ball! Voyager 2 is the ONLY spacecraft in history to visit Uranus.',
    funFacts: [
      'Wait—methane gas in Uranus’s upper atmosphere absorbs red light, giving the planet its cool cyan-blue color!',
      'Scientists think it literally rains real diamonds deep inside Uranus and Neptune!'
    ],
    travelTimes: {
      light: '2 hours 40 minutes from Earth',
      voyager2: '8.5 years (arrived Jan 1986)'
    }
  },

  neptune: {
    id: 'neptune',
    name: 'Neptune',
    pronunciation: 'NEP-toon',
    category: 'Supersonic Ice Giant',
    scaleIndex: 1,
    badge: '💨 Fastest Winds (2,100 km/h)',
    color: '#6366f1',
    quickStats: [
      { label: 'Distance from Sun', value: '30.1 AU (4.5 Billion km)' },
      { label: 'Year Length', value: '165 Earth Years' },
      { label: 'Largest Moon', value: 'Triton (has nitrogen ice geysers!)' },
      { label: 'Voyager 2 Flyby', value: 'August 25, 1989' }
    ],
    kidSummary:
      'Neptune is the farthest major planet from the Sun—30 times farther out than Earth! Voyager 2 zoomed past Neptune in 1989 before diving downward toward interstellar space.',
    funFacts: [
      'Neptune was the first planet found using pure math before anyone ever saw it through a telescope!',
      'Since Neptune was discovered in 1846, it has only completed ONE single 165-year orbit around the Sun (in 2011)!'
    ],
    travelTimes: {
      light: '4 hours 10 minutes from Earth',
      voyager2: '12 years (arrived Aug 1989)'
    }
  },

  voyager1: {
    id: 'voyager1',
    name: 'Voyager 1 Spacecraft',
    pronunciation: 'VOY-uh-jer WUN',
    category: 'Interstellar Robotic Probe',
    scaleIndex: 1,
    badge: '📡 Farthest Human-Made Object Ever!',
    color: '#22d3ee',
    isVoyager: true,
    voyagerKey: 'voyager1',
    quickStats: [
      { label: 'Distance from Sun', value: '~169.8 AU (25.4 Billion km)' },
      { label: 'Speed', value: '17.0 km/s (61,200 km/h / 38,026 mph)' },
      { label: 'Radio Signal Time', value: '~23 Hours 34 Minutes (one way!)' },
      { label: 'Current Location', value: 'Interstellar Space (Ophiuchus direction)' }
    ],
    kidSummary:
      'Launched in 1977, Voyager 1 flew past Jupiter and Saturn, snapped the famous "Pale Blue Dot" photo of Earth from 6 billion km away, and in 2012 became the first human-made object to enter interstellar space!',
    funFacts: [
      'Voyager 1 carries a 12-inch gold-plated copper phonograph record—the Golden Record—filled with greetings in 55 languages, whale songs, thunder, Mozart, and Chuck Berry in case friendly aliens find it!',
      'After flying under Saturn’s moon Titan in 1980, Voyager 1 was flung 35° northward above the flat plane of the planets.',
      'Even traveling at 38,000 mph, it will take Voyager 1 about 40,000 years before it passes within 1.6 light-years of another star (Gliese 445)!'
    ],
    travelTimes: {
      light: '23.5 hours for a radio command from NASA to reach it',
      voyager1: 'Almost 50 years of continuous flight since Sept 5, 1977!'
    }
  },

  voyager2: {
    id: 'voyager2',
    name: 'Voyager 2 Spacecraft',
    pronunciation: 'VOY-uh-jer TOO',
    category: 'Grand Tour Interstellar Probe',
    scaleIndex: 1,
    badge: '🛸 Visited All 4 Giant Planets!',
    color: '#a855f7',
    isVoyager: true,
    voyagerKey: 'voyager2',
    quickStats: [
      { label: 'Distance from Sun', value: '~142.2 AU (21.3 Billion km)' },
      { label: 'Speed', value: '15.37 km/s (55,350 km/h / 34,391 mph)' },
      { label: 'Radio Signal Time', value: '~19 Hours 42 Minutes (one way!)' },
      { label: 'Current Location', value: 'Interstellar Space (Pavo southern sky)' }
    ],
    kidSummary:
      'Voyager 2 actually launched 16 days BEFORE Voyager 1! It is the only spacecraft in history to complete the "Grand Tour" of all four giant outer planets: Jupiter, Saturn, Uranus, and Neptune!',
    funFacts: [
      'After passing Neptune’s icy moon Triton in 1989, Voyager 2 dove 48° southward below the Solar System’s orbital plane.',
      'In November 2018, Voyager 2 crossed the Heliopause—where the Sun’s solar wind stops and cold interstellar space begins!',
      'Like its twin, Voyager 2 carries a Golden Record with instructions on how to play it and a map showing where our Sun is using pulsar stars.'
    ],
    travelTimes: {
      light: '19.7 hours for radio signals from NASA’s Deep Space Network in Australia',
      voyager1: 'Launched August 20, 1977'
    }
  },

  roadster: {
    id: 'roadster',
    name: 'Starman’s Tesla Roadster',
    pronunciation: 'STAR-manz TES-luh ROHD-ster',
    category: 'Heliocentric Artificial Spacecraft (2018-017A)',
    scaleIndex: 1,
    badge: '🚗 Fastest Car in the Universe!',
    color: '#f43f5e',
    isVoyager: true,
    voyagerKey: 'roadster',
    quickStats: [
      { label: 'Orbit Around Sun', value: '0.986 – 1.664 AU (557.2-day period)' },
      { label: 'Launch Date', value: 'February 6, 2018 (Falcon Heavy Maiden Flight)' },
      { label: 'Driver', value: 'Starman (SpaceX spacesuit mannequin)' },
      { label: 'JPL Horizons ID', value: '-143205 (COSPAR 2018-017A)' }
    ],
    kidSummary:
      'On February 6, 2018, Elon Musk’s Midnight Cherry 2010 Tesla Roadster—with a mannequin named "Starman" wearing a SpaceX spacesuit in the driver’s seat—was launched into a Mars-crossing orbit around the Sun on the maiden flight of the Falcon Heavy rocket!',
    funFacts: [
      'Printed right on the dashboard screen in big friendly letters are the words "DON’T PANIC!"—a tribute to Douglas Adams’s The Hitchhiker’s Guide to the Galaxy!',
      'Inside the car is a tiny Arch 5D quartz crystal disc holding Isaac Asimov’s entire Foundation sci-fi trilogy, designed to survive in space for billions of years.',
      'A plaque on the car’s circuit board is engraved with the names of over 6,000 SpaceX employees, along with the message "Made on Earth by humans."',
      'Starman’s Roadster completes one elliptical lap around the Sun every 557 days, swinging from Earth’s orbit (0.99 AU) out past the orbit of Mars (1.66 AU)!'
    ],
    travelTimes: {
      light: 'Ranges from ~3 to 22 light-minutes from Earth depending on orbit',
      spacecraft: 'Orbits the Sun every 1.52 Earth years (557 days)'
    }
  },

  heliopause: {
    id: 'heliopause',
    name: 'The Heliopause (Edge of Solar Wind)',
    pronunciation: 'HEE-lee-oh-pawz',
    category: 'Solar System Boundary Bubble',
    scaleIndex: 1,
    badge: '🛡️ Where Interstellar Space Begins',
    color: '#38bdf8',
    quickStats: [
      { label: 'Distance from Sun', value: '~120 AU (18 Billion km)' },
      { label: 'Crossed by Voyager 1', value: 'August 25, 2012 (at 121.6 AU)' },
      { label: 'Crossed by Voyager 2', value: 'November 5, 2018 (at 119.7 AU)' },
      { label: 'What It Blocks', value: '70% of dangerous galactic cosmic rays' }
    ],
    kidSummary:
      'The Sun blows a giant protective magnetic bubble around all the planets called the Heliosphere. Its outer boundary—the Heliopause—is where the Sun’s wind pushes against the gas between the stars. Both Voyager 1 and 2 have broken through this bubble!',
    funFacts: [
      'Without the Heliosphere bubble shielding us, cosmic radiation from distant exploding stars would bombard Earth!',
      'Even beyond the Heliopause lies the Oort Cloud—a giant sphere of icy comets stretching up to 1.5 light-years away.'
    ],
    travelTimes: {
      light: '16.6 hours from the Sun',
      voyager1: '35 years of flight (1977–2012)'
    }
  },

  // =========================================================================
  // SCALE 2: NEARBY STARS & EXOPLANETS
  // =========================================================================
  alphaCentauri: {
    id: 'alphaCentauri',
    name: 'Alpha Centauri & Proxima Centauri b',
    pronunciation: 'AL-fuh sen-TOR-ee',
    category: 'Closest Star System & Habitable-Zone Exoplanet',
    scaleIndex: 2,
    badge: '🪐 Closest Exoplanet (4.24 ly)!',
    color: '#fde047',
    hasExoplanets: true,
    exoplanets: [
      {
        name: 'Proxima Centauri b',
        type: 'Rocky Super-Earth (1.07x Earth Mass)',
        orbit: '11.2 Earth Days (In the Habitable "Goldilocks" Zone!)',
        temp: 'Could hold liquid water if it has an atmosphere!'
      },
      {
        name: 'Proxima Centauri d',
        type: 'Sub-Earth Rocky World (0.26x Earth Mass)',
        orbit: '5.1 Earth Days (Very close to Proxima Centauri)',
        temp: 'Warm rocky world discovered in 2022'
      }
    ],
    quickStats: [
      { label: 'Distance from Earth', value: '4.24 to 4.37 Light-Years (40 Trillion km!)' },
      { label: 'Stars in System', value: '3 Stars (Rigil Kentaurus A, Toliman B, Proxima C)' },
      { label: 'Confirmed Exoplanets', value: '2+ around Proxima Centauri' },
      { label: 'Voyager 1 Travel Time', value: '~75,000 Years at 17 km/s!' }
    ],
    kidSummary:
      'Alpha Centauri is our Sun’s closest stellar neighbor! It is actually a triple-star dance: two bright Sun-like stars (Alpha Centauri A & B) plus a small red dwarf star, Proxima Centauri, which hosts Proxima b—the closest known exoplanet to Earth, right inside the habitable zone!',
    funFacts: [
      'If you stood on exoplanet Proxima Centauri b, your "year" (one birthday!) would happen every 11 days!',
      'Looking back from Alpha Centauri, our own Sun would look like a bright yellow star right inside the W-shaped constellation Cassiopeia!',
      'Scientists are designing tiny laser-pushed "nanocraft" with light sails (Breakthrough Starshot) that could fly to Alpha Centauri at 20% the speed of light in just 20 years!'
    ],
    travelTimes: {
      light: '4 years and 3 months at the speed of light',
      voyager1: '75,000 years at Voyager 1’s speed',
      jetPlane: '4.8 million years non-stop!'
    }
  },

  barnardsStar: {
    id: 'barnardsStar',
    name: "Barnard's Star & Barnard b",
    pronunciation: 'BAR-nerdz STAR',
    category: 'Red Dwarf with Sub-Earth Exoplanet',
    scaleIndex: 2,
    badge: '🏃 Fastest-Moving Star in Our Sky',
    color: '#fb7185',
    hasExoplanets: true,
    exoplanets: [
      {
        name: 'Barnard b',
        type: 'Rocky Sub-Earth (0.37x Earth Mass — about half of Venus)',
        orbit: '3.15 Earth Days',
        temp: 'Confirmed in 2024 with ESO’s Very Large Telescope!'
      }
    ],
    quickStats: [
      { label: 'Distance from Earth', value: '5.96 Light-Years' },
      { label: 'Star Type', value: 'Ancient Red Dwarf (10 Billion Years Old)' },
      { label: 'Confirmed Exoplanet', value: 'Barnard b (plus 3 candidate worlds!)' }
    ],
    kidSummary:
      "Barnard's Star is the second-closest star system to our Sun after Alpha Centauri. In 2024, astronomers confirmed a small rocky exoplanet (Barnard b) whipping around it every 3 days!",
    funFacts: [
      "Barnard's Star is zooming toward our Solar System at 110 km/s—around the year 11,800 AD, it will pass within 3.75 light-years and temporarily become our closest star!"
    ],
    travelTimes: {
      light: '5.96 years',
      voyager1: '105,000 years'
    }
  },

  sirius: {
    id: 'sirius',
    name: 'Sirius A & B (The Dog Star)',
    pronunciation: 'SEER-ee-us',
    category: 'Brightest Star in Earth’s Night Sky',
    scaleIndex: 2,
    badge: '💎 25x Brighter Than Our Sun',
    color: '#93c5fd',
    hasExoplanets: false,
    quickStats: [
      { label: 'Distance from Earth', value: '8.6 Light-Years' },
      { label: 'Stars in System', value: 'Sirius A (Blue-White) + Sirius B (White Dwarf)' },
      { label: 'Constellation', value: 'Canis Major (The Big Dog)' }
    ],
    kidSummary:
      'Sirius is the brightest star you can see in the night sky! It has a tiny, super-dense companion star called Sirius B ("The Pup") that packs the mass of our entire Sun into a sphere the size of Earth!',
    funFacts: [
      'A single teaspoon of material from the white dwarf star Sirius B would weigh as much as a full-grown African elephant (5 tons)!'
    ],
    travelTimes: {
      light: '8.6 years',
      voyager1: '151,000 years'
    }
  },

  epsilonEridani: {
    id: 'epsilonEridani',
    name: 'Epsilon Eridani (Ran)',
    pronunciation: 'EP-sih-lon eh-RID-uh-nee',
    category: 'Young Sun-Like Star with Giant Planet & Asteroid Belts',
    scaleIndex: 2,
    badge: '🪐 Closest Planetary System to a Sun-like Star',
    color: '#fdba74',
    hasExoplanets: true,
    exoplanets: [
      {
        name: 'Epsilon Eridani b (AEgir)',
        type: 'Jupiter-like Gas Giant (0.78x Jupiter Mass)',
        orbit: '7.3 Earth Years (~3.5 AU from its star)',
        temp: 'Orbits right beside icy debris & comet belts!'
      }
    ],
    quickStats: [
      { label: 'Distance from Earth', value: '10.5 Light-Years' },
      { label: 'Star Age', value: 'Only ~600 Million Years (A baby Solar System!)' },
      { label: 'Debris Rings', value: '2 Asteroid Belts + Outer Comet Ring' }
    ],
    kidSummary:
      'Epsilon Eridani looks like a time-machine snapshot of what our own Solar System looked like 4 billion years ago—complete with asteroid belts and a giant Jupiter-sized planet (AEgir)!',
    funFacts: [
      'In 1960, Epsilon Eridani was the very first star astronomers ever listened to with radio telescopes (Project Ozma) searching for alien signals!'
    ],
    travelTimes: {
      light: '10.5 years',
      voyager1: '185,000 years'
    }
  },

  tauCeti: {
    id: 'tauCeti',
    name: 'Tau Ceti',
    pronunciation: 'TOW SEE-tee',
    category: 'Closest Single Sun-Like Star with Multi-Planet System',
    scaleIndex: 2,
    badge: '🌍 4 Super-Earth Exoplanet Candidates',
    color: '#fef08a',
    hasExoplanets: true,
    exoplanets: [
      {
        name: 'Tau Ceti e',
        type: 'Super-Earth (3.9x Earth Mass)',
        orbit: '163 Days (Inner edge of the Habitable Zone!)',
        temp: 'Warm ocean or greenhouse world'
      },
      {
        name: 'Tau Ceti f',
        type: 'Super-Earth (3.9x Earth Mass)',
        orbit: '636 Days (Outer edge of the Habitable Zone!)',
        temp: 'Cool rocky/icy world inside a thick debris belt'
      }
    ],
    quickStats: [
      { label: 'Distance from Earth', value: '11.9 Light-Years' },
      { label: 'Star Type', value: 'G8V Yellow Dwarf (Very similar to our Sun!)' },
      { label: 'Known Worlds', value: '4 Super-Earth planets (g, h, e, f)' }
    ],
    kidSummary:
      'Tau Ceti is the closest single star that is almost a twin of our yellow Sun! It hosts at least four super-Earth planets, two of which orbit near its habitable zone.',
    funFacts: [
      'Tau Ceti has 10 times more comets and asteroids swirling around it than our Solar System does!'
    ],
    travelTimes: {
      light: '11.9 years',
      voyager1: '210,000 years'
    }
  },

  trappist1: {
    id: 'trappist1',
    name: 'TRAPPIST-1 System (7 Earth-Sized Worlds!)',
    pronunciation: 'TRAP-ist WUN',
    category: 'Ultra-Cool Dwarf with 7 Rocky Exoplanets',
    scaleIndex: 2,
    badge: '🏆 3 Planets in the Habitable Zone!',
    color: '#f43f5e',
    hasExoplanets: true,
    exoplanets: [
      {
        name: 'TRAPPIST-1e',
        type: 'Earth-Sized Rocky World (0.92x Earth Radius)',
        orbit: '6.1 Days (Prime Habitable Zone!)',
        temp: 'Best candidate for liquid water oceans!'
      },
      {
        name: 'TRAPPIST-1f & 1g',
        type: 'Earth-Sized Rocky Worlds (1.04x & 1.13x Earth Radius)',
        orbit: '9.2 Days & 12.3 Days (Habitable Zone)',
        temp: 'Water-rich worlds studied by the James Webb Space Telescope'
      },
      {
        name: 'TRAPPIST-1b, c, d, h',
        type: '4 Additional Rocky Planets',
        orbit: '1.5 to 18.7 Days',
        temp: 'All 7 planets fit closer to their star than Mercury is to our Sun!'
      }
    ],
    quickStats: [
      { label: 'Distance from Earth', value: '40.7 Light-Years' },
      { label: 'Total Rocky Planets', value: '7 Earth-Sized Planets (b, c, d, e, f, g, h)' },
      { label: 'Habitable Zone Worlds', value: '3 Worlds (e, f, g)' },
      { label: 'Star Size', value: 'Barely larger than Jupiter!' }
    ],
    kidSummary:
      'TRAPPIST-1 is one of the most exciting discoveries in astronomy! Seven rocky, Earth-sized planets orbit a tiny glowing red star so closely that if you stood on one planet, the neighboring planets in the sky would look bigger than our full Moon!',
    funFacts: [
      'The James Webb Space Telescope is actively peering at TRAPPIST-1’s planets right now to sniff their atmospheres for water vapor and carbon dioxide!',
      'The planets orbit in a musical "orbital resonance"—their orbits lock together in rhythmic mathematical ratios!'
    ],
    travelTimes: {
      light: '40.7 years',
      voyager1: '718,000 years'
    }
  },

  pegasi51: {
    id: 'pegasi51',
    name: '51 Pegasi & Dimidium (51 Pegasi b)',
    pronunciation: 'FIF-tee-wun PEG-uh-see',
    category: 'First Exoplanet Discovered Around a Sun-Like Star',
    scaleIndex: 2,
    badge: '🏅 Nobel Prize Discovery (1995)',
    color: '#c084fc',
    hasExoplanets: true,
    exoplanets: [
      {
        name: '51 Pegasi b (Dimidium)',
        type: 'Hot Jupiter Gas Giant (Half the mass of Jupiter)',
        orbit: 'Just 4.23 Days (20x closer to its star than Earth is to the Sun!)',
        temp: '1,000°C (1,800°F) glowing hot atmosphere!'
      }
    ],
    quickStats: [
      { label: 'Distance from Earth', value: '50.6 Light-Years' },
      { label: 'Discovery Year', value: '1995 (Won the 2019 Nobel Prize in Physics)' },
      { label: 'Planet Type', value: 'Prototype "Hot Jupiter"' }
    ],
    kidSummary:
      'In 1995, 51 Pegasi b became the very first exoplanet ever discovered orbiting a normal Sun-like star—proving that other stars across the galaxy have planets too! Since then, astronomers have found over 5,700 exoplanets!',
    funFacts: [
      'Before 51 Pegasi b was found, nobody thought a giant planet like Jupiter could orbit so close to its star that its entire year lasts only 4 days!'
    ],
    travelTimes: {
      light: '50.6 years',
      voyager1: '890,000 years'
    }
  },

  // =========================================================================
  // SCALE 3: THE MILKY WAY GALAXY
  // =========================================================================
  orionSpur: {
    id: 'orionSpur',
    name: 'Orion Arm ("You Are Here!")',
    pronunciation: 'oh-RY-un ARM',
    category: 'Our Solar System’s Galactic Neighborhood',
    scaleIndex: 3,
    badge: '📍 You Are Here in the Milky Way!',
    color: '#38bdf8',
    quickStats: [
      { label: 'Distance from Galactic Center', value: '26,670 Light-Years' },
      { label: 'Galactic Speed', value: '828,000 km/h (514,000 mph)' },
      { label: 'Galactic Year', value: '230 Million Earth Years per lap!' },
      { label: 'Local Structure', value: 'Local Bubble (300 ly wide cavity)' }
    ],
    kidSummary:
      'Every star you see with your naked eyes at night lives inside a tiny circle around this spot in the Orion Arm! Our entire Solar System orbits the center of the Milky Way once every 230 million years.',
    funFacts: [
      'The last time our Solar System was in this exact spot of its galactic orbit, early dinosaurs were just starting to walk on Earth!',
      'Our Sun and nearby stars sit inside the "Local Bubble," a 1,000-light-year cavity carved out by ancient supernova explosions.'
    ],
    travelTimes: {
      light: '26,670 years to reach the center of the Milky Way',
      voyager1: '470 million years to reach the Galactic Center'
    }
  },

  sagittariusA: {
    id: 'sagittariusA',
    name: 'Sagittarius A* (Galactic Center Black Hole)',
    pronunciation: 'saj-ih-TAIR-ee-us AY-star',
    category: 'Supermassive Black Hole',
    scaleIndex: 3,
    badge: '🕳️ 4.3 Million Suns in Mass',
    color: '#f97316',
    quickStats: [
      { label: 'Mass', value: '4.3 Million times our Sun' },
      { label: 'Distance from Earth', value: '26,670 Light-Years' },
      { label: 'Event Horizon Width', value: '24 Million km (Fits inside Mercury’s orbit)' },
      { label: 'First Photographed', value: 'May 2022 (Event Horizon Telescope)' }
    ],
    kidSummary:
      'At the exact heart of our Milky Way Galaxy sits Sagittarius A*, a supermassive black hole whose gravity is so strong that nearby stars whip around it at 24 million km/h!',
    funFacts: [
      'Don’t worry—Sagittarius A* is 26,670 light-years away and is NOT sucking in our galaxy; stars orbit it safely just like planets orbit the Sun!',
      'In 2022, astronomers linked radio telescopes across the whole planet Earth to take the first real picture of the glowing ring around Sagittarius A*!'
    ],
    travelTimes: {
      light: '26,670 years'
    }
  },

  milkyWayDisk: {
    id: 'milkyWayDisk',
    name: 'The Milky Way Galaxy',
    pronunciation: 'MIL-kee WAY',
    category: 'Barred Spiral Galaxy (SBbc)',
    scaleIndex: 3,
    badge: '🌌 200–400 Billion Stars & Trillions of Planets',
    color: '#a78bfa',
    quickStats: [
      { label: 'Diameter', value: '105,700 Light-Years Across' },
      { label: 'Total Stars', value: '200 to 400 Billion Stars' },
      { label: 'Estimated Planets', value: 'Over 100 Billion Exoplanets!' },
      { label: 'Age', value: '13.6 Billion Years' }
    ],
    kidSummary:
      'The Milky Way is our cosmic island—a colossal pinwheel of stars, glowing nebulae where baby stars are born, and spiral arms (Perseus, Scutum-Centaurus, Sagittarius, and Orion).',
    funFacts: [
      'If our entire Solar System (all the way out to Neptune) were shrunk to the size of a US quarter coin, the Milky Way Galaxy would still be as wide as the entire North American continent!',
      'Almost every star in the Milky Way has at least one planet on average—meaning there are hundreds of billions of worlds in our galaxy alone!'
    ],
    travelTimes: {
      light: '105,700 years to fly from one edge of the Milky Way to the other!'
    }
  },

  // =========================================================================
  // SCALE 4: LOCAL GROUP & OBSERVABLE UNIVERSE
  // =========================================================================
  andromeda: {
    id: 'andromeda',
    name: 'Andromeda Galaxy (M31)',
    pronunciation: 'an-DROM-eh-duh',
    category: 'Nearest Giant Spiral Galaxy',
    scaleIndex: 4,
    badge: '🌀 1 Trillion Stars (Farthest Naked-Eye Object)',
    color: '#c084fc',
    quickStats: [
      { label: 'Distance from Milky Way', value: '2.537 Million Light-Years' },
      { label: 'Diameter', value: '152,000 Light-Years Across' },
      { label: 'Total Stars', value: '~1 Trillion Stars (More than 2x the Milky Way!)' },
      { label: 'Approach Speed', value: '110 km/s (400,000 km/h) toward us!' }
    ],
    kidSummary:
      'Andromeda is our giant neighbor in the Local Group of galaxies! On a dark night, you can actually see it with your own eyes as a faint fuzzy oval—the light hitting your eye left Andromeda 2.5 million years ago!',
    funFacts: [
      'Andromeda and the Milky Way are gently pulling toward each other and will merge in about 4.5 billion years to form a giant elliptical galaxy nicknamed "Milkomeda"!',
      'Because space between stars is so huge, when the two galaxies merge, almost zero individual stars will actually bump into each other!'
    ],
    travelTimes: {
      light: '2,537,000 years at the speed of light!'
    }
  },

  triangulum: {
    id: 'triangulum',
    name: 'Triangulum Galaxy (M33)',
    pronunciation: 'try-ANG-gyuh-lum',
    category: 'Third-Largest Galaxy in Our Local Group',
    scaleIndex: 4,
    badge: '✨ 40 Billion Stars',
    color: '#60a5fa',
    quickStats: [
      { label: 'Distance', value: '2.73 Million Light-Years' },
      { label: 'Diameter', value: '61,000 Light-Years' },
      { label: 'Total Stars', value: '~40 Billion Stars' }
    ],
    kidSummary:
      'Together with Andromeda, the Milky Way, and dozens of smaller dwarf galaxies (like the Large and Small Magellanic Clouds), Triangulum forms our "Local Group" of galaxies!',
    funFacts: [
      'Triangulum is a star-making factory, creating bright blue baby stars much faster for its size than our Milky Way!'
    ],
    travelTimes: {
      light: '2,730,000 years'
    }
  },

  laniakea: {
    id: 'laniakea',
    name: 'Laniakea Supercluster & The Cosmic Web',
    pronunciation: 'lah-nee-uh-KAY-uh',
    category: 'Supercluster of 100,000 Galaxies',
    scaleIndex: 4,
    badge: '🕸️ "Immeasurable Heaven" in Hawaiian',
    color: '#f472b6',
    quickStats: [
      { label: 'Width', value: '520 Million Light-Years Across' },
      { label: 'Total Galaxies', value: '~100,000 Galaxies' },
      { label: 'Observable Universe', value: '93 Billion Light-Years Across (2 Trillion Galaxies!)' },
      { label: 'Age of Universe', value: '13.8 Billion Years' }
    ],
    kidSummary:
      'Zoom out to the grandest scale of all! Our Milky Way is just one tiny glowing dot on the outskirts of the Laniakea Supercluster—part of the giant Cosmic Web where billions of galaxies form glowing filaments separated by vast cosmic voids!',
    funFacts: [
      'There are more stars in the observable universe than there are grains of sand on every beach and desert on planet Earth combined!',
      'Every atom of calcium in your bones, iron in your blood, and gold on Earth was forged inside ancient stars across this universe billions of years ago—as Carl Sagan said, we are truly made of starstuff!'
    ],
    travelTimes: {
      light: '93 Billion Light-Years across the expanding Observable Universe!'
    }
  }
};

/**
 * Guided Cosmic Tour Stops for Kids ("Autopilot Cosmic Journey")
 * zoomValue: null → the engine picks the best framing for the object.
 */
export const GUIDED_TOUR_STOPS = [
  {
    objectId: 'earth',
    scaleIndex: 0,
    zoomValue: 4.5,
    yaw: -0.9,
    pitch: 0.2,
    title: 'Stop 1: Spaceship Earth',
    narration:
      'Welcome aboard the Cosmic Explorer! We begin at home on Planet Earth—a real NASA map of our blue ocean world, with the day and night sides exactly where they are right now, and the International Space Station circling just 408 kilometers overhead.'
  },
  {
    objectId: 'moon',
    scaleIndex: 0,
    zoomValue: 2.6,
    yaw: -0.4,
    pitch: 0.35,
    title: 'Stop 2: Our Companion, the Moon',
    narration:
      'Zooming out 384,400 kilometers, here is our Moon at its true distance, showing tonight’s real phase! Twelve Apollo astronauts walked on its dusty craters, and light takes just 1.3 seconds to leap from Earth to the Moon.'
  },
  {
    objectId: 'saturn',
    scaleIndex: 1,
    zoomValue: null,
    yaw: 0.7,
    pitch: 0.3,
    title: 'Stop 3: Saturn and its Rings',
    narration:
      'Let’s fly to Saturn! Its rings are made of billions of chunks of ice, and you can see the planet’s shadow falling across them. Titan and Enceladus circle nearby.'
  },
  {
    objectId: 'sun',
    scaleIndex: 1,
    zoomValue: 37,
    yaw: -0.6,
    pitch: 0.62,
    title: 'Stop 4: The Whole Solar System',
    narration:
      'Now we zoom out billions of kilometers! At the center shines our Sun, surrounded by the rocky worlds Mercury, Venus, Earth and Mars, the asteroid belt, and the giants Jupiter, Saturn, Uranus and Neptune—all in their real positions for today’s date.'
  },
  {
    objectId: 'voyager1',
    scaleIndex: 1,
    zoomValue: 43,
    yaw: -0.2,
    pitch: 0.5,
    title: 'Stop 5: Voyager 1 & 2 in Interstellar Space!',
    narration:
      'Look past all the planets and the glowing blue heliopause bubble! Those cyan and purple paths are the real routes of NASA’s Voyager 1 and Voyager 2—launched in 1977, flung past the giant planets, and now over 21 to 25 billion kilometers away, carrying the Golden Record to the stars.'
  },
  {
    objectId: 'proximaCentauri',
    scaleIndex: 2,
    zoomValue: null,
    yaw: 0.3,
    pitch: 0.45,
    title: 'Stop 6: Proxima Centauri b — the Nearest Exoplanet',
    narration:
      'Jumping thousands of times farther, to 4.2 light-years! This small red star is Proxima Centauri, part of the Alpha Centauri system. Its planet Proxima b sits in the green habitable zone, where liquid water could exist.'
  },
  {
    objectId: 'trappist1',
    scaleIndex: 2,
    zoomValue: null,
    yaw: -0.5,
    pitch: 0.55,
    title: 'Stop 7: TRAPPIST-1’s Seven Worlds',
    narration:
      'At 40.7 light-years away lies TRAPPIST-1, a star barely bigger than Jupiter, orbited by seven Earth-sized rocky planets—three of them in the Goldilocks zone where oceans could shimmer.'
  },
  {
    objectId: 'sun',
    scaleIndex: 2,
    zoomValue: 60,
    yaw: 0.9,
    pitch: 0.3,
    title: 'Stop 8: Our Stellar Neighbourhood',
    narration:
      'Pull back and the Sun becomes one star among many: Sirius, Procyon, Vega, Altair and dozens of neighbours, all at their true positions in space, with the band of the Milky Way glowing behind them.'
  },
  {
    objectId: 'sagittariusA',
    scaleIndex: 3,
    zoomValue: 84,
    faceOnGalaxy: true,
    title: 'Stop 9: The Milky Way Galaxy',
    narration:
      'Zooming out to 100,000 light-years! Every star we just visited sits in a tiny spot on the Orion Spur of the Milky Way—a barred spiral of over 200 billion stars with a supermassive black hole, Sagittarius A*, at its heart.'
  },
  {
    objectId: 'andromeda',
    scaleIndex: 4,
    zoomValue: 90.5,
    yaw: 0.6,
    pitch: 0.5,
    title: 'Stop 10: Andromeda and the Local Group',
    narration:
      'Two and a half million light-years away floats the Andromeda Galaxy, our giant neighbour of a trillion stars. Together with the Milky Way, Triangulum and dozens of dwarf galaxies, it forms our Local Group.'
  },
  {
    objectId: 'laniakea',
    scaleIndex: 4,
    zoomValue: 96.5,
    yaw: 1.0,
    pitch: 0.4,
    title: 'Stop 11: The Cosmic Web',
    narration:
      'Finally, billions of light-years! Galaxies gather into clusters, clusters into superclusters like Laniakea, and superclusters into the glowing filaments of the cosmic web around enormous empty voids. You just traveled across the entire observable universe!'
  }
];

/**
 * Interactive Junior Astronaut Quiz Questions
 */
export const SPACE_QUIZ_QUESTIONS = [
  {
    question: 'Which human-made spacecraft is the farthest from Earth right now?',
    options: [
      'International Space Station',
      'Voyager 1',
      'Apollo 11',
      'Hubble Space Telescope'
    ],
    correctIndex: 1,
    explanation:
      'Correct! Voyager 1 launched in 1977 and is now over 25 billion kilometers (~170 AU) away in interstellar space!'
  },
  {
    question: 'What is the closest star system to our Sun, and does it have an exoplanet?',
    options: [
      'Sirius (No planets)',
      'Alpha Centauri / Proxima Centauri (Yes, Proxima b!)',
      'Betelgeuse (10 planets)',
      'Polaris, the North Star'
    ],
    correctIndex: 1,
    explanation:
      'Spot on! Alpha Centauri is just 4.24 light-years away, and its red dwarf star Proxima Centauri hosts the rocky exoplanet Proxima b in its habitable zone!'
  },
  {
    question: 'What special treasure do both Voyager 1 and Voyager 2 carry for any alien civilization that might find them?',
    options: [
      'A map to buried pirate treasure',
      'The Golden Record with Earth sounds, music, and greetings in 55 languages',
      'A box of chocolate chip cookies',
      'A trophy from NASA'
    ],
    correctIndex: 1,
    explanation:
      'Yes! Both Voyagers carry the 12-inch gold-plated copper Golden Record curated by Carl Sagan!'
  },
  {
    question: 'How many Earth-sized rocky exoplanets orbit the nearby star TRAPPIST-1?',
    options: ['Just 1 planet', '3 planets', '7 Earth-sized rocky planets!', '100 planets'],
    correctIndex: 2,
    explanation:
      'Amazing! TRAPPIST-1 has 7 rocky Earth-sized worlds (b, c, d, e, f, g, h), with 3 inside the habitable Goldilocks Zone!'
  },
  {
    question: 'What is the name of the giant spiral galaxy next door to our Milky Way (2.5 million light-years away)?',
    options: [
      'The Andromeda Galaxy (M31)',
      'The Sombrero Galaxy',
      'The Whirlpool Galaxy',
      'Alpha Centauri'
    ],
    correctIndex: 0,
    explanation:
      'You got it! The Andromeda Galaxy has around 1 trillion stars and is the farthest object you can see with your naked eye on a dark night!'
  }
];
