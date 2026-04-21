// Pruebas de CategoriesSection: listado con datos simulados y enlaces a productos.
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { CategoriesSection } from "../CategoriesSection";

// Categorias minimas para validar maquetacion sin depender de `store.ts`.
const categoriesMock = [
  {
    id: 1,
    name: "Teclados",
    description: "Mecanicos y de membrana para productividad y gaming.",
  },
  {
    id: 2,
    name: "Mouse",
    description: "Opciones ergonomicas y de alta precision.",
  },
];

// Prueba MEDIA: Validar bloque de exploracion por categoria.
describe("Componente CategoriesSection (Prueba Media)", () => {
  // Test 1: Verificar textos de orientacion y CTA de seccion.
  it("renderiza titulo y texto de apoyo de la seccion", () => {
    render(<CategoriesSection categories={categoriesMock} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /Compra por categoria/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Encuentra rapido lo que necesitas/i),
    ).toBeInTheDocument();
  });

  // Test 2: Comprobar que cada categoria tenga su enlace funcional.
  it("renderiza cada categoria con enlace hacia productos", () => {
    render(<CategoriesSection categories={categoriesMock} />);

    categoriesMock.forEach((category) => {
      expect(
        screen.getByRole("heading", { level: 3, name: category.name }),
      ).toBeInTheDocument();
      expect(screen.getByText(category.description)).toBeInTheDocument();

      const categoryLink = screen.getByRole("link", {
        name: `Ver productos de ${category.name}`,
      });
      expect(categoryLink).toHaveAttribute("href", "#productos");
    });
  });

  // Test 3: Accesibilidad basica de enlaces para navegacion por teclado.
  it("mantiene un enlace accionable por cada categoria", () => {
    render(<CategoriesSection categories={categoriesMock} />);

    const links = screen.getAllByRole("link", { name: /Ver productos de/i });
    expect(links).toHaveLength(categoriesMock.length);
  });
});
