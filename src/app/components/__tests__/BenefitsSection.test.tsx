// Pruebas de BenefitsSection: titulo y tarjetas de argumentos de confianza.
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { BenefitsSection } from "../BenefitsSection";

// Prueba MEDIA: Validar bloque de confianza previo a la compra.
describe("Componente BenefitsSection (Prueba Media)", () => {
  // Test 1: Confirmar estructura base y titulo principal visible.
  it("renderiza el titulo principal de beneficios", () => {
    render(<BenefitsSection />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /Por que comprar con nosotros/i,
    });
    expect(heading).toBeInTheDocument();
  });

  // Test 2: Verificar contenido clave de valor para el usuario.
  it("muestra los tres beneficios con sus mensajes clave", () => {
    render(<BenefitsSection />);

    expect(
      screen.getByRole("heading", { level: 3, name: /Seleccion inteligente/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Compra con confianza/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Acompañamiento real/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/pasarelas de pago seguras/i),
    ).toBeInTheDocument();
  });

  // Test 3: Accesibilidad basica para navegacion por lectores.
  it("expone una region etiquetada por su encabezado", () => {
    render(<BenefitsSection />);

    const sectionRegion = screen.getByRole("region", {
      name: /Por que comprar con nosotros/i,
    });
    expect(sectionRegion).toBeInTheDocument();
  });
});
