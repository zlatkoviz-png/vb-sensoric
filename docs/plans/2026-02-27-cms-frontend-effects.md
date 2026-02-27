# CMS Content Types, Frontend Integration & Visual Effects — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create 6 Strapi content types with seed data, connect the Next.js frontend to Strapi API, and add particle/scroll animation effects.

**Architecture:** Strapi v5 schema files define content types programmatically in `cms/src/api/`. Frontend fetches via typed helper functions in `lib/strapi.ts`. A seed script populates realistic data via Strapi REST API. Visual effects use tsParticles (already in package.json) for hero particles and GSAP ScrollTrigger for reveal animations.

**Tech Stack:** Strapi v5.37, Next.js 14 App Router, TypeScript, tsParticles 3.x, GSAP 3.12, Tailwind CSS 3.4

---

## Phase 1: Strapi Content Types

### Task 1: Manufacturer content type

**Files:**
- Create: `cms/src/api/manufacturer/content-types/manufacturer/schema.json`
- Create: `cms/src/api/manufacturer/controllers/manufacturer.ts`
- Create: `cms/src/api/manufacturer/services/manufacturer.ts`
- Create: `cms/src/api/manufacturer/routes/manufacturer.ts`

**Step 1: Create schema.json**

```json
{
  "kind": "collectionType",
  "collectionName": "manufacturers",
  "info": {
    "singularName": "manufacturer",
    "pluralName": "manufacturers",
    "displayName": "Manufacturer",
    "description": "Sensor manufacturers distributed by VB Sensoric"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": { "type": "string", "required": true, "unique": true },
    "slug": { "type": "uid", "targetField": "name", "required": true },
    "logo": { "type": "media", "allowedTypes": ["images"] },
    "description": { "type": "text" },
    "website": { "type": "string" },
    "country": { "type": "string" },
    "products": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::product.product",
      "mappedBy": "manufacturer"
    }
  }
}
```

**Step 2: Create controller, service, routes (Strapi v5 boilerplate)**

`cms/src/api/manufacturer/controllers/manufacturer.ts`:
```ts
import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::manufacturer.manufacturer');
```

`cms/src/api/manufacturer/services/manufacturer.ts`:
```ts
import { factories } from '@strapi/strapi';
export default factories.createCoreService('api::manufacturer.manufacturer');
```

`cms/src/api/manufacturer/routes/manufacturer.ts`:
```ts
import { factories } from '@strapi/strapi';
export default factories.createCoreRouter('api::manufacturer.manufacturer');
```

**Step 3: Verify**

```bash
docker compose up -d --build cms && sleep 15 && docker logs vb-cms --tail 20
```
Expected: "Strapi started successfully", no schema errors.

**Step 4: Commit**

```bash
git add cms/src/api/manufacturer/
git commit -m "feat(cms): add Manufacturer content type"
```

---

### Task 2: Category content type

**Files:**
- Create: `cms/src/api/category/content-types/category/schema.json`
- Create: `cms/src/api/category/controllers/category.ts`
- Create: `cms/src/api/category/services/category.ts`
- Create: `cms/src/api/category/routes/category.ts`

**Step 1: Create schema.json**

```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category",
    "description": "Product categories with optional hierarchy"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "name", "required": true },
    "icon": { "type": "string" },
    "description": { "type": "text" },
    "parent": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "children"
    },
    "children": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::category.category",
      "mappedBy": "parent"
    },
    "products": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::product.product",
      "mappedBy": "categories"
    }
  }
}
```

**Step 2: Create controller, service, routes** (same boilerplate pattern, `api::category.category`)

**Step 3: Commit**

```bash
git add cms/src/api/category/
git commit -m "feat(cms): add Category content type with self-relation hierarchy"
```

---

### Task 3: Product content type

**Files:**
- Create: `cms/src/api/product/content-types/product/schema.json`
- Create: `cms/src/api/product/controllers/product.ts`
- Create: `cms/src/api/product/services/product.ts`
- Create: `cms/src/api/product/routes/product.ts`

**Step 1: Create schema.json**

```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product",
    "description": "Industrial sensors and vision systems"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "name", "required": true },
    "sku": { "type": "string", "unique": true, "required": true },
    "shortDescription": { "type": "string", "maxLength": 255 },
    "description": { "type": "richtext" },
    "specs": { "type": "json" },
    "images": { "type": "media", "multiple": true, "allowedTypes": ["images"] },
    "datasheet": { "type": "media", "allowedTypes": ["files"] },
    "priceRange": { "type": "string" },
    "manufacturer": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::manufacturer.manufacturer",
      "inversedBy": "products"
    },
    "categories": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::category.category",
      "inversedBy": "products"
    }
  }
}
```

