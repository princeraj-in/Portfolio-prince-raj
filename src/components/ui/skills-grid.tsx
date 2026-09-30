import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SiPython, SiPytorch, SiTensorflow, SiReact, SiNodedotjs, 
  SiTypescript, SiTailwindcss, SiDocker, 
  SiPostgresql, SiMongodb, SiGit, SiNextdotjs, SiCplusplus,
  SiRedis, SiLinux, SiFigma, SiGraphql
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { Sparkles, Zap, Award, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

export type SkillCategory = 'all' | 'ai' | 'web' | 'cloud' | 'data';

export interface SkillItem {
  name: string;
  category: 'ai' | 'web' | 'cloud' | 'data';
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Specialist';
  proficiency: number; // 0 - 100%
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
    description: 'Flexible schema structures, indexing strategies, and high-velocity un-structured data ingestion.',
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
    description: 'Design systems, auto-layout architectures, interactive component states, and modern design tokens.',
    icon: SiFigma, 
    color: '#F24E1E' 
  },
];

const categories: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Arsenal (18)' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'web', label: 'Web & Full Stack' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'data', label: 'Databases & Performance' },
];

const SkillCard: React.FC<{ skill: SkillItem; index: number; isSelected?: boolean; onSelect?: () => void }> = ({ 
  skill, 
  index,
  isSelected = false,
  onSelect
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const active = isHovered || isSelected;
  const duration = 4 + (index % 4) * 0.4;
  const yOffset = index % 2 === 0 ? [-4, 4, -4] : [4, -4, 4];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3 }}
      className="relative flex items-center justify-center p-2"
    >
      <motion.div
        animate={{ y: active ? 0 : yOffset }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
        className="relative group cursor-pointer"
      >
        {/* Dynamic Rich Hover/Active Tooltip */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: -95, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none w-72 sm:w-80"
            >
              <div 
                className="p-4 rounded-2xl backdrop-blur-3xl border shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(2,6,23,0.98) 100%)`,
                  borderColor: `${skill.color}90`,
                  boxShadow: `0 20px 45px -5px ${skill.color}60, inset 0 0 20px ${skill.color}25, inset 0 1px 1.5px rgba(255,255,255,0.4)` 
                }}
              >
                {/* Top Glowing Sheen Line */}
                <div 
                  className="absolute inset-x-3 top-0 h-[1.5px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
                />

                {/* Header with Title & Level Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] animate-pulse" 
                      style={{ backgroundColor: skill.color }} 
                    />
                    <span className="font-extrabold text-sm text-white tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border"
                    style={{ 
                      backgroundColor: `${skill.color}20`,
                      borderColor: `${skill.color}60`,
                      color: skill.color === '#FCC624' ? '#FDE047' : skill.color
                    }}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Proficiency Meter with Animated Bar */}
                <div className="space-y-1.5 my-2.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      Proficiency Rating
                    </span>
                    <span className="font-extrabold text-white">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${skill.color}, #06b6d4)`,
                        boxShadow: `0 0 10px ${skill.color}`
                      }}
                    />
                  </div>
                </div>

                {/* Brief Technology Narrative */}
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal mb-2">
                  {skill.description}
                </p>

                {/* Experience & Core Focus Footer */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-cyan-300 font-medium">
                    {skill.tag}
                  </span>
                  <span className="text-slate-400 font-semibold">
                    {skill.experience}
                  </span>
                </div>
              </div>

              {/* Tooltip Downward Bevel Arrow */}
              <div 
                className="w-3 h-3 rotate-45 mx-auto -mt-1.5 border-r border-b"
                style={{ 
                  backgroundColor: 'rgba(2,6,23,0.98)', 
                  borderColor: `${skill.color}90` 
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer Liquid Aura Glow on Hover / Interaction */}
        <div 
          className={`absolute -inset-4 rounded-[2.5rem] blur-2xl transition-all duration-500 pointer-events-none ${
            active ? 'scale-125 opacity-95' : 'scale-75 opacity-0'
          }`}
          style={{ backgroundColor: `${skill.color}60` }}
        />
        
        {/* 3D Liquid Glass Node Card */}
        <motion.div 
          whileHover={{ scale: 1.15, y: -8 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          className={`relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl backdrop-blur-3xl border transition-all duration-300 z-10 overflow-hidden ${
            active 
              ? 'bg-white/95 dark:bg-slate-900/90 shadow-2xl scale-105' 
              : 'bg-white/70 dark:bg-slate-950/65 border-white/60 dark:border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.45)]'
          }`}
          style={{
            borderColor: active ? `${skill.color}95` : undefined,
            boxShadow: active 
              ? `0 20px 40px -5px ${skill.color}75, inset 0 1px 2px rgba(255,255,255,0.9), inset 0 0 25px ${skill.color}35` 
              : undefined,
          }}
        >
          {/* Inner Frosted Prismatic Borders */}
          <div className="absolute inset-0 rounded-3xl border-[1.5px] border-white/80 dark:border-white/20 opacity-70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent dark:from-white/15 dark:via-transparent dark:to-transparent pointer-events-none rounded-3xl" />
          
          {/* Liquid Shimmer on Hover */}
          {active && (
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Icon with Brand Glow */}
          <skill.icon 
            className="w-10 h-10 sm:w-11 sm:h-11 transition-all duration-300 relative z-10"
            style={{ 
              color: active ? skill.color : undefined,
              filter: active ? `drop-shadow(0 0 15px ${skill.color})` : 'grayscale(15%)',
            }}
          />

          {/* Skill Title Sub-Label */}
          <span className="mt-2 text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-tight transition-colors group-hover:text-slate-950 dark:group-hover:text-white relative z-10">
            {skill.name}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const SkillsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skillsData;
    return skillsData.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative w-full py-4">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-20">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSkillName(null);
              }}
              className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 backdrop-blur-xl ${
                isActive
                  ? 'text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'bg-white/40 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-black/5 dark:border-white/10 hover:bg-white/70 dark:hover:bg-slate-900/70'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat.id === 'all' && <Sparkles className="w-3.5 h-3.5" />}
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Interactive Skill Tags Strip with Live Glowing Interaction */}
      <div className="mb-12 relative z-20">
        <div className="text-center mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Interactive Skill Tags (Click / Hover to Inspect Proficiency)
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-2">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkillName === skill.name;
            return (
              <motion.button
                key={`tag-${skill.name}`}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSkillName(isSelected ? null : skill.name)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 backdrop-blur-2xl border overflow-hidden ${
                  isSelected
                    ? 'text-white border-transparent'
                    : 'bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-white/60 dark:border-white/10 hover:border-cyan-400/50'
                }`}
                style={{
                  boxShadow: isSelected 
                    ? `0 0 20px ${skill.color}80` 
                    : undefined,
                  background: isSelected 
                    ? `linear-gradient(135deg, ${skill.color}, #06b6d4)`
                    : undefined
                }}
              >
                {/* Glowing Background on Tag Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none rounded-full"
                  style={{ backgroundColor: skill.color }}
                />

                <skill.icon 
                  className="w-3.5 h-3.5 transition-transform group-hover:scale-110" 
                  style={{ color: isSelected ? '#FFFFFF' : skill.color }} 
                />
                <span>{skill.name}</span>
                <span 
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:text-cyan-400'
                  }`}
                >
                  {skill.proficiency}%
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3D Liquid Glass Grid Matrix */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-4 place-items-center max-w-6xl mx-auto relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index} 
              isSelected={selectedSkillName === skill.name}
              onSelect={() => setSelectedSkillName(selectedSkillName === skill.name ? null : skill.name)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
