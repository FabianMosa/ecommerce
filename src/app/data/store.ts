import type { Category, Product } from "../types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Laptops",
    description: "Rendimiento para trabajo, estudio y gaming.",
  },
  {
    id: 2,
    name: "Auriculares",
    description: "Sonido inmersivo para tu día a día.",
  },
  {
    id: 3,
    name: "Accesorios",
    description: "Todo lo que complementa tu setup.",
  },
  {
    id: 4,
    name: "Ofertas",
    description: "Productos seleccionados a mejor precio.",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Auriculares inalámbricos Pro",
    price: 59.99,
    tagline: "Cancelación de ruido y hasta 24h de batería.",
  },
  {
    id: 2,
    name: "Teclado mecánico compacto",
    price: 89.99,
    tagline: "Switches silenciosos y retroiluminación RGB.",
  },
  {
    id: 3,
    name: 'Monitor 27" 2K',
    price: 249.99,
    tagline: "144Hz para una experiencia fluida.",
  },
  {
    id: 4,
    name: "Mouse ergonómico inalámbrico",
    price: 39.99,
    tagline: "Precisión y comodidad para largas jornadas.",
  },
];
