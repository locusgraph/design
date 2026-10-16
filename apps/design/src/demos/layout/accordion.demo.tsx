import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@locusgraph/components";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const questions = [
  {
    value: "seats",
    question: "How are seats billed?",
    answer: "Each active member counts as one seat, prorated by day.",
  },
  {
    value: "plans",
    question: "Can I change my plan later?",
    answer: "Yes. Upgrades apply now, downgrades at the next renewal.",
  },
  {
    value: "refunds",
    question: "Do you offer refunds?",
    answer: "Within 14 days of a charge, for any reason.",
  },
];

function Basic() {
  return (
    <Accordion type="single" collapsible defaultValue="seats" className="w-full max-w-md">
      {questions.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Multiple() {
  return (
    <Accordion type="multiple" defaultValue={["seats", "plans"]} className="w-full max-w-md">
      {questions.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Disabled() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="seats">
        <AccordionTrigger>How are seats billed?</AccordionTrigger>
        <AccordionContent>Each active member counts as one seat.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="sso" disabled>
        <AccordionTrigger>Single sign-on (Enterprise only)</AccordionTrigger>
        <AccordionContent>Available on the Enterprise plan.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function Bordered() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md rounded-lg border">
      {questions.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="px-4">
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default defineDemo({
  title: "Accordion",
  isNew: true,
  description:
    "A stack of headings that each reveal a section of content. Good for FAQs and settings groups.",
  controls: { type: select(["single", "multiple"]), collapsible: toggle(true) },
  playground: ({ type, collapsible }) =>
    type === "single" ? (
      <Accordion
        key="single"
        type="single"
        collapsible={collapsible}
        defaultValue="seats"
        className="w-80"
      >
        {questions.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ) : (
      <Accordion key="multiple" type="multiple" defaultValue={["seats"]} className="w-80">
        {questions.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
  code: ({ type, collapsible }) =>
    `<Accordion type="${type}"${type === "single" && collapsible ? " collapsible" : ""}>\n  <AccordionItem value="seats">\n    <AccordionTrigger>How are seats billed?</AccordionTrigger>\n    <AccordionContent>Each active member counts as one seat.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
  props: [
    { name: "type", type: "single | multiple" },
    { name: "collapsible", type: "boolean (single only)", defaultValue: "false" },
    { name: "defaultValue", type: "string | string[]" },
    { name: "value / onValueChange", type: "controlled open items" },
    { name: "AccordionItem.disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    Basic: {
      description: "One item open at a time. The first item starts open.",
      component: Basic,
    },
    Multiple: { description: "Several items can stay open at once.", component: Multiple },
    Disabled: {
      description: "A disabled item shows a feature that is not available.",
      component: Disabled,
    },
    Bordered: {
      description: "A border and padding turn the list into a card.",
      component: Bordered,
    },
  },
  composition: {
    name: "Accordion",
    children: [
      {
        name: "AccordionItem",
        children: [{ name: "AccordionTrigger" }, { name: "AccordionContent" }],
      },
      {
        name: "AccordionItem",
        children: [{ name: "AccordionTrigger" }, { name: "AccordionContent" }],
      },
    ],
  },
});
