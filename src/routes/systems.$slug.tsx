import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getEntry } from "../lib/content";
import { ProseArticle } from "../components/site/prose-article";

export const Route = createFileRoute("/systems/$slug")({
  loader: ({ params }) => {
    const entry = getEntry("systems", params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.meta.title} — Systems — Chris Daley` },
        { name: "description", content: loaderData.meta.description },
        { property: "og:title", content: loaderData.meta.title },
        { property: "og:description", content: loaderData.meta.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/systems/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/systems/${params.slug}` }],
    };
  },
  component: SystemDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">System not found</h1>
    </div>
  ),
});

function SystemDetail() {
  const entry = Route.useLoaderData();
  return (
    <>
      <ProseArticle entry={entry} kicker="System" />
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="chart-rule mb-10" />
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="smallcaps text-muted-foreground mb-2">Stack</div>
            <div className="font-mono text-foreground">{entry.meta.stack?.join(" · ") ?? "—"}</div>
          </div>
          <div>
            <div className="smallcaps text-muted-foreground mb-2">Role</div>
            <div className="text-foreground">{entry.meta.role ?? "—"}</div>
          </div>
          <div>
            <div className="smallcaps text-muted-foreground mb-2">Repository</div>
            {entry.meta.repo ? (
              <a href={entry.meta.repo} className="text-copper hover:underline break-all">{entry.meta.repo}</a>
            ) : (
              <span className="text-muted-foreground">private</span>
            )}
          </div>
        </div>
        <div className="mt-10">
          <Link to="/systems" className="text-sm text-muted-foreground hover:text-copper">← All systems</Link>
        </div>
      </div>
    </>
  );
}
