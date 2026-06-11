"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/components/MagneticLink";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const clips = [
  { src: "/videos/hero-anthrazit.mp4", poster: "/kuechen/kueche-anthrazit-messing.jpg" },
  { src: "/videos/hero-loft.mp4", poster: "/kuechen/kueche-schwarz-loft.jpg" },
  { src: "/videos/hero-weiss.mp4", poster: "/kuechen/kueche-weiss-minimal.jpg" },
  { src: "/videos/hero-abend.mp4", poster: "/kuechen/kueche-blaugrau-abend.jpg" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Nahtlose Sequenz: endet ein Clip, blendet der nächste ein.
  useEffect(() => {
    const current = videoRefs.current[active];
    if (!current) return;
    current.currentTime = 0;
    const play = current.play();
    if (play) play.catch(() => {});

    const next = videoRefs.current[(active + 1) % clips.length];
    if (next) next.load();

    const onEnded = () => setActive((a) => (a + 1) % clips.length);
    current.addEventListener("ended", onEnded);
    return () => current.removeEventListener("ended", onEnded);
  }, [active]);

  // Sanfter Übergang vom Video in den Content beim Scrollen.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        scale: 1.08,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-svh overflow-hidden">
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {clips.map((clip, i) => (
          <video
            key={clip.src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            muted
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            poster={clip.poster}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
        ))}
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="label text-brass-soft hero-shadow-soft"
        >
          Küchenstudio · Taufkirchen (Vils) · {site.region}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-serif text-[2.75rem] leading-[1.05] md:text-7xl hero-shadow"
        >
          Küchen fürs Leben.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-paper/90 md:text-lg hero-shadow-soft"
        >
          Persönlich geplant, von unseren eigenen Profis eingebaut und mit
          fünf Jahren Garantie — Premium-Marken zum fairen Preis, dazu eine
          eigene Werkstatt für besondere Details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <MagneticLink
            href="/kontakt"
            className="inline-block border border-paper/60 bg-paper/0 px-9 py-4 text-sm label text-paper transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-ink"
          >
            Beratungstermin vereinbaren
          </MagneticLink>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-12 w-px overflow-hidden bg-paper/20">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-full w-full bg-brass"
          />
        </div>
      </motion.div>
    </section>
  );
}
