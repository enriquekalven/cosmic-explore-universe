/**
 * starCatalog.js — Real stars, star systems, nebulae and clusters with J2000 coordinates.
 * dist in light-years, lum in solar luminosities, radius in solar radii, exoplanet orbits in AU.
 * Exoplanet radii in Earth radii (mass-derived estimates where only mass is known).
 */
import { raHms, decDms } from '../engine/astro.js';

const P = (name, a, period, radius, type, hz = false, note = '') => ({ name, a, period, radius, type, hz, note });

function star(id, name, ra, dec, dist, sp, lum, radius, extra = {}) {
  return { id, name, ra, dec, dist, sp, lum, radius, kind: 'star', ...extra };
}

export const STARS = [
  star('proximaCentauri', 'Proxima Centauri', raHms(14, 29, 43), decDms(-62, 40, 46), 4.246, 'M5.5V', 0.0017, 0.154, {
    planets: [
      P('Proxima Centauri b', 0.04857, 11.186, 1.07, 'rocky', true, 'Closest exoplanet to Earth — in the habitable zone!'),
      P('Proxima Centauri d', 0.02885, 5.122, 0.81, 'rocky', false, 'A tiny world found in 2022')
    ],
    blurb: 'The closest star to our Sun — a small, cool red dwarf. Its planet Proxima b orbits inside the habitable zone.'
  }),
  star('alphaCentauri', 'Alpha Centauri A & B', raHms(14, 39, 36), decDms(-60, 50, 2), 4.37, 'G2V+K1V', 1.519, 1.2234, {
    companion: { name: 'Alpha Centauri B', lum: 0.5, radius: 0.8632, sp: 'K1V', separationAU: 23.4, periodDays: 29187 },
    blurb: 'A pair of Sun-like stars that circle each other every 80 years — the brightest part of the closest star system.'
  }),
  star('barnardsStar', "Barnard's Star", raHms(17, 57, 48), decDms(4, 41, 36), 5.963, 'M4V', 0.0035, 0.196, {
    planets: [P('Barnard b', 0.0229, 3.154, 0.76, 'rocky', false, 'Confirmed in 2024 — about half the mass of Venus')]
  }),
  star('luhman16', 'Luhman 16 (brown dwarfs)', raHms(10, 49, 19), decDms(-53, 19, 10), 6.5, 'L7.5+T0.5', 0.00002, 0.1, {
    kind: 'brownDwarf',
    blurb: 'Two "failed stars" — too small to shine like the Sun, glowing dull red-brown.'
  }),
  star('wolf359', 'Wolf 359', raHms(10, 56, 29), decDms(7, 0, 53), 7.86, 'M6V', 0.0014, 0.144),
  star('lalande21185', 'Lalande 21185', raHms(11, 3, 20), decDms(35, 58, 12), 8.31, 'M2V', 0.0055, 0.392, {
    planets: [P('Lalande 21185 b', 0.0789, 12.95, 1.9, 'rocky'), P('Lalande 21185 c', 2.94, 2946, 4.0, 'ice')]
  }),
  star('sirius', 'Sirius A & B', raHms(6, 45, 9), decDms(-16, 42, 58), 8.6, 'A1V+DA2', 25.4, 1.711, {
    companion: { name: 'Sirius B (white dwarf)', lum: 0.056, radius: 0.0084, sp: 'DA2', separationAU: 19.8, periodDays: 18300 },
    blurb: 'The brightest star in our night sky, with a tiny white-dwarf companion as heavy as the Sun but the size of Earth.'
  }),
  star('luyten726', 'Luyten 726-8 (UV Ceti)', raHms(1, 39, 1), decDms(-17, 57, 1), 8.73, 'M5.5V', 0.00006, 0.14),
  star('ross154', 'Ross 154', raHms(18, 49, 49), decDms(-23, 50, 10), 9.7, 'M3.5V', 0.0038, 0.24),
  star('ross248', 'Ross 248', raHms(23, 41, 55), decDms(44, 10, 30), 10.3, 'M5.5V', 0.0018, 0.16, {
    blurb: 'In about 36,000 years Voyager 2 will pass within 1.7 light-years of this little red star.'
  }),
  star('epsilonEridani', 'Epsilon Eridani', raHms(3, 32, 56), decDms(-9, 27, 30), 10.47, 'K2V', 0.34, 0.735, {
    planets: [P('Epsilon Eridani b (AEgir)', 3.48, 2690, 11.0, 'gas', false, 'A Jupiter-like giant beside two asteroid belts')],
    debrisDisk: 60
  }),
  star('lacaille9352', 'Lacaille 9352', raHms(23, 5, 52), decDms(-35, 51, 11), 10.72, 'M0.5V', 0.033, 0.47, {
    planets: [P('Lacaille 9352 b', 0.068, 9.26, 1.6, 'rocky'), P('Lacaille 9352 c', 0.12, 21.8, 2.0, 'rocky', true)]
  }),
  star('ross128', 'Ross 128', raHms(11, 47, 44), decDms(0, 48, 16), 11.0, 'M4V', 0.0036, 0.197, {
    planets: [P('Ross 128 b', 0.0496, 9.87, 1.1, 'rocky', true, 'A temperate Earth-sized world around a quiet red dwarf')]
  }),
  star('ezAquarii', 'EZ Aquarii (triple)', raHms(22, 38, 33), decDms(-15, 18, 7), 11.1, 'M5V', 0.0003, 0.17),
  star('61cygni', '61 Cygni A & B', raHms(21, 6, 54), decDms(38, 44, 58), 11.4, 'K5V+K7V', 0.153, 0.665, {
    companion: { name: '61 Cygni B', lum: 0.085, radius: 0.595, sp: 'K7V', separationAU: 84, periodDays: 240700 },
    blurb: 'The first star ever to have its distance measured (by Friedrich Bessel in 1838).'
  }),
  star('procyon', 'Procyon A & B', raHms(7, 39, 18), decDms(5, 13, 30), 11.46, 'F5IV-V+DQZ', 6.93, 2.048, {
    companion: { name: 'Procyon B (white dwarf)', lum: 0.00049, radius: 0.012, sp: 'DQZ', separationAU: 15, periodDays: 14900 }
  }),
  star('struve2398', 'Struve 2398 A & B', raHms(18, 42, 47), decDms(59, 37, 50), 11.49, 'M3V+M3.5V', 0.0039, 0.35),
  star('groombridge34', 'Groombridge 34', raHms(0, 18, 23), decDms(44, 1, 23), 11.62, 'M1.5V+M3.5V', 0.0064, 0.38, {
    planets: [P('Groombridge 34 Ab', 0.072, 11.44, 1.5, 'rocky'), P('Groombridge 34 Ac', 5.4, 7600, 4.0, 'ice')]
  }),
  star('epsilonIndi', 'Epsilon Indi', raHms(22, 3, 22), decDms(-56, 47, 10), 11.87, 'K5V', 0.22, 0.73, {
    planets: [P('Epsilon Indi Ab', 11.55, 16500, 11.5, 'gas', false, 'A cold giant photographed directly by the James Webb Space Telescope in 2024')]
  }),
  star('dxCancri', 'DX Cancri', raHms(8, 29, 49), decDms(26, 46, 37), 11.83, 'M6.5V', 0.0003, 0.11),
  star('tauCeti', 'Tau Ceti', raHms(1, 44, 4), decDms(-15, 56, 15), 11.91, 'G8.5V', 0.52, 0.793, {
    planets: [
      P('Tau Ceti g', 0.133, 20.0, 1.4, 'rocky'),
      P('Tau Ceti h', 0.243, 49.4, 1.4, 'rocky'),
      P('Tau Ceti e', 0.538, 163, 1.8, 'rocky', true, 'Warm super-Earth at the inner edge of the habitable zone'),
      P('Tau Ceti f', 1.334, 636, 1.8, 'rocky', true, 'Cool super-Earth at the outer edge of the habitable zone')
    ],
    debrisDisk: 50
  }),
  star('gj1061', 'GJ 1061', raHms(3, 35, 60), decDms(-44, 30, 45), 12.0, 'M5.5V', 0.0017, 0.156, {
    planets: [P('GJ 1061 b', 0.021, 3.2, 1.1, 'rocky'), P('GJ 1061 c', 0.035, 6.7, 1.2, 'rocky', true), P('GJ 1061 d', 0.054, 13.0, 1.2, 'rocky', true)]
  }),
  star('yzCeti', 'YZ Ceti', raHms(1, 12, 31), decDms(-16, 59, 56), 12.1, 'M4.5V', 0.0022, 0.168, {
    planets: [P('YZ Ceti b', 0.0156, 2.02, 0.9, 'rocky'), P('YZ Ceti c', 0.0209, 3.06, 1.0, 'rocky'), P('YZ Ceti d', 0.0276, 4.66, 1.1, 'rocky')]
  }),
  star('luytensStar', "Luyten's Star (GJ 273)", raHms(7, 27, 25), decDms(5, 13, 33), 12.35, 'M3.5V', 0.0088, 0.293, {
    planets: [P('Luyten b', 0.0911, 18.65, 1.5, 'rocky', true, 'One of the most Earth-like temperate worlds nearby'), P('Luyten c', 0.036, 4.72, 1.0, 'rocky')]
  }),
  star('teegardensStar', "Teegarden's Star", raHms(2, 53, 1), decDms(16, 52, 53), 12.5, 'M7V', 0.00073, 0.107, {
    planets: [P("Teegarden's Star b", 0.0252, 4.91, 1.02, 'rocky', true), P("Teegarden's Star c", 0.0443, 11.4, 1.04, 'rocky', true), P("Teegarden's Star d", 0.0791, 26.1, 0.9, 'rocky')]
  }),
  star('kapteynsStar', "Kapteyn's Star", raHms(5, 11, 41), decDms(-45, 1, 6), 12.83, 'sdM1', 0.012, 0.291, {
    blurb: 'An ancient halo star, probably stolen from a dwarf galaxy the Milky Way swallowed long ago.'
  }),
  star('lacaille8760', 'Lacaille 8760 (AX Mic)', raHms(21, 17, 15), decDms(-38, 52, 3), 12.95, 'M0V', 0.072, 0.51),
  star('kruger60', 'Kruger 60 A & B', raHms(22, 27, 59), decDms(57, 41, 45), 13.07, 'M3V+M4V', 0.01, 0.35),
  star('wolf1061', 'Wolf 1061', raHms(16, 30, 18), decDms(-12, 39, 45), 14.05, 'M3.5V', 0.01, 0.307, {
    planets: [P('Wolf 1061 b', 0.0375, 4.887, 1.2, 'rocky'), P('Wolf 1061 c', 0.089, 17.87, 1.6, 'rocky', true), P('Wolf 1061 d', 0.47, 217, 2.5, 'ice')]
  }),
  star('vanMaanensStar', "Van Maanen's Star", raHms(0, 49, 10), decDms(5, 23, 19), 14.07, 'DZ8', 0.00017, 0.011, {
    kind: 'whiteDwarf',
    blurb: 'The nearest lone white dwarf — the glowing leftover core of a dead star.'
  }),
  star('gliese1', 'Gliese 1', raHms(0, 5, 24), decDms(-37, 21, 27), 14.17, 'M1.5V', 0.04, 0.38),
  star('wolf424', 'Wolf 424 A & B', raHms(12, 33, 17), decDms(9, 1, 15), 14.3, 'M5V+M7V', 0.0015, 0.17),
  star('gliese687', 'Gliese 687', raHms(17, 36, 26), decDms(68, 20, 21), 14.84, 'M3V', 0.021, 0.42, {
    planets: [P('Gliese 687 b', 0.163, 38.14, 4.0, 'ice'), P('Gliese 687 c', 1.16, 728, 4.0, 'ice')]
  }),
  star('gliese876', 'Gliese 876', raHms(22, 53, 17), decDms(-14, 15, 49), 15.25, 'M4V', 0.0122, 0.376, {
    planets: [
      P('Gliese 876 d', 0.0208, 1.94, 1.6, 'rocky'),
      P('Gliese 876 c', 0.13, 30.1, 11.0, 'gas', true),
      P('Gliese 876 b', 0.208, 61.1, 12.0, 'gas', true, 'Two giant planets locked in a 2:1 orbital dance'),
      P('Gliese 876 e', 0.33, 124, 5.0, 'ice')
    ]
  }),
  star('groombridge1618', 'Groombridge 1618', raHms(10, 11, 22), decDms(49, 27, 15), 15.88, 'K7V', 0.046, 0.6),
  star('gliese832', 'Gliese 832', raHms(21, 33, 34), decDms(-49, 0, 32), 16.16, 'M1.5V', 0.03, 0.48, {
    planets: [P('Gliese 832 b', 3.56, 3657, 11.0, 'gas')]
  }),
  star('altair', 'Altair', raHms(19, 50, 47), decDms(8, 52, 6), 16.73, 'A7V', 10.6, 1.8, {
    blurb: 'Spins so fast (once every 9 hours!) that it is squashed into an egg shape.'
  }),
  star('70ophiuchi', '70 Ophiuchi', raHms(18, 5, 27), decDms(2, 30, 0), 16.6, 'K0V+K4V', 0.59, 0.91),
  star('sigmaDraconis', 'Sigma Draconis', raHms(19, 32, 21), decDms(69, 39, 40), 18.77, 'G9V', 0.43, 0.78),
  star('etaCassiopeiae', 'Eta Cassiopeiae (Achird)', raHms(0, 49, 6), decDms(57, 48, 55), 19.42, 'G0V+K7V', 1.29, 1.04, {
    blurb: 'A near-twin of our Sun with an orange companion star.'
  }),
  star('36ophiuchi', '36 Ophiuchi (triple)', raHms(17, 15, 21), decDms(-26, 36, 0), 19.5, 'K2V+K1V+K5V', 0.33, 0.82),
  star('82eridani', '82 Eridani', raHms(3, 19, 56), decDms(-43, 4, 11), 19.71, 'G6V', 0.69, 0.92, {
    planets: [P('82 Eridani b', 0.1207, 18.3, 1.6, 'rocky'), P('82 Eridani c', 0.2036, 40.1, 1.6, 'rocky'), P('82 Eridani d', 0.3499, 90.3, 2.0, 'rocky')]
  }),
  star('deltaPavonis', 'Delta Pavonis', raHms(20, 8, 44), decDms(-66, 10, 55), 19.9, 'G8IV', 1.22, 1.2),
  star('gliese581', 'Gliese 581', raHms(15, 19, 26), decDms(-7, 43, 20), 20.4, 'M3V', 0.0135, 0.3, {
    planets: [P('Gliese 581 e', 0.028, 3.15, 1.2, 'rocky'), P('Gliese 581 b', 0.041, 5.37, 4.0, 'ice'), P('Gliese 581 c', 0.073, 12.9, 1.8, 'rocky', true)]
  }),
  star('gliese667C', 'Gliese 667 C', raHms(17, 18, 57), decDms(-34, 59, 23), 23.62, 'M1.5V', 0.0137, 0.42, {
    planets: [P('Gliese 667 Cb', 0.0505, 7.2, 1.8, 'rocky'), P('Gliese 667 Cc', 0.125, 28.1, 1.8, 'rocky', true, 'A super-Earth bathed in the light of three suns')]
  }),
  star('vega', 'Vega', raHms(18, 36, 56), decDms(38, 47, 1), 25.04, 'A0V', 40.1, 2.36, {
    debrisDisk: 100,
    blurb: 'The brilliant blue-white star of the Summer Triangle, surrounded by a disk of dust where planets may be forming.'
  }),
  star('fomalhaut', 'Fomalhaut', raHms(22, 57, 39), decDms(-29, 37, 20), 25.13, 'A3V', 16.6, 1.84, {
    debrisDisk: 140,
    blurb: 'Famous for its giant "Eye of Sauron" dust ring, 140 AU across.'
  }),
  star('gliese436', 'Gliese 436', raHms(11, 42, 11), decDms(26, 42, 23), 31.8, 'M2.5V', 0.025, 0.42, {
    planets: [P('Gliese 436 b', 0.0287, 2.64, 4.2, 'ice', false, 'A hot Neptune trailing a comet-like tail of escaping gas')]
  }),
  star('pollux', 'Pollux', raHms(7, 45, 19), decDms(28, 1, 34), 33.78, 'K0III', 43, 8.8, {
    planets: [P('Pollux b (Thestias)', 1.64, 590, 12.0, 'gas')]
  }),
  star('arcturus', 'Arcturus', raHms(14, 15, 40), decDms(19, 10, 56), 36.7, 'K1.5III', 170, 25.4, {
    blurb: 'An orange giant 25 times wider than the Sun — the brightest star in the northern sky.'
  }),
  star('gliese12', 'Gliese 12', raHms(0, 15, 49), decDms(13, 33, 22), 39.7, 'M3V', 0.0145, 0.26, {
    planets: [P('Gliese 12 b', 0.0668, 12.76, 0.96, 'rocky', true, 'A Venus-sized temperate world discovered in 2024')]
  }),
  star('trappist1', 'TRAPPIST-1', raHms(23, 6, 30), decDms(-5, 2, 29), 40.66, 'M8V', 0.000553, 0.1192, {
    planets: [
      P('TRAPPIST-1b', 0.01154, 1.511, 1.116, 'rocky'),
      P('TRAPPIST-1c', 0.0158, 2.422, 1.097, 'rocky'),
      P('TRAPPIST-1d', 0.02227, 4.049, 0.788, 'rocky'),
      P('TRAPPIST-1e', 0.02925, 6.101, 0.92, 'rocky', true, 'The best candidate for oceans'),
      P('TRAPPIST-1f', 0.03849, 9.207, 1.045, 'rocky', true),
      P('TRAPPIST-1g', 0.04683, 12.352, 1.129, 'rocky', true),
      P('TRAPPIST-1h', 0.06189, 18.773, 0.755, 'rocky')
    ],
    blurb: 'Seven Earth-sized rocky planets huddle around a star barely bigger than Jupiter — three of them in the habitable zone.'
  }),
  star('55cancri', '55 Cancri (Copernicus)', raHms(8, 52, 36), decDms(28, 19, 51), 41.0, 'K0IV-V', 0.58, 0.94, {
    planets: [
      P('55 Cancri e (Janssen)', 0.0154, 0.7365, 1.9, 'lava', false, 'A lava world whose year lasts 18 hours'),
      P('55 Cancri b (Galileo)', 0.115, 14.65, 12.0, 'gas'),
      P('55 Cancri c (Brahe)', 0.24, 44.4, 7.0, 'ice'),
      P('55 Cancri f (Harriot)', 0.78, 260, 8.0, 'ice', true),
      P('55 Cancri d (Lipperhey)', 5.74, 5218, 12.0, 'gas')
    ]
  }),
  star('capella', 'Capella', raHms(5, 16, 41), decDms(45, 59, 53), 42.9, 'G8III+G0III', 78.7, 11.98, {
    companion: { name: 'Capella Ab', lum: 72.7, radius: 8.83, sp: 'G0III', separationAU: 0.74, periodDays: 104 }
  }),
  star('upsilonAndromedae', 'Upsilon Andromedae (Titawin)', raHms(1, 36, 48), decDms(41, 24, 20), 44.0, 'F8V', 3.57, 1.48, {
    planets: [P('Saffar', 0.0594, 4.617, 13.0, 'gas'), P('Samh', 0.83, 241, 12.0, 'gas'), P('Majriti', 2.53, 1282, 12.0, 'gas', true)]
  }),
  star('lhs1140', 'LHS 1140', raHms(0, 44, 59), decDms(-15, 16, 18), 48.8, 'M4.5V', 0.0038, 0.21, {
    planets: [P('LHS 1140 b', 0.0957, 24.7, 1.73, 'ocean', true, 'Possibly a water world with a huge ocean'), P('LHS 1140 c', 0.027, 3.78, 1.27, 'rocky')]
  }),
  star('pegasi51', '51 Pegasi (Helvetios)', raHms(22, 57, 28), decDms(20, 46, 8), 50.6, 'G2IV', 1.36, 1.27, {
    planets: [P('51 Pegasi b (Dimidium)', 0.0527, 4.2308, 13.0, 'gas', false, 'The first planet found around a Sun-like star (1995)')],
    blurb: 'A Sun-like star whose hot Jupiter kicked off the exoplanet revolution in 1995 — a discovery that won the Nobel Prize.'
  }),
  star('muArae', 'Mu Arae (Cervantes)', raHms(17, 44, 9), decDms(-51, 50, 3), 50.6, 'G3IV-V', 1.75, 1.36, {
    planets: [P('Dulcinea', 0.0909, 9.64, 2.6, 'ice'), P('Rocinante', 0.921, 310, 11.0, 'gas'), P('Quijote', 1.5, 643, 12.0, 'gas', true), P('Sancho', 5.2, 4206, 12.0, 'gas')]
  }),
  star('castor', 'Castor (sextuple)', raHms(7, 34, 36), decDms(31, 53, 18), 51.0, 'A1V', 30, 2.3, {
    blurb: 'Six stars in one! Three pairs of twins whirling around each other.'
  }),
  star('betaPictoris', 'Beta Pictoris', raHms(5, 47, 17), decDms(-51, 3, 59), 63.4, 'A6V', 8.7, 1.8, {
    debrisDisk: 1000,
    planets: [P('Beta Pictoris c', 2.7, 1200, 12.0, 'gas'), P('Beta Pictoris b', 9.9, 8035, 13.0, 'gas', false, 'Photographed directly — a young giant still glowing from its birth')]
  }),
  star('hd189733', 'HD 189733', raHms(20, 0, 43), decDms(22, 42, 39), 64.5, 'K1.5V', 0.33, 0.76, {
    planets: [P('HD 189733 b', 0.0313, 2.219, 12.7, 'gas', false, 'A deep-blue world where it rains molten glass sideways at 8,700 km/h')]
  }),
  star('aldebaran', 'Aldebaran', raHms(4, 35, 55), decDms(16, 30, 33), 65.3, 'K5III', 439, 44.1, {
    blurb: 'The red "eye of the bull" in Taurus — a giant 44 times wider than the Sun.'
  }),
  star('regulus', 'Regulus', raHms(10, 8, 22), decDms(11, 58, 2), 79.3, 'B8IVn', 288, 3.1),
  star('toi700', 'TOI-700', raHms(6, 28, 23), decDms(-65, 34, 43), 101.4, 'M2V', 0.023, 0.42, {
    planets: [P('TOI-700 e', 0.134, 27.8, 0.95, 'rocky', true), P('TOI-700 d', 0.163, 37.4, 1.07, 'rocky', true, 'An Earth-sized habitable-zone planet found by NASA’s TESS')]
  }),
  star('k218', 'K2-18', raHms(11, 30, 14), decDms(7, 35, 18), 124, 'M2.5V', 0.023, 0.41, {
    planets: [P('K2-18 b', 0.1429, 32.9, 2.61, 'ocean', true, 'A possible "hycean" ocean world with a hydrogen sky, studied by JWST')]
  }),
  star('hr8799', 'HR 8799', raHms(23, 7, 29), decDms(21, 8, 3), 133, 'A5V', 4.9, 1.44, {
    planets: [P('HR 8799 e', 16.4, 16400, 13.0, 'gas'), P('HR 8799 d', 27, 36500, 13.0, 'gas'), P('HR 8799 c', 43, 69000, 13.0, 'gas'), P('HR 8799 b', 68, 168000, 13.0, 'gas', false, 'Four giant planets caught on camera orbiting their star')]
  }),
  star('achernar', 'Achernar', raHms(1, 37, 43), decDms(-57, 14, 12), 139, 'B6Vep', 3150, 7.3),
  star('spica', 'Spica', raHms(13, 25, 12), decDms(-11, 9, 41), 250, 'B1III-IV+B2V', 20500, 7.4),
  star('canopus', 'Canopus', raHms(6, 23, 57), decDms(-52, 41, 44), 310, 'A9II', 10700, 71, {
    blurb: 'The second-brightest star in the night sky — spacecraft use it as a navigation beacon.'
  }),
  star('acrux', 'Acrux', raHms(12, 26, 36), decDms(-63, 5, 57), 320, 'B0.5IV+B1V', 25000, 7.8),
  star('hadar', 'Hadar (Beta Centauri)', raHms(14, 3, 49), decDms(-60, 22, 23), 390, 'B1III', 41700, 9.0),
  star('polaris', 'Polaris (the North Star)', raHms(2, 31, 49), decDms(89, 15, 51), 433, 'F7Ib', 1260, 37.5, {
    blurb: 'Sits almost exactly above Earth’s North Pole, so the whole sky seems to spin around it.'
  }),
  star('pleiades', 'Pleiades (Seven Sisters)', raHms(3, 47, 24), decDms(24, 7, 0), 444, 'B6IIIe', 2400, 10, {
    kind: 'cluster',
    sizeLy: 40,
    tint: '#9fc4ff',
    blurb: 'A sparkling nursery of hot young blue stars, only 100 million years old, wrapped in glowing dust.'
  }),
  star('betelgeuse', 'Betelgeuse', raHms(5, 55, 10), decDms(7, 24, 25), 548, 'M1-2Ia', 126000, 764, {
    blurb: 'A red supergiant so huge it would swallow Mars and Jupiter if it sat where the Sun is. One day it will explode as a supernova!'
  }),
  star('antares', 'Antares', raHms(16, 29, 24), decDms(-26, 25, 55), 550, 'M1.5Iab', 75900, 680, {
    blurb: 'The glowing red heart of Scorpius — a dying supergiant 680 times wider than the Sun.'
  }),
  star('kepler186', 'Kepler-186', raHms(19, 54, 37), decDms(43, 57, 18), 579, 'M1V', 0.055, 0.52, {
    planets: [P('Kepler-186e', 0.11, 22.4, 1.27, 'rocky'), P('Kepler-186f', 0.432, 129.9, 1.17, 'rocky', true, 'The first Earth-sized planet found in a habitable zone (2014)')]
  }),
  star('kepler22', 'Kepler-22', raHms(19, 16, 52), decDms(47, 53, 4), 638, 'G5V', 0.79, 0.98, {
    planets: [P('Kepler-22b', 0.849, 289.9, 2.4, 'ocean', true, 'A possible ocean world 2.4 times wider than Earth')]
  }),
  star('rigel', 'Rigel', raHms(5, 14, 32), decDms(-8, 12, 6), 860, 'B8Ia', 120000, 78.9, {
    blurb: 'A blue supergiant shining 120,000 times brighter than the Sun — the bright foot of Orion.'
  }),
  star('orionNebula', 'Orion Nebula (M42)', raHms(5, 35, 17), decDms(-5, 23, 28), 1344, 'nebula', 0, 0, {
    kind: 'nebula',
    sizeLy: 24,
    palette: ['#ff9ab8', '#8ad7ff', '#ffd9a0'],
    blurb: 'A gigantic cloud of glowing gas where thousands of baby stars are being born right now.'
  }),
  star('kepler452', 'Kepler-452', raHms(19, 44, 1), decDms(44, 16, 40), 1800, 'G2V', 1.2, 1.11, {
    planets: [P('Kepler-452b', 1.046, 384.8, 1.63, 'rocky', true, 'Nicknamed "Earth’s cousin" — a 385-day year around a Sun-like star')]
  }),
  star('deneb', 'Deneb', raHms(20, 41, 26), decDms(45, 16, 49), 2615, 'A2Ia', 196000, 203, {
    blurb: 'One of the most luminous stars we can see — its light left 2,600 years ago, around the time of ancient Rome’s founding.'
  }),
  star('lagoonNebula', 'Lagoon Nebula (M8)', raHms(18, 3, 37), decDms(-24, 23, 12), 4100, 'nebula', 0, 0, {
    kind: 'nebula',
    sizeLy: 110,
    palette: ['#ff8fa3', '#ffb3c6', '#c9b8ff']
  }),
  star('crabNebula', 'Crab Nebula (M1)', raHms(5, 34, 32), decDms(22, 0, 52), 6500, 'nebula', 0, 0, {
    kind: 'nebula',
    sizeLy: 11,
    palette: ['#9fd0ff', '#ffb27a', '#ffffff'],
    blurb: 'The shredded remains of a star that exploded in the year 1054 — a pulsar spins 30 times a second at its heart.'
  }),
  star('eagleNebula', 'Eagle Nebula (Pillars of Creation)', raHms(18, 18, 48), decDms(-13, 49, 0), 7000, 'nebula', 0, 0, {
    kind: 'nebula',
    sizeLy: 70,
    palette: ['#e2c58c', '#8fd3b0', '#ffc8a2'],
    blurb: 'Home of the famous Pillars of Creation — towering columns of gas light-years tall.'
  }),
  star('carinaNebula', 'Carina Nebula', raHms(10, 45, 8), decDms(-59, 52, 4), 8500, 'nebula', 0, 0, {
    kind: 'nebula',
    sizeLy: 300,
    palette: ['#ffb08a', '#ff7f9f', '#9bd7ff'],
    blurb: 'A colossal star factory holding Eta Carinae, one of the most massive stars in the galaxy.'
  }),
  star('omegaCentauri', 'Omega Centauri', raHms(13, 26, 47), decDms(-47, 28, 46), 15800, 'globular', 1000000, 0, {
    kind: 'globular',
    sizeLy: 150,
    tint: '#ffe3b0',
    blurb: 'A ball of 10 million ancient stars — maybe the leftover core of a dwarf galaxy.'
  }),
  star('m13', 'Hercules Cluster (M13)', raHms(16, 41, 41), decDms(36, 27, 37), 22200, 'globular', 300000, 0, {
    kind: 'globular',
    sizeLy: 145,
    tint: '#ffe8c4',
    blurb: 'In 1974 humans beamed a radio message toward this cluster. It will arrive in about 25,000 years.'
  })
];

