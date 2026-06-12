"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const values = [
  {
    word: "Ehrlichkeit",
    text: "Wir beraten offen, rechnen transparent und sagen Ihnen klar, was eine gute Küche kostet. Unsere Kunden schätzen genau diese Klarheit.",
    img: "/generated/werte-ehrlichkeit.png",
    alt: "Hand zeigt mit Bleistift auf eine Zeile im Küchenangebot",
  },
  {
    word: "Nähe",
    text: "Ein Ansprechpartner begleitet Sie von der ersten Skizze bis zur Übergabe. Sie erreichen bei uns immer den Menschen, der Ihr Projekt wirklich kennt.",
    img: "/generated/werte-naehe.png",
    alt: "Beratung mit Materialmustern am Eichentisch im Studio",
  },
  {
    word: "Handwerk",
    text: "Unsere Werkstatt fertigt Maßmöbel und besondere Details im eigenen Haus. So entsteht Qualität, die man jeden Tag sieht und spürt.",
    img: "/generated/werte-detail.png",
    alt: "Zinkenverbindung aus Eiche an einer Maßschublade",
  },
  {
    word: "Verlässlichkeit",
    text: "Zugesagte Termine halten wir. Auf Möbel und Geräte geben wir fünf Jahre Garantie, eingebaut wird von unseren eigenen Monteuren.",
    img: "/generated/werte-verlaesslichkeit.png",
    alt: "Wasserwaage auf einer frisch montierten Arbeitsplatte aus Eiche",
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {}, sectionRef);

    document.fonts.ready.then(() => {
      if (disposed || !quoteRef.current) return;

      ctx.add(() => {
        gsap.from("[data-values-head]", {
          y: 18,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        });

        split = SplitText.create(quoteRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.1,
              stagger: 0.1,
              ease: "power4.out",
              scrollTrigger: { trigger: quoteRef.current, start: "top 80%" },
            }),
        });

        // Spalten: Bild-Wipes und Inhalte treppenförmig nacheinander
        gsap.utils.toArray<HTMLElement>("[data-value-col]").forEach((col, i) => {
          const st = { trigger: col, start: "top 84%" };
          const fig = col.querySelector("[data-value-figure]");
          const inner = col.querySelectorAll("[data-value-inner]");

          if (fig) {
            gsap.fromTo(
              fig,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.1,
                ease: "power3.inOut",
                delay: (i % 4) * 0.1,
                scrollTrigger: st,
              }
            );
            const img = fig.querySelector("img");
            if (img) {
              gsap.fromTo(
                img,
                { yPercent: -5 },
                {
                  yPercent: 5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: fig,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                }
              );
            }
          }
          if (inner.length) {
            gsap.from(inner, {
              y: 24,
              autoAlpha: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.15 + (i % 4) * 0.1,
              scrollTrigger: st,
            });
          }
        });
      });
    });

    return () => {
      disposed = true;
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-linen-200 text-carbon-900">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div data-values-head>
          <p className="folio text-carbon-500">
            <span className="text-brand-700">Nr. 02</span> — Unsere Werte
          </p>
        </div>

        {/* Leitsatz */}
        <blockquote className="mt-10">
          <p
            ref={quoteRef}
            className="font-display max-w-3xl text-[clamp(1.9rem,4vw,3.3rem)] font-normal italic leading-[1.18]"
          >
            „Wir planen jede Küche so, als wäre es{" "}
            <span className="text-brand-700">unsere</span>.“
          </p>
          <footer data-values-head className="folio mt-7 text-carbon-500">
            Robert Hargaßer · Inhaber
          </footer>
        </blockquote>

        {/* Vier Werte als Bildspalten mit versetztem Rhythmus */}
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {values.map((v, i) => (
            <article
              key={v.word}
              data-value-col
              className={i % 2 === 1 ? "lg:mt-16" : ""}
            >
              <figure
                data-value-figure
                className="relative aspect-[3/4] w-full overflow-hidden bg-linen-300"
                style={{ clipPath: "inset(0 0 0% 0)" }}
              >
                <Image
                  src={v.img}
                  alt={v.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                  className="scale-[1.12] object-cover"
                />
              </figure>
              <p data-value-inner className="folio mt-6 text-brand-700">
                Wert {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                data-value-inner
                className="font-display mt-3 text-3xl font-medium leading-none md:text-[2.1rem]"
              >
                {v.word}
                <span className="text-brand-700">.</span>
              </h3>
              <p
                data-value-inner
                className="mt-4 text-sm leading-relaxed text-carbon-500"
              >
                {v.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
