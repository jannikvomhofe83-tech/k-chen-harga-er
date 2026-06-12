"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { kitchens } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/** Asymmetrisches Editorial-Raster: breit / Querformat / Hochformat im Wechsel. */
function frameFor(i: number) {
  switch (i % 3) {
    case 0:
      return { wrap: "md:col-span-12", ratio: "aspect-[21/10]" };
    case 1:
      return { wrap: "md:col-span-7", ratio: "aspect-[4/3]" };
    default:
      return { wrap: "md:col-span-5 md:translate-y-14", ratio: "aspect-[3/4]" };
  }
}

export default function EditorialGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-gallery-head]", {
        y: 26,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-gallery-figure]").forEach((fig) => {
        const frame = fig.querySelector("[data-gallery-frame]");
        const img = fig.querySelector("[data-gallery-img]");
        const caption = fig.querySelector("figcaption");

        if (frame) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(6% 4% 6% 4%)", autoAlpha: 0.001 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              autoAlpha: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: { trigger: fig, start: "top 85%" },
            }
          );
        }
        if (img) {
          // Sanfte Parallaxe über die gesamte Sichtbarkeit
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
        if (caption) {
          gsap.from(caption, {
            y: 14,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: fig, start: "top 78%" },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-linen-100">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div data-gallery-head className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="folio text-carbon-500">
              <span className="text-brand-700">Nr. 03</span> — Einblicke
            </p>
            <h2 className="font-display mt-6 max-w-2xl text-[clamp(2.1rem,4.5vw,3.6rem)] font-medium leading-[1.06] text-carbon-900">
              Küchen, die von ihren{" "}
              <em className="font-normal">Bewohnern</em> erzählen
              <span className="text-brand-700">.</span>
            </h2>
          </div>
          <p className="folio mb-2 text-carbon-400">
            Abb. 01 — {String(kitchens.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-12 md:gap-y-20">
          {kitchens.map((k, i) => {
            const f = frameFor(i);
            return (
              <figure key={k.src} data-gallery-figure className={f.wrap}>
                <div
                  data-gallery-frame
                  className={`relative ${f.ratio} w-full overflow-hidden bg-linen-300`}
                >
                  <div data-gallery-img className="absolute -inset-y-[8%] inset-x-0">
                    <Image
                      src={k.src}
                      alt={k.alt}
                      fill
                      sizes={
                        i % 3 === 0
                          ? "(min-width: 1280px) 1216px, 100vw"
                          : "(min-width: 768px) 50vw, 100vw"
                      }
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t rule-carbon pt-3 text-xs">
                  <span>
                    <span className="folio text-brand-700">
                      Abb. {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-carbon-600"> — {k.caption}</span>
                  </span>
                  <span className="text-right text-carbon-400">{k.material}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
