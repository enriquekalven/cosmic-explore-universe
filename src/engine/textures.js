/**
 * textures.js — texture loading (NASA / ESO / Solar System Scope imagery) plus procedural
 * canvas textures used as fallbacks and for bodies that have no public high-resolution maps.
 */

export class TextureKit {
  constructor(THREE, renderer, manager, basePath = './assets/textures/') {
    this.THREE = THREE;
    this.renderer = renderer;
    this.loader = new THREE.TextureLoader(manager);
    this.basePath = basePath;
    this.cache = new Map();
    this.maxAniso = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;
    this.maxTextureSize = renderer ? renderer.capabilities.maxTextureSize : 4096;
  }

  /** Loads an image texture; resolves to null on failure so callers can fall back to procedural art. */
  load(file, { srgb = true, repeat = false } = {}) {
    const key = `file:${file}:${srgb}`;
    if (this.cache.has(key)) return this.cache.get(key);
    const THREE = this.THREE;
    const promise = new Promise((resolve) => {
      this.loader.load(
        this.basePath + file,
        (tex) => {
          tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          tex.anisotropy = Math.min(8, this.maxAniso);
          if (repeat) tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          else tex.wrapS = THREE.RepeatWrapping;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          resolve(tex);
        },
        undefined,
        () => resolve(null)
      );
    });
    this.cache.set(key, promise);
    return promise;
  }

