/* i18n.ts — the fixed interface texts (menu, buttons, headings) in both languages,
   plus the logic that remembers which language the visitor chose. */

import type { Lang, Text } from "./types";

const en = {
  navAbout: "About",
  navProjects: "Projects",
  navExperience: "Experience",
  navBlog: "Blog",
  navContact: "Contact",
  viewProjects: "View projects",
  getInTouch: "Get in touch",
  downloadCv: "Download CV",
  aboutTitle: "About me",
  projectsTitle: "Projects",
  experienceTitle: "Experience & education",
  latestPosts: "Latest posts",
  allPosts: "All posts →",
  contactTitle: "Contact",
  skills: "Skills",
  certifications: "Certifications",
  location: "Location",
  focus: "Focus",
  blogIntro: "Write-ups, notes and things I've learned.",
  all: "All",
  noPosts: "No posts yet.",
  backToPosts: "← All posts",
  notFound: "Post not found",
  footerNote: "All testing performed on systems I own or am authorised to test.",
  "status-earned": "earned",
  "status-in-progress": "in progress",
  "status-planned": "planned",
  linkCode: "Code",
  linkWriteup: "Write-up",
  linkDemo: "Demo",
  showMore: "Show more",
  showLess: "Show less",
};

const nl: typeof en = {
  navAbout: "Over mij",
  navProjects: "Projecten",
  navExperience: "Ervaring",
  navBlog: "Blog",
  navContact: "Contact",
  viewProjects: "Bekijk projecten",
  getInTouch: "Contacteer mij",
  downloadCv: "Download cv",
  aboutTitle: "Over mij",
  projectsTitle: "Projecten",
  experienceTitle: "Ervaring & opleiding",
  latestPosts: "Recente posts",
  allPosts: "Alle posts →",
  contactTitle: "Contact",
  skills: "Vaardigheden",
  certifications: "Certificaten",
  location: "Locatie",
  focus: "Focus",
  blogIntro: "Write-ups, notities en dingen die ik geleerd heb. Mijn posts schrijf ik in het Engels.",
  all: "Alle",
  noPosts: "Nog geen posts.",
  backToPosts: "← Alle posts",
  notFound: "Post niet gevonden",
  footerNote: "Alle tests uitgevoerd op systemen die van mij zijn of waarvoor ik toestemming heb.",
  "status-earned": "behaald",
  "status-in-progress": "bezig",
  "status-planned": "gepland",
  linkCode: "Code",
  linkWriteup: "Write-up",
  linkDemo: "Demo",
  showMore: "Toon meer",
  showLess: "Toon minder",
};

export const ui: Record<Lang, typeof en> = { en, nl };
export type UiKey = keyof typeof en;

const STORAGE_KEY = "lang";

/** Language order: ?lang= in the URL → saved choice → browser language → English. */
export function getLang(): Lang {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl === "en" || fromUrl === "nl") return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "nl") return saved;
  } catch { /* storage blocked: ignore */ }
  return navigator.language.toLowerCase().startsWith("nl") ? "nl" : "en";
}

export function saveLang(lang: Lang): void {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
}

/** Pick the right language from a { en, nl } text. Falls back to English if Dutch is empty. */
export function tr(text: Text, lang: Lang): string {
  return text[lang] || text.en;
}

export const dateLocale: Record<Lang, string> = { en: "en-GB", nl: "nl-BE" };
