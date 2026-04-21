# AGENTS.md — Guía para agentes y colaboradores

Este documento resume la **estructura del repositorio** y convenciones útiles para navegar el proyecto sin depender de carpetas que puedan estar excluidas del control de versiones.

## Rol del archivo

- Orientar a asistentes de IA y desarrolladores sobre **dónde vive cada capa** (UI, datos, persistencia, configuración).
- Dejar explícito qué rutas **no deben asumirse presentes en git** (ver sección final).

## Vista general

| Capa | Ubicación típica | Notas |
|------|-------------------|--------|
| App Next.js (App Router) | `src/app/` | Páginas, layout, estilos globales, componentes y datos de vitrina. |
| Componentes de página | `src/app/components/` | Secciones reutilizables (Header, Hero, productos, etc.). |
| Tests de componentes | `src/app/components/__tests__/` | Jest + Testing Library. |
| Tipos compartidos | `src/app/types/` | Contratos TypeScript del frontend. |
| Utilidades | `src/app/lib/` | Por ejemplo formateo de moneda (`currency.ts`). |
| Datos en memoria / mock | `src/app/data/` | Catálogo o estado local cuando no hay API aún. |
| Persistencia y modelo | `prisma/` | Esquema, migraciones y seed. |
| Estáticos | `public/` | SVG y assets servidos tal cual. |
| Configuración raíz | `*.config.*`, `tsconfig.json`, `package.json` | Build, lint, tests, TypeScript. |

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
│       ├── lib/
│       │   └── currency.ts
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

## Accesibilidad (lint Microsoft Edge Tools)

- En atributos ARIA dinámicos (`aria-expanded`, `aria-hidden`, etc.), el analizador **Microsoft Edge Tools** puede marcar como error valores escritos en JSX como `aria-*={expresión}`. La convención en este repo es **agrupar esos props en un objeto** y aplicarlos con spread (`{...objetoA11y}`), como en `Header.tsx`.

## Tests

- **Frontend:** `npm test` (Jest); suites bajo `src/app/components/__tests__/`.
- **Seguridad / middleware (Node):** `npm run test:security` — el comando está definido en `package.json`; los archivos concretos pueden vivir fuera del árbol versionado según `.gitignore`.

## Qué no asumir en el repositorio (`.gitignore`)

El archivo `.gitignore` excluye, entre otros: `node_modules/`, `.next/`, `out/`, `build/`, cobertura, `.env*`, artefactos de TypeScript opcionales, y carpetas como `docs/`, `scripts/`, `.cursor/`, `ai-team/` (y otros paths listados allí).

- No cites como “fuente del proyecto” rutas solo locales si el equipo no las versiona.
- Para variables de entorno, el equipo usa un `.env` **local** (no versionado); el nombre exacto de plantilla depende de lo que exista en tu clon.

Actualiza este documento si cambia la organización de `src/app/` o el modelo en `prisma/`.
