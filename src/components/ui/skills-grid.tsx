import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SiPython, SiPytorch, SiTensorflow, SiReact, SiNodedotjs, 
  SiTypescript, SiTailwindcss, SiDocker, 
  SiPostgresql, SiMongodb, SiGit, SiNextdotjs, SiCplusplus,
  SiRedis, SiLinux, SiFigma, SiGraphql
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { Sparkles, Zap, Award, CheckCircle2 } from 'lucide-react';

export type SkillCategory = 'all' | 'ai' | 'web' | 'cloud' | 'data';

export interface SkillItem {
  name: string;
  category: 'ai' | 'web' | 'cloud' | 'data';
  level: 'Expert' | 'Advanced' | 'Proficient';
  proficiency: number;
  experience: string;
  tag: string;
  description: string;
  icon: any;
  color: string;
}

export const skillsData: SkillItem[] = [
  { 
    name: 'Python', 
    category: 'ai', 
    level: 'Expert', 
    proficiency: 96,
    experience: '3+ Years / Production',
    tag: 'Autonomous AI & Backend',
    description: 'Primary computational language for AI agent pipelines, intelligent automation, and data pipelines.',
    icon: SiPython, 
    color: '#3776AB' 
  },
  { 
    name: 'PyTorch', 
    category: 'ai', 
    level: 'Advanced', 
    proficiency: 92,
    experience: 'Deep Learning R&D',
    tag: 'Custom Neural Models',
    description: 'Training and evaluating deep neural networks, transformer architectures, and reinforcement learning.',
    icon: SiPytorch, 
    color: '#EE4C2C' 
  },
  { 
    name: 'TensorFlow', 
    category: 'ai', 
    level: 'Advanced', 
    proficiency: 88,
    experience: 'Model Deployment',
    tag: 'Computer Vision & Inference',
    description: 'Constructing robust convolutional networks and optimizing edge inference runtime execution.',
    icon: SiTensorflow, 
    color: '#FF6F00' 
  },
  { 
    name: 'React', 
    category: 'web', 
    level: 'Expert', 
    proficiency: 95,
    experience: '4+ Years / Enterprise',
    tag: 'Modern 3D UI & State Flow',
    description: 'Architecting high-performance single page apps with interactive glassmorphism and state orchestration.',
    icon: SiReact, 
    color: '#61DAFB' 
  },
  { 
    name: 'Next.js', 
    category: 'web', 
    level: 'Advanced', 
    proficiency: 90,
    experience: 'Full-Stack SSR',
    tag: 'Server Components & Edge',
    description: 'Building SEO-optimized full-stack web applications with API routing, caching, and server actions.',
    icon: SiNextdotjs, 
    color: '#94A3B8' 
  },
  { 
    name: 'TypeScript', 
    category: 'web', 
    level: 'Expert', 
    proficiency: 94,
    experience: 'Strict Type Systems',
    tag: 'Scalable Architecture',
    description: 'Ensuring end-to-end type safety, generic utility structures, and clean modular codebases.',
    icon: SiTypescript, 
    color: '#3178C6' 
  },
  { 
    name: 'Node.js', 
    category: 'web', 
    level: 'Advanced', 
    proficiency: 91,
    experience: 'Backend Services',
    tag: 'REST & WebSockets',
    description: 'Developing high-throughput microservices, real-time socket connections, and async task managers.',
    icon: SiNodedotjs, 
    color: '#339933' 
  },
  { 
    name: 'Tailwind CSS', 
    category: 'web', 
    level: 'Expert', 
    proficiency: 97,
    experience: 'Design Systems',
    tag: 'Liquid Glass & Themes',
    description: 'Crafting responsive UI, fluid dark/light themes, and custom glowing animations without CSS bloat.',
    icon: SiTailwindcss, 
    color: '#06B6D4' 
  },
  { 
    name: 'Docker', 
    category: 'cloud', 
    level: 'Advanced', 
    proficiency: 89,
    experience: 'Container Workflows',
    tag: 'Microservice Deployment',
    description: 'Multi-stage Dockerfiles, compose orchestrations, and reproducible cloud environments.',
    icon: SiDocker, 
    color: '#2496ED' 
  },
  { 
    name: 'AWS', 
    category: 'cloud', 
    level: 'Advanced', 
    proficiency: 87,
    experience: 'Cloud Services & Lambda',
    tag: 'Certified Cloud Infra',
    description: 'Deploying serverless functions, S3 storage buckets, EC2 compute nodes, and IAM security.',
    icon: FaAws, 
    color: '#FF9900' 
  },
  { 
    name: 'Linux', 
    category: 'cloud', 
    level: 'Expert', 
    proficiency: 93,
    experience: 'SysAdmin & Shell',
    tag: 'Bash & Cloud Server Ops',
    description: 'Automated shell scripting, server hardening, process daemons, and low-level performance tuning.',
    icon: SiLinux, 
    color: '#FCC624' 
  },
  { 
    name: 'Git', 
    category: 'cloud', 
    level: 'Expert', 
    proficiency: 95,
    experience: 'CI/CD & Collaboration',
    tag: 'Branching & Automation',
    description: 'Advanced Git workflows, interactive rebasing, merge strategies, and GitHub Actions pipelines.',
    icon: SiGit, 
    color: '#F05032' 
  },
  { 
    name: 'PostgreSQL', 
    category: 'data', 
    level: 'Advanced', 
    proficiency: 91,
    experience: 'Relational DB & SQL',
    tag: 'ACID & Complex Queries',
    description: 'Relational schema modeling, index optimization, JSONB storage, and high-concurrency transactions.',
    icon: SiPostgresql, 
    color: '#4169E1' 
  },
  { 
    name: 'MongoDB', 
    category: 'data', 
    level: 'Proficient', 
    proficiency: 88,
    experience: 'Document Stores',
    tag: 'Aggregation Pipelines',
    description: 'Flexible schema structures, indexing strategies, and high-velocity unstructured data ingestion.',
    icon: SiMongodb, 
    color: '#47A248' 
  },
  { 
    name: 'Redis', 
    category: 'data', 
    level: 'Advanced', 
    proficiency: 90,
    experience: 'In-Memory Cache',
    tag: 'Pub/Sub & Rate Limiting',
    description: 'Sub-millisecond data caching, token bucket rate limiters, session storage, and event streams.',
    icon: SiRedis, 
    color: '#DC382D' 
  },
  { 
    name: 'C++', 
    category: 'ai', 
    level: 'Advanced', 
    proficiency: 86,
    experience: 'Algorithmic Optimization',
    tag: 'Low-Latency Computing',
    description: 'Memory management, data structures, competitive programming, and high-performance computing.',
    icon: SiCplusplus, 
    color: '#00599C' 
  },
  { 
    name: 'GraphQL', 
    category: 'web', 
    level: 'Proficient', 
    proficiency: 85,
    experience: 'API Schemas',
    tag: 'Typed Queries & Mutations',
    description: 'Client-driven querying, Apollo Federation, resolvers, and minimizing over-fetching bottlenecks.',
    icon: SiGraphql, 
    color: '#E10098' 
  },
  { 
    name: 'Figma', 
    category: 'web', 
    level: 'Advanced', 
    proficiency: 89,
    experience: 'UI/UX Prototyping',
    tag: 'Glassmorphic Systems',
    description: 'High-fidelity visual design, vector tokens, component architecture, and responsive flows.',
    icon: SiFigma, 
    color: '#F24E1E' 
  },
];

