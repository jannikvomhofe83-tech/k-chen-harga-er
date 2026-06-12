import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="theme-editorial bg-linen-100 text-carbon-900">
      <section className="relative flex min-h-[560px] items-center overflow-hidden border-b rule-carbon md:min-h-[680px]">
        <Image
          src="/generated/kontakt-hero.png"
          alt="Empfang und Beratungsplatz im Küchenstudio Hargaßer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Heller Linen-Verlauf: Text links lesbar, Bilddetails rechts sichtbar */}
        <div className="absolute inset-0 bg-gradient-to-r from-linen-100 via-linen-100/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-linen-100 via-transparent to-transparent" />
        {/* Dezenter dunkler Scrim oben, damit die weiße Navbar lesbar bleibt */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/45 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-36 pb-20 md:px-8 md:pt-44 md:pb-28">
          <Reveal>
            <p className="folio text-carbon-500">
              Kontakt
              <span className="hidden sm:inline">
                {" "}
                · Küchenstudio Taufkirchen (Vils)
              </span>
            </p>
            <h1 className="font-display mt-6 max-w-3xl text-[clamp(2.7rem,6vw,5.4rem)] font-medium leading-[1.04] text-carbon-900">
              In fünf Schritten zu Ihrem{" "}
              <em className="font-normal">Beratungstermin</em>
              <span className="text-brand-700">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-carbon-500">
              Beantworten Sie uns vier kurze Fragen — so können wir uns auf
              das Gespräch vorbereiten und Sie bekommen schneller eine
              fundierte Antwort.
            </p>
            <a
              href="#planung"
              className="folio mt-10 inline-block bg-brand-700 px-9 py-4 text-linen-50 transition-colors duration-300 hover:bg-brand-600"
            >
              Planungsanfrage starten
            </a>
          </Reveal>
        </div>
      </section>

      <section id="planung" className="scroll-mt-24 bg-linen-100">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-20 md:grid-cols-[1.6fr_1fr] md:gap-16 md:px-8 md:pb-36 md:pt-28">
          <div className="flex flex-col gap-12">
            <Reveal>
              <PlanningAssistant light />
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="overflow-hidden border rule-carbon bg-linen-50">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/generated/prozess-erstgespraech.png"
                    alt="Erstgespräch im Küchenstudio bei Kaffee und Materialmustern"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between gap-4 px-5 py-4 text-xs">
                  <span>
                    <span className="folio text-brand-700">Abb. 01</span>
                    <span className="text-carbon-600">
                      {" "}
                      — Erstgespräch im Studio
                    </span>
                  </span>
                  <span className="text-carbon-400">
                    Bei Kaffee &amp; Materialmustern
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="space-y-10">
              <div>
                <p className="folio text-carbon-500">Studio</p>
                <address className="mt-4 space-y-1 font-display text-xl not-italic leading-relaxed text-carbon-900">
                  <p>Küchen Hargaßer</p>
                  <p>Brunnholzring 9</p>
                  <p>84416 Taufkirchen (Vils)</p>
                </address>
              </div>

              <div>
                <p className="folio text-carbon-500">Telefon</p>
                <a
                  href={site.phoneHref}
                  className="mt-4 inline-block font-display text-xl text-carbon-900 hover:text-brand-700 transition-colors"
                >
                  {site.phone}
                </a>
              </div>

              <div>
                <p className="folio text-carbon-500">Öffnungszeiten</p>
                <dl className="mt-4 space-y-1.5 text-sm text-carbon-600">
                  <div className="flex justify-between gap-6">
                    <dt>Mo – Fr</dt>
                    <dd>nach Vereinbarung</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Sa</dt>
                    <dd>nach Vereinbarung</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-carbon-500">
                  Termine auch abends möglich — rufen Sie uns einfach an.
                </p>
              </div>

              <div>
                <p className="folio text-carbon-500">Anfahrt</p>
                <div className="mt-4 aspect-[4/3] w-full overflow-hidden border rule-carbon">
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
    </div>
  );
}
