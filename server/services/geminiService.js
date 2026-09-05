import { GoogleGenAI } from '@google/genai';
import { config } from '../config.js';
import * as offlineEngine from './offlineEngine.js';

// In-memory cache for expensive AI generations (efficiency & quota protection)
const responseCache = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getCached(key) {
  const item = responseCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    responseCache.delete(key);
    return null;
  }
  return item.data;
}

function setCached(key, data) {
  responseCache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS
  });
  // Clean up cache size if large
  if (responseCache.size > 200) {
    const oldestKey = responseCache.keys().next().value;
    responseCache.delete(oldestKey);
  }
}

/**
 * Initializes Google GenAI client safely
 */
function getGenAIClient() {
  if (!config.hasGeminiKey()) return null;
  try {
    return new GoogleGenAI({ apiKey: config.geminiApiKey });
  } catch (err) {
    console.error('[GeminiService] Failed to initialize GoogleGenAI client:', err.message);
    return null;
  }
}

/**
 * Executes a structured JSON Gemini request with timeout and fallback
 */
async function callGeminiStructured(systemInstruction, userPrompt, schemaDescription = '') {
  const client = getGenAIClient();
  if (!client) {
    return { success: false, reason: 'NO_API_KEY' };
  }

  // Set up 14-second timeout promise
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Gemini API call timed out')), config.apiTimeoutMs || 14000);
  });

  const generatePromise = async () => {
    const modelsToTry = [config.geminiModel, config.fallbackModel];
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const fullPrompt = `${systemInstruction}\n\n${schemaDescription ? `CRITICAL REQUIREMENT: Output MUST strictly be valid JSON matching this schema:\n${schemaDescription}\n\n` : ''}User Input:\n${userPrompt}\n\nRespond ONLY with a valid JSON object. Do not include markdown code block formatting like \`\`\`json.`;

        const response = await client.models.generateContent({
          model: modelName,
          contents: fullPrompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3
          }
        });

        const rawText = response.text ? response.text.trim() : '';
        if (!rawText) throw new Error('Empty response received from Gemini model');

        // Clean out any accidental markdown backticks
        const cleanedText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
        const parsed = JSON.parse(cleanedText);
        return { success: true, data: parsed, model: modelName };
      } catch (err) {
        lastError = err;
        console.warn(`[GeminiService] Model ${modelName} call failed:`, err.message);
      }
    }
    throw lastError || new Error('All configured Gemini models failed.');
  };

  try {
    return await Promise.race([generatePromise(), timeoutPromise]);
  } catch (err) {
    console.error('[GeminiService] Call failed or timed out:', err.message);
    return { success: false, reason: err.message };
  }
}

/**
 * 1. Generate 3-5 Personalized Project Ideas
 */
