/**
 * VB Sensoric — Seed script for Strapi v5
 * Creates: 6 manufacturers, 6 categories, 18 products, 3 case studies, 3 testimonials, 3 blog posts
 *
 * Usage:
 *   STRAPI_URL=http://192.168.3.90:8211 STRAPI_API_TOKEN=<token> npx tsx cms/scripts/seed.ts
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://192.168.3.90:8211';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

if (!API_TOKEN) {
  console.error('ERROR: STRAPI_API_TOKEN is required');
  process.exit(1);
}

async function api(endpoint: string, data: Record<string, unknown>): Promise<{ id: number; documentId: string } | null> {
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
  console.log(`OK ${endpoint}: id=${json.data?.id}`);
  return json.data;
}

async function seed() {
  console.log(`\nSeeding Strapi at ${STRAPI_URL}...\n`);

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

  // --- Products (18 total, 3 per manufacturer) ---
  const products: Array<{ data: Record<string, unknown>; mfg: string; cats: string[] }> = [
    // SICK
    { mfg: 'sick', cats: ['photoelectric'], data: { name: 'SICK W16 Photoelectric Sensor', slug: 'sick-w16', sku: 'SICK-W16-3P2430', shortDescription: 'Фотоелектричен сензор за детектиране на обекти до 18м', specs: { range: '0-18m', output: 'PNP/NPN', voltage: '10-30V DC', ip: 'IP67', response: '0.5ms' }, priceRange: 'По запитване' } },
    { mfg: 'sick', cats: ['safety'], data: { name: 'SICK TiM781 2D LiDAR', slug: 'sick-tim781', sku: 'SICK-TIM781-2174101', shortDescription: '2D LiDAR сензор за навигация и измерване на разстояния', specs: { range: '0.05-25m', angle: '270°', frequency: '15Hz', ip: 'IP67', interface: 'Ethernet' }, priceRange: '€1500-2500' } },
    { mfg: 'sick', cats: ['inductive'], data: { name: 'SICK DFS60 Encoder', slug: 'sick-dfs60', sku: 'SICK-DFS60-A4PA65536', shortDescription: 'Инкрементален енкодер до 65536 импулса за прецизно позициониране', specs: { resolution: 'до 65536 ppr', shaft: '6mm', voltage: '5-30V DC', ip: 'IP65', diameter: '60mm' }, priceRange: '€200-400' } },
    // Datasensing
    { mfg: 'datasensing', cats: ['vision'], data: { name: 'Datasensing S65-PA Barcode Reader', slug: 'datasensing-s65-pa', sku: 'DS-S65-PA-5-C01-PP', shortDescription: 'Компактен баркод четец за индустриални приложения', specs: { type: '1D/2D', distance: '40-400mm', interface: 'RS232/USB', ip: 'IP65', rate: '60 reads/s' }, priceRange: '€300-500' } },
    { mfg: 'datasensing', cats: ['photoelectric'], data: { name: 'Datasensing S3N Photoelectric', slug: 'datasensing-s3n', sku: 'DS-S3N-PR-5-C01-PP', shortDescription: 'Мини фотоелектричен сензор с висока точност', specs: { range: '0-2m', output: 'PNP', voltage: '10-30V DC', ip: 'IP67', size: '20x30x12mm' }, priceRange: '€50-120' } },
    { mfg: 'datasensing', cats: ['inductive'], data: { name: 'Datasensing S15 Inductive', slug: 'datasensing-s15', sku: 'DS-S15-IA-5-C01-PP', shortDescription: 'Индуктивен сензор M18 с увеличено разстояние на засичане', specs: { range: '0-12mm', output: 'PNP NO', voltage: '10-30V DC', ip: 'IP67', diameter: 'M18' }, priceRange: '€30-80' } },
    // BD Sensors
    { mfg: 'bd-sensors', cats: ['pressure'], data: { name: 'BD Sensors DMP 331', slug: 'bd-dmp-331', sku: 'BD-DMP331-110-E003-1-5-100-N40-1-000', shortDescription: 'Пиезорезистивен трансмитер за налягане от неръждаема стомана', specs: { range: '0-100 bar', accuracy: '0.25% FS', output: '4-20mA', ip: 'IP65', media: 'газ, течност' }, priceRange: '€200-450' } },
    { mfg: 'bd-sensors', cats: ['pressure'], data: { name: 'BD Sensors LMK 307', slug: 'bd-lmk-307', sku: 'BD-LMK307-307-3-2-1-1-3-040-000', shortDescription: 'Хидростатичен сензор за ниво в резервоари', specs: { range: '0-40m H2O', accuracy: '0.25% FS', output: '4-20mA', ip: 'IP68', cable: 'до 100м' }, priceRange: '€300-600' } },
    { mfg: 'bd-sensors', cats: ['pressure'], data: { name: 'BD Sensors DPS 300', slug: 'bd-dps-300', sku: 'BD-DPS300-811-E003-1-5-B16-1-000', shortDescription: 'Дигитален дисплей за налягане с програмируем изход', specs: { range: '0-16 bar', display: '4-digit LED', output: '4-20mA + relay', ip: 'IP65', power: '12-36V DC' }, priceRange: '€250-500' } },
    // Hikrobot
    { mfg: 'hikrobot', cats: ['vision'], data: { name: 'Hikrobot MV-CS060-10UC', slug: 'hikrobot-mv-cs060', sku: 'HIK-MVCS06010UC', shortDescription: '6MP USB3.0 индустриална камера с Sony IMX178 сензор', specs: { resolution: '3072x2048', fps: '22fps', interface: 'USB 3.0', sensor: 'Sony IMX178', mount: 'C-mount' }, priceRange: '€300-500' } },
    { mfg: 'hikrobot', cats: ['vision'], data: { name: 'Hikrobot MV-ID5060M', slug: 'hikrobot-mv-id5060m', sku: 'HIK-MVID5060M', shortDescription: 'Индустриален баркод четец с вградено осветление', specs: { type: '1D/2D/DPM', distance: '60-300mm', interface: 'GigE/RS232', ip: 'IP67', rate: '120 reads/s' }, priceRange: '€400-700' } },
    { mfg: 'hikrobot', cats: ['vision'], data: { name: 'Hikrobot MV-CA013-21UC', slug: 'hikrobot-mv-ca013', sku: 'HIK-MVCA01321UC', shortDescription: '1.3MP GigE индустриална камера за високоскоростна инспекция', specs: { resolution: '1280x1024', fps: '211fps', interface: 'GigE', sensor: 'CMOS 1/2"', mount: 'C-mount' }, priceRange: '€200-350' } },
    // Mech-Mind
    { mfg: 'mech-mind', cats: ['3d-vision'], data: { name: 'Mech-Eye Pro', slug: 'mech-eye-pro', sku: 'MM-MECHEYEPRO-S', shortDescription: '3D камера с висока точност за роботизирано зрение и bin picking', specs: { range: '0.4-2m', accuracy: '< 0.1mm', pointCloud: '2 million pts', interface: 'GigE', weight: '1.9kg' }, priceRange: '€5000-8000' } },
    { mfg: 'mech-mind', cats: ['3d-vision'], data: { name: 'Mech-Eye Nano', slug: 'mech-eye-nano', sku: 'MM-MECHEYENANO-U', shortDescription: 'Компактна 3D камера за малки работни пространства', specs: { range: '0.15-0.6m', accuracy: '< 0.05mm', pointCloud: '1.2 million pts', interface: 'USB 3.0', weight: '0.5kg' }, priceRange: '€3000-5000' } },
    { mfg: 'mech-mind', cats: ['3d-vision'], data: { name: 'Mech-Vision Software', slug: 'mech-vision', sku: 'MM-MECHVISION-STD', shortDescription: 'Софтуерна платформа за 3D визуално разпознаване без програмиране', specs: { type: 'Software', compatibility: 'Mech-Eye cameras', features: 'No-code, drag & drop', robots: '20+ brands', os: 'Windows 10/11' }, priceRange: 'По запитване' } },
    // SinceVision
    { mfg: 'sincevision', cats: ['vision'], data: { name: 'SinceVision SV-1000 Inspector', slug: 'sincevision-sv1000', sku: 'SV-1000-STD-01', shortDescription: 'Система за визуална инспекция на производствена линия', specs: { resolution: '5MP', speed: '200 parts/min', defects: 'scratch, dent, color', interface: 'GigE + I/O', light: 'integrated LED' }, priceRange: '€3000-6000' } },
    { mfg: 'sincevision', cats: ['vision'], data: { name: 'SinceVision SV-500 Label Inspector', slug: 'sincevision-sv500', sku: 'SV-500-LBL-01', shortDescription: 'OCR/OCV система за проверка на етикети и текст', specs: { type: 'OCR/OCV', speed: '300 parts/min', languages: 'Latin, Cyrillic, Chinese', interface: 'Ethernet + RS232', accuracy: '99.9%' }, priceRange: '€2000-4000' } },
    { mfg: 'sincevision', cats: ['vision'], data: { name: 'SinceVision SV-200 Color Sensor', slug: 'sincevision-sv200', sku: 'SV-200-CLR-01', shortDescription: 'Интелигентен цветови сензор за сортиране и качествен контрол', specs: { colors: '256 registered', distance: '20-100mm', output: 'NPN/PNP + RS232', ip: 'IP65', response: '1ms' }, priceRange: '€500-1000' } },
  ];

  for (const p of products) {
    const productData: Record<string, unknown> = { ...p.data };
    if (mfgIds[p.mfg]) productData.manufacturer = mfgIds[p.mfg];
    const catIdList = p.cats.map(c => catIds[c]).filter(Boolean);
    if (catIdList.length) productData.categories = catIdList;
    await api('/products', productData);
  }

  // --- Case Studies ---
  const caseStudies = [
    { title: 'Автоматизация на сортировъчна линия с SICK', slug: 'sorting-line-sick', industry: 'Логистика', problem: 'Клиентът имаше нужда от автоматично сортиране на пакети по размер и тегло с производителност 3000 пакета/час.', solution: 'Внедрихме SICK TiM781 LiDAR сензори за измерване на габарити в комбинация с фотоелектрични сензори W16 за детекция на позиция.', results: 'Производителността се увеличи с 40%, грешките при сортиране намаляха от 2.1% на 0.3%.' },
    { title: 'Качествен контрол с Hikrobot камери', slug: 'quality-control-hikrobot', industry: 'Производство', problem: 'Ръчната инспекция на метални компоненти отнемаше твърде много време и не осигуряваше достатъчна точност.', solution: 'Изградихме визуална система с Hikrobot MV-CS060 камери и собствен AI алгоритъм за детекция на дефекти.', results: 'Скоростта на инспекция се увеличи 5x, точността достигна 99.7%.' },
    { title: '3D роботизирано зрение с Mech-Mind', slug: '3d-robot-vision-mechmind', industry: 'Автомобилна индустрия', problem: 'Робот за заваряване се нуждаеше от точно позициониране на различни по форма детайли в кутия (bin picking).', solution: 'Инсталирахме Mech-Eye Pro 3D камера с Mech-Vision софтуер за автоматично разпознаване и pick & place.', results: 'Времето за цикъл намаля с 30%, роботът работи 24/7 без ръчна намеса.' },
  ];
  for (const cs of caseStudies) await api('/case-studies', cs);

  // --- Testimonials ---
  const testimonials = [
    { quote: 'VB Sensoric ни помогнаха да изберем правилните сензори и да ги интегрираме бързо. Техническата поддръжка е на най-високо ниво.', authorName: 'Иван Петров', authorTitle: 'Технически директор', company: 'Автоматика БГ ООД' },
    { quote: 'Работим с VB Sensoric от 3 години. Винаги намират решение, дори за нестандартни проекти. Препоръчвам ги горещо.', authorName: 'Мария Георгиева', authorTitle: 'Главен инженер', company: 'ПакЛайн АД' },
    { quote: 'Благодарение на Mech-Mind решението, което VB Sensoric внедриха, спестяваме 200 човекочаса месечно.', authorName: 'Стефан Димитров', authorTitle: 'Ръководител производство', company: 'МеталПро ЕООД' },
  ];
  for (const t of testimonials) await api('/testimonials', t);

  // --- Blog Posts ---
  const blogPosts = [
    { title: 'Как да изберем правилния фотоелектричен сензор', slug: 'choosing-photoelectric-sensor', excerpt: 'Ръководство за избор на фотоелектричен сензор според приложението — обхват, изход, защита.', content: 'Фотоелектричните сензори са един от най-разпространените типове индустриални сензори. Те използват светлинен лъч (видим, инфрачервен или лазерен) за детекция на обекти. Основните типове са: дифузен (retroreflective), рефлекторен (through-beam) и с потискане на фона (background suppression).\n\nПри избора на сензор е важно да се вземат предвид:\n- **Обхват:** От няколко милиметра до над 20 метра\n- **Тип изход:** PNP (sourcing) или NPN (sinking)\n- **Степен на защита:** IP65 за чисти среди, IP67/IP69K за агресивни условия\n- **Скорост на реакция:** От 0.1ms за бързи приложения\n\nСвържете се с VB Sensoric за безплатна консултация при избора на правилния сензор за вашето приложение.', category: 'technical', tags: ['сензори', 'фотоелектрични', 'ръководство'] },
    { title: 'SICK представи новата серия W16 с IO-Link', slug: 'sick-w16-io-link-launch', excerpt: 'SICK обяви нова версия на популярния W16 фотоелектричен сензор с вграден IO-Link интерфейс.', content: 'SICK разширява продуктовата си линия W16 с нова версия, включваща IO-Link комуникация. Новият W16 запазва компактния си корпус и надеждна детекция, но добавя:\n\n- **IO-Link 1.1** за дигитална комуникация и диагностика\n- **Двоен канал** — превключваем между IO-Link и стандартен SIO\n- **Разширена диагностика** — замърсяване на лещата, качество на сигнала, температура\n- **Параметризация** от разстояние чрез IO-Link master\n\nТова прави W16 идеален за Industry 4.0 приложения, където е необходима пълна прозрачност на сензорния слой. VB Sensoric предлага пълната гама W16 с IO-Link — свържете се с нас за техническа консултация.', category: 'news', tags: ['SICK', 'W16', 'IO-Link'] },
    { title: 'Machine Vision тенденции за 2026', slug: 'machine-vision-trends-2026', excerpt: 'Преглед на основните тенденции в индустриалното машинно зрение — AI, 3D, edge computing.', content: 'Индустриалното машинно зрение продължава да се развива стремително. Ключовите тенденции за 2026 включват:\n\n## 1. AI на ръба (Edge AI)\nОбработката на изображения се премества от централни сървъри директно в камерите. Hikrobot и Mech-Mind вече предлагат камери с вградени невронни мрежи.\n\n## 2. 3D визуално зрение\nСтереокамерите и structured light системите стават по-достъпни. Mech-Eye серията дава точност под 0.1mm при цени, които правят 3D зрението достъпно за средни предприятия.\n\n## 3. Хиперспектрално изобразяване\nОтвъд RGB — камерите виждат в невидими спектри за детекция на дефекти, невидими с просто око.\n\n## 4. Коботи + зрение\nИнтеграцията на визуални системи с колаборативни роботи е стандарт. Mech-Mind поддържа 20+ марки роботи с plug-and-play интеграция.\n\nVB Sensoric предлага пълното портфолио от Hikrobot, Mech-Mind и SinceVision за вашите проекти по машинно зрение.', category: 'technical', tags: ['machine vision', 'AI', 'тенденции', '2026'] },
  ];
  for (const bp of blogPosts) await api('/blog-posts', bp);

  console.log('\n✅ Seed complete!');
}

seed().catch(console.error);
