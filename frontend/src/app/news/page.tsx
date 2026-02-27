import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини",
  description: "Новини и блог публикации от VB Sensoric",
};

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Новини / Блог</h1>
      <p className="text-scada-muted mb-8">Последни публикации и новини</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <article key={i} className="scada-panel overflow-hidden glow-border group">
            <div className="aspect-video bg-scada-bg flex items-center justify-center">
              <span className="text-scada-muted text-sm font-mono">IMG</span>
            </div>
            <div className="p-6">
              <time className="text-xs font-mono text-scada-muted">2026-02-{String(27 - i).padStart(2, "0")}</time>
              <h3 className="font-semibold mt-2 mb-2 group-hover:text-accent-blue transition-colors">
                Статия {i + 1}
              </h3>
              <p className="text-sm text-scada-muted">Съдържание от Strapi CMS</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
