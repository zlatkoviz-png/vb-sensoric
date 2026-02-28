import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас",
  description: "VB Sensoric - дистрибутор на индустриални сензори и визуални системи",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">За нас</h1>
      <div className="max-w-3xl">
        <div className="card p-8 space-y-6 text-slate-600 leading-relaxed">
          <p>
            VB Sensoric е специализиран дистрибутор на индустриални сензори и визуални
            системи за автоматизация на българския пазар.
          </p>
          <p>
            Представляваме водещи световни производители: SICK, Datasensing, BD Sensors,
            Hikrobot, Mech-Mind и SinceVision.
          </p>
          <p>Съдържанието ще бъде управлявано от Strapi CMS.</p>
        </div>
      </div>
    </div>
  );
}
