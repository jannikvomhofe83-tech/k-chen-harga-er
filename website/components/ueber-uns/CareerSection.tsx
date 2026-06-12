"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

const roles = [
  {
    title: "Schreiner / Monteur (m/w/d)",
    hint: "Werkstatt und Montage",
    subject: "Bewerbung Schreiner/Monteur",
    description:
      "Sie bauen unsere Küchen bei Kunden in der Region ein und fertigen in der Werkstatt Maßmöbel und besondere Details. Erfahrung in Schreinerei oder Montage bringt Sie schnell ins Team.",
    pointsLabel: "Ihre Aufgaben",
    points: [
      "Montage kompletter Küchen in München und Umgebung",
      "Fertigung von Maßmöbeln in unserer Werkstatt",
      "Aufmaß und Feinjustage beim Kunden",
    ],
  },
  {
    title: "Küchenplaner (m/w/d)",
    hint: "Beratung und Planung",
    subject: "Bewerbung Küchenplanung",
    description:
      "Sie beraten unsere Kunden im Studio, planen Küchen bis ins Detail und begleiten jedes Projekt bis zur Übergabe. Gespür für Menschen zählt bei uns genauso viel wie Planungserfahrung.",
    pointsLabel: "Ihre Aufgaben",
    points: [
      "Beratung im Studio und beim Kunden zuhause",
      "Planung und Kalkulation Ihrer eigenen Projekte",
      "Begleitung bis zur fertig montierten Küche",
    ],
  },
  {
    title: "Initiativbewerbung",
    hint: "Quereinstieg willkommen",
    subject: "Initiativbewerbung",
    description:
      "Sie lieben Handwerk und suchen einen Betrieb mit kurzen Wegen und echter Verantwortung. Erzählen Sie uns, was Sie können, wir melden uns persönlich bei Ihnen.",
    pointsLabel: "Was Sie erwartet",
    points: [
      "Faire Bezahlung und geregelte Zeiten",
      "Ein eingespieltes familiäres Team",
      "Entwicklung nach Ihren Stärken",
    ],
  },
];

