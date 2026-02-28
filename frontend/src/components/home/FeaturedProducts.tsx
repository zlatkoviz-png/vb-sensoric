import Link from "next/link";
import { Zap, Wrench, Camera, Gauge, Shield, Box } from "lucide-react";
import type { Category } from "@/lib/types";

const fallbackCategories = [
  { name: "Фотоелектрични сензори", description: "Прецизно детектиране на обекти, цветове и разстояния", icon: Zap, slug: "photoelectric" },
  { name: "Индуктивни сензори", description: "Надеждно разпознаване на метални обекти без контакт", icon: Wrench, slug: "inductive" },
  { name: "Machine Vision", description: "Индустриални камери и AI-базирани визуални системи", icon: Camera, slug: "vision" },
  { name: "Сензори за налягане", description: "Измерване на налягане, ниво и температура", icon: Gauge, slug: "pressure" },
  { name: "Системи за безопасност", description: "Лазерни скенери, светлинни завеси, аварийни стопове", icon: Shield, slug: "safety" },
  { name: "3D визуални системи", description: "Роботизирано зрение и AI решения за pick & place", icon: Box, slug: "3d-vision" },
];

export function FeaturedProducts({ categories }: { categories?: Category[] }) {
  const items = categories?.length
    ? categories.map((c) => ({
        name: c.name,
        description: c.description || "",
        icon: null,
        slug: c.slug,
      }))
    : fallbackCategories;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Продуктови категории
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Пълна гама индустриални сензори и визуални системи от водещи световни производители
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cat) => {
            const IconComponent = 'icon' in cat && cat.icon ? cat.icon : Box;
            return (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group card p-6 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-secondary">
            Виж всички продукти
          </Link>
        </div>
      </div>
    </section>
  );
}
