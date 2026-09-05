# ProjectMentor AI

> **"From your skills to a project you can actually build."**  
> AI-powered platform for final-year engineering students that bridges the gap between academic background and a production-grade, evaluable capstone project.

---

## 📌 Problem Statement & Alignment

Every semester, over 80% of final-year computer science and engineering students encounter critical project pitfalls:
1. **Unrealistic Over-Scoping**: Students attempt to build massive "metaverse AI blockchain ecosystems" that collapse before semester deadlines.
2. **Generic Copycat Projects**: Students default to generic clones (simple To-Do lists, basic eCommerce, cookie-cutter chatbots) that fail to impress university evaluation committees and technical recruiters.
3. **Hidden Skill Gaps**: Teams discover too late that their chosen idea requires unfamiliar infrastructure (e.g. vector databases, Kubernetes, WebSockets) with no structured learning sequence.
4. **Lack of an Actionable Roadmap**: Teams jump straight into code without architecture blueprints, schema design, or testing strategies.

**ProjectMentor AI** solves this by acting as an authoritative **Senior AI Technical Mentor**, guiding students through an end-to-end, phased project lifecycle:
```
Profile & Skills ➔ Personalized Ideas ➔ Multi-Factor Comparison ➔ 18-Part Blueprint 
       ➔ Skill Gap Analyzer ➔ 9-Phase Roadmap ➔ Project Reality Check ➔ 10-D Improvements
```

---

## 🌟 Key Features

### 1. Student Academic Profiling
- Collects Branch/Degree course, current technical skills, domain interests, skill level (Beginner/Intermediate/Advanced), team size (1–6 members), available timeline (1–6 months), preferred difficulty, and project goals (Placement portfolio, research paper, startup MVP, academic honors).
- Client & server-side boundary validation, input sanitization, and 1-click hackathon demo presets.

### 2. Personalized Project Idea Generator
- Leverages Google Gemini models (`gemini-3.7-flash` / `gemini-2.5-flash`) via `@google/genai` to generate 3–4 practical, non-generic project ideas.
- Each idea provides:
  - Title, short description, real-world problem statement, and proposed solution
  - Difficulty badge, estimated duration, and suggested team size
  - Quantitative metrics: **Skill Compatibility Score**, **Feasibility Score**, and **Innovation Score**
  - Concrete **MVP Features** (must deliver) and **Advanced Features** (stretch goals)
  - Explicit rationale: "Why this matches the student's background"

### 3. Project Comparison & Recommended Pick
- Side-by-side comparative matrix evaluating candidate projects across feasibility, skill synergy, innovation, and time constraints.
- Identifies an **Official AI Recommended Project** with comprehensive rationale explaining why it maximizes academic outcome while minimizing scope risk.

### 4. Comprehensive 18-Part Project Blueprint
When an idea is selected, ProjectMentor AI generates an exhaustive engineering blueprint:
1. Project Overview
2. Problem Statement
3. Target Users
4. Proposed Solution
5. Core MVP Features
6. Advanced Stretch Features
7. Recommended Technology Stack (Frontend, Backend, Database, Caching, Tooling)
8. Frontend Architecture & State Management
9. Backend Architecture & Service Patterns
10. Database Schema & Persistence
11. External APIs & Third-Party Integrations
12. AI / ML Components (with offline fallback specification)
13. System Architecture (Component Flow & ASCII Architecture Diagram)
14. Development Phases
15. Testing Strategy (Unit, Integration, Security Audits)
16. Deployment Strategy (Docker, Cloud Run/Vercel, CI/CD)
17. Possible Risks & Concrete Mitigations
18. Future Scope & Improvements
- **Export to Markdown (`.md`)** and **Print / PDF** functionality for university submission.

### 5. Skill Gap Analyzer
- Cross-references student skills against project requirements.
- Highlights:
  - **Skills Already Known** (team strengths that accelerate development)
  - **Missing Skills to Learn** (ordered by prerequisite sequence)
  - Skill Priority (**Critical**, **High**, **Medium**)
  - Why each skill is needed
  - Realistic learning effort estimates in hours and ramp-up weeks

### 6. Adaptive 9-Phase Development Roadmap
- Translates project scope and available timeline into 9 sequential development phases:
  - Phase 1: Requirement Analysis & Architectural Scope
  - Phase 2: UI/UX Wireframing & Design Tokens
  - Phase 3: Database Schema & Mock Data Seeding
  - Phase 4: Core Backend REST APIs & Security
  - Phase 5: Frontend Component Assembly & State Integration
  - Phase 6: Intelligent AI/ML Module Integration
  - Phase 7: Comprehensive Testing & Quality Assurance
  - Phase 8: Production Deployment & CI/CD Pipeline
  - Phase 9: Final Academic Documentation & Viva Preparation
