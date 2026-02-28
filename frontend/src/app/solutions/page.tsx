import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudies, getStrapiMedia } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Решения | VB Sensoric",
  description: "Case studies и реализирани проекти с индустриални сензори",
};

export default async function SolutionsPage() {
  const res = await getCaseStudies().catch(() => null);
  const caseStudies = res?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Решения / Case Studies</h1>
      <p className="text-slate-500 mb-8">Реализирани проекти с нашите продукти</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((cs) => {
          const coverUrl = cs.coverImage?.url
            ? getStrapiMedia(cs.coverImage.url)
            : null;

          return (
            <Link
              key={cs.id}
              href={`/solutions/${cs.slug}`}
              className="card overflow-hidden group"
            >
              <div className="aspect-video bg-slate-50 flex items-center justify-center overflow-hidden">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={cs.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-slate-500 text-sm font-mono flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                {cs.industry && (
                  <div className="text-xs font-mono text-emerald-600 mb-2 uppercase">
                    {cs.industry}
                  </div>
                )}
                <h3 className="font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {cs.title}
                </h3>
                {cs.problem && (
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{cs.problem}</p>
                )}
                <span className="text-sm text-primary-600">Виж детайли &rarr;</span>
              </div>
            </Link>
          );
        })}
      </div>

      {!caseStudies.length && (
        <div className="card p-12 text-center">
          <p className="text-slate-500">Все още няма публикувани case studies.</p>
        </div>
      )}
    </div>
  );
}
