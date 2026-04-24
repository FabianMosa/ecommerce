# AGENTS.md — Guía para agentes y colaboradores

Este documento resume la **estructura del repositorio** y convenciones útiles para navegar el proyecto sin depender de carpetas que puedan estar excluidas del control de versiones.

## Rol del archivo

- Orientar a asistentes de IA y desarrolladores sobre **dónde vive cada capa** (UI, datos, persistencia, configuración).
- Dejar explícito qué rutas **no deben asumirse presentes en git** (ver sección final).

## Vista general

| Capa                        | Ubicación típica                              | Notas                                                              |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| App Next.js (App Router)    | `src/app/`                                    | Páginas, layout, estilos globales, componentes y datos de vitrina. |
| Componentes de página       | `src/app/components/`                         | Secciones reutilizables (Header, Hero, productos, etc.).           |
| Estado compartido frontend  | `src/app/context/`                            | Contexto de carrito con persistencia local (`localStorage`).       |
| Validación checkout backend | `src/app/api/checkout/route.ts`               | Revalida ítems y recalcula montos con catálogo servidor.           |
| Tests de componentes        | `src/app/components/__tests__/`               | Jest + Testing Library.                                            |
| Tipos compartidos           | `src/app/types/`                              | Contratos TypeScript del frontend.                                 |
| Utilidades                  | `src/app/lib/`                                | Por ejemplo formateo de moneda (`currency.ts`).                    |
| Datos en memoria / mock     | `src/app/data/`                               | Catálogo o estado local cuando no hay API aún.                     |
| Persistencia y modelo       | `prisma/`                                     | Esquema, migraciones y seed.                                       |
| Estáticos                   | `public/`                                     | SVG y assets servidos tal cual.                                    |
| Configuración raíz          | `*.config.*`, `tsconfig.json`, `package.json` | Build, lint, tests, TypeScript.                                    |

## Árbol de directorios (referencia)

Estructura orientativa del código **versionado** en `src/` y `prisma/`:

```text
ecommerce/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│       └── <timestamp>_*/
│           └── migration.sql
├── public/
│   └── … (svg y estáticos)
├── src/
│   └── app/
│       ├── api/
│       │   └── checkout/
│       │       └── route.ts         # validacion backend del checkout (demo)
│       ├── checkout/
│       │   └── page.tsx             # checkout básico (resumen + forma de pago)
│       ├── contacto/
│       │   └── page.tsx             # pagina de contacto con canales y formulario base
│       ├── components/
│       │   ├── __tests__/          # pruebas Jest por componente
│       │   ├── BenefitsSection.tsx
│       │   ├── CategoriesSection.tsx
│       │   ├── FeaturedProductsSection.tsx
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── HeroSection.tsx
│       │   ├── ProductImageGallery.tsx
│       │   └── index.ts
│       ├── data/
│       │   └── store.ts            # datos de ejemplo / vitrina
│       ├── productos/
│       │   └── page.tsx            # catalogo de productos con busqueda por categoria
│       ├── context/
│       │   └── CartContext.tsx     # estado global carrito (cliente)
│       ├── lib/
│       │   └── currency.ts
│       ├── providers.tsx           # agrupa providers cliente para layout
│       ├── types/
│       │   └── index.ts
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx                # home
├── eslint.config.mjs
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Flujo de la home (producto)

1. `layout.tsx` — shell global y metadatos.
2. `page.tsx` — compone las secciones (hero, beneficios, productos destacados, categorías, footer).
3. `data/store.ts` — alimenta categorías/productos cuando el origen es local.
4. `lib/currency.ts` — formato CLP para precios en UI.

## Flujo carrito y checkout

1. `context/CartContext.tsx` expone `addToCart`, `updateQuantity`, `removeFromCart`, totales y persistencia local con parseo estricto del carrito. El estado inicial en el primer render es siempre vacío (igual que en el servidor); la lectura de `localStorage` ocurre en `useEffect` tras la hidratación para evitar errores de _hydration mismatch_ en el `Header` y demás UI que dependen del contador.
2. `providers.tsx` monta `CartProvider` en `layout.tsx` para compartir estado entre rutas.
3. `components/FeaturedProductsSection.tsx` agrega producto y redirige a `/checkout`.
4. `components/Header.tsx` refleja contador del carrito y navega a `checkout`.
5. `checkout/page.tsx` renderiza resumen, edición de cantidades y formulario de pago estándar en modo PCI-safe (sin capturar PAN/CVV).
6. `api/checkout/route.ts` valida payload, cruza productos contra catálogo del servidor y recalcula subtotal/total como fuente de verdad; cantidades fuera de rango se rechazan con `400` (sin clamp silencioso).
7. En `checkout/page.tsx`, un input de cantidad temporalmente vacío no elimina el item; eliminar queda como acción explícita (botón o cantidad confirmada `< 1`).

## Flujo catálogo y contacto

1. `productos/page.tsx` muestra el catálogo completo de `data/store.ts` y permite buscar por categoría con input + botones rápidos.
2. La búsqueda usa coincidencia parcial (`includes`) sobre `product.category` para tolerar variaciones de texto.
3. `contacto/page.tsx` centraliza canales de soporte y un formulario base listo para conectar a una API.
4. `components/Header.tsx` y `components/Footer.tsx` incluyen accesos directos a `/productos` y `/contacto`.

## Accesibilidad (lint Microsoft Edge Tools)

- En atributos ARIA dinámicos (`aria-expanded`, `aria-hidden`, etc.), el analizador **Microsoft Edge Tools** puede marcar como error valores escritos en JSX como `aria-*={expresión}`. La convención en este repo es **agrupar esos props en un objeto** y aplicarlos con spread (`{...objetoA11y}`), como en `Header.tsx`.

## Tests

- **Frontend:** `npm test` (Jest); suites bajo `src/app/components/__tests__/`.
- **Seguridad / middleware (Node):** `npm run test:security` — el comando está definido en `package.json`; los archivos concretos pueden vivir fuera del árbol versionado según `.gitignore`.

## Documentación operativa

- Guía de integración de pagos PSP para Chile: `doc/guia-integracion-pagos-psp-chile.md`.
- Esta guía incluye checklist de onboarding, arquitectura de pagos y una implementación sugerida para Next.js (App Router) con webhook e idempotencia.
- Plantilla de entorno para desarrollo e integración de pagos: `.env.example`.
- Comentario de contexto: ambos documentos (`doc/...` y `.env.example`) deben mantenerse sincronizados cuando cambien rutas API de pagos o variables PSP.

## Qué no asumir en el repositorio (`.gitignore`)

El archivo `.gitignore` excluye, entre otros: `node_modules/`, `.next/`, `out/`, `build/`, cobertura, `.env*` (con excepción de `.env.example`), artefactos de TypeScript opcionales, y carpetas como `scripts/`, `.cursor/`, `ai-team/` (y otros paths listados allí).

- No cites como “fuente del proyecto” rutas solo locales si el equipo no las versiona.
- Para variables de entorno, el equipo usa un `.env` **local** (no versionado); el nombre exacto de plantilla depende de lo que exista en tu clon.

Actualiza este documento si cambia la organización de `src/app/`, el flujo de carrito/checkout o el modelo en `prisma/`.
