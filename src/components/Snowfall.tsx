import React, { useEffect } from "react";

/**
 * Snowfall singleton component
 *
 * Guarantees:
 * - A single shared canvas is attached to document.body on first mount and persists.
 * - Particle state is preserved (saved into window.__snowfallState on unload) and attempted to be rehydrated.
 * - Resizes scale existing particle positions instead of throwing them away.
 * - Options may be passed on mount; subsequent mounts will update options without restarting the animation.
 * - Reduced-motion users get a static fallback.
 *
 * Type-safety: the singleton object is fully constructed before any field accesses to avoid `undefined` reads.
 */

/* -------- Types -------- */

type SnowOptions = {
  count?: number; // desired target count (base before adaptive scaling)
  color?: string;
  opacity?: number;
  sizeMin?: number;
  sizeMax?: number;
  speed?: number;
  wind?: number;
  zIndex?: number;
};

type Flake = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  swing: number;
  swingPhase: number;
};

type SnowSingletonType = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  rafId: number | null;
  flakes: Flake[];
  opts: Required<SnowOptions>;
  width: number;
  height: number;
  dpr: number;
  running: boolean;
  lastTime: number;
  refCount: number;
  start: () => void;
  stop: () => void;
  resize: () => void;
  updateOptions: (o: Partial<SnowOptions>) => void;
};

declare global {
  interface Window {
    __snowfallSingleton?: SnowSingletonType;
    __snowfallState?: {
      flakes: Flake[];
      size: { w: number; h: number; dpr: number };
      ts: number;
    };
    __snowMouseX?: number;
    __snowMouseY?: number;
    __snowMouseActive?: boolean;
  }
}

/* -------- Defaults -------- */

const DEFAULTS: Required<SnowOptions> = {
  count: 140,
  color: "#ffffff",
  opacity: 0.32,
  sizeMin: 2.6,
  sizeMax: 7.0,
  speed: 1.05,
  wind: 0.18,
  zIndex: -1,
};

/* -------- Singleton factory -------- */

