import { Badge, Button, Spinner } from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";

const sizes = ["size-4", "size-3", "size-6", "size-8"] as const;

function InButton() {
  return (
    <div className="flex items-center gap-3">
      <Button disabled>
        <Spinner />
        Saving
      </Button>
      <Button variant="outline" disabled>
        <Spinner />
        Creating key
      </Button>
    </div>
  );
}

function InBadge() {
  return (
    <Badge variant="secondary">
      <Spinner />
      Syncing usage
    </Badge>
  );
}

function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  );
}

function Inline() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      Loading invoices
    </div>
  );
}

export default defineDemo({
  title: "Spinner",
  description:
    "An animated icon for work in progress. Use it inside buttons and badges or beside a short loading message.",
  controls: { size: select(sizes) },
  playground: ({ size }) => <Spinner className={size} />,
  code: ({ size }) => `<Spinner${size === "size-4" ? "" : ` className="${size}"`} />`,
  props: [
    { name: "className", type: "string", defaultValue: "size-4" },
    { name: "...props", type: 'ComponentProps<"svg">' },
  ],
  examples: {
    InButton: {
      description: "A spinner in a disabled button while a request runs.",
      component: InButton,
    },
    InBadge: { description: "Shows a background job in a badge.", component: InBadge },
    Sizes: { description: "Set the size with a size utility class.", component: Sizes },
    Inline: { description: "Beside text as a loading message.", component: Inline },
  },
});
