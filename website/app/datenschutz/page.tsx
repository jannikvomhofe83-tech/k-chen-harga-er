import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <section className="bg-ink pt-32 md:pt-44">
      <div className="mx-auto max-w-3xl px-5 pb-24 md:px-8 md:pb-36">
        <h1 className="font-serif text-4xl md:text-5xl">Datenschutzerklärung</h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-paper/70">
          <p className="text-paper/40">
            [Platzhalter: Vollständige Datenschutzerklärung nach DSGVO bitte
            ergänzen — u.a. Verantwortlicher, Hosting, Kontaktformular/E-Mail,
            eingebettete Google-Maps-Karte, Betroffenenrechte.]
          </p>
        </div>
      </div>
    </section>
  );
}
