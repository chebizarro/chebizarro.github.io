import { createFileRoute, Link } from "@tanstack/react-router";
import { systems } from "../lib/content";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Chris Daley" },
      { name: "description", content: "Open-source repositories, experiments and side projects." },
      { property: "og:title", content: "Projects — Chris Daley" },
      { property: "og:description", content: "Open-source repositories and experiments." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

const experiments = [
  { name: "notebook-lm-local", desc: "A local variant of the notebook-with-a-model idea, over Bahia." },
  { name: "relay-cache", desc: "A small caching layer for high-fanout Nostr reads." },
  { name: "loom", desc: "A tmux-shaped multi-agent workspace prototype." },
  { name: "sextant", desc: "Position-fixing for agents inside long-running codebases." },
];

function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <div className="smallcaps text-copper mb-6">§ Projects</div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight">Open source, in various states of finish.</h1>
      <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
        Long-running systems have their own pages under{" "}
        <Link to="/systems" className="text-copper hover:underline">Systems</Link>.
        What follows is the wider catalog — experiments, sketches, and small
        tools that occasionally graduate.
      </p>
      <div className="chart-rule mt-12 mb-10" />

      <section>
        <h2 className="font-serif text-2xl mb-6">Maintained systems</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {systems.map((s) => (
            <li key={s.meta.slug}>
              <Link
                to="/systems/$slug"
                params={{ slug: s.meta.slug }}
                className="block border border-border rounded-sm p-5 bg-card hover:border-copper transition-colors"
              >
                <div className="font-serif text-lg text-foreground">{s.meta.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.meta.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl mb-6">Experiments &amp; sketches</h2>
        <ul className="divide-y divide-border">
          {experiments.map((e) => (
            <li key={e.name} className="py-4 grid grid-cols-[10rem_1fr] gap-6 items-baseline">
              <span className="font-mono text-sm text-foreground">{e.name}</span>
              <span className="text-muted-foreground text-sm">{e.desc}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
