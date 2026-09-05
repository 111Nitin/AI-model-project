# ProjectMentor AI: Capstone & Hackathon Presentation Deck

> **"From your skills to a project you can actually build."**  
> AI-Powered Academic Mentor for Final-Year Engineering Students

---

## 📽️ Slide Deck (13 Slides)

### Slide 1: Title & Overview
* **Project Name**: ProjectMentor AI
* **Subtitle**: Intelligent Engineering Project Mentor & Blueprint Platform
* **Tagline**: *"Bridging the gap between academic theory and production-grade capstone execution"*
* **Target Audience**: Final-Year Computer Science & Engineering Undergraduates, Faculty Guides, Capstone Review Committees
* **Tech Stack**: Node.js, Express, Google Gemini API (`@google/genai`), Vanilla CSS3, WCAG 2.1 AA
* **Repository**: [https://github.com/111Nitin/AI-model-project](https://github.com/111Nitin/AI-model-project)
* **Live Local Demo**: [http://localhost:3000](http://localhost:3000)

---

### Slide 2: The Final-Year Project Dilemma
* **The Problem**: Every semester, over 80% of final-year engineering students encounter project pitfalls:
  1. **Overambitious Scope Bloat**: Teams attempt to build massive "metaverse blockchain AI" systems that collapse before viva deadlines.
  2. **Generic Copycat Projects**: Defaulting to simple To-Do lists, basic eCommerce, or cookie-cutter chatbots that fail to impress technical recruiters.
  3. **Hidden Skill Gaps**: Realizing late in the semester that their chosen project requires unfamiliar tools (vector DBs, WebSockets, cloud infrastructure) with no learning sequence.
  4. **Coding Without Architecture**: Jumping into code without system architecture, database schemas, or test strategies.

---

### Slide 3: The Solution — ProjectMentor AI
* An end-to-end, phased engineering guidance platform (not just another open-ended chatbot):
  * **Step 1: Academic Profiling** (Branch, skills, timeline, team capacity)
  * **Step 2: Practical Idea Generation** (Feasibility, Skill Match & Innovation scoring)
  * **Step 3: Multi-Factor Comparison** (Official AI Recommended Pick)
  * **Step 4: Exhaustive 18-Part Blueprint** (Architecture, Schemas, APIs, Mitigations)
  * **Step 5: Skill Gap Analyzer** (Known vs Missing skills ordered by prerequisites)
  * **Step 6: Adaptive 9-Phase Roadmap** (Chronological milestones to viva day)
  * **Step 7: Project Reality Check** (Audits existing ideas, cuts scope bloat, extracts viable MVP)
  * **Step 8: 10-Dimensional Improvement Engine** (UX, Security, Performance, AI)
  * **Step 9: Documentation Export** (Instant `.md` and Print/PDF export)

---

### Slide 4: Dual-Engine Architecture & Resilience
* **Zero Single-Point-of-Failure**:
  * **Online Primary Mode**: Powered by Google Gemini 3.7 & 2.5 Flash via official `@google/genai` SDK with structured JSON schemas and TTL response caching.
  * **Offline Baseline Intelligence Engine**: If the API key is missing, network fails, or quotas are exceeded, the built-in heuristic engine automatically activates across 8 engineering disciplines.
  * **Result**: 100% uptime during live university evaluations.

---

### Slide 5: Feature Spotlight 1 — Profiling & Idea Discovery
* **Student Profiling**: Collects branch, verified skills, team size (1–6), timeline (1–6 months), difficulty, and project goals (Placement, Research, Startup, Academic).
* **1-Click Hackathon Demos**: Instant presets for CSE AI/Web, IT Full-Stack, ECE IoT, and Cybersecurity solo projects.
* **Bounded Idea Generation**:
  * 3–4 practical ideas with Skill Match %, Feasibility %, and Innovation %.
  * Distinct separation of **MVP Core Deliverables** vs **Advanced Stretch Features**.
  * Specific rationale: *"Why this matches your specific background."*

---

### Slide 6: Feature Spotlight 2 — 18-Part Blueprint & Comparison
* **Multi-Factor Comparison Matrix**: Side-by-side trade-off matrix with AI recommendation rationale.
* **18-Part Comprehensive Blueprint**:
  1. Overview | 2. Problem Statement | 3. Target Users | 4. Proposed Solution
  5. Core MVP Features | 6. Stretch Features | 7. Recommended Tech Stack
  8. Frontend Arch | 9. Backend Patterns | 10. Database Schema
  11. External APIs | 12. AI / ML Components | 13. System Architecture Diagram
  14. Dev Phases | 15. Testing Strategy | 16. Deployment Plan
  17. Risks & Mitigations | 18. Future Scope

---

### Slide 7: Feature Spotlight 3 — Skill Gap Audit & Roadmap
* **Skill Gap Audit**:
  * Identifies **Skills Already Known** (team strengths) vs **Missing Skills to Learn**.
  * Ranks missing skills by **Prerequisite Learning Order** (Critical, High, Medium).
  * Computes estimated **Learning Hours** and ramp-up weeks.
* **Adaptive 9-Phase Development Roadmap**:
  * Phase 1: Requirements & Scope ➔ Phase 2: UI/UX Wireframing ➔ Phase 3: DB Schema
  * Phase 4: Core APIs ➔ Phase 5: Frontend Assembly ➔ Phase 6: AI/ML Integration
  * Phase 7: Testing & QA ➔ Phase 8: Deployment & CI/CD ➔ Phase 9: Viva Prep
  * Live milestone checkboxes and progress percentage.

---

### Slide 8: Feature Spotlight 4 — Reality Check & Improvements
* **Project Reality Check (Standout Feature)**:
  * Students input their existing idea for an objective evaluation.
  * **✂️ Scope Bloat to Cut**: De-risks overambitious ideas (e.g. cutting blockchain or multi-cloud from student apps).
  * **➕ Missing Essentials to Add**: Highlights overlooked basics (auth, validation, offline states).
  * **🎯 Recommended MVP Scope**: Concrete, buildable subset.
* **10-Dimensional Improvements**: Upgrades projects across Functionality, Tech Stack, UX, Performance, Security, AI, Scalability, QA, DevOps, and Innovation.

---

### Slide 9: Technical Architecture & Security Posture
* **Zero Secret Leakage**: API keys stay strictly backend in `.env`; zero exposure to browser.
* **Security Headers (Helmet)**: Strict Content Security Policy (CSP), `X-Frame-Options: SAMEORIGIN`, `nosniff`.
* **Rate Limiting**: Express sliding-window limiter (200 req/15m general; 30 req/min AI endpoints).
* **Input Sanitization**: Payload validation, length capping, regex stripping of control and XSS characters.
* **Accessibility (WCAG 2.1 AA)**: Semantic landmarks, skip-link, ARIA live regions, `:focus-visible` rings.
* **Dark Mode Design System**: Midnight Slate theme, responsive layout, Google Fonts (Outfit & Inter).

---

### Slide 10: Quality Engineering & Automated Tests
* **100% Pass Rate**: 37 tests across 5 test suites (`npm test`):
  * `tests/validation.test.js`: Input boundaries, sanitization, XSS protection (9 tests)
  * `tests/api.test.js`: HTTP endpoints, status codes, Helmet headers, 404 trapping (9 tests)
  * `tests/offlineEngine.test.js`: Offline idea generator, blueprint, roadmap, scoring (7 tests)
  * `tests/accessibility.test.js`: HTML landmarks, labels, ARIA regions, skip-links (7 tests)
  * `tests/geminiService.test.js`: Structured schema handling, timeout, offline fallback (5 tests)

---

### Slide 11: 3-Minute Live Demo Plan
* **0:00 - 0:30**: Open `http://localhost:3000`. Show UI and intelligence badge.
* **0:30 - 1:15**: Click "CSE • AI/Web • Team of 3" preset. Click "Generate My Projects". Inspect tailored ideas and feasibility scores.
* **1:15 - 1:50**: Click "Compare All Ideas" ➔ show recommended pick. Click "Select & Blueprint" ➔ show 18-part blueprint & ASCII diagram.
* **1:50 - 2:30**: Switch to "Skill Gap & Roadmap" tab. Walk through known skills, missing skills, and 9-phase progress.
* **2:30 - 3:00**: Switch to "Project Reality Check". Load sample and show AI cutting scope bloat into an achievable MVP.

---

### Slide 12: Evaluator Viva Q&A Preparation
* **Q1: Why not just use ChatGPT or Gemini web?**  
  * *Answer*: General chatbots produce unconstrained ideas without engineering boundaries. ProjectMentor AI provides an end-to-end SDLC pipeline with quantitative feasibility scoring, strict MVP constraints, 18-part blueprints, prerequisite learning curves, and 100% offline resilience.
* **Q2: What happens if internet fails during evaluation?**  
  * *Answer*: The Dual-Engine architecture automatically fails over to the Offline Baseline Intelligence Engine, serving deterministic recommendations across 8 disciplines without crashing.
* **Q3: How is student input protected against injection?**  
  * *Answer*: A centralized validation middleware validates types, enforces length caps, and sanitizes dangerous input before processing.

---

### Slide 13: Conclusion & Future Roadmap
* **Key Takeaway**: Guides engineering students from initial confusion to an evaluable, production-ready capstone project.
* **Future Roadmap**:
  1. 1-Click GitHub starter repository scaffolding matching blueprint tech stack.
  2. Faculty & evaluator review portal with milestone sign-off.
  3. Weekly automated milestone reminders and blocker diagnostics.
* **Repository**: [https://github.com/111Nitin/AI-model-project](https://github.com/111Nitin/AI-model-project)
* **Local Demo**: [http://localhost:3000](http://localhost:3000)

---

## 🎙️ Speaker Script (Word-for-Word)

> *"Good morning respected faculty and evaluation committee. Today we present **ProjectMentor AI**, an intelligent academic mentor for final-year engineering students."*  
>  
> *"Every semester, 80% of student project pitfalls occur due to poor initial scoping: either teams pick overambitious projects that collapse before viva deadlines, or they copy generic To-Do lists that fail to impress campus recruiters. Teams also hit unexpected skill gaps weeks before submission."*  
>  
> *"ProjectMentor AI solves this by acting as a Senior AI Technical Guide. It takes student skills, timeline, and team size, generating practical project ideas with Feasibility and Skill Compatibility scores. It outputs an exhaustive 18-part technical blueprint, audits skill gaps with prerequisite learning hours, maps out an adaptive 9-phase roadmap, and includes our flagship 'Project Reality Check' to cut scope bloat."*  
>  
> *"Technically, the system is built for zero downtime using a Dual-Engine Architecture: Google Gemini API when online, and an Offline Baseline Intelligence Engine when offline. With 37 automated tests, Helmet security headers, rate limiting, and WCAG 2.1 AA accessibility, ProjectMentor AI delivers an enterprise-grade academic solution. Thank you!"*
