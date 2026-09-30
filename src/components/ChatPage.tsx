import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
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
    subtitle: 'Multi-agent swarms, LangGraph, CrewAI & RAG',
    query: "How does Prince design and deploy autonomous AI agent systems and RAG workflows?",
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
  },
  {
    icon: Rocket,
    title: 'Production Platforms',
    subtitle: 'Studolink & LensDrop cloud platforms',
    query: "Tell me about Prince's featured projects: Studolink and LensDrop.",
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    icon: Cpu,
    title: 'Technical Arsenal',
    subtitle: 'React 19, TypeScript, PyTorch & Cloud',
    query: "What is Prince's primary technical stack across full stack and AI engineering?",
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
  },
  {
    icon: Award,
    title: 'Verified Certifications',
    subtitle: '7 verified credentials from Google, IBM, AWS',
    query: "What certifications does Prince hold from Google, IBM, and AWS?",
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
  },
  {
    icon: Mail,
    title: 'Hire & Collaboration',
    subtitle: 'Email, WhatsApp & LinkedIn channels',
    query: "How can I contact or hire Prince Raj for contract or full-time roles?",
    color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400',
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
      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25',
    });
  }

  if (lower.includes('lensdrop') || lower.includes('qr upload')) {
    actions.push({
      label: '📸 Launch LensDrop',
      href: 'https://lensdrop.imprince.me',
      isExternal: true,
      color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/25',
    });
  }

  if (lower.includes('whatsapp') || lower.includes('8252995548') || lower.includes('phone')) {
    actions.push({
      label: '💬 Chat on WhatsApp',
      href: 'https://wa.me/918252995548',
      isExternal: true,
      color: 'bg-green-500/15 text-green-300 border-green-500/30 hover:bg-green-500/25',
    });
  }

  if (lower.includes('email') || lower.includes('kusprince.raj@gmail.com') || lower.includes('hire')) {
    actions.push({
      label: '✉️ Email Prince',
      href: 'mailto:kusprince.raj@gmail.com',
      isExternal: false,
      color: 'bg-blue-500/15 text-blue-300 border-blue-500/30 hover:bg-blue-500/25',
    });
  }

  if (lower.includes('linkedin')) {
    actions.push({
      label: '💼 LinkedIn Profile',
      href: 'https://www.linkedin.com/in/princeraj-in/',
      isExternal: true,
      color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/25',
    });
  }

  if (lower.includes('certificat') || lower.includes('google') || lower.includes('ibm') || lower.includes('aws')) {
    actions.push({
      label: '🏆 Credentials Section',
      href: '/#credentials',
      isExternal: false,
      color: 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25',
    });
  }

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-white/10">
      {actions.map((act, i) => (
        <a
          key={i}
          href={act.href}
          target={act.isExternal ? '_blank' : undefined}
          rel={act.isExternal ? 'noopener noreferrer' : undefined}
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${act.color}`}
        >
          <span>{act.label}</span>
          {act.isExternal && <ExternalLink className="w-3 h-3" />}
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden">
      <CursorGlow />
      <NeuralVortexBackground />

      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl sticky top-0 px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Back to Portfolio Button */}
          <button
            id="chat-back-to-portfolio-btn"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-all cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
            <span className="hidden xs:inline">Back to</span> Portfolio
          </button>

          {/* Center Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-[0_0_8px_#34d399]" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-white tracking-wide">Tectra AI</h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                  Gemini 3.6
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Prince Raj's Intelligent Portfolio Assistant
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              id="chat-page-sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Export Transcript */}
            <button
              id="chat-page-export-btn"
              onClick={exportConversation}
              title="Export Conversation (.md)"
              className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-slate-800 rounded-xl transition-all cursor-pointer hidden sm:block"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Reset Conversation Button */}
            <button
              id="chat-page-reset-btn"
              onClick={handleReset}
              title="Reset conversation"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-rose-500/40 text-xs text-slate-300 hover:text-rose-300 transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Stage */}
      <main className="relative z-10 flex-1 flex flex-col max-w-4xl w-full mx-auto px-3 sm:px-6 pt-4 pb-3 overflow-hidden">
        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {/* Welcome Intro Header when conversation is fresh */}
          {!isConversationStarted && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-2 sm:mt-6 mb-6 text-center space-y-4"
            >
              <div className="relative inline-flex items-center justify-center p-3.5 sm:p-4.5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/60 border border-cyan-500/40 shadow-[0_0_45px_rgba(6,182,212,0.25)]">
                <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">Tectra AI</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1 leading-relaxed font-medium">
                  The official portfolio intelligence engine for <strong>Prince Raj</strong>. Ask deep technical questions regarding autonomous agent systems, live production platforms, stack architectures, or direct hire opportunities.
                </p>
              </div>

              {/* Suggestion Cards Grid */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto text-left">
                {SUGGESTION_CARDS.map((card, idx) => {
                  const IconComponent = card.icon;
                  return (
                    <button
                      key={idx}
                      id={`chat-suggestion-card-${idx}`}
                      onClick={() => handleSend(card.query)}
                      disabled={isLoading}
                      className={`p-3.5 rounded-2xl bg-gradient-to-br ${card.color} bg-slate-950/70 hover:bg-slate-900/90 border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-left group disabled:opacity-50 shadow-md backdrop-blur-md`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {card.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-medium">
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
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Avatar */}
                {!isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.35)] mt-1 border border-cyan-400/30">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`relative group max-w-[90%] sm:max-w-[82%] rounded-3xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_6px_25px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/90 border border-slate-800/90 text-slate-200 rounded-tl-sm shadow-xl backdrop-blur-xl'
                  }`}
                >
                  <div className="markdown-body prose prose-invert max-w-none text-slate-200 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-cyan-300 prose-a:text-cyan-400 hover:prose-a:underline">
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

                  <div className="flex items-center justify-between gap-4 mt-2.5 pt-2 border-t border-white/10 text-[11px] text-slate-400">
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-3">
                        {/* Read Aloud Toggle */}
                        <button
                          onClick={() => toggleReadAloud(msg.id, msg.content)}
                          className={`flex items-center gap-1 transition-colors cursor-pointer ${
                            isSpeakingThis ? 'text-cyan-300 animate-pulse font-bold' : 'hover:text-cyan-300 opacity-70 group-hover:opacity-100'
                          }`}
                          title={isSpeakingThis ? 'Stop speaking' : 'Listen with AI voice'}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isSpeakingThis ? 'Speaking...' : 'Listen'}</span>
                        </button>

                        {/* Copy Content */}
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="flex items-center gap-1 hover:text-cyan-300 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied</span>
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mt-1">
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
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md mt-1 border border-cyan-400/30">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-5 py-3.5 rounded-3xl rounded-tl-sm bg-slate-900/90 border border-cyan-500/30 flex items-center gap-2.5 shadow-xl backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-cyan-300 ml-1 font-mono font-medium">
                  Synthesizing neural response...
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input & Carousel Area */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl">
          {/* Categorized Smart Prompt Strip */}
          <div className="mb-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar text-xs">
              {currentCategoryObj.prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.query)}
                  disabled={isLoading}
                  className="whitespace-nowrap flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Input Field Container */}
          <div className="relative flex items-center gap-2 bg-slate-900/90 border border-slate-800 focus-within:border-cyan-400/80 rounded-2xl p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all">
            {/* Voice Input Microphone */}
            <button
              id="chat-page-voice-btn"
              onClick={toggleVoiceInput}
              title={isListening ? 'Stop listening' : 'Speak into microphone'}
              className={`flex-shrink-0 p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40'
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
              placeholder={isListening ? 'Listening to voice...' : 'Ask Tectra AI anything about Prince Raj...'}
              disabled={isLoading}
              className="w-full bg-transparent border-none px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 disabled:opacity-50 font-medium"
            />

            <button
              id="chat-page-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              title="Send message"
            >
              <span className="hidden xs:inline">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Micro Telemetry Footer */}
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400/90 font-medium">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Gemini 3.6 Flash Engine
            </span>
            <span className="hidden xs:inline text-slate-400 font-semibold">
              ImPrince Tectra • Autonomous Portfolio
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
