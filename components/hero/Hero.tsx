"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Aurora from "@/components/ui/Aurora";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import Button from "@/components/ui/Button";
import { LINES } from "@/lib/data";

// Esferas de color de cada línea; v = velocidad del parallax.
const DOTS = [
  { c: LINES[0].bg, s: "size-32 left-[4%] top-[12%]", v: -30 },
  { c: LINES[1].bg, s: "size-20 right-[10%] top-[8%]", v: -55 },
  { c: LINES[2].bg, s: "size-40 right-[0%] top-[46%]", v: -20 },
  { c: LINES[3].bg, s: "size-16 left-[2%] bottom-[16%]", v: -60 },
  { c: LINES[4].bg, s: "size-28 left-[34%] bottom-[2%]", v: -35 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".h-line", { yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power4.out" });
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) =>
        gsap.to(el, {
          y: Number(el.dataset.speed) * 6, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true }
        }));
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="hero" className="relative overflow-hidden rounded-b-[2.5rem] bg-bosque text-white md:rounded-b-[6rem]">
      <Aurora />
      <ParticleCanvas variant="dark" className="absolute inset-0 z-0 size-full" />
      <div className="relative z-10 mx-auto grid min-h-[14svh] max-w-7xl items-center gap-8 px-6 pb-16 pt-32 md:grid-cols-2 md:px-12">
        <div>
          <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight">
            <span className="block overflow-hidden"><span className="h-line block">Centro de Investigación</span></span>
            <span className="block overflow-hidden"><span className="h-line block">de Cannabis de Mendoza</span></span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/75">Cinco líneas, explicadas con claridad, para saber qué ofrece CICAM hoy.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#lineas" variant="light">Ver las líneas</Button>
            <Button href="#lotes" variant="ghost">Resultados por lote</Button>
          </div>
        </div>
        <div className="relative h-[45svh] md:h-[70svh]">
          <div aria-hidden className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hoja/25 blur-[90px]" />
          {DOTS.map((d, i) => (
            <div key={i} data-speed={d.v} className={`absolute rounded-full opacity-90 ${d.s}`} style={{ background: d.c }} />
          ))}
          <img src="/frascocanabis.png" alt="Frasco de aceite CICAM" className="absolute left-1/2 top-1/2 h-[85%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
