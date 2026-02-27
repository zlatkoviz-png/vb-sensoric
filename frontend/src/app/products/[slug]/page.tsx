import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, getProducts, getStrapiMedia } from "@/lib/strapi";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await getProductBySlug(slug);
  const product = res.data[0];
  if (!product) return { title: "Продукт не е намерен" };
  return {
    title: `${product.name} | VB Sensoric`,
    description: product.shortDescription || `${product.name} — индустриален сензор`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await getProductBySlug(slug);
  const product = res.data[0];
  if (!product) notFound();

  const strapiImage = product.images?.[0]?.url
    ? getStrapiMedia(product.images[0].url)
    : null;
  const localImage = product.specs?.imageUrl as string | undefined;
  const imageUrl = strapiImage || (localImage ? localImage : null);
  const datasheetUrl = product.specs?.datasheetUrl as string | undefined;

  // Filter internal keys from specs display
  const displaySpecs = product.specs
    ? Object.fromEntries(
        Object.entries(product.specs).filter(
          ([key]) => !["imageUrl", "datasheetUrl"].includes(key)
        )
      )
    : null;

  // Related products from same category
  let relatedProducts: typeof res.data = [];
  if (product.categories?.length) {
    const relRes = await getProducts({
      "filters[categories][slug][$eq]": product.categories[0].slug,
      "filters[slug][$ne]": product.slug,
      "pagination[pageSize]": "3",
    });
    relatedProducts = relRes.data;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-scada-muted mb-8">
        <Link href="/products" className="hover:text-accent-blue transition-colors">
          Продукти
        </Link>
        <span>/</span>
        {product.manufacturer && (
          <>
            <Link
              href={`/products?manufacturer=${product.manufacturer.slug}`}
              className="hover:text-accent-blue transition-colors"
            >
              {product.manufacturer.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="scada-panel p-8 flex items-center justify-center aspect-square">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain max-h-full"
            />
          ) : (
            <div className="text-scada-muted font-mono text-sm flex flex-col items-center gap-3">
              <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Изображение не е налично</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="font-mono text-sm text-accent-blue mb-2">{product.sku}</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {product.manufacturer && (
            <Link
              href={`/products?manufacturer=${product.manufacturer.slug}`}
              className="inline-flex items-center gap-2 text-sm text-scada-muted hover:text-accent-blue transition-colors mb-4"
            >
              {product.manufacturer.name} &middot; {product.manufacturer.country}
            </Link>
          )}

          {product.shortDescription && (
            <p className="text-scada-muted mb-6">{product.shortDescription}</p>
          )}

          {product.priceRange && (
            <div className="scada-panel p-4 mb-6">
              <span className="text-xs text-scada-muted uppercase tracking-wider">Цена</span>
              <div className="font-mono text-lg text-accent-green mt-1">{product.priceRange}</div>
            </div>
          )}

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="px-3 py-1 text-xs rounded-full border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10 transition-colors"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Specs table */}
          {displaySpecs && Object.keys(displaySpecs).length > 0 && (
            <div className="scada-panel overflow-hidden mb-6">
              <div className="px-4 py-3 border-b border-scada-border">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-blue">
                  Технически характеристики
                </h2>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(displaySpecs).map(([key, value], i) => (
                    <tr
                      key={key}
                      className={i % 2 === 0 ? "bg-scada-bg/50" : ""}
                    >
                      <td className="px-4 py-2.5 font-mono text-scada-muted capitalize w-1/3">
                        {key}
                      </td>
                      <td className="px-4 py-2.5 font-mono">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/contact?product=${product.slug}`}
              className="btn-primary inline-block text-center flex-1"
            >
              Поискай оферта
            </Link>
            {datasheetUrl && (
              <a
                href={datasheetUrl}
                download
                className="btn-secondary inline-flex items-center justify-center gap-2 text-center flex-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Datasheet PDF
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-12 scada-panel p-8">
          <h2 className="text-xl font-bold mb-4">Описание</h2>
          <div className="prose prose-invert max-w-none text-scada-muted">
            {product.description}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Свързани продукти</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="scada-panel p-4 glow-border group"
              >
                <div className="font-mono text-xs text-accent-blue mb-1">{p.sku}</div>
                <h3 className="font-semibold group-hover:text-accent-blue transition-colors">
                  {p.name}
                </h3>
                {p.shortDescription && (
                  <p className="text-xs text-scada-muted mt-1 line-clamp-2">{p.shortDescription}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
