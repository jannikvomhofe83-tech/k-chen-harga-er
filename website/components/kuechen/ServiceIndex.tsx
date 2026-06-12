"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/** KI-generierte Editorial-Bilder je Leistung (Reihenfolge wie in lib/site.ts). */
const previews = [
  "/generated/service-kuechendesign.png",
  "/generated/service-grundriss.png",
  "/generated/service-arbeitsplatten.png",
  "/generated/service-sonderanfertigung.png",
  "/generated/service-renovierung.png",
  "/generated/service-montage.png",
];

export default function ServiceIndex() {
  const sectionRef = useRef<HTMLElement>(null);

  // Eintritts-Animation: Linien zeichnen sich, Zeilen steigen auf.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-index-head]", {
        y: 26,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      const rows = gsap.utils.toArray<HTMLElement>("[data-index-row]");
      rows.forEach((row, i) => {
        const line = row.querySelector("[data-index-line]");
        const inner = row.querySelector("[data-index-inner]");
        const thumb = row.querySelector("[data-index-thumb]");
        const st = { trigger: row, start: "top 88%" };
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.inOut",
              delay: (i % 3) * 0.06,
              scrollTrigger: st,
            }
          );
        }
        if (inner) {
          gsap.from(inner, {
            y: 30,
            autoAlpha: 0,
            duration: 0.95,
            ease: "power3.out",
            delay: 0.1 + (i % 3) * 0.06,
            scrollTrigger: st,
          });
        }
        if (thumb) {
          gsap.fromTo(
            thumb,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1,
              ease: "power3.inOut",
              delay: 0.2 + (i % 3) * 0.06,
              scrollTrigger: st,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-linen-100">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div data-index-head>
          <p className="folio text-carbon-500">
            <span className="text-brand-700">Nr. 01</span> — Leistungen
          </p>
          <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.1rem,4.5vw,3.6rem)] font-medium leading-[1.06] text-carbon-900">
            Alles aus einer Hand — von der Skizze bis zum letzten{" "}
            <em className="font-normal">Handgriff</em>
            <span className="text-brand-700">.</span>
          </h2>
        </div>

        <ol className="relative mt-14 md:mt-20">
          {services.map((s, i) => (
            <li key={s.title} data-index-row className="group relative">
              <div
                data-index-line
                className="h-px w-full origin-left bg-carbon-900/15"
              />
              <div
                data-index-inner
                className="grid grid-cols-1 gap-3 py-7 md:grid-cols-12 md:items-center md:gap-8 md:py-6"
              >
                <span className="folio text-brand-700 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Sichtbares Editorial-Thumbnail */}
                <div
                  data-index-thumb
                  className={`relative hidden aspect-[4/3] overflow-hidden bg-linen-300 md:col-span-2 md:block ${
                    i % 2 === 0 ? "md:rotate-[1.2deg]" : "md:-rotate-[1.2deg]"
                  } transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.04]`}
                >
                  <Image
                    src={previews[i]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 16vw, 0px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="font-display flex items-baseline gap-4 text-2xl font-medium text-carbon-900 transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand-800 md:col-span-4 md:text-[1.9rem] md:leading-tight">
                  {s.title}
                  <span
                    aria-hidden
                    className="inline-block -translate-x-2 text-xl text-brand-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                </h3>
                <p className="max-w-prose text-sm leading-relaxed text-carbon-500 md:col-span-5">
                  {s.text}
                </p>
              </div>
              {i === services.length - 1 && (
                <div
                  data-index-line
                  className="h-px w-full origin-left bg-carbon-900/15"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
