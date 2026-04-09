import type { Category, Product } from "../types";

// Datos semilla para mantener la home funcional en desarrollo.
export const categories: Category[] = [
  {
    id: 1,
    name: "Audio",
    description: "Auriculares y parlantes para trabajar o disfrutar contenido.",
  },
  {
    id: 2,
    name: "Perifericos",
    description: "Mouse, teclados y accesorios para mejorar tu productividad.",
  },
  {
    id: 3,
    name: "Iluminacion inteligente",
    description: "Luz adaptable para estudio, gaming o home office.",
  },
  {
    id: 4,
    name: "Accesorios diarios",
    description: "Productos practicos para organizar y cuidar tu setup.",
  },
];

// Productos destacados mostrados en la landing.
// Los precios se almacenan en CLP para alinear toda la experiencia monetaria en Chile.
export const products: Product[] = [
  {
    id: 1,
    name: "Auriculares Inalambricos",
    price: 49990,
    tagline: "Sonido envolvente y autonomia para jornadas largas.",
  },
  {
    id: 2,
    name: "Lampara LED Inteligente",
    price: 24500,
    tagline: "Luz regulable para crear un entorno comodo y productivo.",
  },
  {
    id: 3,
    name: "Mochila Urbana",
    price: 39900,
    tagline: "Diseno resistente para proteger laptop y accesorios.",
  },
  {
    id: 4,
    name: "Botella Termica",
    price: 18750,
    tagline: "Mantiene tu bebida a temperatura ideal durante horas.",
  },
];
