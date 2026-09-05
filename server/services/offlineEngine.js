/**
 * Offline Baseline Intelligence Engine for ProjectMentor AI
 * Provides high-quality, practical project guidance when Gemini API is offline,
 * unconfigured, or rate-limited.
 */

// Curated domain project repositories for engineering students
const DOMAIN_PROJECT_BANK = [
  {
    domain: 'AI/ML & NLP',
    keywords: ['ai', 'ml', 'machine learning', 'nlp', 'deep learning', 'python', 'computer vision', 'data science'],
    templates: [
      {
        title: 'VeriMed: Multilingual Clinical Discharge Summarizer & Patient Q&A',
        description: 'An AI-assisted clinical portal that ingests dense medical discharge summaries, converts clinical jargon into plain patient-friendly language across 6 regional languages, and provides an audited Q&A agent for post-op medication guidance.',
        problemStatement: 'Over 40% of readmissions occur because patients do not comprehend complex discharge papers and medication instructions, especially in multilingual communities.',
        proposedSolution: 'A localized generative AI pipeline combining retrieval-augmented generation (RAG) with clinical boundary verification, dosage table extraction, and audio readouts.',
        difficulty: 'Medium',
        estimatedDuration: '4 months',
        requiredSkills: ['Python', 'FastAPI', 'LangChain / RAG', 'React', 'Vector Databases (Chroma/FAISS)', 'REST APIs'],
        recommendedTechnologies: ['Python 3.11', 'FastAPI', 'ChromaDB', 'React 18', 'TailwindCSS / Vanilla CSS', 'HuggingFace Transformers'],
        innovationScore: 88,
        feasibilityScore: 92,
        suggestedTeamSize: 3,
        mvpFeatures: [
          'PDF discharge summary upload and OCR parsing',
          'Medical jargon simplification pipeline with terminology dictionary',
          'Interactive patient-friendly medication timetable table',
          'Audited Q&A assistant restricted to uploaded discharge context'
        ],
        advancedFeatures: [
          'Multilingual audio synthesis (Text-to-Speech) for low-literacy users',
          'SMS / WhatsApp automated dosage reminder webhook',
          'Doctor verification badge & audit log export for hospital compliance'
        ],
        frontendStack: 'React / Vanilla JS, Responsive Dashboard, Accessible Audio Player',
        backendStack: 'FastAPI / Node.js, PyPDF, Sentence-Transformers',
        databaseStack: 'PostgreSQL (Patient Records), ChromaDB (Clinical Knowledge Chunks)',
        apis: 'Open-source BioBERT/Gemini, Web Speech API, Hospital FHIR format parser',
        aiMlComponents: 'Retrieval Augmented Generation (RAG) with hallucination guardrails and medical entity extraction',
        testingStrategy: 'Biomedical benchmark Q&A evaluation, Unit tests with pytest, Component UI tests',
        deploymentStrategy: 'Docker containerized backend on Google Cloud Run, Vercel frontend, Supabase DB'
      },
      {
        title: 'AgriSense: Edge-Optimized Crop Disease Detection & Localized Treatment Advisor',
        description: 'A mobile-first progressive web app providing smallholder farmers with offline-capable leaf disease detection using quantized vision models, coupled with localized soil-weather treatment advisories.',
        problemStatement: 'Rural farmers face up to 35% crop yield loss due to delayed pathogen diagnosis and lack of low-bandwidth agricultural extension services.',
        proposedSolution: 'An edge-quantized vision model (TFLite/ONNX) running directly in the browser/client, generating instant plant health diagnoses without requiring constant high-speed internet.',
        difficulty: 'Medium',
        estimatedDuration: '3 months',
        requiredSkills: ['Python', 'PyTorch / TensorFlow', 'Computer Vision', 'JavaScript / PWA', 'Flask / FastAPI'],
        recommendedTechnologies: ['TensorFlow Lite / ONNX Web', 'Python', 'FastAPI', 'HTML5 PWA / Vanilla JS', 'SQLite'],
        innovationScore: 85,
        feasibilityScore: 94,
        suggestedTeamSize: 3,
        mvpFeatures: [
          'Camera capture & leaf disease image classification across 12 crop types',
          'Offline disease confidence score and visual symptom bounding box',
          'Step-by-step non-chemical & organic treatment recommendations',
          'Localized vernacular language toggle'
        ],
        advancedFeatures: [
          'Local weather API integration predicting fungal spore spread risks',
          'Community outbreak heatmap based on anonymized geo-tagged submissions',
          'Direct agronomist chat portal with image history attachment'
        ],
        frontendStack: 'Progressive Web App (PWA) with Service Workers for offline cache',
        backendStack: 'FastAPI lightweight REST server, OpenCV image pre-processing',
        databaseStack: 'SQLite for offline sync, MongoDB for outbreak logs',
        apis: 'OpenWeatherMap API, Localized Agricultural Extension RSS feeds',
        aiMlComponents: 'MobileNetV3 transfer learning fine-tuned on PlantVillage dataset, quantized to INT8',
        testingStrategy: 'Confusion matrix & F1-score validation, offline browser performance benchmarking',
        deploymentStrategy: 'AWS Elastic Beanstalk / Render, PWA hosted on Cloudflare Pages'
      }
    ]
  },
  {
    domain: 'Full-Stack & Cloud / DevOps',
    keywords: ['web', 'javascript', 'react', 'node', 'express', 'full stack', 'cloud', 'aws', 'docker', 'devops'],
    templates: [
      {
        title: 'DevCollab: Real-Time Collaborative API Workspace & Mock Engine',
        description: 'A developer productivity platform enabling distributed teams to design API specs, simulate live mock servers with dynamic state, and automatically generate contract tests with WebSocket sync.',
        problemStatement: 'Frontend and backend teams experience bottleneck delays waiting for APIs to be finalized, while existing tools are heavy, expensive, or lack real-time multi-user editing.',
        proposedSolution: 'A lightweight web-based collaborative studio where developers define endpoints visually, auto-spin live mock endpoints with faker data, and sync specs in real-time.',
        difficulty: 'Medium',
        estimatedDuration: '4 months',
        requiredSkills: ['JavaScript / TypeScript', 'Node.js', 'Express', 'WebSockets / Socket.io', 'React / Modern JS', 'Docker'],
        recommendedTechnologies: ['Node.js 20+', 'Express', 'Socket.io', 'Monaco Editor / CodeMirror', 'PostgreSQL / Prisma', 'Redis'],
        innovationScore: 86,
        feasibilityScore: 95,
        suggestedTeamSize: 3,
        mvpFeatures: [
          'Visual REST API endpoint designer with request/response schema builder',
          'Instant dynamic mock server endpoint URL generation',
          'Real-time multi-user cursor and schema synchronization via WebSockets',
          'Export to OpenAPI 3.0 (Swagger) and Postman collections'
        ],
        advancedFeatures: [
          'Automated contract regression test runner comparing mock vs live server',
          'Team role-based access control (RBAC) and workspace version history',
          'CLI tool for local mock server proxying during offline development'
        ],
        frontendStack: 'Vanilla JS / Modern React, WebSocket client, Monaco Editor, Tailwind/Vanilla CSS',
        backendStack: 'Node.js, Express, Socket.io, JSON Schema Validator',
        databaseStack: 'PostgreSQL for specs & users, Redis for live active socket rooms',
        apis: 'OpenAPI 3.0 parser, GitHub OAuth, Webhooks emitter',
        aiMlComponents: 'AI-assisted sample payload generation based on schema descriptions',
        testingStrategy: 'Supertest for API routes, Vitest for WebSocket room sync, Cypress for UI flows',
        deploymentStrategy: 'Docker Compose, DigitalOcean App Platform / GCP Cloud Run'
      },
      {
        title: 'SkillProof: Verified Peer-to-Peer Code Review & Technical Portfolio Platform',
        description: 'A platform for engineering students and early-career developers to submit pull requests, receive structured peer code reviews with rubric grading, and build a cryptographically signed proof-of-work portfolio.',
        problemStatement: 'Graduating students struggle to prove authentic coding ability to recruiters because traditional resumes and GitHub repos lack verified review quality.',
        proposedSolution: 'A structured peer-review network that gamifies thorough code review, audits code quality using static analysis, and issues verifiable skill achievement badges.',
        difficulty: 'Medium',
        estimatedDuration: '3 months',
        requiredSkills: ['JavaScript / TypeScript', 'Node.js', 'React / Vue / Svelte', 'PostgreSQL / MongoDB', 'Git APIs'],
        recommendedTechnologies: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Octokit (GitHub API)', 'ESLint API'],
        innovationScore: 84,
        feasibilityScore: 96,
        suggestedTeamSize: 2,
        mvpFeatures: [
          'GitHub OAuth repository import & pull-request code diff viewer',
          'Multi-criteria review rubric (Readability, Security, Performance, Test coverage)',
          'Automated ESLint and complexity analysis scoring',
          'Public student portfolio page showcasing top reviewed contributions'
        ],
        advancedFeatures: [
          'Blind peer review queue to eliminate bias in peer grading',
          'Verifiable digital credential badge generation with QR code',
          'Recruiter search portal filtering candidates by verified review scores'
        ],
        frontendStack: 'React / Vanilla JS, Diff2HTML viewer, Chart.js for skill breakdown',
        backendStack: 'Express.js, Octokit GitHub API client, AST parser for code complexity',
        databaseStack: 'PostgreSQL with relational schema for submissions, reviews, and badges',
        apis: 'GitHub REST API, Gravatar API, PDFKit for portfolio summary export',
        aiMlComponents: 'Heuristic code smell detection and AI suggestion review co-pilot',
        testingStrategy: 'Unit tests with Jest/Node test runner, API contract testing with Supertest',
        deploymentStrategy: 'Railway / Render with PostgreSQL database, Vercel frontend'
      }
    ]
  },
  {
    domain: 'Cybersecurity & Privacy',
    keywords: ['cyber', 'security', 'cybersecurity', 'infosec', 'privacy', 'networking', 'crypto', 'blockchain'],
    templates: [
      {
        title: 'ZeroTrustGuard: Microservices API Security & Access Anomaly Detector',
        description: 'An open-source security gateway that inspects internal microservice-to-microservice REST traffic, validates JWT token context, and flags credential stuffing and broken object-level authorization (BOLA) attempts.',
        problemStatement: 'OWASP Top 10 API Security reports that BOLA (Broken Object Level Authorization) and token hijacking account for over 60% of modern API breaches.',
        proposedSolution: 'A reverse proxy security sidecar that enforces attribute-based access control (ABAC) and monitors token behavior patterns with statistical anomaly detection.',
        difficulty: 'Hard',
        estimatedDuration: '4 months',
        requiredSkills: ['Python / Go / Node.js', 'Networking / HTTP', 'Cryptography / JWT', 'Docker', 'Linux'],
        recommendedTechnologies: ['Python / FastAPI', 'Redis', 'Docker', 'JWT / OAuth2', 'Vanilla JS / Chart.js', 'SQLite/PostgreSQL'],
        innovationScore: 91,
        feasibilityScore: 87,
        suggestedTeamSize: 3,
        mvpFeatures: [
          'Reverse proxy middleware inspecting incoming JSON payloads and JWT headers',
          'Real-time OWASP API #1 (BOLA) detection checking resource-to-user ID mismatches',
          'Live security analyst dashboard displaying active threat alerts and request logs',
          'Configurable rate-limiting and automated IP blocklist rule manager'
        ],
        advancedFeatures: [
          'Isolation forest ML model detecting anomalous request frequency and payload size',
          'Slack / Discord automated incident webhook alerts',
          'Exportable compliance audit report (JSON / PDF) for security viva'
        ],
        frontendStack: 'Vanilla JS / HTML5, Chart.js live incident charts, Tailwind/Custom CSS',
        backendStack: 'FastAPI / Node.js reverse proxy, PyJWT, Cryptography lib',
        databaseStack: 'Redis (sliding-window rate limit & active sessions), PostgreSQL (audit logs)',
        apis: 'Ipinfo.io geolocation API, Webhook notifications',
        aiMlComponents: 'Unsupervised anomaly detection using Isolation Forest on request vectors',
        testingStrategy: 'Simulated penetration test scripts (OWASP Zap / curl fuzzing), pytest suite',
        deploymentStrategy: 'Docker containerized reverse proxy with Nginx SSL termination'
      }
    ]
  },
  {
    domain: 'IoT & Smart Systems',
    keywords: ['iot', 'embedded', 'hardware', 'arduino', 'raspberry pi', 'sensors', 'electronics', 'ece', 'telecom'],
    templates: [
      {
        title: 'SmartGrid-Lite: Decentralized Campus Energy Monitor & Load Forecaster',
        description: 'An IoT telemetry dashboard combining smart energy sensor simulations with time-series forecasting to pinpoint campus building power waste and recommend peak-hour load shedding.',
        problemStatement: 'Educational institutions and commercial buildings waste 20-30% of their electrical power due to unmonitored HVAC and laboratory idle consumption.',
        proposedSolution: 'An MQTT telemetry pipeline that aggregates sensor streams, stores metrics in a time-series DB, and predicts day-ahead building consumption with peak alerts.',
        difficulty: 'Medium',
        estimatedDuration: '4 months',
        requiredSkills: ['C++ / Python', 'MQTT Protocol', 'Node.js / Python', 'Time-Series DB / SQLite', 'HTML / CSS / JS'],
        recommendedTechnologies: ['ESP32 / Simulated MQTT Clients', 'Mosquitto MQTT Broker', 'Node.js / Express', 'InfluxDB / SQLite', 'Chart.js'],
        innovationScore: 87,
        feasibilityScore: 91,
        suggestedTeamSize: 3,
        mvpFeatures: [
          'Multi-node sensor data simulation/ingestion over MQTT protocol',
          'Real-time kilowatt-hour power consumption graphs by department/room',
          'Threshold-based alert system for equipment left running during off-hours',
          'Historical daily/weekly energy expenditure and carbon footprint calculation'
        ],
        advancedFeatures: [
          'Day-ahead peak load forecasting using autoregressive time-series models',
          'Automated relay-trigger simulation for intelligent non-critical load shedding',
          'Mobile SMS / Push notification alert integration for facility managers'
        ],
        frontendStack: 'Vanilla JS, Canvas/SVG power gauges, Chart.js time-series plots',
        backendStack: 'Node.js or Python backend subscribing to MQTT broker, Express REST API',
        databaseStack: 'InfluxDB or SQLite with time-indexed partition for fast rollups',
        apis: 'Open-Meteo Weather API (temperature correlation), Twilio SMS',
        aiMlComponents: 'Linear Regression / ARIMA time-series model for 24-hour demand prediction',
        testingStrategy: 'MQTT load testing with 100 concurrent simulated nodes, unit tests',
        deploymentStrategy: 'Raspberry Pi local hub or cloud VM on GCP Compute Engine'
      }
    ]
  }
];

