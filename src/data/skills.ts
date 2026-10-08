/**
 * Technical Skills Arsenal & Toolchains
 * Single Source of Truth for Prince Raj
 */

export interface SkillItem {
  name: string;
  level: number;
  description: string;
  category: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 'ai-engineering',
    name: 'AI Engineering & Agents',
    iconName: 'Brain',
    skills: [
      { name: 'Large Language Models (LLMs)', level: 92, description: 'Gemini 3.8/3.7, OpenAI, Claude API integration & prompt engineering', category: 'ai-engineering' },
      { name: 'Multi-Agent Systems', level: 90, description: 'Autonomous agentic pipelines, LangGraph, CrewAI & task orchestration', category: 'ai-engineering' },
      { name: 'RAG & Vector Retrieval', level: 88, description: 'Hybrid search, semantic chunking, embeddings & vector stores', category: 'ai-engineering' },
      { name: 'PyTorch & TensorFlow', level: 84, description: 'Deep learning modeling, transfer learning & tensor computations', category: 'ai-engineering' },
      { name: 'Vector DBs (Chroma, Pinecone)', level: 86, description: 'High-throughput vector indexing and similarity retrieval', category: 'ai-engineering' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Architecture',
    iconName: 'Layout',
    skills: [
      { name: 'React 19 & Next.js', level: 95, description: 'Server components, hooks, concurrent rendering & performance', category: 'frontend' },
      { name: 'TypeScript', level: 94, description: 'Strict typing, generic abstractions & enterprise patterns', category: 'frontend' },
      { name: 'Tailwind CSS', level: 96, description: 'Custom design systems, dark mode & fluid responsive layouts', category: 'frontend' },
      { name: 'Motion / Framer Motion', level: 92, description: 'Complex physics springs, gesture micro-interactions & layout animations', category: 'frontend' },
      { name: 'HTML5 Canvas & Web Audio', level: 85, description: 'GPU-accelerated interactive particle canvases and sound synthesizers', category: 'frontend' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Cloud Systems',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express', level: 92, description: 'REST APIs, serverless functions, middleware & stream processing', category: 'backend' },
      { name: 'Python (FastAPI, Flask)', level: 90, description: 'Asynchronous APIs, ML model inference & data pipelines', category: 'backend' },
      { name: 'Firebase & Cloud Firestore', level: 92, description: 'Real-time database rules, security hardening, Auth & storage', category: 'backend' },
      { name: 'Docker & Microservices', level: 84, description: 'Containerization, reproducible environments & cloud deployment', category: 'backend' },
      { name: 'PostgreSQL & SQL', level: 86, description: 'Relational schemas, query optimization & ACID transactions', category: 'backend' },
    ],
  },
  {
    id: 'tools',
    name: 'DevOps & Toolchains',
    iconName: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 94, description: 'Branching workflows, CI/CD actions & semantic versioning', category: 'tools' },
      { name: 'Vite & Modern Bundlers', level: 92, description: 'Fast build pipelines, code splitting & tree shaking', category: 'tools' },
      { name: 'Vercel & Cloudflare', level: 90, description: 'Edge deployments, serverless functions & DNS/CDN management', category: 'tools' },
      { name: 'Cloudinary CDN', level: 88, description: 'Adaptive media delivery, transformations & streaming compression', category: 'tools' },
    ],
  },
];
