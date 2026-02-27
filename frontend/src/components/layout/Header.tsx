"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/products", label: "Продукти" },
  { href: "/solutions", label: "Решения" },
  { href: "/about", label: "За нас" },
  { href: "/news", label: "Новини" },
  { href: "/contact", label: "Контакти" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-scada-bg/80 backdrop-blur-xl border-b border-scada-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-accent-blue flex items-center justify-center">
              <span className="font-mono font-bold text-white text-sm">VB</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">
              VB Sensoric
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-scada-muted hover:text-accent-blue transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-scada-muted hover:text-accent-blue transition-colors"
              aria-label="Търсене"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary text-sm !px-4 !py-2"
            >
              Поискай оферта
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-scada-muted hover:text-accent-blue"
              aria-label="Меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Търси по каталожен номер, наименование..."
                className="w-full px-4 py-3 bg-scada-surface border border-scada-border rounded-lg text-sm focus:outline-none focus:border-accent-blue/60 focus:shadow-glow font-mono placeholder:font-sans placeholder:text-scada-muted"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-scada-border bg-scada-bg/95 backdrop-blur-xl">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-scada-muted hover:text-accent-blue hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block mt-4 btn-primary text-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Поискай оферта
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
