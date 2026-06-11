"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { kitchens } from "@/lib/site";

export default function KitchenGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {kitchens.map((k, i) => (
        <motion.figure
          key={k.src}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative overflow-hidden ${
            k.wide ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={k.src}
            alt={k.alt}
            fill
            sizes={k.wide ? "(min-width: 1280px) 1216px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          {/* Hover-Reveal: Caption gleitet von unten ein */}
          <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-6 pt-16 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:p-8 md:pt-20">
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="font-serif text-xl text-paper md:text-2xl">
                {k.caption}
              </span>
              <span className="label text-brass-soft">{k.material}</span>
            </figcaption>
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
