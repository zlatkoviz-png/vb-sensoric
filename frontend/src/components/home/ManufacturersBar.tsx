import Link from "next/link";
import type { Manufacturer } from "@/lib/types";

const fallbackManufacturers = [
  { name: "SICK", slug: "sick" },
  { name: "Datasensing", slug: "datasensing" },
  { name: "BD Sensors", slug: "bd-sensors" },
  { name: "Hikrobot", slug: "hikrobot" },
  { name: "Mech-Mind", slug: "mech-mind" },
  { name: "SinceVision", slug: "sincevision" },
];

export function ManufacturersBar({ manufacturers }: { manufacturers?: Manufacturer[] }) {
  const items = manufacturers?.length
    ? manufacturers.map((m) => ({ name: m.name, slug: m.slug }))
    : fallbackManufacturers;

  return (
    <section className="border-y border-scada-border bg-scada-surface/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-scada-muted mb-6">
          Официален дистрибутор на
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {items.map((m) => (
            <Link
              key={m.slug}
              href={`/products?manufacturer=${m.slug}`}
              className="text-scada-muted hover:text-accent-blue transition-colors font-semibold text-lg tracking-wide"
            >
              {m.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
