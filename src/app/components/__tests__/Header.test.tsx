// Pruebas del Header: navegacion por anclas, menu movil y presencia de marca.
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

// Prueba CRÍTICA: La navegación y accesibilidad del Header
describe('Componente Header (Prueba Crítica)', () => {

  // Test 1: Verifica que el header se renderiza correctamente con los elementos principales
  it('renderiza el logotipo y elementos de navegación principal', () => {
    // Renderizamos el componente virtualmente
    render(<Header />);

    // Buscamos que el nombre de la tienda exista en el documento
    const logoName = screen.getByText('Tienda Online');
    expect(logoName).toBeInTheDocument();

    // Verificamos que los enlaces principales estén presentes
    // Utilizamos AllByRole para links, ya que tenemos versión desktop y mobile en el DOM
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // Verificamos los textos exactos de navegación
    expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Beneficios').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Productos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Categorias').length).toBeGreaterThan(0);
  });

  // Test 2: Verifica la interacción del botón del menú móvil
  it('alterna la visibilidad del menú móvil al hacer clic en el botón de menú', () => {
    render(<Header />);

    // Buscamos el botón que controla el menú móvil utilizando aria-controls
    // y verificamos su estado aria-expanded inicial (cerrado)
    const mobileMenuButton = screen.getByLabelText(/Abrir menú/i);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');

    // Simulamos un clic en el botón para abrir el menú
    fireEvent.click(mobileMenuButton);

    // El estado del botón debe cambiar reflejando que se ha expandido
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
    // El texto accesible para screen readers debe cambiar a "Cerrar menú"
    expect(screen.getByLabelText(/Cerrar menú/i)).toBeInTheDocument();

    // Hacemos scroll de clic para cerrarlo
    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });

  // Test 3: Verifica el carrito
  it('muestra el botón del carrito con 0 elementos inicialmente', () => {
    render(<Header />);
    
    // Verificamos que el botón del carrito exista mediante su rol o texto
    const cartButton = screen.getByText('Carrito');
    expect(cartButton).toBeInTheDocument();

    // Buscamos el badge con el número 0
    // Como hay múltiples elementos con '0' o similares, acotamos la búsqueda
    const cartBadge = screen.getByText('0');
    expect(cartBadge).toBeInTheDocument();
  });
});
