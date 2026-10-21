/**
 * bodies.js — builds textured, physically-lit spherical bodies (planets, moons, exoplanets) with
 * optional atmosphere shells, rings and ring shadows, and keeps their orientation & lighting updated.
 */
import { bodyBasis, BODY_ROTATION } from './astro.js';
import { makePlanetMaterial, makeAtmosphereMaterial, makeRingMaterial } from './shaders.js';

export class BodyFactory {
  constructor(THREE, tex) {
    this.THREE = THREE;
    this.tex = tex;
    this.sphereHi = new THREE.SphereGeometry(1, 128, 64);
    this.sphereMid = new THREE.SphereGeometry(1, 64, 32);
    this.sphereLow = new THREE.SphereGeometry(1, 32, 16);
    this._dir = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this._m = new THREE.Matrix4();
    this._bx = new THREE.Vector3();
    this._by = new THREE.Vector3();
    this._bz = new THREE.Vector3();
    this.black = this._solid(0, 0, 0);
  }

  _solid(r, g, b) {
    const THREE = this.THREE;
    const data = new Uint8Array([r, g, b, 255]);
    const t = new THREE.DataTexture(data, 1, 1);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }

  _solidHex(hex) {
    this._solids = this._solids || new Map();
    if (!this._solids.has(hex)) {
      const h = hex.replace('#', '');
      const n = parseInt(h.length === 3 ? h.split('').map((x) => x + x).join('') : h, 16);
      this._solids.set(hex, this._solid((n >> 16) & 255, (n >> 8) & 255, n & 255));
    }
    return this._solids.get(hex);
  }

  /**
   * spec: { id, radius, texture?, procedural?, haze?, atmosphere?, limb?, rings?, rotation?,
   *         oblateness?, ambient?, exposure?, color?, faceParent? }
   */
  create(spec, { quality = 'mid', seed = 1 } = {}) {
    const THREE = this.THREE;
    const group = new THREE.Group();
    group.name = spec.id;
    const spin = new THREE.Group();
    group.add(spin);
    group.scale.setScalar(spec.radius);

    const proceduralSpec = spec.procedural || { kind: 'rocky', base: spec.color || '#888888', accent: '#333333', craters: 0.5 };
    const placeholder =
      spec.texture || spec.lazyProcedural
        ? this._solidHex(spec.color || proceduralSpec.base || '#777777')
        : this.tex.planet(proceduralSpec, seed, spec.radius >= 1 ? 1024 : 512);
    const ringShadow =
      spec.rings && spec.rings.texture ? { map: this.tex.ringStrip(), inner: spec.rings.inner, outer: spec.rings.outer } : null;
    const material = makePlanetMaterial(THREE, {
      map: placeholder,
      haze: spec.haze,
      limb: spec.limb,
      ringShadow,
      ambient: spec.ambient,
      exposure: spec.exposure,
      tint: spec.tint
    });
    const geo = quality === 'hi' ? this.sphereHi : quality === 'low' ? this.sphereLow : this.sphereMid;
    const mesh = new THREE.Mesh(geo, material);
    mesh.name = `${spec.id}-surface`;
    if (spec.oblateness) mesh.scale.set(1, 1 - spec.oblateness, 1);
    spin.add(mesh);

    const body = {
      id: spec.id,
      spec,
      group,
      spin,
      mesh,
      material,
      radius: spec.radius,
      atmosphere: null,
      rings: null,
      clouds: null,
      lightMaterials: [material],
      rotation: spec.rotation ? BODY_ROTATION[spec.rotation] : null,
      faceParent: !!spec.faceParent,
      _camL: new THREE.Vector3(),
      _textured: !spec.lazyProcedural,
      ensureTexture: () => {
        if (body._textured) return;
        body._textured = true;
        material.uniforms.map.value = this.tex.planet(proceduralSpec, seed, 512);
      }
    };

    if (spec.texture) {
      this.tex.load(spec.texture).then((t) => {
        if (t) material.uniforms.map.value = t;
      });
    }

    if (spec.atmosphere) {
      const atm = makeAtmosphereMaterial(THREE, {
        color: spec.atmosphere.color,
        strength: spec.atmosphere.strength ?? 1,
        falloff: spec.atmosphere.falloff ?? 3.2
      });
      const shell = new THREE.Mesh(quality === 'low' ? this.sphereLow : this.sphereMid, atm);
      shell.scale.setScalar(spec.atmosphere.scale ?? 1.04);
      if (spec.oblateness) shell.scale.y *= 1 - spec.oblateness;
      shell.renderOrder = 2;
      spin.add(shell);
      body.atmosphere = shell;
      body.lightMaterials.push(atm);
    }

    if (spec.rings) {
      const r = spec.rings;
      const ringGeo = new THREE.RingGeometry(r.inner, r.outer, 256, 1);
      ringGeo.rotateX(-Math.PI / 2);
      const map = r.texture
        ? this.tex.ringStrip()
        : this.tex.ringStrip({
            bands: r.bands || [
              [0.1, 0.16, 0.35],
              [0.3, 0.33, 0.5],
              [0.52, 0.55, 0.3],
              [0.86, 0.92, 0.9]
            ],
            color: r.color || '#dfe9f3'
          });
      const ringMat = makeRingMaterial(THREE, { map, inner: r.inner, outer: r.outer, opacity: r.opacity ?? 1 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.renderOrder = 3;
      spin.add(ring);
      body.rings = ring;
      body.lightMaterials.push(ringMat);
      if (r.texture) {
        this.tex.load(r.texture).then((t) => {
          if (!t) return;
          t.wrapS = THREE.ClampToEdgeWrapping;
          ringMat.uniforms.ringMap.value = t;
          if (ringShadow) material.uniforms.ringMap.value = t;
        });
      }
    }
    return body;
  }

  /** Earth: NASA Blue Marble day map, Black Marble night lights, ocean specular, cloud layer, atmosphere. */
  createEarth(spec) {
    const THREE = this.THREE;
    const body = this.create(spec, { quality: 'hi' });
    const mat = makePlanetMaterial(THREE, {
      map: body.material.uniforms.map.value,
      nightMap: this.black,
      specMap: this.black,
      haze: { color: '#6fb4ff', strength: 0.55 },
      ambient: 0.01,
      exposure: 1.3,
      nightStrength: 1.5,
      specStrength: 0.42,
      shininess: 90
    });
    body.mesh.material = mat;
    body.material = mat;
    body.lightMaterials[0] = mat;
    this.tex.load('earth_day_nasa_5400.jpg').then((t) => {
      if (t) mat.uniforms.map.value = t;
    });
    this.tex.load('earth_night_nasa_3600.jpg').then((t) => {
      if (t) mat.uniforms.nightMap.value = t;
    });
    this.tex.load('earth_specular_2048.jpg', { srgb: false }).then((t) => {
      if (t) mat.uniforms.specMap.value = t;
    });

    const cloudMat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
      opacity: 0.92
    });
    const clouds = new THREE.Mesh(this.sphereHi, cloudMat);
    clouds.scale.setScalar(1.0065);
    clouds.renderOrder = 1;
    clouds.visible = false;
    body.spin.add(clouds);
    body.clouds = clouds;
    this.tex.load('earth_clouds_nasa_2048.jpg', { srgb: false }).then((t) => {
      if (!t) return;
      cloudMat.alphaMap = t;
      cloudMat.needsUpdate = true;
      clouds.visible = true;
    });
    return body;
  }

