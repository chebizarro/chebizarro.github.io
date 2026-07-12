import matter from "gray-matter";
import { marked } from "marked";

export type ContentKind = "writing" | "research" | "systems";

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags?: string[];
  status?: string;
  featured?: boolean;
  // system-specific
  repo?: string;
  stack?: string[];
  role?: string;
}

export interface ContentEntry {
  kind: ContentKind;
  meta: ContentMeta;
  body: string; // raw markdown
  html: string;
  readingMinutes: number;
  headings: { depth: number; text: string; id: string }[];
}

const rawWriting = import.meta.glob("../content/writing/*.md", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;
const rawResearch = import.meta.glob("../content/research/*.md", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;
const rawSystems = import.meta.glob("../content/systems/*.md", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}

marked.setOptions({ gfm: true, breaks: false });

// Custom renderer: add heading anchors, wrap callouts
const renderer = new marked.Renderer();
const origHeading = renderer.heading.bind(renderer);
renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const plain = tokens.map((t: any) => t.raw || t.text || "").join("");
  const id = slugify(plain);
  return `<h${depth} id="${id}"><a href="#${id}" class="heading-anchor">${text}</a></h${depth}>\n`;
};

function extractHeadings(md: string) {
  const out: { depth: number; text: string; id: string }[] = [];
  const lines = md.split("\n");
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (m) out.push({ depth: m[1].length, text: m[2], id: slugify(m[2]) });
  }
  return out;
}

function buildEntries(kind: ContentKind, source: Record<string, string>): ContentEntry[] {
  return Object.entries(source).map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, content } = matter(raw);
    const html = marked.parse(content, { renderer }) as string;
    const words = content.split(/\s+/).filter(Boolean).length;
    const meta: ContentMeta = {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      tags: data.tags,
      status: data.status,
      featured: !!data.featured,
      repo: data.repo,
      stack: data.stack,
      role: data.role,
    };
    return {
      kind,
      meta,
      body: content,
      html,
      readingMinutes: Math.max(1, Math.round(words / 220)),
      headings: extractHeadings(content),
    };
  }).sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export const writing = buildEntries("writing", rawWriting);
export const research = buildEntries("research", rawResearch);
export const systems = buildEntries("systems", rawSystems);

export function getEntry(kind: ContentKind, slug: string): ContentEntry | undefined {
  const src = kind === "writing" ? writing : kind === "research" ? research : systems;
  return src.find((e) => e.meta.slug === slug);
}

export function allEntries(): ContentEntry[] {
  return [...writing, ...research, ...systems].sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}