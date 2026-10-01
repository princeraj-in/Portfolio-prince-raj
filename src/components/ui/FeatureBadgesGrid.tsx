import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Bot, Award, Cpu, Sparkles, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export interface FeatureBadgeItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ElementType;
  href?: string;
  gradient: string;
  glowColor: string;
}

export const defaultFeatureBadges: FeatureBadgeItem[] = [
  {
    id: 'ai-agents',
    title: 'Autonomous AI & Agents',
    subtitle: 'Multi-Agent Workflows & Neural Reasoning Systems',
    tag: 'LangGraph • CrewAI',
    icon: Bot,
    href: '#skills',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  {
    id: 'credentials',
    title: 'Verified Credentials',
    subtitle: 'Professional Certifications & Enterprise Deployments',
    tag: 'GCP • DeepLearning.AI',
    icon: Award,
    href: '#credentials',
    gradient: 'from-blue-600/20 via-indigo-500/10 to-transparent',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 'neural-arch',
    title: 'Intelligent Architectures',
    subtitle: 'High-Throughput Vector DBs & Real-Time RAG Pipelines',
    tag: 'Vector Search • LLMs',
    icon: Cpu,
    href: '#about',
    gradient: 'from-teal-500/20 via-cyan-600/10 to-transparent',
    glowColor: 'rgba(20, 184, 166, 0.4)',
  },
  {
    id: 'production-apps',
    title: 'Shipped AI Products',
    subtitle: '15+ Deployed Solutions Across Web & Autonomous Systems',
    tag: 'LensDrop • StudoLink',
    icon: Zap,
    href: '#projects',
    gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
    glowColor: 'rgba(14, 165, 233, 0.4)',
  },
];

export interface FeatureBadgesGridProps {
  className?: string;
  badges?: FeatureBadgeItem[];
}

export const FeatureBadgesGrid: React.FC<FeatureBadgesGridProps> = ({
  className = '',
  badges = defaultFeatureBadges,
}) => {
  // Container variant with sequential stagger
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  // Badge card variant: starts translated down with opacity 0
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 22,
        stiffness: 110,
        mass: 0.9,
      },
    },
  };

  return (
    <div
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-20 ${className}`}
    >
      {/* Decorative Minimalist Ambient Divider & Label */}
      <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 opacity-70">
        <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-cyan-500/40 to-cyan-500/80" />
        <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />
          Core Pillars & Expertise
        </span>
        <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent via-cyan-500/40 to-cyan-500/80" />
      </div>

      {/* Scroll-triggered staggered grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {badges.map((item) => {
          const Icon = item.icon;

          return (
            <motion.a
              key={item.id}
              href={item.href || '#'}
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.025,
                transition: { type: 'spring', stiffness: 350, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(6,182,212,0.22)] overflow-hidden cursor-pointer"
            >
              {/* Radial gradient background highlight */}
              <div
                className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${item.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                aria-hidden="true"
              />

              {/* Hover Ambient Border Glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 20px ${item.glowColor}`,
                }}
                aria-hidden="true"
              />

              {/* Header: Icon & External Link indicator */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:text-cyan-200 group-hover:border-cyan-400/80 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Icon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                    {item.tag}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>

              {/* Content: Title & Subtitle */}
              <div className="relative z-10 mt-1">
                <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 tracking-tight transition-colors flex items-center gap-1.5">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed font-sans line-clamp-2 transition-colors">
                  {item.subtitle}
                </p>
              </div>

              {/* Bottom Subtle Glowing Line Indicator */}
              <div className="relative z-10 mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400 font-medium transition-colors">
                <span>View Details</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-200">
                  →
                </span>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FeatureBadgesGrid;
