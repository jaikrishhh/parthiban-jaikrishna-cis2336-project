/**
 * validate.js — Server-side validation middleware.
 *
 * Every POST route runs one of these before its handler. If validation fails
 * the request is rejected with 400 and a structured error object keyed by
 * field name, so the front end can highlight the exact inputs at fault:
 *
 *   { success: false, message: "...", errors: { email: "Enter a valid email." } }
 *
 * This runs on the SERVER, independently of any HTML5 `required` attributes.
 * Client-side checks are a convenience; these are the real gate.
 */

// Categories the Gallery page filters by. Kept here so the allowed list is
// defined in exactly one place.
const VALID_CATEGORIES = [
  'Painting',
  'Photography',
  'Sculpture',
  'Digital Art',
  'Drawing',
  'Mixed Media'
];

// ---------------------------------------------------------------------------
// Small reusable checks
// ---------------------------------------------------------------------------

/** True when a value is missing, not a string, or only whitespace. */
function isBlank(value) {
  if (value === undefined || value === null) {
    return true;
  }
  return String(value).trim().length === 0;
}

/** Basic email shape check: something@something.tld */
function isValidEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(String(value).trim());
}

/** True when the value parses to a number that is zero or greater. */
function isNonNegativeNumber(value) {
  const parsed = Number(value);
  return !Number.isNaN(parsed) && parsed >= 0;
}

/** True when the value looks like YYYY-MM-DD and is a real calendar date. */
function isValidDate(value) {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(String(value).trim())) {
    return false;
  }
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

// ---------------------------------------------------------------------------
// Artwork submission — POST /api/artworks
//
// Field set matches the Phase 1 Planning & Design document exactly:
//   title, artist, category, price, image (URL), description
//
// Email is accepted but optional, since the planned form does not collect it.
// Price may be left blank or given as "Not for Sale" / "NFS", which the plan
// allows; that is stored as null and rendered as a "Not for Sale" label.
// ---------------------------------------------------------------------------

/** Recognizes the wordings a user might type instead of a number. */
function meansNotForSale(value) {
  const normalized = String(value).trim().toLowerCase().replace(/[^a-z]/g, '');
  return normalized === 'notforsale' || normalized === 'nfs';
}

function validateArtwork(req, res, next) {
  const body = req.body || {};
  const errors = {};

  if (isBlank(body.title)) {
    errors.title = 'Title is required.';
  } else if (String(body.title).trim().length > 120) {
    errors.title = 'Title must be 120 characters or fewer.';
  }

  if (isBlank(body.artist)) {
    errors.artist = 'Artist name is required.';
  }

  if (isBlank(body.category)) {
    errors.category = 'Please choose a category.';
  }

  // Price: blank or "Not for Sale" is allowed; anything else must be numeric.
  let normalizedPrice = null;
  if (!isBlank(body.price) && !meansNotForSale(body.price)) {
    const stripped = String(body.price).replace(/[$,\s]/g, '');
    if (!isNonNegativeNumber(stripped)) {
      errors.price = 'Enter a number of 0 or more, or leave blank for "Not for Sale".';
    } else {
      normalizedPrice = Number(stripped);
    }
  }

  // Email is optional, but must be well formed when supplied.
  if (!isBlank(body.email) && !isValidEmail(body.email)) {
    errors.email = 'Enter a valid email address.';
  }

  // Image URL is optional, but must look like a path or URL when supplied.
  if (!isBlank(body.image) && String(body.image).trim().length > 500) {
    errors.image = 'Image URL must be 500 characters or fewer.';
  }

  if (!isBlank(body.description) && String(body.description).trim().length > 500) {
    errors.description = 'Description must be 500 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: errors
    });
  }

  // Normalize before the handler sees it: trim strings, coerce the price.
  req.body.title = String(body.title).trim();
  req.body.artist = String(body.artist).trim();
  req.body.category = String(body.category).trim();
  req.body.price = normalizedPrice;
  req.body.email = isBlank(body.email) ? '' : String(body.email).trim().toLowerCase();
  req.body.image = isBlank(body.image) ? '' : String(body.image).trim();
  req.body.description = isBlank(body.description) ? '' : String(body.description).trim();

  next();
}

// ---------------------------------------------------------------------------
// Event submission — POST /api/events
// ---------------------------------------------------------------------------

function validateEvent(req, res, next) {
  const body = req.body || {};
  const errors = {};

  if (isBlank(body.title)) {
    errors.title = 'Event title is required.';
  }

  if (isBlank(body.date)) {
    errors.date = 'Event date is required.';
  } else if (!isValidDate(body.date)) {
    errors.date = 'Use the format YYYY-MM-DD.';
  }

  if (isBlank(body.location)) {
    errors.location = 'Location is required.';
  }

  if (!isBlank(body.price) && !isNonNegativeNumber(body.price)) {
    errors.price = 'Price must be a number of 0 or more.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: errors
    });
  }

  req.body.title = String(body.title).trim();
  req.body.date = String(body.date).trim();
  req.body.location = String(body.location).trim();

  next();
}

// ---------------------------------------------------------------------------
// Contact form — POST /api/contact
// ---------------------------------------------------------------------------

function validateContact(req, res, next) {
  const body = req.body || {};
  const errors = {};

  if (isBlank(body.name)) {
    errors.name = 'Name is required.';
  }

  if (isBlank(body.email)) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(body.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (isBlank(body.message)) {
    errors.message = 'Message is required.';
  } else if (String(body.message).trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (String(body.message).trim().length > 1000) {
    errors.message = 'Message must be 1000 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: errors
    });
  }

  req.body.name = String(body.name).trim();
  req.body.email = String(body.email).trim().toLowerCase();
  req.body.message = String(body.message).trim();
  req.body.subject = isBlank(body.subject) ? 'General inquiry' : String(body.subject).trim();

  next();
}

module.exports = {
  validateArtwork,
  validateEvent,
  validateContact,
  VALID_CATEGORIES
};
