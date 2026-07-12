import { createFileRoute } from "@tanstack/react-router";
import { writing } from "../lib/content";
import { EntryList, IndexPageShell } from "../components/site/entry-list";

export const Route = createFileRoute("/writing/")({
  head: () => ({
    meta: [
      { title: "Writing — Chris Daley" },
      { name: "description", content: "Shorter notes, working memos and observations on tools, agents and the craft of software." },
      { property: "og:title", content: "Writing — Chris Daley" },
      { property: "og:description", content: "Shorter notes and working memos." },
      { property: "og:url", content: "/writing" },
    ],
    links: [{ rel: "canonical", href: "/writing" }],
  }),
  component: () => (
    <IndexPageShell
      kicker="§ Writing"
      title="Notes from the workbench."
      intro="Working memos, observations, and shorter pieces. The research archive lives one step deeper."
    >
      <EntryList entries={writing} base="/writing" />
    </IndexPageShell>
  ),
});