export async function generateProjectIdeas(profile) {
  const cacheKey = `ideas:${JSON.stringify(profile)}`;
  const cached = getCached(cacheKey);
  if (cached) return { ...cached, isCached: true };

  const systemInstruction = `You are "ProjectMentor AI", an expert academic project advisor for final-year engineering and computer science university students.
Generate 3 to 4 practical, innovative, and realistically achievable final-year project ideas tailored exactly to the student's background, skills, team size, and timeline.
Ideas must NOT be generic clones (no basic To-Do apps, clone social networks, or cookie-cutter chatbots). Each idea must solve a practical problem, have a distinct value proposition, and fit within academic submission standards.`;

  const userPrompt = `Student Profile:
Branch: ${profile.branch}
Skills: ${profile.skills.join(', ')}
Interests/Domains: ${profile.interests.join(', ')}
Current Skill Level: ${profile.skillLevel}
Team Size: ${profile.teamSize} members
Available Timeline: ${profile.availableTime} (${profile.availableTimeMonths} months)
Preferred Difficulty: ${profile.preferredDifficulty}
Preferred Domain: ${profile.preferredDomain}
Goal: ${profile.projectGoal}`;

  const schemaDescription = `{
  "ideas": [
    {
      "id": "string",
      "title": "string",
      "shortDescription": "string (2-3 sentences)",
      "problemStatement": "string",
      "proposedSolution": "string",
      "whyItMatches": "string (explicitly explaining why this matches their specific skills and timeline)",
      "difficulty": "Easy" | "Medium" | "Hard",
      "estimatedDuration": "string (e.g. 4 months)",
      "requiredSkills": ["string"],
      "recommendedTechnologies": ["string"],
      "innovationScore": number (70-98),
      "feasibilityScore": number (70-98),
      "skillCompatibilityScore": number (60-98),
      "suggestedTeamSize": number,
      "mvpFeatures": ["string", "string", "string"],
      "advancedFeatures": ["string", "string"],
      "learningCurve": "string"
    }
  ]
}`;

  const result = await callGeminiStructured(systemInstruction, userPrompt, schemaDescription);

  if (result.success && result.data && Array.isArray(result.data.ideas) && result.data.ideas.length >= 2) {
    const enrichedIdeas = result.data.ideas.map((idea, idx) => ({
      ...idea,
      id: idea.id || `ai-idea-${Date.now()}-${idx + 1}`
    }));

    const responsePayload = {
      engine: 'gemini-ai',
      model: result.model,
      ideas: enrichedIdeas,
      timestamp: new Date().toISOString()
    };
    setCached(cacheKey, responsePayload);
    return responsePayload;
  }

  // Graceful offline fallback
  console.info('[GeminiService] Using offline fallback for project idea generation.');
  const fallbackIdeas = offlineEngine.generateOfflineIdeas(profile);
  return {
    engine: 'offline-baseline',
    notice: 'AI service is temporarily operating in baseline mode. Ideas generated using our offline project intelligence engine.',
    ideas: fallbackIdeas,
    timestamp: new Date().toISOString()
  };
}

/**
 * 2. Compare Generated Project Ideas & Recommend the Best One
 */
export async function compareIdeas(ideas, profile) {
  const cacheKey = `compare:${ideas.map(i => i.id || i.title).join(':')}`;
  const cached = getCached(cacheKey);
  if (cached) return { ...cached, isCached: true };

  // Run offline comparison logic to guarantee instant, robust metrics calculation
  const offlineResult = offlineEngine.compareOfflineIdeas(ideas, profile);

  if (!config.hasGeminiKey()) {
    return {
      engine: 'offline-baseline',
      ...offlineResult,
      timestamp: new Date().toISOString()
    };
  }

  const systemInstruction = `You are ProjectMentor AI. Review these candidate final-year projects against the student's constraints and provide an authoritative recommendation explaining WHY one specific project is the best choice.`;
  const userPrompt = `Student Profile: ${JSON.stringify(profile)}
Candidate Projects: ${JSON.stringify(ideas.map(i => ({ id: i.id, title: i.title, difficulty: i.difficulty, duration: i.estimatedDuration, skills: i.requiredSkills })))}
Current Recommended Pick: ${offlineResult.recommendedProjectId}`;

  const schemaDescription = `{
  "recommendedProjectId": "string",
  "recommendationRationale": "string (comprehensive explanation covering feasibility, skill synergy, and viva presentation impact)"
}`;

  const result = await callGeminiStructured(systemInstruction, userPrompt, schemaDescription);
  if (result.success && result.data && result.data.recommendationRationale) {
    const payload = {
      engine: 'gemini-ai',
      model: result.model,
      comparisonList: offlineResult.comparisonList,
      recommendedProjectId: result.data.recommendedProjectId || offlineResult.recommendedProjectId,
      recommendationRationale: result.data.recommendationRationale,
      timestamp: new Date().toISOString()
    };
    setCached(cacheKey, payload);
    return payload;
  }

  return {
    engine: 'offline-baseline',
    ...offlineResult,
    timestamp: new Date().toISOString()
  };
}

/**
 * 3. Generate Exhaustive 18-Part Project Blueprint
 */
