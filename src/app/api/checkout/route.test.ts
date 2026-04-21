/**
 * @jest-environment node
 */
import { POST } from "./route";

describe("Checkout API (seguridad base)", () => {
  it("recalcula el total desde catalogo servidor", async () => {
    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ productId: 1, quantity: 2 }],
      }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    // 49.990 * 2 (precio proveniente de `data/store.ts`, no del cliente).
    expect(payload.total).toBe(99980);
  });

  it("rechaza productos inexistentes", async () => {
    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ productId: 999999, quantity: 1 }],
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("rechaza cantidades fuera de rango en vez de clamplear", async () => {
    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ productId: 1, quantity: 999 }],
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
