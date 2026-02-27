import type {
  StrapiResponse,
  StrapiSingleResponse,
  Manufacturer,
  Category,
  Product,
  CaseStudy,
  Testimonial,
  BlogPost,
} from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

export async function fetchStrapi<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<StrapiResponse<T>> {
  const url = new URL(`/api${endpoint}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return "/placeholder.png";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/hikrobot")) return url;
  return `${STRAPI_URL}${url}`;
}

// Typed fetchers
export const getManufacturers = () =>
  fetchStrapi<Manufacturer>("/manufacturers", { "populate[0]": "logo" });

export const getCategories = () =>
  fetchStrapi<Category>("/categories", { "populate[0]": "parent" });

export const getProducts = (params?: Record<string, string>) =>
  fetchStrapi<Product>("/products", {
    "populate[0]": "manufacturer",
    "populate[1]": "categories",
    "populate[2]": "images",
    ...params,
  });

export const getProductBySlug = (slug: string) =>
  fetchStrapi<Product>("/products", {
    "filters[slug][$eq]": slug,
    "populate[0]": "manufacturer",
    "populate[1]": "categories",
    "populate[2]": "images",
    "populate[3]": "datasheet",
  });

export const getCaseStudies = () =>
  fetchStrapi<CaseStudy>("/case-studies", { "populate[0]": "coverImage" });

export const getCaseStudyBySlug = (slug: string) =>
  fetchStrapi<CaseStudy>("/case-studies", {
    "filters[slug][$eq]": slug,
    "populate[0]": "coverImage",
    "populate[1]": "images",
    "populate[2]": "products",
  });

export const getTestimonials = () =>
  fetchStrapi<Testimonial>("/testimonials");

export const getBlogPosts = () =>
  fetchStrapi<BlogPost>("/blog-posts", {
    "populate[0]": "coverImage",
    "sort": "publishedAt:desc",
  });

export const getBlogPostBySlug = (slug: string) =>
  fetchStrapi<BlogPost>("/blog-posts", {
    "filters[slug][$eq]": slug,
    "populate[0]": "coverImage",
  });
