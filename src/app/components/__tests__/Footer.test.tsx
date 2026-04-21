// Pruebas del Footer: rol contentinfo, ano dinamico y enlaces del pie.
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Footer } from "../Footer";

// Prueba MEDIA: Validar contenido legal y enlaces del pie de pagina.
describe("Componente Footer (Prueba Media)", () => {
  // Test 1: Confirmar region semantica de footer para accesibilidad.
  it("renderiza el footer con rol contentinfo", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  // Test 2: Verificar bloque legal y año dinamico actual.
  it("muestra texto legal con el año actual", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Tienda Online`, "i")),
    ).toBeInTheDocument();
  });

  // Test 3: Validar enlaces del footer y su navegacion base.
  it("incluye enlaces de redes y legales con href esperado", () => {
    render(<Footer />);

    const footerNav = screen.getByRole("navigation", {
      name: /Enlaces del pie de página/i,
    });
    expect(footerNav).toBeInTheDocument();

    const expectedLinks = ["Instagram", "LinkedIn", "Políticas", "Términos"];
    expectedLinks.forEach((linkText) => {
      const link = screen.getByRole("link", { name: linkText });
      expect(link).toHaveAttribute("href", "#");
    });
  });
});
