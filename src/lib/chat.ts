import { useState } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const QUICK_PROMPTS = [
  { label: '🎓 Education & IIT Patna', query: "Tell me about Prince's education at IIT Patna." },
  { label: '🧠 AI & Tech Stack', query: "What are Prince's primary technical skills and AI frameworks?" },
  { label: '🚀 Projects', query: "Tell me about Prince's featured projects: LensDrop and City Helpline." },
  { label: '🏆 Certifications', query: "What certifications does Prince hold from Google, IBM, and AWS?" },
  { label: '📬 Contact & Collaboration', query: "How can I contact or collaborate with Prince Raj?" },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'model',
    content: "Hi there! 👋 I'm **Tectra AI**, Prince Raj's portfolio intelligence assistant.\n\nI can tell you all about his **education at IIT Patna**, **7 verified certifications**, **AI & Quantitative trading expertise**, or help you get in touch directly. What would you like to know?",
    timestamp: 'Just now',
  },
];

export function useChatbot(initialMessages: ChatMessage[] = INITIAL_MESSAGES) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
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
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content:
          "I'm having a brief connection issue, but here is what you should know about **Prince Raj**:\n\n- 🎓 **IIT Patna**: BS in Computer Science & Data Analytics\n- 🚀 **Featured Deployments**:\n  - [LensDrop (Live)](https://lensdrop.imprince.me): Event memory sharing with QR uploads\n  - [City Helpline (Live)](https://app.imprince.me): Hyper-local student ecosystem & PG directory\n- 🏆 **Certifications**: 7 global accreditations from Google, IBM, and AWS\n- 📬 **Email**: [kusprince.raj@gmail.com](mailto:kusprince.raj@gmail.com)\n- 📱 **WhatsApp**: [+91 8252995548](https://wa.me/918252995548)",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
  };

  const copyToClipboard = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    copiedId,
    handleSend,
    handleReset,
    copyToClipboard,
  };
}
