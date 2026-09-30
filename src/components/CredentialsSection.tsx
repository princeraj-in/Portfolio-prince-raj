import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Award, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from './ui/spotlight-card';
import { staggerContainer, staggerGrid, itemFadeUp, itemPop } from '../lib/animations';

interface Credential {
  course: string;
  company: string;
  date: string;
  url: string;
  badgeColor: string;
  accentGradient: string;
}

const credentials: Credential[] = [
  {
    course: "Connect and Protect: Networks and Network Security",
    company: "Google",
    date: "Jan 16, 2026",
    url: "https://coursera.org/verify/4OYZNCAMLVNB",
    badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    accentGradient: "from-blue-500 to-cyan-400"
  },
  {
    course: "Machine Learning with Python",
    company: "IBM",
    date: "Dec 20, 2025",
    url: "https://coursera.org/verify/XMWSP1OIM1R2",
    badgeColor: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    accentGradient: "from-indigo-500 to-blue-500"
  },
  {
    course: "Develop Generative AI Applications: Get Started",
    company: "IBM",
    date: "Dec 12, 2025",
    url: "https://coursera.org/verify/YMFCRD9D750W",
    badgeColor: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    accentGradient: "from-indigo-500 to-purple-500"
  },
  {
    course: "AWS Artificial Intelligence Practitioner",
    company: "AWS",
    date: "Dec 11, 2025",
    url: "https://coursera.org/verify/HG4W9BZK9BLI",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    accentGradient: "from-amber-500 to-orange-500"
  },
  {
    course: "Introduction to Large Language Models",
    company: "Google Cloud",
    date: "Dec 2, 2025",
    url: "https://coursera.org/verify/0LBYP4FDCQT4",
    badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    accentGradient: "from-blue-500 to-teal-400"
  },
  {
    course: "Python for Data Science, AI & Development",
    company: "IBM",
    date: "Nov 17, 2025",
    url: "https://coursera.org/verify/TE0ACYVR0G0G",
    badgeColor: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    accentGradient: "from-indigo-500 to-cyan-400"
  },
  {
    course: "Introduction to Generative AI",
    company: "Google Cloud",
    date: "Oct 25, 2025",
    url: "https://coursera.org/verify/WYBIO9D7RH8Z",
    badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    accentGradient: "from-blue-500 to-purple-400"
  }
];

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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GLOBAL PROFESSIONAL CREDENTIALS</span>
          </motion.div>

          <motion.h2 
            variants={itemFadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight mb-4"
          >
            Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500">Industry Credentials</span>
          </motion.h2>
          
          <motion.p
            variants={itemFadeUp}
            className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto"
          >
            Globally accredited certifications in Artificial Intelligence, Cloud Infrastructure, and Machine Learning from Google, IBM, and AWS.
          </motion.p>
        </motion.div>

        {/* Certifications Header & Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-black/5 dark:border-white/10">
            <div>
              <motion.h3 variants={itemFadeUp} className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                <Award className="w-6 h-6 text-cyan-500" />
                Global Certifications Matrix
              </motion.h3>
              <motion.p variants={itemFadeUp} className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Verified industry credentials awarded in AI, Cloud Architecture & Machine Learning.
              </motion.p>
            </div>
            
            <motion.div variants={itemPop} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>7 Verified Credentials</span>
            </motion.div>
          </div>

          {/* 7 Global Certifications Grid with Staggered Cascading */}
          <motion.div 
            variants={staggerGrid}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
          >
            {credentials.map((cred, idx) => (
              <motion.div key={idx} variants={itemFadeUp} className="h-full">
                <SpotlightCard
                  className="group relative block h-full rounded-[2.2rem] overflow-hidden backdrop-blur-2xl bg-white/50 dark:bg-slate-950/60 border border-white/60 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.2)] transition-all duration-300"
                  spotlightColor="rgba(6, 182, 212, 0.25)"
                >
                  <a
                    href={cred.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full p-6 sm:p-7 flex flex-col justify-between"
                  >
                    {/* Top Specular Edge Line */}
                    <div className="absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

                    {/* Top Card Bar */}
                    <div>
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className={`p-2.5 rounded-2xl border ${cred.badgeColor} flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300`}>
                            <Award className="w-5 h-5" />
                          </div>
                          <span className={`px-3 py-1 text-xs font-extrabold rounded-xl border ${cred.badgeColor} tracking-wider`}>
                            {cred.company}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/15 border border-black/5 dark:border-white/10 transition-all duration-300 group-hover:scale-110">
                          <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                      
                      {/* Course Title */}
                      <h3 className="text-lg sm:text-xl font-extrabold dark:text-white text-slate-900 mb-3 leading-snug group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors relative z-10 tracking-tight">
                        {cred.course}
                      </h3>
                    </div>
                    
                    {/* Bottom Metadata & Liquid Verification Pill */}
                    <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                      <span className="font-semibold text-slate-500 dark:text-slate-400">{cred.date}</span>
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
