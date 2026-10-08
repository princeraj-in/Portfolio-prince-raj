import { useState, useRef, useEffect, useCallback } from 'react';
import { soundManager } from './sound-manager';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  isError?: boolean;
  failedPrompt?: string;
  modelUsed?: string;
}

export interface PromptCategory {
  id: string;
  label: string;
  icon?: string;
  prompts: { label: string; query: string }[];
}

export const CATEGORIZED_PROMPTS: PromptCategory[] = [
  {
    id: 'ai',
    label: '🤖 AI & Agents',
    prompts: [
      { label: 'Autonomous Agents', query: 'How does Prince build multi-agent systems and agentic workflows?' },
      { label: 'RAG & Vector DBs', query: 'What is Prince\'s experience with RAG architectures and vector databases?' },
      { label: 'LLM Fine-tuning', query: 'Explain Prince\'s workflow for fine-tuning and integrating LLMs.' },
    ],
  },
  {
    id: 'projects',
    label: '🚀 Live Deployments',
    prompts: [
      { label: 'Studolink Platform', query: 'What is Studolink, and what features does it provide for students?' },
      { label: 'LensDrop Platform', query: 'How does LensDrop work for frictionless QR-based photo sharing?' },
      { label: 'Tech Architectures', query: 'What technical architecture powers Prince\'s production apps?' },
    ],
  },
  {
    id: 'certs',
    label: '🏆 Accreditations',
    prompts: [
      { label: 'Google & IBM Certs', query: 'Which verified credentials does Prince hold from Google, IBM, and AWS?' },
      { label: 'Cloud & Security', query: 'Tell me about Prince\'s Network Security and AWS AI Practitioner credentials.' },
    ],
  },
  {
    id: 'stack',
    label: '⚡ Core Stack',
    prompts: [
      { label: 'Primary Tech Arsenal', query: 'What is Prince\'s primary tech stack across frontend, backend, and cloud?' },
      { label: 'React 19 & TypeScript', query: 'How does Prince leverage React 19 and modern TypeScript?' },
    ],
  },
  {
    id: 'hire',
    label: '🤝 Hire & Connect',
    prompts: [
      { label: 'Hire for AI Project', query: 'How can I hire Prince Raj for an AI or full-stack engineering role?' },
      { label: 'WhatsApp & Email', query: 'What are the fastest ways to contact Prince directly?' },
    ],
  },
];

export const QUICK_PROMPTS = [
  { label: '🤖 Autonomous AI & Agents', query: 'Tell me about Prince\'s experience with autonomous AI agents and intelligent systems.' },
  { label: '🚀 Studolink & LensDrop', query: 'Explain Prince\'s featured production platforms: Studolink and LensDrop.' },
  { label: '🏆 7 Global Certifications', query: 'What verified credentials does Prince hold from Google, IBM, and AWS?' },
  { label: '⚡ Technical Arsenal', query: 'What are Prince\'s primary technical skills across AI, full stack, and cloud?' },
  { label: '📬 Hire & Connect', query: 'How can I contact or hire Prince Raj for contract or full-time roles?' },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'model',
    content: "Greetings! 👋 I'm **Tectra AI**, the portfolio intelligence assistant for **Prince Raj** (ImPrince Tectra).\n\nI can provide deep technical breakdowns on his **autonomous AI agent systems**, live production platforms like **Studolink** & **LensDrop**, his **7 verified credentials from Google, IBM & AWS**, or instantly connect you for high-impact opportunities.\n\n*How can I assist your team today?*",
    timestamp: 'Just now',
  },
];

export function useChatbot(initialMessages: ChatMessage[] = INITIAL_MESSAGES) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ai');
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize sound settings
  useEffect(() => {
    setSoundEnabled(soundManager.isEnabled());
  }, []);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    const updated = soundManager.toggleSound();
    setSoundEnabled(updated);
  }, []);

  // Speech Recognition (Voice Input)
  const toggleVoiceInput = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        soundManager.playChime();
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  }, [isListening]);

  // Speech Synthesis (Read Aloud)
  const toggleReadAloud = useCallback((id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingMessageId(id);

    // Clean markdown formatting before speaking
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove markdown links
      .replace(/[#*_`~>-]/g, '') // remove markdown symbols
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [speakingMessageId]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    soundManager.playSend();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Filter out previous temporary error messages when re-sending
    const filteredHistory = messages.filter((m) => !m.isError);
    const newMessages = [...filteredHistory, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setLastFailedPrompt(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => null);
        throw new Error(errorJson?.error || `Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const botReply =
        data.reply ||
        "I couldn't process that response. Please try again or reach out to Prince at kusprince.raj@gmail.com.";

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model,
      };

      setMessages((prev) => [...prev, botMessage]);
      soundManager.playReceive();
    } catch (err: any) {
      console.warn('[Tectra AI] Request encountered temporary failure:', err?.message || err);
      setLastFailedPrompt(textToSend);

      const isHighDemand =
        String(err?.message || '').includes('high demand') ||
        String(err?.message || '').includes('503') ||
        String(err?.message || '').includes('429');

      const fallbackMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        content: isHighDemand
          ? "⚠️ **Tectra AI is currently experiencing high demand from Google AI servers.**\n\nYour message wasn't completed, but automatic failover is active. You can **Retry** with one click below, or reach out to Prince Raj directly:\n\n- 📬 **Email**: [kusprince.raj@gmail.com](mailto:kusprince.raj@gmail.com)\n- 📱 **WhatsApp Direct**: [+91 8252995548](https://wa.me/918252995548)\n- 💼 **LinkedIn**: [linkedin.com/in/princeraj-in](https://www.linkedin.com/in/princeraj-in/)"
          : "⚠️ **Tectra AI connection temporarily interrupted.**\n\nPlease click **Retry** below to re-send your message, or connect with Prince Raj directly at [kusprince.raj@gmail.com](mailto:kusprince.raj@gmail.com).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        failedPrompt: textToSend,
      };

      setMessages((prev) => [...prev, fallbackMessage]);
      soundManager.playReceive();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    soundManager.playChime();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    setLastFailedPrompt(null);
    setMessages(INITIAL_MESSAGES);
    setInput('');
  };

  const copyToClipboard = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      soundManager.playChime();
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const exportConversation = () => {
    soundManager.playChime();
    const transcript = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'user' ? 'You' : 'Tectra AI'}:\n${m.content}\n`
      )
      .join('\n---\n\n');

    const blob = new Blob([transcript], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tectra-AI-Transcript-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    messages,
    setMessages,
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
    lastFailedPrompt,
    handleSend,
    handleReset,
    copyToClipboard,
    exportConversation,
  };
}
