import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, MapPin, Globe, MessageCircle, 
  Github, Linkedin, Instagram, Sparkles, Send, Copy, Check, 
  Clock, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { SpotlightCard } from './spotlight-card';
import { staggerContainer, itemFadeUp, itemPop } from '../../lib/animations';

const ContactChannelRow = ({ 
  icon: Icon, 
  label, 
  value, 
  href,
  canCopy = true,
  onCopied
}: { 
  icon: any;
  label: string; 
  value: string; 
  href?: string;
  canCopy?: boolean;
  onCopied?: (text: string) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    if (onCopied) onCopied(value);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-[1.75rem] bg-slate-900/60 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/50 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_30px_rgba(6,182,212,0.25)] transition-all duration-300 overflow-hidden"
    >
      {/* Top Liquid Specular Bevel Line */}
      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

      {/* Hover Liquid Fill Gradient Wave */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main Channel Content */}
      <a 
        href={href}
        target={href?.startsWith('http') ? "_blank" : undefined}
        rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="relative p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 shrink-0">
          <Icon className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 animate-ping" />
        </div>

        <div className="min-w-0 flex-1 text-left">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            {label}
          </p>
          <p className="text-sm sm:text-base font-extrabold text-slate-100 group-hover:text-cyan-300 transition-colors truncate tracking-tight">
            {value}
          </p>
        </div>
      </a>

      {/* Copy / Link Indicator Action */}
      <div className="flex items-center gap-2 ml-3 shrink-0">
        {canCopy && (
          <button
            onClick={handleCopy}
            className={`p-2 rounded-xl border text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/30'
            }`}
            title="Copy to clipboard"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">Copied</span>
              </>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};

const LiquidLetsConnectCard = ({ onToast }: { onToast: (msg: string) => void }) => {
  return (
    <SpotlightCard 
      className="relative rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-14 overflow-hidden border border-white/15 bg-slate-950/75 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
      spotlightColor="rgba(6, 182, 212, 0.28)"
    >
      {/* Outer Prismatic Aura Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-[3rem] blur-3xl opacity-20 pointer-events-none" />

      {/* Top Specular Arc */}
      <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-14">
        
        {/* Left Column: Vision & Quick CTA */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6 text-left">
          <div className="space-y-4">
            <motion.div 
              variants={itemPop}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black uppercase tracking-wider text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>COMMUNICATION HIGHWAY</span>
            </motion.div>

            {/* Liquid Heading */}
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                LET'S <br/>
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                  CONNECT
                </span>
              </h2>
            </div>
            
            <p className="text-slate-300 text-base md:text-lg max-w-md leading-relaxed font-normal">
              Looking for intelligent autonomous AI workflows, scalable neural systems, or high-performance full-stack architectures? Let's build what's next.
            </p>
          </div>

          {/* Quick Action Liquid Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="mailto:kusprince.raj@gmail.com?subject=Collaboration%20Inquiry%20via%20Portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white font-extrabold text-sm shadow-[0_10px_30px_rgba(6,182,212,0.4)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.65)] border border-white/30 transition-all duration-500 overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <Send className="w-4 h-4 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                <span className="relative z-10 tracking-wide">Send Direct Email</span>
              </motion.a>

              <motion.button
                onClick={() => {
                  navigator.clipboard.writeText("kusprince.raj@gmail.com");
                  onToast("Email address copied to clipboard! ✨");
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-slate-900/60 backdrop-blur-2xl border border-white/15 text-slate-200 hover:text-cyan-300 font-bold text-sm shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Copy Email</span>
              </motion.button>
            </div>

            {/* Availability Badges */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                IST / Global Remote
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Direct Communication
              </span>
            </div>
          </div>
        </div>

        {/* Right Interactive Channels Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-3">
          <ContactChannelRow 
            icon={Mail} 
            label="Primary Contact" 
            value="kusprince.raj@gmail.com" 
            href="mailto:kusprince.raj@gmail.com"
            onCopied={() => onToast("Primary email copied! ✨")}
          />
          <ContactChannelRow 
            icon={Mail} 
            label="Domain Address" 
            value="developer@imprince.me" 
            href="mailto:developer@imprince.me"
            onCopied={() => onToast("Domain email copied! ✨")}
          />
          <ContactChannelRow 
            icon={Phone} 
            label="Phone / Call" 
            value="+91 8252995548" 
            href="tel:+918252995548"
            onCopied={() => onToast("Phone number copied! ✨")}
          />
          <ContactChannelRow 
            icon={MapPin} 
            label="Base Location" 
            value="India (Available Remotely)" 
            canCopy={false}
          />
          <ContactChannelRow 
            icon={Globe} 
            label="Brand Identity" 
            value="ImPrince Tectra" 
            href="https://github.com/princeraj-in"
            canCopy={false}
          />
        </div>
      </div>
    </SpotlightCard>
  );
};

const LiquidWhatsAppCard = () => (
  <SpotlightCard 
    className="relative group rounded-[2.75rem] overflow-hidden border border-emerald-500/20 backdrop-blur-3xl bg-slate-950/60 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" 
    spotlightColor="rgba(34, 197, 94, 0.3)"
  >
    {/* Liquid Emerald Background Orb */}
    <motion.div 
      animate={{
        borderRadius: [
          "50% 50% 40% 60% / 60% 40% 60% 40%",
          "40% 60% 50% 50% / 40% 60% 40% 60%",
          "50% 50% 40% 60% / 60% 40% 60% 40%"
        ],
        scale: [1, 1.15, 1],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -inset-10 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-400/20 blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" 
    />
    
    {/* Top Specular Arc */}
    <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none" />

    <div className="relative z-10 flex flex-col items-center text-center p-8 sm:p-10 md:p-12">
      
      {/* Floating Organic Liquid Droplet */}
      <motion.div 
        animate={{ y: [-6, 6, -6] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full" />
        <div className="relative p-5 rounded-[2rem] bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] backdrop-blur-2xl">
          <MessageCircle className="w-10 h-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]" />
        </div>
      </motion.div>

      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
        Instant Messaging Channel
      </h3>
      
      <p className="text-slate-300 max-w-lg mb-8 text-base md:text-lg leading-relaxed font-normal">
        For immediate syncs, quick technical consultations, or real-time project inquiries, connect directly on WhatsApp.
      </p>
      
      <div className="relative group/btn">
        <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute -inset-2 rounded-full bg-emerald-500/30 blur-xl opacity-60 group-hover/btn:opacity-100 transition-opacity duration-500" />

        <motion.a 
          href="https://wa.me/918252995548" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-3 px-9 py-4.5 rounded-full backdrop-blur-3xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 bg-[length:200%_auto] hover:bg-right text-white font-extrabold tracking-wide shadow-[0_12px_35px_rgba(16,185,129,0.45)] hover:shadow-[0_18px_50px_rgba(16,185,129,0.7)] border border-white/30 transition-all duration-500 overflow-hidden cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            animate={{ translateX: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <MessageCircle className="w-5 h-5 relative z-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <span className="relative z-10 text-white font-black tracking-wider uppercase text-sm">
            Chat on WhatsApp
          </span>
        </motion.a>
      </div>
    </div>
  </SpotlightCard>
);

const SocialIcon = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={itemPop}
    whileHover={{ scale: 1.12, y: -4 }}
    whileTap={{ scale: 0.94 }}
    className="flex flex-col items-center gap-2 group cursor-pointer"
    aria-label={label}
  >
    <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/15 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300">
      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
    </div>
    <span className="text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
      {label}
    </span>
  </motion.a>
);

export const ContactFooter: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <motion.section 
      id="contact" 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      className="relative pt-24 pb-12 bg-transparent overflow-hidden z-10 transition-colors duration-300"
    >
      {/* Toast Notification for Clipboard */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/95 text-white backdrop-blur-2xl border border-cyan-500/50 shadow-[0_15px_35px_rgba(6,182,212,0.4)] text-xs font-bold tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container px-4 md:px-6 mx-auto max-w-5xl space-y-10 relative z-10">
        <motion.div variants={itemFadeUp}>
          <LiquidLetsConnectCard onToast={showToast} />
        </motion.div>
        
        <motion.div variants={itemFadeUp}>
          <LiquidWhatsAppCard />
        </motion.div>
      </div>
      
      {/* Bottom Footer Glass Strip with Staggered Elements */}
      <motion.div 
        variants={itemFadeUp}
        className="mt-24 border-t border-white/10 pt-8 relative z-10"
      >
        <div className="container px-4 md:px-6 mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
          <div className="flex items-center gap-5 sm:gap-6">
            <SocialIcon href="mailto:kusprince.raj@gmail.com" icon={Mail} label="Email" />
            <SocialIcon href="https://github.com/princeraj-in" icon={Github} label="GitHub" />
            <SocialIcon href="https://www.linkedin.com/in/princeraj-in/" icon={Linkedin} label="LinkedIn" />
            <SocialIcon href="https://instagram.com/princerjjjjj" icon={Instagram} label="Instagram" />
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm font-semibold">
              © {new Date().getFullYear()} <span className="text-cyan-400 font-bold">ImPrince Tectra</span> (Prince Raj).
            </p>
            <p className="text-slate-500 text-xs mt-0.5">
              All intellectual property & computational models reserved.
            </p>
          </div>

          <div className="text-slate-500 text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Crafted for the Intelligent Era</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
