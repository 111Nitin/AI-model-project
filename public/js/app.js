/**
 * ProjectMentor AI - Main Application Controller
 * Handles UI state, navigation, presets, idea rendering, blueprint display,
 * skill gap analysis, roadmaps, reality checks, and 10-dimension improvements.
 */

// Application State Store
const state = {
  activeTab: 'dashboard',
  profile: null,
  ideas: [],
  selectedIdea: null,
  comparison: null,
  blueprint: null,
  skillGap: null,
  roadmap: null,
  completedPhases: new Set(),
  realityCheckResult: null,
  improvementResult: null,
  engineMode: 'detecting'
};

// Preset Profiles for 1-Click Hackathon Demonstrations
const PRESETS = {
  'cse-ai': {
    branch: 'Computer Science & Engineering',
    skills: 'Python, C++, JavaScript, React, SQL',
    interests: 'Artificial Intelligence, Web Systems, Healthcare Tech',
    skillLevel: 'Intermediate',
    teamSize: 3,
    availableTime: '4 months',
    preferredDifficulty: 'Medium',
    preferredDomain: 'AI & Web Systems',
    projectGoal: 'Portfolio / Placements'
  },
  'it-fullstack': {
    branch: 'Information Technology',
    skills: 'JavaScript, TypeScript, Node.js, Express, PostgreSQL, Docker',
    interests: 'Cloud Computing, DevOps, Developer Tools',
    skillLevel: 'Intermediate',
    teamSize: 2,
    availableTime: '3 months',
    preferredDifficulty: 'Medium',
    preferredDomain: 'Full-Stack Cloud & DevOps',
    projectGoal: 'Startup / Commercial MVP'
  },
  'ece-iot': {
    branch: 'Electronics & Communication',
    skills: 'C++, Python, Embedded C, MQTT, Linux',
    interests: 'Internet of Things, Smart Grids, Hardware Telemetry',
    skillLevel: 'Intermediate',
    teamSize: 3,
    availableTime: '4 months',
    preferredDifficulty: 'Medium',
    preferredDomain: 'IoT & Smart Systems',
    projectGoal: 'Academic Honors / Final Grade'
  },
  'cyber-sec': {
    branch: 'Computer Science (Cybersecurity)',
    skills: 'Python, Docker, Linux, Bash, Networking, Cryptography',
    interests: 'Zero Trust Security, API Security, Anomaly Detection',
    skillLevel: 'Advanced',
    teamSize: 1,
    availableTime: '4 months',
    preferredDifficulty: 'Hard',
    preferredDomain: 'Cybersecurity & Privacy',
    projectGoal: 'Portfolio / Placements'
  }
};

// Sample Reality Check Submissions
const REALITY_SAMPLES = {
  overambitious: {
    title: 'Decentralized Quantum AI Social Network for Metaverse & Autonomous Drone Delivery',
    description: 'A global unified ecosystem where 1 billion users interact using real-time VR avatars, smart contract tokens on Ethereum, quantum machine learning recommendation models, and physical autonomous drone food delivery.',
    teamSize: 2,
    availableMonths: 3
  },
  'solid-mvp': {
    title: 'VeriMed: Hospital Discharge Summarizer & Patient Q&A Assistant',
    description: 'A web portal for hospital discharge desks that parses medical discharge summaries, converts medical terminology into plain patient-friendly regional languages, and provides a bounded Q&A tool for post-op dosage clarification.',
    teamSize: 3,
    availableMonths: 4
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFormListeners();
  initPresetButtons();
  initHealthCheck();
  loadSavedState();
});

/**
 * 1. Health & Engine Status Initialization
 */
async function initHealthCheck() {
  const badge = document.getElementById('engine-status-badge');
  const text = document.getElementById('engine-status-text');

  try {
    const health = await window.apiClient.checkHealth();
    if (health.engine === 'gemini-active') {
      badge.className = 'status-badge gemini-active';
      text.textContent = `Gemini AI Active (${health.model})`;
      state.engineMode = 'gemini';
    } else {
      badge.className = 'status-badge offline-active';
      text.textContent = 'Offline Baseline Engine Active';
      state.engineMode = 'offline';
    }
  } catch (err) {
    badge.className = 'status-badge offline-active';
    text.textContent = 'Offline Engine Mode';
    state.engineMode = 'offline';
  }
}

/**
 * 2. Navigation Tab Management
 */
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchTab(target);
    });
  });

  // Hero Quick Start Buttons
  const btnStart = document.getElementById('btn-start-generator');
  if (btnStart) {
    btnStart.addEventListener('click', () => switchTab('ideas'));
  }

  const btnDashReality = document.getElementById('btn-dashboard-reality');
  if (btnDashReality) {
    btnDashReality.addEventListener('click', () => switchTab('reality'));
  }
}

