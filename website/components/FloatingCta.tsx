"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FloatingCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/kontakt") return null;

  /* Editorial-Theme (helle Seiten): Markenrot statt Messing. */
  const editorial = pathname === "/kuechen";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-5 z-40 flex justify-center md:hidden"
        >
          <Link
            href="/kontakt"
            className={`rounded-full px-7 py-3.5 text-sm font-semibold shadow-xl ${
              editorial
                ? "bg-brand-700 text-linen-50 shadow-carbon-900/30"
                : "bg-brass text-ink shadow-black/40"
            }`}
          >
            Beratungstermin vereinbaren
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
