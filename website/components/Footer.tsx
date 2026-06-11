import Link from "next/link";
import { site, services } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t hairline-dark bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8 md:py-20">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl">Küchen Hargaßer</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            Ihr persönliches Küchenstudio in Taufkirchen (Vils) — Planung,
            Werkstatt und Montage aus einer Hand, für München und Umgebung.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-paper/80">
            <span className="text-brass">★ {site.rating}</span>
            <span className="text-paper/40">·</span>
            <span>{site.reviews} Google-Rezensionen</span>
          </div>
        </div>

        <div>
          <p className="label text-stone">Leistungen</p>
          <ul className="mt-5 space-y-2.5 text-sm text-paper/70">
            {services.map((s) => (
              <li key={s.title}>
                <Link href="/kuechen" className="hover:text-brass transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-stone">Kontakt</p>
          <address className="mt-5 space-y-2.5 text-sm not-italic text-paper/70">
            <p>Brunnholzring 9</p>
            <p>84416 Taufkirchen (Vils)</p>
            <p>
              <a href={site.phoneHref} className="hover:text-brass transition-colors">
                Tel. {site.phone}
              </a>
            </p>
          </address>
          <p className="label mt-8 text-stone">Rechtliches</p>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            <li>
              <Link href="/impressum" className="hover:text-brass transition-colors">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-brass transition-colors">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline-dark">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Küchen Hargaßer · Alle Rechte vorbehalten</p>
          <p>Mitglied im Kücheneinkaufsverband KMG Zumbrock · 5 Jahre Garantie</p>
        </div>
      </div>
    </footer>
  );
}
