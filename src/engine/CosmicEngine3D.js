/**
 * CosmicEngine3D — WebGL engine for Cosmic Explorer 3D.
 * One continuous scene from Earth's clouds to the cosmic microwave background:
 *   • logarithmic depth buffer + double-precision CPU transforms (no z-fighting, no jitter)
 *   • real ephemerides for the simulated date, HDR bloom, ACES tone mapping
 *   • five "stages" that fade in/out with the zoom level
 */
import * as THREE from '../../vendor/three/build/three.module.js';
import { EffectComposer } from '../../vendor/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../../vendor/three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../../vendor/three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../../vendor/three/examples/jsm/postprocessing/OutputPass.js';

import { ScaleModel } from './scale.js';
import { TextureKit } from './textures.js';
import { BodyFactory } from './bodies.js';
import { LabelLayer } from './LabelLayer.js';
import { CameraRig } from './CameraRig.js';
import { daysSinceJ2000, GALACTIC_FRAME } from './astro.js';
import { EarthMoonStage } from './stages/EarthMoonStage.js';
import { SolarSystemStage } from './stages/SolarSystemStage.js';
import { StellarStage } from './stages/StellarStage.js';
import { GalaxyStage } from './stages/GalaxyStage.js';
import { UniverseStage } from './stages/UniverseStage.js';
import { MarvelStage } from './stages/MarvelStage.js';
import { describeAny } from '../catalog/describe.js';

export const TIME_SPEEDS = [
  { mult: 1, label: 'Real time' },
  { mult: 60, label: '1 min / sec' },
  { mult: 3600, label: '1 hour / sec' },
  { mult: 86400, label: '1 day / sec' },
  { mult: 604800, label: '1 week / sec' },
  { mult: 2629800, label: '1 month / sec' },
  { mult: 31557600, label: '1 year / sec' },
  { mult: 315576000, label: '10 years / sec' }
];

export const STAGE_DEFAULTS = [
  { focus: 'earth', zoom: 4.2, yaw: -0.9, pitch: 0.22 },
  { focus: 'sun', zoom: 36, yaw: -0.6, pitch: 0.62 },
  { focus: 'sun', zoom: 56, yaw: -0.35, pitch: 0.4 },
  { focus: 'sagittariusA', zoom: 84, yaw: 0.4, pitch: 0.95, faceOnGalaxy: true, tilt: -0.35 },
  { focus: 'milkyWayDisk', zoom: 93.5, yaw: 0.6, pitch: 0.5 }
];

export const MARVEL_STAGE_DEFAULTS = [
  { focus: 'benatar', zoom: 5.5, yaw: -0.6, pitch: 0.24 },
  { focus: 'asgard', zoom: 28, yaw: -0.45, pitch: 0.35 },
  { focus: 'knowhere', zoom: 54, yaw: -0.35, pitch: 0.32 },
  { focus: 'sakaar', zoom: 76, yaw: 0.3, pitch: 0.36 },
  { focus: 'arishem', zoom: 92, yaw: 0.4, pitch: 0.28 }
];

