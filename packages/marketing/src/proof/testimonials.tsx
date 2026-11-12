import { RuleGrid, RuleGridCell } from "@locusgraph/components";
import type { ReactNode } from "react";
import { withUniqueKeys } from "../keys";
import { Section, type SectionHeadingProps } from "../section/section";

export type Testimonial = {
  quote: ReactNode;
  name: string;
  role?: ReactNode;
  avatar?: ReactNode;
};

type TestimonialsProps = SectionHeadingProps & {
  testimonials: Testimonial[];
  id?: string;
  className?: string;
};

function Attribution({ name, role, avatar }: Omit<Testimonial, "quote">) {
  return (
    <figcaption className="flex items-center gap-3">
      {avatar && (
        <span aria-hidden className="size-10 shrink-0 overflow-hidden rounded-pill bg-muted">
          {avatar}
        </span>
      )}
      <span className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        {role && <span className="text-sm text-muted-foreground">{role}</span>}
      </span>
    </figcaption>
  );
}

function FeaturedQuote({ quote, ...person }: Testimonial) {
  return (
    <figure className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
      <blockquote className="text-2xl font-medium tracking-tight text-balance sm:text-3xl">
        {quote}
      </blockquote>
      <Attribution {...person} />
    </figure>
  );
}

export function Testimonials({ testimonials, ...section }: TestimonialsProps) {
  const [only] = testimonials;
  if (testimonials.length === 1 && only) {
    return (
      <Section slot="marketing-testimonials" align="center" {...section}>
        <FeaturedQuote {...only} />
      </Section>
    );
  }
  return (
    <Section slot="marketing-testimonials" {...section}>
      <RuleGrid columns={3}>
        {withUniqueKeys(testimonials, (entry) => entry.name).map(
          ({ key, item: { quote, ...person } }) => (
            <RuleGridCell key={key} asChild className="justify-between gap-6">
              <figure>
                <blockquote className="text-base">{quote}</blockquote>
                <Attribution {...person} />
              </figure>
            </RuleGridCell>
          )
        )}
      </RuleGrid>
    </Section>
  );
}
