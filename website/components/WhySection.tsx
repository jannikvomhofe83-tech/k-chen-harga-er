import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function WhySection() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:items-center md:gap-20 md:px-8 md:py-36">
        <div>
          <Reveal>
            <p className="label text-brass">Warum Hargaßer</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] md:text-5xl">
              Ein kleines Studio.
              <br />
              Ein großes Versprechen.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-paper/70">
              <p>
                Bei uns sitzen Sie nicht einem Verkäufer gegenüber, sondern dem
                Menschen, der Ihre Küche später wirklich verantwortet. Wir
                hören zu, zeichnen, rechnen ehrlich — und planen so lange,
                bis es passt.
              </p>
              <p>
                Als Mitglied im Kücheneinkaufsverband KMG Zumbrock kaufen wir
                Premium-Marken zu Konditionen ein, die sonst nur große Häuser
                bekommen. Unsere Fixkosten sind klein, unser Anspruch nicht:
                Das ist der Grund, warum Qualität bei uns fair bezahlbar ist.
              </p>
              <p>
                Eingebaut wird nicht von wechselnden Kolonnen, sondern von
                unseren eigenen Monteuren — termingerecht, sauber und mit
                fünf Jahren Garantie auf alle Möbelteile und Elektrogeräte.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/kuechen/kueche-vitrine-detail.jpg"
              alt="Beleuchtete Glasvitrine — handwerkliches Detail aus einer Hargaßer-Küche"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-xs text-paper/45">
            Details, die man jeden Tag sieht — und spürt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
