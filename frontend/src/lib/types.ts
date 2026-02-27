// Strapi v5 response types (flat format, no attributes wrapper)

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiMedia {
  id: number;
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// Content types

export interface Manufacturer {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  logo?: StrapiMedia | null;
  description?: string;
  website?: string;
  country?: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  parent?: Category | null;
  children?: Category[];
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string;
  description?: string;
  specs?: Record<string, string>;
  images?: StrapiMedia[] | null;
  datasheet?: StrapiMedia | null;
  priceRange?: string;
  manufacturer?: Manufacturer | null;
  categories?: Category[];
}

export interface CaseStudy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  industry?: string;
  problem?: string;
  solution?: string;
  results?: string;
  coverImage?: StrapiMedia | null;
  images?: StrapiMedia[] | null;
}

export interface Testimonial {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
  logo?: StrapiMedia | null;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: 'news' | 'technical' | 'case-study';
  tags?: string[];
  coverImage?: StrapiMedia | null;
  publishedAt?: string;
  createdAt?: string;
}
