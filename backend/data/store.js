/**
 * store.js - In-memory data layer for ArtConnect.
 *
 * The project specification calls for submitted data to be held *temporarily*
 * on the server, so no external database is used. Everything lives in module
 * scope and resets when the server restarts.
 *
 * The seed arrays below are the same eight artworks and four events the Phase 2
 * front end shipped with, in the same object shape. Because the server is now
 * the single source of truth, the gallery, homepage, and events page all render
 * from these arrays via the API - and a newly submitted piece appears in the
 * gallery alongside the seeded ones with no shape conversion anywhere.
 *
 * Route files never touch these arrays directly; everything goes through the
 * accessor functions exported at the bottom. If this were ever moved to a real
 * database, this file would be the only one that changed.
 */

const WM = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const ARTWORKS = [
  {
    id: 1,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    category: "Post-Impressionism",
    medium: "Oil on canvas",
    price: null,
    img: WM + "Vincent%20van%20Gogh%20-%20The%20Starry%20Night%20-%20Google%20Art%20Project.jpg?width=900",
    description:
      "Painted from the window of his asylum room at Saint-Rémy-de-Provence, van Gogh's swirling night sky has become one of the most recognized images in Western art."
  },
  {
    id: 2,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: 1831,
    category: "Ukiyo-e",
    medium: "Woodblock print",
    price: 240,
    img: WM + "Tsunami%20by%20hokusai%2019th%20century.jpg?width=900",
    description:
      "The most famous print from Hokusai's series Thirty-Six Views of Mount Fuji. An immense wave towers over fishing boats while Fuji sits calmly in the distance. Archival reproduction print."
  },
  {
    id: 3,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: 1665,
    category: "Baroque",
    medium: "Oil on canvas",
    price: null,
    img: WM + "Meisje%20met%20de%20parel.jpg?width=900",
    description:
      "Often called the 'Mona Lisa of the North,' Vermeer's tronie of a girl in exotic dress and a large pearl earring is celebrated for its luminous treatment of light."
  },
  {
    id: 4,
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: 1908,
    category: "Symbolism",
    medium: "Oil and gold leaf on canvas",
    price: null,
    img: WM + "Gustav%20Klimt%20016.jpg?width=900",
    description:
      "The high point of Klimt's Golden Period: an embracing couple wrapped in gilded, mosaic-like robes, blending Byzantine ornament with modern intimacy."
  },
  {
    id: 5,
    title: "Wanderer above the Sea of Fog",
    artist: "Caspar David Friedrich",
    year: 1818,
    category: "Romanticism",
    medium: "Oil on canvas",
    price: 210,
    img: WM + "Wanderer%20above%20the%20sea%20of%20fog.jpg?width=900",
    description:
      "A lone figure surveys a fog-shrouded landscape from a rocky summit — the definitive image of Romantic contemplation of nature. Archival reproduction print."
  },
  {
    id: 6,
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    year: 1872,
    category: "Impressionism",
    medium: "Oil on canvas",
    price: null,
    img: WM + "Claude%20Monet%2C%20Impression%2C%20soleil%20levant.jpg?width=900",
    description:
      "The hazy harbor view of Le Havre that gave Impressionism its name, after a critic mocked its 'unfinished' look — a label the artists embraced."
  },
  {
    id: 7,
    title: "American Gothic",
    artist: "Grant Wood",
    year: 1930,
    category: "Regionalism",
    medium: "Oil on beaverboard",
    price: null,
    img: WM + "Grant%20Wood%20-%20American%20Gothic%20-%20Google%20Art%20Project.jpg?width=900",
    description:
      "A farmer and his daughter stand before a Carpenter Gothic farmhouse in one of the most parodied — and most beloved — images of American art."
  },
  {
    id: 8,
    title: "Café Terrace at Night",
    artist: "Vincent van Gogh",
    year: 1888,
    category: "Post-Impressionism",
    medium: "Oil on canvas",
    price: 180,
    img: WM + "Van%20Gogh%20-%20Terrasse%20des%20Caf%C3%A9s%20an%20der%20Place%20du%20Forum%20in%20Arles%20am%20Abend1.jpeg?width=900",
    description:
      "A glowing café on the Place du Forum in Arles under a star-filled sky — painted on location, without a trace of black. Archival reproduction print."
  }
];

