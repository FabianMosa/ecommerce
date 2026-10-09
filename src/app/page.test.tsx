import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./page";
import { CartProvider } from "./context/CartContext";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

// Mock simple de componentes pesados (Next.js Link, Image, etc) si fuese necesario.
// Como los componentes base ya estan probados individualmente, aca validamos montaje.
describe("Home Page", () => {
  it("renderiza todas las secciones principales de la landing", () => {
    render(<Home />, { wrapper });

    // 1. Header (esperamos encontrar el h1 u otro elemento clave que no este duplicado, 
    // pero el rol "banner" o la navegacion es suficiente)
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // 2. HeroSection - Busca el titulo principal del hero
    expect(screen.getByText(/Accesorios y perifericos listos para mejorar tu setup/i)).toBeInTheDocument();

    // 3. BenefitsSection - Busca algun beneficio
    expect(screen.getByText(/Por que comprar con nosotros/i)).toBeInTheDocument();

    // 4. FeaturedProductsSection - Titulo de seccion
    expect(screen.getByText(/Productos recomendados para ti/i)).toBeInTheDocument();

    // 5. CategoriesSection - Titulo de categorias
    expect(screen.getByText(/Compra por categoria/i)).toBeInTheDocument();

    // 6. Footer - Rol contentinfo
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
