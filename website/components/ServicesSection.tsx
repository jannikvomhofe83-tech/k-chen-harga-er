import Link from "next/link";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site";

export default function ServicesSection() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="label text-brass">Leistungen</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] md:text-5xl">
            Alles aus einer Hand — von der ersten Skizze bis zum letzten
            Handgriff.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px border hairline-light bg-ink/10 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="bg-paper">
              <div className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-paper-soft md:p-10">
                <span className="font-serif text-sm text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/65">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-16">
            <Link
              href="/kuechen"
              className="label inline-flex items-center gap-3 text-ink transition-colors hover:text-brass"
            >
              Küchen & Leistungen ansehen
              <span aria-hidden className="text-brass">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
