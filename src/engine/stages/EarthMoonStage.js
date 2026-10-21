/**
 * EarthMoonStage — photoreal Earth (NASA Blue/Black Marble, clouds, oceans, atmosphere), the Moon at
 * its true distance & phase, and the International Space Station.
 */
import {
  planetPositionAU,
  moonGeocentricKm,
  moonIlluminatedFraction,
  EARTH_RADIUS_KM,
  eqToEcl,
  eclToWorld,
  DEG,
  formatNumber
} from '../astro.js';
import { bandFade } from '../scale.js';
import { ISS } from '../../catalog/solarSystemData.js';

export class EarthMoonStage {
  constructor(ctx) {
    this.ctx = ctx;
    const { THREE, scene, bodies, tex } = ctx;
    this.THREE = THREE;

    this.earth = bodies.createEarth({
      id: 'earth',
      radius: 1,
      rotation: 'earth',
      color: '#1b4fa8',
      texture: 'earth_day_nasa_5400.jpg',
      atmosphere: { color: '#5fb0ff', scale: 1.032, strength: 1.15, falloff: 3.6 }
    });
    scene.add(this.earth.group);

    this.moon = bodies.create(
      {
        id: 'moon',
        radius: 0.2727,
        texture: 'moon_2k.jpg',
        rotation: 'moon',
        ambient: 0.006,
        exposure: 1.15,
        procedural: { kind: 'rocky', base: '#9d9d9d', accent: '#4b4b4b', craters: 1.6 }
      },
      { quality: 'hi', seed: 4 }
    );
    scene.add(this.moon.group);

    // Moon orbit (true geocentric path for the current month)
    const orbitGeo = new THREE.BufferGeometry();
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(129 * 3), 3));
    this.moonOrbit = new THREE.Line(
      orbitGeo,
      new THREE.LineBasicMaterial({ color: 0x9fb7d9, transparent: true, opacity: 0.35, depthWrite: false })
    );
    this.moonOrbit.frustumCulled = false;
    scene.add(this.moonOrbit);
    this._orbitBuiltDay = -1e9;

    // ISS sprite + orbit ring
    const issMat = new THREE.SpriteMaterial({
      map: tex.glow({ size: 64, inner: 0.2, power: 2.5 }),
      color: 0xfff6d5,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.iss = new THREE.Sprite(issMat);
    scene.add(this.iss);
    const issOrbitGeo = new THREE.BufferGeometry();
    issOrbitGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(181 * 3), 3));
    this.issOrbit = new THREE.Line(
      issOrbitGeo,
      new THREE.LineBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.22, depthWrite: false })
    );
    this.issOrbit.frustumCulled = false;
    scene.add(this.issOrbit);

    this.earthPos = new THREE.Vector3();
    this.moonPos = new THREE.Vector3();
    this.issPos = new THREE.Vector3();
    this._tmp = new THREE.Vector3();
    this._aa = [0, 0, 0];

    ctx.register('earth', {
      name: 'Earth',
      kind: 'planet',
      color: '#5aa9ff',
      priority: 10,
      getWorldPos: (o) => o.copy(this.earthPos),
      radius: () => 1,
      viewDistance: () => 4.2,
      alpha: (z) => bandFade(z, -1, 0, 50, 56),
      pick: [this.earth.mesh]
    });
    ctx.register('moon', {
      name: 'The Moon',
      kind: 'moon',
      color: '#d7dde8',
      priority: 8,
      getWorldPos: (o) => o.copy(this.moonPos),
      radius: () => 0.2727,
      viewDistance: () => 2.1,
      alpha: (z) => bandFade(z, -1, 0, 30, 36),
      pick: [this.moon.mesh]
    });
    ctx.register('iss', {
      name: 'International Space Station',
      kind: 'probe',
      color: '#fde68a',
      priority: 5,
      getWorldPos: (o) => o.copy(this.issPos),
      radius: () => 0,
      viewDistance: () => 0.6,
      alpha: (z) => bandFade(z, -1, 0, 16, 22)
    });
  }

  update(frame) {
    const { dateMs, cameraPos, scale } = frame;
    const ctx = this.ctx;
    // Earth heliocentric position (real Kepler ephemeris) → display units
    const e = planetPositionAU('earth', dateMs);
    scale.orbitVector(e, this._aa);
    this.earthPos.set(this._aa[0], this._aa[1], this._aa[2]);
    this.earth.group.position.copy(this.earthPos);

    // Moon (true distance, in Earth radii)
    const m = moonGeocentricKm(dateMs);
    this.moonPos.set(m[0], m[1], m[2]).multiplyScalar(1 / EARTH_RADIUS_KM).add(this.earthPos);
    this.moon.group.position.copy(this.moonPos);

    // ISS: circular orbit in Earth's equatorial frame (inclination 51.6°, period 92.9 min)
    const minutes = (dateMs - Date.UTC(2026, 0, 1)) / 60000;
    const theta = ((minutes / ISS.periodMinutes) % 1) * Math.PI * 2;
    const raan = ((minutes / 1440) * ISS.raanDriftDegPerDay * DEG) % (Math.PI * 2);
    const r = 1 + ISS.altitudeKm / EARTH_RADIUS_KM;
    const inc = ISS.inclinationDeg * DEG;
    const x0 = r * Math.cos(theta);
    const y0 = r * Math.sin(theta) * Math.cos(inc);
    const z0 = r * Math.sin(theta) * Math.sin(inc);
    const xe = x0 * Math.cos(raan) - y0 * Math.sin(raan);
    const ye = x0 * Math.sin(raan) + y0 * Math.cos(raan);
    const w = eclToWorld(eqToEcl([xe, ye, z0]));
    this.issPos.set(w[0], w[1], w[2]).add(this.earthPos);
    this.iss.position.copy(this.issPos);
    const camDistIss = cameraPos.distanceTo(this.issPos);
    const issScale = Math.max(0.0025, camDistIss * 0.0045);
    this.iss.scale.set(issScale, issScale, 1);
    this.iss.material.opacity = bandFade(frame.zoom, -1, 0, 16, 22);
    this.iss.visible = this.iss.material.opacity > 0.01;

    // ISS orbit ring (rebuilt every frame; 181 points)
    const pos = this.issOrbit.geometry.attributes.position;
    for (let k = 0; k <= 180; k++) {
      const th = (k / 180) * Math.PI * 2;
      const ax = r * Math.cos(th);
      const ay = r * Math.sin(th) * Math.cos(inc);
      const az = r * Math.sin(th) * Math.sin(inc);
      const bx = ax * Math.cos(raan) - ay * Math.sin(raan);
      const by = ax * Math.sin(raan) + ay * Math.cos(raan);
      const ww = eclToWorld(eqToEcl([bx, by, az]));
      pos.setXYZ(k, ww[0] + this.earthPos.x, ww[1] + this.earthPos.y, ww[2] + this.earthPos.z);
    }
    pos.needsUpdate = true;
    this.issOrbit.material.opacity = 0.22 * bandFade(frame.zoom, -1, 0, 14, 20) * (ctx.showOrbits ? 1 : 0);
    this.issOrbit.visible = this.issOrbit.material.opacity > 0.01;

    // Moon orbit path (rebuild once per simulated day)
    if (Math.abs(frame.dDays - this._orbitBuiltDay) > 0.5) {
      this._orbitBuiltDay = frame.dDays;
      const mp = this.moonOrbit.geometry.attributes.position;
      for (let k = 0; k <= 128; k++) {
        const t = dateMs + ((k / 128) * 27.321661 - 13.66) * 86400000;
        const mm = moonGeocentricKm(t);
        mp.setXYZ(k, mm[0] / EARTH_RADIUS_KM, mm[1] / EARTH_RADIUS_KM, mm[2] / EARTH_RADIUS_KM);
      }
      mp.needsUpdate = true;
    }
    this.moonOrbit.position.copy(this.earthPos);
    this.moonOrbit.material.opacity = 0.35 * bandFade(frame.zoom, 4, 9, 30, 36) * (ctx.showOrbits ? 1 : 0);
    this.moonOrbit.visible = this.moonOrbit.material.opacity > 0.01;

    // Orientation + lighting (Sun at the origin)
    ctx.bodies.updateBody(this.earth, dateMs, ctx.sunPos, cameraPos);
    ctx.bodies.updateBody(this.moon, dateMs, ctx.sunPos, cameraPos, this.earthPos);

    if (frame.tick % 30 === 0) {
      const dKm = this.moonPos.distanceTo(this.earthPos) * EARTH_RADIUS_KM;
      const illum = Math.round(moonIlluminatedFraction(dateMs) * 100);
      ctx.labels.setSub('moon', `${formatNumber(dKm)} km away • ${illum}% lit`);
      ctx.labels.setSub('iss', `${ISS.altitudeKm} km up • 27,600 km/h`);
    }
  }
}
