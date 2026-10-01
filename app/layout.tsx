import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "CICAM | Aceites de cannabis artesanales de Mendoza",
  description:
    "Aceites de cannabis artesanales de Mendoza, con trazabilidad y análisis por lote.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${bricolage.variable} ${figtree.variable} antialiased`}><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
