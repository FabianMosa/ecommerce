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
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main
        id="inicio"
        className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16"
      >
        <HeroSection />
        <CategoriesSection categories={categories} />
        <FeaturedProductsSection products={products} />
        <BenefitsSection />
      </main>

      <Footer />
    </div>
  );
}
