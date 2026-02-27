"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

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
    <div ref={ref} className="font-mono text-3xl md:text-4xl font-bold text-accent-blue">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [particlesReady, setParticlesReady] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    setParticlesReady(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Particle mesh */}
      {!reducedMotion && (
        <div className="absolute inset-0 z-0">
          <Particles
            id="hero-particles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              background: { color: { value: "transparent" } },
              fpsLimit: 30,
              particles: {
                color: { value: "#00B4D8" },
                links: {
                  color: "#00B4D8",
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 0.5,
                  direction: "none",
                  outModes: { default: "bounce" },
                },
                number: {
                  value: 50,
                  density: { enable: true },
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "grab" },
                },
                modes: {
                  grab: { distance: 200, links: { opacity: 0.4 } },
                },
              },
              detectRetina: true,
            }}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Status indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-green/30 bg-accent-green/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-xs font-mono text-accent-green">SYSTEM ONLINE</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Индустриални сензори и{" "}
            <span className="text-accent-blue">визуални системи</span>{" "}
            за автоматизация
          </h1>

          <p className="text-lg md:text-xl text-scada-muted mb-8 max-w-2xl">
            Дистрибутор на SICK, Datasensing, BD Sensors, Hikrobot, Mech-Mind и
            SinceVision. Експертни решения за вашето производство.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/products" className="btn-primary text-center">
              Разгледай продуктите
            </Link>
            <Link href="/contact" className="btn-secondary text-center">
              Поискай оферта
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="scada-panel p-6 text-center scada-glow"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-scada-muted mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
