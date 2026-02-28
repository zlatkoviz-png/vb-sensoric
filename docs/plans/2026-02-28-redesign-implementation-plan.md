# VB Sensoric "Industrial Clean" Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign VB Sensoric from dark SCADA theme to hybrid light/dark "Industrial Clean" style with teal (#0D9488) brand color.

**Architecture:** Replace the SCADA color system with Tailwind Slate + Teal. Restyle all components in-place. Remove tsParticles. Keep GSAP scroll animations. No structural changes to data flow or Strapi integration.

**Tech Stack:** Next.js 14, Tailwind CSS 3.4, GSAP, Lucide React (icons)

**Design Doc:** `docs/plans/2026-02-28-redesign-industrial-clean-design.md`

---

### Task 1: Foundation — Tailwind config + CSS variables

**Files:**
- Modify: `frontend/tailwind.config.ts`
- Modify: `frontend/src/styles/globals.css`

**Step 1: Replace tailwind.config.ts colors and theme**

Replace the entire content of `frontend/tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Replace globals.css**

Replace the entire content of `frontend/src/styles/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-slate-900 antialiased;
  }

  ::selection {
    background-color: rgba(13, 148, 136, 0.2);
    color: #0F172A;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #F8FAFC;
  }
  ::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #0D9488;
  }
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg
           hover:bg-primary-700 transition-all duration-200
           active:scale-[0.98] shadow-sm hover:shadow-md;
  }

  .btn-secondary {
    @apply px-6 py-3 border border-primary-600 text-primary-600
           font-semibold rounded-lg hover:bg-primary-50 transition-all duration-200;
  }

  .btn-white {
    @apply px-6 py-3 border border-white/30 text-white font-semibold
           rounded-lg hover:bg-white/10 transition-all duration-200;
  }

  .section-dark {
    @apply bg-slate-900 text-slate-100;
  }

  .section-light {
    @apply bg-white text-slate-900;
  }

  .section-alt {
    @apply bg-slate-50 text-slate-900;
  }

  .section-teal {
    @apply bg-gradient-to-br from-primary-600 to-primary-700 text-white;
  }

  .card {
    @apply bg-white border border-slate-200 rounded-xl shadow-card
           hover:shadow-card-hover transition-all duration-300;
  }

  .card-dark {
    @apply bg-slate-800 border border-slate-700 rounded-xl;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Step 3: Verify frontend compiles**

Run: `docker logs vb-frontend --tail 10`
Expected: Compiled successfully (may show warnings about unused classes in components — that's OK, we'll fix them next)

**Step 4: Commit**

```bash
git add frontend/tailwind.config.ts frontend/src/styles/globals.css
git commit -m "feat(redesign): replace SCADA theme with Industrial Clean foundation"
```

---

### Task 2: Root layout — light body

**Files:**
- Modify: `frontend/src/app/layout.tsx`

**Step 1: Update the root layout**

In `frontend/src/app/layout.tsx`, change the `<html>` and `<body>` tags:
- Remove `className="dark"` from `<html>`
- Replace body className: remove `bg-scada-bg text-scada-text`, add `font-sans`

The body tag should become:
```tsx
<body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
```

Also update `viewport` themeColor from `"#0A0E1A"` to `"#0D9488"`.

**Step 2: Verify**

Run: `docker logs vb-frontend --tail 5`
Expected: Compiles. Site now has white background.

**Step 3: Commit**

```bash
git add frontend/src/app/layout.tsx
git commit -m "feat(redesign): switch root layout to light theme"
```

---

### Task 3: Header — white with teal accents

**Files:**
- Modify: `frontend/src/components/layout/Header.tsx`

**Step 1: Rewrite Header component**

Replace the entire content of `Header.tsx`. Key changes:
- White background (`bg-white`) with `border-b border-slate-200`
- Nav links: `text-slate-600 hover:text-primary-600`
- Search bar: `bg-slate-50 border-slate-200` instead of `bg-scada-surface`
- Mobile menu: `bg-white` instead of `bg-scada-bg`
- CTA button: `btn-primary`
- Logo: Keep the VB square but use `bg-primary-600`
- Brand name: `text-slate-900`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/products", label: "Продукти" },
  { href: "/solutions", label: "Решения" },
  { href: "/about", label: "За нас" },
  { href: "/news", label: "Новини" },
  { href: "/contact", label: "Контакти" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center">
              <span className="font-mono font-bold text-white text-sm">VB</span>
            </div>
            <span className="font-semibold text-lg text-slate-900 hidden sm:block">
              VB Sensoric
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-slate-600 hover:text-primary-600 transition-colors rounded-md hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-500 hover:text-primary-600 transition-colors"
              aria-label="Търсене"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary text-sm !px-4 !py-2"
            >
              Поискай оферта
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-500 hover:text-primary-600"
              aria-label="Меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4">
            <input
              type="search"
              placeholder="Търси по каталожен номер, наименование..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 placeholder:text-slate-400"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block mt-4 btn-primary text-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Поискай оферта
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
```

**Step 2: Verify**

Check the site at http://192.168.3.90:8210 — header should be white with teal accents.

**Step 3: Commit**

```bash
git add frontend/src/components/layout/Header.tsx
git commit -m "feat(redesign): white header with teal accents"
```

---

### Task 4: Hero Section — dark gradient, no particles

**Files:**
- Modify: `frontend/src/components/home/HeroSection.tsx`

**Step 1: Rewrite HeroSection**

Remove tsParticles entirely. Replace with dark gradient hero + geometric SVG pattern + clean stats.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Продукта в каталога", value: 5000, suffix: "+" },
  { label: "Години опит", value: 15, suffix: "+" },
  { label: "Реализирани проекта", value: 300, suffix: "+" },
  { label: "Производители", value: 6, suffix: "" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-mono text-3xl md:text-4xl font-bold text-primary-400">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

function GeometricPattern() {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-1/2 opacity-[0.07]"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" />
      <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" />
      <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" />
      <line x1="73" y1="73" x2="327" y2="327" stroke="currentColor" strokeWidth="0.5" />
      <line x1="327" y1="73" x2="73" y2="327" stroke="currentColor" strokeWidth="0.5" />
      <rect x="120" y="120" width="160" height="160" stroke="currentColor" strokeWidth="0.5" rx="4" />
      <rect x="160" y="160" width="80" height="80" stroke="currentColor" strokeWidth="0.5" rx="2" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <GeometricPattern />

      {/* Subtle teal glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Индустриални сензори и{" "}
            <span className="text-primary-400">визуални системи</span>{" "}
            за автоматизация
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
            Дистрибутор на SICK, Datasensing, BD Sensors, Hikrobot, Mech-Mind и
            SinceVision. Експертни решения за вашето производство.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/products" className="btn-primary text-center">
              Разгледай продуктите
            </Link>
            <Link href="/contact" className="btn-white text-center">
              Поискай оферта
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-slate-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify**

Check site — hero should be dark gradient with geometric pattern, no particles.

**Step 3: Commit**

```bash
git add frontend/src/components/home/HeroSection.tsx
git commit -m "feat(redesign): dark gradient hero with geometric pattern, remove particles"
```

---

### Task 5: ManufacturersBar — grayscale logos

**Files:**
- Modify: `frontend/src/components/home/ManufacturersBar.tsx`

**Step 1: Restyle ManufacturersBar**

Update to use `section-alt` background, larger text with grayscale-to-color hover effect.

```tsx
import Link from "next/link";
import type { Manufacturer } from "@/lib/types";

const fallbackManufacturers = [
  { name: "SICK", slug: "sick" },
  { name: "Datasensing", slug: "datasensing" },
  { name: "BD Sensors", slug: "bd-sensors" },
  { name: "Hikrobot", slug: "hikrobot" },
  { name: "Mech-Mind", slug: "mech-mind" },
  { name: "SinceVision", slug: "sincevision" },
];

export function ManufacturersBar({ manufacturers }: { manufacturers?: Manufacturer[] }) {
  const items = manufacturers?.length
    ? manufacturers.map((m) => ({ name: m.name, slug: m.slug }))
    : fallbackManufacturers;

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-400 mb-8 font-medium">
          Официален дистрибутор на
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {items.map((m) => (
            <Link
              key={m.slug}
              href={`/products?manufacturer=${m.slug}`}
              className="text-slate-400 hover:text-primary-600 transition-colors duration-300 font-bold text-xl tracking-wide"
            >
              {m.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/home/ManufacturersBar.tsx
git commit -m "feat(redesign): light manufacturers bar with hover effects"
```

---

### Task 6: FeaturedProducts — white cards with SVG icons

**Files:**
- Modify: `frontend/src/components/home/FeaturedProducts.tsx`

**Step 1: Rewrite with SVG icons and light cards**

Replace emoji icons with Lucide SVG icon names. Use `card` class for styling.

```tsx
import Link from "next/link";
import { Zap, Wrench, Camera, Gauge, Shield, Box } from "lucide-react";
import type { Category } from "@/lib/types";

const fallbackCategories = [
  { name: "Фотоелектрични сензори", description: "Прецизно детектиране на обекти, цветове и разстояния", icon: Zap, slug: "photoelectric" },
  { name: "Индуктивни сензори", description: "Надеждно разпознаване на метални обекти без контакт", icon: Wrench, slug: "inductive" },
  { name: "Machine Vision", description: "Индустриални камери и AI-базирани визуални системи", icon: Camera, slug: "vision" },
  { name: "Сензори за налягане", description: "Измерване на налягане, ниво и температура", icon: Gauge, slug: "pressure" },
  { name: "Системи за безопасност", description: "Лазерни скенери, светлинни завеси, аварийни стопове", icon: Shield, slug: "safety" },
  { name: "3D визуални системи", description: "Роботизирано зрение и AI решения за pick & place", icon: Box, slug: "3d-vision" },
];

export function FeaturedProducts({ categories }: { categories?: Category[] }) {
  const items = categories?.length
    ? categories.map((c) => ({
        name: c.name,
        description: c.description || "",
        icon: null,
        slug: c.slug,
      }))
    : fallbackCategories;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Продуктови категории
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Пълна гама индустриални сензори и визуални системи от водещи световни производители
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cat) => {
            const IconComponent = 'icon' in cat && cat.icon ? cat.icon : Box;
            return (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group card p-6 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-secondary">
            Виж всички продукти
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/home/FeaturedProducts.tsx
git commit -m "feat(redesign): white category cards with SVG icons"
```

---

### Task 7: WhyUs — teal gradient section

**Files:**
- Modify: `frontend/src/components/home/WhyUs.tsx`

**Step 1: Restyle to teal gradient background with glassmorphism cards**

```tsx
import { Award, Headphones, Truck, Globe } from "lucide-react";

const reasons = [
  {
    title: "Експертни познания",
    description: "Дългогодишен опит в индустриалната автоматизация и сензорните технологии.",
    icon: Award,
  },
  {
    title: "Техническа поддръжка",
    description: "Помагаме при избора, конфигурирането и интеграцията на продуктите.",
    icon: Headphones,
  },
  {
    title: "Бърза доставка",
    description: "Наличност на склад и бърза логистика за критични проекти.",
    icon: Truck,
  },
  {
    title: "Водещи марки",
    description: "Официален дистрибутор на 6 световни лидера в сензорните технологии.",
    icon: Globe,
  },
];

export function WhyUs() {
  return (
    <section className="py-20 section-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Защо <span className="text-primary-200">VB Sensoric</span>
          </h2>
          <p className="text-primary-100">
            Експертен партньор, не просто търговец
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <reason.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{reason.title}</h3>
                <p className="text-sm text-primary-100">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/home/WhyUs.tsx
git commit -m "feat(redesign): teal gradient WhyUs section with lucide icons"
```

---

### Task 8: Footer — slate-900

**Files:**
- Modify: `frontend/src/components/layout/Footer.tsx`

**Step 1: Restyle footer to dark slate**

```tsx
import Link from "next/link";

const manufacturers = [
  "SICK", "Datasensing", "BD Sensors", "Hikrobot", "Mech-Mind", "SinceVision",
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center">
                <span className="font-mono font-bold text-white text-sm">VB</span>
              </div>
              <span className="font-semibold text-lg text-white">VB Sensoric</span>
            </div>
            <p className="text-sm">
              Дистрибутор на индустриални сензори и визуални системи за автоматизация.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-400">
              Производители
            </h3>
            <ul className="space-y-2">
              {manufacturers.map((m) => (
                <li key={m}>
                  <Link href={`/products?manufacturer=${m.toLowerCase()}`} className="text-sm hover:text-primary-400 transition-colors">
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-400">
              Навигация
            </h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm hover:text-primary-400 transition-colors">Продукти</Link></li>
              <li><Link href="/solutions" className="text-sm hover:text-primary-400 transition-colors">Решения</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary-400 transition-colors">За нас</Link></li>
              <li><Link href="/news" className="text-sm hover:text-primary-400 transition-colors">Новини</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary-400 transition-colors">Контакти</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-400">
              Контакти
            </h3>
            <ul className="space-y-2 text-sm">
              <li>София, България</li>
              <li>info@vbsensoric.bg</li>
              <li>+359 2 XXX XXXX</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VB Sensoric. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/layout/Footer.tsx
git commit -m "feat(redesign): dark slate footer with teal accents"
```

---

### Task 9: ScrollReveal — keep as-is

**Files:**
- No changes needed

`ScrollReveal.tsx` uses GSAP and respects reduced motion. No SCADA classes used. Keep as-is.

---

### Task 10: ProductCard — light card styling

**Files:**
- Modify: `frontend/src/components/products/ProductCard.tsx`

**Step 1: Replace SCADA classes with light card styling**

```tsx
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
```

**Step 2: Commit**

```bash
git add frontend/src/components/products/ProductCard.tsx
git commit -m "feat(redesign): light product cards"
```

---

### Task 11: FilterSidebar — light styling

**Files:**
- Modify: `frontend/src/components/products/FilterSidebar.tsx`

**Step 1: Replace SCADA classes with light theme**

Key changes:
- `scada-panel` → `card`
- `bg-scada-bg` → `bg-slate-50`
- `border-scada-border` → `border-slate-200`
- `text-accent-blue` → `text-primary-600`
- `bg-accent-blue/20` → `bg-primary-50`
- `text-scada-muted` → `text-slate-500`
- `text-white` → `text-slate-900`

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Manufacturer, Category } from "@/lib/types";

interface FilterSidebarProps {
  manufacturers: Manufacturer[];
  categories: Category[];
}

export function FilterSidebar({ manufacturers, categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMfg = searchParams.get("manufacturer") || "";
  const currentCat = searchParams.get("category") || "";

  const activeCount = (currentMfg ? 1 : 0) + (currentCat ? 1 : 0);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/products");
  }

  return (
    <div className="card p-4 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-slate-900">
          Филтри
          {activeCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 text-xs">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-slate-400 hover:text-primary-600 transition-colors"
          >
            Изчисти
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
            Производител
          </label>
          <select
            value={currentMfg}
            onChange={(e) => updateFilter("manufacturer", e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
          >
            <option value="">Всички</option>
            {manufacturers.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
            Категория
          </label>
          <select
            value={currentCat}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
          >
            <option value="">Всички</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/products/FilterSidebar.tsx
git commit -m "feat(redesign): light filter sidebar"
```

---

### Task 12: Products page — light styling

**Files:**
- Modify: `frontend/src/app/products/page.tsx`

**Step 1: Replace SCADA class references**

Key replacements in the file:
- `scada-panel` → `card`
- `text-scada-muted` → `text-slate-500`
- `text-accent-blue` → `text-primary-600`
- `bg-accent-blue/20 text-accent-blue border border-accent-blue/30` → `bg-primary-50 text-primary-600 border border-primary-200`
- `hover:text-accent-blue` → `hover:text-primary-600`
- `text-white` → `text-slate-900`

In the Pagination component, update the active page style:
```tsx
p === page
  ? "bg-primary-50 text-primary-600 border border-primary-200"
  : "card hover:text-primary-600"
```

In the "no results" state:
```tsx
<div className="card p-12 text-center">
  <p className="text-slate-500">Няма намерени продукти с избраните филтри.</p>
</div>
```

In the product count text:
```tsx
<p className="text-sm text-slate-500 font-mono">
```

**Step 2: Commit**

```bash
git add frontend/src/app/products/page.tsx
git commit -m "feat(redesign): light products page"
```

---

### Task 13: Product detail page — light styling

**Files:**
- Modify: `frontend/src/app/products/[slug]/page.tsx`

**Step 1: Replace all SCADA classes**

Key replacements throughout the file:
- `scada-panel` → `card`
- `text-scada-muted` → `text-slate-500`
- `text-accent-blue` → `text-primary-600`
- `hover:text-accent-blue` → `hover:text-primary-600`
- `text-accent-green` → `text-emerald-600`
- `bg-scada-bg/50` → `bg-slate-50`
- `border-scada-border` → `border-slate-200`
- `text-white` → `text-slate-900`
- `border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10` → `border-primary-200 text-primary-600 hover:bg-primary-50`
- `prose-invert` → (remove, not needed in light mode)
- `glow-border` → (remove)

**Step 2: Commit**

```bash
git add frontend/src/app/products/[slug]/page.tsx
git commit -m "feat(redesign): light product detail page"
```

---

### Task 14: Contact page — slate-50 background

**Files:**
- Modify: `frontend/src/app/contact/page.tsx`

**Step 1: Restyle contact page**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Свържете се с VB Sensoric за запитване или оферта",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Контакти</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Изпрати запитване</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Име</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Фирма</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Телефон</label>
                  <input type="tel" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Описание на запитването</label>
                <textarea rows={5} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Изпрати запитване
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">VB Sensoric</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="text-primary-600">&#9679;</span>
                  <span>София, България</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600">&#9679;</span>
                  <span>info@vbsensoric.bg</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600">&#9679;</span>
                  <span>+359 2 XXX XXXX</span>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Работно време</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Понеделник - Петък: 09:00 - 18:00</li>
                <li>Събота - Неделя: Почивни дни</li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="card aspect-video flex items-center justify-center">
              <span className="text-slate-400 text-sm">Google Maps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/src/app/contact/page.tsx
git commit -m "feat(redesign): light contact page with slate-50 background"
```

---

### Task 15: Solutions, About, News pages — light styling

**Files:**
- Modify: `frontend/src/app/solutions/page.tsx`
- Modify: `frontend/src/app/about/page.tsx`
- Modify: `frontend/src/app/news/page.tsx`

**Step 1: Update solutions page**

Key replacements:
- `scada-panel` → `card`
- `glow-border` → (remove)
- `bg-scada-bg` → `bg-slate-50`
- `text-scada-muted` → `text-slate-500`
- `text-accent-green` → `text-emerald-600`
- `text-accent-blue` → `text-primary-600`
- `hover:text-accent-blue` → `hover:text-primary-600`

**Step 2: Update about page**

Replace `scada-panel` → `card`, `text-scada-muted` → `text-slate-600`.

**Step 3: Update news page**

Same pattern:
- `scada-panel` → `card`
- `glow-border` → (remove)
- `bg-scada-bg` → `bg-slate-50`
- `text-scada-muted` → `text-slate-500`
- `text-accent-blue` → `text-primary-600`
- `border-accent-blue/30 text-accent-blue` → `border-primary-200 text-primary-600`

**Step 4: Commit**

```bash
git add frontend/src/app/solutions/page.tsx frontend/src/app/about/page.tsx frontend/src/app/news/page.tsx
git commit -m "feat(redesign): light solutions, about, and news pages"
```

---

### Task 16: Solutions detail page — light styling

**Files:**
- Modify: `frontend/src/app/solutions/[slug]/page.tsx`

**Step 1: Apply same SCADA → light replacements**

Same class replacement pattern as other pages.

**Step 2: Commit**

```bash
git add frontend/src/app/solutions/[slug]/page.tsx
git commit -m "feat(redesign): light solutions detail page"
```

---

### Task 17: Remove unused dependencies

**Files:**
- Modify: `frontend/package.json`

**Step 1: Remove tsParticles and Three.js packages**

Remove these from `dependencies`:
- `@tsparticles/react`
- `@tsparticles/slim`
- `tsparticles`
- `@react-three/fiber`
- `@react-three/drei`
- `three`

Remove from `devDependencies`:
- `@types/three`

**Step 2: Rebuild container**

Run: `cd ~/CRM/VB && docker compose up -d --build frontend`

**Step 3: Verify**

Run: `docker logs vb-frontend --tail 15`
Expected: Compiles successfully, no import errors.

**Step 4: Commit**

```bash
git add frontend/package.json
git commit -m "chore: remove tsparticles and three.js dependencies"
```

---

### Task 18: Final visual verification

**No files to modify — verification only.**

**Step 1: Check all pages**

Visit each page and verify light theme:
- http://192.168.3.90:8210/ — dark hero, white content sections, teal WhyUs, dark footer
- http://192.168.3.90:8210/products — white cards, light sidebar
- http://192.168.3.90:8210/products/sick-w16 — light detail page
- http://192.168.3.90:8210/contact — slate-50 background
- http://192.168.3.90:8210/solutions — light cards
- http://192.168.3.90:8210/about — light text page
- http://192.168.3.90:8210/news — light blog cards

**Step 2: Check mobile responsiveness**

Resize browser to mobile width and verify:
- Header hamburger menu works
- Hero text is readable
- Cards stack vertically
- Footer columns stack

**Step 3: If everything looks good, commit any final fixes**
