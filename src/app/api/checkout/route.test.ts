/**
 * @jest-environment node
 */
import { POST } from "./route";

describe("Checkout API (seguridad base)", () => {
  // Helper para centralizar creación de requests y mantener legibles los casos.
  const createCheckoutRequest = (body: unknown) =>
    new Request("http://localhost/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  it("recalcula el total desde catalogo servidor", async () => {
    const request = createCheckoutRequest({
      items: [{ productId: 1, quantity: 2 }],
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    // 49.990 * 2 (precio proveniente de `data/store.ts`, no del cliente).
    expect(payload.total).toBe(99980);
  });

  it("rechaza productos inexistentes", async () => {
    const request = createCheckoutRequest({
      items: [{ productId: 999999, quantity: 1 }],
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("rechaza cantidades fuera de rango en vez de clamplear", async () => {
    const request = createCheckoutRequest({
      items: [{ productId: 1, quantity: 999 }],
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("rechaza body sin items para evitar procesamiento ambiguo", async () => {
    const request = createCheckoutRequest({});
    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("sin items");
  });

  it("rechaza carrito vacio", async () => {
    const request = createCheckoutRequest({ items: [] });
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it("rechaza cuando se supera el maximo de items permitido", async () => {
    // Se generan 31 items para sobrepasar el limite del endpoint (30).
    const overflowingItems = Array.from({ length: 31 }, () => ({
      productId: 1,
      quantity: 1,
    }));
    const request = createCheckoutRequest({ items: overflowingItems });
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it("rechaza tipos invalidos para productId y quantity", async () => {
    const request = createCheckoutRequest({
      items: [{ productId: "1", quantity: "2" }],
    });
    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("Formato");
  });

  it("rechaza quantities no enteras o menores a 1", async () => {
    const decimalRequest = createCheckoutRequest({
      items: [{ productId: 1, quantity: 1.5 }],
    });
    const zeroRequest = createCheckoutRequest({
      items: [{ productId: 1, quantity: 0 }],
    });

    const decimalResponse = await POST(decimalRequest);
    const zeroResponse = await POST(zeroRequest);

    expect(decimalResponse.status).toBe(400);
    expect(zeroResponse.status).toBe(400);
  });

  it("ignora manipulacion de precio enviada por cliente", async () => {
    const request = createCheckoutRequest({
      items: [
        // `price` no existe en el contrato backend y no debe impactar cálculo.
        { productId: 1, quantity: 1, price: 1 },
      ],
    });
    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.items[0].unitPrice).toBe(49990);
    expect(payload.total).toBe(49990);
  });

  it("devuelve 400 cuando el JSON llega malformado", async () => {
    const malformedRequest = new Request("http://localhost/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{items:[",
    });

    const response = await POST(malformedRequest);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("No fue posible procesar");
  });
});
