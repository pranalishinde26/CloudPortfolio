/* ============================================================
   CloudPortfolio - script.js
   Edit the CONFIG and PROJECTS sections below to update content.
   No backend, no external libraries.
   ============================================================ */

/* ------------------------------------------------------------
   1. CONTACT CONFIGURATION
   Fill in the values you want to show. Leave a value as "" to
   hide that link. Do not put passwords or API keys here.
   ------------------------------------------------------------ */
const CONFIG = {
  email: "spranali817@gmail.com",     // e.g. "yourname@example.com"
  linkedin: "https://www.linkedin.com/in/pranali-shinde-545690335",  // e.g. "https://www.linkedin.com/in/your-profile"
  github: "https://github.com/pranalishinde26"     // e.g. "https://github.com/your-username"
};

/* ------------------------------------------------------------
   2. PROJECTS
   Each project is one object. Edit title, description, status,
   tech, and links here.
   - category: "Web Development" | "IoT" | "Cloud Computing"
   - planned:  true for ideas or planned projects (shown under
               the "Planned Projects" filter)
   - github:   a real repository URL, or "" to hide the button
   - icon:     any emoji
   - accent:   a CSS colour for the card's top line
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "Smart Water Purification and Quality Monitoring System",
    description: "A proposed system focused on monitoring water quality and supporting water purification in rural and mining-affected areas.",
    status: "Proposed",
    statusClass: "concept",
    category: "IoT",
    planned: false,
    tech: ["IoT Sensors", "Microcontroller", "Backend (planned)", "Dashboard (planned)"],
    icon: "\u{1F4A7}",
    accent: "#22d3ee",
    github: "",
    details: [
      "Focus: water quality monitoring, data visualization, and useful information for communities.",
      "Selected for the internal stage of the Smart India Hackathon.",
      "Planned technologies: IoT sensors, a microcontroller, a backend, and a dashboard.",
      "Note: these technologies are planned or proposed unless implementation is confirmed."
    ]
  },
  {
    title: "Smart Waste Segregation Monitoring System",
    description: "An IoT-oriented concept for monitoring waste segregation and supporting more efficient waste management.",
    status: "Team Project",
    statusClass: "concept",
    category: "IoT",
    planned: false,
    tech: ["CNN", "IoT", "Image Classification", "Dashboard (proposed)"],
    icon: "\u267B\uFE0F",
    accent: "#3b82f6",
    github: "",
    details: [
      "Concept: sensor data, image-based classification, monitoring dashboards, and reward mechanisms.",
      "Team project. Features are listed as proposed unless marked as implemented.",
      "Edit this list in script.js to mark which features are implemented."
    ]
  },
  {
    title: "SkillSwap: Student Skill Exchange Platform",
    description: "A concept for a student platform where students can exchange knowledge, learn from one another, and discover learning partners.",
    status: "Concept",
    statusClass: "planned",
    category: "Web Development",
    planned: true,
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "\u{1F91D}",
    accent: "#8b5cf6",
    github: "",
    details: [
      "Potential features: student profiles, skills offered and skills wanted.",
      "Potential features: matching learners and collaboration opportunities.",
      "This is a concept and is not deployed."
    ]
  },
  {
    title: "Netflix-Inspired Frontend Clone",
    description: "A frontend practice project inspired by streaming-service interfaces, built to demonstrate HTML and CSS layout skills.",
    status: "Learning Project",
    statusClass: "concept",
    category: "Web Development",
    planned: false,
    tech: ["HTML", "CSS"],
    icon: "\u{1F3AC}",
    accent: "#ef4444",
    github: "",
    details: [
      "A learning project built to practise layout and responsive design.",
      "This project is not affiliated with Netflix."
    ]
  },
  {
    title: "CloudPortfolio: Cloud-Based Portfolio Hosting",
    description: "A cloud computing mini project demonstrating static website hosting using Amazon S3 and content delivery through Amazon CloudFront with HTTPS.",
    status: "In Progress",
    statusClass: "in-progress",
    category: "Cloud Computing",
    planned: false,
    tech: ["Amazon S3", "Amazon CloudFront", "Origin Access Control", "HTTPS"],
    icon: "\u2601\uFE0F",
    accent: "#f59e0b",
    github: "",
    diagram: ["Visitor", "HTTPS", "CloudFront", "Private S3 Bucket"],
    details: [
      "Static website hosted on a private Amazon S3 bucket.",
      "Delivered through Amazon CloudFront with HTTPS using the default CloudFront certificate.",
      "Access from CloudFront to S3 is controlled with Origin Access Control.",
      "Labelled In Progress until deployment and testing are complete."
    ]
  },
  {
    title: "Algorithm Visualizer",
    description: "An additional project idea for visualizing algorithms such as BFS, DFS, Dijkstra's algorithm, and A* search.",
    status: "Planned Project",
    statusClass: "planned",
    category: "Web Development",
    planned: true,
    tech: ["JavaScript", "HTML", "CSS"],
    icon: "\u{1F5FA}\uFE0F",
    accent: "#10b981",
    github: "",
    details: [
      "Planned visualizations: BFS, DFS, Dijkstra's algorithm, and A* search.",
      "This is a planned project and has not been implemented yet."
    ]
  },
  {
    title: "AI-Powered Study Assistant",
    description: "A proposed learning tool concept that could organize study material, help students explore topics, and generate practice questions.",
    status: "Project Idea",
    statusClass: "planned",
    category: "Web Development",
    planned: true,
    tech: ["AI / Machine Learning (exploring)"],
    icon: "\u{1F9E0}",
    accent: "#ec4899",
    github: "",
    details: [
      "Idea: organize study material, explore topics, and generate practice questions.",
      "This is a project idea. An AI model or application has not been built yet."
    ]
  }
];

/* ------------------------------------------------------------
   3. SMALL HELPERS
   ------------------------------------------------------------ */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ------------------------------------------------------------
   4. INITIALISE WHEN THE PAGE IS READY
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");

  setupPhotoFallback();
  renderProjects("All");
  setupFilters();
  setupProjectDialog();
  setupMobileMenu();
  setupActiveNav();
  setupRevealOnScroll();
  setupBackToTop();
  setupContactLinks();
  setupDeploymentStatus();
  setYear();
});

