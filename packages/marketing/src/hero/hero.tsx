import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { MarketingActions } from "../actions/marketing-actions";
import type { LinkComponent, MarketingAction } from "../types";

export type HeroLayout = "centered" | "split";

type HeroProps = {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: MarketingAction[];
  media?: ReactNode;
  layout?: HeroLayout;
  linkComponent?: LinkComponent | "a";
  className?: string;
};

function HeroText({
  title,
  description,
  eyebrow,
  actions = [],
  layout,
  linkComponent,
}: Omit<HeroProps, "media" | "className">) {
  const centered = layout === "centered";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered && "mx-auto max-w-3xl items-center text-center"
      )}
    >
      {eyebrow && <p className="locus-eyebrow">{eyebrow}</p>}
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
      {description && (
        <p className={cn("text-lg text-muted-foreground", centered && "max-w-2xl")}>
          {description}
        </p>
      )}
      <MarketingActions
        actions={actions}
        size="lg"
        linkComponent={linkComponent}
        className={cn(centered && "justify-center")}
      />
    </div>
  );
}

export function Hero({ media, layout = "centered", className, ...text }: HeroProps) {
  const split = layout === "split";
  return (
    <section
      data-slot="marketing-hero"
      data-layout={layout}
      className={cn("mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24", className)}
    >
      <div className={cn("grid gap-12", split && media && "items-center lg:grid-cols-2")}>
        <HeroText layout={layout} {...text} />
        {media && (
          <div data-slot="marketing-hero-media" className="min-w-0 ring-1 ring-border bg-card">
            {media}
          </div>
        )}
      </div>
    </section>
  );
}
