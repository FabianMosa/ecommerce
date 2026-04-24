"use client";

import Link from "next/link";
import { Footer, Header } from "../components";
import { products } from "../data/store";
import { formatPriceCLP } from "../lib/currency";
import { useMemo, useState } from "react";

export default function ProductosPage() {
  // Categoria elegida desde el desplegable. Vacio significa "todas".
  const [selectedCategory, setSelectedCategory] = useState("");
  // Texto libre para buscar productos por palabra clave.
  const [keywordQuery, setKeywordQuery] = useState("");

  const categories = useMemo(() => {
    const values = products
      .map((product) => product.category?.trim())
      .filter((value): value is string => Boolean(value));
    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedCategory = selectedCategory.trim().toLocaleLowerCase();
    const normalizedKeyword = keywordQuery.trim().toLocaleLowerCase();

    return products.filter((product) => {
      const productCategory = (product.category ?? "").toLocaleLowerCase();
      const matchesCategory = !normalizedCategory
        ? true
        : productCategory === normalizedCategory;

      // La busqueda por palabra revisa nombre, descripcion corta y categoria.
      const searchableText =
        `${product.name} ${product.tagline} ${product.category ?? ""}`.toLocaleLowerCase();
      const matchesKeyword = !normalizedKeyword
        ? true
        : searchableText.includes(normalizedKeyword);

      return matchesCategory && matchesKeyword;
    });
  }, [selectedCategory, keywordQuery]);

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
            Filtra por categoria con la lista desplegable y usa una palabra
            clave para refinar aun mas los resultados.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category-filter"
                className="text-sm font-medium text-slate-700"
              >
                Categoria
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Todas las categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="keyword-search"
                className="text-sm font-medium text-slate-700"
              >
                Buscar por palabra
              </label>
              <input
                id="keyword-search"
                type="search"
                value={keywordQuery}
                onChange={(event) => setKeywordQuery(event.target.value)}
                placeholder="Ejemplo: audifonos, reloj, bateria..."
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
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
              No encontramos productos con esos filtros. Prueba otra categoria o
              palabra clave.
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
