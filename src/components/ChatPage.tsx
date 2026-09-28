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
  GraduationCap,
  Award,
  Cpu,
  Mail,
  Rocket,
} from 'lucide-react';
import { useChatbot, QUICK_PROMPTS } from '../lib/chat';
import { NeuralVortexBackground } from './ui/NeuralVortexBackground';
import { CursorGlow } from './ui/CursorGlow';

interface ChatPageProps {
  onNavigate: (to: string) => void;
}

const SUGGESTION_CARDS = [
  {
    icon: GraduationCap,
    title: 'Education & IIT Patna',
    subtitle: 'BS in Computer Science & Data Analytics',
    query: "Tell me about Prince's education at IIT Patna.",
    color: 'from-blue-500/20 to-cyan-500/10 border-cyan-500/30 text-cyan-400',
  },
  {
    icon: Cpu,
    title: 'AI & Tech Stack',
    subtitle: 'Autonomous agents, LangGraph, PyTorch',
    query: "What are Prince's primary technical skills and AI frameworks?",
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
  },
  {
    icon: Rocket,
    title: 'Featured Projects',
    subtitle: 'LensDrop & City Helpline production platforms',
    query: "Tell me about Prince's featured projects: LensDrop and City Helpline.",
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    icon: Award,
    title: 'Certifications',
    subtitle: '7 verified credentials from Google, IBM, AWS',
    query: "What certifications does Prince hold from Google, IBM, and AWS?",
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
  },
  {
    icon: Mail,
    title: 'Contact & Collaboration',
    subtitle: 'Email, WhatsApp & social channels',
    query: "How can I contact or collaborate with Prince Raj?",
    color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400',
  },
];

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    copiedId,
    handleSend,
    handleReset,
    copyToClipboard,
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
    // Focus input on initial page load
    inputRef.current?.focus();
    // Scroll to top of window
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isConversationStarted = messages.length > 1;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden">
      <CursorGlow />
      <NeuralVortexBackground />

      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Back to Portfolio Button */}
          <button
            id="chat-back-to-portfolio-btn"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-all cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
            <span className="hidden xs:inline">Back to</span> Portfolio
          </button>

          {/* Center Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-[0_0_8px_#34d399]" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">Tectra AI</h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Prince Raj's Intelligent Assistant
              </p>
            </div>
          </div>

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
      </header>

      {/* Main Chat Stage */}
      <main className="relative z-10 flex-1 flex flex-col max-w-4xl w-full mx-auto px-3 sm:px-6 pt-4 pb-3 overflow-hidden">
        {/* Chat Messages / Welcome Container */}
        <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {/* Welcome Intro Header when conversation is fresh */}
          {!isConversationStarted && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-2 sm:mt-6 mb-6 text-center space-y-3"
            >
              <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)]">
                <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Tectra AI</span> 👋
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Prince Raj's intelligent portfolio assistant. I can help you learn about Prince's projects, technical skills, education, certifications, experience, and ways to connect.
              </p>

              {/* Suggestion Cards Grid */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto text-left">
                {SUGGESTION_CARDS.map((card, idx) => {
                  const IconComponent = card.icon;
                  return (
                    <button
                      key={idx}
                      id={`chat-suggestion-card-${idx}`}
                      onClick={() => handleSend(card.query)}
                      disabled={isLoading}
                      className={`p-3 rounded-xl bg-gradient-to-br ${card.color} bg-slate-900/60 hover:bg-slate-800/80 border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-left group disabled:opacity-50`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {card.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`relative group max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-sm shadow-[0_4px_20px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-900/85 border border-slate-800/90 text-slate-200 rounded-tl-sm shadow-md backdrop-blur-md'
                  }`}
                >
                  <div className="markdown-body prose prose-invert max-w-none text-slate-200 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-cyan-300 prose-a:text-cyan-400 hover:prose-a:underline">
                    <Markdown>{msg.content}</Markdown>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-2 pt-1.5 border-t border-white/10 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="flex items-center gap-1 hover:text-cyan-300 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Thinking / Loading Animation */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-sm mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-slate-900/85 border border-slate-800/90 flex items-center gap-2 shadow-md backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-slate-400 ml-2 font-medium">
                  Consulting profile knowledge...
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-xl">
          {/* Quick Prompt Carousel (visible when conversation is ongoing) */}
          {isConversationStarted && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar mb-2 text-xs">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.query)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          )}

          {/* Main Input Field Container */}
          <div className="relative flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 focus-within:border-cyan-400/80 rounded-2xl p-1.5 shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all">
            <input
              ref={inputRef}
              id="chat-page-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Prince Raj..."
              disabled={isLoading}
              className="w-full bg-transparent border-none px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 disabled:opacity-50"
            />

            <button
              id="chat-page-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              title="Send message"
            >
              <span className="hidden xs:inline">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Micro Footer */}
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Powered by Gemini 3.6 & Profile Knowledge Base
            </span>
            <span className="hidden xs:inline">IIT Patna • ImPrince Tectra</span>
          </div>
        </div>
      </main>
    </div>
  );
};
