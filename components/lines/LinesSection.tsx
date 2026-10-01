"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINES } from "@/lib/data";
import LineCard from "./LineCard";

export default function LinesSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");
      cards.forEach((card, i) => {
        gsap.fromTo(card.querySelector(".bottle"), { yPercent: 8 }, { yPercent: -4, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "top 25%", scrub: true } });
        if (i < cards.length - 1)
          gsap.to(card.querySelector(".card-in"), { scale: 0.95, ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 35%", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="lineas" className="mx-auto max-w-5xl px-8 pb-32 pt-28 md:px-16">
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">Nuestras líneas</h2>
      <p className="mt-4 max-w-xl text-tinta/70">Información orientativa. No reemplaza la consulta con un profesional de la salud.</p>
      <ul className="mt-16">
        {LINES.map((l, i) => <LineCard key={l.n} line={l} index={i} last={i === LINES.length - 1} />)}
      </ul>
    </section>
  );
}
