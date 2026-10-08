import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AboutCard } from './ui/about-card';

const Particles: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const particles = useMemo(() => {
    // Fewer particles on mobile, disabled when reduced motion is preferred
    const count = 14;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (i * 7.1 + 3) % 100,
      y: (i * 8.3 + 5) % 100,
      duration: 12 + (i % 6) * 2,
      delay: (i % 5) * 1.2,
    }));
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full blur-[1px]"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -80],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 sm:py-24 z-10 bg-transparent overflow-hidden transition-colors duration-300">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <Particles />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        <AboutCard />
      </div>
    </section>
  );
};

export default AboutSection;
