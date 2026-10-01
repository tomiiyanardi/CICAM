"use client";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import Header from "./Header";
import Footer from "./Footer";

/** Estructura común de todas las pantallas: scroll suave, partículas de fondo, header y footer. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return (
    <>
      <ParticleCanvas variant="light" className="fixed inset-0 z-0 size-full" />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