function switchTab(tabId) {
  state.activeTab = tabId;

  // Update tabs UI
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const isActive = tab.getAttribute('data-tab') === tabId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update view visibility
  document.querySelectorAll('.app-view').forEach(view => {
    const isTarget = view.id === `view-${tabId}`;
    view.classList.toggle('active', isTarget);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 3. Form Validation & Submission
 */
function initFormListeners() {
  // Team size slider readout
  const teamSlider = document.getElementById('prof-team-size');
  const teamVal = document.getElementById('team-size-val');
  if (teamSlider && teamVal) {
    teamSlider.addEventListener('input', () => {
      const val = parseInt(teamSlider.value, 10);
      teamVal.textContent = val === 1 ? 'Solo (1 Member)' : `${val} Members`;
    });
  }

  // Suggestion skill chips
  document.querySelectorAll('[data-add-skill]').forEach(btn => {
    btn.addEventListener('click', () => {
      const skillName = btn.getAttribute('data-add-skill');
      const input = document.getElementById('prof-skills');
      const current = input.value.split(',').map(s => s.trim()).filter(Boolean);
      if (!current.includes(skillName)) {
        current.push(skillName);
        input.value = current.join(', ');
      }
    });
  });

  // Profile Form Submit
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileSubmit);
  }

  // Reality Check Form Submit
  const realityForm = document.getElementById('reality-form');
  if (realityForm) {
    realityForm.addEventListener('submit', handleRealitySubmit);
  }

  // Improvement Form Submit
  const improveForm = document.getElementById('improve-form');
  if (improveForm) {
    improveForm.addEventListener('submit', handleImprovementSubmit);
  }

  // Compare Buttons
  const btnCompareTop = document.getElementById('btn-compare-ideas-top');
  const btnCompareBottom = document.getElementById('btn-compare-ideas-bottom');
  if (btnCompareTop) btnCompareTop.addEventListener('click', handleCompareClick);
  if (btnCompareBottom) btnCompareBottom.addEventListener('click', handleCompareClick);

  // Export and Print Buttons
  const btnExport = document.getElementById('btn-export-markdown');
  if (btnExport) btnExport.addEventListener('click', exportBlueprintMarkdown);

  const btnPrint = document.getElementById('btn-print-blueprint');
  if (btnPrint) btnPrint.addEventListener('click', () => window.print());
}

/**
 * Quick-Fill Demo Preset Handler
 */
function initPresetButtons() {
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.getAttribute('data-preset');
      const data = PRESETS[presetKey];
      if (!data) return;

      // Populate form fields
      document.getElementById('prof-branch').value = data.branch;
      document.getElementById('prof-skills').value = data.skills;
      document.getElementById('prof-interests').value = data.interests;
      document.getElementById('prof-level').value = data.skillLevel;
      document.getElementById('prof-team-size').value = data.teamSize;
      document.getElementById('team-size-val').textContent = data.teamSize === 1 ? 'Solo (1 Member)' : `${data.teamSize} Members`;
      document.getElementById('prof-time').value = data.availableTime;
      document.getElementById('prof-difficulty').value = data.preferredDifficulty;
      document.getElementById('prof-goal').value = data.projectGoal;

      // Clear any previous error hints
      clearErrors();
      showToast(`Loaded ${data.branch} Demo Profile`, 'success');

      // Switch to ideas tab if on dashboard
      if (state.activeTab === 'dashboard') {
        switchTab('ideas');
      }
    });
  });

  // Reality Check sample buttons
  document.querySelectorAll('.sample-reality-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleKey = btn.getAttribute('data-sample');
      const sample = REALITY_SAMPLES[sampleKey];
      if (!sample) return;

      document.getElementById('rc-title').value = sample.title;
      document.getElementById('rc-description').value = sample.description;
      document.getElementById('rc-team').value = sample.teamSize;
      document.getElementById('rc-months').value = sample.availableMonths;

      showToast(`Loaded Sample: "${sample.title.slice(0, 30)}..."`, 'success');
    });
  });
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

/**
 * Handle Profile Form Submit -> Generate Ideas
 */
async function handleProfileSubmit(e) {
  e.preventDefault();
  clearErrors();

  const branch = document.getElementById('prof-branch').value.trim();
  const skillsRaw = document.getElementById('prof-skills').value.trim();
  const interestsRaw = document.getElementById('prof-interests').value.trim();
  const skillLevel = document.getElementById('prof-level').value;
  const teamSize = parseInt(document.getElementById('prof-team-size').value, 10);
  const availableTime = document.getElementById('prof-time').value;
  const preferredDifficulty = document.getElementById('prof-difficulty').value;
  const projectGoal = document.getElementById('prof-goal').value;

  // Client Validation
  let hasError = false;
  if (!branch || branch.length < 2) {
    document.getElementById('error-branch').textContent = 'Please enter your academic branch (min 2 characters).';
    hasError = true;
  }
  if (!skillsRaw) {
    document.getElementById('error-skills').textContent = 'Please provide at least one technical skill.';
    hasError = true;
  }
  if (!interestsRaw) {
    document.getElementById('error-interests').textContent = 'Please specify at least one area of interest.';
    hasError = true;
  }

  if (hasError) return;

  const profileData = {
    branch,
    skills: skillsRaw.split(',').map(s => s.trim()).filter(Boolean),
    interests: interestsRaw.split(',').map(s => s.trim()).filter(Boolean),
    skillLevel,
    teamSize,
    availableTime,
    preferredDifficulty,
    projectGoal
  };

  state.profile = profileData;

  // UI Loading States
  const btn = document.getElementById('btn-submit-generate');
  const spinner = document.getElementById('gen-spinner');
  const emptyState = document.getElementById('ideas-empty-state');
  const skeleton = document.getElementById('ideas-loading-skeleton');
  const ideasList = document.getElementById('ideas-list');

  btn.disabled = true;
  spinner.classList.remove('hidden');
  emptyState.classList.add('hidden');
  ideasList.innerHTML = '';
  skeleton.classList.remove('hidden');

  try {
    const result = await window.apiClient.generateIdeas(profileData);
    skeleton.classList.add('hidden');

    if (result.ideas && result.ideas.length > 0) {
      state.ideas = result.ideas;
      renderIdeaCards(result.ideas);
      document.getElementById('btn-compare-ideas-top').classList.remove('hidden');
      document.getElementById('ideas-footer-action').classList.remove('hidden');

      if (result.notice) {
        showToast(result.notice, 'default');
      } else {
        showToast(`Generated ${result.ideas.length} tailored project ideas!`, 'success');
      }
    } else {
      emptyState.classList.remove('hidden');
      showToast('No matching ideas found. Try broadening your skills or interests.', 'error');
    }
  } catch (err) {
    skeleton.classList.add('hidden');
    emptyState.classList.remove('hidden');
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
  }
}

