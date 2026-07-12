import { createFileRoute, notFound } from "@tanstack/react-router";
import { getEntry } from "../lib/content";
import { ProseArticle } from "../components/site/prose-article";

export const Route = createFileRoute("/research/$slug")({
  loader: ({ params }) => {
    const entry = getEntry("research", params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — Chris Daley" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.meta.title} — Research — Chris Daley` },
        { name: "description", content: loaderData.meta.description },
        { property: "og:title", content: loaderData.meta.title },
        { property: "og:description", content: loaderData.meta.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/research/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/research/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
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
    return <ProseArticle entry={entry} kicker="Research" />;
  },
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">Essay not found</h1>
    </div>
  );
}
