import { createFileRoute, Link } from "@tanstack/react-router";
import { systems } from "../lib/content";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Chris Daley" },
      { name: "description", content: "Open-source repositories, fleet services and supporting libraries." },
      { property: "og:title", content: "Projects — Chris Daley" },
      { property: "og:description", content: "Open-source repositories and fleet services." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

const supporting: { name: string; desc: string; href?: string }[] = [
  { name: "nostrc", desc: "A C library for Nostr — the protocol layer under metadesk and home of Signet.", href: "https://github.com/chebizarro/nostrc" },
  { name: "flotilla-budabit", desc: "Git-centric community platform on Nostr — the Budabit work, continued in the open.", href: "https://github.com/Pleb5/flotilla-budabit" },
  { name: "chartroom", desc: "Reference-corpus service: deterministic ingestion, provenance-aware retrieval, four retrieval modes." },
  { name: "mnemonic", desc: "Institutional memory: replayable episodes, causal links, lessons, and human-reviewed doctrine." },
  { name: "cartographer", desc: "LLM docs generation with provenance — every page cites its source files and commit." },
  { name: "agent-memory", desc: "Task-scoped episodic recall for agents; Go sidecar with local embeddings." },
  { name: "harbormaster-watch", desc: "Nostr-native ops console; renders only what it can attribute to a relay." },
];

function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <div className="smallcaps text-copper mb-6">§ Projects</div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight">Open source, in various states of finish.</h1>
      <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
        The flagships have their own pages under{" "}
        <Link to="/systems" className="text-copper hover:underline">Systems</Link>.
        What follows is the wider catalog — the fleet services and libraries
        that keep the flagships honest.
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
        <h2 className="font-serif text-2xl mb-6">Fleet services &amp; libraries</h2>
        <ul className="divide-y divide-border">
          {supporting.map((e) => (
            <li key={e.name} className="py-4 grid grid-cols-[10rem_1fr] gap-6 items-baseline">
              {e.href ? (
                <a href={e.href} className="font-mono text-sm text-foreground hover:text-copper break-words">{e.name}</a>
              ) : (
                <span className="font-mono text-sm text-foreground">{e.name} <span className="text-[10px] uppercase tracking-widest text-muted-foreground">private</span></span>
              )}
              <span className="text-muted-foreground text-sm">{e.desc}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
