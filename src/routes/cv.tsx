import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Chris Daley" },
      { name: "description", content: "Curriculum vitae: roles, research, publications and open-source work." },
      { property: "og:title", content: "CV — Chris Daley" },
      { property: "og:description", content: "Curriculum vitae." },
      { property: "og:url", content: "/cv" },
    ],
    links: [{ rel: "canonical", href: "/cv" }],
  }),
  component: CV,
});

const roles = [
  { years: "2024 —", title: "Independent researcher & engineer", org: "Self-directed", notes: "Agent experience, sovereign infrastructure, open-source systems." },
  { years: "2021 — 2024", title: "Principal engineer", org: "(previous)", notes: "Distributed systems and applied research on agentic tooling." },
  { years: "2017 — 2021", title: "Staff engineer", org: "(previous)", notes: "Backend infrastructure for large-scale scientific data pipelines." },
  { years: "2014 — 2017", title: "Senior engineer", org: "(previous)", notes: "Payments, ledgers, reliability." },
  { years: "2010 — 2014", title: "Engineer", org: "(previous)", notes: "Systems programming, tooling, storage." },
];

const publications = [
  { year: "2026", title: "Agent Experience", where: "Notebook" },
  { year: "2026", title: "Context is Infrastructure", where: "Notebook" },
  { year: "2025", title: "The Sovereign Engineer", where: "Notebook" },
  { year: "2024", title: "Notes on long-running agents", where: "Preprint" },
];

function CV() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        <div>
          <div className="smallcaps text-copper mb-4">§ Curriculum vitae</div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">Chris Daley</h1>
          <p className="mt-3 text-muted-foreground">
            Engineer · researcher · open-source developer
          </p>
        </div>
        <button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="no-print text-xs font-mono uppercase tracking-widest text-muted-foreground border border-border px-3 py-2 hover:border-copper hover:text-copper transition-colors"
        >
          Print
        </button>
      </div>

      <div className="chart-rule my-12" />

      <section>
        <h2 className="smallcaps text-muted-foreground mb-4">Experience</h2>
        <ol className="divide-y divide-border">
          {roles.map((r) => (
            <li key={r.years + r.title} className="py-5 grid grid-cols-[8rem_1fr] gap-6">
              <span className="font-mono text-xs text-muted-foreground pt-1">{r.years}</span>
              <div>
                <div className="font-serif text-lg text-foreground">{r.title}</div>
                <div className="text-sm text-muted-foreground">{r.org}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.notes}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="smallcaps text-muted-foreground mb-4">Selected writing</h2>
        <ol className="divide-y divide-border">
          {publications.map((p) => (
            <li key={p.title} className="py-3 grid grid-cols-[5rem_1fr_auto] gap-4">
              <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
              <span className="font-serif text-foreground">{p.title}</span>
              <span className="text-xs text-muted-foreground">{p.where}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="smallcaps text-muted-foreground mb-2">Areas</div>
          <p className="text-foreground leading-relaxed">Agent experience · distributed systems · Bitcoin · Nostr · scientific computing</p>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-2">Languages</div>
          <p className="text-foreground font-mono">Rust · TypeScript · Go · Python</p>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-2">Available for</div>
          <p className="text-foreground leading-relaxed">Advisory · research collaborations · speaking</p>
        </div>
      </section>
    </div>
  );
}
