"use client";
import { useEffect, useRef } from "react";

type Props = { variant?: "dark" | "light"; className?: string };

type Glow = {
  x: number; y: number;      // posición
  vx: number; vy: number;    // velocidad
  r: number;                 // radio máximo
  age: number; life: number; // en segundos
  phase: number;             // para el vaivén y el parpadeo
};

// Verde oscuro -> verde claro (RGB)
const DARK: [number, number, number] = [8, 90, 52];
const LIGHT: [number, number, number] = [170, 255, 200];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Destellos de luz verdes: aparecen, se mueven, aclaran su color y se desvanecen. */
export default function ParticleCanvas({ variant = "dark", className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const onDark = variant === "dark";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intensity = onDark ? 0.9 : 0.5;
    const m = { x: -999, y: -999 };
    let w = 0, h = 0, max = 0, raf = 0, last = performance.now();
    let glows: Glow[] = [];

    const spawn = (warm = false): Glow => {
      const life = 5 + Math.random() * 7;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 14,
        vy: -4 - Math.random() * 12,          // tienden a subir, como luciérnagas
        r: (onDark ? 14 : 18) + Math.random() * (onDark ? 46 : 60),
        age: warm ? Math.random() * life : 0, // al inicio, repartidos en su ciclo
        life,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = onDark ? "lighter" : "source-over";

      for (let i = 0; i < glows.length; i++) {
        const g = glows[i];
        g.age += dt;
        if (g.age >= g.life) { glows[i] = spawn(); continue; }

        const t = g.age / g.life;                        // 0 -> 1
        const fade = Math.pow(Math.sin(Math.PI * t), 1.6); // aparece y desaparece
        const flicker = 0.85 + 0.15 * Math.sin(g.age * 3 + g.phase);
        const alpha = fade * flicker * intensity;

        // movimiento con vaivén suave
        g.x += (g.vx + Math.sin(g.age * 0.8 + g.phase) * 8) * dt;
        g.y += g.vy * dt;

        // el cursor los aparta un poco
        const dx = g.x - m.x, dy = g.y - m.y, d2 = dx * dx + dy * dy;
        if (d2 < 16000) { g.x += dx * 0.02; g.y += dy * 0.02; }

        // color: oscuro al nacer, claro hacia el final
        const k = Math.min(1, t * 1.15);
        const R = lerp(DARK[0], LIGHT[0], k) | 0;
        const G = lerp(DARK[1], LIGHT[1], k) | 0;
        const B = lerp(DARK[2], LIGHT[2], k) | 0;

        // crece mientras vive
        const rad = g.r * (0.55 + 0.6 * Math.sin(Math.PI * Math.min(1, t * 1.1)));
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, rad);
        grad.addColorStop(0, `rgba(${R},${G},${B},${alpha})`);
        grad.addColorStop(0.35, `rgba(${R},${G},${B},${alpha * 0.45})`);
        grad.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(g.x, g.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const r = c.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      max = Math.max(10, Math.min(38, Math.floor((w * h) / 26000)));
      glows = Array.from({ length: max }, () => spawn(true));
      if (still) draw(0);
    };

    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    };

    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    window.addEventListener("pointermove", move, { passive: true });
    if (!still) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, [variant]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}