import { HeroSection } from "@/components/home/HeroSection";
import { ManufacturersBar } from "@/components/home/ManufacturersBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUs } from "@/components/home/WhyUs";
import { TeaserGrid } from "@/components/home/TeaserGrid";
import { CTABanner } from "@/components/home/CTABanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getManufacturers, getCategories } from "@/lib/strapi";

export default async function Home() {
  const [manufacturersRes, categoriesRes] = await Promise.all([
    getManufacturers().catch(() => null),
    getCategories().catch(() => null),
  ]);

  return (
    <>
      <HeroSection />
      <ScrollReveal>
        <ManufacturersBar manufacturers={manufacturersRes?.data} />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedProducts categories={categoriesRes?.data} />
      </ScrollReveal>
      <ScrollReveal>
        <WhyUs />
      </ScrollReveal>
      <ScrollReveal>
        <TeaserGrid />
      </ScrollReveal>
      <CTABanner />
    </>
  );
}
