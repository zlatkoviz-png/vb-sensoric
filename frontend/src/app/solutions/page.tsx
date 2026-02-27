import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Решения",
  description: "Case studies и реализирани проекти с индустриални сензори",
};

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Решения / Case Studies</h1>
      <p className="text-scada-muted mb-8">Реализирани проекти с нашите продукти</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="scada-panel overflow-hidden glow-border group">
            <div className="aspect-video bg-scada-bg flex items-center justify-center">
              <span className="text-scada-muted text-sm font-mono">IMG</span>
            </div>
            <div className="p-6">
              <div className="text-xs font-mono text-accent-green mb-2">CASE STUDY #{i + 1}</div>
              <h3 className="font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                Проект {i + 1}
              </h3>
              <p className="text-sm text-scada-muted mb-4">Описание от Strapi CMS</p>
              <span className="text-sm text-accent-blue">Виж детайли &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
