import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Benefits } from "@/components/sections/Benefits";
import { Hero } from "@/components/sections/Hero";
import { ProductFeatures } from "@/components/sections/ProductFeatures";
import { ProductRange } from "@/components/sections/ProductRange";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <ProductFeatures />
        <ProductRange />
      </main>
      <Footer />
    </>
  );
}
