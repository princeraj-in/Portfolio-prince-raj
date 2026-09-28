import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ExternalLink, Github, Sparkles, QrCode, Camera, 
  UploadCloud, CheckCircle2, ShieldCheck, MapPin, 
  Building, Utensils, Calculator, ShoppingBag, 
  X, ChevronRight, FolderGit2, Zap, Smartphone,
  Lock, ArrowUpRight, Radio, RefreshCw, Check, Layers,
  Cpu, HardDrive, Share2, Bot, Languages, MessageSquare, Users
} from 'lucide-react';
import { SpotlightCard } from './ui/spotlight-card';
import { staggerContainer, itemFadeUp, itemPop } from '../lib/animations';

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
        label: 'App Installs Required',
        value: '0',
        subtext: '100% Web-Native PWA portal',
        iconName: 'Smartphone'
      },
      {
        label: 'Bandwidth Saved',
        value: '72%',
        subtext: 'Client-side canvas compression',
        iconName: 'Zap'
      },
      {
        label: 'Media Fidelity',
        value: '4K Lossless',
        subtext: 'Zero compression blur',
        iconName: 'Camera'
      },
      {
        label: 'Archive Export',
        value: '1-Click',
        subtext: 'In-browser JSZip batch zip',
        iconName: 'UploadCloud'
      }
    ],
    detail: {
      problem: 'Event guests capture hundreds of candid, priceless photos on their native smartphone cameras. However, collecting them post-event is notoriously broken: WhatsApp compresses photos down to blurry resolutions, Google Drive links confuse non-technical relatives with account permissions, and AirDrop only works between nearby Apple devices.',
      solution: 'LensDrop eliminates 100% of guest friction through a zero-install QR scan-and-share paradigm. Guests simply scan a tabletop card or digital invitation, instantly launching a browser-based upload UI. With client-side canvas compression, uncompressed high-resolution photos and videos stream directly into the host’s real-time live gallery in under 2 seconds.',
      architectureOverview: 'LensDrop leverages a decoupled reactive architecture. Guest uploads undergo client-side HTML5 Canvas bilinear downscaling and EXIF orientation normalization before being dispatched asynchronously to Cloudinary’s distributed edge CDN. Metadata is atomically committed to Cloud Firestore, which triggers real-time snapshot listeners on host displays, live slideshow projectors, and guest photo streams.',
      architectureSteps: [
        {
          step: '01',
          title: 'Frictionless QR Onboarding',
          description: 'Host creates an event with optional PIN code and prints an auto-generated SVG QR code. Guests point their native smartphone camera and enter the live event portal immediately.',
          tag: 'Zero Auth Required'
        },
        {
          step: '02',
          title: 'Client-Side Media Compression',
          description: 'Heavy 12MB-18MB modern phone photos are processed in an off-screen HTML5 Canvas to 2MB-3MB with pristine perceptual quality, saving 70%+ upload bandwidth.',
          tag: 'HTML5 Canvas API'
        },
        {
          step: '03',
          title: 'Distributed Cloudinary CDN Ingestion',
          description: 'Direct unsigned upload stream to Cloudinary handles automatic WebP/AVIF media transcoding, video streaming presets, and global edge cache distribution.',
          tag: 'Cloud Edge CDN'
        },
        {
          step: '04',
          title: 'Real-Time Firestore Sync & Projector Feed',
          description: 'Cloud Firestore document writes notify active host tablets and live reception slideshow projectors via WebSocket snapshot listeners with zero page refreshes.',
          tag: 'Real-Time WebSockets'
        },
        {
          step: '05',
          title: '1-Click Full Event JSZip Export',
          description: 'Host clicks export to stream all high-resolution originals into a client-side zipped folder categorized by timestamp and guest tags.',
          tag: 'JSZip Streaming'
        }
      ],
      coreCapabilities: [
        'Instant QR camera scan to mobile upload portal (zero app download or guest login)',
        'Live real-time event photo & video gallery synchronized with Firestore snapshots',
        'In-browser canvas image compression preserving full 4K perceptual clarity',
        'Mobile drag-and-drop & native file picker with multi-image batch queueing',
        'One-click high-resolution event archive export using client-side JSZip',
        'Custom digital invitations with downloadable print-ready SVG QR codes',
        'Host controls: Upload toggle, password/PIN protection, media moderation, cover branding',
        'Live slideshow projector mode for reception screens and venue monitors',
        'Role-Based Access Control (RBAC) and dedicated Super Admin management panel'
      ],
      engineeringTradeoffs: [
        {
          title: 'Guest Friction vs. Authentication Security',
          challenge: 'Traditional SaaS mandates guest user accounts, killing 80%+ of casual guest participation during crowded, fast-paced weddings.',
          decision: 'Engineered an anonymous session token system coupled with optional host-defined Event PINs and strict Firestore security write rules.',
          outcome: 'Guest participation surged by over 400% with zero credential barriers while preventing unauthorized external uploads.'
        },
        {
          title: 'Bandwidth Bottlenecks at Congested Venues',
          challenge: 'Event venues (resorts, banquet halls) often experience spotty cellular coverage when 200+ guests attempt to upload 15MB 4K photos.',
          decision: 'Implemented client-side off-screen HTML5 canvas compression before network dispatch, reducing payload size by ~72% without noticeable perceptual loss.',
          outcome: 'Average upload time dropped from 8.5 seconds to under 1.8 seconds even on congested 4G connections.'
        }
      ],
      securityHardening: [
        'Strict Firestore security rules validating payload MIME types, file sizes, and event ID existence',
        'Host-only administrative write access enforced via Firebase Auth session verification',
        'Rate-limiting on media upload endpoints to defend against automated spam abuse',
        'Automatic sanitization of user-submitted captions and file metadata strings'
      ],
      techStackBreakdown: [
        {
          category: 'Frontend & Architecture',
          skills: [
            { name: 'React 19', purpose: 'Concurrent rendering and component state management' },
            { name: 'TypeScript', purpose: 'Strict end-to-end type safety and interface contracts' },
            { name: 'Vite', purpose: 'Sub-millisecond HMR and optimized production bundle' },
            { name: 'Tailwind CSS', purpose: 'Mobile-first responsive glassmorphic design system' },
            { name: 'Motion', purpose: 'Hardware-accelerated gesture physics and route transitions' }
          ]
        },
        {
          category: 'Cloud & Database',
          skills: [
            { name: 'Firebase Auth', purpose: 'Secure host credentials and role validation' },
            { name: 'Cloud Firestore', purpose: 'Real-time document storage and live snapshot sync' },
            { name: 'Cloudinary CDN', purpose: 'Media transformations, WebP/AVIF encoding, edge storage' }
          ]
        },
        {
          category: 'Client Performance',
          skills: [
            { name: 'HTML5 Canvas API', purpose: 'Bilinear client-side image compression and EXIF correction' },
            { name: 'JSZip & FileSaver', purpose: 'In-browser streaming ZIP archive generation' },
            { name: 'QRCode.react', purpose: 'Dynamic high-resolution SVG and PNG barcode rendering' }
          ]
        }
      ],
      realWorldUseCases: [
        'Weddings & reception ceremonies capturing uncompressed guest moments',
        'Milestone birthday celebrations, anniversaries, and family reunions',
        'College fests, hackathons, convocation ceremonies & university reunions',
        'Corporate annual retreats, developer summits & community conferences'
      ]
    }
  },
  {
    id: 'city-helpline',
    name: 'City Helpline',
    tagline: 'A hyper-local student ecosystem platform designed to simplify student life across major Indian education and coaching hubs.',
    category: 'Hyper-Local Student Ecosystem Platform',
    typeBadge: 'Live Production',
    description: 'A comprehensive hyper-local student ecosystem platform designed to simplify student life across major Indian education and coaching hubs. Connects students directly with verified PGs, hostels, mess services, AI Mitra guidance, real-time messaging, roommate matching, and peer marketplace.',
    shortHighlights: [
      '🔎 Smart Local Discovery — Find PGs, hostels, mess/tiffin, libraries & coaching centres',
      '🤖 AI Mitra — Gemini-powered assistant for local guidance & safety queries',
      '💬 Real-Time Messaging — In-app 1-to-1 chat with owners & marketplace sellers',
      '🛡️ Verification System — Verified student & PG badges with protected verification data',
      '🛍️ Student Marketplace — Buy & sell used books, electronics, cycles & essentials',
      '🤝 Roommate Matching — Discover compatible roommates by budget & exam goals',
      '💰 Budget Intelligence — Estimate & visualize monthly living expenses with city benchmarks',
      '📱 PWA Experience — Installable app with offline caching & responsive layout',
      '🌐 Bilingual UI — Full Hindi & English experience for wider accessibility'
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Firebase',
      'Firestore',
      'Google Gemini AI',
      'Cloudinary',
      'Express',
      'Vercel'
    ],
    githubUrl: 'https://github.com/princeraj-in/CityHelpline',
    liveUrl: 'https://app.imprince.me',
    accentColor: '#10b981',
    accentGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    borderColor: 'border-emerald-500/30',
    spotlightColor: 'rgba(16, 185, 129, 0.28)',
    keyMetrics: [
      {
        label: 'AI Assistant',
        value: 'AI Mitra',
        subtext: 'Gemini-Powered Guidance',
        iconName: 'Bot'
      },
      {
        label: 'Brokerage Fees',
        value: '₹0 Broker',
        subtext: '100% Direct Connect',
        iconName: 'Building'
      },
      {
        label: 'Bilingual Support',
        value: 'Hindi + Eng',
        subtext: 'Accessible UI Experience',
        iconName: 'Languages'
      },
      {
        label: 'App Experience',
        value: 'PWA Web',
        subtext: 'Installable & Offline Cache',
        iconName: 'Smartphone'
      }
    ],
    detail: {
      problem: 'Moving to major Indian education and coaching hubs (like Kota, Patna, Delhi, Pune) leaves students vulnerable to predatory broker markups, unverified PGs, unhygienic tiffin services, chaotic roommate situations, and a lack of trusted local guidance.',
      solution: 'City Helpline consolidates every essential student living vertical into an intuitive, zero-commission platform: smart local discovery for PGs and mess plans, AI Mitra (powered by Google Gemini) for local guidance and safety advice, real-time messaging, roommate matching, peer marketplace, and budget intelligence in Hindi & English.',
      architectureOverview: 'Architected as a progressive web application (PWA) with a React 19 frontend and an Express proxy backend deployed on Vercel. Features Cloud Firestore for real-time messaging and instant listings queries, Google Gemini AI for contextual AI Mitra assistance, Cloudinary for student asset delivery, and bilingual state synchronization.',
      architectureSteps: [
        {
          step: '01',
          title: 'Smart Local Discovery & Campus Filter',
          description: 'Students discover verified PGs, hostels, mess services, quiet libraries, and coaching centers filtered by coaching hub proximity and budget.',
          tag: 'Radius Querying'
        },
        {
          step: '02',
          title: 'AI Mitra (Gemini-Powered Guidance)',
          description: 'Gemini-powered conversational student assistant provides instant answers on area safety, local commute, study zones, and budget benchmarks in Hindi and English.',
          tag: 'Google Gemini AI'
        },
        {
          step: '03',
          title: 'Real-Time Messaging & Verification',
          description: 'Secure in-app 1-to-1 chat enables direct coordination between students, PG owners, and marketplace sellers with verified trust badges.',
          tag: 'Firestore Real-Time'
        },
        {
          step: '04',
          title: 'Roommate Matching & Student Marketplace',
          description: 'Algorithmic roommate discovery matches students by exam goals, study schedules, and budget, while the P2P marketplace lets students trade books and gear.',
          tag: 'Peer Marketplace'
        },
        {
          step: '05',
          title: 'Budget Intelligence & Offline PWA',
          description: 'Interactive budget calculator estimates monthly living costs against city benchmarks, backed by an installable PWA with offline caching.',
          tag: 'PWA & Analytics'
        }
      ],
      coreCapabilities: [
        '🔎 Smart Local Discovery — Find PGs, hostels, mess/tiffin services, libraries, coaching centres and study spaces.',
        '🤖 AI Mitra — Gemini-powered student assistant for local guidance, safety and accommodation-related queries.',
        '💬 Real-Time Messaging — In-app 1-to-1 chat between students, owners and marketplace sellers.',
        '🛡️ Verification System — Verified student and PG badges with protected verification data.',
        '🛍️ Student Marketplace — Buy & sell used books, furniture, electronics, cycles and other essentials.',
        '🤝 Roommate Matching — Discover compatible roommates based on budget, exam goals and lifestyle.',
        '💰 Budget Intelligence — Estimate and visualize monthly living expenses using city-specific benchmarks.',
        '📱 PWA Experience — Installable app with responsive mobile, tablet and desktop support plus offline caching.',
        '🌐 Bilingual UI — Full Hindi & English experience for wider accessibility.'
      ],
      engineeringTradeoffs: [
        {
          title: 'Bilingual AI Processing vs. Response Latency',
          challenge: 'Providing instant responses in both Hindi and English while maintaining conversational safety for student welfare.',
          decision: 'Integrated Google Gemini AI with customized system instructions and prompt optimization on an Express edge proxy.',
          outcome: 'Sub-second natural language guidance in both Hindi and English for coaching students.'
        },
        {
          title: 'Direct Owner Connect vs. Student Trust & Safety',
          challenge: 'Allowing free communication between students and landlords without exposing students to scam listings.',
          decision: 'Created a dual verification badge system for students and verified properties, coupled with Firestore real-time messaging.',
          outcome: '100% broker-free ecosystem with verified ratings and direct in-app messaging.'
        }
      ],
      securityHardening: [
        'Protected verification data and credential security enforced via Cloud Firestore security rules',
        'In-app messaging payload sanitization to prevent XSS, phishing, and automated spam',
        'Server-side Express proxy shielding Gemini AI keys from browser exposure',
        'Role-based admin claim verification via Firebase Authentication'
      ],
      techStackBreakdown: [
        {
          category: 'Frontend & UI',
          skills: [
            { name: 'React 19 & TypeScript', purpose: 'Concurrent rendering and end-to-end type contracts' },
            { name: 'Tailwind CSS & Motion', purpose: 'High-contrast mobile readability and responsive micro-animations' },
            { name: 'PWA & Offline Cache', purpose: 'Installable app experience with offline capability' }
          ]
        },
        {
          category: 'AI & Backend',
          skills: [
            { name: 'Google Gemini AI', purpose: 'AI Mitra intelligent conversational assistant' },
            { name: 'Firebase & Firestore', purpose: 'Authentication, verified profiles, and real-time chat sync' },
            { name: 'Express & Vercel', purpose: 'Serverless API routing and edge deployment' }
          ]
        },
        {
          category: 'Media & Storage',
          skills: [
            { name: 'Cloudinary', purpose: 'Optimized student listing photo compression and CDN delivery' }
          ]
        }
      ],
      realWorldUseCases: [
        'Coaching students in Kota, Patna, Delhi relocating for JEE/NEET/UPSC exams',
        'Freshmen searching for verified PGs and hygienic 3x daily tiffin meal plans',
        'Students seeking compatible roommates with matching study schedules',
        'Seniors selling used reference books, study tables, and cycles to incoming batches'
      ]
    }
  }
];

