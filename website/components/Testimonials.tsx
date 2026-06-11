import Reveal from "@/components/Reveal";
import { site, testimonials } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="label text-brass">Stimmen unserer Kunden</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.1] md:text-5xl">
            ★ {site.rating} bei Google —<br />
            {site.reviews} Mal Vertrauen geschenkt.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col border-t-2 border-brass pt-7">
                <blockquote className="flex-1 font-serif text-lg leading-relaxed text-ink/85">
                  „{t.text}“
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-between">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <span className="text-xs text-brass" aria-label="5 von 5 Sternen">
                    ★★★★★
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
