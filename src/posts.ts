import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
}

// Vite bundles all post files at build time, so no server or fetch is needed.
const files = import.meta.glob("/posts/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: match[2] };
}

const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, body } = parseFrontMatter(raw);
    if (meta.draft === "true") return undefined;
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "1970-01-01",
      summary: meta.summary || "",
      tags: (meta.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      body,
    };
  })
  .filter((p): p is Post => p !== undefined)
  .sort((a, b) => b.date.localeCompare(a.date));

/** All posts, newest first. */
export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false });
}