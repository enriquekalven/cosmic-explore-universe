/**
 * GalaxyStage — a physically-structured Milky Way: barred bulge, four major/minor spiral arms with
 * the right pitch and the Sun on the Orion Spur, HII regions, dust lanes, a stellar halo and the
 * galactic centre (Sagittarius A*). Built in galactic coordinates and oriented with the real
 * galactic pole/centre directions so it lines up with the ESO sky panorama.
 */
import { GALACTIC_FRAME, SUN_TO_GALACTIC_CENTER_LY, formatNumber } from '../astro.js';
import { bandFade, smoothstep } from '../scale.js';
import { makePointsMaterial } from '../shaders.js';
import { mulberry32 } from '../textures.js';

const R0 = SUN_TO_GALACTIC_CENTER_LY;
const PITCH = Math.tan((12.5 * Math.PI) / 180);
const BAR_ANGLE = (27 * Math.PI) / 180;

const ARMS = [
  { name: 'Scutum–Centaurus Arm', rRef: 15800, phiStart: 0.471, rMax: 50000, weight: 2.0, labelPhi: -2.6 },
  { name: 'Perseus Arm', rRef: 32000, phiStart: 3.61, rMax: 50000, weight: 2.0, labelPhi: -1.1 },
  { name: 'Sagittarius Arm', rRef: 21500, phiStart: 3.0, rMax: 45000, weight: 1.1, labelPhi: 0.9 },
  { name: 'Outer Arm', rRef: 42000, phiStart: 6.0, rMax: 52000, weight: 0.8, labelPhi: -0.4 }
];