/**
 * Render Project Idea Cards
 */
function renderIdeaCards(ideas) {
  const container = document.getElementById('ideas-list');
  container.innerHTML = '';

  ideas.forEach((idea, index) => {
    const card = document.createElement('article');
    card.className = 'idea-card';
    card.setAttribute('aria-label', `Project Idea: ${idea.title}`);

    const difficultyClass = `badge-difficulty-${(idea.difficulty || 'Medium').toLowerCase()}`;

    card.innerHTML = `
      <div class="idea-card-header">
        <div>
          <h4 class="idea-title">${escapeHtml(idea.title)}</h4>
          <div class="idea-meta-badges">
            <span class="badge ${difficultyClass}">${escapeHtml(idea.difficulty || 'Medium')}</span>
            <span class="badge badge-accent">⏱️ ${escapeHtml(idea.estimatedDuration || '4 months')}</span>
            <span class="badge badge-accent">👥 Team: ${idea.suggestedTeamSize || 3}</span>
          </div>
        </div>
      </div>

      <p class="idea-desc">${escapeHtml(idea.shortDescription)}</p>

      <div class="idea-scores-row">
        <div class="score-cell">
          <div class="score-val">${idea.skillCompatibilityScore || 85}%</div>
          <div class="score-lbl">Skill Match</div>
        </div>
        <div class="score-cell">
          <div class="score-val">${idea.feasibilityScore || 90}%</div>
          <div class="score-lbl">Feasibility</div>
        </div>
        <div class="score-cell">
          <div class="score-val">${idea.innovationScore || 85}%</div>
          <div class="score-lbl">Innovation</div>
        </div>
      </div>

      <div class="idea-tags">
        ${(idea.requiredSkills || []).map(s => `<span class="tag tag-tech">${escapeHtml(s)}</span>`).join('')}
      </div>

      <div class="idea-card-footer">
        <span class="idea-why-match">"${escapeHtml(idea.whyItMatches || 'High alignment with student profile')}"</span>
        <button type="button" class="btn btn-primary btn-sm btn-select-idea" data-idea-index="${index}">
          Select & Blueprint →
        </button>
      </div>
    `;

    // Bind Select CTA
    const selectBtn = card.querySelector('.btn-select-idea');
    selectBtn.addEventListener('click', () => {
      selectIdeaAndGenerateBlueprint(idea);
    });

    container.appendChild(card);
  });
}

/**
 * Handle Compare Ideas Action
 */
async function handleCompareClick() {
  if (!state.ideas || state.ideas.length < 2) {
    showToast('Generate at least 2 ideas first before comparing.', 'error');
    return;
  }

  showToast('Comparing candidate projects...', 'default');
  switchTab('blueprint');

  try {
    const compResult = await window.apiClient.compareIdeas(state.ideas, state.profile);
    state.comparison = compResult;
    renderComparisonTable(compResult);
  } catch (err) {
    showToast(`Comparison error: ${err.message}`, 'error');
  }
}

/**
 * Render Project Comparison Matrix
 */
