import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Zap, ShieldCheck, Flame, CheckCircle2, X, Sparkles, Maximize2
} from 'lucide-react';
import {
  PythonLogo,
  PyTorchLogo,
  TensorFlowLogo,
  CppLogo,
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  NodejsLogo,
  TailwindLogo,
  GraphQlLogo,
  FigmaLogo,
  DockerLogo,
  AwsLogo,
  LinuxLogo,
  GitLogo,
  PostgreSqlLogo,
  MongoDbLogo,
  RedisLogo,
} from './BrandLogos';

export type SkillCategory = 'all' | 'ai' | 'web' | 'cloud' | 'data';

export interface SkillItem {
  id: string;
  name: string;
  category: 'ai' | 'web' | 'cloud' | 'data';
  level: 'Expert' | 'Advanced' | 'Proficient';
  proficiency: number;
  experience: string;
  tag: string;
  description: string;
  highlights: string[];
  LogoComponent: React.FC<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  glowColor: string;
}

export const skillsData: SkillItem[] = [
  { 
    id: 'python',
    name: 'Python', 
    category: 'ai', 
    level: 'Expert', 
    proficiency: 96,
    experience: '3+ Years / Production',
    tag: 'Autonomous AI & Backend Engines',
    description: 'Primary computational language for AI agent pipelines, multi-model orchestrations, and high-throughput data processing.',
    highlights: ['Multi-Agent Systems', 'FastAPI & AsyncIO', 'Vector Embeddings', 'Model Fine-tuning'],
    LogoComponent: PythonLogo, 
    color: '#387EB8',
    glowColor: 'rgba(56, 126, 184, 0.5)',
  },
  { 
    id: 'pytorch',
    name: 'PyTorch', 
    category: 'ai', 
    level: 'Advanced', 
    proficiency: 92,
    experience: 'Deep Learning R&D',
    tag: 'Custom Neural Architectures',
    description: 'Developing, training, and testing deep neural networks, transformer blocks, and customized loss gradients.',
    highlights: ['Transformer Fine-Tuning', 'TorchVision Pipelines', 'CUDA Acceleration', 'Gradient Optimization'],
    LogoComponent: PyTorchLogo, 
    color: '#EE4C2C',
    glowColor: 'rgba(238, 76, 44, 0.5)',
  },
  { 
    id: 'tensorflow',
    name: 'TensorFlow', 
    category: 'ai', 
    level: 'Advanced', 
    proficiency: 88,
    experience: 'Model Deployment',
    tag: 'Computer Vision & Edge Runtime',
    description: 'Constructing robust convolutional networks, model quantization, and optimizing edge inference runtime execution.',
    highlights: ['TF Lite Edge AI', 'TensorRT Quantization', 'Model Serving', 'Image Classification'],
    LogoComponent: TensorFlowLogo, 
    color: '#FF6F00',
    glowColor: 'rgba(255, 111, 0, 0.5)',
  },
  { 
    id: 'cpp',
    name: 'C++', 
    category: 'ai', 
    level: 'Advanced', 
    proficiency: 86,
    experience: 'Low-Level Optimization',
    tag: 'High-Performance & Algorithms',
    description: 'Memory management, low-latency concurrent processing, custom data structures, and algorithmic optimization.',
    highlights: ['Pointer & Memory Safety', 'STL Optimization', 'Concurrency & Threads', 'Algorithmic Speed'],
    LogoComponent: CppLogo, 
    color: '#00599C',
    glowColor: 'rgba(0, 89, 156, 0.5)',
  },
  { 
    id: 'react',
    name: 'React', 
    category: 'web', 
    level: 'Expert', 
    proficiency: 95,
    experience: '4+ Years / Enterprise',
    tag: 'Modern 3D UI & State Orchestration',
    description: 'Architecting high-performance single page apps with interactive glassmorphism, 3D WebGL scenes, and strict state flow.',
    highlights: ['Framer Motion & Canvas', 'Custom Hooks Engine', 'Performance Profiling', 'Glassmorphism Design'],
    LogoComponent: ReactLogo, 
    color: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.5)',
  },
  { 
    id: 'nextjs',
    name: 'Next.js', 
    category: 'web', 
    level: 'Advanced', 
    proficiency: 90,
    experience: 'Full-Stack SSR',
    tag: 'Server Components & Edge Caching',
    description: 'Building SEO-optimized full-stack web applications with API routing, incremental static regeneration, and server actions.',
    highlights: ['App Router Architecture', 'Edge Middleware', 'Dynamic Streaming', 'SEO & OG Automation'],
    LogoComponent: NextjsLogo, 
    color: '#F8FAFC',
    glowColor: 'rgba(248, 250, 252, 0.5)',
  },
  { 
    id: 'typescript',
    name: 'TypeScript', 
    category: 'web', 
    level: 'Expert', 
    proficiency: 94,
    experience: 'Strict Type Systems',
    tag: 'Type-Safe Architecture',
    description: 'Ensuring end-to-end type safety, generic utility structures, and clean modular codebases across front and backend.',
    highlights: ['Generic Constraints', 'Zod Schema Validation', 'Strict Null Checks', 'API Type Contracts'],
    LogoComponent: TypeScriptLogo, 
    color: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.5)',
  },
  { 
    id: 'nodejs',
    name: 'Node.js', 
    category: 'web', 
    level: 'Advanced', 
    proficiency: 91,
    experience: 'Backend Microservices',
    tag: 'REST & Real-Time WebSockets',
    description: 'Developing high-throughput microservices, event-driven async workers, streaming APIs, and session management.',
    highlights: ['Express / Fastify', 'Streaming SSE & Sockets', 'JWT Auth Systems', 'Cluster Workers'],
    LogoComponent: NodejsLogo, 
    color: '#5FA04E',
    glowColor: 'rgba(95, 160, 78, 0.5)',
  },
  { 
    id: 'tailwindcss',
    name: 'Tailwind CSS', 
    category: 'web', 
    level: 'Expert', 
    proficiency: 97,
    experience: 'Design Systems',
    tag: 'Liquid Glass & Fluid Themes',
    description: 'Crafting responsive UI, fluid dark/light themes, and custom glowing animations without CSS bloat or runtime overhead.',
    highlights: ['Liquid Glassmorphism', 'Custom Cyber Radii', 'Fluid Typography', 'Micro-Interactions'],
    LogoComponent: TailwindLogo, 
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
  },
  { 
    id: 'graphql',
    name: 'GraphQL', 
    category: 'web', 
    level: 'Proficient', 
    proficiency: 85,
    experience: 'API Schemas',
    tag: 'Typed Queries & Resolvers',
    description: 'Client-driven declarative querying, schema federation, resolvers, and eliminating network over-fetching bottlenecks.',
    highlights: ['Apollo Client/Server', 'Schema Directives', 'Subscription Channels', 'Query Batching'],
    LogoComponent: GraphQlLogo, 
    color: '#E10098',
    glowColor: 'rgba(225, 0, 152, 0.5)',
  },
  { 
    id: 'figma',
    name: 'Figma', 
    category: 'web', 
    level: 'Advanced', 
    proficiency: 89,
    experience: 'UI/UX Prototyping',
    tag: 'Glassmorphic Design Systems',
    description: 'High-fidelity visual design, vector tokens, interactive wireframes, and design-to-code component architecture.',
    highlights: ['Design Tokens', 'Spatial UI Prototyping', 'Auto-Layout Components', 'Dark Hologram Themes'],
    LogoComponent: FigmaLogo, 
    color: '#F24E1E',
    glowColor: 'rgba(242, 78, 30, 0.5)',
  },
  { 
    id: 'docker',
    name: 'Docker', 
    category: 'cloud', 
    level: 'Advanced', 
    proficiency: 89,
    experience: 'Container Workflows',
    tag: 'Reproducible Cloud Deployments',
    description: 'Multi-stage Dockerfiles, compose orchestrations, container hardening, and lightweight production images.',
    highlights: ['Multi-Stage Builds', 'Compose Networks', 'Zero-Downtime Swaps', 'Volume Isolation'],
    LogoComponent: DockerLogo, 
    color: '#2496ED',
    glowColor: 'rgba(36, 150, 237, 0.5)',
  },
  { 
    id: 'aws',
    name: 'AWS', 
    category: 'cloud', 
    level: 'Advanced', 
    proficiency: 87,
    experience: 'Cloud Services & Lambda',
    tag: 'Scalable Infrastructure',
    description: 'Deploying serverless functions, S3 storage buckets, EC2 compute nodes, CloudFront CDNs, and IAM security policies.',
    highlights: ['AWS Lambda & API Gateway', 'S3 Asset Buckets', 'CloudWatch Logging', 'IAM Role Hardening'],
    LogoComponent: AwsLogo, 
    color: '#FF9900',
    glowColor: 'rgba(255, 153, 0, 0.5)',
  },
  { 
    id: 'linux',
    name: 'Linux', 
    category: 'cloud', 
    level: 'Expert', 
    proficiency: 93,
    experience: 'SysAdmin & Shell',
    tag: 'Bash & Server Operations',
    description: 'Automated shell scripting, daemon supervision (systemd), SSH hardening, process isolation, and low-level performance tuning.',
    highlights: ['Systemd Daemons', 'Bash Automations', 'Firewall & UFW', 'Resource Monitoring'],
    LogoComponent: LinuxLogo, 
    color: '#F5BA13',
    glowColor: 'rgba(245, 186, 19, 0.5)',
  },
  { 
    id: 'git',
    name: 'Git', 
    category: 'cloud', 
    level: 'Expert', 
    proficiency: 95,
    experience: 'CI/CD & Collaboration',
    tag: 'GitOps & Actions Pipelines',
    description: 'Advanced Git workflows, interactive rebasing, trunk-based development, and automated GitHub Actions pipelines.',
    highlights: ['GitHub Actions CI/CD', 'Automated Test Runners', 'Semantic Versioning', 'Branch Protection'],
    LogoComponent: GitLogo, 
    color: '#F05032',
    glowColor: 'rgba(240, 80, 50, 0.5)',
  },
  { 
    id: 'postgresql',
    name: 'PostgreSQL', 
    category: 'data', 
    level: 'Advanced', 
    proficiency: 91,
    experience: 'Relational DB & SQL',
    tag: 'ACID & Vector Storage',
    description: 'Relational schema modeling, index optimization (B-Tree, GIN, pgvector), JSONB structures, and transactions.',
    highlights: ['pgvector Embeddings', 'Query Plan Analysis (EXPLAIN)', 'Composite Indexing', 'ACID Transactions'],
    LogoComponent: PostgreSqlLogo, 
    color: '#336791',
    glowColor: 'rgba(51, 103, 145, 0.5)',
  },
  { 
    id: 'mongodb',
    name: 'MongoDB', 
    category: 'data', 
    level: 'Proficient', 
    proficiency: 88,
    experience: 'Document Stores',
    tag: 'Aggregation Pipelines & JSON',
    description: 'Flexible schema structures, indexing strategies, multi-stage aggregation pipelines, and high-velocity data ingestion.',
    highlights: ['Aggregation Framework', 'Compound Indexes', 'Change Streams', 'Atlas Cloud Clusters'],
    LogoComponent: MongoDbLogo, 
    color: '#13AA52',
    glowColor: 'rgba(19, 170, 82, 0.5)',
  },
  { 
    id: 'redis',
    name: 'Redis', 
    category: 'data', 
    level: 'Advanced', 
    proficiency: 90,
    experience: 'In-Memory Cache',
    tag: 'Sub-Millisecond Caching & Queues',
    description: 'Sub-millisecond data caching, token bucket rate limiters, session stores, pub/sub broadcasting, and background job queues.',
    highlights: ['Token Bucket Limiting', 'Pub/Sub Messaging', 'In-Memory Key/Value', 'TTL Eviction Policies'],
    LogoComponent: RedisLogo, 
    color: '#DC382D',
    glowColor: 'rgba(220, 56, 45, 0.5)',
  },
];