/**
 * Calculates skill compatibility score between student skills and required project skills
 */
export function calculateSkillCompatibility(studentSkills = [], requiredSkills = []) {
  if (!studentSkills.length || !requiredSkills.length) return 70;

  const normalizedStudent = studentSkills.map(s => s.toLowerCase().trim());
  let matches = 0;

  for (const req of requiredSkills) {
    const reqLower = req.toLowerCase();
    const isMatched = normalizedStudent.some(
      st => st.includes(reqLower) || reqLower.includes(st) ||
      (st === 'js' && reqLower.includes('javascript')) ||
      (st === 'py' && reqLower.includes('python')) ||
      (st === 'ml' && reqLower.includes('machine learning')) ||
      (st === 'react' && reqLower.includes('frontend'))
    );
    if (isMatched) matches++;
  }

  const ratio = matches / requiredSkills.length;
  // Scale between 60 and 96
  return Math.min(96, Math.max(62, Math.round(55 + ratio * 40)));
}

/**
 * Generates 3-5 personalized project ideas from student profile
 */
export function generateOfflineIdeas(profile) {
  const { skills = [], interests = [], preferredDifficulty = 'Medium', teamSize = 3, availableTimeMonths = 4 } = profile;

  // Search through domain templates
  const matchedTemplates = [];
  const allKeywords = [...skills, ...interests].map(k => k.toLowerCase());

  for (const group of DOMAIN_PROJECT_BANK) {
    const isDomainMatch = group.keywords.some(kw => allKeywords.some(ak => ak.includes(kw) || kw.includes(ak)));
    for (const tpl of group.templates) {
      const copy = JSON.parse(JSON.stringify(tpl));
      copy.isDomainMatch = isDomainMatch;
      matchedTemplates.push(copy);
    }
  }

  // Sort prioritized by domain match
  matchedTemplates.sort((a, b) => (b.isDomainMatch ? 1 : 0) - (a.isDomainMatch ? 1 : 0));

  // Pick top 3 to 4 ideas
  const selected = matchedTemplates.slice(0, 4);

  // If fewer than 3, add generic fallback templates
  if (selected.length < 3) {
    selected.push(DOMAIN_PROJECT_BANK[0].templates[0]);
    selected.push(DOMAIN_PROJECT_BANK[1].templates[0]);
  }

  return selected.slice(0, 4).map((item, index) => {
    const compatibility = calculateSkillCompatibility(skills, item.requiredSkills);
    const duration = availableTimeMonths <= 2 ? '2 months' : `${availableTimeMonths} months`;

    return {
      id: `proj-${Date.now()}-${index + 1}`,
      title: item.title,
      shortDescription: item.description,
      problemStatement: item.problemStatement,
      proposedSolution: item.proposedSolution,
      whyItMatches: `Directly aligns with your background in ${profile.branch || 'Engineering'}, leveraging your knowledge of ${skills.slice(0, 3).join(', ') || 'core concepts'} while challenging your team with practical full-stack and cloud delivery.`,
      difficulty: item.difficulty || preferredDifficulty,
      estimatedDuration: duration,
      requiredSkills: item.requiredSkills,
      recommendedTechnologies: item.recommendedTechnologies,
      innovationScore: Math.min(96, item.innovationScore + (index === 0 ? 4 : 0)),
      feasibilityScore: Math.min(98, Math.max(70, item.feasibilityScore - (preferredDifficulty === 'Hard' ? 5 : 0))),
      skillCompatibilityScore: compatibility,
      suggestedTeamSize: Math.max(1, Math.min(teamSize, item.suggestedTeamSize)),
      mvpFeatures: item.mvpFeatures,
      advancedFeatures: item.advancedFeatures,
      learningCurve: preferredDifficulty === 'Easy' ? 'Gentle learning curve with established tutorials' : 'Moderate ramp-up required for specialized libraries'
    };
  });
}

