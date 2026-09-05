import express from 'express';
import { config } from '../config.js';
import {
  validateProfileMiddleware,
  validateBlueprintMiddleware,
  validateRealityCheckMiddleware,
  validateImprovementMiddleware,
  validateProfileData
} from '../middleware/validator.js';
import { aiGenerationLimiter } from '../middleware/security.js';
import * as geminiService from '../services/geminiService.js';
import * as offlineEngine from '../services/offlineEngine.js';

const router = express.Router();

/**
 * Health & Engine Status Check
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    engine: config.hasGeminiKey() ? 'gemini-active' : 'offline-baseline-active',
    model: config.hasGeminiKey() ? config.geminiModel : 'offline-domain-engine',
    offlineEngineReady: true,
    environment: config.nodeEnv
  });
});

/**
 * Validate Student Profile
 */
router.post('/profile/validate', (req, res) => {
  const result = validateProfileData(req.body);
  if (!result.isValid) {
    return res.status(400).json({
      success: false,
      error: 'Invalid student profile',
      details: result.errors
    });
  }
  res.json({
    success: true,
    profile: result.sanitized
  });
});

/**
 * 1. Generate Personalized Project Ideas
 */
router.post('/ideas/generate', aiGenerationLimiter, validateProfileMiddleware, async (req, res, next) => {
  try {
    const profile = req.sanitizedProfile;
    const response = await geminiService.generateProjectIdeas(profile);
    res.json({
      success: true,
      profile,
      ...response
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 2. Compare Project Ideas
 */
router.post('/ideas/compare', async (req, res, next) => {
  try {
    const { ideas, profile } = req.body;
    if (!Array.isArray(ideas) || ideas.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'At least 2 project ideas are required for comparison.'
      });
    }

    const validatedProfile = profile ? validateProfileData(profile).sanitized : {};
    const comparison = await geminiService.compareIdeas(ideas, validatedProfile);
    res.json({
      success: true,
      ...comparison
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 3. Generate Project Blueprint (18 Parts)
 */
router.post('/blueprint/generate', aiGenerationLimiter, validateBlueprintMiddleware, async (req, res, next) => {
  try {
    const idea = req.sanitizedIdea;
    const profile = req.sanitizedProfile || {};
    const response = await geminiService.generateBlueprint(idea, profile);
    res.json({
      success: true,
      ...response
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 4. Analyze Skill Gap
 */
router.post('/skills/analyze', async (req, res, next) => {
  try {
    const { profile, project } = req.body;
    const validatedProfile = profile ? validateProfileData(profile).sanitized : { skills: [] };
    const projectData = project || { title: 'Selected Project', requiredSkills: [] };

    const result = await geminiService.analyzeSkillGap(validatedProfile, projectData);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 5. Generate Development Roadmap
 */
router.post('/roadmap/generate', async (req, res, next) => {
  try {
    const { project, profile } = req.body;
    const validatedProfile = profile ? validateProfileData(profile).sanitized : { availableTimeMonths: 4, teamSize: 3 };
    const projectData = project || { title: 'Final Year Project' };

    const result = await geminiService.generateRoadmap(projectData, validatedProfile);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 6. Project Reality Check (Scope & Feasibility Audit)
 */
router.post('/reality-check', aiGenerationLimiter, validateRealityCheckMiddleware, async (req, res, next) => {
  try {
    const projectData = req.sanitizedProject;
    const result = await geminiService.performRealityCheck(projectData);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 7. Project Improvement Engine (10 Dimensions)
 */
router.post('/improve', aiGenerationLimiter, validateImprovementMiddleware, async (req, res, next) => {
  try {
    const improvementData = req.sanitizedImprovement;
    const result = await geminiService.recommendImprovements(improvementData, improvementData.focusAreas);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    next(err);
  }
});

export default router;
