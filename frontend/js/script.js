"use strict";

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

const qs = (sel, scope) => (scope || document).querySelector(sel);
const qsa = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));

const ROOT = document.body.dataset.root || ".";
const PLACEHOLDER = ROOT + "/images/artwork-placeholder.svg";

function formatPrice(price) {
  return price === null ? "Not for Sale" : "$" + price.toLocaleString();
}

(function initNav() {
  const toggle = qs(".nav-toggle");
  const links = qs(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
})();

document.addEventListener(
  "error",
  (e) => {
    const el = e.target;
    if (el.tagName === "IMG" && !el.dataset.fallbackApplied) {
      el.dataset.fallbackApplied = "true";
      el.src = PLACEHOLDER;
    }
  },
  true
);

function buildArtCard(art) {
  const card = document.createElement("button");
  card.className = "art-card";
  card.type = "button";
  card.setAttribute("aria-haspopup", "dialog");
  card.setAttribute("aria-label", "View details for " + art.title + " by " + art.artist);
  card.innerHTML =
    '<div class="art-frame">' +
    '<img src="' + art.img + '" alt="' + art.title + " by " + art.artist + '" loading="lazy">' +
    "</div>" +
    '<div class="placard">' +
    '<p class="placard-title">' + art.title + "</p>" +
    '<p class="placard-artist">' + art.artist + " · " + art.year + "</p>" +
    '<div class="placard-meta">' +
    '<span class="placard-category">' + art.category + "</span>" +
    '<span class="price-tag' + (art.price === null ? " price-tag--nfs" : "") + '">' +
    formatPrice(art.price) +
    "</span>" +
    "</div>" +
    "</div>";
  card.addEventListener("click", () => openArtModal(art));
  return card;
}

function openArtModal(art) {
  const backdrop = qs("#art-modal");
  if (!backdrop) return;
  qs("#modal-img").src = art.img;
  qs("#modal-img").alt = art.title + " by " + art.artist;
  qs("#modal-title").textContent = art.title;
  qs("#modal-artist").textContent = art.artist + " · " + art.year + " · " + art.medium;
  qs("#modal-category").textContent = art.category;
  qs("#modal-price").textContent = formatPrice(art.price);
  qs("#modal-price").className = "price-tag" + (art.price === null ? " price-tag--nfs" : "");
  qs("#modal-desc").textContent = art.description;
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
  qs(".modal-close", backdrop).focus();
}

(function initModal() {
  const backdrop = qs("#art-modal");
  if (!backdrop) return;
  const close = () => {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  };
  qs(".modal-close", backdrop).addEventListener("click", close);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

(function initGallery() {
  const grid = qs("#gallery-grid");
  if (!grid) return;

  const searchInput = qs("#gallery-search");
  const sortSelect = qs("#gallery-sort");
  const filterWrap = qs("#gallery-filters");
  const emptyNote = qs("#gallery-empty");
  let activeCategory = "All";

  const categories = ["All"].concat(
    Array.from(new Set(ARTWORKS.map((a) => a.category)))
  );
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === "All" ? " active" : "");
    btn.type = "button";
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      qsa(".filter-btn", filterWrap).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
    filterWrap.appendChild(btn);
  });

  function currentList() {
    let list = ARTWORKS.slice();

    if (activeCategory !== "All") {
      list = list.filter((a) => a.category === activeCategory);
    }

    const term = (searchInput.value || "").trim().toLowerCase();
    if (term) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.artist.toLowerCase().includes(term) ||
          a.category.toLowerCase().includes(term)
      );
    }

    switch (sortSelect.value) {
      case "title":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "artist":
        list.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case "price":

        list.sort((a, b) => {
          if (a.price === null && b.price === null) return 0;
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
        break;
      case "year":
        list.sort((a, b) => a.year - b.year);
        break;
    }
    return list;
  }

  function render() {
    grid.innerHTML = "";
    const list = currentList();
    list.forEach((art) => grid.appendChild(buildArtCard(art)));
    emptyNote.style.display = list.length ? "none" : "block";
  }

  searchInput.addEventListener("input", render);
  sortSelect.addEventListener("change", render);
  render();
})();

(function initHome() {
  const featuredGrid = qs("#featured-grid");
  if (featuredGrid) {

    [ARTWORKS[0], ARTWORKS[1], ARTWORKS[2]].forEach((art) =>
      featuredGrid.appendChild(buildArtCard(art))
    );
  }

  const featuredEvent = qs("#featured-event");
  if (featuredEvent) {
    const ev = EVENTS[2];
    featuredEvent.innerHTML =
      '<img src="' + ev.img + '" alt="Cover image for ' + ev.title + '">' +
      '<div class="event-body">' +
      '<span class="event-date">' + ev.date + "</span>" +
      "<h3>" + ev.title + "</h3>" +
      '<p class="event-location">' + ev.location + "</p>" +
      "<p>" + ev.summary + "</p>" +
      '<a class="btn btn--dark event-toggle" href="pages/events.html">See all events</a>' +
      "</div>";
  }
})();