/**
 * Compares ideas and designates the recommended pick with detailed rationale
 */
export function compareOfflineIdeas(ideas, profile = {}) {
  if (!Array.isArray(ideas) || ideas.length === 0) {
    return { comparisonTable: [], recommendedProjectId: null, rationale: '' };
  }

  const compared = ideas.map(idea => {
    const compatibility = idea.skillCompatibilityScore || calculateSkillCompatibility(profile.skills, idea.requiredSkills);
    const feasibility = idea.feasibilityScore || 85;
    const innovation = idea.innovationScore || 80;

    // Weighted score: 40% feasibility, 35% skill compatibility, 25% innovation
    const compositeScore = Math.round((feasibility * 0.40) + (compatibility * 0.35) + (innovation * 0.25));

    return {
      id: idea.id,
      title: idea.title,
      difficulty: idea.difficulty || 'Medium',
      estimatedTime: idea.estimatedDuration || '4 months',
      suggestedTeamSize: idea.suggestedTeamSize || 3,
      skillCompatibility: compatibility,
      feasibility,
      innovation,
      compositeScore,
      requiredSkillsCount: (idea.requiredSkills || []).length,
      mvpFeatureCount: (idea.mvpFeatures || []).length
    };
  });

  // Pick idea with highest composite score
  compared.sort((a, b) => b.compositeScore - a.compositeScore);
  const best = compared[0];

  const rationale = `We recommend "${best.title}" as your prime candidate because it delivers the optimal balance of high academic feasibility (${best.feasibility}/100) and strong skill synergy (${best.skillCompatibility}/100) with your existing technical background. It provides a clearly bounded MVP deliverable that can be built and demonstrated reliably within ${best.estimatedTime} by a team of ${best.suggestedTeamSize}, avoiding the fatal scope creep that derails typical final-year capstones.`;

  return {
    comparisonList: compared,
    recommendedProjectId: best.id,
    recommendationRationale: rationale
  };
}

