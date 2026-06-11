"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    nr: "01",
    title: "Erstgespräch",
    text: "Wir lernen Sie, Ihren Raum und Ihre Wünsche kennen — bei uns im Studio oder bei Ihnen zuhause. Ehrlich, unverbindlich und ohne Verkaufsdruck.",
  },
  {
    nr: "02",
    title: "Grundriss & Entwurf",
    text: "Ihr Grundriss wird präzise aufgenommen und gezeichnet. Wir planen Zonen, Laufwege, Licht und Stauraum — bis der Entwurf sitzt.",
  },
  {
    nr: "03",
    title: "Werkstatt & Sonderanfertigung",
    text: "Was Standardprogramme nicht können, fertigt unsere eigene Werkstatt: Maßmöbel, Nischenlösungen, besondere Details.",
  },
  {
    nr: "04",
    title: "Montage & Übergabe",
    text: "Unsere eigenen Monteure liefern und bauen termingerecht ein. Zum Schluss: Einweisung, Feinjustage — und fünf Jahre Garantie.",
  },
];

export default function ProcessSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
            },
          }
        );
        const line = item.querySelector("[data-line]");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 78%" },
            }
          );
        }
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="space-y-0">
      {steps.map((s) => (
        <div
          key={s.nr}
          data-step
          className="grid gap-6 border-t hairline-dark py-12 md:grid-cols-[120px_1fr_1.2fr] md:items-baseline md:gap-12 md:py-16"
        >
          <span className="font-serif text-5xl text-brass/80 md:text-6xl">
            {s.nr}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl">{s.title}</h3>
          <div>
            <p className="max-w-prose text-sm leading-relaxed text-paper/65 md:text-base">
              {s.text}
            </p>
            <div
              data-line
              className="mt-8 h-px w-full origin-left bg-brass/30"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
