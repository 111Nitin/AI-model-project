import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import {
  securityHeaders,
  corsHandler,
  standardLimiter,
  errorHandler
} from './middleware/security.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();

// Trust proxy for rate limiting behind reverse proxies (e.g. Render, Vercel, Nginx)
app.set('trust proxy', 1);

// Security & Request Parsing Middleware
app.use(securityHeaders);
app.use(corsHandler);
app.use(standardLimiter);
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true, limit: '500kb' }));

// Serve static frontend assets
app.use(express.static(path.join(rootDir, 'public')));

// Mount API Routes
app.use('/api', apiRouter);

// Fallback SPA routing to index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, error: 'API endpoint not found' });
  }
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

// Centralized error handling
app.use(errorHandler);

// Start server if run as main script
const isMain = process.argv[1] && (
  process.argv[1].endsWith('server.js') ||
  process.argv[1].endsWith('server')
);

let serverInstance = null;
if (isMain) {
  serverInstance = app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(`🚀 ProjectMentor AI Server running on port ${config.port}`);
    console.log(`📡 URL: http://localhost:${config.port}`);
    console.log(`🤖 Mode: ${config.hasGeminiKey() ? `Gemini Active (${config.geminiModel})` : 'Offline Baseline Intelligence Engine Active'}`);
    console.log(`🔒 Security: Helmet, Rate Limiter, and CORS enabled`);
    console.log(`====================================================`);
  });

  // Graceful shutdown
  const handleShutdown = (signal) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    if (serverInstance) {
      serverInstance.close(() => {
        console.log('[Server] HTTP server closed cleanly.');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

export default app;