/**
 * Generates an exhaustive 18-part Project Blueprint
 */
export function generateOfflineBlueprint(idea, profile = {}) {
  const title = idea.title || 'Innovative Final Year Project';
  const branch = profile.branch || 'Computer Science & Engineering';
  const teamSize = idea.suggestedTeamSize || profile.teamSize || 3;
  const duration = idea.estimatedDuration || profile.availableTime || '4 months';

  return {
    projectId: idea.id || `blueprint-${Date.now()}`,
    projectTitle: title,
    tagline: 'Practical, production-grade final year capstone implementation',
    
    // 1. Project Overview
    projectOverview: `${title} is a modular, high-impact final year engineering project designed to address real-world operational bottlenecks. It provides an end-to-end working system incorporating modern user interface design, secure backend service architecture, robust data persistence, and measurable outcome metrics suitable for academic evaluation and portfolio demonstration.`,
    
    // 2. Problem Statement
    problemStatement: idea.problemStatement || 'Target users currently experience significant manual friction, high error rates, and lack of real-time visibility due to fragmented tools and inaccessible data pipelines.',
    
    // 3. Target Users
    targetUsers: [
      'Primary End-Users: Operating personnel requiring clean, intuitive task interfaces.',
      'Administrative Managers: Supervisors auditing system performance, metrics, and incident logs.',
      'Academic Evaluators / Viva Examiners: Reviewers inspecting system architecture, test coverage, and documentation.'
    ],
    
    // 4. Proposed Solution
    proposedSolution: idea.proposedSolution || 'A unified, accessible web platform delivering authenticated workflows, automated data processing, actionable analytical dashboards, and real-time user notifications.',
    
    // 5. Core / MVP Features
    coreMvpFeatures: (idea.mvpFeatures && idea.mvpFeatures.length > 0) ? idea.mvpFeatures : [
      'User Authentication & Role-Based Access Control (Admin / Student / Staff)',
      'Primary Domain Data Ingestion & Input Validation Engine',
      'Real-Time Status & Operational Analytics Dashboard',
      'Exportable Summary Reports in PDF and CSV format'
    ],
    
    // 6. Advanced Features
    advancedFeatures: (idea.advancedFeatures && idea.advancedFeatures.length > 0) ? idea.advancedFeatures : [
      'Predictive Anomaly Detection & Trend Forecasting Module',
      'Real-Time Push Notification & Webhook Dispatcher',
      'Offline-First Progressive Web App (PWA) Client Support'
    ],
    
    // 7. Recommended Technology Stack
    recommendedTechnologyStack: {
      frontend: 'React 18 / Modern Vanilla ES6+, TailwindCSS / Custom Design Tokens, Vite',
      backend: 'Node.js (Express.js) or Python (FastAPI) REST API',
      database: 'PostgreSQL with relational foreign keys or MongoDB for document payloads',
      caching: 'Redis for rate limiting, session storage, and pub/sub caching',
      tooling: 'Docker, GitHub Actions for CI/CD, Postman for API documentation'
    },
    
    // 8. Frontend Architecture
    frontend: {
      framework: 'Responsive Single Page Architecture (SPA)',
      stateManagement: 'Context API or Zustand with LocalStorage caching',
      styling: 'WCAG AA Compliant design tokens, dark/light theme, accessible forms',
      keyLibraries: ['Lucide Icons / SVG', 'Chart.js / Recharts', 'Axios / Native Fetch API']
    },
    
    // 9. Backend Architecture
    backend: {
      runtime: 'Node.js / Express or Python / FastAPI',
      pattern: 'Controller-Service-Repository Layered Architecture',
      middleware: ['Helmet Security Headers', 'CORS Guard', 'Rate Limiting', 'Joi/Zod Request Validator']
    },
    
    // 10. Database Schema & Persistence
    database: {
      engine: 'PostgreSQL (Relational) or SQLite for rapid local prototyping',
      tablesOrCollections: [
        'Users (id, email, password_hash, role, created_at)',
        'ProjectEntities (id, user_id, title, payload_data, status, updated_at)',
        'AuditLogs (id, action_type, entity_id, user_ip, timestamp)',
        'AnalyticsMetrics (id, metric_key, metric_value, recorded_at)'
      ]
    },
    
    // 11. External APIs & Third-Party Services
    apis: [
      'Authentication: JWT Bearer Tokens with refresh cycle',
      'Email / Notifications: Nodemailer or Twilio API',
      'Export Service: PDFKit / Puppeteer for document generation'
    ],
    
    // 12. AI / ML Components
    aiMlComponents: {
      included: true,
      description: 'Heuristic decision logic combined with Google Gemini API for automated summary generation, natural language validation, and intelligent recommendations.',
      fallback: 'Deterministic rule-based offline analyzer ensuring system resilience during network loss'
    },
    
    // 13. System Architecture
    systemArchitecture: {
      diagramType: 'Layered Client-Server Micro-Monolith',
      flowDescription: 'Client (Web Browser) ➔ Reverse Proxy / Gateway (CORS/Rate-Limit) ➔ Security & Auth Middleware ➔ API Controllers ➔ Business Logic Services (Gemini / Offline Engine) ➔ Data Access Layer ➔ PostgreSQL Database & Cache.',
      asciiDiagram: `
┌──────────────────────────────────────────────────────────┐
│                   Frontend Client (Web)                  │
│       [User UI] ── [State Store] ── [API Client]         │
└────────────────────────────┬─────────────────────────────┘
                             │ HTTPS / REST / WebSockets
                             ▼
┌──────────────────────────────────────────────────────────┐
│              Backend Application Server                  │
│  ┌───────────────────────┐    ┌───────────────────────┐  │
│  │ Security & Auth (JWT) │    │  Input Validation     │  │
│  └───────────┬───────────┘    └───────────┬───────────┘  │
│              ▼                            ▼              │
│  ┌────────────────────────────────────────────────────┐  │
│  │           Core Controller & Service Layer          │  │
│  │   [Gemini AI Engine]   ◄──►   [Offline Fallback]   │  │
│  └───────────────────────┬────────────────────────────┘  │
└──────────────────────────┼───────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│                     Data Persistence                     │
│        [PostgreSQL / SQLite]  ◄──►  [Redis Cache]        │
└──────────────────────────────────────────────────────────┘`
    },
    
    // 14. Development Phases
    developmentPhases: [
      { phase: 'Phase 1', title: 'Requirements & Schema Design', duration: 'Weeks 1-2' },
      { phase: 'Phase 2', title: 'Core Backend CRUD & Auth', duration: 'Weeks 3-5' },
      { phase: 'Phase 3', title: 'Frontend UI & Component Assembly', duration: 'Weeks 6-9' },
      { phase: 'Phase 4', title: 'AI Integration & Advanced Features', duration: 'Weeks 10-12' },
      { phase: 'Phase 5', title: 'Testing, Deployment & Viva Prep', duration: 'Weeks 13-16' }
    ],
    
    // 15. Testing Strategy
    testingStrategy: {
      unitTesting: 'Jest / Node test runner for business utilities and validator functions (Target: >80% coverage)',
      integrationTesting: 'Supertest for API endpoint contract and error handling verification',
      e2eTesting: 'Playwright / Cypress for critical user checkout and submission workflows',
      securityAudit: 'OWASP ZAP scan for injection vulnerabilities and sensitive token leaks'
    },
    
    // 16. Deployment Strategy
    deploymentStrategy: {
      hosting: 'Frontend on Vercel / Cloudflare Pages, Backend on Render / Google Cloud Run',
      containerization: 'Multi-stage Dockerfile for lightweight production container',
      ciCd: 'GitHub Actions workflow triggering automated test suite on each push to main'
    },
    
    // 17. Possible Risks & Mitigation
    possibleRisks: [
      {
        risk: 'External AI API rate-limiting or service disruption',
        mitigation: 'Implement cached responses and local offline fallback rules.'
      },
      {
        risk: 'Scope creep exceeding the academic semester timeline',
        mitigation: 'Freeze MVP feature scope at Week 4 and treat all non-essential items as stretch goals.'
      },
      {
        risk: 'Database migration errors during team collaboration',
        mitigation: 'Enforce version-controlled Prisma / SQL migration scripts in Git.'
      }
    ],
    
    // 18. Future Improvements
    futureImprovements: [
      'Native Mobile Application companion built using React Native or Flutter',
      'Federated learning module for decentralized privacy-preserving model updates',
      'Enterprise SSO integration (SAML / Okta) for commercial institutional deployment'
    ]
  };
}

