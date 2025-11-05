// BWGA Nexus AI Enhanced Server
// Enhanced Express.js server with additional features and optimizations

const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.openai.com", "https://api.worldbank.org", "https://comtrade.un.org"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Import API handlers (TypeScript modules compiled to JS)
const nexusBrainModule = require('./dist/nexus-brain.js');
const reportModule = require('./dist/report.js');
const researchAndScopeModule = require('./dist/research-and-scope.js');
const symbiosisChatModule = require('./dist/symbiosis-chat.js');
const opportunitiesModule = require('./dist/opportunities.js');
const analysisModule = require('./dist/analysis.js');
const capabilitiesModule = require('./dist/capabilities.js');
const economicDataModule = require('./dist/economic-data.js');
const citiesModule = require('./dist/cities.js');
const refineObjectiveModule = require('./dist/refine-objective.js');
const letterModule = require('./dist/letter.js');
const ttsModule = require('./dist/tts.js');
const predictiveAnalysisModule = require('./dist/predictive-analysis.js');

// Extract handlers
const nexusBrainHandler = nexusBrainModule.handler;
const reportHandler = reportModule.handler;
const researchAndScopeHandler = researchAndScopeModule.default;
const symbiosisChatHandler = symbiosisChatModule.default;
const opportunitiesHandler = opportunitiesModule.default;
const analysisHandler = analysisModule.default;
const capabilitiesHandler = capabilitiesModule.default;
const economicDataHandler = economicDataModule.default;
const citiesHandler = citiesModule.default;
const refineObjectiveHandler = refineObjectiveModule.default;
const letterHandler = letterModule.default;
const ttsHandler = ttsModule.default;
const predictiveAnalysisHandler = predictiveAnalysisModule.default;

// API Routes - All 17 endpoints from system analysis
app.post('/api/nexus-brain', (req, res) => nexusBrainHandler(req, res));
app.post('/api/report', (req, res) => reportHandler(req, res));
app.post('/api/research-and-scope', (req, res) => researchAndScopeHandler(req, res));
app.post('/api/symbiosis-chat', (req, res) => symbiosisChatHandler(req, res));
app.get('/api/opportunities', (req, res) => opportunitiesHandler(req, res));
app.post('/api/analysis', (req, res) => analysisHandler(req, res));
app.get('/api/capabilities', (req, res) => capabilitiesHandler(req, res));
app.get('/api/economic-data', (req, res) => economicDataHandler(req, res));
app.get('/api/cities', (req, res) => citiesHandler(req, res));
app.post('/api/refine-objective', (req, res) => refineObjectiveHandler(req, res));
app.post('/api/letter', (req, res) => letterHandler(req, res));
app.post('/api/tts', (req, res) => ttsHandler(req, res));
app.post('/api/predictive-analysis', (req, res) => predictiveAnalysisHandler(req, res));

// Enhanced health check endpoint
app.get('/api/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    endpoints: [
      'nexus-brain', 'report', 'research-and-scope', 'symbiosis-chat',
      'opportunities', 'analysis', 'capabilities', 'economic-data',
      'cities', 'refine-objective', 'letter', 'tts', 'predictive-analysis'
    ],
    environment: process.env.NODE_ENV || 'development'
  };
  res.json(health);
});

// Metrics endpoint
app.get('/api/metrics', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    requests: {
      total: 0, // Would be populated by a metrics collection system
      byEndpoint: {}
    },
    performance: {
      averageResponseTime: 0,
      errorRate: 0
    }
  });
});

// Static file serving for frontend (if needed)
app.use(express.static(path.join(__dirname, '../public')));

// Enhanced error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';

  res.status(error.status || 500).json({
    error: 'Internal server error',
    message: isDevelopment ? error.message : 'Something went wrong',
    ...(isDevelopment && { stack: error.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      '/api/health',
      '/api/metrics',
      '/api/nexus-brain',
      '/api/report',
      '/api/research-and-scope',
      '/api/symbiosis-chat',
      '/api/opportunities',
      '/api/analysis',
      '/api/capabilities',
      '/api/economic-data',
      '/api/cities',
      '/api/refine-objective',
      '/api/letter',
      '/api/tts',
      '/api/predictive-analysis'
    ]
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BWGA Nexus AI Enhanced Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📈 Metrics: http://localhost:${PORT}/api/metrics`);
  console.log(`🧠 Nexus Brain API: http://localhost:${PORT}/api/nexus-brain`);
  console.log(`📄 Report Generation: http://localhost:${PORT}/api/report`);
  console.log(`🔍 Research & Scope: http://localhost:${PORT}/api/research-and-scope`);
  console.log(`💬 Symbiosis Chat: http://localhost:${PORT}/api/symbiosis-chat`);
  console.log(`📈 Live Opportunities: http://localhost:${PORT}/api/opportunities`);
  console.log(`📊 Deep Analysis: http://localhost:${PORT}/api/analysis`);
  console.log(`⚙️ AI Capabilities: http://localhost:${PORT}/api/capabilities`);
  console.log(`💰 Economic Data: http://localhost:${PORT}/api/economic-data`);
  console.log(`🏙️ Cities Data: http://localhost:${PORT}/api/cities`);
  console.log(`🎯 Refine Objective: http://localhost:${PORT}/api/refine-objective`);
  console.log(`✉️ Letter Generation: http://localhost:${PORT}/api/letter`);
  console.log(`🔊 Text-to-Speech: http://localhost:${PORT}/api/tts`);
  console.log(`🔮 Predictive Analysis: http://localhost:${PORT}/api/predictive-analysis`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;