import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

// Profile Knowledge Base for Gemini System Instruction
export const SYSTEM_INSTRUCTION = `You are "Tectra AI", the official intelligent portfolio assistant for Prince Raj (brand: ImPrince Tectra).
Your mission is to represent Prince Raj professionally, concisely, and accurately to recruiters, clients, collaborators, and visitors.

Key Profile Knowledge:
- Name: Prince Raj
- Professional Titles: AI Developer, Full Stack Engineer, Systems Architect
- Brand / Studio: ImPrince Tectra
- Core Expertise:
  1. Autonomous AI & Agentic Workflows: Multi-agent systems (LangGraph, CrewAI), RAG architectures, custom LLM fine-tuning, Vector databases (Chroma, Pinecone, Qdrant).
  2. Scalable High-Performance Engineering: Modern full-stack architecture with React 19, TypeScript, Node.js, Fastify/Express, Docker, and Cloud infrastructure.
  3. API & Data Engineering: Real-time WebSockets, microservices, secure cloud storage, and database optimizations.
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
  - Speak in a sharp, intelligent, polite, and enthusiastic tone reflecting Prince's forward-looking AI and full-stack systems engineering mindset.
  - When asked about hiring, projects, or collaborations, invite them to connect via email (kusprince.raj@gmail.com), WhatsApp (+91 8252995548), or LinkedIn (https://www.linkedin.com/in/princeraj-in/).
  - Format answers neatly with rich markdown (bullet points, bold text, links) for readability. Keep answers focused, technically authoritative, and concise.`;

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
    return res.status(405).json({
      error: 'Method Not Allowed. Use POST.',
      code: 'METHOD_NOT_ALLOWED',
    });
  }

  try {
    // Parse body safely (handles both pre-parsed JSON objects and raw string payloads)
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: 'Invalid JSON payload in request body.',
          code: 'INVALID_JSON',
        });
      }
    }

    const { message, history } = body || {};

    // Validate incoming message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'A message string is required.',
        code: 'MESSAGE_REQUIRED',
      });
    }

    // Read API key strictly from server-side environment variables (never hardcoded)
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error('[Tectra AI] Server Configuration Error: GEMINI_API_KEY is not configured in server-side environment variables.');
      return res.status(503).json({
        error: 'AI service temporarily unavailable due to missing API key configuration.',
        code: 'API_KEY_MISSING',
        retryable: false,
      });
    }

    // Format conversation history - only allow valid roles (user, model)
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

    // Exact model hierarchy requested:
    // 1. Main: Gemini 3.8 Flash
    // 2. Fallback 1: Gemini 3.7 Flash
    // 3. Fallback 2: Gemini 2.5 Flash
    // Plus resilient safety backups (gemini-flash-latest)
    const mainModel = process.env.GEMINI_MODEL?.trim() || 'gemini-3.8-flash';
    const fallback1 = process.env.GEMINI_FALLBACK_1?.trim() || 'gemini-3.7-flash';
    const fallback2 = process.env.GEMINI_FALLBACK_2?.trim() || 'gemini-2.5-flash';

    const modelCascade = Array.from(
      new Set([mainModel, fallback1, fallback2, 'gemini-flash-latest', 'gemini-2.5-flash'].filter(Boolean))
    );

    let successfulReply: string | null = null;
    let successfulModel: string = mainModel;
    let lastError: any = null;

    // Instant shift: If a model fails for ANY reason (503 high demand, 429, etc.),
    // immediately shift to the next fallback model without throwing or returning failure to the user!
    for (const currentModel of modelCascade) {
      try {
        const config: any = {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        };

        // For Gemini 3.8 Flash and 3.7 Flash, optimize latency by disabling extended thinking budget
        if (currentModel.includes('3.8') || currentModel.includes('3.7')) {
          config.thinkingConfig = { thinkingBudget: 0 };
        }

        const response = await ai.models.generateContent({
          model: currentModel,
          contents,
          config,
        });

        const replyText = response.text?.trim();
        if (replyText) {
          successfulReply = replyText;
          successfulModel = currentModel;
          // Immediately return response on first success!
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(
          `[Tectra AI] Model "${currentModel}" failed: ${err?.message || err}. Instantly shifting to next model in cascade...`
        );
        // Instant shift to next fallback model without delay
        continue;
      }
    }

    // Return the successful response seamlessly
    if (successfulReply) {
      return res.status(200).json({
        reply: successfulReply,
        source: 'gemini',
        model: successfulModel,
        fallbackUsed: successfulModel !== mainModel,
      });
    }

    // Only if all fallback models in the chain fail
    console.error('[Tectra AI] All models in cascade failed. Last error:', lastError?.message || lastError);
    return res.status(503).json({
      error: 'Tectra AI is currently experiencing high demand. Please try again in a few moments.',
      code: 'HIGH_DEMAND_503',
      retryable: true,
      details: lastError?.message || 'Upstream model capacity exceeded',
    });
  } catch (error: any) {
    console.error('[Tectra AI] Unhandled serverless execution error:', error?.message || error);
    return res.status(500).json({
      error: 'An internal server error occurred while processing your request.',
      code: 'INTERNAL_SERVER_ERROR',
      retryable: true,
      details: error?.message || 'Server error',
    });
  }
}
