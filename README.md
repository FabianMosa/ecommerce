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

## Guia de pagos PSP (Chile)

Se agrego una guia tecnica y operativa para integrar un metodo de pago mediante PSP asociado a cuenta bancaria en Chile:

- Documento: [`doc/guia-integracion-pagos-psp-chile.md`](./doc/guia-integracion-pagos-psp-chile.md)
- Incluye: onboarding comercial, arquitectura sugerida, endpoints Next.js (`create`, `webhook`, `confirm`), variables de entorno, idempotencia y plan de salida a produccion.
- Uso recomendado: revisar esta guia antes de implementar cualquier integracion real de cobros en `/checkout`.
- Comentario de contexto: la guia esta escrita para reducir errores comunes de conciliacion, seguridad e inconsistencias entre frontend y backend.

## Ejecutar en local

1. Instala dependencias:

```bash
npm install
```

2. Configura variables de entorno: crea tu `.env` a partir de la plantilla versionada `.env.example` y completa los valores requeridos.

```bash
cp .env.example .env
```

Variables mínimas para desarrollo:

```bash
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/NOMBRE_DB"
```

Comentario de contexto: en escenarios con contenedores (`docker-compose`), la `DATABASE_URL` puede usar host `db`; para ejecución local directa suele usarse `localhost`.

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
- El flujo de compra incluye carrito persistente + checkout básico (`/checkout`) con validación de montos en backend.
- Se agregaron rutas dedicadas para catálogo (`/productos`) y soporte (`/contacto`) con navegación integrada en header/footer.
- El catálogo en `/productos` permite filtrar por categoría con lista desplegable y refinar por palabra clave desde un input.
- Artefactos de build y dependencias locales (`node_modules`, `.next`, cobertura, etc.) no forman parte del repositorio; no los trates como codigo fuente versionado.

## Rutas de contenido

- `/` Home con secciones de vitrina.
- `/productos` Catálogo responsive con filtro por categoría (select) y búsqueda por palabra clave.
- `/checkout` Flujo de compra demo con validación backend.
- `/contacto` Canales de soporte + formulario base de consulta.

## Flujo de compra (frontend)

1. En la home, el botón `Agregar y comprar` agrega el producto al carrito y redirige a `/checkout`.
2. El contador de `Header` muestra la cantidad total del carrito en tiempo real.
3. En `/checkout` se puede:
   - revisar productos agregados,
   - ajustar cantidades o quitar items,
   - completar un formulario de pago estándar (modo demo PCI-safe),
   - confirmar compra tras validación backend y limpiar carrito.

La persistencia del carrito se maneja en cliente con `localStorage` para conservar estado entre navegación y refrescos. El parseo del carrito es estricto (esquema, rangos y descarte de datos inválidos). Para alinear SSR y cliente, el primer render no lee aún el almacenamiento local; tras montar el árbol se restaura el carrito y se actualiza el contador (evita _hydration failed_ si había ítems guardados).

## Checkout seguro (modo demo)

- El frontend **no** captura PAN ni CVV; en su lugar muestra una experiencia de pago estándar en modo demostración.
- El endpoint `POST /api/checkout` valida el payload, limita cantidades y recalcula precios desde `src/app/data/store.ts` (fuente de verdad del servidor).
- El endpoint `POST /api/checkout` rechaza con `400` cantidades fuera de rango (1..20); no hace clamp silencioso.
- El total final confirmado en UI corresponde al monto retornado por backend, no al cálculo del cliente.
- En la UI de checkout, dejar temporalmente vacío el input de cantidad no elimina items; la eliminación solo ocurre por botón `Quitar` o al confirmar explícitamente una cantidad `< 1`.

## Tests frontend (Jest + Testing Library)

- Los tests de componentes viven en `src/app/components/__tests__/`.
- Suites cubiertas: `Header`, `HeroSection`, `BenefitsSection`, `CategoriesSection`, `FeaturedProductsSection` y `Footer`.
- La API `POST /api/checkout` incluye tests de errores y seguridad en `src/app/api/checkout/route.test.ts` (validación de formato, límites, tampering de payload y JSON malformado).
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
