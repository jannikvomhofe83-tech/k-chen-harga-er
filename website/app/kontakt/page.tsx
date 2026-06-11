import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PlanningAssistant from "@/components/PlanningAssistant";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt & Planungsanfrage",
  description:
    "Beratungstermin bei Küchen Hargaßer in Taufkirchen (Vils) vereinbaren: geführte Planungsanfrage, Adresse, Telefon und Anfahrt. Für München & Umgebung.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="bg-ink pt-32 md:pt-44">
        <div className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <Reveal>
            <p className="label text-brass">Kontakt</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl">
              In fünf Schritten zu Ihrem Beratungstermin.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70">
              Beantworten Sie uns vier kurze Fragen — so können wir uns auf
              das Gespräch vorbereiten und Sie bekommen schneller eine
              fundierte Antwort.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-[1.6fr_1fr] md:gap-16 md:px-8 md:pb-36">
          <Reveal>
            <PlanningAssistant />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-10">
              <div>
                <p className="label text-stone">Studio</p>
                <address className="mt-4 space-y-1 font-serif text-xl not-italic leading-relaxed">
                  <p>Küchen Hargaßer</p>
                  <p>Brunnholzring 9</p>
                  <p>84416 Taufkirchen (Vils)</p>
                </address>
              </div>

              <div>
                <p className="label text-stone">Telefon</p>
                <a
                  href={site.phoneHref}
                  className="mt-4 inline-block font-serif text-xl text-paper hover:text-brass transition-colors"
                >
                  {site.phone}
                </a>
              </div>

              <div>
                <p className="label text-stone">Öffnungszeiten</p>
                <dl className="mt-4 space-y-1.5 text-sm text-paper/70">
                  <div className="flex justify-between gap-6">
                    <dt>Mo – Fr</dt>
                    <dd>nach Vereinbarung</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Sa</dt>
                    <dd>nach Vereinbarung</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-paper/40">
                  Termine auch abends möglich — rufen Sie uns einfach an.
                </p>
              </div>

              <div>
                <p className="label text-stone">Anfahrt</p>
                <div className="mt-4 aspect-[4/3] w-full overflow-hidden border hairline-dark">
                  <iframe
                    title="Karte: Küchen Hargaßer, Brunnholzring 9, 84416 Taufkirchen (Vils)"
                    src="https://www.google.com/maps?q=Brunnholzring%209%2C%2084416%20Taufkirchen%20(Vils)&output=embed"
                    className="h-full w-full grayscale-[40%] contrast-[0.95]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
