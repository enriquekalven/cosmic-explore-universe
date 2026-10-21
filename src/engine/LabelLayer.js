/**
 * LabelLayer.js — DOM labels & markers projected over the WebGL canvas (NASA-Eyes style).
 * Built with createElement/textContent only (no innerHTML) per the project's security rules.
 */

export class LabelLayer {
  constructor(THREE, container, { onPick, onHover } = {}) {
    this.THREE = THREE;
    this.container = container;
    this.onPick = onPick || (() => {});
    this.onHover = onHover || (() => {});
    this.entries = new Map();
    this.enabled = true;
    this.focusedId = null;
    this._v = new THREE.Vector3();
    this._placed = [];
  }

  add(def) {
    if (this.entries.has(def.id)) this.remove(def.id);
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `cl cl-${def.kind || 'poi'}`;
    el.dataset.id = def.id;
    el.setAttribute('aria-label', `Fly to ${def.name}`);
    const dot = document.createElement('span');
    dot.className = 'cl-dot';
    if (def.color) {
      dot.style.background = def.color;
      dot.style.boxShadow = `0 0 8px ${def.color}`;
    }
    const text = document.createElement('span');
    text.className = 'cl-text';
    const name = document.createElement('b');
    name.textContent = def.name;
    text.appendChild(name);
    if (def.sub) {
      const sub = document.createElement('small');
      sub.textContent = def.sub;
      text.appendChild(sub);
    }
    el.appendChild(dot);
    el.appendChild(text);
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onPick(def.id);
    });
    el.addEventListener('pointerenter', () => this.onHover(def.id));
    el.addEventListener('pointerleave', () => this.onHover(null));
    el.style.display = 'none';
    this.container.appendChild(el);
    const entry = {
      ...def,
      el,
      dot,
      text,
      visible: false,
      lastX: NaN,
      lastY: NaN,
      width: 0,
      height: 0,
      def
    };
    this.entries.set(def.id, entry);
    return entry;
  }

  setSub(id, sub) {
    const e = this.entries.get(id);
    if (!e) return;
    let small = e.text.querySelector('small');
    if (!small) {
      small = document.createElement('small');
      e.text.appendChild(small);
    }
    small.textContent = sub;
  }

  remove(id) {
    const e = this.entries.get(id);
    if (!e) return;
    e.el.remove();
    this.entries.delete(id);
  }

  setEnabled(v) {
    this.enabled = v;
    if (!v) {
      for (const e of this.entries.values()) this._hide(e);
    }
  }

  _hide(e) {
    if (e.visible) {
      e.el.style.display = 'none';
      e.visible = false;
    }
  }

  update(camera, zoom, width, height) {
    if (!this.enabled) return;
    const v = this._v;
    const halfH = height / 2;
    const focal = halfH / Math.tan((camera.fov * Math.PI) / 360);
    const candidates = [];
    for (const e of this.entries.values()) {
      const d = e.def;
      let alpha = d.alphaOverride != null ? d.alphaOverride : d.alpha ? d.alpha(zoom) : 1;
      if (e.id === this.focusedId) alpha = Math.max(alpha, 0.95);
      if (alpha <= 0.02) {
        this._hide(e);
        continue;
      }
      d.getWorldPos(v);
      v.applyMatrix4(camera.matrixWorldInverse);
      const depth = -v.z;
      if (depth <= 0) {
        this._hide(e);
        continue;
      }
      const sx = width / 2 + (v.x / depth) * focal;
      const sy = height / 2 - (v.y / depth) * focal;
      if (sx < 4 || sx > width - 4 || sy < 4 || sy > height - 4) {
        this._hide(e);
        continue;
      }
      const radius = d.radius ? d.radius() : 0;
      const appPx = (radius / depth) * focal;
      if (appPx > height * 0.42 && e.id !== this.focusedId) {
        this._hide(e);
        continue;
      }
      candidates.push({ e, sx, sy, appPx, alpha, depth });
    }

    candidates.sort((a, b) => {
      const fa = a.e.id === this.focusedId ? 1 : 0;
      const fb = b.e.id === this.focusedId ? 1 : 0;
      if (fa !== fb) return fb - fa;
      const pa = a.e.def.priority ?? 1;
      const pb = b.e.def.priority ?? 1;
      if (pa !== pb) return pb - pa;
      return a.depth - b.depth;
    });

    const placed = this._placed;
    placed.length = 0;
    for (const c of candidates) {
      const { e } = c;
      const showDot = c.appPx < 4.5;
      const offset = Math.max(c.appPx, showDot ? 5 : 0) + 8;
      const lx = c.sx + offset;
      const ly = c.sy;
      const w = e.width || 120;
      const h = e.height || 22;
      const rect = { x: lx, y: ly - h / 2, w, h };
      let overlaps = false;
      for (const p of placed) {
        if (rect.x < p.x + p.w && rect.x + rect.w > p.x && rect.y < p.y + p.h && rect.y + rect.h > p.y) {
          overlaps = true;
          break;
        }
      }
      if (overlaps && e.id !== this.focusedId) {
        this._hide(e);
        continue;
      }
      placed.push(rect);
      if (!e.visible) {
        e.el.style.display = '';
        e.visible = true;
      }
      if (!(Math.abs(e.lastX - c.sx) <= 0.25 && Math.abs(e.lastY - c.sy) <= 0.25)) {
        e.el.style.transform = `translate3d(${c.sx.toFixed(1)}px, ${c.sy.toFixed(1)}px, 0)`;
        e.lastX = c.sx;
        e.lastY = c.sy;
      }
      const op = Math.min(1, c.alpha).toFixed(2);
      if (e.lastOp !== op) {
        e.el.style.opacity = op;
        e.lastOp = op;
      }
      const textOffset = `${offset.toFixed(0)}px`;
      if (e.lastOffset !== textOffset) {
        e.text.style.marginLeft = textOffset;
        e.lastOffset = textOffset;
      }
      const dotDisplay = showDot ? '' : 'none';
      if (e.lastDot !== dotDisplay) {
        e.dot.style.display = dotDisplay;
        e.lastDot = dotDisplay;
      }
      const focused = e.id === this.focusedId;
      if (e.lastFocused !== focused) {
        e.el.classList.toggle('is-focused', focused);
        e.lastFocused = focused;
      }
      if (!e.width) {
        e.width = e.text.offsetWidth + 14;
        e.height = e.text.offsetHeight + 6;
      }
    }
  }
}
