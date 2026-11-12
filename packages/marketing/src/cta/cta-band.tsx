import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { MarketingActions } from "../actions/marketing-actions";
import type { LinkComponent, MarketingAction } from "../types";

type CtaBandProps = {
  title: ReactNode;
  description?: ReactNode;
  actions: MarketingAction[];
  linkComponent?: LinkComponent | "a";
  id?: string;
  className?: string;
};

export function CtaBand({
  title,
  description,
  actions,
  linkComponent,
  id,
  className,
}: CtaBandProps) {
  return (
    <section
      id={id}
      data-slot="marketing-cta-band"
      className={cn("w-full border-y bg-muted/35", className)}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-lg text-muted-foreground">{description}</p>}
        </div>
        <MarketingActions actions={actions} size="lg" linkComponent={linkComponent} />
      </div>
    </section>
  );
}
