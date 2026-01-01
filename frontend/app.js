// app.js — Maison Kayser Menu (scroll-to-section + radio navbar + accordions)
// Requires: menu-data.js providing menuData.fr and menuData.en
// HTML requires: #navbar, #content, #lang-fr, #lang-en, #hero-subtitle, #hero-intro

let currentLang = detectLanguage();
let activeSectionId = null;
let sectionObserver = null;

/* ---------- HERO TEXT (FR/EN) ---------- */
const HERO_TEXT = {
    fr: {
        subtitle: "Artisan Boulanger depuis Paris",
        intro:
            "Tous nos pains sont pétris, façonnés et cuits sur place par nos artisans. Élaborés avec des farines sélectionnées et du levain liquide."
    },
    en: {
        subtitle: "Artisan Baker from Paris",
        intro:
            "All our breads are kneaded, shaped and baked on site by our artisans, made with selected flours and liquid sourdough starter."
    }
};

/* ---------- NAV LABELS (5 onglets) ---------- */
const NAV_LABELS = {
    fr: {
        "petits-dejeuners": "Nos Petits-Déjeuners",
        "bistronomique": "Notre Carte",
        "plats": "Nos Plats",
        "desserts": "Nos Desserts",
        "boissons": "Nos Boissons"
    },
    en: {
        "petits-dejeuners": "Breakfast",
        "bistronomique": "Our Menu",
        "plats": "Mains",
        "desserts": "Desserts",
        "boissons": "Drinks"
    }
};

/* ---------- NAV SVG ICONS ---------- */
const NAV_SVGS = {
    "petits-dejeuners": `
    <svg class="nav-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M7 8V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M7 8v6c0 3 2 5 5 5s5-2 5-5V8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
    "bistronomique": `
    <svg class="nav-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M10 3v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M13 3v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M10 10v11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M17 4c1 2 1 4 0 6v11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,
    "plats": `
    <svg class="nav-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13c2.2-3.8 13.8-3.8 16 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M6 14c0 4 3 7 6 7s6-3 6-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M8 9c1.2-1.2 2.6-2 4-2s2.8.8 4 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,
    "desserts": `
    <svg class="nav-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8a4 4 0 1 1 8 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M6 10h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M7 10l1 10h8l1-10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 3v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,
    "boissons": `
    <svg class="nav-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8h10l-1 11H8L7 8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M19 10h1a2 2 0 0 1 0 4h-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `
};

document.addEventListener("DOMContentLoaded", () => {
    setupStickyNav();
    setupLangButtons();
    renderHeroText();

    const sections = menuData[currentLang] || [];
    activeSectionId = sections[0]?.id || "petits-dejeuners";

    renderNavbar();
    renderAllSections();

    // Scroll-to-section app: do NOT auto-scroll on load
    setActiveSection(activeSectionId, { scroll: false });

    // Highlight active tab while scrolling
    setupSectionObserver();
});

/* ------------------- Language ------------------- */
function detectLanguage() {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
    const browser = (navigator.language || "").toLowerCase();
    return browser.startsWith("en") ? "en" : "fr";
}

function setupLangButtons() {
    const frBtn = document.getElementById("lang-fr");
    const enBtn = document.getElementById("lang-en");
    if (!frBtn || !enBtn) return;

    frBtn.classList.toggle("active", currentLang === "fr");
    enBtn.classList.toggle("active", currentLang === "en");

    frBtn.onclick = () => setLang("fr");
    enBtn.onclick = () => setLang("en");
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    document.getElementById("lang-fr")?.classList.toggle("active", lang === "fr");
    document.getElementById("lang-en")?.classList.toggle("active", lang === "en");

    renderHeroText();

    // Keep current active section if it exists in the new language set
    const sections = menuData[currentLang] || [];
    if (!sections.find(s => s.id === activeSectionId)) {
        activeSectionId = sections[0]?.id || activeSectionId;
    }

    // Re-render everything
    cleanupObserver();
    document.getElementById("navbar").innerHTML = "";
    document.getElementById("content").innerHTML = "";
    renderNavbar();
    renderAllSections();

    // keep active tab, don't auto-scroll
    setActiveSection(activeSectionId, { scroll: false });
    setupSectionObserver();
}

/* ------------------- Hero text ------------------- */
function renderHeroText() {
    const t = HERO_TEXT[currentLang] || HERO_TEXT.fr;
    const sub = document.getElementById("hero-subtitle");
    const intro = document.getElementById("hero-intro");
    if (sub) sub.textContent = t.subtitle;
    if (intro) intro.textContent = t.intro;
}

/* ------------------- Sticky navbar (adds .is-sticky) ------------------- */
function setupStickyNav() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-sticky", window.scrollY > 220);
    window.addEventListener("scroll", onScroll);
    onScroll();
}

/* ------------------- Navbar (radio-like tabs + scroll) ------------------- */
function renderNavbar() {
    const nav = document.getElementById("navbar");
    nav.setAttribute("role", "tablist");

    const sections = menuData[currentLang] || [];
    const labels = NAV_LABELS[currentLang] || NAV_LABELS.fr;

    sections.forEach(section => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nav-item";
        btn.dataset.sectionId = section.id;

        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", "false");

        const icon = document.createElement("span");
        icon.innerHTML = NAV_SVGS[section.id] || NAV_SVGS.plats;

        const text = document.createElement("span");
        text.textContent = labels[section.id] || section.title;

        btn.appendChild(icon);
        btn.appendChild(text);

        btn.addEventListener("click", () => {
            setActiveSection(section.id, { scroll: true });
        });

        nav.appendChild(btn);
    });
}

