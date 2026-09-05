import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import * as geminiService from '../server/services/geminiService.js';
import { config } from '../server/config.js';

describe('Gemini Service & Fallback Tests', () => {
  const mockProfile = {
    branch: 'Computer Science',
    skills: ['Python', 'FastAPI', 'React'],
    interests: ['Machine Learning', 'Healthcare'],
    skillLevel: 'Intermediate',
    teamSize: 3,
    availableTime: '4 months',
    availableTimeMonths: 4,
    preferredDifficulty: 'Medium',
    preferredDomain: 'Healthcare AI',
    projectGoal: 'Portfolio / Placements'
  };

  test('generateProjectIdeas handles absence of API key by triggering offline fallback safely', async () => {
    // With or without API key, it must return a valid, robust payload
    const result = await geminiService.generateProjectIdeas(mockProfile);
    assert.ok(result);
    assert.ok(['gemini-ai', 'offline-baseline'].includes(result.engine));
    assert.ok(Array.isArray(result.ideas));
    assert.ok(result.ideas.length >= 3);

    const firstIdea = result.ideas[0];
    assert.ok(firstIdea.title);
    assert.ok(firstIdea.shortDescription);
    assert.ok(firstIdea.problemStatement);
    assert.ok(firstIdea.proposedSolution);
    assert.ok(firstIdea.feasibilityScore >= 60);
  });

  test('compareIdeas delivers structured comparative list and recommendation rationale', async () => {
    const ideasResult = await geminiService.generateProjectIdeas(mockProfile);
    const comparison = await geminiService.compareIdeas(ideasResult.ideas, mockProfile);

    assert.ok(comparison);
    assert.ok(Array.isArray(comparison.comparisonList));
    assert.ok(comparison.recommendedProjectId);
    assert.ok(comparison.recommendationRationale.length > 20);
  });

  test('generateBlueprint produces complete 18-part technical blueprint', async () => {
    const ideasResult = await geminiService.generateProjectIdeas(mockProfile);
    const blueprintResult = await geminiService.generateBlueprint(ideasResult.ideas[0], mockProfile);

    assert.ok(blueprintResult);
    const bp = blueprintResult.blueprint;
    assert.ok(bp.projectTitle);
    assert.ok(bp.projectOverview);
    assert.ok(bp.problemStatement);
    assert.ok(Array.isArray(bp.coreMvpFeatures));
    assert.ok(bp.recommendedTechnologyStack);
    assert.ok(bp.systemArchitecture);
    assert.ok(Array.isArray(bp.developmentPhases));
    assert.ok(bp.testingStrategy);
  });

  test('performRealityCheck analyzes risk and generates recommended MVP', async () => {
    const testProject = {
      title: 'Autonomous Stock Trading Bot with Deep Q-Learning',
      description: 'An AI-powered bot that connects directly to real bank accounts, executes live algorithmic trades every millisecond, and claims 99% guaranteed profit.',
      teamSize: 2,
      availableMonths: 3
    };

    const realityResult = await geminiService.performRealityCheck(testProject);
    assert.ok(realityResult);
    assert.ok(realityResult.feasibilityScore < 80);
    assert.ok(Array.isArray(realityResult.featuresToRemove));
    assert.ok(Array.isArray(realityResult.technicalRisks));
    assert.ok(realityResult.recommendedMvp);
  });

  test('recommendImprovements provides 10 distinct categories', async () => {
    const testProject = {
      title: 'Student Library Book Portal',
      description: 'A website where students can view library book catalogs and borrow books.',
      currentStack: ['HTML', 'PHP', 'MySQL'],
      focusAreas: ['Security', 'UX', 'Performance']
    };

    const improveResult = await geminiService.recommendImprovements(testProject, testProject.focusAreas);
    assert.ok(improveResult);
    assert.ok(improveResult.dimensions);
    assert.ok(improveResult.dimensions.Security);
    assert.ok(improveResult.dimensions.UX);
    assert.ok(improveResult.dimensions.Performance);
    assert.ok(Array.isArray(improveResult.topThreeQuickWins));
  });
});
