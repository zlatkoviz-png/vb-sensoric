# VB Sensoric Website - Technical Handoff for Claude Code
**Date:** 2026-02-27
**Status:** Initial scaffold complete. Frontend running. CMS needs build fix.

---

## PROJECT OVERVIEW

### What We're Building
VB Sensoric website — industrial sensors and vision systems distributor.
SCADA/HMI-inspired dark theme, product catalog with faceted search, headless CMS, customer portal.

### Client Brief Summary
- Product catalog: hierarchical (Manufacturer → Category → Subcategory → Product)
- Faceted search: manufacturer, type, technology, range, output, IP rating
- Product comparison (3-4 items)
- Quote request forms (contextual from product pages)
- Case studies, testimonials, blog
- Customer portal (phase 2): dashboard, order history, downloads, support tickets
- PWA with offline support
- Bilingual: Bulgarian (primary) + English
- WCAG 2.1 AA accessibility
- Lighthouse Performance ≥ 85

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router) + TypeScript + Tailwind CSS 3.4 |
| **CMS** | Strapi v5 (headless, TypeScript) |
| **Database** | PostgreSQL 16 (for Strapi) |
| **Search** | Meilisearch v1.6 |
| **Animations** | GSAP + Three.js (React Three Fiber) + tsParticles |
| **Deploy** | Docker Compose @ 192.168.3.90 |

---

## CURRENT STATE

### Working
- ✅ Frontend (Next.js) running on port 8210 with hot reload
- ✅ All 7 pages rendering: Home, Products, Solutions, About, News, Contact
- ✅ Header with responsive nav (mobile hamburger, desktop full nav)
- ✅ Footer with manufacturer links and contact info
- ✅ Hero section with animated counters
- ✅ SCADA dark theme fully applied (globals.css + tailwind config)
- ✅ Meilisearch running on port 8212
- ✅ PostgreSQL running (healthy)
- ✅ GitHub repo connected and pushed

### Needs Work
- ⚠️ CMS (Strapi) - Dockerfile needs fixing (Strapi v5 requires empty dir during init)
- 🔲 Connect frontend to Strapi API (products, case studies, blog)
- 🔲 Strapi content types setup (Product, Manufacturer, Category, CaseStudy, Testimonial, BlogPost)
- 🔲 Meilisearch indexing from Strapi
- 🔲 Product detail page (/products/[slug])
- 🔲 Product comparison feature
- 🔲 Quote request form with backend
- 🔲 Particle effects (Three.js / tsParticles) in hero
- 🔲 GSAP scroll animations
- 🔲 Mega menu for products
- 🔲 i18n (Bulgarian + English)
- 🔲 PWA (manifest, service worker)
- 🔲 Customer portal (phase 2)
- 🔲 SEO (Schema.org markup, sitemap.xml)

---

## PROJECT STRUCTURE

```
/home/zlatko/CRM/VB/
├── docker-compose.yml          # 4 services: frontend, cms, db, search
├── .env                        # DB password, Strapi keys, Meilisearch key
├── .gitignore
├── README.md
├── CLAUDE.md                   # Project instructions for Claude Code
├── CLAUDE_CODE_HANDOFF.md      # This file
├── frontend/
│   ├── Dockerfile              # node:20-alpine, npm run dev
│   ├── package.json            # Next.js + GSAP + Three.js + tsParticles + Meilisearch
│   ├── next.config.js          # Standalone output, Strapi image domains
│   ├── tsconfig.json           # Strict, path alias @/*
│   ├── tailwind.config.ts      # SCADA colors, fonts, glow effects, animations
│   ├── postcss.config.js
│   └── src/
│       ├── app/
│       │   ├── layout.tsx      # Root: Inter + JetBrains Mono fonts, dark mode
│       │   ├── page.tsx        # Home: Hero, Manufacturers, Categories, WhyUs
│       │   ├── products/page.tsx
│       │   ├── solutions/page.tsx
│       │   ├── about/page.tsx
│       │   ├── news/page.tsx
│       │   └── contact/page.tsx
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.tsx  # Sticky, responsive, search toggle
│       │   │   └── Footer.tsx  # 4-column grid
│       │   └── home/
│       │       ├── HeroSection.tsx      # Animated counters, CTA buttons
│       │       ├── ManufacturersBar.tsx  # 6 manufacturer links
│       │       ├── FeaturedProducts.tsx  # 6 category cards with glow
│       │       └── WhyUs.tsx            # 4 USP items
│       ├── lib/
│       │   ├── strapi.ts       # fetchStrapi(), getStrapiMedia()
│       │   ├── search.ts       # Meilisearch client, searchProducts()
│       │   └── utils.ts        # cn() helper (clsx + tailwind-merge)
│       └── styles/
│           └── globals.css     # SCADA theme, grid-bg, glow effects, scrollbar
├── cms/
│   ├── Dockerfile              # Multi-stage: create-strapi-app in builder, copy to runtime
│   └── config/
│       ├── database.ts         # PostgreSQL config from env vars
│       └── server.ts           # Host + port + app keys
```

