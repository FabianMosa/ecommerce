# Guía para incorporar un método de pago con PSP (Chile)

Esta guía te ayuda a integrar pagos en Chile mediante un PSP (Payment Service Provider) asociado a tu cuenta bancaria de empresa.

> Comentario de contexto: el objetivo es que puedas pasar de onboarding comercial a implementación técnica sin capturar datos sensibles de tarjeta en tu app.

## 1) Define el alcance de pagos

Antes de elegir proveedor, define claramente:

- Medios de pago que ofrecerás: débito, crédito, prepago, transferencia.
- Moneda de operación: CLP (y si tendrás moneda extranjera).
- Modelo de negocio: one-time payment, suscripciones, links de pago, POS, etc.
- Canales: web, mobile, checkout embebido o redirección.

## 2) Selecciona el PSP para Chile

Evalúa PSPs con operación local en Chile (por ejemplo: Transbank Webpay, Mercado Pago, Flow, Kushki, entre otros), comparando:

- Cobertura de medios de pago locales.
- Comisión por transacción y costo de retiro.
- Plazos de abono a cuenta bancaria (T+1, T+2, etc.).
- Disponibilidad de Webhooks y APIs.
- Calidad de documentación, soporte y ambiente sandbox.
- Herramientas antifraude y gestión de contracargos.

## 3) Requisitos de empresa y cuenta bancaria

Normalmente te solicitarán:

- RUT de empresa y razón social.
- Inicio de actividades en SII.
- Cuenta bancaria empresarial en Chile (misma titularidad legal).
- Representante legal y documentación KYC/KYB.
- Sitio web con términos y política de privacidad.

## 4) Habilita la cuenta PSP (onboarding)

Completa el registro comercial y técnico del PSP:

1. Crea cuenta de comercio en el PSP.
2. Sube documentos de validación.
3. Configura datos de liquidación bancaria (banco, tipo de cuenta, número).
4. Firma contrato/comisiones.
5. Solicita credenciales de integración para sandbox y producción.

## 5) Diseña la arquitectura de integración

Define el flujo recomendado:

- Frontend crea intención de pago llamando a tu backend.
- Backend crea la transacción en el PSP y devuelve token/URL.
- Cliente paga en checkout PSP o embebido.
- PSP notifica resultado por webhook.
- Backend valida firma y actualiza estado de orden.

Estado de orden sugerido:

- `created` -> `pending_payment` -> `paid` | `failed` | `refunded`.

## 6) Implementación técnica mínima

Checklist técnico:

- Variables de entorno separadas por ambiente (`sandbox` y `production`).
- Endpoint backend para crear pago.
- Endpoint backend de webhook con validación de firma/HMAC.
- Idempotencia para evitar cobros/actualizaciones duplicadas.
- Registro de auditoría de eventos de pago.
- Manejo de reintentos en webhooks y timeouts.

## 7) Seguridad y cumplimiento

Buenas prácticas obligatorias:

- Nunca exponer secretos del PSP en frontend.
- Usar HTTPS en todos los endpoints.
- Registrar y monitorear intentos de fraude.
- Cumplir PCI DSS según el modelo del PSP (ideal: tokenización + hosted checkout).
- Definir procesos de devoluciones parciales/totales y conciliación diaria.

## 8) Consideraciones tributarias y operativas en Chile

Revisa con tu contador/asesoría legal:

- Emisión de boleta/factura electrónica según SII.
- Tratamiento de comisiones del PSP.
- Conciliación de abonos bancarios vs órdenes pagadas.
- Gestión de contracargos y respaldo documental.

## 9) Pruebas antes de salir a producción

En sandbox, prueba como mínimo:

- Pago exitoso.
- Rechazo por fondos insuficientes/tarjeta inválida.
- Timeout o cierre de checkout.
- Reintento del mismo pago (idempotencia).
- Llegada duplicada de webhook.
- Devolución total y parcial.

## 10) Paso a producción (go-live)

1. Cambia credenciales de `sandbox` a `production`.
2. Actualiza URL pública de webhook productiva.
3. Activa alertas de errores y caída de tasa de aprobación.
4. Publica método de pago para un % acotado de usuarios (si es posible).
5. Monitorea diariamente autorización, rechazo, fraude y abonos bancarios.

## 11) Indicadores clave post-lanzamiento

Monitorea semanalmente:

- Tasa de aprobación (`approved / attempts`).
- Tasa de abandono en checkout.
- Tiempo promedio de confirmación de pago.
- Contracargos por cada 1.000 transacciones.
- Diferencias en conciliación bancaria.

## Plantilla rápida de checklist

Puedes copiar este bloque para seguimiento interno:

- [ ] PSP seleccionado y contrato firmado.
- [ ] Cuenta bancaria empresarial validada en PSP.
- [ ] Credenciales sandbox operativas.
- [ ] Endpoint crear pago implementado.
- [ ] Webhook con validación de firma implementado.
- [ ] Idempotencia y logging habilitados.
- [ ] Pruebas de escenarios críticos aprobadas.
- [ ] Credenciales de producción cargadas.
- [ ] Monitoreo y alertas activas.
- [ ] Conciliación financiera documentada.

