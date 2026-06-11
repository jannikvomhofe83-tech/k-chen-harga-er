import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import KitchenGrid from "@/components/KitchenGrid";
import ProcessSequence from "@/components/ProcessSequence";
import CtaSection from "@/components/CtaSection";
import ParallaxImage from "@/components/ParallaxImage";

export const metadata: Metadata = {
  title: "Küchen & Leistungen",
  description:
    "Küchenwelten von Küchen Hargaßer: vom Entwurf über Grundriss und Werkstatt-Sonderanfertigung bis zur Montage durch eigene Profis. Küchenstudio für München & Taufkirchen (Vils).",
};

export default function KuechenPage() {
  return (
    <>
      <section className="bg-ink pt-32 md:pt-44">
        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <Reveal>
            <p className="label text-brass">Küchen & Leistungen</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl">
              Vom ersten Strich bis zum ersten Abendessen.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70">
              Jedes Projekt beginnt mit einem Gespräch und endet mit einer
              Küche, die genau zu Ihnen passt — ob klare Küchenzeile für die
              Mietwohnung oder extravaganter Küchentraum im Eigenheim.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-36">
          <KitchenGrid />
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <Reveal>
            <p className="label text-brass">Der Weg zu Ihrer Küche</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] md:text-5xl">
              Ein Prozess, der Vertrauen verdient.
            </h2>
          </Reveal>
          <div className="mt-16 md:mt-20">
            <ProcessSequence />
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:items-center md:gap-20 md:px-8 md:py-36">
          <Reveal>
            <ParallaxImage
              src="/kuechen/kueche-wildeiche-beton.jpg"
              alt="Küche mit Wildeiche-Fronten und Arbeitsplatte im Zementlook"
              className="aspect-[4/3] w-full"
              sizes="(min-width: 768px) 50vw, 100vw"
              strength={6}
            />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="label text-brass">Qualität & Marken</p>
            <h2 className="mt-5 font-serif text-3xl leading-[1.15] md:text-4xl">
              Premium-Marken zum Verbandspreis — mit fünf Jahren Garantie.
            </h2>
            <div className="mt-7 space-y-5 text-[0.95rem] leading-relaxed text-ink/65">
              <p>
                Als Mitglied im Kücheneinkaufsverband KMG Zumbrock beziehen wir
                Möbel und Geräte führender Hersteller zu Konditionen, die wir
                direkt an Sie weitergeben. So bekommen Sie Markenqualität —
                ohne den Aufschlag großer Häuser.
              </p>
              <p>
                Auf alle Möbelteile und Elektrogeräte geben wir fünf Jahre
                Garantie. Und weil wir selbst montieren, gibt es im Fall der
                Fälle genau einen Ansprechpartner: uns.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
