"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, testimonials } from "@/lib/site";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <section className="relative w-full overflow-hidden bg-ink text-paper">
      {/* Hintergrundbild */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/testimonials-bg.jpg')" }} />
      <div className="absolute inset-0 bg-ink/75" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="label text-brand-red [text-shadow:0_1px_4px_rgba(0,0,0,0.9),0_3px_16px_rgba(0,0,0,0.8)]">Stimmen unserer Kunden</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.1] md:text-5xl [text-shadow:0_1px_4px_rgba(0,0,0,0.9),0_3px_16px_rgba(0,0,0,0.7)]">
            ★ {site.rating} bei Google
          </h2>
        </div>

        {/* Karussell */}
        <div className="relative flex items-center gap-4">
          {/* Pfeil links */}
          <button
            onClick={prev}
            className="shrink-0 flex h-12 w-12 items-center justify-center bg-white/90 text-ink text-lg transition-colors hover:bg-brand-red hover:text-white shadow"
            aria-label="Vorherige Rezension"
          >
            ←
          </button>

          <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-ink/10 p-8 md:p-12 shadow-sm"
            >
              {/* Google Badge */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white text-xs font-bold">
                  G
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink">Rezension aus Google</p>
                  <p className="text-xs text-ink/45">{testimonials[active].ago}</p>
                </div>
                <span className="ml-auto text-sm text-brand-red" aria-label="5 von 5 Sternen">
                  ★★★★★
                </span>
              </div>

              <blockquote className="font-serif text-xl leading-relaxed text-ink/85 md:text-2xl">
                „{testimonials[active].text}"
              </blockquote>

              <figcaption className="mt-8 text-sm font-semibold text-ink">
                {testimonials[active].name}
              </figcaption>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-brand-red" : "w-1.5 bg-white/40"
                }`}
                aria-label={`Rezension ${i + 1}`}
              />
            ))}
          </div>
          </div>

          {/* Pfeil rechts */}
          <button
            onClick={next}
            className="shrink-0 flex h-12 w-12 items-center justify-center bg-white/90 text-ink text-lg transition-colors hover:bg-brand-red hover:text-white shadow"
            aria-label="Nächste Rezension"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
