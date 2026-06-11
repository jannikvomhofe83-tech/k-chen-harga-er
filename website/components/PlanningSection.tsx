import Reveal from "@/components/Reveal";
import PlanningAssistant from "@/components/PlanningAssistant";

export default function PlanningSection() {
  return (
    <section className="relative bg-ink">
      {/* Hintergrundbild */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/family-kitchen.jpg')" }}
      />
      {/* Dunkles Overlay für Lesbarkeit */}
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 pb-8 md:px-8 md:pt-36 md:pb-12 [text-shadow:0_1px_4px_rgba(0,0,0,0.95),0_3px_16px_rgba(0,0,0,0.85),0_6px_32px_rgba(0,0,0,0.7)]">
        <Reveal>
          <p className="label text-brand-red">Beratungstermin</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl">
            In fünf Schritten zu Ihrem Beratungstermin.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70">
            Beantworten Sie uns vier kurze Fragen — so können wir uns auf
            das Gespräch vorbereiten und Sie bekommen schneller eine
            fundierte Antwort.
          </p>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-36">
        <Reveal delay={0.1}>
          <div className="max-w-2xl">
            <PlanningAssistant />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
