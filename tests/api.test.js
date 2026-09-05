import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/server.js';

describe('HTTP API Endpoints & Security Tests', () => {
  let server;
  let baseUrl;

  before((_, done) => {
    // Listen on random available ephemeral port
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      done();
    });
  });

  after((_, done) => {
    server.close(done);
  });

  test('GET /api/health returns healthy status and engine readiness', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.status, 'healthy');
    assert.ok(data.engine);
    assert.equal(data.offlineEngineReady, true);

    // Verify Helmet security headers
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  });

  test('POST /api/profile/validate handles valid input properly', async () => {
    const payload = {
      branch: 'Computer Science',
      skills: ['Python', 'SQL'],
      interests: ['AI'],
      teamSize: 3,
      availableTime: '4 months'
    };

    const res = await fetch(`${baseUrl}/api/profile/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.profile.branch, 'Computer Science');
    assert.equal(data.profile.teamSize, 3);
  });

  test('POST /api/profile/validate rejects invalid payload with 400 Bad Request', async () => {
    const invalidPayload = {
      branch: '', // Empty
      skills: [],
      interests: []
    };

    const res = await fetch(`${baseUrl}/api/profile/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload)
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(Array.isArray(data.details));
  });

  test('POST /api/ideas/generate creates tailored project ideas', async () => {
    const payload = {
      branch: 'Computer Science',
      skills: ['Python', 'JavaScript'],
      interests: ['AI', 'Web'],
      skillLevel: 'Intermediate',
      teamSize: 3,
      availableTime: '4 months',
      preferredDifficulty: 'Medium'
    };

    const res = await fetch(`${baseUrl}/api/ideas/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.ideas));
    assert.ok(data.ideas.length >= 3);
    assert.ok(data.ideas[0].title);
  });

  test('POST /api/ideas/compare evaluates candidate ideas', async () => {
    const mockIdeas = [
      {
        id: 'p1',
        title: 'Project Alpha',
        difficulty: 'Medium',
        estimatedDuration: '4 months',
        requiredSkills: ['Python', 'FastAPI'],
        suggestedTeamSize: 3,
        mvpFeatures: ['Auth', 'Dashboard']
      },
      {
        id: 'p2',
        title: 'Project Beta',
        difficulty: 'Hard',
        estimatedDuration: '6 months',
        requiredSkills: ['C++', 'Rust', 'CUDA'],
        suggestedTeamSize: 4,
        mvpFeatures: ['Engine']
      }
    ];

    const res = await fetch(`${baseUrl}/api/ideas/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ideas: mockIdeas })
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.comparisonList));
    assert.ok(data.recommendedProjectId);
    assert.ok(data.recommendationRationale);
  });

  test('POST /api/blueprint/generate creates 18-part project blueprint', async () => {
    const ideaPayload = {
      idea: {
        title: 'VeriMed AI Discharge Summarizer',
        description: 'An AI healthcare portal simplifying hospital discharge notes.',
        difficulty: 'Medium',
        requiredSkills: ['Python', 'React', 'FastAPI'],
        suggestedTeamSize: 3
      },
      profile: {
        branch: 'CSE',
        skills: ['Python', 'React'],
        interests: ['AI']
      }
    };

    const res = await fetch(`${baseUrl}/api/blueprint/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ideaPayload)
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.blueprint);
    assert.ok(data.blueprint.projectOverview);
    assert.ok(data.blueprint.systemArchitecture);
    assert.ok(data.blueprint.recommendedTechnologyStack);
  });

  test('POST /api/reality-check performs critical scope audit', async () => {
    const realityPayload = {
      projectTitle: 'Realtime Multi-Tenant AI ERP Platform',
      projectDescription: 'A platform to replace SAP, Oracle, and Salesforce with autonomous AI agents and quantum blockchain proof.',
      teamSize: 2,
      availableMonths: 2
    };

    const res = await fetch(`${baseUrl}/api/reality-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(realityPayload)
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.feasibilityScore !== undefined);
    assert.ok(Array.isArray(data.featuresToRemove));
    assert.ok(data.recommendedMvp);
  });

  test('POST /api/improve produces 10 dimensions of improvements', async () => {
    const improvePayload = {
      projectTitle: 'Smart Attendance System',
      projectDescription: 'Facial recognition attendance system using OpenCV and Tkinter.',
      currentStack: ['Python', 'OpenCV', 'Tkinter']
    };

    const res = await fetch(`${baseUrl}/api/improve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(improvePayload)
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.dimensions);
    assert.ok(data.dimensions.Security);
    assert.ok(data.dimensions.UX);
    assert.ok(Array.isArray(data.topThreeQuickWins));
  });

  test('Non-existent API endpoint returns 404 with clean error and no stack trace', async () => {
    const res = await fetch(`${baseUrl}/api/non-existent-route`);
    assert.equal(res.status, 404);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.error, 'API endpoint not found');
    assert.equal(data.stack, undefined); // No stack trace leaked
  });
});
