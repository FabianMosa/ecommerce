// Pruebas de FeaturedProductsSection: precios formateados, titulos y galeria embebida.
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { FeaturedProductsSection } from "../FeaturedProductsSection";
import { formatPriceCLP } from "../../lib/currency";
import { CartProvider } from "../../context/CartContext";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

function renderWithCartProvider() {
  return render(
    <CartProvider>
      <FeaturedProductsSection products={productsMock} />
    </CartProvider>,
  );
}

// Productos de ejemplo con imagenes remotas permitidas en tests (coincide con next.config images).
const productsMock = [
  {
    id: 10,
    name: "Mouse Inalambrico Pro",
    tagline: "Ligero y preciso para jornadas largas.",
    price: 29990,
    images: [
      {
        url: "https://example.com/mouse-main.jpg",
        alt: "Mouse inalambrico negro sobre escritorio",
      },
      {
        url: "https://example.com/mouse-side.jpg",
        alt: "Perfil lateral del mouse inalambrico",
      },
    ],
  },
  {
    id: 20,
    name: "Teclado Mecanico RGB",
    tagline: "Switches rapidos y perfil compacto.",
    price: 79990,
    images: [],
  },
];

// Prueba ALTA: Validar vitrina principal de productos de conversion.
describe("Componente FeaturedProductsSection (Prueba Alta)", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  // Test 1: Confirmar encabezados y enlace auxiliar de navegacion.
  it("renderiza titulo de seccion y link hacia categorias", () => {
    renderWithCartProvider();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Productos recomendados para ti/i,
      }),
    ).toBeInTheDocument();

    const byCategoryLink = screen.getByRole("link", {
      name: /Ver por categoria/i,
    });
    expect(byCategoryLink).toHaveAttribute("href", "#categorias");
  });

  // Test 2: Verificar tarjetas de producto, precio y texto comercial.
  it("muestra nombre, tagline y precio formateado para cada producto", () => {
    renderWithCartProvider();

    productsMock.forEach((product) => {
      expect(
        screen.getByRole("heading", { level: 3, name: product.name }),
      ).toBeInTheDocument();
      expect(screen.getByText(product.tagline)).toBeInTheDocument();
      expect(screen.getByText(formatPriceCLP(product.price))).toBeInTheDocument();
    });
  });

  // Test 3: Accesibilidad basica en galeria de imagenes y CTA principal.
  it("expone galeria navegable y fallback de imagen cuando faltan URLs", () => {
    renderWithCartProvider();

    // El mismo alt aparece en imagen principal y miniatura activa.
    const repeatedAltImages = screen.getAllByRole("img", {
      name: /Mouse inalambrico negro sobre escritorio/i,
    });
    expect(repeatedAltImages.length).toBeGreaterThanOrEqual(2);

    const thumbnailButton = screen.getByRole("button", {
      name: /Mostrar Perfil lateral del mouse inalambrico/i,
    });
    expect(thumbnailButton).toBeInTheDocument();

    // El segundo producto no trae fotos, por lo que usa fallback accesible.
    expect(
      screen.getByRole("img", {
        name: /Foto referencial no disponible para Teclado Mecanico RGB/i,
      }),
    ).toBeInTheDocument();

    const ctaButtons = screen.getAllByRole("button", {
      name: /Agregar y comprar/i,
    });
    expect(ctaButtons).toHaveLength(productsMock.length);
  });

  it("agrega al carrito y redirige al checkout al comprar", () => {
    renderWithCartProvider();

    screen.getAllByRole("button", { name: /Agregar y comprar/i })[0].click();

    expect(pushMock).toHaveBeenCalledWith("/checkout");
  });
});
