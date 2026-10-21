/**
 * SolarSystemStage — the Sun, planets, major moons, dwarf planets, Halley's comet, asteroid &
 * Kuiper belts, Jupiter's Trojans, the heliosphere, and Voyager 1 & 2 with their real flyby paths.
 * All positions come from real orbital elements for the simulated date.
 */
import {
  planetPositionAU,
  bodyPositionAU,
  orbitPathAU,
  worldFromRaDec,
  worldFromEclLonLat,
  bodyBasis,
  BODY_ROTATION,
  AU_KM,
  formatNumber,
  LIGHT_SPEED_KM_S
} from '../astro.js';
import { bandFade, smoothstep } from '../scale.js';
import { makeSunMaterial, makePointsMaterial, makeHeliosphereMaterial } from '../shaders.js';
import { mulberry32 } from '../textures.js';
import { SUN, PLANETS, DWARF_PLANETS, COMETS, VOYAGERS, ROADSTER, HELIOSPHERE } from '../../catalog/solarSystemData.js';

const VOYAGER_EPOCH = Date.UTC(2026, 0, 1);
const VOYAGER_MOTION = {
  voyager1: { baseAU: 166.4, auPerDay: (16.999 * 86400) / AU_KM, kmS: 16.999 },
  voyager2: { baseAU: 139.1, auPerDay: (15.374 * 86400) / AU_KM, kmS: 15.374 }
};

export function voyagerDistanceAU(id, dateMs) {
  const m = VOYAGER_MOTION[id];
  return m.baseAU + ((dateMs - VOYAGER_EPOCH) / 86400000) * m.auPerDay;
}

