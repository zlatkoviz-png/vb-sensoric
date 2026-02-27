import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getProducts, getManufacturers, getCategories } from "@/lib/strapi";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterSidebar } from "@/components/products/FilterSidebar";

export const metadata: Metadata = {
  title: "Продукти | VB Sensoric",
  description: "Пълен каталог на индустриални сензори и визуални системи",
};

const PAGE_SIZE = 24;

interface Props {
  searchParams: Promise<{ manufacturer?: string; category?: string; page?: string }>;
}

function Pagination({ page, pageCount, searchParams }: {
  page: number;
  pageCount: number;
  searchParams: Record<string, string>;
}) {
  if (pageCount <= 1) return null;

  function buildUrl(p: number) {
    const params = new URLSearchParams(searchParams);
    if (p > 1) {
      params.set("page", String(p));
    } else {
      params.delete("page");
    }
    const qs = params.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  }

  // Show max 7 page numbers
  const pages: number[] = [];
  const start = Math.max(1, page - 3);
  const end = Math.min(pageCount, start + 6);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      {page > 1 && (
        <Link
          href={buildUrl(page - 1)}
          className="px-3 py-2 text-sm scada-panel hover:text-accent-blue transition-colors"
        >
          &laquo;
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={buildUrl(p)}
          className={`px-3 py-2 text-sm ${
            p === page
              ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/30"
              : "scada-panel hover:text-accent-blue"
          } transition-colors rounded`}
        >
          {p}
        </Link>
      ))}
      {page < pageCount && (
        <Link
          href={buildUrl(page + 1)}
          className="px-3 py-2 text-sm scada-panel hover:text-accent-blue transition-colors"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}

async function ProductGrid({ searchParams }: {
  searchParams: { manufacturer?: string; category?: string; page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10) || 1);
  const filters: Record<string, string> = {};
  if (searchParams.manufacturer) {
    filters["filters[manufacturer][slug][$eq]"] = searchParams.manufacturer;
  }
  if (searchParams.category) {
    filters["filters[categories][slug][$eq]"] = searchParams.category;
  }
  filters["pagination[pageSize]"] = String(PAGE_SIZE);
  filters["pagination[page]"] = String(page);

  const productsRes = await getProducts(filters);
  const products = productsRes.data;
  const pagination = productsRes.meta.pagination;
  const total = pagination?.total || products.length;
  const pageCount = pagination?.pageCount || 1;

  if (!products.length) {
    return (
      <div className="scada-panel p-12 text-center">
        <p className="text-scada-muted">Няма намерени продукти с избраните филтри.</p>
      </div>
    );
  }

  // Build search params for pagination links
  const paginationParams: Record<string, string> = {};
  if (searchParams.manufacturer) paginationParams.manufacturer = searchParams.manufacturer;
  if (searchParams.category) paginationParams.category = searchParams.category;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-scada-muted font-mono">
          {total} продукт{total === 1 ? "" : "а"} {pageCount > 1 && `· стр. ${page}/${pageCount}`}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={page} pageCount={pageCount} searchParams={paginationParams} />
    </>
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
