import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@locusgraph/components";
import type { ReactNode } from "react";
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
        {items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
