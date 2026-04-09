const benefits = [
  {
    title: "Seleccion inteligente",
    description:
      "Priorizamos productos utiles y bien valorados para acelerar tu decision de compra.",
  },
  {
    title: "Compra con confianza",
    description:
      "Usamos pasarelas de pago seguras para proteger cada transaccion.",
  },
  {
    title: "Acompañamiento real",
    description:
      "Te orientamos para elegir el producto adecuado segun tu necesidad.",
  },
];

export function BenefitsSection() {
  return (
    <section
      id="beneficios"
      className="mt-16 space-y-6"
      aria-labelledby="benefits-heading"
    >
      <h2
        id="benefits-heading"
        className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
      >
        Por que comprar con nosotros
      </h2>
      {/* Bloque de confianza para reducir friccion antes del listado de productos. */}
      <div className="grid gap-4 sm:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
          >
            <h3 className="mb-2 text-sm font-semibold text-slate-900">
              {benefit.title}
            </h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
