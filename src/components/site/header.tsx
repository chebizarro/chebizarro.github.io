import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { to: "/about", label: "About" },
  { to: "/writing", label: "Writing" },
  { to: "/research", label: "Research" },
  { to: "/systems", label: "Systems" },
  { to: "/speaking", label: "Speaking" },
  { to: "/projects", label: "Projects" },
  { to: "/cv", label: "CV" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="border-b border-border/70 bg-background/85 backdrop-blur-sm sticky top-0 z-40 no-print">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-serif text-lg tracking-tight text-foreground hover:text-copper transition-colors"
          aria-label="Home"
        >
          Chris&nbsp;Daley
          <span className="ml-2 text-muted-foreground font-sans text-xs uppercase tracking-[0.2em] hidden sm:inline">
            · Notebook
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => {
            const active = pathname === (n.to as string) || pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                className={
                  "transition-colors " +
                  (active
                    ? "text-foreground border-b border-copper pb-0.5"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {n.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      <nav className="md:hidden border-t border-border/70 overflow-x-auto">
        <div className="mx-auto max-w-6xl px-6 flex gap-5 text-xs py-2 whitespace-nowrap">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}