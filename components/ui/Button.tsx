import Link from "next/link";

const STYLES = {
  solid: "bg-tinta text-white hover:bg-tinta/85",
  light: "bg-hoja text-bosque hover:bg-white",
  ghost: "border border-white/30 text-white hover:bg-white/10",
};

type Props = { href: string; variant?: keyof typeof STYLES; children: React.ReactNode; className?: string };

export default function Button({ href, variant = "solid", children, className = "" }: Props) {
  return (
    <Link href={href} className={`inline-block rounded-full px-7 py-3 font-semibold transition-colors duration-300 ${STYLES[variant]} ${className}`}>
      {children}
    </Link>
  );
}