**Step 2: Create controller, service, routes** (boilerplate, `api::product.product`)

**Step 3: Commit**

```bash
git add cms/src/api/product/
git commit -m "feat(cms): add Product content type with manufacturer/category relations"
```

---

### Task 4: CaseStudy, Testimonial, BlogPost content types

**Files:**
- Create: `cms/src/api/case-study/content-types/case-study/schema.json` + controller/service/routes
- Create: `cms/src/api/testimonial/content-types/testimonial/schema.json` + controller/service/routes
- Create: `cms/src/api/blog-post/content-types/blog-post/schema.json` + controller/service/routes

**Step 1: CaseStudy schema.json**

```json
{
  "kind": "collectionType",
  "collectionName": "case_studies",
  "info": {
    "singularName": "case-study",
    "pluralName": "case-studies",
    "displayName": "Case Study"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "industry": { "type": "string" },
    "problem": { "type": "richtext" },
    "solution": { "type": "richtext" },
    "results": { "type": "richtext" },
    "coverImage": { "type": "media", "allowedTypes": ["images"] },
    "images": { "type": "media", "multiple": true, "allowedTypes": ["images"] },
    "products": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::product.product"
    }
  }
}
```

**Step 2: Testimonial schema.json**

```json
{
  "kind": "collectionType",
  "collectionName": "testimonials",
  "info": {
    "singularName": "testimonial",
    "pluralName": "testimonials",
    "displayName": "Testimonial"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "quote": { "type": "text", "required": true },
    "authorName": { "type": "string", "required": true },
    "authorTitle": { "type": "string" },
    "company": { "type": "string" },
    "logo": { "type": "media", "allowedTypes": ["images"] }
  }
}
```

**Step 3: BlogPost schema.json**

```json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "excerpt": { "type": "text" },
    "content": { "type": "richtext" },
    "category": {
      "type": "enumeration",
      "enum": ["news", "technical", "case-study"]
    },
    "tags": { "type": "json" },
    "coverImage": { "type": "media", "allowedTypes": ["images"] },
    "publishedAt": { "type": "datetime" }
  }
}
```

**Step 4: Create controller/service/routes for each** (boilerplate pattern)

**Step 5: Rebuild CMS and verify all 6 types load**

```bash
docker compose up -d --build cms && sleep 15 && docker logs vb-cms --tail 10
```
Expected: "Strapi started successfully"

**Step 6: Commit**

```bash
git add cms/src/api/case-study/ cms/src/api/testimonial/ cms/src/api/blog-post/
git commit -m "feat(cms): add CaseStudy, Testimonial, BlogPost content types"
```

---

### Task 5: Create Strapi admin user + API token, configure public permissions

**Step 1: Create admin user via Strapi admin UI**

Open http://192.168.3.90:8211/admin → create admin account.

**Step 2: Create API token**

In Strapi Admin → Settings → API Tokens → Create new:
- Name: `frontend-readonly`
- Type: `Read-only`
- Copy the token.

**Step 3: Add token to .env**

Add to `~/CRM/VB/.env`:
```
STRAPI_API_TOKEN=<paste-token-here>
```

Add to `docker-compose.yml` frontend environment:
```yaml
- STRAPI_API_TOKEN=${STRAPI_API_TOKEN:-}
```

**Step 4: Configure public permissions**

In Strapi Admin → Settings → Users & Permissions → Roles → Public:
Enable `find` and `findOne` for: Manufacturer, Category, Product, CaseStudy, Testimonial, BlogPost.

**Step 5: Verify API responds**

```bash
curl -s http://192.168.3.90:8211/api/manufacturers | head -c 200
```
Expected: JSON with `data: []` (empty but working).

**Step 6: Commit .env changes**

```bash
git add docker-compose.yml
git commit -m "feat: add STRAPI_API_TOKEN to frontend environment"
```

---

### Task 6: Seed script with realistic data

**Files:**
- Create: `cms/scripts/seed.ts`

**Step 1: Create seed script**

`cms/scripts/seed.ts` — Node.js script that POSTs data to Strapi REST API:

