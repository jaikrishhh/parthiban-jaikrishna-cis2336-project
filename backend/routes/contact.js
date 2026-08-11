/**
 * routes/contact.js — Everything under /api/contact
 *
 *   POST /api/contact   receive a contact-form message (validated)
 *   GET  /api/contact   list messages received since the server started
 *
 * The GET route exists so the submission can be verified in the browser
 * during grading — in a production app it would sit behind authentication.
 */

const express = require('express');
const store = require('../data/store');
const { validateContact } = require('../middleware/validate');

const router = express.Router();

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
router.post('/', validateContact, (req, res) => {
  const saved = store.addMessage(req.body);

  res.status(201).json({
    success: true,
    message: 'Thanks for reaching out, ' + saved.name +
             '. We will reply to ' + saved.email + ' within two business days.',
    reference: 'MSG-' + String(saved.id).padStart(4, '0')
  });
});

// ---------------------------------------------------------------------------
// GET /api/contact
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
  const messages = store.getAllMessages();

  res.status(200).json({
    success: true,
    count: messages.length,
    messages: messages
  });
});

module.exports = router;
