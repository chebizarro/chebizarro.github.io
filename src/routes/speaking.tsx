import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: [
      { title: "Speaking — Chris Daley" },
      { name: "description", content: "Recent and upcoming talks on agent experience, sovereign infrastructure, and the craft of AI-native software." },
      { property: "og:title", content: "Speaking — Chris Daley" },
      { property: "og:description", content: "Recent and upcoming talks." },
      { property: "og:url", content: "/speaking" },
    ],
    links: [{ rel: "canonical", href: "/speaking" }],
  }),
  component: Speaking,
});

const talks = [
  { date: "2026-06-12", venue: "AI Engineer World's Fair", city: "San Francisco", title: "Agent Experience: designing the environments agents work in", status: "upcoming" },
  { date: "2026-04-04", venue: "Bitcoin++", city: "Riga", title: "Sovereign development: identity, code and settlement", status: "past" },
  { date: "2026-02-18", venue: "Local-First Conf", city: "Berlin", title: "Context is infrastructure", status: "past" },
  { date: "2025-11-09", venue: "NostrWorld", city: "Lisbon", title: "Events all the way down", status: "past" },
  { date: "2025-09-22", venue: "SREcon EMEA", city: "Dublin", title: "Reliability engineering for agent systems", status: "past" },
];

function Speaking() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <div className="smallcaps text-copper mb-6">§ Speaking</div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight">
        Occasional talks, mostly on agent experience and sovereign systems.
      </h1>
      <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
        I speak a few times a year. For a booking, use the{" "}
        <a href="/contact" className="text-copper hover:underline">contact page</a>.
      </p>
      <div className="chart-rule mt-12 mb-10" />
      <ol className="divide-y divide-border">
        {talks.map((t) => (
          <li key={t.date + t.title} className="py-6 grid grid-cols-[7rem_1fr_auto] gap-6 items-baseline">
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {new Date(t.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
            </span>
            <div>
              <div className="font-serif text-xl text-foreground">{t.title}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {t.venue} · {t.city}
              </div>
            </div>
            <span className={"text-[10px] font-mono uppercase tracking-widest " + (t.status === "upcoming" ? "text-copper" : "text-muted-foreground")}>
              {t.status}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