- Interactive phase completion checkboxes with live progress tracking.

### 7. Project Reality Check (Standout Feature)
- Students can submit their existing or planned project ideas for a constructive, senior-mentor audit.
- Evaluates:
  - Feasibility Score, Time Feasibility, Technical Complexity, Innovation, and Scope Risk
  - Identified Strengths & Weaknesses
  - Missing Architectural Components
  - Major Technical Roadblocks
  - **✂️ Scope Bloat to Remove (De-risking)**
  - **➕ Missing Essentials to Add**
  - **🎯 Concrete Recommended MVP Scope**

### 8. Project Improvement Engine (10 Dimensions)
- Enhances existing projects across 10 distinct engineering dimensions:
  1. Functionality & Core Value
  2. Technology Stack Modernization
  3. User Experience (UX & Design)
  4. Performance & Latency
  5. Security & Data Protection
  6. AI/ML Intelligence Integration
  7. Scalability & System Design
  8. Testing & Quality Assurance
  9. Deployment & DevOps
  10. Innovation & Differentiators
- Highlights **Top 3 High-Impact Quick Wins** for rapid score boost.

---

## 🧠 Google Gemini Integration & Dual-Engine Resilience

ProjectMentor AI uses Google's official `@google/genai` SDK with strict architectural isolation:

```
┌────────────────────────────────────────────────────────┐
│               Frontend Web Application                 │
│         (ZERO API Keys exposed in client code)         │
└───────────────────────────┬────────────────────────────┘
                            │ REST JSON API
                            ▼
┌────────────────────────────────────────────────────────┐
│               Express Security Layer                   │
│   (Helmet, Rate-Limiting, Strict Schema Validation)    │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
  ┌───────────────────────┐   ┌───────────────────────┐
  │   Google Gemini API   │   │    Offline Baseline   │
  │   - gemini-3.7-flash  │   │  Intelligence Engine  │
  │   - gemini-2.5-flash  │   │  - Domain heuristics  │
  │   - Structured JSON   │   │  - 8 engineering fields│
  │   - Response caching  │   │  - 100% offline ready │
  └───────────────────────┘   └───────────────────────┘
```

### Dual-Engine Intelligence:
- **Primary AI Mode**: When `GEMINI_API_KEY` is present, uses `gemini-3.7-flash` with structured JSON schemas and caching.
- **Offline Baseline Fallback**: If the key is absent, rate-limited, or network fails, the system automatically engages the built-in **Offline Baseline Intelligence Engine**. The platform never shows blank screens or broken layouts—it seamlessly delivers high-quality, domain-grounded recommendations.

---

## 🔒 Security & Quality Engineering

- **No Secrets in Frontend**: All AI calls and sensitive credentials remain strictly in the backend service.
- **Security Headers (Helmet)**: Comprehensive Content Security Policy (CSP), anti-clickjacking (`X-Frame-Options`), and MIME-sniffing protection (`nosniff`).
- **Rate Limiting**: Sliding-window rate limiters prevent API abuse (200 requests/15m general, 30 requests/min for AI endpoints).
- **Input Sanitization**: Request bodies are type-checked, trimmed, stripped of control characters, and bounded to safe lengths.
- **Zero Stack Trace Leaks**: Production-grade centralized error handler returns user-friendly error messages without leaking internal traces.
- **In-Memory Caching**: AI outputs are cached with TTL to conserve API quotas and guarantee sub-50ms repeat requests.

---

## ♿ Accessibility (WCAG 2.1 AA Compliance)

- **Semantic HTML5**: Full landmark hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<dialog>`).
- **Form Controls**: Every input, select, and textarea is explicitly bound to a descriptive `<label for="...">`.
- **Keyboard Navigation**: Skip-to-content link (`#main-content`), focus trap in modals, visible 3px focus rings (`:focus-visible`).
- **Screen Reader Support**: ARIA live regions (`aria-live="polite"` for status badges, `aria-live="assertive"` for toasts, `role="alert"` for errors).
- **Color Contrast**: Complies with WCAG AA standard (>4.5:1 ratio), and never relies solely on color to convey information (icons + text labels included).

---

## 📁 Repository Structure

