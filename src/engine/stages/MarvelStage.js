import * as THREE from '../../../vendor/three/build/three.module.js';
import { bandFade } from '../scale.js';
import { makeCanvas, makeNoise, mulberry32, clamp01 } from '../textures.js';
import { getMarvelObject } from '../../i18n.js';
import { MARVEL_LABEL_NAMES } from '../../catalog/marvelData.js';

const STAGE_BANDS = [
  [-2, 0, 22, 32],
  [12, 18, 48, 56],
  [38, 45, 70, 76],
  [60, 67, 87, 92],
  [78, 84, 102, 110]
];

function stageVisibility(zoom, stageIndex) {
  const b = STAGE_BANDS[stageIndex] || STAGE_BANDS[1];
  return bandFade(zoom, b[0], b[1], b[2], b[3]);
}

let sharedGlowTex = null;
function getSharedGlowTex() {
  if (sharedGlowTex) return sharedGlowTex;
  const size = 128;
  const c = makeCanvas(size, size);
  const ctx = c.getContext('2d');
  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.65)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.18)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  sharedGlowTex = new THREE.CanvasTexture(c);
  sharedGlowTex.colorSpace = THREE.SRGBColorSpace;
  return sharedGlowTex;
}

function makeStarHalo(scale = 3.0, color = 0xffffff, opacity = 0.8) {
  const mat = new THREE.SpriteMaterial({
    map: getSharedGlowTex(),
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const s = new THREE.Sprite(mat);
  s.scale.setScalar(scale);
  return s;
}

function makeAtmosphere(radius = 1.5, color = 0x38bdf8, opacity = 0.5) {
  const geo = new THREE.SphereGeometry(radius * 1.045, 28, 20);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: opacity * 0.35,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Mesh(geo, mat);
}

function makeRingAlphaTexture() {
  const w = 256;
  const c = makeCanvas(w, 4);
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(0.2, 'rgba(255,255,255,0.75)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.28)');
  grad.addColorStop(0.8, 'rgba(255,255,255,0.85)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makePlanetRing(innerR, outerR, alphaTex, color = 0xffffff) {
  const geo = new THREE.RingGeometry(innerR, outerR, 64);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    color,
    alphaMap: alphaTex,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  return new THREE.Mesh(geo, mat);
}

function makeRockyTexture({ seed = 1, baseColor = [120, 120, 130], craterColor = [70, 70, 80] } = {}) {
  const w = 256, h = 128;
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  const noise = makeNoise(seed);
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = clamp01(noise.fbm((x / w) * 6, (y / h) * 3, 4));
      const i = (y * w + x) * 4;
      img.data[i] = baseColor[0] + (craterColor[0] - baseColor[0]) * n;
      img.data[i + 1] = baseColor[1] + (craterColor[1] - baseColor[1]) * n;
      img.data[i + 2] = baseColor[2] + (craterColor[2] - baseColor[2]) * n;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeEarthLikeTexture(seed = 1) {
  return makeRockyTexture({ seed, baseColor: [28, 92, 168], craterColor: [56, 158, 98] });
}

function makeLavaTexture(seed = 1) {
  return makeRockyTexture({ seed, baseColor: [45, 15, 10], craterColor: [255, 95, 20] });
}

function makeGasGiantTexture({ seed = 1, palette = [[195, 55, 45], [235, 165, 50]] } = {}) {
  const c0 = palette[0] || [195, 55, 45];
  const c1 = palette[1] || [45, 165, 180];
  return makeRockyTexture({ seed, baseColor: c0, craterColor: c1 });
}

function disposeObject3D(obj) {
  if (!obj) return;
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
  });
}

export class MarvelStage {
  constructor(ctx) {
    this.ctx = ctx;
    this.active = false;

    // 5 scale groups so each scale's objects fade in/out cleanly at its logarithmic scale
    this.group0 = new THREE.Group();
    this.group0.name = 'MarvelScale0_Midgard';
    this.group1 = new THREE.Group();
    this.group1.name = 'MarvelScale1_NineRealms';
    this.group2 = new THREE.Group();
    this.group2.name = 'MarvelScale2_JumpNetwork';
    this.group3 = new THREE.Group();
    this.group3.name = 'MarvelScale3_GalacticRim';
    this.group4 = new THREE.Group();
    this.group4.name = 'MarvelScale4_Multiverse';

    this.root = new THREE.Group();
    this.root.name = 'MarvelStageRoot';
    this.root.visible = false;
    this.root.add(this.group0, this.group1, this.group2, this.group3, this.group4);
    this.ctx.scene.add(this.root);

    this.registeredIds = [];
    this.orbits = [];
    this.spinMeshes = [];
    this.dysonRings = [];
    this.jumpPortals = [];
    this.infinityStones = [];
    this.wormholeVortex = null;
    this.bifrostBeam = null;

    this._buildScale0();
    this._buildScale1();
    this._buildScale2();
    this._buildScale3();
    this._buildScale4();
  }

  _labelSpec(spec) {
    return spec;
  }

  setActive(active) {
    this.active = !!active;
    this.root.visible = this.active;
  }

  _registerMarvel(id, data) {
    this.registeredIds.push(id);
    const pick = [];
    if (data.mesh) {
      data.mesh.traverse((child) => {
        if (child.isMesh) pick.push(child);
      });
    }
    const r = data.radius || 2.0;
    const stageIdx = data.stageIndex ?? 1;
    const viewDist = stageIdx === 0 ? 1.2 : r * 3.6;
    this.ctx.register(id, {
      name: (data.label && data.label.name) || data.name,
      sub: (data.label && data.label.sub) || '',
      kind: stageIdx === 0 ? 'probe' : stageIdx === 4 ? 'galaxy' : 'planet',
      color: '#fbbf24',
      priority: 10 - ((data.label && data.label.priority) || 1),
      stage: stageIdx,
      isMarvel: true,
      forceHidden: true,
      getWorldPos: (out) => data.getWorldPosition(out),
      radius: () => r,
      viewDistance: () => viewDist,
      alpha: (z) => (this.ctx.universeMode === 'marvel' ? stageVisibility(z, stageIdx) : 0),
      pick,
      getInfo: () => getMarvelObject(id)
    });
  }

  // ---------------------------------------------------------------------------
  // SCALE 0 — Midgard & Orbit (near Earth at 18.6 units from Sun)
  // ---------------------------------------------------------------------------
  _buildScale0() {
    // 1. The Benatar (Guardians M-Ship) — sleek orange/silver swept-wing M-class ship
    this.benatarAnchor = new THREE.Group();
    this.group0.add(this.benatarAnchor);

    const shipGroup = new THREE.Group();
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0xff6d1a,
      roughness: 0.35,
      metalness: 0.72,
      emissive: 0x331200,
      emissiveIntensity: 0.35,
    });
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xd8e4f0,
      roughness: 0.25,
      metalness: 0.85,
    });
    const cockpitMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });

    // Central fuselage
    const fuselage = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.24, 6), hullMat);
    fuselage.rotation.x = Math.PI / 2;
    shipGroup.add(fuselage);

    // Canopy
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.036, 16, 12), cockpitMat);
    canopy.scale.set(1.0, 0.55, 1.8);
    canopy.position.set(0, 0.022, 0.03);
    shipGroup.add(canopy);

    // Swept M-wings (left & right)
    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.012, 0.09), hullMat);
      wing.position.set(side * 0.11, 0, -0.01);
      wing.rotation.z = side * -0.18;
      wing.rotation.y = side * -0.28;
      shipGroup.add(wing);

      const winglet = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.009, 0.06), trimMat);
      winglet.position.set(side * 0.21, -0.02, 0.02);
      winglet.rotation.z = side * 0.65;
      shipGroup.add(winglet);
    }

    // Cyan ion thruster glow
    const thrusterHalo = makeStarHalo(0.18, 0x38bdf8, 0.9);
    thrusterHalo.position.set(0, 0, -0.12);
    shipGroup.add(thrusterHalo);

    this.benatarAnchor.add(shipGroup);
    this.benatarMesh = shipGroup;

    const benatarLabel = this._labelSpec({
      name: 'The Benatar (M-Ship)',
      sub: 'Guardians Starship · LEO',
      position: this.benatarAnchor.position,
      stageIndex: 0,
      priority: 1,
      minVis: 0.25,
      offsetY: 0.18,
      onClick: () => this.ctx.focusObject('benatar'),
    });

    this._registerMarvel('benatar', {
      name: 'The Benatar (Guardians M-Ship)',
      stageIndex: 0,
      mesh: shipGroup,
      radius: 0.22,
      label: benatarLabel,
      getWorldPosition: (target = new THREE.Vector3()) =>
        target.copy(this.benatarAnchor.position),
    });

    // 2. New Asgard (Tønsberg, Norway — 59.27°N, 10.41°E on Earth surface)
    this.newAsgardAnchor = new THREE.Group();
    this.group0.add(this.newAsgardAnchor);

    const beaconCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.045, 1),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    const beaconHalo = makeStarHalo(0.22, 0x38bdf8, 0.95);
    this.newAsgardAnchor.add(beaconCore, beaconHalo);

    const newAsgardLabel = this._labelSpec({
      name: 'New Asgard (Tønsberg)',
      sub: 'Asgardian Settlement · Norway',
      position: this.newAsgardAnchor.position,
      stageIndex: 0,
      priority: 2,
      minVis: 0.25,
      offsetY: 0.16,
      onClick: () => this.ctx.focusObject('newAsgard'),
    });

    this._registerMarvel('newAsgard', {
      name: 'New Asgard (Tønsberg, Norway)',
      stageIndex: 0,
      mesh: beaconCore,
      radius: 0.2,
      label: newAsgardLabel,
      getWorldPosition: (target = new THREE.Vector3()) =>
        target.copy(this.newAsgardAnchor.position),
    });
  }

  // ---------------------------------------------------------------------------
  // SCALE 1 — Yggdrasil & Thor's Nine Realms (14–95 units)
  // ---------------------------------------------------------------------------
  _buildScale1() {
    // Golden Yggdrasil World-Tree cosmic branches connecting the Realms
    const yggPoints = [];
    const branchCount = 7;
    for (let b = 0; b < branchCount; b++) {
      const baseAngle = (b / branchCount) * Math.PI * 2;
      let prev = new THREE.Vector3(0, 0, 0);
      for (let step = 1; step <= 14; step++) {
        const t = step / 14;
        const r = t * 92;
        const a = baseAngle + Math.sin(t * Math.PI * 2 + b) * 0.35;
        const y = Math.cos(t * Math.PI * 1.5 + b) * 14 * t;
        const next = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
        yggPoints.push(prev.x, prev.y, prev.z, next.x, next.y, next.z);
        prev = next;
      }
    }
    const yggGeo = new THREE.BufferGeometry();
    yggGeo.setAttribute('position', new THREE.Float32BufferAttribute(yggPoints, 3));
    this.yggdrasilLines = new THREE.LineSegments(
      yggGeo,
      new THREE.LineBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.group1.add(this.yggdrasilLines);

    // 1. Asgard & The Bifrost Observatory
    const asgardPos = new THREE.Vector3(44, 6.5, -24);
    const asgardGroup = new THREE.Group();
    asgardGroup.position.copy(asgardPos);
    this.group1.add(asgardGroup);

    // Golden crystalline realm disc
    const discGeo = new THREE.CylinderGeometry(2.6, 1.4, 0.55, 48);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.82,
      emissive: 0x78350f,
      emissiveIntensity: 0.45,
    });
    const asgardDisc = new THREE.Mesh(discGeo, discMat);
    asgardGroup.add(asgardDisc);

    // Golden Palace Spire (Valaskjalf)
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      roughness: 0.18,
      metalness: 0.92,
      emissive: 0xb45309,
      emissiveIntensity: 0.55,
    });
    const mainSpire = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.4, 16), spireMat);
    mainSpire.position.y = 1.45;
    asgardGroup.add(mainSpire);

    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const subSpire = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.2, 12), spireMat);
      subSpire.position.set(Math.cos(a) * 1.1, 0.85, Math.sin(a) * 1.1);
      asgardGroup.add(subSpire);
    }

    // Rainbow Bifrost Bridge + Heimdall's Observatory
    const bifrostGeo = new THREE.BoxGeometry(0.38, 0.08, 3.6);
    const bifrostMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });
    const bifrostBridge = new THREE.Mesh(bifrostGeo, bifrostMat);
    bifrostBridge.position.set(0, 0.3, 2.4);
    asgardGroup.add(bifrostBridge);
    this.bifrostBeam = bifrostBridge;

    const observatory = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 16), spireMat);
    observatory.position.set(0, 0.38, 4.1);
    asgardGroup.add(observatory);
    asgardGroup.add(makeStarHalo(5.5, 0xfbbf24, 0.75));
    this.spinMeshes.push({ mesh: asgardDisc, speed: 0.15 });

    const asgardLabel = this._labelSpec({
      name: 'Asgard & Bifrost',
      sub: 'Realm Eternal · Einstein-Rosen Bridge',
      position: asgardPos,
      stageIndex: 1,
      priority: 1,
      minVis: 0.15,
      offsetY: 3.1,
      onClick: () => this.ctx.focusObject('asgard'),
    });

    this._registerMarvel('asgard', {
      name: 'Asgard & The Bifrost Observatory',
      stageIndex: 1,
      mesh: asgardGroup,
      radius: 3.4,
      label: asgardLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(asgardPos),
    });

    // 2. Nidavellir (Neutron Star Dyson Forge)
    const nidPos = new THREE.Vector3(-56, -4.5, 34);
    const nidGroup = new THREE.Group();
    nidGroup.position.copy(nidPos);
    this.group1.add(nidGroup);

    // Blazing white-blue Neutron Star core
    const nsCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.95, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xe0f2fe })
    );
    nidGroup.add(nsCore);
    nidGroup.add(makeStarHalo(5.2, 0x38bdf8, 1.0));
    nidGroup.add(makeStarHalo(2.8, 0xffffff, 0.95));

    // 3 Nested counter-rotating Dyson Forge rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.38,
      metalness: 0.88,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.28,
    });
    for (let r = 0; r < 3; r++) {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1.75 + r * 0.48, 0.14, 16, 64),
        ringMat
      );
      torus.rotation.x = r * 0.55 + 0.3;
      torus.rotation.y = r * 0.4;
      nidGroup.add(torus);
      this.dysonRings.push({
        mesh: torus,
        vx: (r % 2 === 0 ? 1 : -1) * (0.45 + r * 0.15),
        vy: 0.32 - r * 0.1,
      });
    }

    const nidLabel = this._labelSpec({
      name: 'Nidavellir Dyson Forge',
      sub: 'Neutron Star Megastructure · Stormbreaker Forge',
      position: nidPos,
      stageIndex: 1,
      priority: 1,
      minVis: 0.15,
      offsetY: 3.2,
      onClick: () => this.ctx.focusObject('nidavellir'),
    });

    this._registerMarvel('nidavellir', {
      name: 'Nidavellir (Neutron Star Dyson Forge)',
      stageIndex: 1,
      mesh: nidGroup,
      radius: 3.2,
      label: nidLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(nidPos),
    });

    // 3. Jotunheim (Frost Giant Cryo-World)
    const jotPos = new THREE.Vector3(-34, 8.0, -64);
    const jotTex = makeRockyTexture({
      seed: 901,
      baseColor: [70, 145, 215],
      craterColor: [185, 230, 255],
      craterCount: 95,
    });
    const jotMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.85, 40, 40),
      new THREE.MeshStandardMaterial({
        map: jotTex,
        roughness: 0.45,
        metalness: 0.25,
        emissive: 0x0c4a6e,
        emissiveIntensity: 0.3,
      })
    );
    jotMesh.position.copy(jotPos);
    jotMesh.add(makeAtmosphere(1.85, 0x38bdf8, 0.55));
    const iceRingTex = makeRingAlphaTexture();
    const iceRing = makePlanetRing(2.3, 3.6, iceRingTex, 0x7dd3fc);
    iceRing.rotation.x = 0.35;
    jotMesh.add(iceRing);
    this.group1.add(jotMesh);
    this.spinMeshes.push({ mesh: jotMesh, speed: 0.22 });

    const jotLabel = this._labelSpec({
      name: 'Jotunheim',
      sub: 'Frost Giant Cryo-World · Casket of Ancient Winters',
      position: jotPos,
      stageIndex: 1,
      priority: 2,
      minVis: 0.2,
      offsetY: 2.5,
      onClick: () => this.ctx.focusObject('jotunheim'),
    });

    this._registerMarvel('jotunheim', {
      name: 'Jotunheim (Realm of the Frost Giants)',
      stageIndex: 1,
      mesh: jotMesh,
      radius: 2.4,
      label: jotLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(jotPos),
    });

    // 4. Muspelheim (Surtur's Eternal Fire Realm)
    const musPos = new THREE.Vector3(68, -7.0, 52);
    const musTex = makeLavaTexture(902);
    const musMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, 40, 40),
      new THREE.MeshStandardMaterial({
        map: musTex,
        emissiveMap: musTex,
        emissive: new THREE.Color(0xff4500),
        emissiveIntensity: 0.85,
        roughness: 0.5,
      })
    );
    musMesh.position.copy(musPos);
    musMesh.add(makeAtmosphere(2.05, 0xff5500, 0.7));
    musMesh.add(makeStarHalo(5.4, 0xf97316, 0.7));
    this.group1.add(musMesh);
    this.spinMeshes.push({ mesh: musMesh, speed: 0.18 });

    const musLabel = this._labelSpec({
      name: 'Muspelheim',
      sub: 'Tidal-Volcanic Fire Realm · Eternal Flame',
      position: musPos,
      stageIndex: 1,
      priority: 2,
      minVis: 0.2,
      offsetY: 2.7,
      onClick: () => this.ctx.focusObject('muspelheim'),
    });

    this._registerMarvel('muspelheim', {
      name: 'Muspelheim (Volcanic Realm of Eternal Fire)',
      stageIndex: 1,
      mesh: musMesh,
      radius: 2.6,
      label: musLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(musPos),
    });
  }

  // ---------------------------------------------------------------------------
  // SCALE 2 — Guardians Jump Network (16–75 units)
  // ---------------------------------------------------------------------------
  _buildScale2() {
    const createJumpPortal = (radius = 1.6) => {
      const portalGroup = new THREE.Group();
      const hexRing = new THREE.Mesh(
        new THREE.RingGeometry(radius * 0.78, radius, 6),
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.82,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const innerHex = new THREE.Mesh(
        new THREE.RingGeometry(radius * 0.35, radius * 0.65, 6),
        new THREE.MeshBasicMaterial({
          color: 0xa855f7,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      portalGroup.add(hexRing, innerHex);
      this.jumpPortals.push(portalGroup);
      return portalGroup;
    };

    // 1. Knowhere (Severed Celestial Head & Guardians HQ)
    const knowherePos = new THREE.Vector3(-28, 9, -22);
    const knowhereGroup = new THREE.Group();
    knowhereGroup.position.copy(knowherePos);
    this.group2.add(knowhereGroup);

    const skullMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.55,
      metalness: 0.68,
      emissive: 0x3b0764,
      emissiveIntensity: 0.35,
    });
    // Cranium dome
    const cranium = new THREE.Mesh(new THREE.DodecahedronGeometry(1.85, 1), skullMat);
    cranium.scale.set(0.92, 1.18, 1.05);
    knowhereGroup.add(cranium);

    // Jaw block
    const jaw = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.4), skullMat);
    jaw.position.set(0, -1.25, 0.25);
    knowhereGroup.add(jaw);

    // Glowing golden/amber Celestial eye sockets
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), eyeMat);
      eye.position.set(side * 0.55, 0.15, 1.55);
      knowhereGroup.add(eye);
    }
    knowhereGroup.add(makeStarHalo(6.2, 0xc084fc, 0.72));
    knowhereGroup.add(makeStarHalo(3.8, 0xfbbf24, 0.6));
    this.spinMeshes.push({ mesh: knowhereGroup, speed: 0.09 });

    const knowhereLabel = this._labelSpec({
      name: 'Knowhere (Guardians HQ)',
      sub: 'Severed Celestial Skull · Reality Stone Vault',
      position: knowherePos,
      stageIndex: 2,
      priority: 1,
      minVis: 0.15,
      offsetY: 3.1,
      onClick: () => this.ctx.focusObject('knowhere'),
    });

    this._registerMarvel('knowhere', {
      name: 'Knowhere (Severed Celestial Head & Guardians HQ)',
      stageIndex: 2,
      mesh: knowhereGroup,
      radius: 2.8,
      label: knowhereLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(knowherePos),
    });

    // 2. Xandar (Capital of the Nova Empire)
    const xandarPos = new THREE.Vector3(32, -4, -26);
    const xandarTex = makeEarthLikeTexture(903);
    const xandarMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.75, 40, 40),
      new THREE.MeshStandardMaterial({
        map: xandarTex,
        roughness: 0.55,
        metalness: 0.15,
      })
    );
    xandarMesh.position.copy(xandarPos);
    xandarMesh.add(makeAtmosphere(1.75, 0x38bdf8, 0.6));
    xandarMesh.add(makeStarHalo(4.5, 0x38bdf8, 0.55));
    const xandarPortal = createJumpPortal(1.4);
    xandarPortal.position.set(2.8, 0.8, 0);
    xandarMesh.add(xandarPortal);
    this.group2.add(xandarMesh);
    this.spinMeshes.push({ mesh: xandarMesh, speed: 0.25 });

    const xandarLabel = this._labelSpec({
      name: 'Xandar (Nova Empire)',
      sub: 'Trinary Star Hub · Nova Corps Capital',
      position: xandarPos,
      stageIndex: 2,
      priority: 1,
      minVis: 0.15,
      offsetY: 2.5,
      onClick: () => this.ctx.focusObject('xandar'),
    });

    this._registerMarvel('xandar', {
      name: 'Xandar (Capital of the Nova Empire)',
      stageIndex: 2,
      mesh: xandarMesh,
      radius: 2.4,
      label: xandarLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(xandarPos),
    });

    // 3. Morag (Tidal Ocean World & Power Stone Vault)
    const moragPos = new THREE.Vector3(-42, -8, 28);
    const moragTex = makeRockyTexture({
      seed: 904,
      baseColor: [42, 68, 95],
      craterColor: [110, 80, 145],
      craterCount: 65,
    });
    const moragMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, 36, 36),
      new THREE.MeshStandardMaterial({
        map: moragTex,
        roughness: 0.4,
        metalness: 0.3,
        emissive: 0x581c87,
        emissiveIntensity: 0.35,
      })
    );
    moragMesh.position.copy(moragPos);
    moragMesh.add(makeAtmosphere(1.55, 0xa855f7, 0.62));
    moragMesh.add(makeStarHalo(4.0, 0xc084fc, 0.65));
    this.group2.add(moragMesh);
    this.spinMeshes.push({ mesh: moragMesh, speed: 0.2 });

    const moragLabel = this._labelSpec({
      name: 'Morag (Power Stone Vault)',
      sub: '300-Year Tidal Ocean World · Temple of the Orb',
      position: moragPos,
      stageIndex: 2,
      priority: 2,
      minVis: 0.2,
      offsetY: 2.2,
      onClick: () => this.ctx.focusObject('morag'),
    });

    this._registerMarvel('morag', {
      name: 'Morag (Tidal Ocean World & Power Stone Vault)',
      stageIndex: 2,
      mesh: moragMesh,
      radius: 2.1,
      label: moragLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(moragPos),
    });

    // 4. The Sovereign (Engineered Golden World Cluster)
    const sovPos = new THREE.Vector3(46, 11, 24);
    const sovGroup = new THREE.Group();
    sovGroup.position.copy(sovPos);
    this.group2.add(sovGroup);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.18,
      metalness: 0.94,
      emissive: 0x92400e,
      emissiveIntensity: 0.45,
    });
    const mainSov = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 2), goldMat);
    sovGroup.add(mainSov);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 1), goldMat);
      sat.position.set(Math.cos(a) * 2.5, Math.sin(a * 2) * 0.5, Math.sin(a) * 2.5);
      sovGroup.add(sat);
    }
    const sovRing = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.08, 12, 64), goldMat);
    sovRing.rotation.x = Math.PI / 2.3;
    sovGroup.add(sovRing);
    sovGroup.add(makeStarHalo(5.0, 0xfbbf24, 0.75));
    this.spinMeshes.push({ mesh: sovGroup, speed: 0.22 });

    const sovLabel = this._labelSpec({
      name: 'The Sovereign',
      sub: 'Artificial Golden Megastructure · Anulax Batteries',
      position: sovPos,
      stageIndex: 2,
      priority: 2,
      minVis: 0.2,
      offsetY: 2.5,
      onClick: () => this.ctx.focusObject('sovereign'),
    });

    this._registerMarvel('sovereign', {
      name: 'The Sovereign (Engineered Golden World Cluster)',
      stageIndex: 2,
      mesh: sovGroup,
      radius: 2.8,
      label: sovLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(sovPos),
    });

    // 5. Counter-Earth (High Evolutionary's Mirror World)
    const cePos = new THREE.Vector3(14, -12, 48);
    const ceTex = makeEarthLikeTexture(905);
    const ceMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 36, 36),
      new THREE.MeshStandardMaterial({
        map: ceTex,
        roughness: 0.6,
        metalness: 0.12,
      })
    );
    ceMesh.position.copy(cePos);
    ceMesh.add(makeAtmosphere(1.6, 0x34d399, 0.55));
    this.group2.add(ceMesh);
    this.spinMeshes.push({ mesh: ceMesh, speed: 0.26 });

    const ceLabel = this._labelSpec({
      name: 'Counter-Earth',
      sub: "High Evolutionary's Engineered Mirror World",
      position: cePos,
      stageIndex: 2,
      priority: 2,
      minVis: 0.22,
      offsetY: 2.3,
      onClick: () => this.ctx.focusObject('counterEarth'),
    });

    this._registerMarvel('counterEarth', {
      name: "Counter-Earth (High Evolutionary's Mirror World)",
      stageIndex: 2,
      mesh: ceMesh,
      radius: 2.2,
      label: ceLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(cePos),
    });

    // 6. Contraxia (Ravager Ice World & Jump Hub)
    const conPos = new THREE.Vector3(-18, 13, 52);
    const conTex = makeRockyTexture({
      seed: 906,
      baseColor: [200, 225, 245],
      craterColor: [140, 180, 220],
      craterCount: 50,
    });
    const conMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 36, 36),
      new THREE.MeshStandardMaterial({
        map: conTex,
        roughness: 0.5,
        metalness: 0.2,
      })
    );
    conMesh.position.copy(conPos);
    conMesh.add(makeAtmosphere(1.45, 0x93c5fd, 0.5));
    const conPortal = createJumpPortal(1.25);
    conPortal.position.set(-2.3, 0.6, 0);
    conMesh.add(conPortal);
    this.group2.add(conMesh);
    this.spinMeshes.push({ mesh: conMesh, speed: 0.19 });

    const conLabel = this._labelSpec({
      name: 'Contraxia',
      sub: 'Ravager Cryo-World · Hexagonal Jump Hub',
      position: conPos,
      stageIndex: 2,
      priority: 3,
      minVis: 0.25,
      offsetY: 2.1,
      onClick: () => this.ctx.focusObject('contraxia'),
    });

    this._registerMarvel('contraxia', {
      name: 'Contraxia (Ravager Ice World & Jump Hub)',
      stageIndex: 2,
      mesh: conMesh,
      radius: 2.1,
      label: conLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(conPos),
    });
  }

  // ---------------------------------------------------------------------------
  // SCALE 3 — Sakaar, Titan & Kree Rim (18–62 units)
  // ---------------------------------------------------------------------------
  _buildScale3() {
    // 1. Sakaar & The Devil's Anus Wormhole
    const sakaarPos = new THREE.Vector3(26, 5, -22);
    const sakaarGroup = new THREE.Group();
    sakaarGroup.position.copy(sakaarPos);
    this.group3.add(sakaarGroup);

    const sakaarTex = makeGasGiantTexture({
      seed: 907,
      palette: [
        [195, 55, 45],
        [235, 165, 50],
        [45, 165, 180],
        [150, 40, 90],
      ],
    });
    const sakaarPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(1.85, 40, 40),
      new THREE.MeshStandardMaterial({ map: sakaarTex, roughness: 0.65 })
    );
    sakaarGroup.add(sakaarPlanet);

    // Swirling Einstein-Rosen Wormhole vortex ("The Devil's Anus") above Sakaar
    const wormholeGroup = new THREE.Group();
    wormholeGroup.position.set(2.9, 1.8, 0.5);
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.45 + i * 0.28, 0.06, 12, 48),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xef4444 : 0x38bdf8,
          transparent: true,
          opacity: 0.85 - i * 0.14,
          blending: THREE.AdditiveBlending,
        })
      );
      wormholeGroup.add(ring);
    }
    wormholeGroup.add(makeStarHalo(3.4, 0xef4444, 0.85));
    sakaarGroup.add(wormholeGroup);
    this.wormholeVortex = wormholeGroup;
    this.spinMeshes.push({ mesh: sakaarPlanet, speed: 0.24 });

    const sakaarLabel = this._labelSpec({
      name: "Sakaar & Devil's Anus Wormhole",
      sub: 'Einstein-Rosen Singularity Nexus · Thor: Ragnarok',
      position: sakaarPos,
      stageIndex: 3,
      priority: 1,
      minVis: 0.15,
      offsetY: 3.0,
      onClick: () => this.ctx.focusObject('sakaar'),
    });

    this._registerMarvel('sakaar', {
      name: "Sakaar & The Devil's Anus Wormhole",
      stageIndex: 3,
      mesh: sakaarGroup,
      radius: 3.1,
      label: sakaarLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(sakaarPos),
    });

    // 2. Titan (Thanos's Gravity-Tilted Homeworld — keyed as marvelTitan to avoid Saturn's moon collision)
    const titanPos = new THREE.Vector3(-32, -4, -18);
    const titanGroup = new THREE.Group();
    titanGroup.position.copy(titanPos);
    this.group3.add(titanGroup);

    const titanTex = makeRockyTexture({
      seed: 908,
      baseColor: [185, 110, 65],
      craterColor: [115, 65, 45],
      craterCount: 80,
    });
    const titanPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 40, 40),
      new THREE.MeshStandardMaterial({
        map: titanTex,
        roughness: 0.72,
        metalness: 0.15,
      })
    );
    titanPlanet.rotation.z = 0.42; // 24-degree gravity-tilted axis
    titanPlanet.add(makeAtmosphere(1.9, 0xf59e0b, 0.55));
    titanGroup.add(titanPlanet);

    // Shattered moon Roche-limit debris ring
    const ringTex = makeRingAlphaTexture();
    const debrisRing = makePlanetRing(2.4, 4.1, ringTex, 0xd97706);
    debrisRing.rotation.x = 0.48;
    debrisRing.rotation.z = -0.25;
    titanGroup.add(debrisRing);
    this.spinMeshes.push({ mesh: titanPlanet, speed: 0.18 });

    const titanLabel = this._labelSpec({
      name: "Titan (Thanos's Homeworld)",
      sub: '8° Axis-Tilted World · Roche-Limit Moon Debris',
      position: titanPos,
      stageIndex: 3,
      priority: 1,
      minVis: 0.15,
      offsetY: 2.9,
      onClick: () => this.ctx.focusObject('marvelTitan'),
    });

    this._registerMarvel('marvelTitan', {
      name: "Titan (Thanos's Gravity-Tilted World)",
      stageIndex: 3,
      mesh: titanGroup,
      radius: 3.2,
      label: titanLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(titanPos),
    });

    // 3. Vormir (Eclipse World of the Soul Stone)
    const vormirPos = new THREE.Vector3(-14, 9, 36);
    const vormirGroup = new THREE.Group();
    vormirGroup.position.copy(vormirPos);
    this.group3.add(vormirGroup);

    const vormirPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(1.65, 36, 36),
      new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        roughness: 0.75,
        metalness: 0.25,
        emissive: 0x311042,
        emissiveIntensity: 0.4,
      })
    );
    vormirGroup.add(vormirPlanet);

    // Blazing eternal solar eclipse corona ring overhead
    const eclipseRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.11, 16, 64),
      new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
      })
    );
    eclipseRing.rotation.x = 0.35;
    vormirGroup.add(eclipseRing);
    vormirGroup.add(makeStarHalo(5.4, 0xf97316, 0.78));
    this.spinMeshes.push({ mesh: vormirPlanet, speed: 0.14 });

    const vormirLabel = this._labelSpec({
      name: 'Vormir (Soul Stone)',
      sub: 'Eternal Eclipse World · Accretion Corona',
      position: vormirPos,
      stageIndex: 3,
      priority: 1,
      minVis: 0.15,
      offsetY: 2.8,
      onClick: () => this.ctx.focusObject('vormir'),
    });

    this._registerMarvel('vormir', {
      name: 'Vormir (Eclipse World of the Soul Stone)',
      stageIndex: 3,
      mesh: vormirGroup,
      radius: 2.8,
      label: vormirLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(vormirPos),
    });

    // 4. Ego the Living Planet (Celestial Brain World)
    const egoPos = new THREE.Vector3(38, -8, 30);
    const egoTex = makeLavaTexture(909);
    const egoMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.25, 44, 44),
      new THREE.MeshStandardMaterial({
        map: egoTex,
        emissiveMap: egoTex,
        emissive: new THREE.Color(0xec4899),
        emissiveIntensity: 0.75,
        roughness: 0.45,
      })
    );
    egoMesh.position.copy(egoPos);
    egoMesh.add(makeAtmosphere(2.25, 0xf43f5e, 0.65));
    egoMesh.add(makeStarHalo(5.8, 0xec4899, 0.7));
    this.group3.add(egoMesh);
    this.spinMeshes.push({ mesh: egoMesh, speed: 0.16 });

    const egoLabel = this._labelSpec({
      name: 'Ego the Living Planet',
      sub: 'Celestial Megastructure · Guardians Vol. 2',
      position: egoPos,
      stageIndex: 3,
      priority: 2,
      minVis: 0.18,
      offsetY: 3.0,
      onClick: () => this.ctx.focusObject('ego'),
    });

    this._registerMarvel('ego', {
      name: 'Ego the Living Planet (Celestial Brain World)',
      stageIndex: 3,
      mesh: egoMesh,
      radius: 2.9,
      label: egoLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(egoPos),
    });

    // 5. Hala (Capital of the Kree Empire)
    const halaPos = new THREE.Vector3(-44, 6, 14);
    const halaTex = makeRockyTexture({
      seed: 910,
      baseColor: [45, 95, 155],
      craterColor: [110, 210, 255],
      craterCount: 90,
    });
    const halaMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.8, 40, 40),
      new THREE.MeshStandardMaterial({
        map: halaTex,
        roughness: 0.4,
        metalness: 0.5,
        emissive: 0x0284c7,
        emissiveIntensity: 0.35,
      })
    );
    halaMesh.position.copy(halaPos);
    halaMesh.add(makeAtmosphere(1.8, 0x38bdf8, 0.6));
    this.group3.add(halaMesh);
    this.spinMeshes.push({ mesh: halaMesh, speed: 0.22 });

    const halaLabel = this._labelSpec({
      name: 'Hala (Kree Capital)',
      sub: 'Kree Ecumenopolis · Supreme Intelligence Hub',
      position: halaPos,
      stageIndex: 3,
      priority: 2,
      minVis: 0.2,
      offsetY: 2.5,
      onClick: () => this.ctx.focusObject('hala'),
    });

    this._registerMarvel('hala', {
      name: 'Hala (Capital of the Kree Empire)',
      stageIndex: 3,
      mesh: halaMesh,
      radius: 2.4,
      label: halaLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(halaPos),
    });
  }

  // ---------------------------------------------------------------------------
  // SCALE 4 — Celestials & The Six Infinity Singularities (Universe scale)
  // ---------------------------------------------------------------------------
  _buildScale4() {
    const arishemPos = new THREE.Vector3(0, 12, -48);
    const arishemGroup = new THREE.Group();
    arishemGroup.position.copy(arishemPos);
    this.group4.add(arishemGroup);

    const armorMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.28,
      metalness: 0.82,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.55,
    });

    // Towering Prime Celestial helm & torso silhouette
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 2.6, 11.0, 6), armorMat);
    torso.position.y = -2.0;
    arishemGroup.add(torso);

    const shoulders = new THREE.Mesh(new THREE.BoxGeometry(12.5, 2.8, 4.5), armorMat);
    shoulders.position.y = 2.2;
    arishemGroup.add(shoulders);

    const helm = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 5.2, 6), armorMat);
    helm.position.y = 6.2;
    arishemGroup.add(helm);

    // 6 Glowing Golden Eyes of Arishem
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    for (let row = 0; row < 3; row++) {
      for (const side of [-1, 1]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 14), eyeMat);
        eye.position.set(side * 0.85, 5.0 + row * 1.15, 2.55);
        arishemGroup.add(eye);
      }
    }

    // 6 Orbiting Infinity Stone Singularities (Space, Mind, Reality, Power, Time, Soul)
    const stoneColors = [
      0x3b82f6, // Space (Blue)
      0xfacc15, // Mind (Yellow)
      0xef4444, // Reality (Red)
      0xa855f7, // Power (Purple)
      0x22c55e, // Time (Green)
      0xf97316, // Soul (Orange)
    ];

    this.stoneOrbitGroup = new THREE.Group();
    this.stoneOrbitGroup.position.y = 2.0;
    arishemGroup.add(this.stoneOrbitGroup);

    stoneColors.forEach((col, idx) => {
      const a = (idx / 6) * Math.PI * 2;
      const r = 11.5;
      const stoneGroup = new THREE.Group();
      stoneGroup.position.set(Math.cos(a) * r, Math.sin(a * 2) * 2.2, Math.sin(a) * r);
      const crystal = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.15, 0),
        new THREE.MeshBasicMaterial({ color: col })
      );
      stoneGroup.add(crystal);
      stoneGroup.add(makeStarHalo(5.5, col, 0.95));
      this.stoneOrbitGroup.add(stoneGroup);
      this.infinityStones.push(crystal);
    });

    arishemGroup.add(makeStarHalo(28, 0xef4444, 0.65));

    const arishemLabel = this._labelSpec({
      name: 'Arishem & The Six Infinity Singularities',
      sub: 'Prime Celestial · Stellar Nucleosynthesis & Big Bang Relics',
      position: arishemPos,
      stageIndex: 4,
      priority: 1,
      minVis: 0.15,
      offsetY: 11.5,
      onClick: () => this.ctx.focusObject('arishem'),
    });

    this._registerMarvel('arishem', {
      name: 'Arishem the Judge & The Six Infinity Singularities',
      stageIndex: 4,
      mesh: arishemGroup,
      radius: 14.0,
      label: arishemLabel,
      getWorldPosition: (target = new THREE.Vector3()) => target.copy(arishemPos),
    });
  }

  // ---------------------------------------------------------------------------
  // Localization & Frame Update
  // ---------------------------------------------------------------------------
  refreshLabels(lang = 'en') {
    const dict = MARVEL_LABEL_NAMES[lang] || MARVEL_LABEL_NAMES.en;
    for (const id of this.registeredIds) {
      const entry = this.ctx.registry.get(id);
      if (entry && dict[id]) {
        entry.name = dict[id];
      }
    }
  }

  setOrbitVisibility(visible) {
    if (this.yggdrasilLines) {
      this.yggdrasilLines.visible = visible;
    }
  }

  update(frame, dtArg, elapsedArg) {
    const logScale = typeof frame === 'object' && frame !== null ? frame.zoom : frame;
    const dt = typeof frame === 'object' && frame !== null ? (frame.dt || 0.016) : (dtArg || 0.016);
    const elapsed = typeof frame === 'object' && frame !== null ? (frame.timeSeconds || 0) : (elapsedArg || 0);

    const isMarvelMode = this.ctx.universeMode === 'marvel' || this.active;

    // Show Marvel 3D stage groups primarily in Marvel mode
    this.root.visible = isMarvelMode;

    // Toggle Marvel labels so they never clutter NASA mode
    for (const id of this.registeredIds) {
      const entry = this.ctx.registry.get(id);
      if (entry) {
        entry.forceHidden = !isMarvelMode;
      }
    }

    if (!isMarvelMode) return;

    const v0 = stageVisibility(logScale, 0);
    const v1 = stageVisibility(logScale, 1);
    const v2 = stageVisibility(logScale, 2);
    const v3 = stageVisibility(logScale, 3);
    const v4 = stageVisibility(logScale, 4);

    this.group0.visible = v0 > 0.01;
    this.group1.visible = v1 > 0.01;
    this.group2.visible = v2 > 0.01;
    this.group3.visible = v3 > 0.01;
    this.group4.visible = v4 > 0.01;

    // Update Scale 0 positions relative to Earth
    const earthEntry = this.ctx.registry.get('earth');
    const earthCenter = new THREE.Vector3();
    if (earthEntry && earthEntry.getWorldPos) {
      earthEntry.getWorldPos(earthCenter);
    }

    if (this.benatarAnchor) {
      const orbitA = elapsed * 0.45;
      const orbitR = 1.65;
      this.benatarAnchor.position.set(
        earthCenter.x + Math.cos(orbitA) * orbitR,
        earthCenter.y + 0.35 + Math.sin(orbitA * 2) * 0.1,
        earthCenter.z + Math.sin(orbitA) * orbitR
      );
      if (this.benatarMesh) {
        this.benatarMesh.rotation.y = -orbitA + Math.PI / 2;
      }
    }

    if (this.newAsgardAnchor) {
      // Tønsberg, Norway (~59.27°N, 10.41°E) on the rotating Earth sphere (radius 1.0)
      const earthStage = this.ctx.stages && this.ctx.stages[0];
      const earthRotY = earthStage && earthStage.earth && earthStage.earth.mesh
        ? earthStage.earth.mesh.rotation.y
        : 0;
      const lat = (59.27 * Math.PI) / 180;
      const lon = (10.41 * Math.PI) / 180 + earthRotY;
      const r = 1.04;
      this.newAsgardAnchor.position.set(
        earthCenter.x + r * Math.cos(lat) * Math.cos(lon),
        earthCenter.y + r * Math.sin(lat),
        earthCenter.z - r * Math.cos(lat) * Math.sin(lon)
      );
    }

    // Spin planets & megastructures
    for (const item of this.spinMeshes) {
      item.mesh.rotation.y += dt * item.speed;
    }

    // Rotate Nidavellir Dyson Forge rings
    for (const d of this.dysonRings) {
      d.mesh.rotation.x += dt * d.vx;
      d.mesh.rotation.y += dt * d.vy;
    }

    // Pulse Jump Point hexagonal portals
    for (const p of this.jumpPortals) {
      p.rotation.z += dt * 0.65;
    }

    // Swirl Sakaar's Devil's Anus Wormhole
    if (this.wormholeVortex) {
      this.wormholeVortex.rotation.z -= dt * 1.4;
    }

    // Orbit the 6 Infinity Stones around Arishem
    if (this.stoneOrbitGroup) {
      this.stoneOrbitGroup.rotation.y += dt * 0.35;
      for (const s of this.infinityStones) {
        s.rotation.x += dt * 1.2;
        s.rotation.y += dt * 1.5;
      }
    }
  }

  dispose() {
    disposeObject3D(this.root);
    this.ctx.scene.remove(this.root);
  }
}