/**
 * Compares current student skills vs project skills to find gaps,
 * priorities, learning order, and realistic hour estimates
 */
export function analyzeOfflineSkillGap(profile = {}, project = {}) {
  const currentSkills = (profile.skills || []).map(s => s.trim());
  const normalizedCurrent = currentSkills.map(s => s.toLowerCase());
  
  const requiredSkills = (project.requiredSkills || [
    'JavaScript', 'Node.js', 'Express', 'React', 'PostgreSQL', 'Docker', 'REST APIs'
  ]).map(s => s.trim());

  const knownSkills = [];
  const missingSkills = [];

  for (const req of requiredSkills) {
    const reqLower = req.toLowerCase();
    const isKnown = normalizedCurrent.some(cs => 
      cs.includes(reqLower) || reqLower.includes(cs) ||
      (cs === 'js' && reqLower.includes('javascript')) ||
      (cs === 'py' && reqLower.includes('python')) ||
      (cs === 'ts' && reqLower.includes('typescript'))
    );

    if (isKnown) {
      knownSkills.push({
        name: req,
        status: 'Proficient / Known',
        contribution: 'Will accelerate baseline development in core modules'
      });
    } else {
      // Determine priority and effort
      let priority = 'Medium';
      let estimatedHours = 18;
      let reason = `Required for implementing ${req} functionality.`;

      if (reqLower.includes('docker') || reqLower.includes('ci/cd') || reqLower.includes('cloud')) {
        priority = 'High';
        estimatedHours = 12;
        reason = 'Essential for containerizing the application and passing final deployment scrutiny.';
      } else if (reqLower.includes('database') || reqLower.includes('sql') || reqLower.includes('postgres') || reqLower.includes('mongo')) {
        priority = 'Critical';
        estimatedHours = 20;
        reason = 'Fundamental foundation for data integrity, schemas, and persistence.';
      } else if (reqLower.includes('api') || reqLower.includes('backend') || reqLower.includes('fastapi') || reqLower.includes('express')) {
        priority = 'Critical';
        estimatedHours = 24;
        reason = 'Central bridge coordinating frontend requests and business calculations.';
      } else if (reqLower.includes('vector') || reqLower.includes('rag') || reqLower.includes('langchain') || reqLower.includes('ml')) {
        priority = 'High';
        estimatedHours = 28;
        reason = 'Powers the core intelligent features and innovation score of the capstone.';
      } else {
        priority = 'Medium';
        estimatedHours = 15;
      }

      missingSkills.push({
        name: req,
        priority,
        whyNeeded: reason,
        estimatedHours,
        learningOrder: 1, // Will re-order below
        recommendedResource: `Official ${req} Getting Started Documentation & 2-hour crash project`
      });
    }
  }

  // Sort missing skills by priority
  const priorityWeight = { Critical: 1, High: 2, Medium: 3, 'Nice-to-have': 4 };
  missingSkills.sort((a, b) => (priorityWeight[a.priority] || 3) - (priorityWeight[b.priority] || 3));
  missingSkills.forEach((skill, idx) => {
    skill.learningOrder = idx + 1;
  });

  const totalEffortHours = missingSkills.reduce((sum, s) => sum + s.estimatedHours, 0);
  const estimatedWeeks = Math.ceil(totalEffortHours / 12); // Assuming ~12 hours of dedicated student study/week

  return {
    projectName: project.title || 'Project',
    knownSkills,
    missingSkills,
    summary: {
      knownCount: knownSkills.length,
      missingCount: missingSkills.length,
      readinessPercentage: Math.round((knownSkills.length / (knownSkills.length + missingSkills.length || 1)) * 100),
      totalEstimatedLearningHours: totalEffortHours,
      estimatedRampUpWeeks: estimatedWeeks,
      learningVerdict: missingSkills.length <= 2
        ? 'High Skill Synergy: Your team already possesses over 70% of necessary skills. Ramp-up will be minimal.'
        : 'Manageable Learning Curve: Systematic weekend study sessions will prepare your team for full execution within 2-3 weeks.'
    }
  };
}

