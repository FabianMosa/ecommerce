import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import CheckoutPage from "./page";
import { CartProvider } from "../context/CartContext";

const CART_STORAGE_KEY = "ecommerce-cart-v1";

const seededCart = [
  {
    product: {
      id: 1,
      name: "Auriculares Inalambricos",
      price: 49990,
      tagline: "Sonido envolvente y autonomia para jornadas largas.",
      images: [],
    },
    quantity: 1,
  },
];

type GlobalWithFetchMock = typeof globalThis & {
  fetch?: jest.Mock;
};

function renderCheckout() {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(seededCart));
  return render(
    <CartProvider>
      <CheckoutPage />
    </CartProvider>,
  );
}

describe("Checkout quantity input behavior", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("no elimina el item cuando el input queda temporalmente vacio", () => {
    renderCheckout();

    const quantityInput = screen.getByLabelText("Cantidad");
    fireEvent.change(quantityInput, { target: { value: "" } });
    fireEvent.blur(quantityInput);

    expect(
      screen.getByText("Auriculares Inalambricos"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Cantidad")).toHaveValue(1);
  });

  it("elimina el item cuando se confirma cantidad explicita menor a 1", () => {
    renderCheckout();

    const quantityInput = screen.getByLabelText("Cantidad");
    fireEvent.change(quantityInput, { target: { value: "0" } });
    fireEvent.blur(quantityInput);

    expect(screen.getByText(/Tu carrito esta vacio/i)).toBeInTheDocument();
  });

  it("muestra total validado por servidor y limpia carrito tras confirmar pago", async () => {
    const globalWithFetch = globalThis as GlobalWithFetchMock;
    const originalFetch = globalWithFetch.fetch;
    const fetchMock = jest.fn().mockResolvedValueOnce(
      {
        ok: true,
        json: async () => ({ total: 99980 }),
      },
    );
    globalWithFetch.fetch = fetchMock;

    renderCheckout();

    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText("Correo electronico"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Direccion de envio"), {
      target: { value: "Av. Siempre Viva 123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Confirmar pago/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Total validado por servidor: \$99\.980/i),
      ).toBeInTheDocument(),
    );
    expect(screen.getByText(/Tu carrito esta vacio/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/checkout",
      expect.objectContaining({ method: "POST" }),
    );
    globalWithFetch.fetch = originalFetch;
  });

  it("muestra mensaje de error cuando API responde 400 por cantidad invalida", async () => {
    const globalWithFetch = globalThis as GlobalWithFetchMock;
    const originalFetch = globalWithFetch.fetch;
    const fetchMock = jest.fn().mockResolvedValueOnce(
      {
        ok: false,
        json: async () => ({ error: "Cantidad fuera de rango." }),
      },
    );
    globalWithFetch.fetch = fetchMock;

    renderCheckout();

    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Grace Hopper" },
    });
    fireEvent.change(screen.getByLabelText("Correo electronico"), {
      target: { value: "grace@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Direccion de envio"), {
      target: { value: "Calle Falsa 123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Confirmar pago/i }));

    await waitFor(() =>
      expect(screen.getByText("Cantidad fuera de rango.")).toBeInTheDocument(),
    );
    expect(screen.queryByText(/Pago registrado correctamente/i)).not.toBeInTheDocument();
    globalWithFetch.fetch = originalFetch;
  });
});