export class GalaxyStage {
  constructor(ctx) {
    this.ctx = ctx;
    const { THREE, scene, tex } = ctx;
    this.THREE = THREE;
    this.group = new THREE.Group();
    const { X, Y, Z } = GALACTIC_FRAME;
    const m = new THREE.Matrix4().makeBasis(
      new THREE.Vector3(-X[0], -X[1], -X[2]),
      new THREE.Vector3(Z[0], Z[1], Z[2]),
      new THREE.Vector3(Y[0], Y[1], Y[2])
    );
    this.group.quaternion.setFromRotationMatrix(m);
    this.centerDir = new THREE.Vector3(X[0], X[1], X[2]);
    scene.add(this.group);
    this.lastUnitsPerLy = -1;
    this.layers = [];
    this._v = new THREE.Vector3();

    const rnd = mulberry32(777);
    const soft = tex.softDisk(64);

    // ---- diffuse glow (big soft particles along disk + arms)
    const glow = this._beginLayer(2600, soft, { attenuate: true, opacity: 0.05, minPx: 2, maxPx: 900, renderOrder: 10 });
    for (let i = 0; i < 2600; i++) {
      const onArm = rnd() < 0.55;
      const p = onArm ? this._sampleArm(rnd, 900) : this._sampleDisk(rnd, 1.0);
      this._push(glow, p, [1.0, 0.9, 0.76], 1800 + rnd() * 1800);
    }
    this._endLayer(glow);

    // ---- old disk population
    const disk = this._beginLayer(70000, soft, { attenuate: true, opacity: 0.3, minPx: 1, maxPx: 60, renderOrder: 11 });
    for (let i = 0; i < 70000; i++) {
      const p = this._sampleDisk(rnd, 1.0);
      const warm = 0.55 + rnd() * 0.45;
      this._push(disk, p, [1.0 * warm, 0.88 * warm, 0.7 * warm], 60 + rnd() * 110);
    }
    this._endLayer(disk);

    // ---- spiral arms (young blue stars) + HII regions
    const armStars = this._beginLayer(86000, soft, { attenuate: true, opacity: 0.95, minPx: 1, maxPx: 60, renderOrder: 11 });
    const hii = this._beginLayer(2600, soft, { attenuate: true, opacity: 0.5, minPx: 1.5, maxPx: 120, renderOrder: 13 });
    for (let i = 0; i < 86000; i++) {
      const p = this._sampleArm(rnd, 1);
      const b = 0.55 + rnd() * 0.55;
      this._push(armStars, p, [0.72 * b, 0.82 * b, 1.0 * b], 55 + rnd() * 110);
      if (i % 33 === 0) this._push(hii, this._sampleArm(rnd, 0.6), [1.0, 0.52, 0.7], 260 + rnd() * 260);
    }
    this._endLayer(armStars);
    this._endLayer(hii);

    // ---- bar & bulge
    const bulge = this._beginLayer(26000, soft, { attenuate: true, opacity: 0.65, minPx: 1, maxPx: 80, renderOrder: 11 });
    for (let i = 0; i < 26000; i++) {
      let x;
      let y;
      let z;
      if (rnd() < 0.62) {
        const along = gauss(rnd) * 4600;
        const across = gauss(rnd) * 1700;
        y = gauss(rnd) * 1300;
        x = Math.cos(BAR_ANGLE) * along - Math.sin(BAR_ANGLE) * across;
        z = Math.sin(BAR_ANGLE) * along + Math.cos(BAR_ANGLE) * across;
      } else {
        const s = rnd() < 0.3 ? 450 : 2200;
        x = gauss(rnd) * s;
        y = gauss(rnd) * s * 0.8;
        z = gauss(rnd) * s;
      }
      const w = 0.6 + rnd() * 0.4;
      this._push(bulge, [x, y, z], [1.0 * w, 0.82 * w, 0.58 * w], 70 + rnd() * 90);
    }
    this._endLayer(bulge);

    // ---- stellar halo & globular clusters
    const halo = this._beginLayer(1800, soft, { attenuate: true, opacity: 0.35, minPx: 1, maxPx: 40, renderOrder: 11 });
    for (let i = 0; i < 1800; i++) {
      const r = 8000 + Math.pow(rnd(), 1.6) * 90000;
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      this._push(halo, [r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.8, r * Math.sin(ph) * Math.sin(th)], [1.0, 0.9, 0.7], 160 + rnd() * 240);
    }
    this._endLayer(halo);

    // ---- dust lanes (dark, normal blending, along the inner edge of the arms)
    const dust = this._beginLayer(24000, soft, { attenuate: true, opacity: 0.6, minPx: 1, maxPx: 70, renderOrder: 12, blending: THREE.NormalBlending });
    for (let i = 0; i < 24000; i++) {
      const p = this._sampleArm(rnd, 0.55, -550);
      p[1] *= 0.45;
      this._push(dust, p, [0.02, 0.015, 0.01], 280 + rnd() * 240);
    }
    this._endLayer(dust);

    // ---- galactic centre: nuclear star cluster + Sgr A*
    this.core = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: tex.glow({ size: 128, inner: 0.1, power: 1.8 }), color: 0xfff1d6, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.95 })
    );
    this.core.scale.set(5200, 3600, 1);
    this.core.renderOrder = 14;
    this.group.add(this.core);

    // ---- labels
    const mk = (id, name, local, extra = {}) => {
      const lp = new THREE.Vector3(local[0], local[1], local[2]);
      ctx.register(id, {
        name,
        stage: 3,
        kind: extra.kind || 'structure',
        color: extra.color || '#c4b5fd',
        priority: extra.priority ?? 3,
        getWorldPos: (o) => this.group.localToWorld(o.copy(lp)),
        radius: () => 0,
        viewDistance: () => (extra.viewLy || 12000) * ctx.scale.unitsPerLy,
        alpha: extra.alpha || ((z) => bandFade(z, 72, 78, 92, 97)),
        sub: extra.sub
      });
    };
    mk('sagittariusA', 'Sagittarius A* — galactic centre black hole', [0, 0, 0], {
      kind: 'blackhole',
      color: '#fb923c',
      priority: 7,
      viewLy: 9000,
      alpha: (z) => bandFade(z, 70, 76, 92, 97),
      sub: '4.3 million solar masses • 26,670 light-years away'
    });
    mk('orionSpur', 'Our Sun — you are here (Orion Spur)', [R0, 0, 0], {
      kind: 'poi',
      color: '#fde68a',
      priority: 8,
      viewLy: 8000,
      alpha: (z) => bandFade(z, 68, 73, 92, 97),
      sub: `${formatNumber(R0)} light-years from the centre`
    });
    mk('milkyWayDisk', 'Milky Way Galaxy', [0, 0, -30000], {
      kind: 'galaxy',
      color: '#c4b5fd',
      priority: 6,
      viewLy: 150000,
      alpha: (z) => bandFade(z, 78, 84, 99, 100.5),
      sub: '105,700 light-years across • 200–400 billion stars'
    });
    mk('galacticBar', 'Galactic Bar', [Math.cos(BAR_ANGLE) * 9000, 0, Math.sin(BAR_ANGLE) * 9000], { priority: 2, viewLy: 30000 });
    for (const arm of ARMS) {
      const r = arm.rRef * Math.exp(-arm.labelPhi * PITCH);
      mk(`arm-${slug(arm.name)}`, arm.name, [Math.cos(arm.labelPhi) * r, 0, Math.sin(arm.labelPhi) * r], { priority: 2, viewLy: 40000 });
    }
    mk('orionArmLabel', 'Orion Spur (local arm)', [Math.cos(-0.55) * R0 * Math.exp(0.55 * PITCH), 0, Math.sin(-0.55) * R0 * Math.exp(0.55 * PITCH)], {
      priority: 2,
      viewLy: 20000,
      alpha: (z) => bandFade(z, 72, 78, 88, 93)
    });
  }

  _beginLayer(count, map, opts) {
    const { THREE } = this;
    const mat = makePointsMaterial(THREE, { map, attenuate: opts.attenuate, opacity: opts.opacity, minPx: opts.minPx, maxPx: opts.maxPx, blending: opts.blending });
    return { count, i: 0, pos: new Float32Array(count * 3), col: new Float32Array(count * 3), size: new Float32Array(count), mat, renderOrder: opts.renderOrder || 0, baseOpacity: opts.opacity };
  }

  _push(layer, p, rgb, size) {
    if (layer.i >= layer.count) return;
    const i = layer.i++;
    layer.pos[i * 3] = p[0];
    layer.pos[i * 3 + 1] = p[1];
    layer.pos[i * 3 + 2] = p[2];
    layer.col[i * 3] = rgb[0];
    layer.col[i * 3 + 1] = rgb[1];
    layer.col[i * 3 + 2] = rgb[2];
    layer.size[i] = size;
  }

  _endLayer(layer) {
    const { THREE } = this;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(layer.pos.subarray(0, layer.i * 3), 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(layer.col.subarray(0, layer.i * 3), 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(layer.size.subarray(0, layer.i), 1));
    const points = new THREE.Points(geo, layer.mat);
    points.frustumCulled = false;
    points.renderOrder = layer.renderOrder;
    this.group.add(points);
    layer.points = points;
    this.layers.push(layer);
  }

  _sampleDisk(rnd, scaleFactor) {
    // exponential disk, scale length 8,500 ly, truncated at 55,000 ly; thickness grows outward
    let r;
    do {
      r = -8500 * Math.log(1 - rnd());
    } while (r > 55000 || r < 1500);
    const phi = rnd() * Math.PI * 2;
    const h = 600 + (r / 55000) * 900;
    return [Math.cos(phi) * r * scaleFactor, gauss(rnd) * h, Math.sin(phi) * r * scaleFactor];
  }

  _sampleArm(rnd, widthFactor = 1, radialOffset = 0) {
    // pick an arm weighted by prominence, then a point along its logarithmic spiral
    const total = ARMS.reduce((s, a) => s + a.weight, 0) + 0.7;
    let u = rnd() * total;
    let arm = null;
    for (const a of ARMS) {
      if (u < a.weight) {
        arm = a;
        break;
      }
      u -= a.weight;
    }
    let phi;
    let r;
    if (!arm) {
      // Orion Spur: a short local arm segment passing through the Sun
      phi = -0.95 + rnd() * 1.5;
      r = R0 * Math.exp(-phi * PITCH * 1.25);
    } else {
      const phiEnd = -Math.log(arm.rMax / arm.rRef) / PITCH;
      phi = arm.phiStart + (phiEnd - arm.phiStart) * Math.pow(rnd(), 0.85);
      r = arm.rRef * Math.exp(-phi * PITCH);
    }
    const width = (650 + r * 0.045) * widthFactor;
    const rr = r + radialOffset + gauss(rnd) * width;
    const dphi = (gauss(rnd) * width * 0.6) / Math.max(1, rr);
    const h = 180 + (rr / 55000) * 420;
    return [Math.cos(phi + dphi) * rr, gauss(rnd) * h, Math.sin(phi + dphi) * rr];
  }

  update(frame) {
    const { scale, zoom } = frame;
    const upl = scale.unitsPerLy;
    if (this.lastUnitsPerLy !== upl) {
      this.group.position.copy(this.centerDir).multiplyScalar(R0 * upl);
      this.group.scale.setScalar(upl);
      this.lastUnitsPerLy = upl;
    }
    const a = smoothstep(69, 77, zoom);
    this.group.visible = a > 0.01;
    if (!this.group.visible) return;
    for (const layer of this.layers) {
      layer.mat.uniforms.uOpacity.value = layer.baseOpacity * a;
      layer.mat.uniforms.uPixelRatio.value = frame.pixelRatio;
      layer.mat.uniforms.uScale.value = frame.focal;
      layer.mat.uniforms.uWorldScale.value = upl;
    }
    this.core.material.opacity = 0.95 * a;
  }
}

function gauss(rnd) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
