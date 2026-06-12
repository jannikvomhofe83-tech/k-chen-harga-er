import type { Metadata } from "next";
import AboutHero from "@/components/ueber-uns/AboutHero";
import HistoryTimeline from "@/components/ueber-uns/HistoryTimeline";
import ValuesSection from "@/components/ueber-uns/ValuesSection";
import CareerSection from "@/components/ueber-uns/CareerSection";
import KuechenCta from "@/components/kuechen/KuechenCta";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Küchen Hargaßer in Taufkirchen (Vils): ein familiengeführtes Küchenstudio mit eigener Werkstatt, eigenen Monteuren und 5 Jahren Garantie für München und das Umland.",
};

export default function UeberUnsPage() {
  return (
    <div className="theme-editorial bg-linen-100 text-carbon-900">
      <AboutHero />
      <HistoryTimeline />
      <ValuesSection />
      <CareerSection />
      <KuechenCta nr="04" />
    </div>
  );
}
