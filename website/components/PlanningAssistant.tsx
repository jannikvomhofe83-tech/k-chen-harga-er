"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

type Choice = { value: string; hint?: string };

const choiceSteps: {
  key: "vorhaben" | "stil" | "budget" | "zeitrahmen";
  question: string;
  choices: Choice[];
}[] = [
  {
    key: "vorhaben",
    question: "Was planen Sie?",
    choices: [
      { value: "Neue Küche", hint: "Komplettplanung von Grund auf" },
      { value: "Küchenrenovierung", hint: "Fronten, Geräte, Arbeitsplatte" },
      { value: "Arbeitsplatte nach Maß", hint: "Stein, Holz, Keramik" },
      { value: "Erstmal beraten lassen", hint: "Unverbindliches Gespräch" },
    ],
  },
  {
    key: "stil",
    question: "Welche Richtung gefällt Ihnen?",
    choices: [
      { value: "Modern & grifflos", hint: "Klare Linien, Mattlack" },
      { value: "Klassisch & zeitlos", hint: "Rahmenfronten, warme Töne" },
      { value: "Landhaus", hint: "Natürlich, gemütlich" },
      { value: "Noch offen", hint: "Wir finden es gemeinsam heraus" },
    ],
  },
  {
    key: "budget",
    question: "Welcher Rahmen schwebt Ihnen vor?",
    choices: [
      { value: "Bis 15.000 €" },
      { value: "15.000 – 30.000 €" },
      { value: "30.000 – 50.000 €" },
      { value: "Über 50.000 € / noch offen" },
    ],
  },
  {
    key: "zeitrahmen",
    question: "Wann soll Ihre Küche stehen?",
    choices: [
      { value: "So bald wie möglich" },
      { value: "In 3 – 6 Monaten" },
      { value: "In 6 – 12 Monaten" },
      { value: "Ich plane langfristig" },
    ],
  },
];

const totalSteps = choiceSteps.length + 1;

const stepVariants = {
  enter: { opacity: 0, x: 48 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -48 },
};

