"use client";

import Link from "next/link";
import { Footer, Header } from "../components";
import { products } from "../data/store";
import { formatPriceCLP } from "../lib/currency";
import { useMemo, useState } from "react";

export default function ProductosPage() {
  // Estado del filtro de categoria para soportar busqueda textual y seleccion guiada.
  const [categoryQuery, setCategoryQuery] = useState("");

  const categories = useMemo(() => {
    const values = products
      .map((product) => product.category?.trim())
      .filter((value): value is string => Boolean(value));
    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = categoryQuery.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      (product.category ?? "").toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [categoryQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
            Catalogo
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Productos por categoria
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Busca por categoria para encontrar mas rapido lo que necesitas.
            Puedes escribir manualmente o tocar una categoria sugerida.
          </p>
        </section>

        <section className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <label
            htmlFor="category-search"
            className="text-sm font-medium text-slate-700"
          >
            Buscar por categoria
          </label>
          <input
            id="category-search"
            type="search"
            value={categoryQuery}
            onChange={(event) => setCategoryQuery(event.target.value)}
            placeholder="Ejemplo: Audio, Accesorios diarios..."
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategoryQuery("")}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryQuery(category)}
                className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Resultados:{" "}
              <span className="font-semibold text-slate-900">
                {filteredProducts.length}
              </span>
            </p>
            <Link
              href="/checkout"
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:text-sm"
            >
              Ir a checkout
            </Link>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
              No encontramos productos para esa categoria. Prueba otro filtro.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="space-y-3">
                    <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {product.category ?? "Sin categoria"}
                    </p>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-600">{product.tagline}</p>
                  </div>
                  <p className="mt-5 text-xl font-bold text-slate-900">
                    {formatPriceCLP(product.price)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
