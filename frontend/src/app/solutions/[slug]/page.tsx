import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudyBySlug, getStrapiMedia } from "@/lib/strapi";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await getCaseStudyBySlug(slug);
  const cs = res.data[0];
  if (!cs) return { title: "Case Study не е намерен" };
  return {
    title: `${cs.title} | VB Sensoric`,
    description: cs.problem || cs.title,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await getCaseStudyBySlug(slug);
  const cs = res.data[0];
  if (!cs) notFound();

  const sections = [
    { label: "Проблем", content: cs.problem, color: "text-accent-orange" },
    { label: "Решение", content: cs.solution, color: "text-accent-blue" },
    { label: "Резултати", content: cs.results, color: "text-accent-green" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-scada-muted mb-8">
        <Link href="/solutions" className="hover:text-accent-blue transition-colors">
          Решения
        </Link>
        <span>/</span>
        <span className="text-white">{cs.title}</span>
      </nav>

      {cs.industry && (
        <div className="inline-block text-xs font-mono text-accent-green uppercase px-3 py-1 rounded-full border border-accent-green/30 mb-4">
          {cs.industry}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-8">{cs.title}</h1>

      <div className="space-y-8">
        {sections.map(
          (section) =>
            section.content && (
              <div key={section.label} className="scada-panel p-6">
                <h2 className={`text-sm font-semibold uppercase tracking-wider ${section.color} mb-3`}>
                  {section.label}
                </h2>
                <div className="text-scada-muted leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            )
        )}
      </div>

      <div className="mt-12 flex gap-4">
        <Link href="/solutions" className="btn-secondary">
          &larr; Всички решения
        </Link>
        <Link href="/contact" className="btn-primary">
          Свържете се с нас
        </Link>
      </div>
    </div>
  );
}
