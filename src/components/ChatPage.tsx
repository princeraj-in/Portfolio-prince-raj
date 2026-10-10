import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import {
  Bot,
  Send,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  User,
  Copy,
  Check,
  Award,
  Cpu,
  Mail,
  Rocket,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Download,
  ExternalLink,
  Zap,
  ShieldCheck,
  Flame,
  Terminal,
  Activity,
  Layers,
} from 'lucide-react';
import { useChatbot, CATEGORIZED_PROMPTS } from '../lib/chat';
import { NeuralVortexBackground } from './ui/NeuralVortexBackground';
import { CursorGlow } from './ui/CursorGlow';

interface ChatPageProps {
  onNavigate: (to: string) => void;
}

const SUGGESTION_CARDS = [
  {
    icon: Bot,
    title: 'Autonomous AI Agents',
    subtitle: 'Multi-agent swarms, LangGraph, CrewAI & RAG workflows',
    query: "How does Prince design and deploy autonomous AI agent systems and RAG workflows?",
    glow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    border: 'border-cyan-500/30 hover:border-cyan-400',
    iconColor: 'text-cyan-400',
    badge: 'Flagship Architecture',
  },
  {
    icon: Rocket,
    title: 'Production Platforms',
    subtitle: 'Studolink & LensDrop high-scale cloud platforms',
    query: "Tell me about Prince's featured projects: Studolink and LensDrop.",
    glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    iconColor: 'text-emerald-400',
    badge: 'Live Deployments',
  },
  {
    icon: Cpu,
    title: 'Technical Arsenal',
    subtitle: 'React 19, TypeScript, PyTorch, Node.js & Cloud',
    query: "What is Prince's primary technical stack across full stack and AI engineering?",
    glow: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    border: 'border-purple-500/30 hover:border-purple-400',
    iconColor: 'text-purple-400',
    badge: 'Modern Toolchain',
  },
  {
    icon: Award,
    title: 'Verified Accreditations',
    subtitle: '7 global credentials from Google, IBM & AWS Cloud',
    query: "What certifications does Prince hold from Google, IBM, and AWS?",
    glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    border: 'border-amber-500/30 hover:border-amber-400',
    iconColor: 'text-amber-400',
    badge: 'Google • IBM • AWS',
  },
  {
    icon: Mail,
    title: 'Direct Collaboration',
    subtitle: 'WhatsApp, priority email & LinkedIn opportunities',
    query: "How can I contact or hire Prince Raj for contract or full-time roles?",
    glow: 'from-rose-500/20 via-pink-500/10 to-transparent',
    border: 'border-rose-500/30 hover:border-rose-400',
    iconColor: 'text-rose-400',
    badge: 'Open to Roles',
  },
];

