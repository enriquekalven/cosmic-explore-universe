/**
 * Cosmic Explorer 3D — UI controller for the WebGL engine.
 * Security: DOM is built only with createElement / textContent / replaceChildren (no innerHTML).
 */
import { getVoyagerLiveTelemetry } from './cosmicData.js';
import { CosmicEngine3D, TIME_SPEEDS } from './engine/CosmicEngine3D.js';
import { formatDateUTC, GALACTIC_FRAME } from './engine/astro.js';
import { EXOPLANET_ARCHIVE_META, EXOPLANET_SYSTEMS, EXOPLANET_TYPES, EXOPLANET_METHODS } from './catalog/exoplanetArchive.js';
import { getStudioAudioUrl } from './catalog/audioManifest.js';
import {
  initAnalytics,
  trackObjectSelect,
  trackScaleChange,
  trackReadAloud,
  trackTourStep,
  trackExoplanetOpen,
  trackExoplanetFly,
  trackQuizEvent,
  trackLanguageSwitch,
  trackThemeToggle,
  trackUniverseSwitch
} from './analytics.js';
import {
  detectInitialLanguage,
  gateLang,
  getAvailableLanguages,
  isPreviewI18n,
  LANG_META,
  getUI,
  getQuickTargets,
  getMarvelCategories,
  getCosmicScales,
  getCosmicObject,
  getGuidedTourStops,
  getSpaceQuizQuestions
} from './i18n.js';

function el(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== '') node.textContent = text;
  return node;
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

const $ = (id) => document.getElementById(id);

const LANG_BCP47 = {
  en: 'en-US',
  es: 'es-ES',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  pt: 'pt-BR',
  fr: 'fr-FR',
  it: 'it-IT'
};

const EXO_TYPE_I18N = {
  es: {
    'sub-Earth': 'sub-Tierra',
    'Earth-sized': 'tamaño terrestre',
    'super-Earth': 'super-Tierra',
    'sub-Neptune': 'sub-Neptuno',
    'Neptune-like': 'tipo Neptuno',
    'gas giant': 'gigante gaseoso',
    rocky: 'rocoso'
  },
  zh: {
    'sub-Earth': '亚地球',
    'Earth-sized': '地球大小',
    'super-Earth': '超级地球',
    'sub-Neptune': '亚海王星',
    'Neptune-like': '类海王星',
    'gas giant': '气态巨行星',
    rocky: '岩质行星'
  },
  ja: {
    'sub-Earth': 'サブアース',
    'Earth-sized': '地球サイズ',
    'super-Earth': 'スーパーアース',
    'sub-Neptune': 'サブネプチューン',
    'Neptune-like': '海王星型',
    'gas giant': '巨大ガス惑星',
    rocky: '岩石惑星'
  },
  ko: {
    'sub-Earth': '서브어스',
    'Earth-sized': '지구 크기',
    'super-Earth': '슈퍼지구',
    'sub-Neptune': '서브넵튠',
    'Neptune-like': '해왕성형',
    'gas giant': '가스 거성',
    rocky: '암석 행성'
  },
  pt: {
    'sub-Earth': 'sub-Terra',
    'Earth-sized': 'tamanho da Terra',
    'super-Earth': 'super-Terra',
    'sub-Neptune': 'sub-Netuno',
    'Neptune-like': 'tipo Netuno',
    'gas giant': 'gigante gasoso',
    rocky: 'rochoso'
  },
  fr: {
    'sub-Earth': 'sous-Terre',
    'Earth-sized': 'taille terrestre',
    'super-Earth': 'super-Terre',
    'sub-Neptune': 'sous-Neptune',
    'Neptune-like': 'type Neptune',
    'gas giant': 'géante gazeuse',
    rocky: 'rocheuse'
  },
  it: {
    'sub-Earth': 'sub-Terra',
    'Earth-sized': 'dimensioni terrestri',
    'super-Earth': 'super-Terra',
    'sub-Neptune': 'sub-Nettuno',
    'Neptune-like': 'tipo Nettuno',
    'gas giant': 'gigante gassoso',
    rocky: 'roccioso'
  }
};

class CosmicExplorerApp {
  constructor() {
    initAnalytics();

    this.lang = detectInitialLanguage();
    document.documentElement.lang = LANG_BCP47[this.lang] || this.lang;

    this.universeMode = 'nasa';
    this.marvelFilter = 'all';
    this.mobileInspectorExpanded = false;
    this.selectedObjectId = 'earth';
    this.tourActive = false;
    this.tourIndex = 0;
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;
    this.isSpeaking = false;
    this.ready = false;
    this.loadedCount = 0;
    this.hashTimer = null;
    this.exoFilter = 'all';
    this.exoQuery = '';

    this.engine = new CosmicEngine3D({
      canvas: $('cosmic-canvas'),
      labelContainer: $('label-layer'),
      lang: this.lang,
      callbacks: {
        onSelect: (id, meta) => this.selectObject(id, true, false, meta && meta.fromUser ? '3d_scene' : 'engine'),
        onZoom: (z) => this.handleZoomUpdated(z),
        onStage: (i) => this.handleStage(i),
        onProgress: (url, loaded, total) => this.handleProgress(loaded, total),
        onReady: () => this.handleReady(),
        onInteract: () => this.scheduleHashUpdate()
      }
    });

    this._initLanguageSwitcher();
    this._initUniverseSwitcher();
    this._renderStaticChrome();
    this._initScaleStepper();
    this._initControls();
    this._initMobileLayout();
    this._initQuickTrackers();
    this._initTimeControls();
    this._initModals();
    this._initExoplanetExplorer();

    this.selectObject('earth', true, true);
    this.handleZoomUpdated(this.engine.targetZoom);
    this.updateVoyagerLiveBanner();
    setInterval(() => this.updateVoyagerLiveBanner(), 1000);
    setInterval(() => this.updateTimeReadout(), 250);

    this.engine.start();
    this.applyHash();
    this._updateHudOffsets();
    this.startDebugReadout();
    window.addEventListener('hashchange', () => this.applyHash());
    setTimeout(() => this.handleReady(), 9000);
  }

  get ui() {
    return getUI(this.lang);
  }

  // ------------------------------------------------------------ Universe Mode Switcher (NASA vs Marvel)
  _initUniverseSwitcher() {
    const nasaBtn = $('btn-universe-nasa');
    const marvelBtn = $('btn-universe-marvel');
    if (nasaBtn) {
      nasaBtn.addEventListener('click', () => this.setUniverseMode('nasa', { updateHash: true, track: true }));
    }
    if (marvelBtn) {
      marvelBtn.addEventListener('click', () => this.setUniverseMode('marvel', { updateHash: true, track: true }));
    }
  }

  setUniverseMode(mode, { updateHash = true, track = true } = {}) {
    const nextMode = mode === 'marvel' ? 'marvel' : 'nasa';
    const changed = nextMode !== this.universeMode;
    this.universeMode = nextMode;
    document.body.classList.toggle('marvel-mode', nextMode === 'marvel');

    const nasaBtn = $('btn-universe-nasa');
    const marvelBtn = $('btn-universe-marvel');
    if (nasaBtn) {
      nasaBtn.classList.toggle('active', nextMode === 'nasa');
      nasaBtn.setAttribute('aria-selected', String(nextMode === 'nasa'));
    }
    if (marvelBtn) {
      marvelBtn.classList.toggle('active', nextMode === 'marvel');
      marvelBtn.setAttribute('aria-selected', String(nextMode === 'marvel'));
    }

    const isMarvel = nextMode === 'marvel';
    const voyagerPill = $('voyager-live-pill');
    if (voyagerPill) voyagerPill.classList.toggle('hidden', isMarvel);
    const exoBtn = $('btn-open-exoplanets');
    if (exoBtn) exoBtn.classList.toggle('hidden', isMarvel);
    const hzBtn = $('btn-toggle-hz');
    if (hzBtn) hzBtn.classList.toggle('hidden', isMarvel);
    const marvelCatBar = $('marvel-cat-bar');
    if (marvelCatBar) marvelCatBar.classList.toggle('hidden', !isMarvel);

    this.stopTour();
    this.engine.setUniverseMode(nextMode);
    this._renderStaticChrome();
    this._initScaleStepper();
    this._renderMarvelCategoryBar();
    this._renderQuickTrackerButtons();
    this.handleStage(this.engine.lastStage >= 0 ? this.engine.lastStage : 0);

    const defaultId = isMarvel ? 'benatar' : 'earth';
    this.selectObject(defaultId, true, true);
    this.handleZoomUpdated(this.engine.targetZoom);
    this._updateHudOffsets();

    if (track && changed) {
      trackUniverseSwitch(nextMode, this.lang);
    }
    if (updateHash) {
      this.scheduleHashUpdate();
    }
  }