export async function generateBlueprint(idea, profile = {}) {
  const cacheKey = `blueprint:${idea.title}:${profile.branch || ''}`;
  const cached = getCached(cacheKey);
  if (cached) return { ...cached, isCached: true };

  const offlineBlueprint = offlineEngine.generateOfflineBlueprint(idea, profile);

  if (!config.hasGeminiKey()) {
    return {
      engine: 'offline-baseline',
      blueprint: offlineBlueprint,
      timestamp: new Date().toISOString()
    };
  }

  const systemInstruction = `You are ProjectMentor AI. Generate a comprehensive, 18-part production-grade project blueprint for a final-year engineering capstone. Ensure each section is detailed, practical, and technically sound.`;
  const userPrompt = `Selected Project Idea: ${JSON.stringify(idea)}
Student Context: ${JSON.stringify(profile)}`;

  const schemaDescription = `{
  "projectOverview": "string",
  "problemStatement": "string",
  "targetUsers": ["string"],
  "proposedSolution": "string",
  "coreMvpFeatures": ["string"],
  "advancedFeatures": ["string"],
  "recommendedTechnologyStack": {
    "frontend": "string",
    "backend": "string",
    "database": "string",
    "caching": "string",
    "tooling": "string"
  },
  "frontend": { "framework": "string", "stateManagement": "string", "styling": "string", "keyLibraries": ["string"] },
  "backend": { "runtime": "string", "pattern": "string", "middleware": ["string"] },
  "database": { "engine": "string", "tablesOrCollections": ["string"] },
  "apis": ["string"],
  "aiMlComponents": { "included": boolean, "description": "string", "fallback": "string" },
  "systemArchitecture": { "diagramType": "string", "flowDescription": "string", "asciiDiagram": "string" },
  "developmentPhases": [{ "phase": "string", "title": "string", "duration": "string" }],
  "testingStrategy": { "unitTesting": "string", "integrationTesting": "string", "e2eTesting": "string", "securityAudit": "string" },
  "deploymentStrategy": { "hosting": "string", "containerization": "string", "ciCd": "string" },
  "possibleRisks": [{ "risk": "string", "mitigation": "string" }],
  "futureImprovements": ["string"]
}`;

  const result = await callGeminiStructured(systemInstruction, userPrompt, schemaDescription);
  if (result.success && result.data && result.data.projectOverview && result.data.coreMvpFeatures) {
    const payload = {
      engine: 'gemini-ai',
      model: result.model,
      blueprint: {
        projectId: idea.id || `blueprint-${Date.now()}`,
        projectTitle: idea.title,
        tagline: idea.shortDescription || 'Production-grade engineering project',
        ...result.data
      },
      timestamp: new Date().toISOString()
    };
    setCached(cacheKey, payload);
    return payload;
  }

  return {
    engine: 'offline-baseline',
    notice: 'Generated using ProjectMentor offline blueprint intelligence.',
    blueprint: offlineBlueprint,
    timestamp: new Date().toISOString()
  };
}

/**
 * 4. Analyze Skill Gap (Current vs Required Skills)
 */
export async function analyzeSkillGap(profile, project) {
  // Offline engine performs deterministic skill normalization and effort calculation
  const baseline = offlineEngine.analyzeOfflineSkillGap(profile, project);

  if (!config.hasGeminiKey()) {
    return {
      engine: 'offline-baseline',
      ...baseline,
      timestamp: new Date().toISOString()
    };
  }

  const systemInstruction = `You are ProjectMentor AI. Review this student skill gap analysis and provide tailored advice on the optimal learning sequence and realistic study effort for a final-year project.`;
  const userPrompt = `Student Profile: ${JSON.stringify(profile)}
Project Skills Needed: ${JSON.stringify(project.requiredSkills)}
Computed Gaps: ${JSON.stringify(baseline.missingSkills)}`;

  const schemaDescription = `{
  "learningAdvice": "string",
  "missingSkillsWithTips": [
    { "name": "string", "priority": "Critical" | "High" | "Medium", "whyNeeded": "string", "estimatedHours": number, "learningOrder": number, "fastTrackTip": "string" }
  ]
}`;

  const result = await callGeminiStructured(systemInstruction, userPrompt, schemaDescription);
  if (result.success && result.data && Array.isArray(result.data.missingSkillsWithTips)) {
    return {
      engine: 'gemini-ai',
      model: result.model,
      projectName: baseline.projectName,
      knownSkills: baseline.knownSkills,
      missingSkills: result.data.missingSkillsWithTips.length > 0 ? result.data.missingSkillsWithTips : baseline.missingSkills,
      summary: {
        ...baseline.summary,
        learningVerdict: result.data.learningAdvice || baseline.summary.learningVerdict
      },
      timestamp: new Date().toISOString()
    };
  }

  return {
    engine: 'offline-baseline',
    ...baseline,
    timestamp: new Date().toISOString()
  };
}

