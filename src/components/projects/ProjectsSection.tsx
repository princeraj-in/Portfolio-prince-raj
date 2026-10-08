import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2 } from 'lucide-react';
import { staggerContainer, itemFadeUp, itemPop } from '../../lib/animations';
import { projectsData, type ProjectData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const handleOpenModal = (project: ProjectData, trigger: HTMLElement) => {
    setSelectedProject(project);
    setTriggerEl(trigger);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-16 sm:py-24 z-10 overflow-hidden">
      {/* Dynamic Background Light Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,rgba(16,185,129,0.04)_40%,transparent_70%)] pointer-events-none" />

      <div className="container px-4 sm:px-6 mx-auto max-w-6xl relative z-10 min-w-0">
        {/* Staggered Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-10 sm:mb-14 min-w-0"
        >
          <motion.div
            variants={itemPop}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black uppercase tracking-wider text-cyan-400 mb-3 sm:mb-4 shadow-[0_0_25px_rgba(6,182,212,0.2)]"
          >
            <FolderGit2 className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
            <span>FEATURED PRODUCTION PLATFORMS</span>
          </motion.div>

          <motion.h2
            variants={itemFadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3 sm:mb-4 break-words"
          >
            Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">Deployments</span>
          </motion.h2>

          <motion.p
            variants={itemFadeUp}
            className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2 leading-relaxed font-medium break-words"
          >
            High-impact, production-grade cloud architectures built for real-world reliability, instant user onboarding, and sub-second performance.
          </motion.p>
        </motion.div>

        {/* Dual Project Cards Showcase - Both Simultaneously Visible & Zoom Stable */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch min-w-0"
        >
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={handleOpenModal}
            />
          ))}
        </motion.div>
      </div>

      {/* Accessible Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={handleCloseModal}
            triggerElement={triggerEl}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
