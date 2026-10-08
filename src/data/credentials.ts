/**
 * Verified Industry Credentials & Certifications
 * Single Source of Truth for Prince Raj
 */

export interface Credential {
  id: string;
  course: string;
  company: string;
  date: string;
  url: string;
  badgeColor: string;
  accentGradient: string;
  category: 'Cloud' | 'Security' | 'AI / ML' | 'Data Science';
}

export const credentialsData: Credential[] = [
  {
    id: 'google-security',
    course: 'Connect and Protect: Networks and Network Security',
    company: 'Google',
    date: 'Jan 16, 2026',
    url: 'https://coursera.org/verify/4OYZNCAMLVNB',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    accentGradient: 'from-blue-500 to-cyan-400',
    category: 'Security',
  },
  {
    id: 'ibm-ml',
    course: 'Machine Learning with Python',
    company: 'IBM',
    date: 'Dec 20, 2025',
    url: 'https://coursera.org/verify/XMWSP1OIM1R2',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    accentGradient: 'from-indigo-500 to-blue-500',
    category: 'AI / ML',
  },
  {
    id: 'ibm-genai-app',
    course: 'Develop Generative AI Applications: Get Started',
    company: 'IBM',
    date: 'Dec 12, 2025',
    url: 'https://coursera.org/verify/YMFCRD9D750W',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    accentGradient: 'from-indigo-500 to-purple-500',
    category: 'AI / ML',
  },
  {
    id: 'aws-ai-practitioner',
    course: 'AWS Artificial Intelligence Practitioner',
    company: 'AWS',
    date: 'Dec 11, 2025',
    url: 'https://coursera.org/verify/HG4W9BZK9BLI',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    accentGradient: 'from-amber-500 to-orange-500',
    category: 'Cloud',
  },
  {
    id: 'gcp-intro-llm',
    course: 'Introduction to Large Language Models',
    company: 'Google Cloud',
    date: 'Dec 2, 2025',
    url: 'https://coursera.org/verify/0LBYP4FDCQT4',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    accentGradient: 'from-blue-500 to-teal-400',
    category: 'AI / ML',
  },
  {
    id: 'ibm-python-ds',
    course: 'Python for Data Science, AI & Development',
    company: 'IBM',
    date: 'Nov 17, 2025',
    url: 'https://coursera.org/verify/TE0ACYVR0G0G',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    accentGradient: 'from-indigo-500 to-cyan-400',
    category: 'Data Science',
  },
  {
    id: 'gcp-intro-genai',
    course: 'Introduction to Generative AI',
    company: 'Google Cloud',
    date: 'Oct 25, 2025',
    url: 'https://coursera.org/verify/WYBIO9D7RH8Z',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    accentGradient: 'from-blue-500 to-purple-400',
    category: 'AI / ML',
  },
];