/**
 * 5. Generate Adaptive Step-by-Step Development Roadmap
 */
export async function generateRoadmap(project, profile) {
  const baseline = offlineEngine.generateOfflineRoadmap(project, profile);

  if (!config.hasGeminiKey()) {
    return {
      engine: 'offline-baseline',
      ...baseline,
      timestamp: new Date().toISOString()
    };
  }

  const systemInstruction = `You are ProjectMentor AI. Review and customize this 9-phase project development roadmap to be uniquely tailored to this specific project, team size, and timeline.`;
  const userPrompt = `Project: ${JSON.stringify(project)}
Profile: ${JSON.stringify(profile)}`;

  const schemaDescription = `{
  "phases": [
    {
      "phaseNumber": number,
      "title": "string",
      "weeks": "string",
      "deliverables": ["string"],
      "checkpoints": ["string"],
      "status": "pending"
    }
  ],
  "criticalMilestones": ["string"]
}`;

  const result = await callGeminiStructured(systemInstruction, userPrompt, schemaDescription);
  if (result.success && result.data && Array.isArray(result.data.phases) && result.data.phases.length >= 5) {
    return {
      engine: 'gemini-ai',
      model: result.model,
      projectTitle: baseline.projectTitle,
      timelineDuration: baseline.timelineDuration,
      teamCapacity: baseline.teamCapacity,
      phases: result.data.phases,
      criticalMilestones: result.data.criticalMilestones || baseline.criticalMilestones,
      timestamp: new Date().toISOString()
    };
  }

  return {
    engine: 'offline-baseline',
    ...baseline,
    timestamp: new Date().toISOString()
  };
}

/**
 * 6. PROJECT REALITY CHECK (Standout Feature)
 */
export async function performRealityCheck(projectData, profile = {}) {
  const cacheKey = `reality:${projectData.title}:${(projectData.description || '').slice(0, 100)}`;
  const cached = getCached(cacheKey);
  if (cached) return { ...cached, isCached: true };

  const offlineCheck = offlineEngine.performOfflineRealityCheck(projectData);

  if (!config.hasGeminiKey()) {
    return {
      engine: 'offline-baseline',
      notice: 'Analysis generated using our offline project reality engine.',
      ...offlineCheck,
      timestamp: new Date().toISOString()
    };
  }

  const systemInstruction = `You are ProjectMentor AI, a rigorous senior engineering mentor evaluating a student's proposed final-year project idea.
Perform a critical "Reality Check" audit. Be constructive yet brutally honest about scope bloat, technical feasibility, risks, and missing pieces. Provide concrete features to remove and features to add to guarantee a working MVP for final year demonstration.`;

  const userPrompt = `Proposed Project Title: ${projectData.title}
Description: ${projectData.description}
Target Users: ${projectData.targetUsers || 'Not specified'}
Proposed Tech Stack: ${(projectData.proposedStack || []).join(', ') || 'Not specified'}
Team Constraints: ${projectData.teamSize || 3} members, ${projectData.availableMonths || 4} months available
Student Skills: ${(projectData.skills || []).join(', ') || 'Intermediate Computer Science'}`;

  const schemaDescription = `{
  "feasibilityScore": number (1-100),
  "skillCompatibility": number (1-100),
  "timeFeasibility": number (1-100),
  "technicalComplexity": "Low" | "Medium" | "High" | "Extreme",
  "innovationScore": number (1-100),
  "scopeRisk": "Low" | "Moderate" | "High" | "Critical",
  "auditSummary": "string (concise executive verdict)",
  "strengths": ["string", "string", "string"],
  "weaknesses": ["string", "string", "string"],
  "missingComponents": ["string", "string", "string"],
  "technicalRisks": ["string", "string", "string"],
  "featuresToRemove": ["string", "string"],
  "featuresToAdd": ["string", "string"],
  "recommendedMvp": "string (concrete description of bounded MVP)",
  "recommendedImprovements": ["string", "string", "string"]
}`;

  const result = await callGeminiStructured(systemInstruction, userPrompt, schemaDescription);
  if (result.success && result.data && result.data.feasibilityScore) {
    const payload = {
      engine: 'gemini-ai',
      model: result.model,
      projectTitle: projectData.title,
      ...result.data,
      timestamp: new Date().toISOString()
    };
    setCached(cacheKey, payload);
    return payload;
  }

  return {
    engine: 'offline-baseline',
    notice: 'Analysis generated using our offline project reality engine.',
    ...offlineCheck,
    timestamp: new Date().toISOString()
  };
}

