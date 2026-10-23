import { ToggleGroup, ToggleGroupItem } from "@locusgraph/components";
import {
  TextB as BoldIcon,
  TextItalic as ItalicIcon,
  TextUnderline as UnderlineIcon,
} from "@phosphor-icons/react/ssr";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const variants = ["default", "outline"] as const;
const sizes = ["default", "sm", "lg"] as const;

function BillingPeriod() {
  return (
    <ToggleGroup type="single" variant="outline" defaultValue="monthly">
      <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
      <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
    </ToggleGroup>
  );
}

function Multiple() {
  return (
    <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon weight="bold" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon weight="bold" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon weight="bold" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function Spaced() {
  return (
    <ToggleGroup type="single" variant="outline" spacing={2} defaultValue="30d">
      <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
      <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
      <ToggleGroupItem value="90d">90 days</ToggleGroupItem>
    </ToggleGroup>
  );
}

function Disabled() {
  return (
    <ToggleGroup type="single" defaultValue="all" disabled>
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="paid">Paid</ToggleGroupItem>
      <ToggleGroupItem value="open">Open</ToggleGroupItem>
    </ToggleGroup>
  );
}

export default defineDemo({
  title: "Toggle Group",
  description:
    "A set of toggles that share state. Use single mode to pick one option, like a billing period, or multiple mode for independent flags.",
  controls: {
    type: select(["single", "multiple"]),
    variant: select(variants, "outline"),
    size: select(sizes),
    disabled: toggle(),
  },
  playground: ({ type, variant, size, disabled }) =>
    type === "single" ? (
      <ToggleGroup
        key="single"
        type="single"
        variant={variant}
        size={size}
        disabled={disabled}
        defaultValue="30d"
      >
        <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
        <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
        <ToggleGroupItem value="90d">90 days</ToggleGroupItem>
      </ToggleGroup>
    ) : (
      <ToggleGroup
        key="multiple"
        type="multiple"
        variant={variant}
        size={size}
        disabled={disabled}
        defaultValue={["30d"]}
      >
        <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
        <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
        <ToggleGroupItem value="90d">90 days</ToggleGroupItem>
      </ToggleGroup>
    ),
  code: ({ type, variant, size, disabled }) =>
    `<ToggleGroup type="${type}"${formatProp("variant", variant, "default")}${formatProp("size", size, "default")}${formatProp("disabled", disabled, false)}>\n  <ToggleGroupItem value="7d">7 days</ToggleGroupItem>\n  <ToggleGroupItem value="30d">30 days</ToggleGroupItem>\n  <ToggleGroupItem value="90d">90 days</ToggleGroupItem>\n</ToggleGroup>`,
  props: [
    { name: "type", type: "single | multiple" },
    { name: "variant", type: variants.join(" | "), defaultValue: "default" },
    { name: "size", type: sizes.join(" | "), defaultValue: "default" },
    { name: "spacing", type: "number", defaultValue: "0" },
    { name: "defaultValue", type: "string | string[]" },
    { name: "value / onValueChange", type: "controlled pressed items" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    BillingPeriod: {
      description: "Pick one billing period for a plan price.",
      component: BillingPeriod,
    },
    Multiple: {
      description: "Each item turns on and off on its own.",
      component: Multiple,
    },
    Spaced: {
      description: "Spacing separates the items instead of joining them.",
      component: Spaced,
    },
    Disabled: { description: "A disabled group cannot change.", component: Disabled },
  },
  composition: {
    name: "ToggleGroup",
    children: [{ name: "ToggleGroupItem" }, { name: "ToggleGroupItem" }],
  },
});
