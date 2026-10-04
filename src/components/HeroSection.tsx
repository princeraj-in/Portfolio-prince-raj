import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse offset across entire hero container for multi-layered 3D camera parallax
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);

  const springConfig = { stiffness: 85, damping: 22, mass: 0.8 };
  const smoothHeroX = useSpring(heroMouseX, springConfig);
  const smoothHeroY = useSpring(heroMouseY, springConfig);

  // 3D Camera tilt transforms
  const cameraRotateX = useTransform(smoothHeroY, [-1, 1], [6, -6]);
  const cameraRotateY = useTransform(smoothHeroX, [-1, 1], [-7, 7]);

  // Subtle opposite shifts for depth separation
  const depthShiftX = useTransform(smoothHeroX, [-1, 1], [-14, 14]);
  const depthShiftY = useTransform(smoothHeroY, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    heroMouseX.set(normX);
    heroMouseY.set(normY);
  };

  const handleHeroMouseLeave = () => {
    if (isTouchDevice || shouldReduceMotion) return;
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  const handleOpenChat = (query?: string) => {
    window.dispatchEvent(new CustomEvent('open-tectra-chat', { detail: { query } }));
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden"
      style={{ perspective: 1400 }}
    >
      {/* Animated Hero Vortex Interactive Canvas */}
      <HeroVortexCanvas />
      
      {/* Dynamic Background Light Auras */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/25 to-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse" />

      {/* 3D Kinetic Camera Parallax Scene Container */}
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX: shouldReduceMotion || isTouchDevice ? 0 : cameraRotateX,
          rotateY: shouldReduceMotion || isTouchDevice ? 0 : cameraRotateY,
          x: shouldReduceMotion || isTouchDevice ? 0 : depthShiftX,
          y: shouldReduceMotion || isTouchDevice ? 0 : depthShiftY,
        }}
        className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center space-y-4 sm:space-y-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Top 3D Pill Badge */}
          <motion.div 
            variants={itemPop}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(30px)',
            }}
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

          {/* Interactive 3D Avatar Profile Image (Energy Core Layer) */}
          <motion.div 
            variants={itemFadeUp} 
            className="w-full flex justify-center -my-1 sm:-my-2"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(75px)',
            }}
          >
            <ProfileImage 
              src="/avatar.webp"
              alt="Prince Raj"
              floatDistance={14}
              glowColor="#00FFFF"
            />
          </motion.div>
          
          {/* Main Hero Section Heading with Staggered Fade-Up, Space Grotesk & Glitch/Typewriter */}
          <div 
            className="relative w-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(45px)',
            }}
          >
            <HeroHeadingText />
          </div>
          
          {/* Animated Neon Sub-headline */}
          <motion.div 
            variants={itemFadeUp} 
            className="relative" 
            style={{ 
              perspective: 1200,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(58px)',
            }}
          >
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
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(35px)',
            }}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed drop-shadow-sm font-normal"
          >
            Pioneering autonomous AI systems, intelligent agentic workflows, and scalable modern architectures to solve complex computational challenges.
          </motion.p>
          
          {/* 3D Liquid Magnetic CTA Buttons */}
          <motion.div 
            variants={itemFadeUp} 
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(40px)',
            }}
            className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto pt-2 relative z-20"
          >
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
          <FeatureBadgesGrid className="mt-20 sm:mt-28 lg:mt-32" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
