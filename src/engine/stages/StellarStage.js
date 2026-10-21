/**
 * StellarStage — the real night sky (ESO Milky Way panorama in galactic coordinates), ~90 real
 * stars & star systems with their exoplanets and habitable zones, nebulae, clusters, and the
 * procedural star field that bridges to the galaxy view.
 */
import { worldFromRaDec, GALACTIC_FRAME, SUN_RADIUS_EARTH, LY_IN_AU, formatNumber } from '../astro.js';
import { bandFade, smoothstep } from '../scale.js';
import { makeSunMaterial, makePointsMaterial } from '../shaders.js';
import { mulberry32, hexToRgb } from '../textures.js';
import { STARS, spectralColor } from '../../catalog/starCatalog.js';
import { EXOPLANET_SYSTEMS, EXOPLANET_TYPES, EXOPLANET_METHODS } from '../../catalog/exoplanetArchive.js';

const PLANET_LOOKS = {
  rocky: [
    { kind: 'rocky', base: '#b3845d', accent: '#5a3a28', craters: 0.5 },
    { kind: 'rocky', base: '#8d8781', accent: '#3f3b38', craters: 0.9 },
    { kind: 'rocky', base: '#c76f4a', accent: '#6f2f1d', craters: 0.3 }
  ],
  rockyHz: [{ kind: 'ocean', base: '#2b5fa8', accent: '#6f9a46' }, { kind: 'ocean', base: '#1f4f8f', accent: '#a7845a' }],
  lava: [{ kind: 'lava', base: '#2b1a15', accent: '#ff6a00' }],
  ocean: [{ kind: 'ocean', base: '#1e4f9a', accent: '#9ad0ff' }],
  gas: [
    { kind: 'gas', base: '#d9b58a', accent: '#8d5a3a', bands: 10 },
    { kind: 'gas', base: '#e8d2b0', accent: '#b07f55', bands: 7 },
    { kind: 'gas', base: '#7a2e12', accent: '#f7a254', bands: 6 }
  ],
  ice: [{ kind: 'gas', base: '#8fc9e8', accent: '#4e8fc0', bands: 3 }, { kind: 'gas', base: '#6f8fdd', accent: '#3b5bb5', bands: 4 }]
};

export class StellarStage {
  constructor(ctx) {
    this.ctx = ctx;
    const { THREE, scene, tex, bodies } = ctx;
    this.THREE = THREE;
    this._v = new THREE.Vector3();
    this._bx = new THREE.Vector3();
    this._by = new THREE.Vector3();
    this._bz = new THREE.Vector3();
    this._m = new THREE.Matrix4();
    this.systems = [];
    this.nebulae = [];
    this.lastUnitsPerLy = -1;
    this.glowTex = tex.glow({ size: 128, inner: 0.06, power: 2.6, spikes: 4 });
    this.softGlow = tex.glow({ size: 96, inner: 0.1, power: 2.0 });

    // ---------------- Real sky (ESO panorama in galactic coordinates + Light Mode Star Atlas)
    const skyGeo = new THREE.SphereGeometry(10, 96, 48);
    skyGeo.scale(-1, 1, 1);
    this.darkSkyMap = this._makeProceduralSkyTexture('dark');
    this.lightSkyMap = this._makeProceduralSkyTexture('light');
    // Opaque + renderOrder -1000 so it is drawn first (a transparent sky would be drawn after the
    // opaque planets and, with depthTest off, paint over them). Fading is done via colour.
    this.skyMaterial = new THREE.MeshBasicMaterial({
      map: this.darkSkyMap,
      color: 0xffffff,
      transparent: false,
      depthTest: false,
      depthWrite: false,
      fog: false
    });
    this.sky = new THREE.Mesh(skyGeo, this.skyMaterial);
    this.sky.renderOrder = -1000;
    this.sky.frustumCulled = false;
    const { X, Y, Z } = GALACTIC_FRAME;
    this._bx.set(-X[0], -X[1], -X[2]);
    this._by.set(Z[0], Z[1], Z[2]);
    this._bz.set(Y[0], Y[1], Y[2]);
    this._m.makeBasis(this._bx, this._by, this._bz);
    this.sky.quaternion.setFromRotationMatrix(this._m);
    this.sky.visible = true;
    scene.add(this.sky);
    tex.load('sky_milkyway_2k.jpg').then((t) => {
      if (!t) return;
      this.darkSkyMap = t;
      if (this.ctx.theme !== 'light') {
        this.skyMaterial.map = t;
        this.skyMaterial.needsUpdate = true;
      }
      const wantHi = tex.maxTextureSize >= 8192 && !/Mobi|Android/i.test(navigator.userAgent);
      if (wantHi) {
        tex.load('sky_milkyway_6k.jpg').then((hi) => {
          if (hi) {
            this.darkSkyMap = hi;
            if (this.ctx.theme !== 'light') {
              this.skyMaterial.map = hi;
              this.skyMaterial.needsUpdate = true;
            }
          }
        });
      }
    });

    // ---------------- Catalog stars, systems, nebulae
    const glowTex = this.glowTex;
    const softGlow = this.softGlow;
    for (const def of STARS) {
      this._buildStarSystem(def, glowTex, softGlow);
    }

    // ---------------- NASA Exoplanet Archive (all 6,451 confirmed exoplanets across 4,847 systems)
    this.archiveById = new Map();
    this.materializedArchive = new Set();
    this.exoCloud = this._makeExoplanetArchiveCloud();

    // ---------------- Procedural star fields (fixed-pixel points in light-year coordinates)
    this.nearField = this._makeStarField(24000, 1200, 350, 101, 0.9, 2.4);
    this.midField = this._makeStarField(52000, 14000, 450, 202, 0.7, 1.7);
  }

