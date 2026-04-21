// Bloque superior de la landing: mensaje principal, CTAs y refuerzo visual sin imagen externa (gradiente).
export function HeroSection() {
  return (
    <section
      className="grid gap-10 lg:grid-cols-2 lg:items-center"
      aria-labelledby="hero-heading"
    >
      <div className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
          Tecnologia para potenciar tu dia
        </p>
        {/* Mensaje principal orientado a conversion para destacar la propuesta de valor desde el primer scroll. */}
        <h1
          id="hero-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          Accesorios y perifericos listos para mejorar tu setup.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Descubre una seleccion de productos de alta calidad con rendimiento,
          comodidad y estilo para tu escritorio, home office o estudio.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#productos"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Comprar destacados
          </a>
          <a
            href="#categorias"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-medium text-blue-800 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Explorar categorias
          </a>
          <a
            href="#beneficios"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          >
            Por que elegirnos
          </a>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span>✓ Catalogo curado</span>
          <span>✓ Pagos seguros</span>
          <span>✓ Atencion personalizada</span>
        </div>
      </div>

      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-violet-700 shadow-lg sm:h-80">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-blue-100">
            Recomendado esta semana
          </p>
          <p className="max-w-xs text-sm text-blue-50/95">
            Una seleccion pensada para quienes buscan comprar mejor, sin perder
            tiempo comparando entre miles de opciones.
          </p>
        </div>
      </div>
    </section>
  );
}