```ts
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:8211';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function api(endpoint: string, data: any) {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`FAIL ${endpoint}:`, err);
    return null;
  }
  const json = await res.json();
  console.log(`OK ${endpoint}: ${json.data?.id}`);
  return json.data;
}

async function seed() {
  // --- Manufacturers ---
  const manufacturers = [
    { name: 'SICK', slug: 'sick', description: 'Водещ световен производител на индустриални сензори, лазерни скенери, енкодери и системи за безопасност. Основана 1946, Германия.', website: 'https://www.sick.com', country: 'Германия' },
    { name: 'Datasensing', slug: 'datasensing', description: 'Фотоелектрични сензори, баркод четци, визуални системи и индуктивни сензори за индустриална автоматизация. Италия.', website: 'https://www.datasensing.com', country: 'Италия' },
    { name: 'BD Sensors', slug: 'bd-sensors', description: 'Специалист в сензори за налягане, ниво и температура за процесна индустрия. Основана 1993, Чехия.', website: 'https://www.bdsensors.com', country: 'Чехия' },
    { name: 'Hikrobot', slug: 'hikrobot', description: 'Индустриални камери, машинно зрение и баркод четци за автоматизация и логистика. Китай.', website: 'https://www.hikrobotics.com', country: 'Китай' },
    { name: 'Mech-Mind', slug: 'mech-mind', description: '3D визуални системи с AI за роботизирано зрение, bin picking и качествен контрол. Китай.', website: 'https://www.mech-mind.com', country: 'Китай' },
    { name: 'SinceVision', slug: 'sincevision', description: 'Визуална инспекция и качествен контрол за производствени линии. Китай.', website: 'https://www.sincevision.com', country: 'Китай' },
  ];
  const mfgIds: Record<string, number> = {};
  for (const m of manufacturers) {
    const r = await api('/manufacturers', m);
    if (r) mfgIds[m.slug] = r.id;
  }

  // --- Categories ---
  const categories = [
    { name: 'Фотоелектрични сензори', slug: 'photoelectric', icon: '⚡', description: 'Прецизно детектиране на обекти, цветове и разстояния' },
    { name: 'Индуктивни сензори', slug: 'inductive', icon: '🔧', description: 'Надеждно разпознаване на метални обекти без контакт' },
    { name: 'Machine Vision', slug: 'vision', icon: '📷', description: 'Индустриални камери и AI-базирани визуални системи' },
    { name: 'Сензори за налягане', slug: 'pressure', icon: '📊', description: 'Измерване на налягане, ниво и температура' },
    { name: 'Системи за безопасност', slug: 'safety', icon: '🛡️', description: 'Лазерни скенери, светлинни завеси, аварийни стопове' },
    { name: '3D визуални системи', slug: '3d-vision', icon: '🤖', description: 'Роботизирано зрение и AI решения за pick & place' },
  ];
  const catIds: Record<string, number> = {};
  for (const c of categories) {
    const r = await api('/categories', c);
    if (r) catIds[c.slug] = r.id;
  }

  // --- Products ---
  const products = [
    // SICK
    { name: 'SICK W16 Photoelectric Sensor', slug: 'sick-w16', sku: 'SICK-W16-3P2430', shortDescription: 'Фотоелектричен сензор за детектиране на обекти до 18м', specs: { range: '0-18m', output: 'PNP/NPN', voltage: '10-30V DC', ip: 'IP67', response: '0.5ms' }, priceRange: 'По запитване', manufacturer: null as any, categories: [] as any[] },
    { name: 'SICK TiM781 2D LiDAR', slug: 'sick-tim781', sku: 'SICK-TIM781-2174101', shortDescription: '2D LiDAR сензор за навигация и измерване на разстояния', specs: { range: '0.05-25m', angle: '270°', frequency: '15Hz', ip: 'IP67', interface: 'Ethernet' }, priceRange: '€1500-2500', manufacturer: null as any, categories: [] as any[] },
    { name: 'SICK DFS60 Encoder', slug: 'sick-dfs60', sku: 'SICK-DFS60-A4PA65536', shortDescription: 'Инкрементален енкодер до 65536 импулса за прецизно позициониране', specs: { resolution: 'до 65536 ppr', shaft: '6mm', voltage: '5-30V DC', ip: 'IP65', diameter: '60mm' }, priceRange: '€200-400', manufacturer: null as any, categories: [] as any[] },
    // Datasensing
    { name: 'Datasensing S65-PA Barcode Reader', slug: 'datasensing-s65-pa', sku: 'DS-S65-PA-5-C01-PP', shortDescription: 'Компактен баркод четец за индустриални приложения', specs: { type: '1D/2D', distance: '40-400mm', interface: 'RS232/USB', ip: 'IP65', rate: '60 reads/s' }, priceRange: '€300-500', manufacturer: null as any, categories: [] as any[] },
    { name: 'Datasensing S3N Photoelectric', slug: 'datasensing-s3n', sku: 'DS-S3N-PR-5-C01-PP', shortDescription: 'Мини фотоелектричен сензор с висока точност', specs: { range: '0-2m', output: 'PNP', voltage: '10-30V DC', ip: 'IP67', size: '20x30x12mm' }, priceRange: '€50-120', manufacturer: null as any, categories: [] as any[] },
    { name: 'Datasensing S15 Inductive', slug: 'datasensing-s15', sku: 'DS-S15-IA-5-C01-PP', shortDescription: 'Индуктивен сензор M18 с увеличено разстояние на засичане', specs: { range: '0-12mm', output: 'PNP NO', voltage: '10-30V DC', ip: 'IP67', diameter: 'M18' }, priceRange: '€30-80', manufacturer: null as any, categories: [] as any[] },
    // BD Sensors
    { name: 'BD Sensors DMP 331', slug: 'bd-dmp-331', sku: 'BD-DMP331-110-E003-1-5-100-N40-1-000', shortDescription: 'Пиезорезистивен трансмитер за налягане от неръждаема стомана', specs: { range: '0-100 bar', accuracy: '0.25% FS', output: '4-20mA', ip: 'IP65', media: 'газ, течност' }, priceRange: '€200-450', manufacturer: null as any, categories: [] as any[] },
    { name: 'BD Sensors LMK 307', slug: 'bd-lmk-307', sku: 'BD-LMK307-307-3-2-1-1-3-040-000', shortDescription: 'Хидростатичен сензор за ниво в резервоари', specs: { range: '0-40m H2O', accuracy: '0.25% FS', output: '4-20mA', ip: 'IP68', cable: 'до 100м' }, priceRange: '€300-600', manufacturer: null as any, categories: [] as any[] },
    { name: 'BD Sensors DPS 300', slug: 'bd-dps-300', sku: 'BD-DPS300-811-E003-1-5-B16-1-000', shortDescription: 'Дигитален дисплей за налягане с програмируем изход', specs: { range: '0-16 bar', display: '4-digit LED', output: '4-20mA + relay', ip: 'IP65', power: '12-36V DC' }, priceRange: '€250-500', manufacturer: null as any, categories: [] as any[] },
    // Hikrobot
    { name: 'Hikrobot MV-CS060-10UC', slug: 'hikrobot-mv-cs060', sku: 'HIK-MVCS06010UC', shortDescription: '6MP USB3.0 индустриална камера с Sony IMX178 сензор', specs: { resolution: '3072x2048', fps: '22fps', interface: 'USB 3.0', sensor: 'Sony IMX178', mount: 'C-mount' }, priceRange: '€300-500', manufacturer: null as any, categories: [] as any[] },
    { name: 'Hikrobot MV-ID5060M', slug: 'hikrobot-mv-id5060m', sku: 'HIK-MVID5060M', shortDescription: 'Индустриален баркод четец с вградено осветление', specs: { type: '1D/2D/DPM', distance: '60-300mm', interface: 'GigE/RS232', ip: 'IP67', rate: '120 reads/s' }, priceRange: '€400-700', manufacturer: null as any, categories: [] as any[] },
    { name: 'Hikrobot MV-CA013-21UC', slug: 'hikrobot-mv-ca013', sku: 'HIK-MVCA01321UC', shortDescription: '1.3MP GigE индустриална камера за високоскоростна инспекция', specs: { resolution: '1280x1024', fps: '211fps', interface: 'GigE', sensor: 'CMOS 1/2"', mount: 'C-mount' }, priceRange: '€200-350', manufacturer: null as any, categories: [] as any[] },
    // Mech-Mind
    { name: 'Mech-Eye Pro', slug: 'mech-eye-pro', sku: 'MM-MECHEYEPRO-S', shortDescription: '3D камера с висока точност за роботизирано зрение и bin picking', specs: { range: '0.4-2m', accuracy: '< 0.1mm', pointCloud: '2 million pts', interface: 'GigE', weight: '1.9kg' }, priceRange: '€5000-8000', manufacturer: null as any, categories: [] as any[] },
    { name: 'Mech-Eye Nano', slug: 'mech-eye-nano', sku: 'MM-MECHEYENANO-U', shortDescription: 'Компактна 3D камера за малки работни пространства', specs: { range: '0.15-0.6m', accuracy: '< 0.05mm', pointCloud: '1.2 million pts', interface: 'USB 3.0', weight: '0.5kg' }, priceRange: '€3000-5000', manufacturer: null as any, categories: [] as any[] },
    { name: 'Mech-Vision Software', slug: 'mech-vision', sku: 'MM-MECHVISION-STD', shortDescription: 'Софтуерна платформа за 3D визуално разпознаване без програмиране', specs: { type: 'Software', compatibility: 'Mech-Eye cameras', features: 'No-code, drag & drop', robots: '20+ brands', os: 'Windows 10/11' }, priceRange: 'По запитване', manufacturer: null as any, categories: [] as any[] },
    // SinceVision
    { name: 'SinceVision SV-1000 Inspector', slug: 'sincevision-sv1000', sku: 'SV-1000-STD-01', shortDescription: 'Система за визуална инспекция на производствена линия', specs: { resolution: '5MP', speed: '200 parts/min', defects: 'scratch, dent, color', interface: 'GigE + I/O', light: 'integrated LED' }, priceRange: '€3000-6000', manufacturer: null as any, categories: [] as any[] },
    { name: 'SinceVision SV-500 Label Inspector', slug: 'sincevision-sv500', sku: 'SV-500-LBL-01', shortDescription: 'OCR/OCV система за проверка на етикети и текст', specs: { type: 'OCR/OCV', speed: '300 parts/min', languages: 'Latin, Cyrillic, Chinese', interface: 'Ethernet + RS232', accuracy: '99.9%' }, priceRange: '€2000-4000', manufacturer: null as any, categories: [] as any[] },
    { name: 'SinceVision SV-200 Color Sensor', slug: 'sincevision-sv200', sku: 'SV-200-CLR-01', shortDescription: 'Интелигентен цветови сензор за сортиране и качествен контрол', specs: { colors: '256 registered', distance: '20-100mm', output: 'NPN/PNP + RS232', ip: 'IP65', response: '1ms' }, priceRange: '€500-1000', manufacturer: null as any, categories: [] as any[] },
  ];

  // Map manufacturer slugs to IDs
  const mfgMap: Record<string, string> = { 'sick': 'sick', 'datasensing': 'datasensing', 'bd': 'bd-sensors', 'hikrobot': 'hikrobot', 'mech': 'mech-mind', 'sincevision': 'sincevision' };
  // Map products to their manufacturer + categories
  const productMeta = [
    { mfg: 'sick', cats: ['photoelectric'] },
    { mfg: 'sick', cats: ['safety'] },
    { mfg: 'sick', cats: ['inductive'] },
    { mfg: 'datasensing', cats: ['vision'] },
    { mfg: 'datasensing', cats: ['photoelectric'] },
    { mfg: 'datasensing', cats: ['inductive'] },
    { mfg: 'bd-sensors', cats: ['pressure'] },
    { mfg: 'bd-sensors', cats: ['pressure'] },
    { mfg: 'bd-sensors', cats: ['pressure'] },
    { mfg: 'hikrobot', cats: ['vision'] },
    { mfg: 'hikrobot', cats: ['vision'] },
    { mfg: 'hikrobot', cats: ['vision'] },
    { mfg: 'mech-mind', cats: ['3d-vision'] },
    { mfg: 'mech-mind', cats: ['3d-vision'] },
    { mfg: 'mech-mind', cats: ['3d-vision'] },
    { mfg: 'sincevision', cats: ['vision'] },
    { mfg: 'sincevision', cats: ['vision'] },
    { mfg: 'sincevision', cats: ['vision'] },
  ];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const meta = productMeta[i];
    p.manufacturer = mfgIds[meta.mfg] || null;
    p.categories = meta.cats.map(c => catIds[c]).filter(Boolean);
    await api('/products', p);
  }

  // --- Case Studies ---
  const caseStudies = [
    { title: 'Автоматизация на сортировъчна линия с SICK', slug: 'sorting-line-sick', industry: 'Логистика', problem: 'Клиентът имаше нужда от автоматично сортиране на пакети по размер и тегло с производителност 3000 пакета/час.', solution: 'Внедрихме SICK TiM781 LiDAR сензори за измерване на габарити в комбинация с фотоелектрични сензори W16 за детекция на позиция.', results: 'Производителността се увеличи с 40%, грешките при сортиране намаляха от 2.1% на 0.3%.' },
    { title: 'Качествен контрол с Hikrobot камери', slug: 'quality-control-hikrobot', industry: 'Производство', problem: 'Ръчната инспекция на метални компоненти отнемаше твърде много време и не осигуряваше достатъчна точност.', solution: 'Изградихме визуална система с Hikrobot MV-CS060 камери и собствен AI алгоритъм за детекция на дефекти.', results: 'Скоростта на инспекция се увеличи 5x, точността достигна 99.7%.' },
    { title: '3D роботизирано зрение с Mech-Mind', slug: '3d-robot-vision-mechmind', industry: 'Автомобилна индустрия', problem: 'Робот за заваряване се нуждаеше от точно позициониране на различни по форма детайли в кутия (bin picking).', solution: 'Инсталирахме Mech-Eye Pro 3D камера с Mech-Vision софтуер за автоматично разпознаване и pick & place.', results: 'Времето за цикъл намаля с 30%, роботът работи 24/7 без ръчна намеса.' },
  ];
  for (const cs of caseStudies) { await api('/case-studies', cs); }

  // --- Testimonials ---
  const testimonials = [
    { quote: 'VB Sensoric ни помогнаха да изберем правилните сензори и да ги интегрираме бързо. Техническата поддръжка е на най-високо ниво.', authorName: 'Иван Петров', authorTitle: 'Технически директор', company: 'Автоматика БГ ООД' },
    { quote: 'Работим с VB Sensoric от 3 години. Винаги намират решение, дори за нестандартни проекти. Препоръчвам ги горещо.', authorName: 'Мария Георгиева', authorTitle: 'Главен инженер', company: 'ПакЛайн АД' },
    { quote: 'Благодарение на Mech-Mind решението, което VB Sensoric внедриха, спестяваме 200 човекочаса месечно.', authorName: 'Стефан Димитров', authorTitle: 'Ръководител производство', company: 'МеталПро ЕООД' },
  ];
  for (const t of testimonials) { await api('/testimonials', t); }

  // --- Blog Posts ---
  const blogPosts = [
    { title: 'Как да изберем правилния фотоелектричен сензор', slug: 'choosing-photoelectric-sensor', excerpt: 'Ръководство за избор на фотоелектричен сензор според приложението — обхват, изход, защита.', content: 'Фотоелектричните сензори са един от най-разпространените типове индустриални сензори...', category: 'technical', tags: ['сензори', 'фотоелектрични', 'ръководство'], publishedAt: '2026-02-20T10:00:00.000Z' },
    { title: 'SICK представи новата серия W16 с IO-Link', slug: 'sick-w16-io-link-launch', excerpt: 'SICK обяви нова версия на популярния W16 фотоелектричен сензор с вграден IO-Link интерфейс.', content: 'SICK разширява продуктовата си линия W16 с нова версия, включваща IO-Link...', category: 'news', tags: ['SICK', 'W16', 'IO-Link'], publishedAt: '2026-02-25T14:00:00.000Z' },
    { title: 'Machine Vision тенденции за 2026', slug: 'machine-vision-trends-2026', excerpt: 'Преглед на основните тенденции в индустриалното машинно зрение — AI, 3D, edge computing.', content: 'Индустриалното машинно зрение продължава да се развива стремително...', category: 'technical', tags: ['machine vision', 'AI', 'тенденции', '2026'], publishedAt: '2026-02-27T09:00:00.000Z' },
  ];
  for (const bp of blogPosts) { await api('/blog-posts', bp); }

  console.log('\n✅ Seed complete!');
}

seed().catch(console.error);
```

