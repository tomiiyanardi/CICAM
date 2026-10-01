"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";

/** Transparente sobre el hero; al bajar se vuelve una píldora flotante con blur. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-5 py-3 text-white transition-all duration-500 md:px-7 ${
        scrolled ? "border-white/15 bg-bosque/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,.5)] backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}>
        <Link href="/" className="font-display text-2xl font-extrabold tracking-tight">CICAM</Link>
        <nav className="flex items-center gap-5 text-sm font-medium md:gap-8">
          {NAV.slice(0, 2).map((n) => (
            <Link key={n.href} href={n.href} className="text-white/85 transition-colors hover:text-hoja">{n.label}</Link>
          ))}
          <Link href="/tienda" className="flex items-center gap-2 rounded-full border border-white/25 bg-bosque/80 px-4 py-2 transition-colors hover:border-hoja">
            <span className="size-2 rounded-full bg-hoja" /> Tienda
          </Link>
        </nav>
      </div>
    </header>
  );
}
