import { sanitizeString, sanitizeStringArray } from './security.js';

export const VALID_SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const VALID_DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
export const VALID_GOALS = [
  'Portfolio / Placements',
  'Research Paper',
  'Startup / Commercial MVP',
  'Academic Honors / Final Grade',
  'Deep Technical Learning'
];

/**
 * Validates and sanitizes student profile payload
 */
export function validateProfileData(raw) {
  const errors = [];
  if (!raw || typeof raw !== 'object') {
    return { isValid: false, errors: ['Profile data must be an object.'] };
  }

  const branch = sanitizeString(raw.branch || '', 100);
  if (!branch || branch.length < 2) {
    errors.push('Branch/Course is required and must be at least 2 characters long.');
  }

  let skills = [];
  if (Array.isArray(raw.skills)) {
    skills = sanitizeStringArray(raw.skills, 25, 60);
  } else if (typeof raw.skills === 'string') {
    skills = sanitizeStringArray(raw.skills.split(','), 25, 60);
  }
  if (skills.length === 0) {
    errors.push('At least one technical skill is required.');
  }

  let interests = [];
  if (Array.isArray(raw.interests)) {
    interests = sanitizeStringArray(raw.interests, 25, 80);
  } else if (typeof raw.interests === 'string') {
    interests = sanitizeStringArray(raw.interests.split(','), 25, 80);
  }
  if (interests.length === 0) {
    errors.push('At least one area of interest or domain is required.');
  }

  const skillLevel = raw.skillLevel && VALID_SKILL_LEVELS.includes(raw.skillLevel)
    ? raw.skillLevel
    : 'Intermediate';

  let teamSize = parseInt(raw.teamSize, 10);
  if (isNaN(teamSize) || teamSize < 1 || teamSize > 8) {
    errors.push('Team size must be between 1 and 8 members.');
    teamSize = 1;
  }

  // Parse available time in months
  let availableTimeMonths = 4;
  if (typeof raw.availableTime === 'number') {
    availableTimeMonths = Math.max(1, Math.min(12, Math.round(raw.availableTime)));
  } else if (typeof raw.availableTime === 'string') {
    const match = raw.availableTime.match(/\d+/);
    if (match) {
      availableTimeMonths = Math.max(1, Math.min(12, parseInt(match[0], 10)));
    }
  }

  const preferredDifficulty = raw.preferredDifficulty && VALID_DIFFICULTIES.includes(raw.preferredDifficulty)
    ? raw.preferredDifficulty
    : 'Medium';

  const preferredDomain = sanitizeString(raw.preferredDomain || (interests[0] || 'General Software Engineering'), 100);
  const projectGoal = raw.projectGoal && VALID_GOALS.includes(raw.projectGoal)
    ? raw.projectGoal
    : 'Portfolio / Placements';

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      branch,
      skills,
      interests,
      skillLevel,
      teamSize,
      availableTime: `${availableTimeMonths} month${availableTimeMonths > 1 ? 's' : ''}`,
      availableTimeMonths,
      preferredDifficulty,
      preferredDomain,
      projectGoal
    }
  };
}

/**
 * Middleware for validating profile payload
 */
export function validateProfileMiddleware(req, res, next) {
  const result = validateProfileData(req.body);
  if (!result.isValid) {
    return res.status(400).json({
      success: false,
      error: 'Invalid student profile',
      details: result.errors
    });
  }
  req.sanitizedProfile = result.sanitized;
  next();
}

/**
 * Middleware for validating project reality check payload
 */
