/**
 * CameraRig.js — smooth orbit camera that always circles the focused object, with
 * mouse / touch / keyboard input, inertia and cinematic focus transitions.
 */

export class CameraRig {
  constructor(THREE, camera, domElement, callbacks = {}) {
    this.THREE = THREE;
    this.camera = camera;
    this.dom = domElement;
    this.onZoomDelta = callbacks.onZoomDelta || (() => {});
    this.onClick = callbacks.onClick || (() => {});
    this.onInteract = callbacks.onInteract || (() => {});

    this.yaw = -0.9;
    this.pitch = 0.28;
    this.targetYaw = this.yaw;
    this.targetPitch = this.pitch;
    this.distance = 8;

    this.focus = new THREE.Vector3();
    this._from = new THREE.Vector3();
    this._to = new THREE.Vector3();
    this._tmp = new THREE.Vector3();
    this.getFocusPos = (out) => out.set(0, 0, 0);
    this.transitionT = 1;
    this.transitionDuration = 1.8;

    this._pointers = new Map();
    this._dragging = false;
    this._moved = 0;
    this._pinchDist = 0;
    this._bind();
  }

  setFocus(getPos, { instant = false } = {}) {
    this.getFocusPos(this._from);
    this.getFocusPos = getPos;
    if (instant) {
      this.transitionT = 1;
      this.getFocusPos(this.focus);
    } else {
      this.transitionT = 0;
    }
  }

  nudge(yawDelta, pitchDelta) {
    this.targetYaw += yawDelta;
    this.targetPitch = clamp(this.targetPitch + pitchDelta, -1.52, 1.52);
    this.onInteract();
  }

  setAngles(yaw, pitch, instant = false) {
    this.targetYaw = yaw;
    this.targetPitch = clamp(pitch, -1.52, 1.52);
    if (instant) {
      this.yaw = yaw;
      this.pitch = this.targetPitch;
    }
  }

  update(dt, distance) {
    const k = 1 - Math.exp(-dt * 9);
    this.yaw += (this.targetYaw - this.yaw) * k;
    this.pitch += (this.targetPitch - this.pitch) * k;
    this.distance = distance;

    if (this.transitionT < 1) {
      this.transitionT = Math.min(1, this.transitionT + dt / this.transitionDuration);
      const t = this.transitionT;
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      this.getFocusPos(this._to);
      this.focus.lerpVectors(this._from, this._to, ease);
    } else {
      this.getFocusPos(this.focus);
    }

    const cp = Math.cos(this.pitch);
    this._tmp.set(cp * Math.sin(this.yaw), Math.sin(this.pitch), cp * Math.cos(this.yaw)).multiplyScalar(this.distance);
    this.camera.position.copy(this.focus).add(this._tmp);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.focus);
  }

  _bind() {
    const dom = this.dom;
    dom.style.touchAction = 'none';
    dom.addEventListener('pointerdown', (e) => {
      dom.setPointerCapture(e.pointerId);
      this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this._pointers.size === 1) {
        this._dragging = true;
        this._moved = 0;
      } else if (this._pointers.size === 2) {
        this._pinchDist = this._pinchDistance();
      }
    });
    dom.addEventListener('pointermove', (e) => {
      const p = this._pointers.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      if (this._pointers.size === 1 && this._dragging) {
        this._moved += Math.abs(dx) + Math.abs(dy);
        this.targetYaw -= dx * 0.0055;
        this.targetPitch = clamp(this.targetPitch + dy * 0.0055, -1.52, 1.52);
        this.onInteract();
      } else if (this._pointers.size === 2) {
        const d = this._pinchDistance();
        if (this._pinchDist > 0 && d > 0) {
          const ratio = this._pinchDist / d;
          this.onZoomDelta(Math.log(ratio) * 6);
        }
        this._pinchDist = d;
        this.onInteract();
      }
    });
    const end = (e) => {
      const had = this._pointers.has(e.pointerId);
      this._pointers.delete(e.pointerId);
      if (had && this._dragging && this._pointers.size === 0) {
        this._dragging = false;
        if (this._moved < 6) {
          const rect = dom.getBoundingClientRect();
          this.onClick(e.clientX - rect.left, e.clientY - rect.top);
        }
      }
      if (this._pointers.size < 2) this._pinchDist = 0;
    };
    dom.addEventListener('pointerup', end);
    dom.addEventListener('pointercancel', end);
    dom.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const raw = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
        const d = clamp(raw, -120, 120) * 0.022;
        this.onZoomDelta(d);
        this.onInteract();
      },
      { passive: false }
    );
    dom.addEventListener('keydown', (e) => {
      const step = 0.08;
      switch (e.key) {
        case 'ArrowLeft':
          this.nudge(step, 0);
          break;
        case 'ArrowRight':
          this.nudge(-step, 0);
          break;
        case 'ArrowUp':
          this.nudge(0, step);
          break;
        case 'ArrowDown':
          this.nudge(0, -step);
          break;
        case '+':
        case '=':
          this.onZoomDelta(-1.5);
          break;
        case '-':
        case '_':
          this.onZoomDelta(1.5);
          break;
        default:
          return;
      }
      e.preventDefault();
    });
  }

  _pinchDistance() {
    const pts = [...this._pointers.values()];
    if (pts.length < 2) return 0;
    return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  }
}

function clamp(v, a, b) {
  return v < a ? a : v > b ? b : v;
}
