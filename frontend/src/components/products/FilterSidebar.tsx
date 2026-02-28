"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Manufacturer, Category } from "@/lib/types";

interface FilterSidebarProps {
  manufacturers: Manufacturer[];
  categories: Category[];
}

export function FilterSidebar({ manufacturers, categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMfg = searchParams.get("manufacturer") || "";
  const currentCat = searchParams.get("category") || "";

  const activeCount = (currentMfg ? 1 : 0) + (currentCat ? 1 : 0);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/products");
  }

  return (
    <div className="card p-4 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-slate-900">
          Филтри
          {activeCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 text-xs">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-slate-400 hover:text-primary-600 transition-colors"
          >
            Изчисти
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
            Производител
          </label>
          <select
            value={currentMfg}
            onChange={(e) => updateFilter("manufacturer", e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
          >
            <option value="">Всички</option>
            {manufacturers.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
            Категория
          </label>
          <select
            value={currentCat}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
          >
            <option value="">Всички</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
