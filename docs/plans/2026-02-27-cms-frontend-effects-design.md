# VB Sensoric — CMS Content Types, Frontend Integration & Visual Effects

**Date:** 2026-02-27
**Status:** Approved

## 1. Strapi Content Types

### Manufacturer
- name (string, required), slug (uid from name), logo (media), description (text), website (string), country (string)
- Relation: has many Products

### Category
- name (string, required), slug (uid from name), icon (string — emoji or icon class), description (text)
- Self-relation: parent (Category, optional) for hierarchy
- Relation: many-to-many Products

### Product
- name (string, required), slug (uid from name), sku (string, unique), shortDescription (string), description (rich text), specs (JSON — key/value pairs), images (media, multiple), datasheet (media, single), priceRange (string — e.g. "По запитване", "€200-500")
- Relations: belongs to Manufacturer, many-to-many Categories

### CaseStudy
- title (string, required), slug (uid from title), industry (string), problem (rich text), solution (rich text), results (rich text), images (media, multiple), coverImage (media, single)
- Relation: many-to-many Products

### Testimonial
- quote (text, required), authorName (string), authorTitle (string), company (string), logo (media)

### BlogPost
- title (string, required), slug (uid from title), excerpt (text), content (rich text), category (enumeration: news/technical/case-study), tags (JSON array), coverImage (media, single), publishedAt (datetime)

## 2. Seed Data

### Manufacturers (6)
SICK, Datasensing, BD Sensors, Hikrobot, Mech-Mind, SinceVision — with real descriptions and countries.

### Categories (6)
Фотоелектрични сензори, Индуктивни сензори, Machine Vision, Сензори за налягане, Системи за безопасност, 3D визуални системи

### Products (~18, 3 per manufacturer)
Real model names, SKUs, specs from manufacturer catalogs.

### CaseStudies (3), Testimonials (3), BlogPosts (3)
Realistic Bulgarian content.

## 3. Frontend Integration

### API Client (lib/strapi.ts)
- Add API token auth header (STRAPI_API_TOKEN env var)
- Typed fetch functions: getManufacturers(), getCategories(), getProducts(filters), getProduct(slug), getCaseStudies(), getCaseStudy(slug), getBlogPosts(), getBlogPost(slug), getTestimonials()

### Pages
- **Home**: ManufacturersBar fetches from Strapi, FeaturedProducts fetches categories
- **Products page**: real product grid, filter sidebar (manufacturer + category dropdowns)
- **Product detail** `/products/[slug]`: image gallery, specs table, related products, quote CTA
- **Solutions**: case study cards from Strapi, detail page `/solutions/[slug]`
- **News**: blog post cards from Strapi
- **About/Contact**: remain static

## 4. Visual Effects

- **tsParticles** in HeroSection: connected dots mesh, SCADA blue theme, responsive
- **GSAP ScrollTrigger**: fade-in + translateY for section reveals on scroll
- **Product card hover**: scan-line overlay effect using existing keyframe
