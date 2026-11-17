import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Award, Sparkles, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';
import { SpotlightCard } from './ui/spotlight-card';
import { staggerContainer, staggerGrid, itemFadeUp, itemPop } from '../lib/animations';
import { credentialsData, type Credential } from '../data/credentials';
import { profileData } from '../data/profile';

export const CredentialsSection: React.FC = () => {
  return (
    <section id="credentials" className="relative py-24 z-10">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        
        {/* Main Section Header with Staggered Entrance */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemPop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLOBAL PROFESSIONAL CREDENTIALS</span>
          </motion.div>

          <motion.h2 
            variants={itemFadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500">Industry Credentials</span>
          </motion.h2>
          
          <motion.p
            variants={itemFadeUp}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto"
          >
            Globally accredited certifications in Artificial Intelligence, Cloud Infrastructure, and Machine Learning from Google, IBM, and AWS.
          </motion.p>
        </motion.div>

        {/* Academic Education Highlight */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14"
        >
          <motion.div variants={itemFadeUp}>
            <SpotlightCard
              className="group relative rounded-[2.2rem] overflow-hidden backdrop-blur-2xl bg-slate-950/75 border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] transition-all duration-300"
              spotlightColor="rgba(99, 102, 241, 0.22)"
            >
              <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent pointer-events-none" />

                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="p-3.5 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex-shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                      Academic Education
                    </p>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight break-words">
                      {profileData.education.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-semibold text-cyan-300">
                        {profileData.education.institution}
                      </span>
                      <span aria-hidden="true" className="text-slate-500">·</span>
                      <span className="text-emerald-400 font-semibold">
                        {profileData.education.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>

        {/* Certifications Header & Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
            <div>
              <motion.h3 variants={itemFadeUp} className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                <Award className="w-6 h-6 text-cyan-400" />
                Global Certifications Matrix
              </motion.h3>
              <motion.p variants={itemFadeUp} className="text-xs sm:text-sm text-slate-400">
                Verified industry credentials awarded in AI, Cloud Architecture & Machine Learning.
              </motion.p>
            </div>
            
            <motion.div variants={itemPop} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>7 Verified Credentials</span>
            </motion.div>
          </div>

          {/* 7 Global Certifications Grid with Staggered Cascading */}
          <motion.div 
            variants={staggerGrid}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
          >
            {credentialsData.map((cred, idx) => (
              <motion.div key={cred.id || idx} variants={itemFadeUp} className="h-full">
                <SpotlightCard
                  className="group relative block h-full rounded-[2.2rem] overflow-hidden backdrop-blur-2xl bg-slate-950/70 border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.2)] transition-all duration-300"
                  spotlightColor="rgba(6, 182, 212, 0.25)"
                >
                  <a
                    href={cred.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between h-full p-6 sm:p-7 relative z-10"
                  >
                    <div>
                      {/* Top Specular Edge */}
                      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${cred.badgeColor}`}>
                          {cred.company}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </div>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-400 transition-colors">
                        {cred.course}
                      </h4>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span>{cred.date}</span>
                      <span className="flex items-center gap-1 font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                        <span>Verify Record</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
