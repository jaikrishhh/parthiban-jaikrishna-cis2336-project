/**
 * store.js — In-memory data layer for ArtConnect.
 *
 * The project specification calls for submitted data to be held *temporarily*
 * on the server, so no external database is used. Everything lives in module
 * scope and resets when the server restarts.
 *
 * Keeping all data access behind these helper functions means the route files
 * never touch the raw arrays directly — if this were ever swapped for a real
 * database, only this one file would change.
 */

// ---------------------------------------------------------------------------
// Seed data
// Object shape matches the Phase 1 plan: { title, artist, category, price, image }
// ---------------------------------------------------------------------------

const artworks = [
  {
    id: 1,
    title: 'Sunrise Over Buffalo Bayou',
    artist: 'Marcus Rivera',
    category: 'Painting',
    price: 850,
    image: 'images/artwork-1.jpg',
    description: 'Oil on canvas capturing early light across the bayou.',
    submittedAt: '2026-05-02T14:10:00.000Z'
  },
  {
    id: 2,
    title: 'Concrete Bloom',
    artist: 'Priya Sharma',
    category: 'Photography',
    price: 320,
    image: 'images/artwork-2.jpg',
    description: 'Wildflowers pushing through an abandoned lot downtown.',
    submittedAt: '2026-05-06T09:45:00.000Z'
  },
  {
    id: 3,
    title: 'Weightless',
    artist: 'Dominic Hale',
    category: 'Sculpture',
    price: 2400,
    image: 'images/artwork-3.jpg',
    description: 'Suspended steel and glass form, 4 ft tall.',
    submittedAt: '2026-05-11T18:20:00.000Z'
  },
  {
    id: 4,
    title: 'Neon Monsoon',
    artist: 'Aisha Karim',
    category: 'Digital Art',
    price: 175,
    image: 'images/artwork-4.jpg',
    description: 'Limited-run giclée print from a digital painting series.',
    submittedAt: '2026-05-15T11:05:00.000Z'
  },
  {
    id: 5,
    title: 'Study of Hands',
    artist: 'Elena Vasquez',
    category: 'Drawing',
    price: 95,
    image: 'images/artwork-5.jpg',
    description: 'Graphite on toned paper, part of an anatomy series.',
    submittedAt: '2026-05-19T16:30:00.000Z'
  },
  {
    id: 6,
    title: 'Salvage Quilt No. 3',
    artist: 'Ruth Okonkwo',
    category: 'Mixed Media',
    price: 1150,
    image: 'images/artwork-6.jpg',
    description: 'Reclaimed textile and acrylic on wood panel.',
    submittedAt: '2026-05-24T13:00:00.000Z'
  }
];

const events = [
  {
    id: 1,
    title: 'First Saturday Gallery Walk',
    date: '2026-09-05',
    time: '6:00 PM',
    location: 'Washington Ave Arts District, Houston, TX',
    price: 0,
    description: 'Twelve independent studios open their doors for one evening.'
  },
  {
    id: 2,
    title: 'Portfolio Review: Emerging Artists',
    date: '2026-09-18',
    time: '1:00 PM',
    location: 'ArtConnect Studio, Katy, TX',
    price: 25,
    description: 'Sit down with three working curators for a 20-minute review.'
  },
  {
    id: 3,
    title: 'Intro to Screen Printing Workshop',
    date: '2026-10-03',
    time: '10:00 AM',
    location: 'Sugar Land Community Makerspace',
    price: 60,
    description: 'Hands-on session; all materials provided, no experience needed.'
  },
  {
    id: 4,
    title: 'Collectors Night: Winter Showcase',
    date: '2026-11-14',
    time: '7:30 PM',
    location: 'Downtown Exhibition Hall, Houston, TX',
    price: 40,
    description: 'Preview evening for the winter catalog, artists in attendance.'
  }
];

// Messages submitted through the contact form. Starts empty.
const messages = [];

// ---------------------------------------------------------------------------
// ID counters — start above the highest seeded id so new records never collide.
// ---------------------------------------------------------------------------

let nextArtworkId = artworks.length + 1;
let nextEventId = events.length + 1;
let nextMessageId = 1;

// ---------------------------------------------------------------------------
// Artwork accessors
// ---------------------------------------------------------------------------

/** Returns a shallow copy of every artwork, newest last. */
function getAllArtworks() {
  return artworks.slice();
}

/** Returns one artwork by numeric id, or undefined if not found. */
function getArtworkById(id) {
  return artworks.find(function (item) {
    return item.id === Number(id);
  });
}

/** Appends a new artwork and returns the stored record (with its new id). */
function addArtwork(data) {
  const record = {
    id: nextArtworkId,
    title: data.title,
    artist: data.artist,
    category: data.category,
    // null means the piece is not for sale, which the project plan allows.
    price: data.price === null || data.price === undefined ? null : Number(data.price),
    image: data.image || 'images/placeholder.jpg',
    description: data.description || '',
    submittedAt: new Date().toISOString()
  };

  // Email is optional on the submission form, so only store it when given.
  if (data.email) {
    record.email = data.email;
  }

  nextArtworkId = nextArtworkId + 1;
  artworks.push(record);
  return record;
}

// ---------------------------------------------------------------------------
// Event accessors
// ---------------------------------------------------------------------------

/** Returns a shallow copy of every event. */
function getAllEvents() {
  return events.slice();
}

/** Returns one event by numeric id, or undefined if not found. */
function getEventById(id) {
  return events.find(function (item) {
    return item.id === Number(id);
  });
}

/** Appends a new event and returns the stored record. */
function addEvent(data) {
  const record = {
    id: nextEventId,
    title: data.title,
    date: data.date,
    time: data.time || 'TBA',
    location: data.location,
    price: Number(data.price) || 0,
    description: data.description || ''
  };

  nextEventId = nextEventId + 1;
  events.push(record);
  return record;
}

// ---------------------------------------------------------------------------
// Contact message accessors
// ---------------------------------------------------------------------------

/** Returns every contact message received since the server started. */
function getAllMessages() {
  return messages.slice();
}

/** Stores a contact message and returns it with its new id and timestamp. */
function addMessage(data) {
  const record = {
    id: nextMessageId,
    name: data.name,
    email: data.email,
    subject: data.subject || 'General inquiry',
    message: data.message,
    receivedAt: new Date().toISOString()
  };

  nextMessageId = nextMessageId + 1;
  messages.push(record);
  return record;
}

// ---------------------------------------------------------------------------
// Aggregate stats — powers the /api/stats endpoint.
// ---------------------------------------------------------------------------

function getStats() {
  const categories = {};
  let total = 0;

  let priced = 0;

  for (let i = 0; i < artworks.length; i++) {
    const item = artworks[i];

    // Pieces marked "Not for Sale" carry a null price and are skipped.
    if (typeof item.price === 'number') {
      total = total + item.price;
      priced = priced + 1;
    }

    if (categories[item.category] === undefined) {
      categories[item.category] = 1;
    } else {
      categories[item.category] = categories[item.category] + 1;
    }
  }

  return {
    artworkCount: artworks.length,
    eventCount: events.length,
    messageCount: messages.length,
    averagePrice: priced === 0 ? 0 : Math.round(total / priced),
    byCategory: categories
  };
}

module.exports = {
  getAllArtworks,
  getArtworkById,
  addArtwork,
  getAllEvents,
  getEventById,
  addEvent,
  getAllMessages,
  addMessage,
  getStats
};
