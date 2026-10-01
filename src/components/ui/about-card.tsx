import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Bot, Code2, Layers, Sparkles, Zap } from 'lucide-react';
import { SpotlightCard } from './spotlight-card';
import { staggerContainer, itemFadeUp, itemPop } from '../../lib/animations';

export const AboutCard: React.FC = () => {
  const pillars = [
    {
      icon: Bot,
      title: "Agentic AI Systems",
      desc: "Architecting autonomous multi-agent pipelines and smart automation workflows.",
      color: "from-cyan-500/20 to-blue-500/10",
      iconColor: "text-cyan-400"
    },
    {
      icon: Code2,
      title: "Full-Stack AI Platforms",
      desc: "Engineering scalable React 19, TypeScript, and microservice architectures.",
      color: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400"
    },
    {
      icon: Layers,
      title: "Scalable Cloud Infra",
      desc: "Deploying low-latency serverless APIs, vector stores, and robust pipelines.",
      color: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-400"
    }
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative max-w-5xl mx-auto w-full"
    >
      {/* Dynamic Aura Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-15 hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

      {/* Main 3D Spotlight Container */}
      <SpotlightCard className="relative p-6 sm:p-10 md:p-12 overflow-hidden rounded-[2.5rem] bg-slate-950/75 border border-white/10 backdrop-blur-2xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 md:gap-12 relative z-10">
          
          {/* Left: 3D Holographic AI Neural Core */}
          <motion.div 
            variants={itemPop}
            className="flex-shrink-0 relative flex flex-col items-center justify-center"
          >
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              {/* Outer Rotating Gyro Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
              />
              
              {/* Counter-rotating Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-blue-400/30 border-t-cyan-400 border-r-transparent"
              />

              {/* Glowing Ambient Core */}
              <div className="absolute inset-6 bg-gradient-to-tr from-cyan-500/20 via-blue-500/30 to-purple-500/20 rounded-full blur-xl animate-pulse" />

              {/* Center 3D Glass Node */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 p-7 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/20 shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center justify-center"
              >
                <BrainCircuit className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
              </motion.div>

              {/* Floating Mini Tech Badges */}
              <motion.div 
                animate={{ y: [-4, 4, -4], x: [2, -2, 2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md rounded-full text-[10px] font-bold text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              >
                AI CORE
              </motion.div>

              <motion.div 
                animate={{ y: [4, -4, 4], x: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1 -left-1 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 backdrop-blur-md rounded-full text-[10px] font-bold text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              >
                AGENTS
              </motion.div>
            </div>
            
            {/* Status Subtitle */}
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              Autonomous Agent Engine
            </div>
          </motion.div>

          {/* Right: Rich Narrative & Pillars */}
          <div className="flex-1 space-y-6 text-left">
            <div>
              <motion.div variants={itemPop} className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Engineering Overview
                </span>
              </motion.div>
              <motion.h2 
                variants={itemFadeUp}
                className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Me</span>
              </motion.h2>
            </div>

            <motion.p 
              variants={itemFadeUp}
              className="text-slate-300 text-base md:text-lg leading-relaxed font-normal"
            >
              As an AI Developer & Full Stack Engineer, I architect autonomous agentic systems, bespoke machine learning models, and high-performance cloud applications engineered for real-world reliability and instant responsiveness.
            </motion.p>

            {/* Core Philosophy Banner */}
            <motion.div 
              variants={itemFadeUp}
              whileHover={{ scale: 1.01, x: 2 }}
              className="relative overflow-hidden p-3.5 sm:p-4 rounded-[1.75rem] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/5 border border-cyan-400/20 backdrop-blur-xl flex items-center gap-3.5 shadow-[0_4px_20px_rgba(6,182,212,0.15)] group/acad transition-all duration-300 min-w-0"
            >
              <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
              <div className="p-2.5 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 group-hover/acad:scale-110 group-hover/acad:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase text-cyan-400 tracking-wider">
                  Technical Mission
                </p>
                <p className="text-sm md:text-base font-extrabold text-white break-words">
                  Building Autonomous Agent Architectures & Production-Ready AI Platforms
                </p>
              </div>
            </motion.div>

            {/* 3 Core Interactive Liquid Pillars */}
            <motion.div variants={itemFadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 min-w-0">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="relative p-4 rounded-[1.5rem] bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.25)] transition-all duration-300 group/pillar text-left overflow-hidden min-w-0 flex flex-col justify-between"
                >
                  <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <div className={`p-2.5 w-fit rounded-2xl bg-gradient-to-br ${pillar.color} mb-3 border border-white/20 group-hover/pillar:scale-110 group-hover/pillar:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 flex-shrink-0`}>
                    <pillar.icon className={`w-4 h-4 ${pillar.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white mb-1 tracking-tight truncate">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug break-words">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Liquid Golden Quote */}
            <motion.div variants={itemFadeUp} className="pt-2">
              <div className="relative overflow-hidden italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)] text-base md:text-lg font-semibold border-l-4 border-amber-400/80 pl-4 py-2.5 rounded-r-2xl bg-amber-500/[0.04] backdrop-blur-md">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-amber-400/40 via-yellow-300/60 to-transparent pointer-events-none" />
                "Merging intelligent computing and human ingenuity into transformative software solutions."
              </div>
            </motion.div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};
