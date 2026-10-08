import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import type { ProjectData } from '../../data/projects';
import { ProjectArchitecture } from './ProjectArchitecture';

interface ProjectDetailModalProps {
  project: ProjectData;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  triggerElement,
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'architecture' | 'stack'>('overview');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. Save previous focus target
    const prevFocused = triggerElement || (document.activeElement as HTMLElement | null);

    // 2. Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 3. Move initial focus into modal
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 4. Keyboard trap and Escape listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // 5. Return focus to trigger button
      if (prevFocused && typeof prevFocused.focus === 'function') {
        prevFocused.focus();
      }
    };
  }, [onClose, triggerElement]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Content Container */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 25 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl sm:rounded-[2.5rem] bg-slate-950/95 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-3xl overflow-hidden my-auto"
      >
        {/* Top Prismatic Header Line */}
        <div className={`absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r ${project.accentGradient}`} />

        {/* Modal Sticky Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 shrink-0 bg-slate-950/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-lg"
              style={{ backgroundColor: project.accentColor }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 id="project-modal-title" className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
                  {project.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono tracking-wider bg-white/10 text-cyan-300 border border-white/15">
                  {project.typeBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium truncate mt-0.5">
                {project.tagline}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-3"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Project details sections"
          className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-slate-900/50 border-b border-white/10 shrink-0 overflow-x-auto text-xs font-bold"
        >
          <button
            role="tab"
            aria-selected={activeModalTab === 'overview'}
            onClick={() => setActiveModalTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeModalTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            System Overview
          </button>
          <button
            role="tab"
            aria-selected={activeModalTab === 'architecture'}
            onClick={() => setActiveModalTab('architecture')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeModalTab === 'architecture'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Architecture & Tradeoffs
          </button>
          <button
            role="tab"
            aria-selected={activeModalTab === 'stack'}
            onClick={() => setActiveModalTab('stack')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeModalTab === 'stack'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Stack Breakdown
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
          {/* Tab 1: Overview */}
          {activeModalTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20">
                  <h4 className="text-xs font-black uppercase tracking-wider text-red-400 mb-2 font-mono flex items-center gap-1.5">
                    <span>THE SYSTEM CHALLENGE</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {project.detail.problem}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-2 font-mono flex items-center gap-1.5">
                    <span>THE ARCHITECTURAL SOLUTION</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {project.detail.solution}
                  </p>
                </div>
              </div>

              {/* Core Capabilities */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
                <h4 className="text-sm font-black uppercase tracking-wider text-cyan-400 mb-4 font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>CORE PRODUCTION CAPABILITIES</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.detail.coreCapabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-normal">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real World Use Cases */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
                <h4 className="text-sm font-black uppercase tracking-wider text-purple-400 mb-3 font-mono flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>PRODUCTION USE CASES</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {project.detail.realWorldUseCases.map((uc, i) => (
                    <li key={i} className="flex items-center gap-2 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture & Tradeoffs */}
          {activeModalTab === 'architecture' && (
            <ProjectArchitecture project={project} />
          )}

          {/* Tab 3: Tech Stack Breakdown */}
          {activeModalTab === 'stack' && (
            <div className="space-y-6">
              {project.detail.techStackBreakdown.map((group, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                  <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400 mb-3 font-mono">
                    {group.category}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col justify-between"
                      >
                        <span className="text-xs font-bold text-white">{skill.name}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 font-normal">{skill.purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6 bg-slate-950 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all border border-white/15 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-extrabold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <span>Launch Live Production</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
