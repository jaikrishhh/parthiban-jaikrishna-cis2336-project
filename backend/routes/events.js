/**
 * routes/events.js — Everything under /api/events
 *
 *   GET  /api/events       list, with optional upcoming-only filter and sort
 *   GET  /api/events/:id   fetch a single event (powers the "details" click)
 *   POST /api/events       add an event (validated)
 */

const express = require('express');
const store = require('../data/store');
const { validateEvent } = require('../middleware/validate');

const router = express.Router();

// ---------------------------------------------------------------------------
// GET /api/events
//
// Query parameters:
//   ?upcoming=true   only events dated today or later
//   ?free=true       only events with a price of 0
//   ?sort=date       chronological order
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
  let results = store.getAllEvents();

  if (req.query.upcoming === 'true') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    results = results.filter(function (item) {
      return new Date(item.date) >= today;
    });
  }

  if (req.query.free === 'true') {
    results = results.filter(function (item) {
      return item.price === 0;
    });
  }

  if (req.query.sort === 'date') {
    results.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  }

  res.status(200).json({
    success: true,
    count: results.length,
    events: results
  });
});

// ---------------------------------------------------------------------------
// GET /api/events/:id
// ---------------------------------------------------------------------------
router.get('/:id', (req, res) => {
  const event = store.getEventById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'No event found with id ' + req.params.id + '.'
    });
  }

  res.status(200).json({ success: true, event: event });
});

// ---------------------------------------------------------------------------
// POST /api/events
// ---------------------------------------------------------------------------
router.post('/', validateEvent, (req, res) => {
  const saved = store.addEvent(req.body);

  res.status(201).json({
    success: true,
    message: 'Event "' + saved.title + '" was added.',
    event: saved
  });
});

module.exports = router;
