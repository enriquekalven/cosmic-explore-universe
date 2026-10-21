/**
 * shaders.js — physically-inspired custom materials.
 * All lighting is evaluated in each body's local space (sun direction & camera position are passed
 * as uniforms), which keeps float precision perfect even for exoplanets trillions of km away.
 * Every shader includes the logarithmic-depth chunks so the scene can span 10^0 … 10^20 units.
 */

const LOG_VERT_PARS = `
#include <common>
#include <logdepthbuf_pars_vertex>
`;
const LOG_VERT = `#include <logdepthbuf_vertex>`;
const LOG_FRAG_PARS = `
#include <common>
#include <logdepthbuf_pars_fragment>
`;
const LOG_FRAG = `#include <logdepthbuf_fragment>`;
const OUTPUT_FRAG = `
#include <tonemapping_fragment>
#include <colorspace_fragment>
`;

export const PLANET_VERTEX = `
${LOG_VERT_PARS}
varying vec2 vUv;
varying vec3 vNormalL;
varying vec3 vPosL;
void main() {
  vUv = uv;
  vNormalL = normalize(normal);
  vPosL = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  ${LOG_VERT}
}
`;

export const PLANET_FRAGMENT = `
${LOG_FRAG_PARS}
uniform sampler2D map;
uniform vec3 sunDirL;
uniform vec3 camPosL;
uniform float ambient;
uniform float exposure;
uniform vec3 tint;
#ifdef USE_NIGHT
uniform sampler2D nightMap;
uniform float nightStrength;
#endif
#ifdef USE_SPEC
uniform sampler2D specMap;
uniform float specStrength;
uniform float shininess;
#endif
#ifdef USE_HAZE
uniform vec3 hazeColor;
uniform float hazeStrength;
#endif
#ifdef USE_LIMB
uniform float limbStrength;
#endif
#ifdef USE_RINGSHADOW
uniform sampler2D ringMap;
uniform float ringInner;
uniform float ringOuter;
#endif
varying vec2 vUv;
varying vec3 vNormalL;
varying vec3 vPosL;

void main() {
  ${LOG_FRAG}
  vec3 N = normalize(vNormalL);
  vec3 L = normalize(sunDirL);
  vec3 V = normalize(camPosL - vPosL);
  float ndl = dot(N, L);
  float ndv = max(dot(N, V), 0.0);
  vec3 albedo = texture2D(map, vUv).rgb * tint;
  float light = max(ndl, 0.0);
  // soften the terminator a little, like real scattering does
  light = smoothstep(0.0, 1.0, light * 1.08);
#ifdef USE_RINGSHADOW
  if (abs(L.y) > 1e-4) {
    float t = -vPosL.y / L.y;
    if (t > 0.0) {
      vec3 hit = vPosL + L * t;
      float r = length(hit.xz);
      if (r > ringInner && r < ringOuter) {
        float a = texture2D(ringMap, vec2((r - ringInner) / (ringOuter - ringInner), 0.5)).a;
        light *= 1.0 - a * 0.9;
      }
    }
  }
#endif
#ifdef USE_LIMB
  light *= mix(1.0, pow(ndv, 0.45), limbStrength);
#endif
  vec3 color = albedo * (light * exposure + ambient);
#ifdef USE_SPEC
  float specMask = texture2D(specMap, vUv).r;
  vec3 H = normalize(L + V);
  float sp = pow(max(dot(N, H), 0.0), shininess) * specMask * specStrength * smoothstep(0.0, 0.12, ndl);
  color += vec3(1.0, 0.96, 0.88) * sp;
#endif
#ifdef USE_NIGHT
  float dayF = smoothstep(-0.14, 0.16, ndl);
  vec3 night = texture2D(nightMap, vUv).rgb;
  color += night * (1.0 - dayF) * nightStrength;
#endif
#ifdef USE_HAZE
  float fres = pow(1.0 - ndv, 2.4);
  float dayHaze = smoothstep(-0.3, 0.35, ndl);
  vec3 terminatorTint = mix(vec3(1.0, 0.42, 0.18), hazeColor, smoothstep(-0.08, 0.3, ndl));
  color += terminatorTint * fres * hazeStrength * (0.06 + 0.94 * dayHaze);
#endif
  gl_FragColor = vec4(color, 1.0);
  ${OUTPUT_FRAG}
}
`;

export const ATMOSPHERE_VERTEX = `
${LOG_VERT_PARS}
varying vec3 vNormalL;
varying vec3 vPosL;
void main() {
  vNormalL = normalize(normal);
  vPosL = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  ${LOG_VERT}
}
`;

