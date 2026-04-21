/** Categoria de vitrina usada en la home (datos locales o futura API). */
export interface Category {
  id: number;
  name: string;
  description: string;
}

/**
 * Producto mostrado en destacados.
 * `image` es legado de una sola foto; `images` habilita galeria en ProductImageGallery.
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  tagline: string;
  image?: string;
  images?: ProductImage[];
}

/** Foto de producto: URL remota o local; `alt` mejora accesibilidad si viene definido. */
export interface ProductImage {
  url: string;
  alt?: string;
}

/** Item del carrito para checkout local en frontend. */
export interface CartItem {
  product: Product;
  quantity: number;
}
