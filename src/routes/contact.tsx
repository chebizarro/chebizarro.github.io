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
          <dd><a href="mailto:chris@cascadiatm.com" className="font-mono text-foreground hover:text-copper">chris@cascadiatm.com</a></dd>
          <p className="text-xs text-muted-foreground mt-1">For anything substantive. Reply within about a week.</p>
        </div>
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">Nostr</dt>
          <dd>
            <a
              href="https://njump.me/npub1ehhfg09mr8z34wz85ek46a6rww4f7c7jsujxhdvmpqnl5hnrwsqq2szjqv"
              className="font-mono text-foreground hover:text-copper break-all text-sm"
            >
              npub1ehhfg09mr8z34wz85ek46a6rww4f7c7jsujxhdvmpqnl5hnrwsqq2szjqv
            </a>
          </dd>
          <p className="text-xs text-muted-foreground mt-1">For public conversation and correspondence in the open.</p>
        </div>
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">Signal</dt>
          <dd><a href="https://signal.me/#eu/MHc6Ns0Ta84JUTcVj_jPKn-M79MQfYYM5sUfjDoyKLhMg0-SyJBDKbHhIFMpXzvy" className="font-mono text-foreground hover:text-copper break-all text-sm">biz.99</a></dd>
          <p className="text-xs text-muted-foreground mt-1">For secure messaging and real-time coordination.</p>
        </div>
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">GitHub</dt>
          <dd><a href="https://github.com/chebizarro" className="font-mono text-foreground hover:text-copper">github.com/chebizarro</a></dd>
          <p className="text-xs text-muted-foreground mt-1">Issues and pull requests on any of the systems.</p>
        </div>
        <div>
          <dt className="smallcaps text-muted-foreground mb-2">Encrypted</dt>
          <dd className="font-mono text-foreground text-xs">NIP-17 DM to the npub above</dd>
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