// Zoom-Stable, Ultra-Premium LensDrop Interactive Simulator Preview
const LensDropVisual: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/25 p-3 sm:p-4 shadow-inner min-w-0">
      {/* Background Micro Grid Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Browser Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-3 min-w-0">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
        </div>
        
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono tracking-tight shadow-sm min-w-0 max-w-[180px] sm:max-w-none">
          <Lock className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
          <span className="font-semibold truncate">lensdrop.imprince.me</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline font-mono">PWA Live</span>
        </div>
      </div>

      {/* Simulator Interactive Grid - Fully Responsive on Zoom */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2.5 items-stretch min-w-0">
        {/* Holographic QR Scanner Pod */}
        <div className="sm:col-span-4 relative rounded-xl bg-slate-900/90 border border-cyan-500/40 p-2 sm:p-2.5 flex flex-col items-center justify-center text-center overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)] group/qr min-w-0">
          {/* Scanning Laser Beam Line */}
          <motion.div 
            animate={{ y: [-12, 36, -12] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#06b6d4] pointer-events-none z-10"
          />
          <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] flex-shrink-0" />
          <span className="mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-cyan-300 truncate w-full">Scan & Drop</span>
          <span className="text-[7px] text-slate-400 font-mono truncate w-full">No App Needed</span>
        </div>

        {/* Real-time Telemetry & Stream Ingestion */}
        <div className="sm:col-span-8 flex flex-col justify-between gap-1.5 min-w-0">
          {/* Compression Pipeline Meter */}
          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
              <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                <Zap className="w-3 h-3" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-slate-200 truncate">HTML5 Bilinear</p>
                <p className="text-[8px] text-slate-400 font-mono truncate">14.8MB → 2.1MB</p>
              </div>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[8px] sm:text-[9px] font-black text-emerald-400 font-mono flex-shrink-0 whitespace-nowrap">
              -72% Saved
            </span>
          </div>

          {/* Real-time Projector Feed Sync */}
          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
              <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                <Camera className="w-3 h-3" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-slate-200 truncate">Live Projector</p>
                <p className="text-[8px] text-slate-400 font-mono truncate">Firestore Real-Time</p>
              </div>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[8px] sm:text-[9px] font-black text-cyan-300 font-mono flex-shrink-0 whitespace-nowrap">
              &lt; 2s Sync
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Bottom Status Bar */}
      <div className="relative z-10 mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-1 text-[9px] sm:text-[10px] min-w-0">
        <span className="flex items-center gap-1.5 text-cyan-300 font-medium truncate">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse flex-shrink-0" />
          <span className="truncate">Zero Guest Credentials</span>
        </span>
        <span className="font-mono text-emerald-400 font-bold flex items-center gap-1 flex-shrink-0">
          <UploadCloud className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          <span>1-Click ZIP</span>
        </span>
      </div>
    </div>
  );
};

