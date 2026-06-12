"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Erstgespräch",
    text: "Wir lernen Sie, Ihren Raum und Ihre Wünsche kennen — bei uns im Studio oder bei Ihnen zuhause. Ehrlich, unverbindlich und ohne Verkaufsdruck.",
    img: "/generated/prozess-erstgespraech.png",
    alt: "Kaffee und Materialproben auf einem Eichentisch im Küchenstudio",
  },
  {
    title: "Grundriss & Entwurf",
    text: "Ihr Grundriss wird präzise aufgenommen und gezeichnet. Wir planen Zonen, Laufwege, Licht und Stauraum — bis der Entwurf sitzt.",
    img: "/generated/prozess-entwurf.png",
    alt: "Küchengrundriss mit Bleistift und Zollstock auf einem Zeichentisch",
  },
  {
    title: "Werkstatt & Sonderanfertigung",
    text: "Was Standardprogramme nicht können, fertigt unsere eigene Werkstatt: Maßmöbel, Nischenlösungen, besondere Details.",
    img: "/generated/prozess-werkstatt.png",
    alt: "Korpus aus Eiche mit Zwingen in der Schreinerwerkstatt",
  },
  {
    title: "Montage & Übergabe",
    text: "Unsere eigenen Monteure liefern und bauen termingerecht ein. Zum Schluss: Einweisung, Feinjustage — und fünf Jahre Garantie.",
    img: "/generated/prozess-montage.png",
    alt: "Monteur justiert das Scharnier einer salbeigrünen Küchenfront",
  },
];

export default function ProcessRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const panelImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-process-head]", {
        y: 26,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Fortschrittslinie füllt sich über die gesamte Schrittfolge
      if (progressRef.current && stepsRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 65%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }

      // Schritte: Eintritt + aktiver Schritt steuert Ziffer & Bildpanel
      const blocks = gsap.utils.toArray<HTMLElement>("[data-process-step]");
      blocks.forEach((block, i) => {
        gsap.from(block.children, {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 80%" },
        });

        ScrollTrigger.create({
          trigger: block,
          start: "top 58%",
          end: "bottom 58%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      // Bildpanel: Startzustand — nur das erste Bild sichtbar
      panelImgRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { clipPath: i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ziffernwechsel + Bild-Wipe im Sticky-Panel
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (numberRef.current) {
      gsap.fromTo(
        numberRef.current,
        { yPercent: 28, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }
      );
    }

    const current = panelImgRefs.current[active];
    if (current) {
      gsap.set(current, { zIndex: 2 });
      gsap.fromTo(
        current,
        { clipPath: "inset(100% 0 0 0)", scale: 1.06 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => {
            panelImgRefs.current.forEach((el, i) => {
              if (el && i !== active) gsap.set(el, { zIndex: 1 });
            });
          },
        }
      );
    }
  }, [active]);

  return (
    <section ref={sectionRef} className="border-y rule-carbon bg-linen-200">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Sticky-Leiste mit Ziffer, Fortschritt und Bildpanel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div data-process-head>
                <p className="folio text-carbon-500">
                  <span className="text-brand-700">Nr. 02</span> — Der Weg zu
                  Ihrer Küche
                </p>
                <h2 className="font-display mt-6 text-[clamp(2.1rem,4vw,3.2rem)] font-medium leading-[1.08] text-carbon-900">
                  Ein Prozess, der <em className="font-normal">Vertrauen</em>{" "}
                  verdient<span className="text-brand-700">.</span>
                </h2>
              </div>

              <div className="mt-10 hidden gap-8 lg:flex">
                {/* Ziffer + Fortschrittslinie */}
                <div className="flex flex-col items-start gap-6">
                  <span className="block overflow-hidden px-[0.1em]">
                    <span
                      ref={numberRef}
                      className="font-display block pb-[0.06em] pr-[0.16em] text-[6.5rem] font-medium italic leading-none text-brand-700"
                    >
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <div className="relative ml-3 h-40 w-px flex-1 bg-carbon-900/15">
                    <div
                      ref={progressRef}
                      className="absolute inset-0 origin-top bg-brand-700"
                    />
                  </div>
                  <span className="folio ml-1 text-carbon-400">
                    {String(steps.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Bildpanel: wechselt per Wipe mit dem aktiven Schritt */}
                <figure className="flex-1">
                  <div className="relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden bg-linen-300">
                    {steps.map((s, i) => (
                      <div
                        key={s.img}
                        ref={(el) => {
                          panelImgRefs.current[i] = el;
                        }}
                        className="absolute inset-0 will-change-[clip-path]"
                      >
                        <Image
                          src={s.img}
                          alt={s.alt}
                          fill
                          sizes="320px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-3 flex max-w-[20rem] items-baseline justify-between border-t rule-carbon pt-3 text-xs">
                    <span>
                      <span className="folio text-brand-700">
                        Schritt {String(active + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="text-carbon-500">{steps[active].title}</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          {/* Schritte */}
          <div ref={stepsRef} className="lg:col-span-7">
            {steps.map((s, i) => (
              <article
                key={s.title}
                data-process-step
                className={`grid gap-5 py-12 md:grid-cols-12 md:gap-8 md:py-16 ${
                  i > 0 ? "border-t rule-carbon" : "lg:pt-4"
                }`}
              >
                {/* Mobile/Tablet: Bild inline, Desktop: im Sticky-Panel */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-linen-300 md:col-span-12 lg:hidden">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="folio text-brand-700 md:col-span-3">
                  Schritt {String(i + 1).padStart(2, "0")}
                </p>
                <div className="md:col-span-9">
                  <h3
                    className={`font-display text-2xl font-medium transition-colors duration-500 md:text-3xl ${
                      active === i ? "text-brand-800" : "text-carbon-900"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-carbon-500">
                    {s.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
