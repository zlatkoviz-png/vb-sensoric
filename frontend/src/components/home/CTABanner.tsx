import Link from "next/link";

export function CTABanner() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Имате проект? Нека го обсъдим.
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Свържете се с нашия екип за безплатна консултация и персонална оферта
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary text-center">
            Поискай оферта
          </Link>
          <a href="tel:+35921234567" className="btn-white text-center">
            +359 2 XXX XXXX
          </a>
        </div>
      </div>
    </section>
  );
}
