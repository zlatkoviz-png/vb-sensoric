# VB Sensoric — Implementation Progress

**Last updated:** 2026-02-27
**Plan:** `docs/plans/2026-02-27-cms-frontend-effects.md`
**Design:** `docs/plans/2026-02-27-cms-frontend-effects-design.md`
**Execution style:** Subagent-Driven Development

---

## Completed

### Tasks 1-4: Create all 6 Strapi content types
- **Commit:** `748ac22 feat(cms): add all 6 Strapi content types`
- 24 files created in `cms/src/api/` (6 content types × 4 files each)
- Content types: manufacturer, category, product, case-study, testimonial, blog-post
- All schemas with proper relations, uid fields, media fields per design doc

### Task 5 (partial): Strapi admin + API token
- **Admin user created:** `admin@vbsensoric.bg` / `VBadmin2026`
- **API token created (full-access):** saved to `/tmp/vb_api_token.txt`
  - Token value: `229867493451854f4f6ac56f060439d685789f30e700413ea98f440f5ad6793f8f30abe59b92a5ca692287d686dd3ad2a613d6cc2b82764a51e704e9c61dd72b0064d78bf9e55c1fbd11b50ac055a20d6fed00e2badad488355350555cfb1e875304018501ffd12083b79f2367a263fbbd346a0441ef4eada86e0450fa7718cb`

---

## In Progress

### Task 5 (remaining): Public permissions + env config
Still needed:
1. **Configure public role permissions** — enable `find` and `findOne` for all 6 content types on the Public role
   - The users-permissions roles API endpoint returned data but the public role ID extraction failed
   - Try: `GET http://192.168.3.90:8211/api/users-permissions/roles` with admin JWT, inspect raw JSON to find public role ID
   - Then: `PUT http://192.168.3.90:8211/api/users-permissions/roles/{id}` with permissions object
   - Alternative: Use Strapi admin panel at `http://192.168.3.90:8211/admin` (admin@vbsensoric.bg / VBadmin2026)
2. **Add API token to .env:** `STRAPI_API_TOKEN=<token value>`
3. **Add to docker-compose.yml frontend environment:** `STRAPI_API_TOKEN: ${STRAPI_API_TOKEN:-}`
4. **Commit these changes**

---

## Pending Tasks (in order)

| # | Task | Description |
|---|------|-------------|
| 6 | Seed script | `cms/scripts/seed.ts` — 18 products, 6 manufacturers, 6 categories, 3 case studies, 3 testimonials, 3 blog posts |
| 7 | Typed Strapi client | `frontend/src/lib/types.ts` + update `frontend/src/lib/strapi.ts` with auth header |
| 8 | Connect Home page | ManufacturersBar + FeaturedProducts fetch from Strapi |
| 9 | Products page with filters | ProductCard component, FilterSidebar with manufacturer + category dropdowns |
| 10 | Product detail page | `/products/[slug]` — image gallery, specs table, related products, quote CTA |
| 11 | Solutions and News pages | Case study cards + detail, blog post cards from Strapi |
| 12-15 | Visual effects | tsParticles in HeroSection, GSAP ScrollTrigger, scan-line hover, fix next.config.js image port (8201→8211) |

---

## Infrastructure State

| Service | Port | Status |
|---------|------|--------|
| Frontend (Next.js) | 8210 | Running |
| CMS (Strapi v5.37.1) | 8211 | Running |
| DB (PostgreSQL 16) | 5432 (internal) | Healthy |
| Search (Meilisearch) | 8212 | Running |

### Known Issues
- `frontend/next.config.js` has wrong Strapi image domain port: `8201` should be `8211`
- `.env` missing `STRAPI_API_TOKEN` variable
- `docker-compose.yml` frontend service missing `STRAPI_API_TOKEN` env var
- Public role permissions not yet configured (API returns data but needs read access)

### Credentials
- Strapi admin: `admin@vbsensoric.bg` / `VBadmin2026`
- API token in `/tmp/vb_api_token.txt` (also listed above)
- Strapi admin panel: `http://192.168.3.90:8211/admin`
