import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import CtaSection from "@/components/CtaSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Küchen Hargaßer in Taufkirchen (Vils): ein kleines, persönliches Küchenstudio mit eigener Werkstatt, eigener Montage und 5 Jahren Garantie — für München und Umgebung.",
};

const promises = [
  {
    title: "5 Jahre Garantie",
    text: "Auf alle Möbelteile und Elektrogeräte — schriftlich, ohne Sternchen.",
  },
  {
    title: "Eigene Profis",
    text: "Geplant, gefertigt und montiert von Menschen, die Sie beim Namen kennen.",
  },
  {
    title: "Termingerecht",
    text: "Wenn wir einen Liefertermin zusagen, halten wir ihn. So einfach ist das.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <section className="bg-ink pt-32 md:pt-44">
        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <Reveal>
            <p className="label text-brass">Über uns</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl">
              Klein genug für echte Nähe.
              <br />
              Gut genug für jeden Anspruch.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
          <Reveal>
            <ParallaxImage
              src="/kuechen/kueche-creme-schwarz.jpg"
              alt="Cremefarbene Küche mit schwarzen Akzenten und Essbereich"
              className="aspect-[21/9] w-full"
              sizes="(min-width: 1280px) 1216px, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-8 md:py-36">
          <Reveal>
            <p className="label text-brass">Unsere Philosophie</p>
            <h2 className="mt-5 font-serif text-3xl leading-[1.15] md:text-4xl">
              Eine Küche kauft man nicht oft im Leben. Deshalb nehmen wir sie
              persönlich.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="space-y-6 text-[0.95rem] leading-relaxed text-ink/65">
              <p>
                Küchen Hargaßer ist ein kleines Küchenstudio in Taufkirchen
                (Vils) — und das ist Absicht. Bei uns gibt es keine
                Ausstellungshallen mit hundert Kojen und keine wechselnden
                Verkäufer. Es gibt Menschen, die ihr Handwerk verstehen, und
                ein Versprechen: Wir planen Ihre Küche so, als wäre es unsere.
              </p>
              <p>
                Unsere geringen Fixkosten und die Mitgliedschaft im
                Kücheneinkaufsverband KMG Zumbrock machen möglich, was viele
                überrascht: Premium-Marken und Maßarbeit zu einem Preis, der
                fair bleibt. Vom München-Umland bis ins Vilstal begleiten wir
                Projekte jeder Größe — von der einfachen Küchenzeile bis zum
                extravaganten Küchentraum.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-36">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <ParallaxImage
                src="/kuechen/kueche-akazie-grau.jpg"
                alt="Detail einer Küchenzeile mit Akazienholz-Rückwand"
                className="aspect-[4/3] w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
                strength={6}
              />
              <p className="mt-3 text-xs text-ink/45">
                Material, Maß und Licht — daran entscheidet sich Qualität.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ParallaxImage
                src="/kuechen/kueche-grau-wohnkueche.jpg"
                alt="Moderne graue Wohnküche mit Sitzgelegenheit"
                className="aspect-[4/3] w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
                strength={6}
              />
              <p className="mt-3 text-xs text-ink/45">
                Aus der Werkstatt: Sonderanfertigungen, die genau passen.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <Reveal>
            <p className="label text-brass">Unser Versprechen</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] md:text-5xl">
              Drei Dinge, auf die Sie sich verlassen können.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px border hairline-dark bg-paper/10 md:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="bg-ink">
                <div className="flex h-full flex-col p-8 md:p-10">
                  <h3 className="font-serif text-2xl text-brass">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-paper/65">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col gap-2 border-t hairline-dark pt-8 text-sm text-paper/60 md:flex-row md:items-baseline md:justify-between">
              <p>
                {site.address} · Tel.{" "}
                <a href={site.phoneHref} className="text-paper hover:text-brass transition-colors">
                  {site.phone}
                </a>
              </p>
              <p>Einsatzgebiet: {site.region}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
