import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Chris Daley" },
      { name: "description", content: "Curriculum vitae: roles, systems and open-source work." },
      { property: "og:title", content: "CV — Chris Daley" },
      { property: "og:description", content: "Curriculum vitae." },
      { property: "og:url", content: "/cv" },
    ],
    links: [{ rel: "canonical", href: "/cv" }],
  }),
  component: CV,
});

const roles = [
  { years: "2025 —", title: "Director of Engineering", org: "Feanix", notes: "Building an AI-native engineering organization at a biotech applying genomics and AI to global farming. Agents as first-class engineers, humans as their editors." },
  { years: "2014 — 2026", title: "Director", org: "Cascadia Technical Mentorship", notes: "Technical mentorship and consultancy: security assessments, training, and confidential technical projects for clients who needed both engineering and discretion." },
  { years: "2024 — 2025", title: "Principal Engineer", org: "Budabit", notes: "Sovereign infrastructure for engineering organizations: browser-native Git, decentralized CI/CD, cryptographic engineering identity, and autonomous agents — Git, Nostr and agents combined into an open platform to replace centralized developer collaboration." },
  { years: "2013 — 2014", title: "Regional Security Manager", org: "Greenpeace Southeast Asia", notes: "Development and implementation of security plans for campaigns in high-risk areas across Southeast Asia, based in Jakarta." },
  { years: "2012", title: "Action Coordinator & Activist", org: "Freelance", notes: "Actions and coordination for Greenpeace, Rising Tide, South East Forest Rescue and Friends of the Earth in Australia — including the super-trawler blockade at Port Lincoln." },
  { years: "2011 — 2012", title: "Rivers Campaigner", org: "The Wilderness Society Australia", notes: "Campaigning for river protection and restoration in New South Wales, including the Murray-Darling Basin." },
  { years: "2010", title: "Logistics Manager / Coordinator", org: "Médecins Sans Frontières", notes: "Logistics for a measles mass-vaccination campaign in Malawi — seven expatriate logisticians, hundreds of national staff — and an exploratory mission to Papua New Guinea that became a cholera intervention on the Bamu River." },
  { years: "2006 — 2009", title: "International Actions & Logistics Manager", org: "Greenpeace International", notes: "International coordination of ship, land and air operations from Amsterdam; security planning and training, including information security. Previously warehouse and fleet management in Sydney." },
  { years: "2006", title: "Logistics Manager", org: "Oxfam", notes: "Emergency relief logistics in the earthquake-affected North West Frontier Province of Pakistan, supporting water and sanitation projects across a broad area." },
];

const publications = [
  { year: "2026", title: "Agent experience", where: "Notebook (draft)" },
  { year: "2026", title: "Context is infrastructure", where: "Notebook (draft)" },
  { year: "2026", title: "Nostr as an engineering substrate", where: "Notebook" },
  { year: "2026", title: "The sovereign engineer", where: "Notebook (draft)" },
];

function CV() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        <div>
          <div className="smallcaps text-copper mb-4">§ Curriculum vitae</div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">Chris Daley</h1>
          <p className="mt-3 text-muted-foreground">
            AI systems · agent experience · sovereign infrastructure — Winlock, Washington
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
          <p className="text-foreground leading-relaxed">Sovereign infrastructure · Nostr · agent fleets · holistic security · field logistics</p>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-2">Languages</div>
          <p className="text-foreground font-mono">Go · C · TypeScript</p>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-2">Available for</div>
          <p className="text-foreground leading-relaxed">Advisory · security work · speaking · collaborations</p>
        </div>
      </section>
    </div>
  );
}
