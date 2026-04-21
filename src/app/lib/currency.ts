// Utilidad de presentacion: los precios en datos semilla estan en CLP enteros; no convierte divisas.
// Centraliza el formato monetario para garantizar CLP consistente en toda la UI.
const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formatea un monto entero en pesos chilenos para mostrarlo en tarjetas y listados. */
export function formatPriceCLP(value: number): string {
  return clpFormatter.format(value);
}