  _renderMarvelCategoryBar() {
    const bar = $('marvel-cat-bar');
    if (!bar) return;
    bar.replaceChildren();
    const cats = getMarvelCategories(this.lang);
    for (const cat of cats) {
      const btn = el('button', `marvel-cat-pill${cat.id === this.marvelFilter ? ' active' : ''}`, cat.label);
      btn.type = 'button';
      btn.dataset.cat = cat.id;
      btn.addEventListener('click', () => {
        this.marvelFilter = cat.id;
        this._renderMarvelCategoryBar();
        this._renderQuickTrackerButtons();
      });
      bar.appendChild(btn);
    }
  }

  // ------------------------------------------------------------ Mobile Layout & Dynamic HUD Offsets
  _initMobileLayout() {
    const toggleBtn = $('btn-toggle-inspector');
    const inspector = document.querySelector('.hud-right-inspector');
    if (toggleBtn && inspector) {
      toggleBtn.addEventListener('click', () => {
        this.mobileInspectorExpanded = !this.mobileInspectorExpanded;
        inspector.classList.toggle('is-collapsed-mobile', !this.mobileInspectorExpanded);
        toggleBtn.setAttribute('aria-expanded', String(this.mobileInspectorExpanded));
        toggleBtn.textContent = this.mobileInspectorExpanded
          ? this.ui.mobileDetailsCollapse
          : this.ui.mobileDetailsExpand;
      });
    }

    const mobileOptBtn = $('btn-mobile-options');
    if (mobileOptBtn) {
      mobileOptBtn.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('mobile-options-open');
        mobileOptBtn.classList.toggle('active-toggle', isOpen);
        mobileOptBtn.setAttribute('aria-pressed', String(isOpen));
      });
    }

    const bloomBtn = $('btn-toggle-bloom');
    if (bloomBtn && this.engine) {
      bloomBtn.classList.toggle('active-toggle', !!this.engine.bloom.enabled);
      bloomBtn.setAttribute('aria-pressed', String(!!this.engine.bloom.enabled));
    }

    const updateOffsets = () => this._updateHudOffsets();
    window.addEventListener('resize', updateOffsets, { passive: true });
    window.addEventListener('orientationchange', updateOffsets, { passive: true });

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => this._updateHudOffsets());
      const header = document.querySelector('.hud-header');
      const tracker = document.querySelector('.quick-tracker-bar');
      if (header) ro.observe(header);
      if (tracker) ro.observe(tracker);
      this._hudResizeObserver = ro;
    }
    this._updateHudOffsets();
  }

  _updateHudOffsets() {
    const header = document.querySelector('.hud-header');
    const tracker = document.querySelector('.quick-tracker-bar');
    if (!header || !tracker) return;

    const isNarrow = window.innerWidth <= 768;
    const marvelTab = $('btn-universe-marvel');
    if (marvelTab && this.ui) {
      marvelTab.textContent = isNarrow
        ? this.ui.universeMarvelTabShort || this.ui.universeMarvelTab
        : this.ui.universeMarvelTab;
    }

    const headerRect = header.getBoundingClientRect();
    if (headerRect.height <= 0) return;
    const gap = isNarrow ? 6 : 8;
    const headerBottom = Math.round(headerRect.bottom + gap);

    const rootRule = document.styleSheets[0]?.cssRules?.[0];
    if (rootRule && rootRule.style) {
      rootRule.style.setProperty('--hud-header-bottom', `${headerBottom}px`);
      const trackerRect = tracker.getBoundingClientRect();
      const trackerBottom = Math.round(headerBottom + trackerRect.height + gap);
      rootRule.style.setProperty('--tracker-bar-bottom', `${trackerBottom}px`);
    }
  }

  // ------------------------------------------------------------ language switcher & i18n
  _initLanguageSwitcher() {
    const switcher = $('lang-switcher');
    if (!switcher) return;
    this.preview = isPreviewI18n();
    const buttons = getAvailableLanguages(this.preview).map((code) => {
      const meta = LANG_META[code] || { label: code.toUpperCase(), title: code };
      const btn = el('button', `lang-btn${code === this.lang ? ' active' : ''}`, meta.label);
      btn.type = 'button';
      btn.dataset.lang = code;
      btn.lang = code;
      btn.title = meta.title;
      btn.setAttribute('aria-pressed', String(code === this.lang));
      btn.addEventListener('click', () => this.setLanguage(code, { updateHash: true, track: true }));
      return btn;
    });
    switcher.replaceChildren(...buttons);
  }

  setLanguage(lang, { updateHash = true, track = true } = {}) {
    const nextLang = gateLang(lang, this.preview);
    const changed = nextLang !== this.lang;
    this.lang = nextLang;
    document.documentElement.lang = LANG_BCP47[nextLang] || nextLang;
    try {
      localStorage.setItem('cosmic_lang', nextLang);
    } catch (_) {}

    const switcher = $('lang-switcher');
    if (switcher) {
      switcher.querySelectorAll('.lang-btn').forEach((btn) => {
        const isAct = btn.dataset.lang === nextLang;
        btn.classList.toggle('active', isAct);
        btn.setAttribute('aria-pressed', String(isAct));
      });
    }

    this.engine.setLanguage(nextLang);
    this._renderStaticChrome();
    this._initScaleStepper();
    this._renderMarvelCategoryBar();
    this._renderQuickTrackerButtons();
    this.handleStage(this.engine.lastStage >= 0 ? this.engine.lastStage : 0);
    this.selectObject(this.selectedObjectId, true, true);
    this.updateTimeReadout();
    this.updateVoyagerLiveBanner();
    this._updateHudOffsets();

    if (this.tourActive) {
      this._renderTourStopUI();
    }
    if (!$('quiz-modal').classList.contains('hidden')) {
      this._renderQuizStep();
    }
    if (!$('exoplanet-modal').classList.contains('hidden')) {
      this._renderExoplanetResults();
    }

    if (changed && this.isSpeaking) {
      if (this.tourActive) {
        const stops = getGuidedTourStops(this.lang, this.universeMode);
        const stop = stops[this.tourIndex];
        if (stop) {
          const studioKey = this.universeMode === 'marvel' ? `marvel_tour_${this.tourIndex}` : `tour_${this.tourIndex}`;
          this.speakText(`${stop.title}. ${stop.narration}`, studioKey);
        }
      } else {
        const obj =
          getCosmicObject(this.selectedObjectId, this.lang, this.universeMode) ||
          this.engine.getObjectInfo(this.selectedObjectId, this.lang);
        if (obj) {
          const factPrefix = this.ui.funFactSpeechPrefix || ' Fun fact: ';
          const fact = obj.funFacts && obj.funFacts.length ? `${factPrefix}${obj.funFacts[0]}` : '';
          this.speakText(`${obj.name}. ${obj.kidSummary}${fact}`, `obj_${this.selectedObjectId}`);
        }
      }
    }

    if (track && changed) {
      trackLanguageSwitch(nextLang);
    }
    if (updateHash) {
      this.scheduleHashUpdate();
    }
  }

  _renderStaticChrome() {
    const ui = this.ui;
    const isMarvel = this.universeMode === 'marvel';
    const isNarrow = window.innerWidth <= 768;
    document.title = ui.pageTitle || `${ui.brandTitle} — ${ui.brandSubtitle}`;

    const setTxt = (id, val) => {
      const node = $(id);
      if (node && val !== undefined) node.textContent = val;
    };

    setTxt('loading-title', ui.loadingTitle);
    setTxt('loading-hint', ui.loadingHint);
    if (!this.loadedCount) setTxt('loading-status', ui.loadingWarmup);
    setTxt('brand-title', ui.brandTitle);
    setTxt('brand-subtitle', isMarvel ? ui.marvelBrandSubtitle || ui.brandSubtitle : ui.brandSubtitle);

    const nasaTab = $('btn-universe-nasa');
    if (nasaTab) {
      nasaTab.textContent = ui.universeNasaTab;
      nasaTab.title = ui.universeNasaTab.replace(/^🔭\s*/, '');
    }
    const marvelTab = $('btn-universe-marvel');
    if (marvelTab) {
      marvelTab.textContent = isNarrow ? ui.universeMarvelTabShort || ui.universeMarvelTab : ui.universeMarvelTab;
      marvelTab.title = ui.universeMarvelTabFull || ui.universeMarvelTab;
      marvelTab.setAttribute('aria-label', ui.universeMarvelTabFull || ui.universeMarvelTab);
    }

    const canvas = $('cosmic-canvas');
    if (canvas) canvas.setAttribute('aria-label', ui.canvasAria);

    const exoBtn = $('btn-open-exoplanets');
    if (exoBtn) {
      exoBtn.textContent = ui.exoBtn;
      exoBtn.title = ui.exoBtnTitle;
    }
    setTxt('btn-start-tour', isMarvel ? ui.marvelTourBtn || ui.tourBtn : ui.tourBtn);
    setTxt('btn-open-quiz', isMarvel ? ui.marvelQuizBtn || ui.quizBtn : ui.quizBtn);

    const isLight = this.engine && this.engine.theme === 'light';
    const themeHeaderBtn = $('btn-toggle-theme');
    if (themeHeaderBtn) {
      themeHeaderBtn.textContent = isLight ? ui.darkModeBtn : ui.lightModeBtn;
      themeHeaderBtn.title = ui.themeBtnTitle;
    }
    const themeChipBtn = $('btn-chip-theme');
    if (themeChipBtn) {
      themeChipBtn.textContent = isLight ? ui.toggleDarkChip : ui.toggleLightChip;
      themeChipBtn.title = ui.themeBtnTitle;
    }

    const clean = document.body.classList.contains('clean-view');
    const panelsBtn = $('btn-toggle-panels');
    if (panelsBtn) {
      panelsBtn.textContent = clean ? ui.showPanelsBtn : ui.cleanViewBtn;
      panelsBtn.title = ui.cleanViewTitle;
    }

    const mobileOptBtn = $('btn-mobile-options');
    if (mobileOptBtn) {
      mobileOptBtn.title = ui.mobileOptionsTitle;
    }

    const toggleInspBtn = $('btn-toggle-inspector');
    if (toggleInspBtn) {
      toggleInspBtn.textContent = this.mobileInspectorExpanded
        ? ui.mobileDetailsCollapse
        : ui.mobileDetailsExpand;
    }

    setTxt('tracker-fly-label', ui.flyToLabel);
    const livePill = $('voyager-live-pill');
    if (livePill) livePill.title = ui.liveTelemetryTitle;
    setTxt('label-pill-roadster', ui.roadsterLabel);
    setTxt('label-pill-v1', ui.voyager1Label);
    setTxt('label-pill-v2', ui.voyager2Label);

    setTxt('scale-card-eyebrow', ui.scaleEyebrow);
    setTxt('btn-toggle-orbits', ui.toggleOrbits);
    setTxt('btn-toggle-labels', ui.toggleLabels);
    setTxt('btn-toggle-hz', ui.toggleHz);

    const isTrue = this.engine && this.engine.scale.mode === 'true';
    const scaleBtn = $('btn-toggle-scale');
    if (scaleBtn) {
      scaleBtn.textContent = isTrue ? ui.toggleScaleOn : ui.toggleScaleOff;
      scaleBtn.title = ui.toggleScaleTitle;
    }
    const bloomBtn = $('btn-toggle-bloom');
    if (bloomBtn) {
      bloomBtn.textContent = ui.toggleGlow;
      bloomBtn.title = ui.toggleGlowTitle;
    }

    const hintsBar = $('controls-hint-bar');
    if (hintsBar) {
      hintsBar.replaceChildren();
      const buildHint = (icon, strongTxt, tailTxt) => {
        const sp = el('span');
        sp.appendChild(document.createTextNode(`${icon} `));
        sp.appendChild(el('strong', '', strongTxt));
        if (tailTxt) sp.appendChild(document.createTextNode(tailTxt));
        return sp;
      };
      hintsBar.appendChild(buildHint('🖱️', ui.hintDragBold, ui.hintDragRest));
      hintsBar.appendChild(buildHint('🔍', ui.hintScrollBold, ui.hintScrollRest));
      hintsBar.appendChild(buildHint('👆', ui.hintClickBold, ui.hintClickRest));
    }

    setTxt('tour-badge-label', isMarvel ? ui.marvelTourBadge || ui.tourBadge : ui.tourBadge);
    setTxt('btn-tour-prev', ui.tourPrev);
    const tourClose = $('btn-tour-close');
    if (tourClose) tourClose.setAttribute('aria-label', ui.tourExitAria);

    const readBtn = $('btn-read-aloud');
    if (readBtn) readBtn.textContent = this.isSpeaking ? ui.stopReading : ui.readAloud;

    setTxt('subtitle-quick-stats', ui.quickStatsTitle);
    setTxt('subtitle-fun-facts', ui.funFactsTitle);
    setTxt('subtitle-travel-times', ui.travelTimesTitle);

    setTxt('btn-time-now', ui.timeNowBtn);
    setTxt('btn-zoom-in', ui.zoomInBtn);
    setTxt('btn-zoom-out', ui.zoomOutBtn);

    const markers = $('zoom-scale-markers');
    const markerList = isMarvel ? ui.marvelZoomMarkers || ui.zoomMarkers : ui.zoomMarkers;
    if (markers && Array.isArray(markerList)) {
      markers.replaceChildren();
      for (const m of markerList) {
        markers.appendChild(el('span', '', m));
      }
    }

    setTxt('btn-credits', ui.creditsBtn);
    setTxt('exo-modal-title', ui.exoModalTitle);
    setTxt('exo-modal-subtitle', ui.exoModalSubtitle);
    const exoSearch = $('exo-search-input');
    if (exoSearch) exoSearch.placeholder = ui.exoSearchPlaceholder;
    setTxt('btn-exo-view-cloud', ui.exoCloudBtn);

    const filterBar = $('exo-filter-bar');
    if (filterBar) {
      const map = {
        all: ui.exoFilterAll,
        hz: ui.exoFilterHz,
        multi: ui.exoFilterMulti,
        near: ui.exoFilterNear,
        kepler: ui.exoFilterKepler
      };
      filterBar.querySelectorAll('.exo-filter-pill').forEach((btn) => {
        const key = btn.dataset.filter;
        if (map[key]) btn.textContent = map[key];
      });
    }

    setTxt('quiz-modal-title', isMarvel ? ui.marvelQuizModalTitle || ui.quizModalTitle : ui.quizModalTitle);
    setTxt('credits-title', ui.creditsTitle);

    const creditsBody = $('credits-body');
    if (creditsBody) {
      creditsBody.replaceChildren();
      creditsBody.appendChild(el('p', '', ui.creditsIntro));
      const ul = el('ul');
      for (const item of ui.creditsItems || []) {
        const li = el('li');
        li.appendChild(el('strong', '', item.bold));
        li.appendChild(document.createTextNode(item.text));
        ul.appendChild(li);
      }
      creditsBody.appendChild(ul);
      if (ui.marvelCreditsDisclaimer) {
        creditsBody.appendChild(el('p', 'credits-disclaimer', ui.marvelCreditsDisclaimer));
      }
    }
  }

  // ------------------------------------------------------------ loading
  handleProgress(loaded, total) {
    this.loadedCount = loaded;
    const fill = $('loading-bar-fill');
    const status = $('loading-status');
    if (!fill || !status) return;
    const frac = total ? loaded / total : 0;
    fill.style.width = `${Math.round(Math.max(8, frac * 100))}%`;
    const msgs = this.ui.loadingMsgs;
    status.textContent = msgs[Math.min(msgs.length - 1, Math.floor(frac * msgs.length))];
  }

  startDebugReadout() {
    const e = this.engine;
    window.__cosmicDebug = () => {
      const cam = e.camera.position;
      const f = e.rig.focus;
      const visibleLabels = [...e.labels.entries.values()].filter((x) => x.visible).map((x) => x.id);
      return {
        lang: this.lang,
        universeMode: this.universeMode,
        zoom: +e.zoom.toFixed(2),
        targetZoom: +e.targetZoom.toFixed(2),
        distance: e.scale.distanceForZoom(e.zoom),
        focus: e.focusedId,
        camera: [cam.x, cam.y, cam.z],
        focusPos: [f.x, f.y, f.z],
        yaw: e.rig.yaw,
        pitch: e.rig.pitch,
        date: new Date(e.state.dateMs).toISOString(),
        tick: e.state.tick,
        labels: e.labels.entries.size,
        visibleLabels: visibleLabels.slice(0, 40),
        pickables: e.pickables.length,
        exoArchiveSystems: EXOPLANET_ARCHIVE_META.totalSystems,
        exoArchivePlanets: EXOPLANET_ARCHIVE_META.totalPlanets,
        render: { calls: e.renderer.info.render.calls, triangles: e.renderer.info.render.triangles, points: e.renderer.info.render.points },
        programs: e.renderer.info.programs ? e.renderer.info.programs.length : 0,
        ready: this.ready
      };
    };
    window.__cosmicApp = this;
    if (!/[?&]debug=1/.test(location.search)) return;
    const box = el('pre', 'debug-readout');
    box.id = 'debug-readout';
    document.body.appendChild(box);
    setInterval(() => {
      const s = window.__cosmicDebug();
      box.textContent = `lang ${s.lang} u ${s.universeMode} zoom ${s.zoom}→${s.targetZoom} dist ${s.distance.toExponential(2)} focus ${s.focus}\ncam ${s.camera.map((v) => v.toExponential(2)).join(' ')}\nfocusPos ${s.focusPos.map((v) => v.toExponential(2)).join(' ')}\ntick ${s.tick} calls ${s.render.calls} tris ${s.render.triangles} pts ${s.render.points}`;
    }, 500);
  }

  handleReady() {
    if (this.ready) return;
    this.ready = true;
    const screen = $('loading-screen');
    if (screen) {
      screen.classList.add('is-done');
      setTimeout(() => screen.remove(), 900);
    }
  }

  // ------------------------------------------------------------ hash deep links
  applyHash() {
    const h = location.hash.replace(/^#/, '');
    if (!h) {
      try {
        const saved = localStorage.getItem('cosmic_theme');
        if (saved === 'light') this.setTheme('light', false, false);
      } catch (_) {}
      return;
    }
    const params = new URLSearchParams(h);
    const hashLang = params.get('lang');
    if (hashLang) {
      this.setLanguage(hashLang, { updateHash: false, track: false });
    }
    const u = params.get('u');
    if ((u === 'marvel' || u === 'guardians') && this.universeMode !== 'marvel') {
      this.setUniverseMode('marvel', { updateHash: false, track: false });
    } else if (u === 'nasa' && this.universeMode !== 'nasa') {
      this.setUniverseMode('nasa', { updateHash: false, track: false });
    }
    const state = {
      f: params.get('f') || undefined,
      z: params.has('z') ? parseFloat(params.get('z')) : undefined,
      y: params.has('y') ? parseFloat(params.get('y')) : undefined,
      p: params.has('p') ? parseFloat(params.get('p')) : undefined,
      m: params.get('m') || undefined,
      t: params.has('t') ? parseInt(params.get('t'), 10) : undefined
    };
    const th = params.get('th');
    if (th === 'l' || th === 'light') this.setTheme('light', false, false);
    else if (th === 'd' || th === 'dark') this.setTheme('dark', false, false);
    if (state.m === 't') this.setScaleMode('true');
    this.engine.applyState(state);
    this.updateTimeReadout();
  }

  scheduleHashUpdate() {
    clearTimeout(this.hashTimer);
    this.hashTimer = setTimeout(() => {
      const s = this.engine.getState();
      const params = new URLSearchParams();
      if (this.universeMode === 'marvel') params.set('u', 'marvel');
      if (s.f) params.set('f', s.f);
      params.set('z', String(s.z));
      params.set('y', String(s.y));
      params.set('p', String(s.p));
      if (s.m === 't') params.set('m', 't');
      if (s.t) params.set('t', String(s.t));
      if (this.engine.theme === 'light') params.set('th', 'l');
      if (this.lang !== 'en') params.set('lang', this.lang);
      history.replaceState(null, '', `#${params.toString()}`);
    }, 600);
  }

  // ------------------------------------------------------------ UI builders
  _initScaleStepper() {
    const nav = $('scale-stepper');
    nav.replaceChildren();
    const scales = getCosmicScales(this.lang, this.universeMode);
    const activeStage = this.engine.lastStage >= 0 ? this.engine.lastStage : 0;
    scales.forEach((scale) => {
      const btn = el('button', `scale-pill${scale.index === activeStage ? ' active' : ''}`);
      btn.type = 'button';
      btn.dataset.scaleIndex = String(scale.index);
      btn.appendChild(el('span', 'scale-pill-num', String(scale.index + 1)));
      const wrap = el('span', 'scale-pill-text');
      wrap.appendChild(el('strong', '', scale.name));
      wrap.appendChild(el('small', '', scale.rangeLabel));
      btn.appendChild(wrap);
      btn.addEventListener('click', () => {
        this.stopTour();
        this.engine.jumpToStage(scale.index);
        trackScaleChange(scale.index, scale.id, scale.name);
        this.scheduleHashUpdate();
      });
      nav.appendChild(btn);
    });
  }

  _initControls() {
    const slider = $('cosmic-zoom-slider');
    slider.addEventListener('input', (e) => {
      this.engine.setTargetZoom(parseFloat(e.target.value));
      this.scheduleHashUpdate();
    });
    $('btn-zoom-in').addEventListener('click', () => this.engine.setTargetZoom(this.engine.targetZoom - 4));
    $('btn-zoom-out').addEventListener('click', () => this.engine.setTargetZoom(this.engine.targetZoom + 4));

    const toggle = (id, getter, setter) => {
      const btn = $(id);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const next = !getter();
        setter(next);
        btn.classList.toggle('active-toggle', next);
        btn.setAttribute('aria-pressed', String(next));
      });
    };
    toggle('btn-toggle-orbits', () => this.engine.showOrbits, (v) => this.engine.setShowOrbits(v));
    toggle('btn-toggle-labels', () => this.engine.labels.enabled, (v) => this.engine.setShowLabels(v));
    toggle('btn-toggle-hz', () => this.engine.showHabitableZones, (v) => this.engine.setShowHabitableZones(v));
    toggle('btn-toggle-bloom', () => this.engine.bloom.enabled, (v) => this.engine.setBloom(v));
    toggle(
      'btn-toggle-scale',
      () => this.engine.scale.mode === 'true',
      (v) => {
        this.setScaleMode(v ? 'true' : 'explorer');
        this.scheduleHashUpdate();
      }
    );

    const toggleTheme = () => {
      const next = this.engine.theme === 'light' ? 'dark' : 'light';
      this.setTheme(next, true, true);
    };
    const themeHeaderBtn = $('btn-toggle-theme');
    if (themeHeaderBtn) themeHeaderBtn.addEventListener('click', toggleTheme);
    const themeChipBtn = $('btn-chip-theme');
    if (themeChipBtn) themeChipBtn.addEventListener('click', toggleTheme);

    const panelsBtn = $('btn-toggle-panels');
    if (panelsBtn) {
      panelsBtn.addEventListener('click', () => {
        const clean = document.body.classList.toggle('clean-view');
        panelsBtn.setAttribute('aria-pressed', String(clean));
        panelsBtn.textContent = clean ? this.ui.showPanelsBtn : this.ui.cleanViewBtn;
        this._updateHudOffsets();
      });
    }

    $('btn-read-aloud').addEventListener('click', () => this.toggleSpeechForCurrentObject());
    $('btn-credits').addEventListener('click', () => $('credits-modal').classList.remove('hidden'));
    $('btn-close-credits').addEventListener('click', () => $('credits-modal').classList.add('hidden'));
  }

  setTheme(mode, updateHash = true, track = false) {
    const isLight = mode === 'light';
    document.body.classList.toggle('light-mode', isLight);
    this.engine.setTheme(isLight ? 'light' : 'dark');
    const ui = this.ui;
    const headerBtn = $('btn-toggle-theme');
    if (headerBtn) {
      headerBtn.classList.toggle('active-toggle', isLight);
      headerBtn.setAttribute('aria-pressed', String(isLight));
      headerBtn.textContent = isLight ? ui.darkModeBtn : ui.lightModeBtn;
    }
    const chipBtn = $('btn-chip-theme');
    if (chipBtn) {
      chipBtn.classList.toggle('active-toggle', isLight);
      chipBtn.setAttribute('aria-pressed', String(isLight));
      chipBtn.textContent = isLight ? ui.toggleDarkChip : ui.toggleLightChip;
    }
    try {
      localStorage.setItem('cosmic_theme', isLight ? 'light' : 'dark');
    } catch (_) {}
    if (track) trackThemeToggle(isLight ? 'light' : 'dark');
    if (updateHash) this.scheduleHashUpdate();
  }

  setScaleMode(mode) {
    this.engine.setScaleMode(mode);
    const btn = $('btn-toggle-scale');
    const isTrue = mode === 'true';
    btn.classList.toggle('active-toggle', isTrue);
    btn.setAttribute('aria-pressed', String(isTrue));
    btn.textContent = isTrue ? this.ui.toggleScaleOn : this.ui.toggleScaleOff;
  }

  _renderQuickTrackerButtons() {
    const bar = $('quick-tracker-chips');
    if (!bar) return;
    bar.replaceChildren();
    const targets = getQuickTargets(this.lang, this.universeMode);
    for (const item of targets) {
      if (this.universeMode === 'marvel' && this.marvelFilter !== 'all' && item.group !== this.marvelFilter) {
        continue;
      }
      if (!this.engine.has(item.id)) continue;
      const chip = el('button', `tracker-chip${item.id === this.selectedObjectId ? ' active' : ''}`, item.label);
      chip.type = 'button';
      chip.dataset.objectId = item.id;
      chip.addEventListener('click', () => {
        this.stopTour();
        this.engine.focusOn(item.id, { fromUser: true });
        this.scheduleHashUpdate();
      });
      bar.appendChild(chip);
    }
  }

  _initQuickTrackers() {
    this._renderMarvelCategoryBar();
    this._renderQuickTrackerButtons();

    const bindPill = (btnId, objId) => {
      const btn = $(btnId);
      if (!btn) return;
      btn.addEventListener('click', () => {
        this.stopTour();
        this.engine.focusOn(objId, { fromUser: true });
        this.scheduleHashUpdate();
      });
    };
    bindPill('btn-pill-roadster', 'roadster');
    bindPill('btn-pill-v1', 'voyager1');
    bindPill('btn-pill-v2', 'voyager2');
  }

  _initTimeControls() {
    const pauseBtn = $('btn-time-pause');
    $('btn-time-slower').addEventListener('click', () => {
      this.engine.setTimeSpeedIndex(this.engine.timeSpeedIndex - 1);
      this.updateTimeReadout();
    });
    $('btn-time-faster').addEventListener('click', () => {
      this.engine.setTimeSpeedIndex(this.engine.timeSpeedIndex + 1);
      this.updateTimeReadout();
    });
    pauseBtn.addEventListener('click', () => {
      this.engine.setPaused(!this.engine.paused);
      pauseBtn.textContent = this.engine.paused ? '▶️' : '⏸️';
      pauseBtn.setAttribute('aria-label', this.engine.paused ? this.ui.timeResumeAria : this.ui.timePauseAria);
      this.updateTimeReadout();
    });
    $('btn-time-now').addEventListener('click', () => {
      this.engine.setTimeNow();
      this.engine.setTimeSpeedIndex(0);
      this.updateTimeReadout();
    });
    this.updateTimeReadout();
  }

  updateTimeReadout() {
    const idx = this.engine.timeSpeedIndex;
    const speedLabels = this.ui.timeSpeeds || [];
    const label = speedLabels[idx] || TIME_SPEEDS[idx].label;
    $('time-speed-label').textContent = this.engine.paused ? `${this.ui.timePausedPrefix} • ${label}` : label;
    const locale = LANG_BCP47[this.lang] || 'en-US';
    $('time-date-label').textContent = formatDateUTC(this.engine.state.dateMs, locale);
  }

  _initModals() {
    const tourBanner = $('guided-tour-bar');
    $('btn-start-tour').addEventListener('click', () => {
      this.tourActive = true;
      this.tourIndex = 0;
      document.body.classList.remove('mobile-options-open');
      tourBanner.classList.remove('hidden');
      this._applyTourStop('start');
    });
    $('btn-tour-prev').addEventListener('click', () => {
      if (this.tourIndex > 0) {
        this.tourIndex--;
        this._applyTourStop('prev');
      }
    });
    $('btn-tour-next').addEventListener('click', () => {
      const stops = getGuidedTourStops(this.lang, this.universeMode);
      if (this.tourIndex < stops.length - 1) {
        this.tourIndex++;
        this._applyTourStop('next');
      } else {
        trackTourStep('finish', this.tourIndex, stops[this.tourIndex]?.objectId);
        this.stopTour();
      }
    });
    $('btn-tour-close').addEventListener('click', () => {
      trackTourStep('close', this.tourIndex);
      this.stopTour();
    });

    const quizModal = $('quiz-modal');
    $('btn-open-quiz').addEventListener('click', () => {
      this.quizIndex = 0;
      this.quizScore = 0;
      this.quizAnswered = false;
      quizModal.classList.remove('hidden');
      trackQuizEvent('start', {
        total: getSpaceQuizQuestions(this.lang, this.universeMode).length,
        lang: this.lang,
        universe: this.universeMode
      });
      this._renderQuizStep();
    });
    $('btn-close-quiz').addEventListener('click', () => quizModal.classList.add('hidden'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        quizModal.classList.add('hidden');
        $('credits-modal').classList.add('hidden');
        $('exoplanet-modal').classList.add('hidden');
      }
    });
  }

  _initExoplanetExplorer() {
    const modal = $('exoplanet-modal');
    const searchInput = $('exo-search-input');
    const filterBar = $('exo-filter-bar');

    $('btn-open-exoplanets').addEventListener('click', () => {
      if (this.universeMode === 'marvel') {
        this.setUniverseMode('nasa', { updateHash: true, track: true });
      }
      modal.classList.remove('hidden');
      trackExoplanetOpen(this.exoFilter);
      this._renderExoplanetResults();
      searchInput.focus();
    });
    $('btn-close-exoplanets').addEventListener('click', () => modal.classList.add('hidden'));

    $('btn-exo-view-cloud').addEventListener('click', () => {
      modal.classList.add('hidden');
      this.stopTour();
      this.engine.focusOn('trappist1', { zoom: 61.5, yaw: 0.45, pitch: 0.38 });
      trackExoplanetFly('trappist1_cone', 'Kepler/TESS Cone');
      this.scheduleHashUpdate();
    });

    searchInput.addEventListener('input', (e) => {
      this.exoQuery = e.target.value.trim().toLowerCase();
      this._renderExoplanetResults();
    });

    filterBar.querySelectorAll('.exo-filter-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.exoFilter = btn.dataset.filter;
        filterBar.querySelectorAll('.exo-filter-pill').forEach((b) => b.classList.toggle('active', b === btn));
        trackExoplanetOpen(this.exoFilter);
        this._renderExoplanetResults();
      });
    });
  }

  _renderExoplanetResults() {
    const summaryEl = $('exo-results-summary');
    const listEl = $('exo-results-list');
    listEl.replaceChildren();

    const q = this.exoQuery;
    const filter = this.exoFilter;
    const matches = [];
    let matchedPlanets = 0;

    for (let i = 0; i < EXOPLANET_SYSTEMS.length; i++) {
      const sys = EXOPLANET_SYSTEMS[i];
      const [host, , , distLy, sp, teff, , , , planets] = sys;
      const hasHz = planets.some((p) => p[7] === 1);
      if (filter === 'hz' && !hasHz) continue;
      if (filter === 'multi' && planets.length < 3) continue;
      if (filter === 'near' && distLy > 65) continue;
      if (filter === 'kepler' && !/^(Kepler|KOI|K2|TOI)-/i.test(host)) continue;

      if (q) {
        const hostMatch = host.toLowerCase().includes(q) || (sp && sp.toLowerCase().includes(q));
        const planetMatch = planets.some((p) => `${host} ${p[0]}`.toLowerCase().includes(q));
        if (!hostMatch && !planetMatch) continue;
      }
      matches.push(sys);
      matchedPlanets += planets.length;
    }

    const capped = matches.slice(0, 80);
    const ui = this.ui;
    summaryEl.textContent = ui.exoSummary(capped.length, matches.length, matchedPlanets);

    const typeMap = ui.exoTypes || EXO_TYPE_I18N[this.lang] || {};
    const methodMap = ui.exoMethods || {};

    for (const sys of capped) {
      const [host, , , distLy, sp, teff, , , , planets] = sys;
      const sysId = `exo:${slug(host)}`;
      const hasHz = planets.some((p) => p[7] === 1);

      const card = el('div', `exo-sys-card${hasHz ? ' is-hz' : ''}`);
      card.setAttribute('role', 'listitem');

      const header = el('div', 'exo-sys-header');
      const titleWrap = el('div', 'exo-sys-title-wrap');
      const titleBtn = el('button', 'exo-sys-fly-btn', `⭐ ${host}`);
      titleBtn.type = 'button';
      titleBtn.addEventListener('click', () => {
        $('exoplanet-modal').classList.add('hidden');
        this.stopTour();
        this.engine.focusOn(sysId, { fromUser: true });
        trackExoplanetFly(sysId, host);
        this.scheduleHashUpdate();
      });
      titleWrap.appendChild(titleBtn);
      titleWrap.appendChild(el('span', 'exo-sys-meta', ui.exoSysMeta(distLy, sp || 'G', teff || 5500, planets.length)));
      header.appendChild(titleWrap);

      const flyBtn = el('button', 'primary-action-btn exo-fly-cta', ui.exoFlyBtn);
      flyBtn.type = 'button';
      flyBtn.addEventListener('click', () => {
        $('exoplanet-modal').classList.add('hidden');
        this.stopTour();
        this.engine.focusOn(sysId, { fromUser: true });
        trackExoplanetFly(sysId, host);
        this.scheduleHashUpdate();
      });
      header.appendChild(flyBtn);
      card.appendChild(header);

      const chipsWrap = el('div', 'exo-planet-chips');
      for (const p of planets) {
        const [suffix, , orbperd, rade, , equlTemp, typeIdx, hzFlag, discYear, methodIdx] = p;
        const isHz = hzFlag === 1;
        const pName = suffix.length <= 2 ? `${host} ${suffix}` : suffix.startsWith(host) ? suffix : `${host} ${suffix}`;
        const pId = `${sysId}:${slug(pName)}`;
        const rawType = EXOPLANET_TYPES[typeIdx] || 'rocky';
        const localType = typeMap[rawType] || (EXO_TYPE_I18N[this.lang] && EXO_TYPE_I18N[this.lang][rawType]) || rawType;
        const rawMethod = EXOPLANET_METHODS[methodIdx] || 'Transit';
        const localMethod = methodMap[rawMethod] || rawMethod;
        const pChip = el(
          'button',
          `exo-planet-chip${isHz ? ' hz-chip' : ''}`,
          `${isHz ? '🌱 ' : '🪐 '}${pName} • ${localType} (${rade} R⊕, ${orbperd < 10 ? orbperd.toFixed(1) : Math.round(orbperd)}d, ${equlTemp}K, ${localMethod} ${discYear})`
        );
        pChip.type = 'button';
        pChip.addEventListener('click', () => {
          $('exoplanet-modal').classList.add('hidden');
          this.stopTour();
          this.engine.stages[0].ensureArchiveSystem(sysId);
          this.engine.focusOn(pId, { fromUser: true });
          trackExoplanetFly(pId, pName);
          this.scheduleHashUpdate();
        });
        chipsWrap.appendChild(pChip);
      }
      card.appendChild(chipsWrap);
      listEl.appendChild(card);
    }
  }

  _renderTourStopUI() {
    const stops = getGuidedTourStops(this.lang, this.universeMode);
    const stop = stops[this.tourIndex];
    if (!stop) return;
    $('tour-step-title').textContent = `${stop.title} (${this.tourIndex + 1}/${stops.length})`;
    $('tour-step-desc').textContent = stop.narration;
    $('btn-tour-next').textContent = this.tourIndex === stops.length - 1 ? this.ui.tourFinish : this.ui.tourNext;
  }

  _applyTourStop(action = 'step') {
    const stops = getGuidedTourStops(this.lang, this.universeMode);
    const stop = stops[this.tourIndex];
    if (!stop) return;
    this._renderTourStopUI();
    let { yaw, pitch } = stop;
    if (stop.faceOnGalaxy) ({ yaw, pitch } = this.engine.anglesForDirection(GALACTIC_FRAME.Z, -0.35));
    this.engine.focusOn(stop.objectId, {
      zoom: stop.zoomValue === null || stop.zoomValue === undefined ? undefined : stop.zoomValue,
      yaw,
      pitch
    });
    trackTourStep(action, this.tourIndex, stop.objectId);
    const studioKey = this.universeMode === 'marvel' ? `marvel_tour_${this.tourIndex}` : `tour_${this.tourIndex}`;
    this.speakText(`${stop.title}. ${stop.narration}`, studioKey);
  }

  stopTour() {
    if (!this.tourActive) return;
    this.tourActive = false;
    $('guided-tour-bar').classList.add('hidden');
    this.stopSpeech();
  }

  // ------------------------------------------------------------ engine callbacks
  handleZoomUpdated(zoom) {
    const slider = $('cosmic-zoom-slider');
    if (Math.abs(parseFloat(slider.value) - zoom) > 0.05) slider.value = String(zoom.toFixed(1));
  }

  handleStage(index) {
    const scales = getCosmicScales(this.lang, this.universeMode);
    const scale = scales[index] || scales[0];
    $('current-scale-title').textContent = scale.name;
    $('current-scale-range').textContent = scale.rangeLabel;
    $('current-scale-desc').textContent = scale.description;
    document.querySelectorAll('.scale-pill').forEach((pill) => {
      pill.classList.toggle('active', parseInt(pill.dataset.scaleIndex, 10) === index);
    });
  }

  updateVoyagerLiveBanner() {
    const t = getVoyagerLiveTelemetry(this.engine ? this.engine.state.dateMs : Date.now());
    const ui = this.ui;
    const rd = $('live-roadster-dist');
    if (rd && t.roadster) {
      rd.textContent = ui.roadsterDistPill(t.roadster.distanceMillionKm, t.roadster.distanceAU, t.roadster.speedKmS);
    }
    $('live-v1-dist').textContent = ui.voyagerDistPill(t.voyager1.distanceBillionKm, t.voyager1.distanceAU);
    $('live-v2-dist').textContent = ui.voyagerDistPill(t.voyager2.distanceBillionKm, t.voyager2.distanceAU);
    const live = $('inspector-live-km');
    if (live) {
      const key =
        this.selectedObjectId === 'voyager1'
          ? 'voyager1'
          : this.selectedObjectId === 'voyager2'
            ? 'voyager2'
            : this.selectedObjectId === 'roadster'
              ? 'roadster'
              : null;
      if (key && t[key]) {
        const locale = LANG_BCP47[this.lang] || 'en-US';
        const fmtInt = (n) => new Intl.NumberFormat(locale).format(Math.round(n));
        live.textContent =
          key === 'roadster'
            ? ui.fromSunKmAU(fmtInt(t.roadster.distanceKm), t.roadster.distanceAU)
            : ui.fromSunKm(fmtInt(t[key].distanceKm));
      }
    }
  }

  // ------------------------------------------------------------ inspector
  selectObject(objectId, fromEngine = false, silentAnalytics = false, source = 'ui') {
    const obj =
      getCosmicObject(objectId, this.lang, this.universeMode) ||
      this.engine.getObjectInfo(objectId, this.lang);
    if (!obj) return;
    const prevId = this.selectedObjectId;
    this.selectedObjectId = objectId;
    if (!fromEngine) this.engine.focusOn(objectId, { silent: true });

    if (!silentAnalytics && (prevId !== objectId || source === '3d_scene')) {
      trackObjectSelect(objectId, source, this.lang);
    }

    document.querySelectorAll('.tracker-chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.objectId === objectId));

    const ui = this.ui;
    $('inspector-badge').textContent = obj.badge || '✨';
    $('inspector-title').textContent = obj.name;
    $('inspector-pronounce').textContent = obj.pronunciation ? ui.sayIt(obj.pronunciation, obj.category || '') : obj.category || '';
    $('inspector-summary').textContent = obj.kidSummary || '';

    const marvelBox = $('inspector-marvel-science');
    if (marvelBox) {
      marvelBox.replaceChildren();
      if (obj.marvelScience) {
        marvelBox.classList.remove('hidden');
        marvelBox.appendChild(el('div', 'marvel-science-header', ui.marvelScienceTitle || '⚡ Marvel Lore vs. Real Astrophysics'));
        marvelBox.appendChild(el('div', 'marvel-science-body', obj.marvelScience));
      } else {
        marvelBox.classList.add('hidden');
      }
    }

    const voyagerBox = $('inspector-voyager-live');
    voyagerBox.replaceChildren();
    if (obj.isVoyager && this.universeMode === 'nasa') {
      voyagerBox.classList.remove('hidden');
      const tel = getVoyagerLiveTelemetry(this.engine ? this.engine.state.dateMs : Date.now())[obj.voyagerKey];
      const locale = LANG_BCP47[this.lang] || 'en-US';
      const fmtInt = (n) => new Intl.NumberFormat(locale).format(Math.round(n));
      if (obj.voyagerKey === 'roadster' && tel) {
        voyagerBox.appendChild(el('div', 'voyager-live-header', ui.roadsterLiveHeader));
        const km = el('div', 'voyager-live-km', ui.fromSunKmAU(fmtInt(tel.distanceKm), tel.distanceAU));
        km.id = 'inspector-live-km';
        voyagerBox.appendChild(km);
        voyagerBox.appendChild(el('div', 'voyager-live-sub', ui.roadsterLiveSub(tel)));
      } else if (tel) {
        voyagerBox.appendChild(el('div', 'voyager-live-header', ui.voyagerLiveHeader));
        const km = el('div', 'voyager-live-km', ui.fromSunKm(fmtInt(tel.distanceKm)));
        km.id = 'inspector-live-km';
        voyagerBox.appendChild(km);
        voyagerBox.appendChild(el('div', 'voyager-live-sub', ui.voyagerLiveSub(tel)));
      }
    } else {
      voyagerBox.classList.add('hidden');
    }

    const exoBox = $('inspector-exoplanets');
    exoBox.replaceChildren();
    if (obj.hasExoplanets && Array.isArray(obj.exoplanets) && obj.exoplanets.length) {
      exoBox.classList.remove('hidden');
      exoBox.appendChild(el('h4', 'section-subtitle', ui.knownExoplanetsTitle));
      for (const planet of obj.exoplanets) {
        const card = el('div', 'exoplanet-mini-card');
        card.appendChild(el('div', 'exo-name', planet.name));
        card.appendChild(el('div', 'exo-meta', `${planet.type} • ${planet.orbit}`));
        card.appendChild(el('div', 'exo-note', planet.temp));
        if (planet.id) {
          card.classList.add('is-clickable');
          card.addEventListener('click', () => {
            this.stopTour();
            this.engine.focusOn(planet.id, { fromUser: true });
            this.scheduleHashUpdate();
          });
        }
        exoBox.appendChild(card);
      }
    } else {
      exoBox.classList.add('hidden');
    }

    const stats = $('inspector-stats-grid');
    stats.replaceChildren();
    for (const st of obj.quickStats || []) {
      const cell = el('div', 'stat-card');
      cell.appendChild(el('span', 'stat-label', st.label));
      cell.appendChild(el('strong', 'stat-value', st.value));
      stats.appendChild(cell);
    }

    const facts = $('inspector-facts-list');
    facts.replaceChildren();
    for (const fact of obj.funFacts || []) facts.appendChild(el('li', 'fun-fact-item', fact));

    const travel = $('inspector-travel-times');
    travel.replaceChildren();
    const labels = ui.travelModes || {};
    for (const [mode, duration] of Object.entries(obj.travelTimes || {})) {
      const row = el('div', 'travel-row');
      row.appendChild(el('span', 'travel-mode', labels[mode] || mode));
      row.appendChild(el('strong', 'travel-val', duration));
      travel.appendChild(row);
    }
    if (!Object.keys(obj.travelTimes || {}).length) travel.appendChild(el('div', 'travel-row', ui.travelRightHere));

    if (fromEngine && this.isSpeaking && !this.tourActive && !silentAnalytics) {
      const factPrefix = ui.funFactSpeechPrefix || ' Fun fact: ';
      const fact = obj.funFacts && obj.funFacts.length ? `${factPrefix}${obj.funFacts[0]}` : '';
      this.speakText(`${obj.name}. ${obj.kidSummary}${fact}`, `obj_${objectId}`);
    }
    this.scheduleHashUpdate();
  }

  // ------------------------------------------------------------ speech (Chirp3-HD Studio Audio + 8-Language Neural Web Speech Fallback)
  toggleSpeechForCurrentObject() {
    if (this.isSpeaking) {
      this.stopSpeech();
      trackReadAloud(this.selectedObjectId, this.lang, 'stop');
      return;
    }
    const obj =
      getCosmicObject(this.selectedObjectId, this.lang, this.universeMode) ||
      this.engine.getObjectInfo(this.selectedObjectId, this.lang);
    if (!obj) return;
    const factPrefix = this.ui.funFactSpeechPrefix || ' Fun fact: ';
    const fact = obj.funFacts && obj.funFacts.length ? `${factPrefix}${obj.funFacts[0]}` : '';
    trackReadAloud(this.selectedObjectId, this.lang, 'start');
    this.speakText(`${obj.name}. ${obj.kidSummary}${fact}`, `obj_${this.selectedObjectId}`);
  }

  _pickBestBrowserVoice(lang = this.lang) {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;

    const regexMap = {
      en: /^en(-|_|$)/i,
      es: /^es(-|_|$)/i,
      zh: /^(zh|cmn)(-|_|$)/i,
      ja: /^ja(-|_|$)/i,
      ko: /^ko(-|_|$)/i,
      pt: /^pt(-|_|$)/i,
      fr: /^fr(-|_|$)/i,
      it: /^it(-|_|$)/i
    };
    const langRegex = regexMap[lang] || /^en(-|_|$)/i;
    const matchingVoices = voices.filter((v) => langRegex.test(v.lang));
    if (!matchingVoices.length) return null;
    const pool = matchingVoices;

    const scoreVoice = (v) => {
      const name = `${v.name} ${v.voiceURI}`;
      if (/Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Fred|Good News|Jester|Junior|Organ|Ralph|Superstar|Trinoids|Whisper|Wobble|Zarvox/i.test(name)) {
        return -100;
      }
      let s = 0;
      if (/Natural|Online|Neural|Chirp|Studio|Journey/i.test(name)) s += 50;
      if (/Premium|Enhanced/i.test(name)) s += 40;
      if (lang === 'es') {
        if (/Google español|Paulina|Mónica|Monica|Sabina|Helena|Laura|elvira|dalia/i.test(name)) s += 36;
        if (/es-ES|es_ES|es-MX|es_MX|es-US|es_US/i.test(v.lang)) s += 12;
      } else if (lang === 'zh') {
        if (/Google 普通话|Tingting|Ting-Ting|Meijia|Sin-ji|Xiaoxiao|Yunxi|Yunjian/i.test(name)) s += 36;
        if (/zh-CN|zh_CN|cmn-CN|cmn-Hans/i.test(v.lang)) s += 20;
        else if (/zh-TW|zh-HK/i.test(v.lang)) s += 8;
      } else if (lang === 'ja') {
        if (/Google 日本語|Kyoko|Otoya|Nanami|Keita/i.test(name)) s += 36;
        if (/ja-JP|ja_JP/i.test(v.lang)) s += 14;
      } else if (lang === 'ko') {
        if (/Google 한국의|Yuna|Sora|SunHi|InJoon/i.test(name)) s += 36;
        if (/ko-KR|ko_KR/i.test(v.lang)) s += 14;
      } else if (lang === 'pt') {
        if (/Google português|Luciana|Joana|Francisca|Antonio/i.test(name)) s += 36;
        if (/pt-BR|pt_BR/i.test(v.lang)) s += 22;
        else if (/pt-PT|pt_PT/i.test(v.lang)) s += 10;
      } else if (lang === 'fr') {
        if (/Google français|Amélie|Amelie|Thomas|Audrey|Denise|Henri/i.test(name)) s += 36;
        if (/fr-FR|fr_FR|fr-CA|fr_CA/i.test(v.lang)) s += 14;
      } else if (lang === 'it') {
        if (/Google italiano|Alice|Luca|Federica|Elsa|Diego/i.test(name)) s += 36;
        if (/it-IT|it_IT/i.test(v.lang)) s += 14;
      } else {
        if (/Google UK English Female|Google US English/i.test(name)) s += 36;
        if (/Ava|Zoe|Allison|Samantha|Serena|Karen|Moira|Daniel|Tessa/i.test(name)) s += 26;
        if (/en-US|en_US|en-GB|en_GB/i.test(v.lang)) s += 10;
      }
      if (!v.localService) s += 8;
      return s;
    };

    return pool.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
  }

  _cleanSpeechProsody(text, lang = this.lang) {
    let s = String(text).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '');
    if (lang === 'es') {
      s = s
        .replace(/R⊕/g, 'radios terrestres')
        .replace(/M⊕/g, 'masas terrestres')
        .replace(/R☉/g, 'radios solares')
        .replace(/M☉/g, 'masas solares')
        .replace(/°C/g, ' grados Celsius')
        .replace(/°F/g, ' grados Fahrenheit')
        .replace(/\bUA\b|\bAU\b/g, 'unidades astronómicas')
        .replace(/\bkm\/s\b/g, 'kilómetros por segundo')
        .replace(/\bkm\/h\b/g, 'kilómetros por hora')
        .replace(/\bmph\b/g, 'millas por hora')
        .replace(/\bly\b/g, 'años luz')
        .replace(/[•·]/g, ', ')
        .replace(/−/g, 'menos ');
    } else if (lang === 'zh') {
      s = s
        .replace(/R⊕/g, '地球半径')
        .replace(/M⊕/g, '地球质量')
        .replace(/R☉/g, '太阳半径')
        .replace(/M☉/g, '太阳质量')
        .replace(/°C/g, '摄氏度')
        .replace(/°F/g, '华氏度')
        .replace(/\bAU\b/g, '天文单位')
        .replace(/\bkm\/s\b/g, '公里每秒')
        .replace(/\bkm\/h\b/g, '公里每小时')
        .replace(/\bmph\b/g, '英里每小时')
        .replace(/\bly\b/g, '光年')
        .replace(/[•·]/g, '，')
        .replace(/−/g, '零下');
    } else if (lang === 'ja') {
      s = s
        .replace(/R⊕/g, '地球半径')
        .replace(/M⊕/g, '地球質量')
        .replace(/R☉/g, '太陽半径')
        .replace(/M☉/g, '太陽質量')
        .replace(/°C/g, '度')
        .replace(/\bAU\b/g, '天文単位')
        .replace(/\bkm\/s\b/g, 'キロメートル毎秒')
        .replace(/\bkm\/h\b/g, 'キロメートル毎時')
        .replace(/\bly\b/g, '光年')
        .replace(/[•·]/g, '、')
        .replace(/−/g, 'マイナス');
    } else if (lang === 'ko') {
      s = s
        .replace(/R⊕/g, '지구 반지름')
        .replace(/M⊕/g, '지구 질량')
        .replace(/R☉/g, '태양 반지름')
        .replace(/M☉/g, '태양 질량')
        .replace(/°C/g, '섭씨 도')
        .replace(/\bAU\b/g, '천문단위')
        .replace(/\bkm\/s\b/g, '초속 킬로미터')
        .replace(/\bkm\/h\b/g, '시속 킬로미터')
        .replace(/\bly\b/g, '광년')
        .replace(/[•·]/g, ', ')
        .replace(/−/g, '영하 ');
    } else if (lang === 'pt') {
      s = s
        .replace(/R⊕/g, 'raios terrestres')
        .replace(/M⊕/g, 'massas terrestres')
        .replace(/R☉/g, 'raios solares')
        .replace(/M☉/g, 'massas solares')
        .replace(/°C/g, ' graus Celsius')
        .replace(/\bUA\b|\bAU\b/g, 'unidades astronômicas')
        .replace(/\bkm\/s\b/g, 'quilômetros por segundo')
        .replace(/\bkm\/h\b/g, 'quilômetros por hora')
        .replace(/\bly\b/g, 'anos-luz')
        .replace(/[•·]/g, ', ')
        .replace(/−/g, 'menos ');
    } else if (lang === 'fr') {
      s = s
        .replace(/R⊕/g, 'rayons terrestres')
        .replace(/M⊕/g, 'masses terrestres')
        .replace(/R☉/g, 'rayons solaires')
        .replace(/M☉/g, 'masses solaires')
        .replace(/°C/g, ' degrés Celsius')
        .replace(/\bUA\b|\bAU\b/g, 'unités astronomiques')
        .replace(/\bkm\/s\b/g, 'kilomètres par seconde')
        .replace(/\bkm\/h\b/g, 'kilomètres par heure')
        .replace(/\bly\b|\bal\b/g, 'années-lumière')
        .replace(/[•·]/g, ', ')
        .replace(/−/g, 'moins ');
    } else if (lang === 'it') {
      s = s
        .replace(/R⊕/g, 'raggi terrestri')
        .replace(/M⊕/g, 'masse terrestri')
        .replace(/R☉/g, 'raggi solari')
        .replace(/M☉/g, 'masse solari')
        .replace(/°C/g, ' gradi Celsius')
        .replace(/\bUA\b|\bAU\b/g, 'unità astronomiche')
        .replace(/\bkm\/s\b/g, 'chilometri al secondo')
        .replace(/\bkm\/h\b/g, 'chilometri orari')
        .replace(/\bly\b|\bal\b/g, 'anni luce')
        .replace(/[•·]/g, ', ')
        .replace(/−/g, 'meno ');
    } else {
      s = s
        .replace(/R⊕/g, 'Earth radii')
        .replace(/M⊕/g, 'Earth masses')
        .replace(/R☉/g, 'solar radii')
        .replace(/M☉/g, 'solar masses')
        .replace(/°C/g, ' degrees Celsius')
        .replace(/°F/g, ' degrees Fahrenheit')
        .replace(/\bAU\b/g, 'astronomical units')
        .replace(/\bkm\/s\b/g, 'kilometers per second')
        .replace(/\bmph\b/g, 'miles per hour')
        .replace(/\bly\b/g, 'light-years')
        .replace(/[•·]/g, ', ')
        .replace(/−/g, 'minus ');
    }
    return s.replace(/\s+/g, ' ').trim();
  }

  speakText(text, studioKey = null) {
    this.stopSpeech();
    const btn = $('btn-read-aloud');
    const studioAudioUrl = studioKey ? getStudioAudioUrl(studioKey, this.lang) : null;

    if (studioAudioUrl) {
      const audio = new Audio(studioAudioUrl);
      this.activeAudio = audio;
      this.isSpeaking = true;
      btn.textContent = this.ui.stopReading;
      audio.onended = () => {
        if (this.activeAudio === audio) {
          this.activeAudio = null;
          this.isSpeaking = false;
          btn.textContent = this.ui.readAloud;
        }
      };
      audio.onerror = () => {
        if (this.activeAudio === audio) {
          this.activeAudio = null;
          this._speakWithBrowserVoice(text, this.lang);
        }
      };
      audio.play().catch(() => {
        if (this.activeAudio === audio) {
          this.activeAudio = null;
          this._speakWithBrowserVoice(text, this.lang);
        }
      });
      return;
    }

    this._speakWithBrowserVoice(text, this.lang);
  }

  _speakWithBrowserVoice(text, lang = this.lang) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleaned = this._cleanSpeechProsody(text, lang);
    if (!cleaned) return;
    const rawSentences = cleaned.split(/(?<=[.!?。！？])\s*/u).filter(Boolean);
    const chunks = [];
    for (const sentence of rawSentences) {
      if (chunks.length && chunks[chunks.length - 1].length + 1 + sentence.length <= 180) {
        chunks[chunks.length - 1] += ` ${sentence}`;
      } else {
        chunks.push(sentence);
      }
    }
    if (!chunks.length) chunks.push(cleaned);
    const bestVoice = this._pickBestBrowserVoice(lang);
    const bcp47 = LANG_BCP47[lang] || 'en-US';
    const btn = $('btn-read-aloud');
    chunks.forEach((chunkText, idx) => {
      const u = new SpeechSynthesisUtterance(chunkText);
      u.lang = bcp47;
      if (bestVoice) u.voice = bestVoice;
      u.rate = 0.96;
      u.pitch = 1.0;
      if (idx === 0) {
        u.onstart = () => {
          this.isSpeaking = true;
          btn.textContent = this.ui.stopReading;
        };
      }
      if (idx === chunks.length - 1) {
        u.onend = u.onerror = () => {
          this.isSpeaking = false;
          btn.textContent = this.ui.readAloud;
        };
      }
      window.speechSynthesis.speak(u);
    });
  }

  stopSpeech() {
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
      } catch (_) {}
      this.activeAudio = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    this.isSpeaking = false;
    const btn = $('btn-read-aloud');
    if (btn) btn.textContent = this.ui.readAloud;
  }

  // ------------------------------------------------------------ quiz
  _renderQuizStep() {
    const container = $('quiz-body');
    container.replaceChildren();
    const questions = getSpaceQuizQuestions(this.lang, this.universeMode);
    const ui = this.ui;
    if (this.quizIndex >= questions.length) {
      const isMarvel = this.universeMode === 'marvel';
      const completeTitle = isMarvel && ui.marvelQuizCompleteTitle
        ? ui.marvelQuizCompleteTitle(this.quizScore, questions.length)
        : ui.quizCompleteTitle(this.quizScore, questions.length);
      const completeMsg = isMarvel && ui.marvelQuizCompleteMsg ? ui.marvelQuizCompleteMsg : ui.quizCompleteMsg;
      container.appendChild(el('div', 'quiz-trophy', isMarvel ? '⚡🛡️🚀' : '👩‍🚀🏆👨‍🚀'));
      container.appendChild(el('h3', 'quiz-complete-title', completeTitle));
      container.appendChild(el('p', 'quiz-complete-msg', completeMsg));
      const again = el('button', 'primary-action-btn', ui.quizPlayAgainBtn);
      again.type = 'button';
      again.addEventListener('click', () => {
        this.quizIndex = 0;
        this.quizScore = 0;
        this._renderQuizStep();
      });
      container.appendChild(again);
      return;
    }
    const q = questions[this.quizIndex];
    container.appendChild(el('div', 'quiz-progress', ui.quizProgress(this.quizIndex + 1, questions.length, this.quizScore)));
    container.appendChild(el('h3', 'quiz-question', q.question));
    const options = el('div', 'quiz-options');
    const feedback = el('div', 'quiz-feedback hidden');
    q.options.forEach((text, idx) => {
      const btn = el('button', 'quiz-option-btn', text);
      btn.type = 'button';
      btn.addEventListener('click', () => {
        if (this.quizAnswered) return;
        this.quizAnswered = true;
        const correct = idx === q.correctIndex;
        if (correct) {
          this.quizScore++;
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
          options.children[q.correctIndex].classList.add('correct');
        }
        trackQuizEvent('answer', {
          question_index: this.quizIndex,
          correct,
          score: this.quizScore,
          lang: this.lang,
          universe: this.universeMode
        });
        feedback.classList.remove('hidden');
        feedback.replaceChildren();
        feedback.appendChild(el('p', '', q.explanation));
        const isLast = this.quizIndex >= questions.length - 1;
        const next = el('button', 'primary-action-btn', isLast ? ui.quizSeeBadgeBtn : ui.quizNextBtn);
        next.type = 'button';
        next.addEventListener('click', () => {
          this.quizAnswered = false;
          this.quizIndex++;
          if (this.quizIndex >= questions.length) {
            trackQuizEvent('complete', {
              score: this.quizScore,
              total: questions.length,
              lang: this.lang,
              universe: this.universeMode
            });
          }
          this._renderQuizStep();
        });
        feedback.appendChild(next);
      });
      options.appendChild(btn);
    });
    container.appendChild(options);
    container.appendChild(feedback);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    new CosmicExplorerApp();
  } catch (err) {
    const status = document.getElementById('loading-status');
    const ui = getUI(detectInitialLanguage());
    if (status) status.textContent = ui.webglError || 'Sorry — your browser could not start WebGL. Try Chrome, Edge, Firefox or Safari on a computer or recent phone.';
    console.error('Cosmic Explorer failed to start');
    throw err;
  }
});
