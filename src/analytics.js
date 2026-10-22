/**
 * Google Analytics 4 (GA4) & Firebase Web Analytics telemetry module for Cosmic Explorer 3D.
 * Loaded as an external ES module so Content-Security-Policy remains strict without 'unsafe-inline'.
 */

export const GA_MEASUREMENT_ID = 'G-FMWKYPEY68';
export const FIREBASE_APP_ID = '1:697625214430:web:b4d0f58b2e991d3682f14f';
export const STREAM_ID = '16177828713';
export const PROPERTY_ID = '521061448';
export const PRODUCTION_HOSTS = [
  'cosmic-explorer-universe.web.app',
  'cosmic-explorer-universe.firebaseapp.com'
];

let initialized = false;

export function initAnalytics() {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  const isProdHost = PRODUCTION_HOSTS.indexOf(window.location.hostname) !== -1;
  const isDebugGa = /[?&]debug_ga=1/.test(window.location.search);
  if (!isProdHost && !isDebugGa) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname + window.location.hash,
    site_name: 'cosmic-explorer-universe',
    firebase_app_id: FIREBASE_APP_ID,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  window.__cosmicAnalytics = {
    measurementId: GA_MEASUREMENT_ID,
    firebaseAppId: FIREBASE_APP_ID,
    streamId: STREAM_ID,
    propertyId: PROPERTY_ID,
    productionHosts: PRODUCTION_HOSTS,
    disabledOnLocal: Boolean(window[`ga-disable-${GA_MEASUREMENT_ID}`])
  };
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch (_) {
    // Ignore telemetry errors so UI never breaks
  }
}

export function trackObjectSelect(arg1, source = 'ui', language = 'en') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('select_cosmic_object', {
      object_id: String(arg1.objectId || ''),
      object_name: String(arg1.objectName || ''),
      scale_index: Number.isFinite(arg1.scaleIndex) ? arg1.scaleIndex : 0,
      source: String(arg1.source || 'ui'),
      language: String(arg1.language || 'en')
    });
    return;
  }
  trackEvent('select_cosmic_object', {
    object_id: String(arg1 || ''),
    source: String(source || 'ui'),
    language: String(language || 'en')
  });
}

export function trackScaleChange(arg1, scaleId = '', scaleName = '', language = 'en') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('change_cosmic_scale', {
      scale_index: Number.isFinite(arg1.scaleIndex) ? arg1.scaleIndex : 0,
      scale_id: String(arg1.scaleId || ''),
      scale_name: String(arg1.scaleName || ''),
      language: String(arg1.language || 'en')
    });
    return;
  }
  trackEvent('change_cosmic_scale', {
    scale_index: Number.isFinite(arg1) ? arg1 : 0,
    scale_id: String(scaleId || ''),
    scale_name: String(scaleName || ''),
    language: String(language || 'en')
  });
}

export function trackReadAloud(arg1, language = 'en', action = 'start') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('read_aloud', {
      object_id: String(arg1.objectId || ''),
      language: String(arg1.language || 'en'),
      action: String(arg1.action || arg1.mode || 'start')
    });
    return;
  }
  trackEvent('read_aloud', {
    object_id: String(arg1 || ''),
    language: String(language || 'en'),
    action: String(action || 'start')
  });
}

export function trackTourStep(arg1, stepIndex = 0, objectId = '', language = 'en') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('guided_tour_step', {
      action: String(arg1.action || 'step'),
      step_index: Number.isFinite(arg1.stepIndex) ? arg1.stepIndex : 0,
      object_id: String(arg1.objectId || ''),
      language: String(arg1.language || 'en')
    });
    return;
  }
  trackEvent('guided_tour_step', {
    action: String(arg1 || 'step'),
    step_index: Number.isFinite(stepIndex) ? stepIndex : 0,
    object_id: String(objectId || ''),
    language: String(language || 'en')
  });
}

export function trackExoplanetOpen(arg1, language = 'en') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('open_exoplanet_archive', {
      filter: String(arg1.filter || 'all'),
      language: String(arg1.language || 'en')
    });
    return;
  }
  trackEvent('open_exoplanet_archive', {
    filter: String(arg1 || 'all'),
    language: String(language || 'en')
  });
}

export function trackExoplanetFly(arg1, targetName = '', language = 'en') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('fly_to_exoplanet', {
      target_id: String(arg1.targetId || ''),
      target_name: String(arg1.targetName || arg1.filter || ''),
      language: String(arg1.language || 'en')
    });
    return;
  }
  trackEvent('fly_to_exoplanet', {
    target_id: String(arg1 || ''),
    target_name: String(targetName || ''),
    language: String(language || 'en')
  });
}

export function trackQuizEvent(arg1, details = {}) {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('space_quiz', {
      action: String(arg1.action || 'open'),
      score: Number.isFinite(arg1.score) ? arg1.score : 0,
      total: Number.isFinite(arg1.total) ? arg1.total : 5,
      language: String(arg1.language || arg1.lang || 'en')
    });
    return;
  }
  trackEvent('space_quiz', {
    action: String(arg1 || 'open'),
    ...details
  });
}

export function trackLanguageSwitch(arg1, fromLanguage = '') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('switch_language', {
      from_language: String(arg1.fromLanguage || ''),
      to_language: String(arg1.toLanguage || 'en')
    });
    return;
  }
  trackEvent('switch_language', {
    to_language: String(arg1 || 'en'),
    ...(fromLanguage ? { from_language: String(fromLanguage) } : {})
  });
}

export function trackThemeToggle(arg1, language = 'en') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('toggle_theme', {
      theme: String(arg1.theme || 'dark'),
      language: String(arg1.language || 'en')
    });
    return;
  }
  trackEvent('toggle_theme', {
    theme: String(arg1 || 'dark'),
    language: String(language || 'en')
  });
}

export function trackUniverseModeSwitch(arg1, language = 'en') {
  if (arg1 && typeof arg1 === 'object') {
    trackEvent('switch_universe_mode', {
      universe_mode: String(arg1.universeMode || arg1.mode || 'nasa'),
      language: String(arg1.language || 'en')
    });
    return;
  }
  trackEvent('switch_universe_mode', {
    universe_mode: String(arg1 || 'nasa'),
    language: String(language || 'en')
  });
}

export const trackUniverseSwitch = trackUniverseModeSwitch;

// Auto-initialize on module load
initAnalytics();
