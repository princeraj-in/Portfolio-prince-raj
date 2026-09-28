<div align="center">

# ✦ ImPrince Tectra

### Autonomous AI Systems · Quantitative Computing · Full-Stack Engineering

**The Official Portfolio & Intelligence Platform of Prince Raj**  
*BS in Computer Science & Data Analytics — Indian Institute of Technology, Patna (IIT Patna)*

<br />

<!-- Action Buttons -->
<p align="center">
  <a href="https://imprince.me">
    <img src="https://img.shields.io/badge/🌐%20Live%20Portfolio-imprince.me-0052CC?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Portfolio" />
  </a>
  &nbsp;
  <a href="https://imprince.me/chat">
    <img src="https://img.shields.io/badge/💬%20Tectra%20AI%20Chat-Launch%20Assistant-06B6D4?style=for-the-badge&logo=openai&logoColor=white" alt="Tectra AI Chat" />
  </a>
  &nbsp;
  <a href="https://github.com/princeraj-in/Portfolio-prince-raj">
    <img src="https://img.shields.io/badge/💻%20Source%20Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source Code" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/prince-raj-ba4b973b3">
    <img src="https://img.shields.io/badge/💼%20Connect-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

<!-- Tech Stack Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Gemini_3.6-Flash_API-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini 3.6 Flash" />
  <img src="https://img.shields.io/badge/Vercel-Serverless_Edge-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

<br />

---

### [Explore Live](https://imprince.me) • [Tectra AI Assistant](https://imprince.me/chat) • [Tech Stack](#-tech-stack--architecture) • [Features](#-core-features) • [Installation](#-getting-started) • [Contact](#-connect--collaborate)

---

</div>

<br />

## 🌟 Executive Summary

**ImPrince Tectra** is a high-performance, futuristic portfolio and conversational intelligence web application engineered by **Prince Raj**. Conceived with an AI-first design philosophy, it transcends conventional static resume sites by uniting reactive data visualization, interactive neural canvas shaders, fluid motion primitives, and an enterprise-grade AI knowledge assistant grounded directly in verified credentials, projects, and academic background from **IIT Patna**.

