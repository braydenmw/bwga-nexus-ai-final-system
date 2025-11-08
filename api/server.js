// BWGA Nexus AI - Universal Regional Development Intelligence Platform
// API Server - The central nervous system for all intelligence operations.

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

// Import Universal API Handlers
const nexusBrainModule = require('./dist/api/nexus-brain.js');
const reportModule = require('./dist/api/report.js');
const economicDataModule = require('./dist/api/economic-data.js');
const letterModule = require('./dist/api/letter.js');

// Extract handlers
const nexusBrainHandler = nexusBrainModule.handler;
const reportHandler = reportModule.handler;
const economicDataHandler = economicDataModule.default;
const letterHandler = letterModule.default;

// --- Core Intelligence API Routes ---

// The primary engine for RROI, TPT, and SEAM analysis.
app.post('/api/nexus-brain', (req, res) => nexusBrainHandler(req, res));

// The main endpoint for generating comprehensive NSIL intelligence reports.
app.post('/api/report', (req, res) => reportHandler(req, res));

// Generates professional outreach letters based on report findings.
app.post('/api/letter', (req, res) => letterHandler(req, res));

// Provides live economic data for any region to ground the analysis.
app.get('/api/economic-data', (req, res) => economicDataHandler(req, res));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: [
      'nexus-brain', 'report', 'letter', 'economic-data'
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
  console.log('---');
  console.log('🚀 BWGA Nexus AI - Universal Regional Development Intelligence Platform');
  console.log(`   API Server successfully started on port ${PORT}`);
  console.log('---');
  console.log(`   [HEALTH]         http://localhost:${PORT}/api/health`);
  console.log(`   [NEXUS_BRAIN]    http://localhost:${PORT}/api/nexus-brain`);
  console.log(`   [REPORT]         http://localhost:${PORT}/api/report`);
  console.log('---');
});

module.exports = app;