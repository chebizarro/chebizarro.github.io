import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Chris Daley" },
      { name: "description", content: "The recurring themes of a working life spent between security for movements and sovereign, Nostr-native systems." },
      { property: "og:title", content: "About — Chris Daley" },
      { property: "og:description", content: "The recurring themes of the work." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const themes = [
  { t: "Sovereignty", d: "Owned tools, owned keys, owned data — platforms as optional. The organising principle behind everything below." },
  { t: "Nostr", d: "Signed events as a substrate for identity, git, deployment, review and coordination — not a timeline." },
  { t: "Security for people", d: "Years of holistic security work with activists, journalists and NGOs. Threat models with humans in them." },
  { t: "Agent fleets", d: "Autonomous agents as first-class operators — with real identities, policies, provenance and audit trails." },
  { t: "Memory & knowledge", d: "Reference truth, episodic recall and institutional doctrine as separate systems, each with provenance." },
  { t: "Distributed systems", d: "State that survives partitions, machines, decades and companies. PostgreSQL canonical; everything else derived." },
  { t: "Local inference", d: "Models running on hardware I control. Code that never leaves the building it was written in." },
  { t: "Open source", d: "Legibility, permissive licenses, and code that outlives its author." },
];

function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <div className="smallcaps text-copper mb-6">§ About</div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight">
        Not a résumé. The themes that keep pulling me back.
      </h1>
      <div className="prose mt-10">
        <p>
          I've had two working lives that turned out to be the same one.
          The first was security — the holistic kind, done with activists,
          journalists and NGOs, where the threat model has real people in
          it and the cost of platform dependency is not theoretical. The
          second is engineering: building the sovereign alternative instead
          of writing another assessment recommending one. The systems on
          this site — a Nostr-native deployment control plane, a key bunker
          for agent fleets, code review on local models, knowledge
          infrastructure with provenance — are what that looks like when
          you follow the logic all the way down.
        </p>
        <p>
          The road here was not a straight line: logistics for MSF and Oxfam
          in Pakistan, Malawi and Papua New Guinea; actions and security for
          Greenpeace from Sydney to Amsterdam to Jakarta; a decade running a
          technical consultancy; a stint building sovereign engineering
          infrastructure at Budabit. These days I'm Director of Engineering
          at Feanix, building an AI-native engineering organization — and
          the systems on this site are the open-source spine of how I think
          that should work.
        </p>
        <p>
          If you want the dated version, the <a href="/cv">CV</a> is one
          click away.
        </p>
        <h2>Recurring themes</h2>
      </div>
      <dl className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
        {themes.map((th) => (
          <div key={th.t}>
            <dt className="font-serif text-xl text-foreground">{th.t}</dt>
            <dd className="text-muted-foreground text-sm mt-1 leading-relaxed">{th.d}</dd>
          </div>
        ))}
      </dl>
      <div className="prose mt-16">
        <h2>How I work</h2>
        <p>
          Keys before accounts. Protocols before platforms. Local before
          remote. I run a fleet of AI agents as colleagues — each with its
          own signed identity, policy and audit trail — and I hold the
          systems they work in to the same standard I'd demand for any
          human team: legible, replayable, and honest about failure.
        </p>
        <h2>Where to find me</h2>
        <p>
          The <a href="/writing">notebook</a> is the best place. Longer
          essays live in <a href="/research">research</a>. Working software
          is in <a href="/systems">systems</a>. Correspondence and speaking
          requests through <a href="/contact">contact</a>.
        </p>
      </div>
    </div>
  );
}
