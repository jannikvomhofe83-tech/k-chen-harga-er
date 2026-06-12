"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const quote = testimonials[2]; // Claudia Schmidt — Preis-Leistung & Sorgfalt

export default function QualitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-quality-block]").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-y rule-carbon bg-linen-200">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div data-quality-block className="lg:col-span-6">
            <p className="folio text-carbon-500">
              <span className="text-brand-700">Nr. 04</span> — Qualität &amp;
              Marken
            </p>
            <h2 className="font-display mt-6 max-w-xl text-[clamp(2.1rem,4vw,3.2rem)] font-medium leading-[1.08] text-carbon-900">
              Premium-Marken zum{" "}
              <em className="font-normal">Verbandspreis</em> — mit fünf Jahren
              Garantie<span className="text-brand-700">.</span>
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-[0.95rem] leading-relaxed text-carbon-500">
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

            <figure className="mt-12 max-w-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-linen-300">
                <div ref={imgRef} className="absolute -inset-y-[8%] inset-x-0">
                  <Image
                    src="/kuechen/kueche-wildeiche-beton.jpg"
                    alt="Küche mit Wildeiche-Fronten und Arbeitsplatte im Zementlook"
                    fill
                    sizes="(min-width: 1024px) 28rem, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between border-t rule-carbon pt-3 text-xs">
                <span>
                  <span className="folio text-brand-700">Abb. 13</span>
                  <span className="text-carbon-600"> — Wildeiche &amp; Zement</span>
                </span>
                <span className="text-carbon-400">Wildeiche, Zementoptik</span>
              </figcaption>
            </figure>
          </div>

          {/* Pull-Quote */}
          <div
            data-quality-block
            className="flex flex-col justify-center lg:col-span-5 lg:col-start-8"
          >
            <span aria-hidden className="h-px w-16 bg-brand-700" />
            <blockquote className="font-display mt-8 text-[1.55rem] font-normal italic leading-snug text-carbon-800 md:text-[1.9rem]">
              „{quote.text}“
            </blockquote>
            <p className="folio mt-8 text-carbon-500">
              {quote.name} ·{" "}
              <span className="text-brand-700" aria-label="5 von 5 Sternen">
                ★★★★★
              </span>{" "}
              bei Google
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
