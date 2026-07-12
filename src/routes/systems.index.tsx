import { createFileRoute, Link } from "@tanstack/react-router";
import { systems, formatDateShort } from "../lib/content";
import { IndexPageShell } from "../components/site/entry-list";

export const Route = createFileRoute("/systems/")({
  head: () => ({
    meta: [
      { title: "Systems — Chris Daley" },
      { name: "description", content: "Open-source systems: architecture, lessons learned and repositories." },
      { property: "og:title", content: "Systems — Chris Daley" },
      { property: "og:description", content: "Open-source systems and their architecture." },
      { property: "og:url", content: "/systems" },
    ],
    links: [{ rel: "canonical", href: "/systems" }],
  }),
  component: SystemsIndex,
});

function SystemsIndex() {
  return (
    <IndexPageShell
      kicker="§ Systems"
      title="What I ship."
      intro="Each entry is a miniature product page — overview, architecture, lessons, future work and repository links."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {systems.map((s) => (
          <Link
            key={s.meta.slug}
            to="/systems/$slug"
            params={{ slug: s.meta.slug }}
            className="group border border-border rounded-sm p-7 bg-card hover:border-copper transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="font-serif text-2xl text-foreground group-hover:text-copper transition-colors">
                {s.meta.title}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {s.meta.status ?? "active"}
              </span>
            </div>
            <p className="text-muted-foreground mt-3 leading-relaxed">{s.meta.description}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {s.meta.stack?.map((t) => <span key={t}>{t}</span>)}
              <span className="ml-auto">{formatDateShort(s.meta.date)}</span>
            </div>
          </Link>
        ))}
      </div>
    </IndexPageShell>
  );
}
