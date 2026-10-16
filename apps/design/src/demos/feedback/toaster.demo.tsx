import { Button, toast } from "@locusgraph/components";
import { defineDemo, select, text } from "../../registry/define-demo";

const kinds = ["success", "info", "warning", "error"] as const;

function AllKinds() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("Plan upgraded")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("Invoice sent")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Usage at 90%")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Payment failed")}>
        Error
      </Button>
    </div>
  );
}

export default defineDemo({
  title: "Toaster",
  description:
    "Short messages after an action. Render one Toaster per app and call toast from anywhere.",
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
    { name: "...props", type: "ToasterProps from sonner" },
  ],
  examples: {
    AllKinds: {
      description: "Each type takes its color from the theme status tokens.",
      component: AllKinds,
    },
  },
});
