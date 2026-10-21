/**
 * Cosmic Explorer 3D — UI controller for the WebGL engine.
 * Security: DOM is built only with createElement / textContent / replaceChildren (no innerHTML).
 */
import { COSMIC_SCALES, COSMIC_OBJECTS, GUIDED_TOUR_STOPS, SPACE_QUIZ_QUESTIONS, getVoyagerLiveTelemetry } from './cosmicData.js';
import { CosmicEngine3D, TIME_SPEEDS } from './engine/CosmicEngine3D.js';
import { formatDateUTC, GALACTIC_FRAME } from './engine/astro.js';
import { EXOPLANET_ARCHIVE_META, EXOPLANET_SYSTEMS, EXOPLANET_TYPES, EXOPLANET_METHODS } from './catalog/exoplanetArchive.js';
import { STUDIO_AUDIO_MANIFEST } from './catalog/audioManifest.js';

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

const QUICK_TARGETS = [
  { id: 'earth', label: '🌍 Earth' },
  { id: 'moon', label: '🌕 Moon' },
  { id: 'iss', label: '🛰️ Space Station' },
  { id: 'roadster', label: '🚗 Tesla Roadster' },
  { id: 'mars', label: '🔴 Mars' },
  { id: 'jupiter', label: '🌪️ Jupiter' },
  { id: 'saturn', label: '🪐 Saturn' },
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
];

