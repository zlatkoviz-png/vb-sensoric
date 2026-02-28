import { Factory, Headset, Users } from "lucide-react";

const teasers = [
  {
    title: "Индустриални решения",
    description:
      "Автоматизация за хранителна, фармацевтична и автомобилна индустрия.",
    icon: Factory,
    gradient: "from-slate-700 to-primary-800",
  },
  {
    title: "Техническа експертиза",
    description:
      "Нашият екип помага с избора и интеграцията на всеки продукт.",
    icon: Headset,
    gradient: "from-primary-700 to-emerald-800",
  },
  {
    title: "Партньорство",
    description:
      "Дългосрочни отношения с клиенти в цяла България.",
    icon: Users,
    gradient: "from-slate-800 to-indigo-900",
  },
];

export function TeaserGrid() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Повече от дистрибутор
          </h2>
          <p className="text-slate-500">
            Индустриална експертиза, персонален подход
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teasers.map((teaser) => (
            <div key={teaser.title} className="group">
              <div
                className={`aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${teaser.gradient} flex items-center justify-center relative`}
              >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.3" />
                    <line x1="20" y1="100" x2="100" y2="20" stroke="white" strokeWidth="0.2" />
                    <line x1="0" y1="80" x2="80" y2="0" stroke="white" strokeWidth="0.2" />
                  </svg>
                </div>
                <teaser.icon className="w-16 h-16 text-white/30 group-hover:text-white/50 transition-colors duration-500" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mt-4 mb-1">
                {teaser.title}
              </h3>
              <p className="text-sm text-slate-500">{teaser.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
