import { categories, products } from '../store';

// Prueba MEDIA: Validar datos iniciales críticos (Store Data)
describe('Datos Estáticos - Store (Prueba Media)', () => {
  
  // Test 1: Evaluar que las categorías tienen la estructura correcta de tipos y no están vacías
  it('exporta una lista válida de categorías', () => {
    // Comprobamos que categories exista y sea un array
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);

    // Comprobamos que un elemento tenga las propiedades esperadas
    const sampleCategory = categories[0];
    expect(sampleCategory).toHaveProperty('id');
    expect(sampleCategory).toHaveProperty('name');
    expect(sampleCategory).toHaveProperty('description');
  });

  // Test 2: Evaluar estructura de productos exportados
  it('exporta una lista válida de productos con precios correctos', () => {
    // Comprobamos la exportación de productos
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);

    // Comprobamos propiedades del producto y que el precio sea numérico
    const sampleProduct = products[0];
    expect(sampleProduct).toHaveProperty('id');
    expect(sampleProduct).toHaveProperty('name');
    expect(sampleProduct).toHaveProperty('price');
    expect(typeof sampleProduct.price).toBe('number');
    expect(sampleProduct.price).toBeGreaterThan(0);
    expect(sampleProduct).toHaveProperty('tagline');
  });
});
