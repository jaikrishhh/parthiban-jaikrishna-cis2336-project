# ArtConnect — CIS 2336 Web Project (Phases 2-3: Front-end & Back-end)

ArtConnect is a curated platform where beginner and professional artists showcase
their artwork, promote art events, and connect with enthusiasts and collectors —
without needing any technical expertise.

**Live site:** https://jaikrishhh.github.io/parthiban-jaikrishna-cis2336-project/
**Repository:** https://github.com/jaikrishhh/parthiban-jaikrishna-cis2336-project

Built by **Jaikrishna Parthiban** · jparthib@cougarnet.uh.edu
University of Houston · CIS 2336 Internet Applications Development

---

## Project structure

```
parthiban-jaikrishna-cis2336-project
│
├── index.html            ← root redirect to frontend/ (for GitHub Pages)
├── README.md
│
├── frontend
│   ├── index.html        ← Homepage
│   ├── css
│   │   └── style.css     ← Single site-wide stylesheet (design tokens + components)
│   ├── js
│   │   └── script.js     ← Single site-wide script (data + all interactivity)
│   ├── images
│   │   ├── logo.svg
│   │   └── artwork-placeholder.svg
│   └── pages
│       ├── gallery.html
│       ├── events.html
│       ├── submit.html
│       ├── faq.html
│       └── references.html
│
└── backend               ← reserved for a future phase (Node.js/Express)
```

## Pages & features

| Page | Highlights |
|---|---|
| **Home** | Hero with CTA buttons, platform intro, featured artwork (JS-rendered), featured event, embedded Met Museum exhibition video, developer contact |
| **Gallery** | 8 artworks rendered from a JS data array; category filter buttons (generated from the data), live search, 5 sort options, click-to-enlarge detail modal with full "wall label" info |
| **Events** | 4 upcoming events rendered from a JS data array; "Event details" reveals full description dynamically |
| **Submit Art** | Artist submission form with full client-side validation (required fields, email format, numeric price ≥ 0, minimum description length) and inline error messages. No backend yet — Phase 2 is front-end only |
| **FAQ** | 6 questions in an accessible expand/collapse accordion (one open at a time) |
| **References** | Image & multimedia credits, external resources, and the verbatim AI prompt log required by the course integrity policy |

## Design system

Implemented from the Phase 1 Planning & Design document:

- **Palette:** Deep Navy `#0D1B2A`, Warm Amber `#C8852A`, Warm Cream `#F8F5F0`,
  Charcoal `#2C2C2C`, Slate Gray `#6B7280`, Coral `#E85D4A`
- **Typography:** Playfair Display (display/headlines) + Inter (headings, body,
  captions) via Google Fonts
- **Signature element:** artwork cards styled as framed pieces with museum
  "wall label" placards (italic serif title, artist line, small-caps category,
  price tag)
- Responsive down to mobile (hamburger navigation ≤ 720px), WCAG-minded focus
  states, `prefers-reduced-motion` respected

## Technical notes

- **No build step.** Plain HTML5, CSS3, and vanilla ES6+ JavaScript.
- One shared `script.js` powers every page; each feature checks for its page's
  elements before initializing.
- Gallery artworks are public-domain masterworks served from Wikimedia Commons
  via the stable `Special:FilePath` endpoint. A capture-phase `error` listener
  swaps any image that fails to load for a local SVG placeholder, so the site
  never shows a broken image.
- The submission form intentionally does not POST anywhere yet; the backend
  (Node.js/Express, in-memory array storage) arrives in a later phase per the
  project plan.

## Run locally

No server required — open `frontend/index.html` in a browser, or from the repo
root run:

```
python -m http.server 8000
```

then visit `http://localhost:8000/frontend/`.

## Deployment

Hosted on **GitHub Pages** from the `main` branch root. The root `index.html`
redirects into `frontend/`, so both of these work:

- `https://jaikrishhh.github.io/parthiban-jaikrishna-cis2336-project/`
- `https://jaikrishhh.github.io/parthiban-jaikrishna-cis2336-project/frontend/`

## Credits & AI use

All image, multimedia, and AI prompt documentation lives on the site's
[References page](frontend/pages/references.html), per the course academic
integrity requirements. Development was assisted by Claude (Anthropic); the
developer reviewed, tested, and deployed all code.
# Backend Documentation (Phase 3)

> Paste this whole file into the bottom of your root `README.md`, below the
> existing Phase 2 content. Then change the README's top heading from
> "Phase 2: Front-end" to "Phases 2–3: Front-end & Back-end".

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js 18+ |
| Framework | Express 4 |
| Data storage | In-memory JavaScript arrays (no external database) |
| Front end | HTML5, CSS3, vanilla JavaScript (Phase 2) |

Artwork, event, and message data is held in memory for the lifetime of the
process, as the project specification calls for temporary server-side storage.
Restarting the server resets everything to the seeded baseline.

---

## Running the Backend Locally

```bash
# from the repository root
cd backend
npm install
npm start
```

The server starts on **http://localhost:3000** and serves both the API and the
Phase 2 front end from the same origin, so relative `fetch('/api/...')` calls
work with no CORS configuration.

| Script | Purpose |
| --- | --- |
| `npm start` | Run the server normally |
| `npm run dev` | Run with `--watch` so edits restart the server automatically |

Set a different port with the `PORT` environment variable, e.g. `PORT=4000 npm start`.

---

## Folder Structure

