import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroLiquidParticles } from "./ui/HeroLiquidParticles";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Hero ke scroll progress ke hisaab se image halki zoom + fade hogi
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center select-none"
    >
      {/* Ambient Backdrop for ultra-wide / portrait displays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/hero_section.webp?v=6"
          alt=""
          className="w-full h-full object-cover object-center blur-2xl opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Full screen image with zoom and fade on scroll */}
      <motion.div
        style={{ scale, opacity }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[1672/941] flex items-center justify-center">
          <img
            src="/hero_section.webp?v=6"
            alt="Prince Raj - Full Stack Developer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain md:object-cover object-center drop-shadow-2xl select-none"
          />

          {/* Interactive Liquid Particles & Shimmer Stream Layer */}
          <HeroLiquidParticles />

          {/* Clickable 'View My Work' Hotspot with Smooth Scroll to Projects */}
          <motion.a
            href="#projects"
            onClick={handleScrollToProjects}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="absolute z-30 cursor-pointer rounded-full transition-transform"
            style={{
              left: '4.8%',
              top: '59.5%',
              width: '13.1%',
              height: '6.9%',
            }}
            aria-label="View My Work - Jump to Projects"
            title="View My Work"
          >
            <div className="w-full h-full rounded-full opacity-0 hover:opacity-100 bg-amber-400/20 border border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-opacity duration-300" />
          </motion.a>
        </div>
      </motion.div>

      {/* Subtle bottom vignette for section transition */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-10" />

      {/* Scroll hint with animated bouncing dot */}
      <motion.a
        href="#about"
        style={{ opacity: hintOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sm text-white/80 cursor-pointer z-30 hover:text-white transition-colors"
        aria-label="Scroll down to About section"
      >
        <span className="tracking-widest uppercase font-mono text-[10px] sm:text-xs">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-5 rounded-full border border-white/60 p-1"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-white mx-auto shadow-[0_0_6px_#fff]" />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ---------- Scroll par smooth reveal wala wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const HeroSection = Hero;
