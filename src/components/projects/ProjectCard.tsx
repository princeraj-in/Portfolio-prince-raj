import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ExternalLink,
  Github,
  ChevronRight,
  Zap,
  QrCode,
  Radio,
  Camera,
  Calculator,
  Bot,
  ShieldCheck,
  Smartphone,
  Lock,
  Sparkles,
  Building,
  MessageSquare,
  Languages,
} from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import type { ProjectData } from '../../data/projects';

interface ProjectCardProps {
  project: ProjectData;
  onOpenModal: (project: ProjectData, trigger: HTMLElement) => void;
}

// Icon mapper for dynamic metrics
const MetricIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-3.5 h-3.5' }) => {
  switch (name) {
    case 'Zap': return <Zap className={className} />;
    case 'QrCode': return <QrCode className={className} />;
    case 'Radio': return <Radio className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'Calculator': return <Calculator className={className} />;
    case 'Bot': return <Bot className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    default: return <Zap className={className} />;
  }
};

// Interactive Simulator Window for LensDrop
const LensDropSimulator: React.FC = () => (
  <div className="relative rounded-2xl p-3 sm:p-3.5 bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/90 border border-cyan-500/25 overflow-hidden shadow-inner">
    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 gap-2 min-w-0">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono tracking-tight shadow-sm min-w-0 max-w-[180px] sm:max-w-none">
        <Lock className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
        <span className="font-semibold truncate">lensdrop.imprince.me</span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 flex-shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="hidden sm:inline font-mono">Live Sync</span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 min-w-0">
      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-cyan-500/25 flex flex-col justify-between hover:border-cyan-400/50 transition-colors min-w-0">
        <div className="flex items-center justify-between mb-1 gap-1">
          <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
            <QrCode className="w-3.5 h-3.5" />
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-[8px] font-black text-cyan-300 uppercase tracking-wider font-mono flex-shrink-0">
            0 Install
          </span>
        </div>
        <div className="min-w-0 mt-1">
          <p className="text-[10px] font-bold text-white truncate">Instant QR Guest Ingestion</p>
          <p className="text-[8px] text-slate-400 font-mono flex items-center gap-1 mt-0.5 truncate">
            <Sparkles className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
            <span className="truncate">Browser Native Camera Scan</span>
          </p>
        </div>
      </div>
      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-blue-500/25 flex flex-col justify-between hover:border-blue-400/50 transition-colors min-w-0">
        <div className="flex items-center justify-between mb-1 gap-1">
          <div className="p-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
            <Radio className="w-3.5 h-3.5" />
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-blue-500/15 text-[8px] font-black text-blue-300 uppercase tracking-wider font-mono flex-shrink-0">
            ~120ms
          </span>
        </div>
        <div className="min-w-0 mt-1">
          <p className="text-[10px] font-bold text-white truncate">Live Projector Wall Feed</p>
          <p className="text-[8px] text-slate-400 font-mono flex items-center gap-1 mt-0.5 truncate">
            <Zap className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">Real-Time Reception Stream</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Interactive Simulator Window for Studolink
const StudolinkSimulator: React.FC = () => (
  <div className="relative rounded-2xl p-3 sm:p-3.5 bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/90 border border-emerald-500/25 overflow-hidden shadow-inner">
    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 gap-2 min-w-0">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono tracking-tight shadow-sm min-w-0 max-w-[180px] sm:max-w-none">
        <Lock className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
        <span className="font-semibold truncate">studolink.imprince.me</span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 flex-shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="hidden sm:inline font-mono">PWA Live</span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 min-w-0">
      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-400/60 transition-colors min-w-0">
        <div className="flex items-center justify-between mb-1 gap-1">
          <div className="p-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex-shrink-0 flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-extrabold text-emerald-300">AI Mitra</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-[8px] font-black text-cyan-300 uppercase tracking-wider font-mono flex-shrink-0 border border-cyan-500/30">
            Gemini AI
          </span>
        </div>
        <div className="min-w-0 mt-1">
          <p className="text-[10px] font-bold text-white truncate">Local Safety & Living Guide</p>
          <p className="text-[8px] text-emerald-300 font-mono flex items-center gap-1 mt-0.5 truncate">
            <Sparkles className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0 animate-pulse" />
            <span className="truncate">Hindi & English Assistant</span>
          </p>
        </div>
      </div>
      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-teal-500/25 flex flex-col justify-between hover:border-teal-400/50 transition-colors min-w-0">
        <div className="flex items-center justify-between mb-1 gap-1">
          <div className="p-1 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 flex-shrink-0">
            <Building className="w-3.5 h-3.5" />
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-[8px] font-black text-emerald-300 uppercase tracking-wider font-mono flex-shrink-0">
            ₹0 Broker
          </span>
        </div>
        <div className="min-w-0 mt-1">
          <p className="text-[10px] font-bold text-white truncate">Smart PG & Mess Search</p>
          <p className="text-[8px] text-slate-400 font-mono flex items-center gap-1 mt-0.5 truncate">
            <ShieldCheck className="w-2.5 h-2.5 text-teal-400 flex-shrink-0" />
            <span className="truncate">Verified Badges & 1:1 Chat</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleCaseStudyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpenModal(project, e.currentTarget);
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col min-w-0 w-full"
    >
      <SpotlightCard
        className="relative group h-full rounded-3xl sm:rounded-[2.4rem] overflow-hidden flex flex-col p-5 sm:p-7 md:p-8 bg-slate-950/85 border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-3xl transition-all duration-500 hover:border-cyan-400/50 min-w-0"
        spotlightColor={project.spotlightColor}
      >
        {/* Luminous Ambient Glow */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${project.accentGradient} rounded-3xl sm:rounded-[2.4rem] blur-2xl opacity-15 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none`}
        />
        <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

        {/* Top Interactive Simulator Preview */}
        <div className="relative mb-4 sm:mb-5 min-w-0">
          {project.id === 'lensdrop' ? <LensDropSimulator /> : <StudolinkSimulator />}
        </div>

        {/* System Type & Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 min-w-0 font-mono text-xs">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="text-slate-400 uppercase tracking-widest font-bold text-[10px] truncate">
              {project.category}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider font-mono bg-white/10 text-cyan-300 border border-white/15 flex-shrink-0">
            {project.typeBadge}
          </span>
        </div>

        {/* Project Name & Tagline */}
        <div className="mb-3 min-w-0">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors break-words">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mt-1 leading-snug break-words">
            {project.tagline}
          </p>
        </div>

        {/* Short Highlights */}
        <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed font-normal break-words">
          {project.description}
        </p>

        {/* Performance & Architectural Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-5 p-3 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-md min-w-0">
          {project.keyMetrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col justify-center p-2 rounded-xl bg-slate-950/60 border border-white/5 min-w-0">
              <div className="flex items-center gap-1.5 text-cyan-400 mb-0.5 min-w-0">
                <MetricIcon name={metric.iconName} className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold truncate">
                  {metric.label}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate">
                {metric.value}
              </span>
              <span className="text-[9px] text-slate-400 font-mono truncate">
                {metric.subtext}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6 min-w-0 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono tracking-tight bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-white/10 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 hover:text-white border border-cyan-500/35 hover:border-cyan-400 text-xs font-bold transition-all shadow-sm cursor-pointer"
              aria-label={`Launch ${project.name} live platform`}
            >
              <span>Live Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
              aria-label={`View ${project.name} source code on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

          <button
            onClick={handleCaseStudyClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-extrabold transition-all group-hover:border-cyan-400/50 cursor-pointer ml-auto"
            aria-label={`View full architectural case study for ${project.name}`}
          >
            <span>Full Case Study</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};
