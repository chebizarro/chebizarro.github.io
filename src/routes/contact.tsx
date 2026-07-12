import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Chris Daley" },
      { name: "description", content: "Correspondence, advisory, speaking and collaboration." },
      { property: "og:title", content: "Contact — Chris Daley" },
      { property: "og:description", content: "How to reach me." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <div className="smallcaps text-copper mb-6">§ Contact</div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight">
        Correspondence, warmly received.
      </h1>
      <p className="mt-6 text-muted-foreground leading-relaxed">
        The best way to reach me depends on what you'd like to talk about.
        The channels below are all real; the response times are not
        identical.
      </p>

      <div className="chart-rule my-12" />

      <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">Email</dt>
          <dd><a href="mailto:hello@chrisdaley.dev" className="font-mono text-foreground hover:text-copper">hello@chrisdaley.dev</a></dd>
          <p className="text-xs text-muted-foreground mt-1">For anything substantive. Reply within about a week.</p>
        </div>
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">Nostr</dt>
          <dd className="font-mono text-foreground break-all text-sm">npub1…</dd>
          <p className="text-xs text-muted-foreground mt-1">For public conversation and correspondence in the open.</p>
        </div>
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">GitHub</dt>
          <dd><a href="https://github.com/" className="font-mono text-foreground hover:text-copper">github.com/chrisdaley</a></dd>
          <p className="text-xs text-muted-foreground mt-1">Issues and pull requests on any of the systems.</p>
        </div>
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">PGP</dt>
          <dd className="font-mono text-foreground text-xs">DA1E · Y 2026 · fingerprint on request</dd>
          <p className="text-xs text-muted-foreground mt-1">For anything you'd rather not send in the clear.</p>
        </div>
      </dl>

      <div className="chart-rule my-14" />

      <p className="text-muted-foreground italic font-serif">
        Please, no automated outreach, no sourcing for unrelated roles, and
        no NDAs before we've said hello.
      </p>
    </div>
  );
}
