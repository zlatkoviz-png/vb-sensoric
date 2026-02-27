import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукти",
  description: "Пълен каталог на индустриални сензори и визуални системи",
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Продуктов каталог</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="scada-panel p-4 sticky top-20">
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-accent-blue">
              Филтри
            </h2>
            <div className="space-y-4 text-sm text-scada-muted">
              <p>Филтрите ще бъдат свързани със Strapi CMS</p>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Placeholder cards */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="scada-panel p-4 glow-border group">
                <div className="aspect-square bg-scada-bg rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-scada-muted text-sm font-mono">IMG</span>
                </div>
                <div className="font-mono text-xs text-accent-blue mb-1">SKU-{String(i + 1).padStart(4, "0")}</div>
                <h3 className="font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                  Продукт {i + 1}
                </h3>
                <p className="text-xs text-scada-muted mb-4">Описание на продукта от CMS</p>
                <button className="btn-primary text-sm w-full !py-2">Поискай оферта</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
