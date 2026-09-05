import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateProfileData,
  VALID_SKILL_LEVELS,
  VALID_DIFFICULTIES
} from '../server/middleware/validator.js';
import { sanitizeString, sanitizeStringArray } from '../server/middleware/security.js';

describe('Input Validation & Sanitization Tests', () => {
  test('should validate a complete, valid student profile', () => {
    const validProfile = {
      branch: 'Computer Science and Engineering',
      skills: ['Python', 'C++', 'JavaScript', 'SQL'],
      interests: ['Artificial Intelligence', 'Web Development'],
      skillLevel: 'Intermediate',
      teamSize: 3,
      availableTime: '4 months',
      preferredDifficulty: 'Medium',
      preferredDomain: 'AI & Web Systems',
      projectGoal: 'Portfolio / Placements'
    };

    const result = validateProfileData(validProfile);
    assert.equal(result.isValid, true);
    assert.equal(result.errors.length, 0);
    assert.equal(result.sanitized.branch, 'Computer Science and Engineering');
    assert.equal(result.sanitized.teamSize, 3);
    assert.equal(result.sanitized.availableTimeMonths, 4);
    assert.equal(result.sanitized.skills.length, 4);
  });

  test('should reject profile with missing required branch', () => {
    const invalidProfile = {
      branch: '',
      skills: ['Python'],
      interests: ['AI'],
      teamSize: 2
    };

    const result = validateProfileData(invalidProfile);
    assert.equal(result.isValid, false);
    assert.ok(result.errors.some(e => e.includes('Branch')));
  });

  test('should reject profile with empty skills array or invalid string', () => {
    const invalidProfile = {
      branch: 'Information Technology',
      skills: [],
      interests: ['Cloud'],
      teamSize: 2
    };

    const result = validateProfileData(invalidProfile);
    assert.equal(result.isValid, false);
    assert.ok(result.errors.some(e => e.includes('skill')));
  });

  test('should reject profile with empty interests', () => {
    const invalidProfile = {
      branch: 'Electronics & Communication',
      skills: ['C++', 'Embedded C'],
      interests: [],
      teamSize: 2
    };

    const result = validateProfileData(invalidProfile);
    assert.equal(result.isValid, false);
    assert.ok(result.errors.some(e => e.includes('interest')));
  });

  test('should clamp or reject out-of-range team sizes', () => {
    // Team size > 8
    const largeTeam = {
      branch: 'CSE',
      skills: ['Java'],
      interests: ['FinTech'],
      teamSize: 15
    };
    const resultLarge = validateProfileData(largeTeam);
    assert.equal(resultLarge.isValid, false);
    assert.ok(resultLarge.errors.some(e => e.includes('Team size')));

    // Team size 0 or negative
    const zeroTeam = {
      branch: 'CSE',
      skills: ['Java'],
      interests: ['FinTech'],
      teamSize: 0
    };
    const resultZero = validateProfileData(zeroTeam);
    assert.equal(resultZero.isValid, false);
    assert.ok(resultZero.errors.some(e => e.includes('Team size')));
  });

  test('should sanitize and cap extremely long input strings', () => {
    const hugeBranch = 'Computer Science ' + 'A'.repeat(5000);
    const sanitized = sanitizeString(hugeBranch, 100);
    assert.equal(sanitized.length, 100);
    assert.ok(sanitized.startsWith('Computer Science'));
  });

  test('should sanitize and truncate excessive array entries', () => {
    const hundredSkills = Array.from({ length: 100 }, (_, i) => `Skill-${i}`);
    const sanitized = sanitizeStringArray(hundredSkills, 25, 50);
    assert.equal(sanitized.length, 25);
    assert.equal(sanitized[0], 'Skill-0');
  });

  test('should correctly parse diverse available time strings', () => {
    const testCases = [
      { input: '1 month', expectedMonths: 1 },
      { input: '4 months', expectedMonths: 4 },
      { input: '6 Months', expectedMonths: 6 },
      { input: '12 months', expectedMonths: 12 },
      { input: '15 months (overflow)', expectedMonths: 12 }, // Clamped to 12
      { input: 3, expectedMonths: 3 }
    ];

    for (const tc of testCases) {
      const p = {
        branch: 'CSE',
        skills: ['Python'],
        interests: ['AI'],
        teamSize: 2,
        availableTime: tc.input
      };
      const res = validateProfileData(p);
      assert.equal(res.sanitized.availableTimeMonths, tc.expectedMonths);
    }
  });

  test('should strip malicious control characters and XSS script tags safely', () => {
    const dirty = '<script>alert("hack")</script>\u0000Hello \u001FWorld';
    const cleaned = sanitizeString(dirty, 200);
    assert.ok(!cleaned.includes('\u0000'));
    assert.ok(!cleaned.includes('\u001F'));
  });
});
