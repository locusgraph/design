import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { MarketingActions } from "../actions/marketing-actions";
import { withUniqueKeys } from "../keys";
import { Section, type SectionHeadingProps } from "../section/section";
import type { LinkComponent, MarketingAction } from "../types";

export type FeatureRow = {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  media: ReactNode;
  actions?: MarketingAction[];
};

type FeatureRowsProps = SectionHeadingProps & {
  rows: FeatureRow[];
  linkComponent?: LinkComponent | "a";
  id?: string;
  className?: string;
};

export function FeatureRows({ rows, linkComponent, ...section }: FeatureRowsProps) {
  return (
    <Section slot="marketing-feature-rows" {...section}>
      <div className="flex flex-col gap-16 sm:gap-24">
        {withUniqueKeys(rows, (row) => row.title).map(({ key, item: row }, index) => (
          <div
            key={key}
            data-slot="marketing-feature-row"
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <div className={cn("flex flex-col gap-4", index % 2 === 1 && "lg:order-2")}>
              {row.eyebrow && <p className="locus-eyebrow">{row.eyebrow}</p>}
              <h3 className="text-2xl font-semibold tracking-tight">{row.title}</h3>
              {row.description && <p className="text-muted-foreground">{row.description}</p>}
              <MarketingActions
                actions={row.actions ?? []}
                linkComponent={linkComponent}
                className="pt-2"
              />
            </div>
            <div className="min-w-0 bg-card ring-1 ring-border">{row.media}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
