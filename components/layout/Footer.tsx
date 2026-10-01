import Link from "next/link";
import { NAV } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-tinta/10 px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl font-extrabold">CICAM</p>
          <p className="mt-1 text-sm text-tinta/55">Mendoza, Argentina. Datos de lotes de ejemplo.</p>
        </div>
        <ul className="flex gap-6 text-sm">
          {NAV.map((n) => <li key={n.href}><Link href={n.href} className="hover:underline">{n.label}</Link></li>)}
        </ul>
      </div>
    </footer>
  );
}
