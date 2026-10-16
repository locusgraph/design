import { InlineCitation } from "@locusgraph/agent-ui";
import { defineDemo, toggle } from "../../../registry/define-demo";

const recallDoc = {
  index: 1,
  title: "How recall ranks memories",
  url: "https://docs.locusgraph.com/concepts/recall",
  snippet:
    "Recall scores each memory by semantic similarity, recency and how often it was confirmed, then returns the top results within the token budget.",
};

const teamNote = {
  index: 2,
  title: "Team note: retention policy",
  snippet: "Memories older than 18 months are archived unless pinned by a workspace admin.",
};

function InAnswer() {
  return (
    <p className="max-w-prose text-sm leading-relaxed">
      Recall weighs similarity, recency and confirmations
      <InlineCitation citation={recallDoc} />, and memories older than 18 months are archived unless
      an admin pins them
      <InlineCitation citation={teamNote} onOpen={() => {}} />.
    </p>
  );
}

export default defineDemo({
  title: "Inline Citation",
  description:
    "A small numbered chip next to a claim. Hover or focus shows the source title, host and snippet. A citation with a url is a link; without one it is a button that calls onOpen.",
  controls: { withUrl: toggle(true) },
  playground: ({ withUrl }) => (
    <p className="max-w-prose text-sm">
      Recall ranks memories by relevance and recency
      <InlineCitation citation={withUrl ? recallDoc : teamNote} />.
    </p>
  ),
  code: ({ withUrl }) =>
    `<p>\n  Recall ranks memories by relevance and recency\n  <InlineCitation citation={${withUrl ? "recallDoc" : "teamNote"}} />.\n</p>`,
  props: [
    { name: "citation", type: "Citation" },
    { name: "onOpen", type: "(citation: Citation) => void" },
    { name: "className", type: "string" },
  ],
  examples: {
    InAnswer: {
      description: "Two citations inside an assistant answer, numbered to match Sources.",
      component: InAnswer,
    },
  },
  previewHeight: "tall",
  isNew: true,
});
