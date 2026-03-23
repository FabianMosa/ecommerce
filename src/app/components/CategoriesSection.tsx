import type { Category } from "../types";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section id="categorias" className="mt-16 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            Categorías destacadas
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Explora las principales categorías de la tienda.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.id}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-900">
                {category.name}
              </h3>
              <p className="text-xs text-zinc-600">{category.description}</p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex w-max items-center text-xs font-medium text-emerald-700 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded"
            >
              Ver más
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
