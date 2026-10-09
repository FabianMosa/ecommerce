import { render, screen } from "@testing-library/react";
import React from "react";
import ContactoPage from "./page";
import { CartProvider } from "../context/CartContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("ContactoPage", () => {
  it("renderiza el titulo y la seccion de canales directos", () => {
    render(<ContactoPage />, { wrapper });
    
    expect(screen.getByRole("heading", { name: /^Contacto$/i })).toBeInTheDocument();
    expect(screen.getByText(/soporte@tiendaonline\.cl/i)).toBeInTheDocument();
  });

  it("renderiza el formulario de contacto con sus campos", () => {
    render(<ContactoPage />, { wrapper });
    
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    
    const submitButton = screen.getByRole("button", { name: /Enviar consulta/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });
});