const categoryTabs = [
  { id: 'all' as SkillCategory, label: 'All Technologies', count: 18 },
  { id: 'ai' as SkillCategory, label: 'AI & Autonomous', count: 4 },
  { id: 'web' as SkillCategory, label: 'Web & Full Stack', count: 6 },
  { id: 'cloud' as SkillCategory, label: 'Cloud & DevOps', count: 4 },
  { id: 'data' as SkillCategory, label: 'Data & Systems', count: 4 },
];

// Fluid Animated Counter for Live Percentage
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 750;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quintic ease out
      const ease = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.round(ease * value));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [value]);

  return <span>{current}</span>;
};

// Pure Floating Authentic Brand Logo
interface FloatingBrandLogoProps {
  skill: SkillItem;
  isSelected: boolean;
  onHover: () => void;
  onSelect: () => void;
  index: number;
}

const FloatingBrandLogo: React.FC<FloatingBrandLogoProps> = ({
  skill,
  isSelected,
  onHover,
  onSelect,
  index,
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const Logo = skill.LogoComponent;

  // 3D Magnetic Cursor Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 280, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), { stiffness: 280, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Organic continuous floating bobbing wave
  const floatDelay = (index % 5) * 0.35;
  const floatDuration = 3.4 + (index % 4) * 0.45;

  return (
    <motion.div
      ref={logoRef}
      layout
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -8, 0] 
      }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        y: { 
          duration: floatDuration, 
          repeat: Infinity, 
          ease: 'easeInOut', 
          delay: floatDelay 
        },
      }}
      whileHover={{ scale: 1.15, zIndex: 30 }}
      whileTap={{ scale: 0.94 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHover}
      onClick={onSelect}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col items-center justify-center cursor-pointer select-none py-3 px-2 sm:px-3"
    >
      {/* 3D Floating Standalone Authentic Logo (No Circular Frame) */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex items-center justify-center p-2 sm:p-3 transition-all duration-300"
      >
        {/* Soft Ambient Light Halo Behind Floating Logo */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl pointer-events-none -z-10"
          style={{ backgroundColor: skill.glowColor }}
        />

        {isSelected && (
          <motion.div 
            layoutId="selectedGlowAura"
            className="absolute -inset-2 rounded-full opacity-60 blur-xl pointer-events-none -z-10"
            style={{ backgroundColor: skill.glowColor }}
          />
        )}

        {/* Real Authentic Multi-Color Vector Logo */}
        <div 
          style={{ 
            transform: 'translateZ(26px)',
            filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.55))'
          }}
          className="transition-all duration-300 group-hover:scale-105"
        >
          <Logo className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
        </div>
      </motion.div>

      {/* Technology Name & Minimal Active Indicator */}
      <div 
        style={{ transform: 'translateZ(16px)' }}
        className="mt-1 text-center flex flex-col items-center"
      >
        <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors tracking-tight">
          {skill.name}
        </span>
        
        {/* Subtle glowing indicator line when selected */}
        {isSelected ? (
          <motion.div
            layoutId="activeUnderline"
            className="w-5 h-0.5 rounded-full mt-1 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
          />
        ) : (
          <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-slate-700/60 group-hover:bg-cyan-400 transition-colors" />
        )}
      </div>
    </motion.div>
  );
};

