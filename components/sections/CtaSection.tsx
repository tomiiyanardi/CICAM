import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section className="px-6 py-28 text-center md:px-12">
      <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">Pronto vas a poder pedirlos online.</h2>
      <Button href="/tienda" className="mt-10 !px-8 !py-4">Ir a la tienda</Button>
    </section>
  );
}
