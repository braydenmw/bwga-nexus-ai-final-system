// BWGA Nexus AI API Server
// Express.js server for handling all API endpoints

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: [
      'nexus-brain', 'report', 'research-and-scope', 'symbiosis-chat',
      'opportunities', 'analysis', 'capabilities', 'economic-data',
      'cities', 'refine-objective', 'letter', 'tts', 'predictive-analysis'
    ]
  });
});

// Static file serving for frontend (if needed)
app.use(express.static(path.join(__dirname, '../public')));

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BWGA Nexus AI API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
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
});

module.exports = app;