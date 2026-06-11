import Reveal from "@/components/Reveal";
import MagneticLink from "@/components/MagneticLink";
import { site } from "@/lib/site";

export default function CtaSection() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-4xl px-5 py-28 text-center md:px-8 md:py-40">
        <Reveal>
          <p className="label text-brass">Der erste Schritt</p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.1] md:text-6xl">
            Erzählen Sie uns von Ihrer Küche.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-paper/70">
            Ob erste Idee oder fertiger Grundriss: In unserem Studio in
            Taufkirchen (Vils) nehmen wir uns Zeit für Sie — unverbindlich
            und ehrlich.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <MagneticLink
              href="/kontakt"
              className="inline-block bg-brass px-9 py-4 text-sm label text-ink transition-colors duration-300 hover:bg-brass-soft"
            >
              Planungsanfrage starten
            </MagneticLink>
            <a
              href={site.phoneHref}
              className="text-sm text-paper/70 transition-colors hover:text-brass"
            >
              oder direkt anrufen: Tel. {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
