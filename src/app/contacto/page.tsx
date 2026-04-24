import { Footer, Header } from "../components";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
            Soporte
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contacto
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Si tienes dudas sobre tu compra o despacho, escribenos y te
            responderemos lo antes posible.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Canales directos
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-medium text-slate-900">Email:</span>{" "}
                soporte@tiendaonline.cl
              </li>
              <li>
                <span className="font-medium text-slate-900">WhatsApp:</span>{" "}
                +56 9 99999999
              </li>
              <li>
                <span className="font-medium text-slate-900">Horario:</span> Lun
                a Vie, 09:00 - 18:00
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Formulario de contacto
            </h2>
            <form className="mt-4 space-y-3">
              {/* Formulario base listo para conectar luego a una API real. */}
              <label className="block text-sm font-medium text-slate-700">
                Nombre
                <input
                  type="text"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Correo
                <input
                  type="email"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="tu-correo@ejemplo.com"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Mensaje
                <textarea
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Cuéntanos cómo te podemos ayudar"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Enviar consulta
              </button>
            </form>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
