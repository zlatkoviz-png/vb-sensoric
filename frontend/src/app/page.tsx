import { HeroSection } from "@/components/home/HeroSection";
import { ManufacturersBar } from "@/components/home/ManufacturersBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUs } from "@/components/home/WhyUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ManufacturersBar />
      <FeaturedProducts />
      <WhyUs />
    </>
  );
}