/**
 * Generates an adaptive 9-phase development roadmap
 */
export function generateOfflineRoadmap(project = {}, profile = {}) {
  const months = profile.availableTimeMonths || 4;
  const teamSize = profile.teamSize || 3;
  const projectTitle = project.title || 'Final Year Project';

  const basePhases = [
    {
      phaseNumber: 1,
      title: 'Requirement Analysis & Architectural Scope',
      weeks: 'Week 1 - Week 2',
      deliverables: [
        'Formal Software Requirement Specification (SRS) document',
        'Entity Relationship (ER) & System Flow Diagrams',
        'Git repository initialization with branch protection & issue board'
      ],
      checkpoints: ['SRS approved by guide', 'Tech stack version alignment confirmed'],
      status: 'pending'
    },
    {
      phaseNumber: 2,
      title: 'UI/UX Wireframing & Design Tokens',
      weeks: 'Week 3 - Week 4',
      deliverables: [
        'Figma / Paper low-fidelity wireframes for all 5 primary views',
        'Accessible color palette & component library setup',
        'Interactive prototype testing with mock inputs'
      ],
      checkpoints: ['User navigation flow validated', 'Zero contrast ratio issues'],
      status: 'pending'
    },
    {
      phaseNumber: 3,
      title: 'Database Schema & Mock Data Seeding',
      weeks: 'Week 5 - Week 6',
      deliverables: [
        'PostgreSQL / SQLite relational schema migration scripts',
        'Seed script generating 50+ realistic test records',
        'Database indexing on primary foreign keys'
      ],
      checkpoints: ['Referential integrity verified', 'Query performance benchmarked'],
      status: 'pending'
    },
    {
      phaseNumber: 4,
      title: 'Core Backend REST APIs & Security Middleware',
      weeks: 'Week 7 - Week 9',
      deliverables: [
        'Authentication & JWT refresh cycle implementation',
        'CRUD endpoints with strict Joi/Zod request validation',
        'Helmet security headers, rate limiting, and safe error handling'
      ],
      checkpoints: ['Postman / Swagger documentation verified', '100% route contract tests passing'],
      status: 'pending'
    },
    {
      phaseNumber: 5,
      title: 'Frontend Component Assembly & State Integration',
      weeks: 'Week 10 - Week 12',
      deliverables: [
        'Dynamic dashboard and data tables with responsive layouts',
        'API client integration with loading skeletons and error toasts',
        'Accessible form inputs with client-side boundary checks'
      ],
      checkpoints: ['End-to-end API integration working', 'Mobile responsiveness verified'],
      status: 'pending'
    },
    {
      phaseNumber: 6,
      title: 'Intelligent AI / ML Module Integration',
      weeks: 'Week 13 - Week 14',
      deliverables: [
        'Gemini API prompt engineering & structured JSON response validation',
        'Offline fallback resilience engine for network drops',
        'Result caching layer avoiding redundant API hits'
      ],
      checkpoints: ['AI responses reliably formatted', 'Offline mode gracefully tested'],
      status: 'pending'
    },
    {
      phaseNumber: 7,
      title: 'Comprehensive Testing & Quality Assurance',
      weeks: 'Week 15',
      deliverables: [
        'Automated unit tests covering validation & calculations (>80% coverage)',
        'Cross-browser compatibility testing (Chrome, Firefox, Safari, Edge)',
        'Accessibility audit meeting WCAG 2.1 AA guidelines'
      ],
      checkpoints: ['Zero unhandled promise rejections', 'Lighthouse score >90 in Performance & A11y'],
      status: 'pending'
    },
    {
      phaseNumber: 8,
      title: 'Production Deployment & CI/CD Pipeline',
      weeks: 'Week 16',
      deliverables: [
        'Production build containerization via Docker',
        'Cloud deployment on Render / Google Cloud / Vercel',
        'Automated GitHub Actions build check on pull requests'
      ],
      checkpoints: ['Live public URL accessible with SSL HTTPS', 'Environment variables secured'],
      status: 'pending'
    },
    {
      phaseNumber: 9,
      title: 'Final Academic Documentation & Viva Preparation',
      weeks: 'Week 17',
      deliverables: [
        'Complete Project Report following university IEEE format guidelines',
        'Slide deck highlighting Problem, Architecture, Demo, and Metrics',
        '3-minute live demonstration script with pre-configured demo cases'
      ],
      checkpoints: ['Plagiarism report under 10%', 'Viva Q&A defense rehearsal completed'],
      status: 'pending'
    }
  ];

  return {
    projectTitle,
    timelineDuration: `${months} Months (${months * 4} Weeks)`,
    teamCapacity: `${teamSize} Developers (${teamSize * 15} man-hours/week)`,
    phases: basePhases,
    criticalMilestones: [
      'Week 4: MVP Feature Freeze',
      'Week 9: Backend API Contract Complete',
      'Week 14: Core End-to-End Workflow Functional',
      'Week 16: Live Deployment & Final Code Freeze'
    ]
  };
}

