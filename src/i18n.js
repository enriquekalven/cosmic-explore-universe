// Copyright 2026 Google. This software is provided as-is, without warranty or
// representation for any use or purpose. Your use of it is subject to your
// agreement with Google.

/**
 * i18n.js — 8-language localization (`en`, `es`, `zh`, `ja`, `ko`, `pt`, `fr`, `it`)
 * for Cosmic Explorer 3D UI, NASA & Guardians of the Galaxy scales, objects, guided tours, quizzes, and 3D labels.
 */

import { COSMIC_SCALES, COSMIC_OBJECTS, GUIDED_TOUR_STOPS, SPACE_QUIZ_QUESTIONS } from './cosmicData.js';
import { COSMIC_SCALES_ES, COSMIC_OBJECTS_ES, GUIDED_TOUR_STOPS_ES, SPACE_QUIZ_QUESTIONS_ES } from './i18n/cosmicObjectsEs.js';
import { COSMIC_SCALES_ZH, COSMIC_OBJECTS_ZH, GUIDED_TOUR_STOPS_ZH, SPACE_QUIZ_QUESTIONS_ZH } from './i18n/cosmicObjectsZh.js';
import {
  COSMIC_SCALES_EXTRA,
  COSMIC_OBJECTS_EXTRA,
  GUIDED_TOUR_STOPS_EXTRA,
  SPACE_QUIZ_QUESTIONS_EXTRA
} from './i18n/cosmicObjectsExtra.js';
import { UI_STRINGS_EXTRA, QUICK_TARGETS_EXTRA, LABEL_NAMES_EXTRA } from './i18n/uiStringsExtra.js';
import {
  MARVEL_SCALES,
  MARVEL_QUICK_TARGETS,
  MARVEL_CATEGORIES,
  MARVEL_OBJECTS,
  MARVEL_OBJECTS_ES,
  MARVEL_OBJECTS_ZH,
  MARVEL_GUIDED_TOUR_STOPS,
  MARVEL_QUIZ_QUESTIONS,
  MARVEL_LABEL_NAMES
} from './catalog/marvelData.js';
import {
  MARVEL_SCALES_EXTRA,
  MARVEL_QUICK_TARGETS_EXTRA,
  MARVEL_CATEGORIES_EXTRA,
  MARVEL_OBJECTS_EXTRA,
  MARVEL_GUIDED_TOUR_STOPS_EXTRA,
  MARVEL_QUIZ_QUESTIONS_EXTRA,
  MARVEL_LABEL_NAMES_EXTRA
} from './i18n/marvelExtra.js';

export const SUPPORTED_LANGUAGES = ['en', 'es', 'zh', 'ja', 'ko', 'pt', 'fr', 'it'];

/**
 * Languages shown to the public. ja/ko/pt/fr/it stay in the codebase but are only
 * reachable with `?preview=i18n` (query) or `#…&preview=i18n` (hash) for QA.
 */
export const PUBLIC_LANGS = ['en', 'es', 'zh'];

/** Switcher labels (button text + tooltip) for every supported language. */
export const LANG_META = {
  en: { label: 'EN', title: 'English' },
  es: { label: 'ES', title: 'Español' },
  zh: { label: '中文', title: '中文（简体）' },
  ja: { label: '日本語', title: '日本語' },
  ko: { label: '한국어', title: '한국어' },
  pt: { label: 'PT', title: 'Português (Brasil)' },
  fr: { label: 'FR', title: 'Français' },
  it: { label: 'IT', title: 'Italiano' }
};

/**
 * Maps any BCP-47-ish tag to one of SUPPORTED_LANGUAGES ('en' if unknown).
 * Accepts underscores and script/region subtags: ja_JP, pt_BR, cmn-Hans-CN, zh-Hant-TW.
 */
export function normalizeLang(raw) {
  if (!raw) return 'en';
  const primary = String(raw).trim().toLowerCase().replace(/_/g, '-').split('-')[0];
  if (primary === 'cmn' || primary === 'zh') return 'zh';
  return SUPPORTED_LANGUAGES.includes(primary) ? primary : 'en';
}

