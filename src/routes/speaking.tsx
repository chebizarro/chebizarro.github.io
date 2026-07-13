import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: [
      { title: "Speaking — Chris Daley" },
      { name: "description", content: "Talks on sovereign infrastructure, Nostr as an engineering substrate, and auditable agent fleets." },
      { property: "og:title", content: "Speaking — Chris Daley" },
      { property: "og:description", content: "Talks and appearances." },
      { property: "og:url", content: "/speaking" },
    ],
    links: [{ rel: "canonical", href: "/speaking" }],
  }),
  component: Speaking,
});

const talks: { date: string; venue: string; city: string; title: string; status: string; href?: string }[] = [
  {
    date: "2025-10-18",
    venue: "Nostr Valley 2.0",
    city: "State College, PA",
    title: "Building a Git-Centric Community Platform",
    status: "recorded",
    href: "https://youtu.be/30MQDqgO2Fo",
  },
];

function Speaking() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <div className="smallcaps text-copper mb-6">§ Speaking</div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight">
        Talks, on request.
      </h1>
      <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
        I speak about sovereign infrastructure, Nostr as an engineering
        substrate, security for people who actually get targeted, and what
        it takes to run fleets of AI agents you can audit. For a booking,
        use the{" "}
        <a href="/contact" className="text-copper hover:underline">contact page</a>.
      </p>
      <div className="chart-rule mt-12 mb-10" />
      {talks.length === 0 ? (
        <p className="text-muted-foreground italic font-serif">
          The talk archive is being assembled — entries appear here as
          they're confirmed.
        </p>
      ) : (
        <ol className="divide-y divide-border">
          {talks.map((t) => (
            <li key={t.date + t.title} className="py-6 grid grid-cols-[7rem_1fr_auto] gap-6 items-baseline">
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {new Date(t.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
              </span>
              <div>
                <div className="font-serif text-xl text-foreground">
                  {t.href ? (
                    <a href={t.href} className="hover:text-copper transition-colors">
                      {t.title} ↗
                    </a>
                  ) : (
                    t.title
                  )}
                </div>
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
      )}
    </div>
  );
}
