import { createFileRoute, Link } from "@tanstack/react-router";
import { writing, research, systems, formatDateShort } from "../lib/content";
import heroAsset from "../assets/splash-screen.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const latestWriting = writing.slice(0, 4);
  const featuredResearch = research.filter((r) => r.meta.featured).slice(0, 3);
  const featuredSystems = systems.filter((s) => s.meta.featured).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-16 md:pt-12 fade-up">
        <figure className="rounded-sm overflow-hidden border border-border bg-[oklch(0.17_0.015_240)] shadow-sm">
          <img
            src={heroAsset}
            alt="Diagram of a sovereign systems stack — Nostr-native control planes, agent fleets, and the services that run them."
            className="w-full h-auto block"
            loading="eager"
            decoding="async"
          />
        </figure>
      </section>
      <section className="pt-12 md:pt-16 pb-24 md:pb-32 max-w-4xl fade-up">
        <div className="smallcaps text-copper mb-6">Chris Daley · Notebook &amp; Systems</div>
        <h1 className="font-serif text-[2.6rem] md:text-6xl leading-[1.05] tracking-tight text-foreground">
          AI-native engineering,
          <span className="text-muted-foreground"> where agents are colleagues </span>
          — not chat windows.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          I build engineering organizations where AI agents do real work —
          reviewing code, writing docs, operating desktops, running
          deployments — each with its own identity, policy and audit trail.
          The infrastructure underneath is sovereign by design: the keys,
          the data and the record belong to the people running it. Before
          that, a couple of decades of security work for people who learned
          the hard way what dependency costs. This site is a working
          notebook and a home for the systems I ship.
        </p>
        <div className="mt-10 flex flex-wrap gap-6 text-sm">
          <Link to="/systems" className="text-foreground border-b border-copper pb-0.5 hover:text-copper transition-colors">
            See the systems →
          </Link>
          <Link to="/research" className="text-muted-foreground hover:text-foreground transition-colors">
            Read the research
          </Link>
          <Link to="/writing" className="text-muted-foreground hover:text-foreground transition-colors">
            Latest writing
          </Link>
        </div>
      </section>

      <div className="chart-rule" />

      <section className="py-20 md:py-24 grid md:grid-cols-[14rem_1fr] gap-10">
        <div>
          <div className="smallcaps text-muted-foreground">§ I</div>
          <h2 className="font-serif text-2xl mt-2">Current areas of work</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {[
            { title: "Agent experience (AX)", body: "Designing the environments agents do their best work in: semantic interfaces, deterministic context, closed feedback loops." },
            { title: "Agent fleets & identity", body: "Autonomous agents as accountable colleagues — real cryptographic identities, policies, and audit trails, and no raw keys." },
            { title: "Memory that isn't RAG", body: "What agents need to remember — reference truth, episodic recall, institutional doctrine — as separate, provenance-tracked services." },
            { title: "Sovereign control planes", body: "Deployments, review and shared state as signed events on infrastructure you own — platforms optional." },
          ].map((r) => (
            <div key={r.title}>
              <div className="font-serif text-lg text-foreground">{r.title}</div>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="chart-rule" />

      <section className="py-20 md:py-24 grid md:grid-cols-[14rem_1fr] gap-10">
        <div>
          <div className="smallcaps text-muted-foreground">§ II</div>
          <h2 className="font-serif text-2xl mt-2">Latest writing</h2>
          <Link to="/writing" className="text-xs text-copper hover:underline mt-3 inline-block">Index →</Link>
        </div>
        <ol className="divide-y divide-border">
          {latestWriting.map((w, i) => (
            <li key={w.meta.slug} className="py-5 first:pt-0 grid grid-cols-[3rem_1fr_auto] gap-6 items-baseline">
              <span className="font-mono text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <Link
                  to="/writing/$slug"
                  params={{ slug: w.meta.slug }}
                  className="font-serif text-xl text-foreground hover:text-copper transition-colors"
                >
                  {w.meta.title}
                </Link>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed max-w-xl">{w.meta.description}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground hidden sm:block">{formatDateShort(w.meta.date)}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="chart-rule" />

      <section className="py-20 md:py-24 grid md:grid-cols-[14rem_1fr] gap-10">
        <div>
          <div className="smallcaps text-muted-foreground">§ III</div>
          <h2 className="font-serif text-2xl mt-2">Featured systems</h2>
          <Link to="/systems" className="text-xs text-copper hover:underline mt-3 inline-block">All systems →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {featuredSystems.map((s) => (
            <Link
              key={s.meta.slug}
              to="/systems/$slug"
              params={{ slug: s.meta.slug }}
              className="group border border-border rounded-sm p-6 bg-card hover:border-copper transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-serif text-xl text-foreground group-hover:text-copper transition-colors">
                  {s.meta.title}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.meta.status}</span>
              </div>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.meta.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {s.meta.stack?.map((t) => <span key={t}>{t}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="chart-rule" />

      <section className="py-20 md:py-24 grid md:grid-cols-[14rem_1fr] gap-10">
        <div>
          <div className="smallcaps text-muted-foreground">§ IV</div>
          <h2 className="font-serif text-2xl mt-2">Selected research</h2>
          <Link to="/research" className="text-xs text-copper hover:underline mt-3 inline-block">All essays →</Link>
        </div>
        <ul className="space-y-6">
          {featuredResearch.map((r) => (
            <li key={r.meta.slug}>
              <Link
                to="/research/$slug"
                params={{ slug: r.meta.slug }}
                className="font-serif text-2xl text-foreground hover:text-copper transition-colors"
              >
                {r.meta.title}
              </Link>
              <p className="text-muted-foreground mt-2 max-w-2xl italic font-serif">
                {r.meta.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="chart-rule" />

      <section className="py-20 md:py-24 grid md:grid-cols-2 gap-10">
        <div>
          <div className="smallcaps text-muted-foreground mb-3">Speaking</div>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Available for talks on building AI-native engineering
            organizations, agent experience, and running fleets of AI
            agents you can actually audit.
          </p>
          <Link to="/speaking" className="text-copper hover:underline text-sm mt-3 inline-block">Speaking →</Link>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-3">Open source</div>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Most of what I build ships as an open repository — and much of
            it was built alongside the same kinds of agents it exists to
            support.
          </p>
          <a href="https://github.com/chebizarro" className="text-copper hover:underline text-sm mt-3 inline-block">GitHub →</a>
        </div>
      </section>
    </div>
  );
}