(function initEvents() {
  const list = qs("#event-list");
  if (!list) return;

  EVENTS.forEach((ev) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML =
      '<img src="' + ev.img + '" alt="Cover image for ' + ev.title + '" loading="lazy">' +
      '<div class="event-body">' +
      '<span class="event-date">' + ev.date + "</span>" +
      "<h3>" + ev.title + "</h3>" +
      '<p class="event-location">' + ev.location + "</p>" +
      "<p>" + ev.summary + "</p>" +
      '<button class="btn btn--dark event-toggle" type="button" aria-expanded="false">Event details</button>' +
      '<div class="event-details"><p>' + ev.details + "</p></div>" +
      "</div>";

    const btn = qs(".event-toggle", card);
    btn.addEventListener("click", () => {
      const expanded = card.classList.toggle("expanded");
      btn.textContent = expanded ? "Hide details" : "Event details";
      btn.setAttribute("aria-expanded", String(expanded));
    });

    list.appendChild(card);
  });
})();

(function initFaq() {
  const items = qsa(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const btn = qs(".faq-question", item);
    const answer = qs(".faq-answer", item);
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      items.forEach((other) => {
        other.classList.remove("open");
        qs(".faq-answer", other).style.maxHeight = null;
        qs(".faq-question", other).setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

(function initSubmitForm() {
  const form = qs("#submit-form");
  if (!form) return;

  const successBox = qs("#form-success");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validators = {
    "artist-name": (v) =>
      v.trim().length >= 2 || "Please enter the artist's name (at least 2 characters).",
    "artist-email": (v) =>
      emailPattern.test(v.trim()) || "Please enter a valid email address, e.g. name@example.com.",
    "artwork-title": (v) =>
      v.trim().length >= 2 || "Please enter the artwork title (at least 2 characters).",
    "artwork-category": (v) => v !== "" || "Please choose a category.",
    "artwork-price": (v) => {
      if (v.trim() === "") return "Please enter a price (enter 0 if the piece is not for sale).";
      const n = Number(v);
      if (Number.isNaN(n)) return "Price must be a number.";
      if (n < 0) return "Price cannot be negative.";
      return true;
    },
    "artwork-description": (v) =>
      v.trim().length >= 20 || "Please describe the artwork in at least 20 characters."
  };

  function validateField(input) {
    const rule = validators[input.id];
    if (!rule) return true;
    const result = rule(input.value);
    const field = input.closest(".form-field");
    const errorEl = qs(".error-msg", field);
    if (result === true) {
      field.classList.remove("invalid");
      errorEl.textContent = "";
      return true;
    }
    field.classList.add("invalid");
    errorEl.textContent = result;
    return false;
  }

  qsa("input, select, textarea", form).forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".form-field").classList.contains("invalid")) {
        validateField(input);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Phase 3 - submit the form to the Express backend.
  //
  // The client-side validation above still runs first as a convenience, but it
  // is not the real gate: the server re-validates every field independently,
  // because anything checked in the browser can be bypassed. The message shown
  // to the user comes from the server's response, not from this file.
  // -------------------------------------------------------------------------
  const API_URL = "/api/artworks";

  // The API reports errors under its own short field names. This maps them
  // back to the input ids on this page so each message lands under the right
  // input, reusing the same .invalid / .error-msg markup as the local checks.
  const INPUT_ID_FOR_API_FIELD = {
    title: "artwork-title",
    artist: "artist-name",
    email: "artist-email",
    category: "artwork-category",
    price: "artwork-price",
    description: "artwork-description"
  };

  function showServerErrors(errors) {
    Object.keys(errors).forEach((key) => {
      const input = qs("#" + (INPUT_ID_FOR_API_FIELD[key] || key));
      if (!input) return;
      const field = input.closest(".form-field");
      field.classList.add("invalid");
      qs(".error-msg", field).textContent = errors[key];
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successBox.classList.remove("show");

    let firstInvalid = null;
    qsa("input, select, textarea", form).forEach((input) => {
      const ok = validateField(input);
      if (!ok && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const submitBtn = qs("button[type='submit']", form);
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting\u2026";
    }

    // FormData reads each input by its name attribute, so the payload keys
    // match the form markup exactly; the backend maps them to its own names.
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // A 400 means the server rejected the data - show its per-field errors.
      if (!response.ok) {
        if (result.errors) showServerErrors(result.errors);
        successBox.textContent =
          result.message || "Submission failed. Please check the fields above.";
        successBox.classList.add("show");
        return;
      }

      successBox.textContent =
        result.message +
        " Our curation team reviews new submissions within 3 business days.";
      successBox.classList.add("show");
      form.reset();
      qsa(".form-field", form).forEach((f) => f.classList.remove("invalid"));
    } catch (err) {
      console.error("Submission failed:", err);
      successBox.textContent =
        "Could not reach the server. Start the backend by running " +
        "\u201Cnpm start\u201D inside the backend folder, then try again.";
      successBox.classList.add("show");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit artwork";
      }
    }
  });
})();

qsa(".js-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