export class CosmicEngine3D {
  constructor({ canvas, labelContainer, callbacks = {}, lang = 'en' }) {
    this.canvas = canvas;
    this.lang = lang;
    this.universeMode = 'nasa';
    this.cb = {
      onSelect: () => {},
      onZoom: () => {},
      onStage: () => {},
      onProgress: () => {},
      onReady: () => {},
      onInteract: () => {},
      ...callbacks
    };

    const isMobile =
      window.matchMedia('(max-width: 768px), (pointer: coarse)').matches ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.isMobile = isMobile;

    // ---- renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.pixelRatioCap = isMobile ? 1.5 : 1.75;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, this.pixelRatioCap);
    const initW = canvas.clientWidth || window.innerWidth || 1280;
    const initH = canvas.clientHeight || window.innerHeight || 800;
    this.width = initW;
    this.height = initH;
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(initW, initH, false);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.setClearColor(0x060d1f, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, initW / initH, 0.01, 1e27);
    this.camera.position.set(0, 0, 8);
    this.scene.add(this.camera);

    // ---- post-processing (HDR bloom, ACES output)
    const rt = new THREE.WebGLRenderTarget(Math.round(initW * this.pixelRatio), Math.round(initH * this.pixelRatio), {
      type: THREE.HalfFloatType
    });
    this.composer = new EffectComposer(this.renderer, rt);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(initW, initH);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(initW, initH), 0.55, 0.4, 0.9);
    this.bloom.enabled = !isMobile;
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    // ---- shared services
    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = (url, loaded, total) => this.cb.onProgress(url, loaded, total);
    this.tex = new TextureKit(THREE, this.renderer, this.manager);
    this.bodies = new BodyFactory(THREE, this.tex);
    this.scale = new ScaleModel();
    this.labels = new LabelLayer(THREE, labelContainer, {
      onPick: (id) => this.focusOn(id, { fromUser: true }),
      lang: this.lang
    });
    this.registry = new Map();
    this.pickables = [];
    this.theme = 'dark';
    this.state = { dateMs: Date.now(), dDays: 0, zoom: 4.2, blend: 0, timeSeconds: 0, tick: 0, theme: 'dark' };

    this.showOrbits = true;
    this.showHabitableZones = true;
    this.orbitVersion = 0;
    this.sunPos = new THREE.Vector3(0, 0, 0);
    this.focusedId = null;

    const engine = this;
    const ctx = {
      THREE,
      scene: this.scene,
      camera: this.camera,
      scale: this.scale,
      tex: this.tex,
      bodies: this.bodies,
      labels: this.labels,
      state: this.state,
      sunPos: this.sunPos,
      registry: this.registry,
      register: (id, def) => this.register(id, def),
      focusObject: (id, opts) => this.focusOn(id, { fromUser: true, ...opts }),
      get stages() {
        return engine.stages;
      },
      get universeMode() {
        return engine.universeMode;
      },
      get showOrbits() {
        return engine.showOrbits;
      },
      get showHabitableZones() {
        return engine.showHabitableZones;
      },
      get orbitVersion() {
        return engine.orbitVersion;
      },
      get theme() {
        return engine.theme;
      }
    };

    this.stages = [
      new StellarStage(ctx),
      new EarthMoonStage(ctx),
      new SolarSystemStage(ctx),
      new GalaxyStage(ctx),
      new UniverseStage(ctx)
    ];
    this.marvelStage = new MarvelStage(ctx);
    this.stages.push(this.marvelStage);

    // ---- camera & input
    this.zoom = 4.2;
    this.targetZoom = 4.2;
    this.rig = new CameraRig(THREE, this.camera, canvas, {
      onZoomDelta: (d) => this.setTargetZoom(this.targetZoom + d),
      onClick: (x, y) => this._pick(x, y),
      onInteract: () => this.cb.onInteract()
    });
    this.raycaster = new THREE.Raycaster();
    this._ndc = new THREE.Vector2();
    this._camPos = new THREE.Vector3();

    // ---- time
    this.timeSpeedIndex = 0;
    this.paused = false;
    this.lastStage = -1;
    this.running = false;
    this._lastFrame = performance.now();
    this._frameCount = 0;

    // Seed initial stage positions so frame 1 focus (e.g. #f=moon) has exact world coordinates
    const initFrame = {
      dateMs: this.state.dateMs,
      dDays: daysSinceJ2000(this.state.dateMs),
      zoom: this.zoom,
      dt: 0.016,
      camera: this.camera,
      cameraPos: this.camera.position,
      scale: this.scale,
      blend: 0,
      timeSeconds: 0,
      tick: 0,
      pixelRatio: this.pixelRatio,
      focal: this.height / 2 / Math.tan((this.camera.fov * Math.PI) / 360),
      width: this.width,
      height: this.height
    };
    for (const s of this.stages) s.update(initFrame);
    this._syncUniverseLabelVisibility();

