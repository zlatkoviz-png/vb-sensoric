import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Свържете се с VB Sensoric за запитване или оферта",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Контакти</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact form */}
        <div className="scada-panel p-8">
          <h2 className="text-xl font-semibold mb-6">Изпрати запитване</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-scada-muted mb-1">Име</label>
                <input type="text" className="w-full px-4 py-3 bg-scada-bg border border-scada-border rounded-lg text-sm focus:outline-none focus:border-accent-blue/60" />
              </div>
              <div>
                <label className="block text-sm text-scada-muted mb-1">Фирма</label>
                <input type="text" className="w-full px-4 py-3 bg-scada-bg border border-scada-border rounded-lg text-sm focus:outline-none focus:border-accent-blue/60" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-scada-muted mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-scada-bg border border-scada-border rounded-lg text-sm focus:outline-none focus:border-accent-blue/60" />
              </div>
              <div>
                <label className="block text-sm text-scada-muted mb-1">Телефон</label>
                <input type="tel" className="w-full px-4 py-3 bg-scada-bg border border-scada-border rounded-lg text-sm focus:outline-none focus:border-accent-blue/60" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-scada-muted mb-1">Описание на запитването</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-scada-bg border border-scada-border rounded-lg text-sm focus:outline-none focus:border-accent-blue/60 resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full">
              Изпрати запитване
            </button>
          </form>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <div className="scada-panel p-6">
            <h3 className="font-semibold mb-4 text-accent-blue">VB Sensoric</h3>
            <ul className="space-y-3 text-sm text-scada-muted">
              <li className="flex gap-3">
                <span className="text-accent-blue">&#9679;</span>
                <span>София, България</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-blue">&#9679;</span>
                <span>info@vbsensoric.bg</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-blue">&#9679;</span>
                <span>+359 2 XXX XXXX</span>
              </li>
            </ul>
          </div>

          <div className="scada-panel p-6">
            <h3 className="font-semibold mb-4 text-accent-blue">Работно време</h3>
            <ul className="space-y-2 text-sm text-scada-muted">
              <li>Понеделник - Петък: 09:00 - 18:00</li>
              <li>Събота - Неделя: Почивни дни</li>
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="scada-panel aspect-video flex items-center justify-center">
            <span className="text-scada-muted text-sm">Google Maps</span>
          </div>
        </div>
      </div>
    </div>
  );
}
