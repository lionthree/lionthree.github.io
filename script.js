/* =====================================================
   lionlionlion Portfolio — script.js
   Handles: Language switching (ES/EN), Light/Dark toggle
   ===================================================== */

// ─── TRANSLATIONS ────────────────────────────────────
const i18n = {
  es: {
    "nav.about":    "Sobre mí",
    "nav.works":    "Trabajos",
    "nav.software": "Software",
    "nav.contact":  "Contacto",

    "hero.tag":  "Artista 3D · Zaragoza, España",
    "hero.cta":  "Ver trabajos",

    "about.title": "Sobre mí",
    "about.p1":    "Soy Miguel Asensio Mayayo, artista 3D con base en Zaragoza, España. Bajo el alias <strong>lionlionlion</strong> creo piezas digitales que fusionan escultura, diseño y narrativa visual.",
    "about.p2":    "Me especializo en modelado de personajes, escenas atmosféricas y visualización arquitectónica. Cada proyecto es una exploración entre lo técnico y lo expresivo.",
    "about.stat1": "Años de experiencia",
    "about.stat2": "Proyectos completados",
    "about.stat3": "Zaragoza, España",

    "works.title": "Trabajos",
    "works.view":  "Ver proyecto →",

    "software.title": "Software",

    "contact.title": "Contacto",
    "contact.intro": "¿Tienes un proyecto en mente? Hablemos.",
    "contact.email": "Enviar email",

    "footer.made": "Hecho a mano en Zaragoza",
  },

  en: {
    "nav.about":    "About",
    "nav.works":    "Works",
    "nav.software": "Software",
    "nav.contact":  "Contact",

    "hero.tag":  "3D Artist · Zaragoza, Spain",
    "hero.cta":  "View works",

    "about.title": "About",
    "about.p1":    "I'm Miguel Asensio Mayayo, a 3D artist based in Zaragoza, Spain. Under the alias <strong>lionlionlion</strong> I create digital pieces that merge sculpture, design and visual storytelling.",
    "about.p2":    "I specialize in character modeling, atmospheric scenes and architectural visualization. Each project is an exploration between the technical and the expressive.",
    "about.stat1": "Years of experience",
    "about.stat2": "Completed projects",
    "about.stat3": "Zaragoza, Spain",

    "works.title": "Works",
    "works.view":  "View project →",

    "software.title": "Software",

    "contact.title": "Contact",
    "contact.intro": "Have a project in mind? Let's talk.",
    "contact.email": "Send email",

    "footer.made": "Handcrafted in Zaragoza",
  }
};

// ─── STATE ───────────────────────────────────────────
let currentLang  = "es";
let isDark       = false;

// ─── LANGUAGE SWITCHER ───────────────────────────────
function applyLang(lang) {
  currentLang = lang;
  const dict = i18n[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.documentElement.lang = lang;
  document.getElementById("lang-toggle").textContent =
    lang === "es" ? "ES / EN" : "EN / ES";
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  applyLang(currentLang === "es" ? "en" : "es");
});

// ─── LIGHT / DARK TOGGLE ─────────────────────────────
function applyTheme(dark) {
  isDark = dark;
  const theme = dark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  updateIconColors(dark);
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  applyTheme(!isDark);
});

// ─── ICON COLOR UPDATES ──────────────────────────────
// Simple Icons CDN: https://cdn.simpleicons.org/{slug}/{hex}
const LIGHT_COLOR = "2020E8";  // blue on white bg
const DARK_COLOR  = "FFBB00";  // yellow on dark bg

const SOCIAL_ICON_IDS = {
  "ig-icon": "instagram",
  "as-icon": "artstation",
  "x-icon":  "x",
};

function updateIconColors(dark) {
  // Primary color is always blue in both themes now
  const socialColor = LIGHT_COLOR;
  Object.entries(SOCIAL_ICON_IDS).forEach(([id, slug]) => {
    const el = document.getElementById(id);
    if (el && !el.src.includes(socialColor)) {
      el.src = `https://cdn.simpleicons.org/${slug}/${socialColor}`;
    }
  });

  // Software icons are always white — they sit on a colored background (sw-bg)
  // so FFFFFF works regardless of theme. No update needed.
}

// ─── NAVBAR SCROLL ────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 10 ? "0 2px 0 var(--border)" : "none";
}, { passive: true });

// ─── SMOOTH ACTIVE NAV LINK ──────────────────────────
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute("href") === `#${id}` ? "var(--primary)" : "";
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ─── WORK CARD TILT (subtle) ─────────────────────────
document.querySelectorAll(".work-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ─── INIT ────────────────────────────────────────────
applyLang("es");
applyTheme(false); // Start in light mode
