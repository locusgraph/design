import { Button, toast } from "@locusgraph/components";
import { defineDemo, select, text } from "../../registry/define-demo";

const kinds = ["success", "info", "warning", "error"] as const;

const examples = {
  success: () =>
    toast.success("Plan upgraded", { description: "Pro starts today. Next invoice on Nov 28." }),
  info: () => toast.info("Invoice sent", { description: "INV-2041 went to ap@northwind.io." }),
  warning: () =>
    toast.warning("Usage at 90%", { description: "8,620 of 10,000 recalls this month." }),
  error: () =>
    toast.error("Payment failed", {
      description: "Visa ending 4242 was declined.",
      action: { label: "Retry", onClick: () => toast.success("Payment retried") },
    }),
};

function AllKinds() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={examples.success}>
        Success
      </Button>
      <Button variant="outline" onClick={examples.info}>
        Info
      </Button>
      <Button variant="outline" onClick={examples.warning}>
        Warning
      </Button>
      <Button variant="outline" onClick={examples.error}>
        Error
      </Button>
    </div>
  );
}

export default defineDemo({
  title: "Toaster",
  description:
    "Short messages after an action: a quiet square card with a status icon, a title, an optional detail line and one action. Render one Toaster per app and call toast from anywhere.",
  controls: { kind: select(kinds), message: text("Plan upgraded") },
  playground: ({ kind, message }) => (
    <Button variant="outline" onClick={() => toast[kind](message)}>
      Show toast
    </Button>
  ),
  code: ({ kind, message }) =>
    `<Toaster theme={theme} />\n\n<Button onClick={() => toast.${kind}("${message}")}>Show toast</Button>`,
  props: [
    { name: "theme", type: "light | dark | system", defaultValue: "system" },
    {
      name: "position",
      type: "top-left | top-right | bottom-left | bottom-right | …",
      defaultValue: "bottom-right",
    },
    { name: "expand", type: "boolean", defaultValue: "true" },
    { name: "gap", type: "number", defaultValue: "8" },
    { name: "...props", type: "ToasterProps from sonner" },
  ],
  examples: {
    AllKinds: {
      description:
        "A title, a muted detail line and at most one action. Only the icon carries the status color; the card stays neutral.",
      component: AllKinds,
    },
  },
});
