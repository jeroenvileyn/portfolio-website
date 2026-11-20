/* types.ts — describes the shape of your content.
   If you forget a field or make a typo in content/site.ts, your editor shows an error. */

export type Lang = "en" | "nl";

/** A piece of text in both languages. */
export type Text = Record<Lang, string>;

export interface SkillGroup {
  group: Text;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  status: "earned" | "in-progress" | "planned";
  url?: string;
}

export interface Project {
  title: Text;
  category: Text;
  description: Text;
  /** Optional longer text, hidden until the visitor clicks "Show more". One item per paragraph. */
  details?: Text[];
  tags: string[];
  links: { code?: string; writeup?: string; demo?: string };
}

export interface TimelineItem {
  when: Text;
  title: Text;
  place: string;
  text: Text;
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface SiteContent {
  name: string;
  handle: string;
  role: Text;
  tagline: Text;
  location: Text;
  status?: Text;
  photo?: string;
  cv?: Partial<Record<Lang, string>>;
  about: Text[];
  focus: Text[];
  skills: SkillGroup[];
  certifications: Certification[];
  projects: Project[];
  timeline: TimelineItem[];
  contact: {
    intro: Text;
    email: string;
    links: ContactLink[];
    pgp?: string;
  };
}