/* main.ts — builds every page from your content. You normally don't need to edit this. */

import "./style.css";
import { site } from "./content/site";
import { ui, getLang, saveLang, tr, dateLocale, type UiKey } from "./i18n";
import { getPosts, getPost, renderMarkdown, type Post } from "./posts";
import type { Lang } from "./types";

let lang: Lang = getLang();
const page = document.body.dataset.page as "home" | "blog" | "post";
const home = page === "home" ? "" : "index.html";

/* ---------- Helpers ---------- */
const $ = (sel: string) => document.querySelector<HTMLElement>(sel);
const t = (key: UiKey) => ui[lang][key];

/** Escapes text so it's shown as text, never run as HTML. */
const esc = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString(dateLocale[lang], { day: "numeric", month: "short", year: "numeric" });

const tags = (list: string[]) => `<div class="tags">${list.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>`;

const isExternal = (url: string) => /^https?:\/\//.test(url);
const linkAttrs = (url: string) => (isExternal(url) ? 'target="_blank" rel="noopener"' : "");

const initials = site.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/* ---------- Shared parts ---------- */
function renderNav() {
  $("#nav")!.innerHTML = `
    <nav class="nav container">
      <a class="logo" href="${home || "#"}"><span class="prompt">~/</span>${esc(site.handle)}</a>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="${home}#about">${t("navAbout")}</a></li>
          <li><a href="${home}#projects">${t("navProjects")}</a></li>
          <li><a href="${home}#experience">${t("navExperience")}</a></li>
          <li><a href="blog.html">${t("navBlog")}</a></li>
          <li><a href="${home}#contact">${t("navContact")}</a></li>
        </ul>
        <button class="lang-btn" aria-label="Switch language">${lang === "en" ? "NL" : "EN"}</button>
        <button class="menu-btn" aria-label="Menu" aria-expanded="false">☰</button>
      </div>
    </nav>`;

  const links = $(".nav-links")!;
  const menuBtn = $(".menu-btn")!;
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  $(".lang-btn")!.addEventListener("click", () => {
    lang = lang === "en" ? "nl" : "en";
    saveLang(lang);
    render();
  });
}

function renderFooter() {
  $("#footer")!.innerHTML = `
    <div class="container footer">
      <span>© ${new Date().getFullYear()} ${esc(site.name)}</span>
      <span class="mono muted">${t("footerNote")}</span>
    </div>`;
}

const postCard = (p: Post) => `
  <a class="post-item" href="post.html?slug=${encodeURIComponent(p.slug)}">
    <div class="post-meta mono">${fmtDate(p.date)}</div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.summary)}</p>
    ${tags(p.tags)}
  </a>`;

