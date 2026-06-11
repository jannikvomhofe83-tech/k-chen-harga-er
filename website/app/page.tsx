import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import GalleryTeaser from "@/components/GalleryTeaser";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <WhySection />
      <GalleryTeaser />
      <Testimonials />
      <CtaSection />
    </>
  );
}