export default function PlanningAssistant({ light = false }: { light?: boolean }) {
  const t = light
    ? {
        box: "border rule-carbon bg-linen-50 shadow-sm",
        track: "bg-carbon-900/10",
        bar: "bg-brand-700",
        step: "text-carbon-500",
        doneTitle: "text-brand-700",
        doneText: "text-carbon-600",
        donePhone: "text-carbon-900 hover:text-brand-700",
        choice: "border rule-carbon hover:border-brand-700 hover:bg-linen-100",
        choiceVal: "text-carbon-900 group-hover:text-brand-700",
        choiceHint: "text-carbon-500",
        back: "text-carbon-500 hover:text-brand-700",
        fieldLabel: "text-carbon-500",
        input:
          "border rule-carbon bg-white text-carbon-900 placeholder:text-carbon-400 focus:border-brand-700",
        submit: "bg-brand-700 text-linen-50 enabled:hover:bg-brand-600",
        foot: "text-carbon-500",
      }
    : {
        box: "border hairline-dark bg-ink-soft",
        track: "bg-paper/15",
        bar: "bg-brass",
        step: "text-stone",
        doneTitle: "text-brass",
        doneText: "text-paper/70",
        donePhone: "text-paper hover:text-brass",
        choice: "border hairline-dark hover:border-brass hover:bg-ink",
        choiceVal: "text-paper group-hover:text-brass",
        choiceHint: "text-paper/45",
        back: "text-stone hover:text-brass",
        fieldLabel: "text-stone",
        input:
          "border hairline-dark bg-ink text-paper focus:border-brass",
        submit: "bg-brass text-ink enabled:hover:bg-brass-soft",
        foot: "text-paper/40",
      };

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({
    name: "",
    tel: "",
    email: "",
    nachricht: "",
  });
  const [done, setDone] = useState(false);

  const select = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  const mailtoHref = useMemo(() => {
    const lines = [
      `Vorhaben: ${answers.vorhaben ?? "-"}`,
      `Stilrichtung: ${answers.stil ?? "-"}`,
      `Budget: ${answers.budget ?? "-"}`,
      `Zeitrahmen: ${answers.zeitrahmen ?? "-"}`,
      "",
      `Name: ${contact.name}`,
      `Telefon: ${contact.tel}`,
      `E-Mail: ${contact.email}`,
      "",
      contact.nachricht,
    ].join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(
      "Planungsanfrage über die Website"
    )}&body=${encodeURIComponent(lines)}`;
  }, [answers, contact]);

  const canSubmit =
    contact.name.trim().length > 1 &&
    (contact.tel.trim().length > 4 || contact.email.includes("@"));

  return (
    <div className={`p-6 md:p-10 ${t.box}`}>
      {/* Fortschritt */}
      <div className="mb-10 flex items-center gap-4">
        <div className={`h-px flex-1 ${t.track}`}>
          <motion.div
            className={`h-px ${t.bar}`}
            animate={{
              width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className={`label ${t.step}`}>
          {done ? "Fertig" : `Schritt ${Math.min(step + 1, totalSteps)} / ${totalSteps}`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="py-6 text-center"
          >
            <p className={`font-serif text-3xl ${t.doneTitle}`}>Vielen Dank!</p>
            <p className={`mx-auto mt-5 max-w-md text-sm leading-relaxed ${t.doneText}`}>
              Ihre Anfrage ist vorbereitet. Es öffnet sich Ihr E-Mail-Programm —
              einfach absenden, wir melden uns innerhalb von zwei Werktagen mit
              einem Terminvorschlag. Noch schneller geht es telefonisch:
            </p>
            <a
              href={site.phoneHref}
              className={`mt-6 inline-block font-serif text-2xl transition-colors ${t.donePhone}`}
            >
              Tel. {site.phone}
            </a>
          </motion.div>
        ) : step < choiceSteps.length ? (
          <motion.div
            key={choiceSteps[step].key}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-serif text-2xl md:text-3xl">
              {choiceSteps[step].question}
            </h3>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {choiceSteps[step].choices.map((c) => (
                <button
                  key={c.value}
                  onClick={() => select(choiceSteps[step].key, c.value)}
                  className={`group px-6 py-5 text-left transition-colors duration-300 ${t.choice}`}
                >
                  <span className={`block text-sm font-semibold transition-colors ${t.choiceVal}`}>
                    {c.value}
                  </span>
                  {c.hint && (
                    <span className={`mt-1 block text-xs ${t.choiceHint}`}>
                      {c.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className={`label mt-8 transition-colors ${t.back}`}
              >
                ← Zurück
              </button>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="contact"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;
              window.location.href = mailtoHref;
              setDone(true);
            }}
          >
            <h3 className="font-serif text-2xl md:text-3xl">
              Wie erreichen wir Sie?
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={`label ${t.fieldLabel}`}>Name *</span>
                <input
                  required
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className={`mt-2 w-full px-4 py-3 text-sm outline-none transition-colors ${t.input}`}
                  placeholder="Vor- und Nachname"
                />
              </label>
              <label className="block">
                <span className={`label ${t.fieldLabel}`}>Telefon</span>
                <input
                  type="tel"
                  value={contact.tel}
                  onChange={(e) => setContact({ ...contact, tel: e.target.value })}
                  className={`mt-2 w-full px-4 py-3 text-sm outline-none transition-colors ${t.input}`}
                  placeholder="Für den schnellen Rückruf"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={`label ${t.fieldLabel}`}>E-Mail</span>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className={`mt-2 w-full px-4 py-3 text-sm outline-none transition-colors ${t.input}`}
                  placeholder="name@beispiel.de"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={`label ${t.fieldLabel}`}>Ihre Nachricht</span>
                <textarea
                  rows={4}
                  value={contact.nachricht}
                  onChange={(e) =>
                    setContact({ ...contact, nachricht: e.target.value })
                  }
                  className={`mt-2 w-full resize-none px-4 py-3 text-sm outline-none transition-colors ${t.input}`}
                  placeholder="Was sollten wir vorab wissen? (Raumgröße, Altbau/Neubau, Wünsche …)"
                />
              </label>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className={`label transition-colors text-left ${t.back}`}
              >
                ← Zurück
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className={`px-8 py-4 text-sm label transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${t.submit}`}
              >
                Anfrage absenden
              </button>
            </div>
            <p className={`mt-4 text-xs ${t.foot}`}>
              * Pflichtfeld — bitte Telefon oder E-Mail angeben. Ihre Daten
              verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