**Step 2: Run seed after admin setup and API token creation**

```bash
STRAPI_URL=http://192.168.3.90:8211 STRAPI_API_TOKEN=<token> npx tsx cms/scripts/seed.ts
```
Expected: 18 products, 6 manufacturers, 6 categories, 3 case studies, 3 testimonials, 3 blog posts.

**Step 3: Verify in Strapi admin** — check data exists in all content types.

**Step 4: Commit**

```bash
git add cms/scripts/seed.ts
git commit -m "feat(cms): add seed script with realistic product data"
```

---

## Phase 2: Frontend Integration

### Task 7: Update Strapi client with typed fetch functions

**Files:**
- Modify: `frontend/src/lib/strapi.ts`
- Create: `frontend/src/lib/types.ts`

**Step 1: Create types.ts with all Strapi response types**

```ts
// Strapi v5 response wrapper
export interface StrapiItem<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: StrapiItem<T>[];
  meta: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiSingleResponse<T> {
  data: StrapiItem<T>;
  meta: {};
}

// Content types
export interface Manufacturer {
  name: string;
  slug: string;
  logo?: { data: { attributes: { url: string } } | null };
  description?: string;
  website?: string;
  country?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

export interface Product {
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string;
  description?: string;
  specs?: Record<string, string>;
  images?: { data: { attributes: { url: string; width: number; height: number } }[] | null };
  datasheet?: { data: { attributes: { url: string } } | null };
  priceRange?: string;
  manufacturer?: { data: StrapiItem<Manufacturer> | null };
  categories?: { data: StrapiItem<Category>[] };
}

export interface CaseStudy {
  title: string;
  slug: string;
  industry?: string;
  problem?: string;
  solution?: string;
  results?: string;
  coverImage?: { data: { attributes: { url: string } } | null };
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: 'news' | 'technical' | 'case-study';
  tags?: string[];
  coverImage?: { data: { attributes: { url: string } } | null };
  publishedAt?: string;
}
```