const MessageActionChips: React.FC<{ content: string }> = ({ content }) => {
  const actions = [];
  const lower = content.toLowerCase();

  if (lower.includes('studolink') || lower.includes('student ecosystem')) {
    actions.push({
      label: '🚀 Launch Studolink',
      href: 'https://studolink.imprince.me',
      isExternal: true,
      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    });
  }

  if (lower.includes('lensdrop') || lower.includes('qr upload')) {
    actions.push({
      label: '📸 Launch LensDrop',
      href: 'https://lensdrop.imprince.me',
      isExternal: true,
      color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/25 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    });
  }

  if (lower.includes('whatsapp') || lower.includes('8252995548') || lower.includes('phone')) {
    actions.push({
      label: '💬 Chat on WhatsApp',
      href: 'https://wa.me/918252995548',
      isExternal: true,
      color: 'bg-green-500/15 text-green-300 border-green-500/40 hover:bg-green-500/25 shadow-[0_0_15px_rgba(34,197,94,0.15)]',
    });
  }

  if (lower.includes('email') || lower.includes('kusprince.raj@gmail.com') || lower.includes('hire')) {
    actions.push({
      label: '✉️ Email Prince Direct',
      href: 'mailto:kusprince.raj@gmail.com',
      isExternal: false,
      color: 'bg-blue-500/15 text-blue-300 border-blue-500/40 hover:bg-blue-500/25 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    });
  }

  if (lower.includes('linkedin')) {
    actions.push({
      label: '💼 LinkedIn Profile',
      href: 'https://www.linkedin.com/in/princeraj-in/',
      isExternal: true,
      color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/25 shadow-[0_0_15px_rgba(99,102,241,0.15)]',
    });
  }

  if (lower.includes('certificat') || lower.includes('google') || lower.includes('ibm') || lower.includes('aws')) {
    actions.push({
      label: '🏆 Verified Credentials',
      href: '/#credentials',
      isExternal: false,
      color: 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    });
  }

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-white/[0.08]">
      {actions.map((act, i) => (
        <a
          key={i}
          href={act.href}
          target={act.isExternal ? '_blank' : undefined}
          rel={act.isExternal ? 'noopener noreferrer' : undefined}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${act.color}`}
        >
          <span>{act.label}</span>
          {act.isExternal && <ExternalLink className="w-3 h-3 opacity-80" />}
        </a>
      ))}
    </div>
  );
};

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
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
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isConversationStarted = messages.length > 1;

  const currentCategoryObj =
    CATEGORIZED_PROMPTS.find((c) => c.id === activeCategory) ||
    CATEGORIZED_PROMPTS[0];

  return (
    <div className="relative min-h-screen bg-[#06080e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden">
      <CursorGlow />
      <NeuralVortexBackground />

      {/* Luxury Ambient Glow Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header - Glass Studio Navigation */}
      <header className="relative z-30 border-b border-white/[0.08] bg-[#070b13]/85 backdrop-blur-2xl sticky top-0 px-3 sm:px-8 py-3 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Back to Portfolio Button */}
          <button
            id="chat-back-to-portfolio-btn"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-500/40 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400 flex-shrink-0" />
            <span className="hidden sm:inline">Portfolio Overview</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Center Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.35)]">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 border-2 border-[#070b13] rounded-full shadow-[0_0_8px_#34d399]" />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <strong className="text-xs sm:text-sm font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-200 uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    Tetra AI
                  </strong>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 hidden md:block truncate">
                Prince Raj's Autonomous Portfolio Intelligence
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Sound FX Toggle */}
            <button
              id="chat-page-sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Export Markdown Transcript */}
            <button
              id="chat-page-export-btn"
              onClick={exportConversation}
              title="Export Conversation (.md)"
              className="p-2 text-slate-400 hover:text-cyan-300 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-cyan-500/30 rounded-xl transition-all cursor-pointer hidden sm:flex items-center gap-1.5 text-xs font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            {/* Reset Conversation */}
            <button
              id="chat-page-reset-btn"
              onClick={handleReset}
              title="Reset conversation"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-rose-500/15 border border-white/[0.08] hover:border-rose-500/40 text-xs font-semibold text-slate-300 hover:text-rose-300 transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Stage */}
      <main className="relative z-20 flex-1 flex flex-col max-w-4xl w-full mx-auto px-3 sm:px-6 pt-3 pb-3 overflow-hidden">
        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {/* Welcome Intro Header when conversation is fresh */}
          {!isConversationStarted && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-3 sm:mt-6 mb-6 text-center space-y-4"
            >
              {/* Premium Hero Sphere */}
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 blur-2xl animate-pulse" />
                <div className="relative p-4 sm:p-5 rounded-3xl bg-[#090e1a]/90 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] backdrop-blur-xl">
                  <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">Tetra AI</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1.5 leading-relaxed font-normal">
                  The official portfolio intelligence engine for <strong>Prince Raj</strong>. Ask deep technical questions regarding autonomous agent swarms, production platforms, full-stack architectures, or direct hire opportunities.
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1 text-cyan-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> High-Accuracy Portfolio Grounding
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
                    <Zap className="w-3.5 h-3.5" /> Real-time Fallback Cascade
                  </span>
                </div>
              </div>

              {/* Suggestion Cards Grid */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
                {SUGGESTION_CARDS.map((card, idx) => {
                  const IconComponent = card.icon;
                  return (
                    <button
                      key={idx}
                      id={`chat-suggestion-card-${idx}`}
                      onClick={() => handleSend(card.query)}
                      disabled={isLoading}
                      className={`relative overflow-hidden p-4 rounded-2xl bg-[#090d18]/80 hover:bg-[#0c1222]/90 border ${card.border} transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-left group disabled:opacity-50 shadow-lg backdrop-blur-xl`}
                    >
                      {/* Gradient glow accent */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                      <div className="relative flex items-start gap-3.5">
                        <div className={`p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] group-hover:border-cyan-500/40 transition-colors shadow-inner flex-shrink-0 ${card.iconColor}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                              {card.title}
                            </h4>
                            <span className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] flex-shrink-0">
                              {card.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-normal group-hover:text-slate-300">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Render All Messages */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isSpeakingThis = speakingMessageId === msg.id;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Avatar */}
                {!isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.35)] mt-1">
                    <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-cyan-300" />
                    </div>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`relative group max-w-[92%] sm:max-w-[82%] rounded-3xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed transition-all ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_8px_30px_rgba(6,182,212,0.35)] font-normal border border-cyan-400/30'
                      : 'bg-[#0a0e19]/90 border border-white/[0.09] hover:border-cyan-500/30 text-slate-200 rounded-tl-sm shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-2xl'
                  }`}
                >
                  <div className="markdown-body prose prose-invert max-w-none text-slate-200 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-cyan-300 prose-strong:font-semibold prose-a:text-cyan-400 hover:prose-a:underline prose-code:text-cyan-300 prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
                    <Markdown>{msg.content}</Markdown>
                  </div>

                  {/* 1-Click Retry Button if Temporary Failure */}
                  {msg.isError && msg.failedPrompt && (
                    <div className="mt-3 pt-2.5 border-t border-rose-500/30 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleSend(msg.failedPrompt)}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 hover:from-rose-500/30 hover:to-amber-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry Message</span>
                      </button>
                      <span className="text-[10px] text-rose-400/80 font-mono">Temporary high demand</span>
                    </div>
                  )}

                  {/* Dynamic Action Chips */}
                  {!isUser && !msg.isError && <MessageActionChips content={msg.content} />}

                  {/* Message Footer Controls */}
                  <div className="flex items-center justify-between gap-4 mt-2.5 pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
                    <span className="font-mono text-[10px] text-slate-500">{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-3">
                        {/* Read Aloud Toggle */}
                        <button
                          onClick={() => toggleReadAloud(msg.id, msg.content)}
                          className={`flex items-center gap-1 transition-colors cursor-pointer text-xs ${
                            isSpeakingThis ? 'text-cyan-300 animate-pulse font-semibold' : 'text-slate-400 hover:text-cyan-300 opacity-80 group-hover:opacity-100'
                          }`}
                          title={isSpeakingThis ? 'Stop speaking' : 'Listen with AI voice'}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isSpeakingThis ? 'Speaking...' : 'Listen'}</span>
                        </button>

                        {/* Copy Content */}
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors opacity-80 group-hover:opacity-100 cursor-pointer text-xs"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-slate-200 mt-1 shadow-md">
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
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[1.5px] shadow-md mt-1">
                <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <div className="px-5 py-3.5 rounded-3xl rounded-tl-sm bg-[#0a0e19]/90 border border-cyan-500/40 flex items-center gap-2.5 shadow-[0_10px_30px_rgba(6,182,212,0.15)] backdrop-blur-2xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-cyan-300 ml-1 font-mono font-medium tracking-wide">
                  Synthesizing neural response...
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input & Carousel Area */}
        <div className="mt-2 pt-2 border-t border-white/[0.08] bg-[#070b13]/85 backdrop-blur-2xl rounded-2xl p-2 sm:p-3">
          {/* Category Tabs Strip */}
          <div className="flex items-center gap-1.5 mb-2 overflow-x-auto no-scrollbar pb-0.5">
            {CATEGORIZED_PROMPTS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Categorized Smart Prompt Strip */}
          <div className="mb-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {currentCategoryObj.prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.query)}
                  disabled={isLoading}
                  className="whitespace-nowrap flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm group hover:scale-[1.01]"
                >
                  <Zap className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Input Field Container */}
          <div className="relative flex items-center gap-2 bg-[#090d19]/95 border border-white/[0.1] focus-within:border-cyan-400/80 focus-within:shadow-[0_0_25px_rgba(6,182,212,0.25)] rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-all">
            {/* Voice Input Microphone */}
            <button
              id="chat-page-voice-btn"
              onClick={toggleVoiceInput}
              title={isListening ? 'Stop listening' : 'Speak into microphone'}
              className={`flex-shrink-0 p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              ref={inputRef}
              id="chat-page-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? 'Listening to voice...' : 'Ask Tetra AI anything about Prince Raj...'}
              disabled={isLoading}
              className="w-full bg-transparent border-none px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 disabled:opacity-50 font-medium"
            />

            <button
              id="chat-page-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 active:scale-95"
              title="Send message"
            >
              <span className="hidden xs:inline">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Micro Telemetry Footer */}
          <div className="flex items-center justify-between mt-2.5 px-1.5 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Tetra AI
            </span>
            <span className="hidden xs:inline text-slate-400 font-medium">
              ImPrince Tectra • Autonomous Portfolio
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
