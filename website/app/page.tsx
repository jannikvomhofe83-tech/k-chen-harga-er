import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PlanningSection from "@/components/PlanningSection";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import GalleryTeaser from "@/components/GalleryTeaser";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PlanningSection />
      <ServicesSection />
      <WhySection />
      <GalleryTeaser />
      <Testimonials />
    </>
  );
}
