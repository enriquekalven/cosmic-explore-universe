/**
 * describe.js — generates kid-friendly inspector content for catalog objects that don't have
 * hand-written entries in cosmicData.js (stars, exoplanets, moons, galaxies, structures…).
 */
import { STAR_BY_ID, STARS } from './starCatalog.js';
import { GALAXY_BY_ID } from './galaxyCatalog.js';
import { PLANETS, DWARF_PLANETS } from './solarSystemData.js';
import { EXOPLANET_SYSTEMS, EXOPLANET_TYPES, EXOPLANET_METHODS } from './exoplanetArchive.js';
import { LY_IN_AU, formatNumber } from '../engine/astro.js';

const VOYAGER1_KM_S = 16.999;
const JET_KM_H = 900;
const LY_KM = 9.4607e12;

const ARCHIVE_BY_SLUG = new Map();
for (const row of EXOPLANET_SYSTEMS) {
  const [host, ra, dec, dist, sp, teff, radius, mass, lum, rawPlanets] = row;
  ARCHIVE_BY_SLUG.set(`exo:${slug(host)}`, { host, ra, dec, dist, sp, teff, radius, mass, lum, rawPlanets });
}

function travelTimesForLy(ly) {
  const km = ly * LY_KM;
  const voyagerYears = km / VOYAGER1_KM_S / 3600 / 24 / 365.25;
  const jetYears = km / JET_KM_H / 24 / 365.25;
  return {
    light: ly < 1 ? `${(ly * 365.25).toFixed(1)} days` : `${formatNumber(ly, ly < 100 ? 1 : 0)} years at the speed of light`,
    voyager1: `${bigYears(voyagerYears)} at Voyager 1’s speed`,
    jetPlane: `${bigYears(jetYears)} in a passenger jet`
  };
}

function bigYears(y) {
  if (y < 1e3) return `${formatNumber(y, 0)} years`;
  if (y < 1e6) return `${formatNumber(y / 1e3, 1)} thousand years`;
  if (y < 1e9) return `${formatNumber(y / 1e6, 1)} million years`;
  return `${formatNumber(y / 1e9, 1)} billion years`;
}

function spectralWords(sp) {
  const l = (sp || '').replace(/^sd/, '')[0];
  return (
    {
      O: 'a blazing blue giant star',
      B: 'a hot blue-white star',
      A: 'a bright white star',
      F: 'a yellow-white star a bit hotter than our Sun',
      G: 'a yellow star much like our Sun',
      K: 'an orange star cooler than our Sun',
      M: 'a small, cool red dwarf star',
      L: 'a brown dwarf — a failed star',
      T: 'a cold brown dwarf',
      D: 'a white dwarf — the dense leftover core of a dead star'
    }[l] || 'a star'
  );
}