/* ------------------- Components ------------------- */
function MenuItem(item) {
    const wrap = document.createElement("div");
    wrap.className = "menu-item";

    const row = document.createElement("div");
    row.className = "item-row";

    const left = document.createElement("div");
    left.className = "item-left";

    const name = document.createElement("h4");
    name.className = "item-name";
    name.textContent = item.name || "";
    left.appendChild(name);

    if (item.description) {
        const desc = document.createElement("p");
        desc.className = "item-desc";
        desc.textContent = item.description;
        left.appendChild(desc);
    }

    const right = document.createElement("div");
    right.className = "item-right";

    if (item.price) {
        const price = document.createElement("span");
        price.className = "price-pill";
        price.textContent = item.price;
        right.appendChild(price);
    }

    row.appendChild(left);
    row.appendChild(right);
    wrap.appendChild(row);

    return wrap;
}

function MenuSection(category, uid) {
    const acc = document.createElement("div");
    acc.className = "menu-accordion section-open"; // open by default (Lovable feel)

    const headerBtn = document.createElement("button");
    headerBtn.type = "button";
    headerBtn.className = "accordion-header";
    headerBtn.setAttribute("aria-expanded", "true");

    const panelId = `panel-${uid}`;
    headerBtn.setAttribute("aria-controls", panelId);

    const left = document.createElement("div");
    left.className = "acc-left";

    const textWrap = document.createElement("div");
    textWrap.className = "acc-text";

    const title = document.createElement("div");
    title.className = "acc-title";
    title.textContent = category.title || "";
    textWrap.appendChild(title);

    if (category.subtitle) {
        const sub = document.createElement("div");
        sub.className = "acc-subtitle";
        sub.textContent = category.subtitle;
        textWrap.appendChild(sub);
    }

    left.appendChild(textWrap);


    const chevron = document.createElement("div");
    chevron.className = "acc-chevron";
    chevron.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

    headerBtn.appendChild(left);
    headerBtn.appendChild(chevron);

    const panel = document.createElement("div");
    panel.className = "accordion-panel";
    panel.id = panelId;

    const inner = document.createElement("div");
    inner.className = "panel-inner";

    (category.items || []).forEach(item => inner.appendChild(MenuItem(item)));
    panel.appendChild(inner);

    headerBtn.addEventListener("click", () => toggleAccordion(acc, headerBtn));

    acc.appendChild(headerBtn);
    acc.appendChild(panel);
    return acc;
}

function toggleAccordion(container, headerBtn) {
    const isOpen = container.classList.contains("section-open");
    container.classList.toggle("section-open", !isOpen);
    container.classList.toggle("section-closed", isOpen);
    headerBtn.setAttribute("aria-expanded", String(!isOpen));
}

/* ------------------- Render all sections (ALL visible) ------------------- */
function renderAllSections() {
    const content = document.getElementById("content");
    const sections = menuData[currentLang] || [];

    sections.forEach(section => {
        const wrapper = document.createElement("section");
        wrapper.className = "menu-section";
        wrapper.id = `section-${section.id}`;

        const h2 = document.createElement("h2");
        h2.className = "section-title";
        h2.textContent = section.title; // keep full titles from your data
        wrapper.appendChild(h2);

        (section.categories || []).forEach((cat, i) => {
            wrapper.appendChild(MenuSection(cat, `${section.id}-${i}`));
        });

        content.appendChild(wrapper);
    });
}

/* ------------------- Active tab + scroll into view ------------------- */
function setActiveSection(sectionId, opts = { scroll: true }) {
    activeSectionId = sectionId;

    // Navbar: radio behavior
    document.querySelectorAll(".nav-item").forEach(btn => {
        const active = btn.dataset.sectionId === sectionId;
        btn.classList.toggle("nav-item--active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        if (active) btn.setAttribute("aria-current", "page");
        else btn.removeAttribute("aria-current");
    });

    // Scroll to section (no URL change)
    if (opts.scroll) {
        const target = document.getElementById(`section-${sectionId}`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

/* ------------------- Observer: update active tab on scroll ------------------- */
function setupSectionObserver() {
    cleanupObserver();

    const sections = Array.from(document.querySelectorAll(".menu-section"));
    if (!sections.length) return;

    sectionObserver = new IntersectionObserver((entries) => {
        const best = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0];

        if (!best) return;

        const id = best.target.id; // section-xxxx
        const sectionId = id.replace("section-", "");
        if (sectionId && sectionId !== activeSectionId) {
            setActiveSection(sectionId, { scroll: false });
        }
    }, {
        root: null,
        threshold: [0.25, 0.35, 0.5, 0.65],
        // Makes “current section” match what’s near top under sticky navbar
        rootMargin: "-10% 0px -60% 0px"
    });

    sections.forEach(sec => sectionObserver.observe(sec));
}

function cleanupObserver() {
    if (sectionObserver) {
        sectionObserver.disconnect();
        sectionObserver = null;
    }
}
