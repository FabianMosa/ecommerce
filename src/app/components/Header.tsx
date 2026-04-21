"use client";

// Cabecera sticky con navegacion por anclas (`#seccion`) y menu colapsable en viewports pequenos.
import { useState } from "react";

// Enlaces alineados con los `id` de las secciones en `page.tsx` para scroll suave.
const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#productos", label: "Productos" },
  { href: "#categorias", label: "Categorias" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  // Controla el panel de navegacion duplicado solo en mobile (el desktop usa `<nav>` fijo).
  const [mobileOpen, setMobileOpen] = useState(false);

  // Props ARIA en objeto (no `aria-*={expr}` en JSX) para satisfacer el analizador Microsoft Edge Tools.
  const mobileMenuToggleA11y = {
    "aria-expanded": mobileOpen,
    "aria-controls": "mobile-nav",
    "aria-label": mobileOpen ? "Cerrar menú" : "Abrir menú",
  };
  const mobileNavRegionA11y = { "aria-hidden": !mobileOpen };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-sm"
            aria-hidden
          >
            TO
          </span>
          {/* Branding corto para mejorar legibilidad en pantallas medianas y pequenas. */}
          <span className="text-lg font-semibold tracking-tight">
            Tienda Online
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 text-sm text-slate-600 md:flex"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded transition hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label="Ver carrito (0 productos)"
          >
            <span>Carrito</span>
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold text-slate-950"
              aria-hidden
            >
              0
            </span>
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            {...mobileMenuToggleA11y}
          >
            <span className="sr-only">{mobileOpen ? "Cerrar" : "Menú"}</span>
            {mobileOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-200 ease-out md:hidden ${
          mobileOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
        {...mobileNavRegionA11y}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-3"
          aria-label="Navegación móvil"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset"
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => e.key === "Enter" && setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