    this.focusOn('earth', { instant: true, zoom: 4.2, silent: true });
    this.rig.setAngles(STAGE_DEFAULTS[0].yaw, STAGE_DEFAULTS[0].pitch, true);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => this.resize());
      this._ro.observe(this.canvas);
    }
  }

  _syncUniverseLabelVisibility() {
    const isMarvel = this.universeMode === 'marvel';
    for (const def of this.registry.values()) {
      if (def.isMarvel) {
        def.forceHidden = !isMarvel;
      } else {
        // Keep Earth and Sun visible in Marvel mode for context, hide other NASA-only labels
        def.forceHidden = isMarvel && def.id !== 'earth' && def.id !== 'sun';
      }
    }
  }

  setUniverseMode(mode = 'nasa', { skipFocus = false } = {}) {
    this.universeMode = mode === 'marvel' ? 'marvel' : 'nasa';
    if (this.marvelStage) {
      this.marvelStage.setActive(this.universeMode === 'marvel');
    }
    this._syncUniverseLabelVisibility();
    if (!skipFocus) {
      if (this.universeMode === 'marvel') {
        const d = MARVEL_STAGE_DEFAULTS[1]; // Asgard & Nine Realms by default
        this.focusOn(d.focus, { zoom: d.zoom, yaw: d.yaw, pitch: d.pitch });
      } else {
        const d = STAGE_DEFAULTS[0];
        this.focusOn(d.focus, { zoom: d.zoom, yaw: d.yaw, pitch: d.pitch });
      }
    }
  }

  // ------------------------------------------------------------------ registry
  register(id, def) {
    def.id = id;
    this.registry.set(id, def);
    this.labels.add(def);
    if (def.pick) {
      for (const mesh of def.pick) {
        mesh.userData.focusId = id;
        this.pickables.push(mesh);
      }
    }
    return def;
  }

  has(id) {
    return this.registry.has(id) || (this.stages[0] && this.stages[0].archiveById && this.stages[0].archiveById.has(id));
  }

  getObjectInfo(id, lang = this.lang) {
    return describeAny(id, lang);
  }

  setLanguage(lang = 'en') {
    this.lang = lang;
    this.labels.setLanguage(lang);
  }

  listIds() {
    return [...this.registry.keys()];
  }

  // ------------------------------------------------------------------ camera / zoom
  setTargetZoom(z) {
    this.targetZoom = Math.max(0, Math.min(100, z));
    this.cb.onZoom(this.targetZoom);
  }

  jumpToStage(index) {
    const defaults = this.universeMode === 'marvel' ? MARVEL_STAGE_DEFAULTS : STAGE_DEFAULTS;
    const d = defaults[index] || defaults[0];
    let { yaw, pitch } = d;
    if (d.faceOnGalaxy) ({ yaw, pitch } = this.anglesForDirection(GALACTIC_FRAME.Z, d.tilt || 0));
    this.focusOn(d.focus, { zoom: d.zoom, yaw, pitch });
  }

  /** Camera yaw/pitch that looks along -dir (camera placed on the +dir side of the focus). */
  anglesForDirection(dir, tilt = 0) {
    const [x, y, z] = dir;
    const yaw = Math.atan2(x, z);
    const pitch = Math.max(-1.5, Math.min(1.5, Math.asin(Math.max(-1, Math.min(1, y))) + tilt));
    return { yaw, pitch };
  }

  focusOn(id, { zoom, instant = false, yaw, pitch, silent = false, fromUser = false } = {}) {
    if (!this.registry.has(id) && this.stages[0] && typeof this.stages[0].ensureArchiveSystem === 'function') {
      const resolved = this.stages[0].ensureArchiveSystem(id);
      if (resolved) id = resolved;
    }
    const def = this.registry.get(id);
    if (!def) return false;
    this.focusedId = id;
    this.labels.focusedId = id;
    this.rig.setFocus((out) => def.getWorldPos(out), { instant });
    const targetZoom = zoom !== undefined ? zoom : this.scale.zoomForDistance(def.viewDistance());
    this.setTargetZoom(targetZoom);
    if (instant) this.zoom = this.targetZoom;
    if (yaw === undefined && pitch === undefined && !silent && typeof def.preferredView === 'function') {
      const pv = def.preferredView(this);
      if (pv) ({ yaw, pitch } = pv);
    }
    if (yaw !== undefined || pitch !== undefined) {
      this.rig.setAngles(yaw ?? this.rig.targetYaw, pitch ?? this.rig.targetPitch, instant);
    }
    if (!silent) this.cb.onSelect(id, { fromUser });
    return true;
  }

  getState() {
    return {
      u: this.universeMode === 'marvel' ? 'marvel' : undefined,
      f: this.focusedId,
      z: Number(this.targetZoom.toFixed(2)),
      y: Number(this.rig.targetYaw.toFixed(3)),
      p: Number(this.rig.targetPitch.toFixed(3)),
      m: this.scale.mode === 'true' ? 't' : 'e',
      t: this.timeSpeedIndex
    };
  }

  applyState(s) {
    if (!s) return;
    if (s.u === 'marvel') {
      this.setUniverseMode('marvel', { skipFocus: true });
    }
    if (s.m === 't') this.setScaleMode('true');
    if (s.f) {
      if (!this.registry.has(s.f) && this.stages[0] && typeof this.stages[0].ensureArchiveSystem === 'function') {
        this.stages[0].ensureArchiveSystem(s.f);
      }
      if (this.registry.has(s.f)) {
        const def = this.registry.get(s.f);
        if (def && def.isMarvel && this.universeMode !== 'marvel') {
          this.setUniverseMode('marvel', { skipFocus: true });
        }
        this.focusOn(s.f, { zoom: typeof s.z === 'number' ? s.z : undefined, yaw: s.y, pitch: s.p, instant: true, silent: false });
      }
    } else if (typeof s.z === 'number') {
      this.setTargetZoom(s.z);
    }
    if (typeof s.t === 'number' && TIME_SPEEDS[s.t]) this.timeSpeedIndex = s.t;
  }

  // ------------------------------------------------------------------ time
  setTimeSpeedIndex(i) {
    this.timeSpeedIndex = Math.max(0, Math.min(TIME_SPEEDS.length - 1, i));
    return TIME_SPEEDS[this.timeSpeedIndex];
  }

  get timeSpeed() {
    return TIME_SPEEDS[this.timeSpeedIndex];
  }

  setPaused(p) {
    this.paused = p;
  }

  setTimeNow() {
    this.state.dateMs = Date.now();
  }

  setDate(ms) {
    this.state.dateMs = ms;
  }

  // ------------------------------------------------------------------ options
  setScaleMode(mode) {
    this.scale.setMode(mode);
    this.orbitVersion++;
  }

  setShowOrbits(v) {
    this.showOrbits = v;
  }

  setShowLabels(v) {
    this.labels.setEnabled(v);
  }

  setShowHabitableZones(v) {
    this.showHabitableZones = v;
  }

  setBloom(v) {
    this.bloom.enabled = v;
  }

  setTheme(mode = 'dark') {
    const isLight = mode === 'light';
    this.theme = isLight ? 'light' : 'dark';
    this.state.theme = this.theme;
    this.renderer.setClearColor(isLight ? 0xeaf2ff : 0x060d1f, 1);
    this.renderer.toneMappingExposure = isLight ? 1.05 : 1.18;
    this.bloom.strength = isLight ? 0.22 : 0.55;
    this.bloom.threshold = isLight ? 1.15 : 0.9;
    for (const s of this.stages) {
      if (typeof s.onThemeChange === 'function') s.onThemeChange(this.theme);
    }
  }

  setQuality(level) {
    this.pixelRatioCap = level === 'high' ? 2 : level === 'low' ? 1 : 1.5;
    this.bloom.enabled = level !== 'low';
    this.resize();
  }

  // ------------------------------------------------------------------ picking
  _pick(x, y) {
    this._ndc.set((x / this.width) * 2 - 1, -(y / this.height) * 2 + 1);
    this.raycaster.setFromCamera(this._ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.pickables, false);
    for (const h of hits) {
      let o = h.object;
      let visible = true;
      while (o) {
        if (!o.visible) {
          visible = false;
          break;
        }
        o = o.parent;
      }
      if (!visible) continue;
      const id = h.object.userData.focusId;
      if (!id) continue;
      const def = this.registry.get(id);
      if (def && def.forceHidden) continue;
      if (id !== this.focusedId) {
        this.focusOn(id, { fromUser: true });
        return;
      }
      return;
    }
  }

  // ------------------------------------------------------------------ loop
  resize() {
    const w = Math.max(1, this.canvas.clientWidth || window.innerWidth || 1280);
    const h = Math.max(1, this.canvas.clientHeight || window.innerHeight || 800);
    this.width = w;
    this.height = h;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, this.pixelRatioCap);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(w, h, false);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(w, h);
    if (this.bloom && typeof this.bloom.setSize === 'function') {
      this.bloom.setSize(w, h);
    }
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = (now) => {
      if (!this.running) return;
      let dt = (now - this._lastFrame) / 1000;
      if (!Number.isFinite(dt) || dt < 0) dt = 0.016;
      dt = Math.min(0.1, dt);
      this._lastFrame = now;
      this._step(dt);
      requestAnimationFrame(loop);
    };
    this._lastFrame = performance.now();
    requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
  }

  _step(dt) {
    const cw = Math.max(1, this.canvas.clientWidth || window.innerWidth || 1280);
    const ch = Math.max(1, this.canvas.clientHeight || window.innerHeight || 800);
    const pr = Math.min(window.devicePixelRatio || 1, this.pixelRatioCap);
    if (cw !== this.width || ch !== this.height || pr !== this.pixelRatio) {
      this.resize();
    }

    const st = this.state;
    st.tick++;
    st.timeSeconds += dt;
    if (!this.paused) st.dateMs += dt * 1000 * TIME_SPEEDS[this.timeSpeedIndex].mult;
    st.dDays = daysSinceJ2000(st.dateMs);

    this.scale.update(dt);
    st.blend = this.scale.blend;

    const k = 1 - Math.exp(-dt * 5.5);
    this.zoom += (this.targetZoom - this.zoom) * k;
    if (Math.abs(this.targetZoom - this.zoom) < 0.002) this.zoom = this.targetZoom;
    st.zoom = this.zoom;

    const distance = this.scale.distanceForZoom(this.zoom);
    this.rig.update(dt, distance);
    this.camera.updateMatrixWorld();
    this._camPos.copy(this.camera.position);

    const focal = this.height / 2 / Math.tan((this.camera.fov * Math.PI) / 360);
    const frame = {
      dateMs: st.dateMs,
      dDays: st.dDays,
      zoom: this.zoom,
      dt,
      camera: this.camera,
      cameraPos: this._camPos,
      scale: this.scale,
      blend: st.blend,
      timeSeconds: st.timeSeconds,
      tick: st.tick,
      pixelRatio: this.pixelRatio,
      focal,
      width: this.width,
      height: this.height
    };
    for (const s of this.stages) s.update(frame);

    // Re-sync camera and sky dome after stage positions update so there is zero 1-frame lag
    this.rig.update(0, distance);
    this.camera.updateMatrixWorld();
    this._camPos.copy(this.camera.position);
    if (this.stages[0] && this.stages[0].sky) {
      this.stages[0].sky.position.copy(this._camPos);
    }

    this.labels.update(this.camera, this.zoom, this.width, this.height);

    const focusDef = this.focusedId ? this.registry.get(this.focusedId) : null;
    const stage = Math.max(this.scale.stageForZoom(this.zoom), focusDef && focusDef.stage ? focusDef.stage : 0);
    if (stage !== this.lastStage) {
      this.lastStage = stage;
      this.cb.onStage(stage);
    }

    if (this.bloom && this.bloom.enabled) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
    this._frameCount++;
    if (this._frameCount === 2) this.cb.onReady();
  }
}

export { THREE };