function renderComparisonTable(comparison) {
  const banner = document.getElementById('recommendation-banner');
  const titleEl = document.getElementById('rec-project-title');
  const rationaleEl = document.getElementById('rec-project-rationale');
  const tbody = document.getElementById('comparison-tbody');

  const recIdea = state.ideas.find(i => i.id === comparison.recommendedProjectId) || state.ideas[0];

  if (recIdea && banner) {
    banner.classList.remove('hidden');
    titleEl.textContent = recIdea.title;
    rationaleEl.textContent = comparison.recommendationRationale || 'Optimal balance of feasibility and skill synergy.';
  }

  tbody.innerHTML = '';
  comparison.comparisonList.forEach(item => {
    const isRecommended = item.id === comparison.recommendedProjectId;
    const tr = document.createElement('tr');
    if (isRecommended) tr.className = 'table-row-recommended';

    tr.innerHTML = `
      <td>
        <strong>${escapeHtml(item.title)}</strong>
        ${isRecommended ? '<span class="badge badge-accent" style="margin-left: 6px;">★ Best Pick</span>' : ''}
      </td>
      <td><span class="badge badge-difficulty-${(item.difficulty || 'Medium').toLowerCase()}">${escapeHtml(item.difficulty)}</span></td>
      <td>${escapeHtml(item.estimatedTime)}</td>
      <td><strong style="color: #38bdf8;">${item.skillCompatibility}%</strong></td>
      <td><strong style="color: #34d399;">${item.feasibility}%</strong></td>
      <td><strong style="color: #a78bfa;">${item.innovation}%</strong></td>
      <td><strong>${item.compositeScore}/100</strong></td>
      <td>
        <button type="button" class="btn btn-sm btn-primary btn-choose-comp" data-project-id="${item.id}">
          Select
        </button>
      </td>
    `;

    tr.querySelector('.btn-choose-comp').addEventListener('click', () => {
      const selected = state.ideas.find(i => i.id === item.id);
      if (selected) selectIdeaAndGenerateBlueprint(selected);
    });

    tbody.appendChild(tr);
  });
}

/**
 * Select an Idea -> Generate Blueprint, Skill Gap, & Roadmap
 */
async function selectIdeaAndGenerateBlueprint(idea) {
  state.selectedIdea = idea;
  showToast(`Generating complete 18-part blueprint for "${idea.title.slice(0, 25)}..."`, 'default');
  switchTab('blueprint');

  const emptyState = document.getElementById('blueprint-empty');
  const contentEl = document.getElementById('blueprint-content');

  emptyState.innerHTML = `
    <div class="skeleton-container" style="max-width: 600px; margin: 30px auto;">
      <div class="skeleton-card">
        <div class="skeleton-line line-title"></div>
        <div class="skeleton-line line-p"></div>
        <div class="skeleton-line line-p"></div>
      </div>
      <p style="color: #94a3b8;">Architecting system blueprint and verifying technical feasibility...</p>
    </div>
  `;
  emptyState.classList.remove('hidden');
  contentEl.classList.add('hidden');

  try {
    // 1. Generate Blueprint
    const bpResult = await window.apiClient.generateBlueprint(idea, state.profile);
    state.blueprint = bpResult.blueprint;
    renderBlueprint(bpResult.blueprint);

    // 2. Concurrently Trigger Skill Gap and Roadmap
    generateSkillGapAndRoadmap(idea);

    emptyState.classList.add('hidden');
    contentEl.classList.remove('hidden');
    showToast('Project Blueprint ready!', 'success');
  } catch (err) {
    emptyState.innerHTML = `<p class="field-error">Blueprint error: ${err.message}</p>`;
    showToast(err.message, 'error');
  }
}

/**
 * Render 18-Part Blueprint
 */
