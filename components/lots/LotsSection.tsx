"use client";
import { useState } from "react";
import { LOTS } from "@/lib/data";
import LotTable from "./LotTable";

export default function LotsSection() {
  const [lot, setLot] = useState("L-2609");
  return (
    <section id="lotes" className="bg-white/55 px-6 py-28 backdrop-blur-sm md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">Resultados por lote</h2>
        <p className="mt-4 max-w-xl text-tinta/70">Elegí el número que figura en tu frasco y mirá su análisis.</p>
        <div className="mt-10 flex flex-wrap gap-3" role="tablist">
          {Object.keys(LOTS).map((k) => (
            <button key={k} role="tab" aria-selected={lot === k} onClick={() => setLot(k)}
              className={`rounded-full border px-5 py-2 font-medium transition-colors ${lot === k ? "border-tinta bg-tinta text-white" : "border-tinta/25 hover:border-tinta"}`}>
              {k}
            </button>
          ))}
        </div>
        <LotTable lot={lot} />
      </div>
    </section>
  );
}