  canvasTexture(canvas, { srgb = true, repeatX = true } = {}) {
    const THREE = this.THREE;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    tex.anisotropy = Math.min(8, this.maxAniso);
    tex.wrapS = repeatX ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  cached(key, maker) {
    if (!this.cache.has(key)) this.cache.set(key, maker());
    return this.cache.get(key);
  }

  // ------------------------------------------------------------------ glow sprites
  glow({ size = 128, inner = 0.08, power = 2.0, spikes = 0, color = '#ffffff' } = {}) {
    return this.cached(`glow:${size}:${inner}:${power}:${spikes}:${color}`, () => {
      const c = makeCanvas(size, size);
      const ctx = c.getContext('2d');
      const r = size / 2;
      const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
      const rgb = hexToRgb(color);
      const stops = 12;
      for (let i = 0; i <= stops; i++) {
        const t = i / stops;
        const a = t < inner ? 1 : Math.pow(1 - (t - inner) / (1 - inner), power);
        grad.addColorStop(t, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(4)})`);
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      if (spikes > 0) {
        ctx.globalCompositeOperation = 'lighter';
        for (let k = 0; k < spikes; k++) {
          const ang = (k / spikes) * Math.PI;
          const lg = ctx.createLinearGradient(r - Math.cos(ang) * r, r - Math.sin(ang) * r, r + Math.cos(ang) * r, r + Math.sin(ang) * r);
          lg.addColorStop(0, 'rgba(255,255,255,0)');
          lg.addColorStop(0.5, 'rgba(255,255,255,0.55)');
          lg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = lg;
          ctx.lineWidth = Math.max(1, size / 110);
          ctx.beginPath();
          ctx.moveTo(r - Math.cos(ang) * r, r - Math.sin(ang) * r);
          ctx.lineTo(r + Math.cos(ang) * r, r + Math.sin(ang) * r);
          ctx.stroke();
        }
      }
      return this.canvasTexture(c, { repeatX: false });
    });
  }

  softDisk(size = 64) {
    return this.cached(`soft:${size}`, () => {
      const c = makeCanvas(size, size);
      const ctx = c.getContext('2d');
      const r = size / 2;
      const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.12)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return this.canvasTexture(c, { repeatX: false });
    });
  }

  corona(size = 512) {
    return this.cached('corona', () => {
      const c = makeCanvas(size, size);
      const ctx = c.getContext('2d');
      const r = size / 2;
      const img = ctx.createImageData(size, size);
      const d = img.data;
      const noise = makeNoise(7);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = (x - r) / r;
          const dy = (y - r) / r;
          const rr = Math.hypot(dx, dy);
          const ang = Math.atan2(dy, dx);
          const rays = 0.55 + 0.45 * noise.fbm(Math.cos(ang) * 3 + 10, Math.sin(ang) * 3 + 10, 3);
          const streamers = Math.pow(Math.max(0, 1 - rr), 2.2) * (0.35 + 0.65 * rays);
          const core = Math.exp(-rr * rr * 18) * 1.2;
          const a = Math.min(1, core + streamers * 0.9);
          const i = (y * size + x) * 4;
          d[i] = 255;
          d[i + 1] = Math.round(225 + 30 * core);
          d[i + 2] = Math.round(150 + 90 * core);
          d[i + 3] = Math.round(a * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
      return this.canvasTexture(c, { repeatX: false });
    });
  }

  // ------------------------------------------------------------------ planets
  planet(spec, seed = 1, size = 512) {
    const key = `planet:${JSON.stringify(spec)}:${seed}:${size}`;
    return this.cached(key, () => {
      const w = size;
      const h = size / 2;
      const c = makeCanvas(w, h);
      const ctx = c.getContext('2d');
      const noise = makeNoise(seed);
      const img = ctx.createImageData(w, h);
      const d = img.data;
      const base = hexToRgb(spec.base || '#999999');
      const accent = hexToRgb(spec.accent || '#444444');
      const kind = spec.kind || 'rocky';
      for (let y = 0; y < h; y++) {
        const v = y / h;
        const lat = (0.5 - v) * Math.PI;
        for (let x = 0; x < w; x++) {
          const u = x / w;
          // periodic sampling around the globe
          const px = Math.cos(u * Math.PI * 2) * 3;
          const py = Math.sin(u * Math.PI * 2) * 3;
          const pz = v * 6;
          let t;
          if (kind === 'gas') {
            const bands = spec.bands || 8;
            const wob = (noise.fbm3(px, py, pz * 0.6, 4) - 0.5) * 0.25;
            const band = 0.5 + 0.5 * Math.sin((v + wob) * Math.PI * bands * 2 + noise.fbm(px, py, 2) * 1.5);
            const fine = noise.fbm3(px * 4, py * 4, pz * 7, 3) * 0.25;
            t = clamp01(band * 0.75 + fine);
            if (spec.storm && Math.hypot((u - 0.68) * 2.2, (v - 0.62) * 3.6) < 0.09) t = Math.min(1, t + 0.45);
          } else if (kind === 'lava') {
            const n = noise.fbm3(px * 2, py * 2, pz * 2, 5);
            t = n > 0.56 ? 1 : n / 0.56 * 0.35;
          } else if (kind === 'ocean') {
            const n = noise.fbm3(px * 1.4, py * 1.4, pz * 1.4, 5);
            t = n > 0.57 ? 1 : 0;
          } else {
            const n = noise.fbm3(px, py, pz, 5);
            const n2 = noise.fbm3(px * 3, py * 3, pz * 3, 3);
            t = clamp01(n * 0.7 + n2 * 0.4 - 0.1);
            if (kind === 'icy') t = clamp01(t * 0.6 + Math.abs(Math.sin(lat)) * 0.15);
          }
          const i = (y * w + x) * 4;
          d[i] = base[0] + (accent[0] - base[0]) * t;
          d[i + 1] = base[1] + (accent[1] - base[1]) * t;
          d[i + 2] = base[2] + (accent[2] - base[2]) * t;
          d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      // Craters
      const s = w / 1024;
      const craters = Math.round((spec.craters || 0) * 420 * s);
      const rnd = mulberry32(seed * 977 + 13);
      for (let k = 0; k < craters; k++) {
        const cx = rnd() * w;
        const cy = h * (0.08 + rnd() * 0.84);
        const cr = (2 + Math.pow(rnd(), 3) * 26) * s;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${0.18 + rnd() * 0.22})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx - cr * 0.25, cy - cr * 0.25, cr * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.08 + rnd() * 0.12})`;
        ctx.fill();
      }
      if (kind === 'icy') {
        ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},0.55)`;
        ctx.lineWidth = Math.max(0.8, 1.2 * s);
        for (let k = 0; k < 70; k++) {
          ctx.beginPath();
          let x0 = rnd() * w;
          let y0 = rnd() * h;
          ctx.moveTo(x0, y0);
          for (let q = 0; q < 6; q++) {
            x0 += (rnd() - 0.5) * 140 * s;
            y0 += (rnd() - 0.5) * 60 * s;
            ctx.lineTo(x0, y0);
          }
          ctx.stroke();
        }
      }
      if (spec.heart) {
        ctx.fillStyle = 'rgba(245,235,225,0.85)';
        ctx.beginPath();
        const hx = w * 0.42;
        const hy = h * 0.56;
        ctx.moveTo(hx, hy + 70 * s);
        ctx.bezierCurveTo(hx - 120 * s, hy - 20 * s, hx - 60 * s, hy - 110 * s, hx, hy - 40 * s);
        ctx.bezierCurveTo(hx + 60 * s, hy - 110 * s, hx + 120 * s, hy - 20 * s, hx, hy + 70 * s);
        ctx.fill();
      }
      return this.canvasTexture(c);
    });
  }

  ringStrip({ bands = [[0.0, 0.08, 0.1], [0.22, 0.26, 0.5], [0.6, 0.63, 0.9], [0.9, 0.94, 0.7]], color = '#dfe9f3' } = {}) {
    return this.cached(`ring:${JSON.stringify(bands)}:${color}`, () => {
      const w = 512;
      const c = makeCanvas(w, 4);
      const ctx = c.getContext('2d');
      const rgb = hexToRgb(color);
      const img = ctx.createImageData(w, 4);
      for (let x = 0; x < w; x++) {
        const t = x / w;
        let a = 0;
        for (const [s, e, al] of bands) if (t >= s && t <= e) a = Math.max(a, al);
        for (let y = 0; y < 4; y++) {
          const i = (y * w + x) * 4;
          img.data[i] = rgb[0];
          img.data[i + 1] = rgb[1];
          img.data[i + 2] = rgb[2];
          img.data[i + 3] = Math.round(a * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
      return this.canvasTexture(c, { repeatX: false });
    });
  }

  habitableRing() {
    return this.cached('hz', () => {
      const w = 256;
      const c = makeCanvas(w, 4);
      const ctx = c.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, 'rgba(74,222,128,0)');
      grad.addColorStop(0.18, 'rgba(74,222,128,0.42)');
      grad.addColorStop(0.5, 'rgba(134,239,172,0.5)');
      grad.addColorStop(0.82, 'rgba(74,222,128,0.42)');
      grad.addColorStop(1, 'rgba(74,222,128,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, 4);
      return this.canvasTexture(c, { repeatX: false });
    });
  }

  // ------------------------------------------------------------------ galaxies & nebulae
  galaxySprite(type = 'spiral', seed = 3, tint = '#ffffff') {
    return this.cached(`galaxy:${type}:${seed}:${tint}`, () => {
      const size = 256;
      const c = makeCanvas(size, size);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'lighter';
      const r = size / 2;
      const rnd = mulberry32(seed * 31 + 7);
      const tintRgb = hexToRgb(tint);
      const core = ctx.createRadialGradient(r, r, 0, r, r, r * (type === 'elliptical' ? 0.95 : 0.3));
      core.addColorStop(0, `rgba(255,245,225,${type === 'elliptical' ? 1 : 0.95})`);
      core.addColorStop(0.25, `rgba(255,225,185,${type === 'elliptical' ? 0.55 : 0.55})`);
      core.addColorStop(0.6, `rgba(${tintRgb[0]},${tintRgb[1]},${tintRgb[2]},${type === 'elliptical' ? 0.18 : 0.14})`);
      core.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, size, size);
      if (type === 'spiral') {
        const arms = 2 + Math.floor(rnd() * 2);
        const pitch = 0.22 + rnd() * 0.1;
        for (let k = 0; k < 7000; k++) {
          const arm = k % arms;
          const dist = Math.pow(rnd(), 0.65) * 0.98;
          const ang = (arm / arms) * Math.PI * 2 + Math.log(1 + dist * 9) / pitch + (rnd() - 0.5) * (0.35 + dist * 0.6);
          const x = r + Math.cos(ang) * dist * r;
          const y = r + Math.sin(ang) * dist * r;
          const young = rnd() < 0.22;
          const a = (1 - dist) * 0.45 + 0.08;
          ctx.fillStyle = young
            ? `rgba(170,200,255,${a})`
            : rnd() < 0.08
              ? `rgba(255,150,190,${a})`
              : `rgba(${tintRgb[0]},${tintRgb[1]},${tintRgb[2]},${a * 0.8})`;
          const s = young ? 1.6 + rnd() * 1.6 : 1 + rnd() * 1.4;
          ctx.beginPath();
          ctx.arc(x, y, s, 0, Math.PI * 2);
          ctx.fill();
        }
        // dust lanes (subtract a little)
        ctx.globalCompositeOperation = 'multiply';
        for (let k = 0; k < 900; k++) {
          const arm = k % arms;
          const dist = 0.15 + Math.pow(rnd(), 0.7) * 0.7;
          const ang = (arm / arms) * Math.PI * 2 + Math.log(1 + dist * 9) / pitch + 0.25 + (rnd() - 0.5) * 0.25;
          ctx.fillStyle = 'rgba(120,90,70,0.9)';
          ctx.beginPath();
          ctx.arc(r + Math.cos(ang) * dist * r, r + Math.sin(ang) * dist * r, 1.5 + rnd() * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = 'lighter';
      } else if (type === 'irregular' || type === 'dwarf') {
        const blobs = type === 'dwarf' ? 3 : 9;
        const ax = r * 0.72; // semi-axes of the stellar cloud
        const ay = r * 0.5;
        for (let b = 0; b < blobs; b++) {
          const t = Math.sqrt(rnd()) * 0.6;
          const ang = rnd() * Math.PI * 2;
          const bx = r + Math.cos(ang) * t * ax;
          const by = r + Math.sin(ang) * t * ay;
          const br = r * (0.15 + rnd() * 0.3);
          const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
          g.addColorStop(0, `rgba(${tintRgb[0]},${tintRgb[1]},${tintRgb[2]},0.45)`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, size, size);
        }
        for (let k = 0; k < 2600; k++) {
          // elliptical cloud, denser toward the centre, no hard edge
          const t = Math.pow(rnd(), 0.75);
          const ang = rnd() * Math.PI * 2;
          const x = r + Math.cos(ang) * t * ax * (0.85 + rnd() * 0.3);
          const y = r + Math.sin(ang) * t * ay * (0.85 + rnd() * 0.3);
          const a = (1 - t * 0.8) * 0.5;
          ctx.fillStyle = rnd() < 0.3 ? `rgba(180,205,255,${a})` : rnd() < 0.1 ? `rgba(255,160,190,${a})` : `rgba(255,240,220,${a * 0.8})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.8 + rnd() * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // circular falloff so the sprite never shows the square canvas edge
      ctx.globalCompositeOperation = 'destination-in';
      const mask = ctx.createRadialGradient(r, r, r * 0.3, r, r, r * 0.92);
      mask.addColorStop(0, 'rgba(0,0,0,1)');
      mask.addColorStop(0.6, 'rgba(0,0,0,0.55)');
      mask.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mask;
      ctx.fillRect(0, 0, size, size);
      return this.canvasTexture(c, { repeatX: false });
    });
  }

  nebula(palette = ['#ff9ab8', '#8ad7ff', '#ffd9a0'], seed = 5) {
    return this.cached(`nebula:${palette.join()}:${seed}`, () => {
      const size = 256;
      const c = makeCanvas(size, size);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, size, size);
      const noise = makeNoise(seed);
      const img = ctx.getImageData(0, 0, size, size);
      const d = img.data;
      const cols = palette.map(hexToRgb);
      const r = size / 2;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = (x - r) / r;
          const dy = (y - r) / r;
          const rr = Math.hypot(dx, dy);
          const mask = Math.pow(Math.max(0, 1 - rr), 1.6);
          const n1 = noise.fbm(x / 38 + seed, y / 38, 5);
          const n2 = noise.fbm(x / 22 + 40, y / 22 + 9, 4);
          const a = clamp01((n1 - 0.32) * 2.1) * mask;
          const mix = clamp01((n2 - 0.3) * 1.8);
          const c0 = cols[0];
          const c1 = cols[1 % cols.length];
          const c2 = cols[2 % cols.length];
          const i = (y * size + x) * 4;
          const hot = Math.exp(-rr * rr * 9) * 0.9;
          d[i] = (c0[0] * (1 - mix) + c1[0] * mix) * a + c2[0] * hot;
          d[i + 1] = (c0[1] * (1 - mix) + c1[1] * mix) * a + c2[1] * hot;
          d[i + 2] = (c0[2] * (1 - mix) + c1[2] * mix) * a + c2[2] * hot;
          d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      const rnd = mulberry32(seed * 11);
      ctx.globalCompositeOperation = 'lighter';
      for (let k = 0; k < 60; k++) {
        const x = r + (rnd() - 0.5) * r * 1.2;
        const y = r + (rnd() - 0.5) * r * 1.2;
        ctx.fillStyle = 'rgba(220,235,255,0.9)';
        ctx.beginPath();
        ctx.arc(x, y, 0.7 + rnd() * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      return this.canvasTexture(c, { repeatX: false });
    });
  }

  cmb() {
    return this.cached('cmb', () => {
      const w = 1024;
      const h = 512;
      const c = makeCanvas(w, h);
      const ctx = c.getContext('2d');
      const noise = makeNoise(2024);
      const img = ctx.createImageData(w, h);
      const d = img.data;
      const ramp = [
        [8, 20, 70],
        [20, 70, 160],
        [60, 160, 220],
        [210, 220, 200],
        [250, 190, 60],
        [230, 90, 30],
        [150, 20, 20]
      ];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const u = x / w;
          const v = y / h;
          const px = Math.cos(u * Math.PI * 2) * 6;
          const py = Math.sin(u * Math.PI * 2) * 6;
          const pz = v * 12;
          const n = clamp01(noise.fbm3(px, py, pz, 6) * 1.5 - 0.25);
          const f = n * (ramp.length - 1);
          const k = Math.min(ramp.length - 2, Math.floor(f));
          const t = f - k;
          const i = (y * w + x) * 4;
          d[i] = ramp[k][0] + (ramp[k + 1][0] - ramp[k][0]) * t;
          d[i + 1] = ramp[k][1] + (ramp[k + 1][1] - ramp[k][1]) * t;
          d[i + 2] = ramp[k][2] + (ramp[k + 1][2] - ramp[k][2]) * t;
          d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return this.canvasTexture(c);
    });
  }
}

