/**
 * routes/artworks.js — Everything under /api/artworks
 *
 *   GET  /api/artworks       list, with optional filter / search / sort
 *   GET  /api/artworks/:id   fetch a single piece
 *   POST /api/artworks       submit a new piece (validated)
 */

const express = require('express');
const store = require('../data/store');
const { validateArtwork } = require('../middleware/validate');

const router = express.Router();

// ---------------------------------------------------------------------------
// GET /api/artworks
//
// Query parameters (all optional, combinable):
//   ?category=Painting     exact category match
//   ?search=bayou          case-insensitive match on title or artist
//   ?sort=price-asc        price-asc | price-desc | title | newest
//   ?max=500               only pieces at or below this price
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
  let results = store.getAllArtworks();

  if (req.query.category) {
    const wanted = String(req.query.category).toLowerCase();
    results = results.filter(function (item) {
      return item.category.toLowerCase() === wanted;
    });
  }

  if (req.query.search) {
    const term = String(req.query.search).toLowerCase();
    results = results.filter(function (item) {
      return (
        item.title.toLowerCase().indexOf(term) !== -1 ||
        item.artist.toLowerCase().indexOf(term) !== -1
      );
    });
  }

  if (req.query.max) {
    const ceiling = Number(req.query.max);
    if (!Number.isNaN(ceiling)) {
      results = results.filter(function (item) {
        // Not-for-sale pieces (null price) are excluded from a price ceiling.
        return typeof item.price === 'number' && item.price <= ceiling;
      });
    }
  }

  // Sort helper: not-for-sale pieces (null) always fall to the end.
  function priceOf(item) {
    return typeof item.price === 'number' ? item.price : Infinity;
  }

  if (req.query.sort === 'price-asc') {
    results.sort(function (a, b) { return priceOf(a) - priceOf(b); });
  } else if (req.query.sort === 'price-desc') {
    results.sort(function (a, b) { return priceOf(b) - priceOf(a); });
  } else if (req.query.sort === 'title') {
    results.sort(function (a, b) { return a.title.localeCompare(b.title); });
  } else if (req.query.sort === 'newest') {
    results.sort(function (a, b) {
      return new Date(b.submittedAt) - new Date(a.submittedAt);
    });
  }

  res.status(200).json({
    success: true,
    count: results.length,
    artworks: results
  });
});

// ---------------------------------------------------------------------------
// GET /api/artworks/:id
// ---------------------------------------------------------------------------
router.get('/:id', (req, res) => {
  const artwork = store.getArtworkById(req.params.id);

  if (!artwork) {
    return res.status(404).json({
      success: false,
      message: 'No artwork found with id ' + req.params.id + '.'
    });
  }

  res.status(200).json({ success: true, artwork: artwork });
});

// ---------------------------------------------------------------------------
// POST /api/artworks
//
// validateArtwork runs first. If it rejects, this handler never executes.
// Accepts both JSON bodies (fetch) and standard HTML form encoding.
// ---------------------------------------------------------------------------
router.post('/', validateArtwork, (req, res) => {
  const saved = store.addArtwork(req.body);

  res.status(201).json({
    success: true,
    message: '"' + saved.title + '" was submitted successfully and is now in the gallery.',
    artwork: saved
  });
});

module.exports = router;
