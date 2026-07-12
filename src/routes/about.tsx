import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Chris Daley" },
      { name: "description", content: "The recurring themes that have shaped a career at the intersection of AI, distributed systems, Bitcoin, Nostr and open source." },
      { property: "og:title", content: "About — Chris Daley" },
      { property: "og:description", content: "The recurring themes of the work." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const themes = [
  { t: "Human capability", d: "Software as a lever for what one motivated person can do end-to-end." },
  { t: "Distributed systems", d: "State that survives partitions, machines, decades and companies." },
  { t: "Scientific computing", d: "Reproducible pipelines and honest measurement of what a system actually does." },
  { t: "Bitcoin", d: "Sound settlement, portable value, payments as engineering." },
  { t: "Nostr", d: "Signed events as a substrate for identity, publishing and collaboration." },
  { t: "AI systems", d: "Agents as a first-class kind of software with their own design discipline." },
  { t: "Sovereignty", d: "Owned tools, owned keys, owned data — platforms as optional." },
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
          I've spent the working part of my life at the intersection of a few
          fields that most industries treat as separate — distributed
          systems, scientific computing, cryptography, and, more recently,
          agent-based AI. This page is not a chronology. It's the shorter,
          truer document: the recurring ideas the work keeps returning to,
          in whatever role or company happens to hold it that year.
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
          Local-first, text-first, keyboard-first. I prefer small tools
          composed carefully to large platforms adopted enthusiastically.
          I like the discipline of writing things down and the humility of
          re-reading them later.
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
