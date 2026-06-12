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
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {}, sectionRef);

    document.fonts.ready.then(() => {
      if (disposed || !headlineRef.current) return;

      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Bildhälfte: weicher Wipe von rechts, Zoom beruhigt sich
        if (figureRef.current) {
          tl.fromTo(
            figureRef.current,
            { clipPath: "inset(0 0 0 18%)", autoAlpha: 0 },
            {
              clipPath: "inset(0 0 0 0%)",
              autoAlpha: 1,
              duration: 1.4,
              ease: "power3.inOut",
            },
            0.1
          );
        }
        if (bgRef.current) {
          tl.from(bgRef.current, { scale: 1.08, duration: 2.2, ease: "power2.out" }, 0);

          // Dezente Parallaxe beim Weiterscrollen
          gsap.to(bgRef.current, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        tl.from("[data-about-folio]", { y: 14, autoAlpha: 0, duration: 0.7 }, 0.15);

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
              0.25
            ),
        });

        tl.from(
          "[data-about-copy]",
          { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.12 },
          0.7
        );
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
      className="relative overflow-hidden bg-carbon-900 text-linen-100"
    >
      {/* Bild füllt die rechte Hälfte randlos — die Fläche, die vorher schwarz war */}
      <div
        ref={figureRef}
        className="absolute inset-y-0 right-0 hidden w-1/2 lg:block"
      >
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/generated/ueberuns-studio.png"
            alt="Beratungstisch mit Materialmustern im Küchenstudio Hargaßer"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="scale-[1.12] object-cover"
          />
        </div>
        {/* Weicher Übergang zur schwarzen Texthälfte + Lesbarkeit oben/unten */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(27,24,20,1) 0%, rgba(27,24,20,0.25) 14%, rgba(27,24,20,0) 28%), " +
              "linear-gradient(to bottom, rgba(27,24,20,0.6) 0%, rgba(27,24,20,0) 26%), " +
              "linear-gradient(to top, rgba(27,24,20,0.5) 0%, rgba(27,24,20,0) 22%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
        {/* Folio-Zeile wie in einem Druckwerk */}
        <div
          data-about-folio
          className="flex items-baseline justify-between border-b border-linen-100/25 pb-5"
        >
          <p className="folio text-linen-100">
            Über uns
            <span className="hidden sm:inline"> · Küchen Hargaßer GbR</span>
          </p>
          <p className="folio hidden text-linen-100/85 md:block">
            Taufkirchen (Vils) · Landkreis Erding
          </p>
        </div>

        {/* Typografie links auf der schwarzen Hälfte */}
        <div className="pb-16 pt-14 md:pb-24 lg:w-1/2 lg:pr-12">
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

          {/* Mobile/Tablet: Bild als eigener Block unter dem Text */}
          <div
            data-about-copy
            className="relative mt-12 aspect-[4/3] w-full overflow-hidden bg-carbon-800 lg:hidden"
          >
            <Image
              src="/generated/ueberuns-studio.png"
              alt="Beratungstisch mit Materialmustern im Küchenstudio Hargaßer"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <p className="folio absolute bottom-3 left-3 bg-linen-50/90 px-3 py-2 text-carbon-700">
              <span className="text-brand-700">Abb. 01</span> — Im Studio am
              Brunnholzring
            </p>
          </div>
        </div>
      </div>

      {/* Bildunterschrift auf der Bildhälfte */}
      <p
        data-about-copy
        className="folio absolute bottom-6 right-5 z-10 hidden text-linen-100/85 md:right-8 lg:block"
      >
        <span className="text-linen-100">Abb. 01</span> — Im Studio am
        Brunnholzring
      </p>
    </section>
  );
}
