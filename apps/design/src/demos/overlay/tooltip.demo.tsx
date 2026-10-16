import { Copy as CopyIcon, Information as InfoIcon } from "@carbon/icons-react";
import {
  Button,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const sides = ["top", "right", "bottom", "left"] as const;

function CopyKey({
  side,
  label,
  open,
}: {
  side: (typeof sides)[number];
  label: string;
  open?: boolean;
}) {
  return (
    <TooltipProvider>
      <Tooltip key={String(open)} defaultOpen={open}>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side={side}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function IconButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Copy API key">
            <CopyIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy API key</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function WithShortcut() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Search</Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-2">
          Search invoices
          <Kbd>⌘K</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ExplainMetric() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1.5 text-sm">
        Billable events
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" aria-label="About billable events">
              <InfoIcon className="size-4 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-56">
            Events counted against your plan after the free tier.
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default defineDemo({
  title: "Tooltip",
  description:
    "A short label that appears on hover or focus. Use it to name icon buttons or explain a value in a word or two.",
  controls: { open: toggle(), side: select(sides), label: text("Copy API key") },
  playground: ({ open, side, label }) => <CopyKey side={side} label={label} open={open} />,
  code: ({ side, label }) =>
    `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button variant="outline">Hover me</Button>\n    </TooltipTrigger>\n    <TooltipContent${formatProp("side", side, "top")}>${label}</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "onOpenChange", type: "(open: boolean) => void" },
    { name: "TooltipProvider.delayDuration", type: "number", defaultValue: "0" },
    { name: "TooltipContent.side", type: sides.join(" | "), defaultValue: "top" },
    { name: "TooltipContent.sideOffset", type: "number", defaultValue: "0" },
  ],
  examples: {
    IconButton: {
      description: "Name an icon-only button for sighted and keyboard users.",
      component: IconButton,
    },
    WithShortcut: {
      description: "Show the keyboard shortcut next to the label.",
      component: WithShortcut,
    },
    ExplainMetric: {
      description: "Explain a usage metric next to its name.",
      component: ExplainMetric,
    },
  },
  composition: {
    name: "TooltipProvider",
    children: [
      { name: "Tooltip", children: [{ name: "TooltipTrigger" }, { name: "TooltipContent" }] },
    ],
  },
  previewHeight: "tall",
});
