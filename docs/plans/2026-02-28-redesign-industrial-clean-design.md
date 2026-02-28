# VB Sensoric Redesign — "Industrial Clean"

## Overview

Redesign from dark SCADA theme to hybrid light/dark "Industrial Clean" style inspired by sick.com. Teal (#0D9488) brand color, white content sections, dark hero/footer.

## Problems Solved

- Too dark/gloomy — entire site was #0A0E1A
- Generic/template look — no unique visual identity
- No imagery — all text, emoji icons, no manufacturer logos
- "SYSTEM ONLINE" badge felt gimmicky

## Design Direction

Hybrid light/dark with teal accents. Professional B2B industrial aesthetic.

## Color System

| Role | Hex | Usage |
|------|-----|-------|
| Primary Teal | `#0D9488` | CTA buttons, active links, accents |
| Primary Dark | `#115E59` | Hover states, secondary emphasis |
| Hero/Footer BG | `#0F172A` | Dark sections (Slate 900) |
| Hero Surface | `#1E293B` | Cards in dark sections (Slate 800) |
| Light BG | `#FFFFFF` | Main content sections |
| Alt Light BG | `#F8FAFC` | Alternating sections (Slate 50) |
| Text Primary | `#0F172A` | Headings on light (Slate 900) |
| Text Secondary | `#64748B` | Descriptions (Slate 500) |
| Text on Dark | `#F1F5F9` | Text in dark sections (Slate 100) |
| Border | `#E2E8F0` | Cards, dividers (Slate 200) |
| Dark Border | `#334155` | Borders in dark sections (Slate 700) |
| Success | `#10B981` | Status, availability (Emerald 500) |
| Warning | `#F59E0B` | Warnings (Amber 500) |

## Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (Hero) | Inter | 48-56px | 800 (extrabold) |
| H2 (sections) | Inter | 32-40px | 700 (bold) |
| H3 (cards) | Inter | 20-24px | 600 (semibold) |
| Body | Inter | 16px | 400 |
| Small/meta | Inter | 14px | 400 |
| Technical data | JetBrains Mono | 13px | 400 |
| Buttons | Inter | 14-16px | 600 |

## Components

### Header
- White background with thin bottom border (#E2E8F0), sticky with backdrop-blur on scroll
- VB Sensoric logo (SVG) left-aligned
- Horizontal nav links in slate-700, hover → teal-600
- "Products" opens mega-menu dropdown with categories + manufacturers
- Teal CTA button "Поискай оферта" on right
- Search icon → full-width search bar (Meilisearch)
- Mobile: hamburger → slide-out menu

### Hero Section
- Dark gradient background (#0F172A → #1E293B), NO particles
- Left: large headline (48-56px, extrabold, white), subtitle (slate-300), two buttons (teal primary + white outline)
- Right: subtle geometric SVG pattern or abstract sensor visualization (CSS/SVG)
- Stats: 4 animated counters in a row below — white text, teal numbers, clean (no panel borders)
- Remove "SYSTEM ONLINE" badge

### Manufacturers Bar
- White or slate-50 background
- 6 manufacturer SVG logos in a row, grayscale → color on hover
- Label: "Официален дистрибутор на" — small, uppercase, tracking-wider

### Featured Products (Categories)
- White background (#FFFFFF)
- 3x2 grid of category cards
- Card: white bg, border slate-200, subtle shadow, hover → shadow-lg + slight translate-y
- Icon: SVG icon in teal-50 circle (not emoji)
- Title semibold, description slate-500
- CTA: outlined teal button "Виж всички продукти", centered

### Why Us
- Full teal gradient background (teal-600 → teal-700)
- White text
- 2x2 grid of feature cards: semi-transparent white bg (bg-white/10), backdrop-blur
- White SVG icons instead of numbers

### Footer
- Slate-900 background (matching hero)
- 4 columns: Brand, Manufacturers, Navigation, Contact
- Text slate-400, links hover → teal-400
- Copyright bar at bottom

## Pages

### Products Page (`/products`)
- Breadcrumb navigation
- White sidebar panel with accordion filters (Manufacturer, Category) + checkboxes
- 3-column product grid: white cards with product image, name, manufacturer badge, SKU (mono), "Подробности" link
- Teal active state pagination

### Product Detail (`/products/[slug]`)
- Breadcrumb
- 2-column: left = image gallery, right = name, manufacturer, SKU, short description, specs table (zebra striping), CTA "Поискай оферта"
- Below: full description, related products, datasheet download

### Contact (`/contact`)
- Slate-50 background
- 2-column: left = form in white panel, right = contact info + Google Maps iframe
- Teal submit button, full-width

### Solutions (`/solutions`)
- 3-column grid: cards with image placeholder, title, excerpt, "Прочети повече"

### About (`/about`)
- Text page with visual accents — timeline or key facts in teal boxes

### News (`/news`)
- Blog grid: cards with date, title, excerpt

## CSS Changes Summary

- Replace entire SCADA color system with Tailwind Slate + Teal
- Remove: dot-matrix bg, scan-line hover, pulse-glow, grid-bg
- Add: proper shadow system, teal gradient utilities
- Keep: JetBrains Mono for technical data, Inter for body
- Keep: scroll reveal animations (GSAP), prefers-reduced-motion support
- Remove: tsParticles dependency

## Files to Modify

- `tailwind.config.ts` — new color tokens
- `globals.css` — replace SCADA utilities with new components
- `layout.tsx` — white body bg, update class
- `Header.tsx` — white header, mega-menu
- `HeroSection.tsx` — dark gradient hero, no particles
- `ManufacturersBar.tsx` — SVG logos, grayscale hover
- `FeaturedProducts.tsx` — white cards, SVG icons
- `WhyUs.tsx` — teal background section
- `Footer.tsx` — slate-900 footer
- `products/page.tsx` — updated styling
- `products/[slug]/page.tsx` — updated styling
- `contact/page.tsx` — slate-50 bg, updated form
- `solutions/page.tsx` — updated cards
- `about/page.tsx` — updated styling
- `news/page.tsx` — updated cards
