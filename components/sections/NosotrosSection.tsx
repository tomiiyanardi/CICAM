import Image from "next/image";

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="bg-bosque px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          
          <div className="order-2 md:order-1 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2.5rem] w-full shadow-2xl">
            <Image src="/mendoza.jpg" alt="Cordillera de los Andes y viñedos en Mendoza" fill className="object-cover transition-transform duration-1000 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-bosque/60 to-transparent" />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="font-display text-5xl font-bold tracking-tight text-hoja md:text-7xl">
              De Mendoza<br />al país.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-white/80 md:text-xl">
              Somos un emprendimiento familiar nacido al pie de la cordillera. 
              Cada paso, desde el cultivo orgánico hasta la extracción, lo hacemos con dedicación, 
              trazabilidad absoluta y profundo respeto por nuestra tierra.
            </p>
            
            <div className="mt-16 space-y-12">
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-hoja">
                <h3 className="font-display text-2xl font-bold">Nuestra Misión</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Acercar alternativas naturales y seguras, cultivadas con los más altos estándares. 
                  Educamos y desmitificamos el uso del cannabis, brindando bienestar genuino a través del acompañamiento y la transparencia.
                </p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-hoja/40">
                <h3 className="font-display text-2xl font-bold">Nuestra Visión</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Ser el referente de confianza en la región, reconocidos por nuestra ética 
                  familiar y el compromiso inquebrantable de mejorar la calidad de vida de las personas mediante extractos trazables.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
