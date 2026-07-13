import { marked } from "marked";

// Tiny YAML frontmatter parser — enough for scalar fields, arrays and booleans.
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, content: raw };
  const data: Record<string, any> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    const key = kv[1];
    let val: any = kv[2].trim();
    if (val === "true") val = true;
    else if (val === "false") val = false;
    else if (/^".*"$|^'.*'$/.test(val)) val = val.slice(1, -1);
    else if (/^\[.*\]$/.test(val)) {
      val = val.slice(1, -1).split(",").map((s: string) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    }
    data[key] = val;
  }
  return { data, content: m[2] };
}

export type ContentKind = "writing" | "research" | "systems";

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags?: string[];
  status?: string;
  featured?: boolean;
  ogImage?: string;      // For social sharing (1200x630)
  heroImage?: string;    // For article header (any size)
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
    const { data, content } = parseFrontmatter(raw);
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
      ogImage: data.ogImage,
      heroImage: data.heroImage,
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