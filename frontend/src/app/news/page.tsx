import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getStrapiMedia } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Новини | VB Sensoric",
  description: "Новини и блог публикации от VB Sensoric",
};

const categoryLabels: Record<string, string> = {
  news: "Новини",
  technical: "Техническа статия",
  "case-study": "Case Study",
};

export default async function NewsPage() {
  const res = await getBlogPosts().catch(() => null);
  const posts = res?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Новини / Блог</h1>
      <p className="text-scada-muted mb-8">Последни публикации и новини</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const coverUrl = post.coverImage?.url
            ? getStrapiMedia(post.coverImage.url)
            : null;
          const date = post.publishedAt || post.createdAt;

          return (
            <article key={post.id} className="scada-panel overflow-hidden glow-border group">
              <div className="aspect-video bg-scada-bg flex items-center justify-center overflow-hidden">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-scada-muted font-mono text-4xl opacity-20">
                    {post.category === "news" ? "📰" : post.category === "technical" ? "🔬" : "📄"}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {date && (
                    <time className="text-xs font-mono text-scada-muted">
                      {new Date(date).toLocaleDateString("bg-BG")}
                    </time>
                  )}
                  {post.category && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-accent-blue/30 text-accent-blue">
                      {categoryLabels[post.category] || post.category}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-scada-muted line-clamp-3">{post.excerpt}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {!posts.length && (
        <div className="scada-panel p-12 text-center">
          <p className="text-scada-muted">Все още няма публикувани статии.</p>
        </div>
      )}
    </div>
  );
}
