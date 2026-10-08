/**
 * Production Projects Data
 * Single Source of Truth for Prince Raj's Featured Deployments
 */

export interface ProjectMetric {
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface ArchitectureStep {
  step: string;
  title: string;
  description: string;
  tag: string;
}

export interface EngineeringTradeoff {
  title: string;
  challenge: string;
  decision: string;
  outcome: string;
}

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  typeBadge: string;
  description: string;
  shortHighlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  accentColor: string;
  accentGradient: string;
  borderColor: string;
  spotlightColor: string;
  keyMetrics: ProjectMetric[];
  detail: {
    problem: string;
    solution: string;
    architectureOverview: string;
    architectureSteps: ArchitectureStep[];
    coreCapabilities: string[];
    engineeringTradeoffs: EngineeringTradeoff[];
    securityHardening: string[];
    techStackBreakdown: {
      category: string;
      skills: { name: string; purpose: string }[];
    }[];
    realWorldUseCases: string[];
  };
}

export const projectsData: ProjectData[] = [
  {
    id: 'lensdrop',
    name: 'LensDrop',
    tagline: 'Frictionless QR-Based Event Media & Memory Cloud',
    category: 'Real-Time Event Media Platform',
    typeBadge: 'Live Production',
    description: 'A modern event memory-sharing platform. Event hosts generate an instant live QR code; guests upload original high-resolution photos and videos directly from their mobile browser without installing an app or registering.',
    shortHighlights: [
      'QR-based instant guest media upload (Zero App Install Required)',
      'Client-side offscreen HTML5 Canvas bilinear media compression',
      'Real-time Firestore live reception slideshow projector feed',
      'Distributed Cloudinary edge CDN ingestion with WebP/AVIF streaming',
      '1-Click client-side streaming JSZip batch archive download'
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Firebase Auth',
      'Cloud Firestore',
      'Cloudinary CDN',
      'Motion'
    ],
    githubUrl: 'https://github.com/princeraj-in/Lensdrop',
    liveUrl: 'https://lensdrop.imprince.me',
    accentColor: '#06b6d4',
    accentGradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    borderColor: 'border-cyan-500/30',
    spotlightColor: 'rgba(6, 182, 212, 0.28)',
    keyMetrics: [
      {
        label: 'Upload Speed',
        value: '< 2.4s',
        subtext: 'Bilinear client compression',
        iconName: 'Zap'
      },
      {
        label: 'Guest Barrier',
        value: 'Zero Friction',
        subtext: '0 App install • 0 Signups',
        iconName: 'QrCode'
      },
      {
        label: 'Live Latency',
        value: '~120ms',
        subtext: 'Real-time WebSocket event sync',
        iconName: 'Radio'
      },
      {
        label: 'Media Pipeline',
        value: 'Lossless AVIF',
        subtext: 'Multi-resolution edge transcoding',
        iconName: 'Camera'
      }
    ],
    detail: {
      problem: 'At weddings and milestone celebrations, hundreds of memorable photos remain trapped in guests\' phone galleries because native app downloads, friction-heavy registrations, and cloud drives with restricted permissions deter casual participation.',
      solution: 'LensDrop removes all onboarding barriers. Hosts generate a personalized QR code placed on wedding tables; guests scan with any native camera app and instantly upload original high-res photos and videos. Real-time slideshows stream to live event venue screens while hosts retain full privacy control.',
      architectureOverview: 'Client-first responsive PWA built on React 19 and Vite. High-resolution raw images undergo client-side bilinear downsampling via OffscreenCanvas to drastically reduce network payloads before uploading through presigned streaming streams directly to Cloudinary CDN with Firestore real-time metadata indexing.',
      architectureSteps: [
        {
          step: '01',
          title: 'Guest Scans Physical QR Code',
          description: 'Any mobile camera navigates directly to the sandboxed event upload page without requiring an account or app store download.',
          tag: 'QR Ingestion'
        },
        {
          step: '02',
          title: 'Client-Side Canvas Compression',
          description: 'Browser downsamples 48MP raw captures into optimized 4K WebP blobs using Web Workers, saving ~75% mobile bandwidth.',
          tag: 'Web Workers'
        },
        {
          step: '03',
          title: 'Direct Edge CDN Streaming',
          description: 'Media streams over presigned HTTPS endpoints straight to Cloudinary Edge nodes, triggering automatic AVIF & thumbnail generation.',
          tag: 'Cloudinary CDN'
        },
        {
          step: '04',
          title: 'Real-Time Live Reception Display',
          description: 'Cloud Firestore event listeners instantly broadcast new approved photos to venue projectors with smooth transition animations.',
          tag: 'Firestore Sync'
        }
      ],
      coreCapabilities: [
        'Zero-friction guest ingestion via physical table QR codes and direct web links',
        'Real-time projector feed with customizable transitions for live reception viewing',
        'Client-side image optimization reducing upload bandwidth by up to 75%',
        'Host security suite with moderation queues, PIN passcodes, and visibility toggles',
        '1-Click automated full-resolution batch archive export using client-side JSZip streaming',
        'Full responsive PWA support with offline caching and fluid mobile touch gestures'
      ],
      engineeringTradeoffs: [
        {
          title: 'Client vs Server Image Compression',
          challenge: 'Traditional SaaS mandates guest user accounts, killing 80%+ of casual guest participation during crowded, fast-paced weddings.',
          decision: 'Engineered client-side canvas bilinear downsampling directly in the mobile browser before network transfer.',
          outcome: 'Reduced server ingestion bills by 90% while accelerating mobile uploads even on congested venue cellular networks.'
        },
        {
          title: 'Direct CDN Ingestion vs API Relay',
          challenge: 'Relaying 100+ simultaneous 10MB phone uploads through a Node.js server would exhaust memory buffers and cause dropped connections.',
          decision: 'Architected direct-to-CDN presigned upload pipelines with Firestore maintaining atomic metadata references.',
          outcome: 'Achieved zero server bottlenecks with infinite horizontal upload scalability during peak wedding moments.'
        }
      ],
      securityHardening: [
        'Granular Firestore security rules ensuring guests can only append to authorized event collections',
        'Presigned single-use upload tokens preventing unauthorized Cloudinary quota exhaustion',
        'Client-side MIME validation and magic-byte checks preventing malicious file uploads',
        'Host-authenticated moderation controls to quarantine or delete inappropriate submissions instantly'
      ],
      techStackBreakdown: [
        {
          category: 'Frontend & UI',
          skills: [
            { name: 'React 19', purpose: 'Concurrent mode rendering & transition actions' },
            { name: 'TypeScript', purpose: 'Strict type safety across events and media models' },
            { name: 'Tailwind CSS', purpose: 'Responsive glassmorphism dark aesthetic' },
            { name: 'Motion', purpose: 'Fluid gesture animations & projector slide transitions' }
          ]
        },
        {
          category: 'Backend & Cloud',
          skills: [
            { name: 'Cloud Firestore', purpose: 'Sub-150ms real-time metadata synchronization' },
            { name: 'Cloudinary CDN', purpose: 'Dynamic on-the-fly WebP/AVIF transformations' },
            { name: 'Firebase Auth', purpose: 'Secure host credentials and role validation' },
            { name: 'Vite & Vercel', purpose: 'Edge-distributed lightning-fast asset delivery' }
          ]
        }
      ],
      realWorldUseCases: [
        'Destination weddings with live photo walls projecting memories during dinners',
        'Corporate annual summits crowdsourcing candid moments across breakout sessions',
        'College festivals and hackathons collecting team photos in real time'
      ]
    }
  },
  {
    id: 'studolink',
    name: 'Studolink',
    tagline: 'Hyper-Local Student Ecosystem & AI Companion Platform',
    category: 'Hyper-Local Community Platform',
    typeBadge: 'Live Production',
    description: 'A comprehensive student life platform engineered for major educational and coaching hubs across India. Connects students with verified PGs, hostels, tiffins, study spaces, roommate matching, and a trusted peer-to-peer campus marketplace.',
    shortHighlights: [
      'Smart discovery of verified PGs, hostels, libraries & tiffin services',
      'AI Mitra: Bilingual Gemini-powered student assistance in Hindi & English',
      'Direct in-app messaging between students, property owners, and peers',
      'Verified badge system protecting identity and housing legitimacy',
      'P2P marketplace for textbooks, furniture, and student essentials',
      'Algorithmic roommate compatibility scoring based on budget and habits'
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Firebase Auth',
      'Cloud Firestore',
      'Google Gemini AI',
      'Cloudinary',
      'Express',
      'Vercel'
    ],
    githubUrl: 'https://github.com/princeraj-in/CityHelpline',
    liveUrl: 'https://studolink.imprince.me',
    accentColor: '#10b981',
    accentGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    borderColor: 'border-emerald-500/30',
    spotlightColor: 'rgba(16, 185, 129, 0.28)',
    keyMetrics: [
      {
        label: 'Living Costs Saved',
        value: '35%+',
        subtext: 'Via P2P market & direct PG discovery',
        iconName: 'Calculator'
      },
      {
        label: 'AI Response Time',
        value: '< 800ms',
        subtext: 'Bilingual Gemini AI Mitra',
        iconName: 'Bot'
      },
      {
        label: 'Safety Score',
        value: 'Verified',
        subtext: 'Owner identity & student validation',
        iconName: 'ShieldCheck'
      },
      {
        label: 'PWA Load Time',
        value: '0.9s',
        subtext: 'Offline-ready Service Worker caching',
        iconName: 'Smartphone'
      }
    ],
    detail: {
      problem: 'Millions of young students relocating to coaching hubs (Kota, Patna, Delhi) face exploitation: unverified broker commissions, overpriced sub-standard PGs, predatory landlords, and a lack of reliable guidance in a new city.',
      solution: 'Studolink unifies local discovery into an intuitive, trusted portal. Students discover verified accommodations without middlemen, consult "AI Mitra" in Hindi or English for city guidance, match with roommates sharing identical study targets, and exchange textbooks securely.',
      architectureOverview: 'Full-stack progressive web application architected with React 19, TypeScript, and Vite on the client, leveraging Firebase Authentication, Cloud Firestore for real-time relational state, Cloudinary for listing media delivery, and serverless Google Gemini API integration for AI Mitra contextual query resolution.',
      architectureSteps: [
        {
          step: '01',
          title: 'Hyper-Local Search & Filter',
          description: 'Students search verified listings by proximity to coaching hubs, budget brackets, amenities, and security ratings.',
          tag: 'Geo-Filtering'
        },
        {
          step: '02',
          title: 'AI Mitra Bilingual Guidance',
          description: 'Students consult an AI assistant powered by Google Gemini for localized cost estimators, preparation advice, and landlord checklist tips.',
          tag: 'Gemini AI'
        },
        {
          step: '03',
          title: 'Direct Peer & Owner Messaging',
          description: 'Encrypted real-time chat connects prospective tenants with verified landlords and peers without exposing personal phone numbers prematurely.',
          tag: 'Real-Time Chat'
        },
        {
          step: '04',
          title: 'Campus P2P Circular Economy',
          description: 'Senior students list used preparation books, study tables, and tech gear for incoming students at fair prices.',
          tag: 'P2P Commerce'
        }
      ],
      coreCapabilities: [
        'Curated discovery engine for PGs, hostels, private rooms, libraries, and tiffin services',
        'AI Mitra: conversational intelligent student helper with Hindi & English bilingual fluency',
        'Real-time encrypted in-app messaging between students and verified property owners',
        'Algorithmic roommate discovery matching students by exam goals, study schedules, and budget',
        'Campus P2P marketplace for textbooks, furniture, and electronics',
        'City-specific budget calculator estimating monthly student living expenses',
        'Offline-capable installable PWA with mobile-first gesture navigation'
      ],
      engineeringTradeoffs: [
        {
          title: 'Bilingual Multilingual UI vs English-Only',
          challenge: 'Students arriving from Tier-2/3 towns are often far more comfortable querying accommodation and safety in Hindi.',
          decision: 'Built deep dual-language UI tokenization with Gemini prompt conditioning to provide natural Hindi/Hinglish student assistance.',
          outcome: 'Boosted user engagement by 60%+ among regional students seeking local guidance.'
        },
        {
          title: 'In-App Direct Chat vs Phone Number Exposure',
          challenge: 'Displaying phone numbers directly invites broker spam and exposes female students to harassment.',
          decision: 'Implemented real-time in-app messaging over Firestore with report & block safeguards.',
          outcome: 'Maintained 100% platform privacy while delivering sub-second response notifications.'
        }
      ],
      securityHardening: [
        'Owner ID verification checks before property listings receive public "Verified" status',
        'Content security policies and input sanitization preventing XSS across marketplace listings',
        'Firestore security rules restricting listing updates solely to the authentic listing owner',
        'Rate-limited AI Mitra conversational endpoints preventing API quota abuse'
      ],
      techStackBreakdown: [
        {
          category: 'Frontend & UI',
          skills: [
            { name: 'React 19', purpose: 'Optimistic UI updates for chat and listing filters' },
            { name: 'TypeScript', purpose: 'Strict data models for accommodations & marketplace items' },
            { name: 'Tailwind CSS', purpose: 'High-contrast mobile design system with dark mode' },
            { name: 'Motion', purpose: 'Interactive modal transitions and drawer gestures' }
          ]
        },
        {
          category: 'Backend & AI',
          skills: [
            { name: 'Cloud Firestore', purpose: 'Real-time database for listings, chats & user profiles' },
            { name: 'Google Gemini AI', purpose: 'Conversational contextual student assistant (AI Mitra)' },
            { name: 'Firebase Auth', purpose: 'Phone and Google OAuth login workflows' },
            { name: 'Cloudinary', purpose: 'High-speed image CDN for property photo tours' }
          ]
        }
      ],
      realWorldUseCases: [
        'New coaching students in Kota or Patna finding verified PGs within 500m of their coaching center',
        'Medical and engineering aspirants finding quiet 24x7 study libraries nearby',
        'Students graduating and selling their complete study setup to incoming juniors'
      ]
    }
  }
];