export function describeArchiveSystem(id) {
  const rec = ARCHIVE_BY_SLUG.get(id);
  if (!rec) return null;
  const planets = rec.rawPlanets.map((p) => {
    const [suffix, a, period, radius, mass, eqt, typeIdx, hzFlag, discYear, methodIdx] = p;
    const pName = suffix.length <= 2 ? `${rec.host} ${suffix}` : suffix;
    const typeStr = EXOPLANET_TYPES[typeIdx] || 'rocky';
    const methodStr = EXOPLANET_METHODS[methodIdx] || 'Transit';
    return { name: pName, a, period, radius, mass, eqt, type: typeStr, hz: hzFlag === 1, discYear, method: methodStr };
  });
  const hzCount = planets.filter((p) => p.hz).length;
  const summary = `${rec.host} is ${spectralWords(rec.sp)} (${rec.teff} K) located ${rec.dist < 100 ? rec.dist.toFixed(1) : formatNumber(rec.dist)} light-years from Earth in the NASA Exoplanet Archive, hosting ${planets.length} confirmed exoplanet${planets.length > 1 ? 's' : ''}${hzCount ? ` — including ${hzCount} in the habitable zone!` : '.'}`;
  const stats = [
    { label: 'Distance from Earth', value: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} light-years` },
    { label: 'Star type & Temp', value: `${rec.sp} (${rec.teff} K)` },
    { label: 'Size & Mass vs Sun', value: `${formatNumber(rec.radius, 2)} R☉ • ${formatNumber(rec.mass, 2)} M☉` },
    { label: 'Confirmed Exoplanets', value: `${planets.length}${hzCount ? ` (${hzCount} in Habitable Zone)` : ''}` }
  ];
  const facts = [
    `Cataloged in the official NASA Exoplanet Archive with ${planets.length} confirmed world${planets.length > 1 ? 's' : ''}.`,
    `Light leaving ${rec.host} takes ${rec.dist < 100 ? rec.dist.toFixed(1) : formatNumber(rec.dist)} years to reach Earth.`
  ];
  if (planets.length) {
    const p0 = planets.find((x) => x.hz) || planets[0];
    facts.push(`${p0.name} was discovered in ${p0.discYear} via ${p0.method} (${formatNumber(p0.radius, 2)}× Earth radius, ${formatNumber(p0.mass, 1)}× Earth mass).`);
  }
  return {
    name: rec.host,
    pronunciation: '',
    category: `NASA Exoplanet Archive System (${rec.sp})`,
    badge: hzCount ? '🌱 Habitable-Zone System!' : planets.length >= 3 ? `🪐 ${planets.length}-Planet System` : '🪐 Confirmed Exoplanet Host',
    kidSummary: summary,
    quickStats: stats,
    funFacts: facts,
    travelTimes: travelTimesForLy(rec.dist),
    exoplanets: planets.map((p) => ({
      name: p.name,
      type: `${p.type[0].toUpperCase()}${p.type.slice(1)} world • ${formatNumber(p.radius, 2)} R⊕ (${formatNumber(p.mass, 1)} M⊕)`,
      orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' days' : (p.period / 365.25).toFixed(1) + ' years'} • ${p.a} AU`,
      temp: `${p.hz ? '🌱 Habitable Zone • ' : ''}~${p.eqt} K (${Math.round(p.eqt - 273.15)} °C) • ${p.method} (${p.discYear})`
    })),
    hasExoplanets: true
  };
}

