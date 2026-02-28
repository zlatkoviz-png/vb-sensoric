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
    { label: "Проблем", content: cs.problem, color: "text-orange-600" },
    { label: "Решение", content: cs.solution, color: "text-primary-600" },
    { label: "Резултати", content: cs.results, color: "text-emerald-600" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/solutions" className="hover:text-primary-600 transition-colors">
          Решения
        </Link>
        <span>/</span>
        <span className="text-slate-900">{cs.title}</span>
      </nav>

      {cs.industry && (
        <div className="inline-block text-xs font-mono text-emerald-600 uppercase px-3 py-1 rounded-full border border-emerald-200 mb-4">
          {cs.industry}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-8">{cs.title}</h1>

      <div className="space-y-8">
        {sections.map(
          (section) =>
            section.content && (
              <div key={section.label} className="card p-6">
                <h2 className={`text-sm font-semibold uppercase tracking-wider ${section.color} mb-3`}>
                  {section.label}
                </h2>
                <div className="text-slate-500 leading-relaxed whitespace-pre-line">
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
