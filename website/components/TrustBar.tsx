"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

const items = [
  { value: `★ ${site.rating}`, label: `${site.reviews} Google-Rezensionen` },
  { value: "KMG", label: "Einkaufsverband Zumbrock" },
  { value: "5 Jahre", label: "Garantie auf Möbel & Geräte" },
  { value: "Werkstatt", label: "Eigene Sonderanfertigung" },
  { value: "Termin", label: "Lieferung & Einbau pünktlich" },
];

export default function TrustBar() {
  return (
    <section className="border-y hairline-dark bg-ink-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-5">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col items-center gap-1.5 px-4 py-8 text-center md:py-10 ${
              i === 4 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <span className="font-serif text-xl text-brass md:text-2xl">
              {item.value}
            </span>
            <span className="text-xs text-paper/55">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
