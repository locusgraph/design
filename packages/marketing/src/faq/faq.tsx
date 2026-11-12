import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@locusgraph/components";
import type { ReactNode } from "react";
import { withUniqueKeys } from "../keys";
import { Section, type SectionHeadingProps } from "../section/section";

export type FaqItem = { question: string; answer: ReactNode };

type FaqProps = SectionHeadingProps & {
  items: FaqItem[];
  id?: string;
  className?: string;
};

export function Faq({ items, ...section }: FaqProps) {
  return (
    <Section slot="marketing-faq" {...section}>
      <Accordion type="single" collapsible className="w-full max-w-3xl">
        {withUniqueKeys(items, (item) => item.question).map(({ key, item }) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
