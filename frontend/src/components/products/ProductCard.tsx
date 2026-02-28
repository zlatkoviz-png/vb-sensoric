import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";

export function ProductCard({ product }: { product: Product }) {
  const strapiImage = product.images?.[0]?.url
    ? getStrapiMedia(product.images[0].url)
    : null;
  const localImage = product.specs?.imageUrl as string | undefined;
  const imageUrl = strapiImage || (localImage ? localImage : null);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group card p-4 flex flex-col hover:-translate-y-1"
    >
      <div className="aspect-square bg-slate-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain w-full h-full p-2"
          />
        ) : (
          <div className="text-slate-300 text-sm font-mono flex flex-col items-center gap-2">
            <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="font-mono text-xs text-primary-600 mb-1">{product.sku}</div>

      <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
        {product.name}
      </h3>

      {product.manufacturer && (
        <div className="text-xs text-slate-400 mb-2">{product.manufacturer.name}</div>
      )}

      {product.shortDescription && (
        <p className="text-xs text-slate-500 mb-4 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>
      )}

      {product.priceRange && (
        <div className="text-xs font-mono text-emerald-600 mb-3">{product.priceRange}</div>
      )}

      <div className="btn-primary text-sm text-center !py-2 mt-auto">Подробности</div>
    </Link>
  );
}
