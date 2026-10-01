import Hero from "./hero/Hero";
import LinesSection from "./lines/LinesSection";
import LotsSection from "./lots/LotsSection";
import NosotrosSection from "./sections/NosotrosSection";
import CtaSection from "./sections/CtaSection";

/** Pantalla de inicio: solo compone secciones, cada una vive en su archivo. */
export default function Landing() {
  return (
    <>
      <Hero />
      <LinesSection />
      <NosotrosSection />
      <LotsSection />
      <CtaSection />
    </>
  );
}
