import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, Sparkles, Terminal, Bot } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ['hero', 'about', 'skills', 'credentials', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2.5 sm:py-3 md:py-4 pointer-events-none">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between px-3.5 sm:px-5 md:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-500 backdrop-blur-3xl relative overflow-hidden ${
            isScrolled 
              ? 'bg-white/85 dark:bg-slate-950/80 border border-white/60 dark:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]' 
              : 'bg-white/60 dark:bg-slate-950/50 border border-white/40 dark:border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Top Liquid Specular Bevel Line */}
          <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

          {/* Brand Logo with 3D glowing badge */}
          <a 
            href="#hero" 
            className="group flex items-center gap-2 sm:gap-2.5 z-50 text-sm sm:text-base md:text-lg font-black tracking-tight text-foreground transition-transform hover:scale-105 min-w-0"
            aria-label="ImPrince Tectra Home"
          >
            <div className="relative flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 group-hover:scale-110">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center backdrop-blur-md">
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 dark:text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-extrabold tracking-tight truncate">
              ImPrince <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">Tectra</span>
            </span>
          </a>

          {/* Desktop Navigation Links (Fluid and Adaptive) */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-black/[0.03] dark:bg-white/[0.04] p-1 lg:p-1.5 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-2.5 lg:px-4 py-1 lg:py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Status Pill on Desktop */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Hire</span>
            </div>

            {/* AI Assistant Quick Launcher */}
            <motion.button
              id="nav-chat-btn"
              onClick={() => window.dispatchEvent(new CustomEvent('open-tectra-chat'))}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
              title="Chat with Tectra AI"
            >
              <Bot className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">Ask AI</span>
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button 
              onClick={toggleTheme}
              whileHover={{ scale: 1.08, rotate: 18 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 sm:p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/10 transition-colors shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              )}
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-800 dark:text-white md:hidden border border-black/5 dark:border-white/10"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation Drawer with Safe Scroll & Sizing */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-x-3 sm:inset-x-4 top-18 sm:top-20 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:hidden p-4 sm:p-6 max-h-[calc(100vh-5.5rem)] overflow-y-auto custom-scrollbar"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <motion.a 
                  key={link.name}
                  href={link.href} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                    activeSection === link.href.substring(1)
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{link.name}</span>
                  <Sparkles className="w-4 h-4 opacity-70" />
                </motion.a>
              ))}

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for new projects
                </span>
                <span>IIT Patna CSDA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