function renderBlueprint(bp) {
  const contentEl = document.getElementById('blueprint-content');
  if (!contentEl) return;

  contentEl.innerHTML = `
    <!-- Top Summary Block -->
    <div class="hero-card" style="margin-bottom: 24px; padding: 28px;">
      <div>
        <span class="badge-rec">Active Capstone Project</span>
        <h3 class="hero-title" style="font-size: 1.6rem; margin-top: 6px;">${escapeHtml(bp.projectTitle)}</h3>
        <p class="hero-desc" style="font-size: 0.95rem; margin-bottom: 12px;">${escapeHtml(bp.projectOverview)}</p>
        <p style="font-size: 0.85rem; color: #94a3b8;"><strong>Problem Statement:</strong> ${escapeHtml(bp.problemStatement)}</p>
      </div>
    </div>

    <!-- 18-Part Grid -->
    <div class="blueprint-grid">
      <!-- Proposed Solution & Target Users -->
      <div class="blueprint-block">
        <h4>Target Users & Proposed Solution</h4>
        <p style="font-size: 0.88rem; color: #cbd5e1; margin-bottom: 10px;">${escapeHtml(bp.proposedSolution)}</p>
        <ul class="feature-list">
          ${(bp.targetUsers || []).map(u => `<li>${escapeHtml(u)}</li>`).join('')}
        </ul>
      </div>

      <!-- Core / MVP Features -->
      <div class="blueprint-block">
        <h4>Core MVP Features (Deliver First)</h4>
        <ul class="feature-list">
          ${(bp.coreMvpFeatures || []).map(f => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>

      <!-- Advanced / Stretch Features -->
      <div class="blueprint-block">
        <h4>Advanced Stretch Features</h4>
        <ul class="feature-list">
          ${(bp.advancedFeatures || []).map(f => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>

      <!-- Technology Stack Specification -->
      <div class="blueprint-block">
        <h4>Recommended Tech Stack</h4>
        <p style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Frontend:</strong> ${escapeHtml(bp.recommendedTechnologyStack.frontend || 'React')}</p>
        <p style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Backend:</strong> ${escapeHtml(bp.recommendedTechnologyStack.backend || 'Node.js / Express')}</p>
        <p style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Database:</strong> ${escapeHtml(bp.recommendedTechnologyStack.database || 'PostgreSQL')}</p>
        <p style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Caching / State:</strong> ${escapeHtml(bp.recommendedTechnologyStack.caching || 'Redis / LocalStorage')}</p>
        <p style="font-size: 0.85rem;"><strong>Tooling:</strong> ${escapeHtml(bp.recommendedTechnologyStack.tooling || 'Docker, Git, CI/CD')}</p>
      </div>

      <!-- Database Schema & Persistence -->
      <div class="blueprint-block">
        <h4>Database Schema & Tables</h4>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 8px;">Engine: ${escapeHtml(bp.database.engine || 'Relational')}</p>
        <ul class="feature-list">
          ${(bp.database.tablesOrCollections || []).map(t => `<li><code>${escapeHtml(t)}</code></li>`).join('')}
        </ul>
      </div>

      <!-- APIs & External Services -->
      <div class="blueprint-block">
        <h4>External APIs & Third-Party Services</h4>
        <ul class="feature-list">
          ${(bp.apis || []).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
        </ul>
      </div>

      <!-- AI / ML Intelligence Components -->
      <div class="blueprint-block">
        <h4>AI / ML Intelligence Layer</h4>
        <p style="font-size: 0.86rem; color: #cbd5e1; margin-bottom: 8px;">${escapeHtml(bp.aiMlComponents.description || 'Intelligent reasoning layer')}</p>
        <p style="font-size: 0.78rem; color: #34d399;"><strong>Resilience:</strong> ${escapeHtml(bp.aiMlComponents.fallback || 'Offline baseline mode')}</p>
      </div>

      <!-- Testing & Quality Assurance -->
      <div class="blueprint-block">
        <h4>Testing & Quality Strategy</h4>
        <p style="font-size: 0.85rem; margin-bottom: 4px;"><strong>Unit Testing:</strong> ${escapeHtml(bp.testingStrategy.unitTesting || 'Jest / Node test runner')}</p>
        <p style="font-size: 0.85rem; margin-bottom: 4px;"><strong>Integration:</strong> ${escapeHtml(bp.testingStrategy.integrationTesting || 'Supertest')}</p>
        <p style="font-size: 0.85rem;"><strong>Security Audit:</strong> ${escapeHtml(bp.testingStrategy.securityAudit || 'OWASP ZAP scan')}</p>
      </div>

      <!-- Deployment & DevOps -->
      <div class="blueprint-block">
        <h4>Deployment & DevOps</h4>
        <p style="font-size: 0.85rem; margin-bottom: 4px;"><strong>Hosting:</strong> ${escapeHtml(bp.deploymentStrategy.hosting || 'Cloud Run / Vercel')}</p>
        <p style="font-size: 0.85rem; margin-bottom: 4px;"><strong>Containers:</strong> ${escapeHtml(bp.deploymentStrategy.containerization || 'Docker')}</p>
        <p style="font-size: 0.85rem;"><strong>CI/CD:</strong> ${escapeHtml(bp.deploymentStrategy.ciCd || 'GitHub Actions')}</p>
      </div>

      <!-- Risk Mitigations -->
      <div class="blueprint-block">
        <h4>Possible Risks & Mitigations</h4>
        <ul class="risk-list">
          ${(bp.possibleRisks || []).map(r => `
            <li style="font-size: 0.82rem; margin-bottom: 6px;">
              <strong style="color: #f87171;">⚠️ ${escapeHtml(r.risk)}:</strong>
              <span style="color: #cbd5e1;">${escapeHtml(r.mitigation)}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Future Improvements -->
      <div class="blueprint-block">
        <h4>Future Scope & Enhancements</h4>
        <ul class="feature-list">
          ${(bp.futureImprovements || []).map(fi => `<li>${escapeHtml(fi)}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- System Architecture Diagram (Full Width) -->
    <div class="panel-card" style="margin-top: 20px;">
      <h4 style="font-size: 1.1rem; color: #38bdf8; margin-bottom: 10px;">System Architecture & Flow Diagram</h4>
      <p style="font-size: 0.88rem; color: #cbd5e1;">${escapeHtml(bp.systemArchitecture.flowDescription || '')}</p>
      <pre class="ascii-architecture" aria-label="ASCII Architecture Diagram">${escapeHtml(bp.systemArchitecture.asciiDiagram || '')}</pre>
    </div>
  `;
}

/**
 * Concurrently generate and render Skill Gap & Roadmap
 */
async function generateSkillGapAndRoadmap(idea) {
  try {
    const [gapRes, roadRes] = await Promise.all([
      window.apiClient.analyzeSkills(state.profile, idea),
      window.apiClient.generateRoadmap(idea, state.profile)
    ]);

    state.skillGap = gapRes;
    state.roadmap = roadRes;

    renderSkillGap(gapRes);
    renderRoadmap(roadRes);
  } catch (err) {
    console.error('Skill gap/roadmap load failed:', err);
  }
}

/**
 * Render Skill Gap Breakdown
 */
function renderSkillGap(data) {
  document.getElementById('readiness-percent').textContent = `${data.summary.readinessPercentage}%`;
  document.getElementById('readiness-heading').textContent = data.summary.readinessPercentage >= 70
    ? 'High Skill Synergy'
    : 'Manageable Learning Ramp-Up';
  document.getElementById('readiness-desc').textContent = `${data.summary.learningVerdict} (~${data.summary.totalEstimatedLearningHours} total study hours required across team).`;

  // Known Skills
  const knownContainer = document.getElementById('known-skills-tags');
  if (data.knownSkills && data.knownSkills.length > 0) {
    knownContainer.innerHTML = data.knownSkills.map(s => `
      <span class="tag" style="background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3);">
        ✓ ${escapeHtml(s.name)}
      </span>
    `).join('');
  } else {
    knownContainer.innerHTML = '<span class="tag tag-muted">No direct matches found in current profile</span>';
  }

  // Missing Skills
  const missingContainer = document.getElementById('missing-skills-list');
  if (data.missingSkills && data.missingSkills.length > 0) {
    missingContainer.innerHTML = data.missingSkills.map(s => {
      const pColor = s.priority === 'Critical' ? '#f87171' : (s.priority === 'High' ? '#fbbf24' : '#38bdf8');
      return `
        <div class="missing-skill-item">
          <div class="missing-skill-left">
            <div class="order-badge">${s.learningOrder}</div>
            <div>
              <strong style="font-size: 0.88rem;">${escapeHtml(s.name)}</strong>
              <div style="font-size: 0.78rem; color: #94a3b8;">${escapeHtml(s.whyNeeded)}</div>
            </div>
          </div>
          <div style="text-align: right; flex-shrink: 0;">
            <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: ${pColor}; border: 1px solid ${pColor};">
              ${escapeHtml(s.priority)}
            </span>
            <div style="font-size: 0.74rem; color: #64748b; margin-top: 4px;">~${s.estimatedHours} hrs study</div>
          </div>
        </div>
      `;
    }).join('');
  } else {
    missingContainer.innerHTML = '<div class="empty-notice">Your team already possesses all baseline skills required!</div>';
  }
}

/**
 * Render 9-Phase Development Roadmap
 */
function renderRoadmap(data) {
  const timelineEl = document.getElementById('roadmap-timeline');
  const durTag = document.getElementById('roadmap-duration-tag');
  const teamTag = document.getElementById('roadmap-team-tag');

  if (durTag) durTag.textContent = `Timeline: ${data.timelineDuration}`;
  if (teamTag) teamTag.textContent = `Team: ${data.teamCapacity}`;

  timelineEl.innerHTML = '';

  data.phases.forEach(phase => {
    const isChecked = state.completedPhases.has(phase.phaseNumber);
    const card = document.createElement('div');
    card.className = `roadmap-phase-card ${isChecked ? 'completed' : ''}`;
    card.id = `phase-card-${phase.phaseNumber}`;

    card.innerHTML = `
      <div class="phase-header">
        <div class="phase-title-group">
          <input type="checkbox" id="check-phase-${phase.phaseNumber}" class="phase-checkbox" ${isChecked ? 'checked' : ''} aria-label="Mark ${phase.title} completed">
          <label for="check-phase-${phase.phaseNumber}" class="phase-title">
            Phase ${phase.phaseNumber}: ${escapeHtml(phase.title)}
          </label>
        </div>
        <span class="phase-weeks badge-accent">${escapeHtml(phase.weeks)}</span>
      </div>

      <ul class="phase-deliverables">
        ${(phase.deliverables || []).map(d => `<li>• ${escapeHtml(d)}</li>`).join('')}
      </ul>
    `;

    const checkbox = card.querySelector('.phase-checkbox');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        state.completedPhases.add(phase.phaseNumber);
        card.classList.add('completed');
      } else {
        state.completedPhases.delete(phase.phaseNumber);
        card.classList.remove('completed');
      }
      updateRoadmapProgress(data.phases.length);
    });

    timelineEl.appendChild(card);
  });

  updateRoadmapProgress(data.phases.length);
}

