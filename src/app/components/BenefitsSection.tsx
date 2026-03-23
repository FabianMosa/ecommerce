const benefits = [
  {
    title: "Envío rápido",
    description: "Recibe tus productos en pocos días con envíos confiables.",
  },
  {
    title: "Pagos seguros",
    description: "Trabajamos con plataformas de pago reconocidas y protegidas.",
  },
  {
    title: "Soporte cercano",
    description:
      "Te ayudamos a elegir el producto ideal según tus necesidades.",
  },
];

export function BenefitsSection() {
  return (
    <section className="mt-16 space-y-6" aria-labelledby="benefits-heading">
      <h2
        id="benefits-heading"
        className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl"
      >
        ¿Por qué comprar aquí?
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700"
          >
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">
              {benefit.title}
            </h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
