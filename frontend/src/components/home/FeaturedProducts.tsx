import Link from "next/link";

const categories = [
  {
    title: "Фотоелектрични сензори",
    description: "Прецизно детектиране на обекти, цветове и разстояния",
    icon: "⚡",
    href: "/products?category=photoelectric",
  },
  {
    title: "Индуктивни сензори",
    description: "Надеждно разпознаване на метални обекти без контакт",
    icon: "🔧",
    href: "/products?category=inductive",
  },
  {
    title: "Machine Vision",
    description: "Индустриални камери и AI-базирани визуални системи",
    icon: "📷",
    href: "/products?category=vision",
  },
  {
    title: "Сензори за налягане",
    description: "Измерване на налягане, ниво и температура",
    icon: "📊",
    href: "/products?category=pressure",
  },
  {
    title: "Системи за безопасност",
    description: "Лазерни скенери, светлинни завеси, аварийни стопове",
    icon: "🛡️",
    href: "/products?category=safety",
  },
  {
    title: "3D визуални системи",
    description: "Роботизирано зрение и AI решения за pick & place",
    icon: "🤖",
    href: "/products?category=3d-vision",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Продуктови категории
          </h2>
          <p className="text-scada-muted max-w-2xl mx-auto">
            Пълна гама индустриални сензори и визуални системи от водещи световни производители
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group scada-panel p-6 glow-border transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-accent-blue transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-scada-muted">{cat.description}</p>
            </Link>
          ))}
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
