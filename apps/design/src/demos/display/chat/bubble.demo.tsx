import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text } from "../../../registry/define-demo";

const variants = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const;

function Variants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {variants.map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>The {variant} bubble shows an agent reply.</BubbleContent>
        </Bubble>
      ))}
    </div>
  );
}

function Alignment() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Bubble align="end">
        <BubbleContent>How many seats are left on our plan?</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>You are using 18 of 20 seats on Pro.</BubbleContent>
      </Bubble>
    </div>
  );
}

function Grouped() {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble variant="muted">
        <BubbleContent>Your March invoice is ready.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>The total is $1,240, due on April 1.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}

function Reactions() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-10 py-6">
      <Bubble variant="muted">
        <BubbleContent>I rotated the production API key for you.</BubbleContent>
        <BubbleReactions role="img" aria-label="Reactions: thumbs up, party">
          <span>👍</span>
          <span>🎉</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Thanks, that was quick.</BubbleContent>
        <BubbleReactions side="top" align="start" role="img" aria-label="Reactions: heart">
          <span>❤️</span>
        </BubbleReactions>
      </Bubble>
    </div>
  );
}

export default defineDemo({
  title: "Bubble",
  isNew: true,
  description:
    "A chat bubble for a single message. Variants set the tone and align places it on either side of the thread.",
  controls: {
    variant: select(variants),
    align: select(["start", "end"]),
    message: text("Your usage is at 80% of this month's limit."),
  },
  playground: ({ variant, align, message }) => (
    <div className="flex w-80 flex-col">
      <Bubble variant={variant} align={align}>
        <BubbleContent>{message}</BubbleContent>
      </Bubble>
    </div>
  ),
  code: ({ variant, align, message }) =>
    `<Bubble${formatProp("variant", variant, "default")}${formatProp("align", align, "start")}>\n  <BubbleContent>${message}</BubbleContent>\n</Bubble>`,
  props: [
    { name: "variant", type: variants.join(" | "), defaultValue: "default" },
    { name: "align", type: "start | end", defaultValue: "start" },
    { name: "BubbleContent.asChild", type: "boolean", defaultValue: "false" },
    { name: "BubbleReactions.side", type: "top | bottom", defaultValue: "bottom" },
    { name: "BubbleReactions.align", type: "start | end", defaultValue: "end" },
  ],
  examples: {
    Variants: {
      description: "Seven tones, from filled primary to plain text.",
      component: Variants,
    },
    Alignment: {
      description: "End-aligned bubbles are the user, start-aligned bubbles reply.",
      component: Alignment,
    },
    Grouped: {
      description: "BubbleGroup stacks consecutive bubbles from one sender.",
      component: Grouped,
    },
    Reactions: {
      description: "BubbleReactions pins emoji to a corner of the bubble.",
      component: Reactions,
    },
  },
  composition: {
    name: "BubbleGroup",
    children: [
      { name: "Bubble", children: [{ name: "BubbleContent" }, { name: "BubbleReactions" }] },
    ],
  },
});
