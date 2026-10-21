/**
 * galaxyCatalog.js — Local Group galaxies, nearby galaxies, galaxy clusters and superclusters
 * with real J2000 coordinates. distMly in millions of light-years, diameters in thousands of ly.
 */
import { raHms, decDms } from '../engine/astro.js';

function g(id, name, ra, dec, distMly, type, diameterKly, extra = {}) {
  return { id, name, ra, dec, distMly, type, diameterKly, ...extra };
}

export const GALAXIES = [
  // ---- Milky Way satellites ----
  g('sagittariusDwarf', 'Sagittarius Dwarf Galaxy', raHms(18, 55, 20), decDms(-30, 32, 43), 0.07, 'dwarf', 10, {
    blurb: 'A small galaxy being slowly torn apart and eaten by the Milky Way.'
  }),
  g('lmc', 'Large Magellanic Cloud', raHms(5, 23, 35), decDms(-69, 45, 22), 0.163, 'irregular', 32, {
    tint: '#cfe3ff',
    blurb: 'Our biggest satellite galaxy, visible to the naked eye from the Southern Hemisphere. In 1987 a supernova exploded here!'
  }),
  g('smc', 'Small Magellanic Cloud', raHms(0, 52, 45), decDms(-72, 49, 43), 0.2, 'irregular', 19, { tint: '#d9e7ff' }),
  g('ursaMinorDwarf', 'Ursa Minor Dwarf', raHms(15, 9, 11), decDms(67, 12, 52), 0.225, 'dwarf', 4),
  g('dracoDwarf', 'Draco Dwarf', raHms(17, 20, 12), decDms(57, 54, 55), 0.26, 'dwarf', 3),
  g('sculptorDwarf', 'Sculptor Dwarf', raHms(1, 0, 9), decDms(-33, 42, 33), 0.29, 'dwarf', 5),
  g('sextansDwarf', 'Sextans Dwarf', raHms(10, 13, 3), decDms(-1, 36, 53), 0.29, 'dwarf', 8),
  g('carinaDwarf', 'Carina Dwarf', raHms(6, 41, 37), decDms(-50, 57, 58), 0.33, 'dwarf', 4),
  g('fornaxDwarf', 'Fornax Dwarf', raHms(2, 39, 59), decDms(-34, 26, 57), 0.46, 'dwarf', 6),
  g('leoII', 'Leo II Dwarf', raHms(11, 13, 29), decDms(22, 9, 17), 0.69, 'dwarf', 4),
  g('leoI', 'Leo I Dwarf', raHms(10, 8, 28), decDms(12, 18, 23), 0.82, 'dwarf', 5),

  // ---- Local Group ----
  g('ngc6822', "Barnard's Galaxy (NGC 6822)", raHms(19, 44, 57), decDms(-14, 47, 21), 1.63, 'irregular', 7),
  g('ic10', 'IC 10', raHms(0, 20, 17), decDms(59, 18, 14), 2.2, 'irregular', 5),
  g('ic1613', 'IC 1613', raHms(1, 4, 48), decDms(2, 7, 4), 2.38, 'irregular', 10),
  g('m32', 'M32', raHms(0, 42, 42), decDms(40, 51, 55), 2.49, 'elliptical', 6.5),
  g('andromeda', 'Andromeda Galaxy (M31)', raHms(0, 42, 44), decDms(41, 16, 9), 2.537, 'spiral', 152, {
    inclination: 77,
    positionAngle: 35,
    tint: '#f1e4ff',
    blurb: 'Our giant neighbour, home to about a trillion stars. It is heading our way and will merge with the Milky Way in 4–5 billion years.'
  }),
  g('m110', 'M110', raHms(0, 40, 22), decDms(41, 41, 7), 2.69, 'elliptical', 17),
  g('triangulum', 'Triangulum Galaxy (M33)', raHms(1, 33, 51), decDms(30, 39, 37), 2.73, 'spiral', 61, {
    inclination: 54,
    positionAngle: 23,
    tint: '#d8ecff',
    blurb: 'The third-largest galaxy of our Local Group, bursting with pink star-forming clouds.'
  }),
  g('wlm', 'Wolf–Lundmark–Melotte', raHms(0, 1, 58), decDms(-15, 27, 39), 3.04, 'irregular', 8),

  // ---- Nearby groups ----
  g('ngc253', 'Sculptor Galaxy (NGC 253)', raHms(0, 47, 33), decDms(-25, 17, 18), 11.4, 'spiral', 90, { inclination: 78, positionAngle: 52 }),
  g('m82', 'Cigar Galaxy (M82)', raHms(9, 55, 52), decDms(69, 40, 47), 11.5, 'irregular', 37, {
    tint: '#ffd6c2',
    blurb: 'A starburst galaxy making stars ten times faster than the Milky Way, blowing out a giant red wind of gas.'
  }),
  g('m81', "Bode's Galaxy (M81)", raHms(9, 55, 33), decDms(69, 3, 55), 11.8, 'spiral', 90, { inclination: 60, positionAngle: 157 }),
  g('centaurusA', 'Centaurus A', raHms(13, 25, 28), decDms(-43, 1, 9), 12, 'elliptical', 60, {
    tint: '#ffe9d6',
    blurb: 'A giant galaxy with a dark dust lane and jets shooting from a supermassive black hole.'
  }),
  g('m83', 'Southern Pinwheel (M83)', raHms(13, 37, 1), decDms(-29, 51, 57), 15, 'spiral', 55, { inclination: 24, positionAngle: 45 }),
  g('m101', 'Pinwheel Galaxy (M101)', raHms(14, 3, 13), decDms(54, 20, 57), 21, 'spiral', 170, { inclination: 18, positionAngle: 39 }),
  g('m51', 'Whirlpool Galaxy (M51)', raHms(13, 29, 53), decDms(47, 11, 43), 23, 'spiral', 76, {
    inclination: 22,
    positionAngle: 163,
    blurb: 'A perfect spiral tugging on a small companion galaxy — the first spiral structure ever seen (1845).'
  }),
  g('m104', 'Sombrero Galaxy (M104)', raHms(12, 39, 59), decDms(-11, 37, 23), 29.3, 'spiral', 50, { inclination: 84, positionAngle: 90 }),

  // ---- Clusters & superclusters ----
  g('m87', 'M87 & the Virgo Cluster', raHms(12, 30, 49), decDms(12, 23, 28), 53.5, 'cluster', 15000, {
    blurb: 'The heart of our local supercluster: 1,300+ galaxies. M87’s black hole was the first ever photographed (2019).'
  }),
  g('fornaxCluster', 'Fornax Cluster', raHms(3, 38, 30), decDms(-35, 27, 0), 62, 'cluster', 6000),
  g('centaurusCluster', 'Centaurus Cluster', raHms(12, 48, 49), decDms(-41, 18, 0), 170, 'cluster', 8000),
  g('hydraCluster', 'Hydra Cluster', raHms(10, 36, 42), decDms(-27, 31, 42), 190, 'cluster', 8000),
  g('normaCluster', 'Norma Cluster — The Great Attractor', raHms(16, 15, 32), decDms(-60, 54, 0), 222, 'cluster', 10000, {
    blurb: 'A huge concentration of mass pulling our whole galaxy toward it at 600 km every second.'
  }),
  g('perseusCluster', 'Perseus Cluster', raHms(3, 19, 48), decDms(41, 30, 42), 240, 'cluster', 11000),
  g('laniakea', 'Laniakea Supercluster', raHms(16, 15, 32), decDms(-60, 54, 0), 250, 'supercluster', 520000, {
    blurb: '"Immeasurable heaven" in Hawaiian — the 100,000-galaxy supercluster that the Milky Way belongs to.'
  }),
  g('comaCluster', 'Coma Cluster', raHms(12, 59, 49), decDms(27, 58, 50), 321, 'cluster', 20000, {
    blurb: 'Where astronomer Fritz Zwicky first noticed invisible "dark matter" in 1933.'
  }),
  g('shapley', 'Shapley Supercluster', raHms(13, 25, 0), decDms(-31, 0, 0), 650, 'supercluster', 300000),
  g('bootesVoid', 'Boötes Void (the Great Nothing)', raHms(14, 50, 0), decDms(46, 0, 0), 700, 'void', 330000, {
    blurb: 'A nearly empty bubble 330 million light-years wide. If the Milky Way were in its center, we would not have known other galaxies existed until the 1960s.'
  }),
  g('sloanWall', 'Sloan Great Wall', raHms(13, 0, 0), decDms(0, 0, 0), 1000, 'wall', 1370000),
  g('herculesWall', 'Hercules–Corona Borealis Great Wall', raHms(17, 0, 0), decDms(27, 45, 0), 10000, 'wall', 10000000, {
    blurb: 'The largest known structure in the universe — about 10 billion light-years across.'
  })
];

export const GALAXY_BY_ID = Object.fromEntries(GALAXIES.map((x) => [x.id, x]));