```
projectmentor-ai/
├── server/
│   ├── config.js              # Centralized configuration & environment loader
│   ├── server.js              # Express app setup, static hosting, error handling
│   ├── middleware/
│   │   ├── security.js        # Helmet, CORS, Rate Limiters, Input Sanitizers
│   │   └── validator.js       # Schemas for profile, blueprint, reality-check
│   ├── routes/
│   │   └── api.js             # REST endpoints (/api/*)
│   └── services/
│       ├── geminiService.js   # Google GenAI SDK integration with fallback
│       └── offlineEngine.js   # Domain intelligence & fallback calculations
├── public/
│   ├── index.html             # Semantic, accessible single-page interface
│   ├── css/
│   │   └── style.css          # Midnight Slate dark mode design system
│   └── js/
│       ├── api.js             # Client API client with timeout & error handling
│       └── app.js             # State machine, DOM renderers, preset handlers
├── tests/
│   ├── validation.test.js     # Input validation, bounds, XSS sanitization
│   ├── offlineEngine.test.js  # Offline generator & scoring tests
│   ├── geminiService.test.js  # Gemini service & fallback tests
│   ├── api.test.js            # HTTP endpoints, security headers, 404 tests
│   └── accessibility.test.js  # Semantic HTML landmarks, labels, ARIA checks
├── .env.example               # Environment variables template
├── .gitignore                 # Excluded directories & secrets
├── package.json               # Dependencies & scripts
└── README.md                  # Project documentation
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- Node.js (v18+ or v24+)
- pnpm or npm

### 1. Installation
Clone the repository and install dependencies:
```bash
# Using pnpm
pnpm install

# Or using npm
npm install
```

### 2. Environment Configuration
Copy the template file:
```bash
cp .env.example .env
```
Open `.env` and configure:
```env
PORT=3000
NODE_ENV=development

# Optional: Add your Google Gemini API Key from https://aistudio.google.com/
# If left empty, the application automatically runs on the Offline Baseline Engine
GEMINI_API_KEY=
```

### 3. Running the Server on Windows / macOS / Linux
```bash
# Start server
node server/server.js

# Or start in watch mode
node --watch server/server.js
```
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🧪 Automated Testing

ProjectMentor AI includes an automated test suite executed with Node's native test runner (`node:test`):

```bash
node --test tests/**/*.test.js
```

### Test Coverage Highlights:
- **`tests/validation.test.js`**: Validates profiles, field absence, negative/overflow team sizes, invalid duration strings, string length capping, and XSS sanitization.
- **`tests/offlineEngine.test.js`**: Verifies 3–4 idea generation, comparison rankings, complete 18-part blueprints, skill gap calculations, 9-phase roadmaps, reality check scoring, and 10-dimension improvements.
- **`tests/geminiService.test.js`**: Verifies structured generation, timeout handling, error trapping, and automatic offline fallback triggers.
- **`tests/api.test.js`**: Integration tests verifying `/api/health`, `/api/profile/validate`, `/api/ideas/generate`, `/api/blueprint/generate`, `/api/reality-check`, Helmet security headers (`nosniff`), and clean 404 handling.
- **`tests/accessibility.test.js`**: DOM checks verifying DOCTYPE, `<title>`, meta descriptions, skip-link, semantic landmarks, single `<h1>`, `<label for="...">` associations, and ARIA live regions.

---

## ⏱️ 3-Minute Hackathon Demo Script

For a quick hackathon presentation:
1. **0:00 - 0:30 (Problem & Intro)**:
   - Open `http://localhost:3000`. Point out the header badge showing active intelligence mode.
   - Explain the core issue: Students either pick unrealistic ideas that fail or generic clones that don't impress recruiters.
2. **0:30 - 1:00 (1-Click Preset & Idea Generation)**:
   - Click the **"CSE • AI/Web • Team of 3"** 1-Click preset button.
   - Notice how all fields (Branch: CSE, Skills: Python, C++, React, SQL, Team: 3, Time: 4 Months) pre-fill instantly.
   - Click **"Generate My Projects"**. Inspect the 3–4 tailored project cards with Skill Match %, Feasibility %, Innovation %, and MVP features.
3. **1:00 - 1:45 (Compare & 18-Part Blueprint)**:
   - Click **"Compare All Generated Ideas"**. Show the comparison matrix and the **Official AI Recommended Pick** banner explaining *why* it's the winning candidate.
   - Click **"Select & Blueprint"**. Show the generated 18-part blueprint, tech stack, and ASCII system architecture. Click **"Export Blueprint (.md)"** to show instant documentation generation.
4. **1:45 - 2:15 (Skill Gap & 9-Phase Roadmap)**:
   - Switch to **"Skill Gap & Roadmap"**.
   - Show the team readiness percentage, known skills vs missing skills ordered by prerequisite, and estimated study hours.
   - Show the 9-phase roadmap and check off Phase 1 to demonstrate live milestone tracking.
5. **2:15 - 3:00 (Project Reality Check & Improvements)**:
   - Switch to **"Project Reality Check"**.
   - Click **"Overambitious (AI+Blockchain+IoT)"** sample button and click **"Audit This Project"**.
   - Watch the AI identify scope bloat, risks, features to cut, features to add, and the exact recommended MVP.
   - Conclude: ProjectMentor AI guides engineering students from initial confusion to a project they can build and defend with pride.