const EVENTS = [
  {
    id: 1,
    title: "Impressionist Evenings: Light & Water",
    date: "Saturday, August 8, 2026 · 6:00–9:00 PM",
    location: "Houston Art Collective, Montrose, Houston, TX",
    img: ARTWORKS[5].img,
    summary: "An evening exhibition celebrating Impressionist approaches to light, water, and atmosphere.",
    details:
      "Join local painters and art historians for a guided walk-through of Impressionist technique, from broken color to painting en plein air. The evening includes a live demonstration, refreshments, and a Q&A panel with three Houston-based landscape painters. Free for ArtConnect members; $10 general admission."
  },
  {
    id: 2,
    title: "Waves of the Floating World: Ukiyo-e Printmaking Workshop",
    date: "Saturday, August 15, 2026 · 1:00–4:00 PM",
    location: "Katy Community Art Studio, Katy, TX",
    img: ARTWORKS[1].img,
    summary: "A hands-on introduction to Japanese woodblock printing traditions.",
    details:
      "Learn the basics of ukiyo-e woodblock printing: carving, inking, and pulling your own print inspired by Hokusai's wave. All materials provided; no experience required. Limited to 20 participants — registration through the Submit Artwork page contact email. $35 materials fee."
  },
  {
    id: 3,
    title: "Open Studio Night: Emerging Houston Artists",
    date: "Saturday, August 22, 2026 · 5:00–10:00 PM",
    location: "Sawyer Yards, Houston, TX",
    img: ARTWORKS[7].img,
    summary: "Meet 40+ emerging artists in their studios across the Sawyer Yards campus.",
    details:
      "ArtConnect partners with Sawyer Yards for a night of open studios, live painting, and pop-up exhibitions. Meet the artists behind the work, purchase directly from studios, and discover new favorites before the wider art market does. Free admission and parking."
  },
  {
    id: 4,
    title: "Portraits & Presence: Figure Drawing Intensive",
    date: "Saturday, September 5, 2026 · 10:00 AM–3:00 PM",
    location: "University of Houston School of Art, Houston, TX",
    img: ARTWORKS[2].img,
    summary: "A full-day figure and portrait drawing intensive with live models.",
    details:
      "Structured sessions move from two-minute gestures to a three-hour sustained portrait study, with individual instructor feedback throughout. Easels and drawing boards provided; bring your own dry media. $45 for students with ID, $60 general."
  }
];

// ---------------------------------------------------------------------------
// Contact messages - starts empty, filled by POST /api/contact.
// ---------------------------------------------------------------------------
const messages = [];

// ID counters start above the highest seeded id so new records never collide.
let nextArtworkId = ARTWORKS.length + 1;
let nextEventId = EVENTS.length + 1;
let nextMessageId = 1;

// ---------------------------------------------------------------------------
// Artwork accessors
// ---------------------------------------------------------------------------

/** Returns a shallow copy of every artwork, newest last. */
function getAllArtworks() {
  return ARTWORKS.slice();
}

/** Returns one artwork by numeric id, or undefined if not found. */
function getArtworkById(id) {
  return ARTWORKS.find(function (item) {
    return item.id === Number(id);
  });
}

/**
 * Appends a new artwork and returns the stored record.
 *
 * The submission form collects title, artist, category, price and description.
 * The gallery card additionally displays `year` and `medium`, and the modal
 * shows both, so sensible defaults are filled in here rather than leaving the
 * card with "undefined" printed on it.
 */
function addArtwork(data) {
  const record = {
    id: nextArtworkId,
    title: data.title,
    artist: data.artist,
    year: data.year ? Number(data.year) : new Date().getFullYear(),
    category: data.category,
    medium: data.medium || "Not specified",
    // null means the piece is not for sale, which the front end renders as a
    // "Not for Sale" label instead of a price.
    price: data.price === null || data.price === undefined ? null : Number(data.price),
    // Empty string tells the front end to substitute its placeholder image.
    img: data.img || data.image || "",
    description: data.description || "",
    submittedAt: new Date().toISOString()
  };

  // Email is optional on the submission form, so only store it when given.
  if (data.email) {
    record.email = data.email;
  }

  nextArtworkId = nextArtworkId + 1;
  ARTWORKS.push(record);
  return record;
}

// ---------------------------------------------------------------------------
// Event accessors
// ---------------------------------------------------------------------------

/** Returns a shallow copy of every event. */
function getAllEvents() {
  return EVENTS.slice();
}

/** Returns one event by numeric id, or undefined if not found. */
function getEventById(id) {
  return EVENTS.find(function (item) {
    return item.id === Number(id);
  });
}

/** Appends a new event and returns the stored record. */
function addEvent(data) {
  const record = {
    id: nextEventId,
    title: data.title,
    date: data.date,
    location: data.location,
    img: data.img || "",
    summary: data.summary || "",
    details: data.details || data.description || ""
  };

  nextEventId = nextEventId + 1;
  EVENTS.push(record);
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
    subject: data.subject || "General inquiry",
    message: data.message,
    receivedAt: new Date().toISOString()
  };

  nextMessageId = nextMessageId + 1;
  messages.push(record);
  return record;
}

// ---------------------------------------------------------------------------
// Aggregate stats - powers GET /api/stats.
// ---------------------------------------------------------------------------

function getStats() {
  const categories = {};
  let total = 0;
  let priced = 0;

  for (let i = 0; i < ARTWORKS.length; i++) {
    const item = ARTWORKS[i];

    // Pieces marked "Not for Sale" carry a null price and are skipped.
    if (typeof item.price === "number") {
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
    artworkCount: ARTWORKS.length,
    eventCount: EVENTS.length,
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