  _buildStarSystem(def, glowTex, softGlow, isDynamic = false) {
    const { THREE, scene, tex, bodies } = this.ctx;
    const ctx = this.ctx;
    const dir = worldFromRaDec(def.ra, def.dec);
    const sys = {
      def,
      dir: new THREE.Vector3(dir[0], dir[1], dir[2]),
      pos: new THREE.Vector3(),
      color: def.tint || spectralColor(def.sp),
      planets: [],
      isNebula: def.kind === 'nebula' || def.kind === 'cluster' || def.kind === 'globular',
      isDynamic
    };
    if (sys.isNebula) {
      const map =
        def.kind === 'nebula'
          ? tex.nebula(def.palette, hash(def.id))
          : def.kind === 'globular'
            ? tex.galaxySprite('elliptical', hash(def.id), def.tint || '#ffe3b0')
            : tex.nebula(['#9fc4ff', '#dbe8ff', '#ffffff'], hash(def.id));
      sys.sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.95 })
      );
      scene.add(sys.sprite);
    } else {
      const brightness = Math.log10(Math.max(1e-6, def.lum)) - 2 * Math.log10(Math.max(0.1, def.dist) / 10);
      sys.brightness = brightness;
      sys.sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: brightness > -1.5 ? glowTex : softGlow,
          color: new THREE.Color(sys.color),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      scene.add(sys.sprite);
      // physical star surface (only matters when you fly there)
      const radiusUnits = Math.max(0.05, def.radius * SUN_RADIUS_EARTH);
      const starMat = makeSunMaterial(THREE, {
        map: tex.planet({ kind: 'gas', base: '#ffb347', accent: '#ff7a1a', bands: 1 }, 9),
        intensity: 2.2,
        tint: sys.color
      });
      tex.load('sun_2k.jpg').then((t) => {
        if (t) starMat.uniforms.map.value = t;
      });
      sys.mesh = new THREE.Mesh(bodies.sphereMid, starMat);
      sys.mesh.scale.setScalar(radiusUnits);
      sys.radiusUnits = radiusUnits;
      sys.starMat = starMat;
      scene.add(sys.mesh);

      if (def.companion) {
        const c = def.companion;
        sys.companion = {
          def: c,
          pos: new THREE.Vector3(),
          sprite: new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: softGlow,
              color: new THREE.Color(spectralColor(c.sp)),
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending
            })
          ),
          mesh: new THREE.Mesh(
            bodies.sphereLow,
            makeSunMaterial(THREE, { map: starMat.uniforms.map.value, intensity: 2.0, tint: spectralColor(c.sp) })
          ),
          radiusUnits: Math.max(0.05, c.radius * SUN_RADIUS_EARTH)
        };
        sys.companion.mesh.scale.setScalar(sys.companion.radiusUnits);
        scene.add(sys.companion.sprite);
        scene.add(sys.companion.mesh);
        const ringGeo = unitCircle(THREE, 128);
        sys.companion.orbit = new THREE.Line(ringGeo, new THREE.LineBasicMaterial({ color: 0x9fb3cf, transparent: true, opacity: 0.3, depthWrite: false }));
        scene.add(sys.companion.orbit);
      }

      if (def.planets) {
        for (let i = 0; i < def.planets.length; i++) {
          const p = def.planets[i];
          const lookSet = p.type === 'rocky' && p.hz ? PLANET_LOOKS.rockyHz : PLANET_LOOKS[p.type] || PLANET_LOOKS.rocky;
          const look = lookSet[(hash(def.id) + i) % lookSet.length];
          const body = bodies.create(
            {
              id: `${def.id}-${i}`,
              radius: p.radius,
              procedural: look,
              lazyProcedural: true,
              color: look.base,
              haze: p.type === 'gas' || p.type === 'ice' ? { color: '#ffe9c9', strength: 0.15 } : p.hz || p.type === 'ocean' ? { color: '#7fb6ff', strength: 0.45 } : undefined,
              atmosphere: p.hz || p.type === 'ocean' ? { color: '#6fb0ff', scale: 1.035, strength: 0.9 } : undefined,
              limb: p.type === 'gas' || p.type === 'ice' ? 0.45 : 0,
              ambient: 0.01,
              faceParent: true
            },
            { quality: 'mid', seed: 1 + ((hash(def.id) + i) % 4) }
          );
          scene.add(body.group);
          const orbit = new THREE.Line(unitCircle(THREE, 128), new THREE.LineBasicMaterial({ color: p.hz ? 0x86efac : 0x9fb3cf, transparent: true, opacity: 0.35, depthWrite: false }));
          scene.add(orbit);
          const planet = { def: p, body, orbit, pos: new THREE.Vector3(), phase: ((hash(def.id) * 7 + i * 101) % 360) * (Math.PI / 180), id: `${def.id}-${i}` };
          sys.planets.push(planet);
          const planetId = `${def.id}:${slug(p.name)}`;
          planet.labelId = planetId;
          planet.reg = ctx.register(planetId, {
            name: p.name,
            stage: 2,
            kind: p.hz ? 'exoplanet-hz' : 'exoplanet',
            color: p.hz ? '#86efac' : '#c7d2fe',
            priority: 2.5,
            getWorldPos: (o) => o.copy(planet.pos),
            radius: () => p.radius,
            viewDistance: () => p.radius * 5,
            alpha: () => 0,
            alphaOverride: 0,
            pick: [body.mesh],
            sub: `${p.type}${p.hz ? ' • habitable zone' : ''} • year: ${p.period < 1000 ? p.period.toFixed(1) + ' days' : (p.period / 365.25).toFixed(1) + ' years'}`
          });
        }
        // habitable zone annulus
        sys.hz = new THREE.Mesh(
          new THREE.RingGeometry(1, 1.2, 128, 1),
          new THREE.MeshBasicMaterial({ map: tex.habitableRing(), transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false })
        );
        sys.hz.rotation.x = -Math.PI / 2;
        scene.add(sys.hz);
      }
      if (def.debrisDisk) {
        sys.debris = new THREE.Mesh(
          new THREE.RingGeometry(1, 1.3, 128, 1),
          new THREE.MeshBasicMaterial({ map: tex.habitableRing(), color: 0xd8c7b0, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false })
        );
        sys.debris.rotation.x = -Math.PI / 2 + 0.35;
        sys.debris.rotation.z = (hash(def.id) % 180) * (Math.PI / 180);
        scene.add(sys.debris);
      }
    }
    this.systems.push(sys);

    const far = def.dist > 120;
    const landmark = def.dist > 3000; // clusters/nebulae that still make sense on the galaxy map
    ctx.register(def.id, {
      name: def.name,
      stage: 2,
      kind: sys.isNebula ? 'nebula' : 'star',
      color: sys.color,
      priority: sys.isNebula ? 4 : isDynamic ? 3.2 : def.dist < 20 ? 5 : 3 + Math.min(2, Math.log10(Math.max(1, def.lum))),
      getWorldPos: (o) => o.copy(sys.pos),
      radius: () => (sys.isNebula ? (def.sizeLy * ctx.scale.unitsPerLy) / 2 : sys.radiusUnits || 0),
      viewDistance: () => this._viewDistance(sys),
      alpha: (z) => (landmark ? bandFade(z, 56, 62, 86, 92) : far ? bandFade(z, 56, 62, 76, 82) : bandFade(z, 46, 52, 70, 76)),
      sub: sys.isNebula ? `${formatNumber(def.dist)} light-years away` : `${def.dist < 100 ? def.dist.toFixed(1) : formatNumber(def.dist)} light-years • ${def.sp}`,
      pick: sys.mesh ? [sys.mesh] : undefined
    });
    return sys;
  }

  _makeExoplanetArchiveCloud() {
    const { THREE, scene, tex } = this.ctx;
    const count = EXOPLANET_SYSTEMS.length;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const row = EXOPLANET_SYSTEMS[i];
      // [host, ra, dec, distLy, sp, teff, stRad, stMass, lum, planets]
      const [host, ra, dec, distLy, sp, teff, stRad, stMass, lum, planets] = row;
      const sysId = `exo:${slug(host)}`;
      this.archiveById.set(sysId, {
        id: sysId,
        host,
        ra,
        dec,
        dist: distLy,
        sp,
        teff,
        radius: stRad,
        mass: stMass,
        lum,
        rawPlanets: planets
      });

      const dir = worldFromRaDec(ra, dec);
      pos[i * 3] = dir[0] * distLy;
      pos[i * 3 + 1] = dir[1] * distLy;
      pos[i * 3 + 2] = dir[2] * distLy;

      const hasHz = planets.some((p) => p[7] === 1);
      const isMulti = planets.length >= 3;
      let rgb;
      if (hasHz) {
        rgb = [74, 222, 128]; // emerald habitable zone host
      } else if (isMulti) {
        rgb = [56, 189, 248]; // cyan multi-planet system
      } else {
        rgb = [192, 132, 252]; // violet exoplanet system
      }
      const bright = hasHz ? 1.15 : isMulti ? 1.0 : 0.85;
      col[i * 3] = (rgb[0] / 255) * bright;
      col[i * 3 + 1] = (rgb[1] / 255) * bright;
      col[i * 3 + 2] = (rgb[2] / 255) * bright;
      size[i] = hasHz ? 4.2 : isMulti ? 3.4 : 2.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    const mat = makePointsMaterial(THREE, { map: tex.softDisk(32), attenuate: false, opacity: 0.9, minPx: 1.4, maxPx: 5.5 });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);
    return { group, points, mat, enabled: true };
  }

  ensureArchiveSystem(id) {
    const baseId = id.includes(':') && !id.startsWith('exo:') ? id : id.startsWith('exo:') ? id.split(':').slice(0, 2).join(':') : `exo:${slug(id)}`;
    if (this.ctx.registry.has(id)) return id;
    const rec = this.archiveById.get(baseId);
    if (!rec) return null;
    if (!this.materializedArchive.has(baseId)) {
      this.materializedArchive.add(baseId);
      const planets = rec.rawPlanets.map((p) => {
        const [suffix, a, period, radius, mass, eqt, typeIdx, hzFlag, discYear, methodIdx] = p;
        const pName = suffix.length <= 2 ? `${rec.host} ${suffix}` : suffix;
        const typeStr = EXOPLANET_TYPES[typeIdx] || 'rocky';
        const methodStr = EXOPLANET_METHODS[methodIdx] || 'Transit';
        return {
          name: pName,
          a,
          period,
          radius,
          mass,
          eqt,
          type: typeStr,
          hz: hzFlag === 1,
          discYear,
          method: methodStr,
          note: `Discovered in ${discYear} via ${methodStr} • Eq. temp ~${eqt} K (${Math.round(eqt - 273.15)} °C)`
        };
      });
      const def = {
        id: baseId,
        name: rec.host,
        ra: rec.ra,
        dec: rec.dec,
        dist: rec.dist,
        sp: rec.sp,
        teff: rec.teff,
        lum: rec.lum,
        radius: rec.radius,
        mass: rec.mass,
        kind: 'star',
        planets
      };
      this._buildStarSystem(def, this.glowTex, this.softGlow, true);
      this.lastUnitsPerLy = -1; // trigger scaled position rebuild on next frame
      if (this.ctx.scale) {
        this._rebuildScaled({ scale: this.ctx.scale });
      }
    }
    return this.ctx.registry.has(id) ? id : baseId;
  }

  _makeStarField(count, radiusLy, zSigmaLy, seed, minPx, maxPx) {
    const { THREE, scene, tex } = this.ctx;
    const rnd = mulberry32(seed);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const classes = [
      ['#ffcc6f', 0.76, 0.35],
      ['#ffd2a1', 0.12, 0.6],
      ['#fff4ea', 0.076, 0.8],
      ['#f8f7ff', 0.03, 0.95],
      ['#cad7ff', 0.012, 1.1],
      ['#aabfff', 0.002, 1.3]
    ];
    const { X, Y, Z } = GALACTIC_FRAME;
    for (let i = 0; i < count; i++) {
      // sample in galactic frame: disk-like distribution
      const r = radiusLy * Math.pow(rnd(), 0.9);
      const th = rnd() * Math.PI * 2;
      const gx = Math.cos(th) * r;
      const gy = Math.sin(th) * r;
      const gz = gauss(rnd) * Math.min(zSigmaLy, radiusLy * 0.6);
      pos[i * 3] = X[0] * gx + Y[0] * gy + Z[0] * gz;
      pos[i * 3 + 1] = X[1] * gx + Y[1] * gy + Z[1] * gz;
      pos[i * 3 + 2] = X[2] * gx + Y[2] * gy + Z[2] * gz;
      let u = rnd();
      let cls = classes[0];
      for (const c of classes) {
        if (u < c[1]) {
          cls = c;
          break;
        }
        u -= c[1];
      }
      const rgb = hexToRgb(cls[0]);
      const bright = cls[2] * (0.6 + rnd() * 0.8);
      col[i * 3] = (rgb[0] / 255) * bright;
      col[i * 3 + 1] = (rgb[1] / 255) * bright;
      col[i * 3 + 2] = (rgb[2] / 255) * bright;
      size[i] = minPx + (maxPx - minPx) * Math.pow(rnd(), 2.2) * cls[2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    const mat = makePointsMaterial(THREE, { map: tex.softDisk(32), attenuate: false, opacity: 1, minPx: 0.6, maxPx: 4 });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);
    return { group, points, mat };
  }

  _viewDistance(sys) {
    const scale = this.ctx.scale;
    if (sys.isNebula) return sys.def.sizeLy * scale.unitsPerLy * 1.8;
    let d = sys.radiusUnits * 4.5;
    if (sys.planets.length) {
      const aMax = Math.max(...sys.planets.map((p) => p.def.a));
      d = Math.max(d, scale.orbitRadius(aMax) * 2.4);
    }
    if (sys.companion) d = Math.max(d, scale.orbitRadius(sys.companion.def.separationAU) * 2.2);
    if (sys.debris) d = Math.max(d, scale.orbitRadius(sys.def.debrisDisk) * 1.6);
    return d;
  }

  _rebuildScaled(frame) {
    const { scale } = frame;
    const upl = scale.unitsPerLy;
    for (const sys of this.systems) {
      sys.pos.copy(sys.dir).multiplyScalar(sys.def.dist * upl);
      if (sys.isNebula) {
        sys.sprite.position.copy(sys.pos);
      } else {
        sys.mesh.position.copy(sys.pos);
        if (sys.hz) {
          const L = sys.def.lum;
          const inner = scale.orbitRadius(Math.sqrt(L / 1.1));
          const outer = scale.orbitRadius(Math.sqrt(L / 0.53));
          sys.hz.geometry.dispose();
          sys.hz.geometry = new this.THREE.RingGeometry(inner, outer, 128, 1);
          remapRingUv(sys.hz.geometry, inner, outer);
          sys.hz.position.copy(sys.pos);
        }
        if (sys.debris) {
          const inner = scale.orbitRadius(sys.def.debrisDisk * 0.8);
          const outer = scale.orbitRadius(sys.def.debrisDisk * 1.25);
          sys.debris.geometry.dispose();
          sys.debris.geometry = new this.THREE.RingGeometry(inner, outer, 128, 1);
          remapRingUv(sys.debris.geometry, inner, outer);
          sys.debris.position.copy(sys.pos);
        }
        for (const p of sys.planets) {
          const r = scale.orbitRadius(p.def.a);
          p.orbitR = r;
          p.orbit.scale.setScalar(r);
          p.orbit.position.copy(sys.pos);
        }
        if (sys.companion) {
          const r = scale.orbitRadius(sys.companion.def.separationAU);
          sys.companion.orbitR = r;
          sys.companion.orbit.scale.setScalar(r);
          sys.companion.orbit.position.copy(sys.pos);
        }
      }
    }
    this.nearField.group.scale.setScalar(upl);
    this.midField.group.scale.setScalar(upl);
    if (this.exoCloud) this.exoCloud.group.scale.setScalar(upl);
    this.lastUnitsPerLy = upl;
  }

  _makeProceduralSkyTexture(mode = 'dark') {
    const w = 1024;
    const h = 512;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const g = c.getContext('2d');
    const rnd = mulberry32(mode === 'light' ? 314 : 271);

    if (mode === 'light') {
      const bg = g.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#dbeafe');
      bg.addColorStop(0.5, '#f0f7ff');
      bg.addColorStop(1, '#dbeafe');
      g.fillStyle = bg;
      g.fillRect(0, 0, w, h);

      // Soft galactic band across equator
      const mw = g.createLinearGradient(0, h * 0.25, 0, h * 0.75);
      mw.addColorStop(0, 'rgba(147, 197, 253, 0)');
      mw.addColorStop(0.5, 'rgba(99, 102, 241, 0.14)');
      mw.addColorStop(1, 'rgba(147, 197, 253, 0)');
      g.fillStyle = mw;
      g.fillRect(0, 0, w, h);

      // Subtle celestial atlas grid lines
      g.strokeStyle = 'rgba(59, 130, 246, 0.14)';
      g.lineWidth = 1;
      for (let x = 0; x <= w; x += w / 12) {
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x, h);
        g.stroke();
      }
      for (let y = h / 6; y < h; y += h / 6) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(w, y);
        g.stroke();
      }

      // Star-chart dots
      for (let i = 0; i < 1800; i++) {
        const x = rnd() * w;
        const y = rnd() * h;
        const r = 0.5 + Math.pow(rnd(), 3) * 1.4;
        g.fillStyle = rnd() < 0.3 ? 'rgba(30, 64, 175, 0.48)' : 'rgba(71, 85, 105, 0.38)';
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      }
    } else {
      const bg = g.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#071026');
      bg.addColorStop(0.5, '#0d1b3e');
      bg.addColorStop(1, '#071026');
      g.fillStyle = bg;
      g.fillRect(0, 0, w, h);

      const mw = g.createLinearGradient(0, h * 0.28, 0, h * 0.72);
      mw.addColorStop(0, 'rgba(30, 58, 138, 0)');
      mw.addColorStop(0.5, 'rgba(129, 140, 248, 0.25)');
      mw.addColorStop(1, 'rgba(30, 58, 138, 0)');
      g.fillStyle = mw;
      g.fillRect(0, 0, w, h);

      for (let i = 0; i < 2600; i++) {
        const x = rnd() * w;
        const y = rnd() * h;
        const r = 0.4 + Math.pow(rnd(), 3) * 1.5;
        g.fillStyle = `rgba(226, 232, 240, ${(0.35 + rnd() * 0.6).toFixed(2)})`;
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      }
    }
    return this.ctx.tex.canvasTexture(c, { srgb: true, repeatX: true });
  }

  onThemeChange(theme) {
    const isLight = theme === 'light';
    this.skyMaterial.map = isLight ? this.lightSkyMap : this.darkSkyMap;
    this.skyMaterial.needsUpdate = true;
  }

  update(frame) {
    const { cameraPos, zoom, scale, dDays } = frame;
    const ctx = this.ctx;
    const isLight = ctx.theme === 'light';
    if (scale.changedThisFrame || this.lastUnitsPerLy !== scale.unitsPerLy) this._rebuildScaled(frame);

    // Sky dome: always active so there is never an empty black void; boosted in dark mode for rich Milky Way detail
    const wantMap = isLight ? this.lightSkyMap : this.darkSkyMap;
    if (this.skyMaterial.map !== wantMap && wantMap) {
      this.skyMaterial.map = wantMap;
      this.skyMaterial.needsUpdate = true;
    }
    if (isLight) {
      this.skyMaterial.color.setRGB(1.0, 1.0, 1.0);
    } else {
      const skyA = Math.max(0.45, 1 - 0.6 * smoothstep(68, 82, zoom));
      this.skyMaterial.color.setRGB(skyA * 1.62, skyA * 1.68, skyA * 1.88);
    }
    this.sky.visible = true;
    this.sky.position.copy(cameraPos);

    const nearLabelA = bandFade(zoom, 36, 44, 70, 76);
    const farA = bandFade(zoom, 56, 62, 82, 88);
    const focal = frame.height / 2 / Math.tan((frame.camera.fov * Math.PI) / 360);

    for (const sys of this.systems) {
      const camD = cameraPos.distanceTo(sys.pos);
      if (sys.isNebula) {
        const sizeWorld = sys.def.sizeLy * scale.unitsPerLy;
        const s = Math.max(sizeWorld, camD * (16 / focal));
        sys.sprite.scale.set(s, s, 1);
        sys.sprite.material.opacity = 0.95 * farA;
        sys.sprite.visible = farA > 0.01;
        continue;
      }
      // glow sprite: realistic-looking point source with brightness-dependent angular size
      const b = sys.brightness;
      const k = 0.0042 + 0.024 * smoothstep(-4, 3, b);
      const minWorld = sys.radiusUnits * 2.6;
      const s = Math.max(minWorld, camD * k);
      sys.sprite.position.copy(sys.pos);
      sys.sprite.scale.set(s, s, 1);
      const starA = sys.def.dist > 120 ? Math.max(farA, 1 - smoothstep(60, 76, zoom) * 0) : 1;
      // stars stay visible from any distance while the stage is active; fade with the galaxy takeover
      const stageA = sys.def.dist > 120 ? bandFade(zoom, 50, 60, 84, 90) : bandFade(zoom, 30, 40, 78, 86);
      sys.sprite.material.opacity = Math.min(1, 0.45 + 0.55 * smoothstep(-4, 3, b)) * stageA * starA;
      sys.sprite.visible = sys.sprite.material.opacity > 0.01;
      // star surface mesh + lighting uniforms
      sys.mesh.visible = camD < sys.radiusUnits * 4000;
      if (sys.mesh.visible) {
        sys.starMat.uniforms.time.value = frame.timeSeconds;
        sys.mesh.updateMatrixWorld();
        sys.starMat.uniforms.camPosL.value.copy(cameraPos);
        sys.mesh.worldToLocal(sys.starMat.uniforms.camPosL.value);
      }
      const sysSize = this._viewDistance(sys);
      const near = 1 - smoothstep(sysSize * 3, sysSize * 12, camD);
      // planets
      for (const p of sys.planets) {
        const ang = ((dDays / p.def.period) % 1) * Math.PI * 2 + p.phase;
        p.pos.set(sys.pos.x + Math.cos(ang) * p.orbitR, sys.pos.y, sys.pos.z - Math.sin(ang) * p.orbitR);
        p.body.group.position.copy(p.pos);
        p.body.group.visible = near > 0.02;
        p.orbit.material.opacity = 0.35 * near * (ctx.showOrbits ? 1 : 0);
        p.orbit.visible = p.orbit.material.opacity > 0.01;
        p.reg.alphaOverride = near;
        if (p.body.group.visible) {
          p.body.ensureTexture();
          ctx.bodies.updateBody(p.body, frame.dateMs, sys.pos, cameraPos, sys.pos);
        }
      }
      if (sys.hz) {
        sys.hz.visible = near > 0.02 && ctx.showHabitableZones;
        sys.hz.material.opacity = 0.5 * near;
      }
      if (sys.debris) {
        sys.debris.visible = near > 0.02;
        sys.debris.material.opacity = 0.22 * near;
      }
      if (sys.companion) {
        const c = sys.companion;
        const ang = ((dDays / c.def.periodDays) % 1) * Math.PI * 2;
        c.pos.set(sys.pos.x + Math.cos(ang) * c.orbitR, sys.pos.y + Math.sin(ang * 0.5) * c.orbitR * 0.08, sys.pos.z - Math.sin(ang) * c.orbitR);
        c.sprite.position.copy(c.pos);
        c.mesh.position.copy(c.pos);
        const cs = Math.max(c.radiusUnits * 2.6, camD * k * 0.7);
        c.sprite.scale.set(cs, cs, 1);
        c.sprite.material.opacity = sys.sprite.material.opacity * near;
        c.sprite.visible = c.sprite.material.opacity > 0.01;
        c.mesh.visible = near > 0.02;
        if (c.mesh.visible) {
          c.mesh.updateMatrixWorld();
          c.mesh.material.uniforms.camPosL.value.copy(cameraPos);
          c.mesh.worldToLocal(c.mesh.material.uniforms.camPosL.value);
        }
        c.orbit.material.opacity = 0.3 * near * (ctx.showOrbits ? 1 : 0);
        c.orbit.visible = c.orbit.material.opacity > 0.01;
      }
    }

    // Procedural star fields: keep nearField visible across Earth, Moon, Solar System, and Stellar scales
    const nearA = (1 - smoothstep(76, 84, zoom)) * (isLight ? 0.35 : 0.88);
    const midA = bandFade(zoom, 54, 64, 84, 92) * (isLight ? 0.35 : 1.0);
    this.nearField.mat.uniforms.uOpacity.value = nearA;
    this.nearField.mat.uniforms.uPixelRatio.value = frame.pixelRatio;
    this.nearField.group.visible = nearA > 0.01;
    this.midField.mat.uniforms.uOpacity.value = midA;
    this.midField.mat.uniforms.uPixelRatio.value = frame.pixelRatio;
    this.midField.group.visible = midA > 0.01;

    // NASA Exoplanet Archive 3D sky & Kepler cone (4,847 systems, 6,451 planets)
    if (this.exoCloud) {
      const exoA = bandFade(zoom, 42, 50, 82, 88) * (this.exoCloud.enabled ? 0.92 : 0);
      this.exoCloud.mat.uniforms.uOpacity.value = exoA;
      this.exoCloud.mat.uniforms.uPixelRatio.value = frame.pixelRatio;
      this.exoCloud.group.visible = exoA > 0.01;
    }
    void nearLabelA;
  }
}

function unitCircle(THREE, segments) {
  const pts = new Float32Array((segments + 1) * 3);
  for (let k = 0; k <= segments; k++) {
    const a = (k / segments) * Math.PI * 2;
    pts[k * 3] = Math.cos(a);
    pts[k * 3 + 1] = 0;
    pts[k * 3 + 2] = -Math.sin(a);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
  return geo;
}

function remapRingUv(geo, inner, outer) {
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const r = Math.hypot(pos.getX(i), pos.getY(i));
    uv.setXY(i, (r - inner) / (outer - inner), 0.5);
  }
  uv.needsUpdate = true;
}

function hash(id) {
  let h = 3;
  for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) % 65521;
  return h;
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function gauss(rnd) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export { LY_IN_AU };
