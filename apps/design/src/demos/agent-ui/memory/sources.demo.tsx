import { type SourceItem, Sources } from "@locusgraph/agent-ui";
import { defineDemo, toggle } from "../../../registry/define-demo";

const sources: SourceItem[] = [
  {
    index: 1,
    title: "How recall ranks memories",
    url: "https://docs.locusgraph.com/concepts/recall",
  },
  { index: 2, title: "Team note: retention policy" },
  {
    type: "source-url",
    sourceId: "src_stripe",
    url: "https://docs.stripe.com/billing/subscriptions/usage-based",
    title: "Usage-based billing",
  },
  { type: "source-url", sourceId: "src_d1", url: "https://developers.cloudflare.com/d1/" },
];

export default defineDemo({
  title: "Sources",
  description:
    "A compact, collapsible list of the sources an answer used, marked by the initial of each host. Takes Citation items or AI SDK source-url parts; url parts are numbered by position to match Inline Citation.",
  controls: { open: toggle(true) },
  playground: ({ open }) => (
    <div className="w-full max-w-xl">
      <Sources key={String(open)} sources={sources} defaultOpen={open} />
    </div>
  ),
  code: ({ open }) =>
    `<Sources sources={message.sources}${open ? " defaultOpen" : ""} onOpen={openSource} />`,
  props: [
    { name: "sources", type: "Array<Citation | SourceUrlPart>" },
    { name: "onOpen", type: "(citation: Citation) => void" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
  ],
  examples: {},
  isNew: true,
});
