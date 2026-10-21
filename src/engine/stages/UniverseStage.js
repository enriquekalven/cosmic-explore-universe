/**
 * UniverseStage — Local Group & nearby galaxies at their real positions (inclined disks for the
 * big spirals), galaxy clusters, a procedural cosmic web of filaments and voids, and the cosmic
 * microwave background sphere marking the edge of the observable universe.
 */
import { worldFromRaDec, cross, normalize, dot, rotateAboutAxis, formatNumber } from '../astro.js';
import { bandFade, smoothstep } from '../scale.js';
import { makePointsMaterial } from '../shaders.js';
import { mulberry32 } from '../textures.js';
import { GALAXIES } from '../../catalog/galaxyCatalog.js';

const OBSERVABLE_RADIUS_LY = 46.5e9;

export class UniverseStage {
  constructor(ctx) {
    this.ctx = ctx;
    const { THREE, scene, tex } = ctx;
    this.THREE = THREE;
    this.galaxies = [];
    this.lastUnitsPerLy = -1;
    this._v = new THREE.Vector3();
    const pole = worldFromRaDec(0, 90);

    for (const g of GALAXIES) {
      const dir = worldFromRaDec(g.ra, g.dec);
      const entry = { def: g, dir: new THREE.Vector3(dir[0], dir[1], dir[2]), pos: new THREE.Vector3(), distLy: g.distMly * 1e6, sizeLy: g.diameterKly * 1000 };
      const isStructure = ['cluster', 'supercluster', 'void', 'wall'].includes(g.type);
      if (!isStructure) {
        const map = tex.galaxySprite(g.type === 'spiral' ? 'spiral' : g.type === 'elliptical' ? 'elliptical' : g.type, hash(g.id), g.tint || '#ffffff');
        if (g.inclination !== undefined) {
          // oriented disk: major axis at position angle (N→E), tilted by inclination about it
          const n0 = normalize(sub(pole, scaleV(dir, dot(pole, dir))));
          const e0 = normalize(cross(pole, dir));
          const pa = (g.positionAngle || 0) * (Math.PI / 180);
          const u = normalize(add(scaleV(n0, Math.cos(pa)), scaleV(e0, Math.sin(pa))));
          const normal = normalize(rotateAboutAxis(dir, u, (g.inclination * Math.PI) / 180));
          const yAxis = normalize(cross(normal, u));
          const m = new THREE.Matrix4().makeBasis(new THREE.Vector3(...u), new THREE.Vector3(...yAxis), new THREE.Vector3(...normal));
          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
          );
          mesh.quaternion.setFromRotationMatrix(m);
          entry.mesh = mesh;
          scene.add(mesh);
        } else {
          const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
          entry.sprite = sprite;
          scene.add(sprite);
        }
      } else if (g.type === 'cluster') {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: tex.softDisk(64), color: g.type === 'cluster' ? 0xffe9c7 : 0xd8c8ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: g.type === 'cluster' ? 0.45 : 0.18 })
        );
        entry.sprite = sprite;
        entry.glowOnly = true;
        scene.add(sprite);
      }
      this.galaxies.push(entry);
      const far = entry.distLy > 4e6;
      ctx.register(g.id, {
        name: g.name,
        kind: isStructure ? 'structure' : 'galaxy',
        stage: 4,
        color: isStructure ? '#f0abfc' : '#e9d5ff',
        priority: g.id === 'andromeda' ? 8 : g.id === 'triangulum' || g.id === 'lmc' ? 6 : isStructure ? 4 : entry.distLy < 1e6 ? 2 : 3,
        getWorldPos: (o) => o.copy(entry.pos),
        radius: () => (entry.sizeLy * ctx.scale.unitsPerLy) / 2,
        viewDistance: () => entry.sizeLy * ctx.scale.unitsPerLy * (isStructure ? 1.6 : 2.4),
        alpha: (z) => (entry.distLy < 1e6 ? bandFade(z, 76, 81, 94, 98) : far ? bandFade(z, 86, 90, 100, 101) : bandFade(z, 85, 89, 99, 101)),
        sub: `${formatDistance(entry.distLy)} • ${g.type}`
      });
    }

    ctx.register('localGroup', {
      name: 'The Local Group',
      kind: 'structure',
      stage: 4,
      color: '#f0abfc',
      priority: 3,
      getWorldPos: (o) => {
        const m31 = this.galaxies.find((x) => x.def.id === 'andromeda');
        return o.copy(m31.pos).multiplyScalar(0.5);
      },
      radius: () => 0,
      viewDistance: () => 6e6 * ctx.scale.unitsPerLy,
      alpha: (z) => bandFade(z, 84, 88, 95, 98),
      sub: '~80 galaxies within 10 million light-years'
    });

    // ---------------- Cosmic web
    this.web = this._buildWeb();
    scene.add(this.web.group);

    // ---------------- CMB sphere (edge of the observable universe)
    this.cmb = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 32),
      new THREE.MeshBasicMaterial({ map: tex.cmb(), side: THREE.BackSide, transparent: true, opacity: 0, depthWrite: false, depthTest: true })
    );
    this.cmb.renderOrder = -500;
    this.cmb.frustumCulled = false;
    scene.add(this.cmb);
    ctx.register('cmb', {
      name: 'Cosmic Microwave Background — edge of the observable universe',
      kind: 'structure',
      stage: 4,
      color: '#fdba74',
      priority: 5,
      getWorldPos: (o) => o.set(0, 0, 0),
      radius: () => 0,
      viewDistance: () => OBSERVABLE_RADIUS_LY * ctx.scale.unitsPerLy * 0.8,
      alpha: (z) => bandFade(z, 95, 98, 100, 101),
      sub: 'Light from 13.8 billion years ago, 46 billion light-years away in every direction'
    });
  }

  _buildWeb() {
    const { THREE, tex } = this.ctx;
    const rnd = mulberry32(4242);
    const nodes = [];
    for (const g of GALAXIES) {
      if (g.type === 'cluster' || g.type === 'supercluster') {
        const d = worldFromRaDec(g.ra, g.dec);
        const r = g.distMly * 1e6;
        nodes.push([d[0] * r, d[1] * r, d[2] * r]);
      }
    }
    const R = 1.9e9;
    while (nodes.length < 420) {
      const x = (rnd() * 2 - 1) * R;
      const y = (rnd() * 2 - 1) * R;
      const z = (rnd() * 2 - 1) * R;
      const r = Math.hypot(x, y, z);
      if (r > R || r < 3e7) continue;
      nodes.push([x, y, z]);
    }
    // k-nearest edges
    const edges = new Set();
    for (let i = 0; i < nodes.length; i++) {
      const dists = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const a = nodes[i];
        const b = nodes[j];
        dists.push([Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]), j]);
      }
      dists.sort((a, b) => a[0] - b[0]);
      for (let k = 0; k < 3; k++) {
        const j = dists[k][1];
        edges.add(i < j ? `${i}-${j}` : `${j}-${i}`);
      }
    }
    const edgeList = [...edges].map((s) => s.split('-').map(Number));
    const perEdge = 34;
    const perNode = 55;
    const count = edgeList.length * perEdge + nodes.length * perNode;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const linePos = new Float32Array(edgeList.length * 6);
    let i = 0;
    const put = (x, y, z, rgb, s) => {
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      col[i * 3] = rgb[0];
      col[i * 3 + 1] = rgb[1];
      col[i * 3 + 2] = rgb[2];
      size[i] = s;
      i++;
    };
    const palette = [
      [0.98, 0.93, 0.82],
      [0.8, 0.86, 1.0],
      [1.0, 0.85, 0.9],
      [0.95, 0.9, 0.75]
    ];
    edgeList.forEach(([a, b], e) => {
      const A = nodes[a];
      const B = nodes[b];
      linePos.set([A[0], A[1], A[2], B[0], B[1], B[2]], e * 6);
      for (let k = 0; k < perEdge; k++) {
        const t = rnd();
        const jit = 7e6;
        put(
          A[0] + (B[0] - A[0]) * t + gauss(rnd) * jit,
          A[1] + (B[1] - A[1]) * t + gauss(rnd) * jit,
          A[2] + (B[2] - A[2]) * t + gauss(rnd) * jit,
          palette[(k + e) % palette.length],
          0.9 + rnd() * 1.1
        );
      }
    });
    for (const n of nodes) {
      for (let k = 0; k < perNode; k++) {
        put(n[0] + gauss(rnd) * 9e6, n[1] + gauss(rnd) * 9e6, n[2] + gauss(rnd) * 9e6, palette[k % palette.length], 1.0 + rnd() * 1.4);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    const mat = makePointsMaterial(THREE, { map: tex.softDisk(32), attenuate: false, opacity: 0.9, minPx: 0.8, maxPx: 3 });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.09, depthWrite: false, blending: THREE.AdditiveBlending });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.frustumCulled = false;
    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    return { group, points, mat, lines, lineMat };
  }

  update(frame) {
    const { scale, zoom, cameraPos, focal } = frame;
    const upl = scale.unitsPerLy;
    if (this.lastUnitsPerLy !== upl) {
      for (const g of this.galaxies) {
        g.pos.copy(g.dir).multiplyScalar(g.distLy * upl);
        const size = g.sizeLy * upl;
        if (g.mesh) {
          g.mesh.position.copy(g.pos);
          g.mesh.scale.set(size, size, 1);
        }
        if (g.sprite) g.sprite.position.copy(g.pos);
        g.sizeWorld = size;
      }
      this.web.group.scale.setScalar(upl);
      this.cmb.scale.setScalar(OBSERVABLE_RADIUS_LY * upl);
      this.lastUnitsPerLy = upl;
    }
    for (const g of this.galaxies) {
      const a = g.distLy < 1e6 ? bandFade(zoom, 74, 80, 100, 101) : g.distLy > 4e6 ? bandFade(zoom, 84, 89, 100, 101) : bandFade(zoom, 78, 84, 100, 101);
      const camD = cameraPos.distanceTo(g.pos);
      if (g.sprite) {
        const minPx = g.glowOnly ? 26 : 12;
        const s = Math.max(g.sizeWorld, camD * (minPx / focal));
        g.sprite.scale.set(s, s * (g.glowOnly ? 0.8 : 1), 1);
        g.sprite.material.opacity = (g.glowOnly ? (g.def.type === 'cluster' ? 0.45 : 0.18) : 1) * a;
        g.sprite.visible = a > 0.01;
      }
      if (g.mesh) {
        g.mesh.material.opacity = a;
        g.mesh.visible = a > 0.01;
      }
    }
    const webA = smoothstep(90.5, 95.5, zoom);
    this.web.group.visible = webA > 0.01;
    this.web.mat.uniforms.uOpacity.value = 0.9 * webA;
    this.web.mat.uniforms.uPixelRatio.value = frame.pixelRatio;
    this.web.lineMat.opacity = 0.09 * webA;
    const cmbA = smoothstep(94, 98.5, zoom) * 0.85;
    this.cmb.material.opacity = cmbA;
    this.cmb.visible = cmbA > 0.01;
  }
}

function formatDistance(ly) {
  if (ly < 1e6) return `${formatNumber(ly / 1e3, 0)} thousand light-years`;
  if (ly < 1e9) return `${formatNumber(ly / 1e6, 2)} million light-years`;
  return `${formatNumber(ly / 1e9, 2)} billion light-years`;
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
function scaleV(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}
function hash(id) {
  let h = 5;
  for (let i = 0; i < id.length; i++) h = (h * 29 + id.charCodeAt(i)) % 65521;
  return h;
}
function gauss(rnd) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
