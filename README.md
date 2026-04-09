# Ecommerce Portfolio

Proyecto ecommerce construido con Next.js y TypeScript.

## Stack actual

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL

## Ejecutar en local

1. Instala dependencias:

```bash
npm install
```

2. Copia variables de entorno:

```bash
cp .env.example .env
```

3. Ajusta `DATABASE_URL` en `.env` con tus credenciales de PostgreSQL.

4. Genera cliente Prisma:

```bash
npm run prisma:generate
```

5. Crea migracion inicial (si aun no existe):

```bash
npm run prisma:migrate -- --name init_ecommerce
```

6. Ejecuta el seed:

```bash
npm run prisma:seed
```

7. Inicia la app:

```bash
npm run dev
```

## Ejecutar con Docker

1. Crea tu archivo de entorno local:

```bash
cp .env.example .env
```

2. Construye y levanta servicios:

```bash
docker compose up --build
```

3. Abre la aplicacion:

- App: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

4. Apagar y limpiar contenedores:

```bash
docker compose down
```

Opcional: borrar volumen de datos de PostgreSQL:

```bash
docker compose down -v
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
- Inventario base e imagen principal por producto

## Notas

- El seed es idempotente para evitar duplicados al ejecutarlo varias veces.
- Los precios usan tipo `Decimal` para precision monetaria.
- La interfaz usa una paleta visual renovada (azules + acentos ambar) para mejorar contraste y jerarquia.
- En frontend, los montos de vitrina se muestran en pesos chilenos (`CLP`) usando locale `es-CL`.
- La home prioriza conversion con flujo: propuesta de valor (`Hero`) -> confianza (`Benefits`) -> compra (`FeaturedProducts`) -> exploracion (`Categories`).

## Documentacion adicional

- Guia de base de datos: `docs/database-guide.md`
- SQL de migracion inicial: `prisma/migrations/20260409000000_init_ecommerce/migration.sql`
