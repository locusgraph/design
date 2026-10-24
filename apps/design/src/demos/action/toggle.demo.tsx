import { Toggle } from "@locusgraph/components";
import {
  Bell as BellIcon,
  TextB as BoldIcon,
  TextItalic as ItalicIcon,
  Star as StarIcon,
  TextUnderline as UnderlineIcon,
} from "@phosphor-icons/react/ssr";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const variants = ["default", "outline"] as const;
const sizes = ["default", "sm", "lg"] as const;

function Outline() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" aria-label="Bold">
        <BoldIcon weight="bold" aria-hidden />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <ItalicIcon weight="bold" aria-hidden />
      </Toggle>
      <Toggle variant="outline" aria-label="Underline">
        <UnderlineIcon weight="bold" aria-hidden />
      </Toggle>
    </div>
  );
}

function WithText() {
  return (
    <Toggle variant="outline" defaultPressed aria-label="Usage alerts">
      <BellIcon weight="bold" aria-hidden />
      Usage alerts
    </Toggle>
  );
}

function Sizes() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" variant="outline" aria-label="Favorite">
        <StarIcon weight="bold" aria-hidden />
      </Toggle>
      <Toggle variant="outline" aria-label="Favorite">
        <StarIcon weight="bold" aria-hidden />
      </Toggle>
      <Toggle size="lg" variant="outline" aria-label="Favorite">
        <StarIcon weight="bold" aria-hidden />
      </Toggle>
    </div>
  );
}

function Disabled() {
  return (
    <Toggle disabled aria-label="Pin organization">
      <StarIcon weight="bold" aria-hidden />
      Pinned
    </Toggle>
  );
}

export default defineDemo({
  title: "Toggle",
  description:
    "A two-state button that stays pressed or unpressed. Use it to switch a single option on or off, like starring an organization.",
  controls: {
    variant: select(variants),
    size: select(sizes),
    disabled: toggle(),
    label: text("Usage alerts"),
  },
  playground: ({ variant, size, disabled, label }) => (
    <Toggle variant={variant} size={size} disabled={disabled} aria-label={label}>
      <BellIcon weight="bold" aria-hidden />
      {label}
    </Toggle>
  ),
  code: ({ variant, size, disabled, label }) =>
    `<Toggle${formatProp("variant", variant, "default")}${formatProp("size", size, "default")}${formatProp("disabled", disabled, false)} aria-label="${label}">\n  <BellIcon weight="bold" aria-hidden />\n  ${label}\n</Toggle>`,
  props: [
    { name: "variant", type: variants.join(" | "), defaultValue: "default" },
    { name: "size", type: sizes.join(" | "), defaultValue: "default" },
    { name: "pressed", type: "boolean" },
    { name: "defaultPressed", type: "boolean", defaultValue: "false" },
    { name: "onPressedChange", type: "(pressed: boolean) => void" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    Outline: {
      description: "Outlined icon toggles for a formatting toolbar.",
      component: Outline,
    },
    WithText: {
      description: "An icon and a label, pressed by default.",
      component: WithText,
    },
    Sizes: { description: "Three sizes to match the surrounding density.", component: Sizes },
    Disabled: { description: "A disabled toggle cannot change state.", component: Disabled },
  },
});
