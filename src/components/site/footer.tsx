import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/70 no-print">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <div className="font-serif text-xl text-foreground">Chris Daley</div>
          <p className="mt-3 text-muted-foreground max-w-sm leading-relaxed">
            Building sovereign, Nostr-native infrastructure — deployment
            control planes, agent identity, code review on local models —
            where the keys, the data and the audit trail belong to the
            people running them.
          </p>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-3">Site</div>
          <ul className="space-y-1.5">
            <li><Link to="/writing" className="hover:text-copper">Writing</Link></li>
            <li><Link to="/research" className="hover:text-copper">Research</Link></li>
            <li><Link to="/systems" className="hover:text-copper">Systems</Link></li>
            <li><Link to="/speaking" className="hover:text-copper">Speaking</Link></li>
            <li><Link to="/cv" className="hover:text-copper">CV</Link></li>
          </ul>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-3">Elsewhere</div>
          <ul className="space-y-1.5">
            <li><a href="https://github.com/chebizarro" className="hover:text-copper">GitHub</a></li>
            <li><a href="https://njump.me/npub1ehhfg09mr8z34wz85ek46a6rww4f7c7jsujxhdvmpqnl5hnrwsqq2szjqv" className="hover:text-copper">Nostr</a></li>
            <li><Link to="/contact" className="hover:text-copper">Contact</Link></li>
            <li><a href="/rss.xml" className="hover:text-copper">RSS</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Chris Daley. Set in Fraunces &amp; Inter Tight.</span>
          <span className="font-mono">signed events · owned keys · notebook v0.2</span>
        </div>
      </div>
    </footer>
  );
}