const categoryTabs = [
  { id: 'all' as SkillCategory, label: 'All Technologies', count: 18 },
  { id: 'ai' as SkillCategory, label: 'AI & Autonomous', count: 4 },
  { id: 'web' as SkillCategory, label: 'Web & Full Stack', count: 6 },
  { id: 'cloud' as SkillCategory, label: 'Cloud & DevOps', count: 4 },
  { id: 'data' as SkillCategory, label: 'Data & Systems', count: 4 },
];

export const SkillsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skillsData;
    return skillsData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full space-y-8">
      {/* Category Pills with smooth layout animation & liquid active indicator */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categoryTabs.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? 'text-white shadow-[0_0_25px_rgba(6,182,212,0.5)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-500/40 backdrop-blur-md'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSkillCategoryTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-black/30 text-cyan-200' : 'bg-white/10 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Grid of Interactive Animated Cards with Premium Logo Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -7, scale: 1.02 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="group relative p-5 sm:p-6 rounded-[2rem] bg-slate-950/80 border border-white/10 hover:border-cyan-400/50 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(6,182,212,0.25)] transition-all duration-300 text-left flex flex-col justify-between overflow-hidden"
              >
                {/* Top Specular Edge Line shining with the skill brand color */}
                <div 
                  className="absolute inset-x-6 top-0 h-[1.5px] opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, transparent, ${skill.color}, transparent)`
                  }}
                />

                {/* Luminous Ambient Corner Accent Pulsing */}
                <motion.div 
                  animate={{
                    scale: isHovered ? [1, 1.25, 1.1] : [1, 1.1, 1],
                    opacity: isHovered ? 0.45 : 0.15,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: skill.color }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3.5">
                      
                      {/* Premium Animated 3D Logo Container */}
                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-xl shadow-lg transition-all duration-300 group-hover:border-cyan-400/60 overflow-hidden shrink-0"
                        style={{
                          boxShadow: isHovered 
                            ? `0 0 25px ${skill.color}55, inset 0 0 12px ${skill.color}33` 
                            : `0 4px 15px rgba(0,0,0,0.4)`
                        }}
                      >
                        {/* Animated Rotating Conic Chromatic Halo on Hover */}
                        <motion.div 
                          className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                          style={{
                            background: `conic-gradient(from 0deg, transparent 0deg, ${skill.color} 180deg, transparent 360deg)`
                          }}
                        />

                        {/* Internal Specular Light Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                        {/* Logo Icon with Living Drop-Shadow Glow */}
                        <Icon 
                          className="w-6 h-6 relative z-10 transition-all duration-300 group-hover:scale-110" 
                          style={{ 
                            color: skill.color,
                            filter: isHovered 
                              ? `drop-shadow(0 0 10px ${skill.color})` 
                              : `drop-shadow(0 0 3px ${skill.color}66)`
                          }} 
                        />
                      </motion.div>

                      <div>
                        <h4 className="text-base font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                          <span>{skill.name}</span>
                          {isHovered && (
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                          )}
                        </h4>
                        <span className="text-[11px] font-bold text-cyan-400/80 block mt-0.5">
                          {skill.tag}
                        </span>
                      </div>
                    </div>

                    {/* Animated Proficiency Percentage Pill */}
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black text-cyan-300 font-mono shadow-[0_0_12px_rgba(6,182,212,0.2)] group-hover:border-cyan-400/60 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all shrink-0"
                    >
                      {skill.proficiency}%
                    </motion.span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {skill.description}
                  </p>
                </div>

                {/* Progress Bar & Level with Glowing Tip */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {skill.experience}
                    </span>
                    <span className="text-cyan-400 font-bold text-[11px] group-hover:text-cyan-300 transition-colors">
                      {skill.level}
                    </span>
                  </div>

                  <div className="relative w-full h-2 rounded-full bg-white/10 overflow-hidden p-[1px]">
                    <motion.div
                      className="relative h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      {/* Animated Shimmer along Progress Line */}
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
