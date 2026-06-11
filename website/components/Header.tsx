"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Start" },
  { href: "/kuechen", label: "Küchen & Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-brand-red/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex h-16 md:h-20 w-full items-center justify-between pl-3 pr-5 md:pl-5 md:pr-8">
        <Link href="/" aria-label="Küchen Hargaßer — Startseite" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Küchen Hargaßer"
            width={256}
            height={256}
            priority
            className="h-11 w-11 md:h-14 md:w-14 rounded-full bg-paper object-contain shadow-sm ring-1 ring-black/5"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-base md:text-lg tracking-wide">
              Küchen Hargaßer
            </span>
            <span className="label mt-1 text-[0.55rem] text-paper/70 group-hover:text-paper transition-colors">
              Taufkirchen (Vils) · München
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors hover:text-paper ${
                pathname === item.href ? "text-paper" : "text-paper/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="ml-2 border border-brand-red px-5 py-2.5 text-xs label text-paper bg-brand-red/20 hover:bg-brand-red hover:text-paper transition-colors duration-300"
          >
            Beratungstermin
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü öffnen"
          aria-expanded={open}
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t hairline-dark"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 font-serif text-2xl ${
                    pathname === item.href ? "text-brass" : "text-paper"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.phoneHref}
                className="label mt-3 py-3 text-brass"
              >
                Tel. {site.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
