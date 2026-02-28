"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Продукта в каталога", value: 5000, suffix: "+" },
  { label: "Години опит", value: 15, suffix: "+" },
  { label: "Реализирани проекта", value: 300, suffix: "+" },
  { label: "Производители", value: 6, suffix: "" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-mono text-3xl md:text-4xl font-bold text-primary-400">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

function GeometricPattern() {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-1/2 opacity-[0.07]"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" />
      <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" />
      <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" />
      <line x1="73" y1="73" x2="327" y2="327" stroke="currentColor" strokeWidth="0.5" />
      <line x1="327" y1="73" x2="73" y2="327" stroke="currentColor" strokeWidth="0.5" />
      <rect x="120" y="120" width="160" height="160" stroke="currentColor" strokeWidth="0.5" rx="4" />
      <rect x="160" y="160" width="80" height="80" stroke="currentColor" strokeWidth="0.5" rx="2" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <GeometricPattern />

      {/* Subtle teal glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Индустриални сензори и{" "}
            <span className="text-primary-400">визуални системи</span>{" "}
            за автоматизация
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
            Дистрибутор на SICK, Datasensing, BD Sensors, Hikrobot, Mech-Mind и
            SinceVision. Експертни решения за вашето производство.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/products" className="btn-primary text-center">
              Разгледай продуктите
            </Link>
            <Link href="/contact" className="btn-white text-center">
              Поискай оферта
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-slate-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