/** True when the URL query or hash carries preview=i18n (all 8 languages unlocked for QA). */
export function isPreviewI18n(loc = typeof window !== 'undefined' ? window.location : null) {
  if (!loc) return false;
  try {
    if (new URLSearchParams(loc.search || '').get('preview') === 'i18n') return true;
    if (new URLSearchParams(String(loc.hash || '').replace(/^#/, '')).get('preview') === 'i18n') return true;
  } catch (_) {}
  return false;
}

/** Languages selectable right now (public set, or all 8 in preview). */
export function getAvailableLanguages(preview = isPreviewI18n()) {
  return preview ? SUPPORTED_LANGUAGES.slice() : PUBLIC_LANGS.slice();
}

/** Normalizes and gates a requested language: non-available languages fall back to 'en'. */
export function gateLang(raw, preview = isPreviewI18n()) {
  const l = normalizeLang(raw);
  return getAvailableLanguages(preview).includes(l) ? l : 'en';
}

export function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const preview = isPreviewI18n();
  try {
    const hashLang = new URLSearchParams(window.location.hash.replace(/^#/, '')).get('lang');
    if (hashLang) return gateLang(hashLang, preview);
    const queryLang = new URLSearchParams(window.location.search).get('lang');
    if (queryLang) return gateLang(queryLang, preview);
    const stored = window.localStorage.getItem('cosmic_lang');
    if (stored) return gateLang(stored, preview);
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language;
    if (nav) return gateLang(nav, preview);
  } catch (_) {}
  return 'en';
}

export const UI_STRINGS = {
  en: {
    pageTitle: 'Cosmic Explorer 3D — From Earth & Moon to the Edge of the Universe & Guardians of the Galaxy',
    metaDescription:
      'Cosmic Explorer 3D — a free, open, photoreal 3D journey from Earth and the Moon to the Voyager probes, nearby exoplanets, the Milky Way, the edge of the observable universe, and Guardians of the Galaxy.',
    canvasAria: 'Interactive 3D Universe — drag to orbit, scroll or pinch to zoom, click any world to fly there',
    loadingTitle: 'Cosmic Explorer 3D',
    loadingWarmup: 'Warming up the engines…',
    loadingHint: 'Real NASA & ESO imagery • real orbits for today’s date • free & open for every curious kid',
    loadingMsgs: [
      'Unrolling NASA’s Blue Marble…',
      'Polishing Saturn’s rings…',
      'Mapping 6,451 NASA exoplanets…',
      'Tracking Starman’s Tesla Roadster…',
      'Checking on Voyager 1…'
    ],
    webglError: 'Sorry — your browser could not start WebGL. Try Chrome, Edge, Firefox or Safari on a computer or recent phone.',
    brandTitle: 'Cosmic Explorer 3D',
    brandSubtitle: 'Free & open interactive universe for curious kids',
    marvelBrandSubtitle: 'Guardians of the Galaxy • Thor’s Nine Realms • Real Astrophysics',
    universeNasaTab: '🔭 NASA Cosmos',
    universeMarvelTab: '🦝 Guardians of the Galaxy',
    universeMarvelTabShort: '🦝 Guardians',
    universeMarvelTabFull: 'Guardians of the Galaxy',
    marvelScienceBadge: '🔬 GUARDIANS LORE VS. REAL NASA ASTROPHYSICS',
    scaleStepperAria: 'Cosmic zoom scales',
    exoBtn: '🪐 6,451 Exoplanets',
    exoBtnTitle: 'Browse and fly to all 6,451 confirmed NASA exoplanets',
    tourBtn: '🧭 Guided Tour',
    marvelTourBtn: '🦝 Guardians Tour',
    quizBtn: '🏆 Space Quiz',
    marvelQuizBtn: '🦝 Guardians Quiz',
    lightModeBtn: '☀️ Light Mode',
    darkModeBtn: '🌙 Dark Mode',
    themeBtnTitle: 'Switch between Dark Cosmos and Light Star-Atlas Mode',
    cleanViewBtn: '🖼️ Clean View',
    showPanelsBtn: '🧭 Show panels',
    cleanViewTitle: 'Hide panels for a clean view',
    mobileOptionsTitle: 'Toggle view options',
    mobileDetailsExpand: '▲ Details',
    mobileDetailsCollapse: '▼ Close',
    flyToLabel: '🎯 Fly to:',
    liveTelemetryTitle: 'Live heliocentric telemetry (click any spacecraft to fly there)',
    roadsterLabel: '🚗 Roadster:',
    voyager1Label: 'Voyager 1:',
    voyager2Label: 'Voyager 2:',
    roadsterDistPill: (mKm, au, kms) => `${mKm}M km (${au} AU • ${kms} km/s)`,
    voyagerDistPill: (bKm, au) => `${bKm}B km (${au} AU)`,
    fromSunKmAU: (kmStr, au) => `${kmStr} km from Sun (${au} AU)`,
    fromSunKm: (kmStr) => `${kmStr} km from the Sun`,
    scaleEyebrow: 'CURRENT COSMIC SCALE',
    marvelScaleEyebrow: 'CURRENT GUARDIANS COSMIC SCALE',
    toggleOrbits: '⭕ Orbits',
    toggleLabels: '🏷️ Labels',
    toggleHz: '🌱 Habitable zones',
    toggleScaleOff: '📏 True scale',
    toggleScaleOn: '📏 True scale (on)',
    toggleScaleTitle: 'Explorer scale compresses distances so you can see everything. True scale shows the real emptiness of space.',
    toggleGlow: '✨ Glow',
    toggleGlowTitle: 'Glow effect (turn off on slower computers)',
    toggleLightChip: '☀️ Light mode',
    toggleDarkChip: '🌙 Dark mode',
    hintDragBold: 'Drag',
    hintDragRest: ' orbit',
    hintScrollBold: 'Scroll',
    hintScrollRest: ' zoom',
    hintClickBold: 'Click',
    hintClickRest: ' fly to',
    tourBadge: '🧭 AUTOPILOT COSMIC TOUR',
    marvelTourBadge: '🦝 GUARDIANS OF THE GALAXY TOUR',
    tourExitAria: 'Exit guided tour',
    tourPrev: '⬅️ Previous',
    tourNext: 'Next stop ➡️',
    tourFinish: 'Finish tour 🏁',
    readAloud: '🔊 Read aloud',
    stopReading: '⏹️ Stop reading',
    sayIt: (pron, cat) => `Say it: "${pron}" • ${cat}`,
    quickStatsTitle: '📊 Quick stats',
    funFactsTitle: '✨ Mind-blowing facts',
    travelTimesTitle: '🚀 How long to travel here?',
    travelModes: {
      light: '⚡ Speed of light',
      voyager1: '📡 Voyager 1 speed',
      voyager2: '🛸 Voyager 2 speed',
      jetPlane: '✈️ Passenger jet',
      apolloRocket: '🚀 Apollo rocket',
      spacecraft: '🚀 NASA spacecraft',
      jumpPoint: '💠 Hexagonal Jump Point',
      bifrost: '🌈 The Bifrost (Einstein-Rosen Bridge)'
    },
    travelRightHere: 'Right here in our Solar System!',
    knownExoplanetsTitle: '🪐 Known exoplanets in this system (click to fly)',
    funFactSpeechPrefix: ' Fun fact: ',
    roadsterLiveHeader: '🚗 LIVE STARMAN TESLA ROADSTER TELEMETRY',
    voyagerLiveHeader: '📡 LIVE INTERSTELLAR TELEMETRY',
    roadsterLiveSub: (tel) =>
      `Earth distance: ${tel.earthDistanceMillionKm}M km (${tel.earthDistanceAU} AU) • Speed: ${tel.speedKmS} km/s (${tel.speedMph}) • Orbits since 2018: ${tel.orbitsCompleted}`,
    voyagerLiveSub: (tel) =>
      `Speed ${tel.speedKmS} km/s (${tel.speedMph}) • one-way radio time ${tel.oneWayLightTimeHours} h`,
    timeSlowerAria: 'Slow down time',
    timePauseAria: 'Pause time',
    timeResumeAria: 'Resume time',
    timeFasterAria: 'Speed up time',
    timeNowBtn: 'Now',
    timePausedPrefix: 'Paused',
    timeSpeeds: [
      'Real time',
      '1 min / sec',
      '1 hour / sec',
      '1 day / sec',
      '1 week / sec',
      '1 month / sec',
      '1 year / sec',
      '10 years / sec'
    ],
    zoomInBtn: '➕ In',
    zoomOutBtn: '➖ Out',
    zoomSliderAria: 'Cosmic zoom level from Earth to the observable universe',
    zoomMarkers: [
      '🌍 Earth & Moon',
      '☀️ Solar System & Voyagers',
      '⭐ Nearby stars & exoplanets',
      '🌌 Milky Way',
      '🕸️ Universe'
    ],
    marvelZoomMarkers: [
      '🛸 Midgard & Orbit',
      '⚡ Thor’s Nine Realms',
      '🦝 Guardians Worlds',
      '🌀 Sakaar & Titan',
      '💎 Infinity & Celestials'
    ],
    creditsBtn: 'ℹ️ Credits & data sources',
    creditsTitle: 'Credits & data sources',
    creditsIntro: 'Cosmic Explorer 3D is free and open source (MIT). It renders real data:',
    creditsItems: [
      { bold: 'Earth:', text: ' NASA Visible Earth Blue Marble (land/ocean), Black Marble 2016 (night lights), NASA cloud composite — public domain.' },
      { bold: 'Moon:', text: ' Solar System Scope color map (CC BY 4.0); NASA SVS LRO LOLA elevation.' },
      { bold: 'Sun & planets:', text: ' Solar System Scope texture maps — CC BY 4.0 (solarsystemscope.com/textures).' },
      { bold: 'Night sky:', text: ' ESO / S. Brunier Milky Way panorama (eso0932a) — CC BY 4.0.' },
      { bold: 'Orbits:', text: ' JPL approximate Keplerian elements (1800–2050); Meeus lunar theory; IAU rotation elements.' },
      { bold: 'Voyager 1, Voyager 2 & Starman’s Tesla Roadster:', text: ' NASA/JPL Horizons trajectory & osculating elements (-31, -32, -143205 / 2018-017A).' },
      { bold: 'All 6,451 Confirmed Exoplanets:', text: ' NASA Exoplanet Archive (pscomppars TAP catalog, 6,451 planets across 4,847 host systems) + Hipparcos/Gaia 3D coordinates.' },
      { bold: 'Engine:', text: ' three.js (MIT). Exoplanet surfaces, the Milky Way particle model and the cosmic web are artist’s impressions built from real structure data.' }
    ],
    marvelCreditsDisclaimer:
      'Fan-made educational tribute. Not affiliated with or endorsed by Marvel or Disney. Guardians of the Galaxy, Thor and related names are trademarks of Marvel.',
    exoModalTitle: '🪐 NASA Exoplanet Archive — All 6,451 Confirmed Worlds',
    exoModalSubtitle:
      'Every confirmed exoplanet outside our Solar System (4,847 host star systems • 152 habitable-zone candidates) plotted at true 3D RA/Dec & Gaia distance. Click any star or planet to materialize and fly there in 3D!',
    exoSearchPlaceholder: 'Search 6,451 exoplanets or host stars (e.g. Kepler-186, TOI-700, K2-18, 55 Cnc, Wasp, Gliese)…',
    exoCloudBtn: '🔭 View 3D Kepler/TESS Cone',
    exoFilterAll: 'All 4,847 Systems (6,451 Planets)',
    exoFilterHz: '🌱 Habitable Zone (152)',
    exoFilterMulti: '🪐 Multi-Planet Systems (3+)',
    exoFilterNear: '📍 Nearest (< 65 ly)',
    exoFilterKepler: '🔭 Kepler & TESS Worlds',
    exoSummary: (shown, totalSys, totalPlanets) =>
      `Showing ${shown} of ${totalSys.toLocaleString()} matching star systems (${totalPlanets.toLocaleString()} confirmed exoplanets) • Click any system or planet to fly there in 3D`,
    exoSysMeta: (distLy, sp, teff, count) =>
      `${distLy} ly • Spectral ${sp || 'G'} (${teff || 5500} K) • ${count} planet${count > 1 ? 's' : ''}`,
    exoFlyBtn: '🚀 Fly to System',
    exoTypes: { rocky: 'rocky', ocean: 'ocean', lava: 'lava', ice: 'ice', gas: 'gas' },
    exoMethods: {
      Transit: 'Transit',
      'Radial Velocity': 'Radial Velocity',
      Imaging: 'Imaging',
      Microlensing: 'Microlensing',
      Timing: 'Timing'
    },
    quizModalTitle: '👩‍🚀 Junior Astronaut Cosmic Challenge',
    marvelQuizModalTitle: '🦝 Guardians of the Galaxy & Astrophysics Challenge',
    quizProgress: (cur, tot, score) => `Question ${cur} of ${tot} • Score: ${score}`,
    quizNextBtn: 'Next question ➡️',
    quizSeeBadgeBtn: 'See my badge 🏆',
    quizCompleteTitle: (score, tot) => `Junior Astronaut badge earned! Score: ${score} / ${tot}`,
    marvelQuizCompleteTitle: (score, tot) => `Guardian of the Galaxy badge earned! Score: ${score} / ${tot}`,
    quizCompleteMsg:
      'You explored from Earth and the Moon past Voyager 1 & 2, Alpha Centauri, the Milky Way, and out to the cosmic web!',
    marvelQuizCompleteMsg:
      'You journeyed from the Benatar and Asgard’s Bifrost across Nidavellir’s neutron star forge, Knowhere, Sakaar, Titan, and out to Arishem!',
    quizPlayAgainBtn: '🔄 Play again'
  },

  es: {
    pageTitle: 'Cosmic Explorer 3D — De la Tierra y la Luna al Borde del Universo y Guardianes de la Galaxia',
    metaDescription:
      'Cosmic Explorer 3D — un viaje 3D fotorrealista libre y gratuito desde la Tierra y la Luna hasta las sondas Voyager, exoplanetas cercanos, la Vía Láctea, el borde del universo observable y Guardianes de la Galaxia.',
    canvasAria: 'Universo 3D interactivo — arrastra para orbitar, usa la rueda para acercar, haz clic en cualquier mundo para volar allí',
    loadingTitle: 'Cosmic Explorer 3D',
    loadingWarmup: 'Calentando los motores espaciales…',
    loadingHint: 'Imágenes reales de la NASA y ESO • órbitas reales para la fecha de hoy • gratis y abierto para niños curiosos',
    loadingMsgs: [
      'Desplegando la Canica Azul de la NASA…',
      'Puliendo los anillos de Saturno…',
      'Mapeando 6,451 exoplanetas de la NASA…',
      'Forjando el Stormbreaker en Nidavellir con Rocket y Groot…',
      'Contactando con Voyager 1…'
    ],
    webglError: 'Lo sentimos: tu navegador no pudo iniciar WebGL. Prueba Chrome, Edge, Firefox o Safari en una computadora o teléfono reciente.',
    brandTitle: 'Cosmic Explorer 3D',
    brandSubtitle: 'Universo interactivo libre y gratuito para niños curiosos',
    marvelBrandSubtitle: 'Guardianes de la Galaxia • Los Nueve Reinos de Thor • Astrofísica Real',
    universeNasaTab: '🔭 Cosmos NASA',
    universeMarvelTab: '🦝 Guardianes de la Galaxia',
    universeMarvelTabShort: '🦝 Guardianes',
    universeMarvelTabFull: 'Guardianes de la Galaxia',
    marvelFilterLabel: '🦝 Facción:',
    mobileOptionsTitle: 'Alternar opciones de vista',
    mobileDetailsExpand: '▲ Detalles',
    mobileDetailsCollapse: '▼ Cerrar',
    marvelScienceBadge: '🔬 LORE DE GUARDIANES VS. ASTROFÍSICA REAL DE LA NASA',
    scaleStepperAria: 'Escalas cósmicas de zoom',
    exoBtn: '🪐 6,451 Exoplanetas',
    exoBtnTitle: 'Explora y vuela a los 6,451 exoplanetas confirmados de la NASA',
    tourBtn: '🧭 Tour Guiado',
    marvelTourBtn: '🦝 Tour Guardianes',
    quizBtn: '🏆 Trivia Espacial',
    marvelQuizBtn: '🦝 Trivia Guardianes',
    lightModeBtn: '☀️ Modo Claro',
    darkModeBtn: '🌙 Modo Oscuro',
    themeBtnTitle: 'Cambiar entre Cosmos Oscuro y Atlas Estelar Claro',
    cleanViewBtn: '🖼️ Vista Limpia',
    showPanelsBtn: '🧭 Mostrar paneles',
    cleanViewTitle: 'Ocultar paneles para una vista limpia',
    flyToLabel: '🎯 Volar a:',
    liveTelemetryTitle: 'Telemetría heliocéntrica en vivo (haz clic en cualquier nave para volar allí)',
    roadsterLabel: '🚗 Roadster:',
    voyager1Label: 'Voyager 1:',
    voyager2Label: 'Voyager 2:',
    roadsterDistPill: (mKm, au, kms) => `${mKm}M km (${au} UA • ${kms} km/s)`,
    voyagerDistPill: (bKm, au) => `${bKm} mil M km (${au} UA)`,
    fromSunKmAU: (kmStr, au) => `${kmStr} km del Sol (${au} UA)`,
    fromSunKm: (kmStr) => `${kmStr} km del Sol`,
    scaleEyebrow: 'ESCALA CÓSMICA ACTUAL',
    marvelScaleEyebrow: 'ESCALA CÓSMICA DE LOS GUARDIANES',
    toggleOrbits: '⭕ Órbitas',
    toggleLabels: '🏷️ Etiquetas',
    toggleHz: '🌱 Zonas habitables',
    toggleScaleOff: '📏 Escala real',
    toggleScaleOn: '📏 Escala real (activa)',
    toggleScaleTitle: 'La escala explorador comprime las distancias para verlo todo. La escala real muestra el verdadero vacío del espacio.',
    toggleGlow: '✨ Brillo',
    toggleGlowTitle: 'Efecto de resplandor (desactívalo en computadoras lentas)',
    toggleLightChip: '☀️ Modo claro',
    toggleDarkChip: '🌙 Modo oscuro',
    hintDragBold: 'Arrastra',
    hintDragRest: ' rotar',
    hintScrollBold: 'Rueda',
    hintScrollRest: ' zoom',
    hintClickBold: 'Clic',
    hintClickRest: ' volar',
    tourBadge: '🧭 TOUR CÓSMICO EN PILOTO AUTOMÁTICO',
    marvelTourBadge: '🦝 TOUR GUARDIANES DE LA GALAXIA',
    tourExitAria: 'Salir del tour guiado',
    tourPrev: '⬅️ Anterior',
    tourNext: 'Siguiente parada ➡️',
    tourFinish: 'Finalizar tour 🏁',
    readAloud: '🔊 Leer en voz alta',
    stopReading: '⏹️ Detener lectura',
    sayIt: (pron, cat) => `Pronunciación: "${pron}" • ${cat}`,
    quickStatsTitle: '📊 Datos rápidos',
    funFactsTitle: '✨ Datos asombrosos',
    travelTimesTitle: '🚀 ¿Cuánto tardaríamos en llegar?',
    travelModes: {
      light: '⚡ Velocidad de la luz',
      voyager1: '📡 Velocidad de Voyager 1',
      voyager2: '🛸 Velocidad de Voyager 2',
      jetPlane: '✈️ Avión comercial',
      apolloRocket: '🚀 Cohete Apolo',
      spacecraft: '🚀 Nave de la NASA',
      jumpPoint: '💠 Punto de Salto Hexagonal',
      bifrost: '🌈 El Bifrost (Puente Einstein-Rosen)'
    },
    travelRightHere: '¡Aquí mismo en nuestro Sistema Solar!',
    knownExoplanetsTitle: '🪐 Exoplanetas conocidos en este sistema (clic para volar)',
    funFactSpeechPrefix: ' Dato curioso: ',
    roadsterLiveHeader: '🚗 TELEMETRÍA EN VIVO DEL TESLA ROADSTER DE STARMAN',
    voyagerLiveHeader: '📡 TELEMETRÍA INTERESTELAR EN VIVO',
    roadsterLiveSub: (tel) =>
      `Distancia a la Tierra: ${tel.earthDistanceMillionKm}M km (${tel.earthDistanceAU} UA) • Velocidad: ${tel.speedKmS} km/s • Órbitas desde 2018: ${tel.orbitsCompleted}`,
    voyagerLiveSub: (tel) =>
      `Velocidad ${tel.speedKmS} km/s (${tel.speedMph}) • tiempo de radio (ida) ${tel.oneWayLightTimeHours} h`,
    timeSlowerAria: 'Desacelerar el tiempo',
    timePauseAria: 'Pausar el tiempo',
    timeResumeAria: 'Reanudar el tiempo',
    timeFasterAria: 'Acelerar el tiempo',
    timeNowBtn: 'Ahora',
    timePausedPrefix: 'En pausa',
    timeSpeeds: [
      'Tiempo real',
      '1 min / seg',
      '1 hora / seg',
      '1 día / seg',
      '1 semana / seg',
      '1 mes / seg',
      '1 año / seg',
      '10 años / seg'
    ],
    zoomInBtn: '➕ Acercar',
    zoomOutBtn: '➖ Alejar',
    zoomSliderAria: 'Nivel de zoom cósmico desde la Tierra hasta el universo observable',
    zoomMarkers: [
      '🌍 Tierra y Luna',
      '☀️ Sistema Solar y Voyagers',
      '⭐ Estrellas y exoplanetas',
      '🌌 Vía Láctea',
      '🕸️ Universo'
    ],
    marvelZoomMarkers: [
      '🛸 Midgard y Órbita',
      '⚡ Los Nueve Reinos de Thor',
      '🦝 Mundos de los Guardianes',
      '🌀 Sakaar y Titán',
      '💎 Gemas del Infinito y Celestiales'
    ],
    creditsBtn: 'ℹ️ Créditos y fuentes de datos',
    creditsTitle: 'Créditos y fuentes de datos',
    creditsIntro: 'Cosmic Explorer 3D es libre y de código abierto (MIT). Renderiza datos científicos reales:',
    creditsItems: [
      { bold: 'Tierra:', text: ' NASA Visible Earth Blue Marble (tierra/océano), Black Marble 2016 (luces nocturnas), nubes de la NASA — dominio público.' },
      { bold: 'Luna:', text: ' Mapa de color de Solar System Scope (CC BY 4.0); elevación LRO LOLA de NASA SVS.' },
      { bold: 'Sol y planetas:', text: ' Mapas de texturas de Solar System Scope — CC BY 4.0 (solarsystemscope.com/textures).' },
      { bold: 'Cielo nocturno:', text: ' Panorama de la Vía Láctea de ESO / S. Brunier (eso0932a) — CC BY 4.0.' },
      { bold: 'Órbitas:', text: ' Elementos keplerianos aproximados de JPL (1800–2050); teoría lunar de Meeus; elementos de rotación de la UAI.' },
      { bold: 'Voyager 1, Voyager 2 y Tesla Roadster de Starman:', text: ' Trayectorias y elementos osculadores de NASA/JPL Horizons (-31, -32, -143205 / 2018-017A).' },
      { bold: 'Los 6,451 Exoplanetas Confirmados:', text: ' Archivo de Exoplanetas de la NASA (catálogo TAP pscomppars, 6,451 planetas en 4,847 sistemas) + coordenadas 3D Hipparcos/Gaia.' },
      { bold: 'Motor 3D:', text: ' three.js (MIT). Las superficies de exoplanetas, el modelo de la Vía Láctea y la red cósmica son recreaciones basadas en datos estructurales reales.' }
    ],
    marvelCreditsDisclaimer:
      'Tributo educativo hecho por fans. No afiliado ni respaldado por Marvel ni Disney. Guardianes de la Galaxia, Thor y los nombres relacionados son marcas registradas de Marvel.',
    exoModalTitle: '🪐 Archivo de Exoplanetas de la NASA — Los 6,451 Mundos Confirmados',
    exoModalSubtitle:
      'Todos los exoplanetas confirmados fuera de nuestro Sistema Solar (4,847 sistemas estelares • 152 candidatos en zona habitable) trazados en coordenadas 3D reales. ¡Haz clic en cualquier estrella o planeta para volar allí en 3D!',
    exoSearchPlaceholder: 'Buscar entre 6,451 exoplanetas o estrellas (ej. Kepler-186, TOI-700, K2-18, 55 Cnc, Wasp, Gliese)…',
    exoCloudBtn: '🔭 Ver Cono 3D Kepler/TESS',
    exoFilterAll: 'Los 4,847 Sistemas (6,451 Planetas)',
    exoFilterHz: '🌱 Zona Habitable (152)',
    exoFilterMulti: '🪐 Multiplanetarios (3+)',
    exoFilterNear: '📍 Más cercanos (< 65 al)',
    exoFilterKepler: '🔭 Mundos Kepler y TESS',
    exoSummary: (shown, totalSys, totalPlanets) =>
      `Mostrando ${shown} de ${totalSys.toLocaleString()} sistemas estelares (${totalPlanets.toLocaleString()} exoplanetas confirmados) • Haz clic en cualquier sistema o planeta para volar en 3D`,
    exoSysMeta: (distLy, sp, teff, count) =>
      `${distLy} años luz • Tipo ${sp || 'G'} (${teff || 5500} K) • ${count} planeta${count > 1 ? 's' : ''}`,
    exoFlyBtn: '🚀 Volar al Sistema',
    exoTypes: { rocky: 'rocoso', ocean: 'oceánico', lava: 'lava', ice: 'helado', gas: 'gaseoso' },
    exoMethods: {
      Transit: 'Tránsito',
      'Radial Velocity': 'Velocidad Radial',
      Imaging: 'Imagen Directa',
      Microlensing: 'Microlente',
      Timing: 'Temporización'
    },
    quizModalTitle: '👩‍🚀 Desafío Cósmico de Astronauta Junior',
    marvelQuizModalTitle: '🦝 Desafío de Guardianes de la Galaxia y Astrofísica',
    quizProgress: (cur, tot, score) => `Pregunta ${cur} de ${tot} • Puntuación: ${score}`,
    quizNextBtn: 'Siguiente pregunta ➡️',
    quizSeeBadgeBtn: 'Ver mi insignia 🏆',
    quizCompleteTitle: (score, tot) => `¡Insignia de Astronauta Junior obtenida! Puntuación: ${score} / ${tot}`,
    marvelQuizCompleteTitle: (score, tot) => `¡Insignia de Guardián de la Galaxia obtenida! Puntuación: ${score} / ${tot}`,
    quizCompleteMsg:
      '¡Exploraste desde la Tierra y la Luna hasta Voyager 1 y 2, Alfa Centauri, la Vía Láctea y la red cósmica!',
    marvelQuizCompleteMsg:
      '¡Viajaste desde la Benatar y el Bifrost de Asgard hasta la forja estelar de Nidavellir, Knowhere, Sakaar, Titán y Arishem!',
    quizPlayAgainBtn: '🔄 Jugar de nuevo'
  },

  zh: {
    pageTitle: '宇宙探索者 3D — 从地月系统到可观测宇宙边缘与银河护卫队',
    metaDescription:
      '宇宙探索者 3D —— 免费开源的 3D 宇宙探索之旅，从地球与月球一路飞往旅行者号探测器、邻近系外行星、银河系、可观测宇宙边缘与银河护卫队宇宙。',
    canvasAria: '交互式 3D 宇宙 — 拖动旋转视角，滚轮或双指缩放，点击任意星球飞往该处',
    loadingTitle: '宇宙探索者 3D',
    loadingWarmup: '正在预热曲速引擎…',
    loadingHint: '真实 NASA 与欧洲南方天文台影像 • 今日真实天体轨道 • 免费开源的少儿太空天文馆',
    loadingMsgs: [
      '正在展开 NASA 蓝色弹珠地球影像…',
      '正在擦亮土星璀璨的光环…',
      '正在加载 6,451 颗 NASA 已确认系外行星…',
      '正在开启阿斯加德彩虹桥与尼达维勒中子星熔炉…',
      '正在联络星际空间的旅行者1号…'
    ],
    webglError: '抱歉——您的浏览器无法启动 WebGL。请在电脑或新款手机上尝试使用 Chrome、Edge、Firefox 或 Safari。',
    brandTitle: '宇宙探索者 3D',
    brandSubtitle: '免费开源的交互式 3D 宇宙探索乐园',
    marvelBrandSubtitle: '银河护卫队 • 雷神的九界 • 真实天体物理学对照',
    universeNasaTab: '🔭 NASA 真实宇宙',
    universeMarvelTab: '🦝 银河护卫队',
    universeMarvelTabShort: '🦝 银河护卫队',
    universeMarvelTabFull: '银河护卫队',
    marvelFilterLabel: '🦝 星域筛选：',
    mobileOptionsTitle: '切换视图选项',
    mobileDetailsExpand: '▲ 详情',
    mobileDetailsCollapse: '▼ 收起',
    marvelScienceBadge: '🔬 银河护卫队设定 VS. NASA 真实天体物理学',
    scaleStepperAria: '宇宙缩放尺度导航',
    exoBtn: '🪐 6,451 颗系外行星',
    exoBtnTitle: '浏览并飞往全部 6,451 颗 NASA 已确认系外行星',
    tourBtn: '🧭 宇宙导览',
    marvelTourBtn: '🦝 银河护卫队导览',
    quizBtn: '🏆 太空问答',
    marvelQuizBtn: '🦝 银河护卫队问答',
    lightModeBtn: '☀️ 浅色星图',
    darkModeBtn: '🌙 深邃星空',
    themeBtnTitle: '在深邃星空模式与浅色星图模式之间切换',
    cleanViewBtn: '🖼️ 纯净视图',
    showPanelsBtn: '🧭 显示面板',
    cleanViewTitle: '隐藏面板以欣赏纯净星空',
    flyToLabel: '🎯 飞往：',
    liveTelemetryTitle: '实时日心轨道遥测数据（点击任意航天器立即飞往）',
    roadsterLabel: '🚗 特斯拉跑车：',
    voyager1Label: '旅行者1号：',
    voyager2Label: '旅行者2号：',
    roadsterDistPill: (mKm, au, kms) => `${(parseFloat(mKm) / 100).toFixed(2)}亿公里 (${au} AU • ${kms} km/s)`,
    voyagerDistPill: (bKm, au) => `${(parseFloat(bKm) * 10).toFixed(1)}亿公里 (${au} AU)`,
    fromSunKmAU: (kmStr, au) => `距太阳 ${kmStr} 公里 (${au} AU)`,
    fromSunKm: (kmStr) => `距太阳 ${kmStr} 公里`,
    scaleEyebrow: '当前宇宙尺度',
    marvelScaleEyebrow: '当前银河护卫队宇宙尺度',
    toggleOrbits: '⭕ 轨道线',
    toggleLabels: '🏷️ 星标名称',
    toggleHz: '🌱 宜居带',
    toggleScaleOff: '📏 真实比例',
    toggleScaleOn: '📏 真实比例 (已开启)',
    toggleScaleTitle: '探索比例适度放大了星球以便观察；真实比例则展示太空中真实的空旷尺度。',
    toggleGlow: '✨ 星光辉光',
    toggleGlowTitle: 'HDR 辉光特效（配置较低的电脑可关闭）',
    toggleLightChip: '☀️ 浅色星图',
    toggleDarkChip: '🌙 深邃星空',
    hintDragBold: '拖动',
    hintDragRest: '旋转',
    hintScrollBold: '滚轮',
    hintScrollRest: '缩放',
    hintClickBold: '点击',
    hintClickRest: '飞往',
    tourBadge: '🧭 自动驾驶宇宙巡游',
    marvelTourBadge: '🦝 银河护卫队宇宙巡游',
    tourExitAria: '退出宇宙导览',
    tourPrev: '⬅️ 上一站',
    tourNext: '下一站 ➡️',
    tourFinish: '完成导览 🏁',
    readAloud: '🔊 语音朗读',
    stopReading: '⏹️ 停止朗读',
    sayIt: (pron, cat) => `发音：“${pron}” • ${cat}`,
    quickStatsTitle: '📊 核心档案',
    funFactsTitle: '✨ 奇妙宇宙冷知识',
    travelTimesTitle: '🚀 飞到这里需要多久？',
    travelModes: {
      light: '⚡ 光速飞行',
      voyager1: '📡 旅行者1号速度',
      voyager2: '🛸 旅行者2号速度',
      jetPlane: '✈️ 民航客机',
      apolloRocket: '🚀 阿波罗登月火箭',
      spacecraft: '🚀 NASA 探测器',
      jumpPoint: '💠 六边形空间跳跃点',
      bifrost: '🌈 彩虹桥 (爱因斯坦-罗森桥)'
    },
    travelRightHere: '就在我们的太阳系家园里！',
    knownExoplanetsTitle: '🪐 该恒星系统已知的系外行星（点击飞往）',
    funFactSpeechPrefix: ' 趣味冷知识：',
    roadsterLiveHeader: '🚗 特斯拉跑车 (STARMAN) 实时遥测数据',
    voyagerLiveHeader: '📡 星际空间探测器实时遥测',
    roadsterLiveSub: (tel) =>
      `距地球：${tel.earthDistanceMillionKm}百万公里 (${tel.earthDistanceAU} AU) • 速度：${tel.speedKmS} 公里/秒 • 2018年以来绕日圈数：${tel.orbitsCompleted}`,
    voyagerLiveSub: (tel) =>
      `飞行速度 ${tel.speedKmS} 公里/秒 (${tel.speedMph}) • 单程无线电耗时 ${tel.oneWayLightTimeHours} 小时`,
    timeSlowerAria: '减慢时间流速',
    timePauseAria: '暂停时间',
    timeResumeAria: '继续时间',
    timeFasterAria: '加快时间流速',
    timeNowBtn: '现在',
    timePausedPrefix: '已暂停',
    timeSpeeds: [
      '实时同步',
      '1 分钟 / 秒',
      '1 小时 / 秒',
      '1 天 / 秒',
      '1 周 / 秒',
      '1 个月 / 秒',
      '1 年 / 秒',
      '10 年 / 秒'
    ],
    zoomInBtn: '➕ 放大',
    zoomOutBtn: '➖ 缩小',
    zoomSliderAria: '从地球到可观测宇宙的连续缩放滑块',
    zoomMarkers: [
      '🌍 地球与月球',
      '☀️ 太阳系与旅行者号',
      '⭐ 邻近恒星与系外行星',
      '🌌 银河系',
      '🕸️ 浩瀚宇宙'
    ],
    marvelZoomMarkers: [
      '🛸 米德加德与轨道',
      '⚡ 雷神的九界',
      '🦝 银河护卫队星域',
      '🌀 萨卡星与泰坦星',
      '💎 无限宝石与天神族'
    ],
    creditsBtn: 'ℹ️ 数据来源与致谢',
    creditsTitle: '数据来源与致谢',
    creditsIntro: '宇宙探索者 3D 是免费开源项目 (MIT)，基于真实天文学与航天数据渲染：',
    creditsItems: [
      { bold: '地球：', text: ' NASA Visible Earth“蓝色弹珠”（陆地与海洋）、2016“黑色弹珠”（城市夜景灯光）及 NASA 云层合成图——公有领域。' },
      { bold: '月球：', text: ' Solar System Scope 彩色月面图 (CC BY 4.0)；NASA SVS 月球勘测轨道飞行器 (LRO LOLA) 高程数据。' },
      { bold: '太阳与八大行星：', text: ' Solar System Scope 高清纹理贴图 — CC BY 4.0 (solarsystemscope.com/textures)。' },
      { bold: '夜空银河全景：', text: ' 欧洲南方天文台 ESO / S. Brunier 银河系全景图 (eso0932a) — CC BY 4.0。' },
      { bold: '天体轨道：', text: ' JPL 近似开普勒轨道根数 (1800–2050)；Meeus 月球运动理论；国际天文学联合会 (IAU) 自转参数。' },
      { bold: '旅行者1号、2号与特斯拉跑车：', text: ' NASA/JPL Horizons 真实飞行轨迹与密切轨道根数 (-31, -32, -143205 / 2018-017A)。' },
      { bold: '全部 6,451 颗已确认系外行星：', text: ' NASA 系外行星档案库（pscomppars 表，涵盖 4,847 个恒星系统的 6,451 颗行星）与 Hipparcos/Gaia 三维坐标。' },
      { bold: '3D 渲染引擎：', text: ' three.js (MIT)。系外行星表面、银河系粒子模型与宇宙大尺度纤维网基于真实天体结构数据构建。' }
    ],
    marvelCreditsDisclaimer:
      '粉丝制作的科普致敬项目。与漫威（Marvel）或迪士尼（Disney）无任何关联或官方授权。银河护卫队、雷神及相关名称均为漫威的商标。',
    exoModalTitle: '🪐 NASA 系外行星档案库 — 全部 6,451 颗已确认外星世界',
    exoModalSubtitle:
      '太阳系外全部已确认的系外行星（4,847 个宿主恒星系统 • 152 颗宜居带候选行星），按真实赤经/赤纬与盖亚距离绘制在 3D 星空中。点击任意恒星或行星即可在 3D 场景中生成并飞往！',
    exoSearchPlaceholder: '搜索 6,451 颗系外行星或宿主恒星（如 Kepler-186, TOI-700, K2-18, 55 Cnc, Wasp, Gliese）…',
    exoCloudBtn: '🔭 查看 3D 开普勒/TESS 观测锥',
    exoFilterAll: '全部 4,847 个系统 (6,451 颗行星)',
    exoFilterHz: '🌱 宜居带行星 (152)',
    exoFilterMulti: '🪐 多行星系统 (3颗以上)',
    exoFilterNear: '📍 最近邻近系统 (< 65 光年)',
    exoFilterKepler: '🔭 开普勒与 TESS 发现',
    exoSummary: (shown, totalSys, totalPlanets) =>
      `正在显示 ${shown} / ${totalSys.toLocaleString()} 个匹配恒星系统（共 ${totalPlanets.toLocaleString()} 颗已确认系外行星）• 点击任意恒星或行星即可 3D 飞往`,
    exoSysMeta: (distLy, sp, teff, count) =>
      `${distLy} 光年 • 光谱型 ${sp || 'G'} (${teff || 5500} K) • ${count} 颗行星`,
    exoFlyBtn: '🚀 飞往该系统',
    exoTypes: { rocky: '岩石行星', ocean: '海洋星球', lava: '熔岩星球', ice: '冰巨星', gas: '气态巨行星' },
    exoMethods: {
      Transit: '凌星法',
      'Radial Velocity': '径向速度法',
      Imaging: '直接成像法',
      Microlensing: '微引力透镜法',
      Timing: '脉冲星计时法'
    },
    quizModalTitle: '👩‍🚀 少年宇航员宇宙挑战赛',
    marvelQuizModalTitle: '🦝 银河护卫队与真实天体物理学挑战赛',
    quizProgress: (cur, tot, score) => `第 ${cur} / ${tot} 题 • 当前得分：${score}`,
    quizNextBtn: '下一题 ➡️',
    quizSeeBadgeBtn: '查看我的勋章 🏆',
    quizCompleteTitle: (score, tot) => `荣获少年宇航员勋章！得分：${score} / ${tot}`,
    marvelQuizCompleteTitle: (score, tot) => `荣获银河护卫队勋章！得分：${score} / ${tot}`,
    quizCompleteMsg:
      '你已经从地球和月球一路探索越过旅行者1号与2号、半人马座α星、银河系，直达浩瀚的宇宙网！',
    marvelQuizCompleteMsg:
      '你已经从贝纳塔号与阿斯加德彩虹桥一路穿越尼达维勒中子星熔炉、虚无之地、萨卡星、泰坦星，直面天神族阿里瑟姆！',
    quizPlayAgainBtn: '🔄 再玩一次'
  },
  ...UI_STRINGS_EXTRA
};

export const QUICK_TARGETS_I18N = {
  en: [
    { id: 'earth', label: '🌍 Earth' },
    { id: 'moon', label: '🌕 Moon' },
    { id: 'iss', label: '🛰️ Space Station' },
    { id: 'roadster', label: '🚗 Tesla Roadster' },
    { id: 'mars', label: '🔴 Mars' },
    { id: 'ceres', label: '🪨 Ceres' },
    { id: 'jupiter', label: '🌪️ Jupiter' },
    { id: 'saturn', label: '🪐 Saturn' },
    { id: 'pluto', label: '🤍 Pluto' },
    { id: 'haumea', label: '🥚 Haumea' },
    { id: 'makemake', label: '🐰 Makemake' },
    { id: 'eris', label: '❄️ Eris' },
    { id: 'voyager1', label: '📡 Voyager 1' },
    { id: 'voyager2', label: '🛸 Voyager 2' },
    { id: 'proximaCentauri', label: '⭐ Proxima b' },
    { id: 'trappist1', label: '🪐 TRAPPIST-1' },
    { id: 'tauCeti', label: '☀️ Tau Ceti' },
    { id: 'betelgeuse', label: '🔥 Betelgeuse' },
    { id: 'orionNebula', label: '🌫️ Orion Nebula' },
    { id: 'sagittariusA', label: '🕳️ Sagittarius A*' },
    { id: 'andromeda', label: '🌀 Andromeda' },
    { id: 'laniakea', label: '🕸️ Cosmic Web' }
  ],
  es: [
    { id: 'earth', label: '🌍 Tierra' },
    { id: 'moon', label: '🌕 Luna' },
    { id: 'iss', label: '🛰️ Estación Espacial' },
    { id: 'roadster', label: '🚗 Tesla Roadster' },
    { id: 'mars', label: '🔴 Marte' },
    { id: 'ceres', label: '🪨 Ceres' },
    { id: 'jupiter', label: '🌪️ Júpiter' },
    { id: 'saturn', label: '🪐 Saturno' },
    { id: 'pluto', label: '🤍 Plutón' },
    { id: 'haumea', label: '🥚 Haumea' },
    { id: 'makemake', label: '🐰 Makemake' },
    { id: 'eris', label: '❄️ Eris' },
    { id: 'voyager1', label: '📡 Voyager 1' },
    { id: 'voyager2', label: '🛸 Voyager 2' },
    { id: 'proximaCentauri', label: '⭐ Próxima b' },
    { id: 'trappist1', label: '🪐 TRAPPIST-1' },
    { id: 'tauCeti', label: '☀️ Tau Ceti' },
    { id: 'betelgeuse', label: '🔥 Betelgeuse' },
    { id: 'orionNebula', label: '🌫️ Nebulosa de Orión' },
    { id: 'sagittariusA', label: '🕳️ Sagitario A*' },
    { id: 'andromeda', label: '🌀 Andrómeda' },
    { id: 'laniakea', label: '🕸️ Red Cósmica' }
  ],
  zh: [
    { id: 'earth', label: '🌍 地球' },
    { id: 'moon', label: '🌕 月球' },
    { id: 'iss', label: '🛰️ 国际空间站' },
    { id: 'roadster', label: '🚗 特斯拉跑车' },
    { id: 'mars', label: '🔴 火星' },
    { id: 'ceres', label: '🪨 谷神星' },
    { id: 'jupiter', label: '🌪️ 木星' },
    { id: 'saturn', label: '🪐 土星' },
    { id: 'pluto', label: '🤍 冥王星' },
    { id: 'haumea', label: '🥚 妊神星' },
    { id: 'makemake', label: '🐰 鸟神星' },
    { id: 'eris', label: '❄️ 阋神星' },
    { id: 'voyager1', label: '📡 旅行者1号' },
    { id: 'voyager2', label: '🛸 旅行者2号' },
    { id: 'proximaCentauri', label: '⭐ 比邻星 b' },
    { id: 'trappist1', label: '🪐 TRAPPIST-1' },
    { id: 'tauCeti', label: '☀️ 天仓五' },
    { id: 'betelgeuse', label: '🔥 参宿四' },
    { id: 'orionNebula', label: '🌫️ 猎户座星云' },
    { id: 'sagittariusA', label: '🕳️ 人马座 A*' },
    { id: 'andromeda', label: '🌀 仙女座星系' },
    { id: 'laniakea', label: '🕸️ 宇宙网' }
  ],
  ...QUICK_TARGETS_EXTRA
};

/**
 * 3D floating label name translations for LabelLayer.js
 */
export const LABEL_NAMES_I18N = {
  es: {
    earth: 'Tierra',
    moon: 'La Luna',
    iss: 'Estación Espacial Internacional',
    sun: 'El Sol',
    mercury: 'Mercurio',
    venus: 'Venus',
    mars: 'Marte',
    jupiter: 'Júpiter',
    io: 'Ío',
    europa: 'Europa',
    ganymede: 'Ganimedes',
    callisto: 'Calisto',
    saturn: 'Saturno',
    titan: 'Titán',
    enceladus: 'Encélado',
    uranus: 'Urano',
    neptune: 'Neptuno',
    pluto: 'Plutón',
    ceres: 'Ceres',
    eris: 'Eris',
    haumea: 'Haumea',
    makemake: 'Makemake',
    halley: 'Cometa Halley',
    roadster: 'Tesla Roadster de Starman',
    asteroidBelt: 'Cinturón de Asteroides',
    kuiperBelt: 'Cinturón de Kuiper',
    heliopause: 'Heliopausa — borde de la burbuja solar',
    voyager1: 'Voyager 1',
    voyager2: 'Voyager 2',
    proximaCentauri: 'Próxima Centauri',
    alphaCentauri: 'Alfa Centauri A y B',
    barnardsStar: 'Estrella de Barnard',
    luhman16: 'Luhman 16 (enanas marrones)',
    sirius: 'Sirio A y B',
    epsilonEridani: 'Épsilon Erídani',
    tauCeti: 'Tau Ceti',
    luytensStar: 'Estrella de Luyten (GJ 273)',
    teegardensStar: 'Estrella de Teegarden',
    kapteynsStar: 'Estrella de Kapteyn',
    vanMaanensStar: 'Estrella de Van Maanen',
    procyon: 'Proción A y B',
    altair: 'Altair',
    vega: 'Vega',
    fomalhaut: 'Fomalhaut',
    pollux: 'Pólux',
    arcturus: 'Arturo',
    trappist1: 'TRAPPIST-1',
    '55cancri': '55 Cancri (Copérnico)',
    capella: 'Capella',
    pegasi51: '51 Pegasi (Helvetios)',
    castor: 'Cástor (séxtuple)',
    betaPictoris: 'Beta Pictoris',
    aldebaran: 'Aldebarán',
    regulus: 'Régulo',
    spica: 'Espiga (Spica)',
    canopus: 'Canopo',
    polaris: 'Polaris (Estrella Polar)',
    pleiades: 'Pléyades (Siete Hermanas)',
    betelgeuse: 'Betelgeuse',
    antares: 'Antares',
    rigel: 'Rigel',
    orionNebula: 'Nebulosa de Orión (M42)',
    deneb: 'Deneb',
    lagoonNebula: 'Nebulosa de la Laguna (M8)',
    crabNebula: 'Nebulosa del Cangrejo (M1)',
    eagleNebula: 'Nebulosa del Águila (Pilares de la Creación)',
    carinaNebula: 'Nebulosa de Carina',
    omegaCentauri: 'Omega Centauri',
    m13: 'Cúmulo de Hércules (M13)',
    sagittariusA: 'Sagitario A* — agujero negro central',
    orionSpur: 'Nuestro Sol — estás aquí (Brazo de Orión)',
    milkyWayDisk: 'Galaxia Vía Láctea',
    galacticBar: 'Barra Galáctica',
    'arm-scutum-centaurus-arm': 'Brazo Escudo-Centauro',
    'arm-perseus-arm': 'Brazo de Perseo',
    'arm-sagittarius-arm': 'Brazo de Sagitario',
    'arm-outer-arm': 'Brazo Exterior',
    orionArmLabel: 'Brazo de Orión (brazo local)',
    sagittariusDwarf: 'Galaxia Enana de Sagitario',
    lmc: 'Gran Nube de Magallanes',
    smc: 'Pequeña Nube de Magallanes',
    ursaMinorDwarf: 'Enana de la Osa Menor',
    dracoDwarf: 'Enana de Draco',
    sculptorDwarf: 'Enana del Escultor',
    sextansDwarf: 'Enana de Sextans',
    carinaDwarf: 'Enana de Carina',
    fornaxDwarf: 'Enana de Fornax',
    leoII: 'Enana Leo II',
    leoI: 'Enana Leo I',
    ngc6822: 'Galaxia de Barnard (NGC 6822)',
    andromeda: 'Galaxia de Andrómeda (M31)',
    triangulum: 'Galaxia del Triángulo (M33)',
    ngc253: 'Galaxia del Escultor (NGC 253)',
    m82: 'Galaxia del Cigarro (M82)',
    m81: 'Galaxia de Bode (M81)',
    centaurusA: 'Centauro A',
    m83: 'Molinete Austral (M83)',
    m101: 'Galaxia del Molinete (M101)',
    m51: 'Galaxia del Remolino (M51)',
    m104: 'Galaxia del Sombrero (M104)',
    m87: 'M87 y el Cúmulo de Virgo',
    fornaxCluster: 'Cúmulo de Fornax',
    centaurusCluster: 'Cúmulo de Centauro',
    hydraCluster: 'Cúmulo de Hidra',
    normaCluster: 'Cúmulo de Norma — El Gran Atractor',
    perseusCluster: 'Cúmulo de Perseo',
    laniakea: 'Supercúmulo Laniakea',
    comaCluster: 'Cúmulo de Coma',
    shapley: 'Supercúmulo de Shapley',
    bootesVoid: 'Vacío de Boyero (la Gran Nada)',
    sloanWall: 'Gran Muralla Sloan',
    herculesWall: 'Gran Muralla Hércules-Corona Boreal',
    localGroup: 'El Grupo Local',
    cmb: 'Fondo Cósmico de Microondas — borde del universo observable',
    ...(MARVEL_LABEL_NAMES.es || {})
  },
  zh: {
    earth: '地球',
    moon: '月球',
    iss: '国际空间站 (ISS)',
    sun: '太阳',
    mercury: '水星',
    venus: '金星',
    mars: '火星',
    jupiter: '木星',
    io: '木卫一 (伊奥)',
    europa: '木卫二 (欧罗巴)',
    ganymede: '木卫三 (盖尼米德)',
    callisto: '木卫四 (卡里斯托)',
    saturn: '土星',
    titan: '土卫六 (泰坦)',
    enceladus: '土卫二 (恩克拉多斯)',
    uranus: '天王星',
    neptune: '海王星',
    pluto: '冥王星',
    ceres: '谷神星',
    eris: '阋神星',
    haumea: '妊神星',
    makemake: '鸟神星',
    halley: '哈雷彗星',
    roadster: '“太空人”的特斯拉跑车',
    asteroidBelt: '主小行星带',
    kuiperBelt: '柯伊伯带',
    heliopause: '日球层顶 — 太阳风磁泡边界',
    voyager1: '旅行者1号',
    voyager2: '旅行者2号',
    proximaCentauri: '比邻星 (Proxima Centauri)',
    alphaCentauri: '半人马座α星 A 与 B (南门二)',
    barnardsStar: '巴纳德星',
    luhman16: '卢曼 16 (褐矮星双星)',
    wolf359: '沃夫 359',
    lalande21185: '拉兰德 21185',
    sirius: '天狼星 A 与 B',
    epsilonEridani: '波江座ε星 (天苑四)',
    tauCeti: '鲸鱼座τ星 (天仓五)',
    luytensStar: '鲁坦星 (GJ 273)',
    teegardensStar: '蒂加登星',
    kapteynsStar: '卡普坦星',
    vanMaanensStar: '范马南星',
    '61cygni': '天鹅座 61 A 与 B',
    procyon: '南河三 A 与 B',
    epsilonIndi: '印第安座ε星',
    altair: '牛郎星 (河鼓二)',
    vega: '织女星',
    fomalhaut: '北落师门',
    pollux: '北河三',
    arcturus: '大角星',
    trappist1: 'TRAPPIST-1',
    '55cancri': '巨蟹座 55 (哥白尼星)',
    capella: '五车二',
    pegasi51: '飞马座 51',
    castor: '北河二 (六合星)',
    betaPictoris: '绘架座β星',
    aldebaran: '毕宿五',
    regulus: '轩辕十四',
    achernar: '水委一',
    spica: '角宿一',
    canopus: '老人星',
    acrux: '十字架二',
    hadar: '马腹一',
    polaris: '北极星 (勾陈一)',
    pleiades: '昴星团 (七姐妹星团)',
    betelgeuse: '参宿四',
    antares: '心宿二 (大火)',
    kepler186: '开普勒-186',
    kepler22: '开普勒-22',
    rigel: '参宿七',
    orionNebula: '猎户座大星云 (M42)',
    kepler452: '开普勒-452',
    deneb: '天津四',
    lagoonNebula: '礁湖星云 (M8)',
    crabNebula: '蟹状星云 (M1)',
    eagleNebula: '鹰状星云 (创生之柱)',
    carinaNebula: '船底座星云',
    omegaCentauri: '半人马座ω星团',
    m13: '武仙座球状星团 (M13)',
    sagittariusA: '人马座 A* — 银河系中心黑洞',
    orionSpur: '太阳系 — 你在这里 (猎户臂)',
    milkyWayDisk: '银河系',
    galacticBar: '银河棒状核心',
    'arm-scutum-centaurus-arm': '盾牌-半人马臂',
    'arm-perseus-arm': '英仙臂',
    'arm-sagittarius-arm': '人马臂',
    'arm-outer-arm': '外旋臂',
    orionArmLabel: '猎户座旋臂 (本地旋臂)',
    sagittariusDwarf: '人马座矮椭圆星系',
    lmc: '大麦哲伦星云',
    smc: '小麦哲伦星云',
    ursaMinorDwarf: '小熊座矮星系',
    dracoDwarf: '天龙座矮星系',
    sculptorDwarf: '玉夫座矮星系',
    sextansDwarf: '六分仪座矮星系',
    carinaDwarf: '船底座矮星系',
    fornaxDwarf: '天炉座矮星系',
    leoII: '狮子座 II 矮星系',
    leoI: '狮子座 I 矮星系',
    ngc6822: '巴纳德星系 (NGC 6822)',
    andromeda: '仙女座星系 (M31)',
    triangulum: '三角座星系 (M33)',
    ngc253: '玉夫座星系 (NGC 253)',
    m82: '雪茄星系 (M82)',
    m81: '波德星系 (M81)',
    centaurusA: '半人马座 A',
    m83: '南风车星系 (M83)',
    m101: '风车星系 (M101)',
    m51: '涡状星系 (M51)',
    m104: '草帽星系 (M104)',
    m87: 'M87 与室女座星系团',
    fornaxCluster: '天炉座星系团',
    centaurusCluster: '半人马座星系团',
    hydraCluster: '长蛇座星系团',
    normaCluster: '矩尺座星系团 — 巨引源',
    perseusCluster: '英仙座星系团',
    laniakea: '拉尼亚凯亚超星系团',
    comaCluster: '后发座星系团',
    shapley: '夏普利超星系团',
    bootesVoid: '牧夫座空洞',
    sloanWall: '斯隆长城',
    herculesWall: '武仙-北冕座长城',
    localGroup: '本星系群',
    cmb: '宇宙微波背景辐射 — 可观测宇宙的边缘',
    ...(MARVEL_LABEL_NAMES.zh || {})
  },
  ja: { ...(LABEL_NAMES_EXTRA.ja || {}), ...(MARVEL_LABEL_NAMES_EXTRA.ja || {}) },
  ko: { ...(LABEL_NAMES_EXTRA.ko || {}), ...(MARVEL_LABEL_NAMES_EXTRA.ko || {}) },
  pt: { ...(LABEL_NAMES_EXTRA.pt || {}), ...(MARVEL_LABEL_NAMES_EXTRA.pt || {}) },
  fr: { ...(LABEL_NAMES_EXTRA.fr || {}), ...(MARVEL_LABEL_NAMES_EXTRA.fr || {}) },
  it: { ...(LABEL_NAMES_EXTRA.it || {}), ...(MARVEL_LABEL_NAMES_EXTRA.it || {}) }
};

// ---------------------------------------------------------------------------
// Merging helpers: per-language data is deep-merged over the English base so a
// missing field falls back to en instead of disappearing. Arrays take the
// localized items (no English item is appended to a localized list); array items
// that are objects are merged index-wise so structural fields (ids, cameras) survive.
// ---------------------------------------------------------------------------
function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;
}

export function deepMergeLocalized(base, over) {
  if (over === undefined || over === null) return base;
  if (Array.isArray(over)) {
    if (!over.length) return Array.isArray(base) ? base : over;
    const b = Array.isArray(base) ? base : [];
    return over.map((item, i) => deepMergeLocalized(b[i], item));
  }
  if (isPlainObject(over) && isPlainObject(base)) {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = deepMergeLocalized(base[k], over[k]);
    return out;
  }
  return over;
}

/** Merge chain en → existing → fill (later layers win). */
function mergeLayers(...layers) {
  return layers.reduce((acc, layer) => deepMergeLocalized(acc, layer));
}

const UI_CACHE = new Map();
export function getUI(lang = 'en') {
  const l = normalizeLang(lang);
  if (!UI_CACHE.has(l)) {
    UI_CACHE.set(l, l === 'en' ? UI_STRINGS.en : { ...UI_STRINGS.en, ...(UI_STRINGS[l] || {}) });
  }
  return UI_CACHE.get(l);
}

const isMarvelMode = (mode) => mode === 'marvel';

export function getQuickTargets(lang = 'en', universeMode = 'nasa') {
  if (isMarvelMode(universeMode)) return getMarvelQuickTargets(lang);
  return QUICK_TARGETS_I18N[normalizeLang(lang)] || QUICK_TARGETS_I18N.en;
}

export function getCosmicScales(lang = 'en', universeMode = 'nasa') {
  if (isMarvelMode(universeMode)) return getMarvelScales(lang);
  const l = normalizeLang(lang);
  const over = l === 'es' ? COSMIC_SCALES_ES : l === 'zh' ? COSMIC_SCALES_ZH : COSMIC_SCALES_EXTRA[l];
  if (!over) return COSMIC_SCALES;
  return COSMIC_SCALES.map((s, i) => deepMergeLocalized(s, over[i]));
}

function getNasaObject(id, lang) {
  const base = COSMIC_OBJECTS[id];
  if (!base) return null;
  const l = normalizeLang(lang);
  if (l === 'en') return base;
  const over = l === 'es' ? COSMIC_OBJECTS_ES[id] : l === 'zh' ? COSMIC_OBJECTS_ZH[id] : COSMIC_OBJECTS_EXTRA[l] && COSMIC_OBJECTS_EXTRA[l][id];
  return over ? deepMergeLocalized(base, over) : base;
}

/**
 * Inspector data for an object. In Guardians mode, Guardians worlds resolve through
 * getMarvelObject; anything else (e.g. Midgard/Earth) falls back to the NASA catalog.
 */
export function getCosmicObject(id, lang = 'en', universeMode = 'nasa') {
  if (isMarvelMode(universeMode)) {
    const m = getMarvelObject(id, lang);
    if (m) return m;
  }
  return getNasaObject(id, lang);
}

export function getGuidedTourStops(lang = 'en', universeMode = 'nasa') {
  if (isMarvelMode(universeMode)) return getMarvelTourStops(lang);
  const l = normalizeLang(lang);
  if (l === 'es') return GUIDED_TOUR_STOPS_ES;
  if (l === 'zh') return GUIDED_TOUR_STOPS_ZH;
  if (GUIDED_TOUR_STOPS_EXTRA[l]) return GUIDED_TOUR_STOPS_EXTRA[l];
  return GUIDED_TOUR_STOPS;
}

export function getSpaceQuizQuestions(lang = 'en', universeMode = 'nasa') {
  if (isMarvelMode(universeMode)) return getMarvelQuizQuestions(lang);
  const l = normalizeLang(lang);
  if (l === 'es') return SPACE_QUIZ_QUESTIONS_ES;
  if (l === 'zh') return SPACE_QUIZ_QUESTIONS_ZH;
  if (SPACE_QUIZ_QUESTIONS_EXTRA[l]) return SPACE_QUIZ_QUESTIONS_EXTRA[l];
  return SPACE_QUIZ_QUESTIONS;
}

export function getMarvelScales(lang = 'en') {
  const l = normalizeLang(lang);
  const over = MARVEL_SCALES_EXTRA[l] || (l !== 'en' && MARVEL_SCALES[l]);
  if (!over) return MARVEL_SCALES.en;
  return MARVEL_SCALES.en.map((s, i) => deepMergeLocalized(s, over[i]));
}

export function getMarvelQuickTargets(lang = 'en') {
  const l = normalizeLang(lang);
  const over = MARVEL_QUICK_TARGETS_EXTRA[l] || (l !== 'en' && MARVEL_QUICK_TARGETS[l]);
  if (!over) return MARVEL_QUICK_TARGETS.en;
  // Ids/categories come from en; only labels are localized (matched by id).
  const byId = new Map(over.map((t) => [t.id, t]));
  return MARVEL_QUICK_TARGETS.en.map((t) => ({ ...t, label: (byId.get(t.id) || t).label }));
}

export function getMarvelCategories(lang = 'en') {
  const l = normalizeLang(lang);
  const over = MARVEL_CATEGORIES_EXTRA[l] || (l !== 'en' && MARVEL_CATEGORIES[l]);
  if (!over) return MARVEL_CATEGORIES.en;
  const byId = new Map(over.map((c) => [c.id, c]));
  return MARVEL_CATEGORIES.en.map((c) => ({ ...c, label: (byId.get(c.id) || c).label }));
}

/** Internal id for Thanos's Titan (kept apart from Saturn's moon `titan`). */
function marvelKey(id) {
  return id === 'titan' && !MARVEL_OBJECTS.titan ? 'marvelTitan' : id;
}

export function isMarvelObjectId(id) {
  return !!MARVEL_OBJECTS[marvelKey(id)];
}

export function getMarvelObject(id, lang = 'en') {
  const key = marvelKey(id);
  const base = MARVEL_OBJECTS[key];
  if (!base) return null;
  const l = normalizeLang(lang);
  if (l === 'en') return base;
  const over = l === 'es' ? MARVEL_OBJECTS_ES[key] : l === 'zh' ? MARVEL_OBJECTS_ZH[key] : MARVEL_OBJECTS_EXTRA[l] && MARVEL_OBJECTS_EXTRA[l][key];
  return over ? mergeLayers(base, over) : base;
}

const TOUR_TEXT_FIELDS = ['title', 'narration'];
/** Guardians tour: objectId / zoom / camera always come from the en stops; only text is localized. */
export function getMarvelTourStops(lang = 'en') {
  const l = normalizeLang(lang);
  const en = MARVEL_GUIDED_TOUR_STOPS.en;
  const over = MARVEL_GUIDED_TOUR_STOPS_EXTRA[l] || (l !== 'en' && MARVEL_GUIDED_TOUR_STOPS[l]);
  if (!over) return en;
  return en.map((stop, i) => {
    const loc = over[i] || {};
    const out = { ...stop };
    for (const f of TOUR_TEXT_FIELDS) if (loc[f]) out[f] = loc[f];
    return out;
  });
}

export function getMarvelQuizQuestions(lang = 'en') {
  const l = normalizeLang(lang);
  if (MARVEL_QUIZ_QUESTIONS_EXTRA[l]) return MARVEL_QUIZ_QUESTIONS_EXTRA[l];
  return MARVEL_QUIZ_QUESTIONS[l] || MARVEL_QUIZ_QUESTIONS.en;
}

export function getLabelName(id, defaultName, lang = 'en') {
  const l = normalizeLang(lang);
  if (l === 'en') return defaultName;
  const map = LABEL_NAMES_I18N[l];
  if (map && map[id]) return map[id];
  const marvelMap = MARVEL_LABEL_NAMES[l] || MARVEL_LABEL_NAMES_EXTRA[l];
  if (marvelMap && marvelMap[id]) return marvelMap[id];
  return defaultName;
}

export function translateLabelSub(sub, lang = 'en') {
  if (!sub) return '';
  const l = normalizeLang(lang);
  if (l === 'en') return sub;
  let s = String(sub);
  if (l === 'es') {
    s = s
      .replace(/Our star • sunlight takes 8 min 20 s to reach Earth/g, 'Nuestra estrella • su luz tarda 8 min 20 s en llegar a la Tierra')
      .replace(/4\.3 million solar masses • 26,670 light-years away/g, '4.3 millones de masas solares • a 26,670 años luz')
      .replace(/light-years from the centre/g, 'años luz del centro')
      .replace(/105,700 light-years across • 200–400 billion stars/g, '105,700 años luz de ancho • 200–400 mil millones de estrellas')
      .replace(/~80 galaxies within 10 million light-years/g, '~80 galaxias en 10 millones de años luz')
      .replace(/Light from 13\.8 billion years ago, 46 billion light-years away in every direction/g, 'Luz de hace 13,800 millones de años, a 46 mil millones de años luz')
      .replace(/km away • (\d+)% lit/g, 'km de distancia • $1% iluminada')
      .replace(/km up • 27,600 km\/h/g, 'km de altitud • 27,600 km/h')
      .replace(/AU from the Sun/g, 'UA del Sol')
      .replace(/AU from Sun/g, 'UA del Sol')
      .replace(/M km from Earth/g, 'M km de la Tierra')
      .replace(/billion km • radio/g, 'mil millones km • radio')
      .replace(/thousand light-years away/g, 'mil años luz de distancia')
      .replace(/million light-years away/g, 'millones de años luz de distancia')
      .replace(/billion light-years away/g, 'mil millones de años luz de distancia')
      .replace(/thousand light-years/g, 'mil años luz')
      .replace(/million light-years/g, 'millones de años luz')
      .replace(/billion light-years/g, 'mil millones de años luz')
      .replace(/light-years away/g, 'años luz de distancia')
      .replace(/light-years/g, 'años luz')
      .replace(/habitable zone/g, 'zona habitable')
      .replace(/\bsub-Earth\b/g, 'sub-Tierra')
      .replace(/\bEarth-sized\b/g, 'tamaño terrestre')
      .replace(/\bsuper-Earth\b/g, 'super-Tierra')
      .replace(/\bsub-Neptune\b/g, 'sub-Neptuno')
      .replace(/\bNeptune-like\b/g, 'tipo Neptuno')
      .replace(/\bgas giant\b/g, 'gigante gaseoso')
      .replace(/\brocky\b/g, 'rocoso')
      .replace(/year:/g, 'año:')
      .replace(/\bhours\b/g, 'horas')
      .replace(/\bdays\b/g, 'días')
      .replace(/\byears\b/g, 'años');
  } else if (l === 'zh') {
    s = s
      .replace(/Our star • sunlight takes 8 min 20 s to reach Earth/g, '我们的母恒星 • 阳光到达地球需 8 分 20 秒')
      .replace(/4\.3 million solar masses • 26,670 light-years away/g, '430 万倍太阳质量 • 距离 26,670 光年')
      .replace(/light-years from the centre/g, '光年（距银河系中心）')
      .replace(/105,700 light-years across • 200–400 billion stars/g, '直径 105,700 光年 • 2000–4000 亿颗恒星')
      .replace(/~80 galaxies within 10 million light-years/g, '1000 万光年内的约 80 个星系')
      .replace(/Light from 13\.8 billion years ago, 46 billion light-years away in every direction/g, '来自 138 亿年前的创世余晖，距今 460 亿光年')
      .replace(/km away • (\d+)% lit/g, '公里远 • $1% 照亮')
      .replace(/km up • 27,600 km\/h/g, '公里高空 • 27,600 公里/小时')
      .replace(/AU from the Sun/g, 'AU（距太阳）')
      .replace(/AU from Sun/g, 'AU（距太阳）')
      .replace(/M km from Earth/g, '百万公里（距地球）')
      .replace(/billion km • radio/g, '十亿公里 • 无线电耗时')
      .replace(/thousand light-years away/g, '千光年远')
      .replace(/million light-years away/g, '百万光年远')
      .replace(/billion light-years away/g, '十亿光年远')
      .replace(/thousand light-years/g, '千光年')
      .replace(/million light-years/g, '百万光年')
      .replace(/billion light-years/g, '十亿光年')
      .replace(/light-years away/g, '光年远')
      .replace(/light-years/g, '光年')
      .replace(/habitable zone/g, '宜居带')
      .replace(/\bsub-Earth\b/g, '亚地球')
      .replace(/\bEarth-sized\b/g, '地球大小')
      .replace(/\bsuper-Earth\b/g, '超级地球')
      .replace(/\bsub-Neptune\b/g, '亚海王星')
      .replace(/\bNeptune-like\b/g, '类海王星')
      .replace(/\bgas giant\b/g, '气态巨行星')
      .replace(/\brocky\b/g, '岩质行星')
      .replace(/year:/g, '公转周期:')
      .replace(/\bhours\b/g, '小时')
      .replace(/\bdays\b/g, '天')
      .replace(/\byears\b/g, '年');
  } else if (l === 'ja') {
    s = s
      .replace(/Our star • sunlight takes 8 min 20 s to reach Earth/g, '私たちの恒星 • 太陽光は8分20秒で地球に届く')
      .replace(/4\.3 million solar masses • 26,670 light-years away/g, '太陽質量の430万倍 • 26,670光年先')
      .replace(/light-years from the centre/g, '光年（銀河中心から）')
      .replace(/105,700 light-years across • 200–400 billion stars/g, '直径105,700光年 • 2,000億〜4,000億個の恒星')
      .replace(/~80 galaxies within 10 million light-years/g, '1,000万光年以内の約80個の銀河')
      .replace(/Light from 13\.8 billion years ago, 46 billion light-years away in every direction/g, '138億年前の光 • 全方向に460億光年')
      .replace(/km away • (\d+)% lit/g, 'km先 • 照度$1%')
      .replace(/km up • 27,600 km\/h/g, 'km上空 • 27,600 km/h')
      .replace(/AU from the Sun/g, 'AU（太陽から）')
      .replace(/AU from Sun/g, 'AU（太陽から）')
      .replace(/M km from Earth/g, '百万km（地球から）')
      .replace(/billion km • radio/g, '十億km • 電波往復')
      .replace(/thousand light-years away/g, '千光年先')
      .replace(/million light-years away/g, '百万光年先')
      .replace(/billion light-years away/g, '十億光年先')
      .replace(/thousand light-years/g, '千光年')
      .replace(/million light-years/g, '百万光年')
      .replace(/billion light-years/g, '十億光年')
      .replace(/light-years away/g, '光年先')
      .replace(/light-years/g, '光年')
      .replace(/habitable zone/g, 'ハビタブルゾーン')
      .replace(/\bsub-Earth\b/g, '準地球型')
      .replace(/\bEarth-sized\b/g, '地球サイズ')
      .replace(/\bsuper-Earth\b/g, 'スーパーアース')
      .replace(/\bsub-Neptune\b/g, 'ミニネプチューン')
      .replace(/\bNeptune-like\b/g, '海王星型')
      .replace(/\bgas giant\b/g, '巨大ガス惑星')
      .replace(/\brocky\b/g, '岩石惑星')
      .replace(/year:/g, '公転周期:')
      .replace(/\bhours\b/g, '時間')
      .replace(/\bdays\b/g, '日')
      .replace(/\byears\b/g, '年');
  } else if (l === 'ko') {
    s = s
      .replace(/Our star • sunlight takes 8 min 20 s to reach Earth/g, '우리의 항성 • 태양빛이 지구까지 8분 20초 소요')
      .replace(/4\.3 million solar masses • 26,670 light-years away/g, '태양 질량의 430만 배 • 26,670광년 거리')
      .replace(/light-years from the centre/g, '광년 (은하 중심으로부터)')
      .replace(/105,700 light-years across • 200–400 billion stars/g, '지름 105,700광년 • 2,000억~4,000억 개의 별')
      .replace(/~80 galaxies within 10 million light-years/g, '1,000만 광년 이내의 약 80개 은하')
      .replace(/Light from 13\.8 billion years ago, 46 billion light-years away in every direction/g, '138억 년 전의 빛 • 모든 방향으로 460억 광년')
      .replace(/km away • (\d+)% lit/g, 'km 거리 • $1% 조도')
      .replace(/km up • 27,600 km\/h/g, 'km 상공 • 27,600 km/h')
      .replace(/AU from the Sun/g, 'AU (태양으로부터)')
      .replace(/AU from Sun/g, 'AU (태양으로부터)')
      .replace(/M km from Earth/g, '백만 km (지구로부터)')
      .replace(/billion km • radio/g, '십억 km • 전파 도달')
      .replace(/thousand light-years away/g, '천 광년 거리')
      .replace(/million light-years away/g, '백만 광년 거리')
      .replace(/billion light-years away/g, '십억 광년 거리')
      .replace(/thousand light-years/g, '천 광년')
      .replace(/million light-years/g, '백만 광년')
      .replace(/billion light-years/g, '십억 광년')
      .replace(/light-years away/g, '광년 거리')
      .replace(/light-years/g, '광년')
      .replace(/habitable zone/g, '생명체 거주가능영역')
      .replace(/\bsub-Earth\b/g, '준지구형')
      .replace(/\bEarth-sized\b/g, '지구 크기')
      .replace(/\bsuper-Earth\b/g, '슈퍼지구')
      .replace(/\bsub-Neptune\b/g, '미니해왕성')
      .replace(/\bNeptune-like\b/g, '해왕성형')
      .replace(/\bgas giant\b/g, '가스 거대 행성')
      .replace(/\brocky\b/g, '암석 행성')
      .replace(/year:/g, '공전 주기:')
      .replace(/\bhours\b/g, '시간')
      .replace(/\bdays\b/g, '일')
      .replace(/\byears\b/g, '년');
  } else if (l === 'pt') {
    s = s
      .replace(/Our star • sunlight takes 8 min 20 s to reach Earth/g, 'Nossa estrela • a luz leva 8 min 20 s até a Terra')
      .replace(/4\.3 million solar masses • 26,670 light-years away/g, '4,3 milhões de massas solares • a 26.670 anos-luz')
      .replace(/light-years from the centre/g, 'anos-luz do centro')
      .replace(/km away • (\d+)% lit/g, 'km de distância • $1% iluminada')
      .replace(/km up • 27,600 km\/h/g, 'km de altitude • 27.600 km/h')
      .replace(/AU from the Sun/g, 'UA do Sol')
      .replace(/AU from Sun/g, 'UA do Sol')
      .replace(/M km from Earth/g, 'M km da Terra')
      .replace(/billion km • radio/g, 'bilhões km • rádio')
      .replace(/thousand light-years away/g, 'mil anos-luz de distância')
      .replace(/million light-years away/g, 'milhões de anos-luz de distância')
      .replace(/billion light-years away/g, 'bilhões de anos-luz de distância')
      .replace(/thousand light-years/g, 'mil anos-luz')
      .replace(/million light-years/g, 'milhões de anos-luz')
      .replace(/billion light-years/g, 'bilhões de anos-luz')
      .replace(/light-years away/g, 'anos-luz de distância')
      .replace(/light-years/g, 'anos-luz')
      .replace(/habitable zone/g, 'zona habitável')
      .replace(/\bsub-Earth\b/g, 'sub-Terra')
      .replace(/\bEarth-sized\b/g, 'tamanho da Terra')
      .replace(/\bsuper-Earth\b/g, 'super-Terra')
      .replace(/\bsub-Neptune\b/g, 'sub-Netuno')
      .replace(/\bNeptune-like\b/g, 'tipo Netuno')
      .replace(/\bgas giant\b/g, 'gigante gasoso')
      .replace(/\brocky\b/g, 'rochoso')
      .replace(/year:/g, 'ano:')
      .replace(/\bhours\b/g, 'horas')
      .replace(/\bdays\b/g, 'dias')
      .replace(/\byears\b/g, 'anos');
  } else if (l === 'fr') {
    s = s
      .replace(/Our star • sunlight takes 8 min 20 s to reach Earth/g, 'Notre étoile • la lumière met 8 min 20 s jusqu’à la Terre')
      .replace(/4\.3 million solar masses • 26,670 light-years away/g, '4,3 millions de masses solaires • à 26 670 années-lumière')
      .replace(/light-years from the centre/g, 'années-lumière du centre')
      .replace(/km away • (\d+)% lit/g, 'km de distance • $1 % éclairée')
      .replace(/km up • 27,600 km\/h/g, 'km d’altitude • 27 600 km/h')
      .replace(/AU from the Sun/g, 'UA du Soleil')
      .replace(/AU from Sun/g, 'UA du Soleil')
      .replace(/M km from Earth/g, 'M km de la Terre')
      .replace(/billion km • radio/g, 'milliards km • radio')
      .replace(/thousand light-years away/g, 'milliers d’années-lumière')
      .replace(/million light-years away/g, 'millions d’années-lumière')
      .replace(/billion light-years away/g, 'milliards d’années-lumière')
      .replace(/thousand light-years/g, 'milliers d’années-lumière')
      .replace(/million light-years/g, 'millions d’années-lumière')
      .replace(/billion light-years/g, 'milliards d’années-lumière')
      .replace(/light-years away/g, 'années-lumière')
      .replace(/light-years/g, 'années-lumière')
      .replace(/habitable zone/g, 'zone habitable')
      .replace(/\bsub-Earth\b/g, 'sous-Terre')
      .replace(/\bEarth-sized\b/g, 'taille terrestre')
      .replace(/\bsuper-Earth\b/g, 'super-Terre')
      .replace(/\bsub-Neptune\b/g, 'sous-Neptune')
      .replace(/\bNeptune-like\b/g, 'type Neptune')
      .replace(/\bgas giant\b/g, 'géante gazeuse')
      .replace(/\brocky\b/g, 'rocheuse')
      .replace(/year:/g, 'année :')
      .replace(/\bhours\b/g, 'heures')
      .replace(/\bdays\b/g, 'jours')
      .replace(/\byears\b/g, 'ans');
  } else if (l === 'it') {
    s = s
      .replace(/Our star • sunlight takes 8 min 20 s to reach Earth/g, 'La nostra stella • la luce impiega 8 min 20 s fino alla Terra')
      .replace(/4\.3 million solar masses • 26,670 light-years away/g, '4,3 milioni di masse solari • a 26.670 anni luce')
      .replace(/light-years from the centre/g, 'anni luce dal centro')
      .replace(/km away • (\d+)% lit/g, 'km di distanza • $1% illuminata')
      .replace(/km up • 27,600 km\/h/g, 'km di quota • 27.600 km/h')
      .replace(/AU from the Sun/g, 'UA dal Sole')
      .replace(/AU from Sun/g, 'UA dal Sole')
      .replace(/M km from Earth/g, 'M km dalla Terra')
      .replace(/billion km • radio/g, 'miliardi km • radio')
      .replace(/thousand light-years away/g, 'mila anni luce di distanza')
      .replace(/million light-years away/g, 'milioni di anni luce di distanza')
      .replace(/billion light-years away/g, 'miliardi di anni luce di distanza')
      .replace(/thousand light-years/g, 'mila anni luce')
      .replace(/million light-years/g, 'milioni di anni luce')
      .replace(/billion light-years/g, 'miliardi di anni luce')
      .replace(/light-years away/g, 'anni luce di distanza')
      .replace(/light-years/g, 'anni luce')
      .replace(/habitable zone/g, 'zona abitabile')
      .replace(/\bsub-Earth\b/g, 'sub-Terra')
      .replace(/\bEarth-sized\b/g, 'dimensione terrestre')
      .replace(/\bsuper-Earth\b/g, 'super-Terra')
      .replace(/\bsub-Neptune\b/g, 'sub-Nettuno')
      .replace(/\bNeptune-like\b/g, 'tipo Nettuno')
      .replace(/\bgas giant\b/g, 'gigante gassoso')
      .replace(/\brocky\b/g, 'roccioso')
      .replace(/year:/g, 'anno:')
      .replace(/\bhours\b/g, 'ore')
      .replace(/\bdays\b/g, 'giorni')
      .replace(/\byears\b/g, 'anni');
  }
  return s;
}
