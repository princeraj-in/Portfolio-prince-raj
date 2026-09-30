import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

// Active Gemini model - configurable via environment variable, defaulting to gemini-3.6-flash
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

// Profile Knowledge Base for Gemini System Instruction
export const SYSTEM_INSTRUCTION = `You are "Tectra AI", the official intelligent portfolio assistant for Prince Raj (brand: ImPrince Tectra).
Your mission is to represent Prince Raj professionally, concisely, and accurately to recruiters, clients, collaborators, and visitors.

Key Profile Knowledge:
- Name: Prince Raj
- Professional Titles: AI Developer, Quantitative Trader, Systems Engineer
- Brand / Studio: ImPrince Tectra
- Education: Bachelor of Science (BS) in Computer Science & Data Analytics from Indian Institute of Technology, Patna (IIT Patna).
- Core Expertise:
  1. Autonomous AI & Agentic Workflows: Multi-agent systems (LangGraph, CrewAI), RAG architectures, custom LLM fine-tuning, Vector databases (Chroma, Pinecone, Qdrant).
  2. Quantitative Trading & Computing: Algorithmic modeling, statistical arbitrage logic, high-frequency execution pipelines, risk metrics.
  3. Scalable High-Performance Engineering: Modern full-stack architecture with React 19, TypeScript, Node.js, Fastify/Express, Docker, and Cloud infrastructure.
- Featured Production Projects & Platforms:
  1. LensDrop:
     - Overview: Modern wedding and event memory-sharing platform. Hosts create an event and generate a live QR code or digital invitation, while guests upload original photos and videos directly from their phones without installing an app or creating an account.
     - Key Capabilities: QR-based instant guest uploads, zero guest account/app installation required, real-time live event media galleries, client-side canvas image compression, drag-and-drop file uploads, 1-click ZIP archive export, host privacy permissions, and super admin console.
     - Tech Stack: React 19, TypeScript, Vite, Tailwind CSS, Firebase Auth, Cloud Firestore, Cloudinary Media Delivery, Motion.
     - Live Production: https://lensdrop.imprince.me
     - GitHub Repository: https://github.com/princeraj-in/Lensdrop
  2. Studolink:
     - Overview: A hyper-local student ecosystem platform designed to simplify student life across major Indian education and coaching hubs.
     - Key Features:
       * Smart Local Discovery: Find PGs, hostels, mess/tiffin services, libraries, coaching centres, and study spaces.
       * AI Mitra: Gemini-powered student assistant for local guidance, safety, and accommodation-related queries in Hindi and English.
       * Real-Time Messaging: In-app 1-to-1 chat between students, property owners, and marketplace sellers.
       * Verification System: Verified student and PG badges with protected verification data.
       * Student Marketplace: Buy & sell used books, furniture, electronics, cycles, and other student essentials.
       * Roommate Matching: Discover compatible roommates based on budget, exam goals, and lifestyle.
       * Budget Intelligence: Estimate and visualize monthly living expenses using city-specific benchmarks.
       * PWA Experience: Installable app with responsive mobile, tablet, and desktop support plus offline caching.
       * Bilingual UI: Full Hindi & English experience for wider accessibility.
     - Tech Stack: React 19, TypeScript, Vite, Tailwind CSS, Firebase, Firestore, Google Gemini AI, Cloudinary, Express, Vercel.
     - Live Production: https://studolink.imprince.me
     - GitHub Repository: https://github.com/princeraj-in/CityHelpline
- Verified Global Accreditations & Certifications (7 verified credentials):
  - Google: Connect and Protect: Networks and Network Security
  - Google Cloud: Introduction to Large Language Models (LLMs)
  - Google Cloud: Introduction to Generative AI
  - IBM: Machine Learning with Python
  - IBM: Develop Generative AI Applications: Get Started
  - IBM: Python for Data Science, AI & Development
  - AWS: AWS Artificial Intelligence Practitioner
- Contact & Connect:
  - Email: kusprince.raj@gmail.com | developer@imprince.me
  - WhatsApp / Phone: +91 8252995548
  - GitHub: https://github.com/princeraj-in
  - LinkedIn: https://www.linkedin.com/in/princeraj-in/
  - Instagram: https://instagram.com/princerjjjjj
  - Location: Patna, Bihar & Available for Remote Worldwide opportunities
- Personality & Guidelines:
  - Speak in a sharp, intelligent, polite, and enthusiastic tone reflecting Prince's forward-looking tech and quant mindset.
  - When asked about hiring, projects, or collaborations, invite them to connect via email (kusprince.raj@gmail.com) or WhatsApp (+91 8252995548).
  - Format answers neatly with markdown (bullet points, bold text) for readability. Keep answers focused and concise.`;

// Cache GoogleGenAI client per serverless instance lifecycle
let aiClient: GoogleGenAI | null = null;
function getGenAI(apiKey: string): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow OPTIONS for preflight if ever called cross-origin
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  // Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // Parse body safely (handles both pre-parsed JSON objects and raw string payloads)
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON payload in request body.' });
      }
    }

    const { message, history } = body || {};

    // Validate the incoming message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'A message string is required.' });
    }

    // Read API key strictly from server-side environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Server Configuration Error: GEMINI_API_KEY environment variable is not configured.');
      return res.status(500).json({
        error: 'AI service temporarily unavailable',
      });
    }

    // Format conversation history - only allow valid roles (user, model)
    // and limit to recent 10 messages to prevent payload bloat
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-10);
      for (const item of recentHistory) {
        if (
          (item.role === 'user' || item.role === 'model') &&
          typeof item.content === 'string' &&
          item.content.trim().length > 0
        ) {
          contents.push({
            role: item.role,
            parts: [{ text: item.content.trim() }],
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const ai = getGenAI(apiKey);

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText =
      response.text ||
      "I was unable to generate a response. Please reach out to Prince Raj directly at kusprince.raj@gmail.com.";

    return res.status(200).json({
      reply: replyText,
      source: 'gemini',
    });
  } catch (error: any) {
    // Log error internally without exposing sensitive details to client
    console.error('Gemini API execution error:', error?.message || error);
    return res.status(500).json({
      error: 'AI service temporarily unavailable',
    });
  }
}