export function describeStar(id) {
  if (id.startsWith('exo:')) return describeArchiveSystem(id);
  const s = STAR_BY_ID[id];
  if (!s) return null;
  const isNeb = s.kind === 'nebula' || s.kind === 'cluster' || s.kind === 'globular';
  const planets = s.planets || [];
  const hzCount = planets.filter((p) => p.hz).length;
  const summary =
    s.blurb ||
    (isNeb
      ? `${s.name} is ${s.kind === 'nebula' ? 'a glowing cloud of gas and dust' : 'a cluster of stars'} about ${formatNumber(s.dist)} light-years away.`
      : `${s.name} is ${spectralWords(s.sp)}, ${s.dist < 100 ? s.dist.toFixed(1) : formatNumber(s.dist)} light-years from Earth${
          planets.length ? `, with ${planets.length} known planet${planets.length > 1 ? 's' : ''}${hzCount ? ` — ${hzCount} in the habitable zone!` : '.'}` : '.'
        }`);
  const stats = [
    { label: 'Distance from Earth', value: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} light-years (${formatNumber(s.dist * LY_IN_AU / 1e3, 0)} thousand AU)` }
  ];
  if (!isNeb) {
    stats.push({ label: 'Star type', value: s.sp });
    stats.push({ label: 'Brightness vs Sun', value: s.lum >= 1 ? `${formatNumber(s.lum, s.lum < 10 ? 2 : 0)}× brighter` : `${formatNumber(s.lum * 100, s.lum > 0.01 ? 1 : 3)}% as bright` });
    stats.push({ label: 'Size vs Sun', value: s.radius >= 1 ? `${formatNumber(s.radius, 1)}× wider` : `${formatNumber(s.radius * 100, 0)}% as wide` });
  } else {
    stats.push({ label: 'Size', value: `${formatNumber(s.sizeLy)} light-years across` });
  }
  if (planets.length) stats.push({ label: 'Known planets', value: `${planets.length}${hzCount ? ` (${hzCount} in the habitable zone)` : ''}` });
  const facts = [];
  if (s.blurb) facts.push(s.blurb);
  if (!isNeb) facts.push(`Light leaving ${s.name} today will reach Earth in ${s.dist < 100 ? s.dist.toFixed(1) : formatNumber(s.dist)} years — you are seeing it as it was ${s.dist < 100 ? s.dist.toFixed(0) : formatNumber(s.dist)} years ago.`);
  if (planets.length) {
    const p = planets.find((x) => x.note) || planets[0];
    facts.push(`${p.name}: ${p.note || `a ${p.type} world circling its star every ${p.period < 1000 ? p.period.toFixed(1) + ' days' : (p.period / 365.25).toFixed(1) + ' years'}.`}`);
  }
  if (s.companion) facts.push(`${s.companion.name} orbits ${s.name.split(' ')[0]} ${s.name.split(' ')[1] || ''} about ${formatNumber(s.companion.separationAU, 1)} AU away.`);
  return {
    name: s.name,
    pronunciation: '',
    category: isNeb ? (s.kind === 'nebula' ? 'Nebula (star nursery)' : 'Star cluster') : `${s.sp} star${planets.length ? ' with exoplanets' : ''}`,
    badge: hzCount ? '🌱 Habitable-zone planets!' : planets.length ? '🪐 Has exoplanets' : isNeb ? '✨ Deep-sky wonder' : '⭐ Real star',
    kidSummary: summary,
    quickStats: stats,
    funFacts: facts,
    travelTimes: travelTimesForLy(s.dist),
    exoplanets: planets.map((p) => ({
      name: p.name,
      type: `${p.type[0].toUpperCase()}${p.type.slice(1)} world • ${formatNumber(p.radius, 2)}× Earth’s width`,
      orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' days' : (p.period / 365.25).toFixed(1) + ' years'} • ${p.a} AU from its star`,
      temp: p.hz ? 'In the habitable zone — liquid water possible' : p.note || (p.a < 0.1 ? 'Very close to its star — scorching hot' : 'Outside the habitable zone')
    })),
    hasExoplanets: planets.length > 0
  };
}

