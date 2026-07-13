import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { writing, research, systems } from "../lib/content";

const BASE_URL = "https://chebizarro.github.io/sovereign-systems-lab";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/about", "/writing", "/research", "/systems", "/speaking", "/projects", "/cv", "/contact"];
        const entries = [
          ...staticPaths.map((p) => ({ loc: p, priority: p === "/" ? "1.0" : "0.8", changefreq: "weekly" as const })),
          ...writing.map((w) => ({ loc: `/writing/${w.meta.slug}`, lastmod: w.meta.date, priority: "0.6", changefreq: "monthly" as const })),
          ...research.map((r) => ({ loc: `/research/${r.meta.slug}`, lastmod: r.meta.date, priority: "0.7", changefreq: "monthly" as const })),
          ...systems.map((s) => ({ loc: `/systems/${s.meta.slug}`, lastmod: s.meta.date, priority: "0.7", changefreq: "monthly" as const })),
        ];
        const urls = entries.map((e: any) => [
          "  <url>",
          `    <loc>${BASE_URL}${e.loc}</loc>`,
          e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
          `    <changefreq>${e.changefreq}</changefreq>`,
          `    <priority>${e.priority}</priority>`,
          "  </url>",
        ].filter(Boolean).join("\n"));
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