```
backend/
├── server.js              Entry point: middleware, static hosting, route mounting,
│                          404 and error handlers
├── package.json           Dependencies and npm scripts
├── data/
│   └── store.js           In-memory data layer + accessor functions
├── middleware/
│   ├── logger.js          Logs method, URL, status, and duration per request
│   └── validate.js        Server-side validation for all three POST endpoints
└── routes/
    ├── artworks.js        /api/artworks
    ├── events.js          /api/events
    └── contact.js         /api/contact
```

Route files never touch the raw arrays — all reads and writes go through
`data/store.js`. If this were ever migrated to a real database, that one file
would be the only thing to rewrite.

---

## Data Models

**Artwork**

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | Assigned by the server |
| `title` | string | Required, max 120 chars |
| `artist` | string | Required |
| `email` | string | Required, validated format |
| `category` | string | Required, must be one of the six valid categories |
| `price` | number | Required, ≥ 0 |
| `image` | string | Optional, defaults to a placeholder path |
| `description` | string | Optional, max 500 chars |
| `submittedAt` | ISO string | Assigned by the server |

Valid categories: `Painting`, `Photography`, `Sculpture`, `Digital Art`,
`Drawing`, `Mixed Media`.

**Event**

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | Assigned by the server |
| `title` | string | Required |
| `date` | string | Required, `YYYY-MM-DD` |
| `time` | string | Optional, defaults to `TBA` |
| `location` | string | Required |
| `price` | number | Optional, defaults to 0 |
| `description` | string | Optional |

**Contact Message**

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | Assigned by the server |
| `name` | string | Required |
| `email` | string | Required, validated format |
| `subject` | string | Optional, defaults to "General inquiry" |
| `message` | string | Required, 10–1000 chars |
| `receivedAt` | ISO string | Assigned by the server |

---

## API Reference

Base URL: `http://localhost:3000/api`

### Artworks

| Method | Endpoint | Body | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/artworks` | — | `200` `{success, count, artworks[]}` | — |
| GET | `/api/artworks/:id` | — | `200` `{success, artwork}` | `404` if no match |
| POST | `/api/artworks` | `{title, artist, email, category, price, description?}` | `201` `{success, message, artwork}` | `400` with per-field `errors` |

Query parameters on `GET /api/artworks` (all optional, combinable):

| Parameter | Example | Effect |
| --- | --- | --- |
| `category` | `?category=Painting` | Exact category match |
| `search` | `?search=bayou` | Case-insensitive match on title or artist |
| `max` | `?max=500` | Only pieces at or below this price |
| `sort` | `?sort=price-asc` | `price-asc`, `price-desc`, `title`, or `newest` |

### Events

| Method | Endpoint | Body | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/events` | — | `200` `{success, count, events[]}` | — |
| GET | `/api/events/:id` | — | `200` `{success, event}` | `404` if no match |
| POST | `/api/events` | `{title, date, location, time?, price?, description?}` | `201` `{success, message, event}` | `400` with per-field `errors` |

Query parameters: `?upcoming=true`, `?free=true`, `?sort=date`.

### Contact

| Method | Endpoint | Body | Success | Errors |
| --- | --- | --- | --- | --- |
| POST | `/api/contact` | `{name, email, message, subject?}` | `201` `{success, message, reference}` | `400` with per-field `errors` |
| GET | `/api/contact` | — | `200` `{success, count, messages[]}` | — |

### Utility

| Method | Endpoint | Returns |
| --- | --- | --- |
| GET | `/api/stats` | Counts by category, average price, totals |
| GET | `/api/health` | Liveness check and uptime in seconds |

---

## Middleware

Middleware is registered in `server.js` in a deliberate order, since Express
runs it top to bottom:

1. **`express.json()`** — parses JSON request bodies. Must come before any
   route that reads `req.body`, or `req.body` is `undefined`.
2. **`express.urlencoded({ extended: true })`** — parses standard HTML form
   posts, so the API accepts both `fetch` and a plain `<form>` submission.
3. **`logger`** (custom) — hooks the response's `finish` event and logs the
   method, URL, final status code, and duration of every request.
4. **`express.static`** — serves the Phase 2 pages. Two mounts are registered
   (repository root and `frontend/`) so either project layout works.
5. **Route modules** — `/api/artworks`, `/api/events`, `/api/contact`.
6. **404 handler** — reached only when nothing above matched. Returns JSON for
   `/api/*` paths and a short HTML page otherwise.
7. **Error handler** — takes four arguments (`err, req, res, next`), which is
   what marks it as an error handler in Express. Logs the stack and returns a
   `500` without leaking internals to the client.

### Validation

`middleware/validate.js` exports one validator per POST route. Each runs
*before* its handler, so an invalid request never reaches the data store.
Failures return `400` with a structured object keyed by field name:

```json
{
  "success": false,
  "message": "Please correct the highlighted fields and try again.",
  "errors": {
    "email": "Enter a valid email address.",
    "price": "Price must be a number of 0 or more."
  }
}
```

The front end reads that `errors` object and prints each message beneath the
matching input. This validation runs on the **server** and is independent of
any HTML5 `required` attributes — client-side checks are a convenience, not a
security control, since they can be bypassed entirely.

---

## Testing the API

With the server running, from a second terminal:

```bash
# List all artwork, cheapest first
curl "http://localhost:3000/api/artworks?sort=price-asc"

# Rejected submission — returns 400 with per-field errors
curl -X POST http://localhost:3000/api/artworks \
  -H "Content-Type: application/json" \
  -d '{"title":"","email":"not-an-email"}'

# Accepted submission — returns 201
curl -X POST http://localhost:3000/api/artworks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Piece","artist":"Jai P","email":"jai@uh.edu","category":"Painting","price":400}'

# Confirm it was stored
curl http://localhost:3000/api/artworks
```
