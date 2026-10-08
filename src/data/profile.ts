/**
 * Profile Data - Single Source of Truth for Prince Raj
 * Brand: ImPrince Tectra
 * Professional Title: Prince Raj — AI Developer & Full Stack Engineer
 */

export interface ProfileData {
  name: string;
  brand: string;
  tagline: string;
  role: string;
  location: string;
  bio: string;
  availability: string;
  contact: {
    primaryEmail: string;
    domainEmail: string;
    phone: string;
    whatsapp: string;
    github: string;
    linkedin: string;
    instagram: string;
    website: string;
  };
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  education: {
    degree: string;
    institution: string;
    status: string;
  };
}

export const profileData: ProfileData = {
  name: 'Prince Raj',
  brand: 'ImPrince Tectra',
  tagline: 'AI Developer & Full Stack Engineer',
  role: 'AI Developer & Full Stack Engineer',
  location: 'Patna, Bihar & Remote Worldwide',
  bio: 'I build modern web apps and AI solutions that turn ideas into real-world products. Focused on clean design, smart systems, and real impact.',
  availability: 'Available for AI & Full-Stack Engineering roles',
  contact: {
    primaryEmail: 'kusprince.raj@gmail.com',
    domainEmail: 'developer@imprince.me',
    phone: '+91 8252995548',
    whatsapp: 'https://wa.me/918252995548',
    github: 'https://github.com/princeraj-in',
    linkedin: 'https://www.linkedin.com/in/princeraj-in/',
    instagram: 'https://instagram.com/princerjjjjj',
    website: 'https://imprince.me',
  },
  metrics: [
    { label: 'Deployed Platforms', value: '2+', subtext: 'Production systems' },
    { label: 'AI Focus Area', value: 'LLMs & Agents', subtext: 'Neural architectures' },
    { label: 'Verified Certifications', value: '7', subtext: 'Google, IBM, AWS' },
    { label: 'Core Arsenal', value: '15+', subtext: 'Modern toolchains' },
  ],
  education: {
    degree: 'Bachelor of Science in Computer Science & Data Analytics',
    institution: 'Indian Institute of Technology, Patna',
    status: 'In Progress',
  },
};