export function describeExoplanet(id) {
  if (id.startsWith('exo:')) {
    const parts = id.split(':');
    if (parts.length === 2) return describeArchiveSystem(id);
    const sysId = `${parts[0]}:${parts[1]}`;
    const slugName = parts.slice(2).join(':');
    const rec = ARCHIVE_BY_SLUG.get(sysId);
    if (!rec) return null;
    for (const raw of rec.rawPlanets) {
      const [suffix, a, period, radius, mass, eqt, typeIdx, hzFlag, discYear, methodIdx] = raw;
      const pName = suffix.length <= 2 ? `${rec.host} ${suffix}` : suffix;
      if (slug(pName) === slugName) {
        const typeStr = EXOPLANET_TYPES[typeIdx] || 'rocky';
        const methodStr = EXOPLANET_METHODS[methodIdx] || 'Transit';
        const hz = hzFlag === 1;
        return {
          name: pName,
          pronunciation: '',
          category: `Exoplanet of ${rec.host} (${discYear})`,
          badge: hz ? '🌱 Habitable Zone Exoplanet' : '🪐 Confirmed Exoplanet',
          kidSummary: `${pName} is a confirmed ${typeStr} exoplanet (${formatNumber(radius, 2)}× Earth’s width, ~${formatNumber(mass, 1)}× Earth’s mass) orbiting ${rec.host} every ${period < 1000 ? period.toFixed(1) + ' days' : (period / 365.25).toFixed(1) + ' years'}. Discovered in ${discYear} using the ${methodStr} method!`,
          quickStats: [
            { label: 'Host Star', value: `${rec.host} (${rec.sp})` },
            { label: 'Distance from Earth', value: `${rec.dist < 100 ? rec.dist.toFixed(1) : formatNumber(rec.dist)} light-years` },
            { label: 'Radius & Mass', value: `${formatNumber(radius, 2)} R⊕ • ${formatNumber(mass, 1)} M⊕` },
            { label: 'Orbit & Temp', value: `${a} AU (${period < 1000 ? period.toFixed(1) + ' d' : (period / 365.25).toFixed(1) + ' yr'}) • ~${eqt} K` }
          ],
          funFacts: [
            hz ? 'Orbits inside its star’s liquid-water Habitable Zone!' : `Discovered in ${discYear} via ${methodStr}.`,
            `Equilibrium temperature is estimated around ${eqt} K (${Math.round(eqt - 273.15)} °C).`
          ],
          travelTimes: travelTimesForLy(rec.dist),
          hasExoplanets: false
        };
      }
    }
    return describeArchiveSystem(sysId);
  }
  const [starId, slugName] = id.split(':');
  const s = STAR_BY_ID[starId];
  if (!s || !s.planets) return null;
  const p = s.planets.find((x) => slug(x.name) === slugName);
  if (!p) return null;
  return {
    name: p.name,
    pronunciation: '',
    category: `Exoplanet of ${s.name}`,
    badge: p.hz ? '🌱 Habitable zone' : '🪐 Exoplanet',
    kidSummary: `${p.name} is a ${p.type} planet about ${formatNumber(p.radius, 2)} times as wide as Earth. It orbits ${s.name} every ${p.period < 1000 ? p.period.toFixed(1) + ' days' : (p.period / 365.25).toFixed(1) + ' years'}. ${p.note || ''}`,
    quickStats: [
      { label: 'Host star', value: s.name },
      { label: 'Distance from Earth', value: `${s.dist < 100 ? s.dist.toFixed(1) : formatNumber(s.dist)} light-years` },
      { label: 'Year length', value: p.period < 1000 ? `${p.period.toFixed(2)} Earth days` : `${(p.period / 365.25).toFixed(1)} Earth years` },
      { label: 'Distance from star', value: `${p.a} AU` }
    ],
    funFacts: [
      p.hz ? 'It sits in the “Goldilocks zone” — not too hot, not too cold — where liquid water could exist.' : 'Astronomers found it by watching its star wobble or dim ever so slightly.',
      'The surface shown here is an artist’s impression — no telescope can photograph exoplanet surfaces yet!'
    ],
    travelTimes: travelTimesForLy(s.dist),
    hasExoplanets: false
  };
}

export function describeGalaxy(id) {
  const g = GALAXY_BY_ID[id];
  if (!g) return null;
  const ly = g.distMly * 1e6;
  const typeWords = { spiral: 'spiral galaxy', elliptical: 'elliptical galaxy', irregular: 'irregular galaxy', dwarf: 'dwarf galaxy', cluster: 'galaxy cluster', supercluster: 'supercluster of galaxies', void: 'cosmic void', wall: 'galaxy wall (filament)' };
  return {
    name: g.name,
    pronunciation: '',
    category: typeWords[g.type] || 'galaxy',
    badge: g.type === 'cluster' || g.type === 'supercluster' ? '🕸️ Cosmic structure' : '🌌 Galaxy',
    kidSummary: g.blurb || `${g.name} is a ${typeWords[g.type]} about ${g.distMly < 1 ? formatNumber(ly / 1e3) + ' thousand' : formatNumber(g.distMly, 1) + ' million'} light-years away.`,
    quickStats: [
      { label: 'Distance', value: g.distMly < 1 ? `${formatNumber(ly / 1e3)} thousand light-years` : g.distMly < 1000 ? `${formatNumber(g.distMly, 2)} million light-years` : `${formatNumber(g.distMly / 1e3, 1)} billion light-years` },
      { label: 'Size', value: g.diameterKly >= 1000 ? `${formatNumber(g.diameterKly / 1e3, 0)} million light-years across` : `${formatNumber(g.diameterKly)} thousand light-years across` },
      { label: 'Type', value: typeWords[g.type] || g.type }
    ],
    funFacts: [
      g.blurb || `Light from ${g.name} left it ${g.distMly < 1 ? formatNumber(ly / 1e3) + ' thousand' : formatNumber(g.distMly, 1) + ' million'} years ago.`,
      'Every dot of light you see at this scale is a whole galaxy with billions of stars.'
    ],
    travelTimes: travelTimesForLy(ly),
    hasExoplanets: false
  };
}