export default function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {}, sectionRef);

    document.fonts.ready.then(() => {
      if (disposed || !headlineRef.current) return;

      ctx.add(() => {
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
              scrollTrigger: { trigger: sectionRef.current, start: "top 74%" },
            }),
        });

        gsap.from("[data-career-item]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        const fig = sectionRef.current?.querySelector<HTMLElement>(
          "[data-career-figure]"
        );
        if (fig) {
          gsap.fromTo(
            fig,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.25,
              ease: "power3.inOut",
              scrollTrigger: { trigger: fig, start: "top 80%" },
            }
          );
          const img = fig.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
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

        gsap.utils.toArray<HTMLElement>("[data-role-line]").forEach((line, i) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: "power3.inOut",
              delay: i * 0.07,
              scrollTrigger: { trigger: line, start: "top 88%" },
            }
          );
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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Teambild links, leicht in die Werte-Sektion gezogen */}
          <figure className="order-2 lg:order-1 lg:col-span-5 lg:-mt-44">
            <div
              data-career-figure
              className="relative aspect-[3/4] w-full max-w-md overflow-hidden bg-linen-300"
              style={{ clipPath: "inset(0 0 0% 0)" }}
            >
              <Image
                src="/generated/karriere-team.png"
                alt="Das Team bespricht gemeinsam einen Küchenplan in der Werkstatt"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="scale-[1.12] object-cover"
              />
            </div>
            <figcaption
              data-career-item
              className="folio mt-4 flex max-w-md justify-between text-carbon-500"
            >
              <span>
                <span className="text-brand-700">Abb. 07</span> — Gemeinsam am
                Plan
              </span>
              <span className="hidden sm:inline">Unser Team</span>
            </figcaption>
          </figure>

          {/* Karriere-Inhalt */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <p data-career-item className="folio text-carbon-500">
              <span className="text-brand-700">Nr. 03</span> — Karriere
            </p>
            <h2
              ref={headlineRef}
              className="font-display mt-6 max-w-xl text-[clamp(2.1rem,4.5vw,3.6rem)] font-medium leading-[1.06]"
            >
              Arbeiten, wo Küchen{" "}
              <em className="font-normal">entstehen</em>
              <span className="text-brand-700">.</span>
            </h2>
            <p
              data-career-item
              className="mt-6 max-w-xl text-base leading-relaxed text-carbon-500"
            >
              Unser Team wächst mit seinen Aufgaben. Wir freuen uns über
              Menschen, die Handwerk lieben, Verantwortung schätzen und
              gern in einem Familienbetrieb arbeiten.
            </p>

            {/* Stellenregister: aufklappbar */}
            <div className="mt-12">
              {roles.map((r, i) => {
                const open = openIdx === i;
                return (
                  <div key={r.title}>
                    <div
                      data-role-line
                      className="h-px w-full origin-left bg-carbon-900/15"
                    />
                    <button
                      type="button"
                      data-career-item
                      onClick={() => setOpenIdx(open ? null : i)}
                      aria-expanded={open}
                      className="group grid w-full gap-1 py-6 text-left transition-colors duration-300 hover:bg-linen-200 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-3"
                    >
                      <span className="folio text-brand-700 sm:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-xl font-medium transition-all duration-300 group-hover:translate-x-1.5 sm:col-span-6 md:text-2xl ${
                          open ? "text-brand-800" : ""
                        }`}
                      >
                        {r.title}
                      </span>
                      <span className="text-sm text-carbon-500 sm:col-span-4">
                        {r.hint}
                      </span>
                      <span
                        aria-hidden
                        className={`hidden text-xl leading-none text-brand-700 transition-transform duration-300 sm:col-span-1 sm:block sm:text-right ${
                          open ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-6 pb-8 pt-1 sm:grid-cols-12 sm:px-3">
                            <div className="sm:col-span-7 sm:col-start-2">
                              <p className="text-sm leading-relaxed text-carbon-600">
                                {r.description}
                              </p>
                              <p className="folio mt-6 text-carbon-400">
                                {r.pointsLabel}
                              </p>
                              <ul className="mt-3 space-y-2">
                                {r.points.map((p) => (
                                  <li
                                    key={p}
                                    className="flex gap-3 text-sm leading-relaxed text-carbon-600"
                                  >
                                    <span
                                      aria-hidden
                                      className="mt-[7px] block h-[7px] w-[7px] shrink-0 rotate-45 bg-brand-700"
                                    />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="sm:col-span-3 sm:col-start-10 sm:justify-self-end">
                              <a
                                href={`mailto:${site.email}?subject=${encodeURIComponent(r.subject)}`}
                                className="folio inline-flex items-center gap-2 border border-brand-700 px-5 py-3 text-brand-700 transition-colors duration-300 hover:bg-brand-700 hover:text-linen-50"
                              >
                                Bewerben
                                <span aria-hidden>→</span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {i === roles.length - 1 && (
                      <div
                        data-role-line
                        className="h-px w-full origin-left bg-carbon-900/15"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div
              data-career-item
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Bewerbung")}`}
                className="folio inline-flex items-center gap-3 bg-brand-700 px-9 py-4 text-linen-50 transition-colors duration-300 hover:bg-brand-600"
              >
                Jetzt bewerben
                <span aria-hidden>→</span>
              </a>
              <a
                href={site.phoneHref}
                className="text-sm text-carbon-500 underline decoration-carbon-900/30 underline-offset-4 transition-colors hover:text-carbon-900"
              >
                oder Fragen vorab: Tel. {site.phone}
              </a>
            </div>

            <ul
              data-career-item
              className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] text-carbon-500"
            >
              <li>Familiäres Team</li>
              <li aria-hidden className="text-brand-700">·</li>
              <li>Faire Bezahlung</li>
              <li aria-hidden className="text-brand-700">·</li>
              <li>Kurze Wege und echte Verantwortung</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
