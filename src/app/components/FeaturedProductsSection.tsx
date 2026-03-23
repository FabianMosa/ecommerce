import type { Product } from "../types";

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
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            Productos destacados
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Algunos ejemplos de productos que podrías mostrar aquí.
          </p>
        </div>
        <button
          type="button"
          className="hidden text-sm font-medium text-emerald-700 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded sm:inline-flex"
        >
          Ver todo
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className="h-40 w-full bg-zinc-100"
              role="img"
              aria-label={`Imagen de ${product.name}`}
            />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-sm font-semibold text-zinc-900">
                {product.name}
              </h3>
              <p className="text-xs text-zinc-600">{product.tagline}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                ${product.price.toFixed(2)}
              </p>
              <button
                type="button"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
