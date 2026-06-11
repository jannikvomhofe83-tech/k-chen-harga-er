import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <section className="bg-ink pt-32 md:pt-44">
      <div className="mx-auto max-w-3xl px-5 pb-24 md:px-8 md:pb-36">
        <h1 className="font-serif text-4xl md:text-5xl">Impressum</h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-paper/70">
          <p>
            Küchen Hargaßer
            <br />
            Brunnholzring 9
            <br />
            84416 Taufkirchen (Vils)
            <br />
            Tel. {site.phone}
          </p>
          <p className="text-paper/40">
            [Platzhalter: Inhaber, Rechtsform, USt-IdNr., zuständige Kammer und
            weitere Pflichtangaben nach § 5 TMG bitte ergänzen.]
          </p>
        </div>
      </div>
    </section>
  );
}
