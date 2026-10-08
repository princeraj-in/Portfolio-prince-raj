import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Download,
  Zap,
  ArrowUpRight,
  MessageSquare,
  Activity,
} from 'lucide-react';
import {
  useChatbot,
  CATEGORIZED_PROMPTS,
} from '../../lib/chat';

interface ProfileChatbotProps {
  onNavigate?: (to: string) => void;
}

// Interactive dynamic action pills based on message content
const MessageActionChips: React.FC<{ content: string }> = ({ content }) => {
  const actions: Array<{
    label: string;
    href: string;
    isExternal: boolean;
    color: string;
    icon?: string;
  }> = [];
  const lower = content.toLowerCase();

  if (lower.includes('studolink') || lower.includes('student ecosystem')) {
    actions.push({
      label: 'Launch Studolink Platform',
      href: 'https://studolink.imprince.me',
      isExternal: true,
      color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    });
  }

  if (lower.includes('lensdrop') || lower.includes('qr upload') || lower.includes('event media')) {
    actions.push({
      label: 'Explore LensDrop Live',
      href: 'https://lensdrop.imprince.me',
      isExternal: true,
      color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    });
  }

  if (lower.includes('whatsapp') || lower.includes('8252995548') || lower.includes('chat with prince')) {
    actions.push({
      label: 'Direct WhatsApp Chat',
      href: 'https://wa.me/918252995548',
      isExternal: true,
      color: 'bg-green-500/10 text-green-300 border-green-500/30 hover:bg-green-500/20 hover:border-green-400/50 shadow-[0_0_12px_rgba(34,197,94,0.15)]',
    });
  }

  if (lower.includes('email') || lower.includes('kusprince.raj@gmail.com') || lower.includes('hire') || lower.includes('contact')) {
    actions.push({
      label: 'Send Direct Email',
      href: 'mailto:kusprince.raj@gmail.com',
      isExternal: false,
      color: 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-400/50 shadow-[0_0_12px_rgba(59,130,246,0.15)]',
    });
  }

  if (lower.includes('linkedin')) {
    actions.push({
      label: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/princeraj-in/',
      isExternal: true,
      color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-400/50 shadow-[0_0_12px_rgba(99,102,241,0.15)]',
    });
  }

  if (lower.includes('certificat') || lower.includes('google') || lower.includes('ibm') || lower.includes('aws')) {
    actions.push({
      label: 'View Verified Credentials',
      href: '#credentials',
      isExternal: false,
      color: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    });
  }

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-white/[0.08]">
      {actions.map((act, i) => (
        <a
          key={i}
          href={act.href}
          target={act.isExternal ? '_blank' : undefined}
          rel={act.isExternal ? 'noopener noreferrer' : undefined}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all duration-200 cursor-pointer ${act.color}`}
        >
          <span>{act.label}</span>
          <ArrowUpRight className="w-3 h-3 opacity-80" />
        </a>
      ))}
    </div>
  );
};

// Animated Audio Waveform for Speaking Assistant
const AudioWaveform: React.FC = () => {
  return (
    <div className="flex items-center gap-0.5 h-3 px-1">
      {[40, 90, 60, 100, 50, 80].map((h, i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-cyan-400"
          animate={{ height: ['20%', `${h}%`, '20%'] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.12,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export const ProfileChatbot: React.FC<ProfileChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    messages,
    input,
    setInput,
    isLoading,
    copiedId,
    activeCategory,
    setActiveCategory,
    isListening,
    toggleVoiceInput,
    speakingMessageId,
    toggleReadAloud,
    soundEnabled,
    toggleSound,
    handleSend,
    handleReset,
    copyToClipboard,
    exportConversation,
  } = useChatbot();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized, messages, isLoading]);

  // Global trigger listener for 'open-tectra-chat'
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      setIsMinimized(false);
      if (customEvent.detail?.query) {
        handleSend(customEvent.detail.query);
      }
    };

    window.addEventListener('open-tectra-chat', handleOpenEvent);
    return () => window.removeEventListener('open-tectra-chat', handleOpenEvent);
  }, [handleSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentCategoryObj =
    CATEGORIZED_PROMPTS.find((c) => c.id === activeCategory) ||
    CATEGORIZED_PROMPTS[0];

  return (
    <div id="profile-chatbot-root" className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Ultra-Premium Holographic Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="relative group"
          >
            {/* Outer Cybernetic Orbital Ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-dashed border-cyan-400/30 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00ffff]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_6px_#38bdf8]" />
            </motion.div>

            {/* Ambient Aurora Glow */}
            <motion.div
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 opacity-60 blur-xl group-hover:opacity-100 group-hover:scale-115 transition-all duration-500 pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Floating Luxury Tooltip on Hover */}
            <div className="absolute -top-12 right-0 hidden group-hover:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/95 border border-cyan-500/40 text-xs font-semibold text-cyan-200 shadow-[0_12px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl whitespace-nowrap pointer-events-none transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Ask Tectra AI Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Circular Cybernetic Trigger Button */}
            <motion.button
              id="chatbot-launcher-btn"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] overflow-hidden shadow-[0_10px_35px_rgba(6,182,212,0.45)] hover:shadow-[0_15px_45px_rgba(6,182,212,0.7)] transition-shadow duration-500 cursor-pointer flex items-center justify-center select-none"
              aria-label="Open Tectra AI Assistant"
            >
              {/* Rotating Conic Gradient Border */}
              <motion.div
                className="absolute -inset-[100%] pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, #00ffff 0%, #06b6d4 25%, #3b82f6 50%, #6366f1 75%, #00ffff 100%)',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Obsidian Liquid Glass Core Orb */}
              <div className="relative z-10 w-full h-full rounded-full bg-slate-950/95 hover:bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center border border-white/10 group-hover:border-cyan-400/40 transition-colors overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_15%,rgba(0,255,255,0.45),transparent_65%)] pointer-events-none" />

                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.9)] group-hover:scale-110 transition-transform duration-300" />
                </motion.div>

                {/* Emerald Active Status Pulse */}
                <span className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-slate-950 shadow-[0_0_8px_#34d399]" />
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Ultra-Premium Chat Studio Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`w-[calc(100vw-2rem)] ${
              isExpanded
                ? 'sm:w-[620px] md:w-[720px] h-[680px] max-h-[90vh]'
                : 'sm:w-[420px] md:w-[460px] h-[590px] max-h-[85vh]'
            } ${
              isMinimized ? '!h-auto' : ''
            } rounded-3xl bg-[#090d16]/95 border border-cyan-500/35 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_45px_rgba(6,182,212,0.18)] backdrop-blur-3xl flex flex-col overflow-hidden text-slate-100 transition-all duration-300`}
          >
            {/* Top Specular Neon Beam Highlight */}
            <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent pointer-events-none" />

            {/* Studio Header Bar */}
            <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-white/[0.08] bg-gradient-to-r from-slate-950/90 via-[#0b101d]/90 to-slate-950/90">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-[0_0_18px_rgba(6,182,212,0.45)] border border-cyan-400/30">
                  <Bot className="w-4.5 h-4.5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-[0_0_8px_#34d399]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 shadow-[0_0_16px_rgba(6,182,212,0.3)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                      <strong className="text-xs sm:text-sm font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-200 uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                        Tetra AI
                      </strong>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1.5 truncate mt-1 font-medium">
                    <span className="truncate">Prince Raj's Portfolio Intelligence</span>
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Sound FX Toggle */}
                <button
                  id="chatbot-sound-toggle-btn"
                  onClick={toggleSound}
                  title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                    soundEnabled
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                      : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Export Markdown Transcript */}
                <button
                  id="chatbot-export-btn"
                  onClick={exportConversation}
                  title="Export chat transcript (.md)"
                  className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] rounded-xl transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                {/* Full-Page Studio Mode */}
                <button
                  id="chatbot-fullpage-btn"
                  onClick={() => {
                    setIsOpen(false);
                    if (onNavigate) {
                      onNavigate('/chat');
                    } else {
                      window.history.pushState({}, '', '/chat');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                  title="Switch to Full-Page Studio"
                  className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] rounded-xl transition-all cursor-pointer hidden sm:block"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {/* Expand Width Toggle */}
                <button
                  id="chatbot-expand-toggle-btn"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? 'Normal Window' : 'Widescreen Window'}
                  className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] rounded-xl transition-all cursor-pointer hidden sm:block"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Reset Conversation */}
                <button
                  id="chatbot-reset-btn"
                  onClick={handleReset}
                  title="Clear conversation"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Minimize Toggle */}
                <button
                  id="chatbot-minimize-btn"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] rounded-xl transition-all cursor-pointer"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>

                {/* Close Window */}
                <button
                  id="chatbot-close-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Window Content Body */}
            {!isMinimized && (
              <>
                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    const isSpeakingThis = speakingMessageId === msg.id;

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {/* Bot Avatar */}
                        {!isUser && (
                          <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md mt-1 border border-cyan-400/30">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        {/* Message Bubble Card */}
                        <div
                          className={`relative group max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed transition-all ${
                            isUser
                              ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_6px_22px_rgba(6,182,212,0.35)]'
                              : 'bg-white/[0.035] border border-white/[0.08] text-slate-200 rounded-tl-sm shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl'
                          }`}
                        >
                          <div className="markdown-body prose prose-invert max-w-none text-slate-200 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-cyan-300 prose-a:text-cyan-400 hover:prose-a:underline">
                            <Markdown>{msg.content}</Markdown>
                          </div>

                          {/* 1-Click Retry Button if Error */}
                          {msg.isError && msg.failedPrompt && (
                            <div className="mt-2.5 pt-2 border-t border-rose-500/30 flex items-center justify-between gap-2">
                              <button
                                onClick={() => handleSend(msg.failedPrompt)}
                                disabled={isLoading}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 hover:from-rose-500/30 hover:to-amber-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 hover:text-white transition-all cursor-pointer shadow-sm disabled:opacity-50"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Retry Query</span>
                              </button>
                              <span className="text-[10px] text-rose-400/80 font-mono">Temporary high demand</span>
                            </div>
                          )}

                          {/* Dynamic Action Chips if mentioned */}
                          {!isUser && !msg.isError && <MessageActionChips content={msg.content} />}

                          {/* Message Metadata & Control Footer */}
                          <div className="flex items-center justify-between gap-3 mt-2.5 pt-1.5 border-t border-white/[0.07] text-[10px] text-slate-400 font-mono">
                            <span>{msg.timestamp}</span>

                            {!isUser && (
                              <div className="flex items-center gap-3">
                                {/* Read Aloud Toggle */}
                                <button
                                  onClick={() => toggleReadAloud(msg.id, msg.content)}
                                  className={`flex items-center gap-1 transition-colors cursor-pointer ${
                                    isSpeakingThis ? 'text-cyan-300 font-bold' : 'hover:text-cyan-300 text-slate-400'
                                  }`}
                                  title={isSpeakingThis ? 'Stop speaking' : 'Listen with AI voice'}
                                >
                                  {isSpeakingThis ? <AudioWaveform /> : <Volume2 className="w-3 h-3" />}
                                  <span>{isSpeakingThis ? 'Speaking' : 'Listen'}</span>
                                </button>

                                {/* Copy Button */}
                                <button
                                  onClick={() => copyToClipboard(msg.content, msg.id)}
                                  className="flex items-center gap-1 hover:text-cyan-300 text-slate-400 transition-colors cursor-pointer"
                                  title="Copy response"
                                >
                                  {copiedId === msg.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400 font-sans">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span className="font-sans">Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* User Avatar */}
                        {isUser && (
                          <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 mt-1">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Thinking / Neural Synthesis Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md mt-1 border border-cyan-400/30">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-cyan-500/30 flex items-center gap-2.5 shadow-lg backdrop-blur-xl">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="text-xs text-cyan-300 ml-1 font-mono font-medium">
                          Synthesizing knowledge...
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Categorized Quick Prompts Strip */}
                <div className="px-3.5 py-2.5 border-t border-white/[0.08] bg-[#070b12]/90">
                  {/* Category Tabs */}
                  <div className="flex items-center gap-1 mb-2 overflow-x-auto no-scrollbar pb-0.5">
                    {CATEGORIZED_PROMPTS.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                          activeCategory === cat.id
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                            : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Prompts In Selected Category */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
                    {currentCategoryObj.prompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        id={`chat-prompt-pill-${idx}`}
                        onClick={() => handleSend(prompt.query)}
                        disabled={isLoading}
                        className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-[11px] font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      >
                        <Zap className="w-2.5 h-2.5 text-cyan-400" />
                        <span>{prompt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Command Dock */}
                <div className="p-3 border-t border-white/[0.08] bg-[#070a12]/95">
                  <div className="relative flex items-center gap-2 bg-[#0d121e]/90 border border-white/[0.1] focus-within:border-cyan-400/70 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all">
                    {/* Voice Microphone Button */}
                    <button
                      id="chatbot-voice-btn"
                      onClick={toggleVoiceInput}
                      title={isListening ? 'Stop listening' : 'Speak into microphone'}
                      className={`flex-shrink-0 p-2 rounded-xl border transition-all cursor-pointer ${
                        isListening
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                          : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    {/* Text Input */}
                    <input
                      ref={inputRef}
                      id="chatbot-input"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={isListening ? 'Listening to voice...' : 'Ask Tectra AI anything about Prince Raj...'}
                      disabled={isLoading}
                      className="w-full bg-transparent border-none px-2 py-1.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 disabled:opacity-50 font-medium"
                    />

                    {/* Send Button */}
                    <button
                      id="chatbot-send-btn"
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white disabled:opacity-40 shadow-md hover:shadow-cyan-500/30 transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
                      title="Send prompt"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Micro Footer Telemetry */}
                  <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                      Tetra AI
                    </span>
                    <span className="text-slate-400">
                      ImPrince Tectra • Autonomous Portfolio
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