---

## DOCKER COMPOSE

### Services
```
vb-frontend  → 0.0.0.0:8210 → Next.js dev server (port 3000)
vb-cms       → 0.0.0.0:8211 → Strapi (port 1337)
vb-db        → internal:5432 → PostgreSQL 16
vb-search    → 0.0.0.0:8212 → Meilisearch (port 7700)
```

### Network: vb-network (bridge)
- Frontend connects to CMS via http://cms:1337
- Frontend connects to search via http://search:7700
- CMS connects to DB via db:5432

### Volumes
- `postgres_data` — DB persistence
- `cms_uploads` — Strapi uploaded files
- `search_data` — Meilisearch index data
- `./frontend/src` → `/app/src` (hot reload)
- `./cms/src` → `/opt/app/src` (CMS customization)
- `./cms/config` → `/opt/app/config`

### Environment
```
DB_PASSWORD=vb_secret_2026
MEILI_MASTER_KEY=vb_search_master_2026
STRAPI_APP_KEYS, STRAPI_API_TOKEN_SALT, STRAPI_ADMIN_JWT_SECRET, etc.
```

---

## DESIGN SYSTEM

### Colors (Tailwind)
```
scada-bg:      #0A0E1A    — page background
scada-surface: #1A1D23    — panels, cards
scada-border:  #2A2D35    — borders
scada-text:    #E0E0E0    — primary text
scada-muted:   #8A8D95    — secondary text
accent-blue:   #00B4D8    — CTA, links, primary accent
accent-green:  #00E676    — status indicators, success
accent-orange: #FF6D00    — warnings, urgency
accent-cyan:   #00E5FF    — secondary accent
```

### CSS Classes (globals.css)
```
.scada-panel     — bg-surface + border + rounded
.scada-glow      — blue box-shadow glow
.glow-border     — animated border glow on hover
.btn-primary     — blue filled button with glow hover
.btn-secondary   — blue outline button
.grid-bg         — grid line background pattern
```

### Fonts
- Body: Inter (variable --font-sans), cyrillic subset
- Mono: JetBrains Mono (variable --font-mono), for SKUs, specs, technical data

---

## NEXT PRIORITIES (recommended order)

### 1. Fix Strapi CMS Build
The CMS Dockerfile uses multi-stage build with `create-strapi-app`. It should work now.
```bash
docker compose up -d --build cms
docker logs vb-cms --tail 50
```
After Strapi starts, access admin panel at http://192.168.3.90:8211/admin to create first admin user.

### 2. Create Strapi Content Types
In Strapi admin, create these content types:
- **Manufacturer:** name, slug, logo, description, website, country
- **Category:** name, slug, icon, description, parent (self-relation)
- **Product:** name, slug, sku, description, specs (JSON), images, datasheet (file), manufacturer (relation), categories (relation), accessories (self-relation)
- **CaseStudy:** title, slug, industry, problem, solution, results, images, products (relation)
- **Testimonial:** quote, authorName, authorTitle, company, logo
- **BlogPost:** title, slug, excerpt, content (rich text), category, tags, coverImage, publishedAt

### 3. Connect Frontend to Strapi
- Update `lib/strapi.ts` with API token auth
- Create product listing with real data
- Create product detail page `/products/[slug]`
- Create case study detail page `/solutions/[slug]`

### 4. Add Visual Effects
- tsParticles in HeroSection (particle mesh background)
- GSAP ScrollTrigger for section reveal animations
- Product card hover effects (scan-line, translateZ)

### 5. Faceted Search
- Index products in Meilisearch from Strapi (webhook or sync script)
- Build filter UI (manufacturer, category, technology, output type, IP rating)
- Autocomplete search in header

### 6. i18n
- Install `next-intl`
- Add Bulgarian + English translations
- URL prefix: /bg/, /en/

---

## COMMANDS CHEAT SHEET
```bash
# Start all
cd ~/CRM/VB && docker compose up -d

# Rebuild specific service
docker compose up -d --build frontend
docker compose up -d --build cms

# Logs
docker logs vb-frontend -f
docker logs vb-cms -f

# Restart
docker restart vb-frontend

# DB
docker exec -it vb-db psql -U vb_user -d vb_sensoric

# Meilisearch
curl http://localhost:8212/health
curl -H "Authorization: Bearer vb_search_master_2026" http://localhost:8212/indexes
```

---

## URLS
| Service | URL |
|---------|-----|
| Frontend | http://192.168.3.90:8210 |
| Strapi Admin | http://192.168.3.90:8211/admin |
| Meilisearch | http://192.168.3.90:8212 |
| GitHub | https://github.com/zlatkoviz-png/vb-sensoric |

---

## KNOWN ISSUES
- CMS Dockerfile may need adjustment if Strapi v5 changes CLI flags
- Frontend volume mount means node_modules lives only in container (not on host)
- Port 8200/8201 were taken by nextcloud-mcp/crm_email_mcp → using 8210/8211/8212
- Animated counters show 0 on SSR (hydrate to correct values on client)