export function validateRealityCheckMiddleware(req, res, next) {
  const errors = [];
  const raw = req.body || {};

  const title = sanitizeString(raw.title || raw.projectTitle || '', 200);
  if (!title || title.length < 3) {
    errors.push('Project title is required (minimum 3 characters).');
  }

  const description = sanitizeString(raw.description || raw.projectDescription || '', 4000);
  if (!description || description.length < 15) {
    errors.push('Project description is required (minimum 15 characters to provide meaningful analysis).');
  }

  const targetUsers = sanitizeString(raw.targetUsers || 'General end-users and developers', 300);
  const proposedStack = sanitizeStringArray(
    Array.isArray(raw.proposedStack) ? raw.proposedStack : (raw.proposedStack || '').split(','),
    20,
    60
  );

  let teamSize = parseInt(raw.teamSize, 10);
  if (isNaN(teamSize) || teamSize < 1 || teamSize > 8) teamSize = 3;

  let availableMonths = 4;
  if (raw.availableMonths) {
    const parsed = parseInt(raw.availableMonths, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) availableMonths = parsed;
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid project reality check input',
      details: errors
    });
  }

  req.sanitizedProject = {
    title,
    description,
    targetUsers,
    proposedStack,
    teamSize,
    availableMonths,
    skills: sanitizeStringArray(raw.skills || [], 20, 60),
    skillLevel: raw.skillLevel && VALID_SKILL_LEVELS.includes(raw.skillLevel) ? raw.skillLevel : 'Intermediate'
  };
  next();
}

/**
 * Middleware for validating project improvement request
 */
export function validateImprovementMiddleware(req, res, next) {
  const errors = [];
  const raw = req.body || {};

  const title = sanitizeString(raw.title || raw.projectTitle || '', 200);
  const description = sanitizeString(raw.description || raw.projectDescription || '', 4000);
  if (!description || description.length < 15) {
    errors.push('Project description is required to generate tailored improvements.');
  }

  const currentStack = sanitizeStringArray(
    Array.isArray(raw.currentStack) ? raw.currentStack : (raw.currentStack || '').split(','),
    20,
    60
  );

  const focusAreas = sanitizeStringArray(
    Array.isArray(raw.focusAreas) ? raw.focusAreas : (raw.focusAreas || '').split(','),
    10,
    60
  );

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid improvement request',
      details: errors
    });
  }

  req.sanitizedImprovement = {
    title: title || 'Final Year Project',
    description,
    currentStack,
    focusAreas: focusAreas.length > 0 ? focusAreas : [
      'Functionality', 'Technology', 'UX', 'Performance', 'Security',
      'AI/ML', 'Scalability', 'Testing', 'Deployment', 'Innovation'
    ]
  };
  next();
}

/**
 * Middleware for validating blueprint request
 */
export function validateBlueprintMiddleware(req, res, next) {
  const raw = req.body || {};
  const idea = raw.idea || raw;

  if (!idea || typeof idea !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'A selected project idea object is required to generate a blueprint.'
    });
  }

  const title = sanitizeString(idea.title || '', 200);
  if (!title || title.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Valid project idea title is required.'
    });
  }

  req.sanitizedIdea = {
    id: sanitizeString(idea.id || '', 100),
    title,
    description: sanitizeString(idea.description || '', 2000),
    problemStatement: sanitizeString(idea.problemStatement || '', 1000),
    proposedSolution: sanitizeString(idea.proposedSolution || '', 1000),
    difficulty: idea.difficulty && VALID_DIFFICULTIES.includes(idea.difficulty) ? idea.difficulty : 'Medium',
    duration: sanitizeString(idea.duration || '4 months', 50),
    requiredSkills: sanitizeStringArray(idea.requiredSkills || [], 20, 60),
    recommendedTechnologies: sanitizeStringArray(idea.recommendedTechnologies || [], 20, 60),
    teamSize: parseInt(idea.teamSize || idea.suggestedTeamSize, 10) || 3,
    mvpFeatures: sanitizeStringArray(idea.mvpFeatures || [], 15, 200),
    advancedFeatures: sanitizeStringArray(idea.advancedFeatures || [], 15, 200)
  };

  // Optional profile context
  if (raw.profile) {
    const profileRes = validateProfileData(raw.profile);
    if (profileRes.isValid) {
      req.sanitizedProfile = profileRes.sanitized;
    }
  }

  next();
}
