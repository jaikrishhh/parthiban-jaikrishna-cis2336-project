# ArtConnect — CIS 2336 Web Project (Phase 2: Front-end)

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
