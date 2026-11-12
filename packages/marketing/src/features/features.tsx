import { RuleGrid, RuleGridCell } from "@locusgraph/components";
import type { ReactNode } from "react";
import { withUniqueKeys } from "../keys";
import { Section, type SectionHeadingProps } from "../section/section";

export type FeatureItem = { title: string; description?: ReactNode; icon?: ReactNode };

type FeaturesProps = SectionHeadingProps & {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  id?: string;
  className?: string;
};

export function Features({ items, columns = 3, ...section }: FeaturesProps) {
  return (
    <Section slot="marketing-features" {...section}>
      <RuleGrid columns={columns}>
        {withUniqueKeys(items, (item) => item.title).map(({ key, item }) => (
          <RuleGridCell key={key} className="gap-3">
            {item.icon && (
              <span aria-hidden className="text-foreground [&_svg]:size-5">
                {item.icon}
              </span>
            )}
            <h3 className="text-base font-medium">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
          </RuleGridCell>
        ))}
      </RuleGrid>
    </Section>
  );
}