export const SPECTRAL_COLORS = {
  O: '#9bb0ff',
  B: '#aabfff',
  A: '#cad7ff',
  F: '#f8f7ff',
  G: '#fff4ea',
  K: '#ffd2a1',
  M: '#ffcc6f',
  L: '#ff9b5a',
  T: '#ff6f4d',
  D: '#e6efff',
  s: '#ffcc6f',
  n: '#ffffff',
  g: '#ffe3b0'
};

export function spectralColor(sp) {
  if (!sp) return '#ffffff';
  const norm = sp.replace(/^sd/, 's');
  const letter = norm[0];
  const base = SPECTRAL_COLORS[letter] || '#ffffff';
  // Late M dwarfs (M5–M9: Proxima, TRAPPIST-1…) are noticeably redder than M0.
  if (letter === 'M') {
    const sub = parseFloat(norm.slice(1));
    if (Number.isFinite(sub)) {
      const t = Math.min(1, Math.max(0, sub / 9));
      const a = [0xff, 0xcc, 0x6f];
      const b = [0xff, 0x8e, 0x4e];
      return `#${a.map((c, i) => Math.round(c + (b[i] - c) * t).toString(16).padStart(2, '0')).join('')}`;
    }
  }
  return base;
}

export const STAR_BY_ID = Object.fromEntries(STARS.map((s) => [s.id, s]));
