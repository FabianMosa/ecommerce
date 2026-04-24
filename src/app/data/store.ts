import type { Category, Product } from "../types";

/**
 * Datos semilla en memoria para la home sin backend.
 * Sustituible por fetch a API/Prisma cuando se conecte la tienda real.
 */
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
    category: "Audio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        alt: "Auriculares inalambricos negros sobre superficie clara",
      },
      {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
        alt: "Vista lateral de auriculares inalambricos con estuche",
      },
      {
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
        alt: "Auriculares sobre mesa de trabajo minimalista",
      },
    ],
  },
  {
    id: 2,
    name: "Lampara LED Inteligente",
    price: 24500,
    tagline: "Luz regulable para crear un entorno comodo y productivo.",
    category: "Iluminacion inteligente",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        alt: "Lampara LED con luz calida sobre escritorio",
      },
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        alt: "Lampara moderna junto a laptop en home office",
      },
    ],
  },
  {
    id: 3,
    name: "Mochila Urbana",
    price: 39900,
    tagline: "Diseno resistente para proteger laptop y accesorios.",
    category: "Accesorios diarios",
    images: [
      {
        url: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=800&q=80",
        alt: "Mochila urbana gris sobre banco de madera",
      },
      {
        url: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&q=80",
        alt: "Compartimiento interior de mochila con laptop",
      },
    ],
  },
  {
    id: 4,
    name: "Botella Termica",
    price: 18750,
    tagline: "Mantiene tu bebida a temperatura ideal durante horas.",
    category: "Accesorios diarios",
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
        alt: "Botella termica de acero inoxidable sobre fondo claro",
      },
      {
        url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
        alt: "Botellas reutilizables para hidratacion diaria",
      },
    ],
  },
];
