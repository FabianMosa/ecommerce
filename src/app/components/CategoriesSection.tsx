// Cuadricula de categorias: enlaza hacia `#productos` como atajo de conversion (catalogo aun unificado).
import type { Category } from "../types";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section id="categorias" className="mt-16 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Compra por categoria
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Encuentra rapido lo que necesitas segun tu tipo de producto.
          </p>
        </div>
      </div>

      {/* Cada categoria empuja al usuario hacia el bloque de productos para conversion. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                {category.name}
              </h3>
              <p className="text-xs text-slate-600">{category.description}</p>
            </div>
            <a
              href="#productos"
              aria-label={`Ver productos de ${category.name}`}
              className="mt-4 inline-flex w-max items-center rounded text-xs font-medium text-blue-700 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Ver productos
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
