import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

// Prueba MEDIA: Componente de Hero de la página
describe('Componente HeroSection (Prueba Media)', () => {

  // Test 1: Comprobar el renderizado del texto principal (Call to Action)
  it('renderiza el título principal correctamente', () => {
    render(<HeroSection />);

    // Verificamos que el H1 esté presente con el texto esperado
    const heading = screen.getByRole('heading', { level: 1, name: /Accesorios y perifericos listos para mejorar tu setup/i });
    expect(heading).toBeInTheDocument();
  });

  // Test 2: Verificar enlaces de acción dentro de la sección
  it('contiene botones/enlaces para interactuar', () => {
    render(<HeroSection />);

    // Verificamos los enlaces o botones promocionales principales
    const productsLink = screen.getByRole('link', { name: /Comprar destacados/i });
    const categoriesLink = screen.getByRole('link', { name: /Explorar categorias/i });

    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '#productos');
    
    expect(categoriesLink).toBeInTheDocument();
    expect(categoriesLink).toHaveAttribute('href', '#categorias');
  });

  // Test 3: Comprobar elementos visuales menores o información de confianza
  it('muestra las ventajas de la tienda (shipping, pagos, soporte)', () => {
    render(<HeroSection />);

    // Buscar si los bullet-points de confianza existen
    expect(screen.getByText(/Catalogo curado/i)).toBeInTheDocument();
    expect(screen.getByText(/Pagos seguros/i)).toBeInTheDocument();
    expect(screen.getByText(/Atencion personalizada/i)).toBeInTheDocument();
  });
});