// ---------------------------------------------------------------------- helpers
export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((x) => x + x).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function clamp01(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

export function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Cheap value noise with fBm in 2D and 3D. */
export function makeNoise(seed = 1) {
  const perm = new Uint8Array(512);
  const rnd = mulberry32(seed);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = new Float32Array(256);
  for (let i = 0; i < 256; i++) grad[i] = rnd();
  const fade = (t) => t * t * (3 - 2 * t);
  function val2(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const h = (i, j) => grad[perm[(perm[(i & 255)] + (j & 255)) & 255]];
    const u = fade(xf);
    const v = fade(yf);
    const a = h(xi, yi) * (1 - u) + h(xi + 1, yi) * u;
    const b = h(xi, yi + 1) * (1 - u) + h(xi + 1, yi + 1) * u;
    return a * (1 - v) + b * v;
  }
  function val3(x, y, z) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    const xf = x - xi;
    const yf = y - yi;
    const zf = z - zi;
    const h = (i, j, k) => grad[perm[(perm[(perm[i & 255] + (j & 255)) & 255] + (k & 255)) & 255]];
    const u = fade(xf);
    const v = fade(yf);
    const w = fade(zf);
    const lerp = (a, b, t) => a + (b - a) * t;
    const x00 = lerp(h(xi, yi, zi), h(xi + 1, yi, zi), u);
    const x10 = lerp(h(xi, yi + 1, zi), h(xi + 1, yi + 1, zi), u);
    const x01 = lerp(h(xi, yi, zi + 1), h(xi + 1, yi, zi + 1), u);
    const x11 = lerp(h(xi, yi + 1, zi + 1), h(xi + 1, yi + 1, zi + 1), u);
    return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w);
  }
  return {
    fbm(x, y, octaves = 4) {
      let amp = 0.5;
      let sum = 0;
      let norm = 0;
      for (let o = 0; o < octaves; o++) {
        sum += val2(x, y) * amp;
        norm += amp;
        x *= 2.03;
        y *= 2.03;
        amp *= 0.5;
      }
      return sum / norm;
    },
    fbm3(x, y, z, octaves = 4) {
      let amp = 0.5;
      let sum = 0;
      let norm = 0;
      for (let o = 0; o < octaves; o++) {
        sum += val3(x, y, z) * amp;
        norm += amp;
        x *= 2.03;
        y *= 2.03;
        z *= 2.03;
        amp *= 0.5;
      }
      return sum / norm;
    }
  };
}
