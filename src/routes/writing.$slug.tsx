import { createFileRoute, notFound } from "@tanstack/react-router";
import { getEntry } from "../lib/content";
import { ProseArticle } from "../components/site/prose-article";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const entry = getEntry("writing", params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — Chris Daley" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.meta.title} — Chris Daley` },
        { name: "description", content: loaderData.meta.description },
        { property: "og:title", content: loaderData.meta.title },
        { property: "og:description", content: loaderData.meta.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://chrisdaley.biz/writing/${params.slug}` },
        { property: "og:image", content: loaderData.meta.ogImage ? `https://chrisdaley.biz${loaderData.meta.ogImage}` : "https://chrisdaley.biz/og-default.png" },
        { property: "article:published_time", content: loaderData.meta.date },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: loaderData.meta.ogImage ? `https://chrisdaley.biz${loaderData.meta.ogImage}` : "https://chrisdaley.biz/og-default.png" },
      ],
      links: [{ rel: "canonical", href: `/writing/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData.meta.title,
          description: loaderData.meta.description,
          datePublished: loaderData.meta.date,
          author: { "@type": "Person", name: "Chris Daley" },
        }),
      }],
    };
  },
  component: () => {
    const entry = Route.useLoaderData();
    return <ProseArticle entry={entry} kicker="Writing" />;
  },
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">Not in the notebook</h1>
      <p className="mt-4 text-muted-foreground">This entry doesn't exist, or has been retired.</p>
    </div>
  );
}