export function describeSolarBody(id) {
  const all = [...PLANETS.flatMap((p) => [p, ...(p.moons || []).map((m) => ({ ...m, parentName: p.name }))]), ...DWARF_PLANETS];
  const b = all.find((x) => x.id === id);
  if (!b) return null;
  return {
    name: b.name,
    pronunciation: '',
    category: b.parentName ? `Moon of ${b.parentName}` : 'Dwarf planet',
    badge: b.parentName ? '🌙 Moon' : '🪨 Dwarf planet',
    kidSummary: b.parentName
      ? `${b.name} is a moon of ${b.parentName}, about ${formatNumber(b.radius * 12742, 0)} km across, circling its planet every ${b.periodDays.toFixed(1)} days.`
      : `${b.name} is a dwarf planet about ${formatNumber(b.radius * 12742, 0)} km across.`,
    quickStats: [
      { label: 'Diameter', value: `${formatNumber(b.radius * 12742, 0)} km (${formatNumber(b.radius * 100, 0)}% of Earth)` },
      ...(b.periodDays ? [{ label: 'Orbit period', value: `${b.periodDays.toFixed(2)} days` }] : [])
    ],
    funFacts: [
      {
        io: 'Io is the most volcanic place in the Solar System — hundreds of volcanoes spew sulfur 400 km high!',
        europa: 'Beneath Europa’s cracked ice lies a salty ocean with twice as much water as all of Earth’s oceans.',
        ganymede: 'Ganymede is the largest moon in the Solar System — bigger than the planet Mercury!',
        callisto: 'Callisto’s face is the most heavily cratered surface we know of.',
        titan: 'Titan has rivers, lakes and rain — but of liquid methane, at −180 °C.',
        enceladus: 'Enceladus shoots geysers of water ice into space from a hidden ocean — NASA’s Cassini flew right through them.',
        pluto: 'Pluto has a giant heart-shaped glacier of nitrogen ice named Tombaugh Regio.',
        ceres: 'Ceres is the largest object in the asteroid belt and has bright salty spots in its craters.',
        eris: 'Eris is slightly smaller than Pluto but more massive — its discovery in 2005 led to the “dwarf planet” category.'
      }[id] || 'A fascinating small world.'
    ],
    travelTimes: {},
    hasExoplanets: false
  };
}

export function describeAny(id) {
  if (id.includes(':')) return describeExoplanet(id);
  return describeStar(id) || describeGalaxy(id) || describeSolarBody(id) || describeMisc(id);
}

