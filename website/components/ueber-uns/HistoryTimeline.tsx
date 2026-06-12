"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Chapter = {
  numeral: string;
  label: string;
  /** Optionales Jahr, sobald der Kunde die echten Daten liefert. */
  year?: string;
  title: string;
  text: string;
  img: string;
  imgAlt: string;
  abb: string;
  caption: string;
  /** Teamfoto wird als gerahmter Print gesetzt. */
  framed?: boolean;
  portrait?: boolean;
};

const chapters: Chapter[] = [
  {
    numeral: "I",
    label: "Kapitel I",
    title: "Der Anfang",
    text: "Alles beginnt mit dem Handwerk. Holz, Maß und Geduld prägen den Blick der Familie Hargaßer auf gute Küchen bis heute.",
    img: "/generated/service-sonderanfertigung.png",
    imgAlt: "Hände hobeln ein Eichenbrett in der Werkstatt",
    abb: "Abb. 02",
    caption: "Handwerk als Fundament",
  },
  {
    numeral: "II",
    label: "Kapitel II",
    title: "Das Studio",
    text: "Am Brunnholzring in Taufkirchen an der Vils entsteht ein Ort für ehrliche Beratung. Kunden treffen hier auf Menschen, die jede Planung persönlich verantworten.",
    img: "/generated/prozess-erstgespraech.png",
    imgAlt: "Beratungstisch mit Kaffee und Materialmustern im Studio",
    abb: "Abb. 03",
    caption: "Beratung am Brunnholzring",
    portrait: true,
  },
  {
    numeral: "III",
    label: "Kapitel III",
    title: "Die eigene Werkstatt",
    text: "Mit der hauseigenen Werkstatt wächst die Freiheit in der Planung. Maßmöbel, Nischenlösungen und besondere Details entstehen seither im eigenen Haus.",
    img: "/generated/prozess-werkstatt.png",
    imgAlt: "Korpus eines Maßmöbels mit Zwingen in der Werkstatt",
    abb: "Abb. 04",
    caption: "Maßarbeit aus eigener Hand",
    portrait: true,
  },
  {
    numeral: "IV",
    label: "Kapitel IV",
    title: "Starke Partner",
    text: "Als Mitglied im Kücheneinkaufsverband KMG Zumbrock beziehen wir Premiummarken zu Konditionen großer Häuser. Unsere Kunden bekommen Markenqualität zum fairen Preis.",
    img: "/kuechen/kueche-anthrazit-messing.jpg",
    imgAlt: "Anthrazitfarbene Küche mit Messingakzenten und Nussbaum",
    abb: "Abb. 05",
    caption: "Premiummarken im Verbund",
  },
  {
    numeral: "V",
    label: "Kapitel V",
    title: "Heute",
    text: "Robert Hargaßer führt das Studio gemeinsam mit seiner Familie. Auf jede Küche geben wir fünf Jahre Garantie und unser Wort.",
    img: "/team-hargasser.png",
    imgAlt: "Familie Hargaßer hinter dem Tresen im Küchenstudio",
    abb: "Abb. 06",
    caption: "Familie Hargaßer im Studio",
    framed: true,
  },
];

