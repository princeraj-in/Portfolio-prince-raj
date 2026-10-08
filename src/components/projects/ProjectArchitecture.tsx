import React from 'react';
import { motion } from 'motion/react';
import { Layers, ShieldCheck, Zap } from 'lucide-react';
import type { ProjectData } from '../../data/projects';

interface ProjectArchitectureProps {
  project: ProjectData;
}

export const ProjectArchitecture: React.FC<ProjectArchitectureProps> = ({ project }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Architecture Flow Pipeline */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <h4 className="text-base sm:text-lg font-black text-white mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          End-to-End System Pipeline
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
          {project.detail.architectureOverview}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {project.detail.architectureSteps.map((step) => (
            <motion.div
              key={step.step}
              whileHover={{ y: -3, scale: 1.01 }}
              className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col justify-between hover:border-cyan-400/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    STEP {step.step}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    {step.tag}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white mb-1">{step.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Key Engineering Tradeoffs */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <h4 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Critical Engineering Tradeoffs
        </h4>
        <div className="space-y-4">
          {project.detail.engineeringTradeoffs.map((tradeoff, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 text-xs sm:text-sm space-y-2"
            >
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {tradeoff.title}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-red-400 block mb-1">Challenge</span>
                  {tradeoff.challenge}
                </div>
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-cyan-400 block mb-1">Architectural Decision</span>
                  {tradeoff.decision}
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 block mb-1">Production Outcome</span>
                  {tradeoff.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Security Hardening */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <h4 className="text-base sm:text-lg font-black text-white mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Security Hardening & Protection
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {project.detail.securityHardening.map((sec, idx) => (
            <li
              key={idx}
              className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-start gap-2.5 text-xs text-slate-300 font-normal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <span>{sec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
