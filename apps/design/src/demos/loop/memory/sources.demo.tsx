import { type SourceItem, Sources } from "@locusgraph/loop";
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
    "The sources an answer used as one quiet line of text that opens to an indented, numbered list matching the inline chips. Takes Citation items or AI SDK source-url parts; url parts are numbered by position to match Inline Citation.",
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
    { name: "firstIndex", type: "number", defaultValue: "1" },
  ],
  examples: {},
  isNew: true,
});
