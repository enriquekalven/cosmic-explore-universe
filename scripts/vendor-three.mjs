#!/usr/bin/env node
/**
 * Vendors a pinned copy of three.js (MIT) into ./vendor/three so the site is fully static,
 * works offline, and needs no CDN or inline <script type="importmap"> (keeps CSP strict).
 *
 * Usage:  npm run vendor      (requires network once; the result is committed to the repo)
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const THREE_VERSION = '0.186.1';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const stage = join(root, '.vendor-stage');
const target = join(root, 'vendor', 'three');

const ADDONS = [
  'examples/jsm/postprocessing/EffectComposer.js',
  'examples/jsm/postprocessing/RenderPass.js',
  'examples/jsm/postprocessing/ShaderPass.js',
  'examples/jsm/postprocessing/MaskPass.js',
  'examples/jsm/postprocessing/Pass.js',
  'examples/jsm/postprocessing/UnrealBloomPass.js',
  'examples/jsm/postprocessing/OutputPass.js',
  'examples/jsm/shaders/CopyShader.js',
  'examples/jsm/shaders/LuminosityHighPassShader.js',
  'examples/jsm/shaders/OutputShader.js'
];

rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
writeFileSync(join(stage, 'package.json'), JSON.stringify({ name: 'vendor-stage', private: true }));
console.log(`Installing three@${THREE_VERSION} into staging dir…`);
execSync(`npm install --no-audit --no-fund --silent three@${THREE_VERSION}`, { cwd: stage, stdio: 'inherit' });

const pkgDir = join(stage, 'node_modules', 'three');
rmSync(target, { recursive: true, force: true });
mkdirSync(join(target, 'build'), { recursive: true });
cpSync(join(pkgDir, 'build', 'three.module.js'), join(target, 'build', 'three.module.js'));
cpSync(join(pkgDir, 'build', 'three.core.js'), join(target, 'build', 'three.core.js'));
cpSync(join(pkgDir, 'LICENSE'), join(target, 'LICENSE'));
for (const rel of ADDONS) {
  const dest = join(target, rel);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(join(pkgDir, rel), dest);
}

// Rewrite bare specifier imports ("three") to relative paths so no import map is required.
function rewrite(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      rewrite(full);
      continue;
    }
    if (!full.endsWith('.js') || full.includes(`${join('vendor', 'three', 'build')}`)) continue;
    let relToBuild = relative(dirname(full), join(target, 'build', 'three.module.js')).split('\\').join('/');
    if (!relToBuild.startsWith('.')) relToBuild = './' + relToBuild;
    const before = readFileSync(full, 'utf8');
    const after = before.replace(/from\s+(['"])three\1/g, `from '${relToBuild}'`);
    if (after !== before) writeFileSync(full, after);
  }
}
rewrite(target);
writeFileSync(
  join(target, 'VERSION.txt'),
  `three.js ${THREE_VERSION} (MIT) — vendored by scripts/vendor-three.mjs; bare 'three' imports rewritten to relative paths.\n`
);
rmSync(stage, { recursive: true, force: true });
console.log(`✓ Vendored three@${THREE_VERSION} into ${relative(root, target)}`);
if (!existsSync(join(target, 'build', 'three.module.js'))) process.exit(1);
