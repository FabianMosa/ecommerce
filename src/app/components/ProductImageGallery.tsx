"use client";

// Galeria cliente: miniaturas, imagen activa y manejo de errores de carga (URLs remotas pueden fallar).
import { useMemo, useState } from "react";
import Image from "next/image";

import type { Product, ProductImage } from "../types";

interface ProductImageGalleryProps {
  product: Product;
}

// SVG embebido como data-URL para no depender de red cuando falta imagen o falla la descarga.
const FALLBACK_IMAGE_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='100%25' height='100%25' fill='%23e2e8f0'/><text x='50%25' y='50%25' fill='%23334155' text-anchor='middle' font-size='32' font-family='Arial, sans-serif' dy='.3em'>Sin imagen referencial</text></svg>";

/** Prioriza el texto alt del contenido; si no existe, genera una etiqueta estable para lectores de pantalla. */
function buildAccessibleAlt(productName: string, imageAlt?: string, index?: number) {
  if (imageAlt && imageAlt.trim().length > 0) {
    return imageAlt;
  }

  if (typeof index === "number") {
    return `Foto referencial ${index + 1} de ${productName}`;
  }

  return `Foto referencial de ${productName}`;
}

/** Unifica `images[]`, imagen legada `image` o fallback para que la UI siempre tenga al menos una URL. */
function normalizeProductImages(product: Product): ProductImage[] {
  const collection = product.images?.filter((image) => Boolean(image?.url)) ?? [];
  if (collection.length > 0) {
    return collection;
  }

  if (product.image) {
    return [{ url: product.image, alt: `Foto principal de ${product.name}` }];
  }

  return [{ url: FALLBACK_IMAGE_URL, alt: `Foto referencial no disponible para ${product.name}` }];
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const images = useMemo(() => normalizeProductImages(product), [product]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Por indice de miniatura: si la URL falla, se sustituye por el fallback sin reintentar en bucle.
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // Protege el indice si el arreglo de imagenes cambia en caliente (p. ej. datos async futuros).
  const safeActiveIndex = activeIndex < images.length ? activeIndex : 0;
  const currentImage = images[safeActiveIndex];
  const currentSrc = failedImages[safeActiveIndex] ? FALLBACK_IMAGE_URL : currentImage.url;
  const hasThumbnails = images.length > 1;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={currentSrc}
          alt={buildAccessibleAlt(product.name, currentImage.alt, safeActiveIndex)}
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          loading="lazy"
          onError={() => {
            // Evita loops infinitos cuando una URL remota falla repetidamente.
            setFailedImages((prev) => ({ ...prev, [safeActiveIndex]: true }));
          }}
        />
      </div>

      {hasThumbnails ? (
        <div
          className="grid grid-cols-3 gap-2 sm:grid-cols-4"
          role="group"
          aria-label={`Seleccion de fotos de ${product.name}`}
        >
          {images.map((image, index) => {
            const isActive = index === safeActiveIndex;
            const thumbnailSrc = failedImages[index] ? FALLBACK_IMAGE_URL : image.url;
            const thumbnailAlt = buildAccessibleAlt(product.name, image.alt, index);

            return (
              <button
                key={`${product.id}-${index}`}
                type="button"
                className={`overflow-hidden rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-blue-600 ring-1 ring-blue-600"
                    : "border-slate-200 hover:border-blue-300"
                }`}
                aria-label={`Mostrar ${thumbnailAlt}`}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={thumbnailSrc}
                  alt={thumbnailAlt}
                  className="aspect-square h-full w-full object-cover"
                  width={96}
                  height={96}
                  loading="lazy"
                  onError={() => {
                    setFailedImages((prev) => ({ ...prev, [index]: true }));
                  }}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