export class SolarSystemStage {
  constructor(ctx) {
    this.ctx = ctx;
    const { THREE, scene, bodies, tex } = ctx;
    this.THREE = THREE;
    this._aa = [0, 0, 0];
    this._v = new THREE.Vector3();
    this._v2 = new THREE.Vector3();
    this._v3 = new THREE.Vector3();
    this._bx = new THREE.Vector3();
    this._by = new THREE.Vector3();
    this._bz = new THREE.Vector3();
    this._m = new THREE.Matrix4();
    this.orbitVersion = -1;

    // ---------------- Sun
    this.sunMaterial = makeSunMaterial(THREE, {
      map: tex.planet({ kind: 'gas', base: '#ffb347', accent: '#ff7a1a', bands: 1 }, 9),
      intensity: 2.4
    });
    tex.load('sun_2k.jpg').then((t) => {
      if (t) this.sunMaterial.uniforms.map.value = t;
    });
    this.sun = new THREE.Mesh(bodies.sphereHi, this.sunMaterial);
    this.sun.scale.setScalar(SUN.radius);
    scene.add(this.sun);
    const corona = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: tex.corona(),
        color: 0xffd9a3,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.9
      })
    );
    corona.scale.setScalar(SUN.radius * 9);
    scene.add(corona);
    this.corona = corona;
    this.sunLight = new THREE.PointLight(0xfff3e0, 2.4, 0, 0);
    scene.add(this.sunLight);
    this.ambientLight = new THREE.AmbientLight(0x334155, 0.22);
    scene.add(this.ambientLight);

    ctx.register('sun', {
      stage: 1,
      name: 'The Sun',
      kind: 'star',
      color: '#ffd166',
      priority: 9,
      getWorldPos: (o) => o.set(0, 0, 0),
      radius: () => SUN.radius,
      viewDistance: () => SUN.radius * 4.2,
      alpha: (z) => bandFade(z, 14, 20, 74, 80),
      pick: [this.sun]
    });

    // ---------------- Planets, moons, dwarf planets, comet
    this.bodies = [];
    const makeBody = (spec, extra) => {
      const b = bodies.create(spec, { quality: spec.radius > 2 ? 'hi' : 'mid', seed: hashId(spec.id) });
      scene.add(b.group);
      const entry = { body: b, spec, pos: new THREE.Vector3(), ...extra };
      this.bodies.push(entry);
      return entry;
    };

    for (const p of PLANETS) {
      if (p.id === 'earth') continue;
      const entry = makeBody(p, { kind: 'planet', orbitId: p.id });
      ctx.register(p.id, {
        stage: 1,
        name: p.name,
        kind: 'planet',
        color: p.color,
        priority: 6 + Math.min(3, p.radius / 4),
        getWorldPos: (o) => o.copy(entry.pos),
        radius: () => p.radius * (p.rings ? p.rings.outer : 1),
        viewDistance: () => p.radius * (p.rings ? 7.5 : 4.6),
        alpha: (z) => bandFade(z, 12, 18, 50, 56),
        pick: [entry.body.mesh]
      });
      if (p.moons) {
        for (const m of p.moons) {
          const mb = makeBody({ ...m, faceParent: true, ambient: 0.008 }, { kind: 'moon', parent: entry, moonSpec: m });
          const ringGeo = new THREE.BufferGeometry();
          ringGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(97 * 3), 3));
          const ring = new THREE.Line(
            ringGeo,
            new THREE.LineBasicMaterial({ color: 0x8fa3c7, transparent: true, opacity: 0.3, depthWrite: false })
          );
          ring.frustumCulled = false;
          scene.add(ring);
          mb.ring = ring;
          mb.reg = ctx.register(m.id, {
            stage: 1,
            name: m.name,
            kind: 'moon',
            color: m.color,
            priority: 3,
            getWorldPos: (o) => o.copy(mb.pos),
            radius: () => m.radius,
            viewDistance: () => m.radius * 5,
            alpha: () => 0,
            alphaOverride: 0,
            pick: [mb.body.mesh]
          });
        }
      }
    }
    for (const d of DWARF_PLANETS) {
      const entry = makeBody(d, { kind: 'dwarf', orbitId: d.id });
      ctx.register(d.id, {
        stage: 1,
        name: d.name,
        kind: 'dwarf',
        color: d.color,
        priority: 4,
        getWorldPos: (o) => o.copy(entry.pos),
        radius: () => d.radius,
        viewDistance: () => d.radius * 5,
        alpha: (z) => bandFade(z, 20, 26, 50, 56),
        pick: [entry.body.mesh]
      });
    }
    for (const c of COMETS) {
      const entry = makeBody(
        { ...c, procedural: { kind: 'icy', base: '#cfd8e3', accent: '#55606e', craters: 0.8 } },
        { kind: 'comet', orbitId: c.id }
      );
      ctx.register(c.id, {
        stage: 1,
        name: c.name,
        kind: 'comet',
        color: c.color,
        priority: 3,
        getWorldPos: (o) => o.copy(entry.pos),
        radius: () => c.radius,
        viewDistance: () => 3,
        alpha: (z) => bandFade(z, 24, 30, 48, 54)
      });
    }

    // ---------------- Orbit lines
    this.orbitLines = [];
    const orbitIds = [...PLANETS.map((p) => p.id), ...DWARF_PLANETS.map((d) => d.id), ...COMETS.map((c) => c.id), 'roadster'];
    for (const id of orbitIds) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(257 * 3), 3));
      const darkColor = id === 'roadster' ? 0xf43f5e : id === 'halley' ? 0x7dd3fc : id === 'pluto' || id === 'eris' ? 0xb8a9d9 : 0x9fb3cf;
      const lightColor = id === 'roadster' ? 0xe11d48 : id === 'halley' ? 0x0284c7 : id === 'pluto' || id === 'eris' ? 0x6d28d9 : 0x1d4ed8;
      const baseOpacity = id === 'roadster' ? 0.72 : 0.36;
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: darkColor, transparent: true, opacity: baseOpacity, depthWrite: false }));
      line.frustumCulled = false;
      scene.add(line);
      this.orbitLines.push({ id, line, baseOpacity, darkColor, lightColor });
    }

    // ---------------- Starman's Tesla Roadster (Mars-crossing heliocentric orbit)
    this.roadster = this._makeRoadster();

    // ---------------- Belts (Points)
    this.belts = [
      this._makeBelt('asteroidBelt', 6500, 11, (rnd) => ({ a: 2.1 + Math.pow(rnd(), 0.9) * 1.25, inc: gauss(rnd) * 6 }), [0.82, 0.8, 0.76], 1.0),
      this._makeBelt(
        'kuiperBelt',
        9000,
        23,
        (rnd) => ({ a: rnd() < 0.85 ? 30 + rnd() * 20 : 50 + Math.pow(rnd(), 2) * 60, inc: gauss(rnd) * 9 }),
        [0.72, 0.8, 0.95],
        1.4
      ),
      this._makeBelt(
        'trojans',
        2400,
        37,
        (rnd) => ({ a: 5.2 + gauss(rnd) * 0.22, inc: gauss(rnd) * 8, trojan: rnd() < 0.5 ? 1 : -1, spread: gauss(rnd) * 14, node: gauss(rnd) * 0.25 }),
        [0.75, 0.72, 0.68],
        1.2
      )
    ];

    ctx.register('asteroidBelt', {
      stage: 1,
      name: 'Asteroid Belt',
      kind: 'poi',
      color: '#cbd5e1',
      priority: 2,
      getWorldPos: (o) => {
        const d = worldFromEclLonLat(200, 0);
        const r = ctx.scale.orbitRadius(2.7);
        return o.set(d[0] * r, d[1] * r, d[2] * r);
      },
      radius: () => 0,
      viewDistance: () => ctx.scale.orbitRadius(2.7) * 1.4,
      alpha: (z) => bandFade(z, 24, 29, 42, 47)
    });
    ctx.register('kuiperBelt', {
      stage: 1,
      name: 'Kuiper Belt',
      kind: 'poi',
      color: '#bfdbfe',
      priority: 2,
      getWorldPos: (o) => {
        const d = worldFromEclLonLat(120, 0);
        const r = ctx.scale.orbitRadius(42);
        return o.set(d[0] * r, d[1] * r, d[2] * r);
      },
      radius: () => 0,
      viewDistance: () => ctx.scale.orbitRadius(42) * 1.6,
      alpha: (z) => bandFade(z, 30, 35, 46, 51)
    });

    // ---------------- Heliosphere
    this.helioGroup = new THREE.Group();
    scene.add(this.helioGroup);
    this.heliopause = new THREE.Mesh(bodies.sphereMid, makeHeliosphereMaterial(THREE, { color: '#38bdf8', opacity: 0.3 }));
    this.terminationShock = new THREE.Mesh(bodies.sphereMid, makeHeliosphereMaterial(THREE, { color: '#f59e0b', opacity: 0.12 }));
    this.helioGroup.add(this.heliopause);
    this.helioGroup.add(this.terminationShock);
    const nose = worldFromEclLonLat(HELIOSPHERE.noseEclLon, HELIOSPHERE.noseEclLat);
    this.noseDir = new THREE.Vector3(nose[0], nose[1], nose[2]);
    this.helioGroup.lookAt(this.noseDir);
    this.helioGroup.renderOrder = 5;
    ctx.register('heliopause', {
      stage: 1,
      name: 'Heliopause — edge of the Sun’s bubble',
      kind: 'poi',
      color: '#38bdf8',
      priority: 4,
      getWorldPos: (o) => o.copy(this.noseDir).multiplyScalar(ctx.scale.orbitRadius(HELIOSPHERE.heliopauseNoseAU)),
      radius: () => 0,
      viewDistance: () => ctx.scale.orbitRadius(HELIOSPHERE.heliopauseNoseAU) * 2.4,
      alpha: (z) => bandFade(z, 30, 36, 48, 54)
    });

    // ---------------- Voyagers
    this.voyagers = [];
    for (const v of VOYAGERS) {
      const dir = worldFromRaDec(v.ra, v.dec);
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tex.glow({ size: 64, inner: 0.25, power: 2.2, spikes: 2 }),
          color: new THREE.Color(v.color),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      scene.add(sprite);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(241 * 3), 3));
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: new THREE.Color(v.color), transparent: true, opacity: 0.75, depthWrite: false })
      );
      line.frustumCulled = false;
      scene.add(line);
      const entry = { def: v, dir: new THREE.Vector3(dir[0], dir[1], dir[2]), sprite, line, pos: new THREE.Vector3(), builtDay: -1e9 };
      this.voyagers.push(entry);
      ctx.register(v.id, {
        stage: 1,
        name: v.name,
        kind: 'probe',
        color: v.color,
        priority: 7,
        getWorldPos: (o) => o.copy(entry.pos),
        radius: () => 0,
        viewDistance: () => ctx.scale.orbitRadius(voyagerDistanceAU(v.id, ctx.state.dateMs)) * 2.3,
        // Camera ~60° off the Sun→probe line, on the probe's side of the ecliptic (Voyager 1 flies
        // north, Voyager 2 south), so the probe is clearly outside the heliosphere bubble while the
        // Sun and the planets' orbits stay in frame.
        preferredView: () => ({ yaw: Math.atan2(entry.dir.x, entry.dir.z) + 1.2, pitch: entry.dir.y < 0 ? -0.5 : 0.5 }),
        alpha: (z) => bandFade(z, 22, 28, 50, 56)
      });
    }
  }

  onThemeChange(theme) {
    const isLight = theme === 'light';
    if (this.ambientLight) {
      this.ambientLight.intensity = isLight ? 0.85 : 0.22;
      this.ambientLight.color.setHex(isLight ? 0x94a3b8 : 0x334155);
    }
    for (const o of this.orbitLines) {
      o.line.material.color.setHex(isLight ? o.lightColor : o.darkColor);
      o.baseOpacity = o.id === 'roadster' ? (isLight ? 0.85 : 0.72) : isLight ? 0.55 : 0.36;
    }
    for (const v of this.voyagers) {
      v.line.material.color.setHex(isLight ? (v.def.id === 'voyager1' ? 0x0284c7 : 0x7c3aed) : new this.THREE.Color(v.def.color).getHex());
    }
  }

  _makeRoadster() {
    const { THREE, scene, tex, register } = this.ctx;
    const group = new THREE.Group();
    scene.add(group);

    // Build a stylized 3D Falcon Heavy upper stage + Midnight Cherry Tesla Roadster + Starman
    const carGroup = new THREE.Group();
    group.add(carGroup);

    const cherryMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.25, metalness: 0.6, emissive: 0x4c0519, emissiveIntensity: 0.35 });
    const stageMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.3, emissive: 0x1e293b, emissiveIntensity: 0.25 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.5 });
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.9, emissive: 0x0284c7, emissiveIntensity: 0.5 });

    // Falcon Heavy upper stage cylinder behind the adapter
    const upperStage = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.7, 20), stageMat);
    upperStage.rotation.z = Math.PI / 2;
    upperStage.position.set(-0.55, 0, 0);
    carGroup.add(upperStage);

    // Payload adapter cone
    const adapter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.22, 20), darkMat);
    adapter.rotation.z = Math.PI / 2;
    adapter.position.set(-0.12, 0, 0);
    carGroup.add(adapter);

    // Cherry red Roadster sports body
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.28), cherryMat);
    chassis.position.set(0.22, 0.02, 0);
    carGroup.add(chassis);

    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.26), cherryMat);
    hood.position.set(0.42, 0.08, 0);
    carGroup.add(hood);

    // Windshield
    const windshield = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, 0.24),
      new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.65, roughness: 0.1 })
    );
    windshield.rotation.z = -0.45;
    windshield.position.set(0.28, 0.13, 0);
    carGroup.add(windshield);

    // 4 wheels
    const wheelGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.04, 16);
    wheelGeo.rotateX(Math.PI / 2);
    for (const [wx, wz] of [[0.38, 0.15], [0.38, -0.15], [0.06, 0.15], [0.06, -0.15]]) {
      const w = new THREE.Mesh(wheelGeo, darkMat);
      w.position.set(wx, -0.03, wz);
      carGroup.add(w);
    }

    // Starman astronaut in driver seat
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(0.045, 0.08, 8, 12) : new THREE.SphereGeometry(0.055, 12, 12), stageMat);
    torso.position.set(0.18, 0.14, -0.05);
    carGroup.add(torso);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.048, 16, 16), stageMat);
    helmet.position.set(0.18, 0.23, -0.05);
    carGroup.add(helmet);
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 12), visorMat);
    visor.position.set(0.2, 0.235, -0.05);
    carGroup.add(visor);

    // Glowing beacon sprite for solar system scale
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: tex.glow({ size: 64, inner: 0.25, power: 2.0, spikes: 2 }),
        color: new THREE.Color(ROADSTER.color),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(sprite);

    const pos = new THREE.Vector3();
    const pickMesh = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 12), new THREE.MeshBasicMaterial({ visible: false }));
    carGroup.add(pickMesh);

    register('roadster', {
      stage: 1,
      name: ROADSTER.name,
      kind: 'probe',
      color: ROADSTER.color,
      priority: 6.8,
      getWorldPos: (o) => o.copy(pos),
      radius: () => 0.45,
      viewDistance: () => this.ctx.scale.orbitRadius(1.55) * 1.45,
      preferredView: () => ({ yaw: Math.atan2(pos.x, pos.z) + 0.65, pitch: 0.55 }),
      alpha: (z) => bandFade(z, 14, 20, 48, 54),
      pick: [pickMesh, chassis]
    });

    return { group, carGroup, sprite, pos, distAU: 1.32, distEarthAU: 1.0, speedKmS: 25.0 };
  }

  _makeBelt(id, count, seed, sampler, rgb, sizePx) {
    const { THREE, scene, tex } = this.ctx;
    const rnd = mulberry32(seed);
    const items = new Array(count);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const s = sampler(rnd);
      items[i] = {
        a: s.a,
        inc: (s.inc * Math.PI) / 180,
        node: s.node !== undefined ? s.node : rnd() * Math.PI * 2,
        phase: rnd() * Math.PI * 2,
        trojan: s.trojan || 0,
        spread: ((s.spread || 0) * Math.PI) / 180,
        n: (2 * Math.PI) / (365.25 * Math.pow(s.a, 1.5))
      };
      const shade = 0.75 + rnd() * 0.5;
      colors[i * 3] = rgb[0] * shade;
      colors[i * 3 + 1] = rgb[1] * shade;
      colors[i * 3 + 2] = rgb[2] * shade;
      sizes[i] = sizePx * (0.7 + rnd() * 0.8);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    const mat = makePointsMaterial(THREE, { map: tex.softDisk(32), attenuate: false, opacity: 0.85, minPx: 0.8, maxPx: 3 });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);
    return { id, items, points, geo, mat };
  }

  _updateBelt(belt, frame, jupiterLon) {
    const pos = belt.geo.attributes.position.array;
    const { scale } = frame;
    const t = frame.dDays;
    const aa = this._aa;
    for (let i = 0; i < belt.items.length; i++) {
      const it = belt.items[i];
      const lon = it.trojan ? jupiterLon + it.trojan * (Math.PI / 3) + it.spread - it.node : it.phase + it.n * t;
      const xp = Math.cos(lon) * it.a;
      const yp = Math.sin(lon) * it.a;
      const yt = yp * Math.cos(it.inc);
      const zt = yp * Math.sin(it.inc);
      const cn = Math.cos(it.node);
      const sn = Math.sin(it.node);
      const xe = xp * cn - yt * sn;
      const ye = xp * sn + yt * cn;
      aa[0] = xe;
      aa[1] = zt;
      aa[2] = -ye;
      scale.orbitVector(aa, aa);
      pos[i * 3] = aa[0];
      pos[i * 3 + 1] = aa[1];
      pos[i * 3 + 2] = aa[2];
    }
    belt.geo.attributes.position.needsUpdate = true;
  }

  _rebuildOrbits(frame) {
    const { scale, dateMs } = frame;
    const aa = this._aa;
    for (const { id, line } of this.orbitLines) {
      const pts = orbitPathAU(id, dateMs, 256);
      const attr = line.geometry.attributes.position;
      for (let k = 0; k < pts.length; k++) {
        scale.orbitVector(pts[k], aa);
        attr.setXYZ(k, aa[0], aa[1], aa[2]);
      }
      attr.needsUpdate = true;
    }
    const R = scale.orbitRadius(HELIOSPHERE.heliopauseNoseAU);
    this.heliopause.scale.set(R, R, R * 1.4);
    this.heliopause.position.set(0, 0, -R * 0.3);
    const Rt = scale.orbitRadius(HELIOSPHERE.terminationShockAU);
    this.terminationShock.scale.set(Rt, Rt, Rt * 1.15);
    this.terminationShock.position.set(0, 0, -Rt * 0.1);
  }

  _rebuildVoyagerPath(entry, frame) {
    const { scale, dateMs } = frame;
    const v = entry.def;
    const ptsAU = [planetPositionAU('earth', v.launch)];
    for (const f of v.flybys) ptsAU.push(planetPositionAU(f.body, f.date));
    const dist = voyagerDistanceAU(v.id, dateMs);
    const nowAU = [entry.dir.x * dist, entry.dir.y * dist, entry.dir.z * dist];
    const last = ptsAU[ptsAU.length - 1];
    for (const f of [0.08, 0.25, 0.5, 0.75]) {
      ptsAU.push([last[0] + (nowAU[0] - last[0]) * f, last[1] + (nowAU[1] - last[1]) * f, last[2] + (nowAU[2] - last[2]) * f]);
    }
    ptsAU.push(nowAU);
    const THREE = this.THREE;
    const curve = new THREE.CatmullRomCurve3(
      ptsAU.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      false,
      'centripetal',
      0.5
    );
    const samples = curve.getPoints(240);
    const attr = entry.line.geometry.attributes.position;
    const aa = this._aa;
    for (let k = 0; k < samples.length; k++) {
      aa[0] = samples[k].x;
      aa[1] = samples[k].y;
      aa[2] = samples[k].z;
      scale.orbitVector(aa, aa);
      attr.setXYZ(k, aa[0], aa[1], aa[2]);
    }
    attr.needsUpdate = true;
    entry.builtDay = frame.dDays;
  }

  update(frame) {
    const { dateMs, cameraPos, scale, zoom } = frame;
    const ctx = this.ctx;
    const aa = this._aa;
    const showOrbits = ctx.showOrbits;

    // Sun orientation, surface animation, corona
    const sb = bodyBasis(BODY_ROTATION.sun, dateMs);
    this._bx.set(sb.x[0], sb.x[1], sb.x[2]);
    this._by.set(sb.y[0], sb.y[1], sb.y[2]);
    this._bz.set(sb.z[0], sb.z[1], sb.z[2]);
    this._m.makeBasis(this._bx, this._by, this._bz);
    this.sun.quaternion.setFromRotationMatrix(this._m);
    this.sunMaterial.uniforms.time.value = frame.timeSeconds;
    this.sun.updateMatrixWorld();
    this.sunMaterial.uniforms.camPosL.value.copy(cameraPos);
    this.sun.worldToLocal(this.sunMaterial.uniforms.camPosL.value);
    const camDistSun = cameraPos.length();
    const coronaScale = Math.max(SUN.radius * 7, camDistSun * 0.045);
    this.corona.scale.set(coronaScale, coronaScale, 1);
    this.corona.material.opacity = 0.5 + 0.4 * smoothstep(0, 1, Math.min(1, camDistSun / (SUN.radius * 40)));

    // Orbits & other scale-dependent geometry
    if (scale.changedThisFrame || this.orbitVersion !== ctx.orbitVersion) {
      this._rebuildOrbits(frame);
      this.orbitVersion = ctx.orbitVersion;
      for (const v of this.voyagers) v.builtDay = -1e9;
    }
    const orbitAlpha = bandFade(zoom, 16, 22, 48, 56) * (showOrbits ? 1 : 0);
    for (const { line, baseOpacity } of this.orbitLines) {
      line.material.opacity = (baseOpacity || 0.28) * orbitAlpha;
      line.visible = line.material.opacity > 0.01;
    }

    // Starman's Tesla Roadster (heliocentric Mars-crossing orbit)
    if (this.roadster) {
      const rAU = bodyPositionAU('roadster', dateMs);
      const eAU = planetPositionAU('earth', dateMs);
      const rSunAU = Math.hypot(rAU[0], rAU[1], rAU[2]);
      const rEarthAU = Math.hypot(rAU[0] - eAU[0], rAU[1] - eAU[1], rAU[2] - eAU[2]);
      // Vis-viva equation: v = 29.7847 * sqrt(2/r - 1/a) km/s
      const vKmS = 29.7847 * Math.sqrt(Math.max(0.05, 2 / rSunAU - 1 / ROADSTER.semiMajorAU));
      this.roadster.distAU = rSunAU;
      this.roadster.distEarthAU = rEarthAU;
      this.roadster.speedKmS = vKmS;
      scale.orbitVector(rAU, aa);
      this.roadster.pos.set(aa[0], aa[1], aa[2]);
      this.roadster.group.position.copy(this.roadster.pos);
      this.roadster.sprite.position.copy(this.roadster.pos);

      const roadA = bandFade(zoom, 12, 18, 48, 54);
      const camD = cameraPos.distanceTo(this.roadster.pos);
      const spScale = Math.max(0.04, camD * 0.014);
      this.roadster.sprite.scale.set(spScale, spScale, 1);
      this.roadster.sprite.material.opacity = roadA;
      this.roadster.sprite.visible = roadA > 0.01;

      const carScale = Math.max(0.6, Math.min(28, camD * 0.032));
      this.roadster.carGroup.scale.setScalar(carScale);
      this.roadster.carGroup.rotation.y = frame.timeSeconds * 0.35;
      this.roadster.carGroup.rotation.x = Math.sin(frame.timeSeconds * 0.22) * 0.18;
      this.roadster.group.visible = roadA > 0.01;

      if (frame.tick % 20 === 0) {
        const earthMkm = (rEarthAU * AU_KM) / 1e6;
        ctx.labels.setSub(
          'roadster',
          `${rSunAU.toFixed(2)} AU from Sun • ${earthMkm.toFixed(1)}M km from Earth • ${vKmS.toFixed(1)} km/s`
        );
      }
    }

    // Planets / dwarf planets / comet
    let jupiterLon = 0;
    for (const entry of this.bodies) {
      if (entry.kind === 'moon') continue;
      const pAU = bodyPositionAU(entry.orbitId, dateMs);
      if (entry.orbitId === 'jupiter') jupiterLon = Math.atan2(-pAU[2], pAU[0]);
      scale.orbitVector(pAU, aa);
      entry.pos.set(aa[0], aa[1], aa[2]);
      entry.body.group.position.copy(entry.pos);
      ctx.bodies.updateBody(entry.body, dateMs, ctx.sunPos, cameraPos);
      entry.distAU = Math.hypot(pAU[0], pAU[1], pAU[2]);
    }

    // Moons: circular orbits in the planet's equatorial plane
    for (const entry of this.bodies) {
      if (entry.kind !== 'moon') continue;
      const parent = entry.parent;
      const b = bodyBasis(BODY_ROTATION[parent.spec.rotation], 0);
      const ex = this._v.set(b.x[0], b.x[1], b.x[2]);
      const ey = this._v2.set(b.y[0], b.y[1], b.y[2]);
      const ez = this._v3.crossVectors(ex, ey);
      const m = entry.moonSpec;
      const ang = ((frame.dDays / m.periodDays) % 1) * Math.PI * 2 + hashId(m.id) * 0.001;
      const r = m.orbitPlanetRadii * parent.spec.radius;
      entry.pos.copy(parent.pos).addScaledVector(ex, Math.cos(ang) * r).addScaledVector(ez, Math.sin(ang) * r);
      entry.body.group.position.copy(entry.pos);
      ctx.bodies.updateBody(entry.body, dateMs, ctx.sunPos, cameraPos, parent.pos);
      const attr = entry.ring.geometry.attributes.position;
      for (let k = 0; k <= 96; k++) {
        const th = (k / 96) * Math.PI * 2;
        const c = Math.cos(th) * r;
        const s = Math.sin(th) * r;
        attr.setXYZ(k, parent.pos.x + ex.x * c + ez.x * s, parent.pos.y + ex.y * c + ez.y * s, parent.pos.z + ex.z * c + ez.z * s);
      }
      attr.needsUpdate = true;
      const camToParent = cameraPos.distanceTo(parent.pos);
      const near = 1 - smoothstep(r * 6, r * 20, camToParent);
      entry.ring.material.opacity = 0.3 * near * (showOrbits ? 1 : 0);
      entry.ring.visible = entry.ring.material.opacity > 0.01;
      entry.reg.alphaOverride = near;
    }

    // Belts
    for (const belt of this.belts) {
      const a =
        belt.id === 'trojans'
          ? bandFade(zoom, 22, 27, 44, 50)
          : belt.id === 'asteroidBelt'
            ? bandFade(zoom, 18, 24, 46, 52)
            : bandFade(zoom, 26, 32, 48, 54);
      belt.mat.uniforms.uOpacity.value = (belt.id === 'asteroidBelt' ? 0.5 : 0.7) * a;
      belt.mat.uniforms.uPixelRatio.value = frame.pixelRatio;
      belt.points.visible = a > 0.01;
      if (belt.points.visible) this._updateBelt(belt, frame, jupiterLon);
    }

    // Heliosphere
    const helioA = bandFade(zoom, 30, 36, 50, 56);
    this.helioGroup.visible = helioA > 0.01;
    this.heliopause.material.uniforms.opacity.value = 0.3 * helioA;
    this.terminationShock.material.uniforms.opacity.value = 0.12 * helioA;
    if (this.helioGroup.visible) {
      for (const mesh of [this.heliopause, this.terminationShock]) {
        mesh.updateMatrixWorld();
        mesh.material.uniforms.camPosL.value.copy(cameraPos);
        mesh.worldToLocal(mesh.material.uniforms.camPosL.value);
      }
    }

    // Voyagers
    const voyA = bandFade(zoom, 20, 26, 52, 58);
    for (const v of this.voyagers) {
      const dist = voyagerDistanceAU(v.def.id, dateMs);
      v.pos.copy(v.dir).multiplyScalar(scale.orbitRadius(dist));
      v.sprite.position.copy(v.pos);
      const camD = cameraPos.distanceTo(v.pos);
      const s = Math.max(0.02, camD * 0.012);
      v.sprite.scale.set(s, s, 1);
      v.sprite.material.opacity = voyA;
      v.sprite.visible = voyA > 0.01;
      v.line.material.opacity = 0.75 * voyA * (showOrbits ? 1 : 0.35);
      v.line.visible = v.line.material.opacity > 0.01;
      if (Math.abs(frame.dDays - v.builtDay) > 2) this._rebuildVoyagerPath(v, frame);
      if (frame.tick % 20 === 0) {
        const km = dist * AU_KM;
        const lightHours = km / LIGHT_SPEED_KM_S / 3600;
        ctx.labels.setSub(v.def.id, `${dist.toFixed(2)} AU • ${formatNumber(km / 1e9, 2)} billion km • radio ${lightHours.toFixed(1)} h`);
      }
    }

    if (frame.tick % 45 === 0) {
      for (const entry of this.bodies) {
        if (entry.kind === 'moon' || !entry.distAU) continue;
        ctx.labels.setSub(entry.spec.id, `${entry.distAU.toFixed(2)} AU from the Sun`);
      }
      ctx.labels.setSub('sun', 'Our star • sunlight takes 8 min 20 s to reach Earth');
    }
  }
}

function hashId(id) {
  let h = 7;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100003;
  return h;
}

function gauss(rnd) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