---

## 12) Implementación técnica sugerida en Next.js (App Router)

Esta propuesta está alineada con la estructura actual del proyecto (`src/app/api/...`) y separa responsabilidades entre frontend y backend.

### Estructura de rutas recomendada

- `src/app/api/payments/create/route.ts`  
  Crea la orden local y genera la transacción en el PSP.
- `src/app/api/payments/webhook/route.ts`  
  Recibe notificaciones del PSP, valida firma y actualiza estado.
- `src/app/api/payments/confirm/route.ts`  
  (Opcional) Endpoint para consulta activa del estado de pago desde frontend.
- `src/app/checkout/page.tsx`  
  Llama al endpoint `create`, redirige a checkout PSP o inicia widget embebido.

### Variables de entorno sugeridas

Ejemplo de variables (nombres genéricos para cualquier PSP):

- `PSP_ENV=sandbox`
- `PSP_API_BASE_URL=https://sandbox-api.tu-psp.com`
- `PSP_API_KEY=...`
- `PSP_SECRET_KEY=...`
- `PSP_WEBHOOK_SECRET=...`
- `PSP_COMMERCE_CODE=...`
- `PAYMENT_RETURN_URL=https://tu-dominio.cl/checkout/resultado`
- `PAYMENT_WEBHOOK_PUBLIC_URL=https://tu-dominio.cl/api/payments/webhook`

Notas:

- Nunca uses `NEXT_PUBLIC_` para secretos (`API_KEY`, `SECRET`, `WEBHOOK_SECRET`).
- Mantén `sandbox` y `production` completamente separados (credenciales y URLs).
- Comentario de contexto: esta separación evita mezclar transacciones de prueba con cobros reales y simplifica auditoría.

### Flujo recomendado end-to-end

1. Usuario confirma carrito en `/checkout`.
2. Frontend llama `POST /api/payments/create` con orden y cliente.
3. Backend valida ítems/montos contra catálogo servidor.
4. Backend crea orden local en estado `pending_payment`.
5. Backend crea transacción en el PSP y responde `paymentUrl`/`token`.
6. Frontend redirige al PSP.
7. PSP procesa y notifica a `POST /api/payments/webhook`.
8. Backend valida firma + idempotencia y marca orden `paid` o `failed`.
9. Frontend consulta estado final (polling corto o endpoint de confirmación).

### Contrato sugerido para `POST /api/payments/create`

Request (ejemplo):

```json
{
  "orderId": "ORD-20260423-0001",
  "items": [
    { "productId": "sku-01", "quantity": 1, "unitPrice": 19990 }
  ],
  "customer": {
    "email": "cliente@correo.cl",
    "fullName": "Nombre Cliente",
    "rut": "11.111.111-1"
  }
}
```

Response (ejemplo):

```json
{
  "orderId": "ORD-20260423-0001",
  "status": "pending_payment",
  "provider": "psp-name",
  "paymentUrl": "https://checkout.psp.com/session/abc123",
  "expiresAt": "2026-04-23T22:00:00.000Z"
}
```

### Webhook: validación e idempotencia (crítico)

Checklist obligatorio en `POST /api/payments/webhook`:

- Leer `raw body` cuando el PSP lo exija para verificar firma.
- Validar firma/HMAC con `PSP_WEBHOOK_SECRET`.
- Persistir `eventId` único (tabla de eventos) para ignorar duplicados.
- Actualizar orden solo por transiciones válidas:
  - `pending_payment -> paid`
  - `pending_payment -> failed`
  - `paid -> refunded` (si aplica)
- Responder `200` rápidamente tras persistir, y delegar tareas pesadas a cola/job.
- Comentario de contexto: en producción es normal recibir eventos duplicados o fuera de orden; por eso la idempotencia no es opcional.

### Modelo de datos mínimo (referencial)

Tablas sugeridas:

- `orders`: `id`, `status`, `amount`, `currency`, `provider`, `providerTxId`, timestamps.
- `payment_events`: `id`, `eventId`, `orderId`, `type`, `payload`, `processedAt`.
- Índice único en `payment_events.eventId` para idempotencia dura.

### Errores frecuentes y cómo evitarlos

- Recalcular total en frontend (riesgo de manipulación)  
  -> Siempre recalcular en backend.
- Confirmar pago solo por redirección del usuario  
  -> El estado final lo define webhook verificado.
- No separar ambientes  
  -> Usar llaves y URLs distintas para sandbox/producción.
- No registrar payload de eventos  
  -> Guardar auditoría para soporte y contracargos.

### Plan de salida controlada a producción

1. Activar inicialmente solo tarjetas de débito/crédito.
2. Lanzar a porcentaje acotado de tráfico.
3. Monitorear 48-72 horas:
   - tasa de aprobación,
   - ratio de timeout,
   - latencia en creación de pago,
   - diferencias de conciliación bancaria.
4. Escalar progresivamente al 100% cuando el comportamiento sea estable.

> Comentario de contexto: este plan reduce riesgo financiero y permite detectar descalces antes de abrir el tráfico completo.