**Step 2: Update strapi.ts with API token and typed helpers**

```ts
import type { StrapiResponse, StrapiSingleResponse, Manufacturer, Category, Product, CaseStudy, Testimonial, BlogPost } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

export async function fetchStrapi<T>(endpoint: string, params?: Record<string, string>): Promise<StrapiResponse<T>> {
  const url = new URL(`/api${endpoint}`, STRAPI_URL);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), { headers, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  return res.json();
}

export async function fetchStrapiSingle<T>(endpoint: string, params?: Record<string, string>): Promise<StrapiSingleResponse<T>> {
  const url = new URL(`/api${endpoint}`, STRAPI_URL);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), { headers, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  return res.json();
}

export function getStrapiMedia(url: string | null): string {
  if (!url) return '/placeholder.png';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// Typed fetchers
export const getManufacturers = () => fetchStrapi<Manufacturer>('/manufacturers', { 'populate': '*' });
export const getCategories = () => fetchStrapi<Category>('/categories', { 'populate': '*' });
export const getProducts = (params?: Record<string, string>) => fetchStrapi<Product>('/products', { 'populate': '*', ...params });
export const getProduct = (slug: string) => fetchStrapi<Product>('/products', { 'filters[slug][$eq]': slug, 'populate': '*' });
export const getCaseStudies = () => fetchStrapi<CaseStudy>('/case-studies', { 'populate': '*' });
export const getCaseStudy = (slug: string) => fetchStrapi<CaseStudy>('/case-studies', { 'filters[slug][$eq]': slug, 'populate': '*' });
export const getTestimonials = () => fetchStrapi<Testimonial>('/testimonials');
export const getBlogPosts = () => fetchStrapi<BlogPost>('/blog-posts', { 'populate': '*', 'sort': 'publishedAt:desc' });
export const getBlogPost = (slug: string) => fetchStrapi<BlogPost>('/blog-posts', { 'filters[slug][$eq]': slug, 'populate': '*' });
```