function createOrGetSingleton(
  initialOpts: Partial<SnowOptions> = {},
): SnowSingletonType | null {
  if (typeof window === "undefined" || typeof document === "undefined")
    return null;

  if (window.__snowfallSingleton) {
    // merge options and return
    window.__snowfallSingleton.updateOptions(initialOpts);
    window.__snowfallSingleton.refCount++;
    return window.__snowfallSingleton;
  }

  // Respect reduced motion setting
  const prefersReduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // Build canvas element (we will append to body)
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: String(initialOpts.zIndex ?? DEFAULTS.zIndex),
    top: "0",
    left: "0",
  });

  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // Create the fully initialized singleton object before using it anywhere
  const singleton: SnowSingletonType = {
    canvas,
    ctx,
    rafId: null,
    flakes: [],
    opts: { ...DEFAULTS, ...initialOpts } as Required<SnowOptions>,
    width: Math.max(window.innerWidth, 1),
    height: Math.max(window.innerHeight, 1),
    dpr: Math.max(1, window.devicePixelRatio || 1),
    running: false,
    lastTime: performance.now(),
    refCount: 1,
    start: () => {},
    stop: () => {},
    resize: () => {},
    updateOptions: () => {},
  };

  // Helper: compute adaptive count based on viewport area so large monitors get more flakes
  const computeAdaptiveCount = (baseCount: number, w: number, h: number) => {
    // reference area ~ 1366x768
    const refArea = 1366 * 768;
    const area = Math.max(1, w * h);
    // scale factor: sqrt(area / refArea) so scaling is moderate
    const scale = Math.sqrt(area / refArea);
    const scaled = Math.round(baseCount * scale);
    // clamp
    return Math.min(
      Math.max(scaled, Math.floor(baseCount * 0.6)),
      Math.max(baseCount, 420),
    );
  };

  // Flake factory (uses current singleton.opts)
  const makeFlake = (w: number, h: number, dpr: number): Flake => {
    const r =
      Math.random() * (singleton.opts.sizeMax - singleton.opts.sizeMin) +
      singleton.opts.sizeMin;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r,
      vx: (Math.random() - 0.5) * 0.6 * singleton.opts.wind * dpr,
      vy: (0.2 + Math.random() * 0.9) * singleton.opts.speed * dpr,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      swing: 0.6 + Math.random() * 1.8,
      swingPhase: Math.random() * Math.PI * 2,
    };
  };

  // Initialize canvas sizing and flakes (try rehydrate if present)
  const init = () => {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.max(window.innerWidth, 1);
    const h = Math.max(window.innerHeight, 1);
    singleton.dpr = dpr;
    singleton.width = w;
    singleton.height = h;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Try to rehydrate previous particle state, but scale to current size
    try {
      const saved = window.__snowfallState;
      if (saved && Array.isArray(saved.flakes) && saved.size) {
        const prevW = saved.size.w || w;
        const prevH = saved.size.h || h;
        const sx = w / prevW;
        const sy = h / prevH;
        singleton.flakes = saved.flakes.map((f) => ({
          x: (f.x ?? Math.random() * prevW) * sx,
          y: (f.y ?? Math.random() * prevH) * sy,
          r: Math.max(
            singleton.opts.sizeMin,
            Math.min(singleton.opts.sizeMax, f.r ?? singleton.opts.sizeMin),
          ),
          vx: (f.vx ?? 0) * sx,
          vy: (f.vy ?? 0) * sy,
          rot: f.rot ?? Math.random() * Math.PI * 2,
          rotSpeed: f.rotSpeed ?? (Math.random() - 0.5) * 0.03,
          swing: f.swing ?? 0.6 + Math.random() * 1.8,
          swingPhase: f.swingPhase ?? Math.random() * Math.PI * 2,
        }));
      }
    } catch {
      /* ignore */
    }

    // ensure we have the desired (adaptive) count
    const target = computeAdaptiveCount(singleton.opts.count, w, h);
    while (singleton.flakes.length < target)
      singleton.flakes.push(makeFlake(w, h, dpr));
    if (singleton.flakes.length > target) singleton.flakes.length = target;
  };

  // Resize handler scales existing particles
  const resize = () => {
    const prevW = singleton.width || Math.max(window.innerWidth, 1);
    const prevH = singleton.height || Math.max(window.innerHeight, 1);
    const newW = Math.max(window.innerWidth, 1);
    const newH = Math.max(window.innerHeight, 1);
    const newDpr = Math.max(1, window.devicePixelRatio || 1);

    const sx = newW / prevW;
    const sy = newH / prevH;

    singleton.width = newW;
    singleton.height = newH;
    singleton.dpr = newDpr;

    canvas.width = Math.floor(newW * newDpr);
    canvas.height = Math.floor(newH * newDpr);
    canvas.style.width = `${newW}px`;
    canvas.style.height = `${newH}px`;
    ctx?.setTransform(newDpr, 0, 0, newDpr, 0, 0);

    singleton.flakes.forEach((f) => {
      f.x = f.x * sx;
      f.y = f.y * sy;
      f.vx = f.vx * sx;
      f.vy = f.vy * sy;
    });

    // ensure count adapts to new size
    const target = computeAdaptiveCount(singleton.opts.count, newW, newH);
    while (singleton.flakes.length < target)
      singleton.flakes.push(makeFlake(newW, newH, newDpr));
    if (singleton.flakes.length > target) singleton.flakes.length = target;
  };

  // Draw one snowflake
  const drawFlake = (cx: CanvasRenderingContext2D, f: Flake, color: string) => {
    const size = Math.max(1.2, f.r * 1.2);
    cx.save();
    cx.translate(f.x, f.y);
    cx.rotate(f.rot);
    cx.lineWidth = Math.max(0.7, size * 0.14);
    cx.lineCap = "round";
    cx.strokeStyle = color;
    cx.beginPath();
    for (let b = 0; b < 6; b++) {
      const ang = (b / 6) * Math.PI * 2;
      cx.moveTo(0, 0);
      cx.lineTo(Math.cos(ang) * size, Math.sin(ang) * size);
      const mx = Math.cos(ang) * size * 0.55;
      const my = Math.sin(ang) * size * 0.55;
      const side = size * 0.22;
      cx.moveTo(mx, my);
      cx.lineTo(
        mx + Math.cos(ang + 0.45) * side,
        my + Math.sin(ang + 0.45) * side,
      );
      cx.moveTo(mx, my);
      cx.lineTo(
        mx + Math.cos(ang - 0.45) * side,
        my + Math.sin(ang - 0.45) * side,
      );
    }
    cx.stroke();
    cx.fillStyle = color;
    cx.beginPath();
    cx.arc(0, 0, Math.max(0.5, size * 0.14), 0, Math.PI * 2);
    cx.fill();
    cx.restore();
  };

  // Animation step
  const step = (now: number, singletonRef: SnowSingletonType) => {
    if (!singletonRef.ctx) return;
    const cx = singletonRef.ctx;
    const dt = Math.max(0, Math.min(40, now - singletonRef.lastTime)) / 16.6667;
    singletonRef.lastTime = now;

    const w = singletonRef.width;
    const h = singletonRef.height;

    cx.clearRect(0, 0, w, h);
    cx.globalCompositeOperation = "source-over";
    cx.globalAlpha = Math.max(0, Math.min(1, singletonRef.opts.opacity));

    // ensure count stays adaptive (in case opts updated)
    const desired = computeAdaptiveCount(singletonRef.opts.count, w, h);
    if (singletonRef.flakes.length < desired) {
      for (let i = singletonRef.flakes.length; i < desired; i++)
        singletonRef.flakes.push(makeFlake(w, h, singletonRef.dpr));
    } else if (singletonRef.flakes.length > desired) {
      singletonRef.flakes.splice(desired, singletonRef.flakes.length - desired);
    }

    for (let i = 0; i < singletonRef.flakes.length; i++) {
      const f = singletonRef.flakes[i];

      f.swingPhase += 0.02 * f.swing * dt;
      const swingOffset = Math.sin(f.swingPhase) * f.swing * 0.7;

      f.rot += f.rotSpeed * dt;

      f.x += (f.vx + singletonRef.opts.wind * 0.35) * dt + swingOffset * 0.12;
      f.y += f.vy * dt;

      // recycle off-screen flakes
      if (f.y - f.r > h + 40 || f.x < -80 || f.x > w + 80) {
        f.x = Math.random() * w;
        f.y = -10 - Math.random() * 60;
        f.vx =
          (Math.random() - 0.5) *
          0.6 *
          singletonRef.opts.wind *
          singletonRef.dpr;
        f.vy =
          (0.2 + Math.random() * 0.9) *
          singletonRef.opts.speed *
          singletonRef.dpr;
        f.rot = Math.random() * Math.PI * 2;
        f.swingPhase = Math.random() * Math.PI * 2;
      }

      drawFlake(cx, f, singletonRef.opts.color);
    }

    cx.globalAlpha = 1;

    singletonRef.rafId = requestAnimationFrame((n) => step(n, singletonRef));
  };

  // Persist a compact copy of flakes into window for rehydration
  const persistState = (singletonRef: SnowSingletonType) => {
    try {
      window.__snowfallState = {
        flakes: singletonRef.flakes.map((f) => ({ ...f })),
        size: {
          w: singletonRef.width,
          h: singletonRef.height,
          dpr: singletonRef.dpr,
        },
        ts: Date.now(),
      };
    } catch {
      // ignore
    }
  };

  // Setup the singleton's methods (start/stop/update/resize)
  const wireSingleton = (s: SnowSingletonType) => {
    s.start = () => {
      if (s.running) return;
      s.running = true;
      s.lastTime = performance.now();
      s.rafId = requestAnimationFrame((n) => step(n, s));
    };
    s.stop = () => {
      s.running = false;
      if (s.rafId != null) {
        cancelAnimationFrame(s.rafId);
        s.rafId = null;
      }
    };
    s.resize = resize;
    s.updateOptions = (o: Partial<SnowOptions>) => {
      s.opts = { ...s.opts, ...o };
      if (o.zIndex !== undefined) {
        s.canvas.style.zIndex = String(o.zIndex);
      }
      // immediately adjust count when count change requested
      const desired = computeAdaptiveCount(s.opts.count, s.width, s.height);
      if (s.flakes.length < desired) {
        for (let i = s.flakes.length; i < desired; i++)
          s.flakes.push(makeFlake(s.width, s.height, s.dpr));
      } else if (s.flakes.length > desired) {
        s.flakes.splice(desired, s.flakes.length - desired);
      }
    };
  };

  // finalize and attach
  wireSingleton(singleton);

  // Initialize
  init();

  // If user prefers reduced motion, render static fallback and don't animate
  if (prefersReduced) {
    if (singleton.ctx) {
      const cx = singleton.ctx;
      cx.clearRect(0, 0, singleton.width, singleton.height);
      cx.globalAlpha = Math.max(0, Math.min(1, singleton.opts.opacity * 0.9));
      const staticCount = Math.min(40, Math.floor(singleton.opts.count * 0.35));
      for (let i = 0; i < staticCount; i++) {
        const f = makeFlake(singleton.width, singleton.height, singleton.dpr);
        drawFlake(cx, f, singleton.opts.color);
      }
      cx.globalAlpha = 1;
    }
  } else {
    singleton.start();
  }

  // Interaction & resize handlers (store mouse on window so animation loop can read it without closures)
  const onMove = (e: MouseEvent) => {
    window.__snowMouseX = e.clientX;
    window.__snowMouseY = e.clientY;
    window.__snowMouseActive = true;
  };
  const onLeave = () => {
    window.__snowMouseActive = false;
    window.__snowMouseX = -9999;
    window.__snowMouseY = -9999;
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseout", onLeave);
  window.addEventListener("mouseleave", onLeave);
  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", () => persistState(singleton));

  // store globally
  window.__snowfallSingleton = singleton;

  return singleton;
}