export const ATMOSPHERE_FRAGMENT = `
${LOG_FRAG_PARS}
uniform vec3 color;
uniform float strength;
uniform float falloff;
uniform vec3 sunDirL;
uniform vec3 camPosL;
varying vec3 vNormalL;
varying vec3 vPosL;
void main() {
  ${LOG_FRAG}
  vec3 N = normalize(vNormalL);
  vec3 V = normalize(camPosL - vPosL);
  // back faces: the visible normal points away from the viewer; the limb is where dot → 0
  float rim = pow(clamp(1.0 + dot(N, V), 0.0, 1.0), falloff);
  float sun = 0.22 + 0.78 * smoothstep(-0.45, 0.35, dot(N, normalize(sunDirL)));
  vec3 c = color * rim * strength * sun;
  gl_FragColor = vec4(c, rim * sun);
  ${OUTPUT_FRAG}
}
`;

export const RING_VERTEX = `
${LOG_VERT_PARS}
varying vec3 vPosL;
void main() {
  vPosL = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  ${LOG_VERT}
}
`;

export const RING_FRAGMENT = `
${LOG_FRAG_PARS}
uniform sampler2D ringMap;
uniform float inner;
uniform float outer;
uniform vec3 sunDirL;
uniform vec3 camPosL;
uniform float opacity;
varying vec3 vPosL;
void main() {
  ${LOG_FRAG}
  float r = length(vPosL.xz);
  float t = (r - inner) / (outer - inner);
  if (t < 0.0 || t > 1.0) discard;
  vec4 tex = texture2D(ringMap, vec2(t, 0.5));
  vec3 L = normalize(sunDirL);
  float lit = abs(L.y);
  bool camAbove = camPosL.y > 0.0;
  bool sunAbove = L.y > 0.0;
  float sameSide = (camAbove == sunAbove) ? 1.0 : 0.5;
  // planet shadow (unit sphere at origin in planet-local units)
  float b = dot(vPosL, L);
  float c = dot(vPosL, vPosL) - 1.0;
  float disc = b * b - c;
  float shadow = 1.0;
  if (disc > 0.0 && (-b - sqrt(disc)) > 0.0) {
    shadow = mix(1.0, 0.06, clamp(disc / 0.025, 0.0, 1.0));
  }
  // forward scattering makes the unlit face glow faintly
  vec3 col = tex.rgb * (lit * 1.25 * sameSide * shadow + 0.035);
  gl_FragColor = vec4(col, tex.a * opacity);
  ${OUTPUT_FRAG}
}
`;

export const SUN_VERTEX = `
${LOG_VERT_PARS}
varying vec2 vUv;
varying vec3 vNormalL;
varying vec3 vPosL;
void main() {
  vUv = uv;
  vNormalL = normalize(normal);
  vPosL = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  ${LOG_VERT}
}
`;

export const SUN_FRAGMENT = `
${LOG_FRAG_PARS}
uniform sampler2D map;
uniform vec3 camPosL;
uniform float intensity;
uniform float time;
uniform vec3 tint;
varying vec2 vUv;
varying vec3 vNormalL;
varying vec3 vPosL;
void main() {
  ${LOG_FRAG}
  vec3 N = normalize(vNormalL);
  vec3 V = normalize(camPosL - vPosL);
  float ndv = max(dot(N, V), 0.0);
  vec2 uv = vUv + vec2(time * 0.0025, 0.0);
  vec3 tex = texture2D(map, uv).rgb;
  vec3 tex2 = texture2D(map, vUv * 2.0 + vec2(-time * 0.004, time * 0.0015)).rgb;
  vec3 granules = mix(tex, tex2, 0.35);
  float limb = 0.55 + 0.45 * pow(ndv, 0.6);
  vec3 col = granules * limb * intensity * tint;
  col += tint * vec3(1.0, 0.8, 0.5) * pow(1.0 - ndv, 3.0) * 0.6 * intensity;
  gl_FragColor = vec4(col, 1.0);
  ${OUTPUT_FRAG}
}
`;

export const POINTS_VERTEX = `
${LOG_VERT_PARS}
attribute float aSize;
attribute vec3 aColor;
varying vec3 vColor;
uniform float uPixelRatio;
uniform float uScale;
uniform float uWorldScale;
uniform float uAttenuate;
uniform float uMinPx;
uniform float uMaxPx;
void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float px = aSize * uPixelRatio;
  if (uAttenuate > 0.5) {
    px = aSize * uWorldScale * uScale / max(1e-6, -mv.z) * uPixelRatio;
  }
  gl_PointSize = clamp(px, uMinPx * uPixelRatio, uMaxPx * uPixelRatio);
  ${LOG_VERT}
}
`;

export const POINTS_FRAGMENT = `
${LOG_FRAG_PARS}
uniform sampler2D uMap;
uniform float uOpacity;
varying vec3 vColor;
void main() {
  ${LOG_FRAG}
  vec4 t = texture2D(uMap, gl_PointCoord);
  gl_FragColor = vec4(vColor * t.rgb, t.a * uOpacity);
  ${OUTPUT_FRAG}
}
`;

