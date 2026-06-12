"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    img: "/service-design.jpg",
    title: "Küchenplanung",
    text: "Persönliche Beratung und präzise Planung — wir finden die Küche, die zu Ihrem Raum und Ihrem Alltag passt.",
  },
  {
    img: "/service-marken.jpg",
    title: "Markenküchen",
    text: "Wir führen Premium-Marken zu fairen Preisen — hochwertige Qualität, die hält.",
  },
  {
    img: "/service-arbeitsplatten.jpg",
    title: "Arbeitsplatten nach Maß",
    text: "Stein, Holz oder Keramik — millimetergenau gefertigt und sauber eingepasst.",
  },
  {
    img: "/service-sonderanfertigung.jpg",
    title: "Sonderanfertigungen",
    text: "Unsere eigene Werkstatt fertigt Maßmöbel und Nischenlösungen, die es nicht von der Stange gibt.",
  },
  {
    img: "/service-renovierung.jpg",
    title: "Küchenrenovierung",
    text: "Neue Fronten, Geräte oder Arbeitsplatte — wir bringen Ihre Küche auf den heutigen Stand.",
  },
  {
    img: "/service-montage.jpg",
    title: "Montage durch eigene Profis",
    text: "Kein Subunternehmer: Unser eigenes Team liefert und baut termingerecht ein.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center md:mb-20"
        >
          <p className="label text-brand-red">Leistungen</p>
          <h2 className="mt-4 font-serif text-2xl leading-snug md:text-3xl">
            Ihr Partner für die perfekte Küche — von der Beratung bis zur Montage.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-0 divide-y divide-ink/10 [&>*:nth-child(n+3)]:border-l-0 md:gap-x-20">
          {/* Linke Spalte */}
          <div className="divide-y divide-ink/10">
            {items.slice(0, 3).map((item, i) => (
              <ServiceItem key={item.title} item={item} index={i} />
            ))}
          </div>
          {/* Rechte Spalte */}
          <div className="divide-y divide-ink/10">
            {items.slice(3).map((item, i) => (
              <ServiceItem key={item.title} item={item} index={i + 3} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <Link
            href="/kuechen"
            className="label inline-flex items-center gap-2 text-ink transition-colors hover:text-brand-red"
          >
            Alle Leistungen ansehen <span aria-hidden className="text-brand-red">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceItem({ item, index }: { item: typeof items[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-6 py-8 md:gap-8 md:py-10"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full md:h-24 md:w-24">
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="(min-width: 768px) 96px, 80px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 pt-1">
        <h3 className="font-serif text-xl md:text-2xl">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.text}</p>
        <Link
          href="/kuechen"
          className="label mt-4 inline-flex items-center gap-1.5 text-[0.6rem] text-brand-red transition-opacity hover:opacity-60"
        >
          Mehr erfahren <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.div>
  );
}
