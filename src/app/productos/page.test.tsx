import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ProductosPage from "./page";
import { CartProvider } from "../context/CartContext";

// Usamos el CartProvider porque el Header lo necesita
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("ProductosPage", () => {
  it("renderiza el titulo y el catalogo por defecto", () => {
    render(<ProductosPage />, { wrapper });
    expect(
      screen.getByRole("heading", { name: /Productos por categoria/i }),
    ).toBeInTheDocument();
    
    // Todos los productos deberian renderizarse por defecto
    const allProducts = screen.getAllByRole("article");
    expect(allProducts.length).toBeGreaterThan(0);
  });

  it("filtra productos por palabra clave", () => {
    render(<ProductosPage />, { wrapper });
    
    const searchInput = screen.getByLabelText(/Buscar por palabra/i);
    // Asumimos que hay un producto que se llama o contiene "audifonos" o buscamos algo generico.
    // Buscamos algo que sabemos que no existe para ver si muestra el mensaje de vacio.
    fireEvent.change(searchInput, { target: { value: "producto_inexistente_xyz" } });
    
    expect(
      screen.getByText(/No encontramos productos con esos filtros/i),
    ).toBeInTheDocument();
  });

  it("tiene enlace a checkout", () => {
    render(<ProductosPage />, { wrapper });
    
    const checkoutLink = screen.getByRole("link", { name: /Ir a checkout/i });
    expect(checkoutLink).toHaveAttribute("href", "/checkout");
  });
});