/* ------------------------------------------------------------
   5. PROFILE PHOTO FALLBACK
   If assets/profile.jpg is missing, show the "PS" monogram.
   ------------------------------------------------------------ */
function setupPhotoFallback() {
  const img = document.getElementById("profile-photo");
  const frame = document.getElementById("photo-frame");
  if (!img || !frame) return;

  const showFallback = () => frame.classList.add("no-photo");

  img.addEventListener("error", showFallback);
  // If the image already failed before this script ran
  if (img.complete && img.naturalWidth === 0) showFallback();
}

/* ------------------------------------------------------------
   6. PROJECT CARDS AND FILTERING
   ------------------------------------------------------------ */
let currentFilter = "All";

function getFilteredProjects(filter) {
  if (filter === "All") return PROJECTS;
  if (filter === "Planned Projects") return PROJECTS.filter((p) => p.planned);
  return PROJECTS.filter((p) => p.category === filter);
}

function renderProjects(filter) {
  currentFilter = filter;
  const grid = document.getElementById("project-grid");
  const emptyState = document.getElementById("empty-state");
  if (!grid) return;

  grid.innerHTML = "";
  const list = getFilteredProjects(filter);

  list.forEach((project) => {
    grid.appendChild(createProjectCard(project));
  });

  if (emptyState) emptyState.hidden = list.length > 0;

  // Newly rendered cards should be visible immediately
  grid.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
}

function createProjectCard(project) {
  const card = el("article", "card project-card reveal");
  card.style.setProperty("--card-accent", project.accent);
  card.style.setProperty("--card-accent-soft", hexToRgba(project.accent, 0.25));

  const visual = el("div", "project-visual", project.icon);
  visual.setAttribute("aria-hidden", "true");
  card.appendChild(visual);

  card.appendChild(el("span", "status-pill " + project.statusClass, project.status));
  card.appendChild(el("h3", "", project.title));
  card.appendChild(el("p", "desc", project.description));

  // Small architecture flow for the cloud project
  if (project.diagram) {
    const flow = el("div", "flow");
    flow.setAttribute("aria-label", "Architecture: " + project.diagram.join(" to "));
    project.diagram.forEach((step, index) => {
      flow.appendChild(el("span", "", step));
      if (index < project.diagram.length - 1) flow.appendChild(el("i", "", "\u2192"));
    });
    card.appendChild(flow);
  }

  const tags = el("ul", "tags");
  project.tech.forEach((t) => tags.appendChild(el("li", "", t)));
  card.appendChild(tags);

  const actions = el("div", "project-actions");

  const detailsBtn = el("button", "btn btn-outline btn-small", "View Details");
  detailsBtn.type = "button";
  detailsBtn.addEventListener("click", () => openProjectDialog(project, detailsBtn));
  actions.appendChild(detailsBtn);

  if (project.github && project.github.startsWith("http")) {
    const gh = el("a", "btn btn-primary btn-small", "GitHub");
    gh.href = project.github;
    gh.target = "_blank";
    gh.rel = "noopener noreferrer";
    actions.appendChild(gh);
  }

  card.appendChild(actions);
  return card;
}

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      renderProjects(filter);
    });
  });
}