  /**
   * Orients the body (IAU pole & prime meridian, or tidally locked toward its parent) and refreshes
   * the lighting uniforms. Positions are THREE.Vector3 in world units.
   */
  updateBody(body, dateMs, lightWorldPos, cameraWorldPos, parentWorldPos = null) {
    const { group, spin } = body;
    if (body.rotation) {
      const b = bodyBasis(body.rotation, dateMs);
      this._bx.set(b.x[0], b.x[1], b.x[2]);
      this._by.set(b.y[0], b.y[1], b.y[2]);
      this._bz.set(b.z[0], b.z[1], b.z[2]);
      this._m.makeBasis(this._bx, this._by, this._bz);
      spin.quaternion.setFromRotationMatrix(this._m);
    } else if (body.faceParent && parentWorldPos) {
      group.getWorldPosition(this._dir);
      this._dir.subVectors(parentWorldPos, this._dir);
      spin.rotation.set(0, Math.atan2(-this._dir.z, this._dir.x), 0);
    }
    group.updateMatrixWorld(true);

    const dir = this._dir;
    group.getWorldPosition(dir);
    dir.subVectors(lightWorldPos, dir).normalize();
    spin.getWorldQuaternion(this._q).invert();
    dir.applyQuaternion(this._q);

    body._camL.copy(cameraWorldPos);
    spin.worldToLocal(body._camL);

    for (const m of body.lightMaterials) {
      if (m.uniforms.sunDirL) m.uniforms.sunDirL.value.copy(dir);
      if (m.uniforms.camPosL) m.uniforms.camPosL.value.copy(body._camL);
    }
  }
}
