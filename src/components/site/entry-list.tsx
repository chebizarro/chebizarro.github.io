import { Link } from "@tanstack/react-router";
import type { ContentEntry } from "../../lib/content";
import { formatDateShort } from "../../lib/content";

interface Props {
  entries: ContentEntry[];
  base: "/writing" | "/research" | "/systems";
}

export function EntryList({ entries, base }: Props) {
  // Group by year
  const byYear = new Map<string, ContentEntry[]>();
  for (const e of entries) {
    const y = new Date(e.meta.date).getFullYear().toString();
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(e);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-14">
      {years.map((y) => (
        <section key={y} className="grid md:grid-cols-[6rem_1fr] gap-8">
          <div className="font-serif text-4xl text-muted-foreground/60 tabular-nums">{y}</div>
          <ol className="divide-y divide-border">
            {byYear.get(y)!.map((e) => (
              <li key={e.meta.slug} className="py-6 first:pt-0">
                <div className="grid grid-cols-[1fr_auto] gap-4 items-baseline">
                  <Link
                    to={`${base}/$slug` as any}
                    params={{ slug: e.meta.slug }}
                    className="font-serif text-xl md:text-2xl text-foreground hover:text-copper transition-colors"
                  >
                    {e.meta.title}
                  </Link>
                  <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {formatDateShort(e.meta.date)}
                  </span>
                </div>
                {e.meta.description && (
                  <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
                    {e.meta.description}
                  </p>
                )}
                {e.meta.tags && (
                  <div className="mt-2 flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {e.meta.tags.map((t) => <span key={t}>#{t}</span>)}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

export function IndexPageShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="mb-16 max-w-3xl">
        <div className="smallcaps text-copper mb-4">{kicker}</div>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">{title}</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{intro}</p>
      </header>
      <div className="chart-rule mb-14" />
      {children}
    </div>
  );
}