function describeMisc(id) {
  const misc = {
    halley: {
      name: "Halley's Comet",
      category: 'Periodic comet',
      badge: '☄️ Returns in 2061',
      kidSummary: 'A dirty snowball 15 km long that swings past the Sun every 75–76 years, growing a glowing tail millions of km long. It was last here in 1986 and will return in 2061.',
      quickStats: [{ label: 'Orbit period', value: '75.3 years' }, { label: 'Farthest from Sun', value: '35 AU (beyond Neptune)' }, { label: 'Closest to Sun', value: '0.59 AU' }],
      funFacts: ['Halley’s Comet orbits the Sun backwards (clockwise) compared to the planets.', 'Every October the Orionid meteor shower is made of dust left behind by Halley!']
    },
    asteroidBelt: {
      name: 'Asteroid Belt',
      category: 'Belt of rocky leftovers',
      badge: '🪨 Millions of rocks',
      kidSummary: 'Between Mars and Jupiter orbit millions of rocky leftovers from the birth of the Solar System. Despite the movies, they are so far apart you would rarely see one.',
      quickStats: [{ label: 'Location', value: '2.1 – 3.3 AU from the Sun' }, { label: 'Largest member', value: 'Ceres (940 km)' }],
      funFacts: ['All the asteroids together weigh less than 4% of our Moon.']
    },
    kuiperBelt: {
      name: 'Kuiper Belt',
      category: 'Icy ring beyond Neptune',
      badge: '🧊 Home of Pluto',
      kidSummary: 'A vast doughnut of icy bodies beyond Neptune, 30 to 50 AU from the Sun. Pluto, Eris and many comets live here.',
      quickStats: [{ label: 'Location', value: '30 – 50 AU from the Sun' }, { label: 'Visited by', value: 'NASA’s New Horizons (Pluto 2015, Arrokoth 2019)' }],
      funFacts: ['The Kuiper Belt is 20 times wider and up to 200 times more massive than the asteroid belt.']
    },
    galacticBar: { name: 'Galactic Bar', category: 'Bar of old stars at the galaxy’s heart', badge: '🌟 Billions of ancient stars', kidSummary: 'The Milky Way is a barred spiral: a straight bar of old yellow stars about 27,000 light-years long crosses its center, and the spiral arms start at its ends.', quickStats: [{ label: 'Length', value: '~27,000 light-years' }], funFacts: ['From Earth the bar is tilted about 27° to our line of sight.'] },
    localGroup: { name: 'The Local Group', category: 'Our neighbourhood of galaxies', badge: '🌌 ~80 galaxies', kidSummary: 'The Local Group is the family of about 80 galaxies within 10 million light-years that includes the Milky Way, Andromeda and Triangulum plus dozens of small dwarf galaxies.', quickStats: [{ label: 'Size', value: '~10 million light-years' }, { label: 'Biggest members', value: 'Andromeda, Milky Way, Triangulum' }], funFacts: ['The whole Local Group is falling toward the Virgo Cluster.'] },
    cmb: { name: 'Cosmic Microwave Background', category: 'The oldest light in the universe', badge: '🔥 13.8 billion years old', kidSummary: 'The cosmic microwave background is the faint afterglow of the Big Bang, released when the universe was only 380,000 years old. It marks the edge of everything we can possibly see.', quickStats: [{ label: 'Age of the light', value: '13.8 billion years' }, { label: 'Current distance', value: '46 billion light-years' }, { label: 'Temperature today', value: '2.725 K (−270 °C)' }], funFacts: ['About 1% of the static on an old analog TV was this ancient light.'] },
    orionArmLabel: { name: 'Orion Spur', category: 'Our local arm of the Milky Way', badge: '📍 Home arm', kidSummary: 'The Sun lives in the Orion Spur, a small arm between the big Sagittarius and Perseus arms. Every star you can see with your eyes at night is in this little neighbourhood.', quickStats: [{ label: 'Length', value: '~10,000 light-years' }], funFacts: ['The Orion Nebula, Betelgeuse and Rigel all live in this arm.'] }
  };
  const arm = id.startsWith('arm-') ? { name: id.replace('arm-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), category: 'Spiral arm of the Milky Way', badge: '🌀 Spiral arm', kidSummary: 'A spiral arm is a long, winding lane where gas is squeezed and bright new stars are born — like a traffic jam of stars circling the galaxy.', quickStats: [{ label: 'Pitch angle', value: 'about 12°' }], funFacts: ['Stars drift in and out of the arms as they orbit the galaxy; the arms themselves are density waves.'] } : null;
  const m = misc[id] || arm;
  if (!m) return null;
  return { pronunciation: '', travelTimes: {}, hasExoplanets: false, ...m };
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export { STARS };