**Step 3: Commit**

```bash
git add frontend/src/lib/types.ts frontend/src/lib/strapi.ts
git commit -m "feat(frontend): typed Strapi client with API token auth"
```

---

### Task 8: Connect Home page components to Strapi

**Files:**
- Modify: `frontend/src/components/home/ManufacturersBar.tsx` — fetch from Strapi
- Modify: `frontend/src/components/home/FeaturedProducts.tsx` — fetch categories from Strapi
- Modify: `frontend/src/app/page.tsx` — pass fetched data to components

**Step 1: Update page.tsx to fetch data server-side and pass as props**

Make page.tsx async, call `getManufacturers()` and `getCategories()`, pass results as props to the child components.

**Step 2: Update ManufacturersBar to accept manufacturers as props** instead of hardcoded array. Fallback to hardcoded data if fetch fails (graceful degradation).

**Step 3: Update FeaturedProducts to accept categories as props** instead of hardcoded array. Same fallback pattern.

**Step 4: Verify** — visit http://192.168.3.90:8210, data should come from Strapi.

**Step 5: Commit**

```bash
git add frontend/src/app/page.tsx frontend/src/components/home/ManufacturersBar.tsx frontend/src/components/home/FeaturedProducts.tsx
git commit -m "feat(frontend): connect home page to Strapi API"
```

