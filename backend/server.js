/**
 * server.js — ArtConnect application server.
 *
 * Responsibilities, in the order they are wired up below:
 *   1. Parse incoming JSON and URL-encoded form bodies.
 *   2. Log every request.
 *   3. Serve the Phase 2 front end (the HTML/CSS/JS in the repository root).
 *   4. Mount the /api route modules.
 *   5. Handle 404s and unexpected errors in one place.
 *
 * Start with:  npm start        (run from inside the backend/ folder)
 * Then visit:  http://localhost:3000
 */

const path = require('path');
const express = require('express');

const logger = require('./middleware/logger');
const store = require('./data/store');
const artworkRoutes = require('./routes/artworks');
const eventRoutes = require('./routes/events');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Application-level middleware
// ORDER MATTERS: the body parsers must run before any route that reads
// req.body, otherwise req.body is undefined.
// ---------------------------------------------------------------------------

// Parses JSON request bodies (fetch with Content-Type: application/json).
app.use(express.json());

// Parses classic HTML form posts (application/x-www-form-urlencoded).
app.use(express.urlencoded({ extended: true }));

// Logs method, URL, status, and duration for every request.
app.use(logger);

// ---------------------------------------------------------------------------
// Static front end
//
// This file lives in /backend, so the repository root is one directory up.
// Two static mounts are registered because the Phase 2 pages may sit either
// at the repository root or inside a /frontend folder. Express tries each
// mount in order and serves the first match, so both layouts work and
// /gallery.html resolves either way.
//
// Serving the pages from the same server as the API means the site and the
// API share one origin — no CORS configuration needed, and a relative
// fetch('/api/artworks') simply works.
// ---------------------------------------------------------------------------
const REPO_ROOT = path.join(__dirname, '..');

app.use(express.static(REPO_ROOT));
app.use(express.static(path.join(REPO_ROOT, 'frontend')));

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------
app.use('/api/artworks', artworkRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact', contactRoutes);

// Aggregate counts, used by the homepage summary section.
app.get('/api/stats', (req, res) => {
  res.status(200).json({ success: true, stats: store.getStats() });
});

// Simple liveness check — handy for confirming the server is up.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime())
  });
});

// ---------------------------------------------------------------------------
// 404 handler — reached only when nothing above matched.
// API paths get JSON; anything else gets a short HTML page.
// ---------------------------------------------------------------------------
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'No API endpoint matches ' + req.method + ' ' + req.originalUrl + '.'
    });
  }

  res.status(404).send(
    '<h1>404 — Page not found</h1><p><a href="/">Return to ArtConnect</a></p>'
  );
});

// ---------------------------------------------------------------------------
// Central error handler — four arguments is what marks it as an error handler.
// Any error thrown or passed to next(err) in a route lands here.
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server. Please try again.'
  });
});

// ---------------------------------------------------------------------------
// Start listening
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log('ArtConnect server running at http://localhost:' + PORT);
  console.log('API base URL: http://localhost:' + PORT + '/api');
});

module.exports = app;
