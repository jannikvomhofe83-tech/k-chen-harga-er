"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {}, sectionRef);

    document.fonts.ready.then(() => {
      if (disposed || !headlineRef.current) return;

      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-about-folio]", { y: 14, autoAlpha: 0, duration: 0.7 }, 0.1);

        split = SplitText.create(headlineRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            tl.from(
              self.lines,
              {
                yPercent: 112,
                duration: 1.15,
                stagger: 0.09,
                ease: "power4.out",
              },
              0.2
            ),
        });

        tl.from(
          "[data-about-copy]",
          { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.12 },
          0.65
        );

        // Studio-Bild: Wipe von oben, danach ruhige Parallaxe
        if (figureRef.current) {
          tl.fromTo(
            figureRef.current,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut" },
            0.45
          );
          gsap.to(figureRef.current.querySelector("img"), {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    });

    return () => {
      disposed = true;
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-carbon-900 text-linen-100"
    >
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
        {/* Folio-Zeile wie in einem Druckwerk */}
        <div
          data-about-folio
          className="flex items-baseline justify-between border-b rule-linen pb-5"
        >
          <p className="folio text-linen-100">
            Über uns
            <span className="hidden sm:inline"> · Küchen Hargaßer GbR</span>
          </p>
          <p className="folio hidden text-linen-100/70 md:block">
            Taufkirchen (Vils) · Landkreis Erding
          </p>
        </div>

        <div className="grid gap-14 pb-20 pt-14 md:pb-28 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <h1
              ref={headlineRef}
              className="font-display max-w-2xl text-[clamp(2.7rem,6vw,5.4rem)] font-medium leading-[1.04]"
            >
              Eine Familie.
              <br />
              Eine Werkstatt.
              <br />
              Ein <em className="font-normal">Versprechen</em>
              <span className="text-brand-400">.</span>
            </h1>

            <p
              data-about-copy
              className="mt-8 max-w-xl text-base leading-relaxed text-linen-100/70 md:text-lg"
            >
              Küchen Hargaßer ist ein familiengeführtes Küchenstudio in
              Taufkirchen an der Vils. Robert Hargaßer plant hier gemeinsam
              mit seinem Team Küchen für München und das Umland. Jede Planung
              beginnt bei uns mit Zuhören und endet mit einer Küche, die zum
              Leben ihrer Besitzer passt.
            </p>

            <ul
              data-about-copy
              className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] text-linen-100/80"
            >
              <li>★ {site.rating} bei Google</li>
              <li aria-hidden className="text-brand-400">·</li>
              <li>Eigene Werkstatt</li>
              <li aria-hidden className="text-brand-400">·</li>
              <li>5 Jahre Garantie</li>
              <li aria-hidden className="text-brand-400">·</li>
              <li>Eigene Monteure</li>
            </ul>
          </div>

          {/* Studio-Aufnahme rechts: groß gesetzt, ragt in die Chronik hinein */}
          <div className="relative z-10 lg:col-span-6">
            <div
              ref={figureRef}
              className="relative aspect-[4/5] w-full overflow-hidden bg-carbon-800 lg:-mb-44"
              style={{ clipPath: "inset(0 0 0% 0)" }}
            >
              <Image
                src="/generated/ueberuns-studio.png"
                alt="Beratungstisch mit Materialmustern im Küchenstudio Hargaßer"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="scale-[1.12] object-cover"
              />
              <p className="folio absolute bottom-3 left-3 bg-linen-50/90 px-3 py-2 text-carbon-700">
                <span className="text-brand-700">Abb. 01</span> — Im Studio am
                Brunnholzring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
