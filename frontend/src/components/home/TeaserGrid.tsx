import Image from "next/image";

const teasers = [
  {
    title: "Индустриални решения",
    description:
      "Автоматизация за хранителна, фармацевтична и автомобилна индустрия.",
    image: "/images/teasers/industrial-solutions.svg",
  },
  {
    title: "Техническа експертиза",
    description:
      "Нашият екип помага с избора и интеграцията на всеки продукт.",
    image: "/images/teasers/technical-expertise.svg",
  },
  {
    title: "Партньорство",
    description:
      "Дългосрочни отношения с клиенти в цяла България.",
    image: "/images/teasers/partnership.svg",
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
              <div className="aspect-video rounded-xl overflow-hidden">
                <Image
                  src={teaser.image}
                  alt={teaser.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
