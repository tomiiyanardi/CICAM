import type { CSSProperties } from "react";
import type { Line } from "@/lib/data";

type Props = { line: Line; index: number; last: boolean };

export default function LineCard({ line: l, index, last }: Props) {
  return (
    <li className={`card sticky top-[calc(5.5rem+var(--i)*3.6rem)] ${last ? "" : "mb-[42vh]"}`} style={{ "--i": index } as CSSProperties}>
      <div className="card-in relative origin-top rounded-[2rem] p-7 pt-24 shadow-[0_30px_60px_-20px_rgba(8,32,25,.35)] md:rounded-[3rem] md:p-14 md:min-h-[24rem]" style={{ background: l.bg }}>
        <img src="/frascocanabis.png" alt="" aria-hidden className="bottle absolute -top-12 right-6 z-20 h-48 object-contain drop-shadow-2xl md:-bottom-8 md:-left-4 md:right-auto md:top-auto md:h-[115%] md:w-[38%]" />
        
        <div className="relative z-10 md:ml-[38%] md:pl-8">
          <div className="flex items-baseline gap-4 border-b border-tinta/15 pb-3 text-sm">
            <span>Nº {l.n}</span>
            <span className="font-semibold">{l.name}</span>
          </div>
          <h3 className="mt-6 font-display text-3xl font-bold md:mt-8 md:text-5xl">{l.title}</h3>
          <p className="mt-3 max-w-md text-base text-tinta/75 md:text-lg">{l.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
            <span className="inline-block rounded-full border border-tinta/25 bg-white/55 px-4 py-2 text-xs md:text-sm">{l.tag}</span>
            <a href={`/tienda?linea=${l.n}`} className="inline-block rounded-full bg-tinta px-5 py-2 text-xs font-semibold text-white transition hover:bg-tinta/85 md:text-sm">
              Comprar en tienda
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
