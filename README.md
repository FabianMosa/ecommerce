# Ecommerce Portfolio

Proyecto ecommerce construido con Next.js y TypeScript.

## Stack actual

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL

## Estructura del repositorio

Resumen de carpetas y convenciones: [AGENTS.md](./AGENTS.md).

## Ejecutar en local

1. Instala dependencias:

```bash
npm install
```

2. Configura variables de entorno: crea un archivo `.env` en la raíz del proyecto (no se versiona; ver `.gitignore`) con al menos:

```bash
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/NOMBRE_DB"
```

3. Genera cliente Prisma:

```bash
npm run prisma:generate
```

4. Crea migracion inicial (si aun no existe):

```bash
npm run prisma:migrate -- --name init_ecommerce
```

5. Ejecuta el seed:

```bash
npm run prisma:seed
```

6. Inicia la app:

```bash
npm run dev
```

## Esquema de base de datos (v1)

El esquema inicial esta en `prisma/schema.prisma` e incluye:

- `User`
- `Category`
- `Product`
- `ProductImage`
- `Inventory`
- `Cart`
- `CartItem`

## Datos semilla

El seed esta en `prisma/seed.ts` y crea:

- Categorias iniciales (laptops, auriculares, accesorios, ofertas)
- Productos de ejemplo
- Inventario base y multiples fotos referenciales por producto

## Notas

- El codigo fuente (componentes, datos, config y pruebas) incluye comentarios en espanol que explican el proposito de cada modulo y decisiones de UI o accesibilidad.
- El seed es idempotente para evitar duplicados al ejecutarlo varias veces.
- Los precios usan tipo `Decimal` para precision monetaria.
- La interfaz usa una paleta visual renovada (azules + acentos ambar) para mejorar contraste y jerarquia.
- En frontend, los montos de vitrina se muestran en pesos chilenos (`CLP`) usando locale `es-CL`.
- La home prioriza conversion con flujo: propuesta de valor (`Hero`) -> confianza (`Benefits`) -> compra (`FeaturedProducts`) -> exploracion (`Categories`).
- La vitrina de productos incluye galeria responsiva con foto principal + miniaturas y fallback seguro cuando faltan URLs.
- Artefactos de build y dependencias locales (`node_modules`, `.next`, cobertura, etc.) no forman parte del repositorio; no los trates como codigo fuente versionado.

## Tests frontend (Jest + Testing Library)

- Los tests de componentes viven en `src/app/components/__tests__/`.
- Suites cubiertas: `Header`, `HeroSection`, `BenefitsSection`, `CategoriesSection`, `FeaturedProductsSection` y `Footer`.
- Para ejecutar la bateria de pruebas frontend en modo secuencial:

```bash
npm test -- --runInBand src/app/components/__tests__
```

## SQL de migracion

- Migracion inicial de ejemplo: `prisma/migrations/20260409000000_init_ecommerce/migration.sql`

## Seguridad (suite complementaria)

- Comando definido en `package.json`:

```bash
npm run test:security
```

Ejecuta la validacion de politicas SecDevOps con el test runner de Node (sin depender de Jest). No se documentan aqui rutas de archivos que el proyecto pueda excluir del control de versiones; revisa `AGENTS.md` y `.gitignore` si necesitas ubicar scripts locales.