// Zoom-Stable, Ultra-Premium City Helpline Interactive Simulator Preview
const CityHelplineVisual: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/25 p-3 sm:p-4 shadow-inner min-w-0">
      {/* Background Micro Grid Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Browser Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-3 min-w-0">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
        </div>
        
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono tracking-tight shadow-sm min-w-0 max-w-[180px] sm:max-w-none">
          <Lock className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold truncate">app.imprince.me</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline font-mono">PWA Live</span>
        </div>
      </div>

      {/* Simulator Interactive Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 min-w-0">
        {/* AI Mitra Gemini Assistant Tile */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-400/60 transition-colors min-w-0 relative overflow-hidden group/mitra">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-1 gap-1">
            <div className="p-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex-shrink-0 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[9px] font-extrabold text-emerald-300">AI Mitra</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-[8px] font-black text-cyan-300 uppercase tracking-wider font-mono flex-shrink-0 border border-cyan-500/30">
              Gemini AI
            </span>
          </div>
          <div className="min-w-0 mt-1">
            <p className="text-[10px] font-bold text-white truncate">Local Safety & Living Guide</p>
            <p className="text-[8px] text-emerald-300 font-mono flex items-center gap-1 mt-0.5 truncate">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0 animate-pulse" />
              <span className="truncate">Hindi & English Assistant</span>
            </p>
          </div>
        </div>

        {/* Smart Discovery & Zero Brokerage Tile */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-teal-500/25 flex flex-col justify-between hover:border-teal-400/50 transition-colors min-w-0">
          <div className="flex items-center justify-between mb-1 gap-1">
            <div className="p-1 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 flex-shrink-0">
              <Building className="w-3.5 h-3.5" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-[8px] font-black text-emerald-300 uppercase tracking-wider font-mono flex-shrink-0">
              ₹0 Broker
            </span>
          </div>
          <div className="min-w-0 mt-1">
            <p className="text-[10px] font-bold text-white truncate">Smart PG & Mess Search</p>
            <p className="text-[8px] text-slate-400 font-mono flex items-center gap-1 mt-0.5 truncate">
              <ShieldCheck className="w-2.5 h-2.5 text-teal-400 flex-shrink-0" />
              <span className="truncate">Verified Badges & 1:1 Chat</span>
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Bottom Status Bar */}
      <div className="relative z-10 mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-1 text-[9px] sm:text-[10px] min-w-0">
        <span className="flex items-center gap-1.5 text-emerald-300 font-medium truncate">
          <MessageSquare className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          <span className="truncate">Real-Time Messaging & Roommates</span>
        </span>
        <span className="font-mono text-teal-300 font-bold flex items-center gap-1 flex-shrink-0">
          <Languages className="w-3 h-3 text-teal-300 flex-shrink-0" />
          <span>Bilingual UI</span>
        </span>
      </div>
    </div>
  );
};

