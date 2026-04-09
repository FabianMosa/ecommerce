import type { Product } from "../types";
import { formatPriceCLP } from "../lib/currency";

interface FeaturedProductsSectionProps {
  products: Product[];
}

export function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  return (
    <section id="productos" className="mt-16 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Productos recomendados para ti
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Selecciona tu favorito y agregalo al carrito en un solo paso.
          </p>
        </div>
        <a
          href="#categorias"
          className="hidden rounded text-sm font-medium text-blue-700 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:inline-flex"
        >
          Ver por categoria
        </a>
      </div>

      {/* Tarjetas optimizadas para facilitar escaneo rapido en mobile y desktop. */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div
              className="h-40 w-full bg-slate-100"
              role="img"
              aria-label={`Imagen de ${product.name}`}
            />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                {product.name}
              </h3>
              <p className="text-xs text-slate-600">{product.tagline}</p>
              <p className="mt-1 text-sm font-semibold text-blue-900">
                {formatPriceCLP(product.price)}
              </p>
              <button
                type="button"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Agregar y comprar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