export const SkillsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skillsData[0]);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPopUpOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skillsData;
    return skillsData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const SelectedLogo = selectedSkill.LogoComponent;

  return (
    <div className="w-full space-y-10 select-none">
      
      {/* Category Tabs: Clean, Centered Liquid Glass Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
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
                  ? 'text-white shadow-[0_0_25px_rgba(6,182,212,0.45)]'
                  : 'bg-slate-900/50 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFloatingCategoryTab"
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

      {/* Floating Logos Matrix + Side Preview HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN (7 Cols): Floating Standalone Real Colored Logos */}
        <div className="lg:col-span-7">
          <div className="relative p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-slate-950/70 via-slate-900/40 to-slate-950/80 border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden">
            
            {/* Dynamic Room Ambient Halo */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[130px] opacity-25 pointer-events-none transition-colors duration-700 -z-10"
              style={{ backgroundColor: selectedSkill.color }}
            />

            {/* Grid of Pure Floating 3D Logos (Clicking opens the smooth liquid pop-up on both desktop & mobile) */}
            <motion.div 
              layout
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6 justify-items-center items-center"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <FloatingBrandLogo
                    key={skill.id}
                    skill={skill}
                    index={index}
                    isSelected={selectedSkill.id === skill.id}
                    onHover={() => setSelectedSkill(skill)}
                    onSelect={() => {
                      setSelectedSkill(skill);
                      setIsPopUpOpen(true);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Desktop Ambient Liquid Glass Dock Card */}
        <div className="hidden lg:block lg:col-span-5 sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-7 sm:p-8 rounded-[2.5rem] bg-slate-950/80 border border-white/20 backdrop-blur-3xl shadow-[0_25px_65px_rgba(0,0,0,0.8)] overflow-hidden group cursor-pointer"
              onClick={() => setIsPopUpOpen(true)}
              style={{
                boxShadow: `0 30px 70px rgba(0,0,0,0.9), 0 0 45px ${selectedSkill.color}25`
              }}
            >
              {/* Animated Liquid Conic Edge Border */}
              <div className="absolute inset-0 rounded-[2.5rem] p-[1.5px] pointer-events-none overflow-hidden -z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                  className="w-[200%] h-[200%] -top-1/2 -left-1/2 absolute"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, ${selectedSkill.color} 80deg, #22d3ee 160deg, transparent 240deg)`
                  }}
                />
              </div>

              {/* Liquid Organic Morphing Aura Blob */}
              <motion.div 
                animate={{
                  borderRadius: [
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                    '40% 60% 70% 30% / 50% 60% 30% 60%',
                    '60% 40% 30% 70% / 60% 30% 70% 40%'
                  ],
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-16 -right-16 w-60 h-60 blur-3xl opacity-35 pointer-events-none -z-10 transition-colors duration-700"
                style={{ backgroundColor: selectedSkill.color }}
              />

              {/* Top Curved Specular Glass Reflection Sheen */}
              <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    className="relative flex items-center justify-center p-2.5 rounded-2xl bg-slate-900/80 border border-white/15 shadow-xl shrink-0 overflow-hidden"
                  >
                    <div style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))' }}>
                      <SelectedLogo className="w-13 h-13 sm:w-14 sm:h-14 relative z-10" />
                    </div>
                  </motion.div>

                  <div>
                    <motion.h3 
                      key={selectedSkill.id + '-name-dock'}
                      initial={{ opacity: 0, x: -14, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                    >
                      {selectedSkill.name}
                    </motion.h3>

                    <motion.div 
                      key={selectedSkill.id + '-meta-dock'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className="flex items-center gap-2 mt-1.5"
                    >
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-800/90 border border-white/15 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                        <ShieldCheck className="w-3 h-3 text-cyan-400" />
                        <span>{selectedSkill.level}</span>
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {selectedSkill.experience}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Click to expand hint button */}
                <div 
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 text-slate-400 hover:text-white transition-colors"
                  title="Open Full Liquid Glass Pop-up"
                >
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>

              {/* Tagline & Description Reveal */}
              <div className="mb-5 pb-5 border-b border-white/10 space-y-2">
                <motion.p 
                  key={selectedSkill.id + '-tag-dock'}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-semibold"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{selectedSkill.tag}</span>
                </motion.p>

                <motion.p 
                  key={selectedSkill.id + '-desc-dock'}
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm text-slate-300 leading-relaxed font-normal"
                >
                  {selectedSkill.description}
                </motion.p>
              </div>

              {/* Liquid Gauge Meter */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Core Mastery Rating</span>
                  </span>
                  <span className="font-bold text-white flex items-center gap-1 text-sm">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <AnimatedCounter value={selectedSkill.proficiency} />%
                  </span>
                </div>

                <div className="relative w-full h-3.5 rounded-full bg-slate-900/90 border border-white/20 overflow-hidden shadow-inner p-[1px]">
                  <motion.div
                    key={selectedSkill.id + '-bar-dock'}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.proficiency}%` }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    style={{
                      background: `linear-gradient(90deg, #06b6d4, ${selectedSkill.color}, #3b82f6)`
                    }}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Production Chips */}
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Production Highlights
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.highlights.map((highlight, i) => (
                    <motion.span
                      key={selectedSkill.id + '-' + i + '-dock'}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.15 + (i * 0.05),
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 text-xs text-slate-200 backdrop-blur-md shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{highlight}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ULTRA-PREMIUM CINEMATIC TRANSPARENT LIQUID GLASS POP-UP MODAL (DESKTOP & MOBILE) */}
      <AnimatePresence>
        {isPopUpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-2xl"
            onClick={() => setIsPopUpOpen(false)}
          >
            {/* Ambient Morphing Liquid Color Flood */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 0.35 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-[36rem] h-[36rem] rounded-full blur-[140px] pointer-events-none -z-10"
              style={{ backgroundColor: selectedSkill.color }}
            />

            {/* The Ultra-Smooth Transparent Liquid Glass Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 32, filter: 'blur(16px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(12px)' }}
              transition={{
                type: 'spring',
                stiffness: 270,
                damping: 26,
                mass: 0.85
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-[2.8rem] bg-gradient-to-b from-slate-900/40 via-slate-950/60 to-slate-900/50 border border-white/25 p-7 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                boxShadow: `0 35px 100px rgba(0,0,0,0.95), 0 0 50px ${selectedSkill.color}35`
              }}
            >
              {/* Rotating Liquid Conic Border Stream */}
              <div className="absolute inset-0 rounded-[2.8rem] p-[1.5px] pointer-events-none overflow-hidden -z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-[200%] h-[200%] -top-1/2 -left-1/2 absolute"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, ${selectedSkill.color} 80deg, #22d3ee 160deg, transparent 240deg)`
                  }}
                />
              </div>

              {/* Specular Liquid Glass Top Sheen */}
              <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              {/* Close Button: Glowing Frosted Glass Circle */}
              <button
                onClick={() => setIsPopUpOpen(false)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-900/70 border border-white/20 text-slate-300 hover:text-white hover:border-cyan-400 hover:scale-108 transition-all cursor-pointer z-30 backdrop-blur-lg shadow-lg"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Pop-up Header: Large 3D Floating Multi-Color Logo & Identity */}
              <div className="flex items-center gap-5 mb-6 pr-12">
                {/* 3D Glass Pool Container */}
                <motion.div 
                  initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.08 }}
                  className="relative flex items-center justify-center p-3.5 rounded-3xl bg-slate-900/80 border border-white/20 shadow-2xl shrink-0 overflow-hidden"
                  style={{
                    boxShadow: `0 10px 30px rgba(0,0,0,0.7), 0 0 25px ${selectedSkill.color}40`
                  }}
                >
                  {/* Subtle Internal Liquid Sweep */}
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent w-full pointer-events-none"
                  />
                  <div style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.65))' }}>
                    <SelectedLogo className="w-16 h-16 relative z-10" />
                  </div>
                </motion.div>

                <div>
                  <motion.h3 
                    initial={{ opacity: 0, x: -16, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                  >
                    {selectedSkill.name}
                  </motion.h3>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="flex items-center gap-2 mt-1.5"
                  >
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800/90 border border-white/15 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{selectedSkill.level}</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      • {selectedSkill.experience}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Tagline & Description with Liquid Text Reveal */}
              <div className="mb-6 pb-6 border-b border-white/10 space-y-2.5">
                <motion.p 
                  initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-semibold"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedSkill.tag}</span>
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
                >
                  {selectedSkill.description}
                </motion.p>
              </div>

              {/* Liquid Core Mastery Progress Meter */}
              <div className="mb-6 space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Core Architectural Mastery</span>
                  </span>
                  <span className="font-bold text-white flex items-center gap-1.5 text-sm sm:text-base">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <AnimatedCounter value={selectedSkill.proficiency} />%
                  </span>
                </div>

                {/* Fluid Liquid Meter Bar */}
                <div className="relative w-full h-4 rounded-full bg-slate-900/90 border border-white/20 overflow-hidden shadow-inner p-[1.5px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.proficiency}%` }}
                    transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                    style={{
                      background: `linear-gradient(90deg, #06b6d4, ${selectedSkill.color}, #3b82f6)`
                    }}
                  >
                    {/* Continuous Liquid Wave Ripples */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Cascading Production Highlights Chips */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Production Highlights & Capabilities
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.highlights.map((highlight, i) => (
                    <motion.span
                      key={selectedSkill.id + '-popup-' + i}
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.35, 
                        delay: 0.22 + (i * 0.06),
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/15 hover:border-cyan-400/50 text-xs sm:text-sm text-slate-200 backdrop-blur-md shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{highlight}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