// Main Exported Projects Section: Both Cards Always Visible, Zoom-Proof, Ultra-Premium
export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="relative py-16 sm:py-24 z-10 overflow-hidden">
      {/* Dynamic Background Light Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,rgba(16,185,129,0.04)_40%,transparent_70%)] pointer-events-none" />

      <div className="container px-4 sm:px-6 mx-auto max-w-6xl relative z-10 min-w-0">
        
        {/* Section Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-10 sm:mb-14 min-w-0"
        >
          <motion.div 
            variants={itemPop}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4 shadow-[0_0_25px_rgba(6,182,212,0.2)]"
          >
            <FolderGit2 className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
            <span>FEATURED PRODUCTION PLATFORMS</span>
          </motion.div>

          <motion.h2 
            variants={itemFadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 tracking-tight mb-3 sm:mb-4 break-words"
          >
            Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">Deployments</span>
          </motion.h2>

          <motion.p
            variants={itemFadeUp}
            className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2 leading-relaxed font-medium break-words"
          >
            High-impact, production-grade cloud architectures built for real-world reliability, instant user onboarding, and sub-second performance.
          </motion.p>
        </motion.div>

        {/* Dual Project Cards Showcase - Both Cards Simultaneously Visible & Zoom Stable */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-8 items-stretch min-w-0"
        >
          {projectsData.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemFadeUp}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full flex flex-col min-w-0 w-full"
            >
              <SpotlightCard
                className={`relative group h-full rounded-3xl sm:rounded-[2.4rem] overflow-hidden flex flex-col p-5 sm:p-7 md:p-8 bg-white/85 dark:bg-slate-950/85 border border-black/10 dark:border-white/15 shadow-[0_15px_45px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-3xl transition-all duration-500 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 min-w-0`}
                spotlightColor={project.spotlightColor}
              >
                {/* Luminous Ambient Glow */}
                <div 
                  className={`absolute -inset-1 bg-gradient-to-r ${project.accentGradient} rounded-3xl sm:rounded-[2.4rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} 
                />
                <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

                {/* Top Interactive Visual Preview Window */}
                <div className="relative mb-4 sm:mb-5 min-w-0">
                  {project.id === 'lensdrop' && <LensDropVisual />}
                  {project.id === 'city-helpline' && <CityHelplineVisual />}
                </div>

                {/* Metadata Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span 
                      className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0 shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span 
                      className="text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r truncate"
                      style={{ backgroundImage: `linear-gradient(to right, ${project.accentColor}, #3b82f6)` }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-xs font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0 shadow-sm font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {project.typeBadge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 tracking-tight mb-1 group-hover:text-cyan-400 transition-colors duration-300 break-words">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-cyan-600 dark:text-cyan-400 mb-3 break-words">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal break-words">
                  {project.description}
                </p>

                {/* Bento Key Metrics Grid - Adaptive 2-col to 4-col for Zoom Stability */}
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-2 mb-4 min-w-0">
                  {project.keyMetrics.map((metric, idx) => (
                    <div 
                      key={idx} 
                      className="p-2 sm:p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-left transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-cyan-500/30 group/metric min-w-0 flex flex-col justify-between"
                    >
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">{metric.label}</p>
                      <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5 tracking-tight group-hover/metric:text-cyan-400 transition-colors truncate">{metric.value}</p>
                      <p className="text-[9px] text-cyan-600 dark:text-cyan-400 truncate mt-0.5 font-semibold">{metric.subtext}</p>
                    </div>
                  ))}
                </div>

                {/* Key Highlights */}
                <div className="space-y-1.5 mb-4 min-w-0">
                  {project.shortHighlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 min-w-0">
                      <div className="p-0.5 rounded-full bg-emerald-500/15 text-emerald-400 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug font-medium break-words">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="mb-5 mt-auto min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Engineered With
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/10 shadow-sm backdrop-blur-md transition-all hover:border-cyan-500/40 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Footer - Fluid on all zoom scales */}
                <div className="pt-3.5 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 min-w-0">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${project.id === 'lensdrop' ? 'from-cyan-500 via-blue-600 to-indigo-600 shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_28px_rgba(6,182,212,0.55)]' : 'from-emerald-500 via-teal-600 to-cyan-600 shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_28px_rgba(16,185,129,0.55)]'} transition-all cursor-pointer flex-1 sm:flex-initial text-center`}
                    >
                      <span>Launch Live</span>
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    </motion.a>

                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border border-black/10 dark:border-white/15 transition-all cursor-pointer flex-1 sm:flex-initial text-center"
                    >
                      <Github className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Code</span>
                    </motion.a>
                  </div>

                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center sm:justify-end gap-1 text-xs font-black text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 py-1.5 px-2 rounded-lg transition-colors cursor-pointer group/btn flex-shrink-0"
                  >
                    <span>Full Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Case Study Deep-Dive Modal - Fluid on Zoom */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Detailed Modal Window Component
const ProjectDetailModal: React.FC<{
  project: ProjectData;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'architecture' | 'stack'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl transition-opacity"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 text-slate-100 border border-slate-700/80 shadow-[0_25px_90px_rgba(0,0,0,0.95)] p-4 sm:p-6 md:p-8 z-20 flex flex-col min-w-0"
      >
        <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b border-slate-800 min-w-0">
          <div className="min-w-0 pr-2 flex-1">
            <span 
              className="text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r truncate block"
              style={{ backgroundImage: `linear-gradient(to right, ${project.accentColor}, #3b82f6)` }}
            >
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5 break-words">
              {project.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-cyan-400 mt-1 break-words">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3 min-w-0">
          {(['overview', 'architecture', 'stack'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveModalTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer ${
                activeModalTab === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab === 'stack' ? 'Tech Stack & Security' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeModalTab === 'overview' && (
          <div className="space-y-6 min-w-0">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 min-w-0">
              <h3 className="text-xs font-black uppercase tracking-wider text-red-400 mb-2">The Real-World Challenge</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">{project.detail.problem}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 min-w-0">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-2">The Engineered Solution</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">{project.detail.solution}</p>
            </div>

            <div className="space-y-3 min-w-0">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">Core Capabilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-w-0">
                {project.detail.coreCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="break-words">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModalTab === 'architecture' && (
          <div className="space-y-6 min-w-0">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-900 border border-slate-800 break-words">
              {project.detail.architectureOverview}
            </p>

            <div className="space-y-3 min-w-0">
              <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400">Step-by-Step Architecture Pipeline</h3>
              <div className="space-y-2.5 min-w-0">
                {project.detail.architectureSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 min-w-0">
                    <span className="font-mono text-base font-black text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 flex-shrink-0">
                      {step.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{step.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full flex-shrink-0">{step.tag}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed break-words">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModalTab === 'stack' && (
          <div className="space-y-6 min-w-0">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 min-w-0">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Security & Hardening Protocol</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-w-0">
                {project.detail.securityHardening.map((sec, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 min-w-0">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="break-words">{sec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 min-w-0">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">Tech Stack with Purpose</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 min-w-0">
                {project.detail.techStackBreakdown.map((group, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 truncate">{group.category}</p>
                    <div className="space-y-1.5">
                      {group.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-xs min-w-0">
                          <p className="font-bold text-white truncate">{skill.name}</p>
                          <p className="text-[10px] text-slate-400 break-words">{skill.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 min-w-0">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 shadow-md hover:shadow-lg transition-all"
            >
              <span>Launch Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