/* -------- React component that ensures the singleton exists --------
   This component does not render any DOM itself; it attaches a persistent
   canvas to the document body.
*/
const Snowfall: React.FC<Partial<SnowOptions>> = (props) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const singleton = createOrGetSingleton(props) ?? undefined;
    // update options in case multiple mounts pass different props
    if (singleton) {
      singleton.updateOptions(props as Partial<SnowOptions>);
      singleton.refCount = singleton.refCount || 1; // keep refCount accurate
    }

    return () => {
      try {
        if (window.__snowfallSingleton) {
          // decrement ref count but DO NOT stop or remove the canvas so animation persists across navigation
          window.__snowfallSingleton.refCount = Math.max(
            0,
            (window.__snowfallSingleton.refCount || 1) - 1,
          );
          // persist a compact snapshot on unmount
          persistSnapshot();
        }
      } catch {
        /* ignore */
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

/* Helper to persist a snapshot from anywhere */
function persistSnapshot() {
  try {
    const s = window.__snowfallSingleton;
    if (!s) return;
    window.__snowfallState = {
      flakes: s.flakes.map((f) => ({ ...f })),
      size: { w: s.width, h: s.height, dpr: s.dpr },
      ts: Date.now(),
    };
  } catch {
    /* ignore */
  }
}

export default Snowfall;