function updateRoadmapProgress(total) {
  const textEl = document.getElementById('roadmap-completed-text');
  if (textEl) {
    textEl.textContent = `${state.completedPhases.size}/${total} Phases Complete`;
  }
}

/**
 * Handle Reality Check Submit (Standout Feature)
 */
async function handleRealitySubmit(e) {
  e.preventDefault();
  const errorTitle = document.getElementById('error-rc-title');
  const errorDesc = document.getElementById('error-rc-desc');
  errorTitle.textContent = '';
  errorDesc.textContent = '';

  const title = document.getElementById('rc-title').value.trim();
  const description = document.getElementById('rc-description').value.trim();
  const teamSize = parseInt(document.getElementById('rc-team').value, 10) || 3;
  const availableMonths = parseInt(document.getElementById('rc-months').value, 10) || 4;

  let hasErr = false;
  if (!title || title.length < 3) {
    errorTitle.textContent = 'Please enter a project title (min 3 characters).';
    hasErr = true;
  }
  if (!description || description.length < 15) {
    errorDesc.textContent = 'Please provide a detailed project scope description (min 15 characters).';
    hasErr = true;
  }
  if (hasErr) return;

  const payload = {
    title,
    description,
    teamSize,
    availableMonths,
    skills: state.profile ? state.profile.skills : []
  };

  const btn = document.getElementById('btn-submit-reality');
  const spinner = document.getElementById('rc-spinner');
  const empty = document.getElementById('reality-empty');
  const loading = document.getElementById('reality-loading');
  const output = document.getElementById('reality-output');

  btn.disabled = true;
  spinner.classList.remove('hidden');
  empty.classList.add('hidden');
  output.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const result = await window.apiClient.performRealityCheck(payload);
    state.realityCheckResult = result;
    loading.classList.add('hidden');
    output.classList.remove('hidden');
    renderRealityCheck(result);
    showToast('Project Reality Audit complete!', 'success');
  } catch (err) {
    loading.classList.add('hidden');
    empty.classList.remove('hidden');
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
  }
}

