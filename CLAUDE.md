# CLAUDE.md - VB Sensoric Website

## Project Context
VB Sensoric — industrial sensors and vision systems distributor website.
Based on the client brief: SCADA/HMI-inspired dark theme, product catalog, CMS, customer portal.

## Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS 3.4
- **CMS:** Strapi v5 (headless, PostgreSQL)
- **Search:** Meilisearch
- **Animations:** GSAP, Three.js (React Three Fiber), tsParticles
- **Deploy:** Docker Compose on Ubuntu 24.04 @ 192.168.3.90

## Project Location
```
/home/zlatko/CRM/VB/
├── frontend/          # Next.js app
├── cms/               # Strapi CMS
├── docker-compose.yml
└── .env
```

## Docker Services

| Container | Port | Tech |
|-----------|------|------|
| vb-frontend | 8210 | Next.js 14 (dev mode) |
| vb-cms | 8211 | Strapi v5 |
| vb-db | 5432 (internal) | PostgreSQL 16 |
| vb-search | 8212 | Meilisearch |

## Common Commands
```bash
cd ~/CRM/VB && docker compose up -d
docker compose up -d --build        # rebuild after changes
docker logs vb-frontend --tail 50
docker logs vb-cms --tail 50
docker logs vb-frontend -f          # live logs

# DB access
docker exec -it vb-db psql -U vb_user -d vb_sensoric
```

## Frontend Key Files
| File | Purpose |
|------|---------|
| `frontend/src/app/layout.tsx` | Root layout (fonts, Header, Footer) |
| `frontend/src/app/page.tsx` | Home page |
| `frontend/src/app/products/page.tsx` | Product catalog |
| `frontend/src/app/contact/page.tsx` | Contact form |
| `frontend/src/app/solutions/page.tsx` | Case studies |
| `frontend/src/app/about/page.tsx` | About page |
| `frontend/src/app/news/page.tsx` | Blog/news |
| `frontend/src/components/layout/Header.tsx` | Navigation + search |
| `frontend/src/components/layout/Footer.tsx` | Footer |
| `frontend/src/components/home/HeroSection.tsx` | Hero with animated counters |
| `frontend/src/components/home/ManufacturersBar.tsx` | Logo bar |
| `frontend/src/components/home/FeaturedProducts.tsx` | Category cards |
| `frontend/src/components/home/WhyUs.tsx` | USP section |
| `frontend/src/lib/strapi.ts` | Strapi API client |
| `frontend/src/lib/search.ts` | Meilisearch client |
| `frontend/src/styles/globals.css` | SCADA theme CSS |
| `frontend/tailwind.config.ts` | Custom colors, fonts, glow effects |

## Design System (SCADA Theme)
- **Background:** #0A0E1A (deep navy)
- **Surface:** #1A1D23 (panels)
- **Border:** #2A2D35
- **Accent Blue:** #00B4D8 (CTA, links, glow)
- **Accent Green:** #00E676 (status, success)
- **Accent Orange:** #FF6D00 (warnings, urgency)
- **Fonts:** Inter (body), JetBrains Mono (technical data)
- **Effects:** Glow borders, grid background, dot matrix pattern

## Language Preferences
- Code: English (variable names, comments)
- UI strings: Bulgarian (user-facing text)
- Commit messages: English

## Architecture Notes
- Next.js App Router with TypeScript
- Hot reload via Docker volume mount (frontend/src → /app/src)
- Strapi provides REST API for content at http://cms:1337/api
- Meilisearch at http://search:7700 for product search
- Dark mode is DEFAULT (class="dark" on html)
- prefers-reduced-motion respected for all animations

## Manufacturers (6)
1. SICK — industrial sensors, laser scanners, encoders, safety
2. Datasensing — photoelectric sensors, barcode readers, vision
3. BD Sensors — pressure, level, temperature sensors
4. Hikrobot — industrial cameras, machine vision
5. Mech-Mind — 3D vision, AI robotics
6. SinceVision — visual inspection, quality control

## GitHub
- Repo: https://github.com/zlatkoviz-png/vb-sensoric
- Branch: main
