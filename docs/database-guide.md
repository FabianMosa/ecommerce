# Guia de Base de Datos

Esta guia describe como trabajar la base de datos del proyecto ecommerce usando Prisma + PostgreSQL.

## 1) Stack y decision tecnica

- Motor recomendado: PostgreSQL
- ORM: Prisma
- Objetivo de esta version: catalogo + inventario + carrito

Se eligio PostgreSQL por soporte robusto de relaciones, indices, integridad referencial y transacciones.

## 2) Archivos clave

- Esquema Prisma: `prisma/schema.prisma`
- Seed: `prisma/seed.ts`
- Migracion inicial SQL: `prisma/migrations/20260409000000_init_ecommerce/migration.sql`
- Lock de proveedor: `prisma/migrations/migration_lock.toml`
- Variables de entorno de ejemplo: `.env.example`

## 3) Modelo de datos v1

Tablas principales incluidas:

- `User`: usuarios del ecommerce (email unico y password hash)
- `Category`: categorias de productos
- `Product`: productos del catalogo
- `ProductImage`: imagenes por producto
- `Inventory`: stock por producto
- `Cart`: carrito por usuario
- `CartItem`: items del carrito

Relaciones clave:

- Una `Category` tiene muchos `Product`
- Un `Product` tiene muchas `ProductImage` y un `Inventory`
- Un `User` tiene un `Cart`
- Un `Cart` tiene muchos `CartItem`
- Un `CartItem` referencia un `Product`

## 4) Flujo de migraciones

### Configuracion inicial

1. Crear `.env` desde `.env.example`.
2. Configurar `DATABASE_URL` a una instancia PostgreSQL valida.
3. Generar cliente Prisma:

```bash
npm run prisma:generate
```

### Aplicar migraciones

Para aplicar migraciones en desarrollo:

```bash
npm run prisma:migrate -- --name init_ecommerce
```

Si la migracion ya existe, Prisma aplicara el historial pendiente.

## 5) Seed de datos

El seed en `prisma/seed.ts` es idempotente:

- Usa `upsert` para categorias y productos
- Actualiza inventario sin duplicar registros
- Crea imagen principal si no existe

Comando:

```bash
npm run prisma:seed
```

## 6) Convenciones y buenas practicas

- Mantener precios en `Decimal(10,2)` para precision monetaria.
- Guardar solo hashes en `passwordHash`; nunca passwords en claro.
- Agregar indices cuando una nueva consulta se vuelva frecuente.
- Crear una migracion por cambio funcional del modelo (no mezclar multiples features grandes).
- Versionar siempre `schema.prisma` + `prisma/migrations/*`.

## 7) Siguientes mejoras recomendadas

- Agregar `Order`, `OrderItem` y `Payment`.
- Agregar `Address` para checkout real.
- Implementar historial de stock (movimientos de inventario).
- Crear `src/lib/prisma.ts` para singleton de cliente Prisma en Next.js.
