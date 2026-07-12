import type { ContentEntry } from "../../lib/content";
import { formatDate } from "../../lib/content";
import { Link } from "@tanstack/react-router";

export function ProseArticle({ entry, kicker }: { entry: ContentEntry; kicker?: string }) {
  const toc = entry.headings.filter((h) => h.depth <= 3);
  return (
    <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mb-12 fade-up">
        {kicker && (
          <div className="smallcaps text-copper mb-4">{kicker}</div>
        )}
        <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] max-w-3xl text-foreground">
          {entry.meta.title}
        </h1>
        {entry.meta.description && (
          <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl font-serif italic leading-relaxed">
            {entry.meta.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
          <span>{formatDate(entry.meta.date)}</span>
          <span aria-hidden>·</span>
          <span>{entry.readingMinutes} min read</span>
          {entry.meta.tags?.map((t) => (
            <span key={t} className="uppercase tracking-wider">#{t}</span>
          ))}
        </div>
      </div>

      <div className="chart-rule mb-12" />

      <div className="grid lg:grid-cols-[1fr_16rem] gap-12">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
        {toc.length > 0 && (
          <aside className="hidden lg:block no-print">
            <div className="sticky top-24">
              <div className="smallcaps text-muted-foreground mb-3">Contents</div>
              <ol className="space-y-1.5 text-sm">
                {toc.map((h) => (
                  <li
                    key={h.id}
                    style={{ paddingLeft: `${(h.depth - 2) * 0.75}rem` }}
                  >
                    <a
                      href={`#${h.id}`}
                      className="text-muted-foreground hover:text-copper transition-colors block leading-snug"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-8 pt-6 border-t border-border">
                <Link
                  to={"/writing" as any}
                  className="text-xs text-muted-foreground hover:text-copper"
                >
                  ← Back to writing
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}