import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  GraduationCap,
  Award,
  Cpu,
  Mail,
  Check,
  Copy,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: '🎓 Education & IIT Patna', query: 'Tell me about Prince\'s education at IIT Patna.' },
  { label: '🏆 Verified Certifications', query: 'What certifications does Prince hold from Google, IBM, and AWS?' },
  { label: '🧠 AI & Tech Stack', query: 'What are Prince\'s primary technical skills and AI frameworks?' },
  { label: '📬 Contact & Connect', query: 'How can I contact or collaborate with Prince Raj?' },
  { label: '💼 Project Experience', query: 'What areas does Prince specialize in as an AI Developer & Quant?' },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'model',
    content: "Hi there! 👋 I'm **Tectra AI**, Prince Raj's portfolio intelligence assistant.\n\nI can tell you all about his **education at IIT Patna**, **7 verified certifications**, **AI & Quantitative trading expertise**, or help you get in touch directly. What would you like to know?",
    timestamp: 'Just now',
  },
];

interface ProfileChatbotProps {
  onNavigate?: (to: string) => void;
}

export const ProfileChatbot: React.FC<ProfileChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Send chat request to backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "I couldn't process that response. Please try again or reach out to Prince at kusprince.raj@gmail.com.";

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback helpful reply
      const fallbackMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: "I'm having a brief connection issue, but here is what you should know about **Prince Raj**:\n\n- 🎓 **IIT Patna**: BS in Computer Science & Data Analytics\n- 🚀 **Featured Deployments**:\n  - [LensDrop (Live)](https://lensdrop.imprince.me): Event memory sharing with QR uploads\n  - [City Helpline (Live)](https://app.imprince.me): Hyper-local student ecosystem & PG directory\n- 🏆 **Certifications**: 7 global accreditations from Google, IBM, and AWS\n- 📬 **Email**: [kusprince.raj@gmail.com](mailto:kusprince.raj@gmail.com)\n- 📱 **WhatsApp**: [+91 8252995548](https://wa.me/918252995548)",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="profile-chatbot-root" className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Chat Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative group"
          >
            {/* Ambient pulsing ripple ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse pointer-events-none" />

            <button
              id="chatbot-launcher-btn"
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-3 px-4 sm:px-5 py-3.5 rounded-full bg-slate-900/95 dark:bg-slate-900/90 text-white font-medium shadow-2xl border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Open AI Profile Assistant"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                <Bot className="w-5 h-5 text-white animate-bounce-slow" />
                {/* Active green status dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full shadow-[0_0_8px_#34d399]" />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">Tectra AI</span>
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                </div>
                <span className="text-xs text-slate-300 font-normal">Ask about Prince's Profile</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : undefined
            }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`w-[calc(100vw-2.5rem)] sm:w-[410px] md:w-[440px] rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-2xl flex flex-col overflow-hidden text-slate-100 ${
              isMinimized ? 'h-auto' : 'h-[580px] max-h-[82vh]'
            }`}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-wide">Tectra AI</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Portfolio Guide
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Prince Raj's Intelligent Assistant
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
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
                  title="Open full page chat"
                  className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  id="chatbot-reset-btn"
                  onClick={handleReset}
                  title="Clear conversation"
                  className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  id="chatbot-minimize-btn"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  id="chatbot-close-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body (Collapsible if minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {/* Bot Avatar */}
                        {!isUser && (
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-sm mt-0.5">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div
                          className={`relative group max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                            isUser
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-sm shadow-[0_4px_15px_rgba(6,182,212,0.25)]'
                              : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-tl-sm shadow-sm'
                          }`}
                        >
                          <div className="markdown-body prose prose-invert max-w-none text-slate-200 prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-cyan-300 prose-a:text-cyan-400 hover:prose-a:underline">
                            <Markdown>{msg.content}</Markdown>
                          </div>

                          <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-white/10 text-[10px] text-slate-400">
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
                                    <span className="text-emerald-400">Copied</span>
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
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 mt-0.5">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Thinking / Loading Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2.5 justify-start"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-sm mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-slate-800/80 border border-slate-700/60 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="text-[11px] text-slate-400 ml-2">Consulting profile knowledge...</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Pills */}
                <div className="px-3 py-2 border-t border-slate-800/60 bg-slate-900/60">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        id={`chat-prompt-pill-${idx}`}
                        onClick={() => handleSend(prompt.query)}
                        disabled={isLoading}
                        className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/60 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-[11px] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Form */}
                <div className="p-3 border-t border-slate-800/80 bg-slate-900/90">
                  <div className="relative flex items-center gap-2">
                    <input
                      ref={inputRef}
                      id="chatbot-input"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about Prince Raj..."
                      disabled={isLoading}
                      className="w-full bg-slate-950/80 border border-slate-700/70 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
                    />

                    <button
                      id="chatbot-send-btn"
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white disabled:opacity-40 disabled:hover:from-blue-600 disabled:hover:to-cyan-500 shadow-md hover:shadow-cyan-500/25 transition-all cursor-pointer disabled:cursor-not-allowed"
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                      Powered by Gemini 3.6 & Profile Knowledge Base
                    </span>
                    <span>IIT Patna • ImPrince Tectra</span>
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
