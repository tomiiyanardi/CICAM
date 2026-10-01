import Link from "next/link";
import Aurora from "./Aurora";
import ParticleCanvas from "./ParticleCanvas";

type Props = { title: string; text?: string };

/** Cabecera curva para pantallas internas (migas de pan + título). */
export default function PageHero({ title, text }: Props) {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-bosque text-white md:rounded-b-[5rem]">
      <Aurora />
      <ParticleCanvas variant="dark" className="absolute inset-0 z-0 size-full" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
        <nav aria-label="Migas de pan" className="flex items-center gap-2 text-sm text-white/80">
          <Link href="/" className="hover:text-white">Inicio</Link>
          <span aria-hidden className="size-1.5 rounded-full bg-hoja" />
          <span>{title}</span>
        </nav>
        <h1 className="mt-8 font-display text-5xl font-bold tracking-tight md:text-7xl">{title}</h1>
        {text && <p className="mt-4 max-w-lg text-lg text-white/75">{text}</p>}
      </div>
    </section>
  );
}
