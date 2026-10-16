import { ArrowUp as ArrowUpIcon, MacCommand as CommandIcon } from "@carbon/icons-react";
import {
  Button,
  Kbd,
  KbdGroup,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@locusgraph/components";
import { defineDemo, text, toggle } from "../../../registry/define-demo";

function splitKeys(keys: string) {
  return keys
    .split("+")
    .map((key) => key.trim())
    .filter(Boolean);
}

function Shortcuts() {
  return (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        Open command menu
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        Create API key
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>N</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
}

function WithIcons() {
  return (
    <KbdGroup>
      <Kbd>
        <CommandIcon />
      </Kbd>
      <Kbd>
        <ArrowUpIcon />
      </Kbd>
      <Kbd>Enter</Kbd>
    </KbdGroup>
  );
}

function InButton() {
  return (
    <Button variant="outline">
      Invite member
      <Kbd>I</Kbd>
    </Button>
  );
}

function InTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Save plan</Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-2">
          Save changes
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default defineDemo({
  title: "Kbd",
  isNew: true,
  description:
    "Shows a keyboard key or shortcut. KbdGroup joins several keys into one combination.",
  controls: { keys: text("⌘ + K"), group: toggle(true) },
  playground: ({ keys, group }) =>
    group ? (
      <KbdGroup>
        {splitKeys(keys).map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </KbdGroup>
    ) : (
      <Kbd>{keys}</Kbd>
    ),
  code: ({ keys, group }) =>
    group
      ? `<KbdGroup>\n${splitKeys(keys)
          .map((key) => `  <Kbd>${key}</Kbd>`)
          .join("\n")}\n</KbdGroup>`
      : `<Kbd>${keys}</Kbd>`,
  props: [
    { name: "Kbd", type: 'ComponentProps<"kbd">' },
    { name: "KbdGroup", type: 'ComponentProps<"div">' },
  ],
  examples: {
    Shortcuts: {
      description: "Shortcut hints next to the action they trigger.",
      component: Shortcuts,
    },
    WithIcons: { description: "Lucide icons work as modifier keys.", component: WithIcons },
    InButton: { description: "A single key hint inside a button.", component: InButton },
    InTooltip: {
      description: "Keys restyle themselves to match tooltip colors.",
      component: InTooltip,
    },
  },
  composition: { name: "KbdGroup", children: [{ name: "Kbd" }, { name: "Kbd" }] },
});
