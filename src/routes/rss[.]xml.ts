import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { writing, research } from "../lib/content";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const items = [...writing, ...research]
          .sort((a, b) => b.meta.date.localeCompare(a.meta.date))
          .slice(0, 40);
        const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
        const baseUrl = "https://chrisdaley.biz";
        const rssItems = items.map((e) => {
          const path = `/${e.kind}/${e.meta.slug}`;
          const url = `${baseUrl}${path}`;
          return [
            "    <item>",
            `      <title>${esc(e.meta.title)}</title>`,
            `      <link>${url}</link>`,
            `      <guid isPermaLink="true">${url}</guid>`,
            `      <pubDate>${new Date(e.meta.date).toUTCString()}</pubDate>`,
            `      <description>${esc(e.meta.description)}</description>`,
            "    </item>",
          ].join("\n");
        }).join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Chris Daley — Writing &amp; Research</title>
    <link>${baseUrl}</link>
    <description>Notebook, essays and systems from an engineer working at the intersection of AI, distributed infrastructure, Bitcoin and Nostr.</description>
    <language>en</language>
${rssItems}
  </channel>
</rss>`;
        return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