Whether accessed via the interactive single-page portfolio at [`imprince.me`](https://imprince.me) or the dedicated full-screen conversational interface at [`imprince.me/chat`](https://imprince.me/chat), the platform showcases production-grade full-stack craftsmanship.

<br />

## ✨ Core Features

### 1. 🧠 Dual-Mode Tectra AI Assistant
* **Dedicated Full-Page Experience (`/chat`)**: A focused, dark glassmorphic command center with quick suggestion cards, markdown syntax rendering, copy-to-clipboard actions, conversation reset, and fluid loading states.
* **Ambient Floating Launcher (`/`)**: A non-intrusive floating HUD widget on the homepage that allows visitors to query qualifications and project specifics without leaving their scroll position.
* **Grounding & Guardrails**: System instruction incorporates complete academic credentials, 7 verified certifications (AWS, Google, IBM), technical proficiencies, and direct contact details.

### 2. 🎨 Futuristic Visual Identity & Micro-Interactions
* **Mathematical Canvas Shaders**: Custom neural vortex particle canvas delivering fluid background dynamics without dropping frames.
* **Glassmorphism & Neon Glow**: Carefully tuned HSB color palette featuring cyan, electric blue, and deep slate accents with WCAG AA compliance.
* **Physics & Motion**: Powered by `motion/react` for buttery route transitions, scroll triggers, and active cursor spotlights.

### 3. 🚀 Featured Production Platforms & Deployments
* **LensDrop ([Live App](https://lensdrop.imprince.me) | [GitHub](https://github.com/princeraj-in/Lensdrop))**: A modern wedding and event memory-sharing platform. Guests scan live QR codes to upload uncompressed 4K media directly from their native smartphone cameras without downloading apps or creating accounts. Features real-time Firestore synchronization, client-side canvas compression, one-click ZIP archive exports, and Cloudinary media delivery.
* **City Helpline ([Live App](https://app.imprince.me) | [GitHub](https://github.com/princeraj-in/City-Helpline))**: A hyper-local student ecosystem platform assisting students across Indian education hubs. Features verified PG and hostel directories, daily mess/tiffin service menus, quiet study library locators, an interactive monthly expense calculator with WhatsApp export, and a peer-to-peer student second-hand marketplace.

### 4. 🛡️ Enterprise Security & Serverless Architecture
* **Zero Client-Side Secret Leakage**: The Google Gemini API key (`GEMINI_API_KEY`) is strictly confined to server-side execution.
* **Universal Deployment Parity**: Runs smoothly as an Express backend during local development (`npm run dev`) and seamlessly compiles into Vercel Serverless Functions (`/api/chat`, `/api/health`) for edge production.
* **SPA Routing Integrity**: `vercel.json` rewrites guarantee `/chat` deep-links and refreshes never trigger 404s while strictly segregating `/api/*` endpoints.

<br />

## 🧰 Tech Stack & Architecture

```
                                    ┌───────────────────────────────┐
                                    │        Client Browser         │
                                    │    (React 19 + TypeScript)    │
                                    └───────────────┬───────────────┘
                                                    │
                             ┌──────────────────────┴──────────────────────┐
                             ▼                                             ▼
                 ┌───────────────────────┐                     ┌───────────────────────┐
                 │    Homepage (`/`)     │                     │ Full-Page (`/chat`)   │
                 │ • Interactive HUD     │                     │ • Focused Chat Stage  │
                 │ • Particle Vortex     │                     │ • Suggestion Cards    │
                 │ • Floating Assistant  │                     │ • Auto-scroll Feed    │
                 └───────────┬───────────┘                     └───────────┬───────────┘
                             │                                             │
                             └──────────────────────┬──────────────────────┘
                                                    │  POST /api/chat
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │      Server / Edge Proxy      │
                                    │  (Vercel Serverless / Express)│
                                    │ • Validates payload & method  │
                                    │ • Injects System Knowledge    │
                                    │ • Loads GEMINI_API_KEY        │
                                    └───────────────┬───────────────┘
                                                    │
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │    Google Gemini 3.6 Flash    │
                                    │       (@google/genai)         │
                                    └───────────────────────────────┘
```

### Technology Matrix

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19, TypeScript 5, Vite 6 | High-speed component rendering, strict type-checking, fast HMR |
| **Styling & Effects** | Tailwind CSS 4, Motion (`motion/react`) | Utility styling, hardware-accelerated animations, glass UI |
| **Icons & Assets** | Lucide React, React Icons | Modern lightweight vector iconography |
| **Data Visualization** | Recharts, Custom Canvas Shaders | Algorithmic charts, skill metrics, and neural vortex animations |
| **AI Engine** | Google Gemini 3.6 Flash (`@google/genai`) | Low-latency inference, rich contextual grounding, natural dialogue |
| **Backend & Ingress** | Express 4 / Node.js (Dev), Vercel Serverless (Prod) | Secure API proxy, CORS handling, production edge hosting |
| **Deployment** | Vercel, Custom Domain (`imprince.me`) | Worldwide CDN caching, automated CI/CD, SSL termination |

<br />

## 📂 Project Structure

```text
Portfolio-prince-raj/
├── api/                          # Production Vercel Serverless Functions
│   ├── chat.ts                   # POST /api/chat - Gemini 3.6 inference engine
│   └── health.ts                 # GET /api/health - Service health monitoring
├── public/                       # Static assets and favicons
├── src/
│   ├── components/               # Modular UI views & sections
│   │   ├── ui/                   # Reusable glassmorphic atoms & widgets
│   │   │   ├── ProfileChatbot.tsx# Floating Tectra AI chatbot
│   │   │   ├── NeuralVortexBackground.tsx # Interactive background canvas
│   │   │   ├── CursorGlow.tsx    # Interactive mouse tracking spotlight
│   │   │   └── ...               # Cards, grids, and contact footers
│   │   ├── AboutSection.tsx      # Background & philosophy
│   │   ├── ProjectsSection.tsx   # Featured deployments (LensDrop & City Helpline)
│   │   ├── ChatPage.tsx          # Dedicated /chat full-page interface
│   │   ├── CredentialsSection.tsx# 7 verified certifications & IIT Patna
│   │   ├── HeroSection.tsx       # Primary showcase banner
│   │   ├── Navbar.tsx            # Floating glass header navigation
│   │   ├── SkillsSection.tsx     # Technical competency radar & metrics
│   │   └── ThemeProvider.tsx     # Dark/light ambient theme provider
│   ├── lib/                      # Core hooks & utility modules
│   │   ├── chat.ts               # Shared chat logic, state hook & prompts
│   │   ├── navigation.ts         # Lightweight client-side pathname router
│   │   └── animations.ts         # Motion variants & transition curves
│   ├── App.tsx                   # Top-level view router (/ vs /chat)
│   ├── index.css                 # Tailwind CSS 4 directives
│   └── main.tsx                  # React DOM hydration root
├── .env.example                  # Environment variable reference
├── package.json                  # Scripts & dependencies
├── server.ts                     # Local development Express proxy
├── tsconfig.json                 # TypeScript strict compiler options
├── vercel.json                   # Vercel serverless routing & SPA rewrites
└── vite.config.ts                # Vite build and asset configuration
```

<br />

## ⚡ Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **Package Manager**: `npm` (v9+) or `bun` / `pnpm`
* **Google Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/princeraj-in/Portfolio-prince-raj.git
cd Portfolio-prince-raj
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create your local environment configuration by copying `.env.example`:
```bash
cp .env.example .env
```

Define your secrets inside `.env`:
```env
# Required for Tectra AI inference
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Optional overrides (defaults to gemini-3.6-flash)
GEMINI_MODEL="gemini-3.6-flash"

# Local dev server URL
APP_URL="http://localhost:3000"
```

> [!WARNING]
> Never commit `.env` or expose your `GEMINI_API_KEY` to any public branch. The server automatically prevents browser leakage.

### 4. Run Development Server
```bash
npm run dev
```
The application will boot at **`http://localhost:3000`**:
* **Portfolio**: `http://localhost:3000/`
* **Tectra AI Chat**: `http://localhost:3000/chat`
* **Health Endpoint**: `http://localhost:3000/api/health`

<br />

## 📦 Build & Scripts Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Express + Vite dev server on port 3000 |
| `npm run build` | Compiles client assets (`dist/`) and bundles backend server (`dist/server.cjs`) |
| `npm start` | Executes the production CommonJS bundle in standalone environments |
| `npm run lint` | Runs TypeScript compiler checks (`tsc --noEmit`) |
| `npm run preview` | Locally serves the optimized production build |

<br />

## 🚀 Deployment to Vercel

The project is pre-configured with zero-config Vercel edge deployment:

1. **Connect Repository**: Import the repository into your [Vercel Dashboard](https://vercel.com).
2. **Environment Variables**: Under **Project Settings → Environment Variables**, add:
   - `GEMINI_API_KEY` = `your_google_ai_studio_api_key`
   - *(Optional)* `GEMINI_MODEL` = `gemini-3.6-flash`
3. **Deploy**: Trigger a production build. Vercel automatically detects Vite, generates the static SPA, and maps `api/*.ts` as Serverless Edge functions.
4. **Custom Domain**: Connect your domain (e.g. `imprince.me`) with automatic SSL certification.

<br />

## 👨‍💻 About Prince Raj

<table align="center">
  <tr>
    <td width="160" align="center" valign="middle">
      <img src="https://img.shields.io/badge/IIT_Patna-BS_CS_%26_DA-0052CC?style=for-the-badge" alt="IIT Patna" />
    </td>
    <td>
      <strong>Prince Raj</strong> is an <strong>AI Developer, Quantitative Trader, and Systems Engineer</strong>. He builds autonomous agentic pipelines, high-throughput execution engines, and reactive web platforms. Currently pursuing a Bachelor of Science in <em>Computer Science & Data Analytics</em> at the <strong>Indian Institute of Technology, Patna</strong>.
    </td>
  </tr>
</table>

### Verified Global Accreditations
* 🏆 **AWS Certified AI Practitioner** — Amazon Web Services
* 🏆 **IBM Generative AI Application Development** — IBM
* 🏆 **Google Cloud Generative AI Explorer** — Google Cloud
* 🏆 **IBM Machine Learning with Python** — IBM
* 🏆 **Google IT Security: Defense Against Digital Dark Arts** — Google
* 🏆 **Google Bits and Bytes of Networking** — Google
* 🏆 **Google Technical Support Fundamentals** — Google

<br />

## 📬 Connect & Collaborate

Have an ambitious project, an autonomous AI challenge, or a quantitative engineering opportunity? Connect directly:

<p align="left">
  <a href="mailto:kusprince.raj@gmail.com">
    <img src="https://img.shields.io/badge/Email-kusprince.raj@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email Prince" />
  </a>
  &nbsp;
  <a href="https://wa.me/918252995548">
    <img src="https://img.shields.io/badge/WhatsApp-+91_8252995548-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp Prince" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/prince-raj-ba4b973b3">
    <img src="https://img.shields.io/badge/LinkedIn-Prince_Raj-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Profile" />
  </a>
  &nbsp;
  <a href="https://github.com/princeraj-in">
    <img src="https://img.shields.io/badge/GitHub-princeraj--in-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile" />
  </a>
</p>

<br />

---

<div align="center">

Engineered with ⚡ **React 19 · TypeScript · Vite · Tailwind CSS · Google Gemini 3.6**

© Prince Raj — **ImPrince Tectra**. All rights reserved.

</div>
