// Pagina principal: compone la landing como una sola ruta (`/`) con datos locales de vitrina.
import {
  BenefitsSection,
  CategoriesSection,
  FeaturedProductsSection,
  Footer,
  Header,
  HeroSection,
} from "./components";
import { categories, products } from "./data/store";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main
        id="inicio"
        className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16"
      >
        {/* Orden de secciones para guiar: propuesta de valor -> confianza -> compra -> exploracion. */}
        <HeroSection />
        <BenefitsSection />
        <FeaturedProductsSection products={products} />
        <CategoriesSection categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
