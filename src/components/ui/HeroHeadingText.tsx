import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

export interface HeroHeadingTextProps {
  className?: string;
}

const words = ['HI', 'I', 'AM', 'PRINCE', 'RAJ', '|'];

export const HeroHeadingText: React.FC<HeroHeadingTextProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  // Typewriter & glitch state for "AI DEVELOPER"
  const fullText = 'AI DEVELOPER';
  const alternateTexts = ['AI DEVELOPER', 'NEURAL ARCHITECT', 'LLM ENGINEER', 'AI DEVELOPER'];
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Looping typewriter effect for tech aesthetic
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(fullText);
      return;
    }

    const currentTarget = alternateTexts[textIndex % alternateTexts.length];
    const typingSpeed = isDeleting ? 45 : 95;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentTarget.length) {
          setDisplayText(currentTarget.slice(0, displayText.length + 1));
        } else {
          // Finished typing word, trigger subtle cyber glitch, then wait
          setIsGlitching(true);
          const glitchTimer = setTimeout(() => setIsGlitching(false), 350);
          
          const pauseTimer = setTimeout(() => {
            setIsDeleting(true);
          }, 2400);

          return () => {
            clearTimeout(glitchTimer);
            clearTimeout(pauseTimer);
          };
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % alternateTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, shouldReduceMotion]);

  // Periodic subtle glitch twitch
  useEffect(() => {
    if (shouldReduceMotion) return;

    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 280);
    }, 4500);

    return () => clearInterval(glitchInterval);
  }, [shouldReduceMotion]);

  // Framer motion container for staggered fade-up
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  // Word fade-up variant
  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: 'blur(8px)',
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 110,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`font-['Space_Grotesk'] text-3xl sm:text-4.5xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic leading-[1.12] select-none text-center ${className}`}
      style={{ perspective: 1200 }}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 sm:gap-y-2">
        {/* Staggered Words: HI I AM PRINCE RAJ | */}
        {words.map((word, index) => {
          const isPrince = word === 'PRINCE' || word === 'RAJ';
          const isPipe = word === '|';

          return (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className={`inline-block relative ${
                isPipe
                  ? 'text-cyan-400/60 font-light mx-0.5 sm:mx-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl not-italic select-none'
                  : isPrince
                  ? 'bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(6,182,212,0.4)]'
                  : 'text-slate-100 dark:text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
              }`}
            >
              {word}
            </motion.span>
          );
        })}

        {/* AI DEVELOPER Segment with Looping Glitch & Typewriter Effect */}
        <motion.span
          variants={wordVariants}
          className="relative inline-flex items-center group cursor-pointer"
        >
          {/* Subtle Ambient Glow behind AI DEVELOPER */}
          <span
            className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/25 to-cyan-400/30 blur-lg rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            aria-hidden="true"
          />

          {/* Glitch RGB Chromatic Aberration Layers (Active during glitch pulse) */}
          {isGlitching && (
            <>
              {/* Cyan Shift Layer */}
              <span
                className="absolute inset-0 text-cyan-400 select-none pointer-events-none opacity-80"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                  transform: 'translate(-2px, -1px)',
                  filter: 'blur(0.5px)',
                }}
                aria-hidden="true"
              >
                {displayText || fullText}
              </span>

              {/* Magenta/Red Shift Layer */}
              <span
                className="absolute inset-0 text-fuchsia-400 select-none pointer-events-none opacity-80"
                style={{
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                  transform: 'translate(2.5px, 1.5px)',
                  filter: 'blur(0.5px)',
                }}
                aria-hidden="true"
              >
                {displayText || fullText}
              </span>
            </>
          )}

          {/* Primary Sharp Text */}
          <span
            className={`relative z-10 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] tracking-tight ${
              isGlitching ? 'translate-x-[0.5px] -translate-y-[0.5px]' : ''
            }`}
          >
            {displayText || (shouldReduceMotion ? fullText : '')}
          </span>

          {/* Blinking Cyan Futuristic Terminal Cursor */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="inline-block ml-1 w-2 sm:w-2.5 h-6 sm:h-8 md:h-10 bg-cyan-400 rounded-xs shadow-[0_0_12px_#00FFFF] align-middle"
            aria-hidden="true"
          />
        </motion.span>
      </div>
    </motion.h1>
  );
};

export default HeroHeadingText;