/**
 * Render Project Reality Check Output
 */
function renderRealityCheck(data) {
  const output = document.getElementById('reality-output');
  if (!output) return;

  const complexityColor = data.technicalComplexity === 'Low' ? '#34d399' : (data.technicalComplexity === 'Medium' ? '#fbbf24' : '#f87171');
  const scopeRiskColor = data.scopeRisk === 'Low' || data.scopeRisk === 'Low-Moderate' ? '#34d399' : '#f87171';

  output.innerHTML = `
    <!-- Executive Verdict -->
    <div class="audit-verdict-banner">
      <strong>Senior Mentor Audit Summary:</strong>
      <p style="margin-top: 4px;">${escapeHtml(data.auditSummary || '')}</p>
    </div>

    <!-- Scores Grid -->
    <div class="reality-metrics-grid">
      <div class="reality-metric-box">
        <div class="metric-value" style="color: #38bdf8;">${data.feasibilityScore}/100</div>
        <div class="metric-label">Feasibility</div>
      </div>
      <div class="reality-metric-box">
        <div class="metric-value" style="color: #a78bfa;">${data.innovationScore}/100</div>
        <div class="metric-label">Innovation</div>
      </div>
      <div class="reality-metric-box">
        <div class="metric-value" style="color: ${complexityColor};">${escapeHtml(data.technicalComplexity)}</div>
        <div class="metric-label">Complexity</div>
      </div>
      <div class="reality-metric-box">
        <div class="metric-value" style="color: ${scopeRiskColor};">${escapeHtml(data.scopeRisk)}</div>
        <div class="metric-label">Scope Risk</div>
      </div>
    </div>

    <!-- Features to Cut vs Features to Add -->
    <div class="reality-details-grid">
      <div class="reality-col-card" style="border-color: rgba(244, 63, 94, 0.3);">
        <h4 style="color: #f87171;">✂️ Scope Bloat to Remove (De-Risking)</h4>
        <div>
          ${(data.featuresToRemove || []).map(f => `<div class="cut-item">${escapeHtml(f)}</div>`).join('')}
        </div>
      </div>

      <div class="reality-col-card" style="border-color: rgba(16, 185, 129, 0.3);">
        <h4 style="color: #34d399;">➕ Missing Essentials to Add</h4>
        <div>
          ${(data.featuresToAdd || []).map(f => `<div class="add-item">${escapeHtml(f)}</div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Strengths & Technical Risks -->
    <div class="reality-details-grid">
      <div class="reality-col-card">
        <h4>Key Project Strengths</h4>
        <ul class="feature-list">
          ${(data.strengths || []).map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
      </div>

      <div class="reality-col-card">
        <h4>Major Technical Roadblocks</h4>
        <ul class="risk-list">
          ${(data.technicalRisks || []).map(r => `<li style="font-size: 0.82rem; color: #fca5a5;">⚠️ ${escapeHtml(r)}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Recommended MVP Specification -->
    <div class="recommended-mvp-box">
      <h4>🎯 Recommended Boundable MVP Scope</h4>
      <p>${escapeHtml(data.recommendedMvp || '')}</p>
    </div>
  `;
}

/**
 * Handle 10-Dimension Improvement Submit
 */
async function handleImprovementSubmit(e) {
  e.preventDefault();
  const errorDesc = document.getElementById('error-imp-desc');
  errorDesc.textContent = '';

  const title = document.getElementById('imp-title').value.trim();
  const description = document.getElementById('imp-desc').value.trim();
  const currentStackRaw = document.getElementById('imp-stack').value.trim();

  if (!description || description.length < 15) {
    errorDesc.textContent = 'Please describe your current project and architecture in detail (min 15 characters).';
    return;
  }

  const payload = {
    title: title || 'Final Year Project',
    description,
    currentStack: currentStackRaw ? currentStackRaw.split(',').map(s => s.trim()).filter(Boolean) : []
  };

  const btn = document.getElementById('btn-submit-improve');
  const spinner = document.getElementById('imp-spinner');
  const empty = document.getElementById('improve-empty');
  const loading = document.getElementById('improve-loading');
  const output = document.getElementById('improve-output');

  btn.disabled = true;
  spinner.classList.remove('hidden');
  empty.classList.add('hidden');
  output.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const result = await window.apiClient.recommendImprovements(payload);
    state.improvementResult = result;
    loading.classList.add('hidden');
    output.classList.remove('hidden');
    renderImprovements(result);
    showToast('10-Dimension Improvements generated!', 'success');
  } catch (err) {
    loading.classList.add('hidden');
    empty.classList.remove('hidden');
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
  }
}

/**
 * Render 10-Dimension Project Improvements
 */
function renderImprovements(data) {
  const output = document.getElementById('improve-output');
  if (!output) return;

  output.innerHTML = `
    <!-- Top 3 Quick Wins -->
    <div class="quick-wins-banner">
      <h4>⚡ Top 3 High-Impact Quick Wins</h4>
      <ul class="feature-list">
        ${(data.topThreeQuickWins || []).map(qw => `<li><strong>${escapeHtml(qw)}</strong></li>`).join('')}
      </ul>
    </div>

    <!-- 10 Dimensions Grid -->
    <div class="dimensions-grid">
      ${Object.entries(data.dimensions || {}).map(([key, dim]) => `
        <div class="dimension-card">
          <h4>${escapeHtml(dim.category || key)}</h4>
          <div style="font-size: 0.76rem; color: #38bdf8; margin-bottom: 8px;">Rating: ${escapeHtml(dim.rating || 'Recommended')}</div>
          <ul>
            ${(dim.recommendations || []).map(r => `<li>${escapeHtml(r)}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Export Blueprint as Markdown (.md)
 */
function exportBlueprintMarkdown() {
  if (!state.blueprint) {
    showToast('Generate or select a blueprint first before exporting.', 'error');
    return;
  }

  const bp = state.blueprint;
  let md = `# Project Blueprint: ${bp.projectTitle}\n\n`;
  md += `*Generated via ProjectMentor AI*\n\n`;
  md += `## 1. Project Overview\n${bp.projectOverview}\n\n`;
  md += `## 2. Problem Statement\n${bp.problemStatement}\n\n`;
  md += `## 3. Target Users\n${(bp.targetUsers || []).map(u => `- ${u}`).join('\n')}\n\n`;
  md += `## 4. Proposed Solution\n${bp.proposedSolution}\n\n`;
  md += `## 5. Core MVP Features\n${(bp.coreMvpFeatures || []).map(f => `- ${f}`).join('\n')}\n\n`;
  md += `## 6. Advanced Features\n${(bp.advancedFeatures || []).map(f => `- ${f}`).join('\n')}\n\n`;
  md += `## 7. Recommended Technology Stack\n`;
  md += `- Frontend: ${bp.recommendedTechnologyStack?.frontend}\n`;
  md += `- Backend: ${bp.recommendedTechnologyStack?.backend}\n`;
  md += `- Database: ${bp.recommendedTechnologyStack?.database}\n`;
  md += `- Caching: ${bp.recommendedTechnologyStack?.caching}\n`;
  md += `- Tooling: ${bp.recommendedTechnologyStack?.tooling}\n\n`;
  md += `## 8. System Architecture\n${bp.systemArchitecture?.flowDescription}\n\n\`\`\`\n${bp.systemArchitecture?.asciiDiagram}\n\`\`\`\n\n`;
  md += `## 9. Development Phases\n${(bp.developmentPhases || []).map(p => `- ${p.phase} (${p.duration}): ${p.title}`).join('\n')}\n\n`;
  md += `## 10. Testing Strategy\n- Unit: ${bp.testingStrategy?.unitTesting}\n- Integration: ${bp.testingStrategy?.integrationTesting}\n- Security: ${bp.testingStrategy?.securityAudit}\n\n`;
  md += `## 11. Deployment Strategy\n- Hosting: ${bp.deploymentStrategy?.hosting}\n- Docker: ${bp.deploymentStrategy?.containerization}\n- CI/CD: ${bp.deploymentStrategy?.ciCd}\n\n`;
  md += `## 12. Potential Risks & Mitigation\n${(bp.possibleRisks || []).map(r => `- **${r.risk}**: ${r.mitigation}`).join('\n')}\n\n`;
  md += `## 13. Future Improvements\n${(bp.futureImprovements || []).map(fi => `- ${fi}`).join('\n')}\n`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${bp.projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-blueprint.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Downloaded Project Blueprint Markdown file!', 'success');
}

/**
 * Toast Notifications
 */
function showToast(message, type = 'default') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : (type === 'error' ? 'toast-error' : '')}`;
  toast.setAttribute('role', 'alert');
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Utility: HTML Escape
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * LocalStorage caching for student session continuity
 */
function loadSavedState() {
  try {
    const saved = localStorage.getItem('projectmentor_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.profile) {
        // Pre-fill fields
        document.getElementById('prof-branch').value = parsed.profile.branch || '';
        document.getElementById('prof-skills').value = (parsed.profile.skills || []).join(', ');
        document.getElementById('prof-interests').value = (parsed.profile.interests || []).join(', ');
      }
    }
  } catch (err) {
    // Ignore storage issues
  }
}
