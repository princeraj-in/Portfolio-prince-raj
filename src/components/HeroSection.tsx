import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight, Mail, ArrowUpRight, Bot, Sparkles } from 'lucide-react';
import { ProfileImage } from './ui/ProfileImage';
import { HeroHeadingText } from './ui/HeroHeadingText';
import { HeroVortexCanvas } from './ui/HeroVortexCanvas';
import { MagneticButton } from './ui/MagneticButton';
import { FeatureBadgesGrid } from './ui/FeatureBadgesGrid';
import { staggerContainer, itemFadeUp, itemPop } from '../lib/animations';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleOpenChat = (query?: string) => {
    window.dispatchEvent(new CustomEvent('open-tectra-chat', { detail: { query } }));
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden"
    >
      {/* Animated Hero Vortex Interactive Canvas */}
      <HeroVortexCanvas />
      
      {/* Dynamic Background Light Auras */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/25 to-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse" />

      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center space-y-4 sm:space-y-6"
        >
          {/* Top 3D Pill Badge */}
          <motion.div 
            variants={itemPop}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-xs md:text-sm font-bold tracking-wider text-cyan-300 uppercase">
              AI Developer & Full Stack Engineer
            </span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>

          {/* Interactive 3D Avatar Profile Image */}
          <motion.div variants={itemFadeUp} className="w-full flex justify-center -my-1 sm:-my-2">
            <ProfileImage 
              src="/avatar.webp"
              alt="Prince Raj"
              floatDistance={14}
              glowColor="#00FFFF"
            />
          </motion.div>
          
          {/* Main Hero Section Heading with Staggered Fade-Up, Space Grotesk & Glitch/Typewriter */}
          <div className="relative w-full">
            <HeroHeadingText />
          </div>
          
          {/* Animated Neon Sub-headline */}
          <motion.div variants={itemFadeUp} className="relative" style={{ perspective: 1200 }}>
            <h2 
              className="text-xl sm:text-2.5xl md:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase italic relative z-10 break-words"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(18px)',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent blur-xl animate-running-neon opacity-70">
                Let's Build future with Ai
              </span>
              <span className="relative bg-gradient-to-r from-purple-300 via-pink-400 to-red-400 bg-clip-text text-transparent animate-running-neon text-3d-neon-sub">
                Let's Build future with Ai
              </span>
            </h2>
          </motion.div>
          
          {/* Refined Narrative Description */}
          <motion.p 
            variants={itemFadeUp} 
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed drop-shadow-sm font-normal"
          >
            Pioneering autonomous AI systems, intelligent agentic workflows, and scalable modern architectures to solve complex computational challenges.
          </motion.p>
          
          {/* 3D Liquid Magnetic CTA Buttons */}
          <motion.div variants={itemFadeUp} className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto pt-2 relative z-20">
            <MagneticButton href="#credentials" glowColor="rgba(0, 255, 255, 0.6)">
              <span className="tracking-wide">Explore Credentials</span>
              <ChevronRight className="w-4 h-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton
              onClick={() => handleOpenChat()}
              glowColor="rgba(59, 130, 246, 0.6)"
            >
              <Bot className="w-4 h-4 mr-1 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Ask Tectra AI</span>
            </MagneticButton>
            
            <MagneticButton href="#contact" glowColor="rgba(6, 182, 212, 0.5)">
              <Mail className="w-4 h-4 mr-1" />
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </motion.div>

          {/* Premium Bottom Feature Badges Grid with Ample Negative Space & Scroll-Triggered whileInView */}
          <FeatureBadgesGrid className="mt-24 sm:mt-32 lg:mt-36" />
        </motion.div>
      </div>
    </section>
  );
};
