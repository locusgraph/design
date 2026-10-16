import { Button } from "@locusgraph/components";
import { ArrowRightIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
const sizes = ["default", "xs", "sm", "lg"] as const;

function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}

function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button>default</Button>
      <Button size="lg">lg</Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  );
}

function WithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <PlusIcon />
        New key
      </Button>
      <Button variant="destructive">
        <TrashIcon />
        Remove member
      </Button>
    </div>
  );
}

function AsLink() {
  return (
    <Button asChild variant="outline">
      <a href="#billing">
        Billing
        <ArrowRightIcon />
      </a>
    </Button>
  );
}

export default defineDemo({
  title: "Button",
  description:
    "Trigger an action. Variants set the weight, sizes set the density, and asChild renders a link as a button.",
  controls: {
    variant: select(variants),
    size: select(sizes),
    disabled: toggle(),
    label: text("Save"),
  },
  playground: ({ variant, size, disabled, label }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {label}
    </Button>
  ),
  code: ({ variant, size, disabled, label }) =>
    `<Button${formatProp("variant", variant, "default")}${formatProp("size", size, "default")}${formatProp("disabled", disabled, false)}>\n  ${label}\n</Button>`,
  props: [
    { name: "variant", type: variants.join(" | "), defaultValue: "default" },
    {
      name: "size",
      type: "default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg",
      defaultValue: "default",
    },
    { name: "asChild", type: "boolean", defaultValue: "false" },
    { name: "...props", type: 'ComponentProps<"button">' },
  ],
  examples: {
    Variants: {
      description: "Six weights, from a filled primary action to a plain link.",
      component: Variants,
    },
    Sizes: {
      description: "Text sizes for density, and square icon sizes for toolbars.",
      component: Sizes,
    },
    WithIcon: {
      description: "An icon before the label makes the action easier to scan.",
      component: WithIcon,
    },
    AsLink: {
      description: "asChild renders the child element, so a link looks like a button.",
      component: AsLink,
    },
  },
});
