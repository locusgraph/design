import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@locusgraph/components";
import {
  CaretDown as ChevronDownIcon,
  CaretUpDown as ChevronsUpDownIcon,
} from "@phosphor-icons/react/ssr";
import { formatProp } from "../../registry/control-values";
import { defineDemo, text, toggle } from "../../registry/define-demo";

const keys = ["Production", "Staging", "CI runner"];

function Basic() {
  return (
    <Collapsible className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-2">
        <span className="text-sm font-semibold">3 API keys</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Show keys">
            <ChevronsUpDownIcon weight="bold" aria-hidden />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">{keys[0]}</div>
      <CollapsibleContent className="flex flex-col gap-2">
        {keys.slice(1).map((key) => (
          <div key={key} className="rounded-md border px-4 py-2 font-mono text-sm">
            {key}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function OpenByDefault() {
  return (
    <Collapsible defaultOpen className="w-full max-w-sm rounded-lg border">
      <CollapsibleTrigger className="group flex w-full items-center justify-between p-4 text-sm font-medium">
        Invoice details
        <ChevronDownIcon
          weight="bold"
          aria-hidden
          className="size-4 transition-transform group-data-[state=open]:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t p-4 text-sm text-muted-foreground">
        Pro plan, 20 seats, billed monthly. Total $480.00.
      </CollapsibleContent>
    </Collapsible>
  );
}

function Disabled() {
  return (
    <Collapsible disabled className="w-full max-w-sm rounded-lg border">
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-sm font-medium disabled:opacity-50">
        Audit log (Enterprise only)
        <ChevronDownIcon weight="bold" aria-hidden className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t p-4 text-sm">Audit events.</CollapsibleContent>
    </Collapsible>
  );
}

export default defineDemo({
  title: "Collapsible",
  isNew: true,
  description:
    "Show and hide a single section of content. Good for optional details like extra keys or invoice lines.",
  controls: { defaultOpen: toggle(), disabled: toggle(), label: text("Billing details") },
  playground: ({ defaultOpen, disabled, label }) => (
    <Collapsible
      key={String(defaultOpen)}
      defaultOpen={defaultOpen}
      disabled={disabled}
      className="w-80 rounded-lg border"
    >
      <CollapsibleTrigger className="group flex w-full items-center justify-between p-4 text-sm font-medium disabled:opacity-50">
        {label}
        <ChevronDownIcon
          weight="bold"
          aria-hidden
          className="size-4 transition-transform group-data-[state=open]:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t p-4 text-sm text-muted-foreground">
        Next charge of $480.00 on Nov 1 to Visa ending 4242.
      </CollapsibleContent>
    </Collapsible>
  ),
  code: ({ defaultOpen, disabled, label }) =>
    `<Collapsible${formatProp("defaultOpen", defaultOpen, false)}${formatProp("disabled", disabled, false)}>\n  <CollapsibleTrigger>${label}</CollapsibleTrigger>\n  <CollapsibleContent>\n    Next charge of $480.00 on Nov 1.\n  </CollapsibleContent>\n</Collapsible>`,
  props: [
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "open / onOpenChange", type: "controlled open state" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "CollapsibleTrigger.asChild", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    Basic: {
      description: "The first key stays visible and a button reveals the rest.",
      component: Basic,
    },
    OpenByDefault: {
      description: "defaultOpen starts expanded, and the chevron turns with the state.",
      component: OpenByDefault,
    },
    Disabled: {
      description: "A disabled collapsible cannot be opened.",
      component: Disabled,
    },
  },
  composition: {
    name: "Collapsible",
    children: [{ name: "CollapsibleTrigger" }, { name: "CollapsibleContent" }],
  },
});