---

### Task 9: Products page with real data + filters

**Files:**
- Modify: `frontend/src/app/products/page.tsx` — server-side fetch with filter params
- Create: `frontend/src/components/products/ProductCard.tsx`
- Create: `frontend/src/components/products/FilterSidebar.tsx`

**Step 1: Create ProductCard component**

Reusable card showing product image, SKU (font-mono), name, short description, manufacturer badge, "Поискай оферта" button. Uses `glow-border` and `scada-panel` classes.

**Step 2: Create FilterSidebar component**

Client component with manufacturer and category select dropdowns. On change, updates URL search params (Next.js `useRouter`/`useSearchParams`). Shows active filter count.

**Step 3: Update products/page.tsx**

Async server component: reads searchParams for `manufacturer` and `category`, passes as Strapi filters to `getProducts()`, renders ProductCard grid + FilterSidebar.

**Step 4: Verify** — browse products, filter by manufacturer and category.

**Step 5: Commit**

```bash
git add frontend/src/app/products/page.tsx frontend/src/components/products/
git commit -m "feat(frontend): product catalog with filters from Strapi"
```

---

### Task 10: Product detail page

**Files:**
- Create: `frontend/src/app/products/[slug]/page.tsx`

**Step 1: Create product detail page**

Async server component with `generateMetadata` for SEO. Fetches product by slug via `getProduct(slug)`. Layout:
- Image gallery (first image large, thumbnails below)
- Product name + SKU (font-mono) + manufacturer link
- Specs table (JSON specs → key-value rows in scada-panel)
- Description (rich text)
- "Поискай оферта" CTA button (links to /contact with product pre-filled)
- Related products from same category (last 3)

