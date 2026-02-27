import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getManufacturers, getCategories } from "@/lib/strapi";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterSidebar } from "@/components/products/FilterSidebar";

export const metadata: Metadata = {
  title: "Продукти | VB Sensoric",
  description: "Пълен каталог на индустриални сензори и визуални системи",
};

interface Props {
  searchParams: Promise<{ manufacturer?: string; category?: string }>;
}

async function ProductGrid({ searchParams }: { searchParams: { manufacturer?: string; category?: string } }) {
  const filters: Record<string, string> = {};
  if (searchParams.manufacturer) {
    filters["filters[manufacturer][slug][$eq]"] = searchParams.manufacturer;
  }
  if (searchParams.category) {
    filters["filters[categories][slug][$eq]"] = searchParams.category;
  }
  filters["pagination[pageSize]"] = "50";

  const productsRes = await getProducts(filters);
  const products = productsRes.data;

  if (!products.length) {
    return (
      <div className="scada-panel p-12 text-center">
        <p className="text-scada-muted">Няма намерени продукти с избраните филтри.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const [manufacturersRes, categoriesRes] = await Promise.all([
    getManufacturers(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Продуктов каталог</h1>
      <p className="text-scada-muted mb-8">
        Пълна гама индустриални сензори и визуални системи
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 flex-shrink-0">
          <Suspense>
            <FilterSidebar
              manufacturers={manufacturersRes.data}
              categories={categoriesRes.data}
            />
          </Suspense>
        </aside>

        <div className="flex-1">
          <ProductGrid searchParams={resolvedParams} />
        </div>
      </div>
    </div>
  );
}
