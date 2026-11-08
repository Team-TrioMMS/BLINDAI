/**
 * ============================================================================
 * MODULE: REST API Server & Microservices Binder
 * ASSIGNED DEVELOPER: MD Muhaiminur Rahman Maruf (Student ID: 241-35-052)
 * ROLE: Backend & Database Developer
 * RESPONSIBILITIES: Express server, API security, CORS, Routing
 * ============================================================================
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const aiRoutes = require('./routes/aiRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'BlindGuide AI Vision Assistant API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/events', eventRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🚀 BlindGuide Backend Server Running`);
  console.log(`📡 Local:   http://localhost:${PORT}`);
  console.log(`🩺 Health:  http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

module.exports = app;