export const HELIOSPHERE_FRAGMENT = `
${LOG_FRAG_PARS}
uniform vec3 color;
uniform float opacity;
uniform vec3 camPosL;
varying vec3 vNormalL;
varying vec3 vPosL;
void main() {
  ${LOG_FRAG}
  vec3 N = normalize(vNormalL);
  vec3 V = normalize(camPosL - vPosL);
  float f = pow(1.0 - abs(dot(N, V)), 2.5);
  gl_FragColor = vec4(color * (0.4 + f), (0.08 + f) * opacity);
  ${OUTPUT_FRAG}
}
`;

/** Factory helpers ------------------------------------------------------------------ */
export function makePlanetMaterial(THREE, opts) {
  const defines = {};
  const uniforms = {
    map: { value: opts.map },
    sunDirL: { value: new THREE.Vector3(1, 0, 0) },
    camPosL: { value: new THREE.Vector3(0, 0, 5) },
    ambient: { value: opts.ambient ?? 0.012 },
    exposure: { value: opts.exposure ?? 1.25 },
    tint: { value: new THREE.Color(opts.tint || '#ffffff') }
  };
  if (opts.nightMap) {
    defines.USE_NIGHT = '';
    uniforms.nightMap = { value: opts.nightMap };
    uniforms.nightStrength = { value: opts.nightStrength ?? 1.4 };
  }
  if (opts.specMap) {
    defines.USE_SPEC = '';
    uniforms.specMap = { value: opts.specMap };
    uniforms.specStrength = { value: opts.specStrength ?? 0.9 };
    uniforms.shininess = { value: opts.shininess ?? 48 };
  }
  if (opts.haze) {
    defines.USE_HAZE = '';
    uniforms.hazeColor = { value: new THREE.Color(opts.haze.color) };
    uniforms.hazeStrength = { value: opts.haze.strength };
  }
  if (opts.limb) {
    defines.USE_LIMB = '';
    uniforms.limbStrength = { value: opts.limb };
  }
  if (opts.ringShadow) {
    defines.USE_RINGSHADOW = '';
    uniforms.ringMap = { value: opts.ringShadow.map };
    uniforms.ringInner = { value: opts.ringShadow.inner };
    uniforms.ringOuter = { value: opts.ringShadow.outer };
  }
  return new THREE.ShaderMaterial({
    defines,
    uniforms,
    vertexShader: PLANET_VERTEX,
    fragmentShader: PLANET_FRAGMENT
  });
}

export function makeAtmosphereMaterial(THREE, { color, strength = 1, falloff = 3.2 }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      strength: { value: strength },
      falloff: { value: falloff },
      sunDirL: { value: new THREE.Vector3(1, 0, 0) },
      camPosL: { value: new THREE.Vector3(0, 0, 5) }
    },
    vertexShader: ATMOSPHERE_VERTEX,
    fragmentShader: ATMOSPHERE_FRAGMENT,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}

export function makeRingMaterial(THREE, { map, inner, outer, opacity = 1 }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      ringMap: { value: map },
      inner: { value: inner },
      outer: { value: outer },
      opacity: { value: opacity },
      sunDirL: { value: new THREE.Vector3(1, 0, 0) },
      camPosL: { value: new THREE.Vector3(0, 5, 5) }
    },
    vertexShader: RING_VERTEX,
    fragmentShader: RING_FRAGMENT,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false
  });
}

export function makeSunMaterial(THREE, { map, intensity = 2.6, tint = '#ffffff' }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      map: { value: map },
      camPosL: { value: new THREE.Vector3(0, 0, 5) },
      intensity: { value: intensity },
      time: { value: 0 },
      tint: { value: new THREE.Color(tint) }
    },
    vertexShader: SUN_VERTEX,
    fragmentShader: SUN_FRAGMENT
  });
}

export function makePointsMaterial(THREE, { map, attenuate = false, opacity = 1, minPx = 1, maxPx = 64, blending }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: map },
      uOpacity: { value: opacity },
      uPixelRatio: { value: 1 },
      uScale: { value: 1 },
      uWorldScale: { value: 1 },
      uAttenuate: { value: attenuate ? 1 : 0 },
      uMinPx: { value: minPx },
      uMaxPx: { value: maxPx }
    },
    vertexShader: POINTS_VERTEX,
    fragmentShader: POINTS_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: blending ?? THREE.AdditiveBlending
  });
}

export function makeHeliosphereMaterial(THREE, { color, opacity = 0.5 }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      opacity: { value: opacity },
      camPosL: { value: new THREE.Vector3(0, 0, 5) }
    },
    vertexShader: ATMOSPHERE_VERTEX,
    fragmentShader: HELIOSPHERE_FRAGMENT,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}
