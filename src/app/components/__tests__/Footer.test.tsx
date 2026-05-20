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

  // Test 3: Validar enlaces de redes sociales en el footer.
  it("incluye enlaces de redes sociales con su aria-label", () => {
    render(<Footer />);

    // El Footer renderiza una lista con aria-label "Redes sociales y ubicación".
    const socialList = screen.getByRole("list", {
      name: /Redes sociales y ubicación/i,
    });
    expect(socialList).toBeInTheDocument();

    const expectedSocialLabels = [
      "Facebook",
      "Instagram",
      "WhatsApp",
      "Google Maps — cómo llegar",
    ];
    expectedSocialLabels.forEach((linkLabel) => {
      // Usamos `getByLabelText` para no acoplarnos al `role` accesible (un `<a>` sin `href` no
      // expone `role="link"`); el contrato real del Footer es exponer el `aria-label` por red.
      const link = screen.getByLabelText(linkLabel);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href");
    });
  });

  // Test 4: Validar enlace del autor con href hacia LinkedIn.
  it("expone el enlace del autor con destino a LinkedIn", () => {
    render(<Footer />);

    const authorLink = screen.getByRole("link", { name: /Bernardo Morales/i });
    expect(authorLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/bernardo-morales-848517310/",
    );
  });
});
