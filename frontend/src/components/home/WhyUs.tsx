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
