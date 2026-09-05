import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.7-flash',
  fallbackModel: 'gemini-2.5-flash',
  apiTimeoutMs: 15000,
  maxInputLength: 4000,
  maxArrayItems: 25,
  isProduction: process.env.NODE_ENV === 'production',
  hasGeminiKey: () => Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 5)
};
