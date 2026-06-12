"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function KuechenHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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

        // Hintergrund: langsame Beruhigung des Zooms
        if (bgRef.current) {
          tl.from(bgRef.current, { scale: 1.08, duration: 2.2, ease: "power2.out" }, 0);
        }

        tl.from("[data-hero-folio]", { y: 14, autoAlpha: 0, duration: 0.7 }, 0.15);

        // Headline: Zeilen steigen aus einer Maske auf
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
          "[data-hero-copy]",
          { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.12 },
          0.7
        );

        // Dezente Parallaxe beim Weiterscrollen
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            yPercent: 10,
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
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Vollflächiges Hintergrundbild */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/generated/hero-kueche.png"
          alt="Helle moderne Küche in Salbeigrün und Eiche mit weichem Morgenlicht"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Wie auf der Startseite: nur eine dezente Verankerung von unten —
          oben, links und rechts bleibt das Bild komplett frei. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(21,19,15,0.58) 0%, rgba(21,19,15,0.34) 32%, rgba(21,19,15,0.14) 55%, rgba(21,19,15,0) 75%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-28 md:px-8 md:pt-36">
        {/* Folio-Zeile wie in einem Druckwerk */}
        <div
          data-hero-folio
          className="flex items-baseline justify-between border-b border-paper/25 pb-5"
        >
          <p className="folio text-paper">
            Küchen &amp; Leistungen
            <span className="hidden sm:inline">
              {" "}
              · Küchenstudio Taufkirchen (Vils)
            </span>
          </p>
        </div>

        {/* Typografie unten links */}
        <div className="flex flex-1 flex-col justify-end pb-16 pt-14 md:pb-24">
          <h1
            ref={headlineRef}
            className="font-display max-w-3xl text-[clamp(2.9rem,7vw,6.1rem)] font-medium leading-[1.02] text-paper"
          >
            Vom ersten Strich bis zum ersten{" "}
            <em className="font-normal">Abendessen</em>
            <span className="text-brand-300">.</span>
          </h1>

          <p
            data-hero-copy
            className="mt-8 max-w-xl text-base leading-relaxed text-paper/90 md:text-lg"
          >
            Jedes Projekt beginnt mit einem Gespräch und endet mit einer
            Küche, die genau zu Ihnen passt — ob klare Küchenzeile für die
            Mietwohnung oder extravaganter Küchentraum im Eigenheim.
          </p>

          <ul
            data-hero-copy
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] text-paper/85"
          >
            <li>★ {site.rating} — {site.reviews} Google-Rezensionen</li>
            <li aria-hidden className="text-brand-300">·</li>
            <li>5 Jahre Garantie</li>
            <li aria-hidden className="text-brand-300">·</li>
            <li>Eigene Werkstatt &amp; Montage</li>
          </ul>

          {/* CTA im Stil der Startseite */}
          <div data-hero-copy className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/kontakt"
              className="label group inline-flex items-center gap-3 border-2 border-brand-red bg-brand-red/20 px-9 py-4 text-sm text-paper backdrop-blur-sm transition-colors duration-300 hover:bg-brand-red hover:text-paper"
            >
              Beratungstermin vereinbaren
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
            <a
              href={site.phoneHref}
              className="text-sm text-paper/85 underline decoration-paper/40 underline-offset-4 transition-colors hover:text-paper"
            >
              oder Tel. {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Region: am rechten Bildrand über dem dunklen Holz platziert,
          weil sie über der hellen Fensterfläche kaum lesbar wäre. */}
      <p
        data-hero-folio
        className="folio absolute right-5 top-28 z-10 hidden text-paper md:right-8 md:top-[8.6rem] md:block"
      >
        {site.region}
      </p>

      {/* Bildunterschrift */}
      <p
        data-hero-copy
        className="folio absolute bottom-6 right-5 z-10 hidden text-paper/75 md:right-8 lg:block"
      >
        <span className="text-paper">Abb. 01</span> — Salbeigrün &amp; Eiche
      </p>
    </section>
  );
}
