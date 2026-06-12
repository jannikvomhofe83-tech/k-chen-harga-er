import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { kitchens } from "@/lib/site";

const picks = [
  kitchens[1], // Schwarz im Loft
  kitchens[4], // Weiß & Eiche
  kitchens[6], // Grün & Eiche
];

export default function GalleryTeaser() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-36">
        <Reveal>
          <p className="label text-brand-red">Einblicke</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] md:text-5xl">
            Jede Küche erzählt von den Menschen, die in ihr leben.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-6 md:mt-20">
          <Reveal>
            <ParallaxImage
              src={picks[0].src}
              alt={picks[0].alt}
              className="aspect-[16/9] w-full"
              sizes="(min-width: 1280px) 1216px, 100vw"
            />
            <div className="mt-3 flex items-baseline justify-between text-xs text-ink/45">
              <span>{picks[0].caption}</span>
              <span>{picks[0].material}</span>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {picks.slice(1).map((k, i) => (
              <Reveal key={k.src} delay={i * 0.08}>
                <ParallaxImage
                  src={k.src}
                  alt={k.alt}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  strength={6}
                />
                <div className="mt-3 flex items-baseline justify-between text-xs text-ink/45">
                  <span>{k.caption}</span>
                  <span>{k.material}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <Link
              href="/kuechen"
              className="label inline-flex items-center gap-3 text-ink transition-colors hover:text-brand-red"
            >
              Alle Küchen entdecken
              <span aria-hidden className="text-brand-red">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