/* ---------- Home page ---------- */
function renderHome() {
  document.title = `${site.name} — ${tr(site.role, lang)}`;
  const cv = site.cv?.[lang] || site.cv?.en;

  $("#hero")!.innerHTML = `
    <div class="hero-text">
      <p class="mono accent">&gt; whoami</p>
      <h1>${esc(site.name)}</h1>
      <p class="role">${esc(tr(site.role, lang))}</p>
      <p class="tagline">${esc(tr(site.tagline, lang))}</p>
      <div class="hero-actions">
        <a class="btn primary" href="#projects">${t("viewProjects")}</a>
        <a class="btn" href="#contact">${t("getInTouch")}</a>
        ${cv ? `<a class="btn" href="${esc(cv)}" download>${t("downloadCv")}</a>` : ""}
      </div>
      ${site.status ? `<p class="status"><span class="dot"></span>${esc(tr(site.status, lang))}</p>` : ""}
    </div>
    <div class="avatar">${site.photo ? `<img src="${esc(site.photo)}" alt="${esc(site.name)}">` : `<span>${initials}</span>`}</div>`;

  $("#about-title")!.textContent = t("aboutTitle");
  $("#about-content")!.innerHTML = `
    <div class="about-grid">
      <div>
        ${site.about.map((p) => `<p>${esc(tr(p, lang))}</p>`).join("")}
        <ul class="facts">
          <li><span class="muted">${t("location")}</span> ${esc(tr(site.location, lang))}</li>
          <li><span class="muted">${t("focus")}</span> ${site.focus.map((f) => esc(tr(f, lang))).join(" · ")}</li>
        </ul>
      </div>
      <div class="card">
        <h3>${t("skills")}</h3>
        ${site.skills.map((s) => `
          <div class="skill-group">
            <div class="skill-label mono">${esc(tr(s.group, lang))}</div>
            ${tags(s.items)}
          </div>`).join("")}
      </div>
    </div>
    ${site.certifications.length ? `
      <h3 class="sub-title">${t("certifications")}</h3>
      <div class="certs">
        ${site.certifications.map((c) => `
          <div class="cert card">
            <div>
              <strong>${c.url ? `<a href="${esc(c.url)}" ${linkAttrs(c.url)}>${esc(c.name)}</a>` : esc(c.name)}</strong>
              <div class="muted small">${esc(c.issuer)}${c.year ? " · " + esc(c.year) : ""}</div>
            </div>
            <span class="badge ${c.status}">${t(`status-${c.status}`)}</span>
          </div>`).join("")}
      </div>` : ""}`;

  $("#projects-title")!.textContent = t("projectsTitle");
  const linkLabel = { code: t("linkCode"), writeup: t("linkWriteup"), demo: t("linkDemo") };
  $("#project-list")!.innerHTML = site.projects.map((p) => `
    <article class="card project">
      <div class="mono accent small">${esc(tr(p.category, lang))}</div>
      <h3>${esc(tr(p.title, lang))}</h3>
      <p>${esc(tr(p.description, lang))}</p>
      ${tags(p.tags)}
      <div class="project-links">
        ${(Object.entries(p.links) as [keyof typeof linkLabel, string | undefined][])
          .filter(([, url]) => url)
          .map(([k, url]) => `<a class="text-link" href="${esc(url)}" ${linkAttrs(url!)}>${linkLabel[k]} →</a>`)
          .join("")}
      </div>
    </article>`).join("");

  $("#experience-title")!.textContent = t("experienceTitle");
  $("#timeline")!.innerHTML = site.timeline.map((x) => `
    <li>
      <div class="mono muted small">${esc(tr(x.when, lang))}</div>
      <h3>${esc(tr(x.title, lang))} <span class="muted">· ${esc(x.place)}</span></h3>
      <p>${esc(tr(x.text, lang))}</p>
    </li>`).join("");

  $("#blog-title")!.textContent = t("latestPosts");
  $("#all-posts-link")!.textContent = t("allPosts");
  $("#latest-posts")!.innerHTML = getPosts().slice(0, 3).map(postCard).join("") || `<p class="muted">${t("noPosts")}</p>`;

  const c = site.contact;
  $("#contact-title")!.textContent = t("contactTitle");
  $("#contact-content")!.innerHTML = `
    <div class="card contact">
      <p>${esc(tr(c.intro, lang))}</p>
      <a class="btn primary" href="mailto:${esc(c.email)}">${esc(c.email)}</a>
      <div class="contact-links">
        ${c.links.map((l) => `<a class="text-link" href="${esc(l.url)}" ${linkAttrs(l.url)}>${esc(l.label)} ↗</a>`).join("")}
      </div>
      ${c.pgp ? `<p class="mono small muted">PGP: ${esc(c.pgp)}</p>` : ""}
    </div>`;
}

/* ---------- Blog list ---------- */
let activeTag = "";
function renderBlog() {
  document.title = `Blog — ${site.name}`;
  $("#blog-intro")!.textContent = t("blogIntro");
  const posts = getPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  const filter = $("#tag-filter")!;
  filter.innerHTML = [["", t("all")], ...allTags.map((x) => [x, x])]
    .map(([value, label]) => `<button class="tag ${value === activeTag ? "active" : ""}" data-tag="${esc(value)}">${esc(label)}</button>`)
    .join("");
  filter.onclick = (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("button");
    if (btn) { activeTag = btn.dataset.tag ?? ""; renderBlog(); }
  };
  const shown = posts.filter((p) => !activeTag || p.tags.includes(activeTag));
  $("#all-posts")!.innerHTML = shown.map(postCard).join("") || `<p class="muted">${t("noPosts")}</p>`;
}

/* ---------- Single post ---------- */
function renderPost() {
  $("#back-link")!.textContent = t("backToPosts");
  const slug = new URLSearchParams(location.search).get("slug") ?? "";
  const post = getPost(slug);
  const el = $("#post")!;
  if (!post) {
    document.title = t("notFound");
    el.innerHTML = `<h1>${t("notFound")}</h1>`;
    return;
  }
  document.title = `${post.title} — ${site.name}`;
  el.innerHTML = `
    <div class="post-meta mono">${fmtDate(post.date)}</div>
    <h1>${esc(post.title)}</h1>
    ${tags(post.tags)}
    <div class="post-body">${renderMarkdown(post.body)}</div>`;
}

/* ---------- Start ---------- */
function render() {
  document.documentElement.lang = lang;
  renderNav();
  renderFooter();
  if (page === "home") renderHome();
  if (page === "blog") renderBlog();
  if (page === "post") renderPost();
}

render();
