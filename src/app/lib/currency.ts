// Centraliza el formato monetario para garantizar CLP consistente en toda la UI.
const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPriceCLP(value: number): string {
  return clpFormatter.format(value);
}
