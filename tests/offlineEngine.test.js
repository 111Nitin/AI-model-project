import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateOfflineIdeas,
  compareOfflineIdeas,
  generateOfflineBlueprint,
  analyzeOfflineSkillGap,
  generateOfflineRoadmap,
  performOfflineRealityCheck,
  generateOfflineImprovements,
  calculateSkillCompatibility
} from '../server/services/offlineEngine.js';

describe('Offline Baseline Intelligence Engine Tests', () => {
  const mockProfile = {
    branch: 'Computer Science & Engineering',
    skills: ['Python', 'JavaScript', 'C++', 'SQL'],
    interests: ['AI', 'Web Development'],
    skillLevel: 'Intermediate',
    teamSize: 3,
    availableTimeMonths: 4,
    preferredDifficulty: 'Medium',
    preferredDomain: 'AI',
    projectGoal: 'Portfolio / Placements'
  };

  test('generateOfflineIdeas returns 3 to 4 complete project ideas', () => {
    const ideas = generateOfflineIdeas(mockProfile);
    assert.ok(Array.isArray(ideas));
    assert.ok(ideas.length >= 3 && ideas.length <= 4);

    for (const idea of ideas) {
      assert.ok(idea.id, 'Idea must have unique id');
      assert.ok(idea.title && idea.title.length > 5, 'Idea must have substantive title');
      assert.ok(idea.shortDescription, 'Idea must have short description');
      assert.ok(idea.problemStatement, 'Idea must have problem statement');
      assert.ok(idea.proposedSolution, 'Idea must have proposed solution');
      assert.ok(idea.whyItMatches, 'Idea must explain why it matches student');
      assert.ok(idea.difficulty, 'Idea must specify difficulty');
      assert.ok(idea.estimatedDuration, 'Idea must have estimated duration');
      assert.ok(Array.isArray(idea.requiredSkills) && idea.requiredSkills.length > 0);
      assert.ok(Array.isArray(idea.recommendedTechnologies) && idea.recommendedTechnologies.length > 0);
      assert.ok(idea.innovationScore >= 70 && idea.innovationScore <= 100);
      assert.ok(idea.feasibilityScore >= 60 && idea.feasibilityScore <= 100);
      assert.ok(idea.skillCompatibilityScore >= 50 && idea.skillCompatibilityScore <= 100);
      assert.ok(Array.isArray(idea.mvpFeatures) && idea.mvpFeatures.length >= 2);
      assert.ok(Array.isArray(idea.advancedFeatures) && idea.advancedFeatures.length >= 1);
    }
  });

  test('compareOfflineIdeas compares candidates and designates recommended project', () => {
    const ideas = generateOfflineIdeas(mockProfile);
    const comparison = compareOfflineIdeas(ideas, mockProfile);

    assert.ok(Array.isArray(comparison.comparisonList));
    assert.equal(comparison.comparisonList.length, ideas.length);
    assert.ok(comparison.recommendedProjectId, 'Must identify a recommended project ID');
    assert.ok(comparison.recommendationRationale.length > 20, 'Must have detailed recommendation rationale');

    const recommended = comparison.comparisonList.find(c => c.id === comparison.recommendedProjectId);
    assert.ok(recommended, 'Recommended ID must exist in comparison list');
  });

  test('generateOfflineBlueprint produces complete 18-part blueprint', () => {
    const ideas = generateOfflineIdeas(mockProfile);
    const blueprint = generateOfflineBlueprint(ideas[0], mockProfile);

    // Verify 18 required parts
    assert.ok(blueprint.projectOverview, '1. projectOverview required');
    assert.ok(blueprint.problemStatement, '2. problemStatement required');
    assert.ok(Array.isArray(blueprint.targetUsers), '3. targetUsers required');
    assert.ok(blueprint.proposedSolution, '4. proposedSolution required');
    assert.ok(Array.isArray(blueprint.coreMvpFeatures), '5. coreMvpFeatures required');
    assert.ok(Array.isArray(blueprint.advancedFeatures), '6. advancedFeatures required');
    assert.ok(blueprint.recommendedTechnologyStack.frontend, '7. recommendedTechnologyStack required');
    assert.ok(blueprint.frontend.framework, '8. frontend details required');
    assert.ok(blueprint.backend.runtime, '9. backend details required');
    assert.ok(blueprint.database.engine, '10. database details required');
    assert.ok(Array.isArray(blueprint.apis), '11. apis required');
    assert.ok(blueprint.aiMlComponents, '12. aiMlComponents required');
    assert.ok(blueprint.systemArchitecture.asciiDiagram, '13. systemArchitecture required');
    assert.ok(Array.isArray(blueprint.developmentPhases), '14. developmentPhases required');
    assert.ok(blueprint.testingStrategy.unitTesting, '15. testingStrategy required');
    assert.ok(blueprint.deploymentStrategy.hosting, '16. deploymentStrategy required');
    assert.ok(Array.isArray(blueprint.possibleRisks), '17. possibleRisks required');
    assert.ok(Array.isArray(blueprint.futureImprovements), '18. futureImprovements required');
  });

  test('analyzeOfflineSkillGap correctly identifies known vs missing skills with priority and effort', () => {
    const project = {
      title: 'AI Clinical Platform',
      requiredSkills: ['Python', 'FastAPI', 'React', 'Docker', 'PostgreSQL', 'LangChain']
    };

    const analysis = analyzeOfflineSkillGap(mockProfile, project);
    assert.ok(Array.isArray(analysis.knownSkills));
    assert.ok(Array.isArray(analysis.missingSkills));
    assert.ok(analysis.knownSkills.some(s => s.name.toLowerCase().includes('python')));

    for (const missing of analysis.missingSkills) {
      assert.ok(missing.name);
      assert.ok(['Critical', 'High', 'Medium', 'Nice-to-have'].includes(missing.priority));
      assert.ok(missing.whyNeeded.length > 5);
      assert.ok(missing.estimatedHours > 0);
      assert.ok(missing.learningOrder >= 1);
    }

    assert.ok(analysis.summary.totalEstimatedLearningHours > 0);
    assert.ok(analysis.summary.readinessPercentage >= 0 && analysis.summary.readinessPercentage <= 100);
  });

  test('generateOfflineRoadmap creates 9-phase progressive timeline', () => {
    const roadmap = generateOfflineRoadmap({ title: 'AgriSense' }, mockProfile);
    assert.ok(Array.isArray(roadmap.phases));
    assert.equal(roadmap.phases.length, 9, 'Must generate exactly 9 developmental phases');
    assert.ok(Array.isArray(roadmap.criticalMilestones));
    assert.ok(roadmap.phases[0].title.includes('Requirement'));
    assert.ok(roadmap.phases[8].title.includes('Documentation') || roadmap.phases[8].title.includes('Viva'));
  });

  test('performOfflineRealityCheck flags risks, scope bloat, and provides MVP', () => {
    const ambitiousProject = {
      title: 'Decentralized Quantum AI Social Network for Metaverse',
      description: 'An all-in-one ecosystem combining blockchain smart contracts, real-time quantum AI chat, IoT drone delivery, and full social network for 1 billion users.'
    };

    const check = performOfflineRealityCheck(ambitiousProject);
    assert.ok(check.feasibilityScore < 70, 'Extreme scope should yield low feasibility score');
    assert.ok(['High', 'Extreme'].includes(check.technicalComplexity));
    assert.ok(['High', 'Critical'].includes(check.scopeRisk));
    assert.ok(Array.isArray(check.featuresToRemove) && check.featuresToRemove.length > 0);
    assert.ok(Array.isArray(check.featuresToAdd) && check.featuresToAdd.length > 0);
    assert.ok(Array.isArray(check.technicalRisks) && check.technicalRisks.length > 0);
    assert.ok(check.recommendedMvp.length > 30, 'Recommended MVP must have actionable description');
  });

  test('generateOfflineImprovements provides recommendations across all 10 dimensions', () => {
    const improvements = generateOfflineImprovements({
      title: 'Campus Food Delivery App',
      description: 'A simple web app for students to order snacks from the university cafeteria.'
    });

    assert.ok(improvements.dimensions);
    const requiredDims = [
      'Functionality', 'Technology', 'UX', 'Performance', 'Security',
      'AI/ML', 'Scalability', 'Testing', 'Deployment', 'Innovation'
    ];

    for (const dim of requiredDims) {
      assert.ok(improvements.dimensions[dim], `Must contain dimension: ${dim}`);
      assert.ok(Array.isArray(improvements.dimensions[dim].recommendations));
      assert.ok(improvements.dimensions[dim].recommendations.length >= 2);
    }
    assert.ok(Array.isArray(improvements.topThreeQuickWins) && improvements.topThreeQuickWins.length === 3);
  });
});
