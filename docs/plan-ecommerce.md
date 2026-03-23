# Plan de diseño y desarrollo de la página principal ecommerce

## Objetivo
Diseñar y construir una página principal de ecommerce simple y moderna usando Next.js (App Router) y TailwindCSS v4 en el proyecto existente, sirviendo como base para futuras páginas (detalle de producto, carrito, etc.).

## Estado actual
- Proyecto Next.js 16 creado con `create-next-app` usando App Router.
- Solo existe la ruta raíz `src/app/page.tsx` con el contenido de ejemplo por defecto de Next.
- Estilos globales mínimos definidos en `src/app/globals.css` con integración básica de TailwindCSS v4.
- No hay todavía una estructura específica de ecommerce (sin header de tienda, listado de productos, CTA ni footer).

## Alcance del trabajo
- Rediseñar completamente `src/app/page.tsx` para que sea una landing de ecommerce simple, centrada en un catálogo reducido y una marca ficticia.
- Mantener la estructura base de `layout.tsx` pero ajustar metadatos para que reflejen el ecommerce.
- Definir un pequeño conjunto de “subcomponentes” internos dentro de `page.tsx` (o más adelante moverlos a archivos separados) para facilitar futuros cambios.
- Usar únicamente clases utilitarias de Tailwind y estilos globales mínimos.

## Lineamientos de diseño
- Estilo limpio y moderno, con buena jerarquía visual.
- Layout responsivo (mobile-first) con puntos de quiebre básicos (`sm`, `md`, `lg`).
- Paleta de color sencilla: neutros (grises / blanco) + un color principal para CTA.
- Tipografía: usar Geist, ya configurada en el proyecto.
- Accesibilidad básica: buen contraste, tags semánticos (`header`, `main`, `section`, `footer`, `button`, etc.) y textos claros en botones.

## Estructura propuesta de la página principal

### 1. Header fijo simple
- Logo/texto de marca (por ejemplo: "Fabian Store" o nombre que elijas).
- Navegación mínima: "Inicio", "Productos", "Contacto" (aunque de momento apunten a `#` o secciones internas).
- Icono o texto de "Carrito" con un contador estático (ej. `0`).

### 2. Hero principal
- Título llamativo presentando la tienda (ej.: "Encuentra tu próximo gadget favorito").
- Subtítulo breve explicando la propuesta de valor.
- Botón CTA principal ("Ver productos") que hace scroll a la sección de productos destacados.
- Imagen ilustrativa usando `next/image` y una imagen en `public/` (por ahora se puede usar una imagen genérica).

### 3. Sección de categorías destacadas
- 3–4 tarjetas de categoría (ej.: "Laptops", "Auriculares", "Accesorios", "Ofertas").
- Cada tarjeta con icono/simple imagen, título y breve descripción.
- Grid responsivo: 1 columna en móvil, 2 en tablets, 4 en escritorio.

### 4. Sección de productos destacados
- Definir un arreglo estático de productos con: `id`, `name`, `price`, `image`, `tagline`.
- Mostrar una cuadrícula de tarjetas de producto:
  - Imagen.
  - Nombre.
  - Precio.
  - Tagline corto.
  - Botón "Agregar al carrito" (sin lógica real todavía, solo visual).

### 5. Sección de beneficios / confianza
- 3–4 ítems como:
  - "Envíos rápidos".
  - "Pagos seguros".
  - "Soporte 24/7".
- Dispuestos en fila o grid, con iconos simples (o solo texto si no hay iconos).

### 6. Footer
- Texto de copyright.
- Enlaces de ejemplo a redes sociales y políticas (privacidad, términos).

## Cambios técnicos concretos

### `src/app/layout.tsx`
- Cambiar `metadata.title` (ej.: "Fabian Store | Ecommerce simple").
- Cambiar `metadata.description` (breve descripción de la tienda).
- Mantener la configuración de fuentes y el `body` como está.

### `src/app/page.tsx`
- Eliminar el contenido de ejemplo de Next.
- Implementar la estructura completa de la landing con secciones:
  - `Header`.
  - `HeroSection`.
  - `CategoriesSection`.
  - `FeaturedProductsSection`.
  - `BenefitsSection`.
  - `Footer`.
- Definir los datos de productos y categorías como arrays estáticos al inicio del archivo.
- Aplicar clases de Tailwind para:
  - Contenedores (`max-w-7xl`, `mx-auto`, `px-4`, `py-8`, etc.).
  - Tipografía (`text-3xl`, `font-bold`, `text-gray-900`, etc.).
  - Colores de fondo y bordes.
  - Grid responsivo (`grid`, `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-4`, etc.).

### `src/app/globals.css`
- Mantener las variables de color y fuentes ya definidas.
- Añadir solo ajustes globales mínimos si hace falta (por ejemplo, un `body` con `min-height: 100vh` o algún reset suave), evitando sobreescribir lo que controle Tailwind.

## Iteraciones futuras (fuera del alcance inmediato)
- Crear rutas independientes: `/products`, `/cart`, `/product/[id]`.
- Implementar estado real de carrito (Context API, Zustand, etc.).
- Conectar los productos a datos reales (archivo local, API mock o base de datos).
- Añadir modo oscuro/claro controlado por el usuario.

## Orden de implementación
1. Actualizar metadatos en `layout.tsx`.
2. Rediseñar `page.tsx` con la estructura completa y datos estáticos.
3. Ajustar detalles visuales y responsive probando en el navegador.
4. Si el archivo crece demasiado, extraer secciones a componentes en `src/app/components/` (o similar), sin cambiar el diseño.
