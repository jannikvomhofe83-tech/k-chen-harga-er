import type { Metadata } from "next";
import KuechenHero from "@/components/kuechen/KuechenHero";
import ServiceIndex from "@/components/kuechen/ServiceIndex";
import ProcessRail from "@/components/kuechen/ProcessRail";
import EditorialGallery from "@/components/kuechen/EditorialGallery";
import QualitySection from "@/components/kuechen/QualitySection";
import KuechenCta from "@/components/kuechen/KuechenCta";

export const metadata: Metadata = {
  title: "Küchen & Leistungen",
  description:
    "Küchenwelten von Küchen Hargaßer: vom Entwurf über Grundriss und Werkstatt-Sonderanfertigung bis zur Montage durch eigene Profis. Küchenstudio für München & Taufkirchen (Vils).",
};

export default function KuechenPage() {
  return (
    <div className="theme-editorial bg-linen-100 text-carbon-900">
      <KuechenHero />
      <ServiceIndex />
      <ProcessRail />
      <EditorialGallery />
      <QualitySection />
      <KuechenCta />
    </div>
  );
}