/**
 * PROJECT REALITY CHECK (Standout feature)
 * Analyzes an existing student project idea for feasibility, scope bloat,
 * technical risks, strengths, weaknesses, and a concrete recommended MVP.
 */
export function performOfflineRealityCheck(projectData) {
  const title = projectData.title || 'Student Project';
  const desc = projectData.description || '';
  const descLower = desc.toLowerCase();
  const titleLower = title.toLowerCase();
  const text = `${titleLower} ${descLower}`;

  // Analyze indicators
  const mentionsAI = text.includes('ai') || text.includes('machine learning') || text.includes('gpt') || text.includes('llm') || text.includes('deep learning');
  const mentionsBlockchain = text.includes('blockchain') || text.includes('crypto') || text.includes('smart contract') || text.includes('web3');
  const mentionsHardware = text.includes('iot') || text.includes('sensor') || text.includes('hardware') || text.includes('robot') || text.includes('drone');
  const mentionsRealtime = text.includes('realtime') || text.includes('real-time') || text.includes('chat') || text.includes('streaming');
  const mentionsBigScope = text.includes('all-in-one') || text.includes('platform for everyone') || text.includes('complete ecosystem') || text.includes('social media');
  const mentionsFinance = text.includes('trading') || text.includes('stock') || text.includes('bank') || text.includes('profit') || text.includes('financial');

  // Calculate scores
  let complexity = 'Medium';
  let scopeRisk = 'Moderate';
  let feasibilityScore = 84;
  let timeFeasibility = 82;
  let innovationScore = 82;

  if (mentionsBlockchain && mentionsAI && mentionsHardware) {
    complexity = 'Extreme';
    scopeRisk = 'Critical';
    feasibilityScore = 48;
    timeFeasibility = 42;
    innovationScore = 95;
  } else if ((mentionsAI && mentionsBlockchain) || (mentionsBigScope && mentionsAI) || (mentionsAI && mentionsFinance)) {
    complexity = 'High';
    scopeRisk = 'High';
    feasibilityScore = 62;
    timeFeasibility = 55;
    innovationScore = 90;
  } else if (mentionsAI || mentionsHardware) {
    complexity = 'Medium';
    scopeRisk = 'Low-Moderate';
    feasibilityScore = 86;
    timeFeasibility = 84;
    innovationScore = 86;
  }

  const strengths = [
    'Clear practical context addressing a specific real-world domain problem rather than a toy exercise.',
    'Provides solid opportunities to demonstrate full-stack engineering depth and API orchestration.',
    'Has high presentation appeal for college project evaluation committees and external viva examiners.'
  ];

  const weaknesses = [];
  const technicalRisks = [];
  const featuresToRemove = [];
  const featuresToAdd = [];

  if (mentionsBigScope) {
    weaknesses.push('Overly broad target audience: attempting to cater to every persona dilutes user experience.');
    featuresToRemove.push('Multi-tenant enterprise admin panel and global social media feeds (too time-consuming).');
    featuresToAdd.push('A single hyper-focused user onboarding flow restricted to one specific role.');
  }

  if (mentionsAI) {
    weaknesses.push('High reliance on external AI inference latency, cost, and rate-limit risks during live viva demos.');
    technicalRisks.push('AI model hallucination or token timeout when evaluated by university examiners without internet.');
    featuresToAdd.push('Offline deterministic fallback mode with pre-cached exemplar responses for offline evaluation.');
  } else {
    featuresToAdd.push('Lightweight intelligent heuristics or data aggregation to boost innovation evaluation marks.');
  }

  if (mentionsBlockchain) {
    weaknesses.push('Blockchain integration introduces heavy gas fee friction, testnet faucet flakiness, and high setup overhead.');
    featuresToRemove.push('Full on-chain decentralized storage; replace with hashed database proofs.');
    technicalRisks.push('Public testnets deprecating or smart contract verification failing on evaluator laptops.');
  }

  if (mentionsHardware) {
    technicalRisks.push('Hardware sensor wiring flakiness, serial port permission failures, and component procurement delays.');
    featuresToAdd.push('Software sensor telemetry simulator allowing the web dashboard to be demonstrated without physical hardware.');
  }

  // Default additions/removals if empty
  if (!featuresToRemove.length) {
    featuresToRemove.push('Complex third-party payment gateway integration (use mock payment confirmation instead).');
    featuresToRemove.push('Native multi-platform mobile apps (focus on responsive PWA first).');
  }

  if (!featuresToAdd.length) {
    featuresToAdd.push('Exportable audit trail and CSV report generation for project viva demonstration.');
    featuresToAdd.push('Automated database seeding script with 50+ realistic records for instant demo readiness.');
  }

  weaknesses.push('Risk of postponing testing and performance optimization until the final 2 weeks of the semester.');
  technicalRisks.push('Database unindexed queries causing UI freeze under live demo data load.');

  const recommendedMvp = `Strip out non-essential tertiary modules. Build a rock-solid, end-to-end 3-screen workflow: (1) Secure Authentication & Data Ingestion, (2) Core Processing & Algorithm Execution, and (3) Analytical Dashboard with Exportable PDF Report. Ensure this core flow works 100% reliably in under 3 minutes of live demo time.`;

  return {
    projectTitle: title,
    feasibilityScore,
    skillCompatibility: 85,
    timeFeasibility,
    technicalComplexity: complexity,
    innovationScore,
    scopeRisk,
    auditSummary: `Overall Feasibility: ${feasibilityScore}/100. This project has substantial merit, but requires active de-scoping to avoid the common trap of an incomplete system at submission time.`,
    strengths,
    weaknesses,
    missingComponents: [
      'Automated rate-limiting and input validation layer on public endpoints',
      'Database backup & idempotent seeding script for reproducible local demos',
      'Telemetry error logging to quickly catch runtime exceptions during presentation'
    ],
    technicalRisks,
    featuresToRemove,
    featuresToAdd,
    recommendedMvp,
    recommendedImprovements: [
      'Define strict API request/response schemas before writing any frontend code.',
      'Implement a reproducible Docker container or script to run the entire project with one command.',
      'Prepare a 180-second backup screencast video demo in case of venue projector or Wi-Fi failures.'
    ]
  };
}

