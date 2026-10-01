import { LOTS } from "@/lib/data";

export default function LotTable({ lot }: { lot: string }) {
  return (
    <dl className="mt-10 max-w-2xl divide-y divide-tinta/15 rounded-3xl border border-tinta/10 bg-white/80 px-6 shadow-sm">
      {LOTS[lot].map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 py-4">
          <dt className="text-tinta/65">{k}</dt>
          <dd className="text-right font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
