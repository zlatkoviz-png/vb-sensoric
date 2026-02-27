const reasons = [
  {
    title: "Експертни познания",
    description: "Дългогодишен опит в индустриалната автоматизация и сензорните технологии.",
  },
  {
    title: "Техническа поддръжка",
    description: "Помагаме при избора, конфигурирането и интеграцията на продуктите.",
  },
  {
    title: "Бърза доставка",
    description: "Наличност на склад и бърза логистика за критични проекти.",
  },
  {
    title: "Водещи марки",
    description: "Официален дистрибутор на 6 световни лидера в сензорните технологии.",
  },
];

export function WhyUs() {
  return (
    <section className="py-20 bg-scada-surface/30 border-y border-scada-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Защо <span className="text-accent-blue">VB Sensoric</span>
          </h2>
          <p className="text-scada-muted">
            Експертен партньор, не просто търговец
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="flex gap-4 scada-panel p-6"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center font-mono text-accent-blue font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{reason.title}</h3>
                <p className="text-sm text-scada-muted">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