/**
 * PROJECT IMPROVEMENT ENGINE
 * Delivers deep, actionable improvements across 10 distinct dimensions
 */
export function generateOfflineImprovements(projectDetails, focusAreas = []) {
  const title = projectDetails.title || 'Student Project';
  const desc = projectDetails.description || '';

  const allTenDimensions = {
    Functionality: {
      category: '1. Functionality & Core Value',
      rating: 'Good (Room for Expansion)',
      recommendations: [
        'Add bulk batch processing: allow users to upload multi-row CSV/Excel files instead of single record entry.',
        'Implement role-based permissions (SuperAdmin, Contributor, Read-Only Guest) to mimic enterprise applications.',
        'Create a centralized activity audit log tracking who made which changes and when.'
      ]
    },
    Technology: {
      category: '2. Technology Stack Modernization',
      rating: 'Solid Baseline',
      recommendations: [
        'Migrate from plain untyped requests to structured Zod/Joi schema validation on every API endpoint.',
        'Adopt Vite + modern ES Modules to reduce frontend development bundle reload times from seconds to milliseconds.',
        'Replace manual SQL concatenation with an established query builder or ORM (e.g. Prisma / Knex) to guarantee SQL injection safety.'
      ]
    },
    UX: {
      category: '3. User Experience (UX & Design)',
      rating: 'Needs Polish',
      recommendations: [
        'Replace jarring full-screen spinners with subtle skeleton shimmer loaders for superior perceived performance.',
        'Add keyboard shortcuts (e.g. "/" to focus search, "Esc" to close modals, "Ctrl+Enter" to submit forms).',
        'Implement optimistic UI updates with undo toasts for instant tactile user feedback.'
      ]
    },
    Performance: {
      category: '4. Performance & Latency',
      rating: 'Moderate',
      recommendations: [
        'Introduce in-memory caching (Redis or LRU Cache) for repeated analytical queries to drop latency by up to 80%.',
        'Implement virtual scrolling or paginated infinite scroll for tables containing over 100 items.',
        'Enable Gzip / Brotli compression and HTTP cache-control headers on static web assets.'
      ]
    },
    Security: {
      category: '5. Security & Data Protection',
      rating: 'Critical Focus Area',
      recommendations: [
        'Apply Helmet.js security headers with a strict Content Security Policy (CSP) to defeat XSS attacks.',
        'Enforce sliding-window rate limiting on authentication and AI generation endpoints to prevent denial-of-service.',
        'Ensure password hashes use Argon2id or Bcrypt with minimum cost factor 12; never log raw credentials.'
      ]
    },
    'AI/ML': {
      category: '6. AI / ML Intelligence Integration',
      rating: 'High Potential',
      recommendations: [
        'Incorporate Google Gemini API with structured JSON output schema for automated insight extraction.',
        'Build a robust offline fallback engine with domain heuristics so the app remains 100% usable during network outages.',
        'Add caching for LLM responses to conserve API quotas and guarantee sub-50ms repeat responses.'
      ]
    },
    Scalability: {
      category: '7. Scalability & System Design',
      rating: 'Architectural Growth',
      recommendations: [
        'Decouple heavy background workloads (PDF generation, email dispatch) into asynchronous worker queues (BullMQ).',
        'Ensure the backend service is completely stateless by externalizing session state to Redis or signed JWTs.',
        'Structure database indexes specifically targeting WHERE and ORDER BY columns in the most frequent queries.'
      ]
    },
    Testing: {
      category: '8. Testing & Quality Assurance',
      rating: 'High Academic Impact',
      recommendations: [
        'Establish automated unit tests covering core business calculation functions with >80% code coverage.',
        'Add Supertest integration tests verifying all 400 Bad Request boundary cases and authentication failures.',
        'Document test results with visual coverage badges in your project repository README to impress evaluators.'
      ]
    },
    Deployment: {
      category: '9. Deployment & DevOps',
      rating: 'Professional Requirement',
      recommendations: [
        'Create a lightweight multi-stage Dockerfile enabling any team member or examiner to run the app in 1 command.',
        'Set up automated GitHub Actions CI checking lint, unit tests, and build status on every pull request.',
        'Deploy live to a free cloud host (Render, Vercel, or Google Cloud Run) with a custom domain and SSL certificate.'
      ]
    },
    Innovation: {
      category: '10. Innovation & Competitive Edge',
      rating: 'Key Evaluator Differentiator',
      recommendations: [
        'Add visual data storytelling: integrate interactive radar charts or timeline comparisons highlighting project impact.',
        'Provide a "Simulation Sandbox" where evaluators can test edge cases with pre-populated dummy datasets in 1 click.',
        'Publish an OpenAPI 3.0 interactive Swagger documentation page demonstrating production-grade API architecture.'
      ]
    }
  };

  return {
    projectTitle: title,
    dimensions: allTenDimensions,
    topThreeQuickWins: [
      '1. Implement skeleton loaders and optimistic UI toasts (instant visual upgrade in 2 hours).',
      '2. Add a one-click "Load Sample Data" button for effortless 30-second live demonstration.',
      '3. Package the application in a Docker Compose configuration with zero external setup friction.'
    ]
  };
}
