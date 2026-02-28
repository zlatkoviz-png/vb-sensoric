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
