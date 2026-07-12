import { createFileRoute } from "@tanstack/react-router";
import { research } from "../lib/content";
import { EntryList, IndexPageShell } from "../components/site/entry-list";

export const Route = createFileRoute("/research/")({
  head: () => ({
    meta: [
      { title: "Research — Chris Daley" },
      { name: "description", content: "Long-form essays on agent experience, sovereign infrastructure, memory, capability and the shape of AI-native software." },
      { property: "og:title", content: "Research — Chris Daley" },
      { property: "og:description", content: "Long-form essays on agent experience and sovereign infrastructure." },
      { property: "og:url", content: "/research" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: () => (
    <IndexPageShell
      kicker="§ Research"
      title="Long-form essays."
      intro="A permanent home for the essays I intend to hold up over time — closer to whitepapers than to blog posts."
    >
      <EntryList entries={research} base="/research" />
    </IndexPageShell>
  ),
});
