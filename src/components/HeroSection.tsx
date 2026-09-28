import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Mail, Sparkles, Award, GraduationCap, Cpu, TrendingUp, ArrowUpRight, Bot } from 'lucide-react';
import { HeroVortexCanvas } from './ui/HeroVortexCanvas';
import { staggerContainer, itemFadeUp, itemPop } from '../lib/animations';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleOpenChat = (query?: string) => {
    window.dispatchEvent(new CustomEvent('open-tectra-chat', { detail: { query } }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: (y / (rect.height / 2)) * -4,
      y: (x / (rect.width / 2)) * 4,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const stats = [
    { icon: GraduationCap, label: "IIT Patna", value: "BS in CS & Analytics", color: "from-blue-500 to-cyan-400" },
    { icon: Award, label: "Certifications", value: "7+ Google / IBM / AWS", color: "from-purple-500 to-pink-400" },
    { icon: TrendingUp, label: "Quantitative Systems", value: "Trading & Algorithms", color: "from-emerald-500 to-teal-400" },
    { icon: Cpu, label: "Core Stack", value: "18+ Modern AI Frameworks", color: "from-amber-500 to-orange-400" },
  ];

  return (
    <section 
      id="hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 sm:pt-24 pb-16 overflow-hidden"
    >
      {/* Interactive Neural Vortex Particle Background Canvas */}
      <HeroVortexCanvas />

      {/* 3D Cosmic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-purple-600/10 rounded-full blur-[110px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
          className="w-full flex flex-col items-center transition-transform duration-200 ease-out space-y-6 sm:space-y-8"
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
            <span className="text-xs md:text-sm font-bold tracking-wider text-cyan-600 dark:text-cyan-300 uppercase">
              AI Developer & Quantitative Trader
            </span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
          
          {/* Main 3D Holographic Title */}
          <motion.div variants={itemFadeUp} className="relative w-full" style={{ perspective: 1200 }}>
            <h1 
              className="text-3xl sm:text-4.5xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic leading-[1.1] relative z-10 break-words"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(25px)',
              }}
            >
              {/* Diffuse Underglow */}
              <span className="absolute inset-0 text-blue-500 blur-2xl opacity-60 pointer-events-none select-none">
                Hii I am Prince Raj | Ai developer
              </span>
              {/* High-Contrast 3D Layer */}
              <span className="relative text-3d-blue-texture select-none drop-shadow-2xl">
                Hii I am Prince Raj | Ai developer
              </span>
            </h1>
          </motion.div>
          
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
              <span className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:from-purple-300 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent animate-running-neon text-3d-neon-sub">
                Let's Build future with Ai
              </span>
            </h2>
          </motion.div>
          
          {/* Refined Narrative Description */}
          <motion.p 
            variants={itemFadeUp} 
            className="text-sm sm:text-base md:text-lg dark:text-slate-300 text-slate-700 max-w-xl leading-relaxed drop-shadow-sm font-normal"
          >
            Pioneering autonomous AI systems, algorithmic quantitative modeling, and scalable modern architectures to solve complex computational challenges.
          </motion.p>
          
          {/* 3D Liquid Glass CTA Buttons */}
          <motion.div variants={itemFadeUp} className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto pt-1 relative z-20">
            <motion.a 
              href="#credentials"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-white rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_8px_25px_rgba(6,182,212,0.35)] hover:shadow-[0_14px_35px_rgba(6,182,212,0.55)] overflow-hidden border border-white/30 cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                animate={{
                  translateX: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
              <span className="relative flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                Explore Credentials
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.a>

            <motion.button
              id="hero-chat-trigger-btn"
              onClick={() => handleOpenChat()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-bold text-cyan-400 dark:text-cyan-300 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 backdrop-blur-3xl border border-cyan-500/40 hover:border-cyan-400 shadow-[0_6px_20px_rgba(6,182,212,0.18)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                <span>Ask Tectra AI</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              </div>
            </motion.button>
            
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border border-white/60 dark:border-white/15 hover:border-cyan-400/60 shadow-[0_8px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_30px_rgba(6,182,212,0.2)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
                Let's Connect
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </span>
            </motion.a>
          </motion.div>

          {/* Quick Metrics / Highlights Bento Bar - Zoom Resilient */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full pt-8 sm:pt-12 relative z-10 min-w-0"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemFadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-3.5 sm:p-4 rounded-2xl bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 hover:border-cyan-400/40 shadow-[0_8px_25px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_15px_35px_rgba(6,182,212,0.2)] transition-all duration-300 text-left overflow-hidden min-w-0 flex flex-col justify-between"
              >
                {/* Liquid Morphing Glow in Corner */}
                <div className={`absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br ${stat.color} opacity-15 rounded-full blur-2xl group-hover:opacity-40 group-hover:scale-125 transition-all duration-500 pointer-events-none`} />
                
                {/* Top Inner Specular Highlight Line */}
                <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

                <div className="flex items-center gap-2.5 mb-2 relative z-10 min-w-0">
                  <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-white/5 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 dark:border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <stat.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">{stat.label}</span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-tight relative z-10 truncate">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