class CosmicExplorerApp {
  constructor() {
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
      callbacks: {
        onSelect: (id) => this.selectObject(id, true),
        onZoom: (z) => this.handleZoomUpdated(z),
        onStage: (i) => this.handleStage(i),
        onProgress: (url, loaded, total) => this.handleProgress(loaded, total),
        onReady: () => this.handleReady(),
        onInteract: () => this.scheduleHashUpdate()
      }
    });

    this._initScaleStepper();
    this._initControls();
    this._initQuickTrackers();
    this._initTimeControls();
    this._initModals();
    this._initExoplanetExplorer();

    this.selectObject('earth', true);
    this.handleZoomUpdated(this.engine.targetZoom);
    this.updateVoyagerLiveBanner();
    setInterval(() => this.updateVoyagerLiveBanner(), 1000);
    setInterval(() => this.updateTimeReadout(), 250);

    this.engine.start();
    this.applyHash();
    this.startDebugReadout();
    window.addEventListener('hashchange', () => this.applyHash());
    setTimeout(() => this.handleReady(), 9000);
  }

  // ------------------------------------------------------------ loading
  handleProgress(loaded, total) {
    this.loadedCount = loaded;
    const fill = $('loading-bar-fill');
    const status = $('loading-status');
    if (!fill || !status) return;
    const frac = total ? loaded / total : 0;
    fill.style.width = `${Math.round(Math.max(8, frac * 100))}%`;
    const msgs = ['Unrolling NASA’s Blue Marble…', 'Polishing Saturn’s rings…', 'Mapping 6,451 NASA exoplanets…', 'Tracking Starman’s Tesla Roadster…', 'Checking on Voyager 1…'];
    status.textContent = msgs[Math.min(msgs.length - 1, Math.floor(frac * msgs.length))];
  }

  startDebugReadout() {
    const e = this.engine;
    window.__cosmicDebug = () => {
      const cam = e.camera.position;
      const f = e.rig.focus;
      const visibleLabels = [...e.labels.entries.values()].filter((x) => x.visible).map((x) => x.id);
      return {
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
        ready: this.ready,
        earthDebug: (() => {
          const st = e.stages[1];
          const earth = st.earth;
          const toSun = e.sunPos.clone().sub(st.earthPos).normalize();
          const q = earth.spin.getWorldQuaternion(new (earth.group.position.constructor === Object ? Object : e.camera.quaternion.constructor)());
          return {
            sunDirL: earth.material.uniforms.sunDirL.value.toArray(),
            camPosL: earth.material.uniforms.camPosL.value.toArray(),
            toSunWorld: toSun.toArray(),
            spinQuat: q.toArray(),
            mapIsImage: !!(earth.material.uniforms.map.value && earth.material.uniforms.map.value.image && earth.material.uniforms.map.value.image.width > 1),
            mapSize: earth.material.uniforms.map.value && earth.material.uniforms.map.value.image ? [earth.material.uniforms.map.value.image.width, earth.material.uniforms.map.value.image.height] : null,
            cloudsVisible: earth.clouds ? earth.clouds.visible : null
          };
        })()
      };
    };
    window.__cosmicApp = this;
    if (!/[?&]debug=1/.test(location.search)) return;
    const box = el('pre', 'debug-readout');
    box.id = 'debug-readout';
    document.body.appendChild(box);
    setInterval(() => {
      const s = window.__cosmicDebug();
      box.textContent = `zoom ${s.zoom}→${s.targetZoom} dist ${s.distance.toExponential(2)} focus ${s.focus}\ncam ${s.camera.map((v) => v.toExponential(2)).join(' ')}\nfocusPos ${s.focusPos.map((v) => v.toExponential(2)).join(' ')}\ntick ${s.tick} calls ${s.render.calls} tris ${s.render.triangles} pts ${s.render.points}`;
    }, 500);
  }


  handleReady() {
    if (this.ready) return;
    this.ready = true;
    const screen = $('loading-screen');
    screen.classList.add('is-done');
    setTimeout(() => screen.remove(), 900);
  }

    // ------------------------------------------------------------ hash deep links
  applyHash() {
    const h = location.hash.replace(/^#/, '');
    if (!h) {
      try {
        const saved = localStorage.getItem('cosmic_theme');
        if (saved === 'light') this.setTheme('light', false);
      } catch (_) {}
      return;
    }
    const params = new URLSearchParams(h);
    const state = {
      f: params.get('f') || undefined,
      z: params.has('z') ? parseFloat(params.get('z')) : undefined,
      y: params.has('y') ? parseFloat(params.get('y')) : undefined,
      p: params.has('p') ? parseFloat(params.get('p')) : undefined,
      m: params.get('m') || undefined,
      t: params.has('t') ? parseInt(params.get('t'), 10) : undefined
    };
    const th = params.get('th');
    if (th === 'l' || th === 'light') this.setTheme('light', false);
    else if (th === 'd' || th === 'dark') this.setTheme('dark', false);
    if (state.m === 't') this.setScaleMode('true');
    this.engine.applyState(state);
    this.updateTimeReadout();
  }

  scheduleHashUpdate() {
    clearTimeout(this.hashTimer);
    this.hashTimer = setTimeout(() => {
      const s = this.engine.getState();
      const params = new URLSearchParams();
      if (s.f) params.set('f', s.f);
      params.set('z', String(s.z));
      params.set('y', String(s.y));
      params.set('p', String(s.p));
      if (s.m === 't') params.set('m', 't');
      if (s.t) params.set('t', String(s.t));
      if (this.engine.theme === 'light') params.set('th', 'l');
      history.replaceState(null, '', `#${params.toString()}`);
    }, 600);
  }

  // ------------------------------------------------------------ UI builders
  _initScaleStepper() {
    const nav = $('scale-stepper');
    nav.replaceChildren();
    COSMIC_SCALES.forEach((scale) => {
      const btn = el('button', 'scale-pill');
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
      this.setTheme(next, true);
    };
    const themeHeaderBtn = $('btn-toggle-theme');
    if (themeHeaderBtn) themeHeaderBtn.addEventListener('click', toggleTheme);
    const themeChipBtn = $('btn-chip-theme');
    if (themeChipBtn) themeChipBtn.addEventListener('click', toggleTheme);

    const panelsBtn = $('btn-toggle-panels');
    panelsBtn.addEventListener('click', () => {
      const clean = document.body.classList.toggle('clean-view');
      panelsBtn.setAttribute('aria-pressed', String(clean));
      panelsBtn.textContent = clean ? '🧭 Show panels' : '🖼️ Clean View';
    });

    $('btn-read-aloud').addEventListener('click', () => this.toggleSpeechForCurrentObject());
    $('btn-credits').addEventListener('click', () => $('credits-modal').classList.remove('hidden'));
    $('btn-close-credits').addEventListener('click', () => $('credits-modal').classList.add('hidden'));
  }

  setTheme(mode, updateHash = true) {
    const isLight = mode === 'light';
    document.body.classList.toggle('light-mode', isLight);
    this.engine.setTheme(isLight ? 'light' : 'dark');
    const headerBtn = $('btn-toggle-theme');
    if (headerBtn) {
      headerBtn.classList.toggle('active-toggle', isLight);
      headerBtn.setAttribute('aria-pressed', String(isLight));
      headerBtn.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
    }
    const chipBtn = $('btn-chip-theme');
    if (chipBtn) {
      chipBtn.classList.toggle('active-toggle', isLight);
      chipBtn.setAttribute('aria-pressed', String(isLight));
      chipBtn.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
    }
    try {
      localStorage.setItem('cosmic_theme', isLight ? 'light' : 'dark');
    } catch (_) {}
    if (updateHash) this.scheduleHashUpdate();
  }

  setScaleMode(mode) {
    this.engine.setScaleMode(mode);
    const btn = $('btn-toggle-scale');
    const isTrue = mode === 'true';
    btn.classList.toggle('active-toggle', isTrue);
    btn.setAttribute('aria-pressed', String(isTrue));
    btn.textContent = isTrue ? '📏 True scale (on)' : '📏 True scale';
  }

  _initQuickTrackers() {
    const bar = $('quick-tracker-chips');
    bar.replaceChildren();
    for (const item of QUICK_TARGETS) {
      if (!this.engine.has(item.id)) continue;
      const chip = el('button', 'tracker-chip', item.label);
      chip.type = 'button';
      chip.dataset.objectId = item.id;
      chip.addEventListener('click', () => {
        this.stopTour();
        this.engine.focusOn(item.id, { fromUser: true });
        this.scheduleHashUpdate();
      });
      bar.appendChild(chip);
    }

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
      pauseBtn.setAttribute('aria-label', this.engine.paused ? 'Resume time' : 'Pause time');
    });
    $('btn-time-now').addEventListener('click', () => {
      this.engine.setTimeNow();
      this.engine.setTimeSpeedIndex(0);
      this.updateTimeReadout();
    });
    this.updateTimeReadout();
  }

  updateTimeReadout() {
    const speed = TIME_SPEEDS[this.engine.timeSpeedIndex];
    $('time-speed-label').textContent = this.engine.paused ? `Paused • ${speed.label}` : speed.label;
    $('time-date-label').textContent = formatDateUTC(this.engine.state.dateMs);
  }

  _initModals() {
    const tourBanner = $('guided-tour-bar');
    $('btn-start-tour').addEventListener('click', () => {
      this.tourActive = true;
      this.tourIndex = 0;
      tourBanner.classList.remove('hidden');
      this._applyTourStop();
    });
    $('btn-tour-prev').addEventListener('click', () => {
      if (this.tourIndex > 0) {
        this.tourIndex--;
        this._applyTourStop();
      }
    });
    $('btn-tour-next').addEventListener('click', () => {
      if (this.tourIndex < GUIDED_TOUR_STOPS.length - 1) {
        this.tourIndex++;
        this._applyTourStop();
      } else {
        this.stopTour();
      }
    });
    $('btn-tour-close').addEventListener('click', () => this.stopTour());

    const quizModal = $('quiz-modal');
    $('btn-open-quiz').addEventListener('click', () => {
      this.quizIndex = 0;
      this.quizScore = 0;
      this.quizAnswered = false;
      quizModal.classList.remove('hidden');
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
      modal.classList.remove('hidden');
      this._renderExoplanetResults();
      searchInput.focus();
    });
    $('btn-close-exoplanets').addEventListener('click', () => modal.classList.add('hidden'));

    $('btn-exo-view-cloud').addEventListener('click', () => {
      modal.classList.add('hidden');
      this.stopTour();
      this.engine.focusOn('trappist1', { zoom: 61.5, yaw: 0.45, pitch: 0.38 });
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
    summaryEl.textContent = `Showing ${capped.length} of ${matches.length.toLocaleString()} matching star systems (${matchedPlanets.toLocaleString()} confirmed exoplanets) • Click any system or planet to fly there in 3D`;

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
        this.scheduleHashUpdate();
      });
      titleWrap.appendChild(titleBtn);
      titleWrap.appendChild(el('span', 'exo-sys-meta', `${distLy} ly • Spectral ${sp || 'G'} (${teff || 5500} K) • ${planets.length} planet${planets.length > 1 ? 's' : ''}`));
      header.appendChild(titleWrap);

      const flyBtn = el('button', 'primary-action-btn exo-fly-cta', '🚀 Fly to System');
      flyBtn.type = 'button';
      flyBtn.addEventListener('click', () => {
        $('exoplanet-modal').classList.add('hidden');
        this.stopTour();
        this.engine.focusOn(sysId, { fromUser: true });
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
        const pChip = el(
          'button',
          `exo-planet-chip${isHz ? ' hz-chip' : ''}`,
          `${isHz ? '🌱 ' : '🪐 '}${pName} • ${EXOPLANET_TYPES[typeIdx] || 'rocky'} (${rade} R⊕, ${orbperd < 10 ? orbperd.toFixed(1) : Math.round(orbperd)}d, ${equlTemp}K, ${EXOPLANET_METHODS[methodIdx] || 'Transit'} ${discYear})`
        );
        pChip.type = 'button';
        pChip.addEventListener('click', () => {
          $('exoplanet-modal').classList.add('hidden');
          this.stopTour();
          this.engine.stages[2].ensureArchiveSystem(sysId);
          this.engine.focusOn(pId, { fromUser: true });
          this.scheduleHashUpdate();
        });
        chipsWrap.appendChild(pChip);
      }
      card.appendChild(chipsWrap);
      listEl.appendChild(card);
    }
  }

  _applyTourStop() {
    const stop = GUIDED_TOUR_STOPS[this.tourIndex];
    if (!stop) return;
    $('tour-step-title').textContent = `${stop.title} (${this.tourIndex + 1}/${GUIDED_TOUR_STOPS.length})`;
    $('tour-step-desc').textContent = stop.narration;
    $('btn-tour-next').textContent = this.tourIndex === GUIDED_TOUR_STOPS.length - 1 ? 'Finish tour 🏁' : 'Next stop ➡️';
    let { yaw, pitch } = stop;
    if (stop.faceOnGalaxy) ({ yaw, pitch } = this.engine.anglesForDirection(GALACTIC_FRAME.Z, -0.35));
    this.engine.focusOn(stop.objectId, {
      zoom: stop.zoomValue === null || stop.zoomValue === undefined ? undefined : stop.zoomValue,
      yaw,
      pitch
    });
    const studioUrl = STUDIO_AUDIO_MANIFEST[`tour_${this.tourIndex}`];
    this.speakText(`${stop.title}. ${stop.narration}`, studioUrl);
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
    const scale = COSMIC_SCALES[index] || COSMIC_SCALES[0];
    $('current-scale-title').textContent = scale.name;
    $('current-scale-range').textContent = scale.rangeLabel;
    $('current-scale-desc').textContent = scale.description;
    document.querySelectorAll('.scale-pill').forEach((pill) => {
      pill.classList.toggle('active', parseInt(pill.dataset.scaleIndex, 10) === index);
    });
  }

  updateVoyagerLiveBanner() {
    const t = getVoyagerLiveTelemetry(this.engine ? this.engine.state.dateMs : Date.now());
    const rd = $('live-roadster-dist');
    if (rd && t.roadster) {
      rd.textContent = `${t.roadster.distanceMillionKm}M km (${t.roadster.distanceAU} AU • ${t.roadster.speedKmS} km/s)`;
    }
    $('live-v1-dist').textContent = `${t.voyager1.distanceBillionKm}B km (${t.voyager1.distanceAU} AU)`;
    $('live-v2-dist').textContent = `${t.voyager2.distanceBillionKm}B km (${t.voyager2.distanceAU} AU)`;
    const live = $('inspector-live-km');
    if (live) {
      const key = this.selectedObjectId === 'voyager1' ? 'voyager1' : this.selectedObjectId === 'voyager2' ? 'voyager2' : this.selectedObjectId === 'roadster' ? 'roadster' : null;
      if (key && t[key]) {
        live.textContent =
          key === 'roadster'
            ? `${Math.round(t.roadster.distanceKm).toLocaleString()} km from Sun (${t.roadster.distanceAU} AU)`
            : `${Math.round(t[key].distanceKm).toLocaleString()} km from the Sun`;
      }
    }
  }

  // ------------------------------------------------------------ inspector
  selectObject(objectId, fromEngine = false) {
    const obj = COSMIC_OBJECTS[objectId] || this.engine.getObjectInfo(objectId);
    if (!obj) return;
    this.selectedObjectId = objectId;
    if (!fromEngine) this.engine.focusOn(objectId, { silent: true });

    document.querySelectorAll('.tracker-chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.objectId === objectId));

    $('inspector-badge').textContent = obj.badge || '✨';
    $('inspector-title').textContent = obj.name;
    $('inspector-pronounce').textContent = obj.pronunciation ? `Say it: "${obj.pronunciation}" • ${obj.category}` : obj.category || '';
    $('inspector-summary').textContent = obj.kidSummary || '';

    const voyagerBox = $('inspector-voyager-live');
    voyagerBox.replaceChildren();
    if (obj.isVoyager) {
      voyagerBox.classList.remove('hidden');
      const tel = getVoyagerLiveTelemetry(this.engine ? this.engine.state.dateMs : Date.now())[obj.voyagerKey];
      if (obj.voyagerKey === 'roadster' && tel) {
        voyagerBox.appendChild(el('div', 'voyager-live-header', '🚗 LIVE STARMAN TESLA ROADSTER TELEMETRY'));
        const km = el('div', 'voyager-live-km', `${Math.round(tel.distanceKm).toLocaleString()} km from Sun (${tel.distanceAU} AU)`);
        km.id = 'inspector-live-km';
        voyagerBox.appendChild(km);
        voyagerBox.appendChild(
          el(
            'div',
            'voyager-live-sub',
            `Earth distance: ${tel.earthDistanceMillionKm}M km (${tel.earthDistanceAU} AU) • Speed: ${tel.speedKmS} km/s (${tel.speedMph}) • Orbits since 2018: ${tel.orbitsCompleted}`
          )
        );
      } else if (tel) {
        voyagerBox.appendChild(el('div', 'voyager-live-header', '📡 LIVE INTERSTELLAR TELEMETRY'));
        const km = el('div', 'voyager-live-km', `${Math.round(tel.distanceKm).toLocaleString()} km from the Sun`);
        km.id = 'inspector-live-km';
        voyagerBox.appendChild(km);
        voyagerBox.appendChild(el('div', 'voyager-live-sub', `Speed ${tel.speedKmS} km/s (${tel.speedMph}) • one-way radio time ${tel.oneWayLightTimeHours} h`));
      }
    } else {
      voyagerBox.classList.add('hidden');
    }

    const exoBox = $('inspector-exoplanets');
    exoBox.replaceChildren();
    if (obj.hasExoplanets && Array.isArray(obj.exoplanets) && obj.exoplanets.length) {
      exoBox.classList.remove('hidden');
      exoBox.appendChild(el('h4', 'section-subtitle', '🪐 Known exoplanets in this system (click to fly)'));
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
    const labels = { light: '⚡ Speed of light', voyager1: '📡 Voyager 1 speed', jetPlane: '✈️ Passenger jet', apolloRocket: '🚀 Apollo rocket', spacecraft: '🚀 NASA spacecraft', voyager2: '🛸 Voyager 2 speed' };
    for (const [mode, duration] of Object.entries(obj.travelTimes || {})) {
      const row = el('div', 'travel-row');
      row.appendChild(el('span', 'travel-mode', labels[mode] || mode));
      row.appendChild(el('strong', 'travel-val', duration));
      travel.appendChild(row);
    }
    if (!Object.keys(obj.travelTimes || {}).length) travel.appendChild(el('div', 'travel-row', 'Right here in our Solar System!'));

    if (fromEngine && this.isSpeaking && !this.tourActive) {
      const fact = obj.funFacts && obj.funFacts.length ? ` Fun fact: ${obj.funFacts[0]}` : '';
      const studioUrl = STUDIO_AUDIO_MANIFEST[`obj_${objectId}`];
      this.speakText(`${obj.name}. ${obj.kidSummary}${fact}`, studioUrl);
    }
    this.scheduleHashUpdate();
  }

  // ------------------------------------------------------------ speech (Chirp3-HD Studio Audio + Neural Web Speech Fallback)
  toggleSpeechForCurrentObject() {
    if (this.isSpeaking) {
      this.stopSpeech();
      return;
    }
    const obj = COSMIC_OBJECTS[this.selectedObjectId] || this.engine.getObjectInfo(this.selectedObjectId);
    if (!obj) return;
    const fact = obj.funFacts && obj.funFacts.length ? ` Fun fact: ${obj.funFacts[0]}` : '';
    const studioUrl = STUDIO_AUDIO_MANIFEST[`obj_${this.selectedObjectId}`];
    this.speakText(`${obj.name}. ${obj.kidSummary}${fact}`, studioUrl);
  }

  _pickBestBrowserVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;
    const enVoices = voices.filter((v) => /^en(-|_|$)/i.test(v.lang));
    const pool = enVoices.length ? enVoices : voices;

    const scoreVoice = (v) => {
      const name = `${v.name} ${v.voiceURI}`;
      if (/Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Fred|Good News|Jester|Junior|Organ|Ralph|Superstar|Trinoids|Whisper|Wobble|Zarvox/i.test(name)) {
        return -100;
      }
      let s = 0;
      if (/Natural|Online|Neural|Chirp|Studio|Journey/i.test(name)) s += 50;
      if (/Premium|Enhanced/i.test(name)) s += 40;
      if (/Google UK English Female|Google US English/i.test(name)) s += 36;
      if (/Ava|Zoe|Allison|Samantha|Serena|Karen|Moira|Daniel|Tessa/i.test(name)) s += 26;
      if (/en-US|en_US|en-GB|en_GB/i.test(v.lang)) s += 10;
      if (!v.localService) s += 8;
      return s;
    };

    return pool.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
  }

  _cleanSpeechProsody(text) {
    return String(text)
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
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
      .replace(/−/g, 'minus ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  speakText(text, studioAudioUrl = null) {
    this.stopSpeech();
    const btn = $('btn-read-aloud');

    if (studioAudioUrl) {
      const audio = new Audio(studioAudioUrl);
      this.activeAudio = audio;
      this.isSpeaking = true;
      btn.textContent = '⏹️ Stop reading';
      audio.onended = () => {
        if (this.activeAudio === audio) {
          this.activeAudio = null;
          this.isSpeaking = false;
          btn.textContent = '🔊 Read aloud';
        }
      };
      audio.onerror = () => {
        if (this.activeAudio === audio) {
          this.activeAudio = null;
          this._speakWithBrowserVoice(text);
        }
      };
      audio.play().catch(() => {
        if (this.activeAudio === audio) {
          this.activeAudio = null;
          this._speakWithBrowserVoice(text);
        }
      });
      return;
    }

    this._speakWithBrowserVoice(text);
  }

  _speakWithBrowserVoice(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleaned = this._cleanSpeechProsody(text);
    const u = new SpeechSynthesisUtterance(cleaned);
    const bestVoice = this._pickBestBrowserVoice();
    if (bestVoice) u.voice = bestVoice;
    u.rate = 0.96;
    u.pitch = 1.0;
    const btn = $('btn-read-aloud');
    u.onstart = () => {
      this.isSpeaking = true;
      btn.textContent = '⏹️ Stop reading';
    };
    u.onend = u.onerror = () => {
      this.isSpeaking = false;
      btn.textContent = '🔊 Read aloud';
    };
    window.speechSynthesis.speak(u);
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
    if (btn) btn.textContent = '🔊 Read aloud';
  }

  // ------------------------------------------------------------ quiz
  _renderQuizStep() {
    const container = $('quiz-body');
    container.replaceChildren();
    if (this.quizIndex >= SPACE_QUIZ_QUESTIONS.length) {
      container.appendChild(el('div', 'quiz-trophy', '👩‍🚀🏆👨‍🚀'));
      container.appendChild(el('h3', 'quiz-complete-title', `Junior Astronaut badge earned! Score: ${this.quizScore} / ${SPACE_QUIZ_QUESTIONS.length}`));
      container.appendChild(el('p', 'quiz-complete-msg', 'You explored from Earth and the Moon past Voyager 1 & 2, Alpha Centauri, the Milky Way, and out to the cosmic web!'));
      const again = el('button', 'primary-action-btn', '🔄 Play again');
      again.type = 'button';
      again.addEventListener('click', () => {
        this.quizIndex = 0;
        this.quizScore = 0;
        this._renderQuizStep();
      });
      container.appendChild(again);
      return;
    }
    const q = SPACE_QUIZ_QUESTIONS[this.quizIndex];
    container.appendChild(el('div', 'quiz-progress', `Question ${this.quizIndex + 1} of ${SPACE_QUIZ_QUESTIONS.length} • Score: ${this.quizScore}`));
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
        feedback.classList.remove('hidden');
        feedback.replaceChildren();
        feedback.appendChild(el('p', '', q.explanation));
        const next = el('button', 'primary-action-btn', this.quizIndex < SPACE_QUIZ_QUESTIONS.length - 1 ? 'Next question ➡️' : 'See my badge 🏆');
        next.type = 'button';
        next.addEventListener('click', () => {
          this.quizAnswered = false;
          this.quizIndex++;
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
    if (status) status.textContent = 'Sorry — your browser could not start WebGL. Try Chrome, Edge, Firefox or Safari on a computer or recent phone.';
    console.error('Cosmic Explorer failed to start');
    throw err;
  }
});
