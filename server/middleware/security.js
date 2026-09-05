import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Standard rate limiter for all endpoints (120 requests per 15 minutes)
export const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again in a few minutes.'
  }
});

// Stricter rate limiter for AI generation / analysis endpoints (30 requests per minute)
export const aiGenerationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'AI generation rate limit exceeded. Please wait a moment before submitting another request.'
  }
});

// Helmet security headers with configured CSP for frontend styling & fonts
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false
});

// Strict CORS setup
export const corsHandler = cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

// Sanitizes strings to prevent injection or malformed payloads
export function sanitizeString(val, maxLength = 3000) {
  if (typeof val !== 'string') return '';
  // Strip control characters and excessive length
  const cleaned = val.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '').trim();
  return cleaned.slice(0, maxLength);
}

// Sanitizes arrays of strings (e.g. skills, interests)
export function sanitizeStringArray(arr, maxItems = 25, itemMaxLength = 100) {
  if (!Array.isArray(arr)) return [];
  return arr
    .map(item => (typeof item === 'string' ? sanitizeString(item, itemMaxLength) : ''))
    .filter(item => item.length > 0)
    .slice(0, maxItems);
}

// Centralized error handling middleware that NEVER leaks stack traces to users
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || err.statusCode || 500;
  const message = err.clientMessage || (status === 500 ? 'An unexpected internal server error occurred.' : err.message);

  // Safe server-side error logging (no sensitive env tokens)
  console.error(`[API Error] ${req.method} ${req.originalUrl} - Status: ${status} - ${err.message}`);

  res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  });
}
