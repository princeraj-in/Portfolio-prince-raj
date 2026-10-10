import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroLiquidParticles } from "./ui/HeroLiquidParticles";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderedBounds, setRenderedBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  // Hero scroll progress zoom + fade
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.clientWidth;
      const ch = containerRef.current.clientHeight;
      if (!cw || !ch) return;

      const imgAspect = 1672 / 941;
      const containerAspect = cw / ch;

      let w = cw;
      let h = ch;
      let left = 0;
      let top = 0;

      if (containerAspect > imgAspect) {
        // Screen is wider than image aspect ratio (e.g. ultra-wide or wide screens)
        w = cw;
        h = cw / imgAspect;
        top = (ch - h) / 2;
      } else {
        // Screen is narrower/taller than image aspect ratio
        h = ch;
        w = ch * imgAspect;
        left = (cw - w) / 2;
      }

      setRenderedBounds({ left, top, width: w, height: h });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

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
      className="relative min-h-[100svh] lg:h-screen w-full overflow-hidden bg-black flex items-center justify-center select-none"
    >
      {/* ============================================================ */}
      {/* 1. DESKTOP WIDESCREEN HERO (lg:flex)                         */}
      {/* Edge-to-edge full screen, zero blank sides, interactive mesh */}
      {/* Uses authentic /hero_section.webp                            */}
      {/* ============================================================ */}
      <div className="hidden lg:flex relative w-full h-full items-center justify-center overflow-hidden">
        {/* Ambient Backdrop for ultra-wide displays with zero blank borders */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img
            src="/hero_section.webp"
            alt=""
            className="w-full h-full object-cover object-center blur-2xl opacity-50 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        {/* Main Edge-to-Edge Hero Banner */}
        <motion.div
          ref={containerRef}
          style={{ scale, opacity }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
        >
          <img
            src="/hero_section.webp"
            alt="Prince Raj - Full Stack Developer & AI Engineer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center drop-shadow-2xl select-none"
          />

          {/* Interactive Liquid Particles & Shimmer Stream Layer across full screen */}
          <HeroLiquidParticles />

          {/* Clickable 'View My Work' Hotspot dynamically mapped to the button's rendered coordinates */}
          {renderedBounds.width > 0 && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${renderedBounds.left}px`,
                top: `${renderedBounds.top}px`,
                width: `${renderedBounds.width}px`,
                height: `${renderedBounds.height}px`,
              }}
            >
              <motion.a
                href="#projects"
                onClick={handleScrollToProjects}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="absolute z-30 cursor-pointer rounded-full transition-transform pointer-events-auto"
                style={{
                  left: "4.8%",
                  top: "59.5%",
                  width: "13.1%",
                  height: "6.9%",
                }}
                aria-label="View My Work - Jump to Projects"
                title="View My Work"
              >
                <div className="w-full h-full rounded-full opacity-0 hover:opacity-100 bg-amber-400/20 border border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-opacity duration-300" />
              </motion.a>
            </div>
          )}
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. MOBILE & TABLET RESPONSIVE HERO (lg:hidden)               */}
      {/* Clean authentic /hero_section.webp without any extra buttons */}
      {/* ============================================================ */}
      <div className="lg:hidden relative min-h-[100svh] w-full flex flex-col justify-center items-center px-3 sm:px-6 py-20 overflow-hidden z-20">
        {/* Ambient Blurred Backdrop using hero_section.webp - zero blank space */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img
            src="/hero_section.webp"
            alt=""
            className="w-full h-full object-cover object-center blur-2xl opacity-45 scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/90" />
        </div>

        {/* Hero Section Banner Image (Clean authentic hero image, uncropped & zero extra buttons) */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] bg-black/40 backdrop-blur-sm select-none"
        >
          <img
            src="/hero_section.webp"
            alt="Prince Raj - Full Stack Developer & AI Engineer"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain block"
          />

          {/* Interactive Liquid Particles on mobile banner */}
          <HeroLiquidParticles />

          {/* Clickable 'View My Work' Hotspot mapped directly on the graphic's button */}
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="absolute z-30 cursor-pointer rounded-full active:scale-95 transition-transform"
            style={{
              left: "4.8%",
              top: "59.5%",
              width: "13.1%",
              height: "6.9%",
              minWidth: "44px",
              minHeight: "26px",
            }}
            aria-label="View My Work - Jump to Projects"
            title="View My Work"
          >
            <div className="w-full h-full rounded-full opacity-0 hover:opacity-100 active:opacity-100 bg-amber-400/20 border border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.6)] transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>

      {/* Subtle bottom vignette for section transition */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-10" />

      {/* Scroll hint with animated bouncing dot */}
      <motion.a
        href="#about"
        style={{ opacity: hintOpacity }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 text-sm text-white/80 cursor-pointer z-30 hover:text-white transition-colors"
        aria-label="Scroll down to About section"
      >
        <span className="tracking-widest uppercase font-mono text-[9px] sm:text-xs">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-7 sm:h-8 w-4.5 sm:w-5 rounded-full border border-white/60 p-1"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-white mx-auto shadow-[0_0_6px_#fff]" />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ---------- Scroll par smooth reveal wrapper ---------- */
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
