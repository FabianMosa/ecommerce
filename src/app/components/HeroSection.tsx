import Image from "next/image";

export function HeroSection() {
  return (
    <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
          Nuevo
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
          Encuentra tu próximo gadget favorito.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          Una selección cuidada de tecnología para tu día a día: audio,
          periféricos y accesorios para que disfrutes más de cada momento.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#productos"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Ver productos
          </a>
          <a
            href="#categorias"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Ver categorías
          </a>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
          <span>✓ Envío rápido</span>
          <span>✓ Pagos seguros</span>
          <span>✓ Soporte cercano</span>
        </div>
      </div>

      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-700 sm:h-80">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-300">
            Colección destacada
          </p>
          <Image
            src="/next.svg"
            alt="Colección de productos destacados"
            width={160}
            height={40}
            className="invert"
            priority
          />
          <p className="max-w-xs text-sm text-zinc-200">
            Imagina aquí tus productos principales. Esta imagen es solo un
            marcador de posición que podrás reemplazar más adelante.
          </p>
        </div>
      </div>
    </section>
  );
}
