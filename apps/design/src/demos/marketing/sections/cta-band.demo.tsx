import { CtaBand } from "@locusgraph/marketing";
import { defineDemo, toggle } from "../../../registry/define-demo";

export default defineDemo({
  title: "CTA Band",
  description:
    "A full-width call to action between sections or above the footer: a heading, a line of copy and up to two actions on a tinted band.",
  controls: { description: toggle(true) },
  playground: ({ description }) => (
    <div className="w-full">
      <CtaBand
        title="Let your agents act, safely"
        description={description ? "Start free. Add a card when you need more." : undefined}
        actions={[
          { label: "Start free", href: "#start" },
          { label: "Talk to us", href: "#contact" },
        ]}
      />
    </div>
  ),
  code: () => `<CtaBand
  title="Let your agents act, safely"
  description="Start free. Add a card when you need more."
  actions={[
    { label: "Start free", href: "/signup" },
    { label: "Talk to us", href: "/contact" },
  ]}
/>`,
  props: [
    { name: "title", type: "ReactNode" },
    { name: "description", type: "ReactNode" },
    { name: "actions", type: "{ label, href, variant? }[]" },
    { name: "linkComponent", type: 'LinkComponent | "a"', defaultValue: '"a"' },
    { name: "id", type: "string" },
  ],
  examples: {},
  isNew: true,
});