/* ------------------------------------------------------------
   7. PROJECT DETAILS DIALOG
   ------------------------------------------------------------ */
let lastFocusedButton = null;

function setupProjectDialog() {
  const dialog = document.getElementById("project-dialog");
  const closeBtn = document.getElementById("dialog-close");
  if (!dialog || !closeBtn) return;

  closeBtn.addEventListener("click", () => dialog.close());

  // Close when clicking the dark backdrop outside the box
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    if (lastFocusedButton) lastFocusedButton.focus();
  });
}

function openProjectDialog(project, triggerButton) {
  const dialog = document.getElementById("project-dialog");
  if (!dialog) return;

  lastFocusedButton = triggerButton;

  const status = document.getElementById("dialog-status");
  status.textContent = project.status;
  status.className = "status-pill " + project.statusClass;

  document.getElementById("dialog-title").textContent = project.title;
  document.getElementById("dialog-desc").textContent = project.description;

  const detailList = document.getElementById("dialog-details");
  detailList.innerHTML = "";
  project.details.forEach((line) => detailList.appendChild(el("li", "", line)));

  const tagList = document.getElementById("dialog-tags");
  tagList.innerHTML = "";
  project.tech.forEach((t) => tagList.appendChild(el("li", "", t)));

  dialog.showModal();
}

/* ------------------------------------------------------------
   8. MOBILE MENU
   ------------------------------------------------------------ */
function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-links");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!menu.classList.contains("open"));
  });

  // Close the menu after choosing a link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  // Close with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ------------------------------------------------------------
   9. ACTIVE SECTION HIGHLIGHT IN THE NAVBAR
   ------------------------------------------------------------ */
function setupActiveNav() {
  const links = document.querySelectorAll("[data-nav]");
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ------------------------------------------------------------
   10. REVEAL ON SCROLL (subtle; skipped when reduced motion is on)
   ------------------------------------------------------------ */
function setupRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => {
    if (!item.classList.contains("visible")) observer.observe(item);
  });
}

/* ------------------------------------------------------------
   11. BACK TO TOP BUTTON
   ------------------------------------------------------------ */
function setupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const update = () => {
    btn.hidden = window.scrollY < 500;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ------------------------------------------------------------
   12. CONTACT LINKS (hidden automatically when empty)
   ------------------------------------------------------------ */
function setupContactLinks() {
  const emailLink = document.getElementById("link-email");
  const linkedinLink = document.getElementById("link-linkedin");
  const githubLink = document.getElementById("link-github");
  const fallback = document.getElementById("contact-fallback");

  let anyVisible = false;

  if (emailLink && CONFIG.email) {
    emailLink.href = "mailto:" + CONFIG.email;
    emailLink.querySelector("[data-value]").textContent = CONFIG.email;
    emailLink.hidden = false;
    anyVisible = true;
  }

  if (linkedinLink && CONFIG.linkedin) {
    linkedinLink.href = CONFIG.linkedin;
    linkedinLink.hidden = false;
    anyVisible = true;
  }

  if (githubLink && CONFIG.github) {
    githubLink.href = CONFIG.github;
    githubLink.hidden = false;
    anyVisible = true;
  }

  if (fallback) fallback.hidden = anyVisible;
}

/* ------------------------------------------------------------
   13. DEPLOYMENT STATUS BADGE
   Change "Development" to "Deployed" in index.html after the
   site is live. This function only updates the text.
   ------------------------------------------------------------ */
function setupDeploymentStatus() {
  const badge = document.getElementById("deploy-status");
  if (!badge) return;
  const status = badge.dataset.status || "Development";
  badge.textContent = "Deployment Status: " + status;
}

/* ------------------------------------------------------------
   14. FOOTER YEAR
   ------------------------------------------------------------ */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