**Step 2: Verify** — click product card → detail page with specs.

**Step 3: Commit**

```bash
git add frontend/src/app/products/\\[slug\\]/page.tsx
git commit -m "feat(frontend): product detail page with specs and gallery"
```

---

### Task 11: Solutions (case studies) and News (blog) pages

**Files:**
- Modify: `frontend/src/app/solutions/page.tsx`
- Create: `frontend/src/app/solutions/[slug]/page.tsx`
- Modify: `frontend/src/app/news/page.tsx`

**Step 1: Update solutions/page.tsx** — fetch case studies from Strapi, render real cards.

**Step 2: Create solutions/[slug]/page.tsx** — detail page with problem/solution/results sections, related products.

**Step 3: Update news/page.tsx** — fetch blog posts from Strapi, render real cards with date and excerpt.

**Step 4: Verify** — solutions and news pages show Strapi content.

**Step 5: Commit**

```bash
git add frontend/src/app/solutions/ frontend/src/app/news/page.tsx
git commit -m "feat(frontend): solutions and news pages connected to Strapi"
```

---

## Phase 3: Visual Effects

### Task 12: tsParticles in HeroSection

**Files:**
- Modify: `frontend/src/components/home/HeroSection.tsx`

**Step 1: Add particle background**

Import `@tsparticles/react` and `@tsparticles/slim`. Add `<Particles>` component behind hero content with:
- Connected dots mesh (lines between nearby particles)
- Color: accent-blue (#00B4D8) with low opacity (0.3)
- 40-60 particles, slow movement
- `fullScreen: false`, contained in hero section
- Respects `prefers-reduced-motion` (disable if reduced)

**Step 2: Verify** — hero shows animated particle mesh behind text.

**Step 3: Commit**

```bash
git add frontend/src/components/home/HeroSection.tsx
git commit -m "feat(frontend): add tsParticles mesh effect to hero section"
```

---

### Task 13: GSAP ScrollTrigger animations

**Files:**
- Create: `frontend/src/components/ScrollReveal.tsx`
- Modify: `frontend/src/app/page.tsx` — wrap sections

**Step 1: Create ScrollReveal wrapper component**

Client component using GSAP ScrollTrigger. Wraps children, animates `opacity: 0 → 1` and `translateY: 40px → 0` when section enters viewport. Respects `prefers-reduced-motion`.

**Step 2: Wrap Home page sections** with ScrollReveal — ManufacturersBar, FeaturedProducts, WhyUs.

**Step 3: Verify** — scroll down, sections fade in smoothly.

**Step 4: Commit**

```bash
git add frontend/src/components/ScrollReveal.tsx frontend/src/app/page.tsx
git commit -m "feat(frontend): add GSAP scroll reveal animations"
```

---

### Task 14: Product card hover scan-line effect

**Files:**
- Modify: `frontend/src/components/products/ProductCard.tsx`
- Modify: `frontend/src/styles/globals.css`

**Step 1: Add scan-line CSS**

Add to globals.css:
```css
.scan-line-hover {
  position: relative;
  overflow: hidden;
}
.scan-line-hover::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-blue), transparent);
  transform: translateY(-100%);
  opacity: 0;
  transition: opacity 0.3s;
}
.scan-line-hover:hover::after {
  animation: scan-line 1.5s linear infinite;
  opacity: 1;
}
```

**Step 2: Add `scan-line-hover` class to ProductCard root div.**

**Step 3: Verify** — hover over product card, blue scan line animates top to bottom.

**Step 4: Commit**

```bash
git add frontend/src/styles/globals.css frontend/src/components/products/ProductCard.tsx
git commit -m "feat(frontend): add scan-line hover effect to product cards"
```

---

### Task 15: Fix next.config.js image port + final verification

**Files:**
- Modify: `frontend/next.config.js` — fix Strapi image port from 8201 to 8211

**Step 1: Update next.config.js**

Change `port: '8201'` to `port: '8211'`.

**Step 2: Full site verification**

- Home: manufacturers bar, categories, particle effects, scroll animations
- Products: real product grid, filters work, scan-line hover
- Product detail: specs table, manufacturer, gallery
- Solutions: case study cards, detail page
- News: blog post cards

**Step 3: Commit**

```bash
git add frontend/next.config.js
git commit -m "fix: correct Strapi image port in next.config"
```