export default function HistoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {}, sectionRef);

    document.fonts.ready.then(() => {
      if (disposed || !headlineRef.current) return;

      ctx.add(() => {
        gsap.from("[data-history-head]", {
          y: 18,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        });

        split = SplitText.create(headlineRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.1,
              stagger: 0.09,
              ease: "power4.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
            }),
        });

        // Rote Linie wächst mit dem Scrollfortschritt durch die Chronik
        if (progressRef.current && railRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: railRef.current,
                start: "top 64%",
                end: "bottom 64%",
                scrub: 0.4,
              },
            }
          );
        }

        // Kapitel einzeln inszenieren
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((item) => {
          const st = { trigger: item, start: "top 74%" };
          const node = item.querySelector("[data-node]");
          const numeral = item.querySelector("[data-numeral]");
          const body = item.querySelectorAll("[data-chapter-body]");
          const figure = item.querySelector<HTMLElement>("[data-chapter-figure]");

          if (node) {
            gsap.from(node, {
              scale: 0,
              duration: 0.5,
              ease: "back.out(2.2)",
              scrollTrigger: st,
            });
          }
          if (numeral) {
            gsap.from(numeral, {
              yPercent: 118,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: st,
            });
          }
          if (body.length) {
            gsap.from(body, {
              y: 26,
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: st,
            });
          }
          if (figure) {
            if (figure.dataset.framed === "true") {
              gsap.from(figure, {
                y: 34,
                rotate: 4.5,
                autoAlpha: 0,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: st,
              });
            } else {
              gsap.fromTo(
                figure,
                { clipPath: "inset(0 0 100% 0)" },
                {
                  clipPath: "inset(0 0 0% 0)",
                  duration: 1.15,
                  ease: "power3.inOut",
                  scrollTrigger: st,
                }
              );
              const img = figure.querySelector("img");
              if (img) {
                gsap.fromTo(
                  img,
                  { yPercent: -6 },
                  {
                    yPercent: 6,
                    ease: "none",
                    scrollTrigger: {
                      trigger: figure,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true,
                    },
                  }
                );
              }
            }
          }
        });

        gsap.from("[data-history-end]", {
          autoAlpha: 0,
          y: 16,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-history-end]", start: "top 84%" },
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
    <section ref={sectionRef} className="bg-linen-100 text-carbon-900">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div data-history-head>
          <p className="folio text-carbon-500">
            <span className="text-brand-700">Nr. 01</span> — Unsere Geschichte
          </p>
        </div>
        <h2
          ref={headlineRef}
          className="font-display mt-6 max-w-3xl text-[clamp(2.1rem,4.5vw,3.6rem)] font-medium leading-[1.06]"
        >
          Gewachsen aus <em className="font-normal">Handwerk</em>
          <span className="text-brand-700">.</span>
        </h2>
        <p
          data-history-head
          className="mt-6 max-w-xl text-base leading-relaxed text-carbon-500"
        >
          Fünf Kapitel erzählen, wie aus einem Familiennamen ein Küchenstudio
          wurde. Die Jahreszahlen ergänzen wir gern im persönlichen Gespräch.
        </p>

        {/* Chronik mit Leitlinie */}
        <div ref={railRef} className="relative mt-16 md:mt-24">
          {/* Statische Leitlinie + rote Fortschrittslinie */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[11px] top-0 w-px bg-carbon-900/15 md:left-[143px]"
          />
          <div
            ref={progressRef}
            aria-hidden
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-brand-700 md:left-[143px]"
            style={{ transform: "scaleY(0)" }}
          />

          <ol className="space-y-20 md:space-y-28">
            {chapters.map((c) => (
              <li
                key={c.numeral}
                data-chapter
                className="relative pl-12 md:pl-0"
              >
                <div className="md:grid md:grid-cols-[180px_1fr] md:gap-10">
                  {/* Marke auf der Linie: Raute + römische Ziffer */}
                  <div className="relative">
                    <span
                      data-node
                      aria-hidden
                      className="absolute -left-[42px] top-[14px] block h-[11px] w-[11px] rotate-45 bg-brand-700 md:left-[138px]"
                    />
                    <div className="overflow-hidden md:pr-12 md:text-right">
                      <span
                        data-numeral
                        className="font-display block text-5xl font-medium italic leading-none text-brand-700 md:text-6xl"
                      >
                        {c.numeral}
                      </span>
                    </div>
                    <p
                      data-chapter-body
                      className="folio mt-3 text-carbon-400 md:pr-12 md:text-right"
                    >
                      {c.year ?? c.label}
                    </p>
                  </div>

                  {/* Inhalt: Text und Bild im Wechsel */}
                  <div
                    className={`mt-6 flex flex-col gap-8 md:mt-0 lg:items-start lg:gap-14 ${
                      c.framed
                        ? "lg:flex-row"
                        : chapters.indexOf(c) % 2 === 0
                          ? "lg:flex-row"
                          : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className="max-w-md lg:flex-1">
                      <h3
                        data-chapter-body
                        className="font-display text-[1.75rem] font-medium leading-tight md:text-4xl"
                      >
                        {c.title}
                        <span className="text-brand-700">.</span>
                      </h3>
                      <p
                        data-chapter-body
                        className="mt-5 text-[0.95rem] leading-relaxed text-carbon-500"
                      >
                        {c.text}
                      </p>
                    </div>

                    {c.framed ? (
                      /* Teamfoto als gerahmter Print */
                      <figure
                        data-chapter-figure
                        data-framed="true"
                        className="w-full max-w-md rotate-[1.6deg] bg-linen-50 p-3 pb-12 shadow-[0_24px_60px_rgba(27,24,20,0.18)] ring-1 ring-carbon-900/10 lg:w-[26rem]"
                      >
                        <div className="relative aspect-[3/2] overflow-hidden">
                          <Image
                            src={c.img}
                            alt={c.imgAlt}
                            fill
                            sizes="(min-width: 1024px) 26rem, 100vw"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="folio mt-4 flex justify-between text-carbon-500">
                          <span>
                            <span className="text-brand-700">{c.abb}</span> —{" "}
                            {c.caption}
                          </span>
                        </figcaption>
                      </figure>
                    ) : (
                      <figure
                        data-chapter-figure
                        className={`relative w-full overflow-hidden bg-linen-300 ${
                          c.portrait
                            ? "aspect-[3/4] max-w-xs lg:w-72"
                            : "aspect-[4/3] max-w-sm lg:w-96"
                        }`}
                        style={{ clipPath: "inset(0 0 0% 0)" }}
                      >
                        <Image
                          src={c.img}
                          alt={c.imgAlt}
                          fill
                          sizes="(min-width: 1024px) 24rem, 100vw"
                          className="object-cover"
                        />
                        <figcaption className="folio absolute bottom-3 left-3 bg-linen-50/90 px-3 py-2 text-carbon-700">
                          <span className="text-brand-700">{c.abb}</span> —{" "}
                          {c.caption}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Schlusspunkt der Chronik */}
          <div
            data-history-end
            className="relative mt-20 pl-12 md:mt-28 md:pl-[220px]"
          >
            <span
              aria-hidden
              className="absolute left-[6px] top-[6px] block h-[11px] w-[11px] rotate-45 bg-brand-700 md:left-[138px]"
            />
            <p className="font-display max-w-md text-xl italic leading-relaxed text-carbon-700 md:text-2xl">
              Das nächste Kapitel schreiben wir gern mit Ihnen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