/**
 * 7. PROJECT IMPROVEMENT ENGINE (10 Dimensions)
 */
export async function recommendImprovements(projectDetails, focusAreas = []) {
  const cacheKey = `improve:${projectDetails.title}:${(projectDetails.description || '').slice(0, 100)}`;
  const cached = getCached(cacheKey);
  if (cached) return { ...cached, isCached: true };

  const offlineImprovements = offlineEngine.generateOfflineImprovements(projectDetails, focusAreas);

  if (!config.hasGeminiKey()) {
    return {
      engine: 'offline-baseline',
      notice: 'Recommendations generated via offline engineering improvement framework.',
      ...offlineImprovements,
      timestamp: new Date().toISOString()
    };
  }

  const systemInstruction = `You are ProjectMentor AI. A student submitted their existing project asking: "How can I improve this project?"
Provide targeted, concrete improvements across 10 dimensions: Functionality, Technology, UX, Performance, Security, AI/ML, Scalability, Testing, Deployment, and Innovation.`;

  const userPrompt = `Project Title: ${projectDetails.title}
Description: ${projectDetails.description}
Current Tech Stack: ${(projectDetails.currentStack || []).join(', ') || 'Not specified'}
Focus Areas: ${(projectDetails.focusAreas || []).join(', ')}`;

  const schemaDescription = `{
  "dimensions": {
    "Functionality": { "category": "1. Functionality & Core Value", "rating": "string", "recommendations": ["string", "string"] },
    "Technology": { "category": "2. Technology Modernization", "rating": "string", "recommendations": ["string", "string"] },
    "UX": { "category": "3. UX & Design", "rating": "string", "recommendations": ["string", "string"] },
    "Performance": { "category": "4. Performance & Latency", "rating": "string", "recommendations": ["string", "string"] },
    "Security": { "category": "5. Security & Protection", "rating": "string", "recommendations": ["string", "string"] },
    "AI/ML": { "category": "6. AI/ML Integration", "rating": "string", "recommendations": ["string", "string"] },
    "Scalability": { "category": "7. Scalability & System Design", "rating": "string", "recommendations": ["string", "string"] },
    "Testing": { "category": "8. Testing & QA", "rating": "string", "recommendations": ["string", "string"] },
    "Deployment": { "category": "9. Deployment & DevOps", "rating": "string", "recommendations": ["string", "string"] },
    "Innovation": { "category": "10. Innovation & Differentiators", "rating": "string", "recommendations": ["string", "string"] }
  },
  "topThreeQuickWins": ["string", "string", "string"]
}`;

  const result = await callGeminiStructured(systemInstruction, userPrompt, schemaDescription);
  if (result.success && result.data && result.data.dimensions) {
    const payload = {
      engine: 'gemini-ai',
      model: result.model,
      projectTitle: projectDetails.title,
      dimensions: result.data.dimensions,
      topThreeQuickWins: result.data.topThreeQuickWins || offlineImprovements.topThreeQuickWins,
      timestamp: new Date().toISOString()
    };
    setCached(cacheKey, payload);
    return payload;
  }

  return {
    engine: 'offline-baseline',
    notice: 'Recommendations generated via offline engineering improvement framework.',
    ...offlineImprovements,
    timestamp: new Date().toISOString()
  };
}
