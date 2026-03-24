'use client';

import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeedbackCarousel from '@/components/FeedbackCarousel';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 relative z-10">
      <HeroSlider />
      <ProductGrid />
      <WhyChooseUs />
      <FeedbackCarousel />
      <CTASection />
    </main>
  );
}
