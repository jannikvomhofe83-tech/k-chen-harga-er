"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function KuechenCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%",
              },
            }),
        });

        gsap.from("[data-cta-item]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
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
    <section
      ref={sectionRef}
      className="border-t-2 border-brand-700 bg-carbon-900 text-linen-100"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p data-cta-item className="folio text-linen-100/50">
              <span className="text-brand-300">Nr. 05</span> — Der erste
              Schritt
            </p>
            <h2
              ref={headlineRef}
              className="font-display mt-7 max-w-2xl text-[clamp(2.5rem,5.5vw,4.6rem)] font-medium leading-[1.04]"
            >
              Erzählen Sie uns von{" "}
              <em className="font-normal">Ihrer</em> Küche
              <span className="text-brand-400">.</span>
            </h2>
            <p
              data-cta-item
              className="mt-7 max-w-xl text-base leading-relaxed text-linen-100/65"
            >
              Ob erste Idee oder fertiger Grundriss: In unserem Studio in
              Taufkirchen (Vils) nehmen wir uns Zeit für Sie — unverbindlich
              und ehrlich.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div data-cta-item className="flex flex-col items-start gap-6">
              <Link
                href="/kontakt"
                className="folio inline-block bg-brand-700 px-9 py-4 text-linen-50 transition-colors duration-300 hover:bg-brand-600"
              >
                Planungsanfrage starten
              </Link>
              <a
                href={site.phoneHref}
                className="text-sm text-linen-100/60 transition-colors hover:text-linen-50"
              >
                oder direkt anrufen: Tel. {site.phone}
              </a>
              <p className="border-t rule-linen pt-5 text-xs leading-relaxed text-linen-100/40">
                {site.address}
                <br />★ {site.rating} — {site.reviews} Google-Rezensionen
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
