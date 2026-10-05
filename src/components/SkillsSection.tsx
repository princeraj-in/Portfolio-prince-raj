import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { SkillsGrid } from './ui/skills-grid';
import { staggerContainer, itemFadeUp, itemPop } from '../lib/animations';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 z-10 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        
        {/* Staggered Header Animation */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.div 
            variants={itemPop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE ARSENAL & FRAMEWORKS</span>
          </motion.div>

          <motion.h2 
            variants={itemFadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Technological <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500">Arsenal</span>
          </motion.h2>

          <motion.p
            variants={itemFadeUp}
            className="text-slate-400 text-sm md:text-base max-w-xl mx-auto"
          >
            Interactive suite of industry-standard toolchains, deep learning libraries, and high-performance computing platforms.
          </motion.p>
        </motion.div>

        {/* Skills Interactive Grid with Scroll Stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={itemFadeUp}>
            <SkillsGrid />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